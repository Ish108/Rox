import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { CLUB, LOCATIONS } from '@/data/club';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { trackEvent } from '@/lib/analytics';

export const VisitSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<'hsr' | 'ecity'>('hsr');
  const prefersReducedMotion = useReducedMotion();
  const { openDrawer } = useBookingDrawer();

  const activeLocation = LOCATIONS.find((l) => l.id === selectedId) ?? LOCATIONS[0];

  return (
    <section
      id="r06"
      aria-labelledby="visit-heading"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
            VISIT &amp; JOIN
          </p>
          <h2
            id="visit-heading"
            className="mt-2 font-display-rox text-5xl sm:text-6xl leading-[0.94] text-[#F6F7F2]"
          >
            VISIT US{' '}
            <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
              in Bengaluru.
            </span>
          </h2>
        </div>

        {/* Location Switcher */}
        <div
          role="tablist"
          aria-label="Gym locations"
          className="inline-flex rounded-full border border-slate-400/20 bg-navy-card p-1 self-start"
        >
          {LOCATIONS.map((loc) => {
            const active = loc.id === selectedId;
            return (
              <button
                key={loc.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedId(loc.id)}
                className={`relative min-h-[40px] rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  active ? 'text-[#060B18] font-bold' : 'text-[#94A3B8] hover:text-[#F4F5F7]'
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="location-switcher-pill"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 32 }
                    }
                    className="bg-emerald-grad absolute inset-0 rounded-full"
                  />
                ) : null}
                <span className="relative z-10">{loc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Location Details Card */}
      <div className="mt-10 grid grid-cols-1 gap-8 rounded-2xl border border-slate-400/15 bg-navy-card p-6 sm:p-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
              {activeLocation.branchLabel}
            </span>
            <h3 className="mt-1 font-display-rox text-3xl sm:text-4xl text-[#F6F7F2]">
              ROX BOXING GYM · {activeLocation.name.toUpperCase()}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                Address
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#F6F7F2]">
                {activeLocation.address}
              </p>
              {activeLocation.landmark ? (
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Landmark: {activeLocation.landmark}
                </p>
              ) : null}
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                Batch Timings
              </p>
              <div className="space-y-1">
                {activeLocation.timingsDisplay.map((row) => (
                  <p key={row.days} className="font-mono text-sm sm:text-base text-[#F6F7F2]">
                    <span className="text-[#94A3B8]">{row.days}:</span> {row.hours}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <MagneticButton
              variant="volt"
              cursorMode="book"
              onClick={() =>
                openDrawer({
                  location: activeLocation.id === 'hsr' ? 'HSR Extension' : 'Electronic City',
                  sourcePage: '/#r06',
                })
              }
            >
              Book Free Trial Here
            </MagneticButton>

            <a
              href={activeLocation.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/[0.15] px-5 py-2.5 text-sm font-medium text-[#F4F5F7] hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              Get directions
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-slate-400/15 bg-[#060B18]/90 p-6 space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              DIRECT LINE &amp; WHATSAPP
            </p>
            <div className="mt-4 space-y-2.5">
              {CLUB.contact.phonesFormatted.map((phone, idx) => (
                <a
                  key={phone}
                  href={`tel:+91${CLUB.contact.phones[idx]}`}
                  onClick={() => trackEvent('call_click', { phone })}
                  className="flex min-h-[44px] items-center rounded-xl border border-white/[0.08] bg-[#0B1328] px-4 py-2.5 font-mono text-sm sm:text-base text-[#F6F7F2] hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          <a
            href={CLUB.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'visit_section' })}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#00E599]/40 bg-[#00E599]/10 px-5 py-3 text-sm font-semibold text-[#00E599] transition-colors hover:bg-[#00E599]/20"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
