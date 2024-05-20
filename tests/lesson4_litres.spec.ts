import { test, expect } from '@playwright/test';

test('litres sample test', async ({ page }) => {
    await page.goto('https://www.litres.ru');

    await page.getByPlaceholder('Искать на Литрес').fill('javascript');
    await page.getByTestId('search__button').click();

    await expect(page.getByTestId('search-title__wrapper')).toHaveText('Результаты поиска «javascript»');

});