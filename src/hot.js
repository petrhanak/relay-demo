var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var requireModulesWithWebpack = require('./requireModulesWithWebpack');


module.exports = function (app, webpackConfig) {
  var compiler = webpack(webpackConfig);

  requireModulesWithWebpack.setup(webpackConfig);

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    quiet: true,
    publicPath: webpackConfig[0].output.publicPath,
    serverSideRender: true,
    reporter: function () {
      requireModulesWithWebpack.patch(devMiddleware);
    }
  });

  // requireModulesWithWebpack(devMiddleware, webpackConfig);

  var hotMiddleware = require('webpack-hot-middleware')(compiler);

  app.use(devMiddleware);
  app.use(hotMiddleware);
};