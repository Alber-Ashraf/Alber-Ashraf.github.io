const { chromium } = require('D:/LUZIBER/Data/luzibir-skills/skills/short-editing/engine/node_modules/playwright-core');

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:4200...');
  await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Desktop evaluation
  const desktopAudit = await page.evaluate(() => {
    const targetSections = ['hero', 'projects', 'contact'];
    const interactive = [...document.querySelectorAll('button, a[href], [role=button]')];

    // Filter to Navbar, Hero, Projects, Contact
    const sectionInteractive = interactive.filter(el => {
      const isNav = el.closest('header, nav');
      const section = el.closest('section, footer');
      const sectionId = section?.id;
      return isNav || (sectionId && targetSections.includes(sectionId));
    });

    const results = sectionInteractive.map(el => {
      const rect = el.getBoundingClientRect();
      const section = el.closest('header, nav') ? 'navbar' : (el.closest('section, footer')?.id || 'other');
      const label = (el.innerText.trim() || el.getAttribute('aria-label') || el.getAttribute('title') || el.tagName).replace(/\s+/g, ' ').slice(0, 45);
      const isVisible = rect.width > 0 && rect.height > 0;
      return {
        section,
        label,
        tag: el.tagName.toLowerCase(),
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
        isVisible,
        passes44h: rect.height >= 43.5, // 44px threshold with sub-pixel tolerance
        passes44w: rect.width >= 43.5 || el.classList.contains('flex-1') || el.classList.contains('w-full'),
        hasAccessibleName: Boolean(el.innerText.trim() || el.getAttribute('aria-label') || el.getAttribute('title')),
        ariaLabel: el.getAttribute('aria-label')
      };
    });

    return {
      total: results.length,
      visible: results.filter(r => r.isVisible).length,
      failingHeight: results.filter(r => r.isVisible && !r.passes44h),
      failingName: results.filter(r => r.isVisible && !r.hasAccessibleName),
      all: results.filter(r => r.isVisible)
    };
  });

  console.log('\n--- DESKTOP AUDIT (1440x900) ---');
  console.log(`Total interactive elements in target sections: ${desktopAudit.visible}`);
  console.log(`Failing height (<44px): ${desktopAudit.failingHeight.length}`);
  if (desktopAudit.failingHeight.length > 0) {
    console.log('Failing height items:', desktopAudit.failingHeight);
  }
  console.log(`Failing name/label: ${desktopAudit.failingName.length}`);
  if (desktopAudit.failingName.length > 0) {
    console.log('Failing name items:', desktopAudit.failingName);
  }

  // Switch cards to 'flow' view and test layer buttons
  await page.evaluate(() => {
    const flowButtons = [...document.querySelectorAll('button')].filter(b => b.innerText.includes('Architecture Flow'));
    if (flowButtons.length > 0) {
      flowButtons[0].click();
    }
  });
  await page.waitForTimeout(500);

  const flowAudit = await page.evaluate(() => {
    const layerButtons = [...document.querySelectorAll('#projects button')].filter(b => b.getAttribute('title')?.startsWith('Inspect '));
    return layerButtons.map(b => {
      const rect = b.getBoundingClientRect();
      return {
        label: b.getAttribute('title'),
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
        passes44h: rect.height >= 43.5,
        ariaLabel: b.getAttribute('aria-label')
      };
    });
  });
  console.log(`\nFlow mode layer buttons tested: ${flowAudit.length}`);
  console.log('Layer buttons audit:', flowAudit);

  // Mobile evaluation (375x812)
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileClosedAudit = await mobilePage.evaluate(() => {
    const targetSections = ['hero', 'projects', 'contact'];
    const interactive = [...document.querySelectorAll('button, a[href], [role=button]')];

    const sectionInteractive = interactive.filter(el => {
      const isNav = el.closest('header, nav');
      const section = el.closest('section, footer');
      const sectionId = section?.id;
      return isNav || (sectionId && targetSections.includes(sectionId));
    });

    const results = sectionInteractive.map(el => {
      const rect = el.getBoundingClientRect();
      const section = el.closest('header, nav') ? 'navbar' : (el.closest('section, footer')?.id || 'other');
      const label = (el.innerText.trim() || el.getAttribute('aria-label') || el.getAttribute('title') || el.tagName).replace(/\s+/g, ' ').slice(0, 45);
      const isVisible = rect.width > 0 && rect.height > 0;
      return {
        section,
        label,
        tag: el.tagName.toLowerCase(),
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
        isVisible,
        passes44h: rect.height >= 43.5,
        hasAccessibleName: Boolean(el.innerText.trim() || el.getAttribute('aria-label') || el.getAttribute('title')),
        ariaLabel: el.getAttribute('aria-label')
      };
    });

    return {
      total: results.length,
      visible: results.filter(r => r.isVisible).length,
      failingHeight: results.filter(r => r.isVisible && !r.passes44h),
      failingName: results.filter(r => r.isVisible && !r.hasAccessibleName)
    };
  });

  console.log('\n--- MOBILE AUDIT (375x812, Drawer Closed) ---');
  console.log(`Total visible interactive elements: ${mobileClosedAudit.visible}`);
  console.log(`Failing height (<44px): ${mobileClosedAudit.failingHeight.length}`);
  if (mobileClosedAudit.failingHeight.length > 0) {
    console.log('Failing items:', mobileClosedAudit.failingHeight);
  }

  // Open mobile drawer
  await mobilePage.click('button[aria-label="Toggle mobile menu"]');
  await mobilePage.waitForTimeout(500);

  const mobileOpenAudit = await mobilePage.evaluate(() => {
    const drawer = document.getElementById('mobile-navigation');
    if (!drawer) return { error: 'Drawer not found' };
    const items = [...drawer.querySelectorAll('button, a[href]')];
    return items.map(el => {
      const rect = el.getBoundingClientRect();
      const label = (el.innerText.trim() || el.getAttribute('aria-label') || el.getAttribute('title') || el.tagName).replace(/\s+/g, ' ').slice(0, 45);
      return {
        label,
        tag: el.tagName.toLowerCase(),
        width: Math.round(rect.width * 10) / 10,
        height: Math.round(rect.height * 10) / 10,
        passes44h: rect.height >= 43.5,
        passes44w: rect.width >= 43.5
      };
    });
  });

  console.log('\n--- MOBILE DRAWER AUDIT (375x812, Drawer Open) ---');
  console.log(`Mobile drawer items: ${mobileOpenAudit.length}`);
  const drawerFailing = mobileOpenAudit.filter(i => !i.passes44h || !i.passes44w);
  console.log(`Drawer items failing 44x44: ${drawerFailing.length}`);
  if (drawerFailing.length > 0) {
    console.log('Failing drawer items:', drawerFailing);
  } else {
    console.log('All mobile drawer items satisfy >= 44x44px!');
  }

  // Contrast Audit with Canvas sRGB normalization
  const contrastAudit = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const toRgb = c => {
      if (!c || c === 'transparent' || c === 'rgba(0, 0, 0, 0)') return [5, 7, 14];
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#05070e';
      ctx.fillRect(0, 0, 1, 1);
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    };
    const lum = c => {
      const [r, g, b] = toRgb(c);
      const [lr, lg, lb] = [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
    };
    const bgOf = el => {
      while (el) {
        const c = getComputedStyle(el).backgroundColor;
        if (c && c !== 'transparent' && c !== 'rgba(0, 0, 0, 0)') return c;
        el = el.parentElement;
      }
      return 'rgb(5, 7, 14)';
    };

    const targetSections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
    const textEls = [...document.querySelectorAll('p, span, a, li, button, h1, h2, h3, h4, label')].filter(el => {
      const isNav = el.closest('header, nav');
      const section = el.closest('section, footer');
      const sectionId = section?.id;
      return (isNav || (sectionId && targetSections.includes(sectionId))) &&
             [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    });

    const slate500Count = document.querySelectorAll('.text-slate-500').length;
    const slate400Count = document.querySelectorAll('#skills .text-slate-400, #projects .text-slate-400, #contact .text-slate-400').length;

    const lowContrast = [];
    textEls.forEach(el => {
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) === 0) return;
      if (s.WebkitBackgroundClip === 'text' || s.backgroundClip === 'text') return;
      const fg = lum(s.color), bg = lum(bgOf(el));
      const ratio = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && Number(s.fontWeight) >= 700);
      if (ratio < (large ? 3.0 : 4.5)) {
        lowContrast.push({
          text: el.textContent.trim().slice(0, 35),
          ratio: ratio.toFixed(2),
          fg: s.color,
          bg: bgOf(el),
          section: el.closest('section, footer')?.id || 'navbar'
        });
      }
    });

    return {
      totalTextChecked: textEls.length,
      slate500Count,
      slate400Count,
      lowContrastCount: lowContrast.length,
      lowContrast
    };
  });

  console.log('\n--- CONTRAST AUDIT (Canvas sRGB Normalization) ---');
  console.log(`Total text elements checked across all sections: ${contrastAudit.totalTextChecked}`);
  console.log(`Remaining .text-slate-500 elements in DOM: ${contrastAudit.slate500Count}`);
  console.log(`Verified .text-slate-400 elements in #skills, #projects, #contact: ${contrastAudit.slate400Count}`);
  console.log(`Low contrast count: ${contrastAudit.lowContrastCount}`);
  if (contrastAudit.lowContrastCount > 0) {
    console.log('Low contrast items:', contrastAudit.lowContrast);
  } else {
    console.log('All text elements pass WCAG AA contrast (>= 4.5:1 or >= 3.0:1 for large)!');
  }

  // Measure CLS
  const cls = await page.evaluate(() => {
    return new Promise(resolve => {
      let clsValue = 0;
      const observer = new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 500);
    });
  });
  console.log(`\nMeasured CLS: ${cls}`);

  // ==============================================================
  // PERFORMANCE & BREAKPOINT AUDIT: NAVBAR RAF & STANDARD BREAKPOINTS
  // ==============================================================
  console.log('\n--- PERFORMANCE & BREAKPOINT AUDIT ---');

  // 1. Verify no invalid 'xs:' classes exist in DOM
  const xsClassesCount = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    let count = 0;
    const offenders = [];
    all.forEach(el => {
      const cls = el.className;
      if (typeof cls === 'string' && /\bxs:/.test(cls)) {
        count++;
        offenders.push(el.outerHTML.slice(0, 80));
      }
    });
    return { count, offenders };
  });

  console.log(`Elements with invalid 'xs:' breakpoint in DOM: ${xsClassesCount.count}`);
  if (xsClassesCount.count > 0) {
    console.error('Offending elements with xs: classes:', xsClassesCount.offenders);
  } else {
    console.log('[PASS] All breakpoints comply with standard Tailwind CSS breakpoints (no invalid xs: utility classes).');
  }

  // 2. Test standard 'sm:inline' responsive behavior on desktop vs mobile
  // Open CV modal on desktop to inspect 'Download' label
  await page.click('button[aria-label="Preview or Download Curriculum Vitae"]');
  await page.waitForTimeout(400);

  const desktopDownloadLabelVisible = await page.evaluate(() => {
    const downloadSpan = document.querySelector('div[role="dialog"] a[aria-label^="Download"] span.sm\\:inline');
    if (!downloadSpan) return false;
    const style = window.getComputedStyle(downloadSpan);
    return style.display !== 'none';
  });
  console.log(`Desktop (1440px) Download label display is visible (sm:inline): ${desktopDownloadLabelVisible}`);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // Check on mobile viewport (375px < 640px) that sm:inline is hidden
  await mobilePage.click('button[aria-label="Preview or Download Curriculum Vitae"]');
  await mobilePage.waitForTimeout(400);

  const mobileDownloadLabelHidden = await mobilePage.evaluate(() => {
    const downloadSpan = document.querySelector('div[role="dialog"] a[aria-label^="Download"] span.sm\\:inline');
    if (!downloadSpan) return false;
    const style = window.getComputedStyle(downloadSpan);
    return style.display === 'none';
  });
  console.log(`Mobile (375px) Download label display is hidden (hidden sm:inline): ${mobileDownloadLabelHidden}`);

  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(400);

  // 3. Test Navbar Scroll Performance with RAF Scroll-Spy
  console.log('\n--- TESTING NAVBAR RAF SCROLL PERFORMANCE ---');
  const scrollTestPassed = await page.evaluate(async () => {
    const sections = ['skills', 'projects', 'contact'];
    let allUpdated = true;

    for (const secId of sections) {
      const el = document.getElementById(secId);
      if (!el) continue;
      const targetY = el.offsetTop - 80;
      window.scrollTo({ top: targetY, behavior: 'instant' });
      // Allow requestAnimationFrame callback to settle
      await new Promise(r => requestAnimationFrame(() => setTimeout(r, 60)));

      const activeBtn = document.querySelector('header nav .lg\\:flex button.bg-gradient-to-r');
      const text = activeBtn?.innerText?.trim()?.toLowerCase() || '';
      const matched = text.includes(secId) || (secId === 'contact' && text.includes('contact'));
      if (!matched) {
        allUpdated = false;
      }
    }
    // Return to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    return allUpdated;
  });

  console.log(`Navbar RAF scroll-spy tracking passed: ${scrollTestPassed}`);

  await browser.close();
  await mobileContext.close();
}

verify().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
