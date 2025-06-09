// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Pastel Palette
        'pastel-pink': '#FFCAD4',      // Light, soft pink
        'deep-pink': '#E799B0',       // Deeper pink for accents/text
        'pastel-lavender': '#E0BBE4',  // Light lavender
        'deep-lavender': '#B98BE0',    // Deeper lavender for accents/text
        'butter-yellow': '#FFFACD',    // Soft yellow
        'ice-blue': '#D7EEF7',         // Very light blue
        'navy-charcoal': '#2C3E50',    // A deep, elegant dark for text/backgrounds
      },
      fontFamily: {
        // Define custom font families here
        // These will be linked to the Next.js Font functions
        sans: ['var(--font-inter)'], // Default sans-serif for body
        serif: ['var(--font-playfair)'], // For headings, website name
      },
    },
  },
  plugins: [],
};