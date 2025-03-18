import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    const adminSites = ['admin4.xyvid.com', 'admin6.xyvid.com', 'admin8.xyvid.com', 'admin11.xyvid.com'];

    for (const site of adminSites) {
      await page.goto(`https://${site}`);
      await page.getByRole('textbox', { name: 'Username' }).fill('mrasmussen@xyvid.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('@HaleyAnnika');
      await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    }
});

test('LoginFail', async ({ page }) => {
await expect(page.getByText(/Invalid username\/password/i)).toBeVisible();
});


test('LoginFail1', async ({ page }) => {
  const adminSites = ['admin4.xyvid.com', 'admin6.xyvid.com', 'admin8.xyvid.com', 'admin11.xyvid.com'];

  for (const site of adminSites) {
    await page.goto(`https://${site}`);
    await page.getByRole('textbox', { name: 'Username' }).fill('mrasmussen@xyvid.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('@HaleyAnnika');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  }
await expect(page.getByText(/Invalid username\/password/i)).toBeVisible();
});

