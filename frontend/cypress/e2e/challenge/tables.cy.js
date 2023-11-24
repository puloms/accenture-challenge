/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

describe('forms', () => {
  beforeEach(() => {
    cy.visit_challenge('Elements', 'Web Tables')
  })

  it('create, update and delete an element in the table', () => {
    cy.contains('Add').click()

    var userName = faker.person.firstName()

    cy.get('#firstName').type(userName)
    cy.get('#lastName').type(faker.person.lastName())
    cy.get('#userEmail').type(faker.internet.email())
    cy.get('#age').type(Math.floor(Math.random() * (90 - 18) + 18))
    cy.get('#salary').type(Math.floor(Math.random() * (50000 - 1000) + 1000))
    cy.get('#department').type(faker.person.jobType())

    cy.contains('Submit').click()

    cy.get('#searchBox').type(userName)

    cy.get('span[title="Edit"]').click()

    cy.get('#lastName').clear().type(faker.person.lastName())
    cy.get('#userEmail').clear().type(faker.internet.email())
    cy.get('#age').clear().type(Math.floor(Math.random() * (90 - 18) + 18))
    cy.get('#salary').clear().type(Math.floor(Math.random() * (50000 - 1000) + 1000))
    cy.get('#department').clear().type(faker.person.jobType())

    cy.contains('Submit').click()

    cy.get('span[title="Delete"]').click()

    cy.get('#searchBox').clear()
  })
})
