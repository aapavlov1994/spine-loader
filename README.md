# spine-loader
Webpack loader for configurating spine-animations

### Usage

`npm i spine-loader --save-dev`

```javascript
// webpack config
rules.push({
  type: 'javascript/auto',
  test: /\.json$/,
  include: /spine/,
  loader: 'spine-loader',
});
// some place in src
const config = require('@/assets/spine/goblin/index.json')
```

A typical structure of file with animations should
look like (separate assets in "images" subdirs
near with single json file):

![img.png](readme_assets/structure.jpg)

### Loader options

There are two additional loader options: scale and skins
for including only useful assets with chosen resolution.

```javascript
// you can specify options like this
rules.push({
  type: 'javascript/auto',
  test: /\.json$/,
  include: /spine/,
  loader: 'spine-loader',
  options: {
    scale: 0.5,
    skins: ['RED_SKIN', 'BLUE_SKIN']
  }
});
// or like this
const config = require('@/assets/spine/goblin/index.json?{"scale":0.2}')
```
