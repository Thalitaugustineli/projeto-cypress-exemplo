describe(' Web Tables ', ()=>{
    beforeEach (()=>{
        cy.visit('https://demoqa.com/webtables')
        cy.viewport(1920,1080)
})

it('Validar Título e Texto', () => {
    cy.get('.text-center').should('be.visible')
        
    // Add + Buscas
    cy.get('.col-md-7').should('be.visible')
    cy.get('#searchBox').should('be.visible')

    // tabela
    cy.get('.ReactTable').should('be.visible')
})

// CRUD completo (Create, Read, Update, Delete).


it('CRUD completo (Create, Read, Update, Delete)', ()=>{
    
    // CREAT - Criando um Novo Usuário

    cy.get('#addNewRecordButton').click()
    cy.get('.modal-header').should('be.visible')  // Abrindo modal de Adição de usuário

    const usuario = {

        firstName: 'Joao',
        lastName: 'Silva',
        userEmail: 'exemplo@teste.com.br',
        age: '31',
        salary: '3000',
        department: 'TI'
    }

    // Preenchimento de Dados
    cy.get('#firstName').type(usuario.firstName)
    cy.get('#lastName').type(usuario.lastName)
    cy.get('#userEmail').type(usuario.userEmail)
    cy.get('#age').type(usuario.age)
    cy.get('#salary').type(usuario.salary)
    cy.get('#department').type(usuario.department)


    cy.get('#submit').click() // Enviar formulário

    // READ - Lendo informações de input de usuário
        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
        .should('contain.text', usuario.firstName);

        cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
        .should('contain.text', usuario.lastName);

        cy.get(':nth-child(4) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]')
        .should('contain.text', usuario.age);

        cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
        .should('contain.text', usuario.userEmail);

        cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
        .should('contain.text', usuario.salary);

        cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
        .should('contain.text', usuario.department);

    // UPDATE - Editando dados do Usuário
    cy.get('#edit-record-4').click()

        const usuarioUpdate = {

        firstName: 'Joao Julio',
        lastName: 'Silva Oliveira',
        userEmail: 'exemplo2@teste.com.br',
        age: '35',
        salary: '4500',
        department: 'TI - Novo Departamento'
    }
    
    // Editando informações de novo Usuário
    cy.get('#firstName').clear().type(usuarioUpdate.firstName)
    cy.get('#lastName').clear().type(usuarioUpdate.lastName)
    cy.get('#userEmail').clear().type(usuarioUpdate.userEmail)
    cy.get('#age').clear().type(usuarioUpdate.age)
    cy.get('#salary').clear().type(usuarioUpdate.salary)
    cy.get('#department').clear().type(usuarioUpdate.department)

    cy.get('#submit').click() // Enviar formulário


        // READ - Lendo informações de input de usuário
        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
            .should('contain.text', usuarioUpdate.firstName)
        cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
            .should('contain.text', usuarioUpdate.lastName)
        cy.get(':nth-child(4) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]')
            .should('contain.text', usuarioUpdate.age)    
        cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
            .should('contain.text', usuarioUpdate.userEmail)
        cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
            .should('contain.text', usuarioUpdate.salary) 
        cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
            .should('contain.text', usuarioUpdate.department)

    // Delete
    cy.get('#delete-record-4').click()

    // Valida que o nome não aparece mais
    cy.get('.rt-tbody').should('not.contain.text', 'Joao Julio')
})

    it(' Busca e filtros', ()=> {
        // Nome que existe
        cy.get('#searchBox').type('Kierra')
        
        // Valida que primeira opção é 
        cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
            .should('contain.text', 'Kierra')

        // Nome que não existe>
        cy.get('#searchBox').clear().type('Time')
        cy.get('.rt-noData').should('contain.text', 'No rows found')

    })

    it('Validando abertura e fechamento do Modal', ()=>{
        // abrindo modal
        cy.get('#addNewRecordButton').click()
        cy.get('.modal-header').should('be.visible')  // Abrindo modal 

        // fechando modal
        cy.get('.close').click()

        // abrindo modal
        cy.get('#addNewRecordButton').click()

        // fechando modal com esc
         cy.get('.modal-header').type('{esc}')       
    })

    it('Submetendo o formulário com dados vazios', ()=>{
        // abrindo modal
        cy.get('#addNewRecordButton').click()
        cy.get('.modal-header').should('be.visible')  // Abrindo modal
        cy.get('#submit').click() // Enviar formulário

        cy.get('#userForm').should('have.class', 'was-validated') // Valida que dados está incorreto

    })

    it('Validando Campos do Formulário',()=> {
        
        // abrindo modal
        cy.get('#addNewRecordButton').click()
        cy.get('.modal-header').should('be.visible')  // Abrindo modal

        //Somente letras – firstName e lastName
        // Preenche com letras válidas
        cy.get('#firstName').type('Joao Julio').should('have.value', 'Joao Julio')
        cy.get('#lastName').type('Silva Oliveira').should('have.value', 'Silva Oliveira')
        
        // Testa inválido (números)
        cy.get('#firstName').clear().type('123') // .should('not.have.value', '123') -> O site demoQA aceita números no Nome
        cy.get('#lastName').clear().type('123') // .should('not.have.value', '123') -> O site demoQA aceita números no Nome

        // Preenche com email válido
        cy.get('#userEmail').type('exemplo2@teste.com.br').should('have.value', 'exemplo2@teste.com.br')

        // Testa inválido (sem @)
        cy.get('#userEmail').clear().type('emailinvalido').should('have.value', 'emailinvalido')
        cy.get('#submit').click()
        cy.get('#userForm').should('have.class', 'was-validated')
        
        //Somente números inteiros – age
        // Preenche com número válido
        cy.get('#age').type('35').should('have.value', '35')
        
        // Testa inválido (letras)
        cy.get('#age').clear().type('abc')
        cy.get('#submit').click()
       cy.get('#userForm').should('have.class', 'was-validated')

        // Testa inválido (número negativo)
        cy.get('#age').clear().type('-35')
        cy.get('#submit').click()
       cy.get('#userForm').should('have.class', 'was-validated')

        
        //Números inteiros e decimais – salary

        // Preenche com número válido
        cy.get('#salary').type('4500').should('have.value', '4500')

        // Testa inválido (texto)
        cy.get('#salary').clear().type('quatro mil')

        cy.get('#userForm').should('have.class', 'was-validated')

        // Letras e números – department

        // Preenche com letras e números válidos
        cy.get('#department').type('@@@@').should('have.value', '@@@@')

        // Testa inválido (caracteres especiais não permitidos, se houver regra)
       //  cy.get('#department').clear().type('@@@').should('not.have.value', '@@@') -> Site Demo QA aceita 

    })

    it('Valida que todos os Campos aceitas o Max', () => {

        // Name
        cy.get('#addNewRecordButton').click()
        cy.get('#firstName').type('A'.repeat(30))
        cy.get('#submit').click()

        // Valida que só os 25 primeiros foram aceitos
        cy.get('#firstName').invoke('val').should('have.length.lte', 25)

        // Valida que o registro não foi salvo
        cy.get('.rt-tbody').should('not.contain.text', 'AAAAAAAAAAAAAAAAAAAAAAAAA')

        // LastName
        cy.get('#lastName').type('A'.repeat(30))
        cy.get('#submit').click()

        // Valida que só os 25 primeiros foram aceitos
        cy.get('#lastName').invoke('val').should('have.length.lte', 25)

        // Valida que o registro não foi salvo
        cy.get('.rt-tbody').should('not.contain.text', 'BBBBBBBBBBBBBBBBBBBBBBB')

        // Departamento 
        cy.get('#department').type('A'.repeat(30))
        cy.get('#submit').click()

        // Valida que só os 25 primeiros foram aceitos
        cy.get('#department').invoke('val').should('have.length.lte', 25)

        // Valida que o registro não foi salvo
        cy.get('.rt-tbody').should('not.contain.text', 'CCCCCCCCCCCCCCCCCCCCCCC')

        // NÚMERICOS -> Age
         cy.get('#age').type('2'.repeat(3))
        cy.get('#submit').click()

        // Valida que só os 25 primeiros foram aceitos
        cy.get('#age').invoke('val').should('have.length.lte', 2)

        // Valida que o registro não foi salvo
        cy.get('.rt-tbody').should('not.contain.text', '133')

        // Salary
        cy.get('#salary').type('3'.repeat(10))
        cy.get('#submit').click()

        // Valida que só os 25 primeiros foram aceitos
        cy.get('#salary').invoke('val').should('have.length.lte', 11)

        // Valida que o registro não foi salvo
        cy.get('.rt-tbody').should('not.contain.text', '123456789011')
    
        })
}) // fim do decribe