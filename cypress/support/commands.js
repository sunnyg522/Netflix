// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'
import AddComputerPage from '../support/addComputer'
import HomePage from '../support/homepage'
import EditPage from '../support/editpage'

const addPage = new AddComputerPage()
const homePage = new HomePage()
const editPage = new EditPage()
// Command to add a new computer
Cypress.Commands.add('addNewComputer', (computerName, introDate, discoDate, company, companyValue)=>{
    if(companyValue === null){
        companyValue = Cypress.env('companyValue')
    }
    cy.get('[id="add"]').click()
    addPage.getCurrentUrl()
    addPage.getName().should('be.visible').click().type(computerName)
    // .should('have.value', addPage.getCompanyValue(company))
    if(company === !null){
        addPage.getCompany().select(company)
    }
    //.should('have.value', companyValue)
    addPage.getCreateButton().should('be.visible').click()
    //Verifying if the newly created computer DB is created
    homePage.verifyAddCompputerSuccessMessage()
    homePage.verifyDoneMessage()
})

//Command to get random company name
Cypress.Commands.add('getCompanys',(value)=>{
    
    if(!companys[22])
        var res = companys[value]
    return {value, res}
})

//Command to search new computer
Cypress.Commands.add('searchComputer',(computerName)=>{
    cy.url().should('include',"computers")
    cy.visit('http://computer-database.herokuapp.com/computers')
    homePage.getSearchBox().click().should('be.visible').type(computerName)
    homePage.getSearchSubmitButton().should('be.visible').click()
    cy.get('tbody > tr > :nth-child(1) > a')
    .should('be.visible')
    cy.contains(computerName).should('be.visible')
})

//Command to Edit computer
Cypress.Commands.add('updateComputer',(computerName,updatedName, updatedCompany)=>{
    cy.searchComputer(computerName)
    homePage.getSearchedElement().click()
    editPage.getName().click().clear().type(updatedName)
    editPage.getCompany().select(updatedCompany)
    editPage.getSaveButton().click()
})

//Search for computer
Cypress.Commands.add('checkComputer',(computerName)=>{
    cy.url().should('include',"computers")
    cy.visit('http://computer-database.herokuapp.com/computers')
    homePage.getSearchBox().click().should('be.visible').type(computerName)
    homePage.getSearchSubmitButton().should('be.visible').click()
    cy.contains('Nothing to display').should('be.visible')
    cy.contains('No computers found').should('be.visible')
})

//Command to delete new compuater
Cypress.Commands.add('deleteComputer',(computerName)=>{
    cy.searchComputer(computerName)
    homePage.getSearchedElement()
    .should('be.visible')
    .click()
    editPage.getName()
    .should('be.visible')
    .should('have.value',computerName)
    editPage.getDeleteButton().click()
    editPage.verifyDeleteMessage()
})
// //Sort the feilds by values
// Cypress.Commands.add('sortFileds',(fieldsName)=>{
    
// })

// //Command to verify collabrator got added
// Cypress.Commands.add('verifyCollabrator',(email)=>{
      
// })

// //Command to add collabrator during onboarding process
// Cypress.Commands.add('addCollabratorDuringOnBoarding', (coworker1)=>{
    
// })
