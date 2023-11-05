import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  output: "static",
  compressHTML: process.env.NODE_ENV === "production",
  build: {
    format: "file",
    inlineStylesheets: "auto",
    assets: "static"
  }
});