class InventoryPage {
    get burgerMenu()            { return $('#react-burger-menu-btn'); }
    get resetAppStateLink()     { return $('#reset_sidebar_link'); }
    get closeBurgerMenuButton() { return $('#react-burger-cross-btn'); }
    get logoutLink()            { return $('#logout_sidebar_link'); }
    get cartIcon()              { return $('.shopping_cart_link'); }
    get inventoryItems()        { return $$('.inventory_item'); }
    get productSortDropdown()   { return $('select.product_sort_container'); }

    async resetAppState() {
        await this.burgerMenu.waitForClickable();
        await this.burgerMenu.click();
        await this.resetAppStateLink.waitForClickable();
        await this.resetAppStateLink.click();
        // close the overlay
        await this.closeBurgerMenuButton.waitForClickable();
        await this.closeBurgerMenuButton.click();
    }
    async logout() {
        await this.burgerMenu.waitForClickable();
        await this.burgerMenu.click();
        await this.logoutLink.waitForClickable();
        await this.logoutLink.click();
    }
    async addItemToCart(itemTestId) {
        const button = $(`button[data-test="add-to-cart-${itemTestId}"]`);
        await button.waitForClickable();
        await button.click();
    }
    async sortBy(optionText) {
        await this.productSortDropdown.waitForDisplayed();
        await this.productSortDropdown.selectByVisibleText(optionText);
    }
}
module.exports = new InventoryPage();
