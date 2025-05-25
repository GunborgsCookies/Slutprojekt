module.exports = {
  content: ["./src/**/*.{html,js}"], // Justera om din HTML ligger utanför /src
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      nav: '1245px', // 👈 Detta är korrekt placering
    },
    extend: {
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        source: ['"Source Sans Pro"', 'sans-serif'],
         handwritten: ['"Just Another Hand"', 'cursive'],
      },
      keyframes: {
        'bg-pulse': {
          '0%, 100%': { backgroundColor: '#0b1a2d' },
          '50%': { backgroundColor: '#1a2538' },
        },
      },
      animation: {
        'bg-pulse': 'bg-pulse 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
