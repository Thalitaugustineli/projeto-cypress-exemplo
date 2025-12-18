# 📑 Guia de Comandos Cypress

| **Comando** | **Contexto** | **Observação** | **Categoria** |
|-------------|--------------|----------------|---------------|
| .click() | Clicar no elemento | Útil para botões, links e inputs clicáveis | Click |
| .dblclick() | Duplo clique | Simula dois cliques rápidos | Click |
| .rightclick() | Clique com botão direito | Simula menu de contexto | Click |
| .filter((index, el) => el.innerText.trim() === 'Click Me') | Filtra elementos | Retorna apenas os que atendem à condição | Click |
| .eq(1) | Seleciona pelo índice | Exemplo: segundo elemento da lista | Seleção |
| .invoke('removeAttr', 'target') | Remove atributo | Usado para abrir links na mesma aba | Manipulação |
| .invoke('text') | Captura texto | Retorna o texto do elemento | Validação |
| .invoke('val', 'informe o Texto') | Define valor | Similar a copiar/colar | Input |
| .should('be.checked') | Verifica checkbox/radio | Confirma se está marcado | Validação |
| .should('be.disabled') | Verifica se está desabilitado | Útil para botões inativos | Validação |
| .should('be.visible') | Verifica visibilidade | Garante que o elemento está visível | Validação |
| .should('contain.text', 'Texto') | Valida texto parcial | Confere se contém o texto informado | Validação |
| .should('eq', 201) | Valida status code | Exemplo: resposta de API | API |
| .should('have.attr', 'href', 'https://demoqa.com') | Valida atributo | Confere se o link está correto | Validação |
| .should('have.class', 'was-validated') | Valida classe | Confere se o elemento possui a classe | Validação |
| .should('have.length.lte', 25) | Valida tamanho máximo | Exemplo: limite de caracteres | Validação |
| .should('have.text', 'Impressive') | Valida texto exato | Confere se o texto é igual | Validação |
| .should('have.value', '35') | Valida valor | Exemplo: campo numérico | Validação |
| .should('include', 'demoqa.com') | Valida URL | Confere se contém parte da URL | Validação |
| .should('match', /^Home/) | Valida regex | Confere se o texto corresponde ao padrão | Validação |
| .should('not.contain.text', 'CCCC...') | Valida ausência de texto | Confere se não contém | Validação |
| .should('not.exist') | Verifica inexistência | Garante que o elemento não existe | Validação |
| .type('João da Silva') | Digita texto | Insere informação em campo | Input |
| .type('{esc}') | Tecla especial | Simula pressionar ESC | Input |
| .type('A'.repeat(30)) | Texto repetido | Útil para testar limites | Input |
| .usuarios.forEach(usuario => { ... }) | Loop de usuários | Preenche vários campos dinamicamente | Estrutura |
| cy.contains('span.rct-title', 'React') | Seleciona por texto | Busca elemento que contém texto | Seleção |
| cy.get('.Seletor') | Seleciona por classe | Busca elementos com determinada classe | Seleção |
| cy.get('#Seletor') | Seleciona por ID | Busca elemento único | Seleção |
| cy.get('#userName').type(dados.userName) | Insere dados | Usa variável para preencher campo | Input |
| cy.get('input[name="like"]') | Seleciona por atributo name | Útil para inputs | Seleção |
| cy.intercept('GET', '**/created') | Intercepta requisição | Útil para mockar ou validar APIs | API |
| cy.url() | Captura URL atual | Usado para validações | Validação |
| cy.wait('@createdRequest') | Aguarda requisição | Espera resposta da API | API |
| Cypress._.times(10, () => { ... }) | Loop com lodash | Executa ação várias vezes | Estrutura |
| function toggleAndValidate(...) | Função customizada | Exemplo de encapsular lógica | Estrutura |

---

## 🔧 Extras úteis

| **Comando** | **Contexto** | **Categoria** |
|-------------|--------------|---------------|
| cy.viewport(1280, 720) | Define tamanho da tela | Layout |
| cy.reload() | Recarrega a página | Navegação |
| cy.clearCookies() | Limpa cookies | Sessão |
| cy.clearLocalStorage() | Limpa localStorage | Sessão |
| cy.screenshot() | Captura imagem da tela | Utilitário |
| cy.scrollTo('bottom') | Rola até o fim da página | Navegação |
| cy.wrap(obj) | Envolve objeto para usar Cypress | Estrutura |

---

## 📌 Como "filtrar" comandos
Como Markdown não tem filtro dinâmico, basta **buscar pela categoria**.  
Exemplo: se quiser todos os comandos de **Click**, procure por `Click` na tabela.
