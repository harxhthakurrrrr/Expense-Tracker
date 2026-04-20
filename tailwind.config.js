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
          DEFAULT: "#00ff41", // Matrix Green
          light: "#33ff67",
          dark: "#00cc34",
        },
        cyber: {
          black: "#0a0a0a",
          dark: "#121212",
          gray: "#1e1e1e",
          neon: "#00ff41",
        },
        secondary: "#ff003c", // Cyberpunk Pink
        accent: "#00f0ff", // Cyberpunk Blue
        success: "#00ff41",
        warning: "#f59e0b",
        danger: "#ef4444",
        appBg: "#050505",
        surface: "#111111",
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 65, 0.2), 0 0 20px rgba(0, 255, 65, 0.1)',
        'neon-strong': '0 0 15px rgba(0, 255, 65, 0.5), 0 0 30px rgba(0, 255, 65, 0.3)',
        'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}