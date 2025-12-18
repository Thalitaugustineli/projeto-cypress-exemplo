describe('Broken Links - Images', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/broken')
        cy.viewport(1920,1080);
    })

    it('Validar Título e Texto', () => {
    cy.get('.text-center').should('be.visible')

    })

    it('Imagem Válida', ()=>{
        cy.contains('Valid image').should('be.visible');

        // Valida que a Imagem foi carregada normalmente        
        cy.get('[src="/images/Toolsqa.jpg"]').then(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
            });


    })

    it('Imagem Quebrada', ()=>{
        cy.contains('Broken image').should('be.visible');
        cy.get('[src="/images/Toolsqa_1.jpg"]').then(($img) => {
            expect($img[0].naturalWidth).to.equal(0);
        });
  });

    it('Link - Válido', () => {
    // Valida que o link existe e aponta para o destino correto
    cy.contains('Click Here for Valid Link')
        .should('have.attr', 'href', 'http://demoqa.com')
        .then(($link) => {
        const url = $link.prop('href'); // pega o href do link

        // Faz a requisição direta sem abrir a página
        cy.request(url).then((response) => {
            expect(response.status).to.eq(200); // status OK
        });
        });
    });

it('Link - Inválido', () => {
    cy.contains('a', 'Click Here for Broken Link')
      .invoke('attr', 'href') 
      .then((url) => {
        cy.request({ url, failOnStatusCode: false })
          .its('status')
          .should('be.oneOf', [404, 500]);
      });
    });

})// fim do describe

