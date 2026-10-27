import type { Scene } from './scenes';

export interface Side {
  country: string;      // countries.ts slug
  label: string;        // shown name ("Kenya", "Zanzibar")
  dest: string;         // seasons.ts destination slug for the month strip
  scene: Scene;
  bestFor: string[];
}

export interface Comparison {
  slug: string;
  title: string;
  question: string;     // the search question this page answers
  intro: string;
  a: Side;
  b: Side;
  rows: { label: string; a: string; b: string }[];
  chooseA: string;
  chooseB: string;
  combine?: string;
}

export const comparisons: Comparison[] = [
  {
    slug: 'kenya-vs-tanzania',
    title: 'Kenya vs Tanzania safari',
    question: 'Kenya or Tanzania for a first safari?',
    intro: 'Both share the same ecosystem and the Great Migration. Kenya is easier and shorter to reach from Europe; Tanzania has more space and bigger parks.',
    a: { country: 'kenya', label: 'Kenya', dest: 'masai-mara', scene: 'savanna', bestFor: ['Short trips of 3 to 5 days', 'Mara River crossings July to October', 'Private conservancies with off-road drives and night drives'] },
    b: { country: 'tanzania', label: 'Tanzania', dest: 'serengeti', scene: 'mountain', bestFor: ['Longer trips of 7 days or more', 'Calving season in January and February', 'Combining safari with Kilimanjaro or Zanzibar'] },
    rows: [
      { label: 'Main parks', a: 'Masai Mara, Amboseli, Samburu, Tsavo', b: 'Serengeti, Ngorongoro, Tarangire, Ruaha, Nyerere' },
      { label: 'Migration', a: 'July to October in the Mara', b: 'All year: south in January to March, north in July to October' },
      { label: 'Crowds', a: 'Busy reserve at peak; conservancies cap vehicles', b: 'Busy at Ngorongoro and central Serengeti; quiet in the south and west' },
      { label: 'Beach add-on', a: 'Diani, Watamu, Lamu', b: 'Zanzibar, Mafia Island' },
    ],
    chooseA: 'Choose Kenya for a shorter, easier trip in the migration season, or to stay in a private conservancy.',
    chooseB: 'Choose Tanzania for a longer trip, the calving season, or to finish on Zanzibar.',
    combine: 'You can do both: the Masai Mara and the northern Serengeti are the same ecosystem, but there is no tourist border crossing inside the parks, so you fly or drive round via Isebania or Namanga.',
  },
  {
    slug: 'rwanda-vs-uganda-gorillas',
    title: 'Rwanda vs Uganda for gorilla trekking',
    question: 'Rwanda or Uganda for gorilla trekking?',
    intro: 'Both protect mountain gorillas in the Virunga and Bwindi forests. Rwanda is faster and more polished; Uganda is cheaper and adds chimps and classic savanna parks.',
    a: { country: 'rwanda', label: 'Rwanda', dest: 'gorillas-rwanda', scene: 'forest', bestFor: ['Short trips: the park is about 2.5 hours from Kigali', 'Smooth logistics and short transfers', 'Combining with Nyungwe chimps or Akagera'] },
    b: { country: 'uganda', label: 'Uganda', dest: 'gorillas-uganda', scene: 'forest', bestFor: ['Lower permit price', 'Longer trips with chimps in Kibale and big game in Queen Elizabeth', 'Gorilla habituation experiences'] },
    rows: [
      { label: 'Where', a: 'Volcanoes National Park', b: 'Bwindi Impenetrable Forest, Mgahinga' },
      { label: 'Getting there', a: 'Kigali (KGL), then about 2.5 hours by road', b: 'Entebbe (EBB), then a long drive or a domestic flight' },
      { label: 'Terrain', a: 'Bamboo and volcanic slopes', b: 'Steep, dense rainforest' },
    ],
    chooseA: 'Choose Rwanda if time matters more than money, or for a short add-on to a Kenya or Tanzania safari.',
    chooseB: 'Choose Uganda if you want to spend less on the permit and have a week or more.',
    combine: 'The East Africa Tourist Visa (US$100) covers Rwanda, Uganda and Kenya on one visa, so a combined trip is simple.',
  },
  {
    slug: 'botswana-vs-namibia',
    title: 'Botswana vs Namibia safari',
    question: 'Botswana or Namibia?',
    intro: 'Neighbours with very different trips. Botswana is water, wildlife and remote fly-in camps; Namibia is desert landscapes and the best self-drive country in Africa.',
    a: { country: 'botswana', label: 'Botswana', dest: 'okavango', scene: 'delta', bestFor: ['Okavango Delta mokoro trips', 'Big elephant herds in Chobe', 'Exclusive, low-density camps'] },
    b: { country: 'namibia', label: 'Namibia', dest: 'sossusvlei', scene: 'desert', bestFor: ['Self-drive road trips', 'Sossusvlei dunes and Deadvlei', 'Waterhole game viewing in Etosha'] },
    rows: [
      { label: 'Style', a: 'Fly-in camps and guided 4x4 safaris', b: 'Self-drive with lodges and campsites' },
      { label: 'Landscapes', a: 'Delta channels, floodplains, salt pans', b: 'Red dunes, canyons, the Skeleton Coast' },
      { label: 'Budget', a: 'High: remote lodges and light aircraft', b: 'Moderate: car hire and mid-range lodges' },
    ],
    chooseA: 'Choose Botswana for wildlife density and wilderness, if the budget allows.',
    chooseB: 'Choose Namibia for landscapes, photography and the freedom of a self-drive.',
    combine: 'The Caprivi Strip links Etosha to Chobe by road, a popular 2 to 3 week route.',
  },
  {
    slug: 'south-africa-vs-kenya',
    title: 'South Africa vs Kenya for a safari holiday',
    question: 'South Africa or Kenya?',
    intro: 'South Africa mixes safari with cities, wine and coast, with good roads and no visa for most Europeans. Kenya is the classic East African safari with the migration.',
    a: { country: 'south-africa', label: 'South Africa', dest: 'kruger', scene: 'beach', bestFor: ['Self-drive safari in Kruger', 'Combining safari with Cape Town and the Garden Route', 'Families and first-time visitors to Africa'] },
    b: { country: 'kenya', label: 'Kenya', dest: 'masai-mara', scene: 'savanna', bestFor: ['The Great Migration', 'Open savanna and big cats', 'Maasai culture in the conservancies'] },
    rows: [
      { label: 'Safari style', a: 'Self-drive or private reserves next to Kruger', b: 'Guided game drives in pop-up roof vehicles' },
      { label: 'Beyond safari', a: 'Cape Town, Winelands, Garden Route', b: 'Indian Ocean beaches, Lamu' },
      { label: 'Getting around', a: 'Good roads and car hire', b: 'Bush flights or long road transfers' },
    ],
    chooseA: 'Choose South Africa for a varied holiday with safari as one part of it.',
    chooseB: 'Choose Kenya when the safari itself, and the migration, is the point of the trip.',
  },
  {
    slug: 'zanzibar-vs-mauritius',
    title: 'Zanzibar vs Mauritius beach holiday',
    question: 'Zanzibar or Mauritius?',
    intro: 'Zanzibar is the natural beach finish to a Tanzania safari, with Stone Town and spice farms. Mauritius is a polished resort island with year-round infrastructure.',
    a: { country: 'tanzania', label: 'Zanzibar', dest: 'zanzibar', scene: 'beach', bestFor: ['Ending a Tanzania safari', 'History and culture in Stone Town', 'Smaller, characterful hotels'] },
    b: { country: 'mauritius', label: 'Mauritius', dest: 'mauritius', scene: 'beach', bestFor: ['Resort holidays and honeymoons', 'Golf, hiking and lagoon sports', 'No visa and no yellow fever paperwork for most Europeans'] },
    rows: [
      { label: 'Beaches', a: 'Wide tidal beaches on the east coast; swimmable at all tides in the north', b: 'Reef-protected lagoons around the island' },
      { label: 'Wet season', a: 'Long rains in April and May', b: 'Cyclone risk from January to March' },
      { label: 'Combine with', a: 'Serengeti, Ngorongoro, Kilimanjaro', b: 'Réunion, or a South Africa safari' },
    ],
    chooseA: 'Choose Zanzibar if you are already going on safari in Tanzania or want culture with your beach.',
    chooseB: 'Choose Mauritius for a pure resort holiday with no visa and smooth logistics.',
  },
  {
    slug: 'zambia-vs-zimbabwe-victoria-falls',
    title: 'Victoria Falls: Zambia vs Zimbabwe side',
    question: 'Which side of Victoria Falls is better?',
    intro: 'The Zimbabwe side has the classic front-on views along the rainforest path; the Zambian side gets you close to the edge, including Devil\'s Pool at low water.',
    a: { country: 'zambia', label: 'Zambia (Livingstone)', dest: 'victoria-falls', scene: 'falls', bestFor: ['Devil\'s Pool and Livingstone Island at low water', 'Walking the Knife Edge Bridge', 'Visa-free entry for EU, UK and US'] },
    b: { country: 'zimbabwe', label: 'Zimbabwe (Victoria Falls town)', dest: 'victoria-falls', scene: 'falls', bestFor: ['The widest views of the falls', 'A walkable town next to the falls', 'Hwange National Park nearby'] },
    rows: [
      { label: 'Share of the falls', a: 'About a quarter of the width', b: 'About three quarters of the width' },
      { label: 'Best views', a: 'Close-up from the Knife Edge Bridge', b: 'Front-on panorama from 16 viewpoints along the rainforest path' },
      { label: 'Airport', a: 'Livingstone (LVI)', b: 'Victoria Falls (VFA)' },
    ],
    chooseA: 'Choose Zambia for the edge experiences and to skip a visa.',
    chooseB: 'Choose Zimbabwe for the views and the town; see both with the KAZA UNIVISA.',
    combine: 'With a KAZA UNIVISA (about US$50) you can cross the bridge and see both sides in one day.',
  },
];
