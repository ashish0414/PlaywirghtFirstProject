//@ts-check
import { expect } from "@playwright/test";
import { Base } from "./Base";

export class FormSubmitPage extends Base {
  constructor(page) {
    super(page);
    this.nameInput = page.locator('#title')
    this.messageInput = page.locator('#description');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.loader = page.locator('#submit-control')
  }

  async fillForm(name, message) {
    await this.nameInput.fill(name);
    await this.messageInput.fill(message);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async loaderVerification() {
    await this.page.waitForTimeout(500) // Add a small delay to ensure the loader appears
    await expect(this.loader).toBeVisible();
  }
  async processingMessageVerification() {
    await expect(this.loader).toContainText('Ajax Request is Processing!');
  }
}