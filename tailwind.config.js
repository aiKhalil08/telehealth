/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'grey': {
                50: '#F9FAFB',
                75: '#F7F9FC',
                100: '#F0F2F5',
                200: '#E4E7EC',
                300: '#D0D5DD',
                400: '#98A2B3',
                500: '#667185',
                600: '#475367',
                700: '#344054',
                800: '#1D2739',
                900: '#101928'
            },
            'primary': {
                50: '#FFECE5',
                75: '#FCD2C2',
                100: '#FCB59A',
                200: '#FA9874',
                300: '#F77A4A',
                400: '#F56630',
                500: '#EB5017',
                600: '#CC400C',
                700: '#AD3307',
                800: '#8F2802',
                900: '#711E00'
            },
            'success': {
                50: '#E7F6EC',
                75: '#FCD2C2',
                100: '#FCB59A',
                200: '#FA9874',
                300: '#F77A4A',
                400: '#F56630',
                500: '#EB5017',
                600: '#04802E',
                700: '#036B26',
                800: '#8F2802',
                900: '#711E00'
            }
        },
        fontSize: {
            'heading-1': ['40px', {
              lineHeight: '100%',
              letterSpacing: '-0.04em'
            }],
            'heading-2': ['36px', {
              lineHeight: '100%',
              letterSpacing: '-0.04em'
            }],
            'heading-3': ['32px', {
              lineHeight: '120%',
              letterSpacing: '-0.02em'
            }],
            'heading-4': ['28px', {
              lineHeight: '120%',
              letterSpacing: '-0.02em'
            }],
            'heading-5': ['24px', {
              lineHeight: '120%',
              letterSpacing: '-0.02em'
            }],
            'heading-6': ['20px', {
              lineHeight: '120%',
              letterSpacing: '-0.02em'
            }],
            'paragraph-large': ['18px', {
              lineHeight: '145%',
              letterSpacing: '0'
            }],
            'paragraph-medium': ['16px', {
              lineHeight: '145%',
              letterSpacing: '0'
            }],
            'paragraph-small': ['14px', {
              lineHeight: '145%',
              letterSpacing: '0'
            }],
            'paragraph-xsmall': ['12px', {
              lineHeight: '145%',
              letterSpacing: '0'
            }],
            'caption-large': ['14px', {
              lineHeight: '120%',
              letterSpacing: '0.12em',
              fontWeight: '600'
            }],
            'caption-small': ['12px', {
              lineHeight: '120%',
              letterSpacing: '0.12em',
              fontWeight: '600'
            }],
            'caption-xsmall': ['10px', {
              lineHeight: '120%',
              letterSpacing: '0.16em',
              fontWeight: '600'
            }]
          }
    },
  },
  plugins: [],
}

