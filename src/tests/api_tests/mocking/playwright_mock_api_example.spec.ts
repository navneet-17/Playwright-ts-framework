import { expect, test} from '@playwright/test'

test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Navneet Shree => enter your favaourite fruit here => _______ !'}];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the fruit heading is visible  
  await expect (page.locator('h1').filter({ hasText: 'Fruits' })).toBeVisible();
});