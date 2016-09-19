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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
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
  entry: path.resolve(__dirname, 'src', 'router', 'index.js'),
  target: 'node',
  output: {
    filename: 'router.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2',
  },
});


module.exports = [
  client,
  server
];