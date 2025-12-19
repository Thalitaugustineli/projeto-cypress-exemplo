describe('Modal Dialogs', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/modal-dialogs');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center').should('be.visible').and('contain.text', 'Modal Dialogs');
  });

   it('Valida Small Modal', () => {
    // Clica no botão para abrir o Small Modal
    cy.get('#showSmallModal').click();

    // Verifica se o modal está visível
    cy.get('.modal-content').should('be.visible');

    // Valida o título do modal
    cy.get('#example-modal-sizes-title-sm')
      .should('have.text', 'Small Modal');

    // Valida o corpo do modal
    cy.get('.modal-body')
      .should('contain.text', 'This is a small modal. It has very less content');

    // Fecha o modal
    cy.get('#closeSmallModal').click();

    // Verifica se o modal foi fechado
    cy.get('.modal-content').should('not.exist');
  });

  it('Valida Large Modal', () => {
    // Clica no botão para abrir o Large Modal
    cy.get('#showLargeModal').click();

    // Verifica se o modal está visível
    cy.get('.modal-content').should('be.visible');

    // Valida o título do modal
    cy.get('#example-modal-sizes-title-lg')
      .should('have.text', 'Large Modal');

    // Valida o corpo do modal (texto longo)
    cy.get('.modal-body')
      .should('contain.text', 'Lorem Ipsum is simply dummy text');

    // Fecha o modal
    cy.get('#closeLargeModal').click();

    // Verifica se o modal foi fechado
    cy.get('.modal-content').should('not.exist');
  })




  });// fim do describe