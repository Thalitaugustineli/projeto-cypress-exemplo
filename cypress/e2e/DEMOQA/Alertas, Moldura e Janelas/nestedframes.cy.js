describe('Nested Frames', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/nestedframes');
    cy.viewport(1920, 1080);
  });

  it('Validar Título e Texto da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Nested Frames');

    // Valida texto explicativo da página
    cy.get('#framesWrapper > :nth-child(2)')
      .should('be.visible')
      .and('contain.text', 'Sample Nested Iframe page')
      .and('contain.text', 'nested iframes')
      .and('contain.text', 'parent frame')
      .and('contain.text', 'child frame');
  });

  it('Validação do Frame Pai e Frame Filho', () => {
    // Carrega o frame pai
    cy.frameLoaded('#frame1');

    // Valida conteúdo do frame pai
    cy.get('#frame1')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .should('contain.text', 'Parent frame');

    // Valida que o iframe filho existe dentro do pai
    cy.get('#frame1')
      .its('0.contentDocument.body')
      .then(cy.wrap)
      .find('iframe')
      .should('exist')
      .and('be.visible');

    // Valida conteúdo do frame filho
    cy.get('#frame1')
      .its('0.contentDocument.body')
      .then(cy.wrap)
      .find('iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .find('p')
      .should('contain.text', 'Child Iframe');
  });
});