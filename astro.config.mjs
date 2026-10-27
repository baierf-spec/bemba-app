import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static build. Cloudflare Workers serves ./dist as static assets,
// and worker/index.ts handles /api/* (see wrangler.jsonc).
export default defineConfig({
  site: 'https://bemba.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks/'),
    }),
  ],
});
