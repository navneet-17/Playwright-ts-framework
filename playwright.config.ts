import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
const isCI = !!process.env.CI;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
    /* Retry on CI only */
  retries: isCI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,

  // Fail fast if any single test hangs (CI agents are slower under load)
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // Surfaces slow tests in the HTML report — catch suite bloat early
  reportSlowTests: { max: 5, threshold: 15_000 },

/* create snapshots in the below format */
  snapshotPathTemplate: 'src/screenshots/{testFileName}/{arg}-{projectName}-{platform}{ext}',
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: isCI
    ? [
        ['list'],
        ['html', { open: 'never' }], // never auto-open in a headless Jenkins agent
        ['allure-playwright'],
        ['junit', { outputFile: 'test-results/results.xml' }], // Jenkins JUnit plugin reads this
      ]
    : [['list'], ['html'], ['allure-playwright']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   // Parameterized per environment — Jenkins passes this via job params/env vars
    // baseURL: process.env.BASE_URL || 'http://localhost:3000',

    //Capture screenshots on each test failure
    screenshot: 'only-on-failure',

    /* Collect trace on test retry. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    //Record video on test failure
    video: 'retain-on-failure',

    // Run tests in headless / non UI mode!
    // headless: isCI ? true : false,
    headless: true,

    launchOptions : {
      slowMo: isCI ? 0 : 1000,
    },

    testIdAttribute : 'data-testid',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
     },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
