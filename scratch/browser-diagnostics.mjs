import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

console.log('Spawning headless Chrome to verify clean render...');
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

async function getDebuggerUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const data = await res.json();
      return data.webSocketDebuggerUrl;
    } catch (e) {
      await sleep(300);
    }
  }
  throw new Error('Chrome remote debugging port not responding');
}

async function run() {
  try {
    const wsUrl = await getDebuggerUrl();
    const newPageRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5173/`, { method: 'PUT' });
    const pageData = await newPageRes.json();

    const ws = new WebSocket(pageData.webSocketDebuggerUrl);

    let messageId = 1;
    const pending = new Map();
    const consoleLogs = [];
    const runtimeExceptions = [];
    const networkErrors = [];

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
      } else if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({
          type: msg.params.type,
          args: msg.params.args.map(a => a.value || a.description)
        });
      } else if (msg.method === 'Runtime.exceptionThrown') {
        runtimeExceptions.push(msg.params.exceptionDetails);
      } else if (msg.method === 'Network.loadingFailed') {
        networkErrors.push(msg.params);
      }
    };

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Page.enable');
    await send('DOM.enable');

    await send('Page.navigate', { url: 'http://localhost:5173/' });
    // Wait for modules to compile and React to render
    await sleep(3000);

    const evaluation = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const root = document.getElementById('root');
          const home = document.getElementById('home');
          const collection = document.getElementById('collection');
          const contact = document.getElementById('contact');
          const footer = document.querySelector('footer');
          const cards = document.querySelectorAll('.showroom-grid > *');

          return {
            title: document.title,
            rootChildCount: root ? root.children.length : 0,
            rootInnerHtmlLength: root ? root.innerHTML.length : 0,
            hasHomeSection: Boolean(home),
            hasCollectionSection: Boolean(collection),
            hasContactSection: Boolean(contact),
            hasFooter: Boolean(footer),
            productCardsRendered: cards.length,
            totalElements: document.querySelectorAll('*').length,
            isWhiteScreen: (!root || root.innerHTML.trim() === '' || root.children.length === 0)
          };
        })()
      `,
      returnByValue: true
    });

    console.log('\n=== BROWSER VERIFICATION REPORT ===');
    console.log(JSON.stringify(evaluation?.result?.value, null, 2));

    console.log('\n=== RUNTIME EXCEPTIONS ===');
    if (runtimeExceptions.length === 0) {
      console.log('Zero runtime exceptions thrown. All modules loaded cleanly.');
    } else {
      console.error(runtimeExceptions);
    }

    console.log('\n=== NETWORK ERRORS ===');
    if (networkErrors.length === 0) {
      console.log('Zero network request failures.');
    } else {
      console.error(networkErrors);
    }

    // Capture screenshot
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    if (screenshot?.data) {
      fs.writeFileSync('scratch-verification-screenshot.png', Buffer.from(screenshot.data, 'base64'));
      console.log('\nVerification screenshot saved to scratch-verification-screenshot.png');
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chromeProcess.kill();
  }
}

run();
