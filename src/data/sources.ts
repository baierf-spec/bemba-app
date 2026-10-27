import type { Source } from './types';

/** Date of the last full data check. Update it when you re-check every country. */
export const DATA_CHECKED = '2026-10-27';

/** Sources used for every country. Country-specific ones live in countries.ts. */
export const globalSources: Source[] = [
  { label: 'WHO: Yellow fever vaccination requirements, country list', url: 'https://www.who.int/docs/default-source/documents/emergencies/travel-advice/yellow-fever-country-list-ith-travel.pdf' },
  { label: 'Wikipedia: Visa requirements for German citizens (EU reference)', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_German_citizens' },
  { label: 'Wikipedia: Visa requirements for British citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_British_citizens' },
  { label: 'Wikipedia: Visa requirements for United States citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens' },
];

export const passportSources: Record<string, Source> = {
  lithuania: { label: 'Wikipedia: Visa requirements for Lithuanian citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_Lithuanian_citizens' },
  latvia: { label: 'Wikipedia: Visa requirements for Latvian citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_Latvian_citizens' },
  estonia: { label: 'Wikipedia: Visa requirements for Estonian citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_Estonian_citizens' },
  poland: { label: 'Wikipedia: Visa requirements for Polish citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_Polish_citizens' },
  finland: { label: 'Wikipedia: Visa requirements for Finnish citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_Finnish_citizens' },
  sweden: { label: 'Wikipedia: Visa requirements for Swedish citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_Swedish_citizens' },
  germany: { label: 'Wikipedia: Visa requirements for German citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_German_citizens' },
  'united-kingdom': { label: 'Wikipedia: Visa requirements for British citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_British_citizens' },
  'united-states': { label: 'Wikipedia: Visa requirements for United States citizens', url: 'https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens' },
};
