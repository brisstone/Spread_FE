const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-nav': 'linear-gradient(111.84deg, rgba(10, 3, 19, 0.94) 59.3%, rgba(42, 26, 55, 0) 100%)',
        'gradient-kpi': 'linear-gradient(126.97deg, rgba(41, 26, 55, 0.74) 28.26%, rgba(23, 6, 38, 0.5) 91.2%)',
        'gradient-card': 'linear-gradient(126.97deg, rgba(41, 26, 55, 0.74) 28.26%, rgba(23, 6, 38, 0.71) 91.2%)',
        'gradient-divider': 'linear-gradient(180deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)',
        'gradient-horizdivider': 'linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)',
      },
      colors: {
        background: '#100D12',
        'subtitle': '#A0AEC0',
        'subtitle2': '#8C8C8C',
        btn: '#6D3DED',
        obsec: '#D0D5DD', // onboarding secondary text colour
        icon: '#BC96E6',
        'icon-back': '#291A37',
        'misc': '#4E466D',
        'active-icon': 'rgba(255, 255, 255, 0.1)',
        'purpleblack': '#13111B',
        'dim-white': 'rgba(255, 255, 255, 0.12)',
        'tag': '#00A642',
        'greyish': '#EEEEEE',
        'greyborder': '#808080',
      },
      fontSize: {
        base: ['0.875rem', '1.5rem'],
        lg: ['1.125rem', '140%'],
        xl: ['1.625rem', '28px'],
      },
      borderRadius: {
        'lg': '12px',
        'xl': '15px',
        '2xl': '20px',
        '3xl': '30px',
      },
      boxShadow: {
        btn: '0px 4px 15px 5px rgba(255, 255, 255, 0.09)',
      },
      fontFamily: {
        sans: ['"Roobert"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
