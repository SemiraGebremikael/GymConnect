import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user-service';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../dto/userDto';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  
})
export class UserComponent {
  users$: Observable<UserDto[]>;
  users: UserDto[] = [];
  selectedIndex: number = 0;
  selectedUser: UserDto | null = null;
  selectedUserId: string | null = null;
  gymToFetch = 'nordicgym';
  currentUserId = '7bccf14b-9ab0-43ed-bc81-1ae6d1cf02df'; 



  constructor(public userService: UserService, private router: Router) {
    this.users$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.loadUsers(this.gymToFetch);
     this.userService.user$.subscribe(users => {
      this.users = users;
      if (users.length > 0) {
        this.selectedIndex = 0;
        this.selectedUser = this.users[0]; 
      }
    });
  }

selectUser(user: UserDto) {
   if (!user) return; 
  this.selectedUser = user;
  this.userService.selectedUser = user;
  this.router.navigate(['/chat', user.id]); 
  console.log('User clicked:', user);
  console.log('Selected user id:', this.userService.selectedUserId); 
}


previousUser() {
    if (this.users.length === 0) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.users.length) % this.users.length;
    this.selectedUser = this.users[this.selectedIndex];
  }

  nextUser() {
    if (this.users.length === 0) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.users.length;
    this.selectedUser = this.users[this.selectedIndex]; 
  }


}