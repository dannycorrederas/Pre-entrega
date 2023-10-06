export class ShoppingCartPage{
    constructor(){
        this.productName = '#productName';
        this.productPrice = '#productPrice';
        this.totalPrice = '#price';
        this.checkoutButton = 'button';
    }

    verifyExistsProduct(){
        return cy.get(this.productName);
    };

    verifyExistsPriceProduct(productName){
        return cy.contains(this.productName, productName).siblings(this.productPrice);
    };

    getTotalPrice(product1, product2){
        let total = product1 + product2;
        return total;
    };

    verifyTotalPrice(){
        return cy.get(this.totalPrice).children('b');
    };

    clickCheckoutButton(){
        cy.contains(this.checkoutButton,'Go to Checkout').click();
    };
}