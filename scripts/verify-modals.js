const { chromium } = require('D:/LUZIBER/Data/luzibir-skills/skills/short-editing/engine/node_modules/playwright-core');

async function testModals() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:4200...');
  await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  let allPassed = true;
  const logCheck = (name, passed, details = '') => {
    if (passed) {
      console.log(`  [PASS] ${name} ${details}`);
    } else {
      console.log(`  [FAIL] ${name} ${details}`);
      allPassed = false;
    }
  };

  // ==========================================
  // TEST 1: CV MODAL
  // ==========================================
  console.log('\n--- TESTING CV MODAL ACCESSIBILITY & FOCUS MANAGEMENT ---');

  // Find a trigger button for CV Modal, e.g. the navbar CV button
  const cvTrigger = await page.$('header nav button[aria-label="Preview or Download Curriculum Vitae"]');
  if (!cvTrigger) {
    throw new Error('CV trigger button not found');
  }

  // Focus the trigger button first, then press Enter to open
  await cvTrigger.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);

  // 1. ARIA Attributes
  const cvModalAria = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return { exists: false };
    const labelledBy = dialog.getAttribute('aria-labelledby');
    const describedBy = dialog.getAttribute('aria-describedby');
    const titleEl = labelledBy ? document.getElementById(labelledBy) : null;
    const descEl = describedBy ? document.getElementById(describedBy) : null;
    return {
      exists: true,
      role: dialog.getAttribute('role'),
      ariaModal: dialog.getAttribute('aria-modal'),
      hasTrapDirective: dialog.hasAttribute('cdktrapfocus'),
      labelledBy,
      titleText: titleEl?.innerText.trim(),
      describedBy,
      descText: descEl?.innerText.trim()
    };
  });

  logCheck('CV Modal exists with role="dialog"', cvModalAria.exists && cvModalAria.role === 'dialog');
  logCheck('CV Modal has aria-modal="true"', cvModalAria.ariaModal === 'true');
  logCheck('CV Modal aria-labelledby points to valid title', Boolean(cvModalAria.titleText), `("${cvModalAria.titleText}")`);
  logCheck('CV Modal aria-describedby points to valid description', Boolean(cvModalAria.descText), `("${cvModalAria.descText}")`);

  // 2. Initial Focus inside modal
  const cvInitialFocus = await page.evaluate(() => {
    const active = document.activeElement;
    const dialog = document.querySelector('div[role="dialog"]');
    return {
      tagName: active?.tagName,
      ariaLabel: active?.getAttribute('aria-label'),
      title: active?.getAttribute('title'),
      isInsideDialog: dialog?.contains(active)
    };
  });
  logCheck('Initial focus moved inside CV Modal', cvInitialFocus.isInsideDialog, `(Focused: <${cvInitialFocus.tagName}> "${cvInitialFocus.ariaLabel || cvInitialFocus.title}")`);

  // 3. Focus Trap Cycling (Tab and Shift+Tab)
  console.log('  Testing Tab cycling inside CV Modal...');
  const cvTabHistory = [];
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.querySelector('div[role="dialog"]');
      return {
        label: (active?.innerText?.trim() || active?.getAttribute('aria-label') || active?.getAttribute('title') || active?.tagName).slice(0, 30),
        isInsideDialog: dialog?.contains(active)
      };
    });
    cvTabHistory.push(focused);
  }
  const cvEscaped = cvTabHistory.some(f => !f.isInsideDialog);
  logCheck('Focus does NOT escape CV Modal during 15 Tab presses (Focus Trap)', !cvEscaped);

  // Test Shift+Tab reverse cycling
  console.log('  Testing Shift+Tab reverse cycling inside CV Modal...');
  const cvShiftTabHistory = [];
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Shift+Tab');
    const focused = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.querySelector('div[role="dialog"]');
      return {
        label: (active?.innerText?.trim() || active?.getAttribute('aria-label') || active?.getAttribute('title') || active?.tagName).slice(0, 30),
        isInsideDialog: dialog?.contains(active)
      };
    });
    cvShiftTabHistory.push(focused);
  }
  const cvShiftEscaped = cvShiftTabHistory.some(f => !f.isInsideDialog);
  logCheck('Focus does NOT escape CV Modal during Shift+Tab', !cvShiftEscaped);

  // 4. Escape key closes modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  const cvClosed = await page.evaluate(() => {
    return document.querySelector('div[role="dialog"]') === null;
  });
  logCheck('Pressing ESC closes CV Modal', cvClosed);

  // 5. Focus Restoration to trigger
  const cvRestoredFocus = await page.evaluate(() => {
    const active = document.activeElement;
    return {
      tagName: active?.tagName,
      ariaLabel: active?.getAttribute('aria-label'),
      isTrigger: active?.getAttribute('aria-label') === 'Preview or Download Curriculum Vitae'
    };
  });
  logCheck('Focus restored to CV trigger element upon closing', cvRestoredFocus.isTrigger, `(Active element: "${cvRestoredFocus.ariaLabel}")`);

  // ==========================================
  // TEST 2: PROJECT COCKPIT MODAL
  // ==========================================
  console.log('\n--- TESTING PROJECT COCKPIT ACCESSIBILITY & FOCUS MANAGEMENT ---');

  // Find a project "Inspect Full System" button
  const cockpitTrigger = await page.$('button[aria-label^="Inspect Full System Dossier"]');
  if (!cockpitTrigger) {
    throw new Error('Project Cockpit trigger button not found');
  }

  // Get the trigger element's aria-label to verify restoration
  const expectedTriggerLabel = await page.evaluate(el => el.getAttribute('aria-label'), cockpitTrigger);

  // Focus trigger and open
  await cockpitTrigger.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);

  // 1. ARIA Attributes
  const cockpitAria = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return { exists: false };
    const labelledBy = dialog.getAttribute('aria-labelledby');
    const describedBy = dialog.getAttribute('aria-describedby');
    const titleEl = labelledBy ? document.getElementById(labelledBy) : null;
    const descEl = describedBy ? document.getElementById(describedBy) : null;
    return {
      exists: true,
      role: dialog.getAttribute('role'),
      ariaModal: dialog.getAttribute('aria-modal'),
      hasTrapDirective: dialog.hasAttribute('cdktrapfocus'),
      labelledBy,
      titleText: titleEl?.innerText.trim(),
      describedBy,
      descText: descEl?.innerText.trim()?.slice(0, 50)
    };
  });

  logCheck('Project Cockpit exists with role="dialog"', cockpitAria.exists && cockpitAria.role === 'dialog');
  logCheck('Project Cockpit has aria-modal="true"', cockpitAria.ariaModal === 'true');
  logCheck('Project Cockpit aria-labelledby points to title', Boolean(cockpitAria.titleText), `("${cockpitAria.titleText}")`);
  logCheck('Project Cockpit aria-describedby points to description', Boolean(cockpitAria.descText), `("${cockpitAria.descText}...")`);

  // 2. Initial Focus inside modal
  const cockpitInitialFocus = await page.evaluate(() => {
    const active = document.activeElement;
    const dialog = document.querySelector('div[role="dialog"]');
    return {
      tagName: active?.tagName,
      ariaLabel: active?.getAttribute('aria-label'),
      title: active?.getAttribute('title'),
      isInsideDialog: dialog?.contains(active)
    };
  });
  logCheck('Initial focus moved inside Project Cockpit', cockpitInitialFocus.isInsideDialog, `(Focused: <${cockpitInitialFocus.tagName}> "${cockpitInitialFocus.ariaLabel || cockpitInitialFocus.title}")`);

  // 3. Focus Trap Cycling (Tab through cockpit)
  console.log('  Testing Tab cycling inside Project Cockpit...');
  const cockpitTabHistory = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.querySelector('div[role="dialog"]');
      return {
        label: (active?.innerText?.trim() || active?.getAttribute('aria-label') || active?.getAttribute('title') || active?.tagName).slice(0, 35),
        isInsideDialog: dialog?.contains(active)
      };
    });
    cockpitTabHistory.push(focused);
  }
  const cockpitEscaped = cockpitTabHistory.some(f => !f.isInsideDialog);
  logCheck('Focus does NOT escape Project Cockpit during 25 Tab presses (Focus Trap)', !cockpitEscaped);

  // Test Shift+Tab reverse cycling
  console.log('  Testing Shift+Tab reverse cycling inside Project Cockpit...');
  const cockpitShiftTabHistory = [];
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Shift+Tab');
    const focused = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.querySelector('div[role="dialog"]');
      return {
        label: (active?.innerText?.trim() || active?.getAttribute('aria-label') || active?.getAttribute('title') || active?.tagName).slice(0, 35),
        isInsideDialog: dialog?.contains(active)
      };
    });
    cockpitShiftTabHistory.push(focused);
  }
  const cockpitShiftEscaped = cockpitShiftTabHistory.some(f => !f.isInsideDialog);
  logCheck('Focus does NOT escape Project Cockpit during Shift+Tab', !cockpitShiftEscaped);

  // 4. Test Escape key closes modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  const cockpitClosed = await page.evaluate(() => {
    return document.querySelector('div[role="dialog"]') === null;
  });
  logCheck('Pressing ESC closes Project Cockpit', cockpitClosed);

  // 5. Focus Restoration to trigger element
  const cockpitRestoredFocus = await page.evaluate(expectedLabel => {
    const active = document.activeElement;
    return {
      tagName: active?.tagName,
      ariaLabel: active?.getAttribute('aria-label'),
      isTrigger: active?.getAttribute('aria-label') === expectedLabel
    };
  }, expectedTriggerLabel);
  logCheck('Focus restored to Project Cockpit trigger element upon closing', cockpitRestoredFocus.isTrigger, `(Active element: "${cockpitRestoredFocus.ariaLabel}")`);

  console.log('\n==========================================');
  if (allPassed) {
    console.log('ALL MODAL ACCESSIBILITY & FOCUS MANAGEMENT TESTS PASSED PERFECTLY!');
  } else {
    console.log('SOME TESTS FAILED - SEE DETAILS ABOVE.');
    process.exit(1);
  }

  await browser.close();
}

testModals().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
