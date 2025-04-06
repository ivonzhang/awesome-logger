// eslint.config.js
const { defineConfig, globalIgnores } = require("eslint/config");
const tsParser = require("@typescript-eslint/parser");
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = defineConfig([
  globalIgnores([".config/", "dist/", "tsconfig.json"]),
	{
    files: ["**/*.{ts,tsx}"],
		plugins: {
			'@typescript-eslint': tsEslintPlugin,
			'prettier': eslintPluginPrettier,
		},
		languageOptions: {
			parser: tsParser,
		},
		linterOptions: {
			reportUnusedInlineConfigs: "error",
		},
		rules: {
			...tsEslintPlugin.configs.recommended.rules,
			...eslintConfigPrettier.rules,
			...eslintPluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'error',
			semi: "error",
			"prefer-const": "error",
			// "@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "off"
		},
	},
]);
