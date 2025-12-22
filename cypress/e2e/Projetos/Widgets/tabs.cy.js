describe('Tabs', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/tabs');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Tabs');
  });
  }); // Fim do describe