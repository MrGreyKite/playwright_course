import { test, expect } from '@playwright/test';

test('click test', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/click');
    
    await page.locator("#badButton").click();
    
    expect(await page.locator("#badButton").getAttribute("class")).toMatch(/btn-success/);
  });

  test('checkbox and radio', async({page}) => {
    await page.goto('https://jqueryui.com/resources/demos/checkboxradio/default.html');
      
    await page.locator("[for=radio-1]").click();
    await page.locator("[for=checkbox-4]").click();
    await page.locator("[for=checkbox-nested-3]").click();
    await page.locator("[for=checkbox-nested-4]").click();
      
    await expect(page.locator("[for=radio-1]")).toHaveClass(/ui-checkboxradio-checked/);
    await expect(page.locator("[for=checkbox-4]")).toHaveClass(/ui-checkboxradio-checked/);
    await expect(page.locator("[for=checkbox-nested-3]")).toHaveClass(/ui-checkboxradio-checked/);
    await expect(page.locator("[for=checkbox-nested-4]")).toHaveClass(/ui-checkboxradio-checked/);
  });