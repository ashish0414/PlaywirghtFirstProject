const { expect, test } = require("@playwright/test");
const { JavaScriptAlertsPage } = require("../../SeleniumPlaygroundPages/JavaScriptAlertsPage");

let javaScriptAlertsPage;

test.describe('JavaScript Alerts Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    javaScriptAlertsPage = new JavaScriptAlertsPage(page);
    await javaScriptAlertsPage.goto('https://the-internet.herokuapp.com/javascript_alerts');
  });

  test('should handle JavaScript alert', async () => {
    javaScriptAlertsPage.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS Alert');
      await dialog.accept();
    });

    await javaScriptAlertsPage.clickAlertButton();
    await expect(javaScriptAlertsPage.page.getByText('You successfully clicked an alert')).toBeVisible();
  });

  test('should handle JavaScript confirm - accept', async () => {
    javaScriptAlertsPage.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS Confirm');
      await dialog.accept();
    });

    await javaScriptAlertsPage.clickConfirmButton();
    await expect(javaScriptAlertsPage.page.getByText('You clicked: Ok')).toBeVisible();
  });

  test('should handle JavaScript confirm - dismiss', async () => {
    javaScriptAlertsPage.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });

    await javaScriptAlertsPage.clickConfirmButton();
    await expect(javaScriptAlertsPage.page.getByText('You clicked: Cancel')).toBeVisible();
  });

  test('should handle JavaScript prompt - accept with text', async () => {
    const promptInput = 'Playwright Test';

    javaScriptAlertsPage.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS prompt');
      await dialog.accept(promptInput);
    });

    await javaScriptAlertsPage.clickPromptButton();
    await expect(javaScriptAlertsPage.page.getByText(`You entered: ${promptInput}`)).toBeVisible();
  });

  test('should handle JavaScript prompt - dismiss', async () => {
    javaScriptAlertsPage.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });

    await javaScriptAlertsPage.clickPromptButton();
    await expect(javaScriptAlertsPage.page.getByText('You entered: null')).toBeVisible();
  });
});