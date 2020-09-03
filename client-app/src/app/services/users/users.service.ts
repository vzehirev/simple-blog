import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUserModel } from '../../models/users/register-user.model';
import { Endpoints } from '../../endpoints';
import { LoginUserModel } from '../../models/users/login-user.model';
import { TokensModel } from '../../models/users/tokens.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  registerUser(registerUserModel: RegisterUserModel): Observable<any> {
    return this.httpClient.post(Endpoints.Server + Endpoints.Register, registerUserModel);
  }

  getNewJwt(loginUserModel: LoginUserModel): Observable<TokensModel> {
    return this.httpClient.post<TokensModel>(Endpoints.Server + Endpoints.Login, loginUserModel);
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

  refreshJwt(): Observable<TokensModel> {
    let expiredJwtHeader = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
      .set('Refresh', localStorage.getItem('refresh'));

    return this.httpClient.post<TokensModel>(Endpoints.Server + Endpoints.RefreshJwt, {}, {
      headers: expiredJwtHeader
    });
  }
}
