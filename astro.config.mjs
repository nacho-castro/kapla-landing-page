// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Production domain (no www). Used for the canonical URL, Open Graph, sitemap.xml and robots.txt.
const SITE_URL = 'https://kaplatech.com.ar';

export default defineConfig({
  output: 'static',
  site: SITE_URL,
  // Spanish at / and English at /en/.
  i18n: { defaultLocale: 'es', locales: ['es', 'en'], routing: { prefixDefaultLocale: false } },
  // Content-Security-Policy as a <meta> tag with automatic hashes for the inline scripts.
  security: { csp: { directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'none'"] } },
  vite: {
    plugins: [tailwindcss()],
  },
});
