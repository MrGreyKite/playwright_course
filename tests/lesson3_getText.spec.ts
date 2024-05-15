import { test, expect } from '@playwright/test';

test.describe("Starting page textes", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://inzhenerka.tech/');
    });

    test('Тест заголовка', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('ИнженеркаТех');
    });
    
    test('Тест текста под заголовком', async ({ page }) => {
        await expect(page.locator('[field="descr"]').first())
        .toHaveText('Помогаем инженерам повысить свою квалификацию на рынке труда и приобрести навыки международного уровня')
    });
  });