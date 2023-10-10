import { defineConfig } from "@pandacss/dev";
import { darken } from "polished";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Enable styled-jsx
  jsxFramework: "react",

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.tsx",
    "./src/app/**/*.tsx",
    "./src/modules/**/*.tsx",
    "./src/stories/**/*.tsx",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles: {
        body: {
          value: {
            fontWeight: "400",
            fontSize: "md",
          },
        },
        h1: {
          value: {
            fontWeight: "bold",
            fontSize: "6xl",
            lineHeight: "1",
          },
        },
        h2: {
          value: {
            fontWeight: "semibold",
            fontSize: "xl",
            lineHeight: "1.25",
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            DEFAULT: { value: "{colors.primary}" },
            hover: { value: darken(0.1, "#D13953") }
          }
        }
      },
      tokens: {
        colors: {
          primary: {
            value: "#D13953",
          },
          secondary: {
            value: "#18203D",
          },
          text: {
            value: "#E8E9EB",
          },
          paper: {
            value: "#E0DFD5",
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
