// TODO: CONFIRM BEFORE LAUNCH
// Three conflicting pricing sheets exist on the legacy roxboxing.com site.
// Confirm the active INR rate table with Ex. Capt. Rakesh S before launch.
// Do NOT compute per-month equivalents or discount percentages until confirmed.

export interface PricingTier {
  id: 'drop-in' | 'club-member' | 'all-access';
  name: string;
  badge?: string;
  description: string;
  monthlyLabel?: string;
  annualLabel?: string;
  sixMonthNote?: string;
  staticPriceLabel?: string;
  features: string[];
  ctaLabel: string;
  sessionTypeValue: string;
  featured?: boolean;
}

export const PRICING_DATA = {
  currency: 'INR',
  freeTrial: {
    label: 'Free trial session: ₹0',
    price: '₹0',
    ctaLabel: 'Book Free Trial',
  },
  disclaimer: 'Prices in INR. Confirm current fees with the club.',
  tiers: [
    {
      id: 'drop-in',
      name: 'Drop-In',
      description: 'Pay-per-session access for flexible schedules, heavy bag work, or coach pad sessions.',
      staticPriceLabel: '₹499–₹999',
      monthlyLabel: '₹499–₹999',
      annualLabel: '₹499–₹999',
      features: [
        'Pay-per-session entry (no lock-in)',
        'Access to 5,000 sq. ft. boxing floor',
        'Coach-guided warm-up & drills',
        'Two-wheeler parking & changing rooms',
      ],
      ctaLabel: 'Book Drop-In',
      sessionTypeValue: 'Beginner',
      featured: false,
    },
    {
      id: 'club-member',
      name: 'Club Member',
      badge: 'MOST POPULAR',
      description: 'Full individual membership with our 4-level certified boxing curriculum and scheduled batches.',
      monthlyLabel: 'From ₹3,500 / month',
      annualLabel: '₹18,750 / 12 months',
      sixMonthNote: '6-Month Plan: ₹10,750',
      features: [
        '4-level certified boxing curriculum',
        'Morning & evening batch flexibility',
        "Access to 20' × 20' indoor platform ring",
        'Boxing Reading Library & member events',
      ],
      ctaLabel: 'Start Membership Trial',
      sessionTypeValue: 'Beginner',
      featured: true,
    },
    {
      id: 'all-access',
      name: 'All-Access + Private Coaching',
      description: 'Tailored 1-on-1 coaching, custom corner work, and dedicated ring time with senior coaches.',
      staticPriceLabel: 'Talk to us',
      monthlyLabel: 'Talk to us',
      annualLabel: 'Talk to us',
      features: [
        '1-on-1 pad work & defensive mechanics',
        'Personalized sparring & fight-camp prep',
        'Direct coaching from senior medallists',
        'Custom scheduling with the club',
      ],
      ctaLabel: 'Talk to Us',
      sessionTypeValue: 'Private Coaching',
      featured: false,
    },
  ] as PricingTier[],
} as const;
