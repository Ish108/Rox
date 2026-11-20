---
name: 3d-development
description: >-
  3D web development using Three.js, WebGPU/TSL, React Three Fiber v9, Drei, Spline, and
  compressed GLB/GLTF pipelines (gltf-transform, Meshopt/Draco, gltfjsx). Use whenever
  architecting interactive 3D heroes, cursor/scroll-reactive 3D objects, product showcases,
  3D backgrounds, or WebGL/WebGPU shader experiences.
---

# 3D Web Development (Three.js, R3F, WebGPU & Spline)

> **Objective:** Deliver cinema-grade, interactive 3D web experiences that enhance product storytelling and brand authority while staying lightweight, responsive, and 60fps.

## Primary Reference
- **Full Code Patterns & Pipeline Commands:** [3d-patterns.md](../../references/3d-patterns.md)
- **Parent Capability:** [interactive-experience-engineering](../interactive-experience-engineering/SKILL.md)

---

## 1. Mandatory Purpose & Budget Gate
Never add WebGL purely for decoration. Verify 3D genuinely serves product visualization, spatial storytelling, or a signature hero centerpiece before installing Three.js.

- **Compressed `.glb` Budget:** `<= 1.5 MB` (target `300–800 KB`)
- **Geometry Budget:** `< 50,000` triangles desktop; `< 20,000` mobile
- **Texture Cap:** `1024x1024` standard (`2048x2048` max for close-up hero products)

## 2. Standard 3D Asset & Integration Workflow
1. **Optimize Assets First:** Run `npx @gltf-transform/cli optimize raw.glb public/models/hero.glb --texture-compress webp --texture-size 1024` (Meshopt default for fast decode; `--compress draco` for massive static sculpts).
2. **Generate Typed JSX:** Run `npx gltfjsx public/models/hero.glb --types --transform` for React Three Fiber v9.
3. **Dynamic SSR-Safe Import:** Load `<Canvas>` and `<Spline>` exclusively via `next/dynamic(..., { ssr: false })` behind WebGL capability & `prefers-reduced-motion` checks, paired with a crisp static WebP fallback.
4. **Zero-Rerender Frame Loop:** Never pass scroll or pointer state via React `useState`. Write to mutable refs or Zustand and mutate meshes via `THREE.MathUtils.damp` inside `useFrame`.
5. **Studio Lighting Without Bloat:** Prefer procedural `<Environment>` + `<Lightformer>` studio rigs over downloading 8MB `.hdr` files.
6. **Multi-Section 3D:** Use a single fixed `<Canvas>` + Drei `<View.Port />` + `<View track={ref}>` instead of spawning multiple WebGL contexts.
7. **Strict GPU Hygiene:** Cap `dpr={[1, 2]}` (`[1, 1.5]` mobile), pause off-screen canvases (`frameloop={inView ? "always" : "never"}`), use `frameloop="demand"` for orbit-only viewers, instance repeated meshes (`<InstancedMesh>`), and `.dispose()` geometries/materials/textures on unmount.

