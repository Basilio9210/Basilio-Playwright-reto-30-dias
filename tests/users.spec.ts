import { expect, test } from "@playwright/test"
import { LoginPage } from "../pageobjectmodel/LoginPage"
import { SideMenuOption, Sidepanel } from "../components/Sidepanel"
import { asyncWrapProviders } from "node:async_hooks"
import { TopBarMenu } from "../components/top-bar-menu/TopBarMenu"
import { Navigate } from "../pageobjectmodel/Navigate"
import { AddNewUserPage } from "../pageobjectmodel/AddNewUser"
import { UserModel } from "../Models/UserModel"
import { UserFactory } from "../Factory/UserFactory"

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


test('Capture all numeric values', async ({ page }) => {

    await page.goto('/web/index.php/claim/viewAssignClaim')
    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const amounts: number[] = []

    const rowCount = await allBodyRows.count()
    console.log('Number of rows: ', rowCount)

    for (let i=0; i<rowCount; i++) {

        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()
        console.log('This is the amount in text: ', amountText);

        if (amountText === null) {
            continue
        }

        const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim())
        amounts.push(convertedNumber)

    }

    console.log(amounts)

    let total = 0

    for (let amount of amounts) {

        total += amount
    }

    console.log("Total is: ", total)

});


test('Add new user', async({page})=>{

  
    
    const navigate = new Navigate(page)
    await navigate.toDashboard()

    const sidepanel = new Sidepanel(page)
    await sidepanel.ClickOnOption(SideMenuOption.ADMIN)

    const topBarMenu = new TopBarMenu(page)
    await topBarMenu.userManagment.clickOnUserOption()

    const adminUser = UserFactory.createAdmin({
           
      employee: 'Qwerty LName'
    })
  
    const addNewUser = new AddNewUserPage(page)
    await addNewUser.addNewUser(adminUser)
    await addNewUser.checkUserWasAdded()

     /* 
    const randonUserName = 'pepe' + crypto.randomUUID().slice(0, 8)
    const password = 'R4andom123..*'
    const employeeToSearch = 'Qwerty LName'
    */
   
   
    /*const userToAdd: UserModel = {

        username : randonUserName,
        employee : employeeToSearch,
        password : password,
        confirmPassword : password,
        role :'ESS',
        status : 'Enabled'
    }*/


})



test('Debug table structure', async ({ page }) => {
    await page.goto('/web/index.php/claim/viewAssignClaim')
    
    // Esperar que la página cargue completamente
    await page.waitForLoadState('networkidle')
    
    // Ver qué clases usa OrangeHRM para la tabla
    const tableHTML = await page.locator('.oxd-table').innerHTML()
    console.log(tableHTML)
});

test('Calculate and Operate with all numeric values', async ({ page }) => {

    await page.goto('/web/index.php/claim/viewAssignClaim')
    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const amounts: number[] = []

    const rowCount = await allBodyRows.count()
    console.log('Number of rows: ', rowCount)

    for (let i = 0; i < rowCount; i++) {

        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()
        console.log('This is the amount in text: ', amountText)

        if (amountText === null) continue

        const convertedNumber = parseFloat(amountText.replace(/,/g, '').trim())

        // ✅ Validar que sea un número válido antes de agregarlo
        if (!isNaN(convertedNumber)) {
            amounts.push(convertedNumber)
        }
    }

    // ─── Cálculos ───────────────────────────────────────────────

    const sum     = amounts.reduce((acc, val) => acc + val, 0)
    const average = sum / amounts.length
    const max     = Math.max(...amounts)
    const min     = Math.min(...amounts)

    console.log('Amounts array : ', amounts)
    console.log('Sum           : ', sum.toFixed(2))
    console.log('Average       : ', average.toFixed(2))
    console.log('Max           : ', max.toFixed(2))
    console.log('Min           : ', min.toFixed(2))

    // ─── Assertions ─────────────────────────────────────────────

    expect(amounts.length).toBeGreaterThan(0)
    expect(sum).toBeCloseTo(8550.44, 2)      // 7300.32 + 1250.12 + 0.00
    expect(average).toBeCloseTo(2850.15, 2)  // sum / 3
    expect(max).toBeCloseTo(7300.32, 2)
    expect(min).toBeCloseTo(0, 2)
})