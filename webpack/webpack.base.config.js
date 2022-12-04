// yarn add webpack webpack-cli
const path = require('path');
// yarn add html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin');
// yarn add clean-webpack-plugin -D
// 每次清理上一次的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// yarn add --save-dev mini-css-extract-plugin -D
// 打包后生成单独的css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 相对路径转绝对路径
const resolvePath = _path => path.resolve(__dirname, _path);

const baseConfig = {
	entry: resolvePath('../src/index.tsx'),
	output: {
		path: resolvePath('../dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			// yarn add style-loader css-loader -D
			// 从左往右执行loader
			{
				test: /\.css$/,
				// 原本use: ['style-loader', 'css-loader', 'postcss-loader']的style-loader会冲突
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(js|ts)x?$/,
				use: 'babel-loader'
			},
			{
				test: /\.svg$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: resolvePath('../public/index.html'),
			filename: "index.html",
			title: 'react-app'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash:8].css'
		})
	]
}

// 区分环境配置，合并配置 yarn add webpack-merge -D
module.exports = {
	resolvePath,
	baseConfig
}
