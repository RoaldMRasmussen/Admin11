import { test, expect } from '@playwright/test';
import { adminSites } from '../HelperFiles/newEventHelper';
import { ENV } from '../HelperFiles/envHelper';

test('LoginFail', async ({ page }) => {
  for (const site of adminSites) {
    await page.goto(`https://${site}`);
    await page.getByRole('textbox', { name: 'Username' }).fill(ENV.FAKE_NAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(ENV.FAKE_PASSWORD);
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  }
  await expect(page.getByText(/Invalid username\/password/i)).toBeVisible();
});

