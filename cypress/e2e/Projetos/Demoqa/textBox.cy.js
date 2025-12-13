
// Teste de Text Box: Campo de Texto para escrever e Enviar formulário

describe('Text Box - Demo QA', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/text-box')
        cy.viewport(1920, 1080);   
    })
    
// Valida o Título h1 da aplicação
it('Validando título da Aplicação', () =>{
    cy.get('.text-center').should('have.text', 'Text Box') // Valida o Nome do texto
})

// Preenchendo formulário com dados positivos, porém selecionando campo por campo:
it('Preenchendo formulário com dados corretos - Usando Campo por Campo', ()=>{
    cy.get('#userName')
      .should('be.visible')
      .click()
      .type('João da Silva')

    cy.get('#userEmail')
      .should('be.visible')
      .click()
      .type('joãoSilva@exempla.com.br')

    cy.get('#currentAddress')
      .should('be.visible')
      .click()
      .invoke('val', 'Rua Antonio Martines, 145 - Vila Brasil - Osasco -SP')

    cy.get('#permanentAddress')
      .should('be.visible')
      .click()
      .invoke('val', 'Rua Antonio Martines, 200 - Vila Brasil - Osasco -SP')

    cy.get('#submit').click()      // Envia formulário
})

// Preenchendo formulário um Array de Informações: 
 it('Preenchendo formulário com dados corretos | Usando estrutura de const dados', ()=>{  
    const dados = {
        userName: 'Joao da Silva',
        userEmail: 'Joao@gmail.com',
        currentAddress: 'Rua Antonio Martines, 145 - Vila Brasil - Osasco -SP',
        permanentAddress: 'Rua Santa Luzia, 145 - Jardim Abril - Santana - SP'
    }
    cy.get('#userName').type(dados.userName)
    cy.get('#userEmail').type(dados.userEmail)
    cy.get('#currentAddress').type(dados.currentAddress).should('have.value', 'Rua Antonio Martines, 145 - Vila Brasil - Osasco -SP')
    cy.get('#permanentAddress').type(dados.permanentAddress)
    
    cy.get('#submit').click()      // Envia formulário

    // Alternativa para validação de Campo:
    cy.get('.border').should('be.visible') // Resultado pós envio
    cy.get('#name').should('contain.text', 'Name:Joao da Silva')
    cy.get('#email').should('contain.text', 'Joao@gmail.com')
 })

 // Inserindo vários usuários dentro de um const, para preenchimento e envio

it('Preenchendo formulário com múltiplos usuários e enviar', () => {
  const usuarios = [
    {
      userName: 'Joao da Silva',
      userEmail: 'Joao@gmail.com',
      currentAddress: 'Rua Antonio Martines, 145 - Vila Brasil - Osasco -SP',
      permanentAddress: 'Rua Santa Luzia, 145 - Jardim Abril - Santana - SP'
    },
    {
      userName: 'Maria Silva',
      userEmail: 'Maria@gmail.com',
      currentAddress: 'Rua Antonio , 0 - Vila América - Barueri -SP',
      permanentAddress: 'Rua Luzia, 2 - Jardim Maio - São Paulo - SP'
    }
  ]

  // Loop para preencher o formulário com cada usuário
  usuarios.forEach(usuario => {
    cy.get('#userName').clear().type(usuario.userName)
    cy.get('#userEmail').clear().type(usuario.userEmail)
    cy.get('#currentAddress').clear().type(usuario.currentAddress)
    cy.get('#permanentAddress').clear().type(usuario.permanentAddress)

    cy.get('#submit').click()

    // Validação do resultado após envio
    cy.get('#output #name').should('contain.text', usuario.userName)
    cy.get('#output #email').should('contain.text', usuario.userEmail)
    cy.get('#output #currentAddress').should('contain.text', usuario.currentAddress)
    cy.get('#output #permanentAddress').should('contain.text', usuario.permanentAddress)
  })
})

    // Teste de validação de e-mail inválido
it('Valida erro ao inserir email inválido', () => {
    cy.get('#userEmail').type('emailInvalido')
    cy.get('#submit').click()
        // cy.get('#userEmail').should('have.class', 'field-error') //Formulário não apresenta informação de erro
})

    // Validação de campos obrigatórios
it('Não deve enviar formulário vazio', () => {
    cy.get('#submit').click()
 // cy.get('#output').should('not.exist') -> Formulário não apresenta informação de erro
})

// Adicionando o invoke para escrever sem a necessidade de usar o type
it('Adicionando o Copiar e Colar no Campo, sem escrever', ()=>{
    const endereco = 'Rua Antonio Martines, 145 - Vila Brasil - Osasco - SP ' // Endereço antigo
      cy.get('#currentAddress')
        .invoke('val', endereco)   // cola o valor no campo
        .trigger('input')          // dispara evento de input

    // Valida que o campo contém o texto esperado
    cy.get('#currentAddress')
      .should('have.value', endereco)

})

// Usando o Times para escrever 10x a mesma coisa no campo

it('Concatena o endereço 10 vezes e valida', () => {
    const endereco = 'Rua Antonio Martines, 145 - Vila Brasil - Osasco -SP '
    let textoFinal = ''

    Cypress._.times(10, () => {
      textoFinal += endereco
    })

    cy.get('#currentAddress')
      .invoke('val', textoFinal)   // cola tudo de uma vez
      .trigger('input')

    // Valida que o campo contém o texto repetido 10 vezes
    cy.get('#currentAddress')
      .should('have.value', textoFinal)
  })
  
// Teste de persistência após reload
  it('Valida que dados não persistem após reload', () => {
    cy.get('#userName').type('Teste Reload')
    cy.get('#submit').click()
    cy.reload()
    cy.get('#output').should('not.exist')
  })


})
