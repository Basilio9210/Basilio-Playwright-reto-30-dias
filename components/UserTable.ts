import { Locator, Page, expect } from "@playwright/test";

export class UserTable {

 readonly page: Page

    constructor(page: Page) {
       
        this.page = page
    }

    private getAllBodyRows():Locator{

        return this.page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    }

    private getAdminRows():Locator{
    const allBodyRows = this.getAllBodyRows()    
    //Filas  que contienen rol Admin
    const currentAdminRows= allBodyRows.filter({
        has: this.page.getByRole('cell').nth(2).getByText('Admin')
    })

    return currentAdminRows

    }

    private async getFirstAdminFromTable(): Promise<Locator>{

    const currentAdminRows = this.getAllBodyRows()
    const FirstAdminToSearch = currentAdminRows.nth(0)
    await expect(FirstAdminToSearch, 'No admin users found in the table').toHaveCount(1)
    return FirstAdminToSearch

    }

    async editFirstAdminOnTable(){
        const FirstAdminToEdit = await this.getFirstAdminFromTable()

        

    await FirstAdminToEdit.
    locator('button').
    filter({ has: this.page.locator(' i.bi-pencil-fill') }).click()

    }

 async clickOnDeleteActionByUsername(username: string){
    const allBodyRows = this.getAllBodyRows()
    const filterRowsByUserName = allBodyRows.filter({
        has: this.page.getByRole('cell').nth(1).getByText(username)
    })

    await expect(filterRowsByUserName, `No rows contain user name: ${username} were found`).toHaveCount(1)

    await filterRowsByUserName.locator('.bi-trash').click()
}

    

    async acceptToDeleteUser(){

        await this.page.locator("//button[normalize-space()='Yes, Delete']").click()
    } 
     

}





