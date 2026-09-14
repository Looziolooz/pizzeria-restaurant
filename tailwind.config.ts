import type { Config } from "tailwindcss";

/** Tailwind config — extended with Bold Kinetic tokens */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Knockout", "Oswald", "Anton", "Bebas Neue", "sans-serif"],
        wide: ["Anton", "Knockout", "Oswald", "sans-serif"],
        xl: ["Anton", "Knockout", "Oswald", "sans-serif"],
        // explicit aliases used across the prototype markup
        "display-xl": ["Anton", "Knockout", "Oswald", "sans-serif"],
        support: ["Gotham", "Montserrat", "system-ui", "sans-serif"],
        sans: ["Gotham", "Montserrat", "system-ui", "sans-serif"],
        // legacy alias used in admin code
        serif: ["Knockout", "Oswald", "Anton", "Bebas Neue", "sans-serif"],
      },
      colors: {
        bk: {
          white: "#FFFFFF",
          ink: "#363636",
          black: "#000000",
          green: "#075C40",
          greenDeep: "#053D2A",
          greenSoft: "#0a7551",
          yellow: "#FFDD00",
          yellowDeep: "#F0CC00",
          blue: "#74C3D5",
          blueTint: "#CFE8EF",
          teal: "#003B4A",
          cream: "#E8E6D9",
          border: "#DDDDDD",
          muted: "#999999",
          field: "#EEEEEE",
          open: "#72CE16",
          openBg: "#B5ED7C",
          closed: "#9E0B00",
          closedBg: "#F44336",
        },
        // ── Legacy aliases (used by admin.tsx) mapped to BK palette ──
        sand: { DEFAULT: "#FFFFFF", deep: "#FFF8D6" }, // page surfaces → cream-tinted
        forno: "#053D2A", // admin sidebar dark
        ink: { DEFAULT: "#363636", 2: "#666666", muted: "#999999" },
        line: { DEFAULT: "#DDDDDD", strong: "#BBBBBB" },
        walnut: { DEFAULT: "#075C40", light: "#0a7551" }, // → BK green
        tomato: { DEFAULT: "#075C40", deep: "#053D2A", light: "#0a7551" }, // primary stays green
        cream: "#FFFFFF",
        amber: "#FFDD00",
        olive: { DEFAULT: "#72CE16" },
      },
      letterSpacing: {
        caps: "0.04em",
        wider: "0.06em",
        "wide-2": "0.18em",
        eyebrow: "0.18em",
      },
      transitionTimingFunction: {
        sig: "cubic-bezier(0.6, 0.04, 0.12, 0.96)",
        gentle: "cubic-bezier(0.6, 0.04, 0.12, 0.96)",
      },
      maxWidth: {
        page: "1480px",
        content: "1280px",
        narrow: "880px",
      },
    },
  },
  plugins: [],
};

export default config;
