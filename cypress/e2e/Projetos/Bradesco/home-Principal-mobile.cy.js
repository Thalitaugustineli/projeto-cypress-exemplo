describe('Bradesco Principal', () => {
  beforeEach(() => {
    cy.visit('https://banco.bradesco/html/principal/index.shtm');
    cy.viewport('iphone-xr');
    cy.get('#aceitarCookies').click();
  });

  // Funções utilitárias
  function validarSecao(id, tituloEsperado) {
    cy.get(`#${id}`).scrollIntoView().should('be.visible');
    cy.get(`#${id} h2`).should('contain.text', tituloEsperado);
    cy.get(`#${id} picture img`).should('be.visible');
  }

  function validarCard(posicao, textoEsperado) {
    cy.get(`${posicao} .sc-cbedb7e5-0`).should('be.visible');
    cy.get(`${posicao} .sc-cbedb7e5-3`).should('contain.text', textoEsperado);
  }

  function selecionarCidade(nome) {
    cy.get('.sc-ce30fb95-2').click();
    cy.contains(nome).click();
  }

  // Testes
  it('Validar Header', () => {
    cy.get('.header__mobile').should('be.visible');
    
    cy.get('.header__mobile-button')
      .should('exist')
      .and('contain.text', 'Ok')
      .and('have.attr', 'href')

    cy.get('#mainHeader').should('be.visible')

    cy.get('.navLogo > a > img')
      .should('be.visible');


    cy.get('#search_textobuscamobile').click();
    cy.get('.search_info-content').should('be.visible');
    cy.get('.search_input-search-container input')
      .type('Empréstimos')
      .should('have.value', 'Empréstimos');
    cy.get('#search_fechar-modal-busca').click();

    // Para você
    cy.get('.item-0').should('be.visible').click()
    cy.get('.segments-mobile-content-0').should('be.visible')

    // Para sua Empresa
    cy.get('.item-1').should('be.visible').click()
    cy.get('.segments-mobile-content-1').should('be.visible')

  });

  it('Validação Benefícios Bradesco Principal', () => {
    cy.get('.sc-96a28f04-0').should('be.visible');

    validarSecao('atendimento-especializado', 'Atendimento especializado no Brasil e no exterior, comsoluções patrimoniais personalizadas.');
    validarSecao('gerente-de-relacionamento', 'Gerente de relacionamento');
    validarSecao('investimentos', 'Investimentos');
    validarSecao('programa-de-benef-cios', 'Programa de benefícios');
    validarSecao('conta-internacional', 'Conta internacional');
  });

it('Carrossel: Cartões Bradesco Principal', () => {
  // Seção
  cy.get('.bp-main-container > :nth-child(8)').scrollIntoView();
  cy.get('.Text_container__ZxZSK > h2')
    .should('contain.text', 'Cartões Bradesco Principal');
  cy.get('.Text_container__ZxZSK > p')
    .should('contain.text', 'Seleção de cartões de crédito para transformar objetivos em conquistas.');

  // Carrossel visível
  cy.get('#liquid-carousel-_r0_').should('be.visible');

  // Função auxiliar para validar slide
  const validarSlide = () => {
    cy.get('.swiper-slide-active .PrincipalCards_card-wrapper__TkRD8 .brad-flex')
      .should('be.visible')
      .within(() => {
        cy.get('.PrincipalCards_image-container__e__TX img').should('be.visible');
        cy.get('.brad-font-title-xl').should('not.be.empty');
        cy.get('.PrincipalCards_text-content__aK_CY ul li').first().should('be.visible');
        cy.get('.brad-font-paragraph-md .brad-text-link').should('be.visible');
       
      });
  };

  // Slide 1
  validarSlide();

  // Slide 2
  cy.get('[aria-label="Ir até o slide 2"]').click();
  validarSlide();

  // Slide 3
  cy.get('[aria-label="Ir até o slide 3"]').click();
  validarSlide();

   cy.get('.brad-btn').scrollIntoView().should('be.visible');
});

  it('Validação de Unidades Bradesco Principal', () => {
    cy.get('.sc-d13a9d09-0').scrollIntoView().should('be.visible');
    cy.get('.sc-d13a9d09-15').should('be.visible'); // frame youtube

    selecionarCidade('São Paulo');
    selecionarCidade('Recife');

    cy.get('.sc-d13a9d09-13').click();
    cy.get('.sc-4be4ff3b-0').should('be.visible');
  });

  it.only('Soluções Bradesco', () => {
    cy.get('.sc-f99ebcb2-0').scrollIntoView().should('be.visible');
    cy.get('.sc-f99ebcb2-3').should('contain.text', 'Ainda mais soluções para você');
    cy.get('.sc-5df76474-0').should('be.visible');

      // Scroll para a direita
    cy.get('.sc-5df76474-0').scrollTo('right', { ensureScrollable: false });


    validarCard(':nth-child(1)', 'Crédito');
    validarCard(':nth-child(2)', 'Grupo familiar');
    validarCard(':nth-child(3)', 'Proteção familiar e patrimonial');
    validarCard(':nth-child(4)', 'Outras soluções');

    cy.get('.sc-f99ebcb2-4 > strong').should('be.visible');
    cy.get('small > p').should('be.visible');
  });

  it('Validação do "Quero saber mais"', () => {
    cy.get('#gerente-de-relacionamento').scrollIntoView();
    cy.get('.fixed-bar').should('be.visible').click();
    cy.get('.ContactModal_modal__cQanC').should('be.visible');

    const usuario = {
      name: 'Nome de Testes',
      email: 'exemplo@test.com',
      phone: '1495488999',
      cpf: '123.405.105-52'
    };

    cy.get('#name').type(usuario.name);
    cy.get('#email').type(usuario.email);
    cy.get('#phone').type(usuario.phone);
    cy.get('#cpf').type(usuario.cpf);

    cy.get('.ContactModal_closeButton__5UbdQ').click();
  });

  it('Footer', () => {
    cy.get('.footer__uteis').scrollIntoView().should('be.visible');
    cy.get('#info-2').should('be.visible');
    cy.get(':nth-child(1) > .footer__toggle').click();
    cy.get('#info-1').should('be.visible');
    cy.get('.footer__gradient').should('be.visible');
  });
});