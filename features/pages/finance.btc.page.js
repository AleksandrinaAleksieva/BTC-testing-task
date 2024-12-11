const { By, until } = require('selenium-webdriver');

//Elements
const priceElement = 'div[jsname="ip75Cb"] div.YMlKec.fxKbKc';
const acceptAllElement = 'button[aria-label="Accept all"]';

// Element interactions
class FinancePage {
    constructor(driver) {
        this.driver = driver;
    }

    get priceComponent() {
        return By.css(priceElement);
    }

    get acceptAllButton() {
        return By.css(acceptAllElement);
    }

    async isPriceDisplayed() {
        const element = await this.driver.wait(until.elementLocated(By.css(priceElement)), 10000);
        return await element.isDisplayed();
    }

    async getPriceText() {
        try {
            const price = await this.driver.wait(until.elementLocated(By.css(priceElement)), 10000);
            return await price.getText();
        } catch (error) {
            console.error('Price element is not found:', error);
            return false;
        }
    }
    async isAcceptAllDisplayed() {
        try {
            const acceptAllButton = await this.driver.findElement(By.css(acceptAllElement));
            return await acceptAllButton.isDisplayed();
        } catch (error) {
            console.error('Accept All button not found:', error);
            return false;
        }
    }

    async clickAcceptAllButton() {
        const element = await this.driver.wait(until.elementLocated(this.acceptAllButton), 10000);
        await element.click();
    }
}

module.exports = FinancePage;