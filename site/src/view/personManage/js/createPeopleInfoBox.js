const createContent = function (ius) {
	let start = `
		<div class="swiper-container">
	`
	let swiperItem = ''
	for (let i = 0 ;i < ius.length; i++) {
        let item = ius[i];
        if((i+1)%3 == 0){
            swiperItem += `<img src=${item.imgPath} class="cluster-img" id="${item.tFlag?item.tuId:item.uid}"/></div>`
        }else if(i%3 == 0){
            if(i == 0){
                swiperItem +=  `<div class="swiper-wrapper">`
            }
            swiperItem += `<div class="swiper-slide"><img src=${item.imgPath} class="cluster-img" id="${item.tFlag?item.tuId:item.uid}"/>`
        }else{
            swiperItem += `<img src=${item.imgPath} class="cluster-img" id="${item.tFlag?item.tuId:item.uid}"/>`
        }
    }
    if(swiperItem.charAt(swiperItem.length-2) != 'v'){
        swiperItem +=  `</div>`
    }
    swiperItem +=  `</div>`
    let end = `</div>`
	return start + swiperItem + end
}
var ib1;
function setIconOptions(isPeople) {
    var levelIconOptions;
    if(isPeople){
        levelIconOptions = {
            content: '',
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-46,-52),
            zIndex: null,
            boxStyle: {
                width: "352px",
                height: "281px",
                background: "url('../../../static/images/markersInCluster.png') no-repeat",
                overflowY:"hidden"
            },
            closeBoxURL: "../static/images/device-label-close.png",
            closeBoxMargin: "0px 0px 0px 0px",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };
    }else{
        levelIconOptions = {
            content: '',
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-46,-52),
            zIndex: null,
            boxStyle: {
                width: "352px",
                height: "281px",
                background: "url('../../../static/images/markersInClusterSus.png') no-repeat",
                overflowY:"hidden"
            },
            closeBoxURL: "../static/images/device-label-close.png",
            closeBoxMargin: "0px 0px 0px 0px",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };
    }
    ib1 = new InfoBox(levelIconOptions);
}
function createPeopleInfoBox(ius,isPeople = true) {
    var str = createContent(ius,isPeople)
    setIconOptions(isPeople);
    ib1.setContent(str);
    return ib1;
}
export{createPeopleInfoBox}