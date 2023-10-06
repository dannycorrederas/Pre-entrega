/// <reference types="cypress" />
import { HomePage } from "../support/page/homePage";
import { ProductsPage } from "../support/page/productsPage";
import { ShoppingCartPage } from "../support/page/shoppingCartPage";
import { CheckoutPage } from "../support/page/checkoutPage";
import { TicketPage } from "../support/page/ticketPage";

describe('Entrega', ()=>{
let infoPersonal;
let product;
let usuario = 'danny505';
let pass = '123456!';


const homePage = new HomePage();
const productPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();
const checkoutPage = new CheckoutPage();
const ticketPage = new TicketPage();

    before('Before', ()=>{
        cy.fixture('infopersonal').then(infopersonal =>{
            infoPersonal = infopersonal;
        });
        cy.fixture('productos').then(productos =>{
            product = productos;
        });
    })

    beforeEach('Before each', ()=>{
        cy.request({
            url: "https://pushing-it.onrender.com/api/register",
            method: "POST",
            body: {
                "username" : `${usuario}`,
                "password": `${pass}`,
                "gender": "Female",
                "day": "27",
                "month": "December",
                "year": "1995"
            }
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.username)
        })
        cy.request({
            url: "https://pushing-it.onrender.com/api/login",
            method: "POST",
            body: {
                "username" : `${usuario}`,
                "password": `${pass}`
            }
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.username)
        })
        cy.visit('');
    });

    it('Entrega Final', ()=>{
        homePage.clickOnlineShopButton();
        productPage.ClickAddProduct(product.producto1.name);
        productPage.ClickAddProduct(product.producto2.name);
        cy.xpath(`//button[contains(text(), 'Go to shopping cart')]`).click();
        shoppingCartPage.verifyExistsProduct().should('exist', product.producto1.name);
        shoppingCartPage.verifyExistsPriceProduct(product.producto1.name).should('exist', product.producto1.price);
        shoppingCartPage.verifyExistsProduct().should('exist', product.producto2.name);
        shoppingCartPage.verifyExistsPriceProduct(product.producto2.name).should('exist', product.producto2.price);
        cy.xpath(`//button[contains(text(), 'Show total price')]`).click();
        shoppingCartPage.verifyTotalPrice().invoke('text').then(text =>{
            assert.equal(text, shoppingCartPage.getTotalPrice(product.producto1.price, product.producto2.price));
        })
        shoppingCartPage.clickCheckoutButton();
        checkoutPage.writerFirstNameInput(infoPersonal.name);
        checkoutPage.writerLastNameInput(infoPersonal.lastname);
        checkoutPage.writerCardNumberInput(infoPersonal.card);
        checkoutPage.clickPurchaseButton();
        ticketPage.verifyNameText(infoPersonal.name, infoPersonal.lastname);
        ticketPage.verifyProductNameText(product.producto1.name, product.producto2.name);        
        ticketPage.verifyCreditCardText(infoPersonal.card);
        ticketPage.verifyTotalPriceText(shoppingCartPage.getTotalPrice(product.producto1.price, product.producto2.price));
    });

    after('Delete user',()=>{
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${usuario}`,
            method: "DELETE"
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200)
        })
    });
})