const { v4: uuidv4 } = require('uuid');

export function newEvent(test, testCallback) {
  const adminSites = [
    // 'admin4.xyvid.com',
    // 'admin6.xyvid.com',
    // 'admin8.xyvid.com',
    'admin11.xyvid.com'
  ];

  for (const site of adminSites) {
    test.describe(`EventCreation ${site}`, () => {
      // Log ins and navigates to the Calendar
      test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
        await page.goto(`https://${site}`);
        await page.getByRole('textbox', { name: 'Username' }).fill('mrasmussen@xyvid.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('@HaleyAnnika1');
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByText('Event Management').click();
        await page.getByRole('button', { name: ' Calendar View' }).click();
      });

      // Execute test cases inside the describe block
      testCallback(uuidv4);
    });
  }
}

export { uuidv4 };
