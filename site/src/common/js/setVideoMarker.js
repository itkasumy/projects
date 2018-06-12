import  "./frameAnimation.js";
//定义infoBox
var nodeVideoOptions = {

    content: `
    <canvas id='videoImg' width='445' height='255' style='margin:-24px 29px; border-radius: 5px;'></canvas>
    <img src="../static/images/loading.gif" id="loading" style="position:absolute;display:none;top:124px;left:224px;">
    <div id='toBig' style='display:none;position:absolute;width:30px;height:30px;bottom:28px;  border-radius:23%; border:1px dashed #73eded; right: 40px;'>
        <img src='../static/images/screen_toBig.png' style='margin-top:5px' id='toBig' height='20' width='20'/>
    </div>`,
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(10, -20),
    zIndex: 10000,
    boxStyle: {
      backgroundImage: "url('../static/images/node-video-bg.png')",
      height: "306px",
      width: "503px"
    },
    closeBoxMargin: "34px 34px 0px 0px",
    closeBoxURL: "../static/images/device-label-close.png",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};
// function getImg(isChange) {
//     if(this.selected.personTest != undefined){
//         if(this.selected.personTest.identityId != undefined){
//             if(sessionStorage.getItem('max') == null){
//                 this.getImages(this.selected.personTest.identityId,isChange,"0")
//             }else{
//                 this.getImages(this.selected.personTest.identityId,isChange,sessionStorage.getItem('max'))
//             }

//         }
//     }
// }
function drawVideo(s) {
    var canvas = document.getElementById('videoImg');
    var _self = this;
    if (canvas && canvas.getContext && 26 > s) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        let tempPath = "../static/images/test/";
        img.src = tempPath + s + ".jpg";
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

    }
}
var nodePointOptions = {
    content: "<img  src='../static/images/video-circle.png' />",
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(-46, -42),
    zIndex: 100,
    boxStyle: {
    },
    closeBoxMargin: "0px 0px 0px 0px",
    closeBoxURL: "",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};


var ib1 = new InfoBox(nodeVideoOptions);
var ib2 = new InfoBox(nodePointOptions);
//定义marker
var marker = new google.maps.Marker({
    draggable: false,
    title: '',
    icon: '../static/images/empty-bg.png',
});
var i = 1;
var isPlay = false;
function playA(framesUrl,size) {
    let play = framesUrl.slice(size*(i-1),Math.min(size*i,framesUrl.length));
    if(size*i<framesUrl.length){
        let ani = new frame_ani({
            canvasTargetId: "videoImg", // target canvas ID
            framesUrl: play, // frames url
            loop: false, // if loop
            frequency: 3, // count of frames in one second
            onStart: function () { // complete callback
                console.log("start"+i);
            },
            onComplete:function () {
                console.log("complete"+i);
                // isPlay = false;
                i++;
            playA(framesUrl,size);
            }
        });
        ani.initialize(() => {
            console.log('initial'+i);
            // if(i == 1 || (i > 1 && isPlay == false)){
                ani.play();
                // isPlay = true;
            // }
            // i++;
            // playA(framesUrl);
        });
    }else{
        play_animation(play);
    }
}

function play_animation(framesUrl) {
    // var framesUrl = [];
    // for (let i = 1; i < 27; i++) {
    //     framesUrl.push('../static/images/test/' + i + '.jpg');
    // }

    // frame animation
    // console.log(framesUrl);
    let ani = new frame_ani({
        canvasTargetId: "videoImg", // target canvas ID
        framesUrl: framesUrl, // frames url
        loop: false, // if loop
        frequency: 3, // count of frames in one second
        isPlay:false,
        onStart:function (total) {
            if(total == framesUrl.length){
                $("#loading").show();
            }
        },
        onComplete: function () { // complete callback
            console.log("video end");
         
        },
    });
    // preload & play
    ani.initialize(() => {
        $("#toBig").show();
        $("#loading").hide();
        ani.play();
    });
}

export const setNodeVideo = (map, pos, para) => {
    //对象赋值
    marker.setMap(map);
    marker.setPosition(pos);
    //添加点击事件
    ib1.open(map, marker);
    ib2.open(map, marker);
    ib1.addListener('closeclick',function () {
        ib2.close();
    })
    var imgIndex = 0
    let flag = true
    // console.log(para.imgList);
    if(para && para.imgList){
        ib1.addListener('domready', () => {
            if(flag){
                flag = false
                i = 1;
                play_animation(para.imgList)
                // playA(para.imgList,10);
            }
            
            // var imgIndex = 0
            // var drawInterval = setInterval(function () {
            //     imgIndex >= 26 ? clearInterval(drawInterval) : drawVideo(imgIndex++);
            // }, 300)
        })
    }
    else{
        console.log( "无图片可播放" )
    }
    return {marker:marker,ib1:ib1,ib2:ib2};
}