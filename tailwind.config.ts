import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        around: "0 0 15px 5px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        primary: {
          DEFAULT: "#80D5D4",
          container: "9CF1F0",
        },
        secondary: {
          DEFAULT: "#B0CCCB",
          container: "#324B4B",
        },
        tertiary: {
          DEFAULT: "#B3C8E8",
          container: "#334863",
        },
        error: {
          DEFAULT: "#FFB4AB",
          container: "#93000A",
        },
        surface: {
          DEFAULT: "#0E1514",
          variant: "#3F4948",
          container: {
            1: "#090F0F",
            2: "#161D1D",
            3: "#1A2121",
            4: "#252B2B",
            5: "#2F3636",
          },
        },
        outline: {
          DEFAULT: "#889392",
          variant: "#3F4948",
        },
        on: {
          primary: {
            DEFAULT: "#003737",
            container: "#004F4F",
          },
          secondary: {
            DEFAULT: "#1B3534",
            container: "#CCE8E7",
          },
          tertiary: {
            DEFAULT: "#1C314B",
            container: "#D3E4FF",
          },
          error: {
            DEFAULT: "#690005",
            container: "#FFDAD6",
          },
          surface: {
            DEFAULT: "#DDE4E3",
            variant: "#BEC9C8",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { maxHeight: "1rem" },
          "50%": { maxHeight: "10rem" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
