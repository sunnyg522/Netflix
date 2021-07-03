import AddComputerPage from "../../support/addComputer"
import HomePage from "../../support/homepage";
import moment from 'moment';
import EditPage from "../../support/editpage";

describe('Verify computer DB CURD operations', () => {
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

  it('Search for computer name',()=>{
    cy.addNewComputer(Cypress.env('computerName'), '', '', Cypress.env('company'), Cypress.env('companyValue'))
    cy.searchComputer(Cypress.env('computerName'))
  })

  it('Search with updated computername',()=>{
    const uniqueSeed = Date.now().toString();
    const computerName = "Automation"+uniqueSeed
    const companyName = Cypress.env('company')
    const companyValue = Cypress.env('companyValue')
    const updatedName = "UpdatedName"+uniqueSeed
    const updatedCompany = "RCA"
     cy.addNewComputer(computerName, '', '', companyName, companyValue)
     cy.updateComputer(computerName, updatedName, updatedCompany)
     cy.searchComputer(updatedName)
     cy.deleteComputer(updatedName)
  })

  it('Search with partial value of computer name', ()=>{
    cy.searchComputer('Automation')
  })

  it('Search with speical symb', ()=>{
    cy.searchComputer('!')
  })

  it('Search with numberic',()=>{
    cy.addNewComputer('123456', '', '', Cypress.env('company'), Cypress.env('companyValue'))
    cy.searchComputer('123456')
    cy.deleteComputer('123456')
  })

  it('Search delted computer name', ()=>{
    cy.deleteComputer(Cypress.env('computerName'))
    cy.checkComputer(Cypress.env('computerName'))
  })

  
})