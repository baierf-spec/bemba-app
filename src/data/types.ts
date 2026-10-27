export type PassportGroup = 'EU' | 'UK' | 'US';

/** free = visa-free, eta = online travel authorisation, evisa = apply online before travel,
 *  voa = visa on arrival (often also as eVisa), embassy = apply at an embassy or consulate */
export type VisaType = 'free' | 'eta' | 'evisa' | 'voa' | 'embassy';

export interface VisaRule {
  type: VisaType;
  fee?: string;   // e.g. "US$50"; omitted when it varies or is not confirmed
  stay?: string;  // e.g. "Up to 90 days"
  note?: string;
}

export type Region = 'North Africa' | 'West Africa' | 'Central Africa' | 'East Africa' | 'Southern Africa';

export interface Country {
  slug: string;
  name: string;
  iso2: string;
  region: Region;
  capital: string;
  currency: { code: string; name: string };
  languages: string[];
  airports: { code: string; city: string }[];
  plugs: string[];          // plug types, e.g. ["G"]
  bestTime: string;
  malaria: 'yes' | 'some' | 'no';
  yellowFever: 'all' | 'risk' | 'no'; // certificate required for all arrivals / if arriving from a risk country / not required
  advisory: 'normal' | 'caution' | 'avoid';
  safari?: boolean;         // show safari quote CTA
  highlights: string[];
  portal?: string;          // official visa / eVisa portal
  visa: Record<PassportGroup, VisaRule>;
  /** Set to an ISO date once a person has checked the visa rules against official sources. */
  verifiedAt?: string;
}
