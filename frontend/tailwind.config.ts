import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#DCDCDC",
        foreground: "var(--foreground)",
        textcolor: "#DD3418",
        textblack: "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
