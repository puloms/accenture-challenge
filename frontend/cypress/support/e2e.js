import './commands'
import './forms'
import './tables'

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test when thre is an error in the application not in the test
  return false
})