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

  })

  it('Edit with valid discontinued date',()=>{
      
  })

  it('Edit with invalid intro date',()=>{
      
  })

  it('Edit with invalid discontinued date',()=>{
      
  })

  it('Edit by adding company',()=>{
      
  })

  it('Edit by adding changing company',()=>{
      
  })
  
})