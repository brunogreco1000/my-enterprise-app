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

  it('should show error on invalid credentials', () => {
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains(/credenciales inválidas/i).should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // Debe redirigir al dashboard
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('Hi, TestUser').should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });

  it('should logout correctly', () => {
    // Primero loguearse
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // Luego hacer logout
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/login');
    cy.contains('Login').should('be.visible');
  });
});
