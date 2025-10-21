/// <reference types="cypress" />

describe('Tasks', () => {
  beforeEach(() => {
    cy.login('testuser@example.com', 'Test@1234');
    cy.visit('/');
  });

  it('should add new task', () => {
    cy.get('input[placeholder="New task"]').type('Tarea E2E');
    cy.get('button').contains('Add').click();
    cy.contains('Tarea E2E').should('be.visible');
  });

  it('should maintain tasks after reload (optional)', () => {
    cy.get('input[placeholder="New task"]').type('Persistente');
    cy.get('button').contains('Add').click();
    cy.reload();
    cy.contains('Persistente').should('be.visible');
  });
});
