import { test, expect } from '@playwright/test';
import { loginProgrammatically } from '../../helpers/loginHelper';

test('setup: authenticate user', async ({ page }) => {
  //Act
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  await loginProgrammatically(page);
  await page.context().storageState({ path: './e2e/.auth/user.json' });
});
