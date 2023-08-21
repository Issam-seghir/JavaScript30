module.exports = {
	// Specify your Stylelint rules and configurations here

	// Use Prettier for consistent code formatting
	extends: [
		// "stylelint-config-recommended", // Recommended stylelint rules
		"stylelint-config-standard-scss", // for scss , this will use standard config too but for scss so you can delete the first line
		"stylelint-config-html",
		"stylelint-config-clean-order",
	],
	overrides: [
		// {
		// files: ["*.scss", "**/*.scss", "*.sass", "**/*.sass"],
		// customSyntax: "postcss-scss",
		// },
		{
			files: ["*.html", "**/*.html"],
			customSyntax: "postcss-html",
		},
	],
	ignorePatterns: ["**/index-finished.html", "**/style-finished.css"],
	rules: {},
	// lower the security level for all rule
	defaultSeverity: "warning",
	// Automatically fix, where possible, problems reported by rules.
	fix: true,
	//Store the results of processed files so that Stylelint only operates on the changed ones (improve speed & performance).
	cache: true,
};
