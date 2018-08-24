(function(a) {
  function b(a, b) {
    var c = (a & 65535) + (b & 65535),
      d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | c & 65535
  }

  function c(a, b) {
    return a << b | a >>> 32 - b
  }

  function d(a, d, e, f, g, h) {
    return b(c(b(b(d, a), b(f, h)), g), e)
  }

  function e(a, b, c, e, f, g, h) {
    return d(b & c | ~b & e, a, b, f, g, h)
  }

  function f(a, b, c, e, f, g, h) {
    return d(b & e | c & ~e, a, b, f, g, h)
  }

  function g(a, b, c, e, f, g, h) {
    return d(b ^ c ^ e, a, b, f, g, h)
  }

  function h(a, b, c, e, f, g, h) {
    return d(c ^ (b | ~e), a, b, f, g, h)
  }

  function i(a, c) {
    a[c >> 5] |= 128 << c % 32, a[(c + 64 >>> 9 << 4) + 14] = c;
    var d, i, j, k, l, m = 1732584193,
      n = -271733879,
      o = -1732584194,
      p = 271733878;
    for (d = 0; d < a.length; d += 16) i = m, j = n, k = o, l = p, m = e(m, n, o, p, a[d], 7, -680876936), p = e(p, m, n, o, a[d + 1], 12, -389564586), o = e(o, p, m, n, a[d + 2], 17, 606105819), n = e(n, o, p, m, a[d + 3], 22, -1044525330), m = e(m, n, o, p, a[d + 4], 7, -176418897), p = e(p, m, n, o, a[d + 5], 12, 1200080426), o = e(o, p, m, n, a[d + 6], 17, -1473231341), n = e(n, o, p, m, a[d + 7], 22, -45705983), m = e(m, n, o, p, a[d + 8], 7, 1770035416), p = e(p, m, n, o, a[d + 9], 12, -1958414417), o = e(o, p, m, n, a[d + 10], 17, -42063), n = e(n, o, p, m, a[d + 11], 22, -1990404162), m = e(m, n, o, p, a[d + 12], 7, 1804603682), p = e(p, m, n, o, a[d + 13], 12, -40341101), o = e(o, p, m, n, a[d + 14], 17, -1502002290), n = e(n, o, p, m, a[d + 15], 22, 1236535329), m = f(m, n, o, p, a[d + 1], 5, -165796510), p = f(p, m, n, o, a[d + 6], 9, -1069501632), o = f(o, p, m, n, a[d + 11], 14, 643717713), n = f(n, o, p, m, a[d], 20, -373897302), m = f(m, n, o, p, a[d + 5], 5, -701558691), p = f(p, m, n, o, a[d + 10], 9, 38016083), o = f(o, p, m, n, a[d + 15], 14, -660478335), n = f(n, o, p, m, a[d + 4], 20, -405537848), m = f(m, n, o, p, a[d + 9], 5, 568446438), p = f(p, m, n, o, a[d + 14], 9, -1019803690), o = f(o, p, m, n, a[d + 3], 14, -187363961), n = f(n, o, p, m, a[d + 8], 20, 1163531501), m = f(m, n, o, p, a[d + 13], 5, -1444681467), p = f(p, m, n, o, a[d + 2], 9, -51403784), o = f(o, p, m, n, a[d + 7], 14, 1735328473), n = f(n, o, p, m, a[d + 12], 20, -1926607734), m = g(m, n, o, p, a[d + 5], 4, -378558), p = g(p, m, n, o, a[d + 8], 11, -2022574463), o = g(o, p, m, n, a[d + 11], 16, 1839030562), n = g(n, o, p, m, a[d + 14], 23, -35309556), m = g(m, n, o, p, a[d + 1], 4, -1530992060), p = g(p, m, n, o, a[d + 4], 11, 1272893353), o = g(o, p, m, n, a[d + 7], 16, -155497632), n = g(n, o, p, m, a[d + 10], 23, -1094730640), m = g(m, n, o, p, a[d + 13], 4, 681279174), p = g(p, m, n, o, a[d], 11, -358537222), o = g(o, p, m, n, a[d + 3], 16, -722521979), n = g(n, o, p, m, a[d + 6], 23, 76029189), m = g(m, n, o, p, a[d + 9], 4, -640364487), p = g(p, m, n, o, a[d + 12], 11, -421815835), o = g(o, p, m, n, a[d + 15], 16, 530742520), n = g(n, o, p, m, a[d + 2], 23, -995338651), m = h(m, n, o, p, a[d], 6, -198630844), p = h(p, m, n, o, a[d + 7], 10, 1126891415), o = h(o, p, m, n, a[d + 14], 15, -1416354905), n = h(n, o, p, m, a[d + 5], 21, -57434055), m = h(m, n, o, p, a[d + 12], 6, 1700485571), p = h(p, m, n, o, a[d + 3], 10, -1894986606), o = h(o, p, m, n, a[d + 10], 15, -1051523), n = h(n, o, p, m, a[d + 1], 21, -2054922799), m = h(m, n, o, p, a[d + 8], 6, 1873313359), p = h(p, m, n, o, a[d + 15], 10, -30611744), o = h(o, p, m, n, a[d + 6], 15, -1560198380), n = h(n, o, p, m, a[d + 13], 21, 1309151649), m = h(m, n, o, p, a[d + 4], 6, -145523070), p = h(p, m, n, o, a[d + 11], 10, -1120210379), o = h(o, p, m, n, a[d + 2], 15, 718787259), n = h(n, o, p, m, a[d + 9], 21, -343485551), m = b(m, i), n = b(n, j), o = b(o, k), p = b(p, l);
    return [m, n, o, p]
  }

  function j(a) {
    var b, c = "";
    for (b = 0; b < a.length * 32; b += 8) c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
    return c
  }

  function k(a) {
    var b, c = [];
    c[(a.length >> 2) - 1] = undefined;
    for (b = 0; b < c.length; b += 1) c[b] = 0;
    for (b = 0; b < a.length * 8; b += 8) c[b >> 5] |= (a.charCodeAt(b / 8) & 255) << b % 32;
    return c
  }

  function l(a) {
    return j(i(k(a), a.length * 8))
  }

  function m(a, b) {
    var c, d = k(a),
      e = [],
      f = [],
      g;
    e[15] = f[15] = undefined, d.length > 16 && (d = i(d, a.length * 8));
    for (c = 0; c < 16; c += 1) e[c] = d[c] ^ 909522486, f[c] = d[c] ^ 1549556828;
    return g = i(e.concat(k(b)), 512 + b.length * 8), j(i(f.concat(g), 640))
  }

  function n(a) {
    var b = "0123456789abcdef",
      c = "",
      d, e;
    for (e = 0; e < a.length; e += 1) d = a.charCodeAt(e), c += b.charAt(d >>> 4 & 15) + b.charAt(d & 15);
    return c
  }

  function o(a) {
    return unescape(encodeURIComponent(a))
  }

  function p(a) {
    return l(o(a))
  }

  function q(a) {
    return n(p(a))
  }

  function r(a, b) {
    return m(o(a), o(b))
  }

  function s(a, b) {
    return n(r(a, b))
  }

  function t(a, b, c) {
    return b ? c ? r(b, a) : s(b, a) : c ? p(a) : q(a)
  }
  "use strict", typeof define == "function" && define.amd ? define(function() {
    return t
  }) : a.md5 = t
})(this);
(function a(b, c, d) {
  function e(g, h) {
    if (!c[g]) {
      if (!b[g]) {
        var i = typeof require == "function" && require;
        if (!h && i) return i(g, !0);
        if (f) return f(g, !0);
        var j = new Error("Cannot find module '" + g + "'");
        throw j.code = "MODULE_NOT_FOUND", j
      }
      var k = c[g] = {
        exports: {}
      };
      b[g][0].call(k.exports, function(a) {
        var c = b[g][1][a];
        return e(c ? c : a)
      }, k, k.exports, a, b, c, d)
    }
    return c[g].exports
  }
  var f = typeof require == "function" && require;
  for (var g = 0; g < d.length; g++) e(d[g]);
  return e
})({
  1: [function(a, b, c) {
    var d = a("cssfilter").FilterCSS;
    var e = a("cssfilter").getDefaultWhiteList;
    var f = a("./util");

    function g() {
      return {
        a: ["target", "href", "title"],
        abbr: ["title"],
        address: [],
        area: ["shape", "coords", "href", "alt"],
        article: [],
        aside: [],
        audio: ["autoplay", "controls", "loop", "preload", "src"],
        b: [],
        bdi: ["dir"],
        bdo: ["dir"],
        big: [],
        blockquote: ["cite"],
        br: [],
        caption: [],
        center: [],
        cite: [],
        code: [],
        col: ["align", "valign", "span", "width"],
        colgroup: ["align", "valign", "span", "width"],
        dd: [],
        del: ["datetime"],
        details: ["open"],
        div: [],
        dl: [],
        dt: [],
        em: [],
        font: ["color", "size", "face"],
        footer: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        header: [],
        hr: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        ins: ["datetime"],
        li: [],
        mark: [],
        nav: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        section: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        table: ["width", "border", "align", "valign"],
        tbody: ["align", "valign"],
        td: ["width", "rowspan", "colspan", "align", "valign"],
        tfoot: ["align", "valign"],
        th: ["width", "rowspan", "colspan", "align", "valign"],
        thead: ["align", "valign"],
        tr: ["rowspan", "align", "valign"],
        tt: [],
        u: [],
        ul: [],
        video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
      }
    }
    var h = new d;

    function i(a, b, c) {}

    function j(a, b, c) {}

    function k(a, b, c) {}

    function l(a, b, c) {}

    function m(a) {
      return a.replace(o, "&lt;").replace(p, "&gt;")
    }

    function n(a, b, c, d) {
      c = G(c);
      if (b === "href" || b === "src") {
        c = f.trim(c);
        if (c === "#") return "#";
        if (!(c.substr(0, 7) === "http://" || c.substr(0, 8) === "https://" || c.substr(0, 7) === "mailto:" || c[0] === "#" || c[0] === "/")) {
          return ""
        }
      } else if (b === "background") {
        w.lastIndex = 0;
        if (w.test(c)) {
          return ""
        }
      } else if (b === "style") {
        z.lastIndex = 0;
        if (z.test(c)) {
          return ""
        }
        A.lastIndex = 0;
        if (A.test(c)) {
          w.lastIndex = 0;
          if (w.test(c)) {
            return ""
          }
        }
        if (d !== false) {
          d = d || h;
          c = d.process(c)
        }
      }
      c = H(c);
      return c
    }
    var o = /</g;
    var p = />/g;
    var q = /"/g;
    var r = /&quot;/g;
    var s = /&#([a-zA-Z0-9]*);?/gim;
    var t = /&colon;?/gim;
    var u = /&newline;?/gim;
    var v = /\/\*|\*\//gm;
    var w = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
    var x = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
    var y = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
    var z = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
    var A = /u\s*r\s*l\s*\(.*/gi;

    function B(a) {
      return a.replace(q, "&quot;")
    }

    function C(a) {
      return a.replace(r, '"')
    }

    function D(a) {
      return a.replace(s, function a(b, c) {
        return c[0] === "x" || c[0] === "X" ? String.fromCharCode(parseInt(c.substr(1), 16)) : String.fromCharCode(parseInt(c, 10))
      })
    }

    function E(a) {
      return a.replace(t, ":").replace(u, " ")
    }

    function F(a) {
      var b = "";
      for (var c = 0, d = a.length; c < d; c++) {
        b += a.charCodeAt(c) < 32 ? " " : a.charAt(c)
      }
      return f.trim(b)
    }

    function G(a) {
      a = C(a);
      a = D(a);
      a = E(a);
      a = F(a);
      return a
    }

    function H(a) {
      a = B(a);
      a = m(a);
      return a
    }

    function I() {
      return ""
    }

    function J(a, b) {
      if (typeof b !== "function") {
        b = function() {}
      }
      var c = !Array.isArray(a);

      function d(b) {
        if (c) return true;
        return f.indexOf(a, b) !== -1
      }
      var e = [];
      var g = false;
      return {
        onIgnoreTag: function(a, c, f) {
          if (d(a)) {
            if (f.isClosing) {
              var h = "[/removed]";
              var i = f.position + h.length;
              e.push([g !== false ? g : f.position, i]);
              g = false;
              return h
            } else {
              if (!g) {
                g = f.position
              }
              return "[removed]"
            }
          } else {
            return b(a, c, f)
          }
        },
        remove: function(a) {
          var b = "";
          var c = 0;
          f.forEach(e, function(d) {
            b += a.slice(c, d[0]);
            c = d[1]
          });
          b += a.slice(c);
          return b
        }
      }
    }

    function K(a) {
      return a.replace(L, "")
    }
    var L = /<!--[\s\S]*?-->/g;

    function M(a) {
      var b = a.split("");
      b = b.filter(function(a) {
        var b = a.charCodeAt(0);
        if (b === 127) return false;
        if (b <= 31) {
          if (b === 10 || b === 13) return true;
          return false
        }
        return true
      });
      return b.join("")
    }
    c.whiteList = g();
    c.getDefaultWhiteList = g;
    c.onTag = i;
    c.onIgnoreTag = j;
    c.onTagAttr = k;
    c.onIgnoreTagAttr = l;
    c.safeAttrValue = n;
    c.escapeHtml = m;
    c.escapeQuote = B;
    c.unescapeQuote = C;
    c.escapeHtmlEntities = D;
    c.escapeDangerHtml5Entities = E;
    c.clearNonPrintableCharacter = F;
    c.friendlyAttrValue = G;
    c.escapeAttrValue = H;
    c.onIgnoreTagStripAll = I;
    c.StripTagBody = J;
    c.stripCommentTag = K;
    c.stripBlankChar = M;
    c.cssFilter = h;
    c.getDefaultCSSWhiteList = e
  }, {
    "./util": 4,
    cssfilter: 8
  }],
  2: [function(a, b, c) {
    var d = a("./default");
    var e = a("./parser");
    var f = a("./xss");

    function g(a, b) {
      var c = new f(b);
      return c.process(a)
    }
    c = b.exports = g;
    c.FilterXSS = f;
    for (var h in d) c[h] = d[h];
    for (var h in e) c[h] = e[h];
    if (typeof window !== "undefined") {
      window.filterXSS = b.exports
    }
  }, {
    "./default": 1,
    "./parser": 3,
    "./xss": 5
  }],
  3: [function(a, b, c) {
    var d = a("./util");

    function e(a) {
      var b = d.spaceIndex(a);
      if (b === -1) {
        var c = a.slice(1, -1)
      } else {
        var c = a.slice(1, b + 1)
      }
      c = d.trim(c).toLowerCase();
      if (c.slice(0, 1) === "/") c = c.slice(1);
      if (c.slice(-1) === "/") c = c.slice(0, -1);
      return c
    }

    function f(a) {
      return a.slice(0, 2) === "</"
    }

    function g(a, b, c) {
      "user strict";
      var d = "";
      var g = 0;
      var h = false;
      var i = false;
      var j = 0;
      var k = a.length;
      var l = "";
      var m = "";
      for (j = 0; j < k; j++) {
        var n = a.charAt(j);
        if (h === false) {
          if (n === "<") {
            h = j;
            continue
          }
        } else {
          if (i === false) {
            if (n === "<") {
              d += c(a.slice(g, j));
              h = j;
              g = j;
              continue
            }
            if (n === ">") {
              d += c(a.slice(g, h));
              l = a.slice(h, j + 1);
              m = e(l);
              d += b(h, d.length, m, l, f(l));
              g = j + 1;
              h = false;
              continue
            }
            if ((n === '"' || n === "'") && a.charAt(j - 1) === "=") {
              i = n;
              continue
            }
          } else {
            if (n === i) {
              i = false;
              continue
            }
          }
        }
      }
      if (g < a.length) {
        d += c(a.substr(g))
      }
      return d
    }
    var h = /[^a-zA-Z0-9_:\.\-]/gim;

    function i(a, b) {
      "user strict";
      var c = 0;
      var e = [];
      var f = false;
      var g = a.length;

      function i(a, c) {
        a = d.trim(a);
        a = a.replace(h, "").toLowerCase();
        if (a.length < 1) return;
        var f = b(a, c || "");
        if (f) e.push(f)
      }
      for (var l = 0; l < g; l++) {
        var n = a.charAt(l);
        var o, p;
        if (f === false && n === "=") {
          f = a.slice(c, l);
          c = l + 1;
          continue
        }
        if (f !== false) {
          if (l === c && (n === '"' || n === "'") && a.charAt(l - 1) === "=") {
            p = a.indexOf(n, l + 1);
            if (p === -1) {
              break
            } else {
              o = d.trim(a.slice(c + 1, p));
              i(f, o);
              f = false;
              l = p;
              c = l + 1;
              continue
            }
          }
        }
        if (/\s|\n|\t/.test(n)) {
          a = a.replace(/\s|\n|\t/g, " ");
          if (f === false) {
            p = j(a, l);
            if (p === -1) {
              o = d.trim(a.slice(c, l));
              i(o);
              f = false;
              c = l + 1;
              continue
            } else {
              l = p - 1;
              continue
            }
          } else {
            p = k(a, l - 1);
            if (p === -1) {
              o = d.trim(a.slice(c, l));
              o = m(o);
              i(f, o);
              f = false;
              c = l + 1;
              continue
            } else {
              continue
            }
          }
        }
      }
      if (c < a.length) {
        if (f === false) {
          i(a.slice(c))
        } else {
          i(f, m(d.trim(a.slice(c))))
        }
      }
      return d.trim(e.join(" "))
    }

    function j(a, b) {
      for (; b < a.length; b++) {
        var c = a[b];
        if (c === " ") continue;
        if (c === "=") return b;
        return -1
      }
    }

    function k(a, b) {
      for (; b > 0; b--) {
        var c = a[b];
        if (c === " ") continue;
        if (c === "=") return b;
        return -1
      }
    }

    function l(a) {
      if (a[0] === '"' && a[a.length - 1] === '"' || a[0] === "'" && a[a.length - 1] === "'") {
        return true
      } else {
        return false
      }
    }

    function m(a) {
      if (l(a)) {
        return a.substr(1, a.length - 2)
      } else {
        return a
      }
    }
    c.parseTag = g;
    c.parseAttr = i
  }, {
    "./util": 4
  }],
  4: [function(a, b, c) {
    b.exports = {
      indexOf: function(a, b) {
        var c, d;
        if (Array.prototype.indexOf) {
          return a.indexOf(b)
        }
        for (c = 0, d = a.length; c < d; c++) {
          if (a[c] === b) {
            return c
          }
        }
        return -1
      },
      forEach: function(a, b, c) {
        var d, e;
        if (Array.prototype.forEach) {
          return a.forEach(b, c)
        }
        for (d = 0, e = a.length; d < e; d++) {
          b.call(c, a[d], d, a)
        }
      },
      trim: function(a) {
        if (String.prototype.trim) {
          return a.trim()
        }
        return a.replace(/(^\s*)|(\s*$)/g, "")
      },
      spaceIndex: function(a) {
        var b = /\s|\n|\t/;
        var c = b.exec(a);
        return c ? c.index : -1
      }
    }
  }, {}],
  5: [function(a, b, c) {
    var d = a("cssfilter").FilterCSS;
    var e = a("./default");
    var f = a("./parser");
    var g = f.parseTag;
    var h = f.parseAttr;
    var i = a("./util");

    function j(a) {
      return a === undefined || a === null
    }

    function k(a) {
      var b = i.spaceIndex(a);
      if (b === -1) {
        return {
          html: "",
          closing: a[a.length - 2] === "/"
        }
      }
      a = i.trim(a.slice(b + 1, -1));
      var c = a[a.length - 1] === "/";
      if (c) a = i.trim(a.slice(0, -1));
      return {
        html: a,
        closing: c
      }
    }

    function l(a) {
      var b = {};
      for (var c in a) {
        b[c] = a[c]
      }
      return b
    }

    function m(a) {
      a = l(a || {});
      if (a.stripIgnoreTag) {
        if (a.onIgnoreTag) {
          console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time')
        }
        a.onIgnoreTag = e.onIgnoreTagStripAll
      }
      a.whiteList = a.whiteList || e.whiteList;
      a.onTag = a.onTag || e.onTag;
      a.onTagAttr = a.onTagAttr || e.onTagAttr;
      a.onIgnoreTag = a.onIgnoreTag || e.onIgnoreTag;
      a.onIgnoreTagAttr = a.onIgnoreTagAttr || e.onIgnoreTagAttr;
      a.safeAttrValue = a.safeAttrValue || e.safeAttrValue;
      a.escapeHtml = a.escapeHtml || e.escapeHtml;
      this.options = a;
      if (a.css === false) {
        this.cssFilter = false
      } else {
        a.css = a.css || {};
        this.cssFilter = new d(a.css)
      }
    }
    m.prototype.process = function(a) {
      a = a || "";
      a = a.toString();
      if (!a) return "";
      var b = this;
      var c = b.options;
      var d = c.whiteList;
      var f = c.onTag;
      var l = c.onIgnoreTag;
      var m = c.onTagAttr;
      var n = c.onIgnoreTagAttr;
      var o = c.safeAttrValue;
      var p = c.escapeHtml;
      var q = b.cssFilter;
      if (c.stripBlankChar) {
        a = e.stripBlankChar(a)
      }
      if (!c.allowCommentTag) {
        a = e.stripCommentTag(a)
      }
      var r = false;
      if (c.stripIgnoreTagBody) {
        var r = e.StripTagBody(c.stripIgnoreTagBody, l);
        l = r.onIgnoreTag
      }
      var s = g(a, function(a, b, c, e, g) {
        var r = {
          sourcePosition: a,
          position: b,
          isClosing: g,
          isWhite: c in d
        };
        var s = f(c, e, r);
        if (!j(s)) return s;
        if (r.isWhite) {
          if (r.isClosing) {
            return "</" + c + ">"
          }
          var t = k(e);
          var u = d[c];
          var v = h(t.html, function(a, b) {
            var d = i.indexOf(u, a) !== -1;
            var e = m(c, a, b, d);
            if (!j(e)) return e;
            if (d) {
              b = o(c, a, b, q);
              if (b) {
                return a + '="' + b + '"'
              } else {
                return a
              }
            } else {
              var e = n(c, a, b, d);
              if (!j(e)) return e;
              return
            }
          });
          var e = "<" + c;
          if (v) e += " " + v;
          if (t.closing) e += " /";
          e += ">";
          return e
        } else {
          var s = l(c, e, r);
          if (!j(s)) return s;
          return p(e)
        }
      }, p);
      if (r) {
        s = r.remove(s)
      }
      return s
    };
    b.exports = m
  }, {
    "./default": 1,
    "./parser": 3,
    "./util": 4,
    cssfilter: 8
  }],
  6: [function(a, b, c) {
    var d = a("./default");
    var e = a("./parser");
    var f = a("./util");

    function g(a) {
      return a === undefined || a === null
    }

    function h(a) {
      var b = {};
      for (var c in a) {
        b[c] = a[c]
      }
      return b
    }

    function i(a) {
      a = h(a || {});
      a.whiteList = a.whiteList || d.whiteList;
      a.onAttr = a.onAttr || d.onAttr;
      a.onIgnoreAttr = a.onIgnoreAttr || d.onIgnoreAttr;
      a.safeAttrValue = a.safeAttrValue || d.safeAttrValue;
      this.options = a
    }
    i.prototype.process = function(a) {
      a = a || "";
      a = a.toString();
      if (!a) return "";
      var b = this;
      var c = b.options;
      var d = c.whiteList;
      var f = c.onAttr;
      var h = c.onIgnoreAttr;
      var i = c.safeAttrValue;
      var j = e(a, function(a, b, c, e, j) {
        var k = d[c];
        var l = false;
        if (k === true) l = k;
        else if (typeof k === "function") l = k(e);
        else if (k instanceof RegExp) l = k.test(e);
        if (l !== true) l = false;
        e = i(c, e);
        if (!e) return;
        var m = {
          position: b,
          sourcePosition: a,
          source: j,
          isWhite: l
        };
        if (l) {
          var n = f(c, e, m);
          if (g(n)) {
            return c + ":" + e
          } else {
            return n
          }
        } else {
          var n = h(c, e, m);
          if (!g(n)) {
            return n
          }
        }
      });
      return j
    };
    b.exports = i
  }, {
    "./default": 7,
    "./parser": 9,
    "./util": 10
  }],
  7: [function(a, b, c) {
    function d() {
      var a = {};
      a["align-content"] = false;
      a["align-items"] = false;
      a["align-self"] = false;
      a["alignment-adjust"] = false;
      a["alignment-baseline"] = false;
      a["all"] = false;
      a["anchor-point"] = false;
      a["animation"] = false;
      a["animation-delay"] = false;
      a["animation-direction"] = false;
      a["animation-duration"] = false;
      a["animation-fill-mode"] = false;
      a["animation-iteration-count"] = false;
      a["animation-name"] = false;
      a["animation-play-state"] = false;
      a["animation-timing-function"] = false;
      a["azimuth"] = false;
      a["backface-visibility"] = false;
      a["background"] = true;
      a["background-attachment"] = true;
      a["background-clip"] = true;
      a["background-color"] = true;
      a["background-image"] = true;
      a["background-origin"] = true;
      a["background-position"] = true;
      a["background-repeat"] = true;
      a["background-size"] = true;
      a["baseline-shift"] = false;
      a["binding"] = false;
      a["bleed"] = false;
      a["bookmark-label"] = false;
      a["bookmark-level"] = false;
      a["bookmark-state"] = false;
      a["border"] = true;
      a["border-bottom"] = true;
      a["border-bottom-color"] = true;
      a["border-bottom-left-radius"] = true;
      a["border-bottom-right-radius"] = true;
      a["border-bottom-style"] = true;
      a["border-bottom-width"] = true;
      a["border-collapse"] = true;
      a["border-color"] = true;
      a["border-image"] = true;
      a["border-image-outset"] = true;
      a["border-image-repeat"] = true;
      a["border-image-slice"] = true;
      a["border-image-source"] = true;
      a["border-image-width"] = true;
      a["border-left"] = true;
      a["border-left-color"] = true;
      a["border-left-style"] = true;
      a["border-left-width"] = true;
      a["border-radius"] = true;
      a["border-right"] = true;
      a["border-right-color"] = true;
      a["border-right-style"] = true;
      a["border-right-width"] = true;
      a["border-spacing"] = true;
      a["border-style"] = true;
      a["border-top"] = true;
      a["border-top-color"] = true;
      a["border-top-left-radius"] = true;
      a["border-top-right-radius"] = true;
      a["border-top-style"] = true;
      a["border-top-width"] = true;
      a["border-width"] = true;
      a["bottom"] = false;
      a["box-decoration-break"] = true;
      a["box-shadow"] = true;
      a["box-sizing"] = true;
      a["box-snap"] = true;
      a["box-suppress"] = true;
      a["break-after"] = true;
      a["break-before"] = true;
      a["break-inside"] = true;
      a["caption-side"] = false;
      a["chains"] = false;
      a["clear"] = true;
      a["clip"] = false;
      a["clip-path"] = false;
      a["clip-rule"] = false;
      a["color"] = true;
      a["color-interpolation-filters"] = true;
      a["column-count"] = false;
      a["column-fill"] = false;
      a["column-gap"] = false;
      a["column-rule"] = false;
      a["column-rule-color"] = false;
      a["column-rule-style"] = false;
      a["column-rule-width"] = false;
      a["column-span"] = false;
      a["column-width"] = false;
      a["columns"] = false;
      a["contain"] = false;
      a["content"] = false;
      a["counter-increment"] = false;
      a["counter-reset"] = false;
      a["counter-set"] = false;
      a["crop"] = false;
      a["cue"] = false;
      a["cue-after"] = false;
      a["cue-before"] = false;
      a["cursor"] = false;
      a["direction"] = false;
      a["display"] = true;
      a["display-inside"] = true;
      a["display-list"] = true;
      a["display-outside"] = true;
      a["dominant-baseline"] = false;
      a["elevation"] = false;
      a["empty-cells"] = false;
      a["filter"] = false;
      a["flex"] = false;
      a["flex-basis"] = false;
      a["flex-direction"] = false;
      a["flex-flow"] = false;
      a["flex-grow"] = false;
      a["flex-shrink"] = false;
      a["flex-wrap"] = false;
      a["float"] = false;
      a["float-offset"] = false;
      a["flood-color"] = false;
      a["flood-opacity"] = false;
      a["flow-from"] = false;
      a["flow-into"] = false;
      a["font"] = true;
      a["font-family"] = true;
      a["font-feature-settings"] = true;
      a["font-kerning"] = true;
      a["font-language-override"] = true;
      a["font-size"] = true;
      a["font-size-adjust"] = true;
      a["font-stretch"] = true;
      a["font-style"] = true;
      a["font-synthesis"] = true;
      a["font-variant"] = true;
      a["font-variant-alternates"] = true;
      a["font-variant-caps"] = true;
      a["font-variant-east-asian"] = true;
      a["font-variant-ligatures"] = true;
      a["font-variant-numeric"] = true;
      a["font-variant-position"] = true;
      a["font-weight"] = true;
      a["grid"] = false;
      a["grid-area"] = false;
      a["grid-auto-columns"] = false;
      a["grid-auto-flow"] = false;
      a["grid-auto-rows"] = false;
      a["grid-column"] = false;
      a["grid-column-end"] = false;
      a["grid-column-start"] = false;
      a["grid-row"] = false;
      a["grid-row-end"] = false;
      a["grid-row-start"] = false;
      a["grid-template"] = false;
      a["grid-template-areas"] = false;
      a["grid-template-columns"] = false;
      a["grid-template-rows"] = false;
      a["hanging-punctuation"] = false;
      a["height"] = true;
      a["hyphens"] = false;
      a["icon"] = false;
      a["image-orientation"] = false;
      a["image-resolution"] = false;
      a["ime-mode"] = false;
      a["initial-letters"] = false;
      a["inline-box-align"] = false;
      a["justify-content"] = false;
      a["justify-items"] = false;
      a["justify-self"] = false;
      a["left"] = false;
      a["letter-spacing"] = true;
      a["lighting-color"] = true;
      a["line-box-contain"] = false;
      a["line-break"] = false;
      a["line-grid"] = false;
      a["line-height"] = false;
      a["line-snap"] = false;
      a["line-stacking"] = false;
      a["line-stacking-ruby"] = false;
      a["line-stacking-shift"] = false;
      a["line-stacking-strategy"] = false;
      a["list-style"] = true;
      a["list-style-image"] = true;
      a["list-style-position"] = true;
      a["list-style-type"] = true;
      a["margin"] = true;
      a["margin-bottom"] = true;
      a["margin-left"] = true;
      a["margin-right"] = true;
      a["margin-top"] = true;
      a["marker-offset"] = false;
      a["marker-side"] = false;
      a["marks"] = false;
      a["mask"] = false;
      a["mask-box"] = false;
      a["mask-box-outset"] = false;
      a["mask-box-repeat"] = false;
      a["mask-box-slice"] = false;
      a["mask-box-source"] = false;
      a["mask-box-width"] = false;
      a["mask-clip"] = false;
      a["mask-image"] = false;
      a["mask-origin"] = false;
      a["mask-position"] = false;
      a["mask-repeat"] = false;
      a["mask-size"] = false;
      a["mask-source-type"] = false;
      a["mask-type"] = false;
      a["max-height"] = true;
      a["max-lines"] = false;
      a["max-width"] = true;
      a["min-height"] = true;
      a["min-width"] = true;
      a["move-to"] = false;
      a["nav-down"] = false;
      a["nav-index"] = false;
      a["nav-left"] = false;
      a["nav-right"] = false;
      a["nav-up"] = false;
      a["object-fit"] = false;
      a["object-position"] = false;
      a["opacity"] = false;
      a["order"] = false;
      a["orphans"] = false;
      a["outline"] = false;
      a["outline-color"] = false;
      a["outline-offset"] = false;
      a["outline-style"] = false;
      a["outline-width"] = false;
      a["overflow"] = false;
      a["overflow-wrap"] = false;
      a["overflow-x"] = false;
      a["overflow-y"] = false;
      a["padding"] = true;
      a["padding-bottom"] = true;
      a["padding-left"] = true;
      a["padding-right"] = true;
      a["padding-top"] = true;
      a["page"] = false;
      a["page-break-after"] = false;
      a["page-break-before"] = false;
      a["page-break-inside"] = false;
      a["page-policy"] = false;
      a["pause"] = false;
      a["pause-after"] = false;
      a["pause-before"] = false;
      a["perspective"] = false;
      a["perspective-origin"] = false;
      a["pitch"] = false;
      a["pitch-range"] = false;
      a["play-during"] = false;
      a["position"] = false;
      a["presentation-level"] = false;
      a["quotes"] = false;
      a["region-fragment"] = false;
      a["resize"] = false;
      a["rest"] = false;
      a["rest-after"] = false;
      a["rest-before"] = false;
      a["richness"] = false;
      a["right"] = false;
      a["rotation"] = false;
      a["rotation-point"] = false;
      a["ruby-align"] = false;
      a["ruby-merge"] = false;
      a["ruby-position"] = false;
      a["shape-image-threshold"] = false;
      a["shape-outside"] = false;
      a["shape-margin"] = false;
      a["size"] = false;
      a["speak"] = false;
      a["speak-as"] = false;
      a["speak-header"] = false;
      a["speak-numeral"] = false;
      a["speak-punctuation"] = false;
      a["speech-rate"] = false;
      a["stress"] = false;
      a["string-set"] = false;
      a["tab-size"] = false;
      a["table-layout"] = false;
      a["text-align"] = true;
      a["text-align-last"] = true;
      a["text-combine-upright"] = true;
      a["text-decoration"] = true;
      a["text-decoration-color"] = true;
      a["text-decoration-line"] = true;
      a["text-decoration-skip"] = true;
      a["text-decoration-style"] = true;
      a["text-emphasis"] = true;
      a["text-emphasis-color"] = true;
      a["text-emphasis-position"] = true;
      a["text-emphasis-style"] = true;
      a["text-height"] = true;
      a["text-indent"] = true;
      a["text-justify"] = true;
      a["text-orientation"] = true;
      a["text-overflow"] = true;
      a["text-shadow"] = true;
      a["text-space-collapse"] = true;
      a["text-transform"] = true;
      a["text-underline-position"] = true;
      a["text-wrap"] = true;
      a["top"] = false;
      a["transform"] = false;
      a["transform-origin"] = false;
      a["transform-style"] = false;
      a["transition"] = false;
      a["transition-delay"] = false;
      a["transition-duration"] = false;
      a["transition-property"] = false;
      a["transition-timing-function"] = false;
      a["unicode-bidi"] = false;
      a["vertical-align"] = false;
      a["visibility"] = false;
      a["voice-balance"] = false;
      a["voice-duration"] = false;
      a["voice-family"] = false;
      a["voice-pitch"] = false;
      a["voice-range"] = false;
      a["voice-rate"] = false;
      a["voice-stress"] = false;
      a["voice-volume"] = false;
      a["volume"] = false;
      a["white-space"] = false;
      a["widows"] = false;
      a["width"] = true;
      a["will-change"] = false;
      a["word-break"] = true;
      a["word-spacing"] = true;
      a["word-wrap"] = true;
      a["wrap-flow"] = false;
      a["wrap-through"] = false;
      a["writing-mode"] = false;
      a["z-index"] = false;
      return a
    }

    function e(a, b, c) {}

    function f(a, b, c) {}
    var g = /javascript\s*\:/gim;

    function h(a, b) {
      if (g.test(b)) return "";
      return b
    }
    c.whiteList = d();
    c.getDefaultWhiteList = d;
    c.onAttr = e;
    c.onIgnoreAttr = f;
    c.safeAttrValue = h
  }, {}],
  8: [function(a, b, c) {
    var d = a("./default");
    var e = a("./css");

    function f(a, b) {
      var c = new e(b);
      return c.process(a)
    }
    c = b.exports = f;
    c.FilterCSS = e;
    for (var g in d) c[g] = d[g];
    if (typeof window !== "undefined") {
      window.filterCSS = b.exports
    }
  }, {
    "./css": 6,
    "./default": 7
  }],
  9: [function(a, b, c) {
    var d = a("./util");

    function e(a, b) {
      a = d.trimRight(a);
      if (a[a.length - 1] !== ";") a += ";";
      var c = a.length;
      var e = false;
      var f = 0;
      var g = 0;
      var h = "";

      function i() {
        if (!e) {
          var c = d.trim(a.slice(f, g));
          var i = c.indexOf(":");
          if (i !== -1) {
            var j = d.trim(c.slice(0, i));
            var k = d.trim(c.slice(i + 1));
            if (j) {
              var l = b(f, h.length, j, k, c);
              if (l) h += l + "; "
            }
          }
        }
        f = g + 1
      }
      for (; g < c; g++) {
        var j = a[g];
        if (j === "/" && a[g + 1] === "*") {
          var k = a.indexOf("*/", g + 2);
          if (k === -1) break;
          g = k + 1;
          f = g + 1;
          e = false
        } else if (j === "(") {
          e = true
        } else if (j === ")") {
          e = false
        } else if (j === ";") {
          if (e) {} else {
            i()
          }
        } else if (j === "\n") {
          i()
        }
      }
      return d.trim(h)
    }
    b.exports = e
  }, {
    "./util": 10
  }],
  10: [function(a, b, c) {
    b.exports = {
      indexOf: function(a, b) {
        var c, d;
        if (Array.prototype.indexOf) {
          return a.indexOf(b)
        }
        for (c = 0, d = a.length; c < d; c++) {
          if (a[c] === b) {
            return c
          }
        }
        return -1
      },
      forEach: function(a, b, c) {
        var d, e;
        if (Array.prototype.forEach) {
          return a.forEach(b, c)
        }
        for (d = 0, e = a.length; d < e; d++) {
          b.call(c, a[d], d, a)
        }
      },
      trim: function(a) {
        if (String.prototype.trim) {
          return a.trim()
        }
        return a.replace(/(^\s*)|(\s*$)/g, "")
      },
      trimRight: function(a) {
        if (String.prototype.trimRight) {
          return a.trimRight()
        }
        return a.replace(/(\s*$)/g, "")
      }
    }
  }, {}]
}, {}, [2]);
(function(a) {
  a.cookie = function(a, b, c) {
    if (typeof b != "undefined") {
      c = c || {};
      if (b === null) {
        b = "";
        c.expires = -1
      }
      var d = "";
      if (c.expires && (typeof c.expires == "number" || c.expires.toUTCString)) {
        var e;
        if (typeof c.expires == "number") {
          e = new Date;
          e.setTime(e.getTime() + c.expires * 24 * 60 * 60 * 1e3)
        } else {
          e = c.expires
        }
        d = "; expires=" + e.toUTCString()
      }
      var f = c.path ? "; path=" + c.path : "";
      var g = c.domain ? "; domain=" + c.domain : "";
      var h = c.secure ? "; secure" : "";
      document.cookie = [a, "=", encodeURIComponent(b), d, f, g, h].join("")
    } else {
      var i = null;
      if (document.cookie && document.cookie != "") {
        var j = document.cookie.split(";");
        for (var k = 0; k < j.length; k++) {
          var l = jQuery.trim(j[k]);
          if (l.substring(0, a.length + 1) == a + "=") {
            i = decodeURIComponent(l.substring(a.length + 1));
            break
          }
        }
      }
      return i
    }
  }
})(jQuery);
var root = window;
root.IFR || (root.IFR = {});
IFR.env = function() {
  function a(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
  }
  var b = navigator.userAgent,
    c = null,
    d = function(a, b) {
      var c = a.split(b);
      c = c.shift() + "." + c.join("");
      return c * 1
    },
    e = {
      ua: b,
      version: null,
      ios: false,
      android: false,
      meizu: false,
      meizuVersion: null,
      weixin: false,
      wVersion: null,
      safariMobile: false,
      touchSupport: "createTouch" in document,
      hashSupport: !!("onhashchange" in window),
      qqbrowser: false
    };
  c = b.match(/MicroMessenger\/([\.0-9]+)/);
  if (c != null) {
    e.weixin = true;
    e.wVersion = d(c[1], ".")
  }
  c = b.match(/Android(\s|\/)([\.0-9]+)/);
  if (c != null) {
    e.android = true;
    e.version = d(c[2], ".");
    c = b.match(/(m1\snote|MEIZU|MX4|M040|M045|M351|M353|M355|M356)(\s)/);
    if (c != null) {
      e.meizu = true;
      e.meizuVersion = a(c[0])
    }
    c = b.match(/QQBrowser(\s|\/)([\.0-9]+)/);
    if (c != null) {
      e.qqbrowser = true
    }
    return e
  }
  c = b.match(/i(Pod|Pad|Phone).*\sOS\s([\_0-9]+)/);
  if (c != null) {
    e.ios = true;
    e.version = d(c[2], "_");
    c = b.match(/AppleWebKit([\/\.\s\w\(\)\,])+Safari\/([\.0-9])+/);
    if (c != null) {
      c = b.match(/CriOS|QQBrowser|MicroMessenger|UCBorowser|OPiOS|FxiOS|baidubrowser/);
      if (c == null) {
        e.safariMobile = true
      }
    }
    return e
  }
}();
IFR.env = IFR.env || {}
IFR.env.touchSupport = IFR.env.ios || IFR.env.android || IFR.env.touchSupport;
IFR.env.android4_4 = IFR.env.android && IFR.env.version >= 4.4;
IFR.env.mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(IFR.env.ua);
IFR.env.mobileiPad = /iPad.*?Mobile/i.test(IFR.env.ua);
IFR.env.mobileSafari = IFR.env.ios && IFR.env.ua.match(/AppleWebKit/);

function featureTest(a, b, c) {
  var d = a + ":",
    e = document.createElement("test"),
    f = e.style;
  if (!c) {
    f.cssText = d + ["-webkit-", "-moz-", "-ms-", "-o-", ""].join(b + ";" + d) + b + ";"
  } else {
    f.cssText = d + b
  }
  return f[a].indexOf(b) !== -1
}
IFR.env.positionStickySupport = featureTest("position", "sticky");
IFR.env.positionFixedSupport = featureTest("position", "fixed", true);
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function a(b, c) {
  setTimeout(b, c || 1)
};
var IFR = IFR || {};
IFR.Events = function() {
  var a = [];
  var b = a.push;
  var c = a.slice;
  var d = a.splice;
  var e = /\s+/;
  var f = function(a, b, c, d) {
    if (!c) return true;
    if (typeof c === "object") {
      for (var f in c) {
        a[b].apply(a, [f, c[f]].concat(d))
      }
    } else if (e.test(c)) {
      var g = c.split(e);
      for (var h = 0, i = g.length; h < i; h++) {
        a[b].apply(a, [g[h]].concat(d))
      }
    } else {
      return true
    }
  };
  var g = function(a, b) {
    var c, d = -1,
      e = a.length;
    switch (b.length) {
      case 0:
        while (++d < e)(c = a[d]).callback.call(c.ctx);
        return;
      case 1:
        while (++d < e)(c = a[d]).callback.call(c.ctx, b[0]);
        return;
      case 2:
        while (++d < e)(c = a[d]).callback.call(c.ctx, b[0], b[1]);
        return;
      case 3:
        while (++d < e)(c = a[d]).callback.call(c.ctx, b[0], b[1], b[2]);
        return;
      default:
        while (++d < e)(c = a[d]).callback.apply(c.ctx, b)
    }
  };
  var h = {
    on: function(a, b, c) {
      if (!(f(this, "on", a, [b, c]) && b)) return this;
      this._events || (this._events = {});
      var d = this._events[a] || (this._events[a] = []);
      d.push({
        callback: b,
        context: c,
        ctx: c || this
      });
      return this
    },
    once: function(a, b, c) {
      if (!(f(this, "once", a, [b, c]) && b)) return this;
      var d = this;
      var e = _.once(function() {
        d.off(a, e);
        b.apply(this, arguments)
      });
      e._callback = b;
      this.on(a, e, c);
      return this
    },
    off: function(a, b, c) {
      var d, e, g, h, i, j, k, l;
      if (!this._events || !f(this, "off", a, [b, c])) return this;
      if (!a && !b && !c) {
        this._events = {};
        return this
      }
      h = a ? [a] : _.keys(this._events);
      for (i = 0, j = h.length; i < j; i++) {
        a = h[i];
        if (d = this._events[a]) {
          g = [];
          if (b || c) {
            for (k = 0, l = d.length; k < l; k++) {
              e = d[k];
              if (b && b !== e.callback && b !== e.callback._callback || c && c !== e.context) {
                g.push(e)
              }
            }
          }
          this._events[a] = g
        }
      }
      return this
    },
    trigger: function(a) {
      if (!this._events) return this;
      var b = c.call(arguments, 1);
      if (!f(this, "trigger", a, b)) return this;
      var d = this._events[a];
      var e = this._events.all;
      if (d) g(d, b);
      if (e) g(e, arguments);
      return this
    },
    listenTo: function(a, b, c) {
      var d = this._listeners || (this._listeners = {});
      var e = a._listenerId || (a._listenerId = _.uniqueId("l"));
      d[e] = a;
      a.on(b, typeof b === "object" ? this : c, this);
      return this
    },
    stopListening: function(a, b, c) {
      var d = this._listeners;
      if (!d) return;
      if (a) {
        a.off(b, typeof b === "object" ? this : c, this);
        if (!b && !c) delete d[a._listenerId]
      } else {
        if (typeof b === "object") c = this;
        for (var e in d) {
          d[e].off(b, c, this)
        }
        this._listeners = {}
      }
      return this
    }
  };
  return h
}();
var IFR = IFR || {};
IFR.Store = function(a) {
  var b = {},
    c = "localStorage",
    d;
  b.disabled = false;
  b.set = function(a, b) {};
  b.get = function(a) {};
  b.remove = function(a) {};
  b.clear = function() {};
  b.transact = function(a, c, d) {
    var e = b.get(a);
    if (d == null) {
      d = c;
      c = null
    }
    if (typeof e == "undefined") {
      e = c || {}
    }
    d(e);
    b.set(a, e)
  };
  b.getAll = function() {};
  b.forEach = function() {};
  b.serialize = function(a) {
    return JSON.stringify(a)
  };
  b.deserialize = function(a) {
    if (typeof a != "string") {
      return undefined
    }
    try {
      return JSON.parse(a)
    } catch (b) {
      return a || undefined
    }
  };

  function e() {
    try {
      return c in a && a[c]
    } catch (a) {
      return false
    }
  }
  if (e()) {
    d = a[c];
    b.set = function(a, c) {
      try {
        if (c === undefined) {
          return b.remove(a)
        }
        d.setItem(a, b.serialize(c))
      } catch (a) {
        if (a.name.toUpperCase() == "QUOTA_EXCEEDED_ERR") {
          return false
        }
      }
      return c
    };
    b.get = function(a) {
      return b.deserialize(d.getItem(a))
    };
    b.remove = function(a) {
      d.removeItem(a);
      d.removeItem(a + "_timestamp");
      b._removeKeyChangeListener(a)
    };
    b.clear = function() {
      b.storageEventCallbacks = [];
      d.clear()
    };
    b.getAll = function() {
      var a = {};
      b.forEach(function(b, c) {
        a[b] = c
      });
      return a
    };
    b.forEach = function(a) {
      for (var c = 0; c < d.length; c++) {
        var e = d.key(c);
        a(e, b.get(e))
      }
    }
  }
  try {
    var f = "__storejs__";
    b.set(f, f);
    if (b.get(f) != f) {
      b.disabled = true
    }
    b.remove(f)
  } catch (a) {
    b.disabled = true
  }
  b.enabled = !b.disabled;
  return b
}(window); + function(a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap");
    var b = {
      WebkitTransition: "webkitTransitionEnd",
      transition: "transitionend"
    };
    for (var c in b) {
      if (a.style[c] !== undefined) {
        return {
          end: b[c]
        }
      }
    }
  }
  a.fn.removeClassPrefix = function(a) {
    this.each(function(b, c) {
      var d = c.className.split(" ").map(function(b) {
        return b.indexOf(a) === 0 ? "" : b
      });
      c.className = d.join(" ")
    });
    return this
  };
  a.fn.transitionEnd = function(b, c) {
    var d = false,
      e = this;
    b && (b = a.proxy(b, e));
    a(this).one(a.support.transition.end, function() {
      d = true;
      b && b()
    });
    var f = function() {
      if (!d) a(e).trigger(a.support.transition.end)
    };
    setTimeout(f, c);
    return this
  };
  a.fn.classAnimoEnd = function(b, c, d) {
    var e = this;
    c && (c = a.proxy(c, e));
    var f = a(e).length;
    a(e).removeClass(b).one(a.support.animate.end, function() {
      c && c();
      if (f > 1) {
        f--;
        if (f === 0) d && d()
      }
    });
    requestAnimationFrame(function() {
      a(e).addClass(b);
      if (e.length) {
        var c = e[0];
        if (c.style.display === "none") c.style.display = "block"
      }
    });
    return this
  };
  a.support.transition = b();
  a.support.animate = {
    end: "webkitAnimationEnd animationend"
  };
  a.fn.isDisNone = function() {
    return this.style.display === "none"
  };
  a.fn.disBlock = function() {
    this.each(function(a, b) {
      b.style.display = "block"
    });
    return this
  };
  a.fn.disNone = function() {
    this.each(function(a, b) {
      b.style.display = "none"
    });
    return this
  };
  a.fn.clsShow = function() {
    a(this).removeClass("hide");
    return this
  };
  a.fn.clsHide = function() {
    a(this).addClass("hide");
    return this
  };
  a.fn.sWidth = function(a) {
    this.each(function(b, c) {
      c.style.width = a + "px"
    });
    return this
  };
  a.fn.sHeight = function(a) {
    this.each(function(b, c) {
      c.style.height = a + "px"
    });
    return this
  };
  a.fn.sWTransX = function(a) {
    this.each(function(b, c) {
      c.style.webkitTransform = "translateX(" + a + "px)"
    });
    return this
  };
  a.fn.sWTransY = function(a) {
    this.each(function(b, c) {
      c.style.webkitTransform = "translateY(" + a + "px)"
    });
    return this
  };
  a.fn.sWTransDuration = function(a) {
    a = a ? a + "ms" : "";
    this.each(function(b, c) {
      c.style.webkitTransitionDuration = a
    });
    return this
  };
  a.fn.sScaleY = function(a) {
    this.each(function(b, c) {
      c.style.webkitTransform = "scaleY(" + a + ")"
    });
    return this
  };
  a.fn.sRotate = function(a) {
    this.each(function(b, c) {
      c.style.webkitTransform = "rotateZ(" + a + "deg)"
    });
    return this
  };
  a.fn.sHtml = function(a) {
    this.each(function(b, c) {
      c.innerHTML = a
    });
    return this
  }
}(window.$);
(function() {
  window.$clamp = function(a, b) {
    function c(a, b) {
      j.getComputedStyle || (j.getComputedStyle = function(a, b) {
        this.el = a;
        this.getPropertyValue = function(b) {
          var c = /(\-([a-z]){1})/g;
          "float" == b && (b = "styleFloat");
          c.test(b) && (b = b.replace(c, function(a, b, c) {
            return c.toUpperCase()
          }));
          return a.currentStyle && a.currentStyle[b] ? a.currentStyle[b] : null
        };
        return this
      });
      return j.getComputedStyle(a, null).getPropertyValue(b)
    }

    function d(b) {
      b = b || a.clientHeight;
      var c = f(a);
      return Math.max(Math.floor(b / c), 0)
    }

    function e(b) {
      return f(a) * b
    }

    function f(a) {
      var b = c(a, "line-height");
      "normal" == b && (b = 1.2 * parseInt(c(a, "font-size")));
      return parseInt(b)
    }

    function g(b) {
      if (b.lastChild.children && 0 < b.lastChild.children.length) return g(Array.prototype.slice.call(b.children).pop());
      if (b.lastChild && b.lastChild.nodeValue && "" != b.lastChild.nodeValue && b.lastChild.nodeValue != k.truncationChar) return b.lastChild;
      b.lastChild.parentNode.removeChild(b.lastChild);
      return g(a)
    }

    function h(b, c) {
      if (c) {
        var d = b.nodeValue.replace(k.truncationChar, "");
        t || (s = 0 < r.length ? r.shift() : "", t = d.split(s));
        1 < t.length ? (u = t.pop(), i(b, t.join(s))) : t = null;
        q && (b.nodeValue = b.nodeValue.replace(k.truncationChar, ""), a.innerHTML = b.nodeValue + " " + q.innerHTML + k.truncationChar);
        if (t) {
          if (a.clientHeight <= c)
            if (0 <= r.length && "" != s) i(b, t.join(s) + s + u), t = null;
            else return a.innerHTML
        } else "" == s && (i(b, ""), b = g(a), r = k.splitOnChars.slice(0), s = r[0], u = t = null);
        if (k.animate) setTimeout(function() {
          h(b, c)
        }, !0 === k.animate ? 10 : k.animate);
        else return h(b, c)
      }
    }

    function i(a, b) {
      a.nodeValue = b + k.truncationChar
    }
    b = b || {};
    var j = window,
      k = {
        clamp: b.clamp || 2,
        useNativeClamp: "undefined" != typeof b.useNativeClamp ? b.useNativeClamp : !0,
        splitOnChars: b.splitOnChars || [".", "-", "–", "—", " "],
        animate: b.animate || !1,
        truncationChar: b.truncationChar || "…",
        truncationHTML: b.truncationHTML
      },
      l = a.style,
      m = a.innerHTML,
      n = "undefined" != typeof a.style.webkitLineClamp,
      o = k.clamp,
      p = o.indexOf && (-1 < o.indexOf("px") || -1 < o.indexOf("em")),
      q;
    k.truncationHTML && (q = document.createElement("span"), q.innerHTML = k.truncationHTML);
    var r = k.splitOnChars.slice(0),
      s = r[0],
      t, u;
    "auto" == o ? o = d() : p && (o = d(parseInt(o)));
    var v;
    n && k.useNativeClamp ? (l.overflow = "hidden", l.textOverflow = "ellipsis", l.webkitBoxOrient = "vertical", l.display = "-webkit-box", l.webkitLineClamp = o, p && (l.height = k.clamp + "px")) : (l = e(o), l <= a.clientHeight && (v = h(g(a), l)));
    return {
      original: m,
      clamped: v
    }
  }
})();
(function(a) {
  a.fn.qrcode = function(b) {
    var c;

    function d(a) {
      this.mode = c;
      this.data = a
    }

    function e(a, b) {
      this.typeNumber = a;
      this.errorCorrectLevel = b;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = []
    }

    function f(a, b) {
      if (void 0 == a.length) throw Error(a.length + "/" + b);
      for (var c = 0; c < a.length && 0 == a[c];) c++;
      this.num = Array(a.length - c + b);
      for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c]
    }

    function g(a, b) {
      this.totalCount = a;
      this.dataCount = b
    }

    function h() {
      this.buffer = [];
      this.length = 0
    }
    d.prototype = {
      getLength: function() {
        return this.data.length
      },
      write: function(a) {
        for (var b = 0; b < this.data.length; b++) a.put(this.data.charCodeAt(b), 8)
      }
    };
    e.prototype = {
      addData: function(a) {
        this.dataList.push(new d(a));
        this.dataCache = null
      },
      isDark: function(a, b) {
        if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw Error(a + "," + b);
        return this.modules[a][b]
      },
      getModuleCount: function() {
        return this.moduleCount
      },
      make: function() {
        if (1 > this.typeNumber) {
          for (var a = 1, a = 1; 40 > a; a++) {
            for (var b = g.getRSBlocks(a, this.errorCorrectLevel), c = new h, d = 0, e = 0; e < b.length; e++) d += b[e].dataCount;
            for (e = 0; e < this.dataList.length; e++) b = this.dataList[e], c.put(b.mode, 4), c.put(b.getLength(), i.getLengthInBits(b.mode, a)), b.write(c);
            if (c.getLengthInBits() <= 8 * d) break
          }
          this.typeNumber = a
        }
        this.makeImpl(!1, this.getBestMaskPattern())
      },
      makeImpl: function(a, b) {
        this.moduleCount = 4 * this.typeNumber + 17;
        this.modules = Array(this.moduleCount);
        for (var c = 0; c < this.moduleCount; c++) {
          this.modules[c] = Array(this.moduleCount);
          for (var d = 0; d < this.moduleCount; d++) this.modules[c][d] = null
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(a, b);
        7 <= this.typeNumber && this.setupTypeNumber(a);
        null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
        this.mapData(this.dataCache, b)
      },
      setupPositionProbePattern: function(a, b) {
        for (var c = -1; 7 >= c; c++)
          if (!(-1 >= a + c || this.moduleCount <= a + c))
            for (var d = -1; 7 >= d; d++) - 1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = 0 <= c && 6 >= c && (0 == d || 6 == d) || 0 <= d && 6 >= d && (0 == c || 6 == c) || 2 <= c && 4 >= c && 2 <= d && 4 >= d ? !0 : !1)
      },
      getBestMaskPattern: function() {
        for (var a = 0, b = 0, c = 0; 8 > c; c++) {
          this.makeImpl(!0, c);
          var d = i.getLostPoint(this);
          if (0 == c || a > d) a = d, b = c
        }
        return b
      },
      createMovieClip: function(a, b, c) {
        a = a.createEmptyMovieClip(b, c);
        this.make();
        for (b = 0; b < this.modules.length; b++)
          for (var c = 1 * b, d = 0; d < this.modules[b].length; d++) {
            var e = 1 * d;
            this.modules[b][d] && (a.beginFill(0, 100), a.moveTo(e, c), a.lineTo(e + 1, c), a.lineTo(e + 1, c + 1), a.lineTo(e, c + 1), a.endFill())
          }
        return a
      },
      setupTimingPattern: function() {
        for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
        for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
      },
      setupPositionAdjustPattern: function() {
        for (var a = i.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++)
          for (var c = 0; c < a.length; c++) {
            var d = a[b],
              e = a[c];
            if (null == this.modules[d][e])
              for (var f = -2; 2 >= f; f++)
                for (var g = -2; 2 >= g; g++) this.modules[d + f][e + g] = -2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? !0 : !1
          }
      },
      setupTypeNumber: function(a) {
        for (var b = i.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
          var d = !a && 1 == (b >> c & 1);
          this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d
        }
        for (c = 0; 18 > c; c++) d = !a && 1 == (b >> c & 1), this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
      },
      setupTypeInfo: function(a, b) {
        for (var c = i.getBCHTypeInfo(this.errorCorrectLevel << 3 | b), d = 0; 15 > d; d++) {
          var e = !a && 1 == (c >> d & 1);
          6 > d ? this.modules[d][8] = e : 8 > d ? this.modules[d + 1][8] = e : this.modules[this.moduleCount - 15 + d][8] = e
        }
        for (d = 0; 15 > d; d++) e = !a && 1 == (c >> d & 1), 8 > d ? this.modules[8][this.moduleCount - d - 1] = e : 9 > d ? this.modules[8][15 - d - 1 + 1] = e : this.modules[8][15 - d - 1] = e;
        this.modules[this.moduleCount - 8][8] = !a
      },
      mapData: function(a, b) {
        for (var c = -1, d = this.moduleCount - 1, e = 7, f = 0, g = this.moduleCount - 1; 0 < g; g -= 2)
          for (6 == g && g--;;) {
            for (var h = 0; 2 > h; h++)
              if (null == this.modules[d][g - h]) {
                var j = !1;
                f < a.length && (j = 1 == (a[f] >>> e & 1));
                i.getMask(b, d, g - h) && (j = !j);
                this.modules[d][g - h] = j;
                e--; - 1 == e && (f++, e = 7)
              }
            d += c;
            if (0 > d || this.moduleCount <= d) {
              d -= c;
              c = -c;
              break
            }
          }
      }
    };
    e.PAD0 = 236;
    e.PAD1 = 17;
    e.createData = function(a, b, c) {
      for (var b = g.getRSBlocks(a, b), d = new h, f = 0; f < c.length; f++) {
        var j = c[f];
        d.put(j.mode, 4);
        d.put(j.getLength(), i.getLengthInBits(j.mode, a));
        j.write(d)
      }
      for (f = a = 0; f < b.length; f++) a += b[f].dataCount;
      if (d.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + d.getLengthInBits() + ">" + 8 * a + ")");
      for (d.getLengthInBits() + 4 <= 8 * a && d.put(0, 4); 0 != d.getLengthInBits() % 8;) d.putBit(!1);
      for (; !(d.getLengthInBits() >= 8 * a);) {
        d.put(e.PAD0, 8);
        if (d.getLengthInBits() >= 8 * a) break;
        d.put(e.PAD1, 8)
      }
      return e.createBytes(d, b)
    };
    e.createBytes = function(a, b) {
      for (var c = 0, d = 0, e = 0, g = Array(b.length), h = Array(b.length), j = 0; j < b.length; j++) {
        var k = b[j].dataCount,
          l = b[j].totalCount - k,
          d = Math.max(d, k),
          e = Math.max(e, l);
        g[j] = Array(k);
        for (var m = 0; m < g[j].length; m++) g[j][m] = 255 & a.buffer[m + c];
        c += k;
        m = i.getErrorCorrectPolynomial(l);
        k = new f(g[j], m.getLength() - 1).mod(m);
        h[j] = Array(m.getLength() - 1);
        for (m = 0; m < h[j].length; m++) l = m + k.getLength() - h[j].length, h[j][m] = 0 <= l ? k.get(l) : 0
      }
      for (m = j = 0; m < b.length; m++) j += b[m].totalCount;
      c = Array(j);
      for (m = k = 0; m < d; m++)
        for (j = 0; j < b.length; j++) m < g[j].length && (c[k++] = g[j][m]);
      for (m = 0; m < e; m++)
        for (j = 0; j < b.length; j++) m < h[j].length && (c[k++] = h[j][m]);
      return c
    };
    c = 4;
    for (var i = {
        PATTERN_POSITION_TABLE: [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170]
        ],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function(a) {
          for (var b = a << 10; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G15);) b ^= i.G15 << i.getBCHDigit(b) - i.getBCHDigit(i.G15);
          return (a << 10 | b) ^ i.G15_MASK
        },
        getBCHTypeNumber: function(a) {
          for (var b = a << 12; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G18);) b ^= i.G18 << i.getBCHDigit(b) - i.getBCHDigit(i.G18);
          return a << 12 | b
        },
        getBCHDigit: function(a) {
          for (var b = 0; 0 != a;) b++, a >>>= 1;
          return b
        },
        getPatternPosition: function(a) {
          return i.PATTERN_POSITION_TABLE[a - 1]
        },
        getMask: function(a, b, c) {
          switch (a) {
            case 0:
              return 0 == (b + c) % 2;
            case 1:
              return 0 == b % 2;
            case 2:
              return 0 == c % 3;
            case 3:
              return 0 == (b + c) % 3;
            case 4:
              return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2;
            case 5:
              return 0 == b * c % 2 + b * c % 3;
            case 6:
              return 0 == (b * c % 2 + b * c % 3) % 2;
            case 7:
              return 0 == (b * c % 3 + (b + c) % 2) % 2;
            default:
              throw Error("bad maskPattern:" + a)
          }
        },
        getErrorCorrectPolynomial: function(a) {
          for (var b = new f([1], 0), c = 0; c < a; c++) b = b.multiply(new f([1, j.gexp(c)], 0));
          return b
        },
        getLengthInBits: function(a, b) {
          if (1 <= b && 10 > b) switch (a) {
            case 1:
              return 10;
            case 2:
              return 9;
            case c:
              return 8;
            case 8:
              return 8;
            default:
              throw Error("mode:" + a)
          } else if (27 > b) switch (a) {
            case 1:
              return 12;
            case 2:
              return 11;
            case c:
              return 16;
            case 8:
              return 10;
            default:
              throw Error("mode:" + a)
          } else if (41 > b) switch (a) {
            case 1:
              return 14;
            case 2:
              return 13;
            case c:
              return 16;
            case 8:
              return 12;
            default:
              throw Error("mode:" + a)
          } else throw Error("type:" + b)
        },
        getLostPoint: function(a) {
          for (var b = a.getModuleCount(), c = 0, d = 0; d < b; d++)
            for (var e = 0; e < b; e++) {
              for (var f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++)
                if (!(0 > d + h || b <= d + h))
                  for (var i = -1; 1 >= i; i++) 0 > e + i || b <= e + i || 0 == h && 0 == i || g == a.isDark(d + h, e + i) && f++;
              5 < f && (c += 3 + f - 5)
            }
          for (d = 0; d < b - 1; d++)
            for (e = 0; e < b - 1; e++)
              if (f = 0, a.isDark(d, e) && f++, a.isDark(d + 1, e) && f++, a.isDark(d, e + 1) && f++, a.isDark(d + 1, e + 1) && f++, 0 == f || 4 == f) c += 3;
          for (d = 0; d < b; d++)
            for (e = 0; e < b - 6; e++) a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40);
          for (e = 0; e < b; e++)
            for (d = 0; d < b - 6; d++) a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40);
          for (e = f = 0; e < b; e++)
            for (d = 0; d < b; d++) a.isDark(d, e) && f++;
          a = Math.abs(100 * f / b / b - 50) / 5;
          return c + 10 * a
        }
      }, j = {
        glog: function(a) {
          if (1 > a) throw Error("glog(" + a + ")");
          return j.LOG_TABLE[a]
        },
        gexp: function(a) {
          for (; 0 > a;) a += 255;
          for (; 256 <= a;) a -= 255;
          return j.EXP_TABLE[a]
        },
        EXP_TABLE: Array(256),
        LOG_TABLE: Array(256)
      }, k = 0; 8 > k; k++) j.EXP_TABLE[k] = 1 << k;
    for (k = 8; 256 > k; k++) j.EXP_TABLE[k] = j.EXP_TABLE[k - 4] ^ j.EXP_TABLE[k - 5] ^ j.EXP_TABLE[k - 6] ^ j.EXP_TABLE[k - 8];
    for (k = 0; 255 > k; k++) j.LOG_TABLE[j.EXP_TABLE[k]] = k;
    f.prototype = {
      get: function(a) {
        return this.num[a]
      },
      getLength: function() {
        return this.num.length
      },
      multiply: function(a) {
        for (var b = Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++)
          for (var d = 0; d < a.getLength(); d++) b[c + d] ^= j.gexp(j.glog(this.get(c)) + j.glog(a.get(d)));
        return new f(b, 0)
      },
      mod: function(a) {
        if (0 > this.getLength() - a.getLength()) return this;
        for (var b = j.glog(this.get(0)) - j.glog(a.get(0)), c = Array(this.getLength()), d = 0; d < this.getLength(); d++) c[d] = this.get(d);
        for (d = 0; d < a.getLength(); d++) c[d] ^= j.gexp(j.glog(a.get(d)) + b);
        return new f(c, 0).mod(a)
      }
    };
    g.RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];
    g.getRSBlocks = function(a, b) {
      var c = g.getRsBlockTable(a, b);
      if (void 0 == c) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);
      for (var d = c.length / 3, e = [], f = 0; f < d; f++)
        for (var h = c[3 * f + 0], i = c[3 * f + 1], j = c[3 * f + 2], k = 0; k < h; k++) e.push(new g(i, j));
      return e
    };
    g.getRsBlockTable = function(a, b) {
      switch (b) {
        case 1:
          return g.RS_BLOCK_TABLE[4 * (a - 1) + 0];
        case 0:
          return g.RS_BLOCK_TABLE[4 * (a - 1) + 1];
        case 3:
          return g.RS_BLOCK_TABLE[4 * (a - 1) + 2];
        case 2:
          return g.RS_BLOCK_TABLE[4 * (a - 1) + 3]
      }
    };
    h.prototype = {
      get: function(a) {
        return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
      },
      put: function(a, b) {
        for (var c = 0; c < b; c++) this.putBit(1 == (a >>> b - c - 1 & 1))
      },
      getLengthInBits: function() {
        return this.length
      },
      putBit: function(a) {
        var b = Math.floor(this.length / 8);
        this.buffer.length <= b && this.buffer.push(0);
        a && (this.buffer[b] |= 128 >>> this.length % 8);
        this.length++
      }
    };
    "string" === typeof b && (b = {
      text: b
    });
    b = a.extend({}, {
      render: "canvas",
      width: 256,
      height: 256,
      typeNumber: -1,
      correctLevel: 2,
      background: "#ffffff",
      foreground: "#000000"
    }, b);
    return this.each(function() {
      var c;
      if ("canvas" == b.render) {
        c = new e(b.typeNumber, b.correctLevel);
        c.addData(b.text);
        c.make();
        var d = document.createElement("canvas");
        d.width = b.width;
        d.height = b.height;
        for (var f = d.getContext("2d"), g = b.width / c.getModuleCount(), h = b.height / c.getModuleCount(), i = 0; i < c.getModuleCount(); i++)
          for (var j = 0; j < c.getModuleCount(); j++) {
            f.fillStyle = c.isDark(i, j) ? b.foreground : b.background;
            var k = Math.ceil((j + 1) * g) - Math.floor(j * g),
              l = Math.ceil((i + 1) * g) - Math.floor(i * g);
            f.fillRect(Math.round(j * g), Math.round(i * h), k, l)
          }
      } else {
        c = new e(b.typeNumber, b.correctLevel);
        c.addData(b.text);
        c.make();
        d = a("<table></table>").css("width", b.width + "px").css("height", b.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", b.background);
        f = b.width / c.getModuleCount();
        g = b.height / c.getModuleCount();
        for (h = 0; h < c.getModuleCount(); h++) {
          i = a("<tr></tr>").css("height", g + "px").appendTo(d);
          for (j = 0; j < c.getModuleCount(); j++) a("<td></td>").css("width", f + "px").css("background-color", c.isDark(h, j) ? b.foreground : b.background).appendTo(i)
        }
      }
      c = d;
      jQuery(c).appendTo(this)
    })
  }
})(jQuery);
if ("undefined" == typeof jQuery) throw new Error("Bootstrap requires jQuery"); + function(a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
      b = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for (var c in b)
      if (void 0 !== a.style[c]) return {
        end: b[c]
      }
  }
  a.fn.emulateTransitionEnd = function(b) {
    var c = !1,
      d = this;
    a(this).one(a.support.transition.end, function() {
      c = !0
    });
    var e = function() {
      c || a(d).trigger(a.support.transition.end)
    };
    return setTimeout(e, b), this
  }, a(function() {
    a.support.transition = b()
  })
}(window.jQuery), + function(a) {
  "use strict";
  var b = '[data-dismiss="alert"]',
    c = function(c) {
      a(c).on("click", b, this.close)
    };
  c.prototype.close = function(b) {
    function c() {
      f.trigger("closed.bs.alert").remove()
    }
    var d = a(this),
      e = d.attr("data-target");
    e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
    var f = a(e);
    b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
  };
  var d = a.fn.alert;
  a.fn.alert = function(b) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.alert");
      e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
    })
  }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function() {
    return a.fn.alert = d, this
  }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(c, d) {
    this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d)
  };
  b.DEFAULTS = {
    loadingText: "loading..."
  }, b.prototype.setState = function(a) {
    var b = "disabled",
      c = this.$element,
      d = c.is("input") ? "val" : "html",
      e = c.data();
    a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function() {
      "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
    }, 0)
  }, b.prototype.toggle = function() {
    var a = this.$element.closest('[data-toggle="buttons"]');
    if (a.length) {
      var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
      "radio" === b.prop("type") && a.find(".active").removeClass("active")
    }
    this.$element.toggleClass("active")
  };
  var c = a.fn.button;
  a.fn.button = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.button"),
        f = "object" == typeof c && c;
      e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
    })
  }, a.fn.button.Constructor = b, a.fn.button.noConflict = function() {
    return a.fn.button = c, this
  }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(b) {
    var c = a(b.target);
    c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
  })
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(b, c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
  };
  b.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0
  }, b.prototype.cycle = function(b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
  }, b.prototype.getActiveIndex = function() {
    return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
  }, b.prototype.to = function(b) {
    var c = this,
      d = this.getActiveIndex();
    return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function() {
      c.to(b)
    }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
  }, b.prototype.pause = function(b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, b.prototype.next = function() {
    return this.sliding ? void 0 : this.slide("next")
  }, b.prototype.prev = function() {
    return this.sliding ? void 0 : this.slide("prev")
  }, b.prototype.slide = function(b, c) {
    var d = this.$element.find(".item.active"),
      e = c || d[b](),
      f = this.interval,
      g = "next" == b ? "left" : "right",
      h = "next" == b ? "first" : "last",
      i = this;
    if (!e.length) {
      if (!this.options.wrap) return;
      e = this.$element.find(".item")[h]()
    }
    this.sliding = !0, f && this.pause();
    var j = a.Event("slide.bs.carousel", {
      relatedTarget: e[0],
      direction: g
    });
    if (!e.hasClass("active")) {
      if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
          var b = a(i.$indicators.children()[i.getActiveIndex()]);
          b && b.addClass("active")
        })), a.support.transition && this.$element.hasClass("slide")) {
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function() {
          e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
            i.$element.trigger("slid")
          }, 0)
        }).emulateTransitionEnd(600)
      } else {
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
      }
      return f && this.cycle(), this
    }
  };
  var c = a.fn.carousel;
  a.fn.carousel = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.carousel"),
        f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
        g = "string" == typeof c ? c : f.slide;
      e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
    })
  }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function() {
    return a.fn.carousel = c, this
  }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(b) {
    var c, d = a(this),
      e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
      f = a.extend({}, e.data(), d.data()),
      g = d.attr("data-slide-to");
    g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
  }), a(window).on("load", function() {
    a('[data-ride="carousel"]').each(function() {
      var b = a(this);
      b.carousel(b.data())
    })
  })
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(c, d) {
    this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
  };
  b.DEFAULTS = {
    toggle: !0
  }, b.prototype.dimension = function() {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height"
  }, b.prototype.show = function() {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b = a.Event("show.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.$parent && this.$parent.find("> .panel > .in");
        if (c && c.length) {
          var d = c.data("bs.collapse");
          if (d && d.transitioning) return;
          c.collapse("hide"), d || c.data("bs.collapse", null)
        }
        var e = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
        var f = function() {
          this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
        };
        if (!a.support.transition) return f.call(this);
        var g = a.camelCase(["scroll", e].join("-"));
        this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
      }
    }
  }, b.prototype.hide = function() {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
        var d = function() {
          this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
        };
        return a.support.transition ? (this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350), void 0) : d.call(this)
      }
    }
  }, b.prototype.toggle = function() {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  };
  var c = a.fn.collapse;
  a.fn.collapse = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.collapse"),
        f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
      e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
    return a.fn.collapse = c, this
  }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(b) {
    var c, d = a(this),
      e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
      f = a(e),
      g = f.data("bs.collapse"),
      h = g ? "toggle" : d.data(),
      i = d.attr("data-parent"),
      j = i && a(i);
    g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
  })
}(window.jQuery), + function(a) {
  "use strict";

  function b() {
    a(d).remove(), a(e).each(function(b) {
      var d = c(a(this));
      d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"))
    })
  }

  function c(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent()
  }
  var d = ".dropdown-backdrop",
    e = "[data-toggle=dropdown]",
    f = function(b) {
      a(b).on("click.bs.dropdown", this.toggle)
    };
  f.prototype.toggle = function(d) {
    var e = a(this);
    if (!e.is(".disabled, :disabled")) {
      var f = c(e),
        g = f.hasClass("open");
      if (b(), !g) {
        if ("ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented()) return;
        f.toggleClass("open").trigger("shown.bs.dropdown"), e.focus()
      }
      return !1
    }
  }, f.prototype.keydown = function(b) {
    if (/(38|40|27)/.test(b.keyCode)) {
      var d = a(this);
      if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
        var f = c(d),
          g = f.hasClass("open");
        if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click();
        var h = a("[role=menu] li:not(.divider):visible a", f);
        if (h.length) {
          var i = h.index(h.filter(":focus"));
          38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus()
        }
      }
    }
  };
  var g = a.fn.dropdown;
  a.fn.dropdown = function(b) {
    return this.each(function() {
      var c = a(this),
        d = c.data("dropdown");
      d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
    })
  }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
    return a.fn.dropdown = g, this
  }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
    a.stopPropagation()
  }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown)
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(b, c) {
    this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
  };
  b.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, b.prototype.toggle = function(a) {
    return this[this.isShown ? "hide" : "show"](a)
  }, b.prototype.show = function(b) {
    var c = this,
      d = a.Event("show.bs.modal", {
        relatedTarget: b
      });
    this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
      var d = a.support.transition && c.$element.hasClass("fade");
      c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
      var e = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function() {
        c.$element.focus().trigger(e)
      }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
    }))
  }, b.prototype.hide = function(b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
  }, b.prototype.enforceFocus = function() {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
    }, this))
  }, b.prototype.escape = function() {
    this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
      27 == a.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
  }, b.prototype.hideModal = function() {
    var a = this;
    this.$element.hide(), this.backdrop(function() {
      a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
    })
  }, b.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, b.prototype.backdrop = function(b) {
    var c = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var d = a.support.transition && c;
      if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function(a) {
          a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
        }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
    } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
  };
  var c = a.fn.modal;
  a.fn.modal = function(c, d) {
    return this.each(function() {
      var e = a(this),
        f = e.data("bs.modal"),
        g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
      f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
    })
  }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function() {
    return a.fn.modal = c, this
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(b) {
    var c = a(this),
      d = c.attr("href"),
      e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
      f = e.data("modal") ? "toggle" : a.extend({
        remote: !/#/.test(d) && d
      }, e.data(), c.data());
    b.preventDefault(), e.modal(f, this).one("hide", function() {
      c.is(":visible") && c.focus()
    })
  }), a(document).on("show.bs.modal", ".modal", function() {
    a(document.body).addClass("modal-open")
  }).on("hidden.bs.modal", ".modal", function() {
    a(document.body).removeClass("modal-open")
  })
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(a, b) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
  };
  b.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1
  }, b.prototype.init = function(b, c, d) {
    this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
      else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focus",
          i = "hover" == g ? "mouseleave" : "blur";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, b.prototype.getDefaults = function() {
    return b.DEFAULTS
  }, b.prototype.getOptions = function(b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b
  }, b.prototype.getDelegateOptions = function() {
    var b = {},
      c = this.getDefaults();
    return this._options && a.each(this._options, function(a, d) {
      c[a] != d && (b[a] = d)
    }), b
  }, b.prototype.enter = function(b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? (c.timeout = setTimeout(function() {
      "in" == c.hoverState && c.show()
    }, c.options.delay.show), void 0) : c.show()
  }, b.prototype.leave = function(b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? (c.timeout = setTimeout(function() {
      "out" == c.hoverState && c.hide()
    }, c.options.delay.hide), void 0) : c.hide()
  }, b.prototype.show = function() {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      if (this.$element.trigger(b), b.isDefaultPrevented()) return;
      var c = this.tip();
      this.setContent(), this.options.animation && c.addClass("fade");
      var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement,
        e = /\s?auto?\s?/i,
        f = e.test(d);
      f && (d = d.replace(e, "") || "top"), c.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
      var g = this.getPosition(),
        h = c[0].offsetWidth,
        i = c[0].offsetHeight;
      if (f) {
        var j = this.$element.parent(),
          k = d,
          l = document.documentElement.scrollTop || document.body.scrollTop,
          m = "body" == this.options.container ? window.innerWidth : j.outerWidth(),
          n = "body" == this.options.container ? window.innerHeight : j.outerHeight(),
          o = "body" == this.options.container ? 0 : j.offset().left;
        d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d)
      }
      var p = this.getCalculatedOffset(d, g, h, i);
      this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type)
    }
  }, b.prototype.applyPlacement = function(a, b) {
    var c, d = this.tip(),
      e = d[0].offsetWidth,
      f = d[0].offsetHeight,
      g = parseInt(d.css("margin-top"), 10),
      h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in");
    var i = d[0].offsetWidth,
      j = d[0].offsetHeight;
    if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) {
      var k = 0;
      a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left")
    } else this.replaceArrow(j - f, j, "top");
    c && d.offset(a)
  }, b.prototype.replaceArrow = function(a, b, c) {
    this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
  }, b.prototype.setContent = function() {
    var a = this.tip(),
      b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, b.prototype.hide = function() {
    function b() {
      "in" != c.hoverState && d.detach()
    }
    var c = this,
      d = this.tip(),
      e = a.Event("hide.bs." + this.type);
    return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this)
  }, b.prototype.fixTitle = function() {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, b.prototype.hasContent = function() {
    return this.getTitle()
  }, b.prototype.getPosition = function() {
    var b = this.$element[0];
    return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
      width: b.offsetWidth,
      height: b.offsetHeight
    }, this.$element.offset())
  }, b.prototype.getCalculatedOffset = function(a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    }
  }, b.prototype.getTitle = function() {
    var a, b = this.$element,
      c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
  }, b.prototype.tip = function() {
    return this.$tip = this.$tip || a(this.options.template)
  }, b.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, b.prototype.validate = function() {
    this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
  }, b.prototype.enable = function() {
    this.enabled = !0
  }, b.prototype.disable = function() {
    this.enabled = !1
  }, b.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled
  }, b.prototype.toggle = function(b) {
    var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
    c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, b.prototype.destroy = function() {
    this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };
  var c = a.fn.tooltip;
  a.fn.tooltip = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.tooltip"),
        f = "object" == typeof c && c;
      e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
    return a.fn.tooltip = c, this
  }
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(a, b) {
    this.init("popover", a, b)
  };
  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function() {
    return b.DEFAULTS
  }, b.prototype.setContent = function() {
    var a = this.tip(),
      b = this.getTitle(),
      c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, b.prototype.hasContent = function() {
    return this.getTitle() || this.getContent()
  }, b.prototype.getContent = function() {
    var a = this.$element,
      b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
  }, b.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  }, b.prototype.tip = function() {
    return this.$tip || (this.$tip = a(this.options.template)), this.$tip
  };
  var c = a.fn.popover;
  a.fn.popover = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.popover"),
        f = "object" == typeof c && c;
      e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
    return a.fn.popover = c, this
  }
}(window.jQuery), + function(a) {
  "use strict";

  function b(c, d) {
    var e, f = a.proxy(this.process, this);
    this.$element = a(c).is("body") ? a(window) : a(c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
  }
  b.DEFAULTS = {
    offset: 10
  }, b.prototype.refresh = function() {
    var b = this.$element[0] == window ? "offset" : "position";
    this.offsets = a([]), this.targets = a([]);
    var c = this;
    this.$body.find(this.selector).map(function() {
      var d = a(this),
        e = d.data("target") || d.attr("href"),
        f = /^#\w/.test(e) && a(e);
      return f && f.length && [
        [f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]
      ] || null
    }).sort(function(a, b) {
      return a[0] - b[0]
    }).each(function() {
      c.offsets.push(this[0]), c.targets.push(this[1])
    })
  }, b.prototype.process = function() {
    var a, b = this.$scrollElement.scrollTop() + this.options.offset,
      c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
      d = c - this.$scrollElement.height(),
      e = this.offsets,
      f = this.targets,
      g = this.activeTarget;
    if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
    for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function(b) {
    this.activeTarget = b, a(this.selector).parents(".active").removeClass("active");
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
      d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate")
  };
  var c = a.fn.scrollspy;
  a.fn.scrollspy = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.scrollspy"),
        f = "object" == typeof c && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
    return a.fn.scrollspy = c, this
  }, a(window).on("load", function() {
    a('[data-spy="scroll"]').each(function() {
      var b = a(this);
      b.scrollspy(b.data())
    })
  })
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(b) {
    this.element = a(b)
  };
  b.prototype.show = function() {
    var b = this.element,
      c = b.closest("ul:not(.dropdown-menu)"),
      d = b.data("target");
    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a")[0],
        f = a.Event("show.bs.tab", {
          relatedTarget: e
        });
      if (b.trigger(f), !f.isDefaultPrevented()) {
        var g = a(d);
        this.activate(b.parent("li"), c), this.activate(g, g.parent(), function() {
          b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e
          })
        })
      }
    }
  }, b.prototype.activate = function(b, c, d) {
    function e() {
      f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
    }
    var f = c.find("> .active"),
      g = d && a.support.transition && f.hasClass("fade");
    g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
  };
  var c = a.fn.tab;
  a.fn.tab = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.tab");
      e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
    })
  }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function() {
    return a.fn.tab = c, this
  }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
    b.preventDefault(), a(this).tab("show")
  })
}(window.jQuery), + function(a) {
  "use strict";
  var b = function(c, d) {
    this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition()
  };
  b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {
    offset: 0
  }, b.prototype.checkPositionWithEventLoop = function() {
    setTimeout(a.proxy(this.checkPosition, this), 1)
  }, b.prototype.checkPosition = function() {
    if (this.$element.is(":visible")) {
      var c = a(document).height(),
        d = this.$window.scrollTop(),
        e = this.$element.offset(),
        f = this.options.offset,
        g = f.top,
        h = f.bottom;
      "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom());
      var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
      this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({
        top: document.body.offsetHeight - h - this.$element.height()
      }))
    }
  };
  var c = a.fn.affix;
  a.fn.affix = function(c) {
    return this.each(function() {
      var d = a(this),
        e = d.data("bs.affix"),
        f = "object" == typeof c && c;
      e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function() {
    return a.fn.affix = c, this
  }, a(window).on("load", function() {
    a('[data-spy="affix"]').each(function() {
      var b = a(this),
        c = b.data();
      c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
    })
  })
}(window.jQuery);
(function(a, b) {
  "undefined" === typeof console && (b.console = {
    log: function() {}
  });
  IFR = b.IFR || {};
  IFR.util = IFR.util || {};
  IFR.url = b.location;
  IFR.url.hashValue = IFR.url.hash.slice(1);
  IFR.url.hrefWithoutHash = IFR.url.href.replace(IFR.url.hash, "");
  IFR.apiUrl = {
    yellowStoneAlsoLike: "https://yellowstone.ifanr.com/v1/alsolike/",
    SSO_API: "https://sso.ifanr.com/api/"
  };
  a.extend(a.easing, {
    easeInOutExpo: function(a, b, c, d, e) {
      if (b == 0) return c;
      if (b == e) return c + d;
      if ((b /= e / 2) < 1) return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
      return d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    }
  });
  a.extend(IFR, {
    isie6: false,
    isie: false,
    hasLocalStorage: !!b.localStorage,
    testStorage: function(a, b) {
      try {
        localStorage.setItem(a, b)
      } catch (a) {
        if (a.name.toUpperCase() == "QUOTA_EXCEEDED_ERR") {
          return false
        }
      }
    },
    setItem: function(a, b) {
      if (!IFR.hasLocalStorage) return false;
      try {
        b = JSON.stringify(b);
        localStorage.setItem(a, b)
      } catch (a) {
        if (a.name.toUpperCase() == "QUOTA_EXCEEDED_ERR") {
          return false
        }
      }
    },
    getItem: function(c) {
      if (!IFR.hasLocalStorage) return false;
      var d = b.localStorage.getItem(c);
      d = a.parseJSON(d);
      return d
    },
    share: function(c, d) {
      var e = {
        _t: document.title,
        _url: document.location.href,
        _pic: false,
        _topic: false
      };
      var f = a.extend({}, e, d);
      var g = encodeURI(f._t),
        h = encodeURIComponent(f._url);
      if (f._topic) var i = encodeURI(f._topic);
      if (f._pic) var j = encodeURI(f._pic);
      var k = 626,
        l = 436;
      var m = f._url;
      if (j) {
        m += "&pic=" + j
      } else {
        var n = a("article img");
        if (n.length) {
          m += "&pic=" + encodeURIComponent(n[0].src)
        }
      }
      b.open(m, "分享", "width=" + k + ",height=" + l + ", top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no")
    }
  });
  a.extend(IFR.util, {
    isie6: false,
    isie: false,
    isFF: !(window.mozInnerScreenX == null),
    isCanvasSupported: !!document.createElement("canvas").getContext,
    isInt: function(a) {
      return typeof a === "number" && parseFloat(a) == parseInt(a, 10) && !isNaN(a)
    },
    stopBubble: function(a) {
      var c = a || b.event;
      if (c && c.stopPropagation) c.stopPropagation();
      else c.cancelBubble = true
    },
    stopDefault: function(a) {
      a = arguments.callee.caller.arguments[0] || b.event;
      if (a && a.preventDefault) a.preventDefault();
      else a.returnValue = false;
      return false
    },
    exid: function(a) {
      var b = document.getElementById(a);
      if (b) {
        return true
      } else {
        return false
      }
    },
    random: function(a, b, c, d) {
      !b && (!c && !d) && (b = c = d = !0);
      var e = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "abcdefghijklmnopqrstuvwxyz".split(""), "0123456789".split("")];
      var f = [];
      var g = "";
      f = b ? f.concat(e[0]) : f;
      f = c ? f.concat(e[1]) : f;
      f = d ? f.concat(e[2]) : f;
      for (var h = 0; h < a; h++) {
        g += f[Math.round(Math.random() * (f.length - 1))]
      }
      return g
    },
    objToParam: function(a, b) {
      var c = [];
      for (var d in a) {
        var e = b ? b + "[" + d + "]" : d,
          f = a[d];
        c.push(typeof f == "object" ? IFR.util.objToParam(f, e) : encodeURIComponent(e) + "=" + encodeURIComponent(f))
      }
      return c.join("&")
    },
    paramToObj: function(a) {
      var b = /([^&=]+)=?([^&]*)/g;
      var c = /\+/g;
      var d = function(a) {
        return decodeURIComponent(a.replace(c, " "))
      };
      var e = {},
        f;
      while (f = b.exec(a)) {
        var g = d(f[1]),
          h = d(f[2]);
        if (g.substring(g.length - 2) === "[]") {
          g = g.substring(0, g.length - 2);
          (e[g] || (e[g] = [])).push(h)
        } else e[g] = h
      }
      return e
    },
    unix: function() {
      return Math.round(+new Date / 1e3)
    },
    milliseconds: function() {
      return (new Date).getTime()
    },
    relativetime: function(a) {
      if (typeof a === "number") {
        var b = new Date(a * 1e3)
      } else if (typeof a === "string") {
        var c = a.split(/[- :]/),
          b = new Date(c[0], c[1] - 1, c[2], c[3], c[4], c[5])
      } else {}
      a = b.getTime();
      var d = IFR.util.milliseconds();
      var e = b.getFullYear();
      var f = new Date(d).getFullYear();
      var g = d - a;
      var h = Math.floor(Math.abs(g) / 1e3);
      var i = Math.floor(h / 60);
      var j = Math.floor(h / 3600);
      var k = (new Date).getDate() - b.getDate();
      var l;
      if (h >= 86400) {
        if (k == 1) {
          l = "昨天 " + IFR.util.formatTime(b, "short")
        } else if (k == 2) {
          l = "前天 " + IFR.util.formatTime(b, "short")
        } else if (e === f) {
          l = IFR.util.formatTime(b, "withNoYear")
        } else {
          l = IFR.util.formatTime(b, "full")
        }
      } else if (k == 1) {
        l = "昨天 " + IFR.util.formatTime(b, "short")
      } else if (h >= 3600) {
        l = "今天 " + IFR.util.formatTime(b, "short")
      } else if (h >= 60) {
        l = i + " 分钟前"
      } else {
        l = "刚刚"
      }
      return l
    },
    isLeapYear: function(a) {
      return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    },
    daysInYear: function(a) {
      var b = a.getFullYear();
      return IFR.util.isLeapYear(b) ? 366 : 365
    },
    formatTime: function(a, b) {
      var c = (new Date).getFullYear(),
        d = a.getFullYear(),
        e = a.getMonth() + 1,
        f = a.getDate(),
        g = a.getHours(),
        h = a.getMinutes() + "",
        i;
      if (g < 10) g = "0" + g;
      if (h.length == 1) h = "0" + h;
      switch (b) {
        case "short":
          i = g + ":" + h;
          break;
        case "withNoYear":
          i = e + "-" + f + " " + g + ":" + h;
          if (d != c) {
            i = d + "-" + i
          }
          break;
        default:
        case "full":
          i = d + "-" + e + "-" + f;
          break
      }
      return i
    },
    linkify: function(a) {
      var b, c, d, e;
      c = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      b = a.replace(c, '<a href="$1" target="_blank">$1</a>');
      d = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      b = b.replace(d, '$1<a href="http://$2" target="_blank">$2</a>');
      e = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
      b = b.replace(e, '<a href="mailto:$1">$1</a>');
      return b
    },
    flashColor: function(b) {
      var c = a("#" + b);
      if (c.length) {
        var d = c.css("backgroundColor");
        c.animate({
          backgroundColor: "yellow"
        }, "normal", "linear", function() {
          a(this).animate({
            backgroundColor: d
          })
        })
      }
    },
    fixDownloadLinkInWeixin: function(a) {
      if (!a.length) return;
      var b = a.attr("href");
      if (IFR.weixin) {
        var c = "http://mp.weixin.qq.com/mp/redirect?url=" + encodeURIComponent(b) + "#wechat_redirect";
        a.attr("href", c)
      }
      return a
    }
  })
})(jQuery, window);
(function(a) {
  a.ifr = a.ifr || {};
  return a.extend(a.ifr, {
    scrollTo: function(b, c, d, e) {
      var f;
      d = d ? d : {};
      if (b.jquery && b.length) {
        b = b.offset().top
      } else if (a(b).length) {
        b = a(b).offset().top
      }
      if (typeof b !== "number") {
        return false
      }
      if (c == "smooth") {
        f = {
          queue: !1,
          duration: 800,
          easing: "easeInOutExpo",
          complete: e
        }
      }
      if (typeof c === "number") {
        f = c
      }
      if (!f) f = 0;
      a("html,body").animate({
        scrollTop: b - (d.offset ? d.offset : 0)
      }, f)
    },
    smoothScrollTo: function(a, b, c) {
      this.scrollTo(a, "smooth", b, c)
    },
    scrollToHash: function() {
      if (IFR.url.hashValue) {
        this.scrollTo(a("#" + IFR.url.hashValue))
      }
    }
  })
})($);
(function(a) {
  ns = ns || {};
  ns.defaultUserAvatar = "http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/gravatar.jpg";
  ns.prepareCommenterInfo = function() {
    var b = this;
    a.ajax({
      url: "https://sso.ifanr.com/api/v1/user_profile/",
      type: "get",
      xhrFields: {
        withCredentials: true
      },
      localCacheTime: 0
    }).success(function(b) {
      IFR.api("get_user_avatar", {
        data: {
          sso_id: b.user_id
        },
        success: function(c) {
          var d = c.data || ns.defaultUserAvatar;
          var e = b.nickname || b.username;
          a(".js-login").clsShow();
          a(".js-not-login").clsHide();
          a(".js-logout").attr("href", ns.SSO_URL_LOGOUT + "?next_url=" + encodeURIComponent(window.location.href));
          a(".J_UserIdentity").html(e);
          a(".js-user-avatar").attr("src", d);
          a("#login-btn").html(e).attr("href", ns.SSO_URL_MYACCOUNT);
          IFR.user.id = b.user_id;
          IFR.user.name = e;
          IFR.user.avatarUrl = d;
          IFR.Events.trigger("ifr.ssouser.initialized", {
            id: b.user_id,
            name: e,
            avatarUrl: d
          })
        }
      })
    }).error(function() {
      b.unauthorized()
    })
  };
  ns.unauthorized = function() {
    a(".js-not-login").clsShow();
    a(".js-login").clsHide();
    a("#author").val(a.cookie(ns.COMMENTER_NAME));
    a("#email").val(a.cookie(ns.COMMENTER_EMAIL));
    a(".J_LoginButtons a").each(function() {
      var b = a(this);
      b.attr("href", b.attr("href") + "?next=" + encodeURIComponent(IFR.url.href))
    });
    if (!IFR.isMobile) {
      a(".JS_formInFieldLabels label").inFieldLabels()
    }
    IFR.user.id = "";
    IFR.Events.trigger("ifr.ssouser.unauthorized")
  };
  ns.addLoadingConfig = function(a, b) {
    b.cancel_cache = false;
    b.add_dasheng_fields = true;
    var c = a.attr("data-home");
    var d = a.attr("data-post_type-id");
    if (d) {
      b.post_type = d
    }
    var e = a.attr("data-cat-id");
    if (e) b.category_id = e;
    var f = a.attr("data-author-id");
    if (f) b.author_id = f;
    var g = a.attr("data-tag-id");
    if (g) b.tag_id = g;
    return b
  }
})(jQuery);
(function(a) {
  ns.wpPageNowIs = function(b) {
    if (a("body").hasClass(b)) return true;
    return false
  };
  a.fn.opacityToggle = function(a, b, c) {
    return this.animate({
      opacity: "toggle"
    }, a, b, c)
  };
  a.fn.viewportCenter = function() {
    this.css("position", "absolute");
    this.css("top", (a(w).height() - this.outerHeight()) / 3 + a(w).scrollTop() + "px");
    this.css("left", (a(w).width() - this.outerWidth()) / 2 + a(w).scrollLeft() + "px");
    this.show();
    return this
  }
})(jQuery);
(function(a) {
  window.IFR = window.IFR || {};
  var b = {
    setCache: function(a, c, d) {
      var e = b.parseCacheKey(a, c.data);
      d.timeStamp = IFR.util.unix();
      IFR.setItem(e, d)
    },
    getCache: function(a, c) {
      var d = b.parseCacheKey(a, c.data),
        e = IFR.getItem(d);
      if (e && IFR.util.unix() - c.localCacheTime < e.timeStamp) {
        return e
      }
      return false
    },
    parseCacheKey: function(a, b) {
      var c = a;
      if (typeof b !== "undefined") {
        if (typeof b === "object") {
          b = IFR.util.objToParam(b)
        }
        c = c + "&" + b
      }
      c = md5(c);
      return c
    }
  };
  var c = function(c, d) {
    if (!c || c == "") return false;
    var e = {
      type: "get",
      localCacheTime: 60,
      debug: 1,
      dataType: "jsonp"
    };
    var f = this,
      g = a.extend({}, e, d),
      h;
    if (!g.debug && g.localCacheTime) {
      h = b.getCache(c, g);
      if (h) {
        return g.success(h)
      }
    }
    if (typeof g.data === "string") {
      g.data = IFR.util.paramToObj(g.data)
    }
    if (typeof g.data != "undefined" && g.data.cross_domain && g.dataType == "jsonp") {
      return
    }
    a.ajax({
      type: g.type,
      url: IFR.api_url + "?action=" + c,
      cache: false,
      data: a.extend({}, g.data, IFR.apiNonce),
      dataType: g.dataType,
      success: function(a) {
        if (g.type == "get" && g.localCacheTime) b.setCache(c, g, a);
        g.success && g.success(a)
      },
      error: function(a, b, c) {
        if (g.debug) {
          console.log("xhr.status: " + a.status);
          console.log("xhr.statusText: " + a.statusText);
          console.log("xhr.readyState: " + a.readyState);
          console.log("xhr.responseText: " + a.responseText);
          console.log("xhr.responseXML: " + a.responseXML);
          console.log("textStatus: " + b);
          console.log("errorThrown: " + c);
          console.log("xhr.redirect: " + a.redirect);
          g.error && g.error(a)
        }
        return false
      }
    })
  };
  window.IFR.api = function(a, b) {
    return new c(a, b)
  }
})(jQuery);
(function(a, b) {
  if (!ns.wpPageNowIs("single-app")) return;
  var c = window.location.href;
  var d = c.substr(c.lastIndexOf("#") + 1);
  if (d === "app-download-buttons") {
    b("#entry-content").remove()
  }
})(window, jQuery);
(function(a, b) {
  "use strict";
  var c = function(a) {
    this.init(a)
  };
  c.prototype = {
    init: function(b) {
      this.$el = a(b);
      this.cacheDOM();
      this.bindEvents()
    },
    cacheDOM: function() {
      this.$tabs = this.$el.find(".js-tabs");
      this.$tips = this.$el.find(".js-tips");
      this.$tougaoForm = this.$el.find(".js-tougao-form");
      this.$tougaoMail = this.$tougaoForm.find(".js-tougao-submit");
      this.$form = this.$el.find(".js-form");
      this.$formControl = this.$el.find(".form-control");
      this.$select = this.$el.find(".js-select");
      this.$selectOptionInput = this.$el.find("option[data-show-input]");
      this.$report = this.$el.find(".report-submit")
    },
    bindShareEvents: function() {
      window.wx.onMenuShareAppMessage({
        title: "寻求报道 | 爱范儿",
        desc: "有好产品或项目？马上来爱范儿发布吧！"
      });
      window.wx.onMenuShareTimeline({
        title: "有好产品或项目？马上来爱范儿发布吧！"
      })
    },
    bindEvents: function() {
      var b = this;
      if (window.wx) {
        this.bindShareEvents()
      }
      this.$select.on("change", b.eSelectEvent.bind(b));
      b.$tabs.find(".tab-link").on("click", function(c) {
        var d = a(this);
        var e = d.attr("href");
        var f = a(e);
        c.preventDefault();
        d.parent().addClass("active").siblings().removeClass("active");
        f.addClass("active").siblings().removeClass("active");
        if (f.attr("hide-tips") !== undefined) {
          b.$tips.hide()
        } else {
          b.$tips.show()
        }
      });
      this.$formControl.on("change keyup", function() {
        var b = a(this);
        if (b.hasClass("error")) {
          b.removeClass("error")
        }
      });
      this.$tougaoMail.on("click", b.eTougaoSubmit.bind(b));
      this.$form.on("submit", b.eSubmit.bind(b));
      this.$report.on("click", function(a) {
        b.forReport()
      })
    },
    eTougaoSubmit: function(a) {
      var b = {};
      var c = this.$tougaoMail.attr("href");
      var d;
      d = this.validateForm(this.$tougaoForm);
      if (!d) {
        a.preventDefault();
        return false
      }
      b = this.getMailString(this.$tougaoForm);
      c = c.replace("{body}", b.content);
      c = c.replace("{subject}", b.subject);
      this.$tougaoMail.attr("href", c);
      $tougaoForm[0].reset()
    },
    eSelectEvent: function(b) {
      var c = a(b.target);
      var d = c.parent();
      var e = c.find("option:selected");
      var f;
      if (!e.attr("data-show-input")) {
        d.find(".js-select-input").removeAttr("required").fadeOut();
        return
      }
      f = d.find(e.data("showInput"));
      f.attr("required", "required").fadeIn()
    },
    setSelectInputValueToOption: function() {
      this.$selectOptionInput.each(function() {
        var b = a(this);
        var c = a(b.data("showInput"));
        var d = c.val();
        if (d) {
          b.val(d)
        }
      })
    },
    getMailString: function(b) {
      var c = {
        subject: [],
        content: [],
        recipient: "",
        type: ""
      };
      var d = this;
      var e = b.find(".form-label");
      var f = b.data("title");
      var g = b.data("type");
      var h = b.find(".js-input-recipient").val();
      e.each(function() {
        var e = a(this);
        var f = e.text();
        var g = "#" + e.attr("for");
        var h = b.find(g);
        var i = h.val() || h.data("default");
        var j;
        if (h.hasClass("js-subject")) {
          j = h.data("subjectIndex");
          c.subject[j] = i
        }
        f = d.formatString(f).replace(/:|：$/, "");
        i = d.formatString(i);
        c.content.push({
          key: f,
          value: i
        })
      });
      c.subject = this.formatString(c.subject.join("+"));
      c.content = template("email-report", {
        list: c.content
      });
      c.recipient = this.formatString(h);
      c.type = g;
      if (f) {
        c.subject = f + "：" + c.subject
      }
      return c
    },
    validateForm: function(b) {
      var c = b.find(".form-control");
      var d;
      var e;
      for (e = 0; e < c.length; e++) {
        var f;
        d = a(c[e]);
        f = d.val();
        if (d.attr("required") && f.length <= 0) {
          d.addClass("error").focus();
          return false
        }
        if (d.attr("type") === "email" && !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(f)) {
          d.addClass("error").focus();
          return false
        }
      }
      return true
    },
    eSubmit: function(b) {
      var c = {};
      var d = a(b.target);
      var e = d.find(".form-submit");
      var f;
      var g = this;
      b.preventDefault();
      f = this.validateForm(d);
      if (!f) {
        return false
      }
      g.setSelectInputValueToOption();
      g.toggleBtn(e);
      c = this.getMailString(d);
      IFR.api("submit_report", {
        data: c,
        success: function(a) {
          g.toggleBtn(e);
          if (a.status === 0) {
            switch (a.message) {
              case "error":
                alert("抱歉，服务器正在开小差，请稍后再尝试。");
                break;
              case "invalid":
                alert("信息填写不完整，请检查后再尝试。");
                break;
              default:
                alert(a.message);
                break
            }
          } else {
            d[0].reset();
            alert("提交成功，请耐心等待我们的审核。")
          }
        },
        error: function() {
          alert("网络连接失败，请检查网络连接状态后再尝试。");
          g.toggleBtn(e)
        }
      })
    },
    toggleBtn: function(a) {
      if (a.attr("disabled")) {
        a.removeAttr("disabled");
        a.val("提交")
      } else {
        a.attr("disabled", "disabled");
        a.val("提交中")
      }
    },
    stripTags: function(a) {
      return a.replace(/(<([^>]+)>)/gi, "")
    },
    encodeSpace: function(a) {
      return a.replace(/\s+/g, "%20")
    },
    formatString: function(a) {
      if (!a) {
        return a
      }
      a = this.stripTags(a);
      return a
    },
    forReport: function() {
      var b = this;
      a.ajax({
        url: "https://sso.ifanr.com/api/v1/user_profile/",
        type: "get",
        xhrFields: {
          withCredentials: true
        }
      }).success(function(a) {
        window.location.href = b.$report.data("report")
      }).error(function(a) {
        window.location.href = b.$report.data("sso")
      })
    }
  };
  b.IfanrReport = c
})(jQuery, window);
(function(a, b) {
  var c = function() {};
  c.fn = c.prototype;
  c.fn.loadComments = function() {
    var a = this;
    a.$commentsLoading.show();
    a.fetchCommentEntries(a.appendComments.bind(a))
  };
  c.fn.appendComments = function(a) {
    var c = this;
    c.commentsLength = a.length;
    b.each(a, function(a, b) {
      b.postId = c.postId;
      c.generateCommentTree(b)
    });
    c.$commentsList.appendTo(c.$commentsListContainer);
    c.$commentsList = c.$commentsListContainer.find(".js-comments-list");
    c.$commentsLoading.hide();
    IFR.Events.trigger("loaded.comments-list.article", {
      post_id: c.postId
    });
    b(".comment-avatar img").on("error", function(a) {
      b(this).attr("src", ns.defaultUserAvatar)
    })
  };
  c.fn.fetchCommentEntries = function(a) {
    var c = this,
      d = null,
      e = null;
    d = {
      post_id: c.postId
    };
    e = b.extend(d, c.commentAjaxConfig);
    IFR.api(c.fetchAction, {
      data: e,
      success: function(b) {
        if (!b.status) return;
        a(b.data)
      }
    })
  };
  c.fn.insertNewComment = function(a) {
    var c = this,
      e = null,
      f = null;
    e = template(c.commentEntryTemplate, a);
    f = b(e).clsShow();
    f.find(".comment-body").append('<div class="comment-submit-success">' + '<i class="icon-ok m-l-5 m-r-2"></i>提交成功</div>');
    c.appendNewComment(f, a);
    f.fadeIn(300, function() {
      d("#comment-" + a.comment_id)
    })
  };
  c.fn.onVoteComment = function(a) {
    var c = this,
      d = null,
      e = null,
      f = null;
    var g = c.postId;
    d = b(a.currentTarget);
    if (d.hasClass("rated")) return false;
    e = {
      post_id: g,
      comment_id: d.data("id"),
      rating_type: d.data("action")
    };
    f = b.extend(e, c.voteAjaxConfig);
    IFR.api("rating", {
      type: "post",
      data: f,
      success: function(a) {
        if (!a.status) {
          console.error(a.message);
          return
        }
        userActivityCollection.collectUserBehavior({
          post_id: g,
          behavior: userActivityCollection.behavior.vote
        });
        d.addClass("rated checkmark").find("span").text(a.data.rating);
        d.siblings(".js-rating").addClass("rated")
      }
    })
  };
  c.fn.onScrollToRepliedComment = function(a) {
    var c = b(a.currentTarget).attr("href");
    d(c);
    return false
  };
  c.fn.onToggleHiddenComment = function(a) {
    var c = b(a.currentTarget).attr("data-id");
    b("#J_RatingHideCmt-" + c).slideToggle("fast");
    return false
  };
  c.fn.onReplyComment = function(a) {
    var c = this;
    if (!c.$respondFormCmpt.isStateNormal()) return false;
    if (Boolean(IFR.user.id)) {
      var d = b(a.currentTarget),
        e = d.data("id"),
        f = d.data("parentid"),
        g = d.data("postid"),
        h = !d.hasClass(".js-reply-comment");
      c.$respondFormCmpt.replyComment({
        commentId: e,
        parentId: f,
        postId: g
      })
    } else {
      clearTimeout(c.timeoutId);
      c.$overlay.removeClass("hide");
      c.$loginItems.removeClass("hide")
    }
    return false
  };
  c.fn.hideAllLoginItems = function(a) {
    var c = this;
    b(".js-login-options").addClass("hide");
    var d = b("#login-overlay");
    d.css({
      opacity: 0
    });
    clearTimeout(c.timeoutId);
    c.timeoutId = setTimeout(function() {
      d.addClass("hide").css({
        opacity: 1
      })
    }, 200)
  };
  c.fn.unbindEvents = function() {
    this.$commentsCmpt.off("click", ".comment-at").off("click", ".J_DisplayRatingCmt").off("click", ".js-rating").off("click", ".js-reply-comment");
    this.$overlay.off("click");
    return this
  };
  c.fn.bindEvents = function() {
    var a = this;
    a.$commentsCmpt.on("click", ".comment-at", a.onScrollToRepliedComment.bind(a)).on("click", ".J_DisplayRatingCmt", a.onToggleHiddenComment.bind(a)).on("click", ".js-rating", a.onVoteComment.bind(a)).on("click", ".js-reply-comment", a.onReplyComment.bind(a));
    a.$overlay.off("click").on("click", a.hideAllLoginItems.bind(a))
  };
  c.fn.appendNewComment = function(a, c) {
    var d = this;
    if (c.comment_parent === "0") {
      d.$commentsList = d.$commentsListContainer.find(".js-comments-list");
      a.appendTo(d.$commentsList);
      return
    }
    var e = c.comment_parent + "-child",
      f = b("." + e),
      g = f.length > 0 ? f.last() : b(".js-comment-" + c.comment_parent);
    a.insertAfter(g);
    a.addClass(e);
    a.addClass("children")
  };
  c.fn.generateCommentTree = function(a) {
    console.error("error: not implemented by the subclass")
  };
  c.fn.init = function(a) {
    this.postId = a.id;
    this.$commentsCmpt = b('[data-cmpt-comments][data-post-id="' + this.postId + '"]');
    if (!this.$commentsCmpt.length) {
      return {
        render: function() {}
      }
    }
    this.$commentsListContainer = this.$commentsCmpt.find(".js-comments-list-container");
    this.$commentsList = b('<ol class="commentlist comments-list js-comments-list" />');
    this.$commentsLoading = this.$commentsCmpt.find(".js-comments-loading");
    this.commentEntryTemplate = null;
    this.fetchAction = a.commentType == "hot" ? "get_hot_comments" : "get_comments";
    this.commentAjaxConfig = {
      html_comment_content: 1,
      add_at_depth: 2,
      orderbyreply: 1
    };
    this.voteAjaxConfig = {};
    this.$respondFormCmpt = new ArticleRespondFormComponent;
    this.commentsLength = 0;
    this.$overlay = b("#login-overlay");
    this.$loginItems = b("#post-" + this.postId + "-comments-box").find(".js-login-options");
    return this
  };
  c.fn.render = function() {
    var a = this;
    (new RecommendArticlesComponent).search({
      id: a.postId,
      tag: ""
    });
    a.loadComments();
    a.bindEvents();
    return a
  };
  c.fn.rerender = function() {
    var a = this;
    a.loadComments();
    a.unbindEvents();
    a.bindEvents(false);
    return a
  };

  function d(a) {
    b("html,body").animate({
      scrollTop: b(a).offset().top
    }, {
      queue: !1,
      duration: 800,
      easing: "easeInOutExpo"
    });
    IFR.util.stopDefault()
  }
  a.ArticleCommentsComponent = c
})(window, jQuery);
(function(a, b) {
  var c = {
    searchIndex: null,
    algolia: null,
    applicationID: "7TN0U2FL3Q",
    apiKey: "97d5967e87b92827fa8b040bcc4c8581",
    indexName: "prod_ifanrcom"
  };
  c.init = function() {
    this.algolia = this.algolia || algoliasearch(this.applicationID, this.apiKey);
    this.searchIndex = this.searchIndex || this.algolia.initIndex(this.indexName)
  };
  c.init();
  var d = function() {};
  d.fn = d.prototype;
  d.fn.search = function() {
    var a = this,
      b = {
        hitsPerPage: 3,
        page: 0,
        facets: "*",
        attributesToRetrieve: "*"
      };
    c.searchIndex.search(a.postTag, b, function(b, c) {
      if (b || !c) {
        return
      }
      var d = c.hits;
      if (!d.length) {
        a.$relatedZone.hide();
        return
      }
      var e = template(a.template, {
        relatedRes: d
      });
      a.$relatedList.html(e)
    })
  };
  d.fn.render = function() {
    var a = this;
    a.search();
    return a
  };
  d.fn.init = function(a) {
    this.postId = a.id;
    this.postTag = a.tag;
    this.template = IFR.env.mobile ? "mobile-entry-related" : "desktop-entry-related";
    this.$relatedZone = b('[data-cmpt-related-articles][data-post-id="' + this.postId + '"]');
    this.$relatedList = this.$relatedZone.find(".js-related-list");
    return this
  };
  a.RelatedArticlesComponent = d
})(window, jQuery);
(function(a, b) {
  var c = function() {};
  c.fn = c.prototype;
  c.fn.search = function(a) {
    var c = this;
    var d = window.CDN_HOSTNAME || [];
    var e = /\w+:\/\/([^\:|\/]+)/i;
    c.postId = a.id;
    c.template = "mobile-entry-recommend";
    c.$relatedZone = b('[data-cmpt-recommend-articles][data-post-id="' + this.postId + '"]');
    c.$relatedList = this.$relatedZone.find(".js-recommend-list");
    b.ajax({
      url: IFR.apiUrl.yellowStoneAlsoLike + "?post_id=" + c.postId,
      type: "GET",
      dataType: "json",
      success: function(a) {
        if (a.length) {
          c.$relatedZone.show();
          a.forEach(function(b, c) {
            a[c].date = IFR.util.relativetime(b.date);
            if (a[c].author === undefined) {
              a[c].author = "未知"
            }
            var f = e.exec(b.cover_img);
            if (f && d.indexOf(f[1]) !== -1) {
              b.cover_img += "!320"
            }
          });
          var b = template(c.template, {
            relatedRes: a
          });
          c.$relatedList.html(b)
        }
      }
    })
  };
  a.RecommendArticlesComponent = c
})(window, jQuery);
(function(a, b) {
  var c = {};
  var d = function() {};
  d.fn = d.prototype;
  d.fn.isStateNormal = function() {
    var a = this.$form.attr("data-state") || "normal";
    return a === "normal"
  };
  d.fn.setFormState = function(a) {
    var b = this;
    if (a === "processing") {
      b.$formSubmitBtn.prop("disabled", true).addClass("processing").val("发表中...")
    } else if (a === "normal") {
      b.$formSubmitBtn.prop("disabled", false).removeClass("processing").val("发表评论")
    }
    b.$form.attr("data-state", a)
  };
  d.fn.onSubmitComment = function(a) {
    var c = this;
    var d = c.$formContainer.data("post-id");
    if (!c.isStateNormal()) return false;
    c.$processingTip.clsShow().slideDown();
    c.setFormState("processing");
    c.$formContainer.find(".js-cmt-hidden").remove();
    IFR.api("post_comment", {
      type: "post",
      data: c.$form.serialize(),
      success: function(a) {
        if (a.status && a.status === 1) {
          c.afterSubmitSuccess(a.data);
          userActivityCollection.collectUserBehavior({
            post_id: d,
            behavior: userActivityCollection.behavior.comment
          });
          b.cookie(ns.COMMENTER_EMAIL, c.$commenterEmail.val());
          b.cookie(ns.COMMENTER_NAME, c.$commenterName.val())
        } else {
          c.showErrorTips(a.message)
        }
      },
      error: function(a) {
        c.showErrorTips(result.message)
      }
    });
    return false
  };
  d.fn.showErrorTips = function(a) {
    var b = this;
    b.$processingTip.clsHide().slideUp();
    b.$errorMsg.clsShow().slideDown().html('<i class="icon-remove"></i> ' + a);
    b.errorMsgDelay ? clearTimeout(b.errorMsgDelay) : null;
    b.errorMsgDelay = setTimeout(function() {
      b.$errorMsg.clsHide().slideUp()
    }, 3e3);
    b.setFormState("normal");
    return false
  };
  d.fn.afterSubmitSuccess = function(a) {
    var b = this;
    b.$processingTip.hide();
    b.$commentContent.val("");
    b.commentsComponent.insertNewComment(a);
    b.resetForm();
    return false
  };
  d.fn.resetForm = function() {
    var a = this,
      b = a.$commentsCmpt.find(".js-wp-temp-form-div");
    if (b.length > 0) {
      a.$formContainer.insertAfter(b);
      b.remove();
      a.$replyTitle.clsHide();
      a.$commentTitle.clsShow();
      a.$cancelReply.clsHide();
      a.$formSubmitBtn.val("发表评论")
    }
    a.$serialRepliedParentComment.val("0");
    a.setFormState("normal")
  };
  d.fn.bindEvents = function() {
    var a = this;
    a.$formSubmitBtn.on("click", a.onSubmitComment.bind(a));
    a.$cancelReplyBtn.on("click", a.onCloseReplyForm.bind(a));
    a.$mailNotifyChecked.on("click", function() {
      a.$mailNotifyChecked.addClass("hide");
      a.$mailNotifyUnchecked.removeClass("hide");
      a.$mailNotifier.attr("checked", false)
    });
    a.$mailNotifyUnchecked.on("click", function() {
      a.$mailNotifyChecked.removeClass("hide");
      a.$mailNotifyUnchecked.addClass("hide");
      a.$mailNotifier.attr("checked", true)
    })
  };
  d.fn.onCloseReplyForm = function(a) {
    var b = this;
    if (!b.isStateNormal()) return false;
    b.resetForm();
    return false
  };
  d.fn.replyComment = function(a) {
    var c = this,
      d = c.$commentsCmpt.find(".js-comment-" + a.commentId),
      e = d.find(".comment-content").first(),
      f = c.$commentsCmpt.find(".js-wp-temp-form-div");
    c.$formSubmitBtn.val("回复");
    if (f.length === 0) {
      f = b('<div class="js-wp-temp-form-div" style="display:none;"></div>');
      f.insertBefore(c.$formContainer)
    }
    c.$formContainer.insertAfter(e);
    c.$serialRepliedPost.val(a.postId);
    c.$serialRepliedParentComment.val(a.parentId);
    c.$replyTitle.clsShow();
    c.$commentTitle.clsHide();
    c.$cancelReply.clsShow()
  };
  d.fn.authCheck = function() {
    if (Boolean(IFR.user.id)) {
      this.$formContainer.find(".js-not-login").clsHide();
      this.$formContainer.find(".js-login").clsShow();
      b(".J_UserIdentity").html(IFR.user.name);
      b(".js-user-avatar").attr("src", IFR.user.avatarUrl)
    } else {
      this.$formContainer.find(".js-not-login").clsShow();
      this.$formContainer.find(".js-login").clsHide()
    }
  };
  d.fn.render = function() {
    var a = this;
    var c = b("input[name=formDisabled]");
    if (c.length > 0 && c.val() === "true") {
      a.submit = function() {
        a.showErrorTips(formDisabled.attr("data-desc"));
        return false
      }
    }
    a.bindEvents();
    a.authCheck();
    return a
  };
  d.fn.init = function(a) {
    this.commentsComponent = a;
    this.$commentsCmpt = this.commentsComponent.$commentsCmpt;
    this.$formContainer = this.$commentsCmpt.find('[data-cmpt-respond-form][data-post-id="' + a.postId + '"]');
    this.$replyTitle = this.$formContainer.find(".js-reply-title");
    this.$commentTitle = this.$formContainer.find(".js-comment-title");
    this.$cancelReply = this.$formContainer.find(".js-cancel-comment-reply");
    this.$cancelReplyBtn = this.$cancelReply.find(".js-cancel-button");
    this.$form = this.$formContainer.find(".js-respond-form");
    this.$commenterEmail = this.$form.find('input[name="email"]');
    this.$commenterName = this.$form.find('input[name="author"]');
    this.$commentContent = this.$form.find(".js-comment-content");
    this.$formSubmitBtn = this.$form.find(".js-comment-submit");
    this.$processingTip = this.$form.find(".js-comment-processing");
    this.$errorMsg = this.$form.find(".js-error-msg");
    this.errorMsgDelay = null;
    this.$serialRepliedParentComment = this.$form.find('input[name="comment_parent"]');
    this.$serialRepliedPost = this.$form.find('input[name="comment_post_ID"]');
    this.$mailNotifyContainer = this.$formContainer.find(".js-comment-mail-notify");
    this.$mailNotifier = this.$mailNotifyContainer.find(".js-comment-mail-notifier");
    this.$mailNotifyChecked = this.$mailNotifyContainer.find(".js-notify-checked");
    this.$mailNotifyUnchecked = this.$mailNotifyContainer.find(".js-notify-unchecked");
    this.$mailNotifyContainer.addClass("js-login");
    return this
  };
  a.ArticleRespondFormComponent = d
})(window, jQuery);
(function(a) {
  var b = function(b) {
    a.ajax({
      type: "post",
      url: IFR.api_url + "?action=share_count&post_id=" + b,
      dataType: "json",
      data: IFR.apiNonce,
      success: function(a) {}
    })
  };
  var c = function() {
    var b = a(this);
    var c = b.attr("data-id");
    var d = b.find(".js-like-count");
    var e = JSON.parse(a.cookie("ifanr_dasheng_liked"));
    if (a.isArray(e)) {
      if (a.inArray(c, e) != -1) {
        console.error("already liked");
        b.off("click.ifanrLike");
        return false
      }
    }
    a.ajax({
      type: "post",
      url: IFR.api_url + "?action=like&post_id=" + c,
      dataType: "json",
      data: IFR.apiNonce,
      success: function(e) {
        if (e && e.status) {
          var f = JSON.parse(a.cookie("ifanr_dasheng_liked"));
          if (!a.isArray(f)) {
            f = []
          }
          f.push(c);
          a.unique(f);
          a.cookie("ifanr_dasheng_liked", JSON.stringify(f), {
            expires: 7,
            path: "/"
          });
          b.addClass("active");
          d.text(e.data)
        } else {}
      }
    })
  }
})(jQuery);
(function(a) {
  "use strict";

  function b() {
    var b = a('[data-el="share-to-wechat"]');
    if (b.length) {
      var c = "";
      c += '<div data-role="qrcode-area" class="qrcode-area"></div>';
      c += '<div class="share-text">打开微信，点击“发现”，使用“扫一扫”即可将网页分享到我的朋友圈。</div>';
      b.popover({
        html: true,
        content: c,
        trigger: "hover"
      }).on("shown.bs.popover", function() {
        var b = a('[data-role="qrcode-area"]');
        a('[data-role="qrcode-area"]').empty();
        a('[data-role="qrcode-area"]').qrcode({
          width: 128,
          height: 128,
          text: a(this).data("post-url")
        });
        a(".popover").addClass("qrcode-popover")
      })
    }
  }
  b();
  IFR.Events.on("reload.weixin.share-items", b)
})(jQuery);
(function(a, b) {
  var c;
  ga("create", "UA-6130036-1", "auto");
  ga("require", "linkid", "linkid.js");
  ga("require", "displayfeatures");
  if (ns.wpPageNowIs("single-post") || ns.wpPageNowIs("single-data") || ns.wpPageNowIs("single-dasheng")) {
    c = b(".js-post-author-name").text().replace("|", "").replace(/\s/g, "");
    ga("set", "dimension1", Boolean(c) ? c : "投稿")
  }
  if (IFR.env.weixin) {
    ga("set", "campaignSource", "(wechat)")
  }
  ga("send", "pageview");
  b(document).on("click", '[ga-track="event"]', function(c) {
    var d = b(this);
    a.ga("send", "event", d.attr("ga-event-category"), d.attr("ga-action"), d.attr("ga-event-label"))
  }).on("click", '[ga-track="social"]', function() {
    var c = b(this);
    a.ga("send", "social", c.attr("ga-social-network"), c.attr("ga-social-action"), c.attr("ga-social-target"))
  })
})(window, jQuery);
eval(function(a, b, c, d, e, f) {
  e = function(a) {
    return (a < b ? "" : e(parseInt(a / b))) + ((a = a % b) > 35 ? String.fromCharCode(a + 29) : a.toString(36))
  };
  if (!"".replace(/^/, String)) {
    while (c--) {
      f[e(c)] = d[c] || e(c)
    }
    d = [function(a) {
      return f[a]
    }];
    e = function() {
      return "\\w+"
    };
    c = 1
  }
  while (c--) {
    if (d[c]) {
      a = a.replace(new RegExp("\\b" + e(c) + "\\b", "g"), d[c])
    }
  }
  return a
}('J 7a={91:I(){J b={};H.2J=I(a){b.1z=a};H.3O=I(a){b.id=a};H.U=I(){K b}},7Z:I(){J b={};H.2H=I(a){b.3Q=a};H.7l=I(a){b.3Z=a};H.U=I(){K b}},hF:I(){J b={};H.8Y=I(a){b.9c=a};H.4u=I(a){b.2c=a};H.2J=I(a){b.1z=a};H.5X=I(a){b.8k=a};H.hC=I(a){b.cU=a};H.hA=I(a){b.1w=a};H.U=I(){K b}},bS:I(){J b={};H.8Y=I(a){b.9c=a};H.5X=I(a){b.8k=a};H.U=I(){K b}},9r:I(){J b={};H.3H=I(a){b.1S=a};H.7l=I(a){b.3Z=a};H.U=I(){K b}},94:I(){J b={};H.3O=I(a){b.id=a};H.U=I(){K b}},92:I(){J b={};H.2H=I(a){b.3Q=a};H.7l=I(a){b.3Z=a};H.U=I(){K b}},eF:I(){J b={};H.2J=I(a){b.1z=a};H.5X=I(a){b.8k=a};H.U=I(){K b}},eD:I(){J b={};H.5s=I(a){b.3q=a||0};H.ez=I(a){b.hH=!!a};H.hM=I(a){b.hN=!!a};H.ev=I(a){b.hK=!!a};H.U=I(){K b}},9j:I(){J b={};H.aj=I(a){b.c4=a};H.au=I(a){b.7E=a};H.av=I(a){if(a){b.1q=a}};H.hI=I(a){b.i3=a};H.U=I(){K b}},9O:I(){J b={};H.dW=I(a){b.6r=a};H.5s=I(a){b.3q=a};H.U=I(){K b}},c6:I(){J b={};H.i4=I(a){b.7p=a};H.2J=I(a){b.1z=a};H.iu=I(a){b.7s=a};H.au=I(a){b.7E=a};H.av=I(a){if(a){b.1q=a}};H.7D=I(a){b.5B=a};H.3H=I(a){b.1S=a};H.iv=I(a){b.5D=a};H.U=I(){K b}},ej:I(){J b={};H.4u=I(a){b.2c=a};H.U=I(){K b}},9D:I(){J b={};H.3O=I(a){b.id=a};H.U=I(){K b}},dQ:I(){J b={};H.eo=I(a){b.ir=a};H.U=I(){K b}},bc:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},c7:I(){J b={};H.bV=I(a){b.1x=a};H.U=I(){K b}},cG:I(){J b={};H.4u=I(a){b.2c=a};H.U=I(){K b}},e7:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},9F:I(){J b={};H.2J=I(a){b.1z=a};H.iq=I(a){b.ci=a};H.io=I(a){b.cf=a};H.ip=I(a){b.ch=a};H.iw=I(a){b.cj=a};H.bi=I(a){b.9y=a};H.U=I(){K b}},ix:I(){J b={};H.cR=I(a){b.cF=a};H.cH=I(a){b.1O=a};H.U=I(){K b}},iz:I(){J b={};H.i8=I(a){b.i7=a};H.cL=I(a){b.bx=a};H.U=I(){K b}},i6:I(){J b={};H.3b=I(a){b.W=a};H.bv=I(a){b.9e=a};H.bZ=I(a){b.9d=a};H.ib=I(a){b.aM=a};H.U=I(){K b}},ii:I(){J b={};H.cR=I(a){b.cF=a};H.cH=I(a){b.1O=a};H.U=I(){K b}},gY:I(){J b={};H.gX=I(a){b.gV=a};H.cL=I(a){b.bx=a};H.U=I(){K b}},gZ:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},9u:I(){J b={};H.3b=I(a){b.W=a};H.bv=I(a){b.9e=a};H.bZ=I(a){b.9d=a};H.U=I(){K b}},gP:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},gT:I(){J b={};H.aj=I(a){b.c4=a};H.U=I(){K b}},dt:I(){J b={};H.2J=I(a){b.1z=a};H.U=I(){K b}},9p:I(){J b={};H.gS=I(a){b.9B=a};H.gW=I(a){b.2F=a};H.U=I(){K b}},dO:I(){J b={};H.2J=I(a){b.1z=a};H.dJ=I(a){b.3p=a};H.U=I(){K b}},9A:I(){J b={};H.ho=I(a){b.9z=a};H.U=I(){K b}},dL:I(){J b={};H.3b=I(a){b.W=a};H.U=I(){K b}},dy:I(){J b={};H.3b=I(a){b.W=a};H.U=I(){K b}},dB:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},9s:I(){J b={};H.hs=I(a){b.cc=a};H.U=I(){K b}},dz:I(){J b={};H.3b=I(a){b.W=a};H.U=I(){K b}},hu:I(){J b={};H.h9=I(a){b.ha=a};H.U=I(){K b}},bK:I(){J b={};H.bi=I(a){b.9y=a};H.U=I(){K b}},8G:I(){J b={};H.8I=I(c){1e(J d=0,a=[];d<c.N;d++){a.2a({id:c[d].a2().id,2c:c[d].a2().2c})}b.h6=a};H.U=I(){K b}},8D:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},ar:I(){J b={};H.3O=I(a){b.id=a};H.4u=I(a){b.2c=a};H.a2=I(){K b};H.U=I(){K b}},cr:I(){J b={};H.3b=I(a){b.W=a};H.cy=I(a){b.hi=a};H.U=I(){K b}},9x:I(){J b={};H.hg=I(a){b.c9=a};H.U=I(){K b}},8y:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},95:I(){J b={};H.2H=I(a){b.3Q=a};H.U=I(){K b}},9K:I(){J b={};H.5s=I(a){b.3q=a};H.9J=I(a){b.dp=a};H.U=I(){K b}},bk:I(){J b={};H.2J=I(a){b.1z=a};H.dU=I(a){b.2w=a};H.U=I(){K b}},dg:I(){J b={};H.7l=I(a){b.3Z=a};H.U=I(){K b}},ij:I(){J b={};H.2J=I(a){b.1z=a};H.3b=I(a){b.W=a};H.dU=I(a){b.2w=a};H.U=I(){K b}},dc:I(){J b={};H.7d=I(a){b.1l=a};H.7D=I(a){b.5B=a};H.d1=I(a){b.k4=a};H.U=I(){K b}},dq:I(){J b={};H.dW=I(a){b.6r=a};H.5s=I(a){b.3q=a};H.k0=I(a){b.d5=a};H.U=I(){K b}}};1e(J f in 7a){7a[f].4i=I(b){J 7n={},3F=1u.3S(b)||5i("("+b+")");1e(J i in 3F){7n[i]=3F[i];7n["4M"+i.af(0).ka()+i.3u(1)]=I(){K 3F[i]}}K 7n}}(I(h){I p(v,A){J z=(v&6e)+(A&6e),w=(v>>16)+(A>>16)+(z>>16);K(w<<16)|(z&6e)}I t(v,w){K(v<<w)|(v>>>(32-w))}I c(B,y,w,v,A,z){K p(t(p(p(y,B),p(v,z)),A),w)}I b(y,w,C,B,v,A,z){K c((w&C)|((~w)&B),y,w,v,A,z)}I j(y,w,C,B,v,A,z){K c((w&B)|(C&(~B)),y,w,v,A,z)}I o(y,w,C,B,v,A,z){K c(w^C^B,y,w,v,A,z)}I a(y,w,C,B,v,A,z){K c(C^(w|(~B)),y,w,v,A,z)}I d(G,B){G[B>>5]|=3M<<(B%32);G[(((B+64)>>>9)<<4)+14]=B;J y,A,z,w,v,F=k7,E=-jX,D=-jO,C=jK;1e(y=0;y<G.N;y+=16){A=F;z=E;w=D;v=C;F=b(F,E,D,C,G[y],7,-jW);C=b(C,F,E,D,G[y+1],12,-kA);D=b(D,C,F,E,G[y+2],17,ky);E=b(E,D,C,F,G[y+3],22,-kx);F=b(F,E,D,C,G[y+4],7,-kF);C=b(C,F,E,D,G[y+5],12,kf);D=b(D,C,F,E,G[y+6],17,-kl);E=b(E,D,C,F,G[y+7],22,-km);F=b(F,E,D,C,G[y+8],7,kq);C=b(C,F,E,D,G[y+9],12,-kn);D=b(D,C,F,E,G[y+10],17,-iW);E=b(E,D,C,F,G[y+11],22,-j2);F=b(F,E,D,C,G[y+12],7,iH);C=b(C,F,E,D,G[y+13],12,-jb);D=b(D,C,F,E,G[y+14],17,-jc);E=b(E,D,C,F,G[y+15],22,jj);F=j(F,E,D,C,G[y+1],5,-jo);C=j(C,F,E,D,G[y+6],9,-jn);D=j(D,C,F,E,G[y+11],14,jZ);E=j(E,D,C,F,G[y],20,-jl);F=j(F,E,D,C,G[y+5],5,-jk);C=j(C,F,E,D,G[y+10],9,jm);D=j(D,C,F,E,G[y+15],14,-jp);E=j(E,D,C,F,G[y+4],20,-ji);F=j(F,E,D,C,G[y+9],5,jd);C=j(C,F,E,D,G[y+14],9,-je);D=j(D,C,F,E,G[y+3],14,-jf);E=j(E,D,C,F,G[y+8],20,jh);F=j(F,E,D,C,G[y+13],5,-jg);C=j(C,F,E,D,G[y+2],9,-jq);D=j(D,C,F,E,G[y+7],14,jr);E=j(E,D,C,F,G[y+12],20,-jC);F=o(F,E,D,C,G[y+5],4,-jB);C=o(C,F,E,D,G[y+8],11,-jD);D=o(D,C,F,E,G[y+11],16,jE);E=o(E,D,C,F,G[y+14],23,-jG);F=o(F,E,D,C,G[y+1],4,-jF);C=o(C,F,E,D,G[y+4],11,jA);D=o(D,C,F,E,G[y+7],16,-jz);E=o(E,D,C,F,G[y+10],23,-ju);F=o(F,E,D,C,G[y+13],4,jt);C=o(C,F,E,D,G[y],11,-jv);D=o(D,C,F,E,G[y+3],16,-jw);E=o(E,D,C,F,G[y+6],23,jy);F=o(F,E,D,C,G[y+9],4,-jx);C=o(C,F,E,D,G[y+12],11,-ja);D=o(D,C,F,E,G[y+15],16,iP);E=o(E,D,C,F,G[y+2],23,-iO);F=a(F,E,D,C,G[y],6,-iQ);C=a(C,F,E,D,G[y+7],10,iR);D=a(D,C,F,E,G[y+14],15,-iT);E=a(E,D,C,F,G[y+5],21,-iS);F=a(F,E,D,C,G[y+12],6,iN);C=a(C,F,E,D,G[y+3],10,-iM);D=a(D,C,F,E,G[y+10],15,-iG);E=a(E,D,C,F,G[y+1],21,-iF);F=a(F,E,D,C,G[y+8],6,iI);C=a(C,F,E,D,G[y+15],10,-iJ);D=a(D,C,F,E,G[y+6],15,-iL);E=a(E,D,C,F,G[y+13],21,iK);F=a(F,E,D,C,G[y+4],6,-iU);C=a(C,F,E,D,G[y+11],10,-iV);D=a(D,C,F,E,G[y+2],15,j5);E=a(E,D,C,F,G[y+9],21,-j4);F=p(F,A);E=p(E,z);D=p(D,w);C=p(C,v)}K[F,E,D,C]}I q(w){J x,v="";1e(x=0;x<w.N*32;x+=8){v+=3r.7c((w[x>>5]>>>(x%32))&3c)}K v}I k(w){J x,v=[];v[(w.N>>2)-1]=3C;1e(x=0;x<v.N;x+=1){v[x]=0}1e(x=0;x<w.N*8;x+=8){v[x>>5]|=(w.6f(x/8)&3c)<<(x%32)}K v}I l(v){K q(d(k(v),v.N*8))}I e(x,A){J w,z=k(x),v=[],y=[],B;v[15]=y[15]=3C;if(z.N>16){z=d(z,x.N*8)}1e(w=0;w<16;w+=1){v[w]=z[w]^j6;y[w]=z[w]^j7}B=d(v.6D(k(A)),en+A.N*8);K q(d(y.6D(B),en+3M))}I u(y){J A="j9",w="",v,z;1e(z=0;z<y.N;z+=1){v=y.6f(z);w+=A.af((v>>>4)&15)+A.af(v&15)}K w}I n(v){K j3(5o(v))}I r(v){K l(n(v))}I m(v){K u(r(v))}I i(v,w){K e(n(v),n(w))}I s(v,w){K u(i(v,w))}I g(w,x,v){if(!x){if(!v){K m(w)}K r(w)}if(!v){K s(x,w)}K i(x,w)}h.54=g;if(1Z 5w==="I"&&5w.dI){5w("54",I(){K g})}O{if(1Z 4V==="1c"&&4V.6I){4V.6I=g}O{h.54=g}}}(H));J P;(I(r){(I(s){s[s.dh=0]="dh";s[s.dl=1]="dl"})(r.7H||(r.7H={}));J m=r.7H;(I(s){s[s.4y=0]="4y";s[s.3x=1]="3x";s[s.aq=0]="aq";s[s.bb=1]="bb"})(r.4X||(r.4X={}));J o=r.4X;(I(s){s[s.d4=0]="d4";s[s.da=1]="da";s[s.6M=2]="6M";s[s.8B=6]="8B";s[s.8Q=3]="8Q"})(r.3V||(r.3V={}));J g=r.3V;(I(s){s[s.8f=0]="8f";s[s.dD=1]="dD"})(r.6K||(r.6K={}));J b=r.6K;(I(s){s[s.dv=0]="dv";s[s.bp=1]="bp";s[s.8h=2]="8h";s[s.ba=3]="ba";s[s.ay=4]="ay";s[s.az=5]="az";s[s.bo=6]="bo";s[s.4S=7]="4S";s[s.8a=8]="8a"})(r.2o||(r.2o={}));J d=r.2o;(I(s){s[s.dx=0]="dx";s[s.9v=1]="9v"})(r.93||(r.93={}));J e=r.93;(I(s){s[s.84=-1]="84";s[s.8r=-2]="8r";s[s.ed=iY]="ed";s[s.bt=j1]="bt";s[s.bf=j0]="bf";s[s.bn=jH]="bn";s[s.bl=jI]="bl";s[s.cM=ko]="cM";s[s.dj=kp]="dj";s[s.d3=ks]="d3";s[s.el=kr]="el";s[s.er=kg]="er";s[s.es=ki]="es";s[s.ai=kj]="ai";s[s.eC=kt]="eC";s[s.dX=ku]="dX";s[s.ea=kD]="ea";s[s.e9=kI]="e9";s[s.c2=kH]="c2";s[s.c3=kB]="c3";s[s.bw=kv]="bw";s[s.bq=kz]="bq";s[s.co=kd]="co";s[s.eb=jR]="eb";s[s.cp=jT]="cp";s[s.cm=jV]="cm";s[s.cs=jQ]="cs";s[s.7C=jP]="7C";s[s.ct=jJ]="ct";s[s.ck=jL]="ck";s[s.cb=jM]="cb";s[s.ca=jY]="ca";s[s.ce=k8]="ce";s[s.cg=k9]="cg";s[s.cz=kc]="cz";s[s.cA=kb]="cA";s[s.cQ=k5]="cQ";s[s.cO=iE]="cO";s[s.cS=k1]="cS";s[s.cT=k3]="cT";s[s.cX=kJ]="cX";s[s.cV=hd]="cV";s[s.cN=hh]="cN";s[s.cE=hc]="cE";s[s.cD=hb]="cD";s[s.cB=h5]="cB";s[s.cC=h8]="cC";s[s.cI=hj]="cI";s[s.81=ht]="81";s[s.bD=hv]="bD";s[s.bC=hx]="bC";s[s.bB=hm]="bB";s[s.bF=hn]="bF";s[s.bJ=hp]="bJ";s[s.8x=h1]="8x";s[s.8C=h2]="8C";s[s.8H=gU]="8H";s[s.8w=h0]="8w";s[s.8F=h3]="8F";s[s.8P=gQ]="8P";s[s.8R=gR]="8R";s[s.8T=hl]="8T";s[s.aB=iD]="aB";s[s.bH=ig]="bH";s[s.bG=ih]="bG";s[s.82=hz]="82";s[s.7f=ic]="7f";s[s.bz=i5]="bz";s[s.as=i9]="as"})(r.1J||(r.1J={}));J p=r.1J;(I(s){s[s.8s=1]="8s";s[s.8p=2]="8p";s[s.8q=3]="8q";s[s.by=cv]="by"})(r.aX||(r.aX={}));J a=r.aX;(I(s){s[s.7r=1]="7r";s[s.an=2]="an"})(r.5A||(r.5A={}));J j=r.5A;(I(s){s[s.8s=1]="8s";s[s.8p=2]="8p";s[s.8q=3]="8q"})(r.b8||(r.b8={}));J l=r.b8;(I(s){s[s.c0=-1]="c0";s[s.c5=0]="c5";s[s.bX=1]="bX";s[s.bW=2]="bW";s[s.bO=3]="bO";s[s.bN=4]="bN";s[s.bR=5]="bR";s[s.bU=6]="bU";s[s.bT=7]="bT"})(r.b4||(r.b4={}));J q=r.b4;(I(s){s[s.bY=0]="bY";s[s.br=1]="br";s[s.bE=2]="bE";s[s.cK=3]="cK"})(r.b0||(r.b0={}));J c=r.b0;(I(s){s[s.6C=1]="6C";s[s.e6=2]="e6";s[s.e5=4]="e5"})(r.8j||(r.8j={}));J n=r.8j;(I(s){s[s.e4=0]="e4";s[s.e8=1]="e8"})(r.b1||(r.b1={}));J k=r.b1;(I(s){s[s.aE=10]="aE";s[s.aD=20]="aD";s[s.7w=30]="7w";s[s.ec=40]="ec";s[s.6C=50]="6C";s[s.e2=60]="e2"})(r.52||(r.52={}));J i=r.52;(I(s){s[s.dV=0]="dV";s[s.9R=1]="9R";s[s.dT=2]="dT";s[s.dR=3]="dR";s[s.88=4]="88";s[s.9U=5]="9U";s[s.dS=6]="dS";s[s.e0=7]="e0";s[s.dZ=8]="dZ";s[s.ee=9]="ee";s[s.ef=10]="ef";s[s.ew=11]="ew"})(r.4E||(r.4E={}));J h=r.4E})(P||(P={}));J P;(I(b){J a=(I(){I c(){}c.1d=I(){if(!c.6p){X M Y("R is 2f hP. hZ .3J() 25 hY.")}K c.6p};c.3J=I(g,e){if(!c.6p){c.6p=M c()}if(1L.i0.i1=="fK:"){c.58=b.4X.aq}O{c.58=b.4X.bb}J d=M b.4b();d.fp();c.1b={2F:"",et:1g,cZ:1a,4h:2W,87:M b.3W(),1j:[],6X:g,5v:M b.3P(),5u:[],ek:1,9w:0,6b:[],7J:1B,bd:1B,6L:1B};c.1A=M b.dK();if(e&&1W.L.1E.1n(e)=="[1c 1W]"){c.1Q=e;c.1b.bd=1a}O{c.1Q=M b.aU()}c.4v={4l:{1v:"1X:g1",2x:M b.2C(1a,1a)},4U:{1v:"1X:g2",2x:M b.2C(1a,1a)},4L:{1v:"1X:fX",2x:M b.2C(1a,1a)},4H:{1v:"1X:g3",2x:M b.2C(1a,1a)},5d:{1v:"1X:g4",2x:M b.2C(1a,1a)},6g:{1v:"",2x:M b.2C(1a,1a)},4A:{1v:"",2x:M b.2C(1a,1a)},6h:{1v:"",2x:M b.2C(1a,1a)},5b:{1v:"1X:g0",2x:M b.2C(1a,1a)},4O:{1v:"1X:fZ",2x:M b.2C(1a,1a)},4I:{1v:"1X:fV",2x:M b.2C(1a,1a)},4t:{1v:"1X:fU",2x:M b.2C(1a,1a)},5h:{1v:"1X:fW",2x:M b.2C(1a,1a)},4J:{1v:"1X:fY",2x:M b.2C(1B,1B)},3B:{1v:"1X:g5",2x:M b.2C(1B,1B)}};c.8U={4l:"4l",4U:"4U",4L:"4L",4H:"4H",5d:"5d",6g:"6g",4A:"4A",6h:"6h",5b:"5b",4O:"4O",4I:"4I",4t:"4t",5h:"5h",4J:"4J",3B:"3B"}};c.2N=I(g,h){b.1k.1d().1o(["1m","1c"],"2N",1a);c.1t=b.1y.1d();c.1b.2F=g;c.1b.et=h;if(!hR.hQ){h.Z(b.1J.as);K}c.1t.2N(c.1b.6X,g,{Q:I(i){h.Q(i)},Z:I(i){if(i==b.4E.88||!i){h.hT()}O{h.Z(i)}}});1e(J e=0,d=c.1b.5u.N;e<d;e++){c.1t.7h(c.1b.5u[e])}c.1b.5u.N=0;K c.6p};c.3a=I(d){c.1t.3a(d)};c.4N=I(g,i,d,h){if(!g){X M Y("4k 6V\'t be 1H,ah -> 4N")}if(!i){X M Y("1v 6V\'t be 1H,ah -> 4N")}if(1W.L.1E.1n(h)=="[1c 1Y]"){J e=b.2E.b7(h);c.7z[g]=e}O{if(1W.L.1E.1n(h)=="[1c 8o]"||1W.L.1E.1n(h)=="[1c 1W]"){if(!h.1T){X M Y("1T 25 eB 2f eA or 1M is 3C-> 4N")}if(!h.4i){X M Y("4i 25 eB 2f eA -> 4N")}}O{X M Y("6n fR of 3 b2 6o fP 1z  5M be 1c or I or 3y-> 4N")}}c.7z[g].1M=g;c.8U[g]=g;c.4v[g]={1v:i,2x:d};61[i]=g};c.kk=I(d){if(c.1t){c.1t.7h(d)}O{c.1b.5u.2a(d)}};c.lK=I(d){if(c.1t){c.1t.7h(d)}O{c.1b.5u.2a(d)}};c.L.nY=I(){c.1t.2g();c.1t=1g};c.L.2g=I(){c.1t.2g()};c.L.nU=I(){K b.1y.V.1V.8W};c.L.nZ=I(){if(b.2v.3o==b.5V.4y){K b.4X.4y}O{if(b.2v.3o==b.5V.3x){K b.4X.3x}}};c.L.o2=I(){if(c.1b.ek==1){K"aU"}O{K"nT"}};c.L.nS=I(d){if(1W.L.1E.1n(d)=="[1c 1Y]"){c.1b.6b=d}};c.L.nK=I(){K b.1y.V.W};c.L.nJ=I(){K c.1b.9w};c.L.83=I(g,d,e){c.1Q.83(g,d,e)};c.L.nI=I(g,d,e){c.1Q.8N(g,d,"bM",1g,e)};c.L.nP=I(h,d,e,g){c.1Q.aA(h,d,e,g)};c.L.eg=I(d,e){b.1k.1d().1o(["1c","1c"],"eg");c.1Q.bg(d);H.5t(d.1p,d.1l,d.1q,e)};c.L.5t=I(e,m,h,k){b.1k.1d().1o(["1O","1m","1c","1c"],"5t");if(!b.1y.V.1V){k.Z(b.1J.ai,1g);K}if(!b.1y.V.1V.1r.1r.4g){k.Z(b.1J.84,1g);X M Y("2N is 4Q! ah:5t")}J g=M 1s.9j();g.aj(c.4v[h.1M].2x.gN());g.au(c.4v[h.1M].1v);g.av(h.1T());J i=g.U();if(1W.L.1E.1n(i)=="[1c 7Q]"){i=[].3u.1n(M aw(i))}J j=1g,l=H,d=M b.4Y();H.3A(e,m,{Q:I(n){j=n}});d.1q=h;d.1p=e;d.4R=b.1y.V.W;d.1v=c.4v[h.1M].1v;d.1l=m;d.2D=M 2K().3K();d.7b=b.5A.7r;d.4r=b.52.7w;d.4k=h.1M;if(h.1M!="3B"){if(!j){j=l.8i(e,m,"")}j.2D=M 2K().3K();j.4r=b.52.aE;j.gi="";j.4R=b.1y.V.W;j.ap=b.6K.8f;j.3d=d;j.2M=0;j.am()}c.1Q.7u(e,m,d);c.1t.bI(e.85(),i,m,{Q:I(n){d.3s=n.3s;d.2D=n.46;d.4r=b.52.7w;if(h.1M!="3B"){j.3d=d}k.Q(d)},Z:I(n){d.4r=b.52.aD;j.3d=d;k.Z(n,d)}},1g)};c.L.ng=I(i,e,d,h){J g=H;if(d in c.4v){g.5t(i,e,b.3B.1I(c.4v[d].1v,""),{Q:I(){h.Q()},Z:I(j){h.Z(j,1g)}})}};c.L.nf=I(e,g,d){X M Y("1R 1P 1K")};c.L.kK=I(i,e,g,d){J h=b.4l.1I(g);H.5t(i,e,h,d)};c.L.mZ=I(i,d,g,e,h){c.1Q.7u(i,d,e,h)};c.L.6v=I(i,d,g,e,h){b.1k.1d().1o(["1O","1m","1O|1g|4h|1c","1O","1c"],"6v");if(e>20){X M Y("nx dp 5M be nE dd or nC n5 20!")}if(i.85()<0){X M Y("2o 5M be nd dd -1")}c.1Q.6v(i,d,g,e,h)};c.L.ag=I(k,g,i,h,j){b.1k.1d().1o(["1O","1m","1O|1g|4h|1c","1O","1c"],"ag");if(h>20){j.Z(b.1J.7C);K}if(k.85()<0){j.Z(b.1J.7C);K}J e=M 1s.dc(),d=H;e.7d(g);if(!i){e.7D(c.1b.87.4M(k+g))}O{e.7D(i)}e.d1(h);c.1t.1N(g6[k],b.18.1G(e.U()),g,{Q:I(o){c.1b.87.7j(k+g,b.18.42(o.3q));J n=o.6r.n8();1e(J m=0,l=n.N;m<l;m++){n[m]=b.18.7F(n[m])}j.Q(n,!!o.d5)},Z:I(){j.Q([],1B)}},"dq")};c.L.oh=I(d,g){J e=1g;2W.dH=I(h){g.Q(!!+h.1S);e.dG.dF(e)};e=1L.7y("4P");e.4W=b.18.5C[c.58][0]+"://o8.cn.5Q.5Z/1D/o9.js?6X="+5o(c.1b.6X)+"&2F="+5o(d)+"&gw=dH&6d="+2K.nW();1L.gA.7x(e);e.53=I(){g.Z(b.1J.8r);e.dG.dF(e)}};c.L.7q=I(d){c.1Q.7q(d)};c.L.7M=I(d,e){c.1Q.7M(d,e)};c.L.7L=I(g,d,e){c.1Q.7L(g,d,e)};c.L.7N=I(g,d,e){c.1Q.7N(g,d,e)};c.L.6Z=I(d,e,g){c.1Q.6Z(d,e,g)};c.L.6U=I(e,d,g){c.1Q.6U(e,d,g)};c.L.73=I(e,d,g){c.1Q.73(e,d,g)};c.L.dN=I(g,d){b.1k.1d().1o(["1O","1m","1c"],"dN");J e="ax"+g+"6d"+d;44 c.1b[e];K 1a};c.L.dM=I(g,d){b.1k.1d().1o(["1O","1m","1c"],"dM");if(d==""||g<0){X M Y("8Z fc : "+b.1J.aB)}J e="ax"+g+"6d"+d;K c.1b[e]};c.L.du=I(h,d,g){b.1k.1d().1o(["1O","1m","1m","1c"],"du");J e="ax"+h+"6d"+d;c.1b[e]=g;K 1a};c.L.7o=I(g){J e=[];1e(J d=1;d<1f.N;d++){e[d-1]=1f[d]}if(e.N==0){e=[b.2o.ay,b.2o.az,b.2o.8h,b.2o.ba,b.2o.bp,b.2o.bo,b.2o.8a,b.2o.4S]}c.1Q.7o(e,g)};c.L.3A=I(h,d,g){b.1k.1d().1o(["1O","1m","1c"],"3A");J e=c.1Q.3A(h,d);g.Q(e)};c.L.dk=I(d){J g=c.1Q.3A(d.1z,d.W),e=H,h=1B;if(!g){g=M b.ak()}O{h=1a}g.1p=d.1z;g.1l=d.W;g.3d=b.18.7F(d.2w);g.aI=g.3d.2B;g.1v=g.3d.1v;g.6T=g.3d.6T;g.6R=g.3d.ns;g.4r=g.3d.4r;g.2D=g.3d.2D;if(!h){g.2M=0}if(g.1p==b.2o.8h){e.bm(d.W,{Q:I(i){g.75=i.2c},Z:I(i){}})}c.1Q.5U(g,{Q:I(i){}})};c.L.dE=I(e){J l=[];1e(J h=0,d=e.N;h<d;h++){if(e[h].7K){l.2a(e[h]);e.3w(h,1);gr}1e(J g=0;g<d-h-1;g++){if(e[g].2D<e[g+1].2D){J k=e[g];e[g]=e[g+1];e[g+1]=k}}}c.1b.1j=l.6D(e)};c.L.5P=I(g,e){b.1k.1d().1o(["1c","1g|3y|1c|4h"],"5P");J d=H;c.1Q.5P({Q:I(h){if(e){g.Q(h)}O{d.dE(c.1b.1j);g.Q(c.1b.1j)}}},e)};c.L.a9=I(h,g){b.1k.1d().1o(["1c","1g|3y|1c|4h"],"a9");J e=M 1s.bk(),d=H;e.2J(1);c.1t.1N(26,b.18.1G(e.U()),b.1y.V.W,{Q:I(l){if(l.3Z){1e(J k=0,j=l.3Z.N;k<j;k++){d.dk(l.3Z[k])}}if(g){J m=[];1Y.2s(g,I(i){1Y.2s(c.1b.1j,I(n){if(n.1p==i){m.2a(n)}})});h.Q(m)}O{h.Q(c.1b.1j)}},Z:I(){h.Q([])}},"dg")};c.L.8i=I(h,d,e){b.1k.1d().1o(["1O","1m","1m"],"8i");J g=M b.ak();g.1l=d;g.1p=h;g.75=e;g.3d={};g.2M=0;c.1Q.5U(g,{Q:I(i){}});K g};c.L.5W=I(h,d,g){b.1k.1d().1o(["1O","1m","1c"],"5W");J e=M 1s.bk();e.2J(h);c.1t.1N(27,b.18.1G(e.U()),d,{Q:I(){c.1Q.5W(h,d,{Q:I(){g.Q(1a)},Z:I(){g.Z(b.1J.81)}})},Z:I(){g.Z(b.1J.81)}})};c.L.6u=I(g,d,e){b.1k.1d().1o(["1O","1m","1c"],"6u");c.1Q.6u(g,d,e)};c.L.nn=I(g,d,e){X M Y("1R 1P 1K")};c.L.nj=I(h,e,d,g){X M Y("1R 1P 1K")};c.L.nk=I(d){X M Y("1R 1P 1K")};c.L.nl=I(d){X M Y("1R 1P 1K")};c.L.nm=I(e,d,g){X M Y("1R 1P 1K")};c.L.bh=I(d,g,h){b.1k.1d().1o(["1m","3y","1c"],"bh");J e=M 1s.dQ();e.eo(g);c.1t.1N(0,b.18.1G(e.U()),d,{Q:I(){h.Q()},Z:I(){h.Z(b.1J.bf)}})};c.L.ei=I(g,h,i){b.1k.1d().1o(["1m","3y","1c"],"ei");J e=M 1s.ej(),d=H;e.4u(g);c.1t.1N(1,b.18.1G(e.U()),b.1y.V.W,{Q:I(j){if(h.N>0){d.bh(j,h,{Q:I(){},Z:I(k){i.Z(k)}})}i.Q(j)},Z:I(){i.Z(b.1J.bn)}},"9D")};c.L.bm=I(d,g){b.1k.1d().1o(["1m","1c"],"bm");J e=M 1s.e7();e.2H(1);c.1t.1N(4,b.18.1G(e.U()),d,g,"9F")};c.L.eE=I(d,g){b.1k.1d().1o(["1m","1c"],"eE");J e=M 1s.bc();e.2H(1);c.1t.1N(7,b.18.1G(e.U()),d,g)};c.L.bP=I(d,g,h){b.1k.1d().1o(["1m","1m","1c"],"bP");J e=M 1s.c7();e.bV(g);c.1t.1N(9,b.18.1G(e.U()),d,h)};c.L.bL=I(d,e,h){b.1k.1d().1o(["1m","1O","1c"],"bL");J g=M 1s.bK();g.bi(e.85());c.1t.1N(11,b.18.1G(g.U()),d,{Q:I(i){h.Q()},Z:I(){h.Z(b.1J.bl)}})};c.L.bs=I(d,g,h){b.1k.1d().1o(["1m","1m","1c"],"bs");J e=M 1s.cG();e.4u(g);c.1t.1N(12,b.18.1G(e.U()),d,h)};c.L.cW=I(e,i,h){b.1k.1d().1o(["1m","1m","1c"],"cW");J d=M 1s.ar();d.3O(e);d.4u(i);J g=M 1s.8G();g.8I([d]);c.1t.1N(6,b.18.1G(g.U()),e,h,"8D")};c.L.cP=I(e,g){b.1k.1d().1o(["1m","1c"],"cP");J d=M 1s.bc();d.2H(1);c.1t.1N(8,b.18.1G(d.U()),e,g)};c.L.cd=I(e,m){b.1k.1d().1o(["3y","1c"],"cd");1e(J j=0,h=[],l=[],d=e.N;j<d;j++){if(h.N===0||!(e[j].id in h)){h.2a(e[j].id);J k=M 1s.ar();k.3O(e[j].id);k.4u(e[j].2c);l.2a(k)}}J g=M 1s.cr();g.3b(b.1y.V.W);g.cy(54(h.mX().6i("")));c.1t.1N(13,b.18.1G(g.U()),b.1y.V.W,{Q:I(i){if(i===1){J n=M 1s.8G();n.8I(l);c.1t.1N(20,b.18.1G(n.U()),b.1y.V.W,{Q:I(){m.Q()},Z:I(){m.Z(b.1J.8C)}},"8D")}O{m.Q()}},Z:I(){m.Z(b.1J.8x)}},"9x")};c.L.c8=I(i,d,h){b.1k.1d().1o(["1m","1O","1c"],"c8");if(i!=""){b.1y.V.7G=i}O{h.Z(b.1J.8H);K}J g=M 1s.8y();g.2H(1);c.1t.1N(19,b.18.1G(g.U()),i,{Q:I(){h.Q();J e=M 1s.9K();d==0&&(d=-1);e.9J(d);e.5s(0);b.1y.V.7e("9L",b.18.1G(e.U()),i,1,{Q:I(r){J p=b.18.42(r.3q);c.1A.2G(b.1y.V.W+"9M",p);J q=r.6r;if(c.1b.6b.N>0){1e(J o=0,n=q.N;o<n;o++){1e(J m=0,l=c.1b.6b.N;m<l;m++){if(c.4v[c.1b.6b[m]].1v!=q[o].7E){b.1y.V.2l.43(q[o])}}}}O{1e(J o=0,k=q.N;o<k;o++){b.1y.V.2l.43(q[o])}}},Z:I(j){h.Z(b.1J.8F)}},"9O")},Z:I(){h.Z(b.1J.8w)}},"95")};c.L.bu=I(h,g){b.1k.1d().1o(["1m","1c"],"bu");J d=M 1s.8y();d.2H(1);c.1t.1N(17,b.18.1G(d.U()),h,g,"95")};c.L.em=I(g,j,i,h){J e=M 1s.bS(),d=H;if(!i){e.5X(0)}O{e.5X(c.1b.87.4M(j+b.1y.V.W))}e.8Y("");c.1t.1N(28,b.18.1G(e.U()),b.1y.V.W,{Q:I(k){c.1b.5v.1U.N=0;c.1b.5v.1U=k},Z:I(){}},"9r")};c.L.e1=I(d){b.1k.1d().1o(["1c"],"e1");d.Q(c.1b.5v.1U)};c.L.dY=I(d,g,h){b.1k.1d().1o(["1O","1m","1c"],"dY");J e=c.1b.5v.4M(d,g);h.Q(e)};c.L.8K=I(e,d){J g=0;if(e==0){g|=3;if(d==0){g|=12}O{g|=48}}O{if(e==1){g|=1;if(d==0){g|=8}O{g|=32}}O{g|=2;if(e==0){g|=4}O{g|=16}}}K g};c.L.eu=I(e,g,h){b.1k.1d().1o(["1O","1m","1c"],"eu");J d=M 1s.91();d.2J(H.8K(0,e));d.3O(g);c.1t.1N(29,b.18.1G(d.U()),b.1y.V.W,h,"7Z")};c.L.ey=I(d,g,h,j){b.1k.1d().1o(["1O","1O","1m","1c"],"ey");J i=d==b.2o.4S?2:1;J e=M 1s.91();e.2J(H.8K(i,g));e.3O(h);c.1t.1N(29,b.18.1G(e.U()),b.1y.V.W,j,"7Z")};c.L.eh=I(e,i,j){b.1k.1d().1o(["1O","1m","1c"],"eh");J g=M 1s.94(),h=H,d=e==b.2o.4S?"oo":"oj";g.3O(i);c.1t.1N(d,b.18.1G(g.U()),b.1y.V.W,{Q:I(){h.em(1g,1g,1g,{Q:I(){},Z:I(){}});j.Q()},Z:I(){j.Z(b.1J.82)}},"92")};c.L.eq=I(e,i,j){b.1k.1d().1o(["1O","1m","1c"],"eq");J g=M 1s.94(),h=H,d=e==b.2o.4S?"nQ":"nR";g.3O(i);c.1t.1N(d,b.18.1G(g.U()),b.1y.V.W,{Q:I(){c.1b.5v.6j(e,i);j.Q()},Z:I(){j.Z(b.1J.82)}},"92")};c.L.df=I(e,g){b.1k.1d().1o(["1m","1c"],"df");J d=M 1s.dL();d.3b(e);c.1t.1N(21,b.18.1G(d.U()),e,{Q:I(){g.Q()},Z:I(){g.Z(b.1J.8P)}})};c.L.ds=I(e){b.1k.1d().1o(["1c"],"ds");J d=M 1s.dB();d.2H(1);c.1t.1N(23,b.18.1G(d.U()),b.1y.V.W,e,"9s")};c.L.dA=I(e,g){b.1k.1d().1o(["1m","1c"],"dA");J d=M 1s.dz();d.3b(e);c.1t.1N(24,b.18.1G(d.U()),e,{Q:I(h){g.Q(b.7H[h])},Z:I(){g.Z(b.1J.8R)}})};c.L.dC=I(e,g){b.1k.1d().1o(["1m","1c"],"dC");J d=M 1s.dy();d.3b(e);c.1t.1N(22,b.18.1G(d.U()),e,{Q:I(){g.Q()},Z:I(){g.Z(b.1J.8T)}})};c.L.ls=I(d,g){b.1k.1d().1o(["1O","1c"],"dw");if(!(/(1|2|3)/.3I(d.1E()))){g.Z(b.1J.7f);K}J e=M 1s.dt();e.2J(d);c.1t.1N(30,b.18.1G(e.U()),b.1y.V.W,g,"9p")};c.L.lt=I(d,h,g){b.1k.1d().1o(["1O","1m","1c"],"dw");if(!(/(1|2|3)/.3I(d.1E()))){g.Z(b.1J.7f);K}J e=M 1s.dO();e.2J(d);e.dJ(h);c.1t.1N(31,b.18.1G(e.U()),b.1y.V.W,g,"9A")};c.L.lw=I(g,d,e){X M Y("1R 1P 1K")};c.L.lv=I(e,d){X M Y("1R 1P 1K")};c.L.lq=I(e,d){X M Y("1R 1P 1K")};c.L.lp=I(e,d){X M Y("1R 1P 1K")};c.L.lk=I(e,d){X M Y("1R 1P 1K")};c.L.lj=I(e,d){X M Y("1R 1P 1K")};c.L.li=I(e,d){X M Y("1R 1P 1K")};c.L.ll=I(h,d,g,e){X M Y("1R 1P 1K")};c.8U={};c.7z={};c.1b={};c.fQ=1B;K c})();b.R=a;if("I"===1Z lm&&"1c"===1Z 4V&&4V&&4V.id&&"1c"===1Z 6I&&6I){4V.6I=b}O{if("I"===1Z 5w&&5w.dI){5w("P",["54","//7Y.5Q.5Z/lI.js","//7Y.5Q.5Z/lH.js","//7Y.5Q.5Z/gD-gH-2.7.js"],I(){K b})}O{2W.R=a}}})(P||(P={}));J P;(I(i){(I(k){k[k.5H=0]="5H";k[k.5J=1]="5J";k[k.9W=2]="9W";k[k.9X=3]="9X"})(i.38||(i.38={}));J j=i.38;(I(k){k[k.99=1]="99";k[k.4G=2]="4G";k[k.a8=3]="a8";k[k.a6=4]="a6";k[k.ad=5]="ad";k[k.dr=6]="dr";k[k.ab=7]="ab";k[k.d7=8]="d7";k[k.d8=9]="d8";k[k.d9=10]="d9";k[k.d6=11]="d6";k[k.9H=12]="9H";k[k.a5=13]="a5";k[k.9G=14]="9G"})(i.3f||(i.3f={}));J a=i.3f;J g=["lJ","mU","d2","9Q","lM","9Q","lL","lG","lF","lA",["","lz","lB","lC","lE","lD","","lh","lg"],"kV","kU","kW","d0","kX","kZ","kY","kT","kS","kN","kM","kL","kO","kP","kR","kQ","l0","l1","lb","d0","d2"];J e=(I(){I k(m,l,n){H.8W=-1;H.3i=m.5L+"/8c?3m="+n.3m+"&2F="+5o(n.2F)+"&6w="+n.6w+"&9S="+n.9S;H.dm=n;H.1r=b.1d().dn();H.1r.2N(H.3i,l);if(1Z k.5m=="1c"&&"6A"in k.5m){J o=H;o.1r.on("55",I(p){o.8W=p;if(p===i.3V.6M&&!i.R.1b.6L){k.5m.6A(i.3V.6M);n.6E();K}O{if(p===i.3V.6M&&i.R.1b.6L){K}}k.5m.6A(p);if(i.R.1b.6L){44 k.5m.6A}})}O{X M Y("la:lc ld is fO")}H.1r.on("1D",n.2l.bA);H.1r.on("2g",I(p){n.1V.1r.3g("55",p?p:2)})}k.L.5l=I(l){H.1r.3T(l)};k.L.3a=I(l){i.34.fM();H.1r=H.1r.3a();if(l){H.dm.4p=l}};k.L.2g=I(l){H.1r.2g(l)};K k})();i.lf=e;J b=(I(){I k(){H.1r=1g;H.3j={}}k.1d=I(){K M k()};k.L.2N=I(m,l){if(H.1r){if(m){H.on("2N",l||M 8o)}if(m){H.8E=m}H.1r.6c(m)}K H};k.L.dn=I(){J l=H.do(H.9T());if(l===1g){X M Y("fo 1V 6o 2f le")}K l};k.L.do=I(l){if(l==k.4y){H.1r=M i.fu(H)}O{if(l==k.3x){H.1r=M i.eO(H)}}K H};k.L.3T=I(l){if(H.1r){if(H.9T()==k.3x){H.1r.3T(l)}O{H.1r.3T(H.dP(l))}}};k.L.8L=I(l){H.3g("1D",l)};k.L.2g=I(l){if(i.3V.8B===l){i.R.1b.6L=1a}H.1r.2g(l);H.3g("2g",l);K H};k.L.3a=I(){if(H.8E){K H.2N(H.8E,1g)}O{X M Y("3a:no l3 fs")}};k.L.9T=I(){if(i.R.1b.4h.7X){i.2v.3o=k.4y}K i.2v.3o};k.L.3g=I(l,m){if(l in H.3j){1e(J n=0,o=H.3j[l].N;n<o;n++){H.3j[l][n](m)}}K H};k.L.on=I(l,m){if(!(1Z m=="I"&&l)){K H}if(l in H.3j){i.18.9b(H.3j,m)==-1&&H.3j[l].2a(m)}O{H.3j[l]=[m]}K H};k.L.l2=I(m,p){if(m in H.3j){1e(J o=0,n=H.3j[m].N;o<n;o++){if(H.3j[m][o]==p){H.3j[m].3w(o,1)}}}K H};k.L.dP=I(l){J m="?l5="+l.2X()+"&2R="+l.9o()+"&8m="+i.R.1A.2n(i.2y.2t.W+"57");if(!/(5z|6t)/.3I(l.2Q)){m+="&2O="+l.5q()+"&l7="+(l.7k()||"")}K{3i:m,1h:"3X"in l?l.3X():""}};k.4y="2d-fq";k.3x="8c";K k})();i.5V=b;J c=(I(){I k(l,m){H.5n=l6;H.4a=0;H.6w="2.0.6";H.9S=7O.lO(7O.fL()*my);H.1V=1g;H.2l=1g;H.W="";H.4p={};H.5x=0;H.7G="";H.3R=[];H.2F=l;H.3m=m;H.3R.5r="56"}k.L.6N=I(){if(!H.4a){H.4a=5K(I(){if(!H.4a){K}4s{H.1V.2g()}4d(l){X M Y(l)}98(H.4a);H.4a=0;H.1V.3a();H.1V.1r.3g("55",5)},H.5n)}};k.L.67=I(){if(H.4a){98(H.4a);H.4a=0}};k.L.2N=I(l){if(i.2y.2t.5L){if(i.2v.3o==b.3x){if(!2W.7i){l.Z(i.4E.9R);K}}H.2l=M h(H);H.2l.bQ(l);J m=H;H.1V=M e(i.2y.2t,I(){i.2v.3o==b.3x&&m.9t()},H);H.1V.1r.3g("55",1)}O{l.Z(i.4E.9U)}};k.L.9t=I(){if(H.5x>0){ep(H.5x)}J l=H;H.5x=mA(I(){l.6N();l.1V.5l(M i.7R())},cJ)};k.L.6E=I(){ep(H.5x);H.5x=0;H.67()};k.L.c1=I(q,n,m,l,r){J o=i.34.ao(H.1V.3a);if(!o){K}J p=M i.5y(q,n,m);p.5p(o);if(l){p.8d(j.5J);H.2l.a4(M i.cw(l.Q,l.Z),p.2X(),r)}O{p.8d(j.5H)}H.1V.5l(p)};k.L.7e=I(r,n,m,o,l,s){if(r=="9Q"){if(k.8n[m]){l.Q(k.8n[m]);K}}J p=i.34.ao(H.1V.3a);if(!p){K}J q=M i.74(r,n,m);q.5p(p);q.8d(o);H.2l.a4(M i.cq(l.Q,l.Z),q.2X(),s);H.1V.5l(q)};k.L.6B=I(s){J m,n,q,r=H,p,t=H.3R.fy();if(t==3C){K}if(!2W.1s){J l=M 2K().3K()+8X,o=M 2K().3K();mw(o<l){o=M 2K().3K()}}H.3R.5r="mv";if(t.1z!=2){m=i.R.1A.2n(H.W)||"0";n=M 1s.eD();n.ez(1B);q="mq";p=H.W}O{m=i.R.1A.2n(H.W+"9M")||"0";n=M 1s.9K();n.9J(0);q="9L";if(H.7G===""){X M Y("3q:mo gh of mr ms 6o 2f 3J")}p=H.7G}if(t.e3<=m){H.3R.5r="56";H.6B();K}if(s){n.ev(1a)}n.5s(m);H.7e(q,i.18.1G(n.U()),p,j.5J,{Q:I(y){J v=i.18.42(y.3q),x=r.W;if(q=="9L"){x+="9M"}i.R.1b.7J=1a;i.R.1A.2G(x,v);r.3R.5r="56";r.6B();J w=y.6r;1e(J u=0;u<w.N;u++){d.V.2l.43(w[u])}},Z:I(){r.3R.5r="56";r.6B()}},"9O")};k.L.3q=I(l,m){H.3R.2a({1z:l,e3:m});if(H.3R.N==1&&H.3R.5r=="56"){H.6B(!l)}};k.L.gJ=I(l){H.1V=M e(i.2y.2t,l,H)};k.8n={};K k})();i.6J=c;J d=(I(){I k(){}k.1d=I(){K M k()};k.L.2N=I(n,l,m){if(!2W.1s){i.R.1b.cZ=1B;K}k.V=M i.2y().2N(n,l,m);K k.V};k.L.7h=I(l){if(1Z l=="1c"){if(1Z l.6A=="I"){e.5m=l}O{if(1Z l.43=="I"){e.a1=l}}}};k.L.3a=I(l){k.V.1V.3a(l)};k.L.2g=I(){k.V.6E();k.V.1V.2g(2)};k.L.1N=I(m,n,l,p,o){if(1Z m!="1m"){m=g[m]}k.V.7e(m,n,l,j.5H,p,o)};k.L.bI=I(m,n,l,p,o){k.V.c1(g[10][m],n,l,p,o)};K k})();i.1y=d;J h=(I(){I k(l){H.3h={};H.7T=1g;if(!e.a1){X M Y("mE 7j mO")}H.9l=e.a1.43;H.V=l;H.7W=M 1W}k.L.a4=I(l,n,o){J m={7V:l,4Y:o};m.7V.6N();H.3h[n]=m};k.L.bQ=I(l){if(l){H.7T=M i.gn(l.Q,l.Z,H.V);H.7T.6N()}};k.L.43=I(s,n){J m,q,l;if(s.2Q!="5y"){m=s;i.R.1A.2G(H.V.W,i.18.42(m.5B))}O{if(s.5q()=="mP"){m=1s.eF.4i(s.3X());H.V.3q(m.1z,i.18.42(m.8k));K}O{if(s.5q()=="mS"){m=1s.c6.4i(s.3X());i.R.1A.2G(H.V.W,i.18.42(m.5B))}O{if(d.V.6w&&d.V.6w=="1.0.0"){K}m=1s.9j.4i(s.3X());J r=s.5q();J o=r.mR(0,2);m.7s=s.7k();if(o=="mM"){m.1z=1}O{if(o=="mL"){m.1z=2}O{if(o=="mG"){m.1z=3}O{if(o=="mF"){m.1z=4}}}}m.7p=H.V.W;m.5B=2K.3S(M 2K().1E())}}if(!m){K}}q=i.18.7F(m,H.9l);if(n){q.3s=n.a7();q.2D=n.6O()}if(q===1g){K}if(q.4k!="3B"){l=i.R.1Q.3A(q.1p,q.1l);if(!l){l=i.R.1d().8i(q.1p,q.1l,"")}if(l.1p!=0){l.2M=l.2M+1;if(i.18.5S()){J p=i.4Z.1d().2n("cu"+d.V.W+l.1p+l.1l);i.4Z.1d().2G("cu"+d.V.W+l.1p+q.1l,aa(p)+1)}}l.6R=M 2K().3K();l.6T=i.8j.6C;l.4R=q.mK;l.ap=i.6K.8f;l.aI=q.2B;l.3d=q;l.2D=q.2D;l.am()}H.9l(q)};k.L.bA=I(n){if(!n){K}4q(n.2Q){1i"6s":d.V.2l.7T.5N(n.4B(),n.gL(),n.6O());1F;1i"5y":if(n.8b()!=0){d.V.1V.5l(M i.5z(n.2X()))}if(n.7P()&&n.8b()!=0){d.V.2l.7W[n.2X()]=n}O{d.V.2l.43(n)}1F;1i"72":if(n.8b()!=0){d.V.1V.5l(M i.6t(n.2X()))}J l=d.V.2l.3h[n.2X()];if(l){l.7V.5N(n.4B(),n.3X(),n.76(),l.4Y);44 d.V.2l.3h[n.2X()]}1F;1i"5z":J m=d.V.2l.3h[n.2X()];if(m){m.7V.5N(n.4B()||0,n.a7(),n.6O(),m.4Y);44 d.V.2l.3h[n.2X()]}O{d.V.2l.43(d.V.2l.7W[n.2B],n);44 d.V.2l.7W[n.2X()]}1F;1i"7g":d.V.67();1F;1i"7m":d.V.1V.2g(n.4B());1F;7I:}};K k})();i.lY=h})(P||(P={}));J 2u=(H&&H.2u)||I(g,a){1e(J e in a){if(a.8l(e)){g[e]=a[e]}}I c(){H.m0=g}g.L=a===1g?1W.m1(a):(c.L=a.L,M c())};J P;(I(c){J g=(I(){I h(i){H.4Q=1g;H.Z=1g;if(i&&1Z i=="1O"){H.5n=i}O{H.5n=cJ;H.Z=i}}h.L.6N=I(){J i=H;if(H.5n>0&&!H.4Q){H.4Q=5K(I(){i.3t(1a)},H.5n)}};h.L.67=I(){if(H.4Q){98(H.4Q);H.4Q=1g}};h.L.3t=I(i){if(i&&H.Z){H.Z(c.1J.84)}O{H.67()}};K h})();c.lR=g;J e=(I(){I h(){H.1U=[]}h.1d=I(){K M h()};h.L.cl=I(j){J i;H.3N=M c.go();i=1u.3S(j.1w);H.3N.9a=i.9a;H.3N.ac=i.ac;H.3N.ae=i.ae;H.3N.gs=i.lQ;H.3N.3l=j.9c;H.3N.2c=j.2c;H.3N.89=j.cU;H.3N.1p=j.1z=="mc"?c.2o.4S:c.2o.8a;H.1U.2a(H.3N)};h.L.cx=I(l,i){4q(i){1i"9u":J j=M c.gE(l.W,l.9e,l.9d);K j;1i"9p":K{9B:c.18.42(l.9B),2F:l.2F};1i"9A":K{9z:l.9z};1i"9D":K l.id;1i"9F":J m=M c.f9();m.fi=l.ch;m.id=l.ci;m.fh=l.cj;m.2c=l.cf;m.fa=l.9y;K m;1i"9x":K l.c9;1i"9s":K l.cc;1i"7Z":1i"9r":if(l.3Z){J k=H;1Y.2s(l.3Z,I(n){5K(k.cl(n),cv)})}K H.1U;7I:K l}};K h})();c.m6=e;J b=(I(i){2u(h,i);I h(k,j){i.1n(H,j);H.4T=k;H.4w=j}h.L.5N=I(j,l,k,m){H.3t();if(j==0){if(m){m.m8=j}H.4T({3s:l,46:k})}O{H.4w(j)}};h.L.3t=I(j){g.L.3t.1n(H,j)};K h})(g);c.cw=b;J a=(I(i){2u(h,i);I h(k,j){i.1n(H,j);H.4T=k;H.4w=j}h.L.5N=I(j,l,k,n){H.3t();if(n&&l&&j==0){4s{l=e.1d().cx(1s[n].4i(l),n)}4d(m){H.4w(c.1J.8r);K}if("9u"==n){c.6J.8n[l.W]=l}H.4T(l)}O{j>0?H.4w(j):H.4T(j)}};h.L.3t=I(j){g.L.3t.1n(H,j)};K h})(g);c.cq=a;J d=(I(i){2u(h,i);I h(l,k,j){i.1n(H,k);H.V=j;H.4T=l;H.4w=k}h.L.5N=I(l,n,p){H.3t();if(l==0){J q=c.R.1A.2n(c.R.1A.65("4x"));J m=c.R.1A.65("4x");J k=9C(q).7U(",");if(!k[1]){q=5o(q)+n;c.R.1A.2G(m,q)}if(c.R.1b.bd){c.R.1Q.2h.3J(n)}H.V.W=n;if(!c.R.fQ){H.V.3q()}if(H.V.4p.Q){H.V.4p.Q(n);44 H.V.4p.Q}O{J o=H;5K(I(){o.4T(n)},8O)}c.1y.V.1V.1r.3g("55",0);c.R.1b.9w=M 2K().3K()-p}O{if(l==6){J j={};J o=H;M c.2y().6k(H.V.2F,H.V.3m,I(){o.V.6E();M c.6J(o.V.2F,o.V.3m).gJ.1n(j,I(){c.2v.3o=="8c"&&o.V.9t()});o.V.1V.1r.3g("55",2)},o.4w,1B)}O{if(H.V.4p.Z){H.V.4p.Z(l);44 H.V.4p.Z}O{H.4w(l)}}}};h.L.3t=I(j){g.L.3t.1n(H,j)};K h})(g);c.gn=d})(P||(P={}));J P;(I(a){J b=(I(){I c(){2W.6k=I(d){a.R.1A.gy=c.2t.5L=d.gj;J e=a.R.1A.65("4x");e!==1g&&a.R.1A.41(e);a.R.1A.2G("4x"+54(a.1y.V.2F).3u(8,16),d.gj+","+(d.W||""))}}c.L.2N=I(i,g,j){J e=a.R.1A.2n("3m");if(e&&e!=i){a.R.1A.9I();a.R.1A.2G("3m",i)}if(!e){a.R.1A.2G("3m",i)}J d=M a.6J(g,i);J h=H;H.6k(g,i,I(){d.2N(j)},j.Z,1a);K d};c.L.6k=I(m,g,h,n,i){if(i){J k=54(m).3u(8,16),l=a.R.1A.2n(a.R.1A.65("4x")),o=a.R.1A.2n("4x"+k);if(l==o&&o!==1g&&a.R.1A.2n("mf")==a.2v.3o){J j=9C(l).7U(",");5K(I(){a.R.1A.gy=c.2t.5L=j[0];c.2t.W=j[1];h()},8O);K}}J e={"9E-mk":a.18.5C[a.R.58][0]+"://ml.mj.mi.49:mg/","9E-gu":a.18.5C[a.R.58][0]+"://mh.cn.5Q.5Z/"},d=1L.7y("4P");d.4W=e["9E-gu"]+(a.R.1b.4h.7X?"m5.js":"4x.js")+"?3m="+g+"&2F="+5o(m)+"&gw=6k&t="+(M 2K).3K();1L.gA.7x(d);d.53=I(){n(a.4E.88)};if("3k"in d){d.3k=h}O{d.3n=I(){d.3D=="m4"&&h()}}};c.2t=M 1W;K c})();a.2y=b})(P||(P={}));J P;(I(n){J k=(I(){I o(p){H.2Q="9Y";H.gp=0;if(p 2I n.2A){H.3L=p}O{H.3L=M n.2A(p,1B,n.38.5H,1B)}}o.L.2j=I(p,q){H.2q(p,q)};o.L.2p=I(r){J p=M n.2Y();J q=p.3z(r);H.gz=H.9o();q.2p(H.gz);H.2S(q);K q};o.L.9o=I(){K H.3L.1T()};o.L.lU=I(){K H.gp};o.L.lV=I(){K H.2p([]).8M()};o.L.lT=I(){K H.3L.4F};o.L.lS=I(p){H.3L.4F=p};o.L.8d=I(p){H.3L.39=1W.L.1E.1n(p)=="[1c 1W]"?p:n.38[p]};o.L.lP=I(p){H.3L.4o=p};o.L.lW=I(){K H.3L.4o};o.L.4n=I(){K H.3L.1z};o.L.8b=I(){K H.3L.39};o.L.4C=I(){K 0};o.L.2S=I(p){};o.L.2q=I(p,q){};o.L.3J=I(p){J r,s,q=H;1e(s in p){if(!p.8l(s)){gr}r=s.5c(/^\\w/,I(t){J u=t.6f(0);K"7j"+(u>=97?3r.7c(u&~32):t)});if(r in q){if(s=="1S"){q[r](68[p[s]]?68[p[s]]:p[s])}O{q[r](p[s])}}}};K o})();n.9Y=k;J c=(I(p){2u(o,p);I o(q){p.1n(H,1f.N==0||1f.N==3?n.3f.99:1f[0]);H.2Q="6W";H.gF=12;H.9f="lX";H.1C=M n.2Y();H.9g=3;4q(1f.N){1i 0:1i 1:1i 3:if(!1f[0]||1f[0].N>64){X M Y("6W:6J m2 m3 be 1g lZ 5M be at mm 64 mn mJ: "+1f[0])}H.8e=1f[0];H.9m=1f[1];H.9k=1f[2];1F}}o.L.4C=I(){J q=H.1C.2z(H.8e).N;q+=H.1C.2z(H.9h).N;q+=H.1C.2z(H.9i).N;q+=H.1C.2z(H.3m).N;q+=H.1C.2z(H.2F).N;K q+H.gF};o.L.2q=I(s){H.9f=s.2r();H.9g=s.5e();J r=s.5e();H.8v=(r&3M)>0;H.8u=(r&64)>0;H.gG=(r&32)>0;H.9n=r>>3&3;H.8t=(r&4)>0;H.9m=(r&32)>0;H.9k=s.2j()*5a+s.2j();H.8e=s.2r();if(H.8t){H.9h=s.2r();H.9i=s.2r()}if(H.8v){4s{H.3m=s.2r()}4d(q){X M Y(q)}}if(H.8u){4s{H.2F=s.2r()}4d(q){X M Y(q)}}K s};o.L.2S=I(r){J s=H.1C.3z(r);s.2L(H.9f);s.2p(H.9g);J q=H.9m?2:0;q|=H.8t?4:0;q|=H.9n?H.9n>>3:0;q|=H.gG?32:0;q|=H.8u?64:0;q|=H.8v?3M:0;s.2p(q);s.8J(H.9k);s.2L(H.8e);if(H.8t){s.2L(H.9h);s.2L(H.9i)}if(H.8v){s.2L(H.3m)}if(H.8u){s.2L(H.2F)}K s};K o})(k);n.6W=c;J m=(I(o){2u(p,o);I p(r){o.1n(H,1f.N==0?n.3f.4G:1f.N==1?1f[0]2I n.2A?1f[0]:n.3f.4G:1g);H.2Q="6s";H.6y=2;H.1C=M n.2Y();J q=H;4q(1f.N){1i 0:1i 1:if(!(1f[0]2I n.2A)){if(1f[0]in n.4E){if(1f[0]==1g){X M Y("6s:6n 1S of mH 6V\'t be 1g")}q.3H(1f[0])}}1F}}p.L.4C=I(){J q=H.6y;if(H.W){q+=H.1C.2z(H.W).N}K q};p.L.2q=I(s,r){s.2j();J q=+s.2j();if(q>=0&&q<=9){H.3H(q)}O{X M Y("8g 4G 6F:"+q)}if(r>H.6y){H.3b(s.2r());J u=s.2r();J t=s.fg();H.a0(t)}};p.L.2S=I(q){J r=H.1C.3z(q);r.2p(3M);4q(+1S){1i 0:1i 1:1i 2:1i 5:1i 6:r.2p(+1S);1F;1i 3:1i 4:r.2p(3);1F;7I:X M Y("8g 4G 6F:"+1S)}if(H.W){r.2L(H.W)}K r};p.L.3H=I(q){H.1S=q};p.L.3b=I(q){H.W=q};p.L.4B=I(){K H.1S};p.L.gL=I(){K H.W};p.L.a0=I(q){H.gB=q};p.L.6O=I(){K H.gB};K p})(k);n.6s=m;J h=(I(p){2u(o,p);I o(q){p.1n(H,q 2I n.2A?q:n.3f.9G);H.2Q="7m";H.6y=2;H.1C=M n.2Y();if(!(q 2I n.2A)){if(q in n.3V){H.1S=q}}}o.L.4C=I(){K H.6y};o.L.2q=I(r){r.2j();J q=+r.2j();if(q>=0&&q<=5){H.3H(68[q]?68[q]:q)}O{X M Y("8g 4G 6F:"+q)}};o.L.2S=I(r){J q=H.1C.3z(r);q.2p(0);if(+1S>=1&&+1S<=3){q.2p((+1S)-1)}O{X M Y("8g 4G 6F:"+1S)}};o.L.3H=I(q){H.1S=q};o.L.4B=I(){K H.1S};K o})(k);n.7m=h;J d=(I(p){2u(o,p);I o(q){p.1n(H,(q&&q 2I n.2A)?q:n.3f.9H);H.2Q="7R"}K o})(k);n.7R=d;J e=(I(o){2u(p,o);I p(q){o.1n(H,(q&&q 2I n.2A)?q:n.3f.a5);H.2Q="7g"}K p})(k);n.7g=e;J l=(I(o){2u(p,o);I p(q){o.1n(H,q);H.2Q="gt";H.1C=M n.2Y()}p.L.4C=I(){K 2};p.L.2S=I(u){J s=H.1C.3z(u),q=H.2X(),t=q&3c,r=(q&mQ)>>8;s.2p(r);s.2p(t);K s};p.L.2q=I(r,q){J s=r.2j()*5a+r.2j();H.5p(5F(s,10))};p.L.5p=I(q){H.2B=q};p.L.2X=I(){K H.2B};K p})(k);n.gt=l;J b=(I(o){2u(p,o);I p(q){o.1n(H,(q 2I n.2A)?q:n.3f.a6);H.gv=2;H.3G=0;H.a3=0;H.46=0;H.1C=M n.2Y();H.2Q="5z";if(!(q 2I n.2A)){o.L.5p.1n(H,q)}}p.L.4C=I(){K H.gv};p.L.2S=I(r){J q=H.1C.3z(r);l.L.2S.1n(H,q)};p.L.2q=I(r,q){l.L.2q.1n(H,r);H.3G=r.7t();H.1S=r.2j()*5a+r.2j();H.a3=r.2j()*5a+r.2j();H.46=H.3G*gl+H.a3;H.3s=r.2r()};p.L.3H=I(q){H.1S=q};p.L.a0=I(q){H.46=q};p.L.mN=I(q){H.3s=q};p.L.4B=I(){K H.1S};p.L.76=I(){K H.3G};p.L.6O=I(){K H.46};p.L.a7=I(){K H.3s};K p})(l);n.5z=b;J g=(I(o){2u(p,o);I p(s,q,r){o.1n(H,(1f.N==1&&s 2I n.2A)?s:1f.N==3?n.3f.a8:0);H.2Q="5y";H.1C=M n.2Y();H.5I=1B;if(1f.N==3){H.2O=s;H.1l=r;H.1h=1Z q=="1m"?H.1C.2z(q):q}}p.L.4C=I(){J q=10;q+=H.1C.2z(H.2O).N;q+=H.1C.2z(H.1l).N;q+=H.1h.N;K q};p.L.2S=I(r){J q=H.1C.3z(r);q.2L(H.2O);q.2L(H.1l);l.L.2S.4D(H,1f);q.2p(H.1h)};p.L.2q=I(r,q){J s=6;H.3G=r.7t();H.2O=r.2r();s+=H.1C.2z(H.2O).N;H.1l=r.2r();s+=H.1C.2z(H.1l).N;l.L.2q.4D(H,1f);H.1h=M 1Y(q-s);H.1h=r.2j(H.1h)};p.L.gm=I(q){H.2O=q};p.L.9Z=I(q){H.1h=q};p.L.7d=I(q){H.1l=q};p.L.gC=I(q){H.3G=q};p.L.gk=I(q){H.5I=q};p.L.7P=I(){K H.5I};p.L.5q=I(){K H.2O};p.L.3X=I(){K H.1h};p.L.7k=I(){K H.1l};p.L.76=I(){K H.3G};K p})(l);n.5y=g;J j=(I(p){2u(o,p);I o(s,q,r){p.1n(H,s 2I n.2A?s:1f.N==3?n.3f.ad:1g);H.1C=M n.2Y();H.2Q="74";if(1f.N==3){H.1h=1Z q=="1m"?H.1C.2z(q):q;H.2O=s;H.1l=r}}o.L.4C=I(){J q=0;q+=H.1C.2z(H.2O).N;q+=H.1C.2z(H.1l).N;q+=2;q+=H.1h.N;K q};o.L.2S=I(r){J q=H.1C.3z(r);q.2L(H.2O);q.2L(H.1l);l.L.2S.1n(H,q);q.2p(H.1h)};o.L.2q=I(r,q){J s=0;H.2O=r.2r();H.1l=r.2r();s+=H.1C.2z(H.2O).N;s+=H.1C.2z(H.1l).N;H.2q.4D(H,1f);s+=2;H.1h=M 1Y(q-s);r.2j(H.1h)};o.L.gm=I(q){H.2O=q};o.L.9Z=I(q){H.1h=q};o.L.7d=I(q){H.1l=q};o.L.5q=I(){K H.2O};o.L.3X=I(){K H.1h};o.L.7k=I(){K H.1l};K o})(l);n.74=j;J i=(I(p){2u(o,p);I o(q){p.1n(H,(q 2I n.2A)?q:n.3f.ab);H.2Q="6t";if(!(q 2I n.2A)){p.L.5p.1n(H,q)}}K o})(l);n.6t=i;J a=(I(o){2u(p,o);I p(q){o.1n(H,q);H.2Q="72";H.1C=M n.2Y()}p.L.2q=I(r,q){l.L.2q.1n(H,r);H.3G=r.7t();H.3H(r.2j()*5a+r.2j());if(q>0){H.1h=M 1Y(q-8);H.1h=r.2j(H.1h)}};p.L.3X=I(){K H.1h};p.L.4B=I(){K H.1S};p.L.76=I(){K H.3G};p.L.gC=I(q){H.3G=q};p.L.3H=I(q){H.1S=q};p.L.9Z=I(q){H.1h=q};K p})(l);n.72=a})(P||(P={}));J P;(I(d){J e=(I(){I h(j){J i=M d.2Y();H.gq=i.3z(j)}h.L.2S=I(i){if(i 2I d.9Y){i.2p(H.gq)}};K h})();d.fm=e;J b=(I(){I h(j,i){if(!i){J k=M d.2Y().3z(j);H.9N=k.5e();H.fe=k}O{H.9N=j.8A}H.2R=M d.2A(H.9N);H.fd=i;H.9P=j}h.L.2q=I(){4q(H.2R.4n()){1i 1:H.2w=M d.6W(H.2R);1F;1i 2:H.2w=M d.6s(H.2R);1F;1i 3:H.2w=M d.5y(H.2R);H.2w.gk(H.2R.7P());1F;1i 4:H.2w=M d.5z(H.2R);1F;1i 5:H.2w=M d.74(H.2R);1F;1i 6:H.2w=M d.72(H.2R);1F;1i 7:H.2w=M d.6t(H.2R);1F;1i 9:1i 11:1i 13:H.2w=M d.7g(H.2R);1F;1i 8:1i 10:1i 12:H.2w=M d.7R(H.2R);1F;1i 14:H.2w=M d.7m(H.2R);1F;7I:X M Y("mt mu 1e mp "+H.2R.4n()+" gh")}if(H.fd){H.2w.3J(H.9P)}O{H.2w.2j(H.fe,H.9P.N-1)}K H.2w};K h})();d.86=b;J g=(I(){I h(i,j,k,l){H.4F=1B;H.39=d.38.5J;H.4o=1B;H.5I=1B;if(i&&+i==i&&1f.N==1){H.4F=(i&1)>0;H.39=(i&6)>>1;H.4o=(i&8)>0;H.1z=(i>>4)&15;H.5I=(i&8)==8}O{H.1z=i;H.4F=j;H.39=k;H.4o=l}}h.L.7P=I(){K H.5I};h.L.4n=I(){K H.1z};h.L.1T=I(){J i=H;4q(H.39){1i d.38[0]:i.39=d.38.5H;1F;1i d.38[1]:i.39=d.38.5J;1F;1i d.38[2]:i.39=d.38.9W;1F;1i d.38[3]:i.39=d.38.9X;1F}J j=(H.1z<<4);j|=H.4F?1:0;j|=H.39<<1;j|=H.4o?8:0;K j};h.L.1E=I(){K"2A [1z="+H.1z+",4F="+H.4F+",39="+H.39+",4o="+H.4o+"]"};K h})();d.2A=g;J c=(I(){I h(){}h.L.2L=I(p,m){J k=[],o=0;1e(J l=0,j=p.N;l<j;l++){J n=p.6f(l);if(n>=0&&n<=mC){o+=1;k.2a(n)}O{if(n>=3M&&n<=mz){o+=2;k.2a((mx|(31&(n>>6))));k.2a((3M|(63&n)))}O{if(n>=lN&&n<=6e){o+=3;k.2a((l4|(15&(n>>12))));k.2a((3M|(63&(n>>6))));k.2a((3M|(63&n)))}}}}1e(J l=0,j=k.N;l<j;l++){if(k[l]>3c){k[l]&=3c}}if(m){K k}if(o<=3c){K[0,o].6D(k)}O{K[o>>8,o&3c].6D(k)}};h.L.2r=I(m){if(1W.L.1E.1n(m)=="[1c 3r]"){K m}J j="",o=m;1e(J k=0,n=o.N;k<n;k++){if(o[k]<0){o[k]+=5a}J l=o[k].1E(2),r=l.6x(/^1+?(?=0)/);if(r&&l.N==8){J p=r[0].N,q=o[k].1E(2).3u(7-p);1e(J s=1;s<p;s++){q+=o[s+k].1E(2).3u(2)}j+=3r.7c(5F(q,2));k+=p-1}O{j+=3r.7c(o[k])}}K j};h.L.3z=I(i){if(i 2I a){K i}O{K M a(i)}};h.L.2z=I(i){K H.2L(i)};K h})();d.2Y=c;J a=(I(){I h(i){H.37=0;H.6Y=0;H.71=0;H.1C=M c();H.3e=i;H.71=i.N}h.L.1o=I(){K H.37>=H.3e.N};h.L.7t=I(){if(H.1o()){K-1}J j="";1e(J l=0;l<4;l++){J k=H.3e[H.37++].1E(16);if(k.N==1&&l>1){k="0"+k}j+=k.1E(16)}K 5F(j,16)};h.L.fg=I(){if(H.1o()){K-1}J j="";1e(J l=0;l<8;l++){J k=H.3e[H.37++].1E(16);if(k.N==1&&l>1){k="0"+k}j+=k}K 5F(j,16)};h.L.l8=I(){if(H.1o()){K-1}J j="";1e(J k=0;k<8;k++){j+=H.3e[H.37++].1E(16)}j=j.l9(2,8);K 5F(j,16)};h.L.2r=I(){if(H.1o()){K-1}J i=(H.5e()<<8)|H.5e();K H.1C.2r(H.3e.aF(H.37,H.37+=i))};h.L.5e=I(){if(H.1o()){K-1}J i=H.3e[H.37++];if(i>3c){i&=3c}K i};h.L.2j=I(i){if(i){K H.3e.aF(H.37,H.71)}O{K H.5e()}};h.L.2p=I(j){J i=j;if(1W.L.1E.1n(i).fz()=="[1c 3y]"){[].2a.4D(H.3e,i)}O{if(+i==i){if(i>3c){i&=3c}H.3e.2a(i);H.6Y++}}K i};h.L.8J=I(i){if(+i!=i){X M Y("8J:1f 1z is fc")}H.2p(i>>8&3c);H.2p(i&3c);H.6Y+=2};h.L.2L=I(j){J i=H.1C.2L(j);[].2a.4D(H.3e,i);H.6Y+=i.N};h.L.fr=I(){J k=H.3e;1e(J j=0;j<H.71;j++){if(k[j]>3M){k[j]-=5a}}K k};h.L.8M=I(i){if(i){K H.fr()}K H.3e};K h})();d.fl=a})(P||(P={}));J P;(I(a){J b=(I(){I c(d){H.4g=1B;H.5k=1B;H.6q=[];H.1H=M 8o;H.6H=d;K H}c.L.6c=I(d,e){if(!d){X M Y("fs 6V\'t be 1H")}H.3i=d;H.1r=M 7i(a.18.5C[a.R.58][1]+"://"+d);H.1r.lx="ln";H.f4();K H.1r};c.L.3T=I(d){if(!H.4g&&!H.5k){H.6q.2a(d);K}if(H.5k){X M Y("6n fk is lo,eP eM fo fk!!!")}J h=M a.fl([]),g=M a.fm(h);g.2S(d);J e=h.8M(1a);J i=M aw(e);H.1r.3T(i.aG);K H};c.L.59=I(d){if(a.18.aC(d)){H.6H.8L(M a.86(d).2q())}O{H.6H.8L(M a.86(a.18.aH(d)).2q())}K""};c.L.6P=I(e){J d=H;d.5k=1a;d.1r=H.1H;a.1y.V.6E();if(e.6F==lu&&!H.8S){d.6H.3g("55",a.3V.8Q)}O{d.8S=0}};c.L.Z=I(d){lr.mT(d);X M Y(d)};c.L.f4=I(){J d=H;d.1r.nX=I(){d.4g=1a;d.5k=1B;d.eN();d.6H.3g("2N")};d.1r.nV=I(e){if(1Z e.1h=="1m"){d.59(e.1h.7U(","))}O{d.59(e.1h)}};d.1r.53=I(e){d.Z(e)};d.1r.o4=I(e){d.6P(e)}};c.L.eN=I(){J e=H;1e(J g=0,d=e.6q.N;g<d;g++){e.3T(e.6q[g])}};c.L.2g=I(d){J e=H;if(e.1r.3D){e.5k=1a;if(d){e.8S=d}H.1r.o3()}};c.L.3a=I(){H.2g();H.6c(H.3i)};K c})();a.eO=b})(P||(P={}));J P;(I(b){J a=(I(){I c(d){H.1H=M 8o;H.4g=1B;H.6q=[];H.1r=d;K H}c.L.6c=I(e,h){if(!e){X M Y("nL is 1H,eP 1o it!")}H.3i=e;J d=b.R.1A.2n(b.2y.2t.W+"57"),g=H;if(d){5K(I(){g.Q(\'{"1S":0,"W":"\'+b.2y.2t.W+\'","8A":32,"2B":0,"8m":"\'+d+\'"}\');g.4g=1a},8O);K H}H.8z(e,1a);K H};c.L.90=I(e,h,d){J g=H.f3();if(d){g.nH=1a}g.eM(h||"eK",b.18.5C[b.R.58][0]+"://"+e);if(h=="eS"&&"eL"in g){g.eL("nM-1z","nN/x-o6-ol-ok; om=os-8")}K g};c.L.8z=I(d,g){J e=H;e.2d=H.90(d,"eK");if("3k"in e.2d){e.2d.3k=I(){e.2d.3k=e.1H;if(H.69=="f1 8Z"){e.Z()}O{e.Q(H.69,g)}};e.2d.53=I(){e.2g()}}O{e.2d.3n=I(){if(e.2d.3D==4){e.2d.3n=e.1H;if(/^(8X|f0)$/.3I(e.2d.1S)){e.Q(e.2d.69,g)}O{if(/^(op|oa)$/.3I(e.2d.1S)){e.Z()}O{e.2g()}}}}}e.2d.3T()};c.L.3T=I(e){J d=H;H.2k=H.90(b.2y.2t.5L+"/8c"+e.3i,"eS");if("3k"in d.2k){d.2k.3k=I(){d.2k.3k=d.1H;d.59(d.2k.69)};d.2k.53=I(){d.2k.53=d.1H}}O{d.2k.3n=I(){if(d.2k.3D==4){H.3n=H.1H;if(/^(f0|8X)$/.3I(d.2k.1S)){d.59(d.2k.69)}}}}d.2k.3T(1u.2e(e.1h))};c.L.59=I(e,h){if(!e||e=="f1 8Z"){K}J d=H,g=1u.3S(e);if(g.W){b.2y.2t.W=g.W}if(h){b.R.1A.2G(b.2y.2t.W+"57",h)}if(!b.18.aC(g)){g=[g]}1Y.2s(g,I(i){d.1r.3g("1D",M b.86(i,1a).2q())});K""};c.L.f3=I(){J d=1Z 80!=="3C"&&"ob"in M 80(),e=H;if("3C"!=1Z 80&&d){K M 80()}O{if("3C"!=1Z eZ){K M eZ()}O{K M od("nF.nG")}}};c.L.6P=I(){if(H.2d){if(H.2d.3k){H.2d.3n=H.2d.3k=H.1H}O{H.2d.3n=H.1H}H.2d.eT();H.2d=1g}if(H.2k){if(H.2k.3k){H.2k.3n=H.2k.3k=H.1H}O{H.2k.3n=H.1H}H.2k.eT();H.2k=1g}};c.L.2g=I(){b.R.1A.41(b.2y.2t.W+"57");H.6P()};c.L.3a=I(){H.2g();H.6c(H.3i)};c.L.Q=I(e,g){J d=e.6x(/"8m":"\\S+?(?=")/);H.59(e,d?d[0].3u(13):0);if(/"8A":-32,/.3I(e)){b.R.1A.41(b.2y.2t.W+"57");K}H.8z(b.2y.2t.5L+"/mW.js?8m="+b.R.1A.2n(b.2y.2t.W+"57"));H.4g=1a;g&&H.1r.3g("2N")};c.L.Z=I(){b.R.1A.41(b.2y.2t.W+"57");H.6P();H.4g=1B;H.1r.3g("2g")};K c})();b.fu=a})(P||(P={}));J 7A={"1X:g1":"4l","1X:g2":"4U","1X:g3":"4H","1X:g4":"5d","1X:g0":"5b","1X:fZ":"4O","1X:fV":"4I","1X:fU":"4t","1X:fW":"5h","1X:fX":"4L","1X:fY":"4J","1X:g5":"3B"},61={},g6={4:"nA",2:"nD",3:"nv",1:"bj",6:"nu",7:"bj",8:"bj"},68={1:6};J P;(I(P){J 2v=(I(){I 2v(){}2v.3o=P.5V.3x;K 2v})();P.2v=2v;J 3P=(I(){I 3P(){H.1U=[]}3P.L.4M=I(gd,3l){1e(J i=0,2m=H.1U.N;i<2m;i++){if(H.1U[i].1p==gd&&3l==H.1U[i].3l){K H.1U[i]}}};3P.L.gg=I(4j){J 5G=1a,me=H;1e(J i=0,2m=H.1U.N;i<2m;i++){if(me.1U[i].1p==4j.1p&&4j.3l==me.1U[i].3l){H.1U.5j(H.1U.3w(i,1)[0]);5G=1B;1F}}if(5G){H.1U.5j(4j)}};3P.L.5c=I(4j){J me=H;1e(J i=0,2m=H.1U.N;i<2m;i++){if(me.1U[i].1p==4j.1p&&4j.3l==me.1U[i].3l){me.1U.3w(i,1,4j);1F}}};3P.L.6j=I(1p,3l){J me=H;1e(J i=0,2m=H.1U.N;i<2m;i++){if(me.1U[i].1p==1p&&3l==me.1U[i].3l){H.1U.3w(i,1);1F}}};K 3P})();P.3P=3P;J 47=(I(){I 47(){H.1j=[]}47.L.4M=I(gf,1l){1e(J i=0,2m=H.1j.N;i<2m;i++){if(H.1j[i].1p==gf&&H.1j[i].1l==1l){K H.1j[i]}}K 1g};47.L.gg=I(3E){J 5G=1a;1e(J i=0,2m=H.1j.N;i<2m;i++){if(H.1j[i].1p===3E.1p&&H.1j[i].1l===3E.1l){H.1j.5j(H.1j.3w(i,1)[0]);5G=1B;1F}}if(5G){H.1j.5j(3E)}};47.L.5c=I(3E){1e(J i=0,2m=H.1j.N;i<2m;i++){if(H.1j[i].1p===3E.1p&&H.1j[i].1l===3E.1l){H.1j.3w(i,1,3E);1F}}};47.L.6j=I(3E){1e(J i=0,2m=H.1j.N;i<2m;i++){if(H.1j[i].1p===3E.1p&&H.1j[i].1l===3E.1l){H.1j.3w(i,1);1F}}};K 47})();P.47=47;J 18=(I(){I 18(){}18.5S=I(){if(2W.51){K 1a}O{K 1B}};18.nt=I(){K 1u.2e(51).N<np};18.1G=I(4f){if(1W.L.1E.1n(4f)=="[1c 7Q]"){J 2i=M aw(4f);K[].3u.1n(2i)}K 4f};18.aH=I(4f){if(1W.L.1E.1n(4f)=="[1c 7Q]"){J 2i=M nw(4f);K 2i}K 4f};18.9b=I(2i,g7,77){1e(J l=2i.N,i=(77<0)?7O.nh(0,+77):77||0;i<l;i++){if(2i[i]==g7){K i}}K-1};18.aC=I(4K){K 1W.L.1E.1n(4K)=="[1c 1Y]"};18.2s=I(2i,3U){if([].2s){K I(2i,3U){[].2s.1n(2i,3U)}}O{K I(2i,3U){1e(J i=0;i<2i.N;i++){3U.1n(2i,2i[i],i,2i)}}}};18.6j=I(3y,3U){1e(J i=0,2m=3y.N;i<2m;i++){if(3U(3y[i])){K 3y.3w(i,1)[0]}}K 1g};18.42=I(4K,fB){if(4K.45===3C){K 4K}J 45=4K.45;if(45<0){45+=oi+1}45=45.1E(16);J 46=5F(4K.n6.1E(16)+"n9".5c(M 6l("0{"+45.N+"}$"),45),16);if(fB){K M 2K(46)}K 46};18.7F=I(2Z,43){J 1D=M P.4Y(),1q=2Z.1q,de,1v=2Z.7E,3F,al=1B;4s{if(P.R.1b.4h.7X){3F=M P.2Y().2r(1q.7v?18.1G(1q.aG).3u(1q.7v,1q.5E):1q);de=1u.3S(3F)}O{3F=M P.2Y().2r(1q.7v?18.aH(1q.aG).aF(1q.7v,1q.5E):1q);de=1u.3S(3F)}}4d(ex){de=3F;al=1a}if("fI"in P&&de.1q){de.1q=de.1q.5c(/[\\oe-\\og]/g,I(x){K 5i("P.fI.oc(x) || x")})}if(1v in 7A){J 3v="M P."+7A[1v]+"(de)";1D.1q=5i(3v);1D.4k=7A[1v]}O{if(1v in 61){J 3v="M P.R.7z."+61[1v]+"(de)";if(al){1D.1q=5i(3v).4i(de)}O{1D.1q=5i(3v)}1D.4k=61[1v]}O{1D.1q=M P.4A({1q:de,1v:1v});1D.4k="4A"}}1D.2D=18.42(2Z.5B);1D.4R=2Z.7p;1D.1p=2Z.1z;if(2Z.7p==P.1y.V.W){1D.1l=2Z.7s}O{1D.1l=(/^[oq]$/.3I(2Z.1z||2Z.4n())?2Z.7s:1D.4R)}if(2Z.o5==1){1D.7b=P.5A.7r}O{1D.7b=P.5A.an}if((2Z.1S&2)==2){1D.fb=1a}1D.3s=2Z.5D;1D.6R=M 2K().3K();1D.2B=(1D.1p+"6d"+~~(7O.fL()*hU));1D.1v=1v;K 1D};18.5C=[["fK","hV"],["hS","hW"]];18.hX={i2:1,hO:1,hE:1a,hD:1a};K 18})();P.18=18;J 34=(I(){I 34(){}34.3J=I(){H.2B=+(P.R.1A.2n("5D")||P.R.1A.2G("5D",0)||0)};34.ao=I(25){H.6m&&H.3J();if(H.2B>=6e){25();K 1B}H.2B++;H.6m&&P.R.1A.2G("5D",H.2B);K H.2B};34.fM=I(){H.2B=0;H.6m&&P.R.1A.2G("5D",H.2B)};34.2X=I(){H.6m&&H.3J();K H.2B};34.2B=0;34.6m=2v.3o===P.5V.4y;K 34})();P.34=34;J 1k=(I(){I 1k(){}1k.1d=I(){K M 1k()};1k.L.1o=I(f,37,d){J c=1f.b3.hG;if("V"in P.1y||d){1e(J g=0,e=c.1f.N;g<e;g++){if(!M 6l(H.4n(c.1f[g])).3I(f[g])){X M Y("6n fR of "+g+" b2 6o fP 1z "+H.4n(c.1f[g])+" ["+f[g]+"] -> 37:"+37)}}}O{X M Y("6n b2 is fO or 6o 2f 1K hL R -> 37:"+37)}};1k.L.4n=I(3v){J aY=1W.L.1E.1n(3v).fz();K aY.3u(8,aY.N-1)};K 1k})();P.1k=1k;J 3W=(I(){I 3W(5E){H.3h={};H.78=[];H.5E=5E||10}3W.L.7j=I(3p,2b){if(H.3h.8l(3p)){if(H.78.N===H.5E){J fx=H.78.fy();44 H.3h[fx]}H.78.2a(3p)}H.3h[3p]=2b};3W.L.4M=I(3p){K H.3h[3p]||0};3W.L.6j=I(3p){44 H.3h[3p]};K 3W})();P.3W=3W})(P||(P={}));J P;(I(c){J a=(I(){I g(h){X M Y("fv 25 is fF, fD 5M fC H 25 in fS fT.")}g.1I=I(){X M Y("fv 25 is fF, fD 5M fC H 25 in fS fT.")};K g})();c.iC=a;J d=(I(h){2u(g,h);I g(){h.4D(H,1f)}K g})(a);c.iB=d;J b=(I(h){2u(g,h);I g(){h.4D(H,1f)}K g})(a);c.iy=b;J e=(I(){I g(){}g.2P=I(h){J j={};1e(J i in h){if(i!="1M"&&"1T"!=i){j[i]=h[i]}}K j};g.b7=I(h){if(h.N<1){X M Y("1Y is 1H  -> 4N.b7")}J i=I(k){1e(J j in h){if(k[h[j]]){i.L[h[j]]=k[h[j]]}}H.1T=I(){K 1u.2e(c.2E.2P(H))}};K i};K g})();c.2E=e})(P||(P={}));J P;(I(b){J c=(I(){I e(g){H.1M="g9";J h=g}e.L.1T=I(){K 3C};e.L.b6=I(){K 1g};K e})();b.g9=c;J a=(I(){I e(g){H.1M="6g";J h=g}e.L.1T=I(){K 3C};e.L.b6=I(){K 1g};K e})();b.6g=a;J d=(I(){I e(g){H.1M="6h";J h=g}e.L.1T=I(){K 3C};e.L.b6=I(){K 1g};K e})();b.6h=d})(P||(P={}));J P;(I(g){J e=(I(){I i(j){H.1M="4O";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4O.")}H.1D=j.1D;H.1w=j.1w;if(j.1x){H.1x=j.1x}}i.1I=I(j){K M i({1D:j,1w:""})};i.L.1T=I(){K 1u.2e(g.2E.2P(H))};K i})();g.4O=e;J b=(I(){I i(j){H.1M="4J";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4J.")}4s{if(1W.L.1E.1n(j.1h)=="[1c 3r]"){H.1h=1u.3S(j.1h)}O{H.1h=j.1h}}4d(k){H.1h=j.1h}H.2c=j.2c;H.1w=j.1w}i.1I=I(j){K M i({1h:j,1w:""})};i.L.1T=I(){K 1u.2e(g.2E.2P(H))};K i})();g.4J=b;J a=(I(){I i(j){H.1M="4I";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4I.")}H.4m=j.4m;H.aO=j.aO;H.1D=j.1D;H.1w=j.1w;H.aW=j.aW;if(j.1x){H.1x=j.1x}}i.1I=I(k,j,l,m){K M e({4m:k,aW:j,aO:l,1D:m})};i.L.1T=I(){K 1u.2e(g.2E.2P(H))};i.il="ia";i.ik="ie";i.hy="hq";K i})();g.4I=a;J c=(I(){I i(j){H.1M="4t";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4t.")}H.4m=j.4m;4s{if(1W.L.1E.1n(j.1h)=="[1c 3r]"){H.1h=1u.3S(j.1h)}O{H.1h=j.1h}}4d(k){H.1h=j.1h}H.1w=j.1w;if(j.1x){H.1x=j.1x}}i.1I=I(j,k){K M i({4m:j,1h:k})};i.L.1T=I(){K 1u.2e(g.2E.2P(H))};K i})();g.4t=c;J d=(I(){I i(j){H.1M="5h";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4t.")}4s{if(1W.L.1E.1n(j.1h)=="[1c 3r]"){H.1h=1u.3S(j.1h)}O{H.1h=j.1h}}4d(k){H.1h=j.1h}H.2c=j.2c;H.1w=j.1w;if(j.1x){H.1x=j.1x}}i.1I=I(j,k){K M i({2c:j,1h:k,1w:""})};i.L.1T=I(){K 1u.2e(g.2E.2P(H))};K i})();g.5h=d;J h=(I(){I i(j){H.1M="4L";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4L.")}H.1w=j.1w;H.aM=j.aM;H.1z=j.1z;H.eV=j.eV;H.4m=j.4m;H.1x=j.1x;if(j.1x){H.1x=j.1x}}i.L.1T=I(){K 1u.2e(g.2E.2P(H))};K i})();g.4L=h})(P||(P={}));J P;(I(l){J a=(I(){I m(n){H.1M="4l";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4l.")}H.1q=n.1q;H.1w=n.1w;if(n.1x){H.1x=n.1x}}m.1I=I(n){K M m({1w:"",1q:n})};m.L.1T=I(){K 1u.2e(l.2E.2P(H))};K m})();l.4l=a;J b=(I(){I m(n){H.1M="3B";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 3B.")}H.aK=n.aK;H.1h=n.1h}m.1I=I(n,o){K M m({aK:n,1h:o})};m.L.1T=I(){K 1u.2e(l.2E.2P(H))};K m})();l.3B=b;J g=(I(){I m(n){H.1M="4H";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4H.")}H.1q=n.1q;H.aL=n.aL;H.1w=n.1w;if(n.1x){H.1x=n.1x}}m.1I=I(n,o){K M m({1q:n,aL:o,1w:""})};m.L.1T=I(){K 1u.2e(l.2E.2P(H))};K m})();l.4H=g;J k=(I(){I m(n){H.1M="4U";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4U.")}H.1q=n.1q;H.5g=n.5g;H.1w=n.1w;if(n.1x){H.1x=n.1x}}m.1I=I(o,n){K M m({1q:o,5g:n,1w:""})};m.L.1T=I(){K 1u.2e(l.2E.2P(H))};K m})();l.4U=k;J e=(I(){I m(n){H.1M="5b";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 5b.")}H.k2=n.eJ;H.aP=n.aP;H.aQ=n.aQ;H.1q=n.1q;H.1w=n.1w;if(n.1x){H.1x=n.1x}}m.1I=I(q,o,p,n){K M m({eJ:o,aP:o,aQ:p,1q:n,1w:""})};m.L.1T=I(){K 1u.2e(l.2E.2P(H))};K m})();l.5b=e;J c=(I(){I m(n){H.1M="5d";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 5d.")}H.aV=n.aV;H.1q=n.1q;H.5g=n.5g;H.1w=n.1w;H.3i=n.3i;if(n.1x){H.1x=n.1x}}m.1I=I(q,p,o,n){K M m({aV:q,1q:p,5g:o,3i:n,1w:""})};m.L.1T=I(){K 1u.2e(l.2E.2P(H))};K m})();l.5d=c;J j=(I(){I m(n){H.1M="4A";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> 4A.")}H.1D=n}m.L.1T=I(){K""};K m})();l.4A=j;J d=(I(){I m(n){H.1M="aR";if(1f.N==0){X M Y("33 2f 35 2U 1H 2T, 2V 1I 25 36 -> aR.")}H.1q=n.1q;H.1w=n.1w;H.aS=n.aS;if(n.1x){H.1x=n.1x}}m.1I=I(n){K M m({1q:"",jU:"",aS:n,1w:""})};m.L.1T=I(){K 1u.2e(l.2E.2P(H))};K m})();l.aR=d;J h=(I(){I m(n){H.1M="fj";H.ke=n}m.L.1T=I(){K 1g};K m})();l.fj=h;J i=(I(){I m(n){H.1M="fn";H.kw=n}m.L.1T=I(){K 1g};K m})();l.fn=i})(P||(P={}));J P;(I(j){J a=(I(){I k(o,q,m,y,u,w,B,v,l,A,p,n,x,t,z,s,r){H.75=o;H.1p=q;H.kG=m;H.7K=y;H.3d=u;H.aI=w;H.ap=B;H.1v=v;H.6T=l;H.6R=A;H.4R=p;H.gi=n;H.4r=x;H.2D=t;H.1l=z;H.2M=s;H.kh=r}k.L.am=I(){j.R.1Q.5U(H,{Q:I(l){}})};K k})();j.ak=a;J i=(I(){I k(p,o,n,l,m){H.fi=p;H.id=o;H.fh=n;H.2c=l;H.fa=m}K k})();j.f9=i;J e=(I(){I k(n,l,m){H.id=n;H.2c=l;H.89=m}K k})();j.iZ=e;J h=(I(){I k(v,o,m,s,y,w,l,A,n,u,q,z,t,r,p,x){H.1q=v;H.1p=o;H.1w=m;H.1v=s;H.7b=y;H.2B=w;H.6T=l;H.6R=A;H.4R=n;H.4r=u;H.2D=q;H.1l=z;H.4k=t;H.3s=r;H.fb=p;H.j8=x}K k})();j.4Y=h;J d=(I(){I k(m,l){H.6Q=m;H.6S=l}k.L.gN=I(){if(H.6Q&&H.6S){K 3}O{if(H.6Q||!H.6S){K 2}O{if(!H.6Q||H.6S){K 1}O{if(!H.6Q&&!H.6S){K 0}}}}};K k})();j.2C=d;J g=(I(){I k(p,n,o,l,m){H.id=p;H.2c=n;H.1z=o;H.he=l;H.3i=m}K k})();j.hf=g;J b=(I(){I k(s,r,q,m,n,p,o,l){H.1p=s;H.ac=r;H.ae=q;H.2c=m;H.89=n;H.3l=p;H.gs=o;H.9a=l}K k})();j.go=b;J c=(I(){I k(m,l,n){H.W=m;H.2c=l;H.89=n}K k})();j.gE=c})(P||(P={}));J P;(I(a){J b=(I(){I c(){H.2h=M a.aZ()}c.L.5U=I(g,j){J e=1a;1e(J h=0,d=a.R.1b.1j.N;h<d;h++){if(a.R.1b.1j[h].1p===g.1p&&a.R.1b.1j[h].1l===g.1l){a.R.1b.1j.5j(a.R.1b.1j.3w(h,1)[0]);e=1B;1F}}if(e){a.R.1b.1j.5j(g)}j.Q(1a)};c.L.5W=I(j,e,h){1e(J g=0,d=a.R.1b.1j.N;g<d;g++){if(a.R.1b.1j[g].1p===j&&a.R.1b.1j[g].1l===e){a.R.1b.1j.3w(g,1);if(a.18.5S()){a.4Z.1d().41("cu"+a.1y.V.W+j+e)}1F}}h.Q(1a)};c.L.7u=I(h,d,e,g){if(g){g.Q(M a.4Y())}};c.L.aA=I(h,d,e,g){g.Q(1a)};c.L.gb=I(h,e,d,g){g.Q(1a)};c.L.bg=I(d,e){e.Q(d)};c.L.83=I(g,d,e){e.Q(1a)};c.L.8N=I(j,d,e,h,i){J g=H;if(e=="bM"){if(a.R.1b.1j.N>0){g.5P({Q:I(k){1Y.2s(k,I(l){if(l.1p==j&&l.1l==d){l.2M=0}})},Z:I(k){i.Z(k)}},1g)}}i.Q(1a)};c.L.3A=I(k,e){J j=1g;1e(J g=0,d=a.R.1b.1j.N;g<d;g++){if(a.R.1b.1j[g].1p==k&&a.R.1b.1j[g].1l==e){j=a.R.1b.1j[g];if(a.18.5S()){J h=a.4Z.1d().2n("cu"+a.1y.V.W+k+e);if(j.2M==0){j.2M=aa(h)}}}}K j};c.L.5P=I(g,d){if(a.R.1b.1j.N==0||a.R.1b.7J){a.R.1d().a9({Q:I(h){if(a.18.5S()){1Y.2s(a.R.1b.1j,I(j){J i=a.4Z.1d().2n("cu"+a.1y.V.W+j.1p+j.1l);if(j.2M==0){j.2M=aa(i)}})}a.R.1b.7J=1B;g.Q(h)},Z:I(h){g.Q([])}},d)}O{if(d){J e=[];1Y.2s(d,I(h){1Y.2s(a.R.1b.1j,I(i){if(i.1p==h){e.2a(i)}})});g.Q(e)}O{g.Q(a.R.1b.1j)}}};c.L.7o=I(d,e){1Y.2s(d,I(g){1Y.2s(a.R.1b.1j,I(h){if(g==h.1p){a.R.1d().5W(h.1p,h.1l,{Q:I(){},Z:I(){}})}})});e.Q(1a)};c.L.6v=I(i,d,g,e,h){a.R.1d().ag(i,d,g,e,h)};c.L.7q=I(e){J d=0;1Y.2s(a.R.1b.1j,I(g){d+=g.2M});e.Q(d)};c.L.7M=I(e,g){J d=0;1Y.2s(e,I(h){1Y.2s(a.R.1b.1j,I(i){if(i.1p==h){d+=i.2M}})});g.Q(d)};c.L.7L=I(h,d,g){J e=H.3A(h,d);g.Q(e?e.2M:0)};c.L.7N=I(h,d,g){J e=H.3A(h,d);if(e){if(a.18.5S()){a.4Z.1d().41("cu"+a.1y.V.W+h+d)}e.2M=0}g.Q(1a)};c.L.6u=I(h,d,g){J e=H.3A(h,d);H.5U(e,g)};c.L.6Z=I(d,e,g){g.Q(1a)};c.L.6U=I(e,d,g){g.Q(1a)};c.L.73=I(e,d,g){g.Q(1a)};K c})();a.aU=b})(P||(P={}));J P;(I(a){J b=(I(){I c(){}c.L.3J=I(e){J g=H,i=1B;g.W=e;g.db=k6("eI","1.0","eI",10*8V*8V);if(g.db){i=1a;J d="eR f2 eY aN eU 62"+e+" (4c,3Y,66,5T,aJ)";J h="eR f2 eY aN eU 5Y"+e+" (gc h7 aN ft hk hw hr,fA,6a,4c,3Y,5T,66,fE)";g.b5(d);g.b5(h)}K i};c.L.fG=I(e,d,g){H.db.b9(I(h){h.7S(e,d,I(i,j){g(j.g8)})})};c.L.h4=I(d,e){H.db.im(I(g){g.7S(d,I(h,i){e(i.g8)})})};c.L.4e=I(e,d){H.db.b9(I(g){g.7S(e,d)})};c.L.b5=I(d){H.db.b9(I(e){e.7S(d)})};K c})();a.aZ=b})(P||(P={}));J P;(I(a){J b=(I(){I c(){H.2h=M a.aZ()}c.L.fH=I(d,g){J e="eX 62"+H.2h.W+" T eW T.66 = ?,T.5T = ?,T.aJ = ? 5O T.4c = ? 5f T.3Y = ?";H.2h.4e(e,[1u.2e(d),d.2D,d.7K,d.1p,d.1l])};c.L.5U=I(g,h){J e=H;J d="hJ * 6G 62"+e.2h.W+" T 5O T.4c = ? 5f T.3Y = ?";e.2h.fG(d,[3r(g.1p),g.1l],I(i){if(i.N>0){e.fH(g,h)}O{J j="fN fw 62"+H.2h.W+"(4c,3Y,66,5T,aJ) ga(?,?,?,?,?)";e.2h.4e(j,[g.75,g.1l,1u.2e(g),g.2D,g.7K])}h.Q(1a)})};c.L.5W=I(h,d,g){J e="79 6G 62"+H.2h.W+" T 5O T.4c = ? 5f T.3Y = ?";H.2h.4e(e,[h,d]);g.Q(1a)};c.L.7u=I(j,e,g,i){J h="fN fw 5Y"+H.2h.W+" T (fA,6a,4c,3Y,5T,66,fE)ga(?,?,?,?,?,?,?)";J d=g.3s?0:1;H.2h.4e(h,[g.4k,g.3s,g.1p,g.1l,g.2D,1u.2e(g),d])};c.L.aA=I(i,d,e,h){if(e.N==0){K}J g="79 6G 5Y"+H.2h.W+" T 5O T.6a ge (?)";H.2h.4e(g,[e.6i(",")])};c.L.gb=I(i,d,e,h){if(e.N==0){K}J g="79 6G 5Y"+H.2h.W+" T 5O T.gc ge (?) 5f T.6a nr ft 5f T.4c = ? 5f T.3Y = ?";H.2h.4e(g,[e.6i(","),i,d])};c.L.bg=I(d,g){J e="eX 5Y"+H.2h.W+" T eW T.6a = ?,T.5T = ? "};c.L.8N=I(i,d,e,g,h){X M Y("1R 1P 1K")};c.L.83=I(h,d,g){J e="79 6G 5Y"+H.2h.W+" T 5O T.4c = ? 5f T.3Y = ? ";H.2h.4e(e,[h,d])};c.L.3A=I(e,d){X M Y("1R 1P 1K")};c.L.5P=I(e,d){X M Y("1R 1P 1K")};c.L.7o=I(d,e){X M Y("1R 1P 1K")};c.L.6v=I(i,d,g,e,h){X M Y("1R 1P 1K")};c.L.7q=I(d){X M Y("1R 1P 1K")};c.L.7M=I(d,e){X M Y("1R 1P 1K")};c.L.7L=I(g,d,e){X M Y("1R 1P 1K")};c.L.7N=I(g,d,e){X M Y("1R 1P 1K")};c.L.6u=I(g,d,e){X M Y("1R 1P 1K")};c.L.6Z=I(d,e,g){X M Y("1R 1P 1K")};c.L.6U=I(e,d,g){X M Y("1R 1P 1K")};c.L.73=I(e,d,g){X M Y("1R 1P 1K")};K c})();a.mD=b})(P||(P={}));J P;(I(a){J b=(I(){I c(){}c.L.2G=I(e,d){J g=M 2K();g.5X(g.3K()+15*24*mI*gl);1L.5R=e+"="+9C(d)+";96=/;9V="+g.md()};c.L.2n=I(e){J d=1L.5R.6x(M 6l("(^| )"+e+"=([^;]*)(;|$)"));if(d!=1g){K(d[2])}K 1g};c.L.41=I(d){if(H.2n(d)){1L.5R=d+"=;96=/;9V=m9, gK-mb-ma gM:gM:gK m7"}};c.L.65=I(g){J e=1L.5R.6x(M 6l("(^| )4x\\\\w+?=([^;]*)(;|$)")),j="";if(e){1e(J h=0,d=e.N;h<d;h++){if(e[h].9b(g)>-1){j=e[h];1F}}}K j?j.7U("=")[0].5c(/^\\s/,""):1g};c.L.9I=I(){J e=1L.5R.6x(/[^ =;]+(?=\\=)/g);if(e){1e(J d=e.N;d--;){1L.5R=e[d]+"=0;96=/;9V="+M 2K(0).ly()}}};c.L.di=I(){K 4*8V};K c})();a.dK=b})(P||(P={}));J P;(I(a){J b=(I(){I c(){}c.1d=I(){K M c()};c.L.2G=I(e,d){51.2G(e.1E(),d)};c.L.2n=I(d){K 51.2n(d?d.1E():"")};c.L.41=I(d){51.41(d.1E())};c.L.9I=I(){51.mY()};c.L.di=I(){K 1u.2e(51).N};K c})();a.4Z=b})(P||(P={}));J P;(I(b){J a=(I(){I c(){H.4P=1L.7y("4P");H.6z=1L.cY("6z")[0];b.2v.3o=b.5V.3x;if("7i"in 2W&&"7Q"in 2W&&7i.L.9v===3&&!2W.7X){H.4P.4W="//7Y.5Q.5Z/gD-gH-2.7.js";H.6z.7x(H.4P)}O{b.2v.3o="2d-fq";2W.1s=7a}}K c})();b.mV=a;if(1L.3D=="eH"||1L.3D=="eQ"||1L.3D=="56"){M a()}O{if(1L.7B){1L.7B("fJ",I(){1L.nO("fJ",1f.b3,1B);M a()},1B)}O{if(1L.eG){1L.eG("3n",I(){if(1L.3D=="eH"||1L.3D=="eQ"||1L.3D=="56"){1L.jS("3n",1f.b3);M a()}})}}}})(P||(P={}));J P;(I(P){J 4b=(I(){I 4b(){}4b.L.fp=I(){H.gx();H.f7()};4b.L.f7=I(){if(!1Y.2s){1Y.2s=I(2i,3U){1e(J i=0;i<2i.N;i++){3U.1n(2i,2i[i],i,2i)}}}};4b.L.gx=I(){if(!2W.1u){2W.1u=(I(){I 1u(){}1u.3S=I(gI){K 5i("("+gI+")")};1u.2e=I(2b){K H.3v("",{"":2b})};1u.3v=I(3p,f6){J i,k,v,N,iX="",4z,2b=f6[3p],me=H;if(2b&&1Z 2b==="1c"&&1Z 2b.f8==="I"){2b=2b.f8(3p)}4q(1Z 2b){1i"1m":K me.aT(2b);1i"1O":K kE(2b)?3r(2b):"1g";1i"kC":1i"1g":K 3r(2b);1i"1c":if(!2b){K"1g"}4z=[];if(1W.L.1E.4D(2b)==="[1c 1Y]"){N=2b.N;1e(i=0;i<N;i+=1){4z[i]=me.3v(i,2b)||"1g"}v=4z.N===0?"[]":"["+4z.6i(",")+"]";K v}1e(k in 2b){if(1W.L.8l.1n(2b,k)){v=me.3v(k,2b);if(v){4z.2a(me.aT(k)+":"+v)}}}v=4z.N===0?"{}":"{"+4z.6i(",")+"}";K v}};1u.aT=I(1m){J me=H;me.70.jN=0;K me.70.3I(1m)?\'"\'+1m.5c(me.70,I(a){J c=me.f5[a];K 1Z c==="1m"?c:"\\\\u"+("iA"+a.6f(0).1E(16)).3u(-4)})+\'"\':\'"\'+1m+\'"\'};1u.70=M 6l(\'[\\\\"\\\\\\\\"\\hB-\\o0\\o1-\\nB\\nc\\nb-\\n2\\nq\\ny\\nz\\ni-\\n1\\n3-\\n4\\n0-\\ne\\n7\\na-\\o7]\',"g");1u.f5={"\\b":"\\\\b","\t":"\\\\t","\\n":"\\\\n","\\f":"\\\\f","\\r":"\\\\r",\'"\':\'\\\\"\',"\'\'":"\\\\\'\'","\\\\":"\\\\\\\\"};K 1u})()}};K 4b})();P.4b=4b})(P||(P={}));J P;(I(a){J b=(I(){I c(){}c.L.ff=I(h,e,g){J d=1L.7y("4P");d.mB=1a;if(e){if(d.7B){d.7B("ff",I(i){J j=i.gO||i.9q;e(j.4W)},1B)}O{if(d.3D){d.3n=I(i){J j=i.9q;e(j.4W)}}}}if(g){d.53=I(i){J j=i.gO||i.9q;g(j.4W)}}(1L.6z||1L.cY("6z")[0]).7x(d);d.4W=h};K c})()})(P||(P={}));', 62, 1517, "|||||||||||||||||||||||||||||||||||||||||||this|function|var|return|prototype|new|length|else|RongIMLib|onSuccess|RongIMClient|||toArrayBuffer|_client|userId|throw|Error|onError|||||||||MessageUtil||true|_memoryStore|object|getInstance|for|arguments|null|data|case|conversationList|CheckParam|targetId|string|call|check|conversationType|content|socket|Modules|bridge|JSON|objectName|extra|user|Bridge|type|_cookieHelper|false|binaryHelper|message|toString|break|ArrayForm|empty|obtain|ErrorCode|yet|document|messageName|queryMsg|number|implemented|_dataAccessProvider|Not|status|encode|publicServiceList|channel|Object|RC|Array|typeof||||||method|||||push|value|name|xhr|stringify|not|disconnect|database|arr|read|sendxhr|handler|len|getItem|ConversationType|write|readMessage|readUTF|forEach|Endpoint|__extends|Transportations|msg|msgTag|Navigation|toMQttString|Header|messageId|MessageTag|sentTime|ModelUtil|token|setItem|setNothing|instanceof|setType|Date|writeUTF|unreadMessageCount|connect|topic|modelClone|_name|header|writeMessage|parameters|with|use|window|getMessageId|BinaryHelper|entity||||Can|MessageIdHandler|instantiate|instead|position|Qos|qos|reconnect|setUserId|255|latestMessage|pool|Type|fire|map|url|_events|onload|publicServiceId|appId|onreadystatechange|_TransportType|key|syncTime|String|messageUId|readTimeOut|slice|str|splice|WEBSOCKET|array|convertStream|getConversation|TypingStatusMessage|undefined|readyState|conversation|val|date|setStatus|test|init|getTime|_header|128|profile|setId|PublicServiceMap|nothing|SyncTimeQueue|parse|send|func|ConnectionStatus|LimitableMap|getData|TARGETID|info||removeItem|int64ToTimestamp|onReceived|delete|low|timestamp|ConversationMap|||timeout_|FeaturePatcher|CONVERSATIONTYPE|catch|execUpdateByParams|typearray|connected|global|decode|publicServiceProfile|messageType|TextMessage|operation|getType|dup|reconnectObj|switch|sentStatus|try|ProfileNotificationMessage|setName|MessageParams|_timeout|navi|XHR_POLLING|partial|UnknownMessage|getStatus|messageLength|apply|ConnectionState|retain|CONNACK|VoiceMessage|ContactNotificationMessage|CommandMessage|obj|DiscussionNotificationMessage|get|registerMessageType|InformationNotificationMessage|script|timeout|senderUserId|APP_PUBLIC_SERVICE|_cb|ImageMessage|module|src|ConnectionChannel|Message|LocalStorageProvider||localStorage|SentStatus|onerror|md5|StatusChanged|complete|sId|schemeType|onData|256|LocationMessage|replace|RichContentMessage|readByte|AND|imageUri|CommandNotificationMessage|eval|unshift|isClose|writeAndFlush|_ConnectionStatusListener|timeoutMillis|encodeURIComponent|setMessageId|getTopic|state|setSyncTime|sendMessage|listenerList|publicServiceMap|define|heartbeat|PublishMessage|PubAckMessage|MessageDirection|dataTime|schemeArrs|msgId|limit|parseInt|isAdd|AT_MOST_ONCE|syncMsg|AT_LEAST_ONCE|setTimeout|host|must|process|WHERE|getConversationList|ronghub|cookie|supportLargeStorage|SENTTIME|addConversation|Socket|removeConversation|setTime|T_MESSAGE_|com||registerMessageTypeMapping|T_CONVERSATION_|||getItemKey|CONTENT|pauseTimer|disconnectStatus|responseText|MESSAGEUID|filterMessages|createTransport|_|65535|charCodeAt|HandshakeMessage|SuspendMessage|join|remove|getServerEndpoint|RegExp|isXHR|The|was|_instance|queue|list|ConnAckMessage|QueryConMessage|setConversationToTop|getHistoryMessages|sdkVer|match|MESSAGE_LENGTH|head|onChanged|invoke|READ|concat|clearHeartbeat|code|FROM|_socket|exports|Client|ConversationNotificationStatus|otherDevice|DISCONNECTED|resumeTimer|getTimestamp|onClose|isCounted|receivedTime|isPersited|receivedStatus|setMessageReceivedStatus|can|ConnectMessage|appKey|writen|setMessageExtra|rx_escapable|poolLen|QueryAckMessage|setMessageSentStatus|QueryMessage|conversationTitle|getDate|from|keys|DELETE|Polling|messageDirection|fromCharCode|setTargetId|queryMessage|QNTKN_FILETYPE_ERROR|PingRespMessage|setListener|WebSocket|set|getTargetId|setInfo|DisconnectMessage|back|clearConversations|fromUserId|getTotalUnreadCount|SEND|groupId|readInt|addMessage|offset|SENT|appendChild|createElement|RegisterMessage|typeMapping|addEventListener|RC_CONN_PROTO_VERSION_ERROR|setDataTime|classname|messageParser|chatroomId|BlacklistStatus|default|isSyncRemoteConverList|isTop|getUnreadCount|getConversationUnreadCount|clearUnreadCount|Math|getSyncMsg|ArrayBuffer|PingReqMessage|executeSql|connectCallback|split|Callback|syncMsgMap|WEB_XHR_POLLING|cdn|SearchMpOutput|XMLHttpRequest|CONVER_REMOVE_ERROR|SUBSCRIBE_ERROR|clearMessages|TIMEOUT|valueOf|MessageInputStream|lastReadTime|TOKEN_INCORRECT|portraitUri|PUBLIC_SERVICE|getQos|websocket|setQos|clientId|DO_NOT_DISTURB|Unsupported|DISCUSSION|createConversation|ReceivedStatus|time|hasOwnProperty|sessionid|userInfoMapping|Function|AUDIO|VIDEO|UNKNOWN|IMAGE|hasWill|hasToken|hasAppId|CHARTOOM_JOIN_ERROR|GROUP_SYNC_ERROR|ChrmInput|getRequest|headerCode|KICKED_OFFLINE_BY_OTHER_CLIENT|GROUP_MATCH_ERROR|GroupOutput|currentURL|CHATROOM_HISMESSAGE_ERROR|GroupInput|CHATROOM_ID_ISNULL|setGroupInfo|writeChar|pottingPublicSearchType|onMessage|getBytesArray|updateMessages|500|BLACK_ADD_ERROR|NETWORK_UNAVAILABLE|BLACK_GETSTATUS_ERROR|_status|BLACK_REMOVE_ERROR|MessageType|1024|connectionStatus|200|setMpid|params|requestFactory|SearchMpInput|MPFollowOutput|DiscussionInviteStatus|MPFollowInput|ChrmOutput|path||clearTimeout|CONNECT|isGlobal|indexOf|mpid|userPortrait|userName|protocolId|protocolVersion|willTopic|will|UpStreamMessage|keepAlive|_onReceived|cleanSession|willQos|getHeaderFlag|GetQNupTokenOutput|srcElement|PullMpOutput|QueryBlackListOutput|keepLive|GetUserInfoOutput|CLOSED|deltaTime|GroupHashOutput|openStatus|downloadUrl|GetQNdownloadUrlOutput|deadline|decodeURIComponent|CreateDiscussionOutput|navUrl|ChannelInfoOutput|DISCONNECT|PINGREQ|clearItem|setCount|ChrmPullMsg|chrmPull|CST|flags|DownStreamMessages|In|userInf|UNACCEPTABLE_PROTOCOL_VERSION|apiVer|checkTransport|NOT_AUTHORIZED|expires|EXACTLY_ONCE|DEFAULT|BaseMessage|setData|setTimestamp|_ReceiveMessageListener|getContent|millisecond|putCallback|PINGRESP|PUBACK|getMessageUId|PUBLISH|getRemoteConversationList|Number|QUERYCON|introduction|QUERY|menu|charAt|getRemoteHistoryMessages|postion|RC_NET_UNAVAILABLE|setSessionId|Conversation|isUseDef|setTop|RECEIVE|messageIdPlus|notificationStatus|HTTP|GroupInfo|COOKIE_ENABLE||setClassname|setContent|Int8Array|darf_|CHATROOM|CUSTOMER_SERVICE|removeMessage|DRAF_GET_ERROR|isArray|FAILED|SENDING|subarray|buffer|ArrayFormInput|latestMessageId|ISTOP|typingContentType|duration|extension|NOT|targetUserId|longitude|poi|PublicServiceCommandMessage|menuItem|quote|ServerDataProvider|title|sourceUserId|MediaType|temp|DBUtil|RealTimeLocationStatus|SearchType|parameter|callee|RealTimeLocationErrorCode|execUpdate|getMessage|modleCreate|FileType|transaction|GROUP|HTTPS|LeaveChannelInput|isUseWebSQLProvider||JOIN_IN_DISCUSSION|updateMessage|addMemberToDiscussion|setOpenStatus|qryPMsg|RelationsInput|INVITE_DICUSSION|getDiscussion|CREATE_DISCUSSION|SYSTEM|PRIVATE|RC_SOCKET_NOT_CREATED|RC_REAL_TIME_LOCATION_STATUS_INCOMING|setDiscussionName|NOT_IN_DISCUSSION|quitChatRoom|setUserName|RC_DOMAIN_NOT_RESOLVE|total|FILE|QNTKN_GET_ERROR|handleMessage|CONVER_TOTAL_UNREAD_ERROR|CONVER_SETOP_ERROR|CONVER_GETLIST_ERROR|RC_REAL_TIME_LOCATION_STATUS_OUTGOING|CONVER_TYPE_UNREAD_ERROR|DRAF_REMOVE_ERROR|DRAF_SAVE_ERROR|pubMsg|CONVER_ID_TYPE_UNREAD_ERROR|ModifyPermissionInput|setDiscussionInviteStatus|readStatus|RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT|RC_REAL_TIME_LOCATION_IS_ON_GOING|removeMemberFromDiscussion|setConnectCallback|RC_REAL_TIME_LOCATION_JOIN_FAILURE|PullMpInput|RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE|RC_REAL_TIME_LOCATION_START_FAILURE|setUser|RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT|RC_REAL_TIME_LOCATION_GPS_DISABLED|RC_REAL_TIME_LOCATION_STATUS_IDLE|setUserPortrait|RC_REAL_TIME_LOCATION_NOT_INIT|publishMessage|RC_NAVI_RESOURCE_ERROR|RC_NODE_NOT_FOUND|sessionId|RC_REAL_TIME_LOCATION_SUCCESS|DownStreamMessage|ChannelEvictionInput|joinChatRoom|result|RC_CONN_NOT_AUTHRORIZED|RC_CONN_USER_OR_PASSWD_ERROR|userIds|syncGroup|RC_CONN_REDIRECTED|channelName|RC_CONN_PACKAGE_NAME_INVALID|adminUserId|channelId|firstTenUserIds|RC_CONN_SERVER_UNAVAILABLE|pottingProfile|RC_MSG_SEND_FAIL||RC_SOCKET_DISCONNECTED|RC_PONG_RECV_FAIL|QueryCallback|GroupHashInput|RC_CONN_ACK_TIMEOUT|RC_CONN_ID_REJECT||100|PublishCallback|mapping|setGroupHashCode|RC_CONN_APP_BLOCKED_OR_DELETED|RC_CONN_USER_BLOCKED|BIZ_ERROR_CONNECTING|MSG_ROAMING_SERVICE_UNAVAILABLE|BIZ_ERROR_RECONNECT_SUCCESS|BIZ_ERROR_NO_CHANNEL|page|RenameChannelInput|setNumber|FORBIDDEN_IN_GROUP|30000|RC_REAL_TIME_LOCATION_STATUS_CONNECTED|setTotal|NOT_IN_GROUP|BIZ_ERROR_INVALID_PARAMETER|RC_DISCONN_EXCEPTION|quitGroup|RC_DISCONN_KICK|setPage|RC_QUERY_ACK_NO_DATA|RC_MSG_DATA_INCOMPLETE|portraitUrl|BIZ_ERROR_DATABASE_ERROR|joinGroup|BIZ_ERROR_CLIENT_NOT_INIT|getElementsByTagName|hasModules|qnTkn|setSize|qnUrl|GET_USERINFO_ERROR|CONNECTED|hasMsg|UNSUBACK|SUBSCRIBE|SUBACK|UNSUBSCRIBE|CONNECTING||HistoryMessageInput|than||addToBlacklist|RelationsOutput|IN_BLACK_LIST|onOutOfQuota|NOT_IN_CHATROOM|pottingConversation|NOT_IN_BLACK_LIST|self|createServer|getTransport|count|HistoryMessagesOuput|QUERYACK|getBlacklist|GetQNupTokenInput|saveTextMessageDraft|NONE|getQnTkn|OPENED|RemoveFromBlackListInput|BlackListStatusInput|getBlacklistStatus|QueryBlackListInput|removeFromBlacklist|NOTIFY|sortConversationList|removeChild|parentNode|RCCallback|amd|setKey|CookieProvider|Add2BlackListInput|getTextMessageDraft|clearTextMessageDraft|GetQNdownloadUrlInput|_encode|ChannelInvitationInput|SERVER_UNAVAILABLE|REDIRECT|IDENTIFIER_REJECTED|setMsg|ACCEPTED|setList|RC_HTTP_SEND_FAIL|getPublicServiceProfile|APP_BLOCK_OR_DELETE|PACKAGE_ERROR|getPublicServiceList|DESTROYED|pulltime|EXACT|DOWNLOADED|LISTENED|ChannelInfoInput|FUZZY|RC_HTTP_RECV_FAIL|RC_HTTP_REQ_TIMEOUT|RC_PING_SEND_FAIL|RECEIVED|SEND_FREQUENCY_TOO_FAST|BLOCK|TOKEN_EXPIRE|sendLocalMessage|subscribePublicService|createDiscussion|CreateDiscussionInput|providerType|FORBIDDEN_IN_CHATROOM|getRemotePublicServiceList|512|setUsers|clearInterval|unsubscribePublicService|REJECTED_BY_BLACKLIST|RC_NET_CHANNEL_INVALID|callback|searchPublicService|setIsPullSend|DEVICE_ERROR||searchPublicServiceByType|setIspolling|realized|has|RC_MSG_RESP_TIMEOUT|SyncRequestMsg|quitDiscussion|NotifyMsg|attachEvent|interactive|RongIMLibDB|latitude|GET|setRequestHeader|open|doQueue|SocketTransportation|Please|loading|CREATE|POST|abort|EXISTS|isHasReceived|SET|UPDATE|IF|XDomainRequest|202|lost|TABLE|XmlHttpRequest|addEvent|meta|holder|patchForEach|toJSON|Discussion|isOpen|hasReceivedByOtherClient|error|isPolling|_in|load|readLong|memberIdList|creatorId|PublicServiceMultiRichContentMessage|Connection|RongIMStream|MessageOutputStream|PublicServiceRichContentMessage|the|patchAll|polling|toComplements|URL|NULL|PollingTransportation|This|INTO|firstKey|shift|toLowerCase|MESSAGETYPE|isDate|implement|you|LOCALMSG|abstract|execSearchByParams|updateConversation|Expression|DOMContentLoaded|http|random|clearMessageId|INSERT|incorrect|wrong|isNotPullMsg|index|inherited|class|ProfileNtf|ContactNtf|CmdNtf|DizNtf|CmdMsg|InfoNtf|LBSMsg|TxtMsg|ImgMsg|VcMsg|ImgTextMsg|TypSts|HistoryMsgType|item|rows|IsTypingStatusMessage|VALUES|removeLocalMessage|ID|publicServiceType|IN|conversavtionType|add|messages|senderUserName|server|setSyncMsg|1000|setTopic|ConnectAck|PublicServiceProfile|lengthSize|out|continue|hasFollowed|RetryableMessage|Release|msgLen|callBack|patchJSON|_host|_headerCode|body|timestrap|setDate|protobuf|UserInfo|CONNECT_HEADER_SIZE|retainWill|min|sJSON|__init|01|getUserId|00|getMessageTag|target|GetSessionIdInput|37001|37002|setDeadline|GetSessionIdOutput|36001|members|setToken|setMembers|GroupMembersOutput|GetUserInfoInput|36002|35001|35002|36003|execSearch|33006|groupInfo|INTEGER|33007|setBlockeeId|blockeeId|33005|33004|33002|sunMenuItems|PublicServiceMenuItem|setResult|33003|groupHashCode|22408|PRIMARY|37003|34004|34005|setDownloadUrl|34006|ContactOperationRequest|AUTOINCREMENT|setUserIds|34001|BlockPushInput|34002|KEY|34003|CONTACT_OPERATION_REQUEST|39001|setExtra|u0000|setPortraitUri|isConvStart|isMsgStart|MpInfo|caller|ispolling|setPushText|SELECT|isPullSend|instantiated|setIsweb|isweb|msgNum|initialized|cookieEnabled|navigator|https|onTokenIncorrect|16777215|ws|wss|sign|first|Call|location|protocol|converNum|pushText|setFromUserId|41002|MemberInfo|channels|setChannels|51001|ContactOperationAcceptResponse|setExtension|41001||ContactOperationRejectResponse||38002|38003|GroupMembersInput|RelationInfo|CONTACT_OPERATION_REJECT_RESPONSE|CONTACT_OPERATION_ACCEPT_RESPONSE|trasaction||setChannelName|setAdminUserId|setChannelId|users|||setGroupId|setMsgId|setFirstTenUserIds|ChannelInfosInput|StatusMessage|ChannelInfosOutput|0000|NotificationMessage|MessageContent|38001|31011|2054922799|1051523|1804603682|1873313359|30611744|1309151649|1560198380|1894986606|1700485571|995338651|530742520|198630844|1126891415|57434055|1416354905|145523070|1120210379|42063|mind|20604|Group|21407|21406|1990404162|unescape|343485551|718787259|909522486|1549556828|isLocalMessage|0123456789abcdef|421815835|40341101|1502002290|568446438|1019803690|187363961|1444681467|1163531501|405537848|1236535329|701558691|373897302|38016083|1069501632|165796510|660478335|51403784|1735328473||681279174|1094730640|358537222|722521979|640364487|76029189|155497632|1272893353|378558|1926607734|2022574463|1839030562|1530992060|35309556|21408|21409|31002|271733878|31003|31004|lastIndex|1732584194|31001|31000|30012|detachEvent|30013|command|30014|680876936|271733879|31005|643717713|setHasMsg|32001|latiude|32002|size|31010|openDatabase|1732584193|31006|31007|toUpperCase|31009|31008|30011|richContentMessages|1200080426|405|senderPortraitUri|30001|30002|setConnectionStatusListener|1473231341|45705983|1958414417|22406|23406|1770035416|23408|23407|30003|30004|30009|richContentMessage|1044525330|606105819|30010|389564586|30008|boolean|30005|isFinite|176418897|draft|30007|30006|33001|sendTextMessage|rmBlack|addBlack|pGrps|getBlack|blackStat|qryRelation|addRelation|joinChrm|queryChrm|rename|pdOpen|uGcmpr|destroyChrm|exitChrm|createChrm|delRelation|pullMp|removeEvent|have|224|messageid|100000|targetid|readTimestamp|substring|setConnectStatusListener|schMp|Parameter|format|supported|Channel|pmpMsgN|pmcMsgN|startRealTimeLocation|quitRealTimeLocation|joinRealTimeLocation|updateRealTimeLocationStatus|require|arraybuffer|closed|getRealTimeLocationParticipants|getRealTimeLocationCurrentState|console|getFileToken|getFileUrl|1006|getRealTimeLocation|addRealTimeLocationListener|binaryType|toUTCString|ppMsgP|evctDiz|pdMsgP|pgMsgP|pcMsgP|chatMsg|exitGrp|quitDiz|byteBuffer|Long|invtDiz|setOnReceiveMessageListener|joinGrp|dizInf|2048|floor|setDup|follow|MessageCallback|setRetained|isRetained|getLengthSize|toBytes|isDup|RCloud|MessageHandler|and|constructor|create|Id|cannot|loaded|cometnavi|CallbackMapping|GMT|setSentStatus|Thu|1970|Jan||toGMTString||rongSDK|9100|nav|111|254|Debug|119|most|characters|Received|deserializing|pullMsg|chatroom|but|No|support|pending|while|192|1000000|2047|setInterval|async|127|WebSQLDataProvider|please|chat|pg|ConnAskMessage|3600|long|sendUserId|pd|pp|setMessageUId|onReceiveMessageListener|s_ntf|65280|substr|s_msg|log|crDiz|FeatureDectector|pullmsg|sort|clear|insertMessage|u2060|u200f|u0604|u2028|u202f|to|high|ufeff|reverse|00000000|ufff0|u0600|u00ad|greater|u206f|sendStatusMessage|sendTypingStatusMessage|max|u200c|setConversationNotificationStatus|getNotificationQuietHours|removeNotificationQuietHours|setNotificationQuietHours|getConversationNotificationStatus||4680000|u070f|IS|receiveTime|checkStorageSize|qrySMsg|qryGMsg|Uint8Array|HistroyMessage|u17b4|u17b5|qryCMsg|u009f|equal|qryDMsg|less|Microsoft|XMLHTTP|multipart|clearMessagesUnreadStatus|getDeltaTime|getCurrentUserId|Url|Content|application|removeEventListener|deleteMessages|mcUnFollow|mpUnFollow|setFilterMessages|OtherDataProvider|getCurrentConnectionStatus|onmessage|now|onopen|logout|getConnectionChannel|u001f|u007f|getStorageProvider|close|onclose|direction|www|uffff|api|exist|403|withCredentials|calcUTF|ActiveXObject|uf000||uf700|hasRemoteUnreadMessages|4294967295|mpFollow|urlencoded|form|charset||mcFollow|400|234||utf".split("|"), 0, {}));
eval(function(a, b, c, d, e, f) {
  e = function(a) {
    return (a < b ? "" : e(parseInt(a / b))) + ((a = a % b) > 35 ? String.fromCharCode(a + 29) : a.toString(36))
  };
  if (!"".replace(/^/, String)) {
    while (c--) f[e(c)] = d[c] || e(c);
    d = [function(a) {
      return f[a]
    }];
    e = function() {
      return "\\w+"
    };
    c = 1
  }
  while (c--)
    if (d[c]) a = a.replace(new RegExp("\\b" + e(c) + "\\b", "g"), d[c]);
  return a
}('(9(b){i(b.r){8 c={6m:{4:"aF",5:"\\7m\\o",3:"\\2\\3O","bp":"-9y 0"},bj:{4:"4I",5:"\\4R\\5n\\5V\\o",3:"\\2\\3P","bp":"-6C 0"},6G:{4:"78",5:"\\7j\\3Q",3:"\\2\\3W","bp":"-83 0"},8g:{4:"8j",5:"\\8F\\o",3:"\\2\\1a","bp":"-9S 0"},ai:{4:"ay",5:"\\aA\\o",3:"\\2\\1b","bp":"-aR 0"},aS:{4:"b0",5:"\\bf\\bg",3:"\\2\\1j","bp":"-by 0"},bB:{4:"4C",5:"\\D\\4N",3:"\\2\\1v","bp":"-4Y 0"},55:{4:"59",5:"\\5m\\o",3:"\\2\\2d","bp":"-5w 0"},5B:{4:"5K",5:"\\5O\\5T",3:"\\2\\2k","bp":"-5W 0"},66:{4:"67",5:"\\6i\\D\\2r\\2s",3:"\\2\\3N","bp":"-71 0"},72:{4:"77",5:"\\y\\B\\p\\7n",3:"\\2\\3R","bp":"-7F 0"},7U:{4:"7Y",5:"\\3T",3:"\\2\\3V","bp":"0 -6"},8m:{4:"8o",5:"\\8z\\8A",3:"\\2\\3X","bp":"-6 -6"},8V:{4:"8Y",5:"\\9e\\9j",3:"\\2\\3Y","bp":"-3Z -6"},aa:{4:"ac",5:"\\41\\am\\44",3:"\\2\\45","bp":"-46 -6"},aG:{4:"aJ",5:"\\aM\\y\\aN",3:"\\2\\49","bp":"-4c -6"},aT:{4:"aZ",5:"\\4d\\4g",3:"\\2\\4k","bp":"-4l -6"},bl:{4:"bm",5:"\\4m",3:"\\2\\4n","bp":"-4o -6"},4D:{4:"4G",5:"\\4p\\4J",3:"\\2\\4r","bp":"-4s -6"},4T:{4:"4U",5:"\\4t\\4Z",3:"\\2\\T","bp":"-U -6"},5a:{4:"5d",5:"\\5e\\5k",3:"\\2\\V","bp":"-W -6"},5o:{4:"5q",5:"\\5r\\5v",3:"\\2\\X","bp":"-Y -6"},5C:{4:"5G",5:"\\5J\\3T",3:"\\2\\Z","bp":"-10 -6"},5P:{4:"5S",5:"\\11\\5U",3:"\\2\\12","bp":"-13 -6"},5Z:{4:"61",5:"\\11\\62",3:"\\2\\14","bp":"-15 -6"},6a:{4:"6b",5:"\\6c\\6h",3:"\\2\\16","bp":"-17 -6"},6q:{4:"6r",5:"\\6w\\6B",3:"\\2\\18","bp":"-19 -6"},6M:{4:"6R",5:"\\6W\\M\\x",3:"\\2\\1c","bp":"-1d -6"},7d:{4:"7i",5:"\\D\\1e",3:"\\2\\1f","bp":"-1g -6"},7s:{4:"7t",5:"\\7w\\x",3:"\\2\\1h","bp":"-1i -6"},7J:{4:"7O",5:"7P",3:"\\7\\1k","bp":"-1l 0"},88:{4:"8b",5:"\\z\\1n",3:"\\7\\1o","bp":"-1p 0"},8r:{4:"8w",5:"\\1q\\3Q",3:"\\7\\1r","bp":"-1s 0"},8J:{4:"8M",5:"\\8Q\\1t",3:"\\7\\1u","bp":"-10 0"},8Z:{4:"93",5:"\\94\\97\\98\\A",3:"\\7\\1w","bp":"-13 0"},9n:{4:"9r",5:"\\9u\\1n",3:"\\7\\1x","bp":"-15 0"},9D:{4:"9H",5:"\\9L\\9O",3:"\\7\\1y","bp":"0 0"},9T:{4:"9X",5:"\\a2\\a6",3:"\\2\\1z","bp":"-1A 0"},ad:{4:"ah",5:"\\4d\\4g",3:"\\2\\1B","bp":"-1C 0"},ao:{4:"ar",5:"\\av\\ax",3:"\\2\\1D","bp":"-1E 0"},aB:{4:"aD",5:"aE",3:"\\2\\1F","bp":"-1G 0"},aH:{4:"aI",5:"\\1H\\aL",3:"\\2\\1I","bp":"-1J 0"},aO:{4:"aP",5:"\\aQ\\1K",3:"\\2\\1L","bp":"-1M 0"},aU:{4:"aV",5:"\\aW\\aY",3:"\\2\\1N","bp":"-1O 0"},b4:{4:"ba",5:"\\bb\\be",3:"\\2\\1P","bp":"-1Q 0"},bh:{4:"bi",5:"\\M\\1R",3:"\\2\\1S","bp":"-1T 0"},bn:{4:"bo",5:"\\bq\\1q\\bt",3:"\\2\\1U","bp":"-1V 0"},bF:{4:"bG",5:"\\4A\\4B",3:"\\2\\1W","bp":"-1X -6"},4E:{4:"4F",5:"\\1Y\\4H",3:"\\2\\1Z","bp":"-20 -6"},4K:{4:"4L",5:"\\4M",3:"\\7\\21","bp":"-6 0"},4O:{4:"4P",5:"\\4Q\\22\\4S",3:"\\7\\23","bp":"-24 0"},4V:{4:"4W",5:"\\4X",3:"\\7\\25","bp":"-26 0"},50:{4:"51",5:"\\52\\53\\54",3:"\\7\\27","bp":"-4l 0"},56:{4:"57",5:"\\58\\28",3:"\\7\\29","bp":"-4s 0"},5b:{4:"5c",5:"\\2a",3:"\\2\\2b","bp":"-1g 0"},5f:{4:"5g",5:"\\5h\\5i\\5j",3:"\\2\\2c","bp":"-1i 0"},5l:{4:"1",5:"1",3:"\\2\\2e","bp":"-2f 0"},5p:{4:"-1",5:"-1",3:"\\2\\2g","bp":"-2h 0"},5s:{4:"5t",5:"\\5u",3:"\\2\\2i","bp":"-2j 0"},5x:{4:"5y",5:"\\5z\\5A",3:"\\2\\4z","bp":"-2l 0"},5D:{4:"5E",5:"\\2s\\5F",3:"\\2\\2m","bp":"-1X 0"},5H:{4:"5I",5:"\\2n",3:"\\2\\2o","bp":"-20 0"},5L:{4:"5M",5:"\\5N\\4p",3:"\\2\\2p","bp":"-2q 0"},5Q:{4:"5R",5:"\\bJ\\K\\2t",3:"\\2\\2u","bp":"-2v 0"},5X:{4:"5Y",5:"\\2w\\60",3:"\\2\\2x","bp":"-2y 0"},63:{4:"64",5:"\\65",3:"\\2\\2z","bp":"-2A 0"},68:{4:"69",5:"\\2B",3:"\\2\\2C","bp":"-2D 0"},6d:{4:"6e",5:"\\6f\\6g",3:"\\2\\2E","bp":"-2F 0"},6j:{4:"6k",5:"\\6l",3:"\\2\\2G","bp":"-6n 0"},6o:{4:"6p",5:"\\B\\2H",3:"\\2\\2I","bp":"-6s 0"},6t:{4:"6u",5:"\\6v",3:"\\2\\2J","bp":"-6x 0"},6y:{4:"6z",5:"\\6A\\2K",3:"\\2\\2L","bp":"-6D 0"},6E:{4:"6F",5:"\\z\\z",3:"\\2\\2M","bp":"-6H 0"},6I:{4:"6J",5:"\\6K\\6L",3:"\\2\\2N","bp":"-6N 0"},6O:{4:"6P",5:"\\6Q\\o",3:"\\2\\2O","bp":"-6S 0"},6T:{4:"6U",5:"\\6V\\2B",3:"\\2\\2P","bp":"-24 -6"},6X:{4:"6Y",5:"\\6Z\\70",3:"\\2\\2Q","bp":"-2R -6"},73:{4:"74",5:"\\2w\\75\\76",3:"\\2\\2S","bp":"-2T -6"},79:{4:"7a",5:"\\7b\\7c\\44",3:"\\2\\2U","bp":"-26 -6"},7e:{4:"7f",5:"\\7g\\7h",3:"\\2\\2V","bp":"-2W -6"},7k:{4:"7l",5:"\\41",3:"\\2\\2X","bp":"-2Y -6"},7o:{4:"7p",5:"\\7q\\7r",3:"\\2\\2Z","bp":"-30 -6"},7u:{4:"7v",5:"\\2n\\B",3:"\\2\\31","bp":"-1l -6"},7x:{4:"7y",5:"\\4m\\7z",3:"\\2\\32","bp":"-1p -6"},7B:{4:"7C",5:"\\7D\\7E",3:"\\2\\33","bp":"-1s -6"},7G:{4:"7H",5:"\\p\\7I\\1R",3:"\\2\\34","bp":"-2j -6"},7K:{4:"7L",5:"\\7M\\7N",3:"\\2\\35","bp":"-36 -6"},7Q:{4:"7R",5:"\\7S\\7T",3:"\\7\\37","bp":"-3Z 0"},7V:{4:"7W",5:"\\7X",3:"\\7\\38","bp":"-46 0"},7Z:{4:"80",5:"\\81\\82",3:"\\7\\39","bp":"-4c 0"},84:{4:"85",5:"\\86\\87",3:"\\7\\3a","bp":"-2R 0"},89:{4:"8a",5:"\\1K",3:"\\7\\3b","bp":"-2T 0"},8c:{4:"8d",5:"\\8e\\8f\\1Y",3:"\\7\\3c","bp":"-2W 0"},8h:{4:"8i",5:"\\28",3:"\\7\\3d","bp":"-4o 0"},8k:{4:"8l",5:"\\3e\\8n",3:"\\7\\3f","bp":"-U 0"},8p:{4:"8q",5:"\\4t\\22",3:"\\7\\3g","bp":"-W 0"},8s:{4:"8t",5:"\\8u\\8v",3:"\\7\\3h","bp":"-Y 0"},8x:{4:"8y",5:"\\3e\\3i",3:"\\7\\3j","bp":"-2Y 0"},8B:{4:"8C",5:"\\8D\\8E",3:"\\7\\3k","bp":"-30 0"},8G:{4:"8H",5:"\\8I",3:"\\2\\3l","bp":"-17 0"},8K:{4:"8L",5:"\\1H",3:"\\2\\3m","bp":"-19 0"},8N:{4:"8O",5:"\\8P",3:"\\2\\3n","bp":"-1d 0"},8R:{4:"8S",5:"\\8T\\8U",3:"\\2\\3o","bp":"-36 0"},8W:{4:"8X",5:"\\1e\\2H",3:"\\2\\3p","bp":"-3q 0"},90:{4:"91",5:"\\92\\2K",3:"\\2\\3r","bp":"-3s 0"},95:{4:"96",5:"\\3t\\x",3:"\\2\\3u","bp":"-99 0"},9a:{4:"9b",5:"\\9c\\9d",3:"\\2\\3v","bp":"-9f 0"},9g:{4:"9h",5:"\\p\\9i",3:"\\2\\3w","bp":"-2f -6"},9k:{4:"9l",5:"\\p\\9m",3:"\\2\\3x","bp":"-2h -6"},9o:{4:"9p",5:"\\3t\\9q",3:"\\2\\3y","bp":"-2l -6"},9s:{4:"9t",5:"\\K\\K",3:"\\3z","bp":"-1V -6"},9v:{4:"9w",5:"\\9x\\2r",3:"\\3A","bp":"-2q -6"},9z:{4:"9A",5:"\\9B\\9C",3:"\\3B","bp":"-2v -6"},9E:{4:"9F",5:"\\9G\\M",3:"\\3C","bp":"-1A -6"},9I:{4:"9J",5:"\\9K\\1t",3:"\\3D","bp":"-1C -6"},9M:{4:"9N",5:"\\A\\2t",3:"\\3E","bp":"-1E -6"},9P:{4:"9Q",5:"\\9R\\3F",3:"\\3G","bp":"-1G -6"},9U:{4:"9V",5:"\\9W\\y",3:"\\3H","bp":"-2F -6"},9Y:{4:"9Z",5:"\\a0\\a1",3:"\\3I","bp":"-3s -6"},a3:{4:"a4",5:"\\2a\\a5",3:"\\3J","bp":"-1J -6"},a7:{4:"a8",5:"\\a9",3:"\\3K","bp":"-1M -6"},ab:{4:"v",5:"v ",3:"\\3L","bp":"-1O -6"},ae:{4:"af",5:"\\ag",3:"\\3M","bp":"-1Q -6"},L:{4:"aj",5:"\\ak\\al",3:"\\L","bp":"-2y -6"},S:{4:"an",5:"\\3F",3:"\\S","bp":"-3q -6"},N:{4:"ap",5:"\\aq",3:"\\N","bp":"-2A -6"},P:{4:"as",5:"\\at\\au",3:"\\P","bp":"-2D -6"},w:{4:"aw",5:"\\A\\3i",3:"\\w","bp":"-1T -6"}};9 3S(){8 b=m.az("3U")[0]||m.s("3U");i(m.aC){g=9(a){8 e=m.s("b");e.l.40=\'t\';e.l.42=\'t\';e.l.aK=\'43(E://F.G.47.48/H-4a.4b)\';e.l.I=\'J\';e.l.I=\'J-4e\';e.l.aX=\'1\';e.l.4f=a;j e}}4h{8 c=m.s("l");c.b1="b2/H";c.b3=".4i {40:t;42:t;b5-b6:43(E://F.G.47.48/H-4a.4b);I:J-4e}";b.b7(c)}}8 g=9(a){8 e=m.s("b");e.b8="4i";e.l.4f=a;j e};b.r.b9=4j 9(){3S();8 e=n;n.bc=9(a,b){i(0<a&&-1<b&&bd>a+b){8 h=[],d=0,f;O(f q c){i(d>=b+a)4q;i(d>=b){8 e=g(c[f]["bp"]);h.bk({Q:c[f].4,R:c[f].5,C:e,3:c[f].3})}d++}j h}4u 4v("br bs");};n.4w=9(a){i(a q c){8 b=g(c[a]["bp"]);j{Q:c[a].4,R:c[a].5,C:b,3:c[a].3}}};n.bu=9(d){i(bv<d.bw(0)){8 b=c[bx(d).4x("%u","bz")];i(b)j b.3}j d};n.bA=9(a){O(8 b q c){i(c[b].4==a||c[b].5==a){8 e=g(c[b]["bp"]);j{C:e,Q:c[b].4,R:c[b].5,3:c[b].3}}}j{}};8 k=/(\\2\\3O|\\2\\3P|\\2\\3W|\\2\\1a|\\2\\1b|\\2\\1j|\\2\\1v|\\2\\2d|\\2\\2k|\\2\\3N|\\2\\3R|\\2\\3V|\\2\\3X|\\2\\3Y|\\2\\45|\\2\\49|\\2\\4k|\\2\\4n|\\2\\4r|\\2\\T|\\2\\V|\\2\\X|\\2\\Z|\\2\\12|\\2\\14|\\2\\16|\\2\\18|\\2\\1c|\\2\\1f|\\2\\1h|\\7\\1k|\\7\\1o|\\7\\1r|\\7\\1u|\\7\\1w|\\7\\1x|\\7\\1y|\\2\\1z|\\2\\1B|\\2\\1D|\\2\\1F|\\2\\1I|\\2\\1L|\\2\\1N|\\2\\1P|\\2\\1S|\\2\\1U|\\2\\1W|\\2\\1Z|\\7\\21|\\7\\23|\\7\\25|\\7\\27|\\7\\29|\\2\\2b|\\2\\2c|\\2\\2e|\\2\\2g|\\2\\2i|\\2\\4z|\\2\\2m|\\2\\2o|\\2\\2p|\\2\\2u|\\2\\2x|\\2\\2z|\\2\\2C|\\2\\2E|\\2\\2G|\\2\\2I|\\2\\2J|\\2\\2L|\\2\\2M|\\2\\2N|\\2\\2O|\\2\\2P|\\2\\2Q|\\2\\2S|\\2\\2U|\\2\\2V|\\2\\2X|\\2\\2Z|\\2\\31|\\2\\32|\\2\\33|\\2\\34|\\2\\35|\\7\\37|\\7\\38|\\7\\39|\\7\\3a|\\7\\3b|\\7\\3c|\\7\\3d|\\7\\3f|\\7\\3g|\\7\\3h|\\7\\3j|\\7\\3k|\\2\\3l|\\2\\3m|\\2\\3n|\\2\\3o|\\2\\3p|\\2\\3r|\\2\\3u|\\2\\3v|\\2\\3w|\\2\\3x|\\2\\3y|\\3z|\\3A|\\3B|\\3C|\\3D|\\3E|\\3G|\\3H|\\3I|\\3J|\\3K|\\3L|\\3M|\\L|\\S|\\N|\\P|\\w)/g;n.bC=9(a,b){j a.4x(k,9(a){8 d;a:{O(d q c)i(c[d].3==a)4q a;d=a}j d!=a?b(e.4w(d)):a})}}}4h{4u 4j 4v("bD bE r.4y.1m,E://F.G.bH.bI/r.4y.1m")}})(7A);', 62, 728, "||ud83d|tag|en|zh|27px|ud83c|var|function|||||||||if|return||style|document|this|u7b11|u4e0d|in|RongIMClient|createElement|22px|||u2744|u4e86|u4e00|u8272|u96ea|u8138|img|u65e0|http|res|websdk|css|display|inline|u661f|u2600|u7535|u2614|for|u2615|englishName|chineseName|u2601|ude24|351px|ude28|378px|ude29|405px|ude30|567px|u60ca|ude31|594px|ude32|621px|ude33|648px|ude34|675px|ude03|ude05|ude35|702px|u53e3|ude36|729px|ude37|756px|ude06|udfa4|486px|js|u5b50|udfb2|513px|u97f3|udfb5|540px|u7403|udfc0|ude07|udfc2|udfe1|udc04|udca1|1188px|udca2|1215px|udca3|1242px|udca4|1269px|u72d7|udca9|1296px|u8089|udcaa|1323px|udcb0|1350px|udcda|1377px|u8bdd|udcde|1404px|udce2|1431px|udeab|918px|u6dcb|udebf|945px|udf0f|u65e5|udf3b|135px|udf5a|216px|udf6b|u9152|udf7b|u62f3|udc4a|udc4c|ude08|udc4d|783px|udc4e|810px|udc4f|837px|ude09|891px|udc6b|u9b3c|udc7b|udc7c|972px|u8868|u60c5|u4eba|udc7d|999px|u6076|udc7f|1026px|udc8a|1080px|u543b|udc8b|1107px|udc8d|1134px|udd2b|u7ea2|ude0a|ude0b|u5fc3|ude0c|ude0d|ude0e|ude0f|ude1a|ude1c|162px|ude1d|189px|ude1e|ude1f|243px|ude2a|432px|ude2b|459px|ude2c|ude2d|ude2f|ude4a|ude4f|864px|udf19|udf32|udf39|udf49|udf56|udf66|udf77|u793c|udf81|udf82|udf84|u82b1|udf89|udf93|udc34|udc36|udc37|udc51|udc84|1053px|udc94|1161px|u706b|udd25|udd56|ude48|ude49|ude80|u2b50|u23f0|u23f3|u26a1|u26bd|u26c4|u4e91|u26c5|u261d|u263a|u270a|u270b|u270c|u270f|ude11|ude00|ude01|u4e50|ude12|initCss|u6c57|head|ude13|ude02|ude14|ude15|54px|width|u56f0|height|url|u7684|ude16|81px|rongcloud|cn|ude18|sprite_bg|png|108px|u6124|block|backgroundPosition|u6012|else|RC_Expression|new|ude21|270px|u54ed|ude22|297px|u4f7f|break|ude23|324px|u751f|throw|Error|getEmojiByContent|replace|min|udc6a|u505c|u6b62|innocent|u1F623|u1F6BF|shower|persevere|u6d74|grin|u52b2|u1F30F|earth_asia|u571f|u8f9c|u1F33B|sunflower|u5411|u9732|u8475|u1F624|triumph|u1F35A|rice|u996d|1701px|u6c14|u1F36B|chocolate_bar|u5de7|u514b|u529b|u1F608|u1F37B|beers|u5564|smiling_imp|u1F628|u1F44A|punch|fearful|u53ef|u1F44C|ok_hand|u6ca1|u95ee|u9898|u6015|u1F44D|u574f|u9f7f|u1F629|u1F44E|weary|u538c|u1F44F|clap|u62cd|u5026|1728px|u1F46A|family|u5bb6|u5ead|u1F609|u1F630|u1F46B|couple|u4fa3|cold_sweat|u1F47B|ghost|u51b7|wink|u1F47C|angel|u5929|u7728|u1F631|u1F47D|alien|scream|u773c|u53eb|u800c|1755px|u1F47F|imp|u1F632|u9b54|astonished|u8bb6|u1F48A|pill|u836f|u1F611|expressionless|u1F48B|kiss|u1F633|flushed|u5446|u1F48D|ring|u6212|u6307|u4f4f|u9762|u1F52B|gun|u67aa|u1F600|1485px|u1F60A|blush|u1F634|sleeping|1782px|u1F60B|yum|u998b|u7761|1809px|u1F60C|relieved|u5b89|u7720|1566px|1836px|u1F60D|heart_eyes|u1F602|1863px|u1F60E|sunglasses|u58a8|u955c|u1F635|1890px|u1F60F|smirk|u50bb|dizzy_face|1917px|u1F61A|kissing_closed_eyes|u63a5|u65ad|u1F61C|stuck_out_tongue_winking_eye|u641e|u602a|1944px|u1F612|u1F61D|stuck_out_tongue_closed_eyes|u4f5c|u5267|unamused|joy|u1F61E|disappointed|u5931|u671b|u1F636|u1F61F|anguished|u82e6|u6da9|no_mouth|u6b22|u1F62A|sleepy|u72de|u5feb|u1F62B|tired_face|u6293|u72c2|u1F637|mask|u1F62C|grimacing|u75c5|u1F62D|sob|u6ce3|window|u1F62F|hushed|u5bc2|u9759|1971px|u1F64A|speak_no_evil|u8bf4|u1F3A4|u1F64F|pray|u7948|u7977|microphone|KTV|u1F319|moon|u6708|u4eae|u1F613|u1F332|evergreen_tree|u6811|sweat|u1F339|rose|u73ab|u7470|1593px|u1F349|watermelon|u897f|u74dc|u1F3B2|u1F356|meat_on_bone|game_die|u1F366|icecream|u51b0|u6dc7|u1F603|u1F377|wine_glass|smile|u1F381|gift|u1F614|u7269|pensive|u1F382|birthday|u1F3B5|u1F384|christmas_tree|u5723|u8bde|musical_note|u1F389|tada|u54c0|u601d|u1F393|mortar_board|u6bd5|u4e1a|u5fae|u1F434|horse|u9a6c|u1F3C0|u1F436|dog|basketball|u1F437|pig|u732a|u7bee|u1F451|crown|u738b|u51a0|u1F615|u1F484|lipstick|confused|u1F3C2|u1F494|broken_heart|u4f24|snowboarder|u5355|u1F525|fire|u677f|u6ed1|1458px|u1F556|time|u65f6|u95f4|u8ff7|1512px|u1F648|see_no_evil|u770b|u832b|u1F649|hear_no_evil|u542c|u1F3E1|u1F680|rocket|u7bad|house_with_garden|u2B50|star|u623f|u23F0|alarm_clock|u949f|1539px|u23F3|hourglass_flowing_sand|u6c99|u6f0f|u1F004|u26A1|zap|u95ea|mahjong|u26BD|soccer|u8db3|u9ebb|u26C4|snowman|u5c06|u26C5|partly_sunny|u591a|1620px|u1F4A1|u261D|point_up|u7b2c|bulb|u263A|relaxed|u8f7b|u677e|u706f|u270A|fist|u5934|u6ce1|u270B|hand|u624b|u1F616|u270C|confounded|u1F4A2|u270F|pencil2|u7b14|anger|u1F605|sunny|u6674|u6717|u60d1|cloud|u1F4A3|umbrella|u4f1e|bomb|coffee|u5496|u5561|u70b8|snowflake|u5f39|sweat_smile|getElementsByTagName|u8d54|u1F4A4|createStyleSheet|zzz|ZZZ|grinning|u1F618|u1F4A9|shit|kissing_heart|backgroundImage|u5c41|u4eb2|u4e2a|u1F4AA|muscle|u808c|1647px|u1F606|u1F621|u1F4B0|moneybag|u94b1|zoom|u888b|rage|satisfied|type|text|innerHTML|u1F4DA|background|image|appendChild|className|Expression|books|u4e66|getAllExpression|129|u7c4d|u6ee1|u610f|u1F4DE|telephone_receiver|u1F601|push|u1F622|cry|u1F4E2|loudspeaker||u6269|Wrong|parameter|u5668|calcUTF|61440|charCodeAt|escape|1674px|u1|getEmojiObjByEnglishNameOrChineseName|u1F607|retrievalEmoji|Please|load|u1F6AB|stop|rong|io|u5916".split("|"), 0, {}));
(function() {
  "use strict";

  function a(a) {
    return typeof a === "function" || typeof a === "object" && a !== null
  }

  function b(a) {
    return typeof a === "function"
  }

  function c(a) {
    return typeof a === "object" && a !== null
  }
  var d;
  if (!Array.isArray) {
    d = function(a) {
      return Object.prototype.toString.call(a) === "[object Array]"
    }
  } else {
    d = Array.isArray
  }
  var e = d;
  var f = Date.now || function() {
    return (new Date).getTime()
  };

  function g() {}
  var h = Object.create || function(a) {
    if (arguments.length > 1) {
      throw new Error("Second argument not supported")
    }
    if (typeof a !== "object") {
      throw new TypeError("Argument must be an object")
    }
    g.prototype = a;
    return new g
  };

  function i(a, b) {
    for (var c = 0, d = a.length; c < d; c++) {
      if (a[c] === b) {
        return c
      }
    }
    return -1
  }

  function j(a) {
    var b = a._promiseCallbacks;
    if (!b) {
      b = a._promiseCallbacks = {}
    }
    return b
  }
  var k = {
    mixin: function(a) {
      a["on"] = this["on"];
      a["off"] = this["off"];
      a["trigger"] = this["trigger"];
      a._promiseCallbacks = undefined;
      return a
    },
    on: function(a, b) {
      if (typeof b !== "function") {
        throw new TypeError("Callback must be a function")
      }
      var c = j(this),
        d;
      d = c[a];
      if (!d) {
        d = c[a] = []
      }
      if (i(d, b) === -1) {
        d.push(b)
      }
    },
    off: function(a, b) {
      var c = j(this),
        d, e;
      if (!b) {
        c[a] = [];
        return
      }
      d = c[a];
      e = i(d, b);
      if (e !== -1) {
        d.splice(e, 1)
      }
    },
    trigger: function(a, b, c) {
      var d = j(this),
        e, f;
      if (e = d[a]) {
        for (var g = 0; g < e.length; g++) {
          f = e[g];
          f(b, c)
        }
      }
    }
  };
  var l = {
    instrument: false
  };
  k["mixin"](l);

  function m(a, b) {
    if (a === "onerror") {
      l["on"]("error", b);
      return
    }
    if (arguments.length === 2) {
      l[a] = b
    } else {
      return l[a]
    }
  }
  var n = [];

  function o() {
    setTimeout(function() {
      var a;
      for (var b = 0; b < n.length; b++) {
        a = n[b];
        var c = a.payload;
        c.guid = c.key + c.id;
        c.childGuid = c.key + c.childId;
        if (c.error) {
          c.stack = c.error.stack
        }
        l["trigger"](a.name, a.payload)
      }
      n.length = 0
    }, 50)
  }

  function p(a, b, c) {
    if (1 === n.push({
        name: a,
        payload: {
          key: b._guidKey,
          id: b._id,
          eventName: a,
          detail: b._result,
          childId: c && c._id,
          label: b._label,
          timeStamp: f(),
          error: l["instrument-with-stack"] ? new Error(b._label) : null
        }
      })) {
      o()
    }
  }
  var q = p;

  function r() {
    return new TypeError("A promises callback cannot return that same promise.")
  }

  function s() {}
  var t = void 0;
  var u = 1;
  var v = 2;
  var w = new I;

  function x(a) {
    try {
      return a.then
    } catch (a) {
      w.error = a;
      return w
    }
  }

  function y(a, b, c, d) {
    try {
      a.call(b, c, d)
    } catch (a) {
      return a
    }
  }

  function z(a, b, c) {
    l.async(function(a) {
      var d = false;
      var e = y(c, b, function(c) {
        if (d) {
          return
        }
        d = true;
        if (b !== c) {
          C(a, c)
        } else {
          E(a, c)
        }
      }, function(b) {
        if (d) {
          return
        }
        d = true;
        F(a, b)
      }, "Settle: " + (a._label || " unknown promise"));
      if (!d && e) {
        d = true;
        F(a, e)
      }
    }, a)
  }

  function A(a, b) {
    if (b._state === u) {
      E(a, b._result)
    } else if (b._state === v) {
      b._onError = null;
      F(a, b._result)
    } else {
      G(b, undefined, function(c) {
        if (b !== c) {
          C(a, c)
        } else {
          E(a, c)
        }
      }, function(b) {
        F(a, b)
      })
    }
  }

  function B(a, c) {
    if (c.constructor === a.constructor) {
      A(a, c)
    } else {
      var d = x(c);
      if (d === w) {
        F(a, w.error)
      } else if (d === undefined) {
        E(a, c)
      } else if (b(d)) {
        z(a, c, d)
      } else {
        E(a, c)
      }
    }
  }

  function C(b, c) {
    if (b === c) {
      E(b, c)
    } else if (a(c)) {
      B(b, c)
    } else {
      E(b, c)
    }
  }

  function D(a) {
    if (a._onError) {
      a._onError(a._result)
    }
    H(a)
  }

  function E(a, b) {
    if (a._state !== t) {
      return
    }
    a._result = b;
    a._state = u;
    if (a._subscribers.length === 0) {
      if (l.instrument) {
        q("fulfilled", a)
      }
    } else {
      l.async(H, a)
    }
  }

  function F(a, b) {
    if (a._state !== t) {
      return
    }
    a._state = v;
    a._result = b;
    l.async(D, a)
  }

  function G(a, b, c, d) {
    var e = a._subscribers;
    var f = e.length;
    a._onError = null;
    e[f] = b;
    e[f + u] = c;
    e[f + v] = d;
    if (f === 0 && a._state) {
      l.async(H, a)
    }
  }

  function H(a) {
    var b = a._subscribers;
    var c = a._state;
    if (l.instrument) {
      q(c === u ? "fulfilled" : "rejected", a)
    }
    if (b.length === 0) {
      return
    }
    var d, e, f = a._result;
    for (var g = 0; g < b.length; g += 3) {
      d = b[g];
      e = b[g + c];
      if (d) {
        L(c, d, e, f)
      } else {
        e(f)
      }
    }
    a._subscribers.length = 0
  }

  function I() {
    this.error = null
  }
  var J = new I;

  function K(a, b) {
    try {
      return a(b)
    } catch (a) {
      J.error = a;
      return J
    }
  }

  function L(a, c, d, e) {
    var f = b(d),
      g, h, i, j;
    if (f) {
      g = K(d, e);
      if (g === J) {
        j = true;
        h = g.error;
        g = null
      } else {
        i = true
      }
      if (c === g) {
        F(c, r());
        return
      }
    } else {
      g = e;
      i = true
    }
    if (c._state !== t) {} else if (f && i) {
      C(c, g)
    } else if (j) {
      F(c, h)
    } else if (a === u) {
      E(c, g)
    } else if (a === v) {
      F(c, g)
    }
  }

  function M(a, b) {
    var c = false;
    try {
      b(function b(d) {
        if (c) {
          return
        }
        c = true;
        C(a, d)
      }, function b(d) {
        if (c) {
          return
        }
        c = true;
        F(a, d)
      })
    } catch (b) {
      F(a, b)
    }
  }

  function N(a, b, c) {
    if (a === u) {
      return {
        state: "fulfilled",
        value: c
      }
    } else {
      return {
        state: "rejected",
        reason: c
      }
    }
  }

  function O(a, b, c, d) {
    var e = this;
    e._instanceConstructor = a;
    e.promise = new a(s, d);
    e._abortOnReject = c;
    if (e._validateInput(b)) {
      e._input = b;
      e.length = b.length;
      e._remaining = b.length;
      e._init();
      if (e.length === 0) {
        E(e.promise, e._result)
      } else {
        e.length = e.length || 0;
        e._enumerate();
        if (e._remaining === 0) {
          E(e.promise, e._result)
        }
      }
    } else {
      F(e.promise, e._validationError())
    }
  }
  var P = O;
  O.prototype._validateInput = function(a) {
    return e(a)
  };
  O.prototype._validationError = function() {
    return new Error("Array Methods must be provided an Array")
  };
  O.prototype._init = function() {
    this._result = new Array(this.length)
  };
  O.prototype._enumerate = function() {
    var a = this;
    var b = a.length;
    var c = a.promise;
    var d = a._input;
    for (var e = 0; c._state === t && e < b; e++) {
      a._eachEntry(d[e], e)
    }
  };
  O.prototype._eachEntry = function(a, b) {
    var d = this;
    var e = d._instanceConstructor;
    if (c(a)) {
      if (a.constructor === e && a._state !== t) {
        a._onError = null;
        d._settledAt(a._state, b, a._result)
      } else {
        d._willSettleAt(e.resolve(a), b)
      }
    } else {
      d._remaining--;
      d._result[b] = d._makeResult(u, b, a)
    }
  };
  O.prototype._settledAt = function(a, b, c) {
    var d = this;
    var e = d.promise;
    if (e._state === t) {
      d._remaining--;
      if (d._abortOnReject && a === v) {
        F(e, c)
      } else {
        d._result[b] = d._makeResult(a, b, c)
      }
    }
    if (d._remaining === 0) {
      E(e, d._result)
    }
  };
  O.prototype._makeResult = function(a, b, c) {
    return c
  };
  O.prototype._willSettleAt = function(a, b) {
    var c = this;
    G(a, undefined, function(a) {
      c._settledAt(u, b, a)
    }, function(a) {
      c._settledAt(v, b, a)
    })
  };

  function Q(a, b) {
    return new P(this, a, true, b).promise
  }
  var R = Q;

  function S(a, b) {
    var c = this;
    var d = new c(s, b);
    if (!e(a)) {
      F(d, new TypeError("You must pass an array to race."));
      return d
    }
    var f = a.length;

    function g(a) {
      C(d, a)
    }

    function h(a) {
      F(d, a)
    }
    for (var i = 0; d._state === t && i < f; i++) {
      G(c.resolve(a[i]), undefined, g, h)
    }
    return d
  }
  var T = S;

  function U(a, b) {
    var c = this;
    if (a && typeof a === "object" && a.constructor === c) {
      return a
    }
    var d = new c(s, b);
    C(d, a);
    return d
  }
  var V = U;

  function W(a, b) {
    var c = this;
    var d = new c(s, b);
    F(d, a);
    return d
  }
  var X = W;
  var Y = "rsvp_" + f() + "-";
  var Z = 0;

  function $() {
    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
  }

  function _() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
  }

  function aa(a, c) {
    var d = this;
    d._id = Z++;
    d._label = c;
    d._state = undefined;
    d._result = undefined;
    d._subscribers = [];
    if (l.instrument) {
      q("created", d)
    }
    if (s !== a) {
      if (!b(a)) {
        $()
      }
      if (!(d instanceof aa)) {
        _()
      }
      M(d, a)
    }
  }
  var ba = aa;
  aa.cast = V;
  aa.all = R;
  aa.race = T;
  aa.resolve = V;
  aa.reject = X;
  aa.prototype = {
    constructor: aa,
    _guidKey: Y,
    _onError: function(a) {
      var b = this;
      l.after(function() {
        if (b._onError) {
          l["trigger"]("error", a, b._label)
        }
      })
    },
    then: function(a, b, c) {
      var d = this;
      var e = d._state;
      if (e === u && !a || e === v && !b) {
        if (l.instrument) {
          q("chained", d, d)
        }
        return d
      }
      d._onError = null;
      var f = new d.constructor(s, c);
      var g = d._result;
      if (l.instrument) {
        q("chained", d, f)
      }
      if (e) {
        var h = arguments[e - 1];
        l.async(function() {
          L(e, f, h, g)
        })
      } else {
        G(d, f, a, b)
      }
      return f
    },
    catch: function(a, b) {
      return this.then(undefined, a, b)
    },
    finally: function(a, b) {
      var c = this;
      var d = c.constructor;
      return c.then(function(b) {
        return d.resolve(a()).then(function() {
          return b
        })
      }, function(b) {
        return d.resolve(a()).then(function() {
          throw b
        })
      }, b)
    }
  };

  function ca(a, b, c) {
    this._superConstructor(a, b, false, c)
  }
  ca.prototype = h(P.prototype);
  ca.prototype._superConstructor = P;
  ca.prototype._makeResult = N;
  ca.prototype._validationError = function() {
    return new Error("allSettled must be called with an array")
  };

  function da(a, b) {
    return new ca(ba, a, b).promise
  }
  var ea = da;

  function fa(a, b) {
    return ba.all(a, b)
  }
  var ga = fa;
  var ha = 0;
  var ia = {}.toString;
  var ja;

  function ka(a, b) {
    wa[ha] = a;
    wa[ha + 1] = b;
    ha += 2;
    if (ha === 2) {
      za()
    }
  }
  var la = ka;
  var ma = typeof window !== "undefined" ? window : undefined;
  var na = ma || {};
  var oa = na.MutationObserver || na.WebKitMutationObserver;
  var pa = typeof self === "undefined" && typeof process !== "undefined" && {}.toString.call(process) === "[object process]";
  var qa = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";

  function ra() {
    var a = process.nextTick;
    var b = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    if (Array.isArray(b) && b[1] === "0" && b[2] === "10") {
      a = setImmediate
    }
    return function() {
      a(xa)
    }
  }

  function sa() {
    return function() {
      ja(xa)
    }
  }

  function ta() {
    var a = 0;
    var b = new oa(xa);
    var c = document.createTextNode("");
    b.observe(c, {
      characterData: true
    });
    return function() {
      c.data = a = ++a % 2
    }
  }

  function ua() {
    var a = new MessageChannel;
    a.port1.onmessage = xa;
    return function() {
      a.port2.postMessage(0)
    }
  }

  function va() {
    return function() {
      setTimeout(xa, 1)
    }
  }
  var wa = new Array(1e3);

  function xa() {
    for (var a = 0; a < ha; a += 2) {
      var b = wa[a];
      var c = wa[a + 1];
      b(c);
      wa[a] = undefined;
      wa[a + 1] = undefined
    }
    ha = 0
  }

  function ya() {
    try {
      var a = require;
      var b = a("vertx");
      ja = b.runOnLoop || b.runOnContext;
      return sa()
    } catch (a) {
      return va()
    }
  }
  var za;
  if (pa) {
    za = ra()
  } else if (oa) {
    za = ta()
  } else if (qa) {
    za = ua()
  } else if (ma === undefined && typeof require === "function") {
    za = ya()
  } else {
    za = va()
  }

  function Aa(a) {
    var b = {};
    b["promise"] = new ba(function(a, c) {
      b["resolve"] = a;
      b["reject"] = c
    }, a);
    return b
  }
  var Ba = Aa;

  function Ca(a, c, d) {
    return ba.all(a, d).then(function(a) {
      if (!b(c)) {
        throw new TypeError("You must pass a function as filter's second argument.")
      }
      var e = a.length;
      var f = new Array(e);
      for (var g = 0; g < e; g++) {
        f[g] = c(a[g])
      }
      return ba.all(f, d).then(function(b) {
        var c = new Array(e);
        var d = 0;
        for (var f = 0; f < e; f++) {
          if (b[f]) {
            c[d] = a[f];
            d++
          }
        }
        c.length = d;
        return c
      })
    })
  }
  var Da = Ca;

  function Ea(a, b, c) {
    this._superConstructor(a, b, true, c)
  }
  var Fa = Ea;
  Ea.prototype = h(P.prototype);
  Ea.prototype._superConstructor = P;
  Ea.prototype._init = function() {
    this._result = {}
  };
  Ea.prototype._validateInput = function(a) {
    return a && typeof a === "object"
  };
  Ea.prototype._validationError = function() {
    return new Error("Promise.hash must be called with an object")
  };
  Ea.prototype._enumerate = function() {
    var a = this;
    var b = a.promise;
    var c = a._input;
    var d = [];
    for (var e in c) {
      if (b._state === t && Object.prototype.hasOwnProperty.call(c, e)) {
        d.push({
          position: e,
          entry: c[e]
        })
      }
    }
    var f = d.length;
    a._remaining = f;
    var g;
    for (var h = 0; b._state === t && h < f; h++) {
      g = d[h];
      a._eachEntry(g.entry, g.position)
    }
  };

  function Ga(a, b, c) {
    this._superConstructor(a, b, false, c)
  }
  Ga.prototype = h(Fa.prototype);
  Ga.prototype._superConstructor = P;
  Ga.prototype._makeResult = N;
  Ga.prototype._validationError = function() {
    return new Error("hashSettled must be called with an object")
  };

  function Ha(a, b) {
    return new Ga(ba, a, b).promise
  }
  var Ia = Ha;

  function Ja(a, b) {
    return new Fa(ba, a, b).promise
  }
  var Ka = Ja;

  function La(a, c, d) {
    return ba.all(a, d).then(function(a) {
      if (!b(c)) {
        throw new TypeError("You must pass a function as map's second argument.")
      }
      var e = a.length;
      var f = new Array(e);
      for (var g = 0; g < e; g++) {
        f[g] = c(a[g])
      }
      return ba.all(f, d)
    })
  }
  var Ma = La;

  function Na() {
    this.value = undefined
  }
  var Oa = new Na;
  var Pa = new Na;

  function Qa(a) {
    try {
      return a.then
    } catch (a) {
      Oa.value = a;
      return Oa
    }
  }

  function Ra(a, b, c) {
    try {
      a.apply(b, c)
    } catch (a) {
      Oa.value = a;
      return Oa
    }
  }

  function Sa(a, b) {
    var c = {};
    var d;
    var e;
    var f = a.length;
    var g = new Array(f);
    for (var h = 0; h < f; h++) {
      g[h] = a[h]
    }
    for (e = 0; e < b.length; e++) {
      d = b[e];
      c[d] = g[e + 1]
    }
    return c
  }

  function Ta(a) {
    var b = a.length;
    var c = new Array(b - 1);
    for (var d = 1; d < b; d++) {
      c[d - 1] = a[d]
    }
    return c
  }

  function Ua(a, b) {
    return {
      then: function(c, d) {
        return a.call(b, c, d)
      }
    }
  }

  function Va(a, b) {
    var c = function() {
      var c = this;
      var d = arguments.length;
      var f = new Array(d + 1);
      var g;
      var h = false;
      for (var i = 0; i < d; ++i) {
        g = arguments[i];
        if (!h) {
          h = Za(g);
          if (h === Pa) {
            var j = new ba(s);
            F(j, Pa.value);
            return j
          } else if (h && h !== true) {
            g = Ua(h, g)
          }
        }
        f[i] = g
      }
      var k = new ba(s);
      f[d] = function(a, c) {
        if (a) F(k, a);
        else if (b === undefined) C(k, c);
        else if (b === true) C(k, Ta(arguments));
        else if (e(b)) C(k, Sa(arguments, b));
        else C(k, c)
      };
      if (h) {
        return Ya(k, f, a, c)
      } else {
        return Xa(k, f, a, c)
      }
    };
    c.__proto__ = a;
    return c
  }
  var Wa = Va;

  function Xa(a, b, c, d) {
    var e = Ra(c, d, b);
    if (e === Oa) {
      F(a, e.value)
    }
    return a
  }

  function Ya(a, b, c, d) {
    return ba.all(b).then(function(b) {
      var e = Ra(c, d, b);
      if (e === Oa) {
        F(a, e.value)
      }
      return a
    })
  }

  function Za(a) {
    if (a && typeof a === "object") {
      if (a.constructor === ba) {
        return true
      } else {
        return Qa(a)
      }
    } else {
      return false
    }
  }
  var $a;
  if (typeof self === "object") {
    $a = self
  } else if (typeof global === "object") {
    $a = global
  } else {
    throw new Error("no global: `self` or `global` found")
  }
  var _a = $a;

  function ab(a, b) {
    return ba.race(a, b)
  }
  var bb = ab;

  function cb(a, b) {
    return ba.reject(a, b)
  }
  var db = cb;

  function eb(a, b) {
    return ba.resolve(a, b)
  }
  var fb = eb;

  function gb(a) {
    setTimeout(function() {
      throw a
    });
    throw a
  }
  var hb = gb;
  l.async = la;
  l.after = function(a) {
    setTimeout(a, 0)
  };
  var ib = fb;

  function jb(a, b) {
    l.async(a, b)
  }

  function kb() {
    l["on"].apply(l, arguments)
  }

  function lb() {
    l["off"].apply(l, arguments)
  }
  if (typeof window !== "undefined" && typeof window["__PROMISE_INSTRUMENTATION__"] === "object") {
    var mb = window["__PROMISE_INSTRUMENTATION__"];
    m("instrument", true);
    for (var nb in mb) {
      if (mb.hasOwnProperty(nb)) {
        kb(nb, mb[nb])
      }
    }
  }
  var ob = {
    race: bb,
    Promise: ba,
    allSettled: ea,
    hash: Ka,
    hashSettled: Ia,
    denodeify: Wa,
    on: kb,
    off: lb,
    map: Ma,
    filter: Da,
    resolve: fb,
    reject: db,
    all: ga,
    rethrow: hb,
    defer: Ba,
    EventTarget: k,
    configure: m,
    async: jb
  };
  if (typeof define === "function" && define["amd"]) {
    define(function() {
      return ob
    })
  } else if (typeof module !== "undefined" && module["exports"]) {
    module["exports"] = ob
  } else if (typeof _a !== "undefined") {
    _a["RSVP"] = ob
  }
}).call(this);
! function(a, b) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b()
}(this, function() {
  "use strict";

  function a() {
    return Hc.apply(null, arguments)
  }

  function b(a) {
    Hc = a
  }

  function c(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
  }

  function d(a) {
    return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
  }

  function e(a, b) {
    var c, d = [];
    for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
    return d
  }

  function f(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
  }

  function g(a, b) {
    for (var c in b) f(b, c) && (a[c] = b[c]);
    return f(b, "toString") && (a.toString = b.toString), f(b, "valueOf") && (a.valueOf = b.valueOf), a
  }

  function h(a, b, c, d) {
    return Ca(a, b, c, d, !0).utc()
  }

  function i() {
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1
    }
  }

  function j(a) {
    return null == a._pf && (a._pf = i()), a._pf
  }

  function k(a) {
    if (null == a._isValid) {
      var b = j(a);
      a._isValid = !(isNaN(a._d.getTime()) || !(b.overflow < 0) || b.empty || b.invalidMonth || b.invalidWeekday || b.nullInput || b.invalidFormat || b.userInvalidated), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour)
    }
    return a._isValid
  }

  function l(a) {
    var b = h(NaN);
    return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b
  }

  function m(a, b) {
    var c, d, e;
    if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = j(b)), "undefined" != typeof b._locale && (a._locale = b._locale), Jc.length > 0)
      for (c in Jc) d = Jc[c], e = b[d], "undefined" != typeof e && (a[d] = e);
    return a
  }

  function n(b) {
    m(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), Kc === !1 && (Kc = !0, a.updateOffset(this), Kc = !1)
  }

  function o(a) {
    return a instanceof n || null != a && null != a._isAMomentObject
  }

  function p(a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a)
  }

  function q(a) {
    var b = +a,
      c = 0;
    return 0 !== b && isFinite(b) && (c = p(b)), c
  }

  function r(a, b, c) {
    var d, e = Math.min(a.length, b.length),
      f = Math.abs(a.length - b.length),
      g = 0;
    for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && q(a[d]) !== q(b[d])) && g++;
    return g + f
  }

  function s() {}

  function t(a) {
    return a ? a.toLowerCase().replace("_", "-") : a
  }

  function u(a) {
    for (var b, c, d, e, f = 0; f < a.length;) {
      for (e = t(a[f]).split("-"), b = e.length, c = t(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
        if (d = v(e.slice(0, b).join("-"))) return d;
        if (c && c.length >= b && r(e, c, !0) >= b - 1) break;
        b--
      }
      f++
    }
    return null
  }

  function v(a) {
    var b = null;
    if (!Lc[a] && "undefined" != typeof module && module && module.exports) try {
      b = Ic._abbr, require("./locale/" + a), w(b)
    } catch (a) {}
    return Lc[a]
  }

  function w(a, b) {
    var c;
    return a && (c = "undefined" == typeof b ? y(a) : x(a, b), c && (Ic = c)), Ic._abbr
  }

  function x(a, b) {
    return null !== b ? (b.abbr = a, Lc[a] = Lc[a] || new s, Lc[a].set(b), w(a), Lc[a]) : (delete Lc[a], null)
  }

  function y(a) {
    var b;
    if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Ic;
    if (!c(a)) {
      if (b = v(a)) return b;
      a = [a]
    }
    return u(a)
  }

  function z(a, b) {
    var c = a.toLowerCase();
    Mc[c] = Mc[c + "s"] = Mc[b] = a
  }

  function A(a) {
    return "string" == typeof a ? Mc[a] || Mc[a.toLowerCase()] : void 0
  }

  function B(a) {
    var b, c, d = {};
    for (c in a) f(a, c) && (b = A(c), b && (d[b] = a[c]));
    return d
  }

  function C(b, c) {
    return function(d) {
      return null != d ? (E(this, b, d), a.updateOffset(this, c), this) : D(this, b)
    }
  }

  function D(a, b) {
    return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
  }

  function E(a, b, c) {
    return a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
  }

  function F(a, b) {
    var c;
    if ("object" == typeof a)
      for (c in a) this.set(c, a[c]);
    else if (a = A(a), "function" == typeof this[a]) return this[a](b);
    return this
  }

  function G(a, b, c) {
    var d = "" + Math.abs(a),
      e = b - d.length,
      f = a >= 0;
    return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
  }

  function H(a, b, c, d) {
    var e = d;
    "string" == typeof d && (e = function() {
      return this[d]()
    }), a && (Qc[a] = e), b && (Qc[b[0]] = function() {
      return G(e.apply(this, arguments), b[1], b[2])
    }), c && (Qc[c] = function() {
      return this.localeData().ordinal(e.apply(this, arguments), a)
    })
  }

  function I(a) {
    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
  }

  function J(a) {
    var b, c, d = a.match(Nc);
    for (b = 0, c = d.length; c > b; b++) Qc[d[b]] ? d[b] = Qc[d[b]] : d[b] = I(d[b]);
    return function(e) {
      var f = "";
      for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
      return f
    }
  }

  function K(a, b) {
    return a.isValid() ? (b = L(b, a.localeData()), Pc[b] = Pc[b] || J(b), Pc[b](a)) : a.localeData().invalidDate()
  }

  function L(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a
    }
    var d = 5;
    for (Oc.lastIndex = 0; d >= 0 && Oc.test(a);) a = a.replace(Oc, c), Oc.lastIndex = 0, d -= 1;
    return a
  }

  function M(a) {
    return "function" == typeof a && "[object Function]" === Object.prototype.toString.call(a)
  }

  function N(a, b, c) {
    dd[a] = M(b) ? b : function(a) {
      return a && c ? c : b
    }
  }

  function O(a, b) {
    return f(dd, a) ? dd[a](b._strict, b._locale) : new RegExp(P(a))
  }

  function P(a) {
    return a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
      return b || c || d || e
    }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  }

  function Q(a, b) {
    var c, d = b;
    for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function(a, c) {
        c[b] = q(a)
      }), c = 0; c < a.length; c++) ed[a[c]] = d
  }

  function R(a, b) {
    Q(a, function(a, c, d, e) {
      d._w = d._w || {}, b(a, d._w, d, e)
    })
  }

  function S(a, b, c) {
    null != b && f(ed, a) && ed[a](b, c._a, c, a)
  }

  function T(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
  }

  function U(a) {
    return this._months[a.month()]
  }

  function V(a) {
    return this._monthsShort[a.month()];
  }

  function W(a, b, c) {
    var d, e, f;
    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
      if (e = h([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
      if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
      if (!c && this._monthsParse[d].test(a)) return d
    }
  }

  function X(a, b) {
    var c;
    return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), T(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
  }

  function Y(b) {
    return null != b ? (X(this, b), a.updateOffset(this, !0), this) : D(this, "Month")
  }

  function Z() {
    return T(this.year(), this.month())
  }

  function $(a) {
    var b, c = a._a;
    return c && -2 === j(a).overflow && (b = c[gd] < 0 || c[gd] > 11 ? gd : c[hd] < 1 || c[hd] > T(c[fd], c[gd]) ? hd : c[id] < 0 || c[id] > 24 || 24 === c[id] && (0 !== c[jd] || 0 !== c[kd] || 0 !== c[ld]) ? id : c[jd] < 0 || c[jd] > 59 ? jd : c[kd] < 0 || c[kd] > 59 ? kd : c[ld] < 0 || c[ld] > 999 ? ld : -1, j(a)._overflowDayOfYear && (fd > b || b > hd) && (b = hd), j(a).overflow = b), a
  }

  function _(b) {
    a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b)
  }

  function aa(a, b) {
    var c = !0;
    return g(function() {
      return c && (_(a + "\n" + (new Error).stack), c = !1), b.apply(this, arguments)
    }, b)
  }

  function ba(a, b) {
    od[a] || (_(b), od[a] = !0)
  }

  function ca(a) {
    var b, c, d = a._i,
      e = pd.exec(d);
    if (e) {
      for (j(a).iso = !0, b = 0, c = qd.length; c > b; b++)
        if (qd[b][1].exec(d)) {
          a._f = qd[b][0];
          break
        }
      for (b = 0, c = rd.length; c > b; b++)
        if (rd[b][1].exec(d)) {
          a._f += (e[6] || " ") + rd[b][0];
          break
        }
      d.match(ad) && (a._f += "Z"), va(a)
    } else a._isValid = !1
  }

  function da(b) {
    var c = sd.exec(b._i);
    return null !== c ? void(b._d = new Date(+c[1])) : (ca(b), void(b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))))
  }

  function ea(a, b, c, d, e, f, g) {
    var h = new Date(a, b, c, d, e, f, g);
    return 1970 > a && h.setFullYear(a), h
  }

  function fa(a) {
    var b = new Date(Date.UTC.apply(null, arguments));
    return 1970 > a && b.setUTCFullYear(a), b
  }

  function ga(a) {
    return ha(a) ? 366 : 365
  }

  function ha(a) {
    return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
  }

  function ia() {
    return ha(this.year())
  }

  function ja(a, b, c) {
    var d, e = c - b,
      f = c - a.day();
    return f > e && (f -= 7), e - 7 > f && (f += 7), d = Da(a).add(f, "d"), {
      week: Math.ceil(d.dayOfYear() / 7),
      year: d.year()
    }
  }

  function ka(a) {
    return ja(a, this._week.dow, this._week.doy).week
  }

  function la() {
    return this._week.dow
  }

  function ma() {
    return this._week.doy
  }

  function na(a) {
    var b = this.localeData().week(this);
    return null == a ? b : this.add(7 * (a - b), "d")
  }

  function oa(a) {
    var b = ja(this, 1, 4).week;
    return null == a ? b : this.add(7 * (a - b), "d")
  }

  function pa(a, b, c, d, e) {
    var f, g = 6 + e - d,
      h = fa(a, 0, 1 + g),
      i = h.getUTCDay();
    return e > i && (i += 7), c = null != c ? 1 * c : e, f = 1 + g + 7 * (b - 1) - i + c, {
      year: f > 0 ? a : a - 1,
      dayOfYear: f > 0 ? f : ga(a - 1) + f
    }
  }

  function qa(a) {
    var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
    return null == a ? b : this.add(a - b, "d")
  }

  function ra(a, b, c) {
    return null != a ? a : null != b ? b : c
  }

  function sa(a) {
    var b = new Date;
    return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
  }

  function ta(a) {
    var b, c, d, e, f = [];
    if (!a._d) {
      for (d = sa(a), a._w && null == a._a[hd] && null == a._a[gd] && ua(a), a._dayOfYear && (e = ra(a._a[fd], d[fd]), a._dayOfYear > ga(e) && (j(a)._overflowDayOfYear = !0), c = fa(e, 0, a._dayOfYear), a._a[gd] = c.getUTCMonth(), a._a[hd] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) a._a[b] = f[b] = d[b];
      for (; 7 > b; b++) a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
      24 === a._a[id] && 0 === a._a[jd] && 0 === a._a[kd] && 0 === a._a[ld] && (a._nextDay = !0, a._a[id] = 0), a._d = (a._useUTC ? fa : ea).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[id] = 24)
    }
  }

  function ua(a) {
    var b, c, d, e, f, g, h;
    b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = ra(b.GG, a._a[fd], ja(Da(), 1, 4).year), d = ra(b.W, 1), e = ra(b.E, 1)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = ra(b.gg, a._a[fd], ja(Da(), f, g).year), d = ra(b.w, 1), null != b.d ? (e = b.d, f > e && ++d) : e = null != b.e ? b.e + f : f), h = pa(c, d, e, g, f), a._a[fd] = h.year, a._dayOfYear = h.dayOfYear
  }

  function va(b) {
    if (b._f === a.ISO_8601) return void ca(b);
    b._a = [], j(b).empty = !0;
    var c, d, e, f, g, h = "" + b._i,
      i = h.length,
      k = 0;
    for (e = L(b._f, b._locale).match(Nc) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match(O(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), Qc[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), S(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f);
    j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[id] <= 12 && b._a[id] > 0 && (j(b).bigHour = void 0), b._a[id] = wa(b._locale, b._a[id], b._meridiem), ta(b), $(b)
  }

  function wa(a, b, c) {
    var d;
    return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b
  }

  function xa(a) {
    var b, c, d, e, f;
    if (0 === a._f.length) return j(a).invalidFormat = !0, void(a._d = new Date(NaN));
    for (e = 0; e < a._f.length; e++) f = 0, b = m({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], va(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, j(b).score = f, (null == d || d > f) && (d = f, c = b));
    g(a, c || b)
  }

  function ya(a) {
    if (!a._d) {
      var b = B(a._i);
      a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], ta(a)
    }
  }

  function za(a) {
    var b = new n($(Aa(a)));
    return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b
  }

  function Aa(a) {
    var b = a._i,
      e = a._f;
    return a._locale = a._locale || y(a._l), null === b || void 0 === e && "" === b ? l({
      nullInput: !0
    }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), o(b) ? new n($(b)) : (c(e) ? xa(a) : e ? va(a) : d(b) ? a._d = b : Ba(a), a))
  }

  function Ba(b) {
    var f = b._i;
    void 0 === f ? b._d = new Date : d(f) ? b._d = new Date(+f) : "string" == typeof f ? da(b) : c(f) ? (b._a = e(f.slice(0), function(a) {
      return parseInt(a, 10)
    }), ta(b)) : "object" == typeof f ? ya(b) : "number" == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b)
  }

  function Ca(a, b, c, d, e) {
    var f = {};
    return "boolean" == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, f._l = c, f._i = a, f._f = b, f._strict = d, za(f)
  }

  function Da(a, b, c, d) {
    return Ca(a, b, c, d, !1)
  }

  function Ea(a, b) {
    var d, e;
    if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return Da();
    for (d = b[0], e = 1; e < b.length; ++e)(!b[e].isValid() || b[e][a](d)) && (d = b[e]);
    return d
  }

  function Fa() {
    var a = [].slice.call(arguments, 0);
    return Ea("isBefore", a)
  }

  function Ga() {
    var a = [].slice.call(arguments, 0);
    return Ea("isAfter", a)
  }

  function Ha(a) {
    var b = B(a),
      c = b.year || 0,
      d = b.quarter || 0,
      e = b.month || 0,
      f = b.week || 0,
      g = b.day || 0,
      h = b.hour || 0,
      i = b.minute || 0,
      j = b.second || 0,
      k = b.millisecond || 0;
    this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = y(), this._bubble()
  }

  function Ia(a) {
    return a instanceof Ha
  }

  function Ja(a, b) {
    H(a, 0, 0, function() {
      var a = this.utcOffset(),
        c = "+";
      return 0 > a && (a = -a, c = "-"), c + G(~~(a / 60), 2) + b + G(~~a % 60, 2)
    })
  }

  function Ka(a) {
    var b = (a || "").match(ad) || [],
      c = b[b.length - 1] || [],
      d = (c + "").match(xd) || ["-", 0, 0],
      e = +(60 * d[1]) + q(d[2]);
    return "+" === d[0] ? e : -e
  }

  function La(b, c) {
    var e, f;
    return c._isUTC ? (e = c.clone(), f = (o(b) || d(b) ? +b : +Da(b)) - +e, e._d.setTime(+e._d + f), a.updateOffset(e, !1), e) : Da(b).local()
  }

  function Ma(a) {
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
  }

  function Na(b, c) {
    var d, e = this._offset || 0;
    return null != b ? ("string" == typeof b && (b = Ka(b)), Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ma(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? bb(this, Ya(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ma(this)
  }

  function Oa(a, b) {
    return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
  }

  function Pa(a) {
    return this.utcOffset(0, a)
  }

  function Qa(a) {
    return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ma(this), "m")), this
  }

  function Ra() {
    return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ka(this._i)), this
  }

  function Sa(a) {
    return a = a ? Da(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0
  }

  function Ta() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
  }

  function Ua() {
    if ("undefined" != typeof this._isDSTShifted) return this._isDSTShifted;
    var a = {};
    if (m(a, this), a = Aa(a), a._a) {
      var b = a._isUTC ? h(a._a) : Da(a._a);
      this._isDSTShifted = this.isValid() && r(a._a, b.toArray()) > 0
    } else this._isDSTShifted = !1;
    return this._isDSTShifted
  }

  function Va() {
    return !this._isUTC
  }

  function Wa() {
    return this._isUTC
  }

  function Xa() {
    return this._isUTC && 0 === this._offset
  }

  function Ya(a, b) {
    var c, d, e, g = a,
      h = null;
    return Ia(a) ? g = {
      ms: a._milliseconds,
      d: a._days,
      M: a._months
    } : "number" == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = yd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = {
      y: 0,
      d: q(h[hd]) * c,
      h: q(h[id]) * c,
      m: q(h[jd]) * c,
      s: q(h[kd]) * c,
      ms: q(h[ld]) * c
    }) : (h = zd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = {
      y: Za(h[2], c),
      M: Za(h[3], c),
      d: Za(h[4], c),
      h: Za(h[5], c),
      m: Za(h[6], c),
      s: Za(h[7], c),
      w: Za(h[8], c)
    }) : null == g ? g = {} : "object" == typeof g && ("from" in g || "to" in g) && (e = _a(Da(g.from), Da(g.to)), g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Ha(g), Ia(a) && f(a, "_locale") && (d._locale = a._locale), d
  }

  function Za(a, b) {
    var c = a && parseFloat(a.replace(",", "."));
    return (isNaN(c) ? 0 : c) * b
  }

  function $a(a, b) {
    var c = {
      milliseconds: 0,
      months: 0
    };
    return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
  }

  function _a(a, b) {
    var c;
    return b = La(b, a), a.isBefore(b) ? c = $a(a, b) : (c = $a(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c
  }

  function ab(a, b) {
    return function(c, d) {
      var e, f;
      return null === d || isNaN(+d) || (ba(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Ya(c, d), bb(this, e, a), this
    }
  }

  function bb(b, c, d, e) {
    var f = c._milliseconds,
      g = c._days,
      h = c._months;
    e = null == e ? !0 : e, f && b._d.setTime(+b._d + f * d), g && E(b, "Date", D(b, "Date") + g * d), h && X(b, D(b, "Month") + h * d), e && a.updateOffset(b, g || h)
  }

  function cb(a, b) {
    var c = a || Da(),
      d = La(c, this).startOf("day"),
      e = this.diff(d, "days", !0),
      f = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
    return this.format(b && b[f] || this.localeData().calendar(f, this, Da(c)))
  }

  function db() {
    return new n(this)
  }

  function eb(a, b) {
    var c;
    return b = A("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Da(a), +this > +a) : (c = o(a) ? +a : +Da(a), c < +this.clone().startOf(b))
  }

  function fb(a, b) {
    var c;
    return b = A("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Da(a), +a > +this) : (c = o(a) ? +a : +Da(a), +this.clone().endOf(b) < c)
  }

  function gb(a, b, c) {
    return this.isAfter(a, c) && this.isBefore(b, c)
  }

  function hb(a, b) {
    var c;
    return b = A(b || "millisecond"), "millisecond" === b ? (a = o(a) ? a : Da(a), +this === +a) : (c = +Da(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
  }

  function ib(a, b, c) {
    var d, e, f = La(a, this),
      g = 6e4 * (f.utcOffset() - this.utcOffset());
    return b = A(b), "year" === b || "month" === b || "quarter" === b ? (e = jb(this, f), "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), c ? e : p(e)
  }

  function jb(a, b) {
    var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
      f = a.clone().add(e, "months");
    return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d)
  }

  function kb() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
  }

  function lb() {
    var a = this.clone().utc();
    return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : K(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : K(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
  }

  function mb(b) {
    var c = K(this, b || a.defaultFormat);
    return this.localeData().postformat(c)
  }

  function nb(a, b) {
    return this.isValid() ? Ya({
      to: this,
      from: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
  }

  function ob(a) {
    return this.from(Da(), a)
  }

  function pb(a, b) {
    return this.isValid() ? Ya({
      from: this,
      to: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
  }

  function qb(a) {
    return this.to(Da(), a)
  }

  function rb(a) {
    var b;
    return void 0 === a ? this._locale._abbr : (b = y(a), null != b && (this._locale = b), this)
  }

  function sb() {
    return this._locale
  }

  function tb(a) {
    switch (a = A(a)) {
      case "year":
        this.month(0);
      case "quarter":
      case "month":
        this.date(1);
      case "week":
      case "isoWeek":
      case "day":
        this.hours(0);
      case "hour":
        this.minutes(0);
      case "minute":
        this.seconds(0);
      case "second":
        this.milliseconds(0)
    }
    return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
  }

  function ub(a) {
    return a = A(a), void 0 === a || "millisecond" === a ? this : this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms")
  }

  function vb() {
    return +this._d - 6e4 * (this._offset || 0)
  }

  function wb() {
    return Math.floor(+this / 1e3)
  }

  function xb() {
    return this._offset ? new Date(+this) : this._d
  }

  function yb() {
    var a = this;
    return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
  }

  function zb() {
    var a = this;
    return {
      years: a.year(),
      months: a.month(),
      date: a.date(),
      hours: a.hours(),
      minutes: a.minutes(),
      seconds: a.seconds(),
      milliseconds: a.milliseconds()
    }
  }

  function Ab() {
    return k(this)
  }

  function Bb() {
    return g({}, j(this))
  }

  function Cb() {
    return j(this).overflow
  }

  function Db(a, b) {
    H(0, [a, a.length], 0, b)
  }

  function Eb(a, b, c) {
    return ja(Da([a, 11, 31 + b - c]), b, c).week
  }

  function Fb(a) {
    var b = ja(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
    return null == a ? b : this.add(a - b, "y")
  }

  function Gb(a) {
    var b = ja(this, 1, 4).year;
    return null == a ? b : this.add(a - b, "y")
  }

  function Hb() {
    return Eb(this.year(), 1, 4)
  }

  function Ib() {
    var a = this.localeData()._week;
    return Eb(this.year(), a.dow, a.doy)
  }

  function Jb(a) {
    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
  }

  function Kb(a, b) {
    return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10)
  }

  function Lb(a) {
    return this._weekdays[a.day()]
  }

  function Mb(a) {
    return this._weekdaysShort[a.day()]
  }

  function Nb(a) {
    return this._weekdaysMin[a.day()]
  }

  function Ob(a) {
    var b, c, d;
    for (this._weekdaysParse = this._weekdaysParse || [], b = 0; 7 > b; b++)
      if (this._weekdaysParse[b] || (c = Da([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b
  }

  function Pb(a) {
    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return null != a ? (a = Kb(a, this.localeData()), this.add(a - b, "d")) : b
  }

  function Qb(a) {
    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == a ? b : this.add(a - b, "d")
  }

  function Rb(a) {
    return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
  }

  function Sb(a, b) {
    H(a, 0, 0, function() {
      return this.localeData().meridiem(this.hours(), this.minutes(), b)
    })
  }

  function Tb(a, b) {
    return b._meridiemParse
  }

  function Ub(a) {
    return "p" === (a + "").toLowerCase().charAt(0)
  }

  function Vb(a, b, c) {
    return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
  }

  function Wb(a, b) {
    b[ld] = q(1e3 * ("0." + a))
  }

  function Xb() {
    return this._isUTC ? "UTC" : ""
  }

  function Yb() {
    return this._isUTC ? "Coordinated Universal Time" : ""
  }

  function Zb(a) {
    return Da(1e3 * a)
  }

  function $b() {
    return Da.apply(null, arguments).parseZone()
  }

  function _b(a, b, c) {
    var d = this._calendar[a];
    return "function" == typeof d ? d.call(b, c) : d
  }

  function ac(a) {
    var b = this._longDateFormat[a],
      c = this._longDateFormat[a.toUpperCase()];
    return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function(a) {
      return a.slice(1)
    }), this._longDateFormat[a])
  }

  function bc() {
    return this._invalidDate
  }

  function cc(a) {
    return this._ordinal.replace("%d", a)
  }

  function dc(a) {
    return a
  }

  function ec(a, b, c, d) {
    var e = this._relativeTime[c];
    return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
  }

  function fc(a, b) {
    var c = this._relativeTime[a > 0 ? "future" : "past"];
    return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
  }

  function gc(a) {
    var b, c;
    for (c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
  }

  function hc(a, b, c, d) {
    var e = y(),
      f = h().set(d, b);
    return e[c](f, a)
  }

  function ic(a, b, c, d, e) {
    if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return hc(a, b, c, e);
    var f, g = [];
    for (f = 0; d > f; f++) g[f] = hc(a, f, c, e);
    return g
  }

  function jc(a, b) {
    return ic(a, b, "months", 12, "month")
  }

  function kc(a, b) {
    return ic(a, b, "monthsShort", 12, "month")
  }

  function lc(a, b) {
    return ic(a, b, "weekdays", 7, "day")
  }

  function mc(a, b) {
    return ic(a, b, "weekdaysShort", 7, "day")
  }

  function nc(a, b) {
    return ic(a, b, "weekdaysMin", 7, "day")
  }

  function oc() {
    var a = this._data;
    return this._milliseconds = Wd(this._milliseconds), this._days = Wd(this._days), this._months = Wd(this._months), a.milliseconds = Wd(a.milliseconds), a.seconds = Wd(a.seconds), a.minutes = Wd(a.minutes), a.hours = Wd(a.hours), a.months = Wd(a.months), a.years = Wd(a.years), this
  }

  function pc(a, b, c, d) {
    var e = Ya(b, c);
    return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble()
  }

  function qc(a, b) {
    return pc(this, a, b, 1)
  }

  function rc(a, b) {
    return pc(this, a, b, -1)
  }

  function sc(a) {
    return 0 > a ? Math.floor(a) : Math.ceil(a)
  }

  function tc() {
    var a, b, c, d, e, f = this._milliseconds,
      g = this._days,
      h = this._months,
      i = this._data;
    return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * sc(vc(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = p(f / 1e3), i.seconds = a % 60, b = p(a / 60), i.minutes = b % 60, c = p(b / 60), i.hours = c % 24, g += p(c / 24), e = p(uc(g)), h += e, g -= sc(vc(e)), d = p(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this
  }

  function uc(a) {
    return 4800 * a / 146097
  }

  function vc(a) {
    return 146097 * a / 4800
  }

  function wc(a) {
    var b, c, d = this._milliseconds;
    if (a = A(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + uc(b), "month" === a ? c : c / 12;
    switch (b = this._days + Math.round(vc(this._months)), a) {
      case "week":
        return b / 7 + d / 6048e5;
      case "day":
        return b + d / 864e5;
      case "hour":
        return 24 * b + d / 36e5;
      case "minute":
        return 1440 * b + d / 6e4;
      case "second":
        return 86400 * b + d / 1e3;
      case "millisecond":
        return Math.floor(864e5 * b) + d;
      default:
        throw new Error("Unknown unit " + a)
    }
  }

  function xc() {
    return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * q(this._months / 12)
  }

  function yc(a) {
    return function() {
      return this.as(a)
    }
  }

  function zc(a) {
    return a = A(a), this[a + "s"]()
  }

  function Ac(a) {
    return function() {
      return this._data[a]
    }
  }

  function Bc() {
    return p(this.days() / 7)
  }

  function Cc(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d)
  }

  function Dc(a, b, c) {
    var d = Ya(a).abs(),
      e = ke(d.as("s")),
      f = ke(d.as("m")),
      g = ke(d.as("h")),
      h = ke(d.as("d")),
      i = ke(d.as("M")),
      j = ke(d.as("y")),
      k = e < le.s && ["s", e] || 1 === f && ["m"] || f < le.m && ["mm", f] || 1 === g && ["h"] || g < le.h && ["hh", g] || 1 === h && ["d"] || h < le.d && ["dd", h] || 1 === i && ["M"] || i < le.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
    return k[2] = b, k[3] = +a > 0, k[4] = c, Cc.apply(null, k)
  }

  function Ec(a, b) {
    return void 0 === le[a] ? !1 : void 0 === b ? le[a] : (le[a] = b, !0)
  }

  function Fc(a) {
    var b = this.localeData(),
      c = Dc(this, !a, b);
    return a && (c = b.pastFuture(+this, c)), b.postformat(c)
  }

  function Gc() {
    var a, b, c, d = me(this._milliseconds) / 1e3,
      e = me(this._days),
      f = me(this._months);
    a = p(d / 60), b = p(a / 60), d %= 60, a %= 60, c = p(f / 12), f %= 12;
    var g = c,
      h = f,
      i = e,
      j = b,
      k = a,
      l = d,
      m = this.asSeconds();
    return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"
  }
  var Hc, Ic, Jc = a.momentProperties = [],
    Kc = !1,
    Lc = {},
    Mc = {},
    Nc = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    Oc = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    Pc = {},
    Qc = {},
    Rc = /\d/,
    Sc = /\d\d/,
    Tc = /\d{3}/,
    Uc = /\d{4}/,
    Vc = /[+-]?\d{6}/,
    Wc = /\d\d?/,
    Xc = /\d{1,3}/,
    Yc = /\d{1,4}/,
    Zc = /[+-]?\d{1,6}/,
    $c = /\d+/,
    _c = /[+-]?\d+/,
    ad = /Z|[+-]\d\d:?\d\d/gi,
    bd = /[+-]?\d+(\.\d{1,3})?/,
    cd = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
    dd = {},
    ed = {},
    fd = 0,
    gd = 1,
    hd = 2,
    id = 3,
    jd = 4,
    kd = 5,
    ld = 6;
  H("M", ["MM", 2], "Mo", function() {
    return this.month() + 1
  }), H("MMM", 0, 0, function(a) {
    return this.localeData().monthsShort(this, a)
  }), H("MMMM", 0, 0, function(a) {
    return this.localeData().months(this, a)
  }), z("month", "M"), N("M", Wc), N("MM", Wc, Sc), N("MMM", cd), N("MMMM", cd), Q(["M", "MM"], function(a, b) {
    b[gd] = q(a) - 1
  }), Q(["MMM", "MMMM"], function(a, b, c, d) {
    var e = c._locale.monthsParse(a, d, c._strict);
    null != e ? b[gd] = e : j(c).invalidMonth = a
  });
  var md = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    nd = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    od = {};
  a.suppressDeprecationWarnings = !1;
  var pd = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    qd = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
      ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
      ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d{2}/],
      ["YYYY-DDD", /\d{4}-\d{3}/]
    ],
    rd = [
      ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
      ["HH:mm", /(T| )\d\d:\d\d/],
      ["HH", /(T| )\d\d/]
    ],
    sd = /^\/?Date\((\-?\d+)/i;
  a.createFromInputFallback = aa("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
    a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
  }), H(0, ["YY", 2], 0, function() {
    return this.year() % 100
  }), H(0, ["YYYY", 4], 0, "year"), H(0, ["YYYYY", 5], 0, "year"), H(0, ["YYYYYY", 6, !0], 0, "year"), z("year", "y"), N("Y", _c), N("YY", Wc, Sc), N("YYYY", Yc, Uc), N("YYYYY", Zc, Vc), N("YYYYYY", Zc, Vc), Q(["YYYYY", "YYYYYY"], fd), Q("YYYY", function(b, c) {
    c[fd] = 2 === b.length ? a.parseTwoDigitYear(b) : q(b)
  }), Q("YY", function(b, c) {
    c[fd] = a.parseTwoDigitYear(b)
  }), a.parseTwoDigitYear = function(a) {
    return q(a) + (q(a) > 68 ? 1900 : 2e3)
  };
  var td = C("FullYear", !1);
  H("w", ["ww", 2], "wo", "week"), H("W", ["WW", 2], "Wo", "isoWeek"), z("week", "w"), z("isoWeek", "W"), N("w", Wc), N("ww", Wc, Sc), N("W", Wc), N("WW", Wc, Sc), R(["w", "ww", "W", "WW"], function(a, b, c, d) {
    b[d.substr(0, 1)] = q(a)
  });
  var ud = {
    dow: 0,
    doy: 6
  };
  H("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), z("dayOfYear", "DDD"), N("DDD", Xc), N("DDDD", Tc), Q(["DDD", "DDDD"], function(a, b, c) {
    c._dayOfYear = q(a)
  }), a.ISO_8601 = function() {};
  var vd = aa("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
      var a = Da.apply(null, arguments);
      return this > a ? this : a
    }),
    wd = aa("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
      var a = Da.apply(null, arguments);
      return a > this ? this : a
    });
  Ja("Z", ":"), Ja("ZZ", ""), N("Z", ad), N("ZZ", ad), Q(["Z", "ZZ"], function(a, b, c) {
    c._useUTC = !0, c._tzm = Ka(a)
  });
  var xd = /([\+\-]|\d\d)/gi;
  a.updateOffset = function() {};
  var yd = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
    zd = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
  Ya.fn = Ha.prototype;
  var Ad = ab(1, "add"),
    Bd = ab(-1, "subtract");
  a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
  var Cd = aa("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(a) {
    return void 0 === a ? this.localeData() : this.locale(a)
  });
  H(0, ["gg", 2], 0, function() {
    return this.weekYear() % 100
  }), H(0, ["GG", 2], 0, function() {
    return this.isoWeekYear() % 100
  }), Db("gggg", "weekYear"), Db("ggggg", "weekYear"), Db("GGGG", "isoWeekYear"), Db("GGGGG", "isoWeekYear"), z("weekYear", "gg"), z("isoWeekYear", "GG"), N("G", _c), N("g", _c), N("GG", Wc, Sc), N("gg", Wc, Sc), N("GGGG", Yc, Uc), N("gggg", Yc, Uc), N("GGGGG", Zc, Vc), N("ggggg", Zc, Vc), R(["gggg", "ggggg", "GGGG", "GGGGG"], function(a, b, c, d) {
    b[d.substr(0, 2)] = q(a)
  }), R(["gg", "GG"], function(b, c, d, e) {
    c[e] = a.parseTwoDigitYear(b)
  }), H("Q", 0, 0, "quarter"), z("quarter", "Q"), N("Q", Rc), Q("Q", function(a, b) {
    b[gd] = 3 * (q(a) - 1)
  }), H("D", ["DD", 2], "Do", "date"), z("date", "D"), N("D", Wc), N("DD", Wc, Sc), N("Do", function(a, b) {
    return a ? b._ordinalParse : b._ordinalParseLenient
  }), Q(["D", "DD"], hd), Q("Do", function(a, b) {
    b[hd] = q(a.match(Wc)[0], 10)
  });
  var Dd = C("Date", !0);
  H("d", 0, "do", "day"), H("dd", 0, 0, function(a) {
    return this.localeData().weekdaysMin(this, a)
  }), H("ddd", 0, 0, function(a) {
    return this.localeData().weekdaysShort(this, a)
  }), H("dddd", 0, 0, function(a) {
    return this.localeData().weekdays(this, a)
  }), H("e", 0, 0, "weekday"), H("E", 0, 0, "isoWeekday"), z("day", "d"), z("weekday", "e"), z("isoWeekday", "E"), N("d", Wc), N("e", Wc), N("E", Wc), N("dd", cd), N("ddd", cd), N("dddd", cd), R(["dd", "ddd", "dddd"], function(a, b, c) {
    var d = c._locale.weekdaysParse(a);
    null != d ? b.d = d : j(c).invalidWeekday = a
  }), R(["d", "e", "E"], function(a, b, c, d) {
    b[d] = q(a)
  });
  var Ed = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    Fd = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    Gd = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
  H("H", ["HH", 2], 0, "hour"), H("h", ["hh", 2], 0, function() {
    return this.hours() % 12 || 12
  }), Sb("a", !0), Sb("A", !1), z("hour", "h"), N("a", Tb), N("A", Tb), N("H", Wc), N("h", Wc), N("HH", Wc, Sc), N("hh", Wc, Sc), Q(["H", "HH"], id), Q(["a", "A"], function(a, b, c) {
    c._isPm = c._locale.isPM(a), c._meridiem = a
  }), Q(["h", "hh"], function(a, b, c) {
    b[id] = q(a), j(c).bigHour = !0
  });
  var Hd = /[ap]\.?m?\.?/i,
    Id = C("Hours", !0);
  H("m", ["mm", 2], 0, "minute"), z("minute", "m"), N("m", Wc), N("mm", Wc, Sc), Q(["m", "mm"], jd);
  var Jd = C("Minutes", !1);
  H("s", ["ss", 2], 0, "second"), z("second", "s"), N("s", Wc), N("ss", Wc, Sc), Q(["s", "ss"], kd);
  var Kd = C("Seconds", !1);
  H("S", 0, 0, function() {
    return ~~(this.millisecond() / 100)
  }), H(0, ["SS", 2], 0, function() {
    return ~~(this.millisecond() / 10)
  }), H(0, ["SSS", 3], 0, "millisecond"), H(0, ["SSSS", 4], 0, function() {
    return 10 * this.millisecond()
  }), H(0, ["SSSSS", 5], 0, function() {
    return 100 * this.millisecond()
  }), H(0, ["SSSSSS", 6], 0, function() {
    return 1e3 * this.millisecond()
  }), H(0, ["SSSSSSS", 7], 0, function() {
    return 1e4 * this.millisecond()
  }), H(0, ["SSSSSSSS", 8], 0, function() {
    return 1e5 * this.millisecond()
  }), H(0, ["SSSSSSSSS", 9], 0, function() {
    return 1e6 * this.millisecond()
  }), z("millisecond", "ms"), N("S", Xc, Rc), N("SS", Xc, Sc), N("SSS", Xc, Tc);
  var Ld;
  for (Ld = "SSSS"; Ld.length <= 9; Ld += "S") N(Ld, $c);
  for (Ld = "S"; Ld.length <= 9; Ld += "S") Q(Ld, Wb);
  var Md = C("Milliseconds", !1);
  H("z", 0, 0, "zoneAbbr"), H("zz", 0, 0, "zoneName");
  var Nd = n.prototype;
  Nd.add = Ad, Nd.calendar = cb, Nd.clone = db, Nd.diff = ib, Nd.endOf = ub, Nd.format = mb, Nd.from = nb, Nd.fromNow = ob, Nd.to = pb, Nd.toNow = qb, Nd.get = F, Nd.invalidAt = Cb, Nd.isAfter = eb, Nd.isBefore = fb, Nd.isBetween = gb, Nd.isSame = hb, Nd.isValid = Ab, Nd.lang = Cd, Nd.locale = rb, Nd.localeData = sb, Nd.max = wd, Nd.min = vd, Nd.parsingFlags = Bb, Nd.set = F, Nd.startOf = tb, Nd.subtract = Bd, Nd.toArray = yb, Nd.toObject = zb, Nd.toDate = xb, Nd.toISOString = lb, Nd.toJSON = lb, Nd.toString = kb, Nd.unix = wb, Nd.valueOf = vb, Nd.year = td, Nd.isLeapYear = ia, Nd.weekYear = Fb, Nd.isoWeekYear = Gb, Nd.quarter = Nd.quarters = Jb, Nd.month = Y, Nd.daysInMonth = Z, Nd.week = Nd.weeks = na, Nd.isoWeek = Nd.isoWeeks = oa, Nd.weeksInYear = Ib, Nd.isoWeeksInYear = Hb, Nd.date = Dd, Nd.day = Nd.days = Pb, Nd.weekday = Qb, Nd.isoWeekday = Rb, Nd.dayOfYear = qa, Nd.hour = Nd.hours = Id, Nd.minute = Nd.minutes = Jd, Nd.second = Nd.seconds = Kd, Nd.millisecond = Nd.milliseconds = Md, Nd.utcOffset = Na, Nd.utc = Pa, Nd.local = Qa, Nd.parseZone = Ra, Nd.hasAlignedHourOffset = Sa, Nd.isDST = Ta, Nd.isDSTShifted = Ua, Nd.isLocal = Va, Nd.isUtcOffset = Wa, Nd.isUtc = Xa, Nd.isUTC = Xa, Nd.zoneAbbr = Xb, Nd.zoneName = Yb, Nd.dates = aa("dates accessor is deprecated. Use date instead.", Dd), Nd.months = aa("months accessor is deprecated. Use month instead", Y), Nd.years = aa("years accessor is deprecated. Use year instead", td), Nd.zone = aa("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Oa);
  var Od = Nd,
    Pd = {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    },
    Qd = {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A"
    },
    Rd = "Invalid date",
    Sd = "%d",
    Td = /\d{1,2}/,
    Ud = {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    Vd = s.prototype;
  Vd._calendar = Pd, Vd.calendar = _b, Vd._longDateFormat = Qd, Vd.longDateFormat = ac, Vd._invalidDate = Rd, Vd.invalidDate = bc, Vd._ordinal = Sd, Vd.ordinal = cc, Vd._ordinalParse = Td, Vd.preparse = dc, Vd.postformat = dc, Vd._relativeTime = Ud, Vd.relativeTime = ec, Vd.pastFuture = fc, Vd.set = gc, Vd.months = U, Vd._months = md, Vd.monthsShort = V, Vd._monthsShort = nd, Vd.monthsParse = W, Vd.week = ka, Vd._week = ud, Vd.firstDayOfYear = ma, Vd.firstDayOfWeek = la, Vd.weekdays = Lb, Vd._weekdays = Ed, Vd.weekdaysMin = Nb, Vd._weekdaysMin = Gd, Vd.weekdaysShort = Mb, Vd._weekdaysShort = Fd, Vd.weekdaysParse = Ob, Vd.isPM = Ub, Vd._meridiemParse = Hd, Vd.meridiem = Vb, w("en", {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function(a) {
      var b = a % 10,
        c = 1 === q(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c
    }
  }), a.lang = aa("moment.lang is deprecated. Use moment.locale instead.", w), a.langData = aa("moment.langData is deprecated. Use moment.localeData instead.", y);
  var Wd = Math.abs,
    Xd = yc("ms"),
    Yd = yc("s"),
    Zd = yc("m"),
    $d = yc("h"),
    _d = yc("d"),
    ae = yc("w"),
    be = yc("M"),
    ce = yc("y"),
    de = Ac("milliseconds"),
    ee = Ac("seconds"),
    fe = Ac("minutes"),
    ge = Ac("hours"),
    he = Ac("days"),
    ie = Ac("months"),
    je = Ac("years"),
    ke = Math.round,
    le = {
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      M: 11
    },
    me = Math.abs,
    ne = Ha.prototype;
  ne.abs = oc, ne.add = qc, ne.subtract = rc, ne.as = wc, ne.asMilliseconds = Xd, ne.asSeconds = Yd, ne.asMinutes = Zd, ne.asHours = $d, ne.asDays = _d, ne.asWeeks = ae, ne.asMonths = be, ne.asYears = ce, ne.valueOf = xc, ne._bubble = tc, ne.get = zc, ne.milliseconds = de, ne.seconds = ee, ne.minutes = fe, ne.hours = ge, ne.days = he, ne.weeks = Bc, ne.months = ie, ne.years = je, ne.humanize = Fc, ne.toISOString = Gc, ne.toString = Gc, ne.toJSON = Gc, ne.locale = rb, ne.localeData = sb, ne.toIsoString = aa("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Gc), ne.lang = Cd, H("X", 0, 0, "unix"), H("x", 0, 0, "valueOf"), N("x", _c), N("X", bd), Q("X", function(a, b, c) {
    c._d = new Date(1e3 * parseFloat(a, 10))
  }), Q("x", function(a, b, c) {
    c._d = new Date(q(a))
  }), a.version = "2.10.6", b(Da), a.fn = Od, a.min = Fa, a.max = Ga, a.utc = h, a.unix = Zb, a.months = jc, a.isDate = d, a.locale = w, a.invalid = l, a.duration = Ya, a.isMoment = o, a.weekdays = lc, a.parseZone = $b, a.localeData = y, a.isDuration = Ia, a.monthsShort = kc, a.weekdaysMin = nc, a.defineLocale = x, a.weekdaysShort = mc, a.normalizeUnits = A, a.relativeTimeThreshold = Ec;
  var oe = a;
  return oe
});
(function(a) {
  "use strict";
  var b = Object.prototype.hasOwnProperty;
  var c = Object.create(null);

  function d(a) {
    return b.call(c, a)
  }

  function e(a, b) {
    c[a] = b
  }

  function f(a) {
    if (!d(a)) {
      return null
    }
    return Object.assign({}, c[a])
  }

  function g(a, b) {
    var e;
    var f;
    if (!d(a)) {
      return
    }
    e = c[a];
    for (f in b) {
      if (!b.hasOwnProperty(f)) {
        continue
      }
      e[f] = b[f]
    }
  }

  function h(a, b) {
    if (d(a)) {
      g(a, b)
    } else {
      e(a, b)
    }
  }

  function i() {
    c = Object.create(null)
  }
  a.RealTimeUserInformationCache = {
    exists: d,
    add: e,
    fetch: f,
    update: g,
    addOrUpdate: h,
    clear: i
  }
})(window);
(function(a, b, c, d) {
  "use strict";
  var e = a.RealTimeUserInformationCache;
  var f = 0;

  function g(a) {
    switch (a) {
      case c.ErrorCode.TIMEOUT:
        return RealTime.Error.TIMEOUT;
      case c.ErrorCode.UNKNOWN_ERROR:
      default:
        return RealTime.Error.UNKNOWN_ERROR
    }
  }

  function h(a) {
    var c = d.defer();
    var f = e.fetch(a);
    if (f) {
      c.resolve(f)
    } else {
      b.getInstance().getUserInfo(a, {
        onSuccess: function(b) {
          var d = {
            id: a,
            name: b.getUserName(),
            avatarUrl: b.getPortraitUri()
          };
          e.addOrUpdate(a, d);
          c.resolve(d)
        },
        onError: function(a) {
          c.reject(a)
        }
      })
    }
    return c.promise
  }

  function i(a, b) {
    var e = b || {};
    return a.filter(function(a) {
      return a !== null && !(a instanceof c.InformationNotificationMessage || a instanceof c.InformationNotificationMessage)
    }).map(function(a) {
      var b = d.defer();
      var c = function a(c, d) {
        var f = e.messageFilter ? e.messageFilter(c.getContent()) : c.getContent();
        b.resolve({
          id: c.messageId,
          sender: d,
          sentAt: c.sentTime,
          content: f,
          rawContent: c.content
        })
      }.bind(this, a);
      h(a.senderUserId).then(c).catch(function(a) {
        b.reject(a)
      });
      return b.promise
    })
  }

  function j() {
    return "local-" + Number(new Date) + "" + ++f
  }
  a.RealTimeUtitlies = {
    toRealTimeError: g,
    getUserInfo: h,
    generateRealTimeHistoryMessagesList: i,
    generateMessageUniqueId: j
  }
})(window, RongIMClient, RongIMLib, RSVP);
(function(a, b, c, d, e, f) {
  "use strict";
  var g = {
    token: "AgWGc80go+7f7ueE/K8KpJRqp4WRpZLUJswZ6kkfgWNUcQ1KKroNYCb2M+tqvxLXqaFCIQ254cS8SXYitswpCQ==",
    id: "1",
    name: "ifanrx",
    avatarUrl: "http://cdn.ifanr.cn/ifanr/default_avatar.png"
  };
  var h = a.RealTimeUtitlies;
  var i = /chatroom:\d+/i;
  var j = e({});
  var k = {
    subscribe: function(a, b) {
      j.on(a, function() {
        b.apply(this, [].slice.call(arguments).slice(1))
      })
    },
    publish: function() {
      j.trigger.apply(j, arguments)
    },
    off: function() {
      j.off.apply(j, arguments)
    }
  };
  var l = null;
  var m = null;

  function n(a) {
    this.id = a.id;
    this.creator = null;
    this.members = null;
    this.topic = null;
    this.historyMessages = null
  }
  n.prototype.initializeCreator = function() {
    var a = d.defer();
    if (this.creator) {
      a.resolve(this.creator)
    } else {
      h.getUserInfo(this.creatorId).then(function(b) {
        this.creator = b;
        a.resolve(this.creator)
      }.bind(this))
    }
    return a.promise
  };
  n.prototype.initializeMembers = function() {
    var a = d.defer();
    var b;
    if (this.members) {
      a.resolve(this.members)
    } else {
      b = this.memberIds.map(function(a) {
        return h.getUserInfo(a)
      });
      d.all(b).then(function(b) {
        this.members = b;
        a.resolve(b)
      }.bind(this))
    }
    return a.promise
  };
  n.prototype.getHistoryMessages = function(a, e) {
    var f = e || {};
    var g = d.defer();
    b.getInstance().getHistoryMessages(c.ConversationType.GROUP, this.id, f.lastMessageTime ? f.lastMessageTime : null, a && a.limit ? a.limit : 10, {
      onSuccess: function(a, b) {
        var c = h.generateRealTimeHistoryMessagesList(a, f);
        d.all(c).then(function(a) {
          g.resolve({
            hasMore: b,
            messages: a || []
          })
        }).catch(function(a) {
          g.reject(h.toRealTimeError(a))
        })
      },
      onError: function() {
        g.reject(r.Error.SERVICE_UNAVAILABLE)
      }
    });
    return g.promise
  };
  n.prototype.onMessageReceived = function(a) {
    k.subscribe(r.Event.CHATROOM(this.id), a)
  };
  n.prototype.onMessage = n.prototype.onMessageReceived;

  function o(a) {
    b.setConnectionStatusListener({
      onChanged: function a(b) {
        switch (b) {
          case c.ConnectionStatus.CONNECTED:
            k.publish(r.Event.OPEN);
            break;
          case c.ConnectionStatus.CONNECTING:
            break;
          case c.ConnectionStatus.DISCONNECTED:
            k.publish(r.Event.ERROR, r.Error.CLOSED);
            break;
          case c.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
            k.publish(r.Event.Error, r.Error.OTHER_DEVICE_LOGIN);
            break;
          case c.ConnectionStatus.UNKNOWN_ERROR:
          default:
            k.publish(r.Event.ERROR, r.Error.UNKNOWN_ERROR);
            break
        }
      }
    });
    b.setOnReceiveMessageListener({
      onReceived: function c(d) {
        var e;
        var f;
        var g;
        var i;
        var j;
        if (d.messageType === b.MessageType.DiscussionNotificationMessage) {
          return
        }
        e = d.targetId;
        f = d.senderUserId;
        g = d.messageId;
        i = d.content;
        j = d.sentTime;
        h.getUserInfo(f).then(function(b) {
          var c = {
            sender: {
              senderId: f,
              contentId: g,
              content: i,
              sentAt: j,
              name: b.name,
              id: b.id,
              avatarUrl: b.avatarUrl
            },
            receiver: a.user
          };
          k.publish(r.Event.CHATROOM(e), c);
          k.publish(r.Event.MESSAGE, c)
        })
      }
    })
  }

  function p() {
    var a = d.defer();
    var c = b.getInstance;
    if (!c) {
      a.resolve();
      return a.promise
    }
    c().disconnect();
    setTimeout(function() {
      m = null;
      a.resolve()
    }, 800);
    return a.promise
  }

  function q(a) {
    var c = d.defer();
    if (a.user.token === m) {
      c.resolve();
      return c.promise
    }
    b.init(a.appId);
    b.connect(a.user.token, {
      onSuccess: function b(d) {
        m = a.user.token;
        c.resolve(d)
      },
      onError: function a(b) {
        var d = h.toRealTimeError(b);
        c.reject(d)
      }
    });
    o(a);
    return c.promise
  }

  function r() {
    this.Error = r.Error;
    this.Type = r.Type;
    this.Event = r.Event;
    this.ChatRoom = n
  }
  r.Error = {
    TIMEOUT: 0,
    CLOSED: 1,
    PROHIBITED: 2,
    UNKNOWN_ERROR: 3,
    SERVER_UNAVAILABLE: 4,
    UNAUTHENTICATED: 5,
    SERVICE_UNAVAILABLE: 6,
    OTHER_DEVICE_LOGIN: 7
  };
  r.Type = {
    CHATROOM: 11
  };
  r.Event = {
    OPEN: "ifr.realtime.open",
    ERROR: "ifr.realtime.error",
    MESSAGE: "ifr.realtime.message",
    INITIALIZED: "ifr.realtime.initialized",
    CHATROOM: function(a) {
      return "ifr.realtime.chatroom:" + a
    }
  };
  r.prototype.initialize = function(a) {
    this.options = a;
    q({
      appId: this.options.appId,
      user: this.options.user
    }).then(function() {
      k.publish(r.Event.INITIALIZED)
    }).catch(function(a) {
      k.publish(r.Event.ERROR, a)
    });
    return this
  };
  r.prototype.setupDefaultListeners = function() {
    console.error("RealTime#setupDefaultListeners has been deprecated")
  };
  r.prototype.on = function(a, b) {
    k.subscribe(a, b);
    return this
  };
  r.prototype.once = function(a, b) {
    k.subscribe(a, function() {
      b.apply(this, arguments);
      k.off(a)
    });
    return this
  };
  r.prototype.sendMessage = function(a, e, f) {
    var g = f || {};
    var i = g.beforeMessageSent ? g.beforeMessageSent(a) : a;
    var j = d.defer();
    b.getInstance().sendMessage(c.ConversationType.GROUP, e.id, c.TextMessage.obtain(i.content), null, {
      onSuccess: function a() {
        var b;
        b = g.afterMessageSent ? g.afterMessageSent(i) : i;
        j.resolve(b)
      },
      onError: function a(b) {
        var c = h.toRealTimeError(b);
        j.reject(c);
        k.publish(r.Event.ERROR, c)
      }
    });
    return j.promise
  };
  r.prototype.previewChatRoomMessages = function(a, b) {
    var c = b || {};
    var e = d.defer();
    e.reject("RealTime#previewChatRoomMessages has been deprecated");
    return e.promise
  };
  r.prototype.joinChatRoom = function(a) {
    var b = d.defer();
    var c = a.historyAmount || 10;
    f.api("join_chatroom", {
      type: "post",
      data: {
        post_id: a.roomId,
        user_id: this.options.user.id
      },
      success: function() {
        var d = new n({
          id: a.roomId
        });
        d.getHistoryMessages({
          limit: c
        }).then(function(a) {
          d.historyMessages = a;
          b.resolve(d)
        }).catch(function(a) {
          k.publish(r.Event.ERROR, a)
        })
      }
    });
    return b.promise
  };
  r.prototype.createChatRoom = function(a) {
    var b = d.defer();
    b.reject("Realtime#createChatRoom has been deprecated");
    return b.promise
  };
  r.prototype.disconnect = function() {
    var a = d.defer();
    console.error("RealTime#disconnect has been deprecated");
    return a.reject("RealTime#disconnect has been deprecated")
  };
  r.instance = null;
  r.getInstance = function() {
    if (!this.instance) {
      this.instance = new r
    }
    return this.instance
  };
  a.RealTime = r.getInstance()
})(window, RongIMClient, RongIMLib, RSVP, jQuery, IFR);
(function(a) {
  "use strict";
  var b = function(a) {
    var b = document.createElement("a");
    b.href = a;
    this.hostname = b.hostname;
    this.host = b.host;
    this.protocol = b.protocol;
    this.hash = b.hash;
    this.pathname = b.pathname;
    this.parameters = b.search;
    this.hostAndPath = b.hostname + b.pathname;
    this.protocolHostPath = b.protocol + "//" + b.hostname + b.pathname;
    this.parser = b
  };
  b.prototype.getParameter = function(a) {
    var b = this.parser.search.split(/\?|&/).filter(function(a) {
      return a.length !== 0
    });
    var c = null;
    b.map(function(b) {
      var d = new RegExp("^" + a + "=");
      if (c === null && b.match(d)) {
        c = b.replace(d, "")
      }
    });
    return c
  };
  a.UriParser = b
})(window);
(function(a, b) {
  "use strict";
  var c = {};
  var d = "SUCCEEDED";
  var e = "PROCESSING";
  var f = "FAILED";
  c.MESSAGE_STATUS_SUCCEEDED = d;
  c.MESSAGE_STATUS_PROCESSING = e;
  c.MESSAGE_STATUS_FAILED = f;
  c.NOTIFICATION_LOAD_USER_ERROR = "加载用户信息时失手了 :(";
  c.NOTIFICATION_CREATE_CHATROOM_ERROR = "创建实时讨论区失手了 :(";
  c.NOTIFICATION_JOIN_CHATROOM_ERROR = "加入实时讨论区失手了 :(";
  c.NOTIFICATION_SEND_MESSAGE_ERROR = "发送消息失手了 :(";
  c.NOTIFICATION_LOAD_HISTORY_ERROR = "加载历史消息失手了 :(";
  c.APP_ID = "pwe86ga5ed1j6";

  function g(a) {
    return i(a, new Date)
  }
  c.checkIsToday = g;

  function h(a) {
    var b = new Date;
    b.setDate(b.getDate() - 1);
    return i(a, b)
  }
  c.checkIsYesterday = h;

  function i(a, c) {
    var d = b(a);
    var e = b(c);
    return d.isSame(e, "day")
  }
  c.checkSameDay = i;

  function j(a) {
    var c = b(a);
    return c.diff(b(), "years") === 0
  }
  c.checkThisYear = j;

  function k(a) {
    var b;
    var c;
    if (typeof jQuery === "function" && a instanceof jQuery) {
      b = a[0]
    } else {
      b = a
    }
    c = b.offsetParent;
    return b.offsetTop - c.scrollTop <= 0
  }
  c.checkElementOverflowUp = k;

  function l(a) {
    var b;
    var c;
    if (typeof jQuery === "function" && a instanceof jQuery) {
      b = a[0]
    } else {
      b = a
    }
    c = b.offsetParent;
    return b.offsetTop - c.scrollTop - c.clientHeight >= 0
  }
  c.checkElementOverflowDown = l;

  function m(a) {
    return !k(a) && !l(a)
  }
  c.checkElementOverflowVisible = m;

  function n(a) {
    var b;
    var c;
    if (typeof jQuery === "function" && a instanceof jQuery) {
      b = a[0]
    } else {
      b = a
    }
    c = b.getBoundingClientRect();
    return c.top >= 0 && c.left >= 0 && c.bottom <= (window.innerHeight || document.documentElement.clientHeight) && c.right <= (window.innerWidth || document.documentElement.clientWidth)
  }
  c.checkElementViewportVisible = n;
  a.ChatRoomUtils = c
})(window, moment);
(function(a, b) {
  "use strict";
  var c = function() {};
  c.fn = c.prototype;
  c.fn.init = function() {
    b(".js-auto-expand-textarea").on("keyup", function() {
      b(this).height(0);
      b(this).height(this.scrollHeight - 10)
    });
    b(".auto-expand-textarea").keyup()
  };
  a.AutoExpandTextarea = c
})(window, jQuery);
(function(a, b, c) {
  "use strict";
  var d = {
    token: "AgWGc80go+7f7ueE/K8KpJRqp4WRpZLUJswZ6kkfgWNUcQ1KKroNYCb2M+tqvxLXqaFCIQ254cS8SXYitswpCQ==",
    id: "1",
    name: "ifanrx",
    avatarUrl: "http://cdn.ifanr.cn/ifanr/default_avatar.png"
  };
  var e = {
    token: "NoL5TEKjTrGj+FqISPQfVpRqp4WRpZLUJswZ6kkfgWNUcQ1KKroNYLTP7s8dYP8nQzWpiIsX5l9fd2K2YdAuWbxJdiK2zCkJ",
    id: "1091431",
    name: "ifanrx2",
    avatarUrl: "http://cdn.ifanr.cn/ifanr/default_avatar.png"
  };
  var f = {
    token: "1WK1ruMITEs0ywZokjr3uYQ9BGZsNaXrqSamvA/xRS2cOs+UM84Qwgx5RdJGumG+6Cl8rZLbyCU=",
    id: "3",
    name: "ifanrx3",
    avatarUrl: "http://cdn.ifanr.cn/ifanr/default_avatar.png"
  };
  var g = function(a) {
    var b = this;
    var c = b.getDefaultUser(a);
    if (c) {
      b.assignUserToThis(c)
    } else {}
  };
  g.fn = g.prototype;
  g.fn.loadUserInfo = function(a) {
    var b = this;
    var d = c.defer();
    var e;
    if (a) {
      e = b.getDefaultUser(a);
      b.assignUserToThis(e);
      d.resolve(b)
    } else {
      b.id = IFR.user.id;
      b.name = IFR.user.name;
      b.avatarUrl = IFR.user.avatarUrl;
      IFR.api("get_realtime_token", {
        data: {
          sso_id: b.id
        },
        success: function(a) {
          b.token = a.data.token;
          d.resolve(b)
        },
        error: function(a) {
          d.reject(a)
        }
      })
    }
    return d.promise
  };
  g.fn.loadUserToken = function(a, b) {
    var d = this;
    var e = c.defer();
    this.id = a.id;
    this.name = a.name;
    this.avatarUrl = a.avatarUrl;
    this.id = String(this.id);
    if (b) {
      this.token = a.token;
      e.resolve(this)
    } else {
      IFR.api("get_realtime_token", {
        data: {
          sso_id: this.id
        },
        success: function(a) {
          d.token = a.data.token;
          e.resolve(d)
        },
        error: function(a) {
          e.reject(a)
        }
      })
    }
    return e.promise
  };
  g.fn.getDefaultUser = function(a) {
    var b;
    switch (a) {
      case 1:
        b = d;
        break;
      case 2:
        b = e;
        break;
      case 3:
        b = f;
        break;
      default:
        b = null
    }
    return b
  };
  g.fn.assignUserToThis = function(a) {
    this.id = a.id;
    this.token = a.token;
    this.name = a.name;
    this.avatarUrl = a.avatarUrl
  };
  a.ChatRoomUser = g
})(window, jQuery, RSVP);
(function(a) {
  "use strict";
  var b = function(a, b, c, d) {
    this.id = a;
    this.content = b;
    this.sentAt = c;
    this.sender = d
  };
  a.Message = b
})(window);
(function(a) {
  "use strict";
  var b = function(a, c) {
    this.time = a;
    this.messages = c;
    this.htmlId = "message-group-" + b.getUniqueMessageGroupId()
  };
  var c = 0;
  b.getUniqueMessageGroupId = function() {
    return c++
  };
  a.MessageGroup = b
})(window);
(function(a, b, c, d) {
  "use strict";
  var e = function() {};
  e.fn = e.prototype;
  e.fn.init = function(a, c, d) {
    var e = this;
    e.firstGroup = null;
    e.lastGroup = null;
    e.$displayArea = b(".chatroom-display-area");
    e.$loadMore = b(".chatroom-load-more");
    e.userInfo = c;
    e.messagesCache = a;
    e.resendMessageDelegate = d;
    e.templateConfigs = e.getTemplateConfigs();
    e.initialize()
  };
  e.fn.pullHistory = function(a) {
    var b = this;
    var c = "";
    var d;
    if (!a || a.length === 0) {} else {
      d = b.beforeGroup(b.firstGroup, a);
      d.forEach(function(a) {
        a.messages.forEach(function(a) {
          a.timeStr = b.getMessageTimeString(a.sentAt);
          a.left = a.sender.id !== b.userInfo.id
        });
        c += template(b.templateConfigs.messageGroup, a)
      });
      if (b.firstGroup) {
        f(b.firstGroup).replaceWith(c)
      } else {
        b.$loadMore.after(c)
      }
      b.firstGroup = d[0];
      if (!b.lastGroup) {
        b.lastGroup = d[d.length - 1]
      }
    }
  };
  e.fn.receiveMessage = function(a) {
    var b = this;
    var d;
    var e;
    var g = {
      messageId: a.id,
      content: a.content,
      sentAt: a.sentAt,
      timeStr: b.getMessageTimeString(a.sentAt),
      left: a.sender.id !== b.userInfo.id,
      sender: a.sender
    };
    if (b.checkMessageInGroup(a, b.lastGroup)) {
      e = g.left ? b.templateConfigs.messageLeft : b.templateConfigs.messageRight;
      d = template(e, g);
      f(b.lastGroup).append(d)
    } else {
      b.lastGroup = new c(b.getGroupTimeString(a.sentAt), [g]);
      d = template(b.templateConfigs.messageGroup, b.lastGroup);
      b.$displayArea.append(d)
    }
  };
  e.fn.sendMessage = function(a) {
    var b = this;
    var e;
    var g = {
      messageId: a.id,
      content: a.content,
      sentAt: a.sentAt,
      timeStr: b.getMessageTimeString(a.sentAt),
      processing: a.status === d.MESSAGE_STATUS_PROCESSING,
      failed: a.status === d.MESSAGE_STATUS_FAILED,
      left: false,
      sender: a.sender
    };
    if (b.checkMessageInGroup(a, b.lastGroup)) {
      e = template(b.templateConfigs.messageRight, g);
      f(b.lastGroup).append(e)
    } else {
      b.lastGroup = new c(b.getGroupTimeString(a.sentAt), [g]);
      e = template(b.templateConfigs.messageGroup, b.lastGroup);
      b.$displayArea.append(e)
    }
  };
  e.fn.modifyMessageStatus = function(a, c) {
    var e = this;
    var f;
    var g = b("#" + a);
    var h;
    var i;
    e.messagesCache.every(function(b) {
      if (b.id === a) {
        f = b;
        return false
      }
      return true
    });
    h = {
      messageId: a,
      content: f.content,
      left: false,
      sentAt: f.sentAt,
      timeStr: e.getMessageTimeString(f.sentAt),
      processing: c === d.MESSAGE_STATUS_PROCESSING,
      failed: c === d.MESSAGE_STATUS_FAILED,
      sender: f.sender
    };
    i = template(e.getTemplateConfigs().messageRight, h);
    g.replaceWith(i);
    g = b("#" + a);
    switch (c) {
      case d.MESSAGE_STATUS_PROCESSING:
        break;
      case d.MESSAGE_STATUS_FAILED:
        g.find(".js-resend").on("click", function() {
          e.resendMessageDelegate(a);
          e.modifyMessageStatus(a, d.MESSAGE_STATUS_PROCESSING)
        }.bind(e));
        break;
      case d.MESSAGE_STATUS_SUCCEEDED:
      default:
        break
    }
  };
  e.fn.scrollToBottom = function(a) {
    var c = this;
    var d = b(".chatroom-display-area .chatroom-messages-group");
    var e = 0;
    if (a !== 0 && !a) {
      a = "normal"
    }
    d.each(function() {
      e += b(this).height()
    });
    c.$displayArea.animate({
      scrollTop: e
    }, a)
  };

  function f(a) {
    return b("#" + a.htmlId)
  }
  e.fn.checkMessageInGroup = function(a, b) {
    var c;
    var d;
    var e;
    if (!a || !b) {
      return false
    }
    c = b.messages[b.messages.length - 1];
    d = this.getGroupTimeString(c.sentAt);
    e = this.getGroupTimeString(a.sentAt);
    return d === e
  };
  e.fn.initialize = function() {};
  e.fn.getTemplateConfigs = function() {
    console.error("Should override this method")
  };
  e.fn.beforeGroup = function(a, b) {
    console.error("Should override this method")
  };
  e.fn.getMessageTimeString = function(a) {
    console.error("Should override this method")
  };
  e.fn.getGroupTimeString = function(a) {
    console.error("Should override this method")
  };
  a.ChatRoomDisplayArea = e
})(window, jQuery, window.MessageGroup, window.ChatRoomUtils);
(function(a, b) {
  "use strict";
  var c = "load-more-hidden";
  var d = function() {};
  d.fn = d.prototype;
  d.isLoading = null;
  d.$btn = null;
  d.$hint = null;
  d.fn.init = function(a) {
    var d = this;
    d.isLoading = false;
    d.$btn = b(".js-chatroom-load-more");
    d.$hint = b(".js-chatroom-load-more-hint");
    d.$btn.on("click", d.loadMore.bind(d, a));
    d.$btn.addClass(c)
  };
  d.fn.loadMore = function(a) {
    var b = this;
    if (b.isLoading) {
      return
    }
    b.isLoading = true;
    b.$btn.addClass(c);
    b.$hint.removeClass(c);
    if (a) {
      a(b.onLoaded.bind(b))
    }
  };
  d.fn.onLoaded = function() {
    var a = this;
    a.isLoading = false;
    a.$btn.removeClass(c);
    a.$hint.addClass(c)
  };
  d.fn.disable = function() {
    var a = this;
    a.isLoading = false;
    a.$btn.addClass(c);
    a.$hint.removeClass(c);
    a.$hint.html("已加载全部讨论")
  };
  a.ChatRoomLoadMore = d
})(window, jQuery);
(function(a, b) {
  "use strict";
  var c = "chatroom-hide";
  var d = function() {};
  d.fn = d.prototype;
  d.fn.$notification = null;
  d.fn.init = function() {
    this.$notification = b(".js-chatroom-notification");
    this.$notification.addClass(c)
  };
  d.fn.show = function(a, b) {
    var d = this;
    d.$notification.html(a);
    d.$notification.removeClass(c);
    if (b && b > 0) {
      setTimeout(function() {
        d.$notification.addClass(c)
      }, b * 1e3)
    }
  };
  d.fn.hide = function() {
    this.$notification.addClass(c)
  };
  a.ChatRoomNotification = d
})(window, jQuery);
(function(a, b, c, d, e) {
  "use strict";
  var f = function() {};
  f.fn = f.prototype;
  f.fn.userInfo = {};
  f.fn.postInfo = {
    title: ns.postTitle,
    id: ns.postId
  };
  f.fn.messages = null;
  f.fn.chatroom = null;
  f.inputBox = null;
  f.displayArea = null;
  f.fn.initChatRoom = function() {
    var a = this;
    var b = {
      appId: c.APP_ID,
      user: a.userInfo
    };
    console.log("try connect");
    d.initialize(b).once(d.Event.INITIALIZED, a.onOpen.bind(a))
  };
  f.fn.onOpen = function() {
    var a = this;
    var b = {
      roomId: ns.chatroomId,
      name: ns.postTitle,
      historyAmount: 10
    };
    console.log("on open");
    a.loadmore.loadMore();
    d.joinChatRoom(b).then(function(b) {
      var c = b.historyMessages.messages;
      var d = b.historyMessages.hasMore;
      a.chatroom = b;
      a.messages.splice(0, a.messages.length);
      c.forEach(function(b) {
        a.messages.push(b)
      });
      a.chatroom.onMessageReceived(a.onChatroomMessage.bind(a));
      a.displayArea.pullHistory(c);
      a.displayArea.scrollToBottom(0);
      if (!d) {
        a.loadmore.disable()
      } else {
        a.loadmore.onLoaded()
      }
      console.log("joined!!!");
      a.onChatRoomSetup()
    }).catch(function(b) {
      console.log("RealTime Error: join chat room: ", b);
      a.notification.show(c.NOTIFICATION_JOIN_CHATROOM_ERROR)
    })
  };
  f.fn.initChatRoomForDisplay = function(a) {
    var b = this;
    var e = {
      appId: c.APP_ID,
      user: b.userInfo
    };
    console.log("try connect for display!");
    d.initialize(e).once(d.Event.OPEN, b.onOpenForDisplay.bind(b, a)).on(d.Event.ERROR, b.onError.bind(b))
  };
  f.fn.onOpenForDisplay = function(a) {
    var b = this;
    var c = {
      id: ns.chatroomId
    };
    var e = {
      limit: 3
    };
    console.log("on open for display");
    d.previewChatRoomMessages(c, e).then(function(c) {
      var d = c.historyMessages.messages;
      b.chatroom = c;
      a(d)
    }).catch(function(a) {
      b.indicator.switchState(ChatRoomIndicator.State.ERROR);
      console.log("RealTime Error: preview history messages: ", a)
    })
  };
  f.fn.onError = function(a) {
    console.log("IM error: ", a)
  };
  f.fn.onChatroomMessage = function(a) {
    var b = this;
    var d = a.sender;
    var e = {
      id: d.id,
      content: d.content,
      sentAt: d.sentAt,
      sender: {
        id: d.senderId,
        name: d.name,
        avatarUrl: d.avatarUrl
      },
      status: c.MESSAGE_STATUS_SUCCEEDED
    };
    console.log("receive msg", a);
    if (b.getMessageById(e.contentId)) {
      return
    }
    b.messages.push(e);
    b.displayArea.receiveMessage(e);
    b.displayArea.scrollToBottom()
  };
  f.fn.submitMessage = function(a) {
    var b = this;
    var f;
    var g = {
      id: e.generateMessageUniqueId(),
      content: a,
      status: c.MESSAGE_STATUS_PROCESSING,
      sentAt: new Date,
      sender: b.userInfo
    };
    b.messages.push(g);
    b.displayArea.sendMessage(g);
    b.displayArea.scrollToBottom();
    console.log("sending msg: ", g);
    f = {
      id: b.chatroom.id
    };
    d.sendMessage(g, f).then(function() {
      console.log("msg sent");
      b.displayArea.modifyMessageStatus(g.id, c.MESSAGE_STATUS_SUCCEEDED)
    }).catch(function() {
      b.notification.show(c.NOTIFICATION_SEND_MESSAGE_ERROR, 5);
      b.displayArea.modifyMessageStatus(g.id, c.MESSAGE_STATUS_FAILED)
    })
  };
  f.fn.resendMessage = function(a) {
    var b = this;
    var e = b.getMessageById(a);
    var f = {
      id: b.chatroom.id
    };
    var g;
    if (!e) {
      g = this.getMessageContentByIdFromHtml(a);
      if (g) {
        e = {
          id: a,
          content: g,
          sentAt: new Date,
          sender: this.userInfo
        }
      }
      this.messages.push(e)
    }
    if (!e) {
      b.notification.show(c.NOTIFICATION_SEND_MESSAGE_ERROR, 5);
      return
    }
    console.log("Resending msg", e);
    d.sendMessage(e, f).then(function() {
      b.notification.hide();
      b.displayArea.modifyMessageStatus(a, c.MESSAGE_STATUS_SUCCEEDED)
    }).catch(function(d) {
      b.notification.show(c.NOTIFICATION_SEND_MESSAGE_ERROR, 5);
      b.displayArea.modifyMessageStatus(a, c.MESSAGE_STATUS_FAILED);
      console.log("Resend message Error", d)
    })
  };
  f.fn.writeMessage = function() {
    this.displayArea.scrollToBottom()
  };
  f.fn.scrollDisplayArea = function() {
    this.inputBox.quitWrite()
  };
  f.fn.clickDisplayArea = function() {
    this.inputBox.quitWrite()
  };
  f.fn.LoadMoreHistory = function() {
    var a = this;
    var b = {
      limit: this.messages.length + 10,
      skip: this.messages.length
    };
    a.chatroom.getHistoryMessages(b).then(function(b) {
      a.displayArea.pullHistory(b.messages);
      if (b.hasMore) {
        a.loadmore.onLoaded()
      } else {
        a.loadmore.disable()
      }
    }).catch(function(b) {
      a.notification.show(c.NOTIFICATION_LOAD_HISTORY_ERROR);
      console.log("Load History Error", b)
    })
  };
  f.fn.onChatRoomSetup = function() {
    console.log("onChatRoomSetup: This can be override.")
  };
  f.fn.getMessageById = function(a) {
    var b;
    this.messages.every(function(c) {
      if (c.id === a) {
        b = c;
        return false
      }
      return true
    });
    return b
  };
  f.fn.getMessageContentByIdFromHtml = function(a) {
    var c = b("#" + a);
    var d;
    if (c.length > 0) {
      d = c.find(".chatroom-message-content")
    }
    return d.html()
  };
  f.fn.toLocalMessageFormat = function(a, b) {
    return {
      id: a.id,
      content: a.content,
      senderId: a.sender.id,
      senderName: a.sender.name,
      senderAvatarUri: a.sender.avatarUrl,
      sentAt: a.sentAt,
      status: b
    }
  };
  f.fn.setupTestMessages = function(a) {
    a.messages = [{
      id: "m0",
      content: "Hello World!",
      sentAt: new Date(2014, 10, 17, 7, 32),
      sender: {
        id: "u0",
        name: "user1",
        avatarUrl: "http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/gravatar.jpg"
      }
    }, {
      id: "m2",
      content: "Wahaha!",
      sentAt: new Date(2014, 10, 17, 7, 33),
      sender: {
        id: "u1",
        name: "user2",
        avatarUrl: "http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/gravatar.jpg"
      }
    }, {
      id: "m3",
      content: "Enenene!!!",
      sentAt: new Date(2014, 10, 17, 7, 34),
      sender: {
        id: "u1",
        name: "user2",
        avatarUrl: "http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/gravatar.jpg"
      }
    }, {
      id: "m4",
      content: "Hello ?",
      sentAt: new Date(2015, 10, 17, 7, 34),
      sender: {
        id: "u2",
        name: "user3",
        avatarUrl: "http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/gravatar.jpg"
      }
    }]
  };
  f.fn.testDisplayArea = function(a) {
    a.displayArea.pullHistory(a.messages);
    a.displayArea.receiveMessage({
      id: "m00",
      content: "Received 1",
      sentAt: new Date,
      sender: {
        id: "u1",
        name: "Wahaha",
        avatarUri: "http://cdn.ifanr.cn/ifanr/default_avatar.png"
      }
    });
    a.displayArea.receiveMessage({
      id: "m020",
      content: "Received 2",
      sentAt: new Date,
      sender: {
        id: "u1",
        name: "Wahaha",
        avatarUri: "http://cdn.ifanr.cn/ifanr/default_avatar.png"
      }
    });
    a.chatroom = {
      id: "FAKE_CHATROOM_ID_123"
    }
  };
  f.fn.checkUserLogin = function() {
    return true
  };
  a.ChatRoomMain = f
})(window, jQuery, window.ChatRoomUtils, RealTime, RealTimeUtitlies);
(function(a, b) {
  "use strict";
  var c = "#intro-";
  var d = "ifr-about-no-display";
  var e = "ifr-about-products-btn-active";
  var f = "ifr-about-team-members-container-expand";
  var g = "ifanr2015-fanhuidingbu";
  var h = "ifanr2015-down1";
  var i = "展开查看全部";
  var j = "收起";
  var k = function(a) {
    this.cacheDOMs();
    this.initProductIntro();
    this.initTeamMembers();
    this.isMobile = Boolean(a) ? a.isMobile : false
  };
  k.fn = k.prototype;
  k.fn.cacheDOMs = function() {
    this.$productBtns = b(".ifr-about-products-btn");
    this.$teamContainer = b(".ifr-about-team-members-container");
    this.$teamMembers = b(".ifr-about-team-member");
    this.$teamMemberAvatars = b(".ifr-about-team-member-avatar");
    this.$teamMoreBtn = b(".ifr-about-team-more");
    this.$teamMoreDescription = b(".ifr-about-team-more-description");
    this.$teamMoreTriangle = b(".ifr-about-team-more-triangle")
  };
  k.fn.initProductIntro = function() {
    this.$productBtns.on("click", this.onProductButtonClick.bind(this))
  };
  k.fn.initTeamMembers = function() {
    this.teamExpanded = false;
    this.$teamMoreBtn.on("click", this.onTeamMoreButtonClick.bind(this))
  };
  k.fn.onProductButtonClick = function(a) {
    var f = b(a.currentTarget);
    var g = f.data("product-id");
    var h = b(c + g);
    h.removeClass(d).siblings().addClass(d);
    f.addClass(e).siblings().removeClass(e)
  };
  k.fn.onTeamMoreButtonClick = function() {
    var a = this.teamExpanded;
    this.$teamContainer.removeClass(a ? f : "");
    this.$teamContainer.addClass(a ? "" : f);
    this.$teamMoreDescription.html(a ? i : j);
    this.$teamMoreTriangle.removeClass(a ? g : h);
    this.$teamMoreTriangle.addClass(a ? h : g);
    this.teamExpanded = !this.teamExpanded
  };
  a.AboutTeam = k
})(window, jQuery);
//# sourceMappingURL=common-min-1506586277020.js.map