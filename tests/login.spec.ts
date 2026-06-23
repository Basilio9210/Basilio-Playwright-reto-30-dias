import {expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjectmodel/LoginPage';
import { SideMenuOption, Sidepanel } from '../components/Sidepanel';
//page =  feature

test('login to HRM', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

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