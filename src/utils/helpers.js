const fs = require('fs');
const path = require('path');
const findCacheDir = require('find-cache-dir');

const { packageName } = require('../consts');

const cacheThunk = findCacheDir({
  name: packageName,
  create: true,
  thunk: true,
});

const writeFile = (pathToFile, file) => (
  new Promise((resolve) => {
    fs.writeFile(pathToFile, file, resolve);
  })
);

const getSpriteName = (resourcePath) => {
  const array = resourcePath.split(path.sep);
  return array[array.length - 2];
};

const getSpritePath = (loaderInterface) => {
  const spriteName = getSpriteName(loaderInterface.resourcePath);
  // eslint-disable-next-line no-underscore-dangle
  const root = cacheThunk(loaderInterface._compilation.name);
  if (!fs.existsSync(root)) fs.mkdirSync(root);

  return path.resolve(root, `sprite-${spriteName}.png`);
};

module.exports = {
  writeFile,
  getSpritePath,
};
