---
name: web-visual-review
description: "Use when reviewing how a forward.army change looks in the browser — responsive layout, bone/ink bands, focus states — before shipping a visual change and you need to see it rendered, not just the source. This is the rendered counterpart to the web-designer agent (which reviews source/diff). Triggers: how does it look, screenshot, responsive, visual review, breakpoints, mobile, design check, slop test."
---

# web-visual-review — see it, then judge it

**Announce:** "Using the web-visual-review skill to review the rendered site."

Look at the running site — don't judge design from source alone. This is the rendered-output counterpart to the `web-designer` agent: use this when a preview is running and the finding depends on pixels (layout, breakpoints, focus rings, how bands read); use `web-designer` for source/diff review. Report deviations from `DESIGN.md`; **do not edit** (hand fixes to `astro-page` / the author).

## Boot
Serve locally: `npm run dev` (or `preview:ci` after a build) → http://localhost:4321.

## Drive the browser
Prefer the task's embedded pane: `mcp__kangentic__kangentic_browser_navigate`, `..._screenshot`, `..._screenshot_element`, `..._eval`, `..._list_panes`. Fallback: `mcp__claude-in-chrome__*` (call `tabs_context_mcp` first, then a new tab). Screenshot each key page at **375px (mobile), 768px (tablet), 1280px (desktop)**.

Pages: `/`, `/use-cases`, `/compare`, `/compare/{chatgpt,claude,viktor}`.

## Judge against DESIGN.md (read it; check the rendered pages section by section)
- **§4 Color** — bone/ink bands read as editorial pace, accent survives on both; one `--signal` orange on the single primary action per view, not scattered; muted text khaki `--field`, no pure black/white.
- **§5 Typography** — Bricolage display tight; mono only as chrome (indices/labels), uppercase; no mono body copy.
- **§6 Chevron** — present as logo/bullet/divider/scroll cue; consistent.
- **§7 Layout & Motion** — 12-col with deliberate breaks, not uniform padding; nothing overflowing on mobile; visible focus rings on keyboard nav; emulate `prefers-reduced-motion: reduce` and confirm entrance animations settle (transform/opacity only, no bounce).
- **§9 Quality Bar / AI-Slop Test** — would someone believe "an AI made this"? Flag any cyan-on-dark, purple→blue gradient, neon glow, glassmorphism, identical icon-card grid, hero-metric template.

## Output
Per page/breakpoint: screenshot + a short list of concrete deviations with the DESIGN.md section each breaks, ranked worst first. If clean, say so.
