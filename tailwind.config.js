/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",     
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        backgroundColorPrimary:"E5E7EB",
        backgroundColorSecondary:"#ebe6e6",
        backgroundColorThird:"#F3F4F6",
        backgroundColorForth:"##EDE6E6",
        textBaseColor:"#1F3337",
        buttonColor:"#1D4ED8",
        buttonColorHighlight:"#2563EB",
        textGradientPrimary:"#D42C95",
        textGradientSecondary:"#C06FBE",
        textGradientThird:"#83ace2",
        
        
      },
      fontSize: {
        'xxs': '.5rem',     // Extra extra small size
        'xs': '.75rem',     // Extra small size
        'sm': '.875rem',    // Small size
        'base': '1rem',     // Base/default size
        'lg': '1.125rem',   // Large size
        'xl': '1.25rem',    // Extra large size
        '2xl': '1.5rem',    // 2 times large
        '3xl': '1.875rem',  // 3 times large
        '4xl': '2.25rem',   // 4 times large
        '5xl': '3rem',      // 5 times large
        '6xl': '4rem',      // 6 times large
        "7xl": "5rem" ,      // 7 times large
        "8xl": "6rem" ,      // 8 times large
        "9xl": "7rem" ,      // 9 times large
      },
      fontWeight: {
        'hairline': 100,
        'thin': 200,
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900,
      },
    },
  },
  plugins: [],
}

