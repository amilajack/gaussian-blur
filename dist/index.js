!(function(r) {
  var t = {};
  function e(n) {
    if (t[n]) return t[n].exports;
    var i = (t[n] = { i: n, l: !1, exports: {} });
    return r[n].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
  }
  (e.m = r),
    (e.c = t),
    (e.d = function(r, t, n) {
      e.o(r, t) || Object.defineProperty(r, t, { enumerable: !0, get: n });
    }),
    (e.r = function(r) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(r, '__esModule', { value: !0 });
    }),
    (e.t = function(r, t) {
      if ((1 & t && (r = e(r)), 8 & t)) return r;
      if (4 & t && 'object' == typeof r && r && r.__esModule) return r;
      var n = Object.create(null);
      if (
        (e.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: r }),
        2 & t && 'string' != typeof r)
      )
        for (var i in r)
          e.d(
            n,
            i,
            function(t) {
              return r[t];
            }.bind(null, i)
          );
      return n;
    }),
    (e.n = function(r) {
      var t =
        r && r.__esModule
          ? function() {
              return r.default;
            }
          : function() {
              return r;
            };
      return e.d(t, 'a', t), t;
    }),
    (e.o = function(r, t) {
      return Object.prototype.hasOwnProperty.call(r, t);
    }),
    (e.p = ''),
    e((e.s = 17));
})([
  function(r, t) {
    function e(r, t, e) {
      (this.shortMessage = t || ''),
        (this.longMessage = e || ''),
        (this.rawError = r || ''),
        (this.message = 'gl-shader: ' + (t || r || '') + (e ? '\n' + e : '')),
        (this.stack = new Error().stack);
    }
    (e.prototype = new Error()),
      (e.prototype.name = 'GLError'),
      (e.prototype.constructor = e),
      (r.exports = e);
  },
  function(r, t, e) {
    'use strict';
    var n = e(7),
      i = e(6),
      a = e(4);
    r.exports = function(r) {
      if (arguments.length <= 1)
        throw new Error(
          'gl-texture2d: Missing arguments for texture2d constructor'
        );
      o ||
        (function(r) {
          (o = [
            r.LINEAR,
            r.NEAREST_MIPMAP_LINEAR,
            r.LINEAR_MIPMAP_NEAREST,
            r.LINEAR_MIPMAP_NEAREST
          ]),
            (s = [
              r.NEAREST,
              r.LINEAR,
              r.NEAREST_MIPMAP_NEAREST,
              r.NEAREST_MIPMAP_LINEAR,
              r.LINEAR_MIPMAP_NEAREST,
              r.LINEAR_MIPMAP_LINEAR
            ]),
            (u = [r.REPEAT, r.CLAMP_TO_EDGE, r.MIRRORED_REPEAT]);
        })(r);
      if ('number' == typeof arguments[1])
        return E(
          r,
          arguments[1],
          arguments[2],
          arguments[3] || r.RGBA,
          arguments[4] || r.UNSIGNED_BYTE
        );
      if (Array.isArray(arguments[1]))
        return E(
          r,
          0 | arguments[1][0],
          0 | arguments[1][1],
          arguments[2] || r.RGBA,
          arguments[3] || r.UNSIGNED_BYTE
        );
      if ('object' == typeof arguments[1]) {
        var t = arguments[1],
          e = f(t) ? t : t.raw;
        if (e)
          return (function(r, t, e, n, i, a) {
            var o = g(r);
            return (
              r.texImage2D(r.TEXTURE_2D, 0, i, i, a, t), new c(r, o, e, n, i, a)
            );
          })(
            r,
            e,
            0 | t.width,
            0 | t.height,
            arguments[2] || r.RGBA,
            arguments[3] || r.UNSIGNED_BYTE
          );
        if (t.shape && t.data && t.stride)
          return (function(r, t) {
            var e = t.dtype,
              o = t.shape.slice(),
              s = r.getParameter(r.MAX_TEXTURE_SIZE);
            if (o[0] < 0 || o[0] > s || o[1] < 0 || o[1] > s)
              throw new Error('gl-texture2d: Invalid texture size');
            var u = _(o, t.stride.slice()),
              f = 0;
            'float32' === e
              ? (f = r.FLOAT)
              : 'float64' === e
                ? ((f = r.FLOAT), (u = !1), (e = 'float32'))
                : 'uint8' === e
                  ? (f = r.UNSIGNED_BYTE)
                  : ((f = r.UNSIGNED_BYTE), (u = !1), (e = 'uint8'));
            var h,
              p,
              E = 0;
            if (2 === o.length)
              (E = r.LUMINANCE),
                (o = [o[0], o[1], 1]),
                (t = n(t.data, o, [t.stride[0], t.stride[1], 1], t.offset));
            else {
              if (3 !== o.length)
                throw new Error('gl-texture2d: Invalid shape for texture');
              if (1 === o[2]) E = r.ALPHA;
              else if (2 === o[2]) E = r.LUMINANCE_ALPHA;
              else if (3 === o[2]) E = r.RGB;
              else {
                if (4 !== o[2])
                  throw new Error(
                    'gl-texture2d: Invalid shape for pixel coords'
                  );
                E = r.RGBA;
              }
            }
            f !== r.FLOAT ||
              r.getExtension('OES_texture_float') ||
              ((f = r.UNSIGNED_BYTE), (u = !1));
            var d = t.size;
            if (u)
              h =
                0 === t.offset && t.data.length === d
                  ? t.data
                  : t.data.subarray(t.offset, t.offset + d);
            else {
              var y = [o[2], o[2] * o[0], 1];
              p = a.malloc(d, e);
              var T = n(p, o, y, 0);
              ('float32' !== e && 'float64' !== e) || f !== r.UNSIGNED_BYTE
                ? i.assign(T, t)
                : l(T, t),
                (h = p.subarray(0, d));
            }
            var A = g(r);
            r.texImage2D(r.TEXTURE_2D, 0, E, o[0], o[1], 0, E, f, h),
              u || a.free(p);
            return new c(r, A, o[0], o[1], E, f);
          })(r, t);
      }
      throw new Error(
        'gl-texture2d: Invalid arguments for texture2d constructor'
      );
    };
    var o = null,
      s = null,
      u = null;
    function f(r) {
      return (
        ('undefined' != typeof HTMLCanvasElement &&
          r instanceof HTMLCanvasElement) ||
        ('undefined' != typeof HTMLImageElement &&
          r instanceof HTMLImageElement) ||
        ('undefined' != typeof HTMLVideoElement &&
          r instanceof HTMLVideoElement) ||
        ('undefined' != typeof ImageData && r instanceof ImageData)
      );
    }
    var l = function(r, t) {
      i.muls(r, t, 255);
    };
    function h(r, t, e) {
      var n = r.gl,
        i = n.getParameter(n.MAX_TEXTURE_SIZE);
      if (t < 0 || t > i || e < 0 || e > i)
        throw new Error('gl-texture2d: Invalid texture size');
      return (
        (r._shape = [t, e]),
        r.bind(),
        n.texImage2D(
          n.TEXTURE_2D,
          0,
          r.format,
          t,
          e,
          0,
          r.format,
          r.type,
          null
        ),
        (r._mipLevels = [0]),
        r
      );
    }
    function c(r, t, e, n, i, a) {
      (this.gl = r),
        (this.handle = t),
        (this.format = i),
        (this.type = a),
        (this._shape = [e, n]),
        (this._mipLevels = [0]),
        (this._magFilter = r.NEAREST),
        (this._minFilter = r.NEAREST),
        (this._wrapS = r.CLAMP_TO_EDGE),
        (this._wrapT = r.CLAMP_TO_EDGE),
        (this._anisoSamples = 1);
      var o = this,
        s = [this._wrapS, this._wrapT];
      Object.defineProperties(s, [
        {
          get: function() {
            return o._wrapS;
          },
          set: function(r) {
            return (o.wrapS = r);
          }
        },
        {
          get: function() {
            return o._wrapT;
          },
          set: function(r) {
            return (o.wrapT = r);
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
          set: function(r) {
            return (o.width = r);
          }
        },
        {
          get: function() {
            return o._shape[1];
          },
          set: function(r) {
            return (o.height = r);
          }
        }
      ]),
        (this._shapeVector = u);
    }
    var p = c.prototype;
    function _(r, t) {
      return 3 === r.length
        ? 1 === t[2] && t[1] === r[0] * r[2] && t[0] === r[2]
        : 1 === t[0] && t[1] === r[0];
    }
    function g(r) {
      var t = r.createTexture();
      return (
        r.bindTexture(r.TEXTURE_2D, t),
        r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST),
        r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST),
        r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE),
        r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE),
        t
      );
    }
    function E(r, t, e, n, i) {
      var a = r.getParameter(r.MAX_TEXTURE_SIZE);
      if (t < 0 || t > a || e < 0 || e > a)
        throw new Error('gl-texture2d: Invalid texture shape');
      if (i === r.FLOAT && !r.getExtension('OES_texture_float'))
        throw new Error(
          'gl-texture2d: Floating point textures not supported on this platform'
        );
      var o = g(r);
      return (
        r.texImage2D(r.TEXTURE_2D, 0, n, t, e, 0, n, i, null),
        new c(r, o, t, e, n, i)
      );
    }
    Object.defineProperties(p, {
      minFilter: {
        get: function() {
          return this._minFilter;
        },
        set: function(r) {
          this.bind();
          var t = this.gl;
          if (
            (this.type === t.FLOAT &&
              o.indexOf(r) >= 0 &&
              (t.getExtension('OES_texture_float_linear') || (r = t.NEAREST)),
            s.indexOf(r) < 0)
          )
            throw new Error('gl-texture2d: Unknown filter mode ' + r);
          return (
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, r),
            (this._minFilter = r)
          );
        }
      },
      magFilter: {
        get: function() {
          return this._magFilter;
        },
        set: function(r) {
          this.bind();
          var t = this.gl;
          if (
            (this.type === t.FLOAT &&
              o.indexOf(r) >= 0 &&
              (t.getExtension('OES_texture_float_linear') || (r = t.NEAREST)),
            s.indexOf(r) < 0)
          )
            throw new Error('gl-texture2d: Unknown filter mode ' + r);
          return (
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, r),
            (this._magFilter = r)
          );
        }
      },
      mipSamples: {
        get: function() {
          return this._anisoSamples;
        },
        set: function(r) {
          var t = this._anisoSamples;
          if (
            ((this._anisoSamples = 0 | Math.max(r, 1)),
            t !== this._anisoSamples)
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
        set: function(r) {
          if ((this.bind(), u.indexOf(r) < 0))
            throw new Error('gl-texture2d: Unknown wrap mode ' + r);
          return (
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_S,
              r
            ),
            (this._wrapS = r)
          );
        }
      },
      wrapT: {
        get: function() {
          return this._wrapT;
        },
        set: function(r) {
          if ((this.bind(), u.indexOf(r) < 0))
            throw new Error('gl-texture2d: Unknown wrap mode ' + r);
          return (
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_T,
              r
            ),
            (this._wrapT = r)
          );
        }
      },
      wrap: {
        get: function() {
          return this._wrapVector;
        },
        set: function(r) {
          if ((Array.isArray(r) || (r = [r, r]), 2 !== r.length))
            throw new Error(
              'gl-texture2d: Must specify wrap mode for rows and columns'
            );
          for (var t = 0; t < 2; ++t)
            if (u.indexOf(r[t]) < 0)
              throw new Error('gl-texture2d: Unknown wrap mode ' + r);
          (this._wrapS = r[0]), (this._wrapT = r[1]);
          var e = this.gl;
          return (
            this.bind(),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, this._wrapS),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, this._wrapT),
            r
          );
        }
      },
      shape: {
        get: function() {
          return this._shapeVector;
        },
        set: function(r) {
          if (Array.isArray(r)) {
            if (2 !== r.length)
              throw new Error('gl-texture2d: Invalid texture shape');
          } else r = [0 | r, 0 | r];
          return h(this, 0 | r[0], 0 | r[1]), [0 | r[0], 0 | r[1]];
        }
      },
      width: {
        get: function() {
          return this._shape[0];
        },
        set: function(r) {
          return h(this, (r |= 0), this._shape[1]), r;
        }
      },
      height: {
        get: function() {
          return this._shape[1];
        },
        set: function(r) {
          return (r |= 0), h(this, this._shape[0], r), r;
        }
      }
    }),
      (p.bind = function(r) {
        var t = this.gl;
        return (
          void 0 !== r && t.activeTexture(t.TEXTURE0 + (0 | r)),
          t.bindTexture(t.TEXTURE_2D, this.handle),
          void 0 !== r ? 0 | r : t.getParameter(t.ACTIVE_TEXTURE) - t.TEXTURE0
        );
      }),
      (p.dispose = function() {
        this.gl.deleteTexture(this.handle);
      }),
      (p.generateMipmap = function() {
        this.bind(), this.gl.generateMipmap(this.gl.TEXTURE_2D);
        for (
          var r = Math.min(this._shape[0], this._shape[1]), t = 0;
          r > 0;
          ++t, r >>>= 1
        )
          this._mipLevels.indexOf(t) < 0 && this._mipLevels.push(t);
      }),
      (p.setPixels = function(r, t, e, o) {
        var s = this.gl;
        this.bind(),
          Array.isArray(t)
            ? ((o = e), (e = 0 | t[1]), (t = 0 | t[0]))
            : ((t = t || 0), (e = e || 0)),
          (o = o || 0);
        var u = f(r) ? r : r.raw;
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
            : s.texSubImage2D(s.TEXTURE_2D, o, t, e, this.format, this.type, u);
        } else {
          if (!(r.shape && r.stride && r.data))
            throw new Error('gl-texture2d: Unsupported data type');
          if (
            r.shape.length < 2 ||
            t + r.shape[1] > this._shape[1] >>> o ||
            e + r.shape[0] > this._shape[0] >>> o ||
            t < 0 ||
            e < 0
          )
            throw new Error(
              'gl-texture2d: Texture dimensions are out of bounds'
            );
          !(function(r, t, e, o, s, u, f, h) {
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
              ? (g = r.FLOAT)
              : 'float64' === c
                ? ((g = r.FLOAT), (d = !1), (c = 'float32'))
                : 'uint8' === c
                  ? (g = r.UNSIGNED_BYTE)
                  : ((g = r.UNSIGNED_BYTE), (d = !1), (c = 'uint8'));
            if (2 === p.length)
              (E = r.LUMINANCE),
                (p = [p[0], p[1], 1]),
                (h = n(h.data, p, [h.stride[0], h.stride[1], 1], h.offset));
            else {
              if (3 !== p.length)
                throw new Error('gl-texture2d: Invalid shape for texture');
              if (1 === p[2]) E = r.ALPHA;
              else if (2 === p[2]) E = r.LUMINANCE_ALPHA;
              else if (3 === p[2]) E = r.RGB;
              else {
                if (4 !== p[2])
                  throw new Error(
                    'gl-texture2d: Invalid shape for pixel coords'
                  );
                E = r.RGBA;
              }
              p[2];
            }
            (E !== r.LUMINANCE && E !== r.ALPHA) ||
              (s !== r.LUMINANCE && s !== r.ALPHA) ||
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
                  ? r.texImage2D(
                      r.TEXTURE_2D,
                      o,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      u,
                      h.data
                    )
                  : r.texSubImage2D(
                      r.TEXTURE_2D,
                      o,
                      t,
                      e,
                      p[0],
                      p[1],
                      s,
                      u,
                      h.data
                    )
                : T
                  ? r.texImage2D(
                      r.TEXTURE_2D,
                      o,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      u,
                      h.data.subarray(h.offset, h.offset + y)
                    )
                  : r.texSubImage2D(
                      r.TEXTURE_2D,
                      o,
                      t,
                      e,
                      p[0],
                      p[1],
                      s,
                      u,
                      h.data.subarray(h.offset, h.offset + y)
                    );
            else {
              var A;
              A = u === r.FLOAT ? a.mallocFloat32(y) : a.mallocUint8(y);
              var b = n(A, p, [p[2], p[2] * p[0], 1]);
              g === r.FLOAT && u === r.UNSIGNED_BYTE ? l(b, h) : i.assign(b, h),
                T
                  ? r.texImage2D(
                      r.TEXTURE_2D,
                      o,
                      s,
                      p[0],
                      p[1],
                      0,
                      s,
                      u,
                      A.subarray(0, y)
                    )
                  : r.texSubImage2D(
                      r.TEXTURE_2D,
                      o,
                      t,
                      e,
                      p[0],
                      p[1],
                      s,
                      u,
                      A.subarray(0, y)
                    ),
                u === r.FLOAT ? a.freeFloat32(A) : a.freeUint8(A);
            }
          })(s, t, e, o, this.format, this.type, this._mipLevels, r);
        }
      });
  },
  function(r, t, e) {
    'use strict';
    var n = 'undefined' == typeof WeakMap ? e(18) : WeakMap,
      i = e(19),
      a = e(32),
      o = new n();
    r.exports = function(r) {
      var t = o.get(r),
        e = t && (t._triangleBuffer.handle || t._triangleBuffer.buffer);
      if (!e || !r.isBuffer(e)) {
        var n = i(r, new Float32Array([-1, -1, -1, 4, 4, -1]));
        ((t = a(r, [
          { buffer: n, type: r.FLOAT, size: 2 }
        ]))._triangleBuffer = n),
          o.set(r, t);
      }
      t.bind(), r.drawArrays(r.TRIANGLES, 0, 3), t.unbind();
    };
  },
  function(r, t, e) {
    'use strict';
    var n = e(1);
    r.exports = function(r, t, e, n) {
      i ||
        ((i = r.FRAMEBUFFER_UNSUPPORTED),
        (a = r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT),
        (o = r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS),
        (s = r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT));
      var f = r.getExtension('WEBGL_draw_buffers');
      !u &&
        f &&
        (function(r, t) {
          var e = r.getParameter(t.MAX_COLOR_ATTACHMENTS_WEBGL);
          u = new Array(e + 1);
          for (var n = 0; n <= e; ++n) {
            for (var i = new Array(e), a = 0; a < n; ++a)
              i[a] = r.COLOR_ATTACHMENT0 + a;
            for (var a = n; a < e; ++a) i[a] = r.NONE;
            u[n] = i;
          }
        })(r, f);
      Array.isArray(t) && ((n = e), (e = 0 | t[1]), (t = 0 | t[0]));
      if ('number' != typeof t)
        throw new Error('gl-fbo: Missing shape parameter');
      var l = r.getParameter(r.MAX_RENDERBUFFER_SIZE);
      if (t < 0 || t > l || e < 0 || e > l)
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
          if (h > r.getParameter(f.MAX_COLOR_ATTACHMENTS_WEBGL))
            throw new Error(
              'gl-fbo: Context does not support ' + h + ' draw buffers'
            );
        }
      }
      var c = r.UNSIGNED_BYTE,
        p = r.getExtension('OES_texture_float');
      if (n.float && h > 0) {
        if (!p)
          throw new Error(
            'gl-fbo: Context does not support floating point textures'
          );
        c = r.FLOAT;
      } else n.preferFloat && h > 0 && p && (c = r.FLOAT);
      var g = !0;
      'depth' in n && (g = !!n.depth);
      var E = !1;
      'stencil' in n && (E = !!n.stencil);
      return new _(r, t, e, c, h, g, E, f);
    };
    var i,
      a,
      o,
      s,
      u = null;
    function f(r) {
      return [
        r.getParameter(r.FRAMEBUFFER_BINDING),
        r.getParameter(r.RENDERBUFFER_BINDING),
        r.getParameter(r.TEXTURE_BINDING_2D)
      ];
    }
    function l(r, t) {
      r.bindFramebuffer(r.FRAMEBUFFER, t[0]),
        r.bindRenderbuffer(r.RENDERBUFFER, t[1]),
        r.bindTexture(r.TEXTURE_2D, t[2]);
    }
    function h(r) {
      switch (r) {
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
    function c(r, t, e, i, a, o) {
      if (!i) return null;
      var s = n(r, t, e, a, i);
      return (
        (s.magFilter = r.NEAREST),
        (s.minFilter = r.NEAREST),
        (s.mipSamples = 1),
        s.bind(),
        r.framebufferTexture2D(r.FRAMEBUFFER, o, r.TEXTURE_2D, s.handle, 0),
        s
      );
    }
    function p(r, t, e, n, i) {
      var a = r.createRenderbuffer();
      return (
        r.bindRenderbuffer(r.RENDERBUFFER, a),
        r.renderbufferStorage(r.RENDERBUFFER, n, t, e),
        r.framebufferRenderbuffer(r.FRAMEBUFFER, i, r.RENDERBUFFER, a),
        a
      );
    }
    function _(r, t, e, n, i, a, o, s) {
      (this.gl = r),
        (this._shape = [0 | t, 0 | e]),
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
        E = [0 | t, 0 | e];
      Object.defineProperties(E, {
        0: {
          get: function() {
            return g._shape[0];
          },
          set: function(r) {
            return (g.width = r);
          }
        },
        1: {
          get: function() {
            return g._shape[1];
          },
          set: function(r) {
            return (g.height = r);
          }
        }
      }),
        (this._shapeVector = E),
        (function(r) {
          var t = f(r.gl),
            e = r.gl,
            n = (r.handle = e.createFramebuffer()),
            i = r._shape[0],
            a = r._shape[1],
            o = r.color.length,
            s = r._ext,
            _ = r._useStencil,
            g = r._useDepth,
            E = r._colorType;
          e.bindFramebuffer(e.FRAMEBUFFER, n);
          for (var d = 0; d < o; ++d)
            r.color[d] = c(e, i, a, E, e.RGBA, e.COLOR_ATTACHMENT0 + d);
          0 === o
            ? ((r._color_rb = p(e, i, a, e.RGBA4, e.COLOR_ATTACHMENT0)),
              s && s.drawBuffersWEBGL(u[0]))
            : o > 1 && s.drawBuffersWEBGL(u[o]);
          var y = e.getExtension('WEBGL_depth_texture');
          y
            ? _
              ? (r.depth = c(
                  e,
                  i,
                  a,
                  y.UNSIGNED_INT_24_8_WEBGL,
                  e.DEPTH_STENCIL,
                  e.DEPTH_STENCIL_ATTACHMENT
                ))
              : g &&
                (r.depth = c(
                  e,
                  i,
                  a,
                  e.UNSIGNED_SHORT,
                  e.DEPTH_COMPONENT,
                  e.DEPTH_ATTACHMENT
                ))
            : g && _
              ? (r._depth_rb = p(
                  e,
                  i,
                  a,
                  e.DEPTH_STENCIL,
                  e.DEPTH_STENCIL_ATTACHMENT
                ))
              : g
                ? (r._depth_rb = p(
                    e,
                    i,
                    a,
                    e.DEPTH_COMPONENT16,
                    e.DEPTH_ATTACHMENT
                  ))
                : _ &&
                  (r._depth_rb = p(
                    e,
                    i,
                    a,
                    e.STENCIL_INDEX,
                    e.STENCIL_ATTACHMENT
                  ));
          var T = e.checkFramebufferStatus(e.FRAMEBUFFER);
          if (T !== e.FRAMEBUFFER_COMPLETE) {
            for (
              r._destroyed = !0,
                e.bindFramebuffer(e.FRAMEBUFFER, null),
                e.deleteFramebuffer(r.handle),
                r.handle = null,
                r.depth && (r.depth.dispose(), (r.depth = null)),
                r._depth_rb &&
                  (e.deleteRenderbuffer(r._depth_rb), (r._depth_rb = null)),
                d = 0;
              d < r.color.length;
              ++d
            )
              r.color[d].dispose(), (r.color[d] = null);
            r._color_rb &&
              (e.deleteRenderbuffer(r._color_rb), (r._color_rb = null)),
              l(e, t),
              h(T);
          }
          l(e, t);
        })(this);
    }
    var g = _.prototype;
    function E(r, t, e) {
      if (r._destroyed) throw new Error("gl-fbo: Can't resize destroyed FBO");
      if (r._shape[0] !== t || r._shape[1] !== e) {
        var n = r.gl,
          i = n.getParameter(n.MAX_RENDERBUFFER_SIZE);
        if (t < 0 || t > i || e < 0 || e > i)
          throw new Error("gl-fbo: Can't resize FBO, invalid dimensions");
        (r._shape[0] = t), (r._shape[1] = e);
        for (var a = f(n), o = 0; o < r.color.length; ++o)
          r.color[o].shape = r._shape;
        r._color_rb &&
          (n.bindRenderbuffer(n.RENDERBUFFER, r._color_rb),
          n.renderbufferStorage(
            n.RENDERBUFFER,
            n.RGBA4,
            r._shape[0],
            r._shape[1]
          )),
          r.depth && (r.depth.shape = r._shape),
          r._depth_rb &&
            (n.bindRenderbuffer(n.RENDERBUFFER, r._depth_rb),
            r._useDepth && r._useStencil
              ? n.renderbufferStorage(
                  n.RENDERBUFFER,
                  n.DEPTH_STENCIL,
                  r._shape[0],
                  r._shape[1]
                )
              : r._useDepth
                ? n.renderbufferStorage(
                    n.RENDERBUFFER,
                    n.DEPTH_COMPONENT16,
                    r._shape[0],
                    r._shape[1]
                  )
                : r._useStencil &&
                  n.renderbufferStorage(
                    n.RENDERBUFFER,
                    n.STENCIL_INDEX,
                    r._shape[0],
                    r._shape[1]
                  )),
          n.bindFramebuffer(n.FRAMEBUFFER, r.handle);
        var s = n.checkFramebufferStatus(n.FRAMEBUFFER);
        s !== n.FRAMEBUFFER_COMPLETE && (r.dispose(), l(n, a), h(s)), l(n, a);
      }
    }
    Object.defineProperties(g, {
      shape: {
        get: function() {
          return this._destroyed ? [0, 0] : this._shapeVector;
        },
        set: function(r) {
          if ((Array.isArray(r) || (r = [0 | r, 0 | r]), 2 !== r.length))
            throw new Error('gl-fbo: Shape vector must be length 2');
          var t = 0 | r[0],
            e = 0 | r[1];
          return E(this, t, e), [t, e];
        },
        enumerable: !1
      },
      width: {
        get: function() {
          return this._destroyed ? 0 : this._shape[0];
        },
        set: function(r) {
          return E(this, (r |= 0), this._shape[1]), r;
        },
        enumerable: !1
      },
      height: {
        get: function() {
          return this._destroyed ? 0 : this._shape[1];
        },
        set: function(r) {
          return (r |= 0), E(this, this._shape[0], r), r;
        },
        enumerable: !1
      }
    }),
      (g.bind = function() {
        if (!this._destroyed) {
          var r = this.gl;
          r.bindFramebuffer(r.FRAMEBUFFER, this.handle),
            r.viewport(0, 0, this._shape[0], this._shape[1]);
        }
      }),
      (g.dispose = function() {
        if (!this._destroyed) {
          this._destroyed = !0;
          var r = this.gl;
          r.deleteFramebuffer(this.handle),
            (this.handle = null),
            this.depth && (this.depth.dispose(), (this.depth = null)),
            this._depth_rb &&
              (r.deleteRenderbuffer(this._depth_rb), (this._depth_rb = null));
          for (var t = 0; t < this.color.length; ++t)
            this.color[t].dispose(), (this.color[t] = null);
          this._color_rb &&
            (r.deleteRenderbuffer(this._color_rb), (this._color_rb = null));
        }
      });
  },
  function(r, t, e) {
    'use strict';
    (function(r, n) {
      var i = e(24),
        a = e(25);
      r.__TYPEDARRAY_POOL ||
        (r.__TYPEDARRAY_POOL = {
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
        s = r.__TYPEDARRAY_POOL;
      s.UINT8C || (s.UINT8C = a([32, 0])), s.BUFFER || (s.BUFFER = a([32, 0]));
      var u = s.DATA,
        f = s.BUFFER;
      function l(r) {
        if (r) {
          var t = r.length || r.byteLength,
            e = i.log2(t);
          u[e].push(r);
        }
      }
      function h(r) {
        r = i.nextPow2(r);
        var t = i.log2(r),
          e = u[t];
        return e.length > 0 ? e.pop() : new ArrayBuffer(r);
      }
      function c(r) {
        return new Uint8Array(h(r), 0, r);
      }
      function p(r) {
        return new Uint16Array(h(2 * r), 0, r);
      }
      function _(r) {
        return new Uint32Array(h(4 * r), 0, r);
      }
      function g(r) {
        return new Int8Array(h(r), 0, r);
      }
      function E(r) {
        return new Int16Array(h(2 * r), 0, r);
      }
      function d(r) {
        return new Int32Array(h(4 * r), 0, r);
      }
      function y(r) {
        return new Float32Array(h(4 * r), 0, r);
      }
      function T(r) {
        return new Float64Array(h(8 * r), 0, r);
      }
      function A(r) {
        return o ? new Uint8ClampedArray(h(r), 0, r) : c(r);
      }
      function b(r) {
        return new DataView(h(r), 0, r);
      }
      function v(r) {
        r = i.nextPow2(r);
        var t = i.log2(r),
          e = f[t];
        return e.length > 0 ? e.pop() : new n(r);
      }
      (t.free = function(r) {
        if (n.isBuffer(r)) f[i.log2(r.length)].push(r);
        else {
          if (
            ('[object ArrayBuffer]' !== Object.prototype.toString.call(r) &&
              (r = r.buffer),
            !r)
          )
            return;
          var t = r.length || r.byteLength,
            e = 0 | i.log2(t);
          u[e].push(r);
        }
      }),
        (t.freeUint8 = t.freeUint16 = t.freeUint32 = t.freeInt8 = t.freeInt16 = t.freeInt32 = t.freeFloat32 = t.freeFloat = t.freeFloat64 = t.freeDouble = t.freeUint8Clamped = t.freeDataView = function(
          r
        ) {
          l(r.buffer);
        }),
        (t.freeArrayBuffer = l),
        (t.freeBuffer = function(r) {
          f[i.log2(r.length)].push(r);
        }),
        (t.malloc = function(r, t) {
          if (void 0 === t || 'arraybuffer' === t) return h(r);
          switch (t) {
            case 'uint8':
              return c(r);
            case 'uint16':
              return p(r);
            case 'uint32':
              return _(r);
            case 'int8':
              return g(r);
            case 'int16':
              return E(r);
            case 'int32':
              return d(r);
            case 'float':
            case 'float32':
              return y(r);
            case 'double':
            case 'float64':
              return T(r);
            case 'uint8_clamped':
              return A(r);
            case 'buffer':
              return v(r);
            case 'data':
            case 'dataview':
              return b(r);
            default:
              return null;
          }
          return null;
        }),
        (t.mallocArrayBuffer = h),
        (t.mallocUint8 = c),
        (t.mallocUint16 = p),
        (t.mallocUint32 = _),
        (t.mallocInt8 = g),
        (t.mallocInt16 = E),
        (t.mallocInt32 = d),
        (t.mallocFloat32 = t.mallocFloat = y),
        (t.mallocFloat64 = t.mallocDouble = T),
        (t.mallocUint8Clamped = A),
        (t.mallocDataView = b),
        (t.mallocBuffer = v),
        (t.clearCache = function() {
          for (var r = 0; r < 32; ++r)
            (s.UINT8[r].length = 0),
              (s.UINT16[r].length = 0),
              (s.UINT32[r].length = 0),
              (s.INT8[r].length = 0),
              (s.INT16[r].length = 0),
              (s.INT32[r].length = 0),
              (s.FLOAT[r].length = 0),
              (s.DOUBLE[r].length = 0),
              (s.UINT8C[r].length = 0),
              (u[r].length = 0),
              (f[r].length = 0);
        });
    }.call(this, e(5), e(20).Buffer));
  },
  function(r, t) {
    var e;
    e = (function() {
      return this;
    })();
    try {
      e = e || Function('return this')() || (0, eval)('this');
    } catch (r) {
      'object' == typeof window && (e = window);
    }
    r.exports = e;
  },
  function(r, t, e) {
    'use strict';
    var n = e(26),
      i = { body: '', args: [], thisVars: [], localVars: [] };
    function a(r) {
      if (!r) return i;
      for (var t = 0; t < r.args.length; ++t) {
        var e = r.args[t];
        r.args[t] =
          0 === t
            ? { name: e, lvalue: !0, rvalue: !!r.rvalue, count: r.count || 1 }
            : { name: e, lvalue: !1, rvalue: !0, count: 1 };
      }
      return (
        r.thisVars || (r.thisVars = []), r.localVars || (r.localVars = []), r
      );
    }
    function o(r) {
      for (var t = [], e = 0; e < r.args.length; ++e) t.push('a' + e);
      return new Function(
        'P',
        [
          'return function ',
          r.funcName,
          '_ndarrayops(',
          t.join(','),
          ') {P(',
          t.join(','),
          ');return a0}'
        ].join('')
      )(
        (function(r) {
          return n({
            args: r.args,
            pre: a(r.pre),
            body: a(r.body),
            post: a(r.proc),
            funcName: r.funcName
          });
        })(r)
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
      for (var r in s) {
        var e = s[r];
        (t[r] = o({
          args: ['array', 'array', 'array'],
          body: { args: ['a', 'b', 'c'], body: 'a=b' + e + 'c' },
          funcName: r
        })),
          (t[r + 'eq'] = o({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a' + e + '=b' },
            rvalue: !0,
            funcName: r + 'eq'
          })),
          (t[r + 's'] = o({
            args: ['array', 'array', 'scalar'],
            body: { args: ['a', 'b', 's'], body: 'a=b' + e + 's' },
            funcName: r + 's'
          })),
          (t[r + 'seq'] = o({
            args: ['array', 'scalar'],
            body: { args: ['a', 's'], body: 'a' + e + '=s' },
            rvalue: !0,
            funcName: r + 'seq'
          }));
      }
    })();
    var u = { not: '!', bnot: '~', neg: '-', recip: '1.0/' };
    !(function() {
      for (var r in u) {
        var e = u[r];
        (t[r] = o({
          args: ['array', 'array'],
          body: { args: ['a', 'b'], body: 'a=' + e + 'b' },
          funcName: r
        })),
          (t[r + 'eq'] = o({
            args: ['array'],
            body: { args: ['a'], body: 'a=' + e + 'a' },
            rvalue: !0,
            count: 2,
            funcName: r + 'eq'
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
      for (var r in f) {
        var e = f[r];
        (t[r] = o({
          args: ['array', 'array', 'array'],
          body: { args: ['a', 'b', 'c'], body: 'a=b' + e + 'c' },
          funcName: r
        })),
          (t[r + 's'] = o({
            args: ['array', 'array', 'scalar'],
            body: { args: ['a', 'b', 's'], body: 'a=b' + e + 's' },
            funcName: r + 's'
          })),
          (t[r + 'eq'] = o({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a=a' + e + 'b' },
            rvalue: !0,
            count: 2,
            funcName: r + 'eq'
          })),
          (t[r + 'seq'] = o({
            args: ['array', 'scalar'],
            body: { args: ['a', 's'], body: 'a=a' + e + 's' },
            rvalue: !0,
            count: 2,
            funcName: r + 'seq'
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
      for (var r = 0; r < l.length; ++r) {
        var e = l[r];
        (t[e] = o({
          args: ['array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
          body: { args: ['a', 'b'], body: 'a=this_f(b)', thisVars: ['this_f'] },
          funcName: e
        })),
          (t[e + 'eq'] = o({
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
      for (var r = 0; r < h.length; ++r) {
        var e = h[r];
        (t[e] = o({
          args: ['array', 'array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
          body: {
            args: ['a', 'b', 'c'],
            body: 'a=this_f(b,c)',
            thisVars: ['this_f']
          },
          funcName: e
        })),
          (t[e + 's'] = o({
            args: ['array', 'array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(b,c)',
              thisVars: ['this_f']
            },
            funcName: e + 's'
          })),
          (t[e + 'eq'] = o({
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
          (t[e + 'seq'] = o({
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
      for (var r = 0; r < c.length; ++r) {
        var e = c[r];
        (t[e + 'op'] = o({
          args: ['array', 'array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
          body: {
            args: ['a', 'b', 'c'],
            body: 'a=this_f(c,b)',
            thisVars: ['this_f']
          },
          funcName: e + 'op'
        })),
          (t[e + 'ops'] = o({
            args: ['array', 'array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + e, thisVars: ['this_f'] },
            body: {
              args: ['a', 'b', 'c'],
              body: 'a=this_f(c,b)',
              thisVars: ['this_f']
            },
            funcName: e + 'ops'
          })),
          (t[e + 'opeq'] = o({
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
          (t[e + 'opseq'] = o({
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
      (t.any = n({
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
      (t.all = n({
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
      (t.sum = n({
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
      (t.prod = n({
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
      (t.norm2squared = n({
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
      (t.norm2 = n({
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
      (t.norminf = n({
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
      (t.norm1 = n({
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
      (t.sup = n({
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
      (t.inf = n({
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
      (t.argmin = n({
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
      (t.argmax = n({
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
      (t.random = o({
        args: ['array'],
        pre: { args: [], body: 'this_f=Math.random', thisVars: ['this_f'] },
        body: { args: ['a'], body: 'a=this_f()', thisVars: ['this_f'] },
        funcName: 'random'
      })),
      (t.assign = o({
        args: ['array', 'array'],
        body: { args: ['a', 'b'], body: 'a=b' },
        funcName: 'assign'
      })),
      (t.assigns = o({
        args: ['array', 'scalar'],
        body: { args: ['a', 'b'], body: 'a=b' },
        funcName: 'assigns'
      })),
      (t.equals = n({
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
  function(r, t, e) {
    var n = e(30),
      i = e(31),
      a = 'undefined' != typeof Float64Array;
    function o(r, t) {
      return r[0] - t[0];
    }
    function s() {
      var r,
        t = this.stride,
        e = new Array(t.length);
      for (r = 0; r < e.length; ++r) e[r] = [Math.abs(t[r]), r];
      e.sort(o);
      var n = new Array(e.length);
      for (r = 0; r < n.length; ++r) n[r] = e[r][1];
      return n;
    }
    function u(r, t) {
      var e = ['View', t, 'd', r].join('');
      t < 0 && (e = 'View_Nil' + r);
      var i = 'generic' === r;
      if (-1 === t) {
        var a =
          'function ' +
          e +
          '(a){this.data=a;};var proto=' +
          e +
          ".prototype;proto.dtype='" +
          r +
          "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
          e +
          '(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_' +
          e +
          '(a){return new ' +
          e +
          '(a);}';
        return new Function(a)();
      }
      if (0 === t) {
        a =
          'function ' +
          e +
          '(a,d) {this.data = a;this.offset = d};var proto=' +
          e +
          ".prototype;proto.dtype='" +
          r +
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
        return new Function('TrivialArray', a)(f[r][0]);
      }
      a = ["'use strict'"];
      var o = n(t),
        u = o.map(function(r) {
          return 'i' + r;
        }),
        l =
          'this.offset+' +
          o
            .map(function(r) {
              return 'this.stride[' + r + ']*i' + r;
            })
            .join('+'),
        h = o
          .map(function(r) {
            return 'b' + r;
          })
          .join(','),
        c = o
          .map(function(r) {
            return 'c' + r;
          })
          .join(',');
      a.push(
        'function ' + e + '(a,' + h + ',' + c + ',d){this.data=a',
        'this.shape=[' + h + ']',
        'this.stride=[' + c + ']',
        'this.offset=d|0}',
        'var proto=' + e + '.prototype',
        "proto.dtype='" + r + "'",
        'proto.dimension=' + t
      ),
        a.push(
          "Object.defineProperty(proto,'size',{get:function " +
            e +
            '_size(){return ' +
            o
              .map(function(r) {
                return 'this.shape[' + r + ']';
              })
              .join('*'),
          '}})'
        ),
        1 === t
          ? a.push('proto.order=[0]')
          : (a.push("Object.defineProperty(proto,'order',{get:"),
            t < 4
              ? (a.push('function ' + e + '_order(){'),
                2 === t
                  ? a.push(
                      'return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})'
                    )
                  : 3 === t &&
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
              .map(function(r) {
                return [
                  '(typeof i',
                  r,
                  "!=='number'||i",
                  r,
                  '<0)?this.shape[',
                  r,
                  ']:i',
                  r,
                  '|0'
                ].join('');
              })
              .join(',') +
            ',' +
            o
              .map(function(r) {
                return 'this.stride[' + r + ']';
              })
              .join(',') +
            ',this.offset)}'
        );
      var p = o.map(function(r) {
          return 'a' + r + '=this.shape[' + r + ']';
        }),
        _ = o.map(function(r) {
          return 'c' + r + '=this.stride[' + r + ']';
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
      for (var g = 0; g < t; ++g)
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
            .map(function(r) {
              return 'a' + r;
            })
            .join(',') +
          ',' +
          o
            .map(function(r) {
              return 'c' + r;
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
              .map(function(r) {
                return 'a' + r + '=this.shape[' + r + ']';
              })
              .join(',') +
            ',' +
            o
              .map(function(r) {
                return 'b' + r + '=this.stride[' + r + ']';
              })
              .join(',') +
            ',c=this.offset,d=0,ceil=Math.ceil'
        );
      for (g = 0; g < t; ++g)
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
            .map(function(r) {
              return 'a' + r;
            })
            .join(',') +
          ',' +
          o
            .map(function(r) {
              return 'b' + r;
            })
            .join(',') +
          ',c)}'
      );
      var E = new Array(t),
        d = new Array(t);
      for (g = 0; g < t; ++g)
        (E[g] = 'a[i' + g + ']'), (d[g] = 'b[i' + g + ']');
      a.push(
        'proto.transpose=function ' +
          e +
          '_transpose(' +
          u +
          '){' +
          u
            .map(function(r, t) {
              return r + '=(' + r + '===undefined?' + t + ':' + r + '|0)';
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
      for (g = 0; g < t; ++g)
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
              .map(function(r) {
                return 'shape[' + r + ']';
              })
              .join(',') +
            ',' +
            o
              .map(function(r) {
                return 'stride[' + r + ']';
              })
              .join(',') +
            ',offset)}'
        ),
        new Function('CTOR_LIST', 'ORDER', a.join('\n'))(f[r], s)
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
    r.exports = function(r, t, e, n) {
      if (void 0 === r) return (0, f.array[0])([]);
      'number' == typeof r && (r = [r]), void 0 === t && (t = [r.length]);
      var o = t.length;
      if (void 0 === e) {
        e = new Array(o);
        for (var s = o - 1, l = 1; s >= 0; --s) (e[s] = l), (l *= t[s]);
      }
      if (void 0 === n)
        for (n = 0, s = 0; s < o; ++s) e[s] < 0 && (n -= (t[s] - 1) * e[s]);
      for (
        var h = (function(r) {
            if (i(r)) return 'buffer';
            if (a)
              switch (Object.prototype.toString.call(r)) {
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
            return Array.isArray(r) ? 'array' : 'generic';
          })(r),
          c = f[h];
        c.length <= o + 1;

      )
        c.push(u(h, c.length - 1));
      return (0, c[o + 1])(r, t, e, n);
    };
  },
  function(r, t, e) {
    'use strict';
    r.exports = function(r, t, e) {
      t ? t.bind() : r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, null);
      var n = 0 | r.getParameter(r.MAX_VERTEX_ATTRIBS);
      if (e) {
        if (e.length > n) throw new Error('gl-vao: Too many vertex attributes');
        for (var i = 0; i < e.length; ++i) {
          var a = e[i];
          if (a.buffer) {
            var o = a.buffer,
              s = a.size || 4,
              u = a.type || r.FLOAT,
              f = !!a.normalized,
              l = a.stride || 0,
              h = a.offset || 0;
            o.bind(),
              r.enableVertexAttribArray(i),
              r.vertexAttribPointer(i, s, u, f, l, h);
          } else {
            if ('number' == typeof a) r.vertexAttrib1f(i, a);
            else if (1 === a.length) r.vertexAttrib1f(i, a[0]);
            else if (2 === a.length) r.vertexAttrib2f(i, a[0], a[1]);
            else if (3 === a.length) r.vertexAttrib3f(i, a[0], a[1], a[2]);
            else {
              if (4 !== a.length)
                throw new Error('gl-vao: Invalid vertex attribute');
              r.vertexAttrib4f(i, a[0], a[1], a[2], a[3]);
            }
            r.disableVertexAttribArray(i);
          }
        }
        for (; i < n; ++i) r.disableVertexAttribArray(i);
      } else
        for (r.bindBuffer(r.ARRAY_BUFFER, null), i = 0; i < n; ++i)
          r.disableVertexAttribArray(i);
    };
  },
  function(r, t, e) {
    'use strict';
    r.exports = function(r, t) {
      for (var e = {}, n = 0; n < r.length; ++n)
        for (
          var i = r[n].name, a = i.split('.'), o = e, s = 0;
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
                : (o[l] = t ? n : r[n].type);
            }
          } else
            s < a.length - 1
              ? (u[0] in o || (o[u[0]] = {}), (o = o[u[0]]))
              : (o[u[0]] = t ? n : r[n].type);
        }
      return e;
    };
  },
  function(r, t) {
    r.exports = [
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
  function(r, t) {
    r.exports = [
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
  function(r, t, e) {
    'use strict';
    var n = e(35),
      i = e(36),
      a = e(9),
      o = e(37),
      s = e(55),
      u = e(0);
    function f(r) {
      (this.gl = r),
        (this.gl.lastAttribCount = 0),
        (this._vref = this._fref = this._relink = this.vertShader = this.fragShader = this.program = this.attributes = this.uniforms = this.types = null);
    }
    var l = f.prototype;
    function h(r, t) {
      return r.name < t.name ? -1 : 1;
    }
    (l.bind = function() {
      var r;
      this.program || this._relink();
      var t = this.gl.getProgramParameter(
          this.program,
          this.gl.ACTIVE_ATTRIBUTES
        ),
        e = this.gl.lastAttribCount;
      if (t > e) for (r = e; r < t; r++) this.gl.enableVertexAttribArray(r);
      else if (e > t)
        for (r = t; r < e; r++) this.gl.disableVertexAttribArray(r);
      (this.gl.lastAttribCount = t), this.gl.useProgram(this.program);
    }),
      (l.dispose = function() {
        for (var r = this.gl.lastAttribCount, t = 0; t < r; t++)
          this.gl.disableVertexAttribArray(t);
        (this.gl.lastAttribCount = 0),
          this._fref && this._fref.dispose(),
          this._vref && this._vref.dispose(),
          (this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null);
      }),
      (l.update = function(r, t, e, f) {
        if (!t || 1 === arguments.length) {
          var l = r;
          (r = l.vertex),
            (t = l.fragment),
            (e = l.uniforms),
            (f = l.attributes);
        }
        var c = this,
          p = c.gl,
          _ = c._vref;
        (c._vref = o.shader(p, p.VERTEX_SHADER, r)),
          _ && _.dispose(),
          (c.vertShader = c._vref.shader);
        var g = this._fref;
        if (
          ((c._fref = o.shader(p, p.FRAGMENT_SHADER, t)),
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
          for (var r = 0; r < e.length; ++r)
            N[r] = p.getUniformLocation(c.program, e[r].name);
        }
        x(),
          (c._relink = x),
          (c.types = { uniforms: a(e), attributes: a(f) }),
          (c.attributes = i(p, c, T, b)),
          Object.defineProperty(c, 'uniforms', n(p, c, e, N));
      }),
      (r.exports = function(r, t, e, n, i) {
        var a = new f(r);
        return a.update(t, e, n, i), a;
      });
  },
  function(r, t) {
    r.exports = function(r, t, e) {
      'function' == typeof t && ((e = t), (t = null));
      var n,
        i = document.createElement('img');
      (i.onload = function() {
        n || ((n = !0), e && e(void 0, i));
      }),
        (i.onerror = function() {
          n || ((n = !0), e && e(new Error('Unable to load "' + r + '"'), i));
        }),
        t && t.crossOrigin && (i.crossOrigin = t.crossOrigin);
      return (i.src = r), i;
    };
  },
  function(r, t, e) {
    var n = e(56);
    r.exports = function(r) {
      return n('webgl', r);
    };
  },
  function(r, t) {
    r.exports =
      'precision mediump float;\n#define GLSLIFY 1\n\nattribute vec2 position;\n\nvoid main() {\n  gl_Position = vec4(position, 1, 1);\n}';
  },
  function(r, t) {
    r.exports =
      'precision highp float;\n#define GLSLIFY 1\n\nuniform vec3 iResolution;\nuniform sampler2D iChannel0;\nuniform bool flip;\nuniform vec2 direction;\n\nvec4 blur9_1_0(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv) * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n  return color;\n}\n\n\n\nvoid main() {\n  vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);\n\n  if (flip) {\n    uv.y = 1.0 - uv.y;\n  }\n\n  gl_FragColor = blur9_1_0(iChannel0, uv, iResolution.xy, direction);\n}\n';
  },
  function(r, t, e) {
    'use strict';
    e.r(t),
      e.d(t, 'default', function() {
        return T;
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
    class T {
      constructor(r = {}) {
        (this.blurRadius = r.blurRadius || 50),
          (this.targetElement =
            document.querySelector(r.targetElement) || 'body');
      }
      setParameters(r) {
        const t = Object.assign({}, r);
        return (
          (t.minFilter = this.gl.LINEAR), (t.magFilter = this.gl.LINEAR), t
        );
      }
      getBase64FromImageUrl(r) {
        const t = new Image();
        t.setAttribute('crossOrigin', 'anonymous'), (t.src = r);
        const e = this;
        return new Promise(r => {
          t.onload = function() {
            const t = document.createElement('canvas');
            return (
              (t.width = this.width),
              (t.height = this.height),
              (e.gl = _()({ width: this.width, height: this.height })),
              document.body.appendChild(e.gl.canvas),
              t.getContext('2d').drawImage(this, 0, 0),
              r(t.toDataURL('image/png'))
            );
          };
        });
      }
      async setImage(r) {
        return (
          (this.imageUri = await this.getBase64FromImageUrl(r)),
          new Promise((r, t) => {
            l()(this.imageUri, (e, n) => {
              e && t(e),
                (this.image = n),
                this.changeBlurRadius(this.blurRadius),
                r();
            });
          })
        );
      }
      changeBlurRadius(r) {
        this.blurRadius = r;
        const t = this.gl.drawingBufferWidth,
          e = this.gl.drawingBufferHeight,
          n = c()(this.gl, this.image),
          a = o()(this.gl, E.a, y.a);
        a.bind(),
          (a.uniforms.iResolution = [t, e, 0]),
          (a.uniforms.iChannel0 = 0);
        const s = u()(this.gl, [t, e]),
          f = u()(this.gl, [t, e]);
        this.gl.viewport(0, 0, t, e);
        let l = s,
          h = f;
        const p = this;
        for (let t = 0; t < 8; t++) {
          l.bind(),
            0 === t ? n.bind() : h.color[0].bind(),
            a.bind(),
            (a.uniforms.flip = !0),
            (a.uniforms.direction = t % 2 == 0 ? [r, 0] : [0, r]),
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
          [n, s.color[0], f.color[0]].forEach(r => this.setParameters(r));
      }
    }
    window.GaussianBlur = T;
  },
  function(r, t) {
    !(function() {
      'use strict';
      if ('undefined' == typeof ses || !ses.ok || ses.ok()) {
        'undefined' != typeof ses && (ses.weakMapPermitHostObjects = E);
        var t = !1;
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
              return void (r.exports = WeakMap);
            t = !0;
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
                .call(h, function(r) {
                  return (r % 36).toString(36);
                })
                .join('') +
              '___');
        }
        if (
          (o(Object, 'getOwnPropertyNames', {
            value: function(r) {
              return a(r).filter(d);
            }
          }),
          'getPropertyNames' in Object)
        ) {
          var c = Object.getPropertyNames;
          o(Object, 'getPropertyNames', {
            value: function(r) {
              return c(r).filter(d);
            }
          });
        }
        !(function() {
          var r = Object.freeze;
          o(Object, 'freeze', {
            value: function(t) {
              return y(t), r(t);
            }
          });
          var t = Object.seal;
          o(Object, 'seal', {
            value: function(r) {
              return y(r), t(r);
            }
          });
          var e = Object.preventExtensions;
          o(Object, 'preventExtensions', {
            value: function(r) {
              return y(r), e(r);
            }
          });
        })();
        var p = !1,
          _ = 0,
          g = function() {
            this instanceof g || A();
            var r = [],
              t = [],
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
                    : (a = r.indexOf(n)) >= 0
                      ? t[a]
                      : i;
                })
              },
              has___: {
                value: T(function(t) {
                  var n = y(t);
                  return n ? e in n : r.indexOf(t) >= 0;
                })
              },
              set___: {
                value: T(function(n, i) {
                  var a,
                    o = y(n);
                  return (
                    o
                      ? (o[e] = i)
                      : (a = r.indexOf(n)) >= 0
                        ? (t[a] = i)
                        : ((a = r.length), (t[a] = i), (r[a] = n)),
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
                        (i = r.indexOf(n)) < 0 ||
                        ((a = r.length - 1),
                        (r[i] = void 0),
                        (t[i] = t[a]),
                        (r[i] = r[a]),
                        (r.length = a),
                        (t.length = a),
                        0)
                      );
                })
              }
            });
          };
        (g.prototype = Object.create(Object.prototype, {
          get: {
            value: function(r, t) {
              return this.get___(r, t);
            },
            writable: !0,
            configurable: !0
          },
          has: {
            value: function(r) {
              return this.has___(r);
            },
            writable: !0,
            configurable: !0
          },
          set: {
            value: function(r, t) {
              return this.set___(r, t);
            },
            writable: !0,
            configurable: !0
          },
          delete: {
            value: function(r) {
              return this.delete___(r);
            },
            writable: !0,
            configurable: !0
          }
        })),
          'function' == typeof e
            ? (function() {
                function n() {
                  this instanceof g || A();
                  var r,
                    n = new e(),
                    i = void 0,
                    a = !1;
                  return (
                    (r = t
                      ? function(r, t) {
                          return (
                            n.set(r, t),
                            n.has(r) || (i || (i = new g()), i.set(r, t)),
                            this
                          );
                        }
                      : function(r, t) {
                          if (a)
                            try {
                              n.set(r, t);
                            } catch (e) {
                              i || (i = new g()), i.set___(r, t);
                            }
                          else n.set(r, t);
                          return this;
                        }),
                    Object.create(g.prototype, {
                      get___: {
                        value: T(function(r, t) {
                          return i
                            ? n.has(r)
                              ? n.get(r)
                              : i.get___(r, t)
                            : n.get(r, t);
                        })
                      },
                      has___: {
                        value: T(function(r) {
                          return n.has(r) || (!!i && i.has___(r));
                        })
                      },
                      set___: { value: T(r) },
                      delete___: {
                        value: T(function(r) {
                          var t = !!n.delete(r);
                          return (i && i.delete___(r)) || t;
                        })
                      },
                      permitHostObjects___: {
                        value: T(function(r) {
                          if (r !== E)
                            throw new Error(
                              'bogus call to permitHostObjects___'
                            );
                          a = !0;
                        })
                      }
                    })
                  );
                }
                t && 'undefined' != typeof Proxy && (Proxy = void 0),
                  (n.prototype = g.prototype),
                  (r.exports = n),
                  Object.defineProperty(WeakMap.prototype, 'constructor', {
                    value: WeakMap,
                    enumerable: !1,
                    configurable: !0,
                    writable: !0
                  });
              })()
            : ('undefined' != typeof Proxy && (Proxy = void 0),
              (r.exports = g));
      }
      function E(r) {
        r.permitHostObjects___ && r.permitHostObjects___(E);
      }
      function d(r) {
        return !(
          r.substr(0, u.length) == u && '___' === r.substr(r.length - 3)
        );
      }
      function y(r) {
        if (r !== Object(r)) throw new TypeError('Not an object: ' + r);
        var t = r[f];
        if (t && t.key === r) return t;
        if (s(r)) {
          t = { key: r };
          try {
            return (
              o(r, f, {
                value: t,
                writable: !1,
                enumerable: !1,
                configurable: !1
              }),
              t
            );
          } catch (r) {
            return;
          }
        }
      }
      function T(r) {
        return (r.prototype = null), Object.freeze(r);
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
  function(r, t, e) {
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
    function s(r, t, e, n, i) {
      (this.gl = r),
        (this.type = t),
        (this.handle = e),
        (this.length = n),
        (this.usage = i);
    }
    var u = s.prototype;
    function f(r, t, e, n, i, a) {
      var o = i.length * i.BYTES_PER_ELEMENT;
      if (a < 0) return r.bufferData(t, i, n), o;
      if (o + a > e)
        throw new Error(
          'gl-buffer: If resizing buffer, must not specify offset'
        );
      return r.bufferSubData(t, a, i), e;
    }
    function l(r, t) {
      for (var e = n.malloc(r.length, t), i = r.length, a = 0; a < i; ++a)
        e[a] = r[a];
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
      (u.update = function(r, t) {
        if (
          ('number' != typeof t && (t = -1),
          this.bind(),
          'object' == typeof r && void 0 !== r.shape)
        ) {
          var e = r.dtype;
          if (
            (o.indexOf(e) < 0 && (e = 'float32'),
            this.type === this.gl.ELEMENT_ARRAY_BUFFER)
          )
            e =
              gl.getExtension('OES_element_index_uint') && 'uint16' !== e
                ? 'uint32'
                : 'uint16';
          if (
            e === r.dtype &&
            (function(r, t) {
              for (var e = 1, n = t.length - 1; n >= 0; --n) {
                if (t[n] !== e) return !1;
                e *= r[n];
              }
              return !0;
            })(r.shape, r.stride)
          )
            0 === r.offset && r.data.length === r.shape[0]
              ? (this.length = f(
                  this.gl,
                  this.type,
                  this.length,
                  this.usage,
                  r.data,
                  t
                ))
              : (this.length = f(
                  this.gl,
                  this.type,
                  this.length,
                  this.usage,
                  r.data.subarray(r.offset, r.shape[0]),
                  t
                ));
          else {
            var s = n.malloc(r.size, e),
              u = a(s, r.shape);
            i.assign(u, r),
              (this.length = f(
                this.gl,
                this.type,
                this.length,
                this.usage,
                t < 0 ? s : s.subarray(0, r.size),
                t
              )),
              n.free(s);
          }
        } else if (Array.isArray(r)) {
          var h;
          (h =
            this.type === this.gl.ELEMENT_ARRAY_BUFFER
              ? l(r, 'uint16')
              : l(r, 'float32')),
            (this.length = f(
              this.gl,
              this.type,
              this.length,
              this.usage,
              t < 0 ? h : h.subarray(0, r.length),
              t
            )),
            n.free(h);
        } else if ('object' == typeof r && 'number' == typeof r.length)
          this.length = f(this.gl, this.type, this.length, this.usage, r, t);
        else {
          if ('number' != typeof r && void 0 !== r)
            throw new Error('gl-buffer: Invalid data type');
          if (t >= 0)
            throw new Error(
              'gl-buffer: Cannot specify offset when resizing buffer'
            );
          (r |= 0) <= 0 && (r = 1),
            this.gl.bufferData(this.type, 0 | r, this.usage),
            (this.length = r);
        }
      }),
      (r.exports = function(r, t, e, n) {
        if (
          ((e = e || r.ARRAY_BUFFER),
          (n = n || r.DYNAMIC_DRAW),
          e !== r.ARRAY_BUFFER && e !== r.ELEMENT_ARRAY_BUFFER)
        )
          throw new Error(
            'gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER'
          );
        if (n !== r.DYNAMIC_DRAW && n !== r.STATIC_DRAW && n !== r.STREAM_DRAW)
          throw new Error(
            'gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW'
          );
        var i = new s(r, e, r.createBuffer(), 0, n);
        return i.update(t), i;
      });
  },
  function(r, t, e) {
    'use strict';
    (function(r) {
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
      function s(r, t) {
        if (o() < t) throw new RangeError('Invalid typed array length');
        return (
          u.TYPED_ARRAY_SUPPORT
            ? ((r = new Uint8Array(t)).__proto__ = u.prototype)
            : (null === r && (r = new u(t)), (r.length = t)),
          r
        );
      }
      function u(r, t, e) {
        if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
          return new u(r, t, e);
        if ('number' == typeof r) {
          if ('string' == typeof t)
            throw new Error(
              'If encoding is specified then the first argument must be a string'
            );
          return h(this, r);
        }
        return f(this, r, t, e);
      }
      function f(r, t, e, n) {
        if ('number' == typeof t)
          throw new TypeError('"value" argument must not be a number');
        return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
          ? (function(r, t, e, n) {
              if ((t.byteLength, e < 0 || t.byteLength < e))
                throw new RangeError("'offset' is out of bounds");
              if (t.byteLength < e + (n || 0))
                throw new RangeError("'length' is out of bounds");
              t =
                void 0 === e && void 0 === n
                  ? new Uint8Array(t)
                  : void 0 === n
                    ? new Uint8Array(t, e)
                    : new Uint8Array(t, e, n);
              u.TYPED_ARRAY_SUPPORT
                ? ((r = t).__proto__ = u.prototype)
                : (r = c(r, t));
              return r;
            })(r, t, e, n)
          : 'string' == typeof t
            ? (function(r, t, e) {
                ('string' == typeof e && '' !== e) || (e = 'utf8');
                if (!u.isEncoding(e))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var n = 0 | _(t, e),
                  i = (r = s(r, n)).write(t, e);
                i !== n && (r = r.slice(0, i));
                return r;
              })(r, t, e)
            : (function(r, t) {
                if (u.isBuffer(t)) {
                  var e = 0 | p(t.length);
                  return 0 === (r = s(r, e)).length
                    ? r
                    : (t.copy(r, 0, 0, e), r);
                }
                if (t) {
                  if (
                    ('undefined' != typeof ArrayBuffer &&
                      t.buffer instanceof ArrayBuffer) ||
                    'length' in t
                  )
                    return 'number' != typeof t.length ||
                      (function(r) {
                        return r != r;
                      })(t.length)
                      ? s(r, 0)
                      : c(r, t);
                  if ('Buffer' === t.type && a(t.data)) return c(r, t.data);
                }
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                );
              })(r, t);
      }
      function l(r) {
        if ('number' != typeof r)
          throw new TypeError('"size" argument must be a number');
        if (r < 0) throw new RangeError('"size" argument must not be negative');
      }
      function h(r, t) {
        if ((l(t), (r = s(r, t < 0 ? 0 : 0 | p(t))), !u.TYPED_ARRAY_SUPPORT))
          for (var e = 0; e < t; ++e) r[e] = 0;
        return r;
      }
      function c(r, t) {
        var e = t.length < 0 ? 0 : 0 | p(t.length);
        r = s(r, e);
        for (var n = 0; n < e; n += 1) r[n] = 255 & t[n];
        return r;
      }
      function p(r) {
        if (r >= o())
          throw new RangeError(
            'Attempt to allocate Buffer larger than maximum size: 0x' +
              o().toString(16) +
              ' bytes'
          );
        return 0 | r;
      }
      function _(r, t) {
        if (u.isBuffer(r)) return r.length;
        if (
          'undefined' != typeof ArrayBuffer &&
          'function' == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(r) || r instanceof ArrayBuffer)
        )
          return r.byteLength;
        'string' != typeof r && (r = '' + r);
        var e = r.length;
        if (0 === e) return 0;
        for (var n = !1; ; )
          switch (t) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return e;
            case 'utf8':
            case 'utf-8':
            case void 0:
              return V(r).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 2 * e;
            case 'hex':
              return e >>> 1;
            case 'base64':
              return k(r).length;
            default:
              if (n) return V(r).length;
              (t = ('' + t).toLowerCase()), (n = !0);
          }
      }
      function g(r, t, e) {
        var n = r[t];
        (r[t] = r[e]), (r[e] = n);
      }
      function E(r, t, e, n, i) {
        if (0 === r.length) return -1;
        if (
          ('string' == typeof e
            ? ((n = e), (e = 0))
            : e > 2147483647
              ? (e = 2147483647)
              : e < -2147483648 && (e = -2147483648),
          (e = +e),
          isNaN(e) && (e = i ? 0 : r.length - 1),
          e < 0 && (e = r.length + e),
          e >= r.length)
        ) {
          if (i) return -1;
          e = r.length - 1;
        } else if (e < 0) {
          if (!i) return -1;
          e = 0;
        }
        if (('string' == typeof t && (t = u.from(t, n)), u.isBuffer(t)))
          return 0 === t.length ? -1 : d(r, t, e, n, i);
        if ('number' == typeof t)
          return (
            (t &= 255),
            u.TYPED_ARRAY_SUPPORT &&
            'function' == typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(r, t, e)
                : Uint8Array.prototype.lastIndexOf.call(r, t, e)
              : d(r, [t], e, n, i)
          );
        throw new TypeError('val must be string, number or Buffer');
      }
      function d(r, t, e, n, i) {
        var a,
          o = 1,
          s = r.length,
          u = t.length;
        if (
          void 0 !== n &&
          ('ucs2' === (n = String(n).toLowerCase()) ||
            'ucs-2' === n ||
            'utf16le' === n ||
            'utf-16le' === n)
        ) {
          if (r.length < 2 || t.length < 2) return -1;
          (o = 2), (s /= 2), (u /= 2), (e /= 2);
        }
        function f(r, t) {
          return 1 === o ? r[t] : r.readUInt16BE(t * o);
        }
        if (i) {
          var l = -1;
          for (a = e; a < s; a++)
            if (f(r, a) === f(t, -1 === l ? 0 : a - l)) {
              if ((-1 === l && (l = a), a - l + 1 === u)) return l * o;
            } else -1 !== l && (a -= a - l), (l = -1);
        } else
          for (e + u > s && (e = s - u), a = e; a >= 0; a--) {
            for (var h = !0, c = 0; c < u; c++)
              if (f(r, a + c) !== f(t, c)) {
                h = !1;
                break;
              }
            if (h) return a;
          }
        return -1;
      }
      function y(r, t, e, n) {
        e = Number(e) || 0;
        var i = r.length - e;
        n ? (n = Number(n)) > i && (n = i) : (n = i);
        var a = t.length;
        if (a % 2 != 0) throw new TypeError('Invalid hex string');
        n > a / 2 && (n = a / 2);
        for (var o = 0; o < n; ++o) {
          var s = parseInt(t.substr(2 * o, 2), 16);
          if (isNaN(s)) return o;
          r[e + o] = s;
        }
        return o;
      }
      function T(r, t, e, n) {
        return X(V(t, r.length - e), r, e, n);
      }
      function A(r, t, e, n) {
        return X(
          (function(r) {
            for (var t = [], e = 0; e < r.length; ++e)
              t.push(255 & r.charCodeAt(e));
            return t;
          })(t),
          r,
          e,
          n
        );
      }
      function b(r, t, e, n) {
        return A(r, t, e, n);
      }
      function v(r, t, e, n) {
        return X(k(t), r, e, n);
      }
      function m(r, t, e, n) {
        return X(
          (function(r, t) {
            for (
              var e, n, i, a = [], o = 0;
              o < r.length && !((t -= 2) < 0);
              ++o
            )
              (e = r.charCodeAt(o)),
                (n = e >> 8),
                (i = e % 256),
                a.push(i),
                a.push(n);
            return a;
          })(t, r.length - e),
          r,
          e,
          n
        );
      }
      function R(r, t, e) {
        return 0 === t && e === r.length
          ? n.fromByteArray(r)
          : n.fromByteArray(r.slice(t, e));
      }
      function w(r, t, e) {
        e = Math.min(r.length, e);
        for (var n = [], i = t; i < e; ) {
          var a,
            o,
            s,
            u,
            f = r[i],
            l = null,
            h = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
          if (i + h <= e)
            switch (h) {
              case 1:
                f < 128 && (l = f);
                break;
              case 2:
                128 == (192 & (a = r[i + 1])) &&
                  (u = ((31 & f) << 6) | (63 & a)) > 127 &&
                  (l = u);
                break;
              case 3:
                (a = r[i + 1]),
                  (o = r[i + 2]),
                  128 == (192 & a) &&
                    128 == (192 & o) &&
                    (u = ((15 & f) << 12) | ((63 & a) << 6) | (63 & o)) >
                      2047 &&
                    (u < 55296 || u > 57343) &&
                    (l = u);
                break;
              case 4:
                (a = r[i + 1]),
                  (o = r[i + 2]),
                  (s = r[i + 3]),
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
        return (function(r) {
          var t = r.length;
          if (t <= I) return String.fromCharCode.apply(String, r);
          var e = '',
            n = 0;
          for (; n < t; )
            e += String.fromCharCode.apply(String, r.slice(n, (n += I)));
          return e;
        })(n);
      }
      (t.Buffer = u),
        (t.SlowBuffer = function(r) {
          +r != r && (r = 0);
          return u.alloc(+r);
        }),
        (t.INSPECT_MAX_BYTES = 50),
        (u.TYPED_ARRAY_SUPPORT =
          void 0 !== r.TYPED_ARRAY_SUPPORT
            ? r.TYPED_ARRAY_SUPPORT
            : (function() {
                try {
                  var r = new Uint8Array(1);
                  return (
                    (r.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function() {
                        return 42;
                      }
                    }),
                    42 === r.foo() &&
                      'function' == typeof r.subarray &&
                      0 === r.subarray(1, 1).byteLength
                  );
                } catch (r) {
                  return !1;
                }
              })()),
        (t.kMaxLength = o()),
        (u.poolSize = 8192),
        (u._augment = function(r) {
          return (r.__proto__ = u.prototype), r;
        }),
        (u.from = function(r, t, e) {
          return f(null, r, t, e);
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
        (u.alloc = function(r, t, e) {
          return (function(r, t, e, n) {
            return (
              l(t),
              t <= 0
                ? s(r, t)
                : void 0 !== e
                  ? 'string' == typeof n
                    ? s(r, t).fill(e, n)
                    : s(r, t).fill(e)
                  : s(r, t)
            );
          })(null, r, t, e);
        }),
        (u.allocUnsafe = function(r) {
          return h(null, r);
        }),
        (u.allocUnsafeSlow = function(r) {
          return h(null, r);
        }),
        (u.isBuffer = function(r) {
          return !(null == r || !r._isBuffer);
        }),
        (u.compare = function(r, t) {
          if (!u.isBuffer(r) || !u.isBuffer(t))
            throw new TypeError('Arguments must be Buffers');
          if (r === t) return 0;
          for (
            var e = r.length, n = t.length, i = 0, a = Math.min(e, n);
            i < a;
            ++i
          )
            if (r[i] !== t[i]) {
              (e = r[i]), (n = t[i]);
              break;
            }
          return e < n ? -1 : n < e ? 1 : 0;
        }),
        (u.isEncoding = function(r) {
          switch (String(r).toLowerCase()) {
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
        (u.concat = function(r, t) {
          if (!a(r))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === r.length) return u.alloc(0);
          var e;
          if (void 0 === t)
            for (t = 0, e = 0; e < r.length; ++e) t += r[e].length;
          var n = u.allocUnsafe(t),
            i = 0;
          for (e = 0; e < r.length; ++e) {
            var o = r[e];
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
          var r = this.length;
          if (r % 2 != 0)
            throw new RangeError('Buffer size must be a multiple of 16-bits');
          for (var t = 0; t < r; t += 2) g(this, t, t + 1);
          return this;
        }),
        (u.prototype.swap32 = function() {
          var r = this.length;
          if (r % 4 != 0)
            throw new RangeError('Buffer size must be a multiple of 32-bits');
          for (var t = 0; t < r; t += 4)
            g(this, t, t + 3), g(this, t + 1, t + 2);
          return this;
        }),
        (u.prototype.swap64 = function() {
          var r = this.length;
          if (r % 8 != 0)
            throw new RangeError('Buffer size must be a multiple of 64-bits');
          for (var t = 0; t < r; t += 8)
            g(this, t, t + 7),
              g(this, t + 1, t + 6),
              g(this, t + 2, t + 5),
              g(this, t + 3, t + 4);
          return this;
        }),
        (u.prototype.toString = function() {
          var r = 0 | this.length;
          return 0 === r
            ? ''
            : 0 === arguments.length
              ? w(this, 0, r)
              : function(r, t, e) {
                  var n = !1;
                  if (((void 0 === t || t < 0) && (t = 0), t > this.length))
                    return '';
                  if (
                    ((void 0 === e || e > this.length) && (e = this.length),
                    e <= 0)
                  )
                    return '';
                  if ((e >>>= 0) <= (t >>>= 0)) return '';
                  for (r || (r = 'utf8'); ; )
                    switch (r) {
                      case 'hex':
                        return S(this, t, e);
                      case 'utf8':
                      case 'utf-8':
                        return w(this, t, e);
                      case 'ascii':
                        return N(this, t, e);
                      case 'latin1':
                      case 'binary':
                        return x(this, t, e);
                      case 'base64':
                        return R(this, t, e);
                      case 'ucs2':
                      case 'ucs-2':
                      case 'utf16le':
                      case 'utf-16le':
                        return U(this, t, e);
                      default:
                        if (n) throw new TypeError('Unknown encoding: ' + r);
                        (r = (r + '').toLowerCase()), (n = !0);
                    }
                }.apply(this, arguments);
        }),
        (u.prototype.equals = function(r) {
          if (!u.isBuffer(r)) throw new TypeError('Argument must be a Buffer');
          return this === r || 0 === u.compare(this, r);
        }),
        (u.prototype.inspect = function() {
          var r = '',
            e = t.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((r = this.toString('hex', 0, e)
                .match(/.{2}/g)
                .join(' ')),
              this.length > e && (r += ' ... ')),
            '<Buffer ' + r + '>'
          );
        }),
        (u.prototype.compare = function(r, t, e, n, i) {
          if (!u.isBuffer(r)) throw new TypeError('Argument must be a Buffer');
          if (
            (void 0 === t && (t = 0),
            void 0 === e && (e = r ? r.length : 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = this.length),
            t < 0 || e > r.length || n < 0 || i > this.length)
          )
            throw new RangeError('out of range index');
          if (n >= i && t >= e) return 0;
          if (n >= i) return -1;
          if (t >= e) return 1;
          if (((t >>>= 0), (e >>>= 0), (n >>>= 0), (i >>>= 0), this === r))
            return 0;
          for (
            var a = i - n,
              o = e - t,
              s = Math.min(a, o),
              f = this.slice(n, i),
              l = r.slice(t, e),
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
        (u.prototype.includes = function(r, t, e) {
          return -1 !== this.indexOf(r, t, e);
        }),
        (u.prototype.indexOf = function(r, t, e) {
          return E(this, r, t, e, !0);
        }),
        (u.prototype.lastIndexOf = function(r, t, e) {
          return E(this, r, t, e, !1);
        }),
        (u.prototype.write = function(r, t, e, n) {
          if (void 0 === t) (n = 'utf8'), (e = this.length), (t = 0);
          else if (void 0 === e && 'string' == typeof t)
            (n = t), (e = this.length), (t = 0);
          else {
            if (!isFinite(t))
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              );
            (t |= 0),
              isFinite(e)
                ? ((e |= 0), void 0 === n && (n = 'utf8'))
                : ((n = e), (e = void 0));
          }
          var i = this.length - t;
          if (
            ((void 0 === e || e > i) && (e = i),
            (r.length > 0 && (e < 0 || t < 0)) || t > this.length)
          )
            throw new RangeError('Attempt to write outside buffer bounds');
          n || (n = 'utf8');
          for (var a = !1; ; )
            switch (n) {
              case 'hex':
                return y(this, r, t, e);
              case 'utf8':
              case 'utf-8':
                return T(this, r, t, e);
              case 'ascii':
                return A(this, r, t, e);
              case 'latin1':
              case 'binary':
                return b(this, r, t, e);
              case 'base64':
                return v(this, r, t, e);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return m(this, r, t, e);
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
      function N(r, t, e) {
        var n = '';
        e = Math.min(r.length, e);
        for (var i = t; i < e; ++i) n += String.fromCharCode(127 & r[i]);
        return n;
      }
      function x(r, t, e) {
        var n = '';
        e = Math.min(r.length, e);
        for (var i = t; i < e; ++i) n += String.fromCharCode(r[i]);
        return n;
      }
      function S(r, t, e) {
        var n = r.length;
        (!t || t < 0) && (t = 0), (!e || e < 0 || e > n) && (e = n);
        for (var i = '', a = t; a < e; ++a) i += j(r[a]);
        return i;
      }
      function U(r, t, e) {
        for (var n = r.slice(t, e), i = '', a = 0; a < n.length; a += 2)
          i += String.fromCharCode(n[a] + 256 * n[a + 1]);
        return i;
      }
      function P(r, t, e) {
        if (r % 1 != 0 || r < 0) throw new RangeError('offset is not uint');
        if (r + t > e)
          throw new RangeError('Trying to access beyond buffer length');
      }
      function M(r, t, e, n, i, a) {
        if (!u.isBuffer(r))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < a)
          throw new RangeError('"value" argument is out of bounds');
        if (e + n > r.length) throw new RangeError('Index out of range');
      }
      function O(r, t, e, n) {
        t < 0 && (t = 65535 + t + 1);
        for (var i = 0, a = Math.min(r.length - e, 2); i < a; ++i)
          r[e + i] =
            (t & (255 << (8 * (n ? i : 1 - i)))) >>> (8 * (n ? i : 1 - i));
      }
      function F(r, t, e, n) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var i = 0, a = Math.min(r.length - e, 4); i < a; ++i)
          r[e + i] = (t >>> (8 * (n ? i : 3 - i))) & 255;
      }
      function L(r, t, e, n, i, a) {
        if (e + n > r.length) throw new RangeError('Index out of range');
        if (e < 0) throw new RangeError('Index out of range');
      }
      function C(r, t, e, n, a) {
        return a || L(r, 0, e, 4), i.write(r, t, e, n, 23, 4), e + 4;
      }
      function D(r, t, e, n, a) {
        return a || L(r, 0, e, 8), i.write(r, t, e, n, 52, 8), e + 8;
      }
      (u.prototype.slice = function(r, t) {
        var e,
          n = this.length;
        if (
          ((r = ~~r),
          (t = void 0 === t ? n : ~~t),
          r < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n),
          t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
          t < r && (t = r),
          u.TYPED_ARRAY_SUPPORT)
        )
          (e = this.subarray(r, t)).__proto__ = u.prototype;
        else {
          var i = t - r;
          e = new u(i, void 0);
          for (var a = 0; a < i; ++a) e[a] = this[a + r];
        }
        return e;
      }),
        (u.prototype.readUIntLE = function(r, t, e) {
          (r |= 0), (t |= 0), e || P(r, t, this.length);
          for (var n = this[r], i = 1, a = 0; ++a < t && (i *= 256); )
            n += this[r + a] * i;
          return n;
        }),
        (u.prototype.readUIntBE = function(r, t, e) {
          (r |= 0), (t |= 0), e || P(r, t, this.length);
          for (var n = this[r + --t], i = 1; t > 0 && (i *= 256); )
            n += this[r + --t] * i;
          return n;
        }),
        (u.prototype.readUInt8 = function(r, t) {
          return t || P(r, 1, this.length), this[r];
        }),
        (u.prototype.readUInt16LE = function(r, t) {
          return t || P(r, 2, this.length), this[r] | (this[r + 1] << 8);
        }),
        (u.prototype.readUInt16BE = function(r, t) {
          return t || P(r, 2, this.length), (this[r] << 8) | this[r + 1];
        }),
        (u.prototype.readUInt32LE = function(r, t) {
          return (
            t || P(r, 4, this.length),
            (this[r] | (this[r + 1] << 8) | (this[r + 2] << 16)) +
              16777216 * this[r + 3]
          );
        }),
        (u.prototype.readUInt32BE = function(r, t) {
          return (
            t || P(r, 4, this.length),
            16777216 * this[r] +
              ((this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3])
          );
        }),
        (u.prototype.readIntLE = function(r, t, e) {
          (r |= 0), (t |= 0), e || P(r, t, this.length);
          for (var n = this[r], i = 1, a = 0; ++a < t && (i *= 256); )
            n += this[r + a] * i;
          return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
        }),
        (u.prototype.readIntBE = function(r, t, e) {
          (r |= 0), (t |= 0), e || P(r, t, this.length);
          for (var n = t, i = 1, a = this[r + --n]; n > 0 && (i *= 256); )
            a += this[r + --n] * i;
          return a >= (i *= 128) && (a -= Math.pow(2, 8 * t)), a;
        }),
        (u.prototype.readInt8 = function(r, t) {
          return (
            t || P(r, 1, this.length),
            128 & this[r] ? -1 * (255 - this[r] + 1) : this[r]
          );
        }),
        (u.prototype.readInt16LE = function(r, t) {
          t || P(r, 2, this.length);
          var e = this[r] | (this[r + 1] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (u.prototype.readInt16BE = function(r, t) {
          t || P(r, 2, this.length);
          var e = this[r + 1] | (this[r] << 8);
          return 32768 & e ? 4294901760 | e : e;
        }),
        (u.prototype.readInt32LE = function(r, t) {
          return (
            t || P(r, 4, this.length),
            this[r] |
              (this[r + 1] << 8) |
              (this[r + 2] << 16) |
              (this[r + 3] << 24)
          );
        }),
        (u.prototype.readInt32BE = function(r, t) {
          return (
            t || P(r, 4, this.length),
            (this[r] << 24) |
              (this[r + 1] << 16) |
              (this[r + 2] << 8) |
              this[r + 3]
          );
        }),
        (u.prototype.readFloatLE = function(r, t) {
          return t || P(r, 4, this.length), i.read(this, r, !0, 23, 4);
        }),
        (u.prototype.readFloatBE = function(r, t) {
          return t || P(r, 4, this.length), i.read(this, r, !1, 23, 4);
        }),
        (u.prototype.readDoubleLE = function(r, t) {
          return t || P(r, 8, this.length), i.read(this, r, !0, 52, 8);
        }),
        (u.prototype.readDoubleBE = function(r, t) {
          return t || P(r, 8, this.length), i.read(this, r, !1, 52, 8);
        }),
        (u.prototype.writeUIntLE = function(r, t, e, n) {
          ((r = +r), (t |= 0), (e |= 0), n) ||
            M(this, r, t, e, Math.pow(2, 8 * e) - 1, 0);
          var i = 1,
            a = 0;
          for (this[t] = 255 & r; ++a < e && (i *= 256); )
            this[t + a] = (r / i) & 255;
          return t + e;
        }),
        (u.prototype.writeUIntBE = function(r, t, e, n) {
          ((r = +r), (t |= 0), (e |= 0), n) ||
            M(this, r, t, e, Math.pow(2, 8 * e) - 1, 0);
          var i = e - 1,
            a = 1;
          for (this[t + i] = 255 & r; --i >= 0 && (a *= 256); )
            this[t + i] = (r / a) & 255;
          return t + e;
        }),
        (u.prototype.writeUInt8 = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 1, 255, 0),
            u.TYPED_ARRAY_SUPPORT || (r = Math.floor(r)),
            (this[t] = 255 & r),
            t + 1
          );
        }),
        (u.prototype.writeUInt16LE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & r), (this[t + 1] = r >>> 8))
              : O(this, r, t, !0),
            t + 2
          );
        }),
        (u.prototype.writeUInt16BE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 2, 65535, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = r >>> 8), (this[t + 1] = 255 & r))
              : O(this, r, t, !1),
            t + 2
          );
        }),
        (u.prototype.writeUInt32LE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t + 3] = r >>> 24),
                (this[t + 2] = r >>> 16),
                (this[t + 1] = r >>> 8),
                (this[t] = 255 & r))
              : F(this, r, t, !0),
            t + 4
          );
        }),
        (u.prototype.writeUInt32BE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 4, 4294967295, 0),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = r >>> 24),
                (this[t + 1] = r >>> 16),
                (this[t + 2] = r >>> 8),
                (this[t + 3] = 255 & r))
              : F(this, r, t, !1),
            t + 4
          );
        }),
        (u.prototype.writeIntLE = function(r, t, e, n) {
          if (((r = +r), (t |= 0), !n)) {
            var i = Math.pow(2, 8 * e - 1);
            M(this, r, t, e, i - 1, -i);
          }
          var a = 0,
            o = 1,
            s = 0;
          for (this[t] = 255 & r; ++a < e && (o *= 256); )
            r < 0 && 0 === s && 0 !== this[t + a - 1] && (s = 1),
              (this[t + a] = (((r / o) >> 0) - s) & 255);
          return t + e;
        }),
        (u.prototype.writeIntBE = function(r, t, e, n) {
          if (((r = +r), (t |= 0), !n)) {
            var i = Math.pow(2, 8 * e - 1);
            M(this, r, t, e, i - 1, -i);
          }
          var a = e - 1,
            o = 1,
            s = 0;
          for (this[t + a] = 255 & r; --a >= 0 && (o *= 256); )
            r < 0 && 0 === s && 0 !== this[t + a + 1] && (s = 1),
              (this[t + a] = (((r / o) >> 0) - s) & 255);
          return t + e;
        }),
        (u.prototype.writeInt8 = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 1, 127, -128),
            u.TYPED_ARRAY_SUPPORT || (r = Math.floor(r)),
            r < 0 && (r = 255 + r + 1),
            (this[t] = 255 & r),
            t + 1
          );
        }),
        (u.prototype.writeInt16LE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & r), (this[t + 1] = r >>> 8))
              : O(this, r, t, !0),
            t + 2
          );
        }),
        (u.prototype.writeInt16BE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 2, 32767, -32768),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = r >>> 8), (this[t + 1] = 255 & r))
              : O(this, r, t, !1),
            t + 2
          );
        }),
        (u.prototype.writeInt32LE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 4, 2147483647, -2147483648),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & r),
                (this[t + 1] = r >>> 8),
                (this[t + 2] = r >>> 16),
                (this[t + 3] = r >>> 24))
              : F(this, r, t, !0),
            t + 4
          );
        }),
        (u.prototype.writeInt32BE = function(r, t, e) {
          return (
            (r = +r),
            (t |= 0),
            e || M(this, r, t, 4, 2147483647, -2147483648),
            r < 0 && (r = 4294967295 + r + 1),
            u.TYPED_ARRAY_SUPPORT
              ? ((this[t] = r >>> 24),
                (this[t + 1] = r >>> 16),
                (this[t + 2] = r >>> 8),
                (this[t + 3] = 255 & r))
              : F(this, r, t, !1),
            t + 4
          );
        }),
        (u.prototype.writeFloatLE = function(r, t, e) {
          return C(this, r, t, !0, e);
        }),
        (u.prototype.writeFloatBE = function(r, t, e) {
          return C(this, r, t, !1, e);
        }),
        (u.prototype.writeDoubleLE = function(r, t, e) {
          return D(this, r, t, !0, e);
        }),
        (u.prototype.writeDoubleBE = function(r, t, e) {
          return D(this, r, t, !1, e);
        }),
        (u.prototype.copy = function(r, t, e, n) {
          if (
            (e || (e = 0),
            n || 0 === n || (n = this.length),
            t >= r.length && (t = r.length),
            t || (t = 0),
            n > 0 && n < e && (n = e),
            n === e)
          )
            return 0;
          if (0 === r.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError('targetStart out of bounds');
          if (e < 0 || e >= this.length)
            throw new RangeError('sourceStart out of bounds');
          if (n < 0) throw new RangeError('sourceEnd out of bounds');
          n > this.length && (n = this.length),
            r.length - t < n - e && (n = r.length - t + e);
          var i,
            a = n - e;
          if (this === r && e < t && t < n)
            for (i = a - 1; i >= 0; --i) r[i + t] = this[i + e];
          else if (a < 1e3 || !u.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < a; ++i) r[i + t] = this[i + e];
          else Uint8Array.prototype.set.call(r, this.subarray(e, e + a), t);
          return a;
        }),
        (u.prototype.fill = function(r, t, e, n) {
          if ('string' == typeof r) {
            if (
              ('string' == typeof t
                ? ((n = t), (t = 0), (e = this.length))
                : 'string' == typeof e && ((n = e), (e = this.length)),
              1 === r.length)
            ) {
              var i = r.charCodeAt(0);
              i < 256 && (r = i);
            }
            if (void 0 !== n && 'string' != typeof n)
              throw new TypeError('encoding must be a string');
            if ('string' == typeof n && !u.isEncoding(n))
              throw new TypeError('Unknown encoding: ' + n);
          } else 'number' == typeof r && (r &= 255);
          if (t < 0 || this.length < t || this.length < e)
            throw new RangeError('Out of range index');
          if (e <= t) return this;
          var a;
          if (
            ((t >>>= 0),
            (e = void 0 === e ? this.length : e >>> 0),
            r || (r = 0),
            'number' == typeof r)
          )
            for (a = t; a < e; ++a) this[a] = r;
          else {
            var o = u.isBuffer(r) ? r : V(new u(r, n).toString()),
              s = o.length;
            for (a = 0; a < e - t; ++a) this[a + t] = o[a % s];
          }
          return this;
        });
      var B = /[^+\/0-9A-Za-z-_]/g;
      function j(r) {
        return r < 16 ? '0' + r.toString(16) : r.toString(16);
      }
      function V(r, t) {
        var e;
        t = t || 1 / 0;
        for (var n = r.length, i = null, a = [], o = 0; o < n; ++o) {
          if ((e = r.charCodeAt(o)) > 55295 && e < 57344) {
            if (!i) {
              if (e > 56319) {
                (t -= 3) > -1 && a.push(239, 191, 189);
                continue;
              }
              if (o + 1 === n) {
                (t -= 3) > -1 && a.push(239, 191, 189);
                continue;
              }
              i = e;
              continue;
            }
            if (e < 56320) {
              (t -= 3) > -1 && a.push(239, 191, 189), (i = e);
              continue;
            }
            e = 65536 + (((i - 55296) << 10) | (e - 56320));
          } else i && (t -= 3) > -1 && a.push(239, 191, 189);
          if (((i = null), e < 128)) {
            if ((t -= 1) < 0) break;
            a.push(e);
          } else if (e < 2048) {
            if ((t -= 2) < 0) break;
            a.push((e >> 6) | 192, (63 & e) | 128);
          } else if (e < 65536) {
            if ((t -= 3) < 0) break;
            a.push((e >> 12) | 224, ((e >> 6) & 63) | 128, (63 & e) | 128);
          } else {
            if (!(e < 1114112)) throw new Error('Invalid code point');
            if ((t -= 4) < 0) break;
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
      function k(r) {
        return n.toByteArray(
          (function(r) {
            if (
              (r = (function(r) {
                return r.trim ? r.trim() : r.replace(/^\s+|\s+$/g, '');
              })(r).replace(B, '')).length < 2
            )
              return '';
            for (; r.length % 4 != 0; ) r += '=';
            return r;
          })(r)
        );
      }
      function X(r, t, e, n) {
        for (var i = 0; i < n && !(i + e >= t.length || i >= r.length); ++i)
          t[i + e] = r[i];
        return i;
      }
    }.call(this, e(5)));
  },
  function(r, t, e) {
    'use strict';
    (t.byteLength = function(r) {
      var t = f(r),
        e = t[0],
        n = t[1];
      return (3 * (e + n)) / 4 - n;
    }),
      (t.toByteArray = function(r) {
        for (
          var t,
            e = f(r),
            n = e[0],
            o = e[1],
            s = new a(
              (function(r, t, e) {
                return (3 * (t + e)) / 4 - e;
              })(0, n, o)
            ),
            u = 0,
            l = o > 0 ? n - 4 : n,
            h = 0;
          h < l;
          h += 4
        )
          (t =
            (i[r.charCodeAt(h)] << 18) |
            (i[r.charCodeAt(h + 1)] << 12) |
            (i[r.charCodeAt(h + 2)] << 6) |
            i[r.charCodeAt(h + 3)]),
            (s[u++] = (t >> 16) & 255),
            (s[u++] = (t >> 8) & 255),
            (s[u++] = 255 & t);
        2 === o &&
          ((t = (i[r.charCodeAt(h)] << 2) | (i[r.charCodeAt(h + 1)] >> 4)),
          (s[u++] = 255 & t));
        1 === o &&
          ((t =
            (i[r.charCodeAt(h)] << 10) |
            (i[r.charCodeAt(h + 1)] << 4) |
            (i[r.charCodeAt(h + 2)] >> 2)),
          (s[u++] = (t >> 8) & 255),
          (s[u++] = 255 & t));
        return s;
      }),
      (t.fromByteArray = function(r) {
        for (
          var t, e = r.length, i = e % 3, a = [], o = 0, s = e - i;
          o < s;
          o += 16383
        )
          a.push(h(r, o, o + 16383 > s ? s : o + 16383));
        1 === i
          ? ((t = r[e - 1]), a.push(n[t >> 2] + n[(t << 4) & 63] + '=='))
          : 2 === i &&
            ((t = (r[e - 2] << 8) + r[e - 1]),
            a.push(n[t >> 10] + n[(t >> 4) & 63] + n[(t << 2) & 63] + '='));
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
    function f(r) {
      var t = r.length;
      if (t % 4 > 0)
        throw new Error('Invalid string. Length must be a multiple of 4');
      var e = r.indexOf('=');
      return -1 === e && (e = t), [e, e === t ? 0 : 4 - (e % 4)];
    }
    function l(r) {
      return (
        n[(r >> 18) & 63] + n[(r >> 12) & 63] + n[(r >> 6) & 63] + n[63 & r]
      );
    }
    function h(r, t, e) {
      for (var n, i = [], a = t; a < e; a += 3)
        (n =
          ((r[a] << 16) & 16711680) +
          ((r[a + 1] << 8) & 65280) +
          (255 & r[a + 2])),
          i.push(l(n));
      return i.join('');
    }
    (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
  },
  function(r, t) {
    (t.read = function(r, t, e, n, i) {
      var a,
        o,
        s = 8 * i - n - 1,
        u = (1 << s) - 1,
        f = u >> 1,
        l = -7,
        h = e ? i - 1 : 0,
        c = e ? -1 : 1,
        p = r[t + h];
      for (
        h += c, a = p & ((1 << -l) - 1), p >>= -l, l += s;
        l > 0;
        a = 256 * a + r[t + h], h += c, l -= 8
      );
      for (
        o = a & ((1 << -l) - 1), a >>= -l, l += n;
        l > 0;
        o = 256 * o + r[t + h], h += c, l -= 8
      );
      if (0 === a) a = 1 - f;
      else {
        if (a === u) return o ? NaN : (1 / 0) * (p ? -1 : 1);
        (o += Math.pow(2, n)), (a -= f);
      }
      return (p ? -1 : 1) * o * Math.pow(2, a - n);
    }),
      (t.write = function(r, t, e, n, i, a) {
        var o,
          s,
          u,
          f = 8 * a - i - 1,
          l = (1 << f) - 1,
          h = l >> 1,
          c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = n ? 0 : a - 1,
          _ = n ? 1 : -1,
          g = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
        for (
          t = Math.abs(t),
            isNaN(t) || t === 1 / 0
              ? ((s = isNaN(t) ? 1 : 0), (o = l))
              : ((o = Math.floor(Math.log(t) / Math.LN2)),
                t * (u = Math.pow(2, -o)) < 1 && (o--, (u *= 2)),
                (t += o + h >= 1 ? c / u : c * Math.pow(2, 1 - h)) * u >= 2 &&
                  (o++, (u /= 2)),
                o + h >= l
                  ? ((s = 0), (o = l))
                  : o + h >= 1
                    ? ((s = (t * u - 1) * Math.pow(2, i)), (o += h))
                    : ((s = t * Math.pow(2, h - 1) * Math.pow(2, i)), (o = 0)));
          i >= 8;
          r[e + p] = 255 & s, p += _, s /= 256, i -= 8
        );
        for (
          o = (o << i) | s, f += i;
          f > 0;
          r[e + p] = 255 & o, p += _, o /= 256, f -= 8
        );
        r[e + p - _] |= 128 * g;
      });
  },
  function(r, t) {
    var e = {}.toString;
    r.exports =
      Array.isArray ||
      function(r) {
        return '[object Array]' == e.call(r);
      };
  },
  function(r, t, e) {
    'use strict';
    'use restrict';
    function n(r) {
      var t = 32;
      return (
        (r &= -r) && t--,
        65535 & r && (t -= 16),
        16711935 & r && (t -= 8),
        252645135 & r && (t -= 4),
        858993459 & r && (t -= 2),
        1431655765 & r && (t -= 1),
        t
      );
    }
    (t.INT_BITS = 32),
      (t.INT_MAX = 2147483647),
      (t.INT_MIN = -1 << 31),
      (t.sign = function(r) {
        return (r > 0) - (r < 0);
      }),
      (t.abs = function(r) {
        var t = r >> 31;
        return (r ^ t) - t;
      }),
      (t.min = function(r, t) {
        return t ^ ((r ^ t) & -(r < t));
      }),
      (t.max = function(r, t) {
        return r ^ ((r ^ t) & -(r < t));
      }),
      (t.isPow2 = function(r) {
        return !(r & (r - 1) || !r);
      }),
      (t.log2 = function(r) {
        var t, e;
        return (
          (t = (r > 65535) << 4),
          (t |= e = ((r >>>= t) > 255) << 3),
          (t |= e = ((r >>>= e) > 15) << 2),
          (t |= e = ((r >>>= e) > 3) << 1) | ((r >>>= e) >> 1)
        );
      }),
      (t.log10 = function(r) {
        return r >= 1e9
          ? 9
          : r >= 1e8
            ? 8
            : r >= 1e7
              ? 7
              : r >= 1e6
                ? 6
                : r >= 1e5
                  ? 5
                  : r >= 1e4
                    ? 4
                    : r >= 1e3
                      ? 3
                      : r >= 100
                        ? 2
                        : r >= 10
                          ? 1
                          : 0;
      }),
      (t.popCount = function(r) {
        return (
          (16843009 *
            (((r =
              (858993459 & (r -= (r >>> 1) & 1431655765)) +
              ((r >>> 2) & 858993459)) +
              (r >>> 4)) &
              252645135)) >>>
          24
        );
      }),
      (t.countTrailingZeros = n),
      (t.nextPow2 = function(r) {
        return (
          (r += 0 === r),
          --r,
          (r |= r >>> 1),
          (r |= r >>> 2),
          (r |= r >>> 4),
          (r |= r >>> 8),
          (r |= r >>> 16) + 1
        );
      }),
      (t.prevPow2 = function(r) {
        return (
          (r |= r >>> 1),
          (r |= r >>> 2),
          (r |= r >>> 4),
          (r |= r >>> 8),
          (r |= r >>> 16) - (r >>> 1)
        );
      }),
      (t.parity = function(r) {
        return (
          (r ^= r >>> 16),
          (r ^= r >>> 8),
          (r ^= r >>> 4),
          (27030 >>> (r &= 15)) & 1
        );
      });
    var i = new Array(256);
    !(function(r) {
      for (var t = 0; t < 256; ++t) {
        var e = t,
          n = t,
          i = 7;
        for (e >>>= 1; e; e >>>= 1) (n <<= 1), (n |= 1 & e), --i;
        r[t] = (n << i) & 255;
      }
    })(i),
      (t.reverse = function(r) {
        return (
          (i[255 & r] << 24) |
          (i[(r >>> 8) & 255] << 16) |
          (i[(r >>> 16) & 255] << 8) |
          i[(r >>> 24) & 255]
        );
      }),
      (t.interleave2 = function(r, t) {
        return (
          (r =
            1431655765 &
            ((r =
              858993459 &
              ((r =
                252645135 &
                ((r = 16711935 & ((r &= 65535) | (r << 8))) | (r << 4))) |
                (r << 2))) |
              (r << 1))) |
          ((t =
            1431655765 &
            ((t =
              858993459 &
              ((t =
                252645135 &
                ((t = 16711935 & ((t &= 65535) | (t << 8))) | (t << 4))) |
                (t << 2))) |
              (t << 1))) <<
            1)
        );
      }),
      (t.deinterleave2 = function(r, t) {
        return (
          ((r =
            65535 &
            ((r =
              16711935 &
              ((r =
                252645135 &
                ((r = 858993459 & ((r = (r >>> t) & 1431655765) | (r >>> 1))) |
                  (r >>> 2))) |
                (r >>> 4))) |
              (r >>> 16))) <<
            16) >>
          16
        );
      }),
      (t.interleave3 = function(r, t, e) {
        return (
          (r =
            1227133513 &
            ((r =
              3272356035 &
              ((r =
                251719695 &
                ((r = 4278190335 & ((r &= 1023) | (r << 16))) | (r << 8))) |
                (r << 4))) |
              (r << 2))),
          (r |=
            (t =
              1227133513 &
              ((t =
                3272356035 &
                ((t =
                  251719695 &
                  ((t = 4278190335 & ((t &= 1023) | (t << 16))) | (t << 8))) |
                  (t << 4))) |
                (t << 2))) << 1) |
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
      (t.deinterleave3 = function(r, t) {
        return (
          ((r =
            1023 &
            ((r =
              4278190335 &
              ((r =
                251719695 &
                ((r = 3272356035 & ((r = (r >>> t) & 1227133513) | (r >>> 2))) |
                  (r >>> 4))) |
                (r >>> 8))) |
              (r >>> 16))) <<
            22) >>
          22
        );
      }),
      (t.nextCombination = function(r) {
        var t = r | (r - 1);
        return (t + 1) | (((~t & -~t) - 1) >>> (n(r) + 1));
      });
  },
  function(r, t, e) {
    'use strict';
    r.exports = function(r, t) {
      switch ((void 0 === t && (t = 0), typeof r)) {
        case 'number':
          if (r > 0)
            return (function(r, t) {
              var e, n;
              for (e = new Array(r), n = 0; n < r; ++n) e[n] = t;
              return e;
            })(0 | r, t);
          break;
        case 'object':
          if ('number' == typeof r.length)
            return (function r(t, e, n) {
              var i = 0 | t[n];
              if (i <= 0) return [];
              var a,
                o = new Array(i);
              if (n === t.length - 1) for (a = 0; a < i; ++a) o[a] = e;
              else for (a = 0; a < i; ++a) o[a] = r(t, e, n + 1);
              return o;
            })(r, t, 0);
      }
      return [];
    };
  },
  function(r, t, e) {
    'use strict';
    var n = e(27);
    r.exports = function(r) {
      var t = new function() {
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
      (t.pre = r.pre), (t.body = r.body), (t.post = r.post);
      var e = r.args.slice(0);
      t.argTypes = e;
      for (var i = 0; i < e.length; ++i) {
        var a = e[i];
        if ('array' === a || ('object' == typeof a && a.blockIndices)) {
          if (
            ((t.argTypes[i] = 'array'),
            t.arrayArgs.push(i),
            t.arrayBlockIndices.push(a.blockIndices ? a.blockIndices : 0),
            t.shimArgs.push('array' + i),
            i < t.pre.args.length && t.pre.args[i].count > 0)
          )
            throw new Error('cwise: pre() block may not reference array args');
          if (i < t.post.args.length && t.post.args[i].count > 0)
            throw new Error('cwise: post() block may not reference array args');
        } else if ('scalar' === a)
          t.scalarArgs.push(i), t.shimArgs.push('scalar' + i);
        else if ('index' === a) {
          if (
            (t.indexArgs.push(i),
            i < t.pre.args.length && t.pre.args[i].count > 0)
          )
            throw new Error('cwise: pre() block may not reference array index');
          if (i < t.body.args.length && t.body.args[i].lvalue)
            throw new Error('cwise: body() block may not write to array index');
          if (i < t.post.args.length && t.post.args[i].count > 0)
            throw new Error(
              'cwise: post() block may not reference array index'
            );
        } else if ('shape' === a) {
          if (
            (t.shapeArgs.push(i), i < t.pre.args.length && t.pre.args[i].lvalue)
          )
            throw new Error('cwise: pre() block may not write to array shape');
          if (i < t.body.args.length && t.body.args[i].lvalue)
            throw new Error('cwise: body() block may not write to array shape');
          if (i < t.post.args.length && t.post.args[i].lvalue)
            throw new Error('cwise: post() block may not write to array shape');
        } else {
          if ('object' != typeof a || !a.offset)
            throw new Error('cwise: Unknown argument type ' + e[i]);
          (t.argTypes[i] = 'offset'),
            t.offsetArgs.push({ array: a.array, offset: a.offset }),
            t.offsetArgIndex.push(i);
        }
      }
      if (t.arrayArgs.length <= 0)
        throw new Error('cwise: No array arguments specified');
      if (t.pre.args.length > e.length)
        throw new Error('cwise: Too many arguments in pre() block');
      if (t.body.args.length > e.length)
        throw new Error('cwise: Too many arguments in body() block');
      if (t.post.args.length > e.length)
        throw new Error('cwise: Too many arguments in post() block');
      return (
        (t.debug = !!r.printCode || !!r.debug),
        (t.funcName = r.funcName || 'cwise'),
        (t.blockSize = r.blockSize || 64),
        n(t)
      );
    };
  },
  function(r, t, e) {
    'use strict';
    var n = e(28);
    r.exports = function(r) {
      var t = ["'use strict'", 'var CACHED={}'],
        e = [],
        i = r.funcName + '_cwise_thunk';
      t.push(['return function ', i, '(', r.shimArgs.join(','), '){'].join(''));
      for (
        var a = [],
          o = [],
          s = [
            [
              'array',
              r.arrayArgs[0],
              '.shape.slice(',
              Math.max(0, r.arrayBlockIndices[0]),
              r.arrayBlockIndices[0] < 0
                ? ',' + r.arrayBlockIndices[0] + ')'
                : ')'
            ].join('')
          ],
          u = [],
          f = [],
          l = 0;
        l < r.arrayArgs.length;
        ++l
      ) {
        var h = r.arrayArgs[l];
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
                r.arrayArgs[0] +
                '.shape.length===array' +
                h +
                '.shape.length+' +
                (Math.abs(r.arrayBlockIndices[0]) -
                  Math.abs(r.arrayBlockIndices[l]))
            ),
            f.push(
              'array' +
                r.arrayArgs[0] +
                '.shape[shapeIndex+' +
                Math.max(0, r.arrayBlockIndices[0]) +
                ']===array' +
                h +
                '.shape[shapeIndex+' +
                Math.max(0, r.arrayBlockIndices[l]) +
                ']'
            ));
      }
      for (
        r.arrayArgs.length > 1 &&
          (t.push(
            'if (!(' +
              u.join(' && ') +
              ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"
          ),
          t.push(
            'for(var shapeIndex=array' +
              r.arrayArgs[0] +
              '.shape.length-' +
              Math.abs(r.arrayBlockIndices[0]) +
              '; shapeIndex--\x3e0;) {'
          ),
          t.push(
            'if (!(' +
              f.join(' && ') +
              ")) throw new Error('cwise: Arrays do not all have the same shape!')"
          ),
          t.push('}')),
          l = 0;
        l < r.scalarArgs.length;
        ++l
      )
        s.push('scalar' + r.scalarArgs[l]);
      return (
        e.push(['type=[', o.join(','), '].join()'].join('')),
        e.push('proc=CACHED[type]'),
        t.push('var ' + e.join(',')),
        t.push(
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
        r.debug &&
          console.log(
            '-----Generated thunk:\n' + t.join('\n') + '\n----------'
          ),
        new Function('compile', t.join('\n'))(n.bind(void 0, r))
      );
    };
  },
  function(r, t, e) {
    'use strict';
    var n = e(29);
    function i(r, t, e) {
      var n,
        i,
        a = r.length,
        o = t.arrayArgs.length,
        s = t.indexArgs.length > 0,
        u = [],
        f = [],
        l = 0,
        h = 0;
      for (n = 0; n < a; ++n) f.push(['i', n, '=0'].join(''));
      for (i = 0; i < o; ++i)
        for (n = 0; n < a; ++n)
          (h = l),
            (l = r[n]),
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
        (l = r[n]),
          u.push(['for(i', n, '=0;i', n, '<s', l, ';++i', n, '){'].join(''));
      for (u.push(e), n = 0; n < a; ++n) {
        for (h = l, l = r[n], i = 0; i < o; ++i)
          u.push(['p', i, '+=d', i, 's', n].join(''));
        s &&
          (n > 0 && u.push(['index[', h, ']-=s', h].join('')),
          u.push(['++index[', l, ']'].join(''))),
          u.push('}');
      }
      return u.join('\n');
    }
    function a(r, t, e) {
      for (var n = r.body, i = [], a = [], o = 0; o < r.args.length; ++o) {
        var s = r.args[o];
        if (!(s.count <= 0)) {
          var u = new RegExp(s.name, 'g'),
            f = '',
            l = t.arrayArgs.indexOf(o);
          switch (t.argTypes[o]) {
            case 'offset':
              var h = t.offsetArgIndex.indexOf(o);
              (l = t.offsetArgs[h].array), (f = '+q' + h);
            case 'array':
              f = 'p' + l + f;
              var c = 'l' + o,
                p = 'a' + l;
              if (0 === t.arrayBlockIndices[l])
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
                  E < Math.abs(t.arrayBlockIndices[l]);
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
              n = n.replace(u, 'Y' + t.scalarArgs.indexOf(o));
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
    r.exports = function(r, t) {
      for (
        var e = (t[1].length - Math.abs(r.arrayBlockIndices[0])) | 0,
          o = new Array(r.arrayArgs.length),
          s = new Array(r.arrayArgs.length),
          u = 0;
        u < r.arrayArgs.length;
        ++u
      )
        (s[u] = t[2 * u]), (o[u] = t[2 * u + 1]);
      var f = [],
        l = [],
        h = [],
        c = [],
        p = [];
      for (u = 0; u < r.arrayArgs.length; ++u) {
        r.arrayBlockIndices[u] < 0
          ? (h.push(0),
            c.push(e),
            f.push(e),
            l.push(e + r.arrayBlockIndices[u]))
          : (h.push(r.arrayBlockIndices[u]),
            c.push(r.arrayBlockIndices[u] + e),
            f.push(0),
            l.push(r.arrayBlockIndices[u]));
        for (var _ = [], g = 0; g < o[u].length; g++)
          h[u] <= o[u][g] && o[u][g] < c[u] && _.push(o[u][g] - h[u]);
        p.push(_);
      }
      var E = ['SS'],
        d = ["'use strict'"],
        y = [];
      for (g = 0; g < e; ++g) y.push(['s', g, '=SS[', g, ']'].join(''));
      for (u = 0; u < r.arrayArgs.length; ++u) {
        for (
          E.push('a' + u), E.push('t' + u), E.push('p' + u), g = 0;
          g < e;
          ++g
        )
          y.push(['t', u, 'p', g, '=t', u, '[', h[u] + g, ']'].join(''));
        for (g = 0; g < Math.abs(r.arrayBlockIndices[u]); ++g)
          y.push(['t', u, 'b', g, '=t', u, '[', f[u] + g, ']'].join(''));
      }
      for (u = 0; u < r.scalarArgs.length; ++u) E.push('Y' + u);
      if (
        (r.shapeArgs.length > 0 && y.push('shape=SS.slice(0)'),
        r.indexArgs.length > 0)
      ) {
        var T = new Array(e);
        for (u = 0; u < e; ++u) T[u] = '0';
        y.push(['index=[', T.join(','), ']'].join(''));
      }
      for (u = 0; u < r.offsetArgs.length; ++u) {
        var A = r.offsetArgs[u],
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
          .concat(r.pre.thisVars)
          .concat(r.body.thisVars)
          .concat(r.post.thisVars)
      );
      for (
        (y = y.concat(v)).length > 0 && d.push('var ' + y.join(',')), u = 0;
        u < r.arrayArgs.length;
        ++u
      )
        d.push('p' + u + '|=0');
      r.pre.body.length > 3 && d.push(a(r.pre, r, s));
      var m = a(r.body, r, s),
        R = (function(r) {
          for (var t = 0, e = r[0].length; t < e; ) {
            for (var n = 1; n < r.length; ++n)
              if (r[n][t] !== r[0][t]) return t;
            ++t;
          }
          return t;
        })(p);
      R < e
        ? d.push(
            (function(r, t, e, n) {
              for (
                var a = t.length,
                  o = e.arrayArgs.length,
                  s = e.blockSize,
                  u = e.indexArgs.length > 0,
                  f = [],
                  l = 0;
                l < o;
                ++l
              )
                f.push(['var offset', l, '=p', l].join(''));
              for (l = r; l < a; ++l)
                f.push(
                  ['for(var j' + l + '=SS[', t[l], ']|0;j', l, '>0;){'].join('')
                ),
                  f.push(['if(j', l, '<', s, '){'].join('')),
                  f.push(['s', t[l], '=j', l].join('')),
                  f.push(['j', l, '=0'].join('')),
                  f.push(['}else{s', t[l], '=', s].join('')),
                  f.push(['j', l, '-=', s, '}'].join('')),
                  u && f.push(['index[', t[l], ']=j', l].join(''));
              for (l = 0; l < o; ++l) {
                for (var h = ['offset' + l], c = r; c < a; ++c)
                  h.push(['j', c, '*t', l, 'p', t[c]].join(''));
                f.push(['p', l, '=(', h.join('+'), ')'].join(''));
              }
              for (f.push(i(t, e, n)), l = r; l < a; ++l) f.push('}');
              return f.join('\n');
            })(R, p[0], r, m)
          )
        : d.push(i(p[0], r, m)),
        r.post.body.length > 3 && d.push(a(r.post, r, s)),
        r.debug &&
          console.log(
            '-----Generated cwise routine for ',
            t,
            ':\n' + d.join('\n') + '\n----------'
          );
      var w = [
        r.funcName || 'unnamed',
        '_cwise_loop_',
        o[0].join('s'),
        'm',
        R,
        (function(r) {
          for (var t = new Array(r.length), e = !0, n = 0; n < r.length; ++n) {
            var i = r[n],
              a = i.match(/\d+/);
            (a = a ? a[0] : ''),
              0 === i.charAt(0)
                ? (t[n] = 'u' + i.charAt(1) + a)
                : (t[n] = i.charAt(0) + a),
              n > 0 && (e = e && t[n] === t[n - 1]);
          }
          return e ? t[0] : t.join('');
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
  function(r, t, e) {
    'use strict';
    r.exports = function(r, t, e) {
      return 0 === r.length
        ? r
        : t
          ? (e || r.sort(t),
            (function(r, t) {
              for (
                var e = 1, n = r.length, i = r[0], a = r[0], o = 1;
                o < n;
                ++o
              )
                if (((a = i), t((i = r[o]), a))) {
                  if (o === e) {
                    e++;
                    continue;
                  }
                  r[e++] = i;
                }
              return (r.length = e), r;
            })(r, t))
          : (e || r.sort(),
            (function(r) {
              for (
                var t = 1, e = r.length, n = r[0], i = r[0], a = 1;
                a < e;
                ++a, i = n
              )
                if (((i = n), (n = r[a]) !== i)) {
                  if (a === t) {
                    t++;
                    continue;
                  }
                  r[t++] = n;
                }
              return (r.length = t), r;
            })(r));
    };
  },
  function(r, t, e) {
    'use strict';
    r.exports = function(r) {
      for (var t = new Array(r), e = 0; e < r; ++e) t[e] = e;
      return t;
    };
  },
  function(r, t) {
    function e(r) {
      return (
        !!r.constructor &&
        'function' == typeof r.constructor.isBuffer &&
        r.constructor.isBuffer(r)
      );
    }
    /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
    r.exports = function(r) {
      return (
        null != r &&
        (e(r) ||
          (function(r) {
            return (
              'function' == typeof r.readFloatLE &&
              'function' == typeof r.slice &&
              e(r.slice(0, 0))
            );
          })(r) ||
          !!r._isBuffer)
      );
    };
  },
  function(r, t, e) {
    'use strict';
    var n = e(33),
      i = e(34);
    r.exports = function(r, t, e, a) {
      var o,
        s = r.createVertexArray
          ? new function(r) {
              (this.bindVertexArrayOES = r.bindVertexArray.bind(r)),
                (this.createVertexArrayOES = r.createVertexArray.bind(r)),
                (this.deleteVertexArrayOES = r.deleteVertexArray.bind(r));
            }(r)
          : r.getExtension('OES_vertex_array_object');
      return (o = s ? n(r, s) : i(r)).update(t, e, a), o;
    };
  },
  function(r, t, e) {
    'use strict';
    var n = e(8);
    function i(r, t, e, n, i, a) {
      (this.location = r),
        (this.dimension = t),
        (this.a = e),
        (this.b = n),
        (this.c = i),
        (this.d = a);
    }
    function a(r, t, e) {
      (this.gl = r),
        (this._ext = t),
        (this.handle = e),
        (this._attribs = []),
        (this._useElements = !1),
        (this._elementsType = r.UNSIGNED_SHORT);
    }
    (i.prototype.bind = function(r) {
      switch (this.dimension) {
        case 1:
          r.vertexAttrib1f(this.location, this.a);
          break;
        case 2:
          r.vertexAttrib2f(this.location, this.a, this.b);
          break;
        case 3:
          r.vertexAttrib3f(this.location, this.a, this.b, this.c);
          break;
        case 4:
          r.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d);
      }
    }),
      (a.prototype.bind = function() {
        this._ext.bindVertexArrayOES(this.handle);
        for (var r = 0; r < this._attribs.length; ++r)
          this._attribs[r].bind(this.gl);
      }),
      (a.prototype.unbind = function() {
        this._ext.bindVertexArrayOES(null);
      }),
      (a.prototype.dispose = function() {
        this._ext.deleteVertexArrayOES(this.handle);
      }),
      (a.prototype.update = function(r, t, e) {
        if (
          (this.bind(),
          n(this.gl, t, r),
          this.unbind(),
          (this._attribs.length = 0),
          r)
        )
          for (var a = 0; a < r.length; ++a) {
            var o = r[a];
            'number' == typeof o
              ? this._attribs.push(new i(a, 1, o))
              : Array.isArray(o) &&
                this._attribs.push(new i(a, o.length, o[0], o[1], o[2], o[3]));
          }
        (this._useElements = !!t),
          (this._elementsType = e || this.gl.UNSIGNED_SHORT);
      }),
      (a.prototype.draw = function(r, t, e) {
        e = e || 0;
        var n = this.gl;
        this._useElements
          ? n.drawElements(r, t, this._elementsType, e)
          : n.drawArrays(r, e, t);
      }),
      (r.exports = function(r, t) {
        return new a(r, t, t.createVertexArrayOES());
      });
  },
  function(r, t, e) {
    'use strict';
    var n = e(8);
    function i(r) {
      (this.gl = r),
        (this._elements = null),
        (this._attributes = null),
        (this._elementsType = r.UNSIGNED_SHORT);
    }
    (i.prototype.bind = function() {
      n(this.gl, this._elements, this._attributes);
    }),
      (i.prototype.update = function(r, t, e) {
        (this._elements = t),
          (this._attributes = r),
          (this._elementsType = e || this.gl.UNSIGNED_SHORT);
      }),
      (i.prototype.dispose = function() {}),
      (i.prototype.unbind = function() {}),
      (i.prototype.draw = function(r, t, e) {
        e = e || 0;
        var n = this.gl;
        this._elements
          ? n.drawElements(r, t, this._elementsType, e)
          : n.drawArrays(r, e, t);
      }),
      (r.exports = function(r) {
        return new i(r);
      });
  },
  function(r, t, e) {
    'use strict';
    var n = e(9),
      i = e(0);
    function a(r) {
      return new Function('y', 'return function(){return y}')(r);
    }
    function o(r, t) {
      for (var e = new Array(r), n = 0; n < r; ++n) e[n] = t;
      return e;
    }
    r.exports = function(r, t, e, s) {
      function u(r, t, e) {
        switch (e) {
          case 'bool':
          case 'int':
          case 'sampler2D':
          case 'samplerCube':
            return 'gl.uniform1i(locations[' + t + '],obj' + r + ')';
          case 'float':
            return 'gl.uniform1f(locations[' + t + '],obj' + r + ')';
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
                  t +
                  '],false,obj' +
                  r +
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
                  'gl.uniform' + a + 'iv(locations[' + t + '],obj' + r + ')'
                );
              case 'v':
                return (
                  'gl.uniform' + a + 'fv(locations[' + t + '],obj' + r + ')'
                );
              default:
                throw new i(
                  '',
                  'Unrecognized data type for vector ' + name + ': ' + e
                );
            }
        }
      }
      function f(t) {
        for (
          var n = ['return function updateProperty(obj){'],
            i = (function r(t, e) {
              if ('object' != typeof e) return [[t, e]];
              var n = [];
              for (var i in e) {
                var a = e[i],
                  o = t;
                parseInt(i) + '' === i ? (o += '[' + i + ']') : (o += '.' + i),
                  'object' == typeof a
                    ? n.push.apply(n, r(o, a))
                    : n.push([o, a]);
              }
              return n;
            })('', t),
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
        return h(r, s);
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
                  )(r, t, s);
                })(l),
                set: f(l),
                enumerable: !0,
                configurable: !1
              })
            : (n[u] = (function(r) {
                switch (r) {
                  case 'bool':
                    return !1;
                  case 'int':
                  case 'sampler2D':
                  case 'samplerCube':
                  case 'float':
                    return 0;
                  default:
                    var t = r.indexOf('vec');
                    if (0 <= t && t <= 1 && r.length === 4 + t) {
                      var e = r.charCodeAt(r.length - 1) - 48;
                      if (e < 2 || e > 4) throw new i('', 'Invalid data type');
                      return 'b' === r.charAt(0) ? o(e, !1) : o(e, 0);
                    }
                    if (0 === r.indexOf('mat') && 4 === r.length) {
                      var e = r.charCodeAt(r.length - 1) - 48;
                      if (e < 2 || e > 4)
                        throw new i(
                          '',
                          'Invalid uniform dimension type for matrix ' +
                            name +
                            ': ' +
                            r
                        );
                      return o(e * e, 0);
                    }
                    throw new i(
                      '',
                      'Unknown uniform data type for ' + name + ': ' + r
                    );
                }
              })(e[l].type));
      }
      function h(r) {
        var t;
        if (Array.isArray(r)) {
          t = new Array(r.length);
          for (var e = 0; e < r.length; ++e) l(t, e, r[e]);
        } else for (var n in ((t = {}), r)) l(t, n, r[n]);
        return t;
      }
      var c = n(e, !0);
      return { get: a(h(c)), set: f(c), enumerable: !0, configurable: !0 };
    };
  },
  function(r, t, e) {
    'use strict';
    r.exports = function(r, t, e, i) {
      for (var a = {}, u = 0, f = e.length; u < f; ++u) {
        var l = e[u],
          h = l.name,
          c = l.type,
          p = l.locations;
        switch (c) {
          case 'bool':
          case 'int':
          case 'float':
            o(r, t, p[0], i, 1, a, h);
            break;
          default:
            if (c.indexOf('vec') >= 0) {
              var _ = c.charCodeAt(c.length - 1) - 48;
              if (_ < 2 || _ > 4)
                throw new n(
                  '',
                  'Invalid data type for attribute ' + h + ': ' + c
                );
              o(r, t, p[0], i, _, a, h);
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
              s(r, t, p, i, _, a, h);
            }
        }
      }
      return a;
    };
    var n = e(0);
    function i(r, t, e, n, i, a) {
      (this._gl = r),
        (this._wrapper = t),
        (this._index = e),
        (this._locations = n),
        (this._dimension = i),
        (this._constFunc = a);
    }
    var a = i.prototype;
    function o(r, t, e, n, a, o, s) {
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
        c = new i(r, t, e, n, a, h);
      Object.defineProperty(o, s, {
        set: function(t) {
          return r.disableVertexAttribArray(n[e]), h(r, n[e], t), t;
        },
        get: function() {
          return c;
        },
        enumerable: !0
      });
    }
    function s(r, t, e, n, i, a, s) {
      for (var u = new Array(i), f = new Array(i), l = 0; l < i; ++l)
        o(r, t, e[l], n, i, u, l), (f[l] = u[l]);
      Object.defineProperty(u, 'location', {
        set: function(r) {
          if (Array.isArray(r))
            for (var t = 0; t < i; ++t) f[t].location = r[t];
          else for (t = 0; t < i; ++t) f[t].location = r + t;
          return r;
        },
        get: function() {
          for (var r = new Array(i), t = 0; t < i; ++t) r[t] = n[e[t]];
          return r;
        },
        enumerable: !0
      }),
        (u.pointer = function(t, a, o, s) {
          (t = t || r.FLOAT), (a = !!a), (o = o || i * i), (s = s || 0);
          for (var u = 0; u < i; ++u) {
            var f = n[e[u]];
            r.vertexAttribPointer(f, i, t, a, o, s + u * i),
              r.enableVertexAttribArray(f);
          }
        });
      var h = new Array(i),
        c = r['vertexAttrib' + i + 'fv'];
      Object.defineProperty(a, s, {
        set: function(t) {
          for (var a = 0; a < i; ++a) {
            var o = n[e[a]];
            if ((r.disableVertexAttribArray(o), Array.isArray(t[0])))
              c.call(r, o, t[a]);
            else {
              for (var s = 0; s < i; ++s) h[s] = t[i * a + s];
              c.call(r, o, h);
            }
          }
          return t;
        },
        get: function() {
          return u;
        },
        enumerable: !0
      });
    }
    (a.pointer = function(r, t, e, n) {
      var i = this._gl,
        a = this._locations[this._index];
      i.vertexAttribPointer(
        a,
        this._dimension,
        r || i.FLOAT,
        !!t,
        e || 0,
        n || 0
      ),
        i.enableVertexAttribArray(a);
    }),
      (a.set = function(r, t, e, n) {
        return this._constFunc(this._locations[this._index], r, t, e, n);
      }),
      Object.defineProperty(a, 'location', {
        get: function() {
          return this._locations[this._index];
        },
        set: function(r) {
          return (
            r !== this._locations[this._index] &&
              ((this._locations[this._index] = 0 | r),
              (this._wrapper.program = null)),
            0 | r
          );
        }
      });
  },
  function(r, t, e) {
    'use strict';
    (t.shader = function(r, t, e) {
      return l(r).getShaderReference(t, e);
    }),
      (t.program = function(r, t, e, n, i) {
        return l(r).getProgram(t, e, n, i);
      });
    var n = e(0),
      i = e(38),
      a = new ('undefined' == typeof WeakMap ? e(52) : WeakMap)(),
      o = 0;
    function s(r, t, e, n, i, a, o) {
      (this.id = r),
        (this.src = t),
        (this.type = e),
        (this.shader = n),
        (this.count = a),
        (this.programs = []),
        (this.cache = o);
    }
    function u(r) {
      (this.gl = r), (this.shaders = [{}, {}]), (this.programs = {});
    }
    s.prototype.dispose = function() {
      if (0 == --this.count) {
        for (
          var r = this.cache, t = r.gl, e = this.programs, n = 0, i = e.length;
          n < i;
          ++n
        ) {
          var a = r.programs[e[n]];
          a && (delete r.programs[n], t.deleteProgram(a));
        }
        t.deleteShader(this.shader),
          delete r.shaders[(this.type === t.FRAGMENT_SHADER) | 0][this.src];
      }
    };
    var f = u.prototype;
    function l(r) {
      var t = a.get(r);
      return t || ((t = new u(r)), a.set(r, t)), t;
    }
    (f.getShaderReference = function(r, t) {
      var e = this.gl,
        a = this.shaders[(r === e.FRAGMENT_SHADER) | 0],
        u = a[t];
      if (u && e.isShader(u.shader)) u.count += 1;
      else {
        var f = (function(r, t, e) {
          var a = r.createShader(t);
          if (
            (r.shaderSource(a, e),
            r.compileShader(a),
            !r.getShaderParameter(a, r.COMPILE_STATUS))
          ) {
            var o = r.getShaderInfoLog(a);
            try {
              var s = i(o, e, t);
            } catch (r) {
              throw (console.warn('Failed to format compiler error: ' + r),
              new n(o, 'Error compiling shader:\n' + o));
            }
            throw new n(o, s.short, s.long);
          }
          return a;
        })(e, r, t);
        u = a[t] = new s(o++, t, r, f, [], 1, this);
      }
      return u;
    }),
      (f.getProgram = function(r, t, e, i) {
        var a = [r.id, t.id, e.join(':'), i.join(':')].join('@'),
          o = this.programs[a];
        return (
          (o && this.gl.isProgram(o)) ||
            ((this.programs[a] = o = (function(r, t, e, i, a) {
              var o = r.createProgram();
              r.attachShader(o, t), r.attachShader(o, e);
              for (var s = 0; s < i.length; ++s)
                r.bindAttribLocation(o, a[s], i[s]);
              if (
                (r.linkProgram(o), !r.getProgramParameter(o, r.LINK_STATUS))
              ) {
                var u = r.getProgramInfoLog(o);
                throw new n(u, 'Error linking program: ' + u);
              }
              return o;
            })(this.gl, r.shader, t.shader, e, i)),
            r.programs.push(a),
            t.programs.push(a)),
          o
        );
      });
  },
  function(r, t, e) {
    var n = e(39).sprintf,
      i = e(40),
      a = e(42),
      o = e(49);
    r.exports = function(r, t, e) {
      'use strict';
      var s = a(t) || 'of unknown name (see npm glsl-shader-name)',
        u = 'unknown type';
      void 0 !== e && (u = e === i.FRAGMENT_SHADER ? 'fragment' : 'vertex');
      for (
        var f = n('Error compiling %s shader %s:\n', u, s),
          l = n('%s%s', f, r),
          h = r.split('\n'),
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
      for (var E = o(t).split('\n'), p = 0; p < E.length; p++)
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
  function(r, t, e) {
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
      function a(r) {
        return (function(r, t) {
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
            _ = r.length,
            g = '';
          for (n = 0; n < _; n++)
            if ('string' == typeof r[n]) g += r[n];
            else if (Array.isArray(r[n])) {
              if ((s = r[n])[2])
                for (e = t[p], o = 0; o < s[2].length; o++) {
                  if (!e.hasOwnProperty(s[2][o]))
                    throw new Error(
                      a('[sprintf] property "%s" does not exist', s[2][o])
                    );
                  e = e[s[2][o]];
                }
              else e = s[1] ? t[s[1]] : t[p++];
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
          (function(r) {
            if (s[r]) return s[r];
            var t,
              e = r,
              n = [],
              a = 0;
            for (; e; ) {
              if (null !== (t = i.text.exec(e))) n.push(t[0]);
              else if (null !== (t = i.modulo.exec(e))) n.push('%');
              else {
                if (null === (t = i.placeholder.exec(e)))
                  throw new SyntaxError('[sprintf] unexpected placeholder');
                if (t[2]) {
                  a |= 1;
                  var o = [],
                    u = t[2],
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
                  t[2] = o;
                } else a |= 2;
                if (3 === a)
                  throw new Error(
                    '[sprintf] mixing positional and named placeholders is not (yet) supported'
                  );
                n.push(t);
              }
              e = e.substring(t[0].length);
            }
            return (s[r] = n);
          })(r),
          arguments
        );
      }
      function o(r, t) {
        return a.apply(null, [r].concat(t || []));
      }
      var s = Object.create(null);
      (t.sprintf = a),
        (t.vsprintf = o),
        'undefined' != typeof window &&
          ((window.sprintf = a),
          (window.vsprintf = o),
          void 0 ===
            (n = function() {
              return { sprintf: a, vsprintf: o };
            }.call(t, e, t, r)) || (r.exports = n));
    })();
  },
  function(r, t, e) {
    var n = e(41);
    r.exports = function(r) {
      return n[r];
    };
  },
  function(r, t) {
    r.exports = {
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
  function(r, t, e) {
    var n = e(43),
      i = e(48);
    r.exports = function(r) {
      for (var t = Array.isArray(r) ? r : n(r), e = 0; e < t.length; e++) {
        var a = t[e];
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
  function(r, t, e) {
    var n = e(44);
    r.exports = function(r, t) {
      var e = n(t),
        i = [];
      return (i = (i = i.concat(e(r))).concat(e(null)));
    };
  },
  function(r, t, e) {
    r.exports = function(r) {
      var t,
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
      '300 es' === (r = r || {}).version && ((L = s), (C = o));
      return function(r) {
        return (
          (x = []),
          null !== r
            ? (function(r) {
                var e;
                (R = 0), (m = (F += r).length);
                for (; (t = F[R]), R < m; ) {
                  switch (((e = R), I)) {
                    case l:
                      R = k();
                      break;
                    case h:
                    case c:
                      R = V();
                      break;
                    case p:
                      R = X();
                      break;
                    case _:
                      R = Y();
                      break;
                    case b:
                      R = H();
                      break;
                    case g:
                      R = W();
                      break;
                    case f:
                      R = z();
                      break;
                    case T:
                      R = j();
                      break;
                    case u:
                      R = B();
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
              })(r.replace ? r.replace(/\r\n/g, '\n') : r)
            : (function(r) {
                N.length && D(N.join(''));
                return (I = A), D('(eof)'), x;
              })()
        );
      };
      function D(r) {
        r.length &&
          x.push({ type: v[I], data: r, position: P, line: S, column: U });
      }
      function B() {
        return (
          (N = N.length ? [] : N),
          '/' === e && '*' === t
            ? ((P = w + R - 1), (I = l), (e = t), R + 1)
            : '/' === e && '/' === t
              ? ((P = w + R - 1), (I = h), (e = t), R + 1)
              : '#' === t
                ? ((I = c), (P = w + R), R)
                : /\s/.test(t)
                  ? ((I = T), (P = w + R), R)
                  : ((M = /\d/.test(t)),
                    (O = /[^\w_]/.test(t)),
                    (P = w + R),
                    (I = M ? _ : O ? p : f),
                    R)
        );
      }
      function j() {
        return /[^\s]/g.test(t)
          ? (D(N.join('')), (I = u), R)
          : (N.push(t), (e = t), R + 1);
      }
      function V() {
        return ('\r' !== t && '\n' !== t) || '\\' === e
          ? (N.push(t), (e = t), R + 1)
          : (D(N.join('')), (I = u), R);
      }
      function k() {
        return '/' === t && '*' === e
          ? (N.push(t), D(N.join('')), (I = u), R + 1)
          : (N.push(t), (e = t), R + 1);
      }
      function X() {
        if ('.' === e && /\d/.test(t)) return (I = g), R;
        if ('/' === e && '*' === t) return (I = l), R;
        if ('/' === e && '/' === t) return (I = h), R;
        if ('.' === t && N.length) {
          for (; G(N); );
          return (I = g), R;
        }
        if (';' === t || ')' === t || '(' === t) {
          if (N.length) for (; G(N); );
          return D(t), (I = u), R + 1;
        }
        var r = 2 === N.length && '=' !== t;
        if (/[\w_\d\s]/.test(t) || r) {
          for (; G(N); );
          return (I = u), R;
        }
        return N.push(t), (e = t), R + 1;
      }
      function G(r) {
        for (var t, e, n = 0; ; ) {
          if (
            ((t = i.indexOf(r.slice(0, r.length + n).join(''))),
            (e = i[t]),
            -1 === t)
          ) {
            if (n-- + r.length > 0) continue;
            e = r.slice(0, 1).join('');
          }
          return D(e), (P += e.length), (N = N.slice(e.length)).length;
        }
      }
      function H() {
        return /[^a-fA-F0-9]/.test(t)
          ? (D(N.join('')), (I = u), R)
          : (N.push(t), (e = t), R + 1);
      }
      function Y() {
        return '.' === t
          ? (N.push(t), (I = g), (e = t), R + 1)
          : /[eE]/.test(t)
            ? (N.push(t), (I = g), (e = t), R + 1)
            : 'x' === t && 1 === N.length && '0' === N[0]
              ? ((I = b), N.push(t), (e = t), R + 1)
              : /[^\d]/.test(t)
                ? (D(N.join('')), (I = u), R)
                : (N.push(t), (e = t), R + 1);
      }
      function W() {
        return (
          'f' === t && (N.push(t), (e = t), (R += 1)),
          /[eE]/.test(t)
            ? (N.push(t), (e = t), R + 1)
            : '-' === t && /[eE]/.test(e)
              ? (N.push(t), (e = t), R + 1)
              : /[^\d]/.test(t)
                ? (D(N.join('')), (I = u), R)
                : (N.push(t), (e = t), R + 1)
        );
      }
      function z() {
        if (/[^\d\w_]/.test(t)) {
          var r = N.join('');
          return (
            (I = C.indexOf(r) > -1 ? y : L.indexOf(r) > -1 ? d : E),
            D(N.join('')),
            (I = u),
            R
          );
        }
        return N.push(t), (e = t), R + 1;
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
  function(r, t) {
    r.exports = [
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
  function(r, t, e) {
    var n = e(10);
    r.exports = n
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
        'uint',
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
  function(r, t, e) {
    var n = e(11);
    (n = n.slice().filter(function(r) {
      return !/^(gl\_|texture)/.test(r);
    })),
      (r.exports = n.concat([
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
  function(r, t) {
    r.exports = function(r) {
      return atob(r);
    };
  },
  function(r, t, e) {
    var n = e(50);
    r.exports = function(r, t, e) {
      (t = 'number' == typeof t ? t : 1), (e = e || ': ');
      var i = r.split(/\r?\n/),
        a = String(i.length + t - 1).length;
      return i
        .map(function(r, i) {
          var o = i + t,
            s = String(o).length,
            u = n(o, a - s);
          return u + e + r;
        })
        .join('\n');
    };
  },
  function(r, t, e) {
    'use strict';
    /*!
 * pad-left <https://github.com/jonschlinkert/pad-left>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */ var n = e(
      51
    );
    r.exports = function(r, t, e) {
      return n((e = void 0 !== e ? e + '' : ' '), t) + r;
    };
  },
  function(r, t, e) {
    'use strict';
    /*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */ var n,
      i = '';
    r.exports = function(r, t) {
      if ('string' != typeof r) throw new TypeError('expected a string');
      if (1 === t) return r;
      if (2 === t) return r + r;
      var e = r.length * t;
      if (n !== r || void 0 === n) (n = r), (i = '');
      else if (i.length >= e) return i.substr(0, e);
      for (; e > i.length && t > 1; ) 1 & t && (i += r), (t >>= 1), (r += r);
      return (i = (i += r).substr(0, e));
    };
  },
  function(r, t, e) {
    var n = e(53);
    r.exports = function() {
      var r = n();
      return {
        get: function(t, e) {
          var n = r(t);
          return n.hasOwnProperty('value') ? n.value : e;
        },
        set: function(t, e) {
          return (r(t).value = e), this;
        },
        has: function(t) {
          return 'value' in r(t);
        },
        delete: function(t) {
          return delete r(t).value;
        }
      };
    };
  },
  function(r, t, e) {
    var n = e(54);
    r.exports = function() {
      var r = {};
      return function(t) {
        if (('object' != typeof t || null === t) && 'function' != typeof t)
          throw new Error('Weakmap-shim: Key must be object');
        var e = t.valueOf(r);
        return e && e.identity === r ? e : n(t, r);
      };
    };
  },
  function(r, t) {
    r.exports = function(r, t) {
      var e = { identity: t },
        n = r.valueOf;
      return (
        Object.defineProperty(r, 'valueOf', {
          value: function(r) {
            return r !== t ? n.apply(this, arguments) : e;
          },
          writable: !0
        }),
        e
      );
    };
  },
  function(r, t, e) {
    'use strict';
    (t.uniforms = function(r, t) {
      for (
        var e = r.getProgramParameter(t, r.ACTIVE_UNIFORMS), n = [], i = 0;
        i < e;
        ++i
      ) {
        var o = r.getActiveUniform(t, i);
        if (o) {
          var s = a(r, o.type);
          if (o.size > 1)
            for (var u = 0; u < o.size; ++u)
              n.push({ name: o.name.replace('[0]', '[' + u + ']'), type: s });
          else n.push({ name: o.name, type: s });
        }
      }
      return n;
    }),
      (t.attributes = function(r, t) {
        for (
          var e = r.getProgramParameter(t, r.ACTIVE_ATTRIBUTES), n = [], i = 0;
          i < e;
          ++i
        ) {
          var o = r.getActiveAttrib(t, i);
          o && n.push({ name: o.name, type: a(r, o.type) });
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
    function a(r, t) {
      if (!i) {
        var e = Object.keys(n);
        i = {};
        for (var a = 0; a < e.length; ++a) {
          var o = e[a];
          i[r[o]] = n[o];
        }
      }
      return i[t];
    }
  },
  function(r, t) {
    r.exports = function(r, t) {
      if ('string' != typeof r) throw new TypeError('must specify type string');
      if (((t = t || {}), 'undefined' == typeof document && !t.canvas))
        return null;
      var e = t.canvas || document.createElement('canvas');
      'number' == typeof t.width && (e.width = t.width);
      'number' == typeof t.height && (e.height = t.height);
      var n,
        i = t;
      try {
        var a = [r];
        0 === r.indexOf('webgl') && a.push('experimental-' + r);
        for (var o = 0; o < a.length; o++)
          if ((n = e.getContext(a[o], i))) return n;
      } catch (r) {
        n = null;
      }
      return n || null;
    };
  }
]);
