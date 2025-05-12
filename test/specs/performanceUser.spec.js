describe('Shopping Flow - Performance Glitch User', () => {
    it('should complete an order after sorting and adding first item', async () => {
        //Open the site and log in
        await browser.url('/');
        await $('#user-name').setValue('performance_glitch_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // 2. Reset App State
        const menuBtn   = $('#react-burger-menu-btn');
        const resetLink = $('#reset_sidebar_link');
        const closeBtn  = $('#react-burger-cross-btn');

        await menuBtn.waitForClickable();
        await menuBtn.click();
        await resetLink.waitForClickable();
        await resetLink.click();
        await closeBtn.waitForClickable();
        await closeBtn.click();

        //Sort products by Name (Z to A)
        await $('select.product_sort_container').waitForEnabled();
        await $('select.product_sort_container').selectByVisibleText('Name (Z to A)');

        //Add the first product to the cart
        const firstItem = (await $$('.inventory_item'))[0];
        await firstItem.scrollIntoView();
        await firstItem.$('button.btn_inventory').waitForClickable();
        await firstItem.$('button.btn_inventory').click();

        //Go to cart and checkout
        await $('.shopping_cart_link').waitForClickable();
        await $('.shopping_cart_link').click();
        await $('#checkout').waitForClickable();
        await $('#checkout').click();
        await $('#first-name').setValue('Alice');
        await $('#last-name').setValue('Smith');
        await $('#postal-code').setValue('54321');
        await $('#continue').click();

        // Verify product
        const cartItems = await $$('.inventory_item_name');
        await expect(cartItems[0]).toHaveText('Test.allTheThings() T-Shirt (Red)');

        const itemTotal = parseFloat(
            (await $('.summary_subtotal_label').getText()).replace('Item total: $', '')
        );
        const tax = parseFloat(
            (await $('.summary_tax_label').getText()).replace('Tax: $', '')
        );
        const expectedTotal = (itemTotal + tax).toFixed(2);
        await expect($('.summary_total_label')).toHaveText(`Total: $${expectedTotal}`);

        //Finish checkout and verify success
        await $('#finish').waitForClickable();
        await $('#finish').click();
        await expect($('.complete-header')).toHaveText('Thank you for your order!');

        // 10. Reset App State again then logout
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
