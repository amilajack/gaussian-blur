"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/ban-ts-comment: off */
const a_big_triangle_1 = __importDefault(require("a-big-triangle"));
const gl_shader_1 = __importDefault(require("gl-shader"));
const gl_fbo_1 = __importDefault(require("gl-fbo"));
const gl_texture2d_1 = __importDefault(require("gl-texture2d"));
const vert_glsl_1 = __importDefault(require("./vert.glsl"));
const frag_glsl_1 = __importDefault(require("./frag.glsl"));
class Gaussian {
    constructor(canvas, img) {
        this.gl = canvas.getContext("webgl2");
        let width = this.gl.drawingBufferWidth;
        let height = this.gl.drawingBufferHeight;
        const texture = gl_texture2d_1.default(this.gl, img);
        const shader = gl_shader_1.default(this.gl, vert_glsl_1.default, frag_glsl_1.default);
        shader.bind();
        shader.uniforms.iResolution = [width, height, 0];
        shader.uniforms.iChannel0 = 0;
        this.fboA = gl_fbo_1.default(this.gl, [width, height]);
        this.fboB = gl_fbo_1.default(this.gl, [width, height]);
        // apply linear filtering to get a smooth interpolation
        const textures = [texture, this.fboA.color[0], this.fboB.color[0]];
        const setParameters = (tex) => {
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
        window.onresize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ({ width, height } = this.gl.canvas);
            this.gl.viewport(0, 0, width, height);
            this.fboA = gl_fbo_1.default(this.gl, [width, height]);
            this.fboB = gl_fbo_1.default(this.gl, [width, height]);
            shader.uniforms.iResolution = [width, height, 0];
            this.gl.viewport(0, 0, canvas.width, canvas.height);
        };
    }
    draw(iterations, radiusDelta = 1) {
        let { fboA: writeBuffer, fboB: readBuffer } = this;
        const { texture, shader, gl } = this;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        for (let i = 0; i < iterations; i += 1) {
            const radius = (iterations - i - 1) * radiusDelta;
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
            shader.uniforms.direction = i % 2 === 0 ? [radius, 0] : [0, radius];
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            a_big_triangle_1.default(gl);
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
        a_big_triangle_1.default(gl);
    }
}
exports.default = Gaussian;
