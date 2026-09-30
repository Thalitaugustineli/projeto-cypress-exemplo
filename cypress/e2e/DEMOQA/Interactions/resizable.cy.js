describe('Droppable', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/droppable');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Droppable');
  });

  it('Validar drag and drop simples', () => {
    cy.get('#draggable').trigger('mousedown', { which: 1 });
    cy.get('#droppable')
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });

    cy.get('#droppable p')
      .should('contain.text', 'Dropped!');
  });

  it('Validar drag and drop com Accept', () => {
    cy.contains('Accept').click();

    // Elemento não aceitável
    cy.get('#notAcceptable').trigger('mousedown', { which: 1 });
    cy.get('#acceptDropContainer #droppable')
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });

    cy.get('#acceptDropContainer #droppable p')
      .should('contain.text', 'Drop here');

    // Elemento aceitável
    cy.get('#acceptable').trigger('mousedown', { which: 1 });
    cy.get('#acceptDropContainer #droppable')
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });

    cy.get('#acceptDropContainer #droppable p')
      .should('contain.text', 'Dropped!');
  });

  it('Validar drag and drop com Prevent Propagation', () => {
    cy.contains('Prevent Propogation').click();

    // Drop no inner box
    cy.get('#dragBox').trigger('mousedown', { which: 1 });
    cy.get('#notGreedyDropBox p')
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });

    cy.get('#notGreedyDropBox p')
      .should('contain.text', 'Dropped!');
  });

  it('Validar drag and drop com Revert Draggable', () => {
    cy.contains('Revert Draggable').click();

    // Arrasta e solta
    cy.get('#revertable').trigger('mousedown', { which: 1 });
    cy.get('#revertableDropContainer #droppable')
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });

    cy.get('#revertableDropContainer #droppable p')
      .should('contain.text', 'Dropped!');

    // Valida que o elemento voltou à posição original
    cy.get('#revertable').should('have.attr', 'style').and('include', 'position: relative');
  });
});