//@ts-check
import { test, expect } from '@playwright/test';

test('Add iMac to cart via hover', async ({ page }) => {

  await page.goto('https://ecommerce-playground.lambdatest.io');

  // Navigate to Printers
  await page.getByRole('button', { name: 'Shop by Category' }).click()
  await page.getByRole('heading', { name: 'Top categories close' }).getByLabel('close').click()
  //await page.getByRole('link', { name: 'Printers & Scanners' }).click();
  await page.getByRole('textbox', { name: 'Search For Products' }).fill('Palm Treo Pro')
  await page.locator('div.search-button > button.type-icon').click({force:true})

  await page.waitForSelector('div.carousel-item.active')
  expect(page.locator('h1.h4')).toHaveText('Search - Palm Treo Pro')

  const productCard = page
    .locator('div.carousel-item.active')
    //.locator('..')
    // .locator('..')
    // .locator('..');


    const productCount = await productCard.count();
    console.log(productCount)

    for (let i = 0; i < productCount; i++) {
      await productCard.nth(i).click(); 
      await page.waitForSelector("h1.h3")
      expect(page.locator('.breadcrumb>li.active')).toHaveText('Palm Treo Pro')
      const addToCartBtn = page.locator('button:visible', {hasText:'Add To Cart'})
      const outOfStock = page.locator('button:visible', {hasText: 'Out Of Stock'})
      if (await addToCartBtn.isVisible()) {
        console.log(`Product ${i + 1}: In Stock`);
        await addToCartBtn.click()
        break
      }else if(await outOfStock.isVisible()){
        console.log(`Product ${i + 1}: out of Stock`)
      }
      // Go back to PLP
    await page.goBack();
    await expect(productCard.first()).toBeVisible();
      
    }
    

  // await addToCartBtn.click();
  await page.waitForSelector('#notification-box-top')
  await expect(page.locator('#notification-box-top'))
    .toBeVisible({ timeout: 10000 });

     await page.getByRole('link', { name: 'View Cart ' }).click()

    await expect(page.locator('.breadcrumb-item.active')).toHaveText('Shopping Cart')

    const cartTable = page.locator('.table-responsive table tbody');

  //   // Narrow to the row with iMac
    const imacRow = cartTable.locator('tr', {
      has: page.locator('td.text-left > a', { hasText: 'Palm Treo Pro' })
    }).first();
    
  //   // Assert product name
    await expect(imacRow.locator('td.text-left > a')).toHaveText('Palm Treo Pro');
    
  //   // Assert quantity
    await expect(imacRow.locator('input[name^="quantity"]')).toHaveValue('1');    
    

});
