const js = require("@eslint/js");
const globals = require("globals");
const eslintConfigPrettier = require("eslint-config-prettier");

const rules = {
  indent: ["error", 2],
  "linebreak-style": ["error", "unix"],
  semi: ["error", "always"],
  "no-var": "error",
  "prefer-const": "error",
};

module.exports = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["dist/**/*.js"],
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
      },
    },
    rules: rules,
  },
  {
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    rules: rules,
  },
];
