// test/pageobjects/login.page.js
class LoginPage {
    // Locators
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton()   { return $('#login-button'); }
    get errorMessage()  { return $('h3[data-test="error"]'); }

    // Navigate to the root URL
    async open() {
        await browser.url('/');
        // wait for the username field to be visible
        await this.usernameInput.waitForDisplayed({ timeout: 5000 });
    }

    // Perform login action
    async login(username, password) {
        await this.usernameInput.waitForDisplayed({ timeout: 5000 });
        await this.usernameInput.setValue(username);

        await this.passwordInput.waitForDisplayed({ timeout: 5000 });
        await this.passwordInput.setValue(password);

        await this.loginButton.waitForClickable({ timeout: 5000 });
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();
