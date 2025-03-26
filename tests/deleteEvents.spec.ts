import { test } from '@playwright/test';
import { adminSites } from '../HelperFiles/newEventHelper';
import { logIn } from '../logInHelper';

for (const site of adminSites) {
  test.describe(`Delete Events for ${site}`, () => {
    test.beforeEach(async ({ page }) => {
      test.setTimeout(120000);
      await logIn(page, site);
    });

    test('Delete All Mytest Events', async ({ page }) => {
      const eventNamePattern = 'RMRtest';

      // Set the viewport size to your desired dimensions
      await page.setViewportSize({ width: 1900, height: 1080 });

      // Wait for the calendar to load
      await page.waitForTimeout(2000);

      while (true) {
        // Try to find an event with a title containing "RMRtest"
        const event = await page.getByTitle(new RegExp(eventNamePattern, 'i')).first();

        // If no event is found, break the loop
        if (!await event.isVisible()) break;

        // Right-click on the event
        await event.click({ button: 'right' });
        await page.waitForTimeout(1000);

        // Click the Delete option in the context menu
        await page.getByRole('menuitem', { name: 'Delete' }).click();
        await page.waitForTimeout(1000);

        // Confirm deletion
        await page.getByRole('button', { name: '✓' }).click();

        // Wait for the deletion to complete
        await page.waitForTimeout(2000);
      }
    });
  });
}
