const {Given, When, Then} = require('cucumber');
const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

Given('I am on the Google search page', async function() {
    await this.driver.get('https://www.google.com');
});

When('I search for {string}', async function(word) {
    
    // let executor = driver.executScript;
    // executor("arguments[0].click();", element);
    let searchBar = await this.driver.findElement(By.name('q'));

    await searchBar.sendKeys(word);
    await searchBar.submit();
});

Then('the page title should start with {string}', async function(word) {
    await this.driver.wait(until.titleContains(word), 10000);
    let title = await this.driver.getTitle();
    expect(title).to.contain(word);
})