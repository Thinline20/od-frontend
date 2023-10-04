/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "1080p": "1920px",
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: "class",
  daisyui: {
    themes: ["light", "dark"],
  },
};
