/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#221a10", // warm near-black for text
        wall: "#A8D63A", // açık/parlak yeşil zemin
        forest: {
          DEFAULT: "#36532B",
          dark: "#263D1E",
        },
        paper: "#FBFAF5",
        // mantar pano
        cork: {
          DEFAULT: "#C9A36B",
          dark: "#9C7A4E",
          deep: "#7E5F3A",
        },
        // sarı not kâğıdı
        note: {
          DEFAULT: "#FAF3B4",
          edge: "#ECE08A",
          ink: "#3A3320",
        },
        // mavi su / dalgalar + raptiye
        water: {
          DEFAULT: "#2E7DBE",
          deep: "#1C5E96",
          light: "#56A8DE",
        },
        sun: "#F7C948",
        mountain: {
          DEFAULT: "#6F4A2F", // kahve rengi dağ
          light: "#8B5E3C",
        },
        wood: {
          DEFAULT: "#D7A95F",
          light: "#E3BC78",
          dark: "#8C5A2C",
          edge: "#6E4520",
          ink: "#3A2614",
        },
        lime: {
          DEFAULT: "#C8F02E",
          dark: "#A9CC1F",
          ink: "#2C3A00",
        },
        brick: {
          DEFAULT: "#E5352B",
          dark: "#C42218",
        },
        brand: {
          green: "#4E7C45",
          dark: "#3C6135",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Clash Display", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
        logo: ["var(--font-logo)", "ui-rounded", "system-ui", "sans-serif"],
      },
      boxShadow: {
        frame: "6px 8px 0 0 rgba(20,18,16,0.16)",
        "frame-hover": "10px 14px 0 0 rgba(20,18,16,0.22)",
        hard: "4px 4px 0 0 #141210",
        "hard-lime": "5px 5px 0 0 #141210",
      },
      borderRadius: {
        sketch: "2px",
      },
      keyframes: {
        sway: {
          "0%, 100%": { transform: "rotate(-0.6deg)" },
          "50%": { transform: "rotate(0.6deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        sway: "sway 4s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
