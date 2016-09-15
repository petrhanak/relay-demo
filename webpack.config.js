var path = require('path');
var webpack = require('webpack');

var client = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  entry: {
    main: [
      path.resolve(__dirname, 'src', 'client', 'index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '/static/'
  }
};

var server = {
  entry: path.resolve(__dirname, 'src', 'router', 'index.js'),
  target: 'node',
  output: {
    filename: 'router.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
};


module.exports = [
  // client,
  server
];