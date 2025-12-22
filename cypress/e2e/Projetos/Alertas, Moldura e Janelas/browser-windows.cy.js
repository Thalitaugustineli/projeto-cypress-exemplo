describe('Janelas do navegador', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/browser-windows');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Browser Windows');
  });

  it('Validar Button: New Tab abre URL correta', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake(() => null).as('windowOpen');
    });

    cy.get('#tabButton')
      .should('be.visible')
      .and('be.enabled')
      .click();

    // Valida que window.open foi chamado uma vez e com a URL esperada
    cy.get('@windowOpen').should('have.been.calledOnce');
    cy.get('@windowOpen').should('be.calledWith', '/sample');
  });

  it('Validar Button: New Window abre URL correta', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake(() => null).as('windowOpen');
    });

    cy.get('#windowButton')
      .should('be.visible')
      .and('be.enabled')
      .click();

    // Valida que window.open foi chamado uma vez e com a URL esperada
    cy.get('@windowOpen').should('have.been.calledOnce');
    cy.get('@windowOpen').should('be.calledWith', '/sample');
  });

  it('Validar Button: New Window Message abre conteúdo esperado', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake(() => null).as('windowOpen');
    });

    cy.get('#messageWindowButton')
      .should('be.visible')
      .and('be.enabled')
      .click();

    // Valida que window.open foi chamado uma vez
    cy.get('@windowOpen').should('have.been.calledOnce');

    // Valida que a chamada foi feita com os parâmetros esperados
    cy.get('@windowOpen').should(
      'be.calledWith',
      '',
      'MsgWindow',
      'width=500,height=200'
    );
  });
});






