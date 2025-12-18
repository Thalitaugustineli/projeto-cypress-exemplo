describe('Links', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/links')
        cy.viewport(1920,1080);
    })

    it('Validar Título e Texto', () => {
    cy.get('.text-center').should('be.visible')

    // Texto da Página:
    cy.get(':nth-child(2) > strong').should('contains.text', 'Following links will open new tab')
    cy.get(':nth-child(5) > strong').should('contains.text', 'Following links will send an api call')
    })

it('Lidando com Links que abrem em outras Abas', () => {
  cy.get('#simpleLink')
    .invoke('removeAttr', 'target') // remove o atributo target
    .click();

  // Validação: garantir que a URL mudou para o destino esperado
  cy.url().should('include', 'demoqa.com');

  // Voltando para a página inicial
  cy.visit('https://demoqa.com/links');
})

it('Validar link dinâmico', () => {
    cy.get('#dynamicLink')
        .should('have.attr', 'href', 'https://demoqa.com')
            

    cy.get('#dynamicLink').invoke('text').should('match', /^Home/);

    cy.get('#dynamicLink')
        .invoke('removeAttr', 'target')
        .click();

    cy.url().should('include', 'demoqa.com');
});

// Links com API
  it('Cenário Positivo: Validando APIs com retornos', () => {

    // Created - Retorna 201
    cy.intercept('GET', '**/created').as('createdRequest');
    cy.get('#created').click();
    cy.wait('@createdRequest').its('response.statusCode').should('eq', 201);

    // No Content - Retorna 204
    cy.intercept('Get', '**/no-content').as('no-contentRequest');
    cy.get('#no-content').click();
    cy.wait('@no-contentRequest').its('response.statusCode').should('eq', 204)

    // Moved - Retorna 301
    cy.intercept('GET', '**/moved').as('movedRequest');
    cy.get('#moved').click();
    cy.wait('@movedRequest').its('response.statusCode').should('eq', 301)

    //Bad Request - Retorna 400
    cy.intercept('GET', '**/bad-request').as('bad-requestRequest');
    cy.get('#bad-request').click();
    cy.wait('@bad-requestRequest').its('response.statusCode').should('eq', 400)

    // Unauthorized - Retorna 401
    cy.intercept('GET', '**/unauthorized').as('unauthorizedRequest');
    cy.get('#unauthorized').click();
    cy.wait('@unauthorizedRequest').its('response.statusCode').should('eq', 401)

    // forbidden - Retorna 403
    cy.intercept('GET', '**/forbidden').as('forbiddenRequest');
    cy.get('#forbidden').click();
    cy.wait('@forbiddenRequest').its('response.statusCode').should('eq', 403)

    // Not Found - Retorna 404
    cy.intercept('GET', '**/invalid-url').as('invalid-urlRequest');
    cy.get('#invalid-url').click();
    cy.wait('@invalid-urlRequest').its('response.statusCode').should('eq', 404)

  });





    it('Cenário Negativo: Validando APIs com retornos', () => {
    // CREATED
    cy.get('#created').click();
    cy.url().should('include', '/links'); // continua na mesma página

    // No Content
    cy.get('#no-content').click();
    cy.url().should('include', '/links'); // continua na mesma página

    //Moved
    cy.get('#moved').click();
    cy.url().should('include', '/links'); // continua na mesma página
    
    // Bad Request
    cy.get('#bad-request').click();
    cy.url().should('include', '/links'); // continua na mesma página

    // Unauthorized
    cy.get('#unauthorized').click()
    cy.url().should('include', '/links'); // continua na mesma página

    // forbidden
    cy.get('#forbidden').click();
    cy.url().should('include', '/links'); // continua na mesma página

    //Not Found
    cy.get('#invalid-url').click();
    cy.url().should('include', '/links'); // continua na mesma página


  });





















}) // fim do describe