<template>
<div class="police-duty" id="police-duty">
  <el-main  class="police-duty-body" id="police-duty-body">
    <div id="allmap"></div>
    <!-- 地图上的东西 -->
    <div class="police-duty-right">
        <el-button @click="changeType" class="police-duty-right-but" >.</el-button>
    </div>
    <!-- 底部警员列表-->
    <div class="police-duty-bottom swiper-container" id="police-duty-bottom">
      <div class="swiper-wrapper">
        <div class="police-duty-bottom-content swiper-slide police-item" v-for="(value, index) in policeList" :key="index" @click="eSelectPolice(value)">
          <!-- <div class="police-duty-policeList-back" :class="{active: value.policeId == selectPoliceId, 'swiper-no-swiping': policeList.length < 9 }"> -->
          <div class="police-duty-policeList-back" :class="{active: value.policeId == selectPoliceId}">
            <div class="police-duty-policeList-content">
              <ul>
                <li class= "police-duty-policeList-name text-over" :title="value.policeName">{{value.policeName}}</li>
                <li class= "police-duty-policeList-other text-over" :title="value.level.levelName">{{value.level.levelName}}</li>
                <li class= "police-duty-policeList-other text-over" :title="value.policeNo">{{value.policeNo}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-show="policeList.length>9" class="swiper-button-next police-list-navigator"><img class="prev" src="../../assets/images/helmetSlider_right.png"/></div>
      <div v-show="policeList.length>9" class="swiper-button-prev police-list-navigator"><img class="prev" src="../../assets/images/helmetSlider_left.png"/></div>   
    </div>
    <!-- 历史监控页面 -->
    <div class="history-record" v-show="!isShow">
      <!-- 搜索 -->
      <div style="margin:0px 50px 15px 50px" >
        <div class="btn" style="float:left" @click="eToBack"></div> 
        <div class="search-right">
          <ul>
            <li class="right-input">
              <el-input size="small" v-model="input"  @input="inputChange" :clearable="true" @clear="inputChange" placeholder="请输入警员姓名" :maxlength ="16"></el-input>
            </li>
            <li class="date">
              <el-date-picker
                v-model="date"
                type="datetimerange"
                :editable="false"
                size="mini"
                popper-class="police-duty-fs-datepicker"
                :time-arrow-control="true"
                @change="eSelectDateRange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                prefix-icon="el-icon-date"
                :appendToBody="false"
                align="left">
              </el-date-picker>
            </li>
            <li class="right-select">
              <el-select 
              v-model="selectValue"   
              @change="selectChange"
              size="small"
              :popper-append-to-body="false"
              placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
      </div>

      <!-- 整个记录列表 -->
      <div class="duty-record-label" v-for="(value, index) in recodeList" :key="index">
        <!-- 左边警员信息 -->
        <div>
          <div class="duty-record-name" >
            <ul>
              <li class="police-duty-policeList-name text-over" :title="value.policeName">{{value.policeName}}</li>
              <li class="police-duty-policeList-other">{{value.levelName}}</li>
              <li class="police-duty-policeList-other">{{value.policeNo}}</li>
            </ul> 
          </div>
        </div>

        <!-- swiper 记录列表 -->
        <div class="swiper-container history-record-swiper" >
          <div class="swiper-wrapper">
            <div class="swiper-slide label" :class="{'swiper-no-swiping': value.papersList.length < 3 }" v-for="(item, index) in value.papersList"  :key="index">
              <div class="duty-record-list-back">
                <!-- 四种识别方式，各自展示结构不相同，人脸识别需要再用swipper进行包装 -->
                <!-- 识别身份证 -->
                <div v-if="item.papersType=='1'">
                  <div style="margin-right:5px;font:14px bold;color:#7bfafd">识别身份证</div>
                  <div class="duty-id-card-body clearfix" >
                    <div class="duty-id-card-content">
                      <ul class="clearfix">
                        <li class="clearfix mr26"><span class="fl">姓</span><span class="fr">名</span></li>
                        <li class="value person-name fl">{{item.name||"未知"}}</li>
                      </ul>
                      <ul class="clearfix">
                        <li class="clearfix mr26"><span class="fl">性</span><span class="fr">别</span></li>
                        <li class="value">{{item.sex||"未知"}}</li>
                        <li class="sp">
                          <div class="fl" style="margin-right: 16px;">民族</div>
                          <div class="fl value">{{item.nation||"未知"}}</div>
                        </li>
                      </ul>
                      <ul class="clearfix">
                        <li class="clearfix mr26"><span class="fl">出</span><span class="fr">生</span></li>
                        <li class="value">{{item.birth? (item.birth.slice(0, 4)+'&nbsp;年&nbsp;' + item.birth.slice(5, 7) +'&nbsp;月&nbsp;'+item.birth.slice(8, 9) +'&nbsp;日') : '未知'}}</li>
                      </ul>
                      <ul class="clearfix">
                        <li class="clearfix mr26"><span class="fl">籍</span><span class="fr">贯</span></li>
                        <li class="value address fl">{{item.home ||"未知"}}</li>
                      </ul>
                    </div>
                    <div>
                      <img :src="'/upload/showImgByName?id='+item.uploadId+'&moudle=trace'"  width="87" height="102" class="duty-id-card-img">
                    </div>
                  </div>
                  <div class="duty-id-card-num">
                    <div>
                      <span class="title">身份证号码</span>
                      <span class="value">{{item.sfzCard ||"未知"}}</span>
                    </div>
                  </div>
                  <div class="duty-id-card-addr bottom-icon-text">
                    <ul class="clearfix">
                      <li><img :src="iAddr"/>位置</li>
                      <li :title="item.location">{{item.location||"未知"}}</li>
                    </ul>
                    <ul>
                      <li><img :src="iTime"/>时间</li>
                      <li>{{dateToString(item.discernTime)}}</li>
                    </ul>
                  </div>
                </div>
                <!--识别驾驶证  -->
                <div v-if="item.papersType=='2'">
                  <div style="margin-right:4px font-weight: bold;color:#7bfafd">识别驾驶证</div>
                  <div class="duty-driver-license-body" >
                    <ul class="one clearfix">
                      <li><span>姓名</span><span>{{item.name ||"未知"}}</span></li>
                      <li><span>性别</span><span>{{item.sex||"未知"}}</span></li>
                      <li><span>国籍</span><span>{{item.nationality||"未知"}}</span></li>
                    </ul>
                    <ul class="two">
                      <!-- 过长保护 -->
                      <li class="clearfix"><span class="fl">籍贯</span><span class="fl">广东省深圳是广东省深圳是广东
                        省深圳是深圳是</span></li>
                      <li><span>出生日期</span><span>{{item.birth || '未知'}}</span></li>
                      <li><span>初次领证日期</span><span>{{item.firstDriveTime|| '未知'}}</span></li>
                      <li><span>准驾车型</span><span>{{item.driverType|| '未知'}}</span></li>
                      <li><span>有效期</span><span>{{item.jzStartDate|| '未知'}}&nbsp;至&nbsp;{{item.jzEndDate|| '未知'}}</span></li>
                    </ul>
                    <img :src="'/upload/showImg?id='+item.uploadId+'&moudle=trace'" width="68" height="80" class="duty-car-img">
                  </div>
                  <div class="duty-id-card-addr bottom-icon-text">
                    <ul class="clearfix">
                      <li><img :src="iAddr"/>位置</li>
                      <li :title="item.location">{{item.location||"未知"}}</li>
                    </ul>
                    <ul>
                      <li><img :src="iTime"/>时间</li>
                      <li>{{item.discernTime ? dateToString(item.discernTime): '未知'}}</li>
                    </ul>
                  </div>
                </div>
                  <!--识别车牌  -->
                <div v-if="item.papersType=='3'">
                  <div style="margin-right:5px font-weight:bold;color:#7bfafd">识别车牌</div>
                  <div class="duty-plate-num-body" >
                    <div class="duty-plate-num-top">
                      <div>
                        <span>车牌颜色</span><span>{{item.carNumcolor || '未知'}}</span>
                      </div>
                      <div class="sp">
                        <span>车牌号</span>
                        <span>{{item.carNum || '未知'}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="duty-id-card-addr bottom-icon-text">
                    <ul class="clearfix">
                      <li><img :src="iAddr"/>位置</li>
                      <li :title="item.location">{{item.location||"未知"}}</li>
                    </ul>
                    <ul>
                      <li><img :src="iTime"/>时间</li>
                      <li>{{item.discernTime ? dateToString(item.discernTime): '未知'}}</li>
                    </ul>
                  </div>
                </div>
                  <!--识别人脸  -->
                <div v-if="item.papersType=='0'">
                  <div style="margin-right:5px; font-weight: bold;color:#7bfafd">识别人脸</div>
                  <div class="duty-face-body" :class="{nofill: item.pictureList.length <= 3}">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="(o, index) in item.pictureList" :key="index">
                        <img width="87" height="102" :src="'/upload/showImg?id='+o.upId+'&moudle=trace'" />
                        <!-- <img width="87" height="102" :src="'/upload/showImg?id=152a8d72-3bf0-11e8-a398-000c290d9966&moudle=trace'" /> -->
                        <div class="person-name" style="margin-top: -4px;">{{o.personName || '未知'}}</div>
                      </div>
                    </div>
                    <div v-if="item.pictureList.length>3" class="s-next"><img class="prev" src="../../assets/images/helmetSlider_right.png"/></div>
                    <div v-if="item.pictureList.length>3" class="s-prev"><img class="next" src="../../assets/images/helmetSlider_left.png"/></div>
                  </div>
                  <div class="duty-face-bot clearfix bottom-icon-text">
                    <ul class="clearfix">
                      <li><img :src="iAddr"/>位置</li>
                      <li :title="item.location">{{item.location||"未知"}}</li>
                    </ul>
                    <ul>
                      <li><img :src="iTime"/>时间</li>
                      <li>{{item.discernTime ? dateToString(item.discernTime): '未知'}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>               
          </div>
          <div v-show="value.papersList.length>3" class="swiper-button-next"><img class="prev" src="../../assets/images/helmetSlider_right.png"/></div>
          <div v-show="value.papersList.length>3" class="swiper-button-prev"><img class="prev" src="../../assets/images/helmetSlider_left.png"/></div>   
        </div>
      </div>
      <div class="duty-record-label empty-record" v-if="!recodeList.length">暂无数据</div>
    </div>
  </el-main>
</div>
</template>
<script >
import { createMap } from "../../common/js/createMap.js";
import { createHelmetView } from "./js/createHelmetView.js";
import countMsg from "../../components/countMsg.vue";
import { dateFmt } from "../../common/js/utils.js";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import {errorException, successTip, errorTip, confirmModal} from '../intelligence/js/tip'
import {addClass, removeClass, debounce, hasClass} from '../intelligence/js/utils'
import "videojs-flash"
export default {
  data() {
    return {
      map: null,
      isShow: true,

      input: "",
      url: "10.12.26.184:8086",
      date: [new Date(new Date() - 3600 * 1000 * 24), new Date()],
      recodeList: [],
      policeList: [],
      mySwiper: null,
      listLen: 1,
      iAddr: require("../../assets/images/helmet-location.png"),
      iTime: require("../../assets/images/helmet-time.png"),
      options: [
        { value: '', label: '全部识别' },
        { value: "0", label: "人脸识别" },
        { value: "1", label: "身份证识别" },
        { value: "2", label: "驾驶证识别" },
        { value: "3", label: "车牌识别" }
      ],
      selectValue: "",
      selectPoliceId: '',
      marker: null,
      policeSwiper: null,
      policeIdList: [],
      intervalTimer: null,
      silverStarLatLng: {lat: 22.725251909880058, lng: 114.04298096688001}
    };
  },
  watch: {
    // 移动swiper
    selectPoliceId() {
      let index = this.policeIdList.indexOf(this.selectPoliceId)
      this.policeSwiper && this.policeSwiper.slideTo(index, 500)
    },
    policeIdList() {
      let index = this.policeIdList.indexOf(this.selectPoliceId)
      this.policeSwiper && this.policeSwiper.slideTo(index, 500)
    }
  },
  created() {
    this.getRecodeList();
  },
  beforeDestroy(){ clearInterval(this.intervalTimer) },

  mounted() {
    this.ready();
    this.getDutyPolice();
    this.getpDutyLabelMsg();
    this.intervalTimer = setInterval((  )=>{
      this.getpDutyLabelMsg();
    }, 60 * 1000)
    setTimeout(() => this.__fs(), 0);
  },
  methods: {
    __fs() {
      let fullscree, el, fs, map1, ps, emitter
      this.$root.Bus.$on('fullScreen',value => {
        fullscree = fullscree || require('fullscreen')
        el = el || document.getElementById('police-duty')
        map1 = map1 || document.getElementById('allmap')
        ps = ps || document.getElementById('police-duty-body')
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
    ready() {
      this.map = createMap("allmap", 19, this.silverStarLatLng)
      createHelmetView(this.map, this.silverStarLatLng, [])
      setTimeout(() => {
        if ( $('#example_video_1')[0] ) {
          var player = videojs('#example_video_1',{
            techOrder: ["flash","html5"],
            autoplay: true,
            mydata: {
              username: 'xiaoming'
            },
            controlBar: {
              volumeMenuButton:false
            },
            sources: [
              {src: 'http://192.168.0.67:20000/hls/test.m3u8', type: 'rtmp/flv'}
            ]
          },function(){});
        }
      }, 2000);
    },
    // 地图上的放射状-采用轮询的方式实现实时更新
    getpDutyLabelMsg() {
      const url = this.url + '/helmet/papers/getPapersByPolice?timestamp=' + new Date().getTime() + '&policeId=';
      this.$axios({
        method: "get",
        url: url,
        data: {}
      })
        .then(data => {
          data = data.data
          console.log( data, 'jinyue....' )
          this.selectPoliceId = data.policeId
          data.papersList[0].policeName = data.policeName

          let lat = data.papersList[0].lat
          let lng = data.papersList[0].lng
          this.marker && this.marker.setMap(null)
          this.map && this.map.setCenter({lat: lat - 0.001, lng: lng + 0.0027 })
          this.marker = createHelmetView(this.map, { lat: lat, lng: lng }, data.papersList[0]);

          this.$nextTick((  )=>{
            var timer = setInterval((  )=>{
              // if ( $('#helmetLiveVideo')[0] ) {
              if ( $('#example_video_1')[0] ) {

                var player = videojs('#example_video_1',{
                  techOrder: ["flash","html5"],
                  autoplay: true,
                  mydata: {
                    username: 'xiaoming'
                  },
                  controlBar: {
                    volumeMenuButton:false
                  },
                  sources: [
                    {src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks', type: 'rtmp/flv'}
                  ]
                },function(){});

                clearInterval(timer)
              }
            }, 1000)
            setTimeout(() => {
              clearInterval(timer)
            }, 10000);
          })
          
          setTimeout(() => {
            // 等待marker绘制完毕
            this.$nextTick(() => {
              var mySwiper2 = new Swiper(".duty-face-body-infobox", {
                slidesPerView: 'auto',
                spaceBetween: 0,
                loop: false,
                observer: true,
                noSwiping: true,
                observeParents: true,
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }
              });
            });
          }, 100);
        })
         .catch( e => this.mCatchException(e) )
    },
    // 警员列表
    getDutyPolice() {
      const url = this.url + '/helmet/papers/getPoliceDeviceList'
      this.$axios({
        method: "get",
        url: url,
        data: {}
      })
        .then(data => {
          this.policeList = [];
          this.policeIdList = []
          this.policeList = data.data;
          
          this.$nextTick(() => {
            this.policeSwiper = new Swiper("#police-duty-bottom", {
              slidesPerView: 'auto',
              spaceBetween: 0,
              loop: false,
              observer: true,
              noSwiping: true,
              observeParents: true,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
              }
            });
            data.data.forEach(( v, i )=>{
              this.policeIdList.push(v.policeId)
            })
          })
        })
       .catch( e => this.mCatchException(e) )
    },
    // 历史监控列表
    getRecodeList() {
      let temp = { policeName: this.input, PapersType: this.selectValue };
      this.date && (temp.startTime = this.date[0].getTime());
      this.date && (temp.endTime = this.date[1].getTime());
      this.$axios({
        method: "post",
        url: this.url + "/helmet/papers/getPapersList",
        params: temp
      })
        .then(res => {
          this.recodeList = [];
          // res.data[0].papersList = res.data[0].papersList.concat(res.data[0].papersList)
          this.recodeList = res.data;
          this.listLen = res.data.length;
          let _this = this;
          let uploadId = '072283ad37744dc7b970f1bf62224a9e'

        //  this.$axios.get( "http://10.10.18.42:8089/upload/fileAttFiles?uploadId=" + uploadId).then(res => {
        //    console.log( res, 123 )
        //       // if(res.data.length > 0){
        //       //   d.img = "/upload/showImg?id="+res.data[0].id;
        //       // }else{
        //       //   d.img = require('../../assets/images/noPhoto.png');
        //       // }
        //       // this.tableLists[person.expandRow].tableExpandLists.push(d);
        //     });


          this.$nextTick(() => {
            var mySwiper = new Swiper(".history-record-swiper", {
              slidesPerView: 'auto',
              spaceBetween: 0,
              loop: false,
              observer: true,
              noSwiping: true,
              observeParents: true,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
              }
            });

            // 人脸识别多张图片还是使用swiper
            var mySwiper1 = new Swiper(".duty-face-body", {
              slidesPerView: 3,
              spaceBetween: 0,
              nested: true,// swiper嵌套问题
              allowTouchMove: false,//
              loop: false,
              observer: true,
              observeParents: true,
              navigation: {
                nextEl: ".s-next",
                prevEl: ".s-prev"
              }, 
              on: {
                reachEnd: function() {
                  _this.$nextTick(() => {// 修改指示器样式
                    hasClass(this.navigation.prevEl, 'swiper-button-disabled') && $('.s-next').removeClass('swiper-button-disabled')
                  })
                }
              }
            });
          });
        })
        .catch( e => this.mCatchException(e) )
    },
    eSelectPolice(item) {},
    // 切换状态
    changeType() {
      this.isShow = !this.isShow;
    },
    eToBack() {
      this.isShow = !this.isShow;
    },
    eSelectDateRange() {
      this.getRecodeList();
    },
    inputChange() {
      this.debounce(this.getRecodeList)
    },
    selectChange() {
      this.getRecodeList();
    },
    dateToString(o) {
      return dateFmt(o);
    },
    debounce(fn){
      debounce(fn, this, 300, ...[].slice.call(arguments, 1))
    },
    mCatchException(e, nocatchDesc = '请检查您到网络是否异常！'){
      return errorException(this, e, nocatchDesc)
    },
  }
};
</script>


<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.police-duty-fs-datepicker {
  z-index: 999999999999999999 !important;
}

#police-duty.elAdd {// 被全屏的元素
  width:100%;
  height:100%;
  position: relative;
  >main {
    padding-top: 50px;
    padding-bottom: 8px;
    border: none;
    // 左下角
    &::before {
      content: '';
      height: 70px;
      width: 70px;
      position: absolute;
      bottom: -1px;
      left: 0px;
      z-index: 99999;
      background: url("../../assets/images/fullScreen_bg.png") no-repeat bottom left;
      clip-path: polygon(0px 0px, 0px 70px, 72px 84px);
    }
    // 右下角
    &::after {
       content: '';
        height: 180px;
        width: 180px;
        position: absolute;
        bottom: -1px;
        right: 0px;
        z-index: 99999;
        background: url("../../assets/images/fullScreen_bg.png") no-repeat bottom right;
        clip-path: polygon(201px 0px, 180px 180px, 0 194px);
      
    }
    #allmap {
      &::before {
        content: '';
        height: 61px;
        width: 61px;
        position: absolute;
        top: -4px;
        right: -1px;
        z-index: 99999;
        background: url("../../assets/images/fullScreen_bg.png") no-repeat top right;
        background-position-y: -47px;
        clip-path: polygon(0px 0px, 70px 0px, 69px 81px);
      }
    }
  }
  // 左边，右边
  &::after, &::before {
    content: '';
    width: 10px;
    position: absolute;
    top: 1px;
    bottom: 0;
    background: url("../../assets/images/fullScreen_bg.png") no-repeat;
    z-index: 999;
  }
  &::after {
    left: 0;
  }
  &::before {
    background-position: top right;
    top: 1px;
    right: 0;
  }
  .police-duty-right {
    top: 70px;
  }
  .history-record {
    left: 10px;
    top: 51px;
    right: 10px;
    bottom: 9px;
    background-repeat: repeat;
  }
}
#police-duty-body.psAdd{
  margin:0;
  width:100%;
  height: 100%;
  padding-bottom: 8px;
  background: url("../../assets/images/fullScreen_bg.png") no-repeat;
}
#police-duty.elAdd {
  margin:0;
  width:100%;
  height: 100%;
  margin-bottom: 0;
  padding-bottom: 0;
  background: url("../../assets/images/fullScreen_bg.png") no-repeat;
}
.police-duty.elAdd {
  #allmap.mapAdd{
    clip-path: unset;
    -webkit-clip-path: unset;
  }
}
.police-duty {
  .hideEl {
    visibility: hidden;
    z-index: -1;
  }
}
.swiper-slide {
  color: white;
}
.police-duty {
  .empty-record {
    text-align: center;
    color: #64d4ec;
    font-size: 14px;
    line-height: 200px;
    justify-content: center;
  }
}
.police-duty {
  input::-webkit-input-placeholder {
    color: rgb(140, 213, 235) !important;
  }
  input::-moz-input-placeholder {
    color: rgb(140, 213, 235) !important;
  }
  input::-ms-input-placeholder {
    color: rgb(140, 213, 235) !important;
  }
  .el-date-range-picker {
    left: -140px !important;
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
  .label {
    width: 380px !important;
  }
  .police-item {
    width: 124px;
    height: 124px;
  }
  .police-list-navigator {
    width: 30px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
    }
    &.swiper-button-next {
      margin-top: -16px;
      background-image: none !important;
      margin-right: -8px;
    }
     &.swiper-button-prev {
      background-image: none !important;
      margin-top: -16px;
      margin-left: -10px;
    }
  }
  .history-record {
    &.el-hide {
      visibility: hidden;
    }
    position: absolute;
    top: 0px;
    left: 11px;
    right: 11px;
    bottom: 0px;
    padding-top: 20px;
    background: url(/static/images/right_bg.png) repeat;
    border-radius: 5px;
    z-index: 999;
    overflow: scroll;
    .swiper-container {
      margin: 10px 70px 0 45px;
      .swiper-button-next, .swiper-button-prev {
        background-image: none !important;
        margin-top: -39px;
      }
      .swiper-button-next {
        margin-right: 20px;
      }
    }
  }
  .bottom-icon-text {
    position: absolute;
    left: 20px;
    bottom: 34px;
    ul {
      font-size: 12px;
      padding-top: 4px;
      li {
        float: left;
        padding-right: 14px;
        &:last-child {
          text-align: left;
          width: 280px;
        }
        img {
          vertical-align: text-top;
        }
      }
    }
    img {
      vertical-align: text-top;
      padding-right: 2px;
    }
  }
}
.police-duty {
  .search-right {
    float: right;
    ul {
      list-style: none;
    }
    ul li {
      display: block;
      float: left;
      text-align: left;
    }
  }
  .right-input {
    background-image: url("../../assets/images/readRecard-search.png");
    width: 145px;
    height: 45px;
    .el-input__inner {
      background-color: transparent;
      border: 0px;
      color: #e2f5ff;
      text-indent: 10px;
      padding-top: 6px;
      height: 40px
    }
  }
  .right-select {
    background-image: url("../../assets/images/readRecard-search.png");
    width: 145px;
    height: 45px;
    .el-input__inner {
      background-color: transparent;
      border: 0px;
      color: #e2f5ff;
      text-indent: 10px;
      padding-top: 5px;
      height: 40px
    }
    .el-input__icon {
      margin-right: 12px;
    }
  }
  .date {
    margin-left: 5px;
    background-image: url("../../assets/images/readRecard-time.png");
    padding: 10px;
    padding-top: 8px;
    width: 330px;
    box-sizing: border-box;
    .el-date-editor {
      background-color: transparent;
      border: none;
      width: 100%;
      .el-range-input {
        background-color: transparent;
        color: #e2f5ff;
        width: inherit;
      }
      .el-range-separator {
        border-radius: 50%;
        font-size: 12px;
        line-height: 22px;
        padding: 0 3px;
        height: 20px;
        background-color: rgb(56, 190, 227);
        color: rgb(0, 113, 144);
      }
      .el-range__icon {
        color: rgb(31, 173, 197);
        margin-left: 4px;
      }
      .el-range__close-icon {
        position: absolute;
        right: -4px;
      }
    }
  }
  .btn {
    width: 116px;
    height: 54px;
    cursor: pointer;
    background-image: url("../../assets/images/chart_btn_before.png");
    background-position: center center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-1px);
    }
  }
  .duty-record-list-back {
    width: 380px;
    height: 234px;
    background: url("../../assets/images/readRecard-contentBg.png") no-repeat;
    //身份证
    .duty-id-card-content {
      float: left;
      margin-left: 20px;
      margin-top: 2px;
      ul {
        list-style: none;
        padding: 3px 0;
        width: 220px;
        border-top: 0px;
        font-size: 14px;
      }
      .mr26 {
        margin-right: 24px;
      }
      ul li {
        display: block;
        float: left;
        text-align: left;
        color: #64d4ec;
        font-size: 12px;
        &.sp {
          float: right;
        }
      }
      .value {
        color: #ddf4ff; 
        &.address, &.person-name {
          width: 156px;
          word-break: break-all;
          word-wrap: break-word;
        }
      }
      ul li:first-child {
        width: 40px;
      }
    }
    .duty-id-card-body {
      margin-right: 40px;
      margin-top: 10px;
    }
    .duty-id-card-img {
      position: absolute;
      right: 40px;
      top: 33px;
    }
    .duty-id-card-native {
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .duty-id-card-num {
      font-size: 12px;
      text-align: left;
      margin-left: 20px;
      margin-top: 6px;
      span.title {
        color: #64d4ec;
        padding-right: 10px;
      }
      span.value {
        color: #ddf4ff; 
        letter-spacing: 6px;
      }
    }
    //驾驶证
    .duty-driver-license-body {
      text-align: left;
      margin-left: 20px;
      margin-right: 30px;
      margin-top: 10px;
      position: relative;
      span {
        font-size: 12px;
        &:first-child {
          color: #64d4ec;
          letter-spacing: 3px;
          padding-right: 10px;
        }
        &:nth-child(2) {
          color: #ddf4ff;
          &.fl {
            width: 280px;
          }
        }
      }
      .one {
        padding: 0 0 3px 0;
        li {
          float: left;
          margin-left: 20px;
          &:first-child {
            margin-left: 0px;
            min-width: 30%;
            max-width: 60%;
          }
        }
      }
      .two {
        li {
          padding-bottom: 2px;
        }
      }
      .duty-car-img {
        position: absolute;
        right: 10px;
        top: 44px;
      }
    }
    //车牌
    .duty-plate-num-body {
      text-align: left;
      margin-left: 20px;
      margin-right: 30px;
      margin-top: 10px;
      position: relative;
      span {
        font-size: 14px;
        &:first-child {
          color: #64d4ec;
          letter-spacing: 3px;
          padding-right: 12px;
        }
        &:nth-child(2) {
          color: #ddf4ff;
          font-size: 16px;
        }
      }
      .sp {
        margin-top: 20px;
        span {
          float: left;
          line-height: 44px;
          &:nth-child(2) {
            text-align: center;
            letter-spacing: 3px;
            display: block;
            float: left;
            font-size: 20px;
            color: #dff4ff;
            width: 173px;
            background-image: url("../../assets/images/read_carNumber_bg.png");
          }
        }
      }
    }
    //人脸
    .duty-face-body {
      width: 320px;
      overflow: hidden;
      display: inline-block;
      margin-top: 15px;
      margin-left: -30px;
      .swiper-wrapper {
        position: relative;
        .person-name {
          color: #64d4ec;
        }
      }
    }
    .s-next, .s-prev {
      &.swiper-button-disabled {
        opacity: 0.5;
      }
      position: absolute;
      cursor: pointer;
      height: 24px;
      width: 24px;
      right: 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .s-next {
      top: 56px;
    }
    .s-prev {
      top: 86px;
    }
  }

  .duty-record-list-back:hover {
    background: url("../../assets/images/readRecard-contentBg-focus.png")
      no-repeat;
  }
  .police-duty-body {
    padding: 0;
    border: 1px solid #4ddcd0;
    background: url("/static/images/right_bg.png") 0 0 / 100% 100% no-repeat;
  }
  #allmap {
    height: 100%;
    width: 100%;
  }
  .police-duty-right {
    width: 100px;
    height: 50px;
    position: absolute;
    right: 80px;
    top: 30px;
    .police-duty-right-but {
      width: 140px;
      height: 55px;
      background: url("../../assets/images/helmet-btn-readList.png") no-repeat;
      border: 0px;
    }
  }
  .duty-record-label {
    width: 98%;
    height: 264px;
    margin: 20px 20px 20px 30px;
    background: url("../../assets/images/read-recard-bg.png") 0 0 / 98% 98%
      no-repeat;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    .duty-record-name {
      margin: 30px 0 0 20px;
      width: 170px;
      height: 170px;
      background: url("../../assets/images/read-recard_policeBg.png") no-repeat;
      ul {
        padding-top: 50px;
        text-align: center;
        color: rgb(124, 222, 251);
      }
      .police-duty-policeList-name {
        width: 110px;
        font-size: 16px;
        letter-spacing: 8px;
        text-indent: 8px;
        font-weight: 900;
      }
      .police-duty-policeList-other {
        font-size: 12px;
        letter-spacing: 1px;
        text-indent: 1px;
      }
    }
    .duty-record-list {
      display: flex;
      flex-direction: row;
      margin-left: 30px;
      margin-right: 45px;
      .duty-record-list-content {
        margin: 10px 0 0 15px;
      }
    }
  }
  .duty-record-label:hover {
    background: url("../../assets/images/readRecardBg-focus.png") 0 0 / 98% 98% no-repeat;
  }

  .police-duty-bottom {
    width: 65%;
    height: 185px;
    margin-left: -34% !important;
    background: url("../../assets/images/helmet-policeList-Bg1.png") no-repeat;
    position: absolute;
    background-size: 100% 100%;
    background-origin: content-box;
    border-left: 19px solid transparent;
    left: 50%;
    bottom: 5%;
    border-image: url("../../assets/images/helmet-policeList-Bg2.png") 7 23;
    .police-duty-bottom-content {
      text-align: left;
      margin: 10px 12px 0 12px;
      &:first-child {
        margin-left: 8px;
      }
      &:last-child {
        padding-right: 50px;
        margin-left: 10px;
      }
      .police-duty-policeList-back {
        cursor: pointer;
        width: 170px;
        height: 170px;
        color: white;
        background: url("../../assets/images/helmet-policeList.png") no-repeat;
        background-size: 170px 170px;
        &.active {
          background: url("../../assets/images/helmet-policeList-focus.png") no-repeat;
          background-size: 170px 170px;
          .police-duty-policeList-content {
            ul {
              color: #d8fdff;
            }
            .police-duty-policeList-name {
              font-size: 18px;
            }
            .police-duty-policeList-other {
              font-size: 14px;
            }
          }
        }
        .police-duty-policeList-content {
          ul {
            padding-top: 56px;
            text-align: center;
            color: rgb(57, 200, 209);
          }
          .police-duty-policeList-name {
            width: 85px;
            font-size: 16px;
          }
          .police-duty-policeList-other {
            width: 90px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .text-over {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

  #infobox-left-style {
    >div {
      margin-left: 0px;
      margin-top: 62px;
    }
    div.sub-title {
      position: absolute;
      left: 53%;
      top: 14px;
      font-size: 17px;
      letter-spacing: 3px;
      color: #fff;
    }
    .bottom-icon-text {
      position: absolute;
      left: 200px;
      bottom: 60px;
      color: #ddf4ff;
      li {
        &:nth-child(2) {
          width: 300px;
          word-wrap: break-word;
          word-break: break-all;
          text-align: left;
        }
      }
    }
    // 人脸
    .duty-face-body {
      margin-top: 5px;
      margin-left: 0;
      .person-name {
        margin-top: 4px;
      }
      .swiper-button-next, .swiper-button-prev {
        background-image: none;
        position: absolute;
        top: 130px;
        width: 20px;
        height: 20px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .swiper-button-prev {
        left: 196px;
      }
      .swiper-button-next {
        right: 412px;
      }
      .swiper-slide {
        width: 106px;
      }
    }
    // 身份证
    .duty-id-card-body {
      .duty-id-card-content {
        margin-top: 0;
        margin-bottom: 6px;
      }
      ul {
        padding: 4px 0;
      }
      .duty-id-card-img {
        position: absolute;
        left: 440px;
        top: 67px;
      }
    }
    //驾照
    .duty-driver-license-body {
      .one {
        padding-bottom: 9px;
      }
      .two {
        li {
          padding-bottom: 9px;
        }
      }
    }
    // 车牌
    .duty-plate-num-body {
      div {
        span {
          &:first-child {
            font-size: 14px;
          }
        }
      }
    }
    .duty-plate-num-body + .bottom-icon-text {
      bottom: 60px;
    }
    .duty-face-body ~ .bottom-icon-text {
      bottom: 44px;
    }
  }
</style>
