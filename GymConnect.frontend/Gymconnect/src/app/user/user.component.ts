import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user-service';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../dto/userDto';
import { MessageRequestDto } from '../dto/message-request-dto';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  
})
export class UserComponent {
  users$: Observable<UserDto[]>;
  selectedUser: UserDto | null = null;
  selectedUserId: string | null = null;
  gymToFetch = 'nordicgym';
  messageContent: string = '';
  currentUserId = '7bccf14b-9ab0-43ed-bc81-1ae6d1cf02df'; 



  constructor(public userService: UserService) {
    this.users$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.loadUsers(this.gymToFetch);
  }

selectUser(user: UserDto) {
  this.selectedUser = user;
  this.userService.selectedUser = user;
  this.userService.selectedUserId = user.id; 

  console.log('User clicked:', user);
  console.log('Selected user id:', this.userService.selectedUserId); 
}


  sendMessage() {
    if (!this.userService.selectedUserId || !this.messageContent.trim()) return;
        console.log('Sending message:', this.messageContent, 'to', this.userService.selectedUser?.fullName);

    const request = new MessageRequestDto();
    //  request.SenderId = this.currentUserId;      
    // request.ReceiverId = this.selectedUser!.id;
    request.SenderId = this.currentUserId;
    request.ReceiverId = this.userService.selectedUserId;
    request.Content = this.messageContent;
      console.log('Sending message payload:', request); 

    this.userService.sendMessage(request)?.subscribe({
      next: res => {
        console.log('Message sent', res);
        this.messageContent = '';
      },
      error: err => console.error(err)
    });
  }

}