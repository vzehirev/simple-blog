import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/modules/shared-layout-module/components/modal-dialog/modal-dialog.component';
import { LoginUserModel } from 'src/app/models/login-user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFormInvalid: boolean;
  isLoading: boolean;

  constructor(private usersService: UsersService, public modalDialog: MatDialog, private router: Router) { }

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
    
    this.isLoading = true;

    let loginUserModel = new LoginUserModel(this.email.value, this.password.value);

    this.usersService.getNewJwt(loginUserModel).subscribe(
      successReponse => this.handleSuccess(successReponse),
      errorResponse => this.handleError(errorResponse)
    );
  }

  handleSuccess(successResponse: any): void {
    this.isLoading = false;

    this.usersService.persistSession(successResponse.token, this.email.value);

    this.router.navigate(['/']);
  }

  handleError(errorResponse: any): void {
    this.isLoading = false;

    this.modalDialog.open(ModalDialogComponent, { data: { message: errorResponse.error.message } });
  }
}
