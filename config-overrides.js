/* eslint-disable @typescript-eslint/no-var-requires */
const { disableEsLint, override } = require('customize-cra')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const configOverrides = require('./.dotfiles/config-overrides')

module.exports = {
	webpack: override(
		disableEsLint(),
		(config, env) => {
			const Config = configOverrides.webpack(config, env)

			/* The MiniCssExtractPlugin doesn't take kindly to us having two Less loaders, but in our
			 * particular case, CSS file ordering appears correct in build outputs and we can afford to
			 * disable the ordering warning. We only need to do so in production configs, though. The
			 * development config doesn't have the plugin. */
			const miniCssPlugin = Config.plugins.find((plugin) => plugin instanceof MiniCssExtractPlugin)
			if (miniCssPlugin) {
				miniCssPlugin.options.ignoreOrder = true
			}

			return Config
		}
	),
	jest: (config) => configOverrides.jest(config),
}
