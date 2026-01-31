const { expect, test } = require("@playwright/test");

test('Handling pop up of windows', async({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo')
    const [winPopUp] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', {name:" Follow On Twitter "}).click()
    ])

    await winPopUp.waitForLoadState()
    console.log(await winPopUp.title())

    await expect(winPopUp).toHaveTitle('Profile / X')
    //page.pause()

    winPopUp.close()

    console.log(await page.title())
})