const { Given, When, Then, Before, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const utils = require('../../utils');
const FinancePage = require('../pages/finance.btc.page');
const Helpers = require('../../helpers');
require('../../setupChai');
setDefaultTimeout(parseInt(process.env.DEFAULT_TIMEOUT) || 320000);

//.env config
const dotenv = require("dotenv");
dotenv.config();
const API_ENDPOINT = process.env.API_ENDPOINT;

//Constants
const URL = 'https://www.google.com/finance/quote/BTC-USD';
const Chrome = 'chrome';
const Number = 'number';

//Variables
let driver;
let financePage;
let helpers;
let apiPrice;
let uiPrice;
let initialPrice;
let recordedPrices = [];

BeforeAll(async () => {
    // Initialize driver only if it's not already initialized
    if (!driver) {
        driver = await new Builder().forBrowser(Chrome).build();
        financePage = new FinancePage(driver);
        helpers = new Helpers(driver);
    }
    //Load the Google Finance page
    await driver.get(URL);
    console.log(`Loading ${URL}`);
    //The page should be loaded within 1 minute
    await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 60000 });
    //Handle the cookies prompt
    await helpers.handleCookiesPrompt(driver);
});

//Verify API price format
Given('I get the current price from the API', async () => {
    //Via Get request extract the current BTC-USD price from the API
    apiPrice = await utils.fetchBTCPrice(API_ENDPOINT);
    expect(apiPrice).to.be.a(Number);
    expect(apiPrice).to.be.above(10000);
});

//Verify UI price format
Given('I get the current BTC-USD price from the UI', async () => {
    //Get the price from the UI element and parse it to integer
    uiPrice = await helpers.extractUIPrice(driver);
    expect(apiPrice).to.be.a(Number);
    expect(apiPrice).to.be.above(10000);
});

//Compare API and UI prices
When('the BTC-USD price from the UI should not deviate by more than 1% from the API price', () => {
    const percentageDeviation = Math.abs((uiPrice - apiPrice) / apiPrice) * 100;
    expect(percentageDeviation).to.be.below(1, `Price deviation is more than 1%: ${percentageDeviation}%`);
});

//Scenario: The average BTC-USD price in a given time interval (N minutes) 
//does not vary by more than 1% compared to the initial recorded value, 
//given a reading is made every M seconds.
Then(
    'the average BTC-USD price recorded every {int} seconds for {int} minutes does not vary by more than 1% from the initial recorded value',
    async (intervalSeconds, durationMinutes) => {
        recordedPrices = [];
        const totalDuration = durationMinutes * 60 * 1000;
        const intervalMs = intervalSeconds * 1000;

        // Record initial price
        const initialPriceText = await financePage.getPriceText();
        initialPrice = parseFloat(await utils.parseUiPrice(initialPriceText));
        recordedPrices.push(initialPrice);

        // Record prices at intervals
        for (let timeElapsed = intervalMs; timeElapsed < totalDuration; timeElapsed += intervalMs) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));

            const priceText = await financePage.getPriceText();
            const currentPrice = parseFloat(await utils.parseUiPrice(priceText));
            recordedPrices.push(currentPrice);
        }

        console.log(`Recorded prices: ${recordedPrices}`);
        
        // Calculate average price
        const sumPrices = recordedPrices.reduce((sum, price) => sum + price, 0);
        const averagePrice = sumPrices / recordedPrices.length;

        // Calculate percentage variation from initial price
        const percentageVariation = Math.abs((averagePrice - initialPrice) / initialPrice) * 100;

        // Assert variation is within 1%
        expect(percentageVariation).to.be.below(
            1,
            `Average price variation is ${percentageVariation}%, which exceeds the allowed 1% limit`
        );
    }
);

//Scenario: There are no values in the given time interval (N minutes) 
//that vary by more than 2% given a reading is made every M seconds
Then(
    'there is no BTC-USD price recorded that varies by more than 2% from the initial recorded value',
    async () => {
        console.log(`Initial price: ${initialPrice}`);

        //Check each price against the 2% deviation limit
        for (const price of recordedPrices) {
            const deviation = Math.abs((price - initialPrice) / initialPrice) * 100;
            console.log(`Price: ${price}, Deviation: ${deviation}%`);

            //Verify each price's deviation is within 2%
            expect(deviation).to.be.below(
                2,
                `Price deviation of ${deviation}% exceeds the allowed 2% limit`
            );
        }
    }
);

AfterAll(async () => {
    if (driver) {
        console.log("Quitting the driver.");
        await driver.quit();
    }
});