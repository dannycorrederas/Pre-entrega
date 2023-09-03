/// <reference types="cypress" />
import { LoginPage } from "../support/page/loginPage";
import { RegisterPage } from "../support/page/registerPage";
import { HomePage } from "../support/page/homePage";
import { ProductsPage } from "../support/page/productsPage";
import { ShoppingCartPage } from "../support/page/shoppingCartPage";

describe('Desafío 3', ()=>{
let log;
let product;
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const homePage = new HomePage();
const productPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();

    before('Before', ()=>{
        cy.fixture('login').then(login =>{
            log = login;
        });
        cy.fixture('productos').then(productos =>{
            product = productos;
        })
    })

    beforeEach('Before each', ()=>{
        cy.visit('');
        registerPage.dclickLoginLink();
        loginPage.writeUser(log.user);
        loginPage.writePassword(log.pass);
        loginPage.clickLoginButton();
    })

    it('desafio', ()=>{
        homePage.clickOnlineShopButton();
        productPage.ClickAddProduct(product.producto1.name);
        productPage.ClickAddProduct(product.producto2.name);
        cy.xpath(`//button[contains(text(), 'Go to shopping cart')]`).click();
        shoppingCartPage.verifyExistsProduct(product.producto1.name);
        shoppingCartPage.verifyExistsPriceProduct(product.producto1.name, product.producto1.price);
        shoppingCartPage.verifyExistsProduct(product.producto2.name);
        shoppingCartPage.verifyExistsPriceProduct(product.producto2.name, product.producto2.price);
        cy.xpath(`//button[contains(text(), 'Show total price')]`).click();
        cy.get('#price').children('b').invoke('text').then(text =>{
            assert.equal(text, shoppingCartPage.getTotalPrice(product.producto1.price, product.producto2.price));
        })
    })
})