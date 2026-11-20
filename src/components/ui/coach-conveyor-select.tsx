"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import type { Coach } from "@/data/coaches";

export interface CoachCharacter extends Coach {
  image: string;
  slotCode: string;
  rankColor: "gold" | "emerald";
}

interface CoachConveyorSelectProps {
  coaches: CoachCharacter[];
  onBookCoach: (coach: CoachCharacter) => void;
}

const SPACING = 1.65;
const CURVE = 0.9;
const TILT = 0.62;
const LIFT_Y = -12;
const LIFT_SCALE = 0.1;
const BACK_SHADE = 0.45;
const RUN = 0;
const SEEK = 1;
const DRAG = 2;

type Geo = {
  width: number;
  height: number;
  cardW: number;
  cardH: number;
  r: number;
  s: number;
  l: number;
  pitch: number;
  n: number;
  kb: number;
  cx: number;
  ym: number;
  a: number;
  b: number;
  band: number;
};

type Point = { x: number; z: number; nx: number; nz: number };

type Sim = {
  offset: number;
  v: number;
  mode: number;
  target: number;
  lift: number[];
  vlift: number[];
  z: number[];
  raf: number;
  last: number;
  visible: boolean;
  init: boolean;
  l: number;
  center: number;
  px: number;
  py: number;
  inside: boolean;
  lastScrollY: number;
};

function makeSim(): Sim {
  return {
    offset: 0,
    v: 0,
    mode: RUN,
    target: 0,
    lift: [],
    vlift: [],
    z: [],
    raf: 0,
    last: 0,
    visible: true,
    init: false,
    l: 0,
    center: -1,
    px: 0,
    py: 0,
    inside: false,
    lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function along(g: Geo, u: number): Point {
  const { s, r } = g;
  let t = ((u % g.l) + g.l) % g.l;
  if (t < s) return { x: s / 2 - t, z: r, nx: 0, nz: 1 };
  t -= s;
  const arc = Math.PI * r;
  if (t < arc) {
    const f = t / r;
    const sin = Math.sin(f);
    const cos = Math.cos(f);
    return { x: -s / 2 - r * sin, z: r * cos, nx: -sin, nz: cos };
  }
  t -= arc;
  if (t < s) return { x: -s / 2 + t, z: -r, nx: 0, nz: -1 };
  t -= s;
  const f = Math.min(Math.PI, t / r);
  const sin = Math.sin(f);
  const cos = Math.cos(f);
  return { x: s / 2 + r * sin, z: -r * cos, nx: sin, nz: -cos };
}

function project(g: Geo, x: number, z: number) {
  const k = g.a + g.b * z;
  return {
    x: g.cx + x * k,
    y: g.ym + TILT * (g.a * z + (g.b * z * z) / 2),
    k,
  };
}

function makeGeo(width: number, n: number): Geo {
  const cardW = clamp(width * 0.22, 165, 220);
  const cardH = Math.round(cardW * 1.28);
  const l = Math.max(1, n) * SPACING * cardW;
  const r = Math.min(CURVE * cardW * 1.25, l / (2 * Math.PI));
  const s = Math.max(40, (l - 2 * Math.PI * r) / 2);
  const kb = width < 640 ? 0.56 : 0.66;

  const g: Geo = {
    width,
    height: 0,
    cardW,
    cardH,
    r,
    s,
    l,
    pitch: l / Math.max(1, n),
    n: Math.max(1, n),
    kb,
    cx: width / 2,
    ym: 0,
    a: (1 + kb) / 2,
    b: (1 - kb) / (2 * r),
    band: cardW * 0.88,
  };

  let top = Infinity;
  let bottom = -Infinity;
  for (let j = 0; j < 80; j++) {
    const p = along(g, (j / 80) * l);
    const q = project(g, p.x, p.z);
    top = Math.min(top, q.y - cardH * q.k * 0.92);
    bottom = Math.max(bottom, q.y + cardH * q.k * 0.28);
  }
  g.ym = Math.ceil(-top) + 34;
  g.height = Math.ceil(bottom - top) + 64;
  return g;
}

function trackPath(g: Geo, offset: number) {
  let d = "";
  const steps = 140;
  for (let j = 0; j < steps; j++) {
    const p = along(g, (j / steps) * g.l);
    const q = project(g, p.x + p.nx * offset, p.z + p.nz * offset);
    d += `${j ? "L" : "M"}${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }
  return `${d}Z`;
}

function pose(g: Geo, offset: number, i: number) {
  const p = along(g, offset - i * g.pitch);
  const q = project(g, p.x, p.z);
  return { x: q.x, y: q.y, k: q.k, depth: (p.z + g.r) / (2 * g.r) };
}

function centerOf(g: Geo, offset: number) {
  return ((Math.round((offset - g.s / 2) / g.pitch) % g.n) + g.n) % g.n;
}

export const CoachConveyorSelect: React.FC<CoachConveyorSelectProps> = ({
  coaches,
  onBookCoach,
}) => {
  const count = coaches.length;
  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const liftRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const shadeRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const sim = React.useRef(makeSim());
  const pointer = React.useRef({
    id: -1,
    index: -1,
    x: 0,
    moved: false,
    start: 0,
    lane: 1,
    lastX: 0,
    lastT: 0,
    v: 0,
  });

  const [stageWidth, setStageWidth] = React.useState(0);
  const [active, setActive] = React.useState<number | null>(0);
  const [paused, setPaused] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [center, setCenter] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);

  const geo = React.useMemo(() => {
    if (!stageWidth || count === 0) return null;
    return makeGeo(stageWidth, count);
  }, [stageWidth, count]);

  const live = React.useRef({
    geo: null as Geo | null,
    active: 0 as number | null,
    paused: false,
    reduced: false,
    open: false,
    count: 0,
    speed: 22,
  });
  live.current = {
    geo,
    active,
    paused,
    reduced,
    open: openIndex !== null,
    count,
    speed: 22,
  };

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  React.useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = Math.round(el.clientWidth);
      setStageWidth((prev) => (prev === w ? prev : w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const paintAll = React.useCallback(() => {
    const L = live.current;
    const g = L.geo;
    const s = sim.current;
    if (!g) return;

    for (let i = 0; i < L.count; i++) {
      const btn = cardRefs.current[i];
      if (!btn) continue;
      const q = pose(g, s.offset, i);
      const e = s.lift[i] ?? 0;

      // Keep upright card anchored near its bottom edge on the stadium belt
      const tx = q.x - g.cardW / 2;
      const ty = q.y - g.cardH * 0.86;
      btn.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${q.k.toFixed(4)})`;

      const z = i === L.active ? 2000 : 100 + Math.round(q.y);
      if (s.z[i] !== z) {
        s.z[i] = z;
        btn.style.zIndex = String(z);
      }

      const lift = liftRefs.current[i];
      if (lift) {
        lift.style.transform = `translateY(${(LIFT_Y * e).toFixed(2)}%) scale(${(1 + LIFT_SCALE * e).toFixed(4)})`;
      }

      const shade = shadeRefs.current[i];
      if (shade) {
        const opacity = BACK_SHADE * clamp(1 - q.depth, 0, 1) * (1 - 0.8 * clamp(e, 0, 1));
        shade.style.opacity = opacity.toFixed(3);
      }
    }

    const c = centerOf(g, s.offset);
    if (c !== s.center) {
      s.center = c;
      setCenter(c);
    }
  }, []);

  const tick = React.useCallback(
    (now: number) => {
      const s = sim.current;
      const L = live.current;
      const g = L.geo;
      s.raf = 0;
      if (!g || !s.visible) {
        s.last = 0;
        return;
      }

      const dt = s.last ? clamp((now - s.last) / 1000, 0, 0.1) : 1 / 60;
      s.last = now;
      const steps = Math.max(1, Math.ceil(dt / 0.017));
      const h = dt / steps;
      const stopped = L.paused || L.open || s.inside;
      const cruise = L.reduced ? 0 : L.speed;

      for (let step = 0; step < steps; step++) {
        if (s.mode === SEEK) {
          const w = 5.4;
          s.v += (w * w * (s.target - s.offset) - 2 * w * s.v) * h;
          s.offset += s.v * h;
          if (Math.abs(s.target - s.offset) < 0.3 && Math.abs(s.v) < 4) {
            s.offset = s.target;
            s.v = 0;
            s.mode = RUN;
          }
        } else if (s.mode === RUN) {
          if (stopped) {
            s.v *= Math.exp(-6.5 * h);
            if (Math.abs(s.v) < 0.05) s.v = 0;
          } else {
            const e = s.v - cruise;
            s.v = cruise + (Math.abs(e) < 0.02 ? 0 : e * Math.exp(-3.2 * h));
          }
          s.offset += s.v * h;
        }

        for (let i = 0; i < L.count; i++) {
          const goal = i === L.active ? 1 : 0;
          if (L.reduced) {
            s.lift[i] = goal;
            s.vlift[i] = 0;
            continue;
          }
          const x = s.lift[i] ?? 0;
          const v = (s.vlift[i] ?? 0) + (300 * (goal - x) - 22 * (s.vlift[i] ?? 0)) * h;
          s.lift[i] = x + v * h;
          s.vlift[i] = v;
        }
      }

      let busy = s.mode !== RUN || s.v !== 0 || (!stopped && cruise > 0);
      for (let i = 0; i < L.count; i++) {
        const goal = i === L.active ? 1 : 0;
        if (
          Math.abs(goal - (s.lift[i] ?? 0)) < 0.002 &&
          Math.abs(s.vlift[i] ?? 0) < 0.02
        ) {
          s.lift[i] = goal;
          s.vlift[i] = 0;
        } else {
          busy = true;
        }
      }

      paintAll();
      if (busy) s.raf = requestAnimationFrame(tick);
      else s.last = 0;
    },
    [paintAll]
  );

  const kick = React.useCallback(() => {
    const s = sim.current;
    if (s.raf || !s.visible) return;
    s.last = 0;
    s.raf = requestAnimationFrame(tick);
  }, [tick]);

  const seekTo = React.useCallback(
    (index: number) => {
      const s = sim.current;
      const g = live.current.geo;
      if (!g) return;
      const base = g.s / 2 + index * g.pitch;
      s.target = base + Math.round((s.offset - base) / g.l) * g.l;
      if (live.current.reduced) {
        s.offset = s.target;
        s.v = 0;
        s.mode = RUN;
        paintAll();
        return;
      }
      s.mode = SEEK;
      kick();
    },
    [kick, paintAll]
  );

  // Scroll-reactive spin: scrolling the page gently spins the character cards around the stadium belt
  React.useEffect(() => {
    const onScroll = () => {
      const s = sim.current;
      const y = window.scrollY;
      const dy = y - s.lastScrollY;
      s.lastScrollY = y;
      if (live.current.reduced || live.current.open || !s.visible || s.mode === DRAG) return;
      s.offset += dy * 0.42;
      s.v = clamp(s.v + dy * 1.4, -280, 280);
      kick();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [kick]);

  React.useLayoutEffect(() => {
    const s = sim.current;
    if (!geo) return;
    if (!s.init) {
      s.init = true;
      s.offset = geo.s / 2;
      s.v = live.current.reduced || live.current.paused ? 0 : live.current.speed;
    } else if (s.l > 0 && s.l !== geo.l) {
      const f = geo.l / s.l;
      s.offset *= f;
      s.target *= f;
    }
    s.l = geo.l;
    s.z = [];
    paintAll();
    kick();
  }, [geo, paintAll, kick]);

  React.useEffect(() => {
    const node = stageRef.current;
    const s = sim.current;
    let inView = true;
    const update = () => {
      const visible = inView && !document.hidden;
      if (visible === s.visible) return;
      s.visible = visible;
      if (visible) kick();
      else if (s.raf) {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
        s.last = 0;
      }
    };
    const io = node
      ? new IntersectionObserver((entries) => {
          inView = entries.some((e) => e.isIntersecting);
          update();
        })
      : null;
    if (node && io) io.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [kick]);

  React.useEffect(() => () => {
    if (sim.current.raf) cancelAnimationFrame(sim.current.raf);
  }, []);

  React.useEffect(() => {
    kick();
  }, [active, paused, openIndex, kick]);

  const go = (index: number) => {
    if (count === 0) return;
    const next = ((index % count) + count) % count;
    setActive(next);
    seekTo(next);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || !geo) return;
    const box = stageRef.current?.getBoundingClientRect();
    const y = e.clientY - (box?.top ?? 0);
    pointer.current = {
      id: e.pointerId,
      index: -1,
      x: e.clientX,
      moved: false,
      start: sim.current.offset,
      lane: y >= geo.ym ? 1 : -1,
      lastX: e.clientX,
      lastT: e.timeStamp,
      v: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointer.current;
    const s = sim.current;
    if (p.id !== e.pointerId || !geo) return;
    const dx = e.clientX - p.x;
    const now = e.timeStamp;
    if (!p.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY)) {
      p.moved = true;
      s.mode = DRAG;
      stageRef.current?.setPointerCapture?.(e.pointerId);
    }
    if (p.moved) {
      const v = (e.clientX - p.lastX) / Math.max(1, now - p.lastT);
      p.v = p.v * 0.6 + v * 0.4;
      p.lastX = e.clientX;
      p.lastT = now;
      const scale = p.lane > 0 ? 1 : 1 / geo.kb;
      s.offset = p.start - p.lane * dx * scale;
      s.v = reduced ? 0 : -p.lane * p.v * 900 * scale;
      kick();
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const p = pointer.current;
    if (p.id !== e.pointerId) return;
    if (stageRef.current?.hasPointerCapture?.(e.pointerId)) {
      stageRef.current.releasePointerCapture(e.pointerId);
    }
    pointer.current.id = -1;
    if (sim.current.mode === DRAG) {
      sim.current.mode = RUN;
      sim.current.v = reduced ? 0 : clamp(sim.current.v, -900, 900);
      kick();
    }
  };

  const paths = React.useMemo(
    () =>
      geo
        ? {
            outer: trackPath(geo, geo.band / 2),
            inner: trackPath(geo, -geo.band / 2),
          }
        : null,
    [geo]
  );

  const selectedCoach = coaches[active ?? center] ?? coaches[0];

  return (
    <div className="space-y-6">
      {/* Arcade Character Select Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {coaches.map((coach, idx) => {
            const isSel = (active ?? center) === idx;
            return (
              <button
                key={coach.id}
                type="button"
                onClick={() => go(idx)}
                className={`min-h-[40px] rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  isSel
                    ? "border-[#D4AF37] bg-[#D4AF37] text-[#050507] font-bold"
                    : "border-white/[0.12] bg-[#0A0C12] text-[#94A3B8] hover:text-[#F6F7F2]"
                }`}
              >
                {coach.slotCode} · {coach.name.split(" ").slice(-1)[0]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous coach"
            onClick={() => go((active ?? center) - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-[#0A0C12] text-[#F6F7F2] hover:border-[#D4AF37]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={paused ? "Resume belt" : "Pause belt"}
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-[#0A0C12] text-[#F6F7F2] hover:border-[#00E599]"
          >
            {paused ? (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            aria-label="Next coach"
            onClick={() => go((active ?? center) + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-[#0A0C12] text-[#F6F7F2] hover:border-[#D4AF37]"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Stadium-Loop Conveyor Stage */}
      <div
        ref={stageRef}
        role="group"
        aria-label="Coach character selection conveyor"
        className="relative w-full touch-pan-y select-none overflow-hidden rounded-3xl border border-white/[0.08] bg-[#050507]"
        style={{ height: geo ? geo.height : 420 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => {
          sim.current.inside = true;
        }}
        onPointerLeave={() => {
          sim.current.inside = false;
          kick();
        }}
      >
        {/* Subtle Street Arena Stadium Track */}
        {geo && paths ? (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            width={geo.width}
            height={geo.height}
            viewBox={`0 0 ${geo.width} ${geo.height}`}
          >
            <path
              d={`${paths.outer}${paths.inner}`}
              fillRule="evenodd"
              fill="rgba(11, 19, 40, 0.55)"
            />
            <path
              d={paths.outer}
              fill="none"
              stroke="rgba(212, 175, 55, 0.35)"
              strokeWidth="1.5"
            />
            <path
              d={paths.inner}
              fill="none"
              stroke="rgba(0, 229, 153, 0.3)"
              strokeWidth="1.25"
            />
          </svg>
        ) : null}

        {/* Floating Character Cards */}
        {geo &&
          coaches.map((coach, i) => {
            const isActive = (active ?? center) === i;
            const ringBorder =
              coach.rankColor === "gold"
                ? "border-[#D4AF37]/75 shadow-[0_14px_40px_rgba(212,175,55,0.22)]"
                : "border-[#00E599]/65 shadow-[0_14px_40px_rgba(0,229,153,0.18)]";

            return (
              <button
                key={coach.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                data-cursor="book"
                aria-label={`${coach.name}, ${coach.role}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  if (pointer.current.moved) return;
                  setActive(i);
                  seekTo(i);
                  setOpenIndex(i);
                }}
                style={{
                  width: geo.cardW,
                  height: geo.cardH,
                }}
                className="group absolute left-0 top-0 cursor-pointer text-left outline-none"
              >
                <span
                  ref={(el) => {
                    liftRefs.current[i] = el;
                  }}
                  className={`relative block h-full w-full overflow-hidden rounded-2xl border bg-[#0A0C12] transition-colors ${
                    isActive
                      ? ringBorder
                      : "border-white/[0.12] hover:border-white/30"
                  }`}
                >
                  <img
                    src={coach.image}
                    alt={coach.imageAlt}
                    draggable={false}
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      isActive ? "grayscale-0 scale-[1.03]" : "grayscale"
                    }`}
                  />

                  {/* Depth Shade for Back Lane */}
                  <span
                    ref={(el) => {
                      shadeRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[#050507]"
                    style={{ opacity: 0 }}
                  />

                  {/* Bottom Scrim + Street Character Card HUD */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-[#050507] via-[#050507]/85 to-transparent p-3.5 pt-12"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold tracking-[0.18em] ${
                          coach.rankColor === "gold"
                            ? "text-[#D4AF37]"
                            : "text-[#00E599]"
                        }`}
                      >
                        {coach.slotCode}
                      </span>
                      {coach.isFounder ? (
                        <span className="bg-gold-grad rounded px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#050507]">
                          FOUNDER
                        </span>
                      ) : null}
                    </span>

                    <span className="mt-1 font-display-rox text-2xl leading-none text-[#F6F7F2]">
                      {coach.name}
                    </span>
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                      {coach.tags[0]}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
      </div>

      {/* Active Fighter Caption Strip */}
      {selectedCoach ? (
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.08] bg-navy-card p-6 sm:flex-row sm:items-center">
          <div className="space-y-1 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-wider text-[#D4AF37]">
              {selectedCoach.slotCode} · {selectedCoach.name} · {selectedCoach.role}
            </p>
            <p className="text-base leading-relaxed text-[#CBD5E1]/90">
              {selectedCoach.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenIndex(active ?? center)}
            className="bg-gold-grad inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050507] hover:brightness-110"
          >
            Inspect Fighter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {/* Character Select Inspect Modal */}
      {openIndex !== null && coaches[openIndex]
        ? createPortal(
            <CoachInspectDialog
              coach={coaches[openIndex]}
              onClose={() => setOpenIndex(null)}
              onBook={() => {
                const c = coaches[openIndex];
                setOpenIndex(null);
                onBookCoach(c);
              }}
            />,
            document.body
          )
        : null}
    </div>
  );
};

function CoachInspectDialog({
  coach,
  onClose,
  onBook,
}: {
  coach: CoachCharacter;
  onClose: () => void;
  onBook: () => void;
}) {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={coach.name}
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      <div className="relative z-10 grid w-full max-w-3xl gap-6 overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0A0C12] p-6 sm:grid-cols-12 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close coach profile"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-[#050507] text-[#F6F7F2] hover:border-[#D4AF37]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="sm:col-span-5 overflow-hidden rounded-2xl border border-white/[0.08]">
          <img
            src={coach.image}
            alt={coach.imageAlt}
            className="h-64 sm:h-full w-full object-cover"
          />
        </div>

        <div className="sm:col-span-7 flex flex-col justify-between space-y-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
              {coach.slotCode} · {coach.role}
            </p>
            <h3 className="mt-1 font-display-rox text-4xl text-[#F6F7F2]">
              {coach.name}
            </h3>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {coach.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/[0.1] bg-[#050507] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#D4AF37]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-3 text-sm sm:text-base leading-relaxed text-[#CBD5E1]/90">
              {coach.bio.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onBook}
            className="bg-gold-grad inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#050507] hover:brightness-110"
          >
            Train With {coach.name.split(" ").slice(-1)[0]}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoachConveyorSelect;
