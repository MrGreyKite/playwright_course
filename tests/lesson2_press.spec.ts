import { test, expect } from '@playwright/test';

test('zoom page', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/textinput');
    await page.locator("#newButtonName").fill("Abc")

    await page.locator("#newButtonName").press('Control+A');
    await page.locator("#newButtonName").press('Control+X');
    await page.locator("#newButtonName").press('Control+V');
    await page.locator("#newButtonName").press('Control+V');
    await page.locator("#newButtonName").press('Control+V');
  
    await page.locator("#updatingButton").click()
    await expect(page.locator("#updatingButton")).toHaveText("AbcAbcAbc")
  
});