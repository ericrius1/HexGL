// Three.js - http://github.com/mrdoob/three.js
'use strict';
var THREE = THREE ||
{
   REVISION: "50dev"
};
self.console || (self.console = {
   info: function () {},
   log: function () {},
   debug: function () {},
   warn: function () {},
   error: function () {}
});
self.Int32Array || (self.Int32Array = Array, self.Float32Array = Array);
(function ()
{
   for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !
      window.requestAnimationFrame; ++c)
   {
      window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] ||
         window[b[c] + "CancelRequestAnimationFrame"]
   }
   if (!window.requestAnimationFrame) window.requestAnimationFrame =
      function (b)
      {
         var c = Date.now(),
            f = Math.max(0, 16 - (c - a)),
            g = window.setTimeout(function ()
            {
               b(c + f)
            }, f);
         a = c + f;
         return g
   };
   if (!window.cancelAnimationFrame) window.cancelAnimationFrame =
      function (a)
      {
         clearTimeout(a)
   }
})();
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.UVMapping = function () {};
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.RepeatWrapping = 1E3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.Clock = function (a)
{
   this.autoStart = a !== void 0 ? a : true;
   this.elapsedTime = this.oldTime = this.startTime = 0;
   this.running = false
};
THREE.Clock.prototype.start = function ()
{
   this.oldTime = this.startTime = Date.now();
   this.running = true
};
THREE.Clock.prototype.stop = function ()
{
   this.getElapsedTime();
   this.running = false
};
THREE.Clock.prototype.getElapsedTime = function ()
{
   return this.elapsedTime = this.elapsedTime + this.getDelta()
};
THREE.Clock.prototype.getDelta = function ()
{
   var a = 0;
   this.autoStart && !this.running && this.start();
   if (this.running)
   {
      var b = Date.now(),
         a = 0.0010 * (b - this.oldTime);
      this.oldTime = b;
      this.elapsedTime = this.elapsedTime + a
   }
   return a
};
THREE.Color = function (a)
{
   a !== void 0 && this.setHex(a);
   return this
};
THREE.Color.prototype = {
   constructor: THREE.Color,
   r: 1,
   g: 1,
   b: 1,
   copy: function (a)
   {
      this.r = a.r;
      this.g = a.g;
      this.b = a.b;
      return this
   },
   copyGammaToLinear: function (a)
   {
      this.r = a.r * a.r;
      this.g = a.g * a.g;
      this.b = a.b * a.b;
      return this
   },
   copyLinearToGamma: function (a)
   {
      this.r = Math.sqrt(a.r);
      this.g = Math.sqrt(a.g);
      this.b = Math.sqrt(a.b);
      return this
   },
   convertGammaToLinear: function ()
   {
      var a = this.r,
         b = this.g,
         c = this.b;
      this.r = a * a;
      this.g = b * b;
      this.b = c * c;
      return this
   },
   convertLinearToGamma: function ()
   {
      this.r = Math.sqrt(this.r);
      this.g = Math.sqrt(this.g);
      this.b = Math.sqrt(this.b);
      return this
   },
   setRGB: function (a, b, c)
   {
      this.r = a;
      this.g = b;
      this.b = c;
      return this
   },
   setHSV: function (a, b, c)
   {
      var d, e, f;
      if (c === 0) this.r = this.g = this.b = 0;
      else
      {
         d = Math.floor(a * 6);
         e = a * 6 - d;
         a = c * (1 - b);
         f = c * (1 - b * e);
         b = c * (1 - b * (1 - e));
         if (d === 0)
         {
            this.r = c;
            this.g = b;
            this.b = a
         }
         else if (d === 1)
         {
            this.r = f;
            this.g = c;
            this.b = a
         }
         else if (d === 2)
         {
            this.r = a;
            this.g = c;
            this.b = b
         }
         else if (d === 3)
         {
            this.r = a;
            this.g = f;
            this.b = c
         }
         else if (d === 4)
         {
            this.r = b;
            this.g = a;
            this.b = c
         }
         else if (d === 5)
         {
            this.r = c;
            this.g = a;
            this.b = f
         }
      }
      return this
   },
   setHex: function (a)
   {
      a =
         Math.floor(a);
      this.r = (a >> 16 & 255) / 255;
      this.g = (a >> 8 & 255) / 255;
      this.b = (a & 255) / 255;
      return this
   },
   lerpSelf: function (a, b)
   {
      this.r = this.r + (a.r - this.r) * b;
      this.g = this.g + (a.g - this.g) * b;
      this.b = this.b + (a.b - this.b) * b;
      return this
   },
   getHex: function ()
   {
      return Math.floor(this.r * 255) << 16 ^ Math.floor(this.g * 255) << 8 ^
         Math.floor(this.b * 255)
   },
   getContextStyle: function ()
   {
      return "rgb(" + Math.floor(this.r * 255) + "," + Math.floor(this.g * 255) +
         "," + Math.floor(this.b * 255) + ")"
   },
   clone: function ()
   {
      return (new THREE.Color).setRGB(this.r, this.g, this.b)
   }
};
THREE.Vector2 = function (a, b)
{
   this.x = a || 0;
   this.y = b || 0
};
THREE.Vector2.prototype = {
   constructor: THREE.Vector2,
   set: function (a, b)
   {
      this.x = a;
      this.y = b;
      return this
   },
   copy: function (a)
   {
      this.x = a.x;
      this.y = a.y;
      return this
   },
   add: function (a, b)
   {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this
   },
   addSelf: function (a)
   {
      this.x = this.x + a.x;
      this.y = this.y + a.y;
      return this
   },
   sub: function (a, b)
   {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this
   },
   subSelf: function (a)
   {
      this.x = this.x - a.x;
      this.y = this.y - a.y;
      return this
   },
   multiplyScalar: function (a)
   {
      this.x = this.x * a;
      this.y = this.y * a;
      return this
   },
   divideScalar: function (a)
   {
      if (a)
      {
         this.x =
            this.x / a;
         this.y = this.y / a
      }
      else this.set(0, 0);
      return this
   },
   negate: function ()
   {
      return this.multiplyScalar(-1)
   },
   dot: function (a)
   {
      return this.x * a.x + this.y * a.y
   },
   lengthSq: function ()
   {
      return this.x * this.x + this.y * this.y
   },
   length: function ()
   {
      return Math.sqrt(this.lengthSq())
   },
   normalize: function ()
   {
      return this.divideScalar(this.length())
   },
   distanceTo: function (a)
   {
      return Math.sqrt(this.distanceToSquared(a))
   },
   distanceToSquared: function (a)
   {
      var b = this.x - a.x,
         a = this.y - a.y;
      return b * b + a * a
   },
   setLength: function (a)
   {
      return this.normalize().multiplyScalar(a)
   },
   lerpSelf: function (a, b)
   {
      this.x = this.x + (a.x - this.x) * b;
      this.y = this.y + (a.y - this.y) * b;
      return this
   },
   equals: function (a)
   {
      return a.x === this.x && a.y === this.y
   },
   isZero: function ()
   {
      return this.lengthSq() < 1.0E-4
   },
   clone: function ()
   {
      return new THREE.Vector2(this.x, this.y)
   }
};
THREE.Vector3 = function (a, b, c)
{
   this.x = a || 0;
   this.y = b || 0;
   this.z = c || 0
};
THREE.Vector3.prototype = {
   constructor: THREE.Vector3,
   set: function (a, b, c)
   {
      this.x = a;
      this.y = b;
      this.z = c;
      return this
   },
   setX: function (a)
   {
      this.x = a;
      return this
   },
   setY: function (a)
   {
      this.y = a;
      return this
   },
   setZ: function (a)
   {
      this.z = a;
      return this
   },
   copy: function (a)
   {
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
      return this
   },
   add: function (a, b)
   {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this
   },
   addSelf: function (a)
   {
      this.x = this.x + a.x;
      this.y = this.y + a.y;
      this.z = this.z + a.z;
      return this
   },
   addScalar: function (a)
   {
      this.x = this.x + a;
      this.y = this.y +
         a;
      this.z = this.z + a;
      return this
   },
   sub: function (a, b)
   {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this
   },
   subSelf: function (a)
   {
      this.x = this.x - a.x;
      this.y = this.y - a.y;
      this.z = this.z - a.z;
      return this
   },
   multiply: function (a, b)
   {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this
   },
   multiplySelf: function (a)
   {
      this.x = this.x * a.x;
      this.y = this.y * a.y;
      this.z = this.z * a.z;
      return this
   },
   multiplyScalar: function (a)
   {
      this.x = this.x * a;
      this.y = this.y * a;
      this.z = this.z * a;
      return this
   },
   divideSelf: function (a)
   {
      this.x = this.x / a.x;
      this.y =
         this.y / a.y;
      this.z = this.z / a.z;
      return this
   },
   divideScalar: function (a)
   {
      if (a)
      {
         this.x = this.x / a;
         this.y = this.y / a;
         this.z = this.z / a
      }
      else this.z = this.y = this.x = 0;
      return this
   },
   negate: function ()
   {
      return this.multiplyScalar(-1)
   },
   dot: function (a)
   {
      return this.x * a.x + this.y * a.y + this.z * a.z
   },
   lengthSq: function ()
   {
      return this.x * this.x + this.y * this.y + this.z * this.z
   },
   length: function ()
   {
      return Math.sqrt(this.lengthSq())
   },
   lengthManhattan: function ()
   {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
   },
   normalize: function ()
   {
      return this.divideScalar(this.length())
   },
   setLength: function (a)
   {
      return this.normalize().multiplyScalar(a)
   },
   lerpSelf: function (a, b)
   {
      this.x = this.x + (a.x - this.x) * b;
      this.y = this.y + (a.y - this.y) * b;
      this.z = this.z + (a.z - this.z) * b;
      return this
   },
   cross: function (a, b)
   {
      this.x = a.y * b.z - a.z * b.y;
      this.y = a.z * b.x - a.x * b.z;
      this.z = a.x * b.y - a.y * b.x;
      return this
   },
   crossSelf: function (a)
   {
      var b = this.x,
         c = this.y,
         d = this.z;
      this.x = c * a.z - d * a.y;
      this.y = d * a.x - b * a.z;
      this.z = b * a.y - c * a.x;
      return this
   },
   distanceTo: function (a)
   {
      return Math.sqrt(this.distanceToSquared(a))
   },
   distanceToSquared: function (a)
   {
      return (new THREE.Vector3).sub(this,
         a).lengthSq()
   },
   getPositionFromMatrix: function (a)
   {
      this.x = a.elements[12];
      this.y = a.elements[13];
      this.z = a.elements[14];
      return this
   },
   setEulerFromRotationMatrix: function (a, b)
   {
      function c(a)
      {
         return Math.min(Math.max(a, -1), 1)
      }
      var d = a.elements,
         e = d[0],
         f = d[4],
         g = d[8],
         h = d[1],
         i = d[5],
         j = d[9],
         l = d[2],
         m = d[6],
         d = d[10];
      if (b === void 0 || b === "XYZ")
      {
         this.y = Math.asin(c(g));
         if (Math.abs(g) < 0.99999)
         {
            this.x = Math.atan2(-j, d);
            this.z = Math.atan2(-f, e)
         }
         else
         {
            this.x = Math.atan2(h, i);
            this.z = 0
         }
      }
      else if (b === "YXZ")
      {
         this.x = Math.asin(-c(j));
         if (Math.abs(j) <
            0.99999)
         {
            this.y = Math.atan2(g, d);
            this.z = Math.atan2(h, i)
         }
         else
         {
            this.y = Math.atan2(-l, e);
            this.z = 0
         }
      }
      else if (b === "ZXY")
      {
         this.x = Math.asin(c(m));
         if (Math.abs(m) < 0.99999)
         {
            this.y = Math.atan2(-l, d);
            this.z = Math.atan2(-f, i)
         }
         else
         {
            this.y = 0;
            this.z = Math.atan2(g, e)
         }
      }
      else if (b === "ZYX")
      {
         this.y = Math.asin(-c(l));
         if (Math.abs(l) < 0.99999)
         {
            this.x = Math.atan2(m, d);
            this.z = Math.atan2(h, e)
         }
         else
         {
            this.x = 0;
            this.z = Math.atan2(-f, i)
         }
      }
      else if (b === "YZX")
      {
         this.z = Math.asin(c(h));
         if (Math.abs(h) < 0.99999)
         {
            this.x = Math.atan2(-j, i);
            this.y = Math.atan2(-l,
               e)
         }
         else
         {
            this.x = 0;
            this.y = Math.atan2(l, d)
         }
      }
      else if (b === "XZY")
      {
         this.z = Math.asin(-c(f));
         if (Math.abs(f) < 0.99999)
         {
            this.x = Math.atan2(m, i);
            this.y = Math.atan2(g, e)
         }
         else
         {
            this.x = Math.atan2(-g, d);
            this.y = 0
         }
      }
      return this
   },
   setEulerFromQuaternion: function (a, b)
   {
      function c(a)
      {
         return Math.min(Math.max(a, -1), 1)
      }
      var d = a.x * a.x,
         e = a.y * a.y,
         f = a.z * a.z,
         g = a.w * a.w;
      if (b === void 0 || b === "XYZ")
      {
         this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f);
         this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w)));
         this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)
      }
      else if (b ===
         "YXZ")
      {
         this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z)));
         this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f);
         this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)
      }
      else if (b === "ZXY")
      {
         this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z)));
         this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f);
         this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)
      }
      else if (b === "ZYX")
      {
         this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f);
         this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z)));
         this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)
      }
      else if (b === "YZX")
      {
         this.x = Math.atan2(2 * (a.x * a.w - a.z *
            a.y), g - d + e - f);
         this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f);
         this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))
      }
      else if (b === "XZY")
      {
         this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f);
         this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f);
         this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y)))
      }
      return this
   },
   getScaleFromMatrix: function (a)
   {
      var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
         c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
         a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
      this.x =
         b;
      this.y = c;
      this.z = a;
      return this
   },
   equals: function (a)
   {
      return a.x === this.x && a.y === this.y && a.z === this.z
   },
   isZero: function ()
   {
      return this.lengthSq() < 1.0E-4
   },
   clone: function ()
   {
      return new THREE.Vector3(this.x, this.y, this.z)
   }
};
THREE.Vector4 = function (a, b, c, d)
{
   this.x = a || 0;
   this.y = b || 0;
   this.z = c || 0;
   this.w = d !== void 0 ? d : 1
};
THREE.Vector4.prototype = {
   constructor: THREE.Vector4,
   set: function (a, b, c, d)
   {
      this.x = a;
      this.y = b;
      this.z = c;
      this.w = d;
      return this
   },
   copy: function (a)
   {
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
      this.w = a.w !== void 0 ? a.w : 1;
      return this
   },
   add: function (a, b)
   {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      this.w = a.w + b.w;
      return this
   },
   addSelf: function (a)
   {
      this.x = this.x + a.x;
      this.y = this.y + a.y;
      this.z = this.z + a.z;
      this.w = this.w + a.w;
      return this
   },
   sub: function (a, b)
   {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      this.w = a.w - b.w;
      return this
   },
   subSelf: function (a)
   {
      this.x =
         this.x - a.x;
      this.y = this.y - a.y;
      this.z = this.z - a.z;
      this.w = this.w - a.w;
      return this
   },
   multiplyScalar: function (a)
   {
      this.x = this.x * a;
      this.y = this.y * a;
      this.z = this.z * a;
      this.w = this.w * a;
      return this
   },
   divideScalar: function (a)
   {
      if (a)
      {
         this.x = this.x / a;
         this.y = this.y / a;
         this.z = this.z / a;
         this.w = this.w / a
      }
      else
      {
         this.z = this.y = this.x = 0;
         this.w = 1
      }
      return this
   },
   negate: function ()
   {
      return this.multiplyScalar(-1)
   },
   dot: function (a)
   {
      return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
   },
   lengthSq: function ()
   {
      return this.dot(this)
   },
   length: function ()
   {
      return Math.sqrt(this.lengthSq())
   },
   normalize: function ()
   {
      return this.divideScalar(this.length())
   },
   setLength: function (a)
   {
      return this.normalize().multiplyScalar(a)
   },
   lerpSelf: function (a, b)
   {
      this.x = this.x + (a.x - this.x) * b;
      this.y = this.y + (a.y - this.y) * b;
      this.z = this.z + (a.z - this.z) * b;
      this.w = this.w + (a.w - this.w) * b;
      return this
   },
   clone: function ()
   {
      return new THREE.Vector4(this.x, this.y, this.z, this.w)
   },
   setAxisAngleFromQuaternion: function (a)
   {
      this.w = 2 * Math.acos(a.w);
      var b = Math.sqrt(1 - a.w * a.w);
      if (b < 1.0E-4)
      {
         this.x = 1;
         this.z = this.y = 0
      }
      else
      {
         this.x = a.x / b;
         this.y =
            a.y / b;
         this.z = a.z / b
      }
      return this
   },
   setAxisAngleFromRotationMatrix: function (a)
   {
      var b, c, d, a = a.elements,
         e = a[0];
      d = a[4];
      var f = a[8],
         g = a[1],
         h = a[5],
         i = a[9];
      c = a[2];
      b = a[6];
      var j = a[10];
      if (Math.abs(d - g) < 0.01 && Math.abs(f - c) < 0.01 && Math.abs(i - b) <
         0.01)
      {
         if (Math.abs(d + g) < 0.1 && Math.abs(f + c) < 0.1 && Math.abs(i + b) <
            0.1 && Math.abs(e + h + j - 3) < 0.1)
         {
            this.set(1, 0, 0, 0);
            return this
         }
         a = Math.PI;
         e = (e + 1) / 2;
         h = (h + 1) / 2;
         j = (j + 1) / 2;
         d = (d + g) / 4;
         f = (f + c) / 4;
         i = (i + b) / 4;
         if (e > h && e > j)
            if (e < 0.01)
            {
               b = 0;
               d = c = 0.707106781
            }
            else
            {
               b = Math.sqrt(e);
               c = d / b;
               d = f / b
            }
            else if (h >
            j)
            if (h < 0.01)
            {
               b = 0.707106781;
               c = 0;
               d = 0.707106781
            }
            else
            {
               c = Math.sqrt(h);
               b = d / c;
               d = i / c
            }
            else if (j < 0.01)
         {
            c = b = 0.707106781;
            d = 0
         }
         else
         {
            d = Math.sqrt(j);
            b = f / d;
            c = i / d
         }
         this.set(b, c, d, a);
         return this
      }
      a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (g - d) * (g - d));
      Math.abs(a) < 0.0010 && (a = 1);
      this.x = (b - i) / a;
      this.y = (f - c) / a;
      this.z = (g - d) / a;
      this.w = Math.acos((e + h + j - 1) / 2);
      return this
   }
};
THREE.EventTarget = function ()
{
   var a = {};
   this.addEventListener = function (b, c)
   {
      a[b] === void 0 && (a[b] = []);
      a[b].indexOf(c) === -1 && a[b].push(c)
   };
   this.dispatchEvent = function (b)
   {
      for (var c in a[b.type]) a[b.type][c](b)
   };
   this.removeEventListener = function (b, c)
   {
      var d = a[b].indexOf(c);
      d !== -1 && a[b].splice(d, 1)
   }
};
THREE.Frustum = function ()
{
   this.planes = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE
      .Vector4, new THREE.Vector4, new THREE.Vector4
   ]
};
THREE.Frustum.prototype.setFromMatrix = function (a)
{
   var b = this.planes,
      c = a.elements,
      a = c[0],
      d = c[1],
      e = c[2],
      f = c[3],
      g = c[4],
      h = c[5],
      i = c[6],
      j = c[7],
      l = c[8],
      m = c[9],
      n = c[10],
      p = c[11],
      r = c[12],
      o = c[13],
      q = c[14],
      c = c[15];
   b[0].set(f - a, j - g, p - l, c - r);
   b[1].set(f + a, j + g, p + l, c + r);
   b[2].set(f + d, j + h, p + m, c + o);
   b[3].set(f - d, j - h, p - m, c - o);
   b[4].set(f - e, j - i, p - n, c - q);
   b[5].set(f + e, j + i, p + n, c + q);
   for (d = 0; d < 6; d++)
   {
      a = b[d];
      a.divideScalar(Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z))
   }
};
THREE.Frustum.prototype.contains = function (a)
{
   for (var b = 0, c = this.planes, b = a.matrixWorld, d = b.elements, a = -a.geometry
         .boundingSphere.radius * b.getMaxScaleOnAxis(), e = 0; e < 6; e++)
   {
      b = c[e].x * d[12] + c[e].y * d[13] + c[e].z * d[14] + c[e].w;
      if (b <= a) return false
   }
   return true
};
THREE.Frustum.__v1 = new THREE.Vector3;
THREE.Ray = function (a, b, c, d)
{
   this.origin = a || new THREE.Vector3;
   this.direction = b || new THREE.Vector3;
   this.near = c || 0;
   this.far = d || Infinity;
   var e = new THREE.Vector3,
      f = new THREE.Vector3,
      g = new THREE.Vector3,
      h = new THREE.Vector3,
      i = new THREE.Vector3,
      j = new THREE.Vector3,
      l = new THREE.Vector3,
      m = new THREE.Vector3,
      n = new THREE.Vector3,
      p = function (a, b)
      {
         return a.distance - b.distance
      }, r = new THREE.Vector3,
      o = new THREE.Vector3,
      q = new THREE.Vector3,
      s, w, t, v = function (a, b, c)
      {
         r.sub(c, a);
         s = r.dot(b);
         w = o.add(a, q.copy(b).multiplyScalar(s));
         return t = c.distanceTo(w)
      }, x, C, D, z, u, G, J, M, O = function (a, b, c, d)
      {
         r.sub(d, b);
         o.sub(c, b);
         q.sub(a, b);
         x = r.dot(r);
         C = r.dot(o);
         D = r.dot(q);
         z = o.dot(o);
         u = o.dot(q);
         G = 1 / (x * z - C * C);
         J = (z * D - C * u) * G;
         M = (x * u - C * D) * G;
         return J >= 0 && M >= 0 && J + M < 1
      }, X = 1.0E-4;
   this.setPrecision = function (a)
   {
      X = a
   };
   this.intersectObject = function (a, b)
   {
      var c, d = [];
      if (b === true)
         for (var o = 0, r = a.children.length; o < r; o++) Array.prototype.push
            .apply(d, this.intersectObject(a.children[o], b));
      if (a instanceof THREE.Particle)
      {
         t = v(this.origin, this.direction, a.matrixWorld.getPosition());
         if (t > a.scale.x) return [];
         c = {
            distance: t,
            point: a.position,
            face: null,
            object: a
         };
         d.push(c)
      }
      else if (a instanceof THREE.Mesh)
      {
         o = THREE.Frustum.__v1.set(a.matrixWorld.getColumnX().length(), a.matrixWorld
            .getColumnY().length(), a.matrixWorld.getColumnZ().length());
         o = a.geometry.boundingSphere.radius * Math.max(o.x, Math.max(o.y, o.z));
         t = v(this.origin, this.direction, a.matrixWorld.getPosition());
         if (t > o) return d;
         var q, s, u = a.geometry,
            w = u.vertices,
            x;
         a.matrixRotationWorld.extractRotation(a.matrixWorld);
         o = 0;
         for (r = u.faces.length; o <
            r; o++)
         {
            c = u.faces[o];
            i.copy(this.origin);
            j.copy(this.direction);
            x = a.matrixWorld;
            l = x.multiplyVector3(l.copy(c.centroid)).subSelf(i);
            m = a.matrixRotationWorld.multiplyVector3(m.copy(c.normal));
            q = j.dot(m);
            if (!(Math.abs(q) < X))
            {
               s = m.dot(l) / q;
               if (!(s < 0) && (a.doubleSided || (a.flipSided ? q > 0 : q < 0)))
               {
                  n.add(i, j.multiplyScalar(s));
                  t = i.distanceTo(n);
                  if (!(t < this.near) && !(t > this.far))
                     if (c instanceof THREE.Face3)
                     {
                        e = x.multiplyVector3(e.copy(w[c.a]));
                        f = x.multiplyVector3(f.copy(w[c.b]));
                        g = x.multiplyVector3(g.copy(w[c.c]));
                        if (O(n, e, f, g))
                        {
                           c = {
                              distance: t,
                              point: n.clone(),
                              face: c,
                              object: a
                           };
                           d.push(c)
                        }
                     }
                     else if (c instanceof THREE.Face4)
                  {
                     e = x.multiplyVector3(e.copy(w[c.a]));
                     f = x.multiplyVector3(f.copy(w[c.b]));
                     g = x.multiplyVector3(g.copy(w[c.c]));
                     h = x.multiplyVector3(h.copy(w[c.d]));
                     if (O(n, e, f, h) || O(n, f, g, h))
                     {
                        c = {
                           distance: t,
                           point: n.clone(),
                           face: c,
                           object: a
                        };
                        d.push(c)
                     }
                  }
               }
            }
         }
      }
      d.sort(p);
      return d
   };
   this.intersectObjects = function (a, b)
   {
      for (var c = [], d = 0, e = a.length; d < e; d++) Array.prototype.push.apply(
         c, this.intersectObject(a[d], b));
      c.sort(p);
      return c
   }
};
THREE.Rectangle = function ()
{
   function a()
   {
      f = d - b;
      g = e - c
   }
   var b = 0,
      c = 0,
      d = 0,
      e = 0,
      f = 0,
      g = 0,
      h = true;
   this.getX = function ()
   {
      return b
   };
   this.getY = function ()
   {
      return c
   };
   this.getWidth = function ()
   {
      return f
   };
   this.getHeight = function ()
   {
      return g
   };
   this.getLeft = function ()
   {
      return b
   };
   this.getTop = function ()
   {
      return c
   };
   this.getRight = function ()
   {
      return d
   };
   this.getBottom = function ()
   {
      return e
   };
   this.set = function (f, g, l, m)
   {
      h = false;
      b = f;
      c = g;
      d = l;
      e = m;
      a()
   };
   this.addPoint = function (f, g)
   {
      if (h === true)
      {
         h = false;
         b = f;
         c = g;
         d = f;
         e = g
      }
      else
      {
         b = b < f ? b : f;
         c = c < g ? c :
            g;
         d = d > f ? d : f;
         e = e > g ? e : g
      }
      a()
   };
   this.add3Points = function (f, g, l, m, n, p)
   {
      if (h === true)
      {
         h = false;
         b = f < l ? f < n ? f : n : l < n ? l : n;
         c = g < m ? g < p ? g : p : m < p ? m : p;
         d = f > l ? f > n ? f : n : l > n ? l : n;
         e = g > m ? g > p ? g : p : m > p ? m : p
      }
      else
      {
         b = f < l ? f < n ? f < b ? f : b : n < b ? n : b : l < n ? l < b ? l :
            b : n < b ? n : b;
         c = g < m ? g < p ? g < c ? g : c : p < c ? p : c : m < p ? m < c ? m :
            c : p < c ? p : c;
         d = f > l ? f > n ? f > d ? f : d : n > d ? n : d : l > n ? l > d ? l :
            d : n > d ? n : d;
         e = g > m ? g > p ? g > e ? g : e : p > e ? p : e : m > p ? m > e ? m :
            e : p > e ? p : e
      }
      a()
   };
   this.addRectangle = function (f)
   {
      if (h === true)
      {
         h = false;
         b = f.getLeft();
         c = f.getTop();
         d = f.getRight();
         e = f.getBottom()
      }
      else
      {
         b = b < f.getLeft() ? b : f.getLeft();
         c = c < f.getTop() ? c : f.getTop();
         d = d > f.getRight() ? d : f.getRight();
         e = e > f.getBottom() ? e : f.getBottom()
      }
      a()
   };
   this.inflate = function (f)
   {
      b = b - f;
      c = c - f;
      d = d + f;
      e = e + f;
      a()
   };
   this.minSelf = function (f)
   {
      b = b > f.getLeft() ? b : f.getLeft();
      c = c > f.getTop() ? c : f.getTop();
      d = d < f.getRight() ? d : f.getRight();
      e = e < f.getBottom() ? e : f.getBottom();
      a()
   };
   this.intersects = function (a)
   {
      return d < a.getLeft() || b > a.getRight() || e < a.getTop() || c > a.getBottom() ?
         false : true
   };
   this.empty = function ()
   {
      h = true;
      e = d = c = b = 0;
      a()
   };
   this.isEmpty = function ()
   {
      return h
   }
};
THREE.Math = {
   clamp: function (a, b, c)
   {
      return a < b ? b : a > c ? c : a
   },
   clampBottom: function (a, b)
   {
      return a < b ? b : a
   },
   mapLinear: function (a, b, c, d, e)
   {
      return d + (a - b) * (e - d) / (c - b)
   },
   random16: function ()
   {
      return (65280 * Math.random() + 255 * Math.random()) / 65535
   },
   randInt: function (a, b)
   {
      return a + Math.floor(Math.random() * (b - a + 1))
   },
   randFloat: function (a, b)
   {
      return a + Math.random() * (b - a)
   },
   randFloatSpread: function (a)
   {
      return a * (0.5 - Math.random())
   },
   sign: function (a)
   {
      return a < 0 ? -1 : a > 0 ? 1 : 0
   }
};
THREE.Matrix3 = function ()
{
   this.elements = new Float32Array(9)
};
THREE.Matrix3.prototype = {
   constructor: THREE.Matrix3,
   getInverse: function (a)
   {
      var b = a.elements,
         a = b[10] * b[5] - b[6] * b[9],
         c = -b[10] * b[1] + b[2] * b[9],
         d = b[6] * b[1] - b[2] * b[5],
         e = -b[10] * b[4] + b[6] * b[8],
         f = b[10] * b[0] - b[2] * b[8],
         g = -b[6] * b[0] + b[2] * b[4],
         h = b[9] * b[4] - b[5] * b[8],
         i = -b[9] * b[0] + b[1] * b[8],
         j = b[5] * b[0] - b[1] * b[4],
         b = b[0] * a + b[1] * e + b[2] * h;
      b === 0 && console.warn("Matrix3.getInverse(): determinant == 0");
      var b = 1 / b,
         l = this.elements;
      l[0] = b * a;
      l[1] = b * c;
      l[2] = b * d;
      l[3] = b * e;
      l[4] = b * f;
      l[5] = b * g;
      l[6] = b * h;
      l[7] = b * i;
      l[8] = b * j;
      return this
   },
   transpose: function ()
   {
      var a, b = this.elements;
      a = b[1];
      b[1] = b[3];
      b[3] = a;
      a = b[2];
      b[2] = b[6];
      b[6] = a;
      a = b[5];
      b[5] = b[7];
      b[7] = a;
      return this
   },
   transposeIntoArray: function (a)
   {
      var b = this.m;
      a[0] = b[0];
      a[1] = b[3];
      a[2] = b[6];
      a[3] = b[1];
      a[4] = b[4];
      a[5] = b[7];
      a[6] = b[2];
      a[7] = b[5];
      a[8] = b[8];
      return this
   }
};
THREE.Matrix4 = function (a, b, c, d, e, f, g, h, i, j, l, m, n, p, r, o)
{
   this.elements = new Float32Array(16);
   this.set(a !== void 0 ? a : 1, b || 0, c || 0, d || 0, e || 0, f !== void 0 ?
      f : 1, g || 0, h || 0, i || 0, j || 0, l !== void 0 ? l : 1, m || 0, n ||
      0, p || 0, r || 0, o !== void 0 ? o : 1)
};
THREE.Matrix4.prototype = {
   constructor: THREE.Matrix4,
   set: function (a, b, c, d, e, f, g, h, i, j, l, m, n, p, r, o)
   {
      var q = this.elements;
      q[0] = a;
      q[4] = b;
      q[8] = c;
      q[12] = d;
      q[1] = e;
      q[5] = f;
      q[9] = g;
      q[13] = h;
      q[2] = i;
      q[6] = j;
      q[10] = l;
      q[14] = m;
      q[3] = n;
      q[7] = p;
      q[11] = r;
      q[15] = o;
      return this
   },
   identity: function ()
   {
      this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      return this
   },
   copy: function (a)
   {
      a = a.elements;
      this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[
         10], a[14], a[3], a[7], a[11], a[15]);
      return this
   },
   lookAt: function (a, b, c)
   {
      var d = this.elements,
         e = THREE.Matrix4.__v1,
         f = THREE.Matrix4.__v2,
         g = THREE.Matrix4.__v3;
      g.sub(a, b).normalize();
      if (g.length() === 0) g.z = 1;
      e.cross(c, g).normalize();
      if (e.length() === 0)
      {
         g.x = g.x + 1.0E-4;
         e.cross(c, g).normalize()
      }
      f.cross(g, e);
      d[0] = e.x;
      d[4] = f.x;
      d[8] = g.x;
      d[1] = e.y;
      d[5] = f.y;
      d[9] = g.y;
      d[2] = e.z;
      d[6] = f.z;
      d[10] = g.z;
      return this
   },
   multiply: function (a, b)
   {
      var c = a.elements,
         d = b.elements,
         e = this.elements,
         f = c[0],
         g = c[4],
         h = c[8],
         i = c[12],
         j = c[1],
         l = c[5],
         m = c[9],
         n = c[13],
         p = c[2],
         r = c[6],
         o = c[10],
         q = c[14],
         s = c[3],
         w = c[7],
         t = c[11],
         c = c[15],
         v = d[0],
         x = d[4],
         C = d[8],
         D = d[12],
         z = d[1],
         u = d[5],
         G = d[9],
         J = d[13],
         M = d[2],
         O = d[6],
         X = d[10],
         B = d[14],
         F = d[3],
         Q = d[7],
         E = d[11],
         d = d[15];
      e[0] = f * v + g * z + h * M + i * F;
      e[4] = f * x + g * u + h * O + i * Q;
      e[8] = f * C + g * G + h * X + i * E;
      e[12] = f * D + g * J + h * B + i * d;
      e[1] = j * v + l * z + m * M + n * F;
      e[5] = j * x + l * u + m * O + n * Q;
      e[9] = j * C + l * G + m * X + n * E;
      e[13] = j * D + l * J + m * B + n * d;
      e[2] = p * v + r * z + o * M + q * F;
      e[6] = p * x + r * u + o * O + q * Q;
      e[10] = p * C + r * G + o * X + q * E;
      e[14] = p * D + r * J + o * B + q * d;
      e[3] = s * v + w * z + t * M + c * F;
      e[7] = s * x + w * u + t * O + c * Q;
      e[11] = s * C + w * G + t * X + c * E;
      e[15] = s * D + w * J + t * B + c * d;
      return this
   },
   multiplySelf: function (a)
   {
      return this.multiply(this,
         a)
   },
   multiplyToArray: function (a, b, c)
   {
      var d = this.elements;
      this.multiply(a, b);
      c[0] = d[0];
      c[1] = d[1];
      c[2] = d[2];
      c[3] = d[3];
      c[4] = d[4];
      c[5] = d[5];
      c[6] = d[6];
      c[7] = d[7];
      c[8] = d[8];
      c[9] = d[9];
      c[10] = d[10];
      c[11] = d[11];
      c[12] = d[12];
      c[13] = d[13];
      c[14] = d[14];
      c[15] = d[15];
      return this
   },
   multiplyScalar: function (a)
   {
      var b = this.elements;
      b[0] = b[0] * a;
      b[4] = b[4] * a;
      b[8] = b[8] * a;
      b[12] = b[12] * a;
      b[1] = b[1] * a;
      b[5] = b[5] * a;
      b[9] = b[9] * a;
      b[13] = b[13] * a;
      b[2] = b[2] * a;
      b[6] = b[6] * a;
      b[10] = b[10] * a;
      b[14] = b[14] * a;
      b[3] = b[3] * a;
      b[7] = b[7] * a;
      b[11] = b[11] * a;
      b[15] =
         b[15] * a;
      return this
   },
   multiplyVector3: function (a)
   {
      var b = this.elements,
         c = a.x,
         d = a.y,
         e = a.z,
         f = 1 / (b[3] * c + b[7] * d + b[11] * e + b[15]);
      a.x = (b[0] * c + b[4] * d + b[8] * e + b[12]) * f;
      a.y = (b[1] * c + b[5] * d + b[9] * e + b[13]) * f;
      a.z = (b[2] * c + b[6] * d + b[10] * e + b[14]) * f;
      return a
   },
   multiplyVector4: function (a)
   {
      var b = this.elements,
         c = a.x,
         d = a.y,
         e = a.z,
         f = a.w;
      a.x = b[0] * c + b[4] * d + b[8] * e + b[12] * f;
      a.y = b[1] * c + b[5] * d + b[9] * e + b[13] * f;
      a.z = b[2] * c + b[6] * d + b[10] * e + b[14] * f;
      a.w = b[3] * c + b[7] * d + b[11] * e + b[15] * f;
      return a
   },
   multiplyVector3Array: function (a)
   {
      for (var b = THREE.Matrix4.__v1,
            c = 0, d = a.length; c < d; c = c + 3)
      {
         b.x = a[c];
         b.y = a[c + 1];
         b.z = a[c + 2];
         this.multiplyVector3(b);
         a[c] = b.x;
         a[c + 1] = b.y;
         a[c + 2] = b.z
      }
      return a
   },
   rotateAxis: function (a)
   {
      var b = this.elements,
         c = a.x,
         d = a.y,
         e = a.z;
      a.x = c * b[0] + d * b[4] + e * b[8];
      a.y = c * b[1] + d * b[5] + e * b[9];
      a.z = c * b[2] + d * b[6] + e * b[10];
      a.normalize();
      return a
   },
   crossVector: function (a)
   {
      var b = this.elements,
         c = new THREE.Vector4;
      c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
      c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
      c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
      c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] *
         a.z + b[15] * a.w : 1;
      return c
   },
   determinant: function ()
   {
      var a = this.elements,
         b = a[0],
         c = a[4],
         d = a[8],
         e = a[12],
         f = a[1],
         g = a[5],
         h = a[9],
         i = a[13],
         j = a[2],
         l = a[6],
         m = a[10],
         n = a[14],
         p = a[3],
         r = a[7],
         o = a[11],
         a = a[15];
      return e * h * l * p - d * i * l * p - e * g * m * p + c * i * m * p + d *
         g * n * p - c * h * n * p - e * h * j * r + d * i * j * r + e * f * m *
         r - b * i * m * r - d * f * n * r + b * h * n * r + e * g * j * o - c *
         i * j * o - e * f * l * o + b * i * l * o + c * f * n * o - b * g * n *
         o - d * g * j * a + c * h * j * a + d * f * l * a - b * h * l * a - c *
         f * m * a + b * g * m * a
   },
   transpose: function ()
   {
      var a = this.elements,
         b;
      b = a[1];
      a[1] = a[4];
      a[4] = b;
      b = a[2];
      a[2] = a[8];
      a[8] = b;
      b = a[6];
      a[6] = a[9];
      a[9] = b;
      b = a[3];
      a[3] = a[12];
      a[12] = b;
      b = a[7];
      a[7] = a[13];
      a[13] = b;
      b = a[11];
      a[11] = a[14];
      a[14] = b;
      return this
   },
   flattenToArray: function (a)
   {
      var b = this.elements;
      a[0] = b[0];
      a[1] = b[1];
      a[2] = b[2];
      a[3] = b[3];
      a[4] = b[4];
      a[5] = b[5];
      a[6] = b[6];
      a[7] = b[7];
      a[8] = b[8];
      a[9] = b[9];
      a[10] = b[10];
      a[11] = b[11];
      a[12] = b[12];
      a[13] = b[13];
      a[14] = b[14];
      a[15] = b[15];
      return a
   },
   flattenToArrayOffset: function (a, b)
   {
      var c = this.elements;
      a[b] = c[0];
      a[b + 1] = c[1];
      a[b + 2] = c[2];
      a[b + 3] = c[3];
      a[b + 4] = c[4];
      a[b + 5] = c[5];
      a[b + 6] = c[6];
      a[b + 7] = c[7];
      a[b + 8] = c[8];
      a[b + 9] = c[9];
      a[b + 10] =
         c[10];
      a[b + 11] = c[11];
      a[b + 12] = c[12];
      a[b + 13] = c[13];
      a[b + 14] = c[14];
      a[b + 15] = c[15];
      return a
   },
   getPosition: function ()
   {
      var a = this.elements;
      return THREE.Matrix4.__v1.set(a[12], a[13], a[14])
   },
   setPosition: function (a)
   {
      var b = this.elements;
      b[12] = a.x;
      b[13] = a.y;
      b[14] = a.z;
      return this
   },
   getColumnX: function ()
   {
      var a = this.elements;
      return THREE.Matrix4.__v1.set(a[0], a[1], a[2])
   },
   getColumnY: function ()
   {
      var a = this.elements;
      return THREE.Matrix4.__v1.set(a[4], a[5], a[6])
   },
   getColumnZ: function ()
   {
      var a = this.elements;
      return THREE.Matrix4.__v1.set(a[8],
         a[9], a[10])
   },
   getInverse: function (a)
   {
      var b = this.elements,
         c = a.elements,
         d = c[0],
         e = c[4],
         f = c[8],
         g = c[12],
         h = c[1],
         i = c[5],
         j = c[9],
         l = c[13],
         m = c[2],
         n = c[6],
         p = c[10],
         r = c[14],
         o = c[3],
         q = c[7],
         s = c[11],
         c = c[15];
      b[0] = j * r * q - l * p * q + l * n * s - i * r * s - j * n * c + i * p *
         c;
      b[4] = g * p * q - f * r * q - g * n * s + e * r * s + f * n * c - e * p *
         c;
      b[8] = f * l * q - g * j * q + g * i * s - e * l * s - f * i * c + e * j *
         c;
      b[12] = g * j * n - f * l * n - g * i * p + e * l * p + f * i * r - e * j *
         r;
      b[1] = l * p * o - j * r * o - l * m * s + h * r * s + j * m * c - h * p *
         c;
      b[5] = f * r * o - g * p * o + g * m * s - d * r * s - f * m * c + d * p *
         c;
      b[9] = g * j * o - f * l * o - g * h * s + d * l * s + f * h * c - d * j *
         c;
      b[13] = f * l * m - g * j * m + g * h * p - d *
         l * p - f * h * r + d * j * r;
      b[2] = i * r * o - l * n * o + l * m * q - h * r * q - i * m * c + h * n *
         c;
      b[6] = g * n * o - e * r * o - g * m * q + d * r * q + e * m * c - d * n *
         c;
      b[10] = e * l * o - g * i * o + g * h * q - d * l * q - e * h * c + d * i *
         c;
      b[14] = g * i * m - e * l * m - g * h * n + d * l * n + e * h * r - d * i *
         r;
      b[3] = j * n * o - i * p * o - j * m * q + h * p * q + i * m * s - h * n *
         s;
      b[7] = e * p * o - f * n * o + f * m * q - d * p * q - e * m * s + d * n *
         s;
      b[11] = f * i * o - e * j * o - f * h * q + d * j * q + e * h * s - d * i *
         s;
      b[15] = e * j * m - f * i * m + f * h * n - d * j * n - e * h * p + d * i *
         p;
      this.multiplyScalar(1 / a.determinant());
      return this
   },
   setRotationFromEuler: function (a, b)
   {
      var c = this.elements,
         d = a.x,
         e = a.y,
         f = a.z,
         g = Math.cos(d),
         d = Math.sin(d),
         h = Math.cos(e),
         e = Math.sin(e),
         i = Math.cos(f),
         f = Math.sin(f);
      if (b === void 0 || b === "XYZ")
      {
         var j = g * i,
            l = g * f,
            m = d * i,
            n = d * f;
         c[0] = h * i;
         c[4] = -h * f;
         c[8] = e;
         c[1] = l + m * e;
         c[5] = j - n * e;
         c[9] = -d * h;
         c[2] = n - j * e;
         c[6] = m + l * e;
         c[10] = g * h
      }
      else if (b === "YXZ")
      {
         j = h * i;
         l = h * f;
         m = e * i;
         n = e * f;
         c[0] = j + n * d;
         c[4] = m * d - l;
         c[8] = g * e;
         c[1] = g * f;
         c[5] = g * i;
         c[9] = -d;
         c[2] = l * d - m;
         c[6] = n + j * d;
         c[10] = g * h
      }
      else if (b === "ZXY")
      {
         j = h * i;
         l = h * f;
         m = e * i;
         n = e * f;
         c[0] = j - n * d;
         c[4] = -g * f;
         c[8] = m + l * d;
         c[1] = l + m * d;
         c[5] = g * i;
         c[9] = n - j * d;
         c[2] = -g * e;
         c[6] = d;
         c[10] = g * h
      }
      else if (b === "ZYX")
      {
         j = g * i;
         l = g * f;
         m = d * i;
         n = d * f;
         c[0] = h * i;
         c[4] = m * e - l;
         c[8] = j * e + n;
         c[1] = h * f;
         c[5] = n * e + j;
         c[9] = l * e - m;
         c[2] = -e;
         c[6] = d * h;
         c[10] = g * h
      }
      else if (b === "YZX")
      {
         j = g * h;
         l = g * e;
         m = d * h;
         n = d * e;
         c[0] = h * i;
         c[4] = n - j * f;
         c[8] = m * f + l;
         c[1] = f;
         c[5] = g * i;
         c[9] = -d * i;
         c[2] = -e * i;
         c[6] = l * f + m;
         c[10] = j - n * f
      }
      else if (b === "XZY")
      {
         j = g * h;
         l = g * e;
         m = d * h;
         n = d * e;
         c[0] = h * i;
         c[4] = -f;
         c[8] = e * i;
         c[1] = j * f + n;
         c[5] = g * i;
         c[9] = l * f - m;
         c[2] = m * f - l;
         c[6] = d * i;
         c[10] = n * f + j
      }
      return this
   },
   setRotationFromQuaternion: function (a)
   {
      var b = this.elements,
         c = a.x,
         d = a.y,
         e = a.z,
         f = a.w,
         g = c + c,
         h = d + d,
         i = e + e,
         a = c * g,
         j = c * h,
         c = c * i,
         l = d * h,
         d = d *
            i,
         e = e * i,
         g = f * g,
         h = f * h,
         f = f * i;
      b[0] = 1 - (l + e);
      b[4] = j - f;
      b[8] = c + h;
      b[1] = j + f;
      b[5] = 1 - (a + e);
      b[9] = d - g;
      b[2] = c - h;
      b[6] = d + g;
      b[10] = 1 - (a + l);
      return this
   },
   compose: function (a, b, c)
   {
      var d = this.elements,
         e = THREE.Matrix4.__m1,
         f = THREE.Matrix4.__m2;
      e.identity();
      e.setRotationFromQuaternion(b);
      f.makeScale(c.x, c.y, c.z);
      this.multiply(e, f);
      d[12] = a.x;
      d[13] = a.y;
      d[14] = a.z;
      return this
   },
   decompose: function (a, b, c)
   {
      var d = this.elements,
         e = THREE.Matrix4.__v1,
         f = THREE.Matrix4.__v2,
         g = THREE.Matrix4.__v3;
      e.set(d[0], d[1], d[2]);
      f.set(d[4], d[5], d[6]);
      g.set(d[8], d[9], d[10]);
      a = a instanceof THREE.Vector3 ? a : new THREE.Vector3;
      b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion;
      c = c instanceof THREE.Vector3 ? c : new THREE.Vector3;
      c.x = e.length();
      c.y = f.length();
      c.z = g.length();
      a.x = d[12];
      a.y = d[13];
      a.z = d[14];
      d = THREE.Matrix4.__m1;
      d.copy(this);
      d.elements[0] = d.elements[0] / c.x;
      d.elements[1] = d.elements[1] / c.x;
      d.elements[2] = d.elements[2] / c.x;
      d.elements[4] = d.elements[4] / c.y;
      d.elements[5] = d.elements[5] / c.y;
      d.elements[6] = d.elements[6] / c.y;
      d.elements[8] = d.elements[8] /
         c.z;
      d.elements[9] = d.elements[9] / c.z;
      d.elements[10] = d.elements[10] / c.z;
      b.setFromRotationMatrix(d);
      return [a, b, c]
   },
   extractPosition: function (a)
   {
      var b = this.elements,
         a = a.elements;
      b[12] = a[12];
      b[13] = a[13];
      b[14] = a[14];
      return this
   },
   extractRotation: function (a)
   {
      var b = this.elements,
         a = a.elements,
         c = THREE.Matrix4.__v1,
         d = 1 / c.set(a[0], a[1], a[2]).length(),
         e = 1 / c.set(a[4], a[5], a[6]).length(),
         c = 1 / c.set(a[8], a[9], a[10]).length();
      b[0] = a[0] * d;
      b[1] = a[1] * d;
      b[2] = a[2] * d;
      b[4] = a[4] * e;
      b[5] = a[5] * e;
      b[6] = a[6] * e;
      b[8] = a[8] * c;
      b[9] = a[9] *
         c;
      b[10] = a[10] * c;
      return this
   },
   translate: function (a)
   {
      var b = this.elements,
         c = a.x,
         d = a.y,
         a = a.z;
      b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
      b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
      b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
      b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
      return this
   },
   rotateX: function (a)
   {
      var b = this.elements,
         c = b[4],
         d = b[5],
         e = b[6],
         f = b[7],
         g = b[8],
         h = b[9],
         i = b[10],
         j = b[11],
         l = Math.cos(a),
         a = Math.sin(a);
      b[4] = l * c + a * g;
      b[5] = l * d + a * h;
      b[6] = l * e + a * i;
      b[7] = l * f + a * j;
      b[8] = l * g - a * c;
      b[9] = l * h - a * d;
      b[10] = l * i - a * e;
      b[11] = l * j - a * f;
      return this
   },
   rotateY: function (a)
   {
      var b =
         this.elements,
         c = b[0],
         d = b[1],
         e = b[2],
         f = b[3],
         g = b[8],
         h = b[9],
         i = b[10],
         j = b[11],
         l = Math.cos(a),
         a = Math.sin(a);
      b[0] = l * c - a * g;
      b[1] = l * d - a * h;
      b[2] = l * e - a * i;
      b[3] = l * f - a * j;
      b[8] = l * g + a * c;
      b[9] = l * h + a * d;
      b[10] = l * i + a * e;
      b[11] = l * j + a * f;
      return this
   },
   rotateZ: function (a)
   {
      var b = this.elements,
         c = b[0],
         d = b[1],
         e = b[2],
         f = b[3],
         g = b[4],
         h = b[5],
         i = b[6],
         j = b[7],
         l = Math.cos(a),
         a = Math.sin(a);
      b[0] = l * c + a * g;
      b[1] = l * d + a * h;
      b[2] = l * e + a * i;
      b[3] = l * f + a * j;
      b[4] = l * g - a * c;
      b[5] = l * h - a * d;
      b[6] = l * i - a * e;
      b[7] = l * j - a * f;
      return this
   },
   rotateByAxis: function (a, b)
   {
      var c = this.elements;
      if (a.x === 1 && a.y === 0 && a.z === 0) return this.rotateX(b);
      if (a.x === 0 && a.y === 1 && a.z === 0) return this.rotateY(b);
      if (a.x === 0 && a.y === 0 && a.z === 1) return this.rotateZ(b);
      var d = a.x,
         e = a.y,
         f = a.z,
         g = Math.sqrt(d * d + e * e + f * f),
         d = d / g,
         e = e / g,
         f = f / g,
         g = d * d,
         h = e * e,
         i = f * f,
         j = Math.cos(b),
         l = Math.sin(b),
         m = 1 - j,
         n = d * e * m,
         p = d * f * m,
         m = e * f * m,
         d = d * l,
         r = e * l,
         l = f * l,
         f = g + (1 - g) * j,
         g = n + l,
         e = p - r,
         n = n - l,
         h = h + (1 - h) * j,
         l = m + d,
         p = p + r,
         m = m - d,
         i = i + (1 - i) * j,
         j = c[0],
         d = c[1],
         r = c[2],
         o = c[3],
         q = c[4],
         s = c[5],
         w = c[6],
         t = c[7],
         v = c[8],
         x = c[9],
         C = c[10],
         D = c[11];
      c[0] = f * j + g * q + e * v;
      c[1] = f * d + g *
         s + e * x;
      c[2] = f * r + g * w + e * C;
      c[3] = f * o + g * t + e * D;
      c[4] = n * j + h * q + l * v;
      c[5] = n * d + h * s + l * x;
      c[6] = n * r + h * w + l * C;
      c[7] = n * o + h * t + l * D;
      c[8] = p * j + m * q + i * v;
      c[9] = p * d + m * s + i * x;
      c[10] = p * r + m * w + i * C;
      c[11] = p * o + m * t + i * D;
      return this
   },
   scale: function (a)
   {
      var b = this.elements,
         c = a.x,
         d = a.y,
         a = a.z;
      b[0] = b[0] * c;
      b[4] = b[4] * d;
      b[8] = b[8] * a;
      b[1] = b[1] * c;
      b[5] = b[5] * d;
      b[9] = b[9] * a;
      b[2] = b[2] * c;
      b[6] = b[6] * d;
      b[10] = b[10] * a;
      b[3] = b[3] * c;
      b[7] = b[7] * d;
      b[11] = b[11] * a;
      return this
   },
   getMaxScaleOnAxis: function ()
   {
      var a = this.elements;
      return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] +
         a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] *
            a[8] + a[9] * a[9] + a[10] * a[10])))
   },
   makeTranslation: function (a, b, c)
   {
      this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
      return this
   },
   makeRotationX: function (a)
   {
      var b = Math.cos(a),
         a = Math.sin(a);
      this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
      return this
   },
   makeRotationY: function (a)
   {
      var b = Math.cos(a),
         a = Math.sin(a);
      this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
      return this
   },
   makeRotationZ: function (a)
   {
      var b = Math.cos(a),
         a = Math.sin(a);
      this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      return this
   },
   makeRotationAxis: function (a, b)
   {
      var c = Math.cos(b),
         d = Math.sin(b),
         e = 1 - c,
         f = a.x,
         g = a.y,
         h = a.z,
         i = e * f,
         j = e * g;
      this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, j * g +
         c, j * h - d * f, 0, i * h - d * g, j * h + d * f, e * h * h + c, 0, 0,
         0, 0, 1);
      return this
   },
   makeScale: function (a, b, c)
   {
      this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
      return this
   },
   makeFrustum: function (a, b, c, d, e, f)
   {
      var g = this.elements;
      g[0] = 2 * e / (b - a);
      g[4] = 0;
      g[8] = (b + a) / (b - a);
      g[12] = 0;
      g[1] = 0;
      g[5] = 2 * e / (d - c);
      g[9] = (d + c) / (d - c);
      g[13] = 0;
      g[2] = 0;
      g[6] = 0;
      g[10] = -(f + e) / (f - e);
      g[14] = -2 * f * e / (f - e);
      g[3] =
         0;
      g[7] = 0;
      g[11] = -1;
      g[15] = 0;
      return this
   },
   makePerspective: function (a, b, c, d)
   {
      var a = c * Math.tan(a * Math.PI / 360),
         e = -a;
      return this.makeFrustum(e * b, a * b, e, a, c, d)
   },
   makeOrthographic: function (a, b, c, d, e, f)
   {
      var g = this.elements,
         h = b - a,
         i = c - d,
         j = f - e;
      g[0] = 2 / h;
      g[4] = 0;
      g[8] = 0;
      g[12] = -((b + a) / h);
      g[1] = 0;
      g[5] = 2 / i;
      g[9] = 0;
      g[13] = -((c + d) / i);
      g[2] = 0;
      g[6] = 0;
      g[10] = -2 / j;
      g[14] = -((f + e) / j);
      g[3] = 0;
      g[7] = 0;
      g[11] = 0;
      g[15] = 1;
      return this
   },
   clone: function ()
   {
      var a = this.elements;
      return new THREE.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13],
         a[2],
         a[6], a[10], a[14], a[3], a[7], a[11], a[15])
   }
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Matrix4.__m1 = new THREE.Matrix4;
THREE.Matrix4.__m2 = new THREE.Matrix4;
THREE.Object3D = function ()
{
   this.id = THREE.Object3DCount++;
   this.name = "";
   this.parent = void 0;
   this.children = [];
   this.up = new THREE.Vector3(0, 1, 0);
   this.position = new THREE.Vector3;
   this.rotation = new THREE.Vector3;
   this.eulerOrder = "XYZ";
   this.scale = new THREE.Vector3(1, 1, 1);
   this.flipSided = this.doubleSided = false;
   this.renderDepth = null;
   this.rotationAutoUpdate = true;
   this.matrix = new THREE.Matrix4;
   this.matrixWorld = new THREE.Matrix4;
   this.matrixRotationWorld = new THREE.Matrix4;
   this.matrixWorldNeedsUpdate = this.matrixAutoUpdate =
      true;
   this.quaternion = new THREE.Quaternion;
   this.useQuaternion = false;
   this.boundRadius = 0;
   this.boundRadiusScale = 1;
   this.visible = true;
   this.receiveShadow = this.castShadow = false;
   this.frustumCulled = true;
   this._vector = new THREE.Vector3
};
THREE.Object3D.prototype = {
   constructor: THREE.Object3D,
   applyMatrix: function (a)
   {
      this.matrix.multiply(a, this.matrix);
      this.scale.getScaleFromMatrix(this.matrix);
      this.rotation.setEulerFromRotationMatrix((new THREE.Matrix4).extractRotation(
         this.matrix), this.eulerOrder);
      this.position.getPositionFromMatrix(this.matrix)
   },
   translate: function (a, b)
   {
      this.matrix.rotateAxis(b);
      this.position.addSelf(b.multiplyScalar(a))
   },
   translateX: function (a)
   {
      this.translate(a, this._vector.set(1, 0, 0))
   },
   translateY: function (a)
   {
      this.translate(a,
         this._vector.set(0, 1, 0))
   },
   translateZ: function (a)
   {
      this.translate(a, this._vector.set(0, 0, 1))
   },
   lookAt: function (a)
   {
      this.matrix.lookAt(a, this.position, this.up);
      this.rotationAutoUpdate && this.rotation.setEulerFromRotationMatrix(this.matrix,
         this.eulerOrder)
   },
   add: function (a)
   {
      if (a === this) console.warn(
         "THREE.Object3D.add: An object can't be added as a child of itself.");
      else if (a instanceof THREE.Object3D)
      {
         a.parent !== void 0 && a.parent.remove(a);
         a.parent = this;
         this.children.push(a);
         for (var b = this; b.parent !== void 0;) b =
            b.parent;
         b !== void 0 && b instanceof THREE.Scene && b.__addObject(a)
      }
   },
   remove: function (a)
   {
      var b = this.children.indexOf(a);
      if (b !== -1)
      {
         a.parent = void 0;
         this.children.splice(b, 1);
         for (b = this; b.parent !== void 0;) b = b.parent;
         b !== void 0 && b instanceof THREE.Scene && b.__removeObject(a)
      }
   },
   getChildByName: function (a, b)
   {
      var c, d, e;
      c = 0;
      for (d = this.children.length; c < d; c++)
      {
         e = this.children[c];
         if (e.name === a) return e;
         if (b)
         {
            e = e.getChildByName(a, b);
            if (e !== void 0) return e
         }
      }
   },
   updateMatrix: function ()
   {
      this.matrix.setPosition(this.position);
      this.useQuaternion === true ? this.matrix.setRotationFromQuaternion(this.quaternion) :
         this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder);
      if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1)
      {
         this.matrix.scale(this.scale);
         this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y,
            this.scale.z))
      }
      this.matrixWorldNeedsUpdate = true
   },
   updateMatrixWorld: function (a)
   {
      this.matrixAutoUpdate === true && this.updateMatrix();
      if (this.matrixWorldNeedsUpdate === true || a === true)
      {
         this.parent !== void 0 ? this.matrixWorld.multiply(this.parent.matrixWorld,
            this.matrix) : this.matrixWorld.copy(this.matrix);
         this.matrixWorldNeedsUpdate = false;
         a = true
      }
      for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(
         a)
   },
   worldToLocal: function (a)
   {
      return THREE.Object3D.__m1.getInverse(this.matrixWorld).multiplyVector3(a)
   },
   localToWorld: function (a)
   {
      return this.matrixWorld.multiplyVector3(a)
   }
};
THREE.Object3D.__m1 = new THREE.Matrix4;
THREE.Object3DCount = 0;
THREE.Projector = function ()
{
   function a(a, c)
   {
      g = 0;
      C.objects.length = 0;
      C.sprites.length = 0;
      C.lights.length = 0;
      var e = function (a)
      {
         if (a.visible !== false)
         {
            if ((a instanceof THREE.Mesh || a instanceof THREE.Line) && (a.frustumCulled ===
               false || J.contains(a) === true))
            {
               D.copy(a.matrixWorld.getPosition());
               u.multiplyVector3(D);
               f = b();
               f.object = a;
               f.z = D.z;
               C.objects.push(f)
            }
            else if (a instanceof THREE.Sprite || a instanceof THREE.Particle)
            {
               D.copy(a.matrixWorld.getPosition());
               u.multiplyVector3(D);
               f = b();
               f.object = a;
               f.z = D.z;
               C.sprites.push(f)
            }
            else a instanceof
            THREE.Light && C.lights.push(a);
            for (var c = 0, d = a.children.length; c < d; c++) e(a.children[c])
         }
      };
      e(a);
      c === true && C.objects.sort(d);
      return C
   }

   function b()
   {
      var a;
      if (g === h.length)
      {
         a = new THREE.RenderableObject;
         h.push(a)
      }
      else a = h[g];
      g++;
      return a
   }

   function c()
   {
      var a;
      if (j === l.length)
      {
         a = new THREE.RenderableVertex;
         l.push(a)
      }
      else a = l[j];
      j++;
      return a
   }

   function d(a, b)
   {
      return b.z - a.z
   }

   function e(a, b)
   {
      var c = 0,
         d = 1,
         f = a.z + a.w,
         e = b.z + b.w,
         g = -a.z + a.w,
         h = -b.z + b.w;
      if (f >= 0 && e >= 0 && g >= 0 && h >= 0) return true;
      if (f < 0 && e < 0 || g < 0 && h < 0) return false;
      f < 0 ? c = Math.max(c, f / (f - e)) : e < 0 && (d = Math.min(d, f / (f -
         e)));
      g < 0 ? c = Math.max(c, g / (g - h)) : h < 0 && (d = Math.min(d, g / (g -
         h)));
      if (d < c) return false;
      a.lerpSelf(b, c);
      b.lerpSelf(a, 1 - d);
      return true
   }
   var f, g, h = [],
      i, j, l = [],
      m, n, p = [],
      r, o = [],
      q, s, w = [],
      t, v, x = [],
      C = {
         objects: [],
         sprites: [],
         lights: [],
         elements: []
      }, D = new THREE.Vector3,
      z = new THREE.Vector4,
      u = new THREE.Matrix4,
      G = new THREE.Matrix4,
      J = new THREE.Frustum,
      M = new THREE.Vector4,
      O = new THREE.Vector4;
   this.projectVector = function (a, b)
   {
      b.matrixWorldInverse.getInverse(b.matrixWorld);
      u.multiply(b.projectionMatrix,
         b.matrixWorldInverse);
      u.multiplyVector3(a);
      return a
   };
   this.unprojectVector = function (a, b)
   {
      b.projectionMatrixInverse.getInverse(b.projectionMatrix);
      u.multiply(b.matrixWorld, b.projectionMatrixInverse);
      u.multiplyVector3(a);
      return a
   };
   this.pickingRay = function (a, b)
   {
      var c;
      a.z = -1;
      c = new THREE.Vector3(a.x, a.y, 1);
      this.unprojectVector(a, b);
      this.unprojectVector(c, b);
      c.subSelf(a).normalize();
      return new THREE.Ray(a, c)
   };
   this.projectScene = function (b, f, g)
   {
      var h = f.near,
         E = f.far,
         D = false,
         T, N, W, ba, H, ca, ia, S, R, P, U, fa, ma, Ga,
         na;
      v = s = r = n = 0;
      C.elements.length = 0;
      if (f.parent === void 0)
      {
         console.warn(
            "DEPRECATED: Camera hasn't been added to a Scene. Adding it...");
         b.add(f)
      }
      b.updateMatrixWorld();
      f.matrixWorldInverse.getInverse(f.matrixWorld);
      u.multiply(f.projectionMatrix, f.matrixWorldInverse);
      J.setFromMatrix(u);
      C = a(b, false);
      b = 0;
      for (T = C.objects.length; b < T; b++)
      {
         R = C.objects[b].object;
         P = R.matrixWorld;
         j = 0;
         if (R instanceof THREE.Mesh)
         {
            U = R.geometry;
            fa = R.geometry.materials;
            ba = U.vertices;
            ma = U.faces;
            Ga = U.faceVertexUvs;
            U = R.matrixRotationWorld.extractRotation(P);
            N = 0;
            for (W = ba.length; N < W; N++)
            {
               i = c();
               i.positionWorld.copy(ba[N]);
               P.multiplyVector3(i.positionWorld);
               i.positionScreen.copy(i.positionWorld);
               u.multiplyVector4(i.positionScreen);
               i.positionScreen.x = i.positionScreen.x / i.positionScreen.w;
               i.positionScreen.y = i.positionScreen.y / i.positionScreen.w;
               i.visible = i.positionScreen.z > h && i.positionScreen.z < E
            }
            ba = 0;
            for (N = ma.length; ba < N; ba++)
            {
               W = ma[ba];
               if (W instanceof THREE.Face3)
               {
                  H = l[W.a];
                  ca = l[W.b];
                  ia = l[W.c];
                  if (H.visible === true && ca.visible === true && ia.visible ===
                     true)
                  {
                     D = (ia.positionScreen.x -
                        H.positionScreen.x) * (ca.positionScreen.y - H.positionScreen
                        .y) - (ia.positionScreen.y - H.positionScreen.y) * (ca.positionScreen
                        .x - H.positionScreen.x) < 0;
                     if (R.doubleSided === true || D !== R.flipSided)
                     {
                        S = void 0;
                        if (n === p.length)
                        {
                           S = new THREE.RenderableFace3;
                           p.push(S)
                        }
                        else S = p[n];
                        n++;
                        m = S;
                        m.v1.copy(H);
                        m.v2.copy(ca);
                        m.v3.copy(ia)
                     }
                     else continue
                  }
                  else continue
               }
               else if (W instanceof THREE.Face4)
               {
                  H = l[W.a];
                  ca = l[W.b];
                  ia = l[W.c];
                  S = l[W.d];
                  if (H.visible === true && ca.visible === true && ia.visible ===
                     true && S.visible === true)
                  {
                     D = (S.positionScreen.x -
                        H.positionScreen.x) * (ca.positionScreen.y - H.positionScreen
                        .y) - (S.positionScreen.y - H.positionScreen.y) * (ca.positionScreen
                        .x - H.positionScreen.x) < 0 || (ca.positionScreen.x -
                        ia.positionScreen.x) * (S.positionScreen.y - ia.positionScreen
                        .y) - (ca.positionScreen.y - ia.positionScreen.y) * (S.positionScreen
                        .x - ia.positionScreen.x) < 0;
                     if (R.doubleSided === true || D !== R.flipSided)
                     {
                        na = void 0;
                        if (r === o.length)
                        {
                           na = new THREE.RenderableFace4;
                           o.push(na)
                        }
                        else na = o[r];
                        r++;
                        m = na;
                        m.v1.copy(H);
                        m.v2.copy(ca);
                        m.v3.copy(ia);
                        m.v4.copy(S)
                     }
                     else continue
                  }
                  else continue
               }
               m.normalWorld.copy(W.normal);
               D === false && (R.flipSided === true || R.doubleSided === true) &&
                  m.normalWorld.negate();
               U.multiplyVector3(m.normalWorld);
               m.centroidWorld.copy(W.centroid);
               P.multiplyVector3(m.centroidWorld);
               m.centroidScreen.copy(m.centroidWorld);
               u.multiplyVector3(m.centroidScreen);
               ia = W.vertexNormals;
               H = 0;
               for (ca = ia.length; H < ca; H++)
               {
                  S = m.vertexNormalsWorld[H];
                  S.copy(ia[H]);
                  D === false && (R.flipSided === true || R.doubleSided ===
                     true) && S.negate();
                  U.multiplyVector3(S)
               }
               H = 0;
               for (ca = Ga.length; H < ca; H++)
               {
                  na = Ga[H][ba];
                  if (na !== void 0)
                  {
                     ia = 0;
                     for (S =
                        na.length; ia < S; ia++) m.uvs[H][ia] = na[ia]
                  }
               }
               m.material = R.material;
               m.faceMaterial = W.materialIndex !== null ? fa[W.materialIndex] :
                  null;
               m.z = m.centroidScreen.z;
               C.elements.push(m)
            }
         }
         else if (R instanceof THREE.Line)
         {
            G.multiply(u, P);
            ba = R.geometry.vertices;
            H = c();
            H.positionScreen.copy(ba[0]);
            G.multiplyVector4(H.positionScreen);
            P = R.type === THREE.LinePieces ? 2 : 1;
            N = 1;
            for (W = ba.length; N < W; N++)
            {
               H = c();
               H.positionScreen.copy(ba[N]);
               G.multiplyVector4(H.positionScreen);
               if (!((N + 1) % P > 0))
               {
                  ca = l[j - 2];
                  M.copy(H.positionScreen);
                  O.copy(ca.positionScreen);
                  if (e(M, O) === true)
                  {
                     M.multiplyScalar(1 / M.w);
                     O.multiplyScalar(1 / O.w);
                     fa = void 0;
                     if (s === w.length)
                     {
                        fa = new THREE.RenderableLine;
                        w.push(fa)
                     }
                     else fa = w[s];
                     s++;
                     q = fa;
                     q.v1.positionScreen.copy(M);
                     q.v2.positionScreen.copy(O);
                     q.z = Math.max(M.z, O.z);
                     q.material = R.material;
                     C.elements.push(q)
                  }
               }
            }
         }
      }
      b = 0;
      for (T = C.sprites.length; b < T; b++)
      {
         R = C.sprites[b].object;
         P = R.matrixWorld;
         if (R instanceof THREE.Particle)
         {
            z.set(P.elements[12], P.elements[13], P.elements[14], 1);
            u.multiplyVector4(z);
            z.z = z.z / z.w;
            if (z.z > 0 && z.z < 1)
            {
               h = void 0;
               if (v ===
                  x.length)
               {
                  h = new THREE.RenderableParticle;
                  x.push(h)
               }
               else h = x[v];
               v++;
               t = h;
               t.x = z.x / z.w;
               t.y = z.y / z.w;
               t.z = z.z;
               t.rotation = R.rotation.z;
               t.scale.x = R.scale.x * Math.abs(t.x - (z.x + f.projectionMatrix
                  .elements[0]) / (z.w + f.projectionMatrix.elements[12]));
               t.scale.y = R.scale.y * Math.abs(t.y - (z.y + f.projectionMatrix
                  .elements[5]) / (z.w + f.projectionMatrix.elements[13]));
               t.material = R.material;
               C.elements.push(t)
            }
         }
      }
      g && C.elements.sort(d);
      return C
   }
};
THREE.Quaternion = function (a, b, c, d)
{
   this.x = a || 0;
   this.y = b || 0;
   this.z = c || 0;
   this.w = d !== void 0 ? d : 1
};
THREE.Quaternion.prototype = {
   constructor: THREE.Quaternion,
   set: function (a, b, c, d)
   {
      this.x = a;
      this.y = b;
      this.z = c;
      this.w = d;
      return this
   },
   copy: function (a)
   {
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
      this.w = a.w;
      return this
   },
   setFromEuler: function (a, b)
   {
      var c = Math.cos(a.x / 2),
         d = Math.cos(a.y / 2),
         e = Math.cos(a.z / 2),
         f = Math.sin(a.x / 2),
         g = Math.sin(a.y / 2),
         h = Math.sin(a.z / 2);
      if (b === void 0 || b === "XYZ")
      {
         this.x = f * d * e + c * g * h;
         this.y = c * g * e - f * d * h;
         this.z = c * d * h + f * g * e;
         this.w = c * d * e - f * g * h
      }
      else if (b === "YXZ")
      {
         this.x = f * d * e + c * g * h;
         this.y = c * g * e - f * d * h;
         this.z =
            c * d * h - f * g * e;
         this.w = c * d * e + f * g * h
      }
      else if (b === "ZXY")
      {
         this.x = f * d * e - c * g * h;
         this.y = c * g * e + f * d * h;
         this.z = c * d * h + f * g * e;
         this.w = c * d * e - f * g * h
      }
      else if (b === "ZYX")
      {
         this.x = f * d * e - c * g * h;
         this.y = c * g * e + f * d * h;
         this.z = c * d * h - f * g * e;
         this.w = c * d * e + f * g * h
      }
      else if (b === "YZX")
      {
         this.x = f * d * e + c * g * h;
         this.y = c * g * e + f * d * h;
         this.z = c * d * h - f * g * e;
         this.w = c * d * e - f * g * h
      }
      else if (b === "XZY")
      {
         this.x = f * d * e - c * g * h;
         this.y = c * g * e - f * d * h;
         this.z = c * d * h + f * g * e;
         this.w = c * d * e + f * g * h
      }
      return this
   },
   setFromAxisAngle: function (a, b)
   {
      var c = b / 2,
         d = Math.sin(c);
      this.x = a.x * d;
      this.y = a.y *
         d;
      this.z = a.z * d;
      this.w = Math.cos(c);
      return this
   },
   setFromRotationMatrix: function (a)
   {
      var b = a.elements,
         c = b[0],
         a = b[4],
         d = b[8],
         e = b[1],
         f = b[5],
         g = b[9],
         h = b[2],
         i = b[6],
         b = b[10],
         j = c + f + b;
      if (j > 0)
      {
         c = 0.5 / Math.sqrt(j + 1);
         this.w = 0.25 / c;
         this.x = (i - g) * c;
         this.y = (d - h) * c;
         this.z = (e - a) * c
      }
      else if (c > f && c > b)
      {
         c = 2 * Math.sqrt(1 + c - f - b);
         this.w = (i - g) / c;
         this.x = 0.25 * c;
         this.y = (a + e) / c;
         this.z = (d + h) / c
      }
      else if (f > b)
      {
         c = 2 * Math.sqrt(1 + f - c - b);
         this.w = (d - h) / c;
         this.x = (a + e) / c;
         this.y = 0.25 * c;
         this.z = (g + i) / c
      }
      else
      {
         c = 2 * Math.sqrt(1 + b - c - f);
         this.w = (e - a) / c;
         this.x =
            (d + h) / c;
         this.y = (g + i) / c;
         this.z = 0.25 * c
      }
      return this
   },
   calculateW: function ()
   {
      this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this
         .z * this.z));
      return this
   },
   inverse: function ()
   {
      this.x = this.x * -1;
      this.y = this.y * -1;
      this.z = this.z * -1;
      return this
   },
   length: function ()
   {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z +
         this.w * this.w)
   },
   normalize: function ()
   {
      var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z +
         this.w * this.w);
      if (a === 0) this.w = this.z = this.y = this.x = 0;
      else
      {
         a = 1 / a;
         this.x = this.x * a;
         this.y =
            this.y * a;
         this.z = this.z * a;
         this.w = this.w * a
      }
      return this
   },
   multiply: function (a, b)
   {
      this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
      this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
      this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
      this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
      return this
   },
   multiplySelf: function (a)
   {
      var b = this.x,
         c = this.y,
         d = this.z,
         e = this.w,
         f = a.x,
         g = a.y,
         h = a.z,
         a = a.w;
      this.x = b * a + e * f + c * h - d * g;
      this.y = c * a + e * g + d * f - b * h;
      this.z = d * a + e * h + b * g - c * f;
      this.w = e * a - b * f - c * g - d * h;
      return this
   },
   multiplyVector3: function (a, b)
   {
      b || (b = a);
      var c = a.x,
         d = a.y,
         e = a.z,
         f = this.x,
         g = this.y,
         h = this.z,
         i = this.w,
         j = i * c + g * e - h * d,
         l = i * d + h * c - f * e,
         m = i * e + f * d - g * c,
         c = -f * c - g * d - h * e;
      b.x = j * i + c * -f + l * -h - m * -g;
      b.y = l * i + c * -g + m * -f - j * -h;
      b.z = m * i + c * -h + j * -g - l * -f;
      return b
   },
   slerpSelf: function (a, b)
   {
      var c = this.x,
         d = this.y,
         e = this.z,
         f = this.w,
         g = f * a.w + c * a.x + d * a.y + e * a.z;
      if (g < 0)
      {
         this.w = -a.w;
         this.x = -a.x;
         this.y = -a.y;
         this.z = -a.z;
         g = -g
      }
      else this.copy(a); if (g >= 1)
      {
         this.w = f;
         this.x = c;
         this.y = d;
         this.z = e;
         return this
      }
      var h = Math.acos(g),
         i = Math.sqrt(1 - g * g);
      if (Math.abs(i) < 0.0010)
      {
         this.w = 0.5 * (f + this.w);
         this.x = 0.5 * (c + this.x);
         this.y = 0.5 * (d + this.y);
         this.z = 0.5 * (e + this.z);
         return this
      }
      g = Math.sin((1 - b) * h) / i;
      h = Math.sin(b * h) / i;
      this.w = f * g + this.w * h;
      this.x = c * g + this.x * h;
      this.y = d * g + this.y * h;
      this.z = e * g + this.z * h;
      return this
   },
   clone: function ()
   {
      return new THREE.Quaternion(this.x, this.y, this.z, this.w)
   }
};
THREE.Quaternion.slerp = function (a, b, c, d)
{
   var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
   if (e < 0)
   {
      c.w = -b.w;
      c.x = -b.x;
      c.y = -b.y;
      c.z = -b.z;
      e = -e
   }
   else c.copy(b); if (Math.abs(e) >= 1)
   {
      c.w = a.w;
      c.x = a.x;
      c.y = a.y;
      c.z = a.z;
      return c
   }
   var b = Math.acos(e),
      f = Math.sqrt(1 - e * e);
   if (Math.abs(f) < 0.0010)
   {
      c.w = 0.5 * (a.w + c.w);
      c.x = 0.5 * (a.x + c.x);
      c.y = 0.5 * (a.y + c.y);
      c.z = 0.5 * (a.z + c.z);
      return c
   }
   e = Math.sin((1 - d) * b) / f;
   d = Math.sin(d * b) / f;
   c.w = a.w * e + c.w * d;
   c.x = a.x * e + c.x * d;
   c.y = a.y * e + c.y * d;
   c.z = a.z * e + c.z * d;
   return c
};
THREE.Vertex = function (a)
{
   console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");
   return a
};
THREE.Face3 = function (a, b, c, d, e, f)
{
   this.a = a;
   this.b = b;
   this.c = c;
   this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3;
   this.vertexNormals = d instanceof Array ? d : [];
   this.color = e instanceof THREE.Color ? e : new THREE.Color;
   this.vertexColors = e instanceof Array ? e : [];
   this.vertexTangents = [];
   this.materialIndex = f;
   this.centroid = new THREE.Vector3
};
THREE.Face3.prototype = {
   constructor: THREE.Face3,
   clone: function ()
   {
      var a = new THREE.Face3(this.a, this.b, this.c);
      a.normal.copy(this.normal);
      a.color.copy(this.color);
      a.centroid.copy(this.centroid);
      a.materialIndex = this.materialIndex;
      var b, c;
      b = 0;
      for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this
         .vertexNormals[b].clone();
      b = 0;
      for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[
         b].clone();
      b = 0;
      for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] =
         this.vertexTangents[b].clone();
      return a
   }
};
THREE.Face4 = function (a, b, c, d, e, f, g)
{
   this.a = a;
   this.b = b;
   this.c = c;
   this.d = d;
   this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
   this.vertexNormals = e instanceof Array ? e : [];
   this.color = f instanceof THREE.Color ? f : new THREE.Color;
   this.vertexColors = f instanceof Array ? f : [];
   this.vertexTangents = [];
   this.materialIndex = g;
   this.centroid = new THREE.Vector3
};
THREE.Face4.prototype = {
   constructor: THREE.Face4,
   clone: function ()
   {
      var a = new THREE.Face4(this.a, this.b, this.c, this.d);
      a.normal.copy(this.normal);
      a.color.copy(this.color);
      a.centroid.copy(this.centroid);
      a.materialIndex = this.materialIndex;
      var b, c;
      b = 0;
      for (c = this.vertexNormals.length; b < c; b++) a.vertexNormals[b] = this
         .vertexNormals[b].clone();
      b = 0;
      for (c = this.vertexColors.length; b < c; b++) a.vertexColors[b] = this.vertexColors[
         b].clone();
      b = 0;
      for (c = this.vertexTangents.length; b < c; b++) a.vertexTangents[b] =
         this.vertexTangents[b].clone();
      return a
   }
};
THREE.UV = function (a, b)
{
   this.u = a || 0;
   this.v = b || 0
};
THREE.UV.prototype = {
   constructor: THREE.UV,
   set: function (a, b)
   {
      this.u = a;
      this.v = b;
      return this
   },
   copy: function (a)
   {
      this.u = a.u;
      this.v = a.v;
      return this
   },
   lerpSelf: function (a, b)
   {
      this.u = this.u + (a.u - this.u) * b;
      this.v = this.v + (a.v - this.v) * b;
      return this
   },
   clone: function ()
   {
      return new THREE.UV(this.u, this.v)
   }
};
THREE.Geometry = function ()
{
   this.id = THREE.GeometryCount++;
   this.name = "";
   this.vertices = [];
   this.colors = [];
   this.materials = [];
   this.faces = [];
   this.faceUvs = [
      []
   ];
   this.faceVertexUvs = [
      []
   ];
   this.morphTargets = [];
   this.morphColors = [];
   this.morphNormals = [];
   this.skinWeights = [];
   this.skinIndices = [];
   this.boundingSphere = this.boundingBox = null;
   this.dynamic = this.hasTangents = false
};
THREE.Geometry.prototype = {
   constructor: THREE.Geometry,
   applyMatrix: function (a)
   {
      var b = new THREE.Matrix4;
      b.extractRotation(a);
      for (var c = 0, d = this.vertices.length; c < d; c++) a.multiplyVector3(
         this.vertices[c]);
      c = 0;
      for (d = this.faces.length; c < d; c++)
      {
         var e = this.faces[c];
         b.multiplyVector3(e.normal);
         for (var f = 0, g = e.vertexNormals.length; f < g; f++) b.multiplyVector3(
            e.vertexNormals[f]);
         a.multiplyVector3(e.centroid)
      }
   },
   computeCentroids: function ()
   {
      var a, b, c;
      a = 0;
      for (b = this.faces.length; a < b; a++)
      {
         c = this.faces[a];
         c.centroid.set(0,
            0, 0);
         if (c instanceof THREE.Face3)
         {
            c.centroid.addSelf(this.vertices[c.a]);
            c.centroid.addSelf(this.vertices[c.b]);
            c.centroid.addSelf(this.vertices[c.c]);
            c.centroid.divideScalar(3)
         }
         else if (c instanceof THREE.Face4)
         {
            c.centroid.addSelf(this.vertices[c.a]);
            c.centroid.addSelf(this.vertices[c.b]);
            c.centroid.addSelf(this.vertices[c.c]);
            c.centroid.addSelf(this.vertices[c.d]);
            c.centroid.divideScalar(4)
         }
      }
   },
   computeFaceNormals: function ()
   {
      var a, b, c, d, e, f, g = new THREE.Vector3,
         h = new THREE.Vector3;
      a = 0;
      for (b = this.faces.length; a <
         b; a++)
      {
         c = this.faces[a];
         d = this.vertices[c.a];
         e = this.vertices[c.b];
         f = this.vertices[c.c];
         g.sub(f, e);
         h.sub(d, e);
         g.crossSelf(h);
         g.isZero() || g.normalize();
         c.normal.copy(g)
      }
   },
   computeVertexNormals: function ()
   {
      var a, b, c, d;
      if (this.__tmpVertices === void 0)
      {
         d = this.__tmpVertices = Array(this.vertices.length);
         a = 0;
         for (b = this.vertices.length; a < b; a++) d[a] = new THREE.Vector3;
         a = 0;
         for (b = this.faces.length; a < b; a++)
         {
            c = this.faces[a];
            if (c instanceof THREE.Face3) c.vertexNormals = [new THREE.Vector3,
               new THREE.Vector3, new THREE.Vector3
            ];
            else if (c instanceof THREE.Face4) c.vertexNormals = [new THREE.Vector3,
               new THREE.Vector3, new THREE.Vector3, new THREE.Vector3
            ]
         }
      }
      else
      {
         d = this.__tmpVertices;
         a = 0;
         for (b = this.vertices.length; a < b; a++) d[a].set(0, 0, 0)
      }
      a = 0;
      for (b = this.faces.length; a < b; a++)
      {
         c = this.faces[a];
         if (c instanceof THREE.Face3)
         {
            d[c.a].addSelf(c.normal);
            d[c.b].addSelf(c.normal);
            d[c.c].addSelf(c.normal)
         }
         else if (c instanceof THREE.Face4)
         {
            d[c.a].addSelf(c.normal);
            d[c.b].addSelf(c.normal);
            d[c.c].addSelf(c.normal);
            d[c.d].addSelf(c.normal)
         }
      }
      a = 0;
      for (b = this.vertices.length; a < b; a++) d[a].normalize();
      a = 0;
      for (b = this.faces.length; a < b; a++)
      {
         c = this.faces[a];
         if (c instanceof THREE.Face3)
         {
            c.vertexNormals[0].copy(d[c.a]);
            c.vertexNormals[1].copy(d[c.b]);
            c.vertexNormals[2].copy(d[c.c])
         }
         else if (c instanceof THREE.Face4)
         {
            c.vertexNormals[0].copy(d[c.a]);
            c.vertexNormals[1].copy(d[c.b]);
            c.vertexNormals[2].copy(d[c.c]);
            c.vertexNormals[3].copy(d[c.d])
         }
      }
   },
   computeMorphNormals: function ()
   {
      var a, b, c, d, e;
      c = 0;
      for (d = this.faces.length; c < d; c++)
      {
         e = this.faces[c];
         e.__originalFaceNormal ?
            e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal
            .clone();
         if (!e.__originalVertexNormals) e.__originalVertexNormals = [];
         a = 0;
         for (b = e.vertexNormals.length; a < b; a++) e.__originalVertexNormals[
            a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[
            a] = e.vertexNormals[a].clone()
      }
      var f = new THREE.Geometry;
      f.faces = this.faces;
      a = 0;
      for (b = this.morphTargets.length; a < b; a++)
      {
         if (!this.morphNormals[a])
         {
            this.morphNormals[a] = {};
            this.morphNormals[a].faceNormals = [];
            this.morphNormals[a].vertexNormals = [];
            var g = this.morphNormals[a].faceNormals,
               h = this.morphNormals[a].vertexNormals,
               i, j;
            c = 0;
            for (d = this.faces.length; c < d; c++)
            {
               e = this.faces[c];
               i = new THREE.Vector3;
               j = e instanceof THREE.Face3 ?
               {
                  a: new THREE.Vector3,
                  b: new THREE.Vector3,
                  c: new THREE.Vector3
               } :
               {
                  a: new THREE.Vector3,
                  b: new THREE.Vector3,
                  c: new THREE.Vector3,
                  d: new THREE.Vector3
               };
               g.push(i);
               h.push(j)
            }
         }
         g = this.morphNormals[a];
         f.vertices = this.morphTargets[a].vertices;
         f.computeFaceNormals();
         f.computeVertexNormals();
         c = 0;
         for (d = this.faces.length; c < d; c++)
         {
            e = this.faces[c];
            i = g.faceNormals[c];
            j = g.vertexNormals[c];
            i.copy(e.normal);
            if (e instanceof THREE.Face3)
            {
               j.a.copy(e.vertexNormals[0]);
               j.b.copy(e.vertexNormals[1]);
               j.c.copy(e.vertexNormals[2])
            }
            else
            {
               j.a.copy(e.vertexNormals[0]);
               j.b.copy(e.vertexNormals[1]);
               j.c.copy(e.vertexNormals[2]);
               j.d.copy(e.vertexNormals[3])
            }
         }
      }
      c = 0;
      for (d = this.faces.length; c < d; c++)
      {
         e = this.faces[c];
         e.normal = e.__originalFaceNormal;
         e.vertexNormals = e.__originalVertexNormals
      }
   },
   computeTangents: function ()
   {
      function a(a, b, c, d, f, e, z)
      {
         h = a.vertices[b];
         i = a.vertices[c];
         j = a.vertices[d];
         l = g[f];
         m = g[e];
         n = g[z];
         p = i.x - h.x;
         r = j.x - h.x;
         o = i.y - h.y;
         q = j.y - h.y;
         s = i.z - h.z;
         w = j.z - h.z;
         t = m.u - l.u;
         v = n.u - l.u;
         x = m.v - l.v;
         C = n.v - l.v;
         D = 1 / (t * C - v * x);
         J.set((C * p - x * r) * D, (C * o - x * q) * D, (C * s - x * w) * D);
         M.set((t * r - v * p) * D, (t * q - v * o) * D, (t * w - v * s) * D);
         u[b].addSelf(J);
         u[c].addSelf(J);
         u[d].addSelf(J);
         G[b].addSelf(M);
         G[c].addSelf(M);
         G[d].addSelf(M)
      }
      var b, c, d, e, f, g, h, i, j, l, m, n, p, r, o, q, s, w, t, v, x, C, D,
            z, u = [],
         G = [],
         J = new THREE.Vector3,
         M = new THREE.Vector3,
         O = new THREE.Vector3,
         X = new THREE.Vector3,
         B = new THREE.Vector3;
      b = 0;
      for (c =
         this.vertices.length; b < c; b++)
      {
         u[b] = new THREE.Vector3;
         G[b] = new THREE.Vector3
      }
      b = 0;
      for (c = this.faces.length; b < c; b++)
      {
         f = this.faces[b];
         g = this.faceVertexUvs[0][b];
         if (f instanceof THREE.Face3) a(this, f.a, f.b, f.c, 0, 1, 2);
         else if (f instanceof THREE.Face4)
         {
            a(this, f.a, f.b, f.d, 0, 1, 3);
            a(this, f.b, f.c, f.d, 1, 2, 3)
         }
      }
      var F = ["a", "b", "c", "d"];
      b = 0;
      for (c = this.faces.length; b < c; b++)
      {
         f = this.faces[b];
         for (d = 0; d < f.vertexNormals.length; d++)
         {
            B.copy(f.vertexNormals[d]);
            e = f[F[d]];
            z = u[e];
            O.copy(z);
            O.subSelf(B.multiplyScalar(B.dot(z))).normalize();
            X.cross(f.vertexNormals[d], z);
            e = X.dot(G[e]);
            e = e < 0 ? -1 : 1;
            f.vertexTangents[d] = new THREE.Vector4(O.x, O.y, O.z, e)
         }
      }
      this.hasTangents = true
   },
   computeBoundingBox: function ()
   {
      if (!this.boundingBox) this.boundingBox = {
         min: new THREE.Vector3,
         max: new THREE.Vector3
      };
      if (this.vertices.length > 0)
      {
         var a;
         a = this.vertices[0];
         this.boundingBox.min.copy(a);
         this.boundingBox.max.copy(a);
         for (var b = this.boundingBox.min, c = this.boundingBox.max, d = 1, e =
               this.vertices.length; d < e; d++)
         {
            a = this.vertices[d];
            if (a.x < b.x) b.x = a.x;
            else if (a.x > c.x) c.x =
               a.x;
            if (a.y < b.y) b.y = a.y;
            else if (a.y > c.y) c.y = a.y;
            if (a.z < b.z) b.z = a.z;
            else if (a.z > c.z) c.z = a.z
         }
      }
      else
      {
         this.boundingBox.min.set(0, 0, 0);
         this.boundingBox.max.set(0, 0, 0)
      }
   },
   computeBoundingSphere: function ()
   {
      if (!this.boundingSphere) this.boundingSphere = {
         radius: 0
      };
      for (var a, b = 0, c = 0, d = this.vertices.length; c < d; c++)
      {
         a = this.vertices[c].length();
         a > b && (b = a)
      }
      this.boundingSphere.radius = b
   },
   mergeVertices: function ()
   {
      var a = {}, b = [],
         c = [],
         d, e = Math.pow(10, 4),
         f, g, h, i;
      f = 0;
      for (g = this.vertices.length; f < g; f++)
      {
         d = this.vertices[f];
         d = [Math.round(d.x * e), Math.round(d.y * e), Math.round(d.z * e)].join(
            "_");
         if (a[d] === void 0)
         {
            a[d] = f;
            b.push(this.vertices[f]);
            c[f] = b.length - 1
         }
         else c[f] = c[a[d]]
      }
      f = 0;
      for (g = this.faces.length; f < g; f++)
      {
         a = this.faces[f];
         if (a instanceof THREE.Face3)
         {
            a.a = c[a.a];
            a.b = c[a.b];
            a.c = c[a.c]
         }
         else if (a instanceof THREE.Face4)
         {
            a.a = c[a.a];
            a.b = c[a.b];
            a.c = c[a.c];
            a.d = c[a.d];
            d = [a.a, a.b, a.c, a.d];
            for (e = 3; e > 0; e--)
               if (d.indexOf(a["abcd" [e]]) !== e)
               {
                  d.splice(e, 1);
                  this.faces[f] = new THREE.Face3(d[0], d[1], d[2], a.normal, a
                     .color, a.materialIndex);
                  d = 0;
                  for (h = this.faceVertexUvs.length; d < h; d++)(i = this.faceVertexUvs[
                     d][f]) && i.splice(e, 1);
                  this.faces[f].vertexColors = a.vertexColors;
                  break
               }
         }
      }
      c = this.vertices.length - b.length;
      this.vertices = b;
      return c
   }
};
THREE.GeometryCount = 0;
THREE.Spline = function (a)
{
   function b(a, b, c, d, f, e, g)
   {
      a = (c - a) * 0.5;
      d = (d - b) * 0.5;
      return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * e + a * f +
         b
   }
   this.points = a;
   var c = [],
      d = {
         x: 0,
         y: 0,
         z: 0
      }, e, f, g, h, i, j, l, m, n;
   this.initFromArray = function (a)
   {
      this.points = [];
      for (var b = 0; b < a.length; b++) this.points[b] = {
         x: a[b][0],
         y: a[b][1],
         z: a[b][2]
      }
   };
   this.getPoint = function (a)
   {
      e = (this.points.length - 1) * a;
      f = Math.floor(e);
      g = e - f;
      c[0] = f === 0 ? f : f - 1;
      c[1] = f;
      c[2] = f > this.points.length - 2 ? this.points.length - 1 : f + 1;
      c[3] = f > this.points.length - 3 ? this.points.length - 1 :
         f + 2;
      j = this.points[c[0]];
      l = this.points[c[1]];
      m = this.points[c[2]];
      n = this.points[c[3]];
      h = g * g;
      i = g * h;
      d.x = b(j.x, l.x, m.x, n.x, g, h, i);
      d.y = b(j.y, l.y, m.y, n.y, g, h, i);
      d.z = b(j.z, l.z, m.z, n.z, g, h, i);
      return d
   };
   this.getControlPointsArray = function ()
   {
      var a, b, c = this.points.length,
         d = [];
      for (a = 0; a < c; a++)
      {
         b = this.points[a];
         d[a] = [b.x, b.y, b.z]
      }
      return d
   };
   this.getLength = function (a)
   {
      var b, c, d, f = b = b = 0,
         e = new THREE.Vector3,
         g = new THREE.Vector3,
         h = [],
         i = 0;
      h[0] = 0;
      a || (a = 100);
      c = this.points.length * a;
      e.copy(this.points[0]);
      for (a = 1; a < c; a++)
      {
         b =
            a / c;
         d = this.getPoint(b);
         g.copy(d);
         i = i + g.distanceTo(e);
         e.copy(d);
         b = (this.points.length - 1) * b;
         b = Math.floor(b);
         if (b != f)
         {
            h[b] = i;
            f = b
         }
      }
      h[h.length] = i;
      return {
         chunks: h,
         total: i
      }
   };
   this.reparametrizeByArcLength = function (a)
   {
      var b, c, d, f, e, g, h = [],
         i = new THREE.Vector3,
         j = this.getLength();
      h.push(i.copy(this.points[0]).clone());
      for (b = 1; b < this.points.length; b++)
      {
         c = j.chunks[b] - j.chunks[b - 1];
         g = Math.ceil(a * c / j.total);
         f = (b - 1) / (this.points.length - 1);
         e = b / (this.points.length - 1);
         for (c = 1; c < g - 1; c++)
         {
            d = f + c * (1 / g) * (e - f);
            d = this.getPoint(d);
            h.push(i.copy(d).clone())
         }
         h.push(i.copy(this.points[b]).clone())
      }
      this.points = h
   }
};
THREE.Camera = function ()
{
   THREE.Object3D.call(this);
   this.matrixWorldInverse = new THREE.Matrix4;
   this.projectionMatrix = new THREE.Matrix4;
   this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function (a)
{
   this.matrix.lookAt(this.position, a, this.up);
   this.rotationAutoUpdate === true && this.rotation.setEulerFromRotationMatrix(
      this.matrix, this.eulerOrder)
};
THREE.OrthographicCamera = function (a, b, c, d, e, f)
{
   THREE.Camera.call(this);
   this.left = a;
   this.right = b;
   this.top = c;
   this.bottom = d;
   this.near = e !== void 0 ? e : 0.1;
   this.far = f !== void 0 ? f : 2E3;
   this.updateProjectionMatrix()
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function ()
{
   this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this
      .bottom, this.near, this.far)
};
THREE.PerspectiveCamera = function (a, b, c, d)
{
   THREE.Camera.call(this);
   this.fov = a !== void 0 ? a : 50;
   this.aspect = b !== void 0 ? b : 1;
   this.near = c !== void 0 ? c : 0.1;
   this.far = d !== void 0 ? d : 2E3;
   this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function (a, b)
{
   this.fov = 2 * Math.atan((b !== void 0 ? b : 24) / (a * 2)) * (180 / Math.PI);
   this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, e, f)
{
   this.fullWidth = a;
   this.fullHeight = b;
   this.x = c;
   this.y = d;
   this.width = e;
   this.height = f;
   this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function ()
{
   if (this.fullWidth)
   {
      var a = this.fullWidth / this.fullHeight,
         b = Math.tan(this.fov * Math.PI / 360) * this.near,
         c = -b,
         d = a * c,
         a = Math.abs(a * b - d),
         c = Math.abs(b - c);
      this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (
            this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) *
         c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this
         .far)
   }
   else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near,
      this.far)
};
THREE.Light = function (a)
{
   THREE.Object3D.call(this);
   this.color = new THREE.Color(a)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.AmbientLight = function (a)
{
   THREE.Light.call(this, a)
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function (a, b, c)
{
   THREE.Light.call(this, a);
   this.position = new THREE.Vector3(0, 1, 0);
   this.target = new THREE.Object3D;
   this.intensity = b !== void 0 ? b : 1;
   this.distance = c !== void 0 ? c : 0;
   this.onlyShadow = this.castShadow = false;
   this.shadowCameraNear = 50;
   this.shadowCameraFar = 5E3;
   this.shadowCameraLeft = -500;
   this.shadowCameraTop = this.shadowCameraRight = 500;
   this.shadowCameraBottom = -500;
   this.shadowCameraVisible = false;
   this.shadowBias = 0;
   this.shadowDarkness = 0.5;
   this.shadowMapHeight = this.shadowMapWidth = 512;
   this.shadowCascade = false;
   this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1E3);
   this.shadowCascadeCount = 2;
   this.shadowCascadeBias = [0, 0, 0];
   this.shadowCascadeWidth = [512, 512, 512];
   this.shadowCascadeHeight = [512, 512, 512];
   this.shadowCascadeNearZ = [-1, 0.99, 0.998];
   this.shadowCascadeFarZ = [0.99, 0.998, 1];
   this.shadowCascadeArray = [];
   this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap =
      null
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight = function (a, b, c)
{
   THREE.Light.call(this, a);
   this.position = new THREE.Vector3(0, 0, 0);
   this.intensity = b !== void 0 ? b : 1;
   this.distance = c !== void 0 ? c : 0
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight = function (a, b, c, d, e)
{
   THREE.Light.call(this, a);
   this.position = new THREE.Vector3(0, 1, 0);
   this.target = new THREE.Object3D;
   this.intensity = b !== void 0 ? b : 1;
   this.distance = c !== void 0 ? c : 0;
   this.angle = d !== void 0 ? d : Math.PI / 2;
   this.exponent = e !== void 0 ? e : 10;
   this.onlyShadow = this.castShadow = false;
   this.shadowCameraNear = 50;
   this.shadowCameraFar = 5E3;
   this.shadowCameraFov = 50;
   this.shadowCameraVisible = false;
   this.shadowBias = 0;
   this.shadowDarkness = 0.5;
   this.shadowMapHeight = this.shadowMapWidth = 512;
   this.shadowMatrix =
      this.shadowCamera = this.shadowMapSize = this.shadowMap = null
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.Loader = function (a)
{
   this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() :
      null;
   this.onLoadStart = function () {};
   this.onLoadProgress = function () {};
   this.onLoadComplete = function () {}
};
THREE.Loader.prototype = {
   constructor: THREE.Loader,
   crossOrigin: "anonymous",
   addStatusElement: function ()
   {
      var a = document.createElement("div");
      a.style.position = "absolute";
      a.style.right = "0px";
      a.style.top = "0px";
      a.style.fontSize = "0.8em";
      a.style.textAlign = "left";
      a.style.background = "rgba(0,0,0,0.25)";
      a.style.color = "#fff";
      a.style.width = "120px";
      a.style.padding = "0.5em 0.5em 0.5em 0.5em";
      a.style.zIndex = 1E3;
      a.innerHTML = "Loading ...";
      return a
   },
   updateProgress: function (a)
   {
      var b = "Loaded ",
         b = a.total ? b + ((100 * a.loaded /
            a.total).toFixed(0) + "%") : b + ((a.loaded / 1E3).toFixed(2) +
            " KB");
      this.statusDomElement.innerHTML = b
   },
   extractUrlBase: function (a)
   {
      a = a.split("/");
      a.pop();
      return (a.length < 1 ? "." : a.join("/")) + "/"
   },
   initMaterials: function (a, b, c)
   {
      a.materials = [];
      for (var d = 0; d < b.length; ++d) a.materials[d] = THREE.Loader.prototype
         .createMaterial(b[d], c)
   },
   hasNormals: function (a)
   {
      var b, c, d = a.materials.length;
      for (c = 0; c < d; c++)
      {
         b = a.materials[c];
         if (b instanceof THREE.ShaderMaterial) return true
      }
      return false
   },
   createMaterial: function (a, b)
   {
      function c(a)
      {
         a =
            Math.log(a) / Math.LN2;
         return Math.floor(a) == a
      }

      function d(a)
      {
         a = Math.log(a) / Math.LN2;
         return Math.pow(2, Math.round(a))
      }

      function e(a, b)
      {
         var f = new Image;
         f.onload = function ()
         {
            if (!c(this.width) || !c(this.height))
            {
               var b = d(this.width),
                  f = d(this.height);
               a.image.width = b;
               a.image.height = f;
               a.image.getContext("2d").drawImage(this, 0, 0, b, f)
            }
            else a.image = this;
            a.needsUpdate = true
         };
         f.crossOrigin = h.crossOrigin;
         f.src = b
      }

      function f(a, c, d, f, g, h)
      {
         var i = document.createElement("canvas");
         a[c] = new THREE.Texture(i);
         a[c].sourceFile =
            d;
         if (f)
         {
            a[c].repeat.set(f[0], f[1]);
            if (f[0] != 1) a[c].wrapS = THREE.RepeatWrapping;
            if (f[1] != 1) a[c].wrapT = THREE.RepeatWrapping
         }
         g && a[c].offset.set(g[0], g[1]);
         if (h)
         {
            f = {
               repeat: THREE.RepeatWrapping,
               mirror: THREE.MirroredRepeatWrapping
            };
            if (f[h[0]] !== void 0) a[c].wrapS = f[h[0]];
            if (f[h[1]] !== void 0) a[c].wrapT = f[h[1]]
         }
         e(a[c], b + "/" + d)
      }

      function g(a)
      {
         return (a[0] * 255 << 16) + (a[1] * 255 << 8) + a[2] * 255
      }
      var h = this,
         i = "MeshLambertMaterial",
         j = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            normalMap: null,
            wireframe: a.wireframe
         };
      if (a.shading)
      {
         var l = a.shading.toLowerCase();
         l === "phong" ? i = "MeshPhongMaterial" : l === "basic" && (i =
            "MeshBasicMaterial")
      }
      if (a.blending !== void 0 && THREE[a.blending] !== void 0) j.blending =
         THREE[a.blending];
      if (a.transparent !== void 0 || a.opacity < 1) j.transparent = a.transparent;
      if (a.depthTest !== void 0) j.depthTest = a.depthTest;
      if (a.depthWrite !== void 0) j.depthWrite = a.depthWrite;
      if (a.vertexColors !== void 0)
         if (a.vertexColors == "face") j.vertexColors = THREE.FaceColors;
         else if (a.vertexColors) j.vertexColors = THREE.VertexColors;
      if (a.colorDiffuse) j.color = g(a.colorDiffuse);
      else if (a.DbgColor) j.color = a.DbgColor;
      if (a.colorSpecular) j.specular = g(a.colorSpecular);
      if (a.colorAmbient) j.ambient = g(a.colorAmbient);
      if (a.transparency) j.opacity = a.transparency;
      if (a.specularCoef) j.shininess = a.specularCoef;
      a.mapDiffuse && b && f(j, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset,
         a.mapDiffuseWrap);
      a.mapLight && b && f(j, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset,
         a.mapLightWrap);
      a.mapNormal && b && f(j, "normalMap", a.mapNormal, a.mapNormalRepeat,
         a.mapNormalOffset, a.mapNormalWrap);
      a.mapSpecular && b && f(j, "specularMap", a.mapSpecular, a.mapSpecularRepeat,
         a.mapSpecularOffset, a.mapSpecularWrap);
      if (a.mapNormal)
      {
         i = THREE.ShaderUtils.lib.normal;
         l = THREE.UniformsUtils.clone(i.uniforms);
         l.tNormal.texture = j.normalMap;
         if (a.mapNormalFactor) l.uNormalScale.value = a.mapNormalFactor;
         if (j.map)
         {
            l.tDiffuse.texture = j.map;
            l.enableDiffuse.value = true
         }
         if (j.specularMap)
         {
            l.tSpecular.texture = j.specularMap;
            l.enableSpecular.value = true
         }
         if (j.lightMap)
         {
            l.tAO.texture = j.lightMap;
            l.enableAO.value = true
         }
         l.uDiffuseColor.value.setHex(j.color);
         l.uSpecularColor.value.setHex(j.specular);
         l.uAmbientColor.value.setHex(j.ambient);
         l.uShininess.value = j.shininess;
         if (j.opacity !== void 0) l.uOpacity.value = j.opacity;
         j = new THREE.ShaderMaterial(
         {
            fragmentShader: i.fragmentShader,
            vertexShader: i.vertexShader,
            uniforms: l,
            lights: true,
            fog: true
         })
      }
      else j = new THREE[i](j); if (a.DbgName !== void 0) j.name = a.DbgName;
      return j
   }
};
THREE.BinaryLoader = function (a)
{
   THREE.Loader.call(this, a)
};
THREE.BinaryLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.BinaryLoader.prototype.load = function (a, b, c, d)
{
   var c = c ? c : this.extractUrlBase(a),
      d = d ? d : this.extractUrlBase(a),
      e = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
   this.onLoadStart();
   this.loadAjaxJSON(this, a, b, c, d, e)
};
THREE.BinaryLoader.prototype.loadAjaxJSON = function (a, b, c, d, e, f)
{
   var g = new XMLHttpRequest;
   g.onreadystatechange = function ()
   {
      if (g.readyState == 4)
         if (g.status == 200 || g.status == 0)
         {
            var h = JSON.parse(g.responseText);
            a.loadAjaxBuffers(h, c, e, d, f)
         }
         else console.error("THREE.BinaryLoader: Couldn't load [" + b + "] [" +
            g.status + "]")
   };
   g.open("GET", b, true);
   g.overrideMimeType && g.overrideMimeType(
      "text/plain; charset=x-user-defined");
   g.setRequestHeader("Content-Type", "text/plain");
   g.send(null)
};
THREE.BinaryLoader.prototype.loadAjaxBuffers = function (a, b, c, d, e)
{
   var f = new XMLHttpRequest,
      g = c + "/" + a.buffers,
      h = 0;
   f.onreadystatechange = function ()
   {
      if (f.readyState == 4) f.status == 200 || f.status == 0 ? THREE.BinaryLoader
         .prototype.createBinModel(f.response, b, d, a.materials) : console.error(
            "THREE.BinaryLoader: Couldn't load [" + g + "] [" + f.status + "]");
      else if (f.readyState == 3)
      {
         if (e)
         {
            h == 0 && (h = f.getResponseHeader("Content-Length"));
            e(
            {
               total: h,
               loaded: f.responseText.length
            })
         }
      }
      else f.readyState == 2 && (h = f.getResponseHeader("Content-Length"))
   };
   f.open("GET", g, true);
   f.responseType = "arraybuffer";
   f.send(null)
};
THREE.BinaryLoader.prototype.createBinModel = function (a, b, c, d)
{
   var e = function (b)
   {
      var c, e, i, j, l, m, n, p, r, o, q, s, w, t, v;

      function x(a)
      {
         return a % 4 ? 4 - a % 4 : 0
      }

      function C(a, b)
      {
         return (new Uint8Array(a, b, 1))[0]
      }

      function D(a, b)
      {
         return (new Uint32Array(a, b, 1))[0]
      }

      function z(b, c)
      {
         var d, f, e, g, h, i, j, l, m = new Uint32Array(a, c, 3 * b);
         for (d = 0; d < b; d++)
         {
            f = m[d * 3];
            e = m[d * 3 + 1];
            g = m[d * 3 + 2];
            h = Q[f * 2];
            f = Q[f * 2 + 1];
            i = Q[e * 2];
            j = Q[e * 2 + 1];
            e = Q[g * 2];
            l = Q[g * 2 + 1];
            g = X.faceVertexUvs[0];
            var n = [];
            n.push(new THREE.UV(h, f));
            n.push(new THREE.UV(i, j));
            n.push(new THREE.UV(e,
               l));
            g.push(n)
         }
      }

      function u(b, c)
      {
         var d, f, e, g, h, i, j, l, m, n, o = new Uint32Array(a, c, 4 * b);
         for (d = 0; d < b; d++)
         {
            f = o[d * 4];
            e = o[d * 4 + 1];
            g = o[d * 4 + 2];
            h = o[d * 4 + 3];
            i = Q[f * 2];
            f = Q[f * 2 + 1];
            j = Q[e * 2];
            m = Q[e * 2 + 1];
            l = Q[g * 2];
            n = Q[g * 2 + 1];
            g = Q[h * 2];
            e = Q[h * 2 + 1];
            h = X.faceVertexUvs[0];
            var p = [];
            p.push(new THREE.UV(i, f));
            p.push(new THREE.UV(j, m));
            p.push(new THREE.UV(l, n));
            p.push(new THREE.UV(g, e));
            h.push(p)
         }
      }

      function G(b, c, d)
      {
         for (var f, e, g, h, c = new Uint32Array(a, c, 3 * b), i = new Uint16Array(
               a, d, b), d = 0; d < b; d++)
         {
            f = c[d * 3];
            e = c[d * 3 + 1];
            g = c[d * 3 + 2];
            h = i[d];
            X.faces.push(new THREE.Face3(f, e, g, null, null, h))
         }
      }

      function J(b, c, d)
      {
         for (var f, e, g, h, i, c = new Uint32Array(a, c, 4 * b), j = new Uint16Array(
               a, d, b), d = 0; d < b; d++)
         {
            f = c[d * 4];
            e = c[d * 4 + 1];
            g = c[d * 4 + 2];
            h = c[d * 4 + 3];
            i = j[d];
            X.faces.push(new THREE.Face4(f, e, g, h, null, null, i))
         }
      }

      function M(b, c, d, f)
      {
         for (var e, g, h, i, j, l, m, c = new Uint32Array(a, c, 3 * b), d =
               new Uint32Array(a, d, 3 * b), n = new Uint16Array(a, f, b), f =
               0; f < b; f++)
         {
            e = c[f * 3];
            g = c[f * 3 + 1];
            h = c[f * 3 + 2];
            j = d[f * 3];
            l = d[f * 3 + 1];
            m = d[f * 3 + 2];
            i = n[f];
            var o = F[l * 3],
               p = F[l * 3 + 1];
            l = F[l * 3 + 2];
            var r = F[m * 3],
               q = F[m * 3 + 1];
            m = F[m * 3 + 2];
            X.faces.push(new THREE.Face3(e, g, h, [new THREE.Vector3(F[j * 3],
                  F[j * 3 + 1], F[j * 3 + 2]), new THREE.Vector3(o, p, l),
               new THREE.Vector3(r, q, m)
            ], null, i))
         }
      }

      function O(b, c, d, f)
      {
         for (var e, g, h, i, j, l, m, n, o, c = new Uint32Array(a, c, 4 * b),
               d = new Uint32Array(a, d, 4 * b), p = new Uint16Array(a, f, b),
               f = 0; f < b; f++)
         {
            e = c[f * 4];
            g = c[f * 4 + 1];
            h = c[f * 4 + 2];
            i = c[f * 4 + 3];
            l = d[f * 4];
            m = d[f * 4 + 1];
            n = d[f * 4 + 2];
            o = d[f * 4 + 3];
            j = p[f];
            var r = F[m * 3],
               q = F[m * 3 + 1];
            m = F[m * 3 + 2];
            var s = F[n * 3],
               u = F[n * 3 + 1];
            n = F[n * 3 + 2];
            var t = F[o * 3],
               v = F[o * 3 + 1];
            o = F[o * 3 + 2];
            X.faces.push(new THREE.Face4(e,
               g, h, i, [new THREE.Vector3(F[l * 3], F[l * 3 + 1], F[l * 3 +
                  2]), new THREE.Vector3(r, q, m), new THREE.Vector3(s, u,
                  n), new THREE.Vector3(t, v, o)], null, j))
         }
      }
      var X = this,
         B = 0,
         F = [],
         Q = [],
         E, aa, T;
      THREE.Geometry.call(this);
      THREE.Loader.prototype.initMaterials(X, d, b);
      (function (a, b, c)
      {
         for (var a = new Uint8Array(a, b, c), d = "", f = 0; f < c; f++) d =
            d + String.fromCharCode(a[b + f]);
         return d
      })(a, B, 12);
      c = C(a, B + 12);
      C(a, B + 13);
      C(a, B + 14);
      C(a, B + 15);
      e = C(a, B + 16);
      i = C(a, B + 17);
      j = C(a, B + 18);
      l = C(a, B + 19);
      m = D(a, B + 20);
      n = D(a, B + 20 + 4);
      p = D(a, B + 20 + 8);
      b = D(a, B + 20 + 12);
      r = D(a, B + 20 + 16);
      o = D(a, B + 20 + 20);
      q = D(a, B + 20 + 24);
      s = D(a, B + 20 + 28);
      w = D(a, B + 20 + 32);
      t = D(a, B + 20 + 36);
      v = D(a, B + 20 + 40);
      B = B + c;
      c = e * 3 + l;
      T = e * 4 + l;
      E = b * c;
      aa = r * (c + i * 3);
      e = o * (c + j * 3);
      l = q * (c + i * 3 + j * 3);
      c = s * T;
      i = w * (T + i * 4);
      j = t * (T + j * 4);
      B = B + function (b)
      {
         var b = new Float32Array(a, b, m * 3),
            c, d, f, e;
         for (c = 0; c < m; c++)
         {
            d = b[c * 3];
            f = b[c * 3 + 1];
            e = b[c * 3 + 2];
            X.vertices.push(new THREE.Vector3(d, f, e))
         }
         return m * 3 * Float32Array.BYTES_PER_ELEMENT
      }(B);
      B = B + function (b)
      {
         if (n)
         {
            var b = new Int8Array(a, b, n * 3),
               c, d, f, e;
            for (c = 0; c < n; c++)
            {
               d = b[c * 3];
               f = b[c * 3 + 1];
               e = b[c * 3 + 2];
               F.push(d / 127, f / 127, e / 127)
            }
         }
         return n * 3 * Int8Array.BYTES_PER_ELEMENT
      }(B);
      B = B + x(n * 3);
      B = B + function (b)
      {
         if (p)
         {
            var b = new Float32Array(a, b, p * 2),
               c, d, f;
            for (c = 0; c < p; c++)
            {
               d = b[c * 2];
               f = b[c * 2 + 1];
               Q.push(d, f)
            }
         }
         return p * 2 * Float32Array.BYTES_PER_ELEMENT
      }(B);
      E = B + E + x(b * 2);
      aa = E + aa + x(r * 2);
      e = aa + e + x(o * 2);
      l = e + l + x(q * 2);
      c = l + c + x(s * 2);
      i = c + i + x(w * 2);
      j = i + j + x(t * 2);
      (function (a)
      {
         if (o)
         {
            var b = a + o * Uint32Array.BYTES_PER_ELEMENT * 3;
            G(o, a, b + o * Uint32Array.BYTES_PER_ELEMENT * 3);
            z(o, b)
         }
      })(aa);
      (function (a)
      {
         if (q)
         {
            var b = a + q * Uint32Array.BYTES_PER_ELEMENT *
               3,
               c = b + q * Uint32Array.BYTES_PER_ELEMENT * 3;
            M(q, a, b, c + q * Uint32Array.BYTES_PER_ELEMENT * 3);
            z(q, c)
         }
      })(e);
      (function (a)
      {
         if (t)
         {
            var b = a + t * Uint32Array.BYTES_PER_ELEMENT * 4;
            J(t, a, b + t * Uint32Array.BYTES_PER_ELEMENT * 4);
            u(t, b)
         }
      })(i);
      (function (a)
      {
         if (v)
         {
            var b = a + v * Uint32Array.BYTES_PER_ELEMENT * 4,
               c = b + v * Uint32Array.BYTES_PER_ELEMENT * 4;
            O(v, a, b, c + v * Uint32Array.BYTES_PER_ELEMENT * 4);
            u(v, c)
         }
      })(j);
      b && G(b, B, B + b * Uint32Array.BYTES_PER_ELEMENT * 3);
      (function (a)
      {
         if (r)
         {
            var b = a + r * Uint32Array.BYTES_PER_ELEMENT * 3;
            M(r, a, b, b + r * Uint32Array.BYTES_PER_ELEMENT *
               3)
         }
      })(E);
      s && J(s, l, l + s * Uint32Array.BYTES_PER_ELEMENT * 4);
      (function (a)
      {
         if (w)
         {
            var b = a + w * Uint32Array.BYTES_PER_ELEMENT * 4;
            O(w, a, b, b + w * Uint32Array.BYTES_PER_ELEMENT * 4)
         }
      })(c);
      this.computeCentroids();
      this.computeFaceNormals();
      THREE.Loader.prototype.hasNormals(this) && this.computeTangents()
   };
   e.prototype = Object.create(THREE.Geometry.prototype);
   b(new e(c))
};
THREE.ImageLoader = function ()
{
   THREE.EventTarget.call(this);
   this.crossOrigin = null
};
THREE.ImageLoader.prototype = {
   constructor: THREE.ImageLoader,
   load: function (a)
   {
      var b = this,
         c = new Image;
      c.addEventListener("load", function ()
      {
         b.dispatchEvent(
         {
            type: "load",
            content: c
         })
      }, false);
      c.addEventListener("error", function ()
      {
         b.dispatchEvent(
         {
            type: "error",
            message: "Couldn't load URL [" + a + "]"
         })
      }, false);
      if (b.crossOrigin) c.crossOrigin = b.crossOrigin;
      c.src = a
   }
};
THREE.JSONLoader = function (a)
{
   THREE.Loader.call(this, a)
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function (a, b, c)
{
   c = c ? c : this.extractUrlBase(a);
   this.onLoadStart();
   this.loadAjaxJSON(this, a, b, c)
};
THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, e)
{
   var f = new XMLHttpRequest,
      g = 0;
   f.onreadystatechange = function ()
   {
      if (f.readyState === f.DONE)
         if (f.status === 200 || f.status === 0)
         {
            if (f.responseText)
            {
               var h = JSON.parse(f.responseText);
               a.createModel(h, c, d)
            }
            else console.warn("THREE.JSONLoader: [" + b +
               "] seems to be unreachable or file there is empty");
            a.onLoadComplete()
         }
         else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f
            .status + "]");
         else if (f.readyState === f.LOADING)
      {
         if (e)
         {
            g === 0 && (g = f.getResponseHeader("Content-Length"));
            e(
            {
               total: g,
               loaded: f.responseText.length
            })
         }
      }
      else f.readyState === f.HEADERS_RECEIVED && (g = f.getResponseHeader(
         "Content-Length"))
   };
   f.open("GET", b, true);
   f.overrideMimeType && f.overrideMimeType(
      "text/plain; charset=x-user-defined");
   f.setRequestHeader("Content-Type", "text/plain");
   f.send(null)
};
THREE.JSONLoader.prototype.createModel = function (a, b, c)
{
   var d = new THREE.Geometry,
      e = a.scale !== void 0 ? 1 / a.scale : 1;
   this.initMaterials(d, a.materials, c);
   (function (b)
   {
      var c, e, i, j, l, m, n, p, r, o, q, s, w, t, v = a.faces;
      m = a.vertices;
      var x = a.normals,
         C = a.colors,
         D = 0;
      for (c = 0; c < a.uvs.length; c++) a.uvs[c].length && D++;
      for (c = 0; c < D; c++)
      {
         d.faceUvs[c] = [];
         d.faceVertexUvs[c] = []
      }
      j = 0;
      for (l = m.length; j < l;)
      {
         n = new THREE.Vector3;
         n.x = m[j++] * b;
         n.y = m[j++] * b;
         n.z = m[j++] * b;
         d.vertices.push(n)
      }
      j = 0;
      for (l = v.length; j < l;)
      {
         b = v[j++];
         m = b & 1;
         i = b & 2;
         c = b &
            4;
         e = b & 8;
         p = b & 16;
         n = b & 32;
         o = b & 64;
         b = b & 128;
         if (m)
         {
            q = new THREE.Face4;
            q.a = v[j++];
            q.b = v[j++];
            q.c = v[j++];
            q.d = v[j++];
            m = 4
         }
         else
         {
            q = new THREE.Face3;
            q.a = v[j++];
            q.b = v[j++];
            q.c = v[j++];
            m = 3
         } if (i)
         {
            i = v[j++];
            q.materialIndex = i
         }
         i = d.faces.length;
         if (c)
            for (c = 0; c < D; c++)
            {
               s = a.uvs[c];
               r = v[j++];
               t = s[r * 2];
               r = s[r * 2 + 1];
               d.faceUvs[c][i] = new THREE.UV(t, r)
            }
         if (e)
            for (c = 0; c < D; c++)
            {
               s = a.uvs[c];
               w = [];
               for (e = 0; e < m; e++)
               {
                  r = v[j++];
                  t = s[r * 2];
                  r = s[r * 2 + 1];
                  w[e] = new THREE.UV(t, r)
               }
               d.faceVertexUvs[c][i] = w
            }
         if (p)
         {
            p = v[j++] * 3;
            e = new THREE.Vector3;
            e.x = x[p++];
            e.y = x[p++];
            e.z = x[p];
            q.normal = e
         }
         if (n)
            for (c = 0; c < m; c++)
            {
               p = v[j++] * 3;
               e = new THREE.Vector3;
               e.x = x[p++];
               e.y = x[p++];
               e.z = x[p];
               q.vertexNormals.push(e)
            }
         if (o)
         {
            n = v[j++];
            n = new THREE.Color(C[n]);
            q.color = n
         }
         if (b)
            for (c = 0; c < m; c++)
            {
               n = v[j++];
               n = new THREE.Color(C[n]);
               q.vertexColors.push(n)
            }
         d.faces.push(q)
      }
   })(e);
   (function ()
   {
      var b, c, e, i;
      if (a.skinWeights)
      {
         b = 0;
         for (c = a.skinWeights.length; b < c; b = b + 2)
         {
            e = a.skinWeights[b];
            i = a.skinWeights[b + 1];
            d.skinWeights.push(new THREE.Vector4(e, i, 0, 0))
         }
      }
      if (a.skinIndices)
      {
         b = 0;
         for (c = a.skinIndices.length; b < c; b =
            b + 2)
         {
            e = a.skinIndices[b];
            i = a.skinIndices[b + 1];
            d.skinIndices.push(new THREE.Vector4(e, i, 0, 0))
         }
      }
      d.bones = a.bones;
      d.animation = a.animation
   })();
   (function (b)
   {
      if (a.morphTargets !== void 0)
      {
         var c, e, i, j, l, m;
         c = 0;
         for (e = a.morphTargets.length; c < e; c++)
         {
            d.morphTargets[c] = {};
            d.morphTargets[c].name = a.morphTargets[c].name;
            d.morphTargets[c].vertices = [];
            l = d.morphTargets[c].vertices;
            m = a.morphTargets[c].vertices;
            i = 0;
            for (j = m.length; i < j; i = i + 3)
            {
               var n = new THREE.Vector3;
               n.x = m[i] * b;
               n.y = m[i + 1] * b;
               n.z = m[i + 2] * b;
               l.push(n)
            }
         }
      }
      if (a.morphColors !==
         void 0)
      {
         c = 0;
         for (e = a.morphColors.length; c < e; c++)
         {
            d.morphColors[c] = {};
            d.morphColors[c].name = a.morphColors[c].name;
            d.morphColors[c].colors = [];
            j = d.morphColors[c].colors;
            l = a.morphColors[c].colors;
            b = 0;
            for (i = l.length; b < i; b = b + 3)
            {
               m = new THREE.Color(16755200);
               m.setRGB(l[b], l[b + 1], l[b + 2]);
               j.push(m)
            }
         }
      }
   })(e);
   d.computeCentroids();
   d.computeFaceNormals();
   this.hasNormals(d) && d.computeTangents();
   b(d)
};
THREE.GeometryLoader = function ()
{
   THREE.EventTarget.call(this);
   this.path = this.crossOrigin = null
};
THREE.GeometryLoader.prototype = {
   constructor: THREE.GeometryLoader,
   load: function (a)
   {
      var b = this,
         c = null;
      if (b.path === null)
      {
         var d = a.split("/");
         d.pop();
         b.path = d.length < 1 ? "." : d.join("/")
      }
      d = new XMLHttpRequest;
      d.addEventListener("load", function (d)
      {
         d.target.responseText ? c = b.parse(JSON.parse(d.target.responseText),
            e) : b.dispatchEvent(
         {
            type: "error",
            message: "Invalid file [" + a + "]"
         })
      }, false);
      d.addEventListener("error", function ()
      {
         b.dispatchEvent(
         {
            type: "error",
            message: "Couldn't load URL [" + a + "]"
         })
      }, false);
      d.open("GET",
         a, true);
      d.send(null);
      var e = new THREE.LoadingMonitor;
      e.addEventListener("load", function ()
      {
         b.dispatchEvent(
         {
            type: "load",
            content: c
         })
      });
      e.add(d)
   },
   parse: function (a, b)
   {
      var c = this,
         d = new THREE.Geometry,
         e = a.scale !== void 0 ? 1 / a.scale : 1;
      if (a.materials)
      {
         d.materials = [];
         for (var f = 0; f < a.materials.length; ++f)
         {
            var g = a.materials[f],
               h = function (a)
               {
                  a = Math.log(a) / Math.LN2;
                  return Math.floor(a) == a
               }, i = function (a)
               {
                  a = Math.log(a) / Math.LN2;
                  return Math.pow(2, Math.round(a))
               }, j = function (a, d, e, f, g, j)
               {
                  a[d] = new THREE.Texture;
                  a[d].sourceFile =
                     e;
                  if (f)
                  {
                     a[d].repeat.set(f[0], f[1]);
                     if (f[0] != 1) a[d].wrapS = THREE.RepeatWrapping;
                     if (f[1] != 1) a[d].wrapT = THREE.RepeatWrapping
                  }
                  g && a[d].offset.set(g[0], g[1]);
                  if (j)
                  {
                     f = {
                        repeat: THREE.RepeatWrapping,
                        mirror: THREE.MirroredRepeatWrapping
                     };
                     if (f[j[0]] !== void 0) a[d].wrapS = f[j[0]];
                     if (f[j[1]] !== void 0) a[d].wrapT = f[j[1]]
                  }
                  var l = a[d],
                     a = new THREE.ImageLoader;
                  a.addEventListener("load", function (a)
                  {
                     a = a.content;
                     if (!h(a.width) || !h(a.height))
                     {
                        var b = i(a.width),
                           c = i(a.height);
                        l.image = document.createElement("canvas");
                        l.image.width =
                           b;
                        l.image.height = c;
                        l.image.getContext("2d").drawImage(a, 0, 0, b, c)
                     }
                     else l.image = a;
                     l.needsUpdate = true
                  });
                  a.crossOrigin = c.crossOrigin;
                  a.load(c.path + "/" + e);
                  b && b.add(a)
               }, l = function (a)
               {
                  return (a[0] * 255 << 16) + (a[1] * 255 << 8) + a[2] * 255
               }, m = "MeshLambertMaterial",
               n = {
                  color: 15658734,
                  opacity: 1,
                  map: null,
                  lightMap: null,
                  normalMap: null,
                  wireframe: g.wireframe
               };
            if (g.shading)
            {
               var p = g.shading.toLowerCase();
               p === "phong" ? m = "MeshPhongMaterial" : p === "basic" && (m =
                  "MeshBasicMaterial")
            }
            if (g.blending !== void 0 && THREE[g.blending] !== void 0) n.blending =
               THREE[g.blending];
            if (g.transparent !== void 0 || g.opacity < 1) n.transparent = g.transparent;
            if (g.depthTest !== void 0) n.depthTest = g.depthTest;
            if (g.depthWrite !== void 0) n.depthWrite = g.depthWrite;
            if (g.vertexColors !== void 0)
               if (g.vertexColors == "face") n.vertexColors = THREE.FaceColors;
               else if (g.vertexColors) n.vertexColors = THREE.VertexColors;
            if (g.colorDiffuse) n.color = l(g.colorDiffuse);
            else if (g.DbgColor) n.color = g.DbgColor;
            if (g.colorSpecular) n.specular = l(g.colorSpecular);
            if (g.colorAmbient) n.ambient = l(g.colorAmbient);
            if (g.transparency) n.opacity = g.transparency;
            if (g.specularCoef) n.shininess = g.specularCoef;
            g.mapDiffuse && j(n, "map", g.mapDiffuse, g.mapDiffuseRepeat, g.mapDiffuseOffset,
               g.mapDiffuseWrap);
            g.mapLight && j(n, "lightMap", g.mapLight, g.mapLightRepeat, g.mapLightOffset,
               g.mapLightWrap);
            g.mapNormal && j(n, "normalMap", g.mapNormal, g.mapNormalRepeat, g.mapNormalOffset,
               g.mapNormalWrap);
            g.mapSpecular && j(n, "specularMap", g.mapSpecular, g.mapSpecularRepeat,
               g.mapSpecularOffset, g.mapSpecularWrap);
            if (g.mapNormal)
            {
               j = THREE.ShaderUtils.lib.normal;
               l = THREE.UniformsUtils.clone(j.uniforms);
               l.tNormal.texture = n.normalMap;
               if (g.mapNormalFactor) l.uNormalScale.value = g.mapNormalFactor;
               if (n.map)
               {
                  l.tDiffuse.texture = n.map;
                  l.enableDiffuse.value = true
               }
               if (n.specularMap)
               {
                  l.tSpecular.texture = n.specularMap;
                  l.enableSpecular.value = true
               }
               if (n.lightMap)
               {
                  l.tAO.texture = n.lightMap;
                  l.enableAO.value = true
               }
               l.uDiffuseColor.value.setHex(n.color);
               l.uSpecularColor.value.setHex(n.specular);
               l.uAmbientColor.value.setHex(n.ambient);
               l.uShininess.value = n.shininess;
               if (n.opacity !== void 0) l.uOpacity.value =
                  n.opacity;
               n = new THREE.ShaderMaterial(
               {
                  fragmentShader: j.fragmentShader,
                  vertexShader: j.vertexShader,
                  uniforms: l,
                  lights: true,
                  fog: true
               })
            }
            else n = new THREE[m](n); if (g.DbgName !== void 0) n.name = g.DbgName;
            d.materials[f] = n
         }
      }
      var g = a.faces,
         r = a.vertices,
         n = a.normals,
         j = a.colors,
         l = 0;
      if (a.uvs)
         for (f = 0; f < a.uvs.length; f++) a.uvs[f].length && l++;
      for (f = 0; f < l; f++)
      {
         d.faceUvs[f] = [];
         d.faceVertexUvs[f] = []
      }
      m = 0;
      for (p = r.length; m < p;)
      {
         var o = new THREE.Vector3;
         o.x = r[m++] * e;
         o.y = r[m++] * e;
         o.z = r[m++] * e;
         d.vertices.push(o)
      }
      m = 0;
      for (p = g.length; m <
         p;)
      {
         var q = g[m++],
            s = q & 2,
            f = q & 4,
            w = q & 8,
            t = q & 16,
            r = q & 32,
            v = q & 64,
            o = q & 128;
         if (q & 1)
         {
            q = new THREE.Face4;
            q.a = g[m++];
            q.b = g[m++];
            q.c = g[m++];
            q.d = g[m++];
            var x = 4
         }
         else
         {
            q = new THREE.Face3;
            q.a = g[m++];
            q.b = g[m++];
            q.c = g[m++];
            x = 3
         } if (s)
         {
            s = g[m++];
            q.materialIndex = s
         }
         var C = d.faces.length;
         if (f)
            for (f = 0; f < l; f++)
            {
               var D = a.uvs[f],
                  s = g[m++],
                  z = D[s * 2],
                  s = D[s * 2 + 1];
               d.faceUvs[f][C] = new THREE.UV(z, s)
            }
         if (w)
            for (f = 0; f < l; f++)
            {
               for (var D = a.uvs[f], w = [], u = 0; u < x; u++)
               {
                  s = g[m++];
                  z = D[s * 2];
                  s = D[s * 2 + 1];
                  w[u] = new THREE.UV(z, s)
               }
               d.faceVertexUvs[f][C] = w
            }
         if (t)
         {
            t = g[m++] *
               3;
            s = new THREE.Vector3;
            s.x = n[t++];
            s.y = n[t++];
            s.z = n[t];
            q.normal = s
         }
         if (r)
            for (f = 0; f < x; f++)
            {
               t = g[m++] * 3;
               s = new THREE.Vector3;
               s.x = n[t++];
               s.y = n[t++];
               s.z = n[t];
               q.vertexNormals.push(s)
            }
         if (v)
         {
            r = g[m++];
            q.color = new THREE.Color(j[r])
         }
         if (o)
            for (f = 0; f < x; f++)
            {
               r = g[m++];
               q.vertexColors.push(new THREE.Color(j[r]))
            }
         d.faces.push(q)
      }
      if (a.skinWeights)
      {
         f = 0;
         for (g = a.skinWeights.length; f < g; f = f + 2) d.skinWeights.push(
            new THREE.Vector4(a.skinWeights[f], a.skinWeights[f + 1], 0, 0))
      }
      if (a.skinIndices)
      {
         f = 0;
         for (g = a.skinIndices.length; f < g; f = f +
            2)
         {
            n = 0;
            d.skinIndices.push(new THREE.Vector4(a.skinIndices[f], a.skinIndices[
               f + 1], n, 0))
         }
      }
      d.bones = a.bones;
      d.animation = a.animation;
      if (a.morphTargets)
      {
         f = 0;
         for (g = a.morphTargets.length; f < g; f++)
         {
            d.morphTargets[f] = {};
            d.morphTargets[f].name = a.morphTargets[f].name;
            d.morphTargets[f].vertices = [];
            n = d.morphTargets[f].vertices;
            j = a.morphTargets[f].vertices;
            s = 0;
            for (l = j.length; s < l; s = s + 3)
            {
               o = new THREE.Vector3;
               o.x = j[s] * e;
               o.y = j[s + 1] * e;
               o.z = j[s + 2] * e;
               n.push(o)
            }
         }
      }
      if (a.morphColors)
      {
         f = 0;
         for (g = a.morphColors.length; f < g; f++)
         {
            d.morphColors[f] = {};
            d.morphColors[f].name = a.morphColors[f].name;
            d.morphColors[f].colors = [];
            e = d.morphColors[f].colors;
            j = a.morphColors[f].colors;
            n = 0;
            for (l = j.length; n < l; n = n + 3)
            {
               m = new THREE.Color(16755200);
               m.setRGB(j[n], j[n + 1], j[n + 2]);
               e.push(m)
            }
         }
      }
      d.computeCentroids();
      d.computeFaceNormals();
      return d
   }
};
THREE.SceneLoader = function ()
{
   this.onLoadStart = function () {};
   this.onLoadProgress = function () {};
   this.onLoadComplete = function () {};
   this.callbackSync = function () {};
   this.callbackProgress = function () {}
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function (a, b)
{
   var c = this,
      d = new XMLHttpRequest;
   d.onreadystatechange = function ()
   {
      if (d.readyState === 4)
         if (d.status === 200 || d.status === 0)
         {
            var e = JSON.parse(d.responseText);
            c.createScene(e, b, a)
         }
         else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" +
            d.status + "]")
   };
   d.open("GET", a, true);
   d.overrideMimeType && d.overrideMimeType(
      "text/plain; charset=x-user-defined");
   d.setRequestHeader("Content-Type", "text/plain");
   d.send(null)
};
THREE.SceneLoader.prototype.createScene = function (a, b, c)
{
   function d(a, b)
   {
      return b == "relativeToHTML" ? a : j + "/" + a
   }

   function e()
   {
      var a;
      for (n in B.objects)
         if (!N.objects[n])
         {
            s = B.objects[n];
            if (s.geometry !== void 0)
            {
               if (J = N.geometries[s.geometry])
               {
                  a = false;
                  M = N.materials[s.materials[0]];
                  (a = M instanceof THREE.ShaderMaterial) && J.computeTangents();
                  x = s.position;
                  C = s.rotation;
                  D = s.quaternion;
                  z = s.scale;
                  w = s.matrix;
                  D = 0;
                  s.materials.length == 0 && (M = new THREE.MeshFaceMaterial);
                  s.materials.length > 1 && (M = new THREE.MeshFaceMaterial);
                  a = new THREE.Mesh(J, M);
                  a.name = n;
                  if (w)
                  {
                     a.matrixAutoUpdate = false;
                     a.matrix.set(w[0], w[1], w[2], w[3], w[4], w[5], w[6], w[7],
                        w[8], w[9], w[10], w[11], w[12], w[13], w[14], w[15])
                  }
                  else
                  {
                     a.position.set(x[0], x[1], x[2]);
                     if (D)
                     {
                        a.quaternion.set(D[0], D[1], D[2], D[3]);
                        a.useQuaternion = true
                     }
                     else a.rotation.set(C[0], C[1], C[2]);
                     a.scale.set(z[0], z[1], z[2])
                  }
                  a.visible = s.visible;
                  a.doubleSided = s.doubleSided;
                  a.castShadow = s.castShadow;
                  a.receiveShadow = s.receiveShadow;
                  N.scene.add(a);
                  N.objects[n] = a
               }
            }
            else
            {
               x = s.position;
               C = s.rotation;
               D = s.quaternion;
               z = s.scale;
               D = 0;
               a = new THREE.Object3D;
               a.name = n;
               a.position.set(x[0], x[1], x[2]);
               if (D)
               {
                  a.quaternion.set(D[0], D[1], D[2], D[3]);
                  a.useQuaternion = true
               }
               else a.rotation.set(C[0], C[1], C[2]);
               a.scale.set(z[0], z[1], z[2]);
               a.visible = s.visible !== void 0 ? s.visible : false;
               N.scene.add(a);
               N.objects[n] = a;
               N.empties[n] = a
            }
         }
   }

   function f(a)
   {
      return function (b)
      {
         N.geometries[a] = b;
         e();
         Q = Q - 1;
         i.onLoadComplete();
         h()
      }
   }

   function g(a)
   {
      return function (b)
      {
         N.geometries[a] = b
      }
   }

   function h()
   {
      i.callbackProgress(
      {
         totalModels: aa,
         totalTextures: T,
         loadedModels: aa - Q,
         loadedTextures: T - E
      }, N);
      i.onLoadProgress();
      Q === 0 && E === 0 && b(N)
   }
   var i = this,
      j = THREE.Loader.prototype.extractUrlBase(c),
      l, m, n, p, r, o, q, s, w, t, v, x, C, D, z, u, G, J, M, O, X, B, F, Q, E,
         aa, T, N;
   B = a;
   c = new THREE.BinaryLoader;
   F = new THREE.JSONLoader;
   E = Q = 0;
   N = {
      scene: new THREE.Scene,
      geometries:
      {},
      materials:
      {},
      textures:
      {},
      objects:
      {},
      cameras:
      {},
      lights:
      {},
      fogs:
      {},
      empties:
      {}
   };
   if (B.transform)
   {
      a = B.transform.position;
      t = B.transform.rotation;
      u = B.transform.scale;
      a && N.scene.position.set(a[0], a[1], a[2]);
      t && N.scene.rotation.set(t[0], t[1],
         t[2]);
      u && N.scene.scale.set(u[0], u[1], u[2]);
      if (a || t || u)
      {
         N.scene.updateMatrix();
         N.scene.updateMatrixWorld()
      }
   }
   a = function (a)
   {
      return function ()
      {
         E = E - a;
         h();
         i.onLoadComplete()
      }
   };
   for (r in B.cameras)
   {
      u = B.cameras[r];
      u.type === "perspective" ? O = new THREE.PerspectiveCamera(u.fov, u.aspect,
         u.near, u.far) : u.type === "ortho" && (O = new THREE.OrthographicCamera(
         u.left, u.right, u.top, u.bottom, u.near, u.far));
      x = u.position;
      t = u.target;
      u = u.up;
      O.position.set(x[0], x[1], x[2]);
      O.target = new THREE.Vector3(t[0], t[1], t[2]);
      u && O.up.set(u[0],
         u[1], u[2]);
      N.cameras[r] = O
   }
   for (p in B.lights)
   {
      t = B.lights[p];
      r = t.color !== void 0 ? t.color : 16777215;
      O = t.intensity !== void 0 ? t.intensity : 1;
      if (t.type === "directional")
      {
         x = t.direction;
         v = new THREE.DirectionalLight(r, O);
         v.position.set(x[0], x[1], x[2]);
         v.position.normalize()
      }
      else if (t.type === "point")
      {
         x = t.position;
         v = t.distance;
         v = new THREE.PointLight(r, O, v);
         v.position.set(x[0], x[1], x[2])
      }
      else t.type === "ambient" && (v = new THREE.AmbientLight(r));
      N.scene.add(v);
      N.lights[p] = v
   }
   for (o in B.fogs)
   {
      p = B.fogs[o];
      p.type === "linear" ?
         X = new THREE.Fog(0, p.near, p.far) : p.type === "exp2" && (X = new THREE
            .FogExp2(0, p.density));
      u = p.color;
      X.color.setRGB(u[0], u[1], u[2]);
      N.fogs[o] = X
   }
   if (N.cameras && B.defaults.camera) N.currentCamera = N.cameras[B.defaults.camera];
   if (N.fogs && B.defaults.fog) N.scene.fog = N.fogs[B.defaults.fog];
   u = B.defaults.bgcolor;
   N.bgColor = new THREE.Color;
   N.bgColor.setRGB(u[0], u[1], u[2]);
   N.bgColorAlpha = B.defaults.bgalpha;
   for (l in B.geometries)
   {
      o = B.geometries[l];
      if (o.type == "bin_mesh" || o.type == "ascii_mesh")
      {
         Q = Q + 1;
         i.onLoadStart()
      }
   }
   aa =
      Q;
   for (l in B.geometries)
   {
      o = B.geometries[l];
      if (o.type === "cube")
      {
         J = new THREE.CubeGeometry(o.width, o.height, o.depth, o.segmentsWidth,
            o.segmentsHeight, o.segmentsDepth, null, o.flipped, o.sides);
         N.geometries[l] = J
      }
      else if (o.type === "plane")
      {
         J = new THREE.PlaneGeometry(o.width, o.height, o.segmentsWidth, o.segmentsHeight);
         N.geometries[l] = J
      }
      else if (o.type === "sphere")
      {
         J = new THREE.SphereGeometry(o.radius, o.segmentsWidth, o.segmentsHeight);
         N.geometries[l] = J
      }
      else if (o.type === "cylinder")
      {
         J = new THREE.CylinderGeometry(o.topRad,
            o.botRad, o.height, o.radSegs, o.heightSegs);
         N.geometries[l] = J
      }
      else if (o.type === "torus")
      {
         J = new THREE.TorusGeometry(o.radius, o.tube, o.segmentsR, o.segmentsT);
         N.geometries[l] = J
      }
      else if (o.type === "icosahedron")
      {
         J = new THREE.IcosahedronGeometry(o.radius, o.subdivisions);
         N.geometries[l] = J
      }
      else if (o.type === "bin_mesh") c.load(d(o.url, B.urlBaseType), f(l));
      else if (o.type === "ascii_mesh") F.load(d(o.url, B.urlBaseType), f(l));
      else if (o.type === "embedded_mesh")
      {
         o = B.embeds[o.id];
         o.metadata = B.metadata;
         o && F.createModel(o, g(l),
            "")
      }
   }
   for (q in B.textures)
   {
      l = B.textures[q];
      if (l.url instanceof Array)
      {
         E = E + l.url.length;
         for (o = 0; o < l.url.length; o++) i.onLoadStart()
      }
      else
      {
         E = E + 1;
         i.onLoadStart()
      }
   }
   T = E;
   for (q in B.textures)
   {
      l = B.textures[q];
      if (l.mapping !== void 0 && THREE[l.mapping] !== void 0) l.mapping = new THREE[
         l.mapping];
      if (l.url instanceof Array)
      {
         o = l.url.length;
         X = [];
         for (c = 0; c < o; c++) X[c] = d(l.url[c], B.urlBaseType);
         o = THREE.ImageUtils.loadTextureCube(X, l.mapping, a(o))
      }
      else
      {
         o = THREE.ImageUtils.loadTexture(d(l.url, B.urlBaseType), l.mapping, a(
            1));
         if (THREE[l.minFilter] !==
            void 0) o.minFilter = THREE[l.minFilter];
         if (THREE[l.magFilter] !== void 0) o.magFilter = THREE[l.magFilter];
         if (l.repeat)
         {
            o.repeat.set(l.repeat[0], l.repeat[1]);
            if (l.repeat[0] !== 1) o.wrapS = THREE.RepeatWrapping;
            if (l.repeat[1] !== 1) o.wrapT = THREE.RepeatWrapping
         }
         l.offset && o.offset.set(l.offset[0], l.offset[1]);
         if (l.wrap)
         {
            X = {
               repeat: THREE.RepeatWrapping,
               mirror: THREE.MirroredRepeatWrapping
            };
            if (X[l.wrap[0]] !== void 0) o.wrapS = X[l.wrap[0]];
            if (X[l.wrap[1]] !== void 0) o.wrapT = X[l.wrap[1]]
         }
      }
      N.textures[q] = o
   }
   for (m in B.materials)
   {
      w =
         B.materials[m];
      for (G in w.parameters)
         if (G === "envMap" || G === "map" || G === "lightMap") w.parameters[G] =
            N.textures[w.parameters[G]];
         else if (G === "shading") w.parameters[G] = w.parameters[G] == "flat" ?
         THREE.FlatShading : THREE.SmoothShading;
      else if (G === "blending") w.parameters[G] = w.parameters[G] in THREE ?
         THREE[w.parameters[G]] : THREE.NormalBlending;
      else if (G === "combine") w.parameters[G] = w.parameters[G] ==
         "MixOperation" ? THREE.MixOperation : THREE.MultiplyOperation;
      else if (G === "vertexColors")
         if (w.parameters[G] == "face") w.parameters[G] =
            THREE.FaceColors;
         else if (w.parameters[G]) w.parameters[G] = THREE.VertexColors;
      if (w.parameters.opacity !== void 0 && w.parameters.opacity < 1) w.parameters
         .transparent = true;
      if (w.parameters.normalMap)
      {
         q = THREE.ShaderUtils.lib.normal;
         a = THREE.UniformsUtils.clone(q.uniforms);
         l = w.parameters.color;
         o = w.parameters.specular;
         X = w.parameters.ambient;
         c = w.parameters.shininess;
         a.tNormal.texture = N.textures[w.parameters.normalMap];
         if (w.parameters.normalMapFactor) a.uNormalScale.value = w.parameters.normalMapFactor;
         if (w.parameters.map)
         {
            a.tDiffuse.texture =
               w.parameters.map;
            a.enableDiffuse.value = true
         }
         if (w.parameters.lightMap)
         {
            a.tAO.texture = w.parameters.lightMap;
            a.enableAO.value = true
         }
         if (w.parameters.specularMap)
         {
            a.tSpecular.texture = N.textures[w.parameters.specularMap];
            a.enableSpecular.value = true
         }
         a.uDiffuseColor.value.setHex(l);
         a.uSpecularColor.value.setHex(o);
         a.uAmbientColor.value.setHex(X);
         a.uShininess.value = c;
         if (w.parameters.opacity) a.uOpacity.value = w.parameters.opacity;
         M = new THREE.ShaderMaterial(
         {
            fragmentShader: q.fragmentShader,
            vertexShader: q.vertexShader,
            uniforms: a,
            lights: true,
            fog: true
         })
      }
      else M = new THREE[w.type](w.parameters);
      N.materials[m] = M
   }
   e();
   i.callbackSync(N);
   h()
};
THREE.TextureLoader = function ()
{
   THREE.EventTarget.call(this);
   this.crossOrigin = null
};
THREE.TextureLoader.prototype = {
   constructor: THREE.TextureLoader,
   load: function (a)
   {
      var b = this,
         c = new Image;
      c.addEventListener("load", function ()
      {
         var a = new THREE.Texture(c);
         a.needsUpdate = true;
         b.dispatchEvent(
         {
            type: "load",
            content: a
         })
      }, false);
      c.addEventListener("error", function ()
      {
         b.dispatchEvent(
         {
            type: "error",
            message: "Couldn't load URL [" + a + "]"
         })
      }, false);
      if (b.crossOrigin) c.crossOrigin = b.crossOrigin;
      c.src = a
   }
};
THREE.Material = function (a)
{
   a = a ||
   {};
   this.id = THREE.MaterialCount++;
   this.name = "";
   this.opacity = a.opacity !== void 0 ? a.opacity : 1;
   this.transparent = a.transparent !== void 0 ? a.transparent : false;
   this.blending = a.blending !== void 0 ? a.blending : THREE.NormalBlending;
   this.blendSrc = a.blendSrc !== void 0 ? a.blendSrc : THREE.SrcAlphaFactor;
   this.blendDst = a.blendDst !== void 0 ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
   this.blendEquation = a.blendEquation !== void 0 ? a.blendEquation : THREE.AddEquation;
   this.depthTest = a.depthTest !== void 0 ?
      a.depthTest : true;
   this.depthWrite = a.depthWrite !== void 0 ? a.depthWrite : true;
   this.polygonOffset = a.polygonOffset !== void 0 ? a.polygonOffset : false;
   this.polygonOffsetFactor = a.polygonOffsetFactor !== void 0 ? a.polygonOffsetFactor :
      0;
   this.polygonOffsetUnits = a.polygonOffsetUnits !== void 0 ? a.polygonOffsetUnits :
      0;
   this.alphaTest = a.alphaTest !== void 0 ? a.alphaTest : 0;
   this.overdraw = a.overdraw !== void 0 ? a.overdraw : false;
   this.needsUpdate = this.visible = true
};
THREE.MaterialCount = 0;
THREE.LineBasicMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(
      16777215);
   this.linewidth = a.linewidth !== void 0 ? a.linewidth : 1;
   this.linecap = a.linecap !== void 0 ? a.linecap : "round";
   this.linejoin = a.linejoin !== void 0 ? a.linejoin : "round";
   this.vertexColors = a.vertexColors ? a.vertexColors : false;
   this.fog = a.fog !== void 0 ? a.fog : true
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(
      16777215);
   this.map = a.map !== void 0 ? a.map : null;
   this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
   this.envMap = a.envMap !== void 0 ? a.envMap : null;
   this.combine = a.combine !== void 0 ? a.combine : THREE.MultiplyOperation;
   this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
   this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
   this.fog = a.fog !== void 0 ? a.fog :
      true;
   this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
   this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
   this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth :
      1;
   this.wireframeLinecap = a.wireframeLinecap !== void 0 ? a.wireframeLinecap :
      "round";
   this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin :
      "round";
   this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
   this.skinning = a.skinning !== void 0 ? a.skinning : false;
   this.morphTargets = a.morphTargets !==
      void 0 ? a.morphTargets : false
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(
      16777215);
   this.ambient = a.ambient !== void 0 ? new THREE.Color(a.ambient) : new THREE
      .Color(16777215);
   this.emissive = a.emissive !== void 0 ? new THREE.Color(a.emissive) : new THREE
      .Color(0);
   this.wrapAround = a.wrapAround !== void 0 ? a.wrapAround : false;
   this.wrapRGB = new THREE.Vector3(1, 1, 1);
   this.map = a.map !== void 0 ? a.map : null;
   this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
   this.envMap =
      a.envMap !== void 0 ? a.envMap : null;
   this.combine = a.combine !== void 0 ? a.combine : THREE.MultiplyOperation;
   this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
   this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
   this.fog = a.fog !== void 0 ? a.fog : true;
   this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
   this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
   this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth :
      1;
   this.wireframeLinecap = a.wireframeLinecap !== void 0 ?
      a.wireframeLinecap : "round";
   this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin :
      "round";
   this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
   this.skinning = a.skinning !== void 0 ? a.skinning : false;
   this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : false;
   this.morphNormals = a.morphNormals !== void 0 ? a.morphNormals : false
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(
      16777215);
   this.ambient = a.ambient !== void 0 ? new THREE.Color(a.ambient) : new THREE
      .Color(16777215);
   this.emissive = a.emissive !== void 0 ? new THREE.Color(a.emissive) : new THREE
      .Color(0);
   this.specular = a.specular !== void 0 ? new THREE.Color(a.specular) : new THREE
      .Color(1118481);
   this.shininess = a.shininess !== void 0 ? a.shininess : 30;
   this.metal = a.metal !== void 0 ? a.metal : false;
   this.perPixel =
      a.perPixel !== void 0 ? a.perPixel : false;
   this.wrapAround = a.wrapAround !== void 0 ? a.wrapAround : false;
   this.wrapRGB = new THREE.Vector3(1, 1, 1);
   this.map = a.map !== void 0 ? a.map : null;
   this.lightMap = a.lightMap !== void 0 ? a.lightMap : null;
   this.envMap = a.envMap !== void 0 ? a.envMap : null;
   this.combine = a.combine !== void 0 ? a.combine : THREE.MultiplyOperation;
   this.reflectivity = a.reflectivity !== void 0 ? a.reflectivity : 1;
   this.refractionRatio = a.refractionRatio !== void 0 ? a.refractionRatio : 0.98;
   this.fog = a.fog !== void 0 ? a.fog : true;
   this.shading =
      a.shading !== void 0 ? a.shading : THREE.SmoothShading;
   this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
   this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth :
      1;
   this.wireframeLinecap = a.wireframeLinecap !== void 0 ? a.wireframeLinecap :
      "round";
   this.wireframeLinejoin = a.wireframeLinejoin !== void 0 ? a.wireframeLinejoin :
      "round";
   this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
   this.skinning = a.skinning !== void 0 ? a.skinning : false;
   this.morphTargets = a.morphTargets !== void 0 ?
      a.morphTargets : false;
   this.morphNormals = a.morphNormals !== void 0 ? a.morphNormals : false
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
   this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
   this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth :
      1
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.shading = a.shading ? a.shading : THREE.FlatShading;
   this.wireframe = a.wireframe ? a.wireframe : false;
   this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshFaceMaterial = function () {};
THREE.ParticleBasicMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(
      16777215);
   this.map = a.map !== void 0 ? a.map : null;
   this.size = a.size !== void 0 ? a.size : 1;
   this.sizeAttenuation = a.sizeAttenuation !== void 0 ? a.sizeAttenuation :
      true;
   this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : false;
   this.fog = a.fog !== void 0 ? a.fog : true
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleCanvasMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(
      16777215);
   this.program = a.program !== void 0 ? a.program : function () {}
};
THREE.ParticleCanvasMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleDOMMaterial = function (a)
{
   THREE.Material.call(this);
   this.domElement = a
};
THREE.ShaderMaterial = function (a)
{
   THREE.Material.call(this, a);
   a = a ||
   {};
   this.fragmentShader = a.fragmentShader !== void 0 ? a.fragmentShader :
      "void main() {}";
   this.vertexShader = a.vertexShader !== void 0 ? a.vertexShader :
      "void main() {}";
   this.uniforms = a.uniforms !== void 0 ? a.uniforms :
   {};
   this.attributes = a.attributes;
   this.shading = a.shading !== void 0 ? a.shading : THREE.SmoothShading;
   this.wireframe = a.wireframe !== void 0 ? a.wireframe : false;
   this.wireframeLinewidth = a.wireframeLinewidth !== void 0 ? a.wireframeLinewidth :
      1;
   this.fog =
      a.fog !== void 0 ? a.fog : false;
   this.lights = a.lights !== void 0 ? a.lights : false;
   this.vertexColors = a.vertexColors !== void 0 ? a.vertexColors : THREE.NoColors;
   this.skinning = a.skinning !== void 0 ? a.skinning : false;
   this.morphTargets = a.morphTargets !== void 0 ? a.morphTargets : false;
   this.morphNormals = a.morphNormals !== void 0 ? a.morphNormals : false
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.Texture = function (a, b, c, d, e, f, g, h, i)
{
   this.id = THREE.TextureCount++;
   this.image = a;
   this.mapping = b !== void 0 ? b : new THREE.UVMapping;
   this.wrapS = c !== void 0 ? c : THREE.ClampToEdgeWrapping;
   this.wrapT = d !== void 0 ? d : THREE.ClampToEdgeWrapping;
   this.magFilter = e !== void 0 ? e : THREE.LinearFilter;
   this.minFilter = f !== void 0 ? f : THREE.LinearMipMapLinearFilter;
   this.anisotropy = i !== void 0 ? i : 1;
   this.format = g !== void 0 ? g : THREE.RGBAFormat;
   this.type = h !== void 0 ? h : THREE.UnsignedByteType;
   this.offset = new THREE.Vector2(0, 0);
   this.repeat =
      new THREE.Vector2(1, 1);
   this.generateMipmaps = true;
   this.premultiplyAlpha = false;
   this.flipY = true;
   this.needsUpdate = false;
   this.onUpdate = null
};
THREE.Texture.prototype = {
   constructor: THREE.Texture,
   clone: function ()
   {
      var a = new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT,
         this.magFilter, this.minFilter, this.format, this.type, this.anisotropy
      );
      a.offset.copy(this.offset);
      a.repeat.copy(this.repeat);
      a.generateMipmaps = this.generateMipmaps;
      a.premultiplyAlpha = this.premultiplyAlpha;
      a.flipY = this.flipY;
      return a
   }
};
THREE.TextureCount = 0;
THREE.DataTexture = function (a, b, c, d, e, f, g, h, i, j)
{
   THREE.Texture.call(this, null, f, g, h, i, j, d, e);
   this.image = {
      data: a,
      width: b,
      height: c
   }
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function ()
{
   var a = new THREE.DataTexture(this.image.data, this.image.width, this.image.height,
      this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter,
      this.minFilter);
   a.offset.copy(this.offset);
   a.repeat.copy(this.repeat);
   return a
};
THREE.Particle = function (a)
{
   THREE.Object3D.call(this);
   this.material = a
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem = function (a, b)
{
   THREE.Object3D.call(this);
   this.geometry = a;
   this.material = b !== void 0 ? b : new THREE.ParticleBasicMaterial(
   {
      color: Math.random() * 16777215
   });
   this.sortParticles = false;
   if (this.geometry)
   {
      this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
      this.boundRadius = a.boundingSphere.radius
   }
   this.frustumCulled = false
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line = function (a, b, c)
{
   THREE.Object3D.call(this);
   this.geometry = a;
   this.material = b !== void 0 ? b : new THREE.LineBasicMaterial(
   {
      color: Math.random() * 16777215
   });
   this.type = c !== void 0 ? c : THREE.LineStrip;
   this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh = function (a, b)
{
   THREE.Object3D.call(this);
   this.geometry = a;
   this.material = b !== void 0 ? b : new THREE.MeshBasicMaterial(
   {
      color: Math.random() * 16777215,
      wireframe: true
   });
   if (this.geometry)
   {
      this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
      this.boundRadius = a.boundingSphere.radius;
      if (this.geometry.morphTargets.length)
      {
         this.morphTargetBase = -1;
         this.morphTargetForcedOrder = [];
         this.morphTargetInfluences = [];
         this.morphTargetDictionary = {};
         for (var c = 0; c < this.geometry.morphTargets.length; c++)
         {
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c
         }
      }
   }
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a)
{
   if (this.morphTargetDictionary[a] !== void 0) return this.morphTargetDictionary[
      a];
   console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a +
      " does not exist. Returning 0.");
   return 0
};
THREE.Bone = function (a)
{
   THREE.Object3D.call(this);
   this.skin = a;
   this.skinMatrix = new THREE.Matrix4
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function (a, b)
{
   this.matrixAutoUpdate && (b = b | this.updateMatrix());
   if (b || this.matrixWorldNeedsUpdate)
   {
      a ? this.skinMatrix.multiply(a, this.matrix) : this.skinMatrix.copy(this.matrix);
      this.matrixWorldNeedsUpdate = false;
      b = true
   }
   var c, d = this.children.length;
   for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b)
};
THREE.SkinnedMesh = function (a, b, c)
{
   THREE.Mesh.call(this, a, b);
   this.useVertexTexture = c !== void 0 ? c : true;
   this.identityMatrix = new THREE.Matrix4;
   this.bones = [];
   this.boneMatrices = [];
   var d, e, f;
   if (this.geometry.bones !== void 0)
   {
      for (a = 0; a < this.geometry.bones.length; a++)
      {
         c = this.geometry.bones[a];
         d = c.pos;
         e = c.rotq;
         f = c.scl;
         b = this.addBone();
         b.name = c.name;
         b.position.set(d[0], d[1], d[2]);
         b.quaternion.set(e[0], e[1], e[2], e[3]);
         b.useQuaternion = true;
         f !== void 0 ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1)
      }
      for (a = 0; a < this.bones.length; a++)
      {
         c =
            this.geometry.bones[a];
         b = this.bones[a];
         c.parent === -1 ? this.add(b) : this.bones[c.parent].add(b)
      }
      a = this.bones.length;
      if (this.useVertexTexture)
      {
         this.boneTextureHeight = this.boneTextureWidth = a = a > 256 ? 64 : a >
            64 ? 32 : a > 16 ? 16 : 8;
         this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight *
            4);
         this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth,
            this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType);
         this.boneTexture.minFilter = THREE.NearestFilter;
         this.boneTexture.magFilter =
            THREE.NearestFilter;
         this.boneTexture.generateMipmaps = false;
         this.boneTexture.flipY = false
      }
      else this.boneMatrices = new Float32Array(16 * a);
      this.pose()
   }
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function (a)
{
   a === void 0 && (a = new THREE.Bone(this));
   this.bones.push(a);
   return a
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function (a)
{
   this.matrixAutoUpdate && this.updateMatrix();
   if (this.matrixWorldNeedsUpdate || a)
   {
      this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) :
         this.matrixWorld.copy(this.matrix);
      this.matrixWorldNeedsUpdate = false
   }
   for (var a = 0, b = this.children.length; a < b; a++)
   {
      var c = this.children[a];
      c instanceof THREE.Bone ? c.update(this.identityMatrix, false) : c.updateMatrixWorld(
         true)
   }
   for (var b = this.bones.length, c = this.bones, d = this.boneMatrices, a = 0; a <
      b; a++) c[a].skinMatrix.flattenToArrayOffset(d,
      a * 16);
   if (this.useVertexTexture) this.boneTexture.needsUpdate = true
};
THREE.SkinnedMesh.prototype.pose = function ()
{
   this.updateMatrixWorld(true);
   for (var a, b = [], c = 0; c < this.bones.length; c++)
   {
      a = this.bones[c];
      var d = new THREE.Matrix4;
      d.getInverse(a.skinMatrix);
      b.push(d);
      a.skinMatrix.flattenToArrayOffset(this.boneMatrices, c * 16)
   }
   if (this.geometry.skinVerticesA === void 0)
   {
      this.geometry.skinVerticesA = [];
      this.geometry.skinVerticesB = [];
      for (a = 0; a < this.geometry.skinIndices.length; a++)
      {
         var c = this.geometry.vertices[a],
            e = this.geometry.skinIndices[a].x,
            f = this.geometry.skinIndices[a].y,
            d = new THREE.Vector3(c.x, c.y, c.z);
         this.geometry.skinVerticesA.push(b[e].multiplyVector3(d));
         d = new THREE.Vector3(c.x, c.y, c.z);
         this.geometry.skinVerticesB.push(b[f].multiplyVector3(d));
         if (this.geometry.skinWeights[a].x + this.geometry.skinWeights[a].y !==
            1)
         {
            c = (1 - (this.geometry.skinWeights[a].x + this.geometry.skinWeights[
               a].y)) * 0.5;
            this.geometry.skinWeights[a].x = this.geometry.skinWeights[a].x + c;
            this.geometry.skinWeights[a].y = this.geometry.skinWeights[a].y + c
         }
      }
   }
};
THREE.MorphAnimMesh = function (a, b)
{
   THREE.Mesh.call(this, a, b);
   this.duration = 1E3;
   this.mirroredLoop = false;
   this.currentKeyframe = this.lastKeyframe = this.time = 0;
   this.direction = 1;
   this.directionBackwards = false;
   this.setFrameRange(0, this.geometry.morphTargets.length - 1)
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b)
{
   this.startKeyframe = a;
   this.endKeyframe = b;
   this.length = this.endKeyframe - this.startKeyframe + 1
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function ()
{
   this.direction = 1;
   this.directionBackwards = false
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function ()
{
   this.direction = -1;
   this.directionBackwards = true
};
THREE.MorphAnimMesh.prototype.parseAnimations = function ()
{
   var a = this.geometry;
   if (!a.animations) a.animations = {};
   for (var b, c = a.animations, d = /([a-z]+)(\d+)/, e = 0, f = a.morphTargets
         .length; e < f; e++)
   {
      var g = a.morphTargets[e].name.match(d);
      if (g && g.length > 1)
      {
         g = g[1];
         c[g] || (c[g] = {
            start: Infinity,
            end: -Infinity
         });
         var h = c[g];
         if (e < h.start) h.start = e;
         if (e > h.end) h.end = e;
         b || (b = g)
      }
   }
   a.firstAnimation = b
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function (a, b, c)
{
   if (!this.geometry.animations) this.geometry.animations = {};
   this.geometry.animations[a] = {
      start: b,
      end: c
   }
};
THREE.MorphAnimMesh.prototype.playAnimation = function (a, b)
{
   var c = this.geometry.animations[a];
   if (c)
   {
      this.setFrameRange(c.start, c.end);
      this.duration = 1E3 * ((c.end - c.start) / b);
      this.time = 0
   }
   else console.warn("animation[" + a + "] undefined")
};
THREE.MorphAnimMesh.prototype.updateAnimation = function (a)
{
   var b = this.duration / this.length;
   this.time = this.time + this.direction * a;
   if (this.mirroredLoop)
   {
      if (this.time > this.duration || this.time < 0)
      {
         this.direction = this.direction * -1;
         if (this.time > this.duration)
         {
            this.time = this.duration;
            this.directionBackwards = true
         }
         if (this.time < 0)
         {
            this.time = 0;
            this.directionBackwards = false
         }
      }
   }
   else
   {
      this.time = this.time % this.duration;
      if (this.time < 0) this.time = this.time + this.duration
   }
   a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time /
      b), 0, this.length - 1);
   if (a !== this.currentKeyframe)
   {
      this.morphTargetInfluences[this.lastKeyframe] = 0;
      this.morphTargetInfluences[this.currentKeyframe] = 1;
      this.morphTargetInfluences[a] = 0;
      this.lastKeyframe = this.currentKeyframe;
      this.currentKeyframe = a
   }
   b = this.time % b / b;
   this.directionBackwards && (b = 1 - b);
   this.morphTargetInfluences[this.currentKeyframe] = b;
   this.morphTargetInfluences[this.lastKeyframe] = 1 - b
};
THREE.Ribbon = function (a, b)
{
   THREE.Object3D.call(this);
   this.geometry = a;
   this.material = b
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD = function ()
{
   THREE.Object3D.call(this);
   this.LODs = []
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function (a, b)
{
   b === void 0 && (b = 0);
   for (var b = Math.abs(b), c = 0; c < this.LODs.length; c++)
      if (b < this.LODs[c].visibleAtDistance) break;
   this.LODs.splice(c, 0,
   {
      visibleAtDistance: b,
      object3D: a
   });
   this.add(a)
};
THREE.LOD.prototype.update = function (a)
{
   if (this.LODs.length > 1)
   {
      a.matrixWorldInverse.getInverse(a.matrixWorld);
      a = a.matrixWorldInverse;
      a = -(a.elements[2] * this.matrixWorld.elements[12] + a.elements[6] *
         this.matrixWorld.elements[13] + a.elements[10] * this.matrixWorld.elements[
            14] + a.elements[14]);
      this.LODs[0].object3D.visible = true;
      for (var b = 1; b < this.LODs.length; b++)
         if (a >= this.LODs[b].visibleAtDistance)
         {
            this.LODs[b - 1].object3D.visible = false;
            this.LODs[b].object3D.visible = true
         }
         else break;
      for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible =
         false
   }
};
THREE.Sprite = function (a)
{
   THREE.Object3D.call(this);
   this.color = a.color !== void 0 ? new THREE.Color(a.color) : new THREE.Color(
      16777215);
   this.map = a.map !== void 0 ? a.map : new THREE.Texture;
   this.blending = a.blending !== void 0 ? a.blending : THREE.NormalBlending;
   this.blendSrc = a.blendSrc !== void 0 ? a.blendSrc : THREE.SrcAlphaFactor;
   this.blendDst = a.blendDst !== void 0 ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
   this.blendEquation = a.blendEquation !== void 0 ? a.blendEquation : THREE.AddEquation;
   this.useScreenCoordinates = a.useScreenCoordinates !== void 0 ?
      a.useScreenCoordinates : true;
   this.mergeWith3D = a.mergeWith3D !== void 0 ? a.mergeWith3D : !this.useScreenCoordinates;
   this.affectedByDistance = a.affectedByDistance !== void 0 ? a.affectedByDistance : !
      this.useScreenCoordinates;
   this.scaleByViewport = a.scaleByViewport !== void 0 ? a.scaleByViewport : !
      this.affectedByDistance;
   this.alignment = a.alignment instanceof THREE.Vector2 ? a.alignment : THREE.SpriteAlignment
      .center;
   this.rotation3d = this.rotation;
   this.rotation = 0;
   this.opacity = 1;
   this.uvOffset = new THREE.Vector2(0, 0);
   this.uvScale =
      new THREE.Vector2(1, 1)
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function ()
{
   this.matrix.setPosition(this.position);
   this.rotation3d.set(0, 0, this.rotation);
   this.matrix.setRotationFromEuler(this.rotation3d);
   if (this.scale.x !== 1 || this.scale.y !== 1)
   {
      this.matrix.scale(this.scale);
      this.boundRadiusScale = Math.max(this.scale.x, this.scale.y)
   }
   this.matrixWorldNeedsUpdate = true
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function ()
{
   THREE.Object3D.call(this);
   this.overrideMaterial = this.fog = null;
   this.matrixAutoUpdate = false;
   this.__objects = [];
   this.__lights = [];
   this.__objectsAdded = [];
   this.__objectsRemoved = []
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function (a)
{
   if (a instanceof THREE.Light)
   {
      this.__lights.indexOf(a) === -1 && this.__lights.push(a);
      a.target && a.target.parent === void 0 && this.add(a.target)
   }
   else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && this.__objects
      .indexOf(a) === -1)
   {
      this.__objects.push(a);
      this.__objectsAdded.push(a);
      var b = this.__objectsRemoved.indexOf(a);
      b !== -1 && this.__objectsRemoved.splice(b, 1)
   }
   for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function (a)
{
   if (a instanceof THREE.Light)
   {
      var b = this.__lights.indexOf(a);
      b !== -1 && this.__lights.splice(b, 1)
   }
   else if (!(a instanceof THREE.Camera))
   {
      b = this.__objects.indexOf(a);
      if (b !== -1)
      {
         this.__objects.splice(b, 1);
         this.__objectsRemoved.push(a);
         b = this.__objectsAdded.indexOf(a);
         b !== -1 && this.__objectsAdded.splice(b, 1)
      }
   }
   for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};
THREE.Fog = function (a, b, c)
{
   this.color = new THREE.Color(a);
   this.near = b !== void 0 ? b : 1;
   this.far = c !== void 0 ? c : 1E3
};
THREE.FogExp2 = function (a, b)
{
   this.color = new THREE.Color(a);
   this.density = b !== void 0 ? b : 2.5E-4
};
THREE.CanvasRenderer = function (a)
{
   function b(a)
   {
      if (w !== a) w = o.globalAlpha = a
   }

   function c(a)
   {
      if (t !== a)
      {
         if (a === THREE.NormalBlending) o.globalCompositeOperation =
            "source-over";
         else if (a === THREE.AdditiveBlending) o.globalCompositeOperation =
            "lighter";
         else if (a === THREE.SubtractiveBlending) o.globalCompositeOperation =
            "darker";
         t = a
      }
   }

   function d(a)
   {
      if (v !== a) v = o.strokeStyle = a
   }

   function e(a)
   {
      if (x !== a) x = o.fillStyle = a
   }
   console.log("THREE.CanvasRenderer", THREE.REVISION);
   var a = a ||
   {}, f = this,
      g, h, i, j = new THREE.Projector,
      l = a.canvas !==
         void 0 ? a.canvas : document.createElement("canvas"),
      m, n, p, r, o = l.getContext("2d"),
      q = new THREE.Color(0),
      s = 0,
      w = 1,
      t = 0,
      v = null,
      x = null,
      C = null,
      D = null,
      z = null,
      u, G, J, M, O = new THREE.RenderableVertex,
      X = new THREE.RenderableVertex,
      B, F, Q, E, aa, T, N, W, ba, H, ca, ia, S = new THREE.Color,
      R = new THREE.Color,
      P = new THREE.Color,
      U = new THREE.Color,
      fa = new THREE.Color,
      ma = [],
      Ga = [],
      na, Oa, Pa, bb, nb, gb, Ob, ob, kb, ec, Ua = new THREE.Rectangle,
      Da = new THREE.Rectangle,
      Aa = new THREE.Rectangle,
      hb = false,
      qa = new THREE.Color,
      Fa = new THREE.Color,
      Ra = new THREE.Color,
      sa = new THREE.Vector3,
      k, Ya, Gb, Va, pb, cb, a = 16;
   k = document.createElement("canvas");
   k.width = k.height = 2;
   Ya = k.getContext("2d");
   Ya.fillStyle = "rgba(0,0,0,1)";
   Ya.fillRect(0, 0, 2, 2);
   Gb = Ya.getImageData(0, 0, 2, 2);
   Va = Gb.data;
   pb = document.createElement("canvas");
   pb.width = pb.height = a;
   cb = pb.getContext("2d");
   cb.translate(-a / 2, -a / 2);
   cb.scale(a, a);
   a--;
   this.domElement = l;
   this.sortElements = this.sortObjects = this.autoClear = true;
   this.info = {
      render:
      {
         vertices: 0,
         faces: 0
      }
   };
   this.setSize = function (a, b)
   {
      m = a;
      n = b;
      p = Math.floor(m / 2);
      r = Math.floor(n /
         2);
      l.width = m;
      l.height = n;
      Ua.set(-p, -r, p, r);
      Da.set(-p, -r, p, r);
      w = 1;
      t = 0;
      z = D = C = x = v = null
   };
   this.setClearColor = function (a, b)
   {
      q.copy(a);
      s = b !== void 0 ? b : 1;
      Da.set(-p, -r, p, r)
   };
   this.setClearColorHex = function (a, b)
   {
      q.setHex(a);
      s = b !== void 0 ? b : 1;
      Da.set(-p, -r, p, r)
   };
   this.clear = function ()
   {
      o.setTransform(1, 0, 0, -1, p, r);
      if (Da.isEmpty() === false)
      {
         Da.minSelf(Ua);
         Da.inflate(2);
         s < 1 && o.clearRect(Math.floor(Da.getX()), Math.floor(Da.getY()),
            Math.floor(Da.getWidth()), Math.floor(Da.getHeight()));
         if (s > 0)
         {
            c(THREE.NormalBlending);
            b(1);
            e("rgba(" + Math.floor(q.r * 255) + "," + Math.floor(q.g * 255) +
               "," + Math.floor(q.b * 255) + "," + s + ")");
            o.fillRect(Math.floor(Da.getX()), Math.floor(Da.getY()), Math.floor(
               Da.getWidth()), Math.floor(Da.getHeight()))
         }
         Da.empty()
      }
   };
   this.render = function (a, l)
   {
      function m(a)
      {
         var b, c, d, e;
         qa.setRGB(0, 0, 0);
         Fa.setRGB(0, 0, 0);
         Ra.setRGB(0, 0, 0);
         b = 0;
         for (c = a.length; b < c; b++)
         {
            d = a[b];
            e = d.color;
            if (d instanceof THREE.AmbientLight)
            {
               qa.r = qa.r + e.r;
               qa.g = qa.g + e.g;
               qa.b = qa.b + e.b
            }
            else if (d instanceof THREE.DirectionalLight)
            {
               Fa.r = Fa.r + e.r;
               Fa.g =
                  Fa.g + e.g;
               Fa.b = Fa.b + e.b
            }
            else if (d instanceof THREE.PointLight)
            {
               Ra.r = Ra.r + e.r;
               Ra.g = Ra.g + e.g;
               Ra.b = Ra.b + e.b
            }
         }
      }

      function n(a, b, c, d)
      {
         var e, f, g, h, k, i;
         e = 0;
         for (f = a.length; e < f; e++)
         {
            g = a[e];
            h = g.color;
            if (g instanceof THREE.DirectionalLight)
            {
               k = g.matrixWorld.getPosition();
               i = c.dot(k);
               if (!(i <= 0))
               {
                  i = i * g.intensity;
                  d.r = d.r + h.r * i;
                  d.g = d.g + h.g * i;
                  d.b = d.b + h.b * i
               }
            }
            else if (g instanceof THREE.PointLight)
            {
               k = g.matrixWorld.getPosition();
               i = c.dot(sa.sub(k, b).normalize());
               if (!(i <= 0))
               {
                  i = i * (g.distance == 0 ? 1 : 1 - Math.min(b.distanceTo(k) /
                     g.distance, 1));
                  if (i != 0)
                  {
                     i = i * g.intensity;
                     d.r = d.r + h.r * i;
                     d.g = d.g + h.g * i;
                     d.b = d.b + h.b * i
                  }
               }
            }
         }
      }

      function q(a, f, g)
      {
         b(g.opacity);
         c(g.blending);
         var h, k, i, j, l, m;
         if (g instanceof THREE.ParticleBasicMaterial)
         {
            if (g.map !== null)
            {
               j = g.map.image;
               l = j.width >> 1;
               m = j.height >> 1;
               g = f.scale.x * p;
               i = f.scale.y * r;
               h = g * l;
               k = i * m;
               Aa.set(a.x - h, a.y - k, a.x + h, a.y + k);
               if (Ua.intersects(Aa) !== false)
               {
                  o.save();
                  o.translate(a.x, a.y);
                  o.rotate(-f.rotation);
                  o.scale(g, -i);
                  o.translate(-l, -m);
                  o.drawImage(j, 0, 0);
                  o.restore()
               }
            }
         }
         else if (g instanceof THREE.ParticleCanvasMaterial)
         {
            h =
               f.scale.x * p;
            k = f.scale.y * r;
            Aa.set(a.x - h, a.y - k, a.x + h, a.y + k);
            if (Ua.intersects(Aa) !== false)
            {
               d(g.color.getContextStyle());
               e(g.color.getContextStyle());
               o.save();
               o.translate(a.x, a.y);
               o.rotate(-f.rotation);
               o.scale(h, k);
               g.program(o);
               o.restore()
            }
         }
      }

      function s(a, e, f, g)
      {
         b(g.opacity);
         c(g.blending);
         o.beginPath();
         o.moveTo(a.positionScreen.x, a.positionScreen.y);
         o.lineTo(e.positionScreen.x, e.positionScreen.y);
         o.closePath();
         if (g instanceof THREE.LineBasicMaterial)
         {
            a = g.linewidth;
            if (C !== a) C = o.lineWidth = a;
            a = g.linecap;
            if (D !== a) D = o.lineCap = a;
            a = g.linejoin;
            if (z !== a) z = o.lineJoin = a;
            d(g.color.getContextStyle());
            o.stroke();
            Aa.inflate(g.linewidth * 2)
         }
      }

      function t(a, d, e, g, h, k, j, m)
      {
         f.info.render.vertices = f.info.render.vertices + 3;
         f.info.render.faces++;
         b(m.opacity);
         c(m.blending);
         B = a.positionScreen.x;
         F = a.positionScreen.y;
         Q = d.positionScreen.x;
         E = d.positionScreen.y;
         aa = e.positionScreen.x;
         T = e.positionScreen.y;
         w(B, F, Q, E, aa, T);
         if (m instanceof THREE.MeshBasicMaterial)
            if (m.map !== null)
            {
               if (m.map.mapping instanceof THREE.UVMapping)
               {
                  bb = j.uvs[0];
                  kd(B, F, Q, E, aa, T, bb[g].u, bb[g].v, bb[h].u, bb[h].v, bb[
                     k].u, bb[k].v, m.map)
               }
            }
            else if (m.envMap !== null)
         {
            if (m.envMap.mapping instanceof THREE.SphericalReflectionMapping)
            {
               a = l.matrixWorldInverse;
               sa.copy(j.vertexNormalsWorld[g]);
               nb = (sa.x * a.elements[0] + sa.y * a.elements[4] + sa.z * a.elements[
                  8]) * 0.5 + 0.5;
               gb = (sa.x * a.elements[1] + sa.y * a.elements[5] + sa.z * a.elements[
                  9]) * 0.5 + 0.5;
               sa.copy(j.vertexNormalsWorld[h]);
               Ob = (sa.x * a.elements[0] + sa.y * a.elements[4] + sa.z * a.elements[
                  8]) * 0.5 + 0.5;
               ob = (sa.x * a.elements[1] + sa.y * a.elements[5] +
                  sa.z * a.elements[9]) * 0.5 + 0.5;
               sa.copy(j.vertexNormalsWorld[k]);
               kb = (sa.x * a.elements[0] + sa.y * a.elements[4] + sa.z * a.elements[
                  8]) * 0.5 + 0.5;
               ec = (sa.x * a.elements[1] + sa.y * a.elements[5] + sa.z * a.elements[
                  9]) * 0.5 + 0.5;
               kd(B, F, Q, E, aa, T, nb, gb, Ob, ob, kb, ec, m.envMap)
            }
         }
         else m.wireframe === true ? Pb(m.color, m.wireframeLinewidth, m.wireframeLinecap,
            m.wireframeLinejoin) : Hb(m.color);
         else if (m instanceof THREE.MeshLambertMaterial)
            if (hb === true)
               if (m.wireframe === false && m.shading == THREE.SmoothShading &&
                  j.vertexNormalsWorld.length == 3)
               {
                  R.r =
                     P.r = U.r = qa.r;
                  R.g = P.g = U.g = qa.g;
                  R.b = P.b = U.b = qa.b;
                  n(i, j.v1.positionWorld, j.vertexNormalsWorld[0], R);
                  n(i, j.v2.positionWorld, j.vertexNormalsWorld[1], P);
                  n(i, j.v3.positionWorld, j.vertexNormalsWorld[2], U);
                  R.r = Math.max(0, Math.min(m.color.r * R.r, 1));
                  R.g = Math.max(0, Math.min(m.color.g * R.g, 1));
                  R.b = Math.max(0, Math.min(m.color.b * R.b, 1));
                  P.r = Math.max(0, Math.min(m.color.r * P.r, 1));
                  P.g = Math.max(0, Math.min(m.color.g * P.g, 1));
                  P.b = Math.max(0, Math.min(m.color.b * P.b, 1));
                  U.r = Math.max(0, Math.min(m.color.r * U.r, 1));
                  U.g = Math.max(0,
                     Math.min(m.color.g * U.g, 1));
                  U.b = Math.max(0, Math.min(m.color.b * U.b, 1));
                  fa.r = (P.r + U.r) * 0.5;
                  fa.g = (P.g + U.g) * 0.5;
                  fa.b = (P.b + U.b) * 0.5;
                  Pa = Ic(R, P, U, fa);
                  mc(B, F, Q, E, aa, T, 0, 0, 1, 0, 0, 1, Pa)
               }
               else
               {
                  S.r = qa.r;
                  S.g = qa.g;
                  S.b = qa.b;
                  n(i, j.centroidWorld, j.normalWorld, S);
                  S.r = Math.max(0, Math.min(m.color.r * S.r, 1));
                  S.g = Math.max(0, Math.min(m.color.g * S.g, 1));
                  S.b = Math.max(0, Math.min(m.color.b * S.b, 1));
                  m.wireframe === true ? Pb(S, m.wireframeLinewidth, m.wireframeLinecap,
                     m.wireframeLinejoin) : Hb(S)
               }
               else m.wireframe === true ? Pb(m.color, m.wireframeLinewidth,
                  m.wireframeLinecap, m.wireframeLinejoin) : Hb(m.color);
               else if (m instanceof THREE.MeshDepthMaterial)
         {
            na = l.near;
            Oa = l.far;
            R.r = R.g = R.b = 1 - gc(a.positionScreen.z, na, Oa);
            P.r = P.g = P.b = 1 - gc(d.positionScreen.z, na, Oa);
            U.r = U.g = U.b = 1 - gc(e.positionScreen.z, na, Oa);
            fa.r = (P.r + U.r) * 0.5;
            fa.g = (P.g + U.g) * 0.5;
            fa.b = (P.b + U.b) * 0.5;
            Pa = Ic(R, P, U, fa);
            mc(B, F, Q, E, aa, T, 0, 0, 1, 0, 0, 1, Pa)
         }
         else if (m instanceof THREE.MeshNormalMaterial)
         {
            S.r = nc(j.normalWorld.x);
            S.g = nc(j.normalWorld.y);
            S.b = nc(j.normalWorld.z);
            m.wireframe === true ? Pb(S, m.wireframeLinewidth,
               m.wireframeLinecap, m.wireframeLinejoin) : Hb(S)
         }
      }

      function v(a, d, e, g, h, k, j, m, o)
      {
         f.info.render.vertices = f.info.render.vertices + 4;
         f.info.render.faces++;
         b(m.opacity);
         c(m.blending);
         if (m.map !== void 0 && m.map !== null || m.envMap !== void 0 && m.envMap !==
            null)
         {
            t(a, d, g, 0, 1, 3, j, m, o);
            t(h, e, k, 1, 2, 3, j, m, o)
         }
         else
         {
            B = a.positionScreen.x;
            F = a.positionScreen.y;
            Q = d.positionScreen.x;
            E = d.positionScreen.y;
            aa = e.positionScreen.x;
            T = e.positionScreen.y;
            N = g.positionScreen.x;
            W = g.positionScreen.y;
            ba = h.positionScreen.x;
            H = h.positionScreen.y;
            ca = k.positionScreen.x;
            ia = k.positionScreen.y;
            if (m instanceof THREE.MeshBasicMaterial)
            {
               x(B, F, Q, E, aa, T, N, W);
               m.wireframe === true ? Pb(m.color, m.wireframeLinewidth, m.wireframeLinecap,
                  m.wireframeLinejoin) : Hb(m.color)
            }
            else if (m instanceof THREE.MeshLambertMaterial)
               if (hb === true)
                  if (!m.wireframe && m.shading == THREE.SmoothShading && j.vertexNormalsWorld
                     .length == 4)
                  {
                     R.r = P.r = U.r = fa.r = qa.r;
                     R.g = P.g = U.g = fa.g = qa.g;
                     R.b = P.b = U.b = fa.b = qa.b;
                     n(i, j.v1.positionWorld, j.vertexNormalsWorld[0], R);
                     n(i, j.v2.positionWorld, j.vertexNormalsWorld[1],
                        P);
                     n(i, j.v4.positionWorld, j.vertexNormalsWorld[3], U);
                     n(i, j.v3.positionWorld, j.vertexNormalsWorld[2], fa);
                     R.r = Math.max(0, Math.min(m.color.r * R.r, 1));
                     R.g = Math.max(0, Math.min(m.color.g * R.g, 1));
                     R.b = Math.max(0, Math.min(m.color.b * R.b, 1));
                     P.r = Math.max(0, Math.min(m.color.r * P.r, 1));
                     P.g = Math.max(0, Math.min(m.color.g * P.g, 1));
                     P.b = Math.max(0, Math.min(m.color.b * P.b, 1));
                     U.r = Math.max(0, Math.min(m.color.r * U.r, 1));
                     U.g = Math.max(0, Math.min(m.color.g * U.g, 1));
                     U.b = Math.max(0, Math.min(m.color.b * U.b, 1));
                     fa.r = Math.max(0, Math.min(m.color.r *
                        fa.r, 1));
                     fa.g = Math.max(0, Math.min(m.color.g * fa.g, 1));
                     fa.b = Math.max(0, Math.min(m.color.b * fa.b, 1));
                     Pa = Ic(R, P, U, fa);
                     w(B, F, Q, E, N, W);
                     mc(B, F, Q, E, N, W, 0, 0, 1, 0, 0, 1, Pa);
                     w(ba, H, aa, T, ca, ia);
                     mc(ba, H, aa, T, ca, ia, 1, 0, 1, 1, 0, 1, Pa)
                  }
                  else
                  {
                     S.r = qa.r;
                     S.g = qa.g;
                     S.b = qa.b;
                     n(i, j.centroidWorld, j.normalWorld, S);
                     S.r = Math.max(0, Math.min(m.color.r * S.r, 1));
                     S.g = Math.max(0, Math.min(m.color.g * S.g, 1));
                     S.b = Math.max(0, Math.min(m.color.b * S.b, 1));
                     x(B, F, Q, E, aa, T, N, W);
                     m.wireframe === true ? Pb(S, m.wireframeLinewidth, m.wireframeLinecap,
                        m.wireframeLinejoin) :
                        Hb(S)
                  }
                  else
                  {
                     x(B, F, Q, E, aa, T, N, W);
                     m.wireframe === true ? Pb(m.color, m.wireframeLinewidth, m
                        .wireframeLinecap, m.wireframeLinejoin) : Hb(m.color)
                  }
                  else if (m instanceof THREE.MeshNormalMaterial)
            {
               S.r = nc(j.normalWorld.x);
               S.g = nc(j.normalWorld.y);
               S.b = nc(j.normalWorld.z);
               x(B, F, Q, E, aa, T, N, W);
               m.wireframe === true ? Pb(S, m.wireframeLinewidth, m.wireframeLinecap,
                  m.wireframeLinejoin) : Hb(S)
            }
            else if (m instanceof THREE.MeshDepthMaterial)
            {
               na = l.near;
               Oa = l.far;
               R.r = R.g = R.b = 1 - gc(a.positionScreen.z, na, Oa);
               P.r = P.g = P.b = 1 - gc(d.positionScreen.z,
                  na, Oa);
               U.r = U.g = U.b = 1 - gc(g.positionScreen.z, na, Oa);
               fa.r = fa.g = fa.b = 1 - gc(e.positionScreen.z, na, Oa);
               Pa = Ic(R, P, U, fa);
               w(B, F, Q, E, N, W);
               mc(B, F, Q, E, N, W, 0, 0, 1, 0, 0, 1, Pa);
               w(ba, H, aa, T, ca, ia);
               mc(ba, H, aa, T, ca, ia, 1, 0, 1, 1, 0, 1, Pa)
            }
         }
      }

      function w(a, b, c, d, e, f)
      {
         o.beginPath();
         o.moveTo(a, b);
         o.lineTo(c, d);
         o.lineTo(e, f);
         o.lineTo(a, b)
      }

      function x(a, b, c, d, e, f, g, h)
      {
         o.beginPath();
         o.moveTo(a, b);
         o.lineTo(c, d);
         o.lineTo(e, f);
         o.lineTo(g, h);
         o.lineTo(a, b)
      }

      function Pb(a, b, c, e)
      {
         if (C !== b) C = o.lineWidth = b;
         if (D !== c) D = o.lineCap = c;
         if (z !== e) z = o.lineJoin =
            e;
         d(a.getContextStyle());
         o.stroke();
         Aa.inflate(b * 2)
      }

      function Hb(a)
      {
         e(a.getContextStyle());
         o.fill()
      }

      function kd(a, b, c, d, f, g, h, k, i, j, m, l, n)
      {
         if (!(n.image === void 0 || n.image.width === 0))
         {
            if (n.needsUpdate === true || ma[n.id] === void 0)
            {
               var p = n.wrapS == THREE.RepeatWrapping,
                  fc = n.wrapT == THREE.RepeatWrapping;
               ma[n.id] = o.createPattern(n.image, p === true && fc === true ?
                  "repeat" : p === true && fc === false ? "repeat-x" : p ===
                  false && fc === true ? "repeat-y" : "no-repeat");
               n.needsUpdate = false
            }
            e(ma[n.id]);
            var p = n.offset.x / n.repeat.x,
               fc = n.offset.y /
                  n.repeat.y,
               r = n.image.width * n.repeat.x,
               q = n.image.height * n.repeat.y,
               h = (h + p) * r,
               k = (1 - k + fc) * q,
               c = c - a,
               d = d - b,
               f = f - a,
               g = g - b,
               i = (i + p) * r - h,
               j = (1 - j + fc) * q - k,
               m = (m + p) * r - h,
               l = (1 - l + fc) * q - k,
               p = i * l - m * j;
            if (p === 0)
            {
               if (Ga[n.id] === void 0)
               {
                  b = document.createElement("canvas");
                  b.width = n.image.width;
                  b.height = n.image.height;
                  b = b.getContext("2d");
                  b.drawImage(n.image, 0, 0);
                  Ga[n.id] = b.getImageData(0, 0, n.image.width, n.image.height)
                     .data
               }
               b = Ga[n.id];
               h = (Math.floor(h) + Math.floor(k) * n.image.width) * 4;
               S.setRGB(b[h] / 255, b[h + 1] / 255, b[h + 2] / 255);
               Hb(S)
            }
            else
            {
               p =
                  1 / p;
               n = (l * c - j * f) * p;
               j = (l * d - j * g) * p;
               c = (i * f - m * c) * p;
               d = (i * g - m * d) * p;
               a = a - n * h - c * k;
               h = b - j * h - d * k;
               o.save();
               o.transform(n, j, c, d, a, h);
               o.fill();
               o.restore()
            }
         }
      }

      function mc(a, b, c, d, e, f, g, h, k, i, j, m, l)
      {
         var n, p;
         n = l.width - 1;
         p = l.height - 1;
         g = g * n;
         h = h * p;
         c = c - a;
         d = d - b;
         e = e - a;
         f = f - b;
         k = k * n - g;
         i = i * p - h;
         j = j * n - g;
         m = m * p - h;
         p = 1 / (k * m - j * i);
         n = (m * c - i * e) * p;
         i = (m * d - i * f) * p;
         c = (k * e - j * c) * p;
         d = (k * f - j * d) * p;
         a = a - n * g - c * h;
         b = b - i * g - d * h;
         o.save();
         o.transform(n, i, c, d, a, b);
         o.clip();
         o.drawImage(l, 0, 0);
         o.restore()
      }

      function Ic(a, b, c, d)
      {
         var e = ~~ (a.r * 255),
            f = ~~ (a.g * 255),
            a = ~~ (a.b * 255),
            g = ~~ (b.r * 255),
            h = ~~ (b.g * 255),
            b = ~~ (b.b * 255),
            i = ~~ (c.r * 255),
            j = ~~ (c.g * 255),
            c = ~~ (c.b * 255),
            m = ~~ (d.r * 255),
            l = ~~ (d.g * 255),
            d = ~~ (d.b * 255);
         Va[0] = e < 0 ? 0 : e > 255 ? 255 : e;
         Va[1] = f < 0 ? 0 : f > 255 ? 255 : f;
         Va[2] = a < 0 ? 0 : a > 255 ? 255 : a;
         Va[4] = g < 0 ? 0 : g > 255 ? 255 : g;
         Va[5] = h < 0 ? 0 : h > 255 ? 255 : h;
         Va[6] = b < 0 ? 0 : b > 255 ? 255 : b;
         Va[8] = i < 0 ? 0 : i > 255 ? 255 : i;
         Va[9] = j < 0 ? 0 : j > 255 ? 255 : j;
         Va[10] = c < 0 ? 0 : c > 255 ? 255 : c;
         Va[12] = m < 0 ? 0 : m > 255 ? 255 : m;
         Va[13] = l < 0 ? 0 : l > 255 ? 255 : l;
         Va[14] = d < 0 ? 0 : d > 255 ? 255 : d;
         Ya.putImageData(Gb, 0, 0);
         cb.drawImage(k, 0, 0);
         return pb
      }

      function gc(a, b,
         c)
      {
         a = (a - b) / (c - b);
         return a * a * (3 - 2 * a)
      }

      function nc(a)
      {
         a = (a + 1) * 0.5;
         return a < 0 ? 0 : a > 1 ? 1 : a
      }

      function Qb(a, b)
      {
         var c = b.x - a.x,
            d = b.y - a.y,
            e = c * c + d * d;
         if (e !== 0)
         {
            e = 1 / Math.sqrt(e);
            c = c * e;
            d = d * e;
            b.x = b.x + c;
            b.y = b.y + d;
            a.x = a.x - c;
            a.y = a.y - d
         }
      }
      var Jc, ld, Ma, ib;
      this.autoClear === true ? this.clear() : o.setTransform(1, 0, 0, -1, p, r);
      f.info.render.vertices = 0;
      f.info.render.faces = 0;
      g = j.projectScene(a, l, this.sortElements);
      h = g.elements;
      i = g.lights;
      hb = i.length > 0;
      hb === true && m(i);
      Jc = 0;
      for (ld = h.length; Jc < ld; Jc++)
      {
         Ma = h[Jc];
         ib = Ma.material;
         ib = ib instanceof
         THREE.MeshFaceMaterial ? Ma.faceMaterial : ib;
         if (!(ib === void 0 || ib.visible === false))
         {
            Aa.empty();
            if (Ma instanceof THREE.RenderableParticle)
            {
               u = Ma;
               u.x = u.x * p;
               u.y = u.y * r;
               q(u, Ma, ib, a)
            }
            else if (Ma instanceof THREE.RenderableLine)
            {
               u = Ma.v1;
               G = Ma.v2;
               u.positionScreen.x = u.positionScreen.x * p;
               u.positionScreen.y = u.positionScreen.y * r;
               G.positionScreen.x = G.positionScreen.x * p;
               G.positionScreen.y = G.positionScreen.y * r;
               Aa.addPoint(u.positionScreen.x, u.positionScreen.y);
               Aa.addPoint(G.positionScreen.x, G.positionScreen.y);
               Ua.intersects(Aa) ===
                  true && s(u, G, Ma, ib, a)
            }
            else if (Ma instanceof THREE.RenderableFace3)
            {
               u = Ma.v1;
               G = Ma.v2;
               J = Ma.v3;
               u.positionScreen.x = u.positionScreen.x * p;
               u.positionScreen.y = u.positionScreen.y * r;
               G.positionScreen.x = G.positionScreen.x * p;
               G.positionScreen.y = G.positionScreen.y * r;
               J.positionScreen.x = J.positionScreen.x * p;
               J.positionScreen.y = J.positionScreen.y * r;
               if (ib.overdraw === true)
               {
                  Qb(u.positionScreen, G.positionScreen);
                  Qb(G.positionScreen, J.positionScreen);
                  Qb(J.positionScreen, u.positionScreen)
               }
               Aa.add3Points(u.positionScreen.x, u.positionScreen.y,
                  G.positionScreen.x, G.positionScreen.y, J.positionScreen.x, J
                  .positionScreen.y);
               Ua.intersects(Aa) === true && t(u, G, J, 0, 1, 2, Ma, ib, a)
            }
            else if (Ma instanceof THREE.RenderableFace4)
            {
               u = Ma.v1;
               G = Ma.v2;
               J = Ma.v3;
               M = Ma.v4;
               u.positionScreen.x = u.positionScreen.x * p;
               u.positionScreen.y = u.positionScreen.y * r;
               G.positionScreen.x = G.positionScreen.x * p;
               G.positionScreen.y = G.positionScreen.y * r;
               J.positionScreen.x = J.positionScreen.x * p;
               J.positionScreen.y = J.positionScreen.y * r;
               M.positionScreen.x = M.positionScreen.x * p;
               M.positionScreen.y =
                  M.positionScreen.y * r;
               O.positionScreen.copy(G.positionScreen);
               X.positionScreen.copy(M.positionScreen);
               if (ib.overdraw === true)
               {
                  Qb(u.positionScreen, G.positionScreen);
                  Qb(G.positionScreen, M.positionScreen);
                  Qb(M.positionScreen, u.positionScreen);
                  Qb(J.positionScreen, O.positionScreen);
                  Qb(J.positionScreen, X.positionScreen)
               }
               Aa.addPoint(u.positionScreen.x, u.positionScreen.y);
               Aa.addPoint(G.positionScreen.x, G.positionScreen.y);
               Aa.addPoint(J.positionScreen.x, J.positionScreen.y);
               Aa.addPoint(M.positionScreen.x, M.positionScreen.y);
               Ua.intersects(Aa) === true && v(u, G, J, M, O, X, Ma, ib, a)
            }
            Da.addRectangle(Aa)
         }
      }
      o.setTransform(1, 0, 0, 1, 0, 0)
   }
};
THREE.ShaderChunk = {
   fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
   fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
   envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
   envmap_fragment: "#ifdef USE_ENVMAP\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
   envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
   envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
   map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
   map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
   map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
   map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
   map_vertex: "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
   map_fragment: "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
   lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
   lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
   lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
   lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
   lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
   lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nlVector = normalize( lVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
   lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvarying vec3 vWorldPosition;\n#endif",
   lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvWorldPosition = mPosition.xyz;\n#endif",
   lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
   lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
   color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
   color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
   color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
   color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
   skinning_pars_vertex: "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
   skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
   skinning_vertex: "#ifdef USE_SKINNING\nvec4 skinned  = boneMatX * skinVertexA * skinWeight.x;\nskinned \t  += boneMatY * skinVertexB * skinWeight.y;\ngl_Position  = projectionMatrix * modelViewMatrix * skinned;\n#endif",
   morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
   morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
   default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
   morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
   skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif",
   defaultnormal_vertex: "vec3 transformedNormal;\n#ifdef USE_SKINNING\ntransformedNormal = skinnedNormal.xyz;\n#endif\n#ifdef USE_MORPHNORMALS\ntransformedNormal = morphedNormal;\n#endif\n#ifndef USE_MORPHNORMALS\n#ifndef USE_SKINNING\ntransformedNormal = normal;\n#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;",
   shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
   shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
   shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
   shadowmap_vertex: "#ifdef USE_SHADOWMAP\nvec4 transformedPosition;\n#ifdef USE_MORPHTARGETS\ntransformedPosition = objectMatrix * vec4( morphed, 1.0 );\n#else\n#ifdef USE_SKINNING\ntransformedPosition = objectMatrix * skinned;\n#else\ntransformedPosition = objectMatrix * vec4( position, 1.0 );\n#endif\n#endif\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * transformedPosition;\n}\n#endif",
   alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
   linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
   merge: function (a)
   {
      var b, c, d, e = {};
      for (b = 0; b < a.length; b++)
      {
         d = this.clone(a[b]);
         for (c in d) e[c] = d[c]
      }
      return e
   },
   clone: function (a)
   {
      var b, c, d, e = {};
      for (b in a)
      {
         e[b] = {};
         for (c in a[b])
         {
            d = a[b][c];
            e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 ||
               d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE
               .Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ?
               d.slice() : d
         }
      }
      return e
   }
};
THREE.UniformsLib = {
   common:
   {
      diffuse:
      {
         type: "c",
         value: new THREE.Color(15658734)
      },
      opacity:
      {
         type: "f",
         value: 1
      },
      map:
      {
         type: "t",
         value: 0,
         texture: null
      },
      offsetRepeat:
      {
         type: "v4",
         value: new THREE.Vector4(0, 0, 1, 1)
      },
      lightMap:
      {
         type: "t",
         value: 2,
         texture: null
      },
      envMap:
      {
         type: "t",
         value: 1,
         texture: null
      },
      flipEnvMap:
      {
         type: "f",
         value: -1
      },
      useRefract:
      {
         type: "i",
         value: 0
      },
      reflectivity:
      {
         type: "f",
         value: 1
      },
      refractionRatio:
      {
         type: "f",
         value: 0.98
      },
      combine:
      {
         type: "i",
         value: 0
      },
      morphTargetInfluences:
      {
         type: "f",
         value: 0
      }
   },
   fog:
   {
      fogDensity:
      {
         type: "f",
         value: 2.5E-4
      },
      fogNear:
      {
         type: "f",
         value: 1
      },
      fogFar:
      {
         type: "f",
         value: 2E3
      },
      fogColor:
      {
         type: "c",
         value: new THREE.Color(16777215)
      }
   },
   lights:
   {
      ambientLightColor:
      {
         type: "fv",
         value: []
      },
      directionalLightDirection:
      {
         type: "fv",
         value: []
      },
      directionalLightColor:
      {
         type: "fv",
         value: []
      },
      pointLightColor:
      {
         type: "fv",
         value: []
      },
      pointLightPosition:
      {
         type: "fv",
         value: []
      },
      pointLightDistance:
      {
         type: "fv1",
         value: []
      },
      spotLightColor:
      {
         type: "fv",
         value: []
      },
      spotLightPosition:
      {
         type: "fv",
         value: []
      },
      spotLightDirection:
      {
         type: "fv",
         value: []
      },
      spotLightDistance:
      {
         type: "fv1",
         value: []
      },
      spotLightAngle:
      {
         type: "fv1",
         value: []
      },
      spotLightExponent:
      {
         type: "fv1",
         value: []
      }
   },
   particle:
   {
      psColor:
      {
         type: "c",
         value: new THREE.Color(15658734)
      },
      opacity:
      {
         type: "f",
         value: 1
      },
      size:
      {
         type: "f",
         value: 1
      },
      scale:
      {
         type: "f",
         value: 1
      },
      map:
      {
         type: "t",
         value: 0,
         texture: null
      },
      fogDensity:
      {
         type: "f",
         value: 2.5E-4
      },
      fogNear:
      {
         type: "f",
         value: 1
      },
      fogFar:
      {
         type: "f",
         value: 2E3
      },
      fogColor:
      {
         type: "c",
         value: new THREE.Color(16777215)
      }
   },
   shadowmap:
   {
      shadowMap:
      {
         type: "tv",
         value: 6,
         texture: []
      },
      shadowMapSize:
      {
         type: "v2v",
         value: []
      },
      shadowBias:
      {
         type: "fv1",
         value: []
      },
      shadowDarkness:
      {
         type: "fv1",
         value: []
      },
      shadowMatrix:
      {
         type: "m4v",
         value: []
      }
   }
};
THREE.ShaderLib = {
   depth:
   {
      uniforms:
      {
         mNear:
         {
            type: "f",
            value: 1
         },
         mFar:
         {
            type: "f",
            value: 2E3
         },
         opacity:
         {
            type: "f",
            value: 1
         }
      },
      vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
   },
   normal:
   {
      uniforms:
      {
         opacity:
         {
            type: "f",
            value: 1
         }
      },
      vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",
      fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
   },
   basic:
   {
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib
         .fog, THREE.UniformsLib.shadowmap
      ]),
      vertexShader: [THREE.ShaderChunk.map_pars_vertex,
         THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex,
         THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex,
         THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex,
         "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
         THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE
         .ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk
         .skinbase_vertex, THREE.ShaderChunk.skinning_vertex,
         THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex,
         THREE.ShaderChunk.shadowmap_vertex, "}"
      ].join("\n"),
      fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk
         .color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk
         .lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE
         .ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment,
         "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk
         .map_fragment,
         THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.lightmap_fragment,
         THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment,
         THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment,
         THREE.ShaderChunk.fog_fragment, "}"
      ].join("\n")
   },
   lambert:
   {
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib
         .fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap,
         {
            ambient:
            {
               type: "c",
               value: new THREE.Color(16777215)
            },
            emissive:
            {
               type: "c",
               value: new THREE.Color(0)
            },
            wrapRGB:
            {
               type: "v3",
               value: new THREE.Vector3(1, 1, 1)
            }
         }
      ]),
      vertexShader: [
         "varying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
         THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex,
         THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex,
         THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex,
         THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex,
         "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
         THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE
         .ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk
         .morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk
         .skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex,
         "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif",
         THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.skinning_vertex,
         THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex,
         THREE.ShaderChunk.shadowmap_vertex, "}"
      ].join("\n"),
      fragmentShader: [
         "uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
         THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment,
         THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment,
         THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment,
         "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk
         .map_fragment, THREE.ShaderChunk.alphatest_fragment,
         "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",
         THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment,
         THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment,
         THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment,
         "}"
      ].join("\n")
   },
   phong:
   {
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib
         .fog, THREE.UniformsLib.lights,
         THREE.UniformsLib.shadowmap,
         {
            ambient:
            {
               type: "c",
               value: new THREE.Color(16777215)
            },
            emissive:
            {
               type: "c",
               value: new THREE.Color(0)
            },
            specular:
            {
               type: "c",
               value: new THREE.Color(1118481)
            },
            shininess:
            {
               type: "f",
               value: 30
            },
            wrapRGB:
            {
               type: "v3",
               value: new THREE.Vector3(1, 1, 1)
            }
         }
      ]),
      vertexShader: ["varying vec3 vViewPosition;\nvarying vec3 vNormal;",
         THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex,
         THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex,
         THREE.ShaderChunk.color_pars_vertex,
         THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex,
         THREE.ShaderChunk.shadowmap_pars_vertex,
         "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
         THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE
         .ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex,
         "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;",
         THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex,
         THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex,
         "vNormal = transformedNormal;", THREE.ShaderChunk.lights_phong_vertex,
         THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex,
         THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.shadowmap_vertex,
         "}"
      ].join("\n"),
      fragmentShader: [
         "uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",
         THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment,
         THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment,
         THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment,
         THREE.ShaderChunk.shadowmap_pars_fragment,
         "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk
         .map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk
         .lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk
         .color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment,
         THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment,
         "}"
      ].join("\n")
   },
   particle_basic:
   {
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib
         .shadowmap
      ]),
      vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk
         .color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex,
         "void main() {", THREE.ShaderChunk.color_vertex,
         "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
         THREE.ShaderChunk.shadowmap_vertex, "}"
      ].join("\n"),
      fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk
         .color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment,
         THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment,
         "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk
         .map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk
         .color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk
         .fog_fragment,
         "}"
      ].join("\n")
   },
   depthRGBA:
   {
      uniforms:
      {},
      vertexShader: [THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex,
         "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
         THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinning_vertex,
         THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex,
         "}"
      ].join("\n"),
      fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
   }
};
THREE.WebGLRenderer = function (a)
{
   function b(a, b)
   {
      var c = a.vertices.length,
         d = b.material;
      if (d.attributes)
      {
         if (a.__webglCustomAttributesList === void 0) a.__webglCustomAttributesList = [];
         for (var e in d.attributes)
         {
            var f = d.attributes[e];
            if (!f.__webglInitialized || f.createUniqueBuffers)
            {
               f.__webglInitialized = true;
               var g = 1;
               f.type === "v2" ? g = 2 : f.type === "v3" ? g = 3 : f.type ===
                  "v4" ? g = 4 : f.type === "c" && (g = 3);
               f.size = g;
               f.array = new Float32Array(c * g);
               f.buffer = k.createBuffer();
               f.buffer.belongsToAttribute = e;
               f.needsUpdate = true
            }
            a.__webglCustomAttributesList.push(f)
         }
      }
   }

   function c(a, b)
   {
      if (a.material && !(a.material instanceof THREE.MeshFaceMaterial)) return a
         .material;
      if (b.materialIndex >= 0) return a.geometry.materials[b.materialIndex]
   }

   function d(a)
   {
      return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE
         .MeshDepthMaterial ? false : a && a.shading !== void 0 && a.shading ===
         THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading
   }

   function e(a)
   {
      return a.map || a.lightMap || a instanceof THREE.ShaderMaterial ? true :
         false
   }

   function f(a, b, c)
   {
      var d, e, f, g, h = a.vertices;
      g = h.length;
      var i = a.colors,
         j = i.length,
         m = a.__vertexArray,
         l = a.__colorArray,
         n = a.__sortArray,
         o = a.verticesNeedUpdate,
         p = a.colorsNeedUpdate,
         r = a.__webglCustomAttributesList;
      if (c.sortParticles)
      {
         hb.copy(Aa);
         hb.multiplySelf(c.matrixWorld);
         for (d = 0; d < g; d++)
         {
            e = h[d];
            qa.copy(e);
            hb.multiplyVector3(qa);
            n[d] = [qa.z, d]
         }
         n.sort(function (a, b)
         {
            return b[0] - a[0]
         });
         for (d = 0; d < g; d++)
         {
            e = h[n[d][1]];
            f = d * 3;
            m[f] = e.x;
            m[f + 1] = e.y;
            m[f + 2] = e.z
         }
         for (d = 0; d < j; d++)
         {
            f = d * 3;
            e = i[n[d][1]];
            l[f] = e.r;
            l[f + 1] = e.g;
            l[f + 2] = e.b
         }
         if (r)
         {
            i = 0;
            for (j = r.length; i < j; i++)
            {
               h = r[i];
               if (h.boundTo === void 0 || h.boundTo === "vertices")
               {
                  f = 0;
                  e = h.value.length;
                  if (h.size === 1)
                     for (d = 0; d < e; d++)
                     {
                        g = n[d][1];
                        h.array[d] = h.value[g]
                     }
                  else if (h.size === 2)
                     for (d = 0; d < e; d++)
                     {
                        g = n[d][1];
                        g = h.value[g];
                        h.array[f] = g.x;
                        h.array[f + 1] = g.y;
                        f = f + 2
                     }
                  else if (h.size === 3)
                     if (h.type === "c")
                        for (d = 0; d < e; d++)
                        {
                           g = n[d][1];
                           g = h.value[g];
                           h.array[f] = g.r;
                           h.array[f + 1] = g.g;
                           h.array[f + 2] = g.b;
                           f = f + 3
                        }
                     else
                        for (d = 0; d < e; d++)
                        {
                           g = n[d][1];
                           g = h.value[g];
                           h.array[f] = g.x;
                           h.array[f + 1] = g.y;
                           h.array[f + 2] = g.z;
                           f = f + 3
                        }
                     else if (h.size === 4)
                     for (d = 0; d < e; d++)
                     {
                        g = n[d][1];
                        g = h.value[g];
                        h.array[f] = g.x;
                        h.array[f + 1] = g.y;
                        h.array[f + 2] = g.z;
                        h.array[f + 3] = g.w;
                        f = f + 4
                     }
               }
            }
         }
      }
      else
      {
         if (o)
            for (d = 0; d < g; d++)
            {
               e = h[d];
               f = d * 3;
               m[f] = e.x;
               m[f + 1] = e.y;
               m[f + 2] = e.z
            }
         if (p)
            for (d = 0; d < j; d++)
            {
               e = i[d];
               f = d * 3;
               l[f] = e.r;
               l[f + 1] = e.g;
               l[f + 2] = e.b
            }
         if (r)
         {
            i = 0;
            for (j = r.length; i < j; i++)
            {
               h = r[i];
               if (h.needsUpdate && (h.boundTo === void 0 || h.boundTo ===
                  "vertices"))
               {
                  e = h.value.length;
                  f = 0;
                  if (h.size === 1)
                     for (d = 0; d < e; d++) h.array[d] = h.value[d];
                  else if (h.size === 2)
                     for (d = 0; d < e; d++)
                     {
                        g = h.value[d];
                        h.array[f] = g.x;
                        h.array[f + 1] = g.y;
                        f = f + 2
                     }
                  else if (h.size ===
                     3)
                     if (h.type === "c")
                        for (d = 0; d < e; d++)
                        {
                           g = h.value[d];
                           h.array[f] = g.r;
                           h.array[f + 1] = g.g;
                           h.array[f + 2] = g.b;
                           f = f + 3
                        }
                     else
                        for (d = 0; d < e; d++)
                        {
                           g = h.value[d];
                           h.array[f] = g.x;
                           h.array[f + 1] = g.y;
                           h.array[f + 2] = g.z;
                           f = f + 3
                        }
                     else if (h.size === 4)
                     for (d = 0; d < e; d++)
                     {
                        g = h.value[d];
                        h.array[f] = g.x;
                        h.array[f + 1] = g.y;
                        h.array[f + 2] = g.z;
                        h.array[f + 3] = g.w;
                        f = f + 4
                     }
               }
            }
         }
      } if (o || c.sortParticles)
      {
         k.bindBuffer(k.ARRAY_BUFFER, a.__webglVertexBuffer);
         k.bufferData(k.ARRAY_BUFFER, m, b)
      }
      if (p || c.sortParticles)
      {
         k.bindBuffer(k.ARRAY_BUFFER, a.__webglColorBuffer);
         k.bufferData(k.ARRAY_BUFFER,
            l, b)
      }
      if (r)
      {
         i = 0;
         for (j = r.length; i < j; i++)
         {
            h = r[i];
            if (h.needsUpdate || c.sortParticles)
            {
               k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
               k.bufferData(k.ARRAY_BUFFER, h.array, b)
            }
         }
      }
   }

   function g(a, b)
   {
      return b.z - a.z
   }

   function h(a, b)
   {
      return b[1] - a[1]
   }

   function i(a, b, c)
   {
      if (a.length)
         for (var d = 0, f = a.length; d < f; d++)
         {
            ca = N = null;
            ba = H = R = S = na = Ga = P = -1;
            Ra = true;
            a[d].render(b, c, ec, Ua);
            ca = N = null;
            ba = H = R = S = na = Ga = P = -1;
            Ra = true
         }
   }

   function j(a, b, c, d, f, e, g, h)
   {
      var i, k, j, m;
      if (b)
      {
         k = a.length - 1;
         m = b = -1
      }
      else
      {
         k = 0;
         b = a.length;
         m = 1
      }
      for (var l = k; l !== b; l = l + m)
      {
         i =
            a[l];
         if (i.render)
         {
            k = i.object;
            j = i.buffer;
            if (h) i = h;
            else
            {
               i = i[c];
               if (!i) continue;
               g && E.setBlending(i.blending, i.blendEquation, i.blendSrc, i.blendDst);
               E.setDepthTest(i.depthTest);
               E.setDepthWrite(i.depthWrite);
               w(i.polygonOffset, i.polygonOffsetFactor, i.polygonOffsetUnits)
            }
            E.setObjectFaces(k);
            j instanceof THREE.BufferGeometry ? E.renderBufferDirect(d, f, e, i,
               j, k) : E.renderBuffer(d, f, e, i, j, k)
         }
      }
   }

   function l(a, b, c, d, f, e, g)
   {
      for (var h, i, k = 0, j = a.length; k < j; k++)
      {
         h = a[k];
         i = h.object;
         if (i.visible)
         {
            if (g) h = g;
            else
            {
               h = h[b];
               if (!h) continue;
               e && E.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst);
               E.setDepthTest(h.depthTest);
               E.setDepthWrite(h.depthWrite);
               w(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits)
            }
            E.renderImmediateObject(c, d, f, h, i)
         }
      }
   }

   function m(a, b, c)
   {
      a.push(
      {
         buffer: b,
         object: c,
         opaque: null,
         transparent: null
      })
   }

   function n(a)
   {
      for (var b in a.attributes)
         if (a.attributes[b].needsUpdate) return true;
      return false
   }

   function p(a)
   {
      for (var b in a.attributes) a.attributes[b].needsUpdate = false
   }

   function r(a, b)
   {
      for (var c = a.length -
         1; c >= 0; c--) a[c].object === b && a.splice(c, 1)
   }

   function o(a, b)
   {
      for (var c = a.length - 1; c >= 0; c--) a[c] === b && a.splice(c, 1)
   }

   function q(a, b, c, d, f)
   {
      if (d.needsUpdate)
      {
         d.program && E.deallocateMaterial(d);
         E.initMaterial(d, b, c, f);
         d.needsUpdate = false
      }
      if (d.morphTargets && !f.__webglMorphTargetInfluences) f.__webglMorphTargetInfluences =
         new Float32Array(E.maxMorphTargets);
      var e = false,
         g = d.program,
         h = g.uniforms,
         i = d.uniforms;
      if (g !== N)
      {
         k.useProgram(g);
         N = g;
         e = true
      }
      if (d.id !== ba)
      {
         ba = d.id;
         e = true
      }
      if (e || a !== ca)
      {
         k.uniformMatrix4fv(h.projectionMatrix,
            false, a._projectionMatrixArray);
         a !== ca && (ca = a)
      }
      if (e)
      {
         if (c && d.fog)
         {
            i.fogColor.value = c.color;
            if (c instanceof THREE.Fog)
            {
               i.fogNear.value = c.near;
               i.fogFar.value = c.far
            }
            else if (c instanceof THREE.FogExp2) i.fogDensity.value = c.density
         }
         if (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial ||
            d.lights)
         {
            if (Ra)
            {
               for (var j, m = 0, l = 0, n = 0, o, p, r, q = sa, s = q.directional
                     .colors, u = q.directional.positions, t = q.point.colors,
                     w = q.point.positions, x = q.point.distances, C = q.spot.colors,
                     B = q.spot.positions, H = q.spot.distances,
                     R = q.spot.directions, G = q.spot.angles, J = q.spot.exponents,
                     F = 0, M = 0, U = 0, P = r = 0, c = P = 0, e = b.length; c <
                  e; c++)
               {
                  j = b[c];
                  if (!j.onlyShadow && j.visible)
                  {
                     o = j.color;
                     p = j.intensity;
                     r = j.distance;
                     if (j instanceof THREE.AmbientLight)
                        if (E.gammaInput)
                        {
                           m = m + o.r * o.r;
                           l = l + o.g * o.g;
                           n = n + o.b * o.b
                        }
                        else
                        {
                           m = m + o.r;
                           l = l + o.g;
                           n = n + o.b
                        }
                        else if (j instanceof THREE.DirectionalLight)
                     {
                        r = F * 3;
                        if (E.gammaInput)
                        {
                           s[r] = o.r * o.r * p * p;
                           s[r + 1] = o.g * o.g * p * p;
                           s[r + 2] = o.b * o.b * p * p
                        }
                        else
                        {
                           s[r] = o.r * p;
                           s[r + 1] = o.g * p;
                           s[r + 2] = o.b * p
                        }
                        Fa.copy(j.matrixWorld.getPosition());
                        Fa.subSelf(j.target.matrixWorld.getPosition());
                        Fa.normalize();
                        u[r] = Fa.x;
                        u[r + 1] = Fa.y;
                        u[r + 2] = Fa.z;
                        F = F + 1
                     }
                     else if (j instanceof THREE.PointLight)
                     {
                        P = M * 3;
                        if (E.gammaInput)
                        {
                           t[P] = o.r * o.r * p * p;
                           t[P + 1] = o.g * o.g * p * p;
                           t[P + 2] = o.b * o.b * p * p
                        }
                        else
                        {
                           t[P] = o.r * p;
                           t[P + 1] = o.g * p;
                           t[P + 2] = o.b * p
                        }
                        o = j.matrixWorld.getPosition();
                        w[P] = o.x;
                        w[P + 1] = o.y;
                        w[P + 2] = o.z;
                        x[M] = r;
                        M = M + 1
                     }
                     else if (j instanceof THREE.SpotLight)
                     {
                        P = U * 3;
                        if (E.gammaInput)
                        {
                           C[P] = o.r * o.r * p * p;
                           C[P + 1] = o.g * o.g * p * p;
                           C[P + 2] = o.b * o.b * p * p
                        }
                        else
                        {
                           C[P] = o.r * p;
                           C[P + 1] = o.g * p;
                           C[P + 2] = o.b * p
                        }
                        o = j.matrixWorld.getPosition();
                        B[P] = o.x;
                        B[P + 1] = o.y;
                        B[P + 2] =
                           o.z;
                        H[U] = r;
                        Fa.copy(o);
                        Fa.subSelf(j.target.matrixWorld.getPosition());
                        Fa.normalize();
                        R[P] = Fa.x;
                        R[P + 1] = Fa.y;
                        R[P + 2] = Fa.z;
                        G[U] = Math.cos(j.angle);
                        J[U] = j.exponent;
                        U = U + 1
                     }
                  }
               }
               c = F * 3;
               for (e = s.length; c < e; c++) s[c] = 0;
               c = M * 3;
               for (e = t.length; c < e; c++) t[c] = 0;
               c = U * 3;
               for (e = C.length; c < e; c++) C[c] = 0;
               q.directional.length = F;
               q.point.length = M;
               q.spot.length = U;
               q.ambient[0] = m;
               q.ambient[1] = l;
               q.ambient[2] = n;
               Ra = false
            }
            c = sa;
            i.ambientLightColor.value = c.ambient;
            i.directionalLightColor.value = c.directional.colors;
            i.directionalLightDirection.value =
               c.directional.positions;
            i.pointLightColor.value = c.point.colors;
            i.pointLightPosition.value = c.point.positions;
            i.pointLightDistance.value = c.point.distances;
            i.spotLightColor.value = c.spot.colors;
            i.spotLightPosition.value = c.spot.positions;
            i.spotLightDistance.value = c.spot.distances;
            i.spotLightDirection.value = c.spot.directions;
            i.spotLightAngle.value = c.spot.angles;
            i.spotLightExponent.value = c.spot.exponents
         }
         if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial ||
            d instanceof THREE.MeshPhongMaterial)
         {
            i.opacity.value =
               d.opacity;
            E.gammaInput ? i.diffuse.value.copyGammaToLinear(d.color) : i.diffuse
               .value = d.color;
            (i.map.texture = d.map) && i.offsetRepeat.value.set(d.map.offset.x,
                  d.map.offset.y, d.map.repeat.x, d.map.repeat.y);
            i.lightMap.texture = d.lightMap;
            i.envMap.texture = d.envMap;
            i.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ?
               1 : -1;
            i.reflectivity.value = d.reflectivity;
            i.refractionRatio.value = d.refractionRatio;
            i.combine.value = d.combine;
            i.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping
         }
         if (d instanceof THREE.LineBasicMaterial)
         {
            i.diffuse.value = d.color;
            i.opacity.value = d.opacity
         }
         else if (d instanceof THREE.ParticleBasicMaterial)
         {
            i.psColor.value = d.color;
            i.opacity.value = d.opacity;
            i.size.value = d.size;
            i.scale.value = z.height / 2;
            i.map.texture = d.map
         }
         else if (d instanceof THREE.MeshPhongMaterial)
         {
            i.shininess.value = d.shininess;
            if (E.gammaInput)
            {
               i.ambient.value.copyGammaToLinear(d.ambient);
               i.emissive.value.copyGammaToLinear(d.emissive);
               i.specular.value.copyGammaToLinear(d.specular)
            }
            else
            {
               i.ambient.value = d.ambient;
               i.emissive.value = d.emissive;
               i.specular.value = d.specular
            }
            d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)
         }
         else if (d instanceof THREE.MeshLambertMaterial)
         {
            if (E.gammaInput)
            {
               i.ambient.value.copyGammaToLinear(d.ambient);
               i.emissive.value.copyGammaToLinear(d.emissive)
            }
            else
            {
               i.ambient.value = d.ambient;
               i.emissive.value = d.emissive
            }
            d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)
         }
         else if (d instanceof THREE.MeshDepthMaterial)
         {
            i.mNear.value = a.near;
            i.mFar.value = a.far;
            i.opacity.value = d.opacity
         }
         else if (d instanceof THREE.MeshNormalMaterial) i.opacity.value =
            d.opacity;
         if (f.receiveShadow && !d._shadowPass && i.shadowMatrix)
         {
            e = c = 0;
            for (j = b.length; e < j; e++)
            {
               m = b[e];
               if (m.castShadow && (m instanceof THREE.SpotLight || m instanceof THREE
                  .DirectionalLight && !m.shadowCascade))
               {
                  i.shadowMap.texture[c] = m.shadowMap;
                  i.shadowMapSize.value[c] = m.shadowMapSize;
                  i.shadowMatrix.value[c] = m.shadowMatrix;
                  i.shadowDarkness.value[c] = m.shadowDarkness;
                  i.shadowBias.value[c] = m.shadowBias;
                  c++
               }
            }
         }
         b = d.uniformsList;
         i = 0;
         for (c = b.length; i < c; i++)
            if (m = g.uniforms[b[i][1]])
            {
               e = b[i][0];
               l = e.type;
               j = e.value;
               if (l === "i") k.uniform1i(m, j);
               else if (l === "f") k.uniform1f(m, j);
               else if (l === "v2") k.uniform2f(m, j.x, j.y);
               else if (l === "v3") k.uniform3f(m, j.x, j.y, j.z);
               else if (l === "v4") k.uniform4f(m, j.x, j.y, j.z, j.w);
               else if (l === "c") k.uniform3f(m, j.r, j.g, j.b);
               else if (l === "iv1") k.uniform1iv(m, j);
               else if (l === "iv") k.uniform3iv(m, j);
               else if (l === "fv1") k.uniform1fv(m, j);
               else if (l === "fv") k.uniform3fv(m, j);
               else if (l === "v2v")
               {
                  if (e._array === void 0) e._array = new Float32Array(2 * j.length);
                  l = 0;
                  for (n = j.length; l < n; l++)
                  {
                     q = l * 2;
                     e._array[q] =
                        j[l].x;
                     e._array[q + 1] = j[l].y
                  }
                  k.uniform2fv(m, e._array)
               }
               else if (l === "v3v")
               {
                  if (e._array === void 0) e._array = new Float32Array(3 * j.length);
                  l = 0;
                  for (n = j.length; l < n; l++)
                  {
                     q = l * 3;
                     e._array[q] = j[l].x;
                     e._array[q + 1] = j[l].y;
                     e._array[q + 2] = j[l].z
                  }
                  k.uniform3fv(m, e._array)
               }
               else if (l === "v4v")
               {
                  if (e._array === void 0) e._array = new Float32Array(4 * j.length);
                  l = 0;
                  for (n = j.length; l < n; l++)
                  {
                     q = l * 4;
                     e._array[q] = j[l].x;
                     e._array[q + 1] = j[l].y;
                     e._array[q + 2] = j[l].z;
                     e._array[q + 3] = j[l].w
                  }
                  k.uniform4fv(m, e._array)
               }
               else if (l === "m4")
               {
                  if (e._array ===
                     void 0) e._array = new Float32Array(16);
                  j.flattenToArray(e._array);
                  k.uniformMatrix4fv(m, false, e._array)
               }
               else if (l === "m4v")
               {
                  if (e._array === void 0) e._array = new Float32Array(16 * j.length);
                  l = 0;
                  for (n = j.length; l < n; l++) j[l].flattenToArrayOffset(e._array,
                     l * 16);
                  k.uniformMatrix4fv(m, false, e._array)
               }
               else if (l === "t")
               {
                  k.uniform1i(m, j);
                  if (m = e.texture)
                     if (m.image instanceof Array && m.image.length === 6)
                     {
                        e = m;
                        if (e.image.length === 6)
                           if (e.needsUpdate)
                           {
                              if (!e.image.__webglTextureCube) e.image.__webglTextureCube =
                                 k.createTexture();
                              k.activeTexture(k.TEXTURE0 + j);
                              k.bindTexture(k.TEXTURE_CUBE_MAP, e.image.__webglTextureCube);
                              k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, e.flipY);
                              j = [];
                              for (m = 0; m < 6; m++)
                              {
                                 l = j;
                                 n = m;
                                 if (E.autoScaleCubemaps)
                                 {
                                    q = e.image[m];
                                    u = Va;
                                    if (!(q.width <= u && q.height <= u))
                                    {
                                       t = Math.max(q.width, q.height);
                                       s = Math.floor(q.width * u / t);
                                       u = Math.floor(q.height * u / t);
                                       t = document.createElement("canvas");
                                       t.width = s;
                                       t.height = u;
                                       t.getContext("2d").drawImage(q, 0, 0, q.width,
                                          q.height, 0, 0, s, u);
                                       q = t
                                    }
                                 }
                                 else q = e.image[m];
                                 l[n] = q
                              }
                              m = j[0];
                              l = (m.width & m.width - 1) === 0 &&
                                 (m.height & m.height - 1) === 0;
                              n = D(e.format);
                              q = D(e.type);
                              v(k.TEXTURE_CUBE_MAP, e, l);
                              for (m = 0; m < 6; m++) k.texImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X +
                                 m, 0, n, n, q, j[m]);
                              e.generateMipmaps && l && k.generateMipmap(k.TEXTURE_CUBE_MAP);
                              e.needsUpdate = false;
                              if (e.onUpdate) e.onUpdate()
                           }
                           else
                           {
                              k.activeTexture(k.TEXTURE0 + j);
                              k.bindTexture(k.TEXTURE_CUBE_MAP, e.image.__webglTextureCube)
                           }
                     }
                     else if (m instanceof THREE.WebGLRenderTargetCube)
                  {
                     e = m;
                     k.activeTexture(k.TEXTURE0 + j);
                     k.bindTexture(k.TEXTURE_CUBE_MAP, e.__webglTexture)
                  }
                  else E.setTexture(m,
                     j)
               }
               else if (l === "tv")
               {
                  if (e._array === void 0)
                  {
                     e._array = [];
                     l = 0;
                     for (n = e.texture.length; l < n; l++) e._array[l] = j + l
                  }
                  k.uniform1iv(m, e._array);
                  l = 0;
                  for (n = e.texture.length; l < n; l++)(m = e.texture[l]) && E
                     .setTexture(m, e._array[l])
               }
            }
         if ((d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial ||
            d.envMap) && h.cameraPosition !== null)
         {
            b = a.matrixWorld.getPosition();
            k.uniform3f(h.cameraPosition, b.x, b.y, b.z)
         }(d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial ||
            d instanceof THREE.ShaderMaterial ||
            d.skinning) && h.viewMatrix !== null && k.uniformMatrix4fv(h.viewMatrix,
            false, a._viewMatrixArray)
      }
      if (d.skinning)
         if (dc && f.useVertexTexture)
         {
            if (h.boneTexture !== null)
            {
               k.uniform1i(h.boneTexture, 12);
               E.setTexture(f.boneTexture, 12)
            }
         }
         else h.boneGlobalMatrices !== null && k.uniformMatrix4fv(h.boneGlobalMatrices,
            false, f.boneMatrices);
      k.uniformMatrix4fv(h.modelViewMatrix, false, f._modelViewMatrix.elements);
      h.normalMatrix && k.uniformMatrix3fv(h.normalMatrix, false, f._normalMatrix
         .elements);
      h.objectMatrix !== null && k.uniformMatrix4fv(h.objectMatrix,
         false, f.matrixWorld.elements);
      return g
   }

   function s(a, b)
   {
      a._modelViewMatrix.multiply(b.matrixWorldInverse, a.matrixWorld);
      a._normalMatrix.getInverse(a._modelViewMatrix);
      a._normalMatrix.transpose()
   }

   function w(a, b, c)
   {
      if (Oa !== a)
      {
         a ? k.enable(k.POLYGON_OFFSET_FILL) : k.disable(k.POLYGON_OFFSET_FILL);
         Oa = a
      }
      if (a && (Pa !== b || bb !== c))
      {
         k.polygonOffset(b, c);
         Pa = b;
         bb = c
      }
   }

   function t(a, b)
   {
      var c;
      a === "fragment" ? c = k.createShader(k.FRAGMENT_SHADER) : a === "vertex" &&
         (c = k.createShader(k.VERTEX_SHADER));
      k.shaderSource(c, b);
      k.compileShader(c);
      if (!k.getShaderParameter(c, k.COMPILE_STATUS))
      {
         console.error(k.getShaderInfoLog(c));
         console.error(b);
         return null
      }
      return c
   }

   function v(a, b, c)
   {
      if (c)
      {
         k.texParameteri(a, k.TEXTURE_WRAP_S, D(b.wrapS));
         k.texParameteri(a, k.TEXTURE_WRAP_T, D(b.wrapT));
         k.texParameteri(a, k.TEXTURE_MAG_FILTER, D(b.magFilter));
         k.texParameteri(a, k.TEXTURE_MIN_FILTER, D(b.minFilter))
      }
      else
      {
         k.texParameteri(a, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE);
         k.texParameteri(a, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE);
         k.texParameteri(a, k.TEXTURE_MAG_FILTER, C(b.magFilter));
         k.texParameteri(a, k.TEXTURE_MIN_FILTER, C(b.minFilter))
      } if (Ya && b.type !== THREE.FloatType && (b.anisotropy > 1 || b.__oldAnisotropy))
      {
         k.texParameterf(a, Ya.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy,
            pb));
         b.__oldAnisotropy = b.anisotropy
      }
   }

   function x(a, b)
   {
      k.bindRenderbuffer(k.RENDERBUFFER, a);
      if (b.depthBuffer && !b.stencilBuffer)
      {
         k.renderbufferStorage(k.RENDERBUFFER, k.DEPTH_COMPONENT16, b.width, b.height);
         k.framebufferRenderbuffer(k.FRAMEBUFFER, k.DEPTH_ATTACHMENT, k.RENDERBUFFER,
            a)
      }
      else if (b.depthBuffer && b.stencilBuffer)
      {
         k.renderbufferStorage(k.RENDERBUFFER,
            k.DEPTH_STENCIL, b.width, b.height);
         k.framebufferRenderbuffer(k.FRAMEBUFFER, k.DEPTH_STENCIL_ATTACHMENT, k
            .RENDERBUFFER, a)
      }
      else k.renderbufferStorage(k.RENDERBUFFER, k.RGBA4, b.width, b.height)
   }

   function C(a)
   {
      return a === THREE.NearestFilter || a === THREE.NearestMipMapNearestFilter ||
         a === THREE.NearestMipMapLinearFilter ? k.NEAREST : k.LINEAR
   }

   function D(a)
   {
      return a === THREE.RepeatWrapping ? k.REPEAT : a === THREE.ClampToEdgeWrapping ?
         k.CLAMP_TO_EDGE : a === THREE.MirroredRepeatWrapping ? k.MIRRORED_REPEAT :
         a === THREE.NearestFilter ?
         k.NEAREST : a === THREE.NearestMipMapNearestFilter ? k.NEAREST_MIPMAP_NEAREST :
         a === THREE.NearestMipMapLinearFilter ? k.NEAREST_MIPMAP_LINEAR : a ===
         THREE.LinearFilter ? k.LINEAR : a === THREE.LinearMipMapNearestFilter ?
         k.LINEAR_MIPMAP_NEAREST : a === THREE.LinearMipMapLinearFilter ? k.LINEAR_MIPMAP_LINEAR :
         a === THREE.UnsignedByteType ? k.UNSIGNED_BYTE : a === THREE.UnsignedShort4444Type ?
         k.UNSIGNED_SHORT_4_4_4_4 : a === THREE.UnsignedShort5551Type ? k.UNSIGNED_SHORT_5_5_5_1 :
         a === THREE.UnsignedShort565Type ? k.UNSIGNED_SHORT_5_6_5 : a ===
         THREE.ByteType ?
         k.BYTE : a === THREE.ShortType ? k.SHORT : a === THREE.UnsignedShortType ?
         k.UNSIGNED_SHORT : a === THREE.IntType ? k.INT : a === THREE.UnsignedIntType ?
         k.UNSIGNED_INT : a === THREE.FloatType ? k.FLOAT : a === THREE.AlphaFormat ?
         k.ALPHA : a === THREE.RGBFormat ? k.RGB : a === THREE.RGBAFormat ? k.RGBA :
         a === THREE.LuminanceFormat ? k.LUMINANCE : a === THREE.LuminanceAlphaFormat ?
         k.LUMINANCE_ALPHA : a === THREE.AddEquation ? k.FUNC_ADD : a === THREE
         .SubtractEquation ? k.FUNC_SUBTRACT : a === THREE.ReverseSubtractEquation ?
         k.FUNC_REVERSE_SUBTRACT : a === THREE.ZeroFactor ? k.ZERO :
         a === THREE.OneFactor ? k.ONE : a === THREE.SrcColorFactor ? k.SRC_COLOR :
         a === THREE.OneMinusSrcColorFactor ? k.ONE_MINUS_SRC_COLOR : a ===
         THREE.SrcAlphaFactor ? k.SRC_ALPHA : a === THREE.OneMinusSrcAlphaFactor ?
         k.ONE_MINUS_SRC_ALPHA : a === THREE.DstAlphaFactor ? k.DST_ALPHA : a ===
         THREE.OneMinusDstAlphaFactor ? k.ONE_MINUS_DST_ALPHA : a === THREE.DstColorFactor ?
         k.DST_COLOR : a === THREE.OneMinusDstColorFactor ? k.ONE_MINUS_DST_COLOR :
         a === THREE.SrcAlphaSaturateFactor ? k.SRC_ALPHA_SATURATE : 0
   }
   console.log("THREE.WebGLRenderer", THREE.REVISION);
   var a =
      a ||
      {}, z = a.canvas !== void 0 ? a.canvas : document.createElement("canvas"),
      u = a.precision !== void 0 ? a.precision : "highp",
      G = a.alpha !== void 0 ? a.alpha : true,
      J = a.premultipliedAlpha !== void 0 ? a.premultipliedAlpha : true,
      M = a.antialias !== void 0 ? a.antialias : false,
      O = a.stencil !== void 0 ? a.stencil : true,
      X = a.preserveDrawingBuffer !== void 0 ? a.preserveDrawingBuffer : false,
      B = a.clearColor !== void 0 ? new THREE.Color(a.clearColor) : new THREE.Color(
         0),
      F = a.clearAlpha !== void 0 ? a.clearAlpha : 0,
      Q = a.maxLights !== void 0 ? a.maxLights : 4;
   this.domElement =
      z;
   this.context = null;
   this.autoUpdateScene = this.autoUpdateObjects = this.sortObjects = this.autoClearStencil =
      this.autoClearDepth = this.autoClearColor = this.autoClear = true;
   this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput =
      this.gammaInput = false;
   this.shadowMapCullFrontFaces = this.shadowMapSoft = this.shadowMapAutoUpdate =
      true;
   this.shadowMapCascade = this.shadowMapDebug = false;
   this.maxMorphTargets = 8;
   this.maxMorphNormals = 4;
   this.autoScaleCubemaps = true;
   this.renderPluginsPre = [];
   this.renderPluginsPost = [];
   this.info = {
      memory:
      {
         programs: 0,
         geometries: 0,
         textures: 0
      },
      render:
      {
         calls: 0,
         vertices: 0,
         faces: 0,
         points: 0
      }
   };
   var E = this,
      aa = [],
      T = 0,
      N = null,
      W = null,
      ba = -1,
      H = null,
      ca = null,
      ia = 0,
      S = -1,
      R = -1,
      P = -1,
      U = -1,
      fa = -1,
      ma = -1,
      Ga = -1,
      na = -1,
      Oa = null,
      Pa = null,
      bb = null,
      nb = null,
      gb = 0,
      Ob = 0,
      ob = 0,
      kb = 0,
      ec = 0,
      Ua = 0,
      Da = new THREE.Frustum,
      Aa = new THREE.Matrix4,
      hb = new THREE.Matrix4,
      qa = new THREE.Vector4,
      Fa = new THREE.Vector3,
      Ra = true,
      sa = {
         ambient: [0, 0, 0],
         directional:
         {
            length: 0,
            colors: [],
            positions: []
         },
         point:
         {
            length: 0,
            colors: [],
            positions: [],
            distances: []
         },
         spot:
         {
            length: 0,
            colors: [],
            positions: [],
            distances: [],
            directions: [],
            angles: [],
            exponents: []
         }
      }, k, Ya;
   try
   {
      if (!(k = z.getContext("experimental-webgl",
      {
         alpha: G,
         premultipliedAlpha: J,
         antialias: M,
         stencil: O,
         preserveDrawingBuffer: X
      }))) throw "Error creating WebGL context.";
   }
   catch (Gb)
   {
      console.error(Gb)
   }
   a = k.getExtension("OES_texture_float");
   G = k.getExtension("OES_standard_derivatives");
   Ya = k.getExtension("EXT_texture_filter_anisotropic") || k.getExtension(
      "MOZ_EXT_texture_filter_anisotropic") || k.getExtension(
      "WEBKIT_EXT_texture_filter_anisotropic");
   a || console.log("THREE.WebGLRenderer: Float textures not supported.");
   G || console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
   Ya || console.log(
      "THREE.WebGLRenderer: Anisotropic texture filtering not supported.");
   k.clearColor(0, 0, 0, 1);
   k.clearDepth(1);
   k.clearStencil(0);
   k.enable(k.DEPTH_TEST);
   k.depthFunc(k.LEQUAL);
   k.frontFace(k.CCW);
   k.cullFace(k.BACK);
   k.enable(k.CULL_FACE);
   k.enable(k.BLEND);
   k.blendEquation(k.FUNC_ADD);
   k.blendFunc(k.SRC_ALPHA, k.ONE_MINUS_SRC_ALPHA);
   k.clearColor(B.r, B.g,
      B.b, F);
   this.context = k;
   G = k.getParameter(k.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   k.getParameter(k.MAX_TEXTURE_SIZE);
   var Va = k.getParameter(k.MAX_CUBE_MAP_TEXTURE_SIZE),
      pb = Ya ? k.getParameter(Ya.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
      cb = G > 0,
      dc = cb && a;
   this.getContext = function ()
   {
      return k
   };
   this.supportsVertexTextures = function ()
   {
      return cb
   };
   this.getMaxAnisotropy = function ()
   {
      return pb
   };
   this.setSize = function (a, b)
   {
      z.width = a;
      z.height = b;
      this.setViewport(0, 0, z.width, z.height)
   };
   this.setViewport = function (a, b, c, d)
   {
      gb = a !== void 0 ?
         a : 0;
      Ob = b !== void 0 ? b : 0;
      ob = c !== void 0 ? c : z.width;
      kb = d !== void 0 ? d : z.height;
      k.viewport(gb, Ob, ob, kb)
   };
   this.setScissor = function (a, b, c, d)
   {
      k.scissor(a, b, c, d)
   };
   this.enableScissorTest = function (a)
   {
      a ? k.enable(k.SCISSOR_TEST) : k.disable(k.SCISSOR_TEST)
   };
   this.setClearColorHex = function (a, b)
   {
      B.setHex(a);
      F = b;
      k.clearColor(B.r, B.g, B.b, F)
   };
   this.setClearColor = function (a, b)
   {
      B.copy(a);
      F = b;
      k.clearColor(B.r, B.g, B.b, F)
   };
   this.getClearColor = function ()
   {
      return B
   };
   this.getClearAlpha = function ()
   {
      return F
   };
   this.clear = function (a, b, c)
   {
      var d =
         0;
      if (a === void 0 || a) d = d | k.COLOR_BUFFER_BIT;
      if (b === void 0 || b) d = d | k.DEPTH_BUFFER_BIT;
      if (c === void 0 || c) d = d | k.STENCIL_BUFFER_BIT;
      k.clear(d)
   };
   this.clearTarget = function (a, b, c, d)
   {
      this.setRenderTarget(a);
      this.clear(b, c, d)
   };
   this.addPostPlugin = function (a)
   {
      a.init(this);
      this.renderPluginsPost.push(a)
   };
   this.addPrePlugin = function (a)
   {
      a.init(this);
      this.renderPluginsPre.push(a)
   };
   this.deallocateObject = function (a)
   {
      if (a.__webglInit)
      {
         a.__webglInit = false;
         delete a._modelViewMatrix;
         delete a._normalMatrix;
         delete a._normalMatrixArray;
         delete a._modelViewMatrixArray;
         delete a._objectMatrixArray;
         if (a instanceof THREE.Mesh)
            for (var b in a.geometry.geometryGroups)
            {
               var c = a.geometry.geometryGroups[b];
               k.deleteBuffer(c.__webglVertexBuffer);
               k.deleteBuffer(c.__webglNormalBuffer);
               k.deleteBuffer(c.__webglTangentBuffer);
               k.deleteBuffer(c.__webglColorBuffer);
               k.deleteBuffer(c.__webglUVBuffer);
               k.deleteBuffer(c.__webglUV2Buffer);
               k.deleteBuffer(c.__webglSkinVertexABuffer);
               k.deleteBuffer(c.__webglSkinVertexBBuffer);
               k.deleteBuffer(c.__webglSkinIndicesBuffer);
               k.deleteBuffer(c.__webglSkinWeightsBuffer);
               k.deleteBuffer(c.__webglFaceBuffer);
               k.deleteBuffer(c.__webglLineBuffer);
               var d = void 0,
                  e = void 0;
               if (c.numMorphTargets)
               {
                  d = 0;
                  for (e = c.numMorphTargets; d < e; d++) k.deleteBuffer(c.__webglMorphTargetsBuffers[
                     d])
               }
               if (c.numMorphNormals)
               {
                  d = 0;
                  for (e = c.numMorphNormals; d < e; d++) k.deleteBuffer(c.__webglMorphNormalsBuffers[
                     d])
               }
               if (c.__webglCustomAttributesList)
               {
                  d = void 0;
                  for (d in c.__webglCustomAttributesList) k.deleteBuffer(c.__webglCustomAttributesList[
                     d].buffer)
               }
               E.info.memory.geometries--
            }
         else if (a instanceof THREE.Ribbon)
         {
            a = a.geometry;
            k.deleteBuffer(a.__webglVertexBuffer);
            k.deleteBuffer(a.__webglColorBuffer);
            E.info.memory.geometries--
         }
         else if (a instanceof THREE.Line)
         {
            a = a.geometry;
            k.deleteBuffer(a.__webglVertexBuffer);
            k.deleteBuffer(a.__webglColorBuffer);
            E.info.memory.geometries--
         }
         else if (a instanceof THREE.ParticleSystem)
         {
            a = a.geometry;
            k.deleteBuffer(a.__webglVertexBuffer);
            k.deleteBuffer(a.__webglColorBuffer);
            E.info.memory.geometries--
         }
      }
   };
   this.deallocateTexture = function (a)
   {
      if (a.__webglInit)
      {
         a.__webglInit =
            false;
         k.deleteTexture(a.__webglTexture);
         E.info.memory.textures--
      }
   };
   this.deallocateRenderTarget = function (a)
   {
      if (a && a.__webglTexture)
      {
         k.deleteTexture(a.__webglTexture);
         if (a instanceof THREE.WebGLRenderTargetCube)
            for (var b = 0; b < 6; b++)
            {
               k.deleteFramebuffer(a.__webglFramebuffer[b]);
               k.deleteRenderbuffer(a.__webglRenderbuffer[b])
            }
         else
         {
            k.deleteFramebuffer(a.__webglFramebuffer);
            k.deleteRenderbuffer(a.__webglRenderbuffer)
         }
      }
   };
   this.deallocateMaterial = function (a)
   {
      var b = a.program;
      if (b)
      {
         a.program = void 0;
         var c, d, e =
               false,
            a = 0;
         for (c = aa.length; a < c; a++)
         {
            d = aa[a];
            if (d.program === b)
            {
               d.usedTimes--;
               d.usedTimes === 0 && (e = true);
               break
            }
         }
         if (e)
         {
            e = [];
            a = 0;
            for (c = aa.length; a < c; a++)
            {
               d = aa[a];
               d.program !== b && e.push(d)
            }
            aa = e;
            k.deleteProgram(b);
            E.info.memory.programs--
         }
      }
   };
   this.updateShadowMap = function (a, b)
   {
      N = null;
      ba = H = na = Ga = P = -1;
      Ra = true;
      R = S = -1;
      this.shadowMapPlugin.update(a, b)
   };
   this.renderBufferImmediate = function (a, b, c)
   {
      if (a.hasPositions && !a.__webglVertexBuffer) a.__webglVertexBuffer = k.createBuffer();
      if (a.hasNormals && !a.__webglNormalBuffer) a.__webglNormalBuffer =
         k.createBuffer();
      if (a.hasUvs && !a.__webglUvBuffer) a.__webglUvBuffer = k.createBuffer();
      if (a.hasColors && !a.__webglColorBuffer) a.__webglColorBuffer = k.createBuffer();
      if (a.hasPositions)
      {
         k.bindBuffer(k.ARRAY_BUFFER, a.__webglVertexBuffer);
         k.bufferData(k.ARRAY_BUFFER, a.positionArray, k.DYNAMIC_DRAW);
         k.enableVertexAttribArray(b.attributes.position);
         k.vertexAttribPointer(b.attributes.position, 3, k.FLOAT, false, 0, 0)
      }
      if (a.hasNormals)
      {
         k.bindBuffer(k.ARRAY_BUFFER, a.__webglNormalBuffer);
         if (c.shading === THREE.FlatShading)
         {
            var d,
               e, f, g, h, i, j, m, l, n, o, p = a.count * 3;
            for (o = 0; o < p; o = o + 9)
            {
               n = a.normalArray;
               d = n[o];
               e = n[o + 1];
               f = n[o + 2];
               g = n[o + 3];
               i = n[o + 4];
               m = n[o + 5];
               h = n[o + 6];
               j = n[o + 7];
               l = n[o + 8];
               d = (d + g + h) / 3;
               e = (e + i + j) / 3;
               f = (f + m + l) / 3;
               n[o] = d;
               n[o + 1] = e;
               n[o + 2] = f;
               n[o + 3] = d;
               n[o + 4] = e;
               n[o + 5] = f;
               n[o + 6] = d;
               n[o + 7] = e;
               n[o + 8] = f
            }
         }
         k.bufferData(k.ARRAY_BUFFER, a.normalArray, k.DYNAMIC_DRAW);
         k.enableVertexAttribArray(b.attributes.normal);
         k.vertexAttribPointer(b.attributes.normal, 3, k.FLOAT, false, 0, 0)
      }
      if (a.hasUvs && c.map)
      {
         k.bindBuffer(k.ARRAY_BUFFER, a.__webglUvBuffer);
         k.bufferData(k.ARRAY_BUFFER,
            a.uvArray, k.DYNAMIC_DRAW);
         k.enableVertexAttribArray(b.attributes.uv);
         k.vertexAttribPointer(b.attributes.uv, 2, k.FLOAT, false, 0, 0)
      }
      if (a.hasColors && c.vertexColors !== THREE.NoColors)
      {
         k.bindBuffer(k.ARRAY_BUFFER, a.__webglColorBuffer);
         k.bufferData(k.ARRAY_BUFFER, a.colorArray, k.DYNAMIC_DRAW);
         k.enableVertexAttribArray(b.attributes.color);
         k.vertexAttribPointer(b.attributes.color, 3, k.FLOAT, false, 0, 0)
      }
      k.drawArrays(k.TRIANGLES, 0, a.count);
      a.count = 0
   };
   this.renderBufferDirect = function (a, b, c, d, e, f)
   {
      if (d.visible !== false)
      {
         c =
            q(a, b, c, d, f);
         a = c.attributes;
         b = false;
         d = e.id * 16777215 + c.id * 2 + (d.wireframe ? 1 : 0);
         if (d !== H)
         {
            H = d;
            b = true
         }
         if (f instanceof THREE.Mesh)
         {
            f = e.offsets;
            f.length > 1 && (b = true);
            d = 0;
            for (c = f.length; d < c; ++d)
            {
               var g = f[d].index;
               if (b)
               {
                  var h = e.attributes.position,
                     i = h.itemSize;
                  k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                  k.vertexAttribPointer(a.position, i, k.FLOAT, false, 0, g * i *
                     4);
                  h = e.attributes.normal;
                  if (a.normal >= 0 && h)
                  {
                     i = h.itemSize;
                     k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                     k.vertexAttribPointer(a.normal, i, k.FLOAT, false, 0, g *
                        i * 4)
                  }
                  h = e.attributes.uv;
                  if (a.uv >= 0 && h)
                     if (h.buffer)
                     {
                        i = h.itemSize;
                        k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                        k.vertexAttribPointer(a.uv, i, k.FLOAT, false, 0, g * i *
                           4);
                        k.enableVertexAttribArray(a.uv)
                     }
                     else k.disableVertexAttribArray(a.uv);
                  h = e.attributes.color;
                  if (a.color >= 0 && h)
                  {
                     i = h.itemSize;
                     k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                     k.vertexAttribPointer(a.color, i, k.FLOAT, false, 0, g * i *
                        4)
                  }
                  h = e.attributes.tangent;
                  if (a.tangent >= 0 && h)
                  {
                     i = h.itemSize;
                     k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                     k.vertexAttribPointer(a.tangent, i, k.FLOAT, false, 0, g *
                        i * 4)
                  }
                  k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,
                     e.attributes.index.buffer)
               }
               k.drawElements(k.TRIANGLES, f[d].count, k.UNSIGNED_SHORT, f[d].start *
                  2);
               E.info.render.calls++;
               E.info.render.vertices = E.info.render.vertices + f[d].count;
               E.info.render.faces = E.info.render.faces + f[d].count / 3
            }
         }
      }
   };
   this.renderBuffer = function (a, b, c, d, e, f)
   {
      if (d.visible !== false)
      {
         var g, i, c = q(a, b, c, d, f),
            b = c.attributes,
            a = false,
            c = e.id * 16777215 + c.id * 2 + (d.wireframe ? 1 : 0);
         if (c !== H)
         {
            H = c;
            a = true
         }
         if (!d.morphTargets && b.position >= 0)
         {
            if (a)
            {
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer);
               k.vertexAttribPointer(b.position,
                  3, k.FLOAT, false, 0, 0)
            }
         }
         else if (f.morphTargetBase)
         {
            c = d.program.attributes;
            if (f.morphTargetBase !== -1)
            {
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]);
               k.vertexAttribPointer(c.position, 3, k.FLOAT, false, 0, 0)
            }
            else if (c.position >= 0)
            {
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer);
               k.vertexAttribPointer(c.position, 3, k.FLOAT, false, 0, 0)
            }
            if (f.morphTargetForcedOrder.length)
            {
               var j = 0;
               i = f.morphTargetForcedOrder;
               for (g = f.morphTargetInfluences; j < d.numSupportedMorphTargets &&
                  j < i.length;)
               {
                  k.bindBuffer(k.ARRAY_BUFFER,
                     e.__webglMorphTargetsBuffers[i[j]]);
                  k.vertexAttribPointer(c["morphTarget" + j], 3, k.FLOAT, false,
                     0, 0);
                  if (d.morphNormals)
                  {
                     k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[
                        i[j]]);
                     k.vertexAttribPointer(c["morphNormal" + j], 3, k.FLOAT,
                        false, 0, 0)
                  }
                  f.__webglMorphTargetInfluences[j] = g[i[j]];
                  j++
               }
            }
            else
            {
               i = [];
               g = f.morphTargetInfluences;
               var m, l = g.length;
               for (m = 0; m < l; m++)
               {
                  j = g[m];
                  j > 0 && i.push([m, j])
               }
               if (i.length > d.numSupportedMorphTargets)
               {
                  i.sort(h);
                  i.length = d.numSupportedMorphTargets
               }
               else i.length > d.numSupportedMorphNormals ?
                  i.sort(h) : i.length === 0 && i.push([0, 0]);
               for (j = 0; j < d.numSupportedMorphTargets;)
               {
                  if (i[j])
                  {
                     m = i[j][0];
                     k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[
                        m]);
                     k.vertexAttribPointer(c["morphTarget" + j], 3, k.FLOAT,
                        false, 0, 0);
                     if (d.morphNormals)
                     {
                        k.bindBuffer(k.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[
                           m]);
                        k.vertexAttribPointer(c["morphNormal" + j], 3, k.FLOAT,
                           false, 0, 0)
                     }
                     f.__webglMorphTargetInfluences[j] = g[m]
                  }
                  else
                  {
                     k.vertexAttribPointer(c["morphTarget" + j], 3, k.FLOAT,
                        false, 0, 0);
                     d.morphNormals && k.vertexAttribPointer(c["morphNormal" +
                        j], 3, k.FLOAT, false, 0, 0);
                     f.__webglMorphTargetInfluences[j] = 0
                  }
                  j++
               }
            }
            d.program.uniforms.morphTargetInfluences !== null && k.uniform1fv(d
               .program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences
            )
         }
         if (a)
         {
            if (e.__webglCustomAttributesList)
            {
               g = 0;
               for (i = e.__webglCustomAttributesList.length; g < i; g++)
               {
                  c = e.__webglCustomAttributesList[g];
                  if (b[c.buffer.belongsToAttribute] >= 0)
                  {
                     k.bindBuffer(k.ARRAY_BUFFER, c.buffer);
                     k.vertexAttribPointer(b[c.buffer.belongsToAttribute], c.size,
                        k.FLOAT, false, 0, 0)
                  }
               }
            }
            if (b.color >= 0)
            {
               k.bindBuffer(k.ARRAY_BUFFER,
                  e.__webglColorBuffer);
               k.vertexAttribPointer(b.color, 3, k.FLOAT, false, 0, 0)
            }
            if (b.normal >= 0)
            {
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglNormalBuffer);
               k.vertexAttribPointer(b.normal, 3, k.FLOAT, false, 0, 0)
            }
            if (b.tangent >= 0)
            {
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglTangentBuffer);
               k.vertexAttribPointer(b.tangent, 4, k.FLOAT, false, 0, 0)
            }
            if (b.uv >= 0)
               if (e.__webglUVBuffer)
               {
                  k.bindBuffer(k.ARRAY_BUFFER, e.__webglUVBuffer);
                  k.vertexAttribPointer(b.uv, 2, k.FLOAT, false, 0, 0);
                  k.enableVertexAttribArray(b.uv)
               }
               else k.disableVertexAttribArray(b.uv);
            if (b.uv2 >= 0)
               if (e.__webglUV2Buffer)
               {
                  k.bindBuffer(k.ARRAY_BUFFER, e.__webglUV2Buffer);
                  k.vertexAttribPointer(b.uv2, 2, k.FLOAT, false, 0, 0);
                  k.enableVertexAttribArray(b.uv2)
               }
               else k.disableVertexAttribArray(b.uv2);
            if (d.skinning && b.skinVertexA >= 0 && b.skinVertexB >= 0 && b.skinIndex >=
               0 && b.skinWeight >= 0)
            {
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinVertexABuffer);
               k.vertexAttribPointer(b.skinVertexA, 4, k.FLOAT, false, 0, 0);
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinVertexBBuffer);
               k.vertexAttribPointer(b.skinVertexB, 4, k.FLOAT,
                  false, 0, 0);
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinIndicesBuffer);
               k.vertexAttribPointer(b.skinIndex, 4, k.FLOAT, false, 0, 0);
               k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinWeightsBuffer);
               k.vertexAttribPointer(b.skinWeight, 4, k.FLOAT, false, 0, 0)
            }
         }
         if (f instanceof THREE.Mesh)
         {
            if (d.wireframe)
            {
               d = d.wireframeLinewidth;
               if (d !== nb)
               {
                  k.lineWidth(d);
                  nb = d
               }
               a && k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer);
               k.drawElements(k.LINES, e.__webglLineCount, k.UNSIGNED_SHORT, 0)
            }
            else
            {
               a && k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer);
               k.drawElements(k.TRIANGLES, e.__webglFaceCount, k.UNSIGNED_SHORT,
                  0)
            }
            E.info.render.calls++;
            E.info.render.vertices = E.info.render.vertices + e.__webglFaceCount;
            E.info.render.faces = E.info.render.faces + e.__webglFaceCount / 3
         }
         else if (f instanceof THREE.Line)
         {
            f = f.type === THREE.LineStrip ? k.LINE_STRIP : k.LINES;
            d = d.linewidth;
            if (d !== nb)
            {
               k.lineWidth(d);
               nb = d
            }
            k.drawArrays(f, 0, e.__webglLineCount);
            E.info.render.calls++
         }
         else if (f instanceof THREE.ParticleSystem)
         {
            k.drawArrays(k.POINTS, 0, e.__webglParticleCount);
            E.info.render.calls++;
            E.info.render.points = E.info.render.points + e.__webglParticleCount
         }
         else if (f instanceof THREE.Ribbon)
         {
            k.drawArrays(k.TRIANGLE_STRIP, 0, e.__webglVertexCount);
            E.info.render.calls++
         }
      }
   };
   this.render = function (a, b, c, d)
   {
      var e, f, h, m, n = a.__lights,
         o = a.fog;
      ba = -1;
      Ra = true;
      if (b.parent === void 0)
      {
         console.warn(
            "DEPRECATED: Camera hasn't been added to a Scene. Adding it...");
         a.add(b)
      }
      this.autoUpdateScene && a.updateMatrixWorld();
      if (!b._viewMatrixArray) b._viewMatrixArray = new Float32Array(16);
      if (!b._projectionMatrixArray) b._projectionMatrixArray =
         new Float32Array(16);
      b.matrixWorldInverse.getInverse(b.matrixWorld);
      b.matrixWorldInverse.flattenToArray(b._viewMatrixArray);
      b.projectionMatrix.flattenToArray(b._projectionMatrixArray);
      Aa.multiply(b.projectionMatrix, b.matrixWorldInverse);
      Da.setFromMatrix(Aa);
      this.autoUpdateObjects && this.initWebGLObjects(a);
      i(this.renderPluginsPre, a, b);
      E.info.render.calls = 0;
      E.info.render.vertices = 0;
      E.info.render.faces = 0;
      E.info.render.points = 0;
      this.setRenderTarget(c);
      (this.autoClear || d) && this.clear(this.autoClearColor,
         this.autoClearDepth, this.autoClearStencil);
      m = a.__webglObjects;
      d = 0;
      for (e = m.length; d < e; d++)
      {
         f = m[d];
         h = f.object;
         f.render = false;
         if (h.visible && (!(h instanceof THREE.Mesh || h instanceof THREE.ParticleSystem) || !
            h.frustumCulled || Da.contains(h)))
         {
            s(h, b);
            var p = f,
               r = p.object,
               q = p.buffer,
               t = void 0,
               t = t = void 0,
               t = r.material;
            if (t instanceof THREE.MeshFaceMaterial)
            {
               t = q.materialIndex;
               if (t >= 0)
               {
                  t = r.geometry.materials[t];
                  if (t.transparent)
                  {
                     p.transparent = t;
                     p.opaque = null
                  }
                  else
                  {
                     p.opaque = t;
                     p.transparent = null
                  }
               }
            }
            else if (t)
               if (t.transparent)
               {
                  p.transparent =
                     t;
                  p.opaque = null
               }
               else
               {
                  p.opaque = t;
                  p.transparent = null
               }
            f.render = true;
            if (this.sortObjects)
               if (h.renderDepth) f.z = h.renderDepth;
               else
               {
                  qa.copy(h.matrixWorld.getPosition());
                  Aa.multiplyVector3(qa);
                  f.z = qa.z
               }
         }
      }
      this.sortObjects && m.sort(g);
      m = a.__webglObjectsImmediate;
      d = 0;
      for (e = m.length; d < e; d++)
      {
         f = m[d];
         h = f.object;
         if (h.visible)
         {
            s(h, b);
            h = f.object.material;
            if (h.transparent)
            {
               f.transparent = h;
               f.opaque = null
            }
            else
            {
               f.opaque = h;
               f.transparent = null
            }
         }
      }
      if (a.overrideMaterial)
      {
         d = a.overrideMaterial;
         this.setBlending(d.blending, d.blendEquation,
            d.blendSrc, d.blendDst);
         this.setDepthTest(d.depthTest);
         this.setDepthWrite(d.depthWrite);
         w(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits);
         j(a.__webglObjects, false, "", b, n, o, true, d);
         l(a.__webglObjectsImmediate, "", b, n, o, false, d)
      }
      else
      {
         this.setBlending(THREE.NormalBlending);
         j(a.__webglObjects, true, "opaque", b, n, o, false);
         l(a.__webglObjectsImmediate, "opaque", b, n, o, false);
         j(a.__webglObjects, false, "transparent", b, n, o, true);
         l(a.__webglObjectsImmediate, "transparent", b, n, o, true)
      }
      i(this.renderPluginsPost,
         a, b);
      if (c && c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !==
         THREE.LinearFilter)
         if (c instanceof THREE.WebGLRenderTargetCube)
         {
            k.bindTexture(k.TEXTURE_CUBE_MAP, c.__webglTexture);
            k.generateMipmap(k.TEXTURE_CUBE_MAP);
            k.bindTexture(k.TEXTURE_CUBE_MAP, null)
         }
         else
         {
            k.bindTexture(k.TEXTURE_2D, c.__webglTexture);
            k.generateMipmap(k.TEXTURE_2D);
            k.bindTexture(k.TEXTURE_2D, null)
         }
      this.setDepthTest(true);
      this.setDepthWrite(true)
   };
   this.renderImmediateObject = function (a, b, c, d, e)
   {
      var f = q(a, b, c, d, e);
      H = -1;
      E.setObjectFaces(e);
      e.immediateRenderCallback ? e.immediateRenderCallback(f, k, Da) : e.render(
         function (a)
         {
            E.renderBufferImmediate(a, f, d)
         })
   };
   this.initWebGLObjects = function (a)
   {
      if (!a.__webglObjects)
      {
         a.__webglObjects = [];
         a.__webglObjectsImmediate = [];
         a.__webglSprites = [];
         a.__webglFlares = []
      }
      for (; a.__objectsAdded.length;)
      {
         var g = a.__objectsAdded[0],
            h = a,
            i = void 0,
            j = void 0,
            l = void 0;
         if (!g.__webglInit)
         {
            g.__webglInit = true;
            g._modelViewMatrix = new THREE.Matrix4;
            g._normalMatrix = new THREE.Matrix3;
            if (g instanceof THREE.Mesh)
            {
               j =
                  g.geometry;
               if (j instanceof THREE.Geometry)
               {
                  if (j.geometryGroups === void 0)
                  {
                     var q = j,
                        s = void 0,
                        t = void 0,
                        u = void 0,
                        v = void 0,
                        w = void 0,
                        x = void 0,
                        z = void 0,
                        C = {}, D = q.morphTargets.length,
                        B = q.morphNormals.length;
                     q.geometryGroups = {};
                     s = 0;
                     for (t = q.faces.length; s < t; s++)
                     {
                        u = q.faces[s];
                        v = u.materialIndex;
                        x = v !== void 0 ? v : -1;
                        C[x] === void 0 && (C[x] = {
                           hash: x,
                           counter: 0
                        });
                        z = C[x].hash + "_" + C[x].counter;
                        q.geometryGroups[z] === void 0 && (q.geometryGroups[z] = {
                           faces3: [],
                           faces4: [],
                           materialIndex: v,
                           vertices: 0,
                           numMorphTargets: D,
                           numMorphNormals: B
                        });
                        w = u instanceof THREE.Face3 ? 3 : 4;
                        if (q.geometryGroups[z].vertices + w > 65535)
                        {
                           C[x].counter = C[x].counter + 1;
                           z = C[x].hash + "_" + C[x].counter;
                           q.geometryGroups[z] === void 0 && (q.geometryGroups[
                              z] = {
                              faces3: [],
                              faces4: [],
                              materialIndex: v,
                              vertices: 0,
                              numMorphTargets: D,
                              numMorphNormals: B
                           })
                        }
                        u instanceof THREE.Face3 ? q.geometryGroups[z].faces3.push(
                           s) : q.geometryGroups[z].faces4.push(s);
                        q.geometryGroups[z].vertices = q.geometryGroups[z].vertices +
                           w
                     }
                     q.geometryGroupsList = [];
                     var R = void 0;
                     for (R in q.geometryGroups)
                     {
                        q.geometryGroups[R].id =
                           ia++;
                        q.geometryGroupsList.push(q.geometryGroups[R])
                     }
                  }
                  for (i in j.geometryGroups)
                  {
                     l = j.geometryGroups[i];
                     if (!l.__webglVertexBuffer)
                     {
                        var H = l;
                        H.__webglVertexBuffer = k.createBuffer();
                        H.__webglNormalBuffer = k.createBuffer();
                        H.__webglTangentBuffer = k.createBuffer();
                        H.__webglColorBuffer = k.createBuffer();
                        H.__webglUVBuffer = k.createBuffer();
                        H.__webglUV2Buffer = k.createBuffer();
                        H.__webglSkinVertexABuffer = k.createBuffer();
                        H.__webglSkinVertexBBuffer = k.createBuffer();
                        H.__webglSkinIndicesBuffer = k.createBuffer();
                        H.__webglSkinWeightsBuffer =
                           k.createBuffer();
                        H.__webglFaceBuffer = k.createBuffer();
                        H.__webglLineBuffer = k.createBuffer();
                        var G = void 0,
                           P = void 0;
                        if (H.numMorphTargets)
                        {
                           H.__webglMorphTargetsBuffers = [];
                           G = 0;
                           for (P = H.numMorphTargets; G < P; G++) H.__webglMorphTargetsBuffers
                              .push(k.createBuffer())
                        }
                        if (H.numMorphNormals)
                        {
                           H.__webglMorphNormalsBuffers = [];
                           G = 0;
                           for (P = H.numMorphNormals; G < P; G++) H.__webglMorphNormalsBuffers
                              .push(k.createBuffer())
                        }
                        E.info.memory.geometries++;
                        var F = l,
                           J = g,
                           U = J.geometry,
                           M = F.faces3,
                           N = F.faces4,
                           O = M.length * 3 + N.length * 4,
                           W = M.length *
                              1 + N.length * 2,
                           S = M.length * 3 + N.length * 4,
                           Q = c(J, F),
                           X = e(Q),
                           T = d(Q),
                           ba = Q.vertexColors ? Q.vertexColors : false;
                        F.__vertexArray = new Float32Array(O * 3);
                        if (T) F.__normalArray = new Float32Array(O * 3);
                        if (U.hasTangents) F.__tangentArray = new Float32Array(
                           O * 4);
                        if (ba) F.__colorArray = new Float32Array(O * 3);
                        if (X)
                        {
                           if (U.faceUvs.length > 0 || U.faceVertexUvs.length >
                              0) F.__uvArray = new Float32Array(O * 2);
                           if (U.faceUvs.length > 1 || U.faceVertexUvs.length >
                              1) F.__uv2Array = new Float32Array(O * 2)
                        }
                        if (J.geometry.skinWeights.length && J.geometry.skinIndices
                           .length)
                        {
                           F.__skinVertexAArray =
                              new Float32Array(O * 4);
                           F.__skinVertexBArray = new Float32Array(O * 4);
                           F.__skinIndexArray = new Float32Array(O * 4);
                           F.__skinWeightArray = new Float32Array(O * 4)
                        }
                        F.__faceArray = new Uint16Array(W * 3);
                        F.__lineArray = new Uint16Array(S * 2);
                        var fa = void 0,
                           ca = void 0;
                        if (F.numMorphTargets)
                        {
                           F.__morphTargetsArrays = [];
                           fa = 0;
                           for (ca = F.numMorphTargets; fa < ca; fa++) F.__morphTargetsArrays
                              .push(new Float32Array(O * 3))
                        }
                        if (F.numMorphNormals)
                        {
                           F.__morphNormalsArrays = [];
                           fa = 0;
                           for (ca = F.numMorphNormals; fa < ca; fa++) F.__morphNormalsArrays
                              .push(new Float32Array(O *
                                 3))
                        }
                        F.__webglFaceCount = W * 3;
                        F.__webglLineCount = S * 2;
                        if (Q.attributes)
                        {
                           if (F.__webglCustomAttributesList === void 0) F.__webglCustomAttributesList = [];
                           var aa = void 0;
                           for (aa in Q.attributes)
                           {
                              var na = Q.attributes[aa],
                                 ma = {}, bb;
                              for (bb in na) ma[bb] = na[bb];
                              if (!ma.__webglInitialized || ma.createUniqueBuffers)
                              {
                                 ma.__webglInitialized = true;
                                 var Ga = 1;
                                 ma.type === "v2" ? Ga = 2 : ma.type === "v3" ?
                                    Ga = 3 : ma.type === "v4" ? Ga = 4 : ma.type ===
                                    "c" && (Ga = 3);
                                 ma.size = Ga;
                                 ma.array = new Float32Array(O * Ga);
                                 ma.buffer = k.createBuffer();
                                 ma.buffer.belongsToAttribute =
                                    aa;
                                 na.needsUpdate = true;
                                 ma.__original = na
                              }
                              F.__webglCustomAttributesList.push(ma)
                           }
                        }
                        F.__inittedArrays = true;
                        j.verticesNeedUpdate = true;
                        j.morphTargetsNeedUpdate = true;
                        j.elementsNeedUpdate = true;
                        j.uvsNeedUpdate = true;
                        j.normalsNeedUpdate = true;
                        j.tangentsNeedUpdate = true;
                        j.colorsNeedUpdate = true
                     }
                  }
               }
               else if (j instanceof THREE.BufferGeometry)
               {
                  var Oa = j,
                     Pa = void 0,
                     qa = void 0,
                     sa = void 0;
                  for (Pa in Oa.attributes)
                  {
                     sa = Pa === "index" ? k.ELEMENT_ARRAY_BUFFER : k.ARRAY_BUFFER;
                     qa = Oa.attributes[Pa];
                     qa.buffer = k.createBuffer();
                     k.bindBuffer(sa,
                        qa.buffer);
                     k.bufferData(sa, qa.array, k.STATIC_DRAW)
                  }
               }
            }
            else if (g instanceof THREE.Ribbon)
            {
               j = g.geometry;
               if (!j.__webglVertexBuffer)
               {
                  var Aa = j;
                  Aa.__webglVertexBuffer = k.createBuffer();
                  Aa.__webglColorBuffer = k.createBuffer();
                  E.info.memory.geometries++;
                  var Da = j,
                     Fa = Da.vertices.length;
                  Da.__vertexArray = new Float32Array(Fa * 3);
                  Da.__colorArray = new Float32Array(Fa * 3);
                  Da.__webglVertexCount = Fa;
                  j.verticesNeedUpdate = true;
                  j.colorsNeedUpdate = true
               }
            }
            else if (g instanceof THREE.Line)
            {
               j = g.geometry;
               if (!j.__webglVertexBuffer)
               {
                  var nb =
                     j;
                  nb.__webglVertexBuffer = k.createBuffer();
                  nb.__webglColorBuffer = k.createBuffer();
                  E.info.memory.geometries++;
                  var gb = j,
                     Va = g,
                     Ra = gb.vertices.length;
                  gb.__vertexArray = new Float32Array(Ra * 3);
                  gb.__colorArray = new Float32Array(Ra * 3);
                  gb.__webglLineCount = Ra;
                  b(gb, Va);
                  j.verticesNeedUpdate = true;
                  j.colorsNeedUpdate = true
               }
            }
            else if (g instanceof THREE.ParticleSystem)
            {
               j = g.geometry;
               if (!j.__webglVertexBuffer)
               {
                  var Ya = j;
                  Ya.__webglVertexBuffer = k.createBuffer();
                  Ya.__webglColorBuffer = k.createBuffer();
                  E.info.geometries++;
                  var Ua =
                     j,
                     Ob = g,
                     ob = Ua.vertices.length;
                  Ua.__vertexArray = new Float32Array(ob * 3);
                  Ua.__colorArray = new Float32Array(ob * 3);
                  Ua.__sortArray = [];
                  Ua.__webglParticleCount = ob;
                  b(Ua, Ob);
                  j.verticesNeedUpdate = true;
                  j.colorsNeedUpdate = true
               }
            }
         }
         if (!g.__webglActive)
         {
            if (g instanceof THREE.Mesh)
            {
               j = g.geometry;
               if (j instanceof THREE.BufferGeometry) m(h.__webglObjects, j, g);
               else
                  for (i in j.geometryGroups)
                  {
                     l = j.geometryGroups[i];
                     m(h.__webglObjects, l, g)
                  }
            }
            else if (g instanceof THREE.Ribbon || g instanceof THREE.Line || g instanceof THREE
               .ParticleSystem)
            {
               j =
                  g.geometry;
               m(h.__webglObjects, j, g)
            }
            else g instanceof THREE.ImmediateRenderObject || g.immediateRenderCallback ?
               h.__webglObjectsImmediate.push(
               {
                  object: g,
                  opaque: null,
                  transparent: null
               }) : g instanceof THREE.Sprite ? h.__webglSprites.push(g) : g instanceof THREE
               .LensFlare && h.__webglFlares.push(g);
            g.__webglActive = true
         }
         a.__objectsAdded.splice(0, 1)
      }
      for (; a.__objectsRemoved.length;)
      {
         var db = a.__objectsRemoved[0],
            kb = a;
         db instanceof THREE.Mesh || db instanceof THREE.ParticleSystem || db instanceof THREE
            .Ribbon || db instanceof
         THREE.Line ? r(kb.__webglObjects, db) : db instanceof THREE.Sprite ? o(
            kb.__webglSprites, db) : db instanceof THREE.LensFlare ? o(kb.__webglFlares,
            db) : (db instanceof THREE.ImmediateRenderObject || db.immediateRenderCallback) &&
            r(kb.__webglObjectsImmediate, db);
         db.__webglActive = false;
         a.__objectsRemoved.splice(0, 1)
      }
      for (var hb = 0, pb = a.__webglObjects.length; hb < pb; hb++)
      {
         var lb = a.__webglObjects[hb].object,
            da = lb.geometry,
            cb = void 0,
            oc = void 0,
            Wa = void 0;
         if (lb instanceof THREE.Mesh)
            if (da instanceof THREE.BufferGeometry)
            {
               if (da.verticesNeedUpdate ||
                  da.elementsNeedUpdate || da.uvsNeedUpdate || da.normalsNeedUpdate ||
                  da.colorsNeedUpdate || da.tangentsNeedUpdate)
               {
                  var Ib = da,
                     pc = k.DYNAMIC_DRAW,
                     ec = !da.dynamic,
                     qc = Ib.attributes,
                     Gb = qc.index,
                     dc = qc.position,
                     Yc = qc.normal,
                     Zc = qc.uv,
                     $c = qc.color,
                     ad = qc.tangent;
                  if (Ib.elementsNeedUpdate && Gb !== void 0)
                  {
                     k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, Gb.buffer);
                     k.bufferData(k.ELEMENT_ARRAY_BUFFER, Gb.array, pc)
                  }
                  if (Ib.verticesNeedUpdate && dc !== void 0)
                  {
                     k.bindBuffer(k.ARRAY_BUFFER, dc.buffer);
                     k.bufferData(k.ARRAY_BUFFER, dc.array, pc)
                  }
                  if (Ib.normalsNeedUpdate &&
                     Yc !== void 0)
                  {
                     k.bindBuffer(k.ARRAY_BUFFER, Yc.buffer);
                     k.bufferData(k.ARRAY_BUFFER, Yc.array, pc)
                  }
                  if (Ib.uvsNeedUpdate && Zc !== void 0)
                  {
                     k.bindBuffer(k.ARRAY_BUFFER, Zc.buffer);
                     k.bufferData(k.ARRAY_BUFFER, Zc.array, pc)
                  }
                  if (Ib.colorsNeedUpdate && $c !== void 0)
                  {
                     k.bindBuffer(k.ARRAY_BUFFER, $c.buffer);
                     k.bufferData(k.ARRAY_BUFFER, $c.array, pc)
                  }
                  if (Ib.tangentsNeedUpdate && ad !== void 0)
                  {
                     k.bindBuffer(k.ARRAY_BUFFER, ad.buffer);
                     k.bufferData(k.ARRAY_BUFFER, ad.array, pc)
                  }
                  if (ec)
                  {
                     var md = void 0;
                     for (md in Ib.attributes) delete Ib.attributes[md].array
                  }
               }
               da.verticesNeedUpdate =
                  false;
               da.elementsNeedUpdate = false;
               da.uvsNeedUpdate = false;
               da.normalsNeedUpdate = false;
               da.colorsNeedUpdate = false;
               da.tangentsNeedUpdate = false
            }
            else
            {
               for (var bd = 0, yd = da.geometryGroupsList.length; bd < yd; bd++)
               {
                  cb = da.geometryGroupsList[bd];
                  Wa = c(lb, cb);
                  oc = Wa.attributes && n(Wa);
                  if (da.verticesNeedUpdate || da.morphTargetsNeedUpdate || da.elementsNeedUpdate ||
                     da.uvsNeedUpdate || da.normalsNeedUpdate || da.colorsNeedUpdate ||
                     da.tangentsNeedUpdate || oc)
                  {
                     var ga = cb,
                        zd = lb,
                        Za = k.DYNAMIC_DRAW,
                        Ad = !da.dynamic,
                        hc = Wa;
                     if (ga.__inittedArrays)
                     {
                        var nd =
                           d(hc),
                           cd = hc.vertexColors ? hc.vertexColors : false,
                           od = e(hc),
                           Kc = nd === THREE.SmoothShading,
                           I = void 0,
                           V = void 0,
                           jb = void 0,
                           L = void 0,
                           rc = void 0,
                           Rb = void 0,
                           mb = void 0,
                           Lc = void 0,
                           Jb = void 0,
                           sc = void 0,
                           tc = void 0,
                           Y = void 0,
                           Z = void 0,
                           $ = void 0,
                           oa = void 0,
                           qb = void 0,
                           rb = void 0,
                           sb = void 0,
                           xc = void 0,
                           tb = void 0,
                           ub = void 0,
                           vb = void 0,
                           yc = void 0,
                           wb = void 0,
                           xb = void 0,
                           yb = void 0,
                           zc = void 0,
                           zb = void 0,
                           Ab = void 0,
                           Bb = void 0,
                           Ac = void 0,
                           Cb = void 0,
                           Db = void 0,
                           Eb = void 0,
                           Bc = void 0,
                           Sb = void 0,
                           Tb = void 0,
                           Ub = void 0,
                           Mc = void 0,
                           Vb = void 0,
                           Wb = void 0,
                           Xb = void 0,
                           Nc =
                              void 0,
                           ja = void 0,
                           pd = void 0,
                           Yb = void 0,
                           uc = void 0,
                           vc = void 0,
                           Ja = void 0,
                           qd = void 0,
                           Ha = void 0,
                           Ia = void 0,
                           Zb = void 0,
                           Kb = void 0,
                           za = 0,
                           Ea = 0,
                           Lb = 0,
                           Mb = 0,
                           eb = 0,
                           Qa = 0,
                           pa = 0,
                           Sa = 0,
                           Ba = 0,
                           K = 0,
                           ea = 0,
                           A = 0,
                           $a = void 0,
                           Ka = ga.__vertexArray,
                           Cc = ga.__uvArray,
                           Dc = ga.__uv2Array,
                           fb = ga.__normalArray,
                           ta = ga.__tangentArray,
                           La = ga.__colorArray,
                           ua = ga.__skinVertexAArray,
                           va = ga.__skinVertexBArray,
                           wa = ga.__skinIndexArray,
                           xa = ga.__skinWeightArray,
                           dd = ga.__morphTargetsArrays,
                           ed = ga.__morphNormalsArrays,
                           fd = ga.__webglCustomAttributesList,
                           y = void 0,
                           Fb = ga.__faceArray,
                           ab = ga.__lineArray,
                           Ta = zd.geometry,
                           Bd = Ta.elementsNeedUpdate,
                           rd = Ta.uvsNeedUpdate,
                           Cd = Ta.normalsNeedUpdate,
                           Dd = Ta.tangentsNeedUpdate,
                           Ed = Ta.colorsNeedUpdate,
                           Fd = Ta.morphTargetsNeedUpdate,
                           ic = Ta.vertices,
                           ka = ga.faces3,
                           la = ga.faces4,
                           Ca = Ta.faces,
                           gd = Ta.faceVertexUvs[0],
                           hd = Ta.faceVertexUvs[1],
                           jc = Ta.skinVerticesA,
                           kc = Ta.skinVerticesB,
                           lc = Ta.skinIndices,
                           $b = Ta.skinWeights,
                           ac = Ta.morphTargets,
                           Oc = Ta.morphNormals;
                        if (Ta.verticesNeedUpdate)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              L = Ca[ka[I]];
                              Y = ic[L.a];
                              Z = ic[L.b];
                              $ = ic[L.c];
                              Ka[Ea] = Y.x;
                              Ka[Ea +
                                 1] = Y.y;
                              Ka[Ea + 2] = Y.z;
                              Ka[Ea + 3] = Z.x;
                              Ka[Ea + 4] = Z.y;
                              Ka[Ea + 5] = Z.z;
                              Ka[Ea + 6] = $.x;
                              Ka[Ea + 7] = $.y;
                              Ka[Ea + 8] = $.z;
                              Ea = Ea + 9
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              L = Ca[la[I]];
                              Y = ic[L.a];
                              Z = ic[L.b];
                              $ = ic[L.c];
                              oa = ic[L.d];
                              Ka[Ea] = Y.x;
                              Ka[Ea + 1] = Y.y;
                              Ka[Ea + 2] = Y.z;
                              Ka[Ea + 3] = Z.x;
                              Ka[Ea + 4] = Z.y;
                              Ka[Ea + 5] = Z.z;
                              Ka[Ea + 6] = $.x;
                              Ka[Ea + 7] = $.y;
                              Ka[Ea + 8] = $.z;
                              Ka[Ea + 9] = oa.x;
                              Ka[Ea + 10] = oa.y;
                              Ka[Ea + 11] = oa.z;
                              Ea = Ea + 12
                           }
                           k.bindBuffer(k.ARRAY_BUFFER, ga.__webglVertexBuffer);
                           k.bufferData(k.ARRAY_BUFFER, Ka, Za)
                        }
                        if (Fd)
                        {
                           Ja = 0;
                           for (qd = ac.length; Ja < qd; Ja++)
                           {
                              I = ea = 0;
                              for (V = ka.length; I <
                                 V; I++)
                              {
                                 Zb = ka[I];
                                 L = Ca[Zb];
                                 Y = ac[Ja].vertices[L.a];
                                 Z = ac[Ja].vertices[L.b];
                                 $ = ac[Ja].vertices[L.c];
                                 Ha = dd[Ja];
                                 Ha[ea] = Y.x;
                                 Ha[ea + 1] = Y.y;
                                 Ha[ea + 2] = Y.z;
                                 Ha[ea + 3] = Z.x;
                                 Ha[ea + 4] = Z.y;
                                 Ha[ea + 5] = Z.z;
                                 Ha[ea + 6] = $.x;
                                 Ha[ea + 7] = $.y;
                                 Ha[ea + 8] = $.z;
                                 if (hc.morphNormals)
                                 {
                                    if (Kc)
                                    {
                                       Kb = Oc[Ja].vertexNormals[Zb];
                                       tb = Kb.a;
                                       ub = Kb.b;
                                       vb = Kb.c
                                    }
                                    else vb = ub = tb = Oc[Ja].faceNormals[Zb];
                                    Ia = ed[Ja];
                                    Ia[ea] = tb.x;
                                    Ia[ea + 1] = tb.y;
                                    Ia[ea + 2] = tb.z;
                                    Ia[ea + 3] = ub.x;
                                    Ia[ea + 4] = ub.y;
                                    Ia[ea + 5] = ub.z;
                                    Ia[ea + 6] = vb.x;
                                    Ia[ea + 7] = vb.y;
                                    Ia[ea + 8] = vb.z
                                 }
                                 ea = ea + 9
                              }
                              I = 0;
                              for (V = la.length; I < V; I++)
                              {
                                 Zb =
                                    la[I];
                                 L = Ca[Zb];
                                 Y = ac[Ja].vertices[L.a];
                                 Z = ac[Ja].vertices[L.b];
                                 $ = ac[Ja].vertices[L.c];
                                 oa = ac[Ja].vertices[L.d];
                                 Ha = dd[Ja];
                                 Ha[ea] = Y.x;
                                 Ha[ea + 1] = Y.y;
                                 Ha[ea + 2] = Y.z;
                                 Ha[ea + 3] = Z.x;
                                 Ha[ea + 4] = Z.y;
                                 Ha[ea + 5] = Z.z;
                                 Ha[ea + 6] = $.x;
                                 Ha[ea + 7] = $.y;
                                 Ha[ea + 8] = $.z;
                                 Ha[ea + 9] = oa.x;
                                 Ha[ea + 10] = oa.y;
                                 Ha[ea + 11] = oa.z;
                                 if (hc.morphNormals)
                                 {
                                    if (Kc)
                                    {
                                       Kb = Oc[Ja].vertexNormals[Zb];
                                       tb = Kb.a;
                                       ub = Kb.b;
                                       vb = Kb.c;
                                       yc = Kb.d
                                    }
                                    else yc = vb = ub = tb = Oc[Ja].faceNormals[
                                       Zb];
                                    Ia = ed[Ja];
                                    Ia[ea] = tb.x;
                                    Ia[ea + 1] = tb.y;
                                    Ia[ea + 2] = tb.z;
                                    Ia[ea + 3] = ub.x;
                                    Ia[ea + 4] = ub.y;
                                    Ia[ea + 5] = ub.z;
                                    Ia[ea +
                                       6] = vb.x;
                                    Ia[ea + 7] = vb.y;
                                    Ia[ea + 8] = vb.z;
                                    Ia[ea + 9] = yc.x;
                                    Ia[ea + 10] = yc.y;
                                    Ia[ea + 11] = yc.z
                                 }
                                 ea = ea + 12
                              }
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglMorphTargetsBuffers[
                                 Ja]);
                              k.bufferData(k.ARRAY_BUFFER, dd[Ja], Za);
                              if (hc.morphNormals)
                              {
                                 k.bindBuffer(k.ARRAY_BUFFER, ga.__webglMorphNormalsBuffers[
                                    Ja]);
                                 k.bufferData(k.ARRAY_BUFFER, ed[Ja], Za)
                              }
                           }
                        }
                        if ($b.length)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              L = Ca[ka[I]];
                              zb = $b[L.a];
                              Ab = $b[L.b];
                              Bb = $b[L.c];
                              xa[K] = zb.x;
                              xa[K + 1] = zb.y;
                              xa[K + 2] = zb.z;
                              xa[K + 3] = zb.w;
                              xa[K + 4] = Ab.x;
                              xa[K + 5] = Ab.y;
                              xa[K + 6] = Ab.z;
                              xa[K + 7] = Ab.w;
                              xa[K + 8] = Bb.x;
                              xa[K + 9] = Bb.y;
                              xa[K + 10] = Bb.z;
                              xa[K + 11] = Bb.w;
                              Cb = lc[L.a];
                              Db = lc[L.b];
                              Eb = lc[L.c];
                              wa[K] = Cb.x;
                              wa[K + 1] = Cb.y;
                              wa[K + 2] = Cb.z;
                              wa[K + 3] = Cb.w;
                              wa[K + 4] = Db.x;
                              wa[K + 5] = Db.y;
                              wa[K + 6] = Db.z;
                              wa[K + 7] = Db.w;
                              wa[K + 8] = Eb.x;
                              wa[K + 9] = Eb.y;
                              wa[K + 10] = Eb.z;
                              wa[K + 11] = Eb.w;
                              Sb = jc[L.a];
                              Tb = jc[L.b];
                              Ub = jc[L.c];
                              ua[K] = Sb.x;
                              ua[K + 1] = Sb.y;
                              ua[K + 2] = Sb.z;
                              ua[K + 3] = 1;
                              ua[K + 4] = Tb.x;
                              ua[K + 5] = Tb.y;
                              ua[K + 6] = Tb.z;
                              ua[K + 7] = 1;
                              ua[K + 8] = Ub.x;
                              ua[K + 9] = Ub.y;
                              ua[K + 10] = Ub.z;
                              ua[K + 11] = 1;
                              Vb = kc[L.a];
                              Wb = kc[L.b];
                              Xb = kc[L.c];
                              va[K] = Vb.x;
                              va[K + 1] = Vb.y;
                              va[K + 2] = Vb.z;
                              va[K + 3] =
                                 1;
                              va[K + 4] = Wb.x;
                              va[K + 5] = Wb.y;
                              va[K + 6] = Wb.z;
                              va[K + 7] = 1;
                              va[K + 8] = Xb.x;
                              va[K + 9] = Xb.y;
                              va[K + 10] = Xb.z;
                              va[K + 11] = 1;
                              K = K + 12
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              L = Ca[la[I]];
                              zb = $b[L.a];
                              Ab = $b[L.b];
                              Bb = $b[L.c];
                              Ac = $b[L.d];
                              xa[K] = zb.x;
                              xa[K + 1] = zb.y;
                              xa[K + 2] = zb.z;
                              xa[K + 3] = zb.w;
                              xa[K + 4] = Ab.x;
                              xa[K + 5] = Ab.y;
                              xa[K + 6] = Ab.z;
                              xa[K + 7] = Ab.w;
                              xa[K + 8] = Bb.x;
                              xa[K + 9] = Bb.y;
                              xa[K + 10] = Bb.z;
                              xa[K + 11] = Bb.w;
                              xa[K + 12] = Ac.x;
                              xa[K + 13] = Ac.y;
                              xa[K + 14] = Ac.z;
                              xa[K + 15] = Ac.w;
                              Cb = lc[L.a];
                              Db = lc[L.b];
                              Eb = lc[L.c];
                              Bc = lc[L.d];
                              wa[K] = Cb.x;
                              wa[K + 1] = Cb.y;
                              wa[K + 2] = Cb.z;
                              wa[K + 3] = Cb.w;
                              wa[K +
                                 4] = Db.x;
                              wa[K + 5] = Db.y;
                              wa[K + 6] = Db.z;
                              wa[K + 7] = Db.w;
                              wa[K + 8] = Eb.x;
                              wa[K + 9] = Eb.y;
                              wa[K + 10] = Eb.z;
                              wa[K + 11] = Eb.w;
                              wa[K + 12] = Bc.x;
                              wa[K + 13] = Bc.y;
                              wa[K + 14] = Bc.z;
                              wa[K + 15] = Bc.w;
                              Sb = jc[L.a];
                              Tb = jc[L.b];
                              Ub = jc[L.c];
                              Mc = jc[L.d];
                              ua[K] = Sb.x;
                              ua[K + 1] = Sb.y;
                              ua[K + 2] = Sb.z;
                              ua[K + 3] = 1;
                              ua[K + 4] = Tb.x;
                              ua[K + 5] = Tb.y;
                              ua[K + 6] = Tb.z;
                              ua[K + 7] = 1;
                              ua[K + 8] = Ub.x;
                              ua[K + 9] = Ub.y;
                              ua[K + 10] = Ub.z;
                              ua[K + 11] = 1;
                              ua[K + 12] = Mc.x;
                              ua[K + 13] = Mc.y;
                              ua[K + 14] = Mc.z;
                              ua[K + 15] = 1;
                              Vb = kc[L.a];
                              Wb = kc[L.b];
                              Xb = kc[L.c];
                              Nc = kc[L.d];
                              va[K] = Vb.x;
                              va[K + 1] = Vb.y;
                              va[K + 2] = Vb.z;
                              va[K + 3] = 1;
                              va[K + 4] = Wb.x;
                              va[K + 5] = Wb.y;
                              va[K + 6] = Wb.z;
                              va[K + 7] = 1;
                              va[K + 8] = Xb.x;
                              va[K + 9] = Xb.y;
                              va[K + 10] = Xb.z;
                              va[K + 11] = 1;
                              va[K + 12] = Nc.x;
                              va[K + 13] = Nc.y;
                              va[K + 14] = Nc.z;
                              va[K + 15] = 1;
                              K = K + 16
                           }
                           if (K > 0)
                           {
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglSkinVertexABuffer);
                              k.bufferData(k.ARRAY_BUFFER, ua, Za);
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglSkinVertexBBuffer);
                              k.bufferData(k.ARRAY_BUFFER, va, Za);
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglSkinIndicesBuffer);
                              k.bufferData(k.ARRAY_BUFFER, wa, Za);
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglSkinWeightsBuffer);
                              k.bufferData(k.ARRAY_BUFFER,
                                 xa, Za)
                           }
                        }
                        if (Ed && cd)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              L = Ca[ka[I]];
                              mb = L.vertexColors;
                              Lc = L.color;
                              if (mb.length === 3 && cd === THREE.VertexColors)
                              {
                                 wb = mb[0];
                                 xb = mb[1];
                                 yb = mb[2]
                              }
                              else yb = xb = wb = Lc;
                              La[Ba] = wb.r;
                              La[Ba + 1] = wb.g;
                              La[Ba + 2] = wb.b;
                              La[Ba + 3] = xb.r;
                              La[Ba + 4] = xb.g;
                              La[Ba + 5] = xb.b;
                              La[Ba + 6] = yb.r;
                              La[Ba + 7] = yb.g;
                              La[Ba + 8] = yb.b;
                              Ba = Ba + 9
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              L = Ca[la[I]];
                              mb = L.vertexColors;
                              Lc = L.color;
                              if (mb.length === 4 && cd === THREE.VertexColors)
                              {
                                 wb = mb[0];
                                 xb = mb[1];
                                 yb = mb[2];
                                 zc = mb[3]
                              }
                              else zc = yb = xb = wb = Lc;
                              La[Ba] = wb.r;
                              La[Ba + 1] = wb.g;
                              La[Ba + 2] = wb.b;
                              La[Ba + 3] = xb.r;
                              La[Ba + 4] = xb.g;
                              La[Ba + 5] = xb.b;
                              La[Ba + 6] = yb.r;
                              La[Ba + 7] = yb.g;
                              La[Ba + 8] = yb.b;
                              La[Ba + 9] = zc.r;
                              La[Ba + 10] = zc.g;
                              La[Ba + 11] = zc.b;
                              Ba = Ba + 12
                           }
                           if (Ba > 0)
                           {
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglColorBuffer);
                              k.bufferData(k.ARRAY_BUFFER, La, Za)
                           }
                        }
                        if (Dd && Ta.hasTangents)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              L = Ca[ka[I]];
                              Jb = L.vertexTangents;
                              qb = Jb[0];
                              rb = Jb[1];
                              sb = Jb[2];
                              ta[pa] = qb.x;
                              ta[pa + 1] = qb.y;
                              ta[pa + 2] = qb.z;
                              ta[pa + 3] = qb.w;
                              ta[pa + 4] = rb.x;
                              ta[pa + 5] = rb.y;
                              ta[pa + 6] = rb.z;
                              ta[pa + 7] = rb.w;
                              ta[pa + 8] = sb.x;
                              ta[pa + 9] = sb.y;
                              ta[pa +
                                 10] = sb.z;
                              ta[pa + 11] = sb.w;
                              pa = pa + 12
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              L = Ca[la[I]];
                              Jb = L.vertexTangents;
                              qb = Jb[0];
                              rb = Jb[1];
                              sb = Jb[2];
                              xc = Jb[3];
                              ta[pa] = qb.x;
                              ta[pa + 1] = qb.y;
                              ta[pa + 2] = qb.z;
                              ta[pa + 3] = qb.w;
                              ta[pa + 4] = rb.x;
                              ta[pa + 5] = rb.y;
                              ta[pa + 6] = rb.z;
                              ta[pa + 7] = rb.w;
                              ta[pa + 8] = sb.x;
                              ta[pa + 9] = sb.y;
                              ta[pa + 10] = sb.z;
                              ta[pa + 11] = sb.w;
                              ta[pa + 12] = xc.x;
                              ta[pa + 13] = xc.y;
                              ta[pa + 14] = xc.z;
                              ta[pa + 15] = xc.w;
                              pa = pa + 16
                           }
                           k.bindBuffer(k.ARRAY_BUFFER, ga.__webglTangentBuffer);
                           k.bufferData(k.ARRAY_BUFFER, ta, Za)
                        }
                        if (Cd && nd)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              L = Ca[ka[I]];
                              rc = L.vertexNormals;
                              Rb = L.normal;
                              if (rc.length === 3 && Kc)
                                 for (ja = 0; ja < 3; ja++)
                                 {
                                    Yb = rc[ja];
                                    fb[Qa] = Yb.x;
                                    fb[Qa + 1] = Yb.y;
                                    fb[Qa + 2] = Yb.z;
                                    Qa = Qa + 3
                                 }
                              else
                                 for (ja = 0; ja < 3; ja++)
                                 {
                                    fb[Qa] = Rb.x;
                                    fb[Qa + 1] = Rb.y;
                                    fb[Qa + 2] = Rb.z;
                                    Qa = Qa + 3
                                 }
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              L = Ca[la[I]];
                              rc = L.vertexNormals;
                              Rb = L.normal;
                              if (rc.length === 4 && Kc)
                                 for (ja = 0; ja < 4; ja++)
                                 {
                                    Yb = rc[ja];
                                    fb[Qa] = Yb.x;
                                    fb[Qa + 1] = Yb.y;
                                    fb[Qa + 2] = Yb.z;
                                    Qa = Qa + 3
                                 }
                              else
                                 for (ja = 0; ja < 4; ja++)
                                 {
                                    fb[Qa] = Rb.x;
                                    fb[Qa + 1] = Rb.y;
                                    fb[Qa + 2] = Rb.z;
                                    Qa = Qa + 3
                                 }
                           }
                           k.bindBuffer(k.ARRAY_BUFFER, ga.__webglNormalBuffer);
                           k.bufferData(k.ARRAY_BUFFER, fb, Za)
                        }
                        if (rd && gd && od)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              jb = ka[I];
                              L = Ca[jb];
                              sc = gd[jb];
                              if (sc !== void 0)
                                 for (ja = 0; ja < 3; ja++)
                                 {
                                    uc = sc[ja];
                                    Cc[Lb] = uc.u;
                                    Cc[Lb + 1] = uc.v;
                                    Lb = Lb + 2
                                 }
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              jb = la[I];
                              L = Ca[jb];
                              sc = gd[jb];
                              if (sc !== void 0)
                                 for (ja = 0; ja < 4; ja++)
                                 {
                                    uc = sc[ja];
                                    Cc[Lb] = uc.u;
                                    Cc[Lb + 1] = uc.v;
                                    Lb = Lb + 2
                                 }
                           }
                           if (Lb > 0)
                           {
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglUVBuffer);
                              k.bufferData(k.ARRAY_BUFFER, Cc, Za)
                           }
                        }
                        if (rd && hd && od)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              jb = ka[I];
                              L = Ca[jb];
                              tc = hd[jb];
                              if (tc !== void 0)
                                 for (ja =
                                    0; ja < 3; ja++)
                                 {
                                    vc = tc[ja];
                                    Dc[Mb] = vc.u;
                                    Dc[Mb + 1] = vc.v;
                                    Mb = Mb + 2
                                 }
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              jb = la[I];
                              L = Ca[jb];
                              tc = hd[jb];
                              if (tc !== void 0)
                                 for (ja = 0; ja < 4; ja++)
                                 {
                                    vc = tc[ja];
                                    Dc[Mb] = vc.u;
                                    Dc[Mb + 1] = vc.v;
                                    Mb = Mb + 2
                                 }
                           }
                           if (Mb > 0)
                           {
                              k.bindBuffer(k.ARRAY_BUFFER, ga.__webglUV2Buffer);
                              k.bufferData(k.ARRAY_BUFFER, Dc, Za)
                           }
                        }
                        if (Bd)
                        {
                           I = 0;
                           for (V = ka.length; I < V; I++)
                           {
                              L = Ca[ka[I]];
                              Fb[eb] = za;
                              Fb[eb + 1] = za + 1;
                              Fb[eb + 2] = za + 2;
                              eb = eb + 3;
                              ab[Sa] = za;
                              ab[Sa + 1] = za + 1;
                              ab[Sa + 2] = za;
                              ab[Sa + 3] = za + 2;
                              ab[Sa + 4] = za + 1;
                              ab[Sa + 5] = za + 2;
                              Sa = Sa + 6;
                              za = za + 3
                           }
                           I = 0;
                           for (V = la.length; I < V; I++)
                           {
                              L =
                                 Ca[la[I]];
                              Fb[eb] = za;
                              Fb[eb + 1] = za + 1;
                              Fb[eb + 2] = za + 3;
                              Fb[eb + 3] = za + 1;
                              Fb[eb + 4] = za + 2;
                              Fb[eb + 5] = za + 3;
                              eb = eb + 6;
                              ab[Sa] = za;
                              ab[Sa + 1] = za + 1;
                              ab[Sa + 2] = za;
                              ab[Sa + 3] = za + 3;
                              ab[Sa + 4] = za + 1;
                              ab[Sa + 5] = za + 2;
                              ab[Sa + 6] = za + 2;
                              ab[Sa + 7] = za + 3;
                              Sa = Sa + 8;
                              za = za + 4
                           }
                           k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, ga.__webglFaceBuffer);
                           k.bufferData(k.ELEMENT_ARRAY_BUFFER, Fb, Za);
                           k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, ga.__webglLineBuffer);
                           k.bufferData(k.ELEMENT_ARRAY_BUFFER, ab, Za)
                        }
                        if (fd)
                        {
                           ja = 0;
                           for (pd = fd.length; ja < pd; ja++)
                           {
                              y = fd[ja];
                              if (y.__original.needsUpdate)
                              {
                                 A =
                                    0;
                                 if (y.size === 1)
                                    if (y.boundTo === void 0 || y.boundTo ===
                                       "vertices")
                                    {
                                       I = 0;
                                       for (V = ka.length; I < V; I++)
                                       {
                                          L = Ca[ka[I]];
                                          y.array[A] = y.value[L.a];
                                          y.array[A + 1] = y.value[L.b];
                                          y.array[A + 2] = y.value[L.c];
                                          A = A + 3
                                       }
                                       I = 0;
                                       for (V = la.length; I < V; I++)
                                       {
                                          L = Ca[la[I]];
                                          y.array[A] = y.value[L.a];
                                          y.array[A + 1] = y.value[L.b];
                                          y.array[A + 2] = y.value[L.c];
                                          y.array[A + 3] = y.value[L.d];
                                          A = A + 4
                                       }
                                    }
                                    else
                                    {
                                       if (y.boundTo === "faces")
                                       {
                                          I = 0;
                                          for (V = ka.length; I < V; I++)
                                          {
                                             $a = y.value[ka[I]];
                                             y.array[A] = $a;
                                             y.array[A + 1] = $a;
                                             y.array[A + 2] = $a;
                                             A = A + 3
                                          }
                                          I = 0;
                                          for (V = la.length; I < V; I++)
                                          {
                                             $a = y.value[la[I]];
                                             y.array[A] = $a;
                                             y.array[A + 1] = $a;
                                             y.array[A + 2] = $a;
                                             y.array[A + 3] = $a;
                                             A = A + 4
                                          }
                                       }
                                    }
                                    else if (y.size === 2)
                                    if (y.boundTo === void 0 || y.boundTo ===
                                       "vertices")
                                    {
                                       I = 0;
                                       for (V = ka.length; I < V; I++)
                                       {
                                          L = Ca[ka[I]];
                                          Y = y.value[L.a];
                                          Z = y.value[L.b];
                                          $ = y.value[L.c];
                                          y.array[A] = Y.x;
                                          y.array[A + 1] = Y.y;
                                          y.array[A + 2] = Z.x;
                                          y.array[A + 3] = Z.y;
                                          y.array[A + 4] = $.x;
                                          y.array[A + 5] = $.y;
                                          A = A + 6
                                       }
                                       I = 0;
                                       for (V = la.length; I < V; I++)
                                       {
                                          L = Ca[la[I]];
                                          Y = y.value[L.a];
                                          Z = y.value[L.b];
                                          $ = y.value[L.c];
                                          oa = y.value[L.d];
                                          y.array[A] = Y.x;
                                          y.array[A + 1] = Y.y;
                                          y.array[A + 2] = Z.x;
                                          y.array[A + 3] = Z.y;
                                          y.array[A +
                                             4] = $.x;
                                          y.array[A + 5] = $.y;
                                          y.array[A + 6] = oa.x;
                                          y.array[A + 7] = oa.y;
                                          A = A + 8
                                       }
                                    }
                                    else
                                    {
                                       if (y.boundTo === "faces")
                                       {
                                          I = 0;
                                          for (V = ka.length; I < V; I++)
                                          {
                                             $ = Z = Y = $a = y.value[ka[I]];
                                             y.array[A] = Y.x;
                                             y.array[A + 1] = Y.y;
                                             y.array[A + 2] = Z.x;
                                             y.array[A + 3] = Z.y;
                                             y.array[A + 4] = $.x;
                                             y.array[A + 5] = $.y;
                                             A = A + 6
                                          }
                                          I = 0;
                                          for (V = la.length; I < V; I++)
                                          {
                                             oa = $ = Z = Y = $a = y.value[la[I]];
                                             y.array[A] = Y.x;
                                             y.array[A + 1] = Y.y;
                                             y.array[A + 2] = Z.x;
                                             y.array[A + 3] = Z.y;
                                             y.array[A + 4] = $.x;
                                             y.array[A + 5] = $.y;
                                             y.array[A + 6] = oa.x;
                                             y.array[A + 7] = oa.y;
                                             A = A + 8
                                          }
                                       }
                                    }
                                    else if (y.size === 3)
                                 {
                                    var ha;
                                    ha = y.type === "c" ? ["r",
                                       "g", "b"
                                    ] : ["x", "y", "z"];
                                    if (y.boundTo === void 0 || y.boundTo ===
                                       "vertices")
                                    {
                                       I = 0;
                                       for (V = ka.length; I < V; I++)
                                       {
                                          L = Ca[ka[I]];
                                          Y = y.value[L.a];
                                          Z = y.value[L.b];
                                          $ = y.value[L.c];
                                          y.array[A] = Y[ha[0]];
                                          y.array[A + 1] = Y[ha[1]];
                                          y.array[A + 2] = Y[ha[2]];
                                          y.array[A + 3] = Z[ha[0]];
                                          y.array[A + 4] = Z[ha[1]];
                                          y.array[A + 5] = Z[ha[2]];
                                          y.array[A + 6] = $[ha[0]];
                                          y.array[A + 7] = $[ha[1]];
                                          y.array[A + 8] = $[ha[2]];
                                          A = A + 9
                                       }
                                       I = 0;
                                       for (V = la.length; I < V; I++)
                                       {
                                          L = Ca[la[I]];
                                          Y = y.value[L.a];
                                          Z = y.value[L.b];
                                          $ = y.value[L.c];
                                          oa = y.value[L.d];
                                          y.array[A] = Y[ha[0]];
                                          y.array[A + 1] = Y[ha[1]];
                                          y.array[A + 2] = Y[ha[2]];
                                          y.array[A + 3] = Z[ha[0]];
                                          y.array[A + 4] = Z[ha[1]];
                                          y.array[A + 5] = Z[ha[2]];
                                          y.array[A + 6] = $[ha[0]];
                                          y.array[A + 7] = $[ha[1]];
                                          y.array[A + 8] = $[ha[2]];
                                          y.array[A + 9] = oa[ha[0]];
                                          y.array[A + 10] = oa[ha[1]];
                                          y.array[A + 11] = oa[ha[2]];
                                          A = A + 12
                                       }
                                    }
                                    else if (y.boundTo === "faces")
                                    {
                                       I = 0;
                                       for (V = ka.length; I < V; I++)
                                       {
                                          $ = Z = Y = $a = y.value[ka[I]];
                                          y.array[A] = Y[ha[0]];
                                          y.array[A + 1] = Y[ha[1]];
                                          y.array[A + 2] = Y[ha[2]];
                                          y.array[A + 3] = Z[ha[0]];
                                          y.array[A + 4] = Z[ha[1]];
                                          y.array[A + 5] = Z[ha[2]];
                                          y.array[A + 6] = $[ha[0]];
                                          y.array[A + 7] = $[ha[1]];
                                          y.array[A + 8] =
                                             $[ha[2]];
                                          A = A + 9
                                       }
                                       I = 0;
                                       for (V = la.length; I < V; I++)
                                       {
                                          oa = $ = Z = Y = $a = y.value[la[I]];
                                          y.array[A] = Y[ha[0]];
                                          y.array[A + 1] = Y[ha[1]];
                                          y.array[A + 2] = Y[ha[2]];
                                          y.array[A + 3] = Z[ha[0]];
                                          y.array[A + 4] = Z[ha[1]];
                                          y.array[A + 5] = Z[ha[2]];
                                          y.array[A + 6] = $[ha[0]];
                                          y.array[A + 7] = $[ha[1]];
                                          y.array[A + 8] = $[ha[2]];
                                          y.array[A + 9] = oa[ha[0]];
                                          y.array[A + 10] = oa[ha[1]];
                                          y.array[A + 11] = oa[ha[2]];
                                          A = A + 12
                                       }
                                    }
                                 }
                                 else if (y.size === 4)
                                    if (y.boundTo === void 0 || y.boundTo ===
                                       "vertices")
                                    {
                                       I = 0;
                                       for (V = ka.length; I < V; I++)
                                       {
                                          L = Ca[ka[I]];
                                          Y = y.value[L.a];
                                          Z = y.value[L.b];
                                          $ = y.value[L.c];
                                          y.array[A] =
                                             Y.x;
                                          y.array[A + 1] = Y.y;
                                          y.array[A + 2] = Y.z;
                                          y.array[A + 3] = Y.w;
                                          y.array[A + 4] = Z.x;
                                          y.array[A + 5] = Z.y;
                                          y.array[A + 6] = Z.z;
                                          y.array[A + 7] = Z.w;
                                          y.array[A + 8] = $.x;
                                          y.array[A + 9] = $.y;
                                          y.array[A + 10] = $.z;
                                          y.array[A + 11] = $.w;
                                          A = A + 12
                                       }
                                       I = 0;
                                       for (V = la.length; I < V; I++)
                                       {
                                          L = Ca[la[I]];
                                          Y = y.value[L.a];
                                          Z = y.value[L.b];
                                          $ = y.value[L.c];
                                          oa = y.value[L.d];
                                          y.array[A] = Y.x;
                                          y.array[A + 1] = Y.y;
                                          y.array[A + 2] = Y.z;
                                          y.array[A + 3] = Y.w;
                                          y.array[A + 4] = Z.x;
                                          y.array[A + 5] = Z.y;
                                          y.array[A + 6] = Z.z;
                                          y.array[A + 7] = Z.w;
                                          y.array[A + 8] = $.x;
                                          y.array[A + 9] = $.y;
                                          y.array[A + 10] = $.z;
                                          y.array[A + 11] =
                                             $.w;
                                          y.array[A + 12] = oa.x;
                                          y.array[A + 13] = oa.y;
                                          y.array[A + 14] = oa.z;
                                          y.array[A + 15] = oa.w;
                                          A = A + 16
                                       }
                                    }
                                    else if (y.boundTo === "faces")
                                 {
                                    I = 0;
                                    for (V = ka.length; I < V; I++)
                                    {
                                       $ = Z = Y = $a = y.value[ka[I]];
                                       y.array[A] = Y.x;
                                       y.array[A + 1] = Y.y;
                                       y.array[A + 2] = Y.z;
                                       y.array[A + 3] = Y.w;
                                       y.array[A + 4] = Z.x;
                                       y.array[A + 5] = Z.y;
                                       y.array[A + 6] = Z.z;
                                       y.array[A + 7] = Z.w;
                                       y.array[A + 8] = $.x;
                                       y.array[A + 9] = $.y;
                                       y.array[A + 10] = $.z;
                                       y.array[A + 11] = $.w;
                                       A = A + 12
                                    }
                                    I = 0;
                                    for (V = la.length; I < V; I++)
                                    {
                                       oa = $ = Z = Y = $a = y.value[la[I]];
                                       y.array[A] = Y.x;
                                       y.array[A + 1] = Y.y;
                                       y.array[A + 2] = Y.z;
                                       y.array[A + 3] = Y.w;
                                       y.array[A + 4] = Z.x;
                                       y.array[A + 5] = Z.y;
                                       y.array[A + 6] = Z.z;
                                       y.array[A + 7] = Z.w;
                                       y.array[A + 8] = $.x;
                                       y.array[A + 9] = $.y;
                                       y.array[A + 10] = $.z;
                                       y.array[A + 11] = $.w;
                                       y.array[A + 12] = oa.x;
                                       y.array[A + 13] = oa.y;
                                       y.array[A + 14] = oa.z;
                                       y.array[A + 15] = oa.w;
                                       A = A + 16
                                    }
                                 }
                                 k.bindBuffer(k.ARRAY_BUFFER, y.buffer);
                                 k.bufferData(k.ARRAY_BUFFER, y.array, Za)
                              }
                           }
                        }
                        if (Ad)
                        {
                           delete ga.__inittedArrays;
                           delete ga.__colorArray;
                           delete ga.__normalArray;
                           delete ga.__tangentArray;
                           delete ga.__uvArray;
                           delete ga.__uv2Array;
                           delete ga.__faceArray;
                           delete ga.__vertexArray;
                           delete ga.__lineArray;
                           delete ga.__skinVertexAArray;
                           delete ga.__skinVertexBArray;
                           delete ga.__skinIndexArray;
                           delete ga.__skinWeightArray
                        }
                     }
                  }
               }
               da.verticesNeedUpdate = false;
               da.morphTargetsNeedUpdate = false;
               da.elementsNeedUpdate = false;
               da.uvsNeedUpdate = false;
               da.normalsNeedUpdate = false;
               da.colorsNeedUpdate = false;
               da.tangentsNeedUpdate = false;
               Wa.attributes && p(Wa)
            }
            else if (lb instanceof THREE.Ribbon)
         {
            if (da.verticesNeedUpdate || da.colorsNeedUpdate)
            {
               var bc = da,
                  sd = k.DYNAMIC_DRAW,
                  Ec = void 0,
                  Fc = void 0,
                  Pc = void 0,
                  cc = void 0,
                  Qc = void 0,
                  td = bc.vertices,
                  ud = bc.colors,
                  Gd = td.length,
                  Hd = ud.length,
                  Rc = bc.__vertexArray,
                  Sc = bc.__colorArray,
                  Id = bc.colorsNeedUpdate;
               if (bc.verticesNeedUpdate)
               {
                  for (Ec = 0; Ec < Gd; Ec++)
                  {
                     Pc = td[Ec];
                     cc = Ec * 3;
                     Rc[cc] = Pc.x;
                     Rc[cc + 1] = Pc.y;
                     Rc[cc + 2] = Pc.z
                  }
                  k.bindBuffer(k.ARRAY_BUFFER, bc.__webglVertexBuffer);
                  k.bufferData(k.ARRAY_BUFFER, Rc, sd)
               }
               if (Id)
               {
                  for (Fc = 0; Fc < Hd; Fc++)
                  {
                     Qc = ud[Fc];
                     cc = Fc * 3;
                     Sc[cc] = Qc.r;
                     Sc[cc + 1] = Qc.g;
                     Sc[cc + 2] = Qc.b
                  }
                  k.bindBuffer(k.ARRAY_BUFFER, bc.__webglColorBuffer);
                  k.bufferData(k.ARRAY_BUFFER, Sc, sd)
               }
            }
            da.verticesNeedUpdate = false;
            da.colorsNeedUpdate =
               false
         }
         else if (lb instanceof THREE.Line)
         {
            Wa = c(lb, cb);
            oc = Wa.attributes && n(Wa);
            if (da.verticesNeedUpdate || da.colorsNeedUpdate || oc)
            {
               var Nb = da,
                  id = k.DYNAMIC_DRAW,
                  Gc = void 0,
                  Hc = void 0,
                  Tc = void 0,
                  ya = void 0,
                  Uc = void 0,
                  vd = Nb.vertices,
                  wd = Nb.colors,
                  Jd = vd.length,
                  Kd = wd.length,
                  Vc = Nb.__vertexArray,
                  Wc = Nb.__colorArray,
                  Ld = Nb.colorsNeedUpdate,
                  jd = Nb.__webglCustomAttributesList,
                  Xc = void 0,
                  xd = void 0,
                  Na = void 0,
                  wc = void 0,
                  Xa = void 0,
                  ra = void 0;
               if (Nb.verticesNeedUpdate)
               {
                  for (Gc = 0; Gc < Jd; Gc++)
                  {
                     Tc = vd[Gc];
                     ya = Gc * 3;
                     Vc[ya] = Tc.x;
                     Vc[ya + 1] =
                        Tc.y;
                     Vc[ya + 2] = Tc.z
                  }
                  k.bindBuffer(k.ARRAY_BUFFER, Nb.__webglVertexBuffer);
                  k.bufferData(k.ARRAY_BUFFER, Vc, id)
               }
               if (Ld)
               {
                  for (Hc = 0; Hc < Kd; Hc++)
                  {
                     Uc = wd[Hc];
                     ya = Hc * 3;
                     Wc[ya] = Uc.r;
                     Wc[ya + 1] = Uc.g;
                     Wc[ya + 2] = Uc.b
                  }
                  k.bindBuffer(k.ARRAY_BUFFER, Nb.__webglColorBuffer);
                  k.bufferData(k.ARRAY_BUFFER, Wc, id)
               }
               if (jd)
               {
                  Xc = 0;
                  for (xd = jd.length; Xc < xd; Xc++)
                  {
                     ra = jd[Xc];
                     if (ra.needsUpdate && (ra.boundTo === void 0 || ra.boundTo ===
                        "vertices"))
                     {
                        ya = 0;
                        wc = ra.value.length;
                        if (ra.size === 1)
                           for (Na = 0; Na < wc; Na++) ra.array[Na] = ra.value[
                              Na];
                        else if (ra.size === 2)
                           for (Na =
                              0; Na < wc; Na++)
                           {
                              Xa = ra.value[Na];
                              ra.array[ya] = Xa.x;
                              ra.array[ya + 1] = Xa.y;
                              ya = ya + 2
                           }
                        else if (ra.size === 3)
                           if (ra.type === "c")
                              for (Na = 0; Na < wc; Na++)
                              {
                                 Xa = ra.value[Na];
                                 ra.array[ya] = Xa.r;
                                 ra.array[ya + 1] = Xa.g;
                                 ra.array[ya + 2] = Xa.b;
                                 ya = ya + 3
                              }
                           else
                              for (Na = 0; Na < wc; Na++)
                              {
                                 Xa = ra.value[Na];
                                 ra.array[ya] = Xa.x;
                                 ra.array[ya + 1] = Xa.y;
                                 ra.array[ya + 2] = Xa.z;
                                 ya = ya + 3
                              }
                           else if (ra.size === 4)
                           for (Na = 0; Na < wc; Na++)
                           {
                              Xa = ra.value[Na];
                              ra.array[ya] = Xa.x;
                              ra.array[ya + 1] = Xa.y;
                              ra.array[ya + 2] = Xa.z;
                              ra.array[ya + 3] = Xa.w;
                              ya = ya + 4
                           }
                        k.bindBuffer(k.ARRAY_BUFFER, ra.buffer);
                        k.bufferData(k.ARRAY_BUFFER, ra.array, id)
                     }
                  }
               }
            }
            da.verticesNeedUpdate = false;
            da.colorsNeedUpdate = false;
            Wa.attributes && p(Wa)
         }
         else if (lb instanceof THREE.ParticleSystem)
         {
            Wa = c(lb, cb);
            oc = Wa.attributes && n(Wa);
            (da.verticesNeedUpdate || da.colorsNeedUpdate || lb.sortParticles ||
               oc) && f(da, k.DYNAMIC_DRAW, lb);
            da.verticesNeedUpdate = false;
            da.colorsNeedUpdate = false;
            Wa.attributes && p(Wa)
         }
      }
   };
   this.initMaterial = function (a, b, c, d)
   {
      var e, f, g, h, i, j, m, l;
      a instanceof THREE.MeshDepthMaterial ? l = "depth" : a instanceof THREE.MeshNormalMaterial ?
         l = "normal" : a instanceof THREE.MeshBasicMaterial ? l = "basic" : a instanceof THREE
         .MeshLambertMaterial ? l = "lambert" : a instanceof THREE.MeshPhongMaterial ?
         l = "phong" : a instanceof THREE.LineBasicMaterial ? l = "basic" : a instanceof THREE
         .ParticleBasicMaterial && (l = "particle_basic");
      if (l)
      {
         var n = THREE.ShaderLib[l];
         a.uniforms = THREE.UniformsUtils.clone(n.uniforms);
         a.vertexShader = n.vertexShader;
         a.fragmentShader = n.fragmentShader
      }
      var o, p;
      o = g = e = n = 0;
      for (f = b.length; o < f; o++)
      {
         p = b[o];
         if (!p.onlyShadow)
         {
            p instanceof THREE.DirectionalLight &&
               g++;
            p instanceof THREE.PointLight && e++;
            p instanceof THREE.SpotLight && n++
         }
      }
      if (e + n + g <= Q)
      {
         o = g;
         f = e
      }
      else
      {
         o = Math.ceil(Q * g / (e + g));
         n = f = Q - o
      }
      e = o;
      g = n;
      n = m = 0;
      for (o = b.length; n < o; n++)
      {
         p = b[n];
         if (p.castShadow)
         {
            p instanceof THREE.SpotLight && m++;
            p instanceof THREE.DirectionalLight && !p.shadowCascade && m++
         }
      }
      if (dc && d && d.useVertexTexture) j = 1024;
      else
      {
         b = k.getParameter(k.MAX_VERTEX_UNIFORM_VECTORS);
         b = Math.floor((b - 20) / 4);
         if (d !== void 0 && d instanceof THREE.SkinnedMesh)
         {
            b = Math.min(d.bones.length, b);
            b < d.bones.length && console.warn(
               "WebGLRenderer: too many bones - " +
               d.bones.length + ", this GPU supports just " + b +
               " (try OpenGL instead of ANGLE)")
         }
         j = b
      }
      var r;
      a:
      {
         p = a.fragmentShader;
         o = a.vertexShader;
         var n = a.uniforms,
            b = a.attributes,
            c = {
               map: !! a.map,
               envMap: !! a.envMap,
               lightMap: !! a.lightMap,
               vertexColors: a.vertexColors,
               fog: c,
               useFog: a.fog,
               sizeAttenuation: a.sizeAttenuation,
               skinning: a.skinning,
               maxBones: j,
               useVertexTexture: dc && d && d.useVertexTexture,
               boneTextureWidth: d && d.boneTextureWidth,
               boneTextureHeight: d && d.boneTextureHeight,
               morphTargets: a.morphTargets,
               morphNormals: a.morphNormals,
               maxMorphTargets: this.maxMorphTargets,
               maxMorphNormals: this.maxMorphNormals,
               maxDirLights: e,
               maxPointLights: f,
               maxSpotLights: g,
               maxShadows: m,
               shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
               shadowMapSoft: this.shadowMapSoft,
               shadowMapDebug: this.shadowMapDebug,
               shadowMapCascade: this.shadowMapCascade,
               alphaTest: a.alphaTest,
               metal: a.metal,
               perPixel: a.perPixel,
               wrapAround: a.wrapAround,
               doubleSided: d && d.doubleSided
            }, q, d = [];
         if (l) d.push(l);
         else
         {
            d.push(p);
            d.push(o)
         }
         for (q in c)
         {
            d.push(q);
            d.push(c[q])
         }
         l = d.join();
         q = 0;
         for (d = aa.length; q < d; q++)
         {
            e = aa[q];
            if (e.code === l)
            {
               e.usedTimes++;
               r = e.program;
               break a
            }
         }
         q = k.createProgram();
         d = ["precision " + u + " float;", cb ? "#define VERTEX_TEXTURES" : "",
            E.gammaInput ? "#define GAMMA_INPUT" : "", E.gammaOutput ?
            "#define GAMMA_OUTPUT" : "", E.physicallyBasedShading ?
            "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " +
            c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights,
            "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
            "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones,
            c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" :
            "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.vertexColors ?
            "#define USE_COLOR" : "", c.skinning ? "#define USE_SKINNING" : "",
            c.useVertexTexture ? "#define BONE_TEXTURE" : "", c.boneTextureWidth ?
            "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1) : "", c.boneTextureHeight ?
            "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1) : "", c.morphTargets ?
            "#define USE_MORPHTARGETS" : "", c.morphNormals ?
            "#define USE_MORPHNORMALS" : "", c.perPixel ?
            "#define PHONG_PER_PIXEL" :
            "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ?
            "#define DOUBLE_SIDED" : "", c.shadowMapEnabled ?
            "#define USE_SHADOWMAP" : "", c.shadowMapSoft ?
            "#define SHADOWMAP_SOFT" : "", c.shadowMapDebug ?
            "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ?
            "#define SHADOWMAP_CASCADE" : "", c.sizeAttenuation ?
            "#define USE_SIZEATTENUATION" : "",
            "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"
         ].join("\n");
         e = ["precision " + u + " float;", "#define MAX_DIR_LIGHTS " + c.maxDirLights,
            "#define MAX_POINT_LIGHTS " + c.maxPointLights,
            "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
            "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ?
            "#define ALPHATEST " + c.alphaTest : "", E.gammaInput ?
            "#define GAMMA_INPUT" : "", E.gammaOutput ? "#define GAMMA_OUTPUT" :
            "", E.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" :
            "", c.useFog && c.fog ? "#define USE_FOG" : "", c.useFog && c.fog instanceof THREE
            .FogExp2 ? "#define FOG_EXP2" : "", c.map ? "#define USE_MAP" :
            "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ?
            "#define USE_LIGHTMAP" : "", c.vertexColors ? "#define USE_COLOR" :
            "", c.metal ? "#define METAL" : "", c.perPixel ?
            "#define PHONG_PER_PIXEL" : "", c.wrapAround ?
            "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" :
            "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapSoft ?
            "#define SHADOWMAP_SOFT" : "", c.shadowMapDebug ?
            "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ?
            "#define SHADOWMAP_CASCADE" : "",
            "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"
         ].join("\n");
         e = t("fragment", e + p);
         d = t("vertex", d + o);
         k.attachShader(q, d);
         k.attachShader(q, e);
         k.linkProgram(q);
         k.getProgramParameter(q, k.LINK_STATUS) || console.error(
            "Could not initialise shader\nVALIDATE_STATUS: " + k.getProgramParameter(
               q, k.VALIDATE_STATUS) + ", gl error [" + k.getError() + "]");
         k.deleteShader(e);
         k.deleteShader(d);
         q.uniforms = {};
         q.attributes = {};
         var s, d = ["viewMatrix", "modelViewMatrix", "projectionMatrix",
               "normalMatrix", "objectMatrix", "cameraPosition",
               "morphTargetInfluences"
            ];
         c.useVertexTexture ? d.push("boneTexture") :
            d.push("boneGlobalMatrices");
         for (s in n) d.push(s);
         s = d;
         d = 0;
         for (n = s.length; d < n; d++)
         {
            e = s[d];
            q.uniforms[e] = k.getUniformLocation(q, e)
         }
         d = ["position", "normal", "uv", "uv2", "tangent", "color",
            "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"
         ];
         for (s = 0; s < c.maxMorphTargets; s++) d.push("morphTarget" + s);
         for (s = 0; s < c.maxMorphNormals; s++) d.push("morphNormal" + s);
         for (r in b) d.push(r);
         r = d;
         s = 0;
         for (c = r.length; s < c; s++)
         {
            d = r[s];
            q.attributes[d] = k.getAttribLocation(q, d)
         }
         q.id = T++;
         aa.push(
         {
            program: q,
            code: l,
            usedTimes: 1
         });
         E.info.memory.programs =
            aa.length;
         r = q
      }
      a.program = r;
      r = a.program.attributes;
      r.position >= 0 && k.enableVertexAttribArray(r.position);
      r.color >= 0 && k.enableVertexAttribArray(r.color);
      r.normal >= 0 && k.enableVertexAttribArray(r.normal);
      r.tangent >= 0 && k.enableVertexAttribArray(r.tangent);
      if (a.skinning && r.skinVertexA >= 0 && r.skinVertexB >= 0 && r.skinIndex >=
         0 && r.skinWeight >= 0)
      {
         k.enableVertexAttribArray(r.skinVertexA);
         k.enableVertexAttribArray(r.skinVertexB);
         k.enableVertexAttribArray(r.skinIndex);
         k.enableVertexAttribArray(r.skinWeight)
      }
      if (a.attributes)
         for (i in a.attributes) r[i] !==
            void 0 && r[i] >= 0 && k.enableVertexAttribArray(r[i]);
      if (a.morphTargets)
      {
         a.numSupportedMorphTargets = 0;
         q = "morphTarget";
         for (i = 0; i < this.maxMorphTargets; i++)
         {
            s = q + i;
            if (r[s] >= 0)
            {
               k.enableVertexAttribArray(r[s]);
               a.numSupportedMorphTargets++
            }
         }
      }
      if (a.morphNormals)
      {
         a.numSupportedMorphNormals = 0;
         q = "morphNormal";
         for (i = 0; i < this.maxMorphNormals; i++)
         {
            s = q + i;
            if (r[s] >= 0)
            {
               k.enableVertexAttribArray(r[s]);
               a.numSupportedMorphNormals++
            }
         }
      }
      a.uniformsList = [];
      for (h in a.uniforms) a.uniformsList.push([a.uniforms[h], h])
   };
   this.setFaceCulling =
      function (a, b)
      {
         if (a)
         {
            !b || b === "ccw" ? k.frontFace(k.CCW) : k.frontFace(k.CW);
            a === "back" ? k.cullFace(k.BACK) : a === "front" ? k.cullFace(k.FRONT) :
               k.cullFace(k.FRONT_AND_BACK);
            k.enable(k.CULL_FACE)
         }
         else k.disable(k.CULL_FACE)
   };
   this.setObjectFaces = function (a)
   {
      if (S !== a.doubleSided)
      {
         a.doubleSided ? k.disable(k.CULL_FACE) : k.enable(k.CULL_FACE);
         S = a.doubleSided
      }
      if (R !== a.flipSided)
      {
         a.flipSided ? k.frontFace(k.CW) : k.frontFace(k.CCW);
         R = a.flipSided
      }
   };
   this.setDepthTest = function (a)
   {
      if (Ga !== a)
      {
         a ? k.enable(k.DEPTH_TEST) : k.disable(k.DEPTH_TEST);
         Ga = a
      }
   };
   this.setDepthWrite = function (a)
   {
      if (na !== a)
      {
         k.depthMask(a);
         na = a
      }
   };
   this.setBlending = function (a, b, c, d)
   {
      if (a !== P)
      {
         if (a === THREE.NoBlending) k.disable(k.BLEND);
         else if (a === THREE.AdditiveBlending)
         {
            k.enable(k.BLEND);
            k.blendEquation(k.FUNC_ADD);
            k.blendFunc(k.SRC_ALPHA, k.ONE)
         }
         else if (a === THREE.SubtractiveBlending)
         {
            k.enable(k.BLEND);
            k.blendEquation(k.FUNC_ADD);
            k.blendFunc(k.ZERO, k.ONE_MINUS_SRC_COLOR)
         }
         else if (a === THREE.MultiplyBlending)
         {
            k.enable(k.BLEND);
            k.blendEquation(k.FUNC_ADD);
            k.blendFunc(k.ZERO, k.SRC_COLOR)
         }
         else if (a ===
            THREE.CustomBlending) k.enable(k.BLEND);
         else
         {
            k.enable(k.BLEND);
            k.blendEquationSeparate(k.FUNC_ADD, k.FUNC_ADD);
            k.blendFuncSeparate(k.SRC_ALPHA, k.ONE_MINUS_SRC_ALPHA, k.ONE, k.ONE_MINUS_SRC_ALPHA)
         }
         P = a
      }
      if (a === THREE.CustomBlending)
      {
         if (b !== U)
         {
            k.blendEquation(D(b));
            U = b
         }
         if (c !== fa || d !== ma)
         {
            k.blendFunc(D(c), D(d));
            fa = c;
            ma = d
         }
      }
      else ma = fa = U = null
   };
   this.setTexture = function (a, b)
   {
      if (a.needsUpdate)
      {
         if (!a.__webglInit)
         {
            a.__webglInit = true;
            a.__webglTexture = k.createTexture();
            E.info.memory.textures++
         }
         k.activeTexture(k.TEXTURE0 +
            b);
         k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
         k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, a.flipY);
         k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
         var c = a.image,
            d = (c.width & c.width - 1) === 0 && (c.height & c.height - 1) ===
               0,
            e = D(a.format),
            f = D(a.type);
         v(k.TEXTURE_2D, a, d);
         a instanceof THREE.DataTexture ? k.texImage2D(k.TEXTURE_2D, 0, e, c.width,
            c.height, 0, e, f, c.data) : k.texImage2D(k.TEXTURE_2D, 0, e, e, f,
            a.image);
         a.generateMipmaps && d && k.generateMipmap(k.TEXTURE_2D);
         a.needsUpdate = false;
         if (a.onUpdate) a.onUpdate()
      }
      else
      {
         k.activeTexture(k.TEXTURE0 +
            b);
         k.bindTexture(k.TEXTURE_2D, a.__webglTexture)
      }
   };
   this.setRenderTarget = function (a)
   {
      var b = a instanceof THREE.WebGLRenderTargetCube;
      if (a && !a.__webglFramebuffer)
      {
         if (a.depthBuffer === void 0) a.depthBuffer = true;
         if (a.stencilBuffer === void 0) a.stencilBuffer = true;
         a.__webglTexture = k.createTexture();
         var c = (a.width & a.width - 1) === 0 && (a.height & a.height - 1) ===
            0,
            d = D(a.format),
            e = D(a.type);
         if (b)
         {
            a.__webglFramebuffer = [];
            a.__webglRenderbuffer = [];
            k.bindTexture(k.TEXTURE_CUBE_MAP, a.__webglTexture);
            v(k.TEXTURE_CUBE_MAP, a, c);
            for (var f = 0; f < 6; f++)
            {
               a.__webglFramebuffer[f] = k.createFramebuffer();
               a.__webglRenderbuffer[f] = k.createRenderbuffer();
               k.texImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a
                  .height, 0, d, e, null);
               var g = a,
                  h = k.TEXTURE_CUBE_MAP_POSITIVE_X + f;
               k.bindFramebuffer(k.FRAMEBUFFER, a.__webglFramebuffer[f]);
               k.framebufferTexture2D(k.FRAMEBUFFER, k.COLOR_ATTACHMENT0, h, g.__webglTexture,
                  0);
               x(a.__webglRenderbuffer[f], a)
            }
            c && k.generateMipmap(k.TEXTURE_CUBE_MAP)
         }
         else
         {
            a.__webglFramebuffer = k.createFramebuffer();
            a.__webglRenderbuffer =
               k.createRenderbuffer();
            k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
            v(k.TEXTURE_2D, a, c);
            k.texImage2D(k.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null);
            d = k.TEXTURE_2D;
            k.bindFramebuffer(k.FRAMEBUFFER, a.__webglFramebuffer);
            k.framebufferTexture2D(k.FRAMEBUFFER, k.COLOR_ATTACHMENT0, d, a.__webglTexture,
               0);
            x(a.__webglRenderbuffer, a);
            c && k.generateMipmap(k.TEXTURE_2D)
         }
         b ? k.bindTexture(k.TEXTURE_CUBE_MAP, null) : k.bindTexture(k.TEXTURE_2D,
            null);
         k.bindRenderbuffer(k.RENDERBUFFER, null);
         k.bindFramebuffer(k.FRAMEBUFFER,
            null)
      }
      if (a)
      {
         b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer;
         c = a.width;
         a = a.height;
         e = d = 0
      }
      else
      {
         b = null;
         c = ob;
         a = kb;
         d = gb;
         e = Ob
      } if (b !== W)
      {
         k.bindFramebuffer(k.FRAMEBUFFER, b);
         k.viewport(d, e, c, a);
         W = b
      }
      ec = c;
      Ua = a
   };
   this.shadowMapPlugin = new THREE.ShadowMapPlugin;
   this.addPrePlugin(this.shadowMapPlugin);
   this.addPostPlugin(new THREE.SpritePlugin);
   this.addPostPlugin(new THREE.LensFlarePlugin)
};
THREE.WebGLRenderTarget = function (a, b, c)
{
   this.width = a;
   this.height = b;
   c = c ||
   {};
   this.wrapS = c.wrapS !== void 0 ? c.wrapS : THREE.ClampToEdgeWrapping;
   this.wrapT = c.wrapT !== void 0 ? c.wrapT : THREE.ClampToEdgeWrapping;
   this.magFilter = c.magFilter !== void 0 ? c.magFilter : THREE.LinearFilter;
   this.minFilter = c.minFilter !== void 0 ? c.minFilter : THREE.LinearMipMapLinearFilter;
   this.anisotropy = c.anisotropy !== void 0 ? c.anisotropy : 1;
   this.offset = new THREE.Vector2(0, 0);
   this.repeat = new THREE.Vector2(1, 1);
   this.format = c.format !== void 0 ? c.format :
      THREE.RGBAFormat;
   this.type = c.type !== void 0 ? c.type : THREE.UnsignedByteType;
   this.depthBuffer = c.depthBuffer !== void 0 ? c.depthBuffer : true;
   this.stencilBuffer = c.stencilBuffer !== void 0 ? c.stencilBuffer : true;
   this.generateMipmaps = true
};
THREE.WebGLRenderTarget.prototype.clone = function ()
{
   var a = new THREE.WebGLRenderTarget(this.width, this.height);
   a.wrapS = this.wrapS;
   a.wrapT = this.wrapT;
   a.magFilter = this.magFilter;
   a.anisotropy = this.anisotropy;
   a.minFilter = this.minFilter;
   a.offset.copy(this.offset);
   a.repeat.copy(this.repeat);
   a.format = this.format;
   a.type = this.type;
   a.depthBuffer = this.depthBuffer;
   a.stencilBuffer = this.stencilBuffer;
   a.generateMipmaps = this.generateMipmaps;
   return a
};
THREE.WebGLRenderTargetCube = function (a, b, c)
{
   THREE.WebGLRenderTarget.call(this, a, b, c);
   this.activeCubeFace = 0
};
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype);
THREE.RenderableVertex = function ()
{
   this.positionWorld = new THREE.Vector3;
   this.positionScreen = new THREE.Vector4;
   this.visible = true
};
THREE.RenderableVertex.prototype.copy = function (a)
{
   this.positionWorld.copy(a.positionWorld);
   this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function ()
{
   this.v1 = new THREE.RenderableVertex;
   this.v2 = new THREE.RenderableVertex;
   this.v3 = new THREE.RenderableVertex;
   this.centroidWorld = new THREE.Vector3;
   this.centroidScreen = new THREE.Vector3;
   this.normalWorld = new THREE.Vector3;
   this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
   this.faceMaterial = this.material = null;
   this.uvs = [
      []
   ];
   this.z = null
};
THREE.RenderableFace4 = function ()
{
   this.v1 = new THREE.RenderableVertex;
   this.v2 = new THREE.RenderableVertex;
   this.v3 = new THREE.RenderableVertex;
   this.v4 = new THREE.RenderableVertex;
   this.centroidWorld = new THREE.Vector3;
   this.centroidScreen = new THREE.Vector3;
   this.normalWorld = new THREE.Vector3;
   this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3,
      new THREE.Vector3
   ];
   this.faceMaterial = this.material = null;
   this.uvs = [
      []
   ];
   this.z = null
};
THREE.RenderableObject = function ()
{
   this.z = this.object = null
};
THREE.RenderableParticle = function ()
{
   this.rotation = this.z = this.y = this.x = null;
   this.scale = new THREE.Vector2;
   this.material = null
};
THREE.RenderableLine = function ()
{
   this.z = null;
   this.v1 = new THREE.RenderableVertex;
   this.v2 = new THREE.RenderableVertex;
   this.material = null
};
THREE.ColorUtils = {
   adjustHSV: function (a, b, c, d)
   {
      var e = THREE.ColorUtils.__hsv;
      THREE.ColorUtils.rgbToHsv(a, e);
      e.h = THREE.Math.clamp(e.h + b, 0, 1);
      e.s = THREE.Math.clamp(e.s + c, 0, 1);
      e.v = THREE.Math.clamp(e.v + d, 0, 1);
      a.setHSV(e.h, e.s, e.v)
   },
   rgbToHsv: function (a, b)
   {
      var c = a.r,
         d = a.g,
         e = a.b,
         f = Math.max(Math.max(c, d), e),
         g = Math.min(Math.min(c, d), e);
      if (g === f) g = c = 0;
      else
      {
         var h = f - g,
            g = h / f,
            c = (c === f ? (d - e) / h : d === f ? 2 + (e - c) / h : 4 + (c - d) /
               h) / 6;
         c < 0 && (c = c + 1);
         c > 1 && (c = c - 1)
      }
      b === void 0 && (b = {
         h: 0,
         s: 0,
         v: 0
      });
      b.h = c;
      b.s = g;
      b.v = f;
      return b
   }
};
THREE.ColorUtils.__hsv = {
   h: 0,
   s: 0,
   v: 0
};
THREE.GeometryUtils = {
   merge: function (a, b)
   {
      for (var c, d, e = a.vertices.length, f = b instanceof THREE.Mesh ? b.geometry :
            b, g = a.vertices, h = f.vertices, i = a.faces, j = f.faces, l = a.faceVertexUvs[
               0], m = f.faceVertexUvs[0], n = {}, p = 0; p < a.materials.length; p++
      ) n[a.materials[p].id] = p;
      if (b instanceof THREE.Mesh)
      {
         b.matrixAutoUpdate && b.updateMatrix();
         c = b.matrix;
         d = new THREE.Matrix4;
         d.extractRotation(c, b.scale)
      }
      for (var p = 0, r = h.length; p < r; p++)
      {
         var o = h[p].clone();
         c && c.multiplyVector3(o);
         g.push(o)
      }
      p = 0;
      for (r = j.length; p < r; p++)
      {
         var g =
            j[p],
            q, s, w = g.vertexNormals,
            t = g.vertexColors;
         g instanceof THREE.Face3 ? q = new THREE.Face3(g.a + e, g.b + e, g.c +
            e) : g instanceof THREE.Face4 && (q = new THREE.Face4(g.a + e, g.b +
            e, g.c + e, g.d + e));
         q.normal.copy(g.normal);
         d && d.multiplyVector3(q.normal);
         h = 0;
         for (o = w.length; h < o; h++)
         {
            s = w[h].clone();
            d && d.multiplyVector3(s);
            q.vertexNormals.push(s)
         }
         q.color.copy(g.color);
         h = 0;
         for (o = t.length; h < o; h++)
         {
            s = t[h];
            q.vertexColors.push(s.clone())
         }
         if (g.materialIndex !== void 0)
         {
            h = f.materials[g.materialIndex];
            o = h.id;
            t = n[o];
            if (t === void 0)
            {
               t =
                  a.materials.length;
               n[o] = t;
               a.materials.push(h)
            }
            q.materialIndex = t
         }
         q.centroid.copy(g.centroid);
         c && c.multiplyVector3(q.centroid);
         i.push(q)
      }
      p = 0;
      for (r = m.length; p < r; p++)
      {
         c = m[p];
         d = [];
         h = 0;
         for (o = c.length; h < o; h++) d.push(new THREE.UV(c[h].u, c[h].v));
         l.push(d)
      }
   },
   clone: function (a)
   {
      var b = new THREE.Geometry,
         c, d = a.vertices,
         e = a.faces,
         f = a.faceVertexUvs[0];
      if (a.materials) b.materials = a.materials.slice();
      a = 0;
      for (c = d.length; a < c; a++) b.vertices.push(d[a].clone());
      a = 0;
      for (c = e.length; a < c; a++) b.faces.push(e[a].clone());
      a = 0;
      for (c = f.length; a < c; a++)
      {
         for (var d = f[a], e = [], g = 0, h = d.length; g < h; g++) e.push(new THREE
            .UV(d[g].u, d[g].v));
         b.faceVertexUvs[0].push(e)
      }
      return b
   },
   randomPointInTriangle: function (a, b, c)
   {
      var d, e, f, g = new THREE.Vector3,
         h = THREE.GeometryUtils.__v1;
      d = THREE.GeometryUtils.random();
      e = THREE.GeometryUtils.random();
      if (d + e > 1)
      {
         d = 1 - d;
         e = 1 - e
      }
      f = 1 - d - e;
      g.copy(a);
      g.multiplyScalar(d);
      h.copy(b);
      h.multiplyScalar(e);
      g.addSelf(h);
      h.copy(c);
      h.multiplyScalar(f);
      g.addSelf(h);
      return g
   },
   randomPointInFace: function (a, b, c)
   {
      var d, e, f;
      if (a instanceof THREE.Face3)
      {
         d = b.vertices[a.a];
         e = b.vertices[a.b];
         f = b.vertices[a.c];
         return THREE.GeometryUtils.randomPointInTriangle(d, e, f)
      }
      if (a instanceof THREE.Face4)
      {
         d = b.vertices[a.a];
         e = b.vertices[a.b];
         f = b.vertices[a.c];
         var b = b.vertices[a.d],
            g;
         if (c)
            if (a._area1 && a._area2)
            {
               c = a._area1;
               g = a._area2
            }
            else
            {
               c = THREE.GeometryUtils.triangleArea(d, e, b);
               g = THREE.GeometryUtils.triangleArea(e, f, b);
               a._area1 = c;
               a._area2 = g
            }
            else
            {
               c = THREE.GeometryUtils.triangleArea(d, e, b);
               g = THREE.GeometryUtils.triangleArea(e, f, b)
            }
         return THREE.GeometryUtils.random() *
            (c + g) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) :
            THREE.GeometryUtils.randomPointInTriangle(e, f, b)
      }
   },
   randomPointsInGeometry: function (a, b)
   {
      function c(a)
      {
         function b(c, d)
         {
            if (d < c) return c;
            var e = c + Math.floor((d - c) / 2);
            return j[e] > a ? b(c, e - 1) : j[e] < a ? b(e + 1, d) : e
         }
         return b(0, j.length - 1)
      }
      var d, e, f = a.faces,
         g = a.vertices,
         h = f.length,
         i = 0,
         j = [],
         l, m, n, p;
      for (e = 0; e < h; e++)
      {
         d = f[e];
         if (d instanceof THREE.Face3)
         {
            l = g[d.a];
            m = g[d.b];
            n = g[d.c];
            d._area = THREE.GeometryUtils.triangleArea(l, m, n)
         }
         else if (d instanceof THREE.Face4)
         {
            l =
               g[d.a];
            m = g[d.b];
            n = g[d.c];
            p = g[d.d];
            d._area1 = THREE.GeometryUtils.triangleArea(l, m, p);
            d._area2 = THREE.GeometryUtils.triangleArea(m, n, p);
            d._area = d._area1 + d._area2
         }
         i = i + d._area;
         j[e] = i
      }
      d = [];
      for (e = 0; e < b; e++)
      {
         g = THREE.GeometryUtils.random() * i;
         g = c(g);
         d[e] = THREE.GeometryUtils.randomPointInFace(f[g], a, true)
      }
      return d
   },
   triangleArea: function (a, b, c)
   {
      var d, e = THREE.GeometryUtils.__v1;
      e.sub(a, b);
      d = e.length();
      e.sub(a, c);
      a = e.length();
      e.sub(b, c);
      c = e.length();
      b = 0.5 * (d + a + c);
      return Math.sqrt(b * (b - d) * (b - a) * (b - c))
   },
   center: function (a)
   {
      a.computeBoundingBox();
      var b = a.boundingBox,
         c = new THREE.Vector3;
      c.add(b.min, b.max);
      c.multiplyScalar(-0.5);
      a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z));
      a.computeBoundingBox();
      return c
   },
   normalizeUVs: function (a)
   {
      for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++)
         for (var d = a[b], e = 0, f = d.length; e < f; e++)
         {
            if (d[e].u !== 1) d[e].u = d[e].u - Math.floor(d[e].u);
            if (d[e].v !== 1) d[e].v = d[e].v - Math.floor(d[e].v)
         }
   },
   triangulateQuads: function (a)
   {
      var b, c, d, e, f = [],
         g = [],
         h = [];
      b = 0;
      for (c = a.faceUvs.length; b < c; b++) g[b] = [];
      b = 0;
      for (c = a.faceVertexUvs.length; b <
         c; b++) h[b] = [];
      b = 0;
      for (c = a.faces.length; b < c; b++)
      {
         d = a.faces[b];
         if (d instanceof THREE.Face4)
         {
            e = d.a;
            var i = d.b,
               j = d.c,
               l = d.d,
               m = new THREE.Face3,
               n = new THREE.Face3;
            m.color.copy(d.color);
            n.color.copy(d.color);
            m.materialIndex = d.materialIndex;
            n.materialIndex = d.materialIndex;
            m.a = e;
            m.b = i;
            m.c = l;
            n.a = i;
            n.b = j;
            n.c = l;
            if (d.vertexColors.length === 4)
            {
               m.vertexColors[0] = d.vertexColors[0].clone();
               m.vertexColors[1] = d.vertexColors[1].clone();
               m.vertexColors[2] = d.vertexColors[3].clone();
               n.vertexColors[0] = d.vertexColors[1].clone();
               n.vertexColors[1] = d.vertexColors[2].clone();
               n.vertexColors[2] = d.vertexColors[3].clone()
            }
            f.push(m, n);
            d = 0;
            for (e = a.faceVertexUvs.length; d < e; d++)
               if (a.faceVertexUvs[d].length)
               {
                  m = a.faceVertexUvs[d][b];
                  i = m[1];
                  j = m[2];
                  l = m[3];
                  m = [m[0].clone(), i.clone(), l.clone()];
                  i = [i.clone(), j.clone(), l.clone()];
                  h[d].push(m, i)
               }
            d = 0;
            for (e = a.faceUvs.length; d < e; d++)
               if (a.faceUvs[d].length)
               {
                  i = a.faceUvs[d][b];
                  g[d].push(i, i)
               }
         }
         else
         {
            f.push(d);
            d = 0;
            for (e = a.faceUvs.length; d < e; d++) g[d].push(a.faceUvs[d]);
            d = 0;
            for (e = a.faceVertexUvs.length; d <
               e; d++) h[d].push(a.faceVertexUvs[d])
         }
      }
      a.faces = f;
      a.faceUvs = g;
      a.faceVertexUvs = h;
      a.computeCentroids();
      a.computeFaceNormals();
      a.computeVertexNormals();
      a.hasTangents && a.computeTangents()
   },
   explode: function (a)
   {
      for (var b = [], c = 0, d = a.faces.length; c < d; c++)
      {
         var e = b.length,
            f = a.faces[c];
         if (f instanceof THREE.Face4)
         {
            var g = f.a,
               h = f.b,
               i = f.c,
               g = a.vertices[g],
               h = a.vertices[h],
               i = a.vertices[i],
               j = a.vertices[f.d];
            b.push(g.clone());
            b.push(h.clone());
            b.push(i.clone());
            b.push(j.clone());
            f.a = e;
            f.b = e + 1;
            f.c = e + 2;
            f.d = e + 3
         }
         else
         {
            g = f.a;
            h = f.b;
            i = f.c;
            g = a.vertices[g];
            h = a.vertices[h];
            i = a.vertices[i];
            b.push(g.clone());
            b.push(h.clone());
            b.push(i.clone());
            f.a = e;
            f.b = e + 1;
            f.c = e + 2
         }
      }
      a.vertices = b;
      delete a.__tmpVertices
   },
   tessellate: function (a, b)
   {
      var c, d, e, f, g, h, i, j, l, m, n, p, r, o, q, s, w, t, v, x = [],
         C = [];
      c = 0;
      for (d = a.faceVertexUvs.length; c < d; c++) C[c] = [];
      c = 0;
      for (d = a.faces.length; c < d; c++)
      {
         e = a.faces[c];
         if (e instanceof THREE.Face3)
         {
            f = e.a;
            g = e.b;
            h = e.c;
            j = a.vertices[f];
            l = a.vertices[g];
            m = a.vertices[h];
            p = j.distanceTo(l);
            r = l.distanceTo(m);
            n = j.distanceTo(m);
            if (p >
               b || r > b || n > b)
            {
               i = a.vertices.length;
               t = e.clone();
               v = e.clone();
               if (p >= r && p >= n)
               {
                  j = j.clone();
                  j.lerpSelf(l, 0.5);
                  t.a = f;
                  t.b = i;
                  t.c = h;
                  v.a = i;
                  v.b = g;
                  v.c = h;
                  if (e.vertexNormals.length === 3)
                  {
                     f = e.vertexNormals[0].clone();
                     f.lerpSelf(e.vertexNormals[1], 0.5);
                     t.vertexNormals[1].copy(f);
                     v.vertexNormals[0].copy(f)
                  }
                  if (e.vertexColors.length === 3)
                  {
                     f = e.vertexColors[0].clone();
                     f.lerpSelf(e.vertexColors[1], 0.5);
                     t.vertexColors[1].copy(f);
                     v.vertexColors[0].copy(f)
                  }
                  e = 0
               }
               else if (r >= p && r >= n)
               {
                  j = l.clone();
                  j.lerpSelf(m, 0.5);
                  t.a = f;
                  t.b = g;
                  t.c =
                     i;
                  v.a = i;
                  v.b = h;
                  v.c = f;
                  if (e.vertexNormals.length === 3)
                  {
                     f = e.vertexNormals[1].clone();
                     f.lerpSelf(e.vertexNormals[2], 0.5);
                     t.vertexNormals[2].copy(f);
                     v.vertexNormals[0].copy(f);
                     v.vertexNormals[1].copy(e.vertexNormals[2]);
                     v.vertexNormals[2].copy(e.vertexNormals[0])
                  }
                  if (e.vertexColors.length === 3)
                  {
                     f = e.vertexColors[1].clone();
                     f.lerpSelf(e.vertexColors[2], 0.5);
                     t.vertexColors[2].copy(f);
                     v.vertexColors[0].copy(f);
                     v.vertexColors[1].copy(e.vertexColors[2]);
                     v.vertexColors[2].copy(e.vertexColors[0])
                  }
                  e = 1
               }
               else
               {
                  j = j.clone();
                  j.lerpSelf(m, 0.5);
                  t.a = f;
                  t.b = g;
                  t.c = i;
                  v.a = i;
                  v.b = g;
                  v.c = h;
                  if (e.vertexNormals.length === 3)
                  {
                     f = e.vertexNormals[0].clone();
                     f.lerpSelf(e.vertexNormals[2], 0.5);
                     t.vertexNormals[2].copy(f);
                     v.vertexNormals[0].copy(f)
                  }
                  if (e.vertexColors.length === 3)
                  {
                     f = e.vertexColors[0].clone();
                     f.lerpSelf(e.vertexColors[2], 0.5);
                     t.vertexColors[2].copy(f);
                     v.vertexColors[0].copy(f)
                  }
                  e = 2
               }
               x.push(t, v);
               a.vertices.push(j);
               f = 0;
               for (g = a.faceVertexUvs.length; f < g; f++)
                  if (a.faceVertexUvs[f].length)
                  {
                     j = a.faceVertexUvs[f][c];
                     v = j[0];
                     h = j[1];
                     t = j[2];
                     if (e ===
                        0)
                     {
                        l = v.clone();
                        l.lerpSelf(h, 0.5);
                        j = [v.clone(), l.clone(), t.clone()];
                        h = [l.clone(), h.clone(), t.clone()]
                     }
                     else if (e === 1)
                     {
                        l = h.clone();
                        l.lerpSelf(t, 0.5);
                        j = [v.clone(), h.clone(), l.clone()];
                        h = [l.clone(), t.clone(), v.clone()]
                     }
                     else
                     {
                        l = v.clone();
                        l.lerpSelf(t, 0.5);
                        j = [v.clone(), h.clone(), l.clone()];
                        h = [l.clone(), h.clone(), t.clone()]
                     }
                     C[f].push(j, h)
                  }
            }
            else
            {
               x.push(e);
               f = 0;
               for (g = a.faceVertexUvs.length; f < g; f++) C[f].push(a.faceVertexUvs[
                  f][c])
            }
         }
         else
         {
            f = e.a;
            g = e.b;
            h = e.c;
            i = e.d;
            j = a.vertices[f];
            l = a.vertices[g];
            m = a.vertices[h];
            n =
               a.vertices[i];
            p = j.distanceTo(l);
            r = l.distanceTo(m);
            o = m.distanceTo(n);
            q = j.distanceTo(n);
            if (p > b || r > b || o > b || q > b)
            {
               s = a.vertices.length;
               w = a.vertices.length + 1;
               t = e.clone();
               v = e.clone();
               if (p >= r && p >= o && p >= q || o >= r && o >= p && o >= q)
               {
                  p = j.clone();
                  p.lerpSelf(l, 0.5);
                  l = m.clone();
                  l.lerpSelf(n, 0.5);
                  t.a = f;
                  t.b = s;
                  t.c = w;
                  t.d = i;
                  v.a = s;
                  v.b = g;
                  v.c = h;
                  v.d = w;
                  if (e.vertexNormals.length === 4)
                  {
                     f = e.vertexNormals[0].clone();
                     f.lerpSelf(e.vertexNormals[1], 0.5);
                     g = e.vertexNormals[2].clone();
                     g.lerpSelf(e.vertexNormals[3], 0.5);
                     t.vertexNormals[1].copy(f);
                     t.vertexNormals[2].copy(g);
                     v.vertexNormals[0].copy(f);
                     v.vertexNormals[3].copy(g)
                  }
                  if (e.vertexColors.length === 4)
                  {
                     f = e.vertexColors[0].clone();
                     f.lerpSelf(e.vertexColors[1], 0.5);
                     g = e.vertexColors[2].clone();
                     g.lerpSelf(e.vertexColors[3], 0.5);
                     t.vertexColors[1].copy(f);
                     t.vertexColors[2].copy(g);
                     v.vertexColors[0].copy(f);
                     v.vertexColors[3].copy(g)
                  }
                  e = 0
               }
               else
               {
                  p = l.clone();
                  p.lerpSelf(m, 0.5);
                  l = n.clone();
                  l.lerpSelf(j, 0.5);
                  t.a = f;
                  t.b = g;
                  t.c = s;
                  t.d = w;
                  v.a = w;
                  v.b = s;
                  v.c = h;
                  v.d = i;
                  if (e.vertexNormals.length === 4)
                  {
                     f = e.vertexNormals[1].clone();
                     f.lerpSelf(e.vertexNormals[2], 0.5);
                     g = e.vertexNormals[3].clone();
                     g.lerpSelf(e.vertexNormals[0], 0.5);
                     t.vertexNormals[2].copy(f);
                     t.vertexNormals[3].copy(g);
                     v.vertexNormals[0].copy(g);
                     v.vertexNormals[1].copy(f)
                  }
                  if (e.vertexColors.length === 4)
                  {
                     f = e.vertexColors[1].clone();
                     f.lerpSelf(e.vertexColors[2], 0.5);
                     g = e.vertexColors[3].clone();
                     g.lerpSelf(e.vertexColors[0], 0.5);
                     t.vertexColors[2].copy(f);
                     t.vertexColors[3].copy(g);
                     v.vertexColors[0].copy(g);
                     v.vertexColors[1].copy(f)
                  }
                  e = 1
               }
               x.push(t, v);
               a.vertices.push(p, l);
               f = 0;
               for (g = a.faceVertexUvs.length; f < g; f++)
                  if (a.faceVertexUvs[f].length)
                  {
                     j = a.faceVertexUvs[f][c];
                     v = j[0];
                     h = j[1];
                     t = j[2];
                     j = j[3];
                     if (e === 0)
                     {
                        l = v.clone();
                        l.lerpSelf(h, 0.5);
                        m = t.clone();
                        m.lerpSelf(j, 0.5);
                        v = [v.clone(), l.clone(), m.clone(), j.clone()];
                        h = [l.clone(), h.clone(), t.clone(), m.clone()]
                     }
                     else
                     {
                        l = h.clone();
                        l.lerpSelf(t, 0.5);
                        m = j.clone();
                        m.lerpSelf(v, 0.5);
                        v = [v.clone(), h.clone(), l.clone(), m.clone()];
                        h = [m.clone(), l.clone(), t.clone(), j.clone()]
                     }
                     C[f].push(v, h)
                  }
            }
            else
            {
               x.push(e);
               f = 0;
               for (g = a.faceVertexUvs.length; f < g; f++) C[f].push(a.faceVertexUvs[
                  f][c])
            }
         }
      }
      a.faces =
         x;
      a.faceVertexUvs = C
   }
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3;
THREE.ImageUtils = {
   crossOrigin: "anonymous",
   loadTexture: function (a, b, c, d)
   {
      var e = new THREE.Texture(void 0, b),
         b = new THREE.ImageLoader;
      b.addEventListener("load", function (a)
      {
         e.image = a.content;
         e.needsUpdate = true;
         c && c(e)
      });
      b.addEventListener("error", function (a)
      {
         d && d(a.message)
      });
      b.crossOrigin = this.crossOrigin;
      b.load(a);
      return e
   },
   loadTextureCube: function (a, b, c)
   {
      var d, e = [],
         f = new THREE.Texture(e, b);
      f.flipY = false;
      b = e.loadCount = 0;
      for (d = a.length; b < d; ++b)
      {
         e[b] = new Image;
         e[b].onload = function ()
         {
            e.loadCount = e.loadCount +
               1;
            if (e.loadCount === 6)
            {
               f.needsUpdate = true;
               c && c()
            }
         };
         e[b].crossOrigin = this.crossOrigin;
         e[b].src = a[b]
      }
      return f
   },
   getNormalMap: function (a, b)
   {
      var c = function (a)
      {
         var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
         return [a[0] / b, a[1] / b, a[2] / b]
      }, b = b | 1,
         d = a.width,
         e = a.height,
         f = document.createElement("canvas");
      f.width = d;
      f.height = e;
      var g = f.getContext("2d");
      g.drawImage(a, 0, 0);
      for (var h = g.getImageData(0, 0, d, e).data, i = g.createImageData(d, e),
            j = i.data, l = 0; l < d; l++)
         for (var m = 0; m < e; m++)
         {
            var n = m - 1 < 0 ? 0 : m - 1,
               p = m + 1 > e - 1 ? e - 1 : m + 1,
               r =
                  l - 1 < 0 ? 0 : l - 1,
               o = l + 1 > d - 1 ? d - 1 : l + 1,
               q = [],
               s = [0, 0, h[(m * d + l) * 4] / 255 * b];
            q.push([-1, 0, h[(m * d + r) * 4] / 255 * b]);
            q.push([-1, -1, h[(n * d + r) * 4] / 255 * b]);
            q.push([0, -1, h[(n * d + l) * 4] / 255 * b]);
            q.push([1, -1, h[(n * d + o) * 4] / 255 * b]);
            q.push([1, 0, h[(m * d + o) * 4] / 255 * b]);
            q.push([1, 1, h[(p * d + o) * 4] / 255 * b]);
            q.push([0, 1, h[(p * d + l) * 4] / 255 * b]);
            q.push([-1, 1, h[(p * d + r) * 4] / 255 * b]);
            n = [];
            r = q.length;
            for (p = 0; p < r; p++)
            {
               var o = q[p],
                  w = q[(p + 1) % r],
                  o = [o[0] - s[0], o[1] - s[1], o[2] - s[2]],
                  w = [w[0] - s[0], w[1] - s[1], w[2] - s[2]];
               n.push(c([o[1] * w[2] - o[2] * w[1], o[2] * w[0] - o[0] *
                  w[2], o[0] * w[1] - o[1] * w[0]
               ]))
            }
            q = [0, 0, 0];
            for (p = 0; p < n.length; p++)
            {
               q[0] = q[0] + n[p][0];
               q[1] = q[1] + n[p][1];
               q[2] = q[2] + n[p][2]
            }
            q[0] = q[0] / n.length;
            q[1] = q[1] / n.length;
            q[2] = q[2] / n.length;
            s = (m * d + l) * 4;
            j[s] = (q[0] + 1) / 2 * 255 | 0;
            j[s + 1] = (q[1] + 1) / 2 * 255 | 0;
            j[s + 2] = q[2] * 255 | 0;
            j[s + 3] = 255
         }
      g.putImageData(i, 0, 0);
      return f
   },
   generateDataTexture: function (a, b, c)
   {
      for (var d = a * b, e = new Uint8Array(3 * d), f = Math.floor(c.r * 255),
            g = Math.floor(c.g * 255), c = Math.floor(c.b * 255), h = 0; h < d; h++
      )
      {
         e[h * 3] = f;
         e[h * 3 + 1] = g;
         e[h * 3 + 2] = c
      }
      a = new THREE.DataTexture(e, a,
         b, THREE.RGBFormat);
      a.needsUpdate = true;
      return a
   }
};
THREE.SceneUtils = {
   showHierarchy: function (a, b)
   {
      THREE.SceneUtils.traverseHierarchy(a, function (a)
      {
         a.visible = b
      })
   },
   traverseHierarchy: function (a, b)
   {
      var c, d, e = a.children.length;
      for (d = 0; d < e; d++)
      {
         c = a.children[d];
         b(c);
         THREE.SceneUtils.traverseHierarchy(c, b)
      }
   },
   createMultiMaterialObject: function (a, b)
   {
      var c, d = b.length,
         e = new THREE.Object3D;
      for (c = 0; c < d; c++)
      {
         var f = new THREE.Mesh(a, b[c]);
         e.add(f)
      }
      return e
   },
   cloneObject: function (a)
   {
      var b;
      if (a instanceof THREE.MorphAnimMesh)
      {
         b = new THREE.MorphAnimMesh(a.geometry, a.material);
         b.duration = a.duration;
         b.mirroredLoop = a.mirroredLoop;
         b.time = a.time;
         b.lastKeyframe = a.lastKeyframe;
         b.currentKeyframe = a.currentKeyframe;
         b.direction = a.direction;
         b.directionBackwards = a.directionBackwards
      }
      else if (a instanceof THREE.SkinnedMesh) b = new THREE.SkinnedMesh(a.geometry,
         a.material);
      else if (a instanceof THREE.Mesh) b = new THREE.Mesh(a.geometry, a.material);
      else if (a instanceof THREE.Line) b = new THREE.Line(a.geometry, a.material,
         a.type);
      else if (a instanceof THREE.Ribbon) b = new THREE.Ribbon(a.geometry, a.material);
      else if (a instanceof THREE.ParticleSystem)
      {
         b = new THREE.ParticleSystem(a.geometry, a.material);
         b.sortParticles = a.sortParticles
      }
      else if (a instanceof THREE.Particle) b = new THREE.Particle(a.material);
      else if (a instanceof THREE.Sprite)
      {
         b = new THREE.Sprite(
         {});
         b.color.copy(a.color);
         b.map = a.map;
         b.blending = a.blending;
         b.useScreenCoordinates = a.useScreenCoordinates;
         b.mergeWith3D = a.mergeWith3D;
         b.affectedByDistance = a.affectedByDistance;
         b.scaleByViewport = a.scaleByViewport;
         b.alignment = a.alignment;
         b.rotation3d.copy(a.rotation3d);
         b.rotation = a.rotation;
         b.opacity = a.opacity;
         b.uvOffset.copy(a.uvOffset);
         b.uvScale.copy(a.uvScale)
      }
      else a instanceof THREE.LOD ? b = new THREE.LOD : a instanceof THREE.Object3D &&
         (b = new THREE.Object3D);
      b.name = a.name;
      b.parent = a.parent;
      b.up.copy(a.up);
      b.position.copy(a.position);
      b.rotation instanceof THREE.Vector3 && b.rotation.copy(a.rotation);
      b.eulerOrder = a.eulerOrder;
      b.scale.copy(a.scale);
      b.dynamic = a.dynamic;
      b.doubleSided = a.doubleSided;
      b.flipSided = a.flipSided;
      b.renderDepth = a.renderDepth;
      b.rotationAutoUpdate =
         a.rotationAutoUpdate;
      b.matrix.copy(a.matrix);
      b.matrixWorld.copy(a.matrixWorld);
      b.matrixRotationWorld.copy(a.matrixRotationWorld);
      b.matrixAutoUpdate = a.matrixAutoUpdate;
      b.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
      b.quaternion.copy(a.quaternion);
      b.useQuaternion = a.useQuaternion;
      b.boundRadius = a.boundRadius;
      b.boundRadiusScale = a.boundRadiusScale;
      b.visible = a.visible;
      b.castShadow = a.castShadow;
      b.receiveShadow = a.receiveShadow;
      b.frustumCulled = a.frustumCulled;
      for (var c = 0; c < a.children.length; c++)
      {
         var d = THREE.SceneUtils.cloneObject(a.children[c]);
         b.children[c] = d;
         d.parent = b
      }
      if (a instanceof THREE.LOD)
         for (c = 0; c < a.LODs.length; c++) b.LODs[c] = {
            visibleAtDistance: a.LODs[c].visibleAtDistance,
            object3D: b.children[c]
         };
      return b
   },
   detach: function (a, b, c)
   {
      a.applyMatrix(b.matrixWorld);
      b.remove(a);
      c.add(a)
   },
   attach: function (a, b, c)
   {
      var d = new THREE.Matrix4;
      d.getInverse(c.matrixWorld);
      a.applyMatrix(d);
      b.remove(a);
      c.add(a)
   }
};
THREE.WebGLRenderer && (THREE.ShaderUtils = {
   lib:
   {
      fresnel:
      {
         uniforms:
         {
            mRefractionRatio:
            {
               type: "f",
               value: 1.02
            },
            mFresnelBias:
            {
               type: "f",
               value: 0.1
            },
            mFresnelPower:
            {
               type: "f",
               value: 2
            },
            mFresnelScale:
            {
               type: "f",
               value: 1
            },
            tCube:
            {
               type: "t",
               value: 1,
               texture: null
            }
         },
         fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
         vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
      },
      normal:
      {
         uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib
            .lights, THREE.UniformsLib.shadowmap,
            {
               enableAO:
               {
                  type: "i",
                  value: 0
               },
               enableDiffuse:
               {
                  type: "i",
                  value: 0
               },
               enableSpecular:
               {
                  type: "i",
                  value: 0
               },
               enableReflection:
               {
                  type: "i",
                  value: 0
               },
               enableDisplacement:
               {
                  type: "i",
                  value: 0
               },
               tDiffuse:
               {
                  type: "t",
                  value: 0,
                  texture: null
               },
               tCube:
               {
                  type: "t",
                  value: 1,
                  texture: null
               },
               tNormal:
               {
                  type: "t",
                  value: 2,
                  texture: null
               },
               tSpecular:
               {
                  type: "t",
                  value: 3,
                  texture: null
               },
               tAO:
               {
                  type: "t",
                  value: 4,
                  texture: null
               },
               tDisplacement:
               {
                  type: "t",
                  value: 5,
                  texture: null
               },
               uNormalScale:
               {
                  type: "f",
                  value: 1
               },
               uDisplacementBias:
               {
                  type: "f",
                  value: 0
               },
               uDisplacementScale:
               {
                  type: "f",
                  value: 1
               },
               uDiffuseColor:
               {
                  type: "c",
                  value: new THREE.Color(16777215)
               },
               uSpecularColor:
               {
                  type: "c",
                  value: new THREE.Color(1118481)
               },
               uAmbientColor:
               {
                  type: "c",
                  value: new THREE.Color(16777215)
               },
               uShininess:
               {
                  type: "f",
                  value: 30
               },
               uOpacity:
               {
                  type: "f",
                  value: 1
               },
               uReflectivity:
               {
                  type: "f",
                  value: 0.5
               },
               uOffset:
               {
                  type: "v2",
                  value: new THREE.Vector2(0, 0)
               },
               uRepeat:
               {
                  type: "v2",
                  value: new THREE.Vector2(1, 1)
               },
               wrapRGB:
               {
                  type: "v3",
                  value: new THREE.Vector3(1, 1, 1)
               }
            }
         ]),
         fragmentShader: [
            "uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;",
            THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment,
            "void main() {\nvec3 vViewPosition = cameraPosition - vWorldPosition;\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;\nif ( enableReflection ) {\nvec3 vReflect = reflect( normalize( vWorldPosition ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
            THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment,
            THREE.ShaderChunk.fog_fragment, "}"
         ].join("\n"),
         vertexShader: [
            "attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;",
            THREE.ShaderChunk.shadowmap_pars_vertex,
            "void main() {\nvNormal = normalMatrix * normal;\nvTangent = normalMatrix * tangent.xyz;\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\ndisplacedPosition = position;\n}\n#else\ndisplacedPosition = position;\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 wPosition = objectMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = wPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * wPosition;\n}\n#endif\n}"
         ].join("\n")
      },
      cube:
      {
         uniforms:
         {
            tCube:
            {
               type: "t",
               value: 1,
               texture: null
            },
            tFlip:
            {
               type: "f",
               value: -1
            }
         },
         vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
         fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"
      }
   }
});
THREE.FontUtils = {
   faces:
   {},
   face: "helvetiker",
   weight: "normal",
   style: "normal",
   size: 150,
   divisions: 10,
   getFace: function ()
   {
      return this.faces[this.face][this.weight][this.style]
   },
   loadFace: function (a)
   {
      var b = a.familyName.toLowerCase();
      this.faces[b] = this.faces[b] ||
      {};
      this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] ||
      {};
      this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
      return this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
   },
   drawText: function (a)
   {
      for (var b = this.getFace(), c = this.size / b.resolution, d =
            0, e = ("" + a).split(""), f = e.length, g = [], a = 0; a < f; a++)
      {
         var h = new THREE.Path,
            h = this.extractGlyphPoints(e[a], b, c, d, h),
            d = d + h.offset;
         g.push(h.path)
      }
      return {
         paths: g,
         offset: d / 2
      }
   },
   extractGlyphPoints: function (a, b, c, d, e)
   {
      var f = [],
         g, h, i, j, l, m, n, p, r, o, q, s = b.glyphs[a] || b.glyphs["?"];
      if (s)
      {
         if (s.o)
         {
            b = s._cachedOutline || (s._cachedOutline = s.o.split(" "));
            j = b.length;
            for (a = 0; a < j;)
            {
               i = b[a++];
               switch (i)
               {
               case "m":
                  i = b[a++] * c + d;
                  l = b[a++] * c;
                  e.moveTo(i, l);
                  break;
               case "l":
                  i = b[a++] * c + d;
                  l = b[a++] * c;
                  e.lineTo(i, l);
                  break;
               case "q":
                  i = b[a++] *
                     c + d;
                  l = b[a++] * c;
                  p = b[a++] * c + d;
                  r = b[a++] * c;
                  e.quadraticCurveTo(p, r, i, l);
                  if (g = f[f.length - 1])
                  {
                     m = g.x;
                     n = g.y;
                     g = 1;
                     for (h = this.divisions; g <= h; g++)
                     {
                        var w = g / h;
                        THREE.Shape.Utils.b2(w, m, p, i);
                        THREE.Shape.Utils.b2(w, n, r, l)
                     }
                  }
                  break;
               case "b":
                  i = b[a++] * c + d;
                  l = b[a++] * c;
                  p = b[a++] * c + d;
                  r = b[a++] * -c;
                  o = b[a++] * c + d;
                  q = b[a++] * -c;
                  e.bezierCurveTo(i, l, p, r, o, q);
                  if (g = f[f.length - 1])
                  {
                     m = g.x;
                     n = g.y;
                     g = 1;
                     for (h = this.divisions; g <= h; g++)
                     {
                        w = g / h;
                        THREE.Shape.Utils.b3(w, m, p, o, i);
                        THREE.Shape.Utils.b3(w, n, r, q, l)
                     }
                  }
               }
            }
         }
         return {
            offset: s.ha * c,
            path: e
         }
      }
   }
};
THREE.FontUtils.generateShapes = function (a, b)
{
   var b = b ||
   {}, c = b.curveSegments !== void 0 ? b.curveSegments : 4,
      d = b.font !== void 0 ? b.font : "helvetiker",
      e = b.weight !== void 0 ? b.weight : "normal",
      f = b.style !== void 0 ? b.style : "normal";
   THREE.FontUtils.size = b.size !== void 0 ? b.size : 100;
   THREE.FontUtils.divisions = c;
   THREE.FontUtils.face = d;
   THREE.FontUtils.weight = e;
   THREE.FontUtils.style = f;
   c = THREE.FontUtils.drawText(a).paths;
   d = [];
   e = 0;
   for (f = c.length; e < f; e++) Array.prototype.push.apply(d, c[e].toShapes());
   return d
};
(function (a)
{
   var b = function (a)
   {
      for (var b = a.length, e = 0, f = b - 1, g = 0; g < b; f = g++) e = e +
         (a[f].x * a[g].y - a[g].x * a[f].y);
      return e * 0.5
   };
   a.Triangulate = function (a, d)
   {
      var e = a.length;
      if (e < 3) return null;
      var f = [],
         g = [],
         h = [],
         i, j, l;
      if (b(a) > 0)
         for (j = 0; j < e; j++) g[j] = j;
      else
         for (j = 0; j < e; j++) g[j] = e - 1 - j;
      var m = 2 * e;
      for (j = e - 1; e > 2;)
      {
         if (m-- <= 0)
         {
            console.log("Warning, unable to triangulate polygon!");
            break
         }
         i = j;
         e <= i && (i = 0);
         j = i + 1;
         e <= j && (j = 0);
         l = j + 1;
         e <= l && (l = 0);
         var n;
         a:
         {
            n = a;
            var p = i,
               r = j,
               o = l,
               q = e,
               s = g,
               w = void 0,
               t = void 0,
               v = void 0,
               x = void 0,
               C = void 0,
               D = void 0,
               z = void 0,
               u = void 0,
               G = void 0,
               t = n[s[p]].x,
               v = n[s[p]].y,
               x = n[s[r]].x,
               C = n[s[r]].y,
               D = n[s[o]].x,
               z = n[s[o]].y;
            if (1.0E-10 > (x - t) * (z - v) - (C - v) * (D - t)) n = false;
            else
            {
               for (w = 0; w < q; w++)
                  if (!(w == p || w == r || w == o))
                  {
                     var u = n[s[w]].x,
                        G = n[s[w]].y,
                        J = void 0,
                        M = void 0,
                        O = void 0,
                        X = void 0,
                        B = void 0,
                        F = void 0,
                        Q = void 0,
                        E = void 0,
                        aa = void 0,
                        T = void 0,
                        N = void 0,
                        W = void 0,
                        J = O = B = void 0,
                        J = D - x,
                        M = z - C,
                        O = t - D,
                        X = v - z,
                        B = x - t,
                        F = C - v,
                        Q = u - t,
                        E = G - v,
                        aa = u - x,
                        T = G - C,
                        N = u - D,
                        W = G - z,
                        J = J * T - M * aa,
                        B = B * E - F * Q,
                        O = O * W - X * N;
                     if (J >= 0 && O >= 0 && B >= 0)
                     {
                        n = false;
                        break a
                     }
                  }
               n = true
            }
         }
         if (n)
         {
            f.push([a[g[i]],
               a[g[j]], a[g[l]]
            ]);
            h.push([g[i], g[j], g[l]]);
            i = j;
            for (l = j + 1; l < e; i++, l++) g[i] = g[l];
            e--;
            m = 2 * e
         }
      }
      return d ? h : f
   };
   a.Triangulate.area = b;
   return a
})(THREE.FontUtils);
self._typeface_js = {
   faces: THREE.FontUtils.faces,
   loadFace: THREE.FontUtils.loadFace
};
THREE.BufferGeometry = function ()
{
   this.id = THREE.GeometryCount++;
   this.attributes = {};
   this.dynamic = false;
   this.boundingSphere = this.boundingBox = null;
   this.hasTangents = false;
   this.morphTargets = []
};
THREE.BufferGeometry.prototype = {
   constructor: THREE.BufferGeometry,
   applyMatrix: function (a)
   {
      var b, c;
      if (this.attributes.position) b = this.attributes.position.array;
      if (this.attributes.normal) c = this.attributes.normal.array;
      if (b !== void 0)
      {
         a.multiplyVector3Array(b);
         this.verticesNeedUpdate = true
      }
      if (c !== void 0)
      {
         b = new THREE.Matrix4;
         b.extractRotation(a);
         b.multiplyVector3Array(c);
         this.normalsNeedUpdate = true
      }
   },
   computeBoundingBox: function ()
   {
      if (!this.boundingBox) this.boundingBox = {
         min: new THREE.Vector3(Infinity, Infinity,
            Infinity),
         max: new THREE.Vector3(-Infinity, -Infinity, -Infinity)
      };
      var a = this.attributes.position.array;
      if (a)
         for (var b = this.boundingBox, c, d, e, f = 0, g = a.length; f < g; f =
            f + 3)
         {
            c = a[f];
            d = a[f + 1];
            e = a[f + 2];
            if (c < b.min.x) b.min.x = c;
            else if (c > b.max.x) b.max.x = c;
            if (d < b.min.y) b.min.y = d;
            else if (d > b.max.y) b.max.y = d;
            if (e < b.min.z) b.min.z = e;
            else if (e > b.max.z) b.max.z = e
         }
      if (a === void 0 || a.length === 0)
      {
         this.boundingBox.min.set(0, 0, 0);
         this.boundingBox.max.set(0, 0, 0)
      }
   },
   computeBoundingSphere: function ()
   {
      if (!this.boundingSphere) this.boundingSphere = {
         radius: 0
      };
      var a = this.attributes.position.array;
      if (a)
      {
         for (var b, c = 0, d, e, f = 0, g = a.length; f < g; f = f + 3)
         {
            b = a[f];
            d = a[f + 1];
            e = a[f + 2];
            b = Math.sqrt(b * b + d * d + e * e);
            b > c && (c = b)
         }
         this.boundingSphere.radius = c
      }
   },
   computeVertexNormals: function ()
   {
      if (this.attributes.position && this.attributes.index)
      {
         var a, b, c, d;
         a = this.attributes.position.array.length;
         if (this.attributes.normal === void 0) this.attributes.normal = {
            itemSize: 3,
            array: new Float32Array(a),
            numItems: a
         };
         else
         {
            a = 0;
            for (b = this.attributes.normal.array.length; a < b; a++) this.attributes
               .normal.array[a] =
               0
         }
         var e = this.offsets,
            f = this.attributes.index.array,
            g = this.attributes.position.array,
            h = this.attributes.normal.array,
            i, j, l, m, n, p, r = new THREE.Vector3,
            o = new THREE.Vector3,
            q = new THREE.Vector3,
            s = new THREE.Vector3,
            w = new THREE.Vector3;
         c = 0;
         for (d = e.length; c < d; ++c)
         {
            b = e[c].start;
            i = e[c].count;
            var t = e[c].index;
            a = b;
            for (b = b + i; a < b; a = a + 3)
            {
               i = t + f[a];
               j = t + f[a + 1];
               l = t + f[a + 2];
               m = g[i * 3];
               n = g[i * 3 + 1];
               p = g[i * 3 + 2];
               r.set(m, n, p);
               m = g[j * 3];
               n = g[j * 3 + 1];
               p = g[j * 3 + 2];
               o.set(m, n, p);
               m = g[l * 3];
               n = g[l * 3 + 1];
               p = g[l * 3 + 2];
               q.set(m, n, p);
               s.sub(q, o);
               w.sub(r,
                  o);
               s.crossSelf(w);
               h[i * 3] = h[i * 3] + s.x;
               h[i * 3 + 1] = h[i * 3 + 1] + s.y;
               h[i * 3 + 2] = h[i * 3 + 2] + s.z;
               h[j * 3] = h[j * 3] + s.x;
               h[j * 3 + 1] = h[j * 3 + 1] + s.y;
               h[j * 3 + 2] = h[j * 3 + 2] + s.z;
               h[l * 3] = h[l * 3] + s.x;
               h[l * 3 + 1] = h[l * 3 + 1] + s.y;
               h[l * 3 + 2] = h[l * 3 + 2] + s.z
            }
         }
         a = 0;
         for (b = h.length; a < b; a = a + 3)
         {
            m = h[a];
            n = h[a + 1];
            p = h[a + 2];
            c = 1 / Math.sqrt(m * m + n * n + p * p);
            h[a] = h[a] * c;
            h[a + 1] = h[a + 1] * c;
            h[a + 2] = h[a + 2] * c
         }
         this.normalsNeedUpdate = true
      }
   },
   computeTangents: function ()
   {
      function a(a, b, c)
      {
         m = d[a * 3];
         n = d[a * 3 + 1];
         p = d[a * 3 + 2];
         r = d[b * 3];
         o = d[b * 3 + 1];
         q = d[b * 3 + 2];
         s = d[c * 3];
         w = d[c * 3 + 1];
         t = d[c * 3 + 2];
         v =
            f[a * 2];
         x = f[a * 2 + 1];
         C = f[b * 2];
         D = f[b * 2 + 1];
         z = f[c * 2];
         u = f[c * 2 + 1];
         G = r - m;
         J = s - m;
         M = o - n;
         O = w - n;
         X = q - p;
         B = t - p;
         F = C - v;
         Q = z - v;
         E = D - x;
         aa = u - x;
         T = 1 / (F * aa - Q * E);
         N.set((aa * G - E * J) * T, (aa * M - E * O) * T, (aa * X - E * B) * T);
         W.set((F * J - Q * G) * T, (F * O - Q * M) * T, (F * B - Q * X) * T);
         j[a].addSelf(N);
         j[b].addSelf(N);
         j[c].addSelf(N);
         l[a].addSelf(W);
         l[b].addSelf(W);
         l[c].addSelf(W)
      }

      function b(a)
      {
         ma.x = e[a * 3];
         ma.y = e[a * 3 + 1];
         ma.z = e[a * 3 + 2];
         Ga.copy(ma);
         Oa = j[a];
         U.copy(Oa);
         U.subSelf(ma.multiplyScalar(ma.dot(Oa))).normalize();
         fa.cross(Ga, Oa);
         Pa = fa.dot(l[a]);
         na = Pa < 0 ? -1 : 1;
         i[a * 4] = U.x;
         i[a * 4 + 1] = U.y;
         i[a * 4 + 2] = U.z;
         i[a * 4 + 3] = na
      }
      if (this.attributes.index === void 0 || this.attributes.position === void 0 ||
         this.attributes.normal === void 0 || this.attributes.uv === void 0)
         console.warn(
            "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"
         );
      else
      {
         var c = this.attributes.index.array,
            d = this.attributes.position.array,
            e = this.attributes.normal.array,
            f = this.attributes.uv.array,
            g = d.length / 3;
         if (this.attributes.tangent === void 0)
         {
            var h = 4 * g;
            this.attributes.tangent = {
               itemSize: 4,
               array: new Float32Array(h),
               numItems: h
            }
         }
         for (var i = this.attributes.tangent.array, j = [], l = [], h = 0; h <
            g; h++)
         {
            j[h] = new THREE.Vector3;
            l[h] = new THREE.Vector3
         }
         var m, n, p, r, o, q, s, w, t, v, x, C, D, z, u, G, J, M, O, X, B, F,
               Q, E, aa, T, N = new THREE.Vector3,
            W = new THREE.Vector3,
            ba, H, ca, ia, S, R = this.offsets,
            h = 0;
         for (H = R.length; h < H; ++h)
         {
            ba = R[h].start;
            ca = R[h].count;
            var P = R[h].index,
               g = ba;
            for (ba = ba + ca; g < ba; g = g + 3)
            {
               ca = P + c[g];
               ia = P + c[g + 1];
               S = P + c[g + 2];
               a(ca, ia, S)
            }
         }
         var U = new THREE.Vector3,
            fa = new THREE.Vector3,
            ma = new THREE.Vector3,
            Ga =
               new THREE.Vector3,
            na, Oa, Pa, h = 0;
         for (H = R.length; h < H; ++h)
         {
            ba = R[h].start;
            ca = R[h].count;
            P = R[h].index;
            g = ba;
            for (ba = ba + ca; g < ba; g = g + 3)
            {
               ca = P + c[g];
               ia = P + c[g + 1];
               S = P + c[g + 2];
               b(ca);
               b(ia);
               b(S)
            }
         }
         this.tangentsNeedUpdate = this.hasTangents = true
      }
   }
};
THREE.Curve = function () {};
THREE.Curve.prototype.getPoint = function ()
{
   console.log("Warning, getPoint() not implemented!");
   return null
};
THREE.Curve.prototype.getPointAt = function (a)
{
   return this.getPoint(this.getUtoTmapping(a))
};
THREE.Curve.prototype.getPoints = function (a)
{
   a || (a = 5);
   var b, c = [];
   for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
   return c
};
THREE.Curve.prototype.getSpacedPoints = function (a)
{
   a || (a = 5);
   var b, c = [];
   for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
   return c
};
THREE.Curve.prototype.getLength = function ()
{
   var a = this.getLengths();
   return a[a.length - 1]
};
THREE.Curve.prototype.getLengths = function (a)
{
   a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
   if (this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
   this.needsUpdate = false;
   var b = [],
      c, d = this.getPoint(0),
      e, f = 0;
   b.push(0);
   for (e = 1; e <= a; e++)
   {
      c = this.getPoint(e / a);
      f = f + c.distanceTo(d);
      b.push(f);
      d = c
   }
   return this.cacheArcLengths = b
};
THREE.Curve.prototype.updateArcLengths = function ()
{
   this.needsUpdate = true;
   this.getLengths()
};
THREE.Curve.prototype.getUtoTmapping = function (a, b)
{
   var c = this.getLengths(),
      d = 0,
      e = c.length,
      f;
   f = b ? b : a * c[e - 1];
   for (var g = 0, h = e - 1, i; g <= h;)
   {
      d = Math.floor(g + (h - g) / 2);
      i = c[d] - f;
      if (i < 0) g = d + 1;
      else if (i > 0) h = d - 1;
      else
      {
         h = d;
         break
      }
   }
   d = h;
   if (c[d] == f) return d / (e - 1);
   g = c[d];
   return c = (d + (f - g) / (c[d + 1] - g)) / (e - 1)
};
THREE.Curve.prototype.getNormalVector = function (a)
{
   a = this.getTangent(a);
   return new THREE.Vector2(-a.y, a.x)
};
THREE.Curve.prototype.getTangent = function (a)
{
   var b = a - 1.0E-4,
      a = a + 1.0E-4;
   b < 0 && (b = 0);
   a > 1 && (a = 1);
   b = this.getPoint(b);
   return this.getPoint(a).clone().subSelf(b).normalize()
};
THREE.Curve.prototype.getTangentAt = function (a)
{
   return this.getTangent(this.getUtoTmapping(a))
};
THREE.LineCurve = function (a, b)
{
   this.v1 = a;
   this.v2 = b
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function (a)
{
   var b = this.v2.clone().subSelf(this.v1);
   b.multiplyScalar(a).addSelf(this.v1);
   return b
};
THREE.LineCurve.prototype.getPointAt = function (a)
{
   return this.getPoint(a)
};
THREE.LineCurve.prototype.getTangent = function ()
{
   return this.v2.clone().subSelf(this.v1).normalize()
};
THREE.QuadraticBezierCurve = function (a, b, c)
{
   this.v0 = a;
   this.v1 = b;
   this.v2 = c
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function (a)
{
   var b;
   b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
   a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
   return new THREE.Vector2(b, a)
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (a)
{
   var b;
   b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2
      .x);
   a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2
      .y);
   b = new THREE.Vector2(b, a);
   b.normalize();
   return b
};
THREE.CubicBezierCurve = function (a, b, c, d)
{
   this.v0 = a;
   this.v1 = b;
   this.v2 = c;
   this.v3 = d
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function (a)
{
   var b;
   b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
   a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
   return new THREE.Vector2(b, a)
};
THREE.CubicBezierCurve.prototype.getTangent = function (a)
{
   var b;
   b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x,
      this.v3.x);
   a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y,
      this.v3.y);
   b = new THREE.Vector2(b, a);
   b.normalize();
   return b
};
THREE.SplineCurve = function (a)
{
   this.points = a == void 0 ? [] : a
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function (a)
{
   var b = new THREE.Vector2,
      c = [],
      d = this.points,
      e;
   e = (d.length - 1) * a;
   a = Math.floor(e);
   e = e - a;
   c[0] = a == 0 ? a : a - 1;
   c[1] = a;
   c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
   c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
   b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[3]]
      .x, e);
   b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[3]]
      .y, e);
   return b
};
THREE.EllipseCurve = function (a, b, c, d, e, f, g)
{
   this.aX = a;
   this.aY = b;
   this.xRadius = c;
   this.yRadius = d;
   this.aStartAngle = e;
   this.aEndAngle = f;
   this.aClockwise = g
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function (a)
{
   var b = this.aEndAngle - this.aStartAngle;
   this.aClockwise || (a = 1 - a);
   b = this.aStartAngle + a * b;
   a = this.aX + this.xRadius * Math.cos(b);
   b = this.aY + this.yRadius * Math.sin(b);
   return new THREE.Vector2(a, b)
};
THREE.ArcCurve = function (a, b, c, d, e, f)
{
   THREE.EllipseCurve.call(this, a, b, c, c, d, e, f)
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.Curve.Utils = {
   tangentQuadraticBezier: function (a, b, c, d)
   {
      return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
   },
   tangentCubicBezier: function (a, b, c, d, e)
   {
      return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c *
         (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
   },
   tangentSpline: function (a)
   {
      return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) +
         (3 * a * a - 2 * a)
   },
   interpolate: function (a, b, c, d, e)
   {
      var a = (c - a) * 0.5,
         d = (d - b) * 0.5,
         f = e * e;
      return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f +
         a * e + b
   }
};
THREE.Curve.create = function (a, b)
{
   a.prototype = Object.create(THREE.Curve.prototype);
   a.prototype.getPoint = b;
   return a
};
THREE.LineCurve3 = THREE.Curve.create(function (a, b)
{
   this.v1 = a;
   this.v2 = b
}, function (a)
{
   var b = new THREE.Vector3;
   b.sub(this.v2, this.v1);
   b.multiplyScalar(a);
   b.addSelf(this.v1);
   return b
});
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function (a, b, c)
{
   this.v0 = a;
   this.v1 = b;
   this.v2 = c
}, function (a)
{
   var b, c;
   b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
   c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
   a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
   return new THREE.Vector3(b, c, a)
});
THREE.CubicBezierCurve3 = THREE.Curve.create(function (a, b, c, d)
{
   this.v0 = a;
   this.v1 = b;
   this.v2 = c;
   this.v3 = d
}, function (a)
{
   var b, c;
   b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
   c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
   a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
   return new THREE.Vector3(b, c, a)
});
THREE.SplineCurve3 = THREE.Curve.create(function (a)
{
   this.points = a == void 0 ? [] : a
}, function (a)
{
   var b = new THREE.Vector3,
      c = [],
      d = this.points,
      e, a = (d.length - 1) * a;
   e = Math.floor(a);
   a = a - e;
   c[0] = e == 0 ? e : e - 1;
   c[1] = e;
   c[2] = e > d.length - 2 ? d.length - 1 : e + 1;
   c[3] = e > d.length - 3 ? d.length - 1 : e + 2;
   e = d[c[0]];
   var f = d[c[1]],
      g = d[c[2]],
      c = d[c[3]];
   b.x = THREE.Curve.Utils.interpolate(e.x, f.x, g.x, c.x, a);
   b.y = THREE.Curve.Utils.interpolate(e.y, f.y, g.y, c.y, a);
   b.z = THREE.Curve.Utils.interpolate(e.z, f.z, g.z, c.z, a);
   return b
});
THREE.ClosedSplineCurve3 = THREE.Curve.create(function (a)
{
   this.points = a == void 0 ? [] : a
}, function (a)
{
   var b = new THREE.Vector3,
      c = [],
      d = this.points,
      e;
   e = (d.length - 0) * a;
   a = Math.floor(e);
   e = e - a;
   a = a + (a > 0 ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length);
   c[0] = (a - 1) % d.length;
   c[1] = a % d.length;
   c[2] = (a + 1) % d.length;
   c[3] = (a + 2) % d.length;
   b.x = THREE.Curve.Utils.interpolate(d[c[0]].x, d[c[1]].x, d[c[2]].x, d[c[
      3]].x, e);
   b.y = THREE.Curve.Utils.interpolate(d[c[0]].y, d[c[1]].y, d[c[2]].y, d[c[
      3]].y, e);
   b.z = THREE.Curve.Utils.interpolate(d[c[0]].z,
      d[c[1]].z, d[c[2]].z, d[c[3]].z, e);
   return b
});
THREE.CurvePath = function ()
{
   this.curves = [];
   this.bends = [];
   this.autoClose = false
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function (a)
{
   this.curves.push(a)
};
THREE.CurvePath.prototype.checkConnection = function () {};
THREE.CurvePath.prototype.closePath = function ()
{
   var a = this.curves[0].getPoint(0),
      b = this.curves[this.curves.length - 1].getPoint(1);
   a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
};
THREE.CurvePath.prototype.getPoint = function (a)
{
   for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;)
   {
      if (c[a] >= b)
      {
         b = c[a] - b;
         a = this.curves[a];
         b = 1 - b / a.getLength();
         return a.getPointAt(b)
      }
      a++
   }
   return null
};
THREE.CurvePath.prototype.getLength = function ()
{
   var a = this.getCurveLengths();
   return a[a.length - 1]
};
THREE.CurvePath.prototype.getCurveLengths = function ()
{
   if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
      return this.cacheLengths;
   var a = [],
      b = 0,
      c, d = this.curves.length;
   for (c = 0; c < d; c++)
   {
      b = b + this.curves[c].getLength();
      a.push(b)
   }
   return this.cacheLengths = a
};
THREE.CurvePath.prototype.getBoundingBox = function ()
{
   var a = this.getPoints(),
      b, c, d, e;
   b = c = Number.NEGATIVE_INFINITY;
   d = e = Number.POSITIVE_INFINITY;
   var f, g, h, i;
   i = new THREE.Vector2;
   g = 0;
   for (h = a.length; g < h; g++)
   {
      f = a[g];
      if (f.x > b) b = f.x;
      else if (f.x < d) d = f.x;
      if (f.y > c) c = f.y;
      else if (f.y < e) e = f.y;
      i.addSelf(f.x, f.y)
   }
   return {
      minX: d,
      minY: e,
      maxX: b,
      maxY: c,
      centroid: i.divideScalar(h)
   }
};
THREE.CurvePath.prototype.createPointsGeometry = function (a)
{
   return this.createGeometry(this.getPoints(a, true))
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a)
{
   return this.createGeometry(this.getSpacedPoints(a, true))
};
THREE.CurvePath.prototype.createGeometry = function (a)
{
   for (var b = new THREE.Geometry, c = 0; c < a.length; c++) b.vertices.push(
      new THREE.Vector3(a[c].x, a[c].y, 0));
   return b
};
THREE.CurvePath.prototype.addWrapPath = function (a)
{
   this.bends.push(a)
};
THREE.CurvePath.prototype.getTransformedPoints = function (a, b)
{
   var c = this.getPoints(a),
      d, e;
   if (!b) b = this.bends;
   d = 0;
   for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
   return c
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b)
{
   var c = this.getSpacedPoints(a),
      d, e;
   if (!b) b = this.bends;
   d = 0;
   for (e = b.length; d < e; d++) c = this.getWrapPoints(c, b[d]);
   return c
};
THREE.CurvePath.prototype.getWrapPoints = function (a, b)
{
   var c = this.getBoundingBox(),
      d, e, f, g, h, i;
   d = 0;
   for (e = a.length; d < e; d++)
   {
      f = a[d];
      g = f.x;
      h = f.y;
      i = g / c.maxX;
      i = b.getUtoTmapping(i, g);
      g = b.getPoint(i);
      h = b.getNormalVector(i).multiplyScalar(h);
      f.x = g.x + h.x;
      f.y = g.y + h.y
   }
   return a
};
THREE.Gyroscope = function ()
{
   THREE.Object3D.call(this)
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function (a)
{
   this.matrixAutoUpdate && this.updateMatrix();
   if (this.matrixWorldNeedsUpdate || a)
   {
      if (this.parent)
      {
         this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix);
         this.matrixWorld.decompose(this.translationWorld, this.rotationWorld,
            this.scaleWorld);
         this.matrix.decompose(this.translationObject, this.rotationObject,
            this.scaleObject);
         this.matrixWorld.compose(this.translationWorld, this.rotationObject,
            this.scaleWorld)
      }
      else this.matrixWorld.copy(this.matrix);
      this.matrixWorldNeedsUpdate = false;
      a = true
   }
   for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(
      a)
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3;
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion;
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion;
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3;
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3;
THREE.Path = function (a)
{
   THREE.CurvePath.call(this);
   this.actions = [];
   a && this.fromPoints(a)
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
   MOVE_TO: "moveTo",
   LINE_TO: "lineTo",
   QUADRATIC_CURVE_TO: "quadraticCurveTo",
   BEZIER_CURVE_TO: "bezierCurveTo",
   CSPLINE_THRU: "splineThru",
   ARC: "arc",
   ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function (a)
{
   this.moveTo(a[0].x, a[0].y);
   for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
};
THREE.Path.prototype.moveTo = function (a, b)
{
   var c = Array.prototype.slice.call(arguments);
   this.actions.push(
   {
      action: THREE.PathActions.MOVE_TO,
      args: c
   })
};
THREE.Path.prototype.lineTo = function (a, b)
{
   var c = Array.prototype.slice.call(arguments),
      d = this.actions[this.actions.length - 1].args;
   this.curves.push(new THREE.LineCurve(new THREE.Vector2(d[d.length - 2], d[d.length -
      1]), new THREE.Vector2(a, b)));
   this.actions.push(
   {
      action: THREE.PathActions.LINE_TO,
      args: c
   })
};
THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d)
{
   var e = Array.prototype.slice.call(arguments),
      f = this.actions[this.actions.length - 1].args;
   this.curves.push(new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length -
      2], f[f.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c,
      d)));
   this.actions.push(
   {
      action: THREE.PathActions.QUADRATIC_CURVE_TO,
      args: e
   })
};
THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, e, f)
{
   var g = Array.prototype.slice.call(arguments),
      h = this.actions[this.actions.length - 1].args;
   this.curves.push(new THREE.CubicBezierCurve(new THREE.Vector2(h[h.length - 2],
         h[h.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d),
      new THREE.Vector2(e, f)));
   this.actions.push(
   {
      action: THREE.PathActions.BEZIER_CURVE_TO,
      args: g
   })
};
THREE.Path.prototype.splineThru = function (a)
{
   var b = Array.prototype.slice.call(arguments),
      c = this.actions[this.actions.length - 1].args,
      c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
   Array.prototype.push.apply(c, a);
   this.curves.push(new THREE.SplineCurve(c));
   this.actions.push(
   {
      action: THREE.PathActions.CSPLINE_THRU,
      args: b
   })
};
THREE.Path.prototype.ellipse = function (a, b, c, d, e, f, g)
{
   var h = this.actions[this.actions.length - 1];
   this.absellipse(h.x + a, h.y + b, c, d, e, f, g)
};
THREE.Path.prototype.arc = function (a, b, c, d, e, f)
{
   var g = this.actions[this.actions.length - 1];
   this.absarc(g.x + a, g.y + b, c, d, e, f)
};
THREE.Path.prototype.absellipse = function (a, b, c, d, e, f, g)
{
   var h = Array.prototype.slice.call(arguments),
      i = new THREE.EllipseCurve(a, b, c, d, e, f, g);
   this.curves.push(i);
   i = i.getPoint(g ? 1 : 0);
   h.push(i.x);
   h.push(i.y);
   this.actions.push(
   {
      action: THREE.PathActions.ELLIPSE,
      args: h
   })
};
THREE.Path.prototype.absarc = function (a, b, c, d, e, f)
{
   this.absellipse(a, b, c, c, d, e, f)
};
THREE.Path.prototype.getSpacedPoints = function (a)
{
   a || (a = 40);
   for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
   return b
};
THREE.Path.prototype.getPoints = function (a, b)
{
   if (this.useSpacedPoints)
   {
      console.log("tata");
      return this.getSpacedPoints(a, b)
   }
   var a = a || 12,
      c = [],
      d, e, f, g, h, i, j, l, m, n, p, r, o;
   d = 0;
   for (e = this.actions.length; d < e; d++)
   {
      f = this.actions[d];
      g = f.action;
      f = f.args;
      switch (g)
      {
      case THREE.PathActions.MOVE_TO:
         c.push(new THREE.Vector2(f[0], f[1]));
         break;
      case THREE.PathActions.LINE_TO:
         c.push(new THREE.Vector2(f[0], f[1]));
         break;
      case THREE.PathActions.QUADRATIC_CURVE_TO:
         h = f[2];
         i = f[3];
         m = f[0];
         n = f[1];
         if (c.length > 0)
         {
            g = c[c.length - 1];
            p = g.x;
            r = g.y
         }
         else
         {
            g = this.actions[d - 1].args;
            p = g[g.length - 2];
            r = g[g.length - 1]
         }
         for (f = 1; f <= a; f++)
         {
            o = f / a;
            g = THREE.Shape.Utils.b2(o, p, m, h);
            o = THREE.Shape.Utils.b2(o, r, n, i);
            c.push(new THREE.Vector2(g, o))
         }
         break;
      case THREE.PathActions.BEZIER_CURVE_TO:
         h = f[4];
         i = f[5];
         m = f[0];
         n = f[1];
         j = f[2];
         l = f[3];
         if (c.length > 0)
         {
            g = c[c.length - 1];
            p = g.x;
            r = g.y
         }
         else
         {
            g = this.actions[d - 1].args;
            p = g[g.length - 2];
            r = g[g.length - 1]
         }
         for (f = 1; f <= a; f++)
         {
            o = f / a;
            g = THREE.Shape.Utils.b3(o, p, m, j, h);
            o = THREE.Shape.Utils.b3(o, r, n, l, i);
            c.push(new THREE.Vector2(g,
               o))
         }
         break;
      case THREE.PathActions.CSPLINE_THRU:
         g = this.actions[d - 1].args;
         o = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
         g = a * f[0].length;
         o = o.concat(f[0]);
         o = new THREE.SplineCurve(o);
         for (f = 1; f <= g; f++) c.push(o.getPointAt(f / g));
         break;
      case THREE.PathActions.ARC:
         h = f[0];
         i = f[1];
         n = f[2];
         j = f[3];
         g = f[4];
         m = !! f[5];
         p = g - j;
         r = a * 2;
         for (f = 1; f <= r; f++)
         {
            o = f / r;
            m || (o = 1 - o);
            o = j + o * p;
            g = h + n * Math.cos(o);
            o = i + n * Math.sin(o);
            c.push(new THREE.Vector2(g, o))
         }
         break;
      case THREE.PathActions.ELLIPSE:
         h = f[0];
         i = f[1];
         n = f[2];
         l = f[3];
         j = f[4];
         g = f[5];
         m = !! f[6];
         p = g - j;
         r = a * 2;
         for (f = 1; f <= r; f++)
         {
            o = f / r;
            m || (o = 1 - o);
            o = j + o * p;
            g = h + n * Math.cos(o);
            o = i + l * Math.sin(o);
            c.push(new THREE.Vector2(g, o))
         }
      }
   }
   d = c[c.length - 1];
   Math.abs(d.x - c[0].x) < 1.0E-10 && Math.abs(d.y - c[0].y) < 1.0E-10 && c.splice(
      c.length - 1, 1);
   b && c.push(c[0]);
   return c
};
THREE.Path.prototype.toShapes = function ()
{
   var a, b, c, d, e = [],
      f = new THREE.Path;
   a = 0;
   for (b = this.actions.length; a < b; a++)
   {
      c = this.actions[a];
      d = c.args;
      c = c.action;
      if (c == THREE.PathActions.MOVE_TO && f.actions.length != 0)
      {
         e.push(f);
         f = new THREE.Path
      }
      f[c].apply(f, d)
   }
   f.actions.length != 0 && e.push(f);
   if (e.length == 0) return [];
   var g;
   d = [];
   a = !THREE.Shape.Utils.isClockWise(e[0].getPoints());
   if (e.length == 1)
   {
      f = e[0];
      g = new THREE.Shape;
      g.actions = f.actions;
      g.curves = f.curves;
      d.push(g);
      return d
   }
   if (a)
   {
      g = new THREE.Shape;
      a = 0;
      for (b = e.length; a <
         b; a++)
      {
         f = e[a];
         if (THREE.Shape.Utils.isClockWise(f.getPoints()))
         {
            g.actions = f.actions;
            g.curves = f.curves;
            d.push(g);
            g = new THREE.Shape
         }
         else g.holes.push(f)
      }
   }
   else
   {
      a = 0;
      for (b = e.length; a < b; a++)
      {
         f = e[a];
         if (THREE.Shape.Utils.isClockWise(f.getPoints()))
         {
            g && d.push(g);
            g = new THREE.Shape;
            g.actions = f.actions;
            g.curves = f.curves
         }
         else g.holes.push(f)
      }
      d.push(g)
   }
   return d
};
THREE.Shape = function ()
{
   THREE.Path.apply(this, arguments);
   this.holes = []
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function (a)
{
   return new THREE.ExtrudeGeometry(this, a)
};
THREE.Shape.prototype.getPointsHoles = function (a)
{
   var b, c = this.holes.length,
      d = [];
   for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
   return d
};
THREE.Shape.prototype.getSpacedPointsHoles = function (a)
{
   var b, c = this.holes.length,
      d = [];
   for (b = 0; b < c; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a,
      this.bends);
   return d
};
THREE.Shape.prototype.extractAllPoints = function (a)
{
   return {
      shape: this.getTransformedPoints(a),
      holes: this.getPointsHoles(a)
   }
};
THREE.Shape.prototype.extractPoints = function (a)
{
   return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(
      a)
};
THREE.Shape.prototype.extractAllSpacedPoints = function (a)
{
   return {
      shape: this.getTransformedSpacedPoints(a),
      holes: this.getSpacedPointsHoles(a)
   }
};
THREE.Shape.Utils = {
   removeHoles: function (a, b)
   {
      var c = a.concat(),
         d = c.concat(),
         e, f, g, h, i, j, l, m, n, p, r = [];
      for (i = 0; i < b.length; i++)
      {
         j = b[i];
         Array.prototype.push.apply(d, j);
         f = Number.POSITIVE_INFINITY;
         for (e = 0; e < j.length; e++)
         {
            n = j[e];
            p = [];
            for (m = 0; m < c.length; m++)
            {
               l = c[m];
               l = n.distanceToSquared(l);
               p.push(l);
               if (l < f)
               {
                  f = l;
                  g = e;
                  h = m
               }
            }
         }
         e = h - 1 >= 0 ? h - 1 : c.length - 1;
         f = g - 1 >= 0 ? g - 1 : j.length - 1;
         var o = [j[g], c[h], c[e]];
         m = THREE.FontUtils.Triangulate.area(o);
         var q = [j[g], j[f], c[h]];
         n = THREE.FontUtils.Triangulate.area(q);
         p = h;
         l = g;
         h = h + 1;
         g = g + -1;
         h < 0 && (h = h + c.length);
         h = h % c.length;
         g < 0 && (g = g + j.length);
         g = g % j.length;
         e = h - 1 >= 0 ? h - 1 : c.length - 1;
         f = g - 1 >= 0 ? g - 1 : j.length - 1;
         o = [j[g], c[h], c[e]];
         o = THREE.FontUtils.Triangulate.area(o);
         q = [j[g], j[f], c[h]];
         q = THREE.FontUtils.Triangulate.area(q);
         if (m + n > o + q)
         {
            h = p;
            g = l;
            h < 0 && (h = h + c.length);
            h = h % c.length;
            g < 0 && (g = g + j.length);
            g = g % j.length;
            e = h - 1 >= 0 ? h - 1 : c.length - 1;
            f = g - 1 >= 0 ? g - 1 : j.length - 1
         }
         m = c.slice(0, h);
         n = c.slice(h);
         p = j.slice(g);
         l = j.slice(0, g);
         f = [j[g], j[f], c[h]];
         r.push([j[g], c[h], c[e]]);
         r.push(f);
         c = m.concat(p).concat(l).concat(n)
      }
      return {
         shape: c,
         isolatedPts: r,
         allpoints: d
      }
   },
   triangulateShape: function (a, b)
   {
      var c = THREE.Shape.Utils.removeHoles(a, b),
         d = c.allpoints,
         e = c.isolatedPts,
         c = THREE.FontUtils.Triangulate(c.shape, false),
         f, g, h, i, j = {};
      f = 0;
      for (g = d.length; f < g; f++)
      {
         i = d[f].x + ":" + d[f].y;
         j[i] !== void 0 && console.log("Duplicate point", i);
         j[i] = f
      }
      f = 0;
      for (g = c.length; f < g; f++)
      {
         h = c[f];
         for (d = 0; d < 3; d++)
         {
            i = h[d].x + ":" + h[d].y;
            i = j[i];
            i !== void 0 && (h[d] = i)
         }
      }
      f = 0;
      for (g = e.length; f < g; f++)
      {
         h = e[f];
         for (d = 0; d < 3; d++)
         {
            i = h[d].x + ":" + h[d].y;
            i = j[i];
            i !== void 0 && (h[d] = i)
         }
      }
      return c.concat(e)
   },
   isClockWise: function (a)
   {
      return THREE.FontUtils.Triangulate.area(a) < 0
   },
   b2p0: function (a, b)
   {
      var c = 1 - a;
      return c * c * b
   },
   b2p1: function (a, b)
   {
      return 2 * (1 - a) * a * b
   },
   b2p2: function (a, b)
   {
      return a * a * b
   },
   b2: function (a, b, c, d)
   {
      return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
   },
   b3p0: function (a, b)
   {
      var c = 1 - a;
      return c * c * c * b
   },
   b3p1: function (a, b)
   {
      var c = 1 - a;
      return 3 * c * c * a * b
   },
   b3p2: function (a, b)
   {
      return 3 * (1 - a) * a * a * b
   },
   b3p3: function (a, b)
   {
      return a * a * a * b
   },
   b3: function (a, b, c, d, e)
   {
      return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) +
         this.b3p3(a, e)
   }
};
THREE.AnimationHandler = function ()
{
   var a = [],
      b = {}, c = {
         update: function (b)
         {
            for (var c = 0; c < a.length; c++) a[c].update(b)
         },
         addToUpdate: function (b)
         {
            a.indexOf(b) === -1 && a.push(b)
         },
         removeFromUpdate: function (b)
         {
            b = a.indexOf(b);
            b !== -1 && a.splice(b, 1)
         },
         add: function (a)
         {
            b[a.name] !== void 0 && console.log(
               "THREE.AnimationHandler.add: Warning! " + a.name +
               " already exists in library. Overwriting.");
            b[a.name] = a;
            if (a.initialized !== true)
            {
               for (var c = 0; c < a.hierarchy.length; c++)
               {
                  for (var d = 0; d < a.hierarchy[c].keys.length; d++)
                  {
                     if (a.hierarchy[c].keys[d].time < 0) a.hierarchy[c].keys[d]
                        .time =
                        0;
                     if (a.hierarchy[c].keys[d].rot !== void 0 && !(a.hierarchy[
                        c].keys[d].rot instanceof THREE.Quaternion))
                     {
                        var h = a.hierarchy[c].keys[d].rot;
                        a.hierarchy[c].keys[d].rot = new THREE.Quaternion(h[0],
                           h[1], h[2], h[3])
                     }
                  }
                  if (a.hierarchy[c].keys.length && a.hierarchy[c].keys[0].morphTargets !==
                     void 0)
                  {
                     h = {};
                     for (d = 0; d < a.hierarchy[c].keys.length; d++)
                        for (var i = 0; i < a.hierarchy[c].keys[d].morphTargets
                           .length; i++)
                        {
                           var j = a.hierarchy[c].keys[d].morphTargets[i];
                           h[j] = -1
                        }
                     a.hierarchy[c].usedMorphTargets = h;
                     for (d = 0; d < a.hierarchy[c].keys.length; d++)
                     {
                        var l = {};
                        for (j in h)
                        {
                           for (i = 0; i < a.hierarchy[c].keys[d].morphTargets.length; i++)
                              if (a.hierarchy[c].keys[d].morphTargets[i] === j)
                              {
                                 l[j] = a.hierarchy[c].keys[d].morphTargetsInfluences[
                                    i];
                                 break
                              }
                           i === a.hierarchy[c].keys[d].morphTargets.length &&
                              (l[j] = 0)
                        }
                        a.hierarchy[c].keys[d].morphTargetsInfluences = l
                     }
                  }
                  for (d = 1; d < a.hierarchy[c].keys.length; d++)
                     if (a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d -
                        1].time)
                     {
                        a.hierarchy[c].keys.splice(d, 1);
                        d--
                     }
                  for (d = 0; d < a.hierarchy[c].keys.length; d++) a.hierarchy[
                     c].keys[d].index = d
               }
               d = parseInt(a.length *
                  a.fps, 10);
               a.JIT = {};
               a.JIT.hierarchy = [];
               for (c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(
                  Array(d));
               a.initialized = true
            }
         },
         get: function (a)
         {
            if (typeof a === "string")
            {
               if (b[a]) return b[a];
               console.log(
                  "THREE.AnimationHandler.get: Couldn't find animation " + a);
               return null
            }
         },
         parse: function (a)
         {
            var b = [];
            if (a instanceof THREE.SkinnedMesh)
               for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
            else d(a, b);
            return b
         }
      }, d = function (a, b)
      {
         b.push(a);
         for (var c = 0; c < a.children.length; c++) d(a.children[c], b)
      };
   c.LINEAR = 0;
   c.CATMULLROM =
      1;
   c.CATMULLROM_FORWARD = 2;
   return c
}();
THREE.Animation = function (a, b, c)
{
   this.root = a;
   this.data = THREE.AnimationHandler.get(b);
   this.hierarchy = THREE.AnimationHandler.parse(a);
   this.currentTime = 0;
   this.timeScale = 1;
   this.isPlaying = false;
   this.loop = this.isPaused = true;
   this.interpolationType = c !== void 0 ? c : THREE.AnimationHandler.LINEAR;
   this.points = [];
   this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function (a, b)
{
   if (this.isPlaying === false)
   {
      this.isPlaying = true;
      this.loop = a !== void 0 ? a : true;
      this.currentTime = b !== void 0 ? b : 0;
      var c, d = this.hierarchy.length,
         e;
      for (c = 0; c < d; c++)
      {
         e = this.hierarchy[c];
         if (this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD)
            e.useQuaternion = true;
         e.matrixAutoUpdate = true;
         if (e.animationCache === void 0)
         {
            e.animationCache = {};
            e.animationCache.prevKey = {
               pos: 0,
               rot: 0,
               scl: 0
            };
            e.animationCache.nextKey = {
               pos: 0,
               rot: 0,
               scl: 0
            };
            e.animationCache.originalMatrix =
               e instanceof THREE.Bone ? e.skinMatrix : e.matrix
         }
         var f = e.animationCache.prevKey;
         e = e.animationCache.nextKey;
         f.pos = this.data.hierarchy[c].keys[0];
         f.rot = this.data.hierarchy[c].keys[0];
         f.scl = this.data.hierarchy[c].keys[0];
         e.pos = this.getNextKeyWith("pos", c, 1);
         e.rot = this.getNextKeyWith("rot", c, 1);
         e.scl = this.getNextKeyWith("scl", c, 1)
      }
      this.update(0)
   }
   this.isPaused = false;
   THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function ()
{
   this.isPaused === true ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler
      .removeFromUpdate(this);
   this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function ()
{
   this.isPaused = this.isPlaying = false;
   THREE.AnimationHandler.removeFromUpdate(this)
};
THREE.Animation.prototype.update = function (a)
{
   if (this.isPlaying !== false)
   {
      var b = ["pos", "rot", "scl"],
         c, d, e, f, g, h, i, j, l;
      l = this.currentTime = this.currentTime + a * this.timeScale;
      j = this.currentTime = this.currentTime % this.data.length;
      parseInt(Math.min(j * this.data.fps, this.data.length * this.data.fps),
         10);
      for (var m = 0, n = this.hierarchy.length; m < n; m++)
      {
         a = this.hierarchy[m];
         i = a.animationCache;
         for (var p = 0; p < 3; p++)
         {
            c = b[p];
            g = i.prevKey[c];
            h = i.nextKey[c];
            if (h.time <= l)
            {
               if (j < l)
                  if (this.loop)
                  {
                     g = this.data.hierarchy[m].keys[0];
                     for (h = this.getNextKeyWith(c, m, 1); h.time < j;)
                     {
                        g = h;
                        h = this.getNextKeyWith(c, m, h.index + 1)
                     }
                  }
                  else
                  {
                     this.stop();
                     return
                  }
                  else
                  {
                     do {
                        g = h;
                        h = this.getNextKeyWith(c, m, h.index + 1)
                     } while (h.time < j)
                  }
               i.prevKey[c] = g;
               i.nextKey[c] = h
            }
            a.matrixAutoUpdate = true;
            a.matrixWorldNeedsUpdate = true;
            d = (j - g.time) / (h.time - g.time);
            e = g[c];
            f = h[c];
            if (d < 0 || d > 1)
            {
               console.log(
                  "THREE.Animation.update: Warning! Scale out of bounds:" + d +
                  " on bone " + m);
               d = d < 0 ? 0 : 1
            }
            if (c === "pos")
            {
               c = a.position;
               if (this.interpolationType === THREE.AnimationHandler.LINEAR)
               {
                  c.x = e[0] +
                     (f[0] - e[0]) * d;
                  c.y = e[1] + (f[1] - e[1]) * d;
                  c.z = e[2] + (f[2] - e[2]) * d
               }
               else if (this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
                  this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
               )
               {
                  this.points[0] = this.getPrevKeyWith("pos", m, g.index - 1).pos;
                  this.points[1] = e;
                  this.points[2] = f;
                  this.points[3] = this.getNextKeyWith("pos", m, h.index + 1).pos;
                  d = d * 0.33 + 0.33;
                  e = this.interpolateCatmullRom(this.points, d);
                  c.x = e[0];
                  c.y = e[1];
                  c.z = e[2];
                  if (this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD)
                  {
                     d =
                        this.interpolateCatmullRom(this.points, d * 1.01);
                     this.target.set(d[0], d[1], d[2]);
                     this.target.subSelf(c);
                     this.target.y = 0;
                     this.target.normalize();
                     d = Math.atan2(this.target.x, this.target.z);
                     a.rotation.set(0, d, 0)
                  }
               }
            }
            else if (c === "rot") THREE.Quaternion.slerp(e, f, a.quaternion, d);
            else if (c === "scl")
            {
               c = a.scale;
               c.x = e[0] + (f[0] - e[0]) * d;
               c.y = e[1] + (f[1] - e[1]) * d;
               c.z = e[2] + (f[2] - e[2]) * d
            }
         }
      }
   }
};
THREE.Animation.prototype.interpolateCatmullRom = function (a, b)
{
   var c = [],
      d = [],
      e, f, g, h, i, j;
   e = (a.length - 1) * b;
   f = Math.floor(e);
   e = e - f;
   c[0] = f === 0 ? f : f - 1;
   c[1] = f;
   c[2] = f > a.length - 2 ? f : f + 1;
   c[3] = f > a.length - 3 ? f : f + 2;
   f = a[c[0]];
   h = a[c[1]];
   i = a[c[2]];
   j = a[c[3]];
   c = e * e;
   g = e * c;
   d[0] = this.interpolate(f[0], h[0], i[0], j[0], e, c, g);
   d[1] = this.interpolate(f[1], h[1], i[1], j[1], e, c, g);
   d[2] = this.interpolate(f[2], h[2], i[2], j[2], e, c, g);
   return d
};
THREE.Animation.prototype.interpolate = function (a, b, c, d, e, f, g)
{
   a = (c - a) * 0.5;
   d = (d - b) * 0.5;
   return (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e +
      b
};
THREE.Animation.prototype.getNextKeyWith = function (a, b, c)
{
   for (var d = this.data.hierarchy[b].keys, c = this.interpolationType ===
         THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler
         .CATMULLROM_FORWARD ? c < d.length - 1 ? c : d.length - 1 : c % d.length; c <
      d.length; c++)
      if (d[c][a] !== void 0) return d[c];
   return this.data.hierarchy[b].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function (a, b, c)
{
   for (var d = this.data.hierarchy[b].keys, c = this.interpolationType ===
         THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler
         .CATMULLROM_FORWARD ? c > 0 ? c : 0 : c >= 0 ? c : c + d.length; c >=
      0; c--)
      if (d[c][a] !== void 0) return d[c];
   return this.data.hierarchy[b].keys[d.length - 1]
};
THREE.KeyFrameAnimation = function (a, b, c)
{
   this.root = a;
   this.data = THREE.AnimationHandler.get(b);
   this.hierarchy = THREE.AnimationHandler.parse(a);
   this.currentTime = 0;
   this.timeScale = 0.0010;
   this.isPlaying = false;
   this.loop = this.isPaused = true;
   this.JITCompile = c !== void 0 ? c : true;
   a = 0;
   for (b = this.hierarchy.length; a < b; a++)
   {
      var c = this.data.hierarchy[a].sids,
         d = this.hierarchy[a];
      if (this.data.hierarchy[a].keys.length && c)
      {
         for (var e = 0; e < c.length; e++)
         {
            var f = c[e],
               g = this.getNextKeyWith(f, a, 0);
            g && g.apply(f)
         }
         d.matrixAutoUpdate =
            false;
         this.data.hierarchy[a].node.updateMatrix();
         d.matrixWorldNeedsUpdate = true
      }
   }
};
THREE.KeyFrameAnimation.prototype.play = function (a, b)
{
   if (!this.isPlaying)
   {
      this.isPlaying = true;
      this.loop = a !== void 0 ? a : true;
      this.currentTime = b !== void 0 ? b : 0;
      this.startTimeMs = b;
      this.startTime = 1E7;
      this.endTime = -this.startTime;
      var c, d = this.hierarchy.length,
         e, f;
      for (c = 0; c < d; c++)
      {
         e = this.hierarchy[c];
         f = this.data.hierarchy[c];
         e.useQuaternion = true;
         if (f.animationCache === void 0)
         {
            f.animationCache = {};
            f.animationCache.prevKey = null;
            f.animationCache.nextKey = null;
            f.animationCache.originalMatrix = e instanceof THREE.Bone ?
               e.skinMatrix : e.matrix
         }
         e = this.data.hierarchy[c].keys;
         if (e.length)
         {
            f.animationCache.prevKey = e[0];
            f.animationCache.nextKey = e[1];
            this.startTime = Math.min(e[0].time, this.startTime);
            this.endTime = Math.max(e[e.length - 1].time, this.endTime)
         }
      }
      this.update(0)
   }
   this.isPaused = false;
   THREE.AnimationHandler.addToUpdate(this)
};
THREE.KeyFrameAnimation.prototype.pause = function ()
{
   this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler
      .removeFromUpdate(this);
   this.isPaused = !this.isPaused
};
THREE.KeyFrameAnimation.prototype.stop = function ()
{
   this.isPaused = this.isPlaying = false;
   THREE.AnimationHandler.removeFromUpdate(this);
   for (var a = 0; a < this.data.hierarchy.length; a++)
   {
      var b = this.hierarchy[a],
         c = this.data.hierarchy[a];
      if (c.animationCache !== void 0)
      {
         var d = c.animationCache.originalMatrix;
         if (b instanceof THREE.Bone)
         {
            d.copy(b.skinMatrix);
            b.skinMatrix = d
         }
         else
         {
            d.copy(b.matrix);
            b.matrix = d
         }
         delete c.animationCache
      }
   }
};
THREE.KeyFrameAnimation.prototype.update = function (a)
{
   if (this.isPlaying)
   {
      var b, c, d, e, f = this.data.JIT.hierarchy,
         g, h, i;
      h = this.currentTime = this.currentTime + a * this.timeScale;
      g = this.currentTime = this.currentTime % this.data.length;
      if (g < this.startTimeMs) g = this.currentTime = this.startTimeMs + g;
      e = parseInt(Math.min(g * this.data.fps, this.data.length * this.data.fps),
         10);
      if ((i = g < h) && !this.loop)
      {
         for (var a = 0, j = this.hierarchy.length; a < j; a++)
         {
            var l = this.data.hierarchy[a].keys,
               f = this.data.hierarchy[a].sids;
            d = l.length - 1;
            e =
               this.hierarchy[a];
            if (l.length)
            {
               for (l = 0; l < f.length; l++)
               {
                  g = f[l];
                  (h = this.getPrevKeyWith(g, a, d)) && h.apply(g)
               }
               this.data.hierarchy[a].node.updateMatrix();
               e.matrixWorldNeedsUpdate = true
            }
         }
         this.stop()
      }
      else if (!(g < this.startTime))
      {
         a = 0;
         for (j = this.hierarchy.length; a < j; a++)
         {
            d = this.hierarchy[a];
            b = this.data.hierarchy[a];
            var l = b.keys,
               m = b.animationCache;
            if (this.JITCompile && f[a][e] !== void 0)
               if (d instanceof THREE.Bone)
               {
                  d.skinMatrix = f[a][e];
                  d.matrixWorldNeedsUpdate = false
               }
               else
               {
                  d.matrix = f[a][e];
                  d.matrixWorldNeedsUpdate =
                     true
               }
               else if (l.length)
            {
               if (this.JITCompile && m) d instanceof THREE.Bone ? d.skinMatrix =
                  m.originalMatrix : d.matrix = m.originalMatrix;
               b = m.prevKey;
               c = m.nextKey;
               if (b && c)
               {
                  if (c.time <= h)
                  {
                     if (i && this.loop)
                     {
                        b = l[0];
                        for (c = l[1]; c.time < g;)
                        {
                           b = c;
                           c = l[b.index + 1]
                        }
                     }
                     else if (!i)
                        for (var n = l.length - 1; c.time < g && c.index !== n;)
                        {
                           b = c;
                           c = l[b.index + 1]
                        }
                     m.prevKey = b;
                     m.nextKey = c
                  }
                  c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time)
               }
               this.data.hierarchy[a].node.updateMatrix();
               d.matrixWorldNeedsUpdate = true
            }
         }
         if (this.JITCompile && f[0][e] === void 0)
         {
            this.hierarchy[0].updateMatrixWorld(true);
            for (a = 0; a < this.hierarchy.length; a++) f[a][e] = this.hierarchy[
               a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix.clone() :
               this.hierarchy[a].matrix.clone()
         }
      }
   }
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (a, b, c)
{
   b = this.data.hierarchy[b].keys;
   for (c = c % b.length; c < b.length; c++)
      if (b[c].hasTarget(a)) return b[c];
   return b[0]
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (a, b, c)
{
   b = this.data.hierarchy[b].keys;
   for (c = c >= 0 ? c : c + b.length; c >= 0; c--)
      if (b[c].hasTarget(a)) return b[c];
   return b[b.length - 1]
};
THREE.CubeCamera = function (a, b, c)
{
   THREE.Object3D.call(this);
   var d = new THREE.PerspectiveCamera(90, 1, a, b);
   d.up.set(0, -1, 0);
   d.lookAt(new THREE.Vector3(1, 0, 0));
   this.add(d);
   var e = new THREE.PerspectiveCamera(90, 1, a, b);
   e.up.set(0, -1, 0);
   e.lookAt(new THREE.Vector3(-1, 0, 0));
   this.add(e);
   var f = new THREE.PerspectiveCamera(90, 1, a, b);
   f.up.set(0, 0, 1);
   f.lookAt(new THREE.Vector3(0, 1, 0));
   this.add(f);
   var g = new THREE.PerspectiveCamera(90, 1, a, b);
   g.up.set(0, 0, -1);
   g.lookAt(new THREE.Vector3(0, -1, 0));
   this.add(g);
   var h = new THREE.PerspectiveCamera(90,
      1, a, b);
   h.up.set(0, -1, 0);
   h.lookAt(new THREE.Vector3(0, 0, 1));
   this.add(h);
   var i = new THREE.PerspectiveCamera(90, 1, a, b);
   i.up.set(0, -1, 0);
   i.lookAt(new THREE.Vector3(0, 0, -1));
   this.add(i);
   this.renderTarget = new THREE.WebGLRenderTargetCube(c, c,
   {
      format: THREE.RGBFormat,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter
   });
   this.updateCubeMap = function (a, b)
   {
      var c = this.renderTarget,
         n = c.generateMipmaps;
      c.generateMipmaps = false;
      c.activeCubeFace = 0;
      a.render(b, d, c);
      c.activeCubeFace = 1;
      a.render(b, e, c);
      c.activeCubeFace =
         2;
      a.render(b, f, c);
      c.activeCubeFace = 3;
      a.render(b, g, c);
      c.activeCubeFace = 4;
      a.render(b, h, c);
      c.generateMipmaps = n;
      c.activeCubeFace = 5;
      a.render(b, i, c)
   }
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function (a, b, c, d, e, f, g)
{
   THREE.Camera.call(this);
   this.fov = c;
   this.left = -a / 2;
   this.right = a / 2;
   this.top = b / 2;
   this.bottom = -b / 2;
   this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f,
      g);
   this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e);
   this.zoom = 1;
   this.toPerspective()
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function ()
{
   this.near = this.cameraP.near;
   this.far = this.cameraP.far;
   this.cameraP.fov = this.fov / this.zoom;
   this.cameraP.updateProjectionMatrix();
   this.projectionMatrix = this.cameraP.projectionMatrix;
   this.inPerspectiveMode = true;
   this.inOrthographicMode = false
};
THREE.CombinedCamera.prototype.toOrthographic = function ()
{
   var a = this.cameraP.aspect,
      b = (this.cameraP.near + this.cameraP.far) / 2,
      b = Math.tan(this.fov / 2) * b,
      a = 2 * b * a / 2,
      b = b / this.zoom,
      a = a / this.zoom;
   this.cameraO.left = -a;
   this.cameraO.right = a;
   this.cameraO.top = b;
   this.cameraO.bottom = -b;
   this.cameraO.updateProjectionMatrix();
   this.near = this.cameraO.near;
   this.far = this.cameraO.far;
   this.projectionMatrix = this.cameraO.projectionMatrix;
   this.inPerspectiveMode = false;
   this.inOrthographicMode = true
};
THREE.CombinedCamera.prototype.setSize = function (a, b)
{
   this.cameraP.aspect = a / b;
   this.left = -a / 2;
   this.right = a / 2;
   this.top = b / 2;
   this.bottom = -b / 2
};
THREE.CombinedCamera.prototype.setFov = function (a)
{
   this.fov = a;
   this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function ()
{
   if (this.inPerspectiveMode) this.toPerspective();
   else
   {
      this.toPerspective();
      this.toOrthographic()
   }
};
THREE.CombinedCamera.prototype.setLens = function (a, b)
{
   var c = 2 * Math.atan((b !== void 0 ? b : 24) / (a * 2)) * (180 / Math.PI);
   this.setFov(c);
   return c
};
THREE.CombinedCamera.prototype.setZoom = function (a)
{
   this.zoom = a;
   this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
};
THREE.CombinedCamera.prototype.toFrontView = function ()
{
   this.rotation.x = 0;
   this.rotation.y = 0;
   this.rotation.z = 0;
   this.rotationAutoUpdate = false
};
THREE.CombinedCamera.prototype.toBackView = function ()
{
   this.rotation.x = 0;
   this.rotation.y = Math.PI;
   this.rotation.z = 0;
   this.rotationAutoUpdate = false
};
THREE.CombinedCamera.prototype.toLeftView = function ()
{
   this.rotation.x = 0;
   this.rotation.y = -Math.PI / 2;
   this.rotation.z = 0;
   this.rotationAutoUpdate = false
};
THREE.CombinedCamera.prototype.toRightView = function ()
{
   this.rotation.x = 0;
   this.rotation.y = Math.PI / 2;
   this.rotation.z = 0;
   this.rotationAutoUpdate = false
};
THREE.CombinedCamera.prototype.toTopView = function ()
{
   this.rotation.x = -Math.PI / 2;
   this.rotation.y = 0;
   this.rotation.z = 0;
   this.rotationAutoUpdate = false
};
THREE.CombinedCamera.prototype.toBottomView = function ()
{
   this.rotation.x = Math.PI / 2;
   this.rotation.y = 0;
   this.rotation.z = 0;
   this.rotationAutoUpdate = false
};
THREE.FirstPersonControls = function (a, b)
{
   function c(a, b)
   {
      return function ()
      {
         b.apply(a, arguments)
      }
   }
   this.object = a;
   this.target = new THREE.Vector3(0, 0, 0);
   this.domElement = b !== void 0 ? b : document;
   this.movementSpeed = 1;
   this.lookSpeed = 0.0050;
   this.lookVertical = true;
   this.autoForward = false;
   this.activeLook = true;
   this.heightSpeed = false;
   this.heightCoef = 1;
   this.heightMin = 0;
   this.heightMax = 1;
   this.constrainVertical = false;
   this.verticalMin = 0;
   this.verticalMax = Math.PI;
   this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX =
      this.autoSpeedFactor = 0;
   this.mouseDragOn = this.freeze = this.moveRight = this.moveLeft = this.moveBackward =
      this.moveForward = false;
   this.viewHalfY = this.viewHalfX = 0;
   this.domElement !== document && this.domElement.setAttribute("tabindex", -1);
   this.handleResize = function ()
   {
      if (this.domElement === document)
      {
         this.viewHalfX = window.innerWidth / 2;
         this.viewHalfY = window.innerHeight / 2
      }
      else
      {
         this.viewHalfX = this.domElement.offsetWidth / 2;
         this.viewHalfY = this.domElement.offsetHeight / 2
      }
   };
   this.onMouseDown = function (a)
   {
      this.domElement !==
         document && this.domElement.focus();
      a.preventDefault();
      a.stopPropagation();
      if (this.activeLook) switch (a.button)
      {
      case 0:
         this.moveForward = true;
         break;
      case 2:
         this.moveBackward = true
      }
      this.mouseDragOn = true
   };
   this.onMouseUp = function (a)
   {
      a.preventDefault();
      a.stopPropagation();
      if (this.activeLook) switch (a.button)
      {
      case 0:
         this.moveForward = false;
         break;
      case 2:
         this.moveBackward = false
      }
      this.mouseDragOn = false
   };
   this.onMouseMove = function (a)
   {
      if (this.domElement === document)
      {
         this.mouseX = a.pageX - this.viewHalfX;
         this.mouseY = a.pageY -
            this.viewHalfY
      }
      else
      {
         this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX;
         this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY
      }
   };
   this.onKeyDown = function (a)
   {

      switch (a.keyCode)
      {
      case 38:
      case 87:
         this.moveForward = true;
         break;
      case 37:
      case 65:
         this.moveLeft = true;
         break;
      case 40:
      case 83:
         this.moveBackward = true;
         break;
      case 39:
      case 68:
         this.moveRight = true;
         break;
      case 82:
         this.moveUp = true;
         break;
      case 70:
         this.moveDown = true;
         break;
      case 81:
         this.freeze = !this.freeze
      }
   };
   this.onKeyUp = function (a)
   {
      switch (a.keyCode)
      {
      case 38:
      case 87:
         this.moveForward =
            false;
         break;
      case 37:
      case 65:
         this.moveLeft = false;
         break;
      case 40:
      case 83:
         this.moveBackward = false;
         break;
      case 39:
      case 68:
         this.moveRight = false;
         break;
      case 82:
         this.moveUp = false;
         break;
      case 70:
         this.moveDown = false
      }
   };
   this.update = function (a)
   {
      var b = 0;
      if (!this.freeze)
      {
         if (this.heightSpeed)
         {
            b = THREE.Math.clamp(this.object.position.y, this.heightMin, this.heightMax) -
               this.heightMin;
            this.autoSpeedFactor = a * b * this.heightCoef
         }
         else this.autoSpeedFactor = 0;
         b = a * this.movementSpeed;
         (this.moveForward || this.autoForward && !this.moveBackward) &&
            this.object.translateZ(-(b + this.autoSpeedFactor));
         this.moveBackward && this.object.translateZ(b);
         this.moveLeft && this.object.translateX(-b);
         this.moveRight && this.object.translateX(b);
         this.moveUp && this.object.translateY(b);
         this.moveDown && this.object.translateY(-b);
         a = a * this.lookSpeed;
         this.activeLook || (a = 0);
         this.lon = this.lon + this.mouseX * a;
         if (this.lookVertical) this.lat = this.lat - this.mouseY * a;
         this.lat = Math.max(-85, Math.min(85, this.lat));
         this.phi = (90 - this.lat) * Math.PI / 180;
         this.theta = this.lon * Math.PI / 180;
         var b =
            this.target,
            c = this.object.position;
         b.x = c.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
         b.y = c.y + 100 * Math.cos(this.phi);
         b.z = c.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
         b = 1;
         this.constrainVertical && (b = Math.PI / (this.verticalMax - this.verticalMin));
         this.lon = this.lon + this.mouseX * a;
         if (this.lookVertical) this.lat = this.lat - this.mouseY * a * b;
         this.lat = Math.max(-85, Math.min(85, this.lat));
         this.phi = (90 - this.lat) * Math.PI / 180;
         this.theta = this.lon * Math.PI / 180;
         if (this.constrainVertical) this.phi = THREE.Math.mapLinear(this.phi,
            0, Math.PI, this.verticalMin, this.verticalMax);
         b = this.target;
         c = this.object.position;
         b.x = c.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
         b.y = c.y + 100 * Math.cos(this.phi);
         b.z = c.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
         this.object.lookAt(b)
      }
   };
   this.domElement.addEventListener("contextmenu", function (a)
   {
      a.preventDefault()
   }, false);
   this.domElement.addEventListener("mousemove", c(this, this.onMouseMove),
      false);
   this.domElement.addEventListener("mousedown", c(this, this.onMouseDown),
      false);
   this.domElement.addEventListener("mouseup",
      c(this, this.onMouseUp), false);
   this.domElement.addEventListener("keydown", c(this, this.onKeyDown), false);
   this.domElement.addEventListener("keyup", c(this, this.onKeyUp), false);
   this.handleResize()
};
THREE.PathControls = function (a, b)
{
   function c(a)
   {
      return (a = a * 2) < 1 ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1)
   }

   function d(a, b)
   {
      return function ()
      {
         b.apply(a, arguments)
      }
   }

   function e(a, b, c, d)
   {
      var e = {
         name: c,
         fps: 0.6,
         length: d,
         hierarchy: []
      }, f, g = b.getControlPointsArray(),
         h = b.getLength(),
         q = g.length,
         s = 0;
      f = q - 1;
      b = {
         parent: -1,
         keys: []
      };
      b.keys[0] = {
         time: 0,
         pos: g[0],
         rot: [0, 0, 0, 1],
         scl: [1, 1, 1]
      };
      b.keys[f] = {
         time: d,
         pos: g[f],
         rot: [0, 0, 0, 1],
         scl: [1, 1, 1]
      };
      for (f = 1; f < q - 1; f++)
      {
         s = d * h.chunks[f] / h.total;
         b.keys[f] = {
            time: s,
            pos: g[f]
         }
      }
      e.hierarchy[0] = b;
      THREE.AnimationHandler.add(e);
      return new THREE.Animation(a, c, THREE.AnimationHandler.CATMULLROM_FORWARD,
         false)
   }

   function f(a, b)
   {
      var c, d, e = new THREE.Geometry;
      for (c = 0; c < a.points.length * b; c++)
      {
         d = c / (a.points.length * b);
         d = a.getPoint(d);
         e.vertices[c] = new THREE.Vector3(d.x, d.y, d.z)
      }
      return e
   }
   this.object = a;
   this.domElement = b !== void 0 ? b : document;
   this.id = "PathControls" + THREE.PathControlsIdCounter++;
   this.duration = 1E4;
   this.waypoints = [];
   this.useConstantSpeed = true;
   this.resamplingCoef = 50;
   this.debugPath = new THREE.Object3D;
   this.debugDummy = new THREE.Object3D;
   this.animationParent = new THREE.Object3D;
   this.lookSpeed = 0.0050;
   this.lookHorizontal = this.lookVertical = true;
   this.verticalAngleMap = {
      srcRange: [0, 2 * Math.PI],
      dstRange: [0, 2 * Math.PI]
   };
   this.horizontalAngleMap = {
      srcRange: [0, 2 * Math.PI],
      dstRange: [0, 2 * Math.PI]
   };
   this.target = new THREE.Object3D;
   this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0;
   var g = Math.PI * 2,
      h = Math.PI / 180;
   this.viewHalfY = this.viewHalfX = 0;
   this.domElement !== document && this.domElement.setAttribute("tabindex", -1);
   this.handleResize = function ()
   {
      if (this.domElement ===
         document)
      {
         this.viewHalfX = window.innerWidth / 2;
         this.viewHalfY = window.innerHeight / 2
      }
      else
      {
         this.viewHalfX = this.domElement.offsetWidth / 2;
         this.viewHalfY = this.domElement.offsetHeight / 2
      }
   };
   this.update = function (a)
   {
      var b;
      if (this.lookHorizontal) this.lon = this.lon + this.mouseX * this.lookSpeed *
         a;
      if (this.lookVertical) this.lat = this.lat - this.mouseY * this.lookSpeed *
         a;
      this.lon = Math.max(0, Math.min(360, this.lon));
      this.lat = Math.max(-85, Math.min(85, this.lat));
      this.phi = (90 - this.lat) * h;
      this.theta = this.lon * h;
      a = this.phi % g;
      this.phi =
         a >= 0 ? a : a + g;
      b = this.verticalAngleMap.srcRange;
      a = this.verticalAngleMap.dstRange;
      b = THREE.Math.mapLinear(this.phi, b[0], b[1], a[0], a[1]);
      var d = a[1] - a[0];
      this.phi = c((b - a[0]) / d) * d + a[0];
      b = this.horizontalAngleMap.srcRange;
      a = this.horizontalAngleMap.dstRange;
      b = THREE.Math.mapLinear(this.theta, b[0], b[1], a[0], a[1]);
      d = a[1] - a[0];
      this.theta = c((b - a[0]) / d) * d + a[0];
      a = this.target.position;
      a.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
      a.y = 100 * Math.cos(this.phi);
      a.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
      this.object.lookAt(this.target.position)
   };
   this.onMouseMove = function (a)
   {
      if (this.domElement === document)
      {
         this.mouseX = a.pageX - this.viewHalfX;
         this.mouseY = a.pageY - this.viewHalfY
      }
      else
      {
         this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX;
         this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY
      }
   };
   this.init = function ()
   {
      this.spline = new THREE.Spline;
      this.spline.initFromArray(this.waypoints);
      this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef);
      if (this.createDebugDummy)
      {
         var a = new THREE.MeshLambertMaterial(
         {
            color: 30719
         }),
            b = new THREE.MeshLambertMaterial(
            {
               color: 65280
            }),
            c = new THREE.CubeGeometry(10, 10, 20),
            g = new THREE.CubeGeometry(2, 2, 10);
         this.animationParent = new THREE.Mesh(c, a);
         a = new THREE.Mesh(g, b);
         a.position.set(0, 10, 0);
         this.animation = e(this.animationParent, this.spline, this.id, this.duration);
         this.animationParent.add(this.object);
         this.animationParent.add(this.target);
         this.animationParent.add(a)
      }
      else
      {
         this.animation = e(this.animationParent, this.spline, this.id, this.duration);
         this.animationParent.add(this.target);
         this.animationParent.add(this.object)
      } if (this.createDebugPath)
      {
         var a =
            this.debugPath,
            b = this.spline,
            g = f(b, 10),
            c = f(b, 10),
            h = new THREE.LineBasicMaterial(
            {
               color: 16711680,
               linewidth: 3
            }),
            g = new THREE.Line(g, h),
            c = new THREE.ParticleSystem(c, new THREE.ParticleBasicMaterial(
            {
               color: 16755200,
               size: 3
            }));
         g.scale.set(1, 1, 1);
         a.add(g);
         c.scale.set(1, 1, 1);
         a.add(c);
         for (var g = new THREE.SphereGeometry(1, 16, 8), h = new THREE.MeshBasicMaterial(
            {
               color: 65280
            }), p = 0; p < b.points.length; p++)
         {
            c = new THREE.Mesh(g, h);
            c.position.copy(b.points[p]);
            a.add(c)
         }
      }
      this.domElement.addEventListener("mousemove", d(this,
         this.onMouseMove), false)
   };
   this.handleResize()
};
THREE.PathControlsIdCounter = 0;
THREE.FlyControls = function (a, b)
{
   function c(a, b)
   {
      return function ()
      {
         b.apply(a, arguments)
      }
   }
   this.object = a;
   this.domElement = b !== void 0 ? b : document;
   b && this.domElement.setAttribute("tabindex", -1);
   this.movementSpeed = 1;
   this.rollSpeed = 0.0050;
   this.autoForward = this.dragToLook = false;
   this.object.useQuaternion = true;
   this.tmpQuaternion = new THREE.Quaternion;
   this.mouseStatus = 0;
   this.moveState = {
      up: 0,
      down: 0,
      left: 0,
      right: 0,
      forward: 0,
      back: 0,
      pitchUp: 0,
      pitchDown: 0,
      yawLeft: 0,
      yawRight: 0,
      rollLeft: 0,
      rollRight: 0
   };
   this.moveVector =
      new THREE.Vector3(0, 0, 0);
   this.rotationVector = new THREE.Vector3(0, 0, 0);
   this.handleEvent = function (a)
   {
      if (typeof this[a.type] == "function") this[a.type](a)
   };
   this.keydown = function (a)
   {
      if (!a.altKey)
      {
         switch (a.keyCode)
         {
         case 16:
            this.movementSpeedMultiplier = 0.1;
            break;
         case 87:
            this.moveState.forward = 1;
            break;
         case 83:
            this.moveState.back = 1;
            break;
         case 65:
            this.moveState.left = 1;
            break;
         case 68:
            this.moveState.right = 1;
            break;
         case 82:
            this.moveState.up = 1;
            break;
         case 70:
            this.moveState.down = 1;
            break;
         case 38:
            this.moveState.pitchUp =
               1;
            break;
         case 40:
            this.moveState.pitchDown = 1;
            break;
         case 37:
            this.moveState.yawLeft = 1;
            break;
         case 39:
            this.moveState.yawRight = 1;
            break;
         case 81:
            this.moveState.rollLeft = 1;
            break;
         case 69:
            this.moveState.rollRight = 1
         }
         this.updateMovementVector();
         this.updateRotationVector()
      }
   };
   this.keyup = function (a)
   {
      switch (a.keyCode)
      {
      case 16:
         this.movementSpeedMultiplier = 1;
         break;
      case 87:
         this.moveState.forward = 0;
         break;
      case 83:
         this.moveState.back = 0;
         break;
      case 65:
         this.moveState.left = 0;
         break;
      case 68:
         this.moveState.right = 0;
         break;
      case 82:
         this.moveState.up =
            0;
         break;
      case 70:
         this.moveState.down = 0;
         break;
      case 38:
         this.moveState.pitchUp = 0;
         break;
      case 40:
         this.moveState.pitchDown = 0;
         break;
      case 37:
         this.moveState.yawLeft = 0;
         break;
      case 39:
         this.moveState.yawRight = 0;
         break;
      case 81:
         this.moveState.rollLeft = 0;
         break;
      case 69:
         this.moveState.rollRight = 0
      }
      this.updateMovementVector();
      this.updateRotationVector()
   };
   this.mousedown = function (a)
   {
      this.domElement !== document && this.domElement.focus();
      a.preventDefault();
      a.stopPropagation();
      if (this.dragToLook) this.mouseStatus++;
      else switch (a.button)
      {
      case 0:
         this.object.moveForward =
            true;
         break;
      case 2:
         this.object.moveBackward = true
      }
   };
   this.mousemove = function (a)
   {
      if (!this.dragToLook || this.mouseStatus > 0)
      {
         var b = this.getContainerDimensions(),
            c = b.size[0] / 2,
            g = b.size[1] / 2;
         this.moveState.yawLeft = -(a.pageX - b.offset[0] - c) / c;
         this.moveState.pitchDown = (a.pageY - b.offset[1] - g) / g;
         this.updateRotationVector()
      }
   };
   this.mouseup = function (a)
   {
      a.preventDefault();
      a.stopPropagation();
      if (this.dragToLook)
      {
         this.mouseStatus--;
         this.moveState.yawLeft = this.moveState.pitchDown = 0
      }
      else switch (a.button)
      {
      case 0:
         this.moveForward =
            false;
         break;
      case 2:
         this.moveBackward = false
      }
      this.updateRotationVector()
   };
   this.update = function (a)
   {
      var b = a * this.movementSpeed,
         a = a * this.rollSpeed;
      this.object.translateX(this.moveVector.x * b);
      this.object.translateY(this.moveVector.y * b);
      this.object.translateZ(this.moveVector.z * b);
      this.tmpQuaternion.set(this.rotationVector.x * a, this.rotationVector.y *
         a, this.rotationVector.z * a, 1).normalize();
      this.object.quaternion.multiplySelf(this.tmpQuaternion);
      this.object.matrix.setPosition(this.object.position);
      this.object.matrix.setRotationFromQuaternion(this.object.quaternion);
      this.object.matrixWorldNeedsUpdate = true
   };
   this.updateMovementVector = function ()
   {
      var a = this.moveState.forward || this.autoForward && !this.moveState.back ?
         1 : 0;
      this.moveVector.x = -this.moveState.left + this.moveState.right;
      this.moveVector.y = -this.moveState.down + this.moveState.up;
      this.moveVector.z = -a + this.moveState.back
   };
   this.updateRotationVector = function ()
   {
      this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
      this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
      this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
   };
   this.getContainerDimensions = function ()
   {
      return this.domElement != document ?
      {
         size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
         offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
      } :
      {
         size: [window.innerWidth, window.innerHeight],
         offset: [0, 0]
      }
   };
   this.domElement.addEventListener("mousemove", c(this, this.mousemove), false);
   this.domElement.addEventListener("mousedown", c(this, this.mousedown), false);
   this.domElement.addEventListener("mouseup",
      c(this, this.mouseup), false);
   this.domElement.addEventListener("keydown", c(this, this.keydown), false);
   this.domElement.addEventListener("keyup", c(this, this.keyup), false);
   this.updateMovementVector();
   this.updateRotationVector()
};
THREE.RollControls = function (a, b)
{
   this.object = a;
   this.domElement = b !== void 0 ? b : document;
   this.mouseLook = true;
   this.autoForward = false;
   this.rollSpeed = this.movementSpeed = this.lookSpeed = 1;
   this.constrainVertical = [-0.9, 0.9];
   this.object.matrixAutoUpdate = false;
   this.forward = new THREE.Vector3(0, 0, 1);
   this.roll = 0;
   var c = new THREE.Vector3,
      d = new THREE.Vector3,
      e = new THREE.Vector3,
      f = new THREE.Matrix4,
      g = false,
      h = 1,
      i = 0,
      j = 0,
      l = 0,
      m = 0,
      n = 0,
      p = 0,
      r = 0;
   this.handleResize = function ()
   {
      p = window.innerWidth / 2;
      r = window.innerHeight / 2
   };
   this.update =
      function (a)
      {
         if (this.mouseLook)
         {
            var b = a * this.lookSpeed;
            this.rotateHorizontally(b * m);
            this.rotateVertically(b * n)
         }
         b = a * this.movementSpeed;
         this.object.translateZ(-b * (i > 0 || this.autoForward && !(i < 0) ? 1 :
            i));
         this.object.translateX(b * j);
         this.object.translateY(b * l);
         if (g) this.roll = this.roll + this.rollSpeed * a * h;
         if (this.forward.y > this.constrainVertical[1])
         {
            this.forward.y = this.constrainVertical[1];
            this.forward.normalize()
         }
         else if (this.forward.y < this.constrainVertical[0])
         {
            this.forward.y = this.constrainVertical[0];
            this.forward.normalize()
         }
         e.copy(this.forward);
         d.set(0, 1, 0);
         c.cross(d, e).normalize();
         d.cross(e, c).normalize();
         this.object.matrix.elements[0] = c.x;
         this.object.matrix.elements[4] = d.x;
         this.object.matrix.elements[8] = e.x;
         this.object.matrix.elements[1] = c.y;
         this.object.matrix.elements[5] = d.y;
         this.object.matrix.elements[9] = e.y;
         this.object.matrix.elements[2] = c.z;
         this.object.matrix.elements[6] = d.z;
         this.object.matrix.elements[10] = e.z;
         f.identity();
         f.elements[0] = Math.cos(this.roll);
         f.elements[4] = -Math.sin(this.roll);
         f.elements[1] = Math.sin(this.roll);
         f.elements[5] =
            Math.cos(this.roll);
         this.object.matrix.multiplySelf(f);
         this.object.matrixWorldNeedsUpdate = true;
         this.object.matrix.elements[12] = this.object.position.x;
         this.object.matrix.elements[13] = this.object.position.y;
         this.object.matrix.elements[14] = this.object.position.z
   };
   this.translateX = function (a)
   {
      this.object.position.x = this.object.position.x + this.object.matrix.elements[
         0] * a;
      this.object.position.y = this.object.position.y + this.object.matrix.elements[
         1] * a;
      this.object.position.z = this.object.position.z + this.object.matrix.elements[
         2] *
         a
   };
   this.translateY = function (a)
   {
      this.object.position.x = this.object.position.x + this.object.matrix.elements[
         4] * a;
      this.object.position.y = this.object.position.y + this.object.matrix.elements[
         5] * a;
      this.object.position.z = this.object.position.z + this.object.matrix.elements[
         6] * a
   };
   this.translateZ = function (a)
   {
      this.object.position.x = this.object.position.x - this.object.matrix.elements[
         8] * a;
      this.object.position.y = this.object.position.y - this.object.matrix.elements[
         9] * a;
      this.object.position.z = this.object.position.z -
         this.object.matrix.elements[10] * a
   };
   this.rotateHorizontally = function (a)
   {
      c.set(this.object.matrix.elements[0], this.object.matrix.elements[1],
         this.object.matrix.elements[2]);
      c.multiplyScalar(a);
      this.forward.subSelf(c);
      this.forward.normalize()
   };
   this.rotateVertically = function (a)
   {
      d.set(this.object.matrix.elements[4], this.object.matrix.elements[5],
         this.object.matrix.elements[6]);
      d.multiplyScalar(a);
      this.forward.addSelf(d);
      this.forward.normalize()
   };
   this.domElement.addEventListener("contextmenu", function (a)
      {
         a.preventDefault()
      },
      false);
   this.domElement.addEventListener("mousemove", function (a)
   {
      m = (a.clientX - p) / window.innerWidth;
      n = (a.clientY - r) / window.innerHeight
   }, false);
   this.domElement.addEventListener("mousedown", function (a)
   {
      a.preventDefault();
      a.stopPropagation();
      switch (a.button)
      {
      case 0:
         i = 1;
         break;
      case 2:
         i = -1
      }
   }, false);
   this.domElement.addEventListener("mouseup", function (a)
   {
      a.preventDefault();
      a.stopPropagation();
      switch (a.button)
      {
      case 0:
         i = 0;
         break;
      case 2:
         i = 0
      }
   }, false);
   this.domElement.addEventListener("keydown", function (a)
   {
      switch (a.keyCode)
      {
      case 38:
      case 87:
         i =
            1;
         break;
      case 37:
      case 65:
         j = -1;
         break;
      case 40:
      case 83:
         i = -1;
         break;
      case 39:
      case 68:
         j = 1;
         break;
      case 81:
         g = true;
         h = 1;
         break;
      case 69:
         g = true;
         h = -1;
         break;
      case 82:
         l = 1;
         break;
      case 70:
         l = -1
      }
   }, false);
   this.domElement.addEventListener("keyup", function (a)
   {
      switch (a.keyCode)
      {
      case 38:
      case 87:
         i = 0;
         break;
      case 37:
      case 65:
         j = 0;
         break;
      case 40:
      case 83:
         i = 0;
         break;
      case 39:
      case 68:
         j = 0;
         break;
      case 81:
         g = false;
         break;
      case 69:
         g = false;
         break;
      case 82:
         l = 0;
         break;
      case 70:
         l = 0
      }
   }, false);
   this.handleResize()
};
THREE.TrackballControls = function (a, b)
{
   THREE.EventTarget.call(this);
   var c = this;
   this.object = a;
   this.domElement = b !== void 0 ? b : document;
   this.enabled = true;
   this.screen = {
      width: 0,
      height: 0,
      offsetLeft: 0,
      offsetTop: 0
   };
   this.radius = (this.screen.width + this.screen.height) / 4;
   this.rotateSpeed = 1;
   this.zoomSpeed = 1.2;
   this.panSpeed = 0.3;
   this.staticMoving = this.noPan = this.noZoom = this.noRotate = false;
   this.dynamicDampingFactor = 0.2;
   this.minDistance = 0;
   this.maxDistance = Infinity;
   this.keys = [65, 83, 68];
   this.target = new THREE.Vector3;
   var d =
      new THREE.Vector3,
      e = false,
      f = -1,
      g = new THREE.Vector3,
      h = new THREE.Vector3,
      i = new THREE.Vector3,
      j = new THREE.Vector2,
      l = new THREE.Vector2,
      m = new THREE.Vector2,
      n = new THREE.Vector2,
      p = {
         type: "change"
      };
   this.handleResize = function ()
   {
      this.screen.width = window.innerWidth;
      this.screen.height = window.innerHeight;
      this.screen.offsetLeft = 0;
      this.screen.offsetTop = 0;
      this.radius = (this.screen.width + this.screen.height) / 4
   };
   this.handleEvent = function (a)
   {
      if (typeof this[a.type] == "function") this[a.type](a)
   };
   this.getMouseOnScreen = function (a,
      b)
   {
      return new THREE.Vector2((a - c.screen.offsetLeft) / c.radius * 0.5, (b -
         c.screen.offsetTop) / c.radius * 0.5)
   };
   this.getMouseProjectionOnBall = function (a, b)
   {
      var d = new THREE.Vector3((a - c.screen.width * 0.5 - c.screen.offsetLeft) /
         c.radius, (c.screen.height * 0.5 + c.screen.offsetTop - b) / c.radius,
         0),
         e = d.length();
      e > 1 ? d.normalize() : d.z = Math.sqrt(1 - e * e);
      g.copy(c.object.position).subSelf(c.target);
      e = c.object.up.clone().setLength(d.y);
      e.addSelf(c.object.up.clone().crossSelf(g).setLength(d.x));
      e.addSelf(g.setLength(d.z));
      return e
   };
   this.rotateCamera = function ()
   {
      var a = Math.acos(h.dot(i) / h.length() / i.length());
      if (a)
      {
         var b = (new THREE.Vector3).cross(h, i).normalize(),
            d = new THREE.Quaternion,
            a = a * c.rotateSpeed;
         d.setFromAxisAngle(b, -a);
         d.multiplyVector3(g);
         d.multiplyVector3(c.object.up);
         d.multiplyVector3(i);
         if (c.staticMoving) h = i;
         else
         {
            d.setFromAxisAngle(b, a * (c.dynamicDampingFactor - 1));
            d.multiplyVector3(h)
         }
      }
   };
   this.zoomCamera = function ()
   {
      var a = 1 + (l.y - j.y) * c.zoomSpeed;
      if (a !== 1 && a > 0)
      {
         g.multiplyScalar(a);
         c.staticMoving ? j = l : j.y = j.y + (l.y - j.y) *
            this.dynamicDampingFactor
      }
   };
   this.panCamera = function ()
   {
      var a = n.clone().subSelf(m);
      if (a.lengthSq())
      {
         a.multiplyScalar(g.length() * c.panSpeed);
         var b = g.clone().crossSelf(c.object.up).setLength(a.x);
         b.addSelf(c.object.up.clone().setLength(a.y));
         c.object.position.addSelf(b);
         c.target.addSelf(b);
         c.staticMoving ? m = n : m.addSelf(a.sub(n, m).multiplyScalar(c.dynamicDampingFactor))
      }
   };
   this.checkDistances = function ()
   {
      if (!c.noZoom || !c.noPan)
      {
         c.object.position.lengthSq() > c.maxDistance * c.maxDistance && c.object
            .position.setLength(c.maxDistance);
         g.lengthSq() < c.minDistance * c.minDistance && c.object.position.add(
            c.target, g.setLength(c.minDistance))
      }
   };
   this.update = function ()
   {
      g.copy(c.object.position).subSelf(c.target);
      c.noRotate || c.rotateCamera();
      c.noZoom || c.zoomCamera();
      c.noPan || c.panCamera();
      c.object.position.add(c.target, g);
      c.checkDistances();
      c.object.lookAt(c.target);
      if (d.distanceToSquared(c.object.position) > 0)
      {
         c.dispatchEvent(p);
         d.copy(c.object.position)
      }
   };
   this.domElement.addEventListener("contextmenu", function (a)
   {
      a.preventDefault()
   }, false);
   this.domElement.addEventListener("mousemove", function (a)
   {
      if (c.enabled)
      {
         if (e)
         {
            h = i = c.getMouseProjectionOnBall(a.clientX, a.clientY);
            j = l = c.getMouseOnScreen(a.clientX, a.clientY);
            m = n = c.getMouseOnScreen(a.clientX, a.clientY);
            e = false
         }
         f !== -1 && (f === 0 && !c.noRotate ? i = c.getMouseProjectionOnBall(
            a.clientX, a.clientY) : f === 1 && !c.noZoom ? l = c.getMouseOnScreen(
            a.clientX, a.clientY) : f === 2 && !c.noPan && (n = c.getMouseOnScreen(
            a.clientX, a.clientY)))
      }
   }, false);
   this.domElement.addEventListener("mousedown", function (a)
   {
      if (c.enabled)
      {
         a.preventDefault();
         a.stopPropagation();
         if (f === -1)
         {
            f = a.button;
            f === 0 && !c.noRotate ? h = i = c.getMouseProjectionOnBall(a.clientX,
               a.clientY) : f === 1 && !c.noZoom ? j = l = c.getMouseOnScreen(
               a.clientX, a.clientY) : this.noPan || (m = n = c.getMouseOnScreen(
               a.clientX, a.clientY))
         }
      }
   }, false);
   this.domElement.addEventListener("mouseup", function (a)
   {
      if (c.enabled)
      {
         a.preventDefault();
         a.stopPropagation();
         f = -1
      }
   }, false);
   window.addEventListener("keydown", function (a)
   {
      if (c.enabled && f === -1)
      {
         a.keyCode === c.keys[0] && !c.noRotate ? f = 0 : a.keyCode === c.keys[
            1] && !c.noZoom ?
            f = 1 : a.keyCode === c.keys[2] && !c.noPan && (f = 2);
         f !== -1 && (e = true)
      }
   }, false);
   window.addEventListener("keyup", function ()
   {
      c.enabled && f !== -1 && (f = -1)
   }, false);
   this.handleResize()
};
THREE.OrbitControls = function (a, b)
{
   var c, d, e;

   function f()
   {
      return 2 * Math.PI / 60 / 60 * i.autoRotateSpeed
   }

   function g(a)
   {
      a.preventDefault();
      if (v === c)
      {
         m.set(a.clientX, a.clientY);
         n.sub(m, l);
         i.rotateLeft(2 * Math.PI * n.x / j * i.userRotateSpeed);
         i.rotateUp(2 * Math.PI * n.y / j * i.userRotateSpeed);
         l.copy(m)
      }
      else if (v === d)
      {
         r.set(a.clientX, a.clientY);
         o.sub(r, p);
         o.y > 0 ? i.zoomIn() : i.zoomOut();
         p.copy(r)
      }
   }

   function h()
   {
      if (i.userRotate)
      {
         document.removeEventListener("mousemove", g, false);
         document.removeEventListener("mouseup", h, false);
         v = e
      }
   }
   THREE.EventTarget.call(this);
   this.object = a;
   this.domElement = b !== void 0 ? b : document;
   this.center = new THREE.Vector3;
   this.userZoom = true;
   this.userZoomSpeed = 1;
   this.userRotate = true;
   this.userRotateSpeed = 1;
   this.autoRotate = false;
   this.autoRotateSpeed = 2;
   var i = this,
      j = 1800,
      l = new THREE.Vector2,
      m = new THREE.Vector2,
      n = new THREE.Vector2,
      p = new THREE.Vector2,
      r = new THREE.Vector2,
      o = new THREE.Vector2,
      q = 0,
      s = 0,
      w = 1,
      t = new THREE.Vector3;
   e = -1;
   c = 0;
   d = 1;
   var v = e,
      x = {
         type: "change"
      };
   this.rotateLeft = function (a)
   {
      a === void 0 && (a = f());
      s = s - a
   };
   this.rotateRight = function (a)
   {
      a === void 0 && (a = f());
      s = s + a
   };
   this.rotateUp = function (a)
   {
      a === void 0 && (a = f());
      q = q - a
   };
   this.rotateDown = function (a)
   {
      a === void 0 && (a = f());
      q = q + a
   };
   this.zoomIn = function (a)
   {
      a === void 0 && (a = Math.pow(0.95, i.userZoomSpeed));
      w = w / a
   };
   this.zoomOut = function (a)
   {
      a === void 0 && (a = Math.pow(0.95, i.userZoomSpeed));
      w = w * a
   };
   this.update = function ()
   {
      var a = this.object.position,
         b = a.clone().subSelf(this.center),
         c = Math.atan2(b.x, b.z),
         d = Math.atan2(Math.sqrt(b.x * b.x + b.z * b.z), b.y);
      this.autoRotate && this.rotateLeft(f());
      var c = c + s,
         d = d + q,
         d = Math.max(1.0E-6, Math.min(Math.PI - 1.0E-6, d)),
         e = b.length();
      b.x = e * Math.sin(d) * Math.sin(c);
      b.y = e * Math.cos(d);
      b.z = e * Math.sin(d) * Math.cos(c);
      b.multiplyScalar(w);
      a.copy(this.center).addSelf(b);
      this.object.lookAt(this.center);
      q = s = 0;
      w = 1;
      if (t.distanceTo(this.object.position) > 0)
      {
         this.dispatchEvent(x);
         t.copy(this.object.position)
      }
   };
   this.domElement.addEventListener("contextmenu", function (a)
   {
      a.preventDefault()
   }, false);
   this.domElement.addEventListener("mousedown", function (a)
   {
      if (i.userRotate)
      {
         a.preventDefault();
         if (a.button === 0 || a.button === 2)
         {
            v = c;
            l.set(a.clientX, a.clientY)
         }
         else if (a.button === 1)
         {
            v = d;
            p.set(a.clientX, a.clientY)
         }
         document.addEventListener("mousemove", g, false);
         document.addEventListener("mouseup", h, false)
      }
   }, false);
   this.domElement.addEventListener("mousewheel", function (a)
   {
      i.userZoom && (a.wheelDelta > 0 ? i.zoomOut() : i.zoomIn())
   }, false)
};
THREE.CubeGeometry = function (a, b, c, d, e, f, g, h)
{
   function i(a, b, c, g, h, i, l, m)
   {
      var n, p = d || 1,
         o = e || 1,
         q = h / 2,
         r = i / 2,
         s = j.vertices.length;
      if (a === "x" && b === "y" || a === "y" && b === "x") n = "z";
      else if (a === "x" && b === "z" || a === "z" && b === "x")
      {
         n = "y";
         o = f || 1
      }
      else if (a === "z" && b === "y" || a === "y" && b === "z")
      {
         n = "x";
         p = f || 1
      }
      var t = p + 1,
         w = o + 1,
         T = h / p,
         N = i / o,
         W = new THREE.Vector3;
      W[n] = l > 0 ? 1 : -1;
      for (h = 0; h < w; h++)
         for (i = 0; i < t; i++)
         {
            var ba = new THREE.Vector3;
            ba[a] = (i * T - q) * c;
            ba[b] = (h * N - r) * g;
            ba[n] = l;
            j.vertices.push(ba)
         }
      for (h = 0; h < o; h++)
         for (i = 0; i < p; i++)
         {
            a = new THREE.Face4(i +
               t * h + s, i + t * (h + 1) + s, i + 1 + t * (h + 1) + s, i + 1 +
               t * h + s);
            a.normal.copy(W);
            a.vertexNormals.push(W.clone(), W.clone(), W.clone(), W.clone());
            a.materialIndex = m;
            j.faces.push(a);
            j.faceVertexUvs[0].push([new THREE.UV(i / p, 1 - h / o), new THREE.UV(
               i / p, 1 - (h + 1) / o), new THREE.UV((i + 1) / p, 1 - (h +
               1) / o), new THREE.UV((i + 1) / p, 1 - h / o)])
         }
   }
   THREE.Geometry.call(this);
   var j = this,
      l = a / 2,
      m = b / 2,
      n = c / 2,
      p, r, o, q, s, w;
   if (g !== void 0)
   {
      if (g instanceof Array) this.materials = g;
      else
      {
         this.materials = [];
         for (p = 0; p < 6; p++) this.materials.push(g)
      }
      p = 0;
      q = 1;
      r = 2;
      s = 3;
      o = 4;
      w =
         5
   }
   else this.materials = [];
   this.sides = {
      px: true,
      nx: true,
      py: true,
      ny: true,
      pz: true,
      nz: true
   };
   if (h != void 0)
      for (var t in h) this.sides[t] !== void 0 && (this.sides[t] = h[t]);
   this.sides.px && i("z", "y", -1, -1, c, b, l, p);
   this.sides.nx && i("z", "y", 1, -1, c, b, -l, q);
   this.sides.py && i("x", "z", 1, 1, a, c, m, r);
   this.sides.ny && i("x", "z", 1, -1, a, c, -m, s);
   this.sides.pz && i("x", "y", 1, -1, a, b, n, o);
   this.sides.nz && i("x", "y", -1, -1, a, b, -n, w);
   this.computeCentroids();
   this.mergeVertices()
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function (a, b, c, d, e, f)
{
   THREE.Geometry.call(this);
   var a = a !== void 0 ? a : 20,
      b = b !== void 0 ? b : 20,
      c = c !== void 0 ? c : 100,
      g = c / 2,
      d = d || 8,
      e = e || 1,
      h, i, j = [],
      l = [];
   for (i = 0; i <= e; i++)
   {
      var m = [],
         n = [],
         p = i / e,
         r = p * (b - a) + a;
      for (h = 0; h <= d; h++)
      {
         var o = h / d,
            q = new THREE.Vector3;
         q.x = r * Math.sin(o * Math.PI * 2);
         q.y = -p * c + g;
         q.z = r * Math.cos(o * Math.PI * 2);
         this.vertices.push(q);
         m.push(this.vertices.length - 1);
         n.push(new THREE.UV(o, p))
      }
      j.push(m);
      l.push(n)
   }
   c = (b - a) / c;
   for (h = 0; h < d; h++)
   {
      if (a !== 0)
      {
         m = this.vertices[j[0][h]].clone();
         n = this.vertices[j[0][h +
            1
         ]].clone()
      }
      else
      {
         m = this.vertices[j[1][h]].clone();
         n = this.vertices[j[1][h + 1]].clone()
      }
      m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
      n.setY(Math.sqrt(n.x * n.x + n.z * n.z) * c).normalize();
      for (i = 0; i < e; i++)
      {
         var p = j[i][h],
            r = j[i + 1][h],
            o = j[i + 1][h + 1],
            q = j[i][h + 1],
            s = m.clone(),
            w = m.clone(),
            t = n.clone(),
            v = n.clone(),
            x = l[i][h].clone(),
            C = l[i + 1][h].clone(),
            D = l[i + 1][h + 1].clone(),
            z = l[i][h + 1].clone();
         this.faces.push(new THREE.Face4(p, r, o, q, [s, w, t, v]));
         this.faceVertexUvs[0].push([x, C, D, z])
      }
   }
   if (!f && a > 0)
   {
      this.vertices.push(new THREE.Vector3(0,
         g, 0));
      for (h = 0; h < d; h++)
      {
         p = j[0][h];
         r = j[0][h + 1];
         o = this.vertices.length - 1;
         s = new THREE.Vector3(0, 1, 0);
         w = new THREE.Vector3(0, 1, 0);
         t = new THREE.Vector3(0, 1, 0);
         x = l[0][h].clone();
         C = l[0][h + 1].clone();
         D = new THREE.UV(C.u, 0);
         this.faces.push(new THREE.Face3(p, r, o, [s, w, t]));
         this.faceVertexUvs[0].push([x, C, D])
      }
   }
   if (!f && b > 0)
   {
      this.vertices.push(new THREE.Vector3(0, -g, 0));
      for (h = 0; h < d; h++)
      {
         p = j[i][h + 1];
         r = j[i][h];
         o = this.vertices.length - 1;
         s = new THREE.Vector3(0, -1, 0);
         w = new THREE.Vector3(0, -1, 0);
         t = new THREE.Vector3(0, -1, 0);
         x = l[i][h + 1].clone();
         C = l[i][h].clone();
         D = new THREE.UV(C.u, 1);
         this.faces.push(new THREE.Face3(p, r, o, [s, w, t]));
         this.faceVertexUvs[0].push([x, C, D])
      }
   }
   this.computeCentroids();
   this.computeFaceNormals()
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function (a, b)
{
   if (typeof a !== "undefined")
   {
      THREE.Geometry.call(this);
      a = a instanceof Array ? a : [a];
      this.shapebb = a[a.length - 1].getBoundingBox();
      this.addShapeList(a, b);
      this.computeCentroids();
      this.computeFaceNormals()
   }
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b)
{
   for (var c = a.length, d = 0; d < c; d++) this.addShape(a[d], b)
};
THREE.ExtrudeGeometry.prototype.addShape = function (a, b)
{
   function c(a, b, c)
   {
      b || console.log("die");
      return b.clone().multiplyScalar(c).addSelf(a)
   }

   function d(a, b, c)
   {
      var d = THREE.ExtrudeGeometry.__v1,
         e = THREE.ExtrudeGeometry.__v2,
         f = THREE.ExtrudeGeometry.__v3,
         g = THREE.ExtrudeGeometry.__v4,
         h = THREE.ExtrudeGeometry.__v5,
         i = THREE.ExtrudeGeometry.__v6;
      d.set(a.x - b.x, a.y - b.y);
      e.set(a.x - c.x, a.y - c.y);
      d = d.normalize();
      e = e.normalize();
      f.set(-d.y, d.x);
      g.set(e.y, -e.x);
      h.copy(a).addSelf(f);
      i.copy(a).addSelf(g);
      if (h.equals(i)) return g.clone();
      h.copy(b).addSelf(f);
      i.copy(c).addSelf(g);
      f = d.dot(g);
      g = i.subSelf(h).dot(g);
      if (f === 0)
      {
         console.log("Either infinite or no solutions!");
         g === 0 ? console.log("Its finite solutions.") : console.log(
            "Too bad, no solutions.")
      }
      g = g / f;
      if (g < 0)
      {
         b = Math.atan2(b.y - a.y, b.x - a.x);
         a = Math.atan2(c.y - a.y, c.x - a.x);
         b > a && (a = a + Math.PI * 2);
         c = (b + a) / 2;
         a = -Math.cos(c);
         c = -Math.sin(c);
         return new THREE.Vector2(a, c)
      }
      return d.multiplyScalar(g).addSelf(h).subSelf(a).clone()
   }

   function e(c, d)
   {
      var e, f;
      for (H = c.length; --H >= 0;)
      {
         e = H;
         f = H - 1;
         f < 0 && (f =
            c.length - 1);
         for (var g = 0, h = n + l * 2, g = 0; g < h; g++)
         {
            var i = N * g,
               j = N * (g + 1),
               m = d + e + i,
               i = d + f + i,
               p = d + f + j,
               j = d + e + j,
               o = c,
               q = g,
               r = h,
               s = e,
               u = f,
               m = m + M,
               i = i + M,
               p = p + M,
               j = j + M;
            J.faces.push(new THREE.Face4(m, i, p, j, null, null, w));
            m = t.generateSideWallUV(J, a, o, b, m, i, p, j, q, r, s, u);
            J.faceVertexUvs[0].push(m)
         }
      }
   }

   function f(a, b, c)
   {
      J.vertices.push(new THREE.Vector3(a, b, c))
   }

   function g(c, d, e, f)
   {
      c = c + M;
      d = d + M;
      e = e + M;
      J.faces.push(new THREE.Face3(c, d, e, null, null, s));
      c = f ? t.generateBottomUV(J, a, b, c, d, e) : t.generateTopUV(J, a, b, c,
         d, e);
      J.faceVertexUvs[0].push(c)
   }
   var h = b.amount !== void 0 ? b.amount : 100,
      i = b.bevelThickness !== void 0 ? b.bevelThickness : 6,
      j = b.bevelSize !== void 0 ? b.bevelSize : i - 2,
      l = b.bevelSegments !== void 0 ? b.bevelSegments : 3,
      m = b.bevelEnabled !== void 0 ? b.bevelEnabled : true,
      n = b.steps !== void 0 ? b.steps : 1,
      p = b.bendPath,
      r = b.extrudePath,
      o, q = false,
      s = b.material,
      w = b.extrudeMaterial,
      t = b.UVGenerator !== void 0 ? b.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator,
      v, x, C, D;
   if (r)
   {
      o = r.getSpacedPoints(n);
      q = true;
      m = false;
      v = b.frames !== void 0 ? b.frames : new THREE.TubeGeometry.FrenetFrames(
         r,
         n, false);
      x = new THREE.Vector3;
      C = new THREE.Vector3;
      D = new THREE.Vector3
   }
   if (!m) j = i = l = 0;
   var z, u, G, J = this,
      M = this.vertices.length;
   p && a.addWrapPath(p);
   var r = a.extractPoints(),
      p = r.shape,
      O = r.holes;
   if (r = !THREE.Shape.Utils.isClockWise(p))
   {
      p = p.reverse();
      u = 0;
      for (G = O.length; u < G; u++)
      {
         z = O[u];
         THREE.Shape.Utils.isClockWise(z) && (O[u] = z.reverse())
      }
      r = false
   }
   var X = THREE.Shape.Utils.triangulateShape(p, O),
      B = p;
   u = 0;
   for (G = O.length; u < G; u++)
   {
      z = O[u];
      p = p.concat(z)
   }
   var F, Q, E, aa, T, N = p.length,
      W, ba = X.length,
      r = [],
      H = 0;
   E = B.length;
   F = E - 1;
   for (Q = H + 1; H < E; H++, F++, Q++)
   {
      F === E && (F = 0);
      Q === E && (Q = 0);
      r[H] = d(B[H], B[F], B[Q])
   }
   var ca = [],
      ia, S = r.concat();
   u = 0;
   for (G = O.length; u < G; u++)
   {
      z = O[u];
      ia = [];
      H = 0;
      E = z.length;
      F = E - 1;
      for (Q = H + 1; H < E; H++, F++, Q++)
      {
         F === E && (F = 0);
         Q === E && (Q = 0);
         ia[H] = d(z[H], z[F], z[Q])
      }
      ca.push(ia);
      S = S.concat(ia)
   }
   for (F = 0; F < l; F++)
   {
      E = F / l;
      aa = i * (1 - E);
      Q = j * Math.sin(E * Math.PI / 2);
      H = 0;
      for (E = B.length; H < E; H++)
      {
         T = c(B[H], r[H], Q);
         f(T.x, T.y, -aa)
      }
      u = 0;
      for (G = O.length; u < G; u++)
      {
         z = O[u];
         ia = ca[u];
         H = 0;
         for (E = z.length; H < E; H++)
         {
            T = c(z[H], ia[H], Q);
            f(T.x, T.y, -aa)
         }
      }
   }
   Q = j;
   for (H =
      0; H < N; H++)
   {
      T = m ? c(p[H], S[H], Q) : p[H];
      if (q)
      {
         C.copy(v.normals[0]).multiplyScalar(T.x);
         x.copy(v.binormals[0]).multiplyScalar(T.y);
         D.copy(o[0]).addSelf(C).addSelf(x);
         f(D.x, D.y, D.z)
      }
      else f(T.x, T.y, 0)
   }
   for (E = 1; E <= n; E++)
      for (H = 0; H < N; H++)
      {
         T = m ? c(p[H], S[H], Q) : p[H];
         if (q)
         {
            C.copy(v.normals[E]).multiplyScalar(T.x);
            x.copy(v.binormals[E]).multiplyScalar(T.y);
            D.copy(o[E]).addSelf(C).addSelf(x);
            f(D.x, D.y, D.z)
         }
         else f(T.x, T.y, h / n * E)
      }
   for (F = l - 1; F >= 0; F--)
   {
      E = F / l;
      aa = i * (1 - E);
      Q = j * Math.sin(E * Math.PI / 2);
      H = 0;
      for (E = B.length; H < E; H++)
      {
         T =
            c(B[H], r[H], Q);
         f(T.x, T.y, h + aa)
      }
      u = 0;
      for (G = O.length; u < G; u++)
      {
         z = O[u];
         ia = ca[u];
         H = 0;
         for (E = z.length; H < E; H++)
         {
            T = c(z[H], ia[H], Q);
            q ? f(T.x, T.y + o[n - 1].y, o[n - 1].x + aa) : f(T.x, T.y, h + aa)
         }
      }
   }(function ()
   {
      if (m)
      {
         var a;
         a = N * 0;
         for (H = 0; H < ba; H++)
         {
            W = X[H];
            g(W[2] + a, W[1] + a, W[0] + a, true)
         }
         a = n + l * 2;
         a = N * a;
         for (H = 0; H < ba; H++)
         {
            W = X[H];
            g(W[0] + a, W[1] + a, W[2] + a, false)
         }
      }
      else
      {
         for (H = 0; H < ba; H++)
         {
            W = X[H];
            g(W[2], W[1], W[0], true)
         }
         for (H = 0; H < ba; H++)
         {
            W = X[H];
            g(W[0] + N * n, W[1] + N * n, W[2] + N * n, false)
         }
      }
   })();
   (function ()
   {
      var a = 0;
      e(B, a);
      a = a + B.length;
      u = 0;
      for (G = O.length; u <
         G; u++)
      {
         z = O[u];
         e(z, a);
         a = a + z.length
      }
   })()
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
   generateTopUV: function (a, b, c, d, e, f)
   {
      b = a.vertices[e].x;
      e = a.vertices[e].y;
      c = a.vertices[f].x;
      f = a.vertices[f].y;
      return [new THREE.UV(a.vertices[d].x, 1 - a.vertices[d].y), new THREE.UV(
         b, 1 - e), new THREE.UV(c, 1 - f)]
   },
   generateBottomUV: function (a, b, c, d, e, f)
   {
      return this.generateTopUV(a, b, c, d, e, f)
   },
   generateSideWallUV: function (a, b, c, d, e, f, g, h)
   {
      var b = a.vertices[e].x,
         c = a.vertices[e].y,
         e = a.vertices[e].z,
         d = a.vertices[f].x,
         i = a.vertices[f].y,
         f = a.vertices[f].z,
         j = a.vertices[g].x,
         l =
            a.vertices[g].y,
         g = a.vertices[g].z,
         m = a.vertices[h].x,
         n = a.vertices[h].y,
         a = a.vertices[h].z;
      return Math.abs(c - i) < 0.01 ? [new THREE.UV(b, e), new THREE.UV(d, f),
         new THREE.UV(j, g), new THREE.UV(m, a)
      ] : [new THREE.UV(c, e), new THREE.UV(i, f), new THREE.UV(l, g), new THREE
         .UV(n, a)
      ]
   }
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2;
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2;
THREE.LatheGeometry = function (a, b, c)
{
   THREE.Geometry.call(this);
   for (var b = b || 12, c = c || 2 * Math.PI, d = [], e = (new THREE.Matrix4).makeRotationZ(
         c / b), f = 0; f < a.length; f++)
   {
      d[f] = a[f].clone();
      this.vertices.push(d[f])
   }
   for (var g = b + 1, c = 0; c < g; c++)
      for (f = 0; f < d.length; f++)
      {
         d[f] = e.multiplyVector3(d[f].clone());
         this.vertices.push(d[f])
      }
   for (c = 0; c < b; c++)
   {
      d = 0;
      for (e = a.length; d < e - 1; d++)
      {
         this.faces.push(new THREE.Face4(c * e + d, (c + 1) % g * e + d, (c + 1) %
            g * e + (d + 1) % e, c * e + (d + 1) % e));
         this.faceVertexUvs[0].push([new THREE.UV(1 - c / b, d / e), new THREE.UV(
            1 -
            (c + 1) / b, d / e), new THREE.UV(1 - (c + 1) / b, (d + 1) /
            e), new THREE.UV(1 - c / b, (d + 1) / e)])
      }
   }
   this.computeCentroids();
   this.computeFaceNormals();
   this.computeVertexNormals()
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function (a, b, c, d)
{
   THREE.Geometry.call(this);
   for (var e = a / 2, f = b / 2, c = c || 1, d = d || 1, g = c + 1, h = d + 1,
         i = a / c, j = b / d, l = new THREE.Vector3(0, 1, 0), a = 0; a < h; a++
   )
      for (b = 0; b < g; b++) this.vertices.push(new THREE.Vector3(b * i - e, 0,
         a * j - f));
   for (a = 0; a < d; a++)
      for (b = 0; b < c; b++)
      {
         e = new THREE.Face4(b + g * a, b + g * (a + 1), b + 1 + g * (a + 1), b +
            1 + g * a);
         e.normal.copy(l);
         e.vertexNormals.push(l.clone(), l.clone(), l.clone(), l.clone());
         this.faces.push(e);
         this.faceVertexUvs[0].push([new THREE.UV(b / c, 1 - a / d), new THREE.UV(
            b / c, 1 - (a + 1) / d), new THREE.UV((b +
            1) / c, 1 - (a + 1) / d), new THREE.UV((b + 1) / c, 1 - a / d)])
      }
   this.computeCentroids()
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function (a, b, c, d, e, f, g)
{
   THREE.Geometry.call(this);
   var a = a || 50,
      d = d !== void 0 ? d : 0,
      e = e !== void 0 ? e : Math.PI * 2,
      f = f !== void 0 ? f : 0,
      g = g !== void 0 ? g : Math.PI,
      b = Math.max(3, Math.floor(b) || 8),
      c = Math.max(2, Math.floor(c) || 6),
      h, i, j = [],
      l = [];
   for (i = 0; i <= c; i++)
   {
      var m = [],
         n = [];
      for (h = 0; h <= b; h++)
      {
         var p = h / b,
            r = i / c,
            o = new THREE.Vector3;
         o.x = -a * Math.cos(d + p * e) * Math.sin(f + r * g);
         o.y = a * Math.cos(f + r * g);
         o.z = a * Math.sin(d + p * e) * Math.sin(f + r * g);
         this.vertices.push(o);
         m.push(this.vertices.length - 1);
         n.push(new THREE.UV(p,
            1 - r))
      }
      j.push(m);
      l.push(n)
   }
   for (i = 0; i < c; i++)
      for (h = 0; h < b; h++)
      {
         var d = j[i][h + 1],
            e = j[i][h],
            f = j[i + 1][h],
            g = j[i + 1][h + 1],
            m = this.vertices[d].clone().normalize(),
            n = this.vertices[e].clone().normalize(),
            p = this.vertices[f].clone().normalize(),
            r = this.vertices[g].clone().normalize(),
            o = l[i][h + 1].clone(),
            q = l[i][h].clone(),
            s = l[i + 1][h].clone(),
            w = l[i + 1][h + 1].clone();
         if (Math.abs(this.vertices[d].y) == a)
         {
            this.faces.push(new THREE.Face3(d, f, g, [m, p, r]));
            this.faceVertexUvs[0].push([o, s, w])
         }
         else if (Math.abs(this.vertices[f].y) ==
            a)
         {
            this.faces.push(new THREE.Face3(d, e, f, [m, n, p]));
            this.faceVertexUvs[0].push([o, q, s])
         }
         else
         {
            this.faces.push(new THREE.Face4(d, e, f, g, [m, n, p, r]));
            this.faceVertexUvs[0].push([o, q, s, w])
         }
      }
   this.computeCentroids();
   this.computeFaceNormals();
   this.boundingSphere = {
      radius: a
   }
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function (a, b)
{
   var c = THREE.FontUtils.generateShapes(a, b);
   b.amount = b.height !== void 0 ? b.height : 50;
   if (b.bevelThickness === void 0) b.bevelThickness = 10;
   if (b.bevelSize === void 0) b.bevelSize = 8;
   if (b.bevelEnabled === void 0) b.bevelEnabled = false;
   if (b.bend)
   {
      var d = c[c.length - 1].getBoundingBox().maxX;
      b.bendPath = new THREE.QuadraticBezierCurve(new THREE.Vector2(0, 0), new THREE
         .Vector2(d / 2, 120), new THREE.Vector2(d, 0))
   }
   THREE.ExtrudeGeometry.call(this, c, b)
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function (a, b, c, d, e)
{
   THREE.Geometry.call(this);
   this.radius = a || 100;
   this.tube = b || 40;
   this.segmentsR = c || 8;
   this.segmentsT = d || 6;
   this.arc = e || Math.PI * 2;
   e = new THREE.Vector3;
   a = [];
   b = [];
   for (c = 0; c <= this.segmentsR; c++)
      for (d = 0; d <= this.segmentsT; d++)
      {
         var f = d / this.segmentsT * this.arc,
            g = c / this.segmentsR * Math.PI * 2;
         e.x = this.radius * Math.cos(f);
         e.y = this.radius * Math.sin(f);
         var h = new THREE.Vector3;
         h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f);
         h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f);
         h.z =
            this.tube * Math.sin(g);
         this.vertices.push(h);
         a.push(new THREE.UV(d / this.segmentsT, 1 - c / this.segmentsR));
         b.push(h.clone().subSelf(e).normalize())
      }
   for (c = 1; c <= this.segmentsR; c++)
      for (d = 1; d <= this.segmentsT; d++)
      {
         var e = (this.segmentsT + 1) * c + d - 1,
            f = (this.segmentsT + 1) * (c - 1) + d - 1,
            g = (this.segmentsT + 1) * (c - 1) + d,
            h = (this.segmentsT + 1) * c + d,
            i = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
         i.normal.addSelf(b[e]);
         i.normal.addSelf(b[f]);
         i.normal.addSelf(b[g]);
         i.normal.addSelf(b[h]);
         i.normal.normalize();
         this.faces.push(i);
         this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[g].clone(),
            a[h].clone()
         ])
      }
   this.computeCentroids()
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function (a, b, c, d, e, f, g)
{
   function h(a, b, c, d, e, f)
   {
      var g = Math.cos(a);
      Math.cos(b);
      b = Math.sin(a);
      a = c / d * a;
      c = Math.cos(a);
      g = e * (2 + c) * 0.5 * g;
      b = e * (2 + c) * b * 0.5;
      e = f * e * Math.sin(a) * 0.5;
      return new THREE.Vector3(g, b, e)
   }
   THREE.Geometry.call(this);
   this.radius = a || 200;
   this.tube = b || 40;
   this.segmentsR = c || 64;
   this.segmentsT = d || 8;
   this.p = e || 2;
   this.q = f || 3;
   this.heightScale = g || 1;
   this.grid = Array(this.segmentsR);
   c = new THREE.Vector3;
   d = new THREE.Vector3;
   e = new THREE.Vector3;
   for (a = 0; a < this.segmentsR; ++a)
   {
      this.grid[a] =
         Array(this.segmentsT);
      for (b = 0; b < this.segmentsT; ++b)
      {
         var i = a / this.segmentsR * 2 * this.p * Math.PI,
            g = b / this.segmentsT * 2 * Math.PI,
            f = h(i, g, this.q, this.p, this.radius, this.heightScale),
            i = h(i + 0.01, g, this.q, this.p, this.radius, this.heightScale);
         c.sub(i, f);
         d.add(i, f);
         e.cross(c, d);
         d.cross(e, c);
         e.normalize();
         d.normalize();
         i = -this.tube * Math.cos(g);
         g = this.tube * Math.sin(g);
         f.x = f.x + (i * d.x + g * e.x);
         f.y = f.y + (i * d.y + g * e.y);
         f.z = f.z + (i * d.z + g * e.z);
         this.grid[a][b] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) -
            1
      }
   }
   for (a = 0; a <
      this.segmentsR; ++a)
      for (b = 0; b < this.segmentsT; ++b)
      {
         var e = (a + 1) % this.segmentsR,
            f = (b + 1) % this.segmentsT,
            c = this.grid[a][b],
            d = this.grid[e][b],
            e = this.grid[e][f],
            f = this.grid[a][f],
            g = new THREE.UV(a / this.segmentsR, b / this.segmentsT),
            i = new THREE.UV((a + 1) / this.segmentsR, b / this.segmentsT),
            j = new THREE.UV((a + 1) / this.segmentsR, (b + 1) / this.segmentsT),
            l = new THREE.UV(a / this.segmentsR, (b + 1) / this.segmentsT);
         this.faces.push(new THREE.Face4(c, d, e, f));
         this.faceVertexUvs[0].push([g, i, j, l])
      }
   this.computeCentroids();
   this.computeFaceNormals();
   this.computeVertexNormals()
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function (a, b, c, d, e, f)
{
   THREE.Geometry.call(this);
   this.path = a;
   this.segments = b || 64;
   this.radius = c || 1;
   this.segmentsRadius = d || 8;
   this.closed = e || false;
   if (f) this.debug = new THREE.Object3D;
   this.grid = [];
   var g, h, f = this.segments + 1,
      i, j, l, m = new THREE.Vector3,
      n, p, r, b = new THREE.TubeGeometry.FrenetFrames(a, b, e);
   n = b.tangents;
   p = b.normals;
   r = b.binormals;
   this.tangents = n;
   this.normals = p;
   this.binormals = r;
   for (b = 0; b < f; b++)
   {
      this.grid[b] = [];
      d = b / (f - 1);
      l = a.getPointAt(d);
      d = n[b];
      g = p[b];
      h = r[b];
      if (this.debug)
      {
         this.debug.add(new THREE.ArrowHelper(d,
            l, c, 255));
         this.debug.add(new THREE.ArrowHelper(g, l, c, 16711680));
         this.debug.add(new THREE.ArrowHelper(h, l, c, 65280))
      }
      for (d = 0; d < this.segmentsRadius; d++)
      {
         i = d / this.segmentsRadius * 2 * Math.PI;
         j = -this.radius * Math.cos(i);
         i = this.radius * Math.sin(i);
         m.copy(l);
         m.x = m.x + (j * g.x + i * h.x);
         m.y = m.y + (j * g.y + i * h.y);
         m.z = m.z + (j * g.z + i * h.z);
         this.grid[b][d] = this.vertices.push(new THREE.Vector3(m.x, m.y, m.z)) -
            1
      }
   }
   for (b = 0; b < this.segments; b++)
      for (d = 0; d < this.segmentsRadius; d++)
      {
         f = e ? (b + 1) % this.segments : b + 1;
         m = (d + 1) % this.segmentsRadius;
         a = this.grid[b][d];
         c = this.grid[f][d];
         f = this.grid[f][m];
         m = this.grid[b][m];
         n = new THREE.UV(b / this.segments, d / this.segmentsRadius);
         p = new THREE.UV((b + 1) / this.segments, d / this.segmentsRadius);
         r = new THREE.UV((b + 1) / this.segments, (d + 1) / this.segmentsRadius);
         g = new THREE.UV(b / this.segments, (d + 1) / this.segmentsRadius);
         this.faces.push(new THREE.Face4(a, c, f, m));
         this.faceVertexUvs[0].push([n, p, r, g])
      }
   this.computeCentroids();
   this.computeFaceNormals();
   this.computeVertexNormals()
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function (a, b, c)
{
   new THREE.Vector3;
   var d = new THREE.Vector3;
   new THREE.Vector3;
   var e = [],
      f = [],
      g = [],
      h = new THREE.Vector3,
      i = new THREE.Matrix4,
      b = b + 1,
      j, l, m;
   this.tangents = e;
   this.normals = f;
   this.binormals = g;
   for (j = 0; j < b; j++)
   {
      l = j / (b - 1);
      e[j] = a.getTangentAt(l);
      e[j].normalize()
   }
   f[0] = new THREE.Vector3;
   g[0] = new THREE.Vector3;
   a = Number.MAX_VALUE;
   j = Math.abs(e[0].x);
   l = Math.abs(e[0].y);
   m = Math.abs(e[0].z);
   if (j <= a)
   {
      a = j;
      d.set(1, 0, 0)
   }
   if (l <= a)
   {
      a = l;
      d.set(0, 1, 0)
   }
   m <= a && d.set(0, 0, 1);
   h.cross(e[0], d).normalize();
   f[0].cross(e[0], h);
   g[0].cross(e[0], f[0]);
   for (j = 1; j < b; j++)
   {
      f[j] = f[j - 1].clone();
      g[j] = g[j - 1].clone();
      h.cross(e[j - 1], e[j]);
      if (h.length() > 1.0E-4)
      {
         h.normalize();
         d = Math.acos(e[j - 1].dot(e[j]));
         i.makeRotationAxis(h, d).multiplyVector3(f[j])
      }
      g[j].cross(e[j], f[j])
   }
   if (c)
   {
      d = Math.acos(f[0].dot(f[b - 1]));
      d = d / (b - 1);
      e[0].dot(h.cross(f[0], f[b - 1])) > 0 && (d = -d);
      for (j = 1; j < b; j++)
      {
         i.makeRotationAxis(e[j], d * j).multiplyVector3(f[j]);
         g[j].cross(e[j], f[j])
      }
   }
};
THREE.PolyhedronGeometry = function (a, b, c, d)
{
   function e(a)
   {
      var b = a.normalize().clone();
      b.index = i.vertices.push(b) - 1;
      var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
         a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + 0.5;
      b.uv = new THREE.UV(c, a);
      return b
   }

   function f(a, b, c, d)
   {
      if (d < 1)
      {
         d = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(),
            c.clone()
         ]);
         d.centroid.addSelf(a).addSelf(b).addSelf(c).divideScalar(3);
         d.normal = d.centroid.clone().normalize();
         i.faces.push(d);
         d = Math.atan2(d.centroid.z, -d.centroid.x);
         i.faceVertexUvs[0].push([h(a.uv, a, d), h(b.uv, b, d), h(c.uv, c, d)])
      }
      else
      {
         d = d - 1;
         f(a, g(a, b), g(a, c), d);
         f(g(a, b), b, g(b, c), d);
         f(g(a, c), g(b, c), c, d);
         f(g(a, b), g(b, c), g(a, c), d)
      }
   }

   function g(a, b)
   {
      m[a.index] || (m[a.index] = []);
      m[b.index] || (m[b.index] = []);
      var c = m[a.index][b.index];
      c === void 0 && (m[a.index][b.index] = m[b.index][a.index] = c = e((new THREE
         .Vector3).add(a, b).divideScalar(2)));
      return c
   }

   function h(a, b, c)
   {
      c < 0 && a.u === 1 && (a = new THREE.UV(a.u - 1, a.v));
      b.x === 0 && b.z === 0 && (a = new THREE.UV(c / 2 / Math.PI + 0.5, a.v));
      return a
   }
   THREE.Geometry.call(this);
   for (var c = c || 1, d = d || 0, i = this, j = 0, l = a.length; j < l; j++) e(
      new THREE.Vector3(a[j][0], a[j][1], a[j][2]));
   for (var m = [], a = this.vertices, j = 0, l = b.length; j < l; j++) f(a[b[j]
      [0]], a[b[j][1]], a[b[j][2]], d);
   this.mergeVertices();
   j = 0;
   for (l = this.vertices.length; j < l; j++) this.vertices[j].multiplyScalar(c);
   this.computeCentroids();
   this.boundingSphere = {
      radius: c
   }
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function (a, b)
{
   var c = (1 + Math.sqrt(5)) / 2;
   THREE.PolyhedronGeometry.call(this, [
      [-1, c, 0],
      [1, c, 0],
      [-1, -c, 0],
      [1, -c, 0],
      [0, -1, c],
      [0, 1, c],
      [0, -1, -c],
      [0, 1, -c],
      [c, 0, -1],
      [c, 0, 1],
      [-c, 0, -1],
      [-c, 0, 1]
   ], [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1]
   ], a, b)
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function (a, b)
{
   THREE.PolyhedronGeometry.call(this, [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1]
   ], [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 2, 5],
      [1, 5, 3],
      [1, 3, 4],
      [1, 4, 2]
   ], a, b)
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function (a, b)
{
   THREE.PolyhedronGeometry.call(this, [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1]
   ], [
      [2, 1, 0],
      [0, 3, 2],
      [1, 3, 0],
      [2, 3, 1]
   ], a, b)
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function (a, b, c, d)
{
   THREE.Geometry.call(this);
   var e = this.vertices,
      f = this.faces,
      g = this.faceVertexUvs[0],
      d = d === void 0 ? false : d,
      h, i, j, l, m = b + 1;
   for (h = 0; h <= c; h++)
   {
      l = h / c;
      for (i = 0; i <= b; i++)
      {
         j = i / b;
         j = a(j, l);
         e.push(j)
      }
   }
   var n, p, r, o;
   for (h = 0; h < c; h++)
      for (i = 0; i < b; i++)
      {
         a = h * m + i;
         e = h * m + i + 1;
         l = (h + 1) * m + i;
         j = (h + 1) * m + i + 1;
         n = new THREE.UV(i / b, h / c);
         p = new THREE.UV((i + 1) / b, h / c);
         r = new THREE.UV(i / b, (h + 1) / c);
         o = new THREE.UV((i + 1) / b, (h + 1) / c);
         if (d)
         {
            f.push(new THREE.Face3(a, e, l));
            f.push(new THREE.Face3(e, j, l));
            g.push([n,
               p, r
            ]);
            g.push([p, o, r])
         }
         else
         {
            f.push(new THREE.Face4(a, e, j, l));
            g.push([n, p, o, r])
         }
      }
   this.computeCentroids();
   this.computeFaceNormals();
   this.computeVertexNormals()
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ConvexGeometry = function (a)
{
   function b(b)
   {
      var d = a[b].clone(),
         f = d.length();
      d.x = d.x + f * c();
      d.y = d.y + f * c();
      d.z = d.z + f * c();
      for (var f = [], g = 0; g < e.length;)
      {
         var h = e[g],
            i = d,
            j = a[h[0]],
            s;
         s = j;
         var w = a[h[1]],
            t = a[h[2]],
            v = new THREE.Vector3,
            x = new THREE.Vector3;
         v.sub(t, w);
         x.sub(s, w);
         v.crossSelf(x);
         v.isZero() || v.normalize();
         s = v;
         j = s.dot(j);
         if (s.dot(i) >= j)
         {
            for (i = 0; i < 3; i++)
            {
               j = [h[i], h[(i + 1) % 3]];
               s = true;
               for (w = 0; w < f.length; w++)
                  if (f[w][0] === j[1] && f[w][1] === j[0])
                  {
                     f[w] = f[f.length - 1];
                     f.pop();
                     s = false;
                     break
                  }
               s && f.push(j)
            }
            e[g] =
               e[e.length - 1];
            e.pop()
         }
         else g++
      }
      for (w = 0; w < f.length; w++) e.push([f[w][0], f[w][1], b])
   }

   function c()
   {
      return (Math.random() - 0.5) * 2.0E-6
   }

   function d(a)
   {
      var b = a.length();
      return new THREE.UV(a.x / b, a.y / b)
   }
   THREE.Geometry.call(this);
   for (var e = [
      [0, 1, 2],
      [0, 2, 1]
   ], f = 3; f < a.length; f++) b(f);
   for (var g = 0, h = Array(a.length), f = 0; f < e.length; f++)
      for (var i = e[f], j = 0; j < 3; j++)
      {
         if (h[i[j]] === void 0)
         {
            h[i[j]] = g++;
            this.vertices.push(a[i[j]])
         }
         i[j] = h[i[j]]
      }
   for (f = 0; f < e.length; f++) this.faces.push(new THREE.Face3(e[f][0], e[f]
      [1], e[f][2]));
   for (f = 0; f < this.faces.length; f++)
   {
      i = this.faces[f];
      this.faceVertexUvs[0].push([d(this.vertices[i.a]), d(this.vertices[i.b]),
         d(this.vertices[i.c])
      ])
   }
   this.computeCentroids();
   this.computeFaceNormals();
   this.computeVertexNormals()
};
THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function ()
{
   THREE.Object3D.call(this);
   var a = new THREE.Geometry;
   a.vertices.push(new THREE.Vector3);
   a.vertices.push(new THREE.Vector3(0, 100, 0));
   var b = new THREE.CylinderGeometry(0, 5, 25, 5, 1),
      c;
   c = new THREE.Line(a, new THREE.LineBasicMaterial(
   {
      color: 16711680
   }));
   c.rotation.z = -Math.PI / 2;
   this.add(c);
   c = new THREE.Mesh(b, new THREE.MeshBasicMaterial(
   {
      color: 16711680
   }));
   c.position.x = 100;
   c.rotation.z = -Math.PI / 2;
   this.add(c);
   c = new THREE.Line(a, new THREE.LineBasicMaterial(
   {
      color: 65280
   }));
   this.add(c);
   c = new THREE.Mesh(b, new THREE.MeshBasicMaterial(
   {
      color: 65280
   }));
   c.position.y = 100;
   this.add(c);
   c = new THREE.Line(a, new THREE.LineBasicMaterial(
   {
      color: 255
   }));
   c.rotation.x = Math.PI / 2;
   this.add(c);
   c = new THREE.Mesh(b, new THREE.MeshBasicMaterial(
   {
      color: 255
   }));
   c.position.z = 100;
   c.rotation.x = Math.PI / 2;
   this.add(c)
};
THREE.AxisHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper = function (a, b, c, d)
{
   THREE.Object3D.call(this);
   d === void 0 && (d = 16776960);
   c === void 0 && (c = 20);
   var e = new THREE.Geometry;
   e.vertices.push(new THREE.Vector3(0, 0, 0));
   e.vertices.push(new THREE.Vector3(0, 1, 0));
   this.line = new THREE.Line(e, new THREE.LineBasicMaterial(
   {
      color: d
   }));
   this.add(this.line);
   e = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
   this.cone = new THREE.Mesh(e, new THREE.MeshBasicMaterial(
   {
      color: d
   }));
   this.cone.position.set(0, 1, 0);
   this.add(this.cone);
   if (b instanceof THREE.Vector3) this.position =
      b;
   this.setDirection(a);
   this.setLength(c)
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function (a)
{
   var b = (new THREE.Vector3(0, 1, 0)).crossSelf(a),
      a = Math.acos((new THREE.Vector3(0, 1, 0)).dot(a.clone().normalize()));
   this.matrix = (new THREE.Matrix4).makeRotationAxis(b.normalize(), a);
   this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder)
};
THREE.ArrowHelper.prototype.setLength = function (a)
{
   this.scale.set(a, a, a)
};
THREE.ArrowHelper.prototype.setColor = function (a)
{
   this.line.material.color.setHex(a);
   this.cone.material.color.setHex(a)
};
THREE.CameraHelper = function (a)
{
   function b(a, b, d)
   {
      c(a, d);
      c(b, d)
   }

   function c(a, b)
   {
      d.lineGeometry.vertices.push(new THREE.Vector3);
      d.lineGeometry.colors.push(new THREE.Color(b));
      d.pointMap[a] === void 0 && (d.pointMap[a] = []);
      d.pointMap[a].push(d.lineGeometry.vertices.length - 1)
   }
   THREE.Object3D.call(this);
   var d = this;
   this.lineGeometry = new THREE.Geometry;
   this.lineMaterial = new THREE.LineBasicMaterial(
   {
      color: 16777215,
      vertexColors: THREE.FaceColors
   });
   this.pointMap = {};
   b("n1", "n2", 16755200);
   b("n2", "n4", 16755200);
   b("n4",
      "n3", 16755200);
   b("n3", "n1", 16755200);
   b("f1", "f2", 16755200);
   b("f2", "f4", 16755200);
   b("f4", "f3", 16755200);
   b("f3", "f1", 16755200);
   b("n1", "f1", 16755200);
   b("n2", "f2", 16755200);
   b("n3", "f3", 16755200);
   b("n4", "f4", 16755200);
   b("p", "n1", 16711680);
   b("p", "n2", 16711680);
   b("p", "n3", 16711680);
   b("p", "n4", 16711680);
   b("u1", "u2", 43775);
   b("u2", "u3", 43775);
   b("u3", "u1", 43775);
   b("c", "t", 16777215);
   b("p", "c", 3355443);
   b("cn1", "cn2", 3355443);
   b("cn3", "cn4", 3355443);
   b("cf1", "cf2", 3355443);
   b("cf3", "cf4", 3355443);
   this.camera = a;
   this.update(a);
   this.lines = new THREE.Line(this.lineGeometry, this.lineMaterial, THREE.LinePieces);
   this.add(this.lines)
};
THREE.CameraHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.CameraHelper.prototype.update = function ()
{
   function a(a, d, e, f)
   {
      THREE.CameraHelper.__v.set(d, e, f);
      THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v,
         THREE.CameraHelper.__c);
      a = b.pointMap[a];
      if (a !== void 0)
      {
         d = 0;
         for (e = a.length; d < e; d++) b.lineGeometry.vertices[a[d]].copy(
            THREE.CameraHelper.__v)
      }
   }
   var b = this;
   THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
   a("c", 0, 0, -1);
   a("t", 0, 0, 1);
   a("n1", -1, -1, -1);
   a("n2", 1, -1, -1);
   a("n3", -1, 1, -1);
   a("n4", 1, 1, -1);
   a("f1", -1, -1,
      1);
   a("f2", 1, -1, 1);
   a("f3", -1, 1, 1);
   a("f4", 1, 1, 1);
   a("u1", 0.7, 1.1, -1);
   a("u2", -0.7, 1.1, -1);
   a("u3", 0, 2, -1);
   a("cf1", -1, 0, 1);
   a("cf2", 1, 0, 1);
   a("cf3", 0, -1, 1);
   a("cf4", 0, 1, 1);
   a("cn1", -1, 0, -1);
   a("cn2", 1, 0, -1);
   a("cn3", 0, -1, -1);
   a("cn4", 0, 1, -1);
   this.lineGeometry.verticesNeedUpdate = true
};
THREE.CameraHelper.__projector = new THREE.Projector;
THREE.CameraHelper.__v = new THREE.Vector3;
THREE.CameraHelper.__c = new THREE.Camera;
THREE.SubdivisionModifier = function (a)
{
   this.subdivisions = a === void 0 ? 1 : a;
   this.useOldVertexColors = false;
   this.supportUVs = true;
   this.debug = false
};
THREE.SubdivisionModifier.prototype.modify = function (a)
{
   for (var b = this.subdivisions; b-- > 0;) this.smooth(a)
};
THREE.SubdivisionModifier.prototype.smooth = function (a)
{
   function b()
   {
      n.debug && console.log.apply(console, arguments)
   }

   function c()
   {
      console && console.log.apply(console, arguments)
   }

   function d(a, c, d, e, g, h, i)
   {
      var j = new THREE.Face4(a, c, d, e, null, g.color, g.materialIndex);
      if (n.useOldVertexColors)
      {
         j.vertexColors = [];
         for (var o, p, q, r = 0; r < 4; r++)
         {
            q = h[r];
            o = new THREE.Color;
            o.setRGB(0, 0, 0);
            for (var s = 0; s < q.length; s++)
            {
               p = g.vertexColors[q[s] - 1];
               o.r = o.r + p.r;
               o.g = o.g + p.g;
               o.b = o.b + p.b
            }
            o.r = o.r / q.length;
            o.g = o.g / q.length;
            o.b = o.b /
               q.length;
            j.vertexColors[r] = o
         }
      }
      l.push(j);
      if (n.supportUVs)
      {
         g = [f(a, ""), f(c, i), f(d, i), f(e, i)];
         g[0] ? g[1] ? g[2] ? g[3] ? m.push(g) : b("d :( ", e + ":" + i) : b(
            "c :( ", d + ":" + i) : b("b :( ", c + ":" + i) : b("a :( ", a +
            ":" + i)
      }
   }

   function e(a, b)
   {
      return Math.min(a, b) + "_" + Math.max(a, b)
   }

   function f(a, d)
   {
      var e = a + ":" + d,
         f = w[e];
      if (!f)
      {
         a >= t && a < t + r.length ? b("face pt") : b("edge pt");
         c("warning, UV not found for", e);
         return null
      }
      return f
   }

   function g(a, b, d)
   {
      var e = a + ":" + b;
      e in w ? c("dup vertexNo", a, "oldFaceNo", b, "value", d, "key", e, w[e]) :
         w[e] = d
   }

   function h(a,
      b)
   {
      O[a] === void 0 && (O[a] = []);
      O[a].push(b)
   }

   function i(a, b, c)
   {
      X[a] === void 0 && (X[a] = {});
      X[a][b] = c
   }
   var j = [],
      l = [],
      m = [],
      n = this,
      p = a.vertices,
      r = a.faces,
      j = p.concat(),
      o = [],
      q = {}, s = {}, w = {}, t = p.length,
      v, x, C, D, z, u = a.faceVertexUvs[0],
      G;
   b("originalFaces, uvs, originalVerticesLength", r.length, u.length, t);
   if (n.supportUVs)
   {
      v = 0;
      for (x = u.length; v < x; v++)
      {
         C = 0;
         for (D = u[v].length; C < D; C++)
         {
            G = r[v]["abcd".charAt(C)];
            g(G, v, u[v][C])
         }
      }
   }
   if (u.length == 0) n.supportUVs = false;
   v = 0;
   for (z in w) v++;
   if (!v)
   {
      n.supportUVs = false;
      b("no uvs")
   }
   b("-- Original Faces + Vertices UVs completed",
      w, "vs", u.length);
   v = 0;
   for (x = r.length; v < x; v++)
   {
      z = r[v];
      o.push(z.centroid);
      j.push(z.centroid);
      if (n.supportUVs)
      {
         u = new THREE.UV;
         if (z instanceof THREE.Face3)
         {
            u.u = f(z.a, v).u + f(z.b, v).u + f(z.c, v).u;
            u.v = f(z.a, v).v + f(z.b, v).v + f(z.c, v).v;
            u.u = u.u / 3;
            u.v = u.v / 3
         }
         else if (z instanceof THREE.Face4)
         {
            u.u = f(z.a, v).u + f(z.b, v).u + f(z.c, v).u + f(z.d, v).u;
            u.v = f(z.a, v).v + f(z.b, v).v + f(z.c, v).v + f(z.d, v).v;
            u.u = u.u / 4;
            u.v = u.v / 4
         }
         g(t + v, "", u)
      }
   }
   b("-- added UVs for new Faces", w);
   x = function (a)
   {
      function b(a, c)
      {
         h[a] === void 0 && (h[a] = []);
         h[a].push(c)
      }
      var c, d, f, g, h = {};
      c = 0;
      for (d = a.faces.length; c < d; c++)
      {
         f = a.faces[c];
         if (f instanceof THREE.Face3)
         {
            g = e(f.a, f.b);
            b(g, c);
            g = e(f.b, f.c);
            b(g, c);
            g = e(f.c, f.a);
            b(g, c)
         }
         else if (f instanceof THREE.Face4)
         {
            g = e(f.a, f.b);
            b(g, c);
            g = e(f.b, f.c);
            b(g, c);
            g = e(f.c, f.d);
            b(g, c);
            g = e(f.d, f.a);
            b(g, c)
         }
      }
      return h
   }(a);
   G = 0;
   var J, M, O = {}, X = {};
   for (v in x)
   {
      u = x[v];
      J = v.split("_");
      M = J[0];
      J = J[1];
      h(M, [M, J]);
      h(J, [M, J]);
      C = 0;
      for (D = u.length; C < D; C++)
      {
         z = u[C];
         i(M, z, v);
         i(J, z, v)
      }
      u.length < 2 && (s[v] = true)
   }
   b("vertexEdgeMap", O, "vertexFaceMap", X);
   for (v in x)
   {
      u =
         x[v];
      z = u[0];
      D = u[1];
      J = v.split("_");
      M = J[0];
      J = J[1];
      u = new THREE.Vector3;
      if (s[v])
      {
         u.addSelf(p[M]);
         u.addSelf(p[J]);
         u.multiplyScalar(0.5)
      }
      else
      {
         u.addSelf(o[z]);
         u.addSelf(o[D]);
         u.addSelf(p[M]);
         u.addSelf(p[J]);
         u.multiplyScalar(0.25)
      }
      q[v] = t + r.length + G;
      j.push(u);
      G++;
      if (n.supportUVs)
      {
         u = new THREE.UV;
         u.u = f(M, z).u + f(J, z).u;
         u.v = f(M, z).v + f(J, z).v;
         u.u = u.u / 2;
         u.v = u.v / 2;
         g(q[v], z, u);
         if (!s[v])
         {
            u = new THREE.UV;
            u.u = f(M, D).u + f(J, D).u;
            u.v = f(M, D).v + f(J, D).v;
            u.u = u.u / 2;
            u.v = u.v / 2;
            g(q[v], D, u)
         }
      }
   }
   b("-- Step 2 done");
   var B, F;
   D = ["123",
      "12", "2", "23"
   ];
   J = ["123", "23", "3", "31"];
   var Q = ["123", "31", "1", "12"],
      E = ["1234", "12", "2", "23"],
      aa = ["1234", "23", "3", "34"],
      T = ["1234", "34", "4", "41"],
      N = ["1234", "41", "1", "12"];
   v = 0;
   for (x = o.length; v < x; v++)
   {
      z = r[v];
      u = t + v;
      if (z instanceof THREE.Face3)
      {
         G = e(z.a, z.b);
         M = e(z.b, z.c);
         B = e(z.c, z.a);
         d(u, q[G], z.b, q[M], z, D, v);
         d(u, q[M], z.c, q[B], z, J, v);
         d(u, q[B], z.a, q[G], z, Q, v)
      }
      else if (z instanceof THREE.Face4)
      {
         G = e(z.a, z.b);
         M = e(z.b, z.c);
         B = e(z.c, z.d);
         F = e(z.d, z.a);
         d(u, q[G], z.b, q[M], z, E, v);
         d(u, q[M], z.c, q[B], z, aa, v);
         d(u, q[B], z.d,
            q[F], z, T, v);
         d(u, q[F], z.a, q[G], z, N, v)
      }
      else b("face should be a face!", z)
   }
   q = new THREE.Vector3;
   z = new THREE.Vector3;
   v = 0;
   for (x = p.length; v < x; v++)
      if (O[v] !== void 0)
      {
         q.set(0, 0, 0);
         z.set(0, 0, 0);
         M = new THREE.Vector3(0, 0, 0);
         u = 0;
         for (C in X[v])
         {
            q.addSelf(o[C]);
            u++
         }
         D = 0;
         G = O[v].length;
         for (C = 0; C < G; C++) s[e(O[v][C][0], O[v][C][1])] && D++;
         if (D != 2)
         {
            q.divideScalar(u);
            for (C = 0; C < G; C++)
            {
               u = O[v][C];
               u = p[u[0]].clone().addSelf(p[u[1]]).divideScalar(2);
               z.addSelf(u)
            }
            z.divideScalar(G);
            M.addSelf(p[v]);
            M.multiplyScalar(G - 3);
            M.addSelf(q);
            M.addSelf(z.multiplyScalar(2));
            M.divideScalar(G);
            j[v] = M
         }
      }
   a.vertices = j;
   a.faces = l;
   a.faceVertexUvs[0] = m;
   delete a.__tmpVertices;
   a.computeCentroids();
   a.computeFaceNormals();
   a.computeVertexNormals()
};
THREE.ImmediateRenderObject = function ()
{
   THREE.Object3D.call(this);
   this.render = function () {}
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function (a, b, c, d, e)
{
   THREE.Object3D.call(this);
   this.lensFlares = [];
   this.positionScreen = new THREE.Vector3;
   this.customUpdateCallback = void 0;
   a !== void 0 && this.add(a, b, c, d, e)
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function (a, b, c, d, e, f)
{
   b === void 0 && (b = -1);
   c === void 0 && (c = 0);
   f === void 0 && (f = 1);
   e === void 0 && (e = new THREE.Color(16777215));
   if (d === void 0) d = THREE.NormalBlending;
   c = Math.min(c, Math.max(0, c));
   this.lensFlares.push(
   {
      texture: a,
      size: b,
      distance: c,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      rotation: 1,
      opacity: f,
      color: e,
      blending: d
   })
};
THREE.LensFlare.prototype.updateLensFlares = function ()
{
   var a, b = this.lensFlares.length,
      c, d = -this.positionScreen.x * 2,
      e = -this.positionScreen.y * 2;
   for (a = 0; a < b; a++)
   {
      c = this.lensFlares[a];
      c.x = this.positionScreen.x + d * c.distance;
      c.y = this.positionScreen.y + e * c.distance;
      c.wantedRotation = c.x * Math.PI * 0.25;
      c.rotation = c.rotation + (c.wantedRotation - c.rotation) * 0.25
   }
};
THREE.MorphBlendMesh = function (a, b)
{
   THREE.Mesh.call(this, a, b);
   this.animationsMap = {};
   this.animationsList = [];
   var c = this.geometry.morphTargets.length;
   this.createAnimation("__default", 0, c - 1, c / 1);
   this.setAnimationWeight("__default", 1)
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function (a, b, c, d)
{
   b = {
      startFrame: b,
      endFrame: c,
      length: c - b + 1,
      fps: d,
      duration: (c - b) / d,
      lastFrame: 0,
      currentFrame: 0,
      active: false,
      time: 0,
      direction: 1,
      weight: 1,
      directionBackwards: false,
      mirroredLoop: false
   };
   this.animationsMap[a] = b;
   this.animationsList.push(b)
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (a)
{
   for (var b = /([a-z]+)(\d+)/, c, d = {}, e = this.geometry, f = 0, g = e.morphTargets
         .length; f < g; f++)
   {
      var h = e.morphTargets[f].name.match(b);
      if (h && h.length > 1)
      {
         var i = h[1];
         d[i] || (d[i] = {
            start: Infinity,
            end: -Infinity
         });
         h = d[i];
         if (f < h.start) h.start = f;
         if (f > h.end) h.end = f;
         c || (c = i)
      }
   }
   for (i in d)
   {
      h = d[i];
      this.createAnimation(i, h.start, h.end, a)
   }
   this.firstAnimation = c
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (a)
{
   if (a = this.animationsMap[a])
   {
      a.direction = 1;
      a.directionBackwards = false
   }
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (a)
{
   if (a = this.animationsMap[a])
   {
      a.direction = -1;
      a.directionBackwards = true
   }
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function (a, b)
{
   var c = this.animationsMap[a];
   if (c)
   {
      c.fps = b;
      c.duration = (c.end - c.start) / c.fps
   }
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function (a, b)
{
   var c = this.animationsMap[a];
   if (c)
   {
      c.duration = b;
      c.fps = (c.end - c.start) / c.duration
   }
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function (a, b)
{
   var c = this.animationsMap[a];
   if (c) c.weight = b
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function (a, b)
{
   var c = this.animationsMap[a];
   if (c) c.time = b
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function (a)
{
   var b = 0;
   if (a = this.animationsMap[a]) b = a.time;
   return b
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function (a)
{
   var b = -1;
   if (a = this.animationsMap[a]) b = a.duration;
   return b
};
THREE.MorphBlendMesh.prototype.playAnimation = function (a)
{
   var b = this.animationsMap[a];
   if (b)
   {
      b.time = 0;
      b.active = true
   }
   else console.warn("animation[" + a + "] undefined")
};
THREE.MorphBlendMesh.prototype.stopAnimation = function (a)
{
   if (a = this.animationsMap[a]) a.active = false
};
THREE.MorphBlendMesh.prototype.update = function (a)
{
   for (var b = 0, c = this.animationsList.length; b < c; b++)
   {
      var d = this.animationsList[b];
      if (d.active)
      {
         var e = d.duration / d.length;
         d.time = d.time + d.direction * a;
         if (d.mirroredLoop)
         {
            if (d.time > d.duration || d.time < 0)
            {
               d.direction = d.direction * -1;
               if (d.time > d.duration)
               {
                  d.time = d.duration;
                  d.directionBackwards = true
               }
               if (d.time < 0)
               {
                  d.time = 0;
                  d.directionBackwards = false
               }
            }
         }
         else
         {
            d.time = d.time % d.duration;
            if (d.time < 0) d.time = d.time + d.duration
         }
         var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time /
            e), 0, d.length - 1),
            g = d.weight;
         if (f !== d.currentFrame)
         {
            this.morphTargetInfluences[d.lastFrame] = 0;
            this.morphTargetInfluences[d.currentFrame] = 1 * g;
            this.morphTargetInfluences[f] = 0;
            d.lastFrame = d.currentFrame;
            d.currentFrame = f
         }
         e = d.time % e / e;
         d.directionBackwards && (e = 1 - e);
         this.morphTargetInfluences[d.currentFrame] = e * g;
         this.morphTargetInfluences[d.lastFrame] = (1 - e) * g
      }
   }
};
THREE.LensFlarePlugin = function ()
{
   function a(a)
   {
      var c = b.createProgram(),
         d = b.createShader(b.FRAGMENT_SHADER),
         e = b.createShader(b.VERTEX_SHADER);
      b.shaderSource(d, a.fragmentShader);
      b.shaderSource(e, a.vertexShader);
      b.compileShader(d);
      b.compileShader(e);
      b.attachShader(c, d);
      b.attachShader(c, e);
      b.linkProgram(c);
      return c
   }
   var b, c, d, e, f, g, h, i, j, l, m, n, p;
   this.init = function (r)
   {
      b = r.context;
      c = r;
      d = new Float32Array(16);
      e = new Uint16Array(6);
      r = 0;
      d[r++] = -1;
      d[r++] = -1;
      d[r++] = 0;
      d[r++] = 0;
      d[r++] = 1;
      d[r++] = -1;
      d[r++] = 1;
      d[r++] =
         0;
      d[r++] = 1;
      d[r++] = 1;
      d[r++] = 1;
      d[r++] = 1;
      d[r++] = -1;
      d[r++] = 1;
      d[r++] = 0;
      d[r++] = 1;
      r = 0;
      e[r++] = 0;
      e[r++] = 1;
      e[r++] = 2;
      e[r++] = 0;
      e[r++] = 2;
      e[r++] = 3;
      f = b.createBuffer();
      g = b.createBuffer();
      b.bindBuffer(b.ARRAY_BUFFER, f);
      b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
      b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
      h = b.createTexture();
      i = b.createTexture();
      b.bindTexture(b.TEXTURE_2D, h);
      b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16, 0, b.RGB, b.UNSIGNED_BYTE,
         null);
      b.texParameteri(b.TEXTURE_2D,
         b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
      b.bindTexture(b.TEXTURE_2D, i);
      b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE,
         null);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
      if (b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0)
      {
         j = false;
         l = a(THREE.ShaderFlares.lensFlare)
      }
      else
      {
         j = true;
         l = a(THREE.ShaderFlares.lensFlareVertexTexture)
      }
      m = {};
      n = {};
      m.vertex = b.getAttribLocation(l, "position");
      m.uv = b.getAttribLocation(l, "uv");
      n.renderType = b.getUniformLocation(l, "renderType");
      n.map = b.getUniformLocation(l, "map");
      n.occlusionMap = b.getUniformLocation(l, "occlusionMap");
      n.opacity = b.getUniformLocation(l, "opacity");
      n.color = b.getUniformLocation(l,
         "color");
      n.scale = b.getUniformLocation(l, "scale");
      n.rotation = b.getUniformLocation(l, "rotation");
      n.screenPosition = b.getUniformLocation(l, "screenPosition");
      p = false
   };
   this.render = function (a, d, e, s)
   {
      var a = a.__webglFlares,
         w = a.length;
      if (w)
      {
         var t = new THREE.Vector3,
            v = s / e,
            x = e * 0.5,
            C = s * 0.5,
            D = 16 / s,
            z = new THREE.Vector2(D * v, D),
            u = new THREE.Vector3(1, 1, 0),
            G = new THREE.Vector2(1, 1),
            J = n,
            D = m;
         b.useProgram(l);
         if (!p)
         {
            b.enableVertexAttribArray(m.vertex);
            b.enableVertexAttribArray(m.uv);
            p = true
         }
         b.uniform1i(J.occlusionMap, 0);
         b.uniform1i(J.map,
            1);
         b.bindBuffer(b.ARRAY_BUFFER, f);
         b.vertexAttribPointer(D.vertex, 2, b.FLOAT, false, 16, 0);
         b.vertexAttribPointer(D.uv, 2, b.FLOAT, false, 16, 8);
         b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
         b.disable(b.CULL_FACE);
         b.depthMask(false);
         var M, O, X, B, F;
         for (M = 0; M < w; M++)
         {
            D = 16 / s;
            z.set(D * v, D);
            B = a[M];
            t.set(B.matrixWorld.elements[12], B.matrixWorld.elements[13], B.matrixWorld
               .elements[14]);
            d.matrixWorldInverse.multiplyVector3(t);
            d.projectionMatrix.multiplyVector3(t);
            u.copy(t);
            G.x = u.x * x + x;
            G.y = u.y * C + C;
            if (j || G.x > 0 && G.x < e && G.y > 0 &&
               G.y < s)
            {
               b.activeTexture(b.TEXTURE1);
               b.bindTexture(b.TEXTURE_2D, h);
               b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, G.x - 8, G.y - 8, 16,
                  16, 0);
               b.uniform1i(J.renderType, 0);
               b.uniform2f(J.scale, z.x, z.y);
               b.uniform3f(J.screenPosition, u.x, u.y, u.z);
               b.disable(b.BLEND);
               b.enable(b.DEPTH_TEST);
               b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
               b.activeTexture(b.TEXTURE0);
               b.bindTexture(b.TEXTURE_2D, i);
               b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, G.x - 8, G.y - 8, 16,
                  16, 0);
               b.uniform1i(J.renderType, 1);
               b.disable(b.DEPTH_TEST);
               b.activeTexture(b.TEXTURE1);
               b.bindTexture(b.TEXTURE_2D, h);
               b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
               B.positionScreen.copy(u);
               B.customUpdateCallback ? B.customUpdateCallback(B) : B.updateLensFlares();
               b.uniform1i(J.renderType, 2);
               b.enable(b.BLEND);
               O = 0;
               for (X = B.lensFlares.length; O < X; O++)
               {
                  F = B.lensFlares[O];
                  if (F.opacity > 0.0010 && F.scale > 0.0010)
                  {
                     u.x = F.x;
                     u.y = F.y;
                     u.z = F.z;
                     D = F.size * F.scale / s;
                     z.x = D * v;
                     z.y = D;
                     b.uniform3f(J.screenPosition, u.x, u.y, u.z);
                     b.uniform2f(J.scale, z.x, z.y);
                     b.uniform1f(J.rotation, F.rotation);
                     b.uniform1f(J.opacity, F.opacity);
                     b.uniform3f(J.color, F.color.r, F.color.g, F.color.b);
                     c.setBlending(F.blending, F.blendEquation, F.blendSrc, F.blendDst);
                     c.setTexture(F.texture, 1);
                     b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0)
                  }
               }
            }
         }
         b.enable(b.CULL_FACE);
         b.enable(b.DEPTH_TEST);
         b.depthMask(true)
      }
   }
};
THREE.ShadowMapPlugin = function ()
{
   var a, b, c, d, e, f = new THREE.Frustum,
      g = new THREE.Matrix4,
      h = new THREE.Vector3,
      i = new THREE.Vector3;
   this.init = function (f)
   {
      a = f.context;
      b = f;
      var f = THREE.ShaderLib.depthRGBA,
         g = THREE.UniformsUtils.clone(f.uniforms);
      c = new THREE.ShaderMaterial(
      {
         fragmentShader: f.fragmentShader,
         vertexShader: f.vertexShader,
         uniforms: g
      });
      d = new THREE.ShaderMaterial(
      {
         fragmentShader: f.fragmentShader,
         vertexShader: f.vertexShader,
         uniforms: g,
         morphTargets: true
      });
      e = new THREE.ShaderMaterial(
      {
         fragmentShader: f.fragmentShader,
         vertexShader: f.vertexShader,
         uniforms: g,
         skinning: true
      });
      c._shadowPass = true;
      d._shadowPass = true;
      e._shadowPass = true
   };
   this.render = function (a, c)
   {
      b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c)
   };
   this.update = function (j, l)
   {
      var m, n, p, r, o, q, s, w, t, v = [];
      r = 0;
      a.clearColor(1, 1, 1, 1);
      a.disable(a.BLEND);
      a.enable(a.CULL_FACE);
      b.shadowMapCullFrontFaces ? a.cullFace(a.FRONT) : a.cullFace(a.BACK);
      b.setDepthTest(true);
      m = 0;
      for (n = j.__lights.length; m < n; m++)
      {
         p = j.__lights[m];
         if (p.castShadow)
            if (p instanceof THREE.DirectionalLight &&
               p.shadowCascade)
               for (o = 0; o < p.shadowCascadeCount; o++)
               {
                  var x;
                  if (p.shadowCascadeArray[o]) x = p.shadowCascadeArray[o];
                  else
                  {
                     t = p;
                     s = o;
                     x = new THREE.DirectionalLight;
                     x.isVirtual = true;
                     x.onlyShadow = true;
                     x.castShadow = true;
                     x.shadowCameraNear = t.shadowCameraNear;
                     x.shadowCameraFar = t.shadowCameraFar;
                     x.shadowCameraLeft = t.shadowCameraLeft;
                     x.shadowCameraRight = t.shadowCameraRight;
                     x.shadowCameraBottom = t.shadowCameraBottom;
                     x.shadowCameraTop = t.shadowCameraTop;
                     x.shadowCameraVisible = t.shadowCameraVisible;
                     x.shadowDarkness = t.shadowDarkness;
                     x.shadowBias = t.shadowCascadeBias[s];
                     x.shadowMapWidth = t.shadowCascadeWidth[s];
                     x.shadowMapHeight = t.shadowCascadeHeight[s];
                     x.pointsWorld = [];
                     x.pointsFrustum = [];
                     w = x.pointsWorld;
                     q = x.pointsFrustum;
                     for (var C = 0; C < 8; C++)
                     {
                        w[C] = new THREE.Vector3;
                        q[C] = new THREE.Vector3
                     }
                     w = t.shadowCascadeNearZ[s];
                     t = t.shadowCascadeFarZ[s];
                     q[0].set(-1, -1, w);
                     q[1].set(1, -1, w);
                     q[2].set(-1, 1, w);
                     q[3].set(1, 1, w);
                     q[4].set(-1, -1, t);
                     q[5].set(1, -1, t);
                     q[6].set(-1, 1, t);
                     q[7].set(1, 1, t);
                     x.originalCamera = l;
                     q = new THREE.Gyroscope;
                     q.position = p.shadowCascadeOffset;
                     q.add(x);
                     q.add(x.target);
                     l.add(q);
                     p.shadowCascadeArray[o] = x;
                     console.log("Created virtualLight", x)
                  }
                  s = p;
                  w = o;
                  t = s.shadowCascadeArray[w];
                  t.position.copy(s.position);
                  t.target.position.copy(s.target.position);
                  t.lookAt(t.target);
                  t.shadowCameraVisible = s.shadowCameraVisible;
                  t.shadowDarkness = s.shadowDarkness;
                  t.shadowBias = s.shadowCascadeBias[w];
                  q = s.shadowCascadeNearZ[w];
                  s = s.shadowCascadeFarZ[w];
                  t = t.pointsFrustum;
                  t[0].z = q;
                  t[1].z = q;
                  t[2].z = q;
                  t[3].z = q;
                  t[4].z = s;
                  t[5].z = s;
                  t[6].z = s;
                  t[7].z = s;
                  v[r] = x;
                  r++
               }
            else
            {
               v[r] = p;
               r++
            }
      }
      m =
         0;
      for (n = v.length; m < n; m++)
      {
         p = v[m];
         if (!p.shadowMap)
         {
            p.shadowMap = new THREE.WebGLRenderTarget(p.shadowMapWidth, p.shadowMapHeight,
            {
               minFilter: THREE.LinearFilter,
               magFilter: THREE.LinearFilter,
               format: THREE.RGBAFormat
            });
            p.shadowMapSize = new THREE.Vector2(p.shadowMapWidth, p.shadowMapHeight);
            p.shadowMatrix = new THREE.Matrix4
         }
         if (!p.shadowCamera)
         {
            if (p instanceof THREE.SpotLight) p.shadowCamera = new THREE.PerspectiveCamera(
               p.shadowCameraFov, p.shadowMapWidth / p.shadowMapHeight, p.shadowCameraNear,
               p.shadowCameraFar);
            else if (p instanceof THREE.DirectionalLight) p.shadowCamera = new THREE
               .OrthographicCamera(p.shadowCameraLeft, p.shadowCameraRight, p.shadowCameraTop,
                  p.shadowCameraBottom, p.shadowCameraNear, p.shadowCameraFar);
            else
            {
               console.error("Unsupported light type for shadow");
               continue
            }
            j.add(p.shadowCamera);
            b.autoUpdateScene && j.updateMatrixWorld()
         }
         if (p.shadowCameraVisible && !p.cameraHelper)
         {
            p.cameraHelper = new THREE.CameraHelper(p.shadowCamera);
            p.shadowCamera.add(p.cameraHelper)
         }
         if (p.isVirtual && x.originalCamera == l)
         {
            o = l;
            r = p.shadowCamera;
            q = p.pointsFrustum;
            t = p.pointsWorld;
            h.set(Infinity, Infinity, Infinity);
            i.set(-Infinity, -Infinity, -Infinity);
            for (s = 0; s < 8; s++)
            {
               w = t[s];
               w.copy(q[s]);
               THREE.ShadowMapPlugin.__projector.unprojectVector(w, o);
               r.matrixWorldInverse.multiplyVector3(w);
               if (w.x < h.x) h.x = w.x;
               if (w.x > i.x) i.x = w.x;
               if (w.y < h.y) h.y = w.y;
               if (w.y > i.y) i.y = w.y;
               if (w.z < h.z) h.z = w.z;
               if (w.z > i.z) i.z = w.z
            }
            r.left = h.x;
            r.right = i.x;
            r.top = i.y;
            r.bottom = h.y;
            r.updateProjectionMatrix()
         }
         r = p.shadowMap;
         q = p.shadowMatrix;
         o = p.shadowCamera;
         o.position.copy(p.matrixWorld.getPosition());
         o.lookAt(p.target.matrixWorld.getPosition());
         o.updateMatrixWorld();
         o.matrixWorldInverse.getInverse(o.matrixWorld);
         if (p.cameraHelper) p.cameraHelper.lines.visible = p.shadowCameraVisible;
         p.shadowCameraVisible && p.cameraHelper.update();
         q.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
         q.multiplySelf(o.projectionMatrix);
         q.multiplySelf(o.matrixWorldInverse);
         if (!o._viewMatrixArray) o._viewMatrixArray = new Float32Array(16);
         if (!o._projectionMatrixArray) o._projectionMatrixArray = new Float32Array(
            16);
         o.matrixWorldInverse.flattenToArray(o._viewMatrixArray);
         o.projectionMatrix.flattenToArray(o._projectionMatrixArray);
         g.multiply(o.projectionMatrix, o.matrixWorldInverse);
         f.setFromMatrix(g);
         b.setRenderTarget(r);
         b.clear();
         t = j.__webglObjects;
         p = 0;
         for (r = t.length; p < r; p++)
         {
            s = t[p];
            q = s.object;
            s.render = false;
            if (q.visible && q.castShadow && (!(q instanceof THREE.Mesh) || !q.frustumCulled ||
               f.contains(q)))
            {
               q._modelViewMatrix.multiply(o.matrixWorldInverse, q.matrixWorld);
               s.render = true
            }
         }
         p = 0;
         for (r = t.length; p < r; p++)
         {
            s = t[p];
            if (s.render)
            {
               q = s.object;
               s = s.buffer;
               w = q.customDepthMaterial ?
                  q.customDepthMaterial : q.geometry.morphTargets.length ? d :
                  q instanceof THREE.SkinnedMesh ? e : c;
               s instanceof THREE.BufferGeometry ? b.renderBufferDirect(o, j.__lights,
                  null, w, s, q) : b.renderBuffer(o, j.__lights, null, w, s, q)
            }
         }
         t = j.__webglObjectsImmediate;
         p = 0;
         for (r = t.length; p < r; p++)
         {
            s = t[p];
            q = s.object;
            if (q.visible && q.castShadow)
            {
               q._modelViewMatrix.multiply(o.matrixWorldInverse, q.matrixWorld);
               b.renderImmediateObject(o, j.__lights, null, c, q)
            }
         }
      }
      m = b.getClearColor();
      n = b.getClearAlpha();
      a.clearColor(m.r, m.g, m.b, n);
      a.enable(a.BLEND);
      b.shadowMapCullFrontFaces && a.cullFace(a.BACK)
   }
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector;
THREE.SpritePlugin = function ()
{
   function a(a, b)
   {
      return b.z - a.z
   }
   var b, c, d, e, f, g, h, i, j, l;
   this.init = function (a)
   {
      b = a.context;
      c = a;
      d = new Float32Array(16);
      e = new Uint16Array(6);
      a = 0;
      d[a++] = -1;
      d[a++] = -1;
      d[a++] = 0;
      d[a++] = 0;
      d[a++] = 1;
      d[a++] = -1;
      d[a++] = 1;
      d[a++] = 0;
      d[a++] = 1;
      d[a++] = 1;
      d[a++] = 1;
      d[a++] = 1;
      d[a++] = -1;
      d[a++] = 1;
      d[a++] = 0;
      d[a++] = 1;
      a = 0;
      e[a++] = 0;
      e[a++] = 1;
      e[a++] = 2;
      e[a++] = 0;
      e[a++] = 2;
      e[a++] = 3;
      f = b.createBuffer();
      g = b.createBuffer();
      b.bindBuffer(b.ARRAY_BUFFER, f);
      b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
      b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
         g);
      b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, b.STATIC_DRAW);
      var a = THREE.ShaderSprite.sprite,
         n = b.createProgram(),
         p = b.createShader(b.FRAGMENT_SHADER),
         r = b.createShader(b.VERTEX_SHADER);
      b.shaderSource(p, a.fragmentShader);
      b.shaderSource(r, a.vertexShader);
      b.compileShader(p);
      b.compileShader(r);
      b.attachShader(n, p);
      b.attachShader(n, r);
      b.linkProgram(n);
      h = n;
      i = {};
      j = {};
      i.position = b.getAttribLocation(h, "position");
      i.uv = b.getAttribLocation(h, "uv");
      j.uvOffset = b.getUniformLocation(h, "uvOffset");
      j.uvScale = b.getUniformLocation(h,
         "uvScale");
      j.rotation = b.getUniformLocation(h, "rotation");
      j.scale = b.getUniformLocation(h, "scale");
      j.alignment = b.getUniformLocation(h, "alignment");
      j.color = b.getUniformLocation(h, "color");
      j.map = b.getUniformLocation(h, "map");
      j.opacity = b.getUniformLocation(h, "opacity");
      j.useScreenCoordinates = b.getUniformLocation(h, "useScreenCoordinates");
      j.affectedByDistance = b.getUniformLocation(h, "affectedByDistance");
      j.screenPosition = b.getUniformLocation(h, "screenPosition");
      j.modelViewMatrix = b.getUniformLocation(h, "modelViewMatrix");
      j.projectionMatrix = b.getUniformLocation(h, "projectionMatrix");
      l = false
   };
   this.render = function (d, e, p, r)
   {
      var d = d.__webglSprites,
         o = d.length;
      if (o)
      {
         var q = i,
            s = j,
            w = r / p,
            p = p * 0.5,
            t = r * 0.5,
            v = true;
         b.useProgram(h);
         if (!l)
         {
            b.enableVertexAttribArray(q.position);
            b.enableVertexAttribArray(q.uv);
            l = true
         }
         b.disable(b.CULL_FACE);
         b.enable(b.BLEND);
         b.depthMask(true);
         b.bindBuffer(b.ARRAY_BUFFER, f);
         b.vertexAttribPointer(q.position, 2, b.FLOAT, false, 16, 0);
         b.vertexAttribPointer(q.uv, 2, b.FLOAT, false, 16, 8);
         b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
            g);
         b.uniformMatrix4fv(s.projectionMatrix, false, e._projectionMatrixArray);
         b.activeTexture(b.TEXTURE0);
         b.uniform1i(s.map, 0);
         for (var x, C = [], q = 0; q < o; q++)
         {
            x = d[q];
            if (x.visible && x.opacity !== 0)
               if (x.useScreenCoordinates) x.z = -x.position.z;
               else
               {
                  x._modelViewMatrix.multiply(e.matrixWorldInverse, x.matrixWorld);
                  x.z = -x._modelViewMatrix.elements[14]
               }
         }
         d.sort(a);
         for (q = 0; q < o; q++)
         {
            x = d[q];
            if (x.visible && x.opacity !== 0 && x.map && x.map.image && x.map.image
               .width)
            {
               if (x.useScreenCoordinates)
               {
                  b.uniform1i(s.useScreenCoordinates, 1);
                  b.uniform3f(s.screenPosition, (x.position.x - p) / p, (t - x.position
                     .y) / t, Math.max(0, Math.min(1, x.position.z)))
               }
               else
               {
                  b.uniform1i(s.useScreenCoordinates, 0);
                  b.uniform1i(s.affectedByDistance, x.affectedByDistance ? 1 :
                     0);
                  b.uniformMatrix4fv(s.modelViewMatrix, false, x._modelViewMatrix
                     .elements)
               }
               e = x.map.image.width / (x.scaleByViewport ? r : 1);
               C[0] = e * w * x.scale.x;
               C[1] = e * x.scale.y;
               b.uniform2f(s.uvScale, x.uvScale.x, x.uvScale.y);
               b.uniform2f(s.uvOffset, x.uvOffset.x, x.uvOffset.y);
               b.uniform2f(s.alignment, x.alignment.x, x.alignment.y);
               b.uniform1f(s.opacity, x.opacity);
               b.uniform3f(s.color, x.color.r, x.color.g, x.color.b);
               b.uniform1f(s.rotation, x.rotation);
               b.uniform2fv(s.scale, C);
               if (x.mergeWith3D && !v)
               {
                  b.enable(b.DEPTH_TEST);
                  v = true
               }
               else if (!x.mergeWith3D && v)
               {
                  b.disable(b.DEPTH_TEST);
                  v = false
               }
               c.setBlending(x.blending, x.blendEquation, x.blendSrc, x.blendDst);
               c.setTexture(x.map, 0);
               b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0)
            }
         }
         b.enable(b.CULL_FACE);
         b.enable(b.DEPTH_TEST);
         b.depthMask(true)
      }
   }
};
THREE.DepthPassPlugin = function ()
{
   this.enabled = false;
   this.renderTarget = null;
   var a, b, c, d, e = new THREE.Frustum,
      f = new THREE.Matrix4;
   this.init = function (e)
   {
      a = e.context;
      b = e;
      var e = THREE.ShaderLib.depthRGBA,
         f = THREE.UniformsUtils.clone(e.uniforms);
      c = new THREE.ShaderMaterial(
      {
         fragmentShader: e.fragmentShader,
         vertexShader: e.vertexShader,
         uniforms: f
      });
      d = new THREE.ShaderMaterial(
      {
         fragmentShader: e.fragmentShader,
         vertexShader: e.vertexShader,
         uniforms: f,
         morphTargets: true
      });
      c._shadowPass = true;
      d._shadowPass = true
   };
   this.render =
      function (a, b)
      {
         this.enabled && this.update(a, b)
   };
   this.update = function (g, h)
   {
      var i, j, l, m, n, p;
      a.clearColor(1, 1, 1, 1);
      a.disable(a.BLEND);
      b.setDepthTest(true);
      b.autoUpdateScene && g.updateMatrixWorld();
      if (!h._viewMatrixArray) h._viewMatrixArray = new Float32Array(16);
      if (!h._projectionMatrixArray) h._projectionMatrixArray = new Float32Array(
         16);
      h.matrixWorldInverse.getInverse(h.matrixWorld);
      h.matrixWorldInverse.flattenToArray(h._viewMatrixArray);
      h.projectionMatrix.flattenToArray(h._projectionMatrixArray);
      f.multiply(h.projectionMatrix,
         h.matrixWorldInverse);
      e.setFromMatrix(f);
      b.setRenderTarget(this.renderTarget);
      b.clear();
      p = g.__webglObjects;
      i = 0;
      for (j = p.length; i < j; i++)
      {
         l = p[i];
         n = l.object;
         l.render = false;
         if (n.visible && (!(n instanceof THREE.Mesh) || !n.frustumCulled || e.contains(
            n)))
         {
            n._modelViewMatrix.multiply(h.matrixWorldInverse, n.matrixWorld);
            l.render = true
         }
      }
      i = 0;
      for (j = p.length; i < j; i++)
      {
         l = p[i];
         if (l.render)
         {
            n = l.object;
            l = l.buffer;
            b.setObjectFaces(n);
            m = n.customDepthMaterial ? n.customDepthMaterial : n.geometry.morphTargets
               .length ? d : c;
            l instanceof
            THREE.BufferGeometry ? b.renderBufferDirect(h, g.__lights, null, m,
               l, n) : b.renderBuffer(h, g.__lights, null, m, l, n)
         }
      }
      p = g.__webglObjectsImmediate;
      i = 0;
      for (j = p.length; i < j; i++)
      {
         l = p[i];
         n = l.object;
         if (n.visible && n.castShadow)
         {
            n._modelViewMatrix.multiply(h.matrixWorldInverse, n.matrixWorld);
            b.renderImmediateObject(h, g.__lights, null, c, n)
         }
      }
      i = b.getClearColor();
      j = b.getClearAlpha();
      a.clearColor(i.r, i.g, i.b, j);
      a.enable(a.BLEND)
   }
};
THREE.ShaderFlares = {
   lensFlareVertexTexture:
   {
      vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
      fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
   },
   lensFlare:
   {
      vertexShader: "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
      fragmentShader: "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
   }
};
THREE.ShaderSprite = {
   sprite:
   {
      vertexShader: "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
      fragmentShader: "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"
   }
};