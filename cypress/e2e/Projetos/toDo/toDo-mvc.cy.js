describe('Example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/javascript-es5/dist/');
    cy.viewport(1600, 900);
  });

  it('Validar o Title', () => {
    cy.get('h1')
      .should('be.visible')
      .and('contain.text', 'todos');
  });

  it('Adicionando tarefas no ToDo', () => {
    const tarefas = [
      'Tarefa 1',
      'Tarefa 2',
      'Tarefa 3',
      'Tarefa 4',
      'Tarefa 5',
      'Tarefa 6',
      'Tarefa 7'
    ];

    tarefas.forEach(tarefa => {
      cy.get('.new-todo').type(`${tarefa}{enter}`);
    });

    // Valida que todas as tarefas foram adicionadas
    cy.get('.todo-list li').should('have.length', tarefas.length);
    tarefas.forEach(tarefa => {
      cy.get('.todo-list').should('contain.text', tarefa);
    });
  });

  it('Selecionando todas as Tarefas como OK', () => {
    const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];
    tarefas.forEach(tarefa => {
      cy.get('.new-todo').type(`${tarefa}{enter}`);
    });

    cy.get('.toggle-all-label').should('be.visible').click();

    // Valida que todas estão concluídas
    cy.get('.todo-list li').each($el => {
      cy.wrap($el).should('have.class', 'completed');
    });
  });

  it('Selecionando Tarefas de Maneira Manual', () => {
    const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3', 'Tarefa 4'];
    tarefas.forEach(tarefa => {
      cy.get('.new-todo').type(`${tarefa}{enter}`);
    });

    // Marca manualmente algumas tarefas
    cy.get('[data-id="1"] > .view > .toggle').click();
    cy.get('[data-id="3"] > .view > .toggle').click();

    // Valida que apenas as selecionadas estão concluídas
    cy.get('[data-id="1"]').should('have.class', 'completed');
    cy.get('[data-id="3"]').should('have.class', 'completed');
    cy.get('[data-id="2"]').should('not.have.class', 'completed');
    cy.get('[data-id="4"]').should('not.have.class', 'completed');
  });

  it('Limpando Seleção de Tarefas', () => {
    const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];
    tarefas.forEach(tarefa => {
      cy.get('.new-todo').type(`${tarefa}{enter}`);
    });

    // Marca algumas como concluídas
    cy.get('[data-id="1"] > .view > .toggle').click();
    cy.get('[data-id="3"] > .view > .toggle').click();

    // Filtra concluídas e limpa
    cy.get('.filters > :nth-child(3) > a').click();
    cy.get('.clear-completed').click();

    // Valida que as concluídas foram removidas
    cy.get('.todo-list').should('not.contain.text', 'Tarefa 1');
    cy.get('.todo-list').should('not.contain.text', 'Tarefa 3');
    cy.get('.todo-list').should('contain.text', 'Tarefa 2');
  });
});