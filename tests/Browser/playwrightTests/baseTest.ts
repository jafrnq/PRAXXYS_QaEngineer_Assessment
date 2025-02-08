import { test as base, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

import * as dotenv from 'dotenv'

dotenv.config()

// Create and export the test instance
export const test = base;
export { expect };

// SETUP AND TEARDOWN
test.beforeEach(async ({ page }) => {
  await page.waitForLoadState(); // The promise resolves after 'load' event.

  await page.goto(process.env.BASE_URL || 'defaulturl.com'); 

  await assertUrl(page, 'login');
});


// Helper functions
export async function logIn(page: Page, email?: string, password?: string, remember?: string) {
  const userEmail = email ?? process.env.USERNAME ?? 'sampleemail@gmail.com';  
  const userPassword = password ?? process.env.PASSWORD ?? 'samplePassword';

  await page.getByPlaceholder('Email').fill(userEmail);
  await page.getByPlaceholder('Password').fill(userPassword);

  if (remember == 'yes') {
    await page.locator('.icheck-primary input').check();
  }
  
  await page.getByRole('button', { name: 'Sign In' }).click();
  
}

export async function assertUrl(page: Page, urlEnd: string) {
  const expUrl = `http://127.0.0.1:8000/${urlEnd}`;
  await expect(page).toHaveURL(expUrl); 
}

