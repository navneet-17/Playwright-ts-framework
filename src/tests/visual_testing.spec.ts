import {test, expect}  from "@playwright/test";
test('Visual - Testing implementation', async({page}) => {
//    await page.goto("https://playwright.dev/")
   await page.goto("https://playwright.dev/mcp/introduction");
   await expect(page).toHaveScreenshot('playwright-homepage.png');
})

test('Visual Testing - specific section - Ignore Live clock', async({page})=> {
await page.goto("https://www.timeanddate.com/");
// locate the section we wnat to test
const mainSection = await page.locator("//body/div[@class='main-content-div']/div[@class='tad-template-index']/div[@class='tad-layout-page']/div[@class='tad-layout-page__content']/article[@class='tad-layout-page__main']/div[@class='tad-layout-content']/div[@class='tad-layout-content__content']/main[@class='tad-layout-content__main']/div[@class='tad-grid tad-grid--spacing-block']/div[@class='tad-grid tad-grid--spacing-block']/section[1]/div[1]")
// locate the clock element we want to ignore 
const liveClockElement = await page.locator('//a[@id="clk_box"]');
// mask the clock elemnet 
await liveClockElement.evaluate((element) =>{
    element.style.visibility = 'hidden';
});
// Now take the screenshot
    expect (await mainSection.screenshot()).toMatchSnapshot('ignoreLiveClock.png')
} )

test('Test _ info implementation', async({page}, testInfo) => {
    await page.goto("https://playwright.dev/mcp/introduction");
    console.log(`Test name => ${testInfo.title}`);
    console.log(`Snapshot Directory=> ${testInfo.snapshotDir}.png`);
    console.log(`Test execution time => ${testInfo.duration} seconds `);
})