import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { FAQS } from '@/data/faqs';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MinimalFaqAccordion } from '@/components/ui/MinimalFaqAccordion';
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getOrganizationAndGymSchema,
} from '@/lib/schema';

export const FaqPage: React.FC = () => {
  const { openDrawer } = useBookingDrawer();

  return (
    <>
      <SeoHead
        title="FAQ | Rox Boxing Gym Bengaluru"
        description="Answers on beginner boxing classes, ₹0 free trial, gear, INR pricing, Women's Only batches, Juniors (8–18), parking, and HSR Extension timings."
        path="/faq"
        schemas={[
          getOrganizationAndGymSchema(),
          getFaqSchema(FAQS),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-white/[0.1] bg-[#0A0C12] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
            FAQ
          </span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight">
            <span className="text-[#94A3B8]">Answers before</span>{' '}
            <span className="text-[#F6F7F2]">you ask</span>
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            Everything newcomers, parents, and experienced boxers ask before stepping into Rox Boxing Gym in Bengaluru.
          </p>
        </div>

        <div className="mt-12">
          <MinimalFaqAccordion items={FAQS} defaultOpenFirst />
        </div>

        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#090B10] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display-rox text-2xl text-[#F6F7F2]">
              READY FOR YOUR FREE TRIAL?
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              First introductory session is ₹0. No prior experience required.
            </p>
          </div>
          <MagneticButton
            variant="volt"
            cursorMode="book"
            onClick={() => openDrawer({ sourcePage: '/faq' })}
          >
            Book Free Trial
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
        </div>
      </section>
    </>
  );
};
