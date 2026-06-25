import { Page } from "@playwright/test";
import { JobMenu } from "./JobMenu";
import { UserManagment } from "./UserManagment";

export class TopBarMenu{

    readonly page: Page
    readonly userManagment: UserManagment
    readonly job: JobMenu

    /*

     */
    constructor(page: Page) {
        
        this.page= page
        this.userManagment = new UserManagment(page)
        this.job = new JobMenu(page)
        
    }


}