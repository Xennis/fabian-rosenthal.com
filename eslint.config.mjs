import jsxA11y from "eslint-plugin-jsx-a11y"
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat()

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: { "jsx-a11y": jsxA11y },
  },
  ...compat.extends("plugin:jsx-a11y/recommended"),
]
