var path = require("path");

module.exports = {
	context: path.resolve(__dirname, "./src"),
	entry: "./application/EyeSpy",
	output: {
		filename: "Build.js",
		path: path.resolve(__dirname, "build")
	},
	resolve: {
		alias: {
			"jquery": path.resolve(__dirname, "./node_modules/jquery/dist/jquery.min.js")
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, "./src/*"),
				use: [{
					loader: "babel-loader",
					options: {
						presets: [
						  ["es2015", { modules: false }]
						]
					}
				}]
			}, {
				enforce: "pre",
				test: /\.ts(x)?$/,
				include: path.resolve(__dirname, "./src/*"),
				use: [{
					loader: "source-map-loader"
				}]
			}
		]
	},
	devtool: "inline-source-map"
};