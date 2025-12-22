// Validação de Checkbox
describe('CheckBox', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/checkbox');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Check Box');
  });

  it('Valida CheckBox raiz', () => {
    // Marca o checkbox raiz
    cy.get('.rct-checkbox').click();

    // Valida que o resultado aparece
    cy.get('#result').should('be.visible');

    // Desmarca o checkbox raiz
    cy.get('.rct-checkbox').click();

    // Valida que o resultado desaparece
    cy.get('#result').should('not.exist');
  });

  it('Abrindo Opções e Clicando nos Elementos', () => {
    // Expande a árvore
    cy.get('.rct-collapse').click();

    // Expande Desktop
    cy.contains('span.rct-title', 'Desktop')
      .parents('.rct-node')
      .find('.rct-collapse')
      .click();

    // Valida expansão
    cy.contains('span.rct-title', 'Notes').should('be.visible');

    // Seleciona Notes
    cy.contains('span.rct-title', 'Notes').click();
    cy.get('#tree-node-notes').should('be.checked');
    cy.get('.text-success').should('contain.text', 'notes');

    // Seleciona Commands
    cy.contains('span.rct-title', 'Commands').click();
    cy.get('#tree-node-commands').should('be.checked');
    cy.get('.text-success').should('contain.text', 'commands');
  });

  it('Abrindo Opções e Clicando nos Elementos - Expand All', () => {
    // Expande toda a árvore
    cy.get('button[aria-label="Expand all"]').click();

    // Seleciona e desmarca Notes
    cy.contains('span.rct-title', 'Notes').click();
    cy.get('#tree-node-notes').should('be.checked');
    cy.get('.text-success').should('contain.text', 'notes');
    cy.contains('span.rct-title', 'Notes').click();
    cy.get('#tree-node-notes').should('not.be.checked');

    // Seleciona e desmarca Commands
    cy.contains('span.rct-title', 'Commands').click();
    cy.get('#tree-node-commands').should('be.checked');
    cy.get('.text-success').should('contain.text', 'commands');
    cy.contains('span.rct-title', 'Commands').click();
    cy.get('#tree-node-commands').should('not.be.checked');
  });

  it('Validação por Function auxiliar', () => {
    function toggleAndValidate(title, inputId, successText) {
      // Marca
      cy.contains('span.rct-title', title).click();
      cy.get(inputId).should('be.checked');
      cy.get('.text-success').should('contain.text', successText);

      // Desmarca
      cy.contains('span.rct-title', title).click();
      cy.get(inputId).should('not.be.checked');
    }

    // Expande toda a árvore
    cy.get('button[aria-label="Expand all"]').click();

    // Usa função para validar alguns elementos
    toggleAndValidate('React', '#tree-node-react', 'react');
    toggleAndValidate('Angular', '#tree-node-angular', 'angular');
    toggleAndValidate('Veu', '#tree-node-veu', 'veu');
  });

  it('Abrindo com Expand All e Fechando com Collapse All', () => {
    // Expande toda a árvore
    cy.get('button[aria-label="Expand all"]').click();

    // Fecha toda a árvore
    cy.get('button[aria-label="Collapse all"]').click();

    // Valida que os nós internos não estão visíveis
    cy.contains('span.rct-title', 'Notes').should('not.be.visible');
  });

  it('Estado indeterminado quando alguns filhos são marcados', () => {
    cy.get('button[aria-label="Expand all"]').click();

    // Marca apenas um filho (Private) do nó Documents
    cy.contains('span.rct-title', 'Private').click();

    // Verifica que o checkbox pai (Documents) está em estado indeterminado
    cy.contains('span.rct-title', 'Documents')
      .parents('.rct-node')
      .first()
      .find('.rct-checkbox > svg')
      .should('have.class', 'rct-icon-half-check');
  });
});