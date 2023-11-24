/// <reference types="cypress" />

describe('forms', () => {
  beforeEach(() => {
    cy.visit_challenge('Forms', 'Practice Form')
  })

  it('fill forms', () => {
    cy.createStudent().then((student) => {
      cy.fillForm(student);
    })
  })
})
