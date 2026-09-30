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
    cy.get('.rc-tree-checkbox').click();

    // Valida que o resultado aparece
    cy.get('#result').should('be.visible');

    // Desmarca o checkbox raiz
    cy.get('.rc-tree-checkbox').click();

    // Valida que o resultado desaparece
    cy.get('#result').should('not.exist');
  });

  it.skip('Abrindo Opções e Clicando nos Elementos - Refazer', () => {
    // Expande a árvore
    cy.get('.rc-tree-switcher').click();

    // Expande Desktop
    cy.contains('.rc-tree-title', 'Desktop')
      .parents('.rc-tree-treenode-selected')
      .find('.rc-tree-switcher')
      .click();

    // Valida expansão
    cy.contains('.rc-tree-title', 'Notes').should('be.visible');

    // Seleciona Notes
    cy.contains('.rc-tree-title', 'Notes').click();
    cy.get('#tree-node-notes').should('be.checked');
    cy.get('.text-success').should('contain.text', 'notes');

    // Seleciona Commands
    cy.contains('.rc-tree-title', 'Commands').click();
    cy.get('#tree-node-commands').should('be.checked');
    cy.get('.text-success').should('contain.text', 'commands');
  });

  it.skip('Abrindo Opções e Clicando nos Elementos - Expand All - Refazer', () => {
    // Expande toda a árvore
    cy.get('button[aria-label="Expand all"]').click();

    // Seleciona e desmarca Notes
    cy.contains('.rc-tree-title', 'Notes').click();
    cy.get('#tree-node-notes').should('be.checked');
    cy.get('.text-success').should('contain.text', 'notes');
    cy.contains('.rc-tree-title', 'Notes').click();
    cy.get('#tree-node-notes').should('not.be.checked');

    // Seleciona e desmarca Commands
    cy.contains('.rc-tree-title', 'Commands').click();
    cy.get('#tree-node-commands').should('be.checked');
    cy.get('.text-success').should('contain.text', 'commands');
    cy.contains('.rc-tree-title', 'Commands').click();
    cy.get('#tree-node-commands').should('not.be.checked');
  });

  it.skip('Validação por Function auxiliar - Refazer', () => {
    function toggleAndValidate(title, inputId, successText) {
      // Marca
      cy.contains('.rc-tree-title', title).click();
      cy.get(inputId).should('be.checked');
      cy.get('.text-success').should('contain.text', successText);

      // Desmarca
      cy.contains('.rc-tree-title', title).click();
      cy.get(inputId).should('not.be.checked');
    }

    // Expande toda a árvore
    cy.get('button[aria-label="Expand all"]').click();

    // Usa função para validar alguns elementos
    toggleAndValidate('React', '#tree-node-react', 'react');
    toggleAndValidate('Angular', '#tree-node-angular', 'angular');
    toggleAndValidate('Veu', '#tree-node-veu', 'veu');
  });

  it.skip('Abrindo com Expand All e Fechando com Collapse All - Refazer', () => {
    // Expande toda a árvore
    cy.get('button[aria-label="Expand all"]').click();

    // Fecha toda a árvore
    cy.get('button[aria-label="Collapse all"]').click();

    // Valida que os nós internos não estão visíveis
    cy.contains('.rc-tree-title', 'Notes').should('not.be.visible');
  });

  it.skip('Estado indeterminado quando alguns filhos são marcados - Refazer', () => {
    cy.get('button[aria-label="Expand all"]').click();

    // Marca apenas um filho (Private) do nó Documents
    cy.contains('.rc-tree-title', 'Private').click();

    // Verifica que o checkbox pai (Documents) está em estado indeterminado
    cy.contains('.rc-tree-title', 'Documents')
      .parents('.rc-tree-switcher')
      .first()
      .find('.rc-tree-checkbox > svg')
      .should('have.class', 'rct-icon-half-check');
  });
});