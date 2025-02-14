import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../core/models/transactions.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-detail',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css'
})
export class TransactionDetailComponent implements OnInit {
  private transactionService = inject(TransactionService);
  private route = inject(ActivatedRoute);

  transaction?: Transaction;

  ngOnInit(): void {
    const date = this.route.snapshot.paramMap.get('date');
    const id = this.route.snapshot.paramMap.get('id');

    if (date && id) {
      this.transactionService.getTransactions().subscribe(days => {
        const transactionsById = days.find(d => d.id === date);
        this.transaction = transactionsById?.transactions.find(t => t.id.toString() === id);
      })
    }
  }

}
