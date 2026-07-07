# forward.army

Marketing site for **forward.army** — the platform for forward-deployed AI
agents. Agents receive controlled, auditable access to your company, inspect
your systems, and — on your command — propose and implement improvements.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com),
shipped as a static site to GitHub Pages.

## Design

The full brand system — vision, palette, typography, logo rationale, voice —
lives in [`DESIGN.md`](./DESIGN.md). Aesthetic direction: **"Deployment Brief"**,
an editorial-tactical field-manual look built around the chevron mark.

## Develop

```sh
npm install
npm run dev        # local dev server
npm run build      # static build → dist/
npm run preview    # preview the build
```

## Quality gates (CI)

Every push and PR runs, via GitHub Actions:

| Check | Command | Gate |
|---|---|---|
| Type-check | `npm run check` | must pass |
| Build | `npm run build` | must pass |
| WCAG 2.1 AA | `npm run a11y` | zero axe-core violations |
| Lighthouse | `npm run test:lighthouse` | a11y & SEO = 100, perf ≥ 95 |

The accessibility scan (`scripts/a11y.mjs`) drives a real headless Chrome with
web fonts and animations settled, so results are deterministic.

## Deploy

`main` auto-deploys to GitHub Pages (`.github/workflows/deploy.yml`) using the
official Pages Actions. The custom domain is pinned via [`public/CNAME`](./public/CNAME).

## Brand assets

`brand/` holds the source mark and a 1024×1024 avatar (`org-avatar.png`) for the
GitHub organization icon. Favicons live in `public/` (`favicon.svg`, `.ico`,
PNG sizes, `apple-touch-icon.png`).
