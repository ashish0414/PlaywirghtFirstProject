//@ts-check
const { test, expect } = require("@playwright/test");
const { CommonPage } = require("../../pages/commonPage");
//const { CommonPage } = require("../../pages/commonPage");

test('Handling upload single file', async ({page}) => {
    // @ts-ignore
    page.goto('https://lambdatest.com/selenium-playground/upload-file-demo')
    await page.setInputFiles('#file', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt')

    expect (page.getByTestId('error')).toContainText('File Successfully Uploaded')

    await page.setInputFiles('#file', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg')

    expect (page.getByTestId('error')).toContainText('File Successfully Uploaded')

})
test('Handling upload mutpile file', async ({page}) => {
    // @ts-ignore
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/')
    await page.setInputFiles('input[type="file"]', ['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg'] )

    const uploadedFile1Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testfile1\.txt/i })
            });

    await expect(uploadedFile1Preview.locator('strong')).toContainText('File type not allowed')

    const uploadedFile2Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testjpg\.jpg/i })
            });
            await expect(uploadedFile2Preview.locator('strong'))
            .toBeEmpty();

})


test('Handling upload mutpile filea using filechooser method', async ({page}) => {
    // @ts-ignore
    const commonPage = new CommonPage(page)
    await commonPage.goto('https://blueimp.github.io/jQuery-File-Upload/')
    //await page.setInputFiles('input[type="file"]', ['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg'] )

    //usimg filechooser
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator('input[type="file"]').click()
    ])

    await fileChooser.setFiles(['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg'] )
    const uploadedFile1Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testfile1\.txt/i })
            });

    await expect(uploadedFile1Preview.locator('strong')).toContainText('File type not allowed')

    const uploadedFile2Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testjpg\.jpg/i })
            });
            await expect(uploadedFile2Preview.locator('strong'))
            .toBeEmpty();

})

test('Handling upload dynamic generated file', async ({page}) => {
    // @ts-ignore
    const commonPage = new CommonPage(page)
    await commonPage.goto('https://blueimp.github.io/jQuery-File-Upload/')
    //await page.setInputFiles('input[type="file"]', ['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg'] )

    //usimg filechooser
   await page.locator('input[type="file"]')
    .setInputFiles({name: 'test.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Hello Playwrightthis is test file')}) 

   
    const uploadedFile1Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /test\.txt/i })
            });

    await expect(uploadedFile1Preview.locator('strong')).toContainText('File type not allowed')

    // const uploadedFile2Preview = page.locator('tbody.files tr')
    //         .filter({
    //             has: page.locator('p.name', { hasText: /testjpg\.jpg/i })
    //         });
    //         await expect(uploadedFile2Preview.locator('strong'))
    //         .toBeEmpty();

})
