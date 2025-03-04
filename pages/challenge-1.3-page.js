const { expect } = require('@playwright/test');

exports.PageChall1_3 = class PageChall1_3 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.passwordInp = page.getByTestId('input_1');
    this.result = page.getByTestId('result');
    this.clearBtn = page.getByRole('button', { name: 'Clear Form' });
    this.submitBtn = page.getByTestId('submit');
  };

  async passwordRes(password, expextedText) {
    await this.firstNumInp.fill(password);
    await this.submitBtn.click();
  };
};