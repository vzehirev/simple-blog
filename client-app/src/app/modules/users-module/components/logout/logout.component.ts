import { Component, OnInit, AfterContentInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.logoutUser();
    this.router.navigate(['/']);
  }
}
