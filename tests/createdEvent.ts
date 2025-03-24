import { test as baseTest, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

export const adminSites = [
  // 'admin4.xyvid.com',
  // 'admin6.xyvid.com',
  // 'admin8.xyvid.com',
  'admin11.xyvid.com'
];

export const createdContentModule = (site: string) => async ({ page }) => {
  // Set timeout at the proper level
  baseTest.setTimeout(60000);

  // Log in, navigate to the calendar and click on the New Event button
  await page.goto(`https://${site}`);
  await page.getByRole('textbox', { name: 'Username' }).fill('mrasmussen@xyvid.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('@HaleyAnnika1');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByText('Event Management').click();
  await page.getByRole('button', { name: ' Calendar View' }).click();
  await page.getByRole('button', { name: '+ New Event' }).click();

  // Enter Event Name and verify folder directory
  const eventName = `RMRtest${uuidv4()}`;
  await page.getByRole('textbox', { name: 'Event Name' }).fill(eventName);

  // Select a folder
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('treeitem', { name: /test/i }).locator('div').first().click();
  await page.getByText('Select This FolderClick Here').click();

  // Trim the eventName to 30 characters for vanity URL
  const trimmedVanityURL = eventName.slice(0, 30); // Use existing eventName
  
  // Fill the vanity URL field with the trimmed value
  await page.locator('#txt_vanityURL').fill(trimmedVanityURL);
  await page.locator('#txt_vanityURL').press('Enter');
  
  // Date/time handling
  await page.locator('#txt_startDateGroup span').first().click();
  await page.locator('.day.active.today').click();
  await page.locator('#txt_startDate').press('Enter');
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

  // Turn SSO on
  await page.locator('#cmb_SAMLAuth').selectOption('true');

  // Turn Hybrid on
  await page.locator('#cmb_hybrid').selectOption('1');

  // Finalize creation
  await page.getByText('Create The settings above').click();
  await expect(page.getByRole('tab', { name: 'Content' })).toBeVisible();
  
  return page;
};
