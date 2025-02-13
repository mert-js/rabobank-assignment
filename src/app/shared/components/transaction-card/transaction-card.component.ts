import { Component, Input } from '@angular/core';
import { Transactions } from '../../../core/models/transactions.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-card',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  @Input() transactionsByDay!: Transactions;
}
