google.maps.__gjsload__('drawing_impl', function (_) {
    var L3 = function (a, b) {
        _.v(b, a.unbind, a)
    }, Q3 = function (a, b) {

        function c(b, c, h, l) {
            var f = _.X("div", a);
            _.WK(f, "left");
            f.style.lineHeight = "0";
            c = {title: c, b: h, j: l, padding: [4], f: !0};
            h = _.X("span");
            h.style.display = "inline-block";
            var g = b || "hand", r = M3[g], u = _.lA(d, h, new _.G(0, r), N3);
            u.style.position = "relative";
            var A = new _.aM(f, h, b, c);
            _.x.addListener(A, "active_changed", function () {
                var a = A.get("active") ? O3[g] : r;
                _.kA(u, N3, new _.G(0, a))
            });
            A.bindTo("value", e, "drawingMode")
        }

        var d = _.wm("drawing"), e = this;
        c(null, "\u505c\u6b62\u7ed8\u56fe",
            !0, !b.length);
        _.v(b, function (a, d) {
            var e = P3[a];
            e && c(a, e, !1, d == b.length - 1);
        });
    }, R3 = _.ma(), S3 = function (a, b, c) {
        this.l = a;
        this.m = b;
        this.B = c;
        _.x.bind(this, "click", this, this.mj);
        _.x.bind(this, "mousemove", this, this.Ic);
        _.x.bind(this, "movestart", this, this.kj);
        _.x.bind(this, "move", this, this.lj);
        _.x.bind(this, "moveend", this, this.jj)
    }, T3 = function (a) {
        if (!a.b) {
            var b = {};
            _.bb(b, a.get("options"));
            null == b.zIndex && (b.zIndex = a.B());
            delete b.map;
            a.b = a.l.f(b)
        }
    }, U3 = function (a, b) {
        a.Ic(b);
        b = a.b;
        b.unbind("map");
        a.b = null;
        _.x.trigger(a,
            "overlaycomplete", {type: a.l.l(), overlay: b});
        _.x.trigger(a, a.l.j(), b);
        a.f = null;
        a.j = !1
    }, V3 = _.ma(), W3 = function (a) {
        this.f = a;
        this.b = null;
        _.x.bind(this, "click", this, this.j)
    }, X3 = function (a) {
        if (!a.b) {
            var b = {};
            _.bb(b, a.get("options"));
            delete b.map;
            a.b = new _.De(b)
        }
    }, Y3 = function (a, b, c, d) {
        this.j = a;
        this.f = b;
        this.l = c;
        this.m = d + 1E-6;
        this.b = null;
        this.D = new _.G(0, 0);
        this.B = new _.G(0, 0);
        this.C = new _.G(0, 0);
        _.x.bind(this, "click", this, this.Vi);
        _.x.bind(this, "dblclick", this, this.Yk);
        _.x.bind(this, "mousemove", this, this.Wi);
        _.x.bind(this, "movestart", this, this.Yi);
        _.x.bind(this, "move", this, this.Zi);
        _.x.bind(this, "moveend", this, this.Xi)
    }, Z3 = function (a, b) {
        a.b.Db.getPath().push(b);
        a.b.lb.set("anchors", [b])
    }, b4 = function (a, b) {
        var c = $3(a, b);
        c ? (a.j || 2 != c.type || Z3(a, c.latLng), a4(a)) : Z3(a, b)
    }, $3 = function (a, b) {
        var c = a.b.Db.getPath(), d = c.getLength();
        if (d) {
            var e = a.get("map"), f = e.get("projection"), e = e.__gm.get("zoom"), e = a.m / (1 << e), g = f.fromLatLngToPoint(b, a.D);
            b = b.lng();
            var d = c.getAt(d - 1), h = new _.C(d.lat(), _.eb(d.lng(), b - 180, b + 180),
                !0), h = f.fromLatLngToPoint(h, a.B);
            if (Math.abs(g.x - h.x) <= e && Math.abs(g.y - h.y) <= e)return {type: 1, latLng: d};
            c = c.getAt(0);
            b = new _.C(c.lat(), _.eb(c.lng(), b - 180, b + 180), !0);
            a = f.fromLatLngToPoint(b, a.C);
            if (Math.abs(g.x - a.x) <= e && Math.abs(g.y - a.y) <= e)return {type: 2, latLng: c}
        }
        return null
    }, d4 = function (a) {
        var b = a.get("options"), c = new _.y;
        c.setValues(b);
        var d = new _.RJ(c, a.j), c = {};
        _.bb(c, b);
        c.strokeColor = d.get("strokeColor");
        c.strokeOpacity = d.get("strokeOpacity");
        c.strokeWeight = d.get("strokeWeight");
        null == c.zIndex &&
        (c.zIndex = a.l());
        delete c.path;
        delete c.map;
        var e = new _.Me(c);
        e.bindTo("map", a);
        c.strokeOpacity = d.get("ghostStrokeOpacity");
        d = new _.OJ;
        d.setValues(c);
        d.set("anchors", []);
        d.bindTo("map", a);
        var f = null;
        a.j && (f = {}, _.bb(f, b), f.zIndex = c.zIndex, f.paths = new _.wd([e.getPath()]), delete f.map, f = new _.Le(f));
        a.b = {Db: e, uh: f, lb: d};
        c4(a)
    }, a4 = function (a) {
        var b = a.b.Db;
        b.unbind("map");
        var c = a.b.uh;
        a.b.lb.unbind("map");
        a.b.lb.set("map", null);
        a.b = null;
        a.set("draggableCursor", a.f);
        if (b.getPath().getLength()) {
            if (a.j) {
                b.set("map",
                    null);
                c.set("map", a.get("map"));
                var d = {type: "polygon", overlay: c};
                _.x.trigger(a, "overlaycomplete", d);
                _.x.trigger(a, "polygoncomplete", c)
            } else d = {
                type: "polyline",
                overlay: b
            }, _.x.trigger(a, "overlaycomplete", d), _.x.trigger(a, "polylinecomplete", b);
            c4(a)
        } else b.set("map", null)
    }, c4 = function (a) {
        a.set("enablePanning", !!a.b && a.get("drawPolysWithDrag") && !a.get("panWhileDrawing"))
    }, e4 = _.ma(), f4 = function (a, b) {
        var c, d;
        a.lat() < b.lat() ? (c = a.lat(), d = b.lat()) : (c = b.lat(), d = a.lat());
        var e;
        180 >= _.id(a.lng(), b.lng()) ? (e =
                a.lng(), a = b.lng()) : (e = b.lng(), a = a.lng());
        return _.md(c, e, d, a)
    }, g4 = function () {
        var a = 0;
        return function () {
            return a++
        }
    }, k4 = function () {
        var a = "click dblclick movestart move moveend panbynow mousewheel".split(" ");
        _.Wl() || a.push("mousemove");
        a = this.f = h4(this, a);
        this.G = i4(this);
        var b;
        b = "url(" + _.vm + "crosshair.cur)";
        _.R.f && (b += " 7 7");
        b += ", crosshair";
        var c = g4();
        this.m = 6 + (_.Wl() ? 9 : 0);
        this.j = {
            circle: new S3(new V3, b, c),
            marker: new W3(b),
            polygon: new Y3(!0, b, c, this.m),
            polyline: new Y3(!1, b, c, this.m),
            rectangle: new S3(new e4,
                b, c)
        };
        b = j4(this);
        for (var d in this.j)c = this.j[d], c.bindTo("map", this), c.bindTo("panWhileDrawing", this), c.bindTo("draggingCursor", a), c.bindTo("draggableCursor", b), c.bindTo("enablePanning", a, "panAtEdge"), c.bindTo("options", this, d + "Options"), _.x.forward(c, "overlaycomplete", this), _.x.forward(c, d + "complete", this);
        this.j.polygon.bindTo("drawPolysWithDrag", this);
        this.j.polyline.bindTo("drawPolysWithDrag", this);
        this.b = null;
        this.O = [];
        this.l = this.B = null;
        this.F = 0;
        this.D = this.C = null
    }, h4 = function (a, b) {
        var c = new _.MJ(b),
            d = !1;
        _.v(b, function (b) {
            _.x.addListener(c, b, function (c) {
                "click" != b && "dblclick" != b && "mousemove" != b || _.ub(c);
                if ("mousewheel" != b && (!d || "mousemove" != b)) {
                    if ("mousemove" == b || "move" == b) a.C = b, a.D = c;
                    if (d || !a.get("panWhileDrawing")) "movestart" == b && (d = !0), "moveend" == b && (d = !1), "panbynow" == b ? a.C && a.D && l4(a, a.C, a.D) : l4(a, b, c)
                }
            })
        });
        return c
    }, i4 = function (a) {
        var b = new _.Vt(["map", "drawingMode", "pegmanDragging"], "active", function (a, b, e) {
            return !!a && !!b && !e
        });
        b.bindTo("map", a);
        b.bindTo("drawingMode", a);
        a.f.bindTo("active",
            b);
        return b
    }, j4 = function (a) {
        var b = new _.Vt(["draggableCursor", "panWhileDrawing"], "cursor", function (a, b) {
            return b ? null : a
        });
        b.bindTo("panWhileDrawing", a);
        a.f.bindTo("draggableCursor", b, "cursor");
        return b
    }, l4 = function (a, b, c) {
        var d = a.get("map");
        if (a.b) {
            var e = d.__gm.get("projectionController"), d = d.__gm.get("panes");
            if (e && d) {
                c.ca ? (d = c.ca, e = e.fromContainerPixelToLatLng(d)) : (d = _.dn(c, d.floatPane), e = e.fromDivPixelToLatLng(d));
                var f = a.get("snappingCallback");
                (f = f && f(a.b.hf(e))) && (e = f);
                if ("click" == b) {
                    f = _.Cl();
                    if (300 >= f - a.F && a.l && _.fb(a.l.x, d.x, a.m) && _.fb(a.l.y, d.y, a.m))return;
                    a.l = d;
                    a.F = f
                }
                _.x.trigger(a.b, b, e, c)
            }
        }
    }, m4 = function (a) {
        _.gg.call(this);
        var b = new k4;
        b.bindTo("map", a);
        b.bindTo("drawingMode", a);
        b.bindTo("panWhileDrawing", a);
        b.bindTo("markerOptions", a);
        b.bindTo("polygonOptions", a);
        b.bindTo("polylineOptions", a);
        b.bindTo("rectangleOptions", a);
        b.bindTo("circleOptions", a);
        b.bindTo("drawPolysWithDrag", a);
        _.x.forward(b, "overlaycomplete", a);
        _.x.forward(b, "circlecomplete", a);
        _.x.forward(b, "markercomplete",
            a);
        _.x.forward(b, "polygoncomplete", a);
        _.x.forward(b, "polylinecomplete", a);
        _.x.forward(b, "rectanglecomplete", a);
        this.bindTo("map", a);
        this.bindTo("drawingControl", a);
        this.bindTo("drawingControlOptions", a);
        this.bindTo("drawingMode", a);
        this.set("snappingCallback", a.get("snappingCallback"));
        a.bindTo("snappingCallback", this);
        b.bindTo("snappingCallback", this)
    }, n4 = function (a) {
        switch (a) {
            case null:
                return null;
            case "Point":
                return "marker";
            case "LineString":
                return "polyline";
            case "Polygon":
                return "polygon";
            default:
                return null
        }
    };
   _.t(Q3, _.y);
    var P3 = {
        marker: "\u6dfb\u52a0\u6807\u8bb0",
        polygon: "\u7ed8\u5236\u5f62\u72b6",
        polyline: "\u7ed8\u5236\u7ebf\u6761",
        rectangle: "\u7ed8\u5236\u77e9\u5f62",
        circle: "\u7ed8\u5236\u5706\u5f62"
    }, N3 = new _.I(32, 32), O3 = {
        hand: 288,
        marker: 224,
        polygon: 192,
        polyline: 256,
        rectangle: 96,
        circle: 0
    }, M3 = {hand: 160, marker: 352, polygon: 128, polyline: 64, rectangle: 32, circle: 320};
    _.t(R3, _.y);
    _.t(S3, R3);
    _.k = S3.prototype;
    _.k.hf = function (a) {
        T3(this);
        this.Ic(a);
        return {latLng: a, overlay: this.b}
    };
    _.k.active_changed = function () {
        if (this.get("active")) this.set("draggableCursor", this.m), this.set("draggingCursor", ""); else {
            var a = this.b;
            a && (a.unbind("map"), a.set("map", null), this.b = null);
            this.f = null;
            this.j = !1
        }
    };
    _.k.Ic = function (a) {
        this.b && (this.f ? (this.b.get("map") || this.b.bindTo("map", this), this.l.b(this.b, this.f, a)) : this.l.b(this.b, a))
    };
    _.k.mj = function (a) {
        this.f ? U3(this, a) : (T3(this), this.f = a, this.Ic(a), this.j = !0)
    };
    _.k.kj = function (a, b) {
        this.j || (this.set("draggingCursor", this.m), this.set("enablePanning", !0), T3(this), this.f = a, this.Ic(a), _.iA(b))
    };
    _.k.lj = function (a, b) {
        this.j || (this.Ic(a), _.iA(b))
    };
    _.k.jj = function (a, b) {
        this.j || (this.set("draggingCursor", ""), this.set("enablePanning", !1), U3(this, a), _.iA(b))
    };
    V3.prototype.f = function (a) {
        return new _.Eg(a)
    };
    V3.prototype.b = function (a, b, c) {
        a.set("center", b);
        var d = 0, e = a.get("map");
        e && c && (d = e.__gm.get("baseMapType"), d = _.kz(b, c, d && d.radius));
        a.set("radius", d)
    };
    V3.prototype.l = _.pa("circle");
    V3.prototype.j = _.pa("circlecomplete");
    _.t(W3, R3);
    W3.prototype.hf = function (a) {
        X3(this);
        this.b.setPosition(a);
        return {latLng: a, overlay: this.b}
    };
    W3.prototype.active_changed = function () {
        this.get("active") && this.set("draggableCursor", this.f)
    };
    W3.prototype.j = function (a) {
        X3(this);
        this.b.setPosition(a);
        this.b.setMap(this.get("map"));
        _.x.trigger(this, "overlaycomplete", {type: "marker", overlay: this.b});
        _.x.trigger(this, "markercomplete", this.b);
        this.b = null
    };
    _.t(Y3, R3);
    _.k = Y3.prototype;
    _.k.hf = function (a) {
        this.b && this.b.Db || d4(this);
        return {latLng: a, overlay: this.b.uh || this.b.Db}
    };
    _.k.active_changed = function () {
        this.get("active") ? this.set("draggableCursor", this.f) : this.b && this.b.Db && a4(this)
    };
    _.k.Vi = function (a) {
        this.b ? b4(this, a) : (d4(this), Z3(this, a))
    };
    _.k.Yk = function () {
        this.b && 1 < this.b.Db.getPath().getLength() && a4(this)
    };
    _.k.Wi = function (a) {
        var b = a;
        this.b && (a = $3(this, a), this.set("draggableCursor", a ? "pointer" : this.f), a && (b = a.latLng), this.b.lb.set("freeVertexPosition", b))
    };
    _.k.Yi = function (a, b) {
        this.get("drawPolysWithDrag") && (this.b || d4(this), this.b.Db.getPath().getLength() || Z3(this, a), this.set("draggingCursor", this.f), _.iA(b))
    };
    _.k.Zi = function (a, b) {
        this.b && this.get("drawPolysWithDrag") && (this.b.lb.set("freeVertexPosition", a), _.iA(b))
    };
    _.k.Xi = function (a, b) {
        this.get("drawPolysWithDrag") && (this.b && (b4(this, a), this.set("draggingCursor", "")), this.b && this.b.lb.set("freeVertexPosition", null), _.iA(b))
    };
    _.k.drawPolysWithDrag_changed = Y3.prototype.panWhileDrawing_changed = function () {
        c4(this)
    };
    e4.prototype.f = function (a) {
        return new _.Fg(a)
    };
    e4.prototype.b = function (a, b, c) {
        a.set("bounds", f4(b, c || b))
    };
    e4.prototype.l = _.pa("rectangle");
    e4.prototype.j = _.pa("rectanglecomplete");
    _.t(k4, _.y);
    k4.prototype.map_changed = function () {
        var a = this.get("map"), b = this.G, c = this.f;
        if (a) {
            var d = a.__gm;
            this.bindTo("mouseEventTarget", d);
            b.bindTo("pegmanDragging", d);
            c.bindTo("draggable", a);
            c.bindTo("scrollwheel", a);
            this.B = _.x.forward(c, "panbynow", d)
        } else this.unbind("mouseEventTarget"), this.set("mouseEventTarget", null), b.unbind("pegmanDragging"), c.unbind("draggable"), c.unbind("scrollwheel"), this.B && (_.x.removeListener(this.B), this.B = null)
    };
    k4.prototype.mouseEventTarget_changed = function () {
        var a = ["offset", "panes", "projectionTopLeft", "size"];
        L3(this.f, a);
        var b = this.O;
        _.v(b, _.x.removeListener);
        b.length = 0;
        var c = this.get("mouseEventTarget");
        if (c) {
            var d = this.f, e = this.get("map");
            _.WA(d, a, e.__gm);
            _.v(["movestart", "move", "moveend"], function (a) {
                var e = _.x.addListener(d, a, function (b) {
                    _.Dt(b) || _.x.trigger(c, a, b)
                });
                b.push(e)
            });
            _.x.forward(d, "mousewheel", c)
        }
    };
    k4.prototype.drawingMode_changed = function () {
        this.b && this.b.set("active", !1);
        this.f.set("panAtEdge", !1);
        var a = this.get("drawingMode");
        (this.b = this.j[a]) && this.b.set("active", !0)
    };
    _.t(m4, _.gg);
    _.k = m4.prototype;
    _.k.map_changed = function () {
        var a = this.get("map");
        a ? (a = a.__gm, this.bindTo("layoutManager", a), a.set("snappingCallback", this.get("snappingCallback")), this.bindTo("snappingCallback", a)) : (this.unbind("layoutManager"), this.set("layoutManager", null), this.unbind("snappingCallback"))
    };
    _.k.layoutManager_changed = m4.prototype.K;
    _.k.drawingControl_changed = m4.prototype.K;
    _.k.drawingControlOptions_changed = m4.prototype.K;
    _.k.Z = function () {
        this.b && (this.f.nb(this.b), _.ug(this.b), this.b = null, this.j.unbindAll(), this.j = null);
        if ((this.f = this.get("layoutManager")) && 0 != this.get("drawingControl")) {
            var a = this.get("drawingControlOptions") || {}, b = a.drawingModes || o4, c = window.document.createElement("div");
            _.Jl(c);
            c.style.margin = _.W(5);
            c.setAttribute('id','draw_manager_tool');
            _.Qk(c, 10);
            this.b = c;
            // con(c);
            this.j = new Q3(this.b, b);
            this.j.bindTo("drawingMode", this);
            this.f.addElement(this.b, a.position || 1, !1, .25);
            // var first_c=this.b.childNodes[0].childNodes[0].childNodes[0];
            // for(var i=0;i<4;i++){
            //     var tt=document.createElement('a');
            //     tt.innerHTML='sss';
            //     tt.style.lineHeight='0';
            //     tt.style.width='40px';
            //     tt.href='#';
            //     tt.className='nono';
            //     tt.style.display='inline-block';
            //     tt.style.height='40px';
            //     var ttt=first_c.cloneNode();
            //     ttt.appendChild(tt);
            //     this.b.appendChild(ttt);
            // }
        }
    };
    var o4 = ["marker", "polyline", "rectangle", "circle", "polygon"];
    _.Xc("drawing_impl", {
        wi: m4, ml: function (a) {
            var b = new _.y, c = new _.Vt(["dataDrawingMode"], "drawingManagerMode", n4);
            c.bindTo("dataDrawingMode", a, "drawingMode");
            var d = new _.Vt(["styleOrStylingFunction"], "style", function (a) {
                return "function" === typeof a ? a(new _.Zc) : a
            });
            d.bindTo("styleOrStylingFunction", a, "style");
            var e = new _.Vt(["controls", "controlPosition"], "drawingControlOptions", function (a, b) {
                return {drawingModes: _.gb(a, n4), position: b}
            });
            e.bindTo("controls", a);
            e.bindTo("controlPosition", a);
            var f = new _.Vt(["controls"],
                "drawingControl", function (a) {
                    return !!a
                });
            f.bindTo("controls", a);
            b.bindTo("map", a);
            b.bindTo("drawingMode", c, "drawingManagerMode");
            b.bindTo("markerOptions", d, "style");
            b.bindTo("polylineOptions", d, "style");
            b.bindTo("polygonOptions", d, "style");
            b.bindTo("drawingControlOptions", e);
            b.bindTo("drawingControl", f);
            _.x.addListener(b, "overlaycomplete", function (b) {
                b = b.overlay;
                var c = _.PA([b]), d = a.get("featureFactory"), c = d ? d(c) : new _.Zc({geometry: c});
                a.add(c);
                b.set("map", null)
            });
            new m4(b);
            _.nm(a, "map_changed", function () {
                var b =
                    a.get("map");
                b && _.en(b, "Le")
            })
        }
    });
});
