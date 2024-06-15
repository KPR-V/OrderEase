/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'home': "url('/home.jpg')",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        "bungee":["Bungee Shade", "cursive"],
         "changa":["Changa", "sans-serif"],        
      },
      colors: {
        "custom-red": "#FF6B6B",
        "custom-yellow": "#FFD93D",
      },
    },
  },
  plugins: [],
};
