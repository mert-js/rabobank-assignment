import { Component, Input } from '@angular/core';
import { Transactions } from '../../../core/models/transactions.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-card',
  imports: [DatePipe],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  @Input() transactionsByDay!: Transactions;
}
