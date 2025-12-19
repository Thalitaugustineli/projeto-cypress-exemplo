describe('Frames', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/frames')
        cy.viewport(1920,1080)
    })

    it('Validar Título', ()=>{
        cy.get('.text-center').should('be.visible').and('contain.text', 'Frames');

        // Validar texto
        cy.get('#framesWrapper > :nth-child(2)').should('contain.text', 'Sample Iframe page There are 2 Iframes in this page. Use browser inspecter or firebug to check out the HTML source. In total you can switch between the parent frame, which is this window, and the two frames below')
    })

    it('Validação do iframe', ()=>{
            // Carrega o iframe pelo seletor
            cy.frameLoaded('#frame1');

            // Acessa o conteúdo do iframe
            cy.iframe('#frame1').find('h1').should('have.text', 'This is a sample page');
     });

    it('Valida texto dentro do frame2', () => {
         // Carrega o iframe pelo seletor
        cy.frameLoaded('#frame2');

        // Acessa o conteúdo do iframe
        cy.iframe('#frame2').find('h1').should('have.text', 'This is a sample page');
    });



























































}) // fim do describe