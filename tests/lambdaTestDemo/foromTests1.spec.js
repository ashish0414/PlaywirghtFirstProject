import { test } from '@playwright/test';
import { SimpleFormPage } from '../../pages/SimpleFormPage';

const URL = 'https://www.lambdatest.com/selenium-playground/simple-form-demo';

test.describe('Simple Form Demo', () => {
  test.beforeEach(async ({ page }) => {
    const simpleForm = new SimpleFormPage(page);
    await simpleForm.goto(URL);
  });

  test('Play with input boxes and button', async ({ page }) => {
    const simpleForm = new SimpleFormPage(page);
    const message = 'This is a test Message';
    const val1 = 55;
    const val2 = 65;

    await simpleForm.enterMessage(message);
    await simpleForm.submitMessage();
    await simpleForm.expectMessage(message);

    await simpleForm.enterFirstValue(val1);
    await simpleForm.enterSecondValue(val2);

    await simpleForm.clickGetSum();
    await simpleForm.expectSum(val1 + val2);
  });
});
