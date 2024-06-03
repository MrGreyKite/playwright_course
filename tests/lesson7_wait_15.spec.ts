import { test, expect } from '@playwright/test';

test('With custom waiting at expectation', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');

    await page.getByText('Button Triggering AJAX Request').click()

    await expect(page.locator('.bg-success')).toHaveText('Data loaded with AJAX get request.', {timeout: 25000});
});