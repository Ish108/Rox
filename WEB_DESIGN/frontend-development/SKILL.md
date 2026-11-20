---
name: frontend-development
description: >-
  Production frontend architecture using React 19, Next.js 16 App Router, TypeScript, Tailwind
  CSS v4, shadcn/21st.dev multi-registry component systems, form/API integrations (Supabase,
  Firebase, Sanity, Contentful, Cloudinary, Resend), and deployment (Vercel, Netlify,
  Cloudflare). Use during Phase 4 (Technical Architecture) and Phase 5 (Development).
---

# Frontend Architecture & Full-Stack Web Development

> **Objective:** Build clean, type-safe, maintainable, server-first frontend architectures with zero unnecessary dependencies.

## References
- **Technology & Deployment Selection:** [technology-selection.md](../../references/technology-selection.md)
- **Component & Section Blueprints:** [component-library.md](../../references/component-library.md)
- **Master Manual:** [SKILLS.md](../../../SKILLS.md)

---

## 1. Modern Production Baseline (2025–2026)

- **Framework:** **Next.js 16 (App Router)** with Turbopack, React Server Components, Server Actions, `next/image`, `next/font`, and Metadata API. *(Choose Vite + React only for non-SEO WebGL/SPA microsites).*
- **UI Runtime & Types:** **React 19 (`19.3+`)** + **TypeScript (`strict: true`)**.
- **Styling:** **Tailwind CSS v4** — CSS-first `@theme inline` tokens in `src/app/globals.css`, OKLCH semantic colors, native `@container` queries.
- **State & Forms:** React Server Components + URL state (`nuqs`) + **Zustand** (only for global/3D transient client state) + **React Hook Form + Zod** (validated on both client and server).

## 2. Server vs. Client Boundary Discipline
- Keep **80%+ of pages and layouts as React Server Components**.
- Push `"use client"` strictly to minimal interactive leaf components (`MobileMenu`, `LeadForm`, `TextReveal`, `HeroCanvasLoader`).
- Always isolate WebGL/Spline/heavy browser-only widgets via `next/dynamic(..., { ssr: false })`.

## 3. Clean Folder Architecture

```text
src/
├── app/           # globals.css, layout.tsx, page.tsx, routes/, sitemap.ts, robots.ts, not-found.tsx, error.tsx
├── components/
│   ├── ui/        # Customized shadcn / 21st.dev / Origin / Magic / Aceternity / React Bits primitives
│   ├── motion/    # SmoothScrollProvider, TextReveal, Magnetic, Parallax
│   ├── three/     # R3F Canvas, compressed models, shaders (ssr: false)
│   ├── layout/    # Header, MobileMenu, Footer, CustomCursor, StickyMobileCTA
│   └── sections/  # Hero, TrustBar, BentoGrid, Services, Pricing, Testimonials, FAQ, ConversionCTA
├── content/       # Typed static content or CMS query modules
├── hooks/         # useMediaQuery, useReducedMotion, useInView
├── lib/           # utils.ts (cn), validations.ts (Zod), cms.ts, db.ts, whatsapp.ts
└── types/         # Shared TypeScript interfaces
```

## 4. Backend, CMS, Media & Deployment Selection
Only introduce external infrastructure when project requirements justify it (full comparison in [technology-selection.md](../../references/technology-selection.md)):
- **Database/Auth:** Supabase (Postgres + Auth + RLS) or Firebase; Clerk / Better Auth for standalone auth.
- **CMS:** Sanity (editorial/live preview) or Contentful (enterprise localization).
- **Media CDN:** Cloudinary (large galleries / user uploads); `next/image` suffices for small local asset sets.
- **Lead Capture:** Next.js Server Actions + Zod + Resend (or n8n webhook) + honeypot anti-spam.
- **Deployment:** **Vercel** (zero-config Next.js default), **Netlify** (OpenNext adapter, flat seat pricing), or **Cloudflare Workers** (`@opennextjs/cloudflare`, zero egress fees for high-traffic/media sites).

