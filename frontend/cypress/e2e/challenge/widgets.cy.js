/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

describe('forms', () => {
  beforeEach(() => {
    cy.visit_challenge('Widgets', 'Progress Bar')
  })

  it('uses the progress bar', () => {
    cy.createProgressBar().then((progressBar) => {
      var startButton = progressBar.startButton
      var bar = progressBar.bar
      var limit = progressBar.limit
      cy.stopProgressAt(startButton, bar, limit)
      cy.assertBarProgress(bar, limit)
      cy.resetBarAfterComplete(startButton, bar, progressBar.resetButton)
    })
  })
})
