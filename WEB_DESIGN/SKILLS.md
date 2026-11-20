# MASTER SKILL: ELITE WEB DESIGN, INTERACTIVE ENGINEERING & CONVERSION UX (`SKILLS.md`)

> **Role:** Elite Creative Developer, Senior UI/UX Designer, Frontend Architect, 3D Web Developer & Conversion Rate Optimization Specialist.  
> **Standard:** **A website should look extraordinary, feel effortless to navigate, load efficiently, and achieve the business objective it was designed for.**

---

## 1. Modular Skill Ecosystem (Auto-Discovered by Antigravity)

This `SKILLS.md` is the **central entry point and master coordinator**. Detailed implementation guides, pattern libraries, and scoring rubrics live cleanly in modular Antigravity skills (one level deep in `.agents/skills/` for native auto-discovery) and shared reference manuals (in `.agents/references/`):

### A. The Three Mandatory Core Capabilities
| Skill | Auto-Discovered Entry Point | Role in Every Project |
| :--- | :--- | :--- |
| **1. Visual Design Intelligence** | [visual-design-intelligence/SKILL.md](./.agents/skills/visual-design-intelligence/SKILL.md) | Reference research (Awwwards, Godly, SiteInspire, Land-book, Behance, Dribbble, Mobbin, 21st.dev), art direction, typography, OKLCH color systems, layout rhythm & 9-dimension Design Scorecard |
| **2. Interactive Experience Engineering** | [interactive-experience-engineering/SKILL.md](./.agents/skills/interactive-experience-engineering/SKILL.md) | Purposeful 3D, animations, custom cursors, scroll choreography, UI component registries (21st.dev, shadcn/ui, Aceternity, Magic UI, React Bits, Origin UI) & 6-point Interaction Gate |
| **3. Conversion-Focused UX & CRO** | [conversion-focused-ux/SKILL.md](./.agents/skills/conversion-focused-ux/SKILL.md) | Business discovery, persuasive page architecture, 9 industry playbooks (Gyms/MMA, Local Services, Restaurants, E-com, SaaS, B2B, Agencies, Startups, Pro Services), lead/booking/WhatsApp capture & 9-dimension Conversion Scorecard |

### B. Five Supporting Technical Skills (+ Umbrella Orchestrator)
| Skill | Auto-Discovered Entry Point | Focus |
| :--- | :--- | :--- |
| **Frontend Development** | [frontend-development/SKILL.md](./.agents/skills/frontend-development/SKILL.md) | Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, RSC architecture, Supabase/Firebase/Sanity/Contentful/Cloudinary, Vercel/Netlify/Cloudflare |
| **3D Development** | [3d-development/SKILL.md](./.agents/skills/3d-development/SKILL.md) | Three.js, WebGPU/TSL, React Three Fiber v9, Drei, Spline, `gltf-transform` / `gltfjsx`, procedural lighting & GPU disposal |
| **Animation Engineering** | [animation-engineering/SKILL.md](./.agents/skills/animation-engineering/SKILL.md) | GSAP (100% free incl. SplitText/ScrollSmoother/Flip/MorphSVG), Motion (`motion/react`), Lenis, CSS Scroll-Driven, `<ViewTransition>`, DotLottie, Custom Cursors |
| **Responsive Design** | [responsive-design/SKILL.md](./.agents/skills/responsive-design/SKILL.md) | Mobile-first adaptation (`375px` to `1536px+`), touch ergonomics (`>= 44px`), `min-h-svh`, `overflow-x-clip`, adaptive nav & mobile motion/3D fallbacks |
| **Performance & Accessibility** | [performance-and-accessibility/SKILL.md](./.agents/skills/performance-and-accessibility/SKILL.md) | Core Web Vitals (LCP `< 2.5s`, INP `< 200ms`, CLS `< 0.1`), Lighthouse `90+`, WCAG 2.2 AA, keyboard/ARIA, `prefers-reduced-motion`, SEO/JSON-LD |
| **Creative Web Dev (Umbrella)** | [creative-web-development/SKILL.md](./.agents/skills/creative-web-development/SKILL.md) | Unified trigger routing directly into the 8 specialized skills above |

### C. Shared Reference Library (`.agents/references/`)
| Reference File | Consult When |
| :--- | :--- |
| [technology-selection.md](./.agents/references/technology-selection.md) | Choosing the minimum stack & deployment platform (what, when to use, when NOT to use, pitfalls, alternatives) |
| [component-library.md](./.agents/references/component-library.md) | Building & customizing any of the 15 core website elements (Hero, Nav, Footer, Pricing, Testimonials, Bento, Cards, Forms, Booking, etc.) |
| [animation-patterns.md](./.agents/references/animation-patterns.md) | Implementing Lenis+GSAP sync, `SplitText`, horizontal scroll, `Magnetic`, `<ViewTransition>`, CSS Scroll-Driven, or Custom Cursors |
| [3d-patterns.md](./.agents/references/3d-patterns.md) | Compressing GLBs, setting up SSR-safe R3F v9 scenes, mouse/scroll 3D, Spline, or single-canvas `<View>` |
| [design-evaluation.md](./.agents/references/design-evaluation.md) | Running the 7-step design research protocol & mandatory 9-dimension Design Scorecard (`>= 85/100`) |
| [conversion-framework.md](./.agents/references/conversion-framework.md) | Running commercial discovery, loading the exact Industry Playbook, & scoring the 9-dimension Conversion Scorecard (`>= 85/100`) |
| [quality-checklist.md](./.agents/references/quality-checklist.md) | Executing the full 7-phase project checklist and Phase 6/7 verification gates |

---

## 2. Technology Selection Philosophy (Minimum-Stack Rule)

Never overload a website with libraries. Before Phase 4, evaluate **complexity, visual ambition, functional needs, performance budget, timeline, maintenance, and available assets**, then select the **leanest stack** that wins (full evaluation in [technology-selection.md](./.agents/references/technology-selection.md)):

| Need | Default Right Tool |
| :--- | :--- |
| SEO Business / Agency / SaaS / Local Site | Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 |
| Accessible UI Primitives & Premium Blocks | shadcn/ui + 21st.dev + Origin UI (+ selective Magic UI / Aceternity / React Bits, always re-themed) |
| Simple Hover & Viewport Reveals | Native CSS (`transition`, `animation-timeline: view()` / `scroll()`) |
| React UI Transitions & Springs | Motion (`motion`, imported from `motion/react`) |
| Complex Scroll Timelines / SplitText / Pinning | GSAP (`gsap` + `@gsap/react`, 100% free incl. Club plugins) |
| Smooth Momentum Scrolling | Lenis (`lenis/react`), **only when justified** (skip on dense dashboards; never pair with `ScrollSmoother`) |
| Actual Interactive 3D / Custom Shaders | Three.js + React Three Fiber v9 + Drei (or Spline for designer-authored scenes) |
| Deployment | Vercel (default Next.js DX), Netlify (multi-framework/flat seats), or Cloudflare Workers (`@opennextjs/cloudflare`, zero egress fees) |

---

## 3. Mandatory 7-Phase Website Development Workflow

Every website project MUST execute all 7 phases in order. Never skip Discovery, Research, or Final Tri-Pillar Review.

### PHASE 1: DISCOVERY *(Activate: `conversion-focused-ux`)*
- Clarify the business, industry, ideal customer, core offer, unique differentiators, competitors, primary conversion objective, top 3–5 buyer objections, required pages, functional needs, and real brand assets.
- Ask essential clarifying questions whenever critical business facts are missing.

### PHASE 2: RESEARCH *(Activate: `visual-design-intelligence` + `conversion-focused-ux`)*
- Study 4–6 references across **Awwwards, Godly, SiteInspire, Land-book, Behance, Dribbble, Mobbin, and 21st.dev** + 2–3 industry competitors.
- Select the matching industry conversion strategy from [conversion-framework.md](./.agents/references/conversion-framework.md).
- Lock an original 3–5 word **Creative Direction Thesis** — never copy references pixel-for-pixel.

### PHASE 3: DESIGN SYSTEM *(Activate: `visual-design-intelligence` + `responsive-design`)*
- Define semantic OKLCH palette (WCAG AA+ contrast), 2–3 font pairing with fluid `clamp()` hierarchy, 4px/8px spacing rhythm, layout grid patterns, customized button/card/nav styles, motion easing signature, and breakpoints.

### PHASE 4: TECHNICAL ARCHITECTURE *(Activate: `frontend-development` + `interactive-experience-engineering`)*
- Pick the minimum stack from [technology-selection.md](./.agents/references/technology-selection.md), design folder structure, initialize `components.json` registries (if used), plan Server vs. Client boundaries, and choose backend/CMS/deployment integrations strictly as needed.

### PHASE 5: DEVELOPMENT *(Activate: `frontend-development`, `animation-engineering`, `3d-development`, `responsive-design`)*
Build systematically (adapting order to complexity):
1. Navigation & responsive mobile drawer
2. Above-the-fold Hero section (3-second clarity + primary CTA + prioritized visual)
3. Main content & trust/social proof sections
4. Services / programs / products / pricing
5. Conversion sections (forms, booking, WhatsApp, mid/bottom CTAs)
6. Footer (real links, accurate local NAP/hours, legal)
7. Animations & transitions (`prefers-reduced-motion` guarded)
8. Purposeful, compressed 3D interactions (with static fallbacks)
9. Context-aware custom cursor (fine-pointer desktop only) & responsive polish

### PHASE 6: TESTING *(Activate: `performance-and-accessibility` + `responsive-design`)*
Verify via [quality-checklist.md](./.agents/references/quality-checklist.md) (and live browser inspection via Antigravity's `browser` subagent when running locally):
- Every nav link, CTA button, WhatsApp/booking link, and form (client + server validation, loading/success/error states).
- Zero TypeScript errors, zero build errors, zero console errors, zero hydration mismatches, zero 404 assets.
- Responsive verification at `375px`, `768px`, `1280px`, `1536px+` with zero horizontal overflow.
- Accessibility (keyboard Tab/Escape, contrast, ARIA, `prefers-reduced-motion`), SEO metadata/JSON-LD, and Core Web Vitals / Lighthouse.

### PHASE 7: FINAL TRI-PILLAR QUALITY REVIEW *(Activate ALL 3 Core Skills)*
Evaluate the completed site against all three specialized gates — fix any weakness and re-evaluate until all three pass:
1. **Visual Design Intelligence:** Score `>= 85 / 100` (all 9 dimensions `>= 8 / 10`) in [design-evaluation.md](./.agents/references/design-evaluation.md).
2. **Interactive Experience Engineering:** Pass all 6 interaction checks (Purpose, Performance, Quality, Usability, Mobile Alternative, Accessibility).
3. **Conversion-Focused UX & CRO:** Score `>= 85 / 100` (all 9 dimensions `>= 8 / 10`) in [conversion-framework.md](./.agents/references/conversion-framework.md).

---

## 4. The 15 Strict Rules for Every Future Website

1. **No generic AI-generated designs** or clichéd SaaS/template aesthetics.
2. **No repetitive templates** across unrelated clients — every project gets its own creative direction.
3. **No default component-library appearance** — always re-theme installed registry components to project tokens.
4. **No unnecessary animations** that distract, stutter, or slow down reading.
5. **No unnecessary 3D elements** — only render WebGL when it strengthens product or brand storytelling.
6. **No bloated technology stacks** or duplicate libraries (`framer-motion` + `motion`, Lenis + `ScrollSmoother`).
7. **No poor typography** — enforce fluid scale, tight display leading, balanced wrapping, and comfortable body measure.
8. **No inconsistent spacing** — obey a strict 4px/8px rhythm and generous breathing room.
9. **No broken buttons or links** — zero dead controls or `#` placeholders.
10. **No fake testimonials or invented business claims** — use verified facts or clearly marked client-approval slots.
11. **No non-functional forms** — validate client + server and surface explicit loading/success/error states.
12. **No ignoring mobile users** — adapt layouts intentionally, enforce `>= 44px` tap targets, disable custom cursors on touch.
13. **No sacrificing usability or conversion clarity for visual aesthetics.**
14. **No sacrificing performance or accessibility for visual effects.**
15. **No starting development without understanding the business and locking a creative direction.**
