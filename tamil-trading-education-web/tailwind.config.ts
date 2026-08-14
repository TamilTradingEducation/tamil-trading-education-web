import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", xl: "2rem" },
      // Scales up on very large/ultrawide displays instead of capping at
      // 1280px — a 32" or curved monitor now actually uses its width.
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1720px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        // Light "surface" scale for the main page body — kept under the
        // name "navy" so every existing bg-navy-*/text-navy-* class in the
        // codebase automatically becomes part of the light theme.
        navy: {
          50: "#ffffff",
          100: "#f6f8fc",
          200: "#eef2f9",
          300: "#e3e9f4",
          400: "#d3dcec",
          500: "#b9c6e0",
          600: "#96a8cc",
          700: "#0b1224",
          800: "#e9eef7",
          850: "#eef2f9",
          900: "#f4f6fb",
          950: "#ffffff",
        },
        // Dark "frame" scale — used deliberately for Header, Footer, and the
        // ticker tape so they stay a premium dark band bookending the
        // light body, independent of the "navy" flip above.
        frame: {
          800: "#0d1530",
          900: "#080d1f",
          950: "#05070f",
        },
        gold: {
          50: "#fbf6e9",
          100: "#f5e9c4",
          200: "#ecd68f",
          300: "#e0bf5f",
          400: "#cfa347",
          500: "#c9a24b",
          600: "#a9832f",
          700: "#846425",
          800: "#5f481c",
          900: "#3d2e13",
        },
        electric: {
          400: "#3d7fd9",
          500: "#0047AB",
          600: "#003580",
        },
        up: "#1f9d5c",
        down: "#d6394a",
        ink: "#0b1224",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(1200px 600px at 85% -10%, rgba(201,162,75,.14), transparent 60%), radial-gradient(1000px 600px at -10% 10%, rgba(0,71,171,.16), transparent 60%)",
        "gold-gradient": "linear-gradient(120deg, #e0bf5f, #c9a24b 55%, #e0bf5f)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(0,0,0,.6)",
        gold: "0 12px 40px -10px rgba(201,162,75,.4)",
        blue: "0 12px 40px -10px rgba(0,71,171,.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".4" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        floaty: "floaty 5s ease-in-out infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
