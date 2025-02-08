// import { assertUrl, logIn } from './baseTest';
// import { test, expect} from '@playwright/test';
import { assertUrl, logIn, test, expect } from './baseTest';


test.describe('CreateProductTests', () => {
    test.describe.configure({ mode: 'serial' });


    test("Creating a new product", async ({ page }) => {

        console.log('Products Page Navigation');

        const filePath = 'storage/app/public/forUpload/upload1.jpg';
        
        await logIn(page);
        // await assertElementsVisibility(page);

        const createButton = page.getByRole('link', { name: 'Create', exact: true });
        await createButton.click();

        //Step 1 
        const nameField =  page.locator('input[type="text"]');
        const categoryDropdown =  page.getByRole('combobox');
        const descField = page.getByRole('textbox', { name: 'Editor editing area: main' });

        await nameField.fill('Test123!@#');
        await categoryDropdown.selectOption('2');
        await categoryDropdown.selectOption('1');
        await categoryDropdown.selectOption('3');
        await categoryDropdown.selectOption('4');
        await categoryDropdown.selectOption('5');
        
        await descField.click();
        await descField.fill('Test123!@#');
        await page.waitForTimeout(500);
        await page.getByText('Next').click();

        //Step 2
        // await page.getByRole('link', { name: '+' }).click();
        await page.locator('input[type="file"]').setInputFiles(filePath);
        await page.getByText('Next').click();

        //Step 3
        await page.getByRole('textbox', { name: 'Datepicker input' }).click();
        await page.getByRole('button', { name: 'Open years overlay' }).click();

        await page.getByText('2001').click();
        await page.getByRole('button', { name: 'Open months overlay' }).click();
        await page.getByText('Dec').click();
        await page.getByText('6').nth(1).click();
        
        await page.getByRole('button', { name: 'Select' }).click();
        await page.getByText('Submit').click();

        //Assert Success Message
        await expect(page.getByRole('dialog', { name: 'Successfully Saved!' })).toBeVisible;
        await page.getByRole('button', { name: 'OK' }).click();
        console.log('Product successfully created');
        
        //Cannot assert if item is visible in the list as the list page is broken
    });

    test("Creating product with missing inputs in step 1", async ({ page }) => {
        console.log('Asserting the error messages');
        
        await logIn(page);
        const createButton = page.getByRole('link', { name: 'Create', exact: true });
        await createButton.click();(page);
        
        //Step 1 
        const nameField =  page.locator('input[type="text"]');
        const categoryDropdown =  page.getByRole('combobox');
        const descField = page.getByRole('textbox', { name: 'Editor editing area: main' });

    
        await nameField.fill('');
        await descField.fill('');
        await page.waitForTimeout(500);
        await page.getByText('Next').click();

        //should catch the error message
        await expect(page.getByText('Name is required.')).toBeVisible
        await expect(page.getByText('Category is required.')).toBeVisible
        await expect(page.getByText('Description is required.')).toBeVisible
    });

});
