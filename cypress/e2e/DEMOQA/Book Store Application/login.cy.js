describe('Book Store', ()=>{
    beforeEach(()=>{
        cy.visit ( 'https://demoqa.com/profile');
        cy.viewport(1920,1080)
    })

    it('Cadastro de Usuário', ()=>{

        // Abrindo a Página para Registro
        cy.get('[href="/register"]')
            .click()

        cy.wait(5000)

            //Garantir que Forms está aberto
        cy.get('#userForm')
            .should('be.visible')
        
        // Dados do usuário cadastrado
        const usuario = {
            firstname: 'Maria',
            lastname: ' Sousa',
            userName: 'mariasousa',
            password: 'Teste@123'
       }

       // Preenchendo informações do usuário
       cy.get('#firstname').click().type(usuario.firstname)
       cy.get('#lastname').click().type(usuario.lastname)
       cy.get('#userName').click().type(usuario.userName)
       cy.get('#password').click().type(usuario.password)

    // Mock da validação do reCAPTCHA
    cy.intercept('POST', '**/recaptcha/api/siteverify', { body: { success: true } });

    // Clica em registrar
    cy.get('#register').click({ force: true });


    // Abertura e Tratamento da Janela do Google
    cy.on('window:alert', (mensagem) => {
      expect(mensagem).to.equal('You clicked a button');
      
    });
    
    // Validando mensagem de retorno:
    cy.get('#name').should('be.visible').and('contain.text', 'User exists!')

    });

        it.only('Cadastro de Usuário + Login ', ()=>{

        // Abrindo a Página para Registro
        cy.get('[href="/register"]')
            .click()

        cy.wait(5000)

            //Garantir que Forms está aberto
        cy.get('#userForm')
            .should('be.visible')
        
        // Dados do usuário cadastrado
        const usuario = {
            firstname: 'Maria',
            lastname: ' Sousa',
            userName: 'mariasousa',
            password: 'Teste@123'
       }

       // Preenchendo informações do usuário
       cy.get('#firstname').click().type(usuario.firstname)
       cy.get('#lastname').click().type(usuario.lastname)
       cy.get('#userName').click().type(usuario.userName)
       cy.get('#password').click().type(usuario.password)

    // Mock da validação do reCAPTCHA
    cy.intercept('POST', '**/recaptcha/api/siteverify', { body: { success: true } });

    // Clica em registrar
    cy.get('#register').click({ force: true });


    // Abertura e Tratamento da Janela do Google
    cy.on('window:alert', (mensagem) => {
      expect(mensagem).to.equal('You clicked a button');
      
    });
    
    // Validando mensagem de retorno:
    cy.get('#name').should('be.visible').and('contain.text', 'User exists!')
   

    // Voltando para página de Login
    cy.get('#gotologin').click();

    // Login: User + Senha
    cy.get('#userName').type('mariasousa');
    cy.get('#password').type('Teste@123');

    // Entrando
    cy.get('#login').click()

    // Validar que realizou o Login
    cy.wait(2000)
    cy.get('.ms-auto').should('be.visible')
    cy.get('#userName-value').should('be.visible').and('contain.text', 'mariasousa')



 });


}); // fim do describe