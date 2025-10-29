import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUserDto } from '../interface/user/user-dto';
import { UserService } from '../services/user-services/user-service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  users$: Observable<IUserDto[]>;
  gymToFetch = 'nordicgym';

  constructor(private userService: UserService) {
    this.users$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.loadUsers(this.gymToFetch);
  }
}
