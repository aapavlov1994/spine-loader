module.exports = function getSpineMapModule(sprite) {
  const { width: spriteWidth, height: spriteHeight } = sprite;
  const output = [];
  output.push(
    `size: ${spriteWidth},${spriteHeight}`,
    'format: RGBA8888',
    'filter: Linear,Linear',
    'repeat: none',
  );

  sprite.map.forEach((image) => {
    const {
      x, y, width, height, key,
    } = image;
    output.push(
      `${key.slice(0, -4).replace(/\\/, '/')}`,
      '  rotate: false',
      `  xy: ${x}, ${y}`,
      `  size: ${width}, ${height}`,
      `  orig: ${width}, ${height}`,
      '  offset: 0, 0',
      '  index: 0',
    );
  });

  const outputString = output.reduce((prev, curr) => `${prev}\n${curr}`, 'sprite.png');

  return `module.exports = \`\n${outputString}\n\`;`;
};
