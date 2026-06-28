import * as dotenv from 'dotenv';
import { test, expect, APIRequestContext } from '@playwright/test';
import { CustomLogger } from '../../../loggers/CustomLogger';
import { convertToISTTime } from '../../../utils/DateTimeUtil';

dotenv.config();
const logger = CustomLogger.getInstance();

const REPO = process.env.GITHUB_REPO;
const USER = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

let apiContext: APIRequestContext;
let issueNumber: number;
let issueTitle: string;

test.beforeAll(async ({ playwright }) => {
  // ✅ Create API context
  apiContext = await playwright.request.newContext({
    baseURL: "https://api.github.com",
    extraHTTPHeaders: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  // ✅ CREATE issue via API (setup)
  issueTitle = `[Feature] UI Test Issue on ${convertToISTTime()}`;
  
  const response = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
    data: { title: issueTitle }
  });

  const createdIssue = await response.json();
  issueNumber = createdIssue.number;
  
  logger.success(`✅ Test issue #${issueNumber} created via api call to GitHub`);
});

test('Validate GitHub issue is displayed on UI', async ({ page }) => {
  logger.info(`Validating issue #${issueNumber} is displayed on the GitHub UI...`);
  
  // Navigate to specific issue
  await page.goto(`https://github.com/${USER}/${REPO}/issues/${issueNumber}`);
  
  // ✅ Validate issue title displays
  const issueHeading = page.getByTestId('issue-title');
  await expect(issueHeading).toContainText(issueTitle);     
  logger.success(`✅ Issue #${issueNumber} titled ${issueTitle} displays correctly on the GitHub UI `);
});

test.afterAll(async () => {
  // ✅ CLEANUP: Close issue
  await apiContext.patch(`/repos/${USER}/${REPO}/issues/${issueNumber}`, {
    data: { state: 'open' }
  });
  
  await apiContext.dispose();
  logger.success(`✅ Test issue #${issueNumber} open`);
});