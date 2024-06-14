import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        around: "0 0 15px 5px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        background: {
          DEFAULT: "#161616",
        },
        strong: {
          1: "#6F6F6F",
          2: "#8d8d8d",
          3: "#a8a8a8",
        },
        subtle: {
          1: "#525252",
          2: "#6f6f6f",
          3: "#8d8d8d",
        },
        support: {
          info: "#4589FF",
          success: "#42BE65",
          error: "#FA4D56",
        },
        border: {
          DEFAULT: "#333333",
          interactive: "#4589FF",
        },
        field: {
          1: "#262626",
          2: "#393939",
          3: "#525252",
          hover: {
            1: "#333333",
            2: "#474747",
            3: "#636363",
          },
        },
        inverse: "#161616",
        layer: {
          1: "#262626",
          2: "#393939",
          3: "#525252",
          accent: {
            1: "#393939",
          },
        },
        primary: {
          text: "#F4F4F4",
          link: "#78A9FF",
          btn: {
            DEFAULT: "#0F62FE",
            hover: "#0050E6",
          },
        },
        secondary: {
          text: "#C6C6C6",
          btn: {
            DEFAULT: "#6F6F6F",
            hover: "#5E5E5E",
            active: "#393939",
          },
        },
        danger: {
          text: {
            DEFAULT: "#FA4D56",
          },
          btn: {
            DEFAULT: "#DA1E28",
            hover: "#B81922",
          },
        },
        tertiary: {
          btn: {
            DEFAULT: "#ffffff",
            hover: "#F4F4F4",
            active: "#C6C6C6",
          },
        },
        error: {
          support: "#FA4D56",
          text: "#FF8389",
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
