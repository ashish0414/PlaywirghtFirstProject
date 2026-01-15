import { test } from '@playwright/test';
import { SimpleFormPage } from '../pages/SimpleFormPage';


test('Play with input boxes and button', async ({ page }) => {
  const simpleForm = new SimpleFormPage(page);
  const message = 'This is a test Message';
  const val1=55
  const val2=65

  await simpleForm.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
  await simpleForm.enterMessage(message);
  await simpleForm.submitMessage();
  await simpleForm.expectMessage(message);



  await simpleForm.enterFirstValue(String(val1));
  await simpleForm.enterSecondValue(String(val2));

  await simpleForm.clickGetSum();
  await simpleForm.expectSum(String(val1 + val2));
});
