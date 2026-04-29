import { test, chromium } from '@playwright/test';
import { getCurrentTime } from '../src/utils/DateTimeUtil';


test('BrowserLaunchTest', async () => {
  // 1. Launch the browser
  const browser = await chromium.launch({
    headless: false, // Set to false so you can SEE the browser open
    slowMo: 1000,    // Slows down operations by 1 second so you can watch
  });

  // 2. Create a new page context
  const page = await browser.newPage();

  // 3. Navigate to a URL
  // await page.goto('https://google.com');
  await page.goto('https://www.cricbuzz.com/')

  // 4. Verify title (Simple console log to prove it worked)
  console.log('Page title is:', await page.title());

  const testName = test.info().title.replace(/\s+/g,'_');
  const ss= testName+getCurrentTime()
  await page.screenshot({
    path: `test-results/screenshots/${ss}.png`
  })

  // 5. Close browser
  await browser.close();
});

test('demo test', async () =>  {
console.log(25 + 35);
const ss_time = getCurrentTime()
console.log(test.info().title.replace(/\s+/g,'_')+'_'+ss_time);
});
