export interface BatchWindow {
  days: 'Mon–Fri' | 'Sat–Sun';
  /** 24h ranges in Asia/Kolkata (minutes from midnight) */
  windows: Array<{ startMin: number; endMin: number; label: string }>;
}

export interface ClubLocation {
  id: 'hsr' | 'ecity';
  name: string;
  branchLabel: string;
  address: string;
  landmark?: string;
  postalCode?: string;
  city: string;
  state: string;
  country: string;
  isAddressConfirmed: boolean;
  isTimingsConfirmed: boolean;
  timingsDisplay: Array<{ days: string; hours: string }>;
  mapsUrl: string;
  batches: BatchWindow[];
  todoNote?: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  audience: string;
  summary: string;
  highlights: string[];
  sessionTypeValue: string;
}

export const CLUB = {
  name: 'Rox Boxing Gym',
  wordmark: 'ROX',
  domain: 'https://roxboxing.com',
  positioning: "Bangalore's First Full-Ring Boxing Gym: Beginner Friendly, Defense-Coach Led",
  cultureLine: 'Sweat, Blood & Glory',
  foundedDate: '2018-04-10',
  foundedYear: '2018',
  founder: 'Ex. Capt. Rakesh S',
  facility: {
    areaSqFt: '5,000',
    ringSize: "20' × 20'",
    ringLabel: '20x20',
    curriculumLevels: '4',
    affiliation: 'Karnataka Amateur Boxing Association',
    affiliationShort: 'KABA AFFILIATED',
    amenities: [
      '20\' × 20\' indoor platform ring',
      '5,000 sq. ft. dedicated boxing floor',
      '4-level certified curriculum',
      'Karnataka Amateur Boxing Association affiliated',
      'Boxing Reading Library',
      'In-house equipment store',
      'Changing rooms',
      '2-wheeler parking',
    ],
  },
  reputation: {
    ratingValue: 4.9,
    ratingText: '4.9/5',
    reviewCount: 280,
    reviewCountDisplay: '280+',
    source: 'Google reviews (Trustindex-verified)',
    // TODO: CONFIRM — replace with direct Google Maps / Trustindex review link
    googleReviewsUrl:
      'https://www.google.com/search?q=Rox+Boxing+Gym+HSR+Extension+Bengaluru+reviews',
  },
  contact: {
    countryCode: '+91',
    phones: ['8296744467', '9845504564', '9686042064'] as const,
    phonesFormatted: ['+91 82967 44467', '+91 98455 04564', '+91 96860 42064'] as const,
    primaryWhatsAppNumber: '918296744467',
    secondaryWhatsAppNumber: '919845504564',
    whatsappUrl: 'https://wa.me/918296744467',
  },
  social: {
    // TODO: CONFIRM — verify official Instagram and YouTube handles before launch
    instagram: 'https://instagram.com/roxboxinggym',
    youtube: 'https://youtube.com/@roxboxinggym',
  },
} as const;

export const LOCATIONS: ClubLocation[] = [
  {
    id: 'hsr',
    name: 'HSR Extension',
    branchLabel: 'Main Flagship',
    address:
      '86/2, Second Floor, Munireddy Layout, Mangammanapalya, 18th Cross, Bommanahalli, Bengaluru 560068',
    landmark: 'Above Grand Super Market, Behind Purva Vantage Apartments',
    postalCode: '560068',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'IN',
    isAddressConfirmed: true,
    isTimingsConfirmed: true,
    timingsDisplay: [
      { days: 'Mon–Fri', hours: '6:00–10:00 AM · 5:00–10:00 PM IST' },
      { days: 'Sat–Sun', hours: '7:00–9:00 AM · 6:00–8:00 PM IST' },
    ],
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Rox+Boxing+Gym+86%2F2+Second+Floor+Munireddy+Layout+Mangammanapalya+18th+Cross+Bommanahalli+Bengaluru+560068',
    batches: [
      {
        days: 'Mon–Fri',
        windows: [
          { startMin: 6 * 60, endMin: 10 * 60, label: '6:00 AM' },
          { startMin: 17 * 60, endMin: 22 * 60, label: '5:00 PM' },
        ],
      },
      {
        days: 'Sat–Sun',
        windows: [
          { startMin: 7 * 60, endMin: 9 * 60, label: '7:00 AM' },
          { startMin: 18 * 60, endMin: 20 * 60, label: '6:00 PM' },
        ],
      },
    ],
  },
  {
    id: 'ecity',
    name: 'Electronic City',
    branchLabel: 'Rox Boxing Home Branch',
    // TODO: CONFIRM — Electronic City street address not published on roxboxing.com
    address: 'Full address shared on WhatsApp',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'IN',
    isAddressConfirmed: false,
    isTimingsConfirmed: false,
    // TODO: CONFIRM — Electronic City batch timings not published
    timingsDisplay: [
      { days: 'Schedule', hours: 'Confirm current batch timings on WhatsApp' },
    ],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rox+Boxing+Gym+Electronic+City+Bengaluru',
    batches: [],
    todoNote: 'TODO: CONFIRM Electronic City street address and batch timings.',
  },
];

export const BENTO_FACILITY_CARDS = [
  {
    id: 'ring',
    title: 'The Ring',
    stat: "20'×20'",
    statLabel: 'INDOOR PLATFORM',
    description:
      "A full 20' × 20' indoor platform boxing ring built for real footwork, ring craft, and coached sparring.",
    span: 'md:col-span-2',
  },
  {
    id: 'floor',
    title: '5,000 Sq. Ft. Floor',
    stat: '5,000',
    statLabel: 'SQ. FT. SPACE',
    description:
      'Dedicated boxing training floor with heavy bags, wall pads, speed balls, and conditioning lanes.',
    span: 'md:col-span-1',
  },
  {
    id: 'curriculum',
    title: '4-Level Certified Curriculum',
    stat: '4',
    statLabel: 'CERTIFIED LEVELS',
    description:
      'Structured progression from stance and guard fundamentals to technical counterpunching and sparring.',
    span: 'md:col-span-1',
  },
  {
    id: 'kaba',
    title: 'KABA Affiliated',
    stat: '2018',
    statLabel: 'EST. APRIL 10',
    description:
      'Affiliated with the Karnataka Amateur Boxing Association, upholding disciplined amateur and competitive standards.',
    span: 'md:col-span-2',
  },
  {
    id: 'library',
    title: 'Boxing Reading Library',
    stat: 'READ',
    statLabel: 'IN-HOUSE ARCHIVE',
    description:
      'Curated boxing reading library inside the club for students studying ring strategy, history, and mindset.',
    span: 'md:col-span-1',
  },
  {
    id: 'store',
    title: 'In-House Equipment Store',
    stat: 'GEAR',
    statLabel: 'PRO RETAIL',
    description:
      'Hand wraps, gloves, and boxing essentials available directly at the gym so newcomers can gear up on site.',
    span: 'md:col-span-2',
  },
] as const;

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'beginner-fitness',
    title: 'Beginner & Fitness Boxing',
    audience: 'Complete Beginners · Adults',
    summary:
      'Defense-coach led fundamentals combining real boxing mechanics, bag work, conditioning, and practical self-defense. No prior boxing experience is required.',
    highlights: [
      '4-level certified curriculum',
      'Mirror, bag, pad, and footwork drills',
      'Full-body cardiovascular conditioning',
    ],
    sessionTypeValue: 'Beginner',
  },
  {
    id: 'womens-only',
    title: "Women's Only Boxing",
    audience: 'Women · All Skill Levels',
    summary:
      'A dedicated Women’s Only boxing track focused on technique, functional self-defense, strength, and confident ring movement.',
    highlights: [
      'Dedicated women-only training track',
      'Coach-led defense & pad work',
      'Supportive, beginner-friendly pace',
    ],
    sessionTypeValue: "Women's Only",
  },
  {
    id: 'juniors',
    title: 'Juniors Program',
    audience: 'Ages 8–18',
    summary:
      'Structured youth boxing coaching for ages 8–18, building discipline, coordination, reflexes, and safe technical fundamentals.',
    highlights: [
      'Age-appropriate technical progression',
      'Coordination, balance & discipline',
      'Defense-first coaching supervision',
    ],
    sessionTypeValue: 'Juniors',
  },
  {
    id: 'competitive',
    title: 'Competitive & Advanced Training',
    audience: 'Experienced & Amateur Boxers',
    summary:
      'High-discipline ring craft, counterpunching, technical sparring, and conditioning aligned with our KABA-affiliated coaching standards.',
    highlights: [
      "20' × 20' indoor platform ring work",
      'Technical & open sparring',
      'Coached by National & State medallists',
    ],
    sessionTypeValue: 'Advanced',
  },
  {
    id: 'onepass',
    title: 'OnePass',
    audience: 'OnePass Members',
    summary:
      'Train at Rox Boxing Gym using your OnePass membership for structured boxing and conditioning sessions at our HSR Extension flagship.',
    highlights: [
      'Accepted at HSR Extension',
      'Access to full-floor boxing sessions',
      'Coach-supervised training blocks',
    ],
    sessionTypeValue: 'Free Trial',
  },
  {
    id: 'free-trial',
    title: 'Free Trial Session',
    audience: 'First-Time Visitors · ₹0',
    summary:
      'Experience Bangalore’s first full-ring boxing gym firsthand with a complimentary introductory session before choosing a membership.',
    highlights: [
      '₹0 introductory session',
      'Bookable on weekdays or weekends',
      'No prior experience or gear needed to start',
    ],
    sessionTypeValue: 'Free Trial',
  },
];

export const TIME_SLOTS = {
  Weekday: [
    '6:00 AM – 7:00 AM',
    '7:00 AM – 8:00 AM',
    '8:00 AM – 9:00 AM',
    '9:00 AM – 10:00 AM',
    '5:00 PM – 6:00 PM',
    '6:00 PM – 7:00 PM',
    '7:00 PM – 8:00 PM',
    '8:00 PM – 9:00 PM',
    '9:00 PM – 10:00 PM',
  ],
  Weekend: [
    '7:00 AM – 8:00 AM',
    '8:00 AM – 9:00 AM',
    '6:00 PM – 7:00 PM',
    '7:00 PM – 8:00 PM',
  ],
} as const;
