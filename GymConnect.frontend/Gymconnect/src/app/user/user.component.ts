import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user-service';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../dto/userDto';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderComponent, MatCardModule,MatTableModule,MatSortModule],
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
  currentUserId = '9ebb8bff-e27e-42fb-a577-2b2174d4720b';  // selu  user id

displayedColumns: string[] = ['fullName', 'city', 'country'];
  dataSource = new MatTableDataSource<UserDto>([]);

  constructor(public userService: UserService, private router: Router) {
    this.users$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.loadUsers(this.gymToFetch);
     this.userService.user$.subscribe(users => {
      this.dataSource.data = users;
      if (users.length > 0) {
        this.selectedIndex = 0;
        this.selectedUser = this.users[0]; 
      }
    });;


  }

selectUser(user: UserDto) {
   if (!user) return; 
  this.selectedUser = user;
  this.userService.selectedUser = user;
  this.router.navigate(['/chat', user.id]); 
  console.log('User clicked:', user.id);
  console.log('Selected user id:', this.userService.selectedUserId); 
}


 onSearch(query: string) {
    this.userService.searchUsers(query);
  }

}