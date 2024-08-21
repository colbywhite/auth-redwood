import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui, typography()],
  daisyui: {
    themes: ['dark'],
  },
}
