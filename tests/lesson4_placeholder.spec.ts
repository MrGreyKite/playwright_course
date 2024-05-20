import { test, expect } from '@playwright/test';

test('auth test as standart user', async ({ page }) => {
    const login = 'standard_user';
    const pass = 'secret_sauce';

    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill(login);
    await page.getByPlaceholder('Password').fill(pass);

    await page.getByText('Login').click();

//    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});