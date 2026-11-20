import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { COACHES } from '@/data/coaches';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useBookingDrawer } from '@/context/BookingContext';
import {
  getBreadcrumbSchema,
  getCoachesSchema,
  getOrganizationAndGymSchema,
} from '@/lib/schema';

export const CoachesPage: React.FC = () => {
  const { openDrawer } = useBookingDrawer();

  return (
    <>
      <SeoHead
        title="Coaches | Rox Boxing Gym Bengaluru"
        description="Meet Rox Boxing Gym's defense-first coaching team led by founder Ex. Capt. Rakesh S, Senior Coach Narendra N, Sagar, and Roshni."
        path="/coaches"
        schemas={[
          getOrganizationAndGymSchema(),
          getCoachesSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Coaches', path: '/coaches' },
          ]),
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E599]">
          COACHING STAFF
        </p>
        <h1 className="mt-2 font-display-rox text-6xl sm:text-7xl leading-[0.94] text-[#F6F7F2]">
          LED BY{' '}
          <span className="font-serif italic font-semibold lowercase tracking-normal text-[#D4AF37]">
            defense coaches.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#94A3B8]">
          Founded by Ex. Capt. Rakesh S, Rox Boxing Gym is coached by former military and national-level amateur medallists focused on clean defense, footwork, and safety.
        </p>

        <div className="mt-14 space-y-8">
          {COACHES.map((coach, idx) => {
            const coachImages = [
              '/images/boxing-coach.jpg',
              '/images/boxing-sparring.jpg',
              '/images/boxing-heavybag.jpg',
              '/images/boxing-fundamentals.jpg',
            ];
            return (
            <article
              key={coach.id}
              className={`grid grid-cols-1 gap-8 rounded-2xl border p-6 sm:p-8 lg:grid-cols-12 ${
                coach.isFounder
                  ? 'border-[#D4AF37]/55 bg-navy-card'
                  : 'border-slate-400/15 bg-navy-card'
              }`}
            >
              <div className="lg:col-span-4" data-cursor="book">
                <EditorialImage
                  src={coachImages[idx % coachImages.length]}
                  alt={coach.imageAlt}
                  label={coach.name}
                  sublabel={coach.role}
                  grayscaleHover
                  priorityBadge={coach.isFounder ? 'FOUNDER' : undefined}
                  aspectClass="aspect-[4/4]"
                  className="rounded-xl"
                />
              </div>

              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
                    {coach.accentLabel}
                  </span>
                  <h2 className="mt-1 font-display-rox text-4xl text-[#F4F5F7]">
                    {coach.name}
                  </h2>
                  <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                    {coach.role}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {coach.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.08] bg-[#060B18] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#D4AF37]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-sm sm:text-base leading-relaxed text-[#F4F5F7]/85">
                    {coach.bio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <MagneticButton
                    variant={coach.isFounder ? 'volt' : 'outline'}
                    cursorMode="book"
                    onClick={() => openDrawer({ sourcePage: '/coaches' })}
                  >
                    Train with our coaches
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>
    </>
  );
};
