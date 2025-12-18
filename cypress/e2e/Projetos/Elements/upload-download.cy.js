describe('Upload and Download', ()=>{
    beforeEach(()=>{
        cy.visit('https://demoqa.com/upload-download')
        cy.viewport(1920, 1080)
    })

    it('Validar Título e Texto', () => {
        cy.get('.text-center').should('be.visible')
    })

    it('Download - válido', () => {
        cy.request('https://demoqa.com/download') // ou a URL real do arquivo
            .then((response) => {
            expect(response.status).to.eq(200);
        });
    });

        it('Upload pelo botão', () => {
            cy.get('#uploadFile').attachFile('index.html'); // arquivo em cypress/fixtures
            cy.get('#uploadedFilePath').should('contain.text', 'index.html');
        });

        
        it.skip('Upload por arrastar', () => {
                cy.get('.dropzone').attachFile('index.html', { subjectType: 'drag-n-drop' });
                cy.get('#uploadedFilePath').should('contain.text', 'index.html');
        });

        // Não é possível validar pelo Site
        it.skip('Upload com caminho absoluto', () => {
            cy.get('#uploadFile').attachFile({
            filePath: 'C:/git/projeto-cypress-exemplo/cypress/fixtures/index.html',
            fileName: 'index.html'
            });
            cy.get('#uploadedFilePath').should('contain.text', 'index.html');

        });











}) // fim do describe