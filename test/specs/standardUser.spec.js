describe('Shopping Flow - Standard User', () => {
    it('should complete an order with 3 items', async () => {
        //Open the site and log in
        await browser.url('/');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        //Reset App State via the hamburger menu
        const menuBtn   = $('#react-burger-menu-btn');
        const resetLink = $('#reset_sidebar_link');
        await menuBtn.waitForClickable();
        await menuBtn.click();
        await resetLink.waitForClickable();
        await resetLink.click();
        const closeBtn = $('#react-burger-cross-btn');
        await closeBtn.waitForClickable();
        await closeBtn.click();

        //Add any three items to the cart
        await $('#add-to-cart-sauce-labs-backpack').click();
        await $('#add-to-cart-sauce-labs-bike-light').click();
        await $('#add-to-cart-sauce-labs-bolt-t-shirt').click();

        // Go to cart and checkout
        await $('.shopping_cart_link').click();
        await $('#checkout').click();

        // Fill in checkout information
        await $('#first-name').setValue('John');
        await $('#last-name').setValue('Doe');
        await $('#postal-code').setValue('12345');
        await $('#continue').click();

        //Verify the three product
        const itemNames = await $$('.inventory_item_name');
        await expect(itemNames[0]).toHaveText('Sauce Labs Backpack');
        await expect(itemNames[1]).toHaveText('Sauce Labs Bike Light');
        await expect(itemNames[2]).toHaveText('Sauce Labs Bolt T-Shirt');

        const itemTotal = parseFloat(
            (await $('.summary_subtotal_label').getText()).replace('Item total: $', '')
        );
        const tax = parseFloat(
            (await $('.summary_tax_label').getText()).replace('Tax: $', '')
        );
        const expectedTotal = (itemTotal + tax).toFixed(2);
        await expect($('.summary_total_label')).toHaveText(`Total: $${expectedTotal}`);

        //Finish the purchase and verify success message
        await $('#finish').click();
        await expect($('.complete-header')).toHaveText('Thank you for your order!');

        //Reset App State then logout
        await menuBtn.waitForClickable();
        await menuBtn.click();
        await resetLink.waitForClickable();
        await resetLink.click();
        await closeBtn.waitForClickable();
        await closeBtn.click();
        await menuBtn.waitForClickable();
        await menuBtn.click();
        const logoutLink = $('#logout_sidebar_link');
        await logoutLink.waitForClickable();
        await logoutLink.click();
    });
});
