import { test, expect } from '@playwright/test';
const { v4: uuidv4 } = require('uuid');

const adminSites = [
  'admin4.xyvid.com', 
  'admin6.xyvid.com', 
  'admin8.xyvid.com', 
  'admin11.xyvid.com'
];

for (const site of adminSites) {
  test.describe(`Event Settings ${site}`, () => {
    test.beforeEach(async ({ page }) => {
      test.setTimeout(60000);
      // Log in, navigate to the calendar and click on the New Event button
      await page.goto(`https://${site}`);
      await page.getByRole('textbox', { name: 'Username' }).fill('mrasmussen@xyvid.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('@HaleyAnnika1');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByText('Event Management').click();
      await page.getByRole('button', { name: ' Calendar View' }).click();
      await page.getByRole('button', { name: '+ New Event' }).click();
    });

    test('EventName', async ({ page }) => {
      // Enter event name and test alert for empty folder directory
      await page.getByRole('textbox', { name: 'Event Name' }).fill(`RMRtest${uuidv4()}`);
      await page.getByText('Create The settings above').click();
      await expect(page.locator('text=The event folder directory is invalid')).toBeVisible();
    });

    test('SelectFolder', async ({ page }) => {
      // Select a folder and test alert for empty vanity URL
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('treeitem', { name: /test/i }).locator('div').first().click();
      await page.getByText('Select This FolderClick Here').click();
      await page.getByText('Create The settings above').click();
      await expect(page.locator('text=The vanity url is required')).toBeVisible();
    });

    test('VanityURL', async ({ page }) => {
      // Fill in the Event Name and Vanity URL
      await page.getByRole('textbox', { name: 'Event Name' }).fill(`RMRtest${uuidv4()}`);
      await page.getByRole('button', { name: '' }).click();

      // Trim the eventName to 30 characters for vanity URL
      const eventName = `RMRtest${uuidv4()}`;
      const trimmedVanityURL = eventName.slice(0, 30);
    
      // Fill the vanity URL field with the trimmed value
      await page.locator('#txt_vanityURL').fill(trimmedVanityURL);
      await page.locator('#txt_vanityURL').press('Enter');
    
      // Verify the trimmed length of vanity URL
      const vanityURLValue = await page.locator('#txt_vanityURL').inputValue();
      expect(vanityURLValue.length).toBe(30);        
    });

    test('SelectDates', async ({ page }) => {

        // Select Start Date
      await page.locator('#txt_startDateGroup span').first().click();
      await page.locator('.day.active.today').click();
      await page.locator('#txt_startDate').press('Enter');

      // Select Start Time
      await page.locator('#txt_openTimeGroup span').nth(1).click();
      await page.locator('#txt_openTimeGroup > .input-group-addon').click();
      await page.locator('#txt_startTimeGroup span').nth(1).click();
      await page.getByRole('link', { name: ' Increment Minutes' }).click();
      await page.locator('#txt_startTimeGroup > .input-group-addon > .glyphicon').click();

        // End time
      await page.locator('#txt_endTime').click();
      await page.locator('#txt_endTimeGroup span').nth(1).click();
      await page.getByRole('link', { name: ' Increment Hour' }).click();
      await page.locator('#txt_endTimeGroup > .input-group-addon > .glyphicon').click();
    });
    test('TurnHybrid-SSO-On', async ({ page }) => {
      await page.locator('#cmb_SAMLAuth').selectOption('true');
      await page.locator('#cmb_hybrid').selectOption('1');
    }); 

  });
}
