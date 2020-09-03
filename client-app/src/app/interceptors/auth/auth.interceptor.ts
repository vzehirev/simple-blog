import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersService } from '../../services/users/users.service';
import { Endpoints } from '../../endpoints';
import { switchMap, take, filter } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingJwt = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private usersService: UsersService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(Endpoints.Login)
      || request.url.includes(Endpoints.RefreshJwt)
      || request.url.includes(Endpoints.Register)
      || !this.usersService.isUserLoggedIn()) {
      return next.handle(request);
    }

    if (this.isTokenExpired()) {
      return this.refreshJwt(request, next);
    }

    return next.handle(this.setAuthorizationHeader(request));
  }

  private isTokenExpired(): boolean {
    if (this.usersService.isUserLoggedIn()) {
      let expiry = (JSON.parse(atob(localStorage.getItem('jwt').split('.')[1]))).exp;
      let nowPlusOneMinute = (Math.floor(((new Date).getTime() + 1 * 60000) / 1000));

      return nowPlusOneMinute >= expiry;
    }

    return true;
  }

  private refreshJwt(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isRefreshingJwt) {
      this.isRefreshingJwt = true;
      this.refreshTokenSubject.next(null);

      return this.usersService.refreshJwt().pipe(
        switchMap((response: any) => {
          this.isRefreshingJwt = false;
          this.usersService.persistSession(response.token, localStorage.getItem('email'), response.refreshToken);
          this.refreshTokenSubject.next(response);
          return next.handle(this.setAuthorizationHeader(request));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(response => response != null),
        take(1),
        switchMap(response => {
          this.usersService.persistSession(response.token, localStorage.getItem('email'), response.refreshToken);
          return next.handle(this.setAuthorizationHeader(request));
        }));
    }
  }

  private setAuthorizationHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let newRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
    });
    return newRequest;
  }
}
