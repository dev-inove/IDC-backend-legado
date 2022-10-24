const moduleAlias = require('module-alias');
const path = require('path');

module.exports = moduleAlias.addAliases({
  '@modules':path.join(__dirname, '..', 'modules'),
  '@shared':path.join(__dirname, '..', 'shared'),
  '@config': path.join(__dirname),
});
