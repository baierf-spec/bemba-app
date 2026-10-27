import type { PassportGroup } from './types';

export interface Passport {
  slug: string;
  country: string;    // "Lithuania"
  demonym: string;    // "Lithuanian"
  group: PassportGroup;
  flag: string;       // ISO 3166-1 alpha-2, used for small labels
  advice: { name: string; url: string }; // government travel advice for this nationality
}

/** Passports we publish pages for. Add more by appending here; every page regenerates. */
export const passports: Passport[] = [
  { slug: 'lithuania', country: 'Lithuania', demonym: 'Lithuanian', group: 'EU', flag: 'LT', advice: { name: 'Ministry of Foreign Affairs of Lithuania (Keliauk saugiai)', url: 'https://keliauk.urm.lt/' } },
  { slug: 'latvia', country: 'Latvia', demonym: 'Latvian', group: 'EU', flag: 'LV', advice: { name: 'Ministry of Foreign Affairs of Latvia', url: 'https://www.mfa.gov.lv/' } },
  { slug: 'estonia', country: 'Estonia', demonym: 'Estonian', group: 'EU', flag: 'EE', advice: { name: 'Estonian Ministry of Foreign Affairs (Reisi targalt)', url: 'https://reisitargalt.vm.ee/' } },
  { slug: 'poland', country: 'Poland', demonym: 'Polish', group: 'EU', flag: 'PL', advice: { name: 'Polish Ministry of Foreign Affairs (travel information)', url: 'https://www.gov.pl/web/dyplomacja/informacje-dla-podrozujacych' } },
  { slug: 'finland', country: 'Finland', demonym: 'Finnish', group: 'EU', flag: 'FI', advice: { name: 'Ministry for Foreign Affairs of Finland (travel advice)', url: 'https://um.fi/matkustustiedotteet' } },
  { slug: 'sweden', country: 'Sweden', demonym: 'Swedish', group: 'EU', flag: 'SE', advice: { name: 'Swedish embassies and consulates abroad', url: 'https://www.swedenabroad.se/' } },
  { slug: 'germany', country: 'Germany', demonym: 'German', group: 'EU', flag: 'DE', advice: { name: 'German Federal Foreign Office (Reise- und Sicherheitshinweise)', url: 'https://www.auswaertiges-amt.de/de/reiseundsicherheit' } },
  { slug: 'netherlands', country: 'the Netherlands', demonym: 'Dutch', group: 'EU', flag: 'NL', advice: { name: 'Netherlands Worldwide (reisadvies)', url: 'https://www.nederlandwereldwijd.nl/reisadvies' } },
  { slug: 'france', country: 'France', demonym: 'French', group: 'EU', flag: 'FR', advice: { name: 'France Diplomatie (conseils aux voyageurs)', url: 'https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/' } },
  { slug: 'spain', country: 'Spain', demonym: 'Spanish', group: 'EU', flag: 'ES', advice: { name: 'Spanish Ministry of Foreign Affairs', url: 'https://www.exteriores.gob.es/' } },
  { slug: 'italy', country: 'Italy', demonym: 'Italian', group: 'EU', flag: 'IT', advice: { name: 'Viaggiare Sicuri (Italian Foreign Ministry)', url: 'https://www.viaggiaresicuri.it/' } },
  { slug: 'ireland', country: 'Ireland', demonym: 'Irish', group: 'EU', flag: 'IE', advice: { name: 'Department of Foreign Affairs of Ireland (travel advice)', url: 'https://www.dfa.ie/travel/' } },
  { slug: 'united-kingdom', country: 'the United Kingdom', demonym: 'British', group: 'UK', flag: 'GB', advice: { name: 'GOV.UK foreign travel advice', url: 'https://www.gov.uk/foreign-travel-advice' } },
  { slug: 'united-states', country: 'the United States', demonym: 'American', group: 'US', flag: 'US', advice: { name: 'US State Department travel advisories', url: 'https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html' } },
];

export const passportBySlug = new Map(passports.map((p) => [p.slug, p]));
