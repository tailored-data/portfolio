import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` emits relative asset paths in the build output.
// This is what makes the site host-agnostic: it works identically at a
// domain root (Netlify/Vercel/Cloudflare) and in a subdirectory
// (GitHub Pages project sites, e.g. taylor.github.io/portfolio/).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
