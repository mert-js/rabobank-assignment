import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from '../../core/services/transaction.service';
import { of } from 'rxjs';
import { Transactions } from '../../core/models/transactions.model';
import { ActivatedRoute } from '@angular/router';

const mockTransactions: Transactions[] = [
  {
    id: '2024-02-13',
    transactions: [
      { id: 1, timestamp: '2024-02-13T10:00:00Z', amount: 90, currencyCode: 'USD', currencyRate: 0.9, description: 'Payment' },
      { id: 2, timestamp: '2024-02-13T12:00:00Z', amount: 50, currencyCode: 'EUR', description: 'Refund' }
    ]
  },
  {
    id: '2024-02-14',
    transactions: [
      { id: 1, timestamp: '2024-02-13T10:00:00Z', amount: 90, currencyCode: 'USD', currencyRate: 0.9, description: 'Payment' },
      { id: 2, timestamp: '2024-02-13T12:00:00Z', amount: 50, currencyCode: 'EUR', description: 'Refund' }
    ]
  }
];

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTransactionService = jasmine.createSpyObj('TransactionService', ['getTransactions']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => null } } };

    await TestBed.configureTestingModule({
      imports: [TransactionListComponent],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    })
    .compileComponents();

    mockTransactionService.getTransactions.and.returnValue(of(mockTransactions));

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch transactions on init', () => {
    fixture.detectChanges();

    expect(mockTransactionService.getTransactions).toHaveBeenCalled();
    expect(component.transactionsByDay.length).toBe(2);
    expect(component.transactionsByDay[0].transactions.length).toBe(2);
  });

  it('should sort transactions by day', () => {
    const days = component.transactionsByDay.map(day => day.id);
    expect(days).toEqual(['2024-02-14', '2024-02-13']);
  });

  it('should sort transactions grouped within a day', () => {
    const transactions = component.transactionsByDay[0].transactions;
    expect(new Date(transactions[0].timestamp).getTime()).toBeGreaterThan(
      new Date(transactions[1].timestamp).getTime()
    );
  });
});
