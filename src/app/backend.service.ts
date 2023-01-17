import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { lastValueFrom } from 'rxjs';

const BASE_URL = 'localhost:8080';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  user?: User;
  constructor(private http: HttpClient) {}

  async register(user: User): Promise<void> {
    this.user = await lastValueFrom(
      this.http.get<User>(this._url('api/users/register'))
    );
  }

  private _url(url: string): string {
    return `${BASE_URL}/${url}`;
  }
}
