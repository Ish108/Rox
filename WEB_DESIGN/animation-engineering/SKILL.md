---
name: animation-engineering
description: >-
  Motion choreography, GSAP (ScrollTrigger, free SplitText, Flip, MorphSVG, useGSAP), Motion
  for React (motion/react), Lenis smooth scrolling, CSS Scroll-Driven Animations, React
  ViewTransition, DotLottie, SVG animations, and custom cursors. Use when designing and
  implementing web animations, transitions, scroll choreography, and micro-interactions.
---

# Animation & Motion Engineering

> **Objective:** Choreograph smooth, intentional, GPU-composited animations, transitions, and custom cursors that make websites feel tactile and alive without hurting readability or performance.

## Primary Reference
- **Full Code Patterns & Custom Cursor Implementation:** [animation-patterns.md](../../references/animation-patterns.md)
- **Parent Capability:** [interactive-experience-engineering](../interactive-experience-engineering/SKILL.md)

---

## 1. Motion Architecture Rules
- **Compositor-Only Properties:** Animate ONLY `transform`, `opacity`, and `clip-path`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
- **Signature Easing:** Avoid linear/default `ease`. Use decisive deceleration curves (`cubic-bezier(0.16, 1, 0.3, 1)` / GSAP `power4.out`) and crisp springs (`{ stiffness: 320, damping: 28, mass: 0.8 }`).
- **Tight Staggers:** Keep staggers fast (`0.03s–0.07s`) so users never wait on text to appear.
- **Single Smooth Scroller:** Use **Lenis** (`lenis/react` synced to `gsap.ticker`) OR GSAP `ScrollSmoother` — never both — and skip smooth scrolling on data-heavy SaaS dashboards.

## 2. Implementation Standards by Engine
- **GSAP (`gsap` + `@gsap/react`):** 100% free including `SplitText`, `ScrollSmoother`, `Flip`, `MorphSVG`, `DrawSVG`. Always scope inside `useGSAP(..., { scope: containerRef })` and guard animations inside `gsap.matchMedia()` for responsive breakpoints and `(prefers-reduced-motion: no-preference)`.
- **Motion (`motion`, imported from `"motion/react"`):** Wrap app root in `<MotionConfig reducedMotion="user">`. Use for `AnimatePresence`, `layoutId` shared element pills/tabs, drawers, and mouse-only `Magnetic` wrappers.
- **Native Platform First:** Prefer CSS `transition`, CSS Scroll-Driven Animations (`animation-timeline: view()` / `scroll()`), and React `<ViewTransition>` whenever JavaScript orchestration is unnecessary.
- **Custom Cursors:** Strictly desktop fine-pointer only (`(hover: hover) and (pointer: fine)`), driven by MotionValues/springs or GSAP `quickTo` (zero React re-renders), `pointer-events-none`, context-sensitive via `data-cursor` / `data-cursor-text` / `data-cursor-image`, and auto-hidden over form controls and iframes.
- **Mobile Fallbacks:** Replace pinned horizontal scroll tracks with native `overflow-x-auto snap-x snap-mandatory` or clean vertical stacks; disable custom cursors and magnetic hover pulls on touch devices.

