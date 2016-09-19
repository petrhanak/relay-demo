var path = require('path');

var ioFileGroups = [];

// todo add support for multiple entries
function getFile(configNode) {
  if (typeof configNode === 'string') {
    return configNode
  } else {
    return path.resolve(configNode.path, configNode.filename)
  }
}

function processConfig(config) {
  //skip non-server config
  if (config.target !== 'node') {
    return;
  }

  if (!config.output.libraryTarget.startsWith('commonjs')) {
    throw "You must set libraryTarget to commonjs in webpack config"
  }

  ioFileGroups.push({
    inputFile: getFile(config.entry),
    outputFile: getFile(config.output)
  })
}

function setup(webpackConfig) {
  if (Array.isArray(webpackConfig)) {
    webpackConfig.forEach(function (config) {
      processConfig(config)
    });
  } else if (typeof webpackConfig === 'object') {
    processConfig(webpackConfig)
  } else {
    throw 'Provided webpack config is invalid'
  }
}

function patch(devMiddleware) {
  ioFileGroups.forEach(function (iofileGroup) {
    var moduleBuffer = devMiddleware.fileSystem.readFileSync(iofileGroup.outputFile);

    var m = new module.constructor();
    m._compile(moduleBuffer.toString(), iofileGroup.inputFile);

    require.cache[iofileGroup.inputFile] = m;
  });
}

module.exports = {
  setup: setup,
  patch: patch
};