describe('Links', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/links');
    cy.viewport(1920, 1080);
  });

  it('Validar Título e Texto da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Links');

    // Texto explicativo da página
    cy.get(':nth-child(2) > strong')
      .should('contain.text', 'Following links will open new tab');
    cy.get(':nth-child(5) > strong')
      .should('contain.text', 'Following links will send an api call');
  });

  it('Lidando com Links que abrem em outras Abas', () => {
    cy.get('#simpleLink')
      .should('have.attr', 'href')
      .and('include', 'demoqa.com')
      .invoke('removeAttr', 'target') // remove o atributo target
      .click();

    // Validação: garantir que a URL mudou para o destino esperado
    cy.url().should('include', 'demoqa.com');

    // Voltando para a página inicial
    cy.visit('https://demoqa.com/links');
  });

  it('Validar link dinâmico', () => {
    cy.get('#dynamicLink')
      .should('have.attr', 'href', 'https://demoqa.com')
      .invoke('text')
      .should('match', /^Home/);

    cy.get('#dynamicLink')
      .invoke('removeAttr', 'target')
      .click();

    cy.url().should('include', 'demoqa.com');
  });

  // Cenários Positivos: Links com API
  it('Cenário Positivo: Validando APIs com retornos', () => {
    // Created - Retorna 201
    cy.intercept('GET', '**/created').as('createdRequest');
    cy.get('#created').click();
    cy.wait('@createdRequest').its('response.statusCode').should('eq', 201);

    // No Content - Retorna 204
    cy.intercept('GET', '**/no-content').as('noContentRequest');
    cy.get('#no-content').click();
    cy.wait('@noContentRequest').its('response.statusCode').should('eq', 204);

    // Moved - Retorna 301
    cy.intercept('GET', '**/moved').as('movedRequest');
    cy.get('#moved').click();
    cy.wait('@movedRequest').its('response.statusCode').should('eq', 301);

    // Bad Request - Retorna 400
    cy.intercept('GET', '**/bad-request').as('badRequest');
    cy.get('#bad-request').click();
    cy.wait('@badRequest').its('response.statusCode').should('eq', 400);

    // Unauthorized - Retorna 401
    cy.intercept('GET', '**/unauthorized').as('unauthorized');
    cy.get('#unauthorized').click();
    cy.wait('@unauthorized').its('response.statusCode').should('eq', 401);

    // Forbidden - Retorna 403
    cy.intercept('GET', '**/forbidden').as('forbidden');
    cy.get('#forbidden').click();
    cy.wait('@forbidden').its('response.statusCode').should('eq', 403);

    // Not Found - Retorna 404
    cy.intercept('GET', '**/invalid-url').as('invalidUrl');
    cy.get('#invalid-url').click();
    cy.wait('@invalidUrl').its('response.statusCode').should('eq', 404);
  });

  // Cenários Negativos: Links com API
  it('Cenário Negativo: Validando que a URL não muda após chamadas de API', () => {
    // Created
    cy.get('#created').click();
    cy.url().should('include', '/links');

    // No Content
    cy.get('#no-content').click();
    cy.url().should('include', '/links');

    // Moved
    cy.get('#moved').click();
    cy.url().should('include', '/links');

    // Bad Request
    cy.get('#bad-request').click();
    cy.url().should('include', '/links');

    // Unauthorized
    cy.get('#unauthorized').click();
    cy.url().should('include', '/links');

    // Forbidden
    cy.get('#forbidden').click();
    cy.url().should('include', '/links');

    // Not Found
    cy.get('#invalid-url').click();
    cy.url().should('include', '/links');
  });
});