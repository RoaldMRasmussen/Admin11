import { test, expect } from '@playwright/test';
import { createdContentModule, adminSites } from './createdEvent';

test.describe('EventModules', () => {
  for (const site of adminSites) {
    test.describe(`EventModules ${site}`, () => {
        test(`contentModule`, async ({ page }) => {
        // Create event and get page state
        await createdContentModule(site)({ page });

        // Continue with content creation
        await page.getByRole('button', { name: ' Add New Content' }).click();
        await page.locator('#settingsregion').getByText('Poll Question').click();

        await page.getByRole('textbox', { name: '...', exact: true }).fill('New Poll');
        await page.locator('#poll_type').selectOption('single');
        await page.getByRole('textbox', { name: 'Add New Answer...' }).fill('1');
        await page.getByRole('button', { name: 'Click here to add this Answer' }).click();
        await page.getByRole('textbox', { name: 'Add New Answer...' }).fill('2');
        await page.getByRole('button', { name: 'Click here to add this Answer' }).click();
        await page.getByText('AddAdd this poll question to').click();

        await expect(page.getByText('New Poll')).toBeVisible();
        await page.getByText('Next The program content').click();
        //await page.getByRole('button', { name: 'Save and Continue' }).click();
        await expect(page.getByText('Microsite', { exact: true })).toBeVisible();
        await page.getByText('Microsite', { exact: true }).click();
        await page.getByRole('link', { name: 'Events' }).click();
      });
    })
  }
 });