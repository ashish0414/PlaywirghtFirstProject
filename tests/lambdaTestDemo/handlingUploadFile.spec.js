//@ts-check
const { test, expect } = require("@playwright/test");
//const { CommonPage } = require("../../pages/CommonPage"); // Fixed casing to match actual file name
const path = require('path');
//const { CommonPage } = require("../../pages/CommonPage");

test('Handling upload single file', async ({page}) => {
    // @ts-ignore
    await page.goto('https://lambdatest.com/selenium-playground/upload-file-demo'); // Added await
    // With this
 
    await page.setInputFiles('#file', path.join(__dirname, '../../TestFiles/testfile1.txt')); // Fixed path to ../../TestFiles
    //await page.setInputFiles('#file', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt')

    await expect(page.getByTestId('error')).toContainText('File type should be pdf, png, jpeg or jpg'); // Added await

    await page.setInputFiles('#file', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg');

    await expect(page.getByTestId('error')).toContainText('File Successfully Uploaded'); // Added await

});

test('Handling upload multiple files', async ({page}) => { // Fixed typo: mutpile -> multiple
    // @ts-ignore
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/'); // Added await
    //await page.setInputFiles('input[type="file"]', ['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg'] )
    const files = [ path.resolve(__dirname, '../../TestFiles/testfile1.txt'), path.resolve(__dirname, '../../TestFiles/testjpg.jpg') ]; // Fixed path to ../../TestFiles
    await page.setInputFiles('input[type="file"]', files);
    const uploadedFile1Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testfile1\.txt/i })
            });

    await expect(uploadedFile1Preview.locator('strong')).toContainText('File type not allowed'); // Added await

    const uploadedFile2Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testjpg\.jpg/i })
            });
            await expect(uploadedFile2Preview.locator('strong'))
            .toBeEmpty(); // Added await

});


test('Handling upload multiple files using filechooser method', async ({page}) => { // Fixed typo: mutpile -> multiple, filea -> files
    // @ts-ignore
    //const commonPage = new CommonPage(page);
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/'); // Added await
    //await page.setInputFiles('input[type="file"]', ['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg'] )

    //using filechooser
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator('input[type="file"]').click()
    ]);

    await fileChooser.setFiles(['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testfile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg']); // Fixed filename casing if needed
    const uploadedFile1Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testfile1\.txt/i })
            });

    await expect(uploadedFile1Preview.locator('strong')).toContainText('File type not allowed'); // Added await

    const uploadedFile2Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /testjpg\.jpg/i })
            });
            await expect(uploadedFile2Preview.locator('strong'))
            .toBeEmpty(); // Added await

});

test('Handling upload dynamic generated file', async ({page}) => {
    // @ts-ignore
    //const commonPage = new CommonPage(page);
    await page.goto('https://blueimp.github.io/jQuery-File-Upload/'); // Added await
    //await page.setInputFiles('input[type="file"]', ['/Users/ashishkumar/PlayWrightDemo1/TestFiles/testFile1.txt', '/Users/ashishkumar/PlayWrightDemo1/TestFiles/testjpg.jpg'] )

    //using filechooser
   await page.locator('input[type="file"]')
    .setInputFiles({name: 'test.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Hello Playwrightthis is test file')}); // Fixed buffer content if typo, but assuming it's intentional
   
    const uploadedFile1Preview = page.locator('tbody.files tr')
            .filter({
                has: page.locator('p.name', { hasText: /test\.txt/i })
            });

    await expect(uploadedFile1Preview.locator('strong')).toContainText('File type not allowed'); // Added await

    // const uploadedFile2Preview = page.locator('tbody.files tr')
    //         .filter({
    //             has: page.locator('p.name', { hasText: /testjpg\.jpg/i })
    //         });
    //         await expect(uploadedFile2Preview.locator('strong'))
    //         .toBeEmpty();

});
