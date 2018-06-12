var para = {index:1};
var contentMsg='<div class="divTable">'+
'<div class="divRow"><div class="divCell-first">设备名称</div><div class="divCell-second">aaaaaaa</div></div>'+
'<div class="divRow"> <div class="divCell-first">设备编号</div><div class="divCell-second">002</div></div>'+
'<div class="divRow"> <div class="divCell-first">区域</div><div class="divCell-second">002</div></div>'+
'<div class="divRow"> <div class="divCell-first">经纬度</div><div class="divCell-second">002</div></div>'+
'</div>';
var deviceLabelOptions = {
    content: contentMsg,
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(10, -20),
    zIndex: null,
    boxStyle: {
        backgroundColor: '#fff',
        borderRadius: '7px',
        width: "280px",
        height: '130px'
    },
    closeBoxMargin: "8px 8px 0px 0px",
    closeBoxURL: "../static/images/device-label-close.png",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};
var deviceSetOptions = {
    content: "<img src='../static/images/device-set-close.png' id='deviceIcon'"+ para.index +"/>",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(5, -50),
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
var ib1 = new InfoBox(deviceSetOptions);
var ib2 = new InfoBox(deviceLabelOptions);
function setPosMsg(map, pos, para) {
    ib1.setContent("<img src='../static/images/device-set-close.png' id='deviceCloseIcon'/>");
  
    var marker = new google.maps.Marker({
        draggable: true,
        position: pos,
        zIndex: 99,
        title: '',
        icon: '../static/images/dev-'+ (para.type||'camera') +'-marker.png',
        map: map
    });
    marker.markerId = para.index

    var label = new google.maps.Maplabel({
        fontColor: '#fff',
        strokeWeight: 5,
        strokeColor: '#229fff',
        text: para.name || '设备名称',
    });
    label.bindTo('map', marker);
    label.bindTo('position', marker);
    marker.__label__ = label
    marker.addListener('click', function (args) {
        var labelContent = '<div class="divTable">'+
        '<div class="divRow"><div class="divCell-first">设备名称</div><div class="divCell-second">'+ (para?(para.name || "NA"): "NA") + '</div></div>'+
        '<div class="divRow"> <div class="divCell-first">设备编号</div><div class="divCell-second">' + (para?(para.num || "NA"): "NA") + '</div></div>'+
        '<div class="divRow"> <div class="divCell-first">区域</div><div class="divCell-second">' + (para?(para.area || "NA") : "NA") + '</div></div>'+
        '<div class="divRow"> <div class="divCell-first">经纬度</div><div class="divCell-second">' + (para?(para.lngLat || "NA"): "NA") + '</div></div>'+
        '</div>';
        ib2.setContent(labelContent);
        ib1.id = para.index
        ib1.open(map, marker);
        ib2.open(map, marker);
    });
    return {marker:marker,infoBox:ib1, infoMsg: ib2};
}
export { setPosMsg }