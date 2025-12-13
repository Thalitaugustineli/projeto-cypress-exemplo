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
  if (err && typeof err.message === 'string' && err.message.includes('Script error')) {
    return false // não falha o teste
  }
  // Para outros erros, deixe o Cypress falhar (retornar true/undefined)
  return true
})