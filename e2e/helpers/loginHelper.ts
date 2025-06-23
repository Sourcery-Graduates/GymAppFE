import { Page } from '@playwright/test';

export async function loginProgrammatically(page: Page, userEmail: string, userPassword: string) {
  // Extract CSRF token value from html
  const csrfToken = await page.getAttribute('input[name="_csrf"]', 'value');
  if (!csrfToken) {
    throw new Error('CSRF token not found');
  }

  const response = await page.request.post('http://localhost:8080/login', {
    headers: {
      'X-CSRF-Token': csrfToken,
    },
    form: {
      username: userEmail,
      password: userPassword,
    },
  });
  if (!response.ok()) throw new Error(`Failed to login: ${response.status()}`);
}
