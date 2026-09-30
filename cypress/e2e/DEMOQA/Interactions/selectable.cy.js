describe('Selectable', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/selectable');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Selectable');
  });

  it('Selecionar itens no modo List', () => {
    // Seleciona Item 1
    cy.contains('li', 'Cras justo odio').click().should('have.class', 'active');

    // Seleciona Item 2
    cy.contains('li', 'Dapibus ac facilisis in').click().should('have.class', 'active');

    // Valida que ambos estão ativos
    cy.get('#verticalListContainer li.active').should('have.length', 2);
  });

  it('Selecionar e desmarcar itens no modo List', () => {
    cy.contains('li', 'Morbi leo risus').click().should('have.class', 'active');

    // Clica novamente para desmarcar
    cy.contains('li', 'Morbi leo risus').click().should('not.have.class', 'active');
  });

  it('Selecionar itens no modo Grid', () => {
    cy.contains('Grid').click();

    // Seleciona alguns itens
    cy.contains('li', 'One').click().should('have.class', 'active');
    cy.contains('li', 'Three').click().should('have.class', 'active');
    cy.contains('li', 'Seven').click().should('have.class', 'active');

    // Valida quantidade de selecionados
    cy.get('#gridContainer li.active').should('have.length', 3);
  });

  it('Selecionar todos os itens no modo Grid', () => {
    cy.contains('Grid').click();

    // Seleciona todos os itens
    cy.get('#gridContainer li').each($el => {
      cy.wrap($el).click().should('have.class', 'active');
    });

    // Valida que todos estão ativos
    cy.get('#gridContainer li.active').should('have.length', 9);
  });
});