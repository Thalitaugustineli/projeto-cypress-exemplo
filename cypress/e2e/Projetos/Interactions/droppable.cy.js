describe('Droppable', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/droppable');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Droppable');
  });
  }); // Fim do describe