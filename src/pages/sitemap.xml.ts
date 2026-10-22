import type { APIRoute } from 'astro';
import { pagePath } from '../data/content';

// Every page with its alternate-language twin (hreflang).
const pages = ['home', 'privacy'] as const;

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const entries = pages.flatMap((page) =>
    (['es', 'en'] as const).map((lang) => {
      const links = [
        `<xhtml:link rel="alternate" hreflang="es" href="${abs(pagePath('es', page))}"/>`,
        `<xhtml:link rel="alternate" hreflang="en" href="${abs(pagePath('en', page))}"/>`,
        `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(pagePath('es', page))}"/>`,
      ].join('');
      return `  <url><loc>${abs(pagePath(lang, page))}</loc>${links}</url>`;
    }),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
