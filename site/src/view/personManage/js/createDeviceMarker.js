

var levelIconOptions = {
    content: "<div id='deviceExp' style='width:100%;height:100%'></div>",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(0,0),
    zIndex: null,
    boxStyle: {
        height:"20px",
        width:"30px",
        backgroundImage : "url('../static/images/warn_blue.png')",
    },
    closeBoxURL: "",
    closeBoxMargin: "0px 0px 0px 0px",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};

function createDeviceMarker(map,pos) {
    var ib1 = new InfoBox(levelIconOptions);
    ib1.setOptions({boxClass:"deviceTwinkling"})
    var marker=new google.maps.Marker({
        draggable:false,
        position:pos, 
        title:'',
        icon:'../static/images/empty-bg.png',
        map:map,
    });
    ib1.open(map, marker);
    return {marker:marker,ib:ib1};
}
export{createDeviceMarker}