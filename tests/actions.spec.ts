import { test, chromium } from '@playwright/test';
// import { getCurrentTime } from '../utils/dateTimeUtils';
// import path from 'path';

test('Test Actions', async () => {
  // 1. Launch the browser
  const browser = await chromium.launch({
    headless: false, // Set to false so you can SEE the browser open
    slowMo: 1000,    // Slows down operations by 1 second so you can watch
  });

  // 2. Create a new page context
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html')

  // 3. Close browser
  await browser.close();


// // Manual concatenation of segments
// const filePathJoin = path.join('C:', 'Users', 'admin', 'Downloads', 'invoice.pdf');
// await page.getByLabel('Upload file').setInputFiles(filePathJoin);

// // Resolving to a fixed absolute root
// const filePathResolve = path.resolve('C:\\Users\\admin\\Downloads\\invoice.pdf');
// await page.getByLabel('Upload file').setInputFiles(filePathResolve);


});


  
