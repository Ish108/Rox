import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Lightweight HTML5 <canvas> mouse-reactive topographic ring-wave field.
 * Caps DPR at 2, caps at ~60fps, pauses when off-screen or tab hidden,
 * and falls back to a static CSS gradient under prefers-reduced-motion.
 */
export const HeroCanvas: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let width = 0;
    let height = 0;
    let mouseX = 0.65;
    let mouseY = 0.45;
    let targetX = 0.65;
    let targetY = 0.45;
    let lastFrame = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetX = (e.clientX - rect.left) / rect.width;
        targetY = (e.clientY - rect.top) / rect.height;
      }
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const draw = (time: number) => {
      rafId = requestAnimationFrame(draw);
      if (!isVisible || !isTabActive) return;
      if (time - lastFrame < 16) return;
      lastFrame = time;

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width * (0.62 + (mouseX - 0.5) * 0.14);
      const cy = height * (0.48 + (mouseY - 0.5) * 0.14);
      const t = time * 0.00055;

      // Ambient radial glow (Navy -> Emerald moderate -> subtle Antique Gold low)
      const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.6);
      glow.addColorStop(0, 'rgba(0, 229, 153, 0.14)');
      glow.addColorStop(0.45, 'rgba(16, 185, 129, 0.06)');
      glow.addColorStop(0.75, 'rgba(212, 175, 55, 0.04)');
      glow.addColorStop(1, 'rgba(6, 11, 24, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Topographic square-ring & wave contours (boxing ring geometry)
      const ringCount = 9;
      for (let i = 0; i < ringCount; i++) {
        const progress = (i + 1) / ringCount;
        const baseRadius = Math.min(width, height) * (0.14 + progress * 0.42);
        const pulse = Math.sin(t * 2 + i * 0.7) * 6;
        const r = baseRadius + pulse;

        ctx.beginPath();
        const segments = 64;
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const wave = Math.sin(angle * 4 + t * 2.2 + i) * 4;
          const sqFactor = 1 / Math.pow(Math.pow(Math.abs(cos), 3.2) + Math.pow(Math.abs(sin), 3.2), 1 / 3.2);
          const px = cx + cos * (r * 0.85 * sqFactor + wave);
          const py = cy + sin * (r * 0.72 * sqFactor + wave);
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const alpha = (1 - progress) * 0.24 + 0.04;
        // Moderate Emerald rings, Low Antique Gold accents
        ctx.strokeStyle =
          i % 4 === 0
            ? `rgba(212, 175, 55, ${alpha * 0.85})`
            : `rgba(0, 229, 153, ${alpha})`;
        ctx.lineWidth = i === 2 ? 1.4 : 1;
        ctx.stroke();
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 70% 42%, rgba(0,229,153,0.12), transparent 52%), radial-gradient(circle at 25% 75%, rgba(212,175,55,0.07), transparent 55%)',
        }}
      />
    );
  }

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
};
