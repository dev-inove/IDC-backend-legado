const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAliases({
  '~': path.join(__dirname, '..'),
  '@models': path.join(__dirname, '..', 'models'),
  '@controllers': path.join(__dirname, '..', 'controllers'),
});
