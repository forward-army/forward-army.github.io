---
name: verify-web
description: "Use when verifying a forward.army change, before opening a PR, before moving a task to Tests or Ship It, or when CI failed and you need to reproduce it locally. This is the canonical gate procedure — the /verify command and the web-test-runner agent both run it. Triggers: verify, test the site, run checks, astro check, a11y, axe, lighthouse, pre-push, gate, does it pass, is it green."
trigger: /verify
---

# verify-web — local CI gate for forward.army

**Announce:** "Using the verify-web skill to run the local CI gate."

This skill is the single source of truth for the gate. Reproduce `.github/workflows/ci.yml` locally so failures surface before push. Run in order; stop on the first failure, fix, rerun from that step.

## Steps
1. `npm run check` — `astro check` (strict TS + template diagnostics). Fix type/template errors.
2. `npm run build` — must produce `dist/` clean. Build errors are hard stops.
3. `npm run a11y` — boots `preview:ci` on :4321 and runs `scripts/a11y.mjs` (axe WCAG 2.1 AA on `/`, `/compare`, `/compare/{chatgpt,claude,viktor}`, `/use-cases`). Exit 1 on any violation.
4. `npm run test:lighthouse` — `lhci autorun` per `lighthouserc.json`: 3 runs, desktop; **accessibility score must be 1**, performance/best-practices/seo ≥ 0.95.

## Reading failures
- **axe** prints `● <rule-id> — <help> [impact]` then `→ <css-selector>` per node. Map selector → component in `src/`, fix root cause (contrast → use `--signal-deep`/correct token; missing label/landmark → semantic HTML), don't suppress.
- **Fast a11y loop:** scan one page while iterating: `A11Y_URL=/use-cases npm run test:a11y` (needs the preview server already running, or use `npm run a11y` for the full boot-and-scan).
- **Lighthouse** writes reports to a temp public URL; open the failing category's audits for the offending nodes.

## Rules
- Never claim green without the actual command output showing it. Evidence before assertion.
- Don't edit `scripts/a11y.mjs`, `lighthouserc.json`, or CI to make a check pass — fix the site.
- New route added → add its path to `PATHS` in `scripts/a11y.mjs` so it's covered.

## Rationalizations — all of these are wrong

| Excuse | Reality |
|--------|---------|
| "The change is tiny, it obviously still passes" | Tiny changes break contrast, add a11y violations, drop Lighthouse. Run all four steps. |
| "check + build passed, a11y/Lighthouse will be fine" | a11y and perf fail independently of type-checking. Run them. |
| "Lighthouse is flaky / slow, skip it" | It runs 3× and asserts a median. Flaky-looking = a real regression. Don't skip. |
| "I'll just relax the threshold in lighthouserc.json" | That hides the regression from CI too. Fix the site, not the gate. |
| "The a11y rule is a false positive" | The scanner waits for fonts + animations and emulates reduced-motion to avoid false positives. Treat every violation as real; fix the root cause. |
| "I ran it earlier, it's still green" | Re-run after the last edit. Stale output is not evidence. |

## Red flags — STOP

- About to say "passes" / "green" / "done" without the command output in front of you.
- About to edit `scripts/a11y.mjs`, `lighthouserc.json`, or `.github/workflows/ci.yml` to clear a failure.
- Skipping step 3 or 4 because 1–2 passed.
- Suppressing an axe rule instead of fixing the markup.

All of these mean: run the missing step, or fix the site. Then quote the output.
