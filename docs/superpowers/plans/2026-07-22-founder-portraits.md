# Founder Portraits Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add local placeholder portraits to the homepage founder cards and make the final-photo replacement path explicit.

**Architecture:** Keep founder identity data in the existing `founders` array and attach imported Astro image metadata to each entry. Store temporary 4:5 SVG assets beside a replacement guide under `src/assets/team/`, then render them through Astro's optimized `Image` component inside the existing responsive card grid.

**Tech Stack:** Astro 5, TypeScript frontmatter, Tailwind CSS 4 utility classes, local SVG assets

---

### Task 1: Add temporary portrait assets and replacement instructions

**Files:**
- Create: `src/assets/team/lukasz-augustyniak-placeholder.svg`
- Create: `src/assets/team/roman-bartusiak-placeholder.svg`
- Create: `src/assets/team/adrian-szymczak-placeholder.svg`
- Create: `src/assets/team/README.md`

- [ ] **Step 1: Verify the required asset contract is currently absent**

Run:

```bash
test -f src/assets/team/README.md
```

Expected: exit code 1 because the team asset directory does not exist yet.

- [ ] **Step 2: Add the three 800×1000 temporary SVG portraits**

Create one 4:5 SVG per founder. Each file uses the site palette, a geometric head-and-shoulders silhouette, a field index, the founder's initials, and the visible label `TEMPORARY PORTRAIT`. Use these exact identities:

```text
lukasz-augustyniak-placeholder.svg  -> F-01 / ŁA
roman-bartusiak-placeholder.svg     -> F-02 / RB
adrian-szymczak-placeholder.svg     -> F-03 / AS
```

Every SVG must use `viewBox="0 0 800 1000"`, `width="800"`, and `height="1000"` so Astro can reserve the final 4:5 layout before real photos arrive.

- [ ] **Step 3: Document the drop-in location for final files**

Create `src/assets/team/README.md` with these exact destinations and requirements:

```markdown
# Team portraits

Replace the temporary founder portraits with final 4:5 WebP files here:

- `lukasz-augustyniak.webp`
- `roman-bartusiak.webp`
- `adrian-szymczak.webp`

Export every portrait at 800×1000 pixels or larger with consistent crop, lighting, and background. Keep faces centered with enough headroom for `object-cover` cropping.

After adding the files, change the three portrait imports in `src/pages/index.astro` from `*-placeholder.svg` to the matching `.webp` filename. No markup or layout changes are required.
```

- [ ] **Step 4: Verify the asset contract now exists**

Run:

```bash
test -f src/assets/team/README.md \
  && test -f src/assets/team/lukasz-augustyniak-placeholder.svg \
  && test -f src/assets/team/roman-bartusiak-placeholder.svg \
  && test -f src/assets/team/adrian-szymczak-placeholder.svg
```

Expected: exit code 0.

### Task 2: Render portraits in the founder cards

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Run a failing render-contract check**

Run against the baseline build:

```bash
test "$(rg -o 'data-founder-portrait' dist/index.html | wc -l)" -eq 3
```

Expected: exit code 1 because the founder cards do not yet render portrait markers.

- [ ] **Step 2: Import Astro Image and the temporary local portraits**

Add these imports to the frontmatter:

```astro
import { Image } from 'astro:assets';
import lukaszPortrait from '../assets/team/lukasz-augustyniak-placeholder.svg';
import romanPortrait from '../assets/team/roman-bartusiak-placeholder.svg';
import adrianPortrait from '../assets/team/adrian-szymczak-placeholder.svg';
```

- [ ] **Step 3: Attach portrait metadata to each founder**

Add the matching fields to the existing founder records:

```ts
portrait: lukaszPortrait,
portraitId: 'F-01',
```

```ts
portrait: romanPortrait,
portraitId: 'F-02',
```

```ts
portrait: adrianPortrait,
portraitId: 'F-03',
```

- [ ] **Step 4: Add the approved portrait-led card markup**

Change each founder `<li>` to remove its outer padding and render this block before the existing name:

```astro
<li class="flex flex-col bg-bone-sink">
  <div class="relative aspect-[4/5] overflow-hidden border-b border-[var(--edge)]">
    <Image
      src={f.portrait}
      alt=""
      loading="lazy"
      decoding="async"
      data-founder-portrait
      class="h-full w-full object-cover saturate-[0.65] contrast-[1.03]"
    />
    <span
      aria-hidden="true"
      class="absolute bottom-0 left-0 bg-ink px-3 py-2 font-mono text-xs font-medium tracking-[0.12em] text-bone"
    >
      {f.portraitId}
    </span>
  </div>
  <div class="flex flex-1 flex-col gap-4 p-7">
    <!-- Existing h3, biography, and social-link block remain unchanged here. -->
  </div>
</li>
```

The image uses empty alternative text because the adjacent `<h3>` names the same person. The portrait index is decorative and hidden from assistive technology.

- [ ] **Step 5: Build and verify the render contract passes**

Run:

```bash
npm run build \
  && test "$(rg -o 'data-founder-portrait' dist/index.html | wc -l)" -eq 3
```

Expected: the Astro build succeeds and the shell check exits 0.

### Task 3: Verify quality and responsive rendering

**Files:**
- Verify: `src/pages/index.astro`
- Verify: `src/assets/team/*`

- [ ] **Step 1: Run Astro diagnostics**

Run:

```bash
npm run check
```

Expected: 0 errors, 0 warnings, and 0 hints.

- [ ] **Step 2: Run the production build and WCAG scan**

Run:

```bash
npm run build && npm run a11y
```

Expected: all 6 static pages build and all configured paths pass WCAG 2.1 AA.

- [ ] **Step 3: Inspect desktop and mobile screenshots**

Start the preview server and capture `/` at 1280×1024 and 390×844. Confirm:

```text
- three 4:5 portrait-led cards at the existing sm three-column breakpoint
- one stacked card per row on mobile
- hard square edges and no shadows, circles, gradients, or orange photo frames
- F-01 through F-03 labels remain readable without covering faces
- founder names, biographies, and profile links remain unchanged
```

- [ ] **Step 4: Review the final local diff**

Run:

```bash
git diff --check && git status --short && git diff --stat HEAD
```

Expected: only the homepage, team assets, replacement guide, and approved design/plan documentation are changed.
