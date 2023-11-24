import {faker} from '@faker-js/faker';

Cypress.Commands.add('createPerson', () =>{
    return {
       firstName: faker.person.firstName(),
       lastName: faker.person.lastName(),
       email: faker.internet.email(),
       age: Math.floor(Math.random() * (90 - 18) + 18),
       salary: Math.floor(Math.random() * (50000 - 1000) + 1000),
       department: faker.person.jobType()
    }
})

Cypress.Commands.add('submitPerson', (person) =>{
    cy.contains('Add').click()
      
    cy.get('#firstName').type(person.firstName)
    cy.get('#lastName').type(person.lastName)
    cy.get('#userEmail').type(person.email)
    cy.get('#age').type(person.age)
    cy.get('#salary').type(person.salary)
    cy.get('#department').type(person.department)

    cy.contains('Submit').click()

    cy.assertPerson('.ReactTable', person, person.age, person.salary, person.department)
})

Cypress.Commands.add('editPerson', (person) => {
    cy.get('#searchBox').type(person.firstName)

    cy.get('span[title="Edit"]').click()

    var age = Math.floor(Math.random() * (90 - person.age) + person.age)
    var salary = Math.floor(Math.random() * (50000 - person.salary) + person.salary)
    var department = faker.person.jobType()

    cy.get('#age').clear().type(age)
    cy.get('#salary').clear().type(salary)
    cy.get('#department').clear().type(department)

    cy.contains('Submit').click()
    
    cy.get('#searchBox').clear()

    cy.assertPerson('.ReactTable', person, age, salary, department)
})

Cypress.Commands.add('deletePerson', (firstName) => {
    cy.get('#searchBox').clear().type(firstName)
    
    cy.get('span[title="Delete"]').click()

    cy.get('#searchBox').clear()
})

Cypress.Commands.add('assertPerson', (table, person, age, salary, department) => {
    cy.get(table).within(() => {
        cy.contains(person.firstName)
        cy.contains(person.lastName)
        cy.contains(person.email)
        cy.contains(age)
        cy.contains(salary)
        cy.contains(department)
    })
})