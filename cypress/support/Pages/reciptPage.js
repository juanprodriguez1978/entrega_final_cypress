export class FinalDescription {
    constructor(products) {
        this.products = products;
        this.name = '#name';
        this.item1 = `//p[@id="${products.blackSocks.name}"]`;
        this.item2 = `//div//p[@id="${products.redCap.name}"]`;
        this.cardNumber = '#creditCard';
        this.cost = '#totalPrice';
    }

    checkFinalMessage() {
        cy.get(this.name).should('contain', 'Juan Rodriguez');
        cy.xpath(this.item1).should('contain', this.products.blackSocks.name);
        cy.xpath(this.item2).should('contain', this.products.redCap.name);
        cy.get(this.cardNumber).should('contain', '4012888888881881');
        const totalPrice = this.products.blackSocks.price + this.products.redCap.price;
        cy.get(this.cost).should('contain', `$${totalPrice}`);
    }
}
