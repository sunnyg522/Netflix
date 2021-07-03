class AddComputerPage{
    getName(){
        return cy.get('#name').should('be.visible');
    }
    getIntroDate(){
        return cy.get('#introduced');
    }
    getDiscontinuedDate(){
        return cy.get('#discontinued');
    }
    getCompany(){
        return cy.get('#company');
    }
    getCreateButton(){
        return cy.contains('Create this computer').should('be.visible');
    }
    getCurrentUrl(){
        return cy.url().should('include',"computers/new");
    }
    AddComputerPage(){
        cy.contains('Add a computer').should('be.visible')
    }
    getCompanyValue(company){
    var companys = {"Apple Inc.": 1,
    "Thinking Machines" : 2,
    "RCA" : 3,
    "Netronics" : 4,
    "Tandy Corporation " :5,
    "Commodore International" : 6,
    "MOS Technology": 7,
    "Micro Instrumentation and Telemetry Systems ": 8,
    "IMS Associates, Inc. ":9,
    "Digital Equipment Corporation":10,
    "Lincoln Laboratory":11,
    "Moore School of Electrical Engineering":12,
    "IBM":13,
    "Amiga Corporation ":14,
    "Canon":15,
    "Nokia":16,
    "Sony":17,
    "OQO":18,
    "NeXT":19,
    "Atari":20,
    "Acorn computer":22,
    "Timex Sinclair":23,
    "Nintendo":24,
    "Sinclair Research Ltd":25,
    "Xerox":26,
    "Hewlett-Packard":27,
    "Zemmix":28,
    "ACVS":29,
    "Sanyo":30,
    "Cray":31,
    "Evans &amp; Sutherland":32,
    "E.S.R. Inc.":33,
    "OMRON":34,
    "BBN Technologies":35,
    "Lenovo Group":36,
    "ASUS":37,
    "Amstrad":38,
    "Sun Microsystems":39,
    "Texas Instruments":40,
    "HTC Corporation":41,
    "Research In Motion":42,
    "Samsung Electronics":43}
    console.log(companys[company])
    return companys[company]
    }
    verifyNameError(){
        cy.contains('Required').should('be.visible')
    }
    getCancelButton(){
        return cy.get('a.btn')
    }
}
export default AddComputerPage