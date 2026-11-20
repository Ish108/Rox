import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RoxFightLabComposition } from '@/components/remotion/RoxFightLabReel';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const FightLabSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { openDrawer } = useBookingDrawer();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '250px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="fight-lab-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-matrix-grid pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 50%, #000 35%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 35%, transparent 90%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
              ROX FIGHT LAB
            </p>

            <h2
              id="fight-lab-heading"
              className="font-display-rox text-5xl sm:text-6xl leading-[0.94] text-[#F6F7F2]"
            >
              FOUR LEVELS.{' '}
              <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
                one standard.
              </span>
            </h2>

            <p className="text-lg sm:text-xl leading-relaxed text-[#CBD5E1]/85">
              Four progressive levels from clean guard to supervised ring rounds.
            </p>

            <div className="pt-2">
              <MagneticButton
                variant="volt"
                cursorMode="book"
                onClick={() => openDrawer({ sourcePage: '/#fight-lab' })}
              >
                Book Free Trial (₹0)
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0C12] shadow-[0_20px_70px_rgba(0,0,0,0.55)]">
              {prefersReducedMotion || !inView ? (
                <div className="flex aspect-video flex-col items-center justify-center p-8 text-center">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
                    4-LEVEL CERTIFIED CURRICULUM
                  </p>
                  <p className="mt-2 font-display-rox text-4xl text-[#F6F7F2]">
                    20&apos; × 20&apos; RING · SWEAT, BLOOD &amp; GLORY
                  </p>
                </div>
              ) : (
                <Player
                  component={RoxFightLabComposition}
                  durationInFrames={270}
                  compositionWidth={960}
                  compositionHeight={540}
                  fps={30}
                  loop
                  autoPlay
                  controls={false}
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    display: 'block',
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
