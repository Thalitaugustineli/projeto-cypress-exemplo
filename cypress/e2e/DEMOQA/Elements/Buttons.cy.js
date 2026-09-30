describe('Buttons', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/buttons');
    cy.viewport(1920, 1080);
  });

  it('Validar Título e Texto da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Buttons');
  });

  // Cenários Positivos
  it('Cenário Positivo: Duplo click 2x', () => {
    cy.get('#doubleClickBtn')
      .should('be.visible')
      .and('be.enabled')
      .dblclick();

    cy.get('#doubleClickMessage')
      .should('be.visible')
      .and('contain.text', 'You have done a double click');
  });

  it('Cenário Positivo: Click com o botão Direito', () => {
    cy.get('#rightClickBtn')
      .should('be.visible')
      .and('be.enabled')
      .rightclick();

    cy.get('#rightClickMessage')
      .should('be.visible')
      .and('contain.text', 'You have done a right click');
  });

  it('Cenário Positivo: Click apenas 1x -> Usar texto visível (mais estável)', () => {
    cy.get('button')
      .filter((index, el) => el.innerText.trim() === 'Click Me')
      .should('be.visible')
      .and('be.enabled')
      .click();

    cy.get('#dynamicClickMessage')
      .should('be.visible')
      .and('contain.text', 'You have done a dynamic click');
  });

  it('Clicando em todas as Opções', () => {
    // Duplo click
    cy.get('#doubleClickBtn').dblclick();
    cy.get('#doubleClickMessage')
      .should('contain.text', 'You have done a double click');

    // Direito click
    cy.get('#rightClickBtn').rightclick();
    cy.get('#rightClickMessage')
      .should('contain.text', 'You have done a right click');

    // 1x click com filtro
    cy.get('button')
      .filter((index, el) => el.innerText.trim() === 'Click Me')
      .click();
    cy.get('#dynamicClickMessage')
      .should('contain.text', 'You have done a dynamic click');
  });

  // Cenários Negativos
  it('Cenário Negativo: Não deve exibir mensagem com apenas 1 clique no botão de duplo clique', () => {
    cy.get('#doubleClickBtn').click();
    cy.get('#doubleClickMessage').should('not.exist');
  });

  it('Cenário Negativo: Não deve exibir mensagem com clique simples no botão de clique direito', () => {
    cy.get('#rightClickBtn').click();
    cy.get('#rightClickMessage').should('not.exist');
  });

  it('Cenário Negativo: Não deve exibir mensagem se clicar em outro botão', () => {
    cy.get('#doubleClickBtn').click(); // clique errado
    cy.get('#dynamicClickMessage').should('not.exist');
  });

  it('Falha ao tentar clicar em botão inexistente', () => {
    cy.get('button')
      .filter((index, el) => el.innerText.trim() === 'Click Me')
      .should('exist')
      .and('be.visible');
  });
});