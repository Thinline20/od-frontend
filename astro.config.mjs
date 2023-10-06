import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "static",
  compressHTML: process.env.NODE_ENV === "production",
  build: {
    format: "file",
    inlineStylesheets: "auto",
    assets: "static",
  },
});
