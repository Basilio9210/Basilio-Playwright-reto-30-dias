import { expect, test } from "@playwright/test"
import { LoginPage } from "../pageobjectmodel/LoginPage"
import { SideMenuOption, Sidepanel } from "../components/Sidepanel"

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
})