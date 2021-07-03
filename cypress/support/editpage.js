class EditPage{
    getName(){
        return cy.get('#name').should('be.visible');
    }
    getIntroDate(){
        return null;
    }
    getDiscontinuedDate(){
        return null;
    }
    getCompany(){
        return cy.get('#company');
    }
    getSaveButton(){
        return cy.get('input[value="Save this computer"]').should('be.visible');
    }
    getCurrentUrl(){
        return cy.url();
    }
    Editpage(){
        cy.contains('Edit computer').should('be.visible')
    }
    getDeleteButton(){
        return cy.get('.topRight > .btn')
    }
    getCancelButton(){
        return cy.get('a.btn')
    }
    verifyDeleteMessage(){
        cy.contains('Computer has been deleted').should('be.visible')
    }
}
export default EditPage