/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

describe('forms', () => {
  beforeEach(() => {
    cy.visit_challenge('Widgets', 'Progress Bar')
  })

  it('uses the progress bar', () => {
    cy.get('#startStopButton').click()
    cy.get('div div.progress-bar[aria-valuenow="22"]')
    cy.get('#startStopButton').click()

    cy.get('div div.progress-bar').invoke('attr','aria-valuenow').then((value) => {
      expect(parseInt(value)).to.be.lessThan(26)
    })

    cy.get('#startStopButton').click()

    cy.get('div div.progress-bar[aria-valuenow="100"]', { timeout: 10000 }).then(() => {
      cy.get('#resetButton').click()
    })
  })
})
