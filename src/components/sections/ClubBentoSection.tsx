import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BENTO_FACILITY_CARDS } from '@/data/club';
import { TiltedGridHero, type TiltedGridImage } from '@/components/ui/tilted-grid-hero';

function makeFacilityPlateSvg(
  stat: string,
  statLabel: string,
  title: string,
  accentHex: string,
): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#11131B"/>
        <stop offset="60%" stop-color="#090A0F"/>
        <stop offset="100%" stop-color="#050507"/>
      </linearGradient>
      <radialGradient id="glow" cx="80%" cy="20%" r="65%">
        <stop offset="0%" stop-color="${accentHex}" stop-opacity="0.26"/>
        <stop offset="100%" stop-color="${accentHex}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="640" height="360" fill="url(#bg)"/>
    <rect width="640" height="360" fill="url(#glow)"/>
    <rect x="16" y="16" width="608" height="328" rx="14" fill="none" stroke="rgba(148,163,184,0.22)" stroke-width="1.5"/>
    <path d="M16 42V16H42M598 16H624V42M16 318V344H42M598 344H624V318" fill="none" stroke="${accentHex}" stroke-width="2.5"/>
    <text x="44" y="68" fill="#00E599" font-family="monospace" font-size="18" letter-spacing="3">${esc(statLabel)}</text>
    <text x="44" y="195" fill="${accentHex}" font-family="system-ui, sans-serif" font-weight="900" font-size="88" letter-spacing="-2">${esc(stat)}</text>
    <text x="44" y="295" fill="#F6F7F2" font-family="system-ui, sans-serif" font-weight="800" font-size="34" letter-spacing="-0.5">${esc(title.toUpperCase())}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const ClubBentoSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const facilityPlates: TiltedGridImage[] = useMemo(
    () =>
      BENTO_FACILITY_CARDS.map((card, i) => ({
        src: makeFacilityPlateSvg(
          card.stat,
          card.statLabel,
          card.title,
          i % 2 === 0 ? '#D4AF37' : '#00E599',
        ),
        alt: `${card.title}: ${card.description}`,
      })),
    [],
  );

  return (
    <section
      id="r03"
      aria-labelledby="club-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-matrix-dots pointer-events-none absolute inset-0 opacity-35"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 50%, #000 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 40%, transparent 90%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
            THE CLUB
          </p>
          <h2
            id="club-heading"
            className="mt-2 font-display-rox text-5xl sm:text-6xl leading-[0.98] text-[#F6F7F2]"
          >
            5,000 SQ. FT.{' '}
            <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
              built for the ring.
            </span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[#CBD5E1]/85">
            Est. April 10, 2018 by Ex. Capt. Rakesh S. Built for real ring craft.
          </p>
        </motion.div>

        {/* Curved 3D TiltedGridHero Facility Plates */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050507]">
          <TiltedGridHero
            images={facilityPlates}
            speed={4.5}
            tileHeight={68}
            aspectRatio={16 / 9}
            gap={22}
            axis={50}
            curve={28}
            fade={10}
            className="h-[240px] sm:h-[290px] w-full bg-[#050507]"
          />
        </div>

        {/* Clean Architectural Spec List (breaks box-grid monotony) */}
        <div className="mt-12 border-t border-white/[0.08]">
          {BENTO_FACILITY_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              data-cursor="explore"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="grid grid-cols-1 items-baseline gap-3 border-b border-white/[0.08] py-6 sm:grid-cols-12 sm:gap-6 sm:py-7"
            >
              <span className="sm:col-span-3 font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#D4AF37]">
                {card.stat}
              </span>
              <h3 className="sm:col-span-4 font-display-rox text-2xl sm:text-3xl text-[#F6F7F2]">
                {card.title}
              </h3>
              <p className="sm:col-span-5 text-sm sm:text-base leading-relaxed text-[#CBD5E1]/80">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
          Changing rooms · 2-wheeler parking
        </p>
      </div>
    </section>
  );
};
