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
            const consentButton = await driver.findElement(this.financePage.acceptAllButton, 15000);

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

    generateScreenshotName() {
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        return `screenshot_${timestamp}_${randomSuffix}.png`;
    }

    async extractUIPrice(driver) {
        const priceText = await this.financePage.getPriceText(driver);
        return await parseUiPrice(priceText);
    }
}

module.exports = Helpers;