var path = require('path');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: "./application/EyeSpy",
	output: {
		filename: 'EyeSpy.js',
		path: path.resolve(__dirname, 'build')
	}
};