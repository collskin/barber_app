import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-bg": "#242526",
        "secondary-bg": "#18191a",
        "text-c2black": "#141311",
        "primary-border": "#b0a294",
        "primary-grey-bg": "#4c5e70",
        "secondary-grey-bg": "#5a7691",
      },
      minWidth: {
        "50": "50%",
      },
    },
  },
  plugins: [],
};
export default config;
