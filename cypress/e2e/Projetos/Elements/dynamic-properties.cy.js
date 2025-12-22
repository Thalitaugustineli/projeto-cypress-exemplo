describe('Propriedades Dinâmicas - Images', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/dynamic-properties');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Dynamic Properties');
  });

  it('Botão habilita após 5 segundos', () => {
    // Inicialmente desabilitado
    cy.get('#enableAfter').should('be.disabled');

    // Espera 5 segundos
    cy.wait(5000);

    // Agora habilitado
    cy.get('#enableAfter').should('be.enabled');
  });

  it('Texto aparece após delay', () => {
    // Inicialmente não existe
    cy.get('#visibleAfter').should('not.exist');

    // Espera 5 segundos
    cy.wait(5000);

    // Agora visível
    cy.get('#visibleAfter')
      .should('be.visible')
      .and('contain.text', 'This text has appeared after 5 seconds');
  });

  it('Botão muda de cor após delay', () => {
    // Valida cor inicial
    cy.get('#colorChange')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 255, 255)'); // exemplo de cor inicial

    // Espera 5 segundos
    cy.wait(5000);

    // Valida que a cor mudou
    cy.get('#colorChange')
      .should('be.visible')
      .and('not.have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('Validação combinada: habilitação, visibilidade e cor', () => {
    // Botão habilita
    cy.get('#enableAfter').should('be.disabled');
    cy.wait(5000);
    cy.get('#enableAfter').should('be.enabled');

    // Texto aparece
    cy.get('#visibleAfter').should('be.visible');

    // Botão muda de cor
    cy.get('#colorChange').should('not.have.css', 'color', 'rgb(255, 255, 255)');
  });
});
