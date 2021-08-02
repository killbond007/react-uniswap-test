/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	...require('./.dotfiles/eslint'),
	rules: {
		...require('./.dotfiles/eslint').rules,
		'import/no-anonymous-default-export': 0,
	},
}
