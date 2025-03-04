import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login-page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const email = 'klxt@seznam.cz';
    const password = 'test123';

    await loginPage.goto();
    await page.getByRole('button', { name: 'Accept' }).click();
    await loginPage.login(email, password);
    await expect(page.getByRole('link', { name: 'Follow the link to get the' })).toBeVisible();

    await page.context().storageState({ path: authFile });
});