var path = require("path");

module.exports = {
	context: path.resolve(__dirname, "./src"),
	entry: "./application/EyeSpy",
	devtool: "eval-cheap-source-map",
	output: {
		filename: "EyeSpy.js",
		path: path.resolve(__dirname, "build")
	},
	resolve: {
		alias: {
			"jquery": path.resolve(__dirname, "./node_modules/jquery/dist/jquery.min.js")
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, "./src/*"),
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
					  ['es2015', { modules: false }]
					]
				}
			}]
		}]
	},
};