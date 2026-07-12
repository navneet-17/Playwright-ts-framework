// scripts/generate-email-report.js
//
// PURPOSE: Transforms machine-readable JUnit XML (test-results/results.xml)
// into a human-readable, color-coded HTML summary for stakeholder emails.
// This separates "data for tools" (XML, consumed by Jenkins' trend graphs
// and the JUnit publisher) from "data for humans" (this HTML, consumed by
// anyone opening the CI notification email — technical or not).
//
// Runs as a build step AFTER `npx playwright test`, since it depends on
// results.xml already existing.

const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

// Read the raw JUnit XML that Playwright's junit reporter generated
const xml = fs.readFileSync('test-results/results.xml', 'utf-8');

// Parse XML into a JS object we can work with
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
const data = parser.parse(xml);

// JUnit XML can have one <testsuite> or many — normalize to always be an array
const suites = Array.isArray(data.testsuites.testsuite)
  ? data.testsuites.testsuite
  : [data.testsuites.testsuite];

// Pull overall totals from the root <testsuites> element's attributes
const totalTests = Number(data.testsuites['@_tests']);
const totalFailures = Number(data.testsuites['@_failures']);
const totalSkipped = Number(data.testsuites['@_skipped']);
const totalPassed = totalTests - totalFailures - totalSkipped;

const overallColor = totalFailures > 0 ? '#d32f2f' : '#2e7d32'; // red if any failure, else green
const overallLabel = totalFailures > 0 ? 'FAILED' : 'PASSED';

// Build one colored table row per test suite (i.e. per spec file)
let rows = '';
for (const suite of suites) {
  const tests = Number(suite['@_tests']);
  const failures = Number(suite['@_failures']);
  const skipped = Number(suite['@_skipped']);
  const passed = tests - failures - skipped;

  // Row background color logic
  let rowColor = '#e8f5e9'; // light green = all passed
  if (failures > 0) rowColor = '#ffebee'; // light red = has failures
  else if (skipped > 0 && passed === 0) rowColor = '#fff8e1'; // light yellow = fully skipped

  rows += `
    <tr style="background-color:${rowColor};">
      <td style="padding:8px;border:1px solid #ddd;">${suite['@_name']}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;">${tests}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;color:#2e7d32;">${passed}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;color:#d32f2f;">${failures}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;color:#f9a825;">${skipped}</td>
    </tr>`;
}

// Assemble the final HTML block
const html = `
<div style="font-family:Arial,sans-serif;">
  <h2 style="color:${overallColor};">Overall Result: ${overallLabel}</h2>
  <p><b>${totalTests}</b> tests — 
     <span style="color:#2e7d32;">${totalPassed} passed</span>, 
     <span style="color:#d32f2f;">${totalFailures} failed</span>, 
     <span style="color:#f9a825;">${totalSkipped} skipped</span></p>

  <table style="border-collapse:collapse;width:100%;margin-top:12px;">
    <thead>
      <tr style="background-color:#37474f;color:white;">
        <th style="padding:8px;border:1px solid #ddd;">Test Suite</th>
        <th style="padding:8px;border:1px solid #ddd;">Total</th>
        <th style="padding:8px;border:1px solid #ddd;">Passed</th>
        <th style="padding:8px;border:1px solid #ddd;">Failed</th>
        <th style="padding:8px;border:1px solid #ddd;">Skipped</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;

// Write the result — this is the file your Jenkins email step will inject
fs.writeFileSync('test-results/email-summary.html', html);
console.log('✅ Stakeholder email summary generated: test-results/email-summary.html');