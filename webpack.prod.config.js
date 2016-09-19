var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var _ = require('lodash');

var common = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'babel-loader'
      }
    ]
  }
};

var client = _.merge({}, common, {
  entry: {
    main: [
      path.resolve(__dirname, 'src', 'client', 'index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build', 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '/static/'
  }
});

var server = _.merge({}, common, {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [nodeExternals()],
});


module.exports = [
  client,
  server
];