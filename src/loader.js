const { create } = require('multi-sprite-creator');
const getLoaderOutputModule = require('./utils/getLoaderOutputModule');
const getOptions = require('./utils/getOptions');
const getAssetsProps = require('./utils/getAssetsProps');
const { writeFile, getSpritePath } = require('./utils/helpers');
const { defaultSpriteConfig } = require('./consts');

async function spineLoader(buffer) {
  const spineConfig = JSON.parse(buffer);
  const { skins, scale } = getOptions.call(this, spineConfig);
  const onComplete = this.async();
  const { assets, emptyAssetsProps } = getAssetsProps.call(this, spineConfig, skins);
  const [sprite] = await create(assets, { ...defaultSpriteConfig, scale });
  sprite.map = [...sprite.map, ...emptyAssetsProps];
  const spritePath = getSpritePath(this);
  await writeFile(spritePath, sprite.image);
  this.resolve(spritePath, '', () => { this.dependency(spritePath); });
  const output = getLoaderOutputModule(spineConfig, spritePath, sprite, scale);
  onComplete(null, output);
}

module.exports = spineLoader;
