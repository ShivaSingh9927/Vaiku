/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'; // Use import instead of require

export default {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#0055FF",  // vibrant blue
          secondary: "#0EA5E9", // cyan accent
          accent: "#38BDF8",
          background: "#0A0F1F",
          // The Navy for headers we discussed
          navy: {
            900: "#001A33",
          },
        },
      },
    },
    plugins: [
      typography, // Add the imported variable here
    ],
}