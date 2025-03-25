import dotenv from 'dotenv';
import { ENV } from './HelperFiles/envHelper';

// Load environment variables from .env file
dotenv.config();

const { v4: uuidv4 } = require('uuid');

export function logIn(test, testCallback) {
  const adminSites = [
    'admin4.xyvid.com',
    'admin6.xyvid.com',
    'admin8.xyvid.com',
    'admin11.xyvid.com'
  ];

  for (const site of adminSites) {
    test.describe(`EventCreation ${site}`, () => {
      // Log in and navigate to the Calendar
      test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
        await page.goto(`https://${site}`);
        await page.getByRole('textbox', { name: 'Username' }).fill(ENV.USER_NAME);
        await page.getByRole('textbox', { name: 'Password' }).fill(ENV.PASSWORD);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByText('Event Management').click();
        await page.getByRole('button', { name: ' Calendar View' }).click();
      });

      // Execute test cases inside the describe block
      testCallback(test, site);
    });
  }
}

export { uuidv4 };
