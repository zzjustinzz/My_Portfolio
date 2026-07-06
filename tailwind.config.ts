import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./actions/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#4F46E5",
          600: "#6340e8",
          700: "#7C3AED",
          800: "#6d28d9",
          900: "#4c1d95",
          950: "#2e1065",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        "brand-gradient-subtle": "linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.15) 100%)",
      },
      animation: {
        "gradient-x": "gradient-x 4s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        "brand": "0 0 30px rgba(79, 70, 229, 0.35)",
        "brand-lg": "0 0 60px rgba(124, 58, 237, 0.4)",
        "card": "0 4px 24px rgba(0,0,0,0.12)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
