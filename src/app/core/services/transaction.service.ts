import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Transactions } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private API_URL = 'http://localhost:8080/api/transactions';
  private http = inject(HttpClient);

  getTransactions(): Observable<Transactions[]> {
    return this.http.get<{ days: Transactions[] }>(this.API_URL).pipe(
      map(response =>
        response.days.map(day => ({
          id: day.id,
          transactions: day.transactions.map(transaction => ({
            ...transaction,
            amount: transaction.currencyCode === 'USD' ? transaction.amount * (transaction.currencyRate ?? 1) : transaction.amount
          }))
        }))
      )
    );
  }
}
