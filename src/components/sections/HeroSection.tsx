import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CLUB } from '@/data/club';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RoundClock } from '@/components/ui/RoundClock';
import { VelocityMarquee } from '@/components/ui/VelocityMarquee';

const HeroRing3D = lazy(() =>
  import('@/components/three/HeroRing3D').then((m) => ({
    default: m.HeroRing3D,
  }))
);

export const HeroSection: React.FC = () => {
  const { openDrawer } = useBookingDrawer();
  const prefersReducedMotion = useReducedMotion();

  const lineVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.65,
            delay: 0.09 * i,
            ease: [0.22, 1, 0.36, 1],
          },
    }),
  };

  return (
    <section id="r01" aria-labelledby="hero-heading" className="relative overflow-hidden -mt-20 pt-20">
      <div className="relative flex min-h-[calc(100svh-1rem)] flex-col justify-between">
        {/* Full-Bleed Realistic 3D Boxing Ring Arena (lazy-loaded so hero headline paints instantly) */}
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,153,0.12)_0%,rgba(5,5,7,0.96)_68%)]"
            />
          }
        >
          <HeroRing3D />
        </Suspense>

        <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <div className="pointer-events-auto flex flex-col items-center">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 rounded-full border border-white/[0.1] bg-[#050507]/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#00E599] backdrop-blur-md"
            >
              HSR EXTENSION &amp; ELECTRONIC CITY · BENGALURU
            </motion.p>

            {/* Centered Heritage Ring Poster H1 — generous line-height & padding so italic descenders never clip */}
            <h1
              id="hero-heading"
              className="font-display-rox text-[clamp(3.1rem,8.5vw,6.75rem)] leading-[1.02] text-[#F6F7F2]"
            >
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                BANGALORE&apos;S FIRST
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block py-1 font-serif italic font-semibold lowercase tracking-normal leading-[1.06] text-[#D4AF37]"
              >
                full-ring
              </motion.span>
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                BOXING GYM
              </motion.span>
            </h1>

            {/* 2-Line Subhead */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-2xl space-y-1.5 text-base sm:text-lg text-[#F6F7F2]/90"
            >
              <p className="font-medium">Beginner friendly. Defense-coach led.</p>
              <p className="text-[#94A3B8]">
                A 5,000 sq. ft. gym with a 20&apos; × 20&apos; ring, where Sweat, Blood &amp; Glory is the culture.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <MagneticButton
                variant="volt"
                cursorMode="book"
                onClick={() => openDrawer({ sourcePage: '/' })}
                className="px-7 py-3.5 text-sm uppercase tracking-wider"
              >
                Book Free Trial
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>

              <Link
                to="/programs"
                data-cursor="explore"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-400/25 bg-[#050507]/70 px-6 py-3 text-sm font-medium text-[#F6F7F2] backdrop-blur-md transition-colors hover:border-[#00E599]/60 hover:text-[#00E599]"
              >
                See programs
              </Link>
            </motion.div>

            {/* Centered Trust Row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-slate-400/15 pt-5 font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
              <a
                href={CLUB.reputation.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F6F7F2] hover:text-[#D4AF37] transition-colors"
              >
                {CLUB.reputation.ratingText} · {CLUB.reputation.reviewCountDisplay} GOOGLE REVIEWS
              </a>
              <span aria-hidden="true" className="text-slate-400/25">
                /
              </span>
              <span>EST. {CLUB.foundedYear}</span>
              <span aria-hidden="true" className="text-slate-400/25">
                /
              </span>
              <span className="text-[#00E599]">{CLUB.facility.affiliationShort}</span>
            </div>
          </div>
        </div>

        {/* Bottom-right decorative round clock */}
        <div className="pointer-events-auto relative z-10 mx-auto flex w-full max-w-7xl justify-end px-4 pb-6 sm:px-6 lg:px-8">
          <RoundClock />
        </div>
      </div>

      <VelocityMarquee />
    </section>
  );
};
