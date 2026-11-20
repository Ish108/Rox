---
name: performance-and-accessibility
description: >-
  Core Web Vitals optimization, Lighthouse auditing, image/font/JS/3D performance engineering,
  WCAG 2.1/2.2 AA accessibility, semantic HTML, keyboard navigation, reduced-motion support,
  and technical SEO. Use during Development, Phase 6 Testing, and Phase 7 Final Polish.
---

# Performance, Accessibility & Technical SEO

> **Objective:** Deliver lightning-fast Core Web Vitals, WCAG AA+ accessibility, and clean search discoverability without compromising creative ambition.

## Connected References
- **Full QA & Launch Checklist:** [quality-checklist.md](../../references/quality-checklist.md)
- **3D GPU Guardrails:** [3d-patterns.md](../../references/3d-patterns.md)

---

## 1. Core Web Vitals & Lighthouse Targets

| Metric | Target | Key Engineering Enforcers |
| :--- | :--- | :--- |
| **LCP** | `< 2.5s` (aim `< 1.8s`) | `priority` on hero `<Image>` only, `next/font` zero-FOUT preload, dynamically import 3D/heavy client widgets (`ssr: false`) |
| **INP** | `< 200ms` (aim `< 100ms`) | Keep RSC-first tree, GPU-composited animations only, mutate cursor/3D in refs/Zustand (never `useState` at 60fps) |
| **CLS** | `< 0.1` (aim `0.00`) | Explicit `width`/`height` or `aspect-*` on every image/video/embed, `next/font` fallback metrics |
| **Lighthouse** | Perf `90+`, A11y `95+`, Best Practices `95+`, SEO `95+` | Clean bundle, semantic HTML, full metadata & contrast |

### Tactical Optimization Rules
- **Images:** Use `next/image` (AVIF/WebP) with accurate `sizes`; lazy-load everything below the fold.
- **Fonts:** Load via `next/font/google` or `next/font/local` (`display: "swap"`), importing only weights actually rendered.
- **Code Splitting:** Dynamically import Three.js/R3F, Spline, DotLottie, charts, and third-party booking iframes; avoid barrel-file imports that defeat tree-shaking.
- **Preloaders:** Keep optional intro preloaders `<= 1.2s`, once per session (`sessionStorage`), never hiding SSR content from crawlers, and skip completely under `prefers-reduced-motion`.

## 2. WCAG 2.1/2.2 AA Accessibility Standards
- **Semantic Structure:** Single `<h1>` per page, sequential heading hierarchy (`h1 -> h2 -> h3`), `<header>`, `<nav aria-label>`, `<main id="main-content">`, `<section>`, `<article>`, `<footer>`.
- **Skip Link & Keyboard Control:** First focusable link skips to `#main-content`; every interactive control reachable via `Tab`, activatable via `Enter`/`Space`, modals/drawers focus-trapped and closable via `Escape`, crisp `focus-visible` outline always visible.
- **Contrast:** Minimum `4.5:1` for body text (`7:1+` preferred), `3:1` for large headings and interactive UI boundaries.
- **ARIA Discipline:** Prefer native HTML first; add `aria-label` on icon-only buttons, `aria-hidden="true"` on decorative SVGs/cursors/canvases, `aria-invalid` + `aria-describedby` on form errors, descriptive `alt` text on informative images.
- **Reduced Motion Everywhere:** Global `@media (prefers-reduced-motion: reduce)` CSS fallback + `<MotionConfig reducedMotion="user">` + `gsap.matchMedia()` + static 3D/video fallbacks.

## 3. Technical SEO & Error Resilience
- Complete Next.js Metadata (`title` template, unique `description`, `openGraph` `1200x630`, `twitter`, `canonical`, `metadataBase`).
- Dynamic `sitemap.ts`, `robots.ts`, proper favicons, and JSON-LD structured data (`Organization`, `LocalBusiness`, `Product`, `FAQPage`, `Article`).
- Branded `not-found.tsx` (404) and `error.tsx` recovery pages.

