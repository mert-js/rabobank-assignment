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

  it('should navigate to the transaction details page when a transaction is clicked and display correct transaction details', () => {
    cy.wait('@getTransactions');

    cy.get('.transaction-card a').first().click();

    cy.url().should('include', '/transactions/2022-11-08/1');

    cy.get('.transaction-detail').within(() => {
      cy.contains('h2', 'Mister XX');
      cy.contains('span', 'NL00RABO0123456789');
      cy.contains('h3', '+€ 21,07');
      cy.contains('label[for="transaction-date"]', 'Uitvoering');
      cy.contains('span[name="transaction-date"]', '08-11-2022 15:30');
      cy.contains('label[for="other-party-iban"]', 'Rekening');
      cy.contains('span[name="other-party-iban"]', 'NL00RABO0123456789');
      cy.contains('label[for="transaction-description"]', 'Omschrijving');
      cy.contains('span[name="transaction-description"]', 'Some interesting description');
    });
  });
})
