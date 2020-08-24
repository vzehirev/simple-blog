import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  registerUser(userModel: RegisterModel): Observable<any> {
    return this.httpClient.post('https://localhost:44316/auth/register', userModel);
  }
}
