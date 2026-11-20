---
name: visual-design-intelligence
description: >-
  Visual design intelligence, art direction, typography hierarchy, color systems, layout
  composition, and reference-based design analysis. Use during Discovery, Creative Direction,
  Design System setup, and Final Visual Review for any website or landing page to ensure
  Awwwards/Godly/SiteInspire-caliber originality and visual craft.
---

# Visual Design Intelligence

> **Objective:** Analyze, architect, and evaluate world-class visual design so every website feels art-directed by a top creative agency rather than generated from a generic template.

## Reference Modules
- **9-Dimension Design Scorecard:** [design-evaluation.md](../../references/design-evaluation.md)
- **Component & Section Blueprints:** [component-library.md](../../references/component-library.md)
- **Master Manual:** [SKILLS.md](../../../SKILLS.md)

---

## 1. Reference Platforms & 7-Step Design Analysis Protocol

Before selecting colors, fonts, or layouts, study references across **Awwwards, Godly, SiteInspire, Land-book, Behance, Dribbble, Mobbin, and 21st.dev**:

1. **Select 4–6 targeted references** spanning the client's industry and cross-industry craft leaders (e.g., 1 for grid rhythm, 1 for typography, 1 for hero framing, 1 for mobile UX).
2. **Audit design language:** Surface tone (warm alabaster vs. tinted obsidian), border philosophy (1px hairlines vs. soft depth), photography/media grading.
3. **Deconstruct layout & composition:** Column splits (12-col asymmetric, sticky storytelling, bento ratios), negative space percentage, section pacing.
4. **Analyze typography & color systems:** Display-to-body ratio (`>= 3.5x`), serif/sans/mono tension, 60-30-10 accent restraint.
5. **Study animations & interactions:** Easing personality, scroll rhythm, hover micro-feedback, purposeful vs. noisy motion.
6. **Articulate effectiveness:** Document *why* each reference builds credibility and directs attention.
7. **Synthesize an original Creative Thesis:** Compress into a unique 3–5 word direction (e.g., *"Raw Concrete & Crimson Editorial"*). **Never copy any reference pixel-for-pixel.**

---

## 2. Core Visual Craft Standards

### Visual Composition & Layouts
- **Break Monotony:** Alternate layout archetypes across sections — Editorial Split Hero, Asymmetric Sticky Storytelling (`lg:col-span-5` sticky + `lg:col-span-7` scrolling), Architectural Bento Grid (varying spans, each tile with a distinct visual artifact), Full-Bleed Media Interlude, and Swiss Hairline Lists (`01 / 02 / 03`).
- **Whitespace & Rhythm:** Enforce a 4px/8px spacing system, outer container `max-w-[1440px] px-5 sm:px-8 lg:px-12`, and generous vertical breathing room (`py-20 md:py-32`).
- **Imagery & Depth:** Consistent color grading and fixed aspect ratios (`aspect-[16/10]`, `aspect-[4/5]`); crisp `ring-1 ring-inset` edges; dark scrims wherever text sits over imagery; use `backdrop-blur` *only* on elements genuinely floating over rich media/3D.

### Typography Hierarchy
- **Max 2–3 Typefaces (or Variable Font System):** Pair an expressive Display face (`Instrument Serif`, `Clash Display`, `Syne`, `Bricolage Grotesque`, `Space Grotesk`) with an effortless Body face (`Geist`, `DM Sans`, `Satoshi`, `Manrope`, `Plus Jakarta Sans`) and an optional Mono (`Geist Mono`, `JetBrains Mono`) for eyebrows, metrics, and indices.
- **Fluid `clamp()` Scale:** Scale headings smoothly from `375px` to `1920px` (e.g., `--text-hero: clamp(2.75rem, 6.5vw + 1rem, 7.25rem)`).
- **Precision Optical Rules:** Tight leading (`0.95–1.08`) and negative tracking (`-0.025em` to `-0.045em`) on large display type; `16px–18px` body at `1.55–1.7` leading capped at `55ch–70ch`; `text-balance` on headlines; `text-pretty` on paragraphs; `tabular-nums` on all prices, counters, and metrics.

### Color & Brand Identity (OKLCH Semantic Tokens)
- **60–30–10 Discipline:** 60% tinted base canvas (avoid raw `#000`/`#fff` unless intentionally Swiss/Brutalist), 30% elevated structural surfaces & subtle `1px` borders, 10% single primary accent reserved for primary CTAs and focal highlights.
- **Contrast Gate:** Body text `>= 4.5:1` (target `7:1+`), large display text & UI borders `>= 3:1`.
- **Single Icon System:** Commit to one icon library (`lucide-react` or `@phosphor-icons/react`) and one consistent stroke weight across the entire project.

---

## 3. Mandatory Output Gate (Phase 7)

Before marking any website complete, score it using the **9-Dimension Design Evaluation Scorecard** in [design-evaluation.md](../../references/design-evaluation.md) (Visual Originality, Typography, Layout, Spacing, Consistency, Visual Hierarchy, UX, Responsiveness, Brand Alignment).

- **Pass Requirement:** Composite score `>= 85 / 100` AND every individual dimension `>= 8 / 10`.
- Any failing dimension MUST be fixed and re-scored before launch.

