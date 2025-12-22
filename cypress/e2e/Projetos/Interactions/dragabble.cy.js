describe('Dragabble', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/dragabble');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Dragabble');
  });

  it('Validar drag simples', () => {
    cy.get('#dragBox')
      .should('be.visible')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });

    // Valida que o elemento foi movido
    cy.get('#dragBox').should('have.attr', 'style').and('include', 'position: relative');
  });

  it('Validar drag restrito ao eixo X', () => {
    cy.contains('Axis Restricted').click();
    cy.get('#restrictedX')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 400, clientY: 200 })
      .trigger('mouseup', { force: true });

    // Valida que só o eixo X foi alterado
    cy.get('#restrictedX').should('have.attr', 'style').and('include', 'transform');
  });

  it('Validar drag restrito ao eixo Y', () => {
    cy.contains('Axis Restricted').click();
    cy.get('#restrictedY')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 200, clientY: 400 })
      .trigger('mouseup', { force: true });

    // Valida que só o eixo Y foi alterado
    cy.get('#restrictedY').should('have.attr', 'style').and('include', 'transform');
  });

  it('Validar drag restrito ao container', () => {
    cy.contains('Container Restricted').click();
    cy.get('#containmentWrapper > #dragContainer')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 500, clientY: 200 })
      .trigger('mouseup', { force: true });

    // Valida que o elemento continua dentro do container
    cy.get('#containmentWrapper').should('contain.html', 'dragContainer');
  });

  it('Validar drag com estilos de cursor', () => {
    cy.contains('Cursor Style').click();
    cy.get('#cursorCenter')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 350, clientY: 350 })
      .trigger('mouseup', { force: true });

    cy.get('#cursorCenter').should('have.attr', 'style').and('include', 'transform');
  });
});