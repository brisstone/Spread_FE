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
        'gradient-card': 'linear-gradient(127.68deg, rgba(41, 26, 55, 0.34) 20.53%, rgba(23, 6, 38, 0.31) 102.53%)',
        'gradient-divider': 'linear-gradient(180deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)',
        'gradient-horizdivider': 'linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)',
        'gradient-blurrygrey': 'linear-gradient(135deg, rgba(172, 172, 172, 0.2) 0%, rgba(255, 255, 255, 0.53) 100%)'
      },
      colors: {
        background: '#100D12',
        backdrop: 'rgba(0,0,0,0.5)',
        'subtitle': '#A0AEC0',
        'subtitle2': '#8C8C8C',
        'subtitle3': '#C1C1C1',
        btn: '#6D3DED',
        obsec: '#D0D5DD', // onboarding secondary text colour
        icon: '#BC96E6',
        'icon-back': '#291A37',
        'misc': '#4E466D',
        'active-icon': 'rgba(255, 255, 255, 0.1)',
        'purpleblack': '#13111B',
        'dim-white': 'rgba(255, 255, 255, 0.12)',
        'dim-white2': '#DFE3EA',
        'dim-white3': '#B7B7B7',
        'tag': '#00A642',
        'greyish': '#EEEEEE',
        'greyborder': '#808080',
        'greycard': 'rgba(84, 84, 84, 0.2)',
        'blurryblue': 'rgba(109, 61, 237, 0.2)',
        'blueborder': '#9B71E9',
        'grey2': '#D7DBEC',
        'divider': '#545454',
        'white2': '#F2F6FA',
      },
      fontSize: {
        base: ['0.875rem', '1.5rem'],
        md: ['1rem', '1.5rem'],
        lg: ['1.125rem', '140%'],
        xl: ['1.75rem', '100%'],
      },
      borderRadius: {
        'lg': '12px',
        'xl': '15px',
        '2xl': '20px',
        '3xl': '30px',
      },
      boxShadow: {
        btn2: '0px 4px 15px rgba(109, 61, 237, 0.35)',
        blurrygrey: '0px 4px 15px rgba(255, 255, 255, 0.35)'
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
