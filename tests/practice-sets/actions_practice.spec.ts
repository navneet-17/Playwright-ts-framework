import { chromium } from 'playwright';
import path from 'path';
import { test } from '@playwright/test';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║        PLAYWRIGHT UI ACTIONS — ASSIGNMENT SPEC           ║
 * ║  Demo App: http://127.0.0.1:5500/demo_apps/Actions.html  ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * ASSIGNMENTS COVERED (complete each TODO in order):
 *
 *  TASK 1  → Text Inputs       (fill, type, clear, textarea)
 *  TASK 2  → Date / Time       (fill date, time, datetime-local)
 *  TASK 3  → Password          (fill + verify masking)
 *  TASK 4  → Checkboxes        (check, uncheck, isChecked guard)
 *  TASK 5  → Radio Buttons     (select a specific radio)
 *  TASK 6  → Single Select     (selectOption by value/label)
 *  TASK 7  → Multi-Select      (select multiple options)
 *  TASK 8  → Button Click      (click, dblclick, hover)
 *  TASK 9  → File Upload       (single file)
 *  TASK 10 → Multi File Upload (multiple files at once)
 *  TASK 11 → Drag and Drop     (dragTo)
 *  TASK 12 → Scroll            (scroll container + scroll to footer)
 */

test('TASK 1 — Text Inputs: fill() vs type()', async () => {
  // ─── BOILERPLATE ──────────────────────────────────────────
  const browser = await chromium.launch({ headless: false, slowMo: 800 });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

  // ── YOUR ASSIGNMENT ───────────────────────────────────────

   //TODO 1a: Locate the text input (role="textbox") and fill it 
   //          with "Navneet Sharma" using page.fill()
//    page.getByPlaceholder('Enter name').fill("Navneet Sharma")
   
//    /* TODO 1b: Clear the same field and re-type it character by 
//              character using page.type() — notice the slowMo difference */
//     await page.waitForTimeout(2000);
//     page.getByPlaceholder('Enter name').fill("")             
//     await page.waitForTimeout(2000);
//     page.getByPlaceholder('Enter name').fill("")             
    page.getByPlaceholder('Enter name').pressSequentially("Navneet Sharma");

    
   
   /* TODO 1c: Locate the <textarea> by its placeholder and fill it
   *          with a multi-line string using \n for line breaks
   *
   * HINT:  page.fill(selector, value)       → clears then fills instantly
   *        page.type(selector, value)        → mimics real keystrokes
   *        page.locator('textarea').fill()   → modern locator style
   */

  
  // TODO 1a — fill the text input
  // await page.fill('[role="textbox"]', 'Navneet Sharma');

  // TODO 1b — clear and retype
  // await page.fill('[role="textbox"]', '');
  // await page.type('[role="textbox"]', 'Navneet Sharma');

  // TODO 1c — fill the textarea
  // await page.fill('#area', 'Line 1\nLine 2\nLine 3');

  await page.waitForTimeout(4000);
  await browser.close();
});


// test('TASK 2 — Date / Time Inputs', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 2a: Fill the Birth date input with "1990-05-15"
//    *          (format: YYYY-MM-DD — this is what browsers expect internally)
//    *
//    * TODO 2b: Fill the Appointment time input with "09:30"
//    *          (format: HH:MM in 24-hr)
//    *
//    * TODO 2c: Fill the Local time (datetime-local) with "2024-12-25T10:00"
//    *          (format: YYYY-MM-DDTHH:MM)
//    *
//    * HINT: Use aria-label to locate these:
//    *       page.getByLabel('Birth date')
//    */

//   // TODO 2a
//   // await page.getByLabel('Birth date').fill('1990-05-15');

//   // TODO 2b
//   // await page.getByLabel('Appointment time').fill('09:30');

//   // TODO 2c
//   // await page.getByLabel('Local time').fill('2024-12-25T10:00');

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 3 — Password Input', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 3a: Fill the password field with "MySecret@123"
//    *
//    * TODO 3b: Read back the value using inputValue() and 
//    *          console.log it — you should get the actual value 
//    *          even though the UI shows dots
//    *
//    * ARCHITECT NOTE: This is a common interview question trap.
//    *   inputValue() returns the real value from the DOM. 
//    *   The "password masking" is purely visual (CSS input[type=password]).
//    */

//   // TODO 3a
//   // await page.getByLabel('Password').fill('MySecret@123');

//   // TODO 3b
//   // const value = await page.getByLabel('Password').inputValue();
//   // console.log('Password field value:', value);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 4 — Checkboxes: check, uncheck, guard', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 4a: Check "I agree to the terms above"
//    *
//    * TODO 4b: Check "Subscribe to newsletter"
//    *
//    * TODO 4c: Uncheck "Subscribe to newsletter"
//    *
//    * TODO 4d: Write a guard — only check "I agree" IF it is 
//    *          not already checked (use isChecked())
//    *
//    * HINT: page.check(selector)     → checks it (idempotent in Playwright)
//    *       page.uncheck(selector)   → unchecks it
//    *       page.isChecked(selector) → returns boolean
//    */

//   // TODO 4a
//   // await page.check('[aria-label="I agree to the terms above"]');

//   // TODO 4b
//   // await page.check('[aria-label="Subscribe to newsletter"]');

//   // TODO 4c
//   // await page.uncheck('[aria-label="Subscribe to newsletter"]');

//   // TODO 4d — conditional check guard
//   // const isChecked = await page.isChecked('[aria-label="I agree to the terms above"]');
//   // if (!isChecked) {
//   //   await page.check('[aria-label="I agree to the terms above"]');
//   // }

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 5 — Radio Buttons', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 5a: Select radio "L" from the "Choose size" group
//    *
//    * TODO 5b: Change selection to "XL"
//    *
//    * TODO 5c: Read back which radio is currently checked
//    *          using locator + inputValue()
//    *
//    * HINT: Radio buttons share the same name="size"
//    *       Locate by value: page.locator('input[name="size"][value="L"]')
//    */

//   // TODO 5a
//   // await page.check('input[name="size"][value="L"]');

//   // TODO 5b
//   // await page.check('input[name="size"][value="XL"]');

//   // TODO 5c — which is selected?
//   // const selected = await page.locator('input[name="size"]:checked').inputValue();
//   // console.log('Selected size:', selected);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 6 — Single Select Dropdown', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 6a: Select "Blue" by its value ("blue")
//    *
//    * TODO 6b: Select "Green" by its visible label text ("Green")
//    *
//    * TODO 6c: Read back the currently selected value with inputValue()
//    *
//    * HINT: page.selectOption(selector, { value: 'blue' })
//    *       page.selectOption(selector, { label: 'Green' })
//    *       page.selectOption(selector, { index: 0 })   ← select by index
//    */

//   // TODO 6a — select by value
//   // await page.selectOption('[aria-label="Choose a color"]', { value: 'blue' });

//   // TODO 6b — select by label
//   // await page.selectOption('[aria-label="Choose a color"]', { label: 'Green' });

//   // TODO 6c — read selected value
//   // const chosen = await page.locator('[aria-label="Choose a color"]').inputValue();
//   // console.log('Selected color:', chosen);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 7 — Multi-Select Dropdown', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 7a: Select "Red" AND "Green" together from the multi-select
//    *
//    * TODO 7b: Read back ALL selected values (not just one)
//    *          using evaluate() to get selectedOptions
//    *
//    * HINT: Pass an array to selectOption for multi-select:
//    *       page.selectOption(selector, ['red', 'green'])
//    *
//    *       For reading multiple selected:
//    *       page.locator('select[multiple]').evaluate(
//    *         el => [...el.selectedOptions].map(o => o.value)
//    *       )
//    */

//   // TODO 7a
//   // await page.selectOption('[aria-label="Choose multiple colors"]', ['red', 'green']);

//   // TODO 7b
//   // const selected = await page
//   //   .locator('[aria-label="Choose multiple colors"]')
//   //   .evaluate(el => [...(el as HTMLSelectElement).selectedOptions].map(o => o.value));
//   // console.log('Multi-selected:', selected);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 8 — Mouse: click, dblclick, hover, rightclick', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 8a: Single click the "Generic Button"
//    *
//    * TODO 8b: Double-click the div#item element
//    *
//    * TODO 8c: Hover over div#item (mouse moves over but no click)
//    *
//    * TODO 8d: Right-click div#item (opens context menu in real browsers)
//    *
//    * HINT: page.click()       → left click
//    *       page.dblclick()    → double click
//    *       page.hover()       → mouse hover, no click
//    *       page.click(sel, { button: 'right' }) → right click
//    */

//   // TODO 8a
//   // await page.click('[role="button"]');

//   // TODO 8b
//   // await page.dblclick('#item');

//   // TODO 8c
//   // await page.hover('#item');

//   // TODO 8d
//   // await page.click('#item', { button: 'right' });

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 9 — File Upload: single file', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 9a: Upload a single file to the "Upload file" input.
//    *          Use path.join(__dirname, 'fixtures', 'sample.pdf')
//    *          OR point to any local file that exists on your machine.
//    *
//    * TODO 9b: Read back the uploaded filename from the input element
//    *
//    * HINT: page.setInputFiles(selector, filePath)
//    *       After upload: locator.inputValue() gives you the fake path.
//    *       Real filename: locator.evaluate(el => el.files[0].name)
//    *
//    * ARCHITECT NOTE: setInputFiles() bypasses the OS file picker dialog.
//    *   This is intentional — OS-native dialogs are outside the browser 
//    *   DOM and can't be automated via Playwright's standard API.
//    */

//   // TODO 9a — upload a file (replace path with a real file on your system)
//   // await page.setInputFiles('[aria-label="Upload file"]', '/path/to/your/file.pdf');

//   // TODO 9b — read back the filename
//   // const filename = await page
//   //   .locator('[aria-label="Upload file"]')
//   //   .evaluate(el => (el as HTMLInputElement).files?.[0]?.name ?? 'No file');
//   // console.log('Uploaded file:', filename);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 10 — File Upload: multiple files', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 10a: Upload TWO files at once to the "Upload files" input
//    *           (the one with multiple attribute)
//    *
//    * TODO 10b: Read back the count of uploaded files and their names
//    *
//    * HINT: Pass an array of paths to setInputFiles:
//    *       page.setInputFiles(selector, ['/path/file1.txt', '/path/file2.txt'])
//    *
//    *       Read all files:
//    *       el => [...el.files].map(f => f.name)
//    */

//   // TODO 10a
//   // await page.setInputFiles('[aria-label="Upload files"]', [
//   //   '/path/to/file1.txt',
//   //   '/path/to/file2.png',
//   // ]);

//   // TODO 10b
//   // const fileNames = await page
//   //   .locator('[aria-label="Upload files"]')
//   //   .evaluate(el => [...(el as HTMLInputElement).files!].map(f => f.name));
//   // console.log('Uploaded files:', fileNames);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 11 — Drag and Drop', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 11a: Drag the "Drag me" element and drop it onto the dropzone
//    *           Verify the dropzone text changes to "Dropped!"
//    *
//    * TODO 11b: Read the dropzone's text content after drop 
//    *           and console.log it
//    *
//    * HINT: Use dragTo() — it is the cleanest Playwright API:
//    *       await page.locator('#item-to-be-dragged').dragTo(
//    *         page.locator('#item-to-drop-at')
//    *       );
//    *
//    * ARCHITECT NOTE: dragTo() internally fires dragstart → dragover → drop events.
//    *   If dragTo() doesn't work (some apps use custom mouse events instead of 
//    *   HTML5 drag events), fallback is:
//    *   page.mouse.move() → page.mouse.down() → page.mouse.move() → page.mouse.up()
//    */

//   // TODO 11a — drag to drop
//   // await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));

//   // TODO 11b — verify result
//   // const dropText = await page.locator('#item-to-drop-at').textContent();
//   // console.log('Dropzone text after drop:', dropText);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// test('TASK 12 — Scrolling: container + page scroll', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 800 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // ── YOUR ASSIGNMENT ───────────────────────────────────────
//   /**
//    * TODO 12a: Scroll INSIDE the scrolling-container div 
//    *           to bring Row 8 into view
//    *
//    * TODO 12b: Scroll the MAIN PAGE all the way down to 
//    *           bring the <footer> into view
//    *
//    * TODO 12c: Verify the footer IS visible using isVisible()
//    *           (it starts outside viewport due to margin-top: 200px)
//    *
//    * HINT for 12a — scroll within a container element:
//    *   page.locator('[data-testid="scrolling-container"]')
//    *     .evaluate(el => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }))
//    *
//    * HINT for 12b — bring footer into viewport:
//    *   page.locator('footer').scrollIntoViewIfNeeded()
//    *
//    * HINT for 12c:
//    *   await page.locator('footer').isVisible()  → returns boolean
//    */

//   // TODO 12a — scroll inside container
//   // await page
//   //   .locator('[data-testid="scrolling-container"]')
//   //   .evaluate(el => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }));

//   // TODO 12b — scroll to footer
//   // await page.locator('footer').scrollIntoViewIfNeeded();

//   // TODO 12c — verify visibility
//   // const isFooterVisible = await page.locator('footer').isVisible();
//   // console.log('Footer visible:', isFooterVisible);

//   await page.waitForTimeout(2000);
//   await browser.close();
// });


// // ╔════════════════════════════════════════════════════════╗
// // ║                  BONUS CHALLENGE                       ║
// // ╠════════════════════════════════════════════════════════╣
// // ║  Write ONE test that does ALL 12 tasks in sequence     ║
// // ║  in a single browser session.                          ║
// // ║                                                        ║
// // ║  Think about: what order avoids interference?          ║
// // ║  E.g. — scrolling to footer first may affect           ║
// // ║  visibility checks for elements above it.              ║
// // ╚════════════════════════════════════════════════════════╝
// test('BONUS — Full Page Interaction Run (all tasks combined)', async () => {
//   const browser = await chromium.launch({ headless: false, slowMo: 500 });
//   const page = await browser.newPage();
//   await page.goto('http://127.0.0.1:5500/demo_apps/Actions.html');

//   // YOUR CHALLENGE: Complete all 12 tasks above in ONE test.
//   // No hints this time. You have your Task 1–12 solutions to copy from.

//   await page.waitForTimeout(2000);
//   await browser.close();
// });