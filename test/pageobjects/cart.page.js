class CartPage {
    get cartItems()      { return $$('.cart_item'); }
    get checkoutButton() { return $('#checkout'); }

    async openCart() {
        await $('.shopping_cart_link').waitForClickable();
        await $('.shopping_cart_link').click();
    }
    async goToCheckout() {
        await this.checkoutButton.waitForClickable();
        await this.checkoutButton.click();
    }
}
module.exports = new CartPage();
