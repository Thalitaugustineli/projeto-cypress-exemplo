describe('Accordian', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/accordian');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center').should('be.visible').and('contain.text', 'Accordian');
  });

  it('Primeira Pergunta sempre aberta',()=>{
    cy.get('#section1Heading').should('be.visible')
    cy.get('#section1Content').should('be.visible')

    cy.get('#section1Heading').click()
    cy.get('#section1Content').should('not.be.visible')
  })

it('Abrir e fechar perguntas', ()=>{

    cy.get('#section1Heading').click() // fecha a primeira
    cy.get('#section1Content').should('not.be.visible')

    cy.get('#section2Heading').should('be.visible').click()
    cy.get('#section2Content').should('be.visible').click()

    cy.get('#section3Heading').should('be.visible').click()
    cy.get('#section3Content').should('be.visible').click()

})

it.only('Agrupamento de perguntas - Exemplos', ()=>{
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


















  }); // fim do describe