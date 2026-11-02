import http from 'node:http';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 3045);
const cli = fileURLToPath(new URL('../node_modules/@slidev/cli/bin/slidev.mjs', import.meta.url));
const decks = [
  { base: '/visauto/', entry: 'decks/visualization-autocomplete/slides.md', port: 3055 },
  { base: '/dab/', entry: 'decks/distortion-aware-brushing/slides.md', port: 3056 },
  { base: '/misuse/', entry: 'decks/stop-misusing/slides.md', port: 3057 },
];
const children = decks.map(deck => spawn(process.execPath, [cli, deck.entry, '--port', String(deck.port), '--base', deck.base], {
  stdio: 'inherit', env: { ...process.env, VIS_PRESENTATIONS_PROXY_PORT: String(port) },
}));
const route = url => decks.find(deck => url.split('?')[0].startsWith(deck.base));
const requestDeck = req => route(req.url) || (req.url.startsWith('/@server-reactive/') && req.headers.referer
  ? route(new URL(req.headers.referer).pathname) : undefined);
const server = http.createServer((req, res) => {
  const path = req.url.split('?')[0];
  const canonical = decks.find(deck => path === deck.base.slice(0, -1));
  if (path === '/' || canonical) {
    res.writeHead(302, { Location: canonical ? req.url.replace(path, canonical.base) : '/visauto/' });
    res.end(); return;
  }
  const deck = requestDeck(req);
  if (!deck) { res.writeHead(404); res.end('Not found'); return; }
  const upstream = http.request({ hostname: 'localhost', port: deck.port, path: req.url, method: req.method, headers: req.headers }, response => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res);
  });
  upstream.on('error', () => { if (!res.headersSent) res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8', 'Retry-After': '1' }); res.end('Slidev is starting. Refresh in a moment.'); });
  req.on('aborted', () => upstream.destroy());
  req.pipe(upstream);
});
server.on('upgrade', (req, socket, head) => {
  const deck = requestDeck(req);
  if (!deck) { socket.destroy(); return; }
  const upstream = net.connect({ host: 'localhost', port: deck.port }, () => {
    const headers = req.rawHeaders.reduce((lines, value, i) => i % 2 ? lines : [...lines, `${value}: ${req.rawHeaders[i + 1]}`], []);
    upstream.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n${headers.join('\r\n')}\r\n\r\n`);
    if (head.length) upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });
  upstream.on('error', () => socket.destroy());
  socket.on('error', () => upstream.destroy());
  socket.on('close', () => upstream.destroy());
  upstream.on('close', () => socket.destroy());
});
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  server.close();
  setTimeout(() => process.exit(code), 200).unref();
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => stop());
for (const child of children) {
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code || 1); });
}
server.on('error', error => { console.error(error.message); stop(1); });
server.listen(port, () => console.log(`\nVisualization Autocomplete: http://localhost:${port}/visauto/\nDistortion-aware Brushing: http://localhost:${port}/dab/\nStop Misusing t-SNE and UMAP: http://localhost:${port}/misuse/\n`));
