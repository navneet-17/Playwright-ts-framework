import { test, expect, request } from '@playwright/test';
import { CustomLogger } from '../../loggers/CustomLogger';

const logger = CustomLogger.getInstance()
// We need to ensure we run the local server  file at server.js to make the test pass
// 1. Run the server using the 'node server.js' 
// 2. Launch the API_Server.html file on the browser and see if the server is running
// 3. uncomment the test below and run it!
test('Add user via API and verify in UI', async ({ page }) => {

//  // Step 1: API context
//  const apiContext = await request.newContext({
//    baseURL: 'http://localhost:3000',
//    extraHTTPHeaders: { 'Content-Type': 'application/json' }
//  });

//  // Step 2: POST new user
//  const userData = { 
//     name: "Navneet Shree",
//     profile: "SDET Architect",
//     skills : "Selenium, Playwright, Test Complete ",
//     location: "Pune" ,
// }
// // API Testing',
//  const response = await apiContext.post('/users', { data: userData });
//  expect(response.ok()).toBeTruthy();
//  const createdUser = await response.json();

//  // Step 3: Open UI
// //  await page.goto('http://127.0.0.1:5501/tests/localwebsite.html');
// // Open HTML from server
// await page.goto('http://localhost:3000/API_Server.html', {
//   waitUntil: 'networkidle'
// });

//  // Step 4: Wait for user list to load and validate
//  const username = userData.name
//  console.log(`Username to be searched on the UI: ${username}`)
 
//    // Step 3: Wait for table to load
//   await page.waitForSelector('#users-table-body');

//   // Step 4: Find user with SIMPLEST locator
//   const userLocator = page.locator(`text="${userData.name}"`);
  
//   logger.info(`Searching for user: "${userData.name}"`);
  
//   // ✅ Check if AT LEAST ONE user exists with this name
//   const userCount = await userLocator.count();
  
//   if (userCount > 0) {
//     logger.success(`✅ Found ${userCount} user(s) with name "${userData.name}"`);
    
//     // ✅ Validate the first match is visible
//     await expect(userLocator.first()).toBeVisible();
//     logger.success(`✅ User "${userData.name}" verified in table`);
//   } else {
//     logger.error(`❌ No user found with name "${userData.name}"`);
//     throw new Error(`User "${userData.name}" not found in table`);
//   }

//  await apiContext.dispose();
});