const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/components/**/*.{vue,js,ts}',
      './src/common/**/*.{vue,js,ts}',
      './src/components/**/**/*.{vue,js,ts}',
      './src/views/**/*.vue'
    ],
    options: {
      whitelist: ['html', 'body']
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem'
      },
      lineHeight: {
        '11': '2.75rem'
      },
      colors: {
        'admin-blue': {
          '50': '#f6fbfc',
          '100': '#eef7fa',
          '200': '#d4eaf2',
          '300': '#badeeb',
          '400': '#86c5db',
          '500': '#52accc',
          '600': '#4a9bb8',
          '700': '#3e8199',
          '800': '#31677a',
          '900': '#285464'
        },
        indigo: colors.indigo,
        teal: colors.teal,
      },
      boxShadow: {
        'admin': '0 4px 6px rgba(10,45,80,0.05)'
      },
      minWidth: {
        '72': '18rem'
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1300px'
    }
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
