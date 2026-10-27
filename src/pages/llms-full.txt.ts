import type { APIRoute } from 'astro';
import { countries } from '../data/countries';
import { passports } from '../data/passports';
import { DATA_CHECKED } from '../data/sources';
import { groupedRules, visaLabel, yellowFeverText, malariaText, sourcesFor, passportName } from '../lib/visa';

export const GET: APIRoute = () => {
  const out: string[] = [
    '# Bemba: entry requirements for all 54 African countries',
    '',
    `Last checked ${DATA_CHECKED}. Source: https://bemba.com. Confirm on official portals before travel.`,
    `Passports covered: ${passports.map(passportName).join(', ')}.`,
    '',
  ];
  for (const c of countries) {
    out.push(`## ${c.name}`, '', `URL: https://bemba.com/countries/${c.slug}/`, `Region: ${c.region}. Capital: ${c.capital}. Currency: ${c.currency.name} (${c.currency.code}). Airports: ${c.airports.map((a) => `${a.city} ${a.code}`).join(', ')}.`, '');
    for (const g of groupedRules(c)) {
      const who = g.passports.length === passports.length ? 'All covered passports' : g.passports.map(passportName).join(', ');
      out.push(`- ${who}: ${visaLabel[g.rule.type]}${g.rule.fee ? `, fee ${g.rule.fee}` : ''}${g.rule.stay ? `, ${g.rule.stay.toLowerCase()}` : ''}.${g.rule.note ? ` ${g.rule.note}` : ''}`);
    }
    out.push('', `Yellow fever: ${yellowFeverText[c.yellowFever]}`, `Malaria: ${malariaText[c.malaria]}`);
    if (c.portal) out.push(`Official portal: ${c.portal}`);
    out.push(`Sources: ${sourcesFor(c).map((s) => s.url).join(' ; ')}`, '');
  }
  return new Response(out.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
