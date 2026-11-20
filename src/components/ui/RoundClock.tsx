import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const ROUND_SECONDS = 180; // 3:00
const REST_SECONDS = 60; // 1:00
const CYCLE_SECONDS = ROUND_SECONDS + REST_SECONDS;

export const RoundClock: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setElapsed((prev) => (prev + 1) % CYCLE_SECONDS);
    }, 1000);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  const isRest = elapsed >= ROUND_SECONDS;
  const remaining = isRest
    ? CYCLE_SECONDS - elapsed
    : ROUND_SECONDS - elapsed;

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="inline-flex flex-col items-end">
      <span className="sr-only">
        Decorative 3-minute boxing round and 1-minute rest timer
      </span>
      <div
        aria-hidden="true"
        className="flex items-center gap-3 rounded-xl border border-slate-400/15 bg-navy-card px-4 py-2.5 backdrop-blur-md"
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isRest ? 'bg-[#00E599]' : 'bg-[#D4AF37]'
          }`}
        />
        <div className="text-right">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#94A3B8]">
            {isRest ? 'REST · 1:00' : 'ROUND · 3:00'}
          </p>
          <p className="font-mono text-xl font-bold leading-none text-[#F4F5F7] tabular-nums">
            {formatted}
          </p>
        </div>
      </div>
    </div>
  );
};
