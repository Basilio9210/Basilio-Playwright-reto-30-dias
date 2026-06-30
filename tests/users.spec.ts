import { expect, test } from "@playwright/test"
import { LoginPage } from "../pageobjectmodel/LoginPage"
import { SideMenuOption, Sidepanel } from "../components/Sidepanel"
import { asyncWrapProviders } from "node:async_hooks"

test('Get all the usernames registered', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')
    



    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row')
    const usernames: string[] = []

    const rowCount = await rows.count()

    for (let i = 1; i < rowCount; i++) {

        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if (username) {
            usernames.push(username)
        }

        

        
    }

    console.log(usernames)

})

test('Select specific user for edition', async ({ page }) => {

    const userforEdition = 'Mohamed5555'

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const pencilToEdit = page.
    getByRole('table').
    getByRole('row').
    filter({ hasText: userforEdition }).
    locator('button').
    filter({ has: page.locator(' i.bi-pencil-fill') })

    await pencilToEdit.click()

    const currentUsername = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div//input").
    inputValue()
    await expect(currentUsername).toEqual(userforEdition)
    await expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div//input")).toHaveValue(currentUsername)
   
    
    

})

test('Show Invalid credentials', async ({ page }) => {
  
  const loginPage = new LoginPage(page);

  await loginPage.doLogin('user@test.com', 'wrong-password')
  await loginPage.expectError('Invalid credentials');


});

test('Check User Roles Options', async({page})=>{


    const expectedRoleOptions = [ '-- Select --', 'Admin', 'ESS']
    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin();

    const sidepanel = new Sidepanel(page)
    await sidepanel.ClickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentUserRoleOptions)

    expect(currentUserRoleOptions).toEqual(expectedRoleOptions)
});


test(('Filter User Admin'), async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin();

    const sidepanel = new Sidepanel(page)
    await sidepanel.ClickOnOption(SideMenuOption.ADMIN)

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    //Filas  que contienen rol Admin
    const currentAdminRows= allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })

    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin users before filtering', expectedAdminCount)

    //Aplicar filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole('listbox').getByRole('option', {name: 'Admin'}).click();
    await page.getByRole('button', {name: 'Search'}).click()

    //Tabla filtrada deberia tener la misma cantidad  que encontramos

    await expect(allBodyRows).toHaveCount(expectedAdminCount)

    for(let i=0; i<expectedAdminCount; i++){

        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }
    

})