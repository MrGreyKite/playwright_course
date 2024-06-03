import { Locator, Page, expect } from "@playwright/test";

export class CartPage{
    private readonly page: Page;
    readonly totalPrice: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.totalPrice = page.locator(".b-dotted-im-e-val").last();
        this.emptyCartMessage = page.locator("#basket-step1-default .g-alttext-small.g-alttext-grey.g-alttext-head");
    }

    async openCartPage() {
        await this.page.goto("https://www.labirint.ru/cart/");
    }

    async checkTotalPrice(priceToBe: string) {
        await expect(this.totalPrice).toHaveText(priceToBe);
    }

    async checkIfCartEmpty() {
        await expect(this.emptyCartMessage).toHaveText("ВАША КОРЗИНА ПУСТА. ПОЧЕМУ?", {ignoreCase: true})
    }


}