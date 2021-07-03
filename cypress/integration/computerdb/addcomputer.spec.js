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
        // var companys = cy.getCompanys()
        var randomValue = Math.floor(Math.random()*companys.length)
        var company = companys[randomValue];
        // var company = cy.getCompany(randomValue)
        console.log(company)
        Cypress.env("company",company)
        Cypress.env("companyValue", randomValue+1)
        Cypress.env("computerName","Automation"+uniqueSeed)
  })
  beforeEach(() => {
    cy.visit('http://computer-database.herokuapp.com/computers')
  })

  it('Add new computer name', () => {
    cy.addNewComputer(Cypress.env('computerName'), '', '', Cypress.env('company'), Cypress.env('companyValue'))
  })

  it('Search for computer name',()=>{
    cy.searchComputer(Cypress.env('computerName'))
  })

  it('update computer value',()=>{
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

  it('Delete computer name', ()=>{
    cy.deleteComputer(Cypress.env('computerName'))
  })

  it('Verify user creation without company name',()=>{
    cy.addNewComputer(Cypress.env('computerName'), '', '', null, null)
    cy.deleteComputer(Cypress.env('computerName'))
  })

  it('Verify search with mutliple values',()=>{
    cy.searchComputer('ACE')
    cy.contains('6 computers found').should('be.visible')
  })
  it('Verify Mandatory values for adding computer',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getCreateButton().click()
    addPage.verifyNameError()
  })

  it('Verify valid date for adding computer',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getName().type(Cypress.env('computerName'))
    var now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD') 
    addPage.getIntroDate().click().type(dateString)
    addPage.getDiscontinuedDate().click().type(dateString)
    addPage.getCreateButton().click()
    //cleaning up created user
    cy.deleteComputer(Cypress.env('computerName'))
  })

  it('Create computer record with intro date and no discountinued date',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getName().type(Cypress.env('computerName'))
    var now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD') 
    addPage.getIntroDate().click().type(dateString)
    addPage.getCreateButton().click()
    //cleaning up created user
    cy.deleteComputer(Cypress.env('computerName'))
  })

  it('Create computer record with discountinued date and no intro date',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getName().type(Cypress.env('computerName'))
    var now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD') 
    addPage.getDiscontinuedDate().click().type(dateString)
    addPage.getCreateButton().click()
    //cleaning up created user
    cy.deleteComputer(Cypress.env('computerName'))
  })

  it('Create computer record without company, intro or discontinued date',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getName().type(Cypress.env('computerName'))
    addPage.getCreateButton().click()
    //cleaning up created user
    cy.deleteComputer(Cypress.env('computerName'))
  })

  it('Create computer record with company, intro and discontinued date',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getName().type(Cypress.env('computerName'))
    var now = new Date();
    var dateString = moment(now).format('YYYY-MM-DD') 
    addPage.getIntroDate().click().type(dateString)
    addPage.getDiscontinuedDate().click().type(dateString)
    addPage.getCompany().select(Cypress.env('company'))
    addPage.getCreateButton().click()
    cy.searchComputer(Cypress.env('computerName'))
    homePage.getSearchedComputerCompany()
    //cleaning up created user
    cy.deleteComputer(Cypress.env('computerName'))
  })

  it('Validate pagenation using next and previous',()=>{
    const homePage = new HomePage()
    homePage.getNextButton().click()
    cy.contains('Displaying 11 to 20').should('be.visible')
    homePage.getPrevousButton().click()
    cy.contains('Displaying 1 to 10 ').should('be.visible')
  })

  it('Validate cancel buttong on add new computer page',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getCancelButton().should('be.visible').click()
    homePage.verifyHomePage()
  })

  it('Validate cancel button on edit computer page',()=>{
    const homePage = new HomePage()
    const editPage = new EditPage()
    cy.addNewComputer(Cypress.env('computerName'), '', '', Cypress.env('company'), Cypress.env('companyValue'))
    cy.searchComputer(Cypress.env('computerName'))
    homePage.getSearchedElement().click()
    editPage.getCancelButton().click()
    homePage.verifyHomePage()
  })

  it('Verify invalid intro date error in add page',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getName().type(Cypress.env('computerName'))
    var dateString = '10-10-1999'
    addPage.getIntroDate().click().type(dateString)
    addPage.getCompany().select(Cypress.env('company'))
    addPage.getCreateButton().click()
    cy.get('.error > label').should('be.visible')
    addPage.getCancelButton().click()
  })

  it('Verify invalid discontinued date error in add page',()=>{
    const homePage = new HomePage()
    const addPage = new AddComputerPage()
    homePage.getAddComputerButton()
    addPage.getName().type(Cypress.env('computerName'))
    var dateString = '10-10-1999'
    addPage.getDiscontinuedDate().click().type(dateString)
    addPage.getCompany().select(Cypress.env('company'))
    addPage.getCreateButton().click()
    cy.get('.error > label').should('be.visible')
    addPage.getCancelButton().click()
  })

  it('Add user with FirstName and LastName with space sepration',()=>{
    cy.addNewComputer("FristName Lastname", '', '', Cypress.env('company'), Cypress.env('companyValue'))
    cy.deleteComputer("FristName Lastname")
  })

  it('Add user with special char',()=>{
    cy.addNewComputer("Name!", '', '', Cypress.env('company'), Cypress.env('companyValue'))
    cy.deleteComputer("Name!")
  })
})