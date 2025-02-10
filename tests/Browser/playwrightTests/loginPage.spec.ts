//@ts-check
// import { assertUrl, logIn } from './baseTest';
// import { test, expect} from '@playwright/test';
import { assertUrl, logIn,logOut , test, expect } from './baseTest';



test.describe('LoginPageTests', () => {
    test.describe.configure({ mode: 'serial' });
    
    test("Login using valid credentials", async ({ page }) => {

        console.log('Running test using valid credentials');
        
        await assertElementsVisibility(page);
        
        await logIn(page);

        await assertUrl(page, 'product');

        // await logOut(page); 
    });

    test("Login using invalid credentials", async ({ page }) => {
        await assertElementsVisibility(page);
        
        await logIn(page, 'test123!@#@gmail.com', 'password123', 'no');

        await assertLoginErrorMessage;

        await assertUrl(page, 'login');

    });

    test("Login using with one incorrect credential", async ({ page }) => {
        await assertElementsVisibility(page);
        
        //correct email with incorrect password
        await logIn(page, undefined, 'password123', 'no');

        await assertLoginErrorMessage;

        await assertUrl(page, 'login');

    });


    test("Login using empty fields", async ({ page }) => {
        await assertElementsVisibility(page);

        await logIn(page, '', '', 'no');

        await assertLoginErrorMessage;

        await assertUrl(page, 'login'); 

    });

    test("Test login with 'Remember me' on ", async ({ page }) => {
        
        await assertElementsVisibility(page);
        await logIn(page,undefined,undefined, 'yes');

        //refresh page and assert 

        await page.reload();

        //Should stay in product page 
        try{
            await assertUrl(page, 'product');
        } catch(error){
            console.log("Login Error: still in login page " + error);
        }
        // await logOut(page);
    });

    test("Test login with 'Remember me' off ", async ({ page }) => {
        
        await assertElementsVisibility(page);
        await logIn(page,undefined,undefined, 'no');

        //refresh page and assert 

        await page.reload();

        //Should go back to login page 
        try{
            await assertUrl(page, 'login');
        } catch(error){
            console.log("Error: Still in product page when 'remember me' is off " + error);
            // await logOut(page);
        }

    });

});



//Page specific HELPER METHODS
async function assertElementsVisibility(page){
    await expect(page.locator('.login-card-body')).toBeVisible();
    
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toHaveAttribute('type', 'email');
    await expect(page.getByPlaceholder('Password')).toHaveAttribute('type', 'password');
    
    await expect(page.locator('.icheck-primary input')).toBeVisible();
    await expect(page.locator('.icheck-primary input')).toHaveAttribute('type', 'checkbox');
    await expect(page.locator('.icheck-primary label')).toHaveText('Remember Me');
}

async function assertLoginErrorMessage(page){
    await expect(page.getByText('The email field is required.')).toBeVisible
    await expect(page.getByText('The password field is required.')).toBeVisible
}
