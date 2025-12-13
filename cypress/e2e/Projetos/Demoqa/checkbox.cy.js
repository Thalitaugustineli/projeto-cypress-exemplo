// Validação de Checkbox


describe('Check Box - Demo QA', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/checkbox')
        
        
    })
    
    // Valida o Título h1 da aplicação
    it('Validando título da Aplicação', () =>{
        cy.get('.text-center').scrollIntoView().should('have.text', 'Check Box')
    })
    it('Abrindo Array', ()=>{
        cy.get('.rct-options').should('be.visible')

        // Selecionando pelo Title do Bota - Abrindo
        cy.get('[title="Expand all"]').click()

        // Ocultando:
        cy.get('[title="Collapse all').click();

    })
    
    
    it('Abrindo e Selecionando Checkbox', ()=>{
        cy.get('.rct-options').should('be.visible')

        // Selecionando pelo Title do Bota - Abrindo
        cy.get('[title="Expand all"]').click()
        
        // Selecionando todas as Opções
        cy.get('#tree-node > :nth-child(2) > :nth-child(1) > :nth-child(1) > label').click()

        // Validando Resultado
        const esperadoTotal = [
            'home', 'desktop', 'notes', 'commands', 'documents',
            'workspace', 'react', 'angular', 'veu', 'office',
            'public', 'private', 'classified', 'general', 'downloads',
            'wordFile', 'excelFile'
            ]

            cy.get('#result .text-success').then($spans => {
            const textos = [...$spans].map(span => span.innerText)
            expect(textos).to.deep.equal(esperadoTotal)
            })
    })

    it.only('Validar Check Box', ()=>{
        cy.get('.rct-checkbox').should('be.check')
    })

    it.skip('Abrindo com Setas', ()=>{
        cy.get('.rct-collapse rct-collapse-btn').click()
    })




























})