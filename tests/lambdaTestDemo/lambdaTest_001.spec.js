//@ts-check
import { test, expect } from '@playwright/test';

test('Add iMac to cart via hover', async ({ page }) => {

  await page.goto('https://ecommerce-playground.lambdatest.io');

  // Navigate to Printers
  await page.getByRole('button', { name: 'Mega Menu' }).hover();
  await page.getByRole('link', { name: 'Printer', exact: true }).click();

  const productCard = page
    .locator('h4>a', { hasText: 'iMac' })
    .locator('..')
    .locator('..')
    .locator('..');

  await productCard.hover();

  const addToCartBtn = productCard.locator('button').first();

  await expect(addToCartBtn).toBeVisible();

  // 🔑 Critical wait (fixes flakiness)
  await page.waitForFunction(() => window.cart !== undefined);

  await addToCartBtn.click();

  await expect(page.locator('#notification-box-top'))
    .toBeVisible({ timeout: 10000 });

    await page.getByRole('link', { name: 'View Cart ' }).click()

    await expect(page.locator('.breadcrumb-item.active')).toHaveText('Shopping Cart')

    const cartTable = page.locator('.table-responsive table tbody');

    // Narrow to the row with iMac
    const imacRow = cartTable.locator('tr', {
      has: page.locator('td.text-left > a', { hasText: 'iMac' })
    }).first();
    
    // Assert product name
    await expect(imacRow.locator('td.text-left > a')).toHaveText('iMac');
    
    // Assert quantity
    await expect(imacRow.locator('input[name^="quantity"]')).toHaveValue('1');    
    

});
