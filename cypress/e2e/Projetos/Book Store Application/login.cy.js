describe('Book Store', ()=>{
    beforeEach(()=>{
        cy.visit ( 'https://demoqa.com/profile');
        cy.viewport(1920,1080)
    })

    it('Teste E2E do Site', ()=>{

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

    // Clica no botão
    cy.get('#alertButton').click();

    // Valida que o botão foi clicado
    cy.get('#alertButton').should('be.enabled');






















    })

}); // fim do describe