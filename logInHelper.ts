import dotenv from 'dotenv';
import { ENV } from './HelperFiles/envHelper';
import { adminSites } from './HelperFiles/newEventHelper';

// Load environment variables from .env file
dotenv.config();

export const logIn = async (page, site) => {
  console.log(`Logging in to site: ${site}`); // Debug information
  await page.goto(`https://${site}`);
  await page.getByRole('textbox', { name: 'Username' }).fill(ENV.USER_NAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(ENV.PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#accounthome div').filter({ hasText: 'Event Management Click here' }).nth(2).click();
  await page.getByRole('button', { name: ' Calendar View' }).click();
};
