import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiServices } from '../api-service/api-services';
import { UserDto } from '../../dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<UserDto[]>([]);
  user$ = this.userSource.asObservable();

  private apiService = inject(ApiServices);
  private isLoading = false;
   private users: UserDto[] = [];
  selectedUserId: string | null = null;
  selectedUser: UserDto | null = null;

  loadUsers(gymName: string): void {
    if (this.isLoading) {
      return;
    }

    const cachedUsers = this.userSource.getValue();
    if (cachedUsers.length > 0) {
      return;
    }

    this.isLoading = true;
    this.apiService.getAllUsers(gymName).subscribe({
      next: (data: UserDto[]) => {
        this.userSource.next(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  getCurrentUsers(): UserDto[] {
    return this.userSource.getValue();
  }


  getUserById(id: string): UserDto | null {
  const users = this.userSource.getValue(); 
  return users.find(u => u.id === id) || null;
}

selectUser(user: UserDto) {
  this.selectedUser = user;
  this.selectedUserId = user.id;
  console.log('Selected user:', user);
}

 
}
