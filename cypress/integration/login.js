describe('Login test', () => {
  it('Should login successfully', () => {
    cy.visit('/user/login');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[class*="sc-"]').click();

    cy.location('pathname')
      .should('eq', '/')
      .then(() => {
        cy.expect(localStorage.getItem('user')).exist;
      });
  });

  it('Should login unsuccessfully', () => {
    cy.visit('/user/login');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('PASSWORD');
    cy.get('button[class*="sc-"]').click();

    cy.get('div.iaPchE')
      .should('have.text', 'Invalid email or password')
      .then(() => {
        cy.expect(localStorage.getItem('user')).to.be.null;
      });
  });
});
