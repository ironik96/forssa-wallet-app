import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { BankAccount } from '../models/bank-account.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user!: User;
  constructor(private backend: BackendService) {
    this.user = this.backend.user!;
  }

  get bankAccount(): BankAccount | null {
    return this.user.bankAccounts == null ? null : this.user.bankAccounts[0];
  }

  createBankAccount() {
    this.backend
      .createBankAccount()
      .catch((errorResponse: HttpErrorResponse) =>
        console.log(errorResponse.error.errorMessage)
      );
  }
}
