const { test, expect } = require("@playwright/test");

test('Handling JavaScript standard Alerts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS Alert');
      await dialog.accept();
    });
  
    await page.click('text=Click for JS Alert');
    await expect(page.getByText('You successfully clicked an alert')).toBeVisible();
  });
  

  test('Handling JavaScript confirm Alerts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
    // OK
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS Confirm');
      await dialog.accept();
    });
  
    await page.click('text=Click for JS Confirm');
    await expect(page.getByText('You clicked: Ok')).toBeVisible();
  
    // Cancel
    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
  
    await page.click('text=Click for JS Confirm');
    await expect(page.getByText('You clicked: Cancel')).toBeVisible();
  });
  

  test('Handling JavaScript prompt Alerts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
    const promptInput = 'Playwright Test';
  
    // Accept with input
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('I am a JS prompt');
      await dialog.accept(promptInput);
    });
  
    await page.click('text=Click for JS Prompt');
    await expect(page.getByText(`You entered: ${promptInput}`)).toBeVisible();
  
    // Dismiss
    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
  
    await page.click('text=Click for JS Prompt');
    await expect(page.getByText('You entered: null')).toBeVisible();
  });
  