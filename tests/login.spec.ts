import {expect, test } from '@playwright/test';
//page =  feature

test('login to HRM', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

})