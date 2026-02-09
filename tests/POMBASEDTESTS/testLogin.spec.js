const { expect, test } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");

test("should login successfully", async ({ page }) => {
    
  const loginPage = new LoginPage(page);
  loginPage.goto("https://the-internet.herokuapp.com/login");
  await loginPage.login("tomsmith", "SuperSecretPassword!");
  await expect(page).toHaveURL(/.*secure/);
});