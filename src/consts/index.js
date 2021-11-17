const { name: packageName } = require('../../package.json');

const defaultSpriteConfig = {
  scale: 1, padding: 1, width: 1999, height: 1999,
};
const emptyAssetProps = {
  x: 0, y: 0, width: 1, height: 1,
};

module.exports = {
  packageName,
  defaultSpriteConfig,
  emptyAssetProps,
};
