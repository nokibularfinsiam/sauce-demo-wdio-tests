const LoginPage = require('../pageobjects/login.page');

describe('Login – Locked Out User', () => {
    it('should display the correct error message for locked_out_user', async () => {
        // 1. Go to login page
        await LoginPage.open();

        // (Optional) For debugging: print the current URL
        console.log('DEBUG – URL after open():', await browser.getUrl());

        // 2. Enter locked_out_user creds
        await LoginPage.login('locked_out_user', 'secret_sauce');

        // 3. Wait for the error message to appear
        //    Sometimes the error takes a moment, so allow up to 5 seconds
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000 });

        // (Optional) For debugging: print out the error text
        const actualText = await LoginPage.errorMessage.getText();
        console.log('DEBUG – Error text is:', actualText);

        // 4. Assert the exact expected error text
        await expect(LoginPage.errorMessage).toHaveText(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });
});
