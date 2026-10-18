import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

const chromeProcess = spawn(CHROME_PATH, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=' + process.cwd() + '\\.chrome-temp-profile',
  'about:blank'
], { stdio: 'ignore' });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await sleep(1000);
  try {
    const newPage = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5173/`, { method: 'PUT' }).then(r => r.json());
    const ws = new WebSocket(newPage.webSocketDebuggerUrl);

    let messageId = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = messageId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve } = pending.get(msg.id);
        pending.delete(msg.id);
        resolve(msg.result);
      }
    };

    await send('Runtime.enable');
    await send('Page.enable');
    await send('DOM.enable');

    // Allow 3.5 seconds for complete render
    await sleep(3500);

    const evalResult = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const root = document.getElementById('root');
          return {
            title: document.title,
            rootChildCount: root ? root.children.length : 0,
            rootInnerHtmlLength: root ? root.innerHTML.length : 0,
            heroHeadline: document.querySelector('h1') ? document.querySelector('h1').innerText : null,
            showroomGridCards: document.querySelectorAll('.showroom-grid > *').length,
            reviewsCount: document.querySelectorAll('[aria-label*="تقييم"], [aria-label*="Review"]').length,
            footerVisible: Boolean(document.querySelector('footer')),
            whatsappFloatingButton: Boolean(document.querySelector('a[href*="wa.me"]'))
          };
        })()
      `,
      returnByValue: true
    });

    console.log('\n=== REAL BROWSER RENDER REPORT ===');
    console.log(JSON.stringify(evalResult?.result?.value, null, 2));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    if (screenshot?.data) {
      fs.writeFileSync('rendered-verification.png', Buffer.from(screenshot.data, 'base64'));
      console.log('Saved rendered-verification.png (size:', screenshot.data.length, 'bytes)');
    }

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chromeProcess.kill();
  }
}

run();
