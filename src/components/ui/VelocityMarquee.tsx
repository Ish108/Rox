import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from 'framer-motion';

type MarqueeWord = {
  text: string;
  style: 'outline' | 'serif' | 'emerald' | 'solid';
  dotColor: string;
};

const MARQUEE_WORDS: MarqueeWord[] = [
  { text: 'ROX BOXING', style: 'outline', dotColor: 'bg-[#00E599]' },
  { text: 'footwork', style: 'serif', dotColor: 'bg-[#94A3B8]/70' },
  { text: 'TIMING', style: 'emerald', dotColor: 'bg-[#D4AF37]' },
  { text: 'POWER', style: 'solid', dotColor: 'bg-[#00E599]' },
  { text: 'ROX BOXING', style: 'outline', dotColor: 'bg-[#00E599]' },
  { text: 'footwork', style: 'serif', dotColor: 'bg-[#94A3B8]/70' },
  { text: 'TIMING', style: 'emerald', dotColor: 'bg-[#D4AF37]' },
  { text: 'POWER', style: 'solid', dotColor: 'bg-[#00E599]' },
];

function renderWord(item: MarqueeWord) {
  if (item.style === 'outline') {
    return (
      <span
        className="font-display-rox text-4xl sm:text-5xl tracking-wider"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1px rgba(246, 247, 242, 0.48)',
        }}
      >
        {item.text}
      </span>
    );
  }
  if (item.style === 'serif') {
    return (
      <span className="font-serif text-4xl sm:text-5xl italic text-[#CBD5E1] tracking-normal">
        {item.text}
      </span>
    );
  }
  if (item.style === 'emerald') {
    return (
      <span className="font-display-rox text-4xl sm:text-5xl tracking-wider text-emerald-grad">
        {item.text}
      </span>
    );
  }
  return (
    <span className="font-display-rox text-4xl sm:text-5xl tracking-wider text-[#F6F7F2]">
      {item.text}
    </span>
  );
}

export const VelocityMarquee: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const directionFactor = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 300,
  });

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;

    const vel = smoothVelocity.get();
    if (vel < -25) {
      directionFactor.current = -1;
    } else if (vel > 25) {
      directionFactor.current = 1;
    }

    const boost = Math.min(Math.abs(vel) / 900, 0.7);
    const moveBy = directionFactor.current * (0.0042 + boost * 0.005) * delta;
    let next = baseX.get() - moveBy;

    if (next <= -50) next += 50;
    if (next > 0) next -= 50;

    baseX.set(next);
  });

  if (prefersReducedMotion) {
    return (
      <div
        aria-label="Rox Boxing training pillars"
        className="border-y border-slate-400/15 bg-[#050507] py-6 overflow-hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4">
          {MARQUEE_WORDS.slice(0, 4).map((item, idx) => (
            <React.Fragment key={idx}>
              {renderWord(item)}
              <span
                aria-hidden="true"
                className={`h-2 w-2 rotate-45 ${item.dotColor}`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Rox Boxing training pillars"
      className="border-y border-slate-400/15 bg-[#050507] py-6 overflow-hidden select-none"
    >
      <motion.div
        className="flex w-max whitespace-nowrap will-change-transform"
        style={{
          x: useMotionValueToPercent(baseX),
        }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {MARQUEE_WORDS.map((item, idx) => (
              <span
                key={`${dup}-${idx}`}
                className="inline-flex items-center gap-8 px-4"
              >
                {renderWord(item)}
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rotate-45 ${item.dotColor}`}
                />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

function useMotionValueToPercent(mv: ReturnType<typeof useMotionValue<number>>) {
  const out = useMotionValue('0%');
  useAnimationFrame(() => {
    out.set(`${mv.get()}%`);
  });
  return out;
}
