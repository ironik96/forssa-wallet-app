import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage!: string | null;
  username!: string;
  password!: string;
  confirmPassword!: string;
  isRegistering = false;

  checkError(formControl: NgModel): void {
    if (formControl.valid) {
      this.errorMessage = null;
      return;
    }
    if (formControl.value === '')
      this.errorMessage = 'username must have a value';
  }
  checkPasswordError(formControl: NgModel) {
    if (formControl.valid) {
      this.errorMessage = null;
      return;
    }
    if (formControl.value === '' || formControl.errors?.['pattern'])
      this.errorMessage =
        'password must be 8 charaters at least and cannot contain spaces';
  }

  checkConfirmPasswordError(password: string, confirmPasswordControl: NgModel) {
    if (password === confirmPasswordControl.value) return;

    confirmPasswordControl.control.setErrors({ passwordConfirmed: false });
    this.errorMessage = "passwords don't match";
  }

  toggleIsRegistering = () => (this.isRegistering = !this.isRegistering);

  onSubmit(formControl: NgForm) {
    if (formControl.invalid) return;
    this.username = formControl.value.username;
    this.password = formControl.value.password;
    this.isRegistering ? this.register() : this.login();
  }

  login() {
    console.log('logging in with the following credentials:');
    console.log('username: ', this.username);
    console.log('password: ', this.password);
  }
  register() {
    console.log('registering with the following credentials:');
    console.log('username: ', this.username);
    console.log('password: ', this.password);
  }
}
