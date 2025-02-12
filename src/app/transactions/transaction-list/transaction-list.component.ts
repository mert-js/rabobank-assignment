import { Component, inject } from '@angular/core';
import { Transaction } from '../../core/models/transaction.model';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  imports: [],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  transactions: Transaction[] = [];

  private transactionService = inject(TransactionService);

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => this.transactions = data);
  }

}
