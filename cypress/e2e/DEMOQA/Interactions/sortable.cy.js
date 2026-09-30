describe('Sortable', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/sortable');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Sortable');
  });

  it('Validar reordenação no modo List', () => {
    // Seleciona o primeiro item
    cy.get('#demo-tab-list').click();
    cy.get('#demo-tabpane-list .list-group-item')
      .first()
      .should('contain.text', 'One');

    // Arrasta o primeiro item para a posição do terceiro
    cy.get('#demo-tabpane-list .list-group-item')
      .first()
      .trigger('mousedown', { which: 1 });
    cy.get('#demo-tabpane-list .list-group-item')
      .eq(2)
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Valida que o item "One" não está mais na primeira posição
    cy.get('#demo-tabpane-list .list-group-item')
      .first()
      .should('not.contain.text', 'One');
  });

  it('Validar reordenação no modo Grid', () => {
    cy.get('#demo-tab-grid').click();

    // Seleciona o primeiro item
    cy.get('#demo-tabpane-grid .list-group-item')
      .first()
      .should('contain.text', 'One');

    // Arrasta o primeiro item para a posição do quinto
    cy.get('#demo-tabpane-grid .list-group-item')
      .first()
      .trigger('mousedown', { which: 1 });
    cy.get('#demo-tabpane-grid .list-group-item')
      .eq(4)
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Valida que o item "One" não está mais na primeira posição
    cy.get('#demo-tabpane-grid .list-group-item')
      .first()
      .should('not.contain.text', 'One');
  });

  it('Validar que múltiplos itens podem ser reordenados', () => {
    cy.get('#demo-tab-list').click();

    // Move "One" para posição 3
    cy.get('#demo-tabpane-list .list-group-item')
      .first()
      .trigger('mousedown', { which: 1 });
    cy.get('#demo-tabpane-list .list-group-item')
      .eq(2)
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Move "Two" para posição 5
    cy.get('#demo-tabpane-list .list-group-item')
      .eq(1)
      .trigger('mousedown', { which: 1 });
    cy.get('#demo-tabpane-list .list-group-item')
      .eq(4)
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Valida que houve mudança na ordem
    cy.get('#demo-tabpane-list .list-group-item')
      .eq(2)
      .should('contain.text', 'One');
    cy.get('#demo-tabpane-list .list-group-item')
      .eq(4)
      .should('contain.text', 'Two');
  });
});