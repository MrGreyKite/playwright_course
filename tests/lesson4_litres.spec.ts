import { test, expect } from '@playwright/test';

let word_for_search = 'javascript';

test('litres sample test', async ({ page }) => {
    await page.goto('https://www.litres.ru');

    await page.getByPlaceholder('Искать на Литрес').fill(word_for_search);
    await page.getByTestId('search__button').click();

    await expect(page.getByTestId('search-title__wrapper')).toHaveText("Результаты поиска «javascript»");
    await expect(page.getByTestId('search-title__wrapper')).toHaveText(`Результаты поиска «${word_for_search}»`);
    await expect(page.getByTestId('search-title__wrapper')).toContainText("Результаты поиска");

});