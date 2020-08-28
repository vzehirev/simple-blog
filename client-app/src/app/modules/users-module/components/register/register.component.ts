import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router"
import { MatDialog } from '@angular/material/dialog';

import { RegisterUserModel } from '../../models/register-user-model';
import { UsersService } from '../../services/users.service';
import { ModalDialogComponent } from '../../../shared-layout-module/components/modal-dialog/modal-dialog.component';
import { LoginUserModel } from '../../models/login-user-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isFormInvalid: boolean;
  isLoading: boolean;

  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') };
  get confirmPassword() { return this.registerForm.get('confirmPassword') };

  constructor(private usersService: UsersService, public modalDialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', this.passwordValidator()),
      confirmPassword: new FormControl('')
    }, { validators: this.confirmPasswordValidator })
  }

  submitForm() {
    if (this.registerForm.invalid) {
      this.isFormInvalid = true;
      return;
    }

    const registerModel = new RegisterUserModel(this.email.value, this.password.value, this.confirmPassword.value);

    this.isLoading = true;

    this.usersService.registerUser(registerModel).subscribe(
      successResponse => this.handleSuccess(successResponse),
      errorResponse => this.handleError(errorResponse));
  }

  handleSuccess(successResponse: any) {
    let loginUserModel = new LoginUserModel(this.email.value, this.password.value);

    this.usersService.getNewJwt(loginUserModel).subscribe(
      (successResponse => this.usersService.persistSession(successResponse.token, this.email.value)),
      (errorResponse => this.handleError(errorResponse)));

    this.isLoading = false;

    this.router.navigate(['/']);
  }

  handleError(errorResponse: any) {
    this.isLoading = false;
    this.modalDialog.open(ModalDialogComponent, { data: { message: errorResponse.error.message } });
  }

  private passwordValidator(): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } | null => {
      const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/);
      return !regex.test(formControl.value) ? { passwordInvalid: { value: formControl.value } } : null;
    };
  }

  private confirmPasswordValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { confirmPasswordInvalid: true } : null;
  };
}