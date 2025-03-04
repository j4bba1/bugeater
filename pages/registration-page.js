const { expect } = require('@playwright/test');

exports.RegistrationPage = class RegistrationPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInp = page.getByRole('textbox', { name: 'Email' });
    this.passwordInp = page.getByRole('textbox', { name: 'Password', exact: true });
    this.passwordRepeatInp = page.getByRole('textbox', { name: 'Repeat Password' });

    this.agreeTermCb = page.getByRole('checkbox', { name: 'By using this website, you' });
    this.registerBtn = page.locator('//button[@class="me-4 btn btn-primary"]');
  };

  async goto() {
    await this.page.goto('https://bugeater.web.app/app/account/register');
  };

  async fillData(email, password1, password2, isAgreeTerm) {
    await this.emailInp.fill(email);
    await this.passwordInp.fill(password1);
    await this.passwordRepeatInp.fill(password2);

    if(isAgreeTerm) {
        await this.agreeTermCb.check();
    };
  };
};