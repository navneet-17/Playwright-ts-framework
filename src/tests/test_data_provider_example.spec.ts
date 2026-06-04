import { test, expect } from '@playwright/test';
import { getJsonArray } from '../utils/TestDataReader'

const loginData1 = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'invalid_user', password: 'wrong_pass' }
];

test.describe('Login Tests with Data Provider', () => {
  for (const data of loginData1) {
    test(`Login test - ${data.username} using data provider format` , async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.fill('[data-test="username"]', data.username);
      await page.fill('[data-test="password"]', data.password);
      await page.click('[data-test="login-button"]');
    //   await expect(page.locator('#welcome')).toContainText('Welcome');
    });
  }
});

// using the testdata.json file!
const loginData = getJsonArray("loginData")

test.describe('Login Tests with test data json', () => {
  for (const data of loginData) {
    test(`Login test - ${data.username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.fill('[data-test="username"]', data.username);
      await page.fill('[data-test="password"]', data.password);
      await page.click('[data-test="login-button"]');
    //   await expect(page.locator('#welcome')).toContainText('Welcome');
    });
  }
});