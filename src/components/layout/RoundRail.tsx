import React, { useEffect, useState } from 'react';

const ROUNDS = [
  { id: 'r01', code: 'R01', label: 'The Ring' },
  { id: 'r02', code: 'R02', label: 'Your Corner' },
  { id: 'r03', code: 'R03', label: 'The Club' },
  { id: 'r04', code: 'R04', label: 'Coaches' },
  { id: 'r05', code: 'R05', label: 'Membership' },
  { id: 'r06', code: 'R06', label: 'Visit & Join' },
];

export const RoundRail: React.FC = () => {
  const [activeId, setActiveId] = useState('r01');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsTouchDevice(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const sections = ROUNDS.map((r) => document.getElementById(r.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  if (isTouchDevice) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Home page round navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex"
    >
      {ROUNDS.map((round) => {
        const isActive = activeId === round.id;
        return (
          <button
            key={round.id}
            type="button"
            onClick={() => scrollTo(round.id)}
            aria-label={`Jump to ${round.code}: ${round.label}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-2.5 py-1 text-right focus:outline-none"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-opacity ${
                isActive
                  ? 'opacity-100 text-[#D4AF37]'
                  : 'opacity-0 group-hover:opacity-100 text-[#94A3B8]'
              }`}
            >
              {round.label}
            </span>
            <span
              className={`font-mono text-xs transition-colors ${
                isActive
                  ? 'font-bold text-[#D4AF37]'
                  : 'text-[#94A3B8] group-hover:text-[#F4F5F7]'
              }`}
            >
              {round.code}
            </span>
            <span
              className={`h-px transition-all ${
                isActive ? 'w-6 bg-[#D4AF37]' : 'w-2.5 bg-slate-400/30 group-hover:w-4'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
};
