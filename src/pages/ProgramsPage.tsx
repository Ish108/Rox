import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { PROGRAMS } from '@/data/club';
import { useBookingDrawer } from '@/context/BookingContext';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MembershipMatrixSection } from '@/components/sections/MembershipMatrixSection';
import { FindYourCornerSection } from '@/components/sections/FindYourCornerSection';
import { getBreadcrumbSchema, getOrganizationAndGymSchema } from '@/lib/schema';

export const ProgramsPage: React.FC = () => {
  const { openDrawer } = useBookingDrawer();

  return (
    <>
      <SeoHead
        title="Boxing Programs & Pricing | Rox Boxing Gym Bengaluru"
        description="Beginner boxing classes in Bangalore, Women's Only boxing, Juniors (8–18), competitive training, OnePass, and ₹0 free trial at Rox Boxing Gym."
        path="/programs"
        schemas={[
          getOrganizationAndGymSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Programs', path: '/programs' },
          ]),
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
          PROGRAMS &amp; CURRICULUM
        </p>
        <h1 className="mt-2 font-display-rox text-6xl sm:text-7xl leading-[0.94] text-[#F6F7F2]">
          BOXING PROGRAMS{' '}
          <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
            in Bengaluru.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#94A3B8]">
          Rox Boxing Gym teaches a structured 4-level certified boxing curriculum for complete beginners, women, juniors aged 8–18, and competitive boxers in Bengaluru.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program) => (
            <article
              key={program.id}
              data-cursor="explore"
              className="bg-navy-card flex flex-col justify-between rounded-2xl border border-slate-400/15 p-6 sm:p-7"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#00E599]">
                  {program.audience}
                </span>
                <h2 className="mt-2 font-display-rox text-3xl text-[#F4F5F7]">
                  {program.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
                  {program.summary}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
                  {program.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-[#F4F5F7]/90"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <MagneticButton
                  variant="outline"
                  cursorMode="book"
                  onClick={() =>
                    openDrawer({
                      sessionType: program.sessionTypeValue,
                      sourcePage: '/programs',
                    })
                  }
                  className="w-full"
                >
                  Book {program.title}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <MembershipMatrixSection />
      <FindYourCornerSection />
    </>
  );
};
