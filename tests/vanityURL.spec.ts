import { test, expect } from '@playwright/test';
import { adminSites } from '../HelperFiles/newEventHelper';
import { ENV } from '../HelperFiles/envHelper';

const { v4: uuidv4 } = require('uuid');

for (const site of adminSites) {
  test.describe(`EventCreation ${site}`, () => {
    test.beforeEach(async ({ page }) => {
      test.setTimeout(60000);
      await page.goto(`https://${site}`);
      await page.getByRole('textbox', { name: 'Username' }).fill(ENV.USER_NAME);
      await page.getByRole('textbox', { name: 'Password' }).fill(ENV.PASSWORD);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByText('Event Management').click();
      await page.getByRole('button', { name: ' Calendar View' }).click();
      await page.getByRole('button', { name: '+ New Event' }).click();
    });

    test('FullEvent', async ({ page }) => {
      test.setTimeout(60000);
      await page.getByRole('textbox', { name: 'Event Name' }).fill(`Mytest${uuidv4()}`);
      await page.getByText('Create The settings above').click();
      await expect(page.locator('text=The event folder directory is invalid')).toBeVisible();
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('treeitem', { name: /test/i }).locator('div').first().click();
      await page.getByText('Select This FolderClick Here').click();
      await page.getByText('Create The settings above').click();
      await expect(page.locator('text=The vanity url is required')).toBeVisible();
      await page.getByRole('textbox', { name: 'Event Name' }).fill(`Mytest${uuidv4()}`);

      // Trim the eventName to 30 characters for vanity URL
      const eventName = `Mytest${uuidv4()}`;
      const trimmedVanityURL = eventName.slice(0, 30);
    
      // Fill the vanity URL field with the trimmed value
      await page.locator('#txt_vanityURL').fill(trimmedVanityURL);
      await page.locator('#txt_vanityURL').press('Enter');
    
      // Verify the trimmed length of vanity URL
      const vanityURLValue = await page.locator('#txt_vanityURL').inputValue();
      expect(vanityURLValue.length).toBe(30);        
      await page.locator('#txt_startDateGroup span').first().click();
      await page.locator('.day.active.today').click();
      await page.locator('#txt_startDate').press('Enter');
      await page.locator('#txt_openTimeGroup span').nth(1).click();
      await page.locator('#txt_openTimeGroup > .input-group-addon').click();
      await page.locator('#txt_startTimeGroup span').nth(1).click();
      await page.getByRole('link', { name: ' Increment Minutes' }).click();
      await page.locator('#txt_startTimeGroup > .input-group-addon > .glyphicon').click();
      await page.locator('#txt_endTime').click();
      await page.locator('#txt_endTimeGroup span').nth(1).click();
      await page.getByRole('link', { name: ' Increment Hour' }).click();
      await page.locator('#txt_endTimeGroup > .input-group-addon > .glyphicon').click();
    });
  });
}
