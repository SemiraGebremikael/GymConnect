import { inject, Injectable } from '@angular/core';
import { MessageRequestDto } from '../../dto/message-request-dto';
import { MessageResponseDto } from '../../dto/message-response-dto';
import { Observable } from 'rxjs';
import { ApiServices } from '../api-service/api-services';
import { GetConversationRequestDto } from '../../dto/get-conversation-request-dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiService = inject(ApiServices);

  constructor() {}

 sendMessage(request: MessageRequestDto): Observable<MessageResponseDto> | undefined {
    if (!request.ReceiverId) return;
        console.log(' Sending message to API:', request);
    return this.apiService.sendMessage(request);
  }
  

  getConversation(request:GetConversationRequestDto): Observable<MessageResponseDto[]> {
    return this.apiService.getConversation(request);
}

}
