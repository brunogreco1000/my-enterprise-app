/// <reference types="cypress" />

describe('Projects Page', () => {
  beforeEach(() => {
    cy.login('testuser@example.com', 'Test@1234');
    cy.visit('/projects');
  });

  it('should display all projects', () => {
    cy.get('[data-testid="project-card"]').should('exist');
  });

  it('should show message if no projects', () => {
    // Puedes mockear response vacía con intercept
    cy.intercept('GET', '/api/projects', { body: [] });
    cy.reload();
    cy.contains('No hay proyectos disponibles.').should('be.visible');
  });
});
