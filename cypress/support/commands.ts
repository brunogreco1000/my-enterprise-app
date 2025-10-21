// Importaciones si hay más comandos
// import './commands'; // opcional si no tienes otros comandos

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('register', (username: string, email: string, password: string) => {
  cy.visit('/register');
  cy.get('input[placeholder="Tu nombre de usuario"]').type(username);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
