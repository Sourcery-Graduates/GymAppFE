import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    
    welcomeMessage: Locator;

    constructor(private page: Page) {
        this.welcomeMessage = this.page.getByTestId('welcome-message');
    };

    async expectWelcomeMessage() {
        await expect(this.welcomeMessage).toHaveText('Welcome to Gym App!');
    }
};
