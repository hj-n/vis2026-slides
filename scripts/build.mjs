import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = fileURLToPath(new URL('../node_modules/@slidev/cli/bin/slidev.mjs', import.meta.url));
const prefix = `/${(process.env.VIS_SLIDES_BASE || '').split('/').filter(Boolean).join('/')}`.replace(/\/$/, '') + '/';
const decks = {
  visauto: 'decks/visualization-autocomplete/slides.md',
  dab: 'decks/distortion-aware-brushing/slides.md',
};
const selected = process.argv[2] ? [process.argv[2]] : Object.keys(decks);
for (const id of selected) {
  if (!decks[id]) throw new Error(`Unknown deck: ${id}`);
  rmSync(new URL(`../dist/${id}/`, import.meta.url), { recursive: true, force: true });
  const result = spawnSync(process.execPath, [cli, 'build', decks[id], '--base', `${prefix}${id}/`, '--out', `../../dist/${id}`], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/.nojekyll', import.meta.url), '');
writeFileSync(new URL('../dist/index.html', import.meta.url), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>VIS 2026 Slides</title></head>
<body><p><a href="./visauto/">Visualization Autocomplete</a> · <a href="./dab/">Distortion-aware Brushing</a></p>
<script>location.replace('./visauto/' + location.hash)</script></body></html>\n`);
