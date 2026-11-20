import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * 3-rope boxing ring tension divider that draws smoothly across on scroll.
 */
export const RopeDivider: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1.5 py-2">
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-left bg-gradient-to-r from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent"
        />
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-[#00E599]/50 to-transparent"
        />
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-right bg-gradient-to-l from-[#D4AF37]/40 via-slate-400/15 to-transparent"
        />
      </div>
    </div>
  );
};
