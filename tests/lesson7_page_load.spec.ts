import { test, expect } from '@playwright/test';

test('With custom waiting at loading', async ({ page }) => {
    await page.goto('https://habr.com/ru/feed/', {timeout: 10000, waitUntil: 'domcontentloaded'});

    await expect(page.locator('h1.tm-section-name__text')).toHaveText('Моя лента')

});