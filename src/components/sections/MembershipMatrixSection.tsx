import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PRICING_DATA } from '@/data/pricing';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const MembershipMatrixSection: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const prefersReducedMotion = useReducedMotion();
  const { openDrawer } = useBookingDrawer();

  return (
    <section
      id="r05"
      aria-labelledby="membership-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Subtle dotted matrix backdrop inspired by transparent pricing architecture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'radial-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(ellipse at 50% 50%, #000 45%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 50%, #000 45%, transparent 90%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + Animated Switch Toggle */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
              MEMBERSHIP &amp; DROP-IN MATRIX
            </p>
            <h2
              id="membership-heading"
              className="mt-2 font-display-rox text-5xl sm:text-6xl leading-[0.94] text-[#F6F7F2]"
            >
              MEMBERSHIP{' '}
              <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
                in INR.
              </span>
            </h2>
            <p className="mt-3 max-w-lg text-lg sm:text-xl text-[#CBD5E1]/85">
              INR plans. Start with a ₹0 trial session.
            </p>
          </div>

          {/* Animated Switch Control */}
          <div className="flex items-center gap-3.5 rounded-full border border-slate-400/20 bg-navy-card px-4 py-2.5">
            <span
              className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                billing === 'monthly' ? 'text-[#F6F7F2] font-bold' : 'text-[#94A3B8]'
              }`}
            >
              Monthly
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={billing === 'annual'}
              aria-label="Toggle 12-Month billing"
              onClick={() =>
                setBilling((prev) => (prev === 'monthly' ? 'annual' : 'monthly'))
              }
              className="relative flex h-7 w-14 items-center rounded-full border border-slate-400/25 bg-[#050507] p-1 transition-colors"
            >
              <motion.span
                layout
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 500, damping: 32 }
                }
                className={`h-5 w-5 rounded-full shadow-md ${
                  billing === 'annual'
                    ? 'ml-auto bg-[#00E599]'
                    : 'mr-auto bg-[#D4AF37]'
                }`}
              />
            </button>

            <span
              className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                billing === 'annual' ? 'text-[#00E599] font-bold' : 'text-[#94A3B8]'
              }`}
            >
              12-Month
            </span>
          </div>
        </motion.div>

        {/* Elevated 3-Tier Cards */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {PRICING_DATA.tiers.map((tier, idx) => {
            const displayedPrice =
              billing === 'monthly' ? tier.monthlyLabel : tier.annualLabel;

            return (
              <motion.div
                key={tier.id}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 28, scale: tier.featured ? 0.96 : 0.94 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: tier.featured ? -14 : -6 }
                }
                className={`relative flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-shadow duration-300 ${
                  tier.featured
                    ? 'lg:-translate-y-4 border-[#D4AF37]/75 bg-navy-card shadow-[0_24px_70px_rgba(212,175,55,0.16)]'
                    : 'border-slate-400/20 bg-navy-card/85 hover:border-[#00E599]/40'
                }`}
              >
                {/* Popular Corner Ribbon */}
                {tier.badge ? (
                  <div className="bg-gold-grad absolute top-0 right-6 -translate-y-1/2 rounded-full px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#050507] shadow-lg">
                    Popular
                  </div>
                ) : null}

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                    {tier.name}
                  </h3>

                  {/* Animated Price Numeral Flip */}
                  <div className="mt-5 min-h-[56px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${tier.id}-${billing}`}
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, y: 14, filter: 'blur(4px)' }
                        }
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -14, filter: 'blur(4px)' }
                        }
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="font-mono text-2xl sm:text-3xl font-bold text-gold-grad"
                      >
                        {displayedPrice}
                      </motion.p>
                    </AnimatePresence>
                    {tier.sixMonthNote ? (
                      <p className="mt-1.5 font-mono text-xs text-[#00E599]">
                        {tier.sixMonthNote}
                      </p>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#CBD5E1]/85">
                    {tier.description}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-slate-400/15 pt-6">
                    {tier.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-[#F6F7F2]/90"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#00E599]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <MagneticButton
                    variant={tier.featured ? 'volt' : 'outline'}
                    cursorMode="book"
                    onClick={() =>
                      openDrawer({
                        sessionType: tier.sessionTypeValue,
                        sourcePage: '/#r05',
                      })
                    }
                    className="w-full"
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Free Trial Banner + Disclaimer */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-400/15 bg-navy-card p-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-mono text-sm font-bold text-[#00E599]">
              {PRICING_DATA.freeTrial.label}
            </p>
            <p className="mt-1 font-mono text-xs text-[#94A3B8]">
              {PRICING_DATA.disclaimer}
            </p>
          </div>

          <MagneticButton
            variant="volt"
            cursorMode="book"
            onClick={() =>
              openDrawer({ sessionType: 'Free Trial', sourcePage: '/#r05' })
            }
          >
            {PRICING_DATA.freeTrial.ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};
