import { Locator, Page } from "@playwright/test";

export class HomePage {
    
    welcomeMessage: Locator;

    constructor(private page: Page) {
        this.welcomeMessage = this.page.getByRole('heading', { name: 'Welcome to Gym App!' })
    };
};
