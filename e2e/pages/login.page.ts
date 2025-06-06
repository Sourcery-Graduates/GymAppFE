import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    credentialsError: Locator;

    constructor(private page: Page) {
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.credentialsError = this.page.locator('#credentials-error-toast > div > span');
    };

    async goto() {
        await this.page.goto('/');
    }
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async expectErrorMessage() {
        await expect(this.credentialsError).toHaveText('Invalid email or password. Please try again.');
    }
};
