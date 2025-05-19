// test/specs/performanceUserFlow.spec.js
const LoginPage      = require('../pageobjects/login.page');
const InventoryPage  = require('../pageobjects/inventory.page');
const CartPage       = require('../pageobjects/cart.page');
const CheckoutPage   = require('../pageobjects/checkout.page');

describe('Shopping Flow - Performance Glitch User', () => {
    it('should complete an order after sorting (Z→A) and adding the first item', async () => {
        // 1. login
        await LoginPage.open();
        await LoginPage.login('performance_glitch_user', 'secret_sauce');

        // 2. reset app state
        await InventoryPage.resetAppState();

        // 3. sort products by Name (Z to A)
        await InventoryPage.sortBy('Name (Z to A)');

        // 4. add the first (Z→A) product to cart
        const firstInventory = (await InventoryPage.inventoryItems)[0];
        await firstInventory.scrollIntoView();
        await firstInventory.$('button.btn_inventory').waitForClickable();
        await firstInventory.$('button.btn_inventory').click();

        // 5. go to cart & checkout
        await CartPage.openCart();
        await CartPage.goToCheckout();

        // 6. fill checkout info
        await CheckoutPage.submitInfo('Alice', 'Smith', '54321');

        // 7. verify overview item name and totals
        const overNames = await CheckoutPage.overviewItems;
        await expect(overNames[0]).toHaveText('Test.allTheThings() T-Shirt (Red)');

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
