import { CLUB, LOCATIONS } from '@/data/club';
import { COACHES } from '@/data/coaches';
import type { FaqItem } from '@/data/faqs';

// TODO: CONFIRM BEFORE LAUNCH
// - Add geo coordinates (latitude/longitude) once verified.
// - Add Offer schema entries for pricing ONLY after pricing.ts is confirmed with the club.
// - Complete Electronic City streetAddress and openingHoursSpecification once published.

export function getOrganizationAndGymSchema() {
  const hsr = LOCATIONS[0];
  const ecity = LOCATIONS[1];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ExerciseGym', 'SportsActivityLocation'],
        '@id': `${CLUB.domain}/#organization`,
        name: CLUB.name,
        alternateName: CLUB.wordmark,
        url: CLUB.domain,
        description: `${CLUB.positioning}. ${CLUB.cultureLine}. 5,000 sq. ft. facility with a 20' x 20' indoor platform ring.`,
        foundingDate: CLUB.foundedDate,
        founder: {
          '@type': 'Person',
          name: CLUB.founder,
        },
        telephone: CLUB.contact.phonesFormatted[0],
        areaServed: {
          '@type': 'City',
          name: 'Bengaluru',
        },
        sameAs: [CLUB.social.instagram, CLUB.social.youtube],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: CLUB.reputation.ratingValue,
          reviewCount: CLUB.reputation.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        subOrganization: [
          {
            '@type': ['ExerciseGym', 'SportsActivityLocation'],
            '@id': `${CLUB.domain}/locations#hsr`,
            name: `${CLUB.name} — ${hsr.name}`,
            url: `${CLUB.domain}/locations`,
            telephone: CLUB.contact.phonesFormatted[0],
            address: {
              '@type': 'PostalAddress',
              streetAddress:
                '86/2, Second Floor, Munireddy Layout, Mangammanapalya, 18th Cross, Bommanahalli',
              addressLocality: hsr.city,
              addressRegion: hsr.state,
              postalCode: hsr.postalCode,
              addressCountry: hsr.country,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '06:00',
                closes: '10:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '17:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '07:00',
                closes: '09:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '18:00',
                closes: '20:00',
              },
            ],
          },
          {
            '@type': ['ExerciseGym', 'SportsActivityLocation'],
            '@id': `${CLUB.domain}/locations#ecity`,
            name: `${CLUB.name} — ${ecity.name}`,
            url: `${CLUB.domain}/locations`,
            telephone: CLUB.contact.phonesFormatted[0],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Electronic City, Bengaluru',
              addressRegion: ecity.state,
              addressCountry: ecity.country,
            },
          },
        ],
      },
    ],
  };
}

export function getFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getCoachesSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': COACHES.map((coach) => ({
      '@type': 'Person',
      name: coach.name,
      jobTitle: coach.role,
      description: coach.summary,
      worksFor: {
        '@type': 'Organization',
        name: CLUB.name,
        url: CLUB.domain,
      },
    })),
  };
}

export function getBreadcrumbSchema(
  crumbs: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${CLUB.domain}${crumb.path}`,
    })),
  };
}
