describe('Frames', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/frames');
    cy.viewport(1920, 1080);
  });

  it('Validar Título e Texto da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Frames');

    // Valida texto explicativo da página
    cy.get('#framesWrapper > :nth-child(2)')
      .should('be.visible')
      .and('contain.text', 'Sample Iframe page')
      .and('contain.text', '2 Iframes')
      .and('contain.text', 'switch between the parent frame');
  });

  it('Validação do conteúdo do Frame1', () => {
    // Carrega o iframe pelo seletor
    cy.frameLoaded('#frame1');

    // Acessa o conteúdo do iframe e valida o texto
    cy.iframe('#frame1')
      .find('h1')
      .should('be.visible')
      .and('have.text', 'This is a sample page');

    // Valida que o iframe está presente e com dimensões corretas
    cy.get('#frame1')
      .should('have.attr', 'src')
      .and('include', 'sample')
      .and('match', /sample/);
  });

  it('Validação do conteúdo do Frame2', () => {
    // Carrega o iframe pelo seletor
    cy.frameLoaded('#frame2');

    // Acessa o conteúdo do iframe e valida o texto
    cy.iframe('#frame2')
      .find('h1')
      .should('be.visible')
      .and('have.text', 'This is a sample page');

    // Valida que o iframe está presente e com dimensões corretas
    cy.get('#frame2')
      .should('have.attr', 'src')
      .and('include', 'sample')
      .and('match', /sample/);
  });
});