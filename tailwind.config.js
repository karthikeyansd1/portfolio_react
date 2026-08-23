/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2463',
        secondary: '#3E92CC',
        accent: '#FF6B6B',
        dark: '#1A1A2E',
        light: '#F8F9FA',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}
