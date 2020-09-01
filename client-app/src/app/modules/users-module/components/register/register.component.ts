import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserModel } from 'src/app/models/register-user-model';
import { LoginUserModel } from 'src/app/models/login-user-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isFormInvalid: boolean;

  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') };
  get confirmPassword() { return this.registerForm.get('confirmPassword') };

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', this.passwordValidator()),
      confirmPassword: new FormControl('')
    }, { validators: this.confirmPasswordValidator })
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      this.isFormInvalid = true;
      return;
    }

    const registerModel = new RegisterUserModel(this.email.value, this.password.value, this.confirmPassword.value);

    this.usersService.registerUser(registerModel).subscribe(
      () => this.handleSuccess());
  }

  handleSuccess(): void {
    let loginUserModel = new LoginUserModel(this.email.value, this.password.value);

    this.usersService.getNewJwt(loginUserModel).subscribe(
      successResponse => {
        this.usersService.persistSession(successResponse.token, this.email.value, successResponse.refreshToken);
      }
    );

    this.router.navigate(['/']);
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
