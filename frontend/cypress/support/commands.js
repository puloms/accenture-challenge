import 'cypress-file-upload'
import 'cypress-drag-drop'

Cypress.Commands.add('visit_challenge', (section, subSection) => {
  cy.visit('https://demoqa.com/')
  cy.contains(section).click()
  cy.contains(subSection).click()
})