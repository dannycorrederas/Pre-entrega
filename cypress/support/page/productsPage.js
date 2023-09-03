export class ProductsPage {
    constructor(){
        this.productName = '#name';
        this.productButton = '#price';
    }

    ClickAddProduct(product){
        cy.contains(this.productName, product).siblings('button').click();
        cy.get('#closeModal').click();
    }
}