import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9228;
const ARTIFACT_DIR = 'C:\\Users\\MESH WAHEED\\.gemini\\antigravity-ide\\brain\\f99f852f-9c97-4134-a8ed-c5cf7f7edd5d';
const videoUrl = 'file:///' + path.join(process.cwd(), 'Reference', 'current-website-recording.mkv').replace(/\\/g, '/');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startChrome() {
  const profileDir = path.join(process.cwd(), '.chrome-temp-video-inspect');
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

async function run() {
  const chromeProcess = await startChrome();
  await sleep(1500);

  try {
    const page = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' }).then(r => r.json());
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

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

    // Create an HTML page hosting the video element
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0; background:#000; overflow:hidden;">
        <video id="vid" src="${videoUrl}" style="width:100vw; height:100vh; object-fit:contain;" muted></video>
      </body>
      </html>
    `;
    await send('Page.navigate', { url: `data:text/html;charset=utf-8,${encodeURIComponent(html)}` });
    await sleep(2000);

    // Seek to timestamps and capture screenshots
    const timestamps = [1, 5, 10, 15, 20];
    for (const ts of timestamps) {
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const v = document.getElementById('vid');
            v.currentTime = ${ts};
          })()
        `
      });
      await sleep(1000);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot && shot.data) {
        const outPath = path.join(ARTIFACT_DIR, `video-frame-${ts}s.png`);
        fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
        console.log(`Saved frame at ${ts}s to ${outPath}`);
      }
    }
  } catch (e) {
    console.error('Video inspect error:', e);
  } finally {
    chromeProcess.kill();
  }
}

run();
