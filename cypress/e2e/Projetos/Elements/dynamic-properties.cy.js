describe('Propriedades Dinâmicas - Images', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/dynamic-properties')
        cy.viewport(1920,1080);
    })

    it('Validar Título ', () => {
    cy.get('.text-center').should('be.visible')
    })

    it('Botão habilita após 5 segundos', () => {
        cy.get('#enableAfter').should('be.disabled'); // inicialmente desabilitado
        cy.wait(5000); // espera 5 segundos
        cy.get('#enableAfter').should('be.enabled'); // agora habilitado
    });

    it('Texto aparece após delay', () => {
        cy.get('#visibleAfter').should('not.exist'); // inicialmente não existe
        cy.wait(5000);
       cy.get('#visibleAfter').should('be.visible'); // visível após delay
    });

    it('Botão muda de cor', () => {
        cy.get('#colorChange')
            .should('have.css', 'color', 'rgb(255, 255, 255)'); // cor inicial (exemplo)
        cy.wait(5000);
        cy.get('#colorChange')
            .should('not.have.css', 'color', 'rgb(255, 255, 255)'); // cor alterada
});
















}) // fim do