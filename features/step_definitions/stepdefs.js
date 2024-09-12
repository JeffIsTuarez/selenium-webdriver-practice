const {Given, When, Then} = require('cucumber');
const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
let driver;

Given('I am on the Google search page', async function() {

    let options = new chrome.Options();
    options.addArguments('--disable-popup-blocking');

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('https://www.google.com');
});

When('I search for {string}', async function(word) {
    
    // let executor = driver.executScript;
    // executor("arguments[0].click();", element);
    let searchBar = await driver.findElement(By.name('q'));

    await searchBar.sendKeys(word);
    await searchBar.submit();
});

Then('the page title should start with {string}', async function(word) {
    await driver.wait(until.titleContains(word), 10000);
    let title = await driver.getTitle();
    expect(title).to.contain(word);
    await driver.quit();
})