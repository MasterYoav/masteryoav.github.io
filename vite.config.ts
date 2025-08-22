// vite.config.ts
import { defineConfig } from 'vite';
// SWC version of the React plugin = faster TS/JS transforms during dev/build
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Enables React fast-refresh, TS/JS transforms via SWC, JSX handling, etc.
    react(),
  ],
  // You usually don’t need more here for a portfolio.
  // If you host under a subpath (e.g., GitHub Pages), set `base: '/subpath/'`.
});