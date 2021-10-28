describe('Registration', () => {
  it('Should create new user successfully', () => {
    cy.visit('/user/register');

    cy.get('input.sc-dkPtRN').first().type('jojo');
    cy.get('input[type="email"]').type('jopjo@test.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[class*="sc-"]').click();

    cy.location('pathname').should('eq', '/');

    cy.then(() => {
      cy.expect(localStorage.getItem('user')).exist;
    });
  });
});
