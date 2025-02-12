import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private API_URL = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<{ days: { id: string, transactions: Transaction[] }[] }>(this.API_URL).pipe(
      map(response => response.days.flatMap(({ id: date, transactions }) =>
        transactions.map(transaction => ({
          ...transaction,
          date,
          amount: transaction.currencyCode === 'USD' ? transaction.amount * (transaction.currencyRate ?? 1) : transaction.amount
        }))
      ))
    );
  }
}
