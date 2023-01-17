import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { User } from '../models/user.model';

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

  constructor(private router: Router, private backend: BackendService) {}

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

  async onSubmit(formControl: NgForm) {
    if (formControl.invalid) return;
    this.username = formControl.value.username;
    this.password = formControl.value.password;
    this.isRegistering ? await this.register() : await this.login();
    this.router.navigate(['home']);
  }

  async login(): Promise<void> {
    console.log('logging in with the following credentials:');
    console.log('username: ', this.username);
    console.log('password: ', this.password);
  }
  async register(): Promise<void> {
    console.log('registering ...');
    this.backend.register(this._currentUser);
  }

  private get _currentUser(): User {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
