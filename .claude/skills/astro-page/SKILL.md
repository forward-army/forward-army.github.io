---
name: astro-page
description: "Use when implementing or changing anything in the forward.army Astro site — a new page, route, section, component, layout, styles, or content data, or wiring nav. Triggers: new page, add section, Astro component, edit layout, use-cases, compare page, Tailwind, brand, chevron, DESIGN.md."
---

# astro-page — implement forward.army the right way

**Announce:** "Using the astro-page skill to implement against repo convention + DESIGN.md."

Read `DESIGN.md` first — it is the source of truth. If a visual choice isn't in it, it isn't in the system.

## Stack facts
- **Astro v5**, static output → GitHub Pages (`forward.army`). `astro.config.mjs`: `site: 'https://forward.army'`, sitemap integration, `compressHTML`.
- **Tailwind v4** via `@tailwindcss/vite` (no `tailwind.config.js`). Design tokens live in `src/styles/global.css` — use them, never hardcode hex.
- **Strict TypeScript** (`astro/tsconfigs/strict`). `npm run check` must pass.
- Fonts self-hosted via Fontsource (Bricolage Grotesque, Public Sans, IBM Plex Mono) — already imported; don't add CDN links.

## Repo layout (follow it)
- Pages/routes → `src/pages/` (`index.astro`, `use-cases.astro`, `compare/index.astro`, dynamic `compare/[slug].astro`).
- Layout → `src/layouts/Base.astro` (wrap every page).
- Components → `src/components/*.astro` (`Header`, `Footer`, `Logo`, `Icon`, `Chevron`). Reuse before creating; the chevron is `Chevron.astro`.
- Content/data → `src/data/*.js` (`comparisons.js`, `usecases.js`). Keep copy out of markup; drive pages from data.
- Static assets → `public/` (don't touch `CNAME`).

## Brand — enforce DESIGN.md, don't restate it
Every visual decision follows `DESIGN.md`. Read and apply, by section:
- **§4 Color** — one `--signal` accent per view; muted text `--field` (khaki), not gray; `--signal-deep` for small text on bone (AA ≥4.5:1); bone/ink band rhythm; tokens only, no hex.
- **§5 Typography** — Bricolage display (tight), Public Sans body, IBM Plex Mono chrome only (uppercase, wide tracking), never body copy.
- **§6 Chevron** — reuse `Chevron.astro` as logo/bullet/divider/scroll cue.
- **§7 Layout & Motion** — broken 12-col grid; transform/opacity only, exponential ease-out, no bounce, honor `prefers-reduced-motion`.
- **§8 Voice** — short declaratives, no hype words, no emoji.
- **§9 Quality Bar** — must survive the AI-Slop Test.

## Accessibility (part of design, not later)
Semantic landmarks, visible focus rings, AA contrast (DESIGN.md §9). A new route added to nav must also be added to the a11y scan list in `scripts/a11y.mjs` (the `PATHS` array).

## Done means
Run `/verify` (or the `verify-web` skill): `check → build → a11y → lighthouse` all green before handing off to Code Review.
