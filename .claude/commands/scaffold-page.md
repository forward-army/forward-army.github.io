---
description: Scaffold a new forward.army Astro page — route, layout, nav wiring, data, and a11y coverage.
argument-hint: <page-name and one-line purpose>
---

Scaffold a new page for the forward.army Astro site following the `astro-page` skill and `DESIGN.md`. Target: $ARGUMENTS

Do all of the following:
1. Create the route in `src/pages/` (static `name.astro`, or `[slug].astro` + an index if it's a collection like `compare/`).
2. Wrap it in `src/layouts/Base.astro`; reuse `Header`/`Footer`/`Chevron` and other `src/components/*.astro` before writing new components.
3. Keep copy in `src/data/*.js` (new file or entry), not hardcoded in markup.
4. Style with Tailwind v4 utilities + tokens from `src/styles/global.css`, enforcing `DESIGN.md` §4 Color, §5 Type, §6 Chevron, §7 Layout/Motion, and §8 Voice. Read those sections — don't style from memory.
5. Add the new path to nav if user-facing, and to the `PATHS` array in `scripts/a11y.mjs` so it's covered by the a11y scan.

Then run `/verify` and confirm the gate is green.
