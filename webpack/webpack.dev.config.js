const { merge } = require('webpack-merge')
const {
	resolvePath,
	baseConfig
} = require('./webpack.base.config');

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		host: '127.0.0.1',
		port: 9000,
		hot: true,
		open: true,
		devMiddleware: {
			writeToDisk: true // 不然dist下的文件会被插件直接清除
		}
	},
})