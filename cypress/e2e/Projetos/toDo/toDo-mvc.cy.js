

// Site Para Testes de ToDO

describe('Example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/javascript-es5/dist/')
    cy.viewport(1600,900)
  })

  it('Validar o Title', ()=>{
    cy.get('h1').should('be.visible')
  })

  it('Adicionando tarefas no ToDo', () => {
    cy.get('.new-todo').should('be.visible').click()

      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}')
      .type('Tarefa 4{enter}')
      .type('Tarefa 5{enter}')
      .type('Tarefa 6{enter}')
      .type('Tarefa 7{enter}')

  })

    it('Selecionando todas as Tarefas como OK', () => {
    cy.get('.new-todo').should('be.visible').click()

      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}')
      .type('Tarefa 4{enter}')
      .type('Tarefa 5{enter}')
      .type('Tarefa 6{enter}')
      .type('Tarefa 7{enter}')

    cy.get('.toggle-all-label').should('be.visible').click();

  })

    it('Selecionando Tarefas de Maneira Manual', () => {
    cy.get('.new-todo').should('be.visible').click()
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}')
      .type('Tarefa 4{enter}')
      .type('Tarefa 5{enter}')
      .type('Tarefa 6{enter}')
      .type('Tarefa 7{enter}')

      cy.get('[data-id="1"] > .view > .toggle').click()
      cy.get('[data-id="3"] > .view > .toggle').click()
      cy.get('[data-id="5"] > .view > .toggle').click()
      cy.get('[data-id="7"] > .view > .toggle').click()      
  })

    it('Limpando Seleção de Tarefas', () => {
    cy.get('.new-todo').should('be.visible').click()
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}')
      .type('Tarefa 4{enter}')
      .type('Tarefa 5{enter}')
      .type('Tarefa 6{enter}')
      .type('Tarefa 7{enter}')

      cy.get('[data-id="1"] > .view > .toggle').click()
      cy.get('[data-id="3"] > .view > .toggle').click()
      cy.get('[data-id="5"] > .view > .toggle').click()
      cy.get('[data-id="7"] > .view > .toggle').click()
      
      cy.get('.filters > :nth-child(2) > a').click();
      cy.get('.filters > :nth-child(3) > a').click();
      cy.get('.clear-completed').click();
  })

  })// Fim do describe

