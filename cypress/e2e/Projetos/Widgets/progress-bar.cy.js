describe('Progress-Bar', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/progress-bar');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Progress Bar');
  });

  it('Iniciar e validar progresso', () => {
    // Botão de start
    cy.get('#startStopButton').should('be.visible').click();

    // Aguarda alguns segundos e valida que o progresso aumentou
    cy.wait(2000);
    cy.get('.progress-bar')
      .invoke('attr', 'aria-valuenow')
      .then(value => {
        expect(Number(value)).to.be.greaterThan(0);
      });
  });

  it('Pausar progresso', () => {
    cy.get('#startStopButton').click(); // inicia
    cy.wait(2000);
    cy.get('#startStopButton').click(); // pausa

    // Captura valor atual
    cy.get('.progress-bar')
      .invoke('attr', 'aria-valuenow')
      .then(valueBefore => {
        cy.wait(2000);
        cy.get('.progress-bar')
          .invoke('attr', 'aria-valuenow')
          .then(valueAfter => {
            expect(valueBefore).to.equal(valueAfter); // não deve ter mudado
          });
      });
  });

  it('Completar progresso até 100%', () => {
    cy.get('#startStopButton').click(); // inicia

    // Aguarda até completar
    cy.get('.progress-bar', { timeout: 15000 })
      .should('have.attr', 'aria-valuenow', '100');

    // Valida que o botão muda para "Reset"
    cy.get('#resetButton').should('be.visible');
  });

  it('Resetar progresso', () => {
    cy.get('#startStopButton').click(); // inicia
    cy.get('.progress-bar', { timeout: 15000 })
      .should('have.attr', 'aria-valuenow', '100');

    // Reset
    cy.get('#resetButton').click();

    // Valida que voltou para 0
    cy.get('.progress-bar')
      .should('have.attr', 'aria-valuenow', '0');
  });
});