import { test, expect, Page } from '@playwright/test';

test("Поиск по сайту", async ({ page }) => {
    await openMainPage(page);
    await searchFor(page, "javascript");
    const card = page.locator(".product-card").first();
    const price = (await card.locator(".product-card__price-current").textContent()).trim();
    await card.locator(".buy-link").click();
    await openCartPage(page);
    await expect(page.locator(".b-dotted-im-e-val").last()).toHaveText(price);
  });

  test('Поиск без результатов', async ({ page }) => {
    await openMainPage(page);
    await searchFor(page, "Эйяфьядлайёкюдль");
    await expect(page.locator("h1").first()).toHaveText("Мы ничего не нашли по вашему запросу! Что делать?")
    await openCartPage(page);
    await expect(page.locator("#basket-step1-default .g-alttext-small.g-alttext-grey.g-alttext-head").first()).toHaveText("ВАША КОРЗИНА ПУСТА. ПОЧЕМУ?", {ignoreCase: true})

});

async function openMainPage(page: Page){
    await page.goto('https://www.labirint.ru');
    await page.locator(".cookie-policy button").click();
 }

 async function searchFor(page: Page, query: string) {
    await page.locator("#search-field").fill(query);
    await page.locator("#search-field").press("Enter");
 }

 async function openCartPage(page: Page){
    await page.goto("https://www.labirint.ru/cart");
  }