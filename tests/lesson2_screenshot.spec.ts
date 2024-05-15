import { test, expect } from '@playwright/test';

test('screenshots test', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/sampleapp');
    await page.locator("body").screenshot({path: "body.png"});
    await page.getByText('Sample AppFill in and submit').screenshot({path: "container.png"})
  });
