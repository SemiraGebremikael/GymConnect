import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDto } from '../../interface/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  private baseUrl = 'https://localhost:7110/api';

  constructor(private http: HttpClient) {}

getAllUsers(gymName: string): Observable<IUserDto[]> {
    return this.http.get<IUserDto[]>(`${this.baseUrl}/User/GetAllUsers?gymName=${gymName}`);
    
}

}