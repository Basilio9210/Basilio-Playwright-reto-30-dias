import {expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjectmodel/LoginPage';
import { SideMenuOption, Sidepanel } from '../components/Sidepanel';
//page =  feature





test('login to HRM with Auth', async ({ page }) => {

    /*const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()*/

    await page.goto("/web/index.php/dashboard/index")

    const sidepanel = new Sidepanel(page)
    await sidepanel.ClickOnOption(SideMenuOption.ADMIN)
    await sidepanel.ClickOnOption(SideMenuOption.PIM)
    await sidepanel.ClickOnOption(SideMenuOption.LEAVE)
    await sidepanel.ClickOnOption(SideMenuOption.TIME)
    await sidepanel.ClickOnOption(SideMenuOption.RECRUITMENT)
    await sidepanel.ClickOnOption(SideMenuOption.MY_INFO)
    await sidepanel.ClickOnOption(SideMenuOption.PERFORMANCE)
    await sidepanel.ClickOnOption(SideMenuOption.DASHBOARD)
    await sidepanel.ClickOnOption(SideMenuOption.DIRECTORY)
    await sidepanel.ClickOnOption(SideMenuOption.CLAIM)
    await sidepanel.ClickOnOption(SideMenuOption.BUZZ)

})


test('login to HRM without Auth', async ({ page }) => {

    /*const loginPage = new LoginPage(page)
    await loginPage.LoginAsAdmin()*/

    await page.goto("/web/index.php/dashboard/index")
    const sidepanel = new Sidepanel(page)
    await sidepanel.ClickOnOption(SideMenuOption.ADMIN)
    await sidepanel.ClickOnOption(SideMenuOption.PIM)
    await sidepanel.ClickOnOption(SideMenuOption.LEAVE)
    await sidepanel.ClickOnOption(SideMenuOption.TIME)
    await sidepanel.ClickOnOption(SideMenuOption.RECRUITMENT)
    await sidepanel.ClickOnOption(SideMenuOption.MY_INFO)
    await sidepanel.ClickOnOption(SideMenuOption.PERFORMANCE)
    await sidepanel.ClickOnOption(SideMenuOption.DASHBOARD)
    await sidepanel.ClickOnOption(SideMenuOption.DIRECTORY)
    await sidepanel.ClickOnOption(SideMenuOption.CLAIM)
    await sidepanel.ClickOnOption(SideMenuOption.BUZZ)

})


test('login As Employee', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.LoginAsEmployee()


})