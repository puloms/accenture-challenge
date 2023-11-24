/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

describe('alerts, frames and windows', () => {
  beforeEach(() => {
    cy.visit_challenge('Alerts, Frame & Windows', 'New Window')
  })

  it('Open a new window', () => {
    cy.contains('New Window').click()
    // Cypress does not support multiple windows
  })
})
