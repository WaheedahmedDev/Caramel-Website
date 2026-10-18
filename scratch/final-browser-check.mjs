import { spawn } from 'child_process';

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
  await sleep(1500);
  try {
    const newPage = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5173/`, { method: 'PUT' }).then(r => r.json());
    const ws = new WebSocket(newPage.webSocketDebuggerUrl);

    const runtimeExceptions = [];
    const consoleLogs = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        runtimeExceptions.push(msg.params.exceptionDetails);
      } else if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({
          type: msg.params.type,
          args: msg.params.args.map(a => a.value || a.description)
        });
      }
    };

    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Page.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'DOM.enable' }));
    };

    await sleep(3500);

    const evaluation = await new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 100) {
          ws.removeEventListener('message', handler);
          resolve(msg.result?.result?.value);
        }
      };
      ws.addEventListener('message', handler);

      ws.send(JSON.stringify({
        id: 100,
        method: 'Runtime.evaluate',
        params: {
          returnByValue: true,
          expression: `
            (() => {
              const root = document.getElementById('root');
              return {
                title: document.title,
                lang: document.documentElement.lang,
                dir: document.documentElement.dir,
                theme: document.documentElement.getAttribute('data-theme'),
                rootChildCount: root ? root.children.length : 0,
                rootInnerHtmlLength: root ? root.innerHTML.length : 0,
                heroHeadline: document.querySelector('h1')?.innerText,
                showroomProductCards: document.querySelectorAll('.showroom-grid > *').length,
                hasEditorialStory: Boolean(document.getElementById('editorial-story')),
                hasCollection: Boolean(document.getElementById('collection')),
                hasContact: Boolean(document.getElementById('contact')),
                hasFooter: Boolean(document.querySelector('footer')),
                isRenderingVisible: Boolean(root && root.children.length > 0 && root.innerHTML.length > 1000)
              };
            })()
          `
        }
      }));
    });

    console.log('\n========================================');
    console.log('FINAL BROWSER VERIFICATION AUDIT');
    console.log('========================================');
    console.log(JSON.stringify(evaluation, null, 2));
    console.log('\nRuntime Exceptions Count:', runtimeExceptions.length);
    if (runtimeExceptions.length > 0) {
      console.error('Exceptions:', runtimeExceptions);
    } else {
      console.log('All modules loaded without runtime errors.');
    }

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chromeProcess.kill();
  }
}

run();
