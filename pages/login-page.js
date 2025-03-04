const { expect } = require('@playwright/test');
const { log } = require('console');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInp = page.getByRole('textbox', { name: 'Email' });
    this.passwordInp = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  };

  async goto() {
    await this.page.goto('https://bugeater.web.app/app/account/login');
  };

  async login(email, password) {
    await this.emailInp.fill(email);
    await this.passwordInp.fill(password);
    await this.loginBtn.click();
  };
};