import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    credentialsError: Locator;
    welcomeMessage: Locator;


    constructor(private page: Page) {
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.credentialsError = this.page.locator('#credentials-error-toast > div > span');
        this.welcomeMessage = this.page.getByTestId('welcome-message');
    };

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
};
