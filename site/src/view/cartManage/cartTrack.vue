<template>
 <div class="car-track" id="map">
  <el-main id="car-track">
    <div id="allmap" style ="width:100%; height:100%" ></div>
    <div class="search-result">
      <div class="search">
        <div class="s-left">
          <div class="license">
            <el-input
              placeholder="请输入车牌号进行搜索"
              :maxlength="9"
              @input.native="eInputCarNumber"
              v-model="carNumber">
            </el-input>
            <i class="el-icon-close" @click="eClearCarNumber" v-show="!!carNumber.length"></i>
          </div>
        </div>
        <div class="s-right">
          <div class="date">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              :editable="false"
              size="mini"
              :time-arrow-control="true"
              :picker-options="pickerOptionsRange"
              popper-class="cart-track-fs-datepicker"
              @change="eSelectDateRange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
							value-format="yyyy-MM-dd HH:mm:ss"
              prefix-icon="el-icon-date"
              :appendToBody="false"
              align="left">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="result">
        <div class="top clearfix">
          <p>共搜索<b>{{resultCount}}</b>条结果</p>
          <el-button type='text' @click="eReset">重置</el-button>
        </div>
        <div class="content">
          <ul>
            <li  
              v-for="(item, index) in leftList"
              @click="eClickLeftLi(index, item)"
              :class="{active: !!item.isHighLight}"  
              :key="index"
            >
              <img v-show="!item.isHighLight" src="../../assets/images/car_white.png" alt="">
              <img v-show="!!item.isHighLight" src="../../assets/images/car_blue.png" alt="">
              <p>{{item.plateNo}}</p>
              <i v-if="item.targetKeyFlag == 0" @click.stop="eClickLeftRemark(item.carTargetId, true, item)"></i><!-- 0是重点 -->
              <i v-else class="noremark" @click.stop="eClickLeftRemark(item.carTargetId, false, item)"></i>
            </li>
          </ul>
        </div>
        <div class="triangles">
          <i class="l-t"></i>
          <i class="r-t"></i>
          <i class="l-b"></i>
          <i class="r-b"></i>
        </div>
      </div>
    </div>
  </el-main>
 </div>
</template>

<script >
import { createMap } from "@/common/js/createMap.js";
import { setPosMsg } from "@/common/js/setPosMsg.js";
import { setAreaName } from "@/common/js/setAreaName";
import { createPolygon } from "@/common/js/createPolygon";
import { setMapCenter } from "../intelligence/js/setMapCenter";
import { deviceIcon, deviceMarker, deviceMarkerHL } from "../intelligence/js/iconPath";
import {errorException, successTip, errorTip, confirmModal} from '../intelligence/js/tip'
import {debounce} from '../intelligence/js/utils'
import { setNodeVideo } from "../../common/js/setVideoMarker.js";
import {drawBigImg} from './js/cartTrackUtils'
import {dateFmt} from '../../common/js/utils'
import {addClass, removeClass} from '../intelligence/js/utils'

import BASE from "../intelligence/js/basePath";
const BASEPATH = BASE.BASEPATH_CAR_HAN
const LINE_STYLE = {
  strokeOpacity: 0.5,
  strokeWeight: "4",
  strokeColor: "#fc2d2a",
  zIndex: 10
}
const CIRCLE_STYLE = {
  strokeColor: "#fff",
  strokeWeight: 2,
  strokeOpacity:0.8,
  fillColor: "#fc2d2a",
  fillOpacity: 1,
  draggable: false,
  radius: 2,
  zIndex: 99,
}
let lat1 = 31.241464018821716
let lng1 = 121.4839893579483
let lat2 = 31.240755915641785
let lng2 = 121.48391425609589
let lat3 = 31.241281628608704
let lng3 = 121.48547530174255
let lat4 = 31.241061687469482
let lng4 = 121.48542165756226

export default {
  data() {
    return {
      carNumber: "",
      lastMarkerIcon: require('../../assets/images/car_focus.png'),
      targetCarIcon: require('../../assets/images/remark.png'),

      resultCount: 0,
      leftList: [],
      date: [],// 24小时
			leftLiSelectIndex: "",
			// leftLiSelectItem: null,
      leftList: [
        // {carNumber: '粤B.66666', isRemark: true, carId: 'carIdx', targetKeyFlag: 0},// 是否是重点人员
        // {
        //   carTargetId: 'x',
        //   targetKeyFlag: 0, // 0：重点,1:非重点
        //   plateNo： 'x', //车牌
        // }
      ],
      changeActiveStateItem:null,
      pickerOptionsRange: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      map: null,

      linePool: [],
      activeLinePool: [],

      normalCirclePool: [],
      activeNormalCirclePool: [[], []],// 第一个保留circle，第二个保留句柄

      // 最后一点大的Marker,和一个红色的叹号
      LastMarker: null,
      infoBoxCarPic: null,
			redInfoBoxWidthLastMarker: null,

			curSelectItem: null,
			prevHighLightItem: null,

			shotMarker: null,
			shotIb1: null,
			shotIb2: null,
    };
	},
	computed: {
	},
  created(){
    let timeStamp = this.$route.query.timeStamp && parseInt(this.$route.query.timeStamp)
    this.carNumber = this.$route.query.carNumber? decodeURI(this.$route.query.carNumber): ''
    // this.carNumber = '陕C89757'
    timeStamp ? 
      (this.date = [new Date(timeStamp - 12*3600*1000), new Date(timeStamp + 12*3600*1000)])
      : null
    this.carNumber? this.handleQueryParams(): this._getLeftList()
    
  },
  mounted() {
    this.map = createMap("allmap")
    setTimeout(() => this.__fs(), 0);
  },
  methods: {
    __fs(){
      let fullscree, el, fs, ps, map1, emitter
      this.$root.Bus.$on('fullScreen',value => {
        fullscree = fullscree || require('fullscreen')
        el = el || document.getElementById('map')
        fs = fs || fullscree(el)
        ps = ps || document.getElementById('car-track')
        map1 = map1 || document.getElementById('allmap')
        
        if(value){
          addClass(el, 'elAdd')
          addClass(map1, 'mapAdd')
          addClass(ps, 'psAdd')
          fs.request()
        }
        emitter = emitter || fs.on('release', () => {
          removeClass(el, 'elAdd')
          removeClass(map1, 'mapAdd')
          removeClass(ps, 'psAdd')
        })
      })
    },

    // fetch
    _getLeftList () {
       let option = {
        method: 'GET',
        url: `${BASEPATH}/trace/carTrace/findCarTraListInMap?plateNO=${this.carNumber}`
      }
      this.$axios(option)
        .then(( data )=>{
          this.handleGetLeftList(data.data)
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    _getCarDetail () {
      let option = {
        method: 'POST',
				url: `${BASEPATH}/trace/carTrace/findCarTraceById`,
				data: {
					plateNO: this.prevHighLightItem.plateNo,
					carTraceId: this.prevHighLightItem.carTargetId,
					startTime: this.date[0],
					endTime: this.date[1]
				}
      }
      this.$axios(option)
        .then(( data )=>{
          this.handleGetCarDetail(data.data)
        })
       .catch((e)=>{this.mCatchException(e)})
    },
    _setTargetCar (carTargetId) {
      let option = {
        method: 'GET',
        url: `${BASEPATH}/trace/carTrace/setTargetCarKey?carTargetId=${carTargetId}`
      }
      this.$axios(option)
        .then(( data )=>{
          this.handleSetTargetCar(data.data)
        }).catch((e)=>{this.mCatchException(e)})
      
    },
    _cancelTargetTar (carTargetId) {
      let option = {
        method: 'GET',
        url: `${BASEPATH}/trace/carTrace/cancelTargetCarKey?carTargetId=${carTargetId}`
      }
      this.$axios(option)
        .then(( data )=>{
          this.handleCancelTargetTar(data.data)
        }).catch((e)=>{this.mCatchException(e)})
    },
    // handle

    handleQueryParams() {
      let option = {
        method: 'GET',
        url: `${BASEPATH}/trace/carTrace/findCarTraListInMap?plateNO=${this.carNumber}`
      }
      this.$axios(option)
        .then(( data )=>{
          this.leftList = data.data.targetCarList.map( v =>{
              v.isHighLight = false
					    return v
          })
          if (!this.leftList.length)  return

          let item = this.leftList[0]

          item.isHighLight = true
					this.prevHighLightItem = item
          this.curSelectItem = item
          if (!this.date.length) {
            this.date = [new Date(Date.now() - 12 * 3600 * 1000), new Date(Date.now() + 12 * 3600 * 1000)] 
          }
          this._getCarDetail()

        })
        .catch((e)=>{this.mCatchException(e)})
    },
    handleGetLeftList (data) {
			this.leftList = data.targetCarList.map(( v,i )=>{
					v.isHighLight = false
					return v
			})
			let arr = this.leftList
			let leng = arr.length
			this.resultCount = leng
			for (let i = 0, len = leng; i < len; i++) {
				let item = arr[i]
				if (this.prevHighLightItem && (this.prevHighLightItem.carTargetId == item.carTargetId)) {
					item.isHighLight = true
					this.prevHighLightItem = item
					this.curSelectItem = item
				}
			}
    },
    handleSetTargetCar (data) {
      this.mSuccessTip('已将该车辆设置为重点车辆！')
      this.changeActiveStateItem.targetKeyFlag = '0'
      if (this.curSelectItem && 
        (this.changeActiveStateItem.carTargetId == this.curSelectItem.carTargetId)
      ) {
				this.drawRedInfoBoxWidthLastMarker()
			}
    },
    handleCancelTargetTar (data) {
      this.mSuccessTip('已将该车辆设置为非重点车辆！')
			this.changeActiveStateItem.targetKeyFlag = '1'
			if (this.curSelectItem && 
        (this.changeActiveStateItem.carTargetId == this.curSelectItem.carTargetId)
      ) {
				this.resetRedInfoBoxWidthLastMarker()
			}
    },
    handleGetCarDetail (data) {
			this.draw(data)
    },

    // directFn
    resetDraw () {
      this.resetLine()
      this.resetNormalCircle()
      this.resetRedInfoBoxWidthLastMarker()
      this.resetInfoBoxCarPic()
			this.resetLastMarker()
			this.resetCarShot()
    },
    draw (data) {
			this.resetDraw()
			let len = data.length
			if (len == 0) {
				this.mErrorTip('当前时间没有捕捉到该车辆轨迹！')
			}else if (len == 1) {
				this.drawLastMarker({lat: data[0].lat, lng: data[1].lng})
				this.drawInfoBoxCarPic(data[len - 1].filePath)
				// this.drawInfoBoxCarPic()
			}else if(len > 1){
				this.map.setCenter(new google.maps.LatLng(data[len-1].lat, data[len-1].lng))
				this.drawLastMarker({lat: data[len-1].lat, lng: data[len-1].lng})
				this.drawInfoBoxCarPic(data[len - 1].filePath)
				// this.drawInfoBoxCarPic()
				if (this.curSelectItem.targetKeyFlag == 0) {
					this.drawRedInfoBoxWidthLastMarker()
				}
				data.forEach((v, i, arr)=>{
					this.drawNormalCircle({lat: v.lat, lng: v.lng}, v.filePath)
					// this.drawNormalCircle({lat: v.lat, lng: v.lng}, '../../../static/images/person-ex.jpg')
					if (i < arr.length - 1) {
						this.drawLine([{lat: v.lat, lng: v.lng}, {lat: arr[i + 1].lat, lng: arr[i + 1].lng}])
					}
				})
			}
    },
    
    addListener (target, eventType, callback) {
      return google.maps.event.addListener(target, eventType, callback);
    },
    removeListener (listener) {
      return google.maps.event.removeListener(listener);//移除某个具体的事件具体的执行函数
    },

    // draw
    resetLine () {
      let arr = this.activeLinePool
      for (let i = 0, len = arr.length; i < len; i++) {
        let line = arr[i]
        line.setMap(null)
        this.linePool.push(line)
      }
      this.activeLinePool = []
    },
    resetNormalCircle () {
      let arr = this.activeNormalCirclePool[0]
      for (let i = 0, len = arr.length; i < len; i++) {
        let circle = arr[i]
        circle.setMap(null)
        this.normalCirclePool.push(circle)//回收
        this.removeListener(this.activeNormalCirclePool[1][i])
      }
      this.activeNormalCirclePool = [[], []]// 重置
    },
    resetInfoBoxCarPic () {
      this.infoBoxCarPic && this.infoBoxCarPic.close()
    },
    resetLastMarker () {
      this.LastMarker && this.LastMarker.setMap(null)
    },
    resetRedInfoBoxWidthLastMarker () {
      this.redInfoBoxWidthLastMarker && this.redInfoBoxWidthLastMarker.close()
		},
		resetCarShot(){
			this.shotMarker && this.shotMarker.setMap(null)
			this.shotIb1 && this.shotIb1.close()
			this.shotIb2 && this.shotIb2.close()
		},

    drawLine(paths){
      // linePool: 不对外交换数据,不保存监听事件句柄
      let line
      if (this.linePool.length) {
        line = this.linePool.pop()
        line.setOptions({
          path:paths,
          map: this.map
        })
      }else {
        line = new google.maps.Polyline({
            map: this.map,
            path:paths,
            strokeOpacity: LINE_STYLE.strokeOpacity,
            strokeWeight: LINE_STYLE.strokeWeight,
            strokeColor: LINE_STYLE.strokeColor,
            zIndex: LINE_STYLE.zIndex
        });
        this.addListener(line, 'mouseover', (  )=>{
            line.setOptions({strokeWeight: '5', strokeOpacity: '0.8'})
        })
        this.addListener(line, 'mouseout', (  )=>{
            line.setOptions({strokeWeight: LINE_STYLE.strokeWeight, strokeOpacity: LINE_STYLE.strokeOpacity})
        })
      }
      this.activeLinePool.push(line)
      return line
    },
    drawNormalCircle(center, imgSrc){
      // 需要保留句柄
      let circle
      if (this.normalCirclePool.length) {
        circle = this.normalCirclePool.pop()
        circle.setOptions({
          map: this.map,
          center: center
        })
      }else {
        circle = new google.maps.Circle({
          map: this.map,
          center: center,
          radius: CIRCLE_STYLE.radius,
          strokePosition: google.maps.StrokePosition.INSIDE,
          strokeColor: CIRCLE_STYLE.strokeColor,
          strokeWeight: CIRCLE_STYLE.strokeWeight,
          strokeOpacity: CIRCLE_STYLE.strokeOpacity,
          fillColor: CIRCLE_STYLE.fillColor,
          fillOpacity: CIRCLE_STYLE.fillOpacity,
          draggable: CIRCLE_STYLE.draggable,
          zIndex: CIRCLE_STYLE.zIndex,
				});
				this.addListener(circle, 'mouseover', (  )=>{
						circle.setOptions({ radius:CIRCLE_STYLE.radius + 0.5 })
				})
				this.addListener(circle, 'mouseout', (  )=>{
					circle.setOptions({  radius:CIRCLE_STYLE.radius  })
				})
      }
      this.activeNormalCirclePool[0].push(circle)
      
      //保留存下来的句柄
      let listener = this.addListener(circle, 'mouseup', (  )=>{
        this.drawCarShot(center, imgSrc)
      })
      this.activeNormalCirclePool[1].push(listener)
      return circle
    },
    drawRedInfoBoxWidthLastMarker(){
      let infoBox = this.redInfoBoxWidthLastMarker
      if (infoBox) {
      }else {
        let option = {
          content:
          `<img src='${this.targetCarIcon}' style='float:right; margin: 8px 8px 0 0;'/>`,
          disableAutoPan: false,
          maxWidth: 0,
          pixelOffset: new google.maps.Size(-45, -100),
          zIndex: 97,
          boxStyle: {},
          closeBoxURL: "",
          closeBoxMargin: "0px 0px 0px 0px",// 地图显示的偏移量
          infoBoxClearance: new google.maps.Size(1, 1),
          isHidden: false,
          pane: "floatPane",
          boxStyle: {
            position: 'absolute',
            width: '88px',
            height: '102px'
          },
          enableEventPropagation: false
        };
        infoBox = new InfoBox(option);
        this.redInfoBoxWidthLastMarker = infoBox
      }
      infoBox.open(this.map, this.LastMarker);
      return infoBox
    },
    drawInfoBoxCarPic(imgSrc='../../../static/images/person-ex.jpg'){
      let infoBoxCarPic = this.infoBoxCarPic
      if (infoBoxCarPic) {
        infoBoxCarPic.setOptions({
          content: `<img src='${imgSrc}' style='width:60px; height:60px; margin: 12px 0px 0px 15px; border-radius:50%'/>`,
        })
      }else {
        let carImg = {
          content:
          `<img src='${imgSrc}' style='width:60px; height:60px; margin: 12px 0px 0px 15px; border-radius:50%'/>`,
          disableAutoPan: false,
          maxWidth: 0,
          pixelOffset: new google.maps.Size(-45, -100),
          zIndex: 96,
          boxStyle: {},
          closeBoxURL: "",
          closeBoxMargin: "0px 0px 0px 0px",// 地图显示的偏移量
          infoBoxClearance: new google.maps.Size(1, 1),
          isHidden: false,
          pane: "floatPane",
          enableEventPropagation: false
        };
        infoBoxCarPic = new InfoBox(carImg);
        this.infoBoxCarPic = infoBoxCarPic
      }
      infoBoxCarPic.open(this.map, this.LastMarker);
      return infoBoxCarPic
    },
    drawLastMarker(pos, imgSrc){
      let marker = this.LastMarker
      if (marker) {
        marker.setOptions({
          map: this.map,
          position: pos
        })
      }else {
        marker = new google.maps.Marker({
          draggable: true,
          position: pos, 
          title: '',
          icon: this.lastMarkerIcon,// 原图显示
          map: this.map,
          zIndex: 99
        })
        this.LastMarker = marker
      }
      return marker
    },
    
    // 图片框
    drawCarShot(pos, imgList){
			let {marker,ib1,ib2} = setNodeVideo(this.map, pos, {imgList: [imgList]})
			this.shotMarker = marker
			this.shotIb1 = ib1
			this.shotIb2 = ib2
    },

		// 输入搜索框的时候 高亮保存，轨迹保存， 轨迹点信息保存
		// 高亮保存在item上面
		saveHighLight(item){
			this.curSelectItem = item
			let arr = this.leftList
			for (let i = 0, len = arr.length; i < len; i++) {
				let x = arr[i]
				x.isHighLight = false
			}
			item.isHighLight = true
			this.prevHighLightItem = item
		},


    // dom event
    // 重逻辑
    eClickLeftLi(index, item) {
      this.date.length || (this.date = [dateFmt(new Date() - 24 * 3600 * 1000), dateFmt(new Date().getTime())])
			if (this.curSelectItem) {
				if (this.curSelectItem.carTargetId != item.carTargetId) {
					// this.date.length || (this.date = [dateFmt(new Date() - 24 * 3600 * 1000), dateFmt(new Date().getTime())])
					this.debounce(this._getCarDetail)
				}
			}else {
				// this.date = [dateFmt(new Date() - 24 * 3600 * 1000), dateFmt(new Date().getTime())]
				this.debounce(this._getCarDetail)
			}
			this.saveHighLight(item)
    },

    // 轻逻辑
    eClickLeftRemark(carId, isTarget, item){
      this.changeActiveStateItem = item
      if (isTarget) {
        this._cancelTargetTar(carId)
      }else {
        this._setTargetCar(carId)
      }
    },
    eInputCarNumber(){
			this.curSelectItem = null
      this.debounceInput(this._getLeftList)
    },
    eReset() {
      this.carNumber = "";
      this.debounce(this._getLeftList)
    },
    eClearCarNumber() {
      this.carNumber = "";
      this._getLeftList()
    },
    eSelectDateRange(x, y, z) {
			if (this.curSelectItem) {
				this._getCarDetail()
			}
    },
     //tip fn
    mCatchException(e, nocatchDesc = '请检查您的网络是否异常！'){
      return errorException(this, e, nocatchDesc)
    },
    mSuccessTip(msg='操作成功'){
      return successTip(this, msg)
    },
    mErrorTip(msg = '操作失败！'){
      return errorTip(this, msg)
    },
    mConfirmModal(msg = '您确定进行此操作？'){
      return confirmModal(this, msg)
    },
    debounce(fn){
      debounce(fn, this, 200, [].slice.call(arguments, 1))
    },
    debounceInput(fn){
      clearTimeout(fn.tId || 0)
      let args = [].slice.call(arguments, 1)
      fn.tId = setTimeout(() => {
          fn.apply(this, args)
      }, 300);
    },
  }
};
</script>


<style lang="scss">
#map.elAdd{
  width:100%;
  height:100%;
}
#car-track.psAdd{
  background: url("../../assets/images/fullScreen_bg.png") no-repeat;
  margin:0;
  width:100%;
  height: 100%;
}
#allmap.mapAdd{
  clip-path: polygon(10px 50px,1860px 50px,1910px 110px,1910px 930px,1764px 1070px,54px 1070px,10px 1024px);
  -webkit-clip-path:polygon(10px 50px,1860px 50px,1910px 110px,1910px 930px,1764px 1070px,54px 1070px,10px 1024px);
}
.cart-track-fs-datepicker {
  z-index: 999999999999999999 !important;
}

@mixin tri-style($t: none,$r: none,$b: none, $l: none) {
  @if $t == none {
    border-top: none;
    bottom: -2px;
  }
  @if $r == none {
    border-right: none;
    left: -2px;
  }
  @if $b == none {
    border-bottom: none;
    top: -2px;
  }
  @if $l == none {
    border-left: none;
    right: -2px;
  }
}
.car-track {
  input::-webkit-input-placeholder {
    color: rgb(140, 213, 235) !important;
  }
  input::-moz-input-placeholder {
    color: rgb(140, 213, 235) !important;
  }
  input::-ms-input-placeholder {
    color: rgb(140, 213, 235) !important;
  }
  .el-picker-panel__body-wrapper {
    input::-webkit-input-placeholder{
      color: rgb(192,196,204) !important;
    }
    input::-moz-input-placeholder{
      color: rgb(192,196,204) !important;
    }
    input::-ms-input-placeholder{
      color: rgb(192,196,204) !important;
    }
  }
  main {
    position: relative;
    padding: 0;
  }
  &.elAdd {
    .search-result {
      top: 50px;
      bottom: 37px;
      left: 20px;
    }
  }
  .search-result {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 10px;
    z-index: 999;
    .search {
      > div {
        position: absolute;
        top: 10px;
        left: 0;
        background-color: rgb(0, 155, 198);
        border: 1px solid rgb(120, 215, 255);
        height: 40px;
      }
      .s-left {
        width: 268px;
        .license {
          position: absolute;
          top: 8px;
          height: 20px;
          left: 10px;
          width: 100%;
          .el-input__inner {
            left: 0;
            top: -24px;
            font-size: 12px;
            background-color: transparent;
            border: none;
            color: #fff;
            padding: 0;
            line-height: 16px;
            position: absolute;
          }
          i.el-icon-close {
						position: absolute;
            font-size: 20px;
            top: 2px;
            right: 17px;
            color: rgb(140, 213, 235);
            transition: all 0.3s;
            &:hover {
              transform: rotate(180deg);
            }
          }
        }
      }
      .s-right {
        width: 314px;
        left: 278px;
        position: relative;
        .el-date-editor--datetimerange {
          position: absolute;
          left: -4px;
          top: 6px;
          background-color: transparent;
          border: none;
          .el-icon-date {
            color: rgb(140, 213, 235);
            padding-right: 5px;
          }
          .el-range-input {
            font-size: 12px;
            background-color: transparent;
            color: #fff;
            width: 118px;
          }
          .el-range-separator {
            margin-top: 2px;
            font-size: 12px;
            padding: 0 2px;
            color: #fff;
          }
        }
      }
    }
    .result {
      width: 270px;
      position: absolute;
      top: 60px;
      bottom: 20px;
      background-color: rgba(0, 0, 0, 0.6);
      .top {
        padding: 10px 10px;
        > p {
          float: left;
          margin-left: 10px;
          color: #fff;
          font-size: 12px;
          margin-left: 0;
          b {
            font-size: 14px;
            padding: 0 5px;
            color: rgb(255, 239, 128);
          }
        }
        > button {
          float: left;
          height: 16px;
          padding: 4px 4px 4px 20px;
          color: rgb(85, 219, 234);
        }
      }
      .content {
        li {
          position: relative;
          &.active {
            background-image: url(/static/images/highlight.png);
            p {
              color: rgb(64, 239, 255);
            }
          }
          height: 96px;
          background-size: 281px 100px;
          background-position-x: -6px;
          img {
            position: absolute;
            top: 34px;
            left: 12px;
          }
          p {
            color: #fff;
            position: absolute;
            top: 38px;
            left: 90px;
          }
          i.noremark {
            background-color: #fff;
            background: url("../../assets/images/noRemark.png");
          }
          i {
						font-weight: 700;
						cursor: pointer;
            color: #fff;
            background: url("../../assets/images/remark.png");
            width: 22px;
            height: 22px;
            position: absolute;
            right: 15px;
            top: 36px;
          }
        }
      }
    }
  }
  .triangles {
    i {
      width: 13px;
      height: 13px;
      display: block;
      border: 3px solid #fff;
      position: absolute;
      &.l-t {
        @include tri-style(top, none,none, left );
      }
      &.r-t {
        @include tri-style(top, right,none, none );
      }
      &.l-b {
        @include tri-style(none, none, left, bottom );
      }
      &.r-b {
        @include tri-style(none, right, bottom, none );
      }
    }
  }
}
</style>
