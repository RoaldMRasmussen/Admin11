import { test, expect } from '@playwright/test';
import { adminSites } from '../HelperFiles/createdEvent';
import dotenv from 'dotenv';

interface EnvVariables {
  FAKE_NAME: string;
  FAKE_PASSWORD: string;
}
// Load environment variables from .env file
dotenv.config();

// Get environment variables
const env: EnvVariables = {
FAKE_NAME: process.env.FAKE_NAME || '',
FAKE_PASSWORD: process.env.FAKE_PASSWORD || ''
};
  if (!env.FAKE_NAME || !env.FAKE_PASSWORD) {
    throw new Error('USER_NAME and PASSWORD environment variables must be set');
  }

test('LoginFail', async ({ page }) => {
  for (const site of adminSites) {
    await page.goto(`https://${site}`);
    await page.getByRole('textbox', { name: 'Username' }).fill(env.FAKE_NAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(env.FAKE_PASSWORD);
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
}
await expect(page.getByText(/Invalid username\/password/i)).toBeVisible();
});

