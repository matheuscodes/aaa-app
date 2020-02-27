const path = require('path');
const webpack = require('webpack');

module.exports = [{
	devtool: "eval",
  entry: {
    'server': './src/server.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'aaa-[name].js',
    library: "aaa-api",
    libraryTarget: "commonjs2"
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  stats: {
    colors: true,
  },
  target: 'node',
},{
	devtool: "eval",
  entry: {
    'app': './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'aaa-[name].js',
    library: "aaa-app",
    libraryTarget: "window"
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  stats: {
    colors: true,
  },
	node: {
	   fs: "empty"
	},
  target: 'web',
}];
