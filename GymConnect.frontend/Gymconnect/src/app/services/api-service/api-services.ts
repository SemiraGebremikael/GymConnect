import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interface/iuser/iuser';
import { MessageRequestDto } from '../../dto/message-request-dto';
import { MessageResponseDto } from '../../dto/message-response-dto';
import { UserDto } from '../../dto/userDto';
@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  private baseUrl = 'https://localhost:7110/api';

  constructor(private http: HttpClient) {}

getAllUsers(gymName: string): Observable<UserDto[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/User/GetAllUsers?gymName=${gymName}`);
    
}

sendMessage(request: MessageRequestDto): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>( `${this.baseUrl}/Message/SendMessage`,
      request
    );
  }

  getConversation(userId: string, otherUserId: string, page: number = 1, pageSize: number = 20): Observable<MessageResponseDto[]> {
  return this.http.get<MessageResponseDto[]>(
    `${this.baseUrl}/Message/GetConversation?userId=${userId}&otherUserId=${otherUserId}&page=${page}&pageSize=${pageSize}`
  );
}

}