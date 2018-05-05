var triangle = require('a-big-triangle')
var createShader = require('gl-shader')
var createFBO = require('gl-fbo')
var glslify = require('glslify')
var loop = require('raf-loop')



var gl;

function getBase64FromImageUrl(url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        console.log(this.width)

         gl = require('webgl-context')({
            width: this.width,
            height: this.height
          })
          document.body.appendChild(gl.canvas)
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        const uri = dataURL;
        // const uri = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

        // var uri = require('./zoo')
        var loadImage = require('load-img')
        loadImage(uri, start)

    };

    img.src = url;
}

getBase64FromImageUrl('./demo/demo.jpg')

function start (err, image) {
  if (err) throw err

  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  var texture = require('gl-texture2d')(gl, image)

  var shader = createShader(gl, glslify('./vert.glsl'), glslify('./frag.glsl'))
  shader.bind()
  shader.uniforms.iResolution = [width, height, 0]
  shader.uniforms.iChannel0 = 0

  var fboA = createFBO(gl, [width, height])
  var fboB = createFBO(gl, [width, height])

  // apply linear filtering to get a smooth interpolation
  var textures = [ texture, fboA.color[0], fboB.color[0] ]
  textures.forEach(setParameters)

  var time = 0

  loop(render).start()

  function render (dt) {
    time += dt / 1000
    gl.viewport(0, 0, width, height)

    var anim = (Math.sin(time) * 1.5)
    // var anim = (Math.sin(time) * 0.5 + 0.5)
    var iterations = 8
    var writeBuffer = fboA
    var readBuffer = fboB

    for (var i = 0; i < iterations; i++) {
      // we will approximate a larger blur by using
      // multiple iterations starting with a very wide radius
      var radius = (iterations - i - 1) * anim

      // draw blurred in one direction
      writeBuffer.bind()
      if (i === 0) {
        texture.bind()
      } else {
        readBuffer.color[0].bind()
      }
      shader.bind()
      shader.uniforms.flip = true
      shader.uniforms.direction = i % 2 === 0 ? [radius, 0] : [0, radius]
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      triangle(gl)

      // swap buffers
      var t = writeBuffer
      writeBuffer = readBuffer
      readBuffer = t
    }

    // draw last FBO to screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    writeBuffer.color[0].bind()
    shader.uniforms.direction = [0, 0] // no blur
    shader.uniforms.flip = iterations % 2 !== 0
    triangle(gl)
  }

  function setParameters (texture) {
    // texture.wrapS = texture.wrapT = gl.REPEAT
    texture.minFilter = gl.LINEAR
    texture.magFilter = gl.LINEAR
  }
}
