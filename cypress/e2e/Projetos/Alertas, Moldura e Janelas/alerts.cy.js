describe('Alerts', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Alerts');
  });

  it('Clique no Botão para ver o Alerta', () => {
    cy.get(':nth-child(2) > .col-md-6').should('be.visible');

    // Intercepta o alerta e valida o texto
    cy.on('window:alert', (mensagem) => {
      expect(mensagem).to.equal('You clicked a button');
    });

    // Clica no botão
    cy.get('#alertButton').click();

    // Valida que o botão foi clicado
    cy.get('#alertButton').should('be.enabled');
  });

  it('Ao clicar no botão, um alerta aparecerá após 5 segundos.', () => {
    cy.on('window:alert', (mensagem) => {
      expect(mensagem).to.equal('This alert appeared after 5 seconds');
    });

    cy.get('#timerAlertButton').click();

    // Espera o tempo necessário
    cy.wait(5000);

    // Valida que o botão continua visível após o alerta
    cy.get('#timerAlertButton').should('be.visible');
  });

  it('Valida confirmação com OK', () => {
    cy.on('window:confirm', (mensagem) => {
      expect(mensagem).to.equal('Do you confirm action?');
      return true; // Simula clique em "OK"
    });

    cy.get('#confirmButton').click();

    // Valida que o resultado exibido corresponde ao OK
    cy.get('#confirmResult')
      .should('be.visible')
      .and('contain.text', 'You selected Ok');
  });

  it('Valida confirmação com Cancel', () => {
    cy.on('window:confirm', (mensagem) => {
      expect(mensagem).to.equal('Do you confirm action?');
      return false; // Simula clique em "Cancel"
    });

    cy.get('#confirmButton').click();

    // Valida que o resultado exibido corresponde ao Cancel
    cy.get('#confirmResult')
      .should('be.visible')
      .and('contain.text', 'You selected Cancel');
  });

  it('Ao clicar no botão, uma caixa de diálogo será exibida.', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Joao');
    });

    cy.get('#promtButton').click();

    // Valida que o resultado exibido corresponde ao valor retornado
    cy.get('#promptResult')
      .should('be.visible')
      .and('contain.text', 'Joao');
  });
});