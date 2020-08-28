import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }
}
