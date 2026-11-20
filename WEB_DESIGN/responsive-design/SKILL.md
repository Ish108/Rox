---
name: responsive-design
description: >-
  Mobile-first and multi-breakpoint responsive web engineering across desktop, tablet, and
  mobile viewports, including touch ergonomics, adaptive navigation, fluid typography,
  container queries, and mobile-specific animation and 3D adaptations. Use during Phase 3,
  Phase 5, and Phase 6 to ensure every screen size feels intentionally designed.
---

# Responsive Design Engineering

> **Objective:** Craft intentional, bespoke layouts for mobile, tablet, laptop, and ultrawide screens — never simply shrinking a desktop design onto a phone.

## Connected References
- **Component Responsive Rules:** [component-library.md](../../references/component-library.md)
- **QA Breakpoint Verification:** [quality-checklist.md](../../references/quality-checklist.md)

---

## 1. Breakpoint Architecture (Mobile-First)
- **Mobile Base (`< 640px`, test at `375px`):** Single-column editorial flow, `px-5`, thumb-zone conversion CTAs, simplified/static 3D, zero custom cursor, crisp mobile menu drawer.
- **Tablet (`md: 768px+`):** 2-column splits, adaptive bento proportions, comfortable touch padding.
- **Laptop (`lg: 1024px+`):** Full 12-column asymmetric grids, sticky storytelling columns, desktop horizontal scroll tracks, fine-pointer custom cursor enabled.
- **Desktop / Ultrawide (`xl: 1280px+` / `2xl: 1536px+`):** Cap outer container (`max-w-[1440px]`) and body line length (`max-w-[65ch]`) so typography stays composed.

## 2. Non-Negotiable Responsive Engineering Rules
1. **Dynamic Viewport Heights:** Use `min-h-svh` (or `min-h-dvh`) — never `h-screen` (`100vh`) — so iOS/Android address bars never clip hero CTAs.
2. **Safe Overflow Guard:** Use `overflow-x-clip` on `<main>`/sections (NOT `overflow-x-hidden`, which breaks `position: sticky`). Verify `scrollWidth <= innerWidth` at every breakpoint.
3. **Touch Ergonomics:** Every mobile interactive target (buttons, links, menu triggers, tabs) MUST be at least **`44x44px`** (`min-h-11 min-w-11`) with `>= 8px` gap between adjacent actions.
4. **Form Input Sizing:** Keep mobile form inputs at `>= 16px` (`text-base`) so iOS Safari never auto-zooms on focus; set proper `inputMode` (`tel`, `email`) and `autocomplete`.
5. **No Hover-Only Critical Info:** Essential descriptions, prices, or CTAs must be visible or accessible via tap on `@media (hover: none)` devices.
6. **Fluid Typography & Container Queries:** Combine CSS `clamp()` heading tokens with Tailwind v4 `@container` queries so reusable cards adapt cleanly in both narrow bento tiles and full-width slots.
7. **Adaptive Motion & 3D:** Disable custom cursors & magnetic pulls on touch; replace pinned horizontal scroll with native `overflow-x-auto snap-x snap-mandatory` or vertical grids; halve parallax travel distance; cap WebGL `dpr={[1, 1.5]}` or swap heavy 3D canvases for art-directed WebP/video fallbacks on mobile.
8. **Mobile Conversion Priority:** For local services, gyms/MMA academies, and restaurants (where 70%+ traffic is mobile), surface primary booking/WhatsApp CTAs above the fold and via a clean sticky bottom action bar.

