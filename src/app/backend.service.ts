import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/user.model';
import { lastValueFrom } from 'rxjs';
import { StorageService } from './storage.service';

const BASE_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  user?: User;
  constructor(private http: HttpClient, private storage: StorageService) {
    const storageUser = storage.readUser();
    if (storageUser) this.user = storageUser;
  }

  async register(user: User): Promise<void | HttpErrorResponse> {
    try {
      const response = await lastValueFrom(
        this.http.post<User>(this._url('api/users/register'), user)
      );
      this.setUser(response);
    } catch (error) {
      return error as HttpErrorResponse;
    }
  }

  async login(user: User): Promise<void | HttpErrorResponse> {
    try {
      const response = await lastValueFrom(
        this.http.post<User>(this._url('api/users/signin'), user)
      );
      this.setUser(response);
    } catch (error) {
      return error as HttpErrorResponse;
    }
  }

  private _url(url: string): string {
    return `${BASE_URL}/${url}`;
  }

  private setUser(user: User): void {
    this.user = user;
    this.storage.saveUser(user);
  }
}
