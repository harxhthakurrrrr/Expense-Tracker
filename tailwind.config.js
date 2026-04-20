/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1", // Indigo
          light: "#818cf8",
          dark: "#4f46e5",
        },
        secondary: {
          DEFAULT: "#ec4899", // Pink/Rose
          light: "#f472b6",
          dark: "#db2777",
        },
        accent: {
          DEFAULT: "#8b5cf6", // Violet
          light: "#a78bfa",
          dark: "#7c3aed",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        appBg: "#fdfdff",
        surface: "#ffffff",
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(99, 102, 241, 0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}