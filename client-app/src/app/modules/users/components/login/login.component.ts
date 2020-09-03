import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { LoginUserModel } from 'src/app/models/users/login-user.model';
import { TokensModel } from 'src/app/models/users/tokens.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFormInvalid: boolean;

  constructor(private usersService: UsersService, private router: Router) { }

  get email() { return this.loginForm.get('email') };
  get password() { return this.loginForm.get('password') };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', Validators.required)
    })
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      this.isFormInvalid = true;
      return;
    }

    let loginUserModel = new LoginUserModel(this.email.value, this.password.value);

    this.usersService.getNewJwt(loginUserModel).subscribe(
      successReponse => this.handleSuccess(successReponse)
    );
  }

  handleSuccess(successResponse: TokensModel): void {
    this.usersService.persistSession(successResponse.token, this.email.value, successResponse.refreshToken);

    this.router.navigate(['/']);
  }
}
