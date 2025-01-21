import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "inherit",
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
              },
            },
            '[class~="lead"]': {
              color: "inherit",
            },
            strong: {
              color: "inherit",
            },
            "ul > li::before": {
              backgroundColor: "currentColor",
            },
            hr: {
              borderColor: "currentColor",
              opacity: 0.3,
            },
            blockquote: {
              color: "inherit",
              borderLeftColor: "currentColor",
            },
            h1: {
              color: "inherit",
            },
            h2: {
              color: "inherit",
            },
            h3: {
              color: "inherit",
            },
            h4: {
              color: "inherit",
            },
            code: {
              color: "inherit",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "inherit",
            },
            pre: {
              backgroundColor: "#1a1b26",
              color: "#a9b1d6",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
