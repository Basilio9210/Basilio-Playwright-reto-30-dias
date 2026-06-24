import { Locator, Page, expect } from  "@playwright/test";
import { Environment } from "../config/Environment";

export class LoginPage{

    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordnameInput: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator
   
    constructor(page: Page) {
        
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordnameInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.getByTestId('alert');
        
    }

    async doLogin(username: string, password: string){

    await this.page.goto('/web/index.php/auth/login')
    await this.usernameInput.fill(username)
    await this.passwordnameInput.fill(password)
    await this.loginButton.click()

    }

    async expectError(message: string) {
    
        await expect(this.errorMessage);

  }

  async LoginAsAdmin(){
    await this.doLogin(Environment.ADMIN_USERNAME, Environment.ADMIN_PASSWORD)
  }



  async LoginAsEmployee(){
    await this.doLogin(Environment.EMPLOYEE_USERNAME, Environment.EMPLOYEE_PASSWORD)
  }
}