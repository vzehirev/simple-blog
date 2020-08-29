import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedUserGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }

  canActivate(): boolean {
    if (!this.usersService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }

    return this.usersService.isUserLoggedIn();
  }
}
