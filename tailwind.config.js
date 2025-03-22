/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9F5EA",
        secondary: "#ECDFDB",
        heading: "#C9A489",
        footer: "#0C0D12",
        text: "#555659",
      },
    },
  },
  plugins: [],
};
