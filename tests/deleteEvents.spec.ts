import { test } from '@playwright/test';

const adminSites = [
  // 'admin4.xyvid.com',
  // 'admin6.xyvid.com',
  // 'admin8.xyvid.com',
  'admin11.xyvid.com'
];

test.describe('Delete Events', () => {
  for (const site of adminSites) {
    test.describe(`Delete Events for ${site}`, () => {
      test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
        await page.goto(`https://${site}`);
        await page.getByRole('textbox', { name: 'Username' }).fill('mrasmussen@xyvid.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('@HaleyAnnika1');
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByText('Event Management').click();
        await page.getByRole('button', { name: ' Calendar View' }).click();
      });

      test('Delete All Mytest Events', async ({ page }) => {
        const eventNamePattern = 'RMRtest|Mytest'; 
        
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
});
