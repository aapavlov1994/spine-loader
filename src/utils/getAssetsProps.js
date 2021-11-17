const path = require('path');
const { emptyAssetProps } = require('../consts');

const getExistName = (...values) => `${values.find((val) => typeof val !== 'undefined')}.png`;
const getEmptyAssetsProps = (key) => ({ ...emptyAssetProps, key });

module.exports = function getAssetsProps(config, skins) {
  const assets = {};
  const emptyAssetsProps = [];
  config.skins.forEach((skin) => {
    Object.keys(skin.attachments).forEach((slotName) => {
      Object.keys(skin.attachments[slotName]).forEach((entryName) => {
        const attachment = skin.attachments[slotName][entryName];
        const newName = getExistName(attachment.path, attachment.name, entryName);
        if (!skins.has(skin.name)) emptyAssetsProps.push(getEmptyAssetsProps(newName));
        else assets[newName] = path.resolve(this.resourcePath, '../images', newName);
      });
    });
  });
  return { assets, emptyAssetsProps };
};
