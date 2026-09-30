describe('Date Picker', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/date-picker');
    cy.viewport(1920, 1080);
  });

  it('Validar Título da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Date Picker');
  });

  it('Selecionando Data de Nascimento | Select Date', () => {
    cy.get('#datePickerMonthYearInput').click();

    // Seleciona mês e ano
    cy.get('.react-datepicker__month-select').select('March');
    cy.get('.react-datepicker__year-select').select('2000');

    // Seleciona o dia 25
    cy.get('.react-datepicker__day--025').click();

    // Valida se o campo contém a data correta
    cy.get('#datePickerMonthYearInput')
      .should('be.visible')
      .and('have.value', '03/25/2000');
  });

  it('Selecionando Data e Hora | Date And Time', () => {
    cy.get('#dateAndTimePickerInput').click();

    // Seleciona mês e ano
    cy.get('.react-datepicker__month-read-view').click();
    cy.contains('.react-datepicker__month-option', 'April').click();

    cy.get('.react-datepicker__year-read-view').click();
    cy.contains('.react-datepicker__year-option', '2025').click();

    // Seleciona dia
    cy.get('.react-datepicker__day--015').click();

    // Seleciona hora
    cy.contains('.react-datepicker__time-list-item', '10:00').click();

    // Valida se o campo contém a data e hora correta
    cy.get('#dateAndTimePickerInput')
      .should('be.visible')
      .and('have.value', 'April 15, 2025 10:00 AM');
  });

  it('Validação negativa: não deve aceitar data inválida', () => {
    // Insere manualmente uma data inválida
    cy.get('#datePickerMonthYearInput')
      .clear()
      .type('13/40/2025{enter}');

    // Valida que o campo não aceita a data inválida
    cy.get('#datePickerMonthYearInput')
      .should('not.have.value', '13/40/2025');
  });

  it('Validação dinâmica: seleciona a data atual', () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataEsperada = `${mes}/${dia}/${ano}`;

    cy.get('#datePickerMonthYearInput').clear().type(`${dataEsperada}{enter}`);

    cy.get('#datePickerMonthYearInput')
      .should('have.value', dataEsperada);
  });
});