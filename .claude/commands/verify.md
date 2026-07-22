---
description: Run the forward.army local CI gate (check → build → a11y → lighthouse) and fix failures before push.
---

Run the local CI gate for forward.army, mirroring `.github/workflows/ci.yml`.

Use the **`verify-web` skill** — it holds the canonical procedure (the four steps, failure-reading, and the rules). To run the gate as a dispatched subagent instead, hand it to the `web-test-runner` agent, which executes the same skill.

The gate, in order — stop on the first failure, fix the root cause in `src/`, rerun from that step:

1. `npm run check`
2. `npm run build`
3. `npm run a11y`
4. `npm run test:lighthouse`

Report each step's result with the decisive output line. Do not claim green without the command output proving it. Do not weaken `scripts/a11y.mjs`, `lighthouserc.json`, or CI to pass — fix the site. End with an overall **PASS** / **CHANGES REQUIRED** verdict.
