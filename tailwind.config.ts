import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#1F2633",
        "custom-bg-2": "#014422",
        "custom-bg-3": "#0aa32d",
      },
    },
  },
  daisyui: {
    themes: ["light", "dim"],
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
export default config;
