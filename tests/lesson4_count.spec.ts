import { test, expect } from '@playwright/test';

test('To Do counter test', async ({ page }) => {
    await page.goto('https://sky-todo-list.herokuapp.com/', {waitUntil: "networkidle"});

    let countTasks = await page.locator('td').count();

    console.log(countTasks);

    expect(countTasks).toBeGreaterThanOrEqual(1);
});