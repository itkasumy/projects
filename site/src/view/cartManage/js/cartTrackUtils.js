var nodeVideoOptions = {
    // content: "<canvas id='videoImg' width='445' height='255' style='margin:-24px 29px'></canvas>",
    content: `<div style="width: 100%; height: 100%;" style='margin:-24px 29px'>
        <img style="width: 100%; height: 100%;" src="../../../../static/images/login_bg.png" alt=""/>
    </div>`,
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(10, -120),
    zIndex: 10000,
    boxStyle: {
        backgroundImage: "url('../../../../static/images/node-video-bg.png')",
        height: "306px",
        width: "503px"
    },
    closeBoxMargin: "34px 34px 0px 0px",
    closeBoxURL: "../../../../static/images/device-label-close.png",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};
var nodePointOptions = {
    content: "<img  src='../../../../static/images/video-circle.png' />",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-46, -42),
    zIndex: 100,
    boxStyle: {},
    closeBoxMargin: "0px 0px 0px 0px",
    closeBoxURL: "",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};
var ib1 = new InfoBox(nodeVideoOptions);// 视频框
var ib2 = new InfoBox(nodePointOptions);// 发光效果的icon

var marker = new google.maps.Marker({
    draggable: false,
    title: '',
    icon: '',
});
const drawBigImg = (map, pos)=>{
    marker.setMap(map);
    marker.setPosition(pos);
    //添加点击事件
    ib1.open(map, marker);
    ib2.open(map, marker);
}

export {drawBigImg}






