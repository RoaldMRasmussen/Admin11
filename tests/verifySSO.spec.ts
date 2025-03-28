import { test, expect } from '@playwright/test';
import { ENV } from '../HelperFiles/envHelper';
import { createdContentModule, createdVanityURLs, portalSites, adminSites } from '../HelperFiles/newEventHelper';

test.describe('Verify SSO for Portal Sites', () => {
  // Create events for all admin sites before running the tests
  test.beforeAll(async ({ page }) => {
    console.log('Creating events for all admin sites...');
    for (const site of adminSites) {
      console.log(`Creating event for admin site: ${site}`);
      await createdContentModule(page, site); // Create an event for the admin site
    }
    console.log('Events created successfully:', createdVanityURLs);
  });

  // Test SSO for each portal site
  test('SSOTest-Pass', async ({ page }) => {
    // Ensure the number of portalSites matches the number of adminSites
    if (Object.keys(createdVanityURLs).length !== portalSites.length) {
      throw new Error('Mismatch between adminSites and portalSites. Ensure they correspond correctly.');
    }

    // Loop through portalSites and navigate using the corresponding vanityURL
    for (let index = 0; index < portalSites.length; index++) {
      const portalSite = portalSites[index];
      const adminSite = Object.keys(createdVanityURLs)[index]; // Match portalSite to adminSite
      const vanityURL = createdVanityURLs[adminSite];

      console.log(`Testing SSO for portal site: ${portalSite} with vanity URL: ${vanityURL}`);

      // Debug: Log the constructed URL
      const targetURL = `https://${portalSite}/${vanityURL}`;
      console.log(`Navigating to: ${targetURL}`);

      // Navigate to the portal site with the vanity URL
      await page.goto(targetURL);

      // Perform SSO verification
      await expect(page).toHaveURL(targetURL);

      // Use the USER_NAME from the envHelper.ts file and fill the login form
      await page.getByRole('textbox', { name: 'Email' }).fill(ENV.USER_NAME || '');

      await page.getByRole('button', { name: 'Submit' }).click(), // Click the Submit button

      // Wait for the 'Sign in' text to appear
      await page.waitForSelector('text=Sign in', { timeout: 10000 });

      // Verify the 'Sign in' text is visible
      await expect(page.getByText('Sign in')).toBeVisible();

      await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill(ENV.USER_NAME || '')
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(ENV.PASSWORD2 || '');
      await page.getByRole('button', { name: 'Sign in' }).click();
      await expect(page.getByText('Approve sign in request')).toBeVisible();
      // add a pause to keep the page open for manual verification
      await page.pause();
      // after the pause, this url will load. https://login.microsoftonline.com/common/SAS/ProcessAuth. add this
      await page.waitForURL('https://login.microsoftonline.com/common/SAS/ProcessAuth', { timeout: 20000});
      await page.getByRole('button', { name: 'Yes' }).click();

      //await page.goto('https://portal11.xyvid.com/152938?samlProcessed=true');

    }
  });
});
