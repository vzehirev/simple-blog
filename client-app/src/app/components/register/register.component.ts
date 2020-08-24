import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/register-model';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formInvalid: boolean;

  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') };
  get confirmPassword() { return this.registerForm.get('confirmPassword') };

  constructor(private usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', this.passwordValidator()),
      confirmPassword: new FormControl('')
    }, { validators: this.confirmPasswordValidator })
  }

  submitForm() {
    if (this.registerForm.invalid) {
      this.formInvalid = true;
      return;
    }

    const registerModel = new RegisterModel(this.email.value, this.password.value, this.confirmPassword.value);

    this.usersService.registerUser(registerModel).subscribe(
      (response => this.handleSuccess(response)),
      (response => this.handleError(response))
    );
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

  handleSuccess(response) {
    console.log('Success!')
  }

  handleError(response) {
    this.dialog.open(ModalDialogComponent, { data: { message: response.error.message } });
  }
}
