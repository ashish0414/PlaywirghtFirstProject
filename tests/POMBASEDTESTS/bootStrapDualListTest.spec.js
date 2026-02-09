const { expect, test } = require("@playwright/test");
const { BootStrapDualListPage } = require("../../SeleniumPlaygroundPages/BootStrapDualListPage");
let bootStrapDualListPage;
test.describe('BootStrap Dual List Box Test Suite', () => {
  test.beforeEach(async ({ page }) => {
     bootStrapDualListPage = new BootStrapDualListPage(page)
    await bootStrapDualListPage.goto('https://www.testmuai.com/selenium-playground/bootstrap-dual-list-box-demo/');
  });

  test('should move selected items from left to right', async () => {
    const leftTableItems = await bootStrapDualListPage.getLeftTableItems();
    console.log('Left Table Items:', leftTableItems);
  await expect(bootStrapDualListPage.leftTableSearchBox).toBeVisible();
    // Move first item
    await bootStrapDualListPage.moveItemToRight(leftTableItems[0]);
  
    // Assert moved correctly
    await bootStrapDualListPage.expectItemInRightTable(leftTableItems[0]);
    await bootStrapDualListPage.expectItemNotInLeftTable(leftTableItems[0]);
  
    // Optional: check counts
    const rightItems = await bootStrapDualListPage.getRightTableItems();
    console.log('Right Table Items:', rightItems);
    await expect(bootStrapDualListPage.rightTableItems).toHaveCount(rightItems.length);

    const leftItems = await bootStrapDualListPage.getLeftTableItems();
    console.log('Left Table Items:', leftItems);
    await expect(bootStrapDualListPage.leftTableItems).toHaveCount(leftTableItems.length - 1);
  });

  test('should move selected items from right to left', async () => {
    let count = 0
    const leftTableItems = await bootStrapDualListPage.getLeftTableItems();
    const rightTableItems = await bootStrapDualListPage.getRightTableItems();
    console.log('Right Table Items:', rightTableItems);
  await expect(bootStrapDualListPage.rightTableSearchBox).toBeVisible();

  for (const item of rightTableItems) {
    console.log('Right Table Item:', item);
    await bootStrapDualListPage.moveItemToLeft(item);
    await bootStrapDualListPage.expectItemInLeftTable(item);
    await bootStrapDualListPage.expectItemNotInRightTable(item);
    count++
  }
  console.log('Count of items moved back to left:', count);
  await expect(bootStrapDualListPage.rightTableItems).toHaveCount(0);
  await expect(bootStrapDualListPage.leftTableItems).toHaveCount(leftTableItems.length + count);
    
  });

  

test('should move selected items all from left to right', async () => {
  let count = 0
  const leftTableItems = await bootStrapDualListPage.getLeftTableItems();
  const rightTableItems = await bootStrapDualListPage.getRightTableItems();
  console.log('Right Table Items:', rightTableItems);
await expect(bootStrapDualListPage.leftTableSearchBox).toBeVisible();

for (const item of leftTableItems) {
  console.log('Left Table Item:', item);
  await bootStrapDualListPage.moveItemToRight(item);
  await bootStrapDualListPage.expectItemInRightTable(item);
  await bootStrapDualListPage.expectItemNotInLeftTable(item);
  count++
}
console.log('Count of items moved to right:', count);
await expect(bootStrapDualListPage.rightTableItems).toHaveCount(rightTableItems.length + count);
await expect(bootStrapDualListPage.leftTableItems).toHaveCount(leftTableItems.length - count);
  
});


})