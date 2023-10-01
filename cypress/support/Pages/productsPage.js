export class ProductsPage {
    
  addProductCart(cart) {
    cy.contains(cart).siblings('button[type="button"]').click();
    cy.xpath("//button[@id='closeModal']").click();
  }

}
