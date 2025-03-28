import { test as baseTest, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import { ENV } from './envHelper';

// Define portalSites and adminSites
export const portalSites = [
  'portal11.xyvid.com'
];
export const adminSites = [
  'admin11.xyvid.com'
];

// Shared object to store vanity URLs for each site
export const createdVanityURLs = {};

// Function to create an event for a given site
export const createdContentModule = async (page, site) => {
  // Set timeout for the test
  baseTest.setTimeout(60000);

  // Log in and navigate to the calendar
  await page.goto(`https://${site}`);
  await page.getByRole('textbox', { name: 'Username' }).fill(ENV.USER_NAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(ENV.PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByText('Event Management').click();
  await page.getByRole('button', { name: ' Calendar View' }).click();
  await page.getByRole('button', { name: '+ New Event' }).click();

  // Enter Event Name
  const eventName = `RMRtest${uuidv4()}`;
  await page.getByRole('textbox', { name: 'Event Name' }).fill(eventName);

  // Select a folder
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('treeitem', { name: /test/i }).locator('div').first().click();
  await page.getByText('Select This FolderClick Here').click();

  // Fill in the vanity URL
  const trimmedVanityURL = eventName.slice(0, 30); // Trim event name to 30 characters
  await page.locator('#txt_vanityURL').fill(trimmedVanityURL);
  await page.locator('#txt_vanityURL').press('Enter');

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

  // Finalize creation
  await page.getByText('Create The settings above').click();
  await expect(page.locator('#content-tab')).toBeVisible();

  // Store the vanity URL for the site
  createdVanityURLs[site] = trimmedVanityURL;

  // Wait for 5 seconds
  await page.waitForTimeout(5000);

  // Return the page object for further actions
  return page;
};

// Function to create events for all adminSites
export const createEventsForAdminSites = async (page) => {
  for (const site of adminSites) {
    console.log(`Creating event for admin site: ${site}`);
    await createdContentModule(page, site);
  }
};