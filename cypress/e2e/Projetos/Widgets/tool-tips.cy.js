describe('Tool Tips', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/tool-tips');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Tool Tips');
  });

  it('Validar tooltip do botão', () => {
    cy.get('#toolTipButton')
      .trigger('mouseover'); // simula hover

    cy.get('.tooltip-inner')
      .should('be.visible')
      .and('contain.text', 'You hovered over the Button');
  });

  it('Validar tooltip do campo de texto', () => {
    cy.get('#toolTipTextField')
      .trigger('mouseover');

    cy.get('.tooltip-inner')
      .should('be.visible')
      .and('contain.text', 'You hovered over the text field');
  });

  it('Validar tooltip do link "Contrary"', () => {
    cy.contains('a', 'Contrary').trigger('mouseover');

    cy.get('.tooltip-inner')
      .should('be.visible')
      .and('contain.text', 'You hovered over the Contrary');
  });

  it('Validar tooltip do link "1.10.32"', () => {
    cy.contains('a', '1.10.32').trigger('mouseover');

    cy.get('.tooltip-inner')
      .should('be.visible')
      .and('contain.text', 'You hovered over the 1.10.32');
  });
});