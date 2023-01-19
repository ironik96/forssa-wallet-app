import { Injectable } from '@angular/core';
import { User } from './models/user.model';

const AUTH_KEY = 'AUTH';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveUser(user: User): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  readUser(): User | null {
    const userString = localStorage.getItem(AUTH_KEY);
    return userString ? JSON.parse(userString) : null;
  }
}
