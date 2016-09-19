var express = require('express');
var config = require('./config');
var path = require('path');

var app = express();

if(config.hot) {
  var hot = require('./hot');
  var webpackConfig = require('../webpack.dev.config');
  hot(app, webpackConfig);
}

app.use(function (req, res, next) {

  // Object.keys(require.cache).forEach(function(id) {
  //   if (!/[\/\\]node_modules[\/\\]/.test(id)) console.log(id);
  // });
  require('./router/index').default(req, res, next);
});

console.log('ok');

app.listen(config.port);