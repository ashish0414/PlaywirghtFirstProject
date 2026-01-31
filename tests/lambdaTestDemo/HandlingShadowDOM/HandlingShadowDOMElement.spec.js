const { test, expect } = require('@playwright/test');

test('Handling shadow DOM elements', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/shadow-dom');

  const shadowHost = page.locator('shadow-signup-form');
  await expect(shadowHost).toBeVisible();

  await shadowHost.locator('input[name="username"]').fill('Ashish Singh');
  await shadowHost.locator('input[name="email"]').fill('test@gmail.com');
  await shadowHost.locator('input[name="password"]').fill('testPass');
  await shadowHost.locator('input[name="confirm_password"]').fill('testPass');
});
