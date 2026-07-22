---
description: Audit the current diff against DESIGN.md — brand, contrast/AA, chevron, band rhythm, voice, AI-Slop Test.
---

Review the current working diff (or the branch vs `main`) for forward.army through the design + accessibility lens.

Pick the surface by what you need to see:
- **Source/diff review (default, no server needed)** → dispatch the `web-designer` agent. It audits the change against `DESIGN.md` §4–§9 and reports findings.
- **Rendered review (a preview is running, the fix depends on how it looks)** → apply the `web-visual-review` skill to screenshot and judge the live pages.

Either way the standard is `DESIGN.md` (§4 Color · §5 Type · §6 Chevron · §7 Layout/Motion · §8 Voice · §9 Quality Bar / AI-Slop Test) — read it, don't audit from memory.

Output findings worst-first with `file:line`, the DESIGN.md section broken, and a concrete fix. End with **PASS** or **CHANGES REQUIRED**.
