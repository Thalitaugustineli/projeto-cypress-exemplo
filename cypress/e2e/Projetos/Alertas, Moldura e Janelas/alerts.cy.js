describe('Alerts', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center').should('be.visible').and('contain.text', 'Alerts');
  });

  it('Clique no Botão para ver o Alerta', ()=>{
    cy.get(':nth-child(2) > .col-md-6').should('be.visible')

    // Intercepta o alerta e valida o texto
    cy.on('window:alert', (mensagem) => {
        expect(mensagem).to.equal('You clicked a button');
  });

    // clicar no button
    cy.get('#alertButton').click()
    
  })

  it('Ao clicar no botão, um alerta aparecerá após 5 segundos.', ()=>{

    // Intercepta o alerta e valida o texto
    cy.on('window:alert', (mensagem) => {
        expect(mensagem).to.equal('This alert appeared after 5 seconds');
  });

    // clicar no button
    cy.get('#timerAlertButton').click()
    cy.wait(5000);

  })

    it('Valida confirmação com OK', () => {
       
        // Intercepta o confirm e valida a mensagem
        cy.on('window:confirm', (mensagem) => {
            expect(mensagem).to.equal('Do you confirm action?');
            return true; // Simula clique em "OK"
        });

        cy.get('#confirmButton').click();

        // Valida que o resultado exibido na página corresponde ao OK
        cy.get('#confirmResult').should('contain.text', 'You selected Ok');
    });

    it('Valida confirmação com Cancel', () => {
        // Intercepta o confirm e valida a mensagem
        cy.on('window:confirm', (mensagem) => {
            expect(mensagem).to.equal('Do you confirm action?');
            return false; // Simula clique em "OK"
        });

        cy.get('#confirmButton').click();

        // Valida que o resultado exibido na página corresponde ao OK
        cy.get('#confirmResult').should('contain.text', 'You selected Cancel');
    });

    it('Ao clicar no botão, uma caixa de diálogo será exibida.', ()=>{
        // Intercepta o prompt e retorna o valor digitado
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Joao');
        });

        // Clica no botão que dispara o prompt
        cy.get('#promtButton').click();

        // Valida que o resultado exibido na página corresponde ao valor retornado
        cy.get('#promptResult').should('contain.text', 'Joao');

    })
    


















  }); //fim describe