const { defaultSpriteConfig } = require('../consts');

const options = {
  scale: defaultSpriteConfig.scale,
  skins: new Set(['default']),
};
/**
 *
 * @param { Object } spineConfig
 * @returns {{skins: Set<string>, scale: number}}
 */
module.exports = function getOptions(spineConfig) {
  const readOptions = {};
  Object.keys(options).forEach((name) => {
    readOptions[name] = (this.getOptions && this.getOptions()[name])
    || (typeof this.resourceQuery === 'string'
      && this.resourceQuery !== ''
      && JSON.parse(this.resourceQuery.replace(/^\?/, ''))[name])
    || (typeof this.query === 'object' && this.query[name]); // webpack4
  });

  const { skins } = options;
  if (readOptions.skins) readOptions.skins.forEach((skin) => { skins.add(skin); });
  else spineConfig.skins.forEach(({ name }) => { skins.add(name); });

  const scale = readOptions.scale || options.scale;

  return { scale, skins };
};
