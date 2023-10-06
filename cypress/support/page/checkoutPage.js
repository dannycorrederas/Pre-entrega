export class CheckoutPage {
    constructor(){
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
        this.purchaseButton =  'button';
    }

    writerFirstNameInput(firstName){
        cy.get(this.firstNameInput).type(firstName);
    };
    writerLastNameInput(lastName){
        cy.get(this.lastNameInput).type(lastName);
    };
    writerCardNumberInput(cardNumber){
        cy.get(this.cardNumberInput).type(cardNumber);
    };
    clickPurchaseButton(){
        cy.contains(this.purchaseButton, 'Purchase').click();
    };
}