import type { APIRoute } from 'astro';
import { countries } from '../../data/countries';
import { passports } from '../../data/passports';
import { DATA_CHECKED } from '../../data/sources';
import { rule, sourcesFor } from '../../lib/visa';

export const GET: APIRoute = () => {
  const data = {
    name: 'Bemba Africa entry requirements',
    url: 'https://bemba.com/data/visa-rules.json',
    license: 'CC BY 4.0 (attribution: bemba.com)',
    checked: DATA_CHECKED,
    passports: passports.map(({ slug, country, demonym }) => ({ slug, country, demonym })),
    countries: countries.map((c) => ({
      slug: c.slug, name: c.name, iso2: c.iso2, region: c.region, capital: c.capital,
      currency: c.currency.code, airports: c.airports.map((a) => a.code),
      yellowFever: c.yellowFever, malaria: c.malaria, advisory: c.advisory, portal: c.portal ?? null,
      visa: Object.fromEntries(passports.map((p) => [p.slug, rule(c, p)])),
      sources: sourcesFor(c).map((s) => s.url),
      page: `https://bemba.com/countries/${c.slug}/`,
    })),
  };
  return new Response(JSON.stringify(data, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' } });
};
