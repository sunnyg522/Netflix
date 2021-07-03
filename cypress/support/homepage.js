class HomePage{
    verifyAddCompputerSuccessMessage(){
        return cy.get('.alert-message').should('be.visible');
    }
    verifyDoneMessage(){
        return cy.get('strong').should('be.visible');
    }
    getAddComputerButton(){
        return  cy.get('[id="add"]').click();
    }
    getSearchBox(){
        return cy.get('#searchbox').click().should('be.visible')
    }
    getSearchSubmitButton(){
        return cy.get('#searchsubmit').should('be.visible')
    }
    getSearchedElement(){
        return cy.get('tbody > tr > :nth-child(1) > a').should('be.visible')
    }
    verifyNothingFoundLabel(){
        cy.contains('Nothing to display').should('be.visible')
    }
    verifyNoComputerFoundLabel(){
        cy.contains('No computers found').should('be.visible')
    }
    getSearchedComputerCompany(){
        return cy.get('tbody > tr > :nth-child(4)').should('be.visible')
    }
    getPrevousButton(){
        return cy.get('.prev > a')
    }
    getNextButton(){
        return cy.get('.next > a')
    }
    verifyHomePage(){
        cy.url().should('include',"computers")
        cy.contains('Computer database')
    }
}
export default HomePage