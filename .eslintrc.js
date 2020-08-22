module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb/base', 'prettier'],
	plugins: ['html', 'prettier'],
	env: {
		es2020: true,
		browser: true,
	},
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
    },
	rules: {
		'prettier/prettier': 'error',
		'import/prefer-default-export': 'off',
		'linebreak-style': 'off',
		'max-len': 'off',
		'no-unused-vars': 'off',
		'no-shadow': 'off',
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'consistent-return': 'off',
		'prefer-destructuring': 'off',
		'no-restricted-globals': 'off',
		'no-lonely-if': 'off',
	},
};
