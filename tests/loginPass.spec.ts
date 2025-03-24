import { test, expect } from '@playwright/test';

test('LoginSuccess', async ({ page }) => {
  test.setTimeout(60000);
  
    const adminSites = ['admin4.xyvid.com', 'admin6.xyvid.com', 'admin8.xyvid.com', 'admin11.xyvid.com'];

    for (const site of adminSites) {
      await page.goto(`https://${site}`);
   //   await page.waitForTimeout(2000);
      await page.getByRole('textbox', { name: 'Username' }).fill('mrasmussen@xyvid.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('@HaleyAnnika1');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      await expect(page.locator('#companyLogo')).toBeVisible();
    }
});


