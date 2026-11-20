import React from 'react';
import { SeoHead } from '@/components/seo/SeoHead';
import { VisitSection } from '@/components/sections/VisitSection';
import { CLUB } from '@/data/club';
import { getBreadcrumbSchema, getOrganizationAndGymSchema } from '@/lib/schema';

export const LocationsPage: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Boxing Gym in HSR Layout & Electronic City | Rox Boxing Gym"
        description="Visit Rox Boxing Gym in HSR Extension (Bommanahalli, Bengaluru 560068) and Electronic City. View verified batch timings, phone numbers, and directions."
        path="/locations"
        schemas={[
          getOrganizationAndGymSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Locations', path: '/locations' },
          ]),
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
          BENGALURU BRANCHES
        </p>
        <h1 className="mt-2 font-display-rox text-6xl sm:text-7xl leading-[0.94] text-[#F6F7F2]">
          BOXING GYM IN{' '}
          <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
            HSR &amp; Electronic City.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#94A3B8]">
          Rox Boxing Gym operates its 5,000 sq. ft. flagship full-ring facility in HSR Extension (Bommanahalli, Bengaluru 560068) and a second Rox Boxing Home branch in Electronic City.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0F1A36] p-6">
            <h2 className="font-display-rox text-2xl text-[#F4F5F7]">
              BOXING GYM IN HSR LAYOUT / BOMMANAHALLI
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
              Our HSR Extension flagship features a 20&apos; × 20&apos; indoor platform boxing ring, Boxing Reading Library, in-house equipment store, changing rooms, and two-wheeler parking.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0F1A36] p-6">
            <h2 className="font-display-rox text-2xl text-[#F4F5F7]">
              BOXING GYM IN ELECTRONIC CITY
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
              Our Electronic City branch (Rox Boxing Home) serves South Bengaluru members—message us on WhatsApp at {CLUB.contact.phonesFormatted[0]} for the exact street address and active batch timings.
            </p>
          </div>
        </div>
      </section>

      <VisitSection />
    </>
  );
};
