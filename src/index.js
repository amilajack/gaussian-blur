// @flow
import triangle from 'a-big-triangle';
import createShader from 'gl-shader';
import createFbo from 'gl-fbo';
import loop from 'raf-loop';
import loadImage from 'load-img';
import glTexture2d from 'gl-texture2d';
import webglContext from 'webgl-context';
import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';

export default class GaussianBlur {
  /**
   * @private
   */
  imageSrc: string;

  /**
   * @private
   */
  blurRadius: number;

  /**
   * @private
   */
  targetElement: Element;

  /**
   * @private
   */
  glContext;

  constructor(opts = {}) {
    this.blurRadius = opts.blurRadius || 50;
    this.targetElement = opts.targetElement || 'body';
  }

  /**
   * @private
   */
  setParameters(texture) {
    const newTexture = Object.assign({}, texture);
    // @TODO: I'm not sure what this line does. Disabling it makes the shader work for
    //        different images sizes that are not powers of 2
    // texture.wrapS = texture.wrapT = gl.REPEAT
    newTexture.minFilter = this.gl.LINEAR;
    newTexture.magFilter = this.gl.LINEAR;
    return newTexture;
  }

  /**
   * @private
   */
  getBase64FromImageUrl(url: string): Promise<string> {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    const self = this;

    return new Promise(resolve => {
      img.onload = function onload() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
  
        self.gl = webglContext({
          width: this.width,
          height: this.height
        });
        document.body.appendChild(self.gl.canvas);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
  
        return resolve(canvas.toDataURL('image/png'));
      };
    });
  }

  async setImage(url: string): Proimse<string> {
    this.imageUri = await this.getBase64FromImageUrl(url);
    console.log(this.gl)
    return new Promise((resolve, reject) => {
      loadImage(this.imageUri, (err, image) => {
        if (err) reject(err);
        this.image = image;
        this.changeBlurRadius(this.blurRadius);
        resolve();
      });
    });
  }

  /**
   * Animate the blur from one radius to another. Resolve the promise when animation is done
   */
  changeBlurRadius(blurRadius: number, opts = { animate: true }): Promise<void> {
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
  
    let time = 0;

    const self = this;
  
    function render(dt) {
      time += dt / 1000;
      self.gl.viewport(0, 0, width, height);
  
      const anim = Math.sin(time) * 1.5;
      // var anim = (Math.sin(time) * 0.5 + 0.5)
      const iterations = 8;
      let writeBuffer = fboA;
      let readBuffer = fboB;
  
      for (let i = 0; i < iterations; i++) {
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
        self.gl.clearColor(0, 0, 0, 0);
        self.gl.clear(self.gl.COLOR_BUFFER_BIT);
        triangle(self.gl);
  
        // swap buffers
        const t = writeBuffer;
        writeBuffer = readBuffer;
        readBuffer = t;
      }
  
      // draw last FBO to screen
      self.gl.bindFramebuffer(self.gl.FRAMEBUFFER, null);
      writeBuffer.color[0].bind();
      shader.uniforms.direction = [0, 0]; // no blur
      shader.uniforms.flip = iterations % 2 !== 0;
      triangle(self.gl);
    }
  
    loop(render).start();
  
    // apply linear filtering to get a smooth interpolation
    const textures = [texture, fboA.color[0], fboB.color[0]];
    textures.forEach(e => this.setParameters(e));
  }

  // /**
  //  * @private
  //  */
  // animateBlur(image: Image) {
    
  // }

  // getHtml() {}

  // appendTo() {}
}

window.GaussianBlur = GaussianBlur;