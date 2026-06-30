import {test as setup, expect} from '@playwright/test'
import { LoginPage } from '../pageobjectmodel/LoginPage'

setup('Authentication as Admin', async({page})=>{

    console.log('Auth started using setup')

    //Star session
    const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()

    //Make sure the login was successful

    await expect (page.getByRole('link', {name: 'Admin'})).toBeVisible()

    //Save status

    await page.context().storageState({path: '.auth/admin.json'})

    console.log('Auth completed using setup')
})