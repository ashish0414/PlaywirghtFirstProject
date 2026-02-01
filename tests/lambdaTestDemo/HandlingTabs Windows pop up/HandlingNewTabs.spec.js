const { test, expect } = require("@playwright/test");

test('Handling new tabs', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows')

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name: 'Click Here' }).click()
    ])
    await newPage.waitForLoadState('domcontentloaded')
    console.log('new page is ', await newPage.title())

    //await newPage.close()
    await page.bringToFront()
    await page.waitForLoadState('domcontentloaded')

    console.log('The current window now is ', await page.title())

    await expect(newPage.locator('h3')).toHaveText('New Window')
})

test('Handling multi page using browser context', async ({ browser }) => {
    const firstContext = await browser.newContext();
    await firstContext.route('**/*', route => {
        const url = route.request().url();
        if (
          url.includes('doubleclick') ||
          url.includes('googlesyndication') ||
          url.includes('google_vignette') ||
          url.includes('adsystem')
        ) {
          return route.abort();
        }
        route.continue();
      });
    const firstPage = await firstContext.newPage();

    await firstPage.goto('https://automationexercise.com/login');

    await firstPage
        .locator('form')
        .filter({ hasText: 'Login' })
        .getByPlaceholder('Email Address')
        .fill('ncrmeet1@yopmail.com');

    await firstPage.getByRole('textbox', { name: 'Password' }).fill('Test@1234');
    await firstPage.getByRole('button', { name: 'Login' }).click();

    const secondContext = await browser.newContext();
    const secondPage = await secondContext.newPage();

    await secondPage.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
    await secondPage.getByTestId('input-email').fill('lambdatestnew@yopmail.com');
    await secondPage.getByTestId('input-password').fill('Lambda123');
    await secondPage.getByRole('button', { name: 'Login' }).click();



    await firstPage.getByRole('link', { name: 'Products' }).click();

// wait for real page readiness
await firstPage.locator('.features_items').waitFor({ state: 'visible' });

// final assertion
await expect(firstPage).toHaveURL(/\/products/);




    //await expect(firstPage).toHaveTitle('Automation Exercise - All Products');

    await firstContext.close();
    await secondContext.close();
});
