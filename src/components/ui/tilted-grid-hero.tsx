"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TiltedGridImage = {
  src: string;
  alt?: string;
};

export type TiltedGridHeroProps = {
  images: TiltedGridImage[];
  /** Seconds per card width of travel. @default 4.5 */
  speed?: number;
  /** Tile height, as a percentage of container height. @default 68 */
  tileHeight?: number;
  /** Tile width / height. @default 16 / 9 */
  aspectRatio?: number;
  /** Gap between cards in px. @default 22 */
  gap?: number;
  /** Vertical centre %, @default 50 */
  axis?: number;
  /** Maximum Y-rotation in degrees at the edges. @default 34 */
  curve?: number;
  /** Edge fade width %. @default 10 */
  fade?: number;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Smooth 3D curved-cylinder facility ribbon.
 * Guarantees exact card separation (zero overlap) and continuous full-width coverage (zero gaps).
 */
export function TiltedGridHero({
  images,
  speed = 4.5,
  tileHeight = 68,
  aspectRatio = 16 / 9,
  gap = 22,
  axis = 50,
  curve = 34,
  fade = 10,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & TiltedGridHeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [dims, setDims] = React.useState({ width: 1200, height: 280 });
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setDims({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardHeight = Math.max(120, Math.round((tileHeight / 100) * dims.height));
  const cardWidth = Math.round(cardHeight * aspectRatio);
  const pitch = cardWidth + gap;

  // Build enough repeated items to always cover viewport + 2 buffer cards on each side
  const minCards = Math.max(images.length, Math.ceil(dims.width / pitch) + 3);
  const items = React.useMemo(() => {
    if (images.length === 0) return [];
    const out: TiltedGridImage[] = [];
    while (out.length < minCards) {
      out.push(...images);
    }
    return out;
  }, [images, minCards]);

  const totalWidth = items.length * pitch;

  React.useEffect(() => {
    if (items.length === 0 || totalWidth === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let rafId = 0;
    let lastTime = performance.now();

    const pxPerSecond = pitch / Math.max(1, speed);
    const maxAngle = Math.min(55, Math.max(8, curve));
    const halfStage = Math.max(dims.width * 0.5, cardWidth);

    const positionCards = (currentOffset: number) => {
      items.forEach((_, idx) => {
        const node = cardRefs.current[idx];
        if (!node) return;

        // Wrap each card smoothly in [-totalWidth / 2, +totalWidth / 2]
        let x = ((idx * pitch - currentOffset) % totalWidth + totalWidth) % totalWidth;
        if (x > totalWidth / 2) x -= totalWidth;

        // Normalized distance from center [-1, 1] across the visible stage
        const norm = Math.max(-1.25, Math.min(1.25, x / halfStage));
        const rotateY = -norm * maxAngle;
        // Concave cylindrical curve: center sits slightly recessed, edges curve forward/inward smoothly
        const translateZ = -Math.abs(norm) * Math.abs(norm) * 45;

        node.style.transform = `translate3d(${x.toFixed(2)}px, -50%, ${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg)`;
      });
    };

    positionCards(offset);
    if (reduced) return;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      if (!paused) {
        offset = (offset + pxPerSecond * dt) % totalWidth;
        positionCards(offset);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [items, totalWidth, pitch, speed, curve, dims.width, cardWidth, paused]);

  const mask = `linear-gradient(90deg, transparent, #000 ${fade}%, #000 ${100 - fade}%, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn("relative overflow-hidden select-none", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: "1100px",
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {items.map((img, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: `${axis}%`,
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              marginLeft: `${-cardWidth / 2}px`,
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
            className="overflow-hidden rounded-xl border border-slate-400/20 bg-[#0A0B0F] shadow-[0_14px_36px_rgba(0,0,0,0.65)]"
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}

export default TiltedGridHero;
