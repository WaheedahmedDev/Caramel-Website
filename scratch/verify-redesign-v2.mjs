import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9229;
const ARTIFACT_DIR = 'C:\\Users\\MESH WAHEED\\.gemini\\antigravity-ide\\brain\\f99f852f-9c97-4134-a8ed-c5cf7f7edd5d';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startChrome() {
  const profileDir = path.join(process.cwd(), '.chrome-temp-profile-audit-v2');
  return spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    'about:blank'
  ], { stdio: 'ignore' });
}

async function runAudit() {
  console.log('--- STARTING CARAMEL VISUAL REDESIGN V2 BROWSER AUDIT ---');
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

    // 1. Audit Single Dark Brown Theme & Background
    console.log('\n[1/7] Verifying Theme & Clean Ambient Background...');
    const themeAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const doc = document.documentElement;
          const body = document.body;
          const computedBody = window.getComputedStyle(body);
          const floatingCutouts = document.querySelectorAll('.living-fashion-bg-container .bg-cutout-item, body > .bg-cutout-item');
          
          return {
            htmlDataTheme: doc.getAttribute('data-theme'),
            bodyBg: computedBody.backgroundColor,
            bodyColor: computedBody.color,
            floatingCutoutsCount: floatingCutouts.length,
            themeToggleExists: !!document.querySelector('button[aria-label*="المظهر"], button[aria-label*="Theme"]')
          };
        })()
      `
    });
    console.log('Theme & Background Audit:', JSON.stringify(themeAudit.result.value, null, 2));

    // 2. Audit Hero Composition
    console.log('\n[2/7] Verifying Hero Composition matching Reference...');
    const heroAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const hero = document.querySelector('#home');
          const brandWordmark = hero?.querySelector('span[style*="font-family"]');
          const headline = hero?.querySelector('h1');
          const bagImg = hero?.querySelector('.hero-featured-bag');
          const bagShadow = hero?.querySelector('div[aria-hidden="true"][style*="radial-gradient"]');
          const ctas = Array.from(hero?.querySelectorAll('a[href*="#"]') || []).map(a => a.textContent.trim());

          return {
            heroExists: !!hero,
            brandWordmarkText: brandWordmark?.textContent.trim(),
            headlineText: headline?.textContent.trim(),
            featuredBagSrc: bagImg?.getAttribute('src'),
            hasGroundingShadow: !!bagShadow,
            ctaButtons: ctas
          };
        })()
      `
    });
    console.log('Hero Audit:', JSON.stringify(heroAudit.result.value, null, 2));

    // 3. Audit Product Collection & Removal of Demo Text
    console.log('\n[3/7] Verifying Product Collection Grid & Removal of Demo Wording...');
    const productAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const section = document.querySelector('#collection');
          const demoNotice = document.querySelector('aside[aria-label*="تجريبية"], .demo-reviews-notice');
          const cards = Array.from(document.querySelectorAll('.product-card'));
          const demoBadgesOnCards = document.querySelectorAll('.product-card .badge-demo');
          const samplePrices = Array.from(document.querySelectorAll('.product-card')).filter(c => c.textContent.includes('سعر استرشادي') || c.textContent.includes('Sample price'));
          const grid = document.querySelector('.showroom-grid');
          const gridStyle = grid ? window.getComputedStyle(grid) : null;

          return {
            demoNoticeBannerExists: !!demoNotice,
            demoBadgesOnCardsCount: demoBadgesOnCards.length,
            cardsWithSamplePriceCount: samplePrices.length,
            totalProducts: cards.length,
            gridColumns: gridStyle?.gridTemplateColumns,
            sampleProductTitles: cards.slice(0, 3).map(c => c.querySelector('h3')?.textContent.trim())
          };
        })()
      `
    });
    console.log('Product Collection Audit:', JSON.stringify(productAudit.result.value, null, 2));

    // 4. Audit Customer Reviews Section
    console.log('\n[4/7] Verifying Customer Reviews Section...');
    const reviewsAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const section = document.querySelector('#reviews');
          const demoNotice = section?.querySelector('.demo-reviews-notice');
          const demoBadges = section?.querySelectorAll('.badge-demo');
          const cards = Array.from(section?.querySelectorAll('.review-card') || []);

          return {
            sectionExists: !!section,
            hasDemoNoticeBanner: !!demoNotice,
            demoBadgesCount: demoBadges?.length || 0,
            totalReviews: cards.length,
            platforms: cards.map(c => c.getAttribute('data-platform'))
          };
        })()
      `
    });
    console.log('Customer Reviews Audit:', JSON.stringify(reviewsAudit.result.value, null, 2));

    // 5. Audit Single Social Links Group & Floating WhatsApp Button
    console.log('\n[5/7] Verifying Single Social Group & Floating WhatsApp Button...');
    const contactAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const contactSection = document.querySelector('#contact');
          const socialLinks = Array.from(contactSection?.querySelectorAll('a[target="_blank"]') || []).map(a => ({
            label: a.getAttribute('aria-label') || a.textContent.trim(),
            href: a.getAttribute('href')
          }));

          const floatingWa = document.querySelector('#floating-whatsapp-chat-btn');
          const floatingAside = floatingWa?.closest('aside');
          const floatingStyle = floatingAside ? window.getComputedStyle(floatingAside) : null;
          const floatingRect = floatingWa?.getBoundingClientRect();

          return {
            contactSectionExists: !!contactSection,
            socialLinksInContact: socialLinks,
            floatingWhatsApp: {
              exists: !!floatingWa,
              position: floatingStyle?.position,
              bottom: floatingStyle?.bottom,
              left: floatingStyle?.left,
              bounding: floatingRect ? {
                left: Math.round(floatingRect.left),
                bottom: Math.round(window.innerHeight - floatingRect.bottom)
              } : null
            }
          };
        })()
      `
    });
    console.log('Contact & Social Audit:', JSON.stringify(contactAudit.result.value, null, 2));

    // 6. Audit Minimal Two-Line Footer
    console.log('\n[6/7] Verifying Minimal Two-Line Footer...');
    const footerAudit = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const footer = document.querySelector('footer');
          const paragraphs = Array.from(footer?.querySelectorAll('p') || []).map(p => p.textContent.trim());
          const devCredit = footer?.querySelector('.developer-credit');
          const devLink = devCredit?.querySelector('a');

          return {
            footerExists: !!footer,
            paragraphCount: paragraphs.length,
            paragraphs,
            devLinkText: devLink?.textContent.trim(),
            devLinkHref: devLink?.getAttribute('href')
          };
        })()
      `
    });
    console.log('Footer Audit:', JSON.stringify(footerAudit.result.value, null, 2));

    // 7. Capture Desktop and Mobile Screenshots
    console.log('\n[7/7] Capturing Visual Screenshots...');
    // Desktop Hero
    const shotHero = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'redesign-desktop-hero.png'), Buffer.from(shotHero.data, 'base64'));
    console.log('Saved redesign-desktop-hero.png');

    // Desktop Collection
    await send('Runtime.evaluate', {
      expression: `document.querySelector('#collection')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await sleep(600);
    const shotCollection = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'redesign-desktop-collection.png'), Buffer.from(shotCollection.data, 'base64'));
    console.log('Saved redesign-desktop-collection.png');

    // Desktop Contact & Footer
    await send('Runtime.evaluate', {
      expression: `document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await sleep(600);
    const shotContact = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'redesign-desktop-contact-footer.png'), Buffer.from(shotContact.data, 'base64'));
    console.log('Saved redesign-desktop-contact-footer.png');

    // Mobile Viewport (390x844)
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
    const shotMobileHero = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'redesign-mobile.png'), Buffer.from(shotMobileHero.data, 'base64'));
    console.log('Saved redesign-mobile.png');

    // Mobile Collection 2-col check
    await send('Runtime.evaluate', {
      expression: `document.querySelector('#collection')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await sleep(600);
    const shotMobileCollection = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'redesign-mobile-collection.png'), Buffer.from(shotMobileCollection.data, 'base64'));
    console.log('Saved redesign-mobile-collection.png');

    console.log('\nPage Errors:', pageErrors.length ? pageErrors : 'Zero uncaught page errors.');
    console.log('Console Logs:', consoleLogs);
    console.log('\n--- BROWSER AUDIT COMPLETED SUCCESSFULLY ---');
  } finally {
    chromeProcess.kill();
  }
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
