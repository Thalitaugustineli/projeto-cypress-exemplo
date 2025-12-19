//
 // 


 describe('Nested Frames', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/nestedframes ')
        cy.viewport(1920,1080)
    })

    it('Validar Título', ()=>{
        cy.get('.text-center').should('be.visible').and('contain.text', 'Nested Frames');

        // Validar texto
        cy.get('#framesWrapper > :nth-child(2)').should('contain.text', 'Sample Nested Iframe page. There are nested iframes in this page. Use browser inspecter or firebug to check out the HTML source. In total you can switch between the parent frame and the nested child frame.')
    })
    
    it.only('Validando o Frame', ()=>{
            // Carrega o frame pai
            cy.frameLoaded('#frame1');

                cy.get('#frame1')
                .its('0.contentDocument.body')
                .should('not.be.empty')
                .then(cy.wrap)  
                .should('contain.text', 'Parent frame');

                // Frame filho

                cy.get('#frame1')
                .its('0.contentDocument.body')
                .then(cy.wrap)
                .find('iframe')
                .its('0.contentDocument.body')
                .should('not.be.empty')
                .then(cy.wrap)
                .find('p')
                .should('contain.text', 'Child Iframe');
    });
 


    })// fim do describe