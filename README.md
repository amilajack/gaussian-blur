gaussian-blur
=======================

[![Test](https://github.com/amilajack/gaussian-blur/actions/workflows/test.yml/badge.svg)](https://github.com/amilajack/gaussian-blur/actions/workflows/test.yml)
[![Dependency Status](https://img.shields.io/david/amilajack/gaussian-blur.svg)](https://david-dm.org/amilajack/gaussian-blur)

Optimized separable gaussian blurs for GLSL. This is adapted from [Efficient Gaussian Blur with Linear Sampling](http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/).

![demo](./img/demo.gif)

## Installation
```bash
yarn add gaussian-blur
```

## Usage
```js
import GaussianBlur from 'gaussian-blur';

const blur = new GaussianBlur();
await blur.setImage('./foo.jpg');
blur.changeBlurRadius(5);
```

## Running examples
```bash
git clone https://github.com/amilajack/gaussian-blur
cd gaussian-blur
yarn
# Run the example
yarn start
# Build the lib
yarn build
```

## Related

* https://github.com/flozz/StackBlur
* https://github.com/pcwalton/fast-gaussian
* https://github.com/Jam3/glsl-fast-gaussian-blur
