export class ShoppingCartPage{
    constructor(){
        this.productName = '#productName';
        this.productPrice = '#productPrice';
    }

    verifyExistsProduct(product){
        cy.get(this.productName).should('exist', product);
    };

    verifyExistsPriceProduct(productname,productprice){
        cy.contains(this.productName, productname).siblings(this.productPrice).should('exist', productprice);
    };

    getTotalPrice(product1, product2){
        let total = product1 + product2;
        return total;
    };
}