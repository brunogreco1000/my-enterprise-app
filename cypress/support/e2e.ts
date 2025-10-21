/// <reference types="cypress" />

describe('Authentication Flow', () => {
  const user = {
    username: 'TestUser',
    email: 'testuser@example.com',
    password: 'Test@1234',
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain.text', 'Login');
  });
});
