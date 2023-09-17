import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Enable styled-jsx
    jsxFramework: 'react',

    // Where to look for your css declarations
    include: ["./src/components/**/*.{js,jsx,ts,tsx}", "./src/app/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
      extend: {
        textStyles: {
          body: {
            value: {
              fontWeight: '400',
              fontSize: 'md',
            }
          },
          h1: {
            value: {
              fontWeight: 'bold',
              fontSize: '5xl',
            }
          },
          h2: {
            value: {
              fontWeight: 'semibold',
              fontSize: '2xl',
            }
          },
        },
        tokens: {
          colors: {
            primary: {
              value: "#D13953"
            },
            secondary: {
              value: "#18203D"
            },
            text: {
              value: "#E8E9EB"
            },
            paper: {
              value: "#E0DFD5"
            }
          }
        }
      }
    },

    // The output directory for your css system
    outdir: "styled-system",
})