export class CommonPage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }
}
