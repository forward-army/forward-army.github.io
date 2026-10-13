# Founder Portraits Design

## Goal

Add a human, credible portrait treatment to the existing founder cards without changing the structure or voice of the Service Record section.

## Approved direction

Use portrait-led cards: each existing founder card gains a square-edged 4:5 portrait above the name, biography, and profile links. The three cards remain a one-column mobile grid and a three-column grid from the existing `sm` breakpoint.

Photography should feel editorial rather than corporate: consistent crop, lighting, and background; natural color with mild desaturation; no circular masks, rounded corners, shadows, gradients, or orange frames. A small dark `F-01` through `F-03` label anchors the portrait to the site's field-brief visual language.

## Assets and replacement workflow

Temporary local SVG portraits live in `src/assets/team/` and are imported by `src/pages/index.astro`. Each placeholder has the founder's initials and an explicit temporary marker.

Final portraits should be exported as 4:5 WebP files at a minimum of 800×1000 pixels and added to the same directory:

- `src/assets/team/lukasz-augustyniak.webp`
- `src/assets/team/roman-bartusiak.webp`
- `src/assets/team/adrian-szymczak.webp`

When final files arrive, only the three import paths at the top of `src/pages/index.astro` need to change from `.svg` to `.webp`. A README in the asset directory records these instructions.

## Implementation

Import Astro's `Image` component and one portrait asset per founder. Add `portrait` and `portraitId` fields to the existing founder data. Render the image in a 4:5 overflow-hidden container at the top of each card, with `object-cover`, a subtle desaturation filter, and a decorative index overlay.

The portrait uses empty alternative text because the founder's name immediately follows it and already supplies the identity. Explicit dimensions from the imported local asset prevent layout shift. Existing bios, links, focus behavior, and accessibility labels remain unchanged.

## Verification

- `npm run check` reports no Astro or TypeScript diagnostics.
- `npm run build` successfully optimizes and emits all portrait assets.
- `npm run a11y` reports no WCAG 2.1 AA violations.
- A local desktop and mobile visual pass confirms 4:5 cropping, hard edges, readable overlays, and the existing one-to-three-column responsive behavior.
