import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interface/iuser/iuser';
import { MessageRequestDto } from '../../dto/message-request-dto';
import { MessageResponseDto } from '../../dto/message-response-dto';
import { UserDto } from '../../dto/userDto';
import { GetConversationRequestDto } from '../../dto/get-conversation-request-dto';
import { R } from '@angular/cdk/keycodes';
@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  private baseUrl = 'https://localhost:7110/api';

  constructor(private http: HttpClient) {}

getAllUsers(gymName: string): Observable<UserDto[]> {
  console.log('ApiServices: Fetching all users for gym:', gymName);
    return this.http.get<IUser[]>(`${this.baseUrl}/User/GetAllUsers?gymName=${gymName}`);
    
}

sendMessage(request: MessageRequestDto): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>( `${this.baseUrl}/Message/SendMessage`,
      request
    );
  }

// getConversation(request: GetConversationRequestDto): Observable<MessageResponseDto[]> {
//   const params = {
//     userId: request.userId,
//     otherUserId: request.otherUserId,
//     page: request.page?.toString() || '1',
//     pageSize: request.pageSize?.toString() || '20'
//   };
//   console.log('ApiServices: Fetching conversation with params:', params);
//   return this.http.get<MessageResponseDto[]>(`${this.baseUrl}/Message/GetConversation`, { params });

// }


getConversation(req: GetConversationRequestDto): Observable<MessageResponseDto[]> {
    const params = new HttpParams()
      .set('UserId', req.userId)           // matchar backend DTO
      .set('OtherUserId', req.otherUserId) // matchar backend DTO
      .set('Page', String(req.page))
      .set('PageSize', String(req.pageSize));

    return this.http.get<MessageResponseDto[]>(
      `${this.baseUrl}/Message/GetConversation`,
      { params }
    );
  }


searchUsers(query: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/User/Search`, {
      params: { query }
    });
  }

}