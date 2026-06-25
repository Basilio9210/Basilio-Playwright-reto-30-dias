import { Locator, Page } from "@playwright/test";

export class UserManagment{

        readonly page: Page
        readonly userMangement: Locator
        readonly userOption: Locator
        
        
    constructor(page: Page) {
        
        this.page= page
        this.userMangement = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management')
        this.userOption =  page.getByRole('menuitem', { name: 'Users' })
        
    }

    
    async clickOnUserManagement() {
        await this.userMangement.click()
    }

    async clickOnUserOption() {
        this.clickOnUserManagement()
        await this.userOption.click()
    }
}