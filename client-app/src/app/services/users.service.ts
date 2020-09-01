import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RegisterUserModel } from '../models/register-user-model';
import { Endpoints } from '../endpoints';
import { LoginUserModel } from '../models/login-user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  registerUser(registerUserModel: RegisterUserModel): Observable<any> {
    return this.httpClient.post(Endpoints.Server + Endpoints.Register, registerUserModel);
  }

  getNewJwt(loginUserModel: LoginUserModel): Observable<any> {
    return this.httpClient.post(Endpoints.Server + Endpoints.Login, loginUserModel);
  }

  persistSession(jwt: string, email: string, refreshToken: string): void {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('email', email);
    localStorage.setItem('refresh', refreshToken);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('jwt') !== null && localStorage.getItem('email') !== null && localStorage.getItem('refresh') !== null;
  }

  logoutUser(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('refresh');
  }

  refreshJwt(): Observable<any> {
    let expiredJwtHeader = new HttpHeaders();
    expiredJwtHeader = expiredJwtHeader
      .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
      .set('Refresh', localStorage.getItem('refresh'));

    return this.httpClient.post(Endpoints.Server + Endpoints.RefreshJwt, {}, {
      headers: expiredJwtHeader
    });
  }
}
