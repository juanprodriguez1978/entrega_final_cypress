export class HomePage {
    constructor() {
        this.close = '#goShoppingCart'
        this.shoppingCart = '#goShoppingCart'
        this.checkout = '.css-641vkz > .chakra-button'
        this.purchase = '.css-13zsa'
        this.onLineButton = '#onlineshoplink'
        this.userInput = '#user';
        this.passInput = '#pass';
        this.loginButton = '#submitForm';
    };

    clickOnLineShopButton() {
        cy.get(this.onLineButton).click();
    };

    closeButton() {
        cy.get(this.close).click()
    };

    closeShopping() {
        cy.get(this.shoppingCart).click()
    };

    closePrice(){
        cy.get(this.totalPrice).click()
    };

    closeCheckOut(){
        cy.get(this.checkout).click()
    };

    purchaseButton(){
        cy.get(this.purchase).click()
    }

    typeUser(user) {
        cy.get(this.userInput).type(user);
    };

    typePass(pass) {
        cy.get(this.passInput).type(pass);
    };

    clickLoginButton() {
        cy.get(this.loginButton).click();
    }; 

}
