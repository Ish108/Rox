import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COACHES } from '@/data/coaches';
import { useBookingDrawer } from '@/context/BookingContext';
import {
  CoachConveyorSelect,
  type CoachCharacter,
} from '@/components/ui/coach-conveyor-select';

const COACH_IMAGES = [
  '/images/boxing-coach.jpg',
  '/images/boxing-sparring.jpg',
  '/images/boxing-heavybag.jpg',
  '/images/boxing-fundamentals.jpg',
];

export const CoachRosterSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { openDrawer } = useBookingDrawer();

  const characters: CoachCharacter[] = useMemo(
    () =>
      COACHES.map((coach, idx) => ({
        ...coach,
        image: COACH_IMAGES[idx % COACH_IMAGES.length],
        slotCode: `P${idx + 1}`,
        rankColor: idx % 2 === 0 ? 'gold' : 'emerald',
      })),
    []
  );

  return (
    <section
      id="r04"
      aria-labelledby="coaches-heading"
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
            COACH ROSTER
          </p>
          <h2
            id="coaches-heading"
            className="mt-2 font-display-rox text-5xl sm:text-6xl leading-[0.94] text-[#F6F7F2]"
          >
            LED BY{' '}
            <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
              defense coaches.
            </span>
          </h2>
        </div>

        <Link
          to="/coaches"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D4AF37] hover:underline"
        >
          View full coach profiles
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </motion.div>

      <div className="mt-10">
        <CoachConveyorSelect
          coaches={characters}
          onBookCoach={() => openDrawer({ sourcePage: '/#r04' })}
        />
      </div>
    </section>
  );
};
