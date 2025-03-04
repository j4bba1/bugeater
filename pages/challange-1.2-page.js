const { expect } = require('@playwright/test');

exports.PageChall1_2 = class PageChall1_2 {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNumInp = page.getByTestId('input_1');
    this.secondNumInp = page.getByTestId('input_2');
    this.result = page.getByTestId('result');
    this.clearBtn = page.getByRole('button', { name: 'Clear Form' });
    this.calcBtn = page.getByTestId('submit');

  };

  async numDiv(firstNum, secondNum, expectedText) {
    await this.firstNumInp.fill(firstNum);
    await this.secondNumInp.fill(secondNum);
    await this.calcBtn.click();
  };
};