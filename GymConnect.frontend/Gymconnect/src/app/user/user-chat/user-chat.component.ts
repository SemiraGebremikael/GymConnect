import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDto } from '../../dto/userDto';
import { UserService } from '../../services/user-service/user-service';
import { ActivatedRoute } from '@angular/router';
import { MessageResponseDto } from '../../dto/message-response-dto';
import { ChatService } from '../../services/chat-service/chat.service';

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
    public chatService = inject(ChatService);

  public route = inject(ActivatedRoute);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.selectedUser = this.userService.getUserById(userId);
      this.loadConversation(userId);

    }
    
  }


  loadConversation(otherUserId: string) {
    this.chatService.getConversation(this.currentUserId, otherUserId).subscribe({
      next: res => {
        this.messages = res;
        console.log('Loaded conversation:', res);
      },
      error: err => console.error('Error loading conversation:', err)
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