import { Routes } from '@angular/router';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transactions/transaction-detail/transaction-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transactions/:date/:id', component: TransactionDetailComponent }
];
