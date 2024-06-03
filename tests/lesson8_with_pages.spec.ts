import { MainPage } from "../pages/mainPage";
import { SearchResultPage } from "../pages/searchResultsPage";
import { CartPage } from "../pages/cartPage";
import { test } from '@playwright/test';

test("Поиск по сайту c добавлением в корзину", async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchResults = new SearchResultPage(page);
    const cartPage = new CartPage(page);

    await mainPage.openMainPage();
    await mainPage.searchFor('javascript');

    const priceToBe = await searchResults.getPriceForItem(0);
    await searchResults.addItemToCart(0);

    await cartPage.openCartPage();
    await cartPage.checkTotalPrice(priceToBe);
    
});


test('Поиск без результатов', async ({ page }) => {
    const mainPage = new MainPage(page); 
    const searchResults = new SearchResultPage(page);
    const cartPage = new CartPage(page);

    await mainPage.openMainPage();
    await mainPage.searchFor('Эйяфьядлайёкюдль');

    await searchResults.checkIfSearchEmpty();

    await cartPage.openCartPage();
    await cartPage.checkIfCartEmpty();
});
