

var levelIconOptions = {
    content: "<img src='../static/images/no-photo.png' style='width:36px;-webkit-clip-path:circle(18px at 50% 50%);'/>",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-16,-56),
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

function setLevelIcon(map,pos,para) {
    var ib1 = new InfoBox(levelIconOptions);
    var marker=new google.maps.Marker({
        draggable:false,
        position:pos, 
        clickable:false,
        title:'',
        icon:'../static/images/person-icon-bg.png',
        map:map,
    });
     ib1.open(map, marker);
     return {marker:marker,infoBox:ib1};
}
export{setLevelIcon}