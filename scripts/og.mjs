/**
 * Render per-page Open Graph images (1200x630) from the og.svg layout.
 * Fonts come from the same Fontsource packages the site ships, so the cards
 * match the brand without system fonts. Run: npm run og
 */
import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

// Inline as data URIs: file:// fonts are not loadable from a setContent() page.
const font = (p) => `data:font/woff2;base64,${readFileSync(resolve('node_modules', p)).toString('base64')}`;
const display = font('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2');
const mono = font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2');

// [file, index label, line 1 (chalk), line 2 (signal), footer]
const cards = [
  ['og', '01 / DEPLOYMENT BRIEF', 'Forward-deployed agents.', 'Under your command.', 'CONTROLLED ACCESS · INSPECT · PROPOSE · IMPLEMENT'],
  ['og-use-cases', '02 / USE CASES', 'Pick a job.', 'We deploy the agent.', 'CODEBASE · TICKETS · INVOICES · CRM · DOCS · ONBOARDING'],
  ['og-compare', '03 / COMPARE', 'A tool, or', 'an operator?', 'VS CHATGPT · VS CLAUDE · VS VIKTOR'],
  ['og-compare-chatgpt', '03 / COMPARE', 'forward.army vs ChatGPT.', 'The layer around the model.', 'YOUR INFRASTRUCTURE · SCOPED ACCESS · PRS · HUMAN IN COMMAND'],
  ['og-compare-claude', '03 / COMPARE', 'forward.army vs Claude.', 'The layer around the model.', 'YOUR INFRASTRUCTURE · SCOPED ACCESS · PRS · HUMAN IN COMMAND'],
  ['og-compare-viktor', '03 / COMPARE', 'forward.army vs Viktor.', 'Any business, not one function.', 'YOUR INFRASTRUCTURE · SCOPED ACCESS · PRS · HUMAN IN COMMAND'],
];

const html = ([, label, l1, l2, foot]) => `<!doctype html><html><head><style>
@font-face{font-family:B;src:url(${display}) format('woff2');font-weight:200 800}
@font-face{font-family:M;src:url(${mono}) format('woff2');font-weight:500}
html,body{margin:0}
body{width:1200px;height:630px;background:#141d18;position:relative;overflow:hidden}
.rule{position:absolute;left:0;right:0;height:1px;background:rgba(236,231,216,.08)}
.mono{position:absolute;left:90px;font:500 22px M;color:#8a8c7a;letter-spacing:6px;white-space:nowrap}
.chev{position:absolute;left:92px;top:210px}
.l1{position:absolute;left:88px;top:352px;font:800 82px B;color:#ece7d8;letter-spacing:-2px;line-height:1;white-space:nowrap}
.l2{position:absolute;left:88px;top:446px;font:800 66px B;color:#f5480c;letter-spacing:-2px;line-height:1;white-space:nowrap}
</style></head><body>
<div class="rule" style="top:90px"></div><div class="rule" style="top:540px"></div>
<div class="mono" style="top:100px">${label} · FORWARD.ARMY</div>
<svg class="chev" width="180" height="100" viewBox="92 210 180 100" fill="none" stroke="#f5480c" stroke-width="16" stroke-linecap="square">
  <polyline points="92,210 140,258 92,306"/><polyline points="150,210 198,258 150,306"/><polyline points="208,210 256,258 208,306"/></svg>
<div class="l1">${l1}</div><div class="l2">${l2}</div>
<div class="mono" style="top:568px;letter-spacing:4px">${foot}</div>
</body></html>`;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
const tmp = mkdtempSync(join(tmpdir(), 'og-'));
for (const card of cards) {
  const file = join(tmp, `${card[0]}.html`);
  writeFileSync(file, html(card));
  await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
  const ok = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.fonts.check('800 82px B') && document.fonts.check('500 22px M');
  });
  if (!ok) throw new Error(`fonts not loaded for ${card[0]}`);
  // Two frames so the compositor has settled — the first capture otherwise tiles.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.screenshot({ path: `public/${card[0]}.png`, type: 'png' });
  console.log(`public/${card[0]}.png`);
}
await browser.close();
