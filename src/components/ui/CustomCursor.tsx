import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

type CursorBadge = '' | 'EXPLORE' | 'BOOK';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [badge, setBadge] = useState<CursorBadge>('');
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);
  const smoothX = useSpring(mouseX, { stiffness: 750, damping: 42, mass: 0.25 });
  const smoothY = useSpring(mouseY, { stiffness: 750, damping: 42, mass: 0.25 });

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => {
      const active = mq.matches;
      setEnabled(active);
      document.body.classList.toggle('has-custom-cursor', active);
    };

    updateEnabled();
    mq.addEventListener('change', updateEnabled);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        'a, button, [role="button"], [role="tab"], input, select, textarea, label, [data-cursor]'
      );
      setIsHovering(Boolean(interactive));

      const cursorEl = target?.closest<HTMLElement>('[data-cursor]');
      const mode = cursorEl?.dataset.cursor;
      if (mode === 'explore') {
        setBadge('EXPLORE');
      } else if (mode === 'book') {
        setBadge('BOOK');
      } else {
        setBadge('');
      }

      const busyTarget = target?.closest<HTMLElement>(
        '[aria-busy="true"], [data-loading="true"]'
      );
      setIsLoading(
        Boolean(busyTarget) || document.body.dataset.cursorLoading === 'true'
      );
    };

    const handleDown = (e: PointerEvent) => {
      setIsPressed(true);
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 480);
    };

    const handleUp = () => setIsPressed(false);
    const handleLeave = () => {
      setVisible(false);
      setIsPressed(false);
    };

    // Observe body dataset.cursorLoading changes during async submits
    const bodyObserver = new MutationObserver(() => {
      setIsLoading(document.body.dataset.cursorLoading === 'true');
    });
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-cursor-loading'],
    });

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      mq.removeEventListener('change', updateEnabled);
      bodyObserver.disconnect();
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <>
      {/* Click Ripple Rings (centered on click hotspot) */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            aria-hidden="true"
            initial={{ opacity: 0.9, scale: 0.2 }}
            animate={{ opacity: 0, scale: 1.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            className="pointer-events-none fixed z-[119] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="h-9 w-9 rounded-full border-2 border-[#00E599] shadow-[0_0_12px_rgba(0,229,153,0.6)]" />
            <div className="absolute inset-1.5 rounded-full border border-[#D4AF37]/80" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main ROX Glove Cursor */}
      {visible ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[120]"
          style={{ x: smoothX, y: smoothY }}
        >
          {/* Offset so the index fingertip sits directly on the pointer hotspot */}
          <motion.div
            animate={{
              scale: isPressed ? 0.88 : isHovering ? 1.07 : 1,
              rotate: isPressed ? -6 : isHovering ? -2 : 0,
            }}
            transition={{ type: 'spring', stiffness: 520, damping: 28 }}
            className="relative -translate-x-[8px] -translate-y-[6px] select-none"
          >
            {/* Loading State: Segmented Rotating Emerald Ring */}
            {isLoading ? (
              <motion.svg
                viewBox="0 0 64 64"
                className="absolute -inset-3 h-[68px] w-[62px]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#00E599"
                  strokeWidth="3.5"
                  strokeDasharray="10 6"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </motion.svg>
            ) : null}

            {/* Hover State: 3 Emerald/Volt Burst Rays at Fingertip */}
            <AnimatePresence>
              {isHovering && !isLoading ? (
                <motion.svg
                  viewBox="0 0 36 28"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.14 }}
                  className="absolute -top-4 -left-3 h-7 w-9"
                >
                  <polygon points="4,18 0,10 8,14" fill="#00E599" />
                  <polygon points="12,11 11,1 17,9" fill="#D4AF37" />
                  <polygon points="22,12 27,4 26,14" fill="#00E599" />
                </motion.svg>
              ) : null}
            </AnimatePresence>

            {/* ROX Boxing Glove Sprite */}
            <img
              src="/cursors/rox-glove.png"
              alt=""
              width={38}
              height={57}
              draggable={false}
              className="h-[57px] w-[38px] object-contain"
              style={{
                filter: isHovering
                  ? 'drop-shadow(0 0 10px rgba(0, 229, 153, 0.55))'
                  : 'drop-shadow(0 0 6px rgba(0, 229, 153, 0.28))',
              }}
            />

            {/* Contextual Pill Badge for EXPLORE / BOOK (Antique Gold gradient) */}
            <AnimatePresence>
              {badge ? (
                <motion.span
                  initial={{ opacity: 0, x: -4, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -4, scale: 0.9 }}
                  transition={{ duration: 0.14 }}
                  className="bg-gold-grad absolute left-9 top-6 rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] text-[#060B18] shadow-md"
                >
                  {badge}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
};
