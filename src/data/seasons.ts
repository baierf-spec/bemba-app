import type { Scene } from './scenes';

/*
 * Month-by-month conditions for Africa's main destinations.
 * 2 = best time, 1 = good / shoulder, 0 = avoid or difficult (heavy rain, cyclones, extreme heat).
 * Based on long-term climate patterns and well-documented wildlife events, not a forecast.
 */
export interface Destination {
  slug: string;
  name: string;
  country: string;      // countries.ts slug
  scene: Scene;
  kind: string;         // "Safari", "Beach", ...
  months: [number, number, number, number, number, number, number, number, number, number, number, number];
  notes: Partial<Record<number, string>>; // 1-12 → highlight for that month
  avoidWhy?: string;
}

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;
export const monthSlug = (i: number) => MONTHS[i].toLowerCase(); // i = 0..11

export const destinations: Destination[] = [
  { slug: 'serengeti', name: 'Serengeti', country: 'tanzania', scene: 'savanna', kind: 'Safari',
    months: [2, 2, 1, 0, 0, 2, 2, 2, 2, 2, 1, 1],
    notes: { 1: 'Calving season in the southern Serengeti, with predators close behind.', 2: 'Peak calving: around half a million wildebeest calves are born in a few weeks.', 6: 'The herds move north; the Grumeti River crossings begin.', 7: 'Mara River crossings start in the northern Serengeti.', 8: 'Mara River crossings at their most reliable.', 9: 'Herds in the north, dry season game viewing everywhere.' },
    avoidWhy: 'Long rains make some roads difficult and many camps close.' },
  { slug: 'masai-mara', name: 'Masai Mara', country: 'kenya', scene: 'savanna', kind: 'Safari',
    months: [2, 2, 1, 0, 0, 1, 2, 2, 2, 2, 1, 1],
    notes: { 7: 'The migration arrives from the Serengeti; park fees switch to the high-season rate.', 8: 'Mara River crossings at their peak.', 9: 'Crossings continue; big cat sightings are excellent.', 1: 'Short dry season with green plains and lower park fees.' },
    avoidWhy: 'Long rains (April to May) flood tracks.' },
  { slug: 'kilimanjaro', name: 'Mount Kilimanjaro', country: 'tanzania', scene: 'mountain', kind: 'Trek',
    months: [2, 2, 1, 0, 0, 1, 2, 2, 2, 2, 0, 1],
    notes: { 1: 'Dry, clear and quieter than the July peak.', 7: 'Driest and busiest climbing season.', 9: 'Good summit conditions, fewer climbers than July.' },
    avoidWhy: 'Rain on the lower slopes and snow on the summit route.' },
  { slug: 'zanzibar', name: 'Zanzibar', country: 'tanzania', scene: 'beach', kind: 'Beach',
    months: [2, 2, 1, 0, 0, 2, 2, 2, 2, 2, 1, 2],
    notes: { 7: 'Dry, breezy and ideal after a safari.', 12: 'Hot and dry; the festive season fills hotels early.', 1: 'Calm, hot and dry.' },
    avoidWhy: 'Long rains; some hotels close.' },
  { slug: 'gorillas-rwanda', name: 'Gorilla trekking in Rwanda', country: 'rwanda', scene: 'forest', kind: 'Primates',
    months: [2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 1, 2],
    notes: { 6: 'Long dry season starts: firmer trails and easier treks.', 12: 'Short dry season; book permits months ahead.' },
    avoidWhy: 'Heaviest rain makes slopes muddy, though treks still run.' },
  { slug: 'gorillas-uganda', name: 'Gorilla trekking in Uganda', country: 'uganda', scene: 'forest', kind: 'Primates',
    months: [2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 1, 2],
    notes: { 6: 'Dry season in Bwindi; permit demand rises.', 1: 'Dry spell with good trekking and clear views.' },
    avoidWhy: 'Wettest month; trails are slippery.' },
  { slug: 'okavango', name: 'Okavango Delta', country: 'botswana', scene: 'delta', kind: 'Safari',
    months: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1],
    notes: { 6: 'Floodwaters peak in the delta just as the dry season starts.', 7: 'High water for mokoro trips and dry land wildlife.', 9: 'Water still high, animals concentrate at channels.', 1: 'Green season: lower rates, newborn animals, migratory birds.' } },
  { slug: 'chobe', name: 'Chobe', country: 'botswana', scene: 'delta', kind: 'Safari',
    months: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1],
    notes: { 9: 'Huge elephant herds along the Chobe River.', 10: 'Hottest month, and the best for elephant sightings at the river.' } },
  { slug: 'etosha', name: 'Etosha', country: 'namibia', scene: 'savanna', kind: 'Safari',
    months: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1],
    notes: { 8: 'Animals gather at waterholes; perfect for self-drive.', 9: 'Peak waterhole viewing before the rains.' } },
  { slug: 'sossusvlei', name: 'Sossusvlei', country: 'namibia', scene: 'desert', kind: 'Desert',
    months: [1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1],
    notes: { 5: 'Mild days and cold, clear nights for stargazing.', 7: 'Cool and pleasant for climbing Big Daddy dune.' },
    avoidWhy: undefined },
  { slug: 'kruger', name: 'Kruger', country: 'south-africa', scene: 'savanna', kind: 'Safari',
    months: [1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1],
    notes: { 6: 'Dry winter: thin bush and animals at the rivers.', 8: 'Classic dry-season game viewing.', 12: 'Green season with baby animals and birdlife.' } },
  { slug: 'cape-town', name: 'Cape Town and the Winelands', country: 'south-africa', scene: 'beach', kind: 'City and coast',
    months: [2, 2, 2, 1, 1, 0, 0, 1, 1, 1, 2, 2],
    notes: { 12: 'Long sunny days and the start of summer.', 1: 'Peak summer and beach season.', 9: 'Wildflowers on the West Coast and whales at Hermanus.' },
    avoidWhy: 'Cold, wet winter storms.' },
  { slug: 'victoria-falls', name: 'Victoria Falls', country: 'zimbabwe', scene: 'falls', kind: 'Waterfall',
    months: [1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
    notes: { 4: 'Peak flow: thundering water and drenching spray.', 7: 'High water with clearer views of the falls.', 10: 'Low water, Devil\'s Pool open on the Zambian side.' } },
  { slug: 'south-luangwa', name: 'South Luangwa', country: 'zambia', scene: 'savanna', kind: 'Safari',
    months: [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0],
    notes: { 7: 'Walking safari season in full swing.', 9: 'Leopards and lions around the Luangwa River.' },
    avoidWhy: 'Many camps close in the rainy season.' },
  { slug: 'marrakech', name: 'Marrakech and the Atlas', country: 'morocco', scene: 'oasis', kind: 'City and mountains',
    months: [1, 1, 2, 2, 2, 1, 0, 0, 1, 2, 2, 1],
    notes: { 4: 'Warm days and snow still on the Atlas peaks.', 10: 'Mild autumn, ideal for the medina and mountain hikes.' },
    avoidWhy: 'Summer heat regularly passes 40 °C.' },
  { slug: 'sahara-morocco', name: 'Sahara (Merzouga)', country: 'morocco', scene: 'desert', kind: 'Desert',
    months: [1, 1, 2, 2, 1, 0, 0, 0, 1, 2, 2, 1],
    notes: { 3: 'Comfortable days and starry desert nights.', 11: 'Warm days, cold nights: bring layers for camp.' },
    avoidWhy: 'Too hot for camel treks.' },
  { slug: 'egypt-nile', name: 'Cairo, Luxor and the Nile', country: 'egypt', scene: 'oasis', kind: 'History',
    months: [2, 2, 2, 1, 1, 0, 0, 0, 1, 2, 2, 2],
    notes: { 12: 'Pleasant temperatures for temples and Nile cruises.', 2: 'Peak season with cool evenings.' },
    avoidWhy: 'Luxor and Aswan heat makes sightseeing hard.' },
  { slug: 'red-sea', name: 'Red Sea coast', country: 'egypt', scene: 'beach', kind: 'Diving',
    months: [1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1],
    notes: { 4: 'Warm water and excellent visibility.', 10: 'Sea at its warmest, mild air.' } },
  { slug: 'mauritius', name: 'Mauritius', country: 'mauritius', scene: 'beach', kind: 'Beach',
    months: [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    notes: { 5: 'Dry, sunny and less humid.', 10: 'Calm seas and warm days.' },
    avoidWhy: 'Cyclone season brings storms and humidity.' },
  { slug: 'seychelles', name: 'Seychelles', country: 'seychelles', scene: 'beach', kind: 'Beach',
    months: [1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1],
    notes: { 4: 'Calm between trade winds: clear water for snorkelling.', 10: 'Second calm window, good for diving.' } },
  { slug: 'madagascar', name: 'Madagascar', country: 'madagascar', scene: 'forest', kind: 'Wildlife',
    months: [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    notes: { 9: 'Dry and sunny; lemurs are active in the eastern rainforests.', 10: 'Warm and dry, with lemur babies in the forests.' },
    avoidWhy: 'Cyclone season washes out roads.' },
  { slug: 'ethiopia-north', name: 'Northern Ethiopia', country: 'ethiopia', scene: 'mountain', kind: 'History and trekking',
    months: [2, 2, 1, 1, 1, 0, 0, 0, 1, 2, 2, 2],
    notes: { 1: 'Timkat (Epiphany) celebrations, especially in Gondar and Lalibela.', 9: 'Meskel festival at the end of the month; green highlands.' },
    avoidWhy: 'Main rainy season in the highlands.' },
  { slug: 'cabo-verde', name: 'Cabo Verde', country: 'cabo-verde', scene: 'beach', kind: 'Beach',
    months: [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2],
    notes: { 1: 'Reliable winter sun a short flight from Europe.', 3: 'Windy: peak kitesurf season on Sal.' } },
  { slug: 'tofo', name: 'Tofo, Mozambique', country: 'mozambique', scene: 'beach', kind: 'Diving',
    months: [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1],
    notes: { 7: 'Humpback whales pass the coast.', 10: 'Whale sharks and mantas, warm water.' } },
];

export const destBySlug = new Map(destinations.map((d) => [d.slug, d]));
