// yarn add webpack webpack-cli
const path = require('path');
// yarn add html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin');
// yarn add clean-webpack-plugin -D
// 每次清理上一次的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 相对路径转绝对路径
const resolvePath = _path => path.resolve(__dirname, _path);

module.exports = {
	mode: 'development',
	entry: resolvePath('../src/index.jsx'),
	output: {
		path: resolvePath('../dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			path: resolvePath('../public/index.html'),
			filename: "index.html",
			title: 'react-app'
		})
	]
}