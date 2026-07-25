import { SideMenuOption, Sidepanel } from "../components/Sidepanel";
import { TopBarMenu } from "../components/top-bar-menu/TopBarMenu";
import playwrightConfig from "../playwright.config";
import { Page } from "@playwright/test";

export class Navigate{

    /**
     *
     */
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async toDashboard(){
        await this.page.goto('/web/index.php/dashboard/index')
    }


    async toUsers(){
        await this.toDashboard()
    
        const sidepanel = new Sidepanel(this.page)
        await sidepanel.ClickOnOption(SideMenuOption.ADMIN)
    
        const topBarMenu = new TopBarMenu(this.page)
        await topBarMenu.userManagment.clickOnUserOption()

    } 
 

}