const { expect } = require("@playwright/test");

class AutomationPracticePage {
  constructor(page) {
    this.page = page;

    // Radio Buttons
    this.radio1 = page.locator('input[value="radio1"]');
    this.radio2 = page.locator('input[value="radio2"]');
    this.radio3 = page.locator('input[value="radio3"]');

    // Dropdown
    this.dropdown = page.locator('#dropdown-class-example');

    // Checkboxes
    this.checkbox1 = page.locator('#checkBoxOption1');
    this.checkbox2 = page.locator('#checkBoxOption2');
    this.checkbox3 = page.locator('#checkBoxOption3');

    // Switch Window
    this.openWindowButton = page.locator('#openwindow');
    this.openTabButton = page.locator('#opentab');

    // Alerts
    this.alertButton = page.locator('input[value="Alert"]');
    this.confirmButton = page.locator('input[value="Confirm"]');

    // Hide/Show
    this.hideButton = page.locator('#hide-textbox');
    this.showButton = page.locator('#show-textbox');
    this.displayedText = page.locator('#displayed-text');

    // Mouse Hover
    this.mouseHoverButton = page.locator('.mouse-hover');
    this.topLink = page.locator('a[href="#top"]');

    // iFrame
    this.iframe = page.frameLocator('iframe[src="courses/iframePractice"]');

    // Autocomplete
    this.autocompleteInput = page.locator('#autocomplete');

    // Web Tables
    this.webTable = page.locator('table[name="courses"]');
    this.fixedHeaderTable = page.locator('.tableFixHead');

    // Total Amount
    this.totalAmount = page.locator('text="Total Amount Collected: 296"');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  }

  // Radio Buttons
  async selectRadio1() {
    await this.radio1.check();
  }

  async selectRadio2() {
    await this.radio2.check();
  }

  async selectRadio3() {
    await this.radio3.check();
  }

  // Dropdown
  async selectDropdownOption(option) {
    await this.dropdown.selectOption(option);
  }

  // Checkboxes
  async checkCheckbox1() {
    await this.checkbox1.check();
  }

  async checkCheckbox2() {
    await this.checkbox2.check();
  }

  async checkCheckbox3() {
    await this.checkbox3.check();
  }

  // Switch Window/Tab
  async openWindow() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.openWindowButton.click()
    ]);
    return newPage;
  }

  async openTab() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.openTabButton.click()
    ]);
    return newPage;
  }

  // Alerts
  async handleAlert() {
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Hello');
      await dialog.accept();
    });
    await this.alertButton.click();
  }

  async handleConfirm() {
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Hello');
      await dialog.accept();
    });
    await this.confirmButton.click();
  }

  // Hide/Show
  async hideText() {
    await this.hideButton.click();
    await expect(this.displayedText).toBeHidden();
  }

  async showText() {
    await this.showButton.click();
    await expect(this.displayedText).toBeVisible();
  }

  // Mouse Hover
  async mouseHover() {
    await this.mouseHoverButton.hover();
    await expect(this.topLink).toBeVisible();
  }

  // iFrame
  async interactWithIframe() {
    // Verify the iframe is present
    await expect(this.page.locator('iframe')).toBeVisible();
  }

  // Autocomplete
  async fillAutocomplete(text) {
    await this.autocompleteInput.fill(text);
    // Select from suggestions if needed
  }

  // Web Tables
  async verifyWebTable() {
    await expect(this.webTable).toBeVisible();
    const rows = this.webTable.locator('tbody tr');
    await expect(rows).toHaveCount(11); // Adjust based on actual count
  }

  async verifyFixedHeaderTable() {
    await expect(this.fixedHeaderTable).toBeVisible();
  }

  // Total Amount
  async verifyTotalAmount() {
    await expect(this.totalAmount).toBeVisible();
  }
}

module.exports = AutomationPracticePage;