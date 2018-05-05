glsl-fast-gaussian-blur
=======================

[![Build Status](https://travis-ci.org/amilajack/glsl-fast-gaussian-blur.svg?branch=master)](https://travis-ci.org/amilajack/glsl-fast-gaussian-blur)
[![Dependency Status](https://img.shields.io/david/dev/amilajack/glsl-fast-gaussian-blur.svg)](https://david-dm.org/amilajack/glsl-fast-gaussian-blur)
[![npm](https://img.shields.io/npm/dm/@amilajack/glsl-fast-gaussian-blur.svg)](https://npm-stat.com/charts.html?package=@amilajack/glsl-fast-gaussian-blur)

Optimized separable gaussian blurs for GLSL. This is adapted from [Efficient Gaussian Blur with Linear Sampling](http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/).

![demo](./img/demo.gif)

## Example

The function blurs in a single direction. For correct results, the texture should be using `gl.LINEAR` filtering.

```glsl
#pragma glslify: blur = require('glsl-fast-gaussian-blur')

uniform vec2 iResolution;
uniform sampler2D iChannel0;
uniform vec2 direction;

void main() {
  vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);
  gl_FragColor = blur(iChannel0, uv, iResolution.xy, direction);
}
```

The module provides three levels of "taps" (the number of pixels averaged for the blur) that can be required individually. The default is 9.

```glsl
#pragma glslify: blur1 = require('glsl-fast-gaussian-blur/13')
#pragma glslify: blur2 = require('glsl-fast-gaussian-blur/9')
#pragma glslify: blur3 = require('glsl-fast-gaussian-blur/5')
```

Since this is separable, you will need multiple passes to blur an image in both directions. See [here](https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson5) for details or [the demo](./demo/index.js) for an implementation.

## Install

Use [npm](https://www.npmjs.com/) to install and [glslify](https://github.com/stackgl/glslify) to consume the function in your shaders.

```sh
# npm
npm install @amilajack/glsl-fast-gaussian-blur
# yarn
yarn add @amilajack/glsl-fast-gaussian-blur
```

## Setup
```bash
git clone https://github.com/amilajack/glsl-fast-gaussian-blur
cd glsl-fast-gaussian-blur
yarn
yarn start
```

## Usage

[![NPM](https://nodei.co/npm/glsl-fast-gaussian-blur.png)](https://www.npmjs.com/package/glsl-fast-gaussian-blur)

#### `vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction)`

Blurs the `image` from the specified `uv` coordinate, using the given `resolution` (size in pixels of screen) and `direction` -- typically either `[1, 0]` (horizontal) or `[0, 1]` (vertical).

Returns the blurred pixel color.

## Further Optimizations

I ran across an article that describes a [linear time gaussian blur](http://blog.ivank.net/fastest-gaussian-blur.html). This is worth investigating.
