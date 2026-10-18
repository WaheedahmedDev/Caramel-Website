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
  await sleep(1000);
  try {
    const pages = await fetch(`http://127.0.0.1:${PORT}/json/list`).then(r => r.json());
    const newPage = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5173/`, { method: 'PUT' }).then(r => r.json());
    const ws = new WebSocket(newPage.webSocketDebuggerUrl);

    const responses = [];
    const failures = [];
    const logs = [];
    const exceptions = [];

    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Network.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Page.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 4, method: 'Console.enable' }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Network.responseReceived') {
        responses.push({
          url: msg.params.response.url,
          status: msg.params.response.status,
          mimeType: msg.params.response.mimeType,
        });
      } else if (msg.method === 'Network.loadingFailed') {
        failures.push({
          url: msg.params.url || msg.params.requestId,
          errorText: msg.params.errorText,
          canceled: msg.params.canceled
        });
      } else if (msg.method === 'Runtime.consoleAPICalled') {
        logs.push({
          type: msg.params.type,
          args: msg.params.args.map(a => a.value || a.description)
        });
      } else if (msg.method === 'Runtime.exceptionThrown') {
        exceptions.push(msg.params.exceptionDetails);
      }
    };

    await sleep(4000);

    console.log('\n--- NETWORK RESPONSES ---');
    console.log(`Total responses: ${responses.length}`);
    responses.forEach(r => console.log(`${r.status} ${r.mimeType} ${r.url}`));

    console.log('\n--- NETWORK FAILURES ---');
    console.log(failures);

    console.log('\n--- CONSOLE LOGS ---');
    console.log(logs);

    console.log('\n--- RUNTIME EXCEPTIONS ---');
    console.log(exceptions);

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chromeProcess.kill();
  }
}

run();
