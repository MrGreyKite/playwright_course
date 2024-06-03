import { Locator, Page } from "@playwright/test";

export class MainPage{
    private readonly page: Page;
    readonly cookieAcceptanceButton: Locator;
    readonly searchField: Locator;

    constructor(page: Page){
        this.page = page;
        this.cookieAcceptanceButton = page.locator(".cookie-policy button");
        this.searchField = page.locator("#search-field");
    }

    async openMainPage() {
        await this.page.goto("https://www.labirint.ru");
        await this.cookieAcceptanceButton.click();
    }

    async searchFor(query: string){
          await this.searchField.fill(query);
          await this.searchField.press("Enter");
    }
}