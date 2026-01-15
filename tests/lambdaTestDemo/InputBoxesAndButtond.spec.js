//@ts-check
import test, { expect } from "@playwright/test";

const message = 'This is a test Message';

test('Play with input boxes and button', async ({ page }) => {

    page.on('console', (msg) => {
        if (
          msg.type() === 'error' &&
          msg.text().includes('Minified React error')
        ) {
          // Ignore known site-side React error
          return;
        }
      });
  await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');

  await page.getByPlaceholder('Please enter your Message').fill(message);
  await page.getByRole('button', { name: 'Get Checked Value' }).click();

  await expect(page.locator('#message')).toHaveText(message);
});
