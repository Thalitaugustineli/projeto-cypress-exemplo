describe('Select Menu', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/select-menu');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Select Menu');
  });

  it('Selecionar opção no Select Value', () => {
    cy.get('#withOptGroup').click();
    cy.get('.css-26l3qy-menu').contains('Group 1, Option 1').click();
    cy.get('#withOptGroup').should('contain.text', 'Group 1, Option 1');
  });

  it('Selecionar opção no Select One', () => {
    cy.get('#selectOne').click();
    cy.get('.css-26l3qy-menu').contains('Dr.').click();
    cy.get('#selectOne').should('contain.text', 'Dr.');
  });

  it('Selecionar opção no Old Style Select Menu', () => {
    cy.get('#oldSelectMenu').select('Purple').should('have.value', '4');
  });

  it('Selecionar múltiplas opções no Multi Select DropDown', () => {
    cy.get('#selectMenuContainer').within(() => {
      cy.get('.css-2b097c-container').first().click();
    });
    cy.get('.css-26l3qy-menu').contains('Green').click();
    cy.get('.css-26l3qy-menu').contains('Blue').click();

    cy.get('#selectMenuContainer').should('contain.text', 'Green');
    cy.get('#selectMenuContainer').should('contain.text', 'Blue');
  });

  it('Selecionar múltiplas opções no Standard Multi Select', () => {
    cy.get('#cars').select(['Volvo', 'Saab']);
    cy.get('#cars').invoke('val').should('deep.equal', ['volvo', 'saab']);
  });
});