import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../../dto/userDto';
import { UserService } from '../../services/user-service/user-service';
import { ActivatedRoute } from '@angular/router';
import { MessageResponseDto } from '../../dto/message-response-dto';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
})
  export class UserChatComponent {
  selectedUser : UserDto | null = null;
  messageContent: string = '';
  selectedUserId: string | null = null;
    messages: MessageResponseDto[] = [];
  currentUserId = '7bccf14b-9ab0-43ed-bc81-1ae6d1cf02df'; 

  public userService = inject(UserService);
  public route = inject(ActivatedRoute);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.selectedUser = this.userService.getUserById(userId);
    }
  }

 sendMessage() {
    if (!this.selectedUser || !this.messageContent.trim()) return;
    const request = {
      SenderId: this.currentUserId,
      ReceiverId: this.selectedUser.id,
      Content: this.messageContent
    };
    this.userService.sendMessage(request)?.subscribe({
      next: msg => {
        this.messages.push(msg);
        this.messageContent = '';
      },
      error: err => console.error(err)
    });
  }



  
}