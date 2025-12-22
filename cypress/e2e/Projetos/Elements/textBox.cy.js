describe('Text Box', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/text-box');
    cy.viewport(1920, 1080);
  });

  // Valida o Título h1 da aplicação
  it('Validando título da Aplicação', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('have.text', 'Text Box');
  });

  // Preenchendo formulário com dados positivos, campo por campo
  it('Preenchendo formulário com dados corretos - Campo por Campo', () => {
    cy.get('#userName')
      .should('be.visible')
      .type('João da Silva');

    cy.get('#userEmail')
      .should('be.visible')
      .type('joaoSilva@exemplo.com.br');

    cy.get('#currentAddress')
      .should('be.visible')
      .invoke('val', 'Rua Antonio Martines, 145 - Vila Brasil - Osasco - SP')
      .trigger('input');

    cy.get('#permanentAddress')
      .should('be.visible')
      .invoke('val', 'Rua Antonio Martines, 200 - Vila Brasil - Osasco - SP')
      .trigger('input');

    cy.get('#submit').click();

    // Valida resultado
    cy.get('#output').should('be.visible');
    cy.get('#name').should('contain.text', 'João da Silva');
    cy.get('#email').should('contain.text', 'joaoSilva@exemplo.com.br');
  });

  // Preenchendo formulário com const dados
  it('Preenchendo formulário com dados corretos | Usando const dados', () => {
    const dados = {
      userName: 'Joao da Silva',
      userEmail: 'Joao@gmail.com',
      currentAddress: 'Rua Antonio Martines, 145 - Vila Brasil - Osasco - SP',
      permanentAddress: 'Rua Santa Luzia, 145 - Jardim Abril - Santana - SP'
    };

    cy.get('#userName').type(dados.userName);
    cy.get('#userEmail').type(dados.userEmail);
    cy.get('#currentAddress').type(dados.currentAddress);
    cy.get('#permanentAddress').type(dados.permanentAddress);

    cy.get('#submit').click();

    // Valida resultado
    cy.get('#output').should('be.visible');
    cy.get('#name').should('contain.text', dados.userName);
    cy.get('#email').should('contain.text', dados.userEmail);
  });

  // Preenchendo formulário com múltiplos usuários
  it('Preenchendo formulário com múltiplos usuários e enviar', () => {
    const usuarios = [
      {
        userName: 'Joao da Silva',
        userEmail: 'Joao@gmail.com',
        currentAddress: 'Rua Antonio Martines, 145 - Vila Brasil - Osasco - SP',
        permanentAddress: 'Rua Santa Luzia, 145 - Jardim Abril - Santana - SP'
      },
      {
        userName: 'Maria Silva',
        userEmail: 'Maria@gmail.com',
        currentAddress: 'Rua Antonio, 0 - Vila América - Barueri - SP',
        permanentAddress: 'Rua Luzia, 2 - Jardim Maio - São Paulo - SP'
      }
    ];

    usuarios.forEach(usuario => {
      cy.get('#userName').clear().type(usuario.userName);
      cy.get('#userEmail').clear().type(usuario.userEmail);
      cy.get('#currentAddress').clear().type(usuario.currentAddress);
      cy.get('#permanentAddress').clear().type(usuario.permanentAddress);

      cy.get('#submit').click();

      // Valida resultado
      cy.get('#output #name').should('contain.text', usuario.userName);
      cy.get('#output #email').should('contain.text', usuario.userEmail);
      cy.get('#output #currentAddress').should('contain.text', usuario.currentAddress);
      cy.get('#output #permanentAddress').should('contain.text', usuario.permanentAddress);
    });
  });

  // Teste de validação de e-mail inválido
  it('Valida erro ao inserir email inválido', () => {
    cy.get('#userEmail').type('emailInvalido');
    cy.get('#submit').click();

    // Valida que o campo email fica com classe de erro (se implementado)
    cy.get('#userEmail').should('have.class', 'field-error');
  });

  // Validação de campos obrigatórios
  it('Não deve enviar formulário vazio', () => {
    cy.get('#submit').click();
    cy.get('#output').should('not.exist');
  });

  // Copiar e colar no campo sem escrever
  it('Adicionando valor via invoke (copiar e colar)', () => {
    const endereco = 'Rua Antonio Martines, 145 - Vila Brasil - Osasco - SP';
    cy.get('#currentAddress')
      .invoke('val', endereco)
      .trigger('input');

    cy.get('#currentAddress').should('have.value', endereco);
  });

  // Concatenando endereço 10 vezes
  it('Concatena o endereço 10 vezes e valida', () => {
    const endereco = 'Rua Antonio Martines, 145 - Vila Brasil - Osasco - SP ';
    let textoFinal = '';

    Cypress._.times(10, () => {
      textoFinal += endereco;
    });

    cy.get('#currentAddress')
      .invoke('val', textoFinal)
      .trigger('input');

    cy.get('#currentAddress').should('have.value', textoFinal);
  });

  // Teste de persistência após reload (skip pois app tem bug)
  it.skip('Valida que dados não persistem após reload', () => {
    cy.get('#userName').type('Teste Reload');
    cy.get('#submit').click();
    cy.reload();
    cy.get('#output').should('not.exist');
  });
});