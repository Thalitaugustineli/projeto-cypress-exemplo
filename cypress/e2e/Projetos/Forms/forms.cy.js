describe('Practice Form', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/automation-practice-form')
        cy.viewport(1920,1080);
    })

    it('Validar Título ', () => {
    cy.get('.text-center').should('be.visible')
    })

    it('Submetendo o formulário com dados vazios', ()=>{

        cy.get('#submit').click({force: true})
        cy.get('#userForm').should('have.class', 'was-validated')
    })

    it('Validando Campos de Letras/Números', ()=> {

        // Dados Validos: Nome e Sobrenome
        cy.get('#firstName').type('João').should('have.value','João')
        cy.get('#lastName').type('Souza').should('have.value','Souza')

        // Dados Invaálidos: Nome e Sobrenome
        cy.get('#firstName').clear().type('123') // .should('not.have.value', '123') -> O site demoQA aceita números no Nome
        cy.get('#lastName').clear().type('123') // .should('not.have.value', '123') -> O site demoQA aceita números no Nome

        // Dados Válidos: E-mail
        cy.get('#userEmail').type('exemplo2@teste.com.br').should('have.value', 'exemplo2@teste.com.br')

        // Dados Inválidos: Testa inválido (sem @)
        cy.get('#userEmail').clear().type('emailinvalido').should('have.value', 'emailinvalido')
        cy.get('#submit').click()
        cy.get('#userForm').should('have.class', 'was-validated')

        // Dados Válidos - Somente Número
        cy.get('#userNumber').type('123456789').should('have.value', '123456789')

        // Dados Inválidos: Letras
        cy.get('#userNumber').clear().type('ABCDEFGH').should('have.value', 'ABCDEFGH')
        cy.get('#submit').click()
        cy.get('#userForm').should('have.class', 'was-validated')

        // Dados de Endereço
        cy.get('#currentAddress').type('Rua Antonio Joao, 455 - Jardim Angela - Osasco - SP, Brazil')

    })

    it('Validando Gender (sexo)', ()=>{
        // Valida Estrutura Sexo
        cy.get('#genterWrapper > .col-md-9').should('be.visible')

        
        cy.get('#gender-radio-1').check({ force: true }).should('be.checked')   // Seleciona Masculino
        cy.get('#gender-radio-2').check({ force: true }).should('be.checked')   // Seleciona Feminino
        cy.get('#gender-radio-3').check({ force: true }).should('be.checked')   // Seleciona Outros
    })

    it('Valida que apenas uma opção pode ser selecionada Gender (sexo)', ()=>{
        // Valida Estrutura Sexo
        cy.get('#genterWrapper > .col-md-9').should('be.visible')

        // Seleciona Feminino
        cy.get('#gender-radio-2').check({ force: true }).should('be.checked')
        
        //Garante que Masculino/Outros não estão selecionados
        cy.get('#gender-radio-1').should('not.be.checked')
        cy.get('#gender-radio-3').should('not.be.checked')
    })

    it('Selecionando Data de Nascimento', ()=>{
        cy.get('#dateOfBirthInput').click()
        
        // lidando com Tabela
        cy.get('.react-datepicker__month-select').select('March');
        cy.get('.react-datepicker__year-select').select('2000');
        cy.get('.react-datepicker__day--025').click(); // Seleciona 18 de dezembro
    })

    it('Selecionando Assuntos', ()=>{
        // Digita o texto no campo de autocomplete
        cy.get('.subjects-auto-complete__value-container')
            .click()
            .type('Computer Science');

        // Aguarda e seleciona a sugestão que aparece
        cy.get('.subjects-auto-complete__menu')
            .contains('Computer Science')
            .click();
        
        cy.get('.subjects-auto-complete__value-container')
            .click()
            .type('Arts');
        
        // Aguarda e seleciona a sugestão que aparece
        cy.get('.subjects-auto-complete__menu')
            .contains('Arts')
            .click();

    })

    it('Selecionando o Hobbies', ()=>{
        cy.get('#hobbiesWrapper > .col-md-9')
            .should('be.visible')
        
        // Selecionando Sports
        cy.get('#hobbies-checkbox-1').click({force: true}).should('be.checked') 

        // Selecionando Reading
        cy.get('#hobbies-checkbox-2').click({force: true}).should('be.checked')

        // Selecionando Music
        cy.get('#hobbies-checkbox-3').click({force: true}).should('be.checked')
    })

    it('Adicionando Imagem', ()=>{
        cy.get('#uploadPicture').attachFile('profile.png');
        //cy.get('#uploadedFilePath').should('have.valeu', 'profile.png')
    })

    it('Selecionando Estado e Cidade', ()=>{
        // Abre o drop-down de Estado
        cy.get('#state .css-1hwfws3').click();

        // Seleciona o Estado desejado
        cy.get('#state .css-26l3qy-menu')
            .contains('NCR')
            .click();

        // Valida se o Estado foi selecionado corretamente
        cy.get('#state .css-1uccc91-singleValue')
            .should('have.text', 'NCR');

        // Abre o drop-down de Cidade
        cy.get('#city .css-1hwfws3').click();

        // Seleciona a Cidade correspondente
        cy.get('#city .css-26l3qy-menu')
            .contains('Delhi')
            .click();

        // Valida se a Cidade foi selecionada corretamente
        cy.get('#city .css-1uccc91-singleValue')
            .should('have.text', 'Delhi');

    })

it('Adicionando um Novo Usuário', () => {
  cy.get('#userForm').should('be.visible');

  const usuario = {
    firstName: 'Luiza',
    lastName: 'Oliveira',
    userEmail: 'exemplo@test.com',
    gender: 'Female',              // radio button
    userNumber: '1495488999',      // 10 dígitos
    dateOfBirth: { day: '15', month: 'May', year: '1999' }, // usar datepicker
    subjects: ['English', 'Arts'], // autocomplete
    hobbies: ['Music'],            // checkbox
    picture: 'profile.png',        // arquivo para upload
    currentAddress: '255, Times Squad',
    state: 'NCR',                  // drop-down
    city: 'Noida'                  // drop-down
  };

  // Campos de texto
  cy.get('#firstName').type(usuario.firstName);
  cy.get('#lastName').type(usuario.lastName);
  cy.get('#userEmail').type(usuario.userEmail);
  cy.get('#userNumber').type(usuario.userNumber);
  cy.get('#currentAddress').type(usuario.currentAddress);

  // Selecionar gênero (radio)
  cy.get('#genterWrapper').contains(usuario.gender).click();

  // Data de nascimento (datepicker)
  cy.get('#dateOfBirthInput').click();
  cy.get('.react-datepicker__month-select').select(usuario.dateOfBirth.month);
  cy.get('.react-datepicker__year-select').select(usuario.dateOfBirth.year);
  cy.get(`.react-datepicker__day--0${usuario.dateOfBirth.day}`).click();

  // Subjects (autocomplete)
  usuario.subjects.forEach(subject => {
    cy.get('.subjects-auto-complete__value-container').type(subject);
    cy.get('.subjects-auto-complete__menu').contains(subject).click();
  });

  // Hobbies (checkbox)
  usuario.hobbies.forEach(hobby => {
    cy.get('#hobbiesWrapper').contains(hobby).click();
  });

  // Upload de foto
  cy.get('#uploadPicture').attachFile(usuario.picture);

    // Seleciona Estado
    cy.get('#state').click();
    cy.get('#state .css-26l3qy-menu').contains(usuario.state).click();

  // Agora o campo de Cidade estará habilitado
    cy.get('#city').click();
    cy.get('#city .css-26l3qy-menu').contains(usuario.city).click();

    // Submit
    cy.get('#submit').click();

    function validaModal(usuario) {
    // Valida abertura do modal
    cy.get('.modal-header').should('be.visible');
    cy.get('.modal-body').should('be.visible');

        // Valida cada campo da tabela
        cy.get('tbody > :nth-child(1) > :nth-child(2)')
            .should('contain.text', usuario.firstName + ' ' + usuario.lastName);

        cy.get('tbody > :nth-child(2) > :nth-child(2)')
            .should('contain.text', usuario.userEmail);

        cy.get('tbody > :nth-child(3) > :nth-child(2)')
            .should('contain.text', usuario.gender);

        cy.get('tbody > :nth-child(4) > :nth-child(2)')
            .should('contain.text', usuario.userNumber);

        cy.get('tbody > :nth-child(5) > :nth-child(2)')
            .should('contain.text', `${usuario.dateOfBirth.day} ${usuario.dateOfBirth.month},${usuario.dateOfBirth.year}`);

        cy.get('tbody > :nth-child(6) > :nth-child(2)')
            .should('contain.text', usuario.subjects.join(', '));

        cy.get('tbody > :nth-child(7) > :nth-child(2)')
            .should('contain.text', usuario.hobbies.join(', '));

        cy.get('tbody > :nth-child(8) > :nth-child(2)')
            .should('contain.text', usuario.picture);

        cy.get('tbody > :nth-child(9) > :nth-child(2)')
            .should('contain.text', usuario.currentAddress);

        cy.get('tbody > :nth-child(10) > :nth-child(2)')
            .should('contain.text', usuario.state + ' ' + usuario.city);
}

// Fechando modal
cy.get('#closeLargeModal').click()

});

    



    


















}) // fim do describe