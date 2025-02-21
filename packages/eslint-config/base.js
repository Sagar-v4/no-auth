import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: [
      "coverage",
      "**/public",
      "**/dist",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
    ],
  },
];
