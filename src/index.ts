import triangle from "a-big-triangle";
import createShader from "gl-shader";
import createFbo from "gl-fbo";
import loadImage from "load-img";
import glTexture2d from "gl-texture2d";
import webglContext from "webgl-context";
import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";

interface Texture {
  readonly minFilter: number,
  readonly magFilter: number,
}

export default class GaussianBlur {
  private blurRadius: number;

  private imageUri?: string;

  private image?: HTMLImageElement;

  private gl: WebGLRenderingContext;

  constructor(
    opts: { blurRadius?: number } = {}
  ) {
    this.blurRadius = opts.blurRadius || 50;
  }

  private setParameters(texture: Texture): void {
    texture.wrapS = texture.wrapT = this.gl.REPEAT
    texture.minFilter = this.gl.LINEAR
    texture.magFilter = this.gl.LINEAR
  }

  private getBase64FromImageUrl(url: string): Promise<string> {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;

    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const {width, height} = img;
        canvas.width = width;
        canvas.height = height;

        this.gl = webglContext({
          width: width,
          height: height,
        });
        console.log(this.gl)
        document.body.appendChild(this.gl.canvas);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error('canvas context could not be initialized')
        ctx.drawImage(img, 0, 0);

        return resolve(canvas.toDataURL("image/png"));
      };
    });
  }

  async setImage(url: string): Promise<void> {
    this.imageUri = await this.getBase64FromImageUrl(url);
    return new Promise((resolve, reject) => {
      loadImage(this.imageUri, (err: Error, image: HTMLImageElement) => {
        if (err) reject(err);
        this.image = image;
        this.changeBlurRadius(this.blurRadius);
        resolve();
      });
    });
  }

  /**
   * Animate the blur from one radius to another. Resolve the promise when animation is done
   * @TODO: Add the args `opts?: { animate: bool } = { animate: true }`
   */
  changeBlurRadius(blurRadius: number) {
    this.blurRadius = blurRadius;

    const width = this.gl.drawingBufferWidth;
    const height = this.gl.drawingBufferHeight;

    // Create texture
    const texture = glTexture2d(this.gl, this.image);

    // Create shader
    const shader = createShader(this.gl, vertexShader, fragmentShader);
    shader.bind();
    shader.uniforms.iResolution = [width, height, 0];
    shader.uniforms.iChannel0 = 0;

    const fboA = createFbo(this.gl, [width, height]);
    const fboB = createFbo(this.gl, [width, height]);

    this.gl.viewport(0, 0, width, height);

    const iterations = 8;
    let writeBuffer = fboA;
    let readBuffer = fboB;

    for (let i = 0; i < iterations; i++) {
      // draw blurred in one direction
      writeBuffer.bind();
      if (i === 0) {
        texture.bind();
      } else {
        readBuffer.color[0].bind();
      }
      shader.bind();
      shader.uniforms.flip = true;
      shader.uniforms.direction =
        i % 2 === 0 ? [blurRadius, 0] : [0, blurRadius];
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      triangle(this.gl);

      // swap buffers
      const t = writeBuffer;
      writeBuffer = readBuffer;
      readBuffer = t;
    }

    // draw last FBO to screen
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    writeBuffer.color[0].bind();
    shader.uniforms.direction = [0, 0]; // no blur
    shader.uniforms.flip = iterations % 2 !== 0;
    triangle(this.gl);

    // apply linear filtering to get a smooth interpolation
    const textures = [texture, fboA.color[0], fboB.color[0]];
    textures.forEach((e) => this.setParameters(e));
  }

  // private animateBlur(image: Image) {}

  // @TODO
  // getHtml() {}

  // @TODO
  // appendTo() {}
}
