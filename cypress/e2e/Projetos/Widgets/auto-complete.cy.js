describe('Auto Complete', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/auto-complete');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Auto Complete');
  });

  it('Adição de Múltiplas Cores e limpeza', () => {
    cy.get('#autoCompleteMultiple > :nth-child(1)').should('be.visible');

    // Digita e seleciona "Green"
    cy.get('#autoCompleteMultipleContainer input').type('Green');
    cy.get('.auto-complete__menu').contains('Green').click();

    // Digita e seleciona "Black"
    cy.get('#autoCompleteMultipleContainer input').type('Black');
    cy.get('.auto-complete__menu').contains('Black').click();

    // Valida que ambas foram adicionadas
    cy.get('#autoCompleteMultipleContainer').should('contain.text', 'Green');
    cy.get('#autoCompleteMultipleContainer').should('contain.text', 'Black');

    // Fechando seleção completa
    cy.get('.auto-complete__indicator').click();

    // Validando que tudo foi apagado
    cy.get('#autoCompleteMultipleContainer input').should('have.value', '');
  });

  it('Adicionar e remover cores aleatórias', () => {
    const cores = ['Green', 'Red', 'Purple', 'Blue', 'Black', 'Yellow', 'Magenta', 'Aqua'];

    // Adiciona todas as cores
    cores.forEach(color => {
      cy.get('#autoCompleteMultipleContainer input').type(color);
      cy.get('.auto-complete__menu').contains(color).click();
    });

    // Valida que todas foram adicionadas
    cores.forEach(color => {
      cy.get('#autoCompleteMultipleContainer').should('contain.text', color);
    });

    // Remove 3 cores aleatórias
    cy.get('#autoCompleteMultipleContainer .auto-complete__multi-value__remove').then($buttons => {
      const indices = Cypress._.sampleSize([...Array($buttons.length).keys()], 3);
      indices.forEach(i => {
        cy.wrap($buttons[i]).click();
      });
    });

    // Valida que ainda restam cores
    cy.get('#autoCompleteMultipleContainer .auto-complete__multi-value__label')
      .should('have.length.greaterThan', 0);
  });

  it('Adicionando Apenas 1 cor', () => {
    cy.get('#autoCompleteSingleContainer input').type('Green');
    cy.get('.auto-complete__menu').contains('Green').click();

    // Valida que a cor foi adicionada
    cy.get('#autoCompleteSingleContainer').should('contain.text', 'Green');
  });

  it('Valida que apenas uma cor pode ser selecionada no campo Single', () => {
    cy.get('#autoCompleteSingleContainer input').type('Red');
    cy.get('.auto-complete__menu').contains('Red').click();

    cy.get('#autoCompleteSingleContainer input').type('Blue');
    cy.get('.auto-complete__menu').contains('Blue').click();

    // Valida que apenas a última cor permanece
    cy.get('#autoCompleteSingleContainer').should('contain.text', 'Blue');
    cy.get('#autoCompleteSingleContainer').should('not.contain.text', 'Red');
  });
});