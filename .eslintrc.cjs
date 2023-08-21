module.exports = {
	// Specify the environments where your code will run
	env: {
		browser: true,
		es2023: true,
	},
	// Extend configurations from various ESLint plugins
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:security/recommended",
		"plugin:unicorn/recommended",
		"plugin:sonarjs/recommended",
		"plugin:compat/recommended",
		"prettier", // Make sure this is the last,
	],
	plugins: ["html", "import", "simple-import-sort", "unicorn", "sonarjs"],
	// Configure settings for certain plugins
	settings: {
		"import/docstyle": ["jsdoc", "tomdoc"],
	},
	overrides: [
		{
			files: [".eslintrc.{js,cjs}"],
			env: {
				node: true,
			},
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		// Organize imports using simple-import-sort
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",

		// Ensure imports are at the beginning of the file
		"import/first": "error",
		// Require a newline after import statements
		"import/newline-after-import": "error",
		// Prevent duplicate imports
		"import/no-duplicates": "error",
		// Allow empty named blocks in imports (with a warning)
		"import/no-empty-named-blocks": "warn",
	},
};
