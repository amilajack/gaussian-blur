/* eslint @typescript-eslint/ban-ts-comment: off */
import triangle from "a-big-triangle";
import createShader from "gl-shader";
import createFBO from "gl-fbo";
import texture2D from "gl-texture2d";
import vert from "./vert.glsl";
import frag from "./frag.glsl";

type Shader = ReturnType<typeof createShader>;

type Texture = ReturnType<typeof texture2D>;

type FrameBuffer = ReturnType<typeof createFBO>;

const DEFAULT_OPTS = { resize: true };

export default class Gaussian {
  gl: WebGL2RenderingContext;

  private shader: Shader;

  private texture: Texture;

  private fboA: FrameBuffer;

  private fboB: FrameBuffer;

  private resizeEvent?: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    opts = DEFAULT_OPTS
  ) {
    const options = { ...DEFAULT_OPTS, ...opts };
    this.gl = canvas.getContext("webgl2")!;

    let width = this.gl.drawingBufferWidth;
    let height = this.gl.drawingBufferHeight;
    const texture = texture2D(this.gl, img);

    const shader = createShader(this.gl, vert, frag);
    shader.bind();
    shader.uniforms.iResolution = [width, height, 0];
    shader.uniforms.iChannel0 = 0;

    this.fboA = createFBO(this.gl, [width, height]);
    this.fboB = createFBO(this.gl, [width, height]);

    // apply linear filtering to get a smooth interpolation
    const textures = [texture, this.fboA.color[0], this.fboB.color[0]];
    const setParameters = (tex: Texture) => {
      // wrapS and wrapT type defs are out of date
      // @ts-ignore
      tex.wrapS = this.gl.REPEAT;
      // @ts-ignore
      tex.wrapT = this.gl.REPEAT;
      tex.minFilter = this.gl.LINEAR;
      tex.magFilter = this.gl.LINEAR;
    };
    textures.forEach(setParameters);
    this.texture = texture;
    this.shader = shader;

    if (options.resize) {
      this.resizeEvent = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ({ width, height } = this.gl.canvas);
        this.gl.viewport(0, 0, width, height);
        this.fboA = createFBO(this.gl, [width, height]);
        this.fboB = createFBO(this.gl, [width, height]);
        shader.uniforms.iResolution = [width, height, 0];
        this.gl.viewport(0, 0, canvas.width, canvas.height);
      };
      window.addEventListener("resize", this.resizeEvent);
    }
  }

  destroy() {
    if (this.resizeEvent)
      window.removeEventListener("resize", this.resizeEvent);
  }

  draw(iterations: number, radiusDelta = 1) {
    let { fboA: writeBuffer, fboB: readBuffer } = this;
    const { texture, shader, gl } = this;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    for (let i = 0; i < iterations; i += 1) {
      const radius = (iterations - i - 1) * radiusDelta;
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
