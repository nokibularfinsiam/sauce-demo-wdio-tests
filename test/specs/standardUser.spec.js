const LoginPage      = require('../pageobjects/login.page');
const InventoryPage  = require('../pageobjects/inventory.page');
const CartPage       = require('../pageobjects/cart.page');
const CheckoutPage   = require('../pageobjects/checkout.page');

describe('Shopping Flow - Standard User', () => {
    it('should complete an order with 3 items', async () => {
        // 1. login
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        // 2. reset app state
        await InventoryPage.resetAppState();

        // 3. add 3 items to cart
        await InventoryPage.addItemToCart('sauce-labs-backpack');
        await InventoryPage.addItemToCart('sauce-labs-bike-light');
        await InventoryPage.addItemToCart('sauce-labs-bolt-t-shirt');

        // 4. go to cart and checkout
        await CartPage.openCart();
        await CartPage.goToCheckout();

        // 5. fill checkout info
        await CheckoutPage.submitInfo('John', 'Doe', '12345');

        // 6. verify items on overview page
        const names = await CheckoutPage.overviewItems;
        await expect(names[0]).toHaveText('Sauce Labs Backpack');
        await expect(names[1]).toHaveText('Sauce Labs Bike Light');
        await expect(names[2]).toHaveText('Sauce Labs Bolt T-Shirt');

        // 7. verify totals
        const itemTotal   = parseFloat(
            (await CheckoutPage.itemTotalLabel.getText()).replace('Item total: $', '')
        );
        const taxAmount   = parseFloat(
            (await CheckoutPage.taxLabel.getText()).replace('Tax: $', '')
        );
        const expectedSum = (itemTotal + taxAmount).toFixed(2);
        await expect(CheckoutPage.totalLabel).toHaveText(`Total: $${expectedSum}`);

        // 8. finish and verify
        await CheckoutPage.finish();
        await expect(CheckoutPage.completeHeader).toHaveText('Thank you for your order!');

        // 9. reset state and logout
        await InventoryPage.resetAppState();
        await InventoryPage.logout();
    });
});
