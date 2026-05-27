import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Official Playwright accessibility test example', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/accessibility-testing'); 
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('basic accessibility check', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/demo_apps/Accessibility.html');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  console.log(`Found ${accessibilityScanResults.violations.length} accessibility issues as expected for dummy testing!`);
  expect(accessibilityScanResults.violations).not.toEqual([]);
  // Pretty-print for debugging
 // TABLE 1: Summary without nodes
  const summary = accessibilityScanResults.violations.map(v => ({
    rule: v.id,
    severity: v.impact,
    description: v.help,
    no_of_Elements: v.nodes.length,
  }));
  console.log('\n═══════════════════════════════════════════');
  console.log('TABLE 1: ACCESSIBILITY VIOLATIONS SUMMARY');
  console.log('═══════════════════════════════════════════\n');
  console.table(summary);

  // TABLE 2: Affected nodes detailed
  const affected_nodes = accessibilityScanResults.violations.map(v => ({
    rule: v.id,
    severity: v.impact,
    affected_html: v.nodes.map((node, idx) => `${idx + 1}. ${node.html.substring(0, 150)}`).join('\n'),
  }));
  console.log('\n═══════════════════════════════════════════');
  console.log('TABLE 2: AFFECTED HTML ELEMENTS');
  console.log('═══════════════════════════════════════════\n');
  console.table(affected_nodes);

  //Listing the accessibility issues found in the test in json format:
  accessibilityScanResults.violations.forEach((v) => {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Rule: ${v.id.toUpperCase()}`);
    console.log(`Impact: ${v.impact}`);
    console.log(`Help: ${v.help}`);
    console.log(`Details: ${v.description}`);
    console.log(`Elements affected: ${v.nodes.length}`);
    v.nodes.forEach((node, idx) => {
      console.log(`  ${node.html.substring(0, 120)}`);
    });  
  });  
});

// Verify only the contact section:
test('Contact section should have no accessibility violations', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/demo_apps/Accessibility.html');

  // Wait for the contact section to be in the DOM before scanning
  const contactSection = page.locator('#contact');
  await expect(contactSection).toBeVisible();

  // Scope the axe scan ONLY to #contact — ignores everything else on the page
  const results = await new AxeBuilder({ page })
    .include('#contact')
    .analyze();
  expect(results.violations).toEqual([]);
});

// Verify the disable rules options in Accessibility testing
test('Disbaling non essential accessibility violations issues', async ({
  page,
}) => {
  await page.goto('http://127.0.0.1:5500/demo_apps/Accessibility.html');
  const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['heading-order'])
      .analyze();      
  console.log(`Found ${accessibilityScanResults.violations.length} accessibility issues as expected for dummy testing!`);
  expect(accessibilityScanResults.violations).not.toEqual([]);
  // Pretty-print for debugging
 // TABLE 1: Summary without nodes
  const summary = accessibilityScanResults.violations.map(v => ({
    rule: v.id,
    severity: v.impact,
    description: v.help,
    no_of_Elements: v.nodes.length,
  }));
  console.log('\n═══════════════════════════════════════════');
  console.log('TABLE 1: ACCESSIBILITY VIOLATIONS SUMMARY');
  console.log('═══════════════════════════════════════════\n');
  console.table(summary);
});

test('accessibility: critical + serious violations only', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/demo_apps/Accessibility.html');
  const results = await new AxeBuilder({ page }).analyze();
  //Filter blockers only (critical + serious) and log summary
  const blockers = results.violations.filter(
    v => v.impact === 'critical' || v.impact === 'serious'
  );

  if (blockers.length === 0 ){
    console.log('No critical or serious accessibility violations found. Great job!');
     expect(blockers).toEqual([]);
  }
  else{
    console.log(`Found ${blockers.length} critical/serious accessibility issues that should be fixed ASAP!`);
    
    // Log summary
    console.log(`\nTotal violations: ${results.violations.length}`);
    console.log(`Critical + Serious: ${blockers.length}`);
    console.log(`Moderate + Minor (ignored): ${results.violations.length - blockers.length}\n`);
    // TABLE 1: Summary of blockers only 
    const summary = blockers.map(b => ({
      rule: b.id,
      severity: b.impact,
      description: b.help,    
    }));
    console.log('\n═══════════════════════════════════════════');
    console.log('TABLE 1: BLOCKER VIOLATIONS SUMMARY');
    console.log('═══════════════════════════════════════════\n');
    console.table(summary);
  }
});


test('playwright.dev: no critical/serious violations', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev');
  const results = await new AxeBuilder({ page }).analyze();
  const blockers = results.violations.filter(
    v => v.impact === 'critical' || v.impact === 'serious'
  );
  console.log(`Playwright.dev blockers: ${blockers.length} (expected 0)`);
  if (blockers.length > 0) {
    const summary = blockers.map(b => ({
      rule: b.id,
      severity: b.impact,
      description: b.help,
    }));
    console.table(summary);
  } else {
    console.log('✅ Clean!');
  }
  await testInfo.attach('playwright-blockers', {
    body: JSON.stringify({ count: blockers.length, violations: blockers }, null, 2),
    contentType: 'application/json',
  });
  // Positive assertion: verify NO blockers
  expect(blockers).toEqual([]);
});