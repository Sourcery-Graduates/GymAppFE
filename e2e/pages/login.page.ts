import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    credentialsError: Locator

    constructor(private page: Page) {
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.credentialsError = this.page.locator('#credentials-error-toast > div > span')
    };
};
