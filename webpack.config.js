const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

require('dotenv').config()
console.log(process.env.APP_ENV)

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new DefinePlugin({
			"FB_API_KEY": JSON.stringify(process.env.FB_API_KEY),
			"FB_AUTH_DOMAIN": JSON.stringify(process.env.FB_AUTH_DOMAIN), 
			"FB_DATABASE_URL": JSON.stringify(process.env.FB_DATABASE_URL),
			"FB_PROJECT_ID": JSON.stringify(process.env.FB_PROJECT_ID),
			"FB_STORAGE_BUCKET": JSON.stringify(process.env.FB_STORAGE_BUCKET),
			"FB_MESSAGING_SENDER_ID": JSON.stringify(process.env.FB_MESSAGING_SENDER_ID),
			"FB_APP_ID": JSON.stringify(process.env.FB_APP_ID) 
		})
	],
	devtool: prod ? false: 'source-map'
};
