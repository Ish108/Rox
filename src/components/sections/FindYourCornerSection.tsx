import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRAINING_STYLES } from '@/data/styles';
import { WarpCarousel, type WarpCard } from '@/components/ui/warp-carousel';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useBookingDrawer } from '@/context/BookingContext';

const DARK_GOLD_MESH = [
  '#050507', '#080B14', '#0A1022', '#0D1630', '#080C18', '#050507',
  '#060911', '#091126', '#0D1A38', '#11224A', '#0A142C', '#060911',
  '#070B16', '#0B1830', '#063C30', '#056B4B', '#091E36', '#060B15',
  '#060A14', '#05322A', '#059669', '#00E599', '#0B2B38', '#060A14',
  '#070C18', '#09182E', '#0F3D38', '#9E7817', '#D4AF37', '#080D1A',
  '#05070E', '#081124', '#0B1833', '#7A5B14', '#C59B27', '#060A14',
  '#050507', '#070B16', '#090E1C', '#0A1226', '#070B16', '#050507',
];

const DARK_EMERALD_MESH = [
  '#050507', '#070B14', '#081020', '#09142B', '#060B16', '#050507',
  '#060A14', '#071628', '#053F32', '#055E47', '#08192E', '#060A14',
  '#050F1C', '#054E3B', '#059669', '#10B981', '#063634', '#060A14',
  '#05111E', '#056B4E', '#00E599', '#34D399', '#073C38', '#060A14',
  '#060E1D', '#082433', '#056449', '#059669', '#0B1E38', '#060B16',
  '#050812', '#071426', '#081E30', '#09182E', '#070F20', '#050507',
  '#050507', '#060A14', '#070E1D', '#071022', '#060A14', '#050507',
];

const TRACK_WARP_CARDS: WarpCard[] = [
  {
    title: 'TRACK 01\nFUNDAMENTALS',
    value: '60',
    unit: 'min',
    footer: 'Ex. Capt. Rakesh S · Roshni',
    detail: 'slider',
    labels: ['Guard', 'Footwork'],
    numeral: ['#F3DC86', '#D4AF37'],
    accent: '#D4AF37',
    glow: '#D4AF37',
    mesh: DARK_GOLD_MESH,
  },
  {
    title: 'TRACK 02\nHEAVY BAG HIIT',
    value: '94',
    unit: '%',
    footer: 'Sagar · Roshni',
    detail: 'wave',
    numeral: ['#34D399', '#E8CA64'],
    accent: '#00E599',
    glow: '#00E599',
    mesh: DARK_EMERALD_MESH,
  },
  {
    title: 'TRACK 03\nTECHNICAL SPARRING',
    value: '20',
    unit: 'ft',
    footer: 'Narendra N · Ex. Capt. Rakesh S',
    detail: 'ring',
    numeral: ['#E8CA64', '#00E599'],
    accent: '#D4AF37',
    glow: '#059669',
    mesh: DARK_GOLD_MESH,
  },
  {
    title: 'TRACK 04\n1-ON-1 PRO CAMP',
    value: '1:1',
    footer: 'Ex. Capt. Rakesh S · Narendra N',
    detail: 'cross',
    labels: ['60M', 'PAD', 'RING'],
    numeral: ['#00E599', '#F3DC86'],
    accent: '#00E599',
    glow: '#00E599',
    mesh: DARK_EMERALD_MESH,
  },
];

export const FindYourCornerSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { openDrawer } = useBookingDrawer();

  const activeStyle = TRAINING_STYLES[activeIndex] ?? TRAINING_STYLES[0];

  const stepTrack = (delta: number) => {
    setActiveIndex(
      (prev) => (prev + delta + TRAINING_STYLES.length) % TRAINING_STYLES.length,
    );
  };

  const intensityBars = [
    { label: 'Cardio', value: activeStyle.intensities.cardio },
    { label: 'Footwork', value: activeStyle.intensities.footwork },
    { label: 'Power', value: activeStyle.intensities.power },
  ];

  return (
    <section
      id="r02"
      aria-labelledby="corner-heading"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
            FIND YOUR CORNER
          </p>
          <h2
            id="corner-heading"
            className="mt-2 font-display-rox text-5xl sm:text-6xl leading-[0.94] text-[#F6F7F2]"
          >
            FOUR WAYS{' '}
            <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
              to train.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-lg sm:text-xl leading-relaxed text-[#CBD5E1]/85">
          Defense-coach led from day one. Pick your pace.
        </p>
      </motion.div>

      {/* Track Selector Pills + Prev/Next */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Select a training track"
          className="flex flex-wrap gap-2"
        >
          {TRAINING_STYLES.map((style, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={style.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative min-h-[40px] rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'border-[#00E599] text-[#050507] font-bold'
                    : 'border-white/[0.12] bg-[#0A0C12] text-[#94A3B8] hover:text-[#F6F7F2]'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="track-selector-pill"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 32 }
                    }
                    className="bg-emerald-grad absolute inset-0 rounded-full"
                  />
                ) : null}
                <span className="relative z-10">{style.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => stepTrack(-1)}
            aria-label="Previous training track"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-[#0A0C12] text-[#F6F7F2] hover:border-[#D4AF37]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => stepTrack(1)}
            aria-label="Next training track"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-[#0A0C12] text-[#F6F7F2] hover:border-[#D4AF37]"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Transferred 21st.dev WarpCarousel + Synchronized Training Track Details */}
      <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div
          data-cursor="explore"
          className="lg:col-span-7 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#050507] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        >
          <WarpCarousel
            cards={TRACK_WARP_CARDS}
            index={activeIndex}
            onIndexChange={setActiveIndex}
            autoplay
            interval={4.5}
            step={1}
            background="#050507"
            warp={0.95}
            ariaLabel="Rox Boxing Gym Training Tracks 3D Carousel"
            className="min-h-[420px] sm:min-h-[460px]"
          />
        </div>

        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStyle.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/[0.08] bg-navy-card p-6 sm:p-8 space-y-6"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00E599]">
                  {activeStyle.duration}
                </p>
                <h3 className="mt-1.5 font-display-rox text-4xl text-[#F6F7F2]">
                  {activeStyle.label}
                </h3>
                <p className="mt-1 font-serif italic text-xl text-[#D4AF37]">
                  {activeStyle.headline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]/85">
                  {activeStyle.description}
                </p>
              </div>

              <div className="space-y-3 border-t border-white/[0.08] pt-5">
                {intensityBars.map((bar) => (
                  <div key={bar.label} className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[#F6F7F2]">{bar.label}</span>
                      <span className="text-[#00E599]">{bar.value}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        initial={false}
                        animate={{ width: `${bar.value}%` }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                        }
                        className="h-full rounded-full bg-gradient-to-r from-[#059669] via-[#00E599] to-[#D4AF37]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 border-t border-white/[0.08] pt-4 text-sm text-[#94A3B8]">
                <p>
                  <span className="text-[#F6F7F2] font-medium">Coaches:</span>{' '}
                  {activeStyle.recommendedCoaches.join(' · ')}
                </p>
                <p>
                  <span className="text-[#F6F7F2] font-medium">Gear:</span>{' '}
                  {activeStyle.gear}
                </p>
              </div>

              <MagneticButton
                variant="volt"
                cursorMode="book"
                onClick={() =>
                  openDrawer({
                    sessionType: activeStyle.sessionTypeValue,
                    sourcePage: '/#r02',
                  })
                }
                className="w-full"
              >
                {activeStyle.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
