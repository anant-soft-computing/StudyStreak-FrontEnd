const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/tailwind_components/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8E84C6',
          50: '#F7F6FB',
          100: '#EEEDF6',
          200: '#DCD9EE',
          300: '#C5C0E3',
          400: '#A69DD4',
          500: '#8E84C6',
          600: '#7267B8',
          700: '#5B4FA6',
          800: '#463C8B',
          900: '#342D68'
        },
        secondary: {
          DEFAULT: '#B5A8D0',
          50: '#FAF9FC',
          100: '#F2F0F7',
          200: '#E5E1EF',
          300: '#D8D2E7',
          400: '#C6BCDB',
          500: '#B5A8D0',
          600: '#9588BE',
          700: '#7668AC',
          800: '#5A4D8E',
          900: '#423870'
        },
        accent: {
          DEFAULT: '#A395D0',
          50: '#F8F7FB',
          100: '#F0EEF7',
          200: '#E1DDEF',
          300: '#D2CCE7',
          400: '#C3BBDF',
          500: '#A395D0',
          600: '#8472C2',
          700: '#654FB4',
          800: '#4C3B99',
          900: '#382C73'
        },
        success: {
          DEFAULT: '#4CAF50',
          50: '#E8F5E9',
          ...colors.green
        },
        warning: {
          DEFAULT: '#FFC107',
          50: '#FFF8E1',
          ...colors.yellow
        },
        error: {
          DEFAULT: '#EF4444',
          50: '#FEF2F2',
          ...colors.red
        },
        neutral: {
          50: '#F9F9FB',
          100: '#F4F3F7',
          200: '#E9E7EF',
          300: '#DEDBE7',
          400: '#C8C4D4',
          500: '#B2ADC2',
          600: '#9892AB',
          700: '#7E7794',
          800: '#655D7D',
          900: '#4C4466'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['2rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.5rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '3.25rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(142, 132, 198, 0.1), 0 2px 4px -1px rgba(142, 132, 198, 0.06)',
        'hover': '0 10px 15px -3px rgba(142, 132, 198, 0.1), 0 4px 6px -2px rgba(142, 132, 198, 0.05)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.02), 0 1px 6px rgba(142, 132, 198, 0.08)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(142, 132, 198, 0.1)',
        'elevated': '0 10px 20px rgba(142, 132, 198, 0.15)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(142, 132, 198, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.5s ease-in-out',
        'scale': 'scale 0.2s ease-in-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}