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
      maxDiffPixels: 100,      // allow minor anti-aliasing diffs
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
      maxDiffPixels: 50,       // tighter threshold for small components
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
    // Wait for layout to repaint after resize
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot(
      `${snapshotName}-${device}-${width}x${height}.png`,
      {
        fullPage: false,         // capture viewport only — that's the device view
        animations: 'disabled',
        maxDiffPixels: 100,
      }
    );
    // Restore original viewport — prevents polluting next test
    if (originalViewport) {
      await page.setViewportSize(originalViewport);
    }
  }
}