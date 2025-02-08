//@ts-check
// import { assertUrl, logIn } from './baseTest';
// import { test, expect} from '@playwright/test';
import { assertUrl, logIn, test, expect } from './baseTest';



test.describe('ProductsPageTests', () => {
    test.describe.configure({ mode: 'serial' });


    test("Products Page Navigation", async ({ page }) => {

        console.log('Products Page Navigation');
        
        await logIn(page);

        await assertElementsVisibility(page);
    });


    test("Navigate through pages using side buttons", async ({ page }) => {
        
        console.log('Navigation through side buttons');
        
        await logIn(page);
        await assertElementsVisibility(page);

        const sideBarbuttons = page.locator('.sidebar nav ul li.nav-item ');
        
        // await expect(page.getByText('Product Create')).toBeVisible;
        
        await page.getByRole('link', { name: ' List' }).click();
        await assertUrl(page, 'product');
        await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible;
        
        await page.getByRole('link', { name: ' Create' }).click();
        await assertUrl(page, 'product/form');
        await expect(page.getByText('Product Create')).toBeVisible;
        
        await page.getByRole('link', { name: ' Videos' }).click();
        await assertUrl(page, 'videos');
        await expect(page.locator('video')).toBeVisible
        
        await page.getByRole('link', { name: ' Logout' }).click();
        await assertUrl(page, 'login');
        await expect(page.locator('.card-body.login-card-body')).toBeVisible();
    });

});




//Page specific HELPER METHODS
async function assertElementsVisibility(page){
    const expectedTexts = ["List", "Create", "Videos", "Logout"];
    const expectedCategoryOptions = 
    ["Select Category",
     "Electonics", //Typo bug from the website, should be electronics 
     "Clothing",
     "Home & Furnitures",
     "Beauty & Personal Care",
     "Sports & Outdoors"];
    
    //For SideBar
    const sideBarbuttons = page.locator('.sidebar nav ul li.nav-item ');
    
    await expect(page.locator('.sidebar')).toBeVisible;
    await expect(sideBarbuttons).toHaveCount(4);

    for (let i = 0; i < expectedTexts.length; i++) {
        await expect(sideBarbuttons.nth(i)).toHaveText(expectedTexts[i]);
    }

    //for products container
    const categoryDropdown = page.locator('.card-header select');
    const categoryOptions = page.locator('.card-header select option');
    await expect(categoryOptions).toHaveCount(6);
    
    await expect(page.locator('.card.p-2')).toBeVisible;
    await expect(page.getByRole('textbox', { name: 'Search Product...' })).toBeVisible;
    await expect (page.getByRole(categoryDropdown)).toBeVisible;
    await expect(page.locator('.btn.btn-secondary.btn-circle')).toBeVisible;
    await expect(page.locator('.card-body.table-responsive')).toBeVisible;
    await expect(page.locator('.page-link.inactiveCursor')).toBeVisible;

    for (let i = 0; i < expectedCategoryOptions.length; i++) {
        await expect(categoryOptions.nth(i)).toHaveText(expectedCategoryOptions[i]);
    }
}
