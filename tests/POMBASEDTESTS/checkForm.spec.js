const { expect, test } = require("@playwright/test");
const { FormSubmitPage } = require("../../SeleniumPlaygroundPages/FormSubmitPage");

test("should fill form successfully", async ({ page }) => {
  const formSubmitPage = new FormSubmitPage(page);
  formSubmitPage.goto("https://www.testmuai.com/selenium-playground/ajax-form-submit-demo/");
  await formSubmitPage.fillForm("My Title", "My Message");
  await formSubmitPage.submitForm();
  await formSubmitPage.loaderVerification();
  await formSubmitPage.processingMessageVerification();
});