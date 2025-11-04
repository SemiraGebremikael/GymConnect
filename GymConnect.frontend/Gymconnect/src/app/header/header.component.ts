import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { UserDto } from '../dto/userDto';
import { UserService } from '../services/user-service/user-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  users:UserDto[] = [];

  private userSevice = inject(UserService);

// search() {
//     this.userSevice.searchUsers(this.users);
//   }

}
