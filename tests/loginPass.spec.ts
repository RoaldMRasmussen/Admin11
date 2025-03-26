import { test, expect } from '@playwright/test';
import { adminSites } from '../HelperFiles/newEventHelper';
import { ENV } from '../HelperFiles/envHelper';

test('LoginSuccess', async ({ page }) => {
  test.setTimeout(60000);

    for (const site of adminSites) {
      await page.goto(`https://${site}`);
   //   await page.waitForTimeout(2000);
      await page.getByRole('textbox', { name: 'Username' }).fill(ENV.USER_NAME);
      await page.getByRole('textbox', { name: 'Password' }).fill(ENV.PASSWORD);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      await expect(page.locator('#companyLogo')).toBeVisible();
    }
});


