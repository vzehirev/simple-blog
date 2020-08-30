import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { UsersService } from '../services/users.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private usersService: UsersService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isTokenExpired()) {

    }
    let modifiedRequest = request.clone();

    console.log(this.isTokenExpired());
    return next.handle(request);
  }

  private isTokenExpired(): boolean {
    if (this.usersService.isUserLoggedIn()) {
      const expiry = (JSON.parse(atob(localStorage.getItem('jwt').split('.')[1]))).exp;
      return (Math.floor(((new Date).getTime() - 1 * 60000) / 1000)) >= expiry;
    }

    return true;
  }

  private refreshJwt(): Observable<any> {
    // TODO
    return new Observable();
  }
}
