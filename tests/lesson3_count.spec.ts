import { test, expect } from '@playwright/test';


const baseUrl = 'https://www.ebay.com/sch/i.html?_nkw=nike&_ipg';
const testCases = [120, 240, 60];

test.describe('Test counter with dynamic URL', () => {
  testCases.forEach((expectedCount, index) => {
    let url = `${baseUrl}=${expectedCount}`;

    test(`Тест #${index + 1} - Проверка количества товаров на URL: ${url}`, async ({ page }) => {
      await page.goto(url);
      const elements = page.locator("li.s-item[data-gr4]");
      await expect(elements).toHaveCount(expectedCount);
    });
  });
});