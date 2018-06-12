<template>
    <div id='map1'>

        <!-- 下边主体 -->
        <el-main 
        id='elMain'
        class="person-track"  
        v-loading="loading"
        element-loading-text="检索中......"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" >
            <!-- 上边 -->
            <div id="searchTop">
                <!-- 选择检索方式 -->
                <div class="searchOption">
                    <el-select v-model="searchWay"  placeholder="检索方式" :popper-append-to-body='false'>
                      <el-option
                      v-for="item in searchOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </div>
                <!--输入框  -->
                <div class="bodyId" v-show="!isShowPedestrianTrack">
                    <!-- 人员检索 -->
                    <div class="personSearch"  v-show="isSwitch">
                        <el-input id="input"  @change='searchWord'  size="mini" v-model="input" debounce=300  placeholder="输入姓名/手机号/身份证"></el-input>
                        <el-tooltip class="item" effect="dark" content="点击搜索按钮进行搜索" placement="top">
                          <span class="el-icon-search"  @click="beginSearchWord"></span>
                        </el-tooltip>
                    </div>
                    <!-- 导入人脸检索 -->
                    <div class="faceSearch" v-show="!isSwitch">
                        <el-upload
                            class="upload-demo"
                            action=""
                            :limit= '1'
                            list-type="picture"
                            :on-remove="handleRemove"
                            :on-exceed="onExceed"
                            :before-upload="beforeUpload"
                            :on-preview="handlePreview"
                            :on-error="onError"
                            :on-success="onSuccess"
                            :http-request="submitUpload"
                            clearFiles
                            :auto-upload="true"
                            id="upload"
                            ref="upload">
                            <el-button size="small" :disabled="processing" type="primary">{{ uploadTip }}</el-button>
                        </el-upload>
                        <!-- <el-button  @click="btn">搜索</el-button> -->
                    </div>
                    <!-- 假的img -->
                    <div class="fakeFace" v-if='base64url' >
                      <i class="el-icon-close" @click="closeFakeFace"></i>
                      <img :src="base64url"  alt="">
                    </div>
                </div>
                <!-- 选择筛选 -->
                <div ref="selectedRef" class="selected">
                    <!-- 时间选择 -->
                    <el-date-picker  @change="limitPedestrianTime" :appendToBody="false" v-model="time" type="datetimerange" size="mini" prefix-icon='el-icon-date' start-placeholder="开始时间" end-placeholder="结束时间" >
                    </el-date-picker>
                    <!-- 阀值 -->
                    <el-input v-show="!isShowPedestrianTrack" id="input" size="mini"  class="maxVal" @blur='judgeThreshold'  clearable v-model="threshold"  placeholder="阀值1-100"></el-input>
                    <el-input v-show="isShowPedestrianTrack" id="input" size="mini"  class="PedestrianThreshold"   clearable v-model="pedestrianThreshold"  placeholder="填写置信度"></el-input>
                    <i v-show="!isShowPedestrianTrack">%</i>
                </div>
                <div class="searchAgain" v-show="isSearchAgain">
                    <el-button @click="searchAgain">重新搜索</el-button>
                </div>
                <div class="searchPedestrianAgain" v-show="isShowPedestrianTrack">
                    <el-button @click="searchPedestrianTrackAgain">重新搜索</el-button>
                </div>
                <!-- 测试 -->
                <div v-show="isShowPedestrianTrack" class="uidSearchTrack">
                  <el-tooltip class="item" effect="dark" content="按重新搜索" placement="top">
                    <el-input v-model="uidPedestrianTrack" placeholder="根据uid搜索行人轨迹" :clearable="true"></el-input>
                  </el-tooltip>
                </div>
                <div class="wifiTrack" v-if="isShowWifiTrack">
                  <el-checkbox v-model="isCheckedWifiTrack">WIFI轨迹</el-checkbox>
                </div>
                <!-- 测试 -->
                <!-- 切换展示 -->
                <div class="change">
                  <el-button @click="changeType" v-show="isSwitch&&!isShowPedestrianTrack">.</el-button>
                </div>
            </div>
            <!-- 地图 -->
            <div id="allMap" style="width:100%; height:100%">
            </div>
            <!-- 人员检索侧边 -->
            <div id="trackMask" v-show="isSwitch&&!isShowPedestrianTrack">
                <div class="result">
                    共搜索到
                    <span>{{ personDate.length }}</span>条结果
                    <i @click="reset">重置</i>
                </div>
                <!-- 边框 -->
                <ul class="line">
                    <li class="lineTest"></li>
                    <li class="lineTest"></li>
                    <li class="lineTest"></li>
                    <li class="lineTest"></li>
                </ul>
                <!-- 搜索结果 -->
                <ul class="open">
                    <li  v-for="(item , index) in personDate" :key="index" @click="addBg(index,item.personId)" :class="isSelect==index?'addBg':''" type="expand">
                        <img :src="item.personPhoto" alt="">
                        <span>{{ item.personName}}</span>
                        <i :class="isRemark[index]=='0'?'remark':'noRemark'" :id="item.personId"  @click.stop="addRemark(item.personId , index)"></i>
                        <!-- <i :class="item.targetKeyFlag=='0'?'remark':'noRemark'" :id="item.personId"  @click.stop="addRemark(item.targetKeyFlag , item.personId , index)"></i> -->
                        <!-- 拓展出来的 -->
                        <ul v-show="isSelect==index">
                            <li>
                                <span>性别</span>
                                <i>{{ item.personSex }}</i>
                            </li>
                            <li>
                                <span>类型</span>
                                <i>{{ item.personTypeIdName }}</i>
                            </li>
                            <li>
                                <span>手机号码1</span>
                                <i>{{ item.personPhone1 }}</i>
                            </li>
                            <li>
                                <span>手机号码2</span>
                                <i>{{ item.personPhone2 }}</i>
                            </li>
                            <li>
                                <span>身份证号</span>
                                <i>{{ item.identityCard }}</i>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
						<!-- 行人轨迹侧边 -->
						<div id="pedestrianTrackMask" v-show="isShowPedestrianTrack">
                <div class="result">
                    共搜索到
                    <span>{{ pedestrianData.length }}</span>条结果
                    <i @click="resetPedestrianTrack">重置</i>
                </div>
                <ul class="line">
                    <li class="lineTest"></li>
                    <li class="lineTest"></li>
                    <li class="lineTest"></li>
                    <li class="lineTest"></li>
                </ul>
                <div class="pedestrianResult">
                  <el-scrollbar ref="_navScrollbar_">
                  <!-- <ul class="pedestrianResult"> -->
                    <ul>
                      <li v-for="(item, index) in pedestrianData" :key="index" @click="drawPedestrianTrack(index, item.uId)" :class="addPedestrianHeightLight==index?'selected':''">
                        <img :src="item.faceByte" alt="">
                      </li>
                    </ul>
                  </el-scrollbar>
                </div>
            </div>
                <el-dialog
                    title=""
                    :visible.sync="dialogPersonVisible"
                    width="89%"
                    top='100px'
                    id="fullPersonScreen"
                    v-if="dialogPersonVisible"
                    :modal='true'>
                      <!-- <img :src="fullScreenData.img" v-show="fullScreenData.isPlay" id='screenShot' style="width:100%;height:100%;" alt="" @click="getSuspectPoint" @mousemove="changeMouseStyle">
                      <el-button  v-show="fullScreenData.isPlay" @click="playVideo(fullScreenData.faceId , fullScreenData)" class="btn"></el-button>
                      <el-button v-show="fullScreenData.isPlay" class="btnShot" @click="screenshotBtn" ></el-button>
                      <el-tooltip class="item" effect="dark" content="查询人员轨迹" placement="top">
                        <el-button v-show="screenControlFlag" class='checkTrack' @click="checkTrack"></el-button>
                       </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="添加为重点人员" placement="top">
                        <el-button v-show="screenControlFlag" class='addSuspectPerson el-icon-warning' @click='addSuspectPerson'></el-button>
                       </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="下载" placement="top">
                        <a id="download_img" v-show="screenControlFlag" href="javascript:;" download="download.jpg" class='download el-icon-download' @click="download"></a>
                       </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="退出" placement="top">
                        <el-button v-show="screenControlFlag" class='exit el-icon-close' @click="exit"></el-button>
                       </el-tooltip> -->
                      <canvas id="toBigScreen" v-show="true" width='1708px' height='780px' ></canvas>
                 </el-dialog>
            <!-- 切换的视频模式 -->
     
            <div id="videoPlay" v-show="isShow" >
              <el-dialog
                :title="'布控人员: '+fullScreenData.personName"
                :visible.sync="dialogVisible"
                :before-close="handleClose"
                width="89%"
                top='100px'
                id="fullScreen"
                v-if="dialogVisible"
                :modal='true'>
                  <img :src="fullScreenData.img" v-show="fullScreenData.isPlay" id='screenShot' style="width:100%;height:100%;" alt="" @click="getSuspectPoint" @mousemove="changeMouseStyle">
                  <el-button  v-show="fullScreenData.isPlay" @click="playVideo(fullScreenData.faceId , fullScreenData)" class="btn"></el-button>
                  <el-button v-show="fullScreenData.isPlay" class="btnShot" @click="screenshotBtn" ></el-button>
                  <el-tooltip class="item" effect="dark" content="查询人员轨迹" placement="top">
                    <el-button v-show="screenControlFlag" class='checkTrack' @click="checkTrack"></el-button>
                    </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="添加为重点人员" placement="top">
                    <el-button v-show="screenControlFlag" class='addSuspectPerson el-icon-warning' @click='addSuspectPerson'></el-button>
                    </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="下载" placement="top">
                    <a id="download_img" v-show="screenControlFlag" href="javascript:;" download="download.jpg" class='download el-icon-download' @click="download"></a>
                    </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="退出" placement="top">
                    <el-button v-show="screenControlFlag" class='exit el-icon-close' @click="exit"></el-button>
                    </el-tooltip>
                  <canvas :id="fullScreenData.faceId" v-show="!fullScreenData.isPlay" width='1708px' height='780px' @click="pauseScreen(fullScreenData)"></canvas>
              </el-dialog>
              <div class="outer" v-if="!dialogVisible">
                  <div class="box" id="box" v-for="(item,index) in  personDate" :key="item.personId" :class="item.isPlay?'play':''">
                      <img :src="item.img" v-show="item.isPlay" style="width:100%;height:100%;" alt="">
                      <el-button v-show="item.isPlay" @click="playVideo(item.faceId , item )" class="btn"></el-button>
                      <canvas :id="item.faceId" v-show="!item.isPlay" width='558px' height='252px'  @click="pauseScreen(item)"></canvas>    
                      <span>布控人姓名: {{item.personName}} <i @click.stop="fullScreen(personDate[index])"></i></span>
                  </div>
              </div>
            </div>
        </el-main>
        <mapAndVectorSwitch 
        :url="'/vectorIllustration/personTrackVector'"
        :inSatellitePage="true"
        :inPngPage="false"
        class="mapAndVectorSwitch"
        style="display:none;"
        >
        </mapAndVectorSwitch>
    </div>
</template>

<script>
// 地图的组件
import { createMap } from "../../common/js/createMap.js";
// 导入点击出现视屏的事件
import { setNodeVideo } from "../../common/js/setVideoMarker.js";
// 导入出现用户头像
import { setLevelIcon } from "../../common/js/setLevelIcon.js";
// 导入播放视频
import  "../../common/js/frameAnimation.js";
// 导入提示错误
import { errorException } from './js/tip.js'
// 时间过滤器
import { dateFmt } from "../../common/js/utils.js";
// 截图
import  './corpper/cropper.esm.js';
// 跳转添加重点人员
import { addSuspectPerson } from './js/addSuspectPerson.js';
import mapAndVectorSwitch from '@/components/mapAndVectorSwitch'

export default {
  data() {
    return {
        lastAni:null,
        pickerOptions:{},
      resizeScrollBar: () => { try { this.$refs._navScrollbar_.update() } catch(e) {} },
      url1: "",
      url2: "",
      url3: '',
      url4: '',
      url5: '',
      // url1: 'http://10.12.26.180:8088',              // 人员轨迹
      // url5: 'http://10.12.26.179:8083',       
    //  url4: 'http://10.12.26.3:20039',              // 二次拼接 照片路径   

      personDate: [],           // 初始化的人员信息
      searchWay: '0',           // 绑定的人员/人脸检索/行人检索的值
      isSwitch: true,           // 绑定切换人员/人脸检索模式
      searchOption: [
        {
        value: '0',
        label: '人员检索'
        },{
        value: '1',
        label: '人脸检索'
        },{
        value: '2',
        label: '行人检索'
        }
      ],
      input: "",                // 搜索的姓名手机号身份证
      threshold:  '80',         // 绑定的阈值
      isSelect: null,           // 被点击显示高亮
      isRemark: [],             // 假的重点人员标识符
      time:[dateFmt(+new Date() - 86400 * 1000), dateFmt(+new Date())],              // 绑定的时间
      path: [],               // 所有轨迹的数组
      fileList: [],
      map: null,              // 地图      
      line: null,             // 地图直线
      circle: [],             // 地图圆集合
      setIcon: null,          // 地图头像
      points: [],             // 地图点击标红的marker
      isShow: false,          // 切换展示视频
      uploadTip: "导入人脸",   // 上传图片的button变化
      processing:false,       // 上传按钮是否可用
      faceByte: null,         // 人脸字节流
      faceCircles: [],        // 存储所有圆
      faceMarkers: [],        // 存储所有marker
      faceLines: [],          // 存储所有人脸的直线轨迹
      ibs: [],                // 存储所有最后的头像marker
      loading: false,         // 加载的标识
      isSearchAgain: false,   // 显示人脸的重新搜索按钮
      isClickCircle: '',      // 点击判断圆
      dialogVisible: false,   // 全屏的弹出框
      dialogPersonVisible:false,
      fullScreenData: {},     // 全屏时的数据
      currentTimes: 0,        // 暂停的时间
      currentTimesFlag: false,// 暂停的flag

      base64url: null,                  // 存储截图的base64
      screenControlFlag: false,         // 截图的四种操作图标flag
      isShowPedestrianTrack: false,     // 行人检索时需要的展示
      addPedestrianHeightLight: null,   // 添加行人的高亮
      pedestrianData: [],               // 人行轨迹数据
      pointList:[{Xmin:742,Xmax:836,Ymin:346,Ymax:456,deltaX:94,deltaY:110}],
      imgPoints:[/* {img:require('../../../static/images/testVideoImgs/1.jpg'),pointLists:[{Xmin:742,Xmax:836,Ymin:346,Ymax:456,deltaX:94,deltaY:110}]} */],
      pedestrianThreshold: '30',           // 绑定行人置信度

      isCheckedWifiTrack: false,
      isShowWifiTrack: false,
      wifiTrackTimer: null,
      uidPedestrianTrack: null,
    };
  },
  watch:{
		"searchWay":function(val , old){ 
      if (val === '2') {// 行人---默认一个小时， 其余24小时
        this.time = [dateFmt(Date.now() - 3600*1000), dateFmt(Date.now())]
      } else {
        this.time = [dateFmt(Date.now() - 24*3600*1000), dateFmt(Date.now())]
      }

      // if(val === '2'){
      //   this.pickerOptions = {
      //     disabledDate(time) {
      //       // console.log(time)
      //       let curDate = (new Date()).getTime();
      //       let three = 2 * 24 * 3600 * 1000;
      //       let threeMonths = curDate - three;
      //       return time.getTime() > Date.now() || time.getTime() < threeMonths;
      //     }
      //   }
      // }else{
      //   this.pickerOptions = {
      //     disabledDate(time) {
      //       return false;
      //     }
      //   }
      // }
			if(val){
        this.clearMarker()
        this.isShowWifiTrack = false
				// 行人检索: isShowPedestrianTrack, 人员检索: isSwitch, 人脸检索: !isSwitch
				if(val == 2){
          this.resetPedestrianTrack()
					return
				}
				this.isShowPedestrianTrack = false
        this.$refs.selectedRef.style.marginLeft = '7.5rem'
				if(this.isSwitch){ this.isSelect = null; this.isShow = false; }; 
				if(!this.isSwitch){ this.$refs.upload.clearFiles(); }              
				this.isSwitch= val==0?true:false;
			}else{
				this.$message.error('请至少选择一种检索方式!');
			}
    },
    'isCheckedWifiTrack': function (val) {
      if(val){
        this.getWifiTrackData()
        let _that = this
        this.wifiTrackTimer = setInterval(function(){
          _that.getWifiTrackData()
        }, 5000);
        
      }else{
        clearInterval(this.wifiTrackTimer)
        this.search()
      }
    }
  },
  components: {
    mapAndVectorSwitch
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeScrollBar)
  },
  mounted() {
    window.addEventListener('resize', this.resizeScrollBar)
    this.map = createMap("allMap");//创建地图
    this.$root.Bus.$on('fullScreen',value => {
      if(value){
        // this.fullScreen = value;
        var fullscree = require('fullscreen')
        , el = document.getElementById('map1')
        , fs
        document.getElementById('map1').setAttribute('class','fullMap')
        document.getElementById('elMain').setAttribute('class','elMain')
        document.getElementById('searchTop').setAttribute('class','searchTop')
        document.getElementById('allMap').setAttribute('class','allMap')
        document.getElementById('trackMask').setAttribute('class','trackMask')
        document.getElementById('pedestrianTrackMask').setAttribute('class','pedestrianTrackMask')
        fs = fullscree(el)
        fs.request()
        el.webkitRequestFullscreen(Element.LLOW_KEYBOARD_INPUT)
        fs.on('release', function() {
          document.getElementById('map1').removeAttribute('class')
          document.getElementById('elMain').removeAttribute('class')
          document.getElementById('elMain').setAttribute('class', 'el-main person-track')
          document.getElementById('searchTop').removeAttribute('class')
          document.getElementById('allMap').removeAttribute('class')
          document.getElementById('trackMask').removeAttribute('class')
          document.getElementById('pedestrianTrackMask').removeAttribute('class')
        })
      }
    })
  },
  created() {
    this.isShowWifiTrack = false
    if(this.$route.query.param){
        // console.log(this.$route.query.param.faceByte);
       this.searchFace(this.$route.query.param);
    }else if(this.$route.query.faceId){
        this.searchWay = '人脸检索';
        this.search(this.$route.query.faceId,false);
        let var_this = this;
        this.realTimer = setInterval(function(){
            var_this.search(var_this.$route.query.faceId,false);
        },60000);
    }else if(this.$route.query.personId){
        // console.log('走的是直接查询' , this.$route.query.personId)
        this.getPersonDate(this.$route.query.personId)  // 获取默认人员信息
        return
    }else{
        this.getPersonDate();   // 获取默认人员信息
    }
  },
  methods: {
    getWifiTrackData () {
      const url = `${this.url1}/trace/personTrace/getWifiTraceByTime`
      let params = {
        "personId": this.personDate[this.isSelect].personId,
        "startTime": dateFmt(+new Date(this.time[0])),
        "endTime": dateFmt(+new Date(this.time[1]))
      }
      this.$axios.post(url, params).then(res =>{
        this.clearMarker()
        let 
        path = [],
        map = this.map,
        colorArr = ['red', 'green', 'yellow', 'blue', 'orange', 'pink'],
        colorIndex = 0,
        wifiData = res.data
        // console.log('wifi',wifiData)
        for (const key in wifiData) {
          path = []
          if (wifiData.hasOwnProperty(key)) {
            let element = wifiData[key]
            element.forEach(item => {
              path.push({
                lat: item.lat,
                lng: item.lng
              })
              this.circle[this.circle.length] = new google.maps.Circle({
                map: map,
                strokeColor: "#fff",
                strokeWeight: 1,
                strokeOpacity:0.8,
                fillColor: colorArr[colorIndex],
                fillOpacity: 1,
                center: new google.maps.LatLng(item.lat, item.lng),
                draggable: false,
                strokePosition: google.maps.StrokePosition.INSIDE,
                radius: 1.5,
                zIndex: 111,
              });
            })
            let line = new google.maps.Polyline({
              map: map,
              // path: ipss[key].coord,
              path:path,
              strokeOpacity: 0.5,
              strokeWeight: "1",
              strokeColor: colorArr[colorIndex],
              zIndex: 10
            });
            this.faceLines.push(line);
            // console.log(this.circle)
          }
          ++colorIndex
        }
      }).catch(res => {
        this.$message.error('wifi轨迹绘制失败!');
      })
    },
    //  获取人员信息
    getPersonDate(param) {
        let personSex = '';
        this.personDate = [];
        this.isRemark = [];
        //   搜索框确定 url
        const url = param?`${this.url1}/trace/personTrace/getTrackPersonListByParam?param=${param}`:`${this.url1}/trace/personTrace/getTrackPersonListByParam`;
        this.$axios.get(url).then(res => {
            // console.log('详细信息',res.data)//personId请求详细信息
            // 求基本信息
            res.data.forEach(item => {
                let photo = item.personPhoto?`${this.url4}/upload/showImg?id=` + item.personPhoto + `&moudle=trace`:require("../../assets/images/noPhoto.png")
                let img = item.img?`${this.url4}/upload/showImgPath?path=` + item.img + `&moudle=trace`:require("../../assets/images/video_defaultPhoto.png")
                // 求详细信息
                const ur = `${this.url2}/info/person/getPersonDetailListById/${item.personId}`;
                this.$axios.get(ur).then(ele => {
                    // console.log('详细信息:' , ele.data)
                    let list = [];
                    list = ele.data[0];
                    switch (list.personSex) {
                        case "0":
                            personSex = '未知'
                            break;
                        case "1":
                            personSex = '男'
                            break;
                        case "2":
                            personSex = '女'
                            break;
                        default:
                            personSex = '未知'
                            break;
                    }   
                    this.isRemark.push(item.targetKeyFlag);  
                    this.personDate.push({
                            "personId": item.personId,
                            "personName": item.personName,
                            "personPhoto": photo,
                            "identityCard": item.identityCard,
                            "targetKeyFlag": item.targetKeyFlag,
                            "targetLevel": item.targetLevel,
                            "faceId": item.faceId,
                            "img": img, // 封面图片
                            "personSex": personSex,
                            "personTypeIdName": list.personTypeIdName,
                            "personPhone1": list.personPhone1,
                            "personPhone2": list.personPhone2 ,
                            "isPlay": true,  
                            "ani": null,              // 代表着需要播放的视频本身
                            "isPause": false,         // 暂停视频
                            "imgs": null,             // 存储所有的图片

                    });
                }).catch(() => {
                    this.isRemark.push(item.targetKeyFlag); 
                    this.personDate.push({
                        "personId": item.personId,
                        "personName": item.personName,
                        "personPhoto": photo,
                        "identityCard": item.identityCard,
                        "targetKeyFlag": item.targetKeyFlag,
                        "targetLevel": item.targetLevel,
                        "faceId": item.faceId,
                        "img": img, // 封面图片
                        "isPlay": true,
                        'ani': null,              // 代表着需要播放的视频本身
                        "isPause": false,         // 暂停视频
                        "imgs": null,             // 存储所有的图片
                        
                    })
                    this.$message({
                        type: "info",
                        message: `${item.personName}不存在详细信息`
                    });
                });
            });
        })
        .catch(res => {
            // errorException(this , res)
            this.$message.error('服务器请求错误!');
        });
    },
    // 清除所有画的线圆等等
    clearMarker() {
        // 切换的时候 , 把画的路径全干掉
        if(this.circle.length > 0){
            this.circle.forEach(fc => {
                fc.setMap(null)
            })
            this.circle = [];
        }
        if(this.faceLines.length > 0){
            this.faceLines.forEach(fl => {
                fl.setMap(null)
            })
            this.faceLines = [];
        }
        if(this.faceMarkers.length > 0){
            this.faceMarkers.forEach(fm => {
                fm.infoBox.close();
                    fm.marker.setMap(null);
            })
            this.faceMarkers = [];
        }
        if(this.points.length > 0){
            this.points.forEach(item => {
                item && item.marker.setMap(null); 
                item && item.ib1.close();  
                item && item.ib2.close();
            })
            this.points = [];
        }
        if(this.ibs.length > 0){
            this.ibs.forEach(item => {
                item.close();
            })
            this.ibs = [];
        }
    },
    // 重置
    reset() {
        this.isSelect = null;
        this.time = [dateFmt(+new Date() - 86400 * 1000), dateFmt(+new Date())];
        this.threshold = '80';
        this.input= null;
        this.getPersonDate();
    },
    // 搜索身份证
    searchWord() {
        this.getPersonDate(this.input)
    },
    beginSearchWord() {
        this.getPersonDate(this.input)
    },
    // 正则阈值
    judgeThreshold() {
      if (!/^([1-9]\d{0,1}|100)$/.test(+this.threshold)) {
        this.$message.error('请填写数字1到数字100之间的阈值!')
        this.loading = false
        return
      }
      this.isSelect = null
    },
    // 点击获取详细信息 , 同时展现轨迹图
    addBg(index, personId) {
        // console.log('点击的人' , index)
        this.isSelect = index
        this.isShowWifiTrack = true
        this.isCheckedWifiTrack = false
        this.search()
    },
    // 人员搜索 , 获取轨迹数据
    search(param,isNotReal = true) {
        let faceId = param?param:this.personDate[this.isSelect].faceId;
        // console.log('需要打印的人员id:' , this.personDate[this.isSelect].faceId);
        if(isNotReal){
            if(!this.personDate[this.isSelect].faceId){this.$message.error('所选择人员并无轨迹!'); return}
            if(this.realTimer){clearInterval(this.realTimer);}
        }
        // if(!this.personDate[this.isSelect].faceId){this.$message.error('所选择人员并无轨迹(faceId没有)!'); return}
        if(this.time==null){this.$message.error('请选择开始和结束时间!'); return}
        if(!/^([1-9]\d{0,1}|100)$/.test(+this.threshold)){this.$message.error('请填写数字1到数字100之间的阈值!'); return}
        this.loading = true;

        const url = `${this.url1}/trace/personTrace/getPersonTraceById`
        let myParams = {
            "faceId": faceId,
            "startTime": dateFmt(+new Date(this.time[0])),
            "endTime": dateFmt(+new Date(this.time[1])),
            "threshold":this.threshold
        }
        // console.log("人员检索的参数",myParams)
        this.$axios.post(url , myParams).then(res => {
            this.clearMarker();
            // console.log("我的item:" , res.data)

            res.data.forEach(list => {
                // 设备可能不存在他的轨迹
                if(list.length <= 0){  this.loading = false; this.$message.error('查询不到该人轨迹!'); return}

                this.path = []      //存储一个人所有的路径
                let ipss = {}       //设备ip划分坐标和图片的list;
                let allPath = []    //按照真实的顺序,以方便画圆,画直线
                list.forEach(item => {
                    //    console.log("我的item:" , item)//我的item: {deviceIp: "32.23.65.98", img: "/20180330/trace5.jpg", lng: 121.48217031732202, lat: 31.241777585819364}
                    
                    if(!ipss[item.deviceIp]){
                        ipss[item.deviceIp] = {"coord":[] , "img": [],"bodyPosi":[],"facePosi":[] ,"frameId":[] }
                    }
                    this.path.push({
                        "coord" : new google.maps.LatLng(item.lat , item.lng),
                        "img" : item.filePath,
                        "deviceIp": item.deviceIp,
                        "bodyPosi":item.bodyPosi,
                        "facePosi":item.facePosi,
                        "frameId":item.frameId
                    })
                })
                
                let devs = [];
                this.path.forEach(ele => {
                  if(devs.indexOf(ele.deviceIp) == -1){
                    devs.push(ele.deviceIp);
                  }
                })
                
                let var_this = this;
                devs.forEach(dev => {
                  this.path.forEach(ele => {
                    if(ele.deviceIp == dev || ipss[dev].img.length != 0){
                      ipss[dev].bodyPosi.push(ele.bodyPosi)
                      ipss[dev].facePosi.push(ele.facePosi)
                       ipss[dev].frameId.push(ele.frameId)
                      ipss[dev].img.push(ele.img)
                      
                    }
                  })
                })
                
                // if(devs.length > 0){
                //   devs.forEach((devOut,index) => {
                //     devs.forEach((devIn,id) => {
                //       if(devIn == devOut){
                //         ipss[devOut].devs = devs.slice(id);
                //       }
                //     })
                //   })
                // }
 
                this.path.forEach(ele => {
                    // if(ipss[ele.deviceIp].img.indexOf(ele.img) == -1){
                        // ipss[ele.deviceIp].bodyPosi.push(ele.bodyPosi)
                        // ipss[ele.deviceIp].facePosi.push(ele.facePosi)
                        ipss[ele.deviceIp].coord.push(ele.coord)
                        // ipss[ele.deviceIp].img.push(ele.img)
                    // }
                })

                
                try {
                    // console.log('我的ipss2是:',ipss)
                    this.ready(ipss, this.personDate);
                } catch (error) {
                    this.loading = false;
                    // errorException(this , error)
                    // console.log('我们的绘图有问题')
                }
            })
            // 直接绘图
            // 抛开不存在轨迹 , 参数填写失败 , 问题只能出现在绘人员轨迹上
        }).catch( res =>{
            this.loading = false;
            // errorException(this,res);
            this.$message.error('创建人员轨迹失败!');
            // this.$message.error('创建人员轨迹失败(请求后台失败)!');
        })
    },
    // 创建人员轨迹
    ready(ipss, paramsData) {
      let map = this.map;                  
      let paths = [];                     //拿来直接画直线需要 [{lat: 31.241777585819364 , lng: 31.241777585819364}]   画圆需要  new google.maps.LatLng(x , y)
      // console.log(ipss)
      // 画直线   ipss{deviceIp:{coord:[] , img: []}}
      this.path.forEach(item => {
        // console.log('ths.path',item.coord.lat(),item.coord.lng());
        paths.push({
            lat: item.coord.lat(),
            lng: item.coord.lng()
        })
        // console.log('圆',item.lat() , item.lng());
        //  遍历所有节点数组 , 画每一个节点的圆
        this.circle[this.circle.length] = new google.maps.Circle({
          map: map,
          strokeColor: "#fff",
          // strokeWeight: 1,
          strokeOpacity:0.8,
          fillColor: "#76fffb",
          fillOpacity: 1,
          center: item.coord,
          draggable: false,
          strokePosition: google.maps.StrokePosition.INSIDE,
          radius: 1,
          zIndex: 111,
        });
      })

      // console.log('我的直线的所有坐标是: ' , paths)
      // 画线
      let line = new google.maps.Polyline({
          map: map,
          // path: ipss[key].coord,
          path:paths,
          strokeOpacity: 0.5,
          strokeWeight: "1",
          strokeColor: "#76fffb",
          zIndex: 10
      });
      this.faceLines.push(line);

      // console.log(this.circle); // 点击所有的圆 , 并且添加事件
      this.circle.forEach(val => {
        for (var key in ipss) {
          // 圆点击的坐标 和 一个设备ip里面的所有坐标比较 , 找到就添加相同的点击事件 , 也即播放相同图片
          let deviceIp = ipss[key];
          if(deviceIp.coord.indexOf(val.center)!=-1 && (deviceIp.coord[0] ===val.center || deviceIp.coord[deviceIp.coord.length-1] === val.center)){
            // console.log('所有的圆: ' ,deviceIp.coord[deviceIp.coord.length-1]===val.center );
            val.setRadius(3)
            val.setOptions({ zIndex: 112, fillColor: "#76fffb"} );
            // 给圆添加点击事件 , 鼠标移入 , 鼠标移出事件, 阻止冒泡事件, 防止多点触发, 导致网页崩溃
            google.maps.event.addListener(val, "mouseover", (e) => {
                // console.log('mouseover', e.za)
              this.isClickCircle = val;
              val.setRadius(4)
              val.setOptions({zIndex: 112, fillColor: "#ff0000"});
            });
            google.maps.event.addListener(val,'mouseup',(e)=>{
              let imgs = []
              if(val == this.isClickCircle){
                // console.log('圆点击的事件', e.za)
                // e.za.stopPropagation()
                // deviceIp.devs.forEach(dev => {
                //   let di = ipss[dev];
                //   di.img.forEach((item,index) => {
                //   //    console.log('device',deviceIp)
                //   if(di.bodyPosi[index]||di.facePosi[index]){
                //     imgs.push(`${this.url4}/upload/showImgByName?path=${item}&bodyPosi=${di.bodyPosi[index]?di.bodyPosi[index]:""}&facePosi=${di.facePosi[index]?di.facePosi[index]:""}`)
                //   }else{
                //     imgs.push(`${this.url4}/upload/showImgByName?path=${item}`)
                //   }
                // });
                // })
                console.log('device',deviceIp)
                deviceIp.img.forEach((item,index) => {
                
                  if(deviceIp.bodyPosi[index]||deviceIp.facePosi[index]){imgs.push(`${this.url4}/upload/showImgByName?rowKey=${deviceIp.frameId[index]}&bodyPosi=${deviceIp.bodyPosi[index]?deviceIp.bodyPosi[index]:""}&facePosi=${deviceIp.facePosi[index]?deviceIp.facePosi[index]:""}`)
                        
                  }else{
                    imgs.push(`${this.url4}/upload/showImgByName?rowKey=${deviceIp.frameId[index]}`)
                  }
                });
                let point = setNodeVideo(map, val.center, {imgList:imgs});

                //lcx start
                google.maps.event.addListener(point.ib1, "domready", () => {
                    document.getElementById("toBig").onclick = ()=>{
                        let  temp ={};
                        this.dialogPersonVisible = true; 
                      //  console.log( imgs )
                      var tt = this
                        setTimeout(() => {
                            tt.play_animation(imgs, "toBigScreen", temp)
                        }, 0);
                        //this.fullScreen({imgs:imgs,ani:{status:3}})
                    };
                })
                //lcx end
                this.points.push(point);
              }
            })
            google.maps.event.addListener(val, "mouseout", () => {
              this.isClickCircle = null;
              val.setRadius(3)
              val.setOptions({ zIndex: 112, fillColor: "#76fffb"} );
            });     
          }
        }
      });
      // 先赋值 , 赋值时会新增一个头像 , 要关闭
      this.setIcon = setLevelIcon(map, paths[paths.length - 1], {});
      this.setIcon.infoBox.close();

      // 重新设置新的外边框
      this.setIcon.marker.setZIndex(null);
      this.setIcon.marker.setIcon("../../../static/images/i_01.png");
      this.faceMarkers.push(this.setIcon);

      // 重新绘制新的头像
      // console.log("头像是:" , paramsData[this.addPedestrianHeightLight])
      var personIcon = null
      try {
        if(paramsData == this.personDate){
          personIcon = `<img src='${paramsData[this.isSelect].personPhoto}' style='width:60px;border-radius:50%;top:13px;z-index:1;position:relative;left:15px;height:60px;'/>`
        }else{
          personIcon = `<img src='${paramsData[this.addPedestrianHeightLight].faceByte}' style='width:60px;border-radius:50%;top:13px;z-index:1;position:relative;left:15px;height:60px;'/>`
        }
      } catch (error) {
        console.log(error)
      }
      // console.log('头像:', personIcon)
      let levelIconOptions = {
        content: personIcon,
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-45, -100),
        zIndex: null,
        boxStyle: {},
        closeBoxURL: "",
        closeBoxMargin: "0px 0px 0px 0px",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false
      };
      let ib = new InfoBox(levelIconOptions);
      ib.open(map, this.setIcon.marker);
      this.ibs.push(ib);
      this.loading = false;
    },
    // 上传图片
    // 上传前的配置
    beforeUpload(file) {
        if (!/^([1-9]\d{0,1}|100)$/.test(+this.threshold)) {
          this.$message.error('请填写数字1到数字100之间的阈值!')
          return false
        }
        // console.log('this.time',this.time)
        if(!this.time) {
          this.$message.error('请填写时间!')
          return false
        }
        let photoType = '.png,.jpg,.jpeg,.gif';
        let photoExtend = file.name
            .substring(file.name.lastIndexOf('.'))
            .toLowerCase();
            if(photoType.indexOf(photoExtend) <= -1){
                this.$message.error('图片格式错误: 只接受png , png , jpeg , gif!');
                return false;
            }
            if(file.size > 1024000){
                this.$message.error('图片不得大于1M!');
            }
        // console.log("上传之前的内容:" , file)
        var reader = new FileReader()
        const fil = reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          let base64 = reader.result
          let params = {
              "faceByte": base64 ,
              "startTime": dateFmt(+new Date(this.time[0])),
              "endTime": dateFmt(+new Date(this.time[1])),
              "threshold":this.threshold
          };
          // console.log("人脸search---",params)
          this.loading = true;
          this.isSearchAgain = true;
          this.searchFace(params)
        })
        // =========================canvas转base64=============================

          // let base64  
          //    // 把图片转成base64位
          //     setTimeout(()=>{
          //         let img = $('#upload').find('img').attr('src')?$('#upload').find('img').attr('src'):'';
          //         function getbase64(img) {  
          //             let canvas = document.createElement("canvas");
          //             canvas.width = img.width;
          //             canvas.height = img.height;
          //             let ctx = canvas.getContext('2d');
          //             ctx.drawImage(img , 0 , 0 , img.width , img.height);
          //             let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
          //             let dataUrl = canvas.toDataURL('image/'+ext);
          //             return dataUrl
          //         }
          //         let image = new Image();
          //         image.src = img;
          //         image.onload = function () {  
          //             base64 = getbase64(image);
          //             console.log("打印的是", base64 );
          //         }
          //     },100) 
          // setTimeout(()=>{
          //     let params = {
          //             "faceByte": base64 ,
          //             "startTime": dateFmt(+new Date(this.time[0])),
          //             "endTime": dateFmt(+new Date(this.time[1])),
          //             "threshold":this.threshold
          //         };
          //         // console.log("人脸search---",params)
          //         this.loading = true;
          //         this.isSearchAgain = true;
          //         this.searchFace(params)
          // },150)   
        // =================canvas转base64==========================================
    },
    // 搜索人脸 , 获取轨迹数据
    searchFace(params) {
            params = params || null;
            if(this.realTimer){
                clearInterval(this.realTimer);
            }
            if(this.time==null){this.$message.error('请选择开始和结束时间!'); return}
            if(!/^([1-9]\d{0,1}|100)$/.test(+this.threshold)){this.$message.error('请填写数字1到数字100之间的阈值!'); return}

            const url = `${this.url1}/trace/personTrace/getPersonTraceById`
            this.$axios.post(url , params).then(res => {
                this.clearMarker();
                // console.log("我的item:" , res.data)    //[ [deviceIp , filePath , lat , lng , threshold , traceTime , uId] , [deviceIp , filePath , lat , lng , threshold , traceTime , uId]]
                if(res.data.length <= 0){ this.loading = false; this.$message.error('人脸匹配不到相应人员轨迹!');  return}

                res.data.forEach(list => {
                    let uId = list[0].uId                 
                    if(list.length <= 0){ this.loading = false; this.$message.error('有匹配人员并无轨迹!');  return}
                    this.path = []      //存储一个人所有的路径
                    let ipss = {}       //存储所有存在的设备ip;

                   list.forEach(item => {
                    //    console.log("我的item:" , item)//我的item: {deviceIp: "32.23.65.98", img: "/20180330/trace5.jpg", lng: 121.48217031732202, lat: 31.241777585819364}
                    
                    if(!ipss[item.deviceIp]){
                        ipss[item.deviceIp] = {"coord":[] , "img": [],"bodyPosi":[],"facePosi":[] ,"frameId":[] }
                    }
                    this.path.push({
                        "coord" : new google.maps.LatLng(item.lat , item.lng),
                        "img" : item.filePath,
                        "deviceIp": item.deviceIp,
                        "bodyPosi":item.bodyPosi,
                        "facePosi":item.facePosi,
                        "frameId":item.frameId
                    })
                })
                
                let devs = [];
                this.path.forEach(ele => {
                  if(devs.indexOf(ele.deviceIp) == -1){
                    devs.push(ele.deviceIp);
                  }
                })
                
                let var_this = this;
                devs.forEach(dev => {
                  this.path.forEach(ele => {
                    if(ele.deviceIp == dev || ipss[dev].img.length != 0){
                      ipss[dev].bodyPosi.push(ele.bodyPosi)
                      ipss[dev].facePosi.push(ele.facePosi)
                      ipss[dev].frameId.push(ele.frameId)
                      ipss[dev].img.push(ele.img)
                    }
                  })
                })
                
                // if(devs.length > 0){
                //   devs.forEach((devOut,index) => {
                //     devs.forEach((devIn,id) => {
                //       if(devIn == devOut){
                //         ipss[devOut].devs = devs.slice(id);
                //       }
                //     })
                //   })
                // }
 
                this.path.forEach(ele => {
                    // if(ipss[ele.deviceIp].img.indexOf(ele.img) == -1){
                        // ipss[ele.deviceIp].bodyPosi.push(ele.bodyPosi)
                        // ipss[ele.deviceIp].facePosi.push(ele.facePosi)
                        ipss[ele.deviceIp].coord.push(ele.coord)
                        // ipss[ele.deviceIp].img.push(ele.img)
                    // }
                })
                    try {
                        // console.log('我的ipss2是:',ipss) // ipss['10.10.18.210'].coord[0].lat(),ipss['10.10.18.210'].coord[0].lng()
                        if(ipss){
                            this.createFaceTrack(ipss , uId);
                        }else{
                            this.loading = false;
                            this.$message.error('该人员轨迹为空!');
                        }
                    } catch (error) {
                        // console.log('我们的绘图有问题')
                    }
                })
                // 直接绘图
                // 抛开不存在轨迹 , 参数填写失败 , 问题只能出现在绘人员轨迹上
            }).catch(( res )=>{
                this.loading = false;
                // errorException(this,res); 
                this.$message.error('创建人员轨迹失败!');
            })
    },
    // 创建人脸轨迹
    createFaceTrack(ipss , uId) {
        // console.log('ipss:' , ipss);
        let map = this.map;                  
        let paths = [];                     //拿来直接画直线需要 [{lat: 31.241777585819364 , lng: 31.241777585819364}]   画圆需要  new google.maps.LatLng(x , y)
        
        this.path.forEach(item => {
            // console.log('ths.path',item.coord.lat(),item.coord.lng());
            paths.push({
                lat: item.coord.lat(),
                lng: item.coord.lng()
            })

            // console.log('圆',item.lat() , item.lng());
            //  遍历所有节点数组 , 画每一个节点的圆
            this.circle[this.circle.length] = new google.maps.Circle({
                map: map,
                strokeColor: "#fff",
                // strokeWeight: 2,
                strokeOpacity:0.8,
                fillColor: "#76fffb",
                fillOpacity: 1,
                center: item.coord,
                draggable: false,
                strokePosition: google.maps.StrokePosition.INSIDE,
                radius: 1,
                zIndex: 111,
            });
        })
        // console.log('我的直线的所有坐标是: ' , paths)
        // 画线
        let line = new google.maps.Polyline({
            map: map,
            path:paths,
            strokeOpacity: 0.5,
            strokeWeight: "1",
            strokeColor: "#76fffb",
            zIndex: 10
        });
        this.faceLines.push(line);

        // console.log(this.circle); // 点击所有的圆 , 并且添加事件
        this.circle.forEach(val => {
          // console.log('所有的圆: ' , val)
          for (const key in ipss) {
            // 圆点击的坐标 和 一个设备ip里面的所有坐标比较 , 找到就添加相同的点击事件 , 也即播放相同图片
            let deviceIp = ipss[key];       
            if(deviceIp.coord.indexOf(val.center) != -1 && (deviceIp.coord[0] ===val.center || deviceIp.coord[deviceIp.coord.length-1] === val.center)){
              val.setRadius(3);
              val.setOptions({fillColor: '#76fffb' , zIndex: 112});
              // 给圆添加点击 , 移入放大 , 移出缩小事件
              try {
                google.maps.event.addListener(val, "mouseover", () => {
                  this.isClickCircle = val;
                  val.setRadius(4);
                  val.setOptions({fillColor: '#ff0000' , zIndex: 112});
                });
                google.maps.event.addListener(val,'mouseup',()=>{
                  var imgs = []
                  if(val == this.isClickCircle){
                    // deviceIp.devs.forEach(dev => {
                    //   let di = ipss[dev];
                    //   di.img.forEach((item,index) => {
                    //     //    console.log('device',deviceIp)
                    //     if(di.bodyPosi[index]||di.facePosi[index]){
                    //       imgs.push(`${this.url4}/upload/showImgByName?path=${item}&bodyPosi=${di.bodyPosi[index]?di.bodyPosi[index]:""}&facePosi=${di.facePosi[index]?di.facePosi[index]:""}`)
                    //     }else{
                    //       imgs.push(`${this.url4}/upload/showImgByName?path=${item}`)
                    //     }
                    //   });
                    // })
                      deviceIp.img.forEach((item,index) => {
                        if(deviceIp.bodyPosi[index]||deviceIp.facePosi[index]){
                             imgs.push(`${this.url4}/upload/showImgByName?rowKey=${deviceIp.frameId[index]}&bodyPosi=${deviceIp.bodyPosi[index]?deviceIp.bodyPosi[index]:""}&facePosi=${deviceIp.facePosi[index]?deviceIp.facePosi[index]:""}`)
                        }else{
                            imgs.push(`${this.url4}/upload/showImgByName?rowKey=${deviceIp.frameId[index]}`)
                        }
                    });
                    let point = setNodeVideo(map, val.center, {imgList:imgs});
                    this.points.push(point);
                  }
                })
                google.maps.event.addListener(val, "mouseout", () => {
                  this.isClickCircle = null;
                  val.setRadius(3);
                  val.setOptions({fillColor: '#76fffb' , zIndex: 112});
                });
              } catch (error) {
                  console.log(error)
              }     
            }
          }
        });
        // 先赋值 , 赋值时会新增一个头像 , 要关闭
        this.setIcon = setLevelIcon(map, paths[paths.length - 1], {});
        this.faceMarkers.push(this.setIcon);
        this.setIcon.infoBox.close();
        // 重新设置新的外边框
        this.setIcon.marker.setIcon("../../../static/images/i_01.png");
        this.setIcon.marker.setZIndex(-1);
        // 重新绘制新的头像
        // console.log("头像是:" , ipss)
        // console.log('路径包含的东西',this.path)
        // console.log('我的uid:' , uId);
        this.map.setCenter(new google.maps.LatLng(paths[paths.length - 1].lat,paths[paths.length - 1].lng));    // 设置聚焦中心点
        let tempMsg;
        if(this.path[this.path.length - 1].bodyPosi|| this.path[this.path.length - 1].facePosi){
          tempMsg = `<img src='${this.url4}/upload/showImgByName?path=${this.path[this.path.length - 1].frameId}` + `&facePosi=`+`${this.path[this.path.length - 1].facePosi?this.path[this.path.length - 1].facePosi:""}'`+ `&bodyPosi=`+`${this.path[this.path.length - 1].bodyPosi?this.path[this.path.length - 1].bodyPosi:""}'`+ `id='${uId}' style='width:60px;height:60px;border-radius:50%;overflow:hidden;position:relative;left:15px;top:-3px;z-index:1;'/>`
        }else{
          tempMsg = `<img src='${this.url4}/upload/showImgByName?path=${this.path[this.path.length - 1].frameId}' id='${uId}' style='width:60px;border-radius:50%;top:13px;z-index:1;position:relative;left:15px;height:60px;'/>`
        }
        let levelIconOptions = {
            content:
            `<img src='${this.url4}/upload/showImgByName?rowKey=${this.path[this.path.length - 1].frameId}&moudle=trace' id='${uId}' style='width:60px;border-radius:50%;top:-2px;z-index:1;position:relative;left:15px;height:60px;'/>`,
            // "<img src='../../../static/images/noPhoto.png' style='width:60px;border-radius:50%;top:13px;z-index:1;position:relative;left:15px;height:60px;'/>",
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-45, -85),
            zIndex: -1,
            boxStyle: {},
            closeBoxURL: "",
            closeBoxMargin: "0px 0px 0px 0px",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };
        let ib = new InfoBox(levelIconOptions);
        ib.open(map, this.setIcon.marker);
        google.maps.event.addListener(ib, "domready", () => {
          let isShow = true;
          $(`#${uId}`).on('click', () => {  
            if(isShow){
              isShow = false;
              line.setOptions({strokeOpacity : 0.8,strokeColor: '#ff0000' , zIndex: 90 , strokeWeight: "5",});
            }else{
              isShow = true;
              line.setOptions({strokeOpacity : 0.3,strokeColor: '#76fffb' , zIndex: 10 , strokeWeight: "3",});
            }
          })
        });


        this.ibs.push(ib);
        this.loading = false;   
    },
    // 重新搜索 , 即再手动调用一下上传前的配置
    searchAgain() {
      if(this.base64url){
        if (!/^([1-9]\d{0,1}|100)$/.test(+this.threshold)) {
          this.$message.error('请填写数字1到数字100之间的阈值!')
          return
        }
        // console.log('this.time',this.time)
        if(!this.time) {
          this.$message.error('请填写时间!')
          return
        }
        let params = {
            "faceByte": this.base64url ,
            "startTime": dateFmt(+new Date(this.time[0])),
            "endTime": dateFmt(+new Date(this.time[1])),
            "threshold":this.threshold
          };
        // console.log("人脸search---",params)
        this.loading = true;
        this.isSearchAgain = true;
        this.searchFace(params)
      }else{
        this.$refs.upload.submit();
      }
    },
    // 上传成功
    onSuccess(reponse ,file , fileList){
        console.log(this.faceByte)
        // this.uploadTip = '人脸检索'
        // this.processing = false;
    },
    // 上传失败
    onError(err,file , fileList){
    },
    // 手动上传到我们的服务器
    submitUpload: function(content) {
        // console.log("我的content是:" , content.file)       
        // this.beforeUpload(content)
    },
    // 通过 file.response 拿到服务器返回数据
    handlePreview(file) {
        console.log("这个是什么啊:",file);
    },
    // 移除文件的回调 , 同时隐藏重新搜索按钮
    handleRemove(file, fileList) {
        this.isSearchAgain = false;
        // console.log(file, fileList);
    },
    // 文件超出个数限制时的钩子
    onExceed(files, fileList) {
         this.$message.error('只允许检索一张图片');
    },
    // 添加重点人员标注
    addRemark(personId,index) {
        this.isRemark[index] = this.isRemark[index] == '1'?'0':'1';
      if (this.isRemark[index] == '1') {
        const url = `${this.url1}/trace/personTrace/cancelPersonKey?personId=${personId}`;
        this.$axios.get(url).then(res => {
            // console.log("撤销成功:" + res.data)
            if (res.data == 1) {
                $(`#${personId}`).removeClass().addClass('noRemark')
                // this.getPersonDate();
              this.$message({
                message: "撤销重点人员布控成功",
                type: "success"
              });   
            } else {
              this.$message.error('撤销重点人员失败');
            }
          })
          .catch(() => {
            this.$message.error('撤销重点人员请求失败');
          });
      } else if(this.isRemark[index] == '0'){
        const url = `${this.url1}/trace/personTrace/setPersonKey?personId=${personId}`;
        this.$axios.get(url)
          .then(res => {
            // console.log("增加成功:" + res.data)
            if (res.data == 1) {
                 $(`#${personId}`).removeClass().addClass('remark')
            //   this.getPersonDate();
              this.$message({
                message: "设置重点人员布控成功",
                type: "success"
              });
              
            } else {
              this.$message.error('设置重点人员失败');
            }
          })
          .catch(() => {
            this.$message.error('设置重点人员请求失败');
          });
      }
      //    console.log("标注:" , this.isRemark )
    },
    // 切换状态
    changeType() {
      this.isShow = !this.isShow;
      this.closeFakeFace()
    },
    // 点击播放动画
    playVideo(faceId , personDate) {
      // console.log('视频的faceID', faceId)
      personDate.isPlay = false // 自带属性 , 让照片和播放按钮消失
      const url = `${this.url1}/trace/personTrace/getPersonTraceById`
      this.$axios.post(url,{
          "faceId": faceId,
          "startTime": dateFmt(+new Date(this.time[0])),
          "endTime": dateFmt(+new Date(this.time[1])),
          "threshold":this.threshold
      }).then(res => {
          let imgs = [];
          this.imgPoints = [];
          // console.log("请求获取的数据: " , res.data);
         // console.log(res);
          res.data[0].forEach(item  => {
            
             if(item.bodyPosi||item.facePosi){
                imgs.push(`${this.url4}/upload/showImgByName?rowKey=${item.frameId}&facePosi=${item.facePosi?item.facePosi:""}&bodyPosi=${item.bodyPosi?item.bodyPosi:""}`)
             }else{
                 imgs.push(`${this.url4}/upload/showImgByName?rowKey=${item.frameId}`)
             }
              let points = [];
              if(item.bodyPosiList.length > 0){
                  item.bodyPosiList.forEach(ib => {
                    points.push({
                        Xmin:ib.split(',')[0],Xmax:ib.split(',')[2],Ymin:ib.split(',')[1],Ymax:ib.split(',')[3],deltaX:ib.split(',')[2]-ib.split(',')[0],deltaY:ib.split(',')[3]-ib.split(',')[1]
                    })
                  })
              }
              if(item.facePosiList.length > 0){
                   item.facePosiList.forEach(ib => {
                    points.push({
                        Xmin:ib.split(',')[0],Xmax:ib.split(',')[2],Ymin:ib.split(',')[1],Ymax:ib.split(',')[3],deltaX:ib.split(',')[2]-ib.split(',')[0],deltaY:ib.split(',')[3]-ib.split(',')[1]
                    })
                  })
              }
              this.imgPoints.push({
                  img:item.filePath,
                  pointLists:points
              })
              
          })

          personDate.imgs = imgs;
          if(imgs.length > 0){
            if(!personDate.isPause){ // 没按暂停的时候就预加载一次 , 之后都不是预加载
              // console.log('预加载只有一次----')
              personDate.ani = this.play_animation(imgs, faceId, personDate);
              if(this.currentTimesFlag){
                personDate.ani.currentTimes = this.currentTimes; 
                this.currentTimesFlag = false; 
                this.currentTimes = 0;               
              }
            }else{
              personDate.ani.play();

              // console.log(personDate.ani.currentTimes);
              // console.log('点击播放----')
            }
            if(personDate.ani.currentTimes >= imgs.length){
              this.currentTimes = 0;
              personDate.ani.reset();
            }
            
          }else{
              this.$message.error('无可播放视频(img为空)!');
              personDate.isPlay = true
              return
          }
      }).catch(()=>{
              personDate.isPlay = true
          this.$message.error('视频播放失败!(请求后台失败)');
      })
    },
    // 动画的播放函数
    play_animation(imgs, faceId, personDate) {
        if (this.lastAni) {
          this.lastAni.destroy();
        }
      let ani = new frame_ani({
          canvasTargetId: faceId, 
          framesUrl: imgs, 
          loop: false, 
          frequency: 3, 
          onComplete: function () { 
              // 视频播放完毕
              personDate.isPlay = true
              if(personDate.ani){
                  personDate.img = personDate.imgs[personDate.ani.currentTimes - 1];
              }
            //   console.log('播放完成!',personDate.ani.currentTimes)
          },
      });
      this.lastAni = ani;
      ani.initialize(() => {  
        ani.play();
      });
      return ani;
    },
    // 全屏
    fullScreen(item) {
      if(!item.imgs || item.imgs.length == 0){
        this.$message({ message: "无可播放图片,全屏失败!", type: "info" });
        return
      }else{
        this.dialogVisible = true;
          item.isPause = false;
        this.fullScreenData = item;
        if(item.ani.status == 2){
          item.ani.pause();
          // console.log('我在全屏啊--',item.ani.currentTimes)
          this.currentTimesFlag = true;
          this.currentTimes = 0;
          this.currentTimes = item.ani.currentTimes;
        }
      }
    },
    // 暂停
    pauseScreen(personDate){
      personDate.isPause = true;
      personDate.ani.pause();
      try {
        this.currentTimesFlag = true;
        this.currentTimes = 0;
        this.currentTimes = personDate.ani.currentTimes;
        
      } catch (error) {
        console.log(error)
      }
      console.log('点击暂停---')
    },
    // 全屏关闭之前
    handleClose(done) {
      this.fullScreenData.isPause = false;
      if(this.fullScreenData.ani.status == 2){
        this.fullScreenData.ani.pause();
        console.log('我在退出全屏啊--',this.fullScreenData.ani.currentTimes)
        this.currentTimesFlag = true;
        this.currentTimes = 0;
        this.currentTimes = this.fullScreenData.ani.currentTimes;
      }
      console.log('关闭之前---: this.fullScreenData',this.fullScreenData.ani.status);
      console.log('关闭masker之前');
      done();
    },
    changeMouseStyle(event){
        $('#screenShot').removeClass("teta")
        let pointLists = [];
       if(this.imgPoints.length > 0){
           this.imgPoints.forEach(ip => {
               let img;
               if(this.fullScreenData.img.indexOf('&face') != -1){
                   img = this.fullScreenData.img.split('path=')[1].split('&')[0];
               }else{
                   img = this.fullScreenData.img.split('path=')[1];
               }
               if(img == ip.img){
                   pointLists = ip.pointLists;
                    if(pointLists.length > 0){
                        pointLists.forEach(pl => {
                        if(event.offsetX > Math.floor(pl.Xmin * 1708 / 3072) && event.offsetX < Math.ceil(pl.Xmax * 1708 / 3072) && event.offsetY > Math.floor(pl.Ymin * 780 / 2048) && event.offsetY < Math.ceil(pl.Ymax * 780 / 2048)){
                          $('#screenShot').addClass("teta")
                        }
                    })
                }
               }
           })
       }
    },
    getSuspectPoint(event){
       let pointLists = [];
       if(this.imgPoints.length > 0){
           this.imgPoints.forEach(ip => {
               let img;
               if(this.fullScreenData.img.indexOf('&face') != -1){
                   img = this.fullScreenData.img.split('path=')[1].split('&')[0];
               }else{
                   img = this.fullScreenData.img.split('path=')[1];
               }
               if(img == ip.img){
                   pointLists = ip.pointLists;
                    if(pointLists.length > 0){
                        pointLists.forEach(pl => {
                            if(event.offsetX > Math.floor(pl.Xmin * 1708 / 3072) && event.offsetX < Math.ceil(pl.Xmax * 1708 / 3072) && event.offsetY > Math.floor(pl.Ymin * 780 / 2048) && event.offsetY < Math.ceil(pl.Ymax * 780 / 2048)){
                            this.screenshotBtn(pl);
                            return
                        }
                    })
                }
               }
           })
       }
       
    },
    // 全屏暂停截图
    screenshotBtn(pl) {
      this.screenControlFlag = true;
      var $image = $('#screenShot');
      // console.log('----', $image.data);
      var cropper = $image.data('cropper');

      $image.cropper({
        autoCropArea:0.2,
        ready: function() {
            if(pl){
            $image.cropper('setCropBoxData',{'left':Math.floor(pl.Xmin * 1386 / 3072) +　160,'top':Math.floor(pl.Ymin * 780 / 2048),'width':Math.ceil(pl.deltaX * 1386 / 3072),'height':Math.ceil(pl.deltaY * 780 / 2048)})
            }
       }
      });
      $image.on('cropstart', (  )=>{
      })
    },
    // 查询人员轨迹
    checkTrack() {
      this.loading = false;
      var $image = $('#screenShot');
      var cas=$image.cropper('getCroppedCanvas');
      var base64url = cas.toDataURL('image/jpeg');
      
      let params = {
            "faceByte": base64url ,
            "startTime": dateFmt(+new Date(this.time[0])),
            "endTime": dateFmt(+new Date(this.time[1])),
            "threshold":this.threshold
          };
      // console.log("人脸search---",params)
      this.loading = true;
      this.isSearchAgain = true;
      this.searchFace(params)
      this.base64url = base64url;

      $image.cropper({
        aspectRatio: 'free',
        crop: function(event) {
        // var $imgData=$image.cropper('getImageData')
        }
      });

      $image.cropper('destroy');
      this.isShow = false; // 切换为地图
      this.dialogVisible = false; // 关闭弹出框的遮罩
      this.isSwitch = false;  // 转为人脸检索
      this.searchWay = '人脸检索';
      this.screenControlFlag = false; // 是否显示截屏
    },
    // 添加为重点人员
    addSuspectPerson() {
      var $image = $('#screenShot');
      var cas=$image.cropper('getCroppedCanvas');
      var base64url = cas.toDataURL('image/jpeg');
      addSuspectPerson(this, base64url)
      $image.cropper('destroy');
      this.screenControlFlag = false;
    },
    // 下载
    download(){
      var $image = $('#screenShot');
      var cas=$image.cropper('getCroppedCanvas');
      var base64url = cas.toDataURL('image/jpeg');
      $('#download_img').attr('href', base64url);
      $image.cropper('destroy');
      this.screenControlFlag = false;
    },
    // 取消
    exit(){
      var $image = $('#screenShot');
      $image.cropper('destroy');
      this.screenControlFlag = false;
      
    },
    // 干掉假的图片
    closeFakeFace(){
      this.isSearchAgain = false;
      this.base64url = null;
    },
    // 获取行人轨迹数据
    getPedestrianData(params, that) {
      this.pedestrianData = []
      const url = `${this.url5}/trace/personTrace/getPasserListByParam`
      this.$axios.post(url, params).then( res => {
        if(!res.data || res.data.length <= 0) {
          this.$message({ message: '此时间段无行人轨迹!', type: 'error' })
          that.loading = false
          return
        }
        // console.log('返回值',res.data)
        res.data.forEach(item => {
          this.pedestrianData.push({
            uId: item.uId,
            faceByte: `${this.url4}/upload/showFaceImg?rowKey=${item.rowKey}&colTime=${item.colTime}`
          })
          that.loading = false 
        })
      }).catch( res =>{
        that.loading = false 
        console.log(res.data)
      })
    },
    // 人行轨迹的重新搜索
    searchPedestrianTrackAgain() {
      this.loading = true
      if(Number.isNaN(Number(this.pedestrianThreshold))){
        this.$message.error('置信度请输入数字!')
        this.loading = false
        return
      }
      let params = {
        'startTime': dateFmt(+new Date(this.time[0])),
        'endTime': dateFmt(+new Date(this.time[1])),
        'pointLength': this.pedestrianThreshold,
        'uId': this.uidPedestrianTrack
      }
      this.getPedestrianData(params, this)
      
    },
		// 点击高亮, 绘制行人轨迹
		drawPedestrianTrack(index, uId) {
      this.loading = true;
      this.addPedestrianHeightLight = index;
      // console.log('------', uId)
      // if(this.time==null){this.$message.error('请选择开始和结束时间!'); return}
      const url = `${this.url5}/trace/personTrace/getPersonTraceById`
      let myParams = {
          "faceId": uId,
          "startTime": dateFmt(+new Date(this.time[0])),
          "endTime": dateFmt(+new Date(this.time[1])),
          "threshold": '80'
      }
      this.$axios.post(url, myParams).then(res => {
        this.clearMarker();
        // console.log("我的item:" , res.data)
        res.data.forEach(list => {
          if(list.length <= 0){  this.loading = false; this.$message.error('查询不到该人轨迹!'); return}
          this.path = []      //存储一个人所有的路径
          let ipss = {}       //设备ip划分坐标和图片的list;
          let allPath = []    //按照真实的顺序,以方便画圆,画直线
         list.forEach(item => {
                    //    console.log("我的item:" , item)//我的item: {deviceIp: "32.23.65.98", img: "/20180330/trace5.jpg", lng: 121.48217031732202, lat: 31.241777585819364}
                    
                    if(!ipss[item.deviceIp]){
                        ipss[item.deviceIp] = {"coord":[] , "img": [],"bodyPosi":[],"facePosi":[] ,"frameId":[] }
                    }
                    this.path.push({
                        "coord" : new google.maps.LatLng(item.lat , item.lng),
                        "img" : item.filePath,
                        "deviceIp": item.deviceIp,
                        "bodyPosi":item.bodyPosi,
                        "facePosi":item.facePosi,
                        "frameId":item.frameId
                    })
                })
                
                let devs = [];
                this.path.forEach(ele => {
                  if(devs.indexOf(ele.deviceIp) == -1){
                    devs.push(ele.deviceIp);
                  }
                })
                
                let var_this = this;
                devs.forEach(dev => {
                  this.path.forEach(ele => {
                    if(ele.deviceIp == dev || ipss[dev].img.length != 0){
                      ipss[dev].bodyPosi.push(ele.bodyPosi)
                      ipss[dev].facePosi.push(ele.facePosi)
                       ipss[dev].frameId.push(ele.frameId)
                      ipss[dev].img.push(ele.img)
                      
                    }
                  })
                })
                
                // if(devs.length > 0){
                //   devs.forEach((devOut,index) => {
                //     devs.forEach((devIn,id) => {
                //       if(devIn == devOut){
                //         ipss[devOut].devs = devs.slice(id);
                //       }
                //     })
                //   })
                // }
 
                this.path.forEach(ele => {
                    // if(ipss[ele.deviceIp].img.indexOf(ele.img) == -1){
                        // ipss[ele.deviceIp].bodyPosi.push(ele.bodyPosi)
                        // ipss[ele.deviceIp].facePosi.push(ele.facePosi)
                        ipss[ele.deviceIp].coord.push(ele.coord)
                        // ipss[ele.deviceIp].img.push(ele.img)
                    // }
                })
          try {
            // console.log(ipss)
            this.ready(ipss, this.pedestrianData);
          } catch (error) {
            this.loading = false;
          }
        })

      }).catch( res =>{
        this.loading = false;
        this.$message.error('创建行人轨迹失败!');
      })
    },
    limitPedestrianTime (val) {
      if(this.isShowPedestrianTrack){
        if(!this.time){
          this.time = [dateFmt(+new Date()), dateFmt(+new Date() + 24 * 3600 * 1000)]
          this.$message({ message: '只允许查找一天内行人的轨迹, 已为您重置!', type: 'info' })
        }
        if((+new Date(this.time[0]) + 24 * 3600 * 1000) < new Date(this.time[1])){
          this.time = [dateFmt(+new Date(this.time[0])), dateFmt(+new Date(this.time[0]) + 24 * 3600 * 1000)]
          this.$message({ message: '只允许查找一天内行人的轨迹, 已为您重置!', type: 'info' })
        }
      }else {
        this.isSelect = null;
      }
    },
    resetPedestrianTrack() {
      this.isShowPedestrianTrack = true
      this.isShow = false
      this.$refs.selectedRef.style.marginLeft = '3.2rem'
      this.pedestrianThreshold = '30';
      // this.time = [dateFmt(+new Date(this.time[1]) - 3600 * 1000), dateFmt(+new Date(this.time[1]))]
      this.time = [dateFmt(+new Date() - 3600 * 1000), dateFmt(+new Date())]
      this.loading = true
      let params = {
        "startTime": dateFmt(+new Date(this.time[0])),
        "endTime": dateFmt(+new Date(this.time[1])),
        'pointLength': this.pedestrianThreshold
      }
      // console.log('ysys', this)
      this.getPedestrianData(params, this)
      this.loading = false
    },
  }
};
</script>

<style lang="scss">
  @import "../../common/css/tablePageCommon.scss";
  @import "./corpper/cropper.min.css";
  @import "./css/personTrack.scss";
  #pedestrianTrackMask {
    .el-scrollbar {
      height: 100%;
      .el-scrollbar__thumb {
        background-color: rgba(24, 113, 148, .7);
      }
    }
  }
</style>
