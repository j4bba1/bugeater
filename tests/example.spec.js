// @ts-check
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration-page';
import { LoginPage } from '../pages/login-page';
import { log } from 'console';
import { PageChall1_1 } from '../pages/challenge-1.1-page';
import { PageChall1_2 } from '../pages/challange-1.2-page';

test.describe('Register new account', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, context }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await page.getByRole('button', { name: 'Accept' }).click();
  });

  test('Register new account - invalid email', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
  
    const email = 'invalid'
    const password1 = 'Test123'
    const password2 = 'Test123'
    const isAgreeTerm = true;
  
    await registrationPage.fillData(email, password1, password2, isAgreeTerm);
    await expect(registrationPage.registerBtn).toBeEnabled();
    await registrationPage.registerBtn.click()
    await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
  });

  test('Register new account - password do not match', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
  
    const email = 'klxt@seznam.cz'
    const password1 = 'Test1234'
    const password2 = 'Test123'
    const isAgreeTerm = true;
  
    await registrationPage.fillData(email, password1, password2, isAgreeTerm);
    await expect(registrationPage.registerBtn).toBeEnabled();
    await registrationPage.registerBtn.click()
    await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
  });

  test('Register new account - checkbox with terms not checked', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
  
    const email = 'klxt@seznam.cz'
    const password1 = 'Test123'
    const password2 = 'Test123'
    const isAgreeTerm = false;
  
    await registrationPage.fillData(email, password1, password2, isAgreeTerm);
    await expect(registrationPage.registerBtn).toBeDisabled();
  });

  test('Register new account - already used email', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
  
    const email = 'klxt@seznam.cz'
    const password1 = 'Test123'
    const password2 = 'Test123'
    const isAgreeTerm = true;
  
    await registrationPage.fillData(email, password1, password2, isAgreeTerm);
    await expect(registrationPage.registerBtn).toBeEnabled();
    await registrationPage.registerBtn.click();
    await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
  });

  test.skip('Register new account - valid data', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
  
    const email = 'test@seznam.cz'
    const password1 = 'Test123'
    const password2 = 'Test123'
    const isAgreeTerm = true;
  
    await registrationPage.fillData(email, password1, password2, isAgreeTerm);
    await expect(registrationPage.registerBtn).toBeEnabled();
    await registrationPage.registerBtn.click();
    await expect(page.getByText('In case you have already')).toBeVisible();
  });

});

test.describe('Doing the challanges', () => {
  test.beforeEach('Go to homepage', async ({ page }) => {
    await page.goto('https://bugeater.web.app/app/list');
  });

  test.afterEach('Reset the challeange', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Over' }).click();
    await expect(page.getByText('Are you sure you want to')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click()
    await expect(page.locator('//li[@class="_learnChallengeListItem_1erpu_6"]')).toHaveCount(1);
  });

  test('Challenge #1.1: Number Addition', async ({ page }) => {
    const pageChall1_1 = new PageChall1_1(page);
    const numbers = [
      { firstNum: '1', secondNum: '2', expextedText: 'Result:  3'},
      { firstNum: '-2', secondNum: '4', expextedText: 'Result:  2'},
      { firstNum: '1.5', secondNum: '2.5',  expextedText: 'Result:  4.0'},
      { firstNum: 'abc', secondNum: '1',  expextedText: 'Result:  User input error'},
      { firstNum: '', secondNum: '',  expextedText: 'Result:  User input error'},
      { firstNum: '10000000000', secondNum: '1',  expextedText: 'Result:  Application Error'},
    ];

    await page.getByRole('link', { name: 'Challenge #1.1: Number' }).click();
    await expect(page).toHaveTitle('Number Addition (Learn Mode)');
    await page.locator('//button[@data-test-id="button-skip"]').click()

    for(const n of numbers) {
      await pageChall1_1.numAdd(n.firstNum, n.secondNum, n.expextedText);
      await page.waitForTimeout(1000);
      let resultText = await page.getByTestId('result').textContent();
      expect(resultText).toEqual(n.expextedText);
    }

    await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
    await page.getByRole('button', { name: 'Come Back' }).click();
  });

  test('Challenge #1.2: Number Divison', async ({ page }) => {
    const pageChall1_2 = new PageChall1_2(page);
    const numbers = [
      { firstNum: '4', secondNum: '2', expextedText: 'Result:  2'},
      { firstNum: '-10', secondNum: '2', expextedText: 'Result:  -5'},
      { firstNum: '5', secondNum: '2',  expextedText: 'Result:  2.5'},
      { firstNum: 'abc', secondNum: '1',  expextedText: 'Result:  User input error'},
      { firstNum: '', secondNum: '',  expextedText: 'Result:  User input error'},
      { firstNum: '10', secondNum: '0',  expextedText: 'Result:  Application Error'},
    ];

    await page.getByRole('link', { name: 'Challenge #1.2: Number' }).click();
    await expect(page).toHaveTitle('Number Division (Learn Mode)');
    await page.locator('//button[@data-test-id="button-skip"]').click()

    for(const n of numbers) {
      await pageChall1_2.numDiv(n.firstNum, n.secondNum, n.expextedText);
      await page.waitForTimeout(1000);
      let resultText = await page.getByTestId('result').textContent();
      expect(resultText).toEqual(n.expextedText);
    }

    await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
    await page.getByRole('button', { name: 'Come Back' }).click();
  });
});

