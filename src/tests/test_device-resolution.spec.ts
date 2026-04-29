// src/tests/responsive.spec.ts
import { test } from '@playwright/test';
import { DEVICES, DeviceName } from '../utils/VisualTestingUtility/DeviceResolutionUtil';
import { CustomLogger } from '../loggers/CustomLogger';
import path from 'path';
import fs from 'fs';

const logger = CustomLogger.getInstance();
const screenshotDir = path.join(__dirname, '../screenshots/resolution_test/');
// Create directory if it doesn't exist
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}
// Display available devices
function display_device_list(){
  console.log("\n✅ Available devices for testing:\n");
  console.log(Object.keys(DEVICES).join(', '));
  console.log("\n");
}
// Test single device
test('Login on iPhone_17', async ({ page }) => {
  display_device_list(); 
  await page.setViewportSize(DEVICES.iPhone_17);
  logger.info("Testing resolution for iPhone_17");  
  await page.goto('https://playwright.dev/', {timeout: 5000});
    await page.screenshot({ 
    path: `${screenshotDir}iPhone_17.png` 
  });  
  logger.success("✅ Screenshot saved: iPhone_17.png");
});

// Test multiple devices
const devicesToTest: DeviceName[] = ['OnePlus_15', 'Galaxy_S26_Ultra', 'iPad_Pro_13', 'Desktop_FHD', 'Laptop_15'];
for (const device of devicesToTest) {
  test(`Login on ${device}`, async ({ page }) => {
    const resolution = DEVICES[device];
    logger.info(`Testing ${device} (${resolution.width}×${resolution.height})`);
    await page.setViewportSize(resolution);
    await page.goto('https://playwright.dev/', {timeout: 5000});
    // ✅ Use screenshotDir directly
    await page.screenshot({ 
      path: `${screenshotDir}${device}.png` 
    });    
    logger.success(`✅ Screenshot saved: ${device}.png`);
  });
}