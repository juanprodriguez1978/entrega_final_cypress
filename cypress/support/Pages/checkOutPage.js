export class Checkout {
    constructor(){
        this.name =`#FirstName`
        this.surname = `#lastName`
        this.card = `#cardNumber `
    }

    completeName(name){
        cy.get(this.name).type(name);
    }

    completeSurname(surname){
        cy.get(this.surname).type(surname);
    }

    completeCard(card){
        cy.get(this.card).type(card);
    }

}
