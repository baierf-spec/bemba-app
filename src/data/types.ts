export type PassportGroup = 'EU' | 'UK' | 'US';

/** free = visa-free, eta = online travel authorisation, evisa = apply online before travel,
 *  voa = visa on arrival (usually also online), embassy = apply at an embassy or consulate,
 *  none = entry or visa issuance currently suspended for this nationality */
export type VisaType = 'free' | 'eta' | 'evisa' | 'voa' | 'embassy' | 'none';

export interface VisaRule {
  type: VisaType;
  fee?: string;   // e.g. "US$50"; omitted when it varies or no reliable figure was found
  stay?: string;  // e.g. "Up to 90 days"
  note?: string;
}

export type Region = 'North Africa' | 'West Africa' | 'Central Africa' | 'East Africa' | 'Southern Africa';

export interface Source { label: string; url: string }

export interface Country {
  slug: string;
  name: string;
  iso2: string;
  region: Region;
  capital: string;
  currency: { code: string; name: string };
  languages: string[];
  airports: { code: string; city: string }[];
  plugs: string[];
  bestTime: string;
  malaria: 'yes' | 'some' | 'no';
  yellowFever: 'all' | 'risk' | 'no'; // certificate required for all arrivals / if arriving from a risk country / not required
  advisory: 'normal' | 'caution' | 'avoid';
  safari?: boolean;
  highlights: string[];
  portal?: string;          // official visa / eVisa portal
  visa: Record<PassportGroup, VisaRule>;
  /** Exceptions for a single passport, keyed by passport slug (e.g. 'lithuania'). */
  overrides?: Record<string, VisaRule>;
  /** Extra country-specific sources, on top of the global ones in data/sources.ts. */
  sources?: Source[];
  /** ISO date when the rules were last checked against the listed sources. */
  checkedAt?: string;
}
