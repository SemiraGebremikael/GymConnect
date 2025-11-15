import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../../dto/userDto';
import { UserService } from '../../services/user-service/user-service';
import { ActivatedRoute } from '@angular/router';
import { MessageResponseDto } from '../../dto/message-response-dto';
import { ChatService } from '../../services/chat-service/chat.service';
import { GetConversationRequestDto } from '../../dto/get-conversation-request-dto';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, MatButtonModule],
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
  public chatService = inject(ChatService);
  public route = inject(ActivatedRoute);

 

ngOnInit(): void {
  const otherUserId = this.route.snapshot.paramMap.get('id');
  if (otherUserId) {
    this.selectedUserId = otherUserId;
    this.selectedUser = this.userService.getUserById(otherUserId);
    this.loadConversation(otherUserId);
  }
}

goBack(): void {
  window.history.back();
}
loadConversation(otherUserId: string): void {
  if (!this.currentUserId) return;

  const request = new GetConversationRequestDto();
  request.userId = this.currentUserId;
  request.otherUserId = otherUserId;
  request.page = 1;    
  request.pageSize = 20; 

  this.chatService.getConversation(request)?.subscribe({
    next: (msgs) => {
      this.messages = msgs;
    },
    error: (err) => console.error('Error loading messages:', err)
  });
}




 sendMessage() {
    if (!this.selectedUser || !this.messageContent.trim()) return;
    const request = {
      SenderId: this.currentUserId,
      ReceiverId: this.selectedUser.id,
      Content: this.messageContent
    };
    this.chatService.sendMessage(request)?.subscribe({
      next: msg => {
        this.messages.push(msg);
        this.messageContent = '';
      },
      error: err => console.error(err)
    });
  }



  
}