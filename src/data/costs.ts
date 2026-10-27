import type { Source } from './types';
import type { Scene } from './scenes';

/*
 * Official fees (park entry, permits, levies) for safari countries.
 * Figures are what the parks and authorities charge foreign non-resident adults.
 * Checked 2026-10-27 against the sources listed per country. Lodging and tour prices
 * are deliberately excluded: they vary too much to state as facts.
 */

export interface Fee {
  item: string;
  amount: number;          // numeric value in `currency`
  currency: 'USD' | 'ZAR' | 'NAD' | 'BWP';
  unit: string;            // "per person per day", "per vehicle", "one-time"
  note?: string;
}

export interface ExampleLine { label: string; fee: number; qty: number; divide?: number }

export interface CostCountry {
  slug: string;            // matches countries.ts slug
  scene: Scene;
  intro: string;
  fees: Fee[];
  example: { title: string; currency: Fee['currency']; lines: ExampleLine[]; assumptions: string };
  sources: Source[];
}

export const usdRate: Record<Fee['currency'], number> = { USD: 1, ZAR: 1 / 16.58, NAD: 1 / 16.58, BWP: 1 / 13.5 };

export const costs: CostCountry[] = [
  {
    slug: 'tanzania', scene: 'mountain',
    intro: 'Tanzania charges some of the highest park fees in Africa, per person per 24 hours, so the number of park days drives the total more than anything else.',
    fees: [
      { item: 'Serengeti National Park', amount: 82.6, currency: 'USD', unit: 'per person per 24 h', note: 'Includes 18% VAT.' },
      { item: 'Ngorongoro Conservation Area', amount: 70.8, currency: 'USD', unit: 'per person per 24 h' },
      { item: 'Ngorongoro Crater descent', amount: 295, currency: 'USD', unit: 'per vehicle, per descent' },
      { item: 'Tarangire or Lake Manyara', amount: 59, currency: 'USD', unit: 'per person per day, peak season' },
      { item: 'Kilimanjaro conservation fee', amount: 70, currency: 'USD', unit: 'per person per day' },
      { item: 'Kilimanjaro camping fee', amount: 50, currency: 'USD', unit: 'per person per night', note: 'Marangu huts US$60.' },
      { item: 'Kilimanjaro rescue fee', amount: 20, currency: 'USD', unit: 'one-time' },
      { item: 'Tourist visa', amount: 50, currency: 'USD', unit: 'one-time', note: 'US citizens US$100.' },
    ],
    example: {
      title: '6-day northern circuit', currency: 'USD',
      lines: [
        { label: 'Visa (EU / UK)', fee: 50, qty: 1 },
        { label: 'Tarangire, 1 day', fee: 59, qty: 1 },
        { label: 'Serengeti, 3 days', fee: 82.6, qty: 3 },
        { label: 'Ngorongoro area, 1 day', fee: 70.8, qty: 1 },
        { label: 'Crater descent, vehicle shared by 4', fee: 295, qty: 1, divide: 4 },
      ],
      assumptions: 'Per adult. Excludes lodging, vehicle hire, guide, flights and tips.',
    },
    sources: [{ label: 'SafariFind: Tanzania national park fees 2026', url: 'https://safarifind.com/blog/tanzania-national-park-fees-availability-2026' }],
  },
  {
    slug: 'kenya', scene: 'savanna',
    intro: 'The Masai Mara doubles its fee in high season, when the migration arrives. Kenya Wildlife Service parks charge a flat daily fee.',
    fees: [
      { item: 'Masai Mara, high season', amount: 200, currency: 'USD', unit: 'per person per day', note: 'Roughly July to October, sometimes late December.' },
      { item: 'Masai Mara, low season', amount: 100, currency: 'USD', unit: 'per person per day', note: 'Roughly January to June.' },
      { item: 'Amboseli National Park', amount: 90, currency: 'USD', unit: 'per person per day' },
      { item: 'Lake Nakuru National Park', amount: 90, currency: 'USD', unit: 'per person per day' },
      { item: 'Tsavo East or West', amount: 80, currency: 'USD', unit: 'per person per day' },
      { item: 'Nairobi National Park', amount: 80, currency: 'USD', unit: 'per person per day' },
      { item: 'Electronic Travel Authorisation', amount: 32.5, currency: 'USD', unit: 'one-time' },
    ],
    example: {
      title: '5-day Mara and Amboseli in August', currency: 'USD',
      lines: [
        { label: 'eTA', fee: 32.5, qty: 1 },
        { label: 'Masai Mara, 3 days high season', fee: 200, qty: 3 },
        { label: 'Amboseli, 2 days', fee: 90, qty: 2 },
      ],
      assumptions: 'Per adult. Mara conservancies charge their own fees on top. Excludes lodging, transport and guide.',
    },
    sources: [{ label: 'Chags Photography: Kenya park and conservancy fees 2025/26', url: 'https://chagsphotography.com/blog/kenya-park-fees-conservancy-fees' }],
  },
  {
    slug: 'rwanda', scene: 'forest',
    intro: 'The gorilla permit is the trip. At US$1,500 it is the largest single fee on any African itinerary.',
    fees: [
      { item: 'Gorilla trekking permit, Volcanoes National Park', amount: 1500, currency: 'USD', unit: 'per person, one trek' },
      { item: 'Visa on arrival (EU, US)', amount: 50, currency: 'USD', unit: 'one-time', note: 'Free for UK and French citizens.' },
    ],
    example: {
      title: '3-day gorilla trip', currency: 'USD',
      lines: [
        { label: 'Visa (EU)', fee: 50, qty: 1 },
        { label: 'Gorilla permit, 1 trek', fee: 1500, qty: 1 },
      ],
      assumptions: 'Per adult. Excludes lodging, driver and transfers from Kigali.',
    },
    sources: [{ label: 'Duma Explorer: Gorilla trek cost 2026', url: 'https://www.dumaexplorer.com/blog/gorilla-trek-cost-uganda-rwanda-permits-prices' }],
  },
  {
    slug: 'uganda', scene: 'forest',
    intro: 'Uganda is the cheaper gorilla country, but the permit rises by a quarter from 1 January 2027, based on the trekking date.',
    fees: [
      { item: 'Gorilla trekking permit, treks in 2026', amount: 800, currency: 'USD', unit: 'per person, one trek' },
      { item: 'Gorilla trekking permit, treks from 1 January 2027', amount: 1000, currency: 'USD', unit: 'per person, one trek', note: 'Applies by trek date, not purchase date.' },
      { item: 'Tourist eVisa', amount: 50, currency: 'USD', unit: 'one-time' },
      { item: 'East Africa Tourist Visa (Uganda, Kenya, Rwanda)', amount: 100, currency: 'USD', unit: 'one-time, 90 days' },
    ],
    example: {
      title: '4-day Bwindi gorilla trip in 2027', currency: 'USD',
      lines: [
        { label: 'eVisa', fee: 50, qty: 1 },
        { label: 'Gorilla permit, 1 trek', fee: 1000, qty: 1 },
      ],
      assumptions: 'Per adult. Excludes lodging, driver and domestic flights.',
    },
    sources: [
      { label: '4x4 Uganda: Gorilla permit to cost $1,000 from 1 January 2027', url: 'https://www.4x4uganda.com/gorilla-tourism/gorilla-permit-to-cost-1000-effective-1st-january-2027.html' },
      { label: 'VisaVerge: Uganda visa guide 2026', url: 'https://www.visaverge.com/questions/ultimate-guide-how-to-get-a-visa-for-uganda/' },
    ],
  },
  {
    slug: 'botswana', scene: 'delta',
    intro: 'Botswana park fees are modest; the cost is in the remote lodges and light aircraft. Fees are charged per calendar day, including arrival and departure days.',
    fees: [
      { item: 'Chobe or Moremi', amount: 270, currency: 'BWP', unit: 'per person per day' },
      { item: 'Makgadikgadi, Nxai Pan, Central Kalahari', amount: 500, currency: 'BWP', unit: 'per person per day' },
      { item: 'Foreign vehicle under 3,500 kg', amount: 115, currency: 'BWP', unit: 'per vehicle per day' },
    ],
    example: {
      title: '4 days self-drive in Moremi and Chobe', currency: 'BWP',
      lines: [
        { label: 'Moremi and Chobe, 4 days', fee: 270, qty: 4 },
        { label: 'Vehicle, 4 days, shared by 2', fee: 115, qty: 4, divide: 2 },
      ],
      assumptions: 'Per adult. Campsites are booked and paid separately. Visa-free for EU, UK and US.',
    },
    sources: [{ label: 'SafariFind: Botswana national park fees 2026', url: 'https://safarifind.com/blog/botswana-national-park-fees-availability-2026' }],
  },
  {
    slug: 'namibia', scene: 'desert',
    intro: 'Namibia almost doubled its premium park fees in 2026 but remains cheap by safari standards. The visa is now the bigger fixed cost.',
    fees: [
      { item: 'Etosha, Namib-Naukluft (Sossusvlei), Skeleton Coast', amount: 280, currency: 'NAD', unit: 'per person per day', note: 'Entrance N$140 plus conservation N$140.' },
      { item: 'Vehicle, 2 to 10 seats', amount: 50, currency: 'NAD', unit: 'per vehicle per day' },
      { item: 'Visa on arrival', amount: 1600, currency: 'NAD', unit: 'one-time' },
    ],
    example: {
      title: '10-day self-drive, 3 days Etosha and 2 days Sossusvlei', currency: 'NAD',
      lines: [
        { label: 'Visa on arrival', fee: 1600, qty: 1 },
        { label: 'Premium parks, 5 days', fee: 280, qty: 5 },
        { label: 'Vehicle, 5 days, shared by 2', fee: 50, qty: 5, divide: 2 },
      ],
      assumptions: 'Per adult. Excludes car hire, fuel and campsites.',
    },
    sources: [
      { label: 'SafariFind: Namibia national park fees 2026', url: 'https://safarifind.com/blog/namibia-national-park-fees-availability-2026' },
      { label: 'CIBTvisas: Namibia online visa', url: 'https://cibtvisas.com/blog/nambia-new-online-visa-application' },
    ],
  },
  {
    slug: 'south-africa', scene: 'beach',
    intro: 'SANParks raised international conservation fees by about 15% on 1 November 2026. South Africa is visa-free for EU, UK and US citizens.',
    fees: [
      { item: 'Kruger National Park, from 1 Nov 2026', amount: 692, currency: 'ZAR', unit: 'per person per day', note: 'R602 before 1 November 2026.' },
      { item: 'Cape of Good Hope and Cape Point, from 1 Nov 2026', amount: 592, currency: 'ZAR', unit: 'per person per day', note: 'R515 before 1 November 2026.' },
    ],
    example: {
      title: '4 days in Kruger and a day at Cape Point', currency: 'ZAR',
      lines: [
        { label: 'Kruger, 4 days', fee: 692, qty: 4 },
        { label: 'Cape Point, 1 day', fee: 592, qty: 1 },
      ],
      assumptions: 'Per adult, international rate. Excludes accommodation, car hire and game drives.',
    },
    sources: [{ label: 'Rio Times: Kruger and Cape Point fees from 1 November 2026', url: 'https://www.riotimesonline.com/kruger-cape-point-park-fees-1-november-2026/' }],
  },
  {
    slug: 'zambia', scene: 'falls',
    intro: 'Zambia is visa-free for EU, UK and US citizens and keeps park fees low, which makes walking safaris in South Luangwa good value.',
    fees: [
      { item: 'South Luangwa National Park', amount: 25, currency: 'USD', unit: 'per person per day' },
      { item: 'Lower Zambezi National Park', amount: 25, currency: 'USD', unit: 'per person per day' },
      { item: 'Kafue National Park', amount: 20, currency: 'USD', unit: 'per person per day' },
      { item: 'Mosi-oa-Tunya National Park (Victoria Falls, Zambia side)', amount: 10, currency: 'USD', unit: 'per person per day' },
      { item: 'KAZA UNIVISA (Zambia and Zimbabwe)', amount: 50, currency: 'USD', unit: 'one-time, 30 days' },
    ],
    example: {
      title: '5 days in South Luangwa', currency: 'USD',
      lines: [{ label: 'South Luangwa, 5 days', fee: 25, qty: 5 }],
      assumptions: 'Per adult, 2025 tariff. Lodges usually include park fees in their rates; check before paying twice.',
    },
    sources: [{ label: 'Zambia Tourism: Park entry fees', url: 'https://www.zambiatourism.com/park-entry-fees/' }],
  },
  {
    slug: 'zimbabwe', scene: 'falls',
    intro: 'Zimbabwe raised Victoria Falls entry fees in February 2026. The KAZA UNIVISA is the easy way to see both sides of the falls.',
    fees: [
      { item: 'Victoria Falls Rainforest, main gate', amount: 58, currency: 'USD', unit: 'per person' },
      { item: 'Victoria Falls, moonlight viewing', amount: 116, currency: 'USD', unit: 'per person' },
      { item: 'KAZA UNIVISA (Zambia and Zimbabwe)', amount: 50, currency: 'USD', unit: 'one-time, 30 days' },
    ],
    example: {
      title: '2 days at Victoria Falls, both sides', currency: 'USD',
      lines: [
        { label: 'KAZA UNIVISA', fee: 50, qty: 1 },
        { label: 'Rainforest, Zimbabwe side', fee: 58, qty: 1 },
        { label: 'Mosi-oa-Tunya, Zambia side', fee: 10, qty: 1 },
      ],
      assumptions: 'Per adult, international visitor rates.',
    },
    sources: [
      { label: 'Zambia Tourism: Updated Victoria Falls fees, Zimbabwe side (Feb 2026)', url: 'https://www.zambiatourism.com/updated-victoria-falls-entry-fees-for-zim-side/' },
      { label: 'Zambia Tourism: Park entry fees', url: 'https://www.zambiatourism.com/park-entry-fees/' },
    ],
  },
];

export const costBySlug = new Map(costs.map((c) => [c.slug, c]));

export const fmt = (n: number, cur: Fee['currency']) => {
  const sym = { USD: 'US$', ZAR: 'R', NAD: 'N$', BWP: 'BWP ' }[cur];
  const s = n % 1 === 0 ? n.toLocaleString('en-GB') : n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${sym}${s}`;
};
export const toUsd = (n: number, cur: Fee['currency']) => n * usdRate[cur];
export const exampleTotal = (c: CostCountry) => c.example.lines.reduce((t, l) => t + (l.fee * l.qty) / (l.divide ?? 1), 0);
