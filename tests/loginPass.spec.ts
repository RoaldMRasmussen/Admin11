import { test, expect } from '@playwright/test';
import { adminSites } from '../HelperFiles/createdEvent';
import dotenv from 'dotenv';

interface EnvVariables {
  USER_NAME: string;
  PASSWORD: string;
}
// Load environment variables from .env file
dotenv.config();

// Get environment variables
const env: EnvVariables = {
 USER_NAME: process.env.USER_NAME || '',
 PASSWORD: process.env.PASSWORD || ''
};
  if (!env.USER_NAME || !env.PASSWORD) {
    throw new Error('USER_NAME and PASSWORD environment variables must be set');
  }

test('LoginSuccess', async ({ page }) => {
  test.setTimeout(60000);

    for (const site of adminSites) {
      await page.goto(`https://${site}`);
   //   await page.waitForTimeout(2000);
      await page.getByRole('textbox', { name: 'Username' }).fill(env.USER_NAME);
      await page.getByRole('textbox', { name: 'Password' }).fill(env.PASSWORD);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      await expect(page.locator('#companyLogo')).toBeVisible();
    }
});


