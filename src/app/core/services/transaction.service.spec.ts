import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Transactions } from '../models/transactions.model';

const mockResponse = {
  days: [
    {
      id: '2024-02-13',
      transactions: [
        { id: 1, timestamp: '2024-02-13T10:00:00Z', amount: 100, currencyCode: 'USD', currencyRate: 0.9, description: 'Payment' },
        { id: 2, timestamp: '2024-02-13T12:00:00Z', amount: 50, currencyCode: 'EUR', description: 'Refund' }
      ]
    }
  ]
};

const expectedData: Transactions[] = [
  {
    id: '2024-02-13',
    transactions: [
      { id: 1, timestamp: '2024-02-13T10:00:00Z', amount: 90, currencyCode: 'USD', currencyRate: 0.9, description: 'Payment' },
      { id: 2, timestamp: '2024-02-13T12:00:00Z', amount: 50, currencyCode: 'EUR', description: 'Refund' }
    ]
  }
];

const API_URL = 'http://localhost:8080/api/transactions';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TransactionService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch and transform transactions', () => {
    service.getTransactions().subscribe((transactions) => {
      expect(transactions).toEqual(expectedData);
      expect(transactions[0].transactions[0].amount).toBe(90);
    });

    const req = httpTesting.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
