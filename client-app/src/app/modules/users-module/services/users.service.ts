import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { RegisterUserModel } from '../models/register-user-model';
import { GlobalEndpoints } from 'src/app/global-endpoints';
import { UsersEndpoints } from './users-endpoints';
import { LoginUserModel } from '../models/login-user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  registerUser(registerUserModel: RegisterUserModel): any {
    return this.httpClient.post(GlobalEndpoints.Server + UsersEndpoints.Register, registerUserModel);
  }

  getNewJwt(loginUserModel: LoginUserModel): Observable<any> {
    return this.httpClient.post(GlobalEndpoints.Server + UsersEndpoints.Login, loginUserModel);
  }

  persistSession(jwtToken: string, email: string) {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('email', email);
  }
}
