import React, { Suspense, lazy } from 'react';
import { SeoHead } from '@/components/seo/SeoHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { FAQS } from '@/data/faqs';
import { getFaqSchema, getOrganizationAndGymSchema } from '@/lib/schema';

const FightLabSection = lazy(() =>
  import('@/components/sections/FightLabSection').then((m) => ({
    default: m.FightLabSection,
  }))
);
const FindYourCornerSection = lazy(() =>
  import('@/components/sections/FindYourCornerSection').then((m) => ({
    default: m.FindYourCornerSection,
  }))
);
const ClubBentoSection = lazy(() =>
  import('@/components/sections/ClubBentoSection').then((m) => ({
    default: m.ClubBentoSection,
  }))
);
const CoachRosterSection = lazy(() =>
  import('@/components/sections/CoachRosterSection').then((m) => ({
    default: m.CoachRosterSection,
  }))
);
const MembershipMatrixSection = lazy(() =>
  import('@/components/sections/MembershipMatrixSection').then((m) => ({
    default: m.MembershipMatrixSection,
  }))
);
const VisitSection = lazy(() =>
  import('@/components/sections/VisitSection').then((m) => ({
    default: m.VisitSection,
  }))
);

export const HomePage: React.FC = () => {
  const teaserFaqs = FAQS.filter((f) => f.teaser).slice(0, 4);

  return (
    <>
      <SeoHead
        title="Rox Boxing Gym | Bangalore's First Full-Ring Boxing Gym"
        description="Boxing classes in Bangalore at Rox Boxing Gym (HSR Extension & Electronic City). 5,000 sq. ft. facility, 20x20 ring, defense-coach led. Book a ₹0 free trial."
        path="/"
        schemas={[getOrganizationAndGymSchema(), getFaqSchema(teaserFaqs)]}
      />

      <HeroSection />

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 font-mono text-xs text-[#94A3B8]">
            Loading...
          </div>
        }
      >
        <FightLabSection />
        <FindYourCornerSection />
        <ClubBentoSection />
        <CoachRosterSection />
        <MembershipMatrixSection />
        <VisitSection />
      </Suspense>
    </>
  );
};
