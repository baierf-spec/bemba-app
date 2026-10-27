import type { PassportGroup } from './types';

export interface Passport {
  slug: string;
  country: string;    // "Lithuania"
  demonym: string;    // "Lithuanian"
  group: PassportGroup;
  flag: string;       // ISO 3166-1 alpha-2, used for small labels
}

/** Passports we publish pages for. Add more by appending here; every page regenerates. */
export const passports: Passport[] = [
  { slug: 'lithuania', country: 'Lithuania', demonym: 'Lithuanian', group: 'EU', flag: 'LT' },
  { slug: 'latvia', country: 'Latvia', demonym: 'Latvian', group: 'EU', flag: 'LV' },
  { slug: 'estonia', country: 'Estonia', demonym: 'Estonian', group: 'EU', flag: 'EE' },
  { slug: 'poland', country: 'Poland', demonym: 'Polish', group: 'EU', flag: 'PL' },
  { slug: 'finland', country: 'Finland', demonym: 'Finnish', group: 'EU', flag: 'FI' },
  { slug: 'sweden', country: 'Sweden', demonym: 'Swedish', group: 'EU', flag: 'SE' },
  { slug: 'germany', country: 'Germany', demonym: 'German', group: 'EU', flag: 'DE' },
  { slug: 'netherlands', country: 'the Netherlands', demonym: 'Dutch', group: 'EU', flag: 'NL' },
  { slug: 'france', country: 'France', demonym: 'French', group: 'EU', flag: 'FR' },
  { slug: 'spain', country: 'Spain', demonym: 'Spanish', group: 'EU', flag: 'ES' },
  { slug: 'italy', country: 'Italy', demonym: 'Italian', group: 'EU', flag: 'IT' },
  { slug: 'ireland', country: 'Ireland', demonym: 'Irish', group: 'EU', flag: 'IE' },
  { slug: 'united-kingdom', country: 'the United Kingdom', demonym: 'British', group: 'UK', flag: 'GB' },
  { slug: 'united-states', country: 'the United States', demonym: 'American', group: 'US', flag: 'US' },
];

export const passportBySlug = new Map(passports.map((p) => [p.slug, p]));
