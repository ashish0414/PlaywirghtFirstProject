const { test, expect } = require("@playwright/test");
const AutomationPracticePage = require("../../pages/AutomationPracticePage");

test.describe("Automation Practice Page Verification", () => {
  let automationPracticePage;

  test.beforeEach(async ({ page }) => {
    automationPracticePage = new AutomationPracticePage(page);
    await automationPracticePage.goto();
  });

  test("should verify all components on the page", async () => {
    // Verify Radio Buttons
    await automationPracticePage.selectRadio1();
    await expect(automationPracticePage.radio1).toBeChecked();

    await automationPracticePage.selectRadio2();
    await expect(automationPracticePage.radio2).toBeChecked();

    await automationPracticePage.selectRadio3();
    await expect(automationPracticePage.radio3).toBeChecked();

    // Verify Dropdown
    await automationPracticePage.selectDropdownOption('option1');
    await expect(automationPracticePage.dropdown).toHaveValue('option1');

    // Verify Checkboxes
    await automationPracticePage.checkCheckbox1();
    await expect(automationPracticePage.checkbox1).toBeChecked();

    await automationPracticePage.checkCheckbox2();
    await expect(automationPracticePage.checkbox2).toBeChecked();

    await automationPracticePage.checkCheckbox3();
    await expect(automationPracticePage.checkbox3).toBeChecked();

    // Verify Switch Window
    const newWindowPage = await automationPracticePage.openWindow();
    await expect(newWindowPage).toHaveURL(/qaclickacademy/);
    await newWindowPage.close();

    // Verify Switch Tab
    const newTabPage = await automationPracticePage.openTab();
    await expect(newTabPage).toHaveURL(/qaclickacademy/);
    await newTabPage.close();

    // Verify Alerts
    await automationPracticePage.handleAlert();
    await automationPracticePage.handleConfirm();

    // Verify Hide/Show
    await automationPracticePage.hideText();
    await automationPracticePage.showText();

    // Verify Mouse Hover
    await automationPracticePage.mouseHover();

    // Verify iFrame (assuming it has interactable elements)
    await automationPracticePage.interactWithIframe(); // Uncomment if needed

    // Verify Autocomplete
    await automationPracticePage.fillAutocomplete('India');

    // Verify Web Tables
    await automationPracticePage.verifyWebTable();
    await automationPracticePage.verifyFixedHeaderTable();

    // Verify Total Amount
    await automationPracticePage.verifyTotalAmount();
  });
});