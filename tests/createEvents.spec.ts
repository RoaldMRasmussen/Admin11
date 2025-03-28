import { test } from '@playwright/test';
import { adminSites, createdContentModule, createdVanityURLs } from '../HelperFiles/newEventHelper';

test.describe('Create Events for Admin Sites', () => {
  for (const site of adminSites) {
    test(`Create Event for ${site}`, async ({ page }) => {
      console.log(`Creating event for admin site: ${site}`);
      await createdContentModule(page, site);

      // Verify that the vanity URL was stored correctly
      console.log(`Vanity URL for ${site}:`, createdVanityURLs[site]);
    });
  }
});