var deviceLabelOptions = {
    content: '',
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-400,-400),
    zIndex: 0,
    boxStyle: {
        backgroundImage:"url('../static/images/test/radar-bg.png')",
        borderRadius:'7px',
        width: "800px",
        height:"800px",
        opacity:'1'
    },
    closeBoxMargin: "0px 0px 0px 0px",
    closeBoxURL: "",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};

var deviceSetOptions = {
    content: "",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-399,-399),
    zIndex: 0,
    boxStyle: {
        backgroundImage:"url('../static/images/test/radar-scan.png')",
        borderRadius:'7px',
        width: "800px",
        height:"800px",
       
    },
    boxClass:"radar-test",
    closeBoxURL: "",
    closeBoxMargin: "0px 0px 0px 0px",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: true
};
var ib1 = new InfoBox(deviceSetOptions);
var ib2 = new InfoBox(deviceLabelOptions);

function createRadarOverlay(map,pos,para) {
    var marker=new google.maps.Marker({
        draggable:false,
        position:pos,
        map:map,
        icon:"../static/images/empty-bg.png"
    });

    // var label1=new google.maps.Maplabel({
    //     fontColor: '#fff',
    //     strokeWeight:5,
    //     strokeColor: '#229fff',
    //     text:'设备名称1',
    // });

    
    // label1.bindTo('map',marker);
    // label1.bindTo('position',marker);
    ib2.open(map, marker);
    ib1.open(map, marker);
   
    //  });
    return {marker:marker,ib1:ib1,ib2:ib2};
}
export{createRadarOverlay}