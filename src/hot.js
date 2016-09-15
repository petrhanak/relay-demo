var chokidar = require('chokidar');
var webpack = require('webpack');
var path = require('path');
var config = require('../webpack.config');

module.exports = function (app) {
  var watcher = chokidar.watch(
    path.resolve(__dirname, '..', 'build', 'router.js')
  );

  watcher.on('ready', function () {
    watcher.on('all', function () {
      Object.keys(require.cache).forEach(function (id) {
        if (path.resolve(__dirname, '..', 'build', 'router.js') == id) delete require.cache[id]
      })
    });
  });

  var compiler = webpack(config);

  compiler.watch({
    aggregateTimeout: 300
  }, function (err, stats) {
  });
};