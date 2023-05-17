import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { macaronVitePlugin } from "@macaron-css/vite";

export default defineConfig({
  plugins: [
    macaronVitePlugin(),
    react({
      jsxRuntime: "classic",
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  server: {
    open: true,
    port: 3000,
  },
});
