/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fafd',
          100: '#e0f7fc',
          200: '#b8eff7',
          300: '#90e0ef', // Core user theme color
          400: '#48cae4',
          500: '#00b4d8',
          600: '#0096c7',
          700: '#0077b6',
          800: '#023e8a',
          900: '#03045e',
          950: '#010b1e',
        },
        themeCyan: '#90e0ef',
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
