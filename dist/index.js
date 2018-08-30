!(function(t) {
  var r = {};
  function e(n) {
    if (r[n]) return r[n].exports;
    var i = (r[n] = { i: n, l: !1, exports: {} });
    return t[n].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
  }
  (e.m = t),
    (e.c = r),
    (e.d = function(t, r, n) {
      e.o(t, r) || Object.defineProperty(t, r, { enumerable: !0, get: n });
    }),
    (e.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (e.t = function(t, r) {
      if ((1 & r && (t = e(t)), 8 & r)) return t;
      if (4 & r && 'object' == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (e.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
        2 & r && 'string' != typeof t)
      )
        for (var i in t)
          e.d(
            n,
            i,
            function(r) {
              return t[r];
            }.bind(null, i)
          );
      return n;
    }),
    (e.n = function(t) {
      var r =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return e.d(r, 'a', r), r;
    }),
    (e.o = function(t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    }),
    (e.p = ''),
    e((e.s = 17));
})([
  function(t, r) {
    function e(t, r, e) {
      (this.shortMessage = r || ''),
        (this.longMessage = e || ''),
        (this.rawError = t || ''),
        (this.message = 'gl-shader: ' + (r || t || '') + (e ? '\n' + e : '')),
        (this.stack = new Error().stack);
    }
    (e.prototype = new Error()),
      (e.prototype.name = 'GLError'),
      (e.prototype.constructor = e),
      (t.exports = e);
  },
  function(t, r, e) {
    'use strict';
    var n = e(7),
      i = e(6),
      a = e(4);
    t.exports = function(t) {
      if (arguments.length <= 1)
        throw new Error(
          'gl-texture2d: Missing arguments for texture2d constructor'
        );
      o ||
        (function(t) {
          (o = [
            t.LINEAR,
            t.NEAREST_MIPMAP_LINEAR,
            t.LINEAR_MIPMAP_NEAREST,
            t.LINEAR_MIPMAP_NEAREST
          ]),
            (s = [
              t.NEAREST,
              t.LINEAR,
              t.NEAREST_MIPMAP_NEAREST,
              t.NEAREST_MIPMAP_LINEAR,
              t.LINEAR_MIPMAP_NEAREST,
              t.LINEAR_MIPMAP_LINEAR
            ]),
            (u = [t.REPEAT, t.CLAMP_TO_EDGE, t.MIRRORED_REPEAT]);
        })(t);
      if ('number' == typeof arguments[1])
        return E(
          t,
          arguments[1],
          arguments[2],
          arguments[3] || t.RGBA,
          arguments[4] || t.UNSIGNED_BYTE
        );
      if (Array.isArray(arguments[1]))
        return E(
          t,
          0 | arguments[1][0],
          0 | arguments[1][1],
          arguments[2] || t.RGBA,
          arguments[3] || t.UNSIGNED_BYTE
        );
      if ('object' == typeof arguments[1]) {
        var r = arguments[1],
          e = f(r) ? r : r.raw;
        if (e)
          return (function(t, r, e, n, i, a) {
            var o = g(t);
            return (
              t.texImage2D(t.TEXTURE_2D, 0, i, i, a, r), new c(t, o, e, n, i, a)
            );
          })(
            t,
            e,
            0 | r.width,
            0 | r.height,
            arguments[2] || t.RGBA,
            arguments[3] || t.UNSIGNED_BYTE
          );
        if (r.shape && r.data && r.stride)
          return (function(t, r) {
            var e = r.dtype,
              o = r.shape.slice(),
              s = t.getParameter(t.MAX_TEXTURE_SIZE);
            if (o[0] < 0 || o[0] > s || o[1] < 0 || o[1] > s)
              throw new Error('gl-texture2d: Invalid texture size');
            var u = _(o, r.stride.slice()),
              f = 0;
            'float32' === e
              ? (f = t.FLOAT)
              : 'float64' === e
                ? ((f = t.FLOAT), (u = !1), (e = 'float32'))
                : 'uint8' === e
                  ? (f = t.UNSIGNED_BYTE)
                  : ((f = t.UNSIGNED_BYTE), (u = !1), (e = 'uint8'));
            var h,
              p,
              E = 0;
            if (2 === o.length)
              (E = t.LUMINANCE),
                (o = [o[0], o[1], 1]),
                (r = n(r.data, o, [r.stride[0], r.stride[1], 1], r.offset));
            else {
              if (3 !== o.length)
                throw new Error('gl-texture2d: Invalid shape for texture');
              if (1 === o[2]) E = t.ALPHA;
              else if (2 === o[2]) E = t.LUMINANCE_ALPHA;
              else if (3 === o[2]) E = t.RGB;
              else {
                if (4 !== o[2])
                  throw new Error(
                    'gl-texture2d: Invalid shape for pixel coords'
                  );
                E = t.RGBA;
              }
            }
            f !== t.FLOAT ||
              t.getExtension('OES_texture_float') ||
              ((f = t.UNSIGNED_BYTE), (u = !1));
            var d = r.size;
            if (u)
              h =
                0 === r.offset && r.data.length === d
                  ? r.data
                  : r.data.subarray(r.offset, r.offset + d);
            else {
              var y = [o[2], o[2] * o[0], 1];
              p = a.malloc(d, e);
              var T = n(p, o, y, 0);
              ('float32' !== e && 'float64' !== e) || f !== t.UNSIGNED_BYTE
                ? i.assign(T, r)
                : l(T, r),
                (h = p.subarray(0, d));
            }
            var A = g(t);
            t.texImage2D(t.TEXTURE_2D, 0, E, o[0], o[1], 0, E, f, h),
              u || a.free(p);
            return new c(t, A, o[0], o[1], E, f);
          })(t, r);
      }
      throw new Error(
        'gl-texture2d: Invalid arguments for texture2d constructor'
      );
    };
    var o = null,
      s = null,
      u = null;
    function f(t) {
      return (
        ('undefined' != typeof HTMLCanvasElement &&
          t instanceof HTMLCanvasElement) ||
        ('undefined' != typeof HTMLImageElement &&
          t instanceof HTMLImageElement) ||
        ('undefined' != typeof HTMLVideoElement &&
          t instanceof HTMLVideoElement) ||
        ('undefined' != typeof ImageData && t instanceof ImageData)
      );
    }
    var l = function(t, r) {
      i.muls(t, r, 255);
    };
    function h(t, r, e) {
      var n = t.gl,
        i = n.getParameter(n.MAX_TEXTURE_SIZE);
      if (r < 0 || r > i || e < 0 || e > i)
        throw new Error('gl-texture2d: Invalid texture size');
      return (
        (t._shape = [r, e]),
        t.bind(),
        n.texImage2D(
          n.TEXTURE_2D,
          0,
          t.format,
          r,
          e,
          0,
          t.format,
          t.type,
          null
        ),
        (t._mipLevels = [0]),
        t
      );
    }
    function c(t, r, e, n, i, a) {
      (this.gl = t),
        (this.handle = r),
        (this.format = i),
        (this.type = a),
        (this._shape = [e, n]),
        (this._mipLevels = [0]),
        (this._magFilter = t.NEAREST),
        (this._minFilter = t.NEAREST),
        (this._wrapS = t.CLAMP_TO_EDGE),
        (this._wrapT = t.CLAMP_TO_EDGE),
        (this._anisoSamples = 1);
      var o = this,
        s = [this._wrapS, this._wrapT];
      Object.defineProperties(s, [
        {
          get: function() {
            return o._wrapS;
          },
          set: function(t) {
            return (o.wrapS = t);
          }
        },
        {
          get: function() {
            return o._wrapT;
          },
          set: function(t) {
            return (o.wrapT = t);
          }
        }
      ]),
        (this._wrapVector = s);
      var u = [this._shape[0], this._shape[1]];
      Object.defineProperties(u, [
        {
          get: function() {
            return o._shape[0];
          },
          set: function(t) {
            return (o.width = t);
          }
        },
        {
          get: function() {
            return o._shape[1];
          },
          set: function(t) {
            return (o.height = t);
          }
        }
      ]),
        (this._shapeVector = u);
    }
    var p = c.prototype;
    function _(t, r) {
      return 3 === t.length
        ? 1 === r[2] && r[1] === t[0] * t[2] && r[0] === t[2]
        : 1 === r[0] && r[1] === t[0];
    }
    function g(t) {
      var r = t.createTexture();
      return (
        t.bindTexture(t.TEXTURE_2D, r),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
        r
      );
    }
    function E(t, r, e, n, i) {
      var a = t.getParameter(t.MAX_TEXTURE_SIZE);
      if (r < 0 || r > a || e < 0 || e > a)
        throw new Error('gl-texture2d: Invalid texture shape');
      if (i === t.FLOAT && !t.getExtension('OES_texture_float'))
        throw new Error(
          'gl-texture2d: Floating point textures not supported on this platform'
        );
      var o = g(t);
      return (
        t.texImage2D(t.TEXTURE_2D, 0, n, r, e, 0, n, i, null),
        new c(t, o, r, e, n, i)
      );
    }
    Object.defineProperties(p, {
      minFilter: {
        get: function() {
          return this._minFilter;
        },
        set: function(t) {
          this.bind();
          var r = this.gl;
          if (
            (this.type === r.FLOAT &&
              o.indexOf(t) >= 0 &&
              (r.getExtension('OES_texture_float_linear') || (t = r.NEAREST)),
            s.indexOf(t) < 0)
          )
            throw new Error('gl-texture2d: Unknown filter mode ' + t);
          return (
            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, t),
            (this._minFilter = t)
          );
        }
      },
      magFilter: {
        get: function() {
          return this._magFilter;
        },
        set: function(t) {
          this.bind();
          var r = this.gl;
          if (
            (this.type === r.FLOAT &&
              o.indexOf(t) >= 0 &&
              (r.getExtension('OES_texture_float_linear') || (t = r.NEAREST)),
            s.indexOf(t) < 0)
          )
            throw new Error('gl-texture2d: Unknown filter mode ' + t);
          return (
            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, t),
            (this._magFilter = t)
          );
        }
      },
      mipSamples: {
        get: function() {
          return this._anisoSamples;
        },
        set: function(t) {
          var r = this._anisoSamples;
          if (
            ((this._anisoSamples = 0 | Math.max(t, 1)),
            r !== this._anisoSamples)
          ) {
            var e = this.gl.getExtension('EXT_texture_filter_anisotropic');
            e &&
              this.gl.texParameterf(
                this.gl.TEXTURE_2D,
                e.TEXTURE_MAX_ANISOTROPY_EXT,
                this._anisoSamples
              );
          }
          return this._anisoSamples;
        }
      },
      wrapS: {
        get: function() {
          return this._wrapS;
        },
        set: function(t) {
          if ((this.bind(), u.indexOf(t) < 0))
            throw new Error('gl-texture2d: Unknown wrap mode ' + t);
          return (
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_S,
              t
            ),
            (this._wrapS = t)
          );
        }
      },
      wrapT: {
        get: function() {
          return this._wrapT;
        },
        set: function(t) {
          if ((this.bind(), u.indexOf(t) < 0))
            throw new Error('gl-texture2d: Unknown wrap mode ' + t);
          return (
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_T,
              t
            ),
            (this._wrapT = t)
          );
        }
      },
      wrap: {
        get: function() {
          return this._wrapVector;
        },
        set: function(t) {
          if ((Array.isArray(t) || (t = [t, t]), 2 !== t.length))
            throw new Error(
              'gl-texture2d: Must specify wrap mode for rows and columns'
            );
          for (var r = 0; r < 2; ++r)
            if (u.indexOf(t[r]) < 0)
              throw new Error('gl-texture2d: Unknown wrap mode ' + t);
          (this._wrapS = t[0]), (this._wrapT = t[1]);
          var e = this.gl;
          return (
            this.bind(),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, this._wrapS),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, this._wrapT),
            t
          );
        }
      },
      shape: {
        get: function() {
          return this._shapeVector;
        },
        set: function(t) {
          if (Array.isArray(t)) {
            if (2 !== t.length)
              throw new Error('gl-texture2d: Invalid texture shape');
          } else t = [0 | t, 0 | t];
          return h(this, 0 | t[0], 0 | t[1]), [0 | t[0], 0 | t[1]];
        }
      },
      width: {
        get: function() {
          return this._shape[0];
        },
        set: function(t) {
          return h(this, (t |= 0), this._shape[1]), t;
        }
      },
      height: {
        get: function() {
          return this._shape[1];
        },
        set: function(t) {
          return (t |= 0), h(this, this._shape[0], t), t;
        }
      }
    }),
      (p.bind = function(t) {
        var r = this.gl;
        return (
          void 0 !== t && r.activeTexture(r.TEXTURE0 + (0 | t)),
          r.bindTexture(r.TEXTURE_2D, this.handle),
          void 0 !== t ? 0 | t : r.getParameter(r.ACTIVE_TEXTURE) - r.TEXTURE0
        );
      }),
      (p.dispose = function() {
        this.gl.deleteTexture(this.handle);
      }),
      (p.generateMipmap = function() {
        this.bind(), this.gl.generateMipmap(this.gl.TEXTURE_2D);
        for (
          var t = Math.min(this._shape[0], this._shape[1]), r = 0;
          t > 0;
          ++r, t >>>= 1
        )
          this._mipLevels.indexOf(r) < 0 && this._mipLevels.push(r);
      }),
      (p.setPixels = function(t, r, e, o) {
        var s = this.gl;
        this.bind(),
          Array.isArray(r)
            ? ((o = e), (e = 0 | r[1]), (r = 0 | r[0]))
            : ((r = r || 0), (e = e || 0)),
          (o = o || 0);
        var u = f(t) ? t : t.raw;
        if (u) {
          this._mipLevels.indexOf(o) < 0
            ? (s.texImage2D(
                s.TEXTURE_2D,
                0,
                this.format,
                this.format,
                this.type,
                u
              ),
              this._mipLevels.push(o))
            : s.texSubImage2D(s.TEXTURE_2D, o, r, e, this.format, this.type, u);
        } else {
          if (!(t.shape && t.stride && t.data))
            throw new Error('gl-texture2d: Unsupported data type');
          if (
            t.shape.length < 2 ||
            r + t.shape[1] > this._shape[1] >>> o ||
            e + t.shape[0] > this._shape[0] >>> o ||
            r < 0 ||
            e < 0
          )
            throw new Error(
              'gl-texture2d: Texture dimensions are out of bounds'
            );
          !(function(t, r, e, o, s, u, f, h) {
            var c = h.dtype,
              p = h.shape.slice();
            if (p.length < 2 || p.length > 3)
              throw new Error(
                'gl-texture2d: Invalid ndarray, must be 2d or 3d'
              );
            var g = 0,
              E = 0,
              d = _(p, h.stride.slice());
            'float32' === c
              ? (g = t.FLOAT)
              : 'float64' === c
                ? ((g = t.FLOAT), (d = !1), (c = 'float32'))
                : 'uint8' === c
                  ? (g = t.UNSIGNED_BYTE)
                  : ((g = t.UNSIGNED_BYTE), (d = !1), (c = 'uint8'));
            if (2 === p.length)
              (E = t.LUMINANCE),
                (p = [p[0], p[1], 1]),
                (h = n(h.data, p, [h.stride[0], h.stride[1], 1], h.offset));
            else {
              if (3 !== p.length)
                throw new Error('gl-texture2d: Invalid shape for texture');
              if (1 === p[2]) E = t.ALPHA;
              else if (2 === p[2]) E = t.LUMINANCE_ALPHA;
              else if (3 === p[2]) E = t.RGB;
              else {
                if (4 !== p[2])
                  throw new Error(
                    'gl-texture2d: Invalid shape for pixel coords'
                  );
                E = t.RGBA;
              }
              p[2];
            }
            (E !== t.LUMINANCE && E !== t.ALPHA) ||
              (s !== t.LUMINANCE && s !== t.ALPHA) ||
              (E = s);
            if (E !== s)
              throw new Error(
                'gl-texture2d: Incompatible texture format for setPixels'
              );
            var y = h.size,
              T = f.indexOf(o) < 0;
            T && f.push(o);
            if (g === u && d)
              0 === h.offset && h.data.length === y
                ? T
                  ? t.texImage2D(
                      t.TEXTURE_2D,
                      o,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      u,
                      h.data
                    )
                  : t.texSubImage2D(
                      t.TEXTURE_2D,
                      o,
                      r,
                      e,
                      p[0],
                      p[1],
                      s,
                      u,
                      h.data
                    )
                : T
                  ? t.texImage2D(
                      t.TEXTURE_2D,
                      o,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      u,
                      h.data.subarray(h.offset, h.offset + y)
                    )
                  : t.texSubImage2D(
                      t.TEXTURE_2D,
                      o,
                      r,
                      e,
                      p[0],
                      p[1],
                      s,
                      u,
                      h.data.subarray(h.offset, h.offset + y)
                    );
            else {
              var A;
              A = u === t.FLOAT ? a.mallocFloat32(y) : a.mallocUint8(y);
              var b = n(A, p, [p[2], p[2] * p[0], 1]);
              g === t.FLOAT && u === t.UNSIGNED_BYTE ? l(b, h) : i.assign(b, h),
                T
                  ? t.texImage2D(
                      t.TEXTURE_2D,
                      o,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      u,
                      A.subarray(0, y)
                    )
                  : t.texSubImage2D(
                      t.TEXTURE_2D,
                      o,
                      r,
                      e,
                      p[0],
                      p[1],
                      s,
                      u,
                      A.subarray(0, y)
                    ),
                u === t.FLOAT ? a.freeFloat32(A) : a.freeUint8(A);
            }
          })(s, r, e, o, this.format, this.type, this._mipLevels, t);
        }
      });
  },
  function(t, r, e) {
    'use strict';
    var n = 'undefined' == typeof WeakMap ? e(18) : WeakMap,
      i = e(19),
      a = e(32),
      o = new n();
    t.exports = function(t) {
      var r = o.get(t),
        e = r && (r._triangleBuffer.handle || r._triangleBuffer.buffer);
      if (!e || !t.isBuffer(e)) {
        var n = i(t, new Float32Array([-1, -1, -1, 4, 4, -1]));
        ((r = a(t, [
          { buffer: n, type: t.FLOAT, size: 2 }
        ]))._triangleBuffer = n),
          o.set(t, r);
      }
      r.bind(), t.drawArrays(t.TRIANGLES, 0, 3), r.unbind();
    };
  },
  function(t, r, e) {
    'use strict';
    var n = e(1);
    t.exports = function(t, r, e, n) {
      i ||
        ((i = t.FRAMEBUFFER_UNSUPPORTED),
        (a = t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT),
        (o = t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS),
        (s = t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT));
      var f = t.getExtension('WEBGL_draw_buffers');
      !u &&
        f &&
        (function(t, r) {
          var e = t.getParameter(r.MAX_COLOR_ATTACHMENTS_WEBGL);
          u = new Array(e + 1);
          for (var n = 0; n <= e; ++n) {
            for (var i = new Array(e), a = 0; a < n; ++a)
              i[a] = t.COLOR_ATTACHMENT0 + a;
            for (var a = n; a < e; ++a) i[a] = t.NONE;
            u[n] = i;
          }
        })(t, f);
      Array.isArray(r) && ((n = e), (e = 0 | r[1]), (r = 0 | r[0]));
      if ('number' != typeof r)
        throw new Error('gl-fbo: Missing shape parameter');
      var l = t.getParameter(t.MAX_RENDERBUFFER_SIZE);
      if (r < 0 || r > l || e < 0 || e > l)
        throw new Error('gl-fbo: Parameters are too large for FBO');
      var h = 1;
      if ('color' in (n = n || {})) {
        if ((h = Math.max(0 | n.color, 0)) < 0)
          throw new Error(
            'gl-fbo: Must specify a nonnegative number of colors'
          );
        if (h > 1) {
          if (!f)
            throw new Error(
              'gl-fbo: Multiple draw buffer extension not supported'
            );
          if (h > t.getParameter(f.MAX_COLOR_ATTACHMENTS_WEBGL))
            throw new Error(
              'gl-fbo: Context does not support ' + h + ' draw buffers'
            );
        }
      }
      var c = t.UNSIGNED_BYTE,
        p = t.getExtension('OES_texture_float');
      if (n.float && h > 0) {
        if (!p)
          throw new Error(
            'gl-fbo: Context does not support floating point textures'
          );
        c = t.FLOAT;
      } else n.preferFloat && h > 0 && p && (c = t.FLOAT);
      var g = !0;
      'depth' in n && (g = !!n.depth);
      var E = !1;
      'stencil' in n && (E = !!n.stencil);
      return new _(t, r, e, c, h, g, E, f);
    };
    var i,
      a,
      o,
      s,
      u = null;
    function f(t) {
      return [
        t.getParameter(t.FRAMEBUFFER_BINDING),
        t.getParameter(t.RENDERBUFFER_BINDING),
        t.getParameter(t.TEXTURE_BINDING_2D)
      ];
    }
    function l(t, r) {
      t.bindFramebuffer(t.FRAMEBUFFER, r[0]),
        t.bindRenderbuffer(t.RENDERBUFFER, r[1]),
        t.bindTexture(t.TEXTURE_2D, r[2]);
    }
    function h(t) {
      switch (t) {
        case i:
          throw new Error('gl-fbo: Framebuffer unsupported');
        case a:
          throw new Error('gl-fbo: Framebuffer incomplete attachment');
        case o:
          throw new Error('gl-fbo: Framebuffer incomplete dimensions');
        case s:
          throw new Error('gl-fbo: Framebuffer incomplete missing attachment');
        default:
          throw new Error('gl-fbo: Framebuffer failed for unspecified reason');
      }
    }
    function c(t, r, e, i, a, o) {
      if (!i) return null;
      var s = n(t, r, e, a, i);
      return (
        (s.magFilter = t.NEAREST),
        (s.minFilter = t.NEAREST),
        (s.mipSamples = 1),
        s.bind(),
        t.framebufferTexture2D(t.FRAMEBUFFER, o, t.TEXTURE_2D, s.handle, 0),
        s
      );
    }
    function p(t, r, e, n, i) {
      var a = t.createRenderbuffer();
      return (
        t.bindRenderbuffer(t.RENDERBUFFER, a),
        t.renderbufferStorage(t.RENDERBUFFER, n, r, e),
        t.framebufferRenderbuffer(t.FRAMEBUFFER, i, t.RENDERBUFFER, a),
        a
      );
    }
    function _(t, r, e, n, i, a, o, s) {
      (this.gl = t),
        (this._shape = [0 | r, 0 | e]),
        (this._destroyed = !1),
        (this._ext = s),
        (this.color = new Array(i));
      for (var _ = 0; _ < i; ++_) this.color[_] = null;
      (this._color_rb = null),
        (this.depth = null),
        (this._depth_rb = null),
        (this._colorType = n),
        (this._useDepth = a),
        (this._useStencil = o);
      var g = this,
        E = [0 | r, 0 | e];
      Object.defineProperties(E, {
        0: {
          get: function() {
            return g._shape[0];
          },
          set: function(t) {
            return (g.width = t);
          }
        },
        1: {
          get: function() {
            return g._shape[1];
          },
          set: function(t) {
            return (g.height = t);
          }
        }
      }),
        (this._shapeVector = E),
        (function(t) {
          var r = f(t.gl),
            e = t.gl,
            n = (t.handle = e.createFramebuffer()),
            i = t._shape[0],
            a = t._shape[1],
            o = t.color.length,
            s = t._ext,
            _ = t._useStencil,
            g = t._useDepth,
            E = t._colorType;
          e.bindFramebuffer(e.FRAMEBUFFER, n);
          for (var d = 0; d < o; ++d)
            t.color[d] = c(e, i, a, E, e.RGBA, e.COLOR_ATTACHMENT0 + d);
          0 === o
            ? ((t._color_rb = p(e, i, a, e.RGBA4, e.COLOR_ATTACHMENT0)),
              s && s.drawBuffersWEBGL(u[0]))
            : o > 1 && s.drawBuffersWEBGL(u[o]);
          var y = e.getExtension('WEBGL_depth_texture');
          y
            ? _
              ? (t.depth = c(
                  e,
                  i,
                  a,
                  y.UNSIGNED_INT_24_8_WEBGL,
                  e.DEPTH_STENCIL,
                  e.DEPTH_STENCIL_ATTACHMENT
                ))
              : g &&
                (t.depth = c(
                  e,
                  i,
                  a,
                  e.UNSIGNED_SHORT,
                  e.DEPTH_COMPONENT,
                  e.DEPTH_ATTACHMENT
                ))
            : g && _
              ? (t._depth_rb = p(
                  e,
                  i,
                  a,
                  e.DEPTH_STENCIL,
                  e.DEPTH_STENCIL_ATTACHMENT
                ))
              : g
                ? (t._depth_rb = p(
                    e,
                    i,
                    a,
                    e.DEPTH_COMPONENT16,
                    e.DEPTH_ATTACHMENT
                  ))
                : _ &&
                  (t._depth_rb = p(
                    e,
                    i,
                    a,
                    e.STENCIL_INDEX,
                    e.STENCIL_ATTACHMENT
                  ));
          var T = e.checkFramebufferStatus(e.FRAMEBUFFER);
          if (T !== e.FRAMEBUFFER_COMPLETE) {
            for (
              t._destroyed = !0,
                e.bindFramebuffer(e.FRAMEBUFFER, null),
                e.deleteFramebuffer(t.handle),
                t.handle = null,
                t.depth && (t.depth.dispose(), (t.depth = null)),
                t._depth_rb &&
                  (e.deleteRenderbuffer(t._depth_rb), (t._depth_rb = null)),
                d = 0;
              d < t.color.length;
              ++d
            )
              t.color[d].dispose(), (t.color[d] = null);
            t._color_rb &&
              (e.deleteRenderbuffer(t._color_rb), (t._color_rb = null)),
              l(e, r),
              h(T);
          }
          l(e, r);
        })(this);
    }
    var g = _.prototype;
    function E(t, r, e) {
      if (t._destroyed) throw new Error("gl-fbo: Can't resize destroyed FBO");
      if (t._shape[0] !== r || t._shape[1] !== e) {
        var n = t.gl,
          i = n.getParameter(n.MAX_RENDERBUFFER_SIZE);
        if (r < 0 || r > i || e < 0 || e > i)
          throw new Error("gl-fbo: Can't resize FBO, invalid dimensions");
        (t._shape[0] = r), (t._shape[1] = e);
        for (var a = f(n), o = 0; o < t.color.length; ++o)
          t.color[o].shape = t._shape;
        t._color_rb &&
          (n.bindRenderbuffer(n.RENDERBUFFER, t._color_rb),
          n.renderbufferStorage(
            n.RENDERBUFFER,
            n.RGBA4,
            t._shape[0],
            t._shape[1]
          )),
          t.depth && (t.depth.shape = t._shape),
          t._depth_rb &&
            (n.bindRenderbuffer(n.RENDERBUFFER, t._depth_rb),
            t._useDepth && t._useStencil
              ? n.renderbufferStorage(
                  n.RENDERBUFFER,
                  n.DEPTH_STENCIL,
                  t._shape[0],
                  t._shape[1]
                )
              : t._useDepth
                ? n.renderbufferStorage(
                    n.RENDERBUFFER,
                    n.DEPTH_COMPONENT16,
                    t._shape[0],
                    t._shape[1]
                  )
                : t._useStencil &&
                  n.renderbufferStorage(
                    n.RENDERBUFFER,
                    n.STENCIL_INDEX,
                    t._shape[0],
                    t._shape[1]
                  )),
          n.bindFramebuffer(n.FRAMEBUFFER, t.handle);
        var s = n.checkFramebufferStatus(n.FRAMEBUFFER);
        s !== n.FRAMEBUFFER_COMPLETE && (t.dispose(), l(n, a), h(s)), l(n, a);
      }
    }
    Object.defineProperties(g, {
      shape: {
        get: function() {
          return this._destroyed ? [0, 0] : this._shapeVector;
        },
        set: function(t) {
          if ((Array.isArray(t) || (t = [0 | t, 0 | t]), 2 !== t.length))
            throw new Error('gl-fbo: Shape vector must be length 2');
          var r = 0 | t[0],
            e = 0 | t[1];
          return E(this, r, e), [r, e];
        },
        enumerable: !1
      },
      width: {
        get: function() {
          return this._destroyed ? 0 : this._shape[0];
        },
        set: function(t) {
          return E(this, (t |= 0), this._shape[1]), t;
        },
        enumerable: !1
      },
      height: {
        get: function() {
          return this._destroyed ? 0 : this._shape[1];
        },
        set: function(t) {
          return (t |= 0), E(this, this._shape[0], t), t;
        },
        enumerable: !1
      }
    }),
      (g.bind = function() {
        if (!this._destroyed) {
          var t = this.gl;
          t.bindFramebuffer(t.FRAMEBUFFER, this.handle),
            t.viewport(0, 0, this._shape[0], this._shape[1]);
        }
      }),
      (g.dispose = function() {
        if (!this._destroyed) {
          this._destroyed = !0;
          var t = this.gl;
          t.deleteFramebuffer(this.handle),
            (this.handle = null),
            this.depth && (this.depth.dispose(), (this.depth = null)),
            this._depth_rb &&
              (t.deleteRenderbuffer(this._depth_rb), (this._depth_rb = null));
          for (var r = 0; r < this.color.length; ++r)
            this.color[r].dispose(), (this.color[r] = null);
          this._color_rb &&
            (t.deleteRenderbuffer(this._color_rb), (this._color_rb = null));
        }
      });
  },
  function(t, r, e) {
    'use strict';
    (function(t, n) {
      var i = e(24),
        a = e(25);
      t.__TYPEDARRAY_POOL ||
        (t.__TYPEDARRAY_POOL = {
          UINT8: a([32, 0]),
          UINT16: a([32, 0]),
          UINT32: a([32, 0]),
          INT8: a([32, 0]),
          INT16: a([32, 0]),
          INT32: a([32, 0]),
          FLOAT: a([32, 0]),
          DOUBLE: a([32, 0]),
          DATA: a([32, 0]),
          UINT8C: a([32, 0]),
          BUFFER: a([32, 0])
        });
      var o = 'undefined' != typeof Uint8ClampedArray,
        s = t.__TYPEDARRAY_POOL;
      s.UINT8C || (s.UINT8C = a([32, 0])), s.BUFFER || (s.BUFFER = a([32, 0]));
      var u = s.DATA,
        f = s.BUFFER;
      function l(t) {
        if (t) {
          var r = t.length || t.byteLength,
            e = i.log2(r);
          u[e].push(t);
        }
      }
      function h(t) {
        t = i.nextPow2(t);
        var r = i.log2(t),
          e = u[r];
        return e.length > 0 ? e.pop() : new ArrayBuffer(t);
      }
      function c(t) {
        return new Uint8Array(h(t), 0, t);
      }
      function p(t) {
        return new Uint16Array(h(2 * t), 0, t);
      }
      function _(t) {
        return new Uint32Array(h(4 * t), 0, t);
      }
      function g(t) {
        return new Int8Array(h(t), 0, t);
      }
      function E(t) {
        return new Int16Array(h(2 * t), 0, t);
      }
      function d(t) {
        return new Int32Array(h(4 * t), 0, t);
      }
      function y(t) {
        return new Float32Array(h(4 * t), 0, t);
      }
      function T(t) {
        return new Float64Array(h(8 * t), 0, t);
      }
      function A(t) {
        return o ? new Uint8ClampedArray(h(t), 0, t) : c(t);
      }
      function b(t) {
        return new DataView(h(t), 0, t);
      }
      function v(t) {
        t = i.nextPow2(t);
        var r = i.log2(t),
          e = f[r];
        return e.length > 0 ? e.pop() : new n(t);
      }
      (r.free = function(t) {
        if (n.isBuffer(t)) f[i.log2(t.length)].push(t);
        else {
          if (
            ('[object ArrayBuffer]' !== Object.prototype.toString.call(t) &&
              (t = t.buffer),
            !t)
          )
            return;
          var r = t.length || t.byteLength,
            e = 0 | i.log2(r);
          u[e].push(t);
        }
      }),
        (r.freeUint8 = r.freeUint16 = r.freeUint32 = r.freeInt8 = r.freeInt16 = r.freeInt32 = r.freeFloat32 = r.freeFloat = r.freeFloat64 = r.freeDouble = r.freeUint8Clamped = r.freeDataView = function(
          t
        ) {
          l(t.buffer);
        }),
        (r.freeArrayBuffer = l),
        (r.freeBuffer = function(t) {
          f[i.log2(t.length)].push(t);
        }),
        (r.malloc = function(t, r) {
          if (void 0 === r || 'arraybuffer' === r) return h(t);
          switch (r) {
            case 'uint8':
              return c(t);
            case 'uint16':
              return p(t);
            case 'uint32':
              return _(t);
            case 'int8':
              return g(t);
            case 'int16':
              return E(t);
            case 'int32':
              return d(t);
            case 'float':
            case 'float32':
              return y(t);
            case 'double':
            case 'float64':
              return T(t);
            case 'uint8_clamped':
              return A(t);
            case 'buffer':
              return v(t);
            case 'data':
            case 'dataview':
              return b(t);
            default:
              return null;
          }
          return null;
        }),
        (r.mallocArrayBuffer = h),
        (r.mallocUint8 = c),
        (r.mallocUint16 = p),
        (r.mallocUint32 = _),
        (r.mallocInt8 = g),
        (r.mallocInt16 = E),
        (r.mallocInt32 = d),
        (r.mallocFloat32 = r.mallocFloat = y),
        (r.mallocFloat64 = r.mallocDouble = T),
        (r.mallocUint8Clamped = A),
        (r.mallocDataView = b),
        (r.mallocBuffer = v),
        (r.clearCache = function() {
          for (var t = 0; t < 32; ++t)
            (s.UINT8[t].length = 0),
              (s.UINT16[t].length = 0),
              (s.UINT32[t].length = 0),
              (s.INT8[t].length = 0),
              (s.INT16[t].length = 0),
              (s.INT32[t].length = 0),
              (s.FLOAT[t].length = 0),
              (s.DOUBLE[t].length = 0),
              (s.UINT8C[t].length = 0),
              (u[t].length = 0),
              (f[t].length = 0);
        });
    }.call(this, e(5), e(20).Buffer));
  },
  function(t, r) {
    var e;
    e = (function() {
      return this;
    })();
    try {
      e = e || Function('return this')() || (0, eval)('this');
    } catch (t) {
      'object' == typeof window && (e = window);
    }
    t.exports = e;
  },
  function(t, r, e) {
    'use strict';
    var n = e(26),
      i = { body: '', args: [], thisVars: [], localVars: [] };
    function a(t) {
      if (!t) return i;
      for (var r = 0; r < t.args.length; ++r) {
        var e = t.args[r];
        t.args[r] =
          0 === r
            ? { name: e, lvalue: !0, rvalue: !!t.rvalue, count: t.count || 1 }
            : { name: e, lvalue: !1, rvalue: !0, count: 1 };
      }
      return (
        t.thisVars || (t.thisVars = []), t.localVars || (t.localVars = []), t
      );
    }
    function o(t) {
      for (var r = [], e = 0; e < t.args.length; ++e) r.push('a' + e);
      return new Function(
        'P',
        [
          'return function ',
          t.funcName,
          '_ndarrayops(',
          r.join(','),
          ') {P(',
          r.join(','),
          ');return a0}'
        ].join('')
      )(
        (function(t) {
          return n({
            args: t.args,
            pre: a(t.pre),
            body: a(t.body),
            post: a(t.proc),
            funcName: t.funcName
          });
        })(t)
      );
    }
    var s = {
      add: '+',
      sub: '-',
      mul: '*',
      div: '/',
      mod: '%',
      band: '&',
      bor: '|',
      bxor: '^',
      lshift: '<<',
      rshift: '>>',
      rrshift: '>>>'
    };
    !(function() {
      for (var t in s) {
        var e = s[t];
        (r[t] = o({
          args: ['array', 'array', 'array'],
          body: { args: ['a', 'b', 'c'], body: 'a=b' + e + 'c' },
          funcName: t
        })),
          (r[t + 'eq'] = o({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a' + e + '=b' },
            rvalue: !0,
            funcName: t + 'eq'
          })),
          (r[t + 's'] = o({
            args: ['array', 'array', 'scalar'],
            body: { args: ['a', 'b', 's'], body: 'a=b' + e + 's' },
            funcName: t + 's'
          })),
          (r[t + 'seq'] = o({
            args: ['array', 'scalar'],
            body: { args: ['a', 's'], body: 'a' + e + '=s' },
            rvalue: !0,
            funcName: t + 'seq'
          }));
      }
    })();
    var u = { not: '!', bnot: '~', neg: '-', recip: '1.0/' };
    !(function() {
      for (var t in u) {
        var e = u[t];
        (r[t] = o({
          args: ['array', 'array'],
          body: { args: ['a', 'b'], body: 'a=' + e + 'b' },
          funcName: t
        })),
          (r[t + 'eq'] = o({
            args: ['array'],
            body: { args: ['a'], body: 'a=' + e + 'a' },
            rvalue: !0,
            count: 2,
            funcName: t + 'eq'
          }));
      }
    })();
    var f = {
      and: '&&',
      or: '||',
      eq: '===',
      neq: '!==',
      lt: '<',
      gt: '>',
      leq: '<=',
      geq: '>='
    };
    !(function() {
      for (var t in f) {
        var e = f[t];
        (r[t] = o({
          args: ['array', 'array', 'array'],
          body: { args: ['a', 'b', 'c'], body: 'a=b' + e + 'c' },
          funcName: t
        })),
          (r[t + 's'] = o({
            args: ['array', 'array', 'scalar'],
            body: { args: ['a', 'b', 's'], body: 'a=b' + e + 's' },
            funcName: t + 's'
          })),
          (r[t + 'eq'] = o({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a=a' + e + 'b' },
            rvalue: !0,
            count: 2,
            funcName: t + 'eq'
          })),
          (r[t + 'seq'] = o({
            args: ['array', 'scalar'],
            body: { args: ['a', 's'], body: 'a=a' + e + 's' },
            rvalue: !0,
            count: 2,
            funcName: t + 'seq'
          }));
      }
    })();
    var l = [
      'abs',
      'acos',
      'asin',
      'atan',
      'ceil',
      'cos',
      'exp',
      'floor',
      'log',
      'round',
      'sin',
      'sqrt',
      'tan'
    ];
    !(function() {
      for (var t = 0; t < l.length; ++t) {
        var e = l[t];
        (r[e] = o({
          args: ['array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
          body: { args: ['a', 'b'], body: 'a=this_f(b)', thisVars: ['this_f'] },
          funcName: e
        })),
          (r[e + 'eq'] = o({
            args: ['array'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: { args: ['a'], body: 'a=this_f(a)', thisVars: ['this_f'] },
            rvalue: !0,
            count: 2,
            funcName: e + 'eq'
          }));
      }
    })();
    var h = ['max', 'min', 'atan2', 'pow'];
    !(function() {
      for (var t = 0; t < h.length; ++t) {
        var e = h[t];
        (r[e] = o({
          args: ['array', 'array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
          body: {
            args: ['a', 'b', 'c'],
            body: 'a=this_f(b,c)',
            thisVars: ['this_f']
          },
          funcName: e
        })),
          (r[e + 's'] = o({
            args: ['array', 'array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(b,c)',
              thisVars: ['this_f']
            },
            funcName: e + 's'
          })),
          (r[e + 'eq'] = o({
            args: ['array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b'],
              body: 'a=this_f(a,b)',
              thisVars: ['this_f']
            },
            rvalue: !0,
            count: 2,
            funcName: e + 'eq'
          })),
          (r[e + 'seq'] = o({
            args: ['array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b'],
              body: 'a=this_f(a,b)',
              thisVars: ['this_f']
            },
            rvalue: !0,
            count: 2,
            funcName: e + 'seq'
          }));
      }
    })();
    var c = ['atan2', 'pow'];
    !(function() {
      for (var t = 0; t < c.length; ++t) {
        var e = c[t];
        (r[e + 'op'] = o({
          args: ['array', 'array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
          body: {
            args: ['a', 'b', 'c'],
            body: 'a=this_f(c,b)',
            thisVars: ['this_f']
          },
          funcName: e + 'op'
        })),
          (r[e + 'ops'] = o({
            args: ['array', 'array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(c,b)',
              thisVars: ['this_f']
            },
            funcName: e + 'ops'
          })),
          (r[e + 'opeq'] = o({
            args: ['array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b'],
              body: 'a=this_f(b,a)',
              thisVars: ['this_f']
            },
            rvalue: !0,
            count: 2,
            funcName: e + 'opeq'
          })),
          (r[e + 'opseq'] = o({
            args: ['array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b'],
              body: 'a=this_f(b,a)',
              thisVars: ['this_f']
            },
            rvalue: !0,
            count: 2,
            funcName: e + 'opseq'
          }));
      }
    })(),
      (r.any = n({
        args: ['array'],
        pre: i,
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'if(a){return true}',
          localVars: [],
          thisVars: []
        },
        post: { args: [], localVars: [], thisVars: [], body: 'return false' },
        funcName: 'any'
      })),
      (r.all = n({
        args: ['array'],
        pre: i,
        body: {
          args: [{ name: 'x', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'if(!x){return false}',
          localVars: [],
          thisVars: []
        },
        post: { args: [], localVars: [], thisVars: [], body: 'return true' },
        funcName: 'all'
      })),
      (r.sum = n({
        args: ['array'],
        pre: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'this_s=0'
        },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'this_s+=a',
          localVars: [],
          thisVars: ['this_s']
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'return this_s'
        },
        funcName: 'sum'
      })),
      (r.prod = n({
        args: ['array'],
        pre: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'this_s=1'
        },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'this_s*=a',
          localVars: [],
          thisVars: ['this_s']
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'return this_s'
        },
        funcName: 'prod'
      })),
      (r.norm2squared = n({
        args: ['array'],
        pre: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'this_s=0'
        },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
          body: 'this_s+=a*a',
          localVars: [],
          thisVars: ['this_s']
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'return this_s'
        },
        funcName: 'norm2squared'
      })),
      (r.norm2 = n({
        args: ['array'],
        pre: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'this_s=0'
        },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
          body: 'this_s+=a*a',
          localVars: [],
          thisVars: ['this_s']
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'return Math.sqrt(this_s)'
        },
        funcName: 'norm2'
      })),
      (r.norminf = n({
        args: ['array'],
        pre: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'this_s=0'
        },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 4 }],
          body: 'if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}',
          localVars: [],
          thisVars: ['this_s']
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'return this_s'
        },
        funcName: 'norminf'
      })),
      (r.norm1 = n({
        args: ['array'],
        pre: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'this_s=0'
        },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 3 }],
          body: 'this_s+=a<0?-a:a',
          localVars: [],
          thisVars: ['this_s']
        },
        post: {
          args: [],
          localVars: [],
          thisVars: ['this_s'],
          body: 'return this_s'
        },
        funcName: 'norm1'
      })),
      (r.sup = n({
        args: ['array'],
        pre: {
          body: 'this_h=-Infinity',
          args: [],
          thisVars: ['this_h'],
          localVars: []
        },
        body: {
          body: 'if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_',
          args: [{ name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }],
          thisVars: ['this_h'],
          localVars: []
        },
        post: {
          body: 'return this_h',
          args: [],
          thisVars: ['this_h'],
          localVars: []
        }
      })),
      (r.inf = n({
        args: ['array'],
        pre: {
          body: 'this_h=Infinity',
          args: [],
          thisVars: ['this_h'],
          localVars: []
        },
        body: {
          body: 'if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_',
          args: [{ name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }],
          thisVars: ['this_h'],
          localVars: []
        },
        post: {
          body: 'return this_h',
          args: [],
          thisVars: ['this_h'],
          localVars: []
        }
      })),
      (r.argmin = n({
        args: ['index', 'array', 'shape'],
        pre: {
          body: '{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}',
          args: [
            { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 }
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: []
        },
        body: {
          body:
            '{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
          args: [
            { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
            { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 }
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: ['_inline_1_k']
        },
        post: {
          body: '{return this_i}',
          args: [],
          thisVars: ['this_i'],
          localVars: []
        }
      })),
      (r.argmax = n({
        args: ['index', 'array', 'shape'],
        pre: {
          body: '{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}',
          args: [
            { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 }
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: []
        },
        body: {
          body:
            '{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
          args: [
            { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
            { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 }
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: ['_inline_1_k']
        },
        post: {
          body: '{return this_i}',
          args: [],
          thisVars: ['this_i'],
          localVars: []
        }
      })),
      (r.random = o({
        args: ['array'],
        pre: { args: [], body: 'this_f=Math.random', thisVars: ['this_f'] },
        body: { args: ['a'], body: 'a=this_f()', thisVars: ['this_f'] },
        funcName: 'random'
      })),
      (r.assign = o({
        args: ['array', 'array'],
        body: { args: ['a', 'b'], body: 'a=b' },
        funcName: 'assign'
      })),
      (r.assigns = o({
        args: ['array', 'scalar'],
        body: { args: ['a', 'b'], body: 'a=b' },
        funcName: 'assigns'
      })),
      (r.equals = n({
        args: ['array', 'array'],
        pre: i,
        body: {
          args: [
            { name: 'x', lvalue: !1, rvalue: !0, count: 1 },
            { name: 'y', lvalue: !1, rvalue: !0, count: 1 }
          ],
          body: 'if(x!==y){return false}',
          localVars: [],
          thisVars: []
        },
        post: { args: [], localVars: [], thisVars: [], body: 'return true' },
        funcName: 'equals'
      }));
  },
  function(t, r, e) {
    var n = e(30),
      i = e(31),
      a = 'undefined' != typeof Float64Array;
    function o(t, r) {
      return t[0] - r[0];
    }
    function s() {
      var t,
        r = this.stride,
        e = new Array(r.length);
      for (t = 0; t < e.length; ++t) e[t] = [Math.abs(r[t]), t];
      e.sort(o);
      var n = new Array(e.length);
      for (t = 0; t < n.length; ++t) n[t] = e[t][1];
      return n;
    }
    function u(t, r) {
      var e = ['View', r, 'd', t].join('');
      r < 0 && (e = 'View_Nil' + t);
      var i = 'generic' === t;
      if (-1 === r) {
        var a =
          'function ' +
          e +
          '(a){this.data=a;};var proto=' +
          e +
          ".prototype;proto.dtype='" +
          t +
          "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
          e +
          '(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_' +
          e +
          '(a){return new ' +
          e +
          '(a);}';
        return new Function(a)();
      }
      if (0 === r) {
        a =
          'function ' +
          e +
          '(a,d) {this.data = a;this.offset = d};var proto=' +
          e +
          ".prototype;proto.dtype='" +
          t +
          "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " +
          e +
          '_copy() {return new ' +
          e +
          '(this.data,this.offset)};proto.pick=function ' +
          e +
          '_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function ' +
          e +
          '_get(){return ' +
          (i ? 'this.data.get(this.offset)' : 'this.data[this.offset]') +
          '};proto.set=function ' +
          e +
          '_set(v){return ' +
          (i ? 'this.data.set(this.offset,v)' : 'this.data[this.offset]=v') +
          '};return function construct_' +
          e +
          '(a,b,c,d){return new ' +
          e +
          '(a,d)}';
        return new Function('TrivialArray', a)(f[t][0]);
      }
      a = ["'use strict'"];
      var o = n(r),
        u = o.map(function(t) {
          return 'i' + t;
        }),
        l =
          'this.offset+' +
          o
            .map(function(t) {
              return 'this.stride[' + t + ']*i' + t;
            })
            .join('+'),
        h = o
          .map(function(t) {
            return 'b' + t;
          })
          .join(','),
        c = o
          .map(function(t) {
            return 'c' + t;
          })
          .join(',');
      a.push(
        'function ' + e + '(a,' + h + ',' + c + ',d){this.data=a',
        'this.shape=[' + h + ']',
        'this.stride=[' + c + ']',
        'this.offset=d|0}',
        'var proto=' + e + '.prototype',
        "proto.dtype='" + t + "'",
        'proto.dimension=' + r
      ),
        a.push(
          "Object.defineProperty(proto,'size',{get:function " +
            e +
            '_size(){return ' +
            o
              .map(function(t) {
                return 'this.shape[' + t + ']';
              })
              .join('*'),
          '}})'
        ),
        1 === r
          ? a.push('proto.order=[0]')
          : (a.push("Object.defineProperty(proto,'order',{get:"),
            r < 4
              ? (a.push('function ' + e + '_order(){'),
                2 === r
                  ? a.push(
                      'return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})'
                    )
                  : 3 === r &&
                    a.push(
                      'var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})'
                    ))
              : a.push('ORDER})')),
        a.push('proto.set=function ' + e + '_set(' + u.join(',') + ',v){'),
        i
          ? a.push('return this.data.set(' + l + ',v)}')
          : a.push('return this.data[' + l + ']=v}'),
        a.push('proto.get=function ' + e + '_get(' + u.join(',') + '){'),
        i
          ? a.push('return this.data.get(' + l + ')}')
          : a.push('return this.data[' + l + ']}'),
        a.push(
          'proto.index=function ' + e + '_index(',
          u.join(),
          '){return ' + l + '}'
        ),
        a.push(
          'proto.hi=function ' +
            e +
            '_hi(' +
            u.join(',') +
            '){return new ' +
            e +
            '(this.data,' +
            o
              .map(function(t) {
                return [
                  '(typeof i',
                  t,
                  "!=='number'||i",
                  t,
                  '<0)?this.shape[',
                  t,
                  ']:i',
                  t,
                  '|0'
                ].join('');
              })
              .join(',') +
            ',' +
            o
              .map(function(t) {
                return 'this.stride[' + t + ']';
              })
              .join(',') +
            ',this.offset)}'
        );
      var p = o.map(function(t) {
          return 'a' + t + '=this.shape[' + t + ']';
        }),
        _ = o.map(function(t) {
          return 'c' + t + '=this.stride[' + t + ']';
        });
      a.push(
        'proto.lo=function ' +
          e +
          '_lo(' +
          u.join(',') +
          '){var b=this.offset,d=0,' +
          p.join(',') +
          ',' +
          _.join(',')
      );
      for (var g = 0; g < r; ++g)
        a.push(
          'if(typeof i' +
            g +
            "==='number'&&i" +
            g +
            '>=0){d=i' +
            g +
            '|0;b+=c' +
            g +
            '*d;a' +
            g +
            '-=d}'
        );
      a.push(
        'return new ' +
          e +
          '(this.data,' +
          o
            .map(function(t) {
              return 'a' + t;
            })
            .join(',') +
          ',' +
          o
            .map(function(t) {
              return 'c' + t;
            })
            .join(',') +
          ',b)}'
      ),
        a.push(
          'proto.step=function ' +
            e +
            '_step(' +
            u.join(',') +
            '){var ' +
            o
              .map(function(t) {
                return 'a' + t + '=this.shape[' + t + ']';
              })
              .join(',') +
            ',' +
            o
              .map(function(t) {
                return 'b' + t + '=this.stride[' + t + ']';
              })
              .join(',') +
            ',c=this.offset,d=0,ceil=Math.ceil'
        );
      for (g = 0; g < r; ++g)
        a.push(
          'if(typeof i' +
            g +
            "==='number'){d=i" +
            g +
            '|0;if(d<0){c+=b' +
            g +
            '*(a' +
            g +
            '-1);a' +
            g +
            '=ceil(-a' +
            g +
            '/d)}else{a' +
            g +
            '=ceil(a' +
            g +
            '/d)}b' +
            g +
            '*=d}'
        );
      a.push(
        'return new ' +
          e +
          '(this.data,' +
          o
            .map(function(t) {
              return 'a' + t;
            })
            .join(',') +
          ',' +
          o
            .map(function(t) {
              return 'b' + t;
            })
            .join(',') +
          ',c)}'
      );
      var E = new Array(r),
        d = new Array(r);
      for (g = 0; g < r; ++g)
        (E[g] = 'a[i' + g + ']'), (d[g] = 'b[i' + g + ']');
      a.push(
        'proto.transpose=function ' +
          e +
          '_transpose(' +
          u +
          '){' +
          u
            .map(function(t, r) {
              return t + '=(' + t + '===undefined?' + r + ':' + t + '|0)';
            })
            .join(';'),
        'var a=this.shape,b=this.stride;return new ' +
          e +
          '(this.data,' +
          E.join(',') +
          ',' +
          d.join(',') +
          ',this.offset)}'
      ),
        a.push(
          'proto.pick=function ' +
            e +
            '_pick(' +
            u +
            '){var a=[],b=[],c=this.offset'
        );
      for (g = 0; g < r; ++g)
        a.push(
          'if(typeof i' +
            g +
            "==='number'&&i" +
            g +
            '>=0){c=(c+this.stride[' +
            g +
            ']*i' +
            g +
            ')|0}else{a.push(this.shape[' +
            g +
            ']);b.push(this.stride[' +
            g +
            '])}'
        );
      return (
        a.push('var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}'),
        a.push(
          'return function construct_' +
            e +
            '(data,shape,stride,offset){return new ' +
            e +
            '(data,' +
            o
              .map(function(t) {
                return 'shape[' + t + ']';
              })
              .join(',') +
            ',' +
            o
              .map(function(t) {
                return 'stride[' + t + ']';
              })
              .join(',') +
            ',offset)}'
        ),
        new Function('CTOR_LIST', 'ORDER', a.join('\n'))(f[t], s)
      );
    }
    var f = {
      float32: [],
      float64: [],
      int8: [],
      int16: [],
      int32: [],
      uint8: [],
      uint16: [],
      uint32: [],
      array: [],
      uint8_clamped: [],
      buffer: [],
      generic: []
    };
    t.exports = function(t, r, e, n) {
      if (void 0 === t) return (0, f.array[0])([]);
      'number' == typeof t && (t = [t]), void 0 === r && (r = [t.length]);
      var o = r.length;
      if (void 0 === e) {
        e = new Array(o);
        for (var s = o - 1, l = 1; s >= 0; --s) (e[s] = l), (l *= r[s]);
      }
      if (void 0 === n)
        for (n = 0, s = 0; s < o; ++s) e[s] < 0 && (n -= (r[s] - 1) * e[s]);
      for (
        var h = (function(t) {
            if (i(t)) return 'buffer';
            if (a)
              switch (Object.prototype.toString.call(t)) {
                case '[object Float64Array]':
                  return 'float64';
                case '[object Float32Array]':
                  return 'float32';
                case '[object Int8Array]':
                  return 'int8';
                case '[object Int16Array]':
                  return 'int16';
                case '[object Int32Array]':
                  return 'int32';
                case '[object Uint8Array]':
                  return 'uint8';
                case '[object Uint16Array]':
                  return 'uint16';
                case '[object Uint32Array]':
                  return 'uint32';
                case '[object Uint8ClampedArray]':
                  return 'uint8_clamped';
              }
            return Array.isArray(t) ? 'array' : 'generic';
          })(t),
          c = f[h];
        c.length <= o + 1;

      )
        c.push(u(h, c.length - 1));
      return (0, c[o + 1])(t, r, e, n);
    };
  },
  function(t, r, e) {
    'use strict';
    t.exports = function(t, r, e) {
      r ? r.bind() : t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
      var n = 0 | t.getParameter(t.MAX_VERTEX_ATTRIBS);
      if (e) {
        if (e.length > n) throw new Error('gl-vao: Too many vertex attributes');
        for (var i = 0; i < e.length; ++i) {
          var a = e[i];
          if (a.buffer) {
            var o = a.buffer,
              s = a.size || 4,
              u = a.type || t.FLOAT,
              f = !!a.normalized,
              l = a.stride || 0,
              h = a.offset || 0;
            o.bind(),
              t.enableVertexAttribArray(i),
              t.vertexAttribPointer(i, s, u, f, l, h);
          } else {
            if ('number' == typeof a) t.vertexAttrib1f(i, a);
            else if (1 === a.length) t.vertexAttrib1f(i, a[0]);
            else if (2 === a.length) t.vertexAttrib2f(i, a[0], a[1]);
            else if (3 === a.length) t.vertexAttrib3f(i, a[0], a[1], a[2]);
            else {
              if (4 !== a.length)
                throw new Error('gl-vao: Invalid vertex attribute');
              t.vertexAttrib4f(i, a[0], a[1], a[2], a[3]);
            }
            t.disableVertexAttribArray(i);
          }
        }
        for (; i < n; ++i) t.disableVertexAttribArray(i);
      } else
        for (t.bindBuffer(t.ARRAY_BUFFER, null), i = 0; i < n; ++i)
          t.disableVertexAttribArray(i);
    };
  },
  function(t, r, e) {
    'use strict';
    t.exports = function(t, r) {
      for (var e = {}, n = 0; n < t.length; ++n)
        for (
          var i = t[n].name, a = i.split('.'), o = e, s = 0;
          s < a.length;
          ++s
        ) {
          var u = a[s].split('[');
          if (u.length > 1) {
            u[0] in o || (o[u[0]] = []), (o = o[u[0]]);
            for (var f = 1; f < u.length; ++f) {
              var l = parseInt(u[f]);
              f < u.length - 1 || s < a.length - 1
                ? (l in o || (f < u.length - 1 ? (o[l] = []) : (o[l] = {})),
                  (o = o[l]))
                : (o[l] = r ? n : t[n].type);
            }
          } else
            s < a.length - 1
              ? (u[0] in o || (o[u[0]] = {}), (o = o[u[0]]))
              : (o[u[0]] = r ? n : t[n].type);
        }
      return e;
    };
  },
  function(t, r) {
    t.exports = [
      'precision',
      'highp',
      'mediump',
      'lowp',
      'attribute',
      'const',
      'uniform',
      'varying',
      'break',
      'continue',
      'do',
      'for',
      'while',
      'if',
      'else',
      'in',
      'out',
      'inout',
      'float',
      'int',
      'uint',
      'void',
      'bool',
      'true',
      'false',
      'discard',
      'return',
      'mat2',
      'mat3',
      'mat4',
      'vec2',
      'vec3',
      'vec4',
      'ivec2',
      'ivec3',
      'ivec4',
      'bvec2',
      'bvec3',
      'bvec4',
      'sampler1D',
      'sampler2D',
      'sampler3D',
      'samplerCube',
      'sampler1DShadow',
      'sampler2DShadow',
      'struct',
      'asm',
      'class',
      'union',
      'enum',
      'typedef',
      'template',
      'this',
      'packed',
      'goto',
      'switch',
      'default',
      'inline',
      'noinline',
      'volatile',
      'public',
      'static',
      'extern',
      'external',
      'interface',
      'long',
      'short',
      'double',
      'half',
      'fixed',
      'unsigned',
      'input',
      'output',
      'hvec2',
      'hvec3',
      'hvec4',
      'dvec2',
      'dvec3',
      'dvec4',
      'fvec2',
      'fvec3',
      'fvec4',
      'sampler2DRect',
      'sampler3DRect',
      'sampler2DRectShadow',
      'sizeof',
      'cast',
      'namespace',
      'using'
    ];
  },
  function(t, r) {
    t.exports = [
      'abs',
      'acos',
      'all',
      'any',
      'asin',
      'atan',
      'ceil',
      'clamp',
      'cos',
      'cross',
      'dFdx',
      'dFdy',
      'degrees',
      'distance',
      'dot',
      'equal',
      'exp',
      'exp2',
      'faceforward',
      'floor',
      'fract',
      'gl_BackColor',
      'gl_BackLightModelProduct',
      'gl_BackLightProduct',
      'gl_BackMaterial',
      'gl_BackSecondaryColor',
      'gl_ClipPlane',
      'gl_ClipVertex',
      'gl_Color',
      'gl_DepthRange',
      'gl_DepthRangeParameters',
      'gl_EyePlaneQ',
      'gl_EyePlaneR',
      'gl_EyePlaneS',
      'gl_EyePlaneT',
      'gl_Fog',
      'gl_FogCoord',
      'gl_FogFragCoord',
      'gl_FogParameters',
      'gl_FragColor',
      'gl_FragCoord',
      'gl_FragData',
      'gl_FragDepth',
      'gl_FragDepthEXT',
      'gl_FrontColor',
      'gl_FrontFacing',
      'gl_FrontLightModelProduct',
      'gl_FrontLightProduct',
      'gl_FrontMaterial',
      'gl_FrontSecondaryColor',
      'gl_LightModel',
      'gl_LightModelParameters',
      'gl_LightModelProducts',
      'gl_LightProducts',
      'gl_LightSource',
      'gl_LightSourceParameters',
      'gl_MaterialParameters',
      'gl_MaxClipPlanes',
      'gl_MaxCombinedTextureImageUnits',
      'gl_MaxDrawBuffers',
      'gl_MaxFragmentUniformComponents',
      'gl_MaxLights',
      'gl_MaxTextureCoords',
      'gl_MaxTextureImageUnits',
      'gl_MaxTextureUnits',
      'gl_MaxVaryingFloats',
      'gl_MaxVertexAttribs',
      'gl_MaxVertexTextureImageUnits',
      'gl_MaxVertexUniformComponents',
      'gl_ModelViewMatrix',
      'gl_ModelViewMatrixInverse',
      'gl_ModelViewMatrixInverseTranspose',
      'gl_ModelViewMatrixTranspose',
      'gl_ModelViewProjectionMatrix',
      'gl_ModelViewProjectionMatrixInverse',
      'gl_ModelViewProjectionMatrixInverseTranspose',
      'gl_ModelViewProjectionMatrixTranspose',
      'gl_MultiTexCoord0',
      'gl_MultiTexCoord1',
      'gl_MultiTexCoord2',
      'gl_MultiTexCoord3',
      'gl_MultiTexCoord4',
      'gl_MultiTexCoord5',
      'gl_MultiTexCoord6',
      'gl_MultiTexCoord7',
      'gl_Normal',
      'gl_NormalMatrix',
      'gl_NormalScale',
      'gl_ObjectPlaneQ',
      'gl_ObjectPlaneR',
      'gl_ObjectPlaneS',
      'gl_ObjectPlaneT',
      'gl_Point',
      'gl_PointCoord',
      'gl_PointParameters',
      'gl_PointSize',
      'gl_Position',
      'gl_ProjectionMatrix',
      'gl_ProjectionMatrixInverse',
      'gl_ProjectionMatrixInverseTranspose',
      'gl_ProjectionMatrixTranspose',
      'gl_SecondaryColor',
      'gl_TexCoord',
      'gl_TextureEnvColor',
      'gl_TextureMatrix',
      'gl_TextureMatrixInverse',
      'gl_TextureMatrixInverseTranspose',
      'gl_TextureMatrixTranspose',
      'gl_Vertex',
      'greaterThan',
      'greaterThanEqual',
      'inversesqrt',
      'length',
      'lessThan',
      'lessThanEqual',
      'log',
      'log2',
      'matrixCompMult',
      'max',
      'min',
      'mix',
      'mod',
      'normalize',
      'not',
      'notEqual',
      'pow',
      'radians',
      'reflect',
      'refract',
      'sign',
      'sin',
      'smoothstep',
      'sqrt',
      'step',
      'tan',
      'texture2D',
      'texture2DLod',
      'texture2DProj',
      'texture2DProjLod',
      'textureCube',
      'textureCubeLod',
      'texture2DLodEXT',
      'texture2DProjLodEXT',
      'textureCubeLodEXT',
      'texture2DGradEXT',
      'texture2DProjGradEXT',
      'textureCubeGradEXT'
    ];
  },
  function(t, r, e) {
    'use strict';
    var n = e(35),
      i = e(36),
      a = e(9),
      o = e(37),
      s = e(55),
      u = e(0);
    function f(t) {
      (this.gl = t),
        (this.gl.lastAttribCount = 0),
        (this._vref = this._fref = this._relink = this.vertShader = this.fragShader = this.program = this.attributes = this.uniforms = this.types = null);
    }
    var l = f.prototype;
    function h(t, r) {
      return t.name < r.name ? -1 : 1;
    }
    (l.bind = function() {
      var t;
      this.program || this._relink();
      var r = this.gl.getProgramParameter(
          this.program,
          this.gl.ACTIVE_ATTRIBUTES
        ),
        e = this.gl.lastAttribCount;
      if (r > e) for (t = e; t < r; t++) this.gl.enableVertexAttribArray(t);
      else if (e > r)
        for (t = r; t < e; t++) this.gl.disableVertexAttribArray(t);
      (this.gl.lastAttribCount = r), this.gl.useProgram(this.program);
    }),
      (l.dispose = function() {
        for (var t = this.gl.lastAttribCount, r = 0; r < t; r++)
          this.gl.disableVertexAttribArray(r);
        (this.gl.lastAttribCount = 0),
          this._fref && this._fref.dispose(),
          this._vref && this._vref.dispose(),
          (this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null);
      }),
      (l.update = function(t, r, e, f) {
        if (!r || 1 === arguments.length) {
          var l = t;
          (t = l.vertex),
            (r = l.fragment),
            (e = l.uniforms),
            (f = l.attributes);
        }
        var c = this,
          p = c.gl,
          _ = c._vref;
        (c._vref = o.shader(p, p.VERTEX_SHADER, t)),
          _ && _.dispose(),
          (c.vertShader = c._vref.shader);
        var g = this._fref;
        if (
          ((c._fref = o.shader(p, p.FRAGMENT_SHADER, r)),
          g && g.dispose(),
          (c.fragShader = c._fref.shader),
          !e || !f)
        ) {
          var E = p.createProgram();
          if (
            (p.attachShader(E, c.fragShader),
            p.attachShader(E, c.vertShader),
            p.linkProgram(E),
            !p.getProgramParameter(E, p.LINK_STATUS))
          ) {
            var d = p.getProgramInfoLog(E);
            throw new u(d, 'Error linking program:' + d);
          }
          (e = e || s.uniforms(p, E)),
            (f = f || s.attributes(p, E)),
            p.deleteProgram(E);
        }
        (f = f.slice()).sort(h);
        var y,
          T = [],
          A = [],
          b = [];
        for (y = 0; y < f.length; ++y) {
          var v = f[y];
          if (v.type.indexOf('mat') >= 0) {
            for (
              var m = 0 | v.type.charAt(v.type.length - 1),
                R = new Array(m),
                w = 0;
              w < m;
              ++w
            )
              (R[w] = b.length),
                A.push(v.name + '[' + w + ']'),
                'number' == typeof v.location
                  ? b.push(v.location + w)
                  : Array.isArray(v.location) &&
                    v.location.length === m &&
                    'number' == typeof v.location[w]
                    ? b.push(0 | v.location[w])
                    : b.push(-1);
            T.push({ name: v.name, type: v.type, locations: R });
          } else
            T.push({ name: v.name, type: v.type, locations: [b.length] }),
              A.push(v.name),
              'number' == typeof v.location
                ? b.push(0 | v.location)
                : b.push(-1);
        }
        var I = 0;
        for (y = 0; y < b.length; ++y)
          if (b[y] < 0) {
            for (; b.indexOf(I) >= 0; ) I += 1;
            b[y] = I;
          }
        var N = new Array(e.length);
        function x() {
          c.program = o.program(p, c._vref, c._fref, A, b);
          for (var t = 0; t < e.length; ++t)
            N[t] = p.getUniformLocation(c.program, e[t].name);
        }
        x(),
          (c._relink = x),
          (c.types = { uniforms: a(e), attributes: a(f) }),
          (c.attributes = i(p, c, T, b)),
          Object.defineProperty(c, 'uniforms', n(p, c, e, N));
      }),
      (t.exports = function(t, r, e, n, i) {
        var a = new f(t);
        return a.update(r, e, n, i), a;
      });
  },
  function(t, r) {
    t.exports = function(t, r, e) {
      'function' == typeof r && ((e = r), (r = null));
      var n,
        i = document.createElement('img');
      (i.onload = function() {
        n || ((n = !0), e && e(void 0, i));
      }),
        (i.onerror = function() {
          n || ((n = !0), e && e(new Error('Unable to load "' + t + '"'), i));
        }),
        r && r.crossOrigin && (i.crossOrigin = r.crossOrigin);
      return (i.src = t), i;
    };
  },
  function(t, r, e) {
    var n = e(56);
    t.exports = function(t) {
      return n('webgl', t);
    };
  },
  function(t, r) {
    t.exports =
      'precision mediump float;\n#define GLSLIFY 1\n\nattribute vec2 position;\n\nvoid main() {\n  gl_Position = vec4(position, 1, 1);\n}';
  },
  function(t, r) {
    t.exports =
      'precision highp float;\n#define GLSLIFY 1\n\nuniform vec3 iResolution;\nuniform sampler2D iChannel0;\nuniform bool flip;\nuniform vec2 direction;\n\nvec4 blur9_1_0(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv) * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n  return color;\n}\n\n\n\nvoid main() {\n  vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);\n\n  if (flip) {\n    uv.y = 1.0 - uv.y;\n  }\n\n  gl_FragColor = blur9_1_0(iChannel0, uv, iResolution.xy, direction);\n}\n';
  },
  function(t, r, e) {
    'use strict';
    e.r(r),
      e.d(r, 'default', function() {
        return A;
      });
    var n = e(2),
      i = e.n(n),
      a = e(12),
      o = e.n(a),
      s = e(3),
      u = e.n(s),
      f = e(13),
      l = e.n(f),
      h = e(1),
      c = e.n(h),
      p = e(14),
      _ = e.n(p),
      g = e(15),
      E = e.n(g),
      d = e(16),
      y = e.n(d);
    function T(t, r, e) {
      return (
        r in t
          ? Object.defineProperty(t, r, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (t[r] = e),
        t
      );
    }
    class A {
      constructor(t = {}) {
        T(this, 'imageSrc', void 0),
          T(this, 'blurRadius', void 0),
          T(this, 'targetElement', void 0),
          T(this, 'glContext', void 0),
          T(this, 'imageUri', void 0),
          T(this, 'image', void 0),
          T(this, 'gl', void 0),
          (this.blurRadius = t.blurRadius || 50),
          (this.targetElement =
            document.querySelector(t.targetElement) || 'body');
      }
      setParameters(t) {
        const r = Object.assign({}, t);
        return (
          (r.minFilter = this.gl.LINEAR), (r.magFilter = this.gl.LINEAR), r
        );
      }
      getBase64FromImageUrl(t) {
        const r = new Image();
        r.setAttribute('crossOrigin', 'anonymous'), (r.src = t);
        const e = this;
        return new Promise(t => {
          r.onload = function() {
            const r = document.createElement('canvas');
            return (
              (r.width = this.width),
              (r.height = this.height),
              (e.gl = _()({ width: this.width, height: this.height })),
              document.body.appendChild(e.gl.canvas),
              r.getContext('2d').drawImage(this, 0, 0),
              t(r.toDataURL('image/png'))
            );
          };
        });
      }
      async setImage(t) {
        return (
          (this.imageUri = await this.getBase64FromImageUrl(t)),
          new Promise((t, r) => {
            l()(this.imageUri, (e, n) => {
              e && r(e),
                (this.image = n),
                this.changeBlurRadius(this.blurRadius),
                t();
            });
          })
        );
      }
      changeBlurRadius(t) {
        this.blurRadius = t;
        const r = this.gl.drawingBufferWidth,
          e = this.gl.drawingBufferHeight,
          n = c()(this.gl, this.image),
          a = o()(this.gl, E.a, y.a);
        a.bind(),
          (a.uniforms.iResolution = [r, e, 0]),
          (a.uniforms.iChannel0 = 0);
        const s = u()(this.gl, [r, e]),
          f = u()(this.gl, [r, e]);
        this.gl.viewport(0, 0, r, e);
        let l = s,
          h = f;
        const p = this;
        for (let r = 0; r < 8; r++) {
          l.bind(),
            0 === r ? n.bind() : h.color[0].bind(),
            a.bind(),
            (a.uniforms.flip = !0),
            (a.uniforms.direction = r % 2 == 0 ? [t, 0] : [0, t]),
            p.gl.clearColor(0, 0, 0, 0),
            p.gl.clear(p.gl.COLOR_BUFFER_BIT),
            i()(p.gl);
          const e = l;
          (l = h), (h = e);
        }
        p.gl.bindFramebuffer(p.gl.FRAMEBUFFER, null),
          l.color[0].bind(),
          (a.uniforms.direction = [0, 0]),
          (a.uniforms.flip = !1),
          i()(p.gl),
          [n, s.color[0], f.color[0]].forEach(t => this.setParameters(t));
      }
    }
    window.GaussianBlur = A;
  },
  function(t, r) {
    !(function() {
      'use strict';
      if ('undefined' == typeof ses || !ses.ok || ses.ok()) {
        'undefined' != typeof ses && (ses.weakMapPermitHostObjects = E);
        var r = !1;
        if ('function' == typeof WeakMap) {
          var e = WeakMap;
          if (
            'undefined' != typeof navigator &&
            /Firefox/.test(navigator.userAgent)
          );
          else {
            var n = new e(),
              i = Object.freeze({});
            if ((n.set(i, 1), 1 === n.get(i)))
              return void (t.exports = WeakMap);
            r = !0;
          }
        }
        Object.prototype.hasOwnProperty;
        var a = Object.getOwnPropertyNames,
          o = Object.defineProperty,
          s = Object.isExtensible,
          u = 'weakmap:',
          f = u + 'ident:' + Math.random() + '___';
        if (
          'undefined' != typeof crypto &&
          'function' == typeof crypto.getRandomValues &&
          'function' == typeof ArrayBuffer &&
          'function' == typeof Uint8Array
        ) {
          var l = new ArrayBuffer(25),
            h = new Uint8Array(l);
          crypto.getRandomValues(h),
            (f =
              u +
              'rand:' +
              Array.prototype.map
                .call(h, function(t) {
                  return (t % 36).toString(36);
                })
                .join('') +
              '___');
        }
        if (
          (o(Object, 'getOwnPropertyNames', {
            value: function(t) {
              return a(t).filter(d);
            }
          }),
          'getPropertyNames' in Object)
        ) {
          var c = Object.getPropertyNames;
          o(Object, 'getPropertyNames', {
            value: function(t) {
              return c(t).filter(d);
            }
          });
        }
        !(function() {
          var t = Object.freeze;
          o(Object, 'freeze', {
            value: function(r) {
              return y(r), t(r);
            }
          });
          var r = Object.seal;
          o(Object, 'seal', {
            value: function(t) {
              return y(t), r(t);
            }
          });
          var e = Object.preventExtensions;
          o(Object, 'preventExtensions', {
            value: function(t) {
              return y(t), e(t);
            }
          });
        })();
        var p = !1,
          _ = 0,
          g = function() {
            this instanceof g || A();
            var t = [],
              r = [],
              e = _++;
            return Object.create(g.prototype, {
              get___: {
                value: T(function(n, i) {
                  var a,
                    o = y(n);
                  return o
                    ? e in o
                      ? o[e]
                      : i
                    : (a = t.indexOf(n)) >= 0
                      ? r[a]
                      : i;
                })
              },
              has___: {
                value: T(function(r) {
                  var n = y(r);
                  return n ? e in n : t.indexOf(r) >= 0;
                })
              },
              set___: {
                value: T(function(n, i) {
                  var a,
                    o = y(n);
                  return (
                    o
                      ? (o[e] = i)
                      : (a = t.indexOf(n)) >= 0
                        ? (r[a] = i)
                        : ((a = t.length), (r[a] = i), (t[a] = n)),
                    this
                  );
                })
              },
              delete___: {
                value: T(function(n) {
                  var i,
                    a,
                    o = y(n);
                  return o
                    ? e in o && delete o[e]
                    : !(
                        (i = t.indexOf(n)) < 0 ||
                        ((a = t.length - 1),
                        (t[i] = void 0),
                        (r[i] = r[a]),
                        (t[i] = t[a]),
                        (t.length = a),
                        (r.length = a),
                        0)
                      );
                })
              }
            });
          };
        (g.prototype = Object.create(Object.prototype, {
          get: {
            value: function(t, r) {
              return this.get___(t, r);
            },
            writable: !0,
            configurable: !0
          },
          has: {
            value: function(t) {
              return this.has___(t);
            },
            writable: !0,
            configurable: !0
          },
          set: {
            value: function(t, r) {
              return this.set___(t, r);
            },
            writable: !0,
            configurable: !0
          },
          delete: {
            value: function(t) {
              return this.delete___(t);
            },
            writable: !0,
            configurable: !0
          }
        })),
          'function' == typeof e
            ? (function() {
                function n() {
                  this instanceof g || A();
                  var t,
                    n = new e(),
                    i = void 0,
                    a = !1;
                  return (
                    (t = r
                      ? function(t, r) {
                          return (
                            n.set(t, r),
                            n.has(t) || (i || (i = new g()), i.set(t, r)),
                            this
                          );
                        }
                      : function(t, r) {
                          if (a)
                            try {
                              n.set(t, r);
                            } catch (e) {
                              i || (i = new g()), i.set___(t, r);
                            }
                          else n.set(t, r);
                          return this;
                        }),
                    Object.create(g.prototype, {
                      get___: {
                        value: T(function(t, r) {
                          return i
                            ? n.has(t)
                              ? n.get(t)
                              : i.get___(t, r)
                            : n.get(t, r);
                        })
                      },
                      has___: {
                        value: T(function(t) {
                          return n.has(t) || (!!i && i.has___(t));
                        })
                      },
                      set___: { value: T(t) },
                      delete___: {
                        value: T(function(t) {
                          var r = !!n.delete(t);
                          return (i && i.delete___(t)) || r;
                        })
                      },
                      permitHostObjects___: {
                        value: T(function(t) {
                          if (t !== E)
                            throw new Error(
                              'bogus call to permitHostObjects___'
                            );
                          a = !0;
                        })
                      }
                    })
                  );
                }
                r && 'undefined' != typeof Proxy && (Proxy = void 0),
                  (n.prototype = g.prototype),
                  (t.exports = n),
                  Object.defineProperty(WeakMap.prototype, 'constructor', {
                    value: WeakMap,
                    enumerable: !1,
                    configurable: !0,
                    writable: !0
                  });
              })()
            : ('undefined' != typeof Proxy && (Proxy = void 0),
              (t.exports = g));
      }
      function E(t) {
        t.permitHostObjects___ && t.permitHostObjects___(E);
      }
      function d(t) {
        return !(
          t.substr(0, u.length) == u && '___' === t.substr(t.length - 3)
        );
      }
      function y(t) {
        if (t !== Object(t)) throw new TypeError('Not an object: ' + t);
        var r = t[f];
        if (r && r.key === t) return r;
        if (s(t)) {
          r = { key: t };
          try {
            return (
              o(t, f, {
                value: r,
                writable: !1,
                enumerable: !1,
                configurable: !1
              }),
              r
            );
          } catch (t) {
            return;
          }
        }
      }
      function T(t) {
        return (t.prototype = null), Object.freeze(t);
      }
      function A() {
        p ||
          'undefined' == typeof console ||
          ((p = !0),
          console.warn(
            'WeakMap should be invoked as new WeakMap(), not WeakMap(). This will be an error in the future.'
          ));
      }
    })();
  },
  function(t, r, e) {
    'use strict';
    var n = e(4),
      i = e(6),
      a = e(7),
      o = [
        'uint8',
        'uint8_clamped',
        'uint16',
        'uint32',
        'int8',
        'int16',
        'int32',
        'float32'
      ];
    function s(t, r, e, n, i) {
      (this.gl = t),
        (this.type = r),
        (this.handle = e),
        (this.length = n),
        (this.usage = i);
    }
    var u = s.prototype;
    function f(t, r, e, n, i, a) {
      var o = i.length * i.BYTES_PER_ELEMENT;
      if (a < 0) return t.bufferData(r, i, n), o;
      if (o + a > e)
        throw new Error(
          'gl-buffer: If resizing buffer, must not specify offset'
        );
      return t.bufferSubData(r, a, i), e;
    }
    function l(t, r) {
      for (var e = n.malloc(t.length, r), i = t.length, a = 0; a < i; ++a)
        e[a] = t[a];
      return e;
    }
    (u.bind = function() {
      this.gl.bindBuffer(this.type, this.handle);
    }),
      (u.unbind = function() {
        this.gl.bindBuffer(this.type, null);
      }),
      (u.dispose = function() {
        this.gl.deleteBuffer(this.handle);
      }),
      (u.update = function(t, r) {
        if (
          ('number' != typeof r && (r = -1),
          this.bind(),
          'object' == typeof t && void 0 !== t.shape)
        ) {
          var e = t.dtype;
          if (
            (o.indexOf(e) < 0 && (e = 'float32'),
            this.type === this.gl.ELEMENT_ARRAY_BUFFER)
          )
            e =
              gl.getExtension('OES_element_index_uint') && 'uint16' !== e
                ? 'uint32'
                : 'uint16';
          if (
            e === t.dtype &&
            (function(t, r) {
              for (var e = 1, n = r.length - 1; n >= 0; --n) {
                if (r[n] !== e) return !1;
                e *= t[n];
              }
              return !0;
            })(t.shape, t.stride)
          )
            0 === t.offset && t.data.length === t.shape[0]
              ? (this.length = f(
                  this.gl,
                  this.type,
                  this.length,
                  this.usage,
                  t.data,
                  r
                ))
              : (this.length = f(
                  this.gl,
                  this.type,
                  this.length,
                  this.usage,
                  t.data.subarray(t.offset, t.shape[0]),
                  r
                ));
          else {
            var s = n.malloc(t.size, e),
              u = a(s, t.shape);
            i.assign(u, t),
              (this.length = f(
                this.gl,
                this.type,
                this.length,
                this.usage,
                r < 0 ? s : s.subarray(0, t.size),
                r
              )),
              n.free(s);
          }
        } else if (Array.isArray(t)) {
          var h;
          (h =
            this.type === this.gl.ELEMENT_ARRAY_BUFFER
              ? l(t, 'uint16')
              : l(t, 'float32')),
            (this.length = f(
              this.gl,
              this.type,
              this.length,
              this.usage,
              r < 0 ? h : h.subarray(0, t.length),
              r
            )),
            n.free(h);
        } else if ('object' == typeof t && 'number' == typeof t.length)
          this.length = f(this.gl, this.type, this.length, this.usage, t, r);
        else {
          if ('number' != typeof t && void 0 !== t)
            throw new Error('gl-buffer: Invalid data type');
          if (r >= 0)
            throw new Error(
              'gl-buffer: Cannot specify offset when resizing buffer'
            );
          (t |= 0) <= 0 && (t = 1),
            this.gl.bufferData(this.type, 0 | t, this.usage),
            (this.length = t);
        }
      }),
      (t.exports = function(t, r, e, n) {
        if (
          ((e = e || t.ARRAY_BUFFER),
          (n = n || t.DYNAMIC_DRAW),
          e !== t.ARRAY_BUFFER && e !== t.ELEMENT_ARRAY_BUFFER)
        )
          throw new Error(
            'gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER'
          );
        if (n !== t.DYNAMIC_DRAW && n !== t.STATIC_DRAW && n !== t.STREAM_DRAW)
          throw new Error(
            'gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW'
          );
        var i = new s(t, e, t.createBuffer(), 0, n);
        return i.update(r), i;
      });
  },
  function(t, r, e) {
    'use strict';
    (function(t) {
      /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
      var n = e(21),
        i = e(22),
        a = e(23);
      function o() {
        return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function s(t, r) {
        if (o() < r) throw new RangeError('Invalid typed array length');
        return (
          u.TYPED_ARRAY_SUPPORT
            ? ((t = new Uint8Array(r)).__proto__ = u.prototype)
            : (null === t && (t = new u(r)), (t.length = r)),
          t
        );
      }
      function u(t, r, e) {
        if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
          return new u(t, r, e);
        if ('number' == typeof t) {
          if ('string' == typeof r)
            throw new Error(
              'If encoding is specified then the first argument must be a string'
            );
          return h(this, t);
        }
        return f(this, t, r, e);
      }
      function f(t, r, e, n) {
        if ('number' == typeof r)
          throw new TypeError('"value" argument must not be a number');
        return 'undefined' != typeof ArrayBuffer && r instanceof ArrayBuffer
          ? (function(t, r, e, n) {
              if ((r.byteLength, e < 0 || r.byteLength < e))
                throw new RangeError("'offset' is out of bounds");
              if (r.byteLength < e + (n || 0))
                throw new RangeError("'length' is out of bounds");
              r =
                void 0 === e && void 0 === n
                  ? new Uint8Array(r)
                  : void 0 === n
                    ? new Uint8Array(r, e)
                    : new Uint8Array(r, e, n);
              u.TYPED_ARRAY_SUPPORT
                ? ((t = r).__proto__ = u.prototype)
                : (t = c(t, r));
              return t;
            })(t, r, e, n)
          : 'string' == typeof r
            ? (function(t, r, e) {
                ('string' == typeof e && '' !== e) || (e = 'utf8');
                if (!u.isEncoding(e))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var n = 0 | _(r, e),
                  i = (t = s(t, n)).write(r, e);
                i !== n && (t = t.slice(0, i));
                return t;
              })(t, r, e)
            : (function(t, r) {
                if (u.isBuffer(r)) {
                  var e = 0 | p(r.length);
                  return 0 === (t = s(t, e)).length
                    ? t
                    : (r.copy(t, 0, 0, e), t);
                }
                if (r) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      r.buffer instanceof ArrayBuffer) ||
                    'length' in r
                  )
                    return 'number' != typeof r.length ||
                      (function(t) {
                        return t != t;
                      })(r.length)
                      ? s(t, 0)
                      : c(t, r);
                  if ('Buffer' === r.type && a(r.data)) return c(t, r.data);
                }
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                );
              })(t, r);
      }
      function l(t) {
        if ('number' != typeof t)
          throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function h(t, r) {
        if ((l(r), (t = s(t, r < 0 ? 0 : 0 | p(r))), !u.TYPED_ARRAY_SUPPORT))
          for (var e = 0; e < r; ++e) t[e] = 0;
        return t;
      }
      function c(t, r) {
        var e = r.length < 0 ? 0 : 0 | p(r.length);
        t = s(t, e);
        for (var n = 0; n < e; n += 1) t[n] = 255 & r[n];
        return t;
      }
      function p(t) {
        if (t >= o())
          throw new RangeError(
            'Attempt to allocate Buffer larger than maximum size: 0x' +
              o().toString(16) +
              ' bytes'
          );
        return 0 | t;
      }
      function _(t, r) {
        if (u.isBuffer(t)) return t.length;
        if (
          'undefined' != typeof ArrayBuffer &&
          'function' == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
        )
          return t.byteLength;
        'string' != typeof t && (t = '' + t);
        var e = t.length;
        if (0 === e) return 0;
        for (var n = !1; ; )
          switch (r) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return e;
            case 'utf8':
            case 'utf-8':
            case void 0:
              return V(t).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 2 * e;
            case 'hex':
              return e >>> 1;
            case 'base64':
              return k(t).length;
            default:
              if (n) return V(t).length;
              (r = ('' + r).toLowerCase()), (n = !0);
          }
      }
      function g(t, r, e) {
        var n = t[r];
        (t[r] = t[e]), (t[e] = n);
      }
      function E(t, r, e, n, i) {
        if (0 === t.length) return -1;
        if (
          ('string' == typeof e
            ? ((n = e), (e = 0))
            : e > 2147483647
              ? (e = 2147483647)
              : e < -2147483648 && (e = -2147483648),
          (e = +e),
          isNaN(e) && (e = i ? 0 : t.length - 1),
          e < 0 && (e = t.length + e),
          e >= t.length)
        ) {
          if (i) return -1;
          e = t.length - 1;
        } else if (e < 0) {
          if (!i) return -1;
          e = 0;
        }
        if (('string' == typeof r && (r = u.from(r, n)), u.isBuffer(r)))
          return 0 === r.length ? -1 : d(t, r, e, n, i);
        if ('number' == typeof r)
          return (
            (r &= 255),
            u.TYPED_ARRAY_SUPPORT &&
            'function' == typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(t, r, e)
                : Uint8Array.prototype.lastIndexOf.call(t, r, e)
              : d(t, [r], e, n, i)
          );
        throw new TypeError('val must be string, number or Buffer');
      }
      function d(t, r, e, n, i) {
        var a,
          o = 1,
          s = t.length,
          u = r.length;
        if (
          void 0 !== n &&
          ('ucs2' === (n = String(n).toLowerCase()) ||
            'ucs-2' === n ||
            'utf16le' === n ||
            'utf-16le' === n)
        ) {
          if (t.length < 2 || r.length < 2) return -1;
          (o = 2), (s /= 2), (u /= 2), (e /= 2);
        }
        function f(t, r) {
          return 1 === o ? t[r] : t.readUInt16BE(r * o);
        }
        if (i) {
          var l = -1;
          for (a = e; a < s; a++)
            if (f(t, a) === f(r, -1 === l ? 0 : a - l)) {
              if ((-1 === l && (l = a), a - l + 1 === u)) return l * o;
            } else -1 !== l && (a -= a - l), (l = -1);
        } else
          for (e + u > s && (e = s - u), a = e; a >= 0; a--) {
            for (var h = !0, c = 0; c < u; c++)
              if (f(t, a + c) !== f(r, c)) {
                h = !1;
                break;
              }
            if (h) return a;
          }
        return -1;
      }
      function y(t, r, e, n) {
        e = Number(e) || 0;
        var i = t.length - e;
        n ? (n = Number(n)) > i && (n = i) : (n = i);
        var a = r.length;
        if (a % 2 != 0) throw new TypeError('Invalid hex string');
        n > a / 2 && (n = a / 2);
        for (var o = 0; o < n; ++o) {
          var s = parseInt(r.substr(2 * o, 2), 16);
          if (isNaN(s)) return o;
          t[e + o] = s;
        }
        return o;
      }
      function T(t, r, e, n) {
        return X(V(r, t.length - e), t, e, n);
      }
      function A(t, r, e, n) {
        return X(
          (function(t) {
            for (var r = [], e = 0; e < t.length; ++e)
              r.push(255 & t.charCodeAt(e));
            return r;
          })(r),
          t,
          e,
          n
        );
      }
      function b(t, r, e, n) {
        return A(t, r, e, n);
      }
      function v(t, r, e, n) {
        return X(k(r), t, e, n);
      }
      function m(t, r, e, n) {
        return X(
          (function(t, r) {
            for (
              var e, n, i, a = [], o = 0;
              o < t.length && !((r -= 2) < 0);
              ++o
            )
              (e = t.charCodeAt(o)),
                (n = e >> 8),
                (i = e % 256),
                a.push(i),
                a.push(n);
            return a;
          })(r, t.length - e),
          t,
          e,
          n
        );
      }
      function R(t, r, e) {
        return 0 === r && e === t.length
          ? n.fromByteArray(t)
          : n.fromByteArray(t.slice(r, e));
      }
      function w(t, r, e) {
        e = Math.min(t.length, e);
        for (var n = [], i = r; i < e; ) {
          var a,
            o,
            s,
            u,
            f = t[i],
            l = null,
            h = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
          if (i + h <= e)
            switch (h) {
              case 1:
                f < 128 && (l = f);
                break;
              case 2:
                128 == (192 & (a = t[i + 1])) &&
                  (u = ((31 & f) << 6) | (63 & a)) > 127 &&
                  (l = u);
                break;
              case 3:
                (a = t[i + 1]),
                  (o = t[i + 2]),
                  128 == (192 & a) &&
                    128 == (192 & o) &&
                    (u = ((15 & f) << 12) | ((63 & a) << 6) | (63 & o)) >
                      2047 &&
                    (u < 55296 || u > 57343) &&
                    (l = u);
                break;
              case 4:
                (a = t[i + 1]),
                  (o = t[i + 2]),
                  (s = t[i + 3]),
                  128 == (192 & a) &&
                    128 == (192 & o) &&
                    128 == (192 & s) &&
                    (u =
                      ((15 & f) << 18) |
                      ((63 & a) << 12) |
                      ((63 & o) << 6) |
                      (63 & s)) > 65535 &&
                    u < 1114112 &&
                    (l = u);
            }
          null === l
            ? ((l = 65533), (h = 1))
            : l > 65535 &&
              ((l -= 65536),
              n.push(((l >>> 10) & 1023) | 55296),
              (l = 56320 | (1023 & l))),
            n.push(l),
            (i += h);
        }
        return (function(t) {
          var r = t.length;
          if (r <= I) return String.fromCharCode.apply(String, t);
          var e = '',
            n = 0;
          for (; n < r; )
            e += String.fromCharCode.apply(String, t.slice(n, (n += I)));
          return e;
        })(n);
      }
      (r.Buffer = u),
        (r.SlowBuffer = function(t) {
          +t != t && (t = 0);
          return u.alloc(+t);
        }),
        (r.INSPECT_MAX_BYTES = 50),
        (u.TYPED_ARRAY_SUPPORT =
          void 0 !== t.TYPED_ARRAY_SUPPORT
            ? t.TYPED_ARRAY_SUPPORT
            : (function() {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function() {
                        return 42;
                      }
                    }),
                    42 === t.foo() &&
                      'function' == typeof t.subarray &&
                      0 === t.subarray(1, 1).byteLength
                  );
                } catch (t) {
                  return !1;
                }
              })()),
        (r.kMaxLength = o()),
        (u.poolSize = 8192),
        (u._augment = function(t) {
          return (t.__proto__ = u.prototype), t;
        }),
        (u.from = function(t, r, e) {
          return f(null, t, r, e);
        }),
        u.TYPED_ARRAY_SUPPORT &&
          ((u.prototype.__proto__ = Uint8Array.prototype),
          (u.__proto__ = Uint8Array),
          'undefined' != typeof Symbol &&
            Symbol.species &&
            u[Symbol.species] === u &&
            Object.defineProperty(u, Symbol.species, {
              value: null,
              configurable: !0
            })),
        (u.alloc = function(t, r, e) {
          return (function(t, r, e, n) {
            return (
              l(r),
              r <= 0
                ? s(t, r)
                : void 0 !== e
                  ? 'string' == typeof n
                    ? s(t, r).fill(e, n)
                    : s(t, r).fill(e)
                  : s(t, r)
            );
          })(null, t, r, e);
        }),
        (u.allocUnsafe = function(t) {
          return h(null, t);
        }),
        (u.allocUnsafeSlow = function(t) {
          return h(null, t);
        }),
        (u.isBuffer = function(t) {
          return !(null == t || !t._isBuffer);
        }),
        (u.compare = function(t, r) {
          if (!u.isBuffer(t) || !u.isBuffer(r))
            throw new TypeError('Arguments must be Buffers');
          if (t === r) return 0;
          for (
            var e = t.length, n = r.length, i = 0, a = Math.min(e, n);
            i < a;
            ++i
          )
            if (t[i] !== r[i]) {
              (e = t[i]), (n = r[i]);
              break;
            }
          return e < n ? -1 : n < e ? 1 : 0;
        }),
        (u.isEncoding = function(t) {
          switch (String(t).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return !0;
            default:
              return !1;
          }
        }),
        (u.concat = function(t, r) {
          if (!a(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return u.alloc(0);
          var e;
          if (void 0 === r)
            for (r = 0, e = 0; e < t.length; ++e) r += t[e].length;
          var n = u.allocUnsafe(r),
            i = 0;
          for (e = 0; e < t.length; ++e) {
            var o = t[e];
            if (!u.isBuffer(o))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            o.copy(n, i), (i += o.length);
          }
          return n;
        }),
        (u.byteLength = _),
        (u.prototype._isBuffer = !0),
        (u.prototype.swap16 = function() {
          var t = this.length;
          if (t % 2 != 0)
            throw new RangeError('Buffer size must be a multiple of 16-bits');
          for (var r = 0; r < t; r += 2) g(this, r, r + 1);
          return this;
        }),
        (u.prototype.swap32 = function() {
          var t = this.length;
          if (t % 4 != 0)
            throw new RangeError('Buffer size must be a multiple of 32-bits');
          for (var r = 0; r < t; r += 4)
            g(this, r, r + 3), g(this, r + 1, r + 2);
          return this;
        }),
        (u.prototype.swap64 = function() {
          var t = this.length;
          if (t % 8 != 0)
            throw new RangeError('Buffer size must be a multiple of 64-bits');
          for (var r = 0; r < t; r += 8)
            g(this, r, r + 7),
              g(this, r + 1, r + 6),
              g(this, r + 2, r + 5),
              g(this, r + 3, r + 4);
          return this;
        }),
        (u.prototype.toString = function() {
          var t = 0 | this.length;
          return 0 === t
            ? ''
            : 0 === arguments.length
              ? w(this, 0, t)
              : function(t, r, e) {
                  var n = !1;
                  if (((void 0 === r || r < 0) && (r = 0), r > this.length))
                    return '';
                  if (
                    ((void 0 === e || e > this.length) && (e = this.length),
                    e <= 0)
                  )
                    return '';
                  if ((e >>>= 0) <= (r >>>= 0)) return '';
                  for (t || (t = 'utf8'); ; )
                    switch (t) {
                      case 'hex':
                        return S(this, r, e);
                      case 'utf8':
                      case 'utf-8':
                        return w(this, r, e);
                      case 'ascii':
                        return N(this, r, e);
                      case 'latin1':
                      case 'binary':
                        return x(this, r, e);
                      case 'base64':
                        return R(this, r, e);
                      case 'ucs2':
                      case 'ucs-2':
                      case 'utf16le':
                      case 'utf-16le':
                        return U(this, r, e);
                      default:
                        if (n) throw new TypeError('Unknown encoding: ' + t);
                        (t = (t + '').toLowerCase()), (n = !0);
                    }
                }.apply(this, arguments);
        }),
        (u.prototype.equals = function(t) {
          if (!u.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
          return this === t || 0 === u.compare(this, t);
        }),
        (u.prototype.inspect = function() {
          var t = '',
            e = r.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((t = this.toString('hex', 0, e)
                .match(/.{2}/g)
                .join(' ')),
              this.length > e && (t += ' ... ')),
            '<Buffer ' + t + '>'
          );
        }),
        (u.prototype.compare = function(t, r, e, n, i) {
          if (!u.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
          if (
            (void 0 === r && (r = 0),
            void 0 === e && (e = t ? t.length : 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = this.length),
            r < 0 || e > t.length || n < 0 || i > this.length)
          )
            throw new RangeError('out of range index');
          if (n >= i && r >= e) return 0;
          if (n >= i) return -1;
          if (r >= e) return 1;
          if (((r >>>= 0), (e >>>= 0), (n >>>= 0), (i >>>= 0), this === t))
            return 0;
          for (
            var a = i - n,
              o = e - r,
              s = Math.min(a, o),
              f = this.slice(n, i),
              l = t.slice(r, e),
              h = 0;
            h < s;
            ++h
          )
            if (f[h] !== l[h]) {
              (a = f[h]), (o = l[h]);
              break;
            }
          return a < o ? -1 : o < a ? 1 : 0;
        }),
        (u.prototype.includes = function(t, r, e) {
          return -1 !== this.indexOf(t, r, e);
        }),
        (u.prototype.indexOf = function(t, r, e) {
          return E(this, t, r, e, !0);
        }),
        (u.prototype.lastIndexOf = function(t, r, e) {
          return E(this, t, r, e, !1);
        }),
        (u.prototype.write = function(t, r, e, n) {
          if (void 0 === r) (n = 'utf8'), (e = this.length), (r = 0);
          else if (void 0 === e && 'string' == typeof r)
            (n = r), (e = this.length), (r = 0);
          else {
            if (!isFinite(r))
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              );
            (r |= 0),
              isFinite(e)
                ? ((e |= 0), void 0 === n && (n = 'utf8'))
                : ((n = e), (e = void 0));
          }
          var i = this.length - r;
          if (
            ((void 0 === e || e > i) && (e = i),
            (t.length > 0 && (e < 0 || r < 0)) || r > this.length)
          )
            throw new RangeError('Attempt to write outside buffer bounds');
          n || (n = 'utf8');
          for (var a = !1; ; )
            switch (n) {
              case 'hex':
                return y(this, t, r, e);
              case 'utf8':
              case 'utf-8':
                return T(this, t, r, e);
              case 'ascii':
                return A(this, t, r, e);
              case 'latin1':
              case 'binary':
                return b(this, t, r, e);
              case 'base64':
                return v(this, t, r, e);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return m(this, t, r, e);
              default:
                if (a) throw new TypeError('Unknown encoding: ' + n);
                (n = ('' + n).toLowerCase()), (a = !0);
            }
        }),
        (u.prototype.toJSON = function() {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        });
      var I = 4096;
      function N(t, r, e) {
        var n = '';
        e = Math.min(t.length, e);
        for (var i = r; i < e; ++i) n += String.fromCharCode(127 & t[i]);
        return n;
      }
      function x(t, r, e) {
        var n = '';
        e = Math.min(t.length, e);
        for (var i = r; i < e; ++i) n += String.fromCharCode(t[i]);
        return n;
      }
      function S(t, r, e) {
        var n = t.length;
        (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
        for (var i = '', a = r; a < e; ++a) i += j(t[a]);
        return i;
      }
      function U(t, r, e) {
        for (var n = t.slice(r, e), i = '', a = 0; a < n.length; a += 2)
          i += String.fromCharCode(n[a] + 256 * n[a + 1]);
        return i;
      }
      function P(t, r, e) {
        if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
        if (t + r > e)
          throw new RangeError('Trying to access beyond buffer length');
      }
      function M(t, r, e, n, i, a) {
        if (!u.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (r > i || r < a)
          throw new RangeError('"value" argument is out of bounds');
        if (e + n > t.length) throw new RangeError('Index out of range');
      }
      function O(t, r, e, n) {
        r < 0 && (r = 65535 + r + 1);
        for (var i = 0, a = Math.min(t.length - e, 2); i < a; ++i)
          t[e + i] =
            (r & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
      }
      function F(t, r, e, n) {
        r < 0 && (r = 4294967295 + r + 1);
        for (var i = 0, a = Math.min(t.length - e, 4); i < a; ++i)
          t[e + i] = (r >>> (8 * (n ? i : 3 - i))) & 255;
      }
      function L(t, r, e, n, i, a) {
        if (e + n > t.length) throw new RangeError('Index out of range');
        if (e < 0) throw new RangeError('Index out of range');
      }
      function C(t, r, e, n, a) {
        return a || L(t, 0, e, 4), i.write(t, r, e, n, 23, 4), e + 4;
      }
      function D(t, r, e, n, a) {
        return a || L(t, 0, e, 8), i.write(t, r, e, n, 52, 8), e + 8;
      }
      (u.prototype.slice = function(t, r) {
        var e,
          n = this.length;
        if (
          ((t = ~~t),
          (r = void 0 === r ? n : ~~r),
          t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
          r < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n),
          r < t && (r = t),
          u.TYPED_ARRAY_SUPPORT)
        )
          (e = this.subarray(t, r)).__proto__ = u.prototype;
        else {
          var i = r - t;
          e = new u(i, void 0);
          for (var a = 0; a < i; ++a) e[a] = this[a + t];
        }
        return e;
      }),
        (u.prototype.readUIntLE = function(t, r, e) {
          (t |= 0), (r |= 0), e || P(t, r, this.length);
          for (var n = this[t], i = 1, a = 0; ++a < r && (i *= 256); )
            n += this[t + a] * i;
          return n;
        }),
        (u.prototype.readUIntBE = function(t, r, e) {
          (t |= 0), (r |= 0), e || P(t, r, this.length);
          for (var n = this[t + --r], i = 1; r > 0 && (i *= 256); )
            n += this[t + --r] * i;
          return n;
        }),
        (u.prototype.readUInt8 = function(t, r) {
          return r || P(t, 1, this.length), this[t];
        }),
        (u.prototype.readUInt16LE = function(t, r) {
          return r || P(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }),
        (u.prototype.readUInt16BE = function(t, r) {
          return r || P(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }),
        (u.prototype.readUInt32LE = function(t, r) {
          return (
            r || P(t, 4, this.length),
            (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
              16777216 * this[t + 3]
          );
        }),
        (u.prototype.readUInt32BE = function(t, r) {
          return (
            r || P(t, 4, this.length),
            16777216 * this[t] +
              ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
          );
        }),
        (u.prototype.readIntLE = function(t, r, e) {
          (t |= 0), (r |= 0), e || P(t, r, this.length);
          for (var n = this[t], i = 1, a = 0; ++a < r && (i *= 256); )
            n += this[t + a] * i;
          return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n;
        }),
        (u.prototype.readIntBE = function(t, r, e) {
          (t |= 0), (r |= 0), e || P(t, r, this.length);
          for (var n = r, i = 1, a = this[t + --n]; n > 0 && (i *= 256); )
            a += this[t + --n] * i;
          return a >= (i *= 128) && (a -= Math.pow(2, 8 * r)), a;
        }),
        (u.prototype.readInt8 = function(t, r) {
          return (
            r || P(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
          );
        }),
        (u.prototype.readInt16LE = function(t, r) {
          r || P(t, 2, this.length);
          var e = this[t] | (this[t + 1] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (u.prototype.readInt16BE = function(t, r) {
          r || P(t, 2, this.length);
          var e = this[t + 1] | (this[t] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (u.prototype.readInt32LE = function(t, r) {
          return (
            r || P(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (u.prototype.readInt32BE = function(t, r) {
          return (
            r || P(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (u.prototype.readFloatLE = function(t, r) {
          return r || P(t, 4, this.length), i.read(this, t, !0, 23, 4);
        }),
        (u.prototype.readFloatBE = function(t, r) {
          return r || P(t, 4, this.length), i.read(this, t, !1, 23, 4);
        }),
        (u.prototype.readDoubleLE = function(t, r) {
          return r || P(t, 8, this.length), i.read(this, t, !0, 52, 8);
        }),
        (u.prototype.readDoubleBE = function(t, r) {
          return r || P(t, 8, this.length), i.read(this, t, !1, 52, 8);
        }),
        (u.prototype.writeUIntLE = function(t, r, e, n) {
          ((t = +t), (r |= 0), (e |= 0), n) ||
            M(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
          var i = 1,
            a = 0;
          for (this[r] = 255 & t; ++a < e && (i *= 256); )
            this[r + a] = (t / i) & 255;
          return r + e;
        }),
        (u.prototype.writeUIntBE = function(t, r, e, n) {
          ((t = +t), (r |= 0), (e |= 0), n) ||
            M(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
          var i = e - 1,
            a = 1;
          for (this[r + i] = 255 & t; --i >= 0 && (a *= 256); )
            this[r + i] = (t / a) & 255;
          return r + e;
        }),
        (u.prototype.writeUInt8 = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 1, 255, 0),
            u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            (this[r] = 255 & t),
            r + 1
          );
        }),
        (u.prototype.writeUInt16LE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
              : O(this, t, r, !0),
            r + 2
          );
        }),
        (u.prototype.writeUInt16BE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
              : O(this, t, r, !1),
            r + 2
          );
        }),
        (u.prototype.writeUInt32LE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r + 3] = t >>> 24),
                (this[r + 2] = t >>> 16),
                (this[r + 1] = t >>> 8),
                (this[r] = 255 & t))
              : F(this, t, r, !0),
            r + 4
          );
        }),
        (u.prototype.writeUInt32BE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 24),
                (this[r + 1] = t >>> 16),
                (this[r + 2] = t >>> 8),
                (this[r + 3] = 255 & t))
              : F(this, t, r, !1),
            r + 4
          );
        }),
        (u.prototype.writeIntLE = function(t, r, e, n) {
          if (((t = +t), (r |= 0), !n)) {
            var i = Math.pow(2, 8 * e - 1);
            M(this, t, r, e, i - 1, -i);
          }
          var a = 0,
            o = 1,
            s = 0;
          for (this[r] = 255 & t; ++a < e && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[r + a - 1] && (s = 1),
              (this[r + a] = (((t / o) >> 0) - s) & 255);
          return r + e;
        }),
        (u.prototype.writeIntBE = function(t, r, e, n) {
          if (((t = +t), (r |= 0), !n)) {
            var i = Math.pow(2, 8 * e - 1);
            M(this, t, r, e, i - 1, -i);
          }
          var a = e - 1,
            o = 1,
            s = 0;
          for (this[r + a] = 255 & t; --a >= 0 && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[r + a + 1] && (s = 1),
              (this[r + a] = (((t / o) >> 0) - s) & 255);
          return r + e;
        }),
        (u.prototype.writeInt8 = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 1, 127, -128),
            u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            (this[r] = 255 & t),
            r + 1
          );
        }),
        (u.prototype.writeInt16LE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t), (this[r + 1] = t >>> 8))
              : O(this, t, r, !0),
            r + 2
          );
        }),
        (u.prototype.writeInt16BE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 8), (this[r + 1] = 255 & t))
              : O(this, t, r, !1),
            r + 2
          );
        }),
        (u.prototype.writeInt32LE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 4, 2147483647, -2147483648),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r] = 255 & t),
                (this[r + 1] = t >>> 8),
                (this[r + 2] = t >>> 16),
                (this[r + 3] = t >>> 24))
              : F(this, t, r, !0),
            r + 4
          );
        }),
        (u.prototype.writeInt32BE = function(t, r, e) {
          return (
            (t = +t),
            (r |= 0),
            e || M(this, t, r, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[r] = t >>> 24),
                (this[r + 1] = t >>> 16),
                (this[r + 2] = t >>> 8),
                (this[r + 3] = 255 & t))
              : F(this, t, r, !1),
            r + 4
          );
        }),
        (u.prototype.writeFloatLE = function(t, r, e) {
          return C(this, t, r, !0, e);
        }),
        (u.prototype.writeFloatBE = function(t, r, e) {
          return C(this, t, r, !1, e);
        }),
        (u.prototype.writeDoubleLE = function(t, r, e) {
          return D(this, t, r, !0, e);
        }),
        (u.prototype.writeDoubleBE = function(t, r, e) {
          return D(this, t, r, !1, e);
        }),
        (u.prototype.copy = function(t, r, e, n) {
          if (
            (e || (e = 0),
            n || 0 === n || (n = this.length),
            r >= t.length && (r = t.length),
            r || (r = 0),
            n > 0 && n < e && (n = e),
            n === e)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (r < 0) throw new RangeError('targetStart out of bounds');
          if (e < 0 || e >= this.length)
            throw new RangeError('sourceStart out of bounds');
          if (n < 0) throw new RangeError('sourceEnd out of bounds');
          n > this.length && (n = this.length),
            t.length - r < n - e && (n = t.length - r + e);
          var i,
            a = n - e;
          if (this === t && e < r && r < n)
            for (i = a - 1; i >= 0; --i) t[i + r] = this[i + e];
          else if (a < 1e3 || !u.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < a; ++i) t[i + r] = this[i + e];
          else Uint8Array.prototype.set.call(t, this.subarray(e, e + a), r);
          return a;
        }),
        (u.prototype.fill = function(t, r, e, n) {
          if ('string' == typeof t) {
            if (
              ('string' == typeof r
                ? ((n = r), (r = 0), (e = this.length))
                : 'string' == typeof e && ((n = e), (e = this.length)),
              1 === t.length)
            ) {
              var i = t.charCodeAt(0);
              i < 256 && (t = i);
            }
            if (void 0 !== n && 'string' != typeof n)
              throw new TypeError('encoding must be a string');
            if ('string' == typeof n && !u.isEncoding(n))
              throw new TypeError('Unknown encoding: ' + n);
          } else 'number' == typeof t && (t &= 255);
          if (r < 0 || this.length < r || this.length < e)
            throw new RangeError('Out of range index');
          if (e <= r) return this;
          var a;
          if (
            ((r >>>= 0),
            (e = void 0 === e ? this.length : e >>> 0),
            t || (t = 0),
            'number' == typeof t)
          )
            for (a = r; a < e; ++a) this[a] = t;
          else {
            var o = u.isBuffer(t) ? t : V(new u(t, n).toString()),
              s = o.length;
            for (a = 0; a < e - r; ++a) this[a + r] = o[a % s];
          }
          return this;
        });
      var B = /[^+\/0-9A-Za-z-_]/g;
      function j(t) {
        return t < 16 ? '0' + t.toString(16) : t.toString(16);
      }
      function V(t, r) {
        var e;
        r = r || 1 / 0;
        for (var n = t.length, i = null, a = [], o = 0; o < n; ++o) {
          if ((e = t.charCodeAt(o)) > 55295 && e < 57344) {
            if (!i) {
              if (e > 56319) {
                (r -= 3) > -1 && a.push(239, 191, 189);
                continue;
              }
              if (o + 1 === n) {
                (r -= 3) > -1 && a.push(239, 191, 189);
                continue;
              }
              i = e;
              continue;
            }
            if (e < 56320) {
              (r -= 3) > -1 && a.push(239, 191, 189), (i = e);
              continue;
            }
            e = 65536 + (((i - 55296) << 10) | (e - 56320));
          } else i && (r -= 3) > -1 && a.push(239, 191, 189);
          if (((i = null), e < 128)) {
            if ((r -= 1) < 0) break;
            a.push(e);
          } else if (e < 2048) {
            if ((r -= 2) < 0) break;
            a.push((e >> 6) | 192, (63 & e) | 128);
          } else if (e < 65536) {
            if ((r -= 3) < 0) break;
            a.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (63 & e) | 128);
          } else {
            if (!(e < 1114112)) throw new Error('Invalid code point');
            if ((r -= 4) < 0) break;
            a.push(
              (e >> 18) | 240,
              ((e >> 12) & 63) | 128,
              ((e >> 6) & 63) | 128,
              (63 & e) | 128
            );
          }
        }
        return a;
      }
      function k(t) {
        return n.toByteArray(
          (function(t) {
            if (
              (t = (function(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '');
              })(t).replace(B, '')).length < 2
            )
              return '';
            for (; t.length % 4 != 0; ) t += '=';
            return t;
          })(t)
        );
      }
      function X(t, r, e, n) {
        for (var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i)
          r[i + e] = t[i];
        return i;
      }
    }.call(this, e(5)));
  },
  function(t, r, e) {
    'use strict';
    (r.byteLength = function(t) {
      var r = f(t),
        e = r[0],
        n = r[1];
      return (3 * (e + n)) / 4 - n;
    }),
      (r.toByteArray = function(t) {
        for (
          var r,
            e = f(t),
            n = e[0],
            o = e[1],
            s = new a(
              (function(t, r, e) {
                return (3 * (r + e)) / 4 - e;
              })(0, n, o)
            ),
            u = 0,
            l = o > 0 ? n - 4 : n,
            h = 0;
          h < l;
          h += 4
        )
          (r =
            (i[t.charCodeAt(h)] << 18) |
            (i[t.charCodeAt(h + 1)] << 12) |
            (i[t.charCodeAt(h + 2)] << 6) |
            i[t.charCodeAt(h + 3)]),
            (s[u++] = (r >> 16) & 255),
            (s[u++] = (r >> 8) & 255),
            (s[u++] = 255 & r);
        2 === o &&
          ((r = (i[t.charCodeAt(h)] << 2) | (i[t.charCodeAt(h + 1)] >> 4)),
          (s[u++] = 255 & r));
        1 === o &&
          ((r =
            (i[t.charCodeAt(h)] << 10) |
            (i[t.charCodeAt(h + 1)] << 4) |
            (i[t.charCodeAt(h + 2)] >> 2)),
          (s[u++] = (r >> 8) & 255),
          (s[u++] = 255 & r));
        return s;
      }),
      (r.fromByteArray = function(t) {
        for (
          var r, e = t.length, i = e % 3, a = [], o = 0, s = e - i;
          o < s;
          o += 16383
        )
          a.push(h(t, o, o + 16383 > s ? s : o + 16383));
        1 === i
          ? ((r = t[e - 1]), a.push(n[r >> 2] + n[(r << 4) & 63] + '=='))
          : 2 === i &&
            ((r = (t[e - 2] << 8) + t[e - 1]),
            a.push(n[r >> 10] + n[(r >> 4) & 63] + n[(r << 2) & 63] + '='));
        return a.join('');
      });
    for (
      var n = [],
        i = [],
        a = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
        o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        s = 0,
        u = o.length;
      s < u;
      ++s
    )
      (n[s] = o[s]), (i[o.charCodeAt(s)] = s);
    function f(t) {
      var r = t.length;
      if (r % 4 > 0)
        throw new Error('Invalid string. Length must be a multiple of 4');
      var e = t.indexOf('=');
      return -1 === e && (e = r), [e, e === r ? 0 : 4 - (e % 4)];
    }
    function l(t) {
      return (
        n[(t >> 18) & 63] + n[(t >> 12) & 63] + n[(t >> 6) & 63] + n[63 & t]
      );
    }
    function h(t, r, e) {
      for (var n, i = [], a = r; a < e; a += 3)
        (n =
          ((t[a] << 16) & 16711680) +
          ((t[a + 1] << 8) & 65280) +
          (255 & t[a + 2])),
          i.push(l(n));
      return i.join('');
    }
    (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
  },
  function(t, r) {
    (r.read = function(t, r, e, n, i) {
      var a,
        o,
        s = 8 * i - n - 1,
        u = (1 << s) - 1,
        f = u >> 1,
        l = -7,
        h = e ? i - 1 : 0,
        c = e ? -1 : 1,
        p = t[r + h];
      for (
        h += c, a = p & ((1 << -l) - 1), p >>= -l, l += s;
        l > 0;
        a = 256 * a + t[r + h], h += c, l -= 8
      );
      for (
        o = a & ((1 << -l) - 1), a >>= -l, l += n;
        l > 0;
        o = 256 * o + t[r + h], h += c, l -= 8
      );
      if (0 === a) a = 1 - f;
      else {
        if (a === u) return o ? NaN : (1 / 0) * (p ? -1 : 1);
        (o += Math.pow(2, n)), (a -= f);
      }
      return (p ? -1 : 1) * o * Math.pow(2, a - n);
    }),
      (r.write = function(t, r, e, n, i, a) {
        var o,
          s,
          u,
          f = 8 * a - i - 1,
          l = (1 << f) - 1,
          h = l >> 1,
          c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = n ? 0 : a - 1,
          _ = n ? 1 : -1,
          g = r < 0 || (0 === r && 1 / r < 0) ? 1 : 0;
        for (
          r = Math.abs(r),
            isNaN(r) || r === 1 / 0
              ? ((s = isNaN(r) ? 1 : 0), (o = l))
              : ((o = Math.floor(Math.log(r) / Math.LN2)),
                r * (u = Math.pow(2, -o)) < 1 && (o--, (u *= 2)),
                (r += o + h >= 1 ? c / u : c * Math.pow(2, 1 - h)) * u >= 2 &&
                  (o++, (u /= 2)),
                o + h >= l
                  ? ((s = 0), (o = l))
                  : o + h >= 1
                    ? ((s = (r * u - 1) * Math.pow(2, i)), (o += h))
                    : ((s = r * Math.pow(2, h - 1) * Math.pow(2, i)), (o = 0)));
          i >= 8;
          t[e + p] = 255 & s, p += _, s /= 256, i -= 8
        );
        for (
          o = (o << i) | s, f += i;
          f > 0;
          t[e + p] = 255 & o, p += _, o /= 256, f -= 8
        );
        t[e + p - _] |= 128 * g;
      });
  },
  function(t, r) {
    var e = {}.toString;
    t.exports =
      Array.isArray ||
      function(t) {
        return '[object Array]' == e.call(t);
      };
  },
  function(t, r, e) {
    'use strict';
    'use restrict';
    function n(t) {
      var r = 32;
      return (
        (t &= -t) && r--,
        65535 & t && (r -= 16),
        16711935 & t && (r -= 8),
        252645135 & t && (r -= 4),
        858993459 & t && (r -= 2),
        1431655765 & t && (r -= 1),
        r
      );
    }
    (r.INT_BITS = 32),
      (r.INT_MAX = 2147483647),
      (r.INT_MIN = -1 << 31),
      (r.sign = function(t) {
        return (t > 0) - (t < 0);
      }),
      (r.abs = function(t) {
        var r = t >> 31;
        return (t ^ r) - r;
      }),
      (r.min = function(t, r) {
        return r ^ ((t ^ r) & -(t < r));
      }),
      (r.max = function(t, r) {
        return t ^ ((t ^ r) & -(t < r));
      }),
      (r.isPow2 = function(t) {
        return !(t & (t - 1) || !t);
      }),
      (r.log2 = function(t) {
        var r, e;
        return (
          (r = (t > 65535) << 4),
          (r |= e = ((t >>>= r) > 255) << 3),
          (r |= e = ((t >>>= e) > 15) << 2),
          (r |= e = ((t >>>= e) > 3) << 1) | ((t >>>= e) >> 1)
        );
      }),
      (r.log10 = function(t) {
        return t >= 1e9
          ? 9
          : t >= 1e8
            ? 8
            : t >= 1e7
              ? 7
              : t >= 1e6
                ? 6
                : t >= 1e5
                  ? 5
                  : t >= 1e4
                    ? 4
                    : t >= 1e3
                      ? 3
                      : t >= 100
                        ? 2
                        : t >= 10
                          ? 1
                          : 0;
      }),
      (r.popCount = function(t) {
        return (
          (16843009 *
            (((t =
              (858993459 & (t -= (t >>> 1) & 1431655765)) +
              ((t >>> 2) & 858993459)) +
              (t >>> 4)) &
              252645135)) >>>
          24
        );
      }),
      (r.countTrailingZeros = n),
      (r.nextPow2 = function(t) {
        return (
          (t += 0 === t),
          --t,
          (t |= t >>> 1),
          (t |= t >>> 2),
          (t |= t >>> 4),
          (t |= t >>> 8),
          (t |= t >>> 16) + 1
        );
      }),
      (r.prevPow2 = function(t) {
        return (
          (t |= t >>> 1),
          (t |= t >>> 2),
          (t |= t >>> 4),
          (t |= t >>> 8),
          (t |= t >>> 16) - (t >>> 1)
        );
      }),
      (r.parity = function(t) {
        return (
          (t ^= t >>> 16),
          (t ^= t >>> 8),
          (t ^= t >>> 4),
          (27030 >>> (t &= 15)) & 1
        );
      });
    var i = new Array(256);
    !(function(t) {
      for (var r = 0; r < 256; ++r) {
        var e = r,
          n = r,
          i = 7;
        for (e >>>= 1; e; e >>>= 1) (n <<= 1), (n |= 1 & e), --i;
        t[r] = (n << i) & 255;
      }
    })(i),
      (r.reverse = function(t) {
        return (
          (i[255 & t] << 24) |
          (i[(t >>> 8) & 255] << 16) |
          (i[(t >>> 16) & 255] << 8) |
          i[(t >>> 24) & 255]
        );
      }),
      (r.interleave2 = function(t, r) {
        return (
          (t =
            1431655765 &
            ((t =
              858993459 &
              ((t =
                252645135 &
                ((t = 16711935 & ((t &= 65535) | (t << 8))) | (t << 4))) |
                (t << 2))) |
              (t << 1))) |
          ((r =
            1431655765 &
            ((r =
              858993459 &
              ((r =
                252645135 &
                ((r = 16711935 & ((r &= 65535) | (r << 8))) | (r << 4))) |
                (r << 2))) |
              (r << 1))) <<
            1)
        );
      }),
      (r.deinterleave2 = function(t, r) {
        return (
          ((t =
            65535 &
            ((t =
              16711935 &
              ((t =
                252645135 &
                ((t = 858993459 & ((t = (t >>> r) & 1431655765) | (t >>> 1))) |
                  (t >>> 2))) |
                (t >>> 4))) |
              (t >>> 16))) <<
            16) >>
          16
        );
      }),
      (r.interleave3 = function(t, r, e) {
        return (
          (t =
            1227133513 &
            ((t =
              3272356035 &
              ((t =
                251719695 &
                ((t = 4278190335 & ((t &= 1023) | (t << 16))) | (t << 8))) |
                (t << 4))) |
              (t << 2))),
          (t |=
            (r =
              1227133513 &
              ((r =
                3272356035 &
                ((r =
                  251719695 &
                  ((r = 4278190335 & ((r &= 1023) | (r << 16))) | (r << 8))) |
                  (r << 4))) |
                (r << 2))) << 1) |
            ((e =
              1227133513 &
              ((e =
                3272356035 &
                ((e =
                  251719695 &
                  ((e = 4278190335 & ((e &= 1023) | (e << 16))) | (e << 8))) |
                  (e << 4))) |
                (e << 2))) <<
              2)
        );
      }),
      (r.deinterleave3 = function(t, r) {
        return (
          ((t =
            1023 &
            ((t =
              4278190335 &
              ((t =
                251719695 &
                ((t = 3272356035 & ((t = (t >>> r) & 1227133513) | (t >>> 2))) |
                  (t >>> 4))) |
                (t >>> 8))) |
              (t >>> 16))) <<
            22) >>
          22
        );
      }),
      (r.nextCombination = function(t) {
        var r = t | (t - 1);
        return (r + 1) | (((~r & -~r) - 1) >>> (n(t) + 1));
      });
  },
  function(t, r, e) {
    'use strict';
    t.exports = function(t, r) {
      switch ((void 0 === r && (r = 0), typeof t)) {
        case 'number':
          if (t > 0)
            return (function(t, r) {
              var e, n;
              for (e = new Array(t), n = 0; n < t; ++n) e[n] = r;
              return e;
            })(0 | t, r);
          break;
        case 'object':
          if ('number' == typeof t.length)
            return (function t(r, e, n) {
              var i = 0 | r[n];
              if (i <= 0) return [];
              var a,
                o = new Array(i);
              if (n === r.length - 1) for (a = 0; a < i; ++a) o[a] = e;
              else for (a = 0; a < i; ++a) o[a] = t(r, e, n + 1);
              return o;
            })(t, r, 0);
      }
      return [];
    };
  },
  function(t, r, e) {
    'use strict';
    var n = e(27);
    t.exports = function(t) {
      var r = new function() {
        (this.argTypes = []),
          (this.shimArgs = []),
          (this.arrayArgs = []),
          (this.arrayBlockIndices = []),
          (this.scalarArgs = []),
          (this.offsetArgs = []),
          (this.offsetArgIndex = []),
          (this.indexArgs = []),
          (this.shapeArgs = []),
          (this.funcName = ''),
          (this.pre = null),
          (this.body = null),
          (this.post = null),
          (this.debug = !1);
      }();
      (r.pre = t.pre), (r.body = t.body), (r.post = t.post);
      var e = t.args.slice(0);
      r.argTypes = e;
      for (var i = 0; i < e.length; ++i) {
        var a = e[i];
        if ('array' === a || ('object' == typeof a && a.blockIndices)) {
          if (
            ((r.argTypes[i] = 'array'),
            r.arrayArgs.push(i),
            r.arrayBlockIndices.push(a.blockIndices ? a.blockIndices : 0),
            r.shimArgs.push('array' + i),
            i < r.pre.args.length && r.pre.args[i].count > 0)
          )
            throw new Error('cwise: pre() block may not reference array args');
          if (i < r.post.args.length && r.post.args[i].count > 0)
            throw new Error('cwise: post() block may not reference array args');
        } else if ('scalar' === a)
          r.scalarArgs.push(i), r.shimArgs.push('scalar' + i);
        else if ('index' === a) {
          if (
            (r.indexArgs.push(i),
            i < r.pre.args.length && r.pre.args[i].count > 0)
          )
            throw new Error('cwise: pre() block may not reference array index');
          if (i < r.body.args.length && r.body.args[i].lvalue)
            throw new Error('cwise: body() block may not write to array index');
          if (i < r.post.args.length && r.post.args[i].count > 0)
            throw new Error(
              'cwise: post() block may not reference array index'
            );
        } else if ('shape' === a) {
          if (
            (r.shapeArgs.push(i), i < r.pre.args.length && r.pre.args[i].lvalue)
          )
            throw new Error('cwise: pre() block may not write to array shape');
          if (i < r.body.args.length && r.body.args[i].lvalue)
            throw new Error('cwise: body() block may not write to array shape');
          if (i < r.post.args.length && r.post.args[i].lvalue)
            throw new Error('cwise: post() block may not write to array shape');
        } else {
          if ('object' != typeof a || !a.offset)
            throw new Error('cwise: Unknown argument type ' + e[i]);
          (r.argTypes[i] = 'offset'),
            r.offsetArgs.push({ array: a.array, offset: a.offset }),
            r.offsetArgIndex.push(i);
        }
      }
      if (r.arrayArgs.length <= 0)
        throw new Error('cwise: No array arguments specified');
      if (r.pre.args.length > e.length)
        throw new Error('cwise: Too many arguments in pre() block');
      if (r.body.args.length > e.length)
        throw new Error('cwise: Too many arguments in body() block');
      if (r.post.args.length > e.length)
        throw new Error('cwise: Too many arguments in post() block');
      return (
        (r.debug = !!t.printCode || !!t.debug),
        (r.funcName = t.funcName || 'cwise'),
        (r.blockSize = t.blockSize || 64),
        n(r)
      );
    };
  },
  function(t, r, e) {
    'use strict';
    var n = e(28);
    t.exports = function(t) {
      var r = ["'use strict'", 'var CACHED={}'],
        e = [],
        i = t.funcName + '_cwise_thunk';
      r.push(['return function ', i, '(', t.shimArgs.join(','), '){'].join(''));
      for (
        var a = [],
          o = [],
          s = [
            [
              'array',
              t.arrayArgs[0],
              '.shape.slice(',
              Math.max(0, t.arrayBlockIndices[0]),
              t.arrayBlockIndices[0] < 0
                ? ',' + t.arrayBlockIndices[0] + ')'
                : ')'
            ].join('')
          ],
          u = [],
          f = [],
          l = 0;
        l < t.arrayArgs.length;
        ++l
      ) {
        var h = t.arrayArgs[l];
        e.push(
          ['t', h, '=array', h, '.dtype,', 'r', h, '=array', h, '.order'].join(
            ''
          )
        ),
          a.push('t' + h),
          a.push('r' + h),
          o.push('t' + h),
          o.push('r' + h + '.join()'),
          s.push('array' + h + '.data'),
          s.push('array' + h + '.stride'),
          s.push('array' + h + '.offset|0'),
          l > 0 &&
            (u.push(
              'array' +
                t.arrayArgs[0] +
                '.shape.length===array' +
                h +
                '.shape.length+' +
                (Math.abs(t.arrayBlockIndices[0]) -
                  Math.abs(t.arrayBlockIndices[l]))
            ),
            f.push(
              'array' +
                t.arrayArgs[0] +
                '.shape[shapeIndex+' +
                Math.max(0, t.arrayBlockIndices[0]) +
                ']===array' +
                h +
                '.shape[shapeIndex+' +
                Math.max(0, t.arrayBlockIndices[l]) +
                ']'
            ));
      }
      for (
        t.arrayArgs.length > 1 &&
          (r.push(
            'if (!(' +
              u.join(' && ') +
              ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"
          ),
          r.push(
            'for(var shapeIndex=array' +
              t.arrayArgs[0] +
              '.shape.length-' +
              Math.abs(t.arrayBlockIndices[0]) +
              '; shapeIndex--\x3e0;) {'
          ),
          r.push(
            'if (!(' +
              f.join(' && ') +
              ")) throw new Error('cwise: Arrays do not all have the same shape!')"
          ),
          r.push('}')),
          l = 0;
        l < t.scalarArgs.length;
        ++l
      )
        s.push('scalar' + t.scalarArgs[l]);
      return (
        e.push(['type=[', o.join(','), '].join()'].join('')),
        e.push('proc=CACHED[type]'),
        r.push('var ' + e.join(',')),
        r.push(
          [
            'if(!proc){',
            'CACHED[type]=proc=compile([',
            a.join(','),
            '])}',
            'return proc(',
            s.join(','),
            ')}'
          ].join('')
        ),
        t.debug &&
          console.log(
            '-----Generated thunk:\n' + r.join('\n') + '\n----------'
          ),
        new Function('compile', r.join('\n'))(n.bind(void 0, t))
      );
    };
  },
  function(t, r, e) {
    'use strict';
    var n = e(29);
    function i(t, r, e) {
      var n,
        i,
        a = t.length,
        o = r.arrayArgs.length,
        s = r.indexArgs.length > 0,
        u = [],
        f = [],
        l = 0,
        h = 0;
      for (n = 0; n < a; ++n) f.push(['i', n, '=0'].join(''));
      for (i = 0; i < o; ++i)
        for (n = 0; n < a; ++n)
          (h = l),
            (l = t[n]),
            0 === n
              ? f.push(['d', i, 's', n, '=t', i, 'p', l].join(''))
              : f.push(
                  [
                    'd',
                    i,
                    's',
                    n,
                    '=(t',
                    i,
                    'p',
                    l,
                    '-s',
                    h,
                    '*t',
                    i,
                    'p',
                    h,
                    ')'
                  ].join('')
                );
      for (f.length > 0 && u.push('var ' + f.join(',')), n = a - 1; n >= 0; --n)
        (l = t[n]),
          u.push(['for(i', n, '=0;i', n, '<s', l, ';++i', n, '){'].join(''));
      for (u.push(e), n = 0; n < a; ++n) {
        for (h = l, l = t[n], i = 0; i < o; ++i)
          u.push(['p', i, '+=d', i, 's', n].join(''));
        s &&
          (n > 0 && u.push(['index[', h, ']-=s', h].join('')),
          u.push(['++index[', l, ']'].join(''))),
          u.push('}');
      }
      return u.join('\n');
    }
    function a(t, r, e) {
      for (var n = t.body, i = [], a = [], o = 0; o < t.args.length; ++o) {
        var s = t.args[o];
        if (!(s.count <= 0)) {
          var u = new RegExp(s.name, 'g'),
            f = '',
            l = r.arrayArgs.indexOf(o);
          switch (r.argTypes[o]) {
            case 'offset':
              var h = r.offsetArgIndex.indexOf(o);
              (l = r.offsetArgs[h].array), (f = '+q' + h);
            case 'array':
              f = 'p' + l + f;
              var c = 'l' + o,
                p = 'a' + l;
              if (0 === r.arrayBlockIndices[l])
                1 === s.count
                  ? 'generic' === e[l]
                    ? s.lvalue
                      ? (i.push(['var ', c, '=', p, '.get(', f, ')'].join('')),
                        (n = n.replace(u, c)),
                        a.push([p, '.set(', f, ',', c, ')'].join('')))
                      : (n = n.replace(u, [p, '.get(', f, ')'].join('')))
                    : (n = n.replace(u, [p, '[', f, ']'].join('')))
                  : 'generic' === e[l]
                    ? (i.push(['var ', c, '=', p, '.get(', f, ')'].join('')),
                      (n = n.replace(u, c)),
                      s.lvalue && a.push([p, '.set(', f, ',', c, ')'].join('')))
                    : (i.push(['var ', c, '=', p, '[', f, ']'].join('')),
                      (n = n.replace(u, c)),
                      s.lvalue && a.push([p, '[', f, ']=', c].join('')));
              else {
                for (
                  var _ = [s.name], g = [f], E = 0;
                  E < Math.abs(r.arrayBlockIndices[l]);
                  E++
                )
                  _.push('\\s*\\[([^\\]]+)\\]'),
                    g.push('$' + (E + 1) + '*t' + l + 'b' + E);
                if (
                  ((u = new RegExp(_.join(''), 'g')),
                  (f = g.join('+')),
                  'generic' === e[l])
                )
                  throw new Error(
                    'cwise: Generic arrays not supported in combination with blocks!'
                  );
                n = n.replace(u, [p, '[', f, ']'].join(''));
              }
              break;
            case 'scalar':
              n = n.replace(u, 'Y' + r.scalarArgs.indexOf(o));
              break;
            case 'index':
              n = n.replace(u, 'index');
              break;
            case 'shape':
              n = n.replace(u, 'shape');
          }
        }
      }
      return [i.join('\n'), n, a.join('\n')].join('\n').trim();
    }
    t.exports = function(t, r) {
      for (
        var e = (r[1].length - Math.abs(t.arrayBlockIndices[0])) | 0,
          o = new Array(t.arrayArgs.length),
          s = new Array(t.arrayArgs.length),
          u = 0;
        u < t.arrayArgs.length;
        ++u
      )
        (s[u] = r[2 * u]), (o[u] = r[2 * u + 1]);
      var f = [],
        l = [],
        h = [],
        c = [],
        p = [];
      for (u = 0; u < t.arrayArgs.length; ++u) {
        t.arrayBlockIndices[u] < 0
          ? (h.push(0),
            c.push(e),
            f.push(e),
            l.push(e + t.arrayBlockIndices[u]))
          : (h.push(t.arrayBlockIndices[u]),
            c.push(t.arrayBlockIndices[u] + e),
            f.push(0),
            l.push(t.arrayBlockIndices[u]));
        for (var _ = [], g = 0; g < o[u].length; g++)
          h[u] <= o[u][g] && o[u][g] < c[u] && _.push(o[u][g] - h[u]);
        p.push(_);
      }
      var E = ['SS'],
        d = ["'use strict'"],
        y = [];
      for (g = 0; g < e; ++g) y.push(['s', g, '=SS[', g, ']'].join(''));
      for (u = 0; u < t.arrayArgs.length; ++u) {
        for (
          E.push('a' + u), E.push('t' + u), E.push('p' + u), g = 0;
          g < e;
          ++g
        )
          y.push(['t', u, 'p', g, '=t', u, '[', h[u] + g, ']'].join(''));
        for (g = 0; g < Math.abs(t.arrayBlockIndices[u]); ++g)
          y.push(['t', u, 'b', g, '=t', u, '[', f[u] + g, ']'].join(''));
      }
      for (u = 0; u < t.scalarArgs.length; ++u) E.push('Y' + u);
      if (
        (t.shapeArgs.length > 0 && y.push('shape=SS.slice(0)'),
        t.indexArgs.length > 0)
      ) {
        var T = new Array(e);
        for (u = 0; u < e; ++u) T[u] = '0';
        y.push(['index=[', T.join(','), ']'].join(''));
      }
      for (u = 0; u < t.offsetArgs.length; ++u) {
        var A = t.offsetArgs[u],
          b = [];
        for (g = 0; g < A.offset.length; ++g)
          0 !== A.offset[g] &&
            (1 === A.offset[g]
              ? b.push(['t', A.array, 'p', g].join(''))
              : b.push([A.offset[g], '*t', A.array, 'p', g].join('')));
        0 === b.length
          ? y.push('q' + u + '=0')
          : y.push(['q', u, '=', b.join('+')].join(''));
      }
      var v = n(
        []
          .concat(t.pre.thisVars)
          .concat(t.body.thisVars)
          .concat(t.post.thisVars)
      );
      for (
        (y = y.concat(v)).length > 0 && d.push('var ' + y.join(',')), u = 0;
        u < t.arrayArgs.length;
        ++u
      )
        d.push('p' + u + '|=0');
      t.pre.body.length > 3 && d.push(a(t.pre, t, s));
      var m = a(t.body, t, s),
        R = (function(t) {
          for (var r = 0, e = t[0].length; r < e; ) {
            for (var n = 1; n < t.length; ++n)
              if (t[n][r] !== t[0][r]) return r;
            ++r;
          }
          return r;
        })(p);
      R < e
        ? d.push(
            (function(t, r, e, n) {
              for (
                var a = r.length,
                  o = e.arrayArgs.length,
                  s = e.blockSize,
                  u = e.indexArgs.length > 0,
                  f = [],
                  l = 0;
                l < o;
                ++l
              )
                f.push(['var offset', l, '=p', l].join(''));
              for (l = t; l < a; ++l)
                f.push(
                  ['for(var j' + l + '=SS[', r[l], ']|0;j', l, '>0;){'].join('')
                ),
                  f.push(['if(j', l, '<', s, '){'].join('')),
                  f.push(['s', r[l], '=j', l].join('')),
                  f.push(['j', l, '=0'].join('')),
                  f.push(['}else{s', r[l], '=', s].join('')),
                  f.push(['j', l, '-=', s, '}'].join('')),
                  u && f.push(['index[', r[l], ']=j', l].join(''));
              for (l = 0; l < o; ++l) {
                for (var h = ['offset' + l], c = t; c < a; ++c)
                  h.push(['j', c, '*t', l, 'p', r[c]].join(''));
                f.push(['p', l, '=(', h.join('+'), ')'].join(''));
              }
              for (f.push(i(r, e, n)), l = t; l < a; ++l) f.push('}');
              return f.join('\n');
            })(R, p[0], t, m)
          )
        : d.push(i(p[0], t, m)),
        t.post.body.length > 3 && d.push(a(t.post, t, s)),
        t.debug &&
          console.log(
            '-----Generated cwise routine for ',
            r,
            ':\n' + d.join('\n') + '\n----------'
          );
      var w = [
        t.funcName || 'unnamed',
        '_cwise_loop_',
        o[0].join('s'),
        'm',
        R,
        (function(t) {
          for (var r = new Array(t.length), e = !0, n = 0; n < t.length; ++n) {
            var i = t[n],
              a = i.match(/\d+/);
            (a = a ? a[0] : ''),
              0 === i.charAt(0)
                ? (r[n] = 'u' + i.charAt(1) + a)
                : (r[n] = i.charAt(0) + a),
              n > 0 && (e = e && r[n] === r[n - 1]);
          }
          return e ? r[0] : r.join('');
        })(s)
      ].join('');
      return new Function(
        [
          'function ',
          w,
          '(',
          E.join(','),
          '){',
          d.join('\n'),
          '} return ',
          w
        ].join('')
      )();
    };
  },
  function(t, r, e) {
    'use strict';
    t.exports = function(t, r, e) {
      return 0 === t.length
        ? t
        : r
          ? (e || t.sort(r),
            (function(t, r) {
              for (
                var e = 1, n = t.length, i = t[0], a = t[0], o = 1;
                o < n;
                ++o
              )
                if (((a = i), r((i = t[o]), a))) {
                  if (o === e) {
                    e++;
                    continue;
                  }
                  t[e++] = i;
                }
              return (t.length = e), t;
            })(t, r))
          : (e || t.sort(),
            (function(t) {
              for (
                var r = 1, e = t.length, n = t[0], i = t[0], a = 1;
                a < e;
                ++a, i = n
              )
                if (((i = n), (n = t[a]) !== i)) {
                  if (a === r) {
                    r++;
                    continue;
                  }
                  t[r++] = n;
                }
              return (t.length = r), t;
            })(t));
    };
  },
  function(t, r, e) {
    'use strict';
    t.exports = function(t) {
      for (var r = new Array(t), e = 0; e < t; ++e) r[e] = e;
      return r;
    };
  },
  function(t, r) {
    function e(t) {
      return (
        !!t.constructor &&
        'function' == typeof t.constructor.isBuffer &&
        t.constructor.isBuffer(t)
      );
    }
    /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
    t.exports = function(t) {
      return (
        null != t &&
        (e(t) ||
          (function(t) {
            return (
              'function' == typeof t.readFloatLE &&
              'function' == typeof t.slice &&
              e(t.slice(0, 0))
            );
          })(t) ||
          !!t._isBuffer)
      );
    };
  },
  function(t, r, e) {
    'use strict';
    var n = e(33),
      i = e(34);
    t.exports = function(t, r, e, a) {
      var o,
        s = t.createVertexArray
          ? new function(t) {
              (this.bindVertexArrayOES = t.bindVertexArray.bind(t)),
                (this.createVertexArrayOES = t.createVertexArray.bind(t)),
                (this.deleteVertexArrayOES = t.deleteVertexArray.bind(t));
            }(t)
          : t.getExtension('OES_vertex_array_object');
      return (o = s ? n(t, s) : i(t)).update(r, e, a), o;
    };
  },
  function(t, r, e) {
    'use strict';
    var n = e(8);
    function i(t, r, e, n, i, a) {
      (this.location = t),
        (this.dimension = r),
        (this.a = e),
        (this.b = n),
        (this.c = i),
        (this.d = a);
    }
    function a(t, r, e) {
      (this.gl = t),
        (this._ext = r),
        (this.handle = e),
        (this._attribs = []),
        (this._useElements = !1),
        (this._elementsType = t.UNSIGNED_SHORT);
    }
    (i.prototype.bind = function(t) {
      switch (this.dimension) {
        case 1:
          t.vertexAttrib1f(this.location, this.a);
          break;
        case 2:
          t.vertexAttrib2f(this.location, this.a, this.b);
          break;
        case 3:
          t.vertexAttrib3f(this.location, this.a, this.b, this.c);
          break;
        case 4:
          t.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d);
      }
    }),
      (a.prototype.bind = function() {
        this._ext.bindVertexArrayOES(this.handle);
        for (var t = 0; t < this._attribs.length; ++t)
          this._attribs[t].bind(this.gl);
      }),
      (a.prototype.unbind = function() {
        this._ext.bindVertexArrayOES(null);
      }),
      (a.prototype.dispose = function() {
        this._ext.deleteVertexArrayOES(this.handle);
      }),
      (a.prototype.update = function(t, r, e) {
        if (
          (this.bind(),
          n(this.gl, r, t),
          this.unbind(),
          (this._attribs.length = 0),
          t)
        )
          for (var a = 0; a < t.length; ++a) {
            var o = t[a];
            'number' == typeof o
              ? this._attribs.push(new i(a, 1, o))
              : Array.isArray(o) &&
                this._attribs.push(new i(a, o.length, o[0], o[1], o[2], o[3]));
          }
        (this._useElements = !!r),
          (this._elementsType = e || this.gl.UNSIGNED_SHORT);
      }),
      (a.prototype.draw = function(t, r, e) {
        e = e || 0;
        var n = this.gl;
        this._useElements
          ? n.drawElements(t, r, this._elementsType, e)
          : n.drawArrays(t, e, r);
      }),
      (t.exports = function(t, r) {
        return new a(t, r, r.createVertexArrayOES());
      });
  },
  function(t, r, e) {
    'use strict';
    var n = e(8);
    function i(t) {
      (this.gl = t),
        (this._elements = null),
        (this._attributes = null),
        (this._elementsType = t.UNSIGNED_SHORT);
    }
    (i.prototype.bind = function() {
      n(this.gl, this._elements, this._attributes);
    }),
      (i.prototype.update = function(t, r, e) {
        (this._elements = r),
          (this._attributes = t),
          (this._elementsType = e || this.gl.UNSIGNED_SHORT);
      }),
      (i.prototype.dispose = function() {}),
      (i.prototype.unbind = function() {}),
      (i.prototype.draw = function(t, r, e) {
        e = e || 0;
        var n = this.gl;
        this._elements
          ? n.drawElements(t, r, this._elementsType, e)
          : n.drawArrays(t, e, r);
      }),
      (t.exports = function(t) {
        return new i(t);
      });
  },
  function(t, r, e) {
    'use strict';
    var n = e(9),
      i = e(0);
    function a(t) {
      return new Function('y', 'return function(){return y}')(t);
    }
    function o(t, r) {
      for (var e = new Array(t), n = 0; n < t; ++n) e[n] = r;
      return e;
    }
    t.exports = function(t, r, e, s) {
      function u(t, r, e) {
        switch (e) {
          case 'bool':
          case 'int':
          case 'sampler2D':
          case 'samplerCube':
            return 'gl.uniform1i(locations[' + r + '],obj' + t + ')';
          case 'float':
            return 'gl.uniform1f(locations[' + r + '],obj' + t + ')';
          default:
            var n = e.indexOf('vec');
            if (!(0 <= n && n <= 1 && e.length === 4 + n)) {
              if (0 === e.indexOf('mat') && 4 === e.length) {
                var a = e.charCodeAt(e.length - 1) - 48;
                if (a < 2 || a > 4)
                  throw new i(
                    '',
                    'Invalid uniform dimension type for matrix ' +
                      name +
                      ': ' +
                      e
                  );
                return (
                  'gl.uniformMatrix' +
                  a +
                  'fv(locations[' +
                  r +
                  '],false,obj' +
                  t +
                  ')'
                );
              }
              throw new i(
                '',
                'Unknown uniform data type for ' + name + ': ' + e
              );
            }
            var a = e.charCodeAt(e.length - 1) - 48;
            if (a < 2 || a > 4) throw new i('', 'Invalid data type');
            switch (e.charAt(0)) {
              case 'b':
              case 'i':
                return (
                  'gl.uniform' + a + 'iv(locations[' + r + '],obj' + t + ')'
                );
              case 'v':
                return (
                  'gl.uniform' + a + 'fv(locations[' + r + '],obj' + t + ')'
                );
              default:
                throw new i(
                  '',
                  'Unrecognized data type for vector ' + name + ': ' + e
                );
            }
        }
      }
      function f(r) {
        for (
          var n = ['return function updateProperty(obj){'],
            i = (function t(r, e) {
              if ('object' != typeof e) return [[r, e]];
              var n = [];
              for (var i in e) {
                var a = e[i],
                  o = r;
                parseInt(i) + '' === i ? (o += '[' + i + ']') : (o += '.' + i),
                  'object' == typeof a
                    ? n.push.apply(n, t(o, a))
                    : n.push([o, a]);
              }
              return n;
            })('', r),
            a = 0;
          a < i.length;
          ++a
        ) {
          var o = i[a],
            f = o[0],
            l = o[1];
          s[l] && n.push(u(f, l, e[l].type));
        }
        n.push('return obj}');
        var h = new Function('gl', 'locations', n.join('\n'));
        return h(t, s);
      }
      function l(n, u, l) {
        if ('object' == typeof l) {
          var c = h(l);
          Object.defineProperty(n, u, {
            get: a(c),
            set: f(l),
            enumerable: !0,
            configurable: !1
          });
        } else
          s[l]
            ? Object.defineProperty(n, u, {
                get: (function(e) {
                  return new Function(
                    'gl',
                    'wrapper',
                    'locations',
                    'return function(){return gl.getUniform(wrapper.program,locations[' +
                      e +
                      '])}'
                  )(t, r, s);
                })(l),
                set: f(l),
                enumerable: !0,
                configurable: !1
              })
            : (n[u] = (function(t) {
                switch (t) {
                  case 'bool':
                    return !1;
                  case 'int':
                  case 'sampler2D':
                  case 'samplerCube':
                  case 'float':
                    return 0;
                  default:
                    var r = t.indexOf('vec');
                    if (0 <= r && r <= 1 && t.length === 4 + r) {
                      var e = t.charCodeAt(t.length - 1) - 48;
                      if (e < 2 || e > 4) throw new i('', 'Invalid data type');
                      return 'b' === t.charAt(0) ? o(e, !1) : o(e, 0);
                    }
                    if (0 === t.indexOf('mat') && 4 === t.length) {
                      var e = t.charCodeAt(t.length - 1) - 48;
                      if (e < 2 || e > 4)
                        throw new i(
                          '',
                          'Invalid uniform dimension type for matrix ' +
                            name +
                            ': ' +
                            t
                        );
                      return o(e * e, 0);
                    }
                    throw new i(
                      '',
                      'Unknown uniform data type for ' + name + ': ' + t
                    );
                }
              })(e[l].type));
      }
      function h(t) {
        var r;
        if (Array.isArray(t)) {
          r = new Array(t.length);
          for (var e = 0; e < t.length; ++e) l(r, e, t[e]);
        } else for (var n in ((r = {}), t)) l(r, n, t[n]);
        return r;
      }
      var c = n(e, !0);
      return { get: a(h(c)), set: f(c), enumerable: !0, configurable: !0 };
    };
  },
  function(t, r, e) {
    'use strict';
    t.exports = function(t, r, e, i) {
      for (var a = {}, u = 0, f = e.length; u < f; ++u) {
        var l = e[u],
          h = l.name,
          c = l.type,
          p = l.locations;
        switch (c) {
          case 'bool':
          case 'int':
          case 'float':
            o(t, r, p[0], i, 1, a, h);
            break;
          default:
            if (c.indexOf('vec') >= 0) {
              var _ = c.charCodeAt(c.length - 1) - 48;
              if (_ < 2 || _ > 4)
                throw new n(
                  '',
                  'Invalid data type for attribute ' + h + ': ' + c
                );
              o(t, r, p[0], i, _, a, h);
            } else {
              if (!(c.indexOf('mat') >= 0))
                throw new n(
                  '',
                  'Unknown data type for attribute ' + h + ': ' + c
                );
              var _ = c.charCodeAt(c.length - 1) - 48;
              if (_ < 2 || _ > 4)
                throw new n(
                  '',
                  'Invalid data type for attribute ' + h + ': ' + c
                );
              s(t, r, p, i, _, a, h);
            }
        }
      }
      return a;
    };
    var n = e(0);
    function i(t, r, e, n, i, a) {
      (this._gl = t),
        (this._wrapper = r),
        (this._index = e),
        (this._locations = n),
        (this._dimension = i),
        (this._constFunc = a);
    }
    var a = i.prototype;
    function o(t, r, e, n, a, o, s) {
      for (var u = ['gl', 'v'], f = [], l = 0; l < a; ++l)
        u.push('x' + l), f.push('x' + l);
      u.push(
        'if(x0.length===void 0){return gl.vertexAttrib' +
          a +
          'f(v,' +
          f.join() +
          ')}else{return gl.vertexAttrib' +
          a +
          'fv(v,x0)}'
      );
      var h = Function.apply(null, u),
        c = new i(t, r, e, n, a, h);
      Object.defineProperty(o, s, {
        set: function(r) {
          return t.disableVertexAttribArray(n[e]), h(t, n[e], r), r;
        },
        get: function() {
          return c;
        },
        enumerable: !0
      });
    }
    function s(t, r, e, n, i, a, s) {
      for (var u = new Array(i), f = new Array(i), l = 0; l < i; ++l)
        o(t, r, e[l], n, i, u, l), (f[l] = u[l]);
      Object.defineProperty(u, 'location', {
        set: function(t) {
          if (Array.isArray(t))
            for (var r = 0; r < i; ++r) f[r].location = t[r];
          else for (r = 0; r < i; ++r) f[r].location = t + r;
          return t;
        },
        get: function() {
          for (var t = new Array(i), r = 0; r < i; ++r) t[r] = n[e[r]];
          return t;
        },
        enumerable: !0
      }),
        (u.pointer = function(r, a, o, s) {
          (r = r || t.FLOAT), (a = !!a), (o = o || i * i), (s = s || 0);
          for (var u = 0; u < i; ++u) {
            var f = n[e[u]];
            t.vertexAttribPointer(f, i, r, a, o, s + u * i),
              t.enableVertexAttribArray(f);
          }
        });
      var h = new Array(i),
        c = t['vertexAttrib' + i + 'fv'];
      Object.defineProperty(a, s, {
        set: function(r) {
          for (var a = 0; a < i; ++a) {
            var o = n[e[a]];
            if ((t.disableVertexAttribArray(o), Array.isArray(r[0])))
              c.call(t, o, r[a]);
            else {
              for (var s = 0; s < i; ++s) h[s] = r[i * a + s];
              c.call(t, o, h);
            }
          }
          return r;
        },
        get: function() {
          return u;
        },
        enumerable: !0
      });
    }
    (a.pointer = function(t, r, e, n) {
      var i = this._gl,
        a = this._locations[this._index];
      i.vertexAttribPointer(
        a,
        this._dimension,
        t || i.FLOAT,
        !!r,
        e || 0,
        n || 0
      ),
        i.enableVertexAttribArray(a);
    }),
      (a.set = function(t, r, e, n) {
        return this._constFunc(this._locations[this._index], t, r, e, n);
      }),
      Object.defineProperty(a, 'location', {
        get: function() {
          return this._locations[this._index];
        },
        set: function(t) {
          return (
            t !== this._locations[this._index] &&
              ((this._locations[this._index] = 0 | t),
              (this._wrapper.program = null)),
            0 | t
          );
        }
      });
  },
  function(t, r, e) {
    'use strict';
    (r.shader = function(t, r, e) {
      return l(t).getShaderReference(r, e);
    }),
      (r.program = function(t, r, e, n, i) {
        return l(t).getProgram(r, e, n, i);
      });
    var n = e(0),
      i = e(38),
      a = new ('undefined' == typeof WeakMap ? e(52) : WeakMap)(),
      o = 0;
    function s(t, r, e, n, i, a, o) {
      (this.id = t),
        (this.src = r),
        (this.type = e),
        (this.shader = n),
        (this.count = a),
        (this.programs = []),
        (this.cache = o);
    }
    function u(t) {
      (this.gl = t), (this.shaders = [{}, {}]), (this.programs = {});
    }
    s.prototype.dispose = function() {
      if (0 == --this.count) {
        for (
          var t = this.cache, r = t.gl, e = this.programs, n = 0, i = e.length;
          n < i;
          ++n
        ) {
          var a = t.programs[e[n]];
          a && (delete t.programs[n], r.deleteProgram(a));
        }
        r.deleteShader(this.shader),
          delete t.shaders[(this.type === r.FRAGMENT_SHADER) | 0][this.src];
      }
    };
    var f = u.prototype;
    function l(t) {
      var r = a.get(t);
      return r || ((r = new u(t)), a.set(t, r)), r;
    }
    (f.getShaderReference = function(t, r) {
      var e = this.gl,
        a = this.shaders[(t === e.FRAGMENT_SHADER) | 0],
        u = a[r];
      if (u && e.isShader(u.shader)) u.count += 1;
      else {
        var f = (function(t, r, e) {
          var a = t.createShader(r);
          if (
            (t.shaderSource(a, e),
            t.compileShader(a),
            !t.getShaderParameter(a, t.COMPILE_STATUS))
          ) {
            var o = t.getShaderInfoLog(a);
            try {
              var s = i(o, e, r);
            } catch (t) {
              throw (console.warn('Failed to format compiler error: ' + t),
              new n(o, 'Error compiling shader:\n' + o));
            }
            throw new n(o, s.short, s.long);
          }
          return a;
        })(e, t, r);
        u = a[r] = new s(o++, r, t, f, [], 1, this);
      }
      return u;
    }),
      (f.getProgram = function(t, r, e, i) {
        var a = [t.id, r.id, e.join(':'), i.join(':')].join('@'),
          o = this.programs[a];
        return (
          (o && this.gl.isProgram(o)) ||
            ((this.programs[a] = o = (function(t, r, e, i, a) {
              var o = t.createProgram();
              t.attachShader(o, r), t.attachShader(o, e);
              for (var s = 0; s < i.length; ++s)
                t.bindAttribLocation(o, a[s], i[s]);
              if (
                (t.linkProgram(o), !t.getProgramParameter(o, t.LINK_STATUS))
              ) {
                var u = t.getProgramInfoLog(o);
                throw new n(u, 'Error linking program: ' + u);
              }
              return o;
            })(this.gl, t.shader, r.shader, e, i)),
            t.programs.push(a),
            r.programs.push(a)),
          o
        );
      });
  },
  function(t, r, e) {
    var n = e(39).sprintf,
      i = e(40),
      a = e(42),
      o = e(49);
    t.exports = function(t, r, e) {
      'use strict';
      var s = a(r) || 'of unknown name (see npm glsl-shader-name)',
        u = 'unknown type';
      void 0 !== e && (u = e === i.FRAGMENT_SHADER ? 'fragment' : 'vertex');
      for (
        var f = n('Error compiling %s shader %s:\n', u, s),
          l = n('%s%s', f, t),
          h = t.split('\n'),
          c = {},
          p = 0;
        p < h.length;
        p++
      ) {
        var _ = h[p];
        if ('' !== _ && '\0' !== _) {
          var g = parseInt(_.split(':')[2]);
          if (isNaN(g)) throw new Error(n('Could not parse error: %s', _));
          c[g] = _;
        }
      }
      for (var E = o(r).split('\n'), p = 0; p < E.length; p++)
        if (c[p + 3] || c[p + 2] || c[p + 1]) {
          var d = E[p];
          if (((f += d + '\n'), c[p + 1])) {
            var y = c[p + 1];
            (y = y.substr(y.split(':', 3).join(':').length + 1).trim()),
              (f += n('^^^ %s\n\n', y));
          }
        }
      return { long: f.trim(), short: l.trim() };
    };
  },
  function(t, r, e) {
    var n;
    !(function() {
      'use strict';
      var i = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
      };
      function a(t) {
        return (function(t, r) {
          var e,
            n,
            o,
            s,
            u,
            f,
            l,
            h,
            c,
            p = 1,
            _ = t.length,
            g = '';
          for (n = 0; n < _; n++)
            if ('string' == typeof t[n]) g += t[n];
            else if (Array.isArray(t[n])) {
              if ((s = t[n])[2])
                for (e = r[p], o = 0; o < s[2].length; o++) {
                  if (!e.hasOwnProperty(s[2][o]))
                    throw new Error(
                      a('[sprintf] property "%s" does not exist', s[2][o])
                    );
                  e = e[s[2][o]];
                }
              else e = s[1] ? r[s[1]] : r[p++];
              if (
                (i.not_type.test(s[8]) &&
                  i.not_primitive.test(s[8]) &&
                  e instanceof Function &&
                  (e = e()),
                i.numeric_arg.test(s[8]) && 'number' != typeof e && isNaN(e))
              )
                throw new TypeError(
                  a('[sprintf] expecting number but found %T', e)
                );
              switch ((i.number.test(s[8]) && (h = e >= 0), s[8])) {
                case 'b':
                  e = parseInt(e, 10).toString(2);
                  break;
                case 'c':
                  e = String.fromCharCode(parseInt(e, 10));
                  break;
                case 'd':
                case 'i':
                  e = parseInt(e, 10);
                  break;
                case 'j':
                  e = JSON.stringify(e, null, s[6] ? parseInt(s[6]) : 0);
                  break;
                case 'e':
                  e = s[7]
                    ? parseFloat(e).toExponential(s[7])
                    : parseFloat(e).toExponential();
                  break;
                case 'f':
                  e = s[7] ? parseFloat(e).toFixed(s[7]) : parseFloat(e);
                  break;
                case 'g':
                  e = s[7]
                    ? String(Number(e.toPrecision(s[7])))
                    : parseFloat(e);
                  break;
                case 'o':
                  e = (parseInt(e, 10) >>> 0).toString(8);
                  break;
                case 's':
                  (e = String(e)), (e = s[7] ? e.substring(0, s[7]) : e);
                  break;
                case 't':
                  (e = String(!!e)), (e = s[7] ? e.substring(0, s[7]) : e);
                  break;
                case 'T':
                  (e = Object.prototype.toString
                    .call(e)
                    .slice(8, -1)
                    .toLowerCase()),
                    (e = s[7] ? e.substring(0, s[7]) : e);
                  break;
                case 'u':
                  e = parseInt(e, 10) >>> 0;
                  break;
                case 'v':
                  (e = e.valueOf()), (e = s[7] ? e.substring(0, s[7]) : e);
                  break;
                case 'x':
                  e = (parseInt(e, 10) >>> 0).toString(16);
                  break;
                case 'X':
                  e = (parseInt(e, 10) >>> 0).toString(16).toUpperCase();
              }
              i.json.test(s[8])
                ? (g += e)
                : (!i.number.test(s[8]) || (h && !s[3])
                    ? (c = '')
                    : ((c = h ? '+' : '-'),
                      (e = e.toString().replace(i.sign, ''))),
                  (f = s[4] ? ('0' === s[4] ? '0' : s[4].charAt(1)) : ' '),
                  (l = s[6] - (c + e).length),
                  (u = s[6] && l > 0 ? f.repeat(l) : ''),
                  (g += s[5] ? c + e + u : '0' === f ? c + u + e : u + c + e));
            }
          return g;
        })(
          (function(t) {
            if (s[t]) return s[t];
            var r,
              e = t,
              n = [],
              a = 0;
            for (; e; ) {
              if (null !== (r = i.text.exec(e))) n.push(r[0]);
              else if (null !== (r = i.modulo.exec(e))) n.push('%');
              else {
                if (null === (r = i.placeholder.exec(e)))
                  throw new SyntaxError('[sprintf] unexpected placeholder');
                if (r[2]) {
                  a |= 1;
                  var o = [],
                    u = r[2],
                    f = [];
                  if (null === (f = i.key.exec(u)))
                    throw new SyntaxError(
                      '[sprintf] failed to parse named argument key'
                    );
                  for (o.push(f[1]); '' !== (u = u.substring(f[0].length)); )
                    if (null !== (f = i.key_access.exec(u))) o.push(f[1]);
                    else {
                      if (null === (f = i.index_access.exec(u)))
                        throw new SyntaxError(
                          '[sprintf] failed to parse named argument key'
                        );
                      o.push(f[1]);
                    }
                  r[2] = o;
                } else a |= 2;
                if (3 === a)
                  throw new Error(
                    '[sprintf] mixing positional and named placeholders is not (yet) supported'
                  );
                n.push(r);
              }
              e = e.substring(r[0].length);
            }
            return (s[t] = n);
          })(t),
          arguments
        );
      }
      function o(t, r) {
        return a.apply(null, [t].concat(r || []));
      }
      var s = Object.create(null);
      (r.sprintf = a),
        (r.vsprintf = o),
        'undefined' != typeof window &&
          ((window.sprintf = a),
          (window.vsprintf = o),
          void 0 ===
            (n = function() {
              return { sprintf: a, vsprintf: o };
            }.call(r, e, r, t)) || (t.exports = n));
    })();
  },
  function(t, r, e) {
    var n = e(41);
    t.exports = function(t) {
      return n[t];
    };
  },
  function(t, r) {
    t.exports = {
      0: 'NONE',
      1: 'ONE',
      2: 'LINE_LOOP',
      3: 'LINE_STRIP',
      4: 'TRIANGLES',
      5: 'TRIANGLE_STRIP',
      6: 'TRIANGLE_FAN',
      256: 'DEPTH_BUFFER_BIT',
      512: 'NEVER',
      513: 'LESS',
      514: 'EQUAL',
      515: 'LEQUAL',
      516: 'GREATER',
      517: 'NOTEQUAL',
      518: 'GEQUAL',
      519: 'ALWAYS',
      768: 'SRC_COLOR',
      769: 'ONE_MINUS_SRC_COLOR',
      770: 'SRC_ALPHA',
      771: 'ONE_MINUS_SRC_ALPHA',
      772: 'DST_ALPHA',
      773: 'ONE_MINUS_DST_ALPHA',
      774: 'DST_COLOR',
      775: 'ONE_MINUS_DST_COLOR',
      776: 'SRC_ALPHA_SATURATE',
      1024: 'STENCIL_BUFFER_BIT',
      1028: 'FRONT',
      1029: 'BACK',
      1032: 'FRONT_AND_BACK',
      1280: 'INVALID_ENUM',
      1281: 'INVALID_VALUE',
      1282: 'INVALID_OPERATION',
      1285: 'OUT_OF_MEMORY',
      1286: 'INVALID_FRAMEBUFFER_OPERATION',
      2304: 'CW',
      2305: 'CCW',
      2849: 'LINE_WIDTH',
      2884: 'CULL_FACE',
      2885: 'CULL_FACE_MODE',
      2886: 'FRONT_FACE',
      2928: 'DEPTH_RANGE',
      2929: 'DEPTH_TEST',
      2930: 'DEPTH_WRITEMASK',
      2931: 'DEPTH_CLEAR_VALUE',
      2932: 'DEPTH_FUNC',
      2960: 'STENCIL_TEST',
      2961: 'STENCIL_CLEAR_VALUE',
      2962: 'STENCIL_FUNC',
      2963: 'STENCIL_VALUE_MASK',
      2964: 'STENCIL_FAIL',
      2965: 'STENCIL_PASS_DEPTH_FAIL',
      2966: 'STENCIL_PASS_DEPTH_PASS',
      2967: 'STENCIL_REF',
      2968: 'STENCIL_WRITEMASK',
      2978: 'VIEWPORT',
      3024: 'DITHER',
      3042: 'BLEND',
      3088: 'SCISSOR_BOX',
      3089: 'SCISSOR_TEST',
      3106: 'COLOR_CLEAR_VALUE',
      3107: 'COLOR_WRITEMASK',
      3317: 'UNPACK_ALIGNMENT',
      3333: 'PACK_ALIGNMENT',
      3379: 'MAX_TEXTURE_SIZE',
      3386: 'MAX_VIEWPORT_DIMS',
      3408: 'SUBPIXEL_BITS',
      3410: 'RED_BITS',
      3411: 'GREEN_BITS',
      3412: 'BLUE_BITS',
      3413: 'ALPHA_BITS',
      3414: 'DEPTH_BITS',
      3415: 'STENCIL_BITS',
      3553: 'TEXTURE_2D',
      4352: 'DONT_CARE',
      4353: 'FASTEST',
      4354: 'NICEST',
      5120: 'BYTE',
      5121: 'UNSIGNED_BYTE',
      5122: 'SHORT',
      5123: 'UNSIGNED_SHORT',
      5124: 'INT',
      5125: 'UNSIGNED_INT',
      5126: 'FLOAT',
      5386: 'INVERT',
      5890: 'TEXTURE',
      6401: 'STENCIL_INDEX',
      6402: 'DEPTH_COMPONENT',
      6406: 'ALPHA',
      6407: 'RGB',
      6408: 'RGBA',
      6409: 'LUMINANCE',
      6410: 'LUMINANCE_ALPHA',
      7680: 'KEEP',
      7681: 'REPLACE',
      7682: 'INCR',
      7683: 'DECR',
      7936: 'VENDOR',
      7937: 'RENDERER',
      7938: 'VERSION',
      9728: 'NEAREST',
      9729: 'LINEAR',
      9984: 'NEAREST_MIPMAP_NEAREST',
      9985: 'LINEAR_MIPMAP_NEAREST',
      9986: 'NEAREST_MIPMAP_LINEAR',
      9987: 'LINEAR_MIPMAP_LINEAR',
      10240: 'TEXTURE_MAG_FILTER',
      10241: 'TEXTURE_MIN_FILTER',
      10242: 'TEXTURE_WRAP_S',
      10243: 'TEXTURE_WRAP_T',
      10497: 'REPEAT',
      10752: 'POLYGON_OFFSET_UNITS',
      16384: 'COLOR_BUFFER_BIT',
      32769: 'CONSTANT_COLOR',
      32770: 'ONE_MINUS_CONSTANT_COLOR',
      32771: 'CONSTANT_ALPHA',
      32772: 'ONE_MINUS_CONSTANT_ALPHA',
      32773: 'BLEND_COLOR',
      32774: 'FUNC_ADD',
      32777: 'BLEND_EQUATION_RGB',
      32778: 'FUNC_SUBTRACT',
      32779: 'FUNC_REVERSE_SUBTRACT',
      32819: 'UNSIGNED_SHORT_4_4_4_4',
      32820: 'UNSIGNED_SHORT_5_5_5_1',
      32823: 'POLYGON_OFFSET_FILL',
      32824: 'POLYGON_OFFSET_FACTOR',
      32854: 'RGBA4',
      32855: 'RGB5_A1',
      32873: 'TEXTURE_BINDING_2D',
      32926: 'SAMPLE_ALPHA_TO_COVERAGE',
      32928: 'SAMPLE_COVERAGE',
      32936: 'SAMPLE_BUFFERS',
      32937: 'SAMPLES',
      32938: 'SAMPLE_COVERAGE_VALUE',
      32939: 'SAMPLE_COVERAGE_INVERT',
      32968: 'BLEND_DST_RGB',
      32969: 'BLEND_SRC_RGB',
      32970: 'BLEND_DST_ALPHA',
      32971: 'BLEND_SRC_ALPHA',
      33071: 'CLAMP_TO_EDGE',
      33170: 'GENERATE_MIPMAP_HINT',
      33189: 'DEPTH_COMPONENT16',
      33306: 'DEPTH_STENCIL_ATTACHMENT',
      33635: 'UNSIGNED_SHORT_5_6_5',
      33648: 'MIRRORED_REPEAT',
      33901: 'ALIASED_POINT_SIZE_RANGE',
      33902: 'ALIASED_LINE_WIDTH_RANGE',
      33984: 'TEXTURE0',
      33985: 'TEXTURE1',
      33986: 'TEXTURE2',
      33987: 'TEXTURE3',
      33988: 'TEXTURE4',
      33989: 'TEXTURE5',
      33990: 'TEXTURE6',
      33991: 'TEXTURE7',
      33992: 'TEXTURE8',
      33993: 'TEXTURE9',
      33994: 'TEXTURE10',
      33995: 'TEXTURE11',
      33996: 'TEXTURE12',
      33997: 'TEXTURE13',
      33998: 'TEXTURE14',
      33999: 'TEXTURE15',
      34000: 'TEXTURE16',
      34001: 'TEXTURE17',
      34002: 'TEXTURE18',
      34003: 'TEXTURE19',
      34004: 'TEXTURE20',
      34005: 'TEXTURE21',
      34006: 'TEXTURE22',
      34007: 'TEXTURE23',
      34008: 'TEXTURE24',
      34009: 'TEXTURE25',
      34010: 'TEXTURE26',
      34011: 'TEXTURE27',
      34012: 'TEXTURE28',
      34013: 'TEXTURE29',
      34014: 'TEXTURE30',
      34015: 'TEXTURE31',
      34016: 'ACTIVE_TEXTURE',
      34024: 'MAX_RENDERBUFFER_SIZE',
      34041: 'DEPTH_STENCIL',
      34055: 'INCR_WRAP',
      34056: 'DECR_WRAP',
      34067: 'TEXTURE_CUBE_MAP',
      34068: 'TEXTURE_BINDING_CUBE_MAP',
      34069: 'TEXTURE_CUBE_MAP_POSITIVE_X',
      34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X',
      34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y',
      34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y',
      34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z',
      34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z',
      34076: 'MAX_CUBE_MAP_TEXTURE_SIZE',
      34338: 'VERTEX_ATTRIB_ARRAY_ENABLED',
      34339: 'VERTEX_ATTRIB_ARRAY_SIZE',
      34340: 'VERTEX_ATTRIB_ARRAY_STRIDE',
      34341: 'VERTEX_ATTRIB_ARRAY_TYPE',
      34342: 'CURRENT_VERTEX_ATTRIB',
      34373: 'VERTEX_ATTRIB_ARRAY_POINTER',
      34466: 'NUM_COMPRESSED_TEXTURE_FORMATS',
      34467: 'COMPRESSED_TEXTURE_FORMATS',
      34660: 'BUFFER_SIZE',
      34661: 'BUFFER_USAGE',
      34816: 'STENCIL_BACK_FUNC',
      34817: 'STENCIL_BACK_FAIL',
      34818: 'STENCIL_BACK_PASS_DEPTH_FAIL',
      34819: 'STENCIL_BACK_PASS_DEPTH_PASS',
      34877: 'BLEND_EQUATION_ALPHA',
      34921: 'MAX_VERTEX_ATTRIBS',
      34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED',
      34930: 'MAX_TEXTURE_IMAGE_UNITS',
      34962: 'ARRAY_BUFFER',
      34963: 'ELEMENT_ARRAY_BUFFER',
      34964: 'ARRAY_BUFFER_BINDING',
      34965: 'ELEMENT_ARRAY_BUFFER_BINDING',
      34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING',
      35040: 'STREAM_DRAW',
      35044: 'STATIC_DRAW',
      35048: 'DYNAMIC_DRAW',
      35632: 'FRAGMENT_SHADER',
      35633: 'VERTEX_SHADER',
      35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      35663: 'SHADER_TYPE',
      35664: 'FLOAT_VEC2',
      35665: 'FLOAT_VEC3',
      35666: 'FLOAT_VEC4',
      35667: 'INT_VEC2',
      35668: 'INT_VEC3',
      35669: 'INT_VEC4',
      35670: 'BOOL',
      35671: 'BOOL_VEC2',
      35672: 'BOOL_VEC3',
      35673: 'BOOL_VEC4',
      35674: 'FLOAT_MAT2',
      35675: 'FLOAT_MAT3',
      35676: 'FLOAT_MAT4',
      35678: 'SAMPLER_2D',
      35680: 'SAMPLER_CUBE',
      35712: 'DELETE_STATUS',
      35713: 'COMPILE_STATUS',
      35714: 'LINK_STATUS',
      35715: 'VALIDATE_STATUS',
      35716: 'INFO_LOG_LENGTH',
      35717: 'ATTACHED_SHADERS',
      35718: 'ACTIVE_UNIFORMS',
      35719: 'ACTIVE_UNIFORM_MAX_LENGTH',
      35720: 'SHADER_SOURCE_LENGTH',
      35721: 'ACTIVE_ATTRIBUTES',
      35722: 'ACTIVE_ATTRIBUTE_MAX_LENGTH',
      35724: 'SHADING_LANGUAGE_VERSION',
      35725: 'CURRENT_PROGRAM',
      36003: 'STENCIL_BACK_REF',
      36004: 'STENCIL_BACK_VALUE_MASK',
      36005: 'STENCIL_BACK_WRITEMASK',
      36006: 'FRAMEBUFFER_BINDING',
      36007: 'RENDERBUFFER_BINDING',
      36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE',
      36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME',
      36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL',
      36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE',
      36053: 'FRAMEBUFFER_COMPLETE',
      36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT',
      36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT',
      36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS',
      36061: 'FRAMEBUFFER_UNSUPPORTED',
      36064: 'COLOR_ATTACHMENT0',
      36096: 'DEPTH_ATTACHMENT',
      36128: 'STENCIL_ATTACHMENT',
      36160: 'FRAMEBUFFER',
      36161: 'RENDERBUFFER',
      36162: 'RENDERBUFFER_WIDTH',
      36163: 'RENDERBUFFER_HEIGHT',
      36164: 'RENDERBUFFER_INTERNAL_FORMAT',
      36168: 'STENCIL_INDEX8',
      36176: 'RENDERBUFFER_RED_SIZE',
      36177: 'RENDERBUFFER_GREEN_SIZE',
      36178: 'RENDERBUFFER_BLUE_SIZE',
      36179: 'RENDERBUFFER_ALPHA_SIZE',
      36180: 'RENDERBUFFER_DEPTH_SIZE',
      36181: 'RENDERBUFFER_STENCIL_SIZE',
      36194: 'RGB565',
      36336: 'LOW_FLOAT',
      36337: 'MEDIUM_FLOAT',
      36338: 'HIGH_FLOAT',
      36339: 'LOW_INT',
      36340: 'MEDIUM_INT',
      36341: 'HIGH_INT',
      36346: 'SHADER_COMPILER',
      36347: 'MAX_VERTEX_UNIFORM_VECTORS',
      36348: 'MAX_VARYING_VECTORS',
      36349: 'MAX_FRAGMENT_UNIFORM_VECTORS',
      37440: 'UNPACK_FLIP_Y_WEBGL',
      37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      37442: 'CONTEXT_LOST_WEBGL',
      37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      37444: 'BROWSER_DEFAULT_WEBGL'
    };
  },
  function(t, r, e) {
    var n = e(43),
      i = e(48);
    t.exports = function(t) {
      for (var r = Array.isArray(t) ? t : n(t), e = 0; e < r.length; e++) {
        var a = r[e];
        if ('preprocessor' === a.type) {
          var o = a.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/);
          if (o && o[2]) {
            var s = o[1],
              u = o[2];
            return (s ? i(u) : u).trim();
          }
        }
      }
    };
  },
  function(t, r, e) {
    var n = e(44);
    t.exports = function(t, r) {
      var e = n(r),
        i = [];
      return (i = (i = i.concat(e(t))).concat(e(null)));
    };
  },
  function(t, r, e) {
    t.exports = function(t) {
      var r,
        e,
        m,
        R = 0,
        w = 0,
        I = u,
        N = [],
        x = [],
        S = 1,
        U = 0,
        P = 0,
        M = !1,
        O = !1,
        F = '',
        L = a,
        C = n;
      '300 es' === (t = t || {}).version && ((L = s), (C = o));
      for (var D = {}, B = {}, R = 0; R < L.length; R++) D[L[R]] = !0;
      for (var R = 0; R < C.length; R++) B[C[R]] = !0;
      return function(t) {
        return (
          (x = []),
          null !== t
            ? (function(t) {
                (R = 0), t.toString && (t = t.toString());
                var e;
                (F += t.replace(/\r\n/g, '\n')), (m = F.length);
                for (; (r = F[R]), R < m; ) {
                  switch (((e = R), I)) {
                    case l:
                      R = G();
                      break;
                    case h:
                    case c:
                      R = X();
                      break;
                    case p:
                      R = H();
                      break;
                    case _:
                      R = z();
                      break;
                    case b:
                      R = W();
                      break;
                    case g:
                      R = q();
                      break;
                    case f:
                      R = K();
                      break;
                    case T:
                      R = k();
                      break;
                    case u:
                      R = V();
                  }
                  if (e !== R)
                    switch (F[e]) {
                      case '\n':
                        (U = 0), ++S;
                        break;
                      default:
                        ++U;
                    }
                }
                return (w += R), (F = F.slice(R)), x;
              })(t)
            : (function(t) {
                N.length && j(N.join(''));
                return (I = A), j('(eof)'), x;
              })()
        );
      };
      function j(t) {
        t.length &&
          x.push({ type: v[I], data: t, position: P, line: S, column: U });
      }
      function V() {
        return (
          (N = N.length ? [] : N),
          '/' === e && '*' === r
            ? ((P = w + R - 1), (I = l), (e = r), R + 1)
            : '/' === e && '/' === r
              ? ((P = w + R - 1), (I = h), (e = r), R + 1)
              : '#' === r
                ? ((I = c), (P = w + R), R)
                : /\s/.test(r)
                  ? ((I = T), (P = w + R), R)
                  : ((M = /\d/.test(r)),
                    (O = /[^\w_]/.test(r)),
                    (P = w + R),
                    (I = M ? _ : O ? p : f),
                    R)
        );
      }
      function k() {
        return /[^\s]/g.test(r)
          ? (j(N.join('')), (I = u), R)
          : (N.push(r), (e = r), R + 1);
      }
      function X() {
        return ('\r' !== r && '\n' !== r) || '\\' === e
          ? (N.push(r), (e = r), R + 1)
          : (j(N.join('')), (I = u), R);
      }
      function G() {
        return '/' === r && '*' === e
          ? (N.push(r), j(N.join('')), (I = u), R + 1)
          : (N.push(r), (e = r), R + 1);
      }
      function H() {
        if ('.' === e && /\d/.test(r)) return (I = g), R;
        if ('/' === e && '*' === r) return (I = l), R;
        if ('/' === e && '/' === r) return (I = h), R;
        if ('.' === r && N.length) {
          for (; Y(N); );
          return (I = g), R;
        }
        if (';' === r || ')' === r || '(' === r) {
          if (N.length) for (; Y(N); );
          return j(r), (I = u), R + 1;
        }
        var t = 2 === N.length && '=' !== r;
        if (/[\w_\d\s]/.test(r) || t) {
          for (; Y(N); );
          return (I = u), R;
        }
        return N.push(r), (e = r), R + 1;
      }
      function Y(t) {
        for (var r, e, n = 0; ; ) {
          if (
            ((r = i.indexOf(t.slice(0, t.length + n).join(''))),
            (e = i[r]),
            -1 === r)
          ) {
            if (n-- + t.length > 0) continue;
            e = t.slice(0, 1).join('');
          }
          return j(e), (P += e.length), (N = N.slice(e.length)).length;
        }
      }
      function W() {
        return /[^a-fA-F0-9]/.test(r)
          ? (j(N.join('')), (I = u), R)
          : (N.push(r), (e = r), R + 1);
      }
      function z() {
        return '.' === r
          ? (N.push(r), (I = g), (e = r), R + 1)
          : /[eE]/.test(r)
            ? (N.push(r), (I = g), (e = r), R + 1)
            : 'x' === r && 1 === N.length && '0' === N[0]
              ? ((I = b), N.push(r), (e = r), R + 1)
              : /[^\d]/.test(r)
                ? (j(N.join('')), (I = u), R)
                : (N.push(r), (e = r), R + 1);
      }
      function q() {
        return (
          'f' === r && (N.push(r), (e = r), (R += 1)),
          /[eE]/.test(r)
            ? (N.push(r), (e = r), R + 1)
            : '-' === r && /[eE]/.test(e)
              ? (N.push(r), (e = r), R + 1)
              : /[^\d]/.test(r)
                ? (j(N.join('')), (I = u), R)
                : (N.push(r), (e = r), R + 1)
        );
      }
      function K() {
        if (/[^\d\w_]/.test(r)) {
          var t = N.join('');
          return (I = B[t] ? y : D[t] ? d : E), j(N.join('')), (I = u), R;
        }
        return N.push(r), (e = r), R + 1;
      }
    };
    var n = e(10),
      i = e(45),
      a = e(11),
      o = e(46),
      s = e(47),
      u = 999,
      f = 9999,
      l = 0,
      h = 1,
      c = 2,
      p = 3,
      _ = 4,
      g = 5,
      E = 6,
      d = 7,
      y = 8,
      T = 9,
      A = 10,
      b = 11,
      v = [
        'block-comment',
        'line-comment',
        'preprocessor',
        'operator',
        'integer',
        'float',
        'ident',
        'builtin',
        'keyword',
        'whitespace',
        'eof',
        'integer'
      ];
  },
  function(t, r) {
    t.exports = [
      '<<=',
      '>>=',
      '++',
      '--',
      '<<',
      '>>',
      '<=',
      '>=',
      '==',
      '!=',
      '&&',
      '||',
      '+=',
      '-=',
      '*=',
      '/=',
      '%=',
      '&=',
      '^^',
      '^=',
      '|=',
      '(',
      ')',
      '[',
      ']',
      '.',
      '!',
      '~',
      '*',
      '/',
      '%',
      '+',
      '-',
      '<',
      '>',
      '&',
      '^',
      '|',
      '?',
      ':',
      '=',
      ',',
      ';',
      '{',
      '}'
    ];
  },
  function(t, r, e) {
    var n = e(10);
    t.exports = n
      .slice()
      .concat([
        'layout',
        'centroid',
        'smooth',
        'case',
        'mat2x2',
        'mat2x3',
        'mat2x4',
        'mat3x2',
        'mat3x3',
        'mat3x4',
        'mat4x2',
        'mat4x3',
        'mat4x4',
        'uvec2',
        'uvec3',
        'uvec4',
        'samplerCubeShadow',
        'sampler2DArray',
        'sampler2DArrayShadow',
        'isampler2D',
        'isampler3D',
        'isamplerCube',
        'isampler2DArray',
        'usampler2D',
        'usampler3D',
        'usamplerCube',
        'usampler2DArray',
        'coherent',
        'restrict',
        'readonly',
        'writeonly',
        'resource',
        'atomic_uint',
        'noperspective',
        'patch',
        'sample',
        'subroutine',
        'common',
        'partition',
        'active',
        'filter',
        'image1D',
        'image2D',
        'image3D',
        'imageCube',
        'iimage1D',
        'iimage2D',
        'iimage3D',
        'iimageCube',
        'uimage1D',
        'uimage2D',
        'uimage3D',
        'uimageCube',
        'image1DArray',
        'image2DArray',
        'iimage1DArray',
        'iimage2DArray',
        'uimage1DArray',
        'uimage2DArray',
        'image1DShadow',
        'image2DShadow',
        'image1DArrayShadow',
        'image2DArrayShadow',
        'imageBuffer',
        'iimageBuffer',
        'uimageBuffer',
        'sampler1DArray',
        'sampler1DArrayShadow',
        'isampler1D',
        'isampler1DArray',
        'usampler1D',
        'usampler1DArray',
        'isampler2DRect',
        'usampler2DRect',
        'samplerBuffer',
        'isamplerBuffer',
        'usamplerBuffer',
        'sampler2DMS',
        'isampler2DMS',
        'usampler2DMS',
        'sampler2DMSArray',
        'isampler2DMSArray',
        'usampler2DMSArray'
      ]);
  },
  function(t, r, e) {
    var n = e(11);
    (n = n.slice().filter(function(t) {
      return !/^(gl\_|texture)/.test(t);
    })),
      (t.exports = n.concat([
        'gl_VertexID',
        'gl_InstanceID',
        'gl_Position',
        'gl_PointSize',
        'gl_FragCoord',
        'gl_FrontFacing',
        'gl_FragDepth',
        'gl_PointCoord',
        'gl_MaxVertexAttribs',
        'gl_MaxVertexUniformVectors',
        'gl_MaxVertexOutputVectors',
        'gl_MaxFragmentInputVectors',
        'gl_MaxVertexTextureImageUnits',
        'gl_MaxCombinedTextureImageUnits',
        'gl_MaxTextureImageUnits',
        'gl_MaxFragmentUniformVectors',
        'gl_MaxDrawBuffers',
        'gl_MinProgramTexelOffset',
        'gl_MaxProgramTexelOffset',
        'gl_DepthRangeParameters',
        'gl_DepthRange',
        'trunc',
        'round',
        'roundEven',
        'isnan',
        'isinf',
        'floatBitsToInt',
        'floatBitsToUint',
        'intBitsToFloat',
        'uintBitsToFloat',
        'packSnorm2x16',
        'unpackSnorm2x16',
        'packUnorm2x16',
        'unpackUnorm2x16',
        'packHalf2x16',
        'unpackHalf2x16',
        'outerProduct',
        'transpose',
        'determinant',
        'inverse',
        'texture',
        'textureSize',
        'textureProj',
        'textureLod',
        'textureOffset',
        'texelFetch',
        'texelFetchOffset',
        'textureProjOffset',
        'textureLodOffset',
        'textureProjLod',
        'textureProjLodOffset',
        'textureGrad',
        'textureGradOffset',
        'textureProjGrad',
        'textureProjGradOffset'
      ]));
  },
  function(t, r) {
    t.exports = function(t) {
      return atob(t);
    };
  },
  function(t, r, e) {
    var n = e(50);
    t.exports = function(t, r, e) {
      (r = 'number' == typeof r ? r : 1), (e = e || ': ');
      var i = t.split(/\r?\n/),
        a = String(i.length + r - 1).length;
      return i
        .map(function(t, i) {
          var o = i + r,
            s = String(o).length,
            u = n(o, a - s);
          return u + e + t;
        })
        .join('\n');
    };
  },
  function(t, r, e) {
    'use strict';
    /*!
 * pad-left <https://github.com/jonschlinkert/pad-left>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */ var n = e(
      51
    );
    t.exports = function(t, r, e) {
      return n((e = void 0 !== e ? e + '' : ' '), r) + t;
    };
  },
  function(t, r, e) {
    'use strict';
    /*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */ var n,
      i = '';
    t.exports = function(t, r) {
      if ('string' != typeof t) throw new TypeError('expected a string');
      if (1 === r) return t;
      if (2 === r) return t + t;
      var e = t.length * r;
      if (n !== t || void 0 === n) (n = t), (i = '');
      else if (i.length >= e) return i.substr(0, e);
      for (; e > i.length && r > 1; ) 1 & r && (i += t), (r >>= 1), (t += t);
      return (i = (i += t).substr(0, e));
    };
  },
  function(t, r, e) {
    var n = e(53);
    t.exports = function() {
      var t = n();
      return {
        get: function(r, e) {
          var n = t(r);
          return n.hasOwnProperty('value') ? n.value : e;
        },
        set: function(r, e) {
          return (t(r).value = e), this;
        },
        has: function(r) {
          return 'value' in t(r);
        },
        delete: function(r) {
          return delete t(r).value;
        }
      };
    };
  },
  function(t, r, e) {
    var n = e(54);
    t.exports = function() {
      var t = {};
      return function(r) {
        if (('object' != typeof r || null === r) && 'function' != typeof r)
          throw new Error('Weakmap-shim: Key must be object');
        var e = r.valueOf(t);
        return e && e.identity === t ? e : n(r, t);
      };
    };
  },
  function(t, r) {
    t.exports = function(t, r) {
      var e = { identity: r },
        n = t.valueOf;
      return (
        Object.defineProperty(t, 'valueOf', {
          value: function(t) {
            return t !== r ? n.apply(this, arguments) : e;
          },
          writable: !0
        }),
        e
      );
    };
  },
  function(t, r, e) {
    'use strict';
    (r.uniforms = function(t, r) {
      for (
        var e = t.getProgramParameter(r, t.ACTIVE_UNIFORMS), n = [], i = 0;
        i < e;
        ++i
      ) {
        var o = t.getActiveUniform(r, i);
        if (o) {
          var s = a(t, o.type);
          if (o.size > 1)
            for (var u = 0; u < o.size; ++u)
              n.push({ name: o.name.replace('[0]', '[' + u + ']'), type: s });
          else n.push({ name: o.name, type: s });
        }
      }
      return n;
    }),
      (r.attributes = function(t, r) {
        for (
          var e = t.getProgramParameter(r, t.ACTIVE_ATTRIBUTES), n = [], i = 0;
          i < e;
          ++i
        ) {
          var o = t.getActiveAttrib(r, i);
          o && n.push({ name: o.name, type: a(t, o.type) });
        }
        return n;
      });
    var n = {
        FLOAT: 'float',
        FLOAT_VEC2: 'vec2',
        FLOAT_VEC3: 'vec3',
        FLOAT_VEC4: 'vec4',
        INT: 'int',
        INT_VEC2: 'ivec2',
        INT_VEC3: 'ivec3',
        INT_VEC4: 'ivec4',
        BOOL: 'bool',
        BOOL_VEC2: 'bvec2',
        BOOL_VEC3: 'bvec3',
        BOOL_VEC4: 'bvec4',
        FLOAT_MAT2: 'mat2',
        FLOAT_MAT3: 'mat3',
        FLOAT_MAT4: 'mat4',
        SAMPLER_2D: 'sampler2D',
        SAMPLER_CUBE: 'samplerCube'
      },
      i = null;
    function a(t, r) {
      if (!i) {
        var e = Object.keys(n);
        i = {};
        for (var a = 0; a < e.length; ++a) {
          var o = e[a];
          i[t[o]] = n[o];
        }
      }
      return i[r];
    }
  },
  function(t, r) {
    t.exports = function(t, r) {
      if ('string' != typeof t) throw new TypeError('must specify type string');
      if (((r = r || {}), 'undefined' == typeof document && !r.canvas))
        return null;
      var e = r.canvas || document.createElement('canvas');
      'number' == typeof r.width && (e.width = r.width);
      'number' == typeof r.height && (e.height = r.height);
      var n,
        i = r;
      try {
        var a = [t];
        0 === t.indexOf('webgl') && a.push('experimental-' + t);
        for (var o = 0; o < a.length; o++)
          if ((n = e.getContext(a[o], i))) return n;
      } catch (t) {
        n = null;
      }
      return n || null;
    };
  }
]);
