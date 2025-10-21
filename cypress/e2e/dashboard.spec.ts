/// <reference types="cypress" />

describe('Dashboard', () => {
  beforeEach(() => {
    cy.login('testuser@example.com', 'Test@1234'); // Puedes crear un comando custom
    cy.visit('/');
  });

  it('should display project cards', () => {
    cy.get('[data-testid="project-card"]').should('exist');
  });

  it('should add a task', () => {
    cy.get('input[placeholder="New task"]').type('Nueva tarea');
    cy.get('button').contains('Add').click();
    cy.contains('Nueva tarea').should('be.visible');
  });

  it('should export projects', () => {
    cy.get('button').contains('Export PDF').should('be.visible');
    cy.get('button').contains('Export Excel').should('be.visible');
  });

  it('should render project progress chart', () => {
    cy.get('svg').should('exist'); // Recharts renderiza como svg
  });
});
