/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

describe('forms', () => {
  beforeEach(() => {
    cy.visit_challenge('Elements', 'Web Tables')
  })

  it('create, update and delete an element in the table', () => {
    cy.createPerson().then((person) => {
      cy.submitPerson(person)
      cy.editPerson(person)
      cy.deletePerson(person.firstName)
    })
  })
})