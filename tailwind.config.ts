import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@xennis/react-notion-cms-render/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
      },
    },
  },
  plugins: [],
}
export default config
