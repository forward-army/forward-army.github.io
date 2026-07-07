#!/usr/bin/env node
/**
 * WCAG 2.1 AA scan for forward.army.
 *
 * Runs the axe-core engine (the same engine behind pa11y and Lighthouse) against
 * the built site via a modern headless Chrome. We drive the browser directly so
 * the scan is deterministic: we wait for web fonts and entrance animations to
 * settle and emulate reduced-motion, avoiding the transient-opacity false
 * positives that wrapper CLIs report when they measure mid-animation.
 *
 * Exit code 1 on any violation so CI fails the build.
 */
import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const BASE = process.env.A11Y_BASE || 'http://localhost:4321';
const PATHS = process.env.A11Y_URL
  ? [process.env.A11Y_URL]
  : [
      '/',
      '/compare',
      '/compare/chatgpt',
      '/compare/claude',
      '/compare/viktor',
      '/use-cases',
    ];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

const browser = await puppeteer.launch({
  headless: true,
  // Honours PUPPETEER_EXECUTABLE_PATH when set (used in CI to point at a
  // system Chrome with its OS deps satisfied).
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

let failed = 0;
try {
  for (const path of PATHS) {
    const url = BASE + path;
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });

    // Stable render: no entrance animations, so we measure the settled UI.
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    // Wait for web fonts and any lingering animations to finish.
    await page.evaluate(async () => {
      await document.fonts.ready;
      const anims = document.getAnimations?.() ?? [];
      await Promise.race([
        Promise.allSettled(anims.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 1500)),
      ]);
    });

    const results = await new AxePuppeteer(page).withTags(TAGS).analyze();
    const { violations } = results;
    await page.close();

    if (violations.length === 0) {
      console.log(`${c.green('✓')} ${c.dim(path)} — clean ${c.dim(`(${results.passes.length} passed, ${results.incomplete.length} needs-review)`)}`);
      continue;
    }

    failed += 1;
    const total = violations.reduce((n, v) => n + v.nodes.length, 0);
    console.log(c.red(c.bold(`\n✘ ${path} — ${total} WCAG 2.1 AA violation(s):`)));
    for (const v of violations) {
      console.log(`  ${c.red('●')} ${c.bold(v.id)} — ${v.help} ${c.dim(`[${v.impact}]`)}`);
      for (const node of v.nodes) {
        console.log(`    ${c.yellow('→')} ${node.target.join(' ')}`);
        const detail = node.failureSummary?.split('\n').filter(Boolean).slice(1).join(' ');
        if (detail) console.log(`      ${c.dim(detail)}`);
      }
    }
    console.log('');
  }
} finally {
  await browser.close();
}

if (failed > 0) {
  console.log(c.red(c.bold(`\n${failed} page(s) failed WCAG 2.1 AA.`)));
  process.exit(1);
}
console.log(c.green(c.bold(`\n✓ All ${PATHS.length} pages pass WCAG 2.1 AA.`)));
process.exit(0);
