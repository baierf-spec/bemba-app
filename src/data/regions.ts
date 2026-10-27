import type { Region } from './types';

export const REGIONS: Record<string, { name: Region; intro: string }> = {
  'north-africa': { name: 'North Africa', intro: 'From the medinas of Morocco to the temples of Egypt. Most of the region is visa-free or offers a simple visa on arrival for European passports.' },
  'west-africa': { name: 'West Africa', intro: 'Coastal cities, river deltas and Sahel towns. Many countries require a yellow fever certificate from every arriving traveller.' },
  'central-africa': { name: 'Central Africa', intro: 'Rainforest, gorillas and the Congo basin. Visas are usually arranged online or through an embassy before travel.' },
  'east-africa': { name: 'East Africa', intro: 'The Serengeti, the Masai Mara, gorilla treks and Indian Ocean islands. Most visits need an eVisa or travel authorisation arranged online.' },
  'southern-africa': { name: 'Southern Africa', intro: 'Self-drive safaris, Victoria Falls and the Cape. Several countries are visa-free, while Namibia and Malawi now charge for a visa.' },
};
