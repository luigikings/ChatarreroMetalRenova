import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chatarreriametalrenova.es',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      // Se actualiza sola en cada build/despliegue: le dice a Google cuándo se
      // regeneró el sitio por última vez.
      lastmod: new Date(),
    }),
  ],
});
