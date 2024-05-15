import { test, expect } from '@playwright/test';

test('Fill login form', async ({page}) =>{

    let url:string = 'http://uitestingplayground.com/sampleapp';
    const login : string = 'test_login';
    const pwd:string = 'pwd';

    await page.goto(url);
    await page.getByPlaceholder('User Name').fill(login);
    await page.locator('[name="Password"]').fill(pwd);

    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.locator('#loginstatus')).toHaveText('Welcome, ' + login + '!');
    
})