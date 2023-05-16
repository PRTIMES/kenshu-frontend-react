import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    input: "../openapi.yaml",
    output: {
      workspace: "src/generated",
      target: "./client.ts",
      client: "react-query",
      // mock: true,
    },
  },
});
