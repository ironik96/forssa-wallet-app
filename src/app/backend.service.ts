import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/user.model';
import { lastValueFrom } from 'rxjs';

const BASE_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  user?: User;
  constructor(private http: HttpClient) {}

  async register(user: User): Promise<void | HttpErrorResponse> {
    try {
      this.user = await lastValueFrom(
        this.http.post<User>(this._url('api/users/register'), user)
      );
    } catch (error) {
      return error as HttpErrorResponse;
    }
  }

  async login(user: User): Promise<void | HttpErrorResponse> {
    try {
      this.user = await lastValueFrom(
        this.http.post<User>(this._url('api/users/signin'), user)
      );
    } catch (error) {
      return error as HttpErrorResponse;
    }
  }

  private _url(url: string): string {
    return `${BASE_URL}/${url}`;
  }
}
