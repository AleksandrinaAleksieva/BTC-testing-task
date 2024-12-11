const { By, until } = require('selenium-webdriver');
const FinancePage = require('./features/pages/finance.btc.page');
const { parseUiPrice } = require('./utils');

class Helpers {
    constructor(driver) {
        this.driver = driver;
        this.financePage = new FinancePage(driver);
    }

    async handleCookiesPrompt(driver) {
        const initialPageUrl = await driver.getCurrentUrl();
        const consentURL = 'https://consent.google.com';

        if (await initialPageUrl.includes(consentURL)) {
            // Check for the "Accept All" cookies button
            const consentButton = await driver.findElement(this.financePage.acceptAllButton);

            // Only click if the consent button is visible
            if (consentButton) {
                console.log('Consent page detected, clicking "Accept All" button...');
                await consentButton.click();

                //Wait for a specific element to indicate the page is loaded successfully
                await driver.wait(until.elementLocated(this.financePage.priceComponent), 10000);
                console.log('Consent accepted, page has settled.');
            }
        }
    }

    async extractUIPrice(driver) {
        const priceText = await this.financePage.getPriceText(driver);
        return await parseUiPrice(priceText);
    }
}

module.exports = Helpers;