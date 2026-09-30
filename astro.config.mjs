// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  // TODO-CONTENIDO: set the final domain once it exists, e.g. site: 'https://example.com'
  vite: {
    plugins: [tailwindcss()],
  },
});
