var path = require("path");

module.exports = {
	context: path.resolve(__dirname, "./src"),
	entry: "./application/EyeSpy",
	output: {
		filename: "EyeSpy.js",
		path: path.resolve(__dirname, "build")
	},
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, "./src/*"),
			exclude: [
				path.resolve(__dirname, "./src/application/Background.js")
			],
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
					  ['es2015', { modules: false }]
					]
				}
			}]
		}]
	}
};