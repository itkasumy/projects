function createCountMsg(map,pos,para) {
    var deviceSetOptions = {
        content: "<img src='../static/images/count_back.png' id='ib'/>",
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-50,-50),
        zIndex: 0,
        boxStyle: {
        
        },
        closeBoxURL: "",
        closeBoxMargin: "0px 0px 0px 0px",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: true
    };
    var deviceLabelOptions = {
        content: "<span style='color:blue;font-size:20px;font-weight:bold;'>32</span><span style='color:white;font-size:14px;'>人</span>",
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(10,-10),
        zIndex: null,
        boxStyle: {
            backgroundColor:'transparent',
            width: "200px",
            height:'100px',
        },
        closeBoxMargin: "8px 8px 0px 0px",
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: true
    };
    var ib1 = new InfoBox(deviceSetOptions);
    var ib2 = new InfoBox(deviceLabelOptions);
    var marker=new google.maps.Marker({
        draggable:true,
        position:pos,
        title:'',
        icon:'../static/images/menuicon_f_18.png',
        map:map
    });

    ib1.open(map, marker);
    ib2.open(map,marker);
    return marker;

}
export{createCountMsg}