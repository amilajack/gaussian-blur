import triangle from "a-big-triangle";
import createShader from "gl-shader";
import createFBO from "gl-fbo";
import loop from "raf-loop";
import texture2D from "gl-texture2d";
import vert from "./vert.glsl";
import frag from "./frag.glsl";

export default class Gaussian {
  private gl: WebGL2RenderingContext;

  private shader: typeof createShader;

  private texture: typeof texture2D;

  constructor(canvas: HTMLCanvasElement, img: HTMLImageElement) {
    this.gl = canvas.getContext("webgl2")!;

    const width = this.gl.drawingBufferWidth;
    const height = this.gl.drawingBufferHeight;
    const texture = texture2D(this.gl, img);

    const shader = createShader(this.gl, vert, frag);
    shader.bind();
    shader.uniforms.iResolution = [width, height, 0];
    shader.uniforms.iChannel0 = 0;

    this.fboA = createFBO(this.gl, [width, height]);
    this.fboB = createFBO(this.gl, [width, height]);

    // apply linear filtering to get a smooth interpolation
    const textures = [texture, this.fboA.color[0], this.fboB.color[0]];
    const setParameters = (texture: typeof texture2D) => {
      texture.wrapS = texture.wrapT = this.gl.REPEAT;
      texture.minFilter = this.gl.LINEAR;
      texture.magFilter = this.gl.LINEAR;
    };
    textures.forEach(setParameters);
    this.texture = texture;
    this.shader = shader;
  }

  draw(iterations: number, anim: number) {
    let { fboA: writeBuffer, fboB: readBuffer, texture, shader, gl } = this;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    for (let i = 0; i < iterations; i += 1) {
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
}
