<template>
 <div id="map" class="ps-container">
          
        <!-- 下边主体 -->
        <el-main id="person-spread">
          <!-- 地图 -->
          <div id="allmap"></div>
          <!-- 左侧边 -->
          <div id="leftSelId">
            <div>
            <img :src="isSuspectSelectImg" style="width:20px;height:20px;vertical-align:middle;" @click="changeSuspectSelection">
            <span class="white">重点人员</span>
            <img src="../../assets/images/index_suspect.png" style="width:20px;height:20px;vertical-align:middle;">
            </div>
            <div>
            <img :src="isPoliceSelectImg" style="width:20px;height:20px;vertical-align:middle;"  @click="changePoliceSelection">
            <span class="white">警员</span>
            <img src="../../assets/images/index_police.png" style="width:20px;height:20px;vertical-align:middle;">
             </div>
             <div>
            <img :src="isPeopleSelectImg" style="width:20px;height:20px;vertical-align:middle;"  @click="changePeopleSelection">
            <span class="white">普通行人</span>
            <img src="../../assets/images/index_people.png" style="width:20px;height:20px;vertical-align:middle;">
             </div>
          </div>
          <!-- <div id="leftMaskId" class="leftkMask">
              <div class="result">
                  共搜索到
                  <span>{{ result }}</span>
                  条结果
              </div>
              
              <ul class="open">
                  <li v-for="(policeman,index) in policemen" :key="index">
                        <span>{{policeman.policemanName}}</span>
                        <span class='policLevel'>{{policeman.policemanLevelName}}</span>
                            <div>{{policeman.policemanId}}</div>
                        <i ></i>
                  </li>
              </ul>
          </div> -->
          <!-- 右侧边 -->
          <div id="rightMaskId" class="rightMask" v-show="isRightShow">
              <img src="../../assets/images/index_close.png" style="width:30px;position:absolute;top:0;right:46px;" @click="hideRight">
              <img src="../../assets/images/round_btn.png" style="width:50px;position:absolute;right:440px;top:46px;">
              <div :class="isSelect?'launch topMsg':'fold topMsg'">
                <div class="baseMsg">
                    <ul class="leftText">
                        <li class="typeText">人员类别</li>
                        <!-- <li>{{showTypeName}}</li> -->
                        <li class="typeText">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</li>
                        <!-- <li>{{name}}</li> -->
                        <li class="typeText">身份证号</li>
                        <!-- <li>{{identityCard}}</li> -->
                        <li class="typeText">住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</li>
                        <!-- <li id="add">{{address}}</li> -->
                    </ul>
                    <ul class="rightText">
                        <li class="typeText">{{showTypeName?showTypeName:'未知'}}</li>
                        <li class="typeText">{{name?name.length>10?name.substring(0,10)+"...":name:'未知'}}</li>
                        <li class="typeText">{{identityCard?identityCard:'未知'}}</li>
                        <li class="typeText">{{address?address.length>10?address.substring(0,10)+"...":address:'未知'}}</li>
                    </ul>
                    <img :src="baseImg" style="width:100px;height:100px;margin-left:10px;margin-top:20px;" onerror="this.src = '../../../static/images/noPhoto.png'">
                  </div>
                 
                <div @click="addBg()">
                  <img src="../../assets/images/moreInfo.png" v-if="isUpShow" class="moreInfo fl">
                  <img src="../../assets/images/moreInfo_up.png" v-if="!isUpShow" class="moreInfo fl">
                </div>
                
                <div class="baseMsg" v-if="!isUpShow">
                  <div class="divider"><i></i></div>
                    <ul class="leftDetailText">
                        <li class="typeText">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源</li>
                        <!-- <li>{{source}}</li> -->
                        <li class="typeText">代&nbsp;&nbsp;用&nbsp;&nbsp;名</li>
                        <!-- <li>{{aliasName}}</li> -->
                        <li class="typeText">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</li>
                        <!-- <li>{{sex}}</li> -->
                        <li class="typeText">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</li>
                        <!-- <li>{{typeName}}</li> -->
                        <li class="typeText">手&nbsp;&nbsp;机&nbsp;&nbsp;号</li>
                        <!-- <li>{{phone1}}</li> -->
                        <li class="typeText" v-show="phone2">手&nbsp;&nbsp;机&nbsp;&nbsp;号</li>
                        <!-- <li>{{phone2}}</li> -->
                        <li class="typeText" v-show="phone3">手&nbsp;&nbsp;机&nbsp;&nbsp;号</li>
                        <!-- <li>{{phone3}}</li> -->
                    </ul>
                    <ul class="rightDetailText">
                        <li class="typeText">{{source?source:'未知'}}</li>
                        <li class="typeText">{{aliasName?aliasName.length>10?aliasName.substring(0,10)+"...":aliasName:'未知'}}</li>
                        <li class="typeText">{{sex?sex:'未知'}}</li>
                        <li class="typeText">{{typeName?typeName.length>10?typeName.substring(0,10)+"...":typeName:'未知'}}</li>
                        <li class="typeText">{{phone1?phone1:'未知'}}</li>
                        <li class="typeText" v-show="phone2">{{phone2}}</li>
                        <li class="typeText" v-show="phone3">{{phone3}}</li>
                    </ul>
                    <img :src="detailImg" style="width:100px;height:100px;margin-left:10px;" onerror="this.src = '../../../static/images/noPhoto.png'">
                    <img src="../../assets/images/index_switchLeft.png" style="width:30px;position:absolute;right:334px;top:100px;" v-show="leftSwitchEnable" @click="switchToLeft">
                    <img src="../../assets/images/index_switchRight.png" style="width:30px;position:absolute;right:-14px;top:100px;" v-show="rightSwitchEnable" @click="switchToRight">
                  </div>
                <div v-show="isSelect">

                </div>
              </div>
              <div class="midMsg">
                <!-- <img :src="videoFrontImg" v-show="isPlay" style="position:relative;width:381px;height:168px;left:4px;top:26px;" alt="" onerror="this.src = '../../../static/images/index_vedioBg_default.png'"> -->
                <!-- <img v-if="videoFrontImg!=''" v-show="isPlay" @click="playVideo(imgs,'videoImg')" src="../../assets/images/play.png" style="position:relative;left:-214px;top:-38px;"> -->
                <canvas class="fl" width="380px" height="169px" style="margin-left:14px;margin-top:26px;" id="videoImg"></canvas>
                <i class="videoFullScreen" @click.stop="playFullScreenVideo"></i>
                <img src="../../assets/images/loading.gif" v-show="loading" style="position:absolute;right: 210px;margin-top: 80px;">
              </div>
              <div class="butMsg">
                <li style="width:100%;height:26px;">
                  <img class="fr" src="../../assets/images/index_btn-moreTreva.png" style="margin:2px;" @click="goToPersonTrack">
                  <span class="fl" style="padding-left:20px;text-align:start;padding-top:5px;color:#74fdf6;font-size:12px;">最近10条轨迹</span>
                  <!-- <span class="fr" style="padding-right:60px;text-align:end;padding-top:5px;color:#fff;">地址</span> -->
                  </li>
                <ul class="track">
                  <li class="fl tentracksZero">
                    <span class="fl" style="color:#badddc;">{{trackItemZero.traceTime}}</span><br><span class="fl" style="color:#8ab5b4;">{{trackItemZero.adress}}</span>
                  </li>
                  <li class="fl tentracks" v-for="(item,index) in trackSubItems" :key="index">
                    <span class="fl" style="color:#badddc;">{{item.traceTime}}</span><br><span class="fl" style="color:#8ab5b4;">{{item.adress}}</span>
                  </li>
                </ul>
              </div>
          </div>
                             <el-dialog
                    :title="`布控人员: ${name?name:'未知'}`"
                    :visible.sync="dialogVisible"
                    :before-close="handleClose"
                    width="89%"
                    top='100px'
                    id="fullScreen"
                    v-if="true"
                    :modal='true'>
                     <img :src="fullPauseImg" v-show="isFullVideoPause" id='screenShot' style="width:100%;height:100%;" alt="" @click="getSuspectPoint" @mousemove="changeMouseStyle">
                    <el-button  v-show="isFullVideoPause" @click="playVideo(imgs,'fullVideoImg')" class="btn"></el-button>
                    <el-button v-show="true" class="btnShot" @click="screenshotBtn"></el-button>
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
                      <canvas id="fullVideoImg" width='1708px' height='780px' @click="pauseScreen()" v-show="!isFullVideoPause"></canvas>
                    </el-dialog>
          <satellite-and-png-switch :inSatellitePage="true" :url="'/home/homePage'" :style="{position: 'absolute', zIndex: 100, bottom: '60px'}"></satellite-and-png-switch>
        </el-main>

 </div>
</template>

<style lang="scss">
@import "./corpper/cropper.min.css";
.swiper-slide {
  height: 80px !important;
}
.swiper-container {
  overflow-y: scroll !important;
  height: 236px;
  margin-left: 112px !important;
  margin-top: 24px !important;
  text-align: left;
}
.cluster-img {
  width: 72px;
  margin-right: 4px;
  height: 76px;
}
.cluster-img:hover {
  width: 72px;
  margin-right: 4px;
  height: 76px;
  border: 1px solid #eb1c4c;
  // -moz-box-shadow:2px 2px 12px #EB1C4C;
  // -webkit-box-shadow:2px 2px 12px #EB1C4C;
  // box-shadow:2px 2px 12px #EB1C4C;
}
.videoFullScreen {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: tomato;
  border: 3px dashed #73eded;
  border-radius: 23%;
  background: url("../../assets/images/screen_toBig.png") no-repeat center
    center;
  float: right;
  right: 66px;
  margin-top: 35px;
}
@-webkit-keyframes twinkling {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.deviceTwinkling {
  -webkit-animation: twinkling 0.5s infinite ease-in-out;
}
#map {
  padding-bottom: 0px;
}
#map.elAdd {
  width: 100%;
  height: 100%;
}
#allmap.mapAdd {
  clip-path: polygon(
    10px 50px,
    1860px 50px,
    1910px 110px,
    1910px 930px,
    1764px 1070px,
    54px 1070px,
    10px 1024px
  );
  -webkit-clip-path: polygon(
    10px 50px,
    1860px 50px,
    1910px 110px,
    1910px 930px,
    1764px 1070px,
    54px 1070px,
    10px 1024px
  );
}
#person-spread.psAdd {
  background: url("../../assets/images/fullScreen_bg.png") no-repeat;
  margin: 0;
  width: 100%;
  height: 100%;
}
.ps-container {
  .el-main {
    margin-top: 16px;
    height: 880px;
  }
  #leftSelId.leftAdd {
    top: 60px;
  }
  #allmap {
    height: 100%;
    width: 100%;
  }
  .tentracksZero {
    margin-left: 28px;
    background: url("../../assets/images/index_treva_sliderPoint.png") no-repeat;
    padding-left: 30px;
  }
  .tentracks {
    margin-left: 28px;
    background: url("../../assets/images/index_treva_slider.png") no-repeat;
    padding-left: 30px;
  }
  #person-spread {
    padding: 0;
  }
  // lcx start
  #fullScreen {
    .el-dialog {
      margin: 0 0 50px 200px;
      background-color: rgba(0, 0, 0, 0.8);
      .el-dialog__header {
        background-color: rgba(0, 0, 0, 0.3);
        // padding: 0;
        span {
          color: #fff;
        }
        button {
          // background-color: rgba(100, 100, 100, 0.5);
          width: 31px;
          height: 31px;
          top: 12px;
          background: url("../../assets/images/screen_toSmall.png");
          i {
            font-size: 0px;
            &::before {
              color: #fff;
            }
          }
        }
      }
      .el-dialog__body {
        padding: 0;
        height: 780px;
        .btn {
          position: absolute;
          top: 50%;
          left: 48%;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          transform: translateY(-50%);
          transform: translateX(-50%);
          background-color: rgba(26, 32, 40, 0);
          border: 0px solid #000;
          outline: none;
          cursor: pointer;
          background-image: url("../../assets/images/play.png");
        }
        .reset {
          position: absolute;
          top: 50%;
          left: 48%;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          transform: translateY(-50%);
          transform: translateX(-50%);
          background-color: rgba(26, 32, 40, 0);
          border: 0px solid #000;
          outline: none;
          cursor: pointer;
          background-image: url("../../assets/images/playAgain.png");
          background-repeat: no-repeat;
        }
        .btnShot {
          position: absolute;
          top: 13px;
          right: 90px;
          width: 67px;
          border: 0px solid #000;
          background: url("../../assets/images/btn_screenShot.png");
        }
        // 人脸轨迹
        .checkTrack {
          position: absolute;
          top: 15px;
          left: 180px;
          width: 20px;
          border: 0px solid #000;
          background: url("../../assets/images/checkTrack.png") no-repeat center
            center;
        }
        // 新增重点人员
        .addSuspectPerson {
          position: absolute;
          background-color: rgba(0, 0, 0, 0);
          top: 5px;
          left: 240px;
          width: 20px;
          border: 0px solid #000;
        }
        // 下载
        .download {
          position: absolute;
          display: inline-block;
          width: 40px;
          height: 44px;
          background-color: rgba(0, 0, 0, 0);
          top: 5px;
          left: 320px;
          line-height: 44px;
          border: 0px solid #000;
        }
        // 退出
        .exit {
          position: absolute;
          top: 5px;
          background-color: rgba(0, 0, 0, 0);
          left: 360px;
          width: 20px;
          border: 0px solid #000;
        }
      }
    }
  }
  // lcx end
  .white {
    color: #fff;
    font-size: 12px;
  }
  .typeText {
    color: #dceded;
  }
  .leftkMask {
    width: 271px;
    height: 770px;
    background: url("../../assets/images/index-policeInfo-bg.png") no-repeat;
    position: absolute;
    left: 26px;
    top: 100px; // 顶部
    .result {
      position: relative;
      width: 100%;
      font-size: 12px;
      margin-top: 35px;
      margin-bottom: 10px;
      text-align: left;
      padding-left: 27px;
      color: #fff;
      span {
        font-size: 16px;
        color: rgb(255, 239, 128);
      }
    }
    .open {
      position: absolute;
      width: 271px;
      left: 0;
      max-height: 620px;
      overflow-y: scroll;
      li {
        position: relative;
        width: 271px;
        padding: 10px 27px;
        text-align: left;
        span {
          width: auto;
          color: rgb(255, 255, 255);
          font-size: 12px;
        }
        i {
          padding-left: 210px;
          background: url("../../assets/images/index-policeInfo-line.png")
            repeat-x;
        }
        div {
          width: auto;
          color: rgb(255, 255, 255);
          margin: 4px 4px 4px 0px;
          font-size: 12px;
        }
        .policLevel {
          text-align: left;
          background-color: #349fe4;
          border-radius: 3px;
          padding: 2px 5px;
        }
      }
    }
  }
  #rightMaskId.rightAdd {
    top: 84px;
  }
  #rightMaskId {
    width: 450px;
    height: 770px;
    position: absolute;
    right: -21px;
    top: 26px;
    .topMsg {
      color: #fff;
      &.launch {
        background: url("../../assets/images/index-infoBg-launch.png") no-repeat;
        height: 363px;
        padding-top: 30px;
      }
      &.fold {
        background: url("../../assets/images/index-infoMsg-shrink.png")
          no-repeat;
        height: 187px;
        padding-top: 30px;
      }
      span {
        width: auto;
        color: #74fdfb;
        margin-right: 290px;
      }
      li {
        width: 100%;
        min-height: 18px;
        margin-top: 5px;
        text-align: start;
        font-size: 12px;
      }
      #add {
        width: 60%;
        margin: auto;
        margin-top: 5px;
      }
      .baseMsg {
        position: relative;
        height: 138px;
        padding: 0;
        float: left;
        .divider {
          height: 1px;
          background-color: #4f7f83;
          margin-left: 30px;
          margin-top: 20px;
        }
        .leftText {
          position: relative;
          top: -20px;
          display: inline-block;
          margin-left: 30px;
          width: 60px;
        }
        .rightText {
          position: relative;
          top: -20px;
          display: inline-block;
          margin-left: 10px;
          width: 160px;
        }
        .leftDetailText {
          top: 4px;
          position: relative;
          display: inline-block;
          margin-left: 30px;
          width: 60px;
        }
        .rightDetailText {
          top: 4px;
          position: relative;
          display: inline-block;
          margin-left: 10px;
          width: 160px;
        }
      }
    }
    .midMsg {
      background: url("../../assets/images/index-vedio-bg.png") no-repeat;
      height: 203px;
    }
    .butMsg {
      background: url("../../assets/images/index-treva-bg.png") no-repeat;
      height: 210px;
      padding-top: 26px;
      padding-left: 11px;
      padding-right: 55px;
      .track {
        position: relative;
        height: 144px;
        overflow-y: scroll;
        .divider {
          height: 1px;
          background-color: #4f7f83;
          margin-top: 28px;
        }
        li {
          font-size: 12px;
          color: #fff;
          width: 100%;
          height: 46px;
        }
      }
    }
    // .btn {
    // margin-top:19%;
    // top: 42%;
    // left: 38%;
    // border-radius: 50%;
    // width: 50px;
    // height: 50px;
    // background-color: rgba(26, 32, 40, 0);
    // border: 0px solid #000;
    // background: url('../../assets/images/play.png') no-repeat;
    // }
  }
  .moreInfo {
    margin-left: 30px;
  }
}
@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.radar-test {
  animation: rotation 10s linear infinite;
  -moz-animation: rotation 10s linear infinite;
  -webkit-animation: rotation 10s linear infinite;
  -o-animation: rotation 10s linear infinite;
}
</style>
<style lang="scss" scoped>
#leftSelId {
  width: 442px;
  height: 46px;
  background: url("../../assets/images/index_selectBg.png") no-repeat;
  position: absolute;
  left: 20px;
  top: 24px;
  padding-top: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>

<script >
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { createMap } from "../../common/js/createMap.js";
import { setLevelIcon } from "../../common/js/setLevelIcon.js";
import { setAreaName } from "../../common/js/setAreaName.js";
import { setPosMsg } from "../../common/js/setPosMsg.js";
import { createRadarOverlay } from "./js/createRadarOverlay.js";
import countMsg from "../../components/countMsg.vue";
import { POLICEMEN, TRACKITEMS, imgUrls } from "./mock/mockForSpread.js";
import "../../common/js/frameAnimation.js";
import { dateFmt } from "../../common/js/utils.js";
import { createSuspectMarker } from "./js/createSuspectMarker.js";
import { createPeopleInfoBox } from "./js/createPeopleInfoBox.js";
import { createDeviceMarker } from "./js/createDeviceMarker.js";
import "./corpper/cropper.esm.js";
import { addSuspectPerson } from "./js/addSuspectPerson.js";
import SatelliteAndPngSwitch from "components/SatelliteAndPngSwitch";
export default {
  data() {
    return {
      typess:['1','2'],
      playingImg: null,
      isGettingData:false,
      loading: false,
      suspectStatus: 0,
      peopleStatus: 0,
      policeStatus: 0,
      time: [dateFmt(+new Date() - 86400 * 1000), dateFmt(+new Date())],
      imgPoints: [],
      fullPauseImg: null,
      tFlag: true,
      isFullVideoPause: false,
      screenControlFlag: false, // 截图的四种操作图标flag
      isSelect: false,
      result: "0",
      isUpShow: true,
      policemen: POLICEMEN,
      trackItemZero: { adress: "暂无轨迹", traceTime: dateFmt(new Date()) },
      trackSubItems: [],
      peopleImgs: [],
      isSuspectSelectImg: require("../../assets/images/index_InSelected.png"),
      isPoliceSelectImg: require("../../assets/images/index_InSelected.png"),
      isPeopleSelectImg: require("../../assets/images/index_InSelected.png"),
      suspectMarkers: [],
      policeMarkers: [],
      peopleMarkers: [],
      peopleMarkerclusterer: null,
      map: null,
      isRightShow: false,
      showTypeName: "",
      name: "",
      identityCard: "",
      address: "",
      source: "",
      aliasName: "",
      sex: "",
      typeName: "",
      phone1: "",
      phone2: "",
      phone3: "",
      leftSwitchEnable: false,
      rightSwitchEnable: false,
      fullScreen: false,
      videoFrontImg: "",
      isPlay: true,
      imgs: [],
      showDataDuration: 1 * 1000,
      faceUId: "",
      searchDeviceIp: "",
      searchTime: "",
      ani: null,
      drawTimer: null,
      showTimer: null,
      baseImg: require("../../assets/images/noPhoto.png"),
      detailImg: require("../../assets/images/noPhoto.png"),
      personDetailLists: [],
      fullScreenData: {}, // 全屏时的数据
      dialogVisible: false, // 全屏的弹出框
      deviceMarkers: [],
      detailIndex: -1,
      leftPolygon: null,
      rightPolygon: null,
      radar: null
    };
  },
  components: {
    "count-msg": countMsg,
    SatelliteAndPngSwitch
  },
  mounted() {
    this.ready();
  },
  beforeDestroy() {
    this.suspectStatus = this.peopleStatus = this.policeStatus = 0;
    this.drawTimer && clearInterval(this.drawTimer);
    this.showTimer && clearTimeout(this.showTimer);
  },
  created() {
    this.$root.Bus.$on("fullScreen", value => {
      if (value) {
        var fullscree = require("fullscreen"),
          el = document.getElementById("map"),
          fs,
          map1 = document.getElementById("allmap"),
          ps = document.getElementById("person-spread"),
          left = document.getElementById("leftSelId"),
          right = document.getElementById("rightMaskId");
        var elcss = el.getAttribute("class") || "";
        if (elcss.indexOf("elAdd") == -1) {
          elcss = elcss.concat(" elAdd");
        }
        el.setAttribute("class", elcss);
        var mapcss = map1.getAttribute("class") || "";
        if (mapcss.indexOf("mapAdd") == -1) {
          mapcss = mapcss.concat(" mapAdd");
        }
        map1.setAttribute("class", mapcss);
        var pscss = ps.getAttribute("class") || "";
        if (pscss.indexOf("psAdd") == -1) {
          pscss = pscss.concat(" psAdd");
        }
        ps.setAttribute("class", pscss);
        var leftcss = left.getAttribute("class") || "";
        if (leftcss.indexOf("leftAdd") == -1) {
          leftcss = leftcss.concat(" leftAdd");
        }
        left.setAttribute("class", leftcss);
        var rightcss = right.getAttribute("class") || "";
        if (rightcss.indexOf("rightAdd") == -1) {
          rightcss = rightcss.concat(" rightAdd");
        }
        right.setAttribute("class", rightcss);
        fs = fullscree(el);
        fs.request();
      }
    });
  },
  watch: {
    isRightShow(val){
      if(!val){
        if(this.drawTimer){clearInterval(this.drawTimer)}
      }
    }
  },
  methods: {
    changeMouseStyle(event) {
      $("#screenShot").removeClass("teta");
      let pointLists = [];
      if (this.imgPoints.length > 0) {
        this.imgPoints.forEach(ip => {
          let img;
          if (this.fullPauseImg.indexOf("&face") != -1) {
            img = this.fullPauseImg.split("path=")[1].split("&")[0];
          } else {
            img = this.fullPauseImg.split("path=")[1];
          }
          if (img == ip.img) {
            pointLists = ip.pointLists;
            if (pointLists.length > 0) {
              pointLists.forEach(pl => {
                if (
                  event.offsetX > Math.floor(pl.Xmin * 1708 / 3072) &&
                  event.offsetX < Math.ceil(pl.Xmax * 1708 / 3072) &&
                  event.offsetY > Math.floor(pl.Ymin * 780 / 2048) &&
                  event.offsetY < Math.ceil(pl.Ymax * 780 / 2048)
                ) {
                  $("#screenShot").addClass("teta");
                }
              });
            }
          }
        });
      }
    },
    getSuspectPoint(event) {
      let pointLists = [];
      if (this.imgPoints.length > 0) {
        this.imgPoints.forEach(ip => {
          let img;
          if (this.fullPauseImg.indexOf("&face") != -1) {
            img = this.fullPauseImg.split("path=")[1].split("&")[0];
          } else {
            img = this.fullPauseImg.split("path=")[1];
          }
          if (img == ip.img) {
            pointLists = ip.pointLists;
            if (pointLists.length > 0) {
              pointLists.forEach(pl => {
                if (
                  event.offsetX > Math.floor(pl.Xmin * 1708 / 3072) &&
                  event.offsetX < Math.ceil(pl.Xmax * 1708 / 3072) &&
                  event.offsetY > Math.floor(pl.Ymin * 780 / 2048) &&
                  event.offsetY < Math.ceil(pl.Ymax * 780 / 2048)
                ) {
                  this.screenshotBtn(pl);
                  return;
                }
              });
            }
          }
        });
      }
    },
    pauseScreen() {
      this.ani.pause();
      this.isFullVideoPause = true;
    },
    // 查询人员轨迹
    checkTrack() {
      this.loading = false;
      var $image = $("#screenShot");
      var cas = $image.cropper("getCroppedCanvas");
      var base64url = cas.toDataURL("image/jpeg");

      let params = {
        faceByte: base64url,
        startTime: dateFmt(+new Date(this.time[0])),
        endTime: dateFmt(+new Date(this.time[1])),
        threshold: this.threshold
      };
      // console.log("人脸search---",params)
      this.loading = true;
      this.isSearchAgain = true;
      this.$router.push({
        name: "personTrack",
        query: { param: params }
      });
      this.base64url = base64url;

      $image.cropper("destroy");
      this.isShow = false; // 切换为地图
      this.dialogVisible = false; // 关闭弹出框的遮罩
      this.isSwitch = false; // 转为人脸检索
      this.searchWay = "人脸检索";
      this.screenControlFlag = false; // 是否显示截屏
    },
    // 添加为重点人员
    addSuspectPerson() {
      var $image = $("#screenShot");
      var cas = $image.cropper("getCroppedCanvas");
      var base64url = cas.toDataURL("image/jpeg");
      addSuspectPerson(this, base64url);
      $image.cropper("destroy");
      this.screenControlFlag = false;
    },
    // 下载
    download() {
      var $image = $("#screenShot");
      var cas = $image.cropper("getCroppedCanvas");
      var base64url = cas.toDataURL("image/jpeg");
      $("#download_img").attr("href", base64url);
      $image.cropper("destroy");
      this.screenControlFlag = false;
    },
    // 取消
    exit() {
      var $image = $("#screenShot");
      $image.cropper("destroy");
      this.screenControlFlag = false;
    },
    // 全屏暂停截图
    screenshotBtn(pl) {
      this.screenControlFlag = true;

      var $image = $("#screenShot");
      var cropper = $image.data("cropper");

      $image.cropper({
        autoCropArea: 0.2,
        ready: function() {
          if (pl) {
            $image.cropper("setCropBoxData", {
              left: Math.floor(pl.Xmin * 1386 / 3072) + 160,
              top: Math.floor(pl.Ymin * 780 / 2048),
              width: Math.ceil(pl.deltaX * 1386 / 3072),
              height: Math.ceil(pl.deltaY * 780 / 2048)
            });
          }
        }
      });
      $image.on("cropstart", () => {});
    },
    hideRight() {
      this.isRightShow = false;
    },
    changeSuspectSelection() {
      this.isSuspectSelectImg = this.isSuspectSelectImg == require("../../assets/images/index_InSelected.png")?require("../../assets/images/index_selected.png"):require("../../assets/images/index_InSelected.png");
      this.isSuspectSelectImg == require("../../assets/images/index_InSelected.png") && this.typess.indexOf('2') != -1 && this.typess.splice(this.typess.indexOf('2'),1) && this.hideSuspects()
      this.isSuspectSelectImg == require("../../assets/images/index_selected.png") && this.typess.indexOf('2') == -1 && this.typess.push('2')
   },
    changePeopleSelection() {
      this.isPeopleSelectImg = this.isPeopleSelectImg == require("../../assets/images/index_InSelected.png")?require("../../assets/images/index_selected.png"):require("../../assets/images/index_InSelected.png");
      this.isPeopleSelectImg == require("../../assets/images/index_InSelected.png") && this.typess.indexOf('3') != -1 && this.typess.splice(this.typess.indexOf('3'),1) && this.hidePeople() 
      this.isPeopleSelectImg == require("../../assets/images/index_selected.png") && this.typess.indexOf('3') == -1 && this.typess.push('3')
    },
    changePoliceSelection() {
      this.isPoliceSelectImg = this.isPoliceSelectImg == require("../../assets/images/index_InSelected.png")?require("../../assets/images/index_selected.png"):require("../../assets/images/index_InSelected.png");
      this.isPoliceSelectImg == require("../../assets/images/index_InSelected.png") && this.typess.indexOf('1') != -1 && this.typess.splice(this.typess.indexOf('1'),1) && this.hidePolice()
      this.isPoliceSelectImg == require("../../assets/images/index_selected.png") && this.typess.indexOf('1') == -1 && this.typess.push('1')
    },
    showDatas(typeList){
      if(typeList.length == 0) {
          this.showTimer && clearTimeout(this.showTimer)
          this.showTimer = setTimeout(() => this.showDatas(this.typess), 1000)
          return;
        }
      if(this.isGettingData) return;
      this.isGettingData = true;
      let types = typeList.join(',');
      this.$axios.get(`/trace/personMonitor/getPersonTrace?typeStr=${types}`)
      .then(res => {
        this.hideSuspects();
        this.hidePolice();
        this.hidePeople();
        this.isGettingData = false;
        if(res.data.length > 0){
            this.radar.ib1.close();
            this.radar.ib2.close();
            this.radar.marker.setMap(null);
            let polices = [];
            let suspects = [];
            let people = [];
            res.data.forEach(po => {
              switch (po.type) {
                case 1:
                  polices.push(po);
                  break;
                case 2:
                  suspects.push(po);
                  break;
                case 3:
                  people.push(po);
                  break;
                default:
                  break;
              }
          })
          //画行人、警员、重点人员
          this.showSuspects(suspects);
          this.showPeople(people);
          this.showPolice(polices);
        }
        this.showTimer && clearTimeout(this.showTimer)
        this.showTimer = setTimeout(() => this.showDatas(this.typess), 1000)
      })
      .catch(err => {
        this.isGettingData = false;
        this.hideSuspects();
        this.hidePolice();
        this.hidePeople();
        this.showTimer && clearTimeout(this.showTimer)
        this.showTimer = setTimeout(() => this.showDatas(this.typess), 1000)
      })
    },
    showSuspects(suspects){
      if(suspects.length == 0) return
      const map = this.map;
      let var_this = this;
      //判断tuid是否存在
      this.judgeTFlag(suspects);
      suspects.forEach((p, index) => {
              let fi = p.uId;
              let ft = p.tuId;
              let d = p.device;
              let cl = p.id;
              let img = p.backimg;
              var latlng = new google.maps.LatLng(p.lat, p.lng);
              var marker = new google.maps.Marker({
                position: latlng,
                icon: "../static/images/index_suspect.png",
                imgPath: var_this.tFlag
                  ? p.img || "../../../static/images/no-photo.png"
                  : `/upload/showFaceImg?rowKey=${p.rowKey}` ||
                    "../../../static/images/no-photo.png",
                uid: p.uId,
                tuId: p.tuId,
                device: p.device,
                personId: p.id,
                img: p.backimg,
                map: map
              });
              google.maps.event.addListener(marker, "click", function() {
                var_this.showPersonBaseDetails(cl);
                if (!var_this.isRightShow) {
                  var_this.isRightShow = true;
                }
                var_this.drawVideo(var_this.tFlag ? img : fi);
                var_this.getTenTracks(var_this.tFlag ? ft : fi);
              });
              this.suspectMarkers.push(marker);
      });
      this.suspectMarkerclusterer = new MarkerClusterer(
              map,
              this.suspectMarkers,
              { imagePath: "../../../static/images/n", zoomOnClick: false }
            );
            this.suspectMarkerclusterer &&
              this.suspectMarkerclusterer.addListener("clusterclick", function(
                cluster
              ) {
                let ius = [];
                cluster.getMarkers().forEach(m => {
                  ius.push({
                    imgPath: m.imgPath,
                    uid: m.uid,
                    tuId: m.tuId,
                    tFlag: var_this.tFlag,
                    device: m.device,
                    personId: m.personId,
                    img: m.img
                  });
                });
                let ib = createPeopleInfoBox(ius, false);
                ib.addListener("domready", () => {
                  new Swiper(".swiper-container", {
                    direction: "vertical",
                    slidesPerView: "auto",
                    spaceBetween: 0,
                    grabCursor: true,
                    loop: false,
                    observer: true,
                    noSwiping: true,
                    observeParents: true
                  });
                  ius.forEach(item => {
                    let img = document.getElementById(
                      var_this.tFlag ? item.tuId : item.uid
                    );
                    img &&
                      (img.onclick = function() {
                        var_this.showPersonBaseDetails(item.personId);
                        if (!var_this.isRightShow) {
                          var_this.isRightShow = true;
                        }
                        var_this.drawVideo(
                          var_this.tFlag ? item.img : item.uid
                        );
                        var_this.getTenTracks(
                          var_this.tFlag ? item.tuId : item.uid
                        );
                      });
                  });
                });
                ib.open(map, cluster.getMarkers()[0]);
              });
    },
    showPeople(people){
      if(people.length == 0) return
      const map = this.map;
      let var_this = this;
      //判断tuid是否存在
      this.judgeTFlag(people);
      people.forEach((p, index) => {
        let fi = p.uId;
              let ft = p.tuId;
              let d = p.device;
              let img = p.backimg;
              var latlng = new google.maps.LatLng(p.lat, p.lng);
              var marker = new google.maps.Marker({
                position: latlng,
                icon: "../static/images/index_people.png",
                imgPath: var_this.tFlag
                  ? p.img || "../../../static/images/no-photo.png"
                  : `/upload/showFaceImg?rowKey=${p.rowKey}` ||
                    "../../../static/images/no-photo.png",
                uid: p.uId,
                tuId: p.tuId,
                device: p.device,
                img: p.backimg,
                map: map
              });
              google.maps.event.addListener(marker, "click", function() {
                var_this.showPersonBaseDetails(null);
                if (!var_this.isRightShow) {
                  var_this.isRightShow = true;
                }
                var_this.drawVideo(var_this.tFlag ? img : fi);
                var_this.getTenTracks(var_this.tFlag ? ft : fi);
              });
              this.peopleMarkers.push(marker);
      })
      this.peopleMarkerclusterer = new MarkerClusterer(
              map,
              this.peopleMarkers,
              { imagePath: "../../../static/images/m", zoomOnClick: false }
            );
            this.peopleMarkerclusterer &&
              this.peopleMarkerclusterer.addListener("clusterclick", function(
                cluster
              ) {
                let ius = [];
                cluster.getMarkers().forEach(m => {
                  ius.push({
                    imgPath: m.imgPath,
                    tuId: m.tuId,
                    device: m.device,
                    tFlag: var_this.tFlag,
                    uid: m.uid,
                    img: m.img
                  });
                });
                let ib = createPeopleInfoBox(ius);
                ib.addListener("domready", () => {
                  new Swiper(".swiper-container", {
                    direction: "vertical",
                    slidesPerView: "auto",
                    spaceBetween: 0,
                    grabCursor: true,
                    loop: false,
                    observer: true,
                    noSwiping: true,
                    observeParents: true
                  });
                  ius.forEach(item => {
                    let img = document.getElementById(
                      var_this.tFlag ? item.tuId : item.uid
                    );
                    img &&
                      (img.onclick = function() {
                        var_this.showPersonBaseDetails(null);
                        if (!var_this.isRightShow) {
                          var_this.isRightShow = true;
                        }
                        var_this.drawVideo(
                          var_this.tFlag ? item.img : item.uid
                        );
                        var_this.getTenTracks(
                          var_this.tFlag ? item.tuId : item.uid
                        );
                      });
                  });
                });
                ib.open(map, cluster.getMarkers()[0]);
              });
    },
    showPolice(police){
      if(police.length == 0) return
      const map = this.map;
      police.forEach((p, index) => {
        var latlng = new google.maps.LatLng(p.lat, p.lng);
        var marker = new google.maps.Marker({
          position: latlng,
          icon: "../static/images/index_police.png",
          map: map
        });
        this.policeMarkers.push(marker);
      })
    },
    judgeTFlag(array){
      this.tFlag = true;
      for (let i = 0; i < array.length; i++) {
        if (!array[i].tuId) {
          this.tFlag = false;
          break;
        }
      }
    },
    // showSuspects() {
    //   if (this.suspectStatus == 0 || this.suspectStatus == 1) {
    //     return;
    //   }
    //   if (this.suspectStatus == 2) {
    //     this.suspectStatus = 1;
    //   }
    //   const map = this.map;
    //   let var_this = this;
    //   const url = "/trace/personMonitor/getPersonTrace?typeStr=2";
    //   this.$axios
    //     .get(url)
    //     .then(res => {
    //       var_this.hideSuspects();
    //       if (var_this.suspectStatus == 1) {
    //         var_this.suspectStatus = 2;
    //       }
    //       if (var_this.suspectStatus == 2) {
    //         setTimeout(() => {
    //           var_this.showSuspects();
    //         }, var_this.showDataDuration);
    //       } else {
    //         return;
    //       }
    //       if (res.data.length > 0) {
    //         var_this.radar.ib1.close();
    //         var_this.radar.ib2.close();
    //         var_this.radar.marker.setMap(null);
    //         //判断tuid是否存在
    //         var_this.tFlag = true;
    //         for (let i = 0; i < res.data.length; i++) {
    //           if (!res.data[i].tuId) {
    //             var_this.tFlag = false;
    //             break;
    //           }
    //         }
    //         res.data.forEach((p, index) => {
    //           let fi = p.uId;
    //           let ft = p.tuId;
    //           let d = p.device;
    //           let cl = p.id;
    //           let img = p.backimg;
    //           var latlng = new google.maps.LatLng(p.lat, p.lng);
    //           var marker = new google.maps.Marker({
    //             position: latlng,
    //             icon: "../static/images/index_suspect.png",
    //             imgPath: var_this.tFlag
    //               ? p.img || "../../../static/images/no-photo.png"
    //               : `/upload/showFaceImg?rowKey=${p.rowKey}` ||
    //                 "../../../static/images/no-photo.png",
    //             // imgPath: p.rowKey&&p.colTime?`/upload/showFaceImg?rowKey=${p.rowKey}&colTime=${p.colTime}`:'../../../static/images/no-photo.png',
    //             uid: p.uId,
    //             tuId: p.tuId,
    //             device: p.device,
    //             personId: p.id,
    //             img: p.backimg,
    //             map: map
    //           });
    //           google.maps.event.addListener(marker, "click", function() {
    //             var_this.showPersonBaseDetails(cl);
    //             if (!var_this.isRightShow) {
    //               var_this.isRightShow = true;
    //             }
    //             var_this.drawVideo(var_this.tFlag ? img : fi);
    //             var_this.getTenTracks(var_this.tFlag ? ft : fi);
    //           });
    //           this.suspectMarkers.push(marker);
    //         });
    //         this.suspectMarkerclusterer = new MarkerClusterer(
    //           map,
    //           this.suspectMarkers,
    //           { imagePath: "../../../static/images/n", zoomOnClick: false }
    //         );
    //         this.suspectMarkerclusterer &&
    //           this.suspectMarkerclusterer.addListener("clusterclick", function(
    //             cluster
    //           ) {
    //             let ius = [];
    //             cluster.getMarkers().forEach(m => {
    //               ius.push({
    //                 imgPath: m.imgPath,
    //                 uid: m.uid,
    //                 tuId: m.tuId,
    //                 tFlag: var_this.tFlag,
    //                 device: m.device,
    //                 personId: m.personId,
    //                 img: m.img
    //               });
    //             });
    //             let ib = createPeopleInfoBox(ius, false);
    //             ib.addListener("domready", () => {
    //               new Swiper(".swiper-container", {
    //                 direction: "vertical",
    //                 slidesPerView: "auto",
    //                 spaceBetween: 0,
    //                 grabCursor: true,
    //                 loop: false,
    //                 observer: true,
    //                 noSwiping: true,
    //                 observeParents: true
    //               });
    //               ius.forEach(item => {
    //                 let img = document.getElementById(
    //                   var_this.tFlag ? item.tuId : item.uid
    //                 );
    //                 img &&
    //                   (img.onclick = function() {
    //                     var_this.showPersonBaseDetails(item.personId);
    //                     if (!var_this.isRightShow) {
    //                       var_this.isRightShow = true;
    //                     }

    //                     var_this.drawVideo(
    //                       var_this.tFlag ? item.img : item.uid
    //                     );
    //                     var_this.getTenTracks(
    //                       var_this.tFlag ? item.tuId : item.uid
    //                     );
    //                   });
    //               });
    //             });
    //             ib.open(map, cluster.getMarkers()[0]);
    //           });
    //       }
    //     })
    //     .catch(error => {
    //       var_this.hideSuspects();
    //       if (var_this.suspectStatus == 1) {
    //         var_this.suspectStatus = 2;
    //       }
    //       if (var_this.suspectStatus == 2) {
    //         setTimeout(() => {
    //           var_this.showSuspects();
    //         }, var_this.showDataDuration);
    //       }
    //     });
    // },
    hideSuspects() {
      if (this.suspectMarkerclusterer != null) {
        this.suspectMarkerclusterer.removeMarkers(this.suspectMarkers);
      }
      this.suspectMarkers = [];
    },
    // showPeople() {
    //   if (this.peopleStatus == 0 || this.peopleStatus == 1) {
    //     return;
    //   }
    //   if (this.peopleStatus == 2) {
    //     this.peopleStatus = 1;
    //   }
    //   const map = this.map;
    //   let var_this = this;

    //   const url = "/trace/personMonitor/getPersonTrace?typeStr=3";
    //   this.$axios
    //     .get(url)
    //     .then(res => {
    //       var_this.hidePeople();
    //       if (var_this.peopleStatus == 1) {
    //         var_this.peopleStatus = 2;
    //       }
    //       if (var_this.peopleStatus == 2) {
    //         setTimeout(() => {
    //           var_this.showPeople();
    //         }, var_this.showDataDuration);
    //       } else {
    //         return;
    //       }
    //       if (res.data.length > 0) {
    //         // var_this.hidePeople();
    //         var_this.radar.ib1.close();
    //         var_this.radar.ib2.close();
    //         var_this.radar.marker.setMap(null);
    //         //判断tuid是否存在
    //         var_this.tFlag = true;
    //         for (let i = 0; i < res.data.length; i++) {
    //           if (!res.data[i].tuId) {
    //             var_this.tFlag = false;
    //             break;
    //           }
    //         }
    //         res.data.forEach((p, index) => {
    //           let fi = p.uId;
    //           let ft = p.tuId;
    //           let d = p.device;
    //           let img = p.backimg;
    //           var latlng = new google.maps.LatLng(p.lat, p.lng);
    //           var marker = new google.maps.Marker({
    //             position: latlng,
    //             icon: "../static/images/index_people.png",
    //             imgPath: var_this.tFlag
    //               ? p.img || "../../../static/images/no-photo.png"
    //               : `/upload/showFaceImg?rowKey=${p.rowKey}` ||
    //                 "../../../static/images/no-photo.png",
    //             // imgPath: p.rowKey&&p.colTime?`/upload/showFaceImg?rowKey=${p.rowKey}&colTime=${p.colTime}`:'../../../static/images/no-photo.png',
    //             uid: p.uId,
    //             tuId: p.tuId,
    //             device: p.device,
    //             img: p.backimg,
    //             map: map
    //           });
    //           // var_this.peopleImgs.push(`/upload/showFaceImg?rowKey=${p.rowKey}&colTime=${p.colTime}`);
    //           google.maps.event.addListener(marker, "click", function() {
    //             var_this.showPersonBaseDetails(null);
    //             if (!var_this.isRightShow) {
    //               var_this.isRightShow = true;
    //             }
    //             var_this.drawVideo(var_this.tFlag ? img : fi);
    //             // var_this.faceUId = fi;
    //             var_this.getTenTracks(var_this.tFlag ? ft : fi);
    //           });
    //           this.peopleMarkers.push(marker);
    //         });
    //         this.peopleMarkerclusterer = new MarkerClusterer(
    //           map,
    //           this.peopleMarkers,
    //           { imagePath: "../../../static/images/m", zoomOnClick: false }
    //         );
    //         this.peopleMarkerclusterer &&
    //           this.peopleMarkerclusterer.addListener("clusterclick", function(
    //             cluster
    //           ) {
    //             let ius = [];
    //             cluster.getMarkers().forEach(m => {
    //               ius.push({
    //                 imgPath: m.imgPath,
    //                 tuId: m.tuId,
    //                 device: m.device,
    //                 tFlag: var_this.tFlag,
    //                 uid: m.uid,
    //                 img: m.img
    //               });
    //             });
    //             let ib = createPeopleInfoBox(ius);
    //             ib.addListener("domready", () => {
    //               new Swiper(".swiper-container", {
    //                 direction: "vertical",
    //                 slidesPerView: "auto",
    //                 spaceBetween: 0,
    //                 grabCursor: true,
    //                 loop: false,
    //                 observer: true,
    //                 noSwiping: true,
    //                 observeParents: true
    //               });
    //               ius.forEach(item => {
    //                 let img = document.getElementById(
    //                   var_this.tFlag ? item.tuId : item.uid
    //                 );
    //                 img &&
    //                   (img.onclick = function() {
    //                     var_this.showPersonBaseDetails(null);
    //                     if (!var_this.isRightShow) {
    //                       var_this.isRightShow = true;
    //                     }
    //                     var_this.drawVideo(
    //                       var_this.tFlag ? item.img : item.uid
    //                     );
    //                     var_this.getTenTracks(
    //                       var_this.tFlag ? item.tuId : item.uid
    //                     );
    //                   });
    //               });
    //             });
    //             ib.open(map, cluster.getMarkers()[0]);
    //           });
    //       }
    //     })
    //     .catch(error => {
    //       var_this.hidePeople();
    //       if (var_this.peopleStatus == 1) {
    //         var_this.peopleStatus = 2;
    //       }
    //       if (var_this.peopleStatus == 2) {
    //         setTimeout(() => {
    //           var_this.showPeople();
    //         }, var_this.showDataDuration);
    //       }
    //     });
    // },
    hidePeople() {
      if (this.peopleMarkerclusterer != null) {
        this.peopleMarkerclusterer.removeMarkers(this.peopleMarkers);
      }
      this.peopleMarkers = [];
    },
    // showPolice() {
    //   if (this.policeStatus == 0 || this.policeStatus == 1) {
    //     return;
    //   }
    //   if (this.policeStatus == 2) {
    //     this.policeStatus = 1;
    //   }
    //   const map = this.map;
    //   let var_this = this;

    //   const url = "/trace/personMonitor/getPersonTrace?typeStr=1";
    //   this.$axios
    //     .get(url)
    //     .then(res => {
    //       var_this.hidePolice();
    //       if (var_this.policeStatus == 1) {
    //         var_this.policeStatus = 2;
    //       }
    //       if (var_this.policeStatus == 2) {
    //         setTimeout(() => {
    //           var_this.showPolice();
    //         }, var_this.showDataDuration);
    //       } else {
    //         return;
    //       }
    //       if (res.data.length > 0) {
    //         res.data.forEach(p => {
    //           var latlng = new google.maps.LatLng(p.lat, p.lng);
    //           var marker = new google.maps.Marker({
    //             position: latlng,
    //             icon: "../static/images/index_police.png",
    //             map: map
    //           });
    //           this.policeMarkers.push(marker);
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       var_this.hidePolice();
    //       if (var_this.policeStatus == 1) {
    //         var_this.policeStatus = 2;
    //       }
    //       if (var_this.policeStatus == 2) {
    //         setTimeout(() => {
    //           var_this.showPolice();
    //         }, var_this.showDataDuration);
    //       }
    //     });
    // },
    hidePolice() {
      if (this.policeMarkers.length > 0) {
        this.policeMarkers.forEach(pm => {
          pm.setMap(null);
        });
      }
      this.policeMarkers = [];
    },
    getTenTracks(uId) {
      this.faceUId = uId;

      const url = "/trace/personMonitor/getPersonSpoor/" + uId;
      this.$axios.get(url).then(res => {
        if (res.data.length == 0) {
          this.trackItemZero = {
            adress: "暂无轨迹",
            traceTime: dateFmt(new Date())
          };
          this.trackSubItems = [];
        }
        if (res.data.length > 0) {
          this.trackItemZero = res.data[0];
        }
        if (res.data.length > 1) {
          res.data.shift();
          if (res.data.length > 9) {
            this.trackSubItems = res.data.slice(0, 8);
          } else {
            this.trackSubItems = res.data;
          }
        }
      });
    },
    switchToLeft() {
      this.detailIndex--;
      this.rightSwitchEnable = true;
      if (this.detailIndex == 0) {
        this.leftSwitchEnable = false;
      }
      this.aliasName = this.personDetailLists[this.detailIndex].personAliasName;
      this.source = this.personDetailLists[this.detailIndex].personSource;
      this.sex =
        this.personDetailLists[this.detailIndex].personSex == "0"
          ? "未知"
          : this.personDetailLists[this.detailIndex].personSex == "1"
            ? "男"
            : "女";
      this.typeName =
        this.personDetailLists[this.detailIndex].personTypeName == null
          ? "未知"
          : this.personDetailLists[this.detailIndex].personTypeName;
      this.phone1 = this.personDetailLists[this.detailIndex].personPhone1;
      this.phone2 = this.personDetailLists[this.detailIndex].personPhone2;
      this.phone3 = this.personDetailLists[this.detailIndex].personPhone3;
    },
    switchToRight() {
      this.detailIndex++;
      this.leftSwitchEnable = true;
      if (this.detailIndex == this.personDetailLists.length - 1) {
        this.rightSwitchEnable = false;
      }
      this.aliasName = this.personDetailLists[this.detailIndex].personAliasName;
      this.source = this.personDetailLists[this.detailIndex].personSource;
      this.sex =
        this.personDetailLists[this.detailIndex].personSex == "0"
          ? "未知"
          : this.personDetailLists[this.detailIndex].personSex == "1"
            ? "男"
            : "女";
      this.typeName =
        this.personDetailLists[this.detailIndex].personTypeName == null
          ? "未知"
          : this.personDetailLists[this.detailIndex].personTypeName;
      this.phone1 = this.personDetailLists[this.detailIndex].personPhone1;
      this.phone2 = this.personDetailLists[this.detailIndex].personPhone2;
      this.phone3 = this.personDetailLists[this.detailIndex].personPhone3;
    },
    showPersonBaseDetails(personId) {
      this.showTypeName = this.name = this.identityCard = this.address = this.source = this.aliasName = this.sex = this.typeName = this.phone1 = this.phone2 = this.phone3 =
        "";
      this.baseImg = this.detailImg = require("../../assets/images/noPhoto.png");
      this.leftSwitchEnable = this.rightSwitchEnable = false;
      this.personDetailLists = [];
      const url = "/info/person/getPersonBaseDetailInfoById/" + personId;
      let var_this = this;
      this.$axios.get(url).then(res => {
        let dl = res.data;
        var_this.showTypeName = personId ? "重点人员" : "行人";
        var_this.name = dl.personName;
        var_this.identityCard = dl.identityCard;
        var_this.address = dl.personAddr;
        var_this.baseImg = var_this.detailImg =
          "/upload/showImg?id=" + dl.personPhoto;
        if (dl.personDetailList.length > 0) {
          this.personDetailLists = dl.personDetailList;
          if (dl.personDetailList.length > 1) {
            this.rightSwitchEnable = true;
            this.detailIndex = 0;
          }
          let d = dl.personDetailList[0];
          var_this.aliasName = d.personAliasName;
          var_this.source = d.personSource;
          var_this.sex =
            d.personSex == "0" ? "未知" : d.personSex == "1" ? "男" : "女";
          var_this.typeName =
            d.personTypeName == null ? "未知" : d.personTypeName;
          var_this.phone1 = d.personPhone1;
          var_this.phone2 = d.personPhone2;
          var_this.phone3 = d.personPhone3;
        }
      });
    },
    addBg() {
      this.isUpShow = !this.isUpShow;
      this.isSelect = this.isSelect ? false : true;
    },
    ready: function() {
      var fullscreen = require("fullscreen"),
        el = document.getElementById("map"),
        fs,
        map1 = document.getElementById("allmap"),
        ps = document.getElementById("person-spread"),
        left = document.getElementById("leftSelId"),
        right = document.getElementById("rightMaskId");
      fs = fullscreen(el);
      document.body.onkeydown = function() {
        fs.release();
      };
      fs.on("release", function() {
        this.fullScreen = false;
        var elcss = el.getAttribute("class") || "";
        elcss = elcss.replace("elAdd", "");
        el.setAttribute("class", elcss);
        var mapcss = map1.getAttribute("class") || "";
        mapcss = mapcss.replace("mapAdd", "");
        map1.setAttribute("class", mapcss);
        var pscss = ps.getAttribute("class") || "";
        pscss = pscss.replace("psAdd", "");
        ps.setAttribute("class", pscss);
        var leftcss = left.getAttribute("class") || "";
        leftcss = leftcss.replace("leftAdd", "");
        left.setAttribute("class", leftcss);
        var rightcss = right.getAttribute("class") || "";
        rightcss = rightcss.replace("rightAdd", "");
        right.setAttribute("class", rightcss);
      });

      //地图创建
      this.map = createMap("allmap");
      const map = this.map;
      this.drawPolygon(map);
      google.maps.event.addListener(map, "bounds_changed", function() {
        var_this.drawPolygon(map);
      });
      // var testM = new google.maps.Marker({
      //     draggable:true,
      //     position:new google.maps.LatLng(22.725330848977173,114.0420602789551),
      //     title:'',
      //     icon:'../static/images/warn_red.png',
      //     map:map
      // });
      //  google.maps.event.addListener(testM,'click',function(){
      //    console.log(testM.getPosition().lat(),testM.getPosition().lng());
      // });
      this.changeSuspectSelection();
      this.changePoliceSelection();
      this.showDatas(this.typess);
      let var_this = this;
      //雷达效果
      var startCenterX = map.center.lat();
      var startCenterY = map.center.lng();
      this.radar = createRadarOverlay(
        this.map,
        { lat: startCenterX, lng: startCenterY },
        ""
      );
    },
    playFullScreenVideo() {
      this.dialogVisible = true;
      let var_this = this;
      if (this.tFlag) {
        if (this.drawTimer) {
          clearInterval(var_this.drawTimer);
        }
        this.drawTimer = setInterval(function() {
          var_this.playRealVideo(var_this.playingImg, "fullVideoImg");
        }, 300);
      } else {
        setTimeout(function() {
          var_this.playVideo(var_this.imgs, "fullVideoImg");
        }, 0);
      }
    },
    drawPolygon(map) {
      let bounds = map.getBounds();
      let southWest = bounds.getSouthWest();
      let northEast = bounds.getNorthEast();
      let southEast = { lat: southWest.lat(), lng: northEast.lng() };
      let northWest = { lat: northEast.lat(), lng: southWest.lng() };
      // ----
      let southWestLatLng = {
        lat: southWest.lat() - 0.01,
        lng: southWest.lng()
      }; // 南部点往下挪动，避免覆盖不完全
      let northEastLatLng = { lat: northEast.lat(), lng: northEast.lng() };
      // ----
      // let leftPath = [northEast,northWest,southWest,{lat:22.724543806700126,lng:114.04214679987638},{lat:22.724753019003288,lng:114.0419885495445},{lat:22.726051208166496,lng:114.04371320994107}]
      // let rightPath = [northEast,southEast,southWest,{lat:22.724586722044364,lng:114.04213607104032},{lat:22.72533505835952,lng:114.04313653500287},{lat:22.725541588453666,lng:114.04341816694944},{lat:22.725766894010917,lng:114.04375880749433},{lat:22.72578566947402,lng:114.04381245167463},{lat:22.726051208166496,lng:114.04371320994107}]
      let leftPath = [
        northEastLatLng,
        northWest,
        southWestLatLng,
        { lat: 22.724543806700126, lng: 114.04214679987638 },
        { lat: 22.724753019003288, lng: 114.0419885495445 },
        { lat: 22.726051208166496, lng: 114.04371320994107 }
      ];
      let rightPath = [
        northEastLatLng,
        southEast,
        southWestLatLng,
        { lat: 22.724543806700126, lng: 114.04214679987638 },
        { lat: 22.72533505835952, lng: 114.04313653500287 },
        { lat: 22.725541588453666, lng: 114.04341816694944 },
        { lat: 22.725766894010917, lng: 114.04375880749433 },
        { lat: 22.72578566947402, lng: 114.04381245167463 },
        { lat: 22.726051208166496, lng: 114.04371320994107 }
      ];
      if (!this.leftPolygon) {
        this.leftPolygon = new google.maps.Polygon({
          path: leftPath,
          strokeColor: "black",
          strokeOpacity: 0.4,
          strokeWeight: 1,
          fillColor: "black",
          fillOpacity: 0.9,
          map: map
        });
      } else {
        this.leftPolygon.setPaths(leftPath);
      }

      if (!this.rightPolygon) {
        this.rightPolygon = new google.maps.Polygon({
          path: rightPath,
          strokeColor: "black",
          strokeOpacity: 0.4,
          strokeWeight: 1,
          fillColor: "black",
          fillOpacity: 0.9,
          map: map
        });
      } else {
        this.rightPolygon.setPaths(rightPath);
      }
    },
    handleClose() {
      this.dialogVisible = false;
      let var_this = this;
      if (this.tFlag) {
        if (this.drawTimer) {
          clearInterval(var_this.drawTimer);
        }
        this.drawTimer = setInterval(function() {
          var_this.playRealVideo(var_this.playingImg, "videoImg");
        }, 300);
      } else {
        setTimeout(function() {
          var_this.playVideo(var_this.imgs, "videoImg");
        }, 0);
      }
    },
    playVideo(imgs, faceId) {
      this.isFullVideoPause = false;
      let var_this = this;
      function play_animation(imgs, faceId) {
        if (var_this.ani) {
          var_this.ani.destroy();
        }
        if (imgs.length == 0) {
          return;
        }
        var_this.ani = new frame_ani({
          canvasTargetId: faceId,
          framesUrl: imgs,
          loop: false,
          frequency: 3,
          onStart: function() {
            var_this.loading = true;
          },
          onComplete: function() {
            var_this.fullPauseImg =
              var_this.imgs[var_this.ani.currentTimes - 1];
            if (var_this.faceUId == faceId) {
              var_this.getImgs(faceId);
            }
            //  var_this.testImgs()
          }
        });
        var_this.ani.initialize(() => {
          var_this.loading = false;
          var_this.ani.play();
        });
      }
      play_animation(imgs, faceId);
    },
    drawVideo(uId) {
      let var_this = this;
      if (this.tFlag) {
        if (this.drawTimer) {
          clearInterval(var_this.drawTimer);
        }
        this.drawTimer = setInterval(function() {
          var_this.playingImg = uId;
          var_this.playRealVideo(uId, "videoImg");
        }, 300);
      } else {
        this.getImgs(uId);
      }
    },
    playRealVideo(url,cId){
        let canvas=document.getElementById(cId);
        let ctx=canvas.getContext("2d");
        ctx.strokeStyle="yellow";
        let width = $("#" + cId).width();
        let height = $("#" + cId).height();
        this.$axios.get(url + '?timestamp='+new Date()).then(res => {
            //drawImage
          let data = res.data;
          let image = new Image();
          let lfx = data.headPoint.split(',')[0].split('[[')[1] * width / 3072;
          let lfy = data.headPoint.split(',')[1].split(']')[0] * height / 2048;
          let rbx = data.headPoint.split(',')[2].split('[')[1] * width /3072;
          let rby = data.headPoint.split(',')[3].split(']]')[0] * height / 2048;
          image.onload = function () {
            ctx.clearRect(0,0, width, height);
            ctx.drawImage(image,0,0, width, height);
            ctx.strokeRect(lfx,lfy,rbx-lfx,rby-lfy);
          };
          image.src = data.imagePath;
        })
        
        
    },
    testImgs() {
      this.imgs = imgUrls;
      this.playVideo(this.imgs, "videoImg");
    },
    getImgs(uId) {
      let var_this = this;
      const url = var_this.tFlag
        ? `/trace/personTrace/getPersonTraceBackGroudImgNoUid?deviceNum=${uId}`
        : `/trace/personTrace/getPersonTraceBackGroudImgByUid?uId=${uId}`;
      console.log("url", url);
      this.$axios({
        method: "get",
        url: url
      }).then(res => {
        var_this.imgs = [];
        if (res.data.length > 0) {
          res.data.forEach((item, index) => {
            var_this.imgs.push(
              `/upload/showImgByName?rowKey=${item.frameId}&facePosi=${
                item.facePosi ? item.facePosi : ""
              }&bodyPosi=${item.bodyPosi ? item.bodyPosi : ""}`
            );
          });
          // console.log('img',this.imgs)
          this.playVideo(this.imgs, "videoImg");
        }
      });
    },
    goToPersonTrack() {
      this.$router.push({
        name: "personTrack",
        query: { faceId: this.faceUId }
      });
    }
  }
};
</script>
