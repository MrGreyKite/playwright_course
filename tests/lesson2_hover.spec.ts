import { test, expect } from '@playwright/test';

test('hover image caption', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    let user_number = 2;
    let user_avatar = page.locator(".figure").nth(user_number - 1);
    let user_info = user_avatar.locator(".figcaption h5");

    await user_avatar.hover();
    await expect(user_info).toBeVisible();
    await expect(user_info).toHaveText('name: user' + user_number);
}
)