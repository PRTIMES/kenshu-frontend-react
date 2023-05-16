import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import KumaUI from "@kuma-ui/vite";
import { macaronVitePlugin } from "@macaron-css/vite";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    KumaUI(),
    macaronVitePlugin(),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  server: {
    open: true,
    port: 3000,
  },
});
