import {test, expect}  from "@playwright/test";
import { VisualTestingUtil } from '../utils/VisualTestingUtility/VisualTestingUtil';

// VISUAL REGRESSION SUITE — playwright.dev
// Run with: npx playwright test --update-snapshots  (baseline reset)

test.describe('Visual Regression — Playwright Homepage', () => {

  // Navigate once before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Wait for page to be fully painted before any screenshot
    await page.waitForLoadState('networkidle');
  });

  // ───────────────────────────────────────────────────────────
  // TEST 1 — Full page visual comparison
  // Snapshot path: src/screenshots/visual_testing.spec.ts/
  //               playwright-homepage-full-chromium-win32.png
  // ───────────────────────────────────────────────────────────
  test('Visual - Full page comparison', async ({ page }) => {
    await VisualTestingUtil.compareFullPage(
      page,
      'playwright-homepage-full'  
    );
  });

  // ───────────────────────────────────────────────────────────
  // TEST 2 — Element-level comparison (hero heading only)
  // Snapshot path: src/screenshots/visual_testing.spec.ts/
  //               getStartedLink-chromium-win32.png
  // ───────────────────────────────────────────────────────────
  test('Visual - Get Started Link element comparison', async ({ page }) => {
    // Target only the hero heading — not the whole page
    const getStartedLink = page.getByRole('link', { name: 'Get started' });

    // Ensure element is visible before capturing
    await expect(getStartedLink).toBeVisible();

    await VisualTestingUtil.compareElement(
      getStartedLink,
      'getStartedLink'   // {arg} token
    );
  });

  // ───────────────────────────────────────────────────────────
  // TEST 3 — Responsive comparison using DeviceResolutionUtil
  // Runs same URL across 3 real device profiles
  // Snapshot path: src/screenshots/visual_testing.spec.ts/
  //   playwright-responsive-iPhone_17-430x932-chromium-win32.png
  //   playwright-responsive-iPad_Air-820x1180-chromium-win32.png
  //   playwright-responsive-Desktop_FHD-1920x1080-chromium-win32.png
  // ───────────────────────────────────────────────────────────
  test('Visual - Responsive comparison across devices', async ({ page }) => {

    // Mobile
    await VisualTestingUtil.compareResponsive(
      page,
      'playwright-responsive',
      'iPhone_17'
    );

    // Tablet
    await VisualTestingUtil.compareResponsive(
      page,
      'playwright-responsive',
      'iPad_Air'
    );

    // Desktop
    await VisualTestingUtil.compareResponsive(
      page,
      'playwright-responsive',
      'Desktop_FHD'
    );
  });
});