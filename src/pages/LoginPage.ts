import { expect, Locator, Page } from "@playwright/test";
import { CustomLogger } from "../loggers/CustomLogger";

export class LoginPage{
    readonly page: Page
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly productsTitleText: Locator;
    
    private logger = CustomLogger.getInstance();

    constructor(page:Page){
        this.page = page
        this.usernameInput = page.locator('#user-name')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('#login-button')
        this.productsTitleText = page.locator('[data-test="title"]');        
    }

    async goto(){
        this.logger.info("Navigating to Sauce Demo Page")
        await this.page.goto("https://www.saucedemo.com")
    }

    async login(username:string, password:string){
       this.logger.info("Logging to Sauce Demo Page")
       await this.usernameInput.fill(username);
       await this.passwordInput.fill(password);
       await this.loginButton.click();
    }  

    async verifyLoginSuccess(){
        await expect(this.productsTitleText).toHaveText('Products');
        this.logger.success("Successfully Logged in!!")
    }


}
