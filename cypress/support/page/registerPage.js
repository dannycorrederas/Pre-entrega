export class RegisterPage {
    constructor(){
        this.loginLink = '#registertoggle';
    }

    dclickLoginLink(){
        cy.get(this.loginLink).dblclick();
    }
}