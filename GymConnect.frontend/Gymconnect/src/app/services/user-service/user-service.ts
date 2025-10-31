import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiServices } from '../api-service/api-services';
import { MessageRequestDto } from '../../dto/message-request-dto';
import { UserDto } from '../../dto/userDto';
import { MessageResponseDto } from '../../dto/message-response-dto';

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

  sendMessage(request: MessageRequestDto): Observable<MessageResponseDto> | undefined {
    if (!request.ReceiverId) return;
        console.log(' Sending message to API:', request);

    return this.apiService.sendMessage(request);
  }
}
