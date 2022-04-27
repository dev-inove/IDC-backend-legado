const moduleAlias = require('module-alias');
const path = require('path');

module.exports = moduleAlias.addAliases({
  '@models': path.join(__dirname, '..', 'models'),
  '@controllers': path.join(__dirname, '..', 'controllers'),
  '@config': path.join(__dirname),
  '@service': path.join(__dirname, '..', 'service'),
  '@routes': path.join(__dirname, '..', 'routes'),
});
