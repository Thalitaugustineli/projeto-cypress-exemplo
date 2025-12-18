// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//Ignorar erros do JS sites Demo
// Adicione em [cypress/support/e2e.js](cypress/support/e2e.js)
Cypress.on('uncaught:exception', (err) => {
  const msg = err && err.message
  if (msg && typeof msg === 'string') {
    // Ignora erros genéricos de script e o erro específico de "null.document"
    if (
      msg.includes('Script error') ||
      msg.includes('Cannot read properties of null') ||
      msg.includes("reading 'document'")
    ) {
      return false // não falha o teste
    }
  }

  // Para outros erros, deixe o Cypress falhar (retornar true/undefined)
  return true
})