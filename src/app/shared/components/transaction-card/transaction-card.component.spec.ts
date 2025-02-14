import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCardComponent } from './transaction-card.component';
import { ActivatedRoute } from '@angular/router';

const mockTransactions = {
  id: '2024-02-13',
  transactions: [
    { id: 1, timestamp: '2024-02-13T10:00:00Z', amount: 90, currencyCode: 'USD', currencyRate: 0.9, description: 'Payment' },
    { id: 2, timestamp: '2024-02-13T12:00:00Z', amount: 50, currencyCode: 'EUR', description: 'Refund' }
  ]
};

describe('TransactionCardComponent', () => {
  let component: TransactionCardComponent;
  let fixture: ComponentFixture<TransactionCardComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = { snapshot: { paramMap: { get: () => null } } };

    await TestBed.configureTestingModule({
      imports: [TransactionCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCardComponent);
    component = fixture.componentInstance;
    component.transactionsByDay = mockTransactions;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
