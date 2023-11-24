import {faker} from '@faker-js/faker';

Cypress.Commands.add('createStudent', () =>{
  var birthDate = faker.date.birthdate({ min: 18, max: 80, mode: 'age' })
    return {
       firstName: faker.person.firstName(),
       lastName: faker.person.lastName(),
       email: faker.internet.email(),
       gender: ['Male', 'Female', 'Other'].sample(),
       phoneNumber: faker.phone.number('##########'),
       birthYear: birthDate.getFullYear().toString(),
       birthMonth: faker.date.month(),
       birthDay: birthDate.getDate().toString().padStart(2, '0'),
       fileName: 'cat.jpg',
       address: faker.location.streetAddress()
    }
})

Cypress.Commands.add('fillForm', (student) => {
  cy.get('#firstName').type(student.firstName)
  cy.get('#lastName').type(student.lastName)
  cy.get('#userEmail').type(student.email)
  cy.get('#genterWrapper .custom-control-input').check(student.gender, {force: true})
  cy.get('#userNumber').type(student.phoneNumber)
  cy.get('#currentAddress').type(student.address)

  cy.fillDatePicker('#dateOfBirthInput', student.birthYear, student.birthMonth, student.birthDay)
   
  cy.get('#subjectsWrapper').type('s')
  cy.get(`#react-select-2-option-${Math.floor(Math.random() * (9 - 1) + 1)}`).click() //9 is the maximum
   
  cy.get('input[type="file"]').as('fileInput').attachFile(student.fileName)
  
  cy.contains('Submit').click()

  cy.assertForm(student)
  
})

Cypress.Commands.add('fillDatePicker', (datePicker, year, month, day) => {
  cy.get(datePicker).click()
  cy.get('.react-datepicker__year-select').select(year);
  cy.get('.react-datepicker__month-select').select(month);
  cy.get(`.react-datepicker__day--0${day}`).first().click();
})

Cypress.Commands.add('assertForm', (student) => {
  cy.get('.modal-body').within(() => {
    cy.contains(`${student.firstName} ${student.lastName}`)
    cy.contains(student.email)
    cy.contains(student.gender)
    cy.contains(student.phoneNumber)
    cy.contains(student.phoneNumber)
    cy.contains(student.address)
    cy.contains(`${student.birthDay} ${student.birthMonth},${student.birthYear}`)
    cy.contains(student.fileName)
  })
  cy.contains('Close').click()
})

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)]
}