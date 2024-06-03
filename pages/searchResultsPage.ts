import { Locator, Page, expect } from "@playwright/test";

export class SearchResultPage{
    private readonly page: Page;
    private readonly cards: Locator;
    readonly emptySearchResultMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.cards = page.locator(".product-card");
        this.emptySearchResultMessage = page.locator("h1").first();
    }

    async getPriceForItem(index: number){
        const price = await this.cards.nth(index).locator(".product-card__price-current").textContent()
        return price.trim();
    }

    async addItemToCart(index: number){
        await this.cards.nth(index).locator(".buy-link").click();
    }

    async checkIfSearchEmpty() {
        await expect(this.emptySearchResultMessage).toHaveText("Мы ничего не нашли по вашему запросу! Что делать?");
    }


}