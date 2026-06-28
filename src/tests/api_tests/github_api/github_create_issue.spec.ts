import * as dotenv from 'dotenv';
import { CustomLogger } from '../../../loggers/CustomLogger';
import {test, request, APIRequestContext, expect } from '@playwright/test'
import { convertToISTTime } from '../../../utils/DateTimeUtil';


// ✅ Load .env file
dotenv.config();
const logger = CustomLogger.getInstance();

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;

// ✅ Get API key and Github details from environment variable
const REPO = process.env.GITHUB_REPO
const USER = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_TOKEN


test('GITHUB Setup details', async ({request}) => {
  logger.info("Validating GitHub setup details...");
  if (!REPO?.trim()) {
    throw new Error('GITHUB_REPO is null or empty');
  }
  if (!USER?.trim()) {
    throw new Error('GITHUB_USERNAME is null or empty');
  }
  if (!GITHUB_TOKEN?.trim()) {
    throw new Error('GITHUB_TOKEN is null or empty');
  }
  logger.success('✅ All GitHub details valid!');  
  console.log(`Repo: ${REPO}`);
  console.log(`User: ${USER}`);
  console.log(`Token: ****${GITHUB_TOKEN?.slice(-4)}`);  // Show last 4 chars only
});


test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: "https://api.github.com",
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      Accept: "application/vnd.github.v3+json",
      // Add authorization token to all requests.      
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
})



test("Create GitHub issue via API - Validate response",async ({ page}) => {
  // const issueTitle = `[Feature] new feature created on ${new Date().toISOString()} - ${new Date().getTime().toLocaleString}`;
  const issueTitle = `[Feature] new feature created on ${convertToISTTime(new Date())}`;

  const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
      data: {
             title: issueTitle,
            }
      });
  expect(newIssue.ok()).toBeTruthy();
  // ✅ Validate response status
  expect(newIssue.status()).toBe(201);

  const createdIssue = await newIssue.json();
  logger.success("Successfully created the issue at GitHub!")
  console.log("Response Returned by GitHub: \n ", createdIssue)

   // ✅ Validate response body
  expect(createdIssue.title).toBe(issueTitle);
  expect(createdIssue.state).toBe("open");
  expect(createdIssue.id).toBeDefined();
  expect(createdIssue.number).toBeDefined();

  const issueId = createdIssue.id;
  const issueNumber = createdIssue.number;

  console.log(`Issue Number: ${issueNumber}, GitHub Internal Issue ID: ${issueId}  `)
  console.log(`✅ Issue created: #${issueNumber} - ${issueTitle}`);


  // Step 2: VERIFY by fetching again
  const getResponse = await apiContext.get(
    `/repos/${USER}/${REPO}/issues/${issueNumber}`
  );

  expect(getResponse.status()).toBe(200);
  console.log(`✅ Issue verified via GET request`);
  const fetchedIssue = await getResponse.json();
  console.log(`Response sent for the issue ID: ${fetchedIssue.id}`);
  expect(fetchedIssue.title).toBe(issueTitle);
  expect(fetchedIssue.id).toBe(issueId);
  console.log(`✅ Issue verified via GET request`);
  logger.success("GitHub Issue was successfully verified via GET request")
  
});

 test.afterAll(async ({}) => {
  // Dispose all responses.
  await apiContext.dispose();
});