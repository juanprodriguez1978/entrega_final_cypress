
import { HomePage } from "../support/Pages/homePage";
import { ProductsPage } from "../support/Pages/productsPage";
import { ShoppingCart } from "../support/Pages/shoppingCartPage";
import { Checkout } from "../support/Pages/checkOutPage";
import { FinalDescription } from "../support/Pages/reciptPage";

describe('Register user', () => {
    let user;
    const gender = "Male";
    const day = '1';
    const month = 'September';
    const year = "1978";
    let products;
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCart = new ShoppingCart();
    const checkOut = new Checkout();

    before(() => {
        cy.fixture('products.json').then(varProducts => {
            products = varProducts;
        });

        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body: {
                username: 'user' + Math.floor(Math.random() * 1000),
                password: '123456!',
                gender: gender,
                day: day,
                month: month,
                year: year
            }
        }).then(response => {
            user = response.body.newUser;
            window.localStorage.setItem('user', user);
        });
    });

    before('Login', () => {
        cy.visit('');
        cy.xpath('//p/span').dblclick();
        homePage.typeUser(user.username);
        homePage.typePass('123456!');
        homePage.clickLoginButton();
    });

    it('Enter and select product', () => {
        cy.fixture('checkOut.json').then(checkoutData => {
            const { name, surname, card } = checkoutData;
            const productName1 = products.blackSocks.name;
            const productName2 = products.redCap.name;

            homePage.clickOnLineShopButton();
            productsPage.addProductCart(productName1);
            productsPage.addProductCart(productName2);
            homePage.closeShopping();
            shoppingCart.checkProduct(productName1).should('exist').siblings('#productPrice').should('contain', products.blackSocks.price);
            shoppingCart.checkProduct(productName2).should('exist').siblings('#productPrice').should('contain', products.redCap.price);
            shoppingCart.showTotalPrice();

            const totalPrice = products.blackSocks.price + products.redCap.price;
            shoppingCart.totalPriceString().should('contain', `$${totalPrice}`);
            homePage.closeCheckOut();
            checkOut.completeName(name);
            checkOut.completeSurname(surname);
            checkOut.completeCard(card);
            homePage.purchaseButton();
            const finalDescription = new FinalDescription(products);
            finalDescription.checkFinalMessage();
        });
    });

    after('Delete user', () => {
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${encodeURIComponent(user.username)}`,
            method: 'DELETE',
            failOnStatusCode: false,
        }).then(deleteResponse => {
            expect(deleteResponse.status).to.equal(200);
        });
    });
});

