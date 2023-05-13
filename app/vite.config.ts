import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import KumaUI from '@kuma-ui/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    KumaUI(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
