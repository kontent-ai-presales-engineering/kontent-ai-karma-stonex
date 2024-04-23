/** @type {import('tailwindcss').Config} */

const { filterTokensByType } = require("./tailwind/fns");
const tokens = require("./tailwind/tokens-variables.json")

const colors = filterTokensByType('color', tokens)
const spacing = filterTokensByType('spacing', tokens)
const borderRadius = filterTokensByType('borderRadius', tokens)
const boxShadow = filterTokensByType('boxShadow', tokens)
const fontSize = filterTokensByType('fontSizes', tokens)

module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        manufacturing: {
          light: '#cc2754',
          DEFAULT: '#9f1239',
          dark: '#B90000',
        },
        kontentai: '#3dcca8',
        elitebuild: '#0078d2',
        ...colors
      },

      
    ...spacing,
    borderRadius: borderRadius.border,
    boxShadow: boxShadow.shadow,
    fontSize: {
      ...fontSize.size.heading,
      ...fontSize.size.body,
    }
    },
  }
};