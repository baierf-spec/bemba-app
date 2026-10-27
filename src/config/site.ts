/**
 * Site-wide settings. Replace the partner links with your own affiliate URLs
 * once you are approved by each programme. Links are marked rel="sponsored".
 */
export const site = {
  name: 'Bemba',
  url: 'https://bemba.com',
  email: 'hello@bemba.com',
  tagline: 'Entry rules for travellers to Africa',
};

export interface Partner {
  id: 'esim' | 'insurance' | 'tours' | 'flights';
  title: string;
  blurb: string;
  cta: string;
  url: string;
}

export const partners: Partner[] = [
  {
    id: 'esim',
    title: 'Mobile data on landing',
    blurb: 'An eSIM works the moment your plane lands. No airport SIM queue.',
    cta: 'Compare Africa eSIMs',
    url: 'https://www.airalo.com/', // TODO: replace with your affiliate link
  },
  {
    id: 'insurance',
    title: 'Travel insurance',
    blurb: 'Medical cover matters on safari and in remote areas. Check that evacuation is included.',
    cta: 'Get an insurance quote',
    url: 'https://safetywing.com/', // TODO: replace with your affiliate link
  },
  {
    id: 'tours',
    title: 'Day tours and activities',
    blurb: 'Book guided tours with free cancellation up to 24 hours before.',
    cta: 'Browse tours',
    url: 'https://www.getyourguide.com/', // TODO: replace with your affiliate link
  },
];
