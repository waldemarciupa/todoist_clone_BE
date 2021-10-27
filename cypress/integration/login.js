describe('Login test', () => {
  it('Should login successfully', () => {
    cy.visit('http://localhost:3000/user/login');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[class*="sc-"]').click();

    cy.location('pathname').should('eq', '/');
  });

  it('Should login unsuccessfully', () => {
    cy.visit('http://localhost:3000/user/login');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('PASSWORD');
    cy.get('button[class*="sc-"]').click();

    cy.get('div.iaPchE').should('have.text', 'Invalid email or password');
  });
});
