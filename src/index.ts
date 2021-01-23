import triangle from "a-big-triangle";
import createShader from "gl-shader";
import createFBO from "gl-fbo";
import loop from "raf-loop";
import loadImage from "load-img";
import demoImg from "../img/demo.jpg";
import vert from "./vert.glsl";
import frag from "./frag.glsl";

let gl: WebGL2RenderingContext;

const getBase64FromImageUrl = (url: string): Promise<string> => {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = url;

  return new Promise((resolve) => {
    img.onload = function onload() {
      const { height, width } = img;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const offscreenCanvas = document.createElement("canvas");
      gl = offscreenCanvas.getContext("webgl2")!;
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0);

      document.body.appendChild(canvas);
      document.body.appendChild(offscreenCanvas);
      return resolve(canvas.toDataURL("image/png"));
    };
  });
};

getBase64FromImageUrl(demoImg).then((uri) => {
  loadImage(uri, start);
});

function start(err, image) {
  if (err) throw err;

  const width = gl.drawingBufferWidth;
  const height = gl.drawingBufferHeight;
  const texture = require("gl-texture2d")(gl, image);

  const shader = createShader(gl, vert, frag);
  shader.bind();
  shader.uniforms.iResolution = [width, height, 0];
  shader.uniforms.iChannel0 = 0;

  const fboA = createFBO(gl, [width, height]);
  const fboB = createFBO(gl, [width, height]);

  // apply linear filtering to get a smooth interpolation
  const textures = [texture, fboA.color[0], fboB.color[0]];
  textures.forEach(setParameters);

  let time = 0;

  loop(render).start();

  function render(dt: number) {
    time += dt / 1000;
    gl.viewport(0, 0, width, height);

    const anim = Math.sin(time) * 0.5 + 0.5;
    const iterations = 8;
    let writeBuffer = fboA;
    let readBuffer = fboB;

    for (let i = 0; i < iterations; i += 1) {
      // we will approximate a larger blur by using
      // multiple iterations starting with a very wide radius
      const radius = (iterations - i - 1) * anim;

      // draw blurred in one direction
      writeBuffer.bind();
      if (i === 0) {
        texture.bind();
      } else {
        readBuffer.color[0].bind();
      }
      shader.bind();
      shader.uniforms.flip = true;
      shader.uniforms.direction = i % 2 === 0 ? [radius, 0] : [0, radius];
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      triangle(gl);

      // swap buffers
      const t = writeBuffer;
      writeBuffer = readBuffer;
      readBuffer = t;
    }

    // draw last FBO to screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    writeBuffer.color[0].bind();
    shader.uniforms.direction = [0, 0]; // no blur
    shader.uniforms.flip = iterations % 2 !== 0;
    triangle(gl);
  }

  function setParameters(texture) {
    texture.wrapS = texture.wrapT = gl.REPEAT;
    texture.minFilter = gl.LINEAR;
    texture.magFilter = gl.LINEAR;
  }
}
