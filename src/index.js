var express = require('express');
var config = require('./config');

var app = express();

if(config.hot) {
  require('./hot')(app);
}

app.use(function (req, res, next) {
  require('../build/router').default(req, res, next);
});

app.listen(config.port);