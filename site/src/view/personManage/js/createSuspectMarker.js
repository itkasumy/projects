

var levelIconOptions = {
    content: "<img src='../static/images/video-circle.png'/>",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-46,-52),
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
var ib1 = new InfoBox(levelIconOptions);
function createSuspectMarker(map,pos) {
    let marker=new google.maps.Marker({
        draggable:false,
        position:pos, 
        title:'',
        icon:'../static/images/index_suspect.png',
        map:map,
    });
     return {marker:marker,ib:ib1};
}
export{createSuspectMarker}