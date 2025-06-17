import { Page } from '@playwright/test';

const userEmail = process.env.USER_EMAIL!;
const userPassword = process.env.USER_PASSWORD!;

export async function loginProgrammatically(page: Page) {
  // Extract CSRF token value
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
