import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login Test', async ({page}) => {
   const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce2')
  await loginPage.verifyLoginSuccess();
})

test('Login Test @regression', async ({page}) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.login('standard_user', 'secret_sauce')
  await loginPage.verifyLoginSuccess();
})