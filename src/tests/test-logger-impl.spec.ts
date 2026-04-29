import { test, expect } from '@playwright/test';
import { CustomLogger } from '../loggers/CustomLogger';
const logger = new CustomLogger();
test('Verify the Logger implemented manually', async({page}) =>{
  logger.info ('Navigating to the login page')
  await page.goto('https://www.saucedemo.com/v1/');
  logger.warn('Trying multiple username and password combinations');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  logger.info('Checking for inventory page load to ensure we landed on the homepage post login!');
  try{
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  logger.success('✅ Login was successful');
} catch (error){
  logger.error("Login failed, Unable to redirect to the home page!")
  throw error;
} 
});