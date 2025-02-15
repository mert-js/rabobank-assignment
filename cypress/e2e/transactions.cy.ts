describe('Transactions E2E test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/transactions', {
      fixture: 'transactions.json',
    }).as('getTransactions');
    cy.visit('/');
  });

  it('should display the transactions list sorted by days', () => {
    cy.wait('@getTransactions');

    cy.get('.transaction-card').then((cards) => {
      const days = [...cards].map(card => card.querySelector('p')?.innerText);
      expect(days).to.deep.equal(['8 november 2022', '6 november 2022', '5 november 2022', '2 november 2022']);
    });
  });

  it('should navigate to the transaction details page when a transaction is clicked', () => {
    cy.wait('@getTransactions');

    cy.get('.transaction-card a').first().click();

    cy.url().should('include', '/transactions/2022-11-08/1');
  });
})
