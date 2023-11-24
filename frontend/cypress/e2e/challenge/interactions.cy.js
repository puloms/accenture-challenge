/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

describe('forms', () => {
  beforeEach(() => {
    cy.visit_challenge('Interactions', 'Sortable')
  })

  it('Sort values with drag and drop', () => {
    cy.contains('Six').drag('list-group-item list-group-item-action(1)')
  })
})
