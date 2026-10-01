// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Production domain (no www). Used for the canonical URL, Open Graph, sitemap.xml and robots.txt.
const SITE_URL = 'https://kaplatech.com.ar';

export default defineConfig({
  output: 'static',
  site: SITE_URL,
  vite: {
    plugins: [tailwindcss()],
  },
});
