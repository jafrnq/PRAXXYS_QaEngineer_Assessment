import { test, expect, request } from '@playwright/test';
import { logIn } from '../baseTest';

// test.afterAll(async ({ page }) => {
//     page.close();
// });



test.describe('HTTP Tests', () => {

    test("Test successful response", async ({ page }) => {
        const response = await page.goto('http://localhost:8000/');
        expect(response?.status()).toBe(200);
    });
});