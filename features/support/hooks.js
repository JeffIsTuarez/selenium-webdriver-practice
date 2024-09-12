const { Before, After } = require ('cucumber');
const { Builder } = require ('selenium-webdriver');

let driver;

Before(async function () {
  driver = await new Builder().forBrowser('chrome').build();
  this.driver = driver; // Attach the driver to the current scenario context
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});
