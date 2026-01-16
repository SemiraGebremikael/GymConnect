import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../../dto/userDto';
import { UserService } from '../../services/user-service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageResponseDto } from '../../dto/message-response-dto';
import { ChatService } from '../../services/chat-service/chat.service';
import { GetConversationRequestDto } from '../../dto/get-conversation-request-dto';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessageRequestDto } from '../../dto/message-request-dto';

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
  currentUserId = '581c146b-067f-43de-9d0f-acd37113c258'; // Tomas user id

  public userService = inject(UserService);
  public chatService = inject(ChatService);
  public route = inject(ActivatedRoute);
  public router = inject(Router);


 

ngOnInit(): void {
  const otherUserId = this.route.snapshot.paramMap.get('id');
  if (otherUserId) {
    this.selectedUserId = otherUserId;
    this.selectedUser = this.userService.getUserById(otherUserId);
     this.loadConversation(otherUserId);
  }
}

goBack(): void {
   this.router.navigate(['/user'])
}


loadConversation(otherUserId: string): void {
    const request = new GetConversationRequestDto();
    request.userId = this.currentUserId;
    request.otherUserId = otherUserId;
    request.page = 1;
    request.pageSize = 20;

    this.chatService.getConversation(request).subscribe({
      next: (msgs) => {
        this.messages = msgs ?? [];
      },
      error: (err) => console.error('Error loading messages:', err),
    });
  }


sendMessage(): void {
  if (!this.selectedUser || !this.messageContent.trim()) {
    return;
  }
  const request: MessageRequestDto = {
    senderId: this.currentUserId,
    receiverId: this.selectedUser.id,
    content: this.messageContent
  };

  this.chatService.sendMessage(request).subscribe(
    (msg) => {
      if (!msg.sender) {
        msg.sender = { id: this.currentUserId } as any;
      }

      this.messages.push(msg);
      this.messageContent = '';
    },
    err => {
    }
  );
}




  
 }

