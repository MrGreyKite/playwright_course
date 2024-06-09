import { test, request, expect } from '@playwright/test';
import * as fs from "fs";

test("download results", async ({request}) => {
    const url = "https://google.com/search?q=playwright";
    const response = await request.get(url);
    const body = await response.text();

    expect(response.status()).toEqual(200);
    fs.writeFileSync("index.html", body);
})