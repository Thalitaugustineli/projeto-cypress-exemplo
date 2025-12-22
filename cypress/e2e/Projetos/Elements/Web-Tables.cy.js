describe('Web Tables', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
  });

  it('Validar Título e Elementos da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Web Tables');

    // Valida elementos principais
    cy.get('.col-md-7').should('be.visible'); // área de busca
    cy.get('#searchBox').should('be.visible'); // campo de busca
    cy.get('.ReactTable').should('be.visible'); // tabela
  });

  it('CRUD completo (Create, Read, Update, Delete)', () => {
    // CREATE - Criando um novo usuário
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-header').should('be.visible');

    const usuario = {
      firstName: 'Joao',
      lastName: 'Silva',
      userEmail: 'exemplo@teste.com.br',
      age: '31',
      salary: '3000',
      department: 'TI'
    };

    cy.get('#firstName').type(usuario.firstName);
    cy.get('#lastName').type(usuario.lastName);
    cy.get('#userEmail').type(usuario.userEmail);
    cy.get('#age').type(usuario.age);
    cy.get('#salary').type(usuario.salary);
    cy.get('#department').type(usuario.department);
    cy.get('#submit').click();

    // READ - Validando dados inseridos
    cy.get('.rt-tbody').should('contain.text', usuario.firstName);
    cy.get('.rt-tbody').should('contain.text', usuario.lastName);
    cy.get('.rt-tbody').should('contain.text', usuario.userEmail);

    // UPDATE - Editando usuário
    cy.get('#edit-record-4').click();
    const usuarioUpdate = {
      firstName: 'Joao Julio',
      lastName: 'Silva Oliveira',
      userEmail: 'exemplo2@teste.com.br',
      age: '35',
      salary: '4500',
      department: 'TI - Novo Departamento'
    };

    cy.get('#firstName').clear().type(usuarioUpdate.firstName);
    cy.get('#lastName').clear().type(usuarioUpdate.lastName);
    cy.get('#userEmail').clear().type(usuarioUpdate.userEmail);
    cy.get('#age').clear().type(usuarioUpdate.age);
    cy.get('#salary').clear().type(usuarioUpdate.salary);
    cy.get('#department').clear().type(usuarioUpdate.department);
    cy.get('#submit').click();

    // READ - Validando dados atualizados
    cy.get('.rt-tbody').should('contain.text', usuarioUpdate.firstName);
    cy.get('.rt-tbody').should('contain.text', usuarioUpdate.lastName);
    cy.get('.rt-tbody').should('contain.text', usuarioUpdate.userEmail);

    // DELETE - Excluindo usuário
    cy.get('#delete-record-4').click();
    cy.get('.rt-tbody').should('not.contain.text', usuarioUpdate.firstName);
  });

  it('Busca e filtros', () => {
    // Busca por nome existente
    cy.get('#searchBox').type('Kierra');
    cy.get('.rt-tbody').should('contain.text', 'Kierra');

    // Busca por nome inexistente
    cy.get('#searchBox').clear().type('Time');
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });

  it('Validando abertura e fechamento do Modal', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-header').should('be.visible');

    // Fechando modal pelo botão
    cy.get('.close').click();
    cy.get('.modal-header').should('not.exist');

    // Reabrindo modal
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-header').type('{esc}');
    cy.get('.modal-header').should('not.exist');
  });

  it('Submetendo formulário com dados vazios', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#submit').click();
    cy.get('#userForm').should('have.class', 'was-validated');
  });

  it('Validando Campos do Formulário', () => {
    cy.get('#addNewRecordButton').click();

    // Nome válido
    cy.get('#firstName').type('Joao Julio').should('have.value', 'Joao Julio');
    cy.get('#lastName').type('Silva Oliveira').should('have.value', 'Silva Oliveira');

    // Email inválido
    cy.get('#userEmail').clear().type('emailinvalido');
    cy.get('#submit').click();
    cy.get('#userForm').should('have.class', 'was-validated');

    // Age inválido
    cy.get('#age').clear().type('abc');
    cy.get('#submit').click();
    cy.get('#userForm').should('have.class', 'was-validated');

    // Salary inválido
    cy.get('#salary').clear().type('quatro mil');
    cy.get('#submit').click();
    cy.get('#userForm').should('have.class', 'was-validated');
  });

  it('Valida limites máximos de caracteres nos campos', () => {
    cy.get('#addNewRecordButton').click();

    // FirstName
    cy.get('#firstName').type('A'.repeat(30));
    cy.get('#firstName').invoke('val').should('have.length.lte', 25);

    // LastName
    cy.get('#lastName').type('B'.repeat(30));
    cy.get('#lastName').invoke('val').should('have.length.lte', 25);

    // Department
    cy.get('#department').type('C'.repeat(30));
    cy.get('#department').invoke('val').should('have.length.lte', 25);

    // Age
    cy.get('#age').type('123');
    cy.get('#age').invoke('val').should('have.length.lte', 2);

    // Salary
    cy.get('#salary').type('123456789011');
    cy.get('#salary').invoke('val').should('have.length.lte', 11);
  });
});