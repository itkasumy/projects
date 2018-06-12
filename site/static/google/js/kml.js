google.maps.__gjsload__('kml', function (_) {
    var p4 = function (a) {
            this.data = a || []
        }, q4 = function (a) {
            this.data = a || []
        }, r4 = function (a) {
            this.data = a || []
        }, s4 = function (a) {
            this.data = a || []
        }, t4 = function (a) {
            this.data = a || []
        }, u4 = function (a) {
            this.data = a || []
        }, v4 = function (a) {
            this.data = a || []
        }, w4 = function (a) {
            this.data = a || []
        }, x4 = function (a) {
            this.data = a || []
        }, y4 = function (a) {
            this.data = a || []
        }, z4 = function (a) {
            this.data = a || []
        }, A4 = function (a) {
            this.data = a || []
        }, B4 = function (a) {
            this.data = a || []
        }, C4 = _.na("b"), D4 = function (a) {
            this.f = 0;
            this.b = [];
            this.j = a
        }, E4 = function () {
            _.gg.call(this)
        },
        F4 = function (a) {
            if (a.b) {
                var b;
                b = a.b.getCenter();
                var c = a.get("projection"), d = a.get("bounds"), e = a.get("zoom");
                b = c && d && _.jb(e) ? _.am(c, d, e, _.$h, b) : void 0;
                c = a.b;
                b = _.Xf(Math.max(c.I, b.I), Math.max(c.J, b.J), Math.min(c.L, b.L), Math.min(c.M, b.M));
                _.Dj(b, a.f) || (a.set("croppedBounds", b), a.f = b)
            }
        }, G4 = function (a, b) {
            return {
                b: function (b, d) {
                    if (d)return null;
                    var c = null, f = b.latLng;
                    a.forEach(function (a) {
                        if (!c) {
                            var b = a.get("bounds");
                            b && b.contains(f) && 0 != a.get("clickable") && (c = a)
                        }
                    });
                    return c
                }, handleEvent: function (a, d, e) {
                    "mouseover" ==
                    a ? b.set("cursor", "pointer") : "mouseout" == a && b.set("cursor", null);
                    _.x.trigger(e, a, new _.lm(d.latLng, d.za))
                }, zIndex: 10
            }
        }, H4 = function (a, b) {
            _.gg.call(this);
            this.f = a;
            this.b = b
        }, I4 = function (a) {
            a.b.forEach(function (a) {
                a.pl = !0
            })
        }, J4 = function (a, b) {
            var c = a.get("projection");
            a = a.get("zoom");
            return _.Wk(c, new _.G(0, b), a).lat()
        }, K4 = function (a, b, c) {
            _.gg.call(this);
            this.l = a;
            this.j = b;
            this.b = c;
            this.f = null;
            this.m = {scale: !0};
            _.x.addListener(c, "insert", (0, _.p)(this.Tj, this));
            _.x.addListener(c, "remove", (0, _.p)(this.Dh,
                this))
        }, L4 = function (a) {
            a = a.get("opacity");
            return _.hb(a, 1)
        }, M4 = function (a, b, c, d) {
            this.b = _.p(_.Im, null, a, b, d + "/maps/api/js/KmlOverlayService.GetFeature", c)
        }, N4 = function (a, b) {
            return 0 == _.Mj(a, 1) ? _.M(a, 0) * b : 2 == _.Mj(a, 1) ? b - _.M(a, 0) : _.M(a, 0)
        }, O4 = function (a, b, c) {
            return 2 == _.Mj(a, 0) ? (a = 0 == _.Mj(new u4(a.data[1]), 1) ? _.M(new u4(a.data[1]), 0) * b : _.M(new u4(a.data[1]), 0), a / c) : 1
        }, P4 = function (a, b, c, d) {
            return 0 == _.Mj(a, 0) ? b : 2 == _.Mj(a, 0) ? N4(new u4(a.data[1]), c) : b * d
        }, Q4 = function (a, b) {
            this.f = b;
            this.b = this.j = null;
            _.x.bind(this.f,
                "insert", this, this.Yf);
            _.x.bind(this.f, "remove", this, this.Zf)
        }, R4 = function (a, b) {
            this.b = b;
            this.f = _.x.bind(a, "click", this, this.j)
        }, U4 = function (a) {
            var b = a.get("map");
            0 != a.get("screenOverlays") ? S4(a, b) : T4(a, b)
        }, V4 = function (a) {
            return a.get("url") ? a.get("url") : a.get("driveFileId") ? "docs://" + a.get("driveFileId") : null
        }, Y4 = function (a, b, c) {
            b.__gm.C || (b.__gm.C = {}, _.ab({"false": _.cw, "true": _.ww}, function (a, c) {
                b.__gm.C[a] = new D4(new C4(_.pm(_.Im, window.document, _.Ti, c + "/maps/api/js/KmlOverlayService.GetOverlays",
                    _.zg)))
            }));
            if (a.C = c) {
                a.B = !0;
                var d = _.pm(W4, _.pm(X4, a, b, c));
                b.__gm.C[0 == c.lastIndexOf("https://", 0)].load(c, a.get("token") || null, d);
                _.en(b, "Lk");
                _.gn("Lk", "-p", a, !(!b || !b.U));
                a.screenOverlays_changed = _.pm(U4, a)
            }
        }, X4 = function (a, b, c, d, e, f, g, h, l, n) {
            if (a.get("map") == b && c == a.C && a.B) {
                a.B = !1;
                var q = V4(a);
                if (q && q == c && (a.set("status", g), g == _.ga)) {
                    Z4(b);
                    a.b = h;
                    a.f = l;
                    e && a.set("defaultViewport", e);
                    a.set("metadata", f);
                    a.F = n;
                    c = 0 == c.lastIndexOf("https://", 0);
                    e = new M4(window.document, _.Ti, _.zg, c ? _.ww : _.cw);
                    f = _.zz(e);
                    g = new _.Zt;
                    g.ea = d;
                    g.Af = c;
                    g.zIndex = a.get("zIndex") || 0;
                    for (var r in n)g.da[r] = n[r];
                    g.Ne = (0, _.p)(f.load, f);
                    g.Qa = 0 != a.get("clickable");
                    a.l = g;
                    _.NV.De(g, b);
                    a.m || (a.m = _.x.addListener(g, "click", (0, _.p)($4, a, a, b)));
                    0 != a.get("screenOverlays") && S4(a, b);
                    for (d = 0; d < a.f.length; ++d)n = a.f[d], n.b.set("map", b), n.b.bindTo("clickable", a), a5(e, n, a, b);
                    d = a.get("preserveViewport");
                    e = a.get("defaultViewport");
                    !d && e && b.fitBounds(e);
                    b = new _.Ue;
                    b = new R4(a, b);
                    b.bindTo("map", a);
                    b.bindTo("suppressInfoWindows", a);
                    a.j = b;
                    _.x.addListener(a,
                        "clickable_changed", function () {
                            a.l.Qa = 0 != a.get("clickable")
                        })
                }
            }
        }, a5 = function (a, b, c, d) {
            var e = new _.yU(c.l.ea, b.ea);
            c = (0, _.p)(b5, c, c, d, b.b.get("bounds").getCenter(), null);
            a = (0, _.p)(a.load, a, e, c);
            b.listener = _.x.addListener(b.b, "click", a)
        }, b5 = function (a, b, c, d, e) {
            var f = {};
            f.latLng = c;
            f.pixelOffset = d;
            e.infoWindowHtml || (c = _.X("div"), c.setAttribute("style", "font-family: Roboto,Arial,sans-serif; font-size: small"), e.info_window_html ? _.AA(c, e.info_window_html) : e.name || e.description ? (e.name && (d = _.X("div", c),
                        d.setAttribute("style", "font-weight: 500; font-size: medium; margin-bottom: 0em"), _.Vl(e.name, d)), e.description && (d = _.X("div", c), _.AA(d, e.description))) : c = null, d = "", c && (d = window.document.createElement("div"), d.appendChild(c), d = d.innerHTML), e.infoWindowHtml = d);
            f.featureData = e;
            _.x.trigger(a, "click", f);
            _.gn("Lk", "-i", e, !(!b || !b.U))
        }, $4 = function (a, b, c, d, e, f) {
            b5(a, b, d, e, f)
        }, W4 = function (a, b) {
            if (b && a && 0 == b.getStatus()) {
                for (var c = [], d = [], e = {}, f = 0; f < _.ee(b, 5); ++f) {
                    var g = new r4(_.Ij(b, 5, f));
                    if (_.Oj(g, 5)) d.push({b: new t4(g.data[5])});
                    else if (_.Oj(g, 4)) {
                        var h = c5(new _.nk((new s4(g.data[4])).data[1])), h = new _.ef((new q4((new s4(g.data[4])).data[0])).getUrl(), h);
                        c.push({b: h, ea: g.getId()})
                    }
                }
                g = _.N(b, 1);
                h = c5(b.getDefaultViewport());
                var f = new y4(b.data[3]), l = new B4(f.data[3]), n = {};
                n.name = _.N(l, 0);
                n.email = _.N(l, 2);
                n.uri = _.N(l, 1);
                l = {};
                l.name = _.N(f, 0);
                l.description = _.N(f, 1);
                l.snippet = _.N(f, 2);
                l.author = n;
                l.hasScreenOverlays = !!d.length;
                var q;
                a:{
                    for (q in _.Ui)if (_.Mj(b, 6) == d5[q]) {
                        q = _.Ui[q];
                        break a
                    }
                    q = "UNKNOWN"
                }
                for (f = 0; f < _.ee(b, 9); ++f)n = new _.AU(_.Ij(b,
                    9, f)), e[_.N(n, 0)] = _.N(n, 1);
                for (f = 0; f < _.ee(b, 7); ++f)n = new _.AU(_.Ij(b, 7, f)), e[_.N(n, 0)] = _.N(n, 1);
                a(g, h, l, q, d, c, e)
            }
        }, Z4 = function (a) {
            a.__gm.G || (a.__gm.G = new _.xd, (new Q4(0, a.__gm.G)).bindTo("innerContainer", a.__gm));
            return a.__gm.G
        }, T4 = function (a, b) {
            if (a.b) {
                b = Z4(b);
                for (var c = 0; c < a.b.length; ++c)b.remove(a.b[c])
            }
        }, S4 = function (a, b) {
            if (a.b) {
                b = Z4(b);
                for (var c = a.b.length - 1; 0 <= c; --c)_.yd(b, a.b[c])
            }
        }, c5 = function (a) {
            var b = new _.C(_.M(new _.Uj(a.data[1]), 0), _.M(new _.Uj(a.data[1]), 1));
            a = new _.C(_.M(new _.Uj(a.data[0]),
                0), _.M(new _.Uj(a.data[0]), 1));
            return new _.ld(a, b)
        }, e5 = _.ma();
    var d5 = {
        UNKNOWN: 0,
        OK: 1,
        INVALID_REQUEST: 2,
        DOCUMENT_NOT_FOUND: 3,
        FETCH_ERROR: 4,
        INVALID_DOCUMENT: 5,
        DOCUMENT_TOO_LARGE: 6,
        LIMITS_EXCEEDED: 7,
        INTERNAL_ERROR: 8,
        TIMED_OUT: 9,
        jo: 10
    };
    var f5;
    _.t(p4, _.L);
    _.t(q4, _.L);
    _.t(r4, _.L);
    _.t(s4, _.L);
    _.t(t4, _.L);
    _.t(u4, _.L);
    _.t(v4, _.L);
    _.t(w4, _.L);
    _.t(x4, _.L);
    _.t(y4, _.L);
    _.t(z4, _.L);
    var g5;
    _.t(A4, _.L);
    _.t(B4, _.L);
    p4.prototype.getUrl = function () {
        return _.N(this, 0)
    };
    p4.prototype.setUrl = function (a) {
        this.data[0] = a
    };
    q4.prototype.getUrl = function () {
        return _.N(this, 0)
    };
    q4.prototype.setUrl = function (a) {
        this.data[0] = a
    };
    r4.prototype.getId = function () {
        return _.N(this, 0)
    };
    z4.prototype.getStatus = function () {
        return _.Mj(this, 0, -1)
    };
    z4.prototype.getDefaultViewport = function () {
        return new _.nk(this.data[4])
    };
    C4.prototype.load = function (a, b, c) {
        var d = new p4;
        d.setUrl(a);
        b && (d.data[1] = b);
        f5 || (f5 = {b: -1, A: [, _.V, _.V, _.S]});
        a = _.Di.b(d.data, f5);
        b = (0, _.p)(this.j, this, c);
        c = (0, _.p)(this.f, this, c);
        this.b(a, b, c)
    };
    C4.prototype.f = function (a) {
        a(null)
    };
    C4.prototype.j = function (a, b) {
        a(new z4(b))
    };
    D4.prototype.load = function (a, b, c) {
        this.f++;
        c = _.ob((0, _.p)(this.l, this, c));
        this.j.load(a, b, c)
    };
    D4.prototype.l = function (a, b) {
        this.b.push((0, _.p)(a, null, b));
        this.f--;
        if (0 == this.f) {
            for (a = 0; a < this.b.length; ++a)this.b[a]();
            this.b = []
        }
    };
    _.t(E4, _.gg);
    E4.prototype.projection_changed = function () {
        F4(this)
    };
    E4.prototype.bounds_changed = function () {
        F4(this)
    };
    E4.prototype.projectionBounds_changed = function () {
        this.K()
    };
    E4.prototype.Z = function () {
        var a = this.get("projectionBounds"), b = this.get("zoom"), c = this.get("projection");
        a && c && _.jb(b) && (a = _.Xf(a.I, a.J, a.L, a.M), b = _.jk(c, b), c = (a.I + a.L) / 2, b = c - _.eb(c, 0, Math.sqrt(b.x * b.x + b.y * b.y)), a.L -= b, a.I -= b, this.b && _.Bj(this.b, a) || (b = a.getCenter(), a = _.gz(a), this.b = new _.Wf([new _.G(b.x - a.width, b.y - a.height), new _.G(b.x + a.width, b.y + a.height)])), F4(this))
    };
    _.t(H4, _.gg);
    H4.prototype.changed = function (a) {
        "bounds" != a && "zoom" != a && "projection" != a || this.K()
    };
    H4.prototype.Z = function () {
        var a = this.get("projection"), b = this.get("bounds"), c = this.get("zoom");
        I4(this);
        if (a && b && _.jb(c) && !b.isEmpty())for (var d = Math.round(b.J), b = Math.round(b.M), e = this.get("projection"), f = this.get("zoom"), g = this.f, a = (new _.C(g.f.b, g.b.b, !0)).lng(), c = _.jz(g).lng(), e = _.Vk(e, g, f), e = Math.round(_.gz(e).width), g = g.getNorthEast().lat() - g.getSouthWest().lat(), h = J4(this, d), l = d; d <= b; ++d) {
            var f = J4(this, d), n = l, q = d, r = h, u = f, A = (r + u) / 2, B = J4(this, (n + q) / 2), E = Math.abs(d - l);
            if (1 <= Math.abs((n - q) / (u -
                    r) * (B - A)) && 10 < E || d == b) n = new _.C(f, c), h = new _.C(h, a), l = new _.I(e, d - l), h = new _.ld(n, h), n = g, q = h.getNorthEast().lat(), r = h.getSouthWest().lat(), r = l.height / (q - r), q = (this.f.getNorthEast().lat() - q) * r, n = Math.abs(n * r), q = new _.G(0, q), h = h.getNorthEast(), _.yd(this.b, {
                j: q,
                position: h,
                f: l,
                scaledSize: new _.I(l.width, n)
            }), l = d, h = f
        }
        _.ob((0, _.p)(this.j, this))()
    };
    H4.prototype.j = function () {
        this.b.forEach(function (a) {
            a.pl && this.remove(a)
        })
    };
    _.t(K4, _.gg);
    _.k = K4.prototype;
    _.k.changed = function () {
        this.K()
    };
    _.k.opacity_changed = function () {
        var a = L4(this);
        this.b.forEach(function (b) {
            _.Nl(b.node, a, !0)
        })
    };
    _.k.Z = function () {
        if (_.iz(this.b)) {
            var a = this.get("projection"), b = this.get("zoom"), c = this.get("center"), d = this.get("offset"), e = this.get("latLngBounds"), f = L4(this);
            _.jb(b) && e && a && d && c && (e = _.am(a, e, b, d, c)) && !_.Dj(e, this.f) && (this.f = e, this.b.forEach((0, _.p)(this.Dh, this)), this.b.forEach((0, _.p)(this.Cg, this, a, b, c, d, f)))
        }
    };
    _.k.Tj = function (a) {
        var b = this.get("projection"), c = this.get("zoom"), d = this.get("center"), e = this.get("offset"), f = L4(this);
        b && _.jb(c) && e && d && this.Cg(b, c, d, e, f, a)
    };
    _.k.Cg = function (a, b, c, d, e, f) {
        f.b = _.Uk(a, f.position, b, c, d.width, d.height, null);
        f.node = _.lA(this.l, this.j, f.j, f.f, f.b, f.scaledSize, this.m);
        _.Nl(f.node, e, !0);
        _.Qk(f.node, 10)
    };
    _.k.Dh = function (a) {
        a.node && (_.qf(a.node), a.node = null)
    };
    M4.prototype.load = function (a, b) {
        var c = new A4;
        c.data[0] = a.ea;
        c.data[1] = a.b + "";
        if (a.da)for (var d in a.da) {
            var e = new _.AU(_.Jj(c, 2));
            e.data[0] = d;
            e.data[1] = a.da[d]
        }
        g5 || (g5 = {b: -1, A: []}, g5.A = [, _.V, _.V, _.qk(_.EU())]);
        a = _.Di.b(c.data, g5);
        this.b(a, b, b);
        return a
    };
    M4.prototype.cancel = function () {
        throw Error("Not implemented");
    };
    _.t(Q4, _.y);
    _.k = Q4.prototype;
    _.k.innerContainer_changed = function () {
        var a = this.b;
        this.b = this.get("innerContainer");
        this.j && (_.x.removeListener(this.j), delete this.j);
        a && this.f.forEach((0, _.p)(this.Zf, this));
        this.b && (this.j = _.x.bind(this.b, "resize", this, this.Ym), this.f.forEach((0, _.p)(this.Yf, this)))
    };
    _.k.Ym = function () {
        var a = this;
        _.ob(function () {
            a.f.forEach((0, _.p)(a.fg, a))
        })()
    };
    _.k.Yf = function (a) {
        if (this.b) {
            var b = _.ig(this.b), b = _.X("div", this.b, new _.G(b.width, b.height));
            _.hk(b);
            _.Qk(b, 2);
            a.R = b;
            b = _.X("div", a.R, new _.G(0, 0), null, !0);
            _.hk(b);
            a.f = b;
            b = {scale: !0, b: (0, _.p)(this.ij, this, a)};
            a.Ra = _.aA((new q4(a.b.data[0])).getUrl(), a.R, null, null, b)
        }
    };
    _.k.Zf = function (a) {
        a.R && _.Yl(a.R);
        a.f && _.Yl(a.f);
        a.Ra && _.Yl(a.Ra);
        a.R = null;
        a.Ra = null;
        a.f = null
    };
    _.k.ij = function (a, b, c) {
        a.R && c && (a.Ra = c, _.hk(c), this.fg(a))
    };
    _.k.fg = function (a) {
        var b = _.ig(this.b), c;
        c = _.ig(a.Ra);
        c = new _.I(P4(new w4((new x4(a.b.data[3])).data[0]), c.width, b.width, O4(new w4((new x4(a.b.data[3])).data[1]), b.height, c.height)), P4(new w4((new x4(a.b.data[3])).data[1]), c.height, b.height, O4(new w4((new x4(a.b.data[3])).data[0]), b.width, c.width)));
        var d = N4(new u4((new v4(a.b.data[2])).data[0]), b.width), e = N4(new u4((new v4(a.b.data[2])).data[1]), b.height), e = b.height - e - c.height;
        _.Bk(a.R, new _.G(d - N4(new u4((new v4(a.b.data[1])).data[0]), c.width), e +
            N4(new u4((new v4(a.b.data[1])).data[1]), c.height)));
        _.hg(a.R, c);
        _.hg(a.Ra, c);
        _.hg(a.f, c)
    };
    _.t(R4, _.y);
    R4.prototype.remove = function () {
        this.b.close();
        _.x.removeListener(this.f);
        delete this.f
    };
    R4.prototype.changed = function () {
        this.b.close()
    };
    R4.prototype.suppressInfoWindows_changed = function () {
        this.get("suppressInfoWindows") && this.b.close()
    };
    R4.prototype.j = function (a) {
        if (a) {
            var b = this.get("map");
            if (b && !this.get("suppressInfoWindows")) {
                var c = a.featureData;
                if (c = c && c.infoWindowHtml || a.infoWindowHtml) this.b.setOptions({
                    pixelOffset: a.pixelOffset,
                    position: a.latLng,
                    content: c
                }), this.b.open(b)
            }
        }
    };
    e5.prototype.f = function (a) {
        var b = a.D, c = a.D = a.get("map"), d = V4(a);
        if (b) {
            a.B = !1;
            a.l && _.NV.xf(a.l, b);
            a.m && (_.x.removeListener(a.m), delete a.m);
            T4(a, b);
            delete a.screenOverlays_changed;
            if (a.f)for (b = 0; b < a.f.length; ++b) {
                var e = a.f[b];
                e.b.set("map", null);
                _.x.removeListener(e.listener);
                delete e.listener
            }
            a.j && (a.j.remove(), a.j.unbindAll(), delete a.j);
            _.hn("Lk", "-p", a)
        }
        c && Y4(a, c, d)
    };
    e5.prototype.b = function (a) {
        var b = a.get("map"), c = b && b.__gm;
        a.j && a.j.B.remove(a);
        (a.j = c) && _.yd(c.B, a);
        if (c && !c.S) {
            var d = G4(c.B, c);
            c.S = d;
            c.f.Mb(d)
        }
        a.b && (a.b.set("bounds", null), a.f.unbindAll(), a.b.unbindAll(), a.l.unbindAll(), delete a.f, delete a.b, delete a.l, _.hn("Og", "-p", a));
        if (b) {
            var d = a.get("bounds"), e = a.get("url"), f = c.get("panes").overlayLayer, g = new _.xd;
            a.m = g;
            var h = new E4;
            h.bindTo("projectionBounds", c);
            h.bindTo("projectionTopLeft", c);
            h.bindTo("projection", b);
            h.bindTo("zoom", b);
            h.set("bounds", d);
            a.f = h;
            var l = new H4(d, g);
            l.bindTo("zoom", b);
            l.bindTo("projection", b);
            l.bindTo("bounds", h, "croppedBounds");
            a.b = l;
            e = new K4(e, f, g);
            e.bindTo("offset", c);
            e.bindTo("zoom", b);
            e.bindTo("center", c, "projectionCenterQ");
            e.bindTo("projection", b);
            e.bindTo("clickable", a);
            e.bindTo("opacity", a);
            e.set("latLngBounds", d);
            a.l = e;
            _.x.forward(e, "click", a);
            _.en(b, "Og");
            _.gn("Og", "-p", a, !(!b || !b.U));
            _.x.addListener(a, "click", function () {
                _.gn("Og", "-i", a, !(!b || !b.U))
            })
        }
    };
    _.Xc("kml", new e5);
});
