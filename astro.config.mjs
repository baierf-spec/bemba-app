import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const DATA_CHECKED = '2026-10-27'; // keep in sync with src/data/sources.ts

// Static build. Cloudflare Workers serves ./dist as static assets,
// and worker/index.ts handles /api/* (see wrangler.jsonc).
export default defineConfig({
  site: 'https://bemba.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks/'),
      serialize(item) {
        const u = item.url;
        item.lastmod = DATA_CHECKED;
        item.changefreq = 'weekly';
        item.priority = u === 'https://bemba.com/' ? 1.0
          : /\/(countries|regions|guides|health)\//.test(u) ? 0.8
          : /\/visa\/[^/]+\/[^/]+\/$/.test(u) ? 0.6 : 0.7;
        return item;
      },
    }),
  ],
});
