const { expect } = require("@playwright/test");
const { Base } = require("./Base");

class JavaScriptAlertsPage extends Base {
  constructor(page) {
    super(page);

    this.alertButton = page.locator('text=Click for JS Alert');
    this.confirmButton = page.locator('text=Click for JS Confirm');
    this.promptButton = page.locator('text=Click for JS Prompt');
  }

  async clickAlertButton() {
    await this.alertButton.click();
  }

  async clickConfirmButton() {
    await this.confirmButton.click();
  }

  async clickPromptButton() {
    await this.promptButton.click();
  }
}

module.exports = { JavaScriptAlertsPage };