import type { APIRoute } from 'astro';
import { countries } from '../data/countries';
import { passports } from '../data/passports';
import { DATA_CHECKED } from '../data/sources';

export const GET: APIRoute = () => {
  const lines = [
    '# Bemba',
    '',
    '> Visa, vaccine and entry requirements for travellers to all 54 African countries, by passport (14 passports: 12 EU, UK, US). Each page lists its sources and the date it was last checked.',
    '',
    `Data last checked: ${DATA_CHECKED}. Rules change often; always confirm on the official portal linked on each page.`,
    '',
    '## Data',
    '- [Full rules in Markdown](https://bemba.com/llms-full.txt): every country, every passport, fees, stays, yellow fever and sources',
    '- [Open JSON dataset](https://bemba.com/data/visa-rules.json): the same data, machine-readable',
    '',
    '## Key pages',
    '- [All countries](https://bemba.com/countries/)',
    '- [Visa rules by passport](https://bemba.com/visa/)',
    '- [Rule changes 2025–2026](https://bemba.com/guides/rule-changes/)',
    '- [Yellow fever certificate requirements](https://bemba.com/health/yellow-fever/)',
    '- [Official visa portals](https://bemba.com/guides/official-visa-portals/)',
    '- [How we check](https://bemba.com/about/)',
    '- [When to go, month by month](https://bemba.com/when-to-go/)',
    '- [Safari costs: official park fees by country](https://bemba.com/costs/)',
    '- [Destination comparisons](https://bemba.com/compare/)',
    '',
    '## Countries',
    ...countries.map((c) => `- [${c.name} entry requirements](https://bemba.com/countries/${c.slug}/)`),
    '',
    '## Passports',
    ...passports.map((p) => `- [Africa visa requirements for ${p.demonym} citizens](https://bemba.com/visa/${p.slug}/)`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
