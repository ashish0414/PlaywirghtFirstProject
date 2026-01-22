const { test, expect } = require("@playwright/test");
const { CommonPage } = require("../../pages/commonPage");
const fs = require('fs')
import path from 'path'
const pdfParse = require('pdf-parse')


test('Handling Downlaod Single file', async ({page}) =>{
    const commonPage = new CommonPage(page)
    await commonPage.goto('https://the-internet.herokuapp.com/download')

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', {name:'sample.pdf'}).first().click()
    ])
    expect(download.suggestedFilename()).toBe('sample.pdf')
    const suggestedFileName = download.suggestedFilename()
    const filePath = 'downloads/'+suggestedFileName

    await download.saveAs(filePath)
    expect(fs.existsSync(filePath)).toBeTruthy()

})

// test('SeocndHandling Downlaod Single file', async ({page}) =>{
//     const commonPage = new CommonPage(page)
//     await commonPage.goto('https://the-internet.herokuapp.com/download')
//     const dowloadFileLocator = page.getByRole('link', {name:'sample.pdf'}).first()

//     const download = await page.expectDownload(async () => {
//         await dowloadFileLocator.click()
//     })
// })



test('Handling Download Multiple file (download + inline)', async ({ page }) => {
  
    const downloadDir = path.join(process.cwd(), 'downloads')
    fs.mkdirSync(downloadDir, { recursive: true })
  
    await page.goto('https://the-internet.herokuapp.com/download')
  
    const files = ['sample.pdf', 'SomeFile.txt']
  
    for (const file of files) {
  
     const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', {name : file}).click()
     ])
     const downloadedFilename = download.suggestedFilename()
     const filePath = path.join(downloadDir,downloadedFilename)
     await download.saveAs(filePath)
     // ✅ Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy()

        if (downloadedFilename.endsWith('.txt')) {
            const content = fs.readFileSync(filePath, 'utf-8')
            expect(content.length).toBeGreaterThan(0)
            // optional exact match
            expect(content).toContain('lah')
        }
    
        if (downloadedFilename.endsWith('.pdf')) {
            const pdfBuffer = fs.readFileSync(filePath)
            const pdfData = await pdfParse(pdfBuffer)
    
            expect(pdfData.numpages).toBeGreaterThan(0)
            expect(pdfData.text.length).toBeGreaterThan(0)
    
        
        }
    }
  })
  
