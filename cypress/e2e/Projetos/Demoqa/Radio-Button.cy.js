describe('Radio Button', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/radio-button')
        cy.viewport(1920,1080)
    })

    it('Validar Título e Texto', () => {
        cy.get('.text-center').should('be.visible')

        // Validando Texto
        cy.get('.mb-3').should('contain.text', 'Do you like the site?')
        cy.get(':nth-child(2) > .custom-control-label').should('contain.text', 'Yes')
        cy.get(':nth-child(3) > .custom-control-label').should('contain.text', 'Impressive')
        cy.get('.custom-control.disabled > .custom-control-label').should('contain.text', 'No')
    })
    it('Selecionando pelo id', () => {
        // Selecionando Yes
        cy.get('#yesRadio').check({ force: true }).should('be.checked')
        // Validação de resultado
        cy.get('.text-success').should('have.text', 'Yes')

        // Selecionando Impressive
        cy.get('#impressiveRadio').check({ force: true }).should('be.checked')

        // Validação de resultado
        cy.get('.text-success').should('have.text', 'Impressive')

        // Pelo id do NO para confirmar que está desabilitado
        cy.get('#noRadio').should('be.disabled')        

    })

    // Código do HTML Está incorreto - Desconsiderando it com 'name'

    it.skip('Selecionando pelo name', ()=>{
        cy.get('input[name="like"]').check('yesRadio', { force: true }).should('be.checked')
        cy.get('input[name="like"]').eq(1).should('be.disabled')

    })

    it('Selecionando pela label',()=>{
        cy.contains('label', 'Yes').click()
        // Validação de resultado
        cy.get('.text-success').should('have.text', 'Yes')

        cy.contains('label', 'Impressive').click()
        // Validação de resultado
        cy.get('.text-success').should('have.text', 'Impressive')

        // Opção NO está desabilitada
        cy.get('label[for="noRadio"]').should('have.class', 'disabled')

        
    })
    it('Valida que o radio NO está desabilitado', () => {
        cy.get('#noRadio').should('be.disabled')
    })

    it('Valida que apenas uma opção pode ser selecionada', () => {
        // Seleciona Yes
        cy.get('#yesRadio').check({ force: true }).should('be.checked')

        // Valida que somente Yes está marcado
        cy.get('#impressiveRadio').should('not.be.checked')
        cy.get('#noRadio').should('not.be.checked')

        // Seleciona Impressive
        cy.get('#impressiveRadio').check({ force: true }).should('be.checked')

        // Valida que somente Impressive está marcado
        cy.get('#yesRadio').should('not.be.checked')
        cy.get('#noRadio').should('not.be.checked')
})
})