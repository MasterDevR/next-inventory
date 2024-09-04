import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      colors: {
        "custom-bg": "#1F2633",
        "custom-bg-2": "#095c1c",
        "custom-bg-3": "#0aa32d",
      },
    },
  },
  daisyui: {
    themes: ["light", "dim"],
  },
  plugins: [require("daisyui")],
};
export default config;
