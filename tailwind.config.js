/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Electric Indigo
        accent: "#10B981",  // Success Green
        dark: "#0D0D12",    // Obsidian
        background: "#FAF8F5", // Ivory
        champagne: "#C9A84C",
        slate: "#2A2A35",
        paper: "#E8E4DD",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"], // Readable header font
        drama: ["Lora", "serif"], // Proxima Sera alternative
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
