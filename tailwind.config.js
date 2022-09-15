/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    extend: {
      colors: {
        'colors-primary': '#40798C',
        'colors-secondary': '#6AC1AC',
        'colors-third': '#1F363D',
        'colors-fourth': '#70A9A1',
        'colors-fifth': '#F0CC67',
        'colors-sixth': '#9EC1A3',
        'colors-seventh': '#70A9A1',
        black: '#1F363D',
        'line-pay': '#16A34A'
      }

    }
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.4xl') },
        h3: { fontSize: theme('fontSize.3xl') },
        h4: { fontSize: theme('fontSize.2xl') },
        h5: { fontSize: theme('fontSize.5xl') },
        h6: { fontSize: theme('fontSize.xs') }
      })
    })
  ]
}
