import { Component, inject } from '@angular/core';
import { Transactions } from '../../core/models/transactions.model';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  imports: [],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  transactionsByDay: Transactions[] = [];

  private transactionService = inject(TransactionService);

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => this.transactionsByDay = data);
  }

}
