export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  teaser?: boolean;
}

export const FAQS: FaqItem[] = [
  {
    id: 'prior-experience',
    question: 'Do I need prior boxing experience to join Rox Boxing Gym?',
    answer:
      'No prior boxing experience is required. Rox Boxing Gym is beginner friendly and defense-coach led, introducing stance, footwork, and guard safely from day one.',
    teaser: true,
  },
  {
    id: 'free-trial',
    question: 'Do you offer a free trial boxing class in Bengaluru?',
    answer:
      'Yes, newcomers receive a ₹0 free introductory trial session bookable on weekdays or weekends. You can reserve your preferred slot online and confirm instantly via WhatsApp.',
    teaser: true,
  },
  {
    id: 'gear-required',
    question: 'What gear do I need to bring for my first session?',
    answer:
      'You can bring your own boxing gear or purchase everything you need from our in-house equipment store at the gym. For your first trial session, comfortable athletic clothing and water are enough to get started.',
    teaser: true,
  },
  {
    id: 'pricing-inr',
    question: 'What are the membership and drop-in fees in INR?',
    answer:
      'Free trial sessions are ₹0, pay-per-session options range from ₹499–₹999, and individual memberships start from ₹3,500/month (₹10,750 for 6 months; ₹18,750 for 12 months). Please confirm current active fees directly with the club as pricing updates are being finalized.',
    teaser: true,
  },
  {
    id: 'womens-only',
    question: 'Do you have dedicated Women’s Only boxing batches?',
    answer:
      'Yes, Rox Boxing Gym offers a dedicated Women’s Only Boxing program focused on fitness, defense-led technique, and practical self-defense. Reach out via the trial booking form or WhatsApp to pick the best batch window.',
  },
  {
    id: 'juniors-age',
    question: 'What age group is the Juniors boxing program for?',
    answer:
      'Our Juniors program is designed for young athletes aged 8 to 18 years. Coaching emphasizes coordination, discipline, and safe technical fundamentals under experienced supervision.',
  },
  {
    id: 'timings-hsr-ecity',
    question: 'What are the batch timings for HSR Extension and Electronic City?',
    answer:
      'Our HSR Extension flagship runs Mon–Fri from 6:00–10:00 AM and 5:00–10:00 PM IST, and Sat–Sun from 7:00–9:00 AM and 6:00–8:00 PM IST. Electronic City (Rox Boxing Home branch) batch timings and street address are currently shared directly on WhatsApp (+91 82967 44467).', // TODO: CONFIRM Electronic City timings
  },
  {
    id: 'parking',
    question: 'Is two-wheeler parking available at the HSR Extension gym?',
    answer:
      'Yes, dedicated two-wheeler parking is available at our HSR Extension facility. The gym is located on the Second Floor at 86/2, Munireddy Layout, Mangammanapalya, 18th Cross, Bommanahalli.',
  },
  {
    id: 'changing-rooms',
    question: 'Are changing rooms available inside the gym?',
    answer:
      'Yes, changing rooms are available for members inside the 5,000 sq. ft. HSR Extension facility. You can also explore our in-house equipment store and Boxing Reading Library between sessions.',
  },
  {
    id: 'onepass',
    question: 'Can I train at Rox Boxing Gym with OnePass?',
    answer:
      'Yes, OnePass is accepted at Rox Boxing Gym. Book your slot or message us on WhatsApp at +91 82967 44467 to coordinate your first visit.',
  },
];
