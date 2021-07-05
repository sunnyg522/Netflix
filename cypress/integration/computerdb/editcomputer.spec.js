import AddComputerPage from "../../support/addComputer"
import HomePage from "../../support/homepage";
import moment from 'moment';
import EditPage from "../../support/editpage";

describe('Verify computer DB delete operations', () => {
  before(()=>{
    const uniqueSeed = Date.now().toString();
        var companys = ["Apple Inc.",  
        "Thinking Machines",  "RCA",  "Netronics",  
        "Tandy Corporation",  "Commodore International",  
        "MOS Technology",  
        "Micro Instrumentation and Telemetry Systems",  
        "IMS Associates, Inc.",  "Digital Equipment Corporation",  
        "Lincoln Laboratory",  "Moore School of Electrical Engineering",  
        "IBM",  "Amiga Corporation",  "Canon",  "Nokia",  "Sony",  "OQO",  
        "NeXT",  "Atari",  "Acorn computer",  "Timex Sinclair", 
        "Nintendo",  "Sinclair Research Ltd",  "Xerox",  
        "Hewlett-Packard",  "Zemmix",  "ACVS",  "Sanyo",  
        "Cray",  "Evans & Sutherland",  "E.S.R. Inc.",  
        "OMRON",  "BBN Technologies",  "Lenovo Group",  "ASUS",  
        "Amstrad",  "Sun Microsystems",  "Texas Instruments",  
        "HTC Corporation",  "Research In Motion",  "Samsung Electronics"]
        var randomValue = Math.floor(Math.random()*companys.length)
        var company = companys[randomValue];
        console.log(company)
        Cypress.env("company",company)
        Cypress.env("companyValue", randomValue+1)
        Cypress.env("computerName","Automation"+uniqueSeed)
  })
  beforeEach(() => {
    cy.visit('http://computer-database.herokuapp.com/computers')
  })

  it('Edit computer value',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('company')
    const companyValue = Cypress.env('companyValue')
    const updatedName = "UpdatedName"+uniqueSeed
    const updatedCompany = "RCA"
     cy.addNewComputer(computerName, '', '', companyName, companyValue)
     cy.updateComputer(computerName, updatedName, updatedCompany)
     cy.deleteComputer(updatedName)
  })

  it('Edit with valid intro date',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('company')
    const companyValue = Cypress.env('companyValue')
    const editPage = new EditPage();
    cy.addNewComputer(computerName, '', '', companyName, companyValue)
    cy.editComputer(computerName)
    var now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD')
    editPage.getIntroDate().click().type(dateString)
    editPage.getSaveButton().click()
    cy.deleteComputer(computerName)
  })

  it('Edit with valid discontinued date',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('company')
    const companyValue = Cypress.env('companyValue')
    const editPage = new EditPage();
    cy.addNewComputer(computerName, '', '', companyName, companyValue)
    cy.editComputer(computerName)
    var now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD')
    editPage.getDiscontinuedDate().click().type(dateString)
    editPage.getSaveButton().click()
    cy.deleteComputer(computerName)
  })

  it('Edit with invalid intro date',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('company')
    const companyValue = Cypress.env('companyValue')
    const editPage = new EditPage();
    cy.addNewComputer(computerName, '', '', companyName, companyValue)
    cy.editComputer(computerName)
    var dateString = '10-10-1999'
    editPage.getIntroDate().click().type(dateString)
    editPage.getSaveButton().click()
    cy.get('.error > label').should('be.visible')
    editPage.getCancelButton().click()
    cy.deleteComputer(computerName)
  })

  it('Edit with invalid discontinued date',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('company')
    const companyValue = Cypress.env('companyValue')
    const editPage = new EditPage();
    cy.addNewComputer(computerName, '', '', companyName, companyValue)
    cy.editComputer(computerName)
    var dateString = '10-10-1999'
    editPage.getDiscontinuedDate().click().type(dateString)
    editPage.getSaveButton().click()
    cy.get('.error > label').should('be.visible')
    editPage.getCancelButton().click()
    cy.deleteComputer(computerName)
  })

  it('Edit by adding company',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('company')
    const companyValue = Cypress.env('companyValue')
    const editPage = new EditPage();
    cy.addNewComputer(computerName, '', '', companyName, companyValue)
    cy.editComputer(computerName)
    editPage.getCompany().select('RCA')
    editPage.getSaveButton().click()
    cy.deleteComputer(computerName)
  })

  it('Edit by adding changing company',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('RCA')
    const companyValue = Cypress.env('companyValue')
    const editPage = new EditPage();
    cy.addNewComputer(computerName, '', '', companyName, companyValue)
    cy.editComputer(computerName)
    editPage.getCompany().select('Atari')
    editPage.getSaveButton().click()
    cy.deleteComputer(computerName)
  })
  
})