"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_big_triangle_1 = __importDefault(require("a-big-triangle"));
const gl_shader_1 = __importDefault(require("gl-shader"));
const gl_fbo_1 = __importDefault(require("gl-fbo"));
// import loop from 'raf-loop';
const load_img_1 = __importDefault(require("load-img"));
const gl_texture2d_1 = __importDefault(require("gl-texture2d"));
const webgl_context_1 = __importDefault(require("webgl-context"));
const vert_glsl_1 = __importDefault(require("./vert.glsl"));
const frag_glsl_1 = __importDefault(require("./frag.glsl"));
class GaussianBlur {
    constructor(opts = {}) {
        this.blurRadius = opts.blurRadius || 50;
        this.targetElement = document.querySelector(opts.targetElement) || 'body';
    }
    setParameters(texture) {
        const newTexture = Object.assign({}, texture);
        // @TODO: I'm not sure what this line does. Disabling it makes the shader work for
        //        different images sizes that are not powers of 2
        // texture.wrapS = texture.wrapT = gl.REPEAT
        newTexture.minFilter = this.gl.LINEAR;
        newTexture.magFilter = this.gl.LINEAR;
        return newTexture;
    }
    getBase64FromImageUrl(url) {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = url;
        const self = this;
        return new Promise(resolve => {
            img.onload = function onload() {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                self.gl = webgl_context_1.default({
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
    async setImage(url) {
        this.imageUri = await this.getBase64FromImageUrl(url);
        return new Promise((resolve, reject) => {
            load_img_1.default(this.imageUri, (err, image) => {
                if (err)
                    reject(err);
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
    changeBlurRadius(blurRadius) {
        this.blurRadius = blurRadius;
        const width = this.gl.drawingBufferWidth;
        const height = this.gl.drawingBufferHeight;
        // Create texture
        const texture = gl_texture2d_1.default(this.gl, this.image);
        // Create shader
        const shader = gl_shader_1.default(this.gl, vert_glsl_1.default, frag_glsl_1.default);
        shader.bind();
        shader.uniforms.iResolution = [width, height, 0];
        shader.uniforms.iChannel0 = 0;
        const fboA = gl_fbo_1.default(this.gl, [width, height]);
        const fboB = gl_fbo_1.default(this.gl, [width, height]);
        this.gl.viewport(0, 0, width, height);
        const iterations = 8;
        let writeBuffer = fboA;
        let readBuffer = fboB;
        const self = this;
        for (let i = 0; i < iterations; i++) {
            // draw blurred in one direction
            writeBuffer.bind();
            if (i === 0) {
                texture.bind();
            }
            else {
                readBuffer.color[0].bind();
            }
            shader.bind();
            shader.uniforms.flip = true;
            shader.uniforms.direction =
                i % 2 === 0 ? [blurRadius, 0] : [0, blurRadius];
            self.gl.clearColor(0, 0, 0, 0);
            self.gl.clear(self.gl.COLOR_BUFFER_BIT);
            a_big_triangle_1.default(self.gl);
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
        a_big_triangle_1.default(self.gl);
        // apply linear filtering to get a smooth interpolation
        const textures = [texture, fboA.color[0], fboB.color[0]];
        textures.forEach(e => this.setParameters(e));
    }
}
exports.default = GaussianBlur;
