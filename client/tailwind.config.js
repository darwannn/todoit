/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#111111",
          50: "#404040",
          // 100: "#3A3A3A",
          100: "#FAFAFA",
          //  200: "#333333",
          200: "#F2F2F2",
          // 300: "#2D2D2D",
          300: "#EBEBEB",
          400: "#262626",
          // 500: "#1F1F1F",
          500: "#808080",
          // 600: "#191919",
          600: "#444444",
          700: "#121212",
          800: "#0C0C0C",
          900: "#060606",
        },
        secondary: {
          DEFAULT: "#FFD43B",
          50: "#FFEEA7",
          100: "#FFE977",
          200: "#FFDE48",
          300: "#FFD43B",
          400: "#FFCE2F",
          500: "#FFC922",
          600: "#FFC316",
          700: "#FFBD09",
          800: "#FBB400",
          900: "#E6C300",
        },
      },
    },
  },

  plugins: [],
};
