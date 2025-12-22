describe('Practice Form', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Practice Form');
  });

  it('Submetendo o formulário com dados vazios', () => {
    cy.get('#submit').click({ force: true });
    cy.get('#userForm').should('have.class', 'was-validated');
  });

  it('Validando Campos de Letras/Números', () => {
    // Nome e Sobrenome válidos
    cy.get('#firstName').type('João').should('have.value', 'João');
    cy.get('#lastName').type('Souza').should('have.value', 'Souza');

    // Nome e Sobrenome inválidos (números)
    cy.get('#firstName').clear().type('123');
    cy.get('#lastName').clear().type('123');

    // Email válido
    cy.get('#userEmail').type('exemplo2@teste.com.br').should('have.value', 'exemplo2@teste.com.br');

    // Email inválido
    cy.get('#userEmail').clear().type('emailinvalido');
    cy.get('#submit').click();
    cy.get('#userForm').should('have.class', 'was-validated');

    // Número válido
    cy.get('#userNumber').type('1234567890').should('have.value', '1234567890');

    // Número inválido (letras)
    cy.get('#userNumber').clear().type('ABCDEFGH');
    cy.get('#submit').click();
    cy.get('#userForm').should('have.class', 'was-validated');

    // Endereço
    cy.get('#currentAddress').type('Rua Antonio Joao, 455 - Jardim Angela - Osasco - SP, Brazil');
  });

  it('Validando Gender (sexo)', () => {
    cy.get('#genterWrapper > .col-md-9').should('be.visible');

    cy.get('#gender-radio-1').check({ force: true }).should('be.checked'); // Masculino
    cy.get('#gender-radio-2').check({ force: true }).should('be.checked'); // Feminino
    cy.get('#gender-radio-3').check({ force: true }).should('be.checked'); // Outros
  });

  it('Valida que apenas uma opção pode ser selecionada Gender (sexo)', () => {
    cy.get('#gender-radio-2').check({ force: true }).should('be.checked');
    cy.get('#gender-radio-1').should('not.be.checked');
    cy.get('#gender-radio-3').should('not.be.checked');
  });

  it('Selecionando Data de Nascimento', () => {
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('March');
    cy.get('.react-datepicker__year-select').select('2000');
    cy.get('.react-datepicker__day--025').click();
  });

  it('Selecionando Assuntos', () => {
    cy.get('.subjects-auto-complete__value-container').click().type('Computer Science');
    cy.get('.subjects-auto-complete__menu').contains('Computer Science').click();

    cy.get('.subjects-auto-complete__value-container').click().type('Arts');
    cy.get('.subjects-auto-complete__menu').contains('Arts').click();
  });

  it('Selecionando Hobbies', () => {
    cy.get('#hobbiesWrapper > .col-md-9').should('be.visible');

    cy.get('#hobbies-checkbox-1').click({ force: true }).should('be.checked'); // Sports
    cy.get('#hobbies-checkbox-2').click({ force: true }).should('be.checked'); // Reading
    cy.get('#hobbies-checkbox-3').click({ force: true }).should('be.checked'); // Music
  });

  it('Adicionando Imagem', () => {
    cy.get('#uploadPicture').attachFile('profile.png');
    cy.get('#uploadPicture').should('exist');
  });

  it('Selecionando Estado e Cidade', () => {
    cy.get('#state .css-1hwfws3').click();
    cy.get('#state .css-26l3qy-menu').contains('NCR').click();
    cy.get('#state .css-1uccc91-singleValue').should('have.text', 'NCR');

    cy.get('#city .css-1hwfws3').click();
    cy.get('#city .css-26l3qy-menu').contains('Delhi').click();
    cy.get('#city .css-1uccc91-singleValue').should('have.text', 'Delhi');
  });

  it('Adicionando um Novo Usuário completo', () => {
    const usuario = {
      firstName: 'Luiza',
      lastName: 'Oliveira',
      userEmail: 'exemplo@test.com',
      gender: 'Female',
      userNumber: '1495488999',
      dateOfBirth: { day: '15', month: 'May', year: '1999' },
      subjects: ['English', 'Arts'],
      hobbies: ['Music'],
      picture: 'profile.png',
      currentAddress: '255, Times Squad',
      state: 'NCR',
      city: 'Noida'
    };

    // Campos de texto
    cy.get('#firstName').type(usuario.firstName);
    cy.get('#lastName').type(usuario.lastName);
    cy.get('#userEmail').type(usuario.userEmail);
    cy.get('#userNumber').type(usuario.userNumber);
    cy.get('#currentAddress').type(usuario.currentAddress);

    // Gender
    cy.get('#genterWrapper').contains(usuario.gender).click();

    // Date of Birth
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select(usuario.dateOfBirth.month);
    cy.get('.react-datepicker__year-select').select(usuario.dateOfBirth.year);
    cy.get(`.react-datepicker__day--0${usuario.dateOfBirth.day}`).click();

    // Subjects
    usuario.subjects.forEach(subject => {
      cy.get('.subjects-auto-complete__value-container').type(subject);
      cy.get('.subjects-auto-complete__menu').contains(subject).click();
    });

    // Hobbies
    usuario.hobbies.forEach(hobby => {
      cy.get('#hobbiesWrapper').contains(hobby).click();
    });

    // Upload
    cy.get('#uploadPicture').attachFile(usuario.picture);

    // Estado e Cidade
    cy.get('#state').click();
    cy.get('#state .css-26l3qy-menu').contains(usuario.state).click();
    cy.get('#city').click();
    cy.get('#city .css-26l3qy-menu').contains(usuario.city).click();

    // Submit
    cy.get('#submit').click();

    // Valida Modal
    cy.get('.modal-header').should('be.visible');
    cy.get('.modal-body').should('be.visible');

    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain.text', `${usuario.firstName} ${usuario.lastName}`);
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain.text', usuario.userEmail);
    cy.get('tbody > :nth-child(3) > :nth-child(2)').should('contain.text', usuario.gender);
    cy.get('tbody > :nth-child(4) > :nth-child(2)').should('contain.text', usuario.userNumber);
    cy.get('tbody > :nth-child(5) > :nth-child(2)').should('contain.text', `${usuario.dateOfBirth.day} ${usuario.dateOfBirth.month},${usuario.dateOfBirth.year}`);
    cy.get('tbody > :nth-child(6) > :nth-child(2)').should('contain.text', usuario.subjects.join(', '));
    cy.get('tbody > :nth-child(7) > :nth-child(2)').should('contain.text', usuario.hobbies.join(', '));
    cy.get('tbody > :nth-child(8) > :nth-child(2)').should('contain.text', usuario.picture);
    cy.get('tbody > :nth-child(9) > :nth-child(2)').should('contain.text', usuario.currentAddress);
    cy.get('tbody > :nth-child(10) > :nth-child(2)').should('contain.text', `${usuario.state} ${usuario.city}`);

    // Fecha modal
    cy.get('#closeLargeModal').click();
  });
});