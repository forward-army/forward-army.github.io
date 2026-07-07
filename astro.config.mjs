// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// forward.army ships as a static site to GitHub Pages behind a custom domain.
// The CNAME in /public pins the domain, so the site lives at the web root.
export default defineConfig({
  site: 'https://forward.army',
  base: '/',
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
