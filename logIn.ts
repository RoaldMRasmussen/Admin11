import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface EnvVariables {
  USER_NAME: string;
  PASSWORD: string;
}

// Get environment variables
const env: EnvVariables = {
  USER_NAME: process.env.USER_NAME || '',
  PASSWORD: process.env.PASSWORD || ''
};

if (!env.USER_NAME || !env.PASSWORD) {
  throw new Error('USER_NAME and PASSWORD environment variables must be set');
}

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
        await page.getByRole('textbox', { name: 'Username' }).fill(env.USER_NAME);
        await page.getByRole('textbox', { name: 'Password' }).fill(env.PASSWORD);
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
