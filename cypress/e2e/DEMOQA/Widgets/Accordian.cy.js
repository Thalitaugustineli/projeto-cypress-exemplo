describe('Accordian', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/accordian');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Accordian');
  });

  it('Primeira Pergunta sempre aberta e toggle funcionando', () => {
    cy.get('#section1Heading').should('be.visible');
    cy.get('#section1Content').should('be.visible');

    // Fecha a primeira seção
    cy.get('#section1Heading').click();
    cy.get('#section1Content').should('not.be.visible');

    // Reabre para validar toggle
    cy.get('#section1Heading').click();
    cy.get('#section1Content').should('be.visible');
  });

  it('Abrir e fechar perguntas individualmente', () => {
    // Fecha a primeira
    cy.get('#section1Heading').click();
    cy.get('#section1Content').should('not.be.visible');

    // Abre/fecha segunda
    cy.get('#section2Heading').click();
    cy.get('#section2Content').should('be.visible');
    cy.get('#section2Heading').click();
    cy.get('#section2Content').should('not.be.visible');

    // Abre/fecha terceira
    cy.get('#section3Heading').click();
    cy.get('#section3Content').should('be.visible');
    cy.get('#section3Heading').click();
    cy.get('#section3Content').should('not.be.visible');
  });

  it('Agrupamento de perguntas - Exemplos', () => {
    // A primeira já vem aberta
    cy.get('#section1Content').should('be.visible');

    // Fecha a primeira
    cy.get('#section1Heading').click();
    cy.get('#section1Content').should('not.be.visible');

    // Abre/fecha as demais seções em loop
    [2, 3].forEach(section => {
      cy.get(`#section${section}Heading`).click();
      cy.get(`#section${section}Content`).should('be.visible');

      // Fecha novamente para validar toggle
      cy.get(`#section${section}Heading`).click();
      cy.get(`#section${section}Content`).should('not.be.visible');
    });
  });

  it('Valida que apenas uma seção pode estar aberta por vez', () => {
    // Abre segunda seção
    cy.get('#section2Heading').click();
    cy.get('#section2Content').should('be.visible');

    // Abre terceira seção
    cy.get('#section3Heading').click();
    cy.get('#section3Content').should('be.visible');

    // Valida que a segunda foi fechada automaticamente
    cy.get('#section2Content').should('not.be.visible');
  });
});