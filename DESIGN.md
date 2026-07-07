# forward.army — Design & Brand System

> A declassified field manual for the brand. Everything visual on the site
> traces back to a decision recorded here. If a choice isn't in this document,
> it isn't part of the system.

---

## 1. Vision

**forward.army puts AI agents on the ground inside your company — under your command.**

The proven way to make an enterprise actually adopt new technology is to
*embed*: send an engineer to sit with the customer, learn the domain, and ship
inside their reality. Palantir called them Forward Deployed Engineers. It works
because trust is earned in-context, not in a slide deck.

We are a company of AI and software professionals who do exactly that — and then
go one step further. We are building the **platform for forward-deployed
*agents***: AI agents that receive controlled, auditable access to your systems
the same way a trusted engineer would, then **inspect** your business,
**propose** improvements, and — on your command — **implement** them.

- **Forward-deployed, not bolted-on.** Agents operate inside your context, not from a generic prompt box.
- **Access under command.** Every capability an agent holds is granted, scoped, logged, and revocable — the same governance you'd give a contractor with a badge.
- **Inspect → Propose → Implement.** The loop a good engineer runs, now available as supervised autonomy.

### Positioning line
> **Forward-deployed agents. Under your command.**

### Supporting statements
- Primary: *"AI that deploys into your company — and reports to you."*
- Secondary: *"The platform for forward-deployed agents: controlled access, real proposals, shipped work."*

---

## 2. Audience

| Segment | Who | What they need from the site |
|---|---|---|
| **Primary** | Heads of Engineering / CTOs / VPs at mid-to-large companies evaluating AI adoption | Proof this is controllable and serious, not a toy. A credible model of governance. A reason to talk. |
| **Secondary** | Founders & operators who feel behind on AI | A clear, non-hype explanation and a low-friction way to start. |
| **Tertiary** | Senior engineers / prospective hires | Evidence of taste and rigor. A team worth joining. |

**Emotional target:** *confident relief.* "Finally — a way to bring AI in that I can actually govern."

---

## 3. Aesthetic Direction — "Deployment Brief"

A **declassified field manual meets a precision instrument.** Editorial and
tactical, but refined — never camouflage-kitsch. The site reads like an
operations brief: coordinate chrome, section indices, disciplined grids broken
on purpose for emphasis, and one decisive signal color for action.

**The one memorable thing:** the chevron. It carries the whole idea —
*forward* (direction of travel) and *army* (rank insignia) — in a single mark
that repeats as logo, bullet, divider, and motion cue.

**Explicitly not:** cyan-on-dark, purple→blue gradients, neon glow, glassmorphism,
identical icon-topped card grids, hero-metric templates. Those are AI fingerprints.

---

## 4. Color

Neutrals are tinted toward pine-ink and khaki so the whole palette feels cut
from one cloth. Pure black and pure white never appear. One accent only —
**signal orange** — reserved for action and emphasis so it never loses meaning.

### Tokens

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--bone` | `#F1ECE0` | oklch(0.94 0.017 90) | Primary background (paper) |
| `--bone-sink` | `#E7E0CE` | oklch(0.90 0.021 88) | Sunken surface, hairlines on light |
| `--ink` | `#141D18` | oklch(0.24 0.014 165) | Primary text on bone; dark-band background |
| `--ink-raise` | `#1D291F` | oklch(0.29 0.016 160) | Raised surface on dark bands |
| `--chalk` | `#ECE7D8` | oklch(0.92 0.015 92) | Primary text on ink bands |
| `--field` | `#5B6152` | oklch(0.46 0.02 130) | Muted text / khaki-olive secondary |
| `--field-soft` | `#8A8C7A` | oklch(0.62 0.02 115) | Muted text on dark bands |
| `--signal` | `#F5480C` | oklch(0.63 0.22 38) | Accent: action, emphasis, live state |
| `--signal-deep` | `#B02D00` | oklch(0.46 0.19 37) | Accent for small text on light bands (AA ≥4.5:1 on bone & bone-sink) |

### Rules
- **One accent.** Signal orange marks the single most important action in a view. If everything is orange, nothing is.
- **Tinted neutrals only.** Text on bone is ink (not gray); muted text is khaki `--field`, never a neutral gray.
- **Band rhythm.** The page alternates bone and ink bands to create editorial pace. Accent survives on both.
- **Contrast:** body text pairs meet WCAG AA (≥4.5:1). `--signal` is used as a *fill* behind `--ink`/`--chalk` or as large/bold text; `--signal-deep` is the accent for small text on bone.

---

## 5. Typography

| Role | Typeface | Why |
|---|---|---|
| **Display / headlines** | **Bricolage Grotesque** (700–800) | Characterful editorial grotesque — authoritative without being corporate-neutral. Distinct from Inter/Roboto slop. |
| **Body / UI** | **Public Sans** (400–600) | Clean, legible, and a deliberate conceptual nod: it *is* the U.S. government design-system typeface. On-brand for "forward.army." |
| **Chrome / labels** | **IBM Plex Mono** (500) | *Sparingly only* — section indices (`01 / DOCTRINE`), coordinates, tags. Editorial device, never body copy. |

- **Fluid modular scale** via `clamp()`; ratio ≈ 1.25 (major third) tightening at large sizes.
- Display set tight (`letter-spacing: -0.02em`, `line-height: ~0.95`) for poster density.
- Mono chrome set in uppercase, wide tracking, small — it frames content, it isn't content.
- Self-hosting-friendly: fonts loaded via a single `woff2`-first `@font-face`/CDN strategy with `font-display: swap` and preconnect for performance.

---

## 6. Logo & Iconography

The **chevron** is the atom of the brand.

- **Mark:** three ascending chevrons that also resolve into a single forward
  arrow / deployment waypoint. Reads as rank insignia (army) and forward motion
  (deploy) at once. Single color, drawn on `currentColor`, legible from 16px
  favicon to hero scale.
- **Wordmark:** `forward` in Bricolage 700, `.army` set in `--signal` — the TLD
  *is* the punchline, so it carries the accent.
- **System use:** the chevron doubles as list bullet, section divider, scroll
  cue, and hover motion vector. One shape, many jobs — that's what makes a brand
  feel authored rather than assembled.

Favicon: the chevron mark on a bone tile.

---

## 7. Layout & Motion

- **Grid:** 12-column with generous margins; deliberately broken for emphasis
  (oversized display type bleeding past columns, asymmetric hero).
- **Rhythm:** fluid spacing with `clamp()`; tight groupings vs. generous
  section breaks — never uniform padding.
- **Coordinate chrome:** thin rules, corner ticks, and mono index labels frame
  sections like a printed brief.
- **Motion:** one well-orchestrated staggered load; exponential ease-out only
  (no bounce). Chevrons advance on hover. Transform/opacity only. All motion
  respects `prefers-reduced-motion`.

---

## 8. Voice

Plain, precise, a little bit military-brief in cadence. Confidence without hype.

- **Do:** short declaratives. "Grant access. Watch it work. Revoke in one click."
- **Don't:** "revolutionary," "cutting-edge," "unlock the power of AI," emoji.
- Every word earns its place. Say the governance part out loud — it's the differentiator.

---

## 9. Quality Bar (self-check)

Before shipping any screen, it must pass the **AI-Slop Test**: if someone said
"an AI made this," would you instantly believe them? If yes, it's wrong. The
answer we want is *"how was this made?"* — driven by the chevron system, the
bone/ink band rhythm, the tactical chrome, and the single disciplined accent.

Accessibility and performance are part of the design, not a later audit: AA
contrast, visible focus rings, semantic landmarks, and Lighthouse ≥95 are
requirements, enforced in CI.
