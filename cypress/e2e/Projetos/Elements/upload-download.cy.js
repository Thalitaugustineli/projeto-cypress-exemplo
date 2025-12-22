describe('Upload and Download', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/upload-download');
    cy.viewport(1920, 1080);
  });

  it('Validar Título e Texto da página', () => {
    cy.get('.text-center')
      .should('be.visible')
      .and('contain.text', 'Upload and Download');
  });

  it('Download - válido', () => {
    // Faz requisição direta ao endpoint de download
    cy.request('https://demoqa.com/download')
      .then((response) => {
        expect(response.status).to.eq(200); // status OK
        expect(response.headers['content-type']).to.include('application'); // valida tipo de arquivo
      });
  });

  it('Upload pelo botão', () => {
    // Upload de arquivo presente em cypress/fixtures
    cy.get('#uploadFile').attachFile('index.html');
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', 'index.html');
  });

  it.skip('Upload por arrastar', () => {
    cy.get('.dropzone').attachFile('index.html', { subjectType: 'drag-n-drop' });
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', 'index.html');
  });

  // Não é possível validar pelo site (caminho absoluto)
  it.skip('Upload com caminho absoluto', () => {
    cy.get('#uploadFile').attachFile({
      filePath: 'C:/git/projeto-cypress-exemplo/cypress/fixtures/index.html',
      fileName: 'index.html'
    });
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', 'index.html');
  });

  it('Validação combinada: Upload e Download', () => {
    // Download
    cy.request('https://demoqa.com/download')
      .then((response) => {
        expect(response.status).to.eq(200);
      });

    // Upload
    cy.get('#uploadFile').attachFile('index.html');
    cy.get('#uploadedFilePath')
      .should('be.visible')
      .and('contain.text', 'index.html');
  });
});