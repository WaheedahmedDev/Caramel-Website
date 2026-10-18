import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9225;

const chromeProcess = spawn(CHROME_PATH, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=' + process.cwd() + '\\.chrome-temp-profile-theme',
  'about:blank'
], { stdio: 'ignore' });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await sleep(1500);
  try {
    const page = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5173/`, { method: 'PUT' }).then(r => r.json());
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sleep(2000);

    // Click theme toggle
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('header button[aria-label*="المظهر"], header button[aria-label*="Theme"]');
          if (btn) btn.click();
        })()
      `
    });
    await sleep(600);

    const themeRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const doc = document.documentElement;
          const body = window.getComputedStyle(document.body);
          return {
            themeAttr: doc.getAttribute('data-theme'),
            bodyBg: body.backgroundColor,
            bodyText: body.color
          };
        })()
      `
    });
    console.log('Light Theme Test Result:', JSON.stringify(themeRes?.result?.value, null, 2));

    // Click English Language Switch
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const engBtn = document.querySelector('button[aria-label*="English"]');
          if (engBtn) engBtn.click();
        })()
      `
    });
    await sleep(600);

    const langRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const doc = document.documentElement;
          return {
            dir: doc.getAttribute('dir'),
            lang: doc.getAttribute('lang')
          };
        })()
      `
    });
    console.log('English LTR Test Result:', JSON.stringify(langRes?.result?.value, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chromeProcess.kill();
  }
}

run();
