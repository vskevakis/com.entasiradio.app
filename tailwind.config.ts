import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  darkMode: 'class', // or 'media'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backdropBlur: {
        'md': '10px',
        'lg': '20px',
      }
    },
  },
  plugins: [flowbite.plugin(),],
};
export default config;
