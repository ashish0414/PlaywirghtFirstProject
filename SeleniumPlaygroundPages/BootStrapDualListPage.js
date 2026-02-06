import { expect } from "@playwright/test";
import { Base } from "./Base";

export class BootStrapDualListPage extends Base {
  constructor(page) {
    super(page);

    this.leftTable = page.locator('.dual-list.list-left');
    this.rightTable = page.locator('.dual-list.list-right');

    this.moveRightButton = page.locator('button.move-right');
    this.moveLeftButton = page.locator('button.move-left');

    this.leftTableSearchBox = this.leftTable.getByRole('textbox', { name : 'search'});
    this.rightTableSearchBox = this.rightTable.getByRole('textbox', { name : 'search'});

    this.leftTableItems = this.leftTable.locator('li.list-group-item');
    this.rightTableItems = this.rightTable.locator('li.list-group-item');
  }

  async moveItemToRight(itemText) {
    await this.leftTableSearchBox.fill(itemText);

    const items = this.leftTableItems.filter({ hasText: itemText });
    await expect(items).toHaveCount(1);

    await items.first().click();
    await this.moveRightButton.click();
    await this.leftTableSearchBox.clear();
  }

  async moveItemToLeft(itemText) {
    await expect(this.rightTableSearchBox).toBeVisible();
    await this.rightTableSearchBox.fill(itemText);

    const items = this.rightTableItems.filter({ hasText: itemText });
    await expect(items).toHaveCount(1);

    await items.first().click();
    await this.moveLeftButton.click();
    await this.rightTableSearchBox.clear();
  }

  async expectItemInRightTable(itemText) {
    await expect(
      this.rightTableItems.filter({ hasText: itemText })
    ).toHaveCount(1);
  }

  async expectItemInLeftTable(itemText) {
    await expect(
      this.leftTableItems.filter({ hasText: itemText })
    ).toHaveCount(1);
  }

  async expectItemNotInRightTable(itemText) {
    await expect(
      this.rightTableItems.filter({ hasText: itemText })
    ).toHaveCount(0);
  }

  async expectItemNotInLeftTable(itemText) {
    await expect(
      this.leftTableItems.filter({ hasText: itemText })
    ).toHaveCount(0);
  }

  async getLeftTableItems() {
    return (await this.leftTableItems.allTextContents()).map(t => t.trim());
  }

  async getRightTableItems() {
    return (await this.rightTableItems.allTextContents()).map(t => t.trim());
  }
}
