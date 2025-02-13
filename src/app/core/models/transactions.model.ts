import { OtherParty } from './other-party.model';

export interface Transaction {
  id: number;
  timestamp: string;
  amount: number;
  currencyCode: string;
  currencyRate?: number;
  description: string;
  otherParty?: OtherParty;
}

export interface Transactions {
  id: string,
  transactions: Transaction[],
}
