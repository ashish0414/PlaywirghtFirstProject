const { test, expect } = require("@playwright/test");

test('Handling JavaScript standard Alerts', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toContain('I am a JS Alert');
        await dialog.accept();
    })

    page.click('text=Click for JS Alert');
    expect(page.getByText('You successfully clicked an alert')).toBeTruthy()

})

test('Handling JavaScript confirm Alerts', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toContain('I am a JS Confirm');
        await dialog.accept();
    })

    page.click('text=Click for JS Confirm');
    expect(page.getByText('You clicked: Ok')).toBeTruthy()

    page.click('text=Click for JS Confirm');
    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toContain('I am a JS Confirm');
        //await dialog.dismiss();
        
    })
    expect(page.getByText('You clicked: Cancel')).toBeTruthy()

})

test('Handling JavaScript prompt Alerts', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    const promptInput = 'Playwright Test';

    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toContain('I am a JS prompt');
        await dialog.accept(promptInput);
    })
    page.waitForLoadState()
    page.click('text=Click for JS Prompt');
    expect(page.getByText(`You entered: ${promptInput}`)).toBeTruthy()

    page.click('text=Click for JS Prompt');
    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toContain('I am a JS prompt');
        await dialog.dismiss();
    })
    expect(page.getByText('You entered: null')).toBeTruthy()

})