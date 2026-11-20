---
name: interactive-experience-engineering
description: >-
  Interactive experience engineering covering 3D WebGL/WebGPU (Three.js, React Three Fiber,
  Drei, Spline), modern animations (GSAP, Motion for React, Lenis, CSS Scroll-Driven,
  Lottie, ViewTransition), custom cursors, and modern UI component registries (21st.dev,
  shadcn/ui, Aceternity UI, Magic UI, React Bits, Origin UI). Use when designing,
  selecting, implementing, or auditing interactive website experiences.
---

# Interactive Experience Engineering

> **Objective:** Engineer memorable, fluid, tactile web interactions — 3D scenes, custom cursors, scroll choreography, micro-interactions, and bespoke UI components — while maintaining 60fps performance, mobile usability, and accessibility.

## Connected Specialist Skills & References
- **Reusable Interaction & Cursor Library:** [animation-patterns.md](../../references/animation-patterns.md)
- **Reusable 3D Pattern Library:** [3d-patterns.md](../../references/3d-patterns.md)
- **Component & Registry Knowledge Base:** [component-library.md](../../references/component-library.md)
- **Tech Selection Matrix:** [technology-selection.md](../../references/technology-selection.md)
- **Deep Technical Skills:** [3d-development](../3d-development/SKILL.md) | [animation-engineering](../animation-engineering/SKILL.md)

---

## 1. The 6-Point Interaction Evaluation Gate

Never add an effect just because it is technically possible. Every interaction, animation, custom cursor, or 3D canvas MUST pass all 6 checks before implementation:

1. **Purpose:** Does it clarify hierarchy, showcase the product, or elevate brand emotion?
2. **Performance:** Does it animate GPU-composited properties only (`transform`, `opacity`, `clip-path`) and stay within Core Web Vitals budgets?
3. **Visual Quality:** Does its easing, timing, and physics match the brand's Creative Thesis?
4. **Usability:** Does it never delay reading, hijack clicks, or obscure navigation/CTAs?
5. **Mobile Compatibility:** Does it have an intentional touch alternative (no stuck custom cursors, no sluggish pinned horizontal scroll, capped WebGL DPR)?
6. **Accessibility:** Does it gracefully simplify or disable under `prefers-reduced-motion: reduce` and preserve keyboard focus?

---

## 2. Right-Tool-for-the-Job Rule (Never Use Every Library on One Site)

| Interaction Type | Reach For | Avoid Overkill |
| :--- | :--- | :--- |
| Hover states, color/border shifts, simple scroll progress/reveals | **Native CSS** (`transition`, `animation-timeline: view()/scroll()`) | Loading GSAP or Motion solely for hover fades |
| React mount/unmount, tabs (`layoutId`), drawers, magnetic spring physics | **Motion** (`motion`, import `motion/react`) | Legacy `framer-motion` alongside `motion` |
| Complex scroll timelines, pinning, horizontal galleries, `SplitText`, `MorphSVG` | **GSAP** (`gsap` + `@gsap/react`) — 100% free incl. Club plugins | Writing brittle manual `window.scrollY` listeners |
| Momentum smooth scrolling | **Lenis** (`lenis/react`) synced to GSAP ticker — when editorial feel justifies it | Combining Lenis AND `ScrollSmoother`, or forcing smooth scroll on dense dashboards |
| Route / shared-element transitions | **React `<ViewTransition>`** (Next.js App Router) | Heavy page-unmount wrappers when native transitions work |
| Interactive 3D objects, product viewers, scroll-synced 3D, custom shaders | **Three.js + R3F v9 + Drei** (or **Spline** for designer-built scenes) | Uncompressed GLBs, un-paused off-screen canvases, or 3D where video/WebP is clearer |
| Vector brand animations | **DotLottie** (`@lottiefiles/dotlottie-react`) | Multi-megabyte raw `.json` animations |

---

## 3. Modern UI Component Registry Workflow

Initialize `shadcn/ui` (`npx shadcn@latest init`) and configure multi-registry namespaces in `components.json` for **21st.dev**, **Origin UI**, **Aceternity UI**, **Magic UI**, and **React Bits**.

Before shipping ANY imported registry component:
1. **Audit dependencies** (normalize imports to `motion/react`; remove duplicate libraries).
2. **Remap 100% of colors, radii, fonts, and shadows** to the project's CSS design tokens.
3. **Verify touch & `prefers-reduced-motion` behavior.**
4. **Cap showpiece effects** to 1–2 focal moments per viewport so GPU frame rates stay locked at 60fps.

---

## 4. Custom Cursor & 3D Implementation Guardrails

- **Custom Cursors** (SVG, image preview, magnetic ring, context labels via `data-cursor` / `data-cursor-text`): Gate strictly behind `(hover: hover) and (pointer: fine)` and `(prefers-reduced-motion: no-preference)`. Drive coordinates via MotionValues/springs or GSAP `quickTo` (never `useState`). Always `pointer-events-none` and auto-hide over form inputs & iframes. See [animation-patterns.md](../../references/animation-patterns.md).
- **Interactive 3D**: Dynamically import via `next/dynamic(..., { ssr: false })`, compress `.glb` assets with `gltf-transform` (`<= 1.5MB`), cap `dpr={[1, 2]}`, sync scroll/mouse via mutable refs or Zustand inside `useFrame`, pause off-screen with `frameloop="never"`, and render a static fallback image when WebGL fails or reduced motion is enabled. See [3d-patterns.md](../../references/3d-patterns.md).

