(function () {
    function aa() {
        return function () {
        }
    }

    function ba(a) {
        return function (b) {
            this[a] = b
        }
    }

    function h(a) {
        return function () {
            return this[a]
        }
    }

    function da(a) {
        return function () {
            return a
        }
    }

    for (var q, ea = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
            if (c.get || c.set)throw new TypeError("ES3 does not support getters and setters.");
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        }, ga = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this, ha = ["Array", "prototype", "fill"], ia = 0; ia < ha.length - 1; ia++) {
        var ja = ha[ia];
        ja in ga || (ga[ja] = {});
        ga = ga[ja]
    }
    var ka = ha[ha.length - 1], la = ga[ka], ma = la ? la : function (a, b, c) {
            var d = this.length || 0;
            0 > b && (b = Math.max(0, d + b));
            if (null == c || c > d) c = d;
            c = Number(c);
            0 > c && (c = Math.max(0, d + c));
            for (b = Number(b || 0); b < c; b++)this[b] = a;
            return this
        };
    ma != la && null != ma && ea(ga, ka, {configurable: !0, writable: !0, value: ma});
    var na = na || {}, w = this;

    function x(a) {
        return void 0 !== a
    }

    function pa(a) {
        a = a.split(".");
        for (var b = w, c; c = a.shift();)if (null != b[c]) b = b[c]; else return null;
        return b
    }

    function C() {
    }

    function ra(a) {
        a.Ya = void 0;
        a.hg = function () {
            return a.Ya ? a.Ya : a.Ya = new a
        }
    }

    function ta(a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else return "null";
        else if ("function" == b && "undefined" == typeof a.call)return "object";
        return b
    }

    function ua(a) {
        return "array" == ta(a)
    }

    function va(a) {
        var b = ta(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function wa(a) {
        return "string" == typeof a
    }

    function xa(a) {
        return "number" == typeof a
    }

    function ya(a) {
        return "function" == ta(a)
    }

    function za(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function Aa(a) {
        return a[Ba] || (a[Ba] = ++Ca)
    }

    var Ba = "closure_uid_" + (1E9 * Math.random() >>> 0), Ca = 0;

    function Da(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function Ea(a, b, c) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }

    function E(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? E = Da : E = Ea;
        return E.apply(null, arguments)
    }

    function Fa(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }

    function F() {
        return +new Date
    }

    function Ga(a, b) {
        a = a.split(".");
        var c = w;
        a[0] in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());)!a.length && x(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {}
    }

    function G(a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.V = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.ln = function (a, c, f) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)d[e - 2] = arguments[e];
            return b.prototype[c].apply(a, d)
        }
    };
    function Ha(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Ha); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    }

    G(Ha, Error);
    Ha.prototype.name = "CustomError";
    var Ia;

    function Ja(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    }

    function Ka(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }

    function Ma(a) {
        if (!Na.test(a))return a;
        -1 != a.indexOf("&") && (a = a.replace(Oa, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(Qa, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(Ra, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(Sa, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(Ta, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(Ua, "&#0;"));
        return a
    }

    var Oa = /&/g, Qa = /</g, Ra = />/g, Sa = /"/g, Ta = /'/g, Ua = /\x00/g, Na = /[\x00&<>"']/;

    function Va(a) {
        return -1 != a.indexOf("&") ? "document" in w ? Wa(a) : Xa(a) : a
    }

    function Wa(a) {
        var b = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'}, c;
        c = w.document.createElement("div");
        return a.replace(Ya, function (a, e) {
            var d = b[a];
            if (d)return d;
            "#" == e.charAt(0) && (e = Number("0" + e.substr(1)), isNaN(e) || (d = String.fromCharCode(e)));
            d || (c.innerHTML = a + " ", d = c.firstChild.nodeValue.slice(0, -1));
            return b[a] = d
        })
    }

    function Xa(a) {
        return a.replace(/&([^;]+);/g, function (a, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    return "#" != c.charAt(0) || (c = Number("0" + c.substr(1)), isNaN(c)) ? a : String.fromCharCode(c)
            }
        })
    }

    var Ya = /&([^;\s<&]+);?/g;

    function Za() {
        return -1 != $a.toLowerCase().indexOf("webkit")
    }

    var ab = String.prototype.repeat ? function (a, b) {
            return a.repeat(b)
        } : function (a, b) {
            return Array(b + 1).join(a)
        };

    function bb(a, b) {
        a = x(void 0) ? a.toFixed(void 0) : String(a);
        var c = a.indexOf(".");
        -1 == c && (c = a.length);
        return ab("0", Math.max(0, b - c)) + a
    }

    function db(a, b) {
        var c = 0;
        a = Ka(String(a)).split(".");
        b = Ka(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "", g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length)break;
                c = eb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || eb(0 == f[2].length, 0 == g[2].length) || eb(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    }

    function eb(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    var gb = 2147483648 * Math.random() | 0;

    function hb(a) {
        return String(a).replace(/\-([a-z])/g, function (a, c) {
            return c.toUpperCase()
        })
    }

    function ib(a) {
        var b = wa(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
            return b + e.toUpperCase()
        })
    };
    function kb() {
    };
    function lb(a) {
        return a[a.length - 1]
    }

    function mb(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (wa(a))return wa(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }

    function nb(a, b, c) {
        for (var d = a.length, e = wa(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }

    function ob(a, b) {
        for (var c = a.length, d = Array(c), e = wa(a) ? a.split("") : a, f = 0; f < c; f++)f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    }

    function pb(a, b) {
        for (var c = a.length, d = wa(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && b.call(void 0, d[e], e, a))return !0;
        return !1
    }

    function qb(a, b) {
        b = rb(a, b, void 0);
        return 0 > b ? null : wa(a) ? a.charAt(b) : a[b]
    }

    function rb(a, b, c) {
        for (var d = a.length, e = wa(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return f;
        return -1
    }

    function sb(a, b) {
        return 0 <= mb(a, b)
    }

    function tb(a, b) {
        b = mb(a, b);
        var c;
        (c = 0 <= b) && ub(a, b);
        return c
    }

    function ub(a, b) {
        Array.prototype.splice.call(a, b, 1)
    }

    function vb(a) {
        return Array.prototype.concat.apply([], arguments)
    }

    function wb(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return []
    }

    function xb(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (va(d)) {
                var e = a.length || 0, f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++)a[e + g] = d[g]
            } else a.push(d)
        }
    }

    function yb(a, b, c, d) {
        Array.prototype.splice.apply(a, zb(arguments, 1))
    }

    function zb(a, b, c) {
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    }

    function Ab(a, b) {
        a.sort(b || Bb)
    }

    function Cb(a, b, c) {
        if (!va(a) || !va(b) || a.length != b.length)return !1;
        var d = a.length;
        c = c || Db;
        for (var e = 0; e < d; e++)if (!c(a[e], b[e]))return !1;
        return !0
    }

    function Bb(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }

    function Db(a, b) {
        return a === b
    };
    function Eb(a, b, c) {
        return Math.min(Math.max(a, b), c)
    }

    function Fb(a, b) {
        a %= b;
        return 0 > a * b ? a + b : a
    }

    function Gb(a, b, c) {
        return a + c * (b - a)
    }

    function Hb(a) {
        return Fb(a, 360)
    }

    function Jb(a) {
        return a * Math.PI / 180
    }

    function Kb(a) {
        return 180 * a / Math.PI
    }

    function Lb(a, b) {
        a = Hb(b) - Hb(a);
        180 < a ? a -= 360 : -180 >= a && (a = 360 + a);
        return a
    };
    var $a;
    a:{
        var Mb = w.navigator;
        if (Mb) {
            var Nb = Mb.userAgent;
            if (Nb) {
                $a = Nb;
                break a
            }
        }
        $a = ""
    }
    function I(a) {
        return -1 != $a.indexOf(a)
    };
    function Ob(a, b, c) {
        for (var d in a)b.call(c, a[d], d, a)
    }

    function Pb(a, b) {
        for (var c in a)if (b.call(void 0, a[c], c, a))return !0;
        return !1
    }

    function Qb(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = a[d];
        return b
    }

    function Rb(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = d;
        return b
    }

    function Sb(a) {
        for (var b in a)return !1;
        return !0
    }

    var Tb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ub(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < Tb.length; f++)c = Tb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    function Vb() {
        return I("Trident") || I("MSIE")
    }

    function Wb() {
        return (I("Chrome") || I("CriOS")) && !I("Edge")
    };
    function Xb() {
        return I("iPhone") && !I("iPod") && !I("iPad")
    };
    function Yb(a) {
        Yb[" "](a);
        return a
    }

    Yb[" "] = C;
    function Zb(a, b) {
        var c = $b;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var ac = I("Opera"), bc = Vb(), cc = I("Edge"), dc = I("Gecko") && !(Za() && !I("Edge")) && !(I("Trident") || I("MSIE")) && !I("Edge"), ec = Za() && !I("Edge"), fc = ec && I("Mobile"), gc = I("Macintosh"), hc = I("Windows"), ic = I("Linux") || I("CrOS");

    function jc() {
        var a = w.document;
        return a ? a.documentMode : void 0
    }

    var kc;
    a:{
        var lc = "", mc = function () {
            var a = $a;
            if (dc)return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (cc)return /Edge\/([\d\.]+)/.exec(a);
            if (bc)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (ec)return /WebKit\/(\S+)/.exec(a);
            if (ac)return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        mc && (lc = mc ? mc[1] : "");
        if (bc) {
            var nc = jc();
            if (null != nc && nc > parseFloat(lc)) {
                kc = String(nc);
                break a
            }
        }
        kc = lc
    }
    var oc = kc, $b = {};

    function pc(a) {
        return Zb(a, function () {
            return 0 <= db(oc, a)
        })
    }

    var qc;
    var rc = w.document;
    qc = rc && bc ? jc() || ("CSS1Compat" == rc.compatMode ? parseInt(oc, 10) : 5) : void 0;
    var tc = I("Firefox"), uc = Xb() || I("iPod"), vc = I("iPad"), yc = I("Android") && !(Wb() || I("Firefox") || I("Opera") || I("Silk")), zc = Wb(), Ac = I("Safari") && !(Wb() || I("Coast") || I("Opera") || I("Edge") || I("Silk") || I("Android")) && !(Xb() || I("iPad") || I("iPod"));
    var Bc = null, Cc = null, Dc = null;

    function Ec(a) {
        va(a);
        Fc();
        for (var b = Dc, c = [], d = 0; d < a.length; d += 3) {
            var e = a[d], f = d + 1 < a.length, g = f ? a[d + 1] : 0, k = d + 2 < a.length, l = k ? a[d + 2] : 0, m = e >> 2, e = (e & 3) << 4 | g >> 4, g = (g & 15) << 2 | l >> 6, l = l & 63;
            k || (l = 64, f || (g = 64));
            c.push(b[m], b[e], b[g], b[l])
        }
        return c.join("")
    }

    function Gc(a) {
        var b = [];
        Hc(a, function (a) {
            b.push(a)
        });
        return b
    }

    function Hc(a, b) {
        function c(b) {
            for (; d < a.length;) {
                var c = a.charAt(d++), e = Cc[c];
                if (null != e)return e;
                if (!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: " + c);
            }
            return b
        }

        Fc();
        for (var d = 0; ;) {
            var e = c(-1), f = c(0), g = c(64), k = c(64);
            if (64 === k && -1 === e)break;
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2), 64 != k && b(g << 6 & 192 | k))
        }
    }

    function Fc() {
        if (!Bc) {
            Bc = {};
            Cc = {};
            Dc = {};
            for (var a = 0; 65 > a; a++)Bc[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), Cc[Bc[a]] = a, Dc[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a), 62 <= a && (Cc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
        }
    };
    function Ic(a) {
        var b = a;
        if (a instanceof Array) b = Array(a.length), Jc(b, a); else if (a instanceof Object) {
            var c = b = {}, d;
            for (d in a)a.hasOwnProperty(d) && (c[d] = Ic(a[d]))
        }
        return b
    }

    function Jc(a, b) {
        for (var c = 0; c < b.length; ++c)b.hasOwnProperty(c) && (a[c] = Ic(b[c]))
    }

    function Kc(a, b) {
        a !== b && (a.length = 0, b && (a.length = b.length, Jc(a, b)))
    }

    function Lc(a, b) {
        a[b] || (a[b] = []);
        return a[b]
    }

    function Mc(a, b) {
        if (null == a || null == b)return null == a == (null == b);
        if (a.constructor != Array && a.constructor != Object)throw Error("Invalid object type passed into jsproto.areObjectsEqual()");
        if (a === b)return !0;
        if (a.constructor != b.constructor)return !1;
        for (var c in a)if (!(c in b && Nc(a[c], b[c])))return !1;
        for (var d in b)if (!(d in a))return !1;
        return !0
    }

    function Nc(a, b) {
        if (a === b || !(!0 !== a && 1 !== a || !0 !== b && 1 !== b) || !(!1 !== a && 0 !== a || !1 !== b && 0 !== b))return !0;
        if (a instanceof Object && b instanceof Object) {
            if (!Mc(a, b))return !1
        } else return !1;
        return !0
    }

    function Oc(a) {
        return a.replace(/[+/]/g, function (a) {
            return "+" == a ? "-" : "_"
        }).replace(/[.=]+$/, "")
    }

    function Pc(a, b, c, d) {
        this.type = a;
        this.label = b;
        this.Bi = c;
        this.Ce = d
    }

    function Qc(a) {
        switch (a) {
            case "d":
            case "f":
            case "i":
            case "j":
            case "u":
            case "v":
            case "x":
            case "y":
            case "g":
            case "h":
            case "n":
            case "o":
            case "e":
                return 0;
            case "s":
            case "z":
            case "B":
                return "";
            case "b":
                return !1;
            default:
                return null
        }
    }

    function Rc(a, b, c) {
        b = x(b) ? b : Qc(a);
        return new Pc(a, 1, b, c)
    }

    function Sc(a, b) {
        b = x(b) ? b : Qc(a);
        return new Pc(a, 2, b, void 0)
    }

    function Tc(a, b, c) {
        return new Pc(a, 3, c, b)
    }

    var Uc = Rc("d", void 0);
    Sc("d", void 0);
    Tc("d");
    var Vc = Rc("f", void 0);
    Sc("f", void 0);
    Tc("f");
    var Wc = Rc("i", void 0);
    Sc("i", void 0);
    Tc("i");
    Rc("j", void 0);
    Sc("j", void 0);
    Tc("j", void 0, void 0);
    Tc("j", void 0, "");
    Rc("u", void 0);
    Sc("u", void 0);
    Tc("u");
    Rc("v", void 0);
    Sc("v", void 0);
    Tc("v", void 0, void 0);
    Tc("v", void 0, "");
    var Xc = Rc("b", void 0);
    Sc("b", void 0);
    Tc("b");
    function Yc(a) {
        return Rc("e", a)
    }

    var Zc = Yc();
    Sc("e", void 0);
    var $c = Tc("e"), ad = Rc("s", void 0);
    Sc("s", void 0);
    var bd = Tc("s");
    Rc("B", void 0);
    Sc("B", void 0);
    Tc("B");
    function cd(a, b) {
        return Rc("m", a, b)
    }

    function dd(a) {
        return Tc("m", a)
    }

    var ed = Rc("x", void 0), fd = Sc("x", void 0);
    Tc("x");
    Rc("y", void 0);
    Sc("y", void 0);
    Tc("y");
    Rc("g", void 0);
    Sc("g", void 0);
    Tc("g");
    Rc("h", void 0);
    Sc("h", void 0);
    Tc("h");
    Rc("n", void 0);
    Sc("n", void 0);
    Tc("n");
    Rc("o", void 0);
    Sc("o", void 0);
    Tc("o", void 0, void 0);
    Tc("o", void 0, "");
    function gd(a) {
        this.data = a || {}
    }

    function hd(a, b, c) {
        a = a.data[b];
        return null != a ? a : c
    }

    function id(a, b) {
        return hd(a, b, "")
    }

    function jd(a) {
        var b = {};
        Lc(a.data, "param").push(b);
        return b
    }

    function kd(a, b) {
        return Lc(a.data, "param")[b]
    }

    function ld(a) {
        return a.data.param ? a.data.param.length : 0
    };
    function J(a) {
        this.data = a || []
    }

    function K(a, b) {
        return null != a.data[b]
    }

    function md(a, b, c) {
        a = a.data[b];
        return null != a ? a : c
    }

    function nd(a, b, c) {
        return !!md(a, b, c)
    }

    function L(a, b, c) {
        return md(a, b, c || 0)
    }

    function M(a, b, c) {
        return md(a, b, c || 0)
    }

    function O(a, b, c) {
        return md(a, b, c || "")
    }

    function P(a, b) {
        var c = a.data[b];
        c || (c = a.data[b] = []);
        return c
    }

    function od(a, b) {
        b in a.data && delete a.data[b]
    }

    function pd(a, b, c) {
        Lc(a.data, b).push(c)
    }

    function qd(a, b, c) {
        return Lc(a.data, b)[c]
    }

    function rd(a, b) {
        var c = [];
        Lc(a.data, b).push(c);
        return c
    }

    function sd(a, b, c) {
        return Lc(a.data, b)[c]
    }

    function Q(a, b) {
        return a.data[b] ? a.data[b].length : 0
    }

    function td(a, b) {
        return Mc(a.data, b ? b.data : null)
    }

    J.prototype.ib = h("data");
    function ud(a) {
        var b = [];
        Kc(b, a.ib());
        return b
    }

    function U(a, b) {
        Kc(a.data, b ? b.ib() : null)
    }

    function vd(a, b) {
        this.data = a;
        this.index = b
    }

    function wd(a) {
        return a.data[a.index] || ""
    }

    function xd(a, b) {
        vd.call(this, a, b)
    }

    G(xd, vd);
    function yd(a) {
        this.data = a || []
    }

    var zd;
    G(yd, J);
    function Ad() {
        zd || (zd = {A: -1, R: []});
        return zd
    };
    function Bd(a) {
        this.data = a || []
    }

    var Cd;
    G(Bd, J);
    function Dd() {
        Cd || (Cd = {A: -1, R: []}, Cd.R = [, Sc("y", ""), Sc("y", ""), cd(new yd([]), Ad())]);
        return Cd
    };
    function Ed(a) {
        this.data = a || []
    }

    G(Ed, J);
    function Fd(a) {
        this.data = a || []
    }

    var Gd;
    G(Fd, J);
    function Hd() {
        Gd || (Gd = {A: -1, R: [, ad, ad]});
        return Gd
    }

    function Id(a) {
        return O(a, 0)
    };
    function Jd(a) {
        this.data = a || []
    }

    G(Jd, J);
    function Kd(a) {
        this.data = a || []
    }

    G(Kd, J);
    Kd.prototype.ma = function () {
        return new Jd(this.data[1])
    };
    function Ld(a) {
        this.data = a || []
    }

    G(Ld, J);
    function Md(a) {
        this.data = a || []
    }

    G(Md, J);
    function Nd(a) {
        return new Fd(a.data[0])
    };
    function Od(a) {
        this.data = a || []
    }

    var Pd;
    G(Od, J);
    function Qd() {
        Pd || (Pd = {A: -1, R: [, Wc, Wc]});
        return Pd
    }

    Od.prototype.W = function () {
        return M(this, 1)
    };
    function Rd(a) {
        this.data = a || []
    }

    G(Rd, J);
    function Sd(a) {
        this.data = a || []
    }

    var Td;
    G(Sd, J);
    function Ud(a) {
        this.data = a || []
    }

    G(Ud, J);
    function Vd(a) {
        this.data = a || []
    }

    G(Vd, J);
    function Wd(a) {
        this.data = a || []
    }

    var Xd;
    G(Wd, J);
    function Yd(a) {
        return new Sd(a.data[0])
    }

    function Zd() {
        Td || (Td = {A: -1, R: []}, Td.R = [, , , Uc, Uc, Yc(1)]);
        return Td
    }

    function $d(a, b) {
        a.data[2] = b
    }

    function be(a, b) {
        a.data[3] = b
    };
    function ce(a) {
        this.data = a || []
    }

    G(ce, J);
    function de(a) {
        this.data = a || []
    }

    G(de, J);
    function ee(a) {
        this.data = a || []
    }

    G(ee, J);
    function fe(a) {
        this.data = a || []
    }

    G(fe, J);
    function ge(a) {
        this.data = a || []
    }

    G(ge, J);
    function he(a) {
        return new de(a.data[3])
    }

    ce.prototype.eb = function () {
        return new ge(this.data[8])
    };
    function ie(a) {
        this.data = a || []
    }

    G(ie, J);
    function je(a) {
        this.data = a || []
    }

    var ke;
    G(je, J);
    function le(a) {
        this.data = a || []
    }

    var oe;
    G(le, J);
    function pe() {
        if (!oe) {
            var a = oe = {A: -1, R: []};
            ke || (ke = {A: -1, R: [, Zc, Xc, Zc, Zc]});
            a.R = [, dd(ke), Xc, cd(new Od([]), Qd()), Xc]
        }
        return oe
    };
    function qe(a) {
        this.data = a || []
    }

    G(qe, J);
    function re(a) {
        this.data = a || []
    }

    G(re, J);
    function se(a) {
        this.data = a || []
    }

    var te;
    G(se, J);
    function ue(a) {
        this.data = a || []
    }

    var ve;
    G(ue, J);
    function we(a) {
        this.data = a || []
    }

    var xe;
    G(we, J);
    function ye(a) {
        this.data = a || []
    }

    var ze;
    G(ye, J);
    function Ae(a) {
        this.data = a || []
    }

    var Be;
    G(Ae, J);
    function Ce() {
        ze || (ze = {A: -1, R: [, ed, ed]});
        return ze
    }

    function De() {
        if (!Be) {
            var a = Be = {A: -1, R: []}, b = cd(new Bd([]), Dd()), c = Rc("v", ""), d = new we([]);
            xe || (xe = {A: -1, R: []}, xe.R = [, dd(Ce()), dd(Dd()), dd(Dd()), cd(new ye([]), Ce()), Xc, Wc]);
            a.R = [, b, ad, c, cd(d, xe), ad, ad]
        }
        return Be
    }

    function Ee(a, b) {
        a.data[4] = b
    };
    function Fe(a) {
        this.data = a || []
    }

    var Ge;
    G(Fe, J);
    function He(a) {
        this.data = a || []
    }

    G(He, J);
    function Ie(a) {
        this.data = a || []
    }

    G(Ie, J);
    function Je(a) {
        this.data = a || []
    }

    var Ke;
    G(Je, J);
    function Le() {
        Ke || (Ke = {A: -1, R: [, Zc, ad]});
        return Ke
    }

    function Me(a, b) {
        a.data[0] = b
    }

    Je.prototype.sa = function () {
        return O(this, 1)
    };
    function Ne(a, b) {
        a.data[1] = b
    };
    function Oe(a) {
        this.data = a || []
    }

    var Pe;
    G(Oe, J);
    function Qe(a) {
        this.data = a || []
    }

    var Re;
    G(Qe, J);
    function Se(a) {
        this.data = a || []
    }

    var Te;
    G(Se, J);
    function Ue(a) {
        this.data = a || []
    }

    var Ve;
    G(Ue, J);
    function We(a) {
        this.data = a || []
    }

    var Xe;
    G(We, J);
    function Ye(a) {
        this.data = a || []
    }

    var Ze;
    G(Ye, J);
    function $e(a) {
        this.data = a || []
    }

    var af;
    G($e, J);
    function bf(a) {
        this.data = a || []
    }

    var cf;
    G(bf, J);
    function df(a) {
        this.data = a || []
    }

    var ef;
    G(df, J);
    function ff() {
        if (!ef) {
            var a = ef = {A: -1, R: []}, b = Yc(1), c = Rc("j", ""), d = new Ye([]);
            Ze || (Ze = {A: -1, R: [, Xc]});
            var d = cd(d, Ze), e = Yc(2), f = new bf([]);
            if (!cf) {
                var g = cf = {A: -1, R: []}, k = new $e([]);
                af || (af = {A: -1, R: [, , Xc]});
                g.R = [, cd(k, af)]
            }
            f = cd(f, cf);
            g = new Ue([]);
            Ve || (Ve = {A: -1, R: []}, Ve.R = [, Rc("b", !0), Rc("b", !0), Rc("b", !0), Rc("b", !0), Xc, bd, ad]);
            g = cd(g, Ve);
            k = new Se([]);
            if (!Te) {
                var l = Te = {A: -1, R: []}, m = new Oe([]);
                Pe || (Pe = {A: -1, R: []}, Pe.R = [, Xc, Rc("b", !0)]);
                var m = cd(m, Pe), n = new Qe([]);
                Re || (Re = {A: -1, R: [, Xc]});
                l.R = [, m, cd(n, Re)]
            }
            k =
                cd(k, Te);
            l = new ue([]);
            ve || (ve = {A: -1, R: [, , Xc, Xc, Xc]});
            l = cd(l, ve);
            m = new We([]);
            Xe || (Xe = {A: -1, R: []}, Xe.R = [, Sc("j", ""), fd, fd]);
            a.R = [, ad, b, c, Zc, ad, d, e, f, ad, g, k, l, cd(m, Xe)]
        }
        return ef
    }

    function gf(a, b) {
        a.data[0] = b
    };
    function hf(a) {
        this.data = a || []
    }

    var jf;
    G(hf, J);
    function kf(a) {
        this.data = a || []
    }

    var lf;
    G(kf, J);
    function mf() {
        jf || (jf = {
            A: -1,
            R: []
        }, jf.R = [, cd(new Bd([]), Dd()), dd(nf()), dd(Dd()), dd(Dd()), cd(new kf([]), nf())]);
        return jf
    }

    function of(a, b) {
        var c = mf();
        a = a.ib();
        var d = pf, e = "!", f = b[0];
        if ("0" > f || "9" < f) b = b.substr(1), f != e && (e = f, d = qf(e));
        b = b.split(e);
        a.length = 0;
        rf(0, b.length, b, d, c, a)
    }

    function nf() {
        lf || (lf = {A: -1, R: [, ed, ed]});
        return lf
    };
    function sf(a) {
        this.data = a || []
    }

    var tf;
    G(sf, J);
    function uf() {
        tf || (tf = {A: -1, R: [, ad, ad, ad]});
        return tf
    };
    function vf(a) {
        this.data = a || []
    }

    G(vf, J);
    function wf(a) {
        this.data = a || []
    }

    G(wf, J);
    function xf(a) {
        this.data = a || []
    }

    G(xf, J);
    function yf(a) {
        this.data = a || []
    }

    var zf;
    G(yf, J);
    function Af(a) {
        this.data = a || []
    }

    var Bf;
    G(Af, J);
    function Cf(a) {
        this.data = a || []
    }

    G(Cf, J);
    function Df(a) {
        this.data = a || []
    }

    G(Df, J);
    function Ef(a) {
        this.data = a || []
    }

    G(Ef, J);
    function Ff(a) {
        this.data = a || []
    }

    G(Ff, J);
    function Gf(a) {
        this.data = a || []
    }

    G(Gf, J);
    function Hf(a) {
        this.data = a || []
    }

    var If;
    G(Hf, J);
    function Jf(a) {
        this.data = a || []
    }

    G(Jf, J);
    function Kf(a) {
        this.data = a || []
    }

    G(Kf, J);
    function Lf(a) {
        this.data = a || []
    }

    G(Lf, J);
    function Mf(a) {
        this.data = a || []
    }

    G(Mf, J);
    function Nf(a) {
        this.data = a || []
    }

    G(Nf, J);
    var Of;

    function Pf(a) {
        return new Rd(a.data[1])
    }

    xf.prototype.getTime = function (a) {
        return new Ff(sd(this, 8, a))
    };
    function Qf(a) {
        return new Je(a.data[0])
    }

    Cf.prototype.ha = function () {
        return new ie(this.data[1])
    };
    function Rf(a, b) {
        return new Cf(sd(a, 0, b))
    };
    function Sf(a) {
        this.data = a || []
    }

    var Tf;
    G(Sf, J);
    function Uf(a) {
        this.data = a || []
    }

    var Vf;
    G(Uf, J);
    function Wf(a) {
        this.data = a || []
    }

    var Xf;
    G(Wf, J);
    function Yf(a) {
        this.data = a || []
    }

    var Zf;
    G(Yf, J);
    function $f(a) {
        this.data = a || []
    }

    var ag;
    G($f, J);
    var bg;

    function cg(a) {
        this.data = a || []
    }

    var dg;
    G(cg, J);
    function eg(a) {
        this.data = a || []
    }

    var fg;
    G(eg, J);
    function gg(a) {
        this.data = a || []
    }

    var hg;
    G(gg, J);
    function ig(a) {
        this.data = a || []
    }

    var pg;
    G(ig, J);
    function qg(a) {
        this.data = a || []
    }

    var rg;
    G(qg, J);
    function sg(a) {
        this.data = a || []
    }

    var tg;
    G(sg, J);
    function ug() {
        if (!hg) {
            var a = hg = {A: -1, R: []}, b = new Sf([]);
            if (!Tf) {
                var c = Tf = {A: -1, R: []}, d = new Uf([]);
                Vf || (Vf = {A: -1, R: [, $c]});
                var d = cd(d, Vf), e = new Wf([]);
                Xf || (Xf = {A: -1, R: []}, Xf.R = [, , , Yc(255), $c]);
                c.R = [, d, Xc, Xc, , Xc, Xc, cd(e, Xf), Xc, Xc]
            }
            b = cd(b, Tf);
            c = cd(new sf([]), uf());
            d = new ig([]);
            if (!pg) {
                var e = pg = {A: -1, R: []}, f = new cg([]);
                if (!dg) {
                    var g = dg = {A: -1, R: []}, k = dd(Qd());
                    bg || (bg = {A: -1, R: []}, bg.R = [, cd(new Od([]), Qd()), ad]);
                    g.R = [, k, Xc, dd(bg), Xc]
                }
                f = cd(f, dg);
                g = new Fe([]);
                Ge || (Ge = {A: -1, R: [, Zc, Zc]});
                e.R = [, , f, , cd(g, Ge)]
            }
            d =
                cd(d, pg);
            e = new sg([]);
            tg || (tg = {A: -1, R: []}, tg.R = [, Wc, ad, Rc("i", 100)]);
            e = cd(e, tg);
            f = cd(new yd([]), Ad());
            g = new Yf([]);
            Zf || (Zf = {A: -1, R: []}, Zf.R = [, Yc(1), Rc("d", 6), Rc("d", 2), Rc("d", .04)]);
            var g = cd(g, Zf), k = cd(new le([]), pe()), l = new qg([]);
            rg || (rg = {A: -1, R: []}, rg.R = [, Yc(1), Xc]);
            var l = cd(l, rg), m = new se([]);
            te || (te = {A: -1, R: [, $c]});
            var m = cd(m, te), n = new $f([]);
            ag || (ag = {A: -1, R: [, bd]});
            a.R = [, b, c, d, e, , , , f, g, Xc, k, l, m, Xc, Zc, ad, Wc, $c, cd(n, ag)]
        }
        return hg
    };
    function vg(a) {
        this.data = a || []
    }

    var wg;
    G(vg, J);
    function xg(a) {
        this.data = a || []
    }

    var yg;
    G(xg, J);
    xg.prototype.Rc = function () {
        return new Sd(this.data[0])
    };
    function zg(a) {
        this.data = a || []
    }

    G(zg, J);
    zg.prototype.rc = function () {
        return M(this, 0)
    };
    function Ag(a) {
        this.data = a || []
    }

    G(Ag, J);
    function Bg(a, b) {
        a.data[0] = b
    };
    function Cg(a) {
        this.data = a || []
    }

    var Dg;
    G(Cg, J);
    function Eg(a) {
        this.data = a || []
    }

    G(Eg, J);
    function Fg(a) {
        this.data = a || []
    }

    var Gg;
    G(Fg, J);
    function Hg(a) {
        this.data = a || []
    }

    var Ig;
    G(Hg, J);
    function Jg(a) {
        this.data = a || []
    }

    var Kg;
    G(Jg, J);
    function Lg(a) {
        this.data = a || []
    }

    G(Lg, J);
    function Mg(a) {
        this.data = a || []
    }

    G(Mg, J);
    function Ng(a) {
        this.data = a || []
    }

    var Og;
    G(Ng, J);
    function Pg(a) {
        this.data = a || []
    }

    G(Pg, J);
    function Qg(a) {
        this.data = a || []
    }

    var Rg;
    G(Qg, J);
    function Sg(a) {
        this.data = a || []
    }

    G(Sg, J);
    function Tg() {
        if (!Dg) {
            var a = Dg = {A: -1, R: []}, b = cd(new df([]), ff()), c = cd(new sf([]), uf());
            Gg || (Gg = {A: -1, R: []}, Gg.R = [, cd(new Je([]), Le()), cd(new Ae([]), De())]);
            a.R = [, b, c, dd(Gg), cd(new Hg([]), Ug())]
        }
        return Dg
    }

    Cg.prototype.getContext = function () {
        return new df(this.data[0])
    };
    Eg.prototype.Ga = function () {
        return new zg(this.data[0])
    };
    Eg.prototype.eb = function (a) {
        return new Lg(sd(this, 1, a))
    };
    function Ug() {
        if (!Ig) {
            var a = Ig = {A: -1, R: []};
            zf || (zf = {A: -1, R: [, Zc]});
            var b = dd(zf), c = Yc(2), d = new Jg([]);
            Kg || (Kg = {A: -1, R: []}, Kg.R = [, Rc("i", 100)]);
            d = cd(d, Kg);
            If || (If = {A: -1, R: [, Zc]});
            var e = dd(If);
            Bf || (Bf = {A: -1, R: [, Zc]});
            var f = dd(Bf);
            Of || (Of = {A: -1, R: []}, Of.R = [, Yc(1), Yc(1)]);
            a.R = [, $c, b, c, d, e, f, , dd(Of), cd(new le([]), pe())]
        }
        return Ig
    }

    Lg.prototype.Ga = function () {
        return new Mg(this.data[0])
    };
    function Vg(a) {
        return new Je(a.data[1])
    }

    function Wg(a) {
        return new ce(a.data[2])
    }

    function Xg(a) {
        return new ce(P(a, 2))
    }

    function Yg(a) {
        return new re(a.data[3])
    }

    function Zg(a) {
        return new Ie(a.data[6])
    }

    function $g(a, b) {
        return new xf(sd(a, 5, b))
    }

    Mg.prototype.rc = function () {
        return L(this, 0)
    };
    function ah() {
        if (!Og) {
            var a = Og = {A: -1, R: []}, b = cd(new df([]), ff()), c = new xg([]);
            if (!yg) {
                var d = yg = {A: -1, R: []}, e = cd(new Sd([]), Zd()), f = new Wd([]);
                Xd || (Xd = {A: -1, R: []}, Xd.R = [, Rc("v", ""), Vc, cd(new Fd([]), Hd()), cd(new Fd([]), Hd())]);
                d.R = [, e, Uc, cd(f, Xd), dd(Dd()), cd(new Sd([]), Zd()), ad]
            }
            var c = cd(c, yg), d = cd(new gg([]), ug()), e = cd(new Hg([]), Ug()), f = cd(new Je([]), Le()), g = new Qg([]);
            Rg || (Rg = {A: -1, R: []});
            var g = cd(g, Rg), k = cd(new hf([]), mf()), l = new vg([]);
            if (!wg) {
                var m = wg = {A: -1, R: []}, n = dd(De()), p = cd(new gg([]), ug()),
                    r = new eg([]);
                fg || (fg = {A: -1, R: []}, fg.R = [, dd(ug()), Rc("b", !0)]);
                m.R = [, n, p, ad, , cd(r, fg)]
            }
            a.R = [, b, c, d, e, f, g, k, cd(l, wg)]
        }
        return Og
    }

    Ng.prototype.getContext = function () {
        return new df(this.data[0])
    };
    Pg.prototype.Ga = function () {
        return new zg(this.data[0])
    };
    Pg.prototype.getMetadata = function () {
        return new Lg(this.data[1])
    };
    Pg.prototype.Wc = function () {
        return K(this, 3)
    };
    Pg.prototype.ub = function () {
        return new Sg(this.data[3])
    };
    function bh(a) {
        this.data = a || []
    }

    G(bh, J);
    function ch(a) {
        this.data = a || []
    }

    G(ch, J);
    function dh(a) {
        this.data = a || []
    }

    G(dh, J);
    function eh(a) {
        this.data = a || []
    }

    G(eh, J);
    function fh(a) {
        this.data = a || []
    }

    G(fh, J);
    function gh(a) {
        this.data = a || []
    }

    G(gh, J);
    function hh(a) {
        this.data = a || []
    }

    G(hh, J);
    function ih(a) {
        return M(a, 3)
    }

    function jh(a) {
        return new fh(a.data[0])
    }

    function kh(a) {
        return new fh(P(a, 0))
    }

    function lh(a) {
        return new gh(a.data[1])
    }

    function mh(a) {
        return new gh(P(a, 1))
    }

    function nh(a) {
        return new hh(a.data[2])
    }

    function oh(a) {
        return new hh(P(a, 2))
    }

    function ph(a) {
        return M(a, 1)
    }

    function qh(a) {
        return M(a, 2)
    }

    function rh(a) {
        return M(a, 0)
    }

    function sh(a, b) {
        a.data[0] = b
    }

    function th(a) {
        return M(a, 0)
    }

    hh.prototype.W = function () {
        return M(this, 0)
    };
    function uh(a, b) {
        a.data[0] = b
    }

    function vh(a) {
        return M(a, 1)
    }

    function wh(a, b) {
        a.data[1] = b
    };
    function xh(a) {
        this.data = a || []
    }

    G(xh, J);
    function yh(a) {
        this.data = a || []
    }

    G(yh, J);
    function Kh(a, b) {
        a.data[0] = b
    }

    function Lh(a, b) {
        a.data[1] = b
    }

    yh.prototype.Ja = function () {
        return O(this, 2)
    };
    function Mh(a) {
        this.data = a || []
    }

    G(Mh, J);
    function Nh(a) {
        this.data = a || []
    }

    G(Nh, J);
    function Oh(a) {
        this.data = a || []
    }

    G(Oh, J);
    Mh.prototype.sa = function () {
        return O(this, 0)
    };
    function Ph(a) {
        return L(a, 2, 1)
    }

    Mh.prototype.da = function () {
        return new Lg(this.data[21])
    };
    function Qh(a) {
        return new Lg(P(a, 21))
    }

    Mh.prototype.ha = function () {
        return new eh(this.data[8])
    };
    function Rh(a) {
        return new eh(P(a, 8))
    }

    function Sh(a, b) {
        pd(a, 17, b)
    }

    function Th(a) {
        return new Oh(sd(a, 15, 0))
    }

    function Uh(a) {
        return new yh(P(a, 1))
    };
    function Vh(a) {
        this.data = a || []
    }

    G(Vh, J);
    function Wh(a) {
        this.data = a || []
    }

    G(Wh, J);
    function Xh(a) {
        this.data = a || []
    }

    G(Xh, J);
    function Yh(a) {
        this.data = a || []
    }

    G(Yh, J);
    function Zh(a) {
        return new Wh(a.data[2])
    }

    function $h(a) {
        return new Wh(P(a, 2))
    }

    function ai(a) {
        return new Yh(a.data[4])
    };
    function bi() {
        this.A = new Vh;
        (new dh(P(this.A, 5))).data[6] = 98
    }

    function ci(a, b) {
        $h(a.A).data[10] = b
    }

    function di(a, b) {
        a = $h(a.A);
        pd(a, 3, b)
    }

    function ei(a, b) {
        a = $h(a.A);
        pd(a, 9, b)
    }

    function fi(a, b) {
        $h(a.A).data[0] = b
    }

    function gi(a, b) {
        $h(a.A).data[8] = b
    }

    function hi(a, b) {
        (new bh(P(a.A, 1))).data[0] = b
    }

    function ii(a, b) {
        (new bh(P(a.A, 1))).data[1] = b
    }

    function ji(a, b) {
        (new Oe(P(new Se(P(a.A, 16)), 0))).data[0] = b
    };
    var ki = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    var li = /<[^>]*>|&[^;]+;/g;

    function mi(a, b) {
        return b ? a.replace(li, "") : a
    }

    var ni = /[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]/, oi = /^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc]/, pi = /^http:\/\/.*/, qi = /[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff][^\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc]*$/, ri =
        /[\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc][^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*$/, si = /\s+/, ti = /[\d\u06f0-\u06f9]/;

    function ui(a, b) {
        var c = 0, d = 0, e = !1;
        a = mi(a, b).split(si);
        for (b = 0; b < a.length; b++) {
            var f = a[b];
            oi.test(mi(f, void 0)) ? (c++, d++) : pi.test(f) ? e = !0 : ni.test(mi(f, void 0)) ? d++ : ti.test(f) && (e = !0)
        }
        return 0 == d ? e ? 1 : 0 : .4 < c / d ? -1 : 1
    };
    function vi() {
        this.A = "";
        this.B = wi
    }

    vi.prototype.$b = !0;
    vi.prototype.mb = h("A");
    vi.prototype.toString = function () {
        return "Const{" + this.A + "}"
    };
    function xi(a) {
        return a instanceof vi && a.constructor === vi && a.B === wi ? a.A : "type_error:Const"
    }

    var wi = {};

    function yi(a) {
        var b = new vi;
        b.A = a;
        return b
    }

    yi("");
    function zi() {
        this.A = "";
        this.B = Ai
    }

    zi.prototype.$b = !0;
    var Ai = {};
    zi.prototype.mb = h("A");
    function Bi(a) {
        var b = new zi;
        b.A = a;
        return b
    }

    var Ci = Bi(""), Di = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;

    function Ei() {
        this.A = "";
        this.B = Fi
    }

    Ei.prototype.$b = !0;
    Ei.prototype.mb = h("A");
    Ei.prototype.Ke = !0;
    Ei.prototype.uc = da(1);
    function Gi(a) {
        if (a instanceof Ei && a.constructor === Ei && a.B === Fi)return a.A;
        ta(a);
        return "type_error:TrustedResourceUrl"
    }

    var Fi = {};

    function Hi() {
        this.A = "";
        this.B = Ii
    }

    Hi.prototype.$b = !0;
    Hi.prototype.mb = h("A");
    Hi.prototype.Ke = !0;
    Hi.prototype.uc = da(1);
    function Ji(a) {
        if (a instanceof Hi && a.constructor === Hi && a.B === Ii)return a.A;
        ta(a);
        return "type_error:SafeUrl"
    }

    var Ki = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;

    function Li(a) {
        if (a instanceof Hi)return a;
        a = a.$b ? a.mb() : String(a);
        Ki.test(a) || (a = "about:invalid#zClosurez");
        return Mi(a)
    }

    var Ii = {};

    function Mi(a) {
        var b = new Hi;
        b.A = a;
        return b
    }

    Mi("about:blank");
    function Ni() {
        this.A = "";
        this.C = Oi;
        this.B = null
    }

    Ni.prototype.Ke = !0;
    Ni.prototype.uc = h("B");
    Ni.prototype.$b = !0;
    Ni.prototype.mb = h("A");
    function Pi(a) {
        if (a instanceof Ni && a.constructor === Ni && a.C === Oi)return a.A;
        ta(a);
        return "type_error:SafeHtml"
    }

    function Qi(a) {
        if (a instanceof Ni)return a;
        var b = null;
        a.Ke && (b = a.uc());
        a = Ma(a.$b ? a.mb() : String(a));
        return Ri(a, b)
    }

    function Si(a) {
        if (a instanceof Ni)return a;
        a = Qi(a);
        var b;
        b = Pi(a).replace(/  /g, " &#160;").replace(/(\r\n|\r|\n)/g, "<br>");
        return Ri(b, a.uc())
    }

    var Ti = /^[a-zA-Z0-9-]+$/, Xi = {
        action: !0,
        cite: !0,
        data: !0,
        formaction: !0,
        href: !0,
        manifest: !0,
        poster: !0,
        src: !0
    }, Yi = {
        APPLET: !0,
        BASE: !0,
        EMBED: !0,
        IFRAME: !0,
        LINK: !0,
        MATH: !0,
        META: !0,
        OBJECT: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    };

    function Zi(a) {
        function b(a) {
            ua(a) ? nb(a, b) : (a = Qi(a), d += Pi(a), a = a.uc(), 0 == c ? c = a : 0 != a && c != a && (c = null))
        }

        var c = 0, d = "";
        nb(arguments, b);
        return Ri(d, c)
    }

    var Oi = {};

    function Ri(a, b) {
        var c = new Ni;
        c.A = a;
        c.B = b;
        return c
    }

    Ri("<!DOCTYPE html>", 0);
    Ri("", 0);
    Ri("<br>", 0);
    function $i(a, b) {
        xi(a);
        xi(a);
        return Ri(b, null)
    };
    function aj(a) {
        return function () {
            return a
        }
    }

    var bj = aj(!0);
    var cj = "StopIteration" in w ? w.StopIteration : {message: "StopIteration", stack: ""};

    function dj() {
    }

    dj.prototype.next = function () {
        throw cj;
    };
    dj.prototype.qe = function () {
        return this
    };
    function ej(a, b) {
        this.B = {};
        this.A = [];
        this.C = this.ca = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof ej ? (c = a.lb(), d = a.Ca()) : (c = Rb(a), d = Qb(a));
            for (var e = 0; e < c.length; e++)this.set(c[e], d[e])
        }
    }

    q = ej.prototype;
    q.Cb = h("ca");
    q.Ca = function () {
        fj(this);
        for (var a = [], b = 0; b < this.A.length; b++)a.push(this.B[this.A[b]]);
        return a
    };
    q.lb = function () {
        fj(this);
        return this.A.concat()
    };
    q.Pa = function () {
        return 0 == this.ca
    };
    q.clear = function () {
        this.B = {};
        this.C = this.ca = this.A.length = 0
    };
    q.remove = function (a) {
        return gj(this.B, a) ? (delete this.B[a], this.ca--, this.C++, this.A.length > 2 * this.ca && fj(this), !0) : !1
    };
    function fj(a) {
        if (a.ca != a.A.length) {
            for (var b = 0, c = 0; b < a.A.length;) {
                var d = a.A[b];
                gj(a.B, d) && (a.A[c++] = d);
                b++
            }
            a.A.length = c
        }
        if (a.ca != a.A.length) {
            for (var e = {}, c = b = 0; b < a.A.length;)d = a.A[b], gj(e, d) || (a.A[c++] = d, e[d] = 1), b++;
            a.A.length = c
        }
    }

    q.get = function (a, b) {
        return gj(this.B, a) ? this.B[a] : b
    };
    q.set = function (a, b) {
        gj(this.B, a) || (this.ca++, this.A.push(a), this.C++);
        this.B[a] = b
    };
    q.forEach = function (a, b) {
        for (var c = this.lb(), d = 0; d < c.length; d++) {
            var e = c[d], f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    q.qe = function (a) {
        fj(this);
        var b = 0, c = this.C, d = this, e = new dj;
        e.next = function () {
            if (c != d.C)throw Error("The map has changed since the iterator was created");
            if (b >= d.A.length)throw cj;
            var e = d.A[b++];
            return a ? e : d.B[e]
        };
        return e
    };
    function gj(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    function hj(a) {
        if (a.Ca && "function" == typeof a.Ca)return a.Ca();
        if (wa(a))return a.split("");
        if (va(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)b.push(a[d]);
            return b
        }
        return Qb(a)
    }

    function ij(a) {
        if (a.lb && "function" == typeof a.lb)return a.lb();
        if (!a.Ca || "function" != typeof a.Ca) {
            if (va(a) || wa(a)) {
                var b = [];
                a = a.length;
                for (var c = 0; c < a; c++)b.push(c);
                return b
            }
            return Rb(a)
        }
    }

    function jj(a, b) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0); else if (va(a) || wa(a)) nb(a, b, void 0); else for (var c = ij(a), d = hj(a), e = d.length, f = 0; f < e; f++)b.call(void 0, d[f], c && c[f], a)
    };
    function kj(a) {
        this.A = new ej;
        a && lj(this, a)
    }

    function mj(a) {
        var b = typeof a;
        return "object" == b && a || "function" == b ? "o" + Aa(a) : b.substr(0, 1) + a
    }

    q = kj.prototype;
    q.Cb = function () {
        return this.A.Cb()
    };
    q.add = function (a) {
        this.A.set(mj(a), a)
    };
    function lj(a, b) {
        b = hj(b);
        for (var c = b.length, d = 0; d < c; d++)a.add(b[d])
    }

    q.remove = function (a) {
        return this.A.remove(mj(a))
    };
    q.clear = function () {
        this.A.clear()
    };
    q.Pa = function () {
        return this.A.Pa()
    };
    q.contains = function (a) {
        a = mj(a);
        return gj(this.A.B, a)
    };
    function nj(a, b) {
        a = new kj(a);
        b = hj(b);
        for (var c = b.length, d = 0; d < c; d++)a.remove(b[d]);
        return a
    }

    q.Ca = function () {
        return this.A.Ca()
    };
    q.qe = function () {
        return this.A.qe(!1)
    };
    function oj(a) {
        var b;
        b = Error();
        if (Error.captureStackTrace) Error.captureStackTrace(b, a || oj), b = String(b.stack); else {
            try {
                throw b;
            } catch (c) {
                b = c
            }
            b = (b = b.stack) ? String(b) : null
        }
        b || (b = pj(a || arguments.callee.caller, []));
        return b
    }

    function pj(a, b) {
        var c = [];
        if (sb(b, a)) c.push("[...circular reference...]"); else if (a && 50 > b.length) {
            c.push(qj(a) + "(");
            for (var d = a.arguments, e = 0; d && e < d.length; e++) {
                0 < e && c.push(", ");
                var f;
                f = d[e];
                switch (typeof f) {
                    case "object":
                        f = f ? "object" : "null";
                        break;
                    case "string":
                        break;
                    case "number":
                        f = String(f);
                        break;
                    case "boolean":
                        f = f ? "true" : "false";
                        break;
                    case "function":
                        f = (f = qj(f)) ? f : "[fn]";
                        break;
                    default:
                        f = typeof f
                }
                40 < f.length && (f = f.substr(0, 40) + "...");
                c.push(f)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(pj(a.caller, b))
            } catch (g) {
                c.push("[exception trying to get caller]\n")
            }
        } else a ?
            c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    }

    function qj(a) {
        if (rj[a])return rj[a];
        a = String(a);
        if (!rj[a]) {
            var b = /function ([^\(]+)/.exec(a);
            rj[a] = b ? b[1] : "[Anonymous]"
        }
        return rj[a]
    }

    var rj = {};

    function sj() {
        this.A = F()
    }

    new sj;
    sj.prototype.set = ba("A");
    sj.prototype.reset = function () {
        this.set(F())
    };
    sj.prototype.get = h("A");
    function tj(a) {
        var b;
        try {
            var c;
            var d = pa("window.location.href");
            if (wa(a)) c = {
                message: a,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: d,
                stack: "Not available"
            }; else {
                var e, f, g = !1;
                try {
                    e = a.lineNumber || a.jk || "Not available"
                } catch (oa) {
                    e = "Not available", g = !0
                }
                try {
                    f = a.fileName || a.filename || a.sourceURL || w.$googDebugFname || d
                } catch (oa) {
                    f = "Not available", g = !0
                }
                c = !g && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {
                        message: a.message || "Not available",
                        name: a.name || "UnknownError",
                        lineNumber: e,
                        fileName: f,
                        stack: a.stack || "Not available"
                    }
            }
            var k;
            var l = c.fileName;
            null != l || (l = "");
            if (/^https?:\/\//i.test(l)) {
                var m = Li(l), n = yi("view-source scheme plus HTTP/HTTPS URL"), p = "view-source:" + Ji(m);
                xi(n);
                xi(n);
                k = Mi(p)
            } else {
                var r = yi("sanitizedviewsrc");
                k = Mi(xi(r))
            }
            var u = Si("Message: " + c.message + "\nUrl: "), t;
            a = {href: k, target: "_new"};
            var v = c.fileName;
            if (!Ti.test("a"))throw Error("Invalid tag name <a>.");
            if ("A" in Yi)throw Error("Tag name <a> is not allowed for SafeHtml.");
            var d = null, y;
            e = "";
            if (a)for (var D in a) {
                if (!Ti.test(D))throw Error('Invalid attribute name "' +
                    D + '".');
                var z = a[D];
                if (null != z) {
                    f = e;
                    var A, g = D;
                    k = z;
                    if (k instanceof vi) k = xi(k); else if ("style" == g.toLowerCase()) {
                        m = l = void 0;
                        n = k;
                        if (!za(n))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof n + " given: " + n);
                        if (!(n instanceof zi)) {
                            p = n;
                            r = "";
                            for (m in p) {
                                if (!/^[-_a-zA-Z0-9]+$/.test(m))throw Error("Name allows only [-_a-zA-Z0-9], got: " + m);
                                var B = p[m];
                                if (null != B) {
                                    if (B instanceof vi) B = xi(B); else if (Di.test(B)) {
                                        for (var R = !0, N = !0, H = 0; H < B.length; H++) {
                                            var T = B.charAt(H);
                                            "'" == T && N ? R = !R : '"' == T && R && (N = !N)
                                        }
                                        R && N || (B = "zClosurez")
                                    } else B = "zClosurez";
                                    r += m + ":" + B + ";"
                                }
                            }
                            n = r ? Bi(r) : Ci
                        }
                        n instanceof zi && n.constructor === zi && n.B === Ai ? l = n.A : (ta(n), l = "type_error:SafeStyle");
                        k = l
                    } else {
                        if (/^on/i.test(g))throw Error('Attribute "' + g + '" requires goog.string.Const value, "' + k + '" given.');
                        if (g.toLowerCase() in Xi)if (k instanceof Ei) k = Gi(k); else if (k instanceof Hi) k = Ji(k); else if (wa(k)) k = Li(k).mb(); else throw Error('Attribute "' + g + '" on tag "a" requires goog.html.SafeUrl, goog.string.Const, or string, value "' +
                            k + '" given.');
                    }
                    k.$b && (k = k.mb());
                    A = g + '="' + Ma(String(k)) + '"';
                    e = f + (" " + A)
                }
            }
            y = "<a" + e;
            null != v ? ua(v) || (v = [v]) : v = [];
            if (!0 === ki.a) y += ">"; else {
                var S = Zi(v);
                y += ">" + Pi(S) + "</a>";
                d = S.uc()
            }
            var qa = a && a.dir;
            qa && (/^(ltr|rtl|auto)$/i.test(qa) ? d = 0 : d = null);
            t = Ri(y, d);
            b = Zi(u, t, Si("\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + c.stack + "-> [end]\n\nJS stack traversal:\n" + oj(void 0) + "-> "))
        } catch (oa) {
            b = Si("Exception trying to expose exception! You win, we lose. " + oa)
        }
        return Pi(b)
    };
    var uj = {};

    function vj(a) {
        za(a) || (a = Error("" + a));
        return w.globals && w.globals.ErrorHandler ? w.globals.ErrorHandler.log(a, void 0) : a
    };
    function wj() {
    };
    function xj() {
    };
    var yj = [], zj = 1E3 / 30;

    function V(a, b) {
        this.D = a;
        this.H = b || [];
        this.F = [];
        this.G = !1
    }

    function Aj(a, b) {
        Bj[a] = b;
        if (b = Cj[a]) {
            for (var c = 0, d = b.length; c < d; c++)b[c]();
            delete Cj[a]
        }
    }

    function Dj(a, b, c) {
        if (0 == a.length) b(c); else for (var d = a.length, e = function (a, c) {
            --d || b(c)
        }, f = 0, g = a.length; f < g; f++) {
            var k = a[f];
            k ? k.C(e, c) : e(0, c)
        }
    }

    function Ej(a, b, c) {
        var d;
        if (0 == a.length) b(c); else {
            var e = a.length, f = [], g = [], k = c.ua(b, "delayed:getMultiple"), l = function () {
                --e || k(c)
            }, m = function (a) {
                return function () {
                    Fj(a, c)
                }
            };
            d = 0;
            for (b = a.length; d < b; d++) {
                var n = a[d];
                if (!n || n.B()) l(); else {
                    n.F.push(l);
                    var p = n.D;
                    if (Bj[p]) Fj(n, c); else {
                        f.push(n);
                        g.push(p);
                        var r = Cj[p];
                        r || (r = Cj[p] = []);
                        r.push(m(n))
                    }
                }
            }
        }
    }

    V.prototype.B = function () {
        return !!this.I
    };
    V.prototype.C = function (a, b) {
        Gj(this.D);
        if (this.B()) a(this.A(), b); else {
            var c = this;
            this.F.push(function (b) {
                a(c.A(), b)
            })
        }
    };
    V.prototype.get = function (a, b) {
        var c = this;
        Ej([c], function (b) {
            a(c.A(), b)
        }, b)
    };
    V.prototype.A = h("I");
    var Hj = null, Cj = {}, Bj = {}, Gj = C;

    function Fj(a, b) {
        Gj(a.D);
        try {
            if (!a.G) {
                var c = Bj[a.D];
                a.G = !0;
                c.apply(null, vb(function (c) {
                    Gj(a.D);
                    a.I = c;
                    a.H = null;
                    c = "delayed:ready:" + a.D;
                    b.la(c);
                    try {
                        for (var d = 0, f = a.F.length; d < f; d++)a.F[d](b);
                        a.F = null
                    } finally {
                        b.done(c)
                    }
                }, b, a.H))
            }
        } catch (d) {
            throw wj(d.stack || tj(d)), vj(d);
        }
    };
    function Ij(a, b, c, d) {
        V.call(this, "CPNR", wb(arguments))
    }

    G(Ij, V);
    function Jj(a, b) {
        this.x = x(a) ? a : 0;
        this.y = x(b) ? b : 0
    }

    q = Jj.prototype;
    q.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    q.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    q.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    q.translate = function (a, b) {
        a instanceof Jj ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), xa(b) && (this.y += b));
        return this
    };
    q.scale = function (a, b) {
        b = xa(b) ? b : a;
        this.x *= a;
        this.y *= b;
        return this
    };
    function Kj(a, b) {
        this.width = a;
        this.height = b
    }

    q = Kj.prototype;
    q.ui = function () {
        return this.width * this.height
    };
    q.Pa = function () {
        return !this.ui()
    };
    q.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    q.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    q.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    q.scale = function (a, b) {
        b = xa(b) ? b : a;
        this.width *= a;
        this.height *= b;
        return this
    };
    var Lj = !bc || 9 <= Number(qc);
    !dc && !bc || bc && 9 <= Number(qc) || dc && pc("1.9.1");
    bc && pc("9");
    function Mj(a, b) {
        a.innerHTML = Pi(b)
    };
    function Nj(a) {
        return a ? new Oj(Pj(a)) : Ia || (Ia = new Oj)
    }

    function Qj(a, b, c) {
        var d = document;
        c = c || d;
        a = a && "*" != a ? String(a).toUpperCase() : "";
        if (c.querySelectorAll && c.querySelector && (a || b))return c.querySelectorAll(a + (b ? "." + b : ""));
        if (b && c.getElementsByClassName) {
            c = c.getElementsByClassName(b);
            if (a) {
                for (var d = {}, e = 0, f = 0, g; g = c[f]; f++)a == g.nodeName && (d[e++] = g);
                d.length = e;
                return d
            }
            return c
        }
        c = c.getElementsByTagName(a || "*");
        if (b) {
            d = {};
            for (f = e = 0; g = c[f]; f++)a = g.className, "function" == typeof a.split && sb(a.split(/\s+/), b) && (d[e++] = g);
            d.length = e;
            return d
        }
        return c
    }

    function Rj(a, b) {
        Ob(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : Sj.hasOwnProperty(d) ? a.setAttribute(Sj[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }

    var Sj = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };

    function Xj(a, b, c) {
        return Yj(document, arguments)
    }

    function Yj(a, b) {
        var c = String(b[0]), d = b[1];
        if (!Lj && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', Ma(d.name), '"');
            if (d.type) {
                c.push(' type="', Ma(d.type), '"');
                var e = {};
                Ub(e, d);
                delete e.type;
                d = e
            }
            c.push(">");
            c = c.join("")
        }
        c = a.createElement(c);
        d && (wa(d) ? c.className = d : ua(d) ? c.className = d.join(" ") : Rj(c, d));
        2 < b.length && Zj(a, c, b);
        return c
    }

    function Zj(a, b, c) {
        function d(c) {
            c && b.appendChild(wa(c) ? a.createTextNode(c) : c)
        }

        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !va(f) || za(f) && 0 < f.nodeType ? d(f) : nb(ak(f) ? wb(f) : f, d)
        }
    }

    function bk(a) {
        return document.createElement(String(a))
    }

    function ck(a) {
        for (var b; b = a.firstChild;)a.removeChild(b)
    }

    function dk(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    }

    function ek(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    }

    function fk(a) {
        return x(a.firstElementChild) ? a.firstElementChild : gk(a.firstChild)
    }

    function hk(a) {
        return x(a.nextElementSibling) ? a.nextElementSibling : gk(a.nextSibling)
    }

    function gk(a) {
        for (; a && 1 != a.nodeType;)a = a.nextSibling;
        return a
    }

    function ik(a, b) {
        if (!a || !b)return !1;
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    }

    function Pj(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }

    function ak(a) {
        if (a && "number" == typeof a.length) {
            if (za(a))return "function" == typeof a.item || "string" == typeof a.item;
            if (ya(a))return "function" == typeof a.item
        }
        return !1
    }

    function jk(a) {
        return window.matchMedia("(min-resolution: " + a + "dppx),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + 96 * a + "dpi)").matches ? a : 0
    }

    function Oj(a) {
        this.A = a || w.document || document
    }

    q = Oj.prototype;
    q.Z = function (a) {
        return wa(a) ? this.A.getElementById(a) : a
    };
    q.getElementsByTagName = function (a, b) {
        return (b || this.A).getElementsByTagName(String(a))
    };
    q.He = function (a, b, c) {
        return Yj(this.A, arguments)
    };
    q.appendChild = function (a, b) {
        a.appendChild(b)
    };
    q.canHaveChildren = function (a) {
        if (1 != a.nodeType)return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    q.removeNode = ek;
    q.contains = ik;
    var kk = {
        Uh: 30, Vh: 4E-4, Th: .6, ze: function (a, b, c, d, e, f, g) {
            var k = b[0];
            b = b[1];
            var l = d[0];
            d = d[1];
            var m = f[0], n = f[1], p = d - n, r = n - b, u = b - d;
            f = k * p + l * r + m * u;
            if (0 == f)return !1;
            f = 1 / f;
            var p = p * f, t = (m - l) * f, v = (l * n - m * d) * f, r = r * f, y = (k - m) * f, m = (m * b - k * n) * f, u = u * f, n = (l - k) * f, k = (k * d - l * b) * f;
            g[0] = a[0] * p + c[0] * r + e[0] * u;
            g[1] = a[1] * p + c[1] * r + e[1] * u;
            g[2] = 0;
            g[3] = a[0] * t + c[0] * y + e[0] * n;
            g[4] = a[1] * t + c[1] * y + e[1] * n;
            g[5] = 0;
            g[6] = a[0] * v + c[0] * m + e[0] * k;
            g[7] = a[1] * v + c[1] * m + e[1] * k;
            g[8] = 1;
            return 1E-6 > Math.abs(g[0]) || 1E-6 > Math.abs(g[4]) ? !1 : !0
        }, Gi: function (a,
                         b, c, d) {
            var e = a.width, f = a.height, g = Xj("CANVAS", {width: e, height: f}), k = g.getContext("2d");
            b = b || kk.Uh;
            c = c || kk.Vh;
            d = d || kk.Th;
            for (var l = 0, m = 0; m < e; m += b) {
                var n = b;
                m + b > e && (n = e - m);
                var p = Math.max(f * (1 - m * c), 0), r = Math.max(n * (1 - m * c), 0) * d;
                k.drawImage(a, m, 0, n, f, l, (f - p) / 2, r, p);
                l += r
            }
            return g
        }
    };

    function lk(a) {
        this.B = null;
        this.D = a;
        this.G = this.C = !1;
        this.A = new Float32Array(8)
    }

    lk.prototype.Ba = h("C");
    lk.prototype.Aa = h("B");
    lk.prototype.F = function () {
        if (!this.Ba() && !this.G) {
            var a = this.D.Aa();
            a ? (this.C = !0, this.B = kk.Gi(a), this.A[0] = this.A[1] = 0, this.A[2] = 0, this.A[3] = .5 * this.B.height, this.A[4] = .5 * this.B.width, this.A[5] = .5 * this.B.height, this.A[6] = .5 * this.B.width, this.A[7] = 0) : this.G = !0
        }
    };
    function mk(a) {
        this.length = a.length || a;
        for (var b = 0; b < this.length; b++)this[b] = a[b] || 0
    }

    mk.prototype.A = 4;
    mk.prototype.set = function (a, b) {
        b = b || 0;
        for (var c = 0; c < a.length && b + c < this.length; c++)this[b + c] = a[c]
    };
    mk.prototype.toString = Array.prototype.join;
    "undefined" == typeof Float32Array && (mk.BYTES_PER_ELEMENT = 4, mk.prototype.BYTES_PER_ELEMENT = mk.prototype.A, mk.prototype.set = mk.prototype.set, mk.prototype.toString = mk.prototype.toString, Ga("Float32Array", mk));
    function nk(a) {
        this.length = a.length || a;
        for (var b = 0; b < this.length; b++)this[b] = a[b] || 0
    }

    nk.prototype.A = 8;
    nk.prototype.set = function (a, b) {
        b = b || 0;
        for (var c = 0; c < a.length && b + c < this.length; c++)this[b + c] = a[c]
    };
    nk.prototype.toString = Array.prototype.join;
    if ("undefined" == typeof Float64Array) {
        try {
            nk.BYTES_PER_ELEMENT = 8
        } catch (a) {
        }
        nk.prototype.BYTES_PER_ELEMENT = nk.prototype.A;
        nk.prototype.set = nk.prototype.set;
        nk.prototype.toString = nk.prototype.toString;
        Ga("Float64Array", nk)
    }
    ;
    function ok() {
        return new Float64Array(9)
    }

    function pk(a, b) {
        var c = a[0], d = a[1], e = a[2], f = a[3], g = a[4], k = a[5], l = a[6], m = a[7];
        a = a[8];
        var n = g * a - m * k, p = m * e - d * a, r = d * k - g * e, u = c * n + f * p + l * r;
        0 != u && (u = 1 / u, b[0] = n * u, b[3] = (l * k - f * a) * u, b[6] = (f * m - l * g) * u, b[1] = p * u, b[4] = (c * a - l * e) * u, b[7] = (l * d - c * m) * u, b[2] = r * u, b[5] = (f * e - c * k) * u, b[8] = (c * g - f * d) * u)
    }

    function qk(a, b, c) {
        var d = b[0], e = b[1];
        b = b[2];
        c[0] = d * a[0] + e * a[3] + b * a[6];
        c[1] = d * a[1] + e * a[4] + b * a[7];
        c[2] = d * a[2] + e * a[5] + b * a[8]
    };
    function rk(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2]
    };
    function sk() {
        return new Float32Array(4)
    }

    function tk(a, b, c, d, e) {
        a[0] = b;
        a[1] = c;
        a[2] = d;
        a[3] = e;
        return a
    };
    function uk() {
        return new Float32Array(16)
    }

    function vk(a, b) {
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
        a[15] = b[15]
    }

    function wk(a, b, c) {
        var d = a[0], e = a[1], f = a[2], g = a[3], k = a[4], l = a[5], m = a[6], n = a[7], p = a[8], r = a[9], u = a[10], t = a[11], v = a[12], y = a[13], D = a[14];
        a = a[15];
        var z = b[0], A = b[1], B = b[2], R = b[3], N = b[4], H = b[5], T = b[6], S = b[7], qa = b[8], oa = b[9], sa = b[10], ca = b[11], fa = b[12], fb = b[13], jb = b[14];
        b = b[15];
        c[0] = d * z + k * A + p * B + v * R;
        c[1] = e * z + l * A + r * B + y * R;
        c[2] = f * z + m * A + u * B + D * R;
        c[3] = g * z + n * A + t * B + a * R;
        c[4] = d * N + k * H + p * T + v * S;
        c[5] = e * N + l * H + r * T + y * S;
        c[6] = f * N + m * H + u * T + D * S;
        c[7] = g * N + n * H + t * T + a * S;
        c[8] = d * qa + k * oa + p * sa + v * ca;
        c[9] = e * qa + l * oa + r * sa + y * ca;
        c[10] = f * qa + m *
            oa + u * sa + D * ca;
        c[11] = g * qa + n * oa + t * sa + a * ca;
        c[12] = d * fa + k * fb + p * jb + v * b;
        c[13] = e * fa + l * fb + r * jb + y * b;
        c[14] = f * fa + m * fb + u * jb + D * b;
        c[15] = g * fa + n * fb + t * jb + a * b
    }

    function xk(a, b, c) {
        var d = b[0], e = b[1], f = b[2];
        b = b[3];
        c[0] = d * a[0] + e * a[4] + f * a[8] + b * a[12];
        c[1] = d * a[1] + e * a[5] + f * a[9] + b * a[13];
        c[2] = d * a[2] + e * a[6] + f * a[10] + b * a[14];
        c[3] = d * a[3] + e * a[7] + f * a[11] + b * a[15]
    }

    function yk(a, b) {
        var c = Math.cos(b), d = 1 - c;
        b = Math.sin(b);
        a[0] = 0 * d + c;
        a[1] = 0 * d + 1 * b;
        a[2] = 0 * d - 0 * b;
        a[3] = 0;
        a[4] = 0 * d - 1 * b;
        a[5] = 0 * d + c;
        a[6] = 0 * d + 0 * b;
        a[7] = 0;
        a[8] = 0 * d + 0 * b;
        a[9] = 0 * d - 0 * b;
        a[10] = 1 * d + c;
        a[11] = 0;
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1
    };
    function zk() {
        return new Float32Array(2)
    }

    function Ak(a, b) {
        a[0] = b[0];
        a[1] = b[1]
    }

    function Bk(a, b, c) {
        c[0] = a[0] + b[0];
        c[1] = a[1] + b[1]
    }

    function Ck(a, b, c) {
        c[0] = a[0] - b[0];
        c[1] = a[1] - b[1]
    }

    function Dk(a, b) {
        var c = a[0] - b[0];
        a = a[1] - b[1];
        return c * c + a * a
    };
    var Ek = "closure_listenable_" + (1E6 * Math.random() | 0);

    function Fk(a) {
        return !(!a || !a[Ek])
    }

    var Gk = 0;

    function Hk() {
        this.N = this.N;
        this.K = this.K
    }

    Hk.prototype.N = !1;
    Hk.prototype.xa = h("N");
    Hk.prototype.ra = function () {
        this.N || (this.N = !0, this.ga())
    };
    function Ik(a, b) {
        a.N ? x(void 0) ? b.call(void 0) : b() : (a.K || (a.K = []), a.K.push(x(void 0) ? E(b, void 0) : b))
    }

    Hk.prototype.ga = function () {
        if (this.K)for (; this.K.length;)this.K.shift()()
    };
    function Jk(a) {
        a && "function" == typeof a.ra && a.ra()
    };
    function Kk(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.ec = !1;
        this.oh = !0
    }

    Kk.prototype.stopPropagation = function () {
        this.ec = !0
    };
    Kk.prototype.preventDefault = function () {
        this.defaultPrevented = !0;
        this.oh = !1
    };
    var Lk = !bc || 9 <= Number(qc), Mk = !bc || 9 <= Number(qc), Nk = bc && !pc("9");
    !ec || pc("528");
    dc && pc("1.9b") || bc && pc("8") || ac && pc("9.5") || ec && pc("528");
    dc && !pc("8") || bc && pc("9");
    function Ok(a, b) {
        Kk.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.Na = this.state = null;
        if (a) {
            var c = this.type = a.type, d = a.changedTouches ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.currentTarget = b;
            if (b = a.relatedTarget) {
                if (dc) {
                    var e;
                    a:{
                        try {
                            Yb(b.nodeName);
                            e = !0;
                            break a
                        } catch (f) {
                        }
                        e = !1
                    }
                    e || (b = null)
                }
            } else"mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            null === d ? (this.offsetX = ec || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = ec || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX =
                    d.screenX || 0, this.screenY = d.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.state = a.state;
            this.Na = a;
            a.defaultPrevented && this.preventDefault()
        }
    }

    G(Ok, Kk);
    var Pk = [1, 4, 2];

    function Qk(a, b) {
        return Lk ? a.Na.button == b : "click" == a.type ? 0 == b : !!(a.Na.button & Pk[b])
    }

    function Rk(a) {
        return Qk(a, 0) && !(ec && gc && a.ctrlKey)
    }

    Ok.prototype.stopPropagation = function () {
        Ok.V.stopPropagation.call(this);
        this.Na.stopPropagation ? this.Na.stopPropagation() : this.Na.cancelBubble = !0
    };
    Ok.prototype.preventDefault = function () {
        Ok.V.preventDefault.call(this);
        var a = this.Na;
        if (a.preventDefault) a.preventDefault(); else if (a.returnValue = !1, Nk)try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {
        }
    };
    function Sk(a, b, c, d, e) {
        this.listener = a;
        this.A = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.gb = e;
        this.key = ++Gk;
        this.Ac = this.Nd = !1
    }

    function Tk(a) {
        a.Ac = !0;
        a.listener = null;
        a.A = null;
        a.src = null;
        a.gb = null
    };
    function Uk(a) {
        this.src = a;
        this.A = {};
        this.B = 0
    }

    Uk.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.A[f];
        a || (a = this.A[f] = [], this.B++);
        var g = Vk(a, b, d, e);
        -1 < g ? (b = a[g], c || (b.Nd = !1)) : (b = new Sk(b, this.src, f, !!d, e), b.Nd = c, a.push(b));
        return b
    };
    Uk.prototype.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.A))return !1;
        var e = this.A[a];
        b = Vk(e, b, c, d);
        return -1 < b ? (Tk(e[b]), ub(e, b), 0 == e.length && (delete this.A[a], this.B--), !0) : !1
    };
    function Wk(a, b) {
        var c = b.type;
        if (!(c in a.A))return !1;
        var d = tb(a.A[c], b);
        d && (Tk(b), 0 == a.A[c].length && (delete a.A[c], a.B--));
        return d
    }

    function Xk(a) {
        var b = 0, c;
        for (c in a.A) {
            for (var d = a.A[c], e = 0; e < d.length; e++)++b, Tk(d[e]);
            delete a.A[c];
            a.B--
        }
    }

    Uk.prototype.Sc = function (a, b, c, d) {
        a = this.A[a.toString()];
        var e = -1;
        a && (e = Vk(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    Uk.prototype.hasListener = function (a, b) {
        var c = x(a), d = c ? a.toString() : "", e = x(b);
        return Pb(this.A, function (a) {
            for (var f = 0; f < a.length; ++f)if (!(c && a[f].type != d || e && a[f].capture != b))return !0;
            return !1
        })
    };
    function Vk(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Ac && f.listener == b && f.capture == !!c && f.gb == d)return e
        }
        return -1
    };
    var Yk = "closure_lm_" + (1E6 * Math.random() | 0), Zk = {}, $k = 0;

    function al(a, b, c, d, e) {
        if (ua(b)) {
            for (var f = 0; f < b.length; f++)al(a, b[f], c, d, e);
            return null
        }
        c = bl(c);
        return Fk(a) ? a.listen(b, c, d, e) : cl(a, b, c, !1, d, e)
    }

    function cl(a, b, c, d, e, f) {
        if (!b)throw Error("Invalid event type");
        var g = !!e, k = dl(a);
        k || (a[Yk] = k = new Uk(a));
        c = k.add(b, c, d, e, f);
        if (c.A)return c;
        d = el();
        c.A = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) a.addEventListener(b.toString(), d, g); else if (a.attachEvent) a.attachEvent(fl(b.toString()), d); else throw Error("addEventListener and attachEvent are unavailable.");
        $k++;
        return c
    }

    function el() {
        var a = gl, b = Mk ? function (c) {
                return a.call(b.src, b.listener, c)
            } : function (c) {
                c = a.call(b.src, b.listener, c);
                if (!c)return c
            };
        return b
    }

    function hl(a, b, c, d, e) {
        if (ua(b)) {
            for (var f = 0; f < b.length; f++)hl(a, b[f], c, d, e);
            return null
        }
        c = bl(c);
        return Fk(a) ? a.Cg(b, c, d, e) : cl(a, b, c, !0, d, e)
    }

    function il(a, b, c, d, e) {
        if (ua(b))for (var f = 0; f < b.length; f++)il(a, b[f], c, d, e); else c = bl(c), Fk(a) ? a.Wb(b, c, d, e) : a && (a = dl(a)) && (b = a.Sc(b, c, !!d, e)) && jl(b)
    }

    function jl(a) {
        if (xa(a) || !a || a.Ac)return !1;
        var b = a.src;
        if (Fk(b))return Wk(b.ab, a);
        var c = a.type, d = a.A;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(fl(c), d);
        $k--;
        (c = dl(b)) ? (Wk(c, a), 0 == c.B && (c.src = null, b[Yk] = null)) : Tk(a);
        return !0
    }

    function kl(a) {
        if (a)if (Fk(a)) a.ab && Xk(a.ab); else if (a = dl(a)) {
            var b = 0, c;
            for (c in a.A)for (var d = a.A[c].concat(), e = 0; e < d.length; ++e)jl(d[e]) && ++b
        }
    }

    function fl(a) {
        return a in Zk ? Zk[a] : Zk[a] = "on" + a
    }

    function ll(a, b, c, d) {
        var e = !0;
        if (a = dl(a))if (b = a.A[b.toString()])for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.capture == c && !f.Ac && (f = ml(f, d), e = e && !1 !== f)
        }
        return e
    }

    function ml(a, b) {
        var c = a.listener, d = a.gb || a.src;
        a.Nd && jl(a);
        return c.call(d, b)
    }

    function gl(a, b) {
        if (a.Ac)return !0;
        if (!Mk) {
            var c = b || pa("window.event");
            b = new Ok(c, this);
            var d = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a:{
                    var e = !1;
                    if (0 == c.keyCode)try {
                        c.keyCode = -1;
                        break a
                    } catch (g) {
                        e = !0
                    }
                    if (e || void 0 == c.returnValue) c.returnValue = !0
                }
                c = [];
                for (e = b.currentTarget; e; e = e.parentNode)c.push(e);
                a = a.type;
                for (e = c.length - 1; !b.ec && 0 <= e; e--) {
                    b.currentTarget = c[e];
                    var f = ll(c[e], a, !0, b), d = d && f
                }
                for (e = 0; !b.ec && e < c.length; e++)b.currentTarget = c[e], f = ll(c[e], a, !1, b), d = d && f
            }
            return d
        }
        return ml(a, new Ok(b,
            this))
    }

    function dl(a) {
        a = a[Yk];
        return a instanceof Uk ? a : null
    }

    var nl = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function bl(a) {
        if (ya(a))return a;
        a[nl] || (a[nl] = function (b) {
            return a.handleEvent(b)
        });
        return a[nl]
    };
    function ol() {
        Hk.call(this);
        this.ab = new Uk(this);
        this.si = this;
        this.Qe = null
    }

    G(ol, Hk);
    ol.prototype[Ek] = !0;
    q = ol.prototype;
    q.Vd = h("Qe");
    q.bf = ba("Qe");
    q.addEventListener = function (a, b, c, d) {
        al(this, a, b, c, d)
    };
    q.removeEventListener = function (a, b, c, d) {
        il(this, a, b, c, d)
    };
    q.dispatchEvent = function (a) {
        var b, c = this.Vd();
        if (c) {
            b = [];
            for (var d = 1; c; c = c.Vd())b.push(c), ++d
        }
        c = this.si;
        d = a.type || a;
        if (wa(a)) a = new Kk(a, c); else if (a instanceof Kk) a.target = a.target || c; else {
            var e = a;
            a = new Kk(d, c);
            Ub(a, e)
        }
        var e = !0, f;
        if (b)for (var g = b.length - 1; !a.ec && 0 <= g; g--)f = a.currentTarget = b[g], e = pl(f, d, !0, a) && e;
        a.ec || (f = a.currentTarget = c, e = pl(f, d, !0, a) && e, a.ec || (e = pl(f, d, !1, a) && e));
        if (b)for (g = 0; !a.ec && g < b.length; g++)f = a.currentTarget = b[g], e = pl(f, d, !1, a) && e;
        return e
    };
    q.ga = function () {
        ol.V.ga.call(this);
        this.ab && Xk(this.ab);
        this.Qe = null
    };
    q.listen = function (a, b, c, d) {
        return this.ab.add(String(a), b, !1, c, d)
    };
    q.Cg = function (a, b, c, d) {
        return this.ab.add(String(a), b, !0, c, d)
    };
    q.Wb = function (a, b, c, d) {
        return this.ab.remove(String(a), b, c, d)
    };
    function pl(a, b, c, d) {
        b = a.ab.A[String(b)];
        if (!b)return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Ac && g.capture == c) {
                var k = g.listener, l = g.gb || g.src;
                g.Nd && Wk(a.ab, g);
                e = !1 !== k.call(l, d) && e
            }
        }
        return e && 0 != d.oh
    }

    q.Sc = function (a, b, c, d) {
        return this.ab.Sc(String(a), b, c, d)
    };
    q.hasListener = function (a, b) {
        return this.ab.hasListener(x(a) ? String(a) : void 0, b)
    };
    function ql(a, b, c, d) {
        this.handle = a;
        this.B = b;
        this.size = c;
        this.A = null;
        this.next = d
    }

    function rl() {
        this.G = this.D = this.F = 0;
        this.C = this.A = null;
        this.B = {}
    }

    rl.prototype.add = function (a, b) {
        if (a > this.F)return -1;
        var c = this.G++;
        b = new ql(c, b, a, this.A);
        this.B[c] = b;
        this.A && (this.A.A = b);
        this.A = b;
        this.D += a;
        null == this.C && (this.C = b);
        for (; this.D > this.F;)a = this.C, a.B && a.B(a.handle), this.remove(a.handle);
        return c
    };
    function sl(a, b) {
        (b = a.B[b]) && b.A && ((b.A.next = b.next) ? b.next.A = b.A : a.C = b.A, b.A = null, b.next = a.A, a.A.A = b, a.A = b)
    }

    rl.prototype.remove = function (a) {
        var b = this.B[a];
        b && (b.A ? b.A.next = b.next : this.A = b.next, b.next ? b.next.A = b.A : this.C = b.A, b.A = b.next = null, delete this.B[a], this.D -= b.size)
    };
    rl.prototype.contains = function (a) {
        return a in this.B
    };
    rl.prototype.clear = function () {
        for (var a = this.A; a; a = a.next)a.B && a.B(a.handle);
        this.C = this.A = null;
        this.B = {};
        this.D = 0
    };
    function tl(a, b) {
        this.B = new rl;
        this.B.F = a || Infinity;
        this.A = {};
        this.C = {};
        this.F = b || C
    }

    function ul(a, b, c) {
        var d = a.C[b];
        x(d) && -1 != d ? sl(a.B, d) : (d = a.B.add(1, E(a.D, a, b)), a.C[b] = d);
        a.A[b] = c
    }

    function vl(a, b) {
        var c = a.C[b];
        b = a.A[b];
        x(c) && -1 != c && sl(a.B, c);
        return b
    }

    tl.prototype.clear = function () {
        this.B.clear();
        this.A = {};
        this.C = {}
    };
    tl.prototype.D = function (a) {
        this.F(a, this.A[a]);
        delete this.C[a];
        delete this.A[a]
    };
    function wl() {
        this.height = this.width = this.N = this.M = this.D = this.F = this.K = this.G = this.C = this.B = this.A = this.L = this.J = this.I = this.H = void 0
    };
    function xl() {
        return new Float64Array(3)
    }

    function yl(a, b, c, d) {
        a[0] = b;
        a[1] = c;
        a[2] = d;
        return a
    }

    function zl(a, b) {
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2]
    }

    function Al(a, b, c) {
        c[0] = a[0] + b[0];
        c[1] = a[1] + b[1];
        c[2] = a[2] + b[2]
    }

    function Bl(a, b, c) {
        c[0] = a[0] - b[0];
        c[1] = a[1] - b[1];
        c[2] = a[2] - b[2]
    }

    function Cl(a, b, c) {
        c[0] = a[0] * b;
        c[1] = a[1] * b;
        c[2] = a[2] * b
    }

    function Dl(a) {
        var b = a[0], c = a[1];
        a = a[2];
        return Math.sqrt(b * b + c * c + a * a)
    }

    function El(a, b) {
        var c = a[0], d = a[1];
        a = a[2];
        var e = 1 / Math.sqrt(c * c + d * d + a * a);
        b[0] = c * e;
        b[1] = d * e;
        b[2] = a * e
    }

    function Fl(a, b, c) {
        var d = a[0], e = a[1];
        a = a[2];
        var f = b[0], g = b[1];
        b = b[2];
        c[0] = e * b - a * g;
        c[1] = a * f - d * b;
        c[2] = d * g - e * f
    }

    function Gl(a, b) {
        var c = a[0] - b[0], d = a[1] - b[1];
        a = a[2] - b[2];
        return c * c + d * d + a * a
    };
    function Hl() {
        return new Float64Array(4)
    }

    function Il(a, b, c) {
        c[0] = a[0] * b;
        c[1] = a[1] * b;
        c[2] = a[2] * b;
        c[3] = a[3] * b
    };
    function Jl() {
        return new Float64Array(16)
    }

    function Kl(a, b) {
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
        a[15] = b[15]
    }

    function Ll(a, b) {
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
        a[15] = b[15]
    }

    function Ml(a, b, c) {
        b *= 4;
        c[0] = a[b];
        c[1] = a[b + 1];
        c[2] = a[b + 2];
        c[3] = a[b + 3]
    }

    function Nl(a, b, c) {
        a[b] = c[0];
        a[b + 4] = c[1];
        a[b + 8] = c[2];
        a[b + 12] = c[3]
    }

    function Ol(a, b) {
        var c = Pl;
        b[0] = c[a];
        b[1] = c[a + 4];
        b[2] = c[a + 8];
        b[3] = c[a + 12]
    }

    function Ql(a) {
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 0;
        a[5] = 1;
        a[6] = 0;
        a[7] = 0;
        a[8] = 0;
        a[9] = 0;
        a[10] = 1;
        a[11] = 0;
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1
    }

    function Rl(a, b, c) {
        var d = a[0], e = a[1], f = a[2], g = a[3], k = a[4], l = a[5], m = a[6], n = a[7], p = a[8], r = a[9], u = a[10], t = a[11], v = a[12], y = a[13], D = a[14];
        a = a[15];
        var z = b[0], A = b[1], B = b[2], R = b[3], N = b[4], H = b[5], T = b[6], S = b[7], qa = b[8], oa = b[9], sa = b[10], ca = b[11], fa = b[12], fb = b[13], jb = b[14];
        b = b[15];
        c[0] = d * z + k * A + p * B + v * R;
        c[1] = e * z + l * A + r * B + y * R;
        c[2] = f * z + m * A + u * B + D * R;
        c[3] = g * z + n * A + t * B + a * R;
        c[4] = d * N + k * H + p * T + v * S;
        c[5] = e * N + l * H + r * T + y * S;
        c[6] = f * N + m * H + u * T + D * S;
        c[7] = g * N + n * H + t * T + a * S;
        c[8] = d * qa + k * oa + p * sa + v * ca;
        c[9] = e * qa + l * oa + r * sa + y * ca;
        c[10] = f * qa + m *
            oa + u * sa + D * ca;
        c[11] = g * qa + n * oa + t * sa + a * ca;
        c[12] = d * fa + k * fb + p * jb + v * b;
        c[13] = e * fa + l * fb + r * jb + y * b;
        c[14] = f * fa + m * fb + u * jb + D * b;
        c[15] = g * fa + n * fb + t * jb + a * b
    }

    function Sl(a, b) {
        var c = a[0], d = a[1], e = a[2], f = a[3], g = a[4], k = a[5], l = a[6], m = a[7], n = a[8], p = a[9], r = a[10], u = a[11], t = a[12], v = a[13], y = a[14];
        a = a[15];
        var D = c * k - d * g, z = c * l - e * g, A = c * m - f * g, B = d * l - e * k, R = d * m - f * k, N = e * m - f * l, H = n * v - p * t, T = n * y - r * t, S = n * a - u * t, qa = p * y - r * v, oa = p * a - u * v, sa = r * a - u * y, ca = D * sa - z * oa + A * qa + B * S - R * T + N * H;
        0 != ca && (ca = 1 / ca, b[0] = (k * sa - l * oa + m * qa) * ca, b[1] = (-d * sa + e * oa - f * qa) * ca, b[2] = (v * N - y * R + a * B) * ca, b[3] = (-p * N + r * R - u * B) * ca, b[4] = (-g * sa + l * S - m * T) * ca, b[5] = (c * sa - e * S + f * T) * ca, b[6] = (-t * N + y * A - a * z) * ca, b[7] = (n * N - r * A + u * z) * ca, b[8] =
            (g * oa - k * S + m * H) * ca, b[9] = (-c * oa + d * S - f * H) * ca, b[10] = (t * R - v * A + a * D) * ca, b[11] = (-n * R + p * A - u * D) * ca, b[12] = (-g * qa + k * T - l * H) * ca, b[13] = (c * qa - d * T + e * H) * ca, b[14] = (-t * B + v * z - y * D) * ca, b[15] = (n * B - p * z + r * D) * ca)
    }

    function Tl(a, b, c) {
        var d = b[0], e = b[1];
        b = b[2];
        c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
        c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
        c[2] = d * a[2] + e * a[6] + b * a[10] + a[14]
    }

    function Ul(a, b, c) {
        var d = b[0], e = b[1];
        b = b[2];
        c[0] = d * a[0] + e * a[4] + b * a[8];
        c[1] = d * a[1] + e * a[5] + b * a[9];
        c[2] = d * a[2] + e * a[6] + b * a[10]
    }

    function Vl(a, b, c) {
        var d = b[0], e = b[1], f = b[2];
        b = b[3];
        c[0] = d * a[0] + e * a[4] + f * a[8] + b * a[12];
        c[1] = d * a[1] + e * a[5] + f * a[9] + b * a[13];
        c[2] = d * a[2] + e * a[6] + f * a[10] + b * a[14];
        c[3] = d * a[3] + e * a[7] + f * a[11] + b * a[15]
    }

    function Wl(a, b, c, d) {
        var e = Xl[0];
        Bl(c, b, e);
        El(e, e);
        e[3] = 0;
        c = Xl[1];
        Fl(e, d, c);
        El(c, c);
        c[3] = 0;
        d = Xl[2];
        Fl(c, e, d);
        El(d, d);
        d[3] = 0;
        e[0] = -e[0];
        e[1] = -e[1];
        e[2] = -e[2];
        Nl(a, 0, c);
        Nl(a, 1, d);
        Nl(a, 2, e);
        a[3] = 0;
        a[7] = 0;
        a[11] = 0;
        a[15] = 1;
        Yl(a, -b[0], -b[1], -b[2])
    }

    function Yl(a, b, c, d) {
        a[12] += a[0] * b + a[4] * c + a[8] * d;
        a[13] += a[1] * b + a[5] * c + a[9] * d;
        a[14] += a[2] * b + a[6] * c + a[10] * d;
        a[15] += a[3] * b + a[7] * c + a[11] * d
    }

    function Zl(a, b, c, d) {
        a[0] *= b;
        a[1] *= b;
        a[2] *= b;
        a[3] *= b;
        a[4] *= c;
        a[5] *= c;
        a[6] *= c;
        a[7] *= c;
        a[8] *= d;
        a[9] *= d;
        a[10] *= d;
        a[11] *= d;
        a[12] = a[12];
        a[13] = a[13];
        a[14] = a[14];
        a[15] = a[15]
    }

    function $l(a, b) {
        var c = a[4], d = a[5], e = a[6], f = a[7], g = a[8], k = a[9], l = a[10], m = a[11], n = Math.cos(b);
        b = Math.sin(b);
        a[4] = c * n + g * b;
        a[5] = d * n + k * b;
        a[6] = e * n + l * b;
        a[7] = f * n + m * b;
        a[8] = c * -b + g * n;
        a[9] = d * -b + k * n;
        a[10] = e * -b + l * n;
        a[11] = f * -b + m * n
    }

    function am(a, b) {
        var c = a[0], d = a[1], e = a[2], f = a[3], g = a[8], k = a[9], l = a[10], m = a[11], n = Math.cos(b);
        b = Math.sin(b);
        a[0] = c * n + g * -b;
        a[1] = d * n + k * -b;
        a[2] = e * n + l * -b;
        a[3] = f * n + m * -b;
        a[8] = c * b + g * n;
        a[9] = d * b + k * n;
        a[10] = e * b + l * n;
        a[11] = f * b + m * n
    }

    function bm(a, b) {
        var c = a[0], d = a[1], e = a[2], f = a[3], g = a[4], k = a[5], l = a[6], m = a[7], n = Math.cos(b);
        b = Math.sin(b);
        a[0] = c * n + g * b;
        a[1] = d * n + k * b;
        a[2] = e * n + l * b;
        a[3] = f * n + m * b;
        a[4] = c * -b + g * n;
        a[5] = d * -b + k * n;
        a[6] = e * -b + l * n;
        a[7] = f * -b + m * n
    }

    var Xl = [Hl(), Hl(), Hl()];

    function cm(a, b) {
        var c = 2 * Math.atan(Math.exp(a[1])) - Math.PI / 2;
        dm(a[0], c, 6371010 * a[2] * Math.cos(c), b, 6371010)
    }

    function em(a, b) {
        var c = a[0], d = a[1], e = a[2];
        a = Math.atan2(e, Math.sqrt(c * c + d * d));
        e = Math.sqrt(c * c + d * d + e * e) - 6371010;
        b[0] = Math.atan2(d, c);
        b[1] = a;
        b[2] = e;
        c = b[1];
        d = b[2];
        a = Math.sin(c);
        b[1] = .5 * Math.log((1 + a) / (1 - a));
        b[2] = d / (6371010 * Math.cos(c))
    }

    function fm(a, b, c, d) {
        a = Jb(a);
        b = Jb(b);
        b = Eb(b, -1.48442222974533, 1.48442222974533);
        d[0] = a;
        a = Math.sin(b);
        d[1] = .5 * Math.log((1 + a) / (1 - a));
        d[2] = c / (6371010 * Math.cos(b))
    }

    function gm(a, b, c, d, e) {
        b = 2 * Math.atan(Math.exp(b)) - Math.PI / 2;
        c = c * (e || 6371010) * Math.cos(b);
        d[0] = a;
        d[1] = b;
        d[2] = c
    }

    function hm(a) {
        a = Jb(a);
        a = Eb(a, -1.48442222974533, 1.48442222974533);
        return 1 / (6371010 * Math.cos(a))
    }

    function im(a, b, c, d, e) {
        dm(Jb(a), Jb(b), c, d, e)
    }

    function dm(a, b, c, d, e) {
        var f = Math.cos(b);
        c += e || 6371010;
        yl(d, c * f * Math.cos(a), c * f * Math.sin(a), c * Math.sin(b))
    }

    var jm = xl(), km = xl(), lm = xl(), mm = xl();
    var nm = new wl, om = xl();

    function pm(a, b) {
        var c = lh(a), d = nh(a), e = jh(a);
        a = ih(a);
        nm.H = void 0;
        nm.I = void 0;
        nm.J = void 0;
        nm.M = void 0;
        nm.N = void 0;
        nm.G = -Jb(th(c));
        nm.K = Jb(M(c, 1));
        nm.F = -Jb(M(c, 2));
        nm.D = Jb(a);
        nm.width = d.W();
        nm.height = vh(d);
        fm(ph(e), qh(e), rh(e), om);
        nm.A = om[0];
        nm.B = om[1];
        nm.C = om[2];
        c = 1 * hm(qh(e));
        d = Math.abs(om[2]);
        nm.L = d > c ? d : c;
        qm(b, nm);
        b.ea = 0
    };
    function rm(a, b) {
        ol.call(this);
        this.S = a;
        this.D = [];
        this.G = [];
        this.H = new tl(b || 8)
    }

    G(rm, ol);
    q = rm.prototype;
    q.yc = function (a) {
        pm(a, this.S)
    };
    q.hc = function (a) {
        this.D = [];
        for (var b = 0; b < a.length; ++b)a[b] && this.D.push(a[b])
    };
    q.Qa = function () {
        this.ac();
        this.Pd()
    };
    q.ac = function () {
        var a;
        for (a = 0; a < this.G.length; ++a) {
            var b = this.G[a], b = sm(this, b);
            b.F()
        }
        for (a = 0; a < this.D.length; ++a)b = this.D[a], b = sm(this, b), b.F()
    };
    q.Pd = function () {
        for (var a = 0; a < this.D.length; ++a) {
            var b = sm(this, this.D[a]);
            this.B(b)
        }
    };
    function sm(a, b) {
        var c = vl(a.H, b.id());
        c || (c = a.I(b), ul(a.H, b.id(), c));
        return c
    }

    q.clear = function () {
        this.H.clear();
        this.D = [];
        this.G = []
    };
    q.zc = C;
    q.bd = C;
    q.ad = da(!0);
    function tm(a, b) {
        rm.call(this, a);
        this.A = b;
        this.C = b.canvas;
        this.F = null
    }

    G(tm, rm);
    var um = ok(), vm = zk(), wm = zk(), xm = zk(), ym = sk(), zm = [sk(), sk(), sk(), sk()];
    tm.prototype.Pd = function () {
        for (var a = 0; a < this.D.length; ++a) {
            var b = sm(this, this.D[a]);
            this.B(b)
        }
    };
    tm.prototype.I = function (a) {
        return new lk(a)
    };
    tm.prototype.B = function (a) {
        if (a.Ba() && this.F) {
            for (var b = a.D.A, c = Am(this.F), d = this.C.width, e = this.C.height, f = !1, g = 0; 4 > g; ++g) {
                tk(ym, b[3 * g], b[3 * g + 1], b[3 * g + 2], 1);
                var k = zm[g];
                xk(c, ym, k);
                var l = k[2] < -k[3] || k[1] < -k[3] || k[0] < -k[3] || k[2] > +k[3] || k[1] > +k[3] || k[0] > +k[3], f = f || l;
                k[0] = (k[0] / k[3] + 1) * d / 2;
                k[1] = (-k[1] / k[3] + 1) * e / 2
            }
            f || (b = a.A, c = (b[2] + b[3]) / 2, vm[0] = (b[0] + b[1]) / 2, vm[1] = c, c = b[5], wm[0] = b[4], wm[1] = c, c = b[7], xm[0] = b[6], xm[1] = c, Bk(zm[0], zm[1], ym), ym[0] *= .5, ym[1] *= .5, kk.ze(ym, vm, zm[2], wm, zm[3], xm, um) && (b = this.A,
                b.save(), b.setTransform(um[0], um[1], um[3], um[4], um[6], um[7]), b.drawImage(a.Aa(), 0, 0), b.restore()))
        }
    };
    function Bm(a, b) {
        this.origin = new Float64Array(3);
        a && rk(this.origin, a);
        this.A = new Float64Array(3);
        b && rk(this.A, b)
    }

    Bm.prototype.set = function (a, b) {
        rk(this.origin, a);
        rk(this.A, b)
    };
    function Cm(a) {
        this.ea = a || 0;
        this.X = uk();
        this.ia = uk();
        this.ja = uk();
        this.M = xl();
        this.na = Hl();
        yl(xl(), 1, 1, 1);
        this.N = Jl();
        this.$ = !0;
        this.G = this.F = this.D = 0;
        this.I = 1;
        this.U = this.P = this.O = this.C = this.B = this.A = 0;
        this.K = .4363323129985824;
        this.L = 1 / 3;
        this.J = Number.MAX_VALUE;
        this.Y = this.H = this.aa = 1;
        this.fa = []
    }

    Cm.prototype.W = h("aa");
    function qm(a, b) {
        var c = !1, d = !1, e = !1, f = !1, g = !1;
        x(b.H) && (b.H != a.D && (g = !0, a.D = b.H), c = !0);
        x(b.I) && (b.I != a.F && (g = !0, a.F = b.I), c = !0);
        x(b.J) && (b.J != a.G && (g = !0, a.G = b.J), c = !0);
        x(b.L) && (b.L != a.I && (g = !0, a.I = b.L), d = !0);
        x(b.A) && (b.A != a.A && (g = !0, a.A = b.A), e = !0);
        x(b.B) && (b.B != a.B && (g = !0, a.B = b.B), e = !0);
        x(b.C) && (b.C != a.C && (g = !0, a.C = b.C), e = !0);
        x(b.G) && (b.G != a.O && (g = !0, a.O = b.G), f = !0);
        x(b.K) && (b.K != a.P && (g = !0, a.P = b.K), f = !0);
        x(b.F) && (b.F != a.U && (g = !0, a.U = b.F), f = !0);
        x(b.D) && b.D != a.K && (g = !0, a.K = b.D);
        x(b.M) && b.M != a.L && (g = !0,
            a.L = b.M);
        x(b.N) && b.N != a.J && (g = !0, a.J = b.N);
        x(b.width) && b.width != a.aa && (g = !0, a.aa = b.width);
        x(b.height) && b.height != a.H && (g = !0, a.H = b.height);
        if (g)for (!f || c || e || (e = !0), !d && e && c && (b = a.A - a.D, d = a.B - a.F, f = a.C - a.G, a.I = Math.sqrt(b * b + d * d + f * f)), e && !c && (Dm(a, a.M), a.D = a.A + a.M[0], a.F = a.B + a.M[1], a.G = a.C + a.M[2]), c && !e && (Dm(a, a.M), a.A = a.D - a.M[0], a.B = a.F - a.M[1], a.C = a.G - a.M[2]), a.$ = !0, a.Y++, c = 0; c < a.fa.length; c++)a.fa[c]()
    }

    function Em(a, b) {
        b = b || new wl;
        b.H = a.D;
        b.I = a.F;
        b.J = a.G;
        b.L = a.I;
        b.A = a.A;
        b.B = a.B;
        b.C = a.C;
        b.G = a.O;
        b.K = a.P;
        b.F = a.U;
        b.D = a.K;
        b.M = a.L;
        b.N = a.J;
        b.width = a.W();
        b.height = a.H;
        return b
    }

    function Fm(a) {
        Gm(a);
        return a.X
    }

    function Gm(a) {
        if (a.$) {
            var b = a.X, c = a.W() / a.H, d = a.L, e = a.J, f = a.K / 2, g = e - d, k = Math.sin(f);
            0 != g && 0 != k && 0 != c && (f = Math.cos(f) / k, b[0] = f / c, b[1] = 0, b[2] = 0, b[3] = 0, b[4] = 0, b[5] = f, b[6] = 0, b[7] = 0, b[8] = 0, b[9] = 0, b[10] = -(e + d) / g, b[11] = -1, b[12] = 0, b[13] = 0, b[14] = -(2 * d * e) / g, b[15] = 0);
            b = a.ja;
            e = -a.U;
            f = -a.P;
            d = -a.O;
            c = Math.cos(e);
            e = Math.sin(e);
            g = Math.cos(f);
            f = Math.sin(f);
            k = Math.cos(d);
            d = Math.sin(d);
            b[0] = c * k - g * e * d;
            b[1] = g * c * d + k * e;
            b[2] = d * f;
            b[3] = 0;
            b[4] = -c * d - k * g * e;
            b[5] = c * g * k - e * d;
            b[6] = k * f;
            b[7] = 0;
            b[8] = f * e;
            b[9] = -c * f;
            b[10] = g;
            b[11] = 0;
            b[12] =
                0;
            b[13] = 0;
            b[14] = 0;
            b[15] = 1;
            wk(a.X, a.ja, a.X);
            e = 1 / a.I;
            b = a.X;
            c = e * (a.D - a.A);
            d = e * (a.F - a.B);
            e *= a.G - a.C;
            b[12] += b[0] * c + b[4] * d + b[8] * e;
            b[13] += b[1] * c + b[5] * d + b[9] * e;
            b[14] += b[2] * c + b[6] * d + b[10] * e;
            b[15] += b[3] * c + b[7] * d + b[11] * e;
            var l = a.X, b = a.ia, c = l[0], d = l[1], e = l[2], g = l[3], f = l[4], k = l[5], m = l[6], n = l[7], p = l[8], r = l[9], u = l[10], t = l[11], v = l[12], y = l[13], D = l[14], l = l[15], z = c * k - d * f, A = c * m - e * f, B = c * n - g * f, R = d * m - e * k, N = d * n - g * k, H = e * n - g * m, T = p * y - r * v, S = p * D - u * v, qa = p * l - t * v, oa = r * D - u * y, sa = r * l - t * y, ca = u * l - t * D, fa = z * ca - A * sa + B * oa + R * qa - N * S + H * T;
            0 !=
            fa && (fa = 1 / fa, b[0] = (k * ca - m * sa + n * oa) * fa, b[1] = (-d * ca + e * sa - g * oa) * fa, b[2] = (y * H - D * N + l * R) * fa, b[3] = (-r * H + u * N - t * R) * fa, b[4] = (-f * ca + m * qa - n * S) * fa, b[5] = (c * ca - e * qa + g * S) * fa, b[6] = (-v * H + D * B - l * A) * fa, b[7] = (p * H - u * B + t * A) * fa, b[8] = (f * sa - k * qa + n * T) * fa, b[9] = (-c * sa + d * qa - g * T) * fa, b[10] = (v * N - y * B + l * z) * fa, b[11] = (-p * N + r * B - t * z) * fa, b[12] = (-f * oa + k * S - m * T) * fa, b[13] = (c * oa - d * S + e * T) * fa, b[14] = (-v * R + y * A - D * z) * fa, b[15] = (p * R - r * A + u * z) * fa);
            a.$ = !1
        }
    }

    function Hm(a, b, c, d) {
        d = d || new Bm;
        var e = a.M, f = a.L, g = a.J;
        e[0] = b;
        e[1] = c;
        e[2] = g / (g - f);
        b = e || xl();
        c = e[1];
        var k = e[2];
        b[0] = 2 * e[0] / a.W() - 1;
        b[1] = 2 * -c / a.H + 1;
        b[2] = 2 * k - 1;
        e[2] = (g + f) / (g - f);
        f = a.N;
        Gm(a);
        Ll(f, a.ia);
        Tl(a.N, e, d.A);
        El(d.A, d.A);
        yl(d.origin, a.A, a.B, a.C)
    }

    function Dm(a, b) {
        yl(b, 0, 0, -a.I);
        var c = a.N, d = a.O, e = a.P, f = a.U, g = Math.cos(d), d = Math.sin(d), k = Math.cos(e), e = Math.sin(e), l = Math.cos(f), f = Math.sin(f);
        c[0] = g * l - k * d * f;
        c[1] = k * g * f + l * d;
        c[2] = f * e;
        c[3] = 0;
        c[4] = -g * f - l * k * d;
        c[5] = g * k * l - d * f;
        c[6] = l * e;
        c[7] = 0;
        c[8] = e * d;
        c[9] = -g * e;
        c[10] = k;
        c[11] = 0;
        c[12] = 0;
        c[13] = 0;
        c[14] = 0;
        c[15] = 1;
        Ul(a.N, b, b)
    };
    function Im(a, b) {
        this.A = a;
        this.B = b;
        this.L = this.B.getContext("2d");
        this.G = [];
        this.F = this.C = 0;
        this.D = new tm(new Cm, this.A);
        this.J = "black"
    }

    var Jm = sk(), Km = zk(), Lm = zk(), Mm = zk(), Nm = zk(), Om = sk(), Pm = sk(), Qm = sk(), Rm = sk(), Sm = null, Tm = ok(), Um = ok();
    Im.prototype.H = function () {
        var a = this.A.canvas;
        this.A.clearRect(0, 0, a.width, a.height);
        this.A.fillStyle = this.J;
        this.A.fillRect(0, 0, a.width, a.height)
    };
    Im.prototype.I = function (a, b, c) {
        var d = M(b, 0);
        if (0 != d) {
            if (1 == d) Vm(this, c, this.A); else {
                if (this.A.canvas.width != this.B.width || this.A.canvas.height != this.B.height) this.B.width = this.A.canvas.width, this.B.height = this.A.canvas.height;
                this.L.clearRect(0, 0, this.B.width, this.B.height);
                Vm(this, c, this.L);
                this.A.globalAlpha = d;
                this.A.drawImage(this.B, 0, 0);
                this.A.globalAlpha = 1
            }
            b = M(b, 4);
            a = a.Ob();
            0 < b && 0 < a.length && (this.D.hc(a), this.D.F = c, this.D.Qa())
        }
    };
    function Vm(a, b, c) {
        var d = Wm(b);
        b = Am(b);
        for (var e = 0, f = d.length; e < f; ++e) {
            var g = a, k = d[e], l = b, m = c;
            if (k.Ba()) {
                var n = m.canvas.width, p = m.canvas.height;
                Jm[0] = n / 2;
                Jm[1] = -p / 2;
                Jm[2] = n / 2;
                Jm[3] = p / 2;
                var n = k.Uc().Aa(), p = Xm(k), r = k.I, u = Ym(k), t = u.length / 3, k = Sm;
                if (!k || k.length < 4 * t) k = Sm = new Float32Array(4 * t);
                for (var v = 0; v < t; ++v) {
                    var y = Om, D = Pm;
                    tk(y, u[3 * v], u[3 * v + 1], u[3 * v + 2], 1);
                    xk(l, y, D);
                    k[4 * v + 0] = D[0];
                    k[4 * v + 1] = D[1];
                    k[4 * v + 2] = D[2];
                    k[4 * v + 3] = D[3]
                }
                for (v = 0; v < p.length - 2; ++v)if (g.C = 0, y = p[v], t = p[v + 1], D = p[v + 2], y != t && t != D && D != y) {
                    if (v <
                        p.length - 3 && (u = p[v + 3], t != u && u != D)) {
                        var l = g, z = y, A = t, B = u, R = D, t = k, N = r, D = n, u = m;
                        Zm(t, z, Om);
                        Zm(t, A, Pm);
                        Zm(t, B, Qm);
                        Zm(t, R, Rm);
                        var y = $m(Om), H = $m(Pm), T = $m(Qm), S = $m(Rm);
                        if (!(y & H & T & S))if ((y | H | T | S) & 1) an(l, z, A, B, t, N, D, u), an(l, z, B, R, t, N, D, u); else {
                            bn(Om);
                            bn(Pm);
                            bn(Qm);
                            bn(Rm);
                            t = cn(l);
                            y = cn(l);
                            H = cn(l);
                            T = cn(l);
                            dn(N, z, t);
                            dn(N, A, y);
                            dn(N, B, H);
                            dn(N, R, T);
                            N = cn(l);
                            S = cn(l);
                            A = cn(l);
                            z = cn(l);
                            Ck(Pm, Om, N);
                            Ck(Qm, Pm, S);
                            Ck(Rm, Qm, A);
                            Ck(Om, Rm, z);
                            R = B = A;
                            R[0] = -1 * B[0];
                            R[1] = -1 * B[1];
                            Bk(N, A, N);
                            B = A = z;
                            B[0] = -1 * A[0];
                            B[1] = -1 * A[1];
                            Bk(S, z, S);
                            var A =
                                cn(l), B = cn(l), R = cn(l), z = cn(l), qa = A, oa = B, sa = R, ca = z, fa = 1 / (N[0] * S[1] - N[1] * S[0]), fb = fa * S[1], jb = fa * -S[0], Ib = fa * -N[1], sc = fa * N[0], Pa = fb * Om[0] + jb * Om[1], fa = Ib * Om[0] + sc * Om[1], ae = fb * Pm[0] + jb * Pm[1], Ui = Ib * Pm[0] + sc * Pm[1], Vi = fb * Qm[0] + jb * Qm[1], Wi = Ib * Qm[0] + sc * Qm[1], fb = fb * Rm[0] + jb * Rm[1], sc = Ib * Rm[0] + sc * Rm[1], Ib = en(Pa, ae, Vi, fb), jb = en(fa, Ui, Wi, sc), Pa = fn(Pa, ae, Vi, fb), fa = fn(fa, Ui, Wi, sc);
                            qa[0] = N[0] * Ib + S[0] * jb;
                            qa[1] = N[1] * Ib + S[1] * jb;
                            oa[0] = N[0] * Pa + S[0] * jb;
                            oa[1] = N[1] * Pa + S[1] * jb;
                            sa[0] = N[0] * Pa + S[0] * fa;
                            sa[1] = N[1] * Pa + S[1] * fa;
                            ca[0] =
                                N[0] * Ib + S[0] * fa;
                            ca[1] = N[1] * Ib + S[1] * fa;
                            N = fn(Dk(Om, A), Dk(Pm, B), Dk(Qm, R), Dk(Rm, z));
                            kk.ze(A, t, B, y, R, H, Tm) && (A = cn(l), A[0] = Tm[0] * T[0] + Tm[3] * T[1] + Tm[6], A[1] = Tm[1] * T[0] + Tm[4] * T[1] + Tm[7], z = Dk(z, A), 4 < N || 4 < z ? (gn(l, Om, t, Pm, y, Rm, T, D, u), gn(l, Rm, T, Pm, y, Qm, H, D, u)) : (t = cn(l), y = cn(l), H = cn(l), T = cn(l), Ak(t, Om), Ak(y, Pm), Ak(H, Qm), Ak(T, Rm), z = y, A = H, B = T, R = (t[0] + z[0] + A[0] + B[0]) / 4, N = (t[1] + z[1] + A[1] + B[1]) / 4, hn(t, R, N), hn(z, R, N), hn(A, R, N), hn(B, R, N), u.save(), u.beginPath(), u.moveTo(t[0], t[1]), u.lineTo(y[0], y[1]), u.lineTo(H[0], H[1]),
                                    u.lineTo(T[0], T[1]), u.closePath(), u.clip(), u.setTransform(Tm[0], Tm[1], Tm[3], Tm[4], Tm[6], Tm[7]), u.drawImage(D, 0, 0), u.restore(), ++l.F))
                        }
                        ++v;
                        continue
                    }
                    an(g, y, t, D, k, r, n, m)
                }
            }
        }
        a.F = 0
    }

    function cn(a) {
        a.C == a.G.length && (a.G[a.C] = zk());
        return a.G[a.C++]
    }

    function Zm(a, b, c) {
        tk(c, a[4 * b], a[4 * b + 1], a[4 * b + 2], a[4 * b + 3])
    }

    function dn(a, b, c) {
        var d = a[2 * b + 1];
        c[0] = a[2 * b];
        c[1] = d
    }

    function $m(a) {
        return (a[2] < -a[3]) << 0 | (a[1] < -a[3]) << 1 | (a[0] < -a[3]) << 2 | (a[2] > +a[3]) << 3 | (a[1] > +a[3]) << 4 | (a[0] > +a[3]) << 5
    }

    function bn(a) {
        a[0] = a[0] / a[3] * Jm[0] + Jm[2];
        a[1] = a[1] / a[3] * Jm[1] + Jm[3]
    }

    function fn(a, b, c, d) {
        a = b > a ? b : a;
        a = c > a ? c : a;
        return d > a ? d : a
    }

    function en(a, b, c, d) {
        a = b < a ? b : a;
        a = c < a ? c : a;
        return d < a ? d : a
    }

    function an(a, b, c, d, e, f, g, k) {
        var l = Om, m = Pm, n = Qm;
        Zm(e, b, l);
        Zm(e, c, m);
        Zm(e, d, n);
        e = $m(l);
        var p = $m(m), r = $m(n);
        if (!(e & p & r)) {
            var u = Km, t = Lm, v = Mm;
            dn(f, b, u);
            dn(f, c, t);
            dn(f, d, v);
            f = (e & 1) + (p & 1) + (r & 1);
            if (1 == f) {
                for (; !(e & 1);)f = e, e = p, p = r, r = f, f = l, l = m, m = n, n = f, f = u, u = t, t = v, v = f, f = b, b = c, c = d, d = f;
                jn(l, n, Rm, u, v, Nm);
                jn(l, m, l, u, t, u);
                bn(l);
                bn(m);
                bn(n);
                bn(Rm);
                gn(a, l, u, m, t, Rm, Nm, g, k);
                gn(a, m, t, n, v, Rm, Nm, g, k)
            } else {
                if (2 == f) {
                    for (; e & 1;)f = e, e = p, p = r, r = f, f = l, l = m, m = n, n = f, f = u, u = t, t = v, v = f, f = b, b = c, c = d, d = f;
                    jn(l, m, m, u, t, t);
                    jn(l, n, n, u, v, v)
                }
                bn(l);
                bn(m);
                bn(n);
                gn(a, l, u, m, t, n, v, g, k)
            }
        }
    }

    function gn(a, b, c, d, e, f, g, k, l) {
        kk.ze(b, c, d, e, f, g, Um) && (c = cn(a), e = cn(a), g = cn(a), Ak(c, b), Ak(e, d), Ak(g, f), b = (c[0] + e[0] + g[0]) / 3, d = (c[1] + e[1] + g[1]) / 3, hn(c, b, d), hn(e, b, d), hn(g, b, d), l.save(), l.beginPath(), l.moveTo(c[0], c[1]), l.lineTo(e[0], e[1]), l.lineTo(g[0], g[1]), l.closePath(), l.clip(), l.setTransform(Um[0], Um[1], Um[3], Um[4], Um[6], Um[7]), l.drawImage(k, 0, 0), l.restore(), ++a.F)
    }

    function jn(a, b, c, d, e, f) {
        var g = -a[2] - a[3], g = g / (g - (-b[2] - b[3])), k = a[0], l = a[1], m = a[2];
        a = a[3];
        c[0] = (b[0] - k) * g + k;
        c[1] = (b[1] - l) * g + l;
        c[2] = (b[2] - m) * g + m;
        c[3] = (b[3] - a) * g + a;
        b = d[0];
        d = d[1];
        f[0] = (e[0] - b) * g + b;
        f[1] = (e[1] - d) * g + d
    }

    function hn(a, b, c) {
        b = a[0] - b;
        c = a[1] - c;
        var d = Math.sqrt(b * b + c * c);
        1E-6 < d && (a[0] += 3 * b / d, a[1] += 3 * c / d)
    }

    Im.prototype.K = function (a) {
        this.J = 1 == a ? "white" : "black"
    };
    function kn(a, b, c, d) {
        this.C = a;
        this.D = b;
        this.B = c;
        this.I = d;
        this.J = a + "|" + b + "|" + c
    }

    kn.prototype.Ja = h("I");
    kn.prototype.toString = h("J");
    function ln(a, b, c, d, e) {
        kn.call(this, a, b, c, d);
        this.H = e
    }

    G(ln, kn);
    ln.prototype.Aa = da(null);
    ln.prototype.Ba = da(!0);
    ln.prototype.G = C;
    function mn(a, b, c, d, e) {
        ln.call(this, a, b, c, d, e);
        this.A = null
    }

    G(mn, ln);
    mn.prototype.Ba = function () {
        return !!this.A
    };
    mn.prototype.Aa = h("A");
    mn.prototype.G = function () {
        if (!this.Ba()) {
            var a;
            a = this.Ja();
            if (!bc) {
                var b = a.width, c = a.height, d = bk("canvas");
                d.width = b + 2;
                d.height = c + 2;
                var e = d.getContext("2d");
                e.drawImage(a, 0, 0, b, c, 1, 1, b, c);
                e.drawImage(a, 0, 0, b, 1, 1, 0, b, 1);
                e.drawImage(a, 0, c - 1, b, 1, 1, c + 1, b, 1);
                e.drawImage(d, 1, 0, 1, c + 2, 0, 0, 1, c + 1 + 2);
                e.drawImage(d, b, 0, 1, c + 2, b + 1, 0, 1, c + 1 + 2);
                a = d
            }
            this.A = a
        }
    };
    function nn(a) {
        this.length = a.length || a;
        for (var b = 0; b < this.length; b++)this[b] = a[b] || 0
    }

    nn.prototype.A = 2;
    nn.prototype.set = function (a, b) {
        b = b || 0;
        for (var c = 0; c < a.length && b + c < this.length; c++)this[b + c] = a[c]
    };
    nn.prototype.toString = function () {
        return Array.prototype.join(this)
    };
    "undefined" == typeof Uint16Array && (nn.BYTES_PER_ELEMENT = 2, nn.prototype.BYTES_PER_ELEMENT = nn.prototype.A, nn.prototype.set = nn.prototype.set, nn.prototype.toString = nn.prototype.toString, Ga("Uint16Array", nn));
    var on = Hl(), pn = Hl();

    function qn(a) {
        a[0] = a[1] = a[2] = Infinity;
        a[3] = a[4] = a[5] = -Infinity
    }

    function rn(a, b) {
        for (var c = !0, d = 0; 6 > d; ++d) {
            var e;
            e = b[d];
            for (var f = e[3], g = e[3], k = 0; 3 > k; ++k)var l = 0 > e[k], m = l ? a[k] : a[3 + k], f = f + e[k] * (l ? a[3 + k] : a[k]), g = g + e[k] * m;
            e = 0 < f ? 1 : 0 < g ? 0 : -1;
            if (1 == e)return 0;
            0 == e && (c = !1)
        }
        return c ? 2 : 1
    };
    function sn(a, b, c, d, e, f) {
        this.D = a;
        this.$ = b;
        this.G = c;
        this.H = d;
        this.N = e;
        this.K = 0;
        this.aa = f || !1;
        this.P = 1;
        this.C = this.B = this.U = this.F = this.J = this.X = null;
        this.Y = !0
    }

    var tn = new Float32Array(3);
    q = sn.prototype;
    q.Uc = function () {
        var a = un(this, !0);
        a && a.B != this.K && (this.X = a);
        return a
    };
    q.wg = function () {
        if (!this.Eb())return !0;
        var a = un(this);
        return !!a && !a.Ba()
    };
    q.Me = function () {
        this.ee();
        var a = un(this);
        a && a.G()
    };
    q.Ne = function () {
        this.ee();
        var a = un(this, !0);
        a || (a = un(this));
        a && a.G()
    };
    q.Ba = function () {
        if (this.Eb()) {
            var a = this.Uc();
            return !!a && a.Ba()
        }
        return !1
    };
    q.Ag = function () {
        var a = vn(this, this.K);
        return !!a && a.Ba() && this.Eb()
    };
    q.Eb = da(!0);
    q.ee = C;
    function un(a, b) {
        for (var c = a.K; 0 <= c; --c) {
            var d = vn(a, c);
            if (d && (!b || d.Ba()))return d
        }
        for (var e = a.D.ma().A, e = Math.min(e, a.N), c = a.K + 1; c <= e; ++c)if ((d = vn(a, c)) && (!b || d.Ba()))return d;
        return null
    }

    function vn(a, b) {
        var c = Math.max(0, a.D.ma().A - b);
        (b = a.D.ub(a.G >> c, a.H >> c, b)) ? (c = a.$[b], c || (c = a.Ae(b, wn(a, b)), a.$[b] = c), a = c) : a = null;
        return a
    }

    function wn(a, b) {
        var c = a.D.ma();
        a = 1 << c.A - b.B;
        var d = b.C * a, e = b.D * a;
        b = xn(c, d);
        var f = xn(c, d + 1), g = yn(c, e), k = f - b, f = yn(c, e + 1) - g, l = c.C;
        d == Math.floor(l) && (k /= l - Math.floor(l));
        c = c.B;
        e == Math.floor(c) && (f /= c - Math.floor(c));
        c = 1 / k / a;
        a = 1 / f / a;
        return tk(sk(), c, a, -(b * c), -(g * a))
    }

    q.Ae = function (a, b) {
        return new ln(a.C, a.D, a.B, a.Ja(), b)
    };
    function Gn(a) {
        Hn(a);
        return a.J
    }

    function Ym(a) {
        Hn(a);
        return a.F
    }

    function In(a, b, c, d) {
        var e = b[c], f = b[c + 1];
        b = b[c + 2];
        d && (d = 10 / Math.sqrt(e * e + f * f + b * b), e *= d, f *= d, b *= d);
        e < a[0] && (a[0] = e);
        f < a[1] && (a[1] = f);
        b < a[2] && (a[2] = b);
        e > a[3] && (a[3] = e);
        f > a[4] && (a[4] = f);
        b > a[5] && (a[5] = b)
    }

    function Jn(a, b, c) {
        qn(b);
        var d = a.D.ma(), e = 1 << d.A - a.N, f = xn(d, a.G), g = xn(d, a.G + e), k = yn(d, a.H);
        a = yn(d, a.H + e);
        Kn(d, f, k, tn, 0);
        In(b, tn, 0, c);
        Kn(d, g, k, tn, 0);
        In(b, tn, 0, c);
        Kn(d, f, a, tn, 0);
        In(b, tn, 0, c);
        Kn(d, g, a, tn, 0);
        In(b, tn, 0, c);
        Kn(d, (f + g) / 2, (k + a) / 2, tn, 0);
        In(b, tn, 0, c)
    }

    function Xm(a) {
        Hn(a);
        return a.U
    }

    function Hn(a) {
        if (!(a.J && a.F && a.U && a.B))if (a.Y) {
            var b = a.D.ma();
            a.B || (a.B = new Float64Array(6));
            a.C || (a.C = new Float64Array(6));
            qn(a.B);
            qn(a.C);
            var c = 1 << b.A - a.N, d = 7 * c + 1, e = 7 * c + 1;
            a.J = new Float32Array(2 * d * e);
            a.F = new Float32Array(3 * d * e);
            for (var f = 0, g = xn(b, a.G), k = xn(b, a.G + c), l = yn(b, a.H), m = yn(b, a.H + c), c = 0; c < d; ++c)for (var n = c / (d - 1), p = 0; p < e; ++p) {
                var r = Gb(g, k, p / (e - 1)), u = Gb(l, m, n);
                a.J[2 * f] = r;
                a.J[2 * f + 1] = u;
                Kn(b, r, u, a.F, 3 * f);
                In(a.B, a.F, 3 * f);
                In(a.C, a.F, 3 * f, !0);
                ++f
            }
            b = [];
            for (c = f = 0; c < d - 1; c++)for (0 < c && (b[f++] = (c + 1) * e -
                1, b[f++] = c * e), p = 0; p < e; p++)b[f++] = c * e + p, b[f++] = (c + 1) * e + p;
            a.U = new Uint16Array(b)
        } else Ln(a)
    }

    function Ln(a) {
        var b = a.D.ma(), c = a.G, d = a.H, e = a.aa, f = 1 << b.A - a.N, g = Math.min(c + f, b.M), k = Math.min(d + f, b.G), f = [], l = Math.PI * (2 * xn(b, c) - 1), m = Math.PI * (2 * xn(b, g) - 1), n = Math.PI * (.5 - yn(b, d)), p = Math.PI * (.5 - yn(b, k)), r = Math.cos(n) * (m - l), u = Math.cos(p) * (m - l), e = Jb(e ? 8 : 4), t = 1;
        1 == b.G && (t = Math.max(1, Math.ceil((m - l) / e)));
        f[0] = Math.max(1, Math.ceil((n - p) / e));
        f[1] = Math.max(t, Math.ceil(r / e));
        f[2] = Math.max(t, Math.ceil(u / e));
        f[0] = Mn(f[0], k - d);
        f[1] = Mn(f[1], g - c);
        f[2] = Mn(f[2], g - c);
        0 == d && (f[1] = f[2]);
        c = Math.round(f[0]) + 1;
        l = Math.round(f[1]) +
            1;
        m = Math.round(f[2]) + 1;
        f = [];
        for (d = k = 0; d < c; ++d)for (f[d] = [], n = Math.round(Gb(l, m, d / (c - 1))), g = 0; g < n; ++g)f[d][g] = k++;
        a.B || (a.B = new Float64Array(6));
        a.C || (a.C = new Float64Array(6));
        qn(a.B);
        qn(a.C);
        a.J = new Float32Array(2 * k);
        a.F = new Float32Array(3 * k);
        k = 0;
        d = 1 << b.A - a.N;
        l = xn(b, a.G);
        m = xn(b, a.G + d);
        n = yn(b, a.H);
        p = yn(b, a.H + d);
        for (d = 0; d < c; ++d)for (r = d / (c - 1), u = f[d].length, g = 0; g < u; ++g)e = Gb(l, m, g / (u - 1)), t = Gb(n, p, r), a.J[2 * k] = e, a.J[2 * k + 1] = t, Kn(b, e, t, a.F, 3 * k), In(a.B, a.F, 3 * k), In(a.C, a.F, 3 * k, !0), ++k;
        b = [];
        for (d = k = 0; d < c - 1; d++)for (m =
                                                f[d].length, g = f[d + 1].length, 0 < d && (b[k++] = f[d][m - 1], b[k++] = f[d][0]), l = Math.max(m, g), m = (m - 1) / (l - 1), n = (g - 1) / (l - 1), g = 0; g < l; ++g)b[k++] = f[d][Math.round(g * m)], b[k++] = f[d + 1][Math.round(g * n)];
        a.U = new Uint16Array(b)
    };
    function Nn(a, b, c, d, e) {
        sn.call(this, a, b, c, d, e, !0);
        this.L = !1;
        this.A = null;
        this.M = c + ":" + d;
        this.I = null
    }

    G(Nn, sn);
    var On = sk();
    q = Nn.prototype;
    q.Eb = h("L");
    q.Ba = function () {
        return this.Eb() && !!this.A && this.A.Ba()
    };
    q.Uc = h("A");
    q.Ag = function () {
        var a = vn(this, this.K);
        return this.Eb() && !!a && a.Ba() && a === this.A
    };
    q.wg = function () {
        if (!this.Eb())return !0;
        var a = un(this);
        return !!a && !(a.Ba() && a === this.A)
    };
    q.Me = function () {
        Nn.V.Me.call(this);
        Pn(this)
    };
    q.Ne = function () {
        Nn.V.Ne.call(this);
        Pn(this)
    };
    q.ee = function () {
        this.Eb() || (this.L = !0)
    };
    q.toString = h("M");
    q.Ae = function (a, b) {
        return new mn(a.C, a.D, a.B, a.Ja(), b)
    };
    function Pn(a) {
        var b = un(a, !0);
        if (b && a.A !== b) {
            a.A = b;
            var c = b.H, d = b.Aa(), b = d.width - 2, d = d.height - 2;
            On[0] = c[0] * b;
            On[1] = c[1] * d;
            On[2] = c[2] * b + 1;
            On[3] = c[3] * d + 1;
            0 != a.Y && (a.Y = !1, Ln(a));
            c = Gn(a);
            b = c.length / 2;
            a.I || (a.I = new Float32Array(2 * b));
            a = a.I;
            for (var e = d = 0; d < b; ++d, e += 2) {
                var f = c[e + 1];
                a[e] = c[e] * On[0] + On[2];
                a[e + 1] = f * On[1] + On[3]
            }
        }
    }

    function Qn() {
    }

    Qn.prototype.create = function (a, b, c, d, e) {
        return new Nn(a, b, c, d, e)
    };
    function Rn() {
        return ec ? "Webkit" : dc ? "Moz" : bc ? "ms" : ac ? "O" : null
    }

    function Sn(a, b) {
        if (b && a in b)return a;
        var c = Rn();
        return c ? (c = c.toLowerCase(), a = c + ib(a), !x(b) || a in b ? a : null) : null
    };
    function Tn(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    }

    q = Tn.prototype;
    q.W = function () {
        return this.right - this.left
    };
    q.contains = function (a) {
        return this && a ? a instanceof Tn ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    q.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    q.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    q.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    q.translate = function (a, b) {
        a instanceof Jj ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, xa(b) && (this.top += b, this.bottom += b));
        return this
    };
    q.scale = function (a, b) {
        b = xa(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    };
    function Un(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }

    q = Un.prototype;
    q.contains = function (a) {
        return a instanceof Jj ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    q.Rc = function () {
        return new Jj(this.left + this.width / 2, this.top + this.height / 2)
    };
    q.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    q.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    q.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    q.translate = function (a, b) {
        a instanceof Jj ? (this.left += a.x, this.top += a.y) : (this.left += a, xa(b) && (this.top += b));
        return this
    };
    q.scale = function (a, b) {
        b = xa(b) ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    };
    function Vn(a, b, c) {
        if (wa(b)) (b = Wn(a, b)) && (a.style[b] = c); else for (var d in b) {
            c = a;
            var e = b[d], f = Wn(c, d);
            f && (c.style[f] = e)
        }
    }

    var Xn = {};

    function Wn(a, b) {
        var c = Xn[b];
        if (!c) {
            var d = hb(b), c = d;
            void 0 === a.style[d] && (d = Rn() + ib(d), void 0 !== a.style[d] && (c = d));
            Xn[b] = c
        }
        return c
    }

    function Yn(a, b) {
        var c;
        a:{
            c = Pj(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break a
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }

    function Zn(a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        bc && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }

    function $n(a, b, c) {
        if (b instanceof Kj) c = b.height, b = b.width; else if (void 0 == c)throw Error("missing height argument");
        a.style.width = ao(b);
        a.style.height = ao(c)
    }

    function ao(a) {
        "number" == typeof a && (a = Math.round(a) + "px");
        return a
    }

    function bo(a) {
        var b = co;
        if ("none" != Yn(a, "display"))return b(a);
        var c = a.style, d = c.display, e = c.visibility, f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }

    function co(a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = ec && !b && !c;
        return x(b) && !d || !a.getBoundingClientRect ? new Kj(b, c) : (a = Zn(a), new Kj(a.right - a.left, a.bottom - a.top))
    }

    function eo(a, b) {
        a = a.style;
        "opacity" in a ? a.opacity = b : "MozOpacity" in a ? a.MozOpacity = b : "filter" in a && (a.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
    }

    function fo(a, b) {
        a.style.display = b ? "" : "none"
    };
    function go(a, b) {
        return function (c) {
            c || (c = window.event);
            return b.call(a, c)
        }
    }

    function ho(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }

    function io(a) {
        a = a.target || a.srcElement;
        !a.getAttribute && a.parentNode && (a = a.parentNode);
        return a
    }

    var jo = "undefined" != typeof navigator && /Macintosh/.test(navigator.userAgent), ko = "undefined" != typeof navigator && !/Opera/.test(navigator.userAgent) && /WebKit/.test(navigator.userAgent), lo = "undefined" != typeof navigator && /WebKit/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent), mo = "undefined" != typeof navigator && (/MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent));

    function no() {
        this._mouseEventsPrevented = !0
    }

    function oo(a) {
        var b = w.document;
        if (b && !b.createEvent && b.createEventObject)try {
            return b.createEventObject(a)
        } catch (c) {
            return a
        } else return a
    };
    function po(a, b, c, d, e) {
        ol.call(this);
        this.J = a.replace(qo, "_");
        this.P = a;
        this.F = b || null;
        this.Na = c ? oo(c) : null;
        this.U = e || null;
        this.H = [];
        this.O = {};
        this.L = this.M = d || F();
        this.A = {};
        this.A["main-actionflow-branch"] = 1;
        this.D = new kj;
        this.B = !1;
        this.Xb = {};
        this.Pc = {};
        this.I = !1;
        c && b && "click" == c.type && this.action(b);
        ro.push(this);
        this.va = ++so;
        a = new to("created", this);
        null != uo && uo.dispatchEvent(a)
    }

    G(po, ol);
    var ro = [], uo = new ol, qo = /[~.,?&-]/g, so = 0;
    q = po.prototype;
    q.id = h("va");
    q.Id = function () {
        this.I = !0
    };
    q.Xc = function (a) {
        this.J = a.replace(qo, "_");
        this.P = a
    };
    q.ta = function (a, b) {
        this.B && vo(this, "tick", void 0, a);
        b = b || {};
        a in this.O && this.D.add(a);
        var c = b.time || F();
        !b.Fi && !b.on && c > this.L && (this.L = c);
        for (var d = c - this.M, e = this.H.length; 0 < e && this.H[e - 1][1] > d;)e--;
        yb(this.H, e, 0, [a, d, b.Fi]);
        this.O[a] = c
    };
    q.done = function (a, b, c) {
        this.B || !this.A[a] ? vo(this, "done", a, b) : (b && this.ta(b, c), this.A[a]--, 0 == this.A[a] && delete this.A[a], Sb(this.A) && wo(this) && (this.B = !0, tb(ro, this), this.Na = this.F = null, this.ra()))
    };
    q.la = function (a, b, c) {
        this.B && vo(this, "branch", a, b);
        b && this.ta(b, c);
        this.A[a] ? this.A[a]++ : this.A[a] = 1
    };
    function wo(a) {
        if (!uo)return !0;
        if (a.I) {
            var b = new to("abandoned", a);
            a.dispatchEvent(b);
            uo.dispatchEvent(b);
            return !0
        }
        0 < a.D.Cb() && (a.Pc.dup = a.D.Ca().join("|"));
        b = new to("beforedone", a);
        if (!a.dispatchEvent(b) || !uo.dispatchEvent(b))return !1;
        var c = xo(a.Pc);
        c && (a.Xb.cad = c);
        b.type = "done";
        return uo.dispatchEvent(b)
    }

    function vo(a, b, c, d) {
        if (uo) {
            var e = new to("error", a);
            e.error = b;
            e.la = c;
            e.B = d;
            e.A = a.B;
            uo.dispatchEvent(e)
        }
    }

    function xo(a) {
        var b = [];
        Ob(a, function (a, d) {
            d = encodeURIComponent(d);
            a = encodeURIComponent(a).replace(/%7C/g, "|");
            b.push(d + ":" + a)
        });
        return b.join(",")
    }

    q.action = function (a) {
        this.B && vo(this, "action");
        var b = [], c = null, d = null, e = null, f = null;
        yo(a, function (a) {
            var g;
            !a.__oi && a.getAttribute && (a.__oi = a.getAttribute("oi"));
            if (g = a.__oi) b.unshift(g), c || (c = a.getAttribute("jsinstance"));
            e || d && "1" != d || (e = a.getAttribute("ved"));
            f || (f = a.getAttribute("vet"));
            d || (d = a.getAttribute("jstrack"))
        });
        f && (this.Xb.vet = f);
        d && (this.Xb.ct = this.J, 0 < b.length && zo(this, "oi", b.join(".")), c && (c = "*" == c.charAt(0) ? parseInt(c.substr(1), 10) : parseInt(c, 10), this.Xb.cd = c), "1" != d && (this.Xb.ei =
            d), e && (this.Xb.ved = e))
    };
    function zo(a, b, c) {
        a.B && vo(a, "extradata");
        a.Pc[b] = c.toString().replace(/[:;,\s]/g, "_")
    }

    function yo(a, b) {
        for (; a && 1 == a.nodeType; a = a.parentNode)b(a)
    }

    q.ua = function (a, b, c, d) {
        this.la(b, c);
        var e = this;
        return function () {
            try {
                var c = a.apply(this, arguments)
            } finally {
                e.done(b, d)
            }
            return c
        }
    };
    q.node = h("F");
    q.event = h("Na");
    q.sb = h("U");
    q.value = function (a) {
        var b = this.F;
        return b ? a in b ? b[a] : b.getAttribute ? b.getAttribute(a) : void 0 : void 0
    };
    function to(a, b) {
        Kk.call(this, a, b);
        this.oa = b
    }

    G(to, Kk);
    function Ao(a, b, c, d, e) {
        po.call(this, b, c, d, e);
        this.G = a;
        this.C = null
    }

    G(Ao, po);
    q = Ao.prototype;
    q.pb = function (a, b) {
        this.C = b;
        zo(this, "an", b);
        this.G.start(a, b, this)
    };
    q.Dg = function (a, b) {
        this.C = b;
        zo(this, "an", b);
        return Bo(this.G, this, a, b)
    };
    q.Yc = function () {
        return !!Co(this.G, this)
    };
    q.ta = function (a, b) {
        Ao.V.ta.call(this, a, b)
    };
    q.Id = function () {
        Ao.V.Id.call(this)
    };
    q.Xc = function (a) {
        Ao.V.Xc.call(this, a)
    };
    function Do() {
        Ao.call(this, {}, "NULL_FLOW");
        this.Id();
        Ao.prototype.done.call(this, "main-actionflow-branch")
    }

    G(Do, Ao);
    q = Do.prototype;
    q.la = aa();
    q.done = aa();
    q.pb = aa();
    q.Dg = da(!1);
    q.Yc = da(!1);
    function Eo(a, b, c) {
        Hk.call(this);
        this.B = a;
        this.Yb = b;
        this.D = c;
        this.C = [];
        this.A = Fo++
    }

    G(Eo, Hk);
    var Fo = 1;
    Eo.prototype.cancel = function () {
        if (!this.xa()) {
            for (var a = 0; a < this.C.length; a++)this.C[a](this.D);
            this.ra()
        }
    };
    Eo.prototype.ga = function () {
        this.D = null;
        this.C.length = 0
    };
    function Go(a, b, c) {
        Ob(a.K(), function (a, e) {
            zo(b, c + e, "" + a)
        })
    };
    function Ho(a) {
        this.C = a;
        this.B = new ej;
        this.A = {};
        this.D = {};
        this.G = {};
        this.F = {};
        this.H = {};
        Ob(this.C, function (a, c) {
            this.A[c] = {};
            this.D[c] = 0
        }, this)
    }

    function Io(a, b, c) {
        var d = b.prefix;
        if (b = b.mh.B()) a = b.N(a), Go(a, c.oa, d || "")
    }

    function Jo(a, b, c) {
        var d = a.B.get(b.id());
        a.B.remove(b.id());
        d && (delete a.A[d.B][d.Yb], c && d.cancel(), d.ra())
    }

    function Co(a, b) {
        return Sb(b.A) ? (Jo(a, b, !1), null) : a.B.get(b.id()) || null
    }

    function Ko(a, b, c) {
        return (b = a.A[b] && a.A[b][c]) ? Co(a, b) : null
    }

    function Lo(a, b, c, d) {
        var e = a.A[b] && a.A[b][c];
        e && (Sb(e.A) || (e.ta("int"), zo(e, "ian", d)), Ko(a, b, c), Jo(a, e, !0))
    }

    function Mo(a, b, c, d) {
        var e = a.A[b];
        if (!(a.D[b] > c)) {
            for (var f in e)(e = Ko(a, b, f)) && e.A < c && Lo(a, b, f, d);
            a.D[b] = c
        }
    }

    function No(a, b, c) {
        return (a = a.C[b]) && !!a.actions[c]
    }

    function Bo(a, b, c, d) {
        if (!No(a, c, d))return !1;
        var e = Co(a, b);
        if (!e)return !1;
        if (e.B == c && e.Yb == d)return !0;
        if (a.D[c] > e.A)return !1;
        var f = a.C[c];
        if (f.Lb) {
            var g = Ko(a, c, d);
            if (g && g.A > e.A)return !1
        }
        for (g = 0; g < f.Bb.length; g++)Mo(a, f.Bb[g], e.A, d);
        Lo(a, c, d, d);
        e.B = c;
        e.Yb = d;
        a.A[e.B][e.Yb] = b;
        a.B.set(b.id(), e);
        f.Lb || Mo(a, c, e.A, d);
        return !0
    }

    Ho.prototype.start = function (a, b, c) {
        if (!No(this, a, b) || Co(this, c))return null;
        for (var d = new Eo(a, b, c), e = this.C[a], f = 0; f < e.Bb.length; f++)Mo(this, e.Bb[f], d.A, b);
        e.Lb ? Lo(this, a, b, b) : Mo(this, a, d.A, b);
        a = e.actions[b].ka;
        for (f = 0; f < a.length; f++) {
            if (e = this.G[a[f]])for (b = 0; b < e.length; b++)new Oo(e[b], a[f], c);
            if (e = this.F[a[f]])for (b = 0; b < e.length; b++) {
                var g = e[b].mh.B();
                g && al(c, "beforedone", Fa(Io, g, e[b]))
            }
            if (e = this.H[a[f]])for (b = 0; b < e.length; b++)e[b].hn(c)
        }
        this.A[d.B][d.Yb] = c;
        this.B.set(c.id(), d);
        return d
    };
    function Po(a, b, c) {
        c = {prefix: void 0, mh: c};
        a.F[b] || (a.F[b] = []);
        a.F[b].push(c)
    }

    function Oo(a, b, c) {
        this.B = a;
        this.C = "actionmanager.flowgate-" + b;
        this.A = !1;
        this.F = al(c, "beforedone", E(this.D, this))
    }

    Oo.prototype.D = function (a) {
        var b = a.oa;
        if (!this.A && this.B.Dn(b)) {
            this.A = !0;
            b.la(this.C);
            var c = this;
            this.B.jn(function () {
                c.A = !1;
                b.done(c.C);
                Sb(b.A) && jl(c.F)
            }, b)
        }
        return !this.A
    };
    function Qo() {
        var a = {};
        (a.init = {Lb: !0, Bb: [], actions: {}}).actions.application_init = {ka: ["render"]};
        var b = a.card = {Lb: !0, Bb: [], actions: {}};
        b.actions.star = {ka: ["render"]};
        b.actions.unstar = {ka: ["render"]};
        b = a.scene = {Lb: !0, Bb: ["transitions"], actions: {}};
        b.actions.click_scene = {ka: ["render"]};
        b.actions.move_camera = {ka: ["render", "camera_change"]};
        b.actions.scroll_zoom = {ka: ["render", "camera_change"]};
        b = a.scene_hover = {Lb: !0, Bb: [], actions: {}};
        b.actions.hover_on_map = {ka: []};
        b.actions.hover_on_poi = {ka: ["render"]};
        b = a.transitions = {Lb: !1, Bb: ["scene"], actions: {}};
        b.actions.clear_map = {ka: ["render"]};
        b.actions.compose_directions_request = {ka: ["render"]};
        b.actions.directions_drag = {ka: ["render"]};
        b.actions.directions_inspect_step = {ka: ["render"]};
        b.actions.directions_inspect_step_done = {ka: ["render"]};
        b.actions.get_directions = {ka: ["render"]};
        b.actions.high_confidence_suggest = {ka: ["render"]};
        b.actions.highlight_suggestion = {ka: ["render"]};
        b.actions.manual_url_change = {ka: ["render"]};
        b.actions.search = {ka: ["render", "camera_change"]};
        b.actions.spotlight_alternate_route = {ka: ["render"]};
        b.actions.spotlight_implicit_route = {ka: ["render"]};
        b.actions.spotlight_indoor = {ka: ["render"]};
        b.actions.spotlight_poi = {ka: ["render"]};
        b.actions.spotlight_reveal = {ka: ["render"]};
        b.actions.spotlight_suggestion = {ka: ["render"]};
        b.actions.suggest = {ka: ["render"]};
        b.actions.switch_map_mode = {ka: ["render"]};
        b.actions.switch_to_map_mode = {ka: ["render"]};
        b.actions.switch_to_text_mode = {ka: ["render"]};
        b = a.runway = {Lb: !1, Bb: [], actions: {}};
        b.actions.change_runway_state =
            {ka: []};
        b.actions.toggle_lookbook = {ka: []};
        return a
    };
    var Ro = new ol;
    new ol;
    var So = null;

    function To() {
        So || (So = new Ho(Qo()));
        return So
    }

    function Uo(a, b, c) {
        a = Vo(a);
        return al(a, b, Wo(c), !1)
    }

    function Xo(a, b, c, d) {
        var e;
        d instanceof Kk ? (e = d, e.type = b) : e = new Kk(b);
        e.pk = {event: d, oa: c};
        Vo(a).dispatchEvent(e)
    }

    function Yo(a, b, c) {
        a = Vo(a);
        var d = Vo(c);
        return al(a, b, function (a) {
            d.dispatchEvent(a)
        })
    }

    function Vo(a) {
        if (a.dispatchEvent)return a.Vd || (a.Vd = C), a;
        a.kf = a.kf || new ol;
        return a.kf
    }

    function Wo(a) {
        return function (b) {
            var c = b.pk;
            c ? a.call(void 0, c.oa, c.event) : b instanceof to ? a.call(void 0, new Do, b) : (c = new Ao(So, "event_" + b.type), a.call(void 0, c, b), c.done("main-actionflow-branch"))
        }
    };
    function Zo(a) {
        this.data = a || []
    }

    G(Zo, J);
    function $o(a) {
        return new eh(a.data[2])
    };
    var ap = xl(), bp = new Cm;

    function cp(a) {
        return a ? 2 === a.kb() || 3 === a.kb() : !1
    }

    function dp(a) {
        return a ? 4 === a.kb() : !1
    }

    function ep(a, b) {
        if (a.length !== b.length)return !1;
        for (var c = 0; c < a.length; ++c)if (a[c] !== b[c])return !1;
        return !0
    }

    function fp(a, b) {
        var c = gp;
        a = a || [];
        b = b || [];
        for (var d = a.length > b.length ? a.length : b.length, e = 0; e < d; ++e)if ((a[e] || c) !== (b[e] || c))return !1;
        return !0
    }

    function hp(a, b) {
        pm(a, bp);
        ap[0] = b[0] - bp.A;
        ap[1] = b[1] - bp.B;
        ap[2] = b[2] - bp.C;
        b = Kb(Fb(Math.atan2(ap[0], ap[1]), 2 * Math.PI));
        var c = Kb(Math.atan2(ap[2], Math.sqrt(ap[0] * ap[0] + ap[1] * ap[1])) + Math.PI / 2);
        mh(a).data[0] = b;
        mh(a).data[1] = c
    };
    function ip(a, b, c, d) {
        ol.call(this);
        this.D = function () {
            jp(a)
        };
        this.F = a.A;
        this.S = new Cm;
        this.C = !1;
        this.H = d || 6;
        this.L = new tl(this.H);
        this.M = c;
        this.J = b;
        this.A = [];
        this.B = [];
        this.G = new kj;
        this.I = []
    }

    G(ip, ol);
    q = ip.prototype;
    q.hc = function (a, b, c) {
        if (!ep(this.A, a) || !fp(this.B, c)) {
            this.C = !1;
            kp(this);
            lj(this.G, this.A);
            this.G = nj(this.G, a);
            lp(this);
            this.A = [];
            this.B = [];
            for (var d = a.length, d = d > this.H ? this.H : d, e = 0; e < d; ++e) {
                var f = a[e];
                if (!dp(f)) {
                    this.A.push(f);
                    var g = gp;
                    c && c[e] && (g = c[e]);
                    this.B.push(g);
                    if (cp(f)) mp(this, f, g, this.D, b); else {
                        f.Gb(b);
                        var k = this;
                        f.Tb(b.ua(function (a) {
                            4 != a && 0 != a && mp(k, f, g, k.D, b)
                        }, "br-onready"))
                    }
                }
            }
            np(this)
        }
    };
    function mp(a, b, c, d, e) {
        cp(b) && (nd(c, 5) || op(pp(a, b, c), e));
        b = pp(a, b, c);
        qp(b, a.F, e, a.D);
        rp(b, a.F, e, d)
    }

    q.Qa = function () {
        this.C = !1;
        this.J.H();
        for (var a = 0, b = this.A.length; a < b; ++a) {
            var c = this.A[a], d = this.B[a];
            if (cp(c) && 0 !== M(d, 0)) {
                var e = pp(this, c, d), f;
                f = e;
                if (f.H) {
                    for (var g = (F() - f.H) / 400, k = [], l = 0, m = f.I.length; l < m; l++) {
                        var n = f.I[l];
                        n.P = g;
                        1 > g && k.push(n)
                    }
                    f.I = k;
                    f.I.length || (f.H = 0);
                    f = !!f.I.length
                } else f = !1;
                f && this.D();
                this.J.I(c, d, e)
            }
        }
        this.C = !1;
        if (0 != this.A.length) {
            a = !0;
            for (b = 0; b < this.A.length; ++b) {
                c = pp(this, this.A[b], this.B[b]);
                a:if (d = c, 0 == d.B.length) d = !1; else {
                    for (e = 0; e < d.B.length; ++e)if (!d.B[e].Ag()) {
                        d = !1;
                        break a
                    }
                    d = !0
                }
                if (!d || c.H) {
                    a = !1;
                    break
                }
            }
            this.C = a
        }
        this.C && this.dispatchEvent(new Kk("ViewportReady", this))
    };
    q.ac = function (a) {
        sp(this, a);
        tp(this, a)
    };
    function up(a, b, c) {
        var d = vp, e;
        a:{
            for (e = a.A.length - 1; 0 <= e; e--) {
                var f = a.B[e];
                if (K(f, 0) && 1 == M(f, 0))break a
            }
            e = -1
        }
        if (f = -1 != e)if (f = a.A[e], cp(f)) {
            var g = a.B[e];
            Hm(a.S, b, c, wp);
            a = pp(a, f, g);
            b = wp;
            xp(a);
            yp(a.A.ma(), b, a.ea, d);
            f = 0 <= d.x && 1 >= d.x && 0 <= d.y && 1 >= d.y ? !0 : !1
        } else f = !1;
        return f ? e : -1
    }

    function lp(a) {
        for (var b = a.G.Ca(); 0 < b.length;) {
            var c = b.shift();
            c.Mc();
            var d = c = pp(a, c, gp);
            d.F && (d.F.cancel(a.F), d.F = null);
            c.J && (c.J.cancel(a.F), c.J = null)
        }
        a.G.clear()
    }

    function tp(a, b) {
        for (var c = 0; c < a.A.length; ++c) {
            var d = a, e = b, f = a.D, g = pp(d, a.A[c], a.B[c]);
            qp(g, d.F, e, d.D);
            rp(g, d.F, e, f)
        }
    }

    function sp(a, b) {
        for (var c = 0; c < a.A.length; ++c) {
            var d = a.A[c], e = a.B[c], f = b;
            cp(d) && (nd(e, 5) || op(pp(a, d, e), f))
        }
    }

    function pp(a, b, c) {
        var d = vl(a.L, b.id());
        d || (d = a.M.create(b, c, a.S), ul(a.L, b.id(), d));
        d.G = c;
        return d
    }

    q.ha = h("S");
    function np(a) {
        for (var b = 0; b < a.A.length; ++b) {
            var c = Uo(a.A[b], "TileReady", function (b) {
                tp(a, b)
            });
            a.I.push(c)
        }
    }

    function kp(a) {
        for (var b = 0; b < a.A.length; ++b)jl(a.I[b]);
        a.I = []
    }

    q.clear = function () {
        kp(this);
        lj(this.G, this.A);
        lp(this);
        this.L.clear();
        this.A = [];
        this.B = []
    };
    q.zc = C;
    q.ad = h("C");
    q.bd = function (a) {
        this.J.K(a)
    };
    var zp = new Zo;
    zp.data[0] = 1;
    zp.data[4] = 1;
    zp.data[1] = 0;
    var gp = zp, wp = new Bm;
    ip.prototype.yc = function (a, b) {
        this.C = !1;
        pm(a, this.S);
        a = hm(qh(jh(a)));
        var c = Em(this.S);
        c.L = .01 * a;
        c.H = void 0;
        c.I = void 0;
        c.J = void 0;
        qm(this.S, c);
        sp(this, b);
        tp(this, b)
    };
    function Ap(a, b) {
        this.A = xl();
        this.B = new Float64Array(2);
        this.D = a;
        this.C = a / (2 * Math.PI);
        this.G = 1 / this.C;
        this.F = b / Math.PI;
        this.H = 1 / this.F
    }

    function Bp(a, b, c) {
        var d = (c + .5) * a.H;
        c = Math.sin(d);
        d = Math.cos(d);
        b = 1.5 * Math.PI - b * a.G;
        var e = Math.sin(b);
        a.A[0] = c * Math.cos(b);
        a.A[1] = c * e;
        a.A[2] = d;
        return a.A
    };
    function Cp(a, b, c, d, e, f, g) {
        this.C = a;
        this.A = b;
        this.F = f || 0;
        this.G = g || 0;
        this.H = d || null;
        this.I = e || 0;
        this.B = c || [];
        this.D = new Ap(a, b)
    }

    var Dp = yl(xl(), 0, 0, 1), Ep = new Cp(512, 512, null, null, 0, 500), Fp = new Cp(512, 512, null, null, 0, 0, 3);
    Cp.prototype.W = h("C");
    function Gp(a, b, c, d) {
        if (0 == a.C || 0 == a.A || !a.D)return null;
        b = Eb(b, 0, 1);
        c = Eb(c, 0, 1);
        b *= a.W() - 1;
        c = Bp(a.D, b, c * (a.A - 1));
        d = d || new Bm;
        a = Hp(a, c, d.A);
        if (0 == a)return null;
        Cl(c, a, d.origin);
        return d
    }

    function Ip(a, b, c) {
        c && zl(c, Dp);
        return 0 == a.F && 0 < a.G && 0 > b[2] ? -a.G * Dl(b) / b[2] : a.F
    }

    function Hp(a, b, c) {
        if (!a.B || !a.B.length)return Ip(a, b, c);
        var d, e = a.D;
        d = Math.acos(b[2]) * e.F - .5;
        var f = (Math.atan2(b[0], b[1]) + Math.PI) * e.C;
        f >= e.D - .5 && (f -= e.D);
        e.B[0] = f;
        e.B[1] = d;
        d = e.B;
        var g;
        a.H ? (e = Math.floor(d[0] + .5), d = Math.floor(d[1] + .5), e >= a.C ? e -= a.C : 0 > e && (e += a.C), d >= a.A ? d -= a.A : 0 > d && (d += a.A), g = Jp(a.H, a.I + d * a.C + e) || 0) : g = 0;
        if (0 >= g)return Ip(a, b, c);
        g *= 4;
        e = a.B[g++];
        d = a.B[g++];
        f = a.B[g++];
        a = a.B[g++];
        c && (c[0] = e, c[1] = d, c[2] = f);
        return Eb(a / (b[0] * e + b[1] * d + b[2] * f), .1, 500)
    };
    function Kp(a, b, c, d) {
        ip.call(this, a, b, c, d)
    }

    G(Kp, ip);
    var Lp = new Bm, vp = new Jj;
    Kp.prototype.Tc = function (a, b, c) {
        var d = up(this, a, b);
        if (-1 == d)return null;
        var e = this.A[d], d = this.B[d];
        Hm(this.S, a, b, Lp);
        a = e.ma();
        Mp(a, Np, K(d, 2) ? $o(d) : void 0);
        Sl(Np, Op);
        yp(0, Lp, Op, Pp);
        (c = Gp(a.F, Pp.x, Pp.y, c)) ? (Tl(Np, c.origin, c.origin), Ul(Np, c.A, c.A), El(c.A, c.A)) : c = null;
        return c
    };
    Kp.prototype.Vc = da(null);
    Kp.prototype.$d = function (a) {
        a[0] = 1;
        a[1] = 179
    };
    Kp.prototype.Ud = function (a, b, c) {
        a = up(this, a, b);
        return -1 == a ? null : this.A[a].Td(vp, c)
    };
    function Qp(a, b, c, d, e) {
        this.D = a;
        this.F = b;
        this.C = c;
        this.G = d;
        (a = e) || (a = Float64Array, d.B || (d.B = new Float64Array(6), Jn(d, d.B, !1)), a = new a(d.B));
        this.B = a;
        this.A = []
    }

    function Rp(a, b, c, d, e) {
        if (!(3 <= a.C || a.C >= d)) {
            a.A = [];
            Sp(a, b, c, d, e);
            for (var f = 0; f < a.A.length; f++)Rp(a.A[f], b, c, d, e);
            for (b = 0; b < a.A.length; b++) {
                c = a.A[b].B;
                for (d = 0; 3 > d; d++)a.B[d] = Math.min(a.B[d], c[d]);
                for (d = 3; 6 > d; d++)a.B[d] = Math.max(a.B[d], c[d])
            }
        }
    }

    function Tp(a, b, c, d, e, f, g, k) {
        if (!rn(a.B, b))return [];
        var l = k(a.D, a.F), l = Math.min(l, f), m = a.G;
        m.K = Math.min(l, m.N);
        if (a.C >= l)return c && (c = a.G, c.C || (c.C = new Float64Array(6), Jn(c, c.C, !0)), c = !rn(c.C, b)), c ? [] : [a.G];
        0 == a.A.length && Sp(a, d, e, f, g);
        l = [];
        for (m = 0; m < a.A.length; m++)l = l.concat(Tp(a.A[m], b, c, d, e, f, g, k));
        return l
    }

    function Sp(a, b, c, d, e) {
        var f = a.C + 1;
        if (!(f > d)) {
            var g = 1 << d - f;
            d = a.D;
            var k = a.D + g, l = a.F, g = a.F + g;
            Up(a, d, l, f, b, c, e);
            Up(a, k, l, f, b, c, e);
            Up(a, d, g, f, b, c, e);
            Up(a, k, g, f, b, c, e)
        }
    }

    function Up(a, b, c, d, e, f, g) {
        b >= e || c >= f || !(e = g(b, c, d)) || (b = new Qp(b, c, d, e), a.A.push(b))
    };
    function Vp(a, b, c) {
        this.G = b;
        this.A = !0;
        b.la("img-patch-prepare");
        this.B = a;
        this.F = c || C
    }

    Vp.prototype.start = function () {
        return this.A ? 0 == this.B.length ? (Wp(this), xj) : this.D() : xj
    };
    function Wp(a) {
        a.F();
        a.G.done("img-patch-prepare");
        a.A = !1
    }

    Vp.prototype.D = function () {
        var a = this.B.shift();
        this.C(a);
        return 0 == this.B.length ? (Wp(this), xj) : this.D
    };
    Vp.prototype.cancel = function () {
        this.A && (this.__maps_realtime_JobScheduler_next_step = null, Wp(this))
    };
    Vp.prototype.C = function (a) {
        a.Me()
    };
    function Xp(a, b, c) {
        Vp.call(this, a, b, c)
    }

    G(Xp, Vp);
    Xp.prototype.C = function (a) {
        a.Ne()
    };
    function Yp(a, b, c, d, e) {
        Kk.call(this, a, b);
        this.x = c;
        this.y = d;
        this.zoom = e
    }

    G(Yp, Kk);
    function Zp() {
        ol.call(this);
        this.A = null;
        this.B = [];
        this.C = "" + Aa(this)
    }

    G(Zp, ol);
    q = Zp.prototype;
    q.kb = function () {
        return this.A ? this.A.kb() : 0
    };
    function $p(a, b) {
        a.A = b;
        for (Yo(a.A, "TileReady", a); 0 < a.B.length;)a.B.shift()()
    }

    q.Ea = function () {
        return this.A ? this.A.Ea() : null
    };
    q.ha = function () {
        return this.A ? this.A.ha() : null
    };
    q.Gb = function (a) {
        if (this.A) this.A.Gb(a); else {
            var b = this;
            this.B.push(a.ua(function () {
                b.A.Gb(a)
            }, "dtr-prefetch"))
        }
    };
    q.ma = function () {
        return this.A ? this.A.ma() : null
    };
    q.Kb = function () {
        if (this.A) this.A.Kb(); else {
            var a = this;
            this.B.push(function () {
                a.A.Kb()
            })
        }
    };
    q.Jb = function (a) {
        if (this.A) this.A.Jb(a); else {
            var b = this;
            this.B.push(function () {
                b.A.Jb(a)
            })
        }
    };
    q.Wc = function (a) {
        return this.A ? this.A.Wc(a) : !1
    };
    q.ub = function (a, b, c) {
        return this.A ? this.A.ub(a, b, c) : null
    };
    q.Kd = function (a, b) {
        if (this.A) this.A.Kd(a, b); else {
            var c = this;
            this.B.push(function () {
                c.A.Kd(a, b)
            })
        }
    };
    q.Jd = function (a, b) {
        if (this.A) this.A.Jd(a, b); else {
            var c = this;
            this.B.push(function () {
                c.A.Jd(a, b)
            })
        }
    };
    q.Bc = function (a, b) {
        if (this.A) this.A.Bc(a, b); else {
            var c = this;
            this.B.push(a.ua(function () {
                c.A.Bc(a, b)
            }, "dtr-getconfig"))
        }
    };
    q.Vb = function (a, b) {
        if (this.A) this.A.Vb(a, b); else {
            var c = this;
            this.B.push(b.ua(function () {
                c.A.Vb(a, b)
            }, "dtr-setconfig"))
        }
    };
    q.od = function () {
        if (this.A) this.A.od(); else {
            var a = this;
            this.B.push(function () {
                a.A.od()
            })
        }
    };
    q.Hb = function (a, b, c, d, e) {
        if (this.A) this.A.Hb(a, b, c, d, e); else {
            var f = this;
            this.B.push(d.ua(function () {
                f.A.Hb(a, b, c, d, e)
            }, "dtr-getile"))
        }
    };
    q.Hc = function (a, b, c) {
        if (this.A) this.A.Hc(a, b, c); else {
            var d = this;
            this.B.push(function () {
                d.A.Hc(a, b, c)
            })
        }
    };
    q.Gd = function (a, b, c) {
        if (this.A) this.A.Gd(a, b, c); else {
            var d = this;
            this.B.push(function () {
                d.A.Gd(a, b, c)
            })
        }
    };
    q.Je = function () {
        return this.A ? this.A.Je() : !1
    };
    q.Mc = function () {
        if (this.A) this.A.Mc(); else {
            var a = this;
            this.B.push(function () {
                a.A.Mc()
            })
        }
    };
    q.Le = function () {
        return this.A ? this.A.Le() : !1
    };
    q.Td = function (a, b) {
        return this.A ? this.A.Td(a, b) : null
    };
    q.Ob = function () {
        return this.A ? this.A.Ob() : []
    };
    q.Ec = function (a) {
        if (this.A) this.A.Ec(a); else {
            var b = this;
            this.B.push(function () {
                b.A.Ec(a)
            })
        }
    };
    q.id = h("C");
    q.da = function () {
        return this.A ? this.A.da() : null
    };
    q.Tb = function (a) {
        if (this.A) this.A.Tb(a); else {
            var b = this;
            this.B.push(function () {
                b.A.Tb(a)
            })
        }
    };
    function aq() {
        Zp.call(this)
    }

    G(aq, Zp);
    aq.prototype.Fa = function () {
        return this.A ? this.A.Fa() : null
    };
    aq.prototype.Ob = function () {
        return this.A ? this.A.Ob() : []
    };
    aq.prototype.Sd = function () {
        return this.A ? this.A.Sd() : null
    };
    aq.prototype.tb = function () {
        return this.A ? this.A.tb() : null
    };
    function bq(a, b, c, d) {
        this.A = a;
        this.G = b;
        this.X = new Zo;
        this.C = c;
        this.N = null;
        this.fa = d;
        this.aa = this.P = this.$ = this.M = 1;
        this.ia = 0;
        this.J = this.F = null;
        this.L = [];
        this.B = [];
        this.K = uk();
        this.O = Jl();
        this.ea = Jl();
        this.ja = {};
        this.D = {};
        this.I = [];
        this.H = 0;
        this.Y = !1;
        cq(this);
        this.U = new Qp(0, 0, 0, dq(this, 0, 0, 0), eq)
    }

    var eq = new Float64Array(6);
    eq.set([-Infinity, -Infinity, -Infinity, Infinity, Infinity, Infinity]);
    var fq = [Hl(), Hl(), Hl(), Hl(), Hl(), Hl()], Pl = Jl(), gq = xl(), hq = xl();

    function Wm(a) {
        xp(a);
        for (var b = [], c = 0; c < a.B.length; ++c) {
            var d = a.B[c];
            d.Ba() && b.push(d)
        }
        return b
    }

    function op(a, b) {
        xp(a);
        for (var c = 0; c < a.B.length; ++c) {
            var d = a.B[c], e = d, f = b, g = e.K, k = Math.max(0, e.D.ma().A - g), l = e.G >> k, k = e.H >> k;
            e.D.Hb(l, k, g, f);
            e = a;
            g = l + "|" + k + "|" + g;
            e.A.Wc(g) || (e.D[g] || (e.D[g] = []), -1 == e.D[g].indexOf(d) && e.D[g].push(d))
        }
    }

    function rp(a, b, c, d) {
        a.F && (a.F.cancel(b), a.F = null);
        xp(a);
        for (var e = [], f = 0; f < a.B.length; ++f) {
            var g = a.B[f];
            g.wg() && e.push(g)
        }
        e.length ? (a.F = new Vp(e, c, d), iq(b, a.F, jq(2, !1))) : d && d()
    }

    function qp(a, b, c, d) {
        a.J && (a.J.cancel(b), a.J = null);
        xp(a);
        b = [];
        for (var e = 0; e < a.B.length; ++e) {
            var f = a.B[e];
            f.Ba() || b.push(f)
        }
        if (b.length)for (a = new Xp(b, c, d), c = a.start(); c != xj;)c = c.apply(a); else d && d()
    }

    function Am(a) {
        xp(a);
        return a.K
    }

    function kq(a) {
        var b = a.A.ma();
        a.$ = b.C;
        a.aa = b.B;
        a.M = Math.ceil(a.$);
        a.P = Math.ceil(a.aa);
        Rp(a.U, a.M, a.P, b.A, function (b, d, e) {
            return dq(a, b, d, e)
        });
        a.ia = a.C.K;
        a.Y = !0
    }

    function xp(a) {
        if (!a.Y) {
            if (!a.A.ma() || !a.A.ma().H)return;
            kq(a)
        }
        var b = !td($o(a.X), $o(a.G)) || !a.N, c;
        if (!(c = !a.N)) {
            c = a.N;
            var d = a.C;
            c = !(c.D === d.D && c.F === d.F && c.G === d.G && c.I === d.I && c.A === d.A && c.B === d.B && c.C === d.C && c.O === d.O && c.P === d.P && c.U === d.U && c.K === d.K && c.L === d.L && c.J === d.J && c.W() === d.W() && c.H === d.H)
        }
        if (c || b) {
            c = a.C;
            d = new Cm;
            qm(d, Em(c));
            d.Y = c.Y;
            a.N = d;
            U(a.X, a.G);
            if (b) {
                var b = a.A.ma(), e;
                K(a.G, 2) && (e = $o(a.G));
                Mp(b, a.O, e);
                Sl(a.O, a.ea)
            }
            e = a.K;
            b = a.C;
            c = a.O;
            var d = b.N, f = 1 / b.I, g = b.N;
            g[0] = f;
            g[1] = 0;
            g[2] = 0;
            g[3] = 0;
            g[4] = 0;
            g[5] = f;
            g[6] = 0;
            g[7] = 0;
            g[8] = 0;
            g[9] = 0;
            g[10] = f;
            g[11] = 0;
            g[12] = 0;
            g[13] = 0;
            g[14] = 0;
            g[15] = 1;
            Yl(g, -b.D, -b.F, -b.G);
            Rl(g, c, d);
            vk(e, b.N);
            wk(Fm(a.C), e, a.K);
            e = a.K;
            a.A.ma();
            a.K = e;
            lq(a)
        }
    }

    function lq(a) {
        mq(a);
        var b = a.A instanceof aq && nq(a), c = a.A.ma();
        a.B = Tp(a.U, fq, b, a.M, a.P, c.A, function (b, c, f) {
            return dq(a, b, c, f)
        }, function (b, e) {
            var d = a.C, g = a.O, k = nq(a), l = yn(c, e), m = yn(c, e + 1);
            k ? g = (m - l) * Math.PI : (k = xn(c, b), b = xn(c, b + 1), b = (k + b) / 2, Kn(c, b, l, oq, 0), Kn(c, b, m, pq, 0), l = pq, Tl(g, oq, qq), Tl(g, l, rq), qq[0] -= d.A, qq[1] -= d.B, qq[2] -= d.C, rq[0] -= d.A, rq[1] -= d.B, rq[2] -= d.C, g = Math.acos((qq[0] * rq[0] + qq[1] * rq[1] + qq[2] * rq[2]) / (Dl(qq) * Dl(rq))));
            l = d.K;
            g = 1E-6 < Math.abs(l) ? g * d.H / l : 0;
            d = c.A;
            l = c.B - (c.G - 1);
            1 > l && e == c.G - 1 && (g /=
                l);
            e = Math.floor(Math.log(vh(c.D) / g) / Math.LN2);
            e = Eb(e, 0, d);
            return Math.max(2, d - e)
        })
    }

    function dq(a, b, c, d) {
        var e = b + c * a.M;
        d >= a.L.length && (a.L[d] = []);
        a.L[d][e] || (a.L[d][e] = a.fa.create(a.A, a.ja, b, c, d));
        return a.L[d][e]
    }

    function cq(a) {
        Uo(a.A, "TileReady", function (b, c) {
            b = c.x + "|" + c.y + "|" + c.zoom;
            if (a.D[b]) {
                c = 0;
                for (var d = a.D[b].length; c < d; c++) {
                    var e = a.D[b][c];
                    1 == e.P && (e.P = 0, a.I.push(e))
                }
                delete a.D[b];
                if (!a.H) {
                    b = 0;
                    for (var f in a.D)b++;
                    5 >= b && (a.H = F())
                }
            }
        })
    }

    function nq(a) {
        var b;
        b = K(a.G, 2) ? jh($o(a.G)) : jh(a.A.ha());
        im(ph(b), qh(b), rh(b), gq);
        gm(a.C.A, a.C.B, a.C.C, hq);
        dm(hq[0], hq[1], hq[2], hq);
        return .01 > Math.sqrt(Gl(hq, gq))
    }

    function mq(a) {
        Ll(Pl, Am(a));
        Ol(3, on);
        on[0] = -on[0];
        on[1] = -on[1];
        on[2] = -on[2];
        on[3] = -on[3];
        for (a = 0; 3 > a; a++) {
            var b = 2 * a;
            Ol(a, pn);
            var c = fq[b], d = c, e = on, f = pn;
            d[0] = e[0] - f[0];
            d[1] = e[1] - f[1];
            d[2] = e[2] - f[2];
            d[3] = e[3] - f[3];
            Il(c, 1 / Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2]), c);
            c = b = fq[b + 1];
            d = on;
            e = pn;
            c[0] = d[0] + e[0];
            c[1] = d[1] + e[1];
            c[2] = d[2] + e[2];
            c[3] = d[3] + e[3];
            Il(b, 1 / Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2]), b)
        }
    }

    function sq(a) {
        this.A = a
    }

    sq.prototype.create = function (a, b, c) {
        return new bq(a, b, c, this.A)
    };
    function tq(a, b, c, d) {
        b = new Im(b, c);
        ip.call(this, a, b, new sq(new Qn), d)
    }

    G(tq, Kp);
    function uq(a, b, c, d, e, f) {
        b = new tq(c, d, e, f);
        a(b)
    };
    function vq(a) {
        Hk.call(this);
        this.F = a;
        this.A = {}
    }

    G(vq, Hk);
    var wq = [];
    q = vq.prototype;
    q.listen = function (a, b, c, d) {
        return xq(this, a, b, c, d)
    };
    function xq(a, b, c, d, e, f) {
        ua(c) || (c && (wq[0] = c.toString()), c = wq);
        for (var g = 0; g < c.length; g++) {
            var k = al(b, c[g], d || a.handleEvent, e || !1, f || a.F || a);
            if (!k)break;
            a.A[k.key] = k
        }
        return a
    }

    q.Cg = function (a, b, c, d) {
        return yq(this, a, b, c, d)
    };
    function yq(a, b, c, d, e, f) {
        if (ua(c))for (var g = 0; g < c.length; g++)yq(a, b, c[g], d, e, f); else {
            b = hl(b, c, d || a.handleEvent, e, f || a.F || a);
            if (!b)return a;
            a.A[b.key] = b
        }
        return a
    }

    q.Wb = function (a, b, c, d, e) {
        if (ua(b))for (var f = 0; f < b.length; f++)this.Wb(a, b[f], c, d, e); else c = c || this.handleEvent, e = e || this.F || this, c = bl(c), d = !!d, b = Fk(a) ? a.Sc(b, c, d, e) : a ? (a = dl(a)) ? a.Sc(b, c, d, e) : null : null, b && (jl(b), delete this.A[b.key]);
        return this
    };
    function zq(a) {
        Ob(a.A, function (a, c) {
            this.A.hasOwnProperty(c) && jl(a)
        }, a);
        a.A = {}
    }

    q.ga = function () {
        vq.V.ga.call(this);
        zq(this)
    };
    q.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    function Aq(a, b, c) {
        this.F = c;
        this.C = a;
        this.D = b;
        this.B = 0;
        this.A = null
    }

    Aq.prototype.get = function () {
        var a;
        0 < this.B ? (this.B--, a = this.A, this.A = a.next, a.next = null) : a = this.C();
        return a
    };
    function Bq(a, b) {
        a.D(b);
        a.B < a.F && (a.B++, b.next = a.A, a.A = b)
    };
    function Cq(a) {
        w.setTimeout(function () {
            throw a;
        }, 0)
    }

    function Dq(a) {
        !ya(w.setImmediate) || w.Window && w.Window.prototype && !I("Edge") && w.Window.prototype.setImmediate == w.setImmediate ? (Eq || (Eq = Fq()), Eq(a)) : w.setImmediate(a)
    }

    var Eq;

    function Fq() {
        var a = w.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !I("Presto") && (a = function () {
            var a = document.createElement("IFRAME");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow, a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(), d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host, a = E(function (a) {
                if (("*" == d || a.origin == d) && a.data ==
                    c) this.port1.onmessage()
            }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function () {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !Vb()) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function () {
                if (x(c.next)) {
                    c = c.next;
                    var a = c.rf;
                    c.rf = null;
                    a()
                }
            };
            return function (a) {
                d.next = {rf: a};
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (a) {
                var b = document.createElement("SCRIPT");
                b.onreadystatechange =
                    function () {
                        b.onreadystatechange = null;
                        b.parentNode.removeChild(b);
                        b = null;
                        a();
                        a = null
                    };
                document.documentElement.appendChild(b)
            } : function (a) {
                w.setTimeout(a, 0)
            }
    };
    function Gq() {
        this.B = this.A = null
    }

    var Iq = new Aq(function () {
        return new Hq
    }, function (a) {
        a.reset()
    }, 100);
    Gq.prototype.add = function (a, b) {
        var c = Iq.get();
        c.set(a, b);
        this.B ? this.B.next = c : this.A = c;
        this.B = c
    };
    Gq.prototype.remove = function () {
        var a = null;
        this.A && (a = this.A, this.A = this.A.next, this.A || (this.B = null), a.next = null);
        return a
    };
    function Hq() {
        this.next = this.scope = this.Qc = null
    }

    Hq.prototype.set = function (a, b) {
        this.Qc = a;
        this.scope = b;
        this.next = null
    };
    Hq.prototype.reset = function () {
        this.next = this.scope = this.Qc = null
    };
    function Jq(a, b) {
        Kq || Lq();
        Mq || (Kq(), Mq = !0);
        Nq.add(a, b)
    }

    var Kq;

    function Lq() {
        if (-1 != String(w.Promise).indexOf("[native code]")) {
            var a = w.Promise.resolve(void 0);
            Kq = function () {
                a.then(Oq)
            }
        } else Kq = function () {
            Dq(Oq)
        }
    }

    var Mq = !1, Nq = new Gq;

    function Oq() {
        for (var a; a = Nq.remove();) {
            try {
                a.Qc.call(a.scope)
            } catch (b) {
                Cq(b)
            }
            Bq(Iq, a)
        }
        Mq = !1
    };
    function Pq(a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    }

    function Qq(a) {
        if (!a)return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    function Rq(a, b) {
        this.A = 0;
        this.H = void 0;
        this.D = this.B = this.C = null;
        this.F = this.G = !1;
        if (a != C)try {
            var c = this;
            a.call(b, function (a) {
                Sq(c, 2, a)
            }, function (a) {
                Sq(c, 3, a)
            })
        } catch (d) {
            Sq(this, 3, d)
        }
    }

    function Tq() {
        this.next = this.C = this.B = this.D = this.A = null;
        this.F = !1
    }

    Tq.prototype.reset = function () {
        this.C = this.B = this.D = this.A = null;
        this.F = !1
    };
    var Uq = new Aq(function () {
        return new Tq
    }, function (a) {
        a.reset()
    }, 100);

    function Vq(a, b, c) {
        var d = Uq.get();
        d.D = a;
        d.B = b;
        d.C = c;
        return d
    }

    Rq.prototype.then = function (a, b, c) {
        return Wq(this, ya(a) ? a : null, ya(b) ? b : null, c)
    };
    Pq(Rq);
    Rq.prototype.cancel = function (a) {
        0 == this.A && Jq(function () {
            var b = new Xq(a);
            Yq(this, b)
        }, this)
    };
    function Yq(a, b) {
        if (0 == a.A)if (a.C) {
            var c = a.C;
            if (c.B) {
                for (var d = 0, e = null, f = null, g = c.B; g && (g.F || (d++, g.A == a && (e = g), !(e && 1 < d))); g = g.next)e || (f = g);
                e && (0 == c.A && 1 == d ? Yq(c, b) : (f ? (d = f, d.next == c.D && (c.D = d), d.next = d.next.next) : Zq(c), $q(c, e, 3, b)))
            }
            a.C = null
        } else Sq(a, 3, b)
    }

    function ar(a, b) {
        a.B || 2 != a.A && 3 != a.A || br(a);
        a.D ? a.D.next = b : a.B = b;
        a.D = b
    }

    function Wq(a, b, c, d) {
        var e = Vq(null, null, null);
        e.A = new Rq(function (a, g) {
            e.D = b ? function (c) {
                    try {
                        var e = b.call(d, c);
                        a(e)
                    } catch (m) {
                        g(m)
                    }
                } : a;
            e.B = c ? function (b) {
                    try {
                        var e = c.call(d, b);
                        !x(e) && b instanceof Xq ? g(b) : a(e)
                    } catch (m) {
                        g(m)
                    }
                } : g
        });
        e.A.C = a;
        ar(a, e);
        return e.A
    }

    Rq.prototype.J = function (a) {
        this.A = 0;
        Sq(this, 2, a)
    };
    Rq.prototype.K = function (a) {
        this.A = 0;
        Sq(this, 3, a)
    };
    function Sq(a, b, c) {
        if (0 == a.A) {
            a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
            a.A = 1;
            var d;
            a:{
                var e = c, f = a.J, g = a.K;
                if (e instanceof Rq) ar(e, Vq(f || C, g || null, a)), d = !0; else if (Qq(e)) e.then(f, g, a), d = !0; else {
                    if (za(e))try {
                        var k = e.then;
                        if (ya(k)) {
                            cr(e, k, f, g, a);
                            d = !0;
                            break a
                        }
                    } catch (l) {
                        g.call(a, l);
                        d = !0;
                        break a
                    }
                    d = !1
                }
            }
            d || (a.H = c, a.A = b, a.C = null, br(a), 3 != b || c instanceof Xq || dr(a, c))
        }
    }

    function cr(a, b, c, d, e) {
        function f(a) {
            k || (k = !0, d.call(e, a))
        }

        function g(a) {
            k || (k = !0, c.call(e, a))
        }

        var k = !1;
        try {
            b.call(a, g, f)
        } catch (l) {
            f(l)
        }
    }

    function br(a) {
        a.G || (a.G = !0, Jq(a.I, a))
    }

    function Zq(a) {
        var b = null;
        a.B && (b = a.B, a.B = b.next, b.next = null);
        a.B || (a.D = null);
        return b
    }

    Rq.prototype.I = function () {
        for (var a; a = Zq(this);)$q(this, a, this.A, this.H);
        this.G = !1
    };
    function $q(a, b, c, d) {
        if (3 == c && b.B && !b.F)for (; a && a.F; a = a.C)a.F = !1;
        if (b.A) b.A.C = null, er(b, c, d); else try {
            b.F ? b.D.call(b.C) : er(b, c, d)
        } catch (e) {
            fr.call(null, e)
        }
        Bq(Uq, b)
    }

    function er(a, b, c) {
        2 == b ? a.D.call(a.C, c) : a.B && a.B.call(a.C, c)
    }

    function dr(a, b) {
        a.F = !0;
        Jq(function () {
            a.F && fr.call(null, b)
        })
    }

    var fr = Cq;

    function Xq(a) {
        Ha.call(this, a)
    }

    G(Xq, Ha);
    Xq.prototype.name = "cancel";
    function gr(a, b) {
        return new Rq(function (c, d) {
            var e;
            e = x(b) ? ya(b) ? b() : b : new Image;
            var f = bc && 11 > oc ? "readystatechange" : "load", g = new vq;
            g.listen(e, [f, "abort", "error"], function (a) {
                if ("readystatechange" != a.type || "complete" == e.readyState) Jk(g), a.type == f ? c(e) : d(null)
            });
            e.src = a
        })
    };
    var hr = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

    function ir(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="), e, f = null;
                0 <= d ? (e = a[c].substring(0, d), f = a[c].substring(d + 1)) : e = a[c];
                b(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
            }
        }
    }

    function jr(a, b, c) {
        if (ua(b))for (var d = 0; d < b.length; d++)jr(a, String(b[d]), c); else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    };
    function kr(a, b) {
        this.C = this.I = this.B = "";
        this.H = null;
        this.F = this.D = "";
        this.G = !1;
        var c;
        a instanceof kr ? (this.G = x(b) ? b : a.G, lr(this, a.B), this.I = a.I, this.C = a.C, mr(this, a.H), this.D = a.D, b = a.A, c = new nr, c.B = b.B, b.A && (c.A = new ej(b.A), c.ca = b.ca), or(this, c), this.F = a.F) : a && (c = String(a).match(hr)) ? (this.G = !!b, lr(this, c[1] || "", !0), this.I = pr(c[2] || ""), this.C = pr(c[3] || "", !0), mr(this, c[4]), this.D = pr(c[5] || "", !0), or(this, c[6] || "", !0), this.F = pr(c[7] || "")) : (this.G = !!b, this.A = new nr(null, 0, this.G))
    }

    kr.prototype.toString = function () {
        var a = [], b = this.B;
        b && a.push(qr(b, rr, !0), ":");
        var c = this.C;
        if (c || "file" == b) a.push("//"), (b = this.I) && a.push(qr(b, rr, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.H, null != c && a.push(":", String(c));
        if (c = this.D) this.C && "/" != c.charAt(0) && a.push("/"), a.push(qr(c, "/" == c.charAt(0) ? sr : tr, !0));
        (c = this.A.toString()) && a.push("?", c);
        (c = this.F) && a.push("#", qr(c, ur));
        return a.join("")
    };
    function lr(a, b, c) {
        a.B = c ? pr(b, !0) : b;
        a.B && (a.B = a.B.replace(/:$/, ""))
    }

    function mr(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)throw Error("Bad port number " + b);
            a.H = b
        } else a.H = null
    }

    function or(a, b, c) {
        b instanceof nr ? (a.A = b, vr(a.A, a.G)) : (c || (b = qr(b, wr)), a.A = new nr(b, 0, a.G))
    }

    function pr(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }

    function qr(a, b, c) {
        return wa(a) ? (a = encodeURI(a).replace(b, xr), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }

    function xr(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }

    var rr = /[#\/\?@]/g, tr = /[\#\?:]/g, sr = /[\#\?]/g, wr = /[\#\?@]/g, ur = /#/g;

    function nr(a, b, c) {
        this.ca = this.A = null;
        this.B = a || null;
        this.C = !!c
    }

    function yr(a) {
        a.A || (a.A = new ej, a.ca = 0, a.B && ir(a.B, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }

    q = nr.prototype;
    q.Cb = function () {
        yr(this);
        return this.ca
    };
    q.add = function (a, b) {
        yr(this);
        this.B = null;
        a = zr(this, a);
        var c = this.A.get(a);
        c || this.A.set(a, c = []);
        c.push(b);
        this.ca = this.ca + 1;
        return this
    };
    q.remove = function (a) {
        yr(this);
        a = zr(this, a);
        return gj(this.A.B, a) ? (this.B = null, this.ca = this.ca - this.A.get(a).length, this.A.remove(a)) : !1
    };
    q.clear = function () {
        this.A = this.B = null;
        this.ca = 0
    };
    q.Pa = function () {
        yr(this);
        return 0 == this.ca
    };
    function Ar(a, b) {
        yr(a);
        b = zr(a, b);
        return gj(a.A.B, b)
    }

    q.lb = function () {
        yr(this);
        for (var a = this.A.Ca(), b = this.A.lb(), c = [], d = 0; d < b.length; d++)for (var e = a[d], f = 0; f < e.length; f++)c.push(b[d]);
        return c
    };
    q.Ca = function (a) {
        yr(this);
        var b = [];
        if (wa(a)) Ar(this, a) && (b = vb(b, this.A.get(zr(this, a)))); else {
            a = this.A.Ca();
            for (var c = 0; c < a.length; c++)b = vb(b, a[c])
        }
        return b
    };
    q.set = function (a, b) {
        yr(this);
        this.B = null;
        a = zr(this, a);
        Ar(this, a) && (this.ca = this.ca - this.A.get(a).length);
        this.A.set(a, [b]);
        this.ca = this.ca + 1;
        return this
    };
    q.get = function (a, b) {
        a = a ? this.Ca(a) : [];
        return 0 < a.length ? String(a[0]) : b
    };
    function Br(a, b, c) {
        a.remove(b);
        0 < c.length && (a.B = null, a.A.set(zr(a, b), wb(c)), a.ca = a.ca + c.length)
    }

    q.toString = function () {
        if (this.B)return this.B;
        if (!this.A)return "";
        for (var a = [], b = this.A.lb(), c = 0; c < b.length; c++)for (var d = b[c], e = encodeURIComponent(String(d)), d = this.Ca(d), f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
            a.push(g)
        }
        return this.B = a.join("&")
    };
    function zr(a, b) {
        b = String(b);
        a.C && (b = b.toLowerCase());
        return b
    }

    function vr(a, b) {
        b && !a.C && (yr(a), a.B = null, a.A.forEach(function (a, b) {
            var c = b.toLowerCase();
            b != c && (this.remove(b), Br(this, c, a))
        }, a));
        a.C = b
    };
    function Cr(a) {
        this.B = !1;
        this.C = a
    }

    Cr.prototype.A = function () {
        this.B || (this.B = !0, this.C())
    };
    function Dr() {
    }

    G(Dr, Error);
    function Er() {
        this.A = "pending";
        this.C = [];
        this.B = this.D = void 0
    }

    Pq(Er);
    function Fr() {
        Ha.call(this, "Multiple attempts to set the state of this Result")
    }

    G(Fr, Ha);
    q = Er.prototype;
    q.getError = h("B");
    function Gr(a, b) {
        "pending" == a.A ? a.C.push({ua: b, scope: null}) : b.call(void 0, a)
    }

    q.Jk = function (a) {
        if ("pending" == this.A) this.D = a, this.A = "success", Hr(this); else if (!Ir(this))throw new Fr;
    };
    q.qh = function (a) {
        if ("pending" == this.A) this.B = a, this.A = "error", Hr(this); else if (!Ir(this))throw new Fr;
    };
    function Hr(a) {
        var b = a.C;
        a.C = [];
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.ua.call(d.scope, a)
        }
    }

    q.cancel = function () {
        return "pending" == this.A ? (this.qh(new Dr), !0) : !1
    };
    function Ir(a) {
        return "error" == a.A && a.B instanceof Dr
    }

    q.then = function (a, b, c) {
        var d, e, f = new Rq(function (a, b) {
            d = a;
            e = b
        });
        Gr(this, function (a) {
            Ir(a) ? f.cancel() : "success" == a.A ? d(a.D) : "error" == a.A && e(a.getError())
        });
        return f.then(a, b, c)
    };
    function Jr(a) {
        var b = new Er;
        a.then(b.Jk, b.qh, b);
        return b
    };
    function Kr(a, b) {
        this.B = a || Lr;
        this.C = b || C
    }

    Kr.prototype.A = function (a, b) {
        a = new kr(a);
        var c = Jr(gr(a.toString(), Fa(this.B, !a.C, !!a.B && "data" === a.B))), d = this;
        Gr(c, function (a) {
            try {
                b(a.D)
            } catch (f) {
                throw d.C(f), f;
            }
        });
        return new Cr(function () {
            c.cancel()
        })
    };
    function Lr(a, b) {
        var c = bk("IMG");
        a || b || (c.crossOrigin = "");
        return c
    };
    function Mr(a, b) {
        this.B = a;
        this.C = b
    }

    Mr.prototype.A = function (a, b, c) {
        b = new Nr(this.B, b);
        a = new Or(a, E(b.C, b), this.C);
        b.B = a;
        Pr(this.B, a, c || 2);
        return b
    };
    function Nr(a, b) {
        this.G = a;
        this.F = b;
        this.D = !1;
        this.B = null
    }

    Nr.prototype.C = function (a) {
        this.D || (this.F(a), this.D = !0)
    };
    Nr.prototype.A = function () {
        this.B && (this.G.remove(this.B), this.C(void 0))
    };
    function Or(a, b, c) {
        this.C = a;
        this.A = b;
        this.B = c;
        this.state = null
    }

    Or.prototype.start = function (a) {
        var b = this.A;
        this.B.A(this.C, function (c) {
            a();
            b(c)
        })
    };
    Or.prototype.cancel = function () {
        this.A(void 0);
        return !1
    };
    function Qr(a, b) {
        this.A = new Mr(a, b ? b : new Kr)
    }

    Qr.prototype.Ja = function (a, b, c) {
        if (!a)return b(null), C;
        a = this.A.A(a, function (a) {
            b(a)
        }, c || 3);
        return E(a.A, a)
    };
    var Rr = null;

    function Sr(a) {
        return Rr ? null != Rr.Pg(a) : !1
    };
    function Tr(a, b) {
        this.B = b;
        this.A = new Qr(a, new Kr(function () {
            return bk("IMG")
        }))
    }

    Tr.prototype.ub = function (a, b, c, d, e, f, g) {
        a = Rr.Wm(this.B, d, b, c);
        return a ? this.A.Ja(a, f.ua(e, "custom-pano-tile"), g) : (e(null), C)
    };
    Tr.prototype.Vb = aa();
    function Ur(a, b) {
        V.call(this, "CUTS", wb(arguments))
    }

    G(Ur, V);
    function Vr(a, b, c, d) {
        a(new Tr(c, d))
    };
    function Wr(a) {
        this.B = a;
        this.A = Math.ceil(3 * a.length / 4);
        if (!x(Xr[0])) {
            for (a = 0; a < Xr.length; a++)Xr[a] = Math.pow(2, a - 150);
            for (a = 0; 65 > a; a++)Yr["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(a)] = a;
            for (a = 0; 65 > a; a++)Zr["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charCodeAt(a)] = a
        }
    }

    var Xr = Array(256), Yr = Array(64), Zr = Array(64);

    function $r(a, b, c) {
        var d = Array(c), e = 0;
        b += Math.floor(b / 3);
        c = Math.ceil(4 * c / 3);
        var f = a.B.length;
        f - b < c && (c = f - b);
        for (var f = Zr, g = b - b % 4; g < b + c; g += 4) {
            var k = e, l = g >= b, k = k + (l ? 1 : 0), m = g + 1 >= b && k < d.length, k = k + (m ? 1 : 0), k = g + 2 >= b && k < d.length;
            if (l) {
                var n = f[a.B.charCodeAt(g + 0)];
                if (!x(n))return null
            }
            if (l || m) {
                var p = f[a.B.charCodeAt(g + 1)];
                if (!x(p))return null
            }
            if (m || k) {
                var r = f[a.B.charCodeAt(g + 2)];
                if (!x(r))return null
            }
            if (k) {
                var u = f[a.B.charCodeAt(g + 3)];
                if (!x(u))return null
            }
            l && 64 != n && 64 != p && (d[e++] = n << 2 | p >> 4);
            m && 64 != p && 64 !=
            r && (d[e++] = p << 4 & 240 | r >> 2);
            k && 64 != r && 64 != u && (d[e++] = r << 6 & 192 | u)
        }
        d.length = e;
        return d
    }

    function Jp(a, b) {
        if (!(0 > b || b > a.A - 1) && (a = $r(a, b, 1)) && 1 == a.length)return a[0]
    }

    function as(a, b) {
        if (!(0 > b || b > a.A - 2 || (a = $r(a, b, 2), 2 > a.length)))return a[0] + (a[1] << 8)
    }

    function bs(a, b, c) {
        if (!a.A)return [];
        var d = 4 * c;
        if (0 > b || b + d > a.A)return [];
        c = Array(c);
        a = $r(a, b, d);
        for (b = 0; b < c.length; b++)d = 4 * b, c[b] = 0 == (a[d + 3] & 127 | a[d + 2] | a[d + 1] | a[d]) ? 0 : (1 - ((a[d + 3] & 128) >> 6)) * ((a[d + 2] | 128) << 16 | a[d + 1] << 8 | a[d]) * Xr[(a[d + 3] & 127) << 1 | (a[d + 2] & 128) >> 7];
        return c
    };
    function cs(a) {
        this.C = null;
        this.G = this.D = this.F = 0;
        this.B = null;
        this.A = new Wr(a)
    }

    q = cs.prototype;
    q.be = ba("C");
    q.ae = da(1);
    q.start = function () {
        return this.C ? this.kl : xj
    };
    q.kl = function () {
        if (8 != Jp(this.A, 0) || 8 != Jp(this.A, 7)) {
            var a = this.C;
            a.C = Fp;
            a.Kb();
            return xj
        }
        this.G = as(this.A, 1) || 0;
        this.F = as(this.A, 3) || 0;
        this.D = as(this.A, 5) || 0;
        this.H = a = Jp(this.A, 7) || 0;
        a += this.F * this.D;
        this.B = bs(this.A, a, 4 * this.G);
        for (var a = 0, b = this.B.length; a < b; ++a)this.B[a] *= -1;
        return this.Ck
    };
    q.Ck = function () {
        var a = this.C;
        a.C = new Cp(this.F, this.D, this.B, this.A, this.H);
        a.Kb();
        return xj
    };
    function ds() {
        this.C = null;
        this.B = [];
        this.A = null
    };
    var es = {
            Yh: ["BC", "AD"],
            Xh: ["Before Christ", "Anno Domini"],
            bi: "JFMAMJJASOND".split(""),
            ji: "JFMAMJJASOND".split(""),
            ai: "January February March April May June July August September October November December".split(" "),
            ii: "January February March April May June July August September October November December".split(" "),
            fi: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            li: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            oi: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            ni: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            hi: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            mi: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            en: "SMTWTFS".split(""),
            ki: "SMTWTFS".split(""),
            gi: ["Q1", "Q2", "Q3", "Q4"],
            di: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
            Rh: ["AM", "PM"],
            gf: ["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"],
            jf: ["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"],
            Sh: ["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"],
            Zh: 6,
            gn: [5, 6],
            $h: 5
        }, fs = es,
        fs = es;

    function gs(a, b, c) {
        xa(a) ? (this.A = hs(a, b || 0, c || 1), is(this, c || 1)) : za(a) ? (this.A = hs(a.getFullYear(), a.getMonth(), a.getDate()), is(this, a.getDate())) : (this.A = new Date(F()), a = this.A.getDate(), this.A.setHours(0), this.A.setMinutes(0), this.A.setSeconds(0), this.A.setMilliseconds(0), is(this, a))
    }

    function hs(a, b, c) {
        b = new Date(a, b, c);
        0 <= a && 100 > a && b.setFullYear(b.getFullYear() - 1900);
        return b
    }

    q = gs.prototype;
    q.getFullYear = function () {
        return this.A.getFullYear()
    };
    q.getMonth = function () {
        return this.A.getMonth()
    };
    q.getDate = function () {
        return this.A.getDate()
    };
    q.getTime = function () {
        return this.A.getTime()
    };
    q.getDay = function () {
        return this.A.getDay()
    };
    q.getUTCFullYear = function () {
        return this.A.getUTCFullYear()
    };
    q.getUTCMonth = function () {
        return this.A.getUTCMonth()
    };
    q.getUTCDate = function () {
        return this.A.getUTCDate()
    };
    q.getUTCHours = function () {
        return this.A.getUTCHours()
    };
    q.getUTCMinutes = function () {
        return this.A.getUTCMinutes()
    };
    q.getTimezoneOffset = function () {
        return this.A.getTimezoneOffset()
    };
    function js(a) {
        a = a.getTimezoneOffset();
        if (0 == a) a = "Z"; else {
            var b = Math.abs(a) / 60, c = Math.floor(b), b = 60 * (b - c);
            a = (0 < a ? "-" : "+") + bb(c, 2) + ":" + bb(b, 2)
        }
        return a
    }

    q.set = function (a) {
        this.A = new Date(a.getFullYear(), a.getMonth(), a.getDate())
    };
    q.add = function (a) {
        if (a.G || a.D) {
            var b = this.getMonth() + a.D + 12 * a.G, c = this.getFullYear() + Math.floor(b / 12), b = b % 12;
            0 > b && (b += 12);
            var d;
            a:{
                switch (b) {
                    case 1:
                        d = 0 != c % 4 || 0 == c % 100 && 0 != c % 400 ? 28 : 29;
                        break a;
                    case 5:
                    case 8:
                    case 10:
                    case 3:
                        d = 30;
                        break a
                }
                d = 31
            }
            d = Math.min(d, this.getDate());
            this.A.setDate(1);
            this.A.setFullYear(c);
            this.A.setMonth(b);
            this.A.setDate(d)
        }
        a.A && (a = new Date((new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12)).getTime() + 864E5 * a.A), this.A.setDate(1), this.A.setFullYear(a.getFullYear()),
            this.A.setMonth(a.getMonth()), this.A.setDate(a.getDate()), is(this, a.getDate()))
    };
    q.ke = function (a, b) {
        return [this.getFullYear(), bb(this.getMonth() + 1, 2), bb(this.getDate(), 2)].join(a ? "-" : "") + (b ? js(this) : "")
    };
    q.toString = function () {
        return this.ke()
    };
    function is(a, b) {
        a.getDate() != b && a.A.setUTCHours(a.A.getUTCHours() + (a.getDate() < b ? 1 : -1))
    }

    q.valueOf = function () {
        return this.A.valueOf()
    };
    function ks(a, b, c, d, e, f, g) {
        this.A = xa(a) ? new Date(a, b || 0, c || 1, d || 0, e || 0, f || 0, g || 0) : new Date(a && a.getTime ? a.getTime() : F())
    }

    G(ks, gs);
    q = ks.prototype;
    q.getHours = function () {
        return this.A.getHours()
    };
    q.getMinutes = function () {
        return this.A.getMinutes()
    };
    q.getSeconds = function () {
        return this.A.getSeconds()
    };
    q.getUTCHours = function () {
        return this.A.getUTCHours()
    };
    q.getUTCMinutes = function () {
        return this.A.getUTCMinutes()
    };
    q.add = function (a) {
        gs.prototype.add.call(this, a);
        a.B && this.A.setUTCHours(this.A.getUTCHours() + a.B);
        a.C && this.A.setUTCMinutes(this.A.getUTCMinutes() + a.C);
        a.F && this.A.setUTCSeconds(this.A.getUTCSeconds() + a.F)
    };
    q.ke = function (a, b) {
        var c = gs.prototype.ke.call(this, a);
        return a ? c + " " + bb(this.getHours(), 2) + ":" + bb(this.getMinutes(), 2) + ":" + bb(this.getSeconds(), 2) + (b ? js(this) : "") : c + "T" + bb(this.getHours(), 2) + bb(this.getMinutes(), 2) + bb(this.getSeconds(), 2) + (b ? js(this) : "")
    };
    q.toString = function () {
        return this.ke()
    };
    function ls() {
    }

    function ms(a) {
        if ("number" == typeof a) {
            var b = new ls;
            b.B = a;
            var c;
            c = a;
            if (0 == c) c = "Etc/GMT"; else {
                var d = ["Etc/GMT", 0 > c ? "-" : "+"];
                c = Math.abs(c);
                d.push(Math.floor(c / 60) % 100);
                c %= 60;
                0 != c && d.push(":", bb(c, 2));
                c = d.join("")
            }
            b.D = c;
            c = a;
            0 == c ? c = "UTC" : (d = ["UTC", 0 > c ? "+" : "-"], c = Math.abs(c), d.push(Math.floor(c / 60) % 100), c %= 60, 0 != c && d.push(":", c), c = d.join(""));
            a = ns(a);
            b.F = [c, c];
            b.A = {fn: a, hf: a};
            b.C = [];
            return b
        }
        b = new ls;
        b.D = a.id;
        b.B = -a.std_offset;
        b.F = a.names;
        b.A = a.names_ext;
        b.C = a.transitions;
        return b
    }

    function ns(a) {
        var b = ["GMT"];
        b.push(0 >= a ? "+" : "-");
        a = Math.abs(a);
        b.push(bb(Math.floor(a / 60) % 100, 2), ":", bb(a % 60, 2));
        return b.join("")
    }

    function os(a, b) {
        b = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes()) / 36E5;
        for (var c = 0; c < a.C.length && b >= a.C[c];)c += 2;
        return 0 == c ? 0 : a.C[c - 1]
    };
    function ps(a, b) {
        this.B = [];
        this.A = b || fs;
        "number" == typeof a ? qs(this, a) : rs(this, a)
    }

    var ss = [/^\'(?:[^\']|\'\')*(\'|$)/, /^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|V+|w+|z+|Z+)/, /^[^\'GyMkSEahKHcLQdmsvVwzZ]+/];

    function ts(a) {
        return a.getHours ? a.getHours() : 0
    }

    function rs(a, b) {
        for (us && (b = b.replace(/\u200f/g, "")); b;) {
            for (var c = b, d = 0; d < ss.length; ++d) {
                var e = b.match(ss[d]);
                if (e) {
                    var f = e[0];
                    b = b.substring(f.length);
                    0 == d && ("''" == f ? f = "'" : (f = f.substring(1, "'" == e[1] ? f.length - 1 : f.length), f = f.replace(/\'\'/g, "'")));
                    a.B.push({text: f, type: d});
                    break
                }
            }
            if (c === b)throw Error("Malformed pattern part: " + b);
        }
    }

    ps.prototype.format = function (a, b) {
        if (!a)throw Error("The date to format must be non-null.");
        var c = b ? 6E4 * (a.getTimezoneOffset() - (b.B - os(b, a))) : 0, d = c ? new Date(a.getTime() + c) : a, e = d;
        b && d.getTimezoneOffset() != a.getTimezoneOffset() && (e = 6E4 * (d.getTimezoneOffset() - a.getTimezoneOffset()), d = new Date(d.getTime() + e), c += 0 < c ? -864E5 : 864E5, e = new Date(a.getTime() + c));
        for (var c = [], f = 0; f < this.B.length; ++f) {
            var g = this.B[f].text;
            1 == this.B[f].type ? c.push(vs(this, g, a, d, e, b)) : c.push(g)
        }
        return c.join("")
    };
    function qs(a, b) {
        var c;
        if (4 > b) c = a.A.gf[b]; else if (8 > b) c = a.A.jf[b - 4]; else if (12 > b) c = a.A.Sh[b - 8], c = c.replace("{1}", a.A.gf[b - 8]), c = c.replace("{0}", a.A.jf[b - 8]); else {
            qs(a, 10);
            return
        }
        rs(a, c)
    }

    function ws(a, b) {
        b = String(b);
        a = a.A || fs;
        if (void 0 !== a.ri) {
            for (var c = [], d = 0; d < b.length; d++) {
                var e = b.charCodeAt(d);
                c.push(48 <= e && 57 >= e ? String.fromCharCode(a.ri + e - 48) : b.charAt(d))
            }
            b = c.join("")
        }
        return b
    }

    var us = !1;

    function xs(a) {
        if (!(a.getHours && a.getSeconds && a.getMinutes))throw Error("The date to format has no time (probably a goog.date.Date). Use Date or goog.date.DateTime, or use a pattern without time fields.");
    }

    function vs(a, b, c, d, e, f) {
        var g = b.length;
        switch (b.charAt(0)) {
            case "G":
                return c = 0 < d.getFullYear() ? 1 : 0, 4 <= g ? a.A.Xh[c] : a.A.Yh[c];
            case "y":
                return c = d.getFullYear(), 0 > c && (c = -c), 2 == g && (c %= 100), ws(a, bb(c, g));
            case "M":
                a:switch (c = d.getMonth(), g) {
                    case 5:
                        g = a.A.bi[c];
                        break a;
                    case 4:
                        g = a.A.ai[c];
                        break a;
                    case 3:
                        g = a.A.fi[c];
                        break a;
                    default:
                        g = ws(a, bb(c + 1, g))
                }
                return g;
            case "k":
                return xs(e), ws(a, bb(ts(e) || 24, g));
            case "S":
                return c = e.getTime() % 1E3 / 1E3, ws(a, c.toFixed(Math.min(3, g)).substr(2) + (3 < g ? bb(0, g - 3) : ""));
            case "E":
                return c =
                    d.getDay(), 4 <= g ? a.A.oi[c] : a.A.hi[c];
            case "a":
                return xs(e), g = ts(e), a.A.Rh[12 <= g && 24 > g ? 1 : 0];
            case "h":
                return xs(e), ws(a, bb(ts(e) % 12 || 12, g));
            case "K":
                return xs(e), ws(a, bb(ts(e) % 12, g));
            case "H":
                return xs(e), ws(a, bb(ts(e), g));
            case "c":
                a:switch (c = d.getDay(), g) {
                    case 5:
                        g = a.A.ki[c];
                        break a;
                    case 4:
                        g = a.A.ni[c];
                        break a;
                    case 3:
                        g = a.A.mi[c];
                        break a;
                    default:
                        g = ws(a, bb(c, 1))
                }
                return g;
            case "L":
                a:switch (c = d.getMonth(), g) {
                    case 5:
                        g = a.A.ji[c];
                        break a;
                    case 4:
                        g = a.A.ii[c];
                        break a;
                    case 3:
                        g = a.A.li[c];
                        break a;
                    default:
                        g = ws(a, bb(c +
                            1, g))
                }
                return g;
            case "Q":
                return c = Math.floor(d.getMonth() / 3), 4 > g ? a.A.gi[c] : a.A.di[c];
            case "d":
                return ws(a, bb(d.getDate(), g));
            case "m":
                return xs(e), ws(a, bb(e.getMinutes(), g));
            case "s":
                return xs(e), ws(a, bb(e.getSeconds(), g));
            case "v":
                return g = f || ms(c.getTimezoneOffset()), g.D;
            case "V":
                return a = f || ms(c.getTimezoneOffset()), 2 >= g ? a.D : 0 < os(a, c) ? x(a.A.Wh) ? a.A.Wh : a.A.DST_GENERIC_LOCATION : x(a.A.hf) ? a.A.hf : a.A.STD_GENERIC_LOCATION;
            case "w":
                return c = a.A.$h, e = new Date(e.getFullYear(), e.getMonth(), e.getDate()),
                    b = a.A.Zh || 0, c = e.valueOf() + 864E5 * (((x(c) ? c : 3) - b + 7) % 7 - ((e.getDay() + 6) % 7 - b + 7) % 7), ws(a, bb(Math.floor(Math.round((c - (new Date((new Date(c)).getFullYear(), 0, 1)).valueOf()) / 864E5) / 7) + 1, g));
            case "z":
                return a = f || ms(c.getTimezoneOffset()), 4 > g ? a.F[0 < os(a, c) ? 2 : 0] : a.F[0 < os(a, c) ? 3 : 1];
            case "Z":
                return e = f || ms(c.getTimezoneOffset()), 4 > g ? (g = -(e.B - os(e, c)), a = [0 > g ? "-" : "+"], g = Math.abs(g), a.push(bb(Math.floor(g / 60) % 100, 2), bb(g % 60, 2)), g = a.join("")) : g = ws(a, ns(e.B - os(e, c))), g;
            default:
                return ""
        }
    };
    function ys(a) {
        var b = new eh;
        U(b, a);
        return b
    }

    function zs(a, b) {
        return As(qh(a), qh(b)) && As(ph(a), ph(b)) && As(rh(a), rh(b), 1)
    }

    function As(a, b, c) {
        return Math.abs(a - b) < (x(c) ? c : 1E-7)
    }

    function Bs(a, b) {
        if (K(a, 0)) {
            var c = jh(a), d = kh(b);
            K(c, 0) && sh(d, rh(c));
            K(c, 2) && (d.data[2] = qh(c));
            K(c, 1) && (d.data[1] = ph(c))
        }
        K(a, 1) && (c = lh(a), d = mh(b), K(c, 0) && (d.data[0] = th(c)), K(c, 2) && (d.data[2] = M(c, 2)), K(c, 1) && (d.data[1] = M(c, 1)));
        K(a, 3) && (b.data[3] = ih(a))
    };
    function Cs(a) {
        var b = new Mh;
        U(b, a);
        return b
    }

    function Ds(a) {
        var b = Wg(a.da());
        if (K(b, 1))return 2 == L(b, 1);
        a = Ph(a);
        return 1 === a || 2 === a || 4 === a || 13 === a || 11 === a || 5 === a
    }

    function Es(a) {
        var b = Wg(a.da());
        if (K(b, 1))return 3 == L(b, 1);
        a = Ph(a);
        return 3 === a || 10 === a || 15 === a || 12 === a || 7 === a || 27 === a
    }

    function Fs(a) {
        a = Wg(a.da());
        return K(a, 1) ? 4 == L(a, 1) : !1
    }

    function Gs(a) {
        a = new He(Zg(a.da()).data[5]);
        for (var b = 0; b < Q(a, 3); b++)if (9 == qd(a, 3, b))return !0;
        return !1
    }

    function Hs(a, b) {
        for (var c = 0; c < Q(a, 5); c++)if (b($g(a, c)))return $g(a, c);
        return null
    }

    function Is(a) {
        return Hs(a, function (a) {
            return 1 == L(new yf(a.data[0]), 0)
        })
    }

    function Js(a, b) {
        var c = !1;
        if (K(a, 0)) {
            var d = new Rd(a.data[0]);
            if (K(d, 0) && K(Yd(d), 2) && K(Yd(d), 3)) {
                var c = M(Yd(d), 2), e = M(Yd(d), 3);
                kh(b).data[2] = c;
                kh(b).data[1] = e;
                c = !0
            }
            K(d, 2) && (d = new Vd(d.data[2]), c = mh(b), K(d, 0) && (c.data[0] = M(d, 0)), K(d, 1) && (c.data[1] = M(d, 1, 90)), K(d, 2) && (c.data[2] = M(d, 2)), c = !0)
        }
        K(a, 2) && (b.data[3] = M(a, 2), c = !0);
        K(a, 1) && (a = new Od(a.data[1]), b = oh(b), uh(b, a.W()), wh(b, M(a, 0)), c = !0);
        return c
    }

    var Ks = new ps("MMM yyyy");

    function Ls(a) {
        if (K(Zg(a), 7)) {
            a = new qe(Zg(a).data[7]);
            var b = Id(new Fd(a.data[8]));
            return b ? b : Ks.format(new ks(M(a, 0), K(a, 1) ? M(a, 1) - 1 : void 0, K(a, 2) ? M(a, 2) : void 0, K(a, 3) ? M(a, 3) : void 0, K(a, 4) ? M(a, 4) : void 0))
        }
        return ""
    }

    function Ms(a, b) {
        return K(a, 21) && K(b, 21) ? (a = a.da(), b = b.da(), K(a, 1) && K(b, 1) && L(Vg(a), 0) == L(Vg(b), 0) && Vg(a).sa() == Vg(b).sa()) : K(a, 0) && K(b, 0) ? a.sa() == b.sa() : !1
    }

    function Ns(a) {
        return K(a.da(), 1) ? Vg(a.da()).sa() : K(a, 0) ? a.sa() : ""
    };
    function Os(a) {
        this.data = a || []
    }

    G(Os, J);
    function Ps(a) {
        this.data = a || []
    }

    G(Ps, J);
    function Qs(a) {
        this.data = a || []
    }

    G(Qs, J);
    Os.prototype.ha = function () {
        return new eh(this.data[8])
    };
    function Rs(a) {
        return new eh(P(a, 8))
    }

    Qs.prototype.eb = function () {
        return new Mh(this.data[4])
    };
    function Ss(a) {
        this.data = a || []
    }

    G(Ss, J);
    function Ts(a) {
        this.data = a || []
    }

    G(Ts, J);
    function Us(a) {
        this.data = a || []
    }

    G(Us, J);
    Ts.prototype.sa = function () {
        return new Us(this.data[0])
    };
    function Vs(a) {
        this.data = a || []
    }

    G(Vs, J);
    function Ws(a) {
        this.data = a || []
    }

    G(Ws, J);
    function Xs(a) {
        return L(a, 0)
    }

    function Ys(a) {
        return new Mh(a.data[4])
    }

    function Zs(a) {
        return new Mh(P(a, 4))
    };
    function $s(a) {
        this.data = a || []
    }

    G($s, J);
    function at(a) {
        this.data = a || []
    }

    G(at, J);
    function bt(a) {
        this.data = a || []
    }

    G(bt, J);
    bt.prototype.ha = function () {
        return new eh(this.data[0])
    };
    function ct(a) {
        var b = new Os, c = null, d = null, e = null;
        b.data[13] = K(Yg(a), 5) ? Id(new Fd(Yg(a).data[5])) : Id(new Fd(Yg(a).data[6]));
        for (var f = 0; f < Q(a, 5); ++f) {
            var g = $g(a, f);
            K(g, 1) && (e = e || g, 2 === L(new yf(g.data[0]), 0) && (c = g), 1 === L(new yf(g.data[0]), 0) && (d = g))
        }
        null == e && 0 < Q(a, 5) && (e = $g(a, 0));
        d && (dt(d, b), f = Pf(d), (new fh(P(b, 9))).data[2] = M(Yd(f), 2), (new fh(P(b, 9))).data[1] = M(Yd(f), 3));
        c && dt(c, b);
        c || d || !e || dt(e, b);
        if (K(a, 4)) {
            d = new Ld(a.data[4]);
            c = [];
            for (f = 0; f < Q(d, 0); ++f)e = new Md(sd(d, 0, f)), c.push(Id(Nd(e)));
            for (f =
                     0; f < Q(d, 1); ++f)e = new Md(sd(d, 1, f)), c.push(Id(Nd(e)));
            for (f = 0; f < Q(d, 2); ++f)e = new Md(sd(d, 2, f)), c.push(Id(Nd(e)));
            0 < Q(d, 4) && (f = new Md(sd(d, 4, 0)), K(f, 1) && (b.data[14] = O(f, 1)));
            b.data[11] = c.join(" ")
        }
        K(a, 1) && (f = Vg(a).sa(), b.data[0] = f);
        K(a, 2) && (f = Wg(a), c = et(L(f, 0), L(f, 1), Zg(a)), b.data[6] = c, uh(new hh(P(b, 3)), (new Od(he(f).data[1])).W()), wh(new hh(P(b, 3)), M(new Od(he(f).data[1]), 0)), b.data[4] = Q(he(f), 0) - 1, b.data[5] = Q(he(f), 0) - 1, K(f, 2) && (uh(oh(Rs(b)), (new Od(f.data[2])).W()), wh(oh(Rs(b)), M(new Od(f.data[2]),
            0))));
        if (!(0 != (new hh(b.data[3])).W() && 0 != vh(new hh(b.data[3])) || 10 != L(Vg(a), 0) && 3 != L(Vg(a), 0))) {
            uh(new hh(P(b, 3)), 512);
            wh(new hh(P(b, 3)), 512);
            f = nh(b.ha());
            f = Math.max(f.W(), vh(f));
            c = 0;
            for (d = 512; d < f;)d <<= 1, c++;
            f = c;
            b.data[4] = f;
            b.data[5] = f
        }
        b.data[1] = 1 != L(new Ag(a.data[7]), 1, 1);
        return b
    }

    function et(a, b, c) {
        switch (a) {
            case 2:
                switch (b) {
                    case 2:
                        if (2 == L(c, 0))return 11;
                        if (1 == L(c, 0))return 2;
                        for (a = 0; a < Q(c, 3); ++a)if (1 == qd(c, 3, a))return 2;
                        return 3 == L(c, 0) ? 1 : 11;
                    case 1:
                        return 24;
                    default:
                        return 3
                }
            case 10:
            case 3:
                switch (b) {
                    case 2:
                        return 11;
                    default:
                        return 12
                }
            case 4:
                return 10;
            case 5:
                return 18
        }
        return 27
    }

    function ft(a) {
        switch (a) {
            case 1:
                return 7;
            case 2:
                return 0;
            case 3:
            case 10:
                return 4;
            case 4:
                return 1;
            default:
                return 0
        }
    }

    function dt(a, b) {
        var c = Rs(b), d = Pf(a), e = new ie;
        U(new Rd(P(e, 0)), d);
        Js(e, c);
        K(lh(c), 1) || (mh(c).data[1] = 90);
        K(jh(c), 0) || sh(kh(c), 3);
        K(new Ud(d.data[1]), 0) && (b.data[23] = M(new Ud(d.data[1]), 0));
        K(new Vd(d.data[2]), 0) && (b.data[10] = M(new Vd(d.data[2]), 0));
        K(d, 3) && (b.data[2] = O(new Wd(d.data[3]), 0, ""));
        for (c = 0; c < Q(a, 12); ++c) {
            var f = new wf(sd(a, 12, c));
            if (Q(f, 0))for (var e = new vf(sd(f, 0, 0)), g = Id(new Fd(e.data[2])), k = 0; k < Q(f, 1); ++k) {
                e = new Qs(rd(b, 19));
                (new Mh(P(e, 4))).data[1] = 0;
                (new Mh(P(e, 4))).data[2] = 1;
                e.data[3] =
                    g;
                var l = qd(f, 1, k);
                e.data[0] = l
            }
        }
        for (c = 0; c < Q(a, 6); ++c)if (e = new Df(sd(a, 6, c)), K(e, 0) && (k = Rf(new Gf(a.data[3]), M(e, 0)), K(k, 2))) {
            var e = new Qs(rd(b, 19)), f = M(Yd(new Rd(k.data[2])), 2), g = M(Yd(new Rd(k.data[2])), 3), l = Jb(M(Yd(d), 2)), m = Jb(f), n = Jb(g) - Jb(M(Yd(d), 3));
            n > Math.PI ? n -= 2 * Math.PI : n < -Math.PI && (n += 2 * Math.PI);
            yl(jm, 0, 0, 1);
            yl(km, Math.cos(l), 0, Math.sin(l));
            yl(lm, Math.cos(n) * Math.cos(m), Math.sin(n) * Math.cos(m), Math.sin(m));
            Fl(lm, km, mm);
            e.data[0] = (360 + Kb(Math.atan2((0 < n ? 1 : 0 > n ? -1 : n) * Math.sqrt(mm[0] * mm[0] + mm[2] *
                        mm[2]), mm[1]))) % 360;
            e = new Mh(P(e, 4));
            l = ft(L(Qf(k), 0));
            e.data[1] = l;
            e.data[2] = 1;
            k = Qf(k).sa();
            e.data[0] = k;
            e = kh(Rh(e));
            e.data[2] = f;
            e.data[1] = g;
            sh(e, 3)
        }
        for (c = 0; c < Q(a, 7); ++c)d = M(new Ef(sd(a, 7, c)), 0), 0 > d || d >= Q(new Gf(a.data[3]), 0) || (f = Rf(new Gf(a.data[3]), d), d = new Wd((new Rd(f.data[2])).data[3]), e = new Ps(rd(b, 20)), f = Qf(f).sa(), e.data[1] = f, e.data[0] = O(d, 0, ""), e.data[2] = M(d, 1), K(d, 3) && (e.data[4] = Id(new Fd(d.data[3]))), K(d, 2) && (e.data[3] = Id(new Fd(d.data[2]))))
    };
    function gt(a) {
        this.A = a
    }

    gt.prototype.Fa = function (a, b) {
        a = new ds;
        a.A = Rr.Pg(this.A);
        if (a.A) {
            a.C = ct(a.A);
            var c = new cs("");
            a.B.push(c);
            b(a)
        } else b(null)
    };
    function ht(a) {
        V.call(this, "CUCS", wb(arguments))
    }

    G(ht, V);
    function it(a, b, c) {
        a(new gt(c))
    };
    function jt() {
    }

    jt.prototype.A = function (a) {
        var b;
        a:{
            if (a = a.A) {
                var c = [];
                for (b in a)jr(b, a[b], c);
                c[0] = "";
                b = c.join("");
                if ("" != b)break a
            }
            b = ""
        }
        return b
    };
    function kt(a) {
        this.A = {};
        this.va = a || ""
    }

    kt.prototype.sa = h("va");
    function lt(a, b) {
        this.A = [];
        for (var c = 0; c < b.length; c++)this.A.push(new kr(b[c]));
        this.B = a;
        this.C = new jt
    }

    lt.prototype.ub = function (a, b, c, d, e, f, g) {
        var k = new kt;
        a = Ns(Ys(a.Ea()));
        if (!a)return C;
        k.A.panoid = a;
        k.A.output = "tile";
        k.A.x = "" + b;
        k.A.y = "" + c;
        k.A.zoom = "" + d;
        k.A.nbt = "";
        k.A.fover = "2";
        b = this.A[(b + c) % this.A.length];
        e = f.ua(e, "cts-get-tile");
        return this.B.Ja(mt(this, b, k), e, g)
    };
    function mt(a, b, c) {
        b = b.toString();
        a = a.C.A(c);
        return -1 == b.indexOf("?") ? b + "?" + a : b + "&" + a
    }

    lt.prototype.Vb = C;
    function nt(a, b) {
        V.call(this, "CTS", wb(arguments))
    }

    G(nt, V);
    function ot(a, b, c, d) {
        b = new lt(c, d);
        a(b)
    };
    function pt(a, b, c, d) {
        V.call(this, "FPSC", wb(arguments))
    }

    G(pt, V);
    function qt(a, b, c) {
        V.call(this, "FPCS", wb(arguments))
    }

    G(qt, V);
    function rt(a, b, c, d) {
        V.call(this, "FPTS", wb(arguments))
    }

    G(rt, V);
    function st(a, b, c) {
        this.C = c;
        this.B = a;
        this.A = b
    }

    st.prototype.Bc = function (a, b, c) {
        var d = this;
        Ej([this.A, this.B], C, b);
        this.B.get(function (b, f) {
            b.Fa(a, function (b) {
                c && f.ta(c);
                tt(d, a, f, b)
            }, f)
        }, b)
    };
    st.prototype.Hb = function (a, b, c, d, e, f) {
        function g(g, k) {
            f && e.ta(f);
            g ? k ? a.Kd(new kn(b, c, d, g), e) : a.Jd(new kn(b, c, d, g), e) : a.Le() ? a.Gd(b, c, d) : a.Hc(b, c, d)
        }

        var k = null, l = !1;
        Ej([this.A, this.B], C, e);
        this.A.get(function (e, f) {
            l || (k = e.ub(a, b, c, d, g, f))
        }, e);
        return function () {
            l = !0;
            k && k()
        }
    };
    function tt(a, b, c, d) {
        if (d && d.C) {
            var e = Ys(b.Ea()).da();
            if (K(e, 1) && d.A && K(d.A, 1) && !td(Vg(e), Vg(d.A))) b.Ec(d.A), b.od(); else {
                d.A && b.Ec(d.A);
                var f = d.C;
                a.A.get(function (a, b) {
                    a.Vb(f, b)
                }, c);
                b.Vb(f, c);
                for (c = 0; c < d.B.length; c++)e = d.B[c], e.be(b), iq(a.C, e, jq(e.ae(), !1))
            }
        } else b.od()
    };
    function ut(a, b) {
        null != a && this.Yd.apply(this, arguments)
    }

    q = ut.prototype;
    q.Zb = "";
    q.set = function (a) {
        this.Zb = "" + a
    };
    q.Yd = function (a, b, c) {
        this.Zb += String(a);
        if (null != b)for (var d = 1; d < arguments.length; d++)this.Zb += arguments[d];
        return this
    };
    q.clear = function () {
        this.Zb = ""
    };
    q.toString = h("Zb");
    function vt(a, b) {
        var c = Array.prototype.slice.call(arguments), d = c.shift();
        if ("undefined" == typeof d)throw Error("[goog.string.format] Template required");
        d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function (a, b, d, k, l, m, n, p) {
            if ("%" == m)return "%";
            var e = c.shift();
            if ("undefined" == typeof e)throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = e;
            return wt[m].apply(null, arguments)
        })
    }

    var wt = {
        s: function (a, b, c) {
            return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ? a + ab(" ", Number(c) - a.length) : ab(" ", Number(c) - a.length) + a
        }, f: function (a, b, c, d, e) {
            d = a.toString();
            isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
            var f;
            f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= Number(a) && (d = f + d);
            if (isNaN(c) || d.length >= Number(c))return d;
            d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
            a = Number(c) - d.length - f.length;
            return d = 0 <= b.indexOf("-", 0) ?
                f + d + ab(" ", a) : f + ab(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
        }, d: function (a, b, c, d, e, f, g, k) {
            return wt.f(parseInt(a, 10), b, c, d, 0, f, g, k)
        }
    };
    wt.i = wt.d;
    wt.u = wt.d;
    function xt(a) {
        this.A = void 0;
        this.Ia = {};
        if (a) {
            var b = ij(a);
            a = hj(a);
            for (var c = 0; c < b.length; c++)this.set(b[c], a[c])
        }
    }

    q = xt.prototype;
    q.set = function (a, b) {
        yt(this, a, b, !1)
    };
    q.add = function (a, b) {
        yt(this, a, b, !0)
    };
    function yt(a, b, c, d) {
        for (var e = 0; e < b.length; e++) {
            var f = b.charAt(e);
            a.Ia[f] || (a.Ia[f] = new xt);
            a = a.Ia[f]
        }
        if (d && void 0 !== a.A)throw Error('The collection already contains the key "' + b + '"');
        a.A = c
    }

    function zt(a, b) {
        for (var c = 0; c < b.length; c++)if (a = a.Ia[b.charAt(c)], !a)return;
        return a
    }

    q.get = function (a) {
        return (a = zt(this, a)) ? a.A : void 0
    };
    q.Ca = function () {
        var a = [];
        At(this, a);
        return a
    };
    function At(a, b) {
        void 0 !== a.A && b.push(a.A);
        for (var c in a.Ia)At(a.Ia[c], b)
    }

    q.lb = function (a) {
        var b = [];
        if (a) {
            for (var c = this, d = 0; d < a.length; d++) {
                var e = a.charAt(d);
                if (!c.Ia[e])return [];
                c = c.Ia[e]
            }
            Bt(c, a, b)
        } else Bt(this, "", b);
        return b
    };
    function Bt(a, b, c) {
        void 0 !== a.A && c.push(b);
        for (var d in a.Ia)Bt(a.Ia[d], b + d, c)
    }

    q.clear = function () {
        this.Ia = {};
        this.A = void 0
    };
    q.remove = function (a) {
        for (var b = this, c = [], d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if (!b.Ia[e])throw Error('The collection does not have the key "' + a + '"');
            c.push([b, e]);
            b = b.Ia[e]
        }
        a = b.A;
        for (delete b.A; 0 < c.length;)if (e = c.pop(), b = e[0], e = e[1], b.Ia[e].Pa()) delete b.Ia[e]; else break;
        return a
    };
    q.Cb = function () {
        var a = this.Ca();
        if (a.Cb && "function" == typeof a.Cb) a = a.Cb(); else if (va(a) || wa(a)) a = a.length; else {
            var b = 0, c;
            for (c in a)b++;
            a = b
        }
        return a
    };
    q.Pa = function () {
        return void 0 === this.A && Sb(this.Ia)
    };
    function Yt(a) {
        return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    }

    function Zt(a) {
        a = String(a);
        if (Yt(a))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    };
    function $t() {
    }

    var au = "function" == typeof Uint8Array;

    function bu(a, b) {
        a.A = null;
        b || (b = []);
        a.M = void 0;
        a.D = -1;
        a.B = b;
        a:{
            if (a.B.length) {
                b = a.B.length - 1;
                var c = a.B[b];
                if (c && "object" == typeof c && !ua(c) && !(au && c instanceof Uint8Array)) {
                    a.F = b - a.D;
                    a.C = c;
                    break a
                }
            }
            a.F = Number.MAX_VALUE
        }
        a.N = {}
    }

    var cu = [];

    function W(a, b) {
        if (b < a.F) {
            b += a.D;
            var c = a.B[b];
            return c === cu ? a.B[b] = [] : c
        }
        c = a.C[b];
        return c === cu ? a.C[b] = [] : c
    }

    function du(a, b) {
        a = W(a, b);
        return null == a ? a : +a
    }

    function eu(a, b) {
        a = W(a, b);
        return null == a ? !1 : a
    }

    function X(a, b, c) {
        b < a.F ? a.B[b + a.D] = c : a.C[b] = c
    }

    function fu(a) {
        if (a.A)for (var b in a.A) {
            var c = a.A[b];
            if (ua(c))for (var d = 0; d < c.length; d++)c[d] && c[d].ib(); else c && c.ib()
        }
    }

    $t.prototype.ib = function () {
        fu(this);
        return this.B
    };
    $t.prototype.toString = function () {
        fu(this);
        return this.B.toString()
    };
    $t.prototype.getExtension = function (a) {
        if (this.C) {
            this.A || (this.A = {});
            var b = a.C;
            if (a.D) {
                if (a.B())return this.A[b] || (this.A[b] = ob(this.C[b] || [], function (b) {
                    return new a.A(b)
                })), this.A[b]
            } else if (a.B())return !this.A[b] && this.C[b] && (this.A[b] = new a.A(this.C[b])), this.A[b];
            return this.C[b]
        }
    };
    function gu(a) {
        bu(this, a)
    }

    G(gu, $t);
    q = gu.prototype;
    q.he = function () {
        return W(this, 1)
    };
    q.dh = function (a) {
        X(this, 1, a)
    };
    q.W = function () {
        return W(this, 12)
    };
    q.lh = function (a) {
        X(this, 12, a)
    };
    q.We = function () {
        return W(this, 13)
    };
    q.Zg = function (a) {
        X(this, 13, a)
    };
    q.Kj = function () {
        return W(this, 33)
    };
    q.zm = function (a) {
        X(this, 33, a)
    };
    q.dg = function () {
        return eu(this, 2)
    };
    q.Yg = function (a) {
        X(this, 2, a)
    };
    q.bg = function () {
        return W(this, 51)
    };
    q.Xg = function (a) {
        X(this, 51, a)
    };
    q.eg = function () {
        return W(this, 32)
    };
    q.ah = function (a) {
        X(this, 32, a)
    };
    q.kg = function () {
        return eu(this, 19)
    };
    q.eh = function (a) {
        X(this, 19, a)
    };
    q.lg = function () {
        return eu(this, 52)
    };
    q.gh = function (a) {
        X(this, 52, a)
    };
    q.mg = function () {
        return eu(this, 67)
    };
    q.hh = function (a) {
        X(this, 67, a)
    };
    q.Si = function () {
        return W(this, 80)
    };
    q.Cl = function (a) {
        X(this, 80, a)
    };
    q.ag = function () {
        return eu(this, 20)
    };
    q.Wg = function (a) {
        X(this, 20, a)
    };
    q.jg = function () {
        return W(this, 60)
    };
    q.bh = function (a) {
        X(this, 60, a)
    };
    q.Ti = function () {
        return eu(this, 3)
    };
    q.Dl = function (a) {
        X(this, 3, a)
    };
    q.pl = function () {
        return eu(this, 4)
    };
    q.Ol = function (a) {
        X(this, 4, a)
    };
    q.ij = function () {
        return W(this, 65)
    };
    q.Wl = function (a) {
        X(this, 65, a)
    };
    q.ng = function () {
        return W(this, 9)
    };
    q.ih = function (a) {
        X(this, 9, a)
    };
    q.og = function () {
        return W(this, 10)
    };
    q.jh = function (a) {
        X(this, 10, a)
    };
    q.Vg = function () {
        return W(this, 11)
    };
    q.kh = function (a) {
        X(this, 11, a)
    };
    q.Oj = function () {
        return eu(this, 14)
    };
    q.Cm = function (a) {
        X(this, 14, a)
    };
    q.$i = function () {
        return eu(this, 34)
    };
    q.Kl = function (a) {
        X(this, 34, a)
    };
    q.Pj = function () {
        return eu(this, 72)
    };
    q.Dm = function (a) {
        X(this, 72, a)
    };
    q.ol = function () {
        return W(this, 15)
    };
    q.Gl = function (a) {
        X(this, 15, a)
    };
    q.ej = function () {
        return W(this, 16)
    };
    q.Ql = function (a) {
        X(this, 16, a)
    };
    q.hj = function () {
        return W(this, 17)
    };
    q.Vl = function (a) {
        X(this, 17, a)
    };
    q.qg = function () {
        return W(this, 18)
    };
    q.Fm = function (a) {
        X(this, 18, a)
    };
    q.tg = function () {
        return W(this, 45)
    };
    q.Gm = function (a) {
        X(this, 45, a)
    };
    q.rl = function () {
        return W(this, 22)
    };
    q.Sl = function (a) {
        X(this, 22, a)
    };
    q.fj = function () {
        return W(this, 54)
    };
    q.Tl = function (a) {
        X(this, 54, a)
    };
    q.Lj = function () {
        return W(this, 82)
    };
    q.Am = function (a) {
        X(this, 82, a)
    };
    q.vj = function () {
        return W(this, 83)
    };
    q.jm = function (a) {
        X(this, 83, a)
    };
    q.Vi = function () {
        return W(this, 21)
    };
    q.Fl = function (a) {
        X(this, 21, a)
    };
    q.Ri = function () {
        return eu(this, 23)
    };
    q.Bl = function (a) {
        X(this, 23, a)
    };
    q.tl = function () {
        return W(this, 24)
    };
    q.Em = function (a) {
        X(this, 24, a)
    };
    q.Qj = function () {
        return W(this, 36)
    };
    q.Hm = function (a) {
        X(this, 36, a)
    };
    q.Jj = function () {
        return eu(this, 6)
    };
    q.ym = function (a) {
        X(this, 6, a)
    };
    q.Hj = function () {
        return W(this, 26)
    };
    q.wm = function (a) {
        X(this, 26, a)
    };
    q.cj = function () {
        return W(this, 30)
    };
    q.Nl = function (a) {
        X(this, 30, a)
    };
    q.Rj = function () {
        return W(this, 31)
    };
    q.Im = function (a) {
        X(this, 31, a)
    };
    q.sl = function () {
        return W(this, 27)
    };
    q.em = function (a) {
        X(this, 27, a)
    };
    q.yj = function () {
        return W(this, 28)
    };
    q.nm = function (a) {
        X(this, 28, a)
    };
    q.Cj = function () {
        return W(this, 57)
    };
    q.rm = function (a) {
        X(this, 57, a)
    };
    q.Dj = function () {
        return W(this, 58)
    };
    q.sm = function (a) {
        X(this, 58, a)
    };
    q.Aj = function () {
        return W(this, 59)
    };
    q.pm = function (a) {
        X(this, 59, a)
    };
    q.Ej = function () {
        return eu(this, 35)
    };
    q.tm = function (a) {
        X(this, 35, a)
    };
    q.Fj = function () {
        return eu(this, 41)
    };
    q.um = function (a) {
        X(this, 41, a)
    };
    q.zj = function () {
        return eu(this, 64)
    };
    q.om = function (a) {
        X(this, 64, a)
    };
    q.qj = function () {
        return eu(this, 48)
    };
    q.dm = function (a) {
        X(this, 48, a)
    };
    q.Bj = function () {
        return eu(this, 49)
    };
    q.qm = function (a) {
        X(this, 49, a)
    };
    q.nj = function () {
        return eu(this, 37)
    };
    q.am = function (a) {
        X(this, 37, a)
    };
    q.Qi = function () {
        return W(this, 38)
    };
    q.Al = function (a) {
        X(this, 38, a)
    };
    q.Pi = function () {
        return W(this, 86)
    };
    q.zl = function (a) {
        X(this, 86, a)
    };
    q.nl = function () {
        return W(this, 39)
    };
    q.yl = function (a) {
        X(this, 39, a)
    };
    q.ml = function () {
        return W(this, 87)
    };
    q.wl = function (a) {
        X(this, 87, a)
    };
    q.sj = function () {
        return W(this, 88)
    };
    q.gm = function (a) {
        X(this, 88, a)
    };
    q.Nj = function () {
        return W(this, 89)
    };
    q.Bm = function (a) {
        X(this, 89, a)
    };
    q.oj = function () {
        return W(this, 40)
    };
    q.bm = function (a) {
        X(this, 40, a)
    };
    q.Yi = function () {
        return W(this, 42)
    };
    q.Il = function (a) {
        X(this, 42, a)
    };
    q.Xi = function () {
        return W(this, 43)
    };
    q.Hl = function (a) {
        X(this, 43, a)
    };
    q.xj = function () {
        return W(this, 44)
    };
    q.lm = function (a) {
        X(this, 44, a)
    };
    q.wj = function () {
        return W(this, 62)
    };
    q.km = function (a) {
        X(this, 62, a)
    };
    q.pj = function () {
        return W(this, 46)
    };
    q.cm = function (a) {
        X(this, 46, a)
    };
    q.uj = function () {
        return W(this, 61)
    };
    q.im = function (a) {
        X(this, 61, a)
    };
    q.aj = function () {
        return W(this, 50)
    };
    q.Ll = function (a) {
        X(this, 50, a)
    };
    q.mj = function () {
        return W(this, 53)
    };
    q.$l = function (a) {
        X(this, 53, a)
    };
    q.lj = function () {
        return W(this, 55)
    };
    q.Zl = function (a) {
        X(this, 55, a)
    };
    q.Ij = function () {
        return W(this, 56)
    };
    q.xm = function (a) {
        X(this, 56, a)
    };
    q.Tj = function () {
        return W(this, 63)
    };
    q.Km = function (a) {
        X(this, 63, a)
    };
    q.Vj = function () {
        return W(this, 81)
    };
    q.Mm = function (a) {
        X(this, 81, a)
    };
    q.Ui = function () {
        return W(this, 90)
    };
    q.El = function (a) {
        X(this, 90, a)
    };
    q.Sj = function () {
        return W(this, 68)
    };
    q.Jm = function (a) {
        X(this, 68, a)
    };
    q.Uj = function () {
        return W(this, 69)
    };
    q.Lm = function (a) {
        X(this, 69, a)
    };
    q.jj = function () {
        return W(this, 66)
    };
    q.Xl = function (a) {
        X(this, 66, a)
    };
    q.dj = function () {
        return W(this, 70)
    };
    q.Pl = function (a) {
        X(this, 70, a)
    };
    q.gj = function () {
        return W(this, 71)
    };
    q.Ul = function (a) {
        X(this, 71, a)
    };
    q.kj = function () {
        return W(this, 73)
    };
    q.Yl = function (a) {
        X(this, 73, a)
    };
    q.Zi = function () {
        return W(this, 84)
    };
    q.Jl = function (a) {
        X(this, 84, a)
    };
    q.Ni = function () {
        return W(this, 74)
    };
    q.ul = function (a) {
        X(this, 74, a)
    };
    q.ql = function () {
        return W(this, 75)
    };
    q.Rl = function (a) {
        X(this, 75, a)
    };
    q.tj = function () {
        return du(this, 76)
    };
    q.hm = function (a) {
        X(this, 76, a)
    };
    q.Wj = function () {
        return du(this, 77)
    };
    q.Nm = function (a) {
        X(this, 77, a)
    };
    q.Gj = function () {
        return du(this, 78)
    };
    q.vm = function (a) {
        X(this, 78, a)
    };
    q.bj = function () {
        return du(this, 79)
    };
    q.Ml = function (a) {
        X(this, 79, a)
    };
    q.Oi = function () {
        return W(this, 85)
    };
    q.xl = function (a) {
        X(this, 85, a)
    };
    function Y() {
        bu(this, void 0)
    }

    G(Y, gu);
    Y.prototype.K = ba("G");
    Y.prototype.I = h("G");
    Y.prototype.L = ba("H");
    Y.prototype.J = h("H");
    function hu() {
        if (!iu) {
            var a = iu = new xt, b;
            for (b in ju)a.add(b, ju[b])
        }
    }

    var iu;

    function Z(a, b) {
        this.A = a;
        this.B = b
    }

    var ju = {
        a: new Z([3, 0], [Y.prototype.Fl, Y.prototype.xm]),
        al: new Z([3], [Y.prototype.ul]),
        b: new Z([3, 0], [Y.prototype.Bl, Y.prototype.Al]),
        ba: new Z([0], [Y.prototype.xl]),
        bc: new Z([0], [Y.prototype.wl]),
        br: new Z([0], [Y.prototype.zl]),
        c: new Z([3, 0], [Y.prototype.Yg, Y.prototype.yl]),
        cc: new Z([3], [Y.prototype.Xg]),
        ci: new Z([3], [Y.prototype.ah]),
        d: new Z([3], [Y.prototype.Dl]),
        df: new Z([3], [Y.prototype.Cl]),
        dv: new Z([3], [Y.prototype.El]),
        e: new Z([0], [Y.prototype.Gl]),
        f: new Z([4], [Y.prototype.Ql]),
        fg: new Z([3], [Y.prototype.Kl]),
        fh: new Z([3], [Y.prototype.Nl]),
        fm: new Z([3], [Y.prototype.Jl]),
        fo: new Z([2], [Y.prototype.Ml]),
        ft: new Z([3], [Y.prototype.Ll]),
        fv: new Z([3], [Y.prototype.Im]),
        g: new Z([3], [Y.prototype.Cm]),
        gd: new Z([3], [Y.prototype.jm]),
        h: new Z([3, 0], [Y.prototype.Ol, Y.prototype.Zg]),
        i: new Z([3], [Y.prototype.Sl]),
        ic: new Z([0], [Y.prototype.Ul]),
        id: new Z([3], [Y.prototype.Pl]),
        ip: new Z([3], [Y.prototype.Tl]),
        iv: new Z([0], [Y.prototype.Rl]),
        j: new Z([1], [Y.prototype.K]),
        k: new Z([3, 0], [Y.prototype.Vl, Y.prototype.Il]),
        l: new Z([0],
            [Y.prototype.lm]),
        lf: new Z([3], [Y.prototype.Wl]),
        m: new Z([0], [Y.prototype.Km]),
        mm: new Z([4], [Y.prototype.Mm]),
        mo: new Z([3], [Y.prototype.Yl]),
        mv: new Z([3], [Y.prototype.Xl]),
        n: new Z([3], [Y.prototype.Wg]),
        nc: new Z([3], [Y.prototype.Zl]),
        nd: new Z([3], [Y.prototype.$l]),
        no: new Z([3], [Y.prototype.am]),
        ns: new Z([3], [Y.prototype.bm]),
        nt0: new Z([4], [Y.prototype.Hm]),
        nu: new Z([3], [Y.prototype.cm]),
        nw: new Z([3], [Y.prototype.dm]),
        o: new Z([1, 3], [Y.prototype.L, Y.prototype.em]),
        p: new Z([3, 0], [Y.prototype.eh, Y.prototype.Hl]),
        pa: new Z([3], [Y.prototype.im]),
        pc: new Z([0], [Y.prototype.gm]),
        pd: new Z([3], [Y.prototype.bh]),
        pf: new Z([3], [Y.prototype.hh]),
        pg: new Z([3], [Y.prototype.Dm]),
        pi: new Z([2], [Y.prototype.hm]),
        pp: new Z([3], [Y.prototype.gh]),
        q: new Z([4], [Y.prototype.nm]),
        r: new Z([3, 0], [Y.prototype.ym, Y.prototype.wm]),
        rg: new Z([3], [Y.prototype.pm]),
        rh: new Z([3], [Y.prototype.qm]),
        rj: new Z([3], [Y.prototype.rm]),
        ro: new Z([2], [Y.prototype.vm]),
        rp: new Z([3], [Y.prototype.sm]),
        rw: new Z([3], [Y.prototype.tm]),
        rwa: new Z([3], [Y.prototype.om]),
        rwu: new Z([3], [Y.prototype.um]),
        s: new Z([3, 0], [Y.prototype.zm, Y.prototype.dh]),
        sc: new Z([0], [Y.prototype.Bm]),
        sg: new Z([3], [Y.prototype.Am]),
        t: new Z([4], [Y.prototype.Em]),
        u: new Z([3], [Y.prototype.Fm]),
        ut: new Z([3], [Y.prototype.Gm]),
        v: new Z([0], [Y.prototype.km]),
        vb: new Z([0], [Y.prototype.Jm]),
        vl: new Z([0], [Y.prototype.Lm]),
        w: new Z([0], [Y.prototype.lh]),
        x: new Z([0], [Y.prototype.ih]),
        y: new Z([0], [Y.prototype.jh]),
        ya: new Z([2], [Y.prototype.Nm]),
        z: new Z([0], [Y.prototype.kh])
    };

    function ku(a, b) {
        vt("For token '%s': %s", a, b)
    }

    function lu(a, b) {
        var c = new Y, d = new Y;
        if ("" != b) {
            b = b.split("-");
            for (var e = 0; e < b.length; e++) {
                var f = b[e];
                if (0 != f.length) {
                    var g;
                    var k = f, l = !1, m = k;
                    g = k.substring(0, 1);
                    g != g.toLowerCase() && (l = !0, m = k.substring(0, 1).toLowerCase() + k.substring(1));
                    var n = iu;
                    for (g = 1; g <= m.length; ++g) {
                        var p = n, r = m.substring(0, g);
                        if (0 == r.length ? p.Pa() : !zt(p, r))break
                    }
                    g = 1 == g ? null : (m = n.get(m.substring(0, g - 1))) ? {
                                dl: k.substring(0, g - 1),
                                value: k.substring(g - 1),
                                Rm: l,
                                attributes: m
                            } : null;
                    if (g) {
                        k = [];
                        l = [];
                        m = !1;
                        for (n = 0; n < g.attributes.A.length; n++) {
                            var p =
                                g.attributes.A[n], u = g.value, r = e;
                            if (g.Rm && 1 == p)for (var t = u.length; 12 > t && r < b.length - 1;)u += "-" + b[r + 1], t = u.length, ++r; else if (2 == p)for (; r < b.length - 1 && b[r + 1].match(/^[\d\.]/);)u += "-" + b[r + 1], ++r;
                            t = g.attributes.B[n];
                            u = mu(a, p)(g.dl, u, c, d, t);
                            if (null === u) {
                                m = !0;
                                e = r;
                                break
                            } else k.push(p), l.push(u)
                        }
                        if (!m)for (g = 0; g < l.length; g++)m = k[g], u = l[g], nu(a, m)(f, u)
                    }
                }
            }
        }
        return new ou(c, d)
    }

    function pu(a, b, c, d, e) {
        e.apply(c, [b]);
        a = a.substring(0, 1);
        e.apply(d, [a == a.toUpperCase()])
    }

    q = hu.prototype;
    q.hl = function (a, b, c, d, e) {
        if ("" == b)return 0;
        isFinite(b) && (b = String(b));
        b = wa(b) ? /^\s*-?0x/i.test(b) ? parseInt(b, 16) : parseInt(b, 10) : NaN;
        if (isNaN(b))return 1;
        pu(a, b, c, d, e);
        return null
    };
    q.mk = function (a, b) {
        switch (b) {
            case 1:
                ku(a, "Option value could not be interpreted as an integer.");
                break;
            case 0:
                ku(a, "Missing value for integer option.")
        }
    };
    q.gl = function (a, b, c, d, e) {
        if ("" == b)return 0;
        var f = Number(b);
        b = 0 == f && /^[\s\xa0]*$/.test(b) ? NaN : f;
        if (isNaN(b))return 1;
        pu(a, b, c, d, e);
        return null
    };
    q.lk = function (a, b) {
        switch (b) {
            case 1:
                ku(a, "Option value could not be interpreted as a float.");
                break;
            case 0:
                ku(a, "Missing value for float option.")
        }
    };
    q.fl = function (a, b, c, d, e) {
        if ("" != b)return 2;
        pu(a, !0, c, d, e);
        return null
    };
    q.kk = function (a, b) {
        switch (b) {
            case 2:
                ku(a, "Unexpected value specified for boolean option.")
        }
    };
    q.il = function (a, b, c, d, e) {
        if ("" == b)return 0;
        pu(a, b, c, d, e);
        return null
    };
    q.nk = function (a, b) {
        switch (b) {
            case 0:
                ku(a, "Missing value for string option.")
        }
    };
    function mu(a, b) {
        switch (b) {
            case 0:
                return E(a.hl, a);
            case 2:
                return E(a.gl, a);
            case 3:
                return E(a.fl, a);
            case 4:
            case 1:
                return E(a.il, a);
            default:
                return aa()
        }
    }

    function nu(a, b) {
        switch (b) {
            case 0:
                return E(a.mk, a);
            case 2:
                return E(a.lk, a);
            case 3:
                return E(a.kk, a);
            case 4:
            case 1:
                return E(a.nk, a);
            default:
                return aa()
        }
    }

    function ou(a, b) {
        this.A = a;
        this.B = b
    };
    function qu(a) {
        this.D = null;
        this.C = [];
        this.B = null;
        this.B = a ? wa(a) ? lu(ru(this), a) : a : lu(ru(this), "")
    }

    function ru(a) {
        null == a.D && (a.D = new hu);
        return a.D
    }

    function su(a, b, c, d) {
        b || "number" == typeof b && 0 == b || (b = void 0);
        var e = a.B.A;
        a = a.B.B;
        var f = c.call(e);
        b != f && (void 0 != f && c.call(a), d.call(e, b))
    }

    q = qu.prototype;
    q.te = function (a) {
        su(this, a, Y.prototype.dg, Y.prototype.Yg);
        return this
    };
    q.se = function (a) {
        su(this, a, Y.prototype.bg, Y.prototype.Xg);
        return this
    };
    q.ue = function (a) {
        su(this, a, Y.prototype.eg, Y.prototype.ah);
        return this
    };
    q.Ld = function (a) {
        su(this, a, Y.prototype.We, Y.prototype.Zg);
        return this
    };
    q.re = function (a) {
        su(this, a, Y.prototype.ag, Y.prototype.Wg);
        return this
    };
    q.we = function (a) {
        su(this, a, Y.prototype.kg, Y.prototype.eh);
        return this
    };
    q.ve = function (a) {
        su(this, a, Y.prototype.jg, Y.prototype.bh);
        return this
    };
    q.ye = function (a) {
        su(this, a, Y.prototype.mg, Y.prototype.hh);
        return this
    };
    q.xe = function (a) {
        su(this, a, Y.prototype.lg, Y.prototype.gh);
        return this
    };
    q.mc = function (a) {
        su(this, a, Y.prototype.he, Y.prototype.dh);
        return this
    };
    q.Md = function (a) {
        su(this, a, Y.prototype.W, Y.prototype.lh);
        return this
    };
    q.Kc = function () {
        this.C.length = 0;
        tu(this, "s", Y.prototype.he);
        tu(this, "w", Y.prototype.W);
        uu(this, "c", Y.prototype.dg);
        tu(this, "c", Y.prototype.nl, 16, 6);
        uu(this, "d", Y.prototype.Ti);
        tu(this, "h", Y.prototype.We);
        uu(this, "s", Y.prototype.Kj);
        uu(this, "h", Y.prototype.pl);
        uu(this, "p", Y.prototype.kg);
        uu(this, "pa", Y.prototype.uj);
        uu(this, "pd", Y.prototype.jg);
        uu(this, "pp", Y.prototype.lg);
        uu(this, "pf", Y.prototype.mg);
        tu(this, "p", Y.prototype.Xi);
        uu(this, "n", Y.prototype.ag);
        tu(this, "r", Y.prototype.Hj);
        uu(this, "r", Y.prototype.Jj);
        uu(this, "fh", Y.prototype.cj);
        uu(this, "fv", Y.prototype.Rj);
        uu(this, "cc", Y.prototype.bg);
        uu(this, "ci", Y.prototype.eg);
        uu(this, "o", Y.prototype.sl);
        vu(this, "o", Y.prototype.J);
        vu(this, "j", Y.prototype.I);
        tu(this, "x", Y.prototype.ng);
        tu(this, "y", Y.prototype.og);
        tu(this, "z", Y.prototype.Vg);
        uu(this, "g", Y.prototype.Oj);
        uu(this, "fg", Y.prototype.$i);
        uu(this, "ft", Y.prototype.aj);
        tu(this, "e", Y.prototype.ol);
        vu(this, "f", Y.prototype.ej);
        uu(this, "k", Y.prototype.hj);
        tu(this, "k", Y.prototype.Yi);
        uu(this, "u", Y.prototype.qg);
        uu(this, "ut", Y.prototype.tg);
        uu(this, "i", Y.prototype.rl);
        uu(this, "ip", Y.prototype.fj);
        uu(this, "a", Y.prototype.Vi);
        tu(this, "a", Y.prototype.Ij);
        tu(this, "m", Y.prototype.Tj);
        tu(this, "vb", Y.prototype.Sj);
        tu(this, "vl", Y.prototype.Uj);
        uu(this, "lf", Y.prototype.ij);
        uu(this, "mv", Y.prototype.jj);
        uu(this, "id", Y.prototype.dj);
        tu(this, "ic", Y.prototype.gj);
        uu(this, "b", Y.prototype.Ri);
        tu(this, "b", Y.prototype.Qi);
        vu(this, "t", Y.prototype.tl);
        vu(this, "nt0", Y.prototype.Qj);
        uu(this, "rw", Y.prototype.Ej);
        uu(this, "rwu",
            Y.prototype.Fj);
        uu(this, "rwa", Y.prototype.zj);
        uu(this, "nw", Y.prototype.qj);
        uu(this, "rh", Y.prototype.Bj);
        uu(this, "nc", Y.prototype.lj);
        uu(this, "nd", Y.prototype.mj);
        uu(this, "no", Y.prototype.nj);
        vu(this, "q", Y.prototype.yj);
        uu(this, "ns", Y.prototype.oj);
        tu(this, "l", Y.prototype.xj);
        tu(this, "v", Y.prototype.wj);
        uu(this, "nu", Y.prototype.pj);
        uu(this, "rj", Y.prototype.Cj);
        uu(this, "rp", Y.prototype.Dj);
        uu(this, "rg", Y.prototype.Aj);
        uu(this, "pg", Y.prototype.Pj);
        uu(this, "mo", Y.prototype.kj);
        uu(this, "al", Y.prototype.Ni);
        tu(this, "iv", Y.prototype.ql);
        tu(this, "pi", Y.prototype.tj);
        tu(this, "ya", Y.prototype.Wj);
        tu(this, "ro", Y.prototype.Gj);
        tu(this, "fo", Y.prototype.bj);
        uu(this, "df", Y.prototype.Si);
        vu(this, "mm", Y.prototype.Vj);
        uu(this, "sg", Y.prototype.Lj);
        uu(this, "gd", Y.prototype.vj);
        uu(this, "fm", Y.prototype.Zi);
        tu(this, "ba", Y.prototype.Oi);
        tu(this, "br", Y.prototype.Pi);
        tu(this, "bc", Y.prototype.ml, 16, 6);
        tu(this, "pc", Y.prototype.sj, 16, 6);
        tu(this, "sc", Y.prototype.Nj, 16, 6);
        uu(this, "dv", Y.prototype.Ui);
        return this.C.join("-")
    };
    function wu(a, b) {
        if (void 0 == b)return "";
        a = b - a.length;
        return 0 >= a ? "" : ab("0", a)
    }

    function tu(a, b, c, d, e) {
        var f = c.call(a.B.A);
        if (void 0 != f && null != f) {
            d = void 0 == d ? 10 : 10 != d && 16 != d ? 10 : d;
            var f = f.toString(d), g = new ut;
            g.Yd(16 == d ? "0x" : "");
            g.Yd(wu(f, e));
            g.Yd(f);
            xu(a, b, g.toString(), c)
        }
    }

    function uu(a, b, c) {
        c.call(a.B.A) && xu(a, b, "", c)
    }

    function vu(a, b, c) {
        var d = c.call(a.B.A);
        d && xu(a, b, d, c)
    }

    function xu(a, b, c, d) {
        d.call(a.B.B) && (b = b.substring(0, 1).toUpperCase() + b.substring(1));
        a.C.push(b + c)
    };
    function yu(a) {
        qu.call(this, a)
    }

    G(yu, qu);
    q = yu.prototype;
    q.te = function (a) {
        a && zu(this);
        return yu.V.te.call(this, a)
    };
    q.Ld = function (a) {
        null != a && this.mc();
        return yu.V.Ld.call(this, a)
    };
    q.ue = function (a) {
        a && zu(this);
        return yu.V.ue.call(this, a)
    };
    q.se = function (a) {
        a && zu(this);
        return yu.V.se.call(this, a)
    };
    q.mc = function (a) {
        za(a) && (a = Math.max(a.width, a.height));
        null != a && (this.Md(), this.Ld());
        return yu.V.mc.call(this, a)
    };
    q.we = function (a) {
        a && zu(this);
        return yu.V.we.call(this, a)
    };
    q.xe = function (a) {
        a && zu(this);
        return yu.V.xe.call(this, a)
    };
    q.ye = function (a) {
        a && zu(this);
        return yu.V.ye.call(this, a)
    };
    q.re = function (a) {
        a && zu(this);
        return yu.V.re.call(this, a)
    };
    q.ve = function (a) {
        a && zu(this);
        return yu.V.ve.call(this, a)
    };
    q.Md = function (a) {
        null != a && this.mc();
        return yu.V.Md.call(this, a)
    };
    function zu(a) {
        a.re();
        a.se();
        a.te();
        a.ue();
        a.ve();
        a.we();
        a.xe();
        a.ye()
    }

    q.Kc = function () {
        var a = this.B.A;
        a.qg() || a.tg() ? a.he() || this.mc(0) : (a = this.B.A, a.he() || a.W() || a.We() || (this.mc(), this.Ld(), this.Md(), zu(this)));
        return yu.V.Kc.call(this)
    };
    var Au = /^[^\/]*\/\//;

    function Bu() {
    }

    function Cu(a) {
        this.C = a;
        this.fe = "";
        (a = this.C.match(Au)) && a[0] ? (this.fe = a[0], a = this.fe.match(/\w+/) ? this.C : "http://" + this.C.substring(this.fe.length)) : a = "http://" + this.C;
        this.Lc = a instanceof kr ? new kr(a) : new kr(a, !0);
        this.D = !0;
        this.L = !1
    }

    function Du(a, b) {
        a.B = a.B ? a.B + ("/" + b) : b
    }

    function Eu(a) {
        if (void 0 == a.A) {
            a.B = null;
            a.A = a.Lc.D.substring(1).split("/");
            var b = a.A.length;
            2 < b && Ja(a.Lc.C, "google.com") && "u" == a.A[0] && (Du(a, a.A[0] + "/" + a.A[1]), a.A.shift(), a.A.shift(), b -= 2);
            if (0 == b || 4 == b || 7 < b)return a.D = !1, a.A;
            if (2 == b) Du(a, a.A[0]); else if ("image" == a.A[0]) Du(a, a.A[0]); else if (7 == b || 3 == b)return a.D = !1, a.A;
            if (3 >= b) {
                a.L = !0;
                3 == b && (Du(a, a.A[1]), a.A.shift(), --b);
                var b = b - 1, c = a.A[b], d = c.indexOf("=");
                -1 != d && (a.A[b] = c.substr(0, d), a.A.push(c.substr(d + 1)))
            }
        }
        return a.A
    }

    function Fu(a) {
        Eu(a);
        return a.L
    }

    function Gu(a) {
        Eu(a);
        void 0 == a.B && (a.B = null);
        return a.B
    }

    function Hu(a) {
        switch (Eu(a).length) {
            case 7:
                return !0;
            case 6:
                return null == Gu(a);
            case 5:
                return !1;
            case 3:
                return !0;
            case 2:
                return null == Gu(a);
            case 1:
                return !1;
            default:
                return !1
        }
    }

    function Iu(a, b) {
        if (Fu(a))a:{
            var c = null != Gu(a) ? 1 : 0;
            switch (b) {
                case 6:
                    b = 0 + c;
                    break;
                case 4:
                    if (!Hu(a)) {
                        a = null;
                        break a
                    }
                    b = 1 + c;
                    break;
                default:
                    a = null;
                    break a
            }
            a = Eu(a)[b]
        } else a:{
            c = null != Gu(a) ? 1 : 0;
            switch (b) {
                case 0:
                    b = 0 + c;
                    break;
                case 1:
                    b = 1 + c;
                    break;
                case 2:
                    b = 2 + c;
                    break;
                case 3:
                    b = 3 + c;
                    break;
                case 4:
                    if (!Hu(a)) {
                        a = null;
                        break a
                    }
                    b = 4 + c;
                    break;
                case 5:
                    b = Hu(a) ? 1 : 0;
                    b = 4 + c + b;
                    break;
                default:
                    a = null;
                    break a
            }
            a = Eu(a)[b]
        }
        return a
    }

    function Ju(a) {
        void 0 == a.K && (a.K = Iu(a, 0));
        return a.K
    }

    function Ku(a) {
        void 0 == a.N && (a.N = Iu(a, 1));
        return a.N
    }

    function Lu(a) {
        void 0 == a.I && (a.I = Iu(a, 2));
        return a.I
    }

    function Mu(a) {
        void 0 == a.M && (a.M = Iu(a, 3));
        return a.M
    }

    function Nu(a) {
        void 0 == a.F && (a.F = Iu(a, 5));
        return a.F
    };
    function Ou(a) {
        this.A = null;
        a instanceof Cu ? this.A = a : (void 0 == Pu && (Pu = new Bu), this.A = new Cu(a.toString()));
        a = this.A;
        if (void 0 == a.H) {
            var b;
            void 0 == a.G && (a.G = Iu(a, 4));
            (b = a.G) || (b = "");
            a.H = lu(new hu, b)
        }
        qu.call(this, a.H);
        this.H = this.A.fe;
        a = this.A;
        b = a.Lc.H;
        this.G = a.Lc.C + (b ? ":" + b : "");
        this.F = this.A.Lc.A.toString()
    }

    var Pu;
    G(Ou, yu);
    Ou.prototype.Kc = function () {
        var a = this.A;
        Eu(a);
        if (!a.D)return this.A.C;
        var a = Ou.V.Kc.call(this), b = [];
        null != Gu(this.A) && b.push(Gu(this.A));
        if (Fu(this.A)) {
            var c = this.A;
            void 0 == c.J && (c.J = Iu(c, 6));
            b.push(c.J + (a ? "=" + a : ""))
        } else b.push(Ju(this.A)), b.push(Ku(this.A)), b.push(Lu(this.A)), b.push(Mu(this.A)), a && b.push(a), b.push(Nu(this.A));
        return this.H + this.G + "/" + b.join("/") + (this.F ? "?" + this.F : "")
    };
    var Qu = /^((http(s)?):)?\/\/((((lh[3-6](-tt|-d[a-g,z])?\.((ggpht)|(googleusercontent)|(google)))|(([1-4]\.bp\.blogspot)|(bp[0-3]\.blogger))|((((cp|ci|gp)[3-6])|(ap[1-2]))\.(ggpht|googleusercontent))|(gm[1-4]\.ggpht)|(((yt[3-4])|(sp[1-3]))\.(ggpht|googleusercontent)))\.com)|(dp[3-6]\.googleusercontent\.cn)|(lh[3-6]\.(googleadsserving\.cn|xn--9kr7l\.com))|(photos\-image\-(dev|qa)(-auth)?\.corp\.google\.com)|((dev|dev2|dev3|qa|qa2|qa3|qa-red|qa-blue|canary)[-.]lighthouse\.sandbox\.google\.com\/image)|(image\-dev\-lighthouse(-auth)?\.sandbox\.google\.com(\/image)?))\//i,
        Ru = /^(https?:)?\/\/sp[1-4]\.((ggpht)|(googleusercontent))\.com\//i, Su = /^(https?:)?\/\/(qa(-red|-blue)?|dev2?|image-dev)(-|\.)lighthouse(-auth)?\.sandbox\.google\.com\//i, Tu = /^(https?:)?\/\/lighthouse-(qa(-red|-blue)?|dev2)\.corp\.google\.com\//i;

    function Uu(a, b, c) {
        this.F = a;
        this.D = b;
        this.C = c;
        this.A = new tl(5)
    }

    Uu.prototype.B = function (a) {
        var b = Ns(a), c, d;
        Qu.test(b) || Ru.test(b) || Su.test(b) || Tu.test(b) ? (c = b, d = c.substr(0, c.lastIndexOf("/")), b = c.substr(c.lastIndexOf("/") + 1)) : -1 != b.indexOf("/") ? (d = this.C[0] + b, b = "p", c = d + "/" + b) : c = d = this.C[0] + "p";
        var e = vl(this.A, c);
        e || (e = b, b = new rt(this.F, this.D, d, e), d = this.G || new qt(this.F, d, e), e = new st(d, b, this.D), ul(this.A, c, e));
        a = new Vu(e, a);
        a.C = Ep;
        a.Kb();
        return a
    };
    Uu.prototype.clear = function () {
        this.A.clear()
    };
    function Wu() {
        this.H = !1;
        this.F = null;
        this.N = new eh;
        this.L = Jl();
        this.O = Jl();
        this.A = this.B = this.C = this.G = this.M = 0;
        this.D = new hh;
        this.J = new hh;
        this.I = new hh;
        this.K = new hh
    }

    var oq = xl(), pq = xl(), qq = xl(), rq = xl(), Np = Jl(), Op = Jl(), Pp = new Jj;

    function Mn(a, b) {
        return Math.ceil(a / b) * b
    }

    function Xu() {
        return 0
    }

    function Mp(a, b, c) {
        if (c) {
            var d = new eh;
            U(d, a.N);
            Bs(c, d);
            Yu(d, b)
        } else Kl(b, a.L)
    }

    function xn(a, b) {
        var c = a.K.W(), d = a.J.W(), e = a.I.W(), f = 1, g = 0;
        c && d && (f = d / c, e && (g = e / c));
        return g + Math.min(b / a.C, 1) * f
    }

    function yn(a, b) {
        var c = vh(a.K), d = vh(a.J), e = vh(a.I), f = 1, g = 0;
        c && d && (f = d / c, e && (g = e / c));
        return g + Math.min(b / a.B, 1) * f
    }

    function Kn(a, b, c, d, e) {
        var f;
        f = a.F;
        var g = b * a.F.W();
        a = Bp(f.D, g, c * a.F.A);
        f = Hp(f, a);
        0 == f && (f = 500);
        b = Math.PI * (2 * b - 1);
        c = Math.PI * (.5 - c);
        d[e + 0] = Math.sin(b) * Math.cos(c) * f;
        d[e + 1] = Math.cos(b) * Math.cos(c) * f;
        d[e + 2] = Math.sin(c) * f
    }

    function yp(a, b, c, d) {
        Ul(c, b.A, oq);
        El(oq, oq);
        d.x = Math.atan2(oq[0], oq[1]) / (2 * Math.PI) + .5;
        d.y = Math.acos(oq[2]) / Math.PI
    }

    function Yu(a, b) {
        var c = new Cm;
        pm(a, c);
        var d = c.A, e = c.B, c = c.C;
        b[0] = 1;
        b[1] = 0;
        b[2] = 0;
        b[3] = 0;
        b[4] = 0;
        b[5] = 1;
        b[6] = 0;
        b[7] = 0;
        b[8] = 0;
        b[9] = 0;
        b[10] = 1;
        b[11] = 0;
        b[12] = d;
        b[13] = e;
        b[14] = c;
        b[15] = 1;
        d = hm(qh(jh(a)));
        Zl(b, d, d, d);
        a = lh(a);
        bm(b, Jb(-th(a)));
        $l(b, Jb(M(a, 1) - 90));
        am(b, Jb(M(a, 2)))
    };
    function Zu() {
        this.C = this.A = 0;
        this.B = null;
        this.D = 0;
        this.G = [];
        this.F = {};
        this.H = {}
    }

    Zu.prototype.W = h("A");
    function $u(a, b, c) {
        return (a = a.H[b]) ? (U(kh(c), a), !0) : !1
    };
    function av(a, b, c) {
        ol.call(this);
        this.J = "" + Aa(this);
        this.L = a;
        this.C = c;
        this.H = [c];
        this.I = !1;
        this.A = new Float32Array(12);
        this.B = 0;
        this.G = null;
        this.F = this.D = 1;
        this.Aa();
        c = 1 * (this.I ? 2 : 1);
        var d = 2 * c / 1.25 / 80, e = 1.25 * c;
        a = this.A;
        a[0] = c;
        a[1] = 7.5;
        a[2] = -3;
        a[3] = -c;
        a[4] = 7.5;
        a[5] = -3;
        a[6] = e;
        a[7] = this.B * d + 7.5;
        a[8] = -3;
        a[9] = -e;
        a[10] = this.B * d + 7.5;
        a[11] = -3;
        yk(bv, -Jb(b));
        for (b = 0; 4 > b; b++) {
            cv[0] = a[3 * b + 0];
            cv[1] = a[3 * b + 1];
            cv[2] = a[3 * b + 2];
            c = bv;
            var f = cv, d = cv, e = f[0], g = f[1], f = f[2];
            d[0] = e * c[0] + g * c[4] + f * c[8];
            d[1] = e * c[1] + g * c[5] + f * c[9];
            d[2] = e * c[2] + g * c[6] + f * c[10];
            a[3 * b + 0] = cv[0];
            a[3 * b + 1] = cv[1];
            a[3 * b + 2] = cv[2]
        }
    }

    G(av, ol);
    var cv = new Float32Array(3), bv = uk();
    q = av.prototype;
    q.kb = da(2);
    function dv(a) {
        for (var b = 1; b < a;)b <<= 1;
        return b
    }

    q.Ea = da(null);
    q.ha = da(null);
    q.id = h("J");
    q.Gb = C;
    q.Tb = function (a) {
        a(3)
    };
    q.ma = h("L");
    q.Aa = function () {
        if (!this.G) {
            var a;
            if (!this.C || 1 > this.C.length) a = null; else {
                a = Xj("CANVAS");
                var b, c;
                a.getContext ? (c = a.getContext("2d"), b = E(c.measureText, c)) : (c = null, b = ev);
                fv(c);
                var d = this.C, e = [], f = "", g = d, k;
                c ? k = E(c.measureText, c) : k = ev;
                if (1024 < k(d).width)for (var d = d.split(" "), l = 0, m = 1, n = 0; n < d.length && l < m; n++)f = f + d[n] + " ", g = g.substring(d[n].length + 1), l = k(f).width, m = k(g).width;
                f && e.push(f);
                g && e.push(g);
                this.H = e;
                f = 0;
                g = 100 * e.length;
                0 != (g & g - 1) && (k = dv(g), this.D = g / k, g = k);
                a.height = g;
                fv(c);
                b = b(e[0]);
                this.B = f = Math.max(f,
                    b.width);
                0 != (f & f - 1) && (b = dv(f), this.F = f / b, f = b);
                a.width = f;
                fv(c);
                c && (c.strokeText(e[0], 0, 0), c.fillText(e[0], 0, 0), e[1] && (this.I = !0, c.strokeText(e[1], 0, 100), c.fillText(e[1], 0, 100)))
            }
            this.G = a
        }
        return this.G
    };
    function ev(a, b, c) {
        b = b || "Arial";
        c = c || 80;
        var d = Xj("dummyContainer");
        w.document.body.appendChild(d);
        var e = bk("dummyText");
        Rj(e, {style: "font-family:" + b + ";position:absolute;top:-20000px;left:-20000px;padding:0;margin:0;border:0;white-space:pre;font-size:" + c + "px"});
        e.appendChild(document.createTextNode(String(a)));
        d.appendChild(e);
        c = Pj(e);
        a = new Jj(0, 0);
        b = c ? Pj(c) : document;
        b = !bc || 9 <= Number(qc) || "CSS1Compat" == Nj(b).A.compatMode ? b.documentElement : b.body;
        if (e != b) {
            b = Zn(e);
            var f = Nj(c).A;
            c = f.scrollingElement ?
                f.scrollingElement : ec || "CSS1Compat" != f.compatMode ? f.body || f.documentElement : f.documentElement;
            f = f.parentWindow || f.defaultView;
            c = bc && pc("10") && f.pageYOffset != c.scrollTop ? new Jj(c.scrollLeft, c.scrollTop) : new Jj(f.pageXOffset || c.scrollLeft, f.pageYOffset || c.scrollTop);
            a.x = b.left + c.x;
            a.y = b.top + c.y
        }
        b = bo(e);
        a = new Un(a.x, a.y, b.width, b.height);
        d.removeChild(e);
        w.document.body.removeChild(d);
        return {width: a.width}
    }

    function fv(a) {
        a && (a.fillStyle = "rgba(255, 255, 255, 0.7)", a.font = "bold 80px Arial", a.textBaseline = "top", a.strokeStyle = "rgba(0, 0, 0, 0.15)", a.lineWidth = 2, a.shadowOffsetX = -1.5, a.shadowOffsetY = -1.5, a.shadowBlur = 4, a.shadowColor = "rgba(0, 0, 0, 0.5)")
    };
    function gv(a) {
        ol.call(this);
        this.D = 0;
        this.X = a;
        this.F = {};
        this.A = {};
        this.Y = "" + Aa(this);
        this.L = this.J = !1;
        this.M = new Vs;
        this.P = null;
        this.G = []
    }

    G(gv, ol);
    q = gv.prototype;
    q.kb = h("D");
    function hv(a, b) {
        if (b != a.D && (0 == b || 4 !== a.D) && (a.D = b, cp(a) || dp(a))) {
            b = a.G;
            a.G = [];
            for (var c = 0; c < b.length; ++c)(0, b[c])(a.D)
        }
    }

    q.Tb = function (a) {
        cp(this) || dp(this) ? a(this.D) : this.G.push(a)
    };
    q.Gb = function (a) {
        this.Hb(0, 0, Xu(this.ma()), a, "pfdd");
        this.Bc(a, "pfdd")
    };
    q.Ea = h("M");
    q.Jb = function (a) {
        U(Zs(this.M), a)
    };
    q.id = h("Y");
    q.Wc = function (a) {
        return !!this.F[a]
    };
    q.ub = function (a, b, c) {
        return this.F[a + "|" + b + "|" + c] || null
    };
    q.Kd = function (a, b) {
        var c = a.toString();
        this.F[c] = a;
        this.A[c] && delete this.A[c];
        1 === this.kb() && hv(this, 2);
        Xo(this, "TileReady", b, new Yp("TileReady", this, a.C, a.D, a.B))
    };
    q.Jd = function (a, b) {
        var c = a.toString();
        this.F[c] = a;
        this.A[c] && delete this.A[c];
        c = this.kb();
        1 === c ? (hv(this, 2), hv(this, 3)) : 2 === c && hv(this, 3);
        Xo(this, "TileReady", b, new Yp("TileReady", this, a.C, a.D, a.B))
    };
    q.Bc = function (a, b) {
        this.J || 0 !== this.kb() || (this.J = !0, this.X.Bc(this, a, b))
    };
    q.Mc = function () {
        this.L = !0;
        for (var a in this.A)this.A[a]();
        hv(this, 0);
        for (this.J = !1; this.G.length;)this.G.shift()(0);
        this.L = !1;
        this.A = {}
    };
    q.od = function () {
        hv(this, 4)
    };
    q.Hb = function (a, b, c, d, e) {
        var f = a + "|" + b + "|" + c;
        this.F[f] || this.A[f] || (this.A[f] = this.X.Hb(this, a, b, c, d, e))
    };
    q.Hc = function (a, b, c) {
        a = a + "|" + b + "|" + c;
        this.A[a] && delete this.A[a]
    };
    q.Gd = function (a, b, c) {
        a = a + "|" + b + "|" + c;
        this.A[a] && delete this.A[a]
    };
    q.Je = function () {
        for (var a in this.A)return !0;
        return !1
    };
    q.Le = h("L");
    q.ga = function () {
        gv.V.ga.call(this);
        this.F = {};
        this.Je() && this.Mc()
    };
    q.Ec = function (a) {
        this.P = a;
        var b = Qh(Zs(this.M)), c = Wg(b);
        U(b, a);
        K(c, 8) && !K(Wg(b), 8) && U(new ge(P(Xg(b), 8)), c.eb())
    };
    q.da = h("P");
    q.Ob = function () {
        return []
    };
    function Vu(a, b) {
        gv.call(this, a);
        this.Jb(b);
        this.C = this.B = null;
        this.O = new eh;
        this.$ = new Zu;
        this.H = new Wu;
        this.I = null;
        this.U = !1
    }

    G(Vu, gv);
    var iv = new Bm, jv = Jl(), kv = xl();
    q = Vu.prototype;
    q.ha = h("O");
    q.Fa = h("B");
    q.Td = function (a, b) {
        var c = Eb(a.y, 0, 1), d = Math.round(Eb(a.x, 0, 1) * (this.tb().W() - 1)), e = this.tb(), c = Math.round(c * (this.tb().C - 1)), d = !e.B || 0 > d || 0 > c || d >= e.A || c >= e.C ? "" : e.G[Jp(e.B, e.D + (c * e.A + d))] || "";
        if (!d)return null;
        od(b, 8);
        b.data[0] = d;
        if (!$u(this.tb(), d, Rh(b)))return null;
        (a = Gp(this.Sd(), a.x, a.y, iv)) ? (Mp(this.ma(), jv), Tl(jv, a.origin, kv), a = kv) : a = null;
        a && hp(Rh(b), a);
        switch (this.tb().F[d]) {
            case 3:
            case 10:
                b.data[1] = 4;
                break;
            default:
                b.data[1] = 0
        }
        a = 1;
        K(Ys(this.Ea()), 2) && (a = Ph(Ys(this.Ea())));
        b.data[2] = a;
        return b
    };
    q.tb = h("$");
    q.Sd = h("C");
    q.ma = function () {
        this.H.H || this.Kb();
        return this.H
    };
    q.Kb = function () {
        if (this.B && this.C) {
            var a = this.H, b = this.B;
            a.F = this.C;
            a.N = b.ha();
            Yu(a.N, a.L);
            Sl(a.L, a.O);
            U(a.D, new hh(b.data[3]));
            var c = nh(b.ha());
            a.C = c.W() / a.D.W();
            a.B = vh(c) / vh(a.D);
            a.M = Math.ceil(a.C);
            a.G = Math.ceil(a.B);
            a.A = M(b, 5);
            U(a.K, new hh(b.data[26]));
            U(a.J, new hh(b.data[27]));
            U(a.I, new hh(b.data[28]));
            a.H = !0
        }
        lv(this)
    };
    q.Ob = function () {
        if (!this.B)return [];
        if (!this.I) {
            this.I = [];
            for (var a = Q(this.B, 19), b = 0; b < a; b++) {
                var c = new Qs(sd(this.B, 19, b)), d = M(c, 0) - M(this.B, 10);
                a:{
                    var e = O(c, 3), c = O(this.B, 13), f = e.split("/");
                    if (1 == f.length) c = e; else {
                        for (e = 0; e < f.length; ++e) {
                            var g = Ka(f[e]);
                            if (g == c) {
                                c = g;
                                break a
                            }
                        }
                        c = Ka(f[0])
                    }
                }
                c && (d = new av(this.H, d, c), this.I.push(d))
            }
        }
        return this.I
    };
    q.Vb = function (a, b) {
        this.B = a;
        var c = new Mh;
        U(c, Ys(this.Ea()));
        var d = !1;
        O(a, 0) && c.sa() != O(a, 0) && (c.data[0] = O(a, 0), Ne(new Je(P(Qh(c), 1)), O(a, 0)), d = !0);
        var e = 1;
        K(a, 6) && (e = L(a, 6, 1));
        K(a, 13) && 2 == e && (c.data[3] = O(a, 13));
        c.data[2] = e;
        this.Jb(c);
        d ? (hv(this, 0), lv(this), this.Gd(0, 0, 0), this.Hb(0, 0, 0, b)) : this.U && hv(this, 4);
        var f;
        0 < Q(c.da(), 5) && (f = $g(c.da(), 0));
        f && K(Pf(f), 2) && (b = new Vd(Pf(f).data[2]), K(b, 0) && (mh(Rs(a)).data[0] = M(b, 0)), K(b, 1) && (mh(Rs(a)).data[1] = M(b, 1, 90)), K(b, 2) && (mh(Rs(a)).data[2] = M(b, 2)));
        U(this.O,
            a.ha());
        c = Wg(c.da());
        b = new fe(c.data[4]);
        K(b, 0) && (d = new Od(b.data[0]), uh(new hh(P(a, 26)), d.W()), wh(new hh(P(a, 26)), M(d, 0)));
        K(b, 1) && (d = new Od(b.data[1]), uh(new hh(P(a, 28)), d.W()), wh(new hh(P(a, 28)), M(d, 0)));
        K(c, 2) && (d = new Od(c.data[2]), uh(new hh(P(a, 27)), d.W()), wh(new hh(P(a, 27)), M(d, 0)));
        nd(a, 1) ? hv(this, 4) : this.Kb()
    };
    q.Hc = function (a, b, c) {
        Vu.V.Hc.call(this, a, b, c);
        0 == a && 0 == b && 0 == c && (this.B ? hv(this, 4) : this.U = !0)
    };
    function lv(a) {
        cp(a) || dp(a) || a.B && a.C && a.H.H && (a.Wc("0|0|0") ? hv(a, 2) : hv(a, 1))
    };
    function mv(a, b, c, d) {
        Uu.call(this, a, b, c);
        this.G = d
    }

    G(mv, Uu);
    function nv(a, b, c, d, e, f) {
        b = new mv(c, d, e, f);
        a(b)
    };
    function ov() {
        this.F = null;
        this.C = !1;
        this.A = {};
        this.B = {}
    }

    ov.prototype.ub = function (a, b, c, d, e, f, g) {
        var k = "x" + b + "-y" + c + "-z" + d;
        return this.C ? this.D(0, b, c, d, e, f, g) : (this.A[k] = E(this.D, this, a, b, c, d, e, f, g), E(this.I, this, k))
    };
    ov.prototype.I = function (a) {
        a in this.A ? delete this.A[a] : a in this.B && (this.B[a](), delete this.B[a])
    };
    ov.prototype.Vb = function (a) {
        this.C = !0;
        this.F = a;
        for (var b in this.A)a = this.A[b](), this.B[b] = a;
        this.A = {}
    };
    ov.prototype.Fa = h("F");
    function pv(a, b) {
        ol.call(this);
        this.B = a || 1;
        this.A = b || w;
        this.C = E(this.Vm, this);
        this.D = F()
    }

    G(pv, ol);
    q = pv.prototype;
    q.Wd = !1;
    q.wb = null;
    q.Vm = function () {
        if (this.Wd) {
            var a = F() - this.D;
            0 < a && a < .8 * this.B ? this.wb = this.A.setTimeout(this.C, this.B - a) : (this.wb && (this.A.clearTimeout(this.wb), this.wb = null), this.dispatchEvent("tick"), this.Wd && (this.wb = this.A.setTimeout(this.C, this.B), this.D = F()))
        }
    };
    q.start = function () {
        this.Wd = !0;
        this.wb || (this.wb = this.A.setTimeout(this.C, this.B), this.D = F())
    };
    q.ga = function () {
        pv.V.ga.call(this);
        this.Wd = !1;
        this.wb && (this.A.clearTimeout(this.wb), this.wb = null);
        delete this.A
    };
    function qv(a, b, c) {
        if (ya(a)) c && (a = E(a, c)); else if (a && "function" == typeof a.handleEvent) a = E(a.handleEvent, a); else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : w.setTimeout(a, b || 0)
    };
    function rv() {
    }

    rv.prototype.A = null;
    function sv(a) {
        var b;
        (b = a.A) || (b = {}, tv(a) && (b[0] = !0, b[1] = !0), b = a.A = b);
        return b
    };
    var uv;

    function vv() {
    }

    G(vv, rv);
    function wv(a) {
        return (a = tv(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }

    function tv(a) {
        if (!a.B && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.B = d
                } catch (e) {
                }
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.B
    }

    uv = new vv;
    function xv(a) {
        ol.call(this);
        this.headers = new ej;
        this.L = a || null;
        this.B = !1;
        this.J = this.A = null;
        this.H = this.Y = this.U = "";
        this.C = this.P = this.G = this.M = !1;
        this.I = 0;
        this.F = null;
        this.D = "";
        this.X = this.O = !1
    }

    G(xv, ol);
    var yv = /^https?$/i, zv = ["POST", "PUT"];

    function Av(a, b, c, d, e) {
        if (a.A)throw Error("[goog.net.XhrIo] Object is active with another request=" + a.U + "; newUri=" + b);
        c = c ? c.toUpperCase() : "GET";
        a.U = b;
        a.H = "";
        a.Y = c;
        a.M = !1;
        a.B = !0;
        a.A = a.L ? wv(a.L) : wv(uv);
        a.J = a.L ? sv(a.L) : sv(uv);
        a.A.onreadystatechange = E(a.Ng, a);
        try {
            a.P = !0, a.A.open(c, String(b), !0), a.P = !1
        } catch (g) {
            Bv(a, g);
            return
        }
        b = d || "";
        var f = new ej(a.headers);
        e && jj(e, function (a, b) {
            f.set(b, a)
        });
        e = qb(f.lb(), Cv);
        d = w.FormData && b instanceof w.FormData;
        !sb(zv, c) || e || d || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        f.forEach(function (a, b) {
            this.A.setRequestHeader(b, a)
        }, a);
        a.D && (a.A.responseType = a.D);
        "withCredentials" in a.A && a.A.withCredentials !== a.O && (a.A.withCredentials = a.O);
        try {
            Dv(a), 0 < a.I && (a.X = Ev(a.A), a.X ? (a.A.timeout = a.I, a.A.ontimeout = E(a.Ib, a)) : a.F = qv(a.Ib, a.I, a)), a.G = !0, a.A.send(b), a.G = !1
        } catch (g) {
            Bv(a, g)
        }
    }

    function Ev(a) {
        return bc && pc(9) && xa(a.timeout) && x(a.ontimeout)
    }

    function Cv(a) {
        return "content-type" == a.toLowerCase()
    }

    q = xv.prototype;
    q.Ib = function () {
        "undefined" != typeof na && this.A && (this.H = "Timed out after " + this.I + "ms, aborting", this.dispatchEvent("timeout"), this.abort(8))
    };
    function Bv(a, b) {
        a.B = !1;
        a.A && (a.C = !0, a.A.abort(), a.C = !1);
        a.H = b;
        Fv(a);
        Gv(a)
    }

    function Fv(a) {
        a.M || (a.M = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    }

    q.abort = function () {
        this.A && this.B && (this.B = !1, this.C = !0, this.A.abort(), this.C = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Gv(this))
    };
    q.ga = function () {
        this.A && (this.B && (this.B = !1, this.C = !0, this.A.abort(), this.C = !1), Gv(this, !0));
        xv.V.ga.call(this)
    };
    q.Ng = function () {
        this.xa() || (this.P || this.G || this.C ? Hv(this) : this.Zk())
    };
    q.Zk = function () {
        Hv(this)
    };
    function Hv(a) {
        if (a.B && "undefined" != typeof na && (!a.J[1] || 4 != Iv(a) || 2 != a.Ga()))if (a.G && 4 == Iv(a)) qv(a.Ng, 0, a); else if (a.dispatchEvent("readystatechange"), 4 == Iv(a)) {
            a.B = !1;
            try {
                if (Jv(a)) a.dispatchEvent("complete"), a.dispatchEvent("success"); else {
                    var b;
                    try {
                        b = 2 < Iv(a) ? a.A.statusText : ""
                    } catch (c) {
                        b = ""
                    }
                    a.H = b + " [" + a.Ga() + "]";
                    Fv(a)
                }
            } finally {
                Gv(a)
            }
        }
    }

    function Gv(a, b) {
        if (a.A) {
            Dv(a);
            var c = a.A, d = a.J[0] ? C : null;
            a.A = null;
            a.J = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
            }
        }
    }

    function Dv(a) {
        a.A && a.X && (a.A.ontimeout = null);
        xa(a.F) && (w.clearTimeout(a.F), a.F = null)
    }

    function Jv(a) {
        var b = a.Ga(), c;
        a:switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                c = !0;
                break a;
            default:
                c = !1
        }
        if (!c) {
            if (b = 0 === b) a = String(a.U).match(hr)[1] || null, !a && w.self && w.self.location && (a = w.self.location.protocol, a = a.substr(0, a.length - 1)), b = !yv.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }

    function Iv(a) {
        return a.A ? a.A.readyState : 0
    }

    q.Ga = function () {
        try {
            return 2 < Iv(this) ? this.A.status : -1
        } catch (a) {
            return -1
        }
    };
    function Kv(a) {
        try {
            if (!a.A)return null;
            if ("response" in a.A)return a.A.response;
            switch (a.D) {
                case "":
                case "text":
                    return a.A.responseText;
                case "arraybuffer":
                    if ("mozResponseArrayBuffer" in a.A)return a.A.mozResponseArrayBuffer
            }
            return null
        } catch (b) {
            return null
        }
    };
    function Lv() {
        this.A = 0;
        this.D = 2;
        this.B = 0;
        this.F = this.C = this.G = null
    }

    function Mv(a, b, c) {
        a.C = b;
        a.F = c || null
    }

    Lv.prototype.cancel = function () {
        if (3 == this.A)return !1;
        var a = !1;
        this.C && (a = this.C.call(this.F)) && (this.A = 3);
        return a
    };
    Lv.prototype.start = function (a) {
        if (0 != this.A)throw Error("Trying to reuse an Rpc object. Status is not INACTIVE");
        this.A = 1;
        this.G = a
    };
    Lv.prototype.done = aa();
    function Nv(a, b) {
        if (0 == b)throw Error("Trying to set the Rpc status to INACTIVE.");
        a.A = b
    }

    Lv.prototype.Ga = h("A");
    function Ov(a) {
        var b = new Lv;
        b.D = a.D;
        return b
    };
    function Pv(a, b) {
        this.B = a;
        this.C = b
    }

    Pv.prototype.A = function (a, b, c, d) {
        d = d || new Lv;
        a = new Qv(a, b, c ? c : null, d, this.B, this.C);
        Pr(this.B, a, d.D)
    };
    function Qv(a, b, c, d, e, f) {
        this.K = a;
        this.F = b;
        this.G = c;
        this.B = d;
        this.C = !1;
        this.A = null;
        this.J = e;
        this.I = f;
        this.D = !1;
        this.state = null;
        Mv(this.B, this.H, this)
    }

    Qv.prototype.start = function (a) {
        this.A = Ov(this.B);
        this.A.start(this.B.G + ".RequestSchedulerChannel");
        Nv(this.A, 1);
        var b = this;
        this.I.A(this.K, function (a) {
            b.D = !0;
            b.F(a);
            ++b.B.B
        }, function () {
            var c = b.G;
            b.A.done();
            Nv(b.B, b.A.Ga());
            c && c();
            a()
        }, this.A)
    };
    Qv.prototype.cancel = function () {
        return !this.A || this.D && !this.C ? !1 : this.A.cancel()
    };
    Qv.prototype.H = function () {
        this.C = !0;
        return this.J.remove(this)
    };
    function Rv(a) {
        a = (new kr(a)).toString();
        this.A = a += -1 == a.indexOf("?") ? "?" : "&"
    }

    function Sv(a, b) {
        if (0 == b.length)return a.A.slice(0, a.A.length - 1);
        if ("?" == b[0] || "&" == b[0]) b = b.slice(1);
        return a.A + b
    };
    function Tv(a, b, c) {
        this.B = wa(a) || a instanceof kr ? new Rv(a) : a;
        this.C = b;
        this.D = c || "GET"
    }

    function Uv(a, b, c, d) {
        function e(a) {
            kl(c);
            3 != d.Ga() && a && b()
        }

        al(c, "success", function () {
            e(!0)
        });
        al(c, "abort", function () {
            e(!1)
        });
        al(c, "error", function () {
            Nv(d, 2);
            e(!0)
        });
        al(c, "timeout", function () {
            Nv(d, 2);
            e(!0)
        });
        al(c, "readystatechange", function () {
            var b = Kv(c);
            Jv(c) && 4 == Iv(c) && a(b)
        })
    }

    Tv.prototype.A = function (a, b, c, d) {
        d = d || new Lv;
        c = c || C;
        var e = new xv;
        e.O = !1;
        x(this.C) && (e.D = this.C);
        Mv(d, function () {
            e.abort();
            return !0
        });
        Uv(b, c, e, d);
        "POST" == this.D ? (b = Sv(this.B, ""), Av(e, b, "POST", a, {"Content-type": "application/x-www-form-urlencoded"})) : (b = Sv(this.B, a), Av(e, b))
    };
    function Vv(a, b, c) {
        this.B = a;
        this.C = b;
        this.D = c;
        this.A = C
    }

    function Wv(a, b, c, d) {
        b = a.C.A(b);
        var e = d || new Lv;
        e.start("GpmsConfigService.getConfig");
        a.B.A(b, function (b) {
            try {
                if (3 != e.Ga() && (++e.B, 1 == e.B)) {
                    var d = null;
                    try {
                        d = a.D.A(b)
                    } catch (k) {
                        Nv(e, 2), d = null
                    }
                    c(d)
                }
            } catch (k) {
                throw a.A(k), k;
            }
        }, function () {
            try {
                3 != e.Ga() && (0 == e.B && (Nv(e, 2), c(null)), e.done())
            } catch (f) {
                throw a.A(f), f;
            }
        }, e)
    };
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
     */
    function Xv(a, b) {
        this.G = [];
        this.L = a;
        this.K = b || null;
        this.D = this.B = !1;
        this.C = void 0;
        this.J = this.N = this.I = !1;
        this.H = 0;
        this.A = null;
        this.F = 0
    }

    q = Xv.prototype;
    q.cancel = function (a) {
        if (this.B) this.C instanceof Xv && this.C.cancel(); else {
            if (this.A) {
                var b = this.A;
                delete this.A;
                a ? b.cancel(a) : (b.F--, 0 >= b.F && b.cancel())
            }
            this.L ? this.L.call(this.K, this) : this.J = !0;
            this.B || this.Qd(new Yv)
        }
    };
    q.Uf = function (a, b) {
        this.I = !1;
        Zv(this, a, b)
    };
    function Zv(a, b, c) {
        a.B = !0;
        a.C = c;
        a.D = !b;
        $v(a)
    }

    function aw(a) {
        if (a.B) {
            if (!a.J)throw new bw;
            a.J = !1
        }
    }

    q.ua = function (a) {
        aw(this);
        Zv(this, !0, a)
    };
    q.Qd = function (a) {
        aw(this);
        Zv(this, !1, a)
    };
    function cw(a, b, c, d) {
        a.G.push([b, c, d]);
        a.B && $v(a)
    }

    q.then = function (a, b, c) {
        var d, e, f = new Rq(function (a, b) {
            d = a;
            e = b
        });
        cw(this, d, function (a) {
            a instanceof Yv ? f.cancel() : e(a)
        });
        return f.then(a, b, c)
    };
    Pq(Xv);
    Xv.prototype.la = function (a) {
        var b = new Xv;
        cw(this, b.ua, b.Qd, b);
        a && (b.A = this, this.F++);
        return b
    };
    function dw(a) {
        return pb(a.G, function (a) {
            return ya(a[1])
        })
    }

    function $v(a) {
        if (a.H && a.B && dw(a)) {
            var b = a.H, c = ew[b];
            c && (w.clearTimeout(c.va), delete ew[b]);
            a.H = 0
        }
        a.A && (a.A.F--, delete a.A);
        for (var b = a.C, d = c = !1; a.G.length && !a.I;) {
            var e = a.G.shift(), f = e[0], g = e[1], e = e[2];
            if (f = a.D ? g : f)try {
                var k = f.call(e || a.K, b);
                x(k) && (a.D = a.D && (k == b || k instanceof Error), a.C = b = k);
                if (Qq(b) || "function" === typeof w.Promise && b instanceof w.Promise) d = !0, a.I = !0
            } catch (l) {
                b = l, a.D = !0, dw(a) || (c = !0)
            }
        }
        a.C = b;
        d && (k = E(a.Uf, a, !0), d = E(a.Uf, a, !1), b instanceof Xv ? (cw(b, k, d), b.N = !0) : b.then(k, d));
        c && (b = new fw(b),
            ew[b.va] = b, a.H = b.va)
    }

    function bw() {
        Ha.call(this)
    }

    G(bw, Ha);
    bw.prototype.message = "Deferred has already fired";
    bw.prototype.name = "AlreadyCalledError";
    function Yv() {
        Ha.call(this)
    }

    G(Yv, Ha);
    Yv.prototype.message = "Deferred was canceled";
    Yv.prototype.name = "CanceledError";
    function fw(a) {
        this.va = w.setTimeout(E(this.B, this), 0);
        this.A = a
    }

    fw.prototype.B = function () {
        delete ew[this.va];
        throw this.A;
    };
    var ew = {};

    function gw(a, b, c, d) {
        ov.call(this);
        this.J = new Qr(a);
        this.G = new kr(c);
        this.H = d
    }

    G(gw, ov);
    gw.prototype.D = function (a, b, c, d, e, f, g) {
        (a = this.Fa()) && 0 != M(a, 4) ? (a = new Ou(this.G.toString() + "/" + this.H), su(a, b, Y.prototype.ng, Y.prototype.ih), su(a, c, Y.prototype.og, Y.prototype.jh), su(a, d, Y.prototype.Vg, Y.prototype.kh), b = a.Kc()) : b = this.G.toString() + "/s2560-no/" + this.H;
        e = f.ua(e, "fpts-get-tile");
        return this.J.Ja(b, e, g)
    };
    function hw(a, b, c, d, e, f) {
        b = new gw(c, 0, e, f);
        a(b)
    };
    function iw(a, b) {
        V.call(this, "HPNR", wb(arguments))
    }

    G(iw, V);
    function jw(a, b, c, d) {
        this.H = a;
        this.I = b;
        this.J = c;
        this.B = !1;
        this.M = -1;
        this.A = this.C = null;
        this.F = this.G = this.L = this.D = 0;
        this.K = !1;
        this.N = 0;
        this.P = !!d
    }

    function kw(a, b) {
        a.A && (a.A.style.display = b ? "inline" : "none")
    }

    function lw(a) {
        a.A && (a.A.style.left = a.D + "px", a.A.style.top = a.L + "px")
    }

    function mw(a) {
        a.A && (a.A.style.width = a.G + "px", a.A.style.height = a.F + "px")
    }

    jw.prototype.O = function () {
        Vn(this.A, "background-image", "-webkit-linear-gradient(45deg,#efefef 25%,transparent 25%,transparent 75%,#efefef 75%,#efefef),-webkit-linear-gradient(45deg,#efefef 25%,transparent 25%,transparent 75%,#efefef 75%,#efefef)");
        Vn(this.A, "background-color", "#fff");
        Vn(this.A, "background-position", "0 0, 10px 10px");
        Vn(this.A, "-webkit-background-size", "21px 21px");
        Vn(this.A, "background-size", "21px 21px")
    };
    function nw(a, b, c) {
        a.C = b;
        b = b.Ja();
        a.A = c ? b.cloneNode(!0) : b;
        a.A.className = "tile-image-3d";
        a.K && (a.K = !1, a.N = F())
    }

    jw.prototype.remove = function () {
        this.A && this.A.parentElement && this.A.parentElement.removeChild(this.A)
    };
    function ow(a, b, c, d) {
        this.C = a;
        this.A = bk("div");
        this.A.style.overflow = "hidden";
        this.A.style.position = "absolute";
        this.A.style.width = "inherit";
        this.A.style.height = "inherit";
        this.I = -1;
        this.F = b;
        this.L = c;
        this.J = d;
        var e = d.ma();
        a = e.D;
        d = a.W() * e.C;
        var f = vh(a) * e.B, e = Math.pow(2, e.A - b);
        b = Math.pow(2, c - b);
        this.B = d / (e * a.W());
        this.D = f / (e * vh(a));
        this.O = Math.ceil(this.B);
        this.M = Math.round(b * a.W());
        this.N = Math.round(b * vh(a));
        this.K = {};
        this.H = [];
        this.G = 0
    }

    function pw(a, b) {
        b != a.I && (a.I = b, eo(a.A, b), 0 < b && a.A.parentElement != a.C ? a.C.appendChild(a.A) : 0 == b && a.A.parentElement && a.C.removeChild(a.A))
    };
    function qw(a) {
        this.D = a;
        this.A = null;
        this.H = ok();
        this.B = ok();
        this.I = [];
        this.F = Infinity;
        this.C = null;
        this.G = -1
    }

    var rw = xl(), sw = xl();

    function tw(a) {
        a.A || (a.A = bk("div"), a.A.style.overflow = "hidden", a.A.style.position = "absolute", a.A.style.width = "inherit", a.A.style.height = "inherit");
        return a.A
    }

    function uw(a, b) {
        var c = Math.round(4 * b), d = a.I[c];
        d || (d = c / 4, b = Math.round(b), d = a.I[c] = new ow(tw(a), b, d, a.D));
        return d
    }

    qw.prototype.detach = function () {
        this.A && this.A.parentElement && this.A.parentElement.removeChild(this.A)
    };
    function vw(a, b) {
        ol.call(this);
        this.B = new eh;
        this.I = b;
        this.F = !1;
        this.G = new tl(5, function (a, b) {
            b.detach()
        });
        this.A = [];
        this.H = .5;
        this.C = function () {
            jp(a)
        };
        this.D = [];
        this.J = new Ho(Qo())
    }

    G(vw, ol);
    var ww = xl(), xw = Jl(), yw = new Jj;
    q = vw.prototype;
    q.yc = function (a) {
        this.B = a;
        this.C()
    };
    function zw(a, b) {
        var c = vl(a.G, b.id());
        c || (c = new qw(b), ul(a.G, b.id(), c));
        return c
    }

    function Aw(a, b, c) {
        if (0 == a.A.length)return null;
        var d = a.A[0];
        a = zw(a, d);
        yl(ww, b, c, 1);
        qk(a.B, ww, ww);
        ww[0] -= Math.floor(ww[0]);
        return d
    }

    q.Vc = function (a, b) {
        if (0 != this.A.length) {
            var c = this.A[0];
            if (0 != this.A.length) {
                var d = .5 * vh(nh(this.B)), e = .5 * nh(this.B).W(), f = zw(this, this.A[0]);
                yl(ww, e, d, 1);
                qk(f.B, ww, ww);
                this.H = ww[0]
            }
            d = this.H;
            e = c.ma();
            Kl(xw, e.O);
            em(a, ww);
            Tl(xw, ww, ww);
            a = ww[0];
            e = ww[1];
            yl(ww, Math.atan2(a, e) / Math.PI * .5 + .5, -Math.atan2(ww[2], Math.sqrt(a * a + e * e)) / Math.PI + .5, 1);
            a = ww[0] - d + .5;
            a -= Math.floor(a);
            ww[0] = a - .5 + d;
            c = zw(this, c);
            qk(c.H, ww, ww);
            b[0] = ww[0];
            b[1] = ww[1]
        }
    };
    q.$d = function (a) {
        a[0] = 1;
        a[1] = 179;
        if (0 != this.A.length) {
            var b = this.B, b = zw(this, this.A[0]).B[4] * vh(nh(b)) * 90;
            a[0] = Math.max(27 + b, 1);
            a[1] = Math.min(156 - b, 179);
            a[0] > a[1] && (a[0] = (a[0] + a[1]) / 2, a[1] = a[0])
        }
    };
    q.Ud = function (a, b, c) {
        a = Aw(this, a, b);
        if (!a)return null;
        yw.x = ww[0];
        yw.y = ww[1];
        return a.Td(yw, c)
    };
    q.Tc = function (a, b, c) {
        a = Aw(this, a, b);
        if (!a)return null;
        if (b = a.Sd()) {
            c = Gp(b, ww[0], ww[1], c);
            if (!c)return null;
            Mp(a.ma(), xw);
            Tl(xw, c.origin, c.origin);
            Ul(xw, c.A, c.A);
            El(c.A, c.A);
            return c
        }
        return null
    };
    q.hc = function (a, b) {
        if (!ep(this.A, a)) {
            Bw(this);
            for (var c = 0; c < this.A.length; ++c) {
                var d = this.A[c];
                -1 == mb(a, d) && zw(this, d).detach()
            }
            this.A = [];
            for (c = 0; c < a.length; ++c) {
                var d = a[c], e = Ph(Ys(d.Ea()));
                1 !== e && 2 !== e && 11 !== e && 13 !== e && 5 !== e && 4 !== e || dp(d) || (cp(d) || (d.Gb(b), d.Tb(this.C)), this.A.push(d))
            }
            for (a = 0; a < this.A.length; ++a)b = Uo(this.A[a], "TileReady", this.C), this.D.push(b)
        }
    };
    function Bw(a) {
        for (var b = 0; b < a.A.length; ++b)jl(a.D[b]);
        a.D = []
    }

    q.clear = function () {
        Bw(this);
        this.G.clear();
        this.A = []
    };
    q.zc = C;
    q.bd = function (a) {
        Vn(this.I, "background-color", .5 < a ? "white" : "black")
    };
    q.Qa = function () {
        Cw(this, !0)
    };
    q.ac = function () {
        Cw(this, !1)
    };
    function Cw(a, b) {
        var c = a.F = !1, d = new Ao(a.J, "render_html4_pano");
        d.Id();
        for (var e = 0; e < a.A.length; ++e) {
            var f = a.A[e];
            if (cp(f)) {
                var f = zw(a, f), g = a.B, k = a.I, l = d, m = tw(f);
                m.parentElement != k && k.appendChild(m);
                var n = f.D.ma(), p = nh(g), m = p.W(), r = vh(p), u = th(lh(g)), u = u - M(f.D.Fa(), 10), t = Eb(M(lh(g), 1), 0, 180), k = n.A, k = Math.round(4 * Eb(k - Math.log(Eb(ih(g), 0, 180) / 180 * vh(n.D) * n.B / vh(p)) / Math.LN2, 0, k)) / 4, g = f.F;
                f.F = k;
                var v = f, u = u / 360 + .5, t = 1 - t / 180, y = k, D = n, n = D.D, z = n.W() * D.C, A = vh(n) * D.B, n = p.W(), p = vh(p), D = Math.pow(2, D.A - y), y = D *
                    n / z, z = D * p / A, A = v.B, p = z / p;
                A[0] = y / n;
                A[1] = 0;
                A[2] = 0;
                A[3] = 0;
                A[4] = p;
                A[5] = 0;
                A[6] = 0;
                A[7] = 0;
                A[8] = 1;
                v.B[6] = u - y / 2;
                v.B[7] = t - z / 2;
                v.B[8] = 1;
                pk(v.B, v.H);
                yl(rw, 0, 0, 1);
                yl(sw, m, r, 1);
                qk(f.B, rw, rw);
                qk(f.B, sw, sw);
                r = m = uw(f, k);
                n = rw;
                y = sw;
                ++r.G;
                v = n[1] * r.D;
                u = Math.min(r.D, y[1] * r.D);
                t = (n[0] - Math.floor(n[0])) * r.B;
                p = t + (y[0] - n[0]) * r.B;
                z = p + 1;
                r.J.ma();
                n = !1;
                A = r.F != r.L;
                y = r.H;
                r.H = [];
                for (D = Math.max(0, Math.floor(v)); D < u; ++D)for (var B = (D - v) * r.N, R = Math.floor(t); R < z; ++R) {
                    var N = Fb(R, r.O), H = R < r.B ? R : N + r.B;
                    if (!(H > p)) {
                        var H = (H - t) * r.M, T = N + "|" + D +
                            "|" + r.F, S = r.K[T];
                        S || (S = new jw(N, D, r.F), r.K[T] = S);
                        T = N = S;
                        S = B;
                        if (H != T.D || S != T.L) T.D = H, T.L = S, lw(T);
                        H = N;
                        T = r.M;
                        S = r.N;
                        if (T != H.G || S != H.F) H.G = T, H.F = S, mw(H);
                        H = N;
                        1 != H.B && (kw(H, !0), H.B = !0);
                        var H = N, T = r.J, S = r.A, qa = l, oa = A;
                        if (H.C && !oa) {
                            var sa = T.ub(H.H, H.I, H.J);
                            sa && H.C != sa && (H.remove(), nw(H, sa, oa))
                        }
                        H.C || ((sa = T.ub(H.H, H.I, H.J)) ? nw(H, sa, oa) : (T.Hb(H.H, H.I, H.J, qa), H.K = !0));
                        H.A && H.A.parentElement != S && (S.appendChild(H.A), H.A.style.position = "absolute", H.A.style.pointerEvents = "none", kw(H, H.B), lw(H), mw(H), H.P && (H.A.complete ||
                        "complete" == H.A.readyState ? H.O() : hl(H.A, ["load", "readystatechange"], E(H.O, H))));
                        H = N;
                        H.A ? (T = Eb((F() - H.N) / 250, 0, 1), eo(H.A, T), H = 1 > T) : H = !1;
                        n = H || n;
                        N.M = r.G;
                        r.H.push(N)
                    }
                }
                for (l = 0; l < y.length; ++l)N = y[l], N.M != r.G && (v = N, 0 != v.B && (kw(v, !1), v.B = !1));
                r = n;
                Infinity != g && k != g && (k = uw(f, g), f.C && f.C.L != g && pw(f.C, 0), f.G = F(), f.C = k, f.C.A.style.zIndex = 1, m.A.style.zIndex = 0);
                f.C && (g = (F() - f.G) / 250, g = Eb(g, 0, 1), pw(f.C, 1 - g), 1 > g ? r = !0 : f.C = null);
                pw(m, 1);
                c = r || c
            }
        }
        c ? b && a.C() : (a.F = !0, a.dispatchEvent(new Kk("ViewportReady", a)));
        d.done("main-actionflow-branch")
    }

    q.ad = h("F");
    function Dw(a, b, c, d) {
        b = new vw(c, d);
        a(b)
    };
    function Ew(a, b, c, d, e, f, g) {
        V.call(this, "GCS", wb(arguments))
    }

    G(Ew, V);
    function Fw(a) {
        this.D = null;
        this.K = this.B = this.G = this.H = 0;
        this.C = [];
        this.I = [];
        this.F = {};
        this.J = {};
        this.A = new Wr(a)
    }

    var Gw = new Float32Array(3), Hw = uk(), Iw = new Cm;
    q = Fw.prototype;
    q.be = ba("D");
    q.ae = da(0);
    q.start = function () {
        return this.D ? this.jl : xj
    };
    q.jl = function () {
        if (8 != Jp(this.A, 0) || 8 != Jp(this.A, 7))return xj;
        this.B = (as(this.A, 1) || 1) - 1;
        this.H = as(this.A, 3) || 0;
        this.G = as(this.A, 5) || 0;
        var a = Jp(this.A, 7) || 0;
        this.K = a;
        this.C = Array(this.B + 1);
        var a = a + this.H * this.G, b = 22 * this.B, c;
        c = this.A;
        c = !c.A || 0 > a ? [] : $r(c, a, b) || [];
        this.C[0] = "";
        for (var d = 1; d <= this.B; d++) {
            for (var e = "", f = 0; 22 > f; f++)e += String.fromCharCode(c[22 * (d - 1) + f] || 0);
            this.C[d] = e
        }
        a = bs(this.A, a + b, 2 * this.B);
        if (a.length != 2 * this.B)return this.Ig;
        this.I = a;
        return this.zi
    };
    q.zi = function () {
        var a = this.D.Fa(), b = jh(a.ha()), c = hm(qh(b));
        yk(Hw, -Jb(M(a, 10)));
        for (b = 0; b < this.B; b++) {
            var d = this.C[b + 1], e = this.I[2 * b + 1], f = Gw;
            f[0] = this.I[2 * b];
            f[1] = e;
            f[2] = 0;
            var e = Hw, g = Gw, f = Gw, k = g[0], l = g[1], g = g[2];
            f[0] = k * e[0] + l * e[4] + g * e[8] + e[12];
            f[1] = k * e[1] + l * e[5] + g * e[9] + e[13];
            f[2] = k * e[2] + l * e[6] + g * e[10] + e[14];
            pm(a.ha(), Iw);
            e = Em(Iw);
            e.A += Gw[0] * c;
            e.B += Gw[1] * c;
            qm(Iw, e);
            f = e = new eh;
            k = Iw;
            if (0 != k.ea)throw Error("Invalid Coordinate System");
            Em(k, nm);
            l = mh(f);
            g = oh(f);
            k = kh(f);
            x(nm.G) && (l.data[0] = Hb(-Kb(nm.G)));
            x(nm.K) && (l.data[1] = Hb(Kb(nm.K)));
            x(nm.F) && (l.data[2] = Hb(-Kb(nm.F)));
            x(nm.D) && (f.data[3] = Kb(nm.D));
            x(nm.width) && uh(g, nm.width);
            x(nm.height) && wh(g, nm.height);
            f = om;
            gm(nm.A, nm.B, nm.C, f, void 0);
            f[0] = Kb(f[0]);
            f[1] = Kb(f[1]);
            k.data[1] = om[0];
            k.data[2] = om[1];
            sh(k, om[2]);
            this.F[d] = jh(e);
            this.J[d] = 2
        }
        for (b = 0; b < Q(a, 19); ++b)c = new Mh(P(new Qs(sd(a, 19, b)), 4)), d = Ns(c), (d = this.F[d]) && U(kh(Rh(c)), d);
        return this.Ig
    };
    q.Ig = function () {
        var a = this.D.tb(), b = this.G, c = this.A, d = this.K, e = this.C, f = this.F, g = this.J;
        a.A = this.H;
        a.C = b;
        a.B = c;
        a.D = d;
        a.G = e;
        a.H = f;
        a.F = g;
        return xj
    };
    function Jw(a, b, c, d) {
        this.B = null;
        this.F = a;
        this.D = b;
        this.A = [];
        for (a = 0; a < Q(c, 0); ++a) {
            b = 4 * a;
            var e = new Kf((new Jf(sd(c, 0, a))).data[0]);
            this.A[b + 0] = -M(e, 0);
            this.A[b + 1] = -M(e, 1);
            this.A[b + 2] = -M(e, 2);
            this.A[b + 3] = -M(e, 3)
        }
        this.C = new Wr(d)
    }

    Jw.prototype.be = ba("B");
    Jw.prototype.ae = da(1);
    Jw.prototype.start = function () {
        return this.B ? this.G : xj
    };
    Jw.prototype.G = function () {
        var a = this.B;
        a.C = new Cp(this.F, this.D, this.A, this.C);
        a.Kb();
        return xj
    };
    function Kw(a, b, c, d) {
        this.A = null;
        this.H = a;
        this.G = b;
        this.F = new Wr(d);
        this.C = [];
        this.B = {};
        this.D = {};
        for (a = 0; a < Q(c, 0); ++a) {
            b = Qf(Rf(c, a)).sa();
            this.C.push(b);
            this.B[b] = L(Qf(Rf(c, a)), 0);
            d = new Rd(Rf(c, a).data[2]);
            var e = new fh;
            e.data[1] = M(Yd(d), 3);
            e.data[2] = M(Yd(d), 2);
            sh(e, M(new Ud(d.data[1]), 0) || 3);
            this.D[b] = e
        }
    }

    Kw.prototype.be = ba("A");
    Kw.prototype.ae = da(0);
    Kw.prototype.start = function () {
        return this.A ? this.I : xj
    };
    Kw.prototype.I = function () {
        var a = this.A.tb(), b = this.G, c = this.F, d = this.C, e = this.D, f = this.B;
        a.A = this.H;
        a.C = b;
        a.B = c;
        a.D = 0;
        a.G = d;
        a.H = e;
        a.F = f;
        return xj
    };
    function Lw(a, b) {
        var c = b || {};
        b = c.document || document;
        var d = Gi(a), e = bk("SCRIPT");
        a = {ph: e, Ib: void 0};
        var f = new Xv(Mw, a), g = null, k = null != c.timeout ? c.timeout : 5E3;
        0 < k && (g = window.setTimeout(function () {
            Nw(e, !0);
            f.Qd(new Ow(1, "Timeout reached for loading script " + d))
        }, k), a.Ib = g);
        e.onload = e.onreadystatechange = function () {
            e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (Nw(e, c.xi || !1, g), f.ua(null))
        };
        e.onerror = function () {
            Nw(e, !0, g);
            f.Qd(new Ow(0, "Error while loading script " + d))
        };
        a = c.attributes ||
            {};
        Ub(a, {type: "text/javascript", charset: "UTF-8", src: d});
        Rj(e, a);
        Pw(b).appendChild(e);
        return f
    }

    function Pw(a) {
        var b;
        return (b = (a || document).getElementsByTagName("HEAD")) && 0 != b.length ? b[0] : a.documentElement
    }

    function Mw() {
        if (this && this.ph) {
            var a = this.ph;
            a && "SCRIPT" == a.tagName && Nw(a, !0, this.Ib)
        }
    }

    function Nw(a, b, c) {
        null != c && w.clearTimeout(c);
        a.onload = C;
        a.onerror = C;
        a.onreadystatechange = C;
        b && window.setTimeout(function () {
            ek(a)
        }, 0)
    }

    function Ow(a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        Ha.call(this, c);
        this.code = a
    }

    G(Ow, Ha);
    function Qw(a, b) {
        this.B = new kr(a);
        this.A = b ? b : "callback";
        this.Ib = 5E3
    }

    var Rw = 0;

    function Sw(a, b, c) {
        var d = "_" + (Rw++).toString(36) + F().toString(36), e = "_callbacks___" + d, f = new kr(a.B);
        b && (w[e] = Tw(d, b), b = a.A, ua(e) || (e = [String(e)]), Br(f.A, b, e));
        a = {timeout: a.Ib, xi: !0};
        e = new Ei;
        e.A = f.toString();
        f = Lw(e, a);
        cw(f, null, Uw(d, c), void 0);
        return {va: d, Xf: f}
    }

    Qw.prototype.cancel = function (a) {
        a && (a.Xf && a.Xf.cancel(), a.va && Vw(a.va, !1))
    };
    function Uw(a, b) {
        return function () {
            Vw(a, !1);
            b && b(null)
        }
    }

    function Tw(a, b) {
        return function (c) {
            Vw(a, !0);
            b.apply(void 0, arguments)
        }
    }

    function Vw(a, b) {
        a = "_callbacks___" + a;
        if (w[a])if (b)try {
            delete w[a]
        } catch (c) {
            w[a] = void 0
        } else w[a] = C
    };
    function Ww(a) {
        this.B = wa(a) || a instanceof kr ? new Rv(a) : a
    }

    Ww.prototype.A = function (a, b, c, d) {
        var e = d || new Lv, f = c || C, g = new Qw(Sv(this.B, a)), k = !1, l = Sw(g, function (a) {
            Nv(e, 1);
            b(a);
            f()
        }, function () {
            k || (Nv(e, 2), f())
        });
        Mv(e, function () {
            k = !0;
            var a;
            null === l ? a = !1 : (g.cancel(l), a = !0);
            return a
        })
    };
    function Xw(a, b) {
        var c = Yw(a, b), c = Array(c);
        Zw(a, b, c, 0);
        return c.join("")
    }

    var $w = /^([0-9]+)([a-z])([\s\S]*)/, ax = /(\*)/g, bx = /(!)/g, cx = /(\*2A)/gi, dx = /(\*21)/gi;

    function Yw(a, b) {
        var c = 0, d;
        for (d in b.R) {
            var e = parseInt(d, 10), f = b.R[e], e = a[e + b.A];
            if (f && null != e)if (3 == f.label)for (var g = 0; g < e.length; ++g)c += ex(e[g], f); else c += ex(e, f)
        }
        return c
    }

    function ex(a, b) {
        var c = 4;
        "m" == b.type && (c += Yw(a, b.Ce));
        return c
    }

    function Zw(a, b, c, d) {
        for (var e in b.R) {
            var f = parseInt(e, 10), g = b.R[f], k = a[f + b.A];
            if (g && null != k)if (3 == g.label)for (var l = 0; l < k.length; ++l)d = fx(k[l], f, g, c, d); else d = fx(k, f, g, c, d)
        }
        return d
    }

    function fx(a, b, c, d, e) {
        d[e++] = "!";
        d[e++] = "" + b;
        if ("m" == c.type) d[e++] = c.type, d[e++] = "", b = e, e = Zw(a, c.Ce, d, e), d[b - 1] = "" + (e - b >> 2); else {
            c = c.type;
            if ("b" == c) a = a ? "1" : "0"; else if ("i" == c || "j" == c || "u" == c || "v" == c || "n" == c || "o" == c) {
                if (!wa(a) || "j" != c && "v" != c && "o" != c) a = "" + Math.floor(a)
            } else if ("B" == c) a = wa(a) ? Oc(a) : va(a) ? Ec(a) : "" + a, a = a.replace(/[.=]+$/, ""); else if (a = "" + a, "s" == c) {
                var f = a;
                b = encodeURIComponent(f).replace(/%20/g, "+");
                var g = b.match(/%[89AB]/ig), f = f.length + (g ? g.length : 0);
                if (4 * Math.ceil(f / 3) - (3 - f % 3) % 3 < b.length) {
                    c =
                        [];
                    for (f = b = 0; f < a.length; f++)g = a.charCodeAt(f), 128 > g ? c[b++] = g : (2048 > g ? c[b++] = g >> 6 | 192 : (55296 == (g & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (g = 65536 + ((g & 1023) << 10) + (a.charCodeAt(++f) & 1023), c[b++] = g >> 18 | 240, c[b++] = g >> 12 & 63 | 128) : c[b++] = g >> 12 | 224, c[b++] = g >> 6 & 63 | 128), c[b++] = g & 63 | 128);
                    a = Ec(c);
                    a = a.replace(/[.=]+$/, "");
                    c = "z"
                } else-1 != a.indexOf("*") && (a = a.replace(ax, "*2A")), -1 != a.indexOf("!") && (a = a.replace(bx, "*21"))
            }
            d[e++] = c;
            d[e++] = a
        }
        return e
    }

    function pf(a) {
        return -1 != a.indexOf("*21") ? a.replace(dx, "!") : a
    }

    function qf(a) {
        var b = a.charCodeAt(0).toString(16), c = new RegExp("(\\*" + b + ")", "gi"), b = "*" + b, d = b.toLowerCase();
        return function (e) {
            return -1 != e.indexOf(b) || -1 != e.indexOf(d) ? e.replace(c, a) : e
        }
    }

    function rf(a, b, c, d, e, f) {
        if (a + b > c.length)return !1;
        var g = a;
        for (a += b; g < a; ++g) {
            var k = $w.exec(c[g]);
            if (!k)return !1;
            b = parseInt(k[1], 10);
            var l = k[2], m = k[3], m = d(m);
            if (-1 != m.indexOf("*2A") || -1 != m.indexOf("*2a")) m = m.replace(cx, "*");
            var n = 0;
            if ("m" == l && (n = parseInt(m, 10), isNaN(n)))return !1;
            var p = e.R[b];
            if (p) {
                k = k[2];
                if ("z" == k) {
                    for (var k = "s", m = Gc(m), l = [], r = 0, u = 0; r < m.length;) {
                        var t = m[r++];
                        if (128 > t) l[u++] = String.fromCharCode(t); else if (191 < t && 224 > t) {
                            var v = m[r++];
                            l[u++] = String.fromCharCode((t & 31) << 6 | v & 63)
                        } else if (239 <
                            t && 365 > t) {
                            var v = m[r++], y = m[r++], D = m[r++], t = ((t & 7) << 18 | (v & 63) << 12 | (y & 63) << 6 | D & 63) - 65536;
                            l[u++] = String.fromCharCode(55296 + (t >> 10));
                            l[u++] = String.fromCharCode(56320 + (t & 1023))
                        } else v = m[r++], y = m[r++], l[u++] = String.fromCharCode((t & 15) << 12 | (v & 63) << 6 | y & 63)
                    }
                    m = l.join("")
                }
                if (p.type != k)return !1;
                if ("m" == p.type) {
                    p = p.Ce;
                    m = [];
                    if (!rf(g + 1, n, c, d, p, m))return !1;
                    g += n
                }
                a:{
                    n = m;
                    p = f;
                    k = e.R[b];
                    if ("s" != k.type && "m" != k.type && !wa(k.Bi)) {
                        m = "f" != k.type && "d" != k.type ? parseInt(n, 10) : parseFloat(n);
                        if (isNaN(m)) {
                            b = !1;
                            break a
                        }
                        "b" == k.type ?
                            n = 0 != m : n = m
                    }
                    b += e.A || 0;
                    3 == k.label ? Lc(p, b).push(n) : p[b] = n;
                    b = !0
                }
                if (!b)return !1
            } else"m" == l && (g += n)
        }
        return !0
    };
    function gx(a) {
        this.B = a
    }

    gx.prototype.A = function (a) {
        a = Xw(a.ib(), this.B);
        return "pb=" + encodeURIComponent(a).replace(/%20/g, "+")
    };
    function hx(a) {
        this.B = a
    }

    hx.prototype.A = function (a) {
        return new this.B(a)
    };
    function ix(a, b) {
        this.C = a;
        this.B = b || C
    }

    ix.prototype.A = function (a) {
        ")]}'\n" == a.substr(0, 5) && (a = a.substr(5));
        var b, c = !1;
        if (w.JSON && w.JSON.parse && 0 > a.indexOf(",,") && 0 > a.indexOf("[,") && 0 > a.indexOf(",]"))try {
            b = JSON.parse(a), c = !0
        } catch (d) {
        }
        if (!c)try {
            b = Zt(a)
        } catch (d) {
        }
        if (!(b instanceof Array))throw this.B(a), Error("JspbDeserializer parse error.");
        return new this.C(b)
    };
    function jx(a, b, c, d, e, f, g) {
        this.F = c ? new Vv(new Pv(d, new Ww(a)), new gx(Tg()), new hx(Eg)) : new Vv(new Pv(d, new Tv(a)), new gx(Tg()), new ix(Eg, wj));
        this.C = b ? c ? new Vv(new Pv(d, new Ww(b)), new gx(ah()), new hx(Pg)) : new Vv(new Pv(d, new Tv(b)), new gx(ah()), new ix(Pg, wj)) : null;
        this.D = f;
        this.B = e;
        this.A = g
    }

    jx.prototype.Fa = function (a, b, c) {
        kx(this, a.Ea(), c.ua(b, "gcs-get-config"))
    };
    function lx(a, b, c) {
        var d = Ys(b), e = new Ng;
        gf(new df(P(e, 0)), a.B);
        var f = new hf;
        of(f, d.sa());
        K(f, 0) ? U(new hf(P(e, 6)), f) : (f = new xg(P(e, 1)), b = jh(Ys(b).ha()), $d(new Sd(P(f, 0)), qh(b)), be(new Sd(P(f, 0)), ph(b)), f.data[1] = 50);
        U(new sf(P(new gg(P(e, 2)), 1)), a.D);
        pd(new Uf(P(new Sf(P(new gg(P(e, 2)), 0)), 0)), 0, 2);
        (new Sf(P(new gg(P(e, 2)), 0))).data[2] = !0;
        b = new je(rd(new le(P(new gg(P(e, 2)), 10)), 0));
        b.data[0] = 2;
        b.data[1] = !0;
        b.data[2] = 2;
        a.A && U(new Se(P(new df(P(e, 0)), 10)), a.A);
        mx(new Hg(P(e, 3)));
        var g = new Lv;
        Wv(a.C,
            e, function (a) {
                a && K(a, 1) ? nx(a.getMetadata(), c, g, d) : c(new ds)
            }, g)
    }

    function kx(a, b, c) {
        var d = Ys(b), e = new Cg, f = new Fg(rd(e, 2));
        if (K(d.da(), 1)) U(new Je(P(f, 0)), Vg(d.da())); else {
            Ne(new Je(P(f, 0)), Ns(d));
            var g = 0;
            switch (L(Ys(b), 1, 99)) {
                case 7:
                    g = 1;
                    break;
                case 0:
                    g = 2;
                    break;
                case 4:
                    g = 3;
                    break;
                case 1:
                    g = 4;
                    break;
                default:
                    g = ox(Ph(d))
            }
            Me(new Je(P(f, 0)), g)
        }
        mx(new Hg(P(e, 3)));
        f = null;
        0 < Q(d, 15) && 0 == L(new xh(Th(d).data[0]), 8) && (f = O(new xh(Th(d).data[0]), 0), Ee(new Ae(P(new Fg(sd(e, 2, 0)), 1)), f));
        U(new sf(P(e, 1)), a.D);
        a.A && U(new Se(P(new df(P(e, 0)), 10)), a.A);
        gf(new df(P(e, 0)), a.B);
        var k = new Lv;
        Wv(a.F, e, function (e) {
            1 === k.Ga() && e && Q(e, 1) && 0 === e.Ga().rc() && (1 === e.eb(0).Ga().rc() || 3 === e.eb(0).Ga().rc()) ? nx(e.eb(0), c, k, d) : a.C ? lx(a, b, c) : c(new ds)
        }, k)
    }

    function mx(a) {
        pd(a, 0, 1);
        pd(a, 0, 2);
        pd(a, 0, 3);
        pd(a, 0, 4);
        pd(a, 0, 5);
        pd(a, 0, 6);
        pd(a, 0, 8);
        (new yf(rd(a, 1))).data[0] = 1;
        (new Jg(P(a, 3))).data[0] = 48;
        (new Af(rd(a, 5))).data[0] = 1;
        (new Af(rd(a, 5))).data[0] = 2;
        (new Hf(rd(a, 4))).data[0] = 1;
        (new Hf(rd(a, 4))).data[0] = 2
    }

    function px(a) {
        for (var b = 0; b < Q(a, 5); ++b) {
            var c = $g(a, b);
            if (K(c, 5)) {
                var d = new Nf(c.data[5]);
                if (K(d, 1))return a = new Mf(d.data[1]), b = Oc(wd(new xd(a.data, 2))), 2 == L(new Hf(d.data[0]), 0) ? new cs(b) : new Jw((new Od(a.data[0])).W(), M(new Od(a.data[0]), 0), new Lf(c.data[4]), b)
            }
        }
        return new cs("")
    }

    function nx(a, b, c, d) {
        var e = new ds;
        if (1 === c.Ga() && (1 === a.Ga().rc() || 3 === a.Ga().rc()))if (e.A = a, Ds(d)) {
            e.C = ct(a);
            e.B.push(px(a));
            a:{
                for (var f = 0; f < Q(a, 5); ++f)if (c = $g(a, f), K(c, 5) && (d = new Nf(c.data[5]), K(d, 3))) {
                    a = new Mf(d.data[3]);
                    f = String(Oc(wd(new xd(a.data, 2))));
                    a = 2 == L(new Af(d.data[2]), 0) ? new Fw(f) : new Kw((new Od(a.data[0])).W(), M(new Od(a.data[0]), 0), new Gf(c.data[3]), f);
                    break a
                }
                a = null
            }
            a && e.B.push(a)
        } else {
            c = new $s;
            d = null;
            for (f = 0; f < Q(a, 5); ++f) {
                var g = $g(a, f);
                if (K(g, 1) && (d = g, 2 === L(new yf(d.data[0]), 0)))break
            }
            d &&
            (f = new ie, U(new Rd(P(f, 0)), Pf(d)), Js(f, new eh(P(new bt(P(c, 1)), 0))));
            K(Wg(a), 2) && (d = new Od(Wg(a).data[2]), f = new eh(P(new bt(P(c, 1)), 0)), uh(oh(f), d.W()), wh(oh(f), M(d, 0)));
            d = new at(P(c, 2));
            f = L(Wg(a), 0);
            4 == f && (d.data[0] = 1);
            if (3 == f || 10 == f) d.data[0] = 2;
            K(a, 4) && (g = new Ld(a.data[4]), 0 < Q(g, 1) && (g = Id(Nd(new Md(sd(g, 1, 0)))), d.data[3] = g));
            d.data[4] = K(Yg(a), 5) ? Id(new Fd(Yg(a).data[5])) : Id(new Fd(Yg(a).data[6]));
            g = Vg(a).sa();
            d.data[1] = g;
            K(Wg(a), 3) && 2 != f && (a = he(Wg(a)), d = new hh(P(c, 8)), K(a, 1) ? (uh(d, (new Od(a.data[1])).W()),
                    wh(d, M(new Od(a.data[1]), 0))) : (uh(d, (new Od((new ee(sd(a, 0, 0))).data[0])).W()), wh(d, M(new Od((new ee(sd(a, 0, 0))).data[0]), 0))), c.data[9] = Q(a, 0) - 1);
            e.C = c
        }
        b(e)
    }

    function ox(a) {
        switch (a) {
            case 1:
            case 2:
            case 4:
            case 5:
            case 11:
            case 13:
            case 3:
                return 2;
            case 10:
                return 4;
            case 12:
            case 15:
                return 3;
            case 27:
                return 1;
            default:
                return 0
        }
    };
    function qx(a, b, c, d, e, f, g, k, l) {
        b = new jx(c, d, e, f, g, k, l);
        a(b)
    };
    function rx(a, b, c, d, e) {
        V.call(this, "SCPI", wb(arguments))
    }

    G(rx, V);
    function sx(a, b) {
        this.C = a;
        this.A = b
    }

    sx.prototype.B = function (a) {
        var b = this.C;
        a = Gb(.4, 1, this.A ? a : 1 - a);
        b.D && b.A.B() && (b.A.A().J(a), jp(b.G))
    };
    function tx(a, b) {
        return ux(a.ib(), b.ib())
    }

    function ux(a, b) {
        return Cb(a, b, function (a, b) {
            return a instanceof Array && b instanceof Array ? ux(a, b) : a === b
        })
    }

    function vx(a) {
        var b = new Vs;
        U(b, a);
        return b
    }

    function wx(a) {
        a = Xs(a);
        return 0 === a || 3 === a
    }

    function xx(a) {
        a = Xs(a);
        return 2 === a || 1 === a || 4 === a
    }

    function yx(a, b) {
        var c = !1;
        K(a, 0) && (b.data[0] = Xs(a), c = !0);
        K(a, 4) && (U(Zs(b), Ys(a)), c = !0);
        K(a, 2) && (U(new Ws(P(b, 2)), new Ws(a.data[2])), c = !0);
        K(a, 3) && (U(new Ss(P(b, 3)), new Ss(a.data[3])), c = !0);
        K(a, 5) && (b.data[5] = O(a, 5), c = !0);
        K(a, 6) && (b.data[6] = nd(a, 6), c = !0);
        K(a, 8) && (U(new Ts(P(b, 8)), new Ts(a.data[8])), c = !0);
        a:{
            a = Ys(b).da();
            for (var d = 0; d < Q(a, 5); d++)if (0 < Q($g(a, d), 9)) {
                a = !0;
                break a
            }
            a = !1
        }
        !a && K(b, 8) && (od(b, 8), c = !0);
        return c
    }

    function zx(a) {
        var b = new Vs;
        U(Zs(b), a);
        b.data[0] = Ds(a) ? 1 : Es(a) ? 2 : Fs(a) ? 5 : 4;
        if (!K(a, 1)) {
            var c = Ax(a);
            Zs(b).data[1] = c
        }
        if (K(a, 21)) {
            a:{
                a = a.da();
                for (c = 0; c < Q(a, 5); ++c)if (K($g(a, c), 1)) {
                    var d = Yd(Pf($g(a, c)));
                    if (K(d, 4)) {
                        a = Bx[L(d, 4, 1)];
                        break a
                    }
                }
                a = 0
            }
            0 != a && (b.data[7] = a)
        }
        return b
    }

    function Ax(a) {
        var b = Wg(a.da());
        if (K(b, 0))switch (L(b, 0)) {
            case 1:
                return 7;
            case 2:
                return 0;
            case 3:
            case 8:
                return 4;
            case 4:
                return 1
        }
        b = 99;
        switch (Ph(a)) {
            case 1:
            case 2:
            case 4:
            case 5:
            case 11:
            case 13:
            case 3:
                b = 0;
                break;
            case 10:
                b = 1;
                break;
            case 12:
            case 15:
                b = 4;
                break;
            case 7:
            case 14:
                b = 5;
                break;
            case 27:
                b = 7
        }
        return b
    }

    var Bx = {1: 1, 2: 2, 3: 3};

    function Cx(a) {
        this.A = x(a) ? a : 1;
        this.B = !0;
        this.C = !1
    }

    Cx.prototype.D = function () {
        var a = new Cx;
        a.A = this.A;
        a.B = this.B;
        a.C = this.C;
        return a
    };
    function Dx(a, b, c, d) {
        ys(a);
        this.B = ys(c);
        vx(b);
        this.A = vx(d)
    };
    function Ex(a) {
        for (; -180 > a;)a += 360;
        for (; 180 < a;)a -= 360;
        return a
    };
    function Fx(a, b, c, d, e, f, g) {
        this.N = ys(a);
        this.P = b;
        this.M = Ys(this.P);
        this.K = ys(c);
        this.L = d;
        this.B = Ys(this.L);
        this.Y = e;
        this.C = f;
        this.F = ys(a);
        this.I = new Zo;
        U(kh(new eh(P(this.I, 2))), jh(a));
        this.I.data[5] = !0;
        this.A = new Zo;
        U(kh(new eh(P(this.A, 2))), e ? jh(a) : jh(c));
        this.A.data[5] = !0;
        this.U = null;
        this.X = !1;
        this.O = 0;
        this.J = g
    }

    Fx.prototype.D = da(500);
    Fx.prototype.G = function (a) {
        Gx(this);
        var b;
        b = 2 * a - 1;
        b = .5 * (b * (2 + b * ((0 <= b ? -1 : 1) + 0 * b)) + 1);
        if (!this.Y) {
            var c = jh(this.N), d = jh(this.K), e = kh(this.F), f = ph(c);
            e.data[1] = Ex(Gb(f, f + Lb(f, ph(d)), b));
            e.data[2] = Gb(qh(c), qh(d), b);
            sh(e, Gb(rh(c), rh(d), b))
        }
        var c = lh(this.N), d = lh(this.K), e = mh(this.F), f = th(c), g = M(c, 2), k = Lb(g, M(d, 2));
        e.data[0] = Hb(f + Gb(0, Lb(f, th(d)), b));
        e.data[1] = Gb(M(c, 1), M(d, 1), b);
        e.data[2] = Hb(g + Gb(0, k, b));
        c = ih(this.N);
        d = ih(this.K);
        this.F.data[3] = 1E-6 >= Math.abs(c - d) ? c : Gb(c, d, b);
        0 === a || Ms(this.M, this.B) ?
            Hx(this.C, this.M, this.J) : 1 === a ? (Hx(this.C, this.B, this.J), K(this.B.ha(), 0) && U(kh(this.F), jh(this.B.ha()))) : (this.I.data[0] = 1, !this.X || .2 > a ? (this.O = a, this.A.data[0] = 0) : this.A.data[0] = (a - this.O) / (1 - this.O), this.I.data[4] = Gb(1, 0, 10 * Eb(b, 0, .1)), a = Gb(0, 1, 10 * (Eb(b, .9, 1) - .9)), this.A && (this.A.data[4] = a), a = this.C, f = this.B, b = this.J, c = this.I, d = this.A, e = Ix(a, this.M, b), f = Ix(a, f, b), e && f && (Jx(a, e, b, c), a.N = f, a.J = d, Kx(a, b)));
        return this.F
    };
    Fx.prototype.H = function (a) {
        var b = !Ms(Ys(this.P), Ys(this.L));
        if (0 === a) b && (a = this.C, Lx(a.B, !1), a.A.B() && a.A.A().B(!1)); else if (1 === a)return b && (a = this.C, Lx(a.B, !0), a.A.B() && a.A.A().B(!0)), this.L;
        return null
    };
    function Gx(a) {
        if (!a.U) {
            var b = zx(a.B);
            a.U = Mx(a.C, b, a.J, function (b) {
                a.X = b
            })
        }
    };
    function Nx(a, b, c) {
        this.J = th(lh(a));
        this.C = ys(a);
        this.K = b ? -1 : 1;
        this.I = c;
        this.B = -2 / 3 * .075;
        this.F = 1 / .016875;
        this.A = 1 / (1 + this.B)
    }

    Nx.prototype.D = da(4E3);
    Nx.prototype.G = function (a) {
        this.I && (a = .075 >= a ? this.A * this.F * a * a * a : this.A * (a + this.B));
        a = Hb(this.J + 360 * this.K * a);
        mh(this.C).data[0] = a;
        return this.C
    };
    Nx.prototype.H = da(null);
    function Ox(a, b, c) {
        this.A = a;
        this.C = b;
        this.B = c
    }

    function Px(a, b) {
        if (0 == b)return 0;
        if (1 == b)return 1;
        var c = Gb(0, a.A, b), d = Gb(a.A, a.B, b);
        a = Gb(a.B, 1, b);
        c = Gb(c, d, b);
        d = Gb(d, a, b);
        return Gb(c, d, b)
    }

    function Qx(a, b) {
        if (0 == b)return 0;
        if (1 == b)return 1;
        var c = Gb(0, a.C, b);
        a = Gb(a.C, 1, b);
        var d = Gb(1, 1, b), c = Gb(c, a, b);
        a = Gb(a, d, b);
        return Gb(c, a, b)
    }

    function Rx(a, b) {
        var c = (b - 0) / 1;
        if (0 >= c)return 0;
        if (1 <= c)return 1;
        for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
            var f = Px(a, c), k = (Px(a, c + 1E-6) - f) / 1E-6;
            if (1E-6 > Math.abs(f - b))return c;
            if (1E-6 > Math.abs(k))break; else f < b ? d = c : e = c, c -= (f - b) / k
        }
        for (g = 0; 1E-6 < Math.abs(f - b) && 8 > g; g++)f < b ? (d = c, c = (c + e) / 2) : (e = c, c = (c + d) / 2), f = Px(a, c);
        return c
    };
    function Sx(a, b, c) {
        a = new Ox(a, b, c);
        var d = Array(51);
        for (b = 0; 51 > b; b++)d[b] = Qx(a, Rx(a, b / 50));
        return function (a) {
            if (0 >= a)return 0;
            if (1 <= a)return 1;
            var b = 50 * a;
            a = Math.floor(b);
            b -= a;
            return d[a] * (1 - b) + d[a + 1] * b
        }
    }

    Sx(0, 0, .58);
    var Tx = Sx(.52, 0, .48);
    Sx(.52, 0, .25);
    var Ux = Sx(.36, .67, .533);
    Sx(.24, .67, .533);
    Sx(.56, 1, .56);
    Sx(.91, 1, .82);
    function Vx(a, b) {
        this.K = ys(a);
        this.N = Ux;
        this.C = Hb(M(lh(a), 1));
        this.B = Hb(th(lh(a)));
        this.I = Hb(M(lh(a), 2));
        this.J = Lb(this.C, Hb(M(b, 1)));
        this.F = Lb(this.I, Hb(M(b, 2)));
        this.A = Lb(this.B, Hb(th(b)));
        this.L = 0 != this.A || 0 != this.F || 0 != this.J ? 650 : 0
    }

    Vx.prototype.D = h("L");
    Vx.prototype.G = function (a) {
        var b = this.K, c = this.N(a);
        a = Hb(this.B + Gb(0, this.A, c));
        var d = Hb(this.C + Gb(0, this.J, c)), c = Hb(this.I + Gb(0, this.F, c));
        mh(b).data[0] = a;
        mh(b).data[1] = d;
        mh(b).data[2] = c;
        return b
    };
    Vx.prototype.H = da(null);
    function Wx(a, b, c, d) {
        this.B = ys(a);
        this.L = Ux;
        this.C = ih(a);
        this.A = b;
        this.J = th(lh(a));
        var e = nh(a), f;
        f = ih(a) * (e.W() / vh(e));
        var g;
        g = b * (e.W() / vh(e));
        c -= e.W() / 2;
        this.F = th(lh(a)) + c / e.W() * f - c / e.W() * g;
        this.K = M(lh(a), 1);
        e = vh(nh(a));
        d -= e / 2;
        this.I = Eb(M(lh(a), 1) - d / e * ih(a) + d / e * b, 0, 170)
    }

    Wx.prototype.D = function () {
        return 1E3 * Math.abs(this.A - this.C) / 72
    };
    Wx.prototype.G = function (a) {
        var b = this.L(a);
        a = Gb(this.C, this.A, b);
        var c = Gb(this.J, this.F, b), b = Gb(this.K, this.I, b), d = this.B;
        mh(d).data[0] = c;
        mh(d).data[1] = b;
        d.data[3] = a;
        return this.B
    };
    Wx.prototype.H = da(null);
    function Xx(a) {
        if (dc) a = Yx(a); else if (gc && ec)switch (a) {
            case 93:
                a = 91
        }
        return a
    }

    function Yx(a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a
        }
    };
    var Zx = {Ph: 6176}, $x = {Ph: 5610}, ay = {Ph: 5611};

    function by(a, b) {
        return w.setTimeout(function () {
            try {
                a()
            } catch (c) {
                throw c;
            }
        }, b)
    }

    function cy(a) {
        return w.setInterval(function () {
            try {
                a()
            } catch (b) {
                throw b;
            }
        }, 1E4)
    };
    function dy(a, b) {
        this.G = x(b) ? b : 20;
        this.F = a;
        this.C = this.B = this.A = null;
        var c = this;
        this.D = function () {
            c.B = null;
            c.C = null;
            if (null !== c.A) {
                var a = F();
                a >= c.A - c.G ? (c.A = null, a = c.F, a()) : (c.C = c.A, c.B = by(c.D, c.A - a))
            }
        }
    }

    dy.prototype.start = function (a) {
        this.A = F() + a;
        if (null !== this.B) {
            if (this.A >= this.C)return;
            w.clearTimeout(this.B)
        }
        this.C = this.A;
        this.B = by(this.D, a)
    };
    dy.prototype.cancel = function () {
        this.A = null
    };
    function ey(a, b, c) {
        this.G = a;
        this.F = b;
        this.C = c;
        this.B = null;
        var d = this;
        this.D = new dy(function () {
            var a = d.B;
            a && (d.B = null, d.F(a), a.done(d.C))
        })
    }

    ey.prototype.start = function (a) {
        null === this.D.A && (a.la(this.C), this.B && this.B.done(this.C), this.B = a, this.D.start(this.G))
    };
    ey.prototype.A = function () {
        this.D.cancel();
        this.B && (this.B.done(this.C), this.B = null)
    };
    function fy(a, b, c, d, e) {
        var f = O(new Ag(b.data[7]), 0);
        if (!f)return "";
        f = new kr(f);
        O(e, 0) && f.A.set("hl", O(e, 0));
        O(e, 1) && f.A.set("gl", O(e, 1));
        2 == L(Wg(b), 1) ? a && f.A.set("cbp", "1," + Math.floor(th(lh(a))) + ",,0,0") : c ? f.A.set("cid", c) : d && f.A.set("fid", d);
        return f.toString()
    };
    function gy(a) {
        if (!a || !K(a, 5))return null;
        a = new He(a.data[5]);
        var b;
        (b = !K(a, 4)) || (b = Id(new Fd(a.data[4])), b = /^[\s\xa0]*$/.test(null == b ? "" : String(b)));
        return b ? null : Id(new Fd(a.data[4]))
    };
    function hy(a) {
        this.data = a || []
    }

    G(hy, J);
    function iy(a) {
        this.data = a || []
    }

    G(iy, J);
    function jy(a, b, c, d, e) {
        var f = a.ed, g = a.Fe;
        a = [];
        var k = [], l;
        U(Qh(f), b);
        K(b, 7) && (c = fy(null, b, c, d, e), Bg(new Ag(P(Qh(f), 7)), c), Kh(new yh(P(g, 12)), c));
        c = new Ld(b.data[4]);
        d = Zg(b);
        for (l = 0; l < Q(c, 1); l++)a.push(ky(new Md(sd(c, 1, l))));
        for (l = 0; l < Q(c, 0); l++)k.push(ly(new Md(sd(c, 0, l))));
        Q(c, 0) || (e = new iy, e.data[0] = "Photos are copyrighted by their owners", k.push(e));
        for (l = 0; l < Q(c, 2); l++)k.push(ly(new Md(sd(c, 2, l))));
        for (l = 0; l < Q(c, 3); l++)e = new Md(sd(c, 3, l)), nd(e, 4, !0) ? k.push(ly(e)) : a.push(ky(e));
        e = Yg(b);
        var m, n =
            !1;
        Q(e, 2) ? (m = Id(new Fd(sd(e, 2, 0))), n = !0) : 2 != L(Wg(b), 1) && (m = "Untitled");
        l = my(b);
        var p = !1;
        l || (l = m, p = !0);
        m = n && p;
        n = L(Vg(b), 0);
        1 != n && l && (Q(c, 4) && O(new Md(sd(c, 4, 0)), 1) ? (p = new Nh, Kh(Uh(p), O(new Md(sd(c, 4, 0)), 1)), Lh(Uh(p), l), a.unshift(p)) : f.data[3] = l);
        1 == n && (l && (f.data[3] = l), (c = gy(d)) ? Sh(f, c) : Gs(f) && Sh(f, "From the web"));
        for (l = m ? 1 : 0; l < Q(e, 2); l++)Sh(f, Id(new Fd(sd(e, 2, l))));
        Id(new Fd(e.data[4])) && (f.data[20] = Id(new Fd(e.data[4])));
        if (b = Ls(b)) m = new iy, m.data[0] = "Image capture: " + b, k.unshift(m);
        od(g, 11);
        nb(k,
            function (a) {
                U(new iy(rd(g, 11)), a)
            });
        od(f, 18);
        nb(a, function (a) {
            U(new Nh(rd(f, 18)), a)
        })
    }

    function my(a) {
        var b = Id(new Fd(Yg(a).data[5])) || Id(new Fd(Yg(a).data[6])) || Id(new Fd(Yg(a).data[7]));
        if (b)return b;
        for (var c = 0; c < Q(a, 5); c++)for (var d = $g(a, c), e = 0; e < Q(d, 9); e++) {
            var f = new Kd(sd(d, 9, e));
            if ((b = Id(new Fd(f.data[2]))) && !K(f, 1))return b
        }
        return null
    }

    function ly(a) {
        var b = new iy, c = Id(Nd(a)) || 1 == L(a, 3) && "From a Google User" || "";
        K(a, 2) ? (b.data[2] = O(a, 2), b.data[5] = c) : c && (b.data[0] = c);
        K(a, 1) && (b.data[1] = O(a, 1));
        return b
    }

    function ky(a) {
        var b = new Nh, c = Id(Nd(a)) || 1 == L(a, 3) && "From a Google User" || "";
        K(a, 1) ? (c && Lh(Uh(b), c), Kh(Uh(b), O(a, 1)), K(a, 2) && (Uh(b).data[2] = O(a, 2))) : c && (b.data[0] = c);
        return b
    };
    function ny(a, b) {
        return a === b
    };
    function oy(a, b, c) {
        this.C = a;
        this.F = b;
        this.D = c;
        this.A = !1;
        this.B = null
    }

    var py = 1E5;

    function qy(a, b) {
        if (!a.A) {
            var c = a.F;
            !1 === (a.D ? c.call(a.D, b) : c(b)) && a.cancel()
        }
    }

    q = oy.prototype;
    q.cancel = function () {
        this.A = !0
    };
    q.key = h("B");
    q.ra = function () {
        this.C && this.Wb();
        this.C = null
    };
    q.listen = function () {
        if (null == this.B && this.C) {
            this.A = !1;
            this.B = py++;
            var a = this.C;
            a.C || (a.C = {});
            a.C[this.key()] = this;
            (a = a.A.B) && a.A.push(this)
        }
    };
    q.Wb = function () {
        null != this.B && this.C && (ry(this.C, this.B), this.B = null)
    };
    function sy() {
        this.A = [];
        this.B = !1
    };
    function ty() {
        this.H = uy++;
        this.F = null;
        this.D = {};
        this.C = null;
        this.A = this;
        this.B = null
    }

    function vy() {
        this.B = 0;
        this.A = [];
        this.C = !1
    }

    var uy = 1E5;

    function wy(a, b) {
        if (a.C)for (var c in a.C)c = Number(c), qy(a.C[c], b);
        for (var d in a.D)d = Number(d), wy(a.D[d], b)
    }

    function ry(a, b) {
        if (null !== b && void 0 !== b && (a.C && delete a.C[b], a = a.A.B)) {
            var c = qb(a.A, function (a) {
                return a.key() == b
            });
            c && (c.cancel(), a.C = !0)
        }
    }

    function xy(a, b) {
        b !== a.F && (a.F && delete a.F.D[a.H], a.F = b, a.A.B = null, yy(a, a), b && b.A !== a && (b.D[a.H] = a, a.F = b, b.A.B = null, yy(a, b.A)))
    }

    function yy(a, b) {
        a.A = b;
        for (var c in a.D)c = Number(c), yy(a.D[c], b)
    }

    function zy(a) {
        if (a.B) {
            if (a.B.C && 0 == a.B.B && (a = a.B, a.C && 0 == a.B)) {
                for (var b = a.A, c = 0, d = b.length; c < d; c++)b[c].A && a.A.splice(c, 1), --c, --d;
                a.C = !1
            }
        } else b = new vy, Ay(a, b), a.B = b
    }

    function Ay(a, b) {
        if (a.C)for (var c in a.C)c = Number(c), b.A.push(a.C[c]);
        for (var d in a.D)d = Number(d), Ay(a.D[d], b)
    };
    function By(a, b, c) {
        ty.call(this);
        this.I = b;
        this.G = c
    }

    G(By, ty);
    function Cy(a, b, c) {
        return void 0 === b || void 0 === c ? void 0 === b && void 0 === c : a.I.call(void 0, b, c)
    }

    function Dy(a, b, c) {
        var d = !Cy(a, a.get(), b.get());
        xy(a, b);
        a.G = void 0;
        d && wy(a, c)
    }

    function Ey(a, b) {
        var c = a.F && x(a.get());
        xy(a, null);
        c && wy(a, b)
    }

    By.prototype.get = function () {
        return this.A.G
    };
    By.prototype.listen = function (a, b) {
        a = new oy(this, a, b);
        a.listen();
        return a
    };
    By.prototype.set = function (a, b) {
        var c = this.A;
        Cy(this, a, c.G) || (c.G = a, Fy(this, b))
    };
    function Fy(a, b) {
        zy(a.A);
        a = a.A.B;
        var c = a.A;
        a.B += 1;
        for (var d = 0, e = c.length; d < e; d++) {
            var f = c[d];
            f.A || qy(f, b)
        }
        --a.B
    };
    function Gy() {
        this.A = ny
    }

    function Hy() {
        return new Gy
    }

    function Iy(a, b) {
        return new By(0, a.A, b)
    }

    function Jy(a, b) {
        return new By(0, a.A, b)
    };
    var Ky = Hy();
    var Ly = Hy();
    var My = Hy();
    var Ny = Hy();
    var Oy = {};

    function Py(a, b, c, d) {
        var e = w.setTimeout(function () {
            var b = Oy[e];
            delete Oy[e];
            try {
                a.call(w, b.oa)
            } catch (g) {
                throw vj(g);
            }
            b.oa.done(b.qf)
        }, b);
        c.la(d);
        b = {};
        b.oa = c;
        b.qf = d;
        Oy[e] = b;
        return e
    }

    function Qy(a) {
        w.clearTimeout(a);
        var b = Oy[a];
        b && (b.oa.done(b.qf), delete Oy[a])
    };
    function Ry() {
        this.A = this.B = this.C = null
    }

    Ry.prototype.start = function (a, b, c) {
        this.A = a;
        this.C = b;
        this.B = Py(E(this.D, this), 200, c, "sceneContZoomStart")
    };
    Ry.prototype.D = function (a) {
        this.cancel(a)
    };
    Ry.prototype.cancel = function (a) {
        this.A && (this.A.cancel(a), this.C = this.B = this.A = null)
    };
    function Sy(a, b) {
        var c = !1;
        !b || nh(a).W() === b.W() && vh(nh(a)) === vh(b) || (c = !0, U(oh(a), b));
        b = 75;
        K(a, 3) && (b = Eb(ih(a), 1, 179));
        b != ih(a) && (a.data[3] = b, c = !0);
        K(lh(a), 1) || (mh(a).data[1] = 90, c = !0);
        a = kh(a);
        b = qh(a);
        b = 90 < b ? 90 : -90 > b ? -90 : b;
        b != qh(a) && (a.data[2] = b, c = !0);
        b = Ex(ph(a));
        b != ph(a) && (a.data[1] = b, c = !0);
        return c
    };
    function Ty(a, b, c, d, e) {
        this.A = a;
        this.A.B.L = !1;
        this.xa = null;
        this.X = !1;
        this.Va = this.Ua = this.Db = this.Xa = 0;
        this.Qb = e;
        this.Da = d;
        this.J = Iy(Ny);
        this.S = Jy(Ky);
        this.S.listen(this.Gk, this);
        this.N = Iy(Ky);
        this.N.listen(this.Hk, this);
        this.B = Jy(My);
        this.H = Jy(Ly, new hy);
        this.$ = new sf;
        this.$.data[0] = O(new bh(b.data[16]), 0);
        this.$.data[1] = O(new bh(b.data[16]), 1);
        this.M = new Ry;
        this.F = this.K = this.D = null;
        this.O = [];
        this.C = this.ia = this.U = null;
        this.aa = new Float64Array(2);
        this.ea = new Float64Array(2);
        this.Ma = F();
        this.Y = !1;
        this.ja = !0;
        this.Rb = !1;
        this.wc = nd(b, 88);
        this.fa = !0;
        this.L = null;
        this.G = this;
        this.na = this.A;
        this.P = this;
        this.I = this;
        this.za = null;
        this.Fb = new ey(4E3, E(this.Qk, this), "inactivity")
    }

    var Uy = new gh, Vy = new Float64Array(2), Wy = xl(), Xy = xl();
    q = Ty.prototype;
    q.Fg = function (a, b) {
        Yy(this.A, K(b, 8) ? new Ts(b.data[8]) : null)
    };
    q.nf = function (a, b) {
        Dy(a, this.H, b)
    };
    q.Jc = function (a, b) {
        b = Sy(a, b || void 0);
        a = Zy(a);
        return b || a
    };
    function Zy(a) {
        var b = !1, c = ih(a), d = Eb(c, 15, 90);
        d !== c && (b = !0, a.data[3] = d);
        return b
    }

    q.Gg = function (a, b, c, d, e) {
        if (this.F)return a && b ? (d = new eh, U(d, a), this.Jc(d, nh(this.U), c.B), d = td(b, this.ia) && td(d, this.U)) : d = !1, d && this.O.push(e), d;
        var f = this.S.get(), g = this.B.get();
        if (b && 1 === Xs(b) && !Ms(Ys(b), Ys(g)) && 2 === c.A)return !1;
        if (!b || Xs(b) == Xs(g))return $y(this, a, b, c, d, e), !0;
        if (c = 2 != c.A) c = this.xa, c = !!c.Db.get() && !c.Da.get();
        return c && b && wx(b) ? (az(this, d), a = a || f, b = b || g, g = this.J.get(), od(a, 1), bz(this, d), cz(g, a, b, d, e), !0) : !1
    };
    function $y(a, b, c, d, e, f) {
        var g = a.S.get(), k = a.B.get();
        az(a, e);
        var l;
        if (l = c) l = c, l = !(xx(k) && Xs(k) == Xs(l) && (K(k, 4) && K(l, 4) ? Ms(Ys(k), Ys(l)) : tx(k, l)));
        if (l || b) {
            l = new eh;
            b && (U(l, b), a.Jc(l, nh(g), d.B));
            b || (l = g);
            if (!c || tx(k, c)) {
                if (2 === d.A) {
                    U(g, l);
                    Fy(a.S, e);
                    f(e);
                    return
                }
                c || (c = k)
            }
            b = null;
            k && K(k, 4) && (b = Ys(k));
            k = new Mh;
            U(k, Ys(c));
            b && Ms(b, k) && (Hx(a.A, k, e), dz(a, k, e));
            g ? (g = jh(g), im(ph(g), qh(g), rh(g), Wy)) : Wy[0] = Wy[1] = Wy[2] = 0;
            g = jh(l);
            im(ph(g), qh(g), rh(g), Xy);
            g = Math.sqrt(Gl(Wy, Xy));
            ez(a, l, c, 2 == d.A || 800 < g, f, e)
        } else U(a.B.get(),
            c), fz(a), Fy(a.B, e), f(e)
    }

    q.bl = function (a) {
        this.D = null;
        a.ta("thp1")
    };
    q.Gc = da(!0);
    q.Ic = function (a, b, c, d, e) {
        if (this.fa) {
            var f = this.S.get(), g = this.J.get();
            if (0 !== a && !this.D && !this.F) {
                b.Xc("zoom");
                var k = ih(f);
                a = 0 < a ? 0 : 1;
                var l = 0 === a ? 15 : 90;
                c = x(c) ? c : nh(f).W() / 2;
                d = x(d) ? d : vh(nh(f)) / 2;
                e ? this.M.A ? (g = this.M, g.C === a ? (Qy(g.B), g.B = Py(E(g.D, g), 200, b, "sceneContZoomTickle")) : g.cancel(b)) : (e = l, e !== k && (f = new Wx(f, e, c, d), g = gz(g, f, b, E(this.Og, this)), this.M.start(g, a, b))) : (this.M.cancel(b), e = 0 === a ? k / 2 : 2 * k, e = 0 === a ? Math.max(l, e) : Math.min(l, e), 10 >= Math.abs(e - l) && (e = l), e !== k && (f = new Wx(f, e, c, d), this.K = gz(g,
                        f, b, E(this.Og, this))))
            }
        }
    };
    q.Hd = function (a, b) {
        if (this.fa) {
            var c = this.S.get(), d = ih(c), d = d * Math.pow(2, -a);
            c.data[3] = d;
            Zy(c) && Fy(this.S, b);
            if (a = this.B.get()) d = new eh, U(d, c), Xo(this, "user-input-event", b, {
                type: "zoom",
                S: d,
                contentType: Xs(a)
            })
        }
    };
    q.Og = function (a) {
        this.K = null;
        var b = this.S.get(), c = this.B.get();
        if (b && c) {
            var d = new eh;
            U(d, b);
            Xo(this, "user-input-event", a, {type: "zoom", S: d, contentType: Xs(c)})
        }
    };
    function hz(a, b, c, d) {
        var e = d.event();
        e && iz(a, e);
        jz(a.A, b, c, d);
        a.A.D && (b = a.A, b.D && b.A.B() && b.A.A().K(), a.Fb.A(), a.Fb.start(d))
    }

    q.Rg = function (a, b) {
        iz(this, a);
        jz(this.A, a.x, a.y, b);
        this.D && (this.D.cancel(b), b.ta("thp1"));
        var c, d = this.A;
        c = a.x;
        a = a.y;
        if (d.M)a:{
            for (var d = d.O, e = d.F.O, f = 0; f < d.C.length; f++) {
                var g = kz;
                Kl(g, d.F.$);
                var k;
                b:{
                    k = d.C[f].shape;
                    var l = c, m = a, n = e, p = -Infinity, r = Infinity, u = -Infinity, t = Infinity;
                    if (lz(k)) k = !1; else {
                        Rl(g, mz(k), g);
                        for (var v = 0; v < k.A.length / 3; v++) {
                            nz[0] = k.A[3 * v + 0];
                            nz[1] = k.A[3 * v + 1];
                            nz[2] = k.A[3 * v + 2];
                            nz[3] = 1;
                            Vl(g, nz, nz);
                            if (0 > nz[3]) {
                                k = !1;
                                break b
                            }
                            Cl(nz, 1 / nz[3], nz);
                            Tl(n, nz, nz);
                            nz[0] < r && (r = nz[0]);
                            nz[1] < t && (t =
                                nz[1]);
                            nz[0] > p && (p = nz[0]);
                            nz[1] > u && (u = nz[1])
                        }
                        k = l <= p && l >= r && m <= u && m >= t ? !0 : !1
                    }
                }
                if (k) {
                    c = d.C[f].target;
                    break a
                }
            }
            c = null
        } else c = null;
        c && oz(this, c, b)
    };
    q.Ug = function (a, b) {
        iz(this, a);
        jz(this.A, a.x, a.y, b)
    };
    function pz(a, b) {
        a.A.F.$d(Vy);
        return Eb(b, Vy[0], Vy[1])
    }

    q.Ve = function (a, b) {
        iz(this, a);
        if (this.X) {
            qz(this, a.x, a.y);
            var c = this.S.get(), d = nh(c).W(), e = 1 / Math.tan(Jb(ih(c) / 2)), f = vh(nh(c)) / 2, d = d / 2, d = Kb(Math.atan2((a.x - d) / f, e) - Math.atan2((this.Xa - d) / f, e));
            a = pz(this, this.Va + Kb(Math.atan2((a.y - f) / f, e) - Math.atan2((this.Db - f) / f, e)));
            e = Hb(this.Ua - d);
            mh(c).data[1] = a;
            mh(c).data[0] = e;
            Fy(this.S, b)
        } else jz(this.A, a.x, a.y, b)
    };
    q.Ue = function (a, b) {
        iz(this, a);
        b.Xc("pan");
        this.X = !0;
        this.A.D && rz(this.Qb, new sx(this.A, !1), 100);
        this.Xa = a.x;
        this.Db = a.y;
        this.Ua = th(lh(this.S.get()));
        this.Va = M(lh(this.S.get()), 1);
        b = this.ea;
        var c = a.y;
        b[0] = a.x;
        b[1] = c;
        a = this.aa;
        a[0] = 0;
        a[1] = 0;
        this.Ma = F()
    };
    q.Sg = function (a, b) {
        iz(this, a);
        if (!this.F) {
            var c = this.S.get();
            qz(this, a.x, a.y);
            if (this.X) {
                var d = -1 * this.aa[0], e = this.aa[1];
                if (.25 < Math.sqrt(d * d + e * e)) {
                    a = this.J.get();
                    var f = lh(c), e = M(f, 1) + 10 * e, e = pz(this, e);
                    Uy.data[1] = e;
                    Uy.data[0] = th(f) + 10 * d;
                    d = new Vx(c, Uy);
                    b.ta("thp0");
                    this.D = gz(a, d, b, E(this.bl, this))
                }
            }
            this.X = !1;
            this.A.D && rz(this.Qb, new sx(this.A, !0), 100);
            if (a = this.B.get()) d = new eh, U(d, c), Xo(this, "user-input-event", b, {
                type: "rotate",
                S: d,
                contentType: Xs(a)
            })
        }
    };
    var sz = {touch: !0, pen: !0};

    function iz(a, b) {
        b = !(b && ("touchstart" === b.type || "touchmove" === b.type || "touchend" === b.type || "touchcancel" === b.type || sz[b.pointerType])) && a.ja && !tz(a.A, b.x, b.y);
        a.A.B.L = b
    }

    function qz(a, b, c) {
        var d = F(), e = d - a.Ma;
        if (0 < e) {
            var f = a.aa, g = c - a.ea[1], k = Math.exp(-e / 32);
            f[0] = k * f[0] + (1 - k) * (b - a.ea[0]) / e;
            f[1] = k * f[1] + (1 - k) * g / e
        }
        e = a.ea;
        e[0] = b;
        e[1] = c;
        a.Ma = d
    }

    q = Ty.prototype;
    q.Te = function (a, b) {
        return this.F && this.F.A || this.K && this.K.A || this.D && this.D.A || this.C && this.C.A ? !1 : tz(this.A, a, b) ? !0 : this.ja ? !!this.A.B.B : !1
    };
    q.Mb = ba("ja");
    q.Tg = function (a, b, c) {
        return c
    };
    q.Se = function (a, b) {
        iz(this, a);
        if (this.Te(a.x, a.y, b) && this.A.B && (jz(this.A, a.x, a.y, b), !tz(this.A, a.x, a.y))) {
            var c = new Mh;
            U(c, this.A.B.B);
            var d = uz(this.A.B);
            if (c) {
                var e = this;
                vz(this);
                this.L = wz(this.A, c, function (a, b, k, l) {
                    a && (U(c, l), b && U(kh(Rh(c)), jh(b)), xz(e, c, d, k), yz(e, c))
                }, b)
            }
        }
    };
    function yz(a, b, c, d) {
        var e = O(b, 9);
        b = O(b, 10);
        e && b && a.Da.F(e, b, Zx, void 0, !0, c, d)
    }

    function oz(a, b, c) {
        c.pb("scene", "move_camera");
        vz(a);
        a.L = wz(a.A, b, function (c, e, f, g) {
            c && (U(b, g), od(Rh(b), 1), e && U(kh(Rh(b)), jh(e)), xz(a, b, null, f), yz(a, b, 4))
        }, c)
    }

    function vz(a) {
        a.L && (a.L.A(), a.L = null)
    }

    function zz(a, b, c, d) {
        a.C && a.C.cancel(c);
        a.D && a.D.cancel(c);
        var e = a.S.get(), f = th(lh(e)), g = Az(a.A, (b ? f : f + 180) % 360);
        b = a.B.get();
        var k, l;
        e && b && (k = new eh, l = Xs(b));
        g && (c.pb("scene", "move_camera"), vz(a), a.L = wz(a.A, g, function (b, c, e, f) {
            b && (U(g, f), c && U(kh(Rh(g)), jh(c)), U(mh(Rh(g)), lh(a.S.get())), xz(a, g, null, e), yz(a, g, 24, d), x(k) && x(l) && Xo(a, "user-input-event", e, {
                type: "pan",
                S: k,
                contentType: l
            }))
        }, c))
    }

    function Bz(a, b, c, d) {
        if (!a.C && !a.F) {
            d.Xc("pan");
            a.D && a.D.cancel(d);
            var e = a.S.get(), f = a.J.get();
            c && d.ta("pan0");
            c = new Nx(e, b, c);
            a.C = gz(f, c, d, E(a.Rk, a, b))
        }
    }

    q.Rk = function (a, b) {
        this.C.G ? (this.C = null, b.ta("pan1")) : (this.C = null, Bz(this, a, !1, b));
        a = this.S.get();
        var c = this.B.get();
        if (a && c) {
            var d = new eh;
            U(d, a);
            Xo(this, "user-input-event", b, {type: "rotate", S: d, contentType: Xs(c)})
        }
    };
    q.Qg = function (a, b) {
        iz(this, a);
        this.Se(a, b)
    };
    function xz(a, b, c, d) {
        if (d.Dg("scene", "move_camera")) {
            var e = a.S.get(), f = Rh(b);
            c ? hp(f, c) : K(f, 1) || (c = mh(f), e ? U(c, lh(e)) : c.data[1] = 90);
            e = a.B.get();
            b = zx(b);
            U(new Ts(P(b, 8)), new Ts(e.data[8]));
            K(e, 7) && (b.data[7] = L(e, 7));
            ez(a, f, b, !1, C, d)
        }
    }

    function ez(a, b, c, d, e, f) {
        if (!(a.K || a.D || a.F || a.C) && a.Y) {
            var g = a.J.get();
            if (g) {
                var k = a.S.get();
                if (k) {
                    var l = a.B.get();
                    if (l) {
                        var m = Ys(l), n = Ys(c), p = ys(b);
                        a.Rb ? K(p, 3) || (p.data[3] = ih(k)) : p.data[3] = 75;
                        var m = Cz(a.A, m, f), r = Cz(a.A, n, f);
                        null != m && null != r && (m = rh(jh(b)) + (r - m), sh(kh(p), m));
                        d = new Fx(k, l, p, c, d, a.A, f);
                        a.U = b;
                        a.ia = c;
                        f.ta("c2g0");
                        a.O.push(e);
                        a.F = gz(g, d, f, function (b) {
                            b.ta("c2g1");
                            a.F = null;
                            a.U = null;
                            a.ia = null;
                            dz(a, n, b);
                            for (var c = 0; c < a.O.length; c++)a.O[c](b);
                            a.O = []
                        })
                    }
                }
            }
        }
    }

    q.xb = function (a, b) {
        this.Y = !0;
        this.xa = a;
        Dz(a, this.A, b);
        this.A.xb(b);
        var c = this.B.get();
        a = this.S.get();
        od(Zs(c), 17);
        c = Zs(c);
        U(Rh(c), a);
        Hx(this.A, c, b);
        var d = Ez(this.A);
        d ? (U(Rh(d), a), dz(this, d, b)) : dz(this, c, b)
    };
    q.Wf = function (a) {
        this.Y = !1;
        az(this, a);
        vz(this);
        bz(this, a);
        var b = this.B.get();
        b && (Zs(b).data[3] = "", od(Zs(b), 17));
        Fz(this.A, a);
        this.xa = null
    };
    function az(a, b) {
        a.D && (a.D.cancel(b), a.D = null);
        a.K && (a.K.cancel(b), a.K = null);
        a.F && (a.F.cancel(b), a.F = null);
        a.C && (a.C.cancel(b), a.C = null);
        a.M.A && a.M.cancel(b)
    }

    q.Gk = function (a) {
        var b = this.S.get();
        b && Gz(this.A, b, a)
    };
    q.Hk = function (a) {
        if (this.S.get()) {
            if (Ez(this.A)) {
                this.N.get() && (this.H.get(), Hz(this), Fy(this.H, a));
                var b;
                b = this.A;
                b = b.C ? b.C.ha() : null;
                var c = this.S.get();
                c && K(c, 0) && K(jh(c), 0) && b && K(b, 0) && K(jh(b), 0) && .1 < Math.abs(rh(jh(c)) - rh(jh(b))) && (c = new Cx, c.A = 2, $y(this, b, null, c, a, C))
            }
            a = this.A;
            a.aa = !1;
            jp(a.G)
        }
    };
    function fz(a) {
        var b = a.B.get();
        b && Yy(a.A, K(b, 8) ? new Ts(b.data[8]) : null)
    }

    function dz(a, b, c) {
        var d = new Je;
        U(d, Vg(b.da()));
        vz(a);
        a.L = wz(a.A, b, function (c, f, g, k) {
            if (a.Y)if (c) {
                c = new Mh;
                U(c, k);
                f && (U(kh(Rh(c)), jh(f)), U(mh(Rh(c)), lh(f)));
                Iz(a, c, g);
                k = k.da();
                var e = a.$;
                f = {Fe: new hy, ed: new Mh};
                U(f.ed, c);
                if (k && (K(k, 6) || K(k, 4) || K(k, 3) || K(k, 9) || K(k, 1) || K(k, 2) || K(k, 8) || K(k, 0) || K(k, 7))) {
                    var m;
                    if (c && K(c, 11)) {
                        m = new kr(O(new yh(c.data[11]), 0));
                        var n = m.A.get("cid");
                        n || (n = (new kr(pr(m.A.toString()))).A.get("cid"));
                        m = n ? n : null
                    } else m = null;
                    n = null;
                    0 < Q(c, 15) && 0 == L(new xh(Th(c).data[0]), 8) && (n = O(new xh(Th(c).data[0]),
                        0));
                    od(f.ed, 3);
                    od(f.ed, 17);
                    jy(f, k, m, n, e)
                }
                k = a.B.get();
                e = a.H.get();
                c = Zs(k);
                U(c, f.ed);
                f.Fe && U(e, f.Fe);
                yx(zx(c), k);
                Hz(a);
                if (a.wc) {
                    f = a.A;
                    if (k = f.C) Ms(Ys(k.Ea()), c), k.Jb(c), Jz(f, g);
                    Fy(a.S, g)
                }
                fz(a);
                f = new sy;
                c = a.B;
                zy(c.A);
                f.B || f.A.push.apply(f.A, c.A.B.A);
                c = a.H;
                zy(c.A);
                f.B || f.A.push.apply(f.A, c.A.B.A);
                f.B = !0;
                c = f.A;
                k = 0;
                for (e = c.length; k < e; k++)m = c[k], m.A || qy(m, g);
                f.A = [];
                f.B = !1
            } else f = k.da(), td(d, Vg(f)) ? f = !1 : (c = a.B.get()) ? (k = a.A, K(d, 1) && K(f, 1) && !td(d, Vg(f)) && (e = d.sa()) && !k.ea[e] && (m = new Mh, U(Qh(m), f), k.ea[e] = m),
                        c = Zs(c), U(Qh(c), f), Iz(a, c, g), Hx(a.A, c, g), dz(a, c, g), f = !0) : f = !1, f || (f = new Mh, U(f, b), od(f, 0), K(f, 21) && od(Qh(f), 1), Iz(a, f, g))
        }, c)
    }

    function Hz(a) {
        var b = a.N.get(), c = a.B.get(), d = a.H.get();
        b && d && c && (a = fy(b, Ys(c).da(), null, null, a.$), Kh(new yh(P(d, 12)), a))
    }

    function bz(a, b) {
        var c = a.H.get();
        c.data[0] = "";
        c.data[2] = "";
        Fy(a.H, b)
    }

    function Iz(a, b, c) {
        var d = a.S.get();
        if (d) {
            var e = a.B.get();
            yx(zx(b), e) && (fz(a), Fy(a.B, c));
            var e = !1, f = jh(b.ha());
            if (qh(jh(d)) !== qh(f) || ph(jh(d)) !== ph(f) || rh(jh(d)) !== rh(f)) U(kh(d), f), e = !0;
            f = b.da();
            0 < Q(f, 5) && K($g(f, 0), 10) && (f = new ie($g(f, 0).data[10]), Js(f, d) && (e = !0));
            e && Fy(a.S, c);
            K(b, 0) && a.N.get() && (a.H.get(), Hz(a), Fy(a.H, c))
        }
    }

    q.Qk = function (a) {
        var b = this.A;
        b.D && b.A.B() && b.A.A().D();
        Xo(this, "user-input-event", a, {type: "annotationshidden"})
    };
    q.Hg = function (a, b) {
        var c = this.S.get();
        U(oh(c), a);
        Fy(this.S, b);
        if (a = this.B.get()) {
            var d = new eh;
            U(d, c);
            Xo(this, "user-input-event", b, {type: "resize", S: d, contentType: Xs(a)})
        }
    };
    q.Ge = da("pa");
    function Kz(a, b, c, d, e, f, g) {
        c.load("pa", b, function (b) {
            a(new Ty(b, d, 0, f, g))
        })
    };
    function Lz(a, b) {
        V.call(this, "PNI", wb(arguments))
    }

    G(Lz, V);
    function Mz(a, b, c, d) {
        b = new Vu(c, d);
        a(b)
    };
    function Nz(a, b, c, d, e, f) {
        V.call(this, "SCPR", wb(arguments))
    }

    G(Nz, V);
    function Oz() {
        this.C = [0, 0];
        this.A = [0, 0];
        this.G = 0;
        this.F = this.B = null;
        this.D = {}
    }

    function Pz(a, b, c, d, e, f, g) {
        this.handle = a;
        this.item = b;
        this.D = c;
        this.F = d;
        this.A = null;
        this.next = e;
        this.B = f;
        this.C = g
    }

    q = Oz.prototype;
    q.add = function (a, b, c, d, e) {
        c = c || 0;
        d = d || 0;
        if (c > this.C[0] || d > this.C[1])return -1;
        var f = this.G++;
        a = new Pz(f, a, b, e || null, this.B, c, d);
        this.D[f] = a;
        this.B && (this.B.A = a);
        this.B = a;
        this.A[0] += c;
        this.A[1] += d;
        null == this.F && (this.F = a);
        Qz(this);
        return f
    };
    q.get = function (a) {
        return (a = this.D[a]) ? a.item : void 0
    };
    function Qz(a) {
        for (var b = a.F; b && (a.A[0] > a.C[0] || a.A[1] > a.C[1]);) {
            var c = b, b = b.A;
            if (a.A[0] > a.C[0] && 0 < c.B || a.A[1] > a.C[1] && 0 < c.C || 0 == c.B && 0 == c.C) c.D && c.D.call(c.F, c.handle, c.item, !1), a.remove(c.handle)
        }
    }

    q.remove = function (a) {
        var b = this.D[a];
        b && (b.A ? b.A.next = b.next : this.B = b.next, b.next ? b.next.A = b.A : this.F = b.A, b.A = b.next = b.item = null, b.handle = -1, delete this.D[a], this.A[0] -= b.B, this.A[1] -= b.C)
    };
    q.contains = function (a) {
        return a in this.D
    };
    q.clear = function () {
        for (; this.B;) {
            var a = this.B;
            a.D.call(a.F, a.handle, a.item, !0);
            this.remove(a.handle)
        }
        Object.keys(this.D)
    };
    function Rz() {
        ol.call(this);
        this.A = new Float32Array(0);
        this.D = [1, 1, 1, 1];
        this.C = null;
        this.B = new Sz;
        this.G = -1;
        this.F = null
    }

    G(Rz, ol);
    var nz = Hl();

    function Sz() {
        this.hidden = !1;
        this.A = Jl();
        Ql(this.A)
    }

    function Tz() {
        for (var a = new Rz, b = new Float32Array(150), c = 0; 50 > c; c++)b[3 * c + 0] = Math.sin(c / 50 * Math.PI * 2), b[3 * c + 1] = Math.cos(c / 50 * Math.PI * 2), b[3 * c + 2] = 0;
        a.A = b;
        return a
    }

    function Uz() {
        var a = new Rz;
        a.A = new Float32Array([-.5, .5, 0, .5, .5, 0, .5, -.5, 0, -.5, -.5, 0]);
        return a
    }

    Rz.prototype.Aa = function (a) {
        return null.Aa(a)
    };
    function Vz(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            Rl(mz(d), mz(a), mz(d));
            Wz(d);
            d.B = a.B
        }
    }

    function Xz(a, b) {
        a.D[0] = b[0];
        a.D[1] = b[1];
        a.D[2] = b[2];
        a.D[3] = b[3]
    }

    function lz(a) {
        return a.B.hidden || 0 == a.D[3] && (!a.C || 0 == a.C[3])
    }

    function mz(a) {
        return a.B.A
    }

    function Wz(a) {
        for (var b = xl(), c = mz(a), d = 0; d < a.A.length / 3; d++)b[0] = a.A[3 * d + 0], b[1] = a.A[3 * d + 1], b[2] = a.A[3 * d + 2], Tl(c, b, b), a.A[3 * d + 0] = b[0], a.A[3 * d + 1] = b[1], a.A[3 * d + 2] = b[2];
        Ql(mz(a))
    }

    function Yz(a, b, c, d) {
        Wl(mz(a), b, c, d);
        Sl(mz(a), mz(a))
    }

    Rz.prototype.scale = function (a, b, c) {
        Zl(mz(this), a, b, c)
    };
    function Zz(a, b) {
        Zl(mz(a), b, b, b)
    }

    Rz.prototype.translate = function (a, b, c) {
        Yl(mz(this), a, b, c)
    };
    Rz.prototype.rotate = function (a, b, c, d) {
        var e = mz(this), f = e[0], g = e[1], k = e[2], l = e[3], m = e[4], n = e[5], p = e[6], r = e[7], u = e[8], t = e[9], v = e[10], y = e[11], D = Math.cos(a), z = Math.sin(a), A = 1 - D;
        a = b * b * A + D;
        var B = b * c * A + d * z, R = b * d * A - c * z, N = b * c * A - d * z, H = c * c * A + D, T = c * d * A + b * z, S = b * d * A + c * z;
        b = c * d * A - b * z;
        d = d * d * A + D;
        e[0] = f * a + m * B + u * R;
        e[1] = g * a + n * B + t * R;
        e[2] = k * a + p * B + v * R;
        e[3] = l * a + r * B + y * R;
        e[4] = f * N + m * H + u * T;
        e[5] = g * N + n * H + t * T;
        e[6] = k * N + p * H + v * T;
        e[7] = l * N + r * H + y * T;
        e[8] = f * S + m * b + u * d;
        e[9] = g * S + n * b + t * d;
        e[10] = k * S + p * b + v * d;
        e[11] = l * S + r * b + y * d
    };
    function $z(a, b) {
        var c = a.A.length;
        a.F = b.createBuffer();
        a.G = aA(b.B, function () {
            var c = a.F;
            c && b.deleteBuffer(c);
            a.F = null
        }, c);
        b.bindBuffer(34962, a.F);
        b.bufferData(34962, a.A, 35044)
    }

    function bA(a, b) {
        cA(b.B, a.G);
        return a.F
    };
    function dA(a) {
        var b = a[0], c = a[1], d = a[2];
        a = a[3];
        return 0 >= a | (b > +a) << 1 | (b < -a) << 2 | (c > +a) << 3 | (c < -a) << 4 | (d > +a) << 5 | (d < -a) << 6
    };
    function eA(a, b) {
        this.name = a;
        this.A = b
    }

    function fA(a) {
        return gA(a.A).getAttribLocation(a.name)
    }

    eA.prototype.vertexAttribPointer = function (a, b, c, d, e, f) {
        var g = this.A.getContext(), k = fA(this);
        g.vertexAttribPointer(k, a, b, c, d, e);
        f && g.enableVertexAttribArray(k)
    };
    function hA() {
        this.L = !1;
        this.K = this.C = null
    }

    hA.prototype.xa = h("L");
    hA.prototype.ra = function () {
        if (!this.L) {
            this.L = !0;
            this.ga();
            if (this.C) {
                for (var a = 0; a < this.C.length; ++a)this.C[a].ra();
                this.C = null
            }
            if (this.K) {
                for (a = 0; a < this.K.length; ++a)this.K[a]();
                this.K = null
            }
        }
    };
    hA.prototype.ga = aa();
    function iA(a, b, c) {
        hA.call(this);
        this.A = a;
        this.D = null;
        this.I = b;
        this.G = c;
        a = this.F = new vq;
        this.C || (this.C = []);
        this.C.push(a);
        xq(this.F, this.A.C, "webglcontextrestored", this.H, !1, this)
    }

    G(iA, hA);
    iA.prototype.H = function () {
        this.D = null
    };
    function jA(a, b, c) {
        c = a.createShader(c);
        a.shaderSource(c, b);
        a.compileShader(c);
        return c
    }

    iA.prototype.getContext = h("A");
    function gA(a) {
        if (!a.D) {
            var b = jA(a.A, a.I, 35633), c = jA(a.A, a.G, 35632);
            a.D = a.A.createProgram();
            a.D.attachShader(b);
            a.D.attachShader(c);
            a.D.de()
        }
        return a.D
    }

    function kA(a) {
        a.A.useProgram(gA(a))
    };
    function lA(a, b) {
        this.name = a;
        this.A = b
    }

    function mA(a) {
        return gA(a.A).getUniformLocation(a.name)
    }

    function nA(a, b) {
        lA.call(this, a, b)
    }

    G(nA, lA);
    nA.prototype.set = function (a) {
        this.A.getContext().uniform1i(mA(this), a)
    };
    function oA(a, b) {
        lA.call(this, a, b)
    }

    G(oA, lA);
    oA.prototype.set = function (a) {
        this.A.getContext().uniform1f(mA(this), a)
    };
    function pA(a, b) {
        lA.call(this, a, b)
    }

    G(pA, lA);
    pA.prototype.set = function (a, b) {
        this.A.getContext().uniform2f(mA(this), a, b)
    };
    function qA(a, b) {
        lA.call(this, a, b)
    }

    G(qA, lA);
    qA.prototype.set = function (a, b, c) {
        this.A.getContext().uniform3f(mA(this), a, b, c)
    };
    function rA(a, b) {
        lA.call(this, a, b)
    }

    G(rA, lA);
    rA.prototype.set = function (a, b, c, d) {
        this.A.getContext().uniform4f(mA(this), a, b, c, d)
    };
    function sA(a, b) {
        a.A.getContext().uniform4fv(mA(a), b)
    }

    function tA(a, b) {
        lA.call(this, a, b)
    }

    G(tA, lA);
    function uA(a, b) {
        a.A.getContext().uniformMatrix4fv(mA(a), !1, b)
    };
    function vA(a) {
        iA.call(this, a, "varying vec2 a;varying float b;uniform mat4 matrixClipFromModel;uniform vec2 modelToPixelScale,iconSize;attribute vec3 vert;uniform vec3 pivot;uniform float opacity;void main(){a=.5*vert.xy+.5;gl_Position=matrixClipFromModel*vec4(pivot,1);if(gl_Position.z<-gl_Position.w)b=0.;else b=opacity;gl_Position=vec4(gl_Position.x/gl_Position.w+vert.x*modelToPixelScale.x,gl_Position.y/gl_Position.w+vert.y*modelToPixelScale.y,0,1);}", "precision highp float;varying vec2 a;varying float b;uniform sampler2D iconSampler;void main(){if(b==0.)discard;gl_FragColor=texture2D(iconSampler,a);gl_FragColor.w*=b;}");
        this.B = new wA(this);
        this.attributes = new xA(this)
    }

    G(vA, iA);
    function wA(a) {
        this.B = new tA("matrixClipFromModel", a);
        this.C = new pA("modelToPixelScale", a);
        this.D = new qA("pivot", a);
        this.opacity = new oA("opacity", a);
        this.A = new nA("iconSampler", a)
    }

    function xA(a) {
        this.A = new eA("vert", a)
    };
    function yA(a, b) {
        b = ((b || new zA).A ? "#define  1\n" : "") + "";
        iA.call(this, a, b + "varying vec4 a;\n#ifdef ENABLE_TEXTURE\nvarying vec2 b;\n#endif\nuniform mat4 matrixClipFromModel;uniform vec4 color;attribute vec3 vert;\n#ifdef ENABLE_TEXTURE\nattribute vec2 aTexCoord;\n#endif\nvoid main(){a=color;\n#ifdef ENABLE_TEXTURE\nb=aTexCoord;\n#endif\ngl_Position=matrixClipFromModel*vec4(vert,1);}", b + "precision highp float;varying vec4 a;\n#ifdef ENABLE_TEXTURE\nvarying vec2 b;\n#endif\n#ifdef ENABLE_TEXTURE\nuniform sampler2D texture;uniform float textureBlendFactor;\n#endif\nvoid main(){gl_FragColor=a;\n#ifdef ENABLE_TEXTURE\ngl_FragColor.rgb=mix(gl_FragColor.rgb,texture2D(texture,b).rgb,textureBlendFactor);\n#endif\n}");
        this.B = new AA(this);
        this.attributes = new BA(this)
    }

    G(yA, iA);
    function AA(a) {
        this.A = new tA("matrixClipFromModel", a);
        this.color = new rA("color", a);
        this.B = new oA("textureBlendFactor", a)
    }

    function BA(a) {
        this.A = new eA("vert", a);
        this.B = new eA("aTexCoord", a)
    }

    function zA() {
        this.A = CA[0]
    }

    var CA = [0, 1];

    function DA() {
    }

    ra(DA);
    DA.prototype.A = 0;
    function EA(a) {
        ol.call(this);
        this.G = a || Nj();
        this.va = null;
        this.Ka = !1;
        this.D = null;
        this.J = void 0;
        this.L = this.M = this.I = null
    }

    G(EA, ol);
    q = EA.prototype;
    q.bk = DA.hg();
    q.sa = function () {
        return this.va || (this.va = ":" + (this.bk.A++).toString(36))
    };
    q.Z = h("D");
    q.bf = function (a) {
        if (this.I && this.I != a)throw Error("Method not supported");
        EA.V.bf.call(this, a)
    };
    q.vc = function () {
        this.D = this.G.A.createElement("DIV")
    };
    q.Nb = function () {
        this.Ka = !0;
        FA(this, function (a) {
            !a.Ka && a.Z() && a.Nb()
        })
    };
    q.Oc = function () {
        FA(this, function (a) {
            a.Ka && a.Oc()
        });
        this.J && zq(this.J);
        this.Ka = !1
    };
    q.ga = function () {
        this.Ka && this.Oc();
        this.J && (this.J.ra(), delete this.J);
        FA(this, function (a) {
            a.ra()
        });
        this.D && ek(this.D);
        this.I = this.D = this.L = this.M = null;
        EA.V.ga.call(this)
    };
    function FA(a, b) {
        a.M && nb(a.M, b, void 0)
    }

    q.removeChild = function (a, b) {
        if (a) {
            var c = wa(a) ? a : a.sa();
            this.L && c ? (a = this.L, a = (null !== a && c in a ? a[c] : void 0) || null) : a = null;
            if (c && a) {
                var d = this.L;
                c in d && delete d[c];
                tb(this.M, a);
                b && (a.Oc(), a.D && ek(a.D));
                b = a;
                if (null == b)throw Error("Unable to set parent component");
                b.I = null;
                EA.V.bf.call(b, null)
            }
        }
        if (!a)throw Error("Child is not in parent component");
        return a
    };
    function GA() {
        this.size = 80;
        this.A = "Arial"
    };
    function HA() {
        this.Sa = [];
        this.ca = [];
        this.yb = []
    }

    HA.prototype.qc = null;
    HA.prototype.rb = null;
    HA.prototype.Ed = !0;
    var IA = [2, 2, 6, 6, 0];
    q = HA.prototype;
    q.clear = function () {
        this.Sa.length = 0;
        this.ca.length = 0;
        this.yb.length = 0;
        delete this.qc;
        delete this.rb;
        delete this.Ed;
        return this
    };
    q.vg = function (a, b) {
        0 == lb(this.Sa) ? this.yb.length -= 2 : (this.Sa.push(0), this.ca.push(1));
        this.yb.push(a, b);
        this.rb = this.qc = [a, b];
        return this
    };
    q.ug = function (a) {
        var b = lb(this.Sa);
        if (null == b)throw Error("Path cannot start with lineTo");
        1 != b && (this.Sa.push(1), this.ca.push(0));
        for (b = 0; b < arguments.length; b += 2) {
            var c = arguments[b], d = arguments[b + 1];
            this.yb.push(c, d)
        }
        this.ca[this.ca.length - 1] += b / 2;
        this.rb = [c, d];
        return this
    };
    q.Vf = function (a) {
        var b = lb(this.Sa);
        if (null == b)throw Error("Path cannot start with curve");
        2 != b && (this.Sa.push(2), this.ca.push(0));
        for (b = 0; b < arguments.length; b += 6) {
            var c = arguments[b + 4], d = arguments[b + 5];
            this.yb.push(arguments[b], arguments[b + 1], arguments[b + 2], arguments[b + 3], c, d)
        }
        this.ca[this.ca.length - 1] += b / 6;
        this.rb = [c, d];
        return this
    };
    q.close = function () {
        var a = lb(this.Sa);
        if (null == a)throw Error("Path cannot start with close");
        4 != a && (this.Sa.push(4), this.ca.push(1), this.rb = this.qc);
        return this
    };
    q.ti = function (a, b, c, d) {
        var e = this.rb[0] - a * Math.cos(Jb(c)), f = this.rb[1] - b * Math.sin(Jb(c)), g = Jb(d);
        d = Math.ceil(Math.abs(g) / Math.PI * 2);
        g /= d;
        c = Jb(c);
        for (var k = 0; k < d; k++) {
            var l = Math.cos(c), m = Math.sin(c), n = 4 / 3 * Math.sin(g / 2) / (1 + Math.cos(g / 2)), p = e + (l - n * m) * a, r = f + (m + n * l) * b;
            c += g;
            l = Math.cos(c);
            m = Math.sin(c);
            this.Vf(p, r, e + (l + n * m) * a, f + (m - n * l) * b, e + l * a, f + m * b)
        }
        return this
    };
    function JA(a, b) {
        for (var c = a.yb, d = 0, e = 0, f = a.Sa.length; e < f; e++) {
            var g = a.Sa[e], k = IA[g] * a.ca[e];
            b(g, c.slice(d, d + k));
            d += k
        }
    }

    function KA(a) {
        var b = new a.constructor;
        b.Sa = a.Sa.concat();
        b.ca = a.ca.concat();
        b.yb = a.yb.concat();
        b.qc = a.qc && a.qc.concat();
        b.rb = a.rb && a.rb.concat();
        b.Ed = a.Ed;
        return b
    }

    var LA = {};
    LA[0] = HA.prototype.vg;
    LA[1] = HA.prototype.ug;
    LA[4] = HA.prototype.close;
    LA[2] = HA.prototype.Vf;
    LA[3] = HA.prototype.ti;
    function MA(a) {
        if (a.Ed)return KA(a);
        var b = new HA;
        JA(a, function (a, d) {
            LA[a].apply(b, d)
        });
        return b
    }

    HA.prototype.Pa = function () {
        return 0 == this.Sa.length
    };
    function NA(a, b, c, d, e) {
        EA.call(this, e);
        this.width = a;
        this.height = b;
        this.F = c || null;
        this.H = d || null
    }

    G(NA, EA);
    NA.prototype.B = null;
    NA.prototype.gc = function (a, b) {
        this.F = a;
        this.H = b
    };
    function OA(a) {
        return a.F ? new Kj(a.F, a.H) : a.Wa()
    }

    NA.prototype.Wa = function () {
        return this.Ka ? bo(this.Z()) : xa(this.width) && xa(this.height) ? new Kj(this.width, this.height) : null
    };
    function PA(a) {
        var b = a.Wa();
        return b ? b.width / OA(a).width : 0
    }

    function QA(a, b, c, d, e, f) {
        c += d.size / 2;
        return a.Ee(b, 0, c, 1, c, "left", d, e, f, void 0)
    };
    function RA(a, b, c, d, e, f) {
        if (6 == arguments.length) SA(this, a, b, c, d, e, f); else {
            if (0 != arguments.length)throw Error("Insufficient matrix parameters");
            this.B = this.F = 1;
            this.A = this.C = this.D = this.G = 0
        }
    }

    function TA(a) {
        return new RA(a.B, a.A, a.C, a.F, a.D, a.G)
    }

    function SA(a, b, c, d, e, f, g) {
        if (!(xa(b) && xa(c) && xa(d) && xa(e) && xa(f) && xa(g)))throw Error("Invalid transform parameters");
        a.B = b;
        a.A = c;
        a.C = d;
        a.F = e;
        a.D = f;
        a.G = g;
        return a
    }

    RA.prototype.scale = function (a, b) {
        this.B *= a;
        this.A *= a;
        this.C *= b;
        this.F *= b;
        return this
    };
    RA.prototype.translate = function (a, b) {
        this.D += a * this.B + b * this.C;
        this.G += a * this.A + b * this.F;
        return this
    };
    RA.prototype.rotate = function (a, b, c) {
        var d = new RA, e = Math.cos(a);
        a = Math.sin(a);
        b = SA(d, e, a, -a, e, b - b * e + c * a, c - b * a - c * e);
        c = this.B;
        d = this.C;
        this.B = b.B * c + b.A * d;
        this.C = b.C * c + b.F * d;
        this.D += b.D * c + b.G * d;
        c = this.A;
        d = this.F;
        this.A = b.B * c + b.A * d;
        this.F = b.C * c + b.F * d;
        this.G += b.D * c + b.G * d;
        return this
    };
    RA.prototype.toString = function () {
        return "matrix(" + [this.B, this.A, this.C, this.F, this.D, this.G].join() + ")"
    };
    function UA(a, b) {
        ol.call(this);
        this.Pb = a;
        this.fb = b;
        this[Ek] = !1
    }

    G(UA, ol);
    q = UA.prototype;
    q.fb = null;
    q.Pb = null;
    q.Xd = null;
    q.Z = h("Pb");
    q.addEventListener = function (a, b, c, d) {
        al(this.Pb, a, b, c, d)
    };
    q.removeEventListener = function (a, b, c, d) {
        il(this.Pb, a, b, c, d)
    };
    q.ga = function () {
        UA.V.ga.call(this);
        kl(this.Pb)
    };
    function VA(a, b, c, d) {
        UA.call(this, a, b);
        this.th(c);
        this.sh(d)
    }

    G(VA, UA);
    q = VA.prototype;
    q.fill = null;
    q.ff = null;
    q.sh = function (a) {
        this.fill = a;
        this.fb.Ze(this, a)
    };
    q.Wi = h("fill");
    q.th = function (a) {
        this.ff = a;
        this.fb.af(this, a)
    };
    q.Mj = h("ff");
    function WA(a, b) {
        UA.call(this, a, b)
    }

    G(WA, UA);
    function XA(a, b) {
        UA.call(this, a, b)
    }

    G(XA, UA);
    function YA(a, b, c, d) {
        VA.call(this, a, b, c, d)
    }

    G(YA, VA);
    function ZA(a, b, c, d) {
        VA.call(this, a, b, c, d)
    }

    G(ZA, VA);
    function $A(a) {
        UA.call(this, null, a);
        this.A = []
    }

    G($A, WA);
    $A.prototype.clear = function () {
        this.A.length && (this.A.length = 0, aB(this.fb))
    };
    $A.prototype.appendChild = function (a) {
        this.A.push(a)
    };
    $A.prototype.B = function () {
        for (var a = 0, b = this.A.length; a < b; a++)bB(this.fb, this.A[a])
    };
    function cB(a, b, c, d, e) {
        VA.call(this, a, b, d, e);
        this.A(c)
    }

    G(cB, YA);
    cB.prototype.C = !1;
    cB.prototype.A = function (a) {
        this.D = a.Ed ? a : MA(a);
        this.C && aB(this.fb)
    };
    cB.prototype.B = function (a) {
        this.C = !0;
        a.beginPath();
        JA(this.D, function (b, c) {
            switch (b) {
                case 0:
                    a.moveTo(c[0], c[1]);
                    break;
                case 1:
                    for (b = 0; b < c.length; b += 2)a.lineTo(c[b], c[b + 1]);
                    break;
                case 2:
                    for (b = 0; b < c.length; b += 6)a.bezierCurveTo(c[b], c[b + 1], c[b + 2], c[b + 3], c[b + 4], c[b + 5]);
                    break;
                case 3:
                    throw Error("Canvas paths cannot contain arcs");
                case 4:
                    a.closePath()
            }
        })
    };
    function dB(a, b, c, d, e, f, g, k, l, m) {
        var n = Xj("DIV", {style: "display:table;position:absolute;padding:0;margin:0;border:0"});
        VA.call(this, n, a, l, m);
        this.C = b;
        this.D = c;
        this.I = d;
        this.F = e;
        this.J = f;
        this.G = g || "left";
        this.H = k;
        this.A = Xj("DIV", {style: "display:table-cell;padding: 0;margin: 0;border: 0"});
        c = this.D;
        k = this.F;
        d = this.I;
        e = this.J;
        l = this.G;
        f = this.H;
        b = this.Z().style;
        g = PA(this.fb);
        m = this.fb;
        var p = m.Wa();
        m = p ? p.height / OA(m).height : 0;
        c == k ? (b.lineHeight = "90%", this.A.style.verticalAlign = "center" == l ? "middle" : "left" ==
                l ? d < e ? "top" : "bottom" : d < e ? "bottom" : "top", b.textAlign = "center", k = f.size * g, b.top = Math.round(Math.min(d, e) * m) + "px", b.left = Math.round((c - k / 2) * g) + "px", b.width = Math.round(k) + "px", b.height = Math.abs(d - e) * m + "px", b.fontSize = .6 * f.size * m + "pt") : (b.lineHeight = "100%", this.A.style.verticalAlign = "top", b.textAlign = l, b.top = Math.round(((d + e) / 2 - 2 * f.size / 3) * m) + "px", b.left = Math.round(c * g) + "px", b.width = Math.round(Math.abs(k - c) * g) + "px", b.height = "auto", b.fontSize = f.size * m + "pt");
        b.fontWeight = "normal";
        b.fontStyle = "normal";
        b.fontFamily =
            f.A;
        c = this.fill;
        b.color = c.bb() || c.cg();
        eB(this);
        a.Z().appendChild(n);
        n.appendChild(this.A)
    }

    G(dB, ZA);
    dB.prototype.sh = function (a) {
        this.fill = a;
        var b = this.Z();
        b && (b.style.color = a.bb() || a.cg())
    };
    dB.prototype.th = aa();
    dB.prototype.B = aa();
    function eB(a) {
        if (a.D == a.F) {
            var b = ob(a.C.split(""), function (a) {
                return Ma(a)
            }).join("<br>"), b = $i(yi("Concatenate escaped chars and <br>"), b);
            Mj(a.A, b)
        } else Mj(a.A, Qi(a.C))
    }

    function fB(a, b, c, d, e, f, g) {
        UA.call(this, a, b);
        this.F = c;
        this.G = d;
        this.C = e;
        this.A = f;
        this.I = g
    }

    G(fB, XA);
    fB.prototype.B = function (a) {
        this.D ? this.C && this.A && a.drawImage(this.D, this.F, this.G, this.C, this.A) : (a = new Image, a.onload = E(this.H, this, a), a.src = this.I)
    };
    fB.prototype.H = function (a) {
        this.D = a;
        aB(this.fb)
    };
    function gB() {
    };
    function hB(a, b) {
        this.B = a;
        this.A = null == b ? 1 : b
    }

    G(hB, gB);
    hB.prototype.bb = h("B");
    function iB(a, b, c, d, e) {
        NA.call(this, a, b, c, d, e)
    }

    G(iB, NA);
    q = iB.prototype;
    q.Ze = function () {
        aB(this)
    };
    q.af = function () {
        aB(this)
    };
    q.je = function () {
        aB(this)
    };
    function jB(a, b) {
        a = a.getContext();
        a.save();
        b = b.Xd ? TA(b.Xd) : new RA;
        var c = b.D, d = b.G;
        (c || d) && a.translate(c, d);
        (b = b.A) && a.rotate(Math.asin(b))
    }

    q.vc = function () {
        var a = this.G.He("DIV", {style: "position:relative;overflow:hidden"});
        this.D = a;
        this.C = this.G.He("CANVAS");
        a.appendChild(this.C);
        this.O = this.B = new $A(this);
        this.P = 0;
        kB(this)
    };
    q.getContext = function () {
        this.Z() || this.vc();
        this.A || (this.A = this.C.getContext("2d"), this.A.save());
        return this.A
    };
    q.gc = function (a, b) {
        iB.V.gc.apply(this, arguments);
        aB(this)
    };
    q.Wa = function () {
        var a = this.width, b = this.height, c = wa(a) && -1 != a.indexOf("%"), d = wa(b) && -1 != b.indexOf("%");
        if (!this.Ka && (c || d))return null;
        var e, f;
        c && (e = this.Z().parentNode, f = bo(e), a = parseFloat(a) * f.width / 100);
        d && (e = e || this.Z().parentNode, f = f || bo(e), b = parseFloat(b) * f.height / 100);
        return new Kj(a, b)
    };
    function kB(a) {
        $n(a.Z(), a.width, a.height);
        var b = a.Wa();
        b && ($n(a.C, b.width, b.height), a.C.width = b.width, a.C.height = b.height, a.A = null)
    }

    q.reset = function () {
        var a = this.getContext();
        a.restore();
        var b = this.Wa();
        b.width && b.height && a.clearRect(0, 0, b.width, b.height);
        a.save()
    };
    q.clear = function () {
        this.reset();
        this.B.clear();
        for (var a = this.Z(); 1 < a.childNodes.length;)a.removeChild(a.lastChild)
    };
    function aB(a) {
        if (!a.U && a.Ka) {
            a.reset();
            if (a.F) {
                var b = a.Wa();
                a.getContext().scale(b.width / a.F, b.height / a.H)
            }
            jB(a, a.B);
            a.B.B(a.A);
            a.getContext().restore()
        }
    }

    function bB(a, b) {
        if (!(b instanceof dB)) {
            var c = a.getContext();
            jB(a, b);
            if (b.Wi && b.Mj) {
                var d = b.fill;
                if (d)if (d instanceof hB) 0 != d.A && (c.globalAlpha = d.A, c.fillStyle = d.bb(), b.B(c), c.fill(), c.globalAlpha = 1); else {
                    var e = c.createLinearGradient(d.sn(), d.un(), d.tn(), d.vn());
                    e.addColorStop(0, d.cg());
                    e.addColorStop(1, d.rn());
                    c.fillStyle = e;
                    b.B(c);
                    c.fill()
                }
                if (d = b.ff) b.B(c), c.strokeStyle = d.bb(), b = d.W(), wa(b) && -1 != b.indexOf("px") && (b = parseFloat(b) / PA(a)), c.lineWidth = b, c.stroke()
            } else b.B(c);
            a.getContext().restore()
        }
    }

    function lB(a, b, c) {
        c = c || a.B;
        c.appendChild(b);
        !a.Ka || a.P || c != a.B && c != a.O || bB(a, b)
    }

    q.drawImage = function (a, b, c, d, e, f) {
        a = new fB(null, this, a, b, c, d, e);
        lB(this, a, f);
        return a
    };
    q.Ee = function (a, b, c, d, e, f, g, k, l, m) {
        a = new dB(this, a, b, c, d, e, f, g, k, l);
        lB(this, a, m);
        return a
    };
    q.De = function (a, b, c, d) {
        a = new cB(null, this, a, b, c);
        lB(this, a, d);
        return a
    };
    q.ga = function () {
        this.A = null;
        iB.V.ga.call(this)
    };
    q.Nb = function () {
        var a = this.Wa();
        iB.V.Nb.call(this);
        a || (kB(this), this.dispatchEvent("resize"));
        aB(this)
    };
    function mB(a, b, c) {
        this.C = a;
        this.B = b;
        this.A = null == c ? 1 : c
    }

    mB.prototype.W = h("C");
    mB.prototype.bb = h("B");
    function nB(a, b) {
        UA.call(this, a, b)
    }

    G(nB, WA);
    nB.prototype.clear = function () {
        ck(this.Z())
    };
    function oB(a, b, c, d) {
        VA.call(this, a, b, c, d)
    }

    G(oB, YA);
    oB.prototype.A = function (a) {
        pB(this.Z(), {d: qB(a)})
    };
    function rB(a, b, c, d) {
        VA.call(this, a, b, c, d)
    }

    G(rB, ZA);
    function sB(a, b) {
        UA.call(this, a, b)
    }

    G(sB, XA);
    function tB(a, b, c, d, e) {
        NA.call(this, a, b, c, d, e);
        this.P = {};
        this.O = ec && !pc(526);
        this.A = new vq(this)
    }

    var uB;
    G(tB, NA);
    function vB(a, b, c) {
        a = a.G.A.createElementNS("http://www.w3.org/2000/svg", b);
        c && pB(a, c);
        return a
    }

    function pB(a, b) {
        for (var c in b)a.setAttribute(c, b[c])
    }

    q = tB.prototype;
    q.Ze = function (a, b) {
        a = a.Z();
        b instanceof hB ? (a.setAttribute("fill", b.bb()), a.setAttribute("fill-opacity", b.A)) : a.setAttribute("fill", "none")
    };
    q.af = function (a, b) {
        a = a.Z();
        b ? (a.setAttribute("stroke", b.bb()), a.setAttribute("stroke-opacity", b.A), b = b.W(), wa(b) && -1 != b.indexOf("px") ? a.setAttribute("stroke-width", parseFloat(b) / PA(this)) : a.setAttribute("stroke-width", b)) : a.setAttribute("stroke", "none")
    };
    q.je = function (a, b) {
        b = [b.B, b.A, b.C, b.F, b.D, b.G].join();
        a.Z().setAttribute("transform", "matrix(" + b + ")")
    };
    q.vc = function () {
        var a = vB(this, "svg", {width: this.width, height: this.height, overflow: "hidden"}), b = vB(this, "g");
        this.C = vB(this, "defs");
        this.B = new nB(b, this);
        a.appendChild(this.C);
        a.appendChild(b);
        this.D = a;
        wB(this)
    };
    q.gc = function (a, b) {
        tB.V.gc.apply(this, arguments);
        wB(this)
    };
    function wB(a) {
        a.F && (a.Z().setAttribute("preserveAspectRatio", "none"), a.O ? a.oe() : a.Z().setAttribute("viewBox", "0 0 " + (a.F ? a.F + " " + a.H : "")))
    }

    q.oe = function () {
        if (this.Ka) {
            var a = this.Wa();
            if (0 == a.width) this.Z().style.visibility = "hidden"; else {
                this.Z().style.visibility = "";
                var b = a.width / this.F, a = a.height / this.H;
                this.B.Z().setAttribute("transform", "scale(" + b + " " + a + ") translate(0 0)")
            }
        }
    };
    q.Wa = function () {
        if (!dc)return this.Ka ? bo(this.Z()) : tB.V.Wa.call(this);
        var a = this.width, b = this.height, c = wa(a) && -1 != a.indexOf("%"), d = wa(b) && -1 != b.indexOf("%");
        if (!this.Ka && (c || d))return null;
        var e, f;
        c && (e = this.Z().parentNode, f = bo(e), a = parseFloat(a) * f.width / 100);
        d && (e = e || this.Z().parentNode, f = f || bo(e), b = parseFloat(b) * f.height / 100);
        return new Kj(a, b)
    };
    q.clear = function () {
        this.B.clear();
        ck(this.C);
        this.P = {}
    };
    q.drawImage = function (a, b, c, d, e, f) {
        a = vB(this, "image", {
            x: a,
            y: b,
            width: c,
            height: d,
            "image-rendering": "optimizeQuality",
            preserveAspectRatio: "none"
        });
        a.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
        e = new sB(a, this);
        (f || this.B).Z().appendChild(e.Z());
        return e
    };
    q.Ee = function (a, b, c, d, e, f, g, k, l, m) {
        var n = Math.round(Hb(Kb(Math.atan2(e - c, d - b))));
        d -= b;
        e -= c;
        e = Math.round(Math.sqrt(d * d + e * e));
        d = g.size;
        g = {"font-family": g.A, "font-size": d};
        d = Math.round(c - d / 2 + Math.round(.85 * d));
        var p = b;
        "center" == f ? (p += Math.round(e / 2), g["text-anchor"] = "middle") : "right" == f && (p += e, g["text-anchor"] = "end");
        g.x = p;
        g.y = d;
        0 != n && (g.transform = "rotate(" + n + " " + b + " " + c + ")");
        b = vB(this, "text", g);
        b.appendChild(this.G.A.createTextNode(a));
        null == k && dc && gc && (a = "black", l instanceof hB && (a = l.bb()), k = new mB(1,
            a));
        l = new rB(b, this, k, l);
        (m || this.B).Z().appendChild(l.Z());
        return l
    };
    q.De = function (a, b, c, d) {
        a = vB(this, "path", {d: qB(a)});
        b = new oB(a, this, b, c);
        (d || this.B).Z().appendChild(b.Z());
        return b
    };
    function qB(a) {
        var b = [];
        JA(a, function (a, d) {
            switch (a) {
                case 0:
                    b.push("M");
                    Array.prototype.push.apply(b, d);
                    break;
                case 1:
                    b.push("L");
                    Array.prototype.push.apply(b, d);
                    break;
                case 2:
                    b.push("C");
                    Array.prototype.push.apply(b, d);
                    break;
                case 3:
                    a = d[3];
                    b.push("A", d[0], d[1], 0, 180 < Math.abs(a) ? 1 : 0, 0 < a ? 1 : 0, d[4], d[5]);
                    break;
                case 4:
                    b.push("Z")
            }
        });
        return b.join(" ")
    }

    q.Nb = function () {
        var a = this.Wa();
        tB.V.Nb.call(this);
        a || this.dispatchEvent("resize");
        if (this.O) {
            var a = this.width, b = this.height;
            "string" == typeof a && -1 != a.indexOf("%") && "string" == typeof b && -1 != b.indexOf("%") && this.A.listen(xB(), "tick", this.oe);
            this.oe()
        }
    };
    q.Oc = function () {
        tB.V.Oc.call(this);
        this.O && this.A.Wb(xB(), "tick", this.oe)
    };
    q.ga = function () {
        delete this.P;
        delete this.C;
        delete this.B;
        this.A.ra();
        delete this.A;
        tB.V.ga.call(this)
    };
    function xB() {
        uB || (uB = new pv(400), uB.start());
        return uB
    };
    function yB() {
        return this.Pb = this.fb.G.Z(this.va) || this.Pb
    }

    function zB(a, b) {
        this.va = a.id;
        UA.call(this, a, b)
    }

    G(zB, WA);
    zB.prototype.Z = yB;
    zB.prototype.clear = function () {
        ck(this.Z())
    };
    function AB(a, b, c, d) {
        this.va = a.id;
        VA.call(this, a, b, c, d)
    }

    G(AB, YA);
    AB.prototype.Z = yB;
    AB.prototype.A = function (a) {
        BB(this.Z(), "path", CB(a))
    };
    function DB(a, b, c, d) {
        this.va = a.id;
        VA.call(this, a, b, c, d)
    }

    G(DB, ZA);
    DB.prototype.Z = yB;
    function EB(a, b) {
        this.va = a.id;
        UA.call(this, a, b)
    }

    G(EB, XA);
    EB.prototype.Z = yB;
    function FB(a, b, c, d, e) {
        NA.call(this, a, b, c, d, e);
        this.A = new vq(this);
        Ik(this, Fa(Jk, this.A))
    }

    G(FB, NA);
    var GB = w.document && w.document.documentMode && 8 <= w.document.documentMode;

    function HB(a) {
        return wa(a) && Ja(a, "%") ? a : parseFloat(a.toString()) + "px"
    }

    function IB(a) {
        return Math.round(100 * (parseFloat(a.toString()) - .5))
    }

    function JB(a) {
        return Math.round(100 * parseFloat(a.toString()))
    }

    function BB(a, b, c) {
        GB ? a[b] = c : a.setAttribute(b, c)
    }

    function KB(a, b) {
        a = a.G.A.createElement(String("g_vml_:" + b));
        a.id = "goog_" + gb++;
        return a
    }

    function LB(a) {
        if (GB && a.Ka) {
            var b = $i(yi("Assign innerHTML to itself"), a.Z().innerHTML);
            Mj(a.Z(), b)
        }
    }

    function MB(a, b, c) {
        (c || a.B).Z().appendChild(b.Z());
        LB(a)
    }

    FB.prototype.Ze = function (a, b) {
        a = a.Z();
        NB(a);
        if (b instanceof hB)if ("transparent" == b.bb()) a.filled = !1; else if (1 != b.A) {
            a.filled = !0;
            var c = KB(this, "fill");
            c.opacity = Math.round(100 * b.A) + "%";
            c.color = b.bb();
            a.appendChild(c)
        } else a.filled = !0, a.fillcolor = b.bb(); else a.filled = !1;
        LB(this)
    };
    FB.prototype.af = function (a, b) {
        a = a.Z();
        if (b) {
            a.stroked = !0;
            var c = b.W(), c = wa(c) && -1 == c.indexOf("px") ? parseFloat(c) : c * PA(this), d = a.getElementsByTagName("stroke")[0];
            d || (d = d || KB(this, "stroke"), a.appendChild(d));
            d.opacity = b.A;
            d.weight = c + "px";
            d.color = b.bb()
        } else a.stroked = !1;
        LB(this)
    };
    FB.prototype.je = function (a, b) {
        a = a.Z();
        OB(a);
        var c = KB(this, "skew");
        c.An = "true";
        c.origin = -a.style.pixelLeft / a.style.pixelWidth - .5 + "," + (-a.style.pixelTop / a.style.pixelHeight - .5);
        c.offset = b.D.toFixed(1) + "px," + b.G.toFixed(1) + "px";
        c.yn = [b.B.toFixed(6), b.C.toFixed(6), b.A.toFixed(6), b.F.toFixed(6), 0, 0].join();
        a.appendChild(c);
        LB(this)
    };
    function OB(a) {
        nb(a.childNodes, function (b) {
            "skew" == b.tagName && a.removeChild(b)
        })
    }

    function NB(a) {
        a.fillcolor = "";
        nb(a.childNodes, function (b) {
            "fill" == b.tagName && a.removeChild(b)
        })
    }

    function PB(a, b, c, d, e) {
        var f = a.style;
        f.position = "absolute";
        f.left = IB(b) + "px";
        f.top = IB(c) + "px";
        f.width = JB(d) + "px";
        f.height = JB(e) + "px";
        "shape" == a.tagName && (a.coordsize = JB(d) + " " + JB(e))
    }

    function QB(a) {
        var b = KB(a, "shape");
        a = OA(a);
        PB(b, 0, 0, a.width, a.height);
        return b
    }

    if (bc)try {
        Yb(document.namespaces)
    } catch (a) {
    }
    q = FB.prototype;
    q.vc = function () {
        var a = this.G.A;
        a.namespaces.g_vml_ || (GB ? a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML") : a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml"), a.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}");
        var a = this.width, b = this.height, c = this.G.He("DIV", {style: "overflow:hidden;position:relative;width:" + HB(a) + ";height:" + HB(b)});
        this.D = c;
        var d = KB(this, "group"), e = d.style;
        e.position = "absolute";
        e.left = e.top = "0";
        e.width = this.width;
        e.height = this.height;
        d.coordsize = this.F ? JB(this.F) + " " + JB(this.H) : JB(a) + " " + JB(b);
        d.coordorigin = x(0) ? JB(0) + " " + JB(0) : "0 0";
        c.appendChild(d);
        this.B = new zB(d, this);
        al(c, "resize", E(this.Ie, this))
    };
    q.Ie = function () {
        var a = bo(this.Z()), b = this.B.Z().style;
        if (a.width) b.width = a.width + "px", b.height = a.height + "px"; else {
            for (a = this.Z(); a && a.currentStyle && "none" != a.currentStyle.display;)a = a.parentNode;
            a && a.currentStyle && this.A.listen(a, "propertychange", this.Ie)
        }
        this.dispatchEvent("resize")
    };
    q.gc = function (a, b) {
        FB.V.gc.apply(this, arguments);
        this.B.Z().coordsize = JB(a) + " " + JB(b)
    };
    q.Wa = function () {
        var a = this.Z();
        return new Kj(a.style.pixelWidth || a.offsetWidth || 1, a.style.pixelHeight || a.offsetHeight || 1)
    };
    q.clear = function () {
        this.B.clear()
    };
    q.drawImage = function (a, b, c, d, e, f) {
        var g = KB(this, "image");
        PB(g, a, b, c, d);
        BB(g, "src", e);
        a = new EB(g, this);
        MB(this, a, f);
        return a
    };
    q.Ee = function (a, b, c, d, e, f, g, k, l, m) {
        var n = QB(this), p = KB(this, "path");
        BB(p, "v", "M" + IB(b) + "," + IB(c) + "L" + IB(d) + "," + IB(e) + "E");
        BB(p, "textpathok", "true");
        b = KB(this, "textpath");
        b.setAttribute("on", "true");
        c = b.style;
        c.fontSize = g.size * PA(this);
        c.fontFamily = g.A;
        null != f && (c["v-text-align"] = f);
        BB(b, "string", a);
        n.appendChild(p);
        n.appendChild(b);
        a = new DB(n, this, k, l);
        MB(this, a, m);
        return a
    };
    q.De = function (a, b, c, d) {
        var e = QB(this);
        BB(e, "path", CB(a));
        a = new AB(e, this, b, c);
        MB(this, a, d);
        return a
    };
    function CB(a) {
        var b = [];
        JA(a, function (a, d) {
            switch (a) {
                case 0:
                    b.push("m");
                    Array.prototype.push.apply(b, ob(d, JB));
                    break;
                case 1:
                    b.push("l");
                    Array.prototype.push.apply(b, ob(d, JB));
                    break;
                case 2:
                    b.push("c");
                    Array.prototype.push.apply(b, ob(d, JB));
                    break;
                case 4:
                    b.push("x");
                    break;
                case 3:
                    a = d[2] + d[3], b.push("ae", JB(d[4] - d[0] * Math.cos(Jb(a))), JB(d[5] - d[1] * Math.sin(Jb(a))), JB(d[0]), JB(d[1]), Math.round(-65536 * d[2]), Math.round(-65536 * d[3]))
            }
        });
        return b.join(" ")
    }

    q.Nb = function () {
        FB.V.Nb.call(this);
        this.Ie();
        LB(this)
    };
    q.ga = function () {
        this.B = null;
        FB.V.ga.call(this)
    };
    function RB(a) {
        this.B = a;
        this.A = Array(a);
        for (var b = 0; b < a; b++)this.A[b] = 0
    }

    function SB() {
    }

    function TB(a, b, c) {
        if (a instanceof RB)for (this.length = c || a.B / this.A, this.B = new RB(a.B), b = 0; b < this.length; b++)this[b] = a.A[b]; else {
            if (va(a)) {
                for (b = 0; b < a.length; b++)this[b] = a[b];
                this.length = a.length
            } else for (this.length = a || 0, b = 0; b < this.length; b++)this[b] = 0;
            this.B = new RB(this.length * this.A)
        }
        this.B.A = this
    }

    G(TB, SB);
    TB.prototype.set = function (a, b) {
        b = b || 0;
        for (var c = 0; c < a.length; c++)this[b + c] = a[c]
    };
    TB.prototype.slice = aa();
    TB.prototype.subarray = da(null);
    function UB(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G(UB, TB);
    UB.prototype.A = 1;
    function VB(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G(VB, TB);
    VB.prototype.A = 1;
    function WB(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G(WB, TB);
    WB.prototype.A = 2;
    function XB(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G(XB, TB);
    XB.prototype.A = 2;
    function YB(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G(YB, TB);
    YB.prototype.A = 4;
    function ZB(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G(ZB, TB);
    ZB.prototype.A = 4;
    function $B(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G($B, TB);
    $B.prototype.A = 4;
    function aC(a, b, c) {
        TB.call(this, a, 0, c)
    }

    G(aC, TB);
    aC.prototype.A = 4;
    function bC() {
    }

    G(bC, SB);
    "undefined" == typeof ArrayBuffer && (w.ArrayBuffer = RB);
    "undefined" == typeof Int8Array && (w.Int8Array = UB);
    "undefined" == typeof Uint8Array && (w.Uint8Array = VB);
    "undefined" == typeof Int16Array && (w.Int16Array = WB);
    "undefined" == typeof Uint16Array && (w.Uint16Array = XB);
    "undefined" == typeof Int32Array && (w.Int32Array = YB);
    "undefined" == typeof Uint32Array && (w.Uint32Array = ZB);
    "undefined" == typeof Float32Array && (w.Float32Array = $B);
    "undefined" == typeof Float64Array && (w.Float64Array = aC);
    "undefined" == typeof DataView && (w.DataView = bC);
    function cC(a) {
        return a.Ta ? 1 : a.zb ? 2 : 3
    }

    function dC(a, b, c, d, e) {
        var f = a.A, g = eC(b, c), k = Math.max(d * g, 1), g = Math.max(e * g, 1);
        zc || bc ? (k = Math.round(k), g = Math.round(g)) : (k = Math.floor(k), g = Math.floor(g));
        if (f.width !== k || f.height !== g || a.C !== c) a.C = c, f.width = k, f.height = g, Ac && 1 == b ? (a = 1 / c, f.style.transformOrigin = "0 0", f.style.webkitTransformOrigin = "0 0", f.style.transform = "scale(" + a + "," + a + ")", f.style.webkitTransform = "scale(" + a + "," + a + ")") : (f.style.width = d + "px", f.style.height = e + "px")
    }

    function eC(a, b) {
        2 == a && Ac ? (0 >= fC && (fC = bk("canvas").getContext("2d").webkitBackingStorePixelRatio || 1), a = b / fC) : a = b;
        return a
    }

    var fC = -1;

    function gC(a) {
        this.A = [];
        this.J = Jl();
        this.I = Jl();
        this.O = Jl();
        this.C = this.H = this.P = this.F = this.K = null;
        this.G = [];
        this.B = [];
        this.ia = this.ja = this.fa = this.U = null;
        this.D = 1;
        this.Ma = !!a;
        this.Y = Infinity;
        this.aa = this.ea = -1;
        a = hC("rgba(255, 255, 255, 0.7)");
        var b = hC("rgba(0, 0, 0, 0.15)"), c = hC("rgba(0, 0, 0, 0.5)");
        this.fa = new hB(iC(a), a[3]);
        this.ja = new mB(2, iC(b), b[3]);
        this.U = new GA;
        this.ia = new hB(iC(c), c[3]);
        this.$ = Jl();
        this.L = Jl();
        this.xa = ok();
        this.za = ok();
        this.na = uk();
        this.M = xl();
        this.Da = xl();
        this.Va = xl();
        this.N = new Float64Array(2);
        this.X = Hl();
        this.Xa = Hl();
        this.Ua = new HA
    }

    function jC(a, b) {
        for (var c = 0; c < b.length; c++)a.add(b[c])
    }

    gC.prototype.add = function (a) {
        this.A.push(a);
        Wz(a)
    };
    function kC(a, b, c, d) {
        var e;
        if (c.zb) e = c.zb.canvas; else if (c.Ta) e = c.Ta.C.A; else if (c.A) e = c.A; else throw Error("ShapeLayer: invalid context: " + c);
        var f = w.devicePixelRatio || 1, g = b.L, k = b.J, l = e.height / f / 2, m = e.width / f / 2, n = a.O, p = -l, r = (k - g) / 2, u = (k + g) / 2;
        n[0] = m;
        n[1] = 0;
        n[2] = 0;
        n[3] = 0;
        n[4] = 0;
        n[5] = p;
        n[6] = 0;
        n[7] = 0;
        n[8] = 0;
        n[9] = 0;
        n[10] = r;
        n[11] = 0;
        n[12] = m;
        n[13] = l;
        n[14] = u;
        n[15] = 1;
        var t = a.M, v = a.Da, y = a.Va;
        yl(t, b.A, b.B, b.C);
        yl(v, b.D, b.F, b.G);
        cm(t, t);
        cm(v, v);
        El(t, y);
        Wl(a.I, t, v, y);
        var D = b.W() / b.H, z = a.J, A = b.L, B = b.J, R = b.K / 2,
            N = B - A, H = Math.sin(R);
        if (0 != N && 0 != H && 0 != D) {
            var T = Math.cos(R) / H;
            z[0] = T / D;
            z[1] = 0;
            z[2] = 0;
            z[3] = 0;
            z[4] = 0;
            z[5] = T;
            z[6] = 0;
            z[7] = 0;
            z[8] = 0;
            z[9] = 0;
            z[10] = -(B + A) / N;
            z[11] = -1;
            z[12] = 0;
            z[13] = 0;
            z[14] = -(2 * A * B) / N;
            z[15] = 0
        }
        Rl(a.J, a.I, a.$);
        if (c.zb) {
            for (var S = c.zb, qa = eC(2, w.devicePixelRatio || 1), oa = a.L, sa = 0; sa < a.A.length; sa++) {
                var ca = a.A[sa];
                if (!lz(ca)) {
                    Rl(a.J, a.I, oa);
                    Rl(oa, mz(ca), oa);
                    var fa;
                    a:{
                        for (var fb = ca.A, jb = oa, Ib = a.X, sc = 0; sc < fb.length; sc += 3)if (Ib[0] = fb[sc + 0], Ib[1] = fb[sc + 1], Ib[2] = fb[sc + 2], Ib[3] = 1, Vl(jb, Ib, Ib), dA(Ib) & 1) {
                            fa = !1;
                            break a
                        }
                        fa = !0
                    }
                    if (fa) {
                        var Pa = a.X;
                        S.beginPath();
                        for (var ae = 0; ae < ca.A.length / 3; ae++)Pa[0] = ca.A[3 * ae + 0], Pa[1] = ca.A[3 * ae + 1], Pa[2] = ca.A[3 * ae + 2], Pa[3] = 1, Vl(oa, Pa, Pa), Cl(Pa, 1 / Pa[3], Pa), Tl(a.O, Pa, Pa), Cl(Pa, qa, Pa), 0 == ae ? S.moveTo(Pa[0], Pa[1]) : S.lineTo(Pa[0], Pa[1]);
                        S.closePath();
                        var Ui = lC;
                        S.fillStyle = Ui(ca.D);
                        S.fill();
                        var Vi = ca.C;
                        Vi && (S.strokeStyle = Ui(Vi), S.stroke())
                    }
                }
            }
            if (0 != a.B.length && 0 != a.D) {
                S.globalAlpha = a.D;
                var Wi = a.L;
                Rl(a.J, a.I, Wi);
                for (var Ct = 0; Ct < a.B.length; Ct++) {
                    var OC = a.B[Ct], zn = OC.Ja(), jg = a.X, Dt =
                        OC.Rc(), PC = a.Xa, An = PC, pM = Dt[1], qM = Dt[2];
                    An[0] = Dt[0];
                    An[1] = pM;
                    An[2] = qM;
                    An[3] = 1;
                    var rM = a, kg = jg;
                    Vl(Wi, PC, kg);
                    var QC = !1;
                    0 != (dA(kg) & 6) && (QC = !0);
                    Cl(kg, 1 / kg[3], kg);
                    Tl(rM.O, kg, kg);
                    if (!QC && zn) {
                        var RC = qa * zn.width, SC = qa * zn.height;
                        jg[0] = jg[0] * qa - RC / 2;
                        jg[1] = jg[1] * qa - SC / 2;
                        S.drawImage(zn, jg[0], jg[1], RC, SC)
                    }
                }
                S.globalAlpha = 1
            }
        } else if (c.Ta) {
            var La = c.Ta;
            La.clear(256);
            La.disable(2884);
            La.disable(2929);
            La.enable(3042);
            La.blendFuncSeparate(770, 771, 1, 771);
            if (!a.K) {
                var Et = new zA, TC = a.Ma;
                Et.A != TC && (Et.A = +TC);
                a.K = new yA(La,
                    Et)
            }
            kA(a.K);
            var sM = fA(a.K.attributes.A);
            La.enableVertexAttribArray(sM);
            for (var Ft = 0; Ft < a.A.length; Ft++) {
                var Gt = a.A[Ft], Ht = La;
                Ht.B.contains(Gt.G) ? cA(Ht.B, Gt.G) : $z(Gt, Ht)
            }
            for (var Bn = a.L, It = 0; It < a.A.length; It++) {
                var lg = a.A[It];
                if (!lz(lg)) {
                    var zh = a.K;
                    Rl(a.J, a.I, Bn);
                    Rl(Bn, mz(lg), Bn);
                    var UC = a.na;
                    vk(UC, Bn);
                    uA(zh.B.A, UC);
                    sA(zh.B.color, lg.D);
                    La.bindBuffer(34962, bA(lg, La));
                    zh.attributes.A.vertexAttribPointer(3, 5126, !1, 0, 0);
                    -1 != fA(zh.attributes.B) && zh.B.B.set(0);
                    La.drawArrays(6, 0, lg.A.length / 3);
                    var VC = lg.C;
                    VC && (sA(zh.B.color, VC), La.drawArrays(2, 0, lg.A.length / 3))
                }
            }
            if (0 != a.B.length) {
                a.F || (a.F = new vA(La));
                kA(a.F);
                var me = a.M;
                yl(me, b.A, b.B, b.C);
                cm(me, me);
                var Jt = a.L;
                Rl(a.J, a.I, Jt);
                Yl(Jt, me[0], me[1], me[2]);
                var WC = a.na;
                vk(WC, Jt);
                uA(a.F.B.B, WC);
                a.F.B.opacity.set(a.D);
                a.P ? La.bindBuffer(34962, a.P) : (a.P = La.createBuffer(), La.bindBuffer(34962, a.P), La.bufferData(34962, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), 35044));
                var Ah = a.F;
                La.vertexAttribPointer(fA(Ah.attributes.A), 2, 5126, !1, 0, 0);
                La.enableVertexAttribArray(fA(Ah.attributes.A));
                Ah.B.A.set(0);
                for (var Kt = 0; Kt < a.B.length; Kt++) {
                    var Lt = a.B[Kt], Mt = Lt.Rc(), XC = Lt.Ja(), YC = Lt.Aa(La);
                    YC && (La.uniform3fv(mA(Ah.B.D), [Mt[0] - me[0], Mt[1] - me[1], Mt[2] - me[2]]), La.uniform2fv(mA(Ah.B.C), [XC.width / b.W(), XC.height / b.H]), La.activeTexture(33984), La.bindTexture(3553, YC), La.drawArrays(5, 0, 4))
                }
                La.disableVertexAttribArray(fA(Ah.attributes.A))
            }
            var tM = fA(a.K.attributes.A);
            La.disableVertexAttribArray(tM);
            La.disable(3042)
        } else if (c.A && d) {
            var wc = c.A, Bh = a.M, Ch = a.Da;
            yl(Bh, b.A, b.B, b.C);
            yl(Ch, b.D, b.F, b.G);
            cm(Bh,
                Bh);
            cm(Ch, Ch);
            Cl(Bh, 2, Bh);
            Bl(Bh, Ch, Ch);
            var Dh = a.N;
            d(Ch, Dh);
            var ZC = 2 * Math.abs(b.W() / 2 - Dh[0]);
            Dh[0] < b.W() / 2 && (Dh[0] += ZC);
            a.Y = Dh[0] - .1 * ZC;
            if (0 !== a.A.length || 0 !== a.G.length || 0 !== a.B.length) {
                var Tj;
                a.C || (a.C = bk("canvas"), a.C.style.position = "absolute", a.C.style.zIndex = "2", wc.appendChild(a.C));
                if (a.C.width != wc.clientWidth || a.C.height != wc.clientHeight) a.C.width = wc.clientWidth, a.C.height = wc.clientHeight;
                var cb = (Tj = a.C) && Tj.getContext ? Tj.getContext("2d") : null;
                if (cb) {
                    cb.save();
                    cb.setTransform(1, 0, 0, 1, 0, 0);
                    cb.clearRect(0,
                        0, Tj.width, Tj.height);
                    cb.restore();
                    for (var Nt = 0; Nt < a.G.length; Nt++) {
                        var $C = a.G[Nt], mg = a.xa;
                        mC(a, $C, mg, d) && (cb.save(), cb.transform(mg[0], mg[1], mg[3], mg[4], mg[6], mg[7]), cb.drawImage($C.Aa(), 0, 0), cb.restore())
                    }
                    cb.save();
                    cb.setTransform(1, 0, 0, 1, 0, 0);
                    for (var Ot = 0; Ot < a.A.length; Ot++) {
                        var Cn = a.A[Ot];
                        if (!lz(Cn)) {
                            var Eh = [];
                            if (nC(a, Cn, Eh, d)) {
                                cb.beginPath();
                                cb.moveTo(Eh[0], Eh[1]);
                                for (var Dn = 1; Dn < Eh.length / 2; Dn++)cb.lineTo(Eh[2 * Dn], Eh[2 * Dn + 1]);
                                cb.closePath();
                                var cD = lC;
                                cb.fillStyle = cD(Cn.D);
                                cb.fill();
                                var dD = Cn.C;
                                dD && (cb.strokeStyle = cD(dD), cb.stroke())
                            }
                        }
                    }
                    cb.restore();
                    if (0 != a.D) {
                        cb.globalAlpha = a.D;
                        for (var Pt = 0; Pt < a.B.length; Pt++) {
                            var eD = a.B[Pt], ng = a.N;
                            d(eD.Rc(), ng);
                            var Fh = eD.Ja();
                            Fh && (ng[0] -= Fh.width / 2, ng[1] -= Fh.height / 2, cb.drawImage(Fh, ng[0], ng[1], Fh.width, Fh.height))
                        }
                        cb.globalAlpha = 1
                    }
                } else {
                    var Gh;
                    if (!a.H) {
                        var Uj;
                        !bc || pc("9") && Nj().A.createElementNS ? !ec || pc("420") && !fc ? Uj = new tB("100%", "100%", void 0, void 0, void 0) : Uj = new iB("100%", "100%", void 0, void 0, void 0) : Uj = new FB("100%", "100%", void 0, void 0, void 0);
                        Uj.vc();
                        a.H = Uj;
                        var Qt = a.H.Z();
                        Qt.style.position = "absolute";
                        Qt.style.zIndex = "1";
                        Qt.setAttribute("pointer-events", "none");
                        var ne = a.H;
                        if (ne.Ka)throw Error("Component already rendered");
                        ne.D || ne.vc();
                        wc ? wc.insertBefore(ne.D, null) : ne.G.A.body.appendChild(ne.D);
                        ne.I && !ne.I.Ka || ne.Nb()
                    }
                    if (a.ea != wc.clientWidth || a.aa != wc.clientHeight) a.H.gc(wc.clientWidth, wc.clientHeight), a.ea = wc.clientWidth, a.aa = wc.clientHeight;
                    Gh = a.H;
                    Gh.clear();
                    for (var Rt = 0; Rt < a.G.length; Rt++) {
                        var St = a.G[Rt], xc = a.xa;
                        if (mC(a, St, xc, d))for (var uM =
                            new RA(xc[0], xc[1], xc[3], xc[4], xc[6], xc[7]), vM = new RA(xc[0], xc[1], xc[3], xc[4], xc[6] + -1.5, xc[7] + 0), fD = St.Aa().height / 1.25, Vj = St.H, Hh = 0; Hh < Vj.length; ++Hh) {
                            var Tt = QA(Gh, Vj[Hh], fD / Vj.length * Hh, a.U, null, a.ia), gD = vM;
                            Tt.Xd = TA(gD);
                            Tt.fb.je(Tt, gD);
                            var Ut = QA(Gh, Vj[Hh], fD / Vj.length * Hh, a.U, a.ja, a.fa), hD = uM;
                            Ut.Xd = TA(hD);
                            Ut.fb.je(Ut, hD)
                        }
                    }
                    for (var Vt = 0; Vt < a.A.length; Vt++) {
                        var En = a.A[Vt];
                        if (!lz(En)) {
                            var Ih = [];
                            if (nC(a, En, Ih, d)) {
                                var Wj = a.Ua;
                                Wj.clear();
                                Wj.vg(Ih[0], Ih[1]);
                                for (var Fn = 1; Fn < Ih.length / 2; Fn++)Wj.ug(Ih[2 * Fn],
                                    Ih[2 * Fn + 1]);
                                Wj.close();
                                var iD = iC, jD = En.D, wM = new hB(iD(jD), jD[3]), Wt = En.C, kD = null;
                                if (Wt)var xM = iD(Wt), kD = new mB(1, xM, Wt[3]);
                                Gh.De(Wj, kD, wM)
                            }
                        }
                    }
                    if (0 != a.D)for (var Xt = 0; Xt < a.B.length; Xt++) {
                        var lD = a.B[Xt], og = a.N;
                        d(lD.Rc(), og);
                        var Jh = lD.Ja();
                        Jh && (og[0] -= Jh.width / 2, og[1] -= Jh.height / 2, Gh.drawImage(og[0], og[1], Jh.width, Jh.height, Jh.src))
                    }
                }
            }
        } else throw Error("ShapeLayer: invalid context: " + c);
    }

    function lC(a) {
        return "rgba(" + Math.floor(255 * a[0]) + "," + Math.floor(255 * a[1]) + "," + Math.floor(255 * a[2]) + "," + a[3] + ")"
    }

    function hC(a) {
        a = a.substring(5, a.length - 1).split(",");
        for (var b = [], c = 0; c < a.length; c++)b.push(+a[c]);
        for (c = 0; 3 > c; c++)b[c] /= 255;
        return b
    }

    function oC(a) {
        a = a.toString(16);
        return 1 == a.length ? "0" + a : a
    }

    function iC(a) {
        return "#" + oC(Math.floor(255 * a[0])) + oC(Math.floor(255 * a[1])) + oC(Math.floor(255 * a[2]))
    }

    function nC(a, b, c, d) {
        var e = a.Y;
        0 != c.length && (c = []);
        for (var f = !1, g = 0; g < b.A.length / 3; g++) {
            var k = a.M;
            k[0] = b.A[3 * g + 0];
            k[1] = b.A[3 * g + 1];
            k[2] = b.A[3 * g + 2];
            Tl(mz(b), k, k);
            var l = a.N;
            d(k, l);
            c.push(l[0]);
            c.push(l[1]);
            f = l[0] > e || f
        }
        return !f
    }

    function mC(a, b, c, d) {
        var e = a.Y, f = b.ma(), g = a.L;
        Mp(f, g);
        for (var k = a.za, l = 6, m = b.A.length; l < m; l++)k[l - 3] = b.A[l];
        for (l = 0; 3 > l; l++)k[l] = (b.A[l] + b.A[l + 3]) / 2;
        f = !1;
        l = 0;
        for (m = k.length / 3; l < m; l++) {
            var n = a.M;
            n[0] = k[3 * l + 0];
            n[1] = k[3 * l + 1];
            n[2] = k[3 * l + 2];
            Tl(g, n, n);
            cm(n, n);
            var p = a.N;
            d(n, p);
            c[3 * l + 0] = p[0];
            c[3 * l + 1] = p[1];
            c[3 * l + 2] = 1;
            f = p[0] > e || f
        }
        d = b.Aa();
        b = d.height / 1.25;
        d = d.width;
        a = a.za;
        a[0] = 0;
        a[1] = 0 + b / 2;
        a[2] = 1;
        a[3] = 0 + d;
        a[4] = 0 + b;
        a[5] = 1;
        a[6] = 0 + d;
        a[7] = 0;
        a[8] = 1;
        pk(a, a);
        b = c[0];
        d = c[1];
        var e = c[2], g = c[3], k = c[4], l = c[5], m = c[6], n = c[7],
            p = c[8], r = a[0], u = a[1], t = a[2], v = a[3], y = a[4], D = a[5], z = a[6], A = a[7];
        a = a[8];
        c[0] = b * r + g * u + m * t;
        c[1] = d * r + k * u + n * t;
        c[2] = e * r + l * u + p * t;
        c[3] = b * v + g * y + m * D;
        c[4] = d * v + k * y + n * D;
        c[5] = e * v + l * y + p * D;
        c[6] = b * z + g * A + m * a;
        c[7] = d * z + k * A + n * a;
        c[8] = e * z + l * A + p * a;
        return !f
    };
    function pC(a, b) {
        this.G = a;
        this.B = new Cm;
        this.A = b;
        this.F = new gC;
        this.D = null;
        this.H = E(this.G.Vc, this.G);
        this.I = xl();
        this.J = xl();
        this.K = xl();
        this.C = []
    }

    pC.prototype.Qa = function () {
        0 != this.C.length && kC(this.F, this.B, this.A, this.H)
    };
    function qC(a) {
        pm(rC, a.B);
        var b = a.B.A, c = a.B.B, d = a.B.D, e = a.B.F, f = a.B.G - a.B.C, g = d - b, k = e - c, l = f - 0, m = Jl(), n = xl(), p = xl();
        yl(n, b, c, 0);
        cm(n, n);
        yl(p, d, e, f);
        cm(p, p);
        El(n, sC);
        Wl(m, n, p, sC);
        Sl(m, m);
        Ml(m, 2, tC);
        Ml(m, 1, sC);
        Cl(tC, 3.2, tC);
        Cl(sC, 1, sC);
        Al(n, tC, n);
        Al(n, sC, n);
        em(n, n);
        b = Em(a.B);
        b.A = n[0];
        b.B = n[1];
        b.C = n[2];
        b.H = n[0] + g;
        b.I = n[1] + k;
        b.J = n[2] + l;
        qm(a.B, b)
    }

    var tC = xl(), sC = xl(), kz = Jl();

    function uC(a, b) {
        for (var c = null, d = 90, e = 0; e < Q(b, 19); e++) {
            var f = new Qs(sd(b, 19, e));
            if (K(f.eb(), 0)) {
                var g = Math.abs(Lb(a, M(f, 0)));
                g < d && (c = f, d = g)
            }
        }
        if (!c)return null;
        a = new Mh;
        U(a, c.eb());
        return a
    };
    function vC(a, b, c) {
        this.O = a;
        this.I = b;
        this.F = new Cm;
        this.A = c;
        a = new gC;
        b = new Rz;
        Xz(b, [0, 0, 0, .4]);
        b.A = new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 0, -1, 0, -1, 0, 0, -1, 1, 0]);
        b.translate(0, 0, .01);
        Zz(b, .5);
        c = Tz();
        Xz(c, [0, 0, 0, .1]);
        c.translate(0, 0, .001);
        Zz(c, .92);
        var d = Tz();
        Xz(d, [1, 1, 1, .4]);
        $l(mz(d), Math.PI / 2);
        Vz(d, [c, b]);
        jC(a, [d, c, b]);
        this.ja = d;
        b = Uz();
        Xz(b, [1, 1, 1, .4]);
        c = [0, 0, 0, .4];
        b.C || (b.C = [1, 1, 1, 1]);
        b.C[0] = c[0];
        b.C[1] = c[1];
        b.C[2] = c[2];
        b.C[3] = c[3];
        $l(mz(b), Math.PI / 2);
        b.scale(3.23606798, 2, 1);
        this.Y = b;
        a.add(this.Y);
        var e = [0, 0, 0, .1];
        b = [1, 1, 1, .3];
        c = Uz();
        Xz(c, e);
        c.scale(1.9, .15, 1);
        d = Uz();
        Xz(d, e);
        d.translate(0, .5125, 0);
        d.scale(.15, .875, 1);
        var f = Uz();
        Xz(f, e);
        f.translate(0, -.5125, 0);
        f.scale(.15, .875, 1);
        e = Uz();
        Xz(e, b);
        e.scale(2, .25, 1);
        e.translate(0, 0, .001);
        var g = Uz();
        Xz(g, b);
        g.translate(0, .5625, .001);
        g.scale(.25, .875, 1);
        var k = Uz();
        Xz(k, b);
        k.translate(0, -.5625, .001);
        k.scale(.25, .875, 1);
        b = [c, d, f, e, g, k];
        jC(a, b);
        c = new Rz;
        $l(mz(c), Math.PI / 2);
        bm(mz(c), Math.PI / 4);
        Vz(c, b);
        this.aa = c;
        this.K = a;
        this.G = !0;
        this.H = this.J = !1;
        this.D =
            new Bm;
        this.M = xl();
        this.N = !1;
        this.X = new Bm;
        this.U = this.P = 0;
        this.B = this.C = null;
        this.L = !0;
        this.ea = xl();
        this.xa = xl();
        this.fa = xl();
        this.ia = xl();
        this.na = xl();
        this.Da = xl();
        this.za = new Mh;
        this.$ = E(this.I.Vc, this.I)
    }

    var wC = xl(), xC = xl(), yC = xl();
    vC.prototype.isEnabled = h("G");
    function Lx(a, b) {
        (a.G = b) ? zC(a, a.F.W() / 2, a.F.H / 2) : jp(a.O)
    }

    function AC(a) {
        return !!a && .9 < a[2]
    }

    function BC(a) {
        a = a.G && a.J ? a.D.A : null;
        return !!a && .9 >= a[2] && -.9 <= a[2]
    }

    function uz(a) {
        return a.N ? a.M : null
    }

    vC.prototype.Qa = function () {
        if (this.G) {
            var a;
            var b = this.C, c = b && b.Fa();
            a = this.aa;
            var d = this.Y, e = this.ja;
            d.B.hidden = !0;
            e.B.hidden = !0;
            var f = this.D.origin, g = this.D.A, k = this.B && this.B.ha();
            if (cp(b) && k && f && g) {
                this.K && (b = b.Ob(), this.K.G = b);
                var b = this.ea, l = this.xa, m = this.na, n = this.fa, p = this.Da, r = this.ia, u = jh(c.ha());
                im(ph(u), qh(u), rh(u), b);
                k = jh(k);
                fm(ph(k), qh(k), rh(k) - M(c, 23), n);
                var c = this.I, k = this.F, u = xl(), t = 1 / k.I, v = k.na, y = n[1], D = n[2];
                v[0] = (n[0] - k.D) * t;
                v[1] = (y - k.F) * t;
                v[2] = (D - k.G) * t;
                v[3] = 1;
                Ll(k.N, Fm(k));
                Vl(k.N,
                    v, v);
                t = 1 / v[3];
                v[0] *= t;
                v[1] *= t;
                v[2] *= t;
                t = u || xl();
                y = v[1];
                D = v[2];
                t[0] = .5 * (v[0] + 1) * k.W();
                t[1] = .5 * (-y + 1) * k.H;
                t[2] = .5 * (D + 1);
                x(c) ? (c.Tc(u[0], u[1], this.X), c = this.X.A, yl(p, c[0], c[1], c[2]), AC(p) || yl(p, 0, 0, 1)) : yl(p, 0, 0, 1);
                cm(n, n);
                cm(f, l);
                CC(f, g, l, m);
                CC(f, p, l, p);
                El(l, r);
                AC(this.G && this.J ? this.D.A : null) ? (Bl(n, b, xC), Fl(xC, r, wC), Fl(m, wC, xC), Al(xC, l, xC), Yz(e, l, xC, r), this.H && Zl(mz(e), .4, .4, .4), e.B.hidden = !1) : BC(this) && (Yz(d, l, m, r), f = Math.min(this.H ? .4 : 1, Math.sqrt(Gl(l, b)) / 5), Zl(mz(d), f, f, f), d.B.hidden = !1);
                a.B.hidden = !1;
                this.L || (d.B.hidden = !0, e.B.hidden = !0, a.B.hidden = !0);
                Bl(n, b, xC);
                Fl(xC, r, wC);
                Fl(p, wC, xC);
                Al(xC, n, xC);
                Yz(a, n, xC, r);
                this.H && Zl(mz(a), .4, .4, .4);
                a = !0
            } else a = !1;
            a && kC(this.K, this.F, this.A, this.$)
        }
    };
    function zC(a, b, c) {
        a.P = b;
        a.U = c;
        var d = a.P, e = a.U, f = a.I;
        c = !1;
        b = !!f.Tc(d, e, a.D);
        var g = AC(a.D.A), k = a.za;
        x(f) && f.Ud(d, e, k) ? (a.B || (a.B = new Mh), U(a.B, k), cp(a.C) && g && Ms(a.B, Ys(a.C.Ea())) && (c = !0)) : c = !0;
        d = a.C && a.C.Fa();
        a.H = !!d && 2 == L(d, 6, 1);
        c && a.C && (d ? (e = Hb(-Kb(a.F.O)), a.B = uC(e, d), a.B && (f = Rh(a.B), c = a.B.sa(), DC(a, f), $u(a.C.tb(), c, f), c = jh(d.ha()), d = kh(f), K(d, 1) || K(d, 2) || (e = e * Math.PI / 180, f = Math.sin(e), g = 180 / Math.PI / 6371010, k = g / Math.cos(qh(c)), d.data[2] = qh(c) + 40 * g * Math.cos(e), d.data[1] = ph(c) + 40 * k * f))) : a.B = null);
        a.B && DC(a, Rh(a.B));
        a.J = !!a.B && b;
        jp(a.O)
    }

    function DC(a, b) {
        if (cp(a.C)) {
            var c = a.C.ha(), d = !0;
            a.N = !1;
            BC(a) && (c = jh(c), im(ph(c), qh(c), rh(c), wC), c = jh(b), im(ph(c), qh(c), rh(c), xC), Bl(xC, wC, yC), d = 60 < Dl(yC));
            d ? od(b, 1) : a.D.origin && (a.N = !0, zl(a.M, a.D.origin))
        }
    }

    function CC(a, b, c, d) {
        gm(a[0], a[1], a[2], wC, void 0);
        wC[0] = Kb(wC[0]);
        wC[1] = Kb(wC[1]);
        Cl(b, hm(wC[1]), d);
        Al(a, d, d);
        cm(d, d);
        Bl(d, c, d);
        El(d, d)
    }

    vC.prototype.clear = function () {
        this.B = this.C = null
    };
    function EC() {
    }

    EC.prototype.A = aa();
    function FC(a, b) {
        if (a) {
            var c = a.Ea();
            if (c) {
                a = [];
                b = !!b;
                for (var c = Ys(c).da(), d = 0; d < Q(c, 5); d++)for (var e = $g(c, d), f = 0; f < Q(e, 9); f++) {
                    var g = new Kd(sd(e, 9, f)), k = g.ma(), l;
                    (l = !b) || (l = new Ed(g.data[0]), l = K(l, 1) || K(l, 0) || !K(g, 5) ? !1 : !0);
                    l && 0 < Q(k, 1) && a.push(g)
                }
            } else a = [];
            a = 0 < a.length
        } else a = !1;
        return a
    };
    function GC(a, b, c, d, e, f) {
        V.call(this, "AN", wb(arguments))
    }

    G(GC, V);
    function HC() {
        this.L = !1
    }

    HC.prototype.ra = function (a) {
        this.L || (this.L = !0, this.ga(a))
    };
    HC.prototype.ga = aa();
    function IC(a) {
        this.L = !1;
        this.B = a;
        this.A = []
    }

    G(IC, HC);
    q = IC.prototype;
    q.ga = function () {
        for (var a = 0, b = this.A.length; a < b; ++a)this.B.Zc(this.A[a]);
        this.A = []
    };
    q.Zc = function (a) {
        this.B.Zc(a);
        null != a && tb(this.A, a)
    };
    q.Sb = function (a, b, c, d) {
        a = this.B.Sb(a, b, c, d);
        null != a && this.A.push(a);
        return a
    };
    q.xc = function (a, b, c, d, e, f) {
        a = this.B.xc(a, b, c, d, e, f);
        null != a && this.A.push(a);
        return a
    };
    q.tc = function () {
        return this.B.tc()
    };
    var JC = "dragstart drag dragend keypress keydown keyup".split(" ");

    function KC(a) {
        void 0 !== w.history.replaceState ? w.history.replaceState(w.history.state, document.title, a) : w.history.href = a;
        LC()
    }

    function LC() {
        if (w.Mi) {
            var a = w.Mi;
            if (a.Nh && ya(a.Nh) && a.Oh && ya(a.Oh) && a.Re && ya(a.Re)) {
                var b = a.Nh(), c = a.Oh();
                b && a.Re(b);
                for (b = 0; b < c.length; b++)a.Re(c[b])
            }
        }
    };
    function MC(a) {
        this.A = Jy(Hy(), "in");
        (new IC(a)).Sb("popstate", this, this.Yk);
        this.B = !1;
        this.C = Jy(Hy());
        this.C.listen(this.Tk, this);
        this.D = Iy(Hy())
    }

    q = MC.prototype;
    q.listen = function (a, b) {
        this.A.listen(a, b)
    };
    q.set = function (a, b) {
        var c = new kr(w.location.href);
        c.A.set("viewerState", a);
        "lb" === a || "im" === a ? (this.B ? (c = c.toString(), void 0 !== w.history.replaceState ? w.history.pushState(null, document.title, c) : w.history.href = c, LC()) : ("lb" === a && (this.B = !0), c = c.toString(), KC(c)), NC(c)) : "ga" === a && (this.B = !0, c = c.toString(), KC(c), NC(c));
        this.A.set(a, b)
    };
    q.get = function () {
        return this.A.get() || "in"
    };
    q.Yk = function (a) {
        var b = this.get(), c;
        c = (c = (new kr(w.location.href)).A.get("viewerState")) ? c : "in";
        "in" !== c && ("lb" === b && "ga" === c ? this.set("ltgl", a) : this.A.set(c, a))
    };
    q.Tk = function () {
        var a = this.D.get(), b = this.C.get();
        a && void 0 !== b && (a = Vg(a.eb(b).da()), b = Le(), a = Xw(a.ib(), b), b = new kr(w.location.href), b.A.set("imagekey", a), a = b.toString(), KC(a), NC(a))
    };
    q.bind = function (a, b, c) {
        Dy(this.D, a, c);
        Dy(this.C, b, c)
    };
    function NC(a) {
        try {
            if (a != w.parent.location.href && w.parent && w.parent.google && x(w.parent.google.uvPubSub)) {
                var b = new kr(a);
                w.parent.google.uvPubSub.Cn("uup", b.D + "?" + b.A.toString())
            }
        } catch (c) {
        }
    };
    function aD(a, b) {
        this.C = a;
        this.A = b
    }

    aD.prototype.B = function (a, b) {
        var c;
        c = Ns(a);
        c || (c = jh(a.ha()), c = K(c, 2) && K(c, 1) ? qh(c) + "," + ph(c) : "");
        if (!c)return null;
        var d = vl(this.A, c);
        d || (d = this.C.B(a, b), ul(this.A, c, d));
        return d
    };
    aD.prototype.clear = function () {
        this.A.clear()
    };
    function bD(a, b) {
        V.call(this, "CPS", wb(arguments))
    }

    G(bD, V);
    function mD(a, b) {
        V.call(this, "FPS", wb(arguments))
    }

    G(mD, V);
    function nD() {
        V.call(this, "NCS", wb(arguments))
    }

    G(nD, V);
    function oD(a, b) {
        V.call(this, "PPS", wb(arguments))
    }

    G(oD, V);
    function pD(a, b, c, d) {
        V.call(this, "PTI", wb(arguments))
    }

    G(pD, V);
    function qD(a) {
        V.call(this, "SPS", wb(arguments))
    }

    G(qD, V);
    function rD(a) {
        V.call(this, "SPTS", wb(arguments))
    }

    G(rD, V);
    function sD() {
        Zp.call(this)
    }

    G(sD, Zp);
    sD.prototype.Fa = function () {
        return this.A ? this.A.Fa() : null
    };
    function tD(a) {
        ol.call(this);
        this.D = "" + Aa(this);
        this.C = new eh;
        this.B = null;
        this.A = new Vs;
        U(Zs(this.A), a)
    }

    G(tD, ol);
    q = tD.prototype;
    q.kb = da(3);
    q.Ea = h("A");
    q.Fa = da(null);
    q.id = h("D");
    q.Gb = C;
    q.Tb = function (a) {
        a(3)
    };
    q.ha = h("C");
    q.Ec = ba("B");
    q.da = h("B");
    function uD(a, b, c) {
        this.C = a;
        this.K = b;
        this.A = c;
        this.N = this.I = this.H = this.L = this.G = this.F = null;
        this.M = new nD;
        this.J = null;
        this.D = new Qr(this.C)
    }

    uD.prototype.clear = C;
    uD.prototype.B = function (a, b) {
        if (Sr(Ns(a)))return vD(this, a, b);
        var c = Ds(a);
        if (c && (4 === L(a, 1, 99) || 3 == L(Wg(a.da()), 0) || 10 == L(Wg(a.da()), 0))) {
            var c = wD(this), d = new aq;
            c.get(function (b, c) {
                $p(d, b.B(a, c))
            }, b);
            return d
        }
        var e = xD(this, a);
        if (!e)return null;
        if (Es(a))return c = new pD(e, a, yD(a)), d = new sD, c.get(function (a) {
            $p(d, a)
        }, b), d;
        if (c)return c = new Lz(e, a), d = new aq, c.get(function (a) {
            $p(d, a)
        }, b), d;
        if (Fs(a))return new tD(a);
        kb("Unable to getRenderable for: " + ud(a));
        return null
    };
    function vD(a, b, c) {
        var d = Ns(b), e = new Ur(a.C, d), d = new ht(d);
        a = new Lz(new st(d, e, a.K), b);
        var f = new aq;
        a.get(function (a) {
            $p(f, a)
        }, c);
        return f
    }

    function xD(a, b) {
        var c;
        c = O(a.A, 75) ? zD(a) : a.M;
        b = AD(a, b);
        return c && b ? new st(c, b, a.K) : null
    }

    function AD(a, b) {
        var c = Wg(b.da());
        if (K(c, 0) && K(c, 1))switch (L(c, 0)) {
            case 1:
                return 3 == L(c, 1) && K(c.eb(), 0) && !Gs(b) ? new rD(BD(a)) : CD(a);
            case 2:
                return 3 == L(c, 1) ? (a.F || (a.F = new bD(a.D, Lc(a.A.data, 13))), a = new rD(a.F)) : a = DD(a), a;
            case 10:
            case 8:
            case 3:
                return new rD(BD(a));
            case 4:
                return new rD(ED(a))
        }
        b = Ph(b);
        return 1 === b || 2 === b || 11 === b || 13 === b || 5 === b || 4 === b ? DD(a) : 3 === b ? new rD(DD(a)) : 10 === b ? new rD(ED(a)) : 12 === b || 15 === b ? new rD(BD(a)) : 27 === b ? CD(a) : null
    }

    function yD(a) {
        var b = Wg(a.da());
        if (K(b, 0) && K(b, 1))switch (L(b, 0)) {
            case 2:
                return 3 == L(b, 1) ? [0, 0, 0, 0, 85, 320, 512, 768, 1024] : [];
            case 1:
            case 8:
            case 3:
            case 10:
                return [512, 1024, 1536];
            case 4:
                return [512, 1024, 1280]
        }
        a = Ph(a);
        return 10 === a ? [512, 1024, 1280] : 12 === a || 15 === a ? [512, 1024, 1536] : 3 === a ? [0, 0, 0, 0, 85, 320, 512, 768, 1024] : []
    }

    function ED(a) {
        a.L || (a.L = new oD(a.D, O(a.A, 64)));
        return a.L
    }

    function BD(a) {
        a.I || (a.I = new mD(a.D, Lc(a.A.data, 73)));
        return a.I
    }

    function DD(a) {
        a.G || (a.G = new nt(a.D, Lc(a.A.data, 13)));
        return a.G
    }

    function wD(a) {
        if (!a.H) {
            var b = null;
            O(a.A, 75) && (b = zD(a));
            a.H = new pt(a.C, a.K, Lc(a.A.data, 73), b)
        }
        return a.H
    }

    function CD(a) {
        a.N || (a.N = new qD(a.C));
        return a.N
    }

    function zD(a) {
        if (!a.J) {
            var b = new sf;
            b.data[0] = O(new bh(a.A.data[16]), 0);
            b.data[1] = O(new bh(a.A.data[16]), 1);
            a.J = new Ew(O(a.A, 75), O(a.A, 85), nd(a.A, 86), a.C, K(a.A, 87) ? O(a.A, 87) : "maps_sv.tactile", b, a.A.A ? new Se(a.A.data[89]) : null)
        }
        return a.J
    };
    function FD(a, b, c, d, e, f) {
        ol.call(this);
        this.D = b;
        this.M = c;
        this.C = d;
        this.I = e;
        this.F = !1;
        this.J = new eh;
        this.A = new Tn(0, 0, 0, 0);
        this.L = 0;
        this.H = !1;
        this.B = null;
        this.G = !1;
        var g = this;
        this.D.C(function (b, c) {
            g.G && (b.ac(c), g.G = !1);
            al(b, "ViewportReady", function () {
                g.D == GD(g) && (g.F = !0, g.dispatchEvent(new Kk("ViewportReady", g)))
            });
            g.H && (jp(a), g.H = !1)
        }, f);
        this.C && this.C.C(function (b, c) {
            g.G && (b.ac(c), g.G = !1);
            al(b, "ViewportReady", function () {
                g.C == GD(g) && (g.F = !0, g.dispatchEvent(new Kk("ViewportReady", g)))
            });
            g.H && (jp(a),
                g.H = !1)
        }, f)
    }

    G(FD, ol);
    q = FD.prototype;
    q.yc = function (a, b) {
        U(this.J, a);
        var c = this;
        GD(this).get(function (a, b) {
            a.yc(c.J, b)
        }, b)
    };
    q.hc = function (a, b, c) {
        var d = !!qb(a, function (a) {
            var b;
            if (b = !!a.Ea()) b = (a = Ys(a.Ea())) ? K(Wg(a.da()), 0) ? 1 == L(Wg(a.da()), 0) : 7 == L(a, 1, 99) : !1;
            return b
        });
        HD(this, d && this.C ? this.C : this.D);
        var e = this;
        GD(this).get(function (b, d) {
            b.yc(e.J, d);
            b.bd(e.L, d);
            b.zc(e.A.top, e.A.right, e.A.bottom, e.A.left, d);
            b.hc(a, d, c)
        }, b)
    };
    q.clear = function () {
        this.D.B() && this.D.A().clear();
        this.C && this.C.B() && this.C.A().clear()
    };
    q.Qa = function () {
        this.F = !1;
        var a = GD(this);
        a.B() ? a.A().Qa() : this.H = !0
    };
    q.ac = function (a) {
        this.F = !1;
        var b = GD(this);
        b.B() ? b.A().ac(a) : this.G = !0
    };
    q.zc = function (a, b, c, d, e) {
        this.A.top = a;
        this.A.right = b;
        this.A.bottom = c;
        this.A.left = d;
        var f = this;
        GD(this).get(function (a, b) {
            a.zc(f.A.top, f.A.right, f.A.bottom, f.A.left, b);
            a.Qa()
        }, e)
    };
    q.ad = h("F");
    function GD(a) {
        if (a.B)return a.B;
        HD(a, a.D);
        return a.D
    }

    function HD(a, b) {
        a.B != b && (a.B && a.B.B() && a.B.A().clear(), a.B = b, b = a.B == a.D, a.M && fo(a.M, b), a.I && (fo(a.I, !b), b = b ? "0" : "100%", $n(a.I, b, b)))
    }

    q.bd = function (a, b) {
        this.L = a;
        var c = this;
        GD(this).get(function (a, b) {
            a.bd(c.L, b)
        }, b)
    };
    function ID(a, b, c, d, e, f) {
        FD.call(this, a, b, c, d, e, f)
    }

    G(ID, FD);
    ID.prototype.Ud = function (a, b, c) {
        var d = GD(this);
        return d.B() ? d.A().Ud(a, b, c) : null
    };
    ID.prototype.Tc = function (a, b, c) {
        var d = GD(this);
        return d.B() ? d.A().Tc(a, b, c) : null
    };
    ID.prototype.Vc = function (a, b) {
        var c = GD(this);
        return c.B() ? c.A().Vc(a, b) : null
    };
    ID.prototype.$d = function (a) {
        var b = GD(this);
        b.B() ? b.A().$d(a) : (a[0] = 1, a[1] = 179)
    };
    function JD(a, b, c) {
        V.call(this, "WPNR", wb(arguments))
    }

    G(JD, V);
    function KD(a, b, c, d, e, f, g, k) {
        this.G = a;
        e = new uD(e, this.G.A, d);
        this.fa = new aD(e, new tl(30));
        this.ja = 2 === L(d, 20, 1);
        this.Y = !0;
        var l;
        e = b.B;
        if (c.zb && this.ja) {
            l = this.G;
            var m = b.canvas.A;
            b = b.B;
            var n = new Ij(l, c.zb, bk("CANVAS"), void 0), p = new iw(l, b);
            l = new ID(l, n, m, p, b, k)
        } else c.Ta && 1 === L(d, 20, 1) ? (l = this.G, m = b.canvas.A, b = b.B, n = new JD(l, c.Ta, void 0), p = new iw(l, b), l = new ID(l, n, m, p, b, k)) : e && (b = this.G, l = new iw(b, e), l = new ID(b, l, e, null, null, k));
        this.F = l;
        this.X = this.aa = !1;
        c.A = e || c.A;
        this.B = new vC(a, this.F, c);
        this.O =
            new pC(this.F, c);
        this.M = !1;
        this.P = null;
        this.H = 0;
        this.ia = nd(d, 88) && !nd(d, 92);
        this.A = new GC(this.F, c, a, f, g, this.ia);
        this.C = null;
        this.D = !1;
        this.K = void 0;
        this.N = null;
        this.J = void 0;
        this.I = this.L = null;
        this.Da = C;
        this.xa = nd(d, 88);
        this.U = null;
        this.$ = Iy(Hy());
        this.$.listen(this.za, this);
        this.ea = {}
    }

    function LD(a, b) {
        var c = Ns(b);
        return c ? a.ea[c] || b : b
    }

    function jz(a, b, c, d) {
        zC(a.B, b, c);
        var e = a.B.B;
        e && (e = Cs(e));
        !a.H || !a.P || e && td(a.P, e) || (Qy(a.H), a.H = 0);
        !a.H && e && (a.P = e, a.H = Py(function () {
            (e = a.B.B) && td(a.P, e) && Ix(a, e, d).Gb(d);
            a.H = 0
        }, 250, d, "prd-update-cursor"))
    }

    function Jx(a, b, c, d) {
        a.C = b;
        a.C.listen("TileReady", function (b) {
            a.Da(b, c)
        });
        a.K = d;
        a.B.clear();
        a.B.C = b;
        Jz(a, c)
    }

    function Jz(a, b) {
        a.D = a.xa && FC(a.C, a.ia);
        a.D && a.A.get(function (b, d) {
            b.I(a.C);
            b.A(a.U);
            d.ta("arp");
            jp(a.G)
        }, b)
    }

    function tz(a, b, c) {
        return a.D && a.A.B() ? a.A.A().F(b, c) : !1
    }

    function MD(a, b, c) {
        if (a.D && a.A.B()) {
            var d = a.A.A();
            if (a = a.C ? a.C.ha() : null)return d.C(b, c, a)
        }
        return null
    }

    function Az(a, b) {
        return (a = a.C.Fa()) && Q(a, 19) ? uC(b, a) : null
    }

    KD.prototype.Qa = function () {
        this.F.Qa();
        this.B.Qa();
        this.M && this.O.Qa();
        ND(this)
    };
    function Yy(a, b) {
        a.U = b;
        a.D && a.A.B() && a.A.A().A(b)
    }

    function ND(a) {
        if (a.D && a.A.B()) {
            var b = a.A.A();
            b.G();
            b.A(a.U)
        }
    }

    function Fz(a, b) {
        a.X = !1;
        OD(a);
        a.L = new ey(15E3, function () {
            a.C = null;
            a.K = void 0;
            a.N = null;
            a.J = void 0;
            a.I && a.I();
            a.fa.clear();
            a.F.clear();
            a.B.clear()
        }, "clear-pano-render-cache");
        a.L.start(b);
        a.H && (Qy(a.H), a.H = 0)
    }

    function Kx(a, b) {
        var c = [], d = [];
        if (a.C) {
            a.K || (a.K = new Zo, a.K.data[0] = 1);
            var e = a.C, f = a.K;
            e && (c.push(e), f.data[4] = a.Y ? 1 : 0, d.push(f))
        }
        a.N && (a.J || (a.J = new Zo, a.J.data[0] = 1), e = a.N, f = a.J, e && (c.push(e), f.data[4] = a.Y ? 1 : 0, d.push(f)));
        a.F.hc(c, b, d);
        jp(a.G)
    }

    function Hx(a, b, c) {
        var d = Ix(a, b, c);
        if (d) {
            Jx(a, d, c, void 0);
            a.N = null;
            a.J = void 0;
            Lx(a.B, !0);
            Kx(a, c);
            var e = E(function () {
                var a = this.O, b = this.C;
                if (b && !(a.D && b.da() && td(Vg(b.da()), Vg(a.D.da())))) {
                    var c = b.Fa();
                    if (c) {
                        a.D = b;
                        a.C = [];
                        a.F.A = [];
                        var d = jh(c.ha()), b = kz, e = a.I, f = a.J;
                        im(ph(d), qh(d), 0, e);
                        im(ph(d), qh(d) + 1E-5, 0, f);
                        d = a.K;
                        zl(d, e);
                        El(d, d);
                        Wl(b, e, f, d);
                        Sl(b, b);
                        b = Q(c, 19);
                        for (e = 0; e < b; e++)if (f = new Qs(sd(c, 19, e)), K(f.eb(), 0)) {
                            var r = [0, 0, 0, 1, .6, 0, 1, 0, 0, 0, -.6, 0, -1, 0, 0, -1, .6, 0], d = new Rz;
                            Xz(d, [.9, .9, .9, 1]);
                            var u = new Float32Array(r);
                            d.A = u;
                            $l(mz(d), Math.PI / 2);
                            Zz(d, .25);
                            u = new Rz;
                            Xz(u, [0, 0, 0, .6]);
                            r = new Float32Array(r);
                            u.A = r;
                            $l(mz(u), Math.PI / 2);
                            Zz(u, .25);
                            u.translate(0, 0, .15);
                            d = [u, d];
                            u = new Rz;
                            Vz(u, d);
                            jC(a.F, d);
                            var r = a, t = M(f, 0);
                            Kl(mz(u), kz);
                            if (K(r.D.ha(), 1)) {
                                var v = M(lh(r.D.ha()), 1), r = th(lh(r.D.ha()));
                                am(mz(u), Jb(-r));
                                $l(mz(u), Jb(v - 90));
                                am(mz(u), Jb(r))
                            }
                            am(mz(u), Jb(-t));
                            u.translate(0, 0, -.75);
                            for (r = 0; r < d.length; r++)a.C.push({shape: d[r], target: f.eb()})
                        }
                    }
                }
            }, a), f = E(aa(), a);
            PD(a, b, function (a, b) {
                e();
                f();
                a && b.ta("vrp")
            }, c)
        }
    }

    var rC = new eh;

    function Ez(a) {
        return a.C ? (a = a.C.Ea()) ? Zs(a) : null : null
    }

    function Ix(a, b, c) {
        if (!b)return null;
        (a = a.fa.B(LD(a, b), c)) && a.Gb(c);
        return a
    }

    function Gz(a, b, c) {
        U(rC, b);
        Sy(rC);
        pm(rC, a.B.F);
        qC(a.O);
        a.D && a.A.get(function (a) {
            a.H(rC)
        }, c);
        a.F.yc(rC, c);
        a.aa = !0;
        jp(a.G)
    }

    function Mx(a, b, c, d) {
        function e() {
            d && !g && (g = !0, d(!f, c))
        }

        Ix(a, Ys(b), c);
        var f = !1, g = !1;
        e();
        return new Cr(function () {
            f = !0;
            e()
        })
    }

    function wz(a, b, c, d) {
        function e(a, b, d, e) {
            e && U(Qh(f), e);
            c(a, b, d, f)
        }

        var f = new Mh;
        U(f, b);
        return QD(a, f, e, e, d)
    }

    function PD(a, b, c, d) {
        QD(a, b, function (b, d, g) {
            if (a.F.ad()) c(b, g); else {
                g.la("pano-wait-for-content");
                var e = hl(a.F, "ViewportReady", function () {
                    a.I = null;
                    c(b, g);
                    g.done("pano-wait-for-content")
                });
                a.I && a.I();
                a.I = function () {
                    jl(e);
                    a.I = null;
                    g.done("pano-wait-for-content")
                }
            }
        }, function (a, b, d) {
            c(a, d)
        }, d)
    }

    function QD(a, b, c, d, e) {
        if (!b)return d(!1, null, e, null), new EC;
        var f = Ix(a, b, e);
        if (!f)return d(!1, null, e, null), new EC;
        var g = !1;
        f.Tb(e.ua(function (a) {
            g || 0 === a ? d(!1, null, e, null) : 4 === a ? d(!1, null, e, f.da()) : c(!0, f.ha(), e, f.da())
        }, "pano-wait-for-content"));
        return new Cr(function () {
            g = !0
        })
    }

    KD.prototype.Jb = C;
    KD.prototype.na = bj;
    function Cz(a, b, c) {
        return b && (a = Ix(a, b, c), cp(a) && K(a.Fa(), 23)) ? M(a.Fa(), 23) : null
    }

    KD.prototype.xb = function () {
        this.X = !0;
        OD(this)
    };
    function OD(a) {
        a.L && a.L.A();
        a.L = null
    }

    KD.prototype.za = function () {
        var a = this.$.get();
        a && (a = "im" == a, a !== this.M && jp(this.G), this.M = a)
    };
    function RD(a, b, c, d, e, f, g, k) {
        d.getContext(function (b, m) {
            a(new KD(c, d, b, e, f, g, k, m))
        }, b)
    };
    function SD(a, b) {
        this.A = a;
        this.D = ua(b) ? b : [b];
        this.B = [];
        this.C = []
    }

    SD.prototype.Zc = function (a) {
        this.A.Zc(a);
        if (null != a && (tb(this.C, a), 0 == this.C.length && 0 < this.B.length)) {
            for (a = 0; a < this.B.length; a++) {
                var b = this.A.tc(), c = this.B[a];
                TD(c);
                for (var d = !1, e = 0; e < b.A.length; ++e)if (b.A[e] === c) {
                    b.A.splice(e, 1);
                    d = !0;
                    break
                }
                if (!d)for (e = 0; e < b.B.length; ++e)if (b.B[e] === c) {
                    b.B.splice(e, 1);
                    break
                }
                UD(b)
            }
            this.B.length = 0
        }
    };
    SD.prototype.Sb = function (a, b, c, d) {
        return this.A.Sb(a, b, c, d)
    };
    SD.prototype.xc = function (a, b, c, d, e, f) {
        a = this.A.xc(a, b, c, d, e, f);
        if (null != a) {
            if (0 == this.C.length)for (b = 0; b < this.D.length; b++) {
                c = this.A.tc();
                e = this.D[b];
                d = new VD(e);
                b:{
                    for (f = 0; f < c.A.length; f++)if (WD(c.A[f].A, e)) {
                        e = !0;
                        break b
                    }
                    e = !1
                }
                e ? c.B.push(d) : (XD(c, d), c.A.push(d), UD(c));
                c = d;
                this.B.push(c)
            }
            this.C.push(a)
        }
        return a
    };
    SD.prototype.tc = function () {
        return this.A.tc()
    };
    var YD = Hy();
    var ZD = Hy();
    var $D = Hy();

    function aE(a, b) {
        this.X = a;
        this.Y = b || 0;
        this.F = []
    }

    aE.prototype.O = function (a) {
        a.la("maps-consumer-kvo-view-redraw-later");
        this.F.push(a);
        this.K || (this.K = !0, a = this.Y, 0 == a ? this.P() : by(E(this.P, this), a))
    };
    aE.prototype.start = function () {
        this.H();
        return xj
    };
    aE.prototype.H = function () {
        this.K = !1;
        var a = this.F;
        this.F = [];
        this.M(a[0]);
        for (var b = 0; b < a.length; ++b)a[b].done("maps-consumer-kvo-view-redraw-later")
    };
    aE.prototype.P = function () {
        var a = this.X;
        a.G.push(this);
        bE(a.B)
    };
    function cE(a) {
        var b = Iy(YD, !0);
        b.listen(a.O, a);
        return b
    }

    function dE(a) {
        var b = Iy($D, void 0);
        b.listen(a.O, a);
        return b
    };
    function eE(a) {
        this.A = a || bk("CANVAS");
        this.B = [];
        this.C = 1
    }

    eE.prototype.addEventListener = function (a, b) {
        this.B.push({type: a, listener: b});
        this.A.addEventListener(a, b, !1)
    };
    eE.prototype.removeEventListener = function (a, b) {
        for (var c = 0; c < this.B.length; c++)if (b === this.B[c].listener && a === this.B[c].type) {
            this.B.splice(c, 1);
            break
        }
        this.A.removeEventListener(a, b, !1)
    };
    eE.prototype.dispatchEvent = function (a) {
        for (var b = !1, c = 0; c < this.B.length; c++)if (a.type == this.B[c].type)var d = this.B[c].listener, b = "function" === typeof d ? b | d(a) : b | d.handleEvent(a);
        return b
    };
    function fE(a, b, c, d, e, f) {
        aE.call(this, d);
        this.L = a;
        this.A = b;
        this.B = dE(this);
        this.C = cE(this);
        this.D = c;
        this.U = e;
        this.J = f;
        this.I = !1;
        this.G = new hh;
        a = this.D.A;
        0 == a.width && (a.width = 1);
        0 == a.height && (a.height = 1)
    }

    G(fE, aE);
    fE.prototype.N = function (a, b) {
        this.G = a;
        dC(this.D, this.U, w.devicePixelRatio || 1, this.G.W(), vh(this.G));
        this.J && (.75 > this.D.C && (this.I = !0), 1 <= this.D.C && (this.I = !1), this.J(this.I, b))
    };
    fE.prototype.M = function (a) {
        var b = this.B.get() || "";
        this.A.data[0] = b;
        b = !!this.C.get();
        this.A.data[2] = b;
        this.L.fill(this.A);
        gE(this.L, a.ua(C, "scene.template-render"))
    };
    function hE(a) {
        var b = {
            x: a.x,
            y: a.y,
            me: 0,
            type: a.type,
            altKey: a.altKey,
            ctrlKey: a.ctrlKey,
            shiftKey: a.shiftKey,
            metaKey: a.metaKey,
            button: a.button
        }, c = null;
        a.touches && 0 < a.touches.length ? c = a.touches : a.changedTouches && 0 < a.changedTouches.length && (c = a.changedTouches);
        var d = void 0;
        a.pointerType ? d = a.pointerType : a instanceof Ok && a.Na.pointerType && (d = a.Na.pointerType);
        b.pointerType = d;
        if (c) {
            a = c[0];
            var e = c[c.length - 1], f = a.target, c = a.clientX - f.clientLeft;
            a = a.clientY - f.clientTop;
            var d = e.clientX - f.clientLeft, e = e.clientY -
                f.clientTop, f = d - c, g = e - a;
            b.x = (c + d) / 2;
            b.y = (a + e) / 2;
            b.me = Math.sqrt(f * f + g * g)
        }
        return b
    };
    function iE(a) {
        Kk.call(this, "RenderComplete", a)
    }

    G(iE, Kk);
    function jE() {
        this.A = this.B = !1
    };
    function kE(a) {
        return (a = a.exec($a)) ? a[1] : ""
    }

    var lE = function () {
        if (tc)return kE(/Firefox\/([0-9.]+)/);
        if (bc || cc || ac)return oc;
        if (zc)return Xb() || I("iPad") || I("iPod") ? kE(/CriOS\/([0-9.]+)/) : kE(/Chrome\/([0-9.]+)/);
        if (Ac && !(Xb() || I("iPad") || I("iPod")))return kE(/Version\/([0-9.]+)/);
        if (uc || vc) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec($a);
            if (a)return a[1] + "." + a[2]
        } else if (yc)return (a = kE(/Android\s+([0-9.]+)/)) ? a : kE(/Version\/([0-9.]+)/);
        return ""
    }();
    var mE = ["webgl", "experimental-webgl", "moz-webgl"], nE = 0;

    function oE(a, b) {
        var c = b || new jE;
        b = b || new jE;
        b = {alpha: !0, stencil: !0, preserveDrawingBuffer: b.B, failIfMajorPerformanceCaveat: !b.A && !0};
        dc && !pc(25) && (b.preserveDrawingBuffer = !0);
        a:{
            for (var d = null, e = mE.length, f = 0; f < e; ++f) {
                try {
                    d = a.getContext(mE[f], b)
                } catch (g) {
                }
                if (d) {
                    b = d;
                    break a
                }
            }
            b = null
        }
        if (!b)return nE = 1, null;
        b.getExtension("WEBGL_debug_renderer_info") ? (d = b.getParameter(37446), pE = qE(d)) : pE = null;
        if (b.drawingBufferWidth != a.width || b.drawingBufferHeight != a.height)return nE = 2, null;
        if (4 > b.getParameter(35660))return nE =
            3, null;
        a = b.getParameter(3379);
        if (x(void 0) && void 0 > a)return nE = 6, null;
        if (23 > b.getShaderPrecisionFormat(35632, 36338).precision)return nE = 4, null;
        a = pE;
        return bc && !a ? (nE = 8, null) : !c.A && a && ("Intel Q45" == a && (bc || tc) || -1 != rE.indexOf(a)) ? (nE = 5, null) : b
    }

    var pE = void 0;

    function qE(a) {
        if (void 0 === a)return null;
        a = a.toLowerCase();
        var b = a.match(/angle \((.*)\)/);
        b && (a = b[1], a = a.replace(/\s*direct3d.*$/, ""));
        a = a.replace(/\s*\([^\)]*wddm[^\)]*\)/, "");
        var c = a;
        0 > c.indexOf("intel") ? b = null : (b = ["Intel"], 0 <= c.indexOf("mobile") && b.push("Mobile"), (0 <= c.indexOf("gma") || 0 <= c.indexOf("graphics media accelerator")) && b.push("GMA"), 0 <= c.indexOf("haswell") ? b.push("Haswell") : 0 <= c.indexOf("ivy") ? b.push("HD 4000") : 0 <= c.indexOf("sandy") ? b.push("HD 3000") : 0 <= c.indexOf("ironlake") ? b.push("HD") :
                            (0 <= c.indexOf("hd") && b.push("HD"), (c = c.match(sE)) && b.push(c[1].toUpperCase())), b = b.join(" "));
        if (b)return b;
        b = a;
        if (0 > b.indexOf("nvidia") && 0 > b.indexOf("quadro") && 0 > b.indexOf("geforce") && 0 > b.indexOf("nvs")) b = null; else {
            c = ["nVidia"];
            0 <= b.indexOf("geforce") && c.push("geForce");
            0 <= b.indexOf("quadro") && c.push("Quadro");
            0 <= b.indexOf("nvs") && c.push("NVS");
            b.match(/\bion\b/) && c.push("ION");
            b.match(/gtx\b/) ? c.push("GTX") : b.match(/gts\b/) ? c.push("GTS") : b.match(/gt\b/) ? c.push("GT") : b.match(/gs\b/) ? c.push("GS") :
                            b.match(/ge\b/) ? c.push("GE") : b.match(/fx\b/) && c.push("FX");
            var d = b.match(sE);
            d && c.push(d[1].toUpperCase().replace("GS", ""));
            0 <= b.indexOf("titan") ? c.push("TITAN") : 0 <= b.indexOf("ti") && c.push("Ti");
            b = c.join(" ")
        }
        if (b)return b;
        c = a;
        0 > c.indexOf("amd") && 0 > c.indexOf("ati") && 0 > c.indexOf("radeon") && 0 > c.indexOf("firegl") && 0 > c.indexOf("firepro") ? b = null : (b = ["AMD"], 0 <= c.indexOf("mobil") && b.push("Mobility"), d = c.indexOf("radeon"), 0 <= d && b.push("Radeon"), 0 <= c.indexOf("firepro") ? b.push("FirePro") : 0 <= c.indexOf("firegl") &&
                b.push("FireGL"), 0 <= c.indexOf("hd") && b.push("HD"), (c = (0 <= d ? c.substring(d) : c).match(sE)) && b.push(c[1].toUpperCase().replace("HD", "")), b = b.join(" "));
        return b ? b : a.substring(0, 100)
    }

    var sE = /([a-z0-9]*\d+[a-z0-9]*)/, rE = "microsoft basic render driver;vmware svga 3d;Intel 965GM;Intel B43;Intel G41;Intel G45;Intel G965;Intel GMA 3600;Intel Mobile 4;Intel Mobile 45;Intel Mobile 965".split(";");

    function tE(a, b) {
        this.L = !1;
        var c = this;
        this.D = a;
        this.A = b;
        this.F = new vq(this);
        xq(this.F, a, "RenderComplete", this.N, !1, this);
        this.G = this.C = this.B = null;
        uE++;
        this.I = this.H = !1;
        this.K = new vE(b, this);
        b.Ta && this.F.listen(b.Ta, "webglcontextrestored", function () {
            wE(c, "contextrestored");
            jp(a)
        });
        this.J = cy(function () {
            wE(c, "timer")
        })
    }

    G(tE, HC);
    var uE = 1;

    function xE(a) {
        if (a.I || !a.B) a = !1; else if (a = a.B, a.C)if (a.X) {
            var b = a.C.kb();
            a = a.F.ad() && !a.aa && (2 == b || 3 == b || 4 == b)
        } else a = !1; else a = !0;
        return a
    }

    function yE(a, b) {
        xE(a) ? b() : a.C ? a.C.push(b) : a.C = [b]
    }

    tE.prototype.N = function () {
        var a = xE(this), b = this.B ? this.B.na() : !1;
        this.H != a && (this.H = a) && (this.D.A.za(0), F());
        if (this.C && a) {
            a = this.C;
            this.C = null;
            for (var c = 0; c < a.length; c++)a[c]()
        }
        if (this.G && b)for (b = this.G, this.G = null, a = 0; a < b.length; a++)b[a]()
    };
    function wE(a, b) {
        var c = a.K;
        zE(c, b);
        if (!c.C) {
            c.C = !0;
            var d = a.D.A;
            yE(a, function () {
                iq(d, c, jq(0, !1))
            })
        }
    }

    tE.prototype.ga = function () {
        this.F.ra();
        w.clearInterval(this.J)
    };
    function vE(a, b) {
        this.A = a;
        this.C = !1;
        this.B = {};
        this.D = "";
        this.F = b.D.A
    }

    vE.prototype.start = function () {
        if (0 < AE(this.F)) {
            var a = this.F;
            a.U.push({gk: this, Ra: 0});
            BE(a.B);
            return xj
        }
        this.C = !1;
        this.B = {};
        this.D = "";
        return xj
    };
    function zE(a, b) {
        a.B[b] || (a.D += b + ";", a.B[b] = !0)
    };
    function CE(a, b) {
        this.A = a;
        this.D = b;
        this.C = this.B = null
    }

    function DE(a, b, c, d) {
        a.C = b;
        d = c.ua(E(a.H, a, c, d), "transition-default-", "df0", "df1");
        var e = a.A;
        e.za = !0;
        e.D.A();
        e.F.A++;
        EE(b, E(a.F, a, c, d))
    }

    CE.prototype.F = function (a, b, c) {
        if (c) {
            var d = E(function () {
                EE(this.C, E(this.F, this, a, b))
            }, this);
            FE(new GE(this.A, c, this.D, d, a))
        } else b()
    };
    CE.prototype.H = function (a, b) {
        this.C = null;
        var c = this.A, d = c.S.get(), e = c.G.get();
        U(e, d);
        HE(c.F);
        c.za = !1;
        b(a)
    };
    CE.prototype.G = function (a, b, c) {
        this.B = null;
        var d = this.A, e = d.S.get(), f = d.G.get();
        U(f, e);
        d.D.start(b);
        d.J.x = -1;
        d.J.y = -1;
        HE(d.F, d.J);
        0 <= d.J.x && 0 <= d.J.y && d.B.I && hz(d.B.I, d.J.x, d.J.y, b);
        a(b, c)
    };
    function GE(a, b, c, d, e) {
        this.F = a;
        this.C = b;
        this.G = this.A = !1;
        this.D = c;
        this.H = d;
        this.oa = e
    }

    GE.prototype.B = function (a) {
        var b = this.C.G(a, this.oa);
        if (b) {
            var c = this.F, d = this.oa, e = c.S.get();
            U(e, b);
            IE(c, e);
            Fy(c.S, d)
        }
        (b = this.C.H(a)) && this.F.Jb(b, this.oa);
        1 === a && this.finish(!1, this.oa)
    };
    function FE(a) {
        a.A || (a.A = !0, rz(a.D, a, a.C.D()))
    }

    GE.prototype.finish = function (a) {
        if (this.A) {
            this.A = !1;
            this.G = a;
            a:{
                a = this.D;
                var b;
                for (b = 0; b < a.A.length; b++)if (a.A[b].A == this) {
                    a.A[b] = a.A[a.A.length - 1];
                    a.A.pop();
                    break a
                }
                for (b = 0; b < a.B.length; b++) {
                    var c = a.B[b];
                    if (c.A == this) {
                        a.C.push(c);
                        break
                    }
                }
            }
            this.H(this.oa, this)
        }
    };
    GE.prototype.cancel = function (a) {
        this.finish(!0, a)
    };
    function JE(a, b) {
        this.x = a;
        this.y = b
    }

    G(JE, Jj);
    JE.prototype.scale = Jj.prototype.scale;
    JE.prototype.add = function (a) {
        this.x += a.x;
        this.y += a.y;
        return this
    };
    JE.prototype.rotate = function (a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        var c = this.y * b + this.x * a;
        this.x = this.x * b - this.y * a;
        this.y = c;
        return this
    };
    var KE = Hy();
    var LE = Hy();
    var ME = Hy();
    var NE = Hy();
    var OE = Hy();
    var PE = null;

    function QE(a, b) {
        uo && (PE || (PE = [], al(uo, "beforedone", function (a) {
            for (var b = PE, c = 0, f = b.length; c < f; c++) {
                var g = b[c].key, k = b[c].value;
                (k = ya(k) ? k(a.oa) : k) && !a.oa.Pc[g] && zo(a.oa, g, k)
            }
        })), PE.push({key: a, value: b}))
    };
    function RE() {
        this.S = Jy(Ky);
        this.N = Iy(Ky);
        this.B = Jy(My);
        this.J = Iy(Ny);
        this.A = Jy(Ly);
        this.G = this;
        this.za = this.I = this.P = this.na = null
    }

    q = RE.prototype;
    q.Fg = C;
    q.xb = C;
    q.nf = function (a, b) {
        Dy(a, this.A, b)
    };
    q.Jc = da(!1);
    q.Gg = da(!1);
    q.Wf = C;
    q.Te = da(!1);
    q.Tg = da(!1);
    q.Rg = C;
    q.Ug = C;
    q.Ue = C;
    q.Ve = C;
    q.Sg = C;
    q.Se = C;
    q.Qg = C;
    q.Hg = function (a, b) {
        var c = this.S.get();
        c && (U(oh(c), a), Fy(this.S, b))
    };
    q.Ge = da("n");
    q.Ic = C;
    q.Hd = C;
    q.Gc = da(!1);
    function SE(a, b, c, d, e, f, g, k, l, m, n, p, r, u) {
        var t = this;
        this.wc = u;
        this.S = Jy(Ky);
        this.S.listen(this.sk, this);
        this.Rb = Jy(OE, this);
        this.Qb = Jy(NE, this);
        this.C = Jy(My);
        QE("sc", function () {
            return t.C.get() ? "" + Xs(t.C.get()) : ""
        });
        this.Xm = Iy(Ny, this);
        this.X = this.aa = this.za = !1;
        this.A = f;
        this.N = new tE(e, f);
        this.F = g;
        this.Pe = Iy(ME, this);
        this.Fb = Jy(KE, this);
        this.width = Iy(ZD);
        this.height = Iy(ZD);
        this.ia = Iy(LE);
        this.ia.listen(this.Eg, this);
        this.G = Jy(Ky);
        this.Ua = new eh;
        this.Va = new Vs;
        this.ja = null;
        this.U = 0;
        this.Db = Iy(YD);
        this.Da = Iy(YD);
        this.B = this.H = new RE;
        Dy(this.B.S, this.S, n);
        QE("drv", function () {
            return t.B.Ge()
        });
        this.Qm = r;
        this.M = null;
        this.I = Jy($D);
        this.Xe = Jy(YD, !0);
        this.fa = Jy(Ly);
        this.xa = new CE(this, k);
        this.Ma = b;
        this.Tm = d;
        this.K = !1;
        this.P = this.O = 0;
        this.ea = !1;
        this.na = this.$ = null;
        this.D = new ey(100, function (a) {
            var b = t.S.get(), c = t.G.get();
            t.B === t.H ? (t.D.A(), t.D.start(a)) : (U(c, b), Fy(t.G, a))
        }, "stableCameraUpdaterFuse");
        this.J = new JE(-1, -1);
        this.Ye = m;
        this.Y = this.Xa = null;
        this.Oe = n
    }

    G(SE, HC);
    var TE = 1 / 6;
    q = SE.prototype;
    q.ga = function (a) {
        this.M && this.M.A();
        this.N.ra(a)
    };
    function Dz(a, b, c) {
        var d = a.N;
        b !== d.B && (d.B = b) && d.D.B !== b && (d = d.D, d.B = b, jp(d));
        a.Eg(c)
    }

    q.Jb = function (a, b) {
        var c = this.C.get();
        U(c, a);
        Fy(this.C, b)
    };
    function IE(a, b) {
        var c = a.width.get();
        a = a.height.get();
        b = oh(b);
        uh(b, c);
        wh(b, a)
    }

    function UE(a, b) {
        IE(a, b);
        (a = a.C.get()) && wx(a) && (b.data[3] = 13.1)
    }

    q.$k = function (a) {
        if (this.M) this.M.start(a); else {
            var b = this;
            this.M = new ey(300, function (a) {
                VE(b, a)
            }, "resize");
            VE(this, a)
        }
    };
    function VE(a, b) {
        var c = new hh;
        uh(c, a.width.get() || 0);
        wh(c, a.height.get() || 0);
        a.Qm.N(c, b);
        if (a.A.Ta) {
            var d = a.A.Ta.A;
            a.wc(!(d.drawingBufferWidth == d.canvas.width && d.drawingBufferHeight == d.canvas.height), b)
        }
        WE(a) && (d = a.S.get(), d = nh(d), d.W() != c.W() || vh(d) != vh(c)) && (d.W(), c.W(), U(oh(a.G.get()), c), a.B.Hg(c, b), wE(a.N, "resize"))
    }

    function WE(a) {
        return x(a.S.get()) && x(a.C.get())
    }

    function XE(a, b, c) {
        b.la("stableViewport");
        yE(a.N, function () {
            c(b);
            b.done("stableViewport")
        })
    }

    function YE(a, b, c, d, e, f) {
        var g = f || C;
        if (c && 4 === Xs(c)) g(e); else if (d = d ? d.D() : new Cx, a.za || a.aa || a.X) g(e); else {
            var k = e.ua(function () {
                g(e)
            }, "moveTo", "mt0", "mt1");
            c && zo(e, "sc", "" + Xs(c));
            a.U += 1;
            f = WE(a);
            if (!f) {
                if (!c)if (a.ja) c = a.ja; else {
                    k();
                    return
                }
                a.ja = vx(c);
                if (!b) {
                    ZE(a, c, e);
                    k();
                    return
                }
            }
            var l = a.C.get(), m = a.S.get();
            f || l || (l = new Vs);
            f || m || (m = new eh, UE(a, m));
            b && zs(jh(m), jh(b)) && As(th(lh(m)), th(lh(b))) && As(M(lh(m), 1), M(lh(b), 1)) && As(M(lh(m), 2), M(lh(b), 2)) && As(ih(m), ih(b)) && (b = null);
            c && tx(l, c) && (c = null);
            if (b ||
                c || d.C) {
                b && (U(a.Ua, b), b = a.Ua, K(b, 2) || IE(a, b));
                c && (U(a.Va, c), c = a.Va);
                if (l && 2 === Xs(l) && 7 == L(Ys(l), 1, 99) || c && 2 === Xs(c) && 7 == L(Ys(c), 1, 99)) d.A = 2;
                !e.Yc() && l && c && K(l, 0) && K(c, 0) && Xs(l) != Xs(c) && e.pb("transitions", "switch_map_mode");
                a.F.A++;
                var n = E(function () {
                    k();
                    HE(this.F)
                }, a);
                f && !d.C && a.B.Gg(b, c, d, e, n) || $E(a, b || m, c || l, f, d, e, n)
            } else k()
        }
    }

    function $E(a, b, c, d, e, f, g) {
        d && aF(a, a.H, null, null, !1, f);
        var k = a.U, l = vx(c), m = ys(b);
        a.Ma.load(c, E(function (a, b) {
            if (this.U === k) {
                this.X = !0;
                var c = e.B || !this.A.Ta, n = this.C.get() || new Vs;
                U(n, l);
                aF(this, a, m, n, c, b);
                d || (this.F.H = !0, f.ta("scnd"), f.dispatchEvent("scnd"));
                this.X = !1
            }
            g(b)
        }, a), f)
    }

    function aF(a, b, c, d, e, f) {
        if (b !== a.B) {
            a.N.I = !1;
            var g = a.B;
            g.Wf(f);
            jl(a.Xa);
            a.B = b;
            b.Fg(c, d, f);
            a.Xa = Yo(a.B, "user-input-event", a.Ye);
            g !== a.H && (Ey(g.J, f), Ey(g.N, f), Ey(g.S, f), Ey(g.B, f));
            g !== a.H && Ey(a.fa, f);
            b !== a.H && (Dy(b.J, a.Xm, f), Dy(b.N, a.G, f), Dy(b.S, a.S, f), Dy(b.B, a.C, f));
            d && ZE(a, d, f);
            if (c) {
                var g = a.width.get(), k = a.height.get();
                d = new hh;
                uh(d, g);
                wh(d, k);
                c ? (b.Jc(c, d, e), IE(a, c), x(a.S.get()) ? (U(a.S.get(), c), Fy(a.S, f)) : a.S.set(ys(c), f), x(a.G.get()) || a.G.set(ys(c), f)) : (c = a.S.get(), b.Jc(c, d, e) && (IE(a, c), Fy(a.S,
                        f)))
            }
            b !== a.H && b.nf(a.fa, f);
            b.xb(a, f);
            Fy(a.Rb, f);
            Fy(a.Qb, f);
            Fy(a.Fb, f);
            b !== a.H ? a.D.start(f) : a.D.A();
            "application_init" == f.C && !f.Pc.drv && zo(f, "drv", b.Ge())
        }
    }

    function ZE(a, b, c) {
        x(a.C.get()) ? (U(a.C.get(), b), Fy(a.C, c)) : a.C.set(vx(b), c)
    }

    function bF(a, b) {
        a.Y && (a.Y(a.Oe, b), a.Y = null)
    }

    q.Hd = function (a, b, c, d) {
        this.B.G && (b.Yc() || b.pb("scene", "scroll_zoom"), this.B.G.Hd(a, b, c, d))
    };
    function cF(a, b) {
        bF(a, b.A);
        var c = a.C.get();
        if (!c || wx(c))return !1;
        var c = b.A, d = b.B;
        d.pb("scene", "click_scene");
        dF(a, c.x, c.y, a.K, d, b.D);
        a.B.Se(hE(c), d);
        return !0
    }

    function eF(a, b) {
        var c = b.A, d = b.B;
        dF(a, c.x, c.y, a.K, d, b.D);
        a.B.I && (b = hE(c), hz(a.B.I, b.x, b.y, d))
    }

    q.Uk = function (a, b) {
        this.B.Rg(hE(b), a)
    };
    q.Xk = function (a, b) {
        this.B.Ug(hE(b), a)
    };
    q.Vk = function (a, b) {
        if (this.B.I) {
            var c = this.B.I;
            b = hE(b);
            iz(c, b);
            Lx(c.A.B, !0);
            jz(c.A, b.x, b.y, a)
        }
    };
    q.Wk = function (a, b) {
        this.B.I && (a = this.B.I, iz(a, hE(b)), Lx(a.A.B, !1))
    };
    q.ll = function (a, b) {
        if (!(b.Ji && !this.Gc() || Math.abs(b.Fd) < Math.abs(b.ef) || 0 === b.Fd)) {
            bF(this, b);
            dF(this, b.x, b.y, this.K, a);
            document.body.focus();
            var c;
            this.Gc() ? (c = b.Mk, 1 < Math.abs(c) && (c = Gb(0 > c ? -1 : 1, c, TE)), c = b.ctrlKey ? -c : -c / 4) : c = 0 >= b.Fd ? 1 : -1;
            this.Ic(c, a, b.x, b.y, !0)
        }
    };
    q.Lg = function (a, b) {
        if ((!(b.ctrlKey || b.metaKey || b.altKey) || b.shiftKey) && this.B.P) {
            var c = this.B.P;
            if (!c.F)switch (b.keyCode) {
                case 38:
                case 87:
                    zz(c, !0, a, 3);
                    break;
                case 40:
                case 83:
                    zz(c, !1, a, 4);
                    break;
                case 37:
                case 65:
                    Bz(c, !0, !0, a);
                    break;
                case 39:
                case 68:
                    Bz(c, !1, !0, a);
                    break;
                case 107:
                case 187:
                    c.Ic(1, a, void 0, void 0, !0);
                    c.Da.D($x, 32);
                    break;
                case 109:
                case 189:
                    c.Ic(-1, a, void 0, void 0, !0), c.Da.D(ay, 32)
            }
        }
    };
    q.Mg = function (a, b) {
        if (this.B.P) {
            var c = this.B.P;
            37 != b.keyCode && 39 != b.keyCode && 65 != b.keyCode && 68 != b.keyCode || !c.C || c.C.cancel(a)
        }
    };
    function dF(a, b, c, d, e, f) {
        a.O = b;
        a.P = c;
        a.K = d;
        fF(a, e, f)
    }

    function fF(a, b, c) {
        a.C.get();
        var d = a.B.na, e = a.B.Te(a.O, a.P, b);
        a.B.Tg(a.O, a.P, a.K, b) ? a.I.set("move", b) : e ? a.I.set("pointer", b) : x(c) || d ? ("pointer" !== a.I.get() && a.I.set("auto", b), 0 == a.F.A && (x(c) ? gF(a, c, b) : gF(a, MD(d, a.O, a.P), b))) : a.I.set("auto", b)
    }

    function gF(a, b, c) {
        b && b.B() ? a.I.set("pointer", c) : a.I.set("auto", c)
    }

    q.Ic = function (a, b, c, d, e) {
        this.B.G && (b.Yc() || b.pb("scene", "scroll_zoom"), this.B.G.Ic(a, b, c, d, e))
    };
    function hF(a, b, c) {
        if (a.B.za)return hF(a.B.za, b, c);
        a = c || new JE(0, 0);
        a.x = 0;
        a.y = 0;
        return a
    }

    q.Gc = function () {
        return this.B.G ? this.B.G.Gc() : !1
    };
    q.sk = function (a) {
        var b = this.C.get();
        if (b && wx(b) && (b = this.S.get()) && K(b, 0)) {
            var c = jh(b);
            if (K(c, 2) && K(c, 1) && K(c, 0)) {
                var d = qh(c);
                -90 > d || 90 < d || isNaN(d) || (d = ph(c), -180 > d || 180 < d || isNaN(d) || (c = rh(c), -10898 > c || isNaN(c) || !K(b, 3) || (c = ih(b), 1 > c || 179 < c || isNaN(c) || !K(b, 2) || (b = nh(b), K(b, 0) && K(b, 1) && (1 > b.W() || 1 > vh(b) || b.W())))))
            }
        }
        b = this.xa;
        b.B || b.C || this.ea || (this.D.A(), this.D.start(a));
        fF(this, a)
    };
    q.Eg = function (a) {
        var b = this.N.B;
        if (b) {
            var c = this.ia.get();
            c && (b.F.zc(c.top, c.right, c.bottom, c.left, a), ND(b))
        }
    };
    function gz(a, b, c, d) {
        a = a.xa;
        d = c.ua(E(a.G, a, d), "animation-");
        a.B = new GE(a.A, b, a.D, d, c);
        b = a.A;
        b.D.A();
        b.F.A++;
        FE(a.B);
        return a.B
    }

    function cz(a, b, c, d, e) {
        var f = a.S.get(), g = a.C.get();
        b = new Dx(f, g, b, c);
        aF(a, a.H, null, null, !1, d);
        Dz(a, null, d);
        fF(a, d);
        a.Tm.load(b, d, function (b, c) {
            a.cl.call(a, b, e, c)
        })
    }

    q.cl = function (a, b, c) {
        var d = this;
        this.aa = !0;
        DE(this.xa, a, c, function (a) {
            var c = d.S.get(), e = d.C.get();
            d.Ma.load(e, function (a, f) {
                d.aa = !1;
                aF(d, a, c, e, !1, f);
                b(f)
            }, a)
        })
    };
    function iF(a) {
        this.D = a;
        jF || (jF = !0, a = a.style || void 0, Sn("transformOrigin", a), kF = Sn("transform", a) || "transform")
    }

    var jF = !1, kF = "", lF = new Float64Array(2);

    function mF(a) {
        var b = w.devicePixelRatio || 1;
        return Math.round(a * b) / b
    }

    iF.prototype.detach = function (a) {
        a.parentNode === this.D && ek(a)
    };
    function nF(a) {
        for (var b = a.D.firstChild; b; b = b.nextSibling)if (1 === b.nodeType) {
            var c = a, d = b, e = d.__tai;
            if (!e || !e.fixed) {
                var f;
                f = e.wn;
                (c = c.A.get()) ? (oF.data[1] = f[0], oF.data[2] = f[1], sh(oF, f[2]), hF(c, oF, pF), lF[0] = pF.x, lF[1] = pF.y, f = !0) : f = !1;
                f ? (e = e.kn, d.style.display = "block", d.style[kF] = "translateZ(0) translate(" + mF(lF[0] - e[0]) + "px," + mF(lF[1] - e[1]) + "px) scale(" + e[2] + ")") : d.style.display = "none"
            }
        }
    };
    function qF(a) {
        iF.call(this, a);
        this.B = Iy(Ky);
        this.A = Iy(KE);
        this.C = !1
    }

    G(qF, iF);
    var oF = new fh, pF = new JE(0, 0);
    qF.prototype.bind = function (a, b, c) {
        Dy(this.B, a, c);
        Dy(this.A, b, c);
        this.B.listen(this.F, this);
        this.A.listen(this.G, this)
    };
    qF.prototype.F = function (a) {
        if (this.B.get() && this.A.get() && !this.C) {
            this.C = !0;
            var b = E(function () {
                this.C = !1;
                nF(this)
            }, this);
            Py(b, 0, a, "effect-surface-camera-update")
        }
    };
    qF.prototype.G = function () {
        this.B.get() && this.A.get() && !this.C && nF(this)
    };
    function rF(a, b, c) {
        aE.call(this, c);
        this.D = a;
        this.A = b;
        this.B = dE(this);
        this.C = cE(this)
    }

    G(rF, aE);
    rF.prototype.M = function (a) {
        var b = this.B.get() || "";
        this.A.data[0] = b;
        b = !!this.C.get();
        this.A.data[2] = b;
        this.D.fill(this.A);
        gE(this.D, a.ua(C, "scene.template-render"))
    };
    rF.prototype.N = C;
    function sF(a, b, c, d) {
        this.F = a;
        this.K = b;
        this.I = c;
        this.J = d;
        this.B = !1;
        this.C = [];
        this.A = {};
        this.H = {};
        this.G = {};
        this.L = 0
    }

    function tF(a, b, c, d, e) {
        var f = e ? e : null, g = a.A[b];
        g || (g = {}, a.A[b] = g);
        var k = g[f];
        e = !!k;
        k || (k = [], g[f] = k);
        b = new uF(b, f, c, d);
        k.push(b);
        c = a.L++;
        a.H[c] = b;
        return e
    }

    function vF(a, b, c, d, e, f) {
        f || "drag" != b && "dragstart" != b && "dragend" != b || (f = 0, f = Lk ? f : Pk[f]);
        tF(a, b, c, d, f) || (c = f ? f : null, d = E(a.D, a, b, c), e = e ? a.F.Sb(b, null, d, f) : a.F.xc(a.K, a.I, b, null, d, f), f = a.G[b], f || (f = {}, a.G[b] = f), f[c] = e)
    }

    sF.prototype.D = function (a, b, c, d) {
        c.la("scene-async-event-handler");
        if (!this.B) {
            this.B = !0;
            var e = this.J;
            e.K.push(this);
            bE(e.B)
        }
        "scrollwheel" == a && x(d.Fd) && x(d.ef) && Math.abs(d.Fd) >= Math.abs(d.ef) && ho(d);
        this.C.push(new wF(a, b, d, c))
    };
    function wF(a, b, c, d) {
        this.type = a;
        this.qualifier = b;
        this.event = c;
        this.oa = d
    }

    function uF(a, b, c, d) {
        this.sb = a;
        this.qualifier = b;
        this.A = c;
        this.gb = d
    };
    function xF(a) {
        this.data = a || []
    }

    G(xF, J);
    function yF(a) {
        this.data = a || {}
    }

    G(yF, gd);
    function zF(a) {
        this.data = a || {}
    }

    G(zF, gd);
    function AF(a) {
        this.data = a || {}
    }

    G(AF, gd);
    function BF(a) {
        CF.data.css3_prefix = a
    };
    var DF = {};

    function EF() {
        this.A = {};
        this.B = null;
        this.Ya = ++FF
    }

    var GF = 0, FF = 0;

    function HF() {
        CF || (CF = new AF, Za() && !I("Edge") ? BF("-webkit-") : I("Firefox") ? BF("-moz-") : Vb() ? BF("-ms-") : I("Opera") && BF("-o-"), CF.data.client_platform = 3, CF.data.is_rtl = !1);
        return CF
    }

    var CF = null;

    function IF() {
        return HF().data
    }

    function JF(a, b, c) {
        return b.call(c, a.A, DF)
    }

    function KF(a, b, c) {
        null != b.B && (a.B = b.B);
        a = a.A;
        b = b.A;
        if (c = c || null) {
            a.Ha = b.Ha;
            a.Za = b.Za;
            for (var d = 0; d < c.length; ++d)a[c[d]] = b[c[d]]
        } else for (d in b)a[d] = b[d]
    };
    function LF(a, b) {
        this.A = "";
        this.B = b || {};
        if ("string" === typeof a) this.A = a; else {
            b = a.B;
            this.A = a.A;
            for (var c in b)null == this.B[c] && (this.B[c] = b[c])
        }
    }

    function MF(a) {
        return a.A
    }

    function NF(a) {
        if (!a)return OF();
        for (a = a.parentNode; za(a) && 1 == a.nodeType; a = a.parentNode) {
            var b = a.getAttribute("dir");
            if (b && (b = b.toLowerCase(), "ltr" == b || "rtl" == b))return b
        }
        return OF()
    }

    function PF(a) {
        for (var b = 0; b < arguments.length; ++b)if (!arguments[b])return !1;
        return !0
    }

    function QF(a, b) {
        return a > b
    }

    function RF(a, b) {
        return a < b
    }

    function SF(a, b) {
        return a >= b
    }

    function TF(a, b) {
        return a <= b
    }

    function UF(a) {
        return "string" == typeof a ? "'" + a.replace(/\'/g, "\\'") + "'" : String(a)
    }

    function VF(a) {
        return null != a && "object" == typeof a && "number" == typeof a.length && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("length")
    }

    function WF(a, b, c) {
        for (var d = 2; d < arguments.length; ++d) {
            if (null == a || null == arguments[d])return b;
            var e = arguments[d];
            if ("number" == typeof e && 0 > e)if (null == a.length) a = a[-e]; else {
                var e = -e - 1, f = a[e];
                null == f || za(f) && !VF(f) ? (f = a[a.length - 1], e = VF(f) || !za(f) ? null : f[e + 1] || null) : e = f;
                a = e
            } else a = a[e]
        }
        return null == a ? b : a
    }

    function XF(a, b, c) {
        c = ~~(c || 0);
        0 == c && (c = 1);
        var d = [];
        if (0 < c)for (a = ~~a; a < b; a += c)d.push(a); else for (a = ~~a; a > b; a += c)d.push(a);
        return d
    }

    function OF() {
        var a = HF();
        return hd(a, "is_rtl", void 0) ? "rtl" : "ltr"
    }

    function YF(a, b, c) {
        switch (ui(a, b)) {
            case 1:
                return "ltr";
            case -1:
                return "rtl";
            default:
                return c
        }
    }

    function ZF(a, b, c) {
        switch (ui(a, b)) {
            case 1:
                return !1;
            case -1:
                return !0;
            default:
                return c
        }
    }

    function $F(a, b, c) {
        return aG(a, b, "rtl" == c) ? "rtl" : "ltr"
    }

    function aG(a, b, c) {
        return c ? !qi.test(mi(a, b)) : ri.test(mi(a, b))
    }

    var bG = /[\'\"\(]/, cG = ["border-color", "border-style", "border-width", "margin", "padding"], dG = /left/g, eG = /right/g, fG = /\s+/;

    function gG(a, b) {
        if (bG.test(b))return b;
        b = 0 <= b.indexOf("left") ? b.replace(dG, "right") : b.replace(eG, "left");
        sb(cG, a) && (a = b.split(fG), 4 <= a.length && (b = [a[0], a[3], a[2], a[1]].join(" ")));
        return b
    }

    function hG(a) {
        if (null != a) {
            var b = a.ordinal;
            null == b && (b = a.el);
            if (null != b && "function" == typeof b)return String(b.call(a))
        }
        return "" + a
    }

    function iG(a) {
        if (null == a)return 0;
        var b = a.ordinal;
        null == b && (b = a.el);
        return null != b && "function" == typeof b ? b.call(a) : 0 <= a ? Math.floor(a) : Math.ceil(a)
    }

    function jG(a) {
        try {
            return void 0 !== a.call(null)
        } catch (b) {
            return !1
        }
    }

    function kG(a) {
        try {
            var b = a.call(null);
            return VF(b) ? b.length : void 0 === b ? 0 : 1
        } catch (c) {
            return 0
        }
    }

    function lG(a, b) {
        return null == a ? null : new LF(a, b)
    }

    function mG(a) {
        if (null != a.data.original_value) {
            var b = new kr(id(a, "original_value"));
            "original_value" in a.data && delete a.data.original_value;
            b.B && (a.data.protocol = b.B);
            b.C && (a.data.host = b.C);
            null != b.H ? a.data.port = b.H : b.B && ("http" == b.B ? a.data.port = 80 : "https" == b.B && (a.data.port = 443));
            b.D && (a.data.path = b.D);
            b.F && (a.data.hash = b.F);
            for (var c = b.A.lb(), d = 0; d < c.length; ++d) {
                var e = c[d], f = new yF(jd(a));
                f.data.key = e;
                e = b.A.Ca(e)[0];
                f.data.value = e
            }
        }
    }

    function nG(a, b) {
        var c;
        "string" == typeof a ? (c = new zF, c.data.original_value = a) : c = new zF(a);
        mG(c);
        if (b)for (a = 0; a < b.length; ++a) {
            for (var d = b[a], e = null != d.key ? d.key : d.key, f = null != d.value ? d.value : d.value, d = !1, g = 0; g < ld(c); ++g)if (id(new yF(kd(c, g)), "key") == e) {
                (new yF(kd(c, g))).data.value = f;
                d = !0;
                break
            }
            d || (d = new yF(jd(c)), d.data.key = e, d.data.value = f)
        }
        return c.data
    }

    function oG(a) {
        a = new zF(a);
        mG(a);
        var b = null != a.data.protocol ? id(a, "protocol") : null, c = null != a.data.host ? id(a, "host") : null, d = null != a.data.port && (null == a.data.protocol || "http" == id(a, "protocol") && 80 != hd(a, "port", 0) || "https" == id(a, "protocol") && 443 != hd(a, "port", 0)) ? hd(a, "port", 0) : null, e = null != a.data.path ? id(a, "path") : null, f = null != a.data.hash ? id(a, "hash") : null, g = new kr(null, void 0);
        b && lr(g, b);
        c && (g.C = c);
        d && mr(g, d);
        e && (g.D = e);
        f && (g.F = f);
        for (b = 0; b < ld(a); ++b)c = new yF(kd(a, b)), g.A.set(id(c, "key"), id(c, "value"));
        return g.toString()
    }

    function pG(a, b) {
        a = new zF(a);
        mG(a);
        for (var c = 0; c < ld(a); ++c) {
            var d = new yF(kd(a, c));
            if (id(d, "key") == b)return id(d, "value")
        }
        return ""
    }

    function qG(a, b) {
        a = new zF(a);
        mG(a);
        for (var c = 0; c < ld(a); ++c)if (id(new yF(kd(a, c)), "key") == b)return !0;
        return !1
    }

    function rG(a) {
        return null != a && a.ib ? a.ib() : a
    };
    var sG = /^<\/?(b|u|i|em|br|sub|sup|wbr|span)( dir=(rtl|ltr|'ltr'|'rtl'|"ltr"|"rtl"))?>/, tG = /^&([a-zA-Z]+|#[0-9]+|#x[0-9a-fA-F]+);/, uG = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;"
    };

    function vG(a) {
        if (null == a)return "";
        if (!wG.test(a))return a;
        -1 != a.indexOf("&") && (a = a.replace(xG, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(yG, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(zG, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(AG, "&quot;"));
        return a
    }

    function BG(a) {
        if (null == a)return "";
        -1 != a.indexOf('"') && (a = a.replace(AG, "&quot;"));
        return a
    }

    var xG = /&/g, yG = /</g, zG = />/g, AG = /\"/g, wG = /[&<>\"]/, CG = null;

    function DG(a) {
        for (var b = "", c = 0, d; d = a[c]; ++c)switch (d) {
            case "<":
            case "&":
                var e = ("<" == d ? sG : tG).exec(a.substr(c));
                if (e && e[0]) {
                    b += a.substr(c, e[0].length);
                    c += e[0].length - 1;
                    continue
                }
            case ">":
            case '"':
                b += uG[d];
                break;
            default:
                b += d
        }
        null == CG && (CG = document.createElement("div"));
        CG.innerHTML = b;
        return CG.innerHTML
    };
    function EG(a) {
        var b = a.length - 1, c = null;
        switch (a[b]) {
            case "filter_url":
                c = 1;
                break;
            case "filter_imgurl":
                c = 2;
                break;
            case "filter_css_regular":
                c = 5;
                break;
            case "filter_css_string":
                c = 6;
                break;
            case "filter_css_url":
                c = 7
        }
        c && ub(a, b);
        return c
    }

    function FG(a) {
        if (GG.test(a))return a;
        a = Li(a).mb();
        return "about:invalid#zClosurez" === a ? "about:invalid#zjslayoutz" : a
    }

    var GG = /^data:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp);base64,[-+/_a-z0-9]+(?:=|%3d)*$/i;

    function HG(a) {
        var b = IG.exec(a);
        if (!b)return "0;url=about:invalid#zjslayoutz";
        var c = b[2];
        return b[1] ? "about:invalid#zClosurez" == Li(c).mb() ? "0;url=about:invalid#zjslayoutz" : a : 0 == c.length ? a : "0;url=about:invalid#zjslayoutz"
    }

    var IG = /^(?:[0-9]+)([ ]*;[ ]*url=)?(.*)$/;

    function JG(a) {
        if (null == a)return null;
        if (!KG.test(a) || 0 != LG(a, 0))return "zjslayoutzinvalid";
        for (var b = /([-_a-zA-Z0-9]+)\(/g, c; null !== (c = b.exec(a));)if (null === MG(c[1], !1))return "zjslayoutzinvalid";
        return a
    }

    function LG(a, b) {
        if (0 > b)return -1;
        for (var c = 0; c < a.length; c++) {
            var d = a.charAt(c);
            if ("(" == d) b++; else if (")" == d)if (0 < b) b--; else return -1
        }
        return b
    }

    function NG(a) {
        if (null == a)return null;
        for (var b = /([-_a-zA-Z0-9]+)\(/g, c = /[ \t]*((?:"(?:[^\x00"\\\n\r\f\u0085\u000b\u2028\u2029]*)"|'(?:[^\x00'\\\n\r\f\u0085\u000b\u2028\u2029]*)')|(?:[?&/:=]|[+\-.,!#%_a-zA-Z0-9\t])*)[ \t]*/g, d = !0, e = 0, f = ""; d;) {
            b.lastIndex = 0;
            var g = b.exec(a), d = null !== g, k = a;
            if (d) {
                if (void 0 === g[1])return "zjslayoutzinvalid";
                var l = MG(g[1], !0);
                if (null === l)return "zjslayoutzinvalid";
                k = a.substring(0, b.lastIndex);
                a = a.substring(b.lastIndex)
            }
            e = LG(k, e);
            if (0 > e || !KG.test(k))return "zjslayoutzinvalid";
            f += k;
            if (d && "url" == l) {
                c.lastIndex = 0;
                g = c.exec(a);
                if (null === g || 0 != g.index)return "zjslayoutzinvalid";
                var m = g[1];
                if (void 0 === m)return "zjslayoutzinvalid";
                g = 0 == m.length ? 0 : c.lastIndex;
                if (")" != a.charAt(g))return "zjslayoutzinvalid";
                k = "";
                1 < m.length && (0 == m.lastIndexOf('"', 0) && Ja(m, '"') ? (m = m.substring(1, m.length - 1), k = '"') : 0 == m.lastIndexOf("'", 0) && Ja(m, "'") && (m = m.substring(1, m.length - 1), k = "'"));
                m = FG(m);
                if ("about:invalid#zjslayoutz" == m)return "zjslayoutzinvalid";
                f += k + m + k;
                a = a.substring(g)
            }
        }
        return 0 != e ? "zjslayoutzinvalid" :
            f
    }

    function MG(a, b) {
        var c = a.toLowerCase();
        a = OG.exec(a);
        if (null !== a) {
            if (void 0 === a[1])return null;
            c = a[1]
        }
        return b && "url" == c || c in PG ? c : null
    }

    var PG = {
        blur: !0,
        brightness: !0,
        calc: !0,
        circle: !0,
        contrast: !0,
        counter: !0,
        counters: !0,
        "cubic-bezier": !0,
        "drop-shadow": !0,
        ellipse: !0,
        grayscale: !0,
        hsl: !0,
        hsla: !0,
        "hue-rotate": !0,
        inset: !0,
        invert: !0,
        opacity: !0,
        "linear-gradient": !0,
        matrix: !0,
        matrix3d: !0,
        polygon: !0,
        "radial-gradient": !0,
        rgb: !0,
        rgba: !0,
        rect: !0,
        rotate: !0,
        rotate3d: !0,
        rotatex: !0,
        rotatey: !0,
        rotatez: !0,
        saturate: !0,
        sepia: !0,
        scale: !0,
        scale3d: !0,
        scalex: !0,
        scaley: !0,
        scalez: !0,
        steps: !0,
        skew: !0,
        skewx: !0,
        skewy: !0,
        translate: !0,
        translate3d: !0,
        translatex: !0,
        translatey: !0,
        translatez: !0
    }, KG = /^(?:[*/]?(?:(?:[+\-.,!#%_a-zA-Z0-9\t]| )|\)|[a-zA-Z0-9]\(|$))*$/, QG = /^(?:[*/]?(?:(?:"(?:[^\x00"\\\n\r\f\u0085\u000b\u2028\u2029]|\\(?:[\x21-\x2f\x3a-\x40\x47-\x60\x67-\x7e]|[0-9a-fA-F]{1,6}[ \t]?))*"|'(?:[^\x00'\\\n\r\f\u0085\u000b\u2028\u2029]|\\(?:[\x21-\x2f\x3a-\x40\x47-\x60\x67-\x7e]|[0-9a-fA-F]{1,6}[ \t]?))*')|(?:[+\-.,!#%_a-zA-Z0-9\t]| )|$))*$/, OG = /^-(?:moz|ms|o|webkit|css3)-(.*)$/;

    function RG(a, b) {
        var c = a.__innerhtml;
        c || (c = a.__innerhtml = [a.innerHTML, a.innerHTML]);
        if (c[0] != b || c[1] != a.innerHTML) a.innerHTML = b, c[0] = b, c[1] = a.innerHTML
    }

    var SG = {action: !0, cite: !0, data: !0, formaction: !0, href: !0, icon: !0, manifest: !0, poster: !0, src: !0};

    function TG(a) {
        if (a = a.getAttribute("jsinstance")) {
            var b = a.indexOf(";");
            return (0 <= b ? a.substr(0, b) : a).split(",")
        }
        return []
    }

    function UG(a) {
        if (a = a.getAttribute("jsinstance")) {
            var b = a.indexOf(";");
            return 0 <= b ? a.substr(b + 1) : null
        }
        return null
    }

    function VG(a, b, c) {
        var d = a[c] || "0", e = b[c] || "0", d = parseInt("*" == d.charAt(0) ? d.substring(1) : d, 10), e = parseInt("*" == e.charAt(0) ? e.substring(1) : e, 10);
        return d == e ? a.length > c || b.length > c ? VG(a, b, c + 1) : !1 : d > e
    }

    function WG(a, b, c, d, e, f) {
        b[c] = e >= d - 1 ? "*" + e : String(e);
        b = b.join(",");
        f && (b += ";" + f);
        a.setAttribute("jsinstance", b)
    }

    function XG(a) {
        if (!a.hasAttribute("jsinstance"))return a;
        for (var b = TG(a); ;) {
            var c = hk(a);
            if (!c)return a;
            var d = TG(c);
            if (!VG(d, b, 0))return a;
            a = c;
            b = d
        }
    };
    var YG = {"for": "htmlFor", "class": "className"}, ZG = {}, $G;
    for ($G in YG)ZG[YG[$G]] = $G;
    var aH = {9: 1, 11: 3, 10: 4, 12: 5, 13: 6, 14: 7};

    function bH(a, b, c, d) {
        if (null == a[1]) {
            var e = a[1] = a[0].match(hr);
            if (e[6]) {
                for (var f = e[6].split("&"), g = {}, k = 0, l = f.length; k < l; ++k) {
                    var m = f[k].split("=");
                    if (2 == m.length) {
                        var n = m[1].replace(/,/gi, "%2C").replace(/[+]/g, "%20").replace(/:/g, "%3A");
                        try {
                            g[decodeURIComponent(m[0])] = decodeURIComponent(n)
                        } catch (p) {
                        }
                    }
                }
                e[6] = g
            }
            a[0] = null
        }
        a = a[1];
        b in aH && (e = aH[b], 13 == b ? c && (b = a[e], null != d ? (b || (b = a[e] = {}), b[c] = d) : b && delete b[c]) : a[e] = d)
    };
    function cH(a) {
        this.H = a;
        this.G = this.F = this.C = this.A = null;
        this.I = this.D = 0;
        this.J = !1;
        this.B = -1;
        this.va = ++dH
    }

    cH.prototype.name = h("H");
    function eH(a, b) {
        return "href" == b.toLowerCase() ? "#" : "img" == a.toLowerCase() && "src" == b.toLowerCase() ? "/images/cleardot.gif" : ""
    }

    cH.prototype.id = h("va");
    var dH = 0;

    function fH(a) {
        a.C = a.A;
        a.A = a.C.slice(0, a.B);
        a.B = -1
    }

    function gH(a) {
        for (var b = (a = a.A) ? a.length : 0, c = 0; c < b; c += 7)if (0 == a[c + 0] && "dir" == a[c + 1])return a[c + 5];
        return null
    }

    function hH(a, b, c, d, e, f, g, k) {
        var l = a.B;
        if (-1 != l) {
            if (a.A[l + 0] == b && a.A[l + 1] == c && a.A[l + 2] == d && a.A[l + 3] == e && a.A[l + 4] == f && a.A[l + 5] == g && a.A[l + 6] == k) {
                a.B += 7;
                return
            }
            fH(a)
        } else a.A || (a.A = []);
        a.A.push(b);
        a.A.push(c);
        a.A.push(d);
        a.A.push(e);
        a.A.push(f);
        a.A.push(g);
        a.A.push(k)
    }

    function iH(a, b) {
        a.D |= b
    }

    function jH(a) {
        return a.D & 1024 ? (a = gH(a), "rtl" == a ? "\u202c\u200e" : "ltr" == a ? "\u202c\u200f" : "") : !1 === a.G ? "" : "</" + a.H + ">"
    }

    function kH(a, b, c, d) {
        for (var e = -1 != a.B ? a.B : a.A ? a.A.length : 0, f = 0; f < e; f += 7)if (a.A[f + 0] == b && a.A[f + 1] == c && a.A[f + 2] == d)return !0;
        if (a.F)for (f = 0; f < a.F.length; f += 7)if (a.F[f + 0] == b && a.F[f + 1] == c && a.F[f + 2] == d)return !0;
        return !1
    }

    cH.prototype.reset = function (a) {
        if (!this.J && (this.J = !0, this.B = -1, null != this.A)) {
            for (var b = 0; b < this.A.length; b += 7)if (this.A[b + 6]) {
                var c = this.A.splice(b, 7), b = b - 7;
                this.F || (this.F = []);
                Array.prototype.push.apply(this.F, c)
            }
            this.I = 0;
            if (a)for (b = 0; b < this.A.length; b += 7)if (c = this.A[b + 5], -1 == this.A[b + 0] && c == a) {
                this.I = b;
                break
            }
            0 == this.I ? this.B = 0 : this.C = this.A.splice(this.I, this.A.length)
        }
    };
    function lH(a, b, c, d, e, f) {
        if (6 == b) {
            if (d)for (e && (d = Va(d)), b = d.split(" "), c = b.length, d = 0; d < c; d++)"" != b[d] && mH(a, 7, "class", b[d], "", f)
        } else 18 != b && 20 != b && 22 != b && kH(a, b, c) || hH(a, b, c, null, null, e || null, d, !!f)
    }

    function nH(a, b, c, d, e) {
        var f;
        switch (b) {
            case 2:
            case 1:
                f = 8;
                break;
            case 8:
                f = 0;
                d = HG(d);
                break;
            default:
                f = 0, d = "sanitization_error_" + b
        }
        kH(a, f, c) || hH(a, f, c, null, b, null, d, !!e)
    }

    function mH(a, b, c, d, e, f) {
        switch (b) {
            case 5:
                c = "style";
                -1 != a.B && "display" == d && fH(a);
                break;
            case 7:
                c = "class"
        }
        kH(a, b, c, d) || hH(a, b, c, d, null, null, e, !!f)
    }

    function oH(a, b) {
        return b.toUpperCase()
    }

    function pH(a, b) {
        null === a.G ? a.G = b : a.G && !b && null != gH(a) && (a.H = "span")
    }

    function qH(a, b, c) {
        var d;
        if (c[1]) {
            d = c[1];
            if (d[6]) {
                var e = d[6], f = [], g;
                for (g in e) {
                    var k = e[g];
                    null != k && f.push(encodeURIComponent(g) + "=" + encodeURIComponent(k).replace(/%3A/gi, ":").replace(/%20/g, "+").replace(/%2C/gi, ",").replace(/%7C/gi, "|"))
                }
                d[6] = f.join("&")
            }
            "http" == d[1] && "80" == d[4] && (d[4] = null);
            "https" == d[1] && "443" == d[4] && (d[4] = null);
            e = d[3];
            /:[0-9]+$/.test(e) && (f = e.lastIndexOf(":"), d[3] = e.substr(0, f), d[4] = e.substr(f + 1));
            e = d[1];
            f = d[2];
            g = d[3];
            var k = d[4], l = d[5], m = d[6];
            d = d[7];
            var n = "";
            e && (n += e + ":");
            g &&
            (n += "//", f && (n += f + "@"), n += g, k && (n += ":" + k));
            l && (n += l);
            m && (n += "?" + m);
            d && (n += "#" + d);
            d = n
        } else d = c[0];
        (c = rH(c[2], d)) || (c = eH(a.H, b));
        return c
    }

    function sH(a, b, c) {
        if (a.D & 1024)return a = gH(a), "rtl" == a ? "\u202b" : "ltr" == a ? "\u202a" : "";
        if (!1 === a.G)return "";
        for (var d = "<" + a.H, e = null, f = "", g = null, k = null, l = "", m, n = "", p = "", r = 0 != (a.D & 832) ? "" : null, u = "", t = a.A, v = t ? t.length : 0, y = 0; y < v; y += 7) {
            var D = t[y + 0], z = t[y + 1], A = t[y + 2], B = t[y + 5], R = t[y + 3], N = t[y + 6];
            if (null != B && null != r && !N)switch (D) {
                case -1:
                    r += B + ",";
                    break;
                case 7:
                case 5:
                    r += D + "." + A + ",";
                    break;
                case 13:
                    r += D + "." + z + "." + A + ",";
                    break;
                case 18:
                case 20:
                    break;
                default:
                    r += D + "." + z + ","
            }
            switch (D) {
                case 7:
                    null === B ? null != k && tb(k, A) :
                        null != B && (null == k ? k = [A] : sb(k, A) || k.push(A));
                    break;
                case 4:
                    m = !1;
                    g = R;
                    null == B ? f = null : "" == f ? f = B : ";" == B.charAt(B.length - 1) ? f = B + f : f = B + ";" + f;
                    break;
                case 5:
                    m = !1;
                    null != B && null !== f && ("" != f && ";" != f[f.length - 1] && (f += ";"), f += A + ":" + B);
                    break;
                case 8:
                    null == e && (e = {});
                    null === B ? e[z] = null : B ? ((D = t[y + 4]) && (B = Va(B)), e[z] = [B, null, R]) : e[z] = ["", null, R];
                    break;
                case 18:
                    null != B && ("jsl" == z ? (m = !0, l += B) : "jsvs" == z && (n += B));
                    break;
                case 20:
                    null != B && (p && (p += ","), p += B);
                    break;
                case 22:
                    null != B && (u && (u += ";"), u += B);
                    break;
                case 21:
                case 0:
                    null !=
                    B && (d += " " + z + "=", B = rH(R, B), d = (D = t[y + 4]) ? d + ('"' + BG(B) + '"') : d + ('"' + vG(B) + '"'));
                    break;
                case 14:
                case 11:
                case 12:
                case 10:
                case 9:
                case 13:
                    null == e && (e = {}), R = e[z], null !== R && (R || (R = e[z] = ["", null, null]), bH(R, D, A, B))
            }
        }
        if (null != e)for (z in e)t = qH(a, z, e[z]), d += " " + z + '="' + vG(t) + '"';
        u && (d += ' jsaction="' + BG(u) + '"');
        p && (d += ' jsinstance="' + vG(p) + '"');
        null != k && 0 < k.length && (d += ' class="' + vG(k.join(" ")) + '"');
        l && !m && (d += ' jsl="' + vG(l) + '"');
        if (null != f) {
            for (; "" != f && ";" == f[f.length - 1];)f = f.substr(0, f.length - 1);
            "" != f && (f = rH(g,
                f), d += ' style="' + vG(f) + '"')
        }
        l && m && (d += ' jsl="' + vG(l) + '"');
        n && (d += ' jsvs="' + vG(n) + '"');
        null != r && -1 != r.indexOf(".") && (d += ' jsan="' + r.substr(0, r.length - 1) + '"');
        c && (d += ' jstid="' + a.va + '"');
        return d + (b ? "/>" : ">")
    }

    cH.prototype.apply = function (a) {
        var b;
        b = a.nodeName;
        b = "input" == b || "INPUT" == b || "option" == b || "OPTION" == b || "select" == b || "SELECT" == b || "textarea" == b || "TEXTAREA" == b;
        this.J = !1;
        var c;
        a:{
            c = null == this.A ? 0 : this.A.length;
            var d = this.B == c;
            d ? this.C = this.A : -1 != this.B && fH(this);
            if (d) {
                if (b)for (d = 0; d < c; d += 7) {
                    var e = this.A[d + 1];
                    if (("checked" == e || "value" == e) && this.A[d + 5] != a[e]) {
                        c = !1;
                        break a
                    }
                }
                c = !0
            } else c = !1
        }
        if (!c) {
            c = null;
            if (null != this.C && (d = c = {}, 0 != (this.D & 768) && null != this.C))for (var e = this.C.length, f = 0; f < e; f += 7)if (null !=
                this.C[f + 5]) {
                var g = this.C[f + 0], k = this.C[f + 1], l = this.C[f + 2];
                5 == g || 7 == g ? d[k + "." + l] = !0 : -1 != g && 18 != g && 20 != g && (d[k] = !0)
            }
            var m = "", e = d = "", f = null, g = !1, n = null;
            a.hasAttribute("class") && (n = a.getAttribute("class").split(" "));
            for (var k = 0 != (this.D & 832) ? "" : null, l = "", p = this.A, r = p ? p.length : 0, u = 0; u < r; u += 7) {
                var t = p[u + 5], v = p[u + 0], y = p[u + 1], D = p[u + 2], z = p[u + 3], A = p[u + 6];
                if (null !== t && null != k && !A)switch (v) {
                    case -1:
                        k += t + ",";
                        break;
                    case 7:
                    case 5:
                        k += v + "." + D + ",";
                        break;
                    case 13:
                        k += v + "." + y + "." + D + ",";
                        break;
                    case 18:
                    case 20:
                        break;
                    default:
                        k +=
                            v + "." + y + ","
                }
                if (!(u < this.I))switch (null != c && void 0 !== t && (5 == v || 7 == v ? delete c[y + "." + D] : delete c[y]), v) {
                    case 7:
                        null === t ? null != n && tb(n, D) : null != t && (null == n ? n = [D] : sb(n, D) || n.push(D));
                        break;
                    case 4:
                        null === t ? a.style.cssText = "" : void 0 !== t && (a.style.cssText = rH(z, t));
                        for (var B in c)0 == B.lastIndexOf("style.", 0) && delete c[B];
                        break;
                    case 5:
                        try {
                            B = D.replace(/-(\S)/g, oH), a.style[B] != t && (a.style[B] = t || "")
                        } catch (R) {
                        }
                        break;
                    case 8:
                        null == f && (f = {});
                        f[y] = null === t ? null : t ? [t, null, z] : [a[y] || a.getAttribute(y) || "", null, z];
                        break;
                    case 18:
                        null != t && ("jsl" == y ? m += t : "jsvs" == y && (e += t));
                        break;
                    case 22:
                        null === t ? a.removeAttribute("jsaction") : null != t && ((v = p[u + 4]) && (t = Va(t)), l && (l += ";"), l += t);
                        break;
                    case 20:
                        null != t && (d && (d += ","), d += t);
                        break;
                    case 21:
                    case 0:
                        null === t ? a.removeAttribute(y) : null != t && ((v = p[u + 4]) && (t = Va(t)), t = rH(z, t), v = a.nodeName, !("CANVAS" != v && "canvas" != v || "width" != y && "height" != y) && t == a.getAttribute(y) || a.setAttribute(y, t));
                        if (b)if ("checked" == y) g = !0; else if (v = y, v = v.toLowerCase(), "value" == v || "checked" == v || "selected" == v || "selectedindex" ==
                            v) v = ZG.hasOwnProperty(y) ? ZG[y] : y, a[v] != t && (a[v] = t);
                        break;
                    case 14:
                    case 11:
                    case 12:
                    case 10:
                    case 9:
                    case 13:
                        null == f && (f = {}), z = f[y], null !== z && (z || (z = f[y] = [a[y] || a.getAttribute(y) || "", null, null]), bH(z, v, D, t))
                }
            }
            if (null != c)for (B in c)if (0 == B.lastIndexOf("class.", 0)) tb(n, B.substr(6)); else if (0 == B.lastIndexOf("style.", 0))try {
                a.style[B.substr(6).replace(/-(\S)/g, oH)] = ""
            } catch (R) {
            } else 0 != (this.D & 512) && "data-rtid" != B && a.removeAttribute(B);
            null != n && 0 < n.length ? a.setAttribute("class", vG(n.join(" "))) : a.hasAttribute("class") &&
                a.setAttribute("class", "");
            if (null != m && "" != m && a.hasAttribute("jsl")) {
                B = a.getAttribute("jsl");
                b = m.charAt(0);
                for (c = 0; ;) {
                    c = B.indexOf(b, c);
                    if (-1 == c) {
                        m = B + m;
                        break
                    }
                    if (0 == m.lastIndexOf(B.substr(c), 0)) {
                        m = B.substr(0, c) + m;
                        break
                    }
                    c += 1
                }
                a.setAttribute("jsl", m)
            }
            if (null != f)for (y in f)z = f[y], null === z ? (a.removeAttribute(y), a[y] = null) : (B = qH(this, y, z), a[y] = B, a.setAttribute(y, B));
            l && a.setAttribute("jsaction", l);
            d && a.setAttribute("jsinstance", d);
            e && a.setAttribute("jsvs", e);
            null != k && (-1 != k.indexOf(".") ? a.setAttribute("jsan",
                    k.substr(0, k.length - 1)) : a.removeAttribute("jsan"));
            g && (a.checked = !!a.getAttribute("checked"))
        }
    };
    function rH(a, b) {
        switch (a) {
            case null:
                return b;
            case 2:
                return FG(b);
            case 1:
                return a = Li(b).mb(), "about:invalid#zClosurez" === a ? "about:invalid#zjslayoutz" : a;
            case 8:
                return HG(b);
            default:
                return "sanitization_error_" + a
        }
    };
    var tH = {};

    function uH() {
        this.D = this.qa = this.C = this.B = this.error = this.A = null
    };
    function vH(a, b) {
        this.B = a;
        this.A = b
    }

    vH.prototype.get = function (a) {
        return this.B.A[this.A[a]] || null
    };
    var wH = /\s*;\s*/, xH = /&/g, yH = /^[$a-z_]*$/i, zH = /^[\$_a-z][\$_0-9a-z]*$/i, AH = /^\s*$/, BH = /^((de|en)codeURI(Component)?|is(Finite|NaN)|parse(Float|Int)|document|false|function|jslayout|null|this|true|undefined|window|Array|Boolean|Date|Error|JSON|Math|Number|Object|RegExp|String|__event)$/, CH = /[\$_a-z][\$_0-9a-z]*|'(\\\\|\\'|\\?[^'\\])*'|"(\\\\|\\"|\\?[^"\\])*"|[0-9]*\.?[0-9]+([e][-+]?[0-9]+)?|0x[0-9a-f]+|\-|\+|\*|\/|\%|\=|\<|\>|\&\&?|\|\|?|\!|\^|\~|\(|\)|\{|\}|\[|\]|\,|\;|\.|\?|\:|\@|#[0-9]+|[\s]+/gi,
        DH = {}, EH = {};

    function FH(a) {
        var b = a.match(CH);
        null == b && (b = []);
        if (b.join("").length != a.length) {
            for (var c = 0, d = 0; d < b.length && a.substr(c, b[d].length) == b[d]; d++)c += b[d].length;
            throw Error("Parsing error at position " + c + " of " + a);
        }
        return b
    }

    function GH(a, b, c) {
        for (var d = !1, e = []; b < c; b++) {
            var f = a[b];
            if ("{" == f) d = !0, e.push("}"); else if ("." == f || "new" == f || "," == f && "}" == e[e.length - 1]) d = !0; else if (AH.test(f)) a[b] = " "; else {
                if (!d && zH.test(f) && !BH.test(f)) {
                    if (a[b] = (null != DF[f] ? "g" : "v") + "." + f, "has" == f || "size" == f) b = HH(a, b + 1)
                } else if ("(" == f) e.push(")"); else if ("[" == f) e.push("]"); else if (")" == f || "]" == f || "}" == f) {
                    if (0 == e.length)throw Error('Unexpected "' + f + '".');
                    d = e.pop();
                    if (f != d)throw Error('Expected "' + d + '" but found "' + f + '".');
                }
                d = !1
            }
        }
        if (0 != e.length)throw Error("Missing bracket(s): " +
            e.join());
    }

    function HH(a, b) {
        for (; "(" != a[b] && b < a.length;)b++;
        a[b] = "(function(){return ";
        if (b == a.length)throw Error('"(" missing for has() or size().');
        b++;
        for (var c = b, d = 0, e = !0; b < a.length;) {
            var f = a[b];
            if ("(" == f) d++; else if (")" == f) {
                if (0 == d)break;
                d--
            } else"" != f.trim() && '"' != f.charAt(0) && "'" != f.charAt(0) && "+" != f && (e = !1);
            b++
        }
        if (b == a.length)throw Error('matching ")" missing for has() or size().');
        a[b] = "})";
        d = a.slice(c, b).join("").trim();
        if (e)for (e = "" + eval(d), e = FH(e), GH(e, 0, e.length), a[c] = e.join(""), c += 1; c < b; c++)a[c] =
            ""; else GH(a, c, b);
        return b
    }

    function IH(a, b) {
        for (var c = a.length; b < c; b++) {
            var d = a[b];
            if (":" == d)return b;
            if ("{" == d || "?" == d || ";" == d)break
        }
        return -1
    }

    function JH(a, b) {
        for (var c = a.length; b < c; b++)if (";" == a[b])return b;
        return c
    }

    function KH(a) {
        a = FH(a);
        return LH(a)
    }

    function MH(a) {
        return new Function("scope", "value", 'scope["' + a + '"] = value;')
    }

    function LH(a, b) {
        GH(a, 0, a.length);
        a = a.join("");
        b && (a = 'v["' + b + '"] = ' + a);
        b = EH[a];
        b || (b = new Function("v", "g", "return " + a), EH[a] = b);
        return b
    }

    function NH(a) {
        return a
    }

    var OH = [];

    function PH(a) {
        OH.length = 0;
        for (var b = 5; b < a.length; ++b) {
            var c = a[b];
            xH.test(c) ? OH.push(c.replace(xH, "&&")) : OH.push(c)
        }
        return OH.join("&")
    }

    function QH(a) {
        var b = [], c;
        for (c in DH)delete DH[c];
        a = FH(a);
        c = 0;
        for (var d = a.length; c < d;) {
            for (var e = [null, null, null, null, null], f = "", g = ""; c < d; c++) {
                g = a[c];
                if ("?" == g || ":" == g) {
                    "" != f && e.push(f);
                    break
                }
                AH.test(g) || ("." == g ? ("" != f && e.push(f), f = "") : f = '"' == g.charAt(0) || "'" == g.charAt(0) ? f + eval(g) : f + g)
            }
            if (c >= d)break;
            var f = JH(a, c + 1), k = PH(e), l = DH[k], m = "undefined" == typeof l;
            m && (l = DH[k] = b.length, b.push(e));
            e = b[l];
            e[1] = EG(e);
            c = LH(a.slice(c + 1, f));
            ":" == g ? e[4] = c : "?" == g && (e[3] = c);
            if (m) {
                var n, g = e[5];
                "class" == g || "className" ==
                g ? 6 == e.length ? n = 6 : (e.splice(5, 1), n = 7) : "style" == g ? 6 == e.length ? n = 4 : (e.splice(5, 1), n = 5) : g in SG ? 6 == e.length ? n = 8 : "hash" == e[6] ? (n = 14, e.length = 6) : "host" == e[6] ? (n = 11, e.length = 6) : "path" == e[6] ? (n = 12, e.length = 6) : "param" == e[6] && 8 <= e.length ? (n = 13, e.splice(6, 1)) : "port" == e[6] ? (n = 10, e.length = 6) : "protocol" == e[6] ? (n = 9, e.length = 6) : b.splice(l, 1) : n = 0;
                e[0] = n
            }
            c = f + 1
        }
        return b
    }

    function RH(a, b) {
        var c = MH(a);
        return function (a) {
            var d = b(a);
            c(a, d);
            return d
        }
    };
    var SH = 0, TH = {0: []}, UH = {};

    function VH(a, b) {
        var c = String(++SH);
        UH[b] = c;
        TH[c] = a;
        return c
    }

    function WH(a, b) {
        a.setAttribute("jstcache", b);
        a.__jstcache = TH[b]
    }

    var XH = [];

    function YH(a) {
        a.length = 0;
        XH.push(a)
    }

    for (var ZH = [["jscase", KH, "$sc"], ["jscasedefault", NH, "$sd"], ["jsl", null, null], ["jsglobals", function (a) {
        var b = [];
        a = a.split(wH);
        for (var c = 0, d = a ? a.length : 0; c < d; ++c) {
            var e = Ka(a[c]);
            if (e) {
                var f = e.indexOf(":");
                if (-1 != f) {
                    var g = Ka(e.substring(0, f)), e = Ka(e.substring(f + 1)), f = e.indexOf(" ");
                    -1 != f && (e = e.substring(f + 1));
                    b.push([MH(g), e])
                }
            }
        }
        return b
    }, "$g", !0], ["jsfor", function (a) {
        var b = [];
        a = FH(a);
        for (var c = 0, d = a.length; c < d;) {
            var e = [], f = IH(a, c);
            if (-1 == f) {
                if (AH.test(a.slice(c, d).join("")))break;
                f = c - 1
            } else for (var g =
                c; g < f;) {
                var k = mb(a, ",", g);
                if (-1 == k || k > f) k = f;
                e.push(MH(Ka(a.slice(g, k).join(""))));
                g = k + 1
            }
            0 == e.length && e.push(MH("$this"));
            1 == e.length && e.push(MH("$index"));
            2 == e.length && e.push(MH("$count"));
            if (3 != e.length)throw Error("Max 3 vars for jsfor; got " + e.length);
            c = JH(a, c);
            e.push(LH(a.slice(f + 1, c)));
            b.push(e);
            c += 1
        }
        return b
    }, "for", !0], ["jskey", KH, "$k"], ["jsdisplay", KH, "display"], ["jsmatch", null, null], ["jsif", KH, "display"], [null, KH, "$if"], ["jsvars", function (a) {
        var b = [];
        a = FH(a);
        for (var c = 0, d = a.length; c < d;) {
            var e =
                IH(a, c);
            if (-1 == e)break;
            var f = JH(a, e + 1), c = Ka(a.slice(c, e).join("")), e = LH(a.slice(e + 1, f), c);
            b.push(e);
            c = f + 1
        }
        return b
    }, "var", !0], [null, function (a) {
        return [MH(a)]
    }, "$vs"], ["jsattrs", QH, "_a", !0], [null, QH, "$a", !0], [null, function (a) {
        var b = a.indexOf(":");
        return [a.substr(0, b), a.substr(b + 1)]
    }, "$ua"], [null, function (a) {
        var b = a.indexOf(":");
        return [a.substr(0, b), KH(a.substr(b + 1))]
    }, "$uae"], [null, function (a) {
        var b = [];
        a = FH(a);
        for (var c = 0, d = a.length; c < d;) {
            var e = IH(a, c);
            if (-1 == e)break;
            var f = JH(a, e + 1), c = Ka(a.slice(c,
                e).join("")), e = LH(a.slice(e + 1, f), c);
            b.push([c, e]);
            c = f + 1
        }
        return b
    }, "$ia", !0], [null, function (a) {
        var b = [];
        a = FH(a);
        for (var c = 0, d = a.length; c < d;) {
            var e = IH(a, c);
            if (-1 == e)break;
            var f = JH(a, e + 1), c = Ka(a.slice(c, e).join("")), e = LH(a.slice(e + 1, f), c);
            b.push([c, MH(c), e]);
            c = f + 1
        }
        return b
    }, "$ic", !0], [null, NH, "$rj"], ["jseval", function (a) {
        var b = [];
        a = FH(a);
        for (var c = 0, d = a.length; c < d;) {
            var e = JH(a, c);
            b.push(LH(a.slice(c, e)));
            c = e + 1
        }
        return b
    }, "$e", !0], ["jsskip", KH, "$sk"], ["jsswitch", KH, "$s"], ["jscontent", function (a) {
        var b =
            a.indexOf(":"), c = null;
        if (-1 != b) {
            var d = Ka(a.substr(0, b));
            yH.test(d) && (c = "html_snippet" == d ? 1 : "raw" == d ? 2 : "safe" == d ? 7 : null, a = Ka(a.substr(b + 1)))
        }
        return [c, !1, KH(a)]
    }, "$c"], ["transclude", NH, "$u"], [null, KH, "$ue"], [null, null, "$up"]], $H = {}, aI = 0; aI < ZH.length; ++aI) {
        var bI = ZH[aI];
        bI[2] && ($H[bI[2]] = [bI[1], bI[3]])
    }
    $H.$t = [NH, !1];
    $H.$x = [NH, !1];
    $H.$u = [NH, !1];
    function cI(a, b) {
        if (!b || !b.getAttribute)return null;
        dI(a, b, null);
        var c = b.__rt;
        return c && c.length ? c[c.length - 1] : cI(a, b.parentNode)
    }

    function eI(a) {
        var b = TH[UH[a + " 0"] || "0"];
        "$t" != b[0] && (b = ["$t", a].concat(b));
        return b
    }

    var fI = /^\$x (\d+);?/;

    function gI(a, b) {
        a = UH[b + " " + a];
        return TH[a] ? a : null
    }

    function hI(a, b) {
        a = gI(a, b);
        return null != a ? TH[a] : null
    }

    function iI(a, b, c, d, e) {
        if (d == e)return YH(b), "0";
        "$t" == b[0] ? a = b[1] + " 0" : (a += ":", a = 0 == d && e == c.length ? a + c.join(":") : a + c.slice(d, e).join(":"));
        (c = UH[a]) ? YH(b) : c = VH(b, a);
        return c
    }

    var jI = /\$t ([^;]*)/g;

    function kI(a) {
        var b = a.__rt;
        b || (b = a.__rt = []);
        return b
    }

    function dI(a, b, c) {
        if (!b.__jstcache) {
            b.hasAttribute("jstid") && (b.getAttribute("jstid"), b.removeAttribute("jstid"));
            var d = b.getAttribute("jstcache");
            if (null != d && TH[d]) b.__jstcache = TH[d]; else {
                d = b.getAttribute("jsl");
                jI.lastIndex = 0;
                for (var e; e = jI.exec(d);)kI(b).push(e[1]);
                null == c && (c = String(cI(a, b.parentNode)));
                if (a = fI.exec(d)) e = a[1], d = gI(e, c), null == d && (a = XH.length ? XH.pop() : [], a.push("$x"), a.push(e), e = c + ":" + a.join(":"), (d = UH[e]) && TH[d] ? YH(a) : d = VH(a, e)), WH(b, d), b.removeAttribute("jsl"); else {
                    a = XH.length ?
                        XH.pop() : [];
                    d = 0;
                    for (e = ZH.length; d < e; ++d) {
                        var f = ZH[d], g = f[0];
                        if (g) {
                            var k = b.getAttribute(g);
                            if (k) {
                                f = f[2];
                                if ("jsl" == g) {
                                    for (var f = k, k = a, l = FH(f), m = l.length, n = 0, p = ""; n < m;) {
                                        var r = JH(l, n);
                                        AH.test(l[n]) && n++;
                                        if (!(n >= r)) {
                                            var u = l[n++];
                                            if (!zH.test(u))throw Error('Cmd name expected; got "' + u + '" in "' + f + '".');
                                            if (n < r && !AH.test(l[n]))throw Error('" " expected between cmd and param.');
                                            n = l.slice(n + 1, r).join("");
                                            "$a" == u ? p += n + ";" : (p && (k.push("$a"), k.push(p), p = ""), $H[u] && (k.push(u), k.push(n)))
                                        }
                                        n = r + 1
                                    }
                                    p && (k.push("$a"),
                                        k.push(p))
                                } else if ("jsmatch" == g)for (f = a, k = FH(k), l = k.length, r = 0; r < l;)m = IH(k, r), p = JH(k, r), r = k.slice(r, p).join(""), AH.test(r) || (-1 !== m ? (f.push("display"), f.push(k.slice(m + 1, p).join("")), f.push("var")) : f.push("display"), f.push(r)), r = p + 1; else a.push(f), a.push(k);
                                b.removeAttribute(g)
                            }
                        }
                    }
                    if (0 == a.length) WH(b, "0"); else {
                        if ("$u" == a[0] || "$t" == a[0]) c = a[1];
                        e = c + ":" + a.join(":");
                        d = UH[e];
                        if (!d || !TH[d])a:{
                            d = a;
                            e = "0";
                            g = XH.length ? XH.pop() : [];
                            k = f = 0;
                            for (l = d.length; k < l; k += 2) {
                                m = d[k];
                                r = d[k + 1];
                                p = $H[m];
                                u = p[1];
                                p = (0, p[0])(r);
                                "$t" ==
                                m && r && (c = r);
                                if ("$k" == m) "for" == g[g.length - 2] && (g[g.length - 2] = "$fk", g[g.length - 2 + 1].push(p)); else if ("$t" == m && "$x" == d[k + 2]) {
                                    p = gI("0", c);
                                    if (null != p) {
                                        0 == f && (e = p);
                                        YH(g);
                                        d = e;
                                        break a
                                    }
                                    g.push("$t");
                                    g.push(r)
                                } else if (u)for (r = 0, u = p.length; r < u; ++r)if (n = p[r], "_a" == m) {
                                    var t = n[0], v = n[5], y = v.charAt(0);
                                    "$" == y ? (g.push("var"), g.push(RH(n[5], n[4]))) : "@" == y ? (g.push("$a"), n[5] = v.substr(1), g.push(n)) : 6 == t || 7 == t || 4 == t || 5 == t || "jsaction" == v || "jsnamespace" == v || v in SG ? (g.push("$a"), g.push(n)) : (ZG.hasOwnProperty(v) && (n[5] = ZG[v]),
                                                6 == n.length && (g.push("$a"), g.push(n)))
                                } else g.push(m), g.push(n); else g.push(m), g.push(p);
                                if ("$u" == m || "$ue" == m || "$up" == m || "$x" == m) m = k + 2, p = iI(c, g, d, f, m), 0 == f && (e = p), g = [], f = m
                            }
                            p = iI(c, g, d, f, d.length);
                            0 == f && (e = p);
                            d = e
                        }
                        WH(b, d)
                    }
                    YH(a)
                }
            }
        }
    }

    function lI(a) {
        return function () {
            return a
        }
    };
    function mI(a) {
        var b = pa("google.cd");
        b && a(b)
    }

    function nI(a, b) {
        mI(function (c) {
            c.c(a, null, void 0, void 0, b)
        })
    };
    function oI(a) {
        a = a.split("$");
        this.B = a[0];
        this.A = a[1] || null
    }

    function pI(a, b, c) {
        var d = b.call(c, a.B);
        x(d) || null == a.A || (d = b.call(c, a.A));
        return d
    };
    function qI(a) {
        this.C = a;
        this.A = {};
        this.F = {};
        this.H = {};
        this.G = {};
        this.D = {};
        this.B = C
    }

    function rI(a, b) {
        return !!pI(new oI(b), function (a) {
            return this.A[a]
        }, a)
    }

    qI.prototype.Pa = function () {
        for (var a in this.A)if (this.A.hasOwnProperty(a))return !1;
        return !0
    };
    function sI(a, b, c, d) {
        b = pI(new oI(b), function (a) {
            return a in this.A ? a : void 0
        }, a);
        var e = a.F[b], f = a.H[b], g = a.G[b], k = a.D[b];
        try {
            var l = new e;
            c.A = l;
            l.nh = c;
            l.Od = b;
            c.B = a;
            var m = f ? new f(d) : null;
            c.C = m;
            var n = g ? new g(l) : null;
            c.qa = n;
            a.B("controller_init", l.Od);
            k(l, m, n);
            a.B("controller_init", l.Od);
            return l
        } catch (p) {
            c.A = null;
            c.error = p;
            nI(b, p);
            try {
                a.C.A(p)
            } catch (r) {
            }
            return null
        }
    };
    function tI() {
        this.A = C
    };
    function uI() {
        this.A = {}
    }

    uI.prototype.add = function (a, b) {
        this.A[a] = b
    };
    function vI(a, b) {
        this.B = x(a) ? a : document;
        this.G = null;
        this.H = {};
        this.C = [];
        this.F = b || new uI;
        this.J = this.B ? ob(this.B.getElementsByTagName("style"), function (a) {
                return a.innerHTML
            }).join() : "";
        this.A = {}
    }

    vI.prototype.document = h("B");
    function wI(a) {
        var b = a.B.createElement("STYLE");
        a.B.head ? a.B.head.appendChild(b) : a.B.body.appendChild(b);
        return b
    };
    function xI(a, b, c) {
        vI.call(this, a, c);
        this.D = b || new qI(new tI);
        this.I = []
    }

    G(xI, vI);
    var yI = [];

    function zI(a, b) {
        if ("number" == typeof a[3]) {
            var c = a[3];
            a[3] = b[c];
            a.lc = c
        } else"undefined" == typeof a[3] && (a[3] = yI, a.lc = -1);
        "number" != typeof a[1] && (a[1] = 0);
        if ((a = a[4]) && "string" != typeof a)for (c = 0; c < a.length; ++c)a[c] && "string" != typeof a[c] && zI(a[c], b)
    };
    var AI = ["unresolved", null];

    function BI(a) {
        this.element = a;
        this.C = this.F = this.B = this.A = this.next = null;
        this.D = !1
    }

    function CI() {
        this.B = null;
        this.D = String;
        this.C = "";
        this.A = null
    }

    function DI(a, b, c, d, e) {
        this.B = a;
        this.F = b;
        this.L = this.I = this.H = 0;
        this.O = "";
        this.K = [];
        this.N = !1;
        this.T = c;
        this.A = d;
        this.J = 0;
        this.G = this.C = null;
        this.D = e;
        this.M = null
    }

    function EI(a, b) {
        return a == b || null != a.G && EI(a.G, b) ? !0 : 2 == a.J && null != a.C && null != a.C[0] && EI(a.C[0], b)
    }

    function FI(a, b, c) {
        if (a.B == AI && a.D == b)return a;
        if (null != a.K && 0 < a.K.length && "$t" == a.B[a.H]) {
            if (a.B[a.H + 1] == b)return a;
            c && c.push(a.B[a.H + 1])
        }
        if (null != a.G) {
            var d = FI(a.G, b, c);
            if (d)return d
        }
        return 2 == a.J && null != a.C && null != a.C[0] ? FI(a.C[0], b, c) : null
    }

    function GI(a) {
        var b = a.M;
        if (null != b) {
            var c = b["action:load"];
            null != c && (c.call(a.T.element), b["action:load"] = null);
            c = b["action:create"];
            null != c && (c.call(a.T.element), b["action:create"] = null)
        }
        null != a.G && GI(a.G);
        2 == a.J && null != a.C && null != a.C[0] && GI(a.C[0])
    };
    function HI(a, b, c) {
        this.B = a;
        this.G = a.document();
        ++GF;
        this.F = this.D = this.A = null;
        this.C = !1;
        this.I = 2 == (b & 2);
        this.H = null == c ? null : F() + c
    }

    var II = [];

    function JI(a, b, c) {
        if (a.D == b) b = null; else if (a.D == c)return null == b;
        if (null != a.G)return JI(a.G, b, c);
        if (null != a.C)for (var d = 0; d < a.C.length; d++) {
            var e = a.C[d];
            if (null != e) {
                if (e.T.element != a.T.element)break;
                e = JI(e, b, c);
                if (null != e)return e
            }
        }
        return null
    }

    function KI(a, b, c, d) {
        if (c != a)return ik(a, c);
        if (b == d)return !0;
        a = a.__cdn;
        return null != a && 1 == JI(a, b, d)
    }

    function LI(a, b) {
        if (b.T.element && !b.T.element.__cdn) MI(a, b); else if (NI(b)) {
            var c = b.D;
            if (b.T.element) {
                var d = b.T.element;
                if (b.N) {
                    var e = b.T.A;
                    null != e && e.reset(c || void 0)
                }
                for (var c = b.K, e = !!b.A.A.Ha, f = c.length, g = 1 == b.J, k = b.H, l = 0; l < f; ++l) {
                    var m = c[l], n = b.B[k], p = OI[n];
                    if (null != m)if (null == m.B) p.method.call(a, b, m, k); else {
                        var r = JF(b.A, m.B, d), u = m.D(r);
                        if (0 != p.la) {
                            if (p.method.call(a, b, m, k, r, m.C != u), m.C = u, ("display" == n || "$if" == n) && !r || "$sk" == n && r) {
                                g = !1;
                                break
                            }
                        } else u != m.C && (m.C = u, p.method.call(a, b, m, k, r))
                    }
                    k += 2
                }
                g &&
                (PI(a, b.T, b), QI(a, b));
                b.A.A.Ha = e
            } else QI(a, b)
        }
    }

    function QI(a, b) {
        if (1 == b.J && (b = b.C, null != b))for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            null != d && LI(a, d)
        }
    }

    function RI(a, b) {
        var c = a.__cdn;
        null != c && EI(c, b) || (a.__cdn = b)
    }

    function MI(a, b) {
        var c = b.T.element;
        if (!NI(b))return !1;
        var d = b.D;
        c.__vs && (c.__vs[0] = 1);
        RI(c, b);
        c = !!b.A.A.Ha;
        if (!b.B.length)return b.C = [], b.J = 1, SI(a, b, d), b.A.A.Ha = c, !0;
        b.N = !0;
        TI(a, b);
        b.A.A.Ha = c;
        return !0
    }

    function SI(a, b, c) {
        for (var d = b.A, e = fk(b.T.element); e; e = hk(e)) {
            var f = new DI(UI(a, e, c), null, new BI(e), d, c);
            MI(a, f);
            e = f.T.next || f.T.element;
            0 == f.K.length && e.__cdn ? null != f.C && xb(b.C, f.C) : b.C.push(f)
        }
    }

    function VI(a, b, c) {
        var d = b.A, e = b.F[4];
        if (e)if ("string" == typeof e) a.A += e; else for (var f = !!d.A.Ha, g = 0; g < e.length; ++g) {
            var k = e[g];
            if ("string" == typeof k) a.A += k; else {
                var k = new DI(k[3], k, new BI(null), d, c), l = a, m = k;
                if (0 == m.B.length) {
                    var n = m.D, p = m.T;
                    m.C = [];
                    m.J = 1;
                    WI(l, m);
                    PI(l, p, m);
                    if (0 != (p.A.D & 2048)) {
                        var r = m.A.A.Za;
                        m.A.A.Za = !1;
                        VI(l, m, n);
                        m.A.A.Za = !1 !== r
                    } else VI(l, m, n);
                    XI(l, p, m)
                } else m.N = !0, TI(l, m);
                0 != k.K.length ? b.C.push(k) : null != k.C && xb(b.C, k.C);
                d.A.Ha = f
            }
        }
    }

    function YI(a, b, c) {
        var d = b.T;
        d.D = !0;
        !1 === b.A.A.Za ? (PI(a, d, b), XI(a, d, b)) : (d = a.C, a.C = !0, TI(a, b, c), a.C = d)
    }

    function TI(a, b, c) {
        var d = b.T, e = b.D, f = b.B, g = c || b.H;
        if (0 == g)if ("$t" == f[0] && "$x" == f[2]) {
            var k = f[3];
            c = f[1];
            k = hI(k, c);
            if (null != k) {
                b.B = k;
                b.D = c;
                TI(a, b);
                return
            }
        } else if ("$x" == f[0] && (k = f[1], k = hI(k, e), null != k)) {
            b.B = k;
            TI(a, b);
            return
        }
        for (c = f.length; g < c; g += 2) {
            var k = f[g], l = f[g + 1];
            "$t" == k && (e = l);
            d.A || (null != a.A ? "for" != k && "$fk" != k && WI(a, b) : "$a" != k && "$u" != k && "$ua" != k && "$uae" != k && "$ue" != k && "$up" != k && "display" != k && "$if" != k && "$dd" != k && "$dc" != k && "$dh" != k && "$sk" != k || ZI(d, e));
            if (k = OI[k]) {
                var m = new CI, l = b, n = m, p = l.B[g + 1];
                switch (l.B[g]) {
                    case "$ue":
                        n.D = MF;
                        n.B = p;
                        break;
                    case "for":
                        n.D = $I;
                        n.B = p[3];
                        break;
                    case "$fk":
                        n.A = [];
                        n.D = aJ(l.A, l.T, p, n.A);
                        n.B = p[3];
                        break;
                    case "display":
                    case "$if":
                    case "$sk":
                    case "$s":
                        n.B = p;
                        break;
                    case "$c":
                        n.B = p[2]
                }
                var l = a, n = b, p = g, r = n.T, u = r.element, t = n.B[p], v = n.A, y = null;
                if (m.B)if (l.C) {
                    y = "";
                    switch (t) {
                        case "$ue":
                            y = bJ;
                            break;
                        case "for":
                        case "$fk":
                            y = II;
                            break;
                        case "display":
                        case "$if":
                        case "$sk":
                            y = !0;
                            break;
                        case "$s":
                            y = 0;
                            break;
                        case "$c":
                            y = ""
                    }
                    y = cJ(v, m.B, u, y)
                } else y = JF(v, m.B, u);
                u = m.D(y);
                m.C = u;
                t = OI[t];
                4 == t.la ?
                    (n.C = [], n.J = t.A) : 3 == t.la && (r = n.G = new DI(AI, null, r, new EF, "null"), r.I = n.I + 1, r.L = n.L);
                n.K.push(m);
                t.method.call(l, n, m, p, y, !0);
                if (0 != k.la)return
            } else g == b.H ? b.H += 2 : b.K.push(null)
        }
        if (null == a.A || "style" != d.A.name()) PI(a, d, b), b.C = [], b.J = 1, null != a.A ? VI(a, b, e) : SI(a, b, e), 0 == b.C.length && (b.C = null), XI(a, d, b)
    }

    function cJ(a, b, c, d) {
        try {
            return JF(a, b, c)
        } catch (e) {
            return d
        }
    }

    var bJ = new LF("null");

    function $I(a) {
        return String(dJ(a).length)
    }

    HI.prototype.J = function (a, b, c, d, e) {
        PI(this, a.T, a);
        c = a.C;
        if (e)if (null != this.A) {
            c = a.C;
            e = a.A;
            for (var f = a.F[4], g = -1, k = 0; k < f.length; ++k) {
                var l = f[k][3];
                if ("$sc" == l[0]) {
                    if (JF(e, l[1], null) === d) {
                        g = k;
                        break
                    }
                } else"$sd" == l[0] && (g = k)
            }
            b.A = g;
            for (k = 0; k < f.length; ++k)b = f[k], b = c[k] = new DI(b[3], b, new BI(null), e, a.D), this.C && (b.T.D = !0), k == g ? TI(this, b) : a.F[2] && YI(this, b);
            XI(this, a.T, a)
        } else {
            e = a.A;
            k = a.T.element;
            g = [];
            f = -1;
            for (k = fk(k); k; k = hk(k))l = UI(this, k, a.D), "$sc" == l[0] ? (g.push(k), JF(e, l[1], k) === d && (f = g.length - 1)) : "$sd" ==
                l[0] && (g.push(k), -1 == f && (f = g.length - 1)), k = XG(k);
            d = 0;
            for (l = g.length; d < l; ++d) {
                var m = d == f, k = c[d];
                m || null == k || eJ(this.B, k, !0);
                for (var k = g[d], n = XG(k), p = !0; p; k = k.nextSibling)fo(k, m), k == n && (p = !1)
            }
            b.A = f;
            -1 != f && (b = c[f], null == b ? (b = g[f], k = c[f] = new DI(UI(this, b, a.D), null, new BI(b), e, a.D), MI(this, k)) : LI(this, b))
        } else-1 != b.A && (f = b.A, LI(this, c[f]))
    };
    function fJ(a, b) {
        a = a.B;
        for (var c in a)b.A[c] = a[c]
    }

    function gJ(a, b) {
        this.B = a;
        this.A = b;
        this.dc = null
    }

    gJ.prototype.ra = function () {
        if (null != this.dc)for (var a = 0; a < this.dc.length; ++a)this.dc[a].B(this)
    };
    function hJ(a) {
        null == a.M && (a.M = {});
        return a.M
    }

    q = HI.prototype;
    q.Nk = function (a, b, c) {
        b = a.A;
        var d = a.T.element;
        c = a.B[c + 1];
        var e = c[0], f = c[1];
        c = hJ(a);
        var e = "observer:" + e, g = c[e];
        b = JF(b, f, d);
        if (null != g) {
            if (g.dc[0] == b)return;
            g.ra()
        }
        a = new gJ(this.B, a);
        null == a.dc ? a.dc = [b] : a.dc.push(b);
        b.A(a);
        c[e] = a
    };
    q.an = function (a, b, c, d, e) {
        c = a.G;
        e && (c.K.length = 0, c.D = d.A, c.B = AI);
        if (!iJ(this, a, b)) {
            e = a.T;
            var f = this.B.A[d.A];
            null != f && (iH(e.A, 768), KF(c.A, a.A, II), fJ(d, c.A), jJ(this, a, c, f, b, d.B))
        }
    };
    q.Ib = function (a, b, c) {
        if (null != this.A)return !1;
        if (null != this.H && this.H <= F()) {
            a:{
                c = new gJ(this.B, a);
                var d = c.A.T.element;
                b = c.A.D;
                a = c.B.I;
                if (0 != a.length)for (var e = a.length - 1; 0 <= e; --e) {
                    var f = a[e], g = f.A.T.element, f = f.A.D;
                    if (KI(g, f, d, b))break a;
                    KI(d, b, g, f) && a.splice(e, 1)
                }
                a.push(c)
            }
            return !0
        }
        e = b.A;
        if (null == e) b.A = e = new EF, KF(e, a.A), c = !0; else {
            b = e;
            a = a.A;
            e = !1;
            for (d in b.A)if (g = a.A[d], b.A[d] != g && (b.A[d] = g, c && ua(c) ? -1 != c.indexOf(d) : null != c[d])) e = !0;
            c = e
        }
        return this.I && !c
    };
    function kJ(a, b, c) {
        return null != a.A && a.C && b.F[2] ? (c.C = "", !0) : !1
    }

    function iJ(a, b, c) {
        return kJ(a, b, c) ? (PI(a, b.T, b), XI(a, b.T, b), !0) : !1
    }

    q.Ym = function (a, b, c) {
        if (!iJ(this, a, b)) {
            var d = a.G;
            c = a.B[c + 1];
            d.D = c;
            c = this.B.A[c];
            null != c && (KF(d.A, a.A, c.oc), jJ(this, a, d, c, b, c.oc))
        }
    };
    function jJ(a, b, c, d, e, f) {
        if (null == e || null == d || !d.async || !a.Ib(c, e, f))if (c.B != AI) LI(a, c); else {
            f = c.T;
            (e = f.element) && RI(e, c);
            null == f.B && (f.B = e ? kI(e) : []);
            f = f.B;
            var g = c.I;
            f.length < g - 1 ? (c.B = eI(c.D), TI(a, c)) : f.length == g - 1 ? lJ(a, b, c) : f[g - 1] != c.D ? (f.length = g - 1, null != b && eJ(a.B, b, !1), lJ(a, b, c)) : e && (null == d || null == d.Rd ? 0 : d.Rd != e.getAttribute("jssc")) ? (f.length = g - 1, lJ(a, b, c)) : (c.B = eI(c.D), TI(a, c))
        }
    }

    q.bn = function (a, b, c) {
        var d = a.B[c + 1];
        if (d[2] || !iJ(this, a, b)) {
            var e = a.G;
            e.D = d[0];
            var f = this.B.A[e.D];
            if (null != f) {
                var g = e.A;
                KF(g, a.A, II);
                c = a.T.element;
                if (d = d[1])for (var k in d) {
                    var l = JF(a.A, d[k], c);
                    g.A[k] = l
                }
                f.Bg ? (PI(this, a.T, a), b = f.fk(this.B, g.A), null != this.A ? this.A += b : (RG(c, b), "TEXTAREA" != c.nodeName && "textarea" != c.nodeName || c.value === b || (c.value = b)), XI(this, a.T, a)) : jJ(this, a, e, f, b, d)
            }
        }
    };
    q.Zm = function (a, b, c) {
        var d = a.B[c + 1];
        c = d[0];
        var e = d[1], f = a.T, g = f.A;
        if (!f.element || "NARROW_PATH" != f.element.__narrow_strategy)if (f = this.B.A[e])if (d = d[2], null == d || JF(a.A, d, null)) d = b.A, null == d && (b.A = d = new EF), KF(d, a.A, f.oc), "*" == c ? mJ(this, e, f, d, g) : nJ(this, e, f, c, d, g)
    };
    q.$m = function (a, b, c) {
        var d = a.B[c + 1];
        c = d[0];
        var e = a.T.element;
        if (!e || "NARROW_PATH" != e.__narrow_strategy) {
            var f = a.T.A, e = JF(a.A, d[1], e), g = e.A, k = this.B.A[g];
            k && (d = d[2], null == d || JF(a.A, d, null)) && (d = b.A, null == d && (b.A = d = new EF), KF(d, a.A, II), fJ(e, d), "*" == c ? mJ(this, g, k, d, f) : nJ(this, g, k, c, d, f))
        }
    };
    function nJ(a, b, c, d, e, f) {
        e.A.Za = !1;
        var g = "";
        if (c.elements || c.Bg) c.Bg ? g = vG(Ka(c.fk(a.B, e.A))) : (c = c.elements, e = new DI(c[3], c, new BI(null), e, b), e.T.B = [], b = a.A, a.A = "", TI(a, e), e = a.A, a.A = b, g = e);
        g || (g = eH(f.name(), d));
        g && lH(f, 0, d, g, !0, !1)
    }

    function mJ(a, b, c, d, e) {
        c.elements && (c = c.elements, b = new DI(c[3], c, new BI(null), d, b), b.T.B = [], b.T.A = e, iH(e, c[1]), e = a.A, a.A = "", TI(a, b), a.A = e)
    }

    function lJ(a, b, c) {
        var d = c.D, e = c.T, f = e.B || e.element.__rt, g = a.B.A[d];
        if (g && g.ik) null != a.A && (c = e.A.id(), a.A += sH(e.A, !1, !0) + jH(e.A), a.D[c] = e); else if (g && g.elements) {
            e.element && lH(e.A, 0, "jstcache", e.element.getAttribute("jstcache") || "0", !1, !0);
            null == e.element && b && b.F && b.F[2] && -1 != b.F.lc && 0 != b.F.lc && oJ(e.A, b.D, b.F.lc);
            f.push(d);
            for (var d = a.B, f = c.A, k = g.Ai, l = null == k ? 0 : k.length, m = 0; m < l; ++m)for (var n = k[m], p = 0; p < n.length; p += 2) {
                var r = n[p + 1];
                switch (n[p]) {
                    case "css":
                        var u = "string" == typeof r ? r : JF(f, r, null);
                        u &&
                        (r = d, u in r.H || (r.H[u] = !0, -1 == r.J.indexOf(u) && r.C.push(u)));
                        break;
                    case "$g":
                        (0, r[0])(f.A, f.B ? f.B.A[r[1]] : null);
                        break;
                    case "var":
                        JF(f, r, null)
                }
            }
            null == e.element && e.A && b && pJ(e.A, b);
            "jsl" == g.elements[0] && ("jsl" != e.A.name() || b.F && b.F[2]) && pH(e.A, !0);
            c.F = g.elements;
            e = c.T;
            g = c.F;
            if (b = null == a.A) a.A = "", a.D = {}, a.F = {};
            c.B = g[3];
            iH(e.A, g[1]);
            g = a.A;
            a.A = "";
            0 != (e.A.D & 2048) ? (d = c.A.A.Za, c.A.A.Za = !1, TI(a, c, void 0), c.A.A.Za = !1 !== d) : TI(a, c, void 0);
            a.A = g + a.A;
            if (b) {
                c = a.B;
                c.B && 0 != c.C.length && (b = c.C.join(""), bc ? (c.G || (c.G =
                        wI(c)), g = c.G) : g = wI(c), g.styleSheet && !g.sheet ? g.styleSheet.cssText += b : g.textContent += b, c.C.length = 0);
                c = e.element;
                g = a.G;
                b = a.A;
                if ("" != b || "" != c.innerHTML)if (d = c.nodeName.toLowerCase(), e = 0, "table" == d ? (b = "<table>" + b + "</table>", e = 1) : "tbody" == d || "thead" == d || "tfoot" == d || "caption" == d || "colgroup" == d || "col" == d ? (b = "<table><tbody>" + b + "</tbody></table>", e = 2) : "tr" == d && (b = "<table><tbody><tr>" + b + "</tr></tbody></table>", e = 3), 0 == e) c.innerHTML = b; else {
                    g = g.createElement("div");
                    g.innerHTML = b;
                    for (b = 0; b < e; ++b)g = g.firstChild;
                    ck(c);
                    for (e = g.firstChild; e; e = g.firstChild)c.appendChild(e)
                }
                c = c.querySelectorAll ? c.querySelectorAll("[jstid]") : [];
                for (e = 0; e < c.length; ++e) {
                    g = c[e];
                    d = g.getAttribute("jstid");
                    b = a.D[d];
                    d = a.F[d];
                    g.removeAttribute("jstid");
                    for (f = b; f; f = f.F)f.element = g;
                    b.B && (g.__rt = b.B, b.B = null);
                    g.__cdn = d;
                    GI(d);
                    g.__jstcache = d.B;
                    if (b.C) {
                        for (g = 0; g < b.C.length; ++g)d = b.C[g], d.shift().apply(a, d);
                        b.C = null
                    }
                }
                a.A = null;
                a.D = null;
                a.F = null
            }
        }
    }

    function qJ(a, b, c, d) {
        var e = b.cloneNode(!1);
        if (null == b.__rt)for (b = b.firstChild; null != b; b = b.nextSibling)1 == b.nodeType ? e.appendChild(qJ(a, b, c, !0)) : e.appendChild(b.cloneNode(!0)); else e.__rt && delete e.__rt;
        e.__cdn && delete e.__cdn;
        e.__ctx && delete e.__ctx;
        e.__rjsctx && delete e.__rjsctx;
        d || fo(e, !0);
        return e
    }

    function dJ(a) {
        return null == a ? [] : ua(a) ? a : [a]
    }

    function aJ(a, b, c, d) {
        var e = c[0], f = c[1], g = c[2], k = c[4];
        return function (c) {
            var l = b.element;
            c = dJ(c);
            var n = c.length;
            g(a.A, n);
            for (var p = d.length = 0; p < n; ++p) {
                e(a.A, c[p]);
                f(a.A, p);
                var r = JF(a, k, l);
                d.push(String(r))
            }
            return d.join(",")
        }
    }

    q.Ki = function (a, b, c, d, e) {
        var f = a.C, g = a.B[c + 1], k = g[0], l = g[1], m = g[2], n = a.A, g = a.T;
        d = dJ(d);
        var p = d.length;
        m(n.A, p);
        if (e)if (null != this.A) rJ(this, a, b, c, d); else {
            for (v = p; v < f.length; ++v)eJ(this.B, f[v], !0);
            0 < f.length && (f.length = Math.max(p, 1));
            var r = g.element;
            b = r;
            var u = !1;
            e = a.L;
            m = TG(b);
            for (v = 0; v < p || 0 == v; ++v) {
                if (u) {
                    var t = qJ(this, r, a.D);
                    dk(t, b);
                    b = t;
                    m.length = e + 1
                } else 0 < v && (b = hk(b), m = TG(b)), m[e] && "*" != m[e].charAt(0) || (u = 0 < p);
                WG(b, m, e, p, v);
                0 == v && fo(b, 0 < p);
                0 < p && (k(n.A, d[v]), l(n.A, v), UI(this, b, null), t = f[v], null == t ?
                    (t = f[v] = new DI(a.B, a.F, new BI(b), n, a.D), t.H = c + 2, t.I = a.I, t.L = e + 1, t.N = !0, MI(this, t)) : LI(this, t), b = t.T.next || t.T.element)
            }
            if (!u)for (a = hk(b); a && VG(TG(a), m, e);)c = hk(a), ek(a), a = c;
            g.next = b
        } else for (var v = 0; v < p; ++v)k(n.A, d[v]), l(n.A, v), LI(this, f[v])
    };
    q.Li = function (a, b, c, d, e) {
        var f = a.C, g = a.A, k = a.B[c + 1], l = k[0], m = k[1], k = a.T;
        d = dJ(d);
        if (e || !k.element || k.element.__forkey_has_unprocessed_elements) {
            e = b.A;
            var n = d.length;
            if (null != this.A) rJ(this, a, b, c, d, e); else {
                var p = k.element;
                b = p;
                var r = a.L, u = TG(b), t = [], v = {}, y = null, D;
                a:{
                    var z = this.G;
                    try {
                        D = z && z.activeElement;
                        break a
                    } catch (N) {
                    }
                    D = null
                }
                for (var A = b, z = u; A;) {
                    UI(this, A, a.D);
                    var B = UG(A);
                    B && (v[B] = t.length);
                    t.push(A);
                    !y && D && ik(A, D) && (y = A);
                    (A = hk(A)) ? (B = TG(A), VG(B, z, r) ? z = B : A = null) : A = null
                }
                A = b.previousSibling;
                A || (A = this.G.createComment("jsfor"),
                b.parentNode && b.parentNode.insertBefore(A, b));
                D = [];
                p.__forkey_has_unprocessed_elements = !1;
                if (0 < n)for (z = 0; z < n; ++z) {
                    var R = e[z];
                    if (R in v) {
                        B = v[R];
                        delete v[R];
                        b = t[B];
                        t[B] = null;
                        if (A.nextSibling != b)if (b != y) dk(b, A); else for (; A.nextSibling != b;)dk(A.nextSibling, b);
                        D[z] = f[B]
                    } else b = qJ(this, p, a.D), dk(b, A);
                    l(g.A, d[z]);
                    m(g.A, z);
                    WG(b, u, r, n, z, R);
                    0 == z && fo(b, !0);
                    UI(this, b, null);
                    0 == z && p != b && (p = k.element = b);
                    A = D[z];
                    null == A ? (A = new DI(a.B, a.F, new BI(b), g, a.D), A.H = c + 2, A.I = a.I, A.L = r + 1, A.N = !0, MI(this, A) ? D[z] = A : p.__forkey_has_unprocessed_elements = !0) : LI(this, A);
                    A = b = A.T.next || A.T.element
                } else t[0] = null, f[0] && (D[0] = f[0]), fo(b, !1), WG(b, u, r, 0, 0, UG(b));
                for (R in v)B = v[R], (c = f[B]) && eJ(this.B, c, !0);
                a.C = D;
                for (z = 0; z < t.length; ++z)t[z] && ek(t[z]);
                k.next = b
            }
        } else if (0 < d.length)for (z = 0; z < f.length; ++z)l(g.A, d[z]), m(g.A, z), LI(this, f[z])
    };
    function rJ(a, b, c, d, e, f) {
        var g = b.C, k = b.B[d + 1], l = k[0], k = k[1], m = b.A;
        c = kJ(a, b, c) ? 0 : e.length;
        for (var n = 0 == c, p = b.F[2], r = 0; r < c || 0 == r && p; ++r) {
            n || (l(m.A, e[r]), k(m.A, r));
            var u = g[r] = new DI(b.B, b.F, new BI(null), m, b.D);
            u.H = d + 2;
            u.I = b.I;
            u.L = b.L + 1;
            u.N = !0;
            u.O = (b.O ? b.O + "," : "") + (r == c - 1 || n ? "*" : "") + String(r) + (f && !n ? ";" + f[r] : "");
            var t = WI(a, u);
            p && 0 < c && lH(t, 20, "jsinstance", u.O);
            0 == r && (u.T.F = b.T);
            n ? YI(a, u) : TI(a, u)
        }
    }

    q.cn = function (a, b, c) {
        b = a.A;
        c = a.B[c + 1];
        var d = a.T.element;
        this.C && a.F && a.F[2] ? cJ(b, c, d, "") : JF(b, c, d)
    };
    q.dn = function (a, b, c) {
        var d = a.A, e = a.B[c + 1];
        c = e[0];
        if (null != this.A) a = JF(d, e[1], null), c(d.A, a), b.A = lI(a); else {
            a = a.T.element;
            if (null == b.A) {
                e = a.__vs;
                if (!e)for (var e = a.__vs = [1], f = a.getAttribute("jsvs"), f = FH(f), g = 0, k = f.length; g < k;) {
                    var l = JH(f, g), m = f.slice(g, l).join(""), g = l + 1;
                    e.push(KH(m))
                }
                f = e[0]++;
                b.A = e[f]
            }
            a = JF(d, b.A, a);
            c(d.A, a)
        }
    };
    q.Ii = function (a, b, c) {
        JF(a.A, a.B[c + 1], a.T.element)
    };
    q.Xj = function (a, b, c) {
        b = a.B[c + 1];
        a = a.A;
        (0, b[0])(a.A, a.B ? a.B.A[b[1]] : null)
    };
    function oJ(a, b, c) {
        lH(a, 0, "jstcache", gI(String(c), b), !1, !0)
    }

    q.Um = function (a, b, c) {
        b = a.A;
        var d = a.T;
        c = a.B[c + 1];
        null != this.A && a.F[2] && oJ(d.A, a.D, 0);
        d.A && c && hH(d.A, -1, null, null, null, null, c, !1);
        rI(this.B.D, c) && (d.element ? this.xg(d, c, b) : (d.C = d.C || []).push([this.xg, d, c, b]))
    };
    q.xg = function (a, b, c) {
        var d = this.B.D;
        if (!c.A.pe) {
            var e = this.B, e = new vH(c, e.A[b] && e.A[b].mf ? e.A[b].mf : null), f = new uH;
            f.D = a.element;
            b = sI(d, b, f, e);
            c.A.pe = b;
            a.element.__ctx || (a.element.__ctx = c)
        }
    };
    q.hk = function (a, b) {
        if (!b.A) {
            var c = a.T;
            a = a.A;
            c.element ? this.yg(c, a) : (c.C = c.C || []).push([this.yg, c, a]);
            b.A = !0
        }
    };
    q.yg = function (a, b) {
        a = a.element;
        a.__rjsctx || (a.__rjsctx = b)
    };
    function eJ(a, b, c) {
        if (b) {
            if (c) {
                c = b.M;
                if (null != c) {
                    for (var d in c)if (0 == d.indexOf("controller:") || 0 == d.indexOf("observer:")) {
                        var e = c[d];
                        null != e && e.ra && e.ra()
                    }
                    b.M = null
                }
                if ("$t" == b.B[b.H]) {
                    d = b.A;
                    if (c = d.A.pe) {
                        c = c.nh;
                        e = a.D;
                        if (c.A)try {
                            e.B("controller_dispose", c.A.Od), Jk(c.A)
                        } catch (f) {
                            try {
                                e.C.A(f)
                            } catch (g) {
                            }
                        } finally {
                            e.B("controller_dispose", c.A.Od), c.A.nh = null
                        }
                        d.A.pe = null
                    }
                    b.T.element && b.T.element.__ctx && (b.T.element.__ctx = null)
                }
            }
            null != b.G && eJ(a, b.G, !0);
            if (null != b.C)for (d = 0; d < b.C.length; ++d)(c = b.C[d]) && eJ(a,
                c, !0)
        }
    }

    q.Zf = function (a, b, c, d, e) {
        var f = a.T, g = "$if" == a.B[c];
        if (null != this.A) d && this.C && (f.D = !0, b.C = ""), c += 2, g ? d ? TI(this, a, c) : a.F[2] && YI(this, a, c) : d ? TI(this, a, c) : YI(this, a, c), b.A = !0; else {
            var k = f.element;
            g && f.A && iH(f.A, 768);
            d || PI(this, f, a);
            if (e)if (fo(k, !!d), d) b.A || (TI(this, a, c + 2), b.A = !0); else if (b.A && eJ(this.B, a, "$t" != a.B[a.H]), g) {
                d = !1;
                for (g = c + 2; g < a.B.length; g += 2)if (e = a.B[g], "$u" == e || "$ue" == e || "$up" == e) {
                    d = !0;
                    break
                }
                if (d) {
                    for (; d = k.firstChild;)k.removeChild(d);
                    d = k.__cdn;
                    for (g = a.G; null != g;) {
                        if (d == g) {
                            k.__cdn = null;
                            break
                        }
                        g = g.G
                    }
                    b.A = !1;
                    a.K.length = (c - a.H) / 2 + 1;
                    a.J = 0;
                    a.G = null;
                    a.C = null;
                    b = kI(k);
                    b.length > a.I && (b.length = a.I)
                }
            }
        }
    };
    q.Om = function (a, b, c) {
        b = a.T;
        null != b && null != b.element && JF(a.A, a.B[c + 1], b.element)
    };
    q.Sm = function (a, b, c, d, e) {
        null != this.A ? (TI(this, a, c + 2), b.A = !0) : (d && PI(this, a.T, a), !e || d || b.A || (TI(this, a, c + 2), b.A = !0))
    };
    q.ck = function (a, b, c) {
        var d = a.T.element, e = a.B[c + 1];
        c = e[0];
        var f = e[1], g = b.A, e = null != g;
        e || (b.A = g = new EF);
        KF(g, a.A);
        b = JF(g, f, d);
        "create" != c && "load" != c || !d ? hJ(a)["action:" + c] = b : e || (RI(d, a), b.call(d))
    };
    q.dk = function (a, b, c) {
        b = a.A;
        var d = a.B[c + 1], e = d[0];
        c = d[1];
        var f = d[2], d = d[3], g = a.T.element;
        a = hJ(a);
        var e = "controller:" + e, k = a[e];
        null == k ? a[e] = JF(b, f, g) : (c(b.A, k), d && JF(b, d, g))
    };
    function ZI(a, b) {
        var c = a.element, d = c.__tag;
        if (null != d) a.A = d, d.reset(b || void 0); else if (a = d = a.A = c.__tag = new cH(c.nodeName.toLowerCase()), b = b || void 0, d = c.getAttribute("jsan")) {
            iH(a, 64);
            var d = d.split(","), e = d.length;
            if (0 < e) {
                a.A = [];
                for (var f = 0; f < e; f++) {
                    var g = d[f], k = g.indexOf(".");
                    if (-1 == k) hH(a, -1, null, null, null, null, g, !1); else {
                        var l = parseInt(g.substr(0, k), 10), m = g.substr(k + 1), n = null, k = "_jsan_";
                        switch (l) {
                            case 7:
                                g = "class";
                                n = m;
                                k = "";
                                break;
                            case 5:
                                g = "style";
                                n = m;
                                break;
                            case 13:
                                m = m.split(".");
                                g = m[0];
                                n = m[1];
                                break;
                            case 0:
                                g = m;
                                k = c.getAttribute(m);
                                break;
                            default:
                                g = m
                        }
                        hH(a, l, g, n, null, null, k, !1)
                    }
                }
            }
            a.J = !1;
            a.reset(b)
        }
    }

    function WI(a, b) {
        var c = b.F, d = b.T.A = new cH(c[0]);
        iH(d, c[1]);
        !1 === b.A.A.Za && iH(d, 1024);
        a.F && (a.F[d.id()] = b);
        b.N = !0;
        return d
    }

    q.vi = function (a, b, c) {
        var d = a.B[c + 1];
        b = a.T.A;
        var e = a.A, f = a.T.element;
        if (!f || "NARROW_PATH" != f.__narrow_strategy) {
            var g = d[0], k = d[1], l = d[3], m = d[4];
            a = d[5];
            c = !!d[7];
            if (!c || null != this.A)if (!d[8] || !this.C) {
                var n = !0;
                null != l && (n = this.C && "nonce" != a ? !0 : !!JF(e, l, f));
                var e = n ? null == m ? void 0 : "string" == typeof m ? m : this.C ? cJ(e, m, f, "") : JF(e, m, f) : null, p;
                null != l || !0 !== e && !1 !== e ? null === e ? p = null : void 0 === e ? p = a : p = String(e) : p = (n = e) ? a : null;
                e = null !== p || null == this.A;
                switch (g) {
                    case 6:
                        iH(b, 256);
                        e && lH(b, g, "class", p, !1, c);
                        break;
                    case 7:
                        e && mH(b, g, "class", a, n ? "" : null, c);
                        break;
                    case 4:
                        e && lH(b, g, "style", p, !1, c);
                        break;
                    case 5:
                        if (n) {
                            if (m)if (k && null !== p) {
                                d = p;
                                p = 5;
                                switch (k) {
                                    case 5:
                                        k = JG(d);
                                        break;
                                    case 6:
                                        k = QG.test(d) ? d : "zjslayoutzinvalid";
                                        break;
                                    case 7:
                                        k = NG(d);
                                        break;
                                    default:
                                        p = 6, k = "sanitization_error_" + k
                                }
                                mH(b, p, "style", a, k, c)
                            } else e && mH(b, g, "style", a, p, c)
                        } else e && mH(b, g, "style", a, null, c);
                        break;
                    case 8:
                        k && null !== p ? nH(b, k, a, p, c) : e && lH(b, g, a, p, !1, c);
                        break;
                    case 13:
                        k = d[6];
                        e && mH(b, g, a, k, p, c);
                        break;
                    case 14:
                    case 11:
                    case 12:
                    case 10:
                    case 9:
                        e && mH(b,
                            g, a, "", p, c);
                        break;
                    default:
                        "jsaction" == a ? (e && lH(b, g, a, p, !1, c), f && "__jsaction" in f && delete f.__jsaction) : "jsnamespace" == a ? (e && lH(b, g, a, p, !1, c), f && "__jsnamespace" in f && delete f.__jsnamespace) : a && null == d[6] && (k && null !== p ? nH(b, k, a, p, c) : e && lH(b, g, a, p, !1, c))
                }
            }
        }
    };
    function pJ(a, b) {
        for (var c = b.B, d = 0; c && d < c.length; d += 2)if ("$tg" == c[d]) {
            !1 === JF(b.A, c[d + 1], null) && pH(a, !1);
            break
        }
    }

    function PI(a, b, c) {
        var d = b.A;
        if (null != d) {
            var e = b.element;
            null == e ? (pJ(d, c), -1 != c.F.lc && c.F[2] && "$t" != c.F[3][0] && oJ(d, c.D, c.F.lc), c.T.D && mH(d, 5, "style", "display", "none", !0), e = d.id(), c = 0 != (c.F[1] & 16), a.D ? (a.A += sH(d, c, !0), a.D[e] = b) : a.A += sH(d, c, !1)) : "NARROW_PATH" != e.__narrow_strategy && (c.T.D && mH(d, 5, "style", "display", "none", !0), d.apply(e))
        }
    }

    function XI(a, b, c) {
        var d = b.element;
        b = b.A;
        null != b && null != a.A && null == d && (c = c.F, 0 == (c[1] & 16) && 0 == (c[1] & 8) && (a.A += jH(b)))
    }

    q.Di = function (a, b, c) {
        if (!kJ(this, a, b)) {
            var d = a.B[c + 1];
            b = a.A;
            c = a.T.A;
            var e = d[3], f = !!b.A.Ha, d = JF(b, d[2], a.T.element);
            a = ZF(d, e, f);
            e = aG(d, e, f);
            if (f != a || f != e) c.G = !0, lH(c, 0, "dir", a ? "rtl" : "ltr");
            b.A.Ha = a
        }
    };
    q.Ei = function (a, b, c) {
        if (!kJ(this, a, b)) {
            var d = a.B[c + 1];
            b = a.A;
            c = a.T.element;
            if (!c || "NARROW_PATH" != c.__narrow_strategy) {
                a = a.T.A;
                var e = d[2], f = d[3], g = d[4], d = !!b.A.Ha, f = f ? JF(b, f, c) : null;
                c = "rtl" == JF(b, e, c);
                e = null != f ? aG(f, g, d) : d;
                if (d != c || d != e) a.G = !0, lH(a, 0, "dir", c ? "rtl" : "ltr");
                b.A.Ha = c
            }
        }
    };
    q.Ci = function (a, b) {
        kJ(this, a, b) || (b = a.A, a = a.T.element, a && "NARROW_PATH" == a.__narrow_strategy || (b.A.Ha = !!b.A.Ha))
    };
    q.yi = function (a, b, c, d, e) {
        var f = a.B[c + 1], g = f[0], k = a.A;
        d = String(d);
        c = a.T;
        var l = !1, m = !1;
        3 < f.length && null != c.A && !kJ(this, a, b) && (m = f[3], f = !!JF(k, f[4], null), l = 7 == g || 2 == g || 1 == g, m = null != m ? JF(k, m, null) : ZF(d, l, f), l = m != f || f != aG(d, l, f)) && (null == c.element && pJ(c.A, a), null == this.A || !1 !== c.A.G) && (lH(c.A, 0, "dir", m ? "rtl" : "ltr"), l = !1);
        PI(this, c, a);
        if (e) {
            if (null != this.A) {
                if (!kJ(this, a, b)) {
                    b = null;
                    l && (!1 !== k.A.Za ? (this.A += '<span dir="' + (m ? "rtl" : "ltr") + '">', b = "</span>") : (this.A += m ? "\u202b" : "\u202a", b = "\u202c" + (m ? "\u200e" :
                                "\u200f")));
                    switch (g) {
                        case 7:
                        case 2:
                            this.A += d;
                            break;
                        case 1:
                            this.A += DG(d);
                            break;
                        default:
                            this.A += vG(d)
                    }
                    null != b && (this.A += b)
                }
            } else {
                b = c.element;
                switch (g) {
                    case 7:
                    case 2:
                        RG(b, d);
                        break;
                    case 1:
                        g = DG(d);
                        RG(b, g);
                        break;
                    default:
                        g = !1;
                        e = "";
                        for (k = b.firstChild; k; k = k.nextSibling) {
                            if (3 != k.nodeType) {
                                g = !0;
                                break
                            }
                            e += k.nodeValue
                        }
                        if (k = b.firstChild) {
                            if (g || e != d)for (; k.nextSibling;)ek(k.nextSibling);
                            3 != k.nodeType && ek(k)
                        }
                        b.firstChild ? e != d && (b.firstChild.nodeValue = d) : b.appendChild(b.ownerDocument.createTextNode(d))
                }
                "TEXTAREA" !=
                b.nodeName && "textarea" != b.nodeName || b.value === d || (b.value = d)
            }
            XI(this, c, a)
        }
    };
    function UI(a, b, c) {
        dI(a.G, b, c);
        return b.__jstcache
    }

    function sJ(a) {
        this.method = a;
        this.A = this.la = 0
    }

    var OI = {}, tJ = !1;

    function uJ() {
        if (!tJ) {
            tJ = !0;
            var a = HI.prototype, b = function (a) {
                return new sJ(a)
            };
            OI.$a = b(a.vi);
            OI.$c = b(a.yi);
            OI.$dh = b(a.Ci);
            OI.$dc = b(a.Di);
            OI.$dd = b(a.Ei);
            OI.display = b(a.Zf);
            OI.$e = b(a.Ii);
            OI["for"] = b(a.Ki);
            OI.$fk = b(a.Li);
            OI.$g = b(a.Xj);
            OI.$ia = b(a.ck);
            OI.$ic = b(a.dk);
            OI.$if = b(a.Zf);
            OI.$o = b(a.Nk);
            OI.$rj = b(a.hk);
            OI.$r = b(a.Om);
            OI.$sk = b(a.Sm);
            OI.$s = b(a.J);
            OI.$t = b(a.Um);
            OI.$u = b(a.Ym);
            OI.$ua = b(a.Zm);
            OI.$uae = b(a.$m);
            OI.$ue = b(a.an);
            OI.$up = b(a.bn);
            OI["var"] = b(a.cn);
            OI.$vs = b(a.dn);
            OI.$c.la = 1;
            OI.display.la = 1;
            OI.$if.la =
                1;
            OI.$sk.la = 1;
            OI["for"].la = 4;
            OI["for"].A = 2;
            OI.$fk.la = 4;
            OI.$fk.A = 2;
            OI.$s.la = 4;
            OI.$s.A = 3;
            OI.$u.la = 3;
            OI.$ue.la = 3;
            OI.$up.la = 3;
            DF.runtime = IF;
            DF.and = PF;
            DF.bidiCssFlip = gG;
            DF.bidiDir = YF;
            DF.bidiExitDir = $F;
            DF.bidiLocaleDir = OF;
            DF.url = nG;
            DF.urlToString = oG;
            DF.urlParam = pG;
            DF.hasUrlParam = qG;
            DF.bind = lG;
            DF.debug = UF;
            DF.ge = SF;
            DF.gt = QF;
            DF.le = TF;
            DF.lt = RF;
            DF.has = jG;
            DF.size = kG;
            DF.range = XF;
            DF.string = hG;
            DF["int"] = iG
        }
    }

    function NI(a) {
        var b = a.T.element;
        if (!b || !b.parentNode || "NARROW_PATH" != b.parentNode.__narrow_strategy || b.__narrow_strategy)return !0;
        for (b = 0; b < a.B.length; b += 2) {
            var c = a.B[b];
            if ("for" == c || "$fk" == c && b >= a.H)return !0
        }
        return !1
    };
    function vJ(a, b) {
        this.C = a;
        this.B = new EF;
        this.B.B = this.C.F;
        this.A = null;
        this.D = b
    }

    function gE(a, b) {
        if (a.A) {
            var c = a.B, d = a.A, e = a.C;
            a = a.D;
            uJ();
            for (var f = e.I, g = f.length - 1; 0 <= g; --g) {
                var k = f[g];
                KI(d, a, k.A.T.element, k.A.D) && f.splice(g, 1)
            }
            f = "rtl" == NF(d);
            c.A.Ha = f;
            c.A.Za = !0;
            k = null;
            (g = d.__cdn) && g.B != AI && "no_key" != a && (f = FI(g, a, null)) && (g = f, k = "rebind", f = new HI(e, void 0, void 0), KF(g.A, c), g.T.A && !g.N && d == g.T.element && g.T.A.reset(a), LI(f, g));
            if (null == k) {
                e.document();
                Pj(d);
                var f = new HI(e, void 0, void 0), e = UI(f, d, null), l = "$t" == e[0] ? 1 : 0, k = 0;
                if ("no_key" != a && a != d.getAttribute("id")) {
                    var m = !1, g = e.length -
                        2;
                    if ("$t" == e[0] && e[1] == a) k = 0, m = !0; else if ("$u" == e[g] && e[g + 1] == a) k = g, m = !0; else for (var n = kI(d), g = 0; g < n.length; ++g)if (n[g] == a) {
                        e = eI(a);
                        l = g + 1;
                        k = 0;
                        m = !0;
                        break
                    }
                }
                g = new EF;
                KF(g, c);
                g = new DI(e, null, new BI(d), g, a);
                g.H = k;
                g.I = l;
                g.T.B = kI(d);
                c = !1;
                m && "$t" == e[k] && (ZI(g.T, a), m = f.B.A[a], c = null == m || null == m.Rd ? !1 : m.Rd != d.getAttribute("jssc"));
                c ? lJ(f, null, g) : MI(f, g)
            }
        }
        b && b()
    }

    vJ.prototype.remove = function () {
        var a = this.A;
        if (null != a) {
            var b = a.parentElement;
            if (null == b || !b.__cdn) {
                b = this.C;
                if (a) {
                    var c = a.__cdn;
                    c && (c = FI(c, this.D)) && eJ(b, c, !0)
                }
                null != a.parentNode && a.parentNode.removeChild(a);
                this.A = null;
                this.B = new EF;
                this.B.B = this.C.F
            }
        }
    };
    function wJ(a, b) {
        vJ.call(this, a, b)
    }

    G(wJ, vJ);
    function xJ(a, b) {
        vJ.call(this, a, b)
    }

    G(xJ, wJ);
    function yJ(a) {
        vJ.call(this, a, zJ);
        var b = zJ;
        if (!(b in a.A) || a.A[b].ik) {
            var b = zJ, c = ["div", , 1, 0, [" ", ["canvas", , , 1], " ", ["div", , , 2], " ", ["div", , , 3], " "]], d = AJ();
            if (d)for (var e = 0; e < d.length; ++e)d[e] && VH(d[e], b + " " + String(e));
            zI(c, d);
            a = a.A;
            var f;
            d = {fc: 0};
            if ("array" == ta(d)) f = d; else {
                e = [];
                for (f in d)e[d[f]] = f;
                f = e
            }
            a[b] = {
                Pm: 0,
                elements: c,
                Ai: [["css", ".widget-scene{width:100%;height:100%;overflow:hidden;position:absolute;z-index:0;background-color:black}", "css", ".keynav-mode .widget-scene:focus::after{content:'';border:2px solid #4d90fe;box-sizing:border-box;height:100%;pointer-events:none;position:absolute;width:100%;z-index:1}",
                    "css", ".print-mode .widget-scene:focus::after{display:none}", "css", ".widget-scene-effects{position:absolute;left:0;top:0;z-index:2}", "css", ".widget-scene-imagery-render{position:absolute;left:0;top:0;z-index:1;background-color:black}", "css", ".widget-scene-imagery-iframe{position:absolute}", "css", ".widget-scene .canvas-renderer{position:absolute;left:0;top:0}", "css", ".widget-scene-canvas{position:absolute;left:0;top:0;background-color:black}", "css", ".widget-scene-capture-canvas{position:relative;z-index:3}",
                    "css", ".tile-image-3d{-webkit-perspective:1000;-webkit-backface-visibility:hidden;perspective:1000;backface-visibility:hidden;-moz-perspective:1000;-moz-backface-visibility:hidden;-o-perspective:1000;-o-backface-visibility:hidden}", "css", ".accelerated{-webkit-transform:translateZ(0);transform:translateZ(0)}", "css", "@media print{.widget-scene{background:white;position:static;overflow:visible}.widget-scene-canvas{display:block;background:white}.app-globe-mode .widget-scene-canvas{background:black}.widget-scene-imagery-render{position:relative;background:white;z-index:4}.widget-scene-imagery-iframe{position:relative;left:50% !important;transform:translateX(-50%);-webkit-transform:translateX(-50%)}.widget-scene .canvas-renderer,.widget-scene .canvas-container,.widget-scene canvas{position:static !important}.canvas-renderer+.widget-scene-canvas{display:none !important}.widget-scene-capture-canvas+.widget-scene-canvas,.widget-scene-capture-canvas+.canvas-renderer{display:none !important}.widget-scene-canvas{width:100% !important;height:auto !important;-webkit-transform:none !important;transform:none !important}}",
                    "css", ".print-mode .widget-scene{background:white;position:static;overflow:visible}", "css", ".print-mode .widget-scene-canvas{display:block;background:white}", "css", ".print-mode .app-globe-mode .widget-scene-canvas{background:black}", "css", ".print-mode .widget-scene-imagery-render{position:relative;background:white;z-index:4}", "css", ".print-mode .widget-scene-imagery-iframe{position:relative;left:50% !important;transform:translateX(-50%);-webkit-transform:translateX(-50%)}", "css", ".print-mode .widget-scene .canvas-renderer,.print-mode .widget-scene .canvas-container,.print-mode .widget-scene canvas{position:static !important}",
                    "css", ".print-mode .canvas-renderer+.widget-scene-canvas{display:none !important}", "css", ".print-mode .widget-scene-capture-canvas+.widget-scene-canvas,.print-mode .widget-scene-capture-canvas+.canvas-renderer{display:none !important}"]],
                oc: f,
                mf: null,
                async: !1,
                Rd: null
            }
        }
    }

    G(yJ, xJ);
    yJ.prototype.fill = function (a) {
        a = rG(a);
        this.B.A[this.C.A[this.D].oc[0]] = a
    };
    var zJ = "t-nrD2PAT7leI";

    function AJ() {
        return [["$t", "t-nrD2PAT7leI", "var", function (a) {
            return a.wa = WF(a.fc, "", -4) + "." + WF(a.fc, "", -5)
        }, "var", function (a) {
            return a.action = WF(a.fc, !1, -2) ? "click: " + a.wa + ";dblclick: " + a.wa + ";mousedown: " + a.wa + ";mousemove: " + a.wa + ";mouseup: " + a.wa + ";mouseover: " + a.wa + ";mouseout: " + a.wa + ";touchstart: " + a.wa + ";touchmove: " + a.wa + ";touchend: " + a.wa + ";pointerdown: " + a.wa + ";pointermove: " + a.wa + ";pointerup: " + a.wa + ";pointercancel: " + a.wa + ";MSPointerDown: " + a.wa + ";MSPointerMove: " + a.wa + ";MSPointerUp: " +
                a.wa + ";MSPointerCancel: " + a.wa + ";contextmenu: " + a.wa + ";keydown: " + a.wa + ";keyup: " + a.wa + ";" + (WF(a.fc, !1, -3) ? "wheel: " + a.wa + ";mousewheel: " + a.wa + ";DOMMouseScroll: " + a.wa + ";" : "") : ""
        }, "$a", [7, , , , , "widget-scene"], "$a", [0, , , , function (a) {
            return WF(a.fc, "", -6)
        }, "aria-label", , , 1], "$a", [5, 5, , , function (a) {
            return a.Ha ? gG("cursor", WF(a.fc, "", -1)) : WF(a.fc, "", -1)
        }, "cursor", , , 1], "$a", [0, , , , function (a) {
            return a.action
        }, "jsaction", , , 1], "$a", [0, , , , "main", "role"], "$a", [0, , , , "0", "tabindex"]], ["$a", [7, , , , , "widget-scene-canvas",
            , 1]], ["$a", [7, , , , , "widget-scene-imagery-render", , 1]], ["$a", [7, , , , , "widget-scene-effects", , 1], "$a", [7, , , , , "noprint", , 1]]]
    };
    function BJ(a, b) {
        ho(b)
    };
    var CJ = Hy();
    var DJ = Hy();

    function EJ(a, b, c, d, e, f, g, k, l, m, n) {
        this.F = a;
        this.D = b;
        this.A = c;
        this.C = d;
        this.B = e;
        this.G = f;
        this.H = g;
        this.I = k;
        this.L = l;
        this.M = m;
        this.J = n
    }

    EJ.prototype.N = function (a) {
        return new EJ(this.F - a.F, this.D - a.D, this.A - a.A, this.C - a.C, this.B - a.B, this.G - a.G, this.H - a.H, this.I - a.I, a.L, this.M, this.J)
    };
    function FJ(a) {
        return Infinity == a ? 0 : a
    }

    EJ.prototype.K = function () {
        var a = .001 * this.B, b = FJ(this.A / a), c = Math.max(this.C - this.A, 0), a = FJ(c / a), d = this.D / this.A, e = {};
        e.f = this.F.toString();
        e.cf = this.A.toString();
        e.tf = this.C.toString();
        isNaN(b) || (e.fps = b.toFixed(1), b = this.G / this.B, isNaN(b) && (b = 0), e.stp = b.toFixed(3));
        e.df = c.toFixed(0);
        isNaN(a) || (e.dfps = a.toFixed(1));
        !isNaN(d) && isFinite(d) && (e.ms = .05 > d ? "1" : "0");
        e.pr = this.M.toFixed(2).toString();
        null != this.J && (e.wr = this.J);
        e.crt = this.B.toString();
        e.tr = this.H.toString();
        e.tp = this.I.toString();
        e.fsd =
            this.L.toFixed(2).toString();
        return e
    };
    function GJ(a) {
        this.A = a
    }

    GJ.prototype.B = function () {
        var a = this.A;
        return new EJ(this.A.aa, this.A.ia, this.A.fa, Math.floor(this.A.N / zj), this.A.N, this.A.Y, this.A.C, this.A.$, Math.sqrt(a.J - a.D * a.D), w.devicePixelRatio || 1, pE || void 0)
    };
    function HJ(a, b, c, d) {
        this.A = a;
        this.B = b;
        this.D = c || 0;
        this.C = d || 0
    }

    HJ.prototype.N = function (a) {
        if (!this.A || !a.A)return new HJ(null, this.B);
        var b = a.A, c = this.A, d = xl(), e = xl(), f = qh(c), c = ph(c);
        im(ph(b), qh(b), 0, d, 1);
        im(c, f, 0, e, 1);
        a:{
            switch (this.B) {
                case 3:
                    b = 3396E3;
                    break a;
                case 2:
                    b = 1737100;
                    break a
            }
            b = 6371010
        }
        return new HJ(this.A, this.B, b * Math.acos(e[0] * d[0] + e[1] * d[1] + e[2] * d[2]), rh(this.A) - rh(a.A))
    };
    HJ.prototype.K = function () {
        var a = {};
        if (null == this.A)return a;
        a.sca = Math.round(this.C) + "";
        a.scm = Math.round(this.D) + "";
        return a
    };
    function IJ(a) {
        this.C = a;
        this.A = Iy(My)
    }

    IJ.prototype.B = function () {
        var a = this.A.get() ? L(this.A.get(), 7) : 1;
        return this.C.get() ? new HJ(jh(this.C.get()), a) : new HJ(null, a)
    };
    function JJ(a, b, c, d) {
        this.A = a;
        this.F = b;
        this.D = c;
        this.B = d;
        this.C = !1
    };
    var KJ = "ptrdown ptrhover ptrout ptrup dragstart drag dragend".split(" ");

    function LJ(a) {
        this.H = !0;
        this.I = a;
        this.F = null;
        this.B = {};
        this.G = [];
        this.J = this.L = 0;
        this.K = -1;
        this.A = 0;
        this.C = !1;
        this.D = new JE(-1, -1);
        for (a = 0; a < KJ.length; ++a) {
            var b = KJ[a], c = E(this.N, this, b);
            vF(this.I, b, !0, c, !1, void 0)
        }
    }

    var MJ = ["ptrdown", "ptrhover", "ptrup"], NJ = [1, 0];

    function OJ(a, b, c, d, e) {
        var f = a.L++;
        e = e ? a.K-- : a.J++;
        d = new PJ(b, c, d, e, f);
        a.G[f] = d;
        b = "" + b + ":" + c;
        c = a.B[b];
        c ? a.C && (c = wb(c), a.B[b] = c) : (c = [], a.B[b] = c);
        c.push(d);
        return f
    }

    function QJ(a, b) {
        var c = a.G[b];
        if (c) {
            for (var d = "" + c.sb + ":" + c.A, e = a.B[d], f = 0; f < e.length; ++f)if (c == e[f]) {
                a.C && (e = wb(e), a.B[d] = e);
                e.splice(f, 1);
                break
            }
            delete a.G[b]
        }
    }

    function HE(a, b) {
        0 != a.A && (0 < a.A && a.A--, b && (b.x = a.D.x, b.y = a.D.y))
    }

    LJ.prototype.N = function (a, b, c) {
        if (this.H) {
            if ("ptrhover" == a && (this.D.x = c.x, this.D.y = c.y, 0 != this.A))return;
            var d = this.F && this.F.B.na, d = d && sb(MJ, a) ? MD(d, c.x, c.y) : null;
            RJ(this, a, c, d, b)
        }
    };
    function RJ(a, b, c, d, e) {
        a.C = !0;
        c = new JJ(c, b, d, e);
        d = d ? d.A() : NJ;
        e = [];
        for (var f = 0; f < d.length; ++f) {
            var g = a.B["" + b + ":" + d[f]];
            g && e.push.apply(e, g)
        }
        Ab(e, function (a, b) {
            return a.zg - b.zg
        });
        for (f = 0; f < e.length; ++f)e[f].gb(c);
        a.C = !1
    }

    function PJ(a, b, c, d, e) {
        this.sb = a;
        this.A = b;
        this.gb = c;
        this.zg = d;
        this.id = e
    };
    function SJ(a, b, c) {
        this.L = !1;
        this.D = a;
        this.J = b;
        this.N = !!c;
        this.K = [];
        this.B = this.C = !1;
        ++TJ;
        this.ie();
        a = this.J;
        sb(a.B, this) || a.B.push(this)
    }

    G(SJ, HC);
    var TJ = 0;

    function UJ(a) {
        a.B || (a.reset(), a.B = !0)
    }

    SJ.prototype.ga = function () {
        for (var a = 0; a < this.K.length; ++a)QJ(this.D, this.K[a]);
        this.K.length = 0;
        this.reset();
        tb(this.J.B, this)
    };
    function VJ(a, b, c, d) {
        b = OJ(a.D, b, c, d, a.N);
        a.K.push(b)
    }

    function WJ(a, b) {
        if (!a.C) {
            var c;
            if (c = !b.C)if (c = a.J, c.A || !sb(c.B, a)) c = !1; else {
                for (var d = 0; d < c.B.length; ++d) {
                    var e = c.B[d];
                    e !== a && UJ(e)
                }
                c.A = a;
                c = !0
            }
            c && (b.C || (b.C = !0), a.C = !0)
        }
    }

    SJ.prototype.reset = function () {
        if (this.C && this.C) {
            this.C = !1;
            var a = this.J;
            if (a.A && a.A === this) {
                for (var b = 0; b < a.B.length; ++b) {
                    var c = a.B[b];
                    c !== this && c.B && (c.B = !1)
                }
                a.A = null
            }
        }
    };
    function XJ(a, b, c, d, e, f, g) {
        this.O = d;
        this.M = e;
        this.P = f;
        this.I = c;
        this.H = null;
        this.A = !1;
        this.F = this.G = null;
        SJ.call(this, a, b, g)
    }

    G(XJ, SJ);
    XJ.prototype.ie = function () {
        VJ(this, "ptrdown", this.O, E(this.X, this));
        VJ(this, "dragstart", 0, E(this.U, this));
        VJ(this, "ptrup", 0, E(this.Y, this))
    };
    function YJ(a) {
        a.H = null;
        a.G = null;
        null != a.F && (Qy(a.F), a.F = null);
        a.A = !1
    }

    XJ.prototype.U = function () {
        YJ(this)
    };
    XJ.prototype.X = function (a) {
        var b = "touchstart" === a.A.type;
        if (ZJ(this, a) || b) this.G && YJ(this), this.A ? (this.A = !1, this.G = a.A) : (this.A = !0, $J(this, a.B), this.H = a.D)
    };
    XJ.prototype.Y = function (a) {
        var b = "touchend" === a.A.type;
        if ((ZJ(this, a) || b) && this.G)if (a.C || this.B) YJ(this); else {
            var b = new Ao(this.I, "click_2"), c = this.P.A, d = new JJ(a.A, a.F, this.H, b);
            bF(c, d.A);
            var e = d.D, f = d.A, d = d.B;
            d.pb("scene", "click_scene");
            dF(c, f.x, f.y, c.K, d, e);
            c.B.Qg(hE(f), d);
            b.done("main-actionflow-branch");
            WJ(this, a);
            YJ(this);
            this.reset()
        }
    };
    function $J(a, b) {
        a.F = Py(E(function () {
            this.A = !1
        }, a), 250, b, "sceneDblClick")
    }

    function ZJ(a, b) {
        b = b.A;
        switch (a.M) {
            case 0:
                return Rk(b);
            case 1:
                return Qk(b, 2) || Qk(b, 0) && !Rk(b);
            default:
                return !1
        }
    };
    function aK(a, b, c, d, e) {
        this.M = c;
        this.H = d;
        this.I = this.G = !1;
        this.A = this.F = null;
        SJ.call(this, a, b, e)
    }

    G(aK, SJ);
    q = aK.prototype;
    q.ie = function () {
        VJ(this, "ptrdown", this.M, E(this.uk, this));
        VJ(this, "ptrup", 0, E(this.vk, this));
        VJ(this, "dragstart", 0, E(this.tk, this))
    };
    q.reset = function () {
        aK.V.reset.call(this);
        this.I = this.G = !1;
        this.F && (QJ(this.D, this.F), this.F = null);
        this.A && (QJ(this.D, this.A), this.A = null)
    };
    q.uk = function (a) {
        a = a.A;
        this.B || "mousedown" === a.type && !Qk(a, 0) || (this.I = this.G = !0)
    };
    q.vk = function (a) {
        var b = a.A;
        if ("mouseup" !== b.type || Qk(b, 0)) this.G && this.H.B(a), this.reset()
    };
    q.tk = function (a) {
        if (!this.B && this.G && (this.G = !1, this.I && !a.C)) {
            var b = E(this.$j, this);
            this.F = OJ(this.D, "drag", 0, b, this.N);
            b = E(this.Zj, this);
            this.A = OJ(this.D, "dragend", 0, b, this.N);
            if (null === this.F || null === this.A) this.reset(); else {
                this.I = !1;
                WJ(this, a);
                b = this.H.A;
                bF(b, a.A);
                var c = a.A, d = a.B;
                b.ea = !0;
                b.D.A();
                d.pb("scene", "move_camera");
                d.ta("dr0");
                d.la("dragging-branch");
                dF(b, c.x, c.y, !0, d, a.D);
                b.F.A++;
                a = hE(c);
                b.B.Ue(a, d);
                b.na = a;
                b.$ = a
            }
        }
    };
    q.$j = function (a) {
        if (!this.B && this.C) {
            var b = this.H.A, c = a.A, d = hE(c);
            if (c.touches) {
                if (c = a.B, b.B.G)if ("touchstart" == d.type || "touchend" == d.type) b.B.Ue(d, c); else {
                    var e = d.me;
                    if (e)if (b.Gc()) {
                        var f = b.$.me;
                        1 < Math.abs(e - f) && (e = Math.log(e / f) / Math.log(2), b.B.G.Hd(e, c, d.x, d.y))
                    } else if (f = b.na.me, e = Math.round(Math.log(e / f) / Math.log(2))) b.B.G.Hd(e, c, d.x, d.y), b.na = d;
                    b.B.Ve(d, c)
                }
            } else b.B.Ve(d, a.B);
            b.$ = d;
            a.C || (a.C = !0)
        }
    };
    q.Zj = function (a) {
        if (!this.B) {
            if (this.C) {
                a.C || (a.C = !0);
                var b = this.H.A, c = a.A, d = a.B;
                b.ea = !1;
                b.D.start(d);
                HE(b.F);
                b.B.Sg(hE(c), d);
                dF(b, c.x, c.y, !1, d, a.D);
                d.ta("dr1");
                d.done("dragging-branch")
            }
            this.reset()
        }
    };
    function bK(a, b, c, d, e, f, g) {
        this.P = d;
        this.I = f;
        this.O = e;
        this.M = c;
        this.G = this.A = null;
        this.F = !1;
        this.H = null;
        SJ.call(this, a, b, g)
    }

    G(bK, SJ);
    q = bK.prototype;
    q.ie = function () {
        VJ(this, "ptrdown", this.P, E(this.xk, this));
        VJ(this, "dragstart", 0, E(this.wk, this));
        VJ(this, "ptrup", 0, E(this.yk, this))
    };
    q.wk = function () {
        this.A && cK(this)
    };
    q.xk = function (a) {
        if (dK(this, a))if (this.A && !this.F && cK(this), this.F) cK(this); else {
            this.F = !0;
            var b = a.B;
            this.H = Py(E(this.Yj, this), 250, b, "sceneExclusiveClick");
            this.A = a
        }
    };
    q.yk = function (a) {
        if (dK(this, a))if (this.A)if (this.F) this.G = a; else {
            if (!a.C && !this.B) {
                var b = eK(this, this.A, a);
                cF(this.I.A, b) && WJ(this, a);
                b.B.done("main-actionflow-branch")
            }
            cK(this)
        } else cK(this)
    };
    q.Yj = function () {
        this.F = !1;
        if (this.G && this.A) {
            if (!this.G.C && !this.B) {
                var a = eK(this, this.A, this.G);
                cF(this.I.A, a) && WJ(this, this.G);
                a.B.done("main-actionflow-branch")
            }
            cK(this)
        }
    };
    function eK(a, b, c) {
        a = new Ao(a.M, "click_1");
        return new JJ(b.A, c.F, b.D, a)
    }

    function cK(a) {
        a.reset();
        null != a.H && (Qy(a.H), a.H = null);
        a.F = !1;
        a.A = null;
        a.G = null
    }

    function dK(a, b) {
        b = b.A;
        switch (a.O) {
            case 0:
                return Rk(b);
            case 1:
                return Qk(b, 2) || Qk(b, 0) && !Rk(b);
            default:
                return !1
        }
    };
    function fK(a, b, c, d, e) {
        this.G = c;
        this.F = d;
        this.A = null;
        SJ.call(this, a, b, e)
    }

    G(fK, SJ);
    q = fK.prototype;
    q.ie = function () {
        VJ(this, "ptrhover", 0, E(this.ak, this));
        VJ(this, "ptrdown", 0, E(this.zk, this));
        VJ(this, "ptrout", 0, E(this.Ak, this));
        VJ(this, "ptrup", this.G, E(this.Bk, this))
    };
    q.ak = function (a) {
        var b = a.D, c, d = this.G, d = !b && (0 == d || 1 == d), e = !(!b || !b.D(this.G));
        c = d || e;
        d = b && this.A && this.A.C(b);
        e = (e = !this.A && c) || this.A && c && !d;
        c = this.A && b && d;
        !this.A || b && d || (this.F.A(a), this.A = null);
        e && (a.B.Yc() || a.B.pb("scene_hover", "hover_on_map"), this.A = b, eF(this.F.B, a));
        c && this.F.C(a)
    };
    q.zk = function (a) {
        this.A && (this.F.A(a), this.A = null)
    };
    q.Bk = function (a) {
        this.A = a.D;
        eF(this.F.B, a)
    };
    q.Ak = function (a) {
        !this.B && this.A && (this.F.A(a), this.A = null)
    };
    function gK(a, b) {
        this.C = a;
        this.D = b;
        this.B = [];
        this.A = null
    }

    function hK(a, b, c) {
        b = new XJ(a.C, a, a.D, 0, x(c) ? c : 0, b, void 0);
        a.A && UJ(b);
        return b
    };
    function iK(a) {
        Kk.call(this, "RenderStart", a)
    }

    G(iK, Kk);
    function jK(a, b, c) {
        var d = c || w.document;
        if (d) {
            var e = null;
            c = null;
            for (var f = 0; f < kK.length; f += 2)if (x(d[kK[f]])) {
                e = kK[f];
                c = kK[f + 1];
                break
            }
            e && c && (f = function () {
                a(!d[e])
            }, b ? b.listen(d, c, f) : al(d, c, f))
        }
    }

    var kK = "hidden visibilitychange webkitHidden webkitvisibilitychange mozHidden mozvisibilitychange msHidden msvisibilitychange".split(" ");

    function lK(a, b, c) {
        ol.call(this);
        this.D = new vq(this);
        Ik(this, Fa(Jk, this.D));
        this.A = a;
        this.F = !!c;
        this.B = null;
        this.C = !1;
        mK(this, b)
    }

    G(lK, ol);
    function mK(a, b) {
        jK(function (b) {
            b && jp(a)
        }, a.D, b)
    }

    function jp(a) {
        if (a.B && !a.C) {
            var b = a.A;
            b.G.push(a);
            bE(b.B);
            a.C = !0
        }
    }

    lK.prototype.H = function () {
        this.C = !1;
        !this.xa() && this.B && (F(), this.dispatchEvent(new iK(this)), this.B && this.B.Qa(), this.dispatchEvent(new iE(this, F())), this.F && jp(this))
    };
    function nK(a, b, c, d, e, f, g, k, l, m, n, p, r, u, t, v) {
        this.L = !1;
        this.width = Jy(ZD);
        this.width.listen(this.fa, this);
        this.height = Jy(ZD);
        this.height.listen(this.fa, this);
        this.S = Iy(Ky);
        this.I = Iy(Ky);
        this.B = Iy(My);
        this.B.listen(this.Va, this);
        this.K = Iy(CJ, cC(d));
        this.O = Iy(YD);
        this.ja = Iy(YD);
        this.P = Iy(KE);
        this.F = Iy(ME);
        this.X = Iy(DJ);
        this.ea = Iy(OE);
        this.Ua = Iy(NE);
        this.aa = Iy(LE);
        this.Y = new IC(f);
        this.$ = g;
        Po(l, "render", new GJ(g));
        m = new IJ(this.I);
        Dy(m.A, this.B, n);
        Po(l, "camera_change", m);
        this.N = nd(b, 0);
        this.U = O(b, 81) ||
            "scene";
        this.M = O(b, 82) || "viewport";
        this.C = f = new sF(f, this.U, this.M, g);
        this.D = new xF;
        this.canvas = null;
        this.H = new yJ(e);
        this.D.data[1] = this.N;
        this.D.data[2] = this.N;
        this.D.data[3] = this.U;
        this.D.data[4] = this.M;
        e = oK(this);
        this.D.data[5] = e;
        e = this.H;
        var y = e.C;
        m = e.D;
        if (y.document()) {
            var D = y.A[m];
            if (D && D.elements) {
                var z = D.elements[0], y = y.document().createElement(z);
                1 != D.Pm && y.setAttribute("jsl", "$u " + m + ";");
                m = y
            } else m = null
        } else m = null;
        e.A = m;
        e.A && (e.A.__attached_template = e);
        a && a.appendChild(e.A);
        m = "rtl" == NF(e.A);
        e.B.A.Ha = m;
        this.H.fill(this.D);
        gE(this.H);
        e = Qj("canvas", void 0, a)[0];
        if (this.canvas = c.canvas) m = this.canvas.A, m.id = e.id, m.className = e.className, (D = e.parentNode) && D.replaceChild(m, e);
        e = Qj("div", "widget-scene-imagery-render", a);
        (c = c.B) && 1 == e.length && (m = e[0], c.id = m.id, c.className = m.className, e = e[0], (m = e.parentNode) && m.replaceChild(c, e));
        c = null;
        a = Qj("div", "widget-scene-effects", a);
        1 == a.length && (c = a[0]);
        this.za = new qF(c || document.createElement("div"));
        this.za.bind(this.S, this.P, n);
        b = nd(b, 2) && !nd(b, 7) &&
            1 === this.K.get();
        b = Jy(YD, !!b);
        Dy(this.O, b, n);
        this.J = new LJ(f);
        this.J.H = !1;
        this.G = new gK(this.J, l);
        this.Xa = t.A || new lK(g);
        var A;
        this.canvas ? A = new fE(this.H, this.D, this.canvas, this.$, cC(d), p) : A = new rF(this.H, this.D, this.$);
        this.view = A;
        d = this.A = new SE(0, u, 0, v, this.Xa, d, this.J, k, 0, this, n, 0, this.view, r);
        g = this.aa;
        Dy(d.Da, this.ja, n);
        Dy(d.ia, g, n);
        Dy(this.view.B, this.A.I, n);
        Dy(this.view.C, this.A.Xe, n);
        Dy(this.A.width, this.width, n);
        Dy(this.A.height, this.height, n);
        Dy(this.A.Db, this.O, n);
        Dy(this.S, this.A.S,
            n);
        Dy(this.I, this.A.G, n);
        Dy(this.B, this.A.C, n);
        Dy(this.P, this.A.Fb, n);
        Dy(this.F, this.A.Pe, n);
        Dy(this.X, Iy(DJ, this.A), n);
        Dy(this.ea, this.A.Rb, n);
        Dy(this.Ua, this.A.Qb, n);
        this.N && (n = E(this.A.Uk, this.A), vF(this.C, "ptrdown", !1, n, !1, void 0), n = E(this.A.Xk, this.A), vF(this.C, "ptrup", !1, n, !1, void 0), n = E(this.A.Vk, this.A), vF(this.C, "ptrin", !0, n, !1, void 0), n = E(this.A.Wk, this.A), vF(this.C, "ptrout", !0, n, !1, void 0), n = E(this.A.ll, this.A), vF(this.C, "scrollwheel", !0, n, !1, void 0), pK(this, 38, !1), pK(this, 40, !1), pK(this,
            37, !1), pK(this, 39, !1), pK(this, 32, !1), pK(this, 65, !1), pK(this, 68, !1), pK(this, 83, !1), pK(this, 87, !1), pK(this, 78, !1), pK(this, 85, !1), pK(this, 82, !1), pK(this, 97, !1), pK(this, 98, !1), pK(this, 99, !1), pK(this, 100, !1), pK(this, 101, !1), pK(this, 102, !1), pK(this, 103, !1), pK(this, 104, !1), pK(this, 105, !1), pK(this, 107, !0), pK(this, 109, !0), pK(this, 49, !1), pK(this, 50, !1), pK(this, 51, !1), pK(this, 52, !1), pK(this, 53, !1), pK(this, 54, !1), pK(this, 55, !1), pK(this, 56, !1), pK(this, 57, !1), pK(this, 187, !0), pK(this, 189, !0), qK(this, 91, !0), qK(this,
            17, !0), qK(this, 38, !1), qK(this, 40, !1), qK(this, 37, !1), qK(this, 39, !1), qK(this, 65, !1), qK(this, 68, !1), qK(this, 83, !1), qK(this, 87, !1));
        tF(this.C, "resize", !0, E(this.A.$k, this.A));
        this.Y.xc(this.U, this.M, "contextmenu", null, BJ);
        this.J.F = this.A;
        n = this.G;
        d = new aK(n.C, n, 0, new rK(this.A), void 0);
        n.A && UJ(d);
        this.ia = d;
        n = this.G;
        d = new fK(n.C, n, 0, new sK(this.A), void 0);
        n.A && UJ(d);
        this.Ma = d;
        n = this.G;
        d = new bK(n.C, n, n.D, 0, x(void 0) ? void 0 : 0, new tK(this.A), void 0);
        n.A && UJ(d);
        this.Da = d;
        n = new uK(this.A);
        this.na = hK(this.G,
            n, 0);
        this.xa = hK(this.G, n, 1)
    }

    G(nK, HC);
    function pK(a, b, c) {
        c ? (c = E(a.A.Lg, a.A), vF(a.C, "keydown", !1, c, !0, b)) : (c = E(a.A.Lg, a.A), vF(a.C, "keydown", !1, c, !1, b))
    }

    function qK(a, b, c) {
        c ? (c = E(a.A.Mg, a.A), vF(a.C, "keyup", !1, c, !0, b)) : (c = E(a.A.Mg, a.A), vF(a.C, "keyup", !1, c, !1, b))
    }

    nK.prototype.ga = function (a) {
        this.Y.ra(a);
        this.A.ra(a);
        this.ia.ra(a);
        this.Ma.ra(a);
        this.Da.ra(a);
        this.na.ra(a);
        this.xa.ra(a)
    };
    function rK(a) {
        this.A = a
    }

    rK.prototype.B = C;
    function sK(a) {
        this.B = a
    }

    sK.prototype.C = C;
    sK.prototype.A = C;
    function tK(a) {
        this.A = a
    }

    function uK(a) {
        this.A = a
    }

    nK.prototype.fa = function (a) {
        this.C.D("resize", null, a, null)
    };
    nK.prototype.Va = function () {
        var a = oK(this);
        this.D.data[5] = a;
        gE(this.H)
    };
    function oK(a) {
        return (a = a.B.get()) && !xx(a) ? "Map" : a && 2 === Xs(a) ? "Photo" : a && 1 === Xs(a) ? "Street View" : "Main Display"
    };
    function vK(a, b, c, d, e, f, g, k, l, m, n, p, r, u) {
        V.call(this, "SCW", wb(arguments))
    }

    G(vK, V);
    function wK(a) {
        this.B = a;
        this.A = !1
    }

    function EE(a, b) {
        a.A ? b(null) : (a.A = !0, b(new xK(a.B)))
    }

    function xK(a) {
        this.A = a;
        (new Ws(P(this.A.A, 2))).data[0] = !1
    }

    xK.prototype.D = da(0);
    xK.prototype.G = function () {
        return this.A.B
    };
    xK.prototype.H = function () {
        return this.A.A
    };
    function yK() {
    }

    yK.prototype.load = function (a, b, c) {
        b.ta("tdfl0");
        c(new wK(a), b);
        b.ta("tdfl1");
        return new EC
    };
    function zK(a, b, c, d, e, f, g, k, l, m, n, p, r, u, t, v) {
        m.getContext(function (b, n) {
            if (3 != L(d, 20, 1) && !b.Ta && !b.zb) {
                if (v) {
                    v(n);
                    return
                }
                throw Error("Could not build a rendering context for the scene.");
            }
            var y = new yK;
            b = new nK(c, d, m, b, e, new SD(f, c), g, k, l, 0, n, p, r, u, t, y);
            a(b)
        }, b)
    };
    function AK(a) {
        iA.call(this, a, "const float f=3.1415926;varying vec3 a;uniform vec4 b;attribute vec3 c;attribute vec2 d;uniform mat4 e;void main(){vec4 g=vec4(c,1);gl_Position=e*g;a=vec3(d.xy*b.xy+b.zw,1);a*=length(c);}", "precision highp float;const float h=3.1415926;varying vec3 a;uniform vec4 b;uniform float f;uniform sampler2D g;void main(){vec4 i=vec4(texture2DProj(g,a).rgb,f);gl_FragColor=i;}");
        this.B = new BK(this);
        this.attributes = new CK(this)
    }

    G(AK, iA);
    function BK(a) {
        this.B = new rA("b", a);
        this.D = new tA("e", a);
        this.A = new oA("f", a);
        this.F = new nA("g", a)
    }

    function CK(a) {
        this.B = new eA("c", a);
        this.A = new eA("d", a)
    };
    function DK(a) {
        iA.call(this, a, "attribute vec3 a;attribute vec2 b;uniform mat4 c;varying vec3 d;void main(){gl_Position=c*vec4(a,1);d=vec3(b.xy,1);}", "precision mediump float;uniform float e;uniform sampler2D f;varying vec3 d;void main(){vec4 g=texture2DProj(f,d);gl_FragColor=vec4(g.rgb,g.a*e);}");
        this.B = new EK(this);
        this.attributes = new FK(this)
    }

    G(DK, iA);
    function EK(a) {
        this.A = new tA("c", a);
        this.opacity = new oA("e", a);
        this.B = new nA("f", a)
    }

    function FK(a) {
        this.A = new eA("a", a);
        this.B = new eA("b", a)
    };
    function GK(a, b) {
        if (!b)return HK(a);
        try {
            IK(JK(a, 3553), b, 6408, 5121, 0)
        } catch (c) {
            return w.console && w.console.log(c), HK(a)
        }
        return b.width * b.height * 4
    }

    function HK(a) {
        KK(a, 3553, 0, 1, 1, 6408, 5121, new Uint8Array([0, 0, 0, 0]));
        return 4
    };
    function LK(a, b) {
        this.G = a;
        this.A = b;
        this.B = this.C = this.D = -1
    }

    LK.prototype.Ba = function () {
        return this.A.B.contains(this.D) && this.A.B.contains(this.C) && this.A.B.contains(this.B)
    };
    function MK(a, b) {
        return a.A.B.contains(b) ? (cA(a.A.B, b), !0) : !1
    }

    LK.prototype.F = function () {
        if (!MK(this, this.D)) {
            var a = this.G.A, b = this.A.createBuffer(), c = this.A.B;
            this.D = c.B.add(b, c.O, 4 * a.length, 0);
            this.A.bindBuffer(34962, b);
            this.A.bufferData(34962, a, 35044)
        }
        MK(this, this.C) || (a = this.G, a = [0, a.D, 0, 0, a.F, a.D, a.F, 0], b = this.A.createBuffer(), c = this.A.B, this.C = c.B.add(b, c.O, 4 * a.length, 0), this.A.bindBuffer(34962, b), this.A.bufferData(34962, new Float32Array(a), 35044));
        MK(this, this.B) || (a = this.A.createTexture(), this.A.bindTexture(3553, a), this.A.texParameteri(3553, 10241, 9985),
            this.A.texParameteri(3553, 10240, 9729), this.A.texParameteri(3553, 10242, 33071), this.A.texParameteri(3553, 10243, 33071), b = GK(this.A, this.G.Aa()), b = Math.round(4 * b / 3), this.A.generateMipmap(3553), this.B = NK(this.A.B, a, b))
    };
    LK.prototype.Aa = function () {
        cA(this.A.B, this.B);
        return this.A.B.Aa(this.B)
    };
    function OK(a, b) {
        rm.call(this, a);
        this.A = b;
        this.C = new DK(b);
        this.F = null;
        this.J = 1
    }

    G(OK, rm);
    OK.prototype.Pd = function () {
        var a = this.A;
        a.depthMask(!1);
        a.disable(2884);
        a.enable(3042);
        a.disable(2929);
        a.disable(2960);
        a.disable(3089);
        OK.V.Pd.call(this);
        a.depthMask(!0)
    };
    OK.prototype.I = function (a) {
        return new LK(a, this.A)
    };
    OK.prototype.B = function (a) {
        if (a.Ba() && this.F) {
            var b = this.A;
            cA(a.A.B, a.D);
            var c = a.A.B.B.get(a.D) || null;
            cA(a.A.B, a.C);
            var d = a.A.B.B.get(a.C) || null, e = this.A, f = this.C;
            kA(f);
            f.B.B.set(0);
            f.B.opacity.set(this.J);
            var g = fA(f.attributes.A), k = fA(f.attributes.B);
            e.enableVertexAttribArray(g);
            e.enableVertexAttribArray(k);
            e.bindBuffer(34962, c);
            f.attributes.A.vertexAttribPointer(3, 5126, !1, 0, 0);
            e.bindBuffer(34962, d);
            f.attributes.B.vertexAttribPointer(2, 5126, !1, 0, 0);
            uA(this.C.B.A, Am(this.F));
            b.bindBuffer(34962, c);
            b.activeTexture(33984);
            b.bindTexture(3553, a.Aa() || null);
            b.drawArrays(5, 0, 4);
            b.disableVertexAttribArray(fA(this.C.attributes.A));
            b.disableVertexAttribArray(fA(this.C.attributes.B))
        }
    };
    function PK(a, b, c, d, e, f) {
        ln.call(this, a, b, c, d, e);
        this.A = f;
        this.F = -1
    }

    G(PK, ln);
    PK.prototype.Aa = function () {
        cA(this.A.B, this.F);
        return this.A.B.Aa(this.F) || null
    };
    PK.prototype.Ba = function () {
        return this.A.B.contains(this.F)
    };
    PK.prototype.G = function () {
        if (this.Ba()) cA(this.A.B, this.F); else {
            var a = this.A.createTexture();
            this.A.bindTexture(3553, a);
            this.A.texParameteri(3553, 10241, 9729);
            this.A.texParameteri(3553, 10240, 9729);
            this.A.texParameteri(3553, 10242, 33071);
            this.A.texParameteri(3553, 10243, 33071);
            var b = GK(this.A, this.Ja());
            this.F = NK(this.A.B, a, b)
        }
    };
    function QK(a, b, c, d, e, f) {
        sn.call(this, a, b, c, d, e);
        this.A = f;
        this.I = -1;
        this.L = this.M = this.O = null
    }

    G(QK, sn);
    QK.prototype.Eb = function () {
        return this.A.B.contains(this.I)
    };
    QK.prototype.ee = function () {
        this.A.B.contains(this.I) ? cA(this.A.B, this.I) : RK(this)
    };
    function RK(a) {
        var b = Gn(a);
        a.M = a.A.createBuffer();
        var c = Xm(a);
        a.L = a.A.createBuffer();
        var d = b.byteLength + c.byteLength, e = a.D instanceof aq, f = null;
        e && (f = Ym(a), a.O = a.A.createBuffer(), d += f.byteLength);
        a.I = aA(a.A.B, function () {
            e && a.O && a.A.deleteBuffer(a.O);
            a.M && a.A.deleteBuffer(a.M);
            a.L && a.A.deleteBuffer(a.L);
            a.O = a.L = a.M = null;
            a.I = -1
        }, d);
        e && (a.A.bindBuffer(34962, a.O), a.A.bufferData(34962, f, 35044));
        a.A.bindBuffer(34962, a.M);
        a.A.bufferData(34962, b, 35044);
        a.A.bindBuffer(34963, a.L);
        a.A.bufferData(34963, c, 35044)
    }

    function SK(a) {
        cA(a.A.B, a.I);
        return a.O
    }

    function TK(a) {
        cA(a.A.B, a.I);
        return a.M
    }

    function UK(a) {
        cA(a.A.B, a.I);
        return a.L
    }

    QK.prototype.Ae = function (a, b) {
        return new PK(a.C, a.D, a.B, a.Ja(), b, this.A)
    };
    function VK(a) {
        this.A = a
    }

    VK.prototype.create = function (a, b, c, d, e) {
        return new QK(a, b, c, d, e, this.A)
    };
    function WK(a) {
        iA.call(this, a, "attribute vec2 a;uniform vec4 b;uniform mat4 c;varying vec2 d;void main(){gl_Position=c*vec4(a.x,a.y,1,1);d=a.xy*b.xy+b.zw;}", "precision highp float;uniform float e,f;uniform sampler2D g;varying vec2 d;float j(){if(f==0.)return 1.;else{vec2 h=abs(d-.5)-.5+f;return 1.-length(max(h,0.))/f;}}void main(){vec4 h=texture2D(g,d);float i=j();gl_FragColor=vec4(h.rgb,e*i);}");
        this.B = new XK(this);
        this.attributes = new YK(this)
    }

    G(WK, iA);
    function XK(a) {
        this.B = new rA("b", a);
        this.D = new tA("c", a);
        this.A = new oA("e", a);
        this.C = new oA("f", a);
        this.F = new nA("g", a)
    }

    function YK(a) {
        this.A = new eA("a", a)
    };
    function ZK(a) {
        this.A = a;
        this.D = new AK(this.A);
        this.F = new WK(this.A);
        this.C = new OK(new Cm, this.A);
        this.B = 0
    }

    ZK.prototype.H = function () {
        this.A.bindFramebuffer(36160, null);
        this.A.cullFace(1029);
        this.A.depthFunc(515);
        this.A.depthMask(!0);
        this.A.disable(3089);
        this.A.disable(2960);
        for (var a = 0; 8 > a; ++a)this.A.disableVertexAttribArray(a);
        this.A.enable(3042);
        this.A.enable(2884);
        this.A.enable(2929);
        this.A.blendFuncSeparate(770, 771, 1, 771);
        a = this.A.C.A;
        this.A.viewport(0, 0, a.width, a.height);
        this.A.clearColor(this.B, this.B, this.B, 1);
        this.A.clear(16640)
    };
    ZK.prototype.I = function (a, b, c) {
        if (0 != M(b, 0)) {
            this.A.clear(256);
            var d = a instanceof aq, e = d ? this.D : this.F;
            kA(e);
            uA(e.B.D, Am(c));
            e.B.A.set(M(b, 0));
            e.B.F.set(0);
            var f = -1;
            d && (f = fA(e.attributes.B), this.A.enableVertexAttribArray(f));
            var g = fA(e.attributes.A);
            this.A.enableVertexAttribArray(g);
            e.B.C && e.B.C.set(M(b, 1));
            var k = Wm(c);
            this.A.activeTexture(33984);
            for (var l = 0, m = k.length; l < m; ++l) {
                var n, p = a, r = k[l], u = b, t = e;
                if (r.Ba()) {
                    p instanceof aq && (this.A.bindBuffer(34962, SK(r)), t.attributes.B.vertexAttribPointer(3,
                        5126, !1, 0, 0));
                    this.A.bindBuffer(34962, TK(r));
                    t.attributes.A.vertexAttribPointer(2, 5126, !1, 0, 0);
                    this.A.bindBuffer(34963, UK(r));
                    var p = Xm(r), u = M(u, 0), v = r.P;
                    r.X || r.Uc();
                    n = r.X;
                    if (1 > v && n) {
                        var v = Tx(v), y = n.Aa();
                        this.A.bindTexture(3553, y);
                        sA(t.B.B, n.H);
                        t.B.A.set(u);
                        this.A.drawElements(5, p.length, 5123, 0)
                    }
                    r = r.Uc();
                    n = r.Aa();
                    this.A.bindTexture(3553, n);
                    sA(t.B.B, r.H);
                    t.B.A.set(u * v);
                    this.A.drawElements(5, p.length, 5123, 0)
                }
            }
            e.B.A.set(M(b, 0));
            this.A.disableVertexAttribArray(g);
            d && this.A.disableVertexAttribArray(f);
            b = M(b, 4);
            a = a.Ob();
            0 < b && 0 < a.length && (this.C.hc(a), this.C.F = c, this.C.J = b, this.C.Qa())
        }
    };
    ZK.prototype.K = ba("B");
    function $K(a, b, c) {
        var d = new ZK(b);
        ip.call(this, a, d, new sq(new VK(b)), c)
    }

    G($K, Kp);
    function aL(a, b, c, d, e) {
        b = new $K(c, d, e);
        a(b)
    };
    function bL() {
    };
    function cL() {
        return I("iPad") || I("Android") && !I("Mobile") || I("Silk")
    };
    function dL(a, b) {
        var c;
        document.createEvent ? (c = document.createEvent("Event"), c.initEvent(b || a.type, !0, !0)) : (c = document.createEventObject(), c.type = b || a.type);
        c.dd = a.timeStamp;
        return c
    };
    function eL() {
        this.F = [];
        this.A = [];
        this.B = [];
        this.G = {};
        this.C = null;
        this.D = []
    }

    var fL = "undefined" != typeof navigator && /iPhone|iPad|iPod/.test(navigator.userAgent), gL = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return a.replace(/^\s+/, "").replace(/\s+$/, "")
        }, hL = /\s*;\s*/;

    function iL(a, b) {
        return function (c) {
            var d;
            d = b;
            var e;
            "click" == d && (jo && c.metaKey || !jo && c.ctrlKey || 2 == c.which || null == c.which && 4 == c.button || c.shiftKey) && (d = "clickmod");
            var f = c.srcElement || c.target, g = jL(d, c, f, "", null), k, l;
            for (e = f; e && e != this; e = e.__owner || e.parentNode) {
                k = l = e;
                var m = d, n = k.__jsaction;
                if (!n) {
                    var p = kL(k, "jsaction");
                    if (p) {
                        n = tH[p];
                        if (!n) {
                            for (var n = {}, r = p.split(hL), u = 0, t = r ? r.length : 0; u < t; u++) {
                                var v = r[u];
                                if (v) {
                                    var y = v.indexOf(":"), D = -1 != y, z = D ? gL(v.substr(0, y)) : "click", v = D ? gL(v.substr(y + 1)) : v;
                                    n[z] =
                                        v
                                }
                            }
                            tH[p] = n
                        }
                        p = n;
                        n = {};
                        for (z in p) {
                            r = n;
                            u = z;
                            b:if (t = p[z], !(0 <= t.indexOf(".")))for (v = k; v; v = v.parentNode) {
                                y = v;
                                D = y.__jsnamespace;
                                x(D) || (D = kL(y, "jsnamespace"), y.__jsnamespace = D);
                                if (y = D) {
                                    t = y + "." + t;
                                    break b
                                }
                                if (v == this)break
                            }
                            r[u] = t
                        }
                        k.__jsaction = n
                    } else n = lL, k.__jsaction = n
                }
                k = {sb: m, action: n[m] || "", event: null, ek: !1};
                if (k.ek || k.action)break
            }
            k && (g = jL(k.sb, k.event || c, f, k.action || "", l, g.timeStamp));
            g && "touchend" == g.eventType && (g.event._preventMouseEvents = no);
            k && k.action || (g.action = "", g.actionElement = null);
            d = g;
            a.C && (e =
                jL(d.eventType, d.event, d.targetElement, d.action, d.actionElement, d.timeStamp), "clickonly" == e.eventType && (e.eventType = "click"), a.C(e, !0));
            if (d.actionElement && ("A" != d.actionElement.tagName || "click" != d.eventType && "clickmod" != d.eventType || ho(c), a.C ? a.C(d) : (c = oo(c), d.event = c, a.D.push(d)), "touchend" == d.event.type && d.event._mouseEventsPrevented)) {
                c = d.event;
                for (var A in c)d = c[A], "type" == A || "srcElement" == A || ya(d);
                F()
            }
        }
    }

    function jL(a, b, c, d, e, f) {
        return {eventType: a, event: b, targetElement: c, action: d, actionElement: e, timeStamp: f || F()}
    }

    function kL(a, b) {
        var c = null;
        "getAttribute" in a && (c = a.getAttribute(b));
        return c
    }

    var lL = {};

    function mL(a, b) {
        return function (c) {
            var d = a, e = b, f = !1;
            "mouseenter" == d ? d = "mouseover" : "mouseleave" == d && (d = "mouseout");
            if (c.addEventListener) {
                if ("focus" == d || "blur" == d || "error" == d || "load" == d) f = !0;
                c.addEventListener(d, e, f)
            } else c.attachEvent && ("focus" == d ? d = "focusin" : "blur" == d && (d = "focusout"), e = go(c, e), c.attachEvent("on" + d, e));
            return {sb: d, gb: e, capture: f}
        }
    }

    eL.prototype.gb = function (a) {
        return this.G[a]
    };
    function UD(a) {
        for (var b = a.B.concat(a.A), c = [], d = [], e = 0; e < a.A.length; ++e) {
            var f = a.A[e];
            nL(f, b) ? (c.push(f), TD(f)) : d.push(f)
        }
        for (e = 0; e < a.B.length; ++e)f = a.B[e], nL(f, b) ? c.push(f) : (d.push(f), XD(a, f));
        a.A = d;
        a.B = c
    }

    function XD(a, b) {
        var c = b.A;
        fL && (c.style.cursor = "pointer");
        for (c = 0; c < a.F.length; ++c)b.B.push(a.F[c].call(null, b.A))
    }

    function VD(a) {
        this.A = a;
        this.B = []
    }

    function nL(a, b) {
        for (var c = 0; c < b.length; ++c)if (b[c].A != a.A && WD(b[c].A, a.A))return !0;
        return !1
    }

    function WD(a, b) {
        for (; a != b && b.parentNode;)b = b.parentNode;
        return a == b
    }

    function TD(a) {
        for (var b = 0; b < a.B.length; ++b) {
            var c = a.A, d = a.B[b];
            c.removeEventListener ? c.removeEventListener(d.sb, d.gb, d.capture) : c.detachEvent && c.detachEvent("on" + d.sb, d.gb)
        }
        a.B = []
    };
    function oL(a, b) {
        this.C = a;
        this.B = b;
        this.A = {};
        this.A.hashchange = "hashchange";
        this.A.resize = "resize";
        this.A.load = "load";
        this.A.unload = "unload";
        this.A.beforeunload = "beforeunload";
        a = document;
        (a = "hidden" in a ? "visibilitychange" : "mozHidden" in a ? "mozvisibilitychange" : "msHidden" in a ? "msvisibilitychange" : "webkitHidden" in a ? "webkitvisibilitychange" : "") && (this.A[a] = "visibilitychange")
    }

    oL.prototype.cb = function () {
        var a = {popstate: ["popstate"], error: ["error"]};
        Ob(this.A, function (b, c) {
            a[b] || (a[b] = []);
            a[b].push(c)
        });
        return a
    };
    oL.prototype.Oa = da(null);
    oL.prototype.ob = function (a) {
        var b = a.type, c = new Ao(this.C, b);
        if ("popstate" == b) this.B("popstate", c, a); else if ("error" == b) {
            var d, e, f = unescape(a.message), b = f.split("~#!#~");
            4 == b.length ? (e = uj[parseInt(b[1], 10)], d = e.$f, e = e.error, b = b[0] + b[2] + b[3]) : b = f;
            a.message = b;
            a.file = a.file;
            a.jk = parseInt(a.line, 10);
            a.stack = a.stack;
            a.Fn = a.stackUrls;
            a.En = a.stackTruncation;
            a.$f = a.errorType;
            d && (a.$f = d);
            a.zn = a.count;
            a.error = e;
            this.B("error", c, a)
        } else this.A[b] && (d = this.A[b], "visibilitychange" == d ? (e = document, b = !1, "hidden" in
            e ? b = e.hidden : "mozHidden" in e ? b = e.mozHidden : "msHidden" in e ? b = e.msHidden : "webkitHidden" in e && (b = e.webkitHidden), a.hidden = b, this.B(d, c, a)) : this.B(d, c));
        c.done("main-actionflow-branch")
    };
    oL.prototype.nb = C;
    function pL(a) {
        this.A = a
    }

    pL.prototype.cb = da(null);
    pL.prototype.Oa = function () {
        return {copy: {qa: ["copy"], global: null}, cut: {qa: ["cut"], global: null}}
    };
    pL.prototype.ob = C;
    pL.prototype.nb = function (a, b) {
        b.event();
        var c = b.event().type;
        "copy" == c ? (c = b.event(), this.A(a, "copy", b, c)) : "cut" == c && (c = b.event(), this.A(a, "cut", b, c))
    };
    function qL() {
        this.A = {}
    }

    function rL(a, b, c, d) {
        b = Aa(b);
        d = d ? 1 : -1;
        for (var e = 0, f = c.length; e < f; ++e) {
            var g = c[e], g = a.A[g] = a.A[g] || new ej, k = g.get(b, 0) + d;
            g.set(b, k)
        }
    }

    function sL(a, b, c) {
        b = Aa(b);
        return !!a.A[c] && 0 < a.A[c].get(b, 0)
    }

    function tL(a) {
        var b = [], c;
        for (c in a.A) {
            var d = a.A[c];
            d && pb(d.Ca(), function (a) {
                return 0 < a
            }) && b.push(c)
        }
        return new kj(b)
    };
    function uL(a, b) {
        this.B = {};
        this.G = {};
        this.J = {};
        this.C = [];
        this.I = a || vL;
        this.F = b;
        this.A = {};
        this.D = null
    }

    uL.prototype.H = function (a, b) {
        if (ua(a)) this.C = wb(a), wL(this); else if (b) {
            b = a.event;
            if (a = this.A[a.eventType])for (var c = !1, d = 0, e; e = a[d++];)!1 === e(b) && (c = !0);
            c && ho(b)
        } else d = a.action, c = d.split(".")[0], b = this.G[c], this.F ? e = this.F(a) : b ? b.accept(a) && (e = b.handle) : e = this.B[d], e ? (a = this.I(a), e(a), a.done("main-actionflow-branch")) : (e = oo(a.event), a.event = e, this.C.push(a), b || (e = this.J[c]) && !e.wi && (e.xn(this, c, a), e.wi = !0))
    };
    function vL(a) {
        return new po(a.action, a.actionElement, a.event, a.timeStamp, a.eventType)
    }

    function xL(a, b, c) {
        Ob(c, E(function (a, c) {
            a = b ? E(a, b) : a;
            this.B[c] = a
        }, a));
        wL(a)
    }

    function yL(a, b) {
        return a.B.hasOwnProperty(b) || a.G.hasOwnProperty(b.split(".")[0])
    }

    function wL(a) {
        a.D && 0 != a.C.length && Jq(function () {
            this.D(this.C, this)
        }, a)
    };
    function zL(a, b, c) {
        this.C = null;
        this.B = a;
        a = 0;
        for (var d = this.B.length; a < d; ++a) {
            var e = this.B[a].Oa();
            if (e)for (var f in e)for (var g = e[f].qa, k = 0, l = g.length; k < l; ++k) {
                var m = b, n = g[k];
                if (!m.G.hasOwnProperty(n) && "mouseenter" != n && "mouseleave" != n) {
                    var p = iL(m, n), r = mL(n, p);
                    m.G[n] = p;
                    m.F.push(r);
                    for (n = 0; n < m.A.length; ++n)p = m.A[n], p.B.push(r.call(null, p.A))
                }
            }
        }
        c = this.A = new uL(AL(c));
        c.D = BL;
        wL(c);
        c = E(this.A.H, this.A);
        b.C = c;
        b.D && (0 < b.D.length && c(b.D), b.D = null);
        this.C = E(this.F, this);
        b = 0;
        for (c = CL.length; b < c; b++)f = this.A,
            a = CL[b], d = this.C, f.A[a] = f.A[a] || [], f.A[a].push(d);
        this.D = {}
    }

    function BL(a, b) {
        if (0 != a.length) {
            var c = a[a.length - 1];
            if (yL(b, c.action)) {
                b = c.event;
                var d = c.eventType, e;
                "_custom" == b.type ? e = "_custom" : e = d || b.type;
                if ("keypress" == e || "keydown" == e || "keyup" == e) {
                    var f;
                    if (lo) f = dL(b, d), f.ctrlKey = b.ctrlKey, f.altKey = b.altKey, f.shiftKey = b.shiftKey, f.metaKey = b.metaKey, f.keyCode = b.keyCode, f.charCode = b.charCode, f.dd = b.timeStamp, d = f; else {
                        if (document.createEvent)if (f = document.createEvent("KeyboardEvent"), f.initKeyboardEvent) {
                            e = b.ctrlKey;
                            var g = b.metaKey, k = b.shiftKey, l = [];
                            b.altKey &&
                            l.push("Alt");
                            e && l.push("Control");
                            g && l.push("Meta");
                            k && l.push("Shift");
                            f.initKeyboardEvent(d || b.type, !0, !0, window, b.charCode, b.keyCode, b.location, l.join(" "), b.repeat, b.locale);
                            if (ko || mo) d = aj(b.keyCode), Object.defineProperty(f, "keyCode", {get: d}), Object.defineProperty(f, "which", {get: d})
                        } else f.initKeyEvent(d || b.type, !0, !0, window, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.keyCode, b.charCode); else f = document.createEventObject(), f.type = d || b.type, f.repeat = b.repeat, f.ctrlKey = b.ctrlKey, f.altKey = b.altKey,
                            f.shiftKey = b.shiftKey, f.metaKey = b.metaKey, f.keyCode = b.keyCode, f.charCode = b.charCode;
                        f.dd = b.timeStamp;
                        d = f
                    }
                } else if ("click" == e || "dblclick" == e || "mousedown" == e || "mouseover" == e || "mouseout" == e || "mousemove" == e) document.createEvent ? (f = document.createEvent("MouseEvent"), f.initMouseEvent(d || b.type, !0, !0, window, b.detail || 1, b.screenX || 0, b.screenY || 0, b.clientX || 0, b.clientY || 0, b.ctrlKey || !1, b.altKey || !1, b.shiftKey || !1, b.metaKey || !1, b.button || 0, b.relatedTarget || null)) : (f = document.createEventObject(), f.type = d || b.type,
                        f.clientX = b.clientX, f.clientY = b.clientY, f.button = b.button, f.detail = b.detail, f.ctrlKey = b.ctrlKey, f.altKey = b.altKey, f.shiftKey = b.shiftKey, f.metaKey = b.metaKey), f.dd = b.timeStamp, d = f; else if ("focus" == e || "blur" == e || "focusin" == e || "focusout" == e || "scroll" == e) document.createEvent ? (f = document.createEvent("UIEvent"), f.initUIEvent(d || b.type, x(b.bubbles) ? b.bubbles : !0, b.cancelable || !1, b.view || window, b.detail || 0)) : (f = document.createEventObject(), f.type = d || b.type, f.bubbles = x(b.bubbles) ? b.bubbles : !0, f.cancelable = b.cancelable || !1, f.view = b.view || window, f.detail = b.detail || 0), f.relatedTarget = b.relatedTarget || null, f.dd = b.timeStamp, d = f; else if ("_custom" == e) {
                    d = {_type: d, type: d, data: b.detail.data, Gn: b.detail.triggeringEvent};
                    try {
                        f = document.createEvent("CustomEvent"), f.initCustomEvent("_custom", !0, !1, d)
                    } catch (m) {
                        f = document.createEvent("HTMLEvents"), f.initEvent("_custom", !0, !1), f.detail = d
                    }
                    d = f;
                    d.dd = b.timeStamp
                } else d = dL(b, d);
                c = c.targetElement;
                b = d;
                c.dispatchEvent ? c.dispatchEvent(b) : c.fireEvent("on" + b.type, b);
                a.length = 0
            }
        }
    }

    var CL = "click rightclick contextmenu mousedown keypress wheel".split(" ");

    function AL(a) {
        return function (b) {
            return new Ao(a, b.action, b.actionElement, b.event)
        }
    }

    zL.prototype.F = function (a) {
        var b = w.globals && w.globals.fua;
        b && !x(b.data) && (b.data = {
            type: a.type,
            target: a.target,
            currentTarget: a.currentTarget,
            time: F(),
            mn: !1
        }, b.dispose && b.dispose());
        if (this.C) {
            a = 0;
            for (b = CL.length; a < b; a++) {
                var c = this.A, d = CL[a];
                c.A[d] && tb(c.A[d], this.C)
            }
            this.C = null
        }
    };
    zL.prototype.H = function (a, b, c) {
        if ("" != a) {
            var d = this.D[a];
            d || (d = this.D[a] = new qL);
            for (var e = 0, f = this.B.length; e < f; ++e) {
                var g = this.B[e], k = g.Oa();
                k && (k = k[b]) && k.qa && rL(d, g, k.qa, c)
            }
            tL(d).Pa() ? delete this.A.B[a] : yL(this.A, a) || (b = {}, b[a] = this.G, xL(this.A, this, b))
        }
    };
    zL.prototype.G = function (a) {
        try {
            for (var b = a.P, c = a.event().type, d = this.D[b], e = 0, f = this.B.length; e < f; ++e) {
                var g = this.B[e];
                sL(d, g, c) && g.nb(b, a)
            }
        } catch (k) {
            throw vj(k);
        }
    };
    function DL(a) {
        this.A = a
    }

    DL.prototype.cb = da(null);
    DL.prototype.Oa = function () {
        return {focus: {qa: ["focus"], global: null}, blur: {qa: ["blur"], global: null}}
    };
    DL.prototype.ob = C;
    DL.prototype.nb = function (a, b) {
        b.event();
        var c = b.event().type;
        "focus" == c ? (c = b.event(), this.A(a, "focus", b, c)) : "blur" == c && (c = b.event(), this.A(a, "blur", b, c))
    };
    function EL(a) {
        this.A = a
    }

    EL.prototype.cb = da(null);
    EL.prototype.Oa = function () {
        return {change: {qa: ["change"], global: null}, input: {qa: ["input"], global: null}}
    };
    EL.prototype.ob = C;
    EL.prototype.nb = function (a, b) {
        b.event();
        var c = b.event().type;
        "change" == c ? (c = b.event(), this.A(a, "change", b, c)) : "input" == c && (c = b.event(), this.A(a, "input", b, c))
    };
    function FL(a, b) {
        vq.call(this);
        this.B = a;
        this.J = b || window;
        this.D = new qL;
        this.C = new qL;
        "undefined" !== typeof globals && globals.ErrorHandler && globals.ErrorHandler.listen ? (globals.ErrorHandler.listen(E(this.G, this)), a = !0) : a = !1;
        this.I = a
    }

    G(FL, vq);
    FL.prototype.H = function (a, b, c) {
        var d = "" == a, e = d ? this.C : this.D, f = d ? this.D : this.C;
        a = tL(f);
        for (var g = 0, k = this.B.length; g < k; ++g) {
            var l = this.B[g], m;
            var n = l;
            m = b;
            m = d ? (n = n.cb()) ? n[m] : void 0 : (n = n.Oa()) && n[m] ? n[m].global : void 0;
            m && rL(f, l, m, c)
        }
        b = tL(f);
        e = tL(e);
        c = nj(nj(a, b), e);
        a = nj(nj(b, a), e);
        nb(c.Ca(), this.M, this);
        nb(a.Ca(), this.L, this)
    };
    FL.prototype.L = function (a) {
        "error" == a && this.I || xq(this, this.J, a, this.G, !0, this)
    };
    FL.prototype.M = function (a) {
        "error" == a && this.I || this.Wb(this.J, a, this.G, !0, this)
    };
    FL.prototype.G = function (a) {
        try {
            for (var b = a.type, c = 0, d = this.B.length; c < d; ++c) {
                var e = this.B[c];
                (sL(this.D, e, b) || sL(this.C, e, b)) && e.ob(a)
            }
        } catch (f) {
            throw globals.ErrorHandler.log(f);
        }
    };
    var GL = {}, HL = {};

    function IL(a) {
        var b = Aa(a);
        GL[b] && (zo(a, "lhc", GL[b].toString()), zo(a, "lht", HL[b].toFixed(3).toString()), delete GL[b], delete HL[b])
    };
    function JL(a, b, c) {
        this.B = a;
        this.A = b;
        this.C = c
    }

    JL.prototype.cb = function () {
        return {keypress: ["keypress"], keydown: ["keydown"], keyup: ["keyup"]}
    };
    JL.prototype.Oa = function () {
        return {
            keypress: {qa: ["keypress"], global: null},
            keydown: {qa: ["keydown"], global: null},
            keyup: {qa: ["keyup"], global: null}
        }
    };
    JL.prototype.ob = function (a) {
        var b = KL(a);
        if (b) {
            var c = new Ao(this.B, b);
            a = LL(a);
            this.C(b, c, a, a.keyCode);
            c.done("main-actionflow-branch")
        }
    };
    JL.prototype.nb = function (a, b) {
        b.event();
        var c = b.event(), d = KL(c);
        d && (c = LL(c), this.A(a, d, b, c, c.keyCode))
    };
    function KL(a) {
        switch (a.type) {
            case "keypress":
                return "keypress";
            case "keydown":
                return "keydown";
            case "keyup":
                return "keyup";
            default:
                return null
        }
    }

    function LL(a) {
        return {
            type: a.type,
            keyCode: Xx(a.keyCode),
            shiftKey: a.shiftKey,
            ctrlKey: a.ctrlKey,
            altKey: a.altKey,
            metaKey: a.metaKey,
            Bn: a,
            preventDefault: function () {
                a.preventDefault()
            },
            stopPropagation: function () {
                a.stopPropagation()
            }
        }
    };
    function ML() {
        this.A = NL()
    }

    function NL() {
        return x(window.performance) ? window.performance.now || window.performance.mozNow || window.performance.msNow || window.performance.oNow || window.performance.webkitNow || null : null
    }

    ML.prototype.getTime = function () {
        return this.A.call(window.performance)
    };
    function OL(a, b) {
        b || (b = io(a), b = b.getBoundingClientRect || !b.parentNode ? b : b.parentNode, b = b.getBoundingClientRect());
        PL.x = a.clientX - b.left;
        PL.y = a.clientY - b.top;
        return PL
    }

    function QL(a) {
        a.getAttribute("tabindex") || a.setAttribute("tabindex", "-1");
        a.focus()
    }

    var PL = new Jj;

    function RL(a, b) {
        this.L = a;
        this.N = b;
        this.A = !1;
        this.B = null;
        this.C = !1;
        this.H = "";
        this.F = this.D = 0;
        this.G = this.K = null;
        this.J = this.I = 0
    }

    function SL(a, b, c, d) {
        a.C || (a.H = b, a.K = d, a.G = d.getBoundingClientRect(), b = OL(c, a.G), a.I = a.D = b.x, a.J = a.F = b.y, a.C = !0)
    }

    function TL(a, b, c) {
        if (a.C) {
            var d = UL(b) ? 15 : 2;
            c = OL(c, a.G);
            !a.A && (Math.abs(a.I - c.x) > d || Math.abs(a.J - c.y) > d) && (a.A = !0, a.B = new Ao(a.L, a.H), VL(a, b, "dragstart", a.I, a.J));
            a.A && (VL(a, b, "drag", c.x, c.y), a.D = c.x, a.F = c.y)
        }
    }

    function WL(a, b, c) {
        if (!a.C)return !1;
        var d = a.D, e = a.F;
        c && (c = OL(c, a.G), d = c.x, e = c.y);
        a.A && (VL(a, b, "dragend", d, e), a.B && a.B.done("main-actionflow-branch"), a.B = null);
        b = a.A;
        a.C = !1;
        a.A = !1;
        return b
    }

    function VL(a, b, c, d, e) {
        var f = a.B;
        b.x = d;
        b.y = e;
        b.pn = d - a.D;
        b.qn = e - a.F;
        UL(b) || (b.target = a.K);
        a.N(a.H, c, f, b)
    }

    function UL(a) {
        return "touchstart" === a.type || "touchmove" === a.type || "touchend" === a.type || "touchcancel" === a.type
    };
    function XL(a, b) {
        this.D = b;
        this.B = !1;
        this.C = null;
        this.A = [];
        b = [0, 1, 2];
        for (var c = 0, d = b.length; c < d; ++c)this.A.push(new RL(a, E(this.qk, this, b[c])))
    }

    q = XL.prototype;
    q.cb = da(null);
    q.Oa = function () {
        var a;
        Mk ? a = {qa: ["mousedown"], global: ["mousemove", "mouseup"]} : a = {
                qa: ["mousedown", "mousemove", "mouseup"],
                global: null
            };
        var b = {};
        b.dragstart = a;
        b.drag = a;
        b.dragend = a;
        return b
    };
    q.ob = function (a) {
        YL(this, a)
    };
    q.nb = function (a, b) {
        b.event();
        var c = new Ok(b.event());
        YL(this, c, a, b)
    };
    function YL(a, b, c, d) {
        var e;
        if ("mousedown" == b.type) b = b.Na, QL(io(b)), ho(b), (e = a.A[b.button]) && SL(e, c, b, d.node()); else if ("mousemove" == b.type)for (c = 0, d = a.A.length; c < d; ++c)TL(a.A[c], b, b); else"mouseup" == b.type && (e = a.A[b.button], a.B = !!e && WL(e, b, b), a.C = a.B ? b.target : null)
    }

    q.qk = function (a, b, c, d, e) {
        this.D(b, c, d, e, a)
    };
    function ZL() {
        this.A = [];
        this.B = "touch";
        $L() && (this.B = w.MSPointerEvent.MSPOINTER_TYPE_TOUCH)
    }

    function $L() {
        return !x(w.PointerEvent) && x(w.MSPointerEvent)
    }

    function aM() {
        return x(w.PointerEvent) || x(w.MSPointerEvent)
    }

    function bM(a) {
        this.identifier = a.pointerId;
        this.screenX = a.screenX;
        this.screenY = a.screenY;
        this.clientX = a.clientX;
        this.clientY = a.clientY;
        this.pageX = a.pageX;
        this.pageY = a.pageY;
        this.force = a.pressure;
        this.target = a.target
    }

    function cM(a, b) {
        var c = rb(a.A, function (a) {
            return a.identifier == b.pointerId
        }), d = new bM(b);
        -1 == c ? a.A.push(d) : a.A[c] = d;
        return d
    }

    function dM(a, b, c, d) {
        var e = {};
        e.type = b;
        e.touches = wb(a.A);
        e.changedTouches = [c];
        e.target = d.target;
        e.currentTarget = d.currentTarget;
        e.preventDefault = function () {
            d.preventDefault()
        };
        return e
    }

    function eM(a, b) {
        switch (b.type) {
            case "pointerdown":
            case "MSPointerDown":
                if (b.pointerType == a.B) {
                    x(b.target.F) ? b.target.F(b.pointerId) : x(b.target.msSetPointerCapture) && b.target.msSetPointerCapture(b.pointerId);
                    var c = cM(a, b);
                    a = dM(a, "touchstart", c, b)
                } else a = null;
                return a;
            case "pointermove":
            case "MSPointerMove":
                return b.pointerType == a.B ? (c = cM(a, b), a = dM(a, "touchmove", c, b)) : a = null, a;
            case "pointerup":
            case "pointercancel":
            case "MSPointerUp":
            case "MSPointerCancel":
                return fM(a, b)
        }
        return null
    }

    function fM(a, b) {
        if (b.pointerType == a.B) {
            x(b.target.D) ? b.target.D(b.pointerId) : x(b.target.msReleasePointerCapture) && b.target.msReleasePointerCapture(b.pointerId);
            var c = rb(a.A, function (a) {
                return a.identifier == b.pointerId
            });
            if (-1 != c)return ub(a.A, c), dM(a, "touchend", new bM(b), b)
        }
        return null
    };
    function gM(a, b) {
        this.K = a;
        this.D = b;
        this.A = !1;
        this.G = (a = $L()) ? "MSPointerDown" : "pointerdown";
        this.H = a ? "MSPointerUp" : "pointerup";
        this.J = a ? "MSPointerCancel" : "pointercancel";
        this.I = a ? w.MSPointerEvent.MSPOINTER_TYPE_TOUCH : "touch";
        this.F = x(w.TouchEvent) && aM();
        this.C = this.B = null
    }

    q = gM.prototype;
    q.cb = da(null);
    q.Oa = function () {
        var a = {click: {qa: ["click"], global: null}, dblclick: {qa: ["dblclick"], global: null}};
        a.ptrdown = {qa: ["mousedown", "touchstart", this.G], global: null};
        a.ptrhover = {qa: ["mousemove"], global: ["mousedown", "mouseup"]};
        a.ptrup = {qa: ["mouseup", "touchend", this.H, this.J], global: null};
        a.contextmenu = {qa: ["contextmenu"], global: null};
        return a
    };
    q.ob = function (a) {
        a = a.type;
        "mousedown" == a ? this.A = !0 : "mouseup" == a && (this.A = !1)
    };
    function hM(a, b) {
        return null != b && 100 > Math.abs(a - b)
    }

    function iM(a, b) {
        if ("mousedown" == b.type)return !0;
        if (a.F && hM(b.timeStamp, a.B) || "touchstart" != b.type)return b.type == a.G && b.pointerType == a.I ? (a.B = b.timeStamp, b.isPrimary) : !1;
        a.B = null;
        a = b.touches;
        return 1 == (a ? a.length : 0)
    }

    function jM(a, b) {
        if ("mouseup" == b.type)return !0;
        if (a.F && hM(b.timeStamp, a.C) || "touchend" != b.type)return b.type == a.H && b.pointerType == a.I ? (a.C = b.timeStamp, b.isPrimary) : !1;
        a.C = null;
        a = b.touches;
        return 0 == (a ? a.length : 0)
    }

    q.nb = function (a, b) {
        b.event();
        var c = b.event(), d = c.type;
        "click" == d ? (c = b.event(), d = this.D.C, this.D.B && c && d && c.target === d ? b.event().stopPropagation() : kM(this, a, "click", b)) : "dblclick" == d ? kM(this, a, "dblclick", b) : iM(this, c) ? kM(this, a, "ptrdown", b) : "mousemove" != d || this.A ? jM(this, c) ? kM(this, a, "ptrup", b) : "contextmenu" == d && kM(this, a, "contextmenu", b) : kM(this, a, "ptrhover", b)
    };
    q.Zd = h("A");
    function kM(a, b, c, d) {
        var e = d.node();
        if (e) {
            var f = d.event(), g = new Ok(f);
            if ("touchstart" == f.type || "touchend" == f.type) {
                var k = f.touches;
                0 == k.length && (k = f.changedTouches);
                f = k[0];
                g.clientX = f.clientX;
                g.clientY = f.clientY;
                g.screenX = f.screenX;
                g.screenY = f.screenY
            }
            e = OL(g, e.getBoundingClientRect());
            g.x = e.x;
            g.y = e.y;
            a.K(b, c, d, g)
        }
    };
    function lM(a, b) {
        this.A = a;
        this.B = b
    }

    lM.prototype.cb = da(null);
    lM.prototype.Oa = function () {
        return {ptrin: {qa: ["mouseover"], global: null}, ptrout: {qa: ["mouseout"], global: null}}
    };
    lM.prototype.ob = C;
    lM.prototype.nb = function (a, b) {
        var c = b.event(), d = c.type;
        if ("mouseover" == d) {
            var d = c.relatedTarget || null, c = c.target, e = b.event();
            e.Ok = d;
            e.Lk = c;
            e.Zd = this.B.Zd();
            this.A(a, "ptrin", b, e)
        } else"mouseout" == d && (d = c.target, c = c.relatedTarget || null, e = b.event(), e.Ok = d, e.Lk = c, e.Zd = this.B.Zd(), this.A(a, "ptrout", b, e))
    };
    function mM(a, b, c) {
        this.A = a;
        this.B = b;
        this.C = c
    }

    mM.prototype.cb = function () {
        return {scroll: ["scroll"]}
    };
    mM.prototype.Oa = function () {
        return {scroll: {qa: ["scroll"], global: null}}
    };
    mM.prototype.ob = function (a) {
        if ("scroll" === a.type) {
            var b = new Ao(this.A, "scroll");
            this.C("scroll", b, a);
            b.done("main-actionflow-branch")
        }
    };
    mM.prototype.nb = function (a, b) {
        b.event();
        if ("scroll" == b.event().type) {
            var c = b.event();
            this.B(a, "scroll", b, c)
        }
    };
    function nM() {
        this.A = [];
        this.B = !1
    }

    nM.prototype.filter = function (a) {
        if (!(zc || Ac || tc))return !1;
        a = new oM(F(), a.A);
        if (0 < this.A.length) {
            var b = this.A[this.A.length - 1], c = 0 > a.B != 0 > b.B;
            if (100 < a.A - b.A || c) this.A.length = 0
        }
        this.A.push(a);
        10 < this.A.length && this.A.shift();
        if (3 > this.A.length) this.B = !1; else {
            a = this.A;
            b = a.length;
            if (2 > b) a = NaN; else {
                for (var c = [0, 0, 0, 0, 0], d = a[0].A - 100, e, f, g = 0; g < b; g++)if (e = a[g].A - d, f = Math.abs(a[g].B)) c[0] += e, c[1] += f, c[2] += e * e, c[3] += e * f, c[4] += f * f;
                a = c[1] / b - (b * c[3] - c[0] * c[1]) / (b * c[2] - c[0] * c[0]) * c[0] / b
            }
            this.B = this.B ? 0 < a : 15 < a
        }
        return this.B
    };
    function oM(a, b) {
        this.A = a;
        this.B = b
    };
    function yM(a, b, c, d, e) {
        Ok.call(this, a);
        this.type = "wheel";
        this.deltaMode = b;
        this.deltaX = c;
        this.deltaY = d;
        this.deltaZ = e;
        a = 1;
        switch (b) {
            case 2:
                a *= 450;
                break;
            case 1:
                a *= 15
        }
        this.B = this.deltaX * a;
        this.A = this.deltaY * a
    }

    G(yM, Ok);
    function zM(a, b) {
        ol.call(this);
        a = this.A = a;
        a = za(a) && 1 == a.nodeType ? this.A : this.A.body;
        this.C = !!a && "rtl" == Yn(a, "direction");
        this.B = al(this.A, AM(), this, b)
    }

    G(zM, ol);
    function AM() {
        return dc && pc(17) || bc && pc(9) || zc && 0 <= db(lE, 31) ? "wheel" : dc ? "DOMMouseScroll" : "mousewheel"
    }

    zM.prototype.handleEvent = function (a) {
        var b = 0, c = 0, d = 0, e = 0;
        a = a.Na;
        "wheel" == a.type ? (b = a.deltaMode, c = a.deltaX, d = a.deltaY, e = a.deltaZ) : "mousewheel" == a.type ? x(a.wheelDeltaX) ? (c = -a.wheelDeltaX, d = -a.wheelDeltaY) : d = -a.wheelDelta : (b = 1, x(a.axis) && a.axis === a.HORIZONTAL_AXIS ? c = a.detail : d = a.detail);
        this.C && (c = -c);
        b = new yM(a, b, c, d, e);
        this.dispatchEvent(b)
    };
    zM.prototype.ga = function () {
        zM.V.ga.call(this);
        jl(this.B);
        this.B = null
    };
    function BM() {
        this.A = CM()
    }

    function CM() {
        if (hc) {
            if (zc || ac)return 100;
            if (tc)return 45;
            if (bc)return 49.95
        } else if (gc) {
            if (!(zc || ac || Ac) && tc)return 20
        } else if (ic) {
            if (zc || ac)return 53;
            if (tc)return 45
        }
        return 50
    };
    function DM(a) {
        this.C = a;
        this.B = new zM(new ol);
        this.B.addEventListener("wheel", E(ba("A"), this));
        this.A = null;
        this.F = new nM;
        this.D = new BM
    }

    DM.prototype.cb = da(null);
    DM.prototype.Oa = function () {
        var a = {}, b = AM();
        a.scrollwheel = {qa: [b], global: null};
        return a
    };
    DM.prototype.ob = C;
    DM.prototype.nb = function (a, b) {
        var c = new Ok(b.event());
        this.B.handleEvent(c);
        var d = this.A, e = OL(c, b.node().getBoundingClientRect());
        c.x = e.x;
        c.y = e.y;
        c.ef = d.B;
        c.Fd = d.A;
        c.Mk = d.A / this.D.A;
        c.ctrlKey = d.ctrlKey;
        c.Ji = this.F.filter(d);
        this.C(a, "scrollwheel", b, c)
    };
    function EM(a, b) {
        this.G = b;
        b = null;
        aM() && (b = new ZL);
        this.H = b;
        this.A = new RL(a, E(this.rk, this));
        this.D = (a = $L()) ? "MSPointerDown" : "pointerdown";
        this.B = a ? "MSPointerMove" : "pointermove";
        this.F = a ? "MSPointerUp" : "pointerup";
        this.C = a ? "MSPointerCancel" : "pointercancel"
    }

    q = EM.prototype;
    q.cb = da(null);
    q.Oa = function () {
        var a = ["touchstart", "touchmove", "touchend", "touchcancel"];
        aM() && (a = a.concat([this.D, this.B, this.F, this.C]));
        var a = {qa: a, global: null}, b = {};
        b.dragstart = a;
        b.drag = a;
        b.dragend = a;
        return b
    };
    q.ob = C;
    q.nb = function (a, b) {
        b.event();
        var c = b.event();
        if (this.H) {
            var d = c.type;
            if (d == this.D || d == this.B || d == this.F || d == this.C) c = eM(this.H, c);
            if (!c)return
        }
        var d = c.touches, e = c.type;
        c.preventDefault();
        if ("touchstart" == e) QL(c.target), SL(this.A, a, d[0], b.node()), TL(this.A, c, d[0]); else if ("touchmove" == e) TL(this.A, c, d[0]); else if ("touchcancel" == e || "touchend" == e) 0 == d.length ? !WL(this.A, c) && (d = b.node()) && (c = new Ok(b.event()), d = OL(c, d.getBoundingClientRect()), c.x = d.x, c.y = d.y, this.G(a, "click", b, c)) : TL(this.A, c, d[0])
    };
    q.rk = function (a, b, c, d) {
        this.G(a, b, c, d, 0)
    };
    function FM(a, b, c, d) {
        this.I = a;
        this.B = null;
        NL() && (this.B = new ML);
        uo && Uo(uo, "beforedone", IL);
        c = E(this.Yf, this);
        var e = E(this.Yf, this, ""), f = [], g = new XL(b, c);
        f.push(g);
        f.push(new EM(b, c));
        g = new gM(c, g);
        f.push(g);
        f.push(new lM(c, g));
        f.push(new oL(b, e));
        f.push(new DM(c));
        f.push(new DL(c));
        f.push(new EL(c));
        f.push(new JL(b, c, e));
        f.push(new mM(b, c, e));
        f.push(new pL(c));
        this.A = f;
        this.G = new kj;
        this.H = new kj;
        this.F = {};
        this.C = [new zL(this.A, a, b), new FL(this.A, d)];
        this.D = {};
        a = 0;
        for (b = this.A.length; a < b; ++a)(d = this.A[a].Oa()) &&
        lj(this.G, Rb(d)), (d = this.A[a].cb()) && lj(this.H, Rb(d))
    }

    q = FM.prototype;
    q.Zc = function (a) {
        var b = this.D[a];
        if (b) {
            var c = b.Yb, d = b.sb, b = b.qualifier;
            delete this.D[a];
            a = this.F;
            delete a[c][d][b];
            Sb(a[c][d]) && (delete a[c][d], Sb(a[c]) && delete a[c]);
            a = 0;
            for (b = this.C.length; a < b; ++a)this.C[a].H(c, d, !1)
        }
    };
    q.Sb = function (a, b, c, d) {
        return this.H.contains(a) ? GM(this, "", a, b, c, x(d) ? d : null) : null
    };
    q.xc = function (a, b, c, d, e, f) {
        return this.G.contains(c) ? GM(this, a ? a + "." + b : b, c, d, e, x(f) ? f : null) : null
    };
    function GM(a, b, c, d, e, f) {
        a:for (var g = 0, k = JC.length; g < k; ++g)if (c == JC[g])break a;
        g = a.F;
        g[b] = g[b] || {};
        g[b][c] = g[b][c] || {};
        g[b][c][f] = d ? {Qc: e, scope: d} : e;
        d = 0;
        for (e = a.C.length; d < e; ++d)a.C[d].H(b, c, !0);
        d = ++HM;
        a.D[d] = {Yb: b, sb: c, qualifier: f};
        return d
    }

    q.Yf = function (a, b, c, d, e) {
        var f = this.F;
        f[a] && f[a][b] ? (a = f[a][b], e = a[x(e) ? e : null] || a.all_others || a[null]) : e = null;
        if (e) {
            if (this.B)var g = this.B.getTime();
            ya(e) ? e(c, d) : e.Qc.call(e.scope, c, d);
            this.B && (d = this.B.getTime() - g, .75 > d || (c = Aa(c), x(HL[c]) || x(GL[c]) ? x(HL[c]) && x(GL[c]) && (HL[c] += d, GL[c]++) : (HL[c] = d, GL[c] = 1)))
        }
    };
    q.tc = h("I");
    var HM = 0;

    function IM() {
        this.A = [];
        this.B = []
    }

    function JM(a, b) {
        a.B.push(b)
    }

    function KM(a) {
        0 == a.A.length && (a.A = a.B, a.A.reverse(), a.B = []);
        return a.A.pop()
    }

    q = IM.prototype;
    q.Cb = function () {
        return this.A.length + this.B.length
    };
    q.Pa = function () {
        return 0 == this.A.length && 0 == this.B.length
    };
    q.clear = function () {
        this.A = [];
        this.B = []
    };
    q.contains = function (a) {
        return sb(this.A, a) || sb(this.B, a)
    };
    q.remove = function (a) {
        var b;
        b = this.A;
        var c;
        b:if (c = b.length - 1, 0 > c && (c = Math.max(0, b.length + c)), wa(b)) c = wa(a) && 1 == a.length ? b.lastIndexOf(a, c) : -1; else {
            for (; 0 <= c; c--)if (c in b && b[c] === a)break b;
            c = -1
        }
        0 <= c ? (ub(b, c), b = !0) : b = !1;
        return b || tb(this.B, a)
    };
    q.Ca = function () {
        for (var a = [], b = this.A.length - 1; 0 <= b; --b)a.push(this.A[b]);
        for (var c = this.B.length, b = 0; b < c; ++b)a.push(this.B[b]);
        return a
    };
    function LM() {
        this.A = {};
        this.B = this.C = void 0
    }

    function MM(a, b, c) {
        c = Math.floor(c);
        a.A[c] || (a.A[c] = new IM);
        JM(a.A[c], b);
        if (!x(a.C) || c < a.C) a.C = c;
        if (!x(a.B) || c > a.B) a.B = c
    }

    function NM(a) {
        a:{
            if (x(a.B))for (var b = a.B; b >= a.C; b--)if (a.A[b] && !a.A[b].Pa()) {
                a = a.A[b];
                break a
            }
            a = null
        }
        return a ? KM(a) : void 0
    }

    LM.prototype.remove = function (a) {
        if (x(this.B))for (var b = this.B; b >= this.C && (!this.A[b] || !this.A[b].remove(a)); b--);
    };
    function OM(a) {
        if (!x(a.B))return -1;
        for (var b = a.B; b >= a.C; b--)if (a.A[b] && !a.A[b].Pa())return b;
        return -1
    };
    function PM(a, b) {
        this.J = a;
        this.B = 0;
        this.A = [];
        this.I = null != b ? b : 24;
        this.D = 0;
        this.F = new LM;
        this.G = {};
        this.C = -1;
        this.H = void 0
    }

    function QM(a, b) {
        this.B = a;
        this.A = this.D = this.C = !1;
        this.Ra = b;
        this.F = 0
    }

    function Pr(a, b, c) {
        var d = b.state;
        if (!d || d.Ra != c) {
            if (d)a:if (b = d, b.C) {
                for (var d = a.F, e = Math.floor(c), f = d.B; f >= d.C; f--)if (d.A[f] && d.A[f].remove(b)) {
                    MM(d, b, e);
                    break
                }
                b.Ra = c
            } else {
                if (b.D) {
                    d = c > b.Ra;
                    e = 0 == a.D;
                    f = OM(a.F) <= c;
                    if (d || e || f) {
                        RM(a, b);
                        SM(a, b, c);
                        break a
                    }
                    a.remove(b.B) && TM(a, b, c)
                }
                b.A && (a.remove(b.B), TM(a, b, c))
            } else d = new QM(b, c), b.state = d, TM(a, d, c);
            if (0 != a.I && a.B == a.I)for (b = !1, d = 1; d < c; d++) {
                if (a.A[d] && 0 < a.A[d].length)for (var e = a.A[d], f = e.length - 1, g; g = e[f]; f--)if (g.B.cancel()) {
                    b = !0;
                    g.B.state && RM(a, g);
                    TM(a,
                        g, d);
                    break
                }
                if (b)break
            }
            UM(a)
        }
    }

    PM.prototype.start = function () {
        for (var a = 0; 4 > a && VM(this); ++a) {
            var b;
            for (b = NM(this.F); b && !b.C;)b = NM(this.F);
            b ? (b.C = !1, this.D += -1) : b = null;
            if (!b)break;
            WM(this, b)
        }
        for (a = 3; 1 <= a && !(this.A[a] && 0 < this.A[a].length); a--);
        for (b = 1; 3 >= b; b++)if (b < a) {
            var c = this.G[b];
            if (c && 0 < c.length)for (; 0 < c.length;) {
                var d = c.pop();
                d.A = !1;
                d.B.cancel();
                TM(this, d, b)
            }
        }
        if (VM(this))return this.start;
        this.H = void 0;
        return xj
    };
    function VM(a) {
        var b = -1 != OM(a.F);
        a = 0 == a.I || a.B < a.I;
        return b && a
    }

    function UM(a) {
        var b = OM(a.F);
        if (-1 != b) {
            var c = 0;
            2 == b ? c = 1 : 3 == b && (c = 2);
            if (!x(a.H)) iq(a.J, a, jq(c, !0)), a.H = c; else if (a.H < c) {
                var b = a.J, d = a.__maps_realtime_JobScheduler_next_step;
                if (d && d != xj) {
                    var d = a.__maps_realtime_JobScheduler_priority, e;
                    e = 1 == d || 3 == d || 5 == d ? jq(c, !0) : jq(c, !1);
                    if (d != e) {
                        for (var f = b.A[d].length, g = 0; g < f; ++g)if (b.A[d][g] == a) {
                            b.A[d][g] = null;
                            break
                        }
                        a.__maps_realtime_JobScheduler_priority = e;
                        b.A[e].push(a)
                    }
                }
                a.H = c
            }
        }
    }

    function WM(a, b) {
        SM(a, b, b.Ra);
        b.B.start(function () {
            XM(a, b)
        })
    }

    function TM(a, b, c) {
        b.Ra = c;
        b.C = !0;
        a.D += 1;
        MM(a.F, b, c)
    }

    function RM(a, b) {
        a.A[b.Ra] && tb(a.A[b.Ra], b);
        b.D = !1;
        a.B += -1;
        0 == a.B && -1 != a.C && (w.clearTimeout(a.C), a.C = -1)
    }

    function SM(a, b, c) {
        a.A[c] ? a.A[c].push(b) : a.A[c] = [b];
        b.F = F();
        b.D = !0;
        a.B += 1;
        b.Ra = c;
        -1 == a.C && YM(a)
    }

    function YM(a) {
        a.C = w.setTimeout(function () {
            if (0 < a.B && -1 != a.C) {
                for (var b = F(), c = [], d = 1; 3 >= d; d++) {
                    var e = a.A[d];
                    if (e)for (var f = 0; f < e.length; ++f) {
                        var g = e[f];
                        1E4 <= b - g.F && c.push(g)
                    }
                }
                for (b = 0; b < c.length; ++b)d = a, e = c[b], RM(d, e), d.G[e.Ra] ? d.G[e.Ra].push(e) : d.G[e.Ra] = [e], e.A = !0, UM(d);
                0 < a.B ? YM(a) : a.C = -1
            }
        }, 1E4)
    }

    function XM(a, b) {
        b && (b.D ? RM(a, b) : b.A && (tb(a.G[b.Ra], b), b.A = !1), b.B.state = null);
        UM(a)
    }

    PM.prototype.remove = function (a) {
        var b = a.state, c = !1;
        if (b && (b.D || b.A)) {
            if (a.cancel() || b.A) XM(this, b), c = !0
        } else b && b.C && (b.C = !1, this.D += -1, c = !0);
        c && (a.state = null);
        return c
    };
    function ZM(a, b, c, d) {
        this.H = !!a;
        this.L = c || C;
        this.F = this.G = !1;
        this.D = null;
        this.M = b ? b : w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || w.msRequestAnimationFrame || function (a) {
                w.setTimeout(a, 16)
            };
        var e = this;
        this.K = function () {
            e.A = !1;
            $M(e, !1)
        };
        this.J = function () {
            e.C = !1;
            e.G = !1;
            $M(e, e.H && e.A)
        };
        this.C = this.A = !1;
        this.B = !0;
        this.I = 0;
        jK(E(this.N, this), void 0, d)
    }

    function $M(a, b) {
        a.F = !0;
        try {
            if (b) {
                var c = a.D;
                try {
                    c.H = !0;
                    var d = F() + 2;
                    for (b = 5; 0 <= b && aN(c, b, d); b--);
                } finally {
                    c.H = !1, (0 < c.A[5].length || 0 < c.A[4].length || 0 < c.A[3].length || 0 < c.A[2].length || 0 < c.A[1].length || 0 < c.A[0].length) && BE(c.B), c.aa++
                }
            } else a.D.xa()
        } catch (e) {
            throw a.L(e), e;
        }
        a.G && (!a.H && a.A && a.B || bN(a));
        a.F = !1
    }

    function bE(a) {
        a.B ? a.A || !a.H && a.C || (a.M.call(w, a.K), a.A = !0) : bN(a)
    }

    function BE(a) {
        Ac ? bE(a) : a.F ? a.G = !0 : a.B && a.A || bN(a)
    }

    function bN(a) {
        a.C || !a.B && F() > a.I || (Dq(a.J), a.C = !0)
    }

    ZM.prototype.N = function (a) {
        (this.B = a) && !this.A ? bN(this) : this.I = F() + 1E4
    };
    function cN(a, b, c) {
        this.B = a || new ZM;
        this.B.D = this;
        this.ea = F();
        this.P = dN;
        this.$ = this.C = this.ia = this.aa = this.fa = this.X = this.J = this.D = this.F = 0;
        this.M = this.H = !1;
        this.K = [];
        this.I = [];
        this.G = [];
        this.A = [];
        this.A[0] = [];
        this.A[1] = [];
        this.A[2] = [];
        this.A[3] = [];
        this.A[4] = [];
        this.A[5] = [];
        this.U = [];
        this.na = !!b;
        this.ja = !c;
        this.L = !1;
        this.O = this.Y = this.N = 0;
        yj.push(this)
    }

    var dN = 1E3 / 60, eN = 1E4 / 60;

    function jq(a, b) {
        a *= 2;
        b && (a += 1);
        return a
    }

    function iq(a, b, c) {
        var d = b.__maps_realtime_JobScheduler_next_step;
        d && d != xj || (b.__maps_realtime_JobScheduler_next_step = b.start, b.__maps_realtime_JobScheduler_priority = c, a.A[c].push(b), a.H || BE(a.B))
    }

    cN.prototype.xa = function () {
        var a = F();
        this.H = !0;
        var b = 0, c = this.U;
        if (0 < c.length) {
            for (b = 0; b < c.length; b++)iq(this, c[b].gk, jq(c[b].Ra, !1));
            this.U = []
        }
        try {
            var d = F(), e = this.K;
            this.K = [];
            for (var f = e.length, c = 0; c < f; c++) {
                var g = e[c];
                fN();
                var k = g;
                k.B = !1;
                var l = k.C;
                k.C = [];
                for (var m = 0; m < l.length; ++m) {
                    var n = l[m], p = k.A[n.type][n.qualifier];
                    if (p && 0 < p.length)for (var r = m + 1 < l.length ? l[m + 1] : null, u = r && r.type == n.type && r.qualifier == n.qualifier && (null == r.event || null == n.event || r.event.type == n.event.type), t = 0; t < p.length; ++t) {
                        var v =
                            p[t];
                        u && v.A || v.gb(n.oa, n.event)
                    }
                    n.oa.done("scene-async-event-handler")
                }
            }
            this.C += F() - d;
            var y;
            if (this.na) gN(this, a), hN(this, a), y = Infinity; else if (this.ja)if (a - this.X < this.P - (6 + this.F)) y = a + this.P - 3; else {
                gN(this, a);
                hN(this, a);
                var D = F(), d = D - a;
                this.F *= .97;
                this.F += .03 * d;
                var z = Math.ceil(1 / dN * (this.F + 3 + 6)) * dN, z = z < dN ? dN : z;
                this.P = z = z > eN ? eN : z;
                y = iN(this, a, D)
            } else {
                gN(this, a);
                hN(this, a);
                var A = F();
                y = iN(this, a, A)
            }
            this.M = !1;
            for (b = 5; 0 <= b && aN(this, b, y); b--);
        } finally {
            this.H = !1, b = 0 < this.G.length || 0 < this.I.length || 0 < this.K.length,
                y = 0 < this.A[5].length || 0 < this.A[4].length || 0 < this.A[3].length || 0 < this.A[2].length || 0 < this.A[1].length || 0 < this.A[0].length, b ? bE(this.B) : y && BE(this.B), this.L && (this.O += F() - a), this.L = y || b, this.aa++
        }
    };
    function gN(a, b) {
        var c = F(), d = a.I;
        a.I = [];
        a.ea = b;
        for (var e = d.length, f = 0; f < e; f++) {
            var g = d[f];
            fN();
            g.C(b)
        }
        a.C += F() - c
    }

    function iN(a, b, c) {
        a = b + a.P - 3;
        c -= a;
        0 < c && (a += Math.ceil(c / dN) * dN);
        return a
    }

    function aN(a, b, c) {
        var d = F();
        if (a.M && F() >= c)return !1;
        var e = a.A[b];
        if (0 == e.length)return !0;
        for (var f = [], g = !1, k = 0; k < e.length && !g; k++) {
            var l = e[k];
            if (l)for (; ;) {
                var m = l.__maps_realtime_JobScheduler_next_step;
                if (!m || m == xj)break;
                m = F();
                if (a.M && m >= c) {
                    g = !0;
                    f.push(k);
                    break
                }
                fN();
                m = xj;
                try {
                    m = l.__maps_realtime_JobScheduler_next_step()
                } finally {
                    l.__maps_realtime_JobScheduler_next_step = m, a.M = !0
                }
                if (m == xj)break
            }
        }
        a.$ += F() - d;
        d = [];
        for (m = 0; m < f.length; m++)if (l = e[f[m]]) {
            var n = l.__maps_realtime_JobScheduler_next_step;
            n && n !=
            xj && d.push(l)
        }
        if (g)return a.A[b] = d.concat(e.slice(k - 1)), !1;
        a.A[b] = d;
        return F() < c
    }

    function hN(a, b) {
        var c = F(), d = b - a.X;
        if (a.L) {
            var e = 1E3 / d;
            d > zj && a.ia++;
            a.D *= .7;
            a.D += .3 * e;
            a.J *= .7;
            a.J += .3 * e * e;
            a.fa++;
            a.N += d;
            a.Y += a.O;
            a.O = 0
        }
        a.X = b;
        b = a.G;
        a.G = [];
        d = b.length;
        for (e = 0; e < d; e++) {
            var f = b[e];
            fN();
            f.H()
        }
        a.C += F() - c
    }

    function AE(a) {
        if (0 < a.G.length || 0 < a.I.length || 0 < a.K.length)return !0;
        if (!x(1))return !1;
        for (var b = jq(1, !1); 5 >= b; b++)if (a.A[b].length)return !0;
        return !1
    }

    function fN() {
        w.performance && w.performance.now ? w.performance.now() : F()
    }

    cN.prototype.za = C;
    function jN(a, b, c, d, e, f, g, k, l, m, n, p, r, u, t, v, y) {
        this.X = a;
        this.C = b;
        this.A = c;
        this.K = d || null;
        this.fa = e || null;
        this.F = f || null;
        this.O = g || null;
        this.J = k || null;
        this.P = l || null;
        this.ea = m || null;
        this.Y = n || null;
        this.U = p || null;
        this.I = r || null;
        this.B = u || null;
        this.L = t || null;
        this.N = v || null;
        this.M = y || null;
        this.H = new cN;
        this.G = kN();
        this.aa = new MC(this.G);
        this.$ = new PM(this.H);
        this.D = !(!cL() && (I("iPod") || I("iPhone") || I("Android") || I("IEMobile"))) && !cL()
    }

    function kN() {
        var a = new eL, b = To(), a = new FM(a, b);
        a.Sb("beforeunload", null, function (a) {
            Xo(Ro, "beforeunload", a)
        });
        return a
    }

    jN.prototype.getContext = h("A");
    function lN(a, b) {
        Hj || (Hj = new bL);
        Aj("CPNR", uq);
        Aj("CUTS", Vr);
        Aj("CUCS", it);
        Aj("CTS", ot);
        Aj("FPSC", nv);
        Aj("FPTS", hw);
        Aj("GCS", qx);
        Aj("HPNR", Dw);
        Aj("SCPI", Kz);
        Aj("PNI", Mz);
        Aj("SCPR", RD);
        Aj("SCW", zK);
        Aj("WPNR", aL);
        return new mN(a.A, b)
    };
    function nN(a) {
        a = Math.max(a, -90);
        return a = Math.min(a, 90)
    };
    function oN() {
    }

    function pN() {
    }

    oN = function (a, b) {
        if (!a)throw Error(b || "Precondition check failed on argument");
    };
    pN = function (a, b) {
        oN(typeof a == b, "Argument expected to be of type " + b)
    };
    function qN(a) {
        this.message = a;
        this.name = "InvalidValueError";
        this.stack = Error().stack
    }

    G(qN, Error);
    function rN(a, b) {
        var c = "";
        if (null != b) {
            if (!(b instanceof qN))return b;
            c = ": " + b.message
        }
        return new qN(a + c)
    };
    function sN(a, b, c) {
        this.heading = a;
        this.pitch = nN(b);
        this.zoom = Math.max(0, c)
    };
    function tN(a) {
        this.data = a || []
    }

    G(tN, J);
    function uN(a) {
        this.data = a || []
    }

    G(uN, J);
    function vN(a) {
        this.data = a || []
    }

    G(vN, J);
    function wN(a) {
        a.handled = !0;
        x(a.bubbles) || (a.returnValue = "handled")
    };
    var xN = "undefined" != typeof navigator && -1 != navigator.userAgent.toLowerCase().indexOf("msie"), yN = {};

    function zN(a, b) {
        a.__e3_ || (a.__e3_ = {});
        a = a.__e3_;
        a[b] || (a[b] = {});
        return a[b]
    }

    function AN(a, b, c, d) {
        oN(a);
        pN(c, "function");
        this.Ya = a;
        this.A = b;
        this.B = c;
        this.C = null;
        this.D = d;
        this.id = ++BN;
        zN(a, b)[this.id] = this;
        xN && "tagName" in a && (yN[this.id] = this)
    }

    var BN = 0;

    function CN(a) {
        return a.C = function (b) {
            b || (b = window.event);
            if (b && !b.target)try {
                b.target = b.srcElement
            } catch (d) {
            }
            var c;
            c = a.B.apply(a.Ya, [b]);
            return b && "click" == b.type && (b = b.srcElement) && "A" == b.tagName && "javascript:void(0)" == b.href ? !1 : c
        }
    }

    AN.prototype.remove = function () {
        if (this.Ya) {
            switch (this.D) {
                case 1:
                    this.Ya.removeEventListener(this.A, this.B, !1);
                    break;
                case 4:
                    this.Ya.removeEventListener(this.A, this.B, !0);
                    break;
                case 2:
                    this.Ya.detachEvent("on" + this.A, this.C);
                    break;
                case 3:
                    this.Ya["on" + this.A] = null
            }
            delete zN(this.Ya, this.A)[this.id];
            this.C = this.B = this.Ya = null;
            delete yN[this.id]
        }
    };
    function DN(a, b, c) {
        this.Ta = a;
        this.zb = b;
        this.A = c
    };
    function EN(a, b, c) {
        this.B = a;
        this.F = b;
        this.D = c;
        this.G = this.B.createTexture();
        this.L = this.K = 10497;
        this.J = 9986;
        this.I = 9729;
        this.C = 0;
        this.A = 3553;
        this.O = this.H = 0;
        this.M = !1;
        this.N = 34069
    }

    EN.prototype.bind = function () {
        3553 == this.A ? this.D.jc(this.C, this) : this.D.kc(this.C, this)
    };
    function FN(a, b) {
        a.K != b && (a.bind(), a.B.texParameteri(a.A, 10242, b), a.K = b)
    }

    function GN(a, b) {
        a.L != b && (a.bind(), a.B.texParameteri(a.A, 10243, b), a.L = b)
    }

    function HN(a, b) {
        a.J != b && (a.bind(), a.B.texParameteri(a.A, 10241, b), a.J = b)
    }

    function IN(a, b) {
        a.I != b && (a.bind(), a.B.texParameteri(a.A, 10240, b), a.I = b)
    }

    EN.prototype.deleteTexture = function () {
        for (var a = this.F.jb(), b = 0; b <= this.D.ig(); ++b)this.C != b && (this.C = b), 3553 == this.A ? this.D.B[this.C] == this && this.D.jc(this.C, null) : this.D.C[this.C] == this && this.D.kc(this.C, null);
        this.M = !0;
        this.B.deleteTexture(this.G);
        this.F.Ub(a)
    };
    EN.prototype.W = h("H");
    EN.prototype.generateMipmap = function () {
        if (34067 == this.A)for (var a = 0; 6 > a; ++a);
        this.bind();
        this.B.generateMipmap(this.A)
    };
    function IK(a, b, c, d, e) {
        JN(a, b.width, b.height, c, d, e);
        var f = KN(a);
        a.bind();
        LN(a, b.width, c, d);
        a.B.texImage2D(f, e, c, c, d, b);
        a.F.Ab(3317)
    }

    function JN(a, b, c, d, e, f) {
        0 != f || b == a.H && c == a.O && d == a.P && e == a.U || (a.H = b, a.O = c)
    }

    function KN(a) {
        return 34067 == a.A ? a.N : a.A
    }

    var MN = {6408: 4, 6407: 3, 6410: 2, 6409: 1, 6406: 1}, NN = {5121: 1, 5126: 4, 32819: 2, 33635: 2, 32820: 2};

    function LN(a, b, c, d) {
        b *= (5121 == d || 5126 == d ? MN[c] : 1) * NN[d];
        0 != b % 4 && (c = 1, 0 == b % 2 && (c = 2), a.F.hb(3317, c))
    };
    function ON() {
        this.H = this.G = this.F = this.D = void 0;
        this.B = [];
        this.C = []
    }

    q = ON.prototype;
    q.clear = function () {
        this.vf();
        this.If();
        this.Jf();
        this.Of();
        for (var a = 31; 0 <= a; --a)this.Rf(a), this.Sf(a)
    };
    q.apply = function (a) {
        void 0 !== a.D && a.D !== this.D && this.fd(a.D);
        void 0 !== a.F && a.F !== this.F && this.ud(a.F);
        void 0 !== a.G && a.G !== this.G && this.vd(a.G);
        void 0 !== a.H && a.H !== this.H && this.Ad(a.H);
        for (var b = 31; 0 <= b; --b)void 0 !== a.B[b] && a.B[b] !== this.B[b] && this.jc(b, a.B[b]), void 0 !== a.C[b] && a.C[b] !== this.C[b] && this.kc(b, a.C[b])
    };
    q.ig = da(32);
    q.fd = ba("D");
    q.vf = function () {
        this.D = void 0
    };
    q.ud = ba("F");
    q.If = function () {
        this.F = void 0
    };
    q.vd = ba("G");
    q.Jf = function () {
        this.G = void 0
    };
    q.Ad = ba("H");
    q.Of = function () {
        this.H = void 0
    };
    q.jc = function (a, b) {
        this.B[a] = b
    };
    q.Rf = function (a) {
        delete this.B[a]
    };
    q.kc = function (a, b) {
        this.C[a] = b
    };
    q.Sf = function (a) {
        delete this.C[a]
    };
    function PN(a, b) {
        ON.call(this);
        this.A = a;
        this.J = Math.min(32, a.getParameter(35661));
        this.K = b;
        this.I = Ac || ec && !pc("536.3");
        a = this.A;
        this.A = null;
        this.clear();
        this.A = a
    }

    G(PN, ON);
    q = PN.prototype;
    q.fd = function (a) {
        if (this.I || this.D !== a) PN.V.fd.call(this, a), this.A && this.A.bindBuffer(34962, a)
    };
    q.vf = function () {
        this.fd(null)
    };
    q.ud = function (a) {
        if (this.I || this.F !== a) PN.V.ud.call(this, a), this.A && this.A.bindBuffer(34963, a)
    };
    q.If = function () {
        this.ud(null)
    };
    q.vd = function (a) {
        if (this.I || this.G !== a) PN.V.vd.call(this, a), this.A && this.A.bindFramebuffer(36160, a)
    };
    q.Jf = function () {
        this.vd(null)
    };
    q.Ad = function (a) {
        if (this.I || this.H !== a) PN.V.Ad.call(this, a), this.A && this.A.bindRenderbuffer(36161, a)
    };
    q.Of = function () {
        this.Ad(null)
    };
    q.jc = function (a, b) {
        a < this.J && this.K.Ub(33984 + a);
        if (this.I || this.B[a] !== b) PN.V.jc.call(this, a, b), this.A && (b ? this.A.bindTexture(3553, b.G) : this.A.bindTexture(3553, null))
    };
    q.Rf = function (a) {
        this.jc(a, null)
    };
    q.kc = function (a, b) {
        a < this.J && this.K.Ub(33984 + a);
        if (this.I || this.C[a] !== b) PN.V.kc.call(this, a, b), this.A && (b ? this.A.bindTexture(34067, b.G) : this.A.bindTexture(34067, null))
    };
    q.Sf = function (a) {
        this.kc(a, null)
    };
    q.ig = function () {
        return this.J - 1
    };
    function QN() {
        this.G = new ArrayBuffer(204);
        this.D = new Uint8Array(this.G);
        this.C = new Uint16Array(this.G);
        this.H = new Uint32Array(this.G);
        this.F = new Int32Array(this.G);
        this.B = new Float32Array(this.G);
        this.clear()
    }

    QN.prototype.clear = function () {
        this.qb(3042);
        this.qb(2884);
        this.qb(2929);
        this.qb(3024);
        this.qb(32823);
        this.qb(32926);
        this.qb(32928);
        this.qb(3089);
        this.qb(2960);
        this.xf();
        this.yf();
        this.zf();
        this.Ff();
        this.Pf();
        this.Af();
        this.Bf();
        this.Cf();
        this.Df();
        this.Gf();
        this.Hf();
        this.Qf();
        this.Kg();
        this.Ef();
        this.Kf();
        this.Mf();
        this.Nf();
        for (var a = 0; 32 > a; ++a)this.Tf(a);
        this.sf();
        this.Ab(3317);
        this.Ab(3333);
        this.Ab(37440);
        this.Ab(37441);
        this.Ab(37443);
        this.Lf(33170)
    };
    QN.prototype.apply = function (a) {
        RN(a, 3042) && SN(a, 3042) != SN(this, 3042) && this.La(3042, SN(a, 3042));
        RN(a, 2884) && SN(a, 2884) != SN(this, 2884) && this.La(2884, SN(a, 2884));
        RN(a, 2929) && SN(a, 2929) != SN(this, 2929) && this.La(2929, SN(a, 2929));
        RN(a, 3024) && SN(a, 3024) != SN(this, 3024) && this.La(3024, SN(a, 3024));
        RN(a, 32823) && SN(a, 32823) != SN(this, 32823) && this.La(32823, SN(a, 32823));
        RN(a, 32926) && SN(a, 32926) != SN(this, 32926) && this.La(32926, SN(a, 32926));
        RN(a, 32928) && SN(a, 32928) != SN(this, 32928) && this.La(32928, SN(a, 32928));
        RN(a, 3089) &&
        SN(a, 3089) != SN(this, 3089) && this.La(3089, SN(a, 3089));
        RN(a, 2960) && SN(a, 2960) != SN(this, 2960) && this.La(2960, SN(a, 2960));
        if (0 <= a.B[3]) {
            var b = a.B[3], c = a.B[4], d = a.B[5], e = a.B[6];
            this.B[3] == b && this.B[4] == c && this.B[5] == d && this.B[6] == e || this.hd(b, c, d, e)
        }
        65535 == a.C[14] || TN(this, !1) == TN(a, !1) && TN(this, !0) == TN(a, !0) || (b = TN(a, !1), c = TN(a, !0), c == b && (c = void 0), this.Cc(b, c));
        65535 != a.C[16] && (b = a.C[16], c = a.C[17], d = a.C[18], e = a.C[19], this.C[16] != b || this.C[17] != c || this.C[18] != d || this.C[19] != e) && (d == b && e == c && (e = d = void 0),
            this.Dc(b, c, d, e));
        65535 != a.C[20] && UN(a) != UN(this) && this.rd(UN(a));
        0 < a.D[48] && (b = a.B[11], c = 2 == a.D[48], this.B[11] == b && this.D[48] == (c ? 2 : 1) || this.Bd(b, c));
        0 <= a.B[13] && (b = a.B[13], c = a.B[14], d = a.B[15], e = a.B[16], this.B[13] == b && this.B[14] == c && this.B[15] == d && this.B[16] == e || this.jd(b, c, d, e));
        0 <= a.B[17] && VN(a) != VN(this) && this.kd(VN(a));
        1 == a.D[76] && WN(a) != WN(this) && this.ld(WN(a));
        0 < a.D[80] && (b = 2 == a.D[80], c = 2 == a.D[81], d = 2 == a.D[82], e = 2 == a.D[83], XN(this, b, c, d, e) || this.md(b, c, d, e));
        0 < a.D[84] && YN(a) != YN(this) && this.sd(YN(a));
        0 <= a.B[22] && (b = a.B[22], c = a.B[23], this.B[22] == b && this.B[23] == c || this.td(b, c));
        0 <= a.F[26] && (b = a.F[24], c = a.F[25], d = a.F[26], e = a.F[27], this.F[24] == b && this.F[25] == c && this.F[26] == d && this.F[27] == e || this.Cd(b, c, d, e));
        0 <= a.F[30] && (b = a.F[28], c = a.F[29], d = a.F[30], e = a.F[31], this.F[28] == b && this.F[29] == c && this.F[30] == d && this.F[31] == e || this.Dd(b, c, d, e));
        65535 != a.C[64] && ZN(a) != ZN(this) && this.qd(ZN(a));
        65535 != a.C[66] && $N(a) != $N(this) && this.wd($N(a));
        0 < a.B[34] && aO(a) != aO(this) && this.yd(aO(a));
        0 < a.D[148] && (b = a.B[35],
            c = a.B[36], 0 < this.D[148] && this.B[35] == b && this.B[36] == c || this.zd(b, c));
        for (b = 0; 32 > b; ++b)0 < a.D[152 + b] && bO(a, b) != bO(this, b) && this.Fc(b, bO(a, b));
        65535 != a.C[92] && a.jb() != this.jb() && this.Ub(a.jb());
        65535 != a.C[94 + cO[3317]] && dO(a, 3317) != dO(this, 3317) && this.hb(3317, dO(a, 3317));
        65535 != a.C[94 + cO[3333]] && dO(a, 3333) != dO(this, 3333) && this.hb(3333, dO(a, 3333));
        65535 != a.C[94 + cO[37440]] && dO(a, 37440) != dO(this, 37440) && this.hb(37440, dO(a, 37440));
        65535 != a.C[94 + cO[37441]] && dO(a, 37441) != dO(this, 37441) && this.hb(37441, dO(a,
            37441));
        65535 != a.C[94 + cO[37443]] && dO(a, 37443) != dO(this, 37443) && this.hb(37443, dO(a, 37443));
        65535 != a.C[100] && eO(a) != eO(this) && this.xd(33170, eO(a))
    };
    var fO = [];
    fO[3042] = 0;
    fO[2884] = 1;
    fO[2929] = 2;
    fO[3024] = 3;
    fO[32823] = 4;
    fO[32926] = 5;
    fO[32928] = 6;
    fO[3089] = 7;
    fO[2960] = 8;
    q = QN.prototype;
    q.La = function (a, b) {
        this.D[0 + fO[a]] = b ? 2 : 1
    };
    function SN(a, b) {
        a = a.D[0 + fO[b]];
        if (0 != a)return 2 == a
    }

    function RN(a, b) {
        return 0 < a.D[0 + fO[b]]
    }

    q.qb = function (a) {
        this.D[0 + fO[a]] = 0
    };
    q.hd = function (a, b, c, d) {
        this.B[3] = a;
        this.B[4] = b;
        this.B[5] = c;
        this.B[6] = d
    };
    q.xf = function () {
        this.B[3] = -1;
        this.B[4] = -1;
        this.B[5] = -1;
        this.B[6] = -1
    };
    q.Cc = function (a, b) {
        this.C[14] = a;
        this.C[15] = b || a
    };
    function TN(a, b) {
        a = b ? a.C[15] : a.C[14];
        if (65535 != a)return a
    }

    q.yf = function () {
        this.C[14] = 65535;
        this.C[15] = 65535
    };
    q.Dc = function (a, b, c, d) {
        this.C[16] = a;
        this.C[17] = b;
        this.C[18] = void 0 === c ? a : c;
        this.C[19] = void 0 === d ? b : d
    };
    q.zf = function () {
        this.C[16] = 65535;
        this.C[17] = 65535;
        this.C[18] = 65535;
        this.C[19] = 65535
    };
    q.rd = function (a) {
        this.C[20] = a
    };
    function UN(a) {
        a = a.C[20];
        if (65535 != a)return a
    }

    q.Ff = function () {
        this.C[20] = 65535
    };
    q.Bd = function (a, b) {
        this.B[11] = a;
        this.D[48] = b ? 2 : 1
    };
    q.Pf = function () {
        this.D[48] = 0
    };
    q.jd = function (a, b, c, d) {
        this.B[13] = a;
        this.B[14] = b;
        this.B[15] = c;
        this.B[16] = d
    };
    q.Af = function () {
        this.B[13] = -1;
        this.B[14] = -1;
        this.B[15] = -1;
        this.B[16] = -1
    };
    q.kd = function (a) {
        this.B[17] = a
    };
    function VN(a) {
        a = a.B[17];
        if (!(0 > a))return a
    }

    q.Bf = function () {
        this.B[17] = -1
    };
    q.ld = function (a) {
        this.H[18] = a;
        this.D[76] = 1
    };
    function WN(a) {
        if (1 == a.D[76])return a.H[18]
    }

    q.Cf = function () {
        this.D[76] = 0
    };
    q.md = function (a, b, c, d) {
        this.D[80] = a ? 2 : 1;
        this.D[81] = b ? 2 : 1;
        this.D[82] = c ? 2 : 1;
        this.D[83] = d ? 2 : 1
    };
    q.Df = function () {
        this.D[80] = 0;
        this.D[81] = 0;
        this.D[82] = 0;
        this.D[83] = 0
    };
    function XN(a, b, c, d, e) {
        return a.D[80] == (b ? 2 : 1) && a.D[81] == (c ? 2 : 1) && a.D[82] == (d ? 2 : 1) && a.D[83] == (e ? 2 : 1)
    }

    q.sd = function (a) {
        this.D[84] = a ? 2 : 1
    };
    function YN(a) {
        a = a.D[84];
        if (0 != a)return 2 == a
    }

    q.Gf = function () {
        this.D[84] = 0
    };
    q.td = function (a, b) {
        this.B[22] = a;
        this.B[23] = b
    };
    q.Hf = function () {
        this.B[22] = -1;
        this.B[23] = -1
    };
    q.Cd = function (a, b, c, d) {
        this.F[24] = a;
        this.F[25] = b;
        this.F[26] = c;
        this.F[27] = d
    };
    q.Qf = function () {
        this.F[26] = -1;
        this.F[27] = -1
    };
    q.Dd = function (a, b, c, d) {
        this.F[28] = a;
        this.F[29] = b;
        this.F[30] = c;
        this.F[31] = d
    };
    q.Kg = function () {
        this.F[30] = -1;
        this.F[31] = -1
    };
    q.qd = function (a) {
        this.C[64] = a
    };
    function ZN(a) {
        a = a.C[64];
        if (65535 != a)return a
    }

    q.Ef = function () {
        this.C[64] = 65535
    };
    q.wd = function (a) {
        this.C[66] = a
    };
    function $N(a) {
        a = a.C[66];
        if (65535 != a)return a
    }

    q.Kf = function () {
        this.C[66] = 65535
    };
    q.yd = function (a) {
        this.B[34] = a
    };
    function aO(a) {
        a = a.B[34];
        if (!(0 > a))return a
    }

    q.Mf = function () {
        this.B[34] = -1
    };
    q.zd = function (a, b) {
        this.B[35] = a;
        this.B[36] = b;
        this.D[148] = 1
    };
    q.Nf = function () {
        this.D[148] = 0
    };
    q.Fc = function (a, b) {
        this.D[152 + a] = b ? 2 : 1
    };
    function bO(a, b) {
        a = a.D[152 + b];
        if (0 != a)return 2 == a
    }

    q.Tf = function (a) {
        this.D[152 + a] = 0
    };
    q.Ub = function (a) {
        this.C[92] = a
    };
    q.jb = function () {
        var a = this.C[92];
        if (65535 != a)return a
    };
    q.sf = function () {
        this.C[92] = 65535
    };
    var cO = [];
    cO[3317] = 0;
    cO[3333] = 1;
    cO[37440] = 2;
    cO[37441] = 3;
    cO[37443] = 4;
    QN.prototype.hb = function (a, b) {
        this.C[94 + cO[a]] = b
    };
    function dO(a, b) {
        a = a.C[94 + cO[b]];
        if (65535 != a)return a
    }

    QN.prototype.Ab = function (a) {
        this.C[94 + cO[a]] = 65535
    };
    QN.prototype.xd = function (a, b) {
        this.C[100] = b
    };
    function eO(a) {
        a = a.C[100];
        if (65535 != a)return a
    }

    QN.prototype.Lf = function () {
        this.C[100] = 65535
    };
    function gO(a) {
        this.A = a;
        a.scissor(0, 0, 0, 0);
        a.viewport(0, 0, 0, 0);
        a.enableVertexAttribArray(0);
        a = this.A;
        this.A = null;
        QN.call(this);
        this.A = a
    }

    G(gO, QN);
    q = gO.prototype;
    q.La = function (a, b) {
        if (SN(this, a) != b) {
            gO.V.La.call(this, a, b);
            var c = this.A;
            c && (b ? c.enable(a) : c.disable(a))
        }
    };
    q.qb = function (a) {
        3024 == a ? this.La(a, !0) : this.La(a, !1)
    };
    q.hd = function (a, b, c, d) {
        if (this.B[3] != a || this.B[4] != b || this.B[5] != c || this.B[6] != d) {
            gO.V.hd.call(this, a, b, c, d);
            var e = this.A;
            e && e.blendColor(a, b, c, d)
        }
    };
    q.xf = function () {
        this.hd(0, 0, 0, 0)
    };
    q.Cc = function (a, b) {
        var c = void 0 === b ? a : b;
        if (TN(this, !1) != a || TN(this, !0) != c) gO.V.Cc.call(this, a, b), (b = this.A) && (c == a ? b.blendEquation(a) : b.blendEquationSeparate(a, c))
    };
    q.yf = function () {
        this.Cc(32774)
    };
    q.Dc = function (a, b, c, d) {
        var e = void 0 === c ? a : c, f = void 0 === d ? b : d;
        if (this.C[16] != a || this.C[17] != b || this.C[18] != e || this.C[19] != f) gO.V.Dc.call(this, a, b, c, d), (c = this.A) && (e == a && f == b ? c.blendFunc(a, b) : c.blendFuncSeparate(a, b, e, f))
    };
    q.zf = function () {
        this.Dc(1, 0)
    };
    q.rd = function (a) {
        if (UN(this) != a) {
            gO.V.rd.call(this, a);
            var b = this.A;
            b && b.depthFunc(a)
        }
    };
    q.Ff = function () {
        this.rd(513)
    };
    q.Bd = function (a, b) {
        if (this.B[11] != a || this.D[48] != (b ? 2 : 1)) {
            gO.V.Bd.call(this, a, b);
            var c = this.A;
            c && c.sampleCoverage(a, b)
        }
    };
    q.Pf = function () {
        this.Bd(1, !1)
    };
    q.jd = function (a, b, c, d) {
        if (this.B[13] != a || this.B[14] != b || this.B[15] != c || this.B[16] != d) {
            gO.V.jd.call(this, a, b, c, d);
            var e = this.A;
            e && e.clearColor(a, b, c, d)
        }
    };
    q.Af = function () {
        this.jd(0, 0, 0, 0)
    };
    q.kd = function (a) {
        if (VN(this) != a) {
            gO.V.kd.call(this, a);
            var b = this.A;
            b && b.clearDepth(a)
        }
    };
    q.Bf = function () {
        this.kd(1)
    };
    q.ld = function (a) {
        if (WN(this) != a) {
            gO.V.ld.call(this, a);
            var b = this.A;
            b && b.clearStencil(a)
        }
    };
    q.Cf = function () {
        this.ld(0)
    };
    q.md = function (a, b, c, d) {
        if (!XN(this, a, b, c, d)) {
            gO.V.md.call(this, a, b, c, d);
            var e = this.A;
            e && e.colorMask(a, b, c, d)
        }
    };
    q.Df = function () {
        this.md(!0, !0, !0, !0)
    };
    q.sd = function (a) {
        if (YN(this) != a) {
            gO.V.sd.call(this, a);
            var b = this.A;
            b && b.depthMask(a)
        }
    };
    q.Gf = function () {
        this.sd(!0)
    };
    q.td = function (a, b) {
        if (this.B[22] != a || this.B[23] != b) {
            gO.V.td.call(this, a, b);
            var c = this.A;
            c && c.depthRange(a, b)
        }
    };
    q.Hf = function () {
        this.td(0, 1)
    };
    q.Cd = function (a, b, c, d) {
        if (this.F[24] != a || this.F[25] != b || this.F[26] != c || this.F[27] != d) {
            gO.V.Cd.call(this, a, b, c, d);
            var e = this.A;
            e && e.scissor(a, b, c, d)
        }
    };
    q.Qf = function () {
        this.Cd(0, 0, 0, 0)
    };
    q.Dd = function (a, b, c, d) {
        if (this.F[28] != a || this.F[29] != b || this.F[30] != c || this.F[31] != d) {
            gO.V.Dd.call(this, a, b, c, d);
            var e = this.A;
            e && e.viewport(a, b, c, d)
        }
    };
    q.Kg = function () {
        this.Dd(0, 0, 0, 0)
    };
    q.qd = function (a) {
        if (ZN(this) != a) {
            gO.V.qd.call(this, a);
            var b = this.A;
            b && b.cullFace(a)
        }
    };
    q.Ef = function () {
        this.qd(1029)
    };
    q.wd = function (a) {
        if ($N(this) != a) {
            gO.V.wd.call(this, a);
            var b = this.A;
            b && b.frontFace(a)
        }
    };
    q.Kf = function () {
        this.wd(2305)
    };
    q.yd = function (a) {
        if (aO(this) != a) {
            gO.V.yd.call(this, a);
            var b = this.A;
            b && b.lineWidth(a)
        }
    };
    q.Mf = function () {
        this.yd(1)
    };
    q.zd = function (a, b) {
        if (!(0 < this.D[148]) || this.B[35] != a || this.B[36] != b) {
            gO.V.zd.call(this, a, b);
            var c = this.A;
            c && c.polygonOffset(a, b)
        }
    };
    q.Nf = function () {
        this.zd(0, 0)
    };
    q.Fc = function (a, b) {
        if (bO(this, a) != b) {
            gO.V.Fc.call(this, a, b);
            var c = this.A;
            c && (b ? c.enableVertexAttribArray(a) : c.disableVertexAttribArray(a))
        }
    };
    q.Tf = function (a) {
        this.Fc(a, !1)
    };
    q.jb = function () {
        return gO.V.jb.call(this)
    };
    q.Ub = function (a) {
        if (this.jb() != a) {
            QN.prototype.Ub.call(this, a);
            var b = this.A;
            b && b.activeTexture(a)
        }
    };
    q.sf = function () {
        this.Ub(33984)
    };
    q.hb = function (a, b) {
        if (dO(this, a) != b) {
            gO.V.hb.call(this, a, b);
            var c = this.A;
            c && c.pixelStorei(a, b)
        }
    };
    q.Ab = function (a) {
        switch (a) {
            case 3317:
            case 3333:
                this.hb(a, 4);
                break;
            case 37440:
            case 37441:
                this.hb(a, 0);
                break;
            default:
                this.hb(a, 37444)
        }
    };
    q.xd = function (a, b) {
        if (eO(this) != b) {
            gO.V.xd.call(this, a, b);
            var c = this.A;
            c && c.hint(a, b)
        }
    };
    q.Lf = function (a) {
        this.xd(a, 4352)
    };
    function hO(a, b, c) {
        this.B = new Oz;
        this.A = a;
        this.J = this.N = 0;
        this.M = 1;
        this.I = this.U = this.H = this.P = 0;
        this.D = [];
        this.G = [];
        this.F = [];
        this.X = E(this.Be, this, this.G);
        this.O = E(this.Be, this, this.D);
        E(this.Be, this, this.F);
        iO(this);
        var d = this;
        jK(function (a) {
            d.M = a ? 1 : .5;
            iO(d)
        }, c, b)
    }

    G(hO, hA);
    q = hO.prototype;
    q.ga = function () {
        this.clear();
        jO(this);
        hO.V.ga.call(this)
    };
    q.contains = function (a) {
        return this.B.contains(a)
    };
    function cA(a, b) {
        a = a.B;
        (b = a.D[b]) && b.A && ((b.A.next = b.next) ? b.next.A = b.A : a.F = b.A, b.A = null, b.next = a.B, a.B.A = b, a.B = b)
    }

    q.clear = function () {
        this.B.clear()
    };
    q.remove = function (a) {
        this.B.remove(a)
    };
    function NK(a, b, c) {
        return a.B.add(b, a.X, c, 1)
    }

    function aA(a, b, c) {
        return a.B.add(null, b, c, void 0)
    }

    q.Aa = function (a) {
        return this.B.get(a)
    };
    q.createTexture = function (a) {
        var b = this.A, c = b.createTexture();
        b.bindTexture(3553, c);
        b.texParameteri(3553, 10241, a);
        b.texParameteri(3553, 10240, a);
        b.texParameteri(3553, 10242, 33071);
        b.texParameteri(3553, 10243, 33071);
        return NK(this, c, 0)
    };
    function iO(a) {
        var b = 100 * (.75 * a.J + .25 * a.N), b = Math.max(48E6, b * a.M), c = Math.max(200, .002 * a.J * a.M);
        a.P = .1 * b;
        a.U = .1 * c;
        a = a.B;
        a.C[0] = x(b) ? b : a.C[0];
        a.C[1] = x(c) ? c : a.C[1];
        Qz(a)
    }

    q.Be = function (a, b, c) {
        var d = this.B.D[b];
        this.H += d && d.B;
        b = this.B.D[b];
        this.I += b && b.C;
        a.push(c);
        (this.H >= this.P || this.I >= this.U) && jO(this)
    };
    function jO(a) {
        for (var b = 0; b < a.D.length; b++)a.A.deleteBuffer(a.D[b]);
        for (b = 0; b < a.G.length; b++)a.A.deleteTexture(a.G[b]);
        for (b = 0; b < a.F.length; b++)a.A.deleteRenderbuffer(a.F[b]);
        a.H = 0;
        a.I = 0;
        a.D.splice(0, a.D.length);
        a.G.splice(0, a.G.length);
        a.F.splice(0, a.F.length)
    };
    function kO(a) {
        Ha.call(this, a)
    }

    G(kO, Ha);
    kO.prototype.name = "LostContextError";
    function lO(a, b) {
        this.F = a.createProgram();
        this.B = a;
        this.L = b;
        this.I = [];
        this.K = !1;
        this.C = !0;
        this.D = [];
        this.J = [];
        this.A = [];
        this.G = {};
        this.H = {}
    }

    q = lO.prototype;
    q.xb = function () {
        this.L.D != this && (this.L.D = this, this.B.useProgram(this.F))
    };
    q.attachShader = function (a) {
        this.I.push(a);
        this.B.attachShader(this.F, a)
    };
    q.detachShader = function (a) {
        tb(this.I, a);
        this.B.detachShader(this.F, a)
    };
    q.getAttachedShaders = h("I");
    q.bindAttribLocation = function (a, b) {
        this.B.bindAttribLocation(this.F, a, b);
        this.H[b] = a
    };
    q.getAttribLocation = function (a) {
        var b = this.H[a];
        void 0 === b && (b = this.B.getAttribLocation(this.F, a), this.H[a] = b);
        return b
    };
    q.deleteProgram = function () {
        this.B.deleteProgram(this.F);
        this.K = !0
    };
    q.getParameter = function (a) {
        return this.B.getProgramParameter(this.F, a)
    };
    q.gg = function () {
        return this.B.getProgramInfoLog(this.F)
    };
    q.Jg = function () {
        return !this.K && this.B.isProgram(this.F)
    };
    q.de = function () {
        this.B.linkProgram(this.F);
        this.C = !1
    };
    function mO(a) {
        a.C = !0;
        a.H = {};
        a.D = [];
        a.A = [];
        a.G = {};
        for (var b = a.B.getProgramParameter(a.F, 35718), c = 0, d, e = 0; e < b; ++e) {
            var f = a.B.getActiveUniform(a.F, e);
            if (0 <= f.name.indexOf("[")) {
                var g = f.name.substr(0, f.name.indexOf("[")), k = f.size;
                a.G[g] = c;
                for (var l = 0; l < k; ++l) {
                    d = c++;
                    var m = g + "[" + l + "]";
                    a.G[m] = d;
                    a.J[d] = k - l;
                    a.D[d] = a.B.getUniformLocation(a.F, m);
                    a.A[d] = nO(f.type)
                }
            } else d = c++, a.G[f.name] = d, a.J[d] = 0, a.D[d] = a.B.getUniformLocation(a.F, f.name), a.A[d] = nO(f.type)
        }
    }

    q.Qh = function () {
        this.B.validateProgram(this.F)
    };
    q.getActiveAttrib = function (a) {
        return this.B.getActiveAttrib(this.F, a)
    };
    q.getActiveUniform = function (a) {
        return this.B.getActiveUniform(this.F, a)
    };
    q.getUniform = function (a) {
        this.C || mO(this);
        return -1 == a ? null : this.A[a]
    };
    q.getUniformLocation = function (a) {
        this.C || mO(this);
        return void 0 !== this.G[a] ? this.G[a] : -1
    };
    q.uh = function (a, b) {
        this.C || mO(this);
        var c = this.D, d = this.A, e = this.B;
        -1 != a && b != d[a] && (d[a] = b, e.uniform1f(c[a], b))
    };
    q.yh = function (a, b, c) {
        this.C || mO(this);
        var d = this.D, e = this.A, f = this.B;
        -1 != a && (e = e[a], b != e[0] || c != e[1]) && (e[0] = b, e[1] = c, f.uniform2f(d[a], b, c))
    };
    q.Ch = function (a, b, c, d) {
        this.C || mO(this);
        var e = this.D, f = this.A, g = this.B;
        -1 != a && (f = f[a], b != f[0] || c != f[1] || d != f[2]) && (f[0] = b, f[1] = c, f[2] = d, g.uniform3f(e[a], b, c, d))
    };
    q.Gh = function (a, b, c, d, e) {
        this.C || mO(this);
        var f = this.D, g = this.A, k = this.B;
        -1 != a && (g = g[a], b != g[0] || c != g[1] || d != g[2] || e != g[3]) && (g[0] = b, g[1] = c, g[2] = d, g[3] = e, k.uniform4f(f[a], b, c, d, e))
    };
    q.wh = function (a, b) {
        this.C || mO(this);
        var c = this.D, d = this.A, e = this.B;
        if (-1 != a) {
            var f = b;
            "boolean" == typeof d[a] && (f = !!b);
            f != d[a] && (d[a] = f, e.uniform1i(c[a], b))
        }
    };
    q.Ah = function (a, b, c) {
        this.C || mO(this);
        var d = this.D, e = this.A, f = this.B;
        if (-1 != a) {
            var e = e[a], g = b, k = c;
            e instanceof Array && (g = !!b, k = !!c);
            if (g != e[0] || k != e[1]) e[0] = g, e[1] = k, f.uniform2i(d[a], b, c)
        }
    };
    q.Eh = function (a, b, c, d) {
        this.C || mO(this);
        var e = this.D, f = this.A, g = this.B;
        if (-1 != a) {
            var f = f[a], k = b, l = c, m = d;
            f instanceof Array && (k = !!b, l = !!c, m = !!d);
            if (k != f[0] || l != f[1] || m != f[2]) f[0] = k, f[1] = l, f[2] = m, g.uniform3i(e[a], b, c, d)
        }
    };
    q.Ih = function (a, b, c, d, e) {
        this.C || mO(this);
        var f = this.D, g = this.A, k = this.B;
        if (-1 != a) {
            var g = g[a], l = b, m = c, n = d, p = e;
            g instanceof Array && (l = !!b, m = !!c, n = !!d, p = !!e);
            if (l != g[0] || m != g[1] || n != g[2] || p != g[3]) g[0] = l, g[1] = m, g[2] = n, g[3] = p, k.uniform4i(f[a], b, c, d, e)
        }
    };
    q.vh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = !1, d;
            for (d = 0; !c && d < b.length; ++d)c = b[d] != this.A[a + d];
            if (c) {
                for (d = 0; d < b.length; ++d)this.A[a + d] = b[d];
                this.B.uniform1fv(this.D[a], b)
            }
        }
    };
    q.zh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = !1, d;
            for (d = 0; !c && d < b.length / 2; ++d)c = b[2 * d] != this.A[a + d][0] || b[2 * d + 1] != this.A[a + d][1];
            if (c) {
                for (d = 0; d < b.length / 2; ++d)this.A[a + d][0] = b[2 * d], this.A[a + d][1] = b[2 * d + 1];
                this.B.uniform2fv(this.D[a], b)
            }
        }
    };
    q.Dh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = !1, d;
            for (d = 0; !c && d < b.length / 3; ++d)c = b[3 * d] != this.A[a + d][0] || b[3 * d + 1] != this.A[a + d][1] || b[3 * d + 2] != this.A[a + d][2];
            if (c) {
                for (d = 0; d < b.length / 3; ++d)this.A[a + d][0] = b[3 * d], this.A[a + d][1] = b[3 * d + 1], this.A[a + d][2] = b[3 * d + 2];
                this.B.uniform3fv(this.D[a], b)
            }
        }
    };
    q.Hh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = !1, d;
            for (d = 0; !c && d < b.length / 4; ++d)c = b[4 * d] != this.A[a + d][0] || b[4 * d + 1] != this.A[a + d][1] || b[4 * d + 2] != this.A[a + d][2] || b[4 * d + 3] != this.A[a + d][3];
            if (c) {
                for (d = 0; d < b.length / 4; ++d)this.A[a + d][0] = b[4 * d], this.A[a + d][1] = b[4 * d + 1], this.A[a + d][2] = b[4 * d + 2], this.A[a + d][3] = b[4 * d + 3];
                this.B.uniform4fv(this.D[a], b)
            }
        }
    };
    q.xh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = "boolean" == typeof this.A[a], d = !1, e;
            for (e = 0; !d && e < b.length; ++e)d = (c ? !!b[e] : b[e]) != this.A[a + e];
            if (d) {
                for (e = 0; e < b.length; ++e)this.A[a + e] = c ? !!b[e] : b[e];
                this.B.uniform1iv(this.D[a], b)
            }
        }
    };
    q.Bh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = this.A[a] instanceof Array, d = !1, e;
            for (e = 0; !d && e < b.length / 2; ++e)d = c ? !!b[2 * e + 1] : b[2 * e + 1], d = (c ? !!b[2 * e] : b[2 * e]) != this.A[a + e][0] || d != this.A[a + e][1];
            if (d) {
                for (e = 0; e < b.length / 2; ++e)this.A[a + e][0] = c ? !!b[2 * e] : b[2 * e], this.A[a + e][1] = c ? !!b[2 * e + 1] : b[2 * e + 1];
                this.B.uniform2iv(this.D[a], b)
            }
        }
    };
    q.Fh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = this.A[a] instanceof Array, d = !1, e;
            for (e = 0; !d && e < b.length / 3; ++e)var d = c ? !!b[3 * e + 1] : b[3 * e + 1], f = c ? !!b[3 * e + 2] : b[3 * e + 2], d = (c ? !!b[3 * e] : b[3 * e]) != this.A[a + e][0] || d != this.A[a + e][1] || f != this.A[a + e][2];
            if (d) {
                for (e = 0; e < b.length / 3; ++e)this.A[a + e][0] = c ? !!b[3 * e] : b[3 * e], this.A[a + e][1] = c ? !!b[3 * e + 1] : b[3 * e + 1], this.A[a + e][2] = c ? !!b[3 * e + 2] : b[3 * e + 2];
                this.B.uniform3iv(this.D[a], b)
            }
        }
    };
    q.Jh = function (a, b) {
        this.C || mO(this);
        if (-1 != a) {
            var c = this.A[a] instanceof Array, d = !1, e;
            for (e = 0; !d && e < b.length / 4; ++e)var d = c ? !!b[4 * e + 1] : b[4 * e + 1], f = c ? !!b[4 * e + 2] : b[4 * e + 2], g = c ? !!b[4 * e + 3] : b[4 * e + 3], d = (c ? !!b[4 * e] : b[4 * e]) != this.A[a + e][0] || d != this.A[a + e][1] || f != this.A[a + e][2] || g != this.A[a + e][3];
            if (d) {
                for (e = 0; e < b.length / 4; ++e)this.A[a + e][0] = c ? !!b[4 * e] : b[4 * e], this.A[a + e][1] = c ? !!b[4 * e + 1] : b[4 * e + 1], this.A[a + e][2] = c ? !!b[4 * e + 2] : b[4 * e + 2], this.A[a + e][3] = c ? !!b[4 * e + 3] : b[4 * e + 3];
                this.B.uniform4iv(this.D[a], b)
            }
        }
    };
    q.Kh = function (a, b, c) {
        this.C || mO(this);
        if (-1 != a) {
            b = !1;
            var d;
            for (d = 0; !b && d < c.length / 4; ++d)b = c[4 * d] != this.A[a + d][0] || c[4 * d + 1] != this.A[a + d][1] || c[4 * d + 2] != this.A[a + d][2] || c[4 * d + 3] != this.A[a + d][3];
            if (b) {
                for (d = 0; d < c.length / 4; ++d)this.A[a + d][0] = c[4 * d], this.A[a + d][1] = c[4 * d + 1], this.A[a + d][2] = c[4 * d + 2], this.A[a + d][3] = c[4 * d + 3];
                this.B.uniformMatrix2fv(this.D[a], !1, c)
            }
        }
    };
    q.Lh = function (a, b, c) {
        this.C || mO(this);
        if (-1 != a) {
            var d = !1, e;
            for (b = 0; !d && b < c.length / 9; ++b)d = 9 * b, e = this.A[a + b], d = c[d] != e[0] || c[d + 1] != e[1] || c[d + 2] != e[2] || c[d + 3] != e[3] || c[d + 4] != e[4] || c[d + 5] != e[5] || c[d + 6] != e[6] || c[d + 7] != e[7] || c[d + 8] != e[8];
            if (d) {
                for (b = 0; b < c.length / 9; ++b) {
                    e = this.A[a + b];
                    for (var d = 9 * b, f = 0; 9 > f; ++f)e[f] = c[d + f]
                }
                this.B.uniformMatrix3fv(this.D[a], !1, c)
            }
        }
    };
    q.Mh = function (a, b, c) {
        this.C || mO(this);
        if (-1 != a) {
            var d = !1, e;
            for (b = 0; !d && b < c.length / 16; ++b)d = 16 * b, e = this.A[a + b], d = c[d] != e[0] || c[d + 1] != e[1] || c[d + 2] != e[2] || c[d + 3] != e[3] || c[d + 4] != e[4] || c[d + 5] != e[5] || c[d + 6] != e[6] || c[d + 7] != e[7] || c[d + 8] != e[8] || c[d + 9] != e[9] || c[d + 10] != e[10] || c[d + 11] != e[11] || c[d + 12] != e[12] || c[d + 13] != e[13] || c[d + 14] != e[14] || c[d + 15] != e[15];
            if (d) {
                for (b = 0; b < c.length / 16; ++b) {
                    e = this.A[a + b];
                    for (var d = 16 * b, f = 0; 16 > f; ++f)e[f] = c[d + f]
                }
                this.B.uniformMatrix4fv(this.D[a], !1, c)
            }
        }
    };
    function nO(a) {
        switch (a) {
            case 35670:
                return !1;
            case 5124:
            case 5126:
            case 35678:
            case 35680:
                return 0;
            case 35664:
                return new Float32Array(2);
            case 35667:
                return new Int32Array(2);
            case 35671:
                return [!1, !1];
            case 35665:
                return new Float32Array(3);
            case 35668:
                return new Int32Array(3);
            case 35672:
                return [!1, !1, !1];
            case 35666:
                return new Float32Array(4);
            case 35669:
                return new Int32Array(4);
            case 35673:
                return [!1, !1, !1, !1];
            case 35674:
                return new Float32Array(4);
            case 35675:
                return new Float32Array(9);
            case 35676:
                return new Float32Array(16)
        }
        return null
    }
    ;
    function oO(a, b) {
        ol.call(this);
        this.va = pO++;
        this.C = a;
        this.A = b;
        this.state = new gO(this.A);
        this.F = new PN(this.A, this.state);
        this.L = new vq(this);
        Ik(this, Fa(Jk, this.L));
        this.B = new hO(this, void 0, this.L);
        Ik(this, Fa(Jk, this.B));
        this.D = null;
        this.H = this.J = this.G = void 0;
        this.getParameter(3379);
        this.getParameter(34076);
        this.I = void 0;
        xq(this.L, a, "webglcontextlost", this.Ik, !1, this);
        xq(this.L, a, "webglcontextrestored", this.Pk, !1, this);
        qO(this)
    }

    G(oO, ol);
    var pO = 0;
    q = oO.prototype;
    q.sa = h("va");
    q.ga = function () {
        this.D = null;
        this.A.useProgram(null);
        oO.V.ga.call(this)
    };
    function qO(a) {
        var b = (a.A.drawingBufferWidth || a.C.A.width) * (a.A.drawingBufferHeight || a.C.A.height), c = a.C.C;
        a = a.B;
        c = b / (c * c);
        if (b != a.N || c != a.J) a.N = b, a.J = c, iO(a)
    }

    function JK(a, b) {
        var c = a.state.jb() - 33984;
        3553 == b ? (a = a.F.B[c], 3553 != a.A && (a.A = 3553)) : (a = a.F.C[c], 34067 != a.A && (a.A = 34067), 34067 != b && (a.N = b));
        return a
    }

    function KK(a, b, c, d, e, f, g, k) {
        a = JK(a, b);
        JN(a, d, e, f, g, c);
        b = KN(a);
        a.bind();
        LN(a, d, f, g);
        a.B.texImage2D(b, c, f, d, e, 0, f, g, k);
        a.F.Ab(3317)
    }

    q.texImage2D = function (a, b, c, d, e, f, g, k, l) {
        g ? KK(this, a, b, d, e, g, k, l) : IK(JK(this, a), f, d, e, b)
    };
    q.texSubImage2D = function (a, b, c, d, e, f, g, k, l) {
        if (k) {
            a = JK(this, a);
            var m = KN(a);
            a.bind();
            a.B.texSubImage2D(m, b, c, d, e, f, g, k, l)
        } else k = JK(this, a), l = KN(k), k.bind(), LN(k, g.width, e, f), k.B.texSubImage2D(l, b, c, d, e, f, g), k.F.Ab(3317)
    };
    q.compressedTexImage2D = function (a, b, c, d, e, f, g) {
        a = JK(this, a);
        JN(a, d, e, c, 0, b);
        f = KN(a);
        a.bind();
        a.B.compressedTexImage2D(f, b, c, d, e, 0, g)
    };
    q.compressedTexSubImage2D = function (a, b, c, d, e, f, g, k) {
        a = JK(this, a);
        var l = KN(a);
        a.bind();
        a.B.compressedTexSubImage2D(l, b, c, d, e, f, g, k)
    };
    q.activeTexture = function (a) {
        this.state.Ub(a)
    };
    q.blendColor = function (a, b, c, d) {
        this.state.hd(a, b, c, d)
    };
    q.blendEquation = function (a) {
        this.state.Cc(a)
    };
    q.blendEquationSeparate = function (a, b) {
        this.state.Cc(a, b)
    };
    q.blendFunc = function (a, b) {
        this.state.Dc(a, b)
    };
    q.blendFuncSeparate = function (a, b, c, d) {
        this.state.Dc(a, b, c, d)
    };
    q.clearColor = function (a, b, c, d) {
        this.state.jd(a, b, c, d)
    };
    q.clearDepth = function (a) {
        this.state.kd(a)
    };
    q.clearStencil = function (a) {
        this.state.ld(a)
    };
    q.colorMask = function (a, b, c, d) {
        this.state.md(a, b, c, d)
    };
    q.cullFace = function (a) {
        this.state.qd(a)
    };
    q.depthFunc = function (a) {
        this.state.rd(a)
    };
    q.depthMask = function (a) {
        this.state.sd(a)
    };
    q.depthRange = function (a, b) {
        this.state.td(a, b)
    };
    q.disable = function (a) {
        this.state.La(a, !1)
    };
    q.disableVertexAttribArray = function (a) {
        this.state.Fc(a, !1)
    };
    q.enable = function (a) {
        this.state.La(a, !0)
    };
    q.enableVertexAttribArray = function (a) {
        this.state.Fc(a, !0)
    };
    q.frontFace = function (a) {
        this.state.wd(a)
    };
    q.hint = function (a, b) {
        this.state.xd(a, b)
    };
    q.isEnabled = function (a) {
        return SN(this.state, a)
    };
    q.lineWidth = function (a) {
        this.state.yd(a)
    };
    q.pixelStorei = function (a, b) {
        this.state.hb(a, b)
    };
    q.polygonOffset = function (a, b) {
        this.state.zd(a, b)
    };
    q.sampleCoverage = function (a, b) {
        this.state.Bd(a, b)
    };
    q.scissor = function (a, b, c, d) {
        this.state.Cd(a, b, c, d)
    };
    q.stencilFunc = function (a, b, c) {
        this.A.stencilFunc(a, b, c)
    };
    q.stencilMask = function (a) {
        this.A.stencilMask(a)
    };
    q.stencilOp = function (a, b, c) {
        this.A.stencilOp(a, b, c)
    };
    q.viewport = function (a, b, c, d) {
        qO(this);
        this.state.Dd(a, b, c, d)
    };
    q.bindBuffer = function (a, b) {
        34962 == a ? this.F.fd(b) : this.F.ud(b)
    };
    q.bindFramebuffer = function (a, b) {
        this.F.vd(b)
    };
    q.bindRenderbuffer = function (a, b) {
        this.F.Ad(b)
    };
    q.bindTexture = function (a, b) {
        var c = this.state.jb() - 33984;
        b && (b.A != a && (b.A = a), b.C != c && (b.C = c));
        3553 == a ? this.F.jc(c, b) : this.F.kc(c, b)
    };
    q.attachShader = function (a, b) {
        a.attachShader && a.attachShader(b)
    };
    q.bindAttribLocation = function (a, b, c) {
        a.bindAttribLocation && a.bindAttribLocation(b, c)
    };
    q.createProgram = function () {
        return new lO(this.A, this)
    };
    q.deleteProgram = function (a) {
        a.deleteProgram && a.deleteProgram()
    };
    q.detachShader = function (a, b) {
        a.detachShader && a.detachShader(b)
    };
    q.getActiveAttrib = function (a, b) {
        return a.getActiveAttrib ? a.getActiveAttrib(b) : null
    };
    q.getActiveUniform = function (a, b) {
        return a.getActiveUniform ? a.getActiveUniform(b) : null
    };
    q.getAttachedShaders = function (a) {
        return a.getAttachedShaders ? a.getAttachedShaders() : []
    };
    q.getAttribLocation = function (a, b) {
        return a.getAttribLocation ? a.getAttribLocation(b) : -1
    };
    q.getProgramParameter = function (a, b) {
        return a.getParameter ? a.getParameter(b) : -1
    };
    q.getProgramInfoLog = function (a) {
        return a.gg ? a.gg() : ""
    };
    q.getUniform = function (a, b) {
        return a.getUniform ? a.getUniform(b) : null
    };
    q.getUniformLocation = function (a, b) {
        return a.getUniformLocation ? a.getUniformLocation(b) : -1
    };
    q.isProgram = function (a) {
        return a.Jg ? a.Jg() : !1
    };
    q.linkProgram = function (a) {
        a.de && a.de()
    };
    q.uniform1f = function (a, b) {
        var c = this.D;
        c && c.uh && c.uh(a, b)
    };
    q.uniform1fv = function (a, b) {
        var c = this.D;
        c && c.vh && c.vh(a, b)
    };
    q.uniform1i = function (a, b) {
        var c = this.D;
        c && c.wh && c.wh(a, b)
    };
    q.uniform1iv = function (a, b) {
        var c = this.D;
        c && c.xh && c.xh(a, b)
    };
    q.uniform2f = function (a, b, c) {
        var d = this.D;
        d && d.yh && d.yh(a, b, c)
    };
    q.uniform2fv = function (a, b) {
        var c = this.D;
        c && c.zh && c.zh(a, b)
    };
    q.uniform2i = function (a, b, c) {
        var d = this.D;
        d && d.Ah && d.Ah(a, b, c)
    };
    q.uniform2iv = function (a, b) {
        var c = this.D;
        c && c.Bh && c.Bh(a, b)
    };
    q.uniform3f = function (a, b, c, d) {
        var e = this.D;
        e && e.Ch && e.Ch(a, b, c, d)
    };
    q.uniform3fv = function (a, b) {
        var c = this.D;
        c && c.Dh && c.Dh(a, b)
    };
    q.uniform3i = function (a, b, c, d) {
        var e = this.D;
        e && e.Eh && e.Eh(a, b, c, d)
    };
    q.uniform3iv = function (a, b) {
        var c = this.D;
        c && c.Fh && c.Fh(a, b)
    };
    q.uniform4f = function (a, b, c, d, e) {
        var f = this.D;
        f && f.Gh && f.Gh(a, b, c, d, e)
    };
    q.uniform4fv = function (a, b) {
        var c = this.D;
        c && c.Hh && c.Hh(a, b)
    };
    q.uniform4i = function (a, b, c, d, e) {
        var f = this.D;
        f && f.Ih && f.Ih(a, b, c, d, e)
    };
    q.uniform4iv = function (a, b) {
        var c = this.D;
        c && c.Jh && c.Jh(a, b)
    };
    q.uniformMatrix2fv = function (a, b, c) {
        (b = this.D) && b.Kh && b.Kh(a, 0, c)
    };
    q.uniformMatrix3fv = function (a, b, c) {
        (b = this.D) && b.Lh && b.Lh(a, 0, c)
    };
    q.uniformMatrix4fv = function (a, b, c) {
        (b = this.D) && b.Mh && b.Mh(a, 0, c)
    };
    q.useProgram = function (a) {
        a.xb && a.xb()
    };
    q.validateProgram = function (a) {
        a.Qh && a.Qh()
    };
    q.getContextAttributes = function () {
        return this.A.getContextAttributes()
    };
    q.isContextLost = function () {
        return this.A.isContextLost()
    };
    q.getSupportedExtensions = function () {
        var a = this.A.getSupportedExtensions();
        if (!a && this.isContextLost())throw new kO("getSupportedExtensions");
        return a
    };
    q.getExtension = function (a) {
        return this.A.getExtension(a)
    };
    var rO = ["WEBGL_compressed_texture_s3tc", "WEBKIT_WEBGL_compressed_texture_s3tc", "MOZ_WEBGL_compressed_texture_s3tc"];

    function sO(a) {
        if (x(a.G))return !!a.G;
        if (zc && !pc(30))for (var b = a.getSupportedExtensions(), c = rO, d = 0; d < b.length; d++)for (var e = 0; e < c.length; e++) {
            if (b[d] == c[e] && (a.G = a.getExtension(c[e]), a.G))return !0
        } else for (c = rO, e = 0; e < c.length; e++)if (a.G = a.getExtension(c[e]), a.G)return !0;
        a.G = null;
        return !1
    }

    q = oO.prototype;
    q.bufferData = function (a, b, c) {
        this.A.bufferData(a, b, c)
    };
    q.bufferSubData = function (a, b, c) {
        this.A.bufferSubData(a, b, c)
    };
    q.checkFramebufferStatus = function (a) {
        return this.A.checkFramebufferStatus(a)
    };
    q.clear = function (a) {
        this.A.clear(a)
    };
    q.compileShader = function (a) {
        this.A.compileShader(a)
    };
    q.copyTexImage2D = function (a, b, c, d, e, f, g) {
        a = JK(this, a);
        JN(a, f, g, c, 5121, b);
        var k = KN(a);
        a.bind();
        a.B.copyTexImage2D(k, b, c, d, e, f, g, 0)
    };
    q.copyTexSubImage2D = function (a, b, c, d, e, f, g, k) {
        a = JK(this, a);
        var l = KN(a);
        a.bind();
        a.B.copyTexSubImage2D(l, b, c, d, e, f, g, k)
    };
    q.createBuffer = function () {
        return this.A.createBuffer()
    };
    q.createFramebuffer = function () {
        return this.A.createFramebuffer()
    };
    q.createRenderbuffer = function () {
        return this.A.createRenderbuffer()
    };
    q.createShader = function (a) {
        return this.A.createShader(a)
    };
    q.createTexture = function () {
        return new EN(this.A, this.state, this.F)
    };
    q.deleteBuffer = function (a) {
        this.A.deleteBuffer(a)
    };
    q.deleteFramebuffer = function (a) {
        this.A.deleteFramebuffer(a)
    };
    q.deleteRenderbuffer = function (a) {
        this.A.deleteRenderbuffer(a)
    };
    q.deleteShader = function (a) {
        this.A.deleteShader(a)
    };
    q.deleteTexture = function (a) {
        a && a.deleteTexture()
    };
    q.drawArrays = function (a, b, c) {
        this.A.drawArrays(a, b, c)
    };
    q.drawElements = function (a, b, c, d) {
        this.A.drawElements(a, b, c, d)
    };
    q.finish = function () {
        this.A.finish()
    };
    q.flush = function () {
        this.A.flush()
    };
    q.framebufferRenderbuffer = function (a, b, c, d) {
        this.A.framebufferRenderbuffer(a, b, c, d)
    };
    q.framebufferTexture2D = function (a, b, c, d, e) {
        this.A.framebufferTexture2D(a, b, c, d.G, e)
    };
    q.generateMipmap = function (a) {
        JK(this, a).generateMipmap()
    };
    q.getBufferParameter = function (a, b) {
        a = this.A.getBufferParameter(a, b);
        if (null === a && this.isContextLost())throw new kO("getBufferParameter");
        return a
    };
    q.getParameter = function (a) {
        switch (a) {
            case 32873:
                return this.F.B[this.state.jb() - 33984];
            case 34068:
                return this.F.C[this.state.jb() - 33984];
            case 35725:
                return this.D
        }
        a = this.A.getParameter(a);
        if (null === a && this.isContextLost())throw new kO("getParameter");
        return a
    };
    q.getError = function () {
        return this.A.getError()
    };
    q.getFramebufferAttachmentParameter = function (a, b, c) {
        a = this.A.getFramebufferAttachmentParameter(a, b, c);
        if (null === a && this.isContextLost())throw new kO("getFramebufferAttachmentParameter");
        return a
    };
    q.getRenderbufferParameter = function (a, b) {
        a = this.A.getRenderbufferParameter(a, b);
        if (null === a && this.isContextLost())throw new kO("getRenderbufferParameter");
        return a
    };
    q.getShaderParameter = function (a, b) {
        a = this.A.getShaderParameter(a, b);
        if (null === a && this.isContextLost())throw new kO("getShaderParameter");
        return a
    };
    q.getShaderInfoLog = function (a) {
        return this.A.getShaderInfoLog(a)
    };
    q.getShaderSource = function (a) {
        return this.A.getShaderSource(a)
    };
    q.getTexParameter = function (a, b) {
        a = JK(this, a);
        switch (b) {
            case 10241:
                return a.J;
            case 10240:
                return a.I;
            case 10242:
                return a.K;
            case 10243:
                return a.L
        }
        return 0
    };
    q.getVertexAttrib = function (a, b) {
        a = this.A.getVertexAttrib(a, b);
        if (null === a && this.isContextLost())throw new kO("getVertexAttrib");
        return a
    };
    q.getVertexAttribOffset = function (a, b) {
        return this.A.getVertexAttribOffset(a, b)
    };
    q.isBuffer = function (a) {
        return this.A.isBuffer(a)
    };
    q.isFramebuffer = function (a) {
        return this.A.isFramebuffer(a)
    };
    q.isRenderbuffer = function (a) {
        return this.A.isRenderbuffer(a)
    };
    q.isShader = function (a) {
        return this.A.isShader(a)
    };
    q.isTexture = function (a) {
        return !a.M && this.A.isTexture(a.G)
    };
    q.readPixels = function (a, b, c, d, e, f, g) {
        this.A.readPixels(a, b, c, d, e, f, g)
    };
    q.renderbufferStorage = function (a, b, c, d) {
        this.A.renderbufferStorage(a, b, c, d)
    };
    q.shaderSource = function (a, b) {
        this.A.shaderSource(a, b)
    };
    q.texParameterf = function (a, b, c) {
        a = JK(this, a);
        switch (b) {
            case 10241:
                HN(a, c);
                break;
            case 10240:
                IN(a, c);
                break;
            case 10242:
                FN(a, c);
                break;
            case 10243:
                GN(a, c)
        }
    };
    q.texParameteri = function (a, b, c) {
        a = JK(this, a);
        switch (b) {
            case 10241:
                HN(a, c);
                break;
            case 10240:
                IN(a, c);
                break;
            case 10242:
                FN(a, c);
                break;
            case 10243:
                GN(a, c)
        }
    };
    q.vertexAttrib1f = function (a, b) {
        this.A.vertexAttrib1f(a, b)
    };
    q.vertexAttrib1fv = function (a, b) {
        this.A.vertexAttrib1fv(a, b)
    };
    q.vertexAttrib2f = function (a, b, c) {
        this.A.vertexAttrib2f(a, b, c)
    };
    q.vertexAttrib2fv = function (a, b) {
        this.A.vertexAttrib2fv(a, b)
    };
    q.vertexAttrib3f = function (a, b, c, d) {
        this.A.vertexAttrib3f(a, b, c, d)
    };
    q.vertexAttrib3fv = function (a, b) {
        this.A.vertexAttrib3fv(a, b)
    };
    q.vertexAttrib4f = function (a, b, c, d, e) {
        this.A.vertexAttrib4f(a, b, c, d, e)
    };
    q.vertexAttrib4fv = function (a, b) {
        this.A.vertexAttrib4fv(a, b)
    };
    q.vertexAttribPointer = function (a, b, c, d, e, f) {
        this.A.vertexAttribPointer(a, b, c, d, e, f)
    };
    function tO(a) {
        a.B.clear();
        a.D = null;
        a.F.clear();
        a.state.clear()
    }

    q.Ik = function (a) {
        a.preventDefault();
        tO(this);
        F();
        this.dispatchEvent("webglcontextlost")
    };
    q.Pk = function () {
        tO(this);
        if (this.G && (this.G = void 0, !sO(this)))throw Error("Lost compressed textures extension.");
        if (this.J) {
            this.J = void 0;
            var a;
            if (x(this.J)) a = !!this.J; else {
                if (a = this.getExtension("OES_texture_float")) {
                    this.getExtension("OES_texture_float_linear");
                    this.getExtension("WEBGL_color_buffer_float");
                    for (var b = 0; 8 > b; ++b)this.disableVertexAttribArray(b);
                    this.disable(3089);
                    this.disable(2960);
                    this.disable(2929);
                    this.disable(3042);
                    this.disable(2884);
                    b = this.createShader(35633);
                    this.shaderSource(b,
                        "attribute vec4 vertexClip;\nvoid main() {\n  gl_Position = vec4(vertexClip.xy, 0.0, 1.0);\n}");
                    this.compileShader(b);
                    var c = this.createShader(35632);
                    this.shaderSource(c, "precision highp float;\nuniform sampler2D sampler;\nuniform float mode;\nvoid main() {\n  if (mode == 0.0) {\n    gl_FragColor = floor(gl_FragCoord.xyxy);\n  } else {\n    gl_FragColor = texture2D(sampler, vec2(0.5));\n  }\n}\n");
                    this.compileShader(c);
                    var d = this.createProgram();
                    d.attachShader(b);
                    d.attachShader(c);
                    d.de();
                    d.xb();
                    var e =
                        this.createBuffer();
                    this.bindBuffer(34962, e);
                    this.bufferData(34962, new Float32Array([-1, -1, 1, 1, 1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1]), 35044);
                    this.enableVertexAttribArray(d.getAttribLocation("vertexClip"));
                    this.vertexAttribPointer(d.getAttribLocation("vertexClip"), 4, 5126, !1, 0, 0);
                    this.activeTexture(33984);
                    var f = this.createTexture();
                    this.bindTexture(3553, f);
                    this.texParameteri(3553, 10241, 9729);
                    this.texParameteri(3553, 10240, 9729);
                    this.texParameteri(3553, 10242, 33071);
                    this.texParameteri(3553, 10243, 33071);
                    KK(this, 3553,
                        0, 2, 2, 6408, 5126, null);
                    this.bindTexture(3553, null);
                    var g = this.createFramebuffer();
                    this.bindFramebuffer(36160, g);
                    this.framebufferTexture2D(36160, 36064, 3553, f, 0);
                    this.uniform1f(d.getUniformLocation("mode"), 0);
                    this.uniform1i(d.getUniformLocation("sampler"), 0);
                    this.viewport(0, 0, 2, 2);
                    this.drawArrays(5, 0, 4);
                    this.bindFramebuffer(36160, null);
                    this.uniform1f(d.getUniformLocation("mode"), 1);
                    this.drawArrays(5, 0, 4);
                    var k = new Uint8Array([0, 0, 0, 0]);
                    this.readPixels(0, 0, 1, 1, 6408, 5121, k);
                    this.disableVertexAttribArray(d.getAttribLocation("vertexClip"));
                    this.deleteBuffer(e);
                    this.deleteTexture(f);
                    this.deleteFramebuffer(g);
                    this.detachShader(d, b);
                    this.deleteShader(b);
                    this.detachShader(d, c);
                    this.deleteShader(c);
                    this.deleteProgram(d);
                    if (2 < Math.abs(k[0] - 127) || 2 < Math.abs(k[1] - 127) || 2 < Math.abs(k[2] - 127)) a = null
                }
                this.J = a;
                a = !!a
            }
            if (!a)throw Error("Lost texture float extension.");
        }
        if (this.H && (this.H = void 0, x(this.H) || (this.H = this.getExtension("WEBGL_depth_texture")), !this.H))throw Error("Lost depth texture extension.");
        x(this.I) && (this.I = void 0, x(this.I) || (zc &&
        hc && !(0 <= db(lE, "30")) || tc && hc && !(0 <= db(lE, "27")) ? this.I = null : this.I = this.getExtension("ANGLE_instanced_arrays")));
        F();
        this.dispatchEvent("webglcontextrestored")
    };
    function uO(a, b) {
        b = oE(a.A, b || new jE);
        if (!b)throw Error("Could not find a 3d context, error: " + nE);
        return new oO(a, b)
    };
    function vO() {
    };
    function wO() {
        this.A = []
    }

    wO.prototype.handleEvent = function (a, b) {
        for (var c = this.A, d = 0, e = c.length; d < e; d++)c[d](a, b)
    };
    function xO() {
        this.C = this.A = null;
        this.B = []
    }

    var yO = new Ho(Qo());

    function zO(a, b, c) {
        var d = c ? c : new Ao(yO, "buff_pass_logger");
        b.get(function (b) {
            a.A = b;
            b = 0;
            for (var e = a.B.length; b < e; b++) {
                var g = a.B[b];
                g.Kk(a.A).apply(a.A, g.oc);
                g.oa && g.oa.done("bpl-branch")
            }
            a.B.length = 0;
            a.C = null;
            c || d.done("main-actionflow-branch")
        }, d)
    }

    function AO(a, b, c) {
        a.A ? b(a.A).apply(a.A, c) : (a.B.push({Kk: b, oc: c, oa: null}), a.C && zO(a, a.C))
    }

    xO.prototype.F = function (a, b, c, d, e, f, g) {
        AO(this, function (a) {
            return a.F
        }, arguments)
    };
    xO.prototype.G = function (a, b, c, d) {
        AO(this, function (a) {
            return a.G
        }, arguments)
    };
    xO.prototype.D = function (a, b, c) {
        AO(this, function (a) {
            return a.D
        }, arguments)
    };
    function BO(a) {
        this.data = a || []
    }

    G(BO, dh);
    ra(BO);
    function CO(a) {
        this.data = a || []
    }

    G(CO, J);
    CO.prototype.A = function () {
        return K(this, 89)
    };
    function DO() {
        this.A = {}
    }

    DO.prototype.load = function (a, b, c) {
        var d;
        0 === Xs(a) ? d = 0 : 3 === Xs(a) ? d = 3 : 1 === Xs(a) ? d = 1 : 2 === Xs(a) ? d = 2 : 5 === Xs(a) && (d = 5);
        this.A[d].load(a, b, c)
    };
    function EO(a) {
        this.data = a || []
    }

    G(EO, J);
    function FO(a, b, c, d, e, f) {
        V.call(this, "ANC", wb(arguments))
    }

    G(FO, V);
    function GO(a, b, c, d) {
        V.call(this, "CPW", wb(arguments))
    }

    G(GO, V);
    function HO() {
        this.B = this.canvas = null
    };
    function IO(a, b) {
        HO.call(this);
        this.A = a;
        this.canvas = b
    }

    G(IO, HO);
    IO.prototype.getContext = function (a, b) {
        a(this.A, b)
    };
    function JO(a, b, c, d, e, f) {
        V.call(this, "SCIR", wb(arguments))
    }

    G(JO, V);
    function KO(a, b, c, d, e) {
        V.call(this, "SCVR", wb(arguments))
    }

    G(KO, V);
    function LO(a, b, c, d, e, f, g) {
        this.D = a;
        this.B = b;
        this.G = c;
        this.A = new lK(d, void 0, nd(a, 55));
        this.F = e;
        this.H = f;
        this.I = g;
        this.C = {}
    }

    LO.prototype.load = function (a, b, c) {
        var d, e, f = this.C[a];
        f ? f.C(c, b) : ("pa" === a ? (b.ta("pard0"), d = "pard1", e = new Nz(this.A, this.B, this.D, this.G, this.F, this.H), f = E(function (a, b) {
                    this.I && Dy(a.$, this.I.A, b)
                }, this), e.C(f, b)) : "ph" === a ? (b.ta("phrd0"), d = "phrd1", e = new JO(this.A, this.B, this.D, this.G, this.F, this.H)) : "vd" === a && (b.ta("vdrd0"), d = "vdrd1", e = new KO(this.A, this.B, this.D, this.G, this.F)), this.C[a] = e, e.get(function (a, b) {
                b.ta(d);
                c(a, b)
            }, b));
        return new EC
    };
    function MO(a, b, c) {
        var d = a.C.pa;
        d ? d.B() ? b(d.A()) : d.C(function (a) {
                    b(a)
                }, c) : a.load("pa", c, function (a) {
                b(a)
            })
    };
    function NO(a, b, c, d, e, f) {
        this.F = a;
        this.I = b;
        this.H = c;
        this.G = d;
        this.D = e;
        this.B = this.A = null;
        this.C = f || C
    }

    NO.prototype.load = function (a, b, c) {
        if (this.A) b(this.A, c), this.C(this.A); else {
            var d = this;
            d.B || (d.B = new rx(d.H, d.F, d.I, this.G, d.D));
            d.B.get(function (a, c) {
                d.A = a;
                b(d.A, c);
                d.C(d.A)
            }, c)
        }
    };
    function OO(a, b, c, d) {
        V.call(this, "SCHI", wb(arguments))
    }

    G(OO, V);
    function PO(a, b, c, d) {
        this.B = a;
        this.D = b;
        this.C = c;
        this.F = d;
        this.A = null
    }

    PO.prototype.load = function (a, b, c) {
        this.A || (this.A = new OO(this.D, this.B, this.C, this.F));
        this.A.get(function (a, c) {
            b(a, c)
        }, c)
    };
    function QO(a, b, c) {
        V.call(this, "SCVI", wb(arguments))
    }

    G(QO, V);
    function RO(a, b, c) {
        this.B = a;
        this.D = b;
        this.C = c;
        this.A = null
    }

    RO.prototype.load = function (a, b, c) {
        this.A || (this.A = new QO(this.D, this.B, this.C));
        this.A.get(function (a, c) {
            b(a, c)
        }, c)
    };
    function SO(a, b, c, d, e, f, g, k, l) {
        V.call(this, "FP", wb(arguments))
    }

    G(SO, V);
    function TO(a, b, c, d, e) {
        V.call(this, "FLP", wb(arguments))
    }

    G(TO, V);
    function UO(a, b, c, d, e, f) {
        V.call(this, "IMW", wb(arguments))
    }

    G(UO, V);
    function VO(a, b, c, d, e, f, g, k) {
        V.call(this, "LB", wb(arguments))
    }

    G(VO, V);
    function WO(a, b, c, d, e, f, g, k, l) {
        V.call(this, "LOG", wb(arguments))
    }

    G(WO, V);
    function XO(a, b) {
        V.call(this, "VLG", wb(arguments))
    }

    G(XO, V);
    function YO(a) {
        this.D = a
    }

    YO.prototype.B = da(!0);
    YO.prototype.get = function (a, b) {
        a(this.D, b)
    };
    YO.prototype.A = h("D");
    YO.prototype.C = function (a, b) {
        this.get(a, b)
    };
    function ZO() {
    }

    ZO.prototype.report = C;
    ZO.prototype.F = C;
    ZO.prototype.G = function (a, b) {
        a && w.open(a, b)
    };
    ZO.prototype.D = C;
    function $O(a, b) {
        V.call(this, "OPH", wb(arguments))
    }

    G($O, V);
    function aP(a) {
        this.data = a || []
    }

    G(aP, J);
    aP.prototype.Ea = function () {
        return new Vs(this.data[0])
    };
    aP.prototype.ha = function () {
        return new eh(this.data[1])
    };
    function bP(a, b, c, d, e, f, g, k, l, m) {
        V.call(this, "RAP", wb(arguments))
    }

    G(bP, V);
    function cP() {
        this.left = this.bottom = this.right = this.top = 0;
        this.A = !0
    };
    function dP() {
        this.B = Iy(ZD);
        this.B.listen(this.C, this);
        this.A = Jy(LE)
    }

    dP.prototype.C = function (a) {
        var b = this.A.get();
        b || (b = new cP, this.A.set(b, a));
        b.top = 0;
        b.bottom = this.B.get() || 0;
        b.A = !0;
        b.left = 0;
        b.right = 0;
        Fy(this.A, a)
    };
    dP.prototype.bind = function (a, b) {
        Dy(this.B, a, b)
    };
    function eP(a, b, c, d) {
        V.call(this, "TTW", wb(arguments))
    }

    G(eP, V);
    function fP(a, b, c, d, e, f, g, k) {
        V.call(this, "TCW", wb(arguments))
    }

    G(fP, V);
    function gP(a) {
        return 2 === Xs(a) || 1 === Xs(a) || 3 === Xs(a) || 5 === Xs(a)
    }

    function hP(a) {
        switch (a) {
            case 1:
                return new Cx(1);
            case 3:
                return new Cx(3)
        }
        return new Cx(2)
    };
    function iP(a, b, c, d, e) {
        V.call(this, "VF", wb(arguments))
    }

    G(iP, V);
    function jP(a, b, c, d, e, f) {
        V.call(this, "VH", wb(arguments))
    }

    G(jP, V);
    function kP(a, b, c, d, e, f) {
        V.call(this, "ZMW", wb(arguments))
    }

    G(kP, V);
    function lP(a) {
        this.C = a ? a : window
    }

    lP.prototype.B = function (a) {
        var b = this.C;
        (b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || C).call(b, a)
    };
    lP.prototype.A = function () {
        var a = this.C;
        return a.animationStartTime || a.mozAnimationStartTime || a.webkitAnimationStartTime || a.osAnimationStartTime || a.msAnimationStartTime || F()
    };
    function mP(a) {
        this.F = a ? a : new lP;
        this.A = [];
        this.B = [];
        this.C = [];
        this.G = E(this.H, this);
        this.D = !1
    }

    function nP(a, b, c) {
        this.A = a;
        this.D = 1 / b;
        this.B = 0;
        this.G = c;
        this.C = 0;
        this.F = !1
    }

    function rz(a, b, c) {
        var d = x(void 0) ? void 0 : 1;
        0 < d && (c = new nP(b, c, d), c.B = a.F.A(), a.A.push(c), b.B(0), oP(a))
    }

    function oP(a) {
        a.D || (a.D = !0, a.F.B(a.G))
    }

    mP.prototype.H = function (a) {
        this.D = !1;
        var b = [], c = this.A;
        this.A = this.B;
        this.B = c;
        var d;
        for (d = 0; d < c.length; d++) {
            var e = c[d], f = (a - e.B) * e.D;
            1 <= f ? (e.A.B(1), e.C++, e.C >= e.G ? (b.push(d), e.F = !0) : (e.A.B(0), e.B = a)) : 0 < f && e.A.B(f)
        }
        a = b.length;
        e = c.length;
        for (d = a - 1; 0 <= d; d--)c[b[d]] = c[--e];
        c.length = e;
        a = this.C.length;
        for (d = 0; d < a; d++)for (b = this.C[d], f = e - 1; 0 <= f; f--)if (c[f].A == b.A) {
            c[f] = c[--e];
            break
        }
        c.length = e;
        for (d = this.C.length = 0; d < e; d++)this.A.push(c[d]);
        this.B.length = 0;
        0 < e && oP(this)
    };
    function pP(a) {
        this.D = a;
        this.C = C
    }

    pP.prototype.B = function (a) {
        this.C = a;
        a = this.D;
        a.I.push(this);
        bE(a.B)
    };
    pP.prototype.A = function () {
        var a = this.D;
        return a.H && a.L ? a.ea : F()
    };
    function mN(a, b, c) {
        ol.call(this);
        this.M = To();
        var d = new Ao(this.M, "application");
        this.ja = b;
        this.A = a;
        U(BO.hg(), new dh(a.data[5]));
        this.ia = b.X;
        this.Qb = b.P;
        var e = this.G = new xI, f = new EO;
        a = Zh(a);
        f.data[0] = K(a, 11) ? O(a, 11) : "//maps.gstatic.com";
        e = e.F;
        f = rG(f);
        e.add("g-3ZqzcwcZGCQ", f);
        this.D = b.H;
        this.F = b.G;
        this.P = b.$;
        this.aa = b.aa;
        f = Hy();
        this.width = Jy(f);
        this.height = Jy(f);
        this.Rb = !0;
        this.$ = Jy(f);
        this.Xe = Iy(Hy());
        a = Hy();
        this.L = Iy(a, !1);
        this.wc = Iy(a, !1);
        var e = new CO, g = this.A, k = Zh(g);
        e.data[0] = !0;
        e.data[76] = nd(ai(g),
            4, !0);
        var l;
        for (l = 0; l < Q(k, 3); ++l) {
            var m = qd(k, 3, l);
            pd(e, 13, m)
        }
        U(new bh(P(e, 16)), new bh(g.data[1]));
        e.data[64] = O(k, 8);
        e.data[75] = O(k, 10);
        e.data[78] = nd(ai(g), 7);
        for (l = 0; l < Q(k, 9); ++l)m = qd(k, 9, l), pd(e, 73, m);
        K(g, 14) && (e.data[86] = nd(g, 14));
        K(g, 15) && (e.data[87] = O(g, 15));
        K(g, 16) && U(new Se(P(e, 89)), new Se(g.data[16]));
        K(ai(g), 3) && (g = nd(ai(g), 3), e.data[88] = g, (new Qe(P(new Se(P(e, 89)), 1))).data[0] = g);
        k = b.getContext();
        k.Ta ? e.data[20] = 1 : k.zb ? e.data[20] = 2 : k.A && (e.data[20] = 3);
        e.data[81] = this.ia.id;
        e.data[82] = "viewport";
        this.Xa = Iy(a, nd(e, 2));
        this.za = new mP(new pP(this.D));
        l = bk("div");
        l.style.width = "100%";
        l.style.height = "100%";
        g = new mP(new pP(this.D));
        a = new IO(k, b.C);
        a.B = l;
        c || (nd(this.A, 9, !0) ? (c = new wO, this.F.Sb("visibilitychange", c, c.handleEvent), c = new WO(O(Zh(this.A), 0), this.F, new vO, c, this.P, !0, null, O(new ch(this.A.data[11]), 2), O(this.A, 6))) : c = new YO(new ZO));
        this.H = c;
        c = this.Y = new xO;
        k = this.H;
        c.B.length ? zO(c, k, d) : c.C = k;
        this.Db = new LO(e, a, this.P, this.D, this.Y, g, this.aa);
        this.Fb = null;
        this.I = {Nc: null, zoom: null};
        this.C =
            this.X = null;
        c = b.D;
        g = this.Db;
        k = this.Y;
        l = new DO;
        this.Fb = m = new NO(e, this.P, g, k, this.za, E(this.Sk, this));
        var n = this.ja.D;
        l.A[1] = m;
        l.A[2] = new PO(e, g, k, n);
        l.A[5] = new RO(e, g, k);
        this.Pe = new dP;
        this.B = new vK(this.ia, e, this.G, this.F, this.D, this.za, this.M, a, this.Y, C, C, l, this.Db, null);
        qP(this, d);
        nd(ai(this.A), 1, !0) && c && b.F && rP(this, b.F, d);
        nd(ai(this.A), 0, !0) && c && b.K && sP(this, b.K, d, b.fa || void 0);
        nd(ai(this.A), 0, !0) && c && b.J && tP(this, b.J, d);
        nd(ai(this.A), 0, !0) && c && b.I && uP(this, b.I, d);
        nd(ai(this.A), 0, !0) && c && b.B &&
        vP(this, b.B, d);
        this.U = null;
        (e = b.O) && wP(this, e, d);
        this.ea = Iy(Hy());
        e = Hy();
        a = new tl(1E3);
        this.Oe = Iy(e, a);
        xP(this, c ? null : b.Y, d);
        yP(this, c ? null : b.U, d);
        this.Ye = Iy(f);
        (f = b.ea) && zP(this, f, d);
        c && b.L && AP(this, b.L, d);
        this.Va = null;
        c && b.N && BP(this, b.N, d);
        nd(ai(this.A), 3) && (CP(this, c ? b.M : null, d), DP(this, d));
        b = Hy();
        this.J = Iy(b);
        this.J.listen(this.Dk, this);
        this.Da = Iy(b);
        this.Da.listen(this.Fk, this);
        this.Ua = !1;
        this.O = Iy(Hy());
        this.O.listen(this.Ek, this);
        this.na = null;
        this.fa = [];
        this.Ma = new IM;
        al(w, "resize", E(this.ce,
            this, d), !1, this);
        EP(this, d);
        this.ce(d);
        d.done("main-actionflow-branch")
    }

    G(mN, ol);
    q = mN.prototype;
    q.bind = function (a, b, c, d, e, f, g) {
        Dy(this.ea, a, g);
        Dy(this.$, b, g);
        Dy(this.width, c, g);
        Dy(this.height, d, g);
        Dy(this.Xe, e, g);
        Dy(this.L, f, g)
    };
    function EP(a, b) {
        a.B.C(function (b, d) {
            a.C = b;
            Dy(a.C.width, a.width, d);
            Dy(a.C.height, a.height, d);
            Dy(a.C.aa, a.Pe.A, d);
            Dy(a.J, a.C.S, d);
            Dy(a.Da, a.C.I, d);
            Dy(a.O, a.C.B, d);
            for (b = 0; b < a.fa.length; ++b)XE(a.C.F.get(), a.fa[b].oa, a.fa[b].ua);
            a.fa.length = 0;
            a.ce(d)
        }, b)
    }

    function qP(a, b) {
        if (nd(a.A, 9, !0)) {
            var c = new XO(O(Zh(a.A), 0), a.P);
            Dj([c, a.B], function (b) {
                var d = c.A(), f = a.B.A();
                d.bind(f.K, f.O, f.P, f.F, f.B, f.I, b)
            }, b);
            c.get(C, b)
        }
    }

    q.ha = function () {
        var a = this.C && this.C.S.get();
        a || (a = new eh);
        return a
    };
    q.view = function (a, b) {
        if (K(a, 0) || K(a, 1)) {
            var c = new Ao(this.M, "move_camera"), d = this;
            this.B.get(function (c, f) {
                d.C = c;
                FP(d, a, f, b)
            }, c);
            c.done("main-actionflow-branch")
        }
    };
    function FP(a, b, c, d) {
        if (a.Ua) JM(a.Ma, {view: b, oa: c}); else {
            K(b, 0) && (a.Ua = !0);
            var e = function () {
                d && d(c);
                K(b, 0) && (a.Ua = !1);
                if (!a.Ma.Pa()) {
                    var e = KM(a.Ma);
                    FP(a, e.view, e.oa)
                }
            };
            if (!K(b, 0) && K(b, 1)) {
                var f = a.C.S.get();
                if (f) {
                    var g = new eh;
                    U(g, f);
                    Bs(b.ha(), g);
                    YE(a.C.F.get(), g, a.O.get() || null, hP(L(b, 2, 2)), c, e)
                }
            } else gP(b.Ea()) && (f = new aP, U(f, b), (g = new eh(P(f, 1)), K(g, 2) && K(nh(g), 0)) || (uh(oh(g), a.width.get() || 1), wh(oh(g), a.height.get() || 1)), GP(a, f, c, e))
        }
    }

    q.Mb = function (a) {
        var b = this.Fb.A;
        b ? b.Mb(a) : this.I.Nc = a;
        this.X && this.X.Mb(a)
    };
    q.Sk = function (a) {
        null === this.I.Nc || a.Mb(this.I.Nc);
        null !== this.I.zoom && (a.fa = this.I.zoom);
        a.Rb = nd(ai(this.A), 2);
        this.I = {Nc: null, zoom: null}
    };
    function GP(a, b, c, d) {
        var e = new eh;
        U(e, b.ha());
        YE(a.C.F.get(), e, b.Ea(), hP(L(b, 2, 2)), c, d)
    }

    q.ce = function (a) {
        var b = "ga" === this.aa.get() ? this.Qb : this.ia, c = b.clientWidth, b = b.clientHeight;
        if (this.ja.C) {
            var d = this.ja.C, e = cC(this.ja.getContext()), f;
            f = window;
            f = x(f.devicePixelRatio) ? f.devicePixelRatio : f.matchMedia ? jk(3) || jk(2) || jk(1.5) || jk(1) || .75 : 1;
            dC(d, e, f, c, b)
        }
        this.width.set(c, a);
        this.height.set(b, a)
    };
    function wP(a, b, c) {
        a.U = new TO(a.G, a.F, "pano-floorpicker", a.D, b);
        Dj([a.U, a.B], function (b) {
            var c = a.U.A(), d = a.B.A(), g = Jy(new Gy);
            c.bind(a.height, Iy(YD), d.F, d.B, d.S, b);
            c.nn(g, b)
        }, c)
    }

    function rP(a, b, c) {
        var d = new SO(b, a.F, a.G, a.H, new bh(a.A.data[1]), a.D, O(new Xh(a.A.data[3]), 0), O(new Xh(a.A.data[3]), 1), !1);
        Ej([d, a.B], function () {
            var b = a.B.A();
            d.A().bind(b.K, b.A.fa, b.B, c)
        }, c)
    }

    function tP(a, b, c) {
        var d = new kP(b, a.G, a.F, a.D, a.H);
        Ej([d, a.B], function (b) {
            var c = d.A(), e = a.B.A();
            c.bind(e.S, e.ea, e.B, a.Xa, b)
        }, c)
    }

    function xP(a, b, c) {
        b && (new VO(a.G, a.A, a.ja, a.H, a.Y, a.za, a.aa, b)).get(function (b, c) {
            a.X = b;
            b.bind(a.ea, a.Oe, a.$, a.width, a.height, a.L, a.J, a.Ye, c);
            b.Hi(a.I.zoom);
            b.Mb(a.I.Nc)
        }, c)
    }

    function yP(a, b, c) {
        b && (new UO(a.G, a.F, a.D, a.aa, a.ia, b)).get(function (b, c) {
            b.bind(a.ea, a.$, a.O, a.L, a.J, c)
        }, c)
    }

    function zP(a, b, c) {
        var d = new bP(a.G, a.F, a.D, a.P, a.za, O(Zh(a.A), 13), O(a.A, 13), a.H, nd(ai(a.A), 9), b);
        d.C(function (b, c) {
            b.bind(a.L, a.ea, a.$, c)
        }, c);
        var e = a.L.listen(function () {
            var b = a.L.get();
            if (!x(b))throw Error("undefined in KVO getRequired");
            b && (d.get(C, c), e.Wb())
        })
    }

    function AP(a, b, c) {
        (new iP(b, a.F, a.G, a.H, a.D)).get(function (b, c) {
            b.bind(a.ea, a.$, c)
        }, c)
    }

    function BP(a, b, c) {
        a.Va = new jP(b, a.G, a.A, a.F, a.H, a.D);
        Ej([a.Va, a.B], function (b) {
            var c = a.Va.A(), d = a.B.A();
            c.bind(d.B, a.J, a.L, b)
        }, c)
    }

    function sP(a, b, c, d) {
        var e = new fP(b, a.G, a.F, function (b, d) {
            var e = d.Xb;
            a.H.get(function (a) {
                a.G(b, "_blank", e)
            }, c)
        }, a.D, a.P, d, void 0);
        Dj([e, a.B], function (b) {
            var c = e.A(), d = a.B.A();
            c.bind(d.B, d.I, b)
        }, c);
        e.get(function (a, b) {
            a.xb(b)
        }, c)
    }

    function uP(a, b, c) {
        var d = new eP(b, a.G, a.F, a.D);
        Ej([d, a.B], function (b) {
            var c = d.A(), e = a.B.A();
            c.bind(e.S, a.Xa, a.wc, e.X, e.B, b)
        }, c)
    }

    function vP(a, b, c) {
        var d = new GO(b, a.G, a.F, a.D);
        Ej([d, a.B], function (b) {
            var c = d.A(), e = a.B.A();
            c.bind(e.S, a.Xa, a.wc, e.X, e.B, b)
        }, c)
    }

    function CP(a, b, c) {
        b && (new FO(b, a.G, a.F, a.H, a.D, a.B)).get(function (b, c) {
            b.bind(a.Da, a.J, c)
        }, c)
    }

    function DP(a, b) {
        a.B.C(function (b, d) {
            (new $O(b.G, a.H)).get(function (c, d) {
                c.bind(a.J, a.O, b.F, d)
            }, d)
        }, b)
    }

    q.Dk = function () {
        var a = this.J.get();
        a || (a = new eh);
        this.dispatchEvent(new Kk("CameraChanged", a))
    };
    function HP(a, b) {
        var c = new Ao(a.M, "show_road_labels");
        a.Rb = b;
        MO(a.Db, function (b) {
            b.Y = a.Rb;
            Kx(b, c)
        }, c);
        c.done("main-actionflow-branch")
    }

    q.Fk = function () {
        var a = this.Da.get();
        a || (a = new eh);
        this.dispatchEvent(new Kk("StableCameraChanged", a))
    };
    q.Ek = function (a) {
        var b = this.O.get();
        if (b) {
            var c = Is(Ys(b).da());
            (O(b, 5) || c && Q(c, 7)) && this.U && this.U.get(C, a);
            a = Ys(b);
            this.na && a && Ph(this.na) == Ph(a) && Ms(this.na, a) || (this.na = new Mh(ud(a)), this.dispatchEvent(new Kk("PhotoChanged", a)))
        }
    };
    function IP(a, b, c) {
        c = c || new Ao(a.M, "wait_for_render");
        a.C ? XE(a.C.F.get(), c, b) : a.fa.push({oa: c, ua: c.ua(b, "viewer-wait-for-stable")})
    };
    function JP(a, b, c, d, e, f) {
        this.P = c;
        this.ea = d;
        var g = document.createElement("div");
        this.I = g;
        a.appendChild(g);
        g.style.height = g.style.width = "100%";
        a = document.createElement("canvas");
        c = new eE(a);
        var k = d = null;
        if ("html5" != e && "html4" != e)try {
            if ("webgl" == e) d = uO(c); else if ("webgl_debug" == e) {
                var l = new jE;
                l.B = !0;
                l.A = !0;
                d = uO(c, l)
            }
        } catch (p) {
        }
        this.L = !!d;
        d || "html4" == e || (k = a.getContext("2d"));
        e = new DN(d, k, g);
        e = new jN(g, c, e);
        this.N = l = new bi;
        l.A.data[14] = !0;
        b = new uN(b);
        c = {};
        for (k = 0; k < Q(b, 8); ++k)c[qd(b, 8, k)] = !0;
        d = new vN(b.data[24]);
        var k = O(d, 8), m = c[43] ? "maps_sv.tactile_lite" : "apiv3";
        l.A.data[15] = m;
        nd(new tN(b.data[2]), 15) || (k = k.replace("http:", "https:"));
        ci(l, k);
        for (var n = Q(d, 7), k = 0; k < n; ++k)di(l, qd(d, 7, k) + "?cb_client=" + m);
        m = Q(d, 10);
        for (k = 0; k < m; ++k)ei(l, qd(d, 10, k));
        fi(l, O(d, 4));
        gi(l, O(d, 6));
        (new Yh(P(l.A, 4))).data[2] = !0;
        hi(l, O(new tN(b.data[2]), 0));
        ii(l, O(new tN(b.data[2]), 1));
        l.A.data[9] = !1;
        ji(l, !!c[56]);
        this.A = lN(l, e);
        f && (b = new Ho({}), b = new Ao(b, "apiv3"), IP(this.A, function () {
            f()
        }, b));
        b = new vq;
        b.listen(this.A, "CameraChanged",
            E(this.$, this));
        b.listen(this.A, "PhotoChanged", E(this.aa, this));
        nb("touchstart touchmove touchend mousedown mousemove mouseup pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp click".split(" "), function (a) {
            var b;
            g.addEventListener ? (g.addEventListener(a, wN, void 0), new AN(g, a, wN, 1)) : g.attachEvent ? (b = new AN(g, a, wN, 2), g.attachEvent("on" + a, CN(b))) : (g["on" + a] = wN, new AN(g, a, wN, 3))
        });
        this.D = this.J = "";
        this.G = {};
        this.C = new sN(0, 0, 0);
        this.F = !1;
        this.H = a.height / a.width;
        this.B = !1
    }

    JP.prototype.K = function () {
        if (!this.F) {
            var a = new aP, b = new eh(P(a, 1)), c = !1, d = this.D;
            d && this.J != this.D && (this.G[d] && (a.data[2] = 3, kh(b).data[2] = this.G[d].lat, kh(b).data[1] = this.G[d].lng, sh(kh(b), 3)), c = new Vs(P(a, 0)), c.data[0] = 1, c = Zs(c), "F:" == d.substring(0, 2) ? (c.data[1] = 4, c.data[0] = d.substring(2)) : (c.data[1] = 0, c.data[0] = d), c = !0, this.J = d);
            this.C && (b.data[3] = Kb(2 * Math.atan(Math.pow(2, 1 - this.C.zoom) * this.H)), b = mh(b), b.data[0] = this.C.heading, b.data[1] = this.C.pitch + 90, c = !0);
            c && this.A.view(a)
        }
        this.B = !1
    };
    JP.prototype.$ = function (a) {
        this.B || (this.F = !0, a = a.target, this.C = new sN(th(lh(a)), M(lh(a), 1) - 90, 1 - Math.log(Math.tan(Jb(ih(a)) / 2) / this.H) / Math.log(2)), this.P(), this.F = !1)
    };
    JP.prototype.aa = function (a) {
        this.B || (this.F = !0, a = a.target, this.D = 4 == L(a, 1, 99) ? "F:" + a.sa() : a.sa(), this.ea(), this.J = 4 == L(a, 1, 99) ? "F:" + a.sa() : a.sa(), this.F = !1)
    };
    JP.prototype.M = function (a, b) {
        var c = this.A, d = "ga" === c.aa.get() ? c.Qb : c.ia;
        $n(d, a, b);
        d = new Ao(c.M, "resize");
        c.ce(d);
        d.done("main-actionflow-branch");
        this.H = b / a
    };
    JP.prototype.setSize = JP.prototype.M;
    JP.prototype.Mb = function (a) {
        this.A.Mb(a)
    };
    JP.prototype.enableClickToGo = JP.prototype.Mb;
    JP.prototype.O = function (a) {
        HP(this.A, a)
    };
    JP.prototype.showRoadLabels = JP.prototype.O;
    JP.prototype.U = function (a) {
        var b = this.A, c = b.Fb.A;
        c ? c.fa = a : b.I.zoom = a;
        b.X && b.X.Hi(a)
    };
    JP.prototype.enableScrollToZoom = JP.prototype.U;
    JP.prototype.fa = function (a, b) {
        if (this.L && a && !b) {
            var c = document.createElement("canvas");
            b = c.getContext("2d");
            this.I.textContent = "";
            c = new eE(c);
            b = new DN(null, b, this.I);
            b = new jN(this.I, c, b);
            this.A = lN(this.N, b);
            this.L = !1;
            this.K()
        }
        Rr = {
            Pg: E(function (b) {
                if (!a)return null;
                if (b = a(b)) {
                    var c = b.tiles.worldSize.width, d = b.tiles.worldSize.height, g = b.tiles.tileSize.width, k = b.tiles.tileSize.height, l = new Lg;
                    Xg(l).data[0] = 2;
                    Xg(l).data[1] = 2;
                    (new Od(P(Xg(l), 2))).data[0] = d;
                    (new Od(P(Xg(l), 2))).data[1] = c;
                    (new Od(P(new de(P(Xg(l),
                        3)), 1))).data[0] = k;
                    (new Od(P(new de(P(Xg(l), 3)), 1))).data[1] = g;
                    for (var m = [{
                        width: c,
                        height: d
                    }]; c > g || d > k;)c = c + 1 >> 1, d = d + 1 >> 1, m.push({width: c, height: d});
                    for (c = m.length - 1; 0 <= c; --c)d = new Od(P(new ee(rd(new de(P(Xg(l), 3)), 0)), 0)), d.data[1] = m[c].width, d.data[0] = m[c].height;
                    m = new xf(rd(l, 5));
                    (new yf(P(m, 0))).data[0] = 1;
                    m = new Vd(P(new Rd(P(m, 1)), 2));
                    m.data[0] = b.tiles.centerHeading;
                    m.data[1] = 90;
                    m.data[2] = 0;
                    b = l
                } else b = null;
                return b
            }, this), Wm: function (b, c, f, g) {
                return a(b).tiles.getTileUrl(b, c, f, g)
            }
        }
    };
    JP.prototype.registerPanoProvider = JP.prototype.fa;
    JP.prototype.Y = h("C");
    JP.prototype.getPov = JP.prototype.Y;
    JP.prototype.na = function (a) {
        this.C = a;
        this.B || (Jq(this.K, this), this.B = !0)
    };
    JP.prototype.setPov = JP.prototype.na;
    JP.prototype.X = h("D");
    JP.prototype.getPano = JP.prototype.X;
    JP.prototype.ja = function (a) {
        this.D = a;
        this.B || (Jq(this.K, this), this.B = !0)
    };
    JP.prototype.setPano = JP.prototype.ja;
    JP.prototype.ia = ba("G");
    JP.prototype.setNeighborLocation = JP.prototype.ia;
    Ga("google.maps.internal.iv", function (a, b, c, d, e, f) {
        return new JP(a, b, c, d, e, f)
    });
}).call(this);
google.maps.__gjsload__('imagery_viewer', function (_) {
    var $w = _.ma();
    $w.prototype.b = window.google.maps.internal && window.google.maps.internal.iv;
    delete window.google.maps.internal;
    _.Xc("imagery_viewer", new $w);
});
