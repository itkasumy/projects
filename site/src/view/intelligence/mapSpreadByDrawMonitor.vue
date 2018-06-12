<template>
 <div class="map-spread" id="map">
    <el-main @mousemove.native="moveMarker($event)" id="map-spread">
        <div id="allmap" class="xxx" style ="width:100%; height:100%" >
        </div>
        <img style="float: left" class="marker" ref="marker" draggable="true" :src="followMouseIcon" alt="">
        <div class="dashboard" v-if="true">
          <div class="search">
            <span class="text">筛选</span>
            <ul class="select">
              <li>
                <el-tooltip 
                :content="areaTip" 
                placement="top"
                popper-class="map-spread-tooltip"
                effect="dark">
                  <el-select 
                    v-model="areaType" 
                    @change="areaChange"
                    :popper-append-to-body="false"
                    clearable 
                    size="small"
                    placeholder="请选择">
                    <el-option
                      v-for="item in areaTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip 
                  :content="devTypeTip" 
                  placement="top" 
                  effect="dark" 
                  popper-class="map-spread-tooltip"
                >
                  <el-select 
                    v-model="devType"
                    @change="devTypeChange"
                    :popper-append-to-body="false"
                    clearable 
                    size="small"
                    placeholder="请选择">
                    <el-option
                      v-for="item in devTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-tooltip>
              </li>
            </ul>
          </div>
          <div class="lists">
            <div class="content">
              <ul>
                <li v-for="(item,index) in deviceLists" :key="item.IP"
                    :class="{itemActive: selectedItem===index}"
                    @mousedown="mousedown(index, !!item.areaId, $event, item.id, item.configFlag, item.deviceName, item)"
                    @dblclick="cancleSelectMoveMarker(item)"
                >
                  <div class="box">
                    <div>
                      <span class="title">{{item.deviceName}}</span>
                      <!-- 安全性判断 -->
                      <img draggable="false" v-if="item.deviceTypeIcon && item.deviceTypeIcon.indexOf('camera') !== -1" 
                        :src="camera.value.cameraIcon" :alt="item.deviceTypeIcon">
                      <img draggable="false" v-else-if="item.deviceTypeIcon && item.deviceTypeIcon.indexOf('radar') !== -1" 
                        :src="radar.value.radarIcon" :alt="item.deviceTypeIcon">
                      <img draggable="false" v-else-if="item.deviceTypeIcon && item.deviceTypeIcon.indexOf('H1') !== -1" 
                        :src="H1.value.H1Icon" :alt="item.deviceTypeIcon">
                      <img draggable="false" v-else-if="item.deviceTypeIcon && item.deviceTypeIcon.indexOf('helmet') !== -1" 
                        :src="helmet.value.helmetIcon" :alt="item.deviceTypeIcon">
                      <img draggable="false" v-else-if="item.deviceTypeIcon && item.deviceTypeIcon.indexOf('wifi') !== -1" 
                        :src="wifi.value.wifiIcon" :alt="item.deviceTypeIcon">
                      <img draggable="false" v-else-if="item.deviceTypeIcon && item.deviceTypeIcon.indexOf('swan') !== -1" 
                        :src="swan.value.swanIcon" :alt="item.deviceTypeIcon">
                      <img draggable="false" v-else  :src="other.value.otherIcon">
                    </div>
                    <div><span>{{item.deviceIp}}</span></div>

                    <el-tooltip placement="right">
                      <div slot="content"  v-if="item.deviceAdrr" class="map-spread-add-tip">{{item.deviceAdrr}}</div>
                      <div slot="content" v-else class="map-spread-add-tip">暂无地址</div>
                      <div>
                        <span class="address">{{item.deviceAdrr}}</span>
                      </div>
                    </el-tooltip>
                    <div class="flag" v-if="!!item.areaId"><i></i>已启用</div>
                    <div class="flag nouse" v-else><i></i>拖动启用</div>
                    <a href="#" @mousedown.stop>
                      <img v-if="!!item.areaId" :src="deviceMonitorBtn" class="device-monitor" alt="查看视频监控">
                    </a>
                  </div>
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
    <div class="modal full-screen" :style="{visibility: modalState, 'z-index': modalZIndex}">
      <div class="contain" id="submap"></div>
      <i class="el-icon-close close-submap" @click="closeMap"></i>
      <div class="save" v-if="btnGroupShow">
        <el-button type="primary" size="small" :disabled="btnSaveSettingGuardAreaIsDisable" @click="save">保存</el-button>
        <el-button type="default" size="small" @click="rePaint">重新绘制</el-button>
        <el-button type="default" size="small" @click="canclePaint">取消</el-button>
      </div>
    </div>
 </div>
</template>

<script>
import { createMap } from "../../common/js/createMap.js";
import { setPosMsg } from "./js/setPosMsgForMapSpread";
import { setAreaName } from "./js/setAreaNameForMapSpread";
import { createPolygon } from '@/common/js/createPolygon';
import {setMapCenter} from './js/setMapCenter'
import {deviceIcon, deviceMarker, deviceMarkerHL} from './js/iconPath'
import {addClass, removeClass} from './js/utils'
import {errorException} from './js/tip'
import DrawManager from './js/drawMonitor'
import BASE from './js/basePath'
const DEVICEICON = deviceIcon()
const DEVICEMARKER = deviceMarker()
const DEVICEMARKERHL = deviceMarkerHL()
const BASEPATH = BASE.BASEPATH
const BASEPATH2 = BASE.BASEPATH2

export default {
  data() {
    return {
      iconcommon: require("../../assets/images/device-icon.png"),
      hlIcon: require('../../assets/images/hl_device.png'),
      deviceMonitorBtn: require('../../assets/images/deviceMonitor_btn.png'),
      camera: {
        value: {
          cameraIcon: DEVICEICON.camera,
          cameraMarker: DEVICEMARKER.camera,
          cameraMarkerHL: DEVICEMARKERHL.camera
        },
        name: '摄像头'
      },
      H1: {
        value: {
          H1Icon: DEVICEICON.H1,
          H1Marker: DEVICEMARKER.H1,
          H1MarkerHL: DEVICEMARKERHL.H1
        },
        name: '飞行器'
      },
      helmet: {
        value: {
          helmetIcon: DEVICEICON.helmet,
          helmetMarker: DEVICEMARKER.helmet,
          helmetMarkerHL: DEVICEMARKERHL.helmet
        },
        name: '头盔'
      },
      radar: {
        value: {
          radarIcon: DEVICEICON.radar,
          radarMarker: DEVICEMARKER.radar,
          radarMarkerHL: DEVICEMARKERHL.radar
        },
        name: '雷达'
      },
      wifi: {
        value: {
          wifiIcon: DEVICEICON.wifi,
          wifiMarker: DEVICEMARKER.wifi,
          wifiMarkerHL: DEVICEMARKERHL.wifi
        },
        name: 'wifi'
      },
      swan: {
        value: {
          swanIcon: DEVICEICON.swan,
          swanMarker: DEVICEMARKER.swan,
          swanMarkerHL: DEVICEMARKERHL.swan
        },
        name: '卡口'
      },
      other: {
        value: {
          otherIcon: DEVICEICON.other,
          otherMarker: DEVICEMARKER.other,
          otherMarkerHL: DEVICEMARKERHL.other
        },
        name: '其他'
      },

      followMouseIcon: DEVICEMARKER.camera,

      areaType: '',
      devType: '',
      areaTypeList: [{ label: "全部区域", value: ''},],
      devTypeList: [{ label: "全部类型", value: ''}],

      deviceLists: [],
      modalState: "hidden",
      modalZIndex: -1,
      polygonHoverColor: "#53cbff",

      selectedItem: "",
      marker: {},
      markerShouldShow: false,

      highlightMarker: {},
      markerShouldFollowMouse: false,
      activePolygon: {},
      
      map: {},
      isAllRequestOver: false,
      tempLeftListsOrOutsidePolygonLists: {}, 
      targetObj: {},  // 管理
      markerTargetObj: {}, 
      isDebuunce: true, 

      // 管理所绘制区域的数据信息
      deviceId: '',// 当前被点击的设备id
      coords: [],
      areaId: '',
      pos: {},
      markerName: '',// 新增的名称

      configFlag: '',// 判断设备是否可以绘制区域

      // infoBox 用于关闭 
      infoBox: {},
      infoMsg: {},
      btnGroupShow: true,

      leftActiveItem: {},
      activePolygon: {},

      // 手动绘制的图像
      drawPolygon: {},
      drawManager: {},
      isInfoBoxBinded: false,
      // 用于设置图标变色
      activeMarkerId: '',
      deviceTypeIcon: '',

      preventDomready: true,
      showCancleDevTip: true,

      notifyTip: {},
      
      btnSaveSettingGuardAreaIsDisable: true,

      listenerId: null,
      monitorRangePointCount: 0
    };
  },
  watch:{
    modalState(){
      if (this.modalState === 'hidden') {
        this.btnSaveSettingGuardAreaIsDisable = false
      }
    }
  },
  beforeDestroy(){
    typeof this.notifyTip.close === 'function' && this.notifyTip.close()
  },
  computed: {
    devTypeTip(){
      let res = ''
      for (let i = 0, len = this.devTypeList.length; i < len; i++) {
        let item = this.devTypeList[i]
        if (item.value == this.devType) {
          res = item.label
          break
        }
      }
      return res
    },
    areaTip(){
      let res = ''
      for (let i = 0, len = this.areaTypeList.length; i < len; i++) {
        let item = this.areaTypeList[i]
        if (item.value == this.areaType) {
          res = item.label
          break
        }
      }
      return res
    }
  },
  mounted() {
    this.marker = this.$refs.marker;
    this.init();
    this._getLeftLists()
    this._getOutsidePolygonLists()
    this._getSelectData()
    setTimeout(() => this.__fs(), 0);
  },
  methods: {
    __fs(){
      let fullscree, el, fs, map1, ps, emitter
      this.$root.Bus.$on('fullScreen',value => {
        fullscree = fullscree || require('fullscreen')
        el = el || document.getElementById('map')
        map1 = map1 || document.getElementById('allmap')
        ps = ps || document.getElementById('map-spread')
        fs = fs || fullscree(el)
        if(value){
          addClass(el, 'elAdd')
          addClass(map1, 'mapAdd')
          addClass(ps, 'psAdd')
          fs.request()// 全屏请求
        }
        emitter = emitter || fs.on('release', function() {
          removeClass(el, 'elAdd')
          removeClass(map1, 'mapAdd')
          removeClass(ps, 'psAdd')
        })
      })
    },
    _getSelectData(){
      this.$axios.get(BASEPATH + '/info/deviceManage/findDevTypeList?timestamp=' + new Date().getTime())
        .then(( data )=>{
          for (let i = 0, l = data.data.length; i < l; i++) {
            let item = data.data[i]
            this.devTypeList.push({label: item.deviceTypeName, value: item.deviceTypeId})
          }
        })
        .catch(( e )=>{  errorException(this, e)  })
      this.$axios.get(BASEPATH2 + '/info/area/getAllSysArea?timestamp=' + new Date().getTime())
        .then(( data )=>{
            for (let i = 0,len = data.data.length; i < len; i++) {
              let item = data.data[i]
              this.areaTypeList.push({label: item.areaName, value: item.areaId})
            }
        })
        .catch(( e )=>{  errorException(this, e)  })
    },
    _getOutsidePolygonLists(){
      this.$axios.get(BASEPATH2 + '/info/area/getAllSysAreaPoint?timestamp=' + new Date().getTime())
        .then(( data )=>{
          data = data.data
          for (let i = 0, len = data.length ; i < len; i++) {
            let id = data[i].areaId
            let polygonItem = data[i]

            if (!this.targetObj[id]) {
              this.targetObj[id] = {}
            }
            this.targetObj[id].name = data[i].areaName
            this.targetObj[id].paths = []

            let pathsArr = data[i].pointList
            let tempArr = []
            if (pathsArr && pathsArr.length) {
              for (let j = 0, l = pathsArr.length; j < l; j++) {
                let item = pathsArr[j]
                tempArr.push({lat: item.lat, lng: item.lng})
              }
            }
            this.targetObj[id].paths = tempArr
            let {polygon, infoBox } = this.handleOutsidePolygon(this.map, tempArr, data[i].areaName)
            
            this.addListener(polygon, "mouseup", e => {
              this.btnGroupShow = true
              if (this.markerShouldFollowMouse) {
                this.activePolygon = polygonItem
                // 进入大图
                if (this.configFlag == '0') {
                  this.setOwnMarkerPositionShow(false);
                  this.markerShouldFollowMouse = false;

                  // 跳转到大图
                  let map = this.drawMap('submap', 19, {lat: e.latLng.lat(), lng: e.latLng.lng()})
                  this.modalState = 'visible'
                  this.modalZIndex = '99'
                  this.handleOutsidePolygon(map, tempArr, data[i].areaName)

                  let o = this.targetObj[id].markerPolygon
                  for (const key in o) {
                    try {
                      this.handleInnerPolygon(map, o[key].paths, o[key].name)
                    } catch (error) {}
                  }
                  this.drawPolygonSelf(map, {lat: e.latLng.lat(), lng: e.latLng.lng()}, data[i].areaId)
                }else {
                  // 直接描点
                  let item = this.leftActiveItem
                  let {marker, infoBox, infoMsg} = this.drawMarker(this.map, 
                    {lat: e.latLng.lat(), lng: e.latLng.lng()}, 
                    {
                      name: item.deviceName, 
                      index: item.id,
                      area: item.areaName,
                      num: item.deviceNo,
                      lngLat: `Lat: ${e.latLng.lat()}<br/>Lng: ${e.latLng.lng()}`,
                      type: item.deviceTypeIcon// 标记标记
                    })
                    marker.setOptions({
                      draggable: false
                    })
                    if (!this.infoBox.addListener) {
                      this.infoBox= infoBox
                      this.infoMsg= infoMsg
                      this.infoBox.addListener("domready", () => {
                        let ib_close = document.getElementById("deviceCloseIcon");
                          ib_close && (ib_close.onclick = this.confirmAgain)
                      });
                    }
                    this.setOwnMarkerPositionShow(false)
                    this.markerShouldFollowMouse = false
                    this.$axios({
                      method: 'post',
                      url: BASEPATH + '/info/deviceManage/bindingDevArea?timestamp=' + new Date().getTime(),
                      params: {
                        id: this.deviceId,
                        areaId: id,
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                        configFlag: this.configFlag
                      }
                    })
                    .then((  )=>{
                        this.$message.success('启用成功！')
                        setTimeout(() => {
                          // 修改左边的列表状态--将设备相关信息添加上去
                          for (let i = 0; i < this.deviceLists.length; i++) {
                            let item = this.deviceLists[i]
                            if (item.id == this.deviceId) {
                              item.areaId = id
                              item.areaName = polygonItem.areaName
                              break
                            }
                          }
                          this.markerTargetObj[item.id] = marker
                        }, 500);
                    }).catch(( e )=>{
                        marker.setMap(null)
                        marker = null
                        errorException(this, e)
                    })
                }
              }
            });
          }
        })
        .catch(( e )=>{  errorException(this, e)  })
    },

    _getLeftLists(areaId = '', deviceTypeId = ''){
      return this.$axios({
        method: 'GET',
        url: BASEPATH + '/info/deviceManage/findDevListInMap?timestamp=' + new Date().getTime(),
        params: {areaId,deviceTypeId}
      }).then(( data )=>{
          data = data.data
          this.deviceLists = data
          // 先清除掉之前的marker
          for (const key in this.markerTargetObj) {
            this.markerTargetObj[key].setMap(null)
            delete this.markerTargetObj[key]
          }
          for (let i = 0, len = data.length ; i < len; i++) {
            let item = data[i]
            let areaId = item.areaId
            let markerId = item.id
            let markerName = item.deviceName
            // 如果已经绑定了，放进targetObj里面
            if (areaId) {
              if (!this.targetObj[areaId]) {
                this.targetObj[areaId] = {}
              }
              if (!this.targetObj[areaId].markerPolygon) {
                this.targetObj[areaId].markerPolygon = {}
              }
              this.targetObj[areaId].markerPolygon[markerId] = {}
              this.targetObj[areaId].markerPolygon[markerId].name = markerName
              this.targetObj[areaId].markerPolygon[markerId].paths = [
                {lat: item.lat1, lng: item.lng1},
                {lat: item.lat2, lng: item.lng2},
                {lat: item.lat3, lng: item.lng3},
                {lat: item.lat4, lng: item.lng4}
              ]
              // 画marker
              let {marker, infoBox, infoMsg} = this.drawMarker(this.map, {lat: item.lat, lng: item.lng}, 
                {
                  name: markerName, 
                  index: markerId,
                  area: item.areaName,
                  num: item.deviceNo,
                  lngLat: `Lat: ${item.lat}<br/>Lng: ${item.lng}`,
                  type: item.deviceTypeIcon
                })

              // 这里一个都没走
              this.infoBox = infoBox
              this.infoMsg = infoMsg
              marker.setOptions({  draggable: false  })
              
              if (item.configFlag === '0') {
                marker.addListener('dblclick', (e)=>{
                    this.setOwnMarkerPositionShow(false);
                    this.markerShouldFollowMouse = false;
                    this.btnGroupShow = false
                    
                    // 跳转到大图 
                    let map = this.drawMap('submap', 19, {lat: e.latLng.lat(), lng: e.latLng.lng()})
                    this.modalState = 'visible'
                    this.modalZIndex = '99'
                    this.handleOutsidePolygon(map, this.targetObj[areaId].paths, this.targetObj[areaId].name)
                    let tempO = this.targetObj[areaId].markerPolygon
                    for (const key in tempO) {
                      this.handleInnerPolygon(map, tempO[key].paths, tempO[key].name)
                    }
                })
              }
             
              // 再记录一个映射表
              this.markerTargetObj[markerId] = marker
            }
          }

          // 上面的一个都没绑定
          if (this.infoBox.addListener) {
            this.infoBox.addListener("domready", () => {
              let ib_close = document.getElementById("deviceCloseIcon");
              ib_close && (ib_close.onclick = this.confirmAgain)
            });
          }
        })
        .catch(( e )=>{  errorException(this, e)  })
    },
    deleteDevice(devicdId){
      this.$axios({
        method: 'GET',
          url: BASEPATH + '/info/deviceManage/cancelBindDevArea/' + devicdId + '?timestamp=' + new Date().getTime()
      })
        .then(( data )=>{
          this.$message.success('删除启用状态成功')

          // 删除marker
          this.markerTargetObj[devicdId].setMap(null)
          this.infoBox.close()
          this.infoMsg.close()
          // 删除左边状态
          for (let i = 0; i < this.deviceLists.length; i++) {
            let item = this.deviceLists[i]
            if (item.id == devicdId) {
              item.areaId = null
              break
            }
          }
          // 删除submap的markerPolygon
          for (const key in this.targetObj) {
            let o = this.targetObj[key]
            for (const k in o.markerPolygon) {
              if (k == devicdId) {
                delete o.markerPolygon[k]                
                return
              }
            }
          }
        })
        .catch(( e )=>{  errorException(this, e)  })
    },

    init: function() {
      let map = this.drawMap('allmap')
      this.map = map
      this.handleMapMouseup(map)
    },

    // 区域polygon的处理-监听了mouseover mouseout事件
    handleOutsidePolygon(map, pathArr, name = 'x'){
      let {polygon, infoBox} = setAreaName(map, {path: pathArr, name})
      if (this.modalState !== 'hidden') {
        infoBox.setOptions({ fontColor: '#f73333',  strokeColor: '#fff'})
      }
      let fillColor = polygon.fillColor
      this.addListener(polygon, 'mouseover', ()=>{
        polygon.setOptions({ fillColor: this.polygonHoverColor });
      })
      this.addListener(polygon, "mouseout", () => {
        polygon.setOptions({ fillColor: fillColor });
      });
      return {polygon, infoBox}
    },

    drawPolygonSelf(map, pos, areaId) {
      let manager = new DrawManager(map, true, 4)
      this.drawManager = manager
      manager.run()
      manager.addListener('computed', ( paths )=>{
        this.btnSaveSettingGuardAreaIsDisable = false
        this.coords = paths
        this.areaId = areaId
        this.pos = pos
      })
    },

    // expired function, it is replaced by drawPolygonSelf
    drawPolygonSelf__(map, pos, areaId){
      let bounds = map.getBounds();
      let coords = []
      // let drawingMode = google.maps.drawing.OverlayType.RECTANGLE
      let drawingMode = google.maps.drawing.OverlayType.POLYGON
      const drawManager = new google.maps.drawing.DrawingManager({
        drawingMode: drawingMode,
        drawingControl: false,
        // rectangleOptions: {
        polygonOptions: {
          fillColor: '#ff0',
          fillOpacity: .35,
          strokeWeight: 2,
          strokeColor: 'gold',
          clickable: true,
          zIndex: 1,
          editable: true,
          draggable: false,
          insertatable: false
        },
      })
      drawManager.setMap(map)
     

      let southWest = bounds.getSouthWest();
      let northEast = bounds.getNorthEast();
      let southEast = {lat:southWest.lat(),lng:northEast.lng()}
      let northWest = {lat:northEast.lat(),lng:southWest.lng()}
      // ----
      let southWestLatLng = {lat:southWest.lat() - 0.01,lng:southWest.lng()}// 南部点往下挪动，避免覆盖不完全
      let northEastLatLng = {lat:northEast.lat(),lng:northEast.lng()}
      // ----
      let leftPath = [northEastLatLng,northWest,southWestLatLng, southEast]
      this.leftPolygon = new google.maps.Polygon({
        path: leftPath,
        strokeColor:'transparent',
        strokeOpacity:0.4,
        strokeWeight:1,
        fillColor:"transparent",
        fillOpacity:0.9,
        map:map
      })


      this.monitorRangePointCount = 0
      google.maps.event.removeListener(this.listenerId)
      this.listenerId = this.leftPolygon.addListener('mouseup',  () => {
        this.monitorRangePointCount = this.monitorRangePointCount + 1
        if (this.monitorRangePointCount > 4) {
          drawManager.setDrawingMode(null)
          this.monitorRangePointCount = 0
        }
      })
      this.drawManager = drawManager
        google.maps.event.addListener(drawManager, 'overlaycomplete', event => {
          drawManager.setDrawingMode(null)
          this.btnSaveSettingGuardAreaIsDisable = false

          if (event.type === 'polygon') {
            this.drawPolygon = event.overlay

            if (event.overlay.getPath().getArray().length < 4) {
              
              this.$message({
                type: 'warning',
                message: '请绘制四个点'
              })
              this.drawPolygon.setMap(null)
              this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
              google.maps.event.removeListener(this.listenerId)
              this.monitorRangePointCount = 0
              this.listenerId = this.leftPolygon.addListener('mouseup',  () => {
                this.monitorRangePointCount = this.monitorRangePointCount + 1
                if (this.monitorRangePointCount > 4) {
                  this.drawManager.setDrawingMode(null)
                  this.monitorRangePointCount = 0
                }
              })
              return
            }


            
            event.overlay.addListener('mousedown', function (e) {
              console.log( event.overlay.getPath(), e, '-=' )
                let coords = []
                const path = event.overlay.getPath().getArray()
                let lat = 0
                let lng = 0
                path.forEach(pa => {
                    const l = pa.lat()
                    const n = pa.lng()
                    if (lng < n) {
                      lat = l
                      lng = n
                    }
                    coords.push({
                      lat: l,
                      lng: n
                    })
                })
                for (var i = 0, len = coords.length; i < len; i++) {
                  let item = coords[i]
                  if (item.lat === e.latLng.lat() && item.lng === e.latLng.lng()) 
                    break
                }
                if (i == coords.length && !e.za) 
                  console.log( 123 )
            })
            
            this.addListener(event.overlay.getPath(), 'insert_at', ( e )=>{
              console.log( 'insert_at' )
            })
            this.addListener(event.overlay.getPath(), 'set_at', ( e )=>{
              var path = event.overlay.getPath().getArray(), lat = 0, lng = 0
              coords = []
              path.forEach(pa => {
                const l = pa.lat()
                const n = pa.lng()
                if (lng < n) {
                  lat = l
                  lng = n
                }
                coords.push({
                  lat: l,
                  lng: n
                })
              })
              this.coords = coords
              this.areaId = areaId
              this.pos = pos
            })
            var path = event.overlay.getPath().getArray(), lat = 0, lng = 0
            coords = []
            path.forEach(pa => {
              const l = pa.lat()
              const n = pa.lng()
              if (lng < n) {
                lat = l
                lng = n
              }
              coords.push({
                lat: l,
                lng: n
              })
            })
            this.coords = coords
            this.areaId = areaId
            this.pos = pos
          }
        })
    },
    setOwnMarkerPositionShow(isShow, e) {
      if (isShow) {
        this.marker.style.visibility = "visible";
        this.marker.style.left = e.clientX - 20 + "px";
        this.marker.style.top = e.clientY - 58 + "px";
      }else {
        this.marker.style.visibility = "hidden";
        this.markerShouldFollowMouse = false;
      }
    },
    // el-main的  mousemove事件
    moveMarker(e) {
      if (this.markerShouldFollowMouse) {
        this.setOwnMarkerPositionShow(true, e);
      }
    },
    // 左边列表的 mousedown 事件
    mousedown(index, isActive, e, deviceId, configFlag, name, item) {
      if (item.lat && item.areaId) {
        this.map.setCenter(new google.maps.LatLng(item.lat, item.lng))
      }
      this.highlightItem(index);
      this.deviceId = deviceId
      this.configFlag = configFlag
      this.markerName = name
      this.followMouseIcon = DEVICEMARKER[item.deviceTypeIcon]
      try {
        this.markerTargetObj[this.activeMarkerId].setIcon(this[this.deviceTypeIcon].value[this.deviceTypeIcon + 'Marker'])
        this.markerTargetObj[this.activeMarkerId].__label__.setOptions({strokeColor: '#229fff'})
      } catch (error) {}
      if (isActive) {
        this.markerTargetObj[deviceId].__label__.setOptions({strokeColor: '#f73333'})
        this.markerTargetObj[deviceId].setIcon(this[item.deviceTypeIcon].value[item.deviceTypeIcon + 'MarkerHL'])
        this.activeMarkerId = item.id
        this.deviceTypeIcon = item.deviceTypeIcon
      }else if (this.showCancleDevTip) {
        this.notifyTip = this.$notify({
          title: '操作提示',
          message: '双击可取消所选设备',
          position: 'top-left',
          offset: 50,
          duration: 3000
        });
          this.showCancleDevTip = false
      }
      this.leftActiveItem = item
      this.markerShouldFollowMouse = !isActive;
      this.setOwnMarkerPositionShow(!isActive, e);
    },
    cancleSelectMoveMarker(item){
      if (!item.areaId) {
        // this.$message.warning('已取消选择该设备')
        try {
          this.markerTargetObj[this.activeMarkerId].setIcon(this[this.deviceTypeIcon].value[this.deviceTypeIcon + 'Marker'])
        } catch (error) {}
        this.leftActiveItem = {}
        this.highlightItem('')
        this.markerShouldFollowMouse = false;
        this.setOwnMarkerPositionShow(false);
      }
    },
    // 保存可以配置监视区域的设备信息
    save(coords, pos, configFlag){
      coords = this.coords
      pos = this.pos
      let that = this
      this.$axios({
          method: 'post',
          url: BASEPATH + '/info/deviceManage/bindingDevArea?timestamp=' + new Date().getTime(),
          params: {
            id: this.deviceId,
            areaId: this.areaId,
            lat1: coords[0].lat,
            lng1: coords[0].lng,
            lat2: coords[1].lat,
            lng2: coords[1].lng,
            lat3: coords[2].lat,
            lng3: coords[2].lng,          
            lat4: coords[3].lat,
            lng4: coords[3].lng,
            lat: pos.lat,
            lng: pos.lng,
            configFlag: this.configFlag// 0是允许配置,可以从列表里面读取
          }
        })
          .then((  )=>{
              this.$message.success('启用成功！')
              setTimeout(() => {
                this.handleSaveMarkerPolygonSetting && this.handleSaveMarkerPolygonSetting(pos, coords)
              }, 1000);
          })
          .catch(( e )=>{  errorException(this, e)  })
    },

    handleSaveMarkerPolygonSetting(pos, coords){
      
      this.closeMap()
      // 修改左边的列表状态--修改为已配置
      for (let i = 0; i < this.deviceLists.length; i++) {
        let item = this.deviceLists[i]
        if (item.id == this.deviceId) {
          item.areaId = this.areaId
          item.areaName = this.activePolygon.areaName
          item.lat = pos.lat
          item.lng = pos.lng
          break
        }
      }
      // 设置marker
      let {marker, infoBox, infoMsg} = this.drawMarker(this.map, pos, {
        name: this.leftActiveItem.deviceName,
        index: this.leftActiveItem.id,
        area: this.activePolygon.areaName,
        num: this.leftActiveItem.deviceNo,
        lngLat: `Lat: ${pos.lat}<br/>Lng: ${pos.lng}`,
        type: this.leftActiveItem.deviceTypeIcon || 'other'
      })
      marker.setOptions({  draggable: false  })
      this.markerTargetObj[this.deviceId] = marker

      if (!this.infoBox.addListener) {
        this.infoBox= infoBox
        this.infoMsg= infoMsg
        this.infoBox.addListener("domready", () => {
          let ib_close = document.getElementById("deviceCloseIcon");
          ib_close && (ib_close.onclick = this.confirmAgain)
        });
      }
      marker.addListener('dblclick', (e)=>{
        
          this.setOwnMarkerPositionShow(false);
          this.markerShouldFollowMouse = false;
          this.btnGroupShow = false

          // 跳转到大图
          let map = this.drawMap('submap', 19, {lat: e.latLng.lat(), lng: e.latLng.lng()})
          this.modalState = 'visible'
          this.modalZIndex = '99'
          this.handleOutsidePolygon(map, this.targetObj[this.areaId].paths, this.targetObj[this.areaId].name)
          let tempO = this.targetObj[this.areaId].markerPolygon
          for (const key in tempO) {
            this.handleInnerPolygon(map, tempO[key].paths, tempO[key].name)
          }
      })

      // 添加到markerPolygon上 -- 用于点击放大时绘出markerPolygon
      let o =  {}
      if (!this.targetObj[this.areaId]) {
        this.targetObj[this.areaId] = {}
      }
      if (!this.targetObj[this.areaId].markerPolygon) {
        this.targetObj[this.areaId].markerPolygon = {}
      }
      o = this.targetObj[this.areaId]
      o.markerPolygon[this.deviceId] = {}
      o.markerPolygon[this.deviceId].name = this.markerName
      o.markerPolygon[this.deviceId].paths = coords
    },
    rePaint() {
      this.drawManager.reset()
      this.btnSaveSettingGuardAreaIsDisable = true
    },
    rePaint__(){
      this.drawPolygon.setMap && this.drawPolygon.setMap(null)
      this.btnSaveSettingGuardAreaIsDisable = true
      // this.drawManager.setDrawingMode && this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE)
      this.drawManager.setDrawingMode && this.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
      this.monitorRangePointCount = 0
      google.maps.event.removeListener(this.listenerId)
      this.listenerId = this.leftPolygon.addListener('mouseup',  () => {
        this.monitorRangePointCount = this.monitorRangePointCount + 1
        if (this.monitorRangePointCount > 4) {
          this.drawManager.setDrawingMode(null)
          this.monitorRangePointCount = 0
          // google.maps.event.removeListener(this.listenerId)
        }
      })
      
    },
    closeMap(){
       this.modalState = 'hidden'
       this.modalZIndex = '-1'
       this.closeSubMap = true
    },
    canclePaint(){
      this.closeMap()
    },
    showWarningBox(tip){
      return this.$confirm(tip, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
    },
    debounce(fn){
      clearTimeout(fn.id)
      let that = this
      fn.id = setTimeout(() => {
        fn.apply(this,[].slice.call(arguments, 1))
      }, 100);
    },
    confirmAgain(e){
      this.showWarningBox('该操作会使得该设备回到未启用状态！您要继续吗？')
        .then((  )=>{
          this.deleteDevice(this.infoBox.id)
        }).catch(()=>{})
      e.stopPropagation && e.stopPropagation()
      e.cancleBubble = true  
    },
    showWarningBox(tip){
      return this.$confirm(tip, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
    },
    
    // BASE HANDLE  START--上海陈毅广场
    // drawMap(id, para = 18, center = {lat: 31.24064326, lng: 121.48401082}) {
    drawMap(id, para = 18, center) {
      if (center) {
        return createMap(id, para, center);
      }else {
        return createMap(id, para);
      }
    },
    drawMarker(map, position, para={}) {
      let res = setPosMsg(
        map,
        new google.maps.LatLng(position.lat, position.lng),
        para
      );
      return res
    },
    removeMarker(marker) {
      marker.setMap(null);
    },
    addListener(target, eventType, callback) {
      return google.maps.event.addListener(target, eventType, callback);
    },
    removeListener(listener){
      return google.maps.event.removeListener(listener)
    },
    highlightItem(index) {
      this.selectedItem = index;
    },
    // marker对应的polygon
    handleInnerPolygon(map, pathArr, name = 'xx'){
      try {
        let {polygon, infoBox} = setAreaName(map, {path: pathArr, name})
        if (this.modalState !== 'hidden') {
          infoBox.setOptions({
            fontSize: 14,
          })
        }
        return {polygon, infoBox}
      } catch (e) {}
    },
    // 地图map对应的mouseup事件
    handleMapMouseup(map){
      this.addListener(map, 'mouseup', (  )=>{
        if (this.markerShouldFollowMouse) {
          this.$message({
            type: 'error',
            message: '该区域无法启用设备！'
          });
        }
        this.leftActiveItem = {}
        this.selectedItem = ''
        this.setOwnMarkerPositionShow(false)
        this.markerShouldFollowMouse = false
      })
    },
    areaChange(areaId){
      this._getLeftLists(areaId)
    },
    devTypeChange(devTypeId){
      this._getLeftLists('', devTypeId)
    },
    // BASE HANDLE END ---
  }
};
</script>
<style lang="scss">
$color_warning: rgb(234, 71, 72);
$color_success: rgb(0, 155, 198);

#map.elAdd{
  width:100%;
  height:100%;
}
#map-spread.psAdd{
  background: url("../../assets/images/fullScreen_bg.png") no-repeat;
  margin:0;
  width:100%;
  height: 100%;
}
#allmap.mapAdd{
  clip-path: polygon(10px 50px,1860px 50px,1910px 110px,1910px 930px,1764px 1070px,54px 1070px,10px 1024px);
  -webkit-clip-path:polygon(10px 50px,1860px 50px,1910px 110px,1910px 930px,1764px 1070px,54px 1070px,10px 1024px);
}
.map-spread {
  .marker {
    position: fixed;
    visibility: hidden;
    z-index: 999;
  }
}
.map-spread-tooltip {
  z-index: 9999999999999999999 !important;
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
.map-spread-add-tip {
  width: 150px;
  word-break: break-all;
}

.map-spread {
  &.elAdd {
    .dashboard {
      top: 65px;
      bottom: 56px;
      left: 20px;
    }
  }
  .el-main {
    position: relative;
    padding: 0;
  }
  .dashboard {
    width: 225px;
    position: absolute;
    top: 15px;
    bottom: 15px;
    left: 9px;
    z-index: 99;
  }
  .search {
    position: absolute;
    top: 0;
    left: -1px;
    right: -1px;
    height: 40px;
    border: 1px solid rgb(106, 218, 249);
    background: rgb(0, 155, 198);
    .text {
      font-size: 13px;
      color: rgb(71, 243, 236);
      line-height: 40px;
      position: absolute;
      left: 8px;
      &:after {
        content: "";
        height: 20px;
        width: 1px;
        background: rgb(154, 196, 193);
        position: absolute;
        right: -8px;
        top: 10px;
      }
    }
    .select {
      position: absolute;
      right: 0;
      top: 3px;
      left: 30px;
      width: 182px;
      .el-input__inner {
        background-color: transparent;
        border: none;
        color: #fff;
        text-align: right;
        padding-right: 18px;
        padding-left: 6px;
      }
      // 去除默认图标
      .el-input--small {
        &.is-focus {
          .el-input__suffix {
            &:after {
              transform: rotate(180deg) translateY(5px);
            }
          }
        }
        .el-input__suffix {
          &:after {
            content: "";
            border: 6px solid transparent;
            border-top-color: #fff;
            position: absolute;
            right: 0px;
            top: 14px;
            transition: all 0.2 ease;
          }
          .el-input__suffix-inner {
            display: none;
          }
        }
      }
      >li {
        float: left;
        width: 50%;
      }
    }
  }
  .lists {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
    padding: 0 1px;
    .content {
      height: 100%;
      width: 100%;
      margin: 0;
      background-color: rgba(26, 32, 40, 0.7);
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0px;
      }
    }
    li {
      position: relative;
      height: 100px;
      padding-left: 12px;
      color: #fff;
      padding-top: 10px;
      cursor: move;
      user-select: none;
      overflow: hidden;
      &.itemActive {
        background: transparent url(../../assets/images/select_hl.png) 0px -8px
          no-repeat no-repeat;
        background-size: 224px 126px;
      }
      .title {
        font-size: 14px;
        line-height: 18px;
        // padding-right: 2px;
      }
      .box {
        padding: 0px;
        height: 100%;
        border-bottom: 1px solid rgb(104, 123, 124);
        box-sizing: border-box;
        img {
          width: 24px;
          vertical-align: baseline;
          z-index: 9999;
          cursor: pointer;
        }
        .device-monitor {
          width: 28px;
          position: absolute;
          right: 15px;
          top: 53px;
        }
        span {
          &.address {
            max-width: 200px;
            min-height: 30px;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          &.title {
            display: inline-block;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      div {
        font-size: 10px;
        text-align: left;
        padding: 3px 0;
        &.flag {
          position: absolute;
          right: 15px;
          top: 28px;
          padding-left: 15px;
          color: rgb(234, 71, 72);
          i {
            position: absolute;
            width: 8px;
            height: 8px;
            border: 1px solid rgb(234, 71, 72);
            left: 0;
            top: 6px;
            border-radius: 50%;
            &:after {
              content: "";
              display: block;
              width: 4px;
              height: 4px;
              background-color: rgb(234, 71, 72);
              border-radius: 50%;
              margin: 2px auto;
            }
          }
          &.nouse {
            color: rgb(44, 234, 60);
            i {
              border-color: rgb(44, 234, 60);
              &:after {
                background-color: rgb(44, 234, 60);
              }
            }
          }
        }
      }
      .camera {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: transparent;
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
  .modal.full-screen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99;
    padding: 3% 6%;
    .contain {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 10px;
    }
    $base-size: 28px;
    .close-submap {
      position: absolute;
      right: $base-size;
      top: $base-size;
      width: $base-size;
      height: $base-size;
      font-size: $base-size;
      border-radius: 50%;
      background-color: #fefefe;
      &:active {
        background-color: darken(#fefefe, 5%);
      }
    }
  }
  .save {
    position: absolute;
    top: 10%;
    right: 10%;
    button {
      width: 100px;
    }
  }
}
</style>