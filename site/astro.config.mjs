import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rofit.site',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'file', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  vite: {
    // The demo and the build-time art import code from the extension's src/ one level up.
    server: { fs: { allow: ['..'] } },
    build: { assetsInlineLimit: 0 },
  },
});
