const getSpineMapModule = require('./getSpineMapModule');

module.exports = function getOutput(spineConfig, spriteImagePath, sprite, scale) {
  const outputConfig = { ...spineConfig };
  delete outputConfig.skeleton.images;
  outputConfig.skeleton.scale = scale;
  const skeletonString = JSON.stringify(spineConfig.skeleton);
  delete outputConfig.skeleton;

  const mapString = getSpineMapModule(sprite);

  return 'const output = {};\n'
    + `output.skeleton = ${skeletonString};\n`
    + 'output.skeleton.sprite = {};\n'
    + `output.skeleton.sprite.src = require(${JSON.stringify(spriteImagePath)});\n`
    + `output.skeleton.sprite.map =${mapString};\n`
    + `Object.assign(output, ${JSON.stringify(outputConfig)});`
    + 'module.exports = output;';
};
