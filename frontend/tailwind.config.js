/** @type {import('tailwindcss').Config} */
export default {
  content: [
      // This is for PurgeCSS
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

