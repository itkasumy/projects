google.maps.__gjsload__('maxzoom', function(_){var vU=function(a,b,c,d){var e=_.pm(_.Im,window.document,_.Ti);function f(){d({status:_.aa})}b=b.fromLatLngToPoint(a);b.x=Math.floor(b.x/256*8388608);b.y=Math.floor(b.y/256*8388608);a=_.Um(_.Ew,function(a){var b={};a.zoom?(b.zoom=a.zoom,b.status=_.ga):b.status=_.aa;d(b)});(c=c(b,23))?e(c,null,"",a,f):f();_.CA("maxzoom")},wU=_.ma();wU.prototype.getMaxZoomAtLatLng=function(a,b){var c=new _.Yf,d=_.N(_.Q,15);vU(_.Kc(a),c,function(a,b){return(a=_.gt(new _.G(a.x,a.y),b))?(0,_.zg)(_.Ok(_.Ok(_.Ok(new _.Ik(d),"x",a.x),"y",a.y),"z",b).toString()):""},b)};_.Xc("maxzoom",new wU);});
