import type { Country, VisaRule, VisaType, Source } from '../data/types';
import { globalSources, passportSources } from '../data/sources';
import type { Passport } from '../data/passports';
import { countries } from '../data/countries';
import { passports } from '../data/passports';

export const visaLabel: Record<VisaType, string> = {
  free: 'Visa-free',
  eta: 'Travel authorisation',
  evisa: 'eVisa',
  voa: 'Visa on arrival',
  embassy: 'Embassy visa',
  none: 'Not available',
};

export const visaSub: Record<VisaType, string> = {
  free: 'stamp on entry',
  eta: 'apply online',
  evisa: 'before travel',
  voa: 'or online',
  embassy: 'apply in advance',
  none: 'currently suspended',
};

export const stampClass: Record<VisaType, string> = {
  free: 's-free',
  eta: 's-evisa',
  evisa: 's-evisa',
  voa: 's-evisa',
  embassy: 's-req',
  none: 's-req',
};

export const needsVisa = (t: VisaType) => t !== 'free';

export function rule(country: Country, passport: Passport): VisaRule {
  return country.overrides?.[passport.slug] ?? country.visa[passport.group];
}

export function sourcesFor(country: Country, passport?: Passport): Source[] {
  const list: Source[] = [];
  if (country.portal) list.push({ label: `Official ${country.name} visa portal`, url: country.portal });
  list.push(...(country.sources ?? []));
  if (passport) list.push({ label: passport.advice.name, url: passport.advice.url });
  if (passport && passportSources[passport.slug]) list.push(passportSources[passport.slug]);
  list.push(...globalSources);
  const seen = new Set<string>();
  return list.filter((s) => (seen.has(s.url) ? false : (seen.add(s.url), true)));
}

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** One-sentence answer used in the page's answer box, meta description and FAQ. */
export function shortAnswer(country: Country, passport: Passport): string {
  const r = rule(country, passport);
  const who = `${passport.demonym} citizens`;
  const stay = r.stay ? ` ${r.stay.charAt(0).toLowerCase()}${r.stay.slice(1)}` : '';
  const fee = r.fee ? ` The fee is ${r.fee}.` : '';
  switch (r.type) {
    case 'free':
      return `No. ${who} can visit ${country.name} without a visa for tourism${stay ? `, for${stay}` : ''}.`;
    case 'eta':
      return `${who} do not need a visa for ${country.name}, but must get an online travel authorisation before flying.${fee}`;
    case 'evisa':
      return `Yes. ${who} need a visa for ${country.name} and should apply for an eVisa online before travel.${fee}`;
    case 'voa':
      return `Yes. ${who} need a visa for ${country.name}, which can be bought on arrival or online in advance.${fee}`;
    case 'embassy':
      return `Yes. ${who} need a visa for ${country.name} and must apply at an embassy or consulate before travel.`;
    case 'none':
      return `${who} currently cannot get a tourist visa for ${country.name}: entry or visa issuance has been suspended.`;
  }
}

export function applySteps(country: Country, r: VisaRule): string[] {
  const portal = country.portal ? 'the official portal linked on this page' : 'the official government portal';
  switch (r.type) {
    case 'free':
      return [
        'Check that your passport is valid for at least 6 months after arrival and has a blank page for the entry stamp.',
        'Carry proof of onward travel and your accommodation address, as border officers may ask for them.',
        `Get your entry stamp at passport control${r.stay ? ` (${r.stay.toLowerCase()})` : ''}.`,
      ];
    case 'eta':
      return [
        `Apply on ${portal} at least a few days before you fly.`,
        'Upload a passport photo page scan and a recent photo, then pay the fee by card.',
        'Save the approval email. Airlines check it at boarding.',
      ];
    case 'evisa':
      return [
        `Apply on ${portal}. Use only the government site; look-alike agency sites charge extra.`,
        'Prepare a passport scan, a recent photo, your flight booking and first hotel address.',
        'Allow at least two weeks for approval, then print the eVisa or keep it on your phone.',
      ];
    case 'voa':
      return [
        `To skip the queue, apply online in advance on ${portal} where available.`,
        `Otherwise, buy the visa at the airport on arrival${r.fee ? `; bring ${r.fee} in cash in case card machines are down` : ', ideally with cash in US dollars or euros'}.`,
        'Keep your return ticket and accommodation details ready for the immigration desk.',
      ];
    case 'embassy':
      return [
        'Find the nearest embassy or consulate that covers your country of residence.',
        'Book an appointment and prepare the form, photos, invitation or hotel booking and proof of funds.',
        'Apply at least 4 to 6 weeks before travel. Processing times vary widely.',
      ];
    case 'none':
      return [
        'Do not book non-refundable travel while the suspension is in place.',
        'Check your government\'s travel advice and the embassy of the destination for updates.',
        'If you hold a second nationality, check the rules for that passport.',
      ];
  }
}

export const yellowFeverText: Record<Country['yellowFever'], string> = {
  all: 'A yellow fever vaccination certificate is required for all arriving travellers (usually from 9 months or 1 year of age).',
  risk: 'A yellow fever certificate is required if you arrive from, or have transited through, a country with yellow fever risk.',
  no: 'No yellow fever certificate is required.',
};

export const malariaText: Record<Country['malaria'], string> = {
  yes: 'Malaria is present across most of the country. Ask a travel clinic about antimalarial tablets.',
  some: 'Malaria is present in some regions. Check your route with a travel clinic.',
  no: 'There is little or no malaria risk.',
};

export const advisoryText: Record<Country['advisory'], string | null> = {
  normal: null,
  caution: 'Some regions have security risks. Check your foreign ministry\'s travel advice for the areas you plan to visit.',
  avoid: 'Many governments advise against all or all but essential travel. Check your foreign ministry\'s travel advice before you plan anything.',
};

export function relatedCountries(country: Country, limit = 6): Country[] {
  return countries.filter((c) => c.region === country.region && c.slug !== country.slug).slice(0, limit);
}

export function otherPassports(passport: Passport, limit = 8): Passport[] {
  return passports.filter((p) => p.slug !== passport.slug).slice(0, limit);
}

export const visaPath = (p: Passport, c: Country) => `/visa/${p.slug}/${c.slug}/`;
export const countryPath = (c: Country) => `/countries/${c.slug}/`;

export const isChecked = (c: Country) => Boolean(c.checkedAt);

/** Group passports that share an identical rule for a country, preserving order. */
export function groupedRules(country: Country): { rule: VisaRule; passports: Passport[] }[] {
  const groups: { key: string; rule: VisaRule; passports: Passport[] }[] = [];
  for (const p of passports) {
    const r = rule(country, p);
    const key = JSON.stringify([r.type, r.fee ?? '', r.stay ?? '']);
    const g = groups.find((x) => x.key === key);
    if (g) g.passports.push(p); else groups.push({ key, rule: r, passports: [p] });
  }
  return groups;
}

export const passportName = (p: Passport) => p.country.replace(/^the /, '').replace(/^./, (x) => x.toUpperCase());

export const listTypes = {
  'visa-free': { types: ['free'] as VisaType[], title: (d: string) => `Visa-free African countries for ${d} citizens`, short: 'Visa-free' },
  'evisa': { types: ['evisa', 'eta'] as VisaType[], title: (d: string) => `African countries with an eVisa for ${d} citizens`, short: 'eVisa or online authorisation' },
  'visa-on-arrival': { types: ['voa'] as VisaType[], title: (d: string) => `African countries with visa on arrival for ${d} citizens`, short: 'Visa on arrival' },
} as const;
export type ListSlug = keyof typeof listTypes;
export const listPath = (l: ListSlug, p: Passport) => `/${l}-countries/${p.slug}/`;
