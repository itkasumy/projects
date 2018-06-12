var temp = {name:"区域名称",index:22222}
var options = {
    content: "<p style='width:100px;color:#7dfef4; font-size:16px'id='areaName"+temp.index+"'>"+ temp.name +"</p>",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-50,0),
    zIndex: null,
    boxStyle: {
    },
    closeBoxURL: "",
    closeBoxMargin: "0px 0px 0px 0px",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};
function areaCom(p0,p1,p2){
    var area = 0.0;
    area = p0.lng*p1.lat+p1.lng*p2.lat+p2.lng*p0.lat-p1.lng*p0.lat-p2.lng*p1.lat-p0.lng*p2.lat;
    return area/2;
}

function getPolygonAreaCenter(points) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_area = 0;
    var p1 = points[1];
    var p2 = [];
    var area = 0.0;
    for (var i = 2; i < points.length; i++) {
        p2=points[i];
        area = areaCom(points[0],p1,p2) ;
        sum_area += area ;
        sum_x += (points[0].lng + p1.lng + p2.lng) * area;
        sum_y += (points[0].lat + p1.lat + p2.lat) * area;
        p1 = p2 ;
    }
    var xx = sum_x / sum_area / 3;
    var yy = sum_y / sum_area / 3;
    return {lat:yy, lng:xx};
}
function setAreaName(map,para) {
    let temp = para.path
    var point = getPolygonAreaCenter(temp);
    var label = new google.maps.Maplabel({
        fontColor: para.fontColor || '#229fff',
        strokeWeight: 5,
        fontSize: para.fontSize || 15,
        zIndex: -1,
        text: para.name || '暂无名称',
    });
    var marker=new google.maps.Marker({
        draggable:false,
        position:new google.maps.LatLng(point.lat,point.lng),
        title:'',
        icon:'../static/images/empty-bg.png',
        map:map
    });
    var poly=new google.maps.Polygon({
        map:map,
        strokeColor: para.strokeColor  || '#229fff',
        fillColor: para.fillColor || '#caefff',
        strokeWeight:'2',
        fillOpacity:'0.3',
        paths:temp
    });  
    label.bindTo('map', marker);
    label.bindTo('position', marker);
    return {infoBox:label,polygon:poly};
}
export{setAreaName}