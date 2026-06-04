import { Page, Locator, expect } from '@playwright/test';
import { DEVICES, DeviceName } from './DeviceResolutionUtil';

export class VisualTestingUtil {  
  // 1. Full-page snapshot - Captures the ENTIRE scrollable page,
    static async compareFullPage(
    page: Page,
    snapshotName: string
  ): Promise<void> {
    await expect(page).toHaveScreenshot(`${snapshotName}.png`, {
      fullPage: true,          // scrolls and stitches entire page
      maxDiffPixelRatio: 0.05,  // allow 2% of pixels to differ,      // allow minor anti-aliasing diffs
      threshold: 0.2,  // per-pixel color sensitivity (0–1), 0.2 = lenient
      animations: 'disabled',  // freeze CSS animations for stable baseline
    });
  }
    // 2. Element-level snapshot  Captures only a specific locator — not the full page
  //    Useful for component-level visual regression
  static async compareElement(
    locator: Locator,
    snapshotName: string
  ): Promise<void> {
    await expect(locator).toHaveScreenshot(`${snapshotName}.png`, {
      maxDiffPixelRatio: 0.05,  // allow 2% of pixels to differ,      // allow minor anti-aliasing diffs
      threshold: 0.2,  // per-pixel color sensitivity (0–1), 0.2 = lenient
      animations: 'disabled',
    });
  }
    // 3. Responsive snapshot using DeviceResolutionUtil =>  Pass a DeviceName key 
  static async compareResponsive(
    page: Page,
    snapshotName: string,
    device: DeviceName          
  ): Promise<void> {
    const { width, height } = DEVICES[device];
    // Store original viewport to restore after test
    const originalViewport = page.viewportSize();
    // Set viewport to selected device dimensions
    await page.setViewportSize({ width, height });

    // Re-navigate AFTER viewport set — ensures page renders at correct size
    await page.goto('https://playwright.dev/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot(
      `${snapshotName}-${device}-${width}x${height}.png`,
      {
        fullPage: false,         // capture viewport only — that's the device view
        animations: 'disabled',
        maxDiffPixelRatio: 0.05,
        threshold: 0.2,
      }
    );
    // Restore original viewport — prevents polluting next test
    if (originalViewport) {
      await page.setViewportSize(originalViewport);
    }
  }
}