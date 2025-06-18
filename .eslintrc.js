module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "prettier", // Make sure this is last to override other configs
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "import"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // React rules
    "react/react-in-jsx-scope": "off", // Not needed in Next.js
    "react/prop-types": "off", // We use TypeScript for prop validation
    "react/jsx-uses-react": "off", // Not needed with React 17+
    "react/jsx-props-no-spreading": "off", // Allow JSX prop spreading
    "react/display-name": "off", // Allow anonymous components

    // TypeScript rules
    "@typescript-eslint/explicit-module-boundary-types": "off", // Not needed with TypeScript inference
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn on unused vars except those starting with _
    "@typescript-eslint/no-explicit-any": "warn", // Discourage use of 'any' type
    "@typescript-eslint/ban-ts-comment": "warn", // Warn on TypeScript directive comments

    // Import rules
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "never",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],

    // General rules
    "no-console": ["warn", { allow: ["warn", "error"] }], // Warn on console.log, allow console.warn and console.error
    "jsx-a11y/anchor-is-valid": "off", // Next.js uses <a> tags in Link components

    // Next.js specific rules
    "@next/next/no-img-element": "off", // Allow <img> tags for simplicity
  },
  overrides: [
    // Override rules for specific file patterns
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off", // Allow require in JS files
      },
    },
  ],
}
