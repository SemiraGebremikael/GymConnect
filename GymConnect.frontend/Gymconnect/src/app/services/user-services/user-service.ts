import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserDto } from '../../interface/user/user-dto';
import { ApiServices } from '../api-services/api-services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<IUserDto[]>([]);
  user$ = this.userSource.asObservable();

  private apiService = inject(ApiServices);
  private isLoading = false;

  loadUsers(gymName: string): void {
    if (this.isLoading) {
      console.log('Hämtning pågår redan, hoppar över ytterligare anrop.');
      return;
    }

    const cachedUsers = this.userSource.getValue();
    if (cachedUsers.length > 0) {
      console.log('Användare redan laddade, hoppar över API-anrop.');
      return;
    }

    this.isLoading = true;
    console.log('🔹 Hämtar användare från API...');
    this.apiService.getAllUsers(gymName).subscribe({
      next: (data: IUserDto[]) => {
        console.log('Data från API:', data);
        this.userSource.next(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  getCurrentUsers(): IUserDto[] {
    return this.userSource.getValue();
  }
}
