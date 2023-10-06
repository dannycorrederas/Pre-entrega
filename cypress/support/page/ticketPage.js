export class TicketPage {
    constructor(){
        this.nameText = '#name';
        this.creditCardText = '#creditCard';
        this.totalPriceText = '#totalPrice';
    }

    verifyNameText(namePerson, lastNamePerson){
        cy.contains(this.nameText,`${namePerson} ${lastNamePerson} has succesfully purchased the following items`, {timeout: 40000});
    };
    verifyProductNameText(product1, product2){
        cy.get(this.nameText).siblings('p').contains(`${product1}`);
        cy.get(this.nameText).siblings('p').contains(`${product2}`);
    };
    verifyCreditCardText(cardNumber){
        cy.contains(this.creditCardText, `${cardNumber}`);
    };
    verifyTotalPriceText(total){
        cy.contains(this.totalPriceText,`You have spent $${total}`);
    };
}