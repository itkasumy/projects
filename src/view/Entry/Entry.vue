<template>
  <div>
    <div class="topContainer">
      <div class="cctv1">
        <div class="videoContent">
          <div class="titlee">执法现场实况直播</div>
          <div class="vt">
            <EasyPlayer class="my-video" live :videoUrl="rtmpUrl1" :autoplay="true"></EasyPlayer>
            <div class="time">{{curTime}}</div>
          </div>
          <div class="bottomContent1">
            <ul class="matchListWrap" ref="matchListWrap">
              <li class="matchList" v-for="item in helmatList1" :key="item.id" :class="{active: item.isActive1}" @click="handHelmat1(item)">
                <div class="name">{{item.userName}}</div>
                <div class="code">{{item.deviceNum}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="dbg">
        <div class="titlee">民警执法第一视角直播</div>
        <div class="cctv2">
          <div class="secondVideoContent">
            <EasyPlayer class="my-video" :videoUrl="rtmpUrl2" live :autoplay="true"></EasyPlayer>
            <div class="time">{{curTime}}</div>
          </div>
        </div>
        <div class="infoContent" ref="infoContent">
          <div class="faceDetect" v-show="faceDetectShow" v-for="(item, index) in eTuList" :key="index">
            <div class="briefInfo">
              <div class="readFace">
                <div class="face"><img :src="item.oriPic" alt=""></div>
              </div>
              <div class="semblance"><p class="xiangshidu">{{item.similarity ? Number(item.similarity).toFixed(2) : 0}}%</p>相似度</div>
              <div class="sourceFace">
                <div class="face"><img :src="`data:image/png;base64,${item.searchPic}`" alt=""></div>
              </div>
            </div>
            <div class="detailInfo">
              <ul>
                <li class="clearfix">
                  <span class="typeName">姓名</span>
                  <span class="typeVal">{{item.xm || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">常用联系电话</span>
                  <span class="typeVal">{{item.cylxdh || '暂无'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">上次来沪日期</span>
                  <span class="typeVal">{{item.sclhrq || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">身份标签</span>
                  <span class="typeVal">{{item.zdrysfbq ? item.zdrysfbq : "未知"}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">性别</span>
                  <span class="typeVal">{{item.xb || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">出生日期</span>
                  <span class="typeVal">{{item.csrq || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">证件号码</span>
                  <span class="typeVal">{{item.zjhm || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">国籍</span>
                  <span class="typeVal">{{item.gj || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">联系地址</span>
                  <span class="typeVal">{{item.lxdz || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">居住类型</span>
                  <span class="typeVal">{{item.jzlx || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">是否有在逃记录</span>
                  <span class="typeVal">{{item.sfyztkjl || '未知'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">是否有精神病史</span>
                  <span class="typeVal">{{item.sfyjsbs || '未知'}}</span>
                </li>
              </ul>
            </div>
            <div class="divideLine"></div>
          </div>
          <div class="plateNumberDetect" v-show="plateNumberDetectShow">
            <div class="plateNuberPhoto">
              <img :src="ycyd.ycydPic" alt="">
            </div>
            <div class="ownerInfo">
              <div class="title">车主信息</div>
              <ul>
                <li class="clearfix">
                  <span class="typeName">车牌号</span>
                  <span class="typeVal">{{ycyd.djHPHM ? ycyd.djHPHM : ycyd.plateNum}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">姓名</span>
                  <span class="typeVal">{{ycyd.xm}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">性别</span>
                  <span class="typeVal">{{ycyd.xb}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">住所地址</span>
                  <span class="typeVal">{{ycyd.zsxxdz}}</span>
                </li>
              </ul>
            </div>
            <div class="peccancyInfo">
              <div class="title">违章信息</div>
              <ul>
                <li class="clearfix">
                  <span class="typeName">违章处理机构</span>
                  <span class="typeVal">{{ycyd.wfCLJGMC}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">违法地址</span>
                  <span class="typeVal">{{ycyd.wfWFDZ}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">违法时间</span>
                  <span class="typeVal">{{ycyd.wfWFSJ}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">处理时间</span>
                  <span class="typeVal">{{ycyd.wfCLSJ}}</span>
                </li>
              </ul>
            </div>
            <div class="registerInfo">
              <div class="title">登记信息</div>
              <ul>
                <li class="clearfix">
                  <span class="typeName">出厂日期</span>
                  <span class="typeVal">{{ycyd.djCCRQ}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">初次登记日期</span>
                  <span class="typeVal">{{ycyd.djCCDJRQ}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">登记日期</span>
                  <span class="typeVal">{{ycyd.djDJRQ}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">总质量</span>
                  <span class="typeVal">{{ycyd.djZZL}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">使用性质</span>
                  <span class="typeVal">{{ycyd.djSYXZ}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">车身颜色</span>
                  <span class="typeVal">{{ycyd.djCSYS}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">车外廓宽</span>
                  <span class="typeVal">{{ycyd.djCWKK}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">车外廓高</span>
                  <span class="typeVal">{{ycyd.djCWKG}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">车外廓长</span>
                  <span class="typeVal">{{ycyd.djCWKC}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">中文品牌</span>
                  <span class="typeVal">{{ycyd.djCLPP1}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">发动机号</span>
                  <span class="typeVal">{{ycyd.djFDJH}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="IDDetect" v-show="IDDetectShow">
            <div class="IDPhoto">
              <img :src="yryd.yrydPic" alt="">
            </div>
            <div class="IDinfo">
              <div class="title">身份信息</div>
              <ul>
                <li class="clearfix">
                  <span class="typeName">姓名</span>
                  <span class="typeVal">{{yryd.xm}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">性别</span>
                  <span class="typeVal">{{yryd.xb}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">出生日期</span>
                  <span class="typeVal">{{yryd.csrq}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">上次来沪日期</span>
                  <span class="typeVal">{{yryd.sclhrq}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">证件号码</span>
                  <span class="typeVal">{{yryd.zjhm}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">人员身份标签</span>
                  <span class="typeVal">{{yryd.zdrysfbq ? yryd.zdrysfbq : "未知"}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">常用联系电话</span>
                  <span class="typeVal">{{yryd.cylxdh || '暂无'}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">国籍</span>
                  <span class="typeVal">{{yryd.gj}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">联系地址</span>
                  <span class="typeVal">{{yryd.lxdz}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">居住类型</span>
                  <span class="typeVal">{{yryd.jzlx}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">是否有在逃记录</span>
                  <span class="typeVal">{{yryd.sfyztkjl}}</span>
                </li>
                <li class="clearfix">
                  <span class="typeName">是否有精神病史</span>
                  <span class="typeVal">{{yryd.sfyjsbs}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="publishWanted" v-show="gaodeMapShow">
            <div id="map" ref="gaodeRef"></div>
          </div>
          <div class="tongjilingPDF" v-show="pdfShow">
            <embed :src="pdfUrl" type="application/pdf" width="100%" height="100%">
          </div>
          <div id="publishWanted">
            <span class="ctrlIcon" :class="releaseNoteShow ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" @click="releaseNoteShow = !releaseNoteShow"></span>
            <div class="releaseNote" :class="{active: releaseNoteShow}">
              <div class="typeSel">
                <!-- <el-select v-model="typeSel" placeholder="请选择发布类型">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select> -->
                <el-upload
                  class="pdfUploader"
                  ref="pdfUploader"
                  action=""
                  :limit="1"
                  :multiple="false"
                  :auto-upload="false"
                  :on-change="handleChange"
                  accept=".doc,.docx,.pdf"
                >
                  <!-- :http-request="handleUpload" -->
                  <el-button slot="trigger" size="small" @click="clearPDF" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="handleUpload">点击推送</el-button>
                </el-upload>
              </div>
              <!-- <div class="destinationSetting">
                <el-button @click="searchDesShow = !searchDesShow" v-show="!searchDesShow" plain>搜索目的地</el-button>
                <el-input v-show="searchDesShow" @keyup.native="searchDestination" v-model="destination" placeholder="请输入搜索目的地"></el-input>
              </div> -->
            </div>
          </div>
        </div>
        <div class="bottomContent2">
          <ul class="matchListWrap" ref="matchListWrap">
            <li class="matchList" v-for="item in helmatList2" :key="item.id" :class="{active: item.isActive2}" @click="handHelmat2(item)">
              <div class="name">{{item.userName}}</div>
              <div class="code">{{item.deviceNum}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IMAP from 'IMAP'
import { getHelmatList, uploadWordPDF } from 'http'
// import { getHelmatList, getLocationList, uploadWordPDF } from 'http'
import { dateFmt } from 'common/js/util'
import EasyPlayer from 'easy-player'
import BScroll from 'better-scroll'
import { mapActions, mapGetters } from 'vuex'
// 路网
const addRoadNetLayer = map => {
  let ROADNET_URL = 'http://172.19.60.6:25777/v3/tile?x={x}&y={y}&z={z}'
  const getRoadTileUrl = (x, y, z) => ROADNET_URL.replace('{x}', x).replace('{y}', y).replace('{z}', z)
  const RoadLayer = new IMAP.TileLayer({
    maxZoom: 20,
    minZoom: 1,
    tileSize: 256
  })
  RoadLayer.setTileUrlFunc(getRoadTileUrl)
  RoadLayer.setOpacity(0.9)
  map.addLayer(RoadLayer)
  return RoadLayer
}

// 删除点标注
/* const delMarker = (marker, map) => {
  if (!marker) {
    return
  }
  map.getOverlayLayer().removeOverlay(marker)
  marker = null
} */

// 更新点标注
/* const updateMarker = (marker, lng, lat) => {
  if (!marker) {
    return
  }
  const icon = new IMAP.Icon(`${IMAP.MapConfig.API_REALM_NAME}images/point_1.png`, {
    'size': new IMAP.Size(35, 30),
    'offset': new IMAP.Pixel(1, 0)
  })
  marker.setIcon(icon)
  marker.setPosition(new IMAP.LngLat(lng, lat))
} */

// 添加点标注
/* const addMarker = (map, lng, lat, marker) => {
  delMarker(marker, map)
  const opts = new IMAP.MarkerOptions()
  opts.anchor = IMAP.Constants.BOTTOM_CENTER
  opts.icon = new IMAP.Icon(`${IMAP.MapConfig.API_REALM_NAME}images/point_1.png`, {
    'size': new IMAP.Size(35, 30),
    'offset': new IMAP.Pixel(1, 0)
  })
  const lnglat = new IMAP.LngLat(lng, lat)
  if (lnglat) {
    marker = new IMAP.Marker(lnglat, opts)
    map.getOverlayLayer().addOverlay(marker, true)
    console.log(1234567)
  }
} */

export default {
  data () {
    return {
      websocket: null,
      faceDetectShow: false,
      plateNumberDetectShow: false,
      IDDetectShow: false,
      gaodeMapShow: false,
      ycyd: {},
      yryd: {},
      eTuList: [],
      heartTimer: null,
      helmatList1: [],
      helmatList2: [],
      helmatActive1: 0,
      helmatActive2: 0,
      rtmpUrl1: 'rtmp://172.19.60.80:10554/live/989889',
      rtmpUrl2: 'rtmp://172.19.60.80:10554/live/123456',
      bookingInfo: {
        deviceId: '',
        order: 'openAllMsgPush',
        liveId: ''
      },
      startLatLng: null,
      destinationLatLng: null,
      mapInstance: null,
      drivingSearch: null,
      releaseNoteShow: false,
      options: [
        {
          value: 1,
          label: '通缉令'
        }
        // ,{
        //   value: 2,
        //   label: '图文消息'
        // }
      ],
      typeSel: '',
      destination: '',
      searchDesShow: false,
      marker: null,
      navgationTimer: null,
      nowTime: new Date(),
      file: null,
      msgType: 1,
      fileType: 1,
      bsroll: null
    }
  },
  mounted () {
    this.initWebSocket()
    setInterval(() => this.getHelmatLists(), 3000)
    this.$nextTick(() => {
      if (this.gaodeMapShow) {
        this.init()
      }
    })
    this.bsroll = new BScroll(this.$refs.infoContent)
    setInterval(() => {
      this.nowTime = new Date()
    }, 1000)
  },
  methods: {
    initWebSocket () {
      // this.websocket = new WebSocket('wss://zntk.police.sh.cn/websocket.action')
      this.websocket = new WebSocket('ws://172.19.60.80/websocket.action')
      this.websocket.onopen = this.websocketOnOpen
      this.websocket.onmessage = this.websocketOnMessage
      this.websocket.onclose = this.websocketClose
      this.websocket.onerror = this.websocketOnError
    },
    websocketOnOpen (e) {
      console.log(`open ${e}`)
      clearInterval(this.heartTimer)
      this.heartTimer = setInterval(() => {
        this.websocketSend('heartBeat')
      }, 10000)
    },
    websocketClose (e) {
      clearInterval(this.heartTimer)
      console.log(`connection closed (${e.code})`)
    },
    websocketSend (agentData) {
      this.threadPoxi(agentData)
    },
    threadPoxi (agentData) {
      if (this.websocket.readyState === this.websocket.OPEN) {
        this.websocket.send(agentData)
      } else if (this.websocket.readyState === this.websocket.CONNECTING) {
        setTimeout(() => this.websocket.send(agentData), 300)
      } else {
        setTimeout(() => this.websocket.send(agentData), 500)
      }
    },
    websocketOnMessage (e) {
      try {
        console.log(e.data)
      } catch (error) {
        console.log(1234)
      }
      if (e.data && e.data.resName !== 'heartBeat') {
        const resData = JSON.parse(e.data) || {}
        console.log(resData)
        if (resData.resName === 'ycyd') {
          this.faceDetectShow = false
          this.IDDetectShow = false
          this.plateNumberDetectShow = true
          this.gaodeMapShow = false
          this.setPdfShow(false)
          this.yryd = {}
          this.eTuList.splice(0)
          this.$set(this.ycyd, 'ycydPic', resData.ycydPic)
          if (resData.ycyd) {
            for (const key in resData.ycyd) {
              this.$set(this.ycyd, key, resData.ycyd[key])
            }
          }
        } else if (resData.resName === 'Etu') {
          this.faceDetectShow = true
          this.IDDetectShow = false
          this.plateNumberDetectShow = false
          this.gaodeMapShow = false
          this.setPdfShow(false)
          this.ycyd = {}
          this.yryd = {}
          const faceDetect = {}
          console.log(resData, '==============================================')
          faceDetect.oriPic = resData.oriPic
          if (resData.etuMsg.length === 0) {
            return
          }
          faceDetect.searchPic = resData.etuMsg[0].image_list[0].user_image
          faceDetect.similarity = resData.etuMsg[0].similarity_value
          this.eTuList.unshift(faceDetect)
          const userInfo = resData.etuMsg[0].userInfo
          for (let key in userInfo) {
            this.$set(this.eTuList[0], key, userInfo[key])
          }
          const user = resData.etuMsg[0].user
          for (let key in user) {
            this.$set(this.eTuList[0], key, user[key])
          }
          console.log(this.eTuList)
        } else if (resData.resName === 'yryd') {
          this.faceDetectShow = false
          this.IDDetectShow = true
          this.plateNumberDetectShow = false
          this.gaodeMapShow = false
          this.setPdfShow(false)
          this.eTuList.splice(0)
          this.ycyd = {}
          this.$set(this.yryd, 'yrydPic', resData.yrydPic)
          if (resData.yryd) {
            for (const key in resData.yryd) {
              this.$set(this.yryd, key, resData.yryd[key])
            }
          }
        } else if (resData.resName === 'mapStart') {
          this.faceDetectShow = false
          this.IDDetectShow = false
          this.plateNumberDetectShow = false
          this.gaodeMapShow = true
          this.setPdfShow(false)
          console.log('mapStart', resData)
          if (this.drivingSearch !== null) {
            this.drivingSearch.clear()
          }
          this.startLatLng = resData
          setTimeout(() => this.mapInstance.setCenter(new IMAP.LngLat(this.startLatLng.longitude, this.startLatLng.latitude), 17), 100)
        } else if (resData.resName === 'mapEnd') {
          console.log('mapEnd', resData)
          this.destinationLatLng = resData
          this.mapInstance.setCenter(new IMAP.LngLat(this.destinationLatLng.longitude, this.destinationLatLng.latitude), 17)
        } else if (resData.resName === 'GPSStrart') {
          this.routePlan()
          /* getLocationList().then(res => {
            console.log(`获取导航实时位置：`, res.data)
            res.data.obj.forEach(item => {
              if (item.deviceNum === this.bookingInfo.deviceId) {
                this.mapInstance.setCenter(new IMAP.LngLat(item.longitude, item.latitude), 17)
                if (this.marker) {
                  addMarker(this.mapInstance, item.longitude, item.latitude, this.marker)
                } else {
                  updateMarker(this.marker, item.longitude, item.latitude)
                }
              }
            })
          }).catch(err => {
            console.log(err)
          })
          this.navgationTimer = setInterval(() => {
            getLocationList().then(res => {
              console.log(`获取导航实时位置：`, res.data)
              res.data.obj.forEach(item => {
                if (item.deviceNum === this.bookingInfo.deviceId) {
                  this.mapInstance.setCenter(new IMAP.LngLat(item.longitude, item.latitude), 17)
                  if (this.marker) {
                    addMarker(this.mapInstance, item.longitude, item.latitude, this.marker)
                  } else {
                    updateMarker(this.marker, item.longitude, item.latitude)
                  }
                }
              })
            }).catch(err => {
              console.log(err)
            })
          }, 3000) */
        } else if (resData.resName === 'GPSEnd') {
          // delMarker(this.marker, this.mapInstance)
          console.log('GPSEnd', resData)
          this.drivingSearch.clear()
        }
      }
    },
    websocketOnError (e) {
      console.log(`error ${e}`)
    },
    closeLive () {
      this.$set(this.bookingInfo, 'order', 'liveClose')
      this.websocketSend(JSON.stringify(this.bookingInfo))
    },
    getHelmatLists () {
      this.helmatList1.splice(0)
      this.helmatList2.splice(0)
      getHelmatList().then(data => {
        console.log(data.data.obj)
        if (data.data.obj) {
          const list = []
          data.data.obj.forEach(item => {
            item.isActive1 = false
            item.isActive2 = false
            this.helmatList1.push(item)
            this.helmatList2.push(item)
            list.push(item.deviceNum)
          })
          if (this.helmatActive1) {
            this.helmatList1.forEach(item => {
              if (item.deviceNum === this.helmatActive1) {
                item.isActive1 = true
              }
            })
          } else {
            this.helmatList1[0].isActive1 = true
          }
          if (this.helmatActive2) {
            this.helmatList2.forEach(item => {
              if (item.deviceNum === this.helmatActive2) {
                item.isActive2 = true
              }
            })
          } else {
            this.helmatList2[0].isActive2 = true
          }
          this.setDeviceOnlineIdList(list)
        }
      })
    },
    handHelmat1 (item) {
      this.helmatList1.forEach(ele => {
        ele.isActive1 = false
      })
      item.isActive1 = true
      this.helmatActive1 = item.deviceNum
      // this.rtmpUrl1= `rtmp://zntk.police.sh.cn:10554/live/${item.liveId}`
      this.rtmpUrl1 = `rtmp://172.19.60.80:10554/live/${item.liveId}`
    },
    handHelmat2 (item) {
      this.helmatList2.forEach(ele => {
        ele.isActive2 = false
      })
      item.isActive2 = true
      this.helmatActive2 = item.deviceNum
      // this.rtmpUrl2= `rtmp://zntk.police.sh.cn:10554/live/${item.liveId}`
      this.rtmpUrl2 = `rtmp://172.19.60.80:10554/live/${item.liveId}`
      this.$set(this.bookingInfo, 'deviceId', item.deviceNum)
      this.$set(this.bookingInfo, 'order', 'live')
      this.$set(this.bookingInfo, 'liveId', item.liveId)
      this.websocketSend(JSON.stringify(this.bookingInfo))
    },
    init () {
      this.mapInstance = new IMAP.Map(this.$refs.gaodeRef, {
        minZoom: 4,
        zoom: 15,
        center: new IMAP.LngLat(121.49055, 31.23916),
        animation: true,
        keyboard: true
      })
      addRoadNetLayer(this.mapInstance)
      /* this.mapInstance.addEventListener(IMAP.Constants.CLICK, function (event) {
        var lnglat = event.lnglat
        alert(`您点击的当前位置为(${lnglat.lng}, ${lnglat.lat})`)
      }, this.mapInstance) */
    },
    routePlan () {
      this.mapInstance.plugin(['IMAP.Driving'], () => {
        this.drivingSearch = new IMAP.Driving({map: this.mapInstance})
        const slnglat = new IMAP.LngLat(this.startLatLng.longitude, this.startLatLng.latitude)
        const elnglat = new IMAP.LngLat(this.destinationLatLng.longitude, this.destinationLatLng.latitude)
        this.drivingSearch.search(slnglat, elnglat, () => Array.from(document.querySelectorAll('.leador-interactive')).forEach(item => {
          item.setAttribute('stroke', 'rgb(0, 255, 0)')
          item.setAttribute('stroke-width', '6')
        })
        )
      })
    },
    searchDestination (pageNo = 1) {
      this.mapInstance.plugin(['IMAP.PoiSearch'], () => {
        const poiSearch = new IMAP.PoiSearch({
          map: this.mapInstance,
          pageSize: 10,
          scope: 'all'
        })
        poiSearch.setPageNumber(parseInt(pageNo - 1))
        poiSearch.search(this.destination, '上海市')
      })
    },
    /* toPublish () {
      if (this.typeSel === 1) {
        this.faceDetectShow = false
        this.IDDetectShow = false
        this.plateNumberDetectShow = false
        this.gaodeMapShow = false
        // this.$router.push('/wanted')
      } else if (this.typeSel === 2) {
        this.$router.push('/graphicMsg')
      }
    }, */
    ...mapActions([
      'setDeviceOnlineIdList',
      'setDeviceIdActive',
      'setPdfShow',
      'setPdfUrl'
    ]),
    handleChange (file) {
      this.fileType = file.name.endsWith('.pdf') ? 2 : 1
      this.file = file
      console.log(this.fileType)
    },
    clearPDF () {
      this.$refs.pdfUploader.clearFiles()
    },
    handleUpload () {
      const fd = new FormData()
      fd.append('file', this.file.raw)
      fd.append('msgType', this.msgType)
      fd.append('fileType', this.fileType)
      fd.append('deviceIdList', this.deviceOnlineIdList)
      uploadWordPDF(fd).then(data => {
        const result = data.data
        this.setPdfUrl(result.obj.detailMsg)
      }).catch(err => {
        console.log(err)
      })
      this.$refs.pdfUploader.clearFiles()
      this.faceDetectShow = false
      this.IDDetectShow = false
      this.plateNumberDetectShow = false
      this.gaodeMapShow = false
      this.setPdfShow(true)
    }
  },
  watch: {
    gaodeMapShow: {
      handler (newVal) {
        this.$nextTick(() => {
          if (newVal) {
            this.init()
          }
        })
      }
    }
  },
  components: {
    EasyPlayer
  },
  computed: {
    curTime () {
      return dateFmt(this.nowTime)
    },
    ...mapGetters([
      'deviceIdActive',
      'pdfUrl',
      'pdfShow',
      'deviceOnlineIdList'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/mixin"
.topContainer
  display flex
  height 4.083333rem
  padding-bottom .078125rem
  .cctv1
    position relative
    whb 4.119792rem, 4.96875rem, "../../assets/common/images/left_16b9.png"
    margin-right .052083rem
    .titlee
      position absolute
      top 0
      width 100%
      height .3125rem
      line-height .3125rem
      letter-spacing .015625rem
      text-align center
      background linear-gradient(to right, rgba(0, 122, 226, 1), rgba(0, 122, 226, 0))
      color #fff
      font-size 24px
      font-weight 700
      z-index 9
    .time
      position absolute
      top .0625rem
      right .0625rem
      width .833333rem
      height .125rem
      line-height .125rem
      background rgba(0, 0, 0, .6)
      color #fff
      font-size .072917rem
      z-index 99
    .videoContent
      posTop 4.015625rem, 4.96875rem, "", .046875rem, .046875rem
      border-radius .052083rem
      overflow hidden
      .vt
        position absolute
        widthHeight 4.015625rem, 2.260417rem
        top .78125rem
        left -.015625rem
  .dbg
    position relative
    width 5.807292rem
    height 4.96875rem
    background url("../../assets/common/images/right_16b9.png") 0 0 / 100% 100% no-repeat
    .titlee
      position absolute
      left .052083rem
      top 0.046875rem
      width calc(100% - .104167rem)
      height .3125rem
      line-height .3125rem
      text-align center
      letter-spacing .015625rem
      background linear-gradient(to right, rgba(0, 122, 226, 1), rgba(0, 122, 226, 0))
      color #fff
      font-size 24px
      border-radius 0.052083rem 0.052083rem 0 0
      font-weight 700
      z-index 9
    .cctv2
      position relative
      width 2.916667rem
      height 4.96875rem
      .secondVideoContent
        position absolute
        widthHeight 2.916667rem, 1.640625rem
        top 1.145833rem
        left .052083rem
        .time
          position absolute
          top .0625rem
          right .0625rem
          width .833333rem
          height .125rem
          line-height .125rem
          background rgba(0, 0, 0, .6)
          color #fff
          font-size .072917rem
          z-index 99
    .infoContent
      position absolute
      right 10px
      top .416667rem
      whpb 2.083333rem, 4.088542rem, .208333rem .3125rem, "../../assets/common/images/readContentBg.png"
      overflow-y scroll
      .tongjilingPDF
        position absolute
        top 0
        right 0
        bottom 0
        left 0
      .faceDetect
        height 3.229167rem
        &:nth-child(1)
          padding-top 40px
        .briefInfo
          display flex
          height .9375rem
          .readFace
            whb .645833rem, .645833rem, "../../assets/common/images/readFace_bg.png"
            .face
              position relative
              widthHeight .645833rem, .645833rem
              border-radius 50%
              img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                border-radius 50%
            .detectName
              width .645833rem
              padding-top .052083rem
              ta()
              font-size .072917rem
              color #d8edff
          .semblance
            whpb .395833rem, .208333rem, .052083rem 0 0, "../../assets/common/images/semblance_bg.png"
            margin .1875rem .197917rem
            ta()
            color #d8edff
            font-size .0625rem
            .xiangshidu
              line-height .09375rem
              margin-bottom .020833rem
              color #17d1ff
              font-size .083333rem
          .sourceFace
            position relative
            whb .645833rem, .645833rem, "../../assets/common/images/readFace_bg.png"
            .face
              widthHeight .645833rem, .645833rem
              border-radius 50%
              img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                border-radius 50%
            .detectName
              width .645833rem
              padding-top .052083rem
              ta()
              font-size .072917rem
              color #d8edff
        .detailInfo
          font-size .0625rem
          li
            height .15625rem
            line-height .15625rem
          .typeName
            float left
            width .625rem
            height .15625rem
            textoverflow()
            color #a1b3c2
          .typeVal
            float left
            margin-left .375rem
            max-width .9375rem
            height .15625rem
            textoverflow()
            color #d8edff
        .divideLine
          height .010417rem
          bg "../../assets/common/images/readContentBg_top.png"
          margin .208333rem 0
      .plateNumberDetect
        .plateNuberPhoto
          margin 0 auto
          whpb .625rem, .625rem, .010417rem, "../../assets/common/images/readFace_bg.png"
          font-size 0
          img
            widthHeight .625rem, .625rem
            border-radius 50%
        .ownerInfo, .peccancyInfo, .registerInfo
          .title
            height .125rem
            line-height .125rem
            border-bottom 1px solid #3db5ff
            margin .078125rem 0
            color #3db5ff
            font-size .09375rem
            font-weight 600
          li
            height .15625rem
            line-height .15625rem
            font-size .0625rem
            .typeName
              float left
              width .625rem
              height .15625rem
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              color #a1b3c2
            .typeVal
              float left
              margin-left .375rem
              max-width .9375rem
              height .15625rem
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              color #d8edff
      .IDDetect
        .IDPhoto
          widthHeight 1.666667rem, .9375rem
          border 2px solid #3db5ff
          margin 0 auto
          font-size 0
          img
            widthHeight 1.666667rem, .9375rem
        .IDinfo
          .title
            height .125rem
            line-height .125rem
            border-bottom 1px solid #3db5ff
            margin .078125rem 0
            color #3db5ff
            font-size .09375rem
            font-weight 600
          li
            height .15625rem
            line-height .15625rem
            font-size .0625rem
            .typeName
              float left
              width .625rem
              height .15625rem
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              color #a1b3c2
            .typeVal
              float left
              margin-left .375rem
              max-width .9375rem
              height .15625rem
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              color #d8edff
      .publishWanted
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        #map
          position absolute
          top 0
          right 0
          bottom 0
          left 0
      #publishWanted
        position absolute
        top 0
        right 0
        z-index 1000
        .pdfUploader
          width 2.5rem
        .ctrlIcon
          position absolute
          top .072917rem
          right .052083rem
          width .208333rem
          height .208333rem
          background rgba(255, 255, 255, .8)
          border-radius .020833rem
          color #058
          cursor pointer
          &::before
            position absolute
            width .208333rem
            height .208333rem
            line-height .208333rem
            font-size .1875rem
            text-align center
            font-weight 800
        .releaseNote
            position absolute
            top .052083rem
            right .338542rem
            width 0
            height .25rem
            border-radius .020833rem
            overflow hidden
            transition width .6s
            &.active
              width 2.083333rem
            .typeSel
              position absolute
              top .020833rem
              left 0
              width .755208rem
              height .208333rem
              line-height .208333rem
              text-align center
              font-size .083333rem
            .destinationSetting
              position absolute
              top .020833rem
              left .807292rem
              width .9375rem // 180px
              height .208333rem
              line-height .208333rem
              text-align center
              font-size .083333rem
            .publishIcon
              position absolute
              top .020833rem
              right .020833rem
              width .208333rem
              height .208333rem
              line-height .208333rem
              text-align center
              background rgba(255, 255, 255, .8)
              border-radius .020833rem
              cursor pointer
              font-size .083333rem
              font-weight 700
              color #058
        #resultDiv
          position absolute
          left 0
          top .3125rem
          width 1.666667rem
          height 2.083333rem
          font-size .072917rem
          z-index 1200
.bottomContent1
  position absolute
  width 4rem
  height 1.041667rem
  top 3.354167rem
  // bg "../../assets/common/images/hel_deviceListBg.png"
  overflow-y scroll
  .matchListWrap
    position absolute
    width 4rem
    height 1.041667rem
    display flex
    flex-wrap wrap
.bottomContent2
  position absolute
  width 2.916667rem
  height 1.041667rem
  left .052083rem
  top 3.40625rem
  // bg "../../assets/common/images/hel_deviceListBg.png"
  overflow-y scroll
  .matchListWrap
    position absolute
    width 2.916667rem
    height 1.041667rem
    display flex
    flex-wrap wrap
.matchList
  position relative
  whpb_ .520833rem, .520833rem, .104167rem, "../../assets/common/images/hel_deviceBg.png", .104167rem, .104167rem, .520833rem, .520833rem
  ta()
  color #26b7ff
  cursor pointer
  .name
    posTop .729167rem, .104167rem, "", .260417rem
    ta()
    font-size .083333rem
  .code
    posTop .729167rem, .104167rem, "", .390625rem
    ta()
    font-size .0625rem
  &.active
    whpb_ .625rem, .625rem, .052083rem, "../../assets/common/images/hel_deviceListBg_focus.png", .052083rem, .052083rem, .625rem, .625rem
    color #d8fdff
    .name
      posTop .729167rem, .104167rem, "", .260417rem
      ta()
      font-size .09375rem
      font-weight 600
    .code
      posTop .729167rem, .104167rem, "", .390625rem
      ta()
      font-size .072917rem
</style>

<style lang="stylus">
@import "~common/style/mixin"
.my-video
  widthHeight 4.015625rem, 2.260417rem
  .video-wrapper
    widthHeight 4.015625rem, 2.260417rem
.secondVideoContent
  .my-video
    widthHeight 2.916667rem, 1.640625rem
    .video-wrapper
      widthHeight 2.916667rem, 1.640625rem
.typeSel
  width .9375rem
  margin-left .3125rem
  .el-input__inner
    width .9375rem
    height .208333rem
    line-height .208333rem
</style>
