// test/pageobjects/checkout.page.js
class CheckoutPage {
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput()  { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }
    get finishButton()   { return $('#finish'); }
    get errorMessage()   { return $('h3[data-test="error"]'); }

    // Overview locators
    get overviewItems()          { return $$('.inventory_item_name'); }
    get itemTotalLabel()         { return $('.summary_subtotal_label'); }
    get taxLabel()               { return $('.summary_tax_label'); }
    get totalLabel()             { return $('.summary_total_label'); }
    get completeHeader()         { return $('.complete-header'); }

    async submitInfo(first, last, zip) {
        await this.firstNameInput.waitForDisplayed();
        await this.firstNameInput.setValue(first);
        await this.lastNameInput.setValue(last);
        await this.postalCodeInput.setValue(zip);
        await this.continueButton.click();
    }
    async finish() {
        await this.finishButton.waitForClickable();
        await this.finishButton.click();
    }
}
module.exports = new CheckoutPage();
