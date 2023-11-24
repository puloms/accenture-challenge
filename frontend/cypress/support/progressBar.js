Cypress.Commands.add('createProgressBar', () => {
    return {
        startButton: '#startStopButton',
        bar: 'div div.progress-bar',
        resetButton: '#resetButton',
        limit: 25
    }
})

Cypress.Commands.add('stopProgressAt', (startButton, bar, stopAt) =>{
    cy.get(startButton).click()
    cy.get(`${bar}[aria-valuenow="${stopAt-3}"]`)
})

Cypress.Commands.add('assertBarProgress', (bar, limit) => {
    cy.get(bar).invoke('attr','aria-valuenow').then((value) => {
      expect(parseInt(value)).to.be.lessThan(limit+1)
    })
})

Cypress.Commands.add('resetBarAfterComplete', (startButton, bar, resetButton) => {
    cy.get(startButton).click().click({force: true})
    cy.get(`${bar}[aria-valuenow="100"]`, { timeout: 10000 }).then(() => {
        cy.assertBarProgress(bar, 100)
        cy.get(resetButton).click()
        cy.assertBarProgress(bar,0)
    })
})