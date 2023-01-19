import { BankAccount } from './bank-account.model';

export interface User {
  id?: number;
  username: string;
  password?: string;
  bankAccounts?: BankAccount[];
}
