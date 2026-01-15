# Projeto Cypress Exemplo

Este repositório contém um projeto de **testes automatizados com Cypress**.  
O objetivo é demonstrar como configurar, escrever e executar testes de ponta a ponta (E2E) em aplicações web utilizando o Cypress.

---

## 🚀 Tecnologias utilizadas
- **[Cypress](https://www.cypress.io/)** – Framework de testes E2E
- **JavaScript** – Linguagem principal
- **Node.js** – Ambiente de execução

---

## 📂 Estrutura do projeto
```
projeto-cypress-exemplo/
├── cypress/              # Pasta com os testes e suporte
├── node_modules/         # Dependências instaladas
├── cypress.config.js     # Configuração principal do Cypress
├── package.json          # Dependências e scripts
└── package-lock.json
```

---

## ⚙️ Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/Thalitaugustineli/projeto-cypress-exemplo.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd projeto-cypress-exemplo
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

---

## ▶️ Como executar os testes

- **Abrir o Test Runner (modo interativo):**
  ```bash
  npx cypress open
  ```

- **Executar os testes em modo headless (linha de comando):**
  ```bash
  npx cypress run
  ```

---

## 🧪 Exemplos de testes

Dentro da pasta `cypress/e2e` você pode criar arquivos `.cy.js` com seus cenários de teste.  
Exemplo simples:

```javascript
describe('Página inicial', () => {
  it('Deve carregar corretamente', () => {
    cy.visit('https://exemplo.com');
    cy.contains('Bem-vindo');
  });
});
```

---

## 🤝 Contribuição
Contribuições são bem-vindas!  
Para colaborar:
1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push (`git push origin minha-feature`)
5. Abra um Pull Request

