import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user-service';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../dto/userDto';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
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
export class UserComponent implements AfterViewInit {
  users$: Observable<UserDto[]>;
  selectedIndex: number = 0;
  selectedUser: UserDto | null = null;
  selectedUserId: string | null = null;
  gymToFetch = 'nordic';
  currentUserId = '581c146b-067f-43de-9d0f-acd37113c258';  // Tomas  user id

displayedColumns: string[] = ['fullName', 'city', 'country'];
  dataSource = new MatTableDataSource<UserDto>([]);

  @ViewChild(HeaderComponent) header!: HeaderComponent;

  constructor(public userService: UserService, private router: Router, private cdr: ChangeDetectorRef) {
    this.users$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.loadUsers(this.gymToFetch);
    this.userService.user$.subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.filter = ''; 
      if (users.length > 0 && !this.selectedUser) {
        this.selectedIndex = 0;
        this.selectedUser = users[0]; 
      }
    });
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/user') {
          if (this.header) {
            this.header.clearSearch();
          } 
        }
      }
    });
  }

 
selectUser(user: UserDto) {
   if (!user) return; 
  this.selectedUser = user;
  this.userService.selectedUser = user;
  this.router.navigate(['/chat', user.id]); 
}


 onSearch(query: string) {
    if (query.trim() === '') {
      this.dataSource.data = [...this.userService.allUsers];
      this.dataSource.filter = '';
      this.cdr.detectChanges();
    } else {
      this.userService.searchUsers(query);
    }
  }



}