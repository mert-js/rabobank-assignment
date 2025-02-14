import { Component, inject, OnInit } from '@angular/core';
import { Transactions } from '../../core/models/transactions.model';
import { TransactionService } from '../../core/services/transaction.service';
import { TransactionCardComponent } from "../../shared/components/transaction-card/transaction-card.component";

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionCardComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {
  transactionsByDay: Transactions[] = [];

  private transactionService = inject(TransactionService);

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactionsByDay = data
        .map(day => ({
          ...day,
          transactions: day.transactions.sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        }))
        .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
    });
  }

}
