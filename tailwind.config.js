/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        primary: "rgb(var(--primary-rgb))",
        secondary: "rgb(var(--secondary-rgb))",
        dark: "#000000",
        obsidian: "#020204",
        amethyst: {
          900: "#3b0764",
          800: "#581c87",
          700: "#6b21a8",
          600: "#7e22ce",
          500: "#9333ea",
          400: "#a855f7",
          300: "#c084fc",
          200: "#e9d5ff",
        },
        electric: {
          cyan: "#00f0ff",
          azure: "#0ea5e9",
          sky: "#38bdf8",
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
