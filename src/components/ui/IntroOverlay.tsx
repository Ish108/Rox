import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface IntroOverlayProps {
  visible: boolean;
  onEnter: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({
  visible,
  onEnter,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [visible, onEnter]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Enter Rox Boxing Gym"
          initial={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.04 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={onEnter}
          data-cursor="book"
          className="fixed inset-0 z-[150] flex cursor-pointer flex-col items-center justify-center bg-[#050507] px-6 text-center select-none"
        >
          {/* Ambient Arena Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 46%, rgba(0, 229, 153, 0.08), rgba(212, 175, 55, 0.05) 35%, transparent 65%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Compact Animated 20'x20' Boxing Ring Graphic */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8 flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center"
            >
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full overflow-visible"
                aria-hidden="true"
              >
                {/* Outer Ring Mat */}
                <motion.rect
                  x="24"
                  y="24"
                  width="152"
                  height="152"
                  rx="8"
                  fill="#0A0C12"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                  initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  style={{ transformOrigin: '100px 100px' }}
                />

                {/* 3 Concentric Ring Ropes */}
                <motion.rect
                  x="36"
                  y="36"
                  width="128"
                  height="128"
                  rx="4"
                  fill="none"
                  stroke="#D4AF37"
                  strokeOpacity="0.7"
                  strokeWidth="1.75"
                  initial={prefersReducedMotion ? false : { scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                <motion.rect
                  x="48"
                  y="48"
                  width="104"
                  height="104"
                  rx="3"
                  fill="none"
                  stroke="#00E599"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                  initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                <motion.rect
                  x="60"
                  y="60"
                  width="80"
                  height="80"
                  rx="2"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.25"
                  initial={prefersReducedMotion ? false : { scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: '100px 100px' }}
                />

                {/* 4 Corner Turnbuckle Posts */}
                {[
                  { cx: 36, cy: 36, fill: '#D4AF37' },
                  { cx: 164, cy: 36, fill: '#00E599' },
                  { cx: 164, cy: 164, fill: '#D4AF37' },
                  { cx: 36, cy: 164, fill: '#00E599' },
                ].map((post, i) => (
                  <motion.circle
                    key={i}
                    cx={post.cx}
                    cy={post.cy}
                    r="5"
                    fill={post.fill}
                    initial={prefersReducedMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.35 + i * 0.06, type: 'spring', stiffness: 400 }}
                  />
                ))}
              </svg>

              {/* Center ROX Crest */}
              <img
                src="/rox-logo.png"
                alt="Rox Boxing Gym"
                width={96}
                height={64}
                className="absolute h-12 w-auto object-contain"
              />
            </motion.div>

            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display-rox text-4xl sm:text-5xl tracking-wide text-[#F6F7F2]"
            >
              CLICK TO ENTER{' '}
              <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
                the ring.
              </span>
            </motion.h2>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEnter();
              }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="bg-gold-grad mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full px-7 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#050507] shadow-[0_0_28px_rgba(212,175,55,0.28)] transition-transform hover:scale-[1.03]"
            >
              Enter the Ring
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
