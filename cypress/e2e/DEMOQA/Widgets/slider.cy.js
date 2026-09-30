describe('Slider', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/slider');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Slider');
  });

  it('Validar valor inicial do Slider', () => {
    cy.get('.range-slider').should('have.value', '25'); // valor padrão inicial
    cy.get('#sliderValue').should('have.value', '25');
  });

  it('Mover Slider para valor específico', () => {
    cy.get('.range-slider').invoke('val', 50).trigger('input');
    cy.get('#sliderValue').should('have.value', '50');
  });

  it('Mover Slider para o valor máximo', () => {
    cy.get('.range-slider').invoke('val', 100).trigger('input');
    cy.get('#sliderValue').should('have.value', '100');
  });

  it('Mover Slider para o valor mínimo', () => {
    cy.get('.range-slider').invoke('val', 0).trigger('input');
    cy.get('#sliderValue').should('have.value', '0');
  });

  it('Validar incremento do Slider', () => {
    cy.get('.range-slider').invoke('val', 30).trigger('input');
    cy.get('#sliderValue').should('have.value', '30');

    cy.get('.range-slider').invoke('val', 40).trigger('input');
    cy.get('#sliderValue').should('have.value', '40');
  });
});