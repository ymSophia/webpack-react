const { merge } = require('webpack-merge')
const {
	resolvePath,
	baseConfig
} = require('./webpack.base.config');
// yarn add css-minimizer-webpack-plugin -D
// 压缩css文件，只在生产环境需要
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(baseConfig, {
	mode: 'production',
	devtool: 'inline-source-map',
	optimization: {
		minimizer: [
			new CssMinimizerPlugin()
		]
	}
})