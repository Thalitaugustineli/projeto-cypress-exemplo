describe('Bradesco Principal', () => {
  beforeEach(() => {
    cy.visit('https://banco.bradesco/html/principal/index.shtm');
    cy.viewport(1920, 1080);
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
    cy.get(`${posicao} > .sc-cbedb7e5-0 > .sc-cbedb7e5-3`).trigger('mouseover');
  }

  function selecionarCidade(nome) {
    cy.get('.sc-ce30fb95-2').click();
    cy.contains(nome).click();
  }

  // Testes
  it('Validar Header', () => {
    cy.get('.header').should('be.visible');
    cy.get('.header__form').should('be.visible');

    cy.get('#AGN').type('ABC').should('have.value', '');
    cy.get('#CTA').type('ABC').should('have.value', '');
    cy.get('#DIGCTA').type('A').should('have.value', '');

    cy.get('#AGN').clear().type('1234').should('have.value', '1234');
    cy.get('#CTA').clear().type('123456').should('have.value', '123456');
    cy.get('#DIGCTA').clear().type('2').should('have.value', '2');

    cy.get('#remember').click().should('be.checked');

    cy.get('button.header__submit-button')
      .should('exist')
      .and('contain.text', 'OK')
      .and('have.attr', 'type', 'submit')
      .and('have.attr', 'aria-label', 'Enviar formulário');

    cy.get('a.header__help')
      .should('exist')
      .and('contain.text', 'Como usar')
      .and('have.attr', 'href', 'https://banco.bradesco/como-usar')
      .and('have.attr', 'aria-label', 'Como usar');

    cy.get('a.header__help img')
      .should('have.attr', 'src')
      .and('include', 'arrow-right.svg');

    cy.get('.accessibility-menu__toggle').click();
    cy.get('#acessib-menu').should('be.visible');
    cy.get('.accessibility-menu__close').click();
    cy.get('#acessib-menu').should('not.be.visible');

    cy.get('.navLogo a')
      .should('have.attr', 'href', 'https://banco.bradesco/html/principal/index.shtm');

    cy.get('[href="/html/principal/index.shtm#"]').should('be.visible');
    cy.get('[title="Pra sua EMPRESA"]').should('be.visible');

    cy.get('.MainNavigation_nav__qOI_s > ul > :nth-child(1) > a')
      .should('have.attr', 'href', '/html/principal/cartoes');
    cy.get('.MainNavigation_nav__qOI_s > ul > :nth-child(2) > a')
      .should('have.attr', 'href', '/html/principal/cartoes/servicoseseguros');

    cy.get('#search_textobusca').click();
    cy.get('.search_info-content').should('be.visible');
    cy.get('.search_input-search-container input')
      .type('Empréstimos')
      .should('have.value', 'Empréstimos');
    cy.get('#search_fechar-modal-busca').click();
  });

  it('Validação Benefícios Bradesco Principal', () => {
    cy.get('.sc-96a28f04-0').should('be.visible');

    validarSecao('atendimento-especializado', 'Atendimento especializado no Brasil e no exterior, comsoluções patrimoniais personalizadas.');
    validarSecao('gerente-de-relacionamento', 'Gerente de relacionamento');
    validarSecao('investimentos', 'Investimentos');
    validarSecao('programa-de-benef-cios', 'Programa de benefícios');
    validarSecao('conta-internacional', 'Conta internacional');
  });

  it('Validar Cartões Bradesco Principal', () => {
    cy.get('.bp-main-container > :nth-child(8)').scrollIntoView();
    cy.get('.Text_container__ZxZSK > h2').should('contain.text', 'Cartões Bradesco Principal');
    cy.get('.Text_container__ZxZSK > p').should('contain.text', 'Seleção de cartões de crédito para transformar objetivos em conquistas.');

    const selectors = {
      principal: 'a[title="cartão bradesco principal"]',
      aeternum: 'a[title="cartão visa aeternum"]',
      platinum: 'a[title="the platinum card"]'
    };

    Object.entries(selectors).forEach(([nome, seletor]) => {
      cy.get(seletor).should('be.visible');
    });
  });

  it('Validação de Unidades Bradesco Principal', () => {
    cy.get('.sc-d13a9d09-0').scrollIntoView().should('be.visible');
    cy.get('.sc-d13a9d09-15').should('be.visible'); // frame youtube
    cy.get('.sc-d13a9d09-17').should('be.visible');

    selecionarCidade('São Paulo');
    selecionarCidade('Recife');

    cy.get('.sc-d13a9d09-13').click();
    cy.get('.sc-4be4ff3b-0').should('be.visible');

    cy.get('.brad-btn').should('be.visible');
  });

  it('Soluções Bradesco', () => {
    cy.get('.sc-f99ebcb2-0').scrollIntoView().should('be.visible');
    cy.get('.sc-f99ebcb2-3').should('contain.text', 'Ainda mais soluções para você');
    cy.get('.sc-5df76474-0').should('be.visible');

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