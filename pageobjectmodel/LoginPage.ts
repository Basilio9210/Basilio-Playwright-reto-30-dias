import { Locator, Page } from  "@playwright/test";

export class LoginPage{

    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordnameInput: Locator
    readonly loginButton: Locator
   
    constructor(page: Page) {
        
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordnameInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        
    }

    async doLogin(username: string, password: string){

    await this.page.goto('/web/index.php/auth/login')
    await this.usernameInput.fill(username)
    await this.passwordnameInput.fill(password)
    await this.loginButton.click()


    }
}