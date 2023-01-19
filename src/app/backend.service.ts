import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/user.model';
import { lastValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { BankAccount } from './models/bank-account.model';

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

  async register(user: User): Promise<void> {
    const response = await lastValueFrom(
      this.http.post<User>(this._url('api/users/register'), user)
    );
    if (!response) return;
    this.user = response;
    this.saveUser();
  }

  async login(user: User): Promise<void> {
    const response = await lastValueFrom(
      this.http.post<User>(this._url('api/users/signin'), user)
    );
    if (!response) return;
    this.user = response;
    this.saveUser();
  }

  signout() {
    this.user = undefined;
    this.storage.removeUser();
  }

  async createBankAccount(): Promise<void> {
    const response = await lastValueFrom(
      this.http.post<BankAccount>(
        this._url(`api/users/${this.user?.id}/bank-account`),
        null
      )
    );
    if (!response) return;
    this.user?.bankAccounts == null
      ? (this.user!.bankAccounts = [response])
      : this.user.bankAccounts.push(response);
    this.saveUser();
  }

  private _url(url: string): string {
    return `${BASE_URL}/${url}`;
  }

  private saveUser(): void {
    this.storage.saveUser(this.user!);
  }
}
