import { test, expect } from '@playwright/test';

test('e2e Labirinth search - nothing found', async ({ page }) => {
    await page.goto('https://www.labirint.ru');

    // принять политику куки
    await page.locator(".cookie-policy button").click();
    // ввести в строку поиска текст, по которому нет результатов
    await page.locator("#search-field").fill("Эйяфьядлайёкюдль");
    // нажать кнопку Enter
    await page.locator("#search-field").press("Enter");
    await expect(page.locator("h1").first()).toHaveText("Мы ничего не нашли по вашему запросу! Что делать?")
    //перейти в корзину и проверить тескст
    await page.goto("https://www.labirint.ru/cart");
    await expect(page.locator("#basket-step1-default .g-alttext-small.g-alttext-grey.g-alttext-head").first()).toHaveText("ВАША КОРЗИНА ПУСТА. ПОЧЕМУ?", {ignoreCase: true})

});