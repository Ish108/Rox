import React from 'react';
import { ShieldCheck, MapPin, Star } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { BookingForm } from '@/components/booking/BookingForm';
import { CLUB, LOCATIONS } from '@/data/club';
import { getBreadcrumbSchema, getOrganizationAndGymSchema } from '@/lib/schema';

export const BookTrialPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Book a Free Boxing Trial (₹0) | Rox Boxing Gym Bengaluru"
        description="Reserve your ₹0 free trial boxing session at Rox Boxing Gym in HSR Extension or Electronic City, Bengaluru. Confirm instantly via WhatsApp."
        path="/book-trial"
        schemas={[
          getOrganizationAndGymSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Book Free Trial', path: '/book-trial' },
          ]),
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
              FREE INTRODUCTORY SESSION · ₹0
            </p>
            <h1 className="font-display-rox text-6xl sm:text-7xl leading-[0.94] text-[#F6F7F2]">
              BOOK YOUR{' '}
              <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
                free trial.
              </span>
            </h1>
            <p className="text-base leading-relaxed text-[#94A3B8]">
              Step onto our 5,000 sq. ft. floor and 20&apos; × 20&apos; indoor platform ring. No prior boxing experience or personal gear is needed to start.
            </p>

            <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#0F1A36] p-6">
              <div className="flex items-start gap-3">
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <p className="text-xs text-[#F4F5F7]">
                  {CLUB.reputation.ratingText} across {CLUB.reputation.reviewCountDisplay}{' '}
                  {CLUB.reputation.source}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00E599]" aria-hidden="true" />
                <p className="text-xs text-[#F4F5F7]">
                  Beginner friendly &amp; defense-coach led · {CLUB.facility.affiliation}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <p className="text-xs text-[#94A3B8]">
                  {LOCATIONS[0].name}: {LOCATIONS[0].address}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0F1A36] p-6 sm:p-8">
            <BookingForm sourcePage="/book-trial" />
          </div>
        </div>
      </section>
    </>
  );
};
