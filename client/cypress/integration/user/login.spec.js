describe('Login - inupts required', () => {
  beforeEach(() => {
    cy.visit('/users/login');
  });

  it('should successfully load login page', () => {
    cy.url().should('include', '/users/login');
    cy.contains('h2', 'Log in');
  });

  it('inputs and error element should be initially empty', () => {
    cy.get('[type=email]').should('have.value', '');
    cy.get('[type=password]').should('have.value', '');
    cy.get('.sc-faUpoM').should(($el) => {
      expect($el.text().trim()).equal('');
    });
  });

  it('should be able to type an email and password', () => {
    cy.get('[type=email]')
      .type('email@gmail.com')
      .should('have.value', 'email@gmail.com');

    cy.get('[type=password]')
      .type('realy!strongp4ssw0rd')
      .should('have.value', 'realy!strongp4ssw0rd');
  });

  it('should show error message on invalid email or password', () => {
    cy.get('[type=email]').type('email@gmail.com');
    cy.get('[type=password]').type('realy!strongp4ssw0rd');
    cy.get('button').click();
    cy.get('.sc-faUpoM').contains('Invalid email or password');
  });
});
