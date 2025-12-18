// Validação de Checkbox

describe('CheckBox', ()=>{
    beforeEach(() =>{
        cy.visit('https://demoqa.com/checkbox')
        cy.viewport(1920,1080)
    })

    it('Validar Título', () => {
        cy.get('.text-center').should('be.visible')
    })
    
    it('Valida CheckBox', ()=>{
        cy.get('.rct-checkbox')
          .click()              // marca o checkbox
         //.should('be.checked') // valida que está marcado
        
        // Valida o resultado
        cy.get('#result').should('be.visible')

        // Tira a Seleção
        cy.get('.rct-checkbox')
            .click()
            .should('not.be.checked')

        
        // Valida o resultado
        cy.get('#result').should('be.not.exist')
    })

    it('Abrindo Opções e Clicando nos Elementos', ()=>{
        cy.get('.rct-collapse')
        .click()
        
        //Desktop:
        cy.get('.rct-node-expanded > ol > :nth-child(1) > .rct-text > .rct-collapse')
        .click()
        
        // Valida expansão
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .rct-node-expanded > ol')
        .should('be.visible')

                // Clica na Opção Notes - Usando o Nome 
                cy.contains('span.rct-title', 'Notes').click()
                cy.get('#tree-node-notes').should('be.checked')
                cy.get('.text-success').should('contain.text', 'notes')
                

                // Clica na Opção Commands - Usando o Nome 
                cy.contains('span.rct-title', 'Commands').click()
                cy.get('#tree-node-notes').should('be.checked')
                cy.get('.text-success').should('contain.text', 'commands')
        
        //Expande Documentos
        cy.get('#tree-node > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > .rct-collapse')
        .click()

        // WorkSpace
        cy.get(':nth-child(2) > ol > :nth-child(1) > .rct-text > .rct-collapse')
        .click()

            // Valida expansão
            cy.get(':nth-child(2) > :nth-child(2) > .rct-node-expanded > ol')
            .should('be.visible')

                // Clica na Opção React - Usando o Nome 
                cy.contains('span.rct-title', 'React').click()
                cy.get('#tree-node-notes').should('be.checked')
                cy.get('.text-success').should('contain.text', 'react')

                // Clica na Opção Angular - Usando o Nome 
                cy.contains('span.rct-title', 'Angular').click()
                cy.get('#tree-node-notes').should('be.checked')
                cy.get('.text-success').should('contain.text', 'angular')

                // Clica na Opção Veu - Usando o Nome 
                cy.contains('span.rct-title', 'Veu').click()
                cy.get('#tree-node-notes').should('be.checked')
                cy.get('.text-success').should('contain.text', 'veu')
    
        // Office
        cy.get(':nth-child(2) > :nth-child(2) > .rct-node-collapsed > .rct-text > .rct-collapse')
        .click()
            
            // Valida expansão
            cy.get(':nth-child(2) > :nth-child(2) > :nth-child(2) > ol')
            .should('be.visible')

            // Clica na Opção React - Usando o Nome 
            cy.contains('span.rct-title', 'Public').click()
            cy.get('#tree-node-notes').should('be.checked')
            cy.get('.text-success').should('contain.text', 'public')

            // Clica na Opção Private - Usando o Nome 
            cy.contains('span.rct-title', 'Private').click()
            cy.get('#tree-node-notes').should('be.checked')
            cy.get('.text-success').should('be.visible')

            // Clica na Opção Classified - Usando o Nome 
            cy.contains('span.rct-title', 'Classified').click()
            cy.get('#tree-node-notes').should('be.checked')
            cy.get('.text-success').should('contain.text', 'classified')

            // Clica na Opção General - Usando o Nome 
            cy.contains('span.rct-title', 'General').click()
            cy.get('#tree-node-notes').should('be.checked')
            cy.get('.text-success').should('contain.text', 'general')

        // Downloads
        cy.get('.rct-node-collapsed > .rct-text > .rct-collapse')
        .click()

        cy.get(':nth-child(3) > ol')
         .should('be.visible')

         // Clica na Opção Word File - Usando o Nome 
        cy.contains('span.rct-title', 'Word File.doc').click()
        cy.get('#tree-node-notes').should('be.checked')
        cy.get('.text-success').should('contain.text', 'wordFile')


        
        // Clica na Opção Word File - Usando o Nome 
        cy.contains('span.rct-title', 'Excel File.doc').click()
        cy.get('#tree-node-notes').should('be.checked')
        cy.get('.text-success').should('contain.text', 'excelFile')
            
    })

    it('Abrindo Opções e Clicando nos Elementos - Expand All', () => {
        // Expande toda a árvore de uma vez
        cy.get('button[aria-label="Expand all"]').click()

        // Notes
        cy.contains('span.rct-title', 'Notes').click()
        cy.get('#tree-node-notes').should('be.checked')
        cy.get('.text-success').should('contain.text', 'notes')

        // Desmarca Notes
        cy.contains('span.rct-title', 'Notes').click()
        cy.get('#tree-node-notes').should('not.be.checked')

        // Commands
        cy.contains('span.rct-title', 'Commands').click()
        cy.get('#tree-node-commands').should('be.checked')
        cy.get('.text-success').should('contain.text', 'commands')

        // Desmarca Commands
        cy.contains('span.rct-title', 'Commands').click()
        cy.get('#tree-node-commands').should('not.be.checked')

        // React
        cy.contains('span.rct-title', 'React').click()
        cy.get('#tree-node-react').should('be.checked')
        cy.get('.text-success').should('contain.text', 'react')

        // Desmarca React
        cy.contains('span.rct-title', 'React').click()
        cy.get('#tree-node-react').should('not.be.checked')


        // Angular
        cy.contains('span.rct-title', 'Angular').click()
        cy.get('#tree-node-angular').should('be.checked')
        cy.get('.text-success').should('contain.text', 'angular')

        // Desmarca Seleção Angular
        cy.contains('span.rct-title', 'Angular').click()
        cy.get('#tree-node-angular').should('not.be.checked')

        // Vue
        cy.contains('span.rct-title', 'Veu').click()
        cy.get('#tree-node-veu').should('be.checked')
        cy.get('.text-success').should('contain.text', 'veu')

        // Desmarca a Seleção Veu
        cy.contains('span.rct-title', 'Veu').click()
        cy.get('#tree-node-veu').should('not.be.checked')

        // Public
        cy.contains('span.rct-title', 'Public').click()
        cy.get('#tree-node-public').should('be.checked')
        cy.get('.text-success').should('contain.text', 'public')

        // Desmarca Seleção -> Public
        cy.contains('span.rct-title', 'Public').click()
        cy.get('#tree-node-public').should('not.be.checked')

        // Private
        cy.contains('span.rct-title', 'Private').click()
        cy.get('#tree-node-private').should('be.checked')
        cy.get('.text-success').should('contain.text', 'private')

        // Desmarca Selenção Private
        cy.contains('span.rct-title', 'Private').click()
        cy.get('#tree-node-private').should('not.be.checked')

        // Classified
        cy.contains('span.rct-title', 'Classified').click()
        cy.get('#tree-node-classified').should('be.checked')
        cy.get('.text-success').should('contain.text', 'classified')

        // Desmarca Seleção Classified
        cy.contains('span.rct-title', 'Classified').click()
        cy.get('#tree-node-classified').should('not.be.checked')

        // General
        cy.contains('span.rct-title', 'General').click()
        cy.get('#tree-node-general').should('be.checked')
        cy.get('.text-success').should('contain.text', 'general')

        // Desmarca Seleção General
         cy.contains('span.rct-title', 'General').click()
        cy.get('#tree-node-general').should('not.be.checked')       

        // Word File
        cy.contains('span.rct-title', 'Word File.doc').click()
        cy.get('#tree-node-wordFile').should('be.checked')
        cy.get('.text-success').should('contain.text', 'wordFile')

        // Desmarca Seleção Word File
        cy.contains('span.rct-title', 'Word File.doc').click()
        cy.get('#tree-node-wordFile').should('not.be.checked')

        // Excel File
        cy.contains('span.rct-title', 'Excel File.doc').click()
        cy.get('#tree-node-excelFile').should('be.checked')
        cy.get('.text-success').should('contain.text', 'excelFile')

        // Desmarca Seleção Excel File
        cy.contains('span.rct-title', 'Excel File.doc').click()
        cy.get('#tree-node-excelFile').should('not.be.checked')
})

    it('Validação por Function', ()=>{
    function toggleAndValidate(title, inputId, successText) {
    // Marca
    cy.contains('span.rct-title', title).click()
    cy.get(inputId).should('be.checked')
    cy.get('.text-success').should('contain.text', successText)

    // Desmarca
    cy.contains('span.rct-title', title).click()
    cy.get(inputId).should('not.be.checked')
    }
    })

it('Usando o const  - Expand All', () => {
        // Função auxiliar definida dentro do teste
        const toggleAndValidate = (title, inputId, successText) => {
            cy.contains('span.rct-title', title).click()
            cy.get(inputId).should('be.checked')
            cy.get('.text-success').should('contain.text', successText)

            cy.contains('span.rct-title', title).click()
            cy.get(inputId).should('not.be.checked')
        }

        // Expande toda a árvore
        cy.get('button[aria-label="Expand all"]').click()

        // Lista de elementos
        const elementos = [
            { title: 'Notes', input: '#tree-node-notes', text: 'notes' },
            { title: 'Commands', input: '#tree-node-commands', text: 'commands' },
            { title: 'React', input: '#tree-node-react', text: 'react' },
            { title: 'Angular', input: '#tree-node-angular', text: 'angular' },
            { title: 'Veu', input: '#tree-node-veu', text: 'veu' },
            { title: 'Public', input: '#tree-node-public', text: 'public' },
            { title: 'Private', input: '#tree-node-private', text: 'private' },
            { title: 'Classified', input: '#tree-node-classified', text: 'classified' },
            { title: 'General', input: '#tree-node-general', text: 'general' },
            { title: 'Word File.doc', input: '#tree-node-wordFile', text: 'wordFile' },
            { title: 'Excel File.doc', input: '#tree-node-excelFile', text: 'excelFile' },
        ]

        // Loop para validar todos
        elementos.forEach(el => {
            toggleAndValidate(el.title, el.input, el.text)
        })
        })

        it('Abrindo com Expand All e Fechando com Collapse All', ()=>{

        // Expande toda a árvore
        cy.get('button[aria-label="Expand all"]').click()

        // Oculta toda a árvore
        // Expande toda a árvore
        cy.get('button[aria-label="Collapse all"]').click()

        })

it('Estado indeterminado quando alguns filhos são marcados', () => {
    cy.get('button[aria-label="Expand all"]').click()

    // Marca apenas um filho (Private) do nó Documents
    cy.contains('span.rct-title', 'Private').click()

    // Verifica que o checkbox pai (Documents) está em estado indeterminado
    cy.contains('span.rct-title', 'Documents')
        .parents('.rct-node')
        .first()
        .find('.rct-checkbox > svg')
        .should('have.class', 'rct-icon-half-check')
    })

}) // Fim do Describre