const { expect, test } = require("@playwright/test");
const { CommonPage } = require("../../pages/commonPage");

test("Normal i frame", async ({page}) =>{
    const commonPage = new CommonPage(page)
    await commonPage.goto('https://www.lambdatest.com/selenium-playground/iframe-demo')
    const iFrameEditBox = page.frameLocator('iframe#iFrame1').locator('.rsw-ce')
     //await iFrameEditBox.fill()

     await iFrameEditBox.fill('This is playwrght and i am supposed to write in iframe1')
    await expect(iFrameEditBox).toHaveText('This is playwrght and i am supposed to write in iframe1')

})

test("Nested i frame", async ({ page }) => {
    const commonPage = new CommonPage(page)
    await commonPage.goto('https://www.testmu.ai/selenium-playground/nested-frames/')
    
    await expect(page.frameLocator('[name="frame-top"]').locator('body')).toHaveText('Top')

    const bottomFrame = page.frameLocator('[name="frame-bottom"]')
    const bottomMiddleFrame = bottomFrame.frameLocator('[name="frame-middle"]')
    const bottomLeftFrame = bottomFrame.frameLocator('[name="frame-left"]')
    const bottomRightFrame = bottomFrame.frameLocator('[name="frame-right"]')

    await expect(bottomLeftFrame.locator('body')).toHaveText('Left')
    await expect(bottomMiddleFrame.locator('body')).toHaveText('Middle')
    await expect(bottomRightFrame.locator('body')).toHaveText('Right')

})
  