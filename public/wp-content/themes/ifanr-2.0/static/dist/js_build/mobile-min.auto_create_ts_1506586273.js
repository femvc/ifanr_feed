function Swipe(a, b) {
  "use strict";
  var c = function() {};
  var d = function(a) {
    setTimeout(a || c, 0)
  };
  var e = {
    addEventListener: !!window.addEventListener,
    touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: function(a) {
      var b = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
      for (var c in b)
        if (a.style[b[c]] !== undefined) return true;
      return false
    }(document.createElement("swipe"))
  };
  if (!a) return;
  var f = a.children[0];
  var g, h, i, j;
  b = b || {};
  var k = parseInt(b.startSlide, 10) || 0;
  var l = b.speed || 300;
  b.continuous = b.continuous !== undefined ? b.continuous : true;

  function m() {
    g = f.children;
    j = g.length;
    if (g.length < 2) b.continuous = false;
    if (e.transitions && b.continuous && g.length < 3) {
      f.appendChild(g[0].cloneNode(true));
      f.appendChild(f.children[1].cloneNode(true));
      g = f.children
    }
    h = new Array(g.length);
    i = a.getBoundingClientRect().width || a.offsetWidth;
    f.style.width = g.length * i + "px";
    var c = g.length;
    while (c--) {
      var d = g[c];
      d.style.width = i + "px";
      d.setAttribute("data-index", c);
      if (e.transitions) {
        d.style.left = c * -i + "px";
        r(c, k > c ? -i : k < c ? i : 0, 0)
      }
    }
    if (b.continuous && e.transitions) {
      r(p(k - 1), -i, 0);
      r(p(k + 1), i, 0)
    }
    if (!e.transitions) f.style.left = k * -i + "px";
    a.style.visibility = "visible"
  }

  function n() {
    if (b.continuous) q(k - 1);
    else if (k) q(k - 1)
  }

  function o() {
    if (b.continuous) q(k + 1);
    else if (k < g.length - 1) q(k + 1)
  }

  function p(a) {
    return (g.length + a % g.length) % g.length
  }

  function q(a, c) {
    if (k == a) return;
    if (e.transitions) {
      var f = Math.abs(k - a) / (k - a);
      if (b.continuous) {
        var j = f;
        f = -h[p(a)] / i;
        if (f !== j) a = -f * g.length + a
      }
      var m = Math.abs(k - a) - 1;
      while (m--) r(p((a > k ? a : k) - m - 1), i * f, 0);
      a = p(a);
      r(k, i * f, c || l);
      r(a, 0, c || l);
      if (b.continuous) r(p(a - f), -(i * f), 0)
    } else {
      a = p(a);
      t(k * -i, a * -i, c || l)
    }
    k = a;
    d(b.callback && b.callback(k, g[k]))
  }

  function r(a, b, c) {
    s(a, b, c);
    h[a] = b
  }

  function s(a, b, c) {
    var d = g[a];
    var e = d && d.style;
    if (!e) return;
    e.webkitTransitionDuration = e.MozTransitionDuration = e.msTransitionDuration = e.OTransitionDuration = e.transitionDuration = c + "ms";
    e.webkitTransform = "translate(" + b + "px,0)" + "translateZ(0)";
    e.msTransform = e.MozTransform = e.OTransform = "translateX(" + b + "px)"
  }

  function t(a, c, d) {
    if (!d) {
      f.style.left = c + "px";
      return
    }
    var e = +new Date;
    var h = setInterval(function() {
      var i = +new Date - e;
      if (i > d) {
        f.style.left = c + "px";
        if (u) w();
        b.transitionEnd && b.transitionEnd.call(event, k, g[k]);
        clearInterval(h);
        return
      }
      f.style.left = (c - a) * (Math.floor(i / d * 100) / 100) + a + "px"
    }, 4)
  }
  var u = b.auto || 0;
  var v;

  function w() {
    v = setTimeout(o, u)
  }

  function x() {
    u = 0;
    clearTimeout(v)
  }
  var y = {};
  var z = {};
  var A;
  var B = {
    handleEvent: function(a) {
      switch (a.type) {
        case "touchstart":
          this.start(a);
          break;
        case "touchmove":
          this.move(a);
          break;
        case "touchend":
          d(this.end(a));
          break;
        case "webkitTransitionEnd":
        case "msTransitionEnd":
        case "oTransitionEnd":
        case "otransitionend":
        case "transitionend":
          d(this.transitionEnd(a));
          break;
        case "resize":
          d(m);
          break
      }
      if (b.stopPropagation) a.stopPropagation()
    },
    start: function(a) {
      var b = a.touches[0];
      y = {
        x: b.pageX,
        y: b.pageY,
        time: +new Date
      };
      A = undefined;
      z = {};
      f.addEventListener("touchmove", this, false);
      f.addEventListener("touchend", this, false)
    },
    move: function(a) {
      if (a.touches.length > 1 || a.scale && a.scale !== 1) return;
      if (b.disableScroll) a.preventDefault();
      var c = a.touches[0];
      z = {
        x: c.pageX - y.x,
        y: c.pageY - y.y
      };
      if (typeof A == "undefined") {
        A = !!(A || Math.abs(z.x) < Math.abs(z.y))
      }
      if (!A) {
        a.preventDefault();
        x();
        if (b.continuous) {
          s(p(k - 1), z.x + h[p(k - 1)], 0);
          s(k, z.x + h[k], 0);
          s(p(k + 1), z.x + h[p(k + 1)], 0)
        } else {
          z.x = z.x / (!k && z.x > 0 || k == g.length - 1 && z.x < 0 ? Math.abs(z.x) / i + 1 : 1);
          s(k - 1, z.x + h[k - 1], 0);
          s(k, z.x + h[k], 0);
          s(k + 1, z.x + h[k + 1], 0)
        }
      }
    },
    end: function(a) {
      var c = +new Date - y.time;
      var d = Number(c) < 250 && Math.abs(z.x) > 20 || Math.abs(z.x) > i / 2;
      var e = !k && z.x > 0 || k == g.length - 1 && z.x < 0;
      if (b.continuous) e = false;
      var j = z.x < 0;
      if (!A) {
        if (d && !e) {
          if (j) {
            if (b.continuous) {
              r(p(k - 1), -i, 0);
              r(p(k + 2), i, 0)
            } else {
              r(k - 1, -i, 0)
            }
            r(k, h[k] - i, l);
            r(p(k + 1), h[p(k + 1)] - i, l);
            k = p(k + 1)
          } else {
            if (b.continuous) {
              r(p(k + 1), i, 0);
              r(p(k - 2), -i, 0)
            } else {
              r(k + 1, i, 0)
            }
            r(k, h[k] + i, l);
            r(p(k - 1), h[p(k - 1)] + i, l);
            k = p(k - 1)
          }
          b.callback && b.callback(k, g[k])
        } else {
          if (b.continuous) {
            r(p(k - 1), -i, l);
            r(k, 0, l);
            r(p(k + 1), i, l)
          } else {
            r(k - 1, -i, l);
            r(k, 0, l);
            r(k + 1, i, l)
          }
        }
      }
      f.removeEventListener("touchmove", B, false);
      f.removeEventListener("touchend", B, false)
    },
    transitionEnd: function(a) {
      if (parseInt(a.target.getAttribute("data-index"), 10) == k) {
        if (u) w();
        b.transitionEnd && b.transitionEnd.call(a, k, g[k])
      }
    }
  };
  m();
  if (u) w();
  if (e.addEventListener) {
    if (e.touch) f.addEventListener("touchstart", B, false);
    if (e.transitions) {
      f.addEventListener("webkitTransitionEnd", B, false);
      f.addEventListener("msTransitionEnd", B, false);
      f.addEventListener("oTransitionEnd", B, false);
      f.addEventListener("otransitionend", B, false);
      f.addEventListener("transitionend", B, false)
    }
    window.addEventListener("resize", B, false)
  } else {
    window.onresize = function() {
      m()
    }
  }
  return {
    setup: function() {
      m()
    },
    slide: function(a, b) {
      x();
      q(a, b)
    },
    prev: function() {
      x();
      n()
    },
    next: function() {
      x();
      o()
    },
    stop: function() {
      x()
    },
    getPos: function() {
      return k
    },
    getNumSlides: function() {
      return j
    },
    kill: function() {
      x();
      f.style.width = "";
      f.style.left = "";
      var a = g.length;
      while (a--) {
        var b = g[a];
        b.style.width = "";
        b.style.left = "";
        if (e.transitions) s(a, 0, 0)
      }
      if (e.addEventListener) {
        f.removeEventListener("touchstart", B, false);
        f.removeEventListener("webkitTransitionEnd", B, false);
        f.removeEventListener("msTransitionEnd", B, false);
        f.removeEventListener("oTransitionEnd", B, false);
        f.removeEventListener("otransitionend", B, false);
        f.removeEventListener("transitionend", B, false);
        window.removeEventListener("resize", B, false)
      } else {
        window.onresize = null
      }
    }
  }
}
if (window.jQuery || window.Zepto) {
  (function(a) {
    a.fn.Swipe = function(b) {
      return this.each(function() {
        a(this).data("Swipe", new Swipe(a(this)[0], b))
      })
    }
  })(window.jQuery || window.Zepto)
}! function() {
  function a(b) {
    if (!(this instanceof a)) return null == b ? new a : new a(b);
    if ("function" == typeof b) return this.random = b, this;
    arguments.length && (this.seed = 0);
    for (var c = 0; c < arguments.length; c++) {
      var d = 0;
      if ("[object String]" === Object.prototype.toString.call(arguments[c]))
        for (var e = 0; e < arguments[c].length; e++) {
          for (var f = 0, g = 0; g < arguments[c].length; g++) f = arguments[c].charCodeAt(g) + (f << 6) + (f << 16) - f;
          d += f
        } else d = arguments[c];
      this.seed += (arguments.length - c) * d
    }
    return this.mt = this.mersenne_twister(this.seed), this.bimd5 = this.blueimp_md5(), this.random = function() {
      return this.mt.random(this.seed)
    }, this
  }

  function b(a, b) {
    if (a || (a = {}), b)
      for (var c in b) "undefined" == typeof a[c] && (a[c] = b[c]);
    return a
  }

  function c(a, b) {
    if (a) throw new RangeError(b)
  }

  function d(a) {
    return function() {
      return this.natural(a)
    }
  }

  function e(a, b) {
    for (var c, d = r(a), e = 0, f = d.length; f > e; e++) c = d[e], b[c] = a[c] || b[c]
  }

  function f(a, b) {
    for (var c = 0, d = a.length; d > c; c++) b[c] = a[c]
  }

  function g(a, b) {
    var c = Array.isArray(a),
      d = b || (c ? new Array(a.length) : {});
    return c ? f(a, d) : e(a, d), d
  }
  var h = 9007199254740992,
    i = -h,
    j = "0123456789",
    k = "abcdefghijklmnopqrstuvwxyz",
    l = k.toUpperCase(),
    m = j + "abcdef",
    n = Array.prototype.slice;
  a.prototype.VERSION = "1.0.3";
  var o = function() {
    throw new Error("No Base64 encoder available.")
  };
  ! function() {
    "function" == typeof btoa ? o = btoa : "function" == typeof Buffer && (o = function(a) {
      return new Buffer(a).toString("base64")
    })
  }(), a.prototype.bool = function(a) {
    return a = b(a, {
      likelihood: 50
    }), c(a.likelihood < 0 || a.likelihood > 100, "Chance: Likelihood accepts values from 0 to 100."), 100 * this.random() < a.likelihood
  }, a.prototype.character = function(a) {
    a = b(a), c(a.alpha && a.symbols, "Chance: Cannot specify both alpha and symbols.");
    var d, e, f = "!@#$%^&*()[]";
    return d = "lower" === a.casing ? k : "upper" === a.casing ? l : k + l, e = a.pool ? a.pool : a.alpha ? d : a.symbols ? f : d + j + f, e.charAt(this.natural({
      max: e.length - 1
    }))
  }, a.prototype.floating = function(a) {
    a = b(a, {
      fixed: 4
    }), c(a.fixed && a.precision, "Chance: Cannot specify both fixed and precision.");
    var d, e = Math.pow(10, a.fixed),
      f = h / e,
      g = -f;
    c(a.min && a.fixed && a.min < g, "Chance: Min specified is out of range with fixed. Min should be, at least, " + g), c(a.max && a.fixed && a.max > f, "Chance: Max specified is out of range with fixed. Max should be, at most, " + f), a = b(a, {
      min: g,
      max: f
    }), d = this.integer({
      min: a.min * e,
      max: a.max * e
    });
    var i = (d / e).toFixed(a.fixed);
    return parseFloat(i)
  }, a.prototype.integer = function(a) {
    return a = b(a, {
      min: i,
      max: h
    }), c(a.min > a.max, "Chance: Min cannot be greater than Max."), Math.floor(this.random() * (a.max - a.min + 1) + a.min)
  }, a.prototype.natural = function(a) {
    return a = b(a, {
      min: 0,
      max: h
    }), c(a.min < 0, "Chance: Min cannot be less than zero."), this.integer(a)
  }, a.prototype.string = function(a) {
    a = b(a, {
      length: this.natural({
        min: 5,
        max: 20
      })
    }), c(a.length < 0, "Chance: Length cannot be less than zero.");
    var d = a.length,
      e = this.n(this.character, d, a);
    return e.join("")
  }, a.prototype.capitalize = function(a) {
    return a.charAt(0).toUpperCase() + a.substr(1)
  }, a.prototype.mixin = function(b) {
    for (var c in b) a.prototype[c] = b[c];
    return this
  }, a.prototype.unique = function(a, b, d) {
    c("function" != typeof a, "Chance: The first argument must be a function.");
    var e = function(a, b) {
      return -1 !== a.indexOf(b)
    };
    d && (e = d.comparator || e);
    for (var f, g = [], h = 0, i = 50 * b, j = n.call(arguments, 2); g.length < b;) {
      var k = JSON.parse(JSON.stringify(j));
      if (f = a.apply(this, k), e(g, f) || (g.push(f), h = 0), ++h > i) throw new RangeError("Chance: num is likely too large for sample set")
    }
    return g
  }, a.prototype.n = function(a, b) {
    c("function" != typeof a, "Chance: The first argument must be a function."), "undefined" == typeof b && (b = 1);
    var d = b,
      e = [],
      f = n.call(arguments, 2);
    for (d = Math.max(0, d), null; d--; null) e.push(a.apply(this, f));
    return e
  }, a.prototype.pad = function(a, b, c) {
    return c = c || "0", a += "", a.length >= b ? a : new Array(b - a.length + 1).join(c) + a
  }, a.prototype.pick = function(a, b) {
    if (0 === a.length) throw new RangeError("Chance: Cannot pick() from an empty array");
    return b && 1 !== b ? this.shuffle(a).slice(0, b) : a[this.natural({
      max: a.length - 1
    })]
  }, a.prototype.pickone = function(a) {
    if (0 === a.length) throw new RangeError("Chance: Cannot pickone() from an empty array");
    return a[this.natural({
      max: a.length - 1
    })]
  }, a.prototype.pickset = function(a, b) {
    if (0 === b) return [];
    if (0 === a.length) throw new RangeError("Chance: Cannot pickset() from an empty array");
    if (0 > b) throw new RangeError("Chance: count must be positive number");
    return b && 1 !== b ? this.shuffle(a).slice(0, b) : [this.pickone(a)]
  }, a.prototype.shuffle = function(a) {
    for (var b = a.slice(0), c = [], d = 0, e = Number(b.length), f = 0; e > f; f++) d = this.natural({
      max: b.length - 1
    }), c[f] = b[d], b.splice(d, 1);
    return c
  }, a.prototype.weighted = function(a, b, c) {
    if (a.length !== b.length) throw new RangeError("Chance: length of array and weights must match");
    for (var d, e = 0, f = 0; f < b.length; ++f) d = b[f], d > 0 && (e += d);
    if (0 === e) throw new RangeError("Chance: no valid entries in array weights");
    var g, h = this.random() * e,
      i = 0,
      j = -1;
    for (f = 0; f < b.length; ++f) {
      if (d = b[f], i += d, d > 0) {
        if (i >= h) {
          g = f;
          break
        }
        j = f
      }
      f === b.length - 1 && (g = j)
    }
    var k = a[g];
    return c = "undefined" == typeof c ? !1 : c, c && (a.splice(g, 1), b.splice(g, 1)), k
  }, a.prototype.paragraph = function(a) {
    a = b(a);
    var c = a.sentences || this.natural({
        min: 3,
        max: 7
      }),
      d = this.n(this.sentence, c);
    return d.join(" ")
  }, a.prototype.sentence = function(a) {
    a = b(a);
    var c, d = a.words || this.natural({
        min: 12,
        max: 18
      }),
      e = a.punctuation,
      f = this.n(this.word, d);
    return c = f.join(" "), c = this.capitalize(c), e === !1 || /^[\.\?;!:]$/.test(e) || (e = "."), e && (c += e), c
  }, a.prototype.syllable = function(a) {
    a = b(a);
    for (var c, d = a.length || this.natural({
        min: 2,
        max: 3
      }), e = "bcdfghjklmnprstvwz", f = "aeiou", g = e + f, h = "", i = 0; d > i; i++) c = 0 === i ? this.character({
      pool: g
    }) : -1 === e.indexOf(c) ? this.character({
      pool: e
    }) : this.character({
      pool: f
    }), h += c;
    return a.capitalize && (h = this.capitalize(h)), h
  }, a.prototype.word = function(a) {
    a = b(a), c(a.syllables && a.length, "Chance: Cannot specify both syllables AND length.");
    var d = a.syllables || this.natural({
        min: 1,
        max: 3
      }),
      e = "";
    if (a.length) {
      do e += this.syllable(); while (e.length < a.length);
      e = e.substring(0, a.length)
    } else
      for (var f = 0; d > f; f++) e += this.syllable();
    return a.capitalize && (e = this.capitalize(e)), e
  }, a.prototype.age = function(a) {
    a = b(a);
    var c;
    switch (a.type) {
      case "child":
        c = {
          min: 1,
          max: 12
        };
        break;
      case "teen":
        c = {
          min: 13,
          max: 19
        };
        break;
      case "adult":
        c = {
          min: 18,
          max: 65
        };
        break;
      case "senior":
        c = {
          min: 65,
          max: 100
        };
        break;
      case "all":
        c = {
          min: 1,
          max: 100
        };
        break;
      default:
        c = {
          min: 18,
          max: 65
        }
    }
    return this.natural(c)
  }, a.prototype.birthday = function(a) {
    return a = b(a, {
      year: (new Date).getFullYear() - this.age(a)
    }), this.date(a)
  }, a.prototype.cpf = function() {
    var a = this.n(this.natural, 9, {
        max: 9
      }),
      b = 2 * a[8] + 3 * a[7] + 4 * a[6] + 5 * a[5] + 6 * a[4] + 7 * a[3] + 8 * a[2] + 9 * a[1] + 10 * a[0];
    b = 11 - b % 11, b >= 10 && (b = 0);
    var c = 2 * b + 3 * a[8] + 4 * a[7] + 5 * a[6] + 6 * a[5] + 7 * a[4] + 8 * a[3] + 9 * a[2] + 10 * a[1] + 11 * a[0];
    return c = 11 - c % 11, c >= 10 && (c = 0), "" + a[0] + a[1] + a[2] + "." + a[3] + a[4] + a[5] + "." + a[6] + a[7] + a[8] + "-" + b + c
  }, a.prototype.cnpj = function() {
    var a = this.n(this.natural, 12, {
        max: 12
      }),
      b = 2 * a[11] + 3 * a[10] + 4 * a[9] + 5 * a[8] + 6 * a[7] + 7 * a[6] + 8 * a[5] + 9 * a[4] + 2 * a[3] + 3 * a[2] + 4 * a[1] + 5 * a[0];
    b = 11 - b % 11, 2 > b && (b = 0);
    var c = 2 * b + 3 * a[11] + 4 * a[10] + 5 * a[9] + 6 * a[8] + 7 * a[7] + 8 * a[6] + 9 * a[5] + 2 * a[4] + 3 * a[3] + 4 * a[2] + 5 * a[1] + 6 * a[0];
    return c = 11 - c % 11, 2 > c && (c = 0), "" + a[0] + a[1] + "." + a[2] + a[3] + a[4] + "." + a[5] + a[6] + a[7] + "/" + a[8] + a[9] + a[10] + a[11] + "-" + b + c
  }, a.prototype.first = function(a) {
    return a = b(a, {
      gender: this.gender(),
      nationality: "en"
    }), this.pick(this.get("firstNames")[a.gender.toLowerCase()][a.nationality.toLowerCase()])
  }, a.prototype.gender = function() {
    return this.pick(["Male", "Female"])
  }, a.prototype.last = function(a) {
    return a = b(a, {
      nationality: "en"
    }), this.pick(this.get("lastNames")[a.nationality.toLowerCase()])
  }, a.prototype.israelId = function() {
    for (var a = this.string({
        pool: "0123456789",
        length: 8
      }), b = 0, c = 0; c < a.length; c++) {
      var d = a[c] * (c / 2 === parseInt(c / 2) ? 1 : 2);
      d = this.pad(d, 2).toString(), d = parseInt(d[0]) + parseInt(d[1]), b += d
    }
    return a += (10 - parseInt(b.toString().slice(-1))).toString().slice(-1)
  }, a.prototype.mrz = function(a) {
    var c = function(a) {
        var b = "<ABCDEFGHIJKLMNOPQRSTUVWXYXZ".split(""),
          c = [7, 3, 1],
          d = 0;
        return "string" != typeof a && (a = a.toString()), a.split("").forEach(function(a, e) {
          var f = b.indexOf(a);
          a = -1 !== f ? 0 === f ? 0 : f + 9 : parseInt(a, 10), a *= c[e % c.length], d += a
        }), d % 10
      },
      d = function(a) {
        var b = function(a) {
            return new Array(a + 1).join("<")
          },
          d = ["P<", a.issuer, a.last.toUpperCase(), "<<", a.first.toUpperCase(), b(39 - (a.last.length + a.first.length + 2)), a.passportNumber, c(a.passportNumber), a.nationality, a.dob, c(a.dob), a.gender, a.expiry, c(a.expiry), b(14), c(b(14))].join("");
        return d + c(d.substr(44, 10) + d.substr(57, 7) + d.substr(65, 7))
      },
      e = this;
    return a = b(a, {
      first: this.first(),
      last: this.last(),
      passportNumber: this.integer({
        min: 1e8,
        max: 999999999
      }),
      dob: function() {
        var a = e.birthday({
          type: "adult"
        });
        return [a.getFullYear().toString().substr(2), e.pad(a.getMonth() + 1, 2), e.pad(a.getDate(), 2)].join("")
      }(),
      expiry: function() {
        var a = new Date;
        return [(a.getFullYear() + 5).toString().substr(2), e.pad(a.getMonth() + 1, 2), e.pad(a.getDate(), 2)].join("")
      }(),
      gender: "Female" === this.gender() ? "F" : "M",
      issuer: "GBR",
      nationality: "GBR"
    }), d(a)
  }, a.prototype.name = function(a) {
    a = b(a);
    var c, d = this.first(a),
      e = this.last(a);
    return c = a.middle ? d + " " + this.first(a) + " " + e : a.middle_initial ? d + " " + this.character({
      alpha: !0,
      casing: "upper"
    }) + ". " + e : d + " " + e, a.prefix && (c = this.prefix(a) + " " + c), a.suffix && (c = c + " " + this.suffix(a)), c
  }, a.prototype.name_prefixes = function(a) {
    a = a || "all", a = a.toLowerCase();
    var b = [{
      name: "Doctor",
      abbreviation: "Dr."
    }];
    return ("male" === a || "all" === a) && b.push({
      name: "Mister",
      abbreviation: "Mr."
    }), ("female" === a || "all" === a) && (b.push({
      name: "Miss",
      abbreviation: "Miss"
    }), b.push({
      name: "Misses",
      abbreviation: "Mrs."
    })), b
  }, a.prototype.prefix = function(a) {
    return this.name_prefix(a)
  }, a.prototype.name_prefix = function(a) {
    return a = b(a, {
      gender: "all"
    }), a.full ? this.pick(this.name_prefixes(a.gender)).name : this.pick(this.name_prefixes(a.gender)).abbreviation
  }, a.prototype.ssn = function(a) {
    a = b(a, {
      ssnFour: !1,
      dashes: !0
    });
    var c, d = "1234567890",
      e = a.dashes ? "-" : "";
    return c = a.ssnFour ? this.string({
      pool: d,
      length: 4
    }) : this.string({
      pool: d,
      length: 3
    }) + e + this.string({
      pool: d,
      length: 2
    }) + e + this.string({
      pool: d,
      length: 4
    })
  }, a.prototype.name_suffixes = function() {
    var a = [{
      name: "Doctor of Osteopathic Medicine",
      abbreviation: "D.O."
    }, {
      name: "Doctor of Philosophy",
      abbreviation: "Ph.D."
    }, {
      name: "Esquire",
      abbreviation: "Esq."
    }, {
      name: "Junior",
      abbreviation: "Jr."
    }, {
      name: "Juris Doctor",
      abbreviation: "J.D."
    }, {
      name: "Master of Arts",
      abbreviation: "M.A."
    }, {
      name: "Master of Business Administration",
      abbreviation: "M.B.A."
    }, {
      name: "Master of Science",
      abbreviation: "M.S."
    }, {
      name: "Medical Doctor",
      abbreviation: "M.D."
    }, {
      name: "Senior",
      abbreviation: "Sr."
    }, {
      name: "The Third",
      abbreviation: "III"
    }, {
      name: "The Fourth",
      abbreviation: "IV"
    }, {
      name: "Bachelor of Engineering",
      abbreviation: "B.E"
    }, {
      name: "Bachelor of Technology",
      abbreviation: "B.TECH"
    }];
    return a
  }, a.prototype.suffix = function(a) {
    return this.name_suffix(a)
  }, a.prototype.name_suffix = function(a) {
    return a = b(a), a.full ? this.pick(this.name_suffixes()).name : this.pick(this.name_suffixes()).abbreviation
  }, a.prototype.nationalities = function() {
    return this.get("nationalities")
  }, a.prototype.nationality = function() {
    var a = this.pick(this.nationalities());
    return a.name
  }, a.prototype.android_id = function() {
    return "APA91" + this.string({
      pool: "0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
      length: 178
    })
  }, a.prototype.apple_token = function() {
    return this.string({
      pool: "abcdef1234567890",
      length: 64
    })
  }, a.prototype.wp8_anid2 = function() {
    return o(this.hash({
      length: 32
    }))
  }, a.prototype.wp7_anid = function() {
    return "A=" + this.guid().replace(/-/g, "").toUpperCase() + "&E=" + this.hash({
      length: 3
    }) + "&W=" + this.integer({
      min: 0,
      max: 9
    })
  }, a.prototype.bb_pin = function() {
    return this.hash({
      length: 8
    })
  }, a.prototype.avatar = function(a) {
    var c = null,
      d = "//www.gravatar.com/avatar/",
      e = {
        http: "http",
        https: "https"
      },
      f = {
        bmp: "bmp",
        gif: "gif",
        jpg: "jpg",
        png: "png"
      },
      g = {
        404: "404",
        mm: "mm",
        identicon: "identicon",
        monsterid: "monsterid",
        wavatar: "wavatar",
        retro: "retro",
        blank: "blank"
      },
      h = {
        g: "g",
        pg: "pg",
        r: "r",
        x: "x"
      },
      i = {
        protocol: null,
        email: null,
        fileExtension: null,
        size: null,
        fallback: null,
        rating: null
      };
    if (a)
      if ("string" == typeof a) i.email = a, a = {};
      else {
        if ("object" != typeof a) return null;
        if ("Array" === a.constructor) return null
      }
    else i.email = this.email(), a = {};
    return i = b(a, i), i.email || (i.email = this.email()), i.protocol = e[i.protocol] ? i.protocol + ":" : "", i.size = parseInt(i.size, 0) ? i.size : "", i.rating = h[i.rating] ? i.rating : "", i.fallback = g[i.fallback] ? i.fallback : "", i.fileExtension = f[i.fileExtension] ? i.fileExtension : "", c = i.protocol + d + this.bimd5.md5(i.email) + (i.fileExtension ? "." + i.fileExtension : "") + (i.size || i.rating || i.fallback ? "?" : "") + (i.size ? "&s=" + i.size.toString() : "") + (i.rating ? "&r=" + i.rating : "") + (i.fallback ? "&d=" + i.fallback : "")
  }, a.prototype.color = function(a) {
    function c(a, b) {
      return [a, a, a].join(b || "")
    }

    function d(a) {
      var b = a ? "rgba" : "rgb",
        d = a ? "," + this.floating({
          min: 0,
          max: 1
        }) : "",
        e = g ? c(this.natural({
          max: 255
        }), ",") : this.natural({
          max: 255
        }) + "," + this.natural({
          max: 255
        }) + "," + this.natural({
          max: 255
        });
      return b + "(" + e + d + ")"
    }

    function e(a, b, d) {
      var e = d ? "#" : "",
        f = g ? c(this.hash({
          length: a
        })) : this.hash({
          length: b
        });
      return e + f
    }
    a = b(a, {
      format: this.pick(["hex", "shorthex", "rgb", "rgba", "0x", "name"]),
      grayscale: !1,
      casing: "lower"
    });
    var f, g = a.grayscale;
    if ("hex" === a.format) f = e.call(this, 2, 6, !0);
    else if ("shorthex" === a.format) f = e.call(this, 1, 3, !0);
    else if ("rgb" === a.format) f = d.call(this, !1);
    else if ("rgba" === a.format) f = d.call(this, !0);
    else {
      if ("0x" !== a.format) {
        if ("name" === a.format) return this.pick(this.get("colorNames"));
        throw new RangeError('Invalid format provided. Please provide one of "hex", "shorthex", "rgb", "rgba", "0x" or "name".')
      }
      f = "0x" + e.call(this, 2, 6)
    }
    return "upper" === a.casing && (f = f.toUpperCase()), f
  }, a.prototype.domain = function(a) {
    return a = b(a), this.word() + "." + (a.tld || this.tld())
  }, a.prototype.email = function(a) {
    return a = b(a), this.word({
      length: a.length
    }) + "@" + (a.domain || this.domain())
  }, a.prototype.fbid = function() {
    return parseInt("10000" + this.natural({
      max: 1e11
    }), 10)
  }, a.prototype.google_analytics = function() {
    var a = this.pad(this.natural({
        max: 999999
      }), 6),
      b = this.pad(this.natural({
        max: 99
      }), 2);
    return "UA-" + a + "-" + b
  }, a.prototype.hashtag = function() {
    return "#" + this.word()
  }, a.prototype.ip = function() {
    return this.natural({
      min: 1,
      max: 254
    }) + "." + this.natural({
      max: 255
    }) + "." + this.natural({
      max: 255
    }) + "." + this.natural({
      min: 1,
      max: 254
    })
  }, a.prototype.ipv6 = function() {
    var a = this.n(this.hash, 8, {
      length: 4
    });
    return a.join(":")
  }, a.prototype.klout = function() {
    return this.natural({
      min: 1,
      max: 99
    })
  }, a.prototype.semver = function(a) {
    a = b(a, {
      include_prerelease: !0
    });
    var c = this.pickone(["^", "~", "<", ">", "<=", ">=", "="]);
    a.range && (c = a.range);
    var d = "";
    return a.include_prerelease && (d = this.weighted(["", "-dev", "-beta", "-alpha"], [50, 10, 5, 1])), c + this.rpg("3d10").join(".") + d
  }, a.prototype.tlds = function() {
    return ["com", "org", "edu", "gov", "co.uk", "net", "io", "ac", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "bq", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "su", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "za", "zm", "zw"]
  }, a.prototype.tld = function() {
    return this.pick(this.tlds())
  }, a.prototype.twitter = function() {
    return "@" + this.word()
  }, a.prototype.url = function(a) {
    a = b(a, {
      protocol: "http",
      domain: this.domain(a),
      domain_prefix: "",
      path: this.word(),
      extensions: []
    });
    var c = a.extensions.length > 0 ? "." + this.pick(a.extensions) : "",
      d = a.domain_prefix ? a.domain_prefix + "." + a.domain : a.domain;
    return a.protocol + "://" + d + "/" + a.path + c
  }, a.prototype.address = function(a) {
    return a = b(a), this.natural({
      min: 5,
      max: 2e3
    }) + " " + this.street(a)
  }, a.prototype.altitude = function(a) {
    return a = b(a, {
      fixed: 5,
      min: 0,
      max: 8848
    }), this.floating({
      min: a.min,
      max: a.max,
      fixed: a.fixed
    })
  }, a.prototype.areacode = function(a) {
    a = b(a, {
      parens: !0
    });
    var c = this.natural({
      min: 2,
      max: 9
    }).toString() + this.natural({
      min: 0,
      max: 8
    }).toString() + this.natural({
      min: 0,
      max: 9
    }).toString();
    return a.parens ? "(" + c + ")" : c
  }, a.prototype.city = function() {
    return this.capitalize(this.word({
      syllables: 3
    }))
  }, a.prototype.coordinates = function(a) {
    return this.latitude(a) + ", " + this.longitude(a)
  }, a.prototype.countries = function() {
    return this.get("countries")
  }, a.prototype.country = function(a) {
    a = b(a);
    var c = this.pick(this.countries());
    return a.full ? c.name : c.abbreviation
  }, a.prototype.depth = function(a) {
    return a = b(a, {
      fixed: 5,
      min: -10994,
      max: 0
    }), this.floating({
      min: a.min,
      max: a.max,
      fixed: a.fixed
    })
  }, a.prototype.geohash = function(a) {
    return a = b(a, {
      length: 7
    }), this.string({
      length: a.length,
      pool: "0123456789bcdefghjkmnpqrstuvwxyz"
    })
  }, a.prototype.geojson = function(a) {
    return this.latitude(a) + ", " + this.longitude(a) + ", " + this.altitude(a)
  }, a.prototype.latitude = function(a) {
    return a = b(a, {
      fixed: 5,
      min: -90,
      max: 90
    }), this.floating({
      min: a.min,
      max: a.max,
      fixed: a.fixed
    })
  }, a.prototype.longitude = function(a) {
    return a = b(a, {
      fixed: 5,
      min: -180,
      max: 180
    }), this.floating({
      min: a.min,
      max: a.max,
      fixed: a.fixed
    })
  }, a.prototype.phone = function(a) {
    var c, d = this,
      e = function(a) {
        var b = [];
        return a.sections.forEach(function(a) {
          b.push(d.string({
            pool: "0123456789",
            length: a
          }))
        }), a.area + b.join(" ")
      };
    a = b(a, {
      formatted: !0,
      country: "us",
      mobile: !1
    }), a.formatted || (a.parens = !1);
    var f;
    switch (a.country) {
      case "fr":
        a.mobile ? (c = this.pick(["06", "07"]) + d.string({
          pool: "0123456789",
          length: 8
        }), f = a.formatted ? c.match(/../g).join(" ") : c) : (c = this.pick(["01" + this.pick(["30", "34", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "53", "55", "56", "58", "60", "64", "69", "70", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83"]) + d.string({
          pool: "0123456789",
          length: 6
        }), "02" + this.pick(["14", "18", "22", "23", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "40", "41", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "56", "57", "61", "62", "69", "72", "76", "77", "78", "85", "90", "96", "97", "98", "99"]) + d.string({
          pool: "0123456789",
          length: 6
        }), "03" + this.pick(["10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "39", "44", "45", "51", "52", "54", "55", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"]) + d.string({
          pool: "0123456789",
          length: 6
        }), "04" + this.pick(["11", "13", "15", "20", "22", "26", "27", "30", "32", "34", "37", "42", "43", "44", "50", "56", "57", "63", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "88", "89", "90", "91", "92", "93", "94", "95", "97", "98"]) + d.string({
          pool: "0123456789",
          length: 6
        }), "05" + this.pick(["08", "16", "17", "19", "24", "31", "32", "33", "34", "35", "40", "45", "46", "47", "49", "53", "55", "56", "57", "58", "59", "61", "62", "63", "64", "65", "67", "79", "81", "82", "86", "87", "90", "94"]) + d.string({
          pool: "0123456789",
          length: 6
        }), "09" + d.string({
          pool: "0123456789",
          length: 8
        })]), f = a.formatted ? c.match(/../g).join(" ") : c);
        break;
      case "uk":
        a.mobile ? (c = this.pick([{
          area: "07" + this.pick(["4", "5", "7", "8", "9"]),
          sections: [2, 6]
        }, {
          area: "07624 ",
          sections: [6]
        }]), f = a.formatted ? e(c) : e(c).replace(" ", "")) : (c = this.pick([{
          area: "01" + this.character({
            pool: "234569"
          }) + "1 ",
          sections: [3, 4]
        }, {
          area: "020 " + this.character({
            pool: "378"
          }),
          sections: [3, 4]
        }, {
          area: "023 " + this.character({
            pool: "89"
          }),
          sections: [3, 4]
        }, {
          area: "024 7",
          sections: [3, 4]
        }, {
          area: "028 " + this.pick(["25", "28", "37", "71", "82", "90", "92", "95"]),
          sections: [2, 4]
        }, {
          area: "012" + this.pick(["04", "08", "54", "76", "97", "98"]) + " ",
          sections: [5]
        }, {
          area: "013" + this.pick(["63", "64", "84", "86"]) + " ",
          sections: [5]
        }, {
          area: "014" + this.pick(["04", "20", "60", "61", "80", "88"]) + " ",
          sections: [5]
        }, {
          area: "015" + this.pick(["24", "27", "62", "66"]) + " ",
          sections: [5]
        }, {
          area: "016" + this.pick(["06", "29", "35", "47", "59", "95"]) + " ",
          sections: [5]
        }, {
          area: "017" + this.pick(["26", "44", "50", "68"]) + " ",
          sections: [5]
        }, {
          area: "018" + this.pick(["27", "37", "84", "97"]) + " ",
          sections: [5]
        }, {
          area: "019" + this.pick(["00", "05", "35", "46", "49", "63", "95"]) + " ",
          sections: [5]
        }]), f = a.formatted ? e(c) : e(c).replace(" ", "", "g"));
        break;
      case "us":
        var g = this.areacode(a).toString(),
          h = this.natural({
            min: 2,
            max: 9
          }).toString() + this.natural({
            min: 0,
            max: 9
          }).toString() + this.natural({
            min: 0,
            max: 9
          }).toString(),
          i = this.natural({
            min: 1e3,
            max: 9999
          }).toString();
        f = a.formatted ? g + " " + h + "-" + i : g + h + i
    }
    return f
  }, a.prototype.postal = function() {
    var a = this.character({
        pool: "XVTSRPNKLMHJGECBA"
      }),
      b = a + this.natural({
        max: 9
      }) + this.character({
        alpha: !0,
        casing: "upper"
      }),
      c = this.natural({
        max: 9
      }) + this.character({
        alpha: !0,
        casing: "upper"
      }) + this.natural({
        max: 9
      });
    return b + " " + c
  }, a.prototype.provinces = function(a) {
    return a = b(a, {
      country: "ca"
    }), this.get("provinces")[a.country.toLowerCase()]
  }, a.prototype.province = function(a) {
    return a && a.full ? this.pick(this.provinces(a)).name : this.pick(this.provinces(a)).abbreviation
  }, a.prototype.state = function(a) {
    return a && a.full ? this.pick(this.states(a)).name : this.pick(this.states(a)).abbreviation
  }, a.prototype.states = function(a) {
    a = b(a, {
      country: "us",
      us_states_and_dc: !0
    });
    var c;
    switch (a.country.toLowerCase()) {
      case "us":
        var d = this.get("us_states_and_dc"),
          e = this.get("territories"),
          f = this.get("armed_forces");
        c = [], a.us_states_and_dc && (c = c.concat(d)), a.territories && (c = c.concat(e)), a.armed_forces && (c = c.concat(f));
        break;
      case "it":
        c = this.get("country_regions")[a.country.toLowerCase()]
    }
    return c
  }, a.prototype.street = function(a) {
    a = b(a, {
      country: "us",
      syllables: 2
    });
    var c;
    switch (a.country.toLowerCase()) {
      case "us":
        c = this.word({
          syllables: a.syllables
        }), c = this.capitalize(c), c += " ", c += a.short_suffix ? this.street_suffix(a).abbreviation : this.street_suffix(a).name;
        break;
      case "it":
        c = this.word({
          syllables: a.syllables
        }), c = this.capitalize(c), c = (a.short_suffix ? this.street_suffix(a).abbreviation : this.street_suffix(a).name) + " " + c
    }
    return c
  }, a.prototype.street_suffix = function(a) {
    return a = b(a, {
      country: "us"
    }), this.pick(this.street_suffixes(a))
  }, a.prototype.street_suffixes = function(a) {
    return a = b(a, {
      country: "us"
    }), this.get("street_suffixes")[a.country.toLowerCase()]
  }, a.prototype.zip = function(a) {
    var b = this.n(this.natural, 5, {
      max: 9
    });
    return a && a.plusfour === !0 && (b.push("-"), b = b.concat(this.n(this.natural, 4, {
      max: 9
    }))), b.join("")
  }, a.prototype.ampm = function() {
    return this.bool() ? "am" : "pm"
  }, a.prototype.date = function(a) {
    var c, d;
    if (a && (a.min || a.max)) {
      a = b(a, {
        american: !0,
        string: !1
      });
      var e = "undefined" != typeof a.min ? a.min.getTime() : 1,
        f = "undefined" != typeof a.max ? a.max.getTime() : 864e13;
      d = new Date(this.natural({
        min: e,
        max: f
      }))
    } else {
      var g = this.month({
          raw: !0
        }),
        h = g.days;
      a && a.month && (h = this.get("months")[(a.month % 12 + 12) % 12].days), a = b(a, {
        year: parseInt(this.year(), 10),
        month: g.numeric - 1,
        day: this.natural({
          min: 1,
          max: h
        }),
        hour: this.hour(),
        minute: this.minute(),
        second: this.second(),
        millisecond: this.millisecond(),
        american: !0,
        string: !1
      }), d = new Date(a.year, a.month, a.day, a.hour, a.minute, a.second, a.millisecond)
    }
    return c = a.american ? d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear() : d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(), a.string ? c : d
  }, a.prototype.hammertime = function(a) {
    return this.date(a).getTime()
  }, a.prototype.hour = function(a) {
    return a = b(a, {
      min: a && a.twentyfour ? 0 : 1,
      max: a && a.twentyfour ? 23 : 12
    }), c(a.min < 0, "Chance: Min cannot be less than 0."), c(a.twentyfour && a.max > 23, "Chance: Max cannot be greater than 23 for twentyfour option."), c(!a.twentyfour && a.max > 12, "Chance: Max cannot be greater than 12."), c(a.min > a.max, "Chance: Min cannot be greater than Max."), this.natural({
      min: a.min,
      max: a.max
    })
  }, a.prototype.millisecond = function() {
    return this.natural({
      max: 999
    })
  }, a.prototype.minute = a.prototype.second = function(a) {
    return a = b(a, {
      min: 0,
      max: 59
    }), c(a.min < 0, "Chance: Min cannot be less than 0."), c(a.max > 59, "Chance: Max cannot be greater than 59."), c(a.min > a.max, "Chance: Min cannot be greater than Max."), this.natural({
      min: a.min,
      max: a.max
    })
  }, a.prototype.month = function(a) {
    a = b(a, {
      min: 1,
      max: 12
    }), c(a.min < 1, "Chance: Min cannot be less than 1."), c(a.max > 12, "Chance: Max cannot be greater than 12."), c(a.min > a.max, "Chance: Min cannot be greater than Max.");
    var d = this.pick(this.months().slice(a.min - 1, a.max));
    return a.raw ? d : d.name
  }, a.prototype.months = function() {
    return this.get("months")
  }, a.prototype.second = function() {
    return this.natural({
      max: 59
    })
  }, a.prototype.timestamp = function() {
    return this.natural({
      min: 1,
      max: parseInt((new Date).getTime() / 1e3, 10)
    })
  }, a.prototype.weekday = function(a) {
    a = b(a, {
      weekday_only: !1
    });
    var c = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return a.weekday_only || (c.push("Saturday"), c.push("Sunday")), this.pickone(c)
  }, a.prototype.year = function(a) {
    return a = b(a, {
      min: (new Date).getFullYear()
    }), a.max = "undefined" != typeof a.max ? a.max : a.min + 100, this.natural(a).toString()
  }, a.prototype.cc = function(a) {
    a = b(a);
    var c, d, e;
    return c = a.type ? this.cc_type({
      name: a.type,
      raw: !0
    }) : this.cc_type({
      raw: !0
    }), d = c.prefix.split(""), e = c.length - c.prefix.length - 1, d = d.concat(this.n(this.integer, e, {
      min: 0,
      max: 9
    })), d.push(this.luhn_calculate(d.join(""))), d.join("")
  }, a.prototype.cc_types = function() {
    return this.get("cc_types")
  }, a.prototype.cc_type = function(a) {
    a = b(a);
    var c = this.cc_types(),
      d = null;
    if (a.name) {
      for (var e = 0; e < c.length; e++)
        if (c[e].name === a.name || c[e].short_name === a.name) {
          d = c[e];
          break
        }
      if (null === d) throw new RangeError("Credit card type '" + a.name + "'' is not supported")
    } else d = this.pick(c);
    return a.raw ? d : d.name
  }, a.prototype.currency_types = function() {
    return this.get("currency_types")
  }, a.prototype.currency = function() {
    return this.pick(this.currency_types())
  }, a.prototype.currency_pair = function(a) {
    var b = this.unique(this.currency, 2, {
      comparator: function(a, b) {
        return a.reduce(function(a, c) {
          return a || c.code === b.code
        }, !1)
      }
    });
    return a ? b[0].code + "/" + b[1].code : b
  }, a.prototype.dollar = function(a) {
    a = b(a, {
      max: 1e4,
      min: 0
    });
    var c = this.floating({
        min: a.min,
        max: a.max,
        fixed: 2
      }).toString(),
      d = c.split(".")[1];
    return void 0 === d ? c += ".00" : d.length < 2 && (c += "0"), 0 > c ? "-$" + c.replace("-", "") : "$" + c
  }, a.prototype.euro = function(a) {
    return Number(this.dollar(a).replace("$", "")).toLocaleString() + "€"
  }, a.prototype.exp = function(a) {
    a = b(a);
    var c = {};
    return c.year = this.exp_year(), c.year === (new Date).getFullYear().toString() ? c.month = this.exp_month({
      future: !0
    }) : c.month = this.exp_month(), a.raw ? c : c.month + "/" + c.year
  }, a.prototype.exp_month = function(a) {
    a = b(a);
    var c, d, e = (new Date).getMonth() + 1;
    if (a.future && 12 !== e) {
      do c = this.month({
        raw: !0
      }).numeric, d = parseInt(c, 10); while (e >= d)
    } else c = this.month({
      raw: !0
    }).numeric;
    return c
  }, a.prototype.exp_year = function() {
    var a = (new Date).getMonth() + 1,
      b = (new Date).getFullYear();
    return this.year({
      min: 12 === a ? b + 1 : b,
      max: b + 10
    })
  }, a.prototype.vat = function(a) {
    switch (a = b(a, {
      country: "it"
    }), a.country.toLowerCase()) {
      case "it":
        return this.it_vat()
    }
  }, a.prototype.it_vat = function() {
    var a = this.natural({
      min: 1,
      max: 18e5
    });
    return a = this.pad(a, 7) + this.pad(this.pick(this.provinces({
      country: "it"
    })).code, 3), a + this.luhn_calculate(a)
  }, a.prototype.cf = function(a) {
    a = a || {};
    var b = a.gender ? a.gender : this.gender(),
      c = a.first ? a.first : this.first({
        gender: b,
        nationality: "it"
      }),
      d = a.last ? a.last : this.last({
        nationality: "it"
      }),
      e = a.birthday ? a.birthday : this.birthday(),
      f = a.city ? a.city : this.pickone(["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "M", "Z"]) + this.pad(this.natural({
        max: 999
      }), 3),
      g = [],
      h = function(a, b) {
        var c, d = [];
        return a.length < 3 ? d = a.split("").concat("XXX".split("")).splice(0, 3) : (c = a.toUpperCase().split("").map(function(a) {
          return -1 !== "BCDFGHJKLMNPRSTVWZ".indexOf(a) ? a : void 0
        }).join(""), c.length > 3 && (c = b ? c.substr(0, 3) : c[0] + c.substr(2, 2)), c.length < 3 && (d = c, c = a.toUpperCase().split("").map(function(a) {
          return -1 !== "AEIOU".indexOf(a) ? a : void 0
        }).join("").substr(0, 3 - d.length)), d += c), d
      },
      i = function(a, b, c) {
        var d = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
        return a.getFullYear().toString().substr(2) + d[a.getMonth()] + c.pad(a.getDate() + ("female" === b.toLowerCase() ? 40 : 0), 2)
      },
      j = function(a) {
        for (var b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", c = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ", d = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", e = "BAKPLCQDREVOSFTGUHMINJWZYX", f = 0, g = 0; 15 > g; g++) f += g % 2 !== 0 ? d.indexOf(c[b.indexOf(a[g])]) : e.indexOf(c[b.indexOf(a[g])]);
        return d[f % 26]
      };
    return g = g.concat(h(d, !0), h(c), i(e, b, this), f.toUpperCase().split("")).join(""), g += j(g.toUpperCase(), this), g.toUpperCase()
  }, a.prototype.pl_pesel = function() {
    for (var a = this.natural({
        min: 1,
        max: 9999999999
      }), b = this.pad(a, 10).split(""), c = 0; c < b.length; c++) b[c] = parseInt(b[c]);
    var d = (1 * b[0] + 3 * b[1] + 7 * b[2] + 9 * b[3] + 1 * b[4] + 3 * b[5] + 7 * b[6] + 9 * b[7] + 1 * b[8] + 3 * b[9]) % 10;
    return 0 !== d && (d = 10 - d), b.join("") + d
  }, a.prototype.pl_nip = function() {
    for (var a = this.natural({
        min: 1,
        max: 999999999
      }), b = this.pad(a, 9).split(""), c = 0; c < b.length; c++) b[c] = parseInt(b[c]);
    var d = (6 * b[0] + 5 * b[1] + 7 * b[2] + 2 * b[3] + 3 * b[4] + 4 * b[5] + 5 * b[6] + 6 * b[7] + 7 * b[8]) % 11;
    return 10 === d ? this.pl_nip() : b.join("") + d
  }, a.prototype.pl_regon = function() {
    for (var a = this.natural({
        min: 1,
        max: 99999999
      }), b = this.pad(a, 8).split(""), c = 0; c < b.length; c++) b[c] = parseInt(b[c]);
    var d = (8 * b[0] + 9 * b[1] + 2 * b[2] + 3 * b[3] + 4 * b[4] + 5 * b[5] + 6 * b[6] + 7 * b[7]) % 11;
    return 10 === d && (d = 0), b.join("") + d
  }, a.prototype.d4 = d({
    min: 1,
    max: 4
  }), a.prototype.d6 = d({
    min: 1,
    max: 6
  }), a.prototype.d8 = d({
    min: 1,
    max: 8
  }), a.prototype.d10 = d({
    min: 1,
    max: 10
  }), a.prototype.d12 = d({
    min: 1,
    max: 12
  }), a.prototype.d20 = d({
    min: 1,
    max: 20
  }), a.prototype.d30 = d({
    min: 1,
    max: 30
  }), a.prototype.d100 = d({
    min: 1,
    max: 100
  }), a.prototype.rpg = function(a, c) {
    if (c = b(c), a) {
      var d = a.toLowerCase().split("d"),
        e = [];
      if (2 !== d.length || !parseInt(d[0], 10) || !parseInt(d[1], 10)) throw new Error("Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");
      for (var f = d[0]; f > 0; f--) e[f - 1] = this.natural({
        min: 1,
        max: d[1]
      });
      return "undefined" != typeof c.sum && c.sum ? e.reduce(function(a, b) {
        return a + b
      }) : e
    }
    throw new RangeError("A type of die roll must be included")
  }, a.prototype.guid = function(a) {
    a = b(a, {
      version: 5
    });
    var c = "abcdef1234567890",
      d = "ab89",
      e = this.string({
        pool: c,
        length: 8
      }) + "-" + this.string({
        pool: c,
        length: 4
      }) + "-" + a.version + this.string({
        pool: c,
        length: 3
      }) + "-" + this.string({
        pool: d,
        length: 1
      }) + this.string({
        pool: c,
        length: 3
      }) + "-" + this.string({
        pool: c,
        length: 12
      });
    return e
  }, a.prototype.hash = function(a) {
    a = b(a, {
      length: 40,
      casing: "lower"
    });
    var c = "upper" === a.casing ? m.toUpperCase() : m;
    return this.string({
      pool: c,
      length: a.length
    })
  }, a.prototype.luhn_check = function(a) {
    var b = a.toString(),
      c = +b.substring(b.length - 1);
    return c === this.luhn_calculate(+b.substring(0, b.length - 1))
  }, a.prototype.luhn_calculate = function(a) {
    for (var b, c = a.toString().split("").reverse(), d = 0, e = 0, f = c.length; f > e; ++e) b = +c[e], e % 2 === 0 && (b *= 2, b > 9 && (b -= 9)), d += b;
    return 9 * d % 10
  }, a.prototype.md5 = function(a) {
    var c = {
      str: "",
      key: null,
      raw: !1
    };
    if (a)
      if ("string" == typeof a) c.str = a, a = {};
      else {
        if ("object" != typeof a) return null;
        if ("Array" === a.constructor) return null
      }
    else c.str = this.string(), a = {};
    if (c = b(a, c), !c.str) throw new Error("A parameter is required to return an md5 hash.");
    return this.bimd5.md5(c.str, c.key, c.raw)
  }, a.prototype.file = function(a) {
    var b, c, d = a || {},
      e = "fileExtension",
      f = Object.keys(this.get("fileExtension"));
    if (b = this.word({
        length: d.length
      }), d.extention) return c = d.extention, b + "." + c;
    if (d.extentions) {
      if (Array.isArray(d.extentions)) return c = this.pickone(d.extentions), b + "." + c;
      if (d.extentions.constructor === Object) {
        var g = d.extentions,
          h = Object.keys(g);
        return c = this.pickone(g[this.pickone(h)]), b + "." + c
      }
      throw new Error("Expect collection of type Array or Object to be passed as an argument ")
    }
    if (d.fileType) {
      var i = d.fileType;
      if (-1 !== f.indexOf(i)) return c = this.pickone(this.get(e)[i]), b + "." + c;
      throw new Error("Expect file type value to be 'raster', 'vector', '3d' or 'document' ")
    }
    return c = this.pickone(this.get(e)[this.pickone(f)]), b + "." + c
  };
  var p = {
      firstNames: {
        male: {
          en: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas", "Christopher", "Daniel", "Matthew", "George", "Donald", "Anthony", "Paul", "Mark", "Edward", "Steven", "Kenneth", "Andrew", "Brian", "Joshua", "Kevin", "Ronald", "Timothy", "Jason", "Jeffrey", "Frank", "Gary", "Ryan", "Nicholas", "Eric", "Stephen", "Jacob", "Larry", "Jonathan", "Scott", "Raymond", "Justin", "Brandon", "Gregory", "Samuel", "Benjamin", "Patrick", "Jack", "Henry", "Walter", "Dennis", "Jerry", "Alexander", "Peter", "Tyler", "Douglas", "Harold", "Aaron", "Jose", "Adam", "Arthur", "Zachary", "Carl", "Nathan", "Albert", "Kyle", "Lawrence", "Joe", "Willie", "Gerald", "Roger", "Keith", "Jeremy", "Terry", "Harry", "Ralph", "Sean", "Jesse", "Roy", "Louis", "Billy", "Austin", "Bruce", "Eugene", "Christian", "Bryan", "Wayne", "Russell", "Howard", "Fred", "Ethan", "Jordan", "Philip", "Alan", "Juan", "Randy", "Vincent", "Bobby", "Dylan", "Johnny", "Phillip", "Victor", "Clarence", "Ernest", "Martin", "Craig", "Stanley", "Shawn", "Travis", "Bradley", "Leonard", "Earl", "Gabriel", "Jimmy", "Francis", "Todd", "Noah", "Danny", "Dale", "Cody", "Carlos", "Allen", "Frederick", "Logan", "Curtis", "Alex", "Joel", "Luis", "Norman", "Marvin", "Glenn", "Tony", "Nathaniel", "Rodney", "Melvin", "Alfred", "Steve", "Cameron", "Chad", "Edwin", "Caleb", "Evan", "Antonio", "Lee", "Herbert", "Jeffery", "Isaac", "Derek", "Ricky", "Marcus", "Theodore", "Elijah", "Luke", "Jesus", "Eddie", "Troy", "Mike", "Dustin", "Ray", "Adrian", "Bernard", "Leroy", "Angel", "Randall", "Wesley", "Ian", "Jared", "Mason", "Hunter", "Calvin", "Oscar", "Clifford", "Jay", "Shane", "Ronnie", "Barry", "Lucas", "Corey", "Manuel", "Leo", "Tommy", "Warren", "Jackson", "Isaiah", "Connor", "Don", "Dean", "Jon", "Julian", "Miguel", "Bill", "Lloyd", "Charlie", "Mitchell", "Leon", "Jerome", "Darrell", "Jeremiah", "Alvin", "Brett", "Seth", "Floyd", "Jim", "Blake", "Micheal", "Gordon", "Trevor", "Lewis", "Erik", "Edgar", "Vernon", "Devin", "Gavin", "Jayden", "Chris", "Clyde", "Tom", "Derrick", "Mario", "Brent", "Marc", "Herman", "Chase", "Dominic", "Ricardo", "Franklin", "Maurice", "Max", "Aiden", "Owen", "Lester", "Gilbert", "Elmer", "Gene", "Francisco", "Glen", "Cory", "Garrett", "Clayton", "Sam", "Jorge", "Chester", "Alejandro", "Jeff", "Harvey", "Milton", "Cole", "Ivan", "Andre", "Duane", "Landon"],
          it: ["Adolfo", "Alberto", "Aldo", "Alessandro", "Alessio", "Alfredo", "Alvaro", "Andrea", "Angelo", "Angiolo", "Antonino", "Antonio", "Attilio", "Benito", "Bernardo", "Bruno", "Carlo", "Cesare", "Christian", "Claudio", "Corrado", "Cosimo", "Cristian", "Cristiano", "Daniele", "Dario", "David", "Davide", "Diego", "Dino", "Domenico", "Duccio", "Edoardo", "Elia", "Elio", "Emanuele", "Emiliano", "Emilio", "Enrico", "Enzo", "Ettore", "Fabio", "Fabrizio", "Federico", "Ferdinando", "Fernando", "Filippo", "Francesco", "Franco", "Gabriele", "Giacomo", "Giampaolo", "Giampiero", "Giancarlo", "Gianfranco", "Gianluca", "Gianmarco", "Gianni", "Gino", "Giorgio", "Giovanni", "Giuliano", "Giulio", "Giuseppe", "Graziano", "Gregorio", "Guido", "Iacopo", "Jacopo", "Lapo", "Leonardo", "Lorenzo", "Luca", "Luciano", "Luigi", "Manuel", "Marcello", "Marco", "Marino", "Mario", "Massimiliano", "Massimo", "Matteo", "Mattia", "Maurizio", "Mauro", "Michele", "Mirko", "Mohamed", "Nello", "Neri", "Niccolò", "Nicola", "Osvaldo", "Otello", "Paolo", "Pier Luigi", "Piero", "Pietro", "Raffaele", "Remo", "Renato", "Renzo", "Riccardo", "Roberto", "Rolando", "Romano", "Salvatore", "Samuele", "Sandro", "Sergio", "Silvano", "Simone", "Stefano", "Thomas", "Tommaso", "Ubaldo", "Ugo", "Umberto", "Valerio", "Valter", "Vasco", "Vincenzo", "Vittorio"]
        },
        female: {
          en: ["Mary", "Emma", "Elizabeth", "Minnie", "Margaret", "Ida", "Alice", "Bertha", "Sarah", "Annie", "Clara", "Ella", "Florence", "Cora", "Martha", "Laura", "Nellie", "Grace", "Carrie", "Maude", "Mabel", "Bessie", "Jennie", "Gertrude", "Julia", "Hattie", "Edith", "Mattie", "Rose", "Catherine", "Lillian", "Ada", "Lillie", "Helen", "Jessie", "Louise", "Ethel", "Lula", "Myrtle", "Eva", "Frances", "Lena", "Lucy", "Edna", "Maggie", "Pearl", "Daisy", "Fannie", "Josephine", "Dora", "Rosa", "Katherine", "Agnes", "Marie", "Nora", "May", "Mamie", "Blanche", "Stella", "Ellen", "Nancy", "Effie", "Sallie", "Nettie", "Della", "Lizzie", "Flora", "Susie", "Maud", "Mae", "Etta", "Harriet", "Sadie", "Caroline", "Katie", "Lydia", "Elsie", "Kate", "Susan", "Mollie", "Alma", "Addie", "Georgia", "Eliza", "Lulu", "Nannie", "Lottie", "Amanda", "Belle", "Charlotte", "Rebecca", "Ruth", "Viola", "Olive", "Amelia", "Hannah", "Jane", "Virginia", "Emily", "Matilda", "Irene", "Kathryn", "Esther", "Willie", "Henrietta", "Ollie", "Amy", "Rachel", "Sara", "Estella", "Theresa", "Augusta", "Ora", "Pauline", "Josie", "Lola", "Sophia", "Leona", "Anne", "Mildred", "Ann", "Beulah", "Callie", "Lou", "Delia", "Eleanor", "Barbara", "Iva", "Louisa", "Maria", "Mayme", "Evelyn", "Estelle", "Nina", "Betty", "Marion", "Bettie", "Dorothy", "Luella", "Inez", "Lela", "Rosie", "Allie", "Millie", "Janie", "Cornelia", "Victoria", "Ruby", "Winifred", "Alta", "Celia", "Christine", "Beatrice", "Birdie", "Harriett", "Mable", "Myra", "Sophie", "Tillie", "Isabel", "Sylvia", "Carolyn", "Isabelle", "Leila", "Sally", "Ina", "Essie", "Bertie", "Nell", "Alberta", "Katharine", "Lora", "Rena", "Mina", "Rhoda", "Mathilda", "Abbie", "Eula", "Dollie", "Hettie", "Eunice", "Fanny", "Ola", "Lenora", "Adelaide", "Christina", "Lelia", "Nelle", "Sue", "Johanna", "Lilly", "Lucinda", "Minerva", "Lettie", "Roxie", "Cynthia", "Helena", "Hilda", "Hulda", "Bernice", "Genevieve", "Jean", "Cordelia", "Marian", "Francis", "Jeanette", "Adeline", "Gussie", "Leah", "Lois", "Lura", "Mittie", "Hallie", "Isabella", "Olga", "Phoebe", "Teresa", "Hester", "Lida", "Lina", "Winnie", "Claudia", "Marguerite", "Vera", "Cecelia", "Bess", "Emilie", "John", "Rosetta", "Verna", "Myrtie", "Cecilia", "Elva", "Olivia", "Ophelia", "Georgie", "Elnora", "Violet", "Adele", "Lily", "Linnie", "Loretta", "Madge", "Polly", "Virgie", "Eugenia", "Lucile", "Lucille", "Mabelle", "Rosalie"],
          it: ["Ada", "Adriana", "Alessandra", "Alessia", "Alice", "Angela", "Anna", "Anna Maria", "Annalisa", "Annita", "Annunziata", "Antonella", "Arianna", "Asia", "Assunta", "Aurora", "Barbara", "Beatrice", "Benedetta", "Bianca", "Bruna", "Camilla", "Carla", "Carlotta", "Carmela", "Carolina", "Caterina", "Catia", "Cecilia", "Chiara", "Cinzia", "Clara", "Claudia", "Costanza", "Cristina", "Daniela", "Debora", "Diletta", "Dina", "Donatella", "Elena", "Eleonora", "Elisa", "Elisabetta", "Emanuela", "Emma", "Eva", "Federica", "Fernanda", "Fiorella", "Fiorenza", "Flora", "Franca", "Francesca", "Gabriella", "Gaia", "Gemma", "Giada", "Gianna", "Gina", "Ginevra", "Giorgia", "Giovanna", "Giulia", "Giuliana", "Giuseppa", "Giuseppina", "Grazia", "Graziella", "Greta", "Ida", "Ilaria", "Ines", "Iolanda", "Irene", "Irma", "Isabella", "Jessica", "Laura", "Leda", "Letizia", "Licia", "Lidia", "Liliana", "Lina", "Linda", "Lisa", "Livia", "Loretta", "Luana", "Lucia", "Luciana", "Lucrezia", "Luisa", "Manuela", "Mara", "Marcella", "Margherita", "Maria", "Maria Cristina", "Maria Grazia", "Maria Luisa", "Maria Pia", "Maria Teresa", "Marina", "Marisa", "Marta", "Martina", "Marzia", "Matilde", "Melissa", "Michela", "Milena", "Mirella", "Monica", "Natalina", "Nella", "Nicoletta", "Noemi", "Olga", "Paola", "Patrizia", "Piera", "Pierina", "Raffaella", "Rebecca", "Renata", "Rina", "Rita", "Roberta", "Rosa", "Rosanna", "Rossana", "Rossella", "Sabrina", "Sandra", "Sara", "Serena", "Silvana", "Silvia", "Simona", "Simonetta", "Sofia", "Sonia", "Stefania", "Susanna", "Teresa", "Tina", "Tiziana", "Tosca", "Valentina", "Valeria", "Vanda", "Vanessa", "Vanna", "Vera", "Veronica", "Vilma", "Viola", "Virginia", "Vittoria"]
        }
      },
      lastNames: {
        en: ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes", "Myers", "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan", "Owens", "Reynolds", "Fisher", "Ellis", "Harrison", "Gibson", "McDonald", "Cruz", "Marshall", "Ortiz", "Gomez", "Murray", "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", "Hunter", "Hicks", "Crawford", "Henry", "Boyd", "Mason", "Morales", "Kennedy", "Warren", "Dixon", "Ramos", "Reyes", "Burns", "Gordon", "Shaw", "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels", "Palmer", "Mills", "Nichols", "Grant", "Knight", "Ferguson", "Rose", "Stone", "Hawkins", "Dunn", "Perkins", "Hudson", "Spencer", "Gardner", "Stephens", "Payne", "Pierce", "Berry", "Matthews", "Arnold", "Wagner", "Willis", "Ray", "Watkins", "Olson", "Carroll", "Duncan", "Snyder", "Hart", "Cunningham", "Bradley", "Lane", "Andrews", "Ruiz", "Harper", "Fox", "Riley", "Armstrong", "Carpenter", "Weaver", "Greene", "Lawrence", "Elliott", "Chavez", "Sims", "Austin", "Peters", "Kelley", "Franklin", "Lawson", "Fields", "Gutierrez", "Ryan", "Schmidt", "Carr", "Vasquez", "Castillo", "Wheeler", "Chapman", "Oliver", "Montgomery", "Richards", "Williamson", "Johnston", "Banks", "Meyer", "Bishop", "McCoy", "Howell", "Alvarez", "Morrison", "Hansen", "Fernandez", "Garza", "Harvey", "Little", "Burton", "Stanley", "Nguyen", "George", "Jacobs", "Reid", "Kim", "Fuller", "Lynch", "Dean", "Gilbert", "Garrett", "Romero", "Welch", "Larson", "Frazier", "Burke", "Hanson", "Day", "Mendoza", "Moreno", "Bowman", "Medina", "Fowler", "Brewer", "Hoffman", "Carlson", "Silva", "Pearson", "Holland", "Douglas", "Fleming", "Jensen", "Vargas", "Byrd", "Davidson", "Hopkins", "May", "Terry", "Herrera", "Wade", "Soto", "Walters", "Curtis", "Neal", "Caldwell", "Lowe", "Jennings", "Barnett", "Graves", "Jimenez", "Horton", "Shelton", "Barrett", "Obrien", "Castro", "Sutton", "Gregory", "McKinney", "Lucas", "Miles", "Craig", "Rodriquez", "Chambers", "Holt", "Lambert", "Fletcher", "Watts", "Bates", "Hale", "Rhodes", "Pena", "Beck", "Newman", "Haynes", "McDaniel", "Mendez", "Bush", "Vaughn", "Parks", "Dawson", "Santiago", "Norris", "Hardy", "Love", "Steele", "Curry", "Powers", "Schultz", "Barker", "Guzman", "Page", "Munoz", "Ball", "Keller", "Chandler", "Weber", "Leonard", "Walsh", "Lyons", "Ramsey", "Wolfe", "Schneider", "Mullins", "Benson", "Sharp", "Bowen", "Daniel", "Barber", "Cummings", "Hines", "Baldwin", "Griffith", "Valdez", "Hubbard", "Salazar", "Reeves", "Warner", "Stevenson", "Burgess", "Santos", "Tate", "Cross", "Garner", "Mann", "Mack", "Moss", "Thornton", "Dennis", "McGee", "Farmer", "Delgado", "Aguilar", "Vega", "Glover", "Manning", "Cohen", "Harmon", "Rodgers", "Robbins", "Newton", "Todd", "Blair", "Higgins", "Ingram", "Reese", "Cannon", "Strickland", "Townsend", "Potter", "Goodwin", "Walton", "Rowe", "Hampton", "Ortega", "Patton", "Swanson", "Joseph", "Francis", "Goodman", "Maldonado", "Yates", "Becker", "Erickson", "Hodges", "Rios", "Conner", "Adkins", "Webster", "Norman", "Malone", "Hammond", "Flowers", "Cobb", "Moody", "Quinn", "Blake", "Maxwell", "Pope", "Floyd", "Osborne", "Paul", "McCarthy", "Guerrero", "Lindsey", "Estrada", "Sandoval", "Gibbs", "Tyler", "Gross", "Fitzgerald", "Stokes", "Doyle", "Sherman", "Saunders", "Wise", "Colon", "Gill", "Alvarado", "Greer", "Padilla", "Simon", "Waters", "Nunez", "Ballard", "Schwartz", "McBride", "Houston", "Christensen", "Klein", "Pratt", "Briggs", "Parsons", "McLaughlin", "Zimmerman", "French", "Buchanan", "Moran", "Copeland", "Roy", "Pittman", "Brady", "McCormick", "Holloway", "Brock", "Poole", "Frank", "Logan", "Owen", "Bass", "Marsh", "Drake", "Wong", "Jefferson", "Park", "Morton", "Abbott", "Sparks", "Patrick", "Norton", "Huff", "Clayton", "Massey", "Lloyd", "Figueroa", "Carson", "Bowers", "Roberson", "Barton", "Tran", "Lamb", "Harrington", "Casey", "Boone", "Cortez", "Clarke", "Mathis", "Singleton", "Wilkins", "Cain", "Bryan", "Underwood", "Hogan", "McKenzie", "Collier", "Luna", "Phelps", "McGuire", "Allison", "Bridges", "Wilkerson", "Nash", "Summers", "Atkins"],
        it: ["Acciai", "Aglietti", "Agostini", "Agresti", "Ahmed", "Aiazzi", "Albanese", "Alberti", "Alessi", "Alfani", "Alinari", "Alterini", "Amato", "Ammannati", "Ancillotti", "Andrei", "Andreini", "Andreoni", "Angeli", "Anichini", "Antonelli", "Antonini", "Arena", "Ariani", "Arnetoli", "Arrighi", "Baccani", "Baccetti", "Bacci", "Bacherini", "Badii", "Baggiani", "Baglioni", "Bagni", "Bagnoli", "Baldassini", "Baldi", "Baldini", "Ballerini", "Balli", "Ballini", "Balloni", "Bambi", "Banchi", "Bandinelli", "Bandini", "Bani", "Barbetti", "Barbieri", "Barchielli", "Bardazzi", "Bardelli", "Bardi", "Barducci", "Bargellini", "Bargiacchi", "Barni", "Baroncelli", "Baroncini", "Barone", "Baroni", "Baronti", "Bartalesi", "Bartoletti", "Bartoli", "Bartolini", "Bartoloni", "Bartolozzi", "Basagni", "Basile", "Bassi", "Batacchi", "Battaglia", "Battaglini", "Bausi", "Becagli", "Becattini", "Becchi", "Becucci", "Bellandi", "Bellesi", "Belli", "Bellini", "Bellucci", "Bencini", "Benedetti", "Benelli", "Beni", "Benini", "Bensi", "Benucci", "Benvenuti", "Berlincioni", "Bernacchioni", "Bernardi", "Bernardini", "Berni", "Bernini", "Bertelli", "Berti", "Bertini", "Bessi", "Betti", "Bettini", "Biagi", "Biagini", "Biagioni", "Biagiotti", "Biancalani", "Bianchi", "Bianchini", "Bianco", "Biffoli", "Bigazzi", "Bigi", "Biliotti", "Billi", "Binazzi", "Bindi", "Bini", "Biondi", "Bizzarri", "Bocci", "Bogani", "Bolognesi", "Bonaiuti", "Bonanni", "Bonciani", "Boncinelli", "Bondi", "Bonechi", "Bongini", "Boni", "Bonini", "Borchi", "Boretti", "Borghi", "Borghini", "Borgioli", "Borri", "Borselli", "Boschi", "Bottai", "Bracci", "Braccini", "Brandi", "Braschi", "Bravi", "Brazzini", "Breschi", "Brilli", "Brizzi", "Brogelli", "Brogi", "Brogioni", "Brunelli", "Brunetti", "Bruni", "Bruno", "Brunori", "Bruschi", "Bucci", "Bucciarelli", "Buccioni", "Bucelli", "Bulli", "Burberi", "Burchi", "Burgassi", "Burroni", "Bussotti", "Buti", "Caciolli", "Caiani", "Calabrese", "Calamai", "Calamandrei", "Caldini", "Calo'", "Calonaci", "Calosi", "Calvelli", "Cambi", "Camiciottoli", "Cammelli", "Cammilli", "Campolmi", "Cantini", "Capanni", "Capecchi", "Caponi", "Cappelletti", "Cappelli", "Cappellini", "Cappugi", "Capretti", "Caputo", "Carbone", "Carboni", "Cardini", "Carlesi", "Carletti", "Carli", "Caroti", "Carotti", "Carrai", "Carraresi", "Carta", "Caruso", "Casalini", "Casati", "Caselli", "Casini", "Castagnoli", "Castellani", "Castelli", "Castellucci", "Catalano", "Catarzi", "Catelani", "Cavaciocchi", "Cavallaro", "Cavallini", "Cavicchi", "Cavini", "Ceccarelli", "Ceccatelli", "Ceccherelli", "Ceccherini", "Cecchi", "Cecchini", "Cecconi", "Cei", "Cellai", "Celli", "Cellini", "Cencetti", "Ceni", "Cenni", "Cerbai", "Cesari", "Ceseri", "Checcacci", "Checchi", "Checcucci", "Cheli", "Chellini", "Chen", "Cheng", "Cherici", "Cherubini", "Chiaramonti", "Chiarantini", "Chiarelli", "Chiari", "Chiarini", "Chiarugi", "Chiavacci", "Chiesi", "Chimenti", "Chini", "Chirici", "Chiti", "Ciabatti", "Ciampi", "Cianchi", "Cianfanelli", "Cianferoni", "Ciani", "Ciapetti", "Ciappi", "Ciardi", "Ciatti", "Cicali", "Ciccone", "Cinelli", "Cini", "Ciobanu", "Ciolli", "Cioni", "Cipriani", "Cirillo", "Cirri", "Ciucchi", "Ciuffi", "Ciulli", "Ciullini", "Clemente", "Cocchi", "Cognome", "Coli", "Collini", "Colombo", "Colzi", "Comparini", "Conforti", "Consigli", "Conte", "Conti", "Contini", "Coppini", "Coppola", "Corsi", "Corsini", "Corti", "Cortini", "Cosi", "Costa", "Costantini", "Costantino", "Cozzi", "Cresci", "Crescioli", "Cresti", "Crini", "Curradi", "D'Agostino", "D'Alessandro", "D'Amico", "D'Angelo", "Daddi", "Dainelli", "Dallai", "Danti", "Davitti", "De Angelis", "De Luca", "De Marco", "De Rosa", "De Santis", "De Simone", "De Vita", "Degl'Innocenti", "Degli Innocenti", "Dei", "Del Lungo", "Del Re", "Di Marco", "Di Stefano", "Dini", "Diop", "Dobre", "Dolfi", "Donati", "Dondoli", "Dong", "Donnini", "Ducci", "Dumitru", "Ermini", "Esposito", "Evangelisti", "Fabbri", "Fabbrini", "Fabbrizzi", "Fabbroni", "Fabbrucci", "Fabiani", "Facchini", "Faggi", "Fagioli", "Failli", "Faini", "Falciani", "Falcini", "Falcone", "Fallani", "Falorni", "Falsini", "Falugiani", "Fancelli", "Fanelli", "Fanetti", "Fanfani", "Fani", "Fantappie'", "Fantechi", "Fanti", "Fantini", "Fantoni", "Farina", "Fattori", "Favilli", "Fedi", "Fei", "Ferrante", "Ferrara", "Ferrari", "Ferraro", "Ferretti", "Ferri", "Ferrini", "Ferroni", "Fiaschi", "Fibbi", "Fiesoli", "Filippi", "Filippini", "Fini", "Fioravanti", "Fiore", "Fiorentini", "Fiorini", "Fissi", "Focardi", "Foggi", "Fontana", "Fontanelli", "Fontani", "Forconi", "Formigli", "Forte", "Forti", "Fortini", "Fossati", "Fossi", "Francalanci", "Franceschi", "Franceschini", "Franchi", "Franchini", "Franci", "Francini", "Francioni", "Franco", "Frassineti", "Frati", "Fratini", "Frilli", "Frizzi", "Frosali", "Frosini", "Frullini", "Fusco", "Fusi", "Gabbrielli", "Gabellini", "Gagliardi", "Galanti", "Galardi", "Galeotti", "Galletti", "Galli", "Gallo", "Gallori", "Gambacciani", "Gargani", "Garofalo", "Garuglieri", "Gashi", "Gasperini", "Gatti", "Gelli", "Gensini", "Gentile", "Gentili", "Geri", "Gerini", "Gheri", "Ghini", "Giachetti", "Giachi", "Giacomelli", "Gianassi", "Giani", "Giannelli", "Giannetti", "Gianni", "Giannini", "Giannoni", "Giannotti", "Giannozzi", "Gigli", "Giordano", "Giorgetti", "Giorgi", "Giovacchini", "Giovannelli", "Giovannetti", "Giovannini", "Giovannoni", "Giuliani", "Giunti", "Giuntini", "Giusti", "Gonnelli", "Goretti", "Gori", "Gradi", "Gramigni", "Grassi", "Grasso", "Graziani", "Grazzini", "Greco", "Grifoni", "Grillo", "Grimaldi", "Grossi", "Gualtieri", "Guarducci", "Guarino", "Guarnieri", "Guasti", "Guerra", "Guerri", "Guerrini", "Guidi", "Guidotti", "He", "Hoxha", "Hu", "Huang", "Iandelli", "Ignesti", "Innocenti", "Jin", "La Rosa", "Lai", "Landi", "Landini", "Lanini", "Lapi", "Lapini", "Lari", "Lascialfari", "Lastrucci", "Latini", "Lazzeri", "Lazzerini", "Lelli", "Lenzi", "Leonardi", "Leoncini", "Leone", "Leoni", "Lepri", "Li", "Liao", "Lin", "Linari", "Lippi", "Lisi", "Livi", "Lombardi", "Lombardini", "Lombardo", "Longo", "Lopez", "Lorenzi", "Lorenzini", "Lorini", "Lotti", "Lu", "Lucchesi", "Lucherini", "Lunghi", "Lupi", "Madiai", "Maestrini", "Maffei", "Maggi", "Maggini", "Magherini", "Magini", "Magnani", "Magnelli", "Magni", "Magnolfi", "Magrini", "Malavolti", "Malevolti", "Manca", "Mancini", "Manetti", "Manfredi", "Mangani", "Mannelli", "Manni", "Mannini", "Mannucci", "Manuelli", "Manzini", "Marcelli", "Marchese", "Marchetti", "Marchi", "Marchiani", "Marchionni", "Marconi", "Marcucci", "Margheri", "Mari", "Mariani", "Marilli", "Marinai", "Marinari", "Marinelli", "Marini", "Marino", "Mariotti", "Marsili", "Martelli", "Martinelli", "Martini", "Martino", "Marzi", "Masi", "Masini", "Masoni", "Massai", "Materassi", "Mattei", "Matteini", "Matteucci", "Matteuzzi", "Mattioli", "Mattolini", "Matucci", "Mauro", "Mazzanti", "Mazzei", "Mazzetti", "Mazzi", "Mazzini", "Mazzocchi", "Mazzoli", "Mazzoni", "Mazzuoli", "Meacci", "Mecocci", "Meini", "Melani", "Mele", "Meli", "Mengoni", "Menichetti", "Meoni", "Merlini", "Messeri", "Messina", "Meucci", "Miccinesi", "Miceli", "Micheli", "Michelini", "Michelozzi", "Migliori", "Migliorini", "Milani", "Miniati", "Misuri", "Monaco", "Montagnani", "Montagni", "Montanari", "Montelatici", "Monti", "Montigiani", "Montini", "Morandi", "Morandini", "Morelli", "Moretti", "Morganti", "Mori", "Morini", "Moroni", "Morozzi", "Mugnai", "Mugnaini", "Mustafa", "Naldi", "Naldini", "Nannelli", "Nanni", "Nannini", "Nannucci", "Nardi", "Nardini", "Nardoni", "Natali", "Ndiaye", "Nencetti", "Nencini", "Nencioni", "Neri", "Nesi", "Nesti", "Niccolai", "Niccoli", "Niccolini", "Nigi", "Nistri", "Nocentini", "Noferini", "Novelli", "Nucci", "Nuti", "Nutini", "Oliva", "Olivieri", "Olmi", "Orlandi", "Orlandini", "Orlando", "Orsini", "Ortolani", "Ottanelli", "Pacciani", "Pace", "Paci", "Pacini", "Pagani", "Pagano", "Paggetti", "Pagliai", "Pagni", "Pagnini", "Paladini", "Palagi", "Palchetti", "Palloni", "Palmieri", "Palumbo", "Pampaloni", "Pancani", "Pandolfi", "Pandolfini", "Panerai", "Panichi", "Paoletti", "Paoli", "Paolini", "Papi", "Papini", "Papucci", "Parenti", "Parigi", "Parisi", "Parri", "Parrini", "Pasquini", "Passeri", "Pecchioli", "Pecorini", "Pellegrini", "Pepi", "Perini", "Perrone", "Peruzzi", "Pesci", "Pestelli", "Petri", "Petrini", "Petrucci", "Pettini", "Pezzati", "Pezzatini", "Piani", "Piazza", "Piazzesi", "Piazzini", "Piccardi", "Picchi", "Piccini", "Piccioli", "Pieraccini", "Pieraccioni", "Pieralli", "Pierattini", "Pieri", "Pierini", "Pieroni", "Pietrini", "Pini", "Pinna", "Pinto", "Pinzani", "Pinzauti", "Piras", "Pisani", "Pistolesi", "Poggesi", "Poggi", "Poggiali", "Poggiolini", "Poli", "Pollastri", "Porciani", "Pozzi", "Pratellesi", "Pratesi", "Prosperi", "Pruneti", "Pucci", "Puccini", "Puccioni", "Pugi", "Pugliese", "Puliti", "Querci", "Quercioli", "Raddi", "Radu", "Raffaelli", "Ragazzini", "Ranfagni", "Ranieri", "Rastrelli", "Raugei", "Raveggi", "Renai", "Renzi", "Rettori", "Ricci", "Ricciardi", "Ridi", "Ridolfi", "Rigacci", "Righi", "Righini", "Rinaldi", "Risaliti", "Ristori", "Rizzo", "Rocchi", "Rocchini", "Rogai", "Romagnoli", "Romanelli", "Romani", "Romano", "Romei", "Romeo", "Romiti", "Romoli", "Romolini", "Rontini", "Rosati", "Roselli", "Rosi", "Rossetti", "Rossi", "Rossini", "Rovai", "Ruggeri", "Ruggiero", "Russo", "Sabatini", "Saccardi", "Sacchetti", "Sacchi", "Sacco", "Salerno", "Salimbeni", "Salucci", "Salvadori", "Salvestrini", "Salvi", "Salvini", "Sanesi", "Sani", "Sanna", "Santi", "Santini", "Santoni", "Santoro", "Santucci", "Sardi", "Sarri", "Sarti", "Sassi", "Sbolci", "Scali", "Scarpelli", "Scarselli", "Scopetani", "Secci", "Selvi", "Senatori", "Senesi", "Serafini", "Sereni", "Serra", "Sestini", "Sguanci", "Sieni", "Signorini", "Silvestri", "Simoncini", "Simonetti", "Simoni", "Singh", "Sodi", "Soldi", "Somigli", "Sorbi", "Sorelli", "Sorrentino", "Sottili", "Spina", "Spinelli", "Staccioli", "Staderini", "Stefanelli", "Stefani", "Stefanini", "Stella", "Susini", "Tacchi", "Tacconi", "Taddei", "Tagliaferri", "Tamburini", "Tanganelli", "Tani", "Tanini", "Tapinassi", "Tarchi", "Tarchiani", "Targioni", "Tassi", "Tassini", "Tempesti", "Terzani", "Tesi", "Testa", "Testi", "Tilli", "Tinti", "Tirinnanzi", "Toccafondi", "Tofanari", "Tofani", "Tognaccini", "Tonelli", "Tonini", "Torelli", "Torrini", "Tosi", "Toti", "Tozzi", "Trambusti", "Trapani", "Tucci", "Turchi", "Ugolini", "Ulivi", "Valente", "Valenti", "Valentini", "Vangelisti", "Vanni", "Vannini", "Vannoni", "Vannozzi", "Vannucchi", "Vannucci", "Ventura", "Venturi", "Venturini", "Vestri", "Vettori", "Vichi", "Viciani", "Vieri", "Vigiani", "Vignoli", "Vignolini", "Vignozzi", "Villani", "Vinci", "Visani", "Vitale", "Vitali", "Viti", "Viviani", "Vivoli", "Volpe", "Volpi", "Wang", "Wu", "Xu", "Yang", "Ye", "Zagli", "Zani", "Zanieri", "Zanobini", "Zecchi", "Zetti", "Zhang", "Zheng", "Zhou", "Zhu", "Zingoni", "Zini", "Zoppi"]
      },
      countries: [{
        name: "Afghanistan",
        abbreviation: "AF"
      }, {
        name: "Albania",
        abbreviation: "AL"
      }, {
        name: "Algeria",
        abbreviation: "DZ"
      }, {
        name: "American Samoa",
        abbreviation: "AS"
      }, {
        name: "Andorra",
        abbreviation: "AD"
      }, {
        name: "Angola",
        abbreviation: "AO"
      }, {
        name: "Anguilla",
        abbreviation: "AI"
      }, {
        name: "Antarctica",
        abbreviation: "AQ"
      }, {
        name: "Antigua and Barbuda",
        abbreviation: "AG"
      }, {
        name: "Argentina",
        abbreviation: "AR"
      }, {
        name: "Armenia",
        abbreviation: "AM"
      }, {
        name: "Aruba",
        abbreviation: "AW"
      }, {
        name: "Australia",
        abbreviation: "AU"
      }, {
        name: "Austria",
        abbreviation: "AT"
      }, {
        name: "Azerbaijan",
        abbreviation: "AZ"
      }, {
        name: "Bahamas",
        abbreviation: "BS"
      }, {
        name: "Bahrain",
        abbreviation: "BH"
      }, {
        name: "Bangladesh",
        abbreviation: "BD"
      }, {
        name: "Barbados",
        abbreviation: "BB"
      }, {
        name: "Belarus",
        abbreviation: "BY"
      }, {
        name: "Belgium",
        abbreviation: "BE"
      }, {
        name: "Belize",
        abbreviation: "BZ"
      }, {
        name: "Benin",
        abbreviation: "BJ"
      }, {
        name: "Bermuda",
        abbreviation: "BM"
      }, {
        name: "Bhutan",
        abbreviation: "BT"
      }, {
        name: "Bolivia",
        abbreviation: "BO"
      }, {
        name: "Bosnia and Herzegovina",
        abbreviation: "BA"
      }, {
        name: "Botswana",
        abbreviation: "BW"
      }, {
        name: "Bouvet Island",
        abbreviation: "BV"
      }, {
        name: "Brazil",
        abbreviation: "BR"
      }, {
        name: "British Antarctic Territory",
        abbreviation: "BQ"
      }, {
        name: "British Indian Ocean Territory",
        abbreviation: "IO"
      }, {
        name: "British Virgin Islands",
        abbreviation: "VG"
      }, {
        name: "Brunei",
        abbreviation: "BN"
      }, {
        name: "Bulgaria",
        abbreviation: "BG"
      }, {
        name: "Burkina Faso",
        abbreviation: "BF"
      }, {
        name: "Burundi",
        abbreviation: "BI"
      }, {
        name: "Cambodia",
        abbreviation: "KH"
      }, {
        name: "Cameroon",
        abbreviation: "CM"
      }, {
        name: "Canada",
        abbreviation: "CA"
      }, {
        name: "Canton and Enderbury Islands",
        abbreviation: "CT"
      }, {
        name: "Cape Verde",
        abbreviation: "CV"
      }, {
        name: "Cayman Islands",
        abbreviation: "KY"
      }, {
        name: "Central African Republic",
        abbreviation: "CF"
      }, {
        name: "Chad",
        abbreviation: "TD"
      }, {
        name: "Chile",
        abbreviation: "CL"
      }, {
        name: "China",
        abbreviation: "CN"
      }, {
        name: "Christmas Island",
        abbreviation: "CX"
      }, {
        name: "Cocos [Keeling] Islands",
        abbreviation: "CC"
      }, {
        name: "Colombia",
        abbreviation: "CO"
      }, {
        name: "Comoros",
        abbreviation: "KM"
      }, {
        name: "Congo - Brazzaville",
        abbreviation: "CG"
      }, {
        name: "Congo - Kinshasa",
        abbreviation: "CD"
      }, {
        name: "Cook Islands",
        abbreviation: "CK"
      }, {
        name: "Costa Rica",
        abbreviation: "CR"
      }, {
        name: "Croatia",
        abbreviation: "HR"
      }, {
        name: "Cuba",
        abbreviation: "CU"
      }, {
        name: "Cyprus",
        abbreviation: "CY"
      }, {
        name: "Czech Republic",
        abbreviation: "CZ"
      }, {
        name: "Côte d’Ivoire",
        abbreviation: "CI"
      }, {
        name: "Denmark",
        abbreviation: "DK"
      }, {
        name: "Djibouti",
        abbreviation: "DJ"
      }, {
        name: "Dominica",
        abbreviation: "DM"
      }, {
        name: "Dominican Republic",
        abbreviation: "DO"
      }, {
        name: "Dronning Maud Land",
        abbreviation: "NQ"
      }, {
        name: "East Germany",
        abbreviation: "DD"
      }, {
        name: "Ecuador",
        abbreviation: "EC"
      }, {
        name: "Egypt",
        abbreviation: "EG"
      }, {
        name: "El Salvador",
        abbreviation: "SV"
      }, {
        name: "Equatorial Guinea",
        abbreviation: "GQ"
      }, {
        name: "Eritrea",
        abbreviation: "ER"
      }, {
        name: "Estonia",
        abbreviation: "EE"
      }, {
        name: "Ethiopia",
        abbreviation: "ET"
      }, {
        name: "Falkland Islands",
        abbreviation: "FK"
      }, {
        name: "Faroe Islands",
        abbreviation: "FO"
      }, {
        name: "Fiji",
        abbreviation: "FJ"
      }, {
        name: "Finland",
        abbreviation: "FI"
      }, {
        name: "France",
        abbreviation: "FR"
      }, {
        name: "French Guiana",
        abbreviation: "GF"
      }, {
        name: "French Polynesia",
        abbreviation: "PF"
      }, {
        name: "French Southern Territories",
        abbreviation: "TF"
      }, {
        name: "French Southern and Antarctic Territories",
        abbreviation: "FQ"
      }, {
        name: "Gabon",
        abbreviation: "GA"
      }, {
        name: "Gambia",
        abbreviation: "GM"
      }, {
        name: "Georgia",
        abbreviation: "GE"
      }, {
        name: "Germany",
        abbreviation: "DE"
      }, {
        name: "Ghana",
        abbreviation: "GH"
      }, {
        name: "Gibraltar",
        abbreviation: "GI"
      }, {
        name: "Greece",
        abbreviation: "GR"
      }, {
        name: "Greenland",
        abbreviation: "GL"
      }, {
        name: "Grenada",
        abbreviation: "GD"
      }, {
        name: "Guadeloupe",
        abbreviation: "GP"
      }, {
        name: "Guam",
        abbreviation: "GU"
      }, {
        name: "Guatemala",
        abbreviation: "GT"
      }, {
        name: "Guernsey",
        abbreviation: "GG"
      }, {
        name: "Guinea",
        abbreviation: "GN"
      }, {
        name: "Guinea-Bissau",
        abbreviation: "GW"
      }, {
        name: "Guyana",
        abbreviation: "GY"
      }, {
        name: "Haiti",
        abbreviation: "HT"
      }, {
        name: "Heard Island and McDonald Islands",
        abbreviation: "HM"
      }, {
        name: "Honduras",
        abbreviation: "HN"
      }, {
        name: "Hong Kong SAR China",
        abbreviation: "HK"
      }, {
        name: "Hungary",
        abbreviation: "HU"
      }, {
        name: "Iceland",
        abbreviation: "IS"
      }, {
        name: "India",
        abbreviation: "IN"
      }, {
        name: "Indonesia",
        abbreviation: "ID"
      }, {
        name: "Iran",
        abbreviation: "IR"
      }, {
        name: "Iraq",
        abbreviation: "IQ"
      }, {
        name: "Ireland",
        abbreviation: "IE"
      }, {
        name: "Isle of Man",
        abbreviation: "IM"
      }, {
        name: "Israel",
        abbreviation: "IL"
      }, {
        name: "Italy",
        abbreviation: "IT"
      }, {
        name: "Jamaica",
        abbreviation: "JM"
      }, {
        name: "Japan",
        abbreviation: "JP"
      }, {
        name: "Jersey",
        abbreviation: "JE"
      }, {
        name: "Johnston Island",
        abbreviation: "JT"
      }, {
        name: "Jordan",
        abbreviation: "JO"
      }, {
        name: "Kazakhstan",
        abbreviation: "KZ"
      }, {
        name: "Kenya",
        abbreviation: "KE"
      }, {
        name: "Kiribati",
        abbreviation: "KI"
      }, {
        name: "Kuwait",
        abbreviation: "KW"
      }, {
        name: "Kyrgyzstan",
        abbreviation: "KG"
      }, {
        name: "Laos",
        abbreviation: "LA"
      }, {
        name: "Latvia",
        abbreviation: "LV"
      }, {
        name: "Lebanon",
        abbreviation: "LB"
      }, {
        name: "Lesotho",
        abbreviation: "LS"
      }, {
        name: "Liberia",
        abbreviation: "LR"
      }, {
        name: "Libya",
        abbreviation: "LY"
      }, {
        name: "Liechtenstein",
        abbreviation: "LI"
      }, {
        name: "Lithuania",
        abbreviation: "LT"
      }, {
        name: "Luxembourg",
        abbreviation: "LU"
      }, {
        name: "Macau SAR China",
        abbreviation: "MO"
      }, {
        name: "Macedonia",
        abbreviation: "MK"
      }, {
        name: "Madagascar",
        abbreviation: "MG"
      }, {
        name: "Malawi",
        abbreviation: "MW"
      }, {
        name: "Malaysia",
        abbreviation: "MY"
      }, {
        name: "Maldives",
        abbreviation: "MV"
      }, {
        name: "Mali",
        abbreviation: "ML"
      }, {
        name: "Malta",
        abbreviation: "MT"
      }, {
        name: "Marshall Islands",
        abbreviation: "MH"
      }, {
        name: "Martinique",
        abbreviation: "MQ"
      }, {
        name: "Mauritania",
        abbreviation: "MR"
      }, {
        name: "Mauritius",
        abbreviation: "MU"
      }, {
        name: "Mayotte",
        abbreviation: "YT"
      }, {
        name: "Metropolitan France",
        abbreviation: "FX"
      }, {
        name: "Mexico",
        abbreviation: "MX"
      }, {
        name: "Micronesia",
        abbreviation: "FM"
      }, {
        name: "Midway Islands",
        abbreviation: "MI"
      }, {
        name: "Moldova",
        abbreviation: "MD"
      }, {
        name: "Monaco",
        abbreviation: "MC"
      }, {
        name: "Mongolia",
        abbreviation: "MN"
      }, {
        name: "Montenegro",
        abbreviation: "ME"
      }, {
        name: "Montserrat",
        abbreviation: "MS"
      }, {
        name: "Morocco",
        abbreviation: "MA"
      }, {
        name: "Mozambique",
        abbreviation: "MZ"
      }, {
        name: "Myanmar [Burma]",
        abbreviation: "MM"
      }, {
        name: "Namibia",
        abbreviation: "NA"
      }, {
        name: "Nauru",
        abbreviation: "NR"
      }, {
        name: "Nepal",
        abbreviation: "NP"
      }, {
        name: "Netherlands",
        abbreviation: "NL"
      }, {
        name: "Netherlands Antilles",
        abbreviation: "AN"
      }, {
        name: "Neutral Zone",
        abbreviation: "NT"
      }, {
        name: "New Caledonia",
        abbreviation: "NC"
      }, {
        name: "New Zealand",
        abbreviation: "NZ"
      }, {
        name: "Nicaragua",
        abbreviation: "NI"
      }, {
        name: "Niger",
        abbreviation: "NE"
      }, {
        name: "Nigeria",
        abbreviation: "NG"
      }, {
        name: "Niue",
        abbreviation: "NU"
      }, {
        name: "Norfolk Island",
        abbreviation: "NF"
      }, {
        name: "North Korea",
        abbreviation: "KP"
      }, {
        name: "North Vietnam",
        abbreviation: "VD"
      }, {
        name: "Northern Mariana Islands",
        abbreviation: "MP"
      }, {
        name: "Norway",
        abbreviation: "NO"
      }, {
        name: "Oman",
        abbreviation: "OM"
      }, {
        name: "Pacific Islands Trust Territory",
        abbreviation: "PC"
      }, {
        name: "Pakistan",
        abbreviation: "PK"
      }, {
        name: "Palau",
        abbreviation: "PW"
      }, {
        name: "Palestinian Territories",
        abbreviation: "PS"
      }, {
        name: "Panama",
        abbreviation: "PA"
      }, {
        name: "Panama Canal Zone",
        abbreviation: "PZ"
      }, {
        name: "Papua New Guinea",
        abbreviation: "PG"
      }, {
        name: "Paraguay",
        abbreviation: "PY"
      }, {
        name: "People's Democratic Republic of Yemen",
        abbreviation: "YD"
      }, {
        name: "Peru",
        abbreviation: "PE"
      }, {
        name: "Philippines",
        abbreviation: "PH"
      }, {
        name: "Pitcairn Islands",
        abbreviation: "PN"
      }, {
        name: "Poland",
        abbreviation: "PL"
      }, {
        name: "Portugal",
        abbreviation: "PT"
      }, {
        name: "Puerto Rico",
        abbreviation: "PR"
      }, {
        name: "Qatar",
        abbreviation: "QA"
      }, {
        name: "Romania",
        abbreviation: "RO"
      }, {
        name: "Russia",
        abbreviation: "RU"
      }, {
        name: "Rwanda",
        abbreviation: "RW"
      }, {
        name: "Réunion",
        abbreviation: "RE"
      }, {
        name: "Saint Barthélemy",
        abbreviation: "BL"
      }, {
        name: "Saint Helena",
        abbreviation: "SH"
      }, {
        name: "Saint Kitts and Nevis",
        abbreviation: "KN"
      }, {
        name: "Saint Lucia",
        abbreviation: "LC"
      }, {
        name: "Saint Martin",
        abbreviation: "MF"
      }, {
        name: "Saint Pierre and Miquelon",
        abbreviation: "PM"
      }, {
        name: "Saint Vincent and the Grenadines",
        abbreviation: "VC"
      }, {
        name: "Samoa",
        abbreviation: "WS"
      }, {
        name: "San Marino",
        abbreviation: "SM"
      }, {
        name: "Saudi Arabia",
        abbreviation: "SA"
      }, {
        name: "Senegal",
        abbreviation: "SN"
      }, {
        name: "Serbia",
        abbreviation: "RS"
      }, {
        name: "Serbia and Montenegro",
        abbreviation: "CS"
      }, {
        name: "Seychelles",
        abbreviation: "SC"
      }, {
        name: "Sierra Leone",
        abbreviation: "SL"
      }, {
        name: "Singapore",
        abbreviation: "SG"
      }, {
        name: "Slovakia",
        abbreviation: "SK"
      }, {
        name: "Slovenia",
        abbreviation: "SI"
      }, {
        name: "Solomon Islands",
        abbreviation: "SB"
      }, {
        name: "Somalia",
        abbreviation: "SO"
      }, {
        name: "South Africa",
        abbreviation: "ZA"
      }, {
        name: "South Georgia and the South Sandwich Islands",
        abbreviation: "GS"
      }, {
        name: "South Korea",
        abbreviation: "KR"
      }, {
        name: "Spain",
        abbreviation: "ES"
      }, {
        name: "Sri Lanka",
        abbreviation: "LK"
      }, {
        name: "Sudan",
        abbreviation: "SD"
      }, {
        name: "Suriname",
        abbreviation: "SR"
      }, {
        name: "Svalbard and Jan Mayen",
        abbreviation: "SJ"
      }, {
        name: "Swaziland",
        abbreviation: "SZ"
      }, {
        name: "Sweden",
        abbreviation: "SE"
      }, {
        name: "Switzerland",
        abbreviation: "CH"
      }, {
        name: "Syria",
        abbreviation: "SY"
      }, {
        name: "São Tomé and Príncipe",
        abbreviation: "ST"
      }, {
        name: "Taiwan",
        abbreviation: "TW"
      }, {
        name: "Tajikistan",
        abbreviation: "TJ"
      }, {
        name: "Tanzania",
        abbreviation: "TZ"
      }, {
        name: "Thailand",
        abbreviation: "TH"
      }, {
        name: "Timor-Leste",
        abbreviation: "TL"
      }, {
        name: "Togo",
        abbreviation: "TG"
      }, {
        name: "Tokelau",
        abbreviation: "TK"
      }, {
        name: "Tonga",
        abbreviation: "TO"
      }, {
        name: "Trinidad and Tobago",
        abbreviation: "TT"
      }, {
        name: "Tunisia",
        abbreviation: "TN"
      }, {
        name: "Turkey",
        abbreviation: "TR"
      }, {
        name: "Turkmenistan",
        abbreviation: "TM"
      }, {
        name: "Turks and Caicos Islands",
        abbreviation: "TC"
      }, {
        name: "Tuvalu",
        abbreviation: "TV"
      }, {
        name: "U.S. Minor Outlying Islands",
        abbreviation: "UM"
      }, {
        name: "U.S. Miscellaneous Pacific Islands",
        abbreviation: "PU"
      }, {
        name: "U.S. Virgin Islands",
        abbreviation: "VI"
      }, {
        name: "Uganda",
        abbreviation: "UG"
      }, {
        name: "Ukraine",
        abbreviation: "UA"
      }, {
        name: "Union of Soviet Socialist Republics",
        abbreviation: "SU"
      }, {
        name: "United Arab Emirates",
        abbreviation: "AE"
      }, {
        name: "United Kingdom",
        abbreviation: "GB"
      }, {
        name: "United States",
        abbreviation: "US"
      }, {
        name: "Unknown or Invalid Region",
        abbreviation: "ZZ"
      }, {
        name: "Uruguay",
        abbreviation: "UY"
      }, {
        name: "Uzbekistan",
        abbreviation: "UZ"
      }, {
        name: "Vanuatu",
        abbreviation: "VU"
      }, {
        name: "Vatican City",
        abbreviation: "VA"
      }, {
        name: "Venezuela",
        abbreviation: "VE"
      }, {
        name: "Vietnam",
        abbreviation: "VN"
      }, {
        name: "Wake Island",
        abbreviation: "WK"
      }, {
        name: "Wallis and Futuna",
        abbreviation: "WF"
      }, {
        name: "Western Sahara",
        abbreviation: "EH"
      }, {
        name: "Yemen",
        abbreviation: "YE"
      }, {
        name: "Zambia",
        abbreviation: "ZM"
      }, {
        name: "Zimbabwe",
        abbreviation: "ZW"
      }, {
        name: "Åland Islands",
        abbreviation: "AX"
      }],
      provinces: {
        ca: [{
          name: "Alberta",
          abbreviation: "AB"
        }, {
          name: "British Columbia",
          abbreviation: "BC"
        }, {
          name: "Manitoba",
          abbreviation: "MB"
        }, {
          name: "New Brunswick",
          abbreviation: "NB"
        }, {
          name: "Newfoundland and Labrador",
          abbreviation: "NL"
        }, {
          name: "Nova Scotia",
          abbreviation: "NS"
        }, {
          name: "Ontario",
          abbreviation: "ON"
        }, {
          name: "Prince Edward Island",
          abbreviation: "PE"
        }, {
          name: "Quebec",
          abbreviation: "QC"
        }, {
          name: "Saskatchewan",
          abbreviation: "SK"
        }, {
          name: "Northwest Territories",
          abbreviation: "NT"
        }, {
          name: "Nunavut",
          abbreviation: "NU"
        }, {
          name: "Yukon",
          abbreviation: "YT"
        }],
        it: [{
          name: "Agrigento",
          abbreviation: "AG",
          code: 84
        }, {
          name: "Alessandria",
          abbreviation: "AL",
          code: 6
        }, {
          name: "Ancona",
          abbreviation: "AN",
          code: 42
        }, {
          name: "Aosta",
          abbreviation: "AO",
          code: 7
        }, {
          name: "L'Aquila",
          abbreviation: "AQ",
          code: 66
        }, {
          name: "Arezzo",
          abbreviation: "AR",
          code: 51
        }, {
          name: "Ascoli-Piceno",
          abbreviation: "AP",
          code: 44
        }, {
          name: "Asti",
          abbreviation: "AT",
          code: 5
        }, {
          name: "Avellino",
          abbreviation: "AV",
          code: 64
        }, {
          name: "Bari",
          abbreviation: "BA",
          code: 72
        }, {
          name: "Barletta-Andria-Trani",
          abbreviation: "BT",
          code: 72
        }, {
          name: "Belluno",
          abbreviation: "BL",
          code: 25
        }, {
          name: "Benevento",
          abbreviation: "BN",
          code: 62
        }, {
          name: "Bergamo",
          abbreviation: "BG",
          code: 16
        }, {
          name: "Biella",
          abbreviation: "BI",
          code: 96
        }, {
          name: "Bologna",
          abbreviation: "BO",
          code: 37
        }, {
          name: "Bolzano",
          abbreviation: "BZ",
          code: 21
        }, {
          name: "Brescia",
          abbreviation: "BS",
          code: 17
        }, {
          name: "Brindisi",
          abbreviation: "BR",
          code: 74
        }, {
          name: "Cagliari",
          abbreviation: "CA",
          code: 92
        }, {
          name: "Caltanissetta",
          abbreviation: "CL",
          code: 85
        }, {
          name: "Campobasso",
          abbreviation: "CB",
          code: 70
        }, {
          name: "Carbonia Iglesias",
          abbreviation: "CI",
          code: 70
        }, {
          name: "Caserta",
          abbreviation: "CE",
          code: 61
        }, {
          name: "Catania",
          abbreviation: "CT",
          code: 87
        }, {
          name: "Catanzaro",
          abbreviation: "CZ",
          code: 79
        }, {
          name: "Chieti",
          abbreviation: "CH",
          code: 69
        }, {
          name: "Como",
          abbreviation: "CO",
          code: 13
        }, {
          name: "Cosenza",
          abbreviation: "CS",
          code: 78
        }, {
          name: "Cremona",
          abbreviation: "CR",
          code: 19
        }, {
          name: "Crotone",
          abbreviation: "KR",
          code: 101
        }, {
          name: "Cuneo",
          abbreviation: "CN",
          code: 4
        }, {
          name: "Enna",
          abbreviation: "EN",
          code: 86
        }, {
          name: "Fermo",
          abbreviation: "FM",
          code: 86
        }, {
          name: "Ferrara",
          abbreviation: "FE",
          code: 38
        }, {
          name: "Firenze",
          abbreviation: "FI",
          code: 48
        }, {
          name: "Foggia",
          abbreviation: "FG",
          code: 71
        }, {
          name: "Forli-Cesena",
          abbreviation: "FC",
          code: 71
        }, {
          name: "Frosinone",
          abbreviation: "FR",
          code: 60
        }, {
          name: "Genova",
          abbreviation: "GE",
          code: 10
        }, {
          name: "Gorizia",
          abbreviation: "GO",
          code: 31
        }, {
          name: "Grosseto",
          abbreviation: "GR",
          code: 53
        }, {
          name: "Imperia",
          abbreviation: "IM",
          code: 8
        }, {
          name: "Isernia",
          abbreviation: "IS",
          code: 94
        }, {
          name: "La-Spezia",
          abbreviation: "SP",
          code: 66
        }, {
          name: "Latina",
          abbreviation: "LT",
          code: 59
        }, {
          name: "Lecce",
          abbreviation: "LE",
          code: 75
        }, {
          name: "Lecco",
          abbreviation: "LC",
          code: 97
        }, {
          name: "Livorno",
          abbreviation: "LI",
          code: 49
        }, {
          name: "Lodi",
          abbreviation: "LO",
          code: 98
        }, {
          name: "Lucca",
          abbreviation: "LU",
          code: 46
        }, {
          name: "Macerata",
          abbreviation: "MC",
          code: 43
        }, {
          name: "Mantova",
          abbreviation: "MN",
          code: 20
        }, {
          name: "Massa-Carrara",
          abbreviation: "MS",
          code: 45
        }, {
          name: "Matera",
          abbreviation: "MT",
          code: 77
        }, {
          name: "Medio Campidano",
          abbreviation: "VS",
          code: 77
        }, {
          name: "Messina",
          abbreviation: "ME",
          code: 83
        }, {
          name: "Milano",
          abbreviation: "MI",
          code: 15
        }, {
          name: "Modena",
          abbreviation: "MO",
          code: 36
        }, {
          name: "Monza-Brianza",
          abbreviation: "MB",
          code: 36
        }, {
          name: "Napoli",
          abbreviation: "NA",
          code: 63
        }, {
          name: "Novara",
          abbreviation: "NO",
          code: 3
        }, {
          name: "Nuoro",
          abbreviation: "NU",
          code: 91
        }, {
          name: "Ogliastra",
          abbreviation: "OG",
          code: 91
        }, {
          name: "Olbia Tempio",
          abbreviation: "OT",
          code: 91
        }, {
          name: "Oristano",
          abbreviation: "OR",
          code: 95
        }, {
          name: "Padova",
          abbreviation: "PD",
          code: 28
        }, {
          name: "Palermo",
          abbreviation: "PA",
          code: 82
        }, {
          name: "Parma",
          abbreviation: "PR",
          code: 34
        }, {
          name: "Pavia",
          abbreviation: "PV",
          code: 18
        }, {
          name: "Perugia",
          abbreviation: "PG",
          code: 54
        }, {
          name: "Pesaro-Urbino",
          abbreviation: "PU",
          code: 41
        }, {
          name: "Pescara",
          abbreviation: "PE",
          code: 68
        }, {
          name: "Piacenza",
          abbreviation: "PC",
          code: 33
        }, {
          name: "Pisa",
          abbreviation: "PI",
          code: 50
        }, {
          name: "Pistoia",
          abbreviation: "PT",
          code: 47
        }, {
          name: "Pordenone",
          abbreviation: "PN",
          code: 93
        }, {
          name: "Potenza",
          abbreviation: "PZ",
          code: 76
        }, {
          name: "Prato",
          abbreviation: "PO",
          code: 100
        }, {
          name: "Ragusa",
          abbreviation: "RG",
          code: 88
        }, {
          name: "Ravenna",
          abbreviation: "RA",
          code: 39
        }, {
          name: "Reggio-Calabria",
          abbreviation: "RC",
          code: 35
        }, {
          name: "Reggio-Emilia",
          abbreviation: "RE",
          code: 35
        }, {
          name: "Rieti",
          abbreviation: "RI",
          code: 57
        }, {
          name: "Rimini",
          abbreviation: "RN",
          code: 99
        }, {
          name: "Roma",
          abbreviation: "Roma",
          code: 58
        }, {
          name: "Rovigo",
          abbreviation: "RO",
          code: 29
        }, {
          name: "Salerno",
          abbreviation: "SA",
          code: 65
        }, {
          name: "Sassari",
          abbreviation: "SS",
          code: 90
        }, {
          name: "Savona",
          abbreviation: "SV",
          code: 9
        }, {
          name: "Siena",
          abbreviation: "SI",
          code: 52
        }, {
          name: "Siracusa",
          abbreviation: "SR",
          code: 89
        }, {
          name: "Sondrio",
          abbreviation: "SO",
          code: 14
        }, {
          name: "Taranto",
          abbreviation: "TA",
          code: 73
        }, {
          name: "Teramo",
          abbreviation: "TE",
          code: 67
        }, {
          name: "Terni",
          abbreviation: "TR",
          code: 55
        }, {
          name: "Torino",
          abbreviation: "TO",
          code: 1
        }, {
          name: "Trapani",
          abbreviation: "TP",
          code: 81
        }, {
          name: "Trento",
          abbreviation: "TN",
          code: 22
        }, {
          name: "Treviso",
          abbreviation: "TV",
          code: 26
        }, {
          name: "Trieste",
          abbreviation: "TS",
          code: 32
        }, {
          name: "Udine",
          abbreviation: "UD",
          code: 30
        }, {
          name: "Varese",
          abbreviation: "VA",
          code: 12
        }, {
          name: "Venezia",
          abbreviation: "VE",
          code: 27
        }, {
          name: "Verbania",
          abbreviation: "VB",
          code: 27
        }, {
          name: "Vercelli",
          abbreviation: "VC",
          code: 2
        }, {
          name: "Verona",
          abbreviation: "VR",
          code: 23
        }, {
          name: "Vibo-Valentia",
          abbreviation: "VV",
          code: 102
        }, {
          name: "Vicenza",
          abbreviation: "VI",
          code: 24
        }, {
          name: "Viterbo",
          abbreviation: "VT",
          code: 56
        }]
      },
      nationalities: [{
        name: "Afghan"
      }, {
        name: "Albanian"
      }, {
        name: "Algerian"
      }, {
        name: "American"
      }, {
        name: "Andorran"
      }, {
        name: "Angolan"
      }, {
        name: "Antiguans"
      }, {
        name: "Argentinean"
      }, {
        name: "Armenian"
      }, {
        name: "Australian"
      }, {
        name: "Austrian"
      }, {
        name: "Azerbaijani"
      }, {
        name: "Bahami"
      }, {
        name: "Bahraini"
      }, {
        name: "Bangladeshi"
      }, {
        name: "Barbadian"
      }, {
        name: "Barbudans"
      }, {
        name: "Batswana"
      }, {
        name: "Belarusian"
      }, {
        name: "Belgian"
      }, {
        name: "Belizean"
      }, {
        name: "Beninese"
      }, {
        name: "Bhutanese"
      }, {
        name: "Bolivian"
      }, {
        name: "Bosnian"
      }, {
        name: "Brazilian"
      }, {
        name: "British"
      }, {
        name: "Bruneian"
      }, {
        name: "Bulgarian"
      }, {
        name: "Burkinabe"
      }, {
        name: "Burmese"
      }, {
        name: "Burundian"
      }, {
        name: "Cambodian"
      }, {
        name: "Cameroonian"
      }, {
        name: "Canadian"
      }, {
        name: "Cape Verdean"
      }, {
        name: "Central African"
      }, {
        name: "Chadian"
      }, {
        name: "Chilean"
      }, {
        name: "Chinese"
      }, {
        name: "Colombian"
      }, {
        name: "Comoran"
      }, {
        name: "Congolese"
      }, {
        name: "Costa Rican"
      }, {
        name: "Croatian"
      }, {
        name: "Cuban"
      }, {
        name: "Cypriot"
      }, {
        name: "Czech"
      }, {
        name: "Danish"
      }, {
        name: "Djibouti"
      }, {
        name: "Dominican"
      }, {
        name: "Dutch"
      }, {
        name: "East Timorese"
      }, {
        name: "Ecuadorean"
      }, {
        name: "Egyptian"
      }, {
        name: "Emirian"
      }, {
        name: "Equatorial Guinean"
      }, {
        name: "Eritrean"
      }, {
        name: "Estonian"
      }, {
        name: "Ethiopian"
      }, {
        name: "Fijian"
      }, {
        name: "Filipino"
      }, {
        name: "Finnish"
      }, {
        name: "French"
      }, {
        name: "Gabonese"
      }, {
        name: "Gambian"
      }, {
        name: "Georgian"
      }, {
        name: "German"
      }, {
        name: "Ghanaian"
      }, {
        name: "Greek"
      }, {
        name: "Grenadian"
      }, {
        name: "Guatemalan"
      }, {
        name: "Guinea-Bissauan"
      }, {
        name: "Guinean"
      }, {
        name: "Guyanese"
      }, {
        name: "Haitian"
      }, {
        name: "Herzegovinian"
      }, {
        name: "Honduran"
      }, {
        name: "Hungarian"
      }, {
        name: "I-Kiribati"
      }, {
        name: "Icelander"
      }, {
        name: "Indian"
      }, {
        name: "Indonesian"
      }, {
        name: "Iranian"
      }, {
        name: "Iraqi"
      }, {
        name: "Irish"
      }, {
        name: "Israeli"
      }, {
        name: "Italian"
      }, {
        name: "Ivorian"
      }, {
        name: "Jamaican"
      }, {
        name: "Japanese"
      }, {
        name: "Jordanian"
      }, {
        name: "Kazakhstani"
      }, {
        name: "Kenyan"
      }, {
        name: "Kittian and Nevisian"
      }, {
        name: "Kuwaiti"
      }, {
        name: "Kyrgyz"
      }, {
        name: "Laotian"
      }, {
        name: "Latvian"
      }, {
        name: "Lebanese"
      }, {
        name: "Liberian"
      }, {
        name: "Libyan"
      }, {
        name: "Liechtensteiner"
      }, {
        name: "Lithuanian"
      }, {
        name: "Luxembourger"
      }, {
        name: "Macedonian"
      }, {
        name: "Malagasy"
      }, {
        name: "Malawian"
      }, {
        name: "Malaysian"
      }, {
        name: "Maldivan"
      }, {
        name: "Malian"
      }, {
        name: "Maltese"
      }, {
        name: "Marshallese"
      }, {
        name: "Mauritanian"
      }, {
        name: "Mauritian"
      }, {
        name: "Mexican"
      }, {
        name: "Micronesian"
      }, {
        name: "Moldovan"
      }, {
        name: "Monacan"
      }, {
        name: "Mongolian"
      }, {
        name: "Moroccan"
      }, {
        name: "Mosotho"
      }, {
        name: "Motswana"
      }, {
        name: "Mozambican"
      }, {
        name: "Namibian"
      }, {
        name: "Nauruan"
      }, {
        name: "Nepalese"
      }, {
        name: "New Zealander"
      }, {
        name: "Nicaraguan"
      }, {
        name: "Nigerian"
      }, {
        name: "Nigerien"
      }, {
        name: "North Korean"
      }, {
        name: "Northern Irish"
      }, {
        name: "Norwegian"
      }, {
        name: "Omani"
      }, {
        name: "Pakistani"
      }, {
        name: "Palauan"
      }, {
        name: "Panamanian"
      }, {
        name: "Papua New Guinean"
      }, {
        name: "Paraguayan"
      }, {
        name: "Peruvian"
      }, {
        name: "Polish"
      }, {
        name: "Portuguese"
      }, {
        name: "Qatari"
      }, {
        name: "Romani"
      }, {
        name: "Russian"
      }, {
        name: "Rwandan"
      }, {
        name: "Saint Lucian"
      }, {
        name: "Salvadoran"
      }, {
        name: "Samoan"
      }, {
        name: "San Marinese"
      }, {
        name: "Sao Tomean"
      }, {
        name: "Saudi"
      }, {
        name: "Scottish"
      }, {
        name: "Senegalese"
      }, {
        name: "Serbian"
      }, {
        name: "Seychellois"
      }, {
        name: "Sierra Leonean"
      }, {
        name: "Singaporean"
      }, {
        name: "Slovakian"
      }, {
        name: "Slovenian"
      }, {
        name: "Solomon Islander"
      }, {
        name: "Somali"
      }, {
        name: "South African"
      }, {
        name: "South Korean"
      }, {
        name: "Spanish"
      }, {
        name: "Sri Lankan"
      }, {
        name: "Sudanese"
      }, {
        name: "Surinamer"
      }, {
        name: "Swazi"
      }, {
        name: "Swedish"
      }, {
        name: "Swiss"
      }, {
        name: "Syrian"
      }, {
        name: "Taiwanese"
      }, {
        name: "Tajik"
      }, {
        name: "Tanzanian"
      }, {
        name: "Thai"
      }, {
        name: "Togolese"
      }, {
        name: "Tongan"
      }, {
        name: "Trinidadian or Tobagonian"
      }, {
        name: "Tunisian"
      }, {
        name: "Turkish"
      }, {
        name: "Tuvaluan"
      }, {
        name: "Ugandan"
      }, {
        name: "Ukrainian"
      }, {
        name: "Uruguaya"
      }, {
        name: "Uzbekistani"
      }, {
        name: "Venezuela"
      }, {
        name: "Vietnamese"
      }, {
        name: "Wels"
      }, {
        name: "Yemenit"
      }, {
        name: "Zambia"
      }, {
        name: "Zimbabwe"
      }],
      us_states_and_dc: [{
        name: "Alabama",
        abbreviation: "AL"
      }, {
        name: "Alaska",
        abbreviation: "AK"
      }, {
        name: "Arizona",
        abbreviation: "AZ"
      }, {
        name: "Arkansas",
        abbreviation: "AR"
      }, {
        name: "California",
        abbreviation: "CA"
      }, {
        name: "Colorado",
        abbreviation: "CO"
      }, {
        name: "Connecticut",
        abbreviation: "CT"
      }, {
        name: "Delaware",
        abbreviation: "DE"
      }, {
        name: "District of Columbia",
        abbreviation: "DC"
      }, {
        name: "Florida",
        abbreviation: "FL"
      }, {
        name: "Georgia",
        abbreviation: "GA"
      }, {
        name: "Hawaii",
        abbreviation: "HI"
      }, {
        name: "Idaho",
        abbreviation: "ID"
      }, {
        name: "Illinois",
        abbreviation: "IL"
      }, {
        name: "Indiana",
        abbreviation: "IN"
      }, {
        name: "Iowa",
        abbreviation: "IA"
      }, {
        name: "Kansas",
        abbreviation: "KS"
      }, {
        name: "Kentucky",
        abbreviation: "KY"
      }, {
        name: "Louisiana",
        abbreviation: "LA"
      }, {
        name: "Maine",
        abbreviation: "ME"
      }, {
        name: "Maryland",
        abbreviation: "MD"
      }, {
        name: "Massachusetts",
        abbreviation: "MA"
      }, {
        name: "Michigan",
        abbreviation: "MI"
      }, {
        name: "Minnesota",
        abbreviation: "MN"
      }, {
        name: "Mississippi",
        abbreviation: "MS"
      }, {
        name: "Missouri",
        abbreviation: "MO"
      }, {
        name: "Montana",
        abbreviation: "MT"
      }, {
        name: "Nebraska",
        abbreviation: "NE"
      }, {
        name: "Nevada",
        abbreviation: "NV"
      }, {
        name: "New Hampshire",
        abbreviation: "NH"
      }, {
        name: "New Jersey",
        abbreviation: "NJ"
      }, {
        name: "New Mexico",
        abbreviation: "NM"
      }, {
        name: "New York",
        abbreviation: "NY"
      }, {
        name: "North Carolina",
        abbreviation: "NC"
      }, {
        name: "North Dakota",
        abbreviation: "ND"
      }, {
        name: "Ohio",
        abbreviation: "OH"
      }, {
        name: "Oklahoma",
        abbreviation: "OK"
      }, {
        name: "Oregon",
        abbreviation: "OR"
      }, {
        name: "Pennsylvania",
        abbreviation: "PA"
      }, {
        name: "Rhode Island",
        abbreviation: "RI"
      }, {
        name: "South Carolina",
        abbreviation: "SC"
      }, {
        name: "South Dakota",
        abbreviation: "SD"
      }, {
        name: "Tennessee",
        abbreviation: "TN"
      }, {
        name: "Texas",
        abbreviation: "TX"
      }, {
        name: "Utah",
        abbreviation: "UT"
      }, {
        name: "Vermont",
        abbreviation: "VT"
      }, {
        name: "Virginia",
        abbreviation: "VA"
      }, {
        name: "Washington",
        abbreviation: "WA"
      }, {
        name: "West Virginia",
        abbreviation: "WV"
      }, {
        name: "Wisconsin",
        abbreviation: "WI"
      }, {
        name: "Wyoming",
        abbreviation: "WY"
      }],
      territories: [{
        name: "American Samoa",
        abbreviation: "AS"
      }, {
        name: "Federated States of Micronesia",
        abbreviation: "FM"
      }, {
        name: "Guam",
        abbreviation: "GU"
      }, {
        name: "Marshall Islands",
        abbreviation: "MH"
      }, {
        name: "Northern Mariana Islands",
        abbreviation: "MP"
      }, {
        name: "Puerto Rico",
        abbreviation: "PR"
      }, {
        name: "Virgin Islands, U.S.",
        abbreviation: "VI"
      }],
      armed_forces: [{
        name: "Armed Forces Europe",
        abbreviation: "AE"
      }, {
        name: "Armed Forces Pacific",
        abbreviation: "AP"
      }, {
        name: "Armed Forces the Americas",
        abbreviation: "AA"
      }],
      country_regions: {
        it: [{
          name: "Valle d'Aosta",
          abbreviation: "VDA"
        }, {
          name: "Piemonte",
          abbreviation: "PIE"
        }, {
          name: "Lombardia",
          abbreviation: "LOM"
        }, {
          name: "Veneto",
          abbreviation: "VEN"
        }, {
          name: "Trentino Alto Adige",
          abbreviation: "TAA"
        }, {
          name: "Friuli Venezia Giulia",
          abbreviation: "FVG"
        }, {
          name: "Liguria",
          abbreviation: "LIG"
        }, {
          name: "Emilia Romagna",
          abbreviation: "EMR"
        }, {
          name: "Toscana",
          abbreviation: "TOS"
        }, {
          name: "Umbria",
          abbreviation: "UMB"
        }, {
          name: "Marche",
          abbreviation: "MAR"
        }, {
          name: "Abruzzo",
          abbreviation: "ABR"
        }, {
          name: "Lazio",
          abbreviation: "LAZ"
        }, {
          name: "Campania",
          abbreviation: "CAM"
        }, {
          name: "Puglia",
          abbreviation: "PUG"
        }, {
          name: "Basilicata",
          abbreviation: "BAS"
        }, {
          name: "Molise",
          abbreviation: "MOL"
        }, {
          name: "Calabria",
          abbreviation: "CAL"
        }, {
          name: "Sicilia",
          abbreviation: "SIC"
        }, {
          name: "Sardegna",
          abbreviation: "SAR"
        }]
      },
      street_suffixes: {
        us: [{
          name: "Avenue",
          abbreviation: "Ave"
        }, {
          name: "Boulevard",
          abbreviation: "Blvd"
        }, {
          name: "Center",
          abbreviation: "Ctr"
        }, {
          name: "Circle",
          abbreviation: "Cir"
        }, {
          name: "Court",
          abbreviation: "Ct"
        }, {
          name: "Drive",
          abbreviation: "Dr"
        }, {
          name: "Extension",
          abbreviation: "Ext"
        }, {
          name: "Glen",
          abbreviation: "Gln"
        }, {
          name: "Grove",
          abbreviation: "Grv"
        }, {
          name: "Heights",
          abbreviation: "Hts"
        }, {
          name: "Highway",
          abbreviation: "Hwy"
        }, {
          name: "Junction",
          abbreviation: "Jct"
        }, {
          name: "Key",
          abbreviation: "Key"
        }, {
          name: "Lane",
          abbreviation: "Ln"
        }, {
          name: "Loop",
          abbreviation: "Loop"
        }, {
          name: "Manor",
          abbreviation: "Mnr"
        }, {
          name: "Mill",
          abbreviation: "Mill"
        }, {
          name: "Park",
          abbreviation: "Park"
        }, {
          name: "Parkway",
          abbreviation: "Pkwy"
        }, {
          name: "Pass",
          abbreviation: "Pass"
        }, {
          name: "Path",
          abbreviation: "Path"
        }, {
          name: "Pike",
          abbreviation: "Pike"
        }, {
          name: "Place",
          abbreviation: "Pl"
        }, {
          name: "Plaza",
          abbreviation: "Plz"
        }, {
          name: "Point",
          abbreviation: "Pt"
        }, {
          name: "Ridge",
          abbreviation: "Rdg"
        }, {
          name: "River",
          abbreviation: "Riv"
        }, {
          name: "Road",
          abbreviation: "Rd"
        }, {
          name: "Square",
          abbreviation: "Sq"
        }, {
          name: "Street",
          abbreviation: "St"
        }, {
          name: "Terrace",
          abbreviation: "Ter"
        }, {
          name: "Trail",
          abbreviation: "Trl"
        }, {
          name: "Turnpike",
          abbreviation: "Tpke"
        }, {
          name: "View",
          abbreviation: "Vw"
        }, {
          name: "Way",
          abbreviation: "Way"
        }],
        it: [{
          name: "Accesso",
          abbreviation: "Acc."
        }, {
          name: "Alzaia",
          abbreviation: "Alz."
        }, {
          name: "Arco",
          abbreviation: "Arco"
        }, {
          name: "Archivolto",
          abbreviation: "Acv."
        }, {
          name: "Arena",
          abbreviation: "Arena"
        }, {
          name: "Argine",
          abbreviation: "Argine"
        }, {
          name: "Bacino",
          abbreviation: "Bacino"
        }, {
          name: "Banchi",
          abbreviation: "Banchi"
        }, {
          name: "Banchina",
          abbreviation: "Ban."
        }, {
          name: "Bastioni",
          abbreviation: "Bas."
        }, {
          name: "Belvedere",
          abbreviation: "Belv."
        }, {
          name: "Borgata",
          abbreviation: "B.ta"
        }, {
          name: "Borgo",
          abbreviation: "B.go"
        }, {
          name: "Calata",
          abbreviation: "Cal."
        }, {
          name: "Calle",
          abbreviation: "Calle"
        }, {
          name: "Campiello",
          abbreviation: "Cam."
        }, {
          name: "Campo",
          abbreviation: "Cam."
        }, {
          name: "Canale",
          abbreviation: "Can."
        }, {
          name: "Carraia",
          abbreviation: "Carr."
        }, {
          name: "Cascina",
          abbreviation: "Cascina"
        }, {
          name: "Case sparse",
          abbreviation: "c.s."
        }, {
          name: "Cavalcavia",
          abbreviation: "Cv."
        }, {
          name: "Circonvallazione",
          abbreviation: "Cv."
        }, {
          name: "Complanare",
          abbreviation: "C.re"
        }, {
          name: "Contrada",
          abbreviation: "C.da"
        }, {
          name: "Corso",
          abbreviation: "C.so"
        }, {
          name: "Corte",
          abbreviation: "C.te"
        }, {
          name: "Cortile",
          abbreviation: "C.le"
        }, {
          name: "Diramazione",
          abbreviation: "Dir."
        }, {
          name: "Fondaco",
          abbreviation: "F.co"
        }, {
          name: "Fondamenta",
          abbreviation: "F.ta"
        }, {
          name: "Fondo",
          abbreviation: "F.do"
        }, {
          name: "Frazione",
          abbreviation: "Fr."
        }, {
          name: "Isola",
          abbreviation: "Is."
        }, {
          name: "Largo",
          abbreviation: "L.go"
        }, {
          name: "Litoranea",
          abbreviation: "Lit."
        }, {
          name: "Lungolago",
          abbreviation: "L.go lago"
        }, {
          name: "Lungo Po",
          abbreviation: "l.go Po"
        }, {
          name: "Molo",
          abbreviation: "Molo"
        }, {
          name: "Mura",
          abbreviation: "Mura"
        }, {
          name: "Passaggio privato",
          abbreviation: "pass. priv."
        }, {
          name: "Passeggiata",
          abbreviation: "Pass."
        }, {
          name: "Piazza",
          abbreviation: "P.zza"
        }, {
          name: "Piazzale",
          abbreviation: "P.le"
        }, {
          name: "Ponte",
          abbreviation: "P.te"
        }, {
          name: "Portico",
          abbreviation: "P.co"
        }, {
          name: "Rampa",
          abbreviation: "Rampa"
        }, {
          name: "Regione",
          abbreviation: "Reg."
        }, {
          name: "Rione",
          abbreviation: "R.ne"
        }, {
          name: "Rio",
          abbreviation: "Rio"
        }, {
          name: "Ripa",
          abbreviation: "Ripa"
        }, {
          name: "Riva",
          abbreviation: "Riva"
        }, {
          name: "Rondò",
          abbreviation: "Rondò"
        }, {
          name: "Rotonda",
          abbreviation: "Rot."
        }, {
          name: "Sagrato",
          abbreviation: "Sagr."
        }, {
          name: "Salita",
          abbreviation: "Sal."
        }, {
          name: "Scalinata",
          abbreviation: "Scal."
        }, {
          name: "Scalone",
          abbreviation: "Scal."
        }, {
          name: "Slargo",
          abbreviation: "Sl."
        }, {
          name: "Sottoportico",
          abbreviation: "Sott."
        }, {
          name: "Strada",
          abbreviation: "Str."
        }, {
          name: "Stradale",
          abbreviation: "Str.le"
        }, {
          name: "Strettoia",
          abbreviation: "Strett."
        }, {
          name: "Traversa",
          abbreviation: "Trav."
        }, {
          name: "Via",
          abbreviation: "V."
        }, {
          name: "Viale",
          abbreviation: "V.le"
        }, {
          name: "Vicinale",
          abbreviation: "Vic.le"
        }, {
          name: "Vicolo",
          abbreviation: "Vic."
        }]
      },
      months: [{
        name: "January",
        short_name: "Jan",
        numeric: "01",
        days: 31
      }, {
        name: "February",
        short_name: "Feb",
        numeric: "02",
        days: 28
      }, {
        name: "March",
        short_name: "Mar",
        numeric: "03",
        days: 31
      }, {
        name: "April",
        short_name: "Apr",
        numeric: "04",
        days: 30
      }, {
        name: "May",
        short_name: "May",
        numeric: "05",
        days: 31
      }, {
        name: "June",
        short_name: "Jun",
        numeric: "06",
        days: 30
      }, {
        name: "July",
        short_name: "Jul",
        numeric: "07",
        days: 31
      }, {
        name: "August",
        short_name: "Aug",
        numeric: "08",
        days: 31
      }, {
        name: "September",
        short_name: "Sep",
        numeric: "09",
        days: 30
      }, {
        name: "October",
        short_name: "Oct",
        numeric: "10",
        days: 31
      }, {
        name: "November",
        short_name: "Nov",
        numeric: "11",
        days: 30
      }, {
        name: "December",
        short_name: "Dec",
        numeric: "12",
        days: 31
      }],
      cc_types: [{
        name: "American Express",
        short_name: "amex",
        prefix: "34",
        length: 15
      }, {
        name: "Bankcard",
        short_name: "bankcard",
        prefix: "5610",
        length: 16
      }, {
        name: "China UnionPay",
        short_name: "chinaunion",
        prefix: "62",
        length: 16
      }, {
        name: "Diners Club Carte Blanche",
        short_name: "dccarte",
        prefix: "300",
        length: 14
      }, {
        name: "Diners Club enRoute",
        short_name: "dcenroute",
        prefix: "2014",
        length: 15
      }, {
        name: "Diners Club International",
        short_name: "dcintl",
        prefix: "36",
        length: 14
      }, {
        name: "Diners Club United States & Canada",
        short_name: "dcusc",
        prefix: "54",
        length: 16
      }, {
        name: "Discover Card",
        short_name: "discover",
        prefix: "6011",
        length: 16
      }, {
        name: "InstaPayment",
        short_name: "instapay",
        prefix: "637",
        length: 16
      }, {
        name: "JCB",
        short_name: "jcb",
        prefix: "3528",
        length: 16
      }, {
        name: "Laser",
        short_name: "laser",
        prefix: "6304",
        length: 16
      }, {
        name: "Maestro",
        short_name: "maestro",
        prefix: "5018",
        length: 16
      }, {
        name: "Mastercard",
        short_name: "mc",
        prefix: "51",
        length: 16
      }, {
        name: "Solo",
        short_name: "solo",
        prefix: "6334",
        length: 16
      }, {
        name: "Switch",
        short_name: "switch",
        prefix: "4903",
        length: 16
      }, {
        name: "Visa",
        short_name: "visa",
        prefix: "4",
        length: 16
      }, {
        name: "Visa Electron",
        short_name: "electron",
        prefix: "4026",
        length: 16
      }],
      currency_types: [{
        code: "AED",
        name: "United Arab Emirates Dirham"
      }, {
        code: "AFN",
        name: "Afghanistan Afghani"
      }, {
        code: "ALL",
        name: "Albania Lek"
      }, {
        code: "AMD",
        name: "Armenia Dram"
      }, {
        code: "ANG",
        name: "Netherlands Antilles Guilder"
      }, {
        code: "AOA",
        name: "Angola Kwanza"
      }, {
        code: "ARS",
        name: "Argentina Peso"
      }, {
        code: "AUD",
        name: "Australia Dollar"
      }, {
        code: "AWG",
        name: "Aruba Guilder"
      }, {
        code: "AZN",
        name: "Azerbaijan New Manat"
      }, {
        code: "BAM",
        name: "Bosnia and Herzegovina Convertible Marka"
      }, {
        code: "BBD",
        name: "Barbados Dollar"
      }, {
        code: "BDT",
        name: "Bangladesh Taka"
      }, {
        code: "BGN",
        name: "Bulgaria Lev"
      }, {
        code: "BHD",
        name: "Bahrain Dinar"
      }, {
        code: "BIF",
        name: "Burundi Franc"
      }, {
        code: "BMD",
        name: "Bermuda Dollar"
      }, {
        code: "BND",
        name: "Brunei Darussalam Dollar"
      }, {
        code: "BOB",
        name: "Bolivia Boliviano"
      }, {
        code: "BRL",
        name: "Brazil Real"
      }, {
        code: "BSD",
        name: "Bahamas Dollar"
      }, {
        code: "BTN",
        name: "Bhutan Ngultrum"
      }, {
        code: "BWP",
        name: "Botswana Pula"
      }, {
        code: "BYR",
        name: "Belarus Ruble"
      }, {
        code: "BZD",
        name: "Belize Dollar"
      }, {
        code: "CAD",
        name: "Canada Dollar"
      }, {
        code: "CDF",
        name: "Congo/Kinshasa Franc"
      }, {
        code: "CHF",
        name: "Switzerland Franc"
      }, {
        code: "CLP",
        name: "Chile Peso"
      }, {
        code: "CNY",
        name: "China Yuan Renminbi"
      }, {
        code: "COP",
        name: "Colombia Peso"
      }, {
        code: "CRC",
        name: "Costa Rica Colon"
      }, {
        code: "CUC",
        name: "Cuba Convertible Peso"
      }, {
        code: "CUP",
        name: "Cuba Peso"
      }, {
        code: "CVE",
        name: "Cape Verde Escudo"
      }, {
        code: "CZK",
        name: "Czech Republic Koruna"
      }, {
        code: "DJF",
        name: "Djibouti Franc"
      }, {
        code: "DKK",
        name: "Denmark Krone"
      }, {
        code: "DOP",
        name: "Dominican Republic Peso"
      }, {
        code: "DZD",
        name: "Algeria Dinar"
      }, {
        code: "EGP",
        name: "Egypt Pound"
      }, {
        code: "ERN",
        name: "Eritrea Nakfa"
      }, {
        code: "ETB",
        name: "Ethiopia Birr"
      }, {
        code: "EUR",
        name: "Euro Member Countries"
      }, {
        code: "FJD",
        name: "Fiji Dollar"
      }, {
        code: "FKP",
        name: "Falkland Islands (Malvinas) Pound"
      }, {
        code: "GBP",
        name: "United Kingdom Pound"
      }, {
        code: "GEL",
        name: "Georgia Lari"
      }, {
        code: "GGP",
        name: "Guernsey Pound"
      }, {
        code: "GHS",
        name: "Ghana Cedi"
      }, {
        code: "GIP",
        name: "Gibraltar Pound"
      }, {
        code: "GMD",
        name: "Gambia Dalasi"
      }, {
        code: "GNF",
        name: "Guinea Franc"
      }, {
        code: "GTQ",
        name: "Guatemala Quetzal"
      }, {
        code: "GYD",
        name: "Guyana Dollar"
      }, {
        code: "HKD",
        name: "Hong Kong Dollar"
      }, {
        code: "HNL",
        name: "Honduras Lempira"
      }, {
        code: "HRK",
        name: "Croatia Kuna"
      }, {
        code: "HTG",
        name: "Haiti Gourde"
      }, {
        code: "HUF",
        name: "Hungary Forint"
      }, {
        code: "IDR",
        name: "Indonesia Rupiah"
      }, {
        code: "ILS",
        name: "Israel Shekel"
      }, {
        code: "IMP",
        name: "Isle of Man Pound"
      }, {
        code: "INR",
        name: "India Rupee"
      }, {
        code: "IQD",
        name: "Iraq Dinar"
      }, {
        code: "IRR",
        name: "Iran Rial"
      }, {
        code: "ISK",
        name: "Iceland Krona"
      }, {
        code: "JEP",
        name: "Jersey Pound"
      }, {
        code: "JMD",
        name: "Jamaica Dollar"
      }, {
        code: "JOD",
        name: "Jordan Dinar"
      }, {
        code: "JPY",
        name: "Japan Yen"
      }, {
        code: "KES",
        name: "Kenya Shilling"
      }, {
        code: "KGS",
        name: "Kyrgyzstan Som"
      }, {
        code: "KHR",
        name: "Cambodia Riel"
      }, {
        code: "KMF",
        name: "Comoros Franc"
      }, {
        code: "KPW",
        name: "Korea (North) Won"
      }, {
        code: "KRW",
        name: "Korea (South) Won"
      }, {
        code: "KWD",
        name: "Kuwait Dinar"
      }, {
        code: "KYD",
        name: "Cayman Islands Dollar"
      }, {
        code: "KZT",
        name: "Kazakhstan Tenge"
      }, {
        code: "LAK",
        name: "Laos Kip"
      }, {
        code: "LBP",
        name: "Lebanon Pound"
      }, {
        code: "LKR",
        name: "Sri Lanka Rupee"
      }, {
        code: "LRD",
        name: "Liberia Dollar"
      }, {
        code: "LSL",
        name: "Lesotho Loti"
      }, {
        code: "LTL",
        name: "Lithuania Litas"
      }, {
        code: "LYD",
        name: "Libya Dinar"
      }, {
        code: "MAD",
        name: "Morocco Dirham"
      }, {
        code: "MDL",
        name: "Moldova Leu"
      }, {
        code: "MGA",
        name: "Madagascar Ariary"
      }, {
        code: "MKD",
        name: "Macedonia Denar"
      }, {
        code: "MMK",
        name: "Myanmar (Burma) Kyat"
      }, {
        code: "MNT",
        name: "Mongolia Tughrik"
      }, {
        code: "MOP",
        name: "Macau Pataca"
      }, {
        code: "MRO",
        name: "Mauritania Ouguiya"
      }, {
        code: "MUR",
        name: "Mauritius Rupee"
      }, {
        code: "MVR",
        name: "Maldives (Maldive Islands) Rufiyaa"
      }, {
        code: "MWK",
        name: "Malawi Kwacha"
      }, {
        code: "MXN",
        name: "Mexico Peso"
      }, {
        code: "MYR",
        name: "Malaysia Ringgit"
      }, {
        code: "MZN",
        name: "Mozambique Metical"
      }, {
        code: "NAD",
        name: "Namibia Dollar"
      }, {
        code: "NGN",
        name: "Nigeria Naira"
      }, {
        code: "NIO",
        name: "Nicaragua Cordoba"
      }, {
        code: "NOK",
        name: "Norway Krone"
      }, {
        code: "NPR",
        name: "Nepal Rupee"
      }, {
        code: "NZD",
        name: "New Zealand Dollar"
      }, {
        code: "OMR",
        name: "Oman Rial"
      }, {
        code: "PAB",
        name: "Panama Balboa"
      }, {
        code: "PEN",
        name: "Peru Nuevo Sol"
      }, {
        code: "PGK",
        name: "Papua New Guinea Kina"
      }, {
        code: "PHP",
        name: "Philippines Peso"
      }, {
        code: "PKR",
        name: "Pakistan Rupee"
      }, {
        code: "PLN",
        name: "Poland Zloty"
      }, {
        code: "PYG",
        name: "Paraguay Guarani"
      }, {
        code: "QAR",
        name: "Qatar Riyal"
      }, {
        code: "RON",
        name: "Romania New Leu"
      }, {
        code: "RSD",
        name: "Serbia Dinar"
      }, {
        code: "RUB",
        name: "Russia Ruble"
      }, {
        code: "RWF",
        name: "Rwanda Franc"
      }, {
        code: "SAR",
        name: "Saudi Arabia Riyal"
      }, {
        code: "SBD",
        name: "Solomon Islands Dollar"
      }, {
        code: "SCR",
        name: "Seychelles Rupee"
      }, {
        code: "SDG",
        name: "Sudan Pound"
      }, {
        code: "SEK",
        name: "Sweden Krona"
      }, {
        code: "SGD",
        name: "Singapore Dollar"
      }, {
        code: "SHP",
        name: "Saint Helena Pound"
      }, {
        code: "SLL",
        name: "Sierra Leone Leone"
      }, {
        code: "SOS",
        name: "Somalia Shilling"
      }, {
        code: "SPL",
        name: "Seborga Luigino"
      }, {
        code: "SRD",
        name: "Suriname Dollar"
      }, {
        code: "STD",
        name: "São Tomé and Príncipe Dobra"
      }, {
        code: "SVC",
        name: "El Salvador Colon"
      }, {
        code: "SYP",
        name: "Syria Pound"
      }, {
        code: "SZL",
        name: "Swaziland Lilangeni"
      }, {
        code: "THB",
        name: "Thailand Baht"
      }, {
        code: "TJS",
        name: "Tajikistan Somoni"
      }, {
        code: "TMT",
        name: "Turkmenistan Manat"
      }, {
        code: "TND",
        name: "Tunisia Dinar"
      }, {
        code: "TOP",
        name: "Tonga Pa'anga"
      }, {
        code: "TRY",
        name: "Turkey Lira"
      }, {
        code: "TTD",
        name: "Trinidad and Tobago Dollar"
      }, {
        code: "TVD",
        name: "Tuvalu Dollar"
      }, {
        code: "TWD",
        name: "Taiwan New Dollar"
      }, {
        code: "TZS",
        name: "Tanzania Shilling"
      }, {
        code: "UAH",
        name: "Ukraine Hryvnia"
      }, {
        code: "UGX",
        name: "Uganda Shilling"
      }, {
        code: "USD",
        name: "United States Dollar"
      }, {
        code: "UYU",
        name: "Uruguay Peso"
      }, {
        code: "UZS",
        name: "Uzbekistan Som"
      }, {
        code: "VEF",
        name: "Venezuela Bolivar"
      }, {
        code: "VND",
        name: "Viet Nam Dong"
      }, {
        code: "VUV",
        name: "Vanuatu Vatu"
      }, {
        code: "WST",
        name: "Samoa Tala"
      }, {
        code: "XAF",
        name: "Communauté Financière Africaine (BEAC) CFA Franc BEAC"
      }, {
        code: "XCD",
        name: "East Caribbean Dollar"
      }, {
        code: "XDR",
        name: "International Monetary Fund (IMF) Special Drawing Rights"
      }, {
        code: "XOF",
        name: "Communauté Financière Africaine (BCEAO) Franc"
      }, {
        code: "XPF",
        name: "Comptoirs Français du Pacifique (CFP) Franc"
      }, {
        code: "YER",
        name: "Yemen Rial"
      }, {
        code: "ZAR",
        name: "South Africa Rand"
      }, {
        code: "ZMW",
        name: "Zambia Kwacha"
      }, {
        code: "ZWD",
        name: "Zimbabwe Dollar"
      }],
      colorNames: ["AliceBlue", "Black", "Navy", "DarkBlue", "MediumBlue", "Blue", "DarkGreen", "Green", "Teal", "DarkCyan", "DeepSkyBlue", "DarkTurquoise", "MediumSpringGreen", "Lime", "SpringGreen", "Aqua", "Cyan", "MidnightBlue", "DodgerBlue", "LightSeaGreen", "ForestGreen", "SeaGreen", "DarkSlateGray", "LimeGreen", "MediumSeaGreen", "Turquoise", "RoyalBlue", "SteelBlue", "DarkSlateBlue", "MediumTurquoise", "Indigo", "DarkOliveGreen", "CadetBlue", "CornflowerBlue", "RebeccaPurple", "MediumAquaMarine", "DimGray", "SlateBlue", "OliveDrab", "SlateGray", "LightSlateGray", "MediumSlateBlue", "LawnGreen", "Chartreuse", "Aquamarine", "Maroon", "Purple", "Olive", "Gray", "SkyBlue", "LightSkyBlue", "BlueViolet", "DarkRed", "DarkMagenta", "SaddleBrown", "Ivory", "White", "DarkSeaGreen", "LightGreen", "MediumPurple", "DarkViolet", "PaleGreen", "DarkOrchid", "YellowGreen", "Sienna", "Brown", "DarkGray", "LightBlue", "GreenYellow", "PaleTurquoise", "LightSteelBlue", "PowderBlue", "FireBrick", "DarkGoldenRod", "MediumOrchid", "RosyBrown", "DarkKhaki", "Silver", "MediumVioletRed", "IndianRed", "Peru", "Chocolate", "Tan", "LightGray", "Thistle", "Orchid", "GoldenRod", "PaleVioletRed", "Crimson", "Gainsboro", "Plum", "BurlyWood", "LightCyan", "Lavender", "DarkSalmon", "Violet", "PaleGoldenRod", "LightCoral", "Khaki", "AliceBlue", "HoneyDew", "Azure", "SandyBrown", "Wheat", "Beige", "WhiteSmoke", "MintCream", "GhostWhite", "Salmon", "AntiqueWhite", "Linen", "LightGoldenRodYellow", "OldLace", "Red", "Fuchsia", "Magenta", "DeepPink", "OrangeRed", "Tomato", "HotPink", "Coral", "DarkOrange", "LightSalmon", "Orange", "LightPink", "Pink", "Gold", "PeachPuff", "NavajoWhite", "Moccasin", "Bisque", "MistyRose", "BlanchedAlmond", "PapayaWhip", "LavenderBlush", "SeaShell", "Cornsilk", "LemonChiffon", "FloralWhite", "Snow", "Yellow", "LightYellow"],
      fileExtension: {
        raster: ["bmp", "gif", "gpl", "ico", "jpeg", "psd", "png", "psp", "raw", "tiff"],
        vector: ["3dv", "amf", "awg", "ai", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "odg", "svg", "xar"],
        "3d": ["3dmf", "3dm", "3mf", "3ds", "an8", "aoi", "blend", "cal3d", "cob", "ctm", "iob", "jas", "max", "mb", "mdx", "obj", "x", "x3d"],
        document: ["doc", "docx", "dot", "html", "xml", "odt", "odm", "ott", "csv", "rtf", "tex", "xhtml", "xps"]
      }
    },
    q = Object.prototype.hasOwnProperty,
    r = Object.keys || function(a) {
      var b = [];
      for (var c in a) q.call(a, c) && b.push(c);
      return b
    };
  a.prototype.get = function(a) {
    return g(p[a])
  }, a.prototype.mac_address = function(a) {
    a = b(a), a.separator || (a.separator = a.networkVersion ? "." : ":");
    var c = "ABCDEF1234567890",
      d = "";
    return d = a.networkVersion ? this.n(this.string, 3, {
      pool: c,
      length: 4
    }).join(a.separator) : this.n(this.string, 6, {
      pool: c,
      length: 2
    }).join(a.separator)
  }, a.prototype.normal = function(a) {
    if (a = b(a, {
        mean: 0,
        dev: 1,
        pool: []
      }), c(a.pool.constructor !== Array, "Chance: The pool option must be a valid array."), a.pool.length > 0) return this.normal_pool(a);
    var d, e, f, g, h = a.mean,
      i = a.dev;
    do e = 2 * this.random() - 1, f = 2 * this.random() - 1, d = e * e + f * f; while (d >= 1);
    return g = e * Math.sqrt(-2 * Math.log(d) / d), i * g + h
  }, a.prototype.normal_pool = function(a) {
    var b = 0;
    do {
      var c = Math.round(this.normal({
        mean: a.mean,
        dev: a.dev
      }));
      if (c < a.pool.length && c >= 0) return a.pool[c];
      b++
    } while (100 > b);
    throw new RangeError("Chance: Your pool is too small for the given mean and standard deviation. Please adjust.")
  }, a.prototype.radio = function(a) {
    a = b(a, {
      side: "?"
    });
    var c = "";
    switch (a.side.toLowerCase()) {
      case "east":
      case "e":
        c = "W";
        break;
      case "west":
      case "w":
        c = "K";
        break;
      default:
        c = this.character({
          pool: "KW"
        })
    }
    return c + this.character({
      alpha: !0,
      casing: "upper"
    }) + this.character({
      alpha: !0,
      casing: "upper"
    }) + this.character({
      alpha: !0,
      casing: "upper"
    })
  }, a.prototype.set = function(a, b) {
    "string" == typeof a ? p[a] = b : p = g(a, p)
  }, a.prototype.tv = function(a) {
    return this.radio(a)
  }, a.prototype.cnpj = function() {
    var a = this.n(this.natural, 8, {
        max: 9
      }),
      b = 2 + 6 * a[7] + 7 * a[6] + 8 * a[5] + 9 * a[4] + 2 * a[3] + 3 * a[2] + 4 * a[1] + 5 * a[0];
    b = 11 - b % 11, b >= 10 && (b = 0);
    var c = 2 * b + 3 + 7 * a[7] + 8 * a[6] + 9 * a[5] + 2 * a[4] + 3 * a[3] + 4 * a[2] + 5 * a[1] + 6 * a[0];
    return c = 11 - c % 11, c >= 10 && (c = 0), "" + a[0] + a[1] + "." + a[2] + a[3] + a[4] + "." + a[5] + a[6] + a[7] + "/0001-" + b + c
  }, a.prototype.mersenne_twister = function(a) {
    return new s(a)
  }, a.prototype.blueimp_md5 = function() {
    return new t
  };
  var s = function(a) {
    void 0 === a && (a = Math.floor(Math.random() * Math.pow(10, 13))), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(a)
  };
  s.prototype.init_genrand = function(a) {
    for (this.mt[0] = a >>> 0, this.mti = 1; this.mti < this.N; this.mti++) a = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (1812433253 * ((4294901760 & a) >>> 16) << 16) + 1812433253 * (65535 & a) + this.mti, this.mt[this.mti] >>>= 0
  }, s.prototype.init_by_array = function(a, b) {
    var c, d, e = 1,
      f = 0;
    for (this.init_genrand(19650218), c = this.N > b ? this.N : b; c; c--) d = this.mt[e - 1] ^ this.mt[e - 1] >>> 30, this.mt[e] = (this.mt[e] ^ (1664525 * ((4294901760 & d) >>> 16) << 16) + 1664525 * (65535 & d)) + a[f] + f, this.mt[e] >>>= 0, e++, f++, e >= this.N && (this.mt[0] = this.mt[this.N - 1], e = 1), f >= b && (f = 0);
    for (c = this.N - 1; c; c--) d = this.mt[e - 1] ^ this.mt[e - 1] >>> 30, this.mt[e] = (this.mt[e] ^ (1566083941 * ((4294901760 & d) >>> 16) << 16) + 1566083941 * (65535 & d)) - e, this.mt[e] >>>= 0, e++, e >= this.N && (this.mt[0] = this.mt[this.N - 1], e = 1);
    this.mt[0] = 2147483648
  }, s.prototype.genrand_int32 = function() {
    var a, b = new Array(0, this.MATRIX_A);
    if (this.mti >= this.N) {
      var c;
      for (this.mti === this.N + 1 && this.init_genrand(5489), c = 0; c < this.N - this.M; c++) a = this.mt[c] & this.UPPER_MASK | this.mt[c + 1] & this.LOWER_MASK, this.mt[c] = this.mt[c + this.M] ^ a >>> 1 ^ b[1 & a];
      for (; c < this.N - 1; c++) a = this.mt[c] & this.UPPER_MASK | this.mt[c + 1] & this.LOWER_MASK, this.mt[c] = this.mt[c + (this.M - this.N)] ^ a >>> 1 ^ b[1 & a];
      a = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ a >>> 1 ^ b[1 & a], this.mti = 0
    }
    return a = this.mt[this.mti++], a ^= a >>> 11, a ^= a << 7 & 2636928640, a ^= a << 15 & 4022730752, a ^= a >>> 18, a >>> 0
  }, s.prototype.genrand_int31 = function() {
    return this.genrand_int32() >>> 1
  }, s.prototype.genrand_real1 = function() {
    return this.genrand_int32() * (1 / 4294967295)
  }, s.prototype.random = function() {
    return this.genrand_int32() * (1 / 4294967296)
  }, s.prototype.genrand_real3 = function() {
    return (this.genrand_int32() + .5) * (1 / 4294967296)
  }, s.prototype.genrand_res53 = function() {
    var a = this.genrand_int32() >>> 5,
      b = this.genrand_int32() >>> 6;
    return (67108864 * a + b) * (1 / 9007199254740992)
  };
  var t = function() {};
  t.prototype.VERSION = "1.0.1", t.prototype.safe_add = function(a, b) {
    var c = (65535 & a) + (65535 & b),
      d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
  }, t.prototype.bit_roll = function(a, b) {
    return a << b | a >>> 32 - b
  }, t.prototype.md5_cmn = function(a, b, c, d, e, f) {
    return this.safe_add(this.bit_roll(this.safe_add(this.safe_add(b, a), this.safe_add(d, f)), e), c)
  }, t.prototype.md5_ff = function(a, b, c, d, e, f, g) {
    return this.md5_cmn(b & c | ~b & d, a, b, e, f, g)
  }, t.prototype.md5_gg = function(a, b, c, d, e, f, g) {
    return this.md5_cmn(b & d | c & ~d, a, b, e, f, g)
  }, t.prototype.md5_hh = function(a, b, c, d, e, f, g) {
    return this.md5_cmn(b ^ c ^ d, a, b, e, f, g)
  }, t.prototype.md5_ii = function(a, b, c, d, e, f, g) {
    return this.md5_cmn(c ^ (b | ~d), a, b, e, f, g)
  }, t.prototype.binl_md5 = function(a, b) {
    a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
    var c, d, e, f, g, h = 1732584193,
      i = -271733879,
      j = -1732584194,
      k = 271733878;
    for (c = 0; c < a.length; c += 16) d = h, e = i, f = j, g = k, h = this.md5_ff(h, i, j, k, a[c], 7, -680876936), k = this.md5_ff(k, h, i, j, a[c + 1], 12, -389564586), j = this.md5_ff(j, k, h, i, a[c + 2], 17, 606105819), i = this.md5_ff(i, j, k, h, a[c + 3], 22, -1044525330), h = this.md5_ff(h, i, j, k, a[c + 4], 7, -176418897), k = this.md5_ff(k, h, i, j, a[c + 5], 12, 1200080426), j = this.md5_ff(j, k, h, i, a[c + 6], 17, -1473231341), i = this.md5_ff(i, j, k, h, a[c + 7], 22, -45705983), h = this.md5_ff(h, i, j, k, a[c + 8], 7, 1770035416), k = this.md5_ff(k, h, i, j, a[c + 9], 12, -1958414417), j = this.md5_ff(j, k, h, i, a[c + 10], 17, -42063), i = this.md5_ff(i, j, k, h, a[c + 11], 22, -1990404162), h = this.md5_ff(h, i, j, k, a[c + 12], 7, 1804603682), k = this.md5_ff(k, h, i, j, a[c + 13], 12, -40341101), j = this.md5_ff(j, k, h, i, a[c + 14], 17, -1502002290), i = this.md5_ff(i, j, k, h, a[c + 15], 22, 1236535329), h = this.md5_gg(h, i, j, k, a[c + 1], 5, -165796510), k = this.md5_gg(k, h, i, j, a[c + 6], 9, -1069501632), j = this.md5_gg(j, k, h, i, a[c + 11], 14, 643717713), i = this.md5_gg(i, j, k, h, a[c], 20, -373897302), h = this.md5_gg(h, i, j, k, a[c + 5], 5, -701558691), k = this.md5_gg(k, h, i, j, a[c + 10], 9, 38016083), j = this.md5_gg(j, k, h, i, a[c + 15], 14, -660478335), i = this.md5_gg(i, j, k, h, a[c + 4], 20, -405537848), h = this.md5_gg(h, i, j, k, a[c + 9], 5, 568446438), k = this.md5_gg(k, h, i, j, a[c + 14], 9, -1019803690), j = this.md5_gg(j, k, h, i, a[c + 3], 14, -187363961), i = this.md5_gg(i, j, k, h, a[c + 8], 20, 1163531501), h = this.md5_gg(h, i, j, k, a[c + 13], 5, -1444681467), k = this.md5_gg(k, h, i, j, a[c + 2], 9, -51403784), j = this.md5_gg(j, k, h, i, a[c + 7], 14, 1735328473), i = this.md5_gg(i, j, k, h, a[c + 12], 20, -1926607734), h = this.md5_hh(h, i, j, k, a[c + 5], 4, -378558), k = this.md5_hh(k, h, i, j, a[c + 8], 11, -2022574463), j = this.md5_hh(j, k, h, i, a[c + 11], 16, 1839030562), i = this.md5_hh(i, j, k, h, a[c + 14], 23, -35309556), h = this.md5_hh(h, i, j, k, a[c + 1], 4, -1530992060), k = this.md5_hh(k, h, i, j, a[c + 4], 11, 1272893353), j = this.md5_hh(j, k, h, i, a[c + 7], 16, -155497632), i = this.md5_hh(i, j, k, h, a[c + 10], 23, -1094730640), h = this.md5_hh(h, i, j, k, a[c + 13], 4, 681279174), k = this.md5_hh(k, h, i, j, a[c], 11, -358537222), j = this.md5_hh(j, k, h, i, a[c + 3], 16, -722521979), i = this.md5_hh(i, j, k, h, a[c + 6], 23, 76029189), h = this.md5_hh(h, i, j, k, a[c + 9], 4, -640364487), k = this.md5_hh(k, h, i, j, a[c + 12], 11, -421815835), j = this.md5_hh(j, k, h, i, a[c + 15], 16, 530742520), i = this.md5_hh(i, j, k, h, a[c + 2], 23, -995338651), h = this.md5_ii(h, i, j, k, a[c], 6, -198630844), k = this.md5_ii(k, h, i, j, a[c + 7], 10, 1126891415), j = this.md5_ii(j, k, h, i, a[c + 14], 15, -1416354905), i = this.md5_ii(i, j, k, h, a[c + 5], 21, -57434055), h = this.md5_ii(h, i, j, k, a[c + 12], 6, 1700485571), k = this.md5_ii(k, h, i, j, a[c + 3], 10, -1894986606), j = this.md5_ii(j, k, h, i, a[c + 10], 15, -1051523), i = this.md5_ii(i, j, k, h, a[c + 1], 21, -2054922799), h = this.md5_ii(h, i, j, k, a[c + 8], 6, 1873313359), k = this.md5_ii(k, h, i, j, a[c + 15], 10, -30611744), j = this.md5_ii(j, k, h, i, a[c + 6], 15, -1560198380), i = this.md5_ii(i, j, k, h, a[c + 13], 21, 1309151649), h = this.md5_ii(h, i, j, k, a[c + 4], 6, -145523070), k = this.md5_ii(k, h, i, j, a[c + 11], 10, -1120210379), j = this.md5_ii(j, k, h, i, a[c + 2], 15, 718787259), i = this.md5_ii(i, j, k, h, a[c + 9], 21, -343485551), h = this.safe_add(h, d), i = this.safe_add(i, e), j = this.safe_add(j, f), k = this.safe_add(k, g);
    return [h, i, j, k]
  }, t.prototype.binl2rstr = function(a) {
    var b, c = "";
    for (b = 0; b < 32 * a.length; b += 8) c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
    return c
  }, t.prototype.rstr2binl = function(a) {
    var b, c = [];
    for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1) c[b] = 0;
    for (b = 0; b < 8 * a.length; b += 8) c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
    return c
  }, t.prototype.rstr_md5 = function(a) {
    return this.binl2rstr(this.binl_md5(this.rstr2binl(a), 8 * a.length))
  }, t.prototype.rstr_hmac_md5 = function(a, b) {
    var c, d, e = this.rstr2binl(a),
      f = [],
      g = [];
    for (f[15] = g[15] = void 0, e.length > 16 && (e = this.binl_md5(e, 8 * a.length)), c = 0; 16 > c; c += 1) f[c] = 909522486 ^ e[c], g[c] = 1549556828 ^ e[c];
    return d = this.binl_md5(f.concat(this.rstr2binl(b)), 512 + 8 * b.length), this.binl2rstr(this.binl_md5(g.concat(d), 640))
  }, t.prototype.rstr2hex = function(a) {
    var b, c, d = "0123456789abcdef",
      e = "";
    for (c = 0; c < a.length; c += 1) b = a.charCodeAt(c), e += d.charAt(b >>> 4 & 15) + d.charAt(15 & b);
    return e
  }, t.prototype.str2rstr_utf8 = function(a) {
    return unescape(encodeURIComponent(a))
  }, t.prototype.raw_md5 = function(a) {
    return this.rstr_md5(this.str2rstr_utf8(a))
  }, t.prototype.hex_md5 = function(a) {
    return this.rstr2hex(this.raw_md5(a))
  }, t.prototype.raw_hmac_md5 = function(a, b) {
    return this.rstr_hmac_md5(this.str2rstr_utf8(a), this.str2rstr_utf8(b))
  }, t.prototype.hex_hmac_md5 = function(a, b) {
    return this.rstr2hex(this.raw_hmac_md5(a, b))
  }, t.prototype.md5 = function(a, b, c) {
    return b ? c ? this.raw_hmac_md5(b, a) : this.hex_hmac_md5(b, a) : c ? this.raw_md5(a) : this.hex_md5(a)
  }, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (exports = module.exports = a), exports.Chance = a), "function" == typeof define && define.amd && define([], function() {
    return a
  }), "undefined" != typeof importScripts && (chance = new a), "object" == typeof window && "object" == typeof window.document && (window.Chance = a, window.chance = new a)
}();
(function() {
  (function(a, b, c) {
    var d, e, f;
    f = "slidesjs";
    e = {
      width: 940,
      height: 528,
      start: 1,
      navigation: {
        active: true,
        effect: "slide"
      },
      pagination: {
        active: true,
        effect: "slide"
      },
      play: {
        active: false,
        effect: "slide",
        interval: 5e3,
        auto: false,
        swap: true,
        pauseOnHover: false,
        restartDelay: 2500
      },
      effect: {
        slide: {
          speed: 500
        },
        fade: {
          speed: 300,
          crossfade: true
        }
      },
      callback: {
        loaded: function() {},
        start: function() {},
        complete: function() {}
      }
    };
    d = function() {
      function b(b, c) {
        this.element = b;
        this.options = a.extend(true, {}, e, c);
        this._defaults = e;
        this._name = f;
        this.init()
      }
      return b
    }();
    d.prototype.init = function() {
      var c, d, e, f, g, h, i = this;
      c = a(this.element);
      this.data = a.data(this);
      a.data(this, "animating", false);
      a.data(this, "total", c.children().not(".slidesjs-navigation", c).length);
      a.data(this, "current", this.options.start - 1);
      a.data(this, "vendorPrefix", this._getVendorPrefix());
      if (typeof TouchEvent !== "undefined") {
        a.data(this, "touch", true);
        this.options.effect.slide.speed = this.options.effect.slide.speed / 2
      }
      c.css({
        overflow: "hidden"
      });
      c.slidesContainer = c.children().not(".slidesjs-navigation", c).wrapAll("<div class='slidesjs-container'>", c).parent().css({
        overflow: "hidden",
        position: "relative"
      });
      a(".slidesjs-container", c).wrapInner("<div class='slidesjs-control'>", c).children();
      a(".slidesjs-control", c).css({
        position: "relative",
        left: 0
      });
      a(".slidesjs-control", c).children().addClass("slidesjs-slide").css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 0,
        display: "none",
        webkitBackfaceVisibility: "hidden"
      });
      a.each(a(".slidesjs-control", c).children(), function(b) {
        var c;
        c = a(this);
        return c.attr("slidesjs-index", b)
      });
      if (this.data.touch) {
        a(".slidesjs-control", c).on("touchstart", function(a) {
          return i._touchstart(a)
        });
        a(".slidesjs-control", c).on("touchmove", function(a) {
          return i._touchmove(a)
        });
        a(".slidesjs-control", c).on("touchend", function(a) {
          return i._touchend(a)
        })
      }
      c.fadeIn(0);
      this.update();
      if (this.data.touch) {
        this._setuptouch()
      }
      a(".slidesjs-control", c).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0, function() {
        return a(this).addClass("slidesjs-visiable").css({
          zIndex: 10
        })
      });
      if (this.options.navigation.active) {
        g = a("<a>", {
          class: "slidesjs-previous slidesjs-navigation",
          href: "#",
          title: "Previous",
          text: "Previous"
        }).appendTo(c);
        d = a("<a>", {
          class: "slidesjs-next slidesjs-navigation",
          href: "#",
          title: "Next",
          text: "Next"
        }).appendTo(c)
      }
      a(".slidesjs-next", c).click(function(a) {
        a.preventDefault();
        i.stop(true);
        return i.next(i.options.navigation.effect)
      });
      a(".slidesjs-previous", c).click(function(a) {
        a.preventDefault();
        i.stop(true);
        return i.previous(i.options.navigation.effect)
      });
      if (this.options.play.active) {
        f = a("<a>", {
          class: "slidesjs-play slidesjs-navigation",
          href: "#",
          title: "Play",
          text: "Play"
        }).appendTo(c);
        h = a("<a>", {
          class: "slidesjs-stop slidesjs-navigation",
          href: "#",
          title: "Stop",
          text: "Stop"
        }).appendTo(c);
        f.click(function(a) {
          a.preventDefault();
          return i.play(true)
        });
        h.click(function(a) {
          a.preventDefault();
          return i.stop(true)
        });
        if (this.options.play.swap) {
          h.css({
            display: "none"
          })
        }
      }
      if (this.options.pagination.active) {
        e = a("<ul>", {
          class: "slidesjs-pagination"
        }).appendTo(c);
        a.each(new Array(this.data.total), function(b) {
          var c, d;
          c = a("<li>", {
            class: "slidesjs-pagination-item"
          }).appendTo(e);
          d = a("<a>", {
            href: "#",
            "data-slidesjs-item": b,
            html: b + 1
          }).appendTo(c);
          return d.click(function(b) {
            b.preventDefault();
            i.stop(true);
            return i.goto(a(b.currentTarget).attr("data-slidesjs-item") * 1 + 1)
          })
        })
      }
      a(b).bind("resize", function() {
        return i.update()
      });
      this._setActive();
      if (this.options.play.auto) {
        this.play()
      }
      return this.options.callback.loaded(this.options.start)
    };
    d.prototype._setActive = function(b) {
      var c, d;
      c = a(this.element);
      this.data = a.data(this);
      d = b > -1 ? b : this.data.current;
      a(".active", c).removeClass("active");
      return a(".slidesjs-pagination li:eq(" + d + ") a", c).addClass("active")
    };
    d.prototype.update = function() {
      var b, c, d;
      b = a(this.element);
      this.data = a.data(this);
      a(".slidesjs-control", b).children(":not(:eq(" + this.data.current + "))").css({
        display: "none",
        left: 0,
        zIndex: 0
      });
      d = b.width();
      c = this.options.height / this.options.width * d;
      this.options.width = d;
      this.options.height = c;
      return a(".slidesjs-control, .slidesjs-container", b).css({
        width: d,
        height: c
      })
    };
    d.prototype.next = function(b) {
      var c;
      c = a(this.element);
      this.data = a.data(this);
      a.data(this, "direction", "next");
      if (b === void 0) {
        b = this.options.navigation.effect
      }
      if (b === "fade") {
        return this._fade()
      } else {
        return this._slide()
      }
    };
    d.prototype.previous = function(b) {
      var c;
      c = a(this.element);
      this.data = a.data(this);
      a.data(this, "direction", "previous");
      if (b === void 0) {
        b = this.options.navigation.effect
      }
      if (b === "fade") {
        return this._fade()
      } else {
        return this._slide()
      }
    };
    d.prototype.goto = function(b) {
      var c, d;
      c = a(this.element);
      this.data = a.data(this);
      if (d === void 0) {
        d = this.options.pagination.effect
      }
      if (b > this.data.total) {
        b = this.data.total
      } else if (b < 1) {
        b = 1
      }
      if (typeof b === "number") {
        if (d === "fade") {
          return this._fade(b)
        } else {
          return this._slide(b)
        }
      } else if (typeof b === "string") {
        if (b === "first") {
          if (d === "fade") {
            return this._fade(0)
          } else {
            return this._slide(0)
          }
        } else if (b === "last") {
          if (d === "fade") {
            return this._fade(this.data.total)
          } else {
            return this._slide(this.data.total)
          }
        }
      }
    };
    d.prototype._setuptouch = function() {
      var b, c, d, e;
      b = a(this.element);
      this.data = a.data(this);
      e = a(".slidesjs-control", b);
      c = this.data.current + 1;
      d = this.data.current - 1;
      if (d < 0) {
        d = this.data.total - 1
      }
      if (c > this.data.total - 1) {
        c = 0
      }
      e.children(":eq(" + c + ")").css({
        display: "block",
        left: this.options.width
      });
      return e.children(":eq(" + d + ")").css({
        display: "block",
        left: -this.options.width
      })
    };
    d.prototype._touchstart = function(b) {
      var c, d;
      c = a(this.element);
      this.data = a.data(this);
      d = b.originalEvent.touches[0];
      this._setuptouch();
      a.data(this, "touchtimer", Number(new Date));
      a.data(this, "touchstartx", d.pageX);
      a.data(this, "touchstarty", d.pageY);
      return b.stopPropagation()
    };
    d.prototype._touchend = function(b) {
      var c, d, e, f, g, h, i, j = this;
      c = a(this.element);
      this.data = a.data(this);
      h = b.originalEvent.touches[0];
      f = a(".slidesjs-control", c);
      if (f.position().left > this.options.width * .1 || f.position().left > this.options.width * .1 && Number(new Date) - this.data.touchtimer < 250) {
        a.data(this, "direction", "previous");
        this._slide()
      } else if (f.position().left < -(this.options.width * .1) || f.position().left < -(this.options.width * .1) && Number(new Date) - this.data.touchtimer < 250) {
        a.data(this, "direction", "next");
        this._slide()
      } else {
        e = this.data.vendorPrefix;
        i = e + "Transform";
        d = e + "TransitionDuration";
        g = e + "TransitionTimingFunction";
        f[0].style[i] = "translateX(0px)";
        f[0].style[d] = this.options.effect.slide.speed * .85 + "ms"
      }
      f.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
        e = j.data.vendorPrefix;
        i = e + "Transform";
        d = e + "TransitionDuration";
        g = e + "TransitionTimingFunction";
        f[0].style[i] = "";
        f[0].style[d] = "";
        return f[0].style[g] = ""
      });
      return b.stopPropagation()
    };
    d.prototype._touchmove = function(b) {
      var c, d, e, f, g;
      c = a(this.element);
      this.data = a.data(this);
      f = b.originalEvent.touches[0];
      d = this.data.vendorPrefix;
      e = a(".slidesjs-control", c);
      g = d + "Transform";
      a.data(this, "scrolling", Math.abs(f.pageX - this.data.touchstartx) < Math.abs(f.pageY - this.data.touchstarty));
      if (!this.data.animating && !this.data.scrolling) {
        b.preventDefault();
        this._setuptouch();
        e[0].style[g] = "translateX(" + (f.pageX - this.data.touchstartx) + "px)"
      }
      return b.stopPropagation()
    };
    d.prototype.play = function(b) {
      var c, d, e, f = this;
      c = a(this.element);
      this.data = a.data(this);
      if (!this.data.playInterval) {
        if (b) {
          d = this.data.current;
          this.data.direction = "next";
          if (this.options.play.effect === "fade") {
            this._fade()
          } else {
            this._slide()
          }
        }
        a.data(this, "playInterval", setInterval(function() {
          d = f.data.current;
          f.data.direction = "next";
          if (f.options.play.effect === "fade") {
            return f._fade()
          } else {
            return f._slide()
          }
        }, this.options.play.interval));
        e = a(".slidesjs-container", c);
        if (this.options.play.pauseOnHover) {
          e.unbind();
          e.bind("mouseenter", function() {
            return f.stop()
          });
          e.bind("mouseleave", function() {
            if (f.options.play.restartDelay) {
              return a.data(f, "restartDelay", setTimeout(function() {
                return f.play(true)
              }, f.options.play.restartDelay))
            } else {
              return f.play()
            }
          })
        }
        a.data(this, "playing", true);
        a(".slidesjs-play", c).addClass("slidesjs-playing");
        if (this.options.play.swap) {
          a(".slidesjs-play", c).hide();
          return a(".slidesjs-stop", c).show()
        }
      }
    };
    d.prototype.stop = function(b) {
      var c;
      c = a(this.element);
      this.data = a.data(this);
      clearInterval(this.data.playInterval);
      if (this.options.play.pauseOnHover && b) {
        a(".slidesjs-container", c).unbind()
      }
      a.data(this, "playInterval", null);
      a.data(this, "playing", false);
      a(".slidesjs-play", c).removeClass("slidesjs-playing");
      if (this.options.play.swap) {
        a(".slidesjs-stop", c).hide();
        return a(".slidesjs-play", c).show()
      }
    };
    d.prototype._slide = function(b) {
      var c, d, e, f, g, h, i, j, k, l, m = this;
      c = a(this.element);
      this.data = a.data(this);
      if (!this.data.animating && b !== this.data.current + 1) {
        a.data(this, "animating", true);
        d = this.data.current;
        if (b > -1) {
          b = b - 1;
          l = b > d ? 1 : -1;
          e = b > d ? -this.options.width : this.options.width;
          g = b
        } else {
          l = this.data.direction === "next" ? 1 : -1;
          e = this.data.direction === "next" ? -this.options.width : this.options.width;
          g = d + l
        }
        if (g === -1) {
          g = this.data.total - 1
        }
        if (g === this.data.total) {
          g = 0
        }
        this._setActive(g);
        i = a(".slidesjs-control", c);
        if (b > -1) {
          i.children(":not(:eq(" + d + "))").css({
            display: "none",
            left: 0,
            zIndex: 0
          })
        }
        i.children().removeClass("slidesjs-visiable");
        i.children(":eq(" + g + ")").addClass("slidesjs-visiable").css({
          display: "block",
          left: l * this.options.width,
          zIndex: 10
        });
        this.options.callback.start(d + 1);
        if (this.data.vendorPrefix) {
          h = this.data.vendorPrefix;
          k = h + "Transform";
          f = h + "TransitionDuration";
          j = h + "TransitionTimingFunction";
          i[0].style[k] = "translateX(" + e + "px)";
          i[0].style[f] = this.options.effect.slide.speed + "ms";
          return i.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
            i[0].style[k] = "";
            i[0].style[f] = "";
            i.children(":eq(" + g + ")").css({
              left: 0
            });
            i.children(":eq(" + d + ")").css({
              display: "none",
              left: 0,
              zIndex: 0
            });
            a.data(m, "current", g);
            a.data(m, "animating", false);
            i.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");
            i.children(":not(:eq(" + g + "))").css({
              display: "none",
              left: 0,
              zIndex: 0
            });
            if (m.data.touch) {
              m._setuptouch()
            }
            return m.options.callback.complete(g + 1)
          })
        } else {
          return i.stop().animate({
            left: e
          }, this.options.effect.slide.speed, function() {
            i.css({
              left: 0
            });
            i.children(":eq(" + g + ")").css({
              left: 0
            });
            return i.children(":eq(" + d + ")").css({
              display: "none",
              left: 0,
              zIndex: 0
            }, a.data(m, "current", g), a.data(m, "animating", false), m.options.callback.complete(g + 1))
          })
        }
      }
    };
    d.prototype._fade = function(b) {
      var c, d, e, f, g, h = this;
      c = a(this.element);
      this.data = a.data(this);
      if (!this.data.animating && b !== this.data.current + 1) {
        a.data(this, "animating", true);
        d = this.data.current;
        if (b) {
          b = b - 1;
          g = b > d ? 1 : -1;
          e = b
        } else {
          g = this.data.direction === "next" ? 1 : -1;
          e = d + g
        }
        if (e === -1) {
          e = this.data.total - 1
        }
        if (e === this.data.total) {
          e = 0
        }
        this._setActive(e);
        f = a(".slidesjs-control", c);
        f.children(":eq(" + e + ")").css({
          display: "none",
          left: 0,
          zIndex: 10
        });
        this.options.callback.start(d + 1);
        if (this.options.effect.fade.crossfade) {
          f.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed);
          return f.children(":eq(" + e + ")").stop().fadeIn(this.options.effect.fade.speed, function() {
            f.children(":eq(" + e + ")").css({
              zIndex: 0
            });
            a.data(h, "animating", false);
            a.data(h, "current", e);
            return h.options.callback.complete(e + 1)
          })
        } else {
          return f.children(":eq(" + d + ")").stop().fadeOut(this.options.effect.fade.speed, function() {
            f.children(":eq(" + e + ")").stop().fadeIn(h.options.effect.fade.speed, function() {
              return f.children(":eq(" + e + ")").css({
                zIndex: 10
              })
            });
            a.data(h, "animating", false);
            a.data(h, "current", e);
            return h.options.callback.complete(e + 1)
          })
        }
      }
    };
    d.prototype._getVendorPrefix = function() {
      var a, b, d, e, f;
      a = c.body || c.documentElement;
      d = a.style;
      e = "transition";
      f = ["Moz", "Webkit", "Khtml", "O", "ms"];
      e = e.charAt(0).toUpperCase() + e.substr(1);
      b = 0;
      while (b < f.length) {
        if (typeof d[f[b] + e] === "string") {
          return f[b]
        }
        b++
      }
      return false
    };
    return a.fn[f] = function(b) {
      return this.each(function() {
        if (!a.data(this, "plugin_" + f)) {
          return a.data(this, "plugin_" + f, new d(this, b))
        }
      })
    }
  })(jQuery, window, document)
}).call(this);
(function(a, b) {
  "use strict";
  var c = function(a) {
    this.bind(a);
    this.bindHypotenuse(a);
    this.stopScroll(a)
  };
  c.prototype = {
    bind: function(a) {
      b(a).slidesjs({
        width: window.innerWidth,
        height: window.innerHeight,
        pagination: {
          active: false
        },
        navigation: {
          active: false
        }
      })
    },
    bindHypotenuse: function(a) {
      var c = b(a).find(".js-upslide");
      var d = c.find(".hypotenuse");
      var e = d.innerHeight();
      var f = d.innerWidth();
      var g = Math.asin(e / window.innerWidth) * 180 / Math.PI;
      var h = f / Math.cos(8 * Math.PI / 180);
      d.css({
        width: h,
        transform: "rotate(" + g + "deg)"
      })
    },
    stopScroll: function(a) {
      var c = false;
      var d;
      var e;
      b(".slidesjs-control").on("touchstart", function(a) {
        var c = b(this).find(".slidesjs-visiable");
        var f = c.height();
        var g = c.scrollTop();
        var h = c.get(0).scrollHeight;
        var i = parseInt(c.css("paddingTop"), 10);
        var j = a.originalEvent.touches[0];
        var k = h - g - f - i;
        d = j.pageY;
        if (!g && !k) {
          e = 2
        } else if (!g) {
          e = 1
        } else if (!k) {
          e = -1
        } else {
          e = 0
        }
      }).on("touchmove", function(a) {
        var b = a.originalEvent.touches[0];
        if (e === 2) {
          return false
        }
        if (b.pageY - d < 0) {
          c = -e
        } else {
          c = e
        }
        if (c > 0) {
          c = true
        } else {
          c = false
        }
        return !c
      })
    }
  };
  b.fn.tuji = function() {
    var a = new c(this);
    return a
  }
})(window, jQuery);
(function(a) {
  "use strict";
  if (typeof ontouchstart != "undefined" && typeof ontouchend != "undefined") {
    ns.touchStartOrClick = "touchstart";
    ns.touchEndOrClick = "touchend"
  } else {
    ns.touchStartOrClick = "click";
    ns.touchEndOrClick = "click"
  }
  ns.determineClickOrTouchstart = function() {
    return "touchstart"
  };
  ns.getViewportHeight = function() {
    var a;
    if (IFR.env.ios && IFR.env.weixin && screen && screen.height) {
      a = screen.height - 64
    } else {
      a = window.innerHeight
    }
    return a
  }
})(jQuery);
(function(a) {
  "use strict";
  var b = "QuotaExceededError";
  var c = 1e3;
  var d = 86400;
  var e;

  function f() {}
  f.prototype.setCache = function(a, f, g) {
    var h = (new Date).getTime();
    var i = g && g.expiresIn ? g.expiresIn : d;
    var j;
    if (!a || !f) {
      return undefined
    }
    e = h + parseInt(i * c);
    j = {
      data: f,
      timeStamp: e
    };
    try {
      localStorage.setItem(a, JSON.stringify(j))
    } catch (c) {
      if (c.name === b) {
        this.removeAll();
        localStorage.setItem(a, JSON.stringify(j))
      }
    }
  };
  f.prototype.getCache = function(a) {
    var b = localStorage.getItem(a);
    var c = (new Date).getTime();
    if (b) {
      b = JSON.parse(b) || {};
      if (b.timeStamp < c) {
        this.removeItem(a);
        return undefined
      }
      return b
    }
    return undefined
  };
  f.prototype.removeItem = function(a) {
    localStorage.removeItem(a)
  };
  f.prototype.removeAll = function() {
    localStorage.clear()
  };
  var g = new f;
  a.historyStorage = g
})(window);
(function(a, b) {
  if (location.pathname == "/special/appso-xianmian") {
    location.href = "//app.so/xianmian/";
    return
  }
  var c = 420;
  var d = a("#JS_loading");
  var e = a("#JS_loadMore");
  var f = a("#articles-list");
  var g = a("#loading-more-container");
  var h = a("#no-articles");
  var i = a(window);
  var j = a("#page-content");
  var k = i.height();
  var l = false;
  var m = ns.wpPageNowIs("home");
  var n = document.URL.indexOf("realtime?") >= 0;
  var o = 3;
  var p = 0;
  var q = location.pathname.toString();
  var r = encodeURIComponent(q) + "_IFANR";
  var s = {
    storageData: [],
    nextPageNum: 1
  };
  var t = {
    expiresIn: 1e3
  };
  var u;
  var v;
  var w = m || ns.wpPageNowIs("author");
  ns.initLoadMoreEntries = function() {
    var c = {
      posts_per_page: o,
      excerpt_length: "40",
      thumb_size: "680xauto"
    };
    var j = ns.wpPageNowIs("home") ? a.extend({
      offset_featured: 1
    }, c) : c;
    var k = "ifr_latest";
    var n;
    if (!e.length) {
      return false
    }
    var q = function(b, c) {
      var i;
      var k;
      var m = "!720";
      var o = new RegExp(m);
      v = c;
      if (b) {
        if (!b.length) {
          d.hide()
        }
        i = "";
        a.each(b, function(a, b) {
          b.needPreTitle = w;
          if (b.post_type === "dasheng") {
            n = "entry-item-dasheng"
          } else if (b.post_type === "data") {
            n = "entry-item-data"
          } else {
            n = "entry-item"
          }
          if (!o.test(b.image)) {
            if (/images\.ifanr\.cn/.test(b.image) || /ifanr-cdn\.b0\.upaiyun\.com/.test(b.image)) {
              b.image += m
            }
          }
          k = template(n, b);
          i = i + k
        });
        f.append(i);
        f.append(g);
        if (b.length < j.posts_per_page || parseInt(c) === 0) {
          d.fadeOut(350, function() {
            e.hide()
          });
          h.removeClass("hide");
          s.nextPageNum = p;
          return
        }
        l = false
      }
    };
    var x = function() {
      d.fadeOut(350, function() {
        e.fadeIn(350)
      })
    };
    var z = function() {
      var a = m ? 19 : 10;
      v = e.attr("data-page");
      j.paged = v;
      j.page = v;
      j.offset_featured = 1;
      j = ns.addLoadingConfig(e, j);
      j.posts_per_page = a;
      l = true;
      d.fadeIn(350);
      e.hide();
      if (j.post_type === "dasheng") {
        k = "dasheng"
      }
      x();
      IFR.api(k, {
        data: j,
        success: function(a) {
          v = parseInt(v) + 1;
          e.attr("data-page", v);
          s.storageData = s.storageData.concat(a.data);
          s.nextPageNum = v;
          q(a.data, v);
          historyStorage.setCache(r, s, t);
          i.on("scroll.article-list", y);
          b("send", "pageview", {
            page: window.location.pathname + window.location.search,
            title: "More Contents -- Ajax Load"
          })
        }
      })
    };
    e.on("touchstart", z);
    u = historyStorage.getCache(r);
    if (u && u.data) {
      s.storageData = u.data.storageData;
      v = u.data.nextPageNum;
      e.attr("data-page", parseInt(v));
      q(s.storageData, v)
    }
  };

  function x() {
    var a;
    var b;
    var d;
    var e = u && parseInt(u.data.nextPageNum) === 0 ? true : false;
    if (l || n) {
      return false
    }
    if (e) {
      return false
    }
    a = j[0].scrollHeight;
    b = i.scrollTop();
    d = a - b - k;
    return d <= c
  }
  i.on("scroll.article-list", y);

  function y() {
    if (x()) {
      i.off("scroll.article-list");
      e.trigger("touchstart")
    }
  }
})(jQuery, ga);
(function(a, b) {
  var c = function() {
    this.$navigator = b("[data-cmpt-navigator]");
    this.$overlay = b("#global-nav-overlay");
    this.__hideDelay = null
  };
  c.fn = c.prototype;
  c.fn.onOpenNavigator = function(a) {
    var b = this;
    clearTimeout(b.__hideDelay);
    b.$navigator.addClass("slide-in-down");
    b.$overlay.addClass("state-open").clsShow()
  };
  c.fn.onCloseNavigator = function(a) {
    var b = this;
    b.$navigator.removeClass("slide-in-down");
    b.$overlay.removeClass("state-open");
    b.__hideDelay = setTimeout(function() {
      b.$overlay.clsHide()
    }, 200)
  };
  c.fn.onScrollInsideNavigiator = function(a) {};
  c.fn.bindEvents = function() {
    var a = this;
    b("#outer-container").on("click", ".js-navigator", a.onOpenNavigator.bind(a)).on("click", ".js-close-nav", a.onCloseNavigator.bind(a));
    a.$navigator.on("touchmove", a.onScrollInsideNavigiator.bind(a))
  };
  c.fn.init = function() {
    var a = this;
    a.bindEvents();
    IFR.Events.on("hide.global-navigator", a.onCloseNavigator.bind(a));
    return a
  };
  a.NavigatorComponent = c
})(window, jQuery);
(function(a, b, c) {
  var d = Array.prototype.push;

  function e(a) {
    var b = this;
    this.isSdkReady = false;
    this.wxOpts = c.extend({
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "chooseImage"]
    }, a.weixin);
    this.shareOpts = c.extend({}, a.share);
    this.imageOpts = c.extend({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"]
    }, a.image);
    this.__initialShareOpts = c.extend({}, this.shareOpts);
    this.__initialImageOpts = c.extend({}, this.imageOpts)
  }
  e.prototype.initialize = function() {
    var a = this;
    b.config(this.wxOpts);
    b.ready(function() {
      a.isSdkReady = true;
      a.bindShareEvents();
      a.afterSdkReady()
    });
    b.error(function(b) {
      a.onError(b)
    })
  };
  e.prototype.bindShareEvents = function(d) {
    var e = this;
    var f = d ? c.extend(e.shareOpts, d) : e.__initialShareOpts;
    b.onMenuShareTimeline({
      title: f.title || a.document.title,
      link: f.link || a.location.href,
      imgUrl: f.imgUrl || "",
      success: function() {
        e.afterShareCompleted("Timeline")
      },
      cancel: function() {
        e.afterShareCancelled("Timeline")
      }
    });
    b.onMenuShareAppMessage({
      title: f.title || a.document.title,
      desc: f.desc || "",
      link: f.link || a.location.href,
      imgUrl: f.imgUrl || "",
      type: f.type || "",
      dataUrl: f.dataUrl || "",
      success: function() {
        e.afterShareCompleted("WeChat")
      },
      cancel: function() {
        e.afterShareCancelled("WeChat")
      }
    });
    b.onMenuShareQQ({
      title: f.title || a.document.title,
      desc: f.desc || "",
      link: f.link || a.location.href,
      imgUrl: f.imgUrl || "",
      success: function() {
        e.afterShareCompleted("QQ")
      },
      cancel: function() {
        e.afterShareCancelled("QQ")
      }
    });
    b.onMenuShareQZone({
      title: f.title || a.document.title,
      desc: f.desc || "",
      link: f.link || a.location.href,
      imgUrl: f.imgUrl || "",
      success: function() {
        e.afterShareCompleted("QZone")
      },
      cancel: function() {
        e.afterShareCancelled("QZone")
      }
    });
    b.onMenuShareWeibo({
      title: f.title || a.document.title,
      desc: f.desc || "",
      link: f.link || a.location.href,
      imgUrl: f.imgUrl || "",
      success: function() {
        e.afterShareCompleted("Weibo")
      },
      cancel: function() {
        e.afterShareCancelled("Weibo")
      }
    })
  };
  e.prototype.chooseImage = function(a) {
    var e = this;
    var f = a ? c.extend(this.imageOpts, a) : this.__initialImageOpts;
    b.chooseImage({
      count: f.count,
      sizeType: f.sizeType,
      sourceType: f.sourceType,
      success: function(a) {
        var b = [a];
        d.apply(b, a.localIds);
        e.afterImageLoaded.apply(e, b)
      }
    })
  };
  e.prototype.afterSdkReady = function() {};
  e.prototype.onError = function(a) {};
  e.prototype.afterShareCompleted = function(a) {};
  e.prototype.afterShareCancelled = function(a) {};
  e.prototype.afterImageLoaded = function(a) {};
  a.WeiXinSDK = e
})(window, wx, jQuery);
(function(a, b, c, d, e, f) {
  "use strict";
  var g = "http://cdn.ifanr.cn/ifanr/logo.png";
  var h = "http://cdn.ifanr.cn/ifanr/tuji.png";
  var i = "五张图告诉你一周科技热点";
  var j = e.weixin.wxsdk_config;
  var k = new b({
    weixin: {
      debug: false,
      appId: "wxb96a3e0f1f701100",
      timestamp: j.timestamp,
      nonceStr: j.nonceStr,
      signature: j.signature,
      jsApiList: j.jsApiList
    },
    share: {
      title: "爱范儿",
      link: a.location.href,
      imgUrl: g
    }
  });
  var l = {};

  function m() {
    c("send", "social", "WeChat", "View", weixin_data.link);
    d(window).on("weixin_share", function(a, b) {
      c("send", "social", "WeChat", b, weixin_data.link)
    })
  }

  function n() {
    var b = document.title;
    var c = a.location.href;
    var e = g;
    var f = d('meta[name="description"]').attr("content");
    k.bindShareEvents({
      title: b,
      link: c,
      desc: f,
      imgUrl: e,
      type: "link"
    })
  }
  l = {
    __CACHE: {},
    cached: false,
    defaultArticleMeta: function b() {
      return {
        headline: document.title,
        description: d('meta[name="description"]').attr("content"),
        thumbnailUrl: g,
        link: a.location.href
      }
    },
    getCurrentArticleMeta: function a() {
      var b;
      var c;
      if (l.cached) {
        return l.__CACHE
      }
      b = l.getVisibleSnsTool();
      if (!b) {
        l.__CACHE = l.defaultArticleMeta();
        return l.__CACHE
      }
      c = l.getArticleById(b.data("post-id"));
      l.__CACHE = {
        headline: c.find(".entry-name").text().replace(/(\r\n|\n|\r|\s+)/gm, ""),
        description: c.find("p:first-child").text().replace(/(\r\n|\n|\r|\s+)/gm, ""),
        thumbnailUrl: c.find(".js-head-picture").attr("src"),
        link: c.data("link")
      };
      l.cached = true;
      return l.__CACHE
    },
    getVisibleSnsTool: function a() {
      var b = d("[data-cmpt-sns-tool]");
      var c = 0;
      var e = 0;
      var f;
      for (c = 0, e = b.length; c < e; c++) {
        f = d(b[c]);
        if (f.hasClass("hide")) {
          continue
        }
        return f
      }
      return null
    },
    getArticleById: function a(b) {
      return d("#post-" + b)
    },
    flush: function a() {
      l.cached = false
    }
  };

  function o() {
    l.flush();
    k.bindShareEvents({
      title: l.getCurrentArticleMeta().headline,
      link: l.getCurrentArticleMeta().link,
      desc: l.getCurrentArticleMeta().description,
      imgUrl: l.getCurrentArticleMeta().thumbnailUrl,
      type: "link"
    })
  }

  function p() {
    k.bindShareEvents({
      title: document.title,
      link: a.location.href,
      imgUrl: g,
      desc: i,
      type: "link"
    })
  }

  function q() {
    m();
    if (f.wpPageNowIs("home")) {
      n()
    } else if (f.wpPageNowIs("single")) {
      o();
      e.Events.on("weixin.sdk.share", o)
    } else if (f.wpPageNowIs("tuji")) {
      p()
    }
  }

  function r() {}
  k.afterSdkReady = q;
  k.onError = r;
  k.afterShareCompleted = l.flush
})(window, WeiXinSDK, ga, jQuery, IFR, ns);
! function(a) {
  "use strict";
  var b = function(a, c) {
    return b[/string|function/.test(typeof c) ? "compile" : "render"].apply(b, arguments)
  };
  var c = b.cache = {};
  var d = function(a, b) {
    if (typeof a !== "string") {
      b = typeof a;
      if (b === "number") {
        a += ""
      } else if (b === "function") {
        a = d(a.call(a))
      } else {
        a = ""
      }
    }
    return a
  };
  var e = {
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;",
    "&": "&#38;"
  };
  var f = function(a) {
    return d(a).replace(/&(?![\w#]+;)|[<>"']/g, function(a) {
      return e[a]
    })
  };
  var g = Array.isArray || function(a) {
    return {}.toString.call(a) === "[object Array]"
  };
  var h = function(a, b) {
    if (g(a)) {
      for (var c = 0, d = a.length; c < d; c++) {
        b.call(a, a[c], c, a)
      }
    } else {
      for (c in a) {
        b.call(a, a[c], c)
      }
    }
  };
  var i = function(a, b) {
    var c = /(\/)[^\/]+\1\.\.\1/;
    var d = a.replace(/^([^.])/, "./$1").replace(/[^\/]+$/, "");
    var e = d + b;
    e = e.replace(/\/\.\//g, "/");
    while (e.match(c)) {
      e = e.replace(c, "/")
    }
    return e
  };
  var j = b.helpers = {
    $include: function(a, c, d) {
      var e = i(d, a);
      return b.render(e, c)
    },
    $string: d,
    $escape: f,
    $each: h
  };
  var k = function(b) {
    var c = "";
    for (var d in b) {
      c += "<" + d + ">\n" + b[d] + "\n\n"
    }
    if (c && a.console) {
      console.error("Template Error\n\n" + c)
    }
    return function() {
      return "{Template Error}"
    }
  };
  b.render = function(a, c) {
    var d = b.get(a) || k({
      id: a,
      name: "Render Error",
      message: "No Template"
    });
    return c ? d(c) : d
  };
  b.compile = function(a, b) {
    var d = typeof b === "function";
    var e = c[a] = function(c) {
      try {
        return d ? new b(c, a) + "" : b
      } catch (a) {
        return k(a)()
      }
    };
    e.prototype = j;
    if (d) {
      b.prototype = j
    }
    e.toString = function() {
      return b + ""
    };
    return e
  };
  b.get = function(a) {
    return c[a.replace(/^\.\//, "")]
  };
  b.helper = function(a, b) {
    j[a] = b
  };
  b.helper("$inArray", function(a, b) {
    return window.$.inArray(a, b)
  });
  b.helper("i18n", function(a, b, c) {
    return window.i18n(a, b, c)
  });
  b.helper("url", function(a, b) {
    if (window.IFR.url[a]) return b ? window.IFR.url[a][b] : window.IFR.url[a]
  });
  b.helper("iff", function(a, b) {
    return a ? b : ""
  });
  b.helper("$relativetime", function() {
    return function(a) {
      return window.IFR.util.relativetime(a)
    }
  }());
  b.helper("$strip_tags", function() {
    return function(a) {
      return a.replace(/(<([^>]+)>)/gi, "")
    }
  }());
  b.helper("$substring", function() {
    return function(a, b) {
      return a.substring(0, b)
    }
  }());
  b.helper("$adjust_image_size", function() {
    return function(a) {
      return a + window.IFR.calcBestImageSize()
    }
  }());
  b("comment-item", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.comment_id,
      f = a.avatar,
      g = a.comment_author,
      h = a.rated,
      i = a.postId,
      j = a.comment_rating_up,
      k = a.comment_rating_down,
      l = c.$string,
      m = a.comment_content,
      n = a.from_app,
      o = c.$relativetime,
      p = a.comment_date,
      q = "";
    q += ' <li class="comment js-comment-';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '" id="comment-';
    q += d(e);
    q += '"> <div class="comment-content clearfix"> <div class="comment-top clearfix"> <div class="comment-avatar vcard"> <a data-jump-to ><img alt="" src="';
    q += d(f);
    q += '" class="avatar photo" /></a> </div> <div class="comment-author">';
    q += d(g);
    q += '</div> <div class="comment-rating-zone"> <a class="J_rating js-rating comment-rating rating-up';
    if (h) {
      q += " rated"
    }
    q += '" id="up-';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '" data-action="add" data-post-id="';
    q += d(i);
    q += '" href="javascript:void(0);"> <i class="ifanr2015 ifanr2015-up"></i> <i class="ifanr2015 ifanr2015-dagou"></i> <span id="karma-';
    q += d(e);
    q += '-up">';
    q += d(j);
    q += '</span> </a> <a class="J_rating js-rating comment-rating rating-down';
    if (h) {
      q += " rated"
    }
    q += '" id="down-';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '" data-action="subtract" data-post-id="';
    q += d(i);
    q += '" href="javascript:void(0);"> <i class="ifanr2015 ifanr2015-down"></i> <i class="ifanr2015 ifanr2015-dagou"></i> <span id="karma-';
    q += d(e);
    q += '-down">';
    q += d(k);
    q += '</span> </a> </div> </div> <div class="js-comment-body-';
    q += d(e);
    q += ' comment-body"> ';
    q += l(m);
    q += ' </div> <div class="comment-meta commentmetadata clearfix"> <div class="comment-date"> ';
    if (n) {
      q += ' <span class="comment-from">';
      q += l(n);
      q += "，</span> "
    }
    q += " ";
    q += o(p);
    q += ' </div> <a class="reply comment-reply-link J_ReplyCmt js-reply-comment" href="javascript:void(0);" data-postId="';
    q += d(i);
    q += '" data-parentId="';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '">回复</a> </div> </div> </li>';
    return new String(q)
  });
  b("desktop-article-like-avatars", function(a, b) {
    var c = this,
      d = a.i,
      e = a.like_avatar,
      f = c.$escape,
      g = a.like_count,
      h = "";
    h += '<div class="js-avatars-list avatars-list"> ';
    for (var d = 0; d < e.length; d++) {
      h += ' <img class="avatar-item" src="';
      h += f(e[d]);
      h += '" alt=""/> '
    }
    h += ' </div> <div class="avatars-counter"> <span class="js-avatars-count avatars-count">';
    h += f(g);
    h += " 个人</span> 点了赞 </div>";
    return new String(h)
  });
  b("desktop-author-hotest-posts", function(a, b) {
    var c = this,
      d = a.i,
      e = a.list,
      f = c.$escape,
      g = "";
    g += '<div class="title"> <i class="ifanr2015 ifanr2015-remen"></i> <h2>TA 最热的文章</h2> </div> <ul> ';
    for (d = 0; d < e.length; d++) {
      g += ' <li class="list"> <a title="';
      g += f(e[d]["title"]);
      g += '" href="';
      g += f(e[d]["link"]);
      g += '" class="ifanr-top-posts-';
      g += f(d);
      g += '" rel="external" target="_blank"> <div class="ifanr-top-posts-container"> <div class="ifanr-top-posts-cell number-cell"> <span class="ifanr-top-posts-comment">';
      g += f(d + 1);
      g += '</span> </div> <div class="ifanr-top-posts-cell"> <span class="ifanr-top-posts-title">';
      g += f(e[d]["title"]);
      g += "</span> </div> </div> </a> </li> "
    }
    g += " </ul>";
    return new String(g)
  });
  b("desktop-author-latest-posts", function(a, b) {
    var c = this,
      d = a.i,
      e = a.list,
      f = c.$escape,
      g = a.authorLink,
      h = "";
    h += '<div class="title"> <i class="ifanr2015 ifanr2015-remen"></i> <h2>作者最近的文章</h2> </div> <ul> ';
    for (d = 0; d < e.length; d++) {
      h += ' <li class="list"> <a title="';
      h += f(e[d]["title"]);
      h += '" href="';
      h += f(e[d]["link"]);
      h += '" class="ifanr-top-posts-';
      h += f(d);
      h += '" rel="external" target="_blank"> <div class="ifanr-top-posts-container"> <div class="ifanr-top-posts-cell number-cell"> <span class="ifanr-top-posts-comment">';
      h += f(d + 1);
      h += '</span> </div> <div class="ifanr-top-posts-cell"> <span class="ifanr-top-posts-title">';
      h += f(e[d]["title"]);
      h += "</span> </div> </div> </a> </li> "
    }
    h += ' </ul> <!-- <a class="pull-right" href="';
    h += f(g);
    h += '">更多文章</a> -->';
    return new String(h)
  });
  b("desktop-chatroom-indicator", function(a, b) {
    var c = this,
      d = a.show,
      e = a.showHint,
      f = c.$escape,
      g = a.hint,
      h = a.showMessages,
      i = a.avatar_0,
      j = a.avatar_1,
      k = a.avatar_2,
      l = a.message_0,
      m = a.message_1,
      n = a.message_2,
      o = "";
    o += '<section class="chatroom-indicator-container js-chatroom-indicator-container ';
    if (d) {
      o += " chatroom-indicator-show js-chatroom-indicator"
    } else {
      o += " chatroom-indicator-partially-hide "
    }
    o += '"> <div class="chatroom-indicator-header"> <i class="ifanr2015 ifanr2015-comment2 chatroom-icon"></i> <div class="chatroom-indicator-title">即时讨论</div> ';
    if (e) {
      o += ' <div class="chatroom-indicator-hint">';
      o += f(g);
      o += "</div> "
    }
    o += " </div> ";
    if (h) {
      o += ' <div class="chatroom-indicator-main"> <ul class="chatroom-indicator-avatars-list chatroom-carousel"> <li class="chatroom-carousel-item chatroom-carousel-front"> <img src="';
      o += f(i);
      o += '" class="chatroom-indicator-avatar" align="middle"/> </li> <li class="chatroom-carousel-item chatroom-carousel-middle"> <img src="';
      o += f(j);
      o += '" class="chatroom-indicator-avatar" align="middle"/> </li> <li class="chatroom-carousel-item chatroom-carousel-back"> <img src="';
      o += f(k);
      o += '" class="chatroom-indicator-avatar" align="middle"/> </li> </ul> <ul class="chatroom-indicator-messages-list chatroom-fade-carousel"> <li class="chatroom-carousel-item chatroom-carousel-front chatroom-indicator-message"> ';
      o += f(l);
      o += ' </li> <li class="chatroom-carousel-item chatroom-carousel-middle chatroom-indicator-message"> ';
      o += f(m);
      o += ' </li> <li class="chatroom-carousel-item chatroom-carousel-back chatroom-indicator-message"> ';
      o += f(n);
      o += " </li> </ul> </div> "
    }
    o += " </section> ";
    return new String(o)
  });
  b("desktop-chatroom-message-left", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.sender,
      f = a.timeStr,
      g = a.content,
      h = "";
    h += '<section class="chatroom-message-container chatroom-message-left-container"> <img src=\'';
    h += d(e.avatarUrl);
    h += '\' class="chatroom-message-avatar" /> <div class="chatroom-message-detail-left"> <div class="chatroom-message-username">';
    h += d(e.name);
    h += '</div> <div class="chatroom-message-sentat">';
    h += d(f);
    h += '</div> <div class="chatroom-message-box"> <div class="chatroom-message-triangle"></div> <div class="chatroom-message-content">';
    h += d(g);
    h += "</div> <div> </div> </section> ";
    return new String(h)
  });
  b("desktop-chatroom-message-right", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.messageId,
      f = a.sender,
      g = a.timeStr,
      h = a.failed,
      i = a.processing,
      j = a.content,
      k = "";
    k += '<section class="chatroom-message-container chatroom-message-right-container js-message" id="';
    k += d(e);
    k += "\"> <img src='";
    k += d(f.avatarUrl);
    k += '\' class="chatroom-message-avatar" /> <div class="chatroom-message-sentat">';
    k += d(g);
    k += '</div> <div class="chatroom-message-box"> ';
    if (h) {
      k += ' <div class="chatroom-message-status img-status-failed js-resend"></div> '
    } else if (i) {
      k += ' <div class="chatroom-message-status js-processing img-status-processing"></div> '
    } else {
      k += ' <div class="chatroom-message-status"></div> '
    }
    k += ' <div class="chatroom-message-content">';
    k += d(j);
    k += '</div> <div class="chatroom-message-triangle"></div> </div> </section> ';
    return new String(k)
  });
  b("desktop-chatroom-messages-group-header", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.time,
      f = "";
    f += '<div class="chatroom-messages-group-header center"> <time class="chatroom-messages-group-time">';
    f += d(e);
    f += '</time> <div class="line"></div> </div> ';
    return new String(f)
  });
  b("desktop-chatroom-messages-group", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.htmlId,
      f = function(d, e) {
        e = e || a;
        var f = c.$include(d, e, b);
        i += f;
        return f
      },
      g = a.i,
      h = a.messages,
      i = "";
    i += '<section class="chatroom-messages-group" id="';
    i += d(e);
    i += '"> ';
    f("./desktop-chatroom-messages-group-header");
    i += " ";
    for (var g = 0; g < h.length; g++) {
      i += " ";
      if (h[g].left) {
        i += " ";
        f("./desktop-chatroom-message-left", h[g]);
        i += " "
      } else {
        i += " ";
        f("./desktop-chatroom-message-right", h[g]);
        i += " "
      }
      i += " "
    }
    i += " </section> ";
    return new String(i)
  });
  b("desktop-chatroom-panel", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.title,
      f = "";
    f += '<div class="chatroom-panel-wrapper js-chatroom-panel"> <section class="chatroom-panel"> <header class="chatroom-panel-header"> <i class="ifanr2015 ifanr2015-comment2 chatroom-icon"></i> <h1 class=\'chatroom-title\'>';
    f += d(e);
    f += '</h1> </header> <section class="chatroom-toolbar"> <div class="chatroom-close-panel-btn js-chatroom-close-panel-btn"></div> </section> <section class="js-chatroom-notification chatroom-notification chatroom-hide"> 失手了! </section> <section class="chatroom-display-area"> <section class="chatroom-load-more"> <div class="chatroom-load-more-spacer"></div> <a class=\'chatroom-load-more-link js-chatroom-load-more\' href=\'#\' onclick="return false;"><i>加载更多讨论</i></a> <div class=\'chatroom-load-more-hint js-chatroom-load-more-hint load-more-hidden\'>正在加载更多讨论...</div> </section> </section> <section class="chatroom-inputbox"> <form action="#" onsubmit="return false;"> <textarea class="auto-expand-textarea js-auto-expand-textarea" placeholder="说说你的看法"></textarea> <input class="chatroom-inputbox-return-btn" type="button" value="Send" /> </form> <div class="chatroom-inputbox-footer"> <div class="chatroom-inputbox-instruction">Enter发送</div> </div> </section> </section> </div> ';
    return new String(f)
  });
  b("desktop-comment-item-new", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.comment_id,
      f = a.avatar,
      g = a.comment_author,
      h = a.rated,
      i = a.postId,
      j = a.comment_rating_up,
      k = a.comment_rating_down,
      l = c.$string,
      m = a.comment_content,
      n = a.from_app,
      o = a.comment_date,
      p = "";
    p += ' <li class="comment" id="comment-';
    p += d(e);
    p += '" data-id="';
    p += d(e);
    p += '"> <div class="comment-content clearfix"> <div class="comment-top clearfix"> <div class="comment-avatar vcard"> <a><img alt="" src="';
    p += d(f);
    p += '" class="avatar photo"/></a> </div> </div> <div id="comment-body-';
    p += d(e);
    p += '" class="comment-body"> <div class="comment-author">';
    p += d(g);
    p += '</div> <div class="comment-rating-zone"> <a class="J_rating comment-rating rating-up';
    if (h) {
      p += " rated"
    }
    p += '" id="up-';
    p += d(e);
    p += '" data-id="';
    p += d(e);
    p += '" data-action="add" data-post-id="';
    p += d(i);
    p += '" href="javascript:void(0);" title="认同"> <i class="ifanr2015 ifanr2015-unfold rate-up"></i> <i class="ifanr2015 ifanr2015-dagou"></i> <span id="karma-';
    p += d(e);
    p += '-up">';
    p += d(j);
    p += '</span> </a> <a class="J_rating comment-rating rating-down';
    if (h) {
      p += " rated"
    }
    p += '" id="down-';
    p += d(e);
    p += '" data-id="';
    p += d(e);
    p += '" data-action="subtract" data-post-id="';
    p += d(i);
    p += '" href="javascript:void(0);" title="反对"> <i class="ifanr2015 ifanr2015-xiala-small rate-down"></i> <i class="ifanr2015 ifanr2015-dagou"></i> <span id="karma-';
    p += d(e);
    p += '-down">';
    p += d(k);
    p += '</span> </a> </div> <a class="comment-edit m-l-10 hide" href="<?php echo get_edit_comment_link(); ?>';
    p += d(e);
    p += '" target="_blank">编辑</a> <p>';
    p += l(m);
    p += '</p> </div> <div class="comment-meta commentmetadata clearfix"> <a class="reply comment-reply-link J_ReplyCmt" href="javascript:void(0);" data-postId="';
    p += d(i);
    p += '" data-parentId="';
    p += d(e);
    p += '" data-id="';
    p += d(e);
    p += '">回复</a> ';
    if (n) {
      p += ' <span class="comment-from-app">';
      p += l(n);
      p += "，</span> "
    }
    p += ' <div class="comment-date">';
    p += d(o);
    p += "</div> </div> </div> </li>";
    return new String(p)
  });
  b("desktop-comment-item", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.comment_id,
      f = a.depth,
      g = a.avatar,
      h = a.comment_author,
      i = a.rated,
      j = a.postId,
      k = a.comment_rating_up,
      l = a.comment_rating_down,
      m = c.$string,
      n = a.comment_content,
      o = a.from_app,
      p = a.comment_date,
      q = "";
    q += '<li id="comment-';
    q += d(e);
    q += '" class="comment js-comment-';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '" data-depth="';
    q += d(f);
    q += '"> <div class="comment-content clearfix"> <div class="comment-top clearfix"> <div class="comment-avatar vcard"> <a href="#comment-';
    q += d(e);
    q += '"><img alt="" src="';
    q += d(g);
    q += '" class="avatar photo"/></a> </div> </div> <div class="comment-body js-comment-body-';
    q += d(e);
    q += '"> <div class="comment-author">';
    q += d(h);
    q += '</div> <div class="comment-rating-zone"> <a class="J_rating js-rating comment-rating rating-up';
    if (i) {
      q += " rated"
    }
    q += '" id="up-';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '" data-action="add" data-post-id="';
    q += d(j);
    q += '" href="javascript:void(0);" title="认同"> <i class="ifanr2015 ifanr2015-unfold rate-up"></i> <i class="ifanr2015 ifanr2015-dagou"></i> <span id="karma-';
    q += d(e);
    q += '-up">';
    q += d(k);
    q += '</span> </a> <a class="J_rating js-rating comment-rating rating-down';
    if (i) {
      q += " rated"
    }
    q += '" id="down-';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '" data-action="subtract" data-post-id="';
    q += d(j);
    q += '" href="javascript:void(0);" title="反对"> <i class="ifanr2015 ifanr2015-xiala-small rate-down"></i> <i class="ifanr2015 ifanr2015-dagou"></i> <span id="karma-';
    q += d(e);
    q += '-down">';
    q += d(l);
    q += '</span> </a> </div> <a class="comment-edit m-l-10 hide" href="<?php echo get_edit_comment_link(); ?>';
    q += d(e);
    q += '" target="_blank">编辑</a> ';
    q += m(n);
    q += ' </div> <div class="comment-meta commentmetadata clearfix"> <a class="reply comment-reply-link J_ReplyCmt js-reply-comment" href="javascript:void(0);" data-postId="';
    q += d(j);
    q += '" data-parentId="';
    q += d(e);
    q += '" data-id="';
    q += d(e);
    q += '">回复</a> ';
    if (o) {
      q += ' <span class="comment-from-app">';
      q += m(o);
      q += "，</span> "
    }
    q += ' <a href="javascript:void(0)" class="comment-date">';
    q += d(p);
    q += "</a> </div> </div> ";
    if (f <= 5) {
      q += ' <ul class="js-';
      q += d(e);
      q += '-children children"></ul> '
    }
    q += " </li>";
    return new String(q)
  });
  b("desktop-entry-item-dasheng", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.comments,
      f = c.$relativetime,
      g = a.pubDate,
      h = a.link,
      i = c.$string,
      j = a.content,
      k = a.dasheng_author,
      l = a.excerpt,
      m = "";
    m += '<article class="post-item-container row entry-list clearfix"> <div class="post-item-addon comment-count"> <span class="cmt-number">';
    m += d(e);
    m += '</span> <span class="cmt-arrow"></span> </div> <div class="post-item-content"> <div class="tag-label">';
    m += f(g);
    m += '</div> <a class="dasheng-index entry-dasheng clearfix" href="';
    m += d(h);
    m += '"> <div class="entry-dasheng-inner clearfix"> <div class="dasheng_content clearfix"> <span>“';
    m += i(j);
    m += '”</span> <div class="dasheng_original text-right"> <span>—— ';
    m += d(k);
    m += "</span> </div> </div> ";
    if (l) {
      m += ' <div class="dasheng_comment clearfix"> <p>';
      m += d(l);
      m += "</p> </div> "
    }
    m += ' </div> </a> <div class="post-content-bottom row"> <a class="read-more" href="';
    m += d(h);
    m += '">阅读全文</a> <div class="sns-tools js-sns-tools"> <div class="sns-items-wrapper"> <span>分享：</span> <a class="sns-item weibo" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-xinlangweibo"></i></a> <a class="sns-item weixin" data-post-url="';
    m += d(h);
    m += '" data-el="share-to-wechat" data-placement="top" data-toggle="popover" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-weixin"></i></a> <a class="sns-item twitter" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-twitter"></i></a> <div class="sns-item more js-share-items-more" href="javascript:void(0);"> <i class="ifanr2015 ifanr2015-more"></i> <a class="sns-item evernote" target="_blank" href="http://www.evernote.com/clip.action?url=';
    m += d(h);
    m += "&title=";
    m += d(j);
    m += '"><i class="ifanr2015 ifanr2015-evernote"></i></a> <a class="sns-item douban" target="_blank" href="http://www.douban.com/share/service?href=';
    m += d(h);
    m += "&name=";
    m += d(j);
    m += '"><i class="ifanr2015 ifanr2015-douban"></i></a> <a class="sns-item qqzone" target="_blank" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=';
    m += d(h);
    m += "&title=";
    m += d(j);
    m += '"><i class="ifanr2015 ifanr2015-qqkongjian"></i></a> </div> </div> </div> </div> </div> </article>';
    return new String(m)
  });
  b("desktop-entry-item-data", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.ID,
      f = a.comments,
      g = c.$relativetime,
      h = a.pubDate,
      i = a.link,
      j = a.number,
      k = a.subfix,
      l = a.description,
      m = a.content,
      n = a.suffix,
      o = a.title,
      p = "";
    p += '<article id="post-';
    p += d(e);
    p += '" class="row post-item-container entry-list"> <div class="post-item-addon comment-count"> <span class="cmt-number">';
    p += d(f);
    p += '</span> <span class="cmt-arrow"></span> </div> <div class="post-item-content"> <div class="tag-label">';
    p += g(h);
    p += '</div>  <a href="';
    p += d(i);
    p += '" class="clearfix"> <div class="entry-content row"> <span class="widget-data-num num">';
    p += d(j);
    p += "</span> ";
    if (k) {
      p += ' <span class="widget-data-percent yahei">';
      p += d(k);
      p += "</span> "
    }
    p += ' <span class="widget-data-text">';
    p += d(l);
    p += '</span> <div class="entry-data-list-content"><p>';
    p += d(m);
    p += '</p></div> </div> </a> <div class="post-content-bottom row"> <a class="read-more" href="';
    p += d(i);
    p += '">阅读全文</a> <div class="sns-tools js-sns-tools"> <div class="sns-items-wrapper"> <span>分享：</span> <a class="sns-item weibo" target="_blank" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-xinlangweibo"></i></a> <a class="sns-item weixin" data-post-url="';
    p += d(i);
    p += '" data-el="share-to-wechat" data-placement="top" data-toggle="popover" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-weixin"></i></a> <a class="sns-item twitter" target="_blank" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-twitter"></i></a> <div class="sns-item more js-share-items-more" href="javascript:void(0);"> <i class="ifanr2015 ifanr2015-more"></i> <a class="sns-item evernote" target="_blank" href="http://www.evernote.com/clip.action?url=';
    p += d(i);
    p += "&title=";
    p += d(j);
    p += d(n);
    p += '"><i class="ifanr2015 ifanr2015-evernote"></i></a> <a class="sns-item douban" target="_blank" href="http://www.douban.com/share/service?href=';
    p += d(i);
    p += "&name=";
    p += d(j);
    p += d(n);
    p += '"><i class="ifanr2015 ifanr2015-douban"></i></a> <a class="sns-item qqzone" target="_blank" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=';
    p += d(i);
    p += "&title=";
    p += d(o);
    p += d(n);
    p += '"><i class="ifanr2015 ifanr2015-qqkongjian"></i></a> </div> </div> </div> </div> </div> </article> ';
    return new String(p)
  });
  b("desktop-entry-item", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.ID,
      f = a.link,
      g = a.image,
      h = a.title,
      i = a.comments,
      j = a.excerpt,
      k = a.category_link,
      l = a.category,
      m = a.author,
      n = c.$relativetime,
      o = a.pubDate,
      p = "";
    p += '<article id="post-';
    p += d(e);
    p += '" class="row post-item-container"> <div class="new-post-item-content"> <a class="news-pic" href="';
    p += d(f);
    p += '" style="background-image:url(\'';
    p += d(g);
    p += '!400\')"></a> <h2> <a href="';
    p += d(f);
    p += '" rel="external" title="Permalink to ';
    p += d(h);
    p += '">';
    p += d(h);
    p += '</a> <div class="comment-count new-comment-count"> <a class="comment-count-container" href="';
    p += d(f);
    p += '#comments"> <i class="ifanr2015 ifanr2015-pinglun"></i> ';
    p += d(i);
    p += ' </a> </div> </h2> <p class="js-excerpt" data-clamp="2">';
    p += d(j);
    p += '</p> <div class="tag-label"> <a class="tag" href="';
    p += d(k);
    p += '">';
    p += d(l);
    p += '</a> <span class="seperator">|</span> <span class="author">';
    p += d(m);
    p += '</span> <span class="date">';
    p += n(o);
    p += '</span> </div> <div class="post-content-bottom row"> <div class="sns-tools js-sns-tools"> <div class="sns-items-wrapper"> <span>分享：</span> <a class="sns-item weibo" target="_blank" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-xinlangweibo"></i></a> <a class="sns-item weixin" data-post-url="';
    p += d(f);
    p += '" data-el="share-to-wechat" data-placement="top" data-toggle="popover" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-weixin"></i></a> <a class="sns-item twitter" target="_blank" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-twitter"></i></a> <div class="sns-item more js-share-items-more" href="javascript:void(0);"> <i class="ifanr2015 ifanr2015-more"></i> <a ga-track="event" ga-action="click" ga-event-label="linkedin_share" ga-event-category="button" class="js-share-buttons sns-item linkedin" target="_blank" data-share="linkedin" href="https://www.linkedin.com/shareArticle?title=';
    p += d(h);
    p += "&url=";
    p += d(f);
    p += "&summary=";
    p += d(j);
    p += '&source=ifanr" target="_blank"><i class="ifanr2015 ifanr2015-linkedin"></i></a> <a class="sns-item evernote" target="_blank" href="http://www.evernote.com/clip.action?url=';
    p += d(f);
    p += "&title=";
    p += d(h);
    p += '"><i class="ifanr2015 ifanr2015-evernote"></i></a> <a class="sns-item douban" target="_blank" href="http://www.douban.com/share/service?href=';
    p += d(f);
    p += "&name=";
    p += d(h);
    p += '"><i class="ifanr2015 ifanr2015-douban"></i></a> <a class="sns-item qqzone" target="_blank" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=';
    p += d(f);
    p += "&title=";
    p += d(h);
    p += '"><i class="ifanr2015 ifanr2015-qqkongjian"></i></a> </div> </div> </div> </div> </div> </article>';
    return new String(p)
  });
  b("desktop-entry-related", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.relatedRes,
      g = c.$escape,
      h = "";
    for (var d = 0, e = f.length; d < e; d++) {
      h += ' <div class="col"> ';
      if (f[d].post_type === "data") {
        h += ' <a href="http://www.ifanr.com/data/';
        h += g(f[d].objectID);
        h += '" class="related-item"> '
      } else {
        h += ' <a href="';
        h += g(f[d].link);
        h += '" class="related-item"> '
      }
      h += " ";
      if (f[d].number) {
        h += ' <div class="picture" style="background-image:url(\'http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/related-search-shudu.jpg\')"></div> '
      } else if (f[d].image !== "") {
        h += ' <div class="picture" style="background-image:url(\'';
        h += g(f[d].image);
        h += "')\"></div> "
      } else {
        h += ' <div class="picture" style="background-image:url(\'http://cdnzz.ifanr.com/wp-content/themes/ifanr-2.0/static/images/common/default-search-bg.jpg\')"></div> '
      }
      h += ' <div class="title"> <span class="tag"> ';
      if (f[d].category) {
        h += " ";
        h += g(f[d].category);
        h += " "
      } else if (f[d].number) {
        h += " 数读 "
      }
      h += " </span> <h2>";
      h += g(f[d].title);
      h += '</h2> <span class="decoration one"></span> <span class="decoration two"></span> </div> </a> </div> '
    }
    h += " ";
    return new String(h)
  });
  b("desktop-index-appso", '<article class="post-item-container"> <div class="post-item-addon comment-count"> <span class="cmt-number"></span> <span class="cmt-arrow"></span> </div> <div class="post-item-content"> <div class="tag-label"> <span class="tag"></span> <span class="author"></span> <span class="date"></span> </div> <h2> <a href=""></a> </h2> <a class="read-more" href=""></a> <div class="sns-tools"> <span>分享：</span> <a class="sns-item weibo" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-xinlangweibo"></i></a> <a class="sns-item weixin" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-weixin"></i></a> <a class="sns-item twitter" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-twitter"></i></a> <a class="sns-item more" href="javascript:void(0);"><i class="ifanr2015 ifanr2015-more"></i></a> </div> </div> </article>');
  b("desktop-index-mindstore", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.data,
      g = a.k,
      h = a.len2,
      i = c.$escape,
      j = c.$relativetime,
      k = "";
    for (var d = 0, e = f.length; d < e; d++) {
      k += ' <div class="article-item"> ';
      for (var g = 0, h = f[d].length; g < h; g++) {
        k += ' <a id="mindstore-';
        k += i(f[d][g]["id"]);
        k += '" target="_blank" class="entry-ms" href="http://mindstore.io/mind/';
        k += i(f[d][g].id);
        k += '/"> <span class="date">';
        k += j(f[d][g]["created_at"]);
        k += "</span> <h2>";
        k += i(f[d][g]["title"]);
        k += '</h2> <div class="ms-meta"> <div class="ms-voteup"> <i class="ifanr2015 ifanr2015-up"></i> ';
        k += i(f[d][g]["vote_count"]);
        k += ' </div> <div class="ms-comments"> <i class="ifanr2015 ifanr2015-pinglun"></i> ';
        k += i(f[d][g]["comment_count"]);
        k += ' </div> </div> <p class="ms-intro js-ms-intro"> ';
        k += i(f[d][g]["tagline"]);
        k += ' </p> <div class="ms-poster"> <img class="avatar" src="';
        k += i(f[d][g]["created_by"]["avatar_url"]);
        k += '" alt=""/> <span class="nickname">';
        k += i(f[d][g]["created_by"]["nickname"]);
        k += "</span> </div> </a> "
      }
      k += " </div> "
    }
    return new String(k)
  });
  b("desktop-menu-preview", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.previewList,
      g = c.$escape,
      h = c.$string,
      i = c.$strip_tags,
      j = "";
    for (var d = 0, e = f.length; d < e; d++) {
      j += ' <li class="search-item row"> ';
      if (f[d].post_type === "data") {
        j += ' <a href="http://www.ifanr.com/data/';
        j += g(f[d].objectID);
        j += '"> '
      } else {
        j += ' <a href="';
        j += g(f[d].link);
        j += '" class="';
        if (f[d].image === "" || !f[d].image) {
          j += "non-cover"
        }
        j += '"> '
      }
      j += " ";
      if (!!f[d].image && f[d].image !== "") {
        j += ' <div class="result-cover" style="background-image:url(\'';
        j += g(f[d].image);
        j += "')\"></div> "
      } else if (f[d].post_type === "data") {
        j += ' <div class="result-cover" style="background-image:url(\'http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/related-search-shudu.jpg\')"></div> '
      }
      j += ' <div class="result-content"> <h2 class="title">';
      j += h(f[d].title);
      j += '</h2> <p class="excerpt js-excerpt" data-clamp="2">';
      j += g(i(f[d].content));
      j += '</p> <span class="meta"> ';
      if (f[d].category && f[d].category !== "") {
        j += " ";
        j += g(f[d].category);
        j += " | "
      } else if (f[d].post_type === "data") {
        j += " 数读 | "
      }
      j += " ";
      if (f[d].post_type !== "data") {
        j += " ";
        j += g(f[d].author);
        j += " | "
      }
      j += " ";
      j += g(f[d].pubDate);
      j += "</span> </div> </a> </li> "
    }
    return new String(j)
  });
  b("desktop-nav-app-tags", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.tags,
      g = c.$escape,
      h = "";
    h += "<ul> ";
    for (var d = 0, e = f.length; d < e; d++) {
      h += ' <li class="tag-item"> <a class="tag" href="/tag/';
      h += g(f[d]);
      h += '">';
      h += g(f[d]);
      h += "</a> </li> "
    }
    h += " </ul>";
    return new String(h)
  });
  b("desktop-nav-app", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.previewList,
      g = a.j,
      h = a.len2,
      i = c.$escape,
      j = "";
    j += '<div class="showbox nav-app"> ';
    for (var d = 0, e = f.length; d < e; d++) {
      j += ' <div class="item-group"> <div class="item-group-container"> ';
      for (var g = 0, h = f[d].length; g < h; g++) {
        j += " ";
        if (f[d][g].is_jiong) {
          j += ' <div class="item jiong"> <a href="';
          j += i(f[d][g].jiong_link);
          j += '" target="_blank" rel="canonical"> <img class="jiong-picture" src="';
          j += i(f[d][g].jiong_image);
          j += '" width="270" height="180" alt="appso banner"> </a> </div> '
        } else {
          j += ' <div class="item"> <a rel="canonical" href="';
          j += i(f[d][g].link);
          j += '"> <h3 class="title js-excerpt" data-clamp="2">';
          j += i(f[d][g].title);
          j += '</h3> <div class="content-container"> <div class="content"> <p class="excerpt js-excerpt" data-clamp="4">';
          j += i(f[d][g].excerpt);
          j += '</p> </div> <img src="';
          j += i(f[d][g].image);
          j += '" alt="';
          j += i(f[d][g].title);
          j += '"/> </div> </a>  <!-- <span class="meta"> <span class="tags js-tags">';
          j += i(f[d][g].tags);
          j += "</span> </span> --> </div> "
        }
        j += " "
      }
      j += " </div> </div> "
    }
    j += ' </div> <a class="goto" href="/app" title="进入AppSo专栏">进入专栏</a>';
    return new String(j)
  });
  b("desktop-nav-dasheng", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.previewList,
      g = a.j,
      h = a.len2,
      i = c.$escape,
      j = "";
    j += '<div class="showbox nav-dasheng"> ';
    for (var d = 0, e = f.length; d < e; d++) {
      j += ' <div class="item-group"> <div class="item-group-container"> ';
      for (var g = 0, h = f[d].length; g < h; g++) {
        j += ' <div class="item"> <a rel="canonical" href="';
        j += i(f[d][g].link);
        j += '"> <i class="ifanr2015 ifanr2015-dasheng item-hide item-background"></i> <div class="content-container"> <div class="content"> <p class="excerpt js-excerpt" data-clamp="4">';
        j += i(f[d][g].excerpt);
        j += '</p> </div> </div> <span class="meta"> <span class="more item-hide">更多解读</span> <span class="author">';
        j += i(f[d][g].author);
        j += "</span> </span> </a> </div> "
      }
      j += " </div> </div> "
    }
    j += ' </div> <a class="goto" href="/dasheng" title="进入大声专栏">进入专栏</a>';
    return new String(j)
  });
  b("desktop-nav-data", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.previewList,
      g = a.j,
      h = a.len2,
      i = c.$escape,
      j = "";
    j += '<div class="showbox nav-data"> ';
    for (var d = 0, e = f.length; d < e; d++) {
      j += ' <div class="item-group"> <div class="item-group-container"> ';
      for (var g = 0, h = f[d].length; g < h; g++) {
        j += ' <div class="item"> <a rel="canonical" href="';
        j += i(f[d][g].link);
        j += '"> <span class="js-dateYMD date">';
        j += i(f[d][g].pubDate);
        j += '</span> <h3 class="number-container"> <span class="number">';
        j += i(f[d][g].number);
        j += '</span> <span class="subfix">';
        j += i(f[d][g].subfix);
        j += '</span> </h3> <p class="excerpt js-excerpt" data-clamp="2">';
        j += i(f[d][g].description);
        j += "</p> </a> </div> "
      }
      j += " </div> </div> "
    }
    j += " </div> ";
    return new String(j)
  });
  b("desktop-nav-mindstore", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.previewList,
      g = a.j,
      h = a.len2,
      i = c.$escape,
      j = "";
    j += '<div class="showbox nav-mindstore"> ';
    for (var d = 0, e = f.length; d < e; d++) {
      j += ' <div class="item-group"> <div class="item-group-container"> ';
      for (var g = 0, h = f[d].length; g < h; g++) {
        j += ' <div class="item"> <a rel="canonical" href="http://mindstore.io/mind/';
        j += i(f[d][g].id);
        j += '/"> <img class="avatar" src="';
        j += i(f[d][g]["created_by"]["avatar_url"]);
        j += '" alt="';
        j += i(f[d][g]["created_by"]["nickname"]);
        j += '"/> <h3 class="title js-excerpt" data-clamp="2">';
        j += i(f[d][g].title);
        j += '</h3> <div class="content-container"> <div class="content"> <p class="excerpt js-excerpt" data-clamp="2">';
        j += i(f[d][g].tagline);
        j += '</p> </div> </div> <span class="meta"> <span class="ms-voteup"> <i class="ifanr2015 ifanr2015-up"></i> ';
        j += i(f[d][g]["vote_count"]);
        j += ' </span> <span class="ms-comments"> <i class="ifanr2015 ifanr2015-pinglun"></i> ';
        j += i(f[d][g]["comment_count"]);
        j += " </span> </span> </a> </div> "
      }
      j += " </div> </div> "
    }
    j += ' </div> <a class="goto" href="http://mindstore.io/" title="进入MindStore">进入MindStore</a>';
    return new String(j)
  });
  b("desktop-nav-preview", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.previewList,
      g = a.j,
      h = a.len2,
      i = c.$escape,
      j = "";
    j += '<div class="showbox"> ';
    for (var d = 0, e = f.length; d < e; d++) {
      j += ' <div class="item-group"> <div class="item-group-container"> ';
      for (var g = 0, h = f[d].length; g < h; g++) {
        j += " ";
        if (f[d][g].is_jiong) {
          j += ' <div class="item jiong"> <a href="';
          j += i(f[d][g].jiong_link);
          j += '" target="_blank" rel="canonical"> <img class="jiong-picture" src="';
          j += i(f[d][g].jiong_image);
          j += '" width="270" height="180" alt="appso banner"> </a> </div> '
        } else {
          j += ' <div class="item"> <a rel="canonical" href="';
          j += i(f[d][g].link);
          j += '"> <h3 class="title js-excerpt" data-clamp="2">';
          j += i(f[d][g].title);
          j += '</h3> <div class="content-container"> <div class="content"> <p class="excerpt js-excerpt" data-clamp="4">';
          j += i(f[d][g].excerpt);
          j += '</p> </div> <img src="';
          j += i(f[d][g].image);
          j += '" alt="';
          j += i(f[d][g].title);
          j += '"/> </div> <span class="meta"> <span class="author">';
          j += i(f[d][g].author);
          j += '</span> <span class="time">';
          j += i(f[d][g].pubDate);
          j += "</span> </span> </a> </div> "
        }
        j += " "
      }
      j += " </div> </div> "
    }
    j += " </div>";
    return new String(j)
  });
  b("desktop-nav-video", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.previewList,
      g = a.j,
      h = a.len2,
      i = c.$escape,
      j = "";
    j += '<div class="showbox nav-video"> ';
    for (var d = 0, e = f.length; d < e; d++) {
      j += ' <div class="item-group"> <div class="item-group-container"> ';
      for (var g = 0, h = f[d].length; g < h; g++) {
        j += ' <div class="item"> <a rel="canonical" href="';
        j += i(f[d][g].ifr_video_url);
        j += '" target="_blank"> <div class="content-container"> <i class="ifanr2015 ifanr2015-shipin"></i> <img class="img" src="';
        j += i(f[d][g].ifr_video_snapshot);
        j += '" alt="';
        j += i(f[d][g].title);
        j += '"/> <h3 class="title js-excerpt" data-clamp="2">';
        j += i(f[d][g].title);
        j += '</h3> </div> <span class="meta"> <span class="duration">时长:';
        j += i(f[d][g].ifr_video_duration);
        j += '</span> <span class="date js-date">';
        j += i(f[d][g].pubDate);
        j += "</span> </span> </a> </div> "
      }
      j += " </div> </div> "
    }
    j += " </div>";
    return new String(j)
  });
  b("desktop-prevnext-post", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.data,
      f = "";
    f += '<div class="pn-post-container"> <div class="pn next-post"> <div class="bg-img" style="background-image:url(\'';
    f += d(e.next.image);
    f += '!320\')"></div> <a href="';
    f += d(e.next.link);
    f += '" title="';
    f += d(e.prev.title);
    f += '"> <i class="ifanr2015 ifanr2015-shangyige"></i> <div class="title">';
    f += d(e.next.title);
    f += '</div> </a> </div> <div class="pn prev-post"> <div class="bg-img" style="background-image:url(\'';
    f += d(e.prev.image);
    f += '!320\')"></div> <a href="';
    f += d(e.prev.link);
    f += '" title="';
    f += d(e.prev.title);
    f += '"> <div class="title">';
    f += d(e.prev.title);
    f += '</div> <i class="ifanr2015 ifanr2015-xiayige"></i> </a> </div> </div>';
    return new String(f)
  });
  b("desktop-top-post", function(a, b) {
    var c = this,
      d = a.i,
      e = a.list,
      f = c.$escape,
      g = "";
    g += '<div class="title"> <i class="ifanr2015 ifanr2015-remen"></i> <h2>热门文章</h2> </div> <ul> ';
    for (d = 0; d < e.length; d++) {
      g += ' <li class="list"> <a ga-track="event" ga-action="click" ga-event-category="anchor" ga-event-label="TopNews" title="';
      g += f(e[d]["title"]);
      g += '" href="';
      g += f(e[d]["link"]);
      g += '" class="ifanr-top-posts-';
      g += f(d);
      g += '"> <div class="ifanr-top-posts-container"> <div class="ifanr-top-posts-cell number-cell"> <span class="ifanr-top-posts-comment">';
      g += f(d + 1);
      g += '</span> </div> <div class="ifanr-top-posts-cell"> <span class="ifanr-top-posts-title">';
      g += f(e[d]["title"]);
      g += "</span> </div> </div> </a> </li> "
    }
    g += " </ul>";
    return new String(g)
  });
  b("email-report", function(a, b) {
    var c = this,
      d = a.i,
      e = a.list,
      f = c.$escape,
      g = "";
    for (var d = 0; d < e.length; d++) {
      g += " ";
      g += f(e[d].key);
      g += ":<br /> ";
      g += f(e[d].value);
      g += "<br /><br /> "
    }
    return new String(g)
  });
  b("entry-item-dasheng", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.ID,
      f = a.link,
      g = a.needPreTitle,
      h = a.content,
      i = a.dasheng_author,
      j = "";
    j += ' <a id="post-';
    j += d(e);
    j += '" class="post dasheng entry-list clearfix" href="';
    j += d(f);
    j += '"> <i class="ifanr2015 ifanr2015-dasheng dasheng-bg"></i> <div class="entry-header"> ';
    if (g) {
      j += ' <span class="tag">大声</span> '
    }
    j += ' </div> <div class="entry-content clearfix"> <p>';
    j += d(h);
    j += '</p> </div> <div class="post-author">—— ';
    j += d(i);
    j += "</div> </a>";
    return new String(j)
  });
  b("entry-item-data", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.link,
      f = a.ID,
      g = a.pubDate,
      h = a.number,
      i = a.subfix,
      j = a.description,
      k = "";
    k += '<a href="';
    k += d(e);
    k += '" id="post-';
    k += d(f);
    k += '" class="entry-list clearfix"> <div class="entry-content"> <span class="widget-data-time">';
    k += d(g);
    k += '</span> <span class="widget-data-num num">';
    k += d(h);
    k += "</span> ";
    if (i) {
      k += ' <span class="widget-data-percent yahei">';
      k += d(i);
      k += "</span> "
    }
    k += ' <span class="widget-data-text">';
    k += d(j);
    k += "</span> </div> </a>";
    return new String(k)
  });
  b("entry-item", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.ID,
      f = a.link,
      g = a.needPreTitle,
      h = a.category,
      i = c.$relativetime,
      j = a.pubDate,
      k = a.comments,
      l = a.title,
      m = a.excerpt,
      n = a.thumb,
      o = a.image,
      p = "";
    p += ' <a id="post-';
    p += d(e);
    p += '" class="post entry-list clearfix" href="';
    p += d(f);
    p += '"> <div class="entry-content clearfix"> <div class="clearfix post-meta"> ';
    if (g) {
      p += ' <span class="tag">';
      p += d(h);
      p += '</span><span class="seperator">|</span> '
    }
    p += ' <div class="post-author">';
    p += i(j);
    p += '</div> <div class="entry-comment-number"> <i class="ifanr2015 ifanr2015-pinglun"></i> <span class="number">';
    p += d(k);
    p += '</span> </div> </div> <div class="entry-header"> <h1 class="entry-name yahei"> <span>';
    p += d(l);
    p += '</span> </h1> </div> <div class="summary"> <p>';
    p += d(m);
    p += '</p> </div> <div class="clearfix"> <div class="post-thumb"> <img src="';
    p += d(n ? n : o);
    p += '"> </div> </div> </div> <span class="post-separator"></span> </a>';
    return new String(p)
  });
  b("mobile-chatroom-message-left", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.sender,
      f = a.content,
      g = "";
    g += '<section class="chatroom-message-container chatroom-message-left-container"> <img src=\'';
    g += d(e.avatarUrl);
    g += '\' class="chatroom-message-avatar" /> <div class="chatroom-message-detail-left"> <div class="chatroom-message-username">';
    g += d(e.name);
    g += '</div> <div class="chatroom-message-box"> <div class="chatroom-message-triangle"></div> <div class="chatroom-message-content">';
    g += d(f);
    g += "</div> <div> </div> </section> ";
    return new String(g)
  });
  b("mobile-chatroom-message-right", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.messageId,
      f = a.sender,
      g = a.failed,
      h = a.processing,
      i = a.content,
      j = "";
    j += '<section class="chatroom-message-container chatroom-message-right-container js-message" id="';
    j += d(e);
    j += "\"> <img src='";
    j += d(f.avatarUrl);
    j += '\' class="chatroom-message-avatar" /> <div class="chatroom-message-box"> ';
    if (g) {
      j += ' <div class="chatroom-message-status chatroom-message-status img-status-failed js-resend"></div> '
    } else if (h) {
      j += ' <div class="chatroom-message-status chatroom-message-status img-status-processing"></div> '
    } else {
      j += ' <div class="chatroom-message-status"></div> '
    }
    j += ' <div class="chatroom-message-content">';
    j += d(i);
    j += '</div> <div class="chatroom-message-triangle"></div> </div> </section> ';
    return new String(j)
  });
  b("mobile-chatroom-messages-group", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.htmlId,
      f = a.time,
      g = a.i,
      h = a.messages,
      i = function(d, e) {
        e = e || a;
        var f = c.$include(d, e, b);
        j += f;
        return f
      },
      j = "";
    j += '<section class="chatroom-messages-group" id="';
    j += d(e);
    j += '"> <time class="chatroom-messages-group-time">';
    j += d(f);
    j += "</time> ";
    for (var g = 0; g < h.length; g++) {
      j += " ";
      if (h[g].left) {
        j += " ";
        i("./mobile-chatroom-message-left", h[g]);
        j += " "
      } else {
        j += " ";
        i("./mobile-chatroom-message-right", h[g]);
        j += " "
      }
      j += " "
    }
    j += " </section> ";
    return new String(j)
  });
  b("mobile-entry-recommend", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.relatedRes,
      g = c.$escape,
      h = "";
    for (var d = 0, e = f.length; d < e && d < 4; d++) {
      h += ' <div class="main-body"> <div class="image" style="background-image: url(';
      h += g(f[d].cover_img);
      h += ');"> </div> <div class="article"> <h3 class="article-title">';
      h += g(f[d].title);
      h += '</h3> <div class="article-footer">';
      h += g(f[d].author);
      h += "<span>|</span>";
      h += g(f[d].date);
      h += '</div> </div> <a ga-track="event" ga-action="RelatedArticle" ga-event-category="Domain" href="';
      h += g(f[d].link);
      h += '" class="article-link"></a> </div> '
    }
    h += " ";
    return new String(h)
  });
  b("mobile-entry-related", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.relatedRes,
      g = c.$escape,
      h = "";
    for (var d = 0, e = f.length; d < e; d++) {
      h += " ";
      if (f[d].post_type === "data") {
        h += ' <a href="http://www.ifanr.com/data/';
        h += g(f[d].objectID);
        h += '" class="related-item"> '
      } else {
        h += ' <a href="';
        h += g(f[d].link);
        h += '" class="related-item"> '
      }
      h += " ";
      if (f[d].number) {
        h += ' <div class="picture js-head-picture" style="background-image:url(\'http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/related-search-shudu.jpg\')"></div> '
      } else if (f[d].image !== "") {
        h += ' <div class="picture js-head-picture" style="background-image:url(\'';
        h += g(f[d].image);
        h += "')\"></div> "
      } else {
        h += ' <div class="picture js-head-picture" style="background-image:url(\'http://cdnzz.ifanr.com/wp-content/themes/ifanr-2.0/static/images/common/default-search-bg.jpg\')"></div> '
      }
      h += ' <div class="title"> <span class="tag"> ';
      if (f[d].category) {
        h += " ";
        h += g(f[d].category);
        h += " "
      } else if (f[d].number) {
        h += " 数字 "
      }
      h += " </span> <h2>";
      h += g(f[d].title);
      h += '</h2> <span class="decoration one"></span> <span class="decoration two"></span> </div> </a> '
    }
    h += " ";
    return new String(h)
  });
  b("mobile-index-appso", function(a, b) {
    var c = this,
      d = a.i,
      e = a.data,
      f = c.$escape,
      g = "";
    for (d = 0; d < e.length; d++) {
      g += ' <a id="post-';
      g += f(e[d]["id"]);
      g += '" class="post entry-appso entry-list clearfix" href="';
      g += f(e[d]["post_url"]);
      g += '"> <div class="entry-content clearfix"> <div class="clearfix"> <div class="post-thumb"> <img src="';
      g += f(e[d]["cover_image"]["url"]);
      g += '"> </div> ';
      if (e[d]["app_icon"] && e[d]["platforms"]) {
        g += ' <div class="app-meta"> <img class="app-icon" src="';
        g += f(e[d]["app_icon"]["url"]);
        g += '"> <div class="app-platforms">';
        g += f(e[d]["platforms"]);
        g += "</div> </div> "
      }
      g += ' </div> <div class="entry-header"> <h1 class="entry-name yahei"> <span>';
      g += f(e[d]["title"]);
      g += '</span> </h1> </div> </div> <span class="post-separator"></span> </a> '
    }
    return new String(g)
  });
  b("mobile-index-mindstore", function(a, b) {
    var c = this,
      d = a.i,
      e = a.data,
      f = c.$escape,
      g = c.$relativetime,
      h = "";
    for (d = 0; d < e.length; d++) {
      h += ' <a id="mindstore-';
      h += f(e[d]["id"]);
      h += '" class="entry-ms" href="';
      h += f(e[d]["post_url"]);
      h += '"> <h2>';
      h += f(e[d]["title"]);
      h += '</h2> <div class="ms-meta"> <div class="ms-voteup"> <i class="ifanr2015 ifanr2015-up"></i> ';
      h += f(e[d]["vote_count"]);
      h += ' </div> <div class="ms-comments"> <i class="ifanr2015 ifanr2015-pinglun"></i> ';
      h += f(e[d]["comment_count"]);
      h += ' </div> </div> <p class="ms-intro"> ';
      h += f(e[d]["tagline"]);
      h += ' </p> <div class="ms-poster"> <img class="avatar" src="';
      h += f(e[d]["created_by"]["avatar_url"]);
      h += '" alt=""/> <span class="nickname">';
      h += f(e[d]["created_by"]["nickname"]);
      h += '</span> <span class="date">';
      h += g(e[d]["created_at"]);
      h += "</span> </div> </a> "
    }
    return new String(h)
  });
  b("navbar-top-ad", function(a, b) {
    var c = this,
      d = c.$escape,
      e = a.data,
      f = "";
    f += '<a ga-track="event" ga-action="click" ga-event-category="navbar-top-jiong" ga-event-label="navbar-top-jiong" href="';
    f += d(e.jiong_link);
    f += '" class="live-container"> <div class="info"> <div class="title">';
    f += d(e.jiong_title);
    f += '</div> <div class="message js-excerpt" data-clamp="2">';
    f += d(e.jiong_description);
    f += '</div> </div> <img class="picture" src="';
    f += d(e.jiong_image);
    f += '" width="100" height="60" alt="';
    f += d(e.jiong_title);
    f += '"> </a>';
    return new String(f)
  });
  b("search/desk-list", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.searchList,
      g = c.$escape,
      h = c.$string,
      i = c.$substring,
      j = c.$strip_tags,
      k = "";
    k += " ";
    for (var d = 0, e = f.length; d < e; d++) {
      k += ' <li class="search-item row"> ';
      if (f[d].post_type === "data") {
        k += ' <a href="http://www.ifanr.com/data/';
        k += g(f[d].objectID);
        k += '"> '
      } else {
        k += ' <a href="';
        k += g(f[d].link);
        k += '" target="_blank" class="';
        if (f[d].image === "" || !f[d].image) {
          k += "non-cover"
        }
        k += '"> '
      }
      k += " ";
      if (!!f[d].image && f[d].image !== "") {
        k += ' <div class="result-cover" style="background-image:url(\'';
        k += g(f[d].image);
        k += "')\"></div> "
      } else if (f[d].post_type === "data") {
        k += ' <div class="result-cover" style="background-image:url(\'http://cdn.ifanr.cn/site-static/ifanr-2.0/dist/images/common/related-search-shudu.jpg\')"></div> '
      }
      k += ' <div class="result-content"> <h2 class="title">';
      k += h(f[d]._highlightResult.title.value);
      k += '</h2> <p class="excerpt js-excerpt">';
      k += g(i(j(f[d].content), 120));
      k += '</p> <span class="meta"> ';
      if (f[d].category && f[d].category !== "") {
        k += " ";
        k += g(f[d].category);
        k += " | "
      } else if (f[d].post_type === "data") {
        k += " 数读 | "
      }
      k += " ";
      if (f[d].post_type !== "data") {
        k += " ";
        k += g(f[d].author);
        k += " | "
      }
      k += " ";
      k += g(f[d].pubDate);
      k += "</span> </div> </a> </li> "
    }
    return new String(k)
  });
  b("search/mobile-list", function(a, b) {
    var c = this,
      d = a.i,
      e = a.len,
      f = a.searchList,
      g = c.$escape,
      h = c.$string,
      i = "";
    i += " ";
    for (var d = 0, e = f.length; d < e; d++) {
      i += ' <li class="search-item"> <a href="';
      i += g(f[d].link);
      i += '"> <div class="article-title"> ';
      i += h(f[d]._highlightResult.title.value);
      i += " </div> </a> </li> "
    }
    return new String(i)
  });
  b("search/search-desk-zone", '<div class="ifr-search-zone" id="ifr-search-zone" style="display:none"> <div class="ifr-search-zone-inner"> <div class="ifr-search-zone-container"> <div class="query-zone"> <input type="text" id="ifr-query-search" placeholder="搜索文章"> </div> <div class="loading" id="search-loading"> </div> <div class="search-title js-search-title hide">共搜索到 <span class="js-results-count"></span> 篇文章</div> <div class="search-ifr"> <ul class="search-list" id="search-list"></ul> <div class="load-more hide" id="search-load-more"> <button id="next-page">加载更多</button> </div> </div> </div> </div> </div>');
  b("search/search-zone", '<div class="ifr-search-zone" id="ifr-search-zone"> <div class="ifr-search-zone-container"> <div class="close-zone"> <span id="ifr-cancel-search"> <i class="ifanr2015 ifanr2015-guanbi"></i> </span> </div> <div class="query-zone"> <i class="ifanr2015 ifanr2015-search"></i> <input type="text" id="ifr-query-search"> </div> <div class="loading" id="loading"> </div> <div class="search-ifr"> <ul class="search-list" id="search-list"></ul> <div class="load-more hide" id="search-load-more"> <button id="next-page">加载更多</button> </div> </div> </div> </div>');
  if (typeof define === "function") {
    define(function() {
      return b
    })
  } else if (typeof exports !== "undefined") {
    module.exports = b
  } else {
    a.template = b
  }
}(this);
(function(a, b) {
  var c = {
    $wxShareTip: b("#weixin-share-tip"),
    $wxShareTipOverlay: b("#share-overlay"),
    init: function() {
      if (IFR.env.weixin) {
        c.$wxShareTip.addClass("weixin-browser");
        c.$wxShareTipOverlay.on("click", c.hideWxShareTip.bind(c))
      }
    },
    hideWxShareTip: function() {
      setTimeout(function() {
        c.$wxShareTip.addClass("hide").removeClass("download");
        c.$wxShareTipOverlay.addClass("hide")
      }, 300)
    },
    showWxShareTip: function(a) {
      setTimeout(function() {
        c.$wxShareTip.removeClass("hide").addClass("download");
        c.$wxShareTipOverlay.removeClass("hide");
        b(document).one("scroll", c.hideWxShareTip.bind(c))
      }, 300)
    }
  };
  var d = function() {};
  d.fn = d.prototype;
  d.fn.init = function(a) {
    this.postId = a.id;
    this.$articleContentsContainer = b('[cmpt-article-contents][data-post-id="' + this.postId + '"]');
    this.$commentsCount = this.$articleContentsContainer.find(".js-comments-count");
    this.$sharesWrapper = this.$articleContentsContainer.find(".js-ifanr-shares-wrapper");
    this.$sharesCount = this.$sharesWrapper.find(".js-shares-count");
    this.$shareBtns = this.$sharesWrapper.find(".js-share-buttons");
    this.$likeBtn = this.$articleContentsContainer.find(".js-ifanr-like");
    this.$likeAvatars = this.$articleContentsContainer.find(".js-like-avatars");
    this.likeAvatarsTmpl = "desktop-article-like-avatars";
    this.likeAvatarItemTmpl = '<img class="avatar-item" src="{{avatar}}" />';
    this.$jumpTos = this.$articleContentsContainer.find("[data-jump-to]");
    this.$appsoDls = this.$articleContentsContainer.find(".js-appso-dl");
    this.$appsoCards = this.$articleContentsContainer.find('[ifr-box="appso-card"]');
    if (window.AutoFixedWidget) {
      Object.create(AutoFixedWidget.fn).init("#article-wrapper", {
        fixedTopOffset: ns.globalHeaderHeight - 10,
        reachBottom: "hidden"
      }).render()
    }
    return this
  };
  d.fn.render = function() {
    var a = this;
    a.loadPostSnsInfo();
    a.bindEvents();
    if (!IFR.env.mobileiPad && IFR.env.mobile) {
      b(".js-main-singular p:has(img)").each(function(a, c) {
        var d = b(c);
        var e = d.find("img");
        if (e.attr("width") && e.attr("width") > 200) {
          d.addClass("picture-full-width")
        }
      });
      b(".js-main-singular p:has(iframe)").addClass("picture-full-width");
      b(".js-main-singular p:has(embed)").addClass("picture-full-width");
      var c = 0;
      var d = window.innerWidth > 0 ? window.innerWidth : screen.width;
      var e = d - c;
      a.$articleContentsContainer.find("iframe").each(f);
      a.$articleContentsContainer.find("embed").each(f);

      function f(a, c) {
        var d = b(c);
        var f = d.attr("width");
        var g = d.attr("height");
        var h = f / g;
        var i = e / h;
        d.attr("height", i).attr("width", e)
      }
    }
    if (!ns.wpPageNowIs("single-app")) {
      return
    }
    a.$appsoCards.each(function(a, c) {
      var d = b(c).find(".js-shots-wrapper");
      var e = d.find(".shot-item").length * 108;
      d.css({
        width: e
      })
    })
  };
  d.fn.loadPostSnsInfo = function() {
    var a = this;
    b.ajax({
      url: "https://sso.ifanr.com/api/wp/article/stats/" + a.postId + "/",
      method: "GET",
      contentType: "application/json",
      dataType: "json"
    }).success(a.renderSnsInfo.bind(a))
  };
  d.fn.updateSharesCount = function(a) {
    var c = this;
    var d = b(a.target);
    if (d.hasClass("js-shared")) {
      return true
    }
    d.addClass("js-shared");
    b.ajax({
      url: "https://sso.ifanr.com/api/wp/article/share/" + c.postId + "/",
      method: "put",
      contentType: "application/json",
      dataType: "json",
      data: "{}",
      xhrFields: {
        withCredentials: true
      }
    }).complete(function() {
      var a = c.$sharesCount.text();
      c.$sharesCount.html(parseInt(a, 10) + 1)
    });
    return true
  };
  d.fn.updateLikesCount = function() {
    var a = this;
    if (a.$likeBtn.hasClass("active")) {
      return
    }
    b.ajax({
      url: "https://sso.ifanr.com/api/wp/article/like/" + a.postId + "/",
      method: "put",
      contentType: "application/json",
      dataType: "json",
      data: "{}",
      xhrFields: {
        withCredentials: true
      }
    }).complete(function() {
      a.$likeBtn.addClass("active");
      a.$likeBtn.find(".js-like-hint").html("已点赞");
      a.$likeBtn.find(".ifanr2015").removeClass("ifanr2015-heart").addClass("ifanr2015-like");
      var c = a.$likeAvatarsCount.text();
      a.$likeAvatarsCount.text(parseInt(c, 10) + 1 + " 个人");
      if (!ns.currentUserAvatar) {
        return
      }
      var d = b(a.likeAvatarItemTmpl.replace("{{avatar}}", ns.currentUserAvatar));
      a.$likeAvatarsList.prepend(d);
      d.on("error", function() {
        b(this).attr("src", ns.defaultUserAvatar)
      })
    })
  };
  d.fn.renderSnsInfo = function(a) {
    var c = this;
    c.$sharesCount.html(a.share_count);
    this.$commentsCount.text(a.comment_count);
    c.$likeAvatars.append(template(c.likeAvatarsTmpl, a));
    c.$likeAvatarsCount = c.$likeAvatars.find(".js-avatars-count");
    c.$likeAvatarsList = c.$likeAvatars.find(".js-avatars-list");
    var d = b(".js-avatars-list .avatar-item");
    if (d.length > 0) {
      d.on("error", function() {
        b(this).attr("src", ns.defaultUserAvatar)
      })
    } else {
      var e = c.$likeAvatarsCount.text();
      e = parseInt(e, 10);
      if (e <= 10) return;
      var f = Math.ceil(Math.random() * 5);
      var g = c.likeAvatarItemTmpl.replace("{{avatar}}", ns.defaultUserAvatar);
      var h = "";
      for (var i = 0; i < f; i++) {
        h += g
      }
      c.$likeAvatarsList.prepend(h)
    }
  };
  d.fn.bindEvents = function() {
    var a = this;
    a.$shareBtns.on("click", a.updateSharesCount.bind(a));
    a.$sharesWrapper.find(".weixin").on("mouseenter", a.updateSharesCount.bind(a));
    a.$likeBtn.on("click", a.updateLikesCount.bind(a));
    a.$jumpTos.on("touchstart click", function() {
      b.ifr.smoothScrollTo(b(this).attr("href"), {
        offset: ns.globalHeaderHeight
      });
      return false
    });
    c.init();
    a.$appsoDls.on("click", function(a) {
      if (!IFR.env.weixin) {
        return true
      }
      a.preventDefault();
      c.showWxShareTip();
      return false
    })
  };
  a.DesktopArticleContents = d
})(window, jQuery);
$(function() {
  "use strict";
  window.requestAnimationFrame = window.requestAnimationFrame || function(a) {
    setTimeout(a, 100)
  };
  var a = {
    $searchBoxZone: null,
    $outerContainer: $("#outer-container"),
    searchIndex: null,
    limitSearch: 30,
    pageNumber: 0,
    pageTotalNumber: null,
    applicationID: "7TN0U2FL3Q",
    apiKey: "97d5967e87b92827fa8b040bcc4c8581",
    indexName: "prod_ifanrcom",
    searchQueryStr: null,
    $loading: null,
    appendSeachZone: function() {
      var b = template("search/search-zone", {});
      a.$outerContainer.append(b);
      a.$searchBoxZone = $("#ifr-search-zone");
      a.$loading = $("#loading");
      a.fixStyle()
    },
    fixStyle: function() {
      a.$searchBoxZone.find(".search-ifr").first().css({
        height: $(window).height() - 55 - 27 * 2
      })
    },
    bindEvent: function() {
      var b = 0,
        c = null;
      $(".js-search-button").on("touchstart", function() {
        window.ga("send", "event", "button", "search");
        b = -$("body").scrollTop();
        $("#ifr-search-zone").removeClass("state-close").transitionEnd(function() {
          $("#container").addClass("blurred")
        }, 500).addClass("state-open");
        $("#container").addClass("prevent-scrolled").css({
          top: b + "px"
        });
        IFR.Events.trigger("hide.global-navigator")
      });
      $("#ifr-query-search").on("input", function() {
        clearTimeout(c);
        c = setTimeout(function() {
          a.searchQueryStr = $("#ifr-query-search").val();
          a.searchResult(true)
        }, 500)
      });
      $("#ifr-cancel-search").on("touchstart", function() {
        window.requestAnimationFrame(function() {
          $("#container").removeClass("prevent-scrolled").attr("style", "").removeClass("blurred");
          $("body").animate({
            scrollTop: -b
          }, 0)
        });
        $("#ifr-search-zone").removeClass("state-open").addClass("state-close").transitionEnd(function() {
          $("#search-list").html("");
          $("#ifr-query-search").val("");
          a._hideLoadNextPageBtn()
        })
      });
      $("#next-page").on("touchstart", function() {
        a.loadNextPage()
      })
    },
    _getIndex: function() {
      var a = this;
      a.algolia = a.algolia || algoliasearch(a.applicationID, a.apiKey);
      a.searchIndex = a.searchIndex || a.algolia.initIndex(a.indexName);
      return a.searchIndex
    },
    searchResult: function(b) {
      var c = this,
        d = c._getIndex(),
        e = {
          hitsPerPage: c.limitSearch,
          page: c.pageNumber
        };
      c.$loading.show();
      d.search(a.searchQueryStr, e, function(a, d) {
        c._countPageTotal(d.nbPages);
        c.$loading.hide();
        var e = template("search/mobile-list", {
          searchList: d.hits
        });
        if (b) {
          $("#search-list").html(e)
        } else $("#search-list").append(e)
      })
    },
    _countPageTotal: function(a) {
      var b = this;
      b.pageTotalNumber = a;
      b._toggleLoadNextPageBtn()
    },
    _toggleLoadNextPageBtn: function() {
      var a = this;
      if (a.pageNumber >= a.pageTotalNumber - 1) {
        a._hideLoadNextPageBtn()
      } else $("#search-load-more").removeClass("hide")
    },
    _hideLoadNextPageBtn: function() {
      $("#search-load-more").addClass("hide")
    },
    loadNextPage: function() {
      var a = this;
      a.pageNumber++;
      if (a.pageNumber <= a.pageTotalNumber - 1) {
        a.searchResult(false)
      }
    }
  };
  a.appendSeachZone();
  a.bindEvent()
});
(function(a, b) {
  "use strict";
  var c = {};
  c.isInsideWx = IFR.env.weixin;
  c.$overlay = b("#share-overlay");
  c.$wxShareTip = b("#weixin-share-tip");
  c.generalWxShareHtml = '<div class="js-wxqrcode qrcode"></div>' + "<p>请通过微信扫码分享，或通过浏览器自带分享功能分享文章到微信。</p>";
  c.hideAllShareItems = function() {
    b(".js-share-article-options").addClass("hide");
    c.$wxShareTip.addClass("hide");
    c.$overlay.css({
      opacity: 0
    });
    setTimeout(function() {
      c.$overlay.addClass("hide").css({
        opacity: 1
      })
    }, 500)
  };
  c.initWxShareDom = function() {
    if (c.isInsideWx) {
      c.$wxShareTip.addClass("weixin-browser")
    } else {
      c.$wxShareTip.addClass("general-browser").append(b(c.generalWxShareHtml))
    }
  };
  c.generateQrCode = function(a) {
    b(".js-wxqrcode").empty().qrcode({
      width: 128,
      height: 128,
      text: a
    })
  };
  c.$overlay.on("touchstart", c.hideAllShareItems.bind(this));
  c.initWxShareDom();
  var d = function(a) {};
  d.fn = d.prototype;
  d.fn.bindEvents = function() {
    var a = this;
    a.$shareBtn.on("click", function() {
      c.$overlay.removeClass("hide");
      a.$shareItems.removeClass("hide");
      b(document).one("scroll", c.hideAllShareItems)
    });
    a.$share2WxBtn.on("click", function() {
      a.$shareItems.addClass("hide");
      if (!c.isInsideWx) {
        var d = b(this).data("post-url");
        c.generateQrCode(d)
      }
      c.$wxShareTip.removeClass("hide")
    })
  };
  d.fn.render = function() {
    var a = this;
    a.bindEvents();
    return a
  };
  d.fn.init = function(a) {
    this.postId = a.id;
    this.$shareBtn = b("[data-cmpt-article-shares][data-post-id=" + this.postId + "]");
    this.$shareItems = this.$shareBtn.find(".js-share-article-options");
    this.$share2WxBtn = this.$shareBtn.find(".js-share-to-weixin");
    return this
  };
  a.ArticleShareItemsComponent = d
})(window, jQuery);
(function(a, b) {
  "use strict";
  var c = function() {};
  c.prototype = new ArticleCommentsComponent;
  c.prototype.constructor = c;
  c.fn = c.prototype;
  c.fn.init = function(a) {
    ArticleCommentsComponent.fn.init.call(this, a);
    this.commentEntryTemplate = "comment-item";
    this.$btnClose = this.$commentsCmpt.find(".comments-container .js-btn-close");
    return this
  };
  c.fn.bindEvents = function() {
    var a = this;
    ArticleCommentsComponent.fn.bindEvents.call(a);
    IFR.Events.on("loaded.comments-list.article", function(b) {
      if (b.post_id !== a.postId) return;
      a.__commentsListHeight = a.$commentsListContainer.height()
    });
    a.$btnClose.on("touchstart", function() {
      a.$normalComments.$commentsCmpt.clsHide();
      b("#simple-header").show()
    })
  };
  c.fn.render = function() {
    var a = this;
    ArticleCommentsComponent.fn.render.call(a);
    return a
  };
  c.fn.generateCommentTree = function(a) {
    var c = this,
      d = template("comment-item", a);
    if (a.depth === 1) {
      c.$commentsList.append(d);
      return
    }
    var e;
    var f;
    if (a.depth === 2) {
      e = c.$commentsList.find(".js-comment-" + a.comment_parent);
      f = e.find(".comment-children");
      if (f.length) {
        f.addClass("comment-child-" + a.comment_id);
        f.append(d);
        return
      }
      f = b('<ul class="comment-children">');
      f.addClass("comment-child-" + a.comment_id);
      f.append(d);
      e.append(f);
      return
    }
    e = c.$commentsList.find(".comment-child-" + a.comment_parent);
    e.addClass("comment-child-" + a.comment_id);
    e.append(d)
  };
  a.MobileArticleCommentsComponent = c
})(window, jQuery);
(function(a, b, c) {
  var d = function() {};
  d.prototype = new c;
  d.prototype.constructor = d;
  d.fn = d.prototype;
  d.fn.init = function(a) {
    var d;
    c.fn.init.call(this, a);
    this.fetchAction = "get_mobile_comments";
    this.$commentsCmpt = b('[data-cmpt-hot-comments][data-post-id="' + this.postId + '"]');
    this.$commentsListContainer = this.$commentsCmpt.find(".js-comments-list-container");
    this.$commentsLoading = this.$commentsCmpt.find(".js-comments-loading");
    this.$btnNormalComments = this.$commentsCmpt.find(".js-btn-normal-comments");
    d = this.$commentsCmpt.parent();
    this.$counterContainer = d.find(".js-counter");
    this.$normalCounter = d.find(".js-normal-counter");
    this.$respondFormCmpt.init(this).render();
    return this
  };
  d.fn.register = function(a) {
    this.$normalComments = a
  };
  d.fn.bindEvents = function() {
    var a = this;
    c.fn.bindEvents.call(a);
    a.$btnNormalComments.on("click", function(c) {
      if (!a.$normalComments.isRendered) {
        a.$normalComments.render();
        a.$normalComments.$respondFormCmpt.init(a.$normalComments).render()
      }
      a.$normalComments.$commentsCmpt.clsShow();
      a.$normalComments.isRendered = true;
      b("#simple-header").hide()
    })
  };
  d.fn.appendComments = function(a) {
    var b = a.hots || [];
    var d = a.all || [];
    var e = b.length !== 0;
    var f = [];
    var g;
    if (d.length !== 0) {
      g = e ? b : d;
      f = g.slice(0, 5);
      this.$counterContainer.addClass(e ? "with-hot-list" : "with-normal-list");
      if (d.length >= 1) {
        this.$btnNormalComments.removeClass("hide")
      }
      if (!e) {
        this.$normalCounter.text(d.length)
      }
    }
    c.fn.appendComments.call(this, f)
  };
  a.MobileHotArticleCommentsComponent = d
})(window, jQuery, MobileArticleCommentsComponent);
(function(a, b) {
  var c = function() {};
  c.fn = c.prototype;
  c.fn.init = function(a) {
    this.postId = a.id;
    this.$articleContentsContainer = b('[cmpt-article-contents][data-post-id="' + this.postId + '"]');
    this.$tool = b('[data-cmpt-sns-tool][data-post-id="' + this.postId + '"]');
    this.$btnComment = this.$tool.find(".js-btn-comment");
    this.$commentsCount = this.$articleContentsContainer.find(".js-comments-count");
    this.$btnShare = this.$tool.find(".js-btn-share");
    this.$btnLike = this.$tool.find(".js-btn-like");
    this.$likeCount = this.$tool.find(".js-like-hint");
    this.$shareCount = this.$tool.find(".js-share-count");
    this.$shareItems = this.$tool.find(".js-share-item");
    this.$commentPostZone = b('.js-comment-post-zone[data-post-id="' + this.postId + '"]');
    this.$window = b(window);
    this.$articleContent = b("#post-" + this.postId);
    this.__articleContentOffsetY = this.$articleContent.offset().top;
    this.$likeAvatarsContainer = b(this.$tool.data("likes-container"));
    this.$likeAvatarsCount = this.$likeAvatarsContainer.find(".js-like-hint");
    this.$likeAvatarsList = this.$likeAvatarsContainer.find(".js-person-avatars-list");
    this.likeAvatarItemTmpl = '<div class="avatar-item"><img src="{{avatar}}" /></div>';
    this.isPendingLike = false;
    this.visibleState = false;
    this.oldVisibleState = false;
    return this
  };
  c.fn.render = function() {
    var a = this;
    a.bindEvents();
    a.loadSnsInfo();
    return a
  };
  c.fn.loadSnsInfo = function() {
    var a = this;
    a.isPendingLike = true;
    b.ajax({
      url: IFR.apiUrl.SSO_API + "wp/article/stats/" + a.postId + "/",
      method: "GET",
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
      dataType: "json"
    }).success(function(b) {
      a.$likeAvatarsContainer.removeClass("hide");
      a.$shareCount.html(b.share_count);
      a.$likeAvatarsCount.html(b.like_count);
      a.$likeCount.html(b.like_count);
      if (b.liked) {
        a.$btnLike.addClass("active")
      }
      a.$commentsCount.text(b.comment_count);
      var c = b.like_avatar;
      for (var d = 0, e = c.length; d < e; d++) {
        a.$likeAvatarsList.append(a.likeAvatarItemTmpl.replace("{{avatar}}", c[d]))
      }
      a.isPendingLike = false
    })
  };
  c.fn.bindEvents = function() {
    var a = this;
    a.$tool.on("touchstart", function() {
      var a = b("#weixin-share-tip");
      a.removeClass("download").addClass("hide")
    });
    a.$btnComment.on("click", a.onCommentBtnClick.bind(a));
    a.$btnShare.on("click", a.onShareBtnClick.bind(a));
    a.$btnLike.on("click", a.onLikeBtnClick.bind(a));
    a.$window.on("scroll", a.onArticleMoved.bind(a));
    a.$shareItems.on("click", a.updateSharesCount.bind(a))
  };
  c.fn.updateSharesCount = function(a) {
    var c = this;
    var d = b(a.target);
    var e = c.postId;
    if (d.hasClass("js-shared")) {
      return true
    }
    d.addClass("js-shared");
    userActivityCollection.collectUserBehavior({
      post_id: e,
      behavior: userActivityCollection.behavior.share
    });
    b.ajax({
      url: IFR.apiUrl.SSO_API + "wp/article/share/" + e + "/",
      method: "put",
      contentType: "application/json",
      dataType: "json",
      data: "{}",
      xhrFields: {
        withCredentials: true
      }
    }).complete(function() {
      var a = c.$shareCount.text();
      c.$shareCount.html(parseInt(a, 10) + 1)
    });
    return true
  };
  c.fn.onCommentBtnClick = function(a) {
    var c = this;
    b.ifr.smoothScrollTo(c.$commentPostZone);
    return true
  };
  c.fn.onShareBtnClick = function(a) {
    var b = this;
    return true
  };
  c.fn.onLikeBtnClick = function(a) {
    if (this.$btnLike.hasClass("active")) {
      this.updateLike("delete", this.postId, this.cancelLike.bind(this))
    } else {
      this.updateLike("post", this.postId, this.addLike.bind(this))
    }
  };
  c.fn.cancelLike = function() {
    this.$btnLike.removeClass("active");
    var a = this.$likeAvatarsCount.text();
    var b = parseInt(a, 10) - 1;
    this.$likeCount.text(b);
    this.$likeAvatarsCount.text(b);
    this.isPendingLike = false
  };
  c.fn.addLike = function() {
    userActivityCollection.collectUserBehavior({
      post_id: this.postId,
      behavior: userActivityCollection.behavior.like
    });
    this.$btnLike.addClass("active");
    var a = this.$likeAvatarsCount.text();
    var b = parseInt(a, 10) + 1;
    this.$likeCount.text(b);
    this.$likeAvatarsCount.text(b);
    if (ns.currentUserAvatar) {
      this.$likeAvatarsList.prepend(this.likeAvatarItemTmpl.replace("{{avatar}}", ns.currentUserAvatar))
    }
    this.isPendingLike = false
  };
  c.fn.updateLike = function(a, c, d) {
    var e = this;
    if (!e.isPendingLike) {
      this.isPendingLike = true;
      b.ajax({
        url: "https://sso.ifanr.com/api/wp/article/like/" + c + "/",
        method: a,
        contentType: "application/json",
        dataType: "json",
        data: "{}",
        xhrFields: {
          withCredentials: true
        }
      }).complete(function() {
        d()
      })
    }
  };
  c.fn.onArticleMoved = function(a) {
    var c = this,
      d, e;
    d = b(a.target).scrollTop();
    e = d <= c.$commentPostZone.offset().top && d >= c.__articleContentOffsetY;
    c.visibleState = e;
    setTimeout(function() {
      c.$tool[e ? "clsShow" : "clsHide"]()
    }, 0);
    if (c.visibleState !== c.oldVisibleState) {
      IFR.Events.trigger("weixin.sdk.share");
      c.oldVisibleState = c.visibleState;
      IFR.Events.trigger("ifanr.snstoolbar.state-change", c.visibleState)
    }
  };

  function d(a, c) {
    var d;
    this.options = c || {};
    this.$popup = b('[popup="' + a + '"]');
    this.$popup.addClass("popup-shown");
    this.$close = this.$popup.find(".js-close");
    this.$downloadLink = this.$popup.find(".js-download-link");
    if (IFR.env.weixin) {
      d = this.$downloadLink.data("weixin")
    } else if (IFR.env.android) {
      d = this.$downloadLink.data("android")
    }
    if (d) {
      this.$downloadLink.attr("href", d)
    }
    this.bindEvents()
  }
  d.prototype.bindEvents = function() {
    var a = this;
    if (a.options.transition) {
      a.$popup.addClass("popup-top");
      IFR.Events.on("ifanr.snstoolbar.state-change", function(b) {
        if (b) {
          a.$popup.addClass("popup-top")
        } else {
          a.$popup.removeClass("popup-top")
        }
      })
    }
    a.$close.on("click", function() {
      b.cookie("isAppDownloadTipHide", true, {
        expires: 7,
        path: "/"
      });
      a.$popup.hide()
    })
  };
  a.SnsToolComponent = c;
  a.PopUp = d
})(window, jQuery);
(function(a, b) {
  if (!ns.wpPageNowIs("single") || ns.wpPageNowIs("single-special")) return;
  var c = 420;
  var d = a(window),
    e = a("#page-content"),
    f = a("#content"),
    g = d.height(),
    h = false;
  a(".js-main-singular p:has(img)").addClass("picture-full-width");
  d.on("scroll", function() {
    i() ? j() : null
  });

  function i() {
    if (h) return false;
    var a = e[0].scrollHeight,
      b = d.scrollTop(),
      f = a - b - g;
    return f <= c
  }

  function j() {
    window.ga("send", "event", "function", "LoadNextArticle");
    h = true;
    var c = a(".js-last-post");
    var d = c.data("next-post");
    var e = d.replace(/^http:/, location.protocol);
    var g = c.find(".js-next-loading");
    a.ajax({
      url: e,
      method: "get",
      data: {
        pajax: 1
      }
    }).success(function(e) {
      var i, j, k;
      c.removeClass("js-last-post");
      i = a(e);
      i.appendTo(f);
      c = f.find(".js-last-post");
      j = c.data("post-id");
      k = c.data("post-tag");
      (new ArticleShareItemsComponent).init({
        id: j
      }).render();
      (new SnsToolComponent).init({
        id: j
      }).render();
      (new MobileHotArticleCommentsComponent).init({
        id: j
      }).render().register((new MobileArticleCommentsComponent).init({
        id: j
      }));
      Object.create(DesktopArticleContents.fn).init({
        id: j
      }).render();
      g.hide();
      a(".js-main-singular p:has(img)").addClass("picture-full-width");
      h = false;
      userActivityCollection.collectUserBehavior({
        post_id: j,
        behavior: userActivityCollection.behavior.read
      });
      b("send", "pageview", {
        page: d.replace(/http[s]?:\/\/[www\.]*ifanr.com(\/.*)/g, "$1"),
        title: "Content Page -- Ajax Load"
      });
      if (IFR.env.weixin) {
        a(".login-weixin").removeClass("hide")
      }
    })
  }
})(jQuery, ga);
(function(a, b) {
  var c = function() {};
  c.fn = c.prototype;
  c.fn.fetch = function(a, c) {
    var d = this;
    var e = b.extend({
      dataType: "jsonp",
      crossDomain: true,
      method: "get"
    }, d.ajaxConfig);
    var f = d.ajaxConfig.data.limit ? d.ajaxConfig.data.limit : 0;
    b.ajax(e).success(function(b) {
      b.objects.splice(f, b.objects.length);
      a(b.objects)
    }).error(c)
  };
  c.fn.render = function() {
    var a = this;
    a.fetch(a.appendContents.bind(a), function() {})
  };
  c.fn.appendContents = function(a) {
    var c = this,
      d;
    d = template(c.template, {
      data: c.parseData(a)
    });
    c.$articlesList.append(b(d));
    c.$loading.remove()
  };
  c.fn.parseData = function(a) {
    var b = null;
    a.forEach(function(a) {
      b = a.title.match(/(#.*)/g);
      a.platforms = b ? b[0] : null;
      a.post_url = "http://www.ifanr.com/app/" + a.id
    });
    return a
  };
  c.fn.init = function() {
    this.template = "mobile-index-appso";
    this.$articlesList = b("#appso-articles-list");
    this.$loading = this.$articlesList.find(".js-loading");
    this.ajaxConfig = {
      url: "https://socialbase.cn/api/v1.1/appso/article",
      data: {
        limit: 5
      }
    };
    return this
  };
  a.IndexAppSoArticlesList = c
})(window, jQuery);
(function(a, b) {
  var c = function() {};
  c.prototype = new IndexAppSoArticlesList;
  c.prototype.constructor = c;
  c.fn = c.prototype;
  c.fn.parseData = function(a) {
    a.forEach(function(a) {
      a.post_url = "http://mindstore.io/mind/" + a.id + "/"
    });
    return a
  };
  c.fn.appendContents = function(a) {
    var b = this;
    IndexAppSoArticlesList.fn.appendContents.call(b, a);
    b.$slider = Swipe(b.$sliderWrapper[0], {
      auto: 2500,
      callback: function() {
        var a = b.$slider.getPos();
        b.$navDots.children().removeClass("active").eq(a).addClass("active")
      }
    });
    var c = b.$slider.getNumSlides();
    b.$navDots.append('<li class="active">');
    for (var d = 1; d < c; d++) {
      b.$navDots.append("<li>")
    }
  };
  c.fn.init = function() {
    IndexAppSoArticlesList.fn.init.call(this);
    this.template = "mobile-index-mindstore";
    this.$articlesContainer = b("#mindstore-container");
    this.$articlesList = this.$articlesContainer.find("#mindstore-articles-list");
    this.$sliderWrapper = this.$articlesContainer.find("#mindstore-wrapper");
    this.$loading = this.$articlesList.find(".js-loading");
    this.ajaxConfig = {
      url: "https://sso.ifanr.com/api/v1.2/mind/",
      dataType: "json",
      data: {
        limit: 5
      }
    };
    this.$navDots = this.$articlesContainer.find(".js-nav-dots");
    return this
  };
  a.IndexMindStoreArticlesList = c
})(window, jQuery);
(function(a, b) {
  $indexSliderJiong = b('.js-index-slider-jiong[ga-track="event"]');
  c($indexSliderJiong);
  $indexCardJiong = b(document).find('.js-index-card-jiong[ga-track="event"]');
  c($indexCardJiong);
  $postBottomJiong = b('.js-post-bottom-jiong[ga-track="event"]');
  c($postBottomJiong);

  function c(c) {
    if (c.length) {
      b.each(c, function(b) {
        $el = c.eq(b);
        a.ga("send", "event", "AD_display", $el.attr("ga-action"), $el.attr("ga-event-label"), {
          nonInteraction: true
        })
      })
    }
  }
})(window, jQuery);
(function(a) {
  "use strict";
  var b;
  var c;
  var d;
  if (!ns.wpPageNowIs("home")) {
    return
  }
  a(".js-unslider [data-clamp] p").each(function() {
    var b = a(this).data("clamp");
    $clamp(this, {
      clamp: b,
      useNativeClamp: false
    })
  });
  b = a(".js-dots").find(".dot");
  d = Swipe(a(".js-unslider").get(0), {
    callback: function(a, c) {
      b.removeClass("active").eq(a).addClass("active")
    }
  });

  function e() {
    clearInterval(c);
    c = setInterval(function() {
      d.next()
    }, 5e3)
  }
  a(".swipe-wrap").on("touchstart", function() {
    clearInterval(c)
  }).on("touchend", function() {
    e()
  });
  b.on("click", function() {
    var b = a(this).data("index");
    d.slide(b, 0);
    e()
  });
  e()
})(jQuery);
(function(a, b, c) {
  var d = "https://yellowstone.ifanr.com/v1/";
  var e = true;
  var f;
  var g = function() {
    this.behavior = {
      read: "read",
      like: "like",
      share: "share",
      comment: "comment",
      vote: "vote"
    }
  };
  g.prototype.initSessionKey = function() {
    var a = new c;
    var d = a.hash({
      length: 32
    });
    b.cookie("session_key", d, 30);
    this.collectUserInfo()
  };
  g.prototype.collectUserInfo = function() {
    if (!e) {
      return true
    }
    var a = {
      session_key: b.cookie("session_key"),
      user_agent: navigator.userAgent,
      language: navigator.language
    };
    var c = {
      url: d + "user/",
      method: "post",
      contentType: "application/json",
      dataType: "json",
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(a)
    };
    b.ajax(c)
  };
  g.prototype.collectUserBehavior = function(a) {
    if (!e) {
      return true
    }
    var c = b.cookie("session_key");
    if (!c) {
      this.initSessionKey();
      c = b.cookie("session_key")
    }
    var a = {
      session_key: c,
      post_id: a.post_id,
      behavior: a.behavior
    };
    var f = {
      url: d + "behavior/",
      method: "post",
      contentType: "application/json",
      dataType: "json",
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(a)
    };
    b.ajax(f)
  };

  function h() {
    if (f === undefined) {
      f = new g
    }
    return f
  }
  a.userActivityCollection = h()
})(window, jQuery, Chance);
(function(a, b) {
  if (a.cookie("uid")) {
    ns.prepareCommenterInfo()
  } else {
    ns.unauthorized()
  }(new NavigatorComponent).init();
  if (ns.wpPageNowIs("home")) {
    (new IndexMindStoreArticlesList).init().render()
  }
  if (ns.wpPageNowIs("single")) {
    userActivityCollection.collectUserBehavior({
      post_id: IFR.postId,
      behavior: userActivityCollection.behavior.read
    })
  }
  if (a("#ifr-page-our-team").length > 0) {
    new window.AboutTeam({
      isMobile: true
    })
  }
  if (a(".ifanr-report").length) {
    new window.IfanrReport(".ifanr-report")
  }
  if (!a.cookie("isAppDownloadTipHide") && !IFR.env.safariMobile) {
    if (IFR.env.ios && ns.wpPageNowIs("single-app")) {
      new PopUp("appso", {
        transition: ns.wpPageNowIs("single")
      })
    }
    if (IFR.env.android && ns.wpPageNowIs("single-app")) {
      new PopUp("appso-android", {
        transition: ns.wpPageNowIs("single")
      })
    } else {
      new PopUp("ifanr", {
        transition: ns.wpPageNowIs("single")
      })
    }
  }
  if (IFR.env.safariMobile && ns.wpPageNowIs("single-app")) {
    a('meta[name="apple-itunes-app"]').attr("content", "app-id=966457637")
  }
  a("a[href*='http://']:not([href*='" + location.hostname + "']),[href*='https://']:not([href*='" + location.hostname + "']),a[rel='external'],a[rel='external nofollow']").attr("target", "_blank");
  a("#sso-login").removeAttr("target");
  a("#sso-register").removeAttr("target");
  a("a#share-toggle").on(ns.touchStartOrClick, function(b) {
    a("#share-links").opacityToggle(330);
    b.PreventDefault()
  });
  a("#action-buttons a, .comment-buttons a, a#cancel-comment-reply-link, a.com-toggle").on(ns.touchStartOrClick, function() {
    a(this).addClass("active")
  }).on(ns.touchEndOrClick, function() {
    a(this).removeClass("active")
  });
  a("#email a").on(ns.touchStartOrClick, function() {
    a("a#share-toggle").click();
    return true
  });
  a(".JS_share_buttons").on(ns.touchStartOrClick, function() {
    var b = a(this).attr("data-share");
    if (!b) return false;
    var c = {};
    c._topic = "爱范儿";
    IFR.share(b, c)
  });
  a(".content img, .content .wp-caption").each(function() {
    if (!a(this).hasClass("aligncenter") && a(this).width() > 105) {
      a(this).addClass("aligncenter")
    }
  });
  if (a(b).width() >= 480) {
    a("body").addClass("landscape")
  } else {
    a("body").addClass("portrait")
  }
  b.onorientationchange = function() {
    var c = b.orientation;
    switch (c) {
      case 90:
      case -90:
        a("body").addClass("landscape").removeClass("portrait");
        break;
      case 0:
      case 180:
        break;
      default:
        a("body").addClass("portrait").removeClass("landscape");
        break
    }
  };
  if (a("body").hasClass("home") || a("body").hasClass("archive") || a("body").hasClass("search")) {
    ns.initLoadMoreEntries()
  }
  if (a("body").hasClass("single")) {
    Object.create(SnsToolComponent.fn).init({
      id: IFR.postId
    }).render();
    Object.create(MobileHotArticleCommentsComponent.fn).init({
      id: IFR.postId
    }).render().register(Object.create(MobileArticleCommentsComponent.fn).init({
      id: IFR.postId
    }));
    Object.create(ArticleShareItemsComponent.fn).init({
      id: IFR.postId
    }).render()
  }
  if (ns.wpPageNowIs("single")) {
    a(".js-jump-to-comments").on("click", function() {
      a("html,body").animate({
        scrollTop: a("#comments-box").offset().top - ns.globalHeaderHeight
      }, {
        queue: !1,
        duration: 800,
        easing: "easeInOutExpo"
      });
      IFR.util.stopDefault()
    });
    if (IFR.env.weixin) {
      a(".login-weixin").removeClass("hide")
    }
  }
  if (a("body").hasClass("post-type-archive-weixin")) {
    a("#JS_show_weixin_dongtai").click(function() {
      var b = a(this).find("span");
      b.text(b.text() == "-" ? "+" : "-");
      a("#JS_weixin_dongtai").toggleClass("hide");
      return false
    })
  }
  a(document).ready(function() {
    a("#J_BackTop").on(ns.touchStartOrClick, function() {
      a.ifr.scrollTo("html", 750);
      return false
    });
    a(".middle-link").on(ns.touchStartOrClick, function() {
      a("body").animate({
        scrollTop: a(".nav-bottom").offset().top
      }, 750);
      return false
    })
  });
  if (ns.wpPageNowIs("home")) {
    a("#top-news").css({
      height: a(window).height()
    })
  }
  if (a(".js-tuji-sliders").length) {
    a(".js-tuji-sliders").tuji()
  }
  a("html").addClass("auto-height")
})(jQuery, window);
$(document).ready(function() {
  var a = $("#nav-user-subs"),
    b = $("#nav-user"),
    c = $("#nav-user-button");
  c.on("click", function() {
    b.toggleClass("state-open");
    a.toggleClass("hide");
    $(this).toggleClass("nav-user-zone-open nav-user-zone-closed")
  });
  $(".gallery-item").on("click", "a", function(a) {
    a.preventDefault();
    if ($(this).find("img").length) {
      var b = $(this).find("img").eq(0).attr("src");
      if (b.indexOf("http:") === -1 && b.indexOf("https:") === -1) {
        b = location.protocol + b
      }
      location.href = b
    }
  })
});
(function(a, b) {
  var c = b("#mc-embedded-subscribe-form");
  var d = c.find('input[type="email"]');
  var e = c.find(".js-animate");
  d.on("focus", function() {
    e.addClass("slide2left")
  }).on("blur", function() {
    e.removeClass("slide2left")
  })
})(window, jQuery);
(function(a, b) {
  "use strict";
  var c = function() {};
  c.fn = c.prototype;
  c.fn.hide = function() {
    b(".chatroom-indicator").addClass("chatroom-hide")
  };
  a.ChatRoomIndicator = c
})(window, jQuery);
(function(a, b, c, d, e, f) {
  "use strict";
  var g = "mobile-chatroom-messages-group";
  var h = "mobile-chatroom-message-right";
  var i = "mobile-chatroom-message-left";
  var j = "刚刚";
  var k = " 分钟前";
  var l = "hh:mm A";
  var m = "[昨天] hh:mm A";
  var n = "M[月] D[日] hh:mm A";
  var o = "YYYY[年] M[月] D[日] hh:mm A";
  var p = "YYYY[年] M[月] D[日] hh:mm A";
  var q = 120;
  var r = 15 * 60;
  var s = function() {};
  s.prototype = new e;
  s.prototype.constructor = s();
  s.fn = s.prototype;
  e.fn.beforeGroup = function(a, b) {
    var c = this;
    var d = a ? [a] : [];
    var e;
    var g;
    var h;
    var i;
    var j;
    var k = b[b.length - 1];
    h = k.sentAt;
    i = c.getGroupTimeString(h);
    g = new f(i, []);
    d.splice(0, 0, g);
    for (j = b.length - 1; j >= 0; j--) {
      e = b[j];
      if (u(e, g)) {
        g.messages.splice(0, 0, e)
      } else {
        g.time = c.getGroupTimeString(h);
        g = new f("", [e]);
        d.splice(0, 0, g)
      }
      h = e.sentAt
    }
    g.time = c.getGroupTimeString(h);
    return d
  };
  s.fn.getTemplateConfigs = function() {
    return {
      messageGroup: g,
      messageRight: h,
      messageLeft: i
    }
  };
  s.fn.getGroupTimeString = function(a) {
    var b;
    var e;
    var f = c();
    var g = c(a);
    if (Math.abs(g.diff(f, "seconds")) < 60) {
      b = j
    } else if ((e = Math.abs(g.diff(f, "minutes"))) < 5) {
      b = e + k
    } else if (d.checkIsToday(a)) {
      b = g.format(l)
    } else if (d.checkIsYesterday(a)) {
      b = g.format(m)
    } else if (d.checkThisYear(a)) {
      b = g.format(n)
    } else {
      b = g.format(o)
    }
    return b
  };
  s.fn.getMessageTimeString = function(a) {
    return c(a).format(p)
  };

  function t(a, b) {
    return Math.abs(c(a).diff(c(b), "seconds"))
  }

  function u(a, b) {
    var c;
    var d;
    if (b.messages.length === 0) {
      return true
    }
    d = b.messages[0];
    c = t(a.sentAt, d.sentAt);
    return c < q && c < r
  }
  a.ChatRoomMobileDisplayArea = s
})(window, jQuery, moment, window.ChatRoomUtils, window.ChatRoomDisplayArea, window.MessageGroup);
(function(a, b, c) {
  "use strict";
  var d = navigator.platform === "iPhone";
  var e = function() {};
  e.fn = e.prototype;
  e.$inputbox = null;
  e.$textarea = null;
  e.isEditing = false;
  e.fn.init = function(a, e) {
    var f = this;
    var g;
    var h;
    f.$inputbox = b(".chatroom-inputbox");
    f.$textarea = b(".chatroom-inputbox .auto-expand-textarea");
    g = f.$inputbox;
    h = f.$textarea;
    h.on("keyup", function(c) {
      var d = b(this)[0];
      var e = d.value;
      if (c.which === 13 && e.length >= 1) {
        a(e);
        d.value = "";
        b(this).keyup()
      }
    });
    h.on("keydown", function(a) {
      if (a.which === 13) {
        return false
      }
    });
    h.on("focus", function() {
      if (d) {
        b(".js-ios-keyboard-gap-fixer").addClass("chatroom-inputbox-ios");
        b(".chatroom-display-area").on("touchstart", function() {
          f.quitWrite()
        })
      }
      f.isEditing = true;
      e()
    });
    h.on("blur", function() {
      if (d) {
        b(".js-ios-keyboard-gap-fixer").removeClass("chatroom-inputbox-ios");
        b(".chatroom-display-area").off("touchstart")
      }
      f.isEditing = false
    });
    if (d) {
      h.on("touchstart", function(a) {
        var c = b(a.target);
        if (!c.hasClass("auto-expand-textarea")) {
          a.preventDefault()
        }
        this.allowUp = this.scrollTop > 0;
        this.allowDown = this.scrollTop < this.scrollHeight - this.clientHeight;
        this.prevTop = null;
        this.prevBot = null;
        this.lastY = a.originalEvent.pageY
      });
      h.on("touchmove", function(a) {
        var b = a.originalEvent.pageY;
        var c = b > this.lastY,
          d = !c;
        this.lastY = b;
        if (c && this.allowUp || d && this.allowDown) {
          a.stopPropagation()
        } else {
          a.preventDefault()
        }
      })
    }(new c).init()
  };
  e.fn.quitWrite = function() {
    if (this.isEditing) {
      b(".auto-expand-textarea").blur()
    }
  };
  a.ChatRoomInputBox = e
})(window, jQuery, window.AutoExpandTextarea);
(function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
  "use strict";
  var n = function() {};
  n.prototype = new f;
  n.prototype.constructor = n;
  n.fn = n.prototype;
  n.fn.init = function(a) {
    var b = this;
    b.indicator = new m;
    b.messages = [];
    b.userInfo = a;
    b.lateInit()
  };
  n.fn.lateInit = function() {
    var a = this;
    a.notification = new k;
    a.notification.init();
    a.inputBox = new h;
    a.inputBox.init(a.submitMessage.bind(a), a.writeMessage.bind(a));
    a.displayArea = new i;
    a.displayArea.init(a.messages, a.userInfo, a.resendMessage.bind(a));
    a.loadmore = new j;
    a.loadmore.init(a.LoadMoreHistory.bind(a));
    a.initChatRoom()
  };
  n.fn.onChatRoomSetup = function() {
    this.indicator.hide()
  };
  a.ChatRoomMobileMain = n
})(window, jQuery, RealTime, RSVP, window.UriParser, window.ChatRoomMain, window.ChatRoomUtils, window.ChatRoomInputBox, window.ChatRoomMobileDisplayArea, window.ChatRoomLoadMore, window.ChatRoomNotification, window.ChatRoomUser, window.ChatRoomIndicator);
(function(a, b, c, d) {
  "use strict";
  if (ns.chatroomId) {
    IFR.Events.on("ifr.ssouser.initialized", function(a) {
      var c = new d;
      var e = new b;
      c.loadUserToken(a).then(function(b) {
        a.id = String(a.id);
        e.init(b)
      }).catch(function() {})
    });
    IFR.Events.on("ifr.ssouser.unauthorized", function() {
      var a = new c(window.location.href);
      var b = ns.SSO_URL_LOGIN + "?next=" + a.protocolHostPath;
      window.location = b
    })
  } else {}
})(window, window.ChatRoomMobileMain, window.UriParser, window.ChatRoomUser);
(function(a, b) {
  var c = "cRimfanErTon";
  var d = IFR.util.random(12);
  var e = {
    indexSlider: {
      width: 720,
      height: 640,
      unit: {
        2: "EBgs07J3xwwX",
        4: "jTeNoKbgfJ0P",
        6: "C92JmGT6QAei"
      }
    },
    indexArticle: {
      width: 720,
      height: 220,
      unit: {
        1: "C6sajlrSIRMG",
        2: "BPOmxCWxHj5t",
        3: "v3vunpgKZ1Nz",
        4: "k6tLKUf9TxuY",
        5: "YKbjuCIJl7Ty",
        6: "5YwFdAfln16s",
        7: "B47VojIChczc",
        8: "0NyedqOKHdks",
        9: "RiicPqqnohtU",
        10: "xl1GNMqOC2iy"
      }
    },
    articleBanner: {
      width: 720,
      height: 220,
      unit: {
        1: "U5mcPu501qBk"
      }
    }
  };
  var f = function(a) {
    var e = {};
    var f = (new Date).getTime();
    e.bid = md5(c + a + f);
    e.unit = a;
    e.uid = b.cookie("session_key");
    e.ts = f;
    e.api_version = "1.1";
    e.show_id = d;
    return e
  };
  var g = function(a) {
    var b = "";
    Object.keys(a).forEach(function(c, d) {
      if (d === 0) {
        b += c + "=" + a[c]
      } else {
        b += "&" + c + "=" + a[c]
      }
    });
    return b
  };
  var h = function(a, c) {
    Object.keys(a.unit).forEach(function(d) {
      var h = a.unit[d];
      var l = f(h);
      l.width = e.indexSlider.width;
      l.height = e.indexSlider.height;
      var m = g(l);
      b.ajax({
        url: "https://r.inad.com/api/?" + m,
        dataType: "jsonp"
      }).success(function(a) {
        if (a.code === 1 && a.count > 0) {
          if (a.ad.mon_links) {
            b.ajax({
              url: a.ad.mon_links
            })
          }
          if (c === "indexSlider") {
            i(a, d)
          } else if (c === "indexArticle") {
            j(a, d)
          } else if (c === "articleBanner") {
            k(a, d)
          }
        }
      })
    })
  };
  var i = function(a, c) {
    var d = parseInt(c) - 1;
    var e = b(".swipe-wrap .news-item").eq(d);
    var f = "url(" + a.ad.img + ")";
    e.css("background-image", f);
    if (a.ad.adtype === 1) {
      e.find(".news-item-content").remove()
    } else {
      e.find(".news-item-content").html("");
      e.find(".news-item-content").append('<h3 class="news-headline">' + filterXSS(a.ad.title) + "</h3>");
      if (a.ad.adtype === 3) {
        e.find(".news-item-content").append('<div class="news-description" data-clamp="2"><p>' + filterXSS(a.ad.txt) + "</p></div>")
      }
    }
    e.click(function() {
      if (a.ad.link) {
        window.location = a.ad.link
      }
    })
  };
  var j = function(a, c) {
    var d = parseInt(c) - 1;
    var e = b(".post").filter(".entry-list").eq(d);
    var f = "<a href=" + a.ad.link + ' class="entry-list clearfix"><div class="entry-content clearfix">';
    if (a.ad.adtype === 4) {
      f += '<div class="clearfix post-meta"><span class="tag">' + filterXSS(a.ad.button) + "</span></div>"
    }
    if (a.ad.adtype !== 1) {
      f += '<div class="entry-header" style="margin-bottom: 8px;"><h1 class="entry-name"><span>' + filterXSS(a.ad.title) + "</span></h1></div>";
      if (a.ad.adtype !== 2) {
        f += '<div class="summary"><p>' + a.ad.txt + "</p></div>"
      }
    }
    f += '<div class="clearfix"><div class="post-thumb"><img class="aligncenter" src="' + filterXSS(a.ad.img) + '"></div></div>';
    f += "</div>";
    f += '<span class="post-separator"></span></a>';
    e.after(f)
  };
  var k = function(a, c) {
    var d = b(".article-jiong-banner");
    var e = '<div class="banner_post_bottom clearfix js-post-bottom-jiong" ga-track="event" ga-event-category="AD_click" ga-action="AD_B3">';
    e += "<a ";
    if (a.ad.link) {
      e += 'href="' + filterXSS(a.ad.link) + '"'
    }
    e += ">";
    e += '<img src="' + filterXSS(a.ad.img) + '"' + "/></a>";
    if (a.ad.adtype === 4) {
      e += '<span class="jiong-label post-bottom-jiong__label">' + filterXSS(a.ad.button) + "</span>"
    }
    e += "</div>";
    d.append(e)
  };
  if (b(".swipe-wrap").length > 0) {
    h(e.indexSlider, "indexSlider")
  }
  if (b(".articles-list").length > 0) {
    h(e.indexArticle, "indexArticle")
  }
  if (b(".article-jiong-banner").length > 0) {
    h(e.articleBanner, "articleBanner")
  }
})(window, jQuery);
//# sourceMappingURL=mobile-min-1506586278429.js.map