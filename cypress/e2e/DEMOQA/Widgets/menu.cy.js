describe('Menu', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/menu');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Menu');
  });

  it('Validar itens principais do Menu', () => {
    cy.get('#nav > li').should('have.length', 3); // Main Item 1, 2, 3
    cy.get('#nav').should('contain.text', 'Main Item 1');
    cy.get('#nav').should('contain.text', 'Main Item 2');
    cy.get('#nav').should('contain.text', 'Main Item 3');
  });

  it('Abrir submenu do Main Item 2', () => {
    cy.contains('li', 'Main Item 2').trigger('mouseover');
    cy.get('#nav > li:nth-child(2) ul li')
      .should('be.visible')
      .and('contain.text', 'Sub Item');
  });

  it('Abrir submenu do Sub Item e validar opções', () => {
    cy.contains('li', 'Main Item 2').trigger('mouseover');
    cy.contains('li', 'SUB SUB LIST »').trigger('mouseover');

    cy.get('#nav > li:nth-child(2) ul li ul li')
      .should('be.visible')
      .and('contain.text', 'Sub Sub Item 1')
      .and('contain.text', 'Sub Sub Item 2');
  });

  it('Validar que o Main Item 3 não possui submenu', () => {
    cy.contains('li', 'Main Item 3').trigger('mouseover');
    cy.contains('li', 'Main Item 3').find('ul').should('not.exist');
  });
});