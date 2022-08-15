/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
