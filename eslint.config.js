// eslint.config.js
const { defineConfig, globalIgnores } = require("eslint/config");
const tsParser = require("@typescript-eslint/parser");
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = defineConfig([
  globalIgnores([".config/", "dist/", "tsconfig.json"]),
	{
    files: ["**/*.{ts,tsx}"],
		plugins: {
			'@typescript-eslint': tsEslintPlugin,
		},
		languageOptions: {
			parser: tsParser,
		},
		linterOptions: {
			reportUnusedInlineConfigs: "error",
		},
		rules: {
			...tsEslintPlugin.configs.recommended.rules,
			semi: "error",
			"prefer-const": "error",
			// "@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "off"
		},
	},
	eslintConfigPrettier,
]);
