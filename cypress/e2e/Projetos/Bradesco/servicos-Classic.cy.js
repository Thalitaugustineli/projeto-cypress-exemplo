describe('Serviços ', ()=>{
    beforeEach(()=>{
        cy.visit('https://banco.bradesco/html/classic/produtos-servicos/servicos/index.shtm')
        cy.viewport(1920,1080)
        cy.get('#aceitarCookies').click();
    })

    it('Validar Header', ()=>{

    })

   

    it('Validar Transações e Consultas', ()=>{
        cy.get('#c-tab--content-1').scrollIntoView().should('be.visible')

         cy.get('#c-tab--content-1').scrollIntoView().should('be.visible')

        // Lista de links que devem ser validados
        const links = [
            { title: 'Boletos', selector: '#c-tab--content-1 > .l-flex > :nth-child(1) > a' },
            { title: 'Débito Automático', selector: '#c-tab--content-1 > .l-flex > :nth-child(8) > a' },
            { title: 'Imposto de Renda', selector: '#c-tab--content-1 > .l-flex > :nth-child(10) > a' },
            { title: 'Pagamentos', selector: '#c-tab--content-1 > .l-flex > :nth-child(13) > a' },
            { title: 'Pix', selector: '#c-tab--content-1 > .l-flex > :nth-child(14) > a' },
            // Erro em Produção { title: 'Tarifas', seletor: '#c-tab--content-1 > .l-flex > :nth-child(5) > .opentab > .c-icon'}
        ]

        links.forEach(link => {
            cy.get(link.selector)
            .should('be.visible')
            .should('have.attr', 'href')
            .then((href) => {
                const fullUrl = href.startsWith('http') ? href : `https://banco.bradesco${href}`
                cy.log(`Validando link: ${link.title} -> ${fullUrl}`)
                cy.request(fullUrl).its('status').should('eq', 200)
            })
        })


        // Buscador DDA
        cy.get('#c-tab--content-1 > .l-flex > :nth-child(2) > .opentab > .c-icon').click()
        cy.get('#dda').should('be.visible')
        cy.get('#dda > .close').click()
        cy.get('#dda').should('not.be.visible')

        // Cadastro de Email
        cy.get('#c-tab--content-1 > .l-flex > :nth-child(3) > .opentab > .c-icon').click()
        cy.get('.l-container > #cadastro-de-email').should('be.visible')
        cy.get('.l-container > #cadastro-de-email > .close').click()

        // Certificado Digital
        cy.get('#c-tab--content-1 > .l-flex > :nth-child(4) > .opentab > .c-icon').click({force: true})

        // Cheques
        cy.get(':nth-child(6) > .opentab > .c-icon').click({force: true})
        
        // Comprovantes de documentos
        cy.get(':nth-child(7) > .opentab > .c-icon').click()

        // Depósito de cheques pelo celular
        cy.get(':nth-child(9) > .opentab > .c-icon').click()
        cy.get('.l-container > #deposito-cheque-celular').should('be.visible')
         cy.get('.l-container > #deposito-cheque-celular > .close').click()

        // Minhas mensagem
        cy.get(':nth-child(11) > .opentab > .c-icon').click()
        cy.get('#info-cel').should('be.visible')
        cy.get('#acc-panel-39').should('be.visible')
        cy.get('#c-tab--content-7 > .d-flex > img').should('be.visible')
        cy.get(':nth-child(12) > .infocelular-container > a').should('be.visible')

        //Meus banco:
        cy.get(':nth-child(12) > .opentab > .c-icon').scrollIntoView().click()

        // Recargas
        cy.get(':nth-child(15) > .opentab > .c-icon').click() // Erro de JS

        //Saldos e extrato
        cy.get(':nth-child(16) > .opentab > .c-icon').click() // Erro de JS

        //Transferências, saques e depósitos
        cy.get(':nth-child(17) > .opentab > .c-icon').click()
        cy.get('#transferencias-saques-e-depositos').should('be.visible')

        // ---------------- TRANSFERÊNCIAS ----------------

          cy.get('#tab1').should('be.visible') // aba ativa

            // Função utilitária para validar pergunta com modal
            const validaPerguntaComModal = (buttonId, panelId) => {
                cy.get(buttonId).click()
                cy.get(panelId).should('be.visible')
                cy.get(`${panelId} > .col-lg-4 > .c-btn`).click()
                cy.get('#modalIB > section').should('be.visible')
                cy.get('.mfp-close').click()
            }

            // Pergunta 1
            validaPerguntaComModal('#acc-button-1', '#acc-panel-1')
            cy.get('.col-lg-8 > :nth-child(4) > a')
                .should('be.visible')
                .should('have.attr', 'href')

            // Pergunta 2
            validaPerguntaComModal('#acc-button-2', '#acc-panel-2')

            // Pergunta 3
            validaPerguntaComModal('#acc-button-3', '#acc-panel-3')
            cy.get('#acc-panel-3 > .col-lg-8 > :nth-child(2) > a')
                .should('be.visible')
                .should('have.attr', 'href')

            // Pergunta 4
            validaPerguntaComModal('#acc-button-4', '#acc-panel-4')
            cy.get('#acc-panel-4 > .col-lg-8 > :nth-child(2) > a')
                .should('be.visible')
                .should('have.attr', 'href')

            // Pergunta 5
            cy.get('#acc-button-5').click()
            cy.get('#acc-panel-5').should('be.visible')
            cy.get('#acc-panel-5 > :nth-child(1) > a')
                .should('be.visible')
                .should('have.attr', 'href')

            // Validação final do bloco
            cy.get('#c-tab--content-4 > .c-block').should('be.visible')

        // ---------------- SAQUES ----------------

        cy.get('#transferencias-saques-e-depositos > .c-tab > .c-tab--item > :nth-child(2) > #tab2').click()
        
        cy.get('#c-tab--content-5 > :nth-child(1)').should('be.visible')
        
        cy.get('#c-tab--content-5 > :nth-child(1) > a')
                .should('be.visible')
                .should('have.attr', 'href')

        // Perguntas - Sessão Saques no Brasil
        
        // Pergunta 1
        cy.get('#acc-button-6').click()
        cy.get('#acc-panel-6').should('be.visible')
        cy.get('#acc-panel-6 > :nth-child(2) > a').should('be.visible').should('have.attr', 'href')
        cy.get('#acc-panel-6 > :nth-child(3) > .c-btn').should('be.visible').should('have.attr', 'href')
        
        // Pergunta 2
        cy.get('#acc-button-7').click()
        cy.get('#acc-panel-7').should('be.visible')

        // Pergunta 3
        cy.get('#acc-button-8').click()
        cy.get('#acc-panel-8').should('be.visible')
        cy.get('#acc-panel-8 > .c-text > .c-btn').should('be.visible').should('have.attr', 'href')
       

        // Pergunta 4
        cy.get('#acc-button-9').click()
        cy.get('#acc-panel-9').should('be.visible')
        
        // Pergunta 5
        cy.get('#acc-button-10').click()
        cy.get('#acc-panel-10').should('be.visible')
        cy.get('.c-list > :nth-child(2) > .modalIB').click()
            cy.get('#modalIB > section').should('be.visible')
            cy.get('.mfp-close').click()

        cy.get('[href="/html/classic/produtos-servicos/cartoes/servicos/servicos-seguranca/alteracao-de-senha-do-cartao.shtm"]')
            .should('be.visible').should('have.attr', 'href')
        cy.get('.c-list > :nth-child(6) > a').should('be.visible').should('have.attr', 'href')

        // Pergunta 6
        cy.get('#acc-button-11').click()
        cy.get('#acc-panel-11').should('be.visible')

        // Perguntas - Sessão Saques no Exterior
        cy.get('#saques-no-exterior').scrollIntoView().should('be.visible')

        cy.get('#c-tab--content-5 > :nth-child(18) > a')
            .should('be.visible')
            .should('have.attr', 'href')

        // Perguntas 1
        cy.get('#acc-button-12').click()
        cy.get('#acc-panel-12').should('be.visible')

        // Perguntas 2
        cy.get('#acc-button-13').click()
        cy.get('#acc-panel-13').should('be.visible')
        cy.get(':nth-child(5) > .modalURLExterna').should('be.visible').should('have.attr', 'href')

        // Perguntas 3
        cy.get('#acc-button-14').click()
        cy.get('#acc-panel-14').should('be.visible')

        // Perguntas 4
        cy.get('#acc-button-15').click()
        cy.get('#acc-panel-15').should('be.visible')
        cy.get(':nth-child(1) > a').should('be.visible').should('have.attr', 'href')
        cy.get(':nth-child(3) > a').should('be.visible').should('have.attr', 'href')

        // Perguntas 5
        cy.get('#acc-button-16').click()
        cy.get('#acc-panel-16').should('be.visible')

       // ---------------- DEPÓSITOS ----------------

        cy.get('#transferencias-saques-e-depositos > .c-tab > .c-tab--item > :nth-child(3) > #tab3').click()
        cy.get('#c-tab--content-6').should('be.visible')
        cy.get('.lnk-blue').should('be.visible').should('have.attr', 'href')
        cy.get('#c-tab--content-6 > :nth-child(7) > a').should('be.visible').should('have.attr', 'href')

        cy.get('#transferencias-saques-e-depositos > .close').click

        })

        it('Perfil e Ajuda', ()=>{

            cy.get(':nth-child(2) > .c-tab > .c-tab--item > :nth-child(2) > #tab2').scrollIntoView().click()

            // Atualização Cadastral
            cy.get('#c-tab--content-2 > .l-flex > :nth-child(1) > .opentab > .c-icon').click()
            cy.get('#atualizacao-cadastral').should('be.visible')
            cy.get('#atualizacao-cadastral > div > .hidden-xs').should('be.visible')
            cy.get('#atualizacao-cadastral > .close').click()
            cy.get('#atualizacao-cadastral').should('not.be.visible')

            // Bia
            cy.get('#c-tab--content-2 > .l-flex > :nth-child(2) > .opentab > .c-icon').should('be.visible')

            // INSS
            cy.get('#c-tab--content-2 > .l-flex > :nth-child(3) > .opentab > .c-icon').click()

            // Portabilidade de Crédito
            cy.get('#c-tab--content-2 > .l-flex > :nth-child(4) > .opentab > .c-icon').click()
            cy.get('#portabilidade-de-credito').should('be.visible')

            // Perguntas e Respostas - Função helper para validar accordion
            const validarAccordion = (pcId) => {
                cy.get(`#${pcId}`).click() // abrir
                const collapseId = pcId.replace('pc', 'collapse')
                cy.get(`#${collapseId} > .card-body`).should('be.visible')
                cy.get(`#${pcId}`).click() // fechar com o mesmo botão
            }

            // Validar pc1 ao pc11 (abrir e fechar cada um)
            ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(num => {
                validarAccordion(`pc${num}`)
            })

            cy.get('#portabilidade-de-credito > .close').click()


            // Portabilidade de Salário
            cy.get('#c-tab--content-2 > .l-flex > :nth-child(5) > .opentab > .c-icon').click()
            cy.get('#portabilidade-de-salario').should('be.visible')

            // Já é Cliente
            cy.get('#Crédito > :nth-child(1) > .cont-header').should('be.visible')
            cy.get('#box-client > .card').should('be.visible')
            cy.get('center > p > .c-btn').click()
            cy.get('#modalIB > section').should('be.visible')
            cy.get('.mfp-close').click()

            // Vídeo Bradesco Explica
            cy.get('#Crédito > :nth-child(2) > .center').should('be.visible')

            // Não Sou Cliente
            cy.get('#no-client').click()
            cy.get('#box-no-client > .card').should('be.visible')
            cy.get('.card > :nth-child(1) > :nth-child(4) > .c-btn').should('be.visible').should('have.attr', 'href')

        })

        it.only('Compras e Beneficios', ()=>{
            cy.get(':nth-child(2) > .c-tab > .c-tab--item > :nth-child(3) > #tab3').click()

            // Shop
            cy.get('#c-tab--content-3 > .l-flex > :nth-child(1) > .opentab > .c-icon').should('be.visible')

            //Tag Pedágio
            cy.get('#c-tab--content-3 > .l-flex > :nth-child(2) > .opentab > .c-icon').click()
            cy.get('#tag-pedagio').should('be.visible')
            cy.get('#tag-pedagio > :nth-child(5) > a').should('be.visible').should('have.attr', 'href')
            cy.get('#tag-pedagio > .hidden-xs')

            cy.get('#tag-pedagio > .close').click()
        })

        it.only('Permissões', ()=>{
            cy.get('#tab4').click()
            
            // BIA Whatsap
            cy.get('#c-tab--content-4 > .l-flex > :nth-child(1) > .opentab > .c-icon').click()
            cy.get('#autorizacao-whats').should('be.visible')
            cy.get('#autorizacao-whats > img').should('be.visible')
            cy.get('#autorizacao-whats > .close').click()

            cy.get('#c-tab--content-4 > .l-flex > :nth-child(2) > a > .c-icon').should('be.visible').should('have.attr', 'href')
        })



        
    })
