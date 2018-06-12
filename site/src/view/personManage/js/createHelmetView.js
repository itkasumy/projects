import { dateFmt } from "../../../common/js/utils.js";
const noFound = '未知'

let publicFirstStr = `
	<div class="duty-record-list-back" id="infobox-left-style" style="background-image:url(''); margin-left:180px;">
	<div>
		<div class="sub-title">识别身份证</div>`

let publicLastStr = `
			<div class="duty-id-card-addr bottom-icon-text">
				<ul class="clearfix">
					<li><img src="../../../../static/images/helmet-location.png">位置</li>
					<li>识别身份证识别身份证识别身份证识别身份证识别身识别身别身识别身份证识别身份证识别身份证</li>
				</ul>
			</div>
		</div>
	</div>
`

const type2text = {
	'0': '人脸识别',
	'1': '身份证识别',
	'2': '驾驶证识别',
	'3': '车牌识别',
}

const getPublicFirstStr = ( subTitle )=>{
	return `
	<div class="duty-record-list-back" id="infobox-left-style" style="background-image:url(''); margin-left:180px;">
		<div>
			<div class="sub-title">${subTitle || noFound}</div>`
}

// 
const getPublicLastStr = function ( location ){
	return `
	</div>
		<div class="duty-id-card-addr bottom-icon-text">
			<ul class="clearfix">
				<li><img src="../../../../static/images/helmet-location.png">位置</li>
				<li> ${location || noFound}</li>
			</ul>
		</div>
	</div>
	`
}

// 身份证
const getIdCard = function (msg) {
	let firstStr = getPublicFirstStr(type2text[msg.papersType])
	let lastStr = getPublicLastStr(msg.location)
	let m = `
		<div class="duty-id-card-body clearfix" >
			<div class="duty-id-card-content">
				<ul class="clearfix">
					<li class="clearfix mr26"><span class="fl">姓</span><span class="fr">名</span></li>
					<li class="value person-name fl">${msg.name|| noFound}</li>
				</ul>
				<ul class="clearfix">
					<li class="clearfix mr26"><span class="fl">性</span><span class="fr">别</span></li>
					<li class="value">${msg.sex|| noFound}</li>
					<li class="sp">
						<div class="fl" style="margin-right: 16px;">民族</div>
						<div class="fl value">${msg.nation|| noFound}</div>
					</li>
				</ul>
				<ul class="clearfix">
					<li class="clearfix mr26"><span class="fl">出</span><span class="fr">生</span></li>
					<li class="value">${msg.birth && (msg.birth.slice(0, 4)+'&nbsp;年&nbsp;' + msg.birth.slice(5, 7) +'&nbsp;月&nbsp;'+msg.birth.slice(8, 9) +'&nbsp;日')}</li>
				</ul>
				<ul class="clearfix">
					<li class="clearfix mr26"><span class="fl">籍</span><span class="fr">贯</span></li>
					<li class="value address fl">${msg.home|| noFound}</li>
				</ul>
			</div>
			<div>
				<img src="/upload/showImg?id=${msg.uploadId}&moudle=trace" width="87" height="102" class="duty-id-card-img">
			</div>
		</div>
		<div class="duty-id-card-num">
			<div>
				<span class="title">身份证号码</span>
				<span class="value">${msg.sfzCard|| noFound}</span>
			</div>
		</div>
	`
	return firstStr + m + lastStr
}

// 驾驶证
const getDriverLicense = function (msg) {
	let firstStr = getPublicFirstStr(type2text[msg.papersType])
	let lastStr = getPublicLastStr(msg.location)
	let m = `
	<div class="duty-driver-license-body" >
		<ul class="one clearfix">
			<li><span>姓名</span><span>${msg.name|| noFound}</span></li>
			<li><span>性别</span><span>${msg.sex|| noFound}</span></li>
			<li><span>国籍</span><span>${msg.nationality|| noFound}</span></li>
		</ul>
		<ul class="two">
			<li class="clearfix"><span class="fl">籍贯</span><span class="fl">${msg.home|| noFound}</span></li>
			<li><span>出生日期</span><span>${msg.birth|| noFound}</span></li>
			<li><span>初次领证日期</span><span>${msg.firstDriveTime|| noFound}</span></li>
			<li><span>准驾车型</span><span>${msg.driverType|| noFound}</span></li>
			<li><span>有效期</span><span>${msg.jzStartDate|| noFound}&nbsp;至&nbsp;${msg.jzEndDate|| noFound}</span></li>
		</ul>
		<img src="/upload/showImg?id=${msg.uploadId}&moudle=trace" width="68" height="80" class="duty-car-img">
	</div>`
	return firstStr + m + lastStr
}

// 人脸
const getFace = function (msg) {
	let firstStr = getPublicFirstStr(type2text[msg.papersType])
	let lastStr = getPublicLastStr(msg.location)

	let noSwiper = msg.pictureList.length > 3? '': 'swiper-no-swiping'
	let navigation = msg.pictureList.length <= 3 ? '' : `
		<div class="swiper-button-next"><img class="prev" src="../../../../static/images/helmetSlider_right.png"/></div>
		<div class="swiper-button-prev"><img class="next" src="../../../../static/images/helmetSlider_left.png"/></div>
	`
	let swiperItem = ''
	for (let i = 0, len = msg.pictureList.length; i < len; i++) {
		let item = msg.pictureList[i]
		swiperItem += `<div class="swiper-slide ${noSwiper}">
										<img width="87" height="102" src="/upload/showImg?id=${item.upId}&moudle=trace"/>
										<div class="person-name">${item.personName|| noFound}</div>
									</div>`
	}
	
	var m = `
		<div class="duty-face-body duty-face-body-infobox">
			<div class="swiper-wrapper">
				${swiperItem}
			</div>
			` + navigation

	return firstStr + m + lastStr
}

// 车牌
const getPlateNum = function (msg) {
	let firstStr = getPublicFirstStr(type2text[msg.papersType])
	let lastStr = getPublicLastStr(msg.location)
	let m = `
		<div class="duty-plate-num-body" >
			<div class="duty-plate-num-top">
				<div>
					<span>车牌颜色</span><span>${msg.carNumcolor|| noFound}</span>
				</div>
				<div class="sp">
					<span>车牌号</span>
					<span>${msg.carNum|| noFound}</span>
				</div>
			</div>
		</div>
	`
	return firstStr + m + lastStr
}


// 配置项

// 右边散射出来的部分
var deviceLabelOptions = {
	content: "",
	disableAutoPan: false,
	maxWidth: 0,
	pixelOffset: new google.maps.Size(35, -158),
	boxStyle: {
		backgroundImage: "url('../static/images/helmet_police_readBg.png')",
		borderRadius: '7px',
		width: "955px",
		height: "320px",
		opacity: '1'
	},
	closeBoxMargin: "0px 0px 0px 0px",
	closeBoxURL: "",
	infoBoxClearance: new google.maps.Size(1, 1),
	isHidden: false,
	pane: "floatPane",
	enableEventPropagation: false
};

// 左边头盔信息
var deviceSetOptions = {
	content: "<div style='color:white;margin-top:58px; font-size:12px'>未知</div>",
	disableAutoPan: false,
	maxWidth: 0,
	pixelOffset: new google.maps.Size(-55, -65),
	zIndex: 0,
	boxStyle: {
		backgroundImage: "url('../static/images/helmet-policeMap.png')",
		borderRadius: '7px',
		width: "115px",
		height: "115px",
	},
	boxClass: "radar-test-x",
	closeBoxURL: "",
	closeBoxMargin: "0px 0px 0px 0px",
	infoBoxClearance: new google.maps.Size(1, 1),
	isHidden: false,
	pane: "floatPane",
	enableEventPropagation: true
};

// 视频直播
var liveVideo = {
	content: `<div style='color:white; height:100%; font-size:12px'>
		<div id="helmetLiveVideo" class="prism-player" style="width: 100%; height: 100%;">
		</div>
	</div>`,
	disableAutoPan: false,
	maxWidth: 0,
	pixelOffset: new google.maps.Size(602, -90),
	zIndex: 0,
	boxStyle: {
		backgroundColor: "transparent",
		// borderRadius: '7px',
		width: "348px",
		height: "204px",
	},
	closeBoxURL: "",
	closeBoxMargin: "0px 0px 0px 0px",
	infoBoxClearance: new google.maps.Size(1, 1),
	isHidden: false,
	pane: "floatPane",
	enableEventPropagation: true
};
liveVideo = {
	content: `<div style='color:white; height:100%; font-size:12px'>
			<video id="example_video_1" class="video-js vjs-default-skin" controls preload="true">
			</video>
	</div>`,
	disableAutoPan: false,
	maxWidth: 0,
	pixelOffset: new google.maps.Size(602, -90),
	zIndex: 0,
	boxStyle: {
		backgroundColor: "transparent",
		// borderRadius: '7px',
		width: "348px",
		height: "204px",
	},
	closeBoxURL: "",
	closeBoxMargin: "0px 0px 0px 0px",
	infoBoxClearance: new google.maps.Size(1, 1),
	isHidden: false,
	pane: "floatPane",
	enableEventPropagation: true
};




// 左边头盔
var ib1 = new InfoBox(deviceSetOptions);
// 右边信息
var ib2 = new InfoBox(deviceLabelOptions);

var ibLive = new InfoBox(liveVideo)

function createHelmetView(map, pos, para = {}) {
	let str = ''

	para.papersType = para.papersType + ''
	switch (para.papersType) {
		case '0':// 人脸
			str = getFace(para)// TODO
			break;
		case '1':// 身份证
			str = getIdCard(para)
			break;
		case '2':// 驾驶证
			str = getDriverLicense(para)// TODO
			break;
		case '3': // 车牌
			str = getPlateNum(para)
			break;
	}

	ib2.setContent(str);
	ib1.setContent(`<div style='color:white;margin-top:58px; font-size:12px'>${para.policeName ? (para.policeName.length > 5 ? para.policeName.slice(0, 5) + '...': para.policeName) : '未知'}</div>`)
	var marker = new google.maps.Marker({
		draggable: false,
		position: pos,
		map: map,
		icon: "'../static/images/empty-bg.png",
	});
	ib2.open(map, marker);
	ib1.open(map, marker);
	ibLive.open(map, marker);
	return marker;
}
export { createHelmetView }







/**
 * 
 * 
 * 
 * 
	//测试数据
	// para['name'] = '测试数据'
	let publicFirstStr = `
		<div class="duty-record-list-back" id="infobox-left-style" style="background-image:url(''); margin-left:180px;">
		<div>
			<div class="sub-title">识别身份证</div>`

	let publicLastStr = `
			<div class="duty-id-card-addr bottom-icon-text">
				<ul class="clearfix">
					<li><img src="../../../../static/images/helmet-location.png">位置</li>
					<li>识别身份证识别身份证识别身份证识别身份证识别身识别身别身识别身份证识别身份证识别身份证</li>
				</ul>
			</div>
		</div>
		</div>
	`

	let idCard = publicFirstStr + `
			<div class="duty-id-card-body clearfix" >
				<div class="duty-id-card-content">
					<ul class="clearfix">
						<li class="clearfix mr26"><span class="fl">姓</span><span class="fr">名</span></li>
						<li class="value person-name fl">识别身份份证识别身份</li>
					</ul>
					<ul class="clearfix">
						<li class="clearfix mr26"><span class="fl">性</span><span class="fr">别</span></li>
						<li class="value">男</li>
						<li class="sp">
							<div class="fl" style="margin-right: 16px;">民族</div>
							<div class="fl value">维吾尔族</div>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="clearfix mr26"><span class="fl">出</span><span class="fr">生</span></li>
						<li class="value">1999年09月12日</li>
					</ul>
					<ul class="clearfix">
						<li class="clearfix mr26"><span class="fl">籍</span><span class="fr">贯</span></li>
						<li class="value address fl">识别身份证身份证识别身份</li>
					</ul>
				</div>
				<div>
					<img src="" width="87" height="102" class="duty-id-card-img">
				</div>
			</div>
			<div class="duty-id-card-num">
				<div>
					<span class="title">身份证号码</span>
					<span class="value">44444444444444452525</span>
				</div>
			</div>
	` + publicLastStr

	let driverLicense = publicFirstStr + `
		<div class="duty-driver-license-body" >
			<ul class="one clearfix">
				<li><span>姓名</span><span>张三张三张三三</span></li>
				<li><span>性别</span><span>男</span></li>
				<li><span>国籍</span><span>巴尔吉萨</span></li>
			</ul>
			<ul class="two">
				<!-- 过长保护 -->
				<li class="clearfix"><span class="fl">籍贯</span><span class="fl">广东省深圳是广东省深圳是广东
					省深圳是深圳是深圳是深圳是深圳是深圳是</span></li>
				<li><span>出生日期</span><span>1999.12.36</span></li>
				<li><span>初次领证日期</span><span>1999.12.36</span></li>
				<li><span>准驾车型</span><span>A2</span></li>
				<li><span>有效期</span><span>1999.12.36&nbsp;至&nbsp;1999.12.36</span></li>
			</ul>
			<img src="" width="68" height="80" class="duty-car-img">
		</div>
	` + publicLastStr

	let face = publicFirstStr + `
		<div class="duty-face-body duty-face-body-infobox">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img width="87" height="102" src=" "/>
					<div class="person-name">世界属于三体</div>
				</div>
				<div class="swiper-slide">
					<img width="87" height="102" src=" "/>
					<div class="person-name">世界属于三体</div>
				</div>
				<div class="swiper-slide">
					<img width="87" height="102" src=" "/>
					<div class="person-name">世界属于三体</div>
				</div>
				<div class="swiper-slide">
					<img width="87" height="102" src=" "/>
					<div class="person-name">世界属于三体</div>
				</div>
				<div class="swiper-slide">
					<img width="87" height="102" src=" "/>
					<div class="person-name">世界属于三体</div>
				</div>
			</div>
			<div class="swiper-button-next"><img class="prev" src="../../../../static/images/helmetSlider_right.png"/></div>
			<div class="swiper-button-prev"><img class="next" src="../../../../static/images/helmetSlider_left.png"/></div>
		</div>
	` + publicLastStr

	let plateNum = publicFirstStr + `
		<div class="duty-plate-num-body" >
			<div class="duty-plate-num-top">
				<div>
					<span>车牌颜色</span><span>蓝色</span>
				</div>
				<div class="sp">
					<span>车牌号</span>
					<span>粤·A20002</span>
				</div>
			</div>
		</div>
		` + publicLastStr
console.log( para )
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


/**
 * 
 * 
 * // 驾照
var driverLicense_x =
	` <div class="duty-record-list-back" style=" background-image:url(''); margin-left:180px; margin-top:43px;  ">
    <div style="margin-right:4px font-weight: bold;color:#7bfafd">识别驾驶证</div>
    <div class="duty-driver-license-body" >
    <div class="duty-driver-license-top">
    <ul>
        <li style="width:13%">姓名</li>
        <li style="width:20%">{{item.name}}</li>
        <li style="width:13%">性别</li>
        <li style="width:20%">{{item.sex||"未知"}}</li>
        <li style="width:13%">国籍</li>
        <li style="width:21%" :title="item.country">{{item.country||"未知"}}</li>
    </ul>
    <ul>
        <li style="width:13%">籍贯</li>
        <li style="width:87%" :title="item.home">{{item.home}}</li>
    </ul>
    </div>

    <div class="duty-driver-license-mid">
        <ul>
        <li style="width:28%">出生日期</li>
        <li style="width:72%">{{item.birth}}</li>
        </ul>
        <ul>
        <li style="width:39%">初次领证日期</li>
        <li style="width:61%">{{item.firstDriveTime}}</li>
        </ul>
        <ul>
        <li style="width:28%">准驾车型</li>
        <li  style="width:72%">{{item.driverType}}</li>
        </ul>
        <ul>
        <li style="width:22%">有效期</li>
        <li style="width:78%">{{item.jzStartDate}}  至  {{item.jzEndDate}}</li>
        </ul>
    </div>
    <div>
        <img src="" width="70" height="80" class="duty-id-card-img">
    </div>
    </div>
    <div class="duty-driver-license-bot">
        <ul>
        <li style="width:17%;"> <img :src="iAddr"/> 位置</li>
        <li style="width:83%; " :title="item.addr">{{item.addr||"未知"}}</li>
        </ul>
        <ul>
        <li style="width:17%;"><img :src="iTime"/> 时间</li>
        <li style="width:83%; ">{{dateToString(item.discernTime)}}</li>
        </ul>
    </div>
    </div>
    </div>
    `

//c车牌
var plateNum_x =
	` 
    <div class="duty-record-list-back" style=" background-image:url(''); margin-left:180px; margin-top:43px;  ">
    <!--识别车牌  -->
    <div v-if="item.papersType=='3'">
    <div style="margin-right:5px font-weight:bold;color:#7bfafd">识别车牌</div>
    <div class="duty-plate-num-body" >
    <div class="duty-plate-num-top">
        <ul>``
        <li style="width:30%;letter-spacing: 2px; ">车牌颜色</li>
        <li style="width:70%">{{item.carNumcolor}}</li>
        </ul>
        <ul>
        <li style="width:30%;letter-spacing: 2px;">车牌号</li>
        <li style="width:70%; letter-spacing: 4px; font-size:16px">{{item.carNum}}</li>
        </ul>
    </div>

    </div>
    <div class="duty-plate-num-bot">
        <ul>
            <li style="width:17%;"> <img :src="iAddr"/> 位置</li>
            <li style="width:83%; " :title="item.addr">{{item.addr||"未知"}}</li>
        </ul>
        <ul>
            <li style="width:17%;"><img :src="iTime"/> 时间</li>
            <li style="width:83%;">{{dateToString(item.discernTime)}}</li>
        </ul>
    </div>
    </div>
    </div>
    `

// 人脸
var face_x =
	`
    <div class="duty-record-list-back" style=" background-image:url(''); margin-left:180px; margin-top:43px;  ">
    <!--识别人脸  -->
    <div style="margin-right:5px; font-weight: bold;color:#7bfafd"> 识别人脸</div>
    <div class="duty-face-label" style="overflow: hidden;margin-top: 20px;" >
        <div class="swiper-wrapper">
            <div class="swiper-slide">
            <img width="75" height="90" src=" "/>
            <div>一二三</div>
            </div>
            <div class="swiper-slide">
                <img width="75" height="90" src=" "/>
                <div>一二三</div>
            </div>
            <div class="swiper-slide">
                <img width="75" height="90" src=" "/>
                <div>一二三</div>
            </div>
            <div class="swiper-slide">
                <img width="75" height="90" src=" "/>
                <div>一二三</div>
            </div>
            <div class="swiper-slide">
                <img width="75" height="90" src=" "/>
                <div>一二三</div>
            </div>
        </div>
    </div>
    <div style="display:inline-block; "> <img class="prev" :src="iAddr" style="display:block;"/> <img class="next" :src="iTime" style="display:block; margin-top:5px"/></div>
    <div class="duty-face-bot">
        <ul>
            <li style="width:17%;"> <img :src="iAddr"/> 位置</li>
            <li style="width:83%; " :title="item.addr">{{item.addr||"未知"}}</li>
        </ul>
            <ul>
            <li style="width:17%;"><img :src="iTime"/> 时间</li>
            <li style="width:83%;">{{dateToString(item.discernTime)}}</li>
        </ul>
    </div>
</div>`

	//身份证
var idCard_x = `
	<div class="duty-record-list-back" style=" background-image:url(''); margin-left:180px; margin-top:43px;">
		<div style="margin-right:5px;font:14px bold;color:#7bfafd">识别身份证</div>
		<div class="duty-id-card-body" >
			<div class="duty-id-card-content">
				<ul>
						<li>姓名</li>
						<li>'未知'}</li>
				</ul>
				<ul>
						<li style="width:22%">性别</li>
						<li style="width:28%"> '未知'}</li>
						<li style="width:22%">民族</li>
						<li style="width:28%"> '未知'}</li>
				</ul>
				<ul>
						<li>出生</li>
						<li>|| '未知'}</li>
				</ul>
				<ul>
						<li>籍贯</li>
						<li class="duty-id-card-native" style="display: -webkit-box" title="${'未知'}">${'未知'}</li>
				</ul>
			</div>
			<div>
				<img src="" width="75" height="90" class="duty-id-card-img">
			</div>
		</div>
		<div class="duty-id-card-num">
			<ul>
				<li style="width:25%;">身份证号码</li>
				<li style="width:75%; letter-spacing: 3px;">${"未知"}</li>
			</ul>
		</div>
		<div class="duty-id-card-addr">
			<ul>
				<li style="width:17%;"><img :src="iAddr"/> 位置</li>
				<li style="width:83%; " title="未知"}"未知"}</li>
			</ul>
		</div>
	</div>
`
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */