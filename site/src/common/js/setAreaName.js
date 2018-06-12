//const temp = [{lat:31.23940408,lng:121.48526609},{lat:31.23935580,lng:121.48655355},{lat:31.23807371,lng:121.48643553},{lat:31.23628199,lng:121.48678958},{lat:31.23734954,lng:121.48377478}];
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
    //debugger;
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
// function computeLatLng(temp) {
//     var totalLat = 0;
//     var averageLat = 0;
//     var totalLng = 0;
//     var averageLng = 0;
//     for (let index = 0; index < temp.length; index++) {
//         const element = temp[index];
//         var lat = temp[index].lat*Math.pow(10,8);
//         var lng = temp[index].lng*Math.pow(10,8);
//         totalLat +=lat;
//         totalLng +=lng;
//     }
//     averageLat = totalLat/(temp.length*Math.pow(10,8));
//     averageLng = totalLng/(temp.length*Math.pow(10,8));
//     return {lat:averageLat,
//               lng:averageLng}
// }
function setAreaName(map,para) {
    var ib1 = new InfoBox(options);
    let temp = para.path
    let contentString = "<p style='width:100px;color:#7dfef4; font-size:16px'id='areaName"+para.index+"'>"+ para.name +"</p>"
    let tempString = para.name ? contentString : para.content||""; 
    ib1.setContent(tempString);
    var point = getPolygonAreaCenter(temp);
    var marker=new google.maps.Marker({
        draggable:false,
        position:new google.maps.LatLng(point.lat,point.lng),
        title:'',
        icon:'../static/images/empty-bg.png',
        map:map
    });
    var poly=new google.maps.Polygon({
        map:map,
        strokeColor: para.strokeColor ? para.strokeColor : '#229fff',
        fillColor: para.fillColor ? para.fillColor : '#caefff',
        strokeWeight:'2',
        fillOpacity:'0.3',
        paths:temp
    });
    google.maps.event.addListener(poly, 'drag', eve => {
        var path = poly.getPath().getArray();
         var pathList = [];
         path.forEach(pa =>{
             var l = pa.lat();
             var n = pa.lng();
             let temp ={lat:l,lng:n};
             pathList.push(temp);
         });
         let p = getPolygonAreaCenter(pathList);
         marker.setPosition(new google.maps.LatLng(p));
     })   
    ib1.open(map, marker);
    return {ifnoBox:ib1,polygon:poly};
}
export{setAreaName}