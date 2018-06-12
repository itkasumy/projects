<template>
  <div id="map" class="ps-container">
    <el-main id="person-spread">
      <div id="allmap">
        <!-- canvas地图 -->
        <div class="cvCont" :class="{active: cvState.grabbing}" ref="cvCont">
          <canvas id="cv" ref="cv"></canvas>
          <div class="infoBox" ref="infoBox" v-show="showInfoList">
            <ul class="squarePointCt">
              <li class="squarePoint"></li>
              <li class="squarePoint"></li>
              <li class="squarePoint"></li>
              <li class="squarePoint"></li>
            </ul>
            <ul class="personList">
              <li v-for="o of 5" :key="o" @click="showInfoDetail(o)"><img src="../../assets/images/headexample.jpg" alt=""></li>
            </ul>
            <span class="close" @click="closeInfoList"></span>
          </div>
          <div
            class="normalPasserBy"
            :class="{
              'lv1': item.length > 1 && item.length < 6,
              'lv2': item.length > 5 && item.length < 13,
              'lv3': item.length > 12 && item.length < 56,
              'lv4': item.length > 55,
              'people_focus': item.onFocus
            }"
            :style="{
              left: `${item.lat}px`,
              top: `${item.lng}px`
            }"
            v-for="(item, index) in people"
            :key="index"
            @click="showInfo(index, $event)"
          >{{item.length > 1 ? item.length : ''}}</div>
          <div
            class="policeOfficer"
            :style="{
              left: `${item.lat}px`,
              top: `${item.lng}px`
            }"
            v-for="(item, index) in people"
            :key="index"
            @click="showInfo(index, $event)"
          ></div>
          <div
            class="keyPerson"
            :style="{
              left: `${item.lat}px`,
              top: `${item.lng}px`
            }"
            v-for="(item, index) in people"
            :key="index"
            @click="showInfo(index, $event)"
          ></div>
        </div>
      </div>

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
      <!-- 右侧边 -->
      <div id="rightMaskId" class="rightMask" v-show="isRightShow">
        <img src="../../assets/images/index_close.png" style="width:30px;position:absolute;top:0;right:46px;" @click="hideRight">
        <img src="../../assets/images/round_btn.png" style="width:50px;position:absolute;right:440px;top:46px;">
        <div :class="isSelect?'launch topMsg':'fold topMsg'">
          <div class="baseMsg">
            <ul class="leftText">
              <li class="typeText">人员类别</li>
              <li class="typeText">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</li>
              <li class="typeText">身份证号</li>
              <li class="typeText">住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</li>
            </ul>
            <ul class="rightText">
              <li class="typeText">{{showTypeName?showTypeName:'未知'}}</li>
              <li class="typeText">{{name?name.length>10?name.substring(0,10)+"...":name:'未知'}}</li>
              <li class="typeText">{{identityCard?identityCard:'未知'}}</li>
              <li class="typeText">{{address?address.length>10?address.substring(0,10)+"...":address:'未知'}}</li>
            </ul>
            <img :src="baseImg" style="width:100px;height:100px;margin-left:10px;margin-top:20px;">
          </div>
          <div @click="addBg()">
            <img src="../../assets/images/moreInfo.png" v-if="isUpShow" class="moreInfo fl">
            <img src="../../assets/images/moreInfo_up.png" v-if="!isUpShow" class="moreInfo fl">
          </div>

          <div class="baseMsg" v-if="!isUpShow">
            <div class="divider"><i></i></div>
            <ul class="leftDetailText">
              <li class="typeText">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源</li>
              <li class="typeText">代&nbsp;&nbsp;用&nbsp;&nbsp;名</li>
              <li class="typeText">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</li>
              <li class="typeText">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</li>
              <li class="typeText">手&nbsp;&nbsp;机&nbsp;&nbsp;号</li>
              <li class="typeText" v-show="phone2">手&nbsp;&nbsp;机&nbsp;&nbsp;号</li>
              <li class="typeText" v-show="phone3">手&nbsp;&nbsp;机&nbsp;&nbsp;号</li>
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
            <img :src="detailImg" style="width:100px;height:100px;margin-left:10px;">
            <img src="../../assets/images/index_switchLeft.png" style="width:30px;position:absolute;right:334px;top:100px;" v-show="leftSwitchEnable" @click="switchToLeft">
            <img src="../../assets/images/index_switchRight.png" style="width:30px;position:absolute;right:-14px;top:100px;" v-show="rightSwitchEnable" @click="switchToRight">
          </div>
          <div v-show="isSelect"></div>
        </div>
        <div class="midMsg">
          <canvas class="fl" width="380px" height="169px" style="margin-left:14px;margin-top:26px;" id="videoImg"></canvas>
        </div>
        <div class="butMsg">
          <ul class="track">
            <li style="width:100%;height:26px;">
              <img class="fr" src="../../assets/images/index_btn-moreTreva.png" style="margin:2px;" @click="goToPersonTrack">
              <span class="fl" style="padding-left:20px;text-align:start;padding-top:5px;color:#74fdf6;font-size:12px;">最近10条轨迹</span>
            </li>
            <li class="fl tentracksZero">
              <span class="fl" style="color:#badddc;">{{trackItemZero.traceTime}}</span><br><span class="fl" style="color:#8ab5b4;">{{trackItemZero.adress}}</span>
            </li>
            <li class="fl tentracks" v-for="(item,index) in trackSubItems" :key="index">
              <span class="fl" style="color:#badddc;">{{item.traceTime}}</span><br><span class="fl" style="color:#8ab5b4;">{{item.adress}}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import countMsg from "../../components/countMsg.vue";
import { POLICEMEN, TRACKITEMS, imgUrls } from "./mock/mockForSpread.js";
import "../../common/js/frameAnimation.js";
import { dateFmt } from "../../common/js/utils.js";
import { createSuspectMarker } from "./js/createSuspectMarker.js";
// ------------------------canvas地图--------------------------
import { watchDrag, createPoint } from '@/common/js/silverStar'
import { pointCluster } from '@/common/js/imgClusterer'
// ------------------------canvas地图--------------------------
export default {
  data () {
    return {
      // ------------------canvas地图----------------
      cvState: {
        grabbing: false
      },
      ctx: null,
      people: [],
      showInfoList: false,
      attentionInList: [],
      // ------------------canvas地图----------------
      isSelect: false,
      result: "0",
      isUpShow: true,
      policemen: POLICEMEN,
      trackItemZero: { adress: "暂无轨迹", traceTime: dateFmt(new Date()) },
      trackSubItems: [],
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
      showDataTimer: null,
      faceUId: "",
      ani: null,
      drawTimer: null,
      baseImg: require("../../assets/images/noPhoto.png"),
      detailImg: require("../../assets/images/noPhoto.png"),
      personDetailLists: [],
      detailIndex: -1
    };
  },
  components: {
    "count-msg": countMsg
  },
  mounted() {
    this.ready();
    // --------------------canvas地图---------------
    this.ctx = watchDrag(this.$refs.cv, this.$refs.cvCont, this.cvState)
    // createPoint(this.people, this.$refs.cvCont, this.idxPeople, this.ctx, this.$refs.infoBox, this.showInfoList)
    // --------------------canvas地图---------------
  },
  beforeDestroy() {
    if (this.showDataTimer) {
      clearInterval(this.showDataTimer);
    }
    if (this.drawTimer) {
      clearInterval(this.drawTimer);
    }
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

    let arrX = [684, 778, 756, 900, 919, 1116, 1305, 1326, 1435, 1471, 1609, 1726],
        arrY = [1106, 1058, 1146, 1045, 930, 788, 762, 637, 644, 529, 428, 360]
    for (let i = 0; i < 12; i++) {
      this.people.push({
        eviceId: '2',
        deviceIp: '1',
        id: 'id',
        img: [],
        lat: arrX[i],
        lng: arrY[i],
        type: 1,
        uId: 'a54d885d-3bbd-11e8-a398-000c290d9966',
        length: Math.floor(Math.random() * 60),
        onFocus: false
      })
    }
    this.getTypeList()

    // ---------------canvas地图tempData------------
    /* const url = 'http://10.10.18.82:8083/trace/personMonitor/getPersonTrace?typeStr=1'
    this.$axios.get(url).then(res => {
      console.log(res.data)
    }) */
    // ---------------canvas地图tempData------------
  },
  methods: {
    showInfo (index, e) {
      const ctx = this.ctx
      const terminal = {lat: 0, lng: 0}
      const item = this.people[index]
      const infoBox = this.$refs.infoBox
      this.people.forEach(item => item.onFocus = false)
      item.onFocus = true
      this.showInfoList = true
      ctx.save()
      ctx.clearRect(0, 0, 2880, 1620)
      ctx.beginPath()
      ctx.strokeStyle = 'yellow'
      ctx.lineWidth = 4
      ctx.moveTo(item.lat, item.lng)
      if (e.clientX > (226 + 1682 / 2) && e.clientY < (100 + 904 / 2)) {
        // 视口第一象限范围
        ctx.lineTo(item.lat - 36, item.lng + 36)
        terminal.lat = item.lat - 100
        terminal.lng = item.lng + 36
        ctx.lineTo(terminal.lat, terminal.lng)
        infoBox.style.left = `${terminal.lat - 232}px`
        infoBox.style.top = `${terminal.lng}px`
      } else if (e.clientX < (226 + 1682 / 2) && e.clientY < (100 + 904 / 2)) {
        // 视口第二象限范围
        ctx.lineTo(item.lat + 36, item.lng + 36)
        terminal.lat = item.lat + 100
        terminal.lng = item.lng + 36
        ctx.lineTo(terminal.lat, terminal.lng)
        infoBox.style.left = `${terminal.lat}px`
        infoBox.style.top = `${terminal.lng}px`
      } else  if (e.clientX < (226 + 1682 / 2) && e.clientY > (100 + 904 / 2)) {
        // 视口第三象限范围
        ctx.lineTo(item.lat + 36, item.lng - 36)
        terminal.lat = item.lat + 100
        terminal.lng = item.lng - 36
        ctx.lineTo(terminal.lat, terminal.lng)
        infoBox.style.left = `${terminal.lat}px`
        infoBox.style.top = `${terminal.lng - 246}px`
      } else if (e.clientX > (226 + 1682 / 2) && e.clientY > (100 + 904 / 2)) {
        // 视口第四象限范围
        ctx.lineTo(item.lat - 36, item.lng - 36)
        terminal.lat = item.lat - 100
        terminal.lng = item.lng - 36
        ctx.lineTo(terminal.lat, terminal.lng)
        infoBox.style.left = `${terminal.lat - 232}px`
        infoBox.style.top = `${terminal.lng - 246}px`
      }
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    },
    showInfoDetail (item) {
      this.isRightShow = true
    },
    closeInfoList () {
      this.showInfoList = false
      this.people.forEach(item => item.onFocus = false)
      this.ctx.clearRect(0, 0, 2880, 1620)
    },
    getTypeList (type = 3) {
      this.$axios.get(`/trace/personMonitor/getPersonTrace?typeStr=${type}`)
      .then(data => {
        console.log(data.data)
        if (data.data.length > 0) {
          const b = pointCluster(data.data)
          console.log(b)
        }
      })
      .catch(err => {})
    },
    hideRight() {
      this.isRightShow = false;
    },
    changeSuspectSelection() {
      if (
        this.isSuspectSelectImg ==
        require("../../assets/images/index_InSelected.png")
      ) {
        this.isSuspectSelectImg = require("../../assets/images/index_selected.png");
        this.showSuspects();
      } else {
        this.isSuspectSelectImg = require("../../assets/images/index_InSelected.png");
        this.hideSuspects();
      }
    },
    changePeopleSelection() {
      if (
        this.isPeopleSelectImg ==
        require("../../assets/images/index_InSelected.png")
      ) {
        this.isPeopleSelectImg = require("../../assets/images/index_selected.png");
        this.showPeople();
      } else {
        this.isPeopleSelectImg = require("../../assets/images/index_InSelected.png");
        this.hidePeople();
      }
    },
    changePoliceSelection() {
      if (
        this.isPoliceSelectImg ==
        require("../../assets/images/index_InSelected.png")
      ) {
        this.isPoliceSelectImg = require("../../assets/images/index_selected.png");
        this.showPolice();
      } else {
        this.isPoliceSelectImg = require("../../assets/images/index_InSelected.png");
        this.hidePolice();
      }
    },
    showSuspects() {
      this.hideSuspects();
    },
    hideSuspects() {
      if (this.suspectMarkers.length > 0) {
        this.suspectMarkers.forEach(sm => {
          sm.setMap(null);
        });
      }
      this.suspectMarkers = [];
    },
    showPeople() {
      this.hidePeople();
    },
    hidePeople() {
      if (this.peopleMarkerclusterer != null) {
        this.peopleMarkerclusterer.removeMarkers(this.peopleMarkers);
      }
      this.peopleMarkers = [];
    },
    showPolice() {
      this.hidePolice();
    },
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
        if (res.data.length > 0) {
          this.trackItemZero = res.data[0];
        }
        if (res.data.length > 1) {
          res.data.shift();
          this.trackSubItems = res.data;
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
      this.showTypeName = this.name = this.identityCard = this.address = this.source = this.aliasName = this.sex = this.typeName = this.phone1 = this.phone2 = this.phone3 = "";
      this.baseImg = this.detailImg = require("../../assets/images/noPhoto.png");
      this.leftSwitchEnable = this.rightSwitchEnable = false;
      this.personDetailLists = [];
      const url = "/info/person/getPersonBaseDetailInfoById/" + personId;
      let var_this = this;
      this.$axios.get(url).then(res => {
        let dl = res.data;
        var_this.showTypeName = "重点人员";
        var_this.name = dl.personName;
        var_this.identityCard = dl.identityCard;
        var_this.address = dl.personAddr;
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
    addBg () {
      this.isUpShow = !this.isUpShow
      this.isSelect = this.isSelect ? false : true
    },
    ready () {
      var fullscreen = require("fullscreen"),
        el = document.getElementById("map"),
        fs,
        map1 = document.getElementById("allmap"),
        ps = document.getElementById("person-spread"),
        left = document.getElementById("leftSelId"),
        right = document.getElementById("rightMaskId")
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

      this.changeSuspectSelection();
      this.changePoliceSelection();
      let var_this = this;
      this.showDataTimer = setInterval(function() {
        var_this.showDatas();
      }, 30000)
    },
    showDatas () {
      if (this.isSuspectSelectImg == require("../../assets/images/index_selected.png")) {
        this.showSuspects()
      }
      if (this.isPoliceSelectImg == require("../../assets/images/index_selected.png")) {
        this.showPolice()
      }
      if (this.isPeopleSelectImg == require("../../assets/images/index_selected.png")) {
        this.showPeople()
      }
    },
    playVideo(imgs, faceId) {
      let var_this = this;
      function play_animation(imgs, faceId) {
        if (var_this.ani) {
          var_this.ani.destroy();
        }
        var_this.ani = new frame_ani({
          canvasTargetId: faceId,
          framesUrl: imgs,
          loop: false,
          frequency: 3
        });
        var_this.ani.initialize(() => {
          var_this.ani.play();
        });
      }
      play_animation(imgs, "videoImg");
    },
    drawVideo(uId) {
      let var_this = this;
      this.getImgs(uId);
      if (this.drawTimer) {
        clearInterval(this.drawTimer);
      }
      this.drawTimer = setInterval(function() {
        var_this.getImgs(uId);
      }, 60000);
    },
    getImgs(uId) {
      const url = "/trace/personTrace/getRealPersonTraceById?faceId=" + uId;
      this.$axios({
        method: "get",
        url: url
      }).then(res => {
        if (res.data[0].length > 0) {
          res.data[0].forEach((item, index) => {
            this.imgs.push(
              `/upload/showImgPath?path=` + item.filePath + `&moudle=trace`
            );
          });
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

<style style lang="scss">
@import "../../common/css/fiMixin.scss";
// ------------------------canvas地图---------------
#allmap {
  position: relative;
  overflow: hidden;
  .cvCont {
    position: absolute;
    width: 2880px;
    height: 1620px;
    top: -410px;
    left: -220px;
    background: url("../../assets/images/silverStar.png") no-repeat;
    cursor: -webkit-grab;
    &.active {
      cursor: -webkit-grabbing;
    }
    #cv {
      display: block;
    }
    .normalPasserBy {
      position: absolute;
      @include setNumBg(19px, "/static/images/index_people.png");
      &.people_focus {
        @include setNumBg(88px, "/static/images/people_focus.png"); 
      }
      text-align: center;
      transform: translate(-50%, -50%);
      color: rgb(161, 142, 0);
      cursor: pointer;
      z-index: 1;
      &.lv1 {
        @include setNumBg(24px, "/static/images/m1.png");
        &.people_focus {
          @include setNumBg(88px, "/static/images/people_focus.png");
        }
      }
      &.lv2 {
        @include setNumBg(34px, "/static/images/m2.png");
        &.people_focus {
          @include setNumBg(88px, "/static/images/people_focus.png");
        }
      }
      &.lv3 {
        @include setNumBg(44px, "/static/images/m3.png");
        &.people_focus {
          @include setNumBg(88px, "/static/images/people_focus.png");
        }
      }
      &.lv4 {
        @include setNumBg(54px, "/static/images/m4.png");
        &.people_focus {
          @include setNumBg(88px, "/static/images/people_focus.png");
        }
      }
    }
    .policeOfficer {
      position: absolute;
      @include setNumBg(19px, "/static/images/index_police.png");
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    .keyPerson {
      position: absolute;
      @include setNumBg(19px, "/static/images/index_suspect.png");
      transform: translate(-50%, -50%);
      cursor: pointer;
      z-index: 1;
    }
    .infoBox {
      position: absolute;
      box-sizing: border-box;
      width: 232px;
      height: 246px;
      padding: 7px;
      background: rgba(0, 0, 0, .3);
      border: 1px solid yellow;
      box-shadow: 0 0 10px yellow;
      z-index: 2;
      .squarePointCt {
        margin: 0;
        padding: 0;
        .squarePoint {
          position: absolute;
          width: 6px;
          height: 6px;
          background: yellow;
          &:nth-child(1) {
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
          }
          &:nth-child(2) {
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
          }
          &:nth-child(3) {
            bottom: 0;
            right: 0;
            transform: translate(50%, 50%);
          }
          &:nth-child(4) {
            bottom: 0;
            left: 0;
            transform: translate(-50%, 50%);
          }
        }
      }
      .personList {
        width: 216px;
        height: 230px;
        margin: 0;
        padding: 0;
        overflow-y: scroll;
        li {
          float: left;
          width: 70px;
          height: 70px;
          background: #058;
          margin-right: 3px;
          margin-bottom: 3px;
          cursor: pointer;
          &:nth-child(3n) {
            margin: 0;
          }
          img {
            display: block;
            width: 70px;
            height: 70px;
          }
        }
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        @include setNumBg(18px, "/static/images/close-tip-icon.png");
        background-size: 18px 18px;
        cursor: pointer;
        transform: translate(50%, -50%);
      }
    }
  }
}

// ------------------------canvas地图---------------
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
  .white {
    color: #fff;
    font-size: 12px;
  }
  .typeText {
    color: #dceded;
  }
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
  .leftkMask {
    width: 271px;
    height: 770px;
    background: url("../../assets/images/index-policeInfo-bg.png") no-repeat;
    position: absolute;
    left: 26px;
    top: 100px;
    // 顶部
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
