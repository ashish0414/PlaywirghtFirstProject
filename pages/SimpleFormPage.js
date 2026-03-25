import { CommonPage } from './commonPage';
import { expect } from '@playwright/test';

export class SimpleFormPage extends CommonPage {
  constructor(page) {
    super(page);
    this.messageInput = page.getByPlaceholder('Please enter your Message');
    this.showMessageButton = page.getByRole('button', { name: 'Get Checked Value' });
    this.outputMessage = page.locator('#message');
    
    this.firstValueInput = page.getByPlaceholder('Please enter first value');
    this.secondValueInput = page.getByPlaceholder('Please enter second value');
    this.getSumButton = page.getByRole('button', { name: 'Get Sum' });
    this.sumOutput = page.locator('#addmessage');
  }

  async enterMessage(message) {
    await this.messageInput.fill(message);
  }

  async submitMessage() {
    await this.showMessageButton.click();
  }

  async expectMessage(message) {
    await expect(this.outputMessage).toHaveText(message);
  }

  async enterFirstValue(val) {
    await this.firstValueInput.fill(String(val));
  }

  async enterSecondValue(val) {
    await this.secondValueInput.fill(String(val));
  }

  async clickGetSum() {
    await this.getSumButton.click();
  }

  async expectSum(val) {
    await expect(this.sumOutput).toHaveText(String(val));
  }
}

