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
      },
      screens: {
        // Extra small devices like older smartphones
        'xs': '320px',
  
        // Small mobile devices like iPhones and standard smartphones
        'sm': '375px',
  
        // Medium mobile devices like larger Android phones and phablets
        'md': '425px',
  
        // Large mobile devices and small tablets
        'lg': '600px',
  
        // Tablets and larger devices
        'xl': '768px',
  
        // Larger tablets, small laptops, etc.
        '2xl': '1024px',
      },
    },
  },
  plugins: [flowbite.plugin(),],
};
export default config;
