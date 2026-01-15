import { CommonPage } from './commonPage';

export class LoginPage extends CommonPage {
  async login(username, password) {
    await this.page.fill('#user', username);
    await this.page.fill('#pass', password);
  }
}
