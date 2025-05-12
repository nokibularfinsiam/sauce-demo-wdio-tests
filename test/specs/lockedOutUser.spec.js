describe('Login - Locked Out User', () => {
    it('should display an error message for locked_out_user', async () => {
        await browser.url('/');
        await $('#user-name').setValue('locked_out_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        const errorMessage = await $('h3[data-test="error"]');
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});
