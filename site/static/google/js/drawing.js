google.maps.__gjsload__('drawing', function (_) {
    var Ow = function (a) {
        var b = this;
        a = a || {};
        a.drawingMode = a.drawingMode || null;
        b.setValues(a);
        _.F("drawing_impl", function (a) {
            new a.wi(b)
        })
    };
    _.t(Ow, _.y);
    _.sd(Ow.prototype, {map: _.Ii, drawingMode: _.Wh});
    _.Ub.google.maps.drawing = {
        DrawingManager: Ow,
        OverlayType: {
            MARKER: "marker",
            POLYGON: "polygon",
            POLYLINE: "polyline",
            RECTANGLE: "rectangle",
            CIRCLE: "circle"
        }
    };
    _.Xc("drawing", {});
});
