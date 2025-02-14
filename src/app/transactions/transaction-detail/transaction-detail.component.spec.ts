import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailComponent } from './transaction-detail.component';
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
  }
];
describe('TransactionDetailComponent', () => {
  let component: TransactionDetailComponent;
  let fixture: ComponentFixture<TransactionDetailComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTransactionService = jasmine.createSpyObj('TransactionService', ['getTransactions']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.callFake((key: string) => {
            if (key === 'date') return '2024-02-13';
            if (key === 'id') return '1';
            return null;
          }),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [TransactionDetailComponent],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    })
    .compileComponents();

    mockTransactionService.getTransactions.and.returnValue(of(mockTransactions));

    fixture = TestBed.createComponent(TransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch transaction details based on date and id', () => {
    expect(mockTransactionService.getTransactions).toHaveBeenCalled();
    expect(component.transaction?.id).toBe(1);
  });
});
