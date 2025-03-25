// importCreation.spec.ts
import { test, expect } from '@playwright/test';
import { logIn } from '../HelperFiles/logIn';
const { v4: uuidv4 } = require('uuid');

logIn(test, (test, site) => {
  test(`newEvent for ${site}`, async ({ page }) => {
    test.setTimeout(60000);

    // Click on Create New Event button
    await page.getByRole('button', { name: '+ New Event' }).click();

    // Fill in the Event Name field
    const eventName = `RMRtest${uuidv4()}`;
    await page.getByRole('textbox', { name: 'Event Name' }).fill(eventName);
    await page.getByText('Create The settings above').click();
    await expect(page.locator('text=The event folder directory is invalid')).toBeVisible();

    // Select a folder
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('treeitem', { name: /test/i }).locator('div').first().click();
    await page.getByText('Select This FolderClick Here').click();
    await page.getByText('Create The settings above').click();
    await expect(page.locator('text=The vanity url is required')).toBeVisible();

    // Fill in the Event Name and Vanity URL
    const trimmedVanityURL = eventName.slice(0, 30);
    await page.locator('#txt_vanityURL').fill(trimmedVanityURL);
    await page.locator('#txt_vanityURL').press('Enter');

    // Verify Vanity URL length
    const vanityURLValue = await page.locator('#txt_vanityURL').inputValue();
    expect(vanityURLValue.length).toBe(30);

    // Set start date and time
    await page.locator('#txt_startDateGroup span').first().click();
    await page.locator('.day.active.today').click();
    await page.locator('#txt_startDate').press('Enter');
    await page.locator('#txt_openTimeGroup span').nth(1).click();
    await page.locator('#txt_openTimeGroup > .input-group-addon').click();
    await page.locator('#txt_startTimeGroup span').nth(1).click();
    await page.getByRole('link', { name: ' Increment Minutes' }).click();
    await page.locator('#txt_startTimeGroup > .input-group-addon > .glyphicon').click();

    // Set end time
    await page.locator('#txt_endTime').click();
    await page.locator('#txt_endTimeGroup span').nth(1).click();
    await page.getByRole('link', { name: ' Increment Hour' }).click();
    await page.locator('#txt_endTimeGroup > .input-group-addon > .glyphicon').click();

    // Turn SSO on
    await page.locator('#cmb_SAMLAuth').selectOption('true');

    // Turn Hybrid on
    await page.locator('#cmb_hybrid').selectOption('1');

    // Finalize the event creation
    await page.getByText('Create The settings above').click();
    await expect(page.getByRole('tab', { name: 'Content' })).toBeVisible();
  });
});
