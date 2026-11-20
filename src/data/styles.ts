// TODO: CONFIRM BEFORE LAUNCH
// Intensity levels (cardio, footwork, power), session durations, and gear details below
// are editorial estimates mapped to Rox Boxing Gym's verified programs and coaches.
// Confirm exact durations and gear rules with the club before launch.

export interface TrainingStyle {
  id: 'fundamentals' | 'heavy-bag' | 'sparring' | 'pro-camp';
  label: string;
  headline: string;
  description: string;
  intensities: {
    cardio: number; // TODO: CONFIRM (editorial estimate 1-100)
    footwork: number; // TODO: CONFIRM (editorial estimate 1-100)
    power: number; // TODO: CONFIRM (editorial estimate 1-100)
  };
  duration: string; // TODO: CONFIRM
  gear: string; // TODO: CONFIRM
  recommendedCoaches: string[];
  ctaLabel: string;
  sessionTypeValue: string;
}

export const TRAINING_STYLES: TrainingStyle[] = [
  {
    id: 'fundamentals',
    label: 'Fundamentals',
    headline: 'Stance, Guard & Clean Mechanics',
    description:
      'Built for first-timers. Master balance, defensive guard, and foundational combinations at your own pace.',
    intensities: {
      cardio: 72,
      footwork: 88,
      power: 60,
    },
    duration: '60 min', // TODO: CONFIRM
    gear: 'Athletic wear & clean trainers; wraps & gloves available at our in-house store', // TODO: CONFIRM
    recommendedCoaches: ['Ex. Capt. Rakesh S', 'Roshni'],
    ctaLabel: 'Book Fundamentals Trial',
    sessionTypeValue: 'Beginner',
  },
  {
    id: 'heavy-bag',
    label: 'Heavy Bag HIIT',
    headline: 'High-Output Conditioning & Bag Work',
    description:
      'Channel full-body power into heavy bags, wall pads, and speed balls paired with skipping and bodyweight conditioning.',
    intensities: {
      cardio: 94,
      footwork: 74,
      power: 86,
    },
    duration: '45–60 min', // TODO: CONFIRM
    gear: 'Hand wraps & boxing gloves (available at the in-house store)', // TODO: CONFIRM
    recommendedCoaches: ['Sagar', 'Roshni'],
    ctaLabel: 'Try Heavy Bag Session',
    sessionTypeValue: 'Beginner',
  },
  {
    id: 'sparring',
    label: 'Technical Sparring',
    headline: 'Defense-First Ring Craft',
    description:
      "Step into our 20' × 20' indoor platform ring for controlled counterpunching, distance management, and coach-supervised technical rounds.",
    intensities: {
      cardio: 85,
      footwork: 95,
      power: 78,
    },
    duration: '60–90 min', // TODO: CONFIRM
    gear: 'Wraps, sparring gloves, mouthguard & headgear (confirm coach clearance)', // TODO: CONFIRM
    recommendedCoaches: ['Narendra N', 'Ex. Capt. Rakesh S'],
    ctaLabel: 'Book Technical Assessment',
    sessionTypeValue: 'Advanced',
  },
  {
    id: 'pro-camp',
    label: '1-on-1 Pro Camp',
    headline: 'Dedicated Pad Work & Coaching',
    description:
      'Tailored 1-on-1 coaching to sharpen defense, build stamina, or prepare for amateur bouts.',
    intensities: {
      cardio: 88,
      footwork: 92,
      power: 90,
    },
    duration: '60 min 1-on-1', // TODO: CONFIRM
    gear: 'Personal wraps & gloves recommended (in-house store available)', // TODO: CONFIRM
    recommendedCoaches: ['Ex. Capt. Rakesh S', 'Narendra N'],
    ctaLabel: 'Book 1-on-1 Consultation',
    sessionTypeValue: 'Private Coaching',
  },
];
