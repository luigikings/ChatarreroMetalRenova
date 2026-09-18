import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chatarreriametalrenova.es',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
