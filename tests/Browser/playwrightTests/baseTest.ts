import { expect, test as test } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';


const validEmail = 'stracke.ali@example.net';
const validPassword = 'password';

// SETUP AND TEARDOWN

// test.beforeAll(async ({ page }) => {
  //   console.log('Running setUp hook');
  //   await page.goto('http://127.0.0.1:8000');
  //   await assertUrl(page, 'login');

  // });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8000');
    await assertUrl(page, 'login');
  });
  
  test.afterAll(async ({ page }) => {
    console.log('Running tearDown hook');
    await page.close();
  });


    export async function logIn(page: Page, email?: string, password?: string, remember?: string) {
    const userEmail = email ?? 'stracke.ali@example.net';  // Default email if not provided
    const userPassword = password ?? 'password';          // Default password 

    await page.getByPlaceholder('Email').fill(userEmail);
    await page.getByPlaceholder('Password').fill(userPassword);

    if (remember == 'yes') {
      await page.locator('.icheck-primary input').check();
    }
    
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    try {
      await assertUrl(page, 'product');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  export async function assertUrl(page: Page, urlEnd: string) {
    const expUrl = `http://127.0.0.1:8000/${urlEnd}`;
    await expect(page).toHaveURL(expUrl); 
  }

  

export { expect, test} from '@playwright/test';
export {validEmail, validPassword};

  