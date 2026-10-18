import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9227;
const ARTIFACT_DIR = 'C:\\Users\\MESH WAHEED\\.gemini\\antigravity-ide\\brain\\f99f852f-9c97-4134-a8ed-c5cf7f7edd5d';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startChrome() {
  const profileDir = path.join(process.cwd(), '.chrome-temp-profile-audit-2');
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'about:blank'
  ], { stdio: 'ignore' });

  return chromeProcess;
}

async function runAudit() {
  console.log('--- STARTING COMPREHENSIVE CARAMEL VERIFICATION AUDIT ---');
  const chromeProcess = await startChrome();
  await sleep(1500);

  try {
    const page = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5173/`, { method: 'PUT' }).then(r => r.json());
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    const consoleLogs = [];
    const pageErrors = [];

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const timeout = setTimeout(() => {
          reject(new Error(`Timeout waiting for CDP response: ${method}`));
        }, 15000);

        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === id) {
            clearTimeout(timeout);
            ws.removeEventListener('message', handler);
            if (res.error) reject(res.error);
            else resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value ?? a.description ?? '').join(' ');
        consoleLogs.push(`[${msg.params.type}] ${text}`);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        pageErrors.push(msg.params.exceptionDetails.text);
      }
    });

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(2500);

    // 1. Audit Single Dark Brown Theme
    console.log('\n[1/8] Verifying Dark-Only Theme Architecture...');
    const themeAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const doc = document.documentElement;
          const body = document.body;
          const computedBody = window.getComputedStyle(body);
          const computedDoc = window.getComputedStyle(doc);
          const themeToggle = document.querySelector('button[aria-label*="المظهر"], button[aria-label*="Theme"]');
          
          return {
            htmlDataTheme: doc.getAttribute('data-theme'),
            bodyBg: computedBody.backgroundColor,
            bodyColor: computedBody.color,
            primaryBgToken: computedDoc.getPropertyValue('--color-bg-primary').trim(),
            surfaceToken: computedDoc.getPropertyValue('--color-surface-card').trim(),
            goldAccentToken: computedDoc.getPropertyValue('--color-accent-gold').trim(),
            themeToggleExists: !!themeToggle,
            localStorageTheme: localStorage.getItem('caramel_theme')
          };
        })()
      `
    });
    console.log('Theme Audit Result:', JSON.stringify(themeAudit.result.value, null, 2));

    // 2. Audit Navigation & Compact Language Switcher
    console.log('\n[2/8] Verifying Navigation & Compact Language Switcher...');
    const navAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const header = document.querySelector('header');
          const navLinks = Array.from(header.querySelectorAll('nav a')).map(a => ({
            text: a.textContent.trim(),
            href: a.getAttribute('href')
          }));
          const switcher = document.querySelector('header [role="group"]');
          const switcherRect = switcher ? switcher.getBoundingClientRect() : null;
          const langButtons = Array.from(switcher?.querySelectorAll('button') || []).map(b => b.textContent.trim());

          return {
            headerHeight: header ? header.offsetHeight : null,
            navLinksCount: navLinks.length,
            navLinks,
            switcherDimensions: switcherRect ? { width: Math.round(switcherRect.width), height: Math.round(switcherRect.height) } : null,
            langButtons
          };
        })()
      `
    });
    console.log('Nav & Switcher Audit:', JSON.stringify(navAudit.result.value, null, 2));

    // 3. Test Language Switching Interaction (AR -> EN -> AR)
    console.log('\n[3/8] Testing Language Switching Interaction...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const enBtn = Array.from(document.querySelectorAll('header [role="group"] button')).find(b => b.textContent.includes('EN'));
          if (enBtn) enBtn.click();
        })()
      `
    });
    await sleep(600);
    const langEnState = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          return {
            lang: document.documentElement.lang,
            dir: document.documentElement.dir,
            heroHeadline: document.querySelector('#hero h1')?.textContent.trim()
          };
        })()
      `
    });
    console.log('English Mode Check:', JSON.stringify(langEnState.result.value, null, 2));

    // Switch back to Arabic
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const arBtn = Array.from(document.querySelectorAll('header [role="group"] button')).find(b => b.textContent.includes('عربي'));
          if (arBtn) arBtn.click();
        })()
      `
    });
    await sleep(600);

    // 4. Audit Living Fashion Background
    console.log('\n[4/8] Verifying Living Fashion Background...');
    const bgAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const cutouts = Array.from(document.querySelectorAll('.bg-cutout-item'));
          const pointerEvents = window.getComputedStyle(document.querySelector('.living-fashion-bg-container') || document.body).pointerEvents;
          return {
            cutoutCount: cutouts.length,
            cutoutImages: cutouts.map(c => c.querySelector('img')?.getAttribute('src')),
            pointerEvents
          };
        })()
      `
    });
    console.log('Living Fashion BG Audit:', JSON.stringify(bgAudit.result.value, null, 2));

    // 5. Audit Product Presentation
    console.log('\n[5/8] Verifying Curated Collection & Product Cards...');
    const productAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const cards = Array.from(document.querySelectorAll('.product-card'));
          const firstCard = cards[0];
          const imgContainer = firstCard?.querySelector('.product-card-image-container');
          const imgRect = imgContainer?.getBoundingClientRect();
          const aspectRatio = imgRect ? (imgRect.width / imgRect.height).toFixed(2) : null;
          const swatches = firstCard?.querySelectorAll('button[role="radio"]');

          return {
            totalProducts: cards.length,
            firstProductAspectRatio: aspectRatio,
            firstProductSwatchesCount: swatches?.length || 0,
            sampleProductNames: cards.slice(0, 3).map(c => c.querySelector('h3')?.textContent.trim())
          };
        })()
      `
    });
    console.log('Product Presentation Audit:', JSON.stringify(productAudit.result.value, null, 2));

    // 6. Audit Customer Conversations (Demo Reviews) Section
    console.log('\n[6/8] Verifying Demo Client Conversations Section...');
    const reviewsAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const section = document.querySelector('#reviews');
          const noticeBanner = section?.querySelector('.demo-reviews-notice');
          const cards = Array.from(section?.querySelectorAll('.review-card') || []);
          const filterTabs = Array.from(section?.querySelectorAll('[role="tablist"] [role="tab"]') || []).map(b => b.textContent.trim());
          const demoBadges = Array.from(section?.querySelectorAll('.badge-demo') || []);

          return {
            sectionExists: !!section,
            noticeBannerText: noticeBanner?.textContent.trim(),
            totalReviewCards: cards.length,
            filterTabs,
            demoBadgesCount: demoBadges.length,
            demoBadgesSample: demoBadges[0]?.textContent.trim(),
            reviewPlatforms: cards.map(c => c.getAttribute('data-platform') || 'unknown')
          };
        })()
      `
    });
    console.log('Demo Client Conversations Audit:', JSON.stringify(reviewsAudit.result.value, null, 2));

    // 7. Audit Social Destinations, Floating WhatsApp, and Footer Credit
    console.log('\n[7/8] Verifying Social Links, WhatsApp Contact & Footer...');
    const contactFooterAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          // Floating WhatsApp
          const floatingWa = document.querySelector('#floating-whatsapp-chat-btn');
          const floatingAside = floatingWa?.closest('aside');
          const floatingStyle = floatingAside ? window.getComputedStyle(floatingAside) : null;
          const floatingRect = floatingWa ? floatingWa.getBoundingClientRect() : null;

          // Brand Social Links
          const socialLinks = Array.from(document.querySelectorAll('#social a, footer a[aria-label*="WhatsApp"], footer a[aria-label*="Instagram"], footer a[aria-label*="TikTok"]')).map(a => ({
            label: a.getAttribute('aria-label') || a.textContent.trim(),
            href: a.getAttribute('href')
          }));

          // Developer Credit
          const devCreditContainer = document.querySelector('.developer-credit');
          const devCreditLink = devCreditContainer?.querySelector('a');

          return {
            floatingWhatsApp: {
              exists: !!floatingWa,
              href: floatingWa?.getAttribute('href') || (floatingWa?.onclick ? 'onClickHandler' : null),
              position: floatingStyle ? {
                position: floatingStyle.position,
                bottom: floatingStyle.bottom,
                left: floatingStyle.left,
                zIndex: floatingStyle.zIndex
              } : null,
              bounding: floatingRect ? {
                left: Math.round(floatingRect.left),
                bottom: Math.round(window.innerHeight - floatingRect.bottom)
              } : null
            },
            socialLinksSample: socialLinks.slice(0, 5),
            developerCredit: {
              containerText: devCreditContainer?.textContent.trim(),
              linkText: devCreditLink?.textContent.trim(),
              linkHref: devCreditLink?.getAttribute('href'),
              target: devCreditLink?.getAttribute('target'),
              rel: devCreditLink?.getAttribute('rel')
            }
          };
        })()
      `
    });
    console.log('Contact & Footer Audit:', JSON.stringify(contactFooterAudit.result.value, null, 2));

    // 8. Capture Screenshots for Visual Verification
    console.log('\n[8/8] Capturing Visual Verification Screenshots...');
    const screenshotDesktop = await send('Page.captureScreenshot', { format: 'png' });
    const desktopPath = path.join(ARTIFACT_DIR, 'refinement-desktop-hero.png');
    fs.writeFileSync(desktopPath, Buffer.from(screenshotDesktop.data, 'base64'));

    await send('Runtime.evaluate', {
      expression: `document.querySelector('#reviews')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await sleep(800);
    const screenshotReviews = await send('Page.captureScreenshot', { format: 'png' });
    const reviewsPath = path.join(ARTIFACT_DIR, 'refinement-desktop-reviews.png');
    fs.writeFileSync(reviewsPath, Buffer.from(screenshotReviews.data, 'base64'));

    // Mobile viewport audit (390x844)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 0, behavior: 'instant' });`
    });
    await sleep(800);
    const screenshotMobile = await send('Page.captureScreenshot', { format: 'png' });
    const mobilePath = path.join(ARTIFACT_DIR, 'refinement-mobile.png');
    fs.writeFileSync(mobilePath, Buffer.from(screenshotMobile.data, 'base64'));

    console.log('Screenshots updated in artifact directory.');
    console.log('Page Errors:', pageErrors.length ? pageErrors : 'Zero uncaught page errors.');
    console.log('\n--- BROWSER AUDIT COMPLETED SUCCESSFULLY ---');
  } finally {
    chromeProcess.kill();
  }
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
