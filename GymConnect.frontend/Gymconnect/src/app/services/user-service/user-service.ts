import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiServices } from '../api-service/api-services';
import { UserDto } from '../../dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<UserDto[]>([]);
  user$ = this.usersSubject.asObservable();

  private apiService = inject(ApiServices);
  private isLoading = false;
  private users: UserDto[] = [];
  allUsers: UserDto[] = []; 
  selectedUserId: string | null = null;
  selectedUser: UserDto | null = null;

  loadUsers(gymName: string): void {
    if (this.isLoading) {
      return;
    }

    const cachedUsers = this.usersSubject.getValue();
    if (cachedUsers.length > 0) {
      this.usersSubject.next(this.allUsers);
      return;
    }

    this.isLoading = true;
    this.apiService.getAllUsers(gymName).subscribe({
      next: (data: UserDto[]) => {
        this.allUsers = data; // Store full list
        this.usersSubject.next(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  getCurrentUsers(): UserDto[] {
    return this.usersSubject.getValue();
  }


  getUserById(id: string): UserDto | null {
  const users = this.usersSubject.getValue(); 
  return users.find(u => u.id === id) || null;
}

selectUser(user: UserDto) {
  this.selectedUser = user;
  this.selectedUserId = user.id;
  console.log('Selected user:', user);
}


searchUsers(query: string) {
    this.apiService.searchUsers(query).subscribe({
      next: data => this.usersSubject.next(data),
      error: err => console.error(err)
    });
  }
}
