<template>
  <div id="map" class="ps-containe">
    <el-main id="person-sprea" style="padding: 0;">
      <div id="allma">
        <div class="cvCont" :class="{active: cvState.grabbing}" ref="cvCont">
          <canvas id="cv" ref="cv"></canvas>
          <div class="infoBox" ref="infoBox" :style="{borderColor: type === 3 ? '#ffed78' : '#f00'}" v-show="showInfoList">
            <ul class="squarePointCt">
              <li class="squarePoint" :style="{background: type === 3 ? '#ffed78' : '#f00'}"></li>
              <li class="squarePoint" :style="{background: type === 3 ? '#ffed78' : '#f00'}"></li>
              <li class="squarePoint" :style="{background: type === 3 ? '#ffed78' : '#f00'}"></li>
              <li class="squarePoint" :style="{background: type === 3 ? '#ffed78' : '#f00'}"></li>
            </ul>
            <ul class="personList">
              <li v-for="person in (type === 3 ? passerByDetailList : suspectDetailList)" :key="person.uId" @click="showInfoDetail(person.uId,person.backimg, type)">
                <img v-if="tFlag" :src="person.img||`../../../static/images/no-photo.png`" draggable="false" alt="">
                <img v-else :src="person.rowKey ?`/upload/showFaceImg?rowKey=${person.rowKey}`:'../../../static/images/no-photo.png'" draggable="false" alt="">
                <!-- <img v-else src="../../assets/images/showPeople_no.png" draggable="false" alt=""> -->
              </li>
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
              left: `${item[0].lat}px`,
              top: `${item[0].lng}px`
            }"
            v-for="(item, index) in peopleMarkers"
            :key="index"
            @click="showInfo(index, $event, 3)"
          >{{item.length > 1 ? item.length : ''}}</div>
          <div
            class="policeOfficer"
            :style="{
              left: `${item.lat}px`,
              top: `${item.lng}px`
            }"
            v-for="item in policeMarkers"
            :key="item.uId"
          ></div>
          <div
            class="keyPerson"
            :class="{
              'lv1': item.length > 1 && item.length < 6,
              'lv2': item.length > 5 && item.length < 13,
              'lv3': item.length > 12 && item.length < 56,
              'lv4': item.length > 55,
              'active': item.onFocus
            }"
            :style="{
              left: `${item[0].lat}px`,
              top: `${item[0].lng}px`
            }"
            v-for="(item, index) in suspectMarkers"
            :key="index"
            @click="showInfo(index, $event, 2)"
          >{{item.length > 1 ? item.length : ''}}</div>
        </div>
      </div>

      <div id="leftSelId">
        <div class="suspectPerson" :class="{active: suspectSelectedState}" @click="changeSuspectSelection">重点人员</div>
        <div class="policeMan" :class="{active: policeSelectedState}" @click="changePoliceSelection">警员</div>
        <div class="normalPersonBy" :class="{active: passerBySelectedState}" @click="changePeopleSelection">普通行人</div>
      </div>

      <div id="rightMaskI" class="rightMask" v-show="isRightShow" :style="{height: !isUpShow && personType === 2 ? '796px' : '620px'}">
        <div class="close" @click="closeRight"></div>
        <div v-if="personType === 2" class="catch"></div>
        <div class="topMsg" :class="!isUpShow && personType === 2 ? 'launch' : 'fold'">
          <div class="baseMs">
            <ul class="textInfo">
              <li>
                <div class="cate">人员类别</div>
                <div class="info">{{infoDetail.showTypeName ? infoDetail.showTypeName : '未知'}}</div>
              </li>
              <li>
                <div class="cate">姓名</div>
                <div class="info">{{infoDetail.personName ? infoDetail.personName : '未知'}}</div>
              </li>
              <li>
                <div class="cate">身份证号</div>
                <div class="info">{{infoDetail.identityCard ? infoDetail.identityCard : '未知'}}</div>
              </li>
              <li>
                <div class="cate">住址</div>
                <el-tooltip class="item" effect="dark" :open-delay="800" :content="infoDetail.address" placement="top-start">
                  <div class="info">{{infoDetail.address ? infoDetail.address : '未知'}}</div>
                </el-tooltip>
              </li>
            </ul>
            <div class="graphInfo"><img :src="baseImg" alt=""></div>
          </div>
          <div  v-if="personType === 2" @click="addBg" class="moreInfo" :class="{isUpShow: isUpShow}"></div>
          <div v-if="!isUpShow && personType === 2" style="margin: 10px 30px; border-top: 1px solid #4f7f83;"></div>
          <div v-if="!isUpShow && personType === 2" class="baseMs">
            <ul class="textInfo" style="padding-top: 0;">
              <li>
                <div class="cate">来源</div>
                <div class="info">{{infoDetail.source ? infoDetail.source : '未知'}}</div>
              </li>
              <li>
                <div class="cate">代用名</div>
                <div class="info">{{infoDetail.aliasName ? infoDetail.aliasName : '未知'}}</div>
              </li>
              <li>
                <div class="cate">性别</div>
                <div class="info">{{infoDetail.sex ? infoDetail.sex : '未知'}}</div>
              </li>
              <li>
                <div class="cate">类型</div>
                <div class="info">{{infoDetail.typeName ? infoDetail.typeName : '未知'}}</div>
              </li>
              <li>
                <div class="cate">手机号</div>
                <div class="info">{{infoDetail.phone1 ? infoDetail.phone1 : '未知'}}</div>
              </li>
              <li v-if="infoDetail.phone2">
                <div class="cate">手机号</div>
                <div class="info">{{infoDetail.phone2}}</div>
              </li>
              <li v-if="infoDetail.phone3">
                <div class="cate">手机号</div>
                <div class="info">{{infoDetail.phone3}}</div>
              </li>
            </ul>
            <div class="graphInfo"><img :src="baseImg" alt=""></div>
            <img class="arr arrL" src="../../assets/images/index_switchLeft.png" v-show="leftSwitchEnable" @click="switchToLeft">
            <img class="arr arrR" src="../../assets/images/index_switchRight.png" v-show="rightSwitchEnable" @click="switchToRight">
          </div>
        </div>
        <div class="midMsg">
          <canvas id="videoImg" width="376" height="168" style="margin-left: 6px; margin-top: 26px;"></canvas>
          <i class="vFullScreen" @click.stop="playFullScreenVideo"></i>
+         <img src="../../assets/images/loading.gif" v-show="loading" style="position:absolute;right: 170px;margin-top: 80px;">
        </div>
        <div class="butMsg">
          <div class="track">
            <div class="trackGuid" @click="goToPersonTrack">最近10条轨迹</div>
            <ul>
              <li v-if="!trackSubItems.length">
                <div class="trackAnchor"></div>
                <div class="trackTime">{{currentTime}}</div>
                <div class="trackAddr">暂无轨迹</div>
              </li>
              <li v-for="(item, index) in trackSubItems" :key="index">
                <div class="trackAnchor"></div>
                <div class="trackTime">{{item.traceTime}}</div>
                <div class="trackAddr">{{item.adress}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mark" v-show="showRadarScan">
        <div class="radarBg"></div>
        <div class="radarScan"></div>
      </div>
       <el-dialog
                   title=""
                   :visible.sync="dialogPersonVisible"
                   :before-close="handleClose"
                   width="89%"
                   top='100px'
                   id="fullPersonPngScreen"
                  v-if="dialogPersonVisible"
                   :modal='true'>
                   
                      <canvas id="toBigS" v-show="true" width='1708px' height='780px' ></canvas>
                 </el-dialog>
      <satellite-and-png-switch :inPngPage="true" :url="'/preventCrowd/personSpreadPng'" id="switchPage"></satellite-and-png-switch>
    </el-main>
  </div>
</template>

<script>
  import '../../common/js/frameAnimation'
  import { watchDrag, dateFmt, randomStr } from '@/common/js/silverStar'
  import { pointCluster } from '@/common/js/imgClusterer'
  import SatelliteAndPngSwitch from 'components/SatelliteAndPngSwitch'
  export default {
    data () {
      return {
        typess:['1','2'],
        showTimer:null,
        isGettingData:false,
        playingImg:null,
        dialogPersonVisible:false,
        loading:false,
        cvState: {
          grabbing: false
        },
        ctx: null,
        suspectMarkers: [],
        policeMarkers: [],
        peopleMarkers: [],
        showInfoList: false,
        tFlag:true,
        passerByDetailList: [],
        suspectDetailList: [],
        suspectSelectedState: true,
        policeSelectedState: true,
        passerBySelectedState: false,
        isRightShow: false,
        isUpShow: true,
        showRadarScan: true,
        fullScreen: false,
        leftSwitchEnable: true,
        rightSwitchEnable: true,
        currentTime: dateFmt(new Date()),
        personType: 3,
        trackSubItems: [],
        infoDetail: {
          showTypeName: '普通行人',
          personName: '',
          identityCard: '',
          address: '',
          source: '',
          aliasName: '',
          sex: '',
          typeName: '',
          phone1: '',
          phone2: '',
          phone3: '',
          personDetailList: []
        },
        imgs: [],
        timerIdList: {
          police: null,
          suspect: null,
          passerBy: null
        },
        faceUId: '',
        ani: null,
        drawTimer: null,
        baseImg: require('../../assets/images/noPhoto.png'),
        detailIndex: -1,
        type: 3
      }
    },
    components: {
      SatelliteAndPngSwitch
    },
    mounted () {
      this.ready()
      this.init()
    },
    watch: {
      fullScreen: {
        handler (newVal) {
          watchDrag(this.$refs.cvCont, this.cvState, newVal)
        }
      },
      isRightShow(val){
        if(!val){
          if(this.drawTimer){clearInterval(this.drawTimer)}
        }
      }
    },
    beforeDestroy () {
      this.timerIdList.police && clearTimeout(this.timerIdList.police)
      this.timerIdList.suspect && clearTimeout(this.timerIdList.suspect)
      this.timerIdList.passerBy && clearTimeout(this.timerIdList.passerBy)
      this.drawTimer && clearInterval(this.drawTimer)
      this.showTimer && clearTimeout(this.showTimer)
    },
    created () {
      this.$root.Bus.$on('fullScreen', value => {
        if (value) {
          const
            fullscree = require('fullscreen'),
            el = document.getElementById('map'),
            map1 = document.getElementById('allma'),
            ps = document.getElementById('person-sprea'),
            left = document.getElementById('leftSelId'),
            right = document.getElementById('rightMaskI'),
            switchPage = document.getElementById('switchPage')
          this.fullScreen = true
          !Array.from(el.classList).join().includes('elAdd') && el.classList.add('elAdd')
          !Array.from(map1.classList).join().includes('mapAdd') && map1.classList.add('mapAdd')
          !Array.from(ps.classList).join().includes('psAdd') && ps.classList.add('psAdd')
          !Array.from(left.classList).join().includes('leftAdd') && left.classList.add('leftAdd')
          !Array.from(right.classList).join().includes('rightAdd') && right.classList.add('rightAdd')
          !Array.from(switchPage.classList).join().includes('switchPage') && switchPage.classList.add('switchPage')
          const fs = fullscree(el)
          fs.request()
        }
      })
    },
    methods: {
      ready () {
        const
          fullscreen = require('fullscreen'),
          el = document.getElementById('map'),
          map1 = document.getElementById('allma'),
          ps = document.getElementById('person-sprea'),
          left = document.getElementById('leftSelId'),
          right = document.getElementById('rightMaskI'),
          switchPage = document.getElementById('switchPage')
        const fs = fullscreen(el)
        fs.on('release', () => {
          this.fullScreen = false
          Array.from(el.classList).join().includes('elAdd') && el.classList.remove('elAdd')
          Array.from(map1.classList).join().includes('mapAdd') && map1.classList.remove('mapAdd')
          Array.from(ps.classList).join().includes('psAdd') && ps.classList.remove('psAdd')
          Array.from(left.classList).join().includes('leftAdd') && left.classList.remove('leftAdd')
          Array.from(right.classList).join().includes('rightAdd') && right.classList.remove('rightAdd')
          Array.from(switchPage.classList).join().includes('switchPage') && switchPage.classList.remove('switchPage')
        })
      },
      init () {
        this.showDatas()
        this.$refs.cv.width = 2880
        this.$refs.cv.height = 1620
        this.ctx = this.$refs.cv.getContext('2d')
        watchDrag(this.$refs.cvCont, this.cvState, this.fullScreen)
      },
      playFullScreenVideo(){
          this.dialogPersonVisible = true; 
          var var_this = this;
          if(this.tFlag){
          if(this.drawTimer){clearInterval(var_this.drawTimer)}
          this.drawTimer = setInterval(function() {
            var_this.playRealVideo(var_this.playingImg,'toBigS');
          }, 300);
        }else{
          setTimeout(function(){
            var_this.playVideo(var_this.imgs,'toBigS');
          },0)
        }
      },
      handleClose(){
        this.dialogPersonVisible = false; 
          var var_this = this;
          if(this.tFlag){
          if(this.drawTimer){clearInterval(var_this.drawTimer)}
          this.drawTimer = setInterval(function() {
            var_this.playRealVideo(var_this.playingImg,'videoImg');
          }, 300);
        }else{
          setTimeout(function(){
            var_this.playVideo(var_this.imgs,'videoImg');
          },0)
        }
      },
      closeRight () {
        this.isRightShow = false
        this.personType === 2 && this.showDatas()
      },
      showInfo (index, e, type) {
        this.timerIdList.police && clearTimeout(this.timerIdList.police)
        this.timerIdList.suspect && clearTimeout(this.timerIdList.suspect)
        this.timerIdList.passerBy && clearTimeout(this.timerIdList.passerBy)
        this.type = type
        this.suspectMarkers.forEach(item => item.onFocus = false)
        this.peopleMarkers.forEach(item => item.onFocus = false)
        const item = type === 3 ? this.peopleMarkers[index] : this.suspectMarkers[index]
        this.passerByDetailList.splice(0)
        this.suspectDetailList.splice(0)
        type === 3 ? item.forEach(person => this.passerByDetailList.push(person)) : item.forEach(person => this.suspectDetailList.push(person))
        item.onFocus = true
        this.isRightShow = false
        this.showInfoList = true
        const ctx = this.ctx
        const infoBox = this.$refs.infoBox
        const terminal = {lat: 0, lng: 0}
        ctx.save()
        ctx.clearRect(0, 0, 2880, 1620)
        ctx.beginPath()
        ctx.strokeStyle = type === 3 ? '#ffed78' : '#f00'
        ctx.lineWidth = 4
        ctx.moveTo(item[0].lat, item[0].lng)
        if (e.clientX > (226 + 1682 / 2) && e.clientY < (70 + 934 / 2)) {
          // 视口第一象限范围
          ctx.lineTo(item[0].lat - 36, item[0].lng + 36)
          terminal.lat = item[0].lat - 100
          terminal.lng = item[0].lng + 36
          ctx.lineTo(terminal.lat, terminal.lng)
          infoBox.style.left = `${terminal.lat - 232}px`
          infoBox.style.top = `${terminal.lng}px`
        } else if (e.clientX < (226 + 1682 / 2) && e.clientY < (70 + 934 / 2)) {
          // 视口第二象限范围
          ctx.lineTo(item[0].lat + 36, item[0].lng + 36)
          terminal.lat = item[0].lat + 100
          terminal.lng = item[0].lng + 36
          ctx.lineTo(terminal.lat, terminal.lng)
          infoBox.style.left = `${terminal.lat}px`
          infoBox.style.top = `${terminal.lng}px`
        } else if (e.clientX < (226 + 1682 / 2) && e.clientY > (70 + 934 / 2)) {
          // 视口第三象限范围
          ctx.lineTo(item[0].lat + 36, item[0].lng - 36)
          terminal.lat = item[0].lat + 100
          terminal.lng = item[0].lng - 36
          ctx.lineTo(terminal.lat, terminal.lng)
          infoBox.style.left = `${terminal.lat}px`
          infoBox.style.top = `${terminal.lng - 246}px`
        } else if (e.clientX > (226 + 1682 / 2) && e.clientY > (70 + 934 / 2)) {
          // 视口第四象限范围
          ctx.lineTo(item[0].lat - 36, item[0].lng - 36)
          terminal.lat = item[0].lat - 100
          terminal.lng = item[0].lng - 36
          ctx.lineTo(terminal.lat, terminal.lng)
          infoBox.style.left = `${terminal.lat - 232}px`
          infoBox.style.top = `${terminal.lng - 246}px`
        }
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
      },
      showSuspectInfo (personId, index, type) {
        this.timerIdList.police && clearTimeout(this.timerIdList.police)
        this.timerIdList.suspect && clearTimeout(this.timerIdList.suspect)
        this.timerIdList.passerBy && clearTimeout(this.timerIdList.passerBy)
        this.suspectMarkers.forEach(item => item.onFocus = false)
        this.suspectMarkers[index].onFocus = true
        this.showInfoList = false
        this.peopleMarkers.forEach(item => item.onFocus = false)
        this.ctx.clearRect(0, 0, 2880, 1620)
        this.isRightShow = false
        this.showInfoDetail(personId, type)
      },
      showInfoDetail (personId,img,type) {
        this.personType = type
        this.$axios.get(`/info/person/getPersonBaseDetailInfoById/${personId}`)
          .then(data => {
            const personInfo = data.data
            this.isRightShow = true
            this.infoDetail.showTypeName = type === 3 ? '普通行人' : '重点人员'
            this.infoDetail.personName = personInfo.personName ? personInfo.personName : ''
            this.infoDetail.identityCard = personInfo.identityCard ? personInfo.identityCard : ''
            this.infoDetail.address = personInfo.personAddr ? personInfo.personAddr : ''
            this.infoDetail.source = personInfo.source ? personInfo.source : ''
            this.infoDetail.aliasName = personInfo.aliasName ? personInfo.aliasName : ''
            this.infoDetail.sex = personInfo.sex ? personInfo.sex : ''
            this.infoDetail.typeName = personInfo.typeName ? personInfo.typeName : ''
            this.infoDetail.phone1 = personInfo.phone1 ? personInfo.phone1 : ''
            this.infoDetail.phone2 = personInfo.phone2 ? personInfo.phone2 : ''
            this.infoDetail.phone3 = personInfo.phone3 ? personInfo.phone3 : ''
            this.baseImg = personInfo.personPhoto ? personInfo.personPhoto : this.baseImg
            this.infoDetail.personDetailList.splice(0)
            personInfo.personDetailList.forEach(item =>  this.infoDetail.personDetailList.push(item))
            this.drawVideo(this.tFlag?img:personId)
            this.getTenTracks(personId)
          })
      },
      closeInfoList () {
        this.showInfoList = false
        this.peopleMarkers.forEach(item => item.onFocus = false)
        this.ctx.clearRect(0, 0, 2880, 1620)
        this.isRightShow = false
        this.showDatas()
      },
      getTypeList (typeList){
        if(typeList.length == 0) {
          this.showTimer && clearTimeout(this.showTimer)
          this.showTimer = setTimeout(() => this.getTypeList(this.typess), 1000)
          return;
        }
        if(this.isGettingData) return;
        this.isGettingData = true;
        let types = typeList.join(',');
        this.$axios.get(`/trace/personMonitor/getPersonTrace?typeStr=${types}&mapStr=1`)
        .then(res => {
          this.peopleMarkers.splice(0)
          this.suspectMarkers.splice(0)
          this.policeMarkers.splice(0)
          this.isGettingData = false;
          if(res.data.length > 0){
            this.showRadarScan = false
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
              people.forEach(item => {
              item.onFocus = false
              let mid = item.lng
              item.lng = item.lat
              item.lat = mid
            })
            if(people.length > 0)
            {
              this.tFlag =true
              for (let i = 0; i < people.length; i++) {
                if(!people[i].tuId){
                  this.tFlag =false
                  break;
                }
              }
             pointCluster(people).forEach(item => this.peopleMarkers.push(item))
            }
            suspects.forEach(item => {
              item.onFocus = false
              let mid = item.lng
              item.lng = item.lat
              item.lat = mid
            })
            if(suspects.length > 0)
            {
              this.tFlag =true
              for (let i = 0; i < suspects.length; i++) {
                if(!suspects[i].tuId){
                  this.tFlag =false
                  break;
                }
              }
             pointCluster(suspects).forEach(item => this.suspectMarkers.push(item))
            }
            polices.forEach(item => {
              let mid = item.lng
              item.lng = item.lat
              item.lat = mid
              this.policeMarkers.push(item)
            })
            
          }
            this.showTimer && clearTimeout(this.showTimer)
            this.showTimer = setTimeout(() => this.getTypeList(this.typess), 1000)
        })
        .catch(err => {
          this.isGettingData = false;
          this.peopleMarkers.splice(0)
          this.suspectMarkers.splice(0)
          this.policeMarkers.splice(0)
          this.showTimer && clearTimeout(this.showTimer)
          this.showTimer = setTimeout(() => this.getTypeList(this.typess), 1000)
        })
      },
      // getTypeList (type) {
      //   if (type === 3) {
      //     this.$axios.get(`/trace/personMonitor/getPersonTrace?typeStr=${type}&mapStr=1`)
      //     .then(data => {
      //       this.peopleMarkers.splice(0)
      //       data.data.length && (this.showRadarScan = false)
      //       const points = data.data
      //       points.forEach(item => {
      //         item.onFocus = false
      //         let mid = item.lng
      //         item.lng = item.lat
      //         item.lat = mid
      //       })
      //       if(points.length > 0)
      //       {
      //         this.tFlag =true
      //         for (let i = 0; i < points.length; i++) {
      //           if(!points[i].tuId){
      //             this.tFlag =false
      //             break;
      //           }
      //         }
      //        pointCluster(points).forEach(item => this.peopleMarkers.push(item))
           
      //       }
             
      //       this.timerIdList.passerBy && clearTimeout(this.timerIdList.passerBy)
      //       this.timerIdList.passerBy = setTimeout(() => this.getTypeList(3), 1000)
      //     })
      //     .catch(err => {
      //       this.timerIdList.passerBy && clearTimeout(this.timerIdList.passerBy)
      //       this.timerIdList.passerBy = setTimeout(() => this.getTypeList(3), 1000)
      //     })
      //     // 行人数据 fake
      //     // const points = []
      //     // for (let i = 0; i < 1200; i++) {
      //     //   points.push({
      //     //     eviceId: '2',
      //     //     deviceIp: '1',
      //     //     id: 'id',
      //     //     img: [],
      //     //     lat: Math.floor(Math.random() * 2880),
      //     //     lng: Math.floor(Math.random() * 1620),
      //     //     type: 1,
      //     //     uId: randomStr(32),
      //     //     onFocus: false
      //     //   })
      //     // }
      //     // pointCluster(points).forEach(item => this.peopleMarkers.push(item))
      //   }
      //   if (type === 2) {
      //     this.$axios.get(`/trace/personMonitor/getPersonTrace?typeStr=${type}&mapStr=1`)
      //     .then(data => {
      //       this.suspectMarkers.splice(0)
      //       data.data.length && (this.showRadarScan = false)
      //       const points = data.data
      //       points.forEach(item => {
      //         item.onFocus = false
      //         let mid = item.lng
      //         item.lng = item.lat
      //         item.lat = mid
      //       })
      //       if(points.length > 0)
      //       {
      //         this.tFlag =true
      //         for (let i = 0; i < points.length; i++) {
      //           if(!points[i].tuId){
      //             this.tFlag =false
      //             break;
      //           }
      //         }
      //        pointCluster(points).forEach(item => this.suspectMarkers.push(item))
      //       }
      //       // points.length > 0 && pointCluster(points).forEach(item => this.suspectMarkers.push(item))
      //       this.timerIdList.suspect && clearTimeout(this.timerIdList.suspect)
      //       this.timerIdList.suspect = setTimeout(() => this.getTypeList(2), 1000)
      //     })
      //     .catch(err => {
      //       this.timerIdList.suspect && clearTimeout(this.timerIdList.suspect)
      //       this.timerIdList.suspect = setTimeout(() => this.getTypeList(2), 1000)
      //     })
      //     // 重点人员数据 fake
      //     // const points = []
      //     // for (let i = 0; i < 600; i++) {
      //     //   points.push({
      //     //     eviceId: '2',
      //     //     deviceIp: '1',
      //     //     id: 'id',
      //     //     img: [],
      //     //     lat: Math.floor(Math.random() * 2880),
      //     //     lng: Math.floor(Math.random() * 1620),
      //     //     type: 1,
      //     //     uId: randomStr(32),
      //     //     onFocus: false
      //     //   })
      //     // }
      //     // pointCluster(points).forEach(item => this.suspectMarkers.push(item))
      //   }
      //   if (type === 1) {
      //     this.$axios.get(`/trace/personMonitor/getPersonTrace?typeStr=${type}&mapStr=1`)
      //     .then(data => {
      //       data.data.length && (this.showRadarScan = false)
      //       this.policeMarkers.splice(0)
      //       data.data.forEach(item => {
      //         let mid = item.lng
      //         item.lng = item.lat
      //         item.lat = mid
      //         this.policeMarkers.push(item)
      //       })
      //       this.timerIdList.police && clearTimeout(this.timerIdList.police)
      //       this.timerIdList.police = setTimeout(() => this.getTypeList(1), 1000)
      //     })
      //     .catch(err => {
      //       this.timerIdList.police && clearTimeout(this.timerIdList.police)
      //       this.timerIdList.police = setTimeout(() => this.getTypeList(1), 1000)
      //     })
      //     // 警员数据 fake
      //     // for (let i = 0; i < 36; i++) {
      //     //   this.policeMarkers.push({
      //     //     eviceId: '2',
      //     //     deviceIp: '1',
      //     //     id: 'id',
      //     //     img: [],
      //     //     lat: Math.floor(Math.random() * 2880),
      //     //     lng: Math.floor(Math.random() * 1620),
      //     //     type: 1,
      //     //     uId: randomStr(32),
      //     //     onFocus: false
      //     //   })
      //     // }
      //   }
      // },
      changeSuspectSelection () {
        this.suspectSelectedState = !this.suspectSelectedState
        !this.suspectSelectedState && this.suspectMarkers.splice(0) && this.typess.indexOf('2') != -1 && this.typess.splice(this.typess.indexOf('2'),1)
        this.suspectSelectedState && this.typess.indexOf('2') == -1 && this.typess.push('2')
      },
      changePoliceSelection () {
        this.policeSelectedState = !this.policeSelectedState
        !this.policeSelectedState && this.policeMarkers.splice(0) && this.typess.indexOf('1') != -1 && this.typess.splice(this.typess.indexOf('1'),1)
        this.policeSelectedState && this.typess.indexOf('1') == -1 && this.typess.push('1')
      },
      changePeopleSelection () {
        this.passerBySelectedState = !this.passerBySelectedState
        !this.passerBySelectedState && this.peopleMarkers.splice(0) && this.typess.indexOf('3') != -1 && this.typess.splice(this.typess.indexOf('3'),1)
        this.passerBySelectedState && this.typess.indexOf('3') == -1 && this.typess.push('3')
      },
      showDatas () {
        this.getTypeList(this.typess);
        // this.suspectSelectedState ? this.getTypeList(2) : this.suspectMarkers.splice(0)
        // this.policeSelectedState ? this.getTypeList(1) : this.policeMarkers.splice(0)
        // this.passerBySelectedState ? this.getTypeList(3) : this.peopleMarkers.splice(0)
      },
      addBg () {
        this.isUpShow = !this.isUpShow
      },
      goToPersonTrack () {
        this.$router.push({
          name: 'personTrack',
          query: { faceId: this.faceUId }
        })
      },
      switchToLeft () {
        this.detailIndex--
        this.rightSwitchEnable = true
        if (this.detailIndex === 0) this.leftSwitchEnable = false
        this.infoDetail.aliasName = this.personDetailLists[this.detailIndex].personAliasName
        this.infoDetail.source = this.personDetailLists[this.detailIndex].personSource
        this.infoDetail.sex = this.personDetailLists[this.detailIndex].personSex === '0' ? '未知' : this.personDetailLists[this.detailIndex].personSex === 1 ? '男' : '女'
        this.infoDetail.typeName = this.personDetailLists[this.detailIndex].personTypeName === null ? '未知' : this.personDetailLists[this.detailIndex].personTypeName
        this.infoDetail.phone1 = this.personDetailLists[this.detailIndex].personPhone1
        this.infoDetail.phone2 = this.personDetailLists[this.detailIndex].personPhone2
        this.infoDetail.phone3 = this.personDetailLists[this.detailIndex].personPhone3
      },
      switchToRight () {
        this.detailIndex++
        this.leftSwitchEnable = true
        if (this.detailIndex === this.personDetailLists.length - 1) this.rightSwitchEnable = false
        this.infoDetail.aliasName = this.personDetailLists[this.detailIndex].personAliasName
        this.infoDetail.source = this.personDetailLists[this.detailIndex].personSource
        this.infoDetail.sex = this.personDetailLists[this.detailIndex].personSex === '0' ? '未知' : this.personDetailLists[this.detailIndex].personSex === 1 ? '男' : '女'
        this.infoDetail.typeName = this.personDetailLists[this.detailIndex].personTypeName === null ? '未知' : this.personDetailLists[this.detailIndex].personTypeName
        this.infoDetail.phone1 = this.personDetailLists[this.detailIndex].personPhone1
        this.infoDetail.phone2 = this.personDetailLists[this.detailIndex].personPhone2
        this.infoDetail.phone3 = this.personDetailLists[this.detailIndex].personPhone3
      },
      getTenTracks (uId) {
        this.faceUId = uId
        this.$axios.get(`/trace/personMonitor/getPersonSpoor/${uId}`)
          .then(res => {
            if(res.data.length > 10){
              this.trackSubItems = res.data.slice(0,10);
            }else{
              this.trackSubItems = res.data
            }
            })
      },
      playVideo (imgs, faceId = 'videoImg') {
        let var_this = this;
        this.ani && this.ani.destroy()
        if(imgs.length == 0) {return}
        this.ani = new frame_ani({
          canvasTargetId: faceId,
          framesUrl: imgs,
          loop: false,
          frequency: 3,
          onStart:function(){
            var_this.loading = true;
          },
        })
        this.ani.initialize(() => {
          var_this.loading = false;
          var_this.ani.play();
        });
      },
      drawVideo (uId) {
        let var_this = this;
        if(this.tFlag){
          if(this.drawTimer){clearInterval(var_this.drawTimer)}
          this.drawTimer = setInterval(function() {
            var_this.playingImg = uId;
            var_this.playRealVideo(uId,'videoImg');
          }, 300);
        }else{
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
          if(!data.imagePath) {
            ctx.clearRect(0,0, width, height);
            return;
          } 
          let lfx = data.headPoint && data.headPoint.split(',')[0].split('[[')[1] * width / 3072;
          let lfy = data.headPoint && data.headPoint.split(',')[1].split(']')[0] * height / 2048;
          let rbx = data.headPoint && data.headPoint.split(',')[2].split('[')[1] * width /3072;
          let rby = data.headPoint && data.headPoint.split(',')[3].split(']]')[0] * height / 2048;
          image.onload = function () {
            ctx.clearRect(0,0, width, height); 
            ctx.drawImage(image,0,0, width, height);
            ctx.strokeRect(lfx,lfy,rbx-lfx,rby-lfy);
          };
          image.src = data.imagePath;
        })
        
        
    },
      getImgs (uId) {
         let uri = this.tFlag ? `/trace/personTrace/getPersonTraceBackGroudImgNoUid?deviceNum=${uId}`: `/trace/personTrace/getPersonTraceBackGroudImgByUid?uId=${uId}` ;
        this.$axios.get(uri)
          .then(res => {
            if (res.data.length > 0) {
              this.imgs.splice(0)
              res.data.forEach(item => this.imgs.push(`/upload/showImgByName?rowKey=${item.frameId}&facePosi=${item.facePosi?item.facePosi:""}&bodyPosi=${item.bodyPosi?item.bodyPosi:""}`))
              this.playVideo(this.imgs, 'videoImg')
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/css/fiMixin.scss";
  #allma {
    position: relative;
    overflow: hidden;
    .cvCont {
      @include setPosTopLeft(-221px, -420px, 2880px, 1620px, "../../assets/images/silverStar.png");
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
        &.people_focus {
          @include setNumBg(88px, "/static/images/people_focus.png"); 
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
        text-align: center;
        transform: translate(-50%, -50%);
        cursor: pointer;
        z-index: 1;
        &.lv1 {
          @include setNumBg(24px, "/static/images/n1.png");
          &.active {
            @include setNumBg(89px, "/static/images/video-circle.png");
          }
        }
        &.lv2 {
          @include setNumBg(34px, "/static/images/n2.png");
          &.active {
            @include setNumBg(89px, "/static/images/video-circle.png");
          }
        }
        &.lv3 {
          @include setNumBg(44px, "/static/images/n3.png");
          &.active {
            @include setNumBg(89px, "/static/images/video-circle.png");
          }
        }
        &.lv4 {
          @include setNumBg(54px, "/static/images/n4.png");
          &.active {
            @include setNumBg(89px, "/static/images/video-circle.png");
          }
        }
        &.active {
          @include setNumBg(89px, "/static/images/video-circle.png");
        }
      }
      .infoBox {
        box-sizing: border-box;
        @include setPosTopLeft(0, 0, 232px, 246px, "");
        padding: 7px;
        background: rgba(51, 73, 88, .4);
        border: 1px solid rgba(255, 255, 0, .4);
        box-shadow: 0 0 13px rgba(111, 208, 232, .5);
        z-index: 2;
        .squarePointCt {
          margin: 0;
          padding: 0;
          .squarePoint {
            position: absolute;
            width: 10px;
            height: 10px;
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
          @include setNumBg(24px, "/static/images/close_grey.png");
          background-size: 24px 24px;
          cursor: pointer;
          transform: translate(50%, -50%);
        }
      }
    }
  }
  #map.elAdd {
    width: 100%;
    height: 100%;
  }
  #allma.mapAdd {
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
  #person-sprea.psAdd {
    background: url("../../assets/images/fullScreen_bg.png") no-repeat;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .ps-containe {
    .el-main {
      margin-top: 16px;
      height: 880px;
    }
    #leftSelId.leftAdd {
      top: 60px;
    }
    #allma {
      height: 100%;
      width: 100%;
    }
  }
   .vFullScreen{
  position:absolute;
  width: 40px;
  height: 40px;
  background-color: tomato;
  border:3px dashed #73eded;
  border-radius:23%;
  background: url('../../assets/images/screen_toBig.png') no-repeat center center;
  float: right;
  right: 20px;
  margin-top: 35px;
}
 #fullPersonPngScreen{
      .el-dialog {
          margin: 0 0 50px 200px;
          background-color: rgba(0, 0, 0, 0.8);
          .el-dialog__header {
              background-color: rgba(0, 0, 0, 0.3); // padding: 0;
              span {
                  color: #fff;
              }
              button {
                  // background-color: rgba(100, 100, 100, 0.5);
                  width: 31px;
                  height: 31px;
                  top: 12px;
                  background: url('../../assets/images/screen_toSmall.png');
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
                  background-image: url('../../assets/images/play.png');
              }
              .btnShot {
                  position: absolute;
                  top: 13px;
                  right: 90px;
                  width: 67px;
                  border: 0px solid #000;
                  background: url('../../assets/images/btn_screenShot.png')
              } // ==============截图==========
              button {
                  &::before {
                      font-size: 20px;
                      color: #fff;
                  }
              }
              a {
                  &::before {
                      font-size: 20px;
                      color: #fff;
                  }
              } // 人脸轨迹
              .checkTrack {
                  position: absolute;
                  top: 15px;
                  left: 180px;
                  width: 20px;
                  border: 0px solid #000;
                  background: url('../../assets/images/checkTrack.png') no-repeat center center;
              } // 新增重点人员
              .addSuspectPerson {
                  position: absolute;
                  background-color: rgba(0, 0, 0, 0);
                  top: 5px;
                  left: 240px;
                  width: 20px;
                  border: 0px solid #000;
              } // 下载
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
              } // 退出
              .exit {
                  position: absolute;
                  top: 5px;
                  background-color: rgba(0, 0, 0, 0);
                  left: 360px;
                  width: 20px;
                  border: 0px solid #000;
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
                  background-image: url('../../assets/images/playAgain.png');
                  background-repeat: no-repeat;
              }
          }
      }
  } // 地图全屏
</style>

<style lang="scss" scoped>
  @import "../../common/css/fiMixin.scss";
  #leftSelId {
    @include setPosTopLeft(24px, 20px, 443px, 68px, "../../assets/images/index_selectBg.png");
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    z-index: 101;
    .suspectPerson {
      @include startEndWithPng("../../assets/images/index_suspect.png");
    }
    .policeMan {
      @include startEndWithPng("../../assets/images/index_police.png");
    }
    .normalPersonBy {
      @include startEndWithPng("../../assets/images/index_people.png");
    }
  }
  #person-sprea {
    position: relative;
    .mark {
      @include setPosTopLeft(0, 0, 100%, 100%, '');
      background: rgba(0, 0, 0, .5);
      z-index: 100;
      .radarBg {
        @include setCenterScan("/static/images/test/radar-bg.png");
      }
      .radarScan {
        @include setCenterScan("/static/images/test/radar-scan.png");
        animation: rotation 10s linear infinite;
      }
    }
  }
  @keyframes rotation {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  #rightMaskI{
    @include setPosTopRight(26px, 18px, 406px, 770px, '');
    font-size: 12px;
    z-index: 2;
    &.rightAdd {
      top: 84px;
    }
    .close {
      @include setPosTopRight(0px, 5px, 30px, 30px, "../../assets/images/index_close.png");
      cursor: pointer;
    }
    .catch {
      @include setPosTopLeft(30px, -58px, 68px, 48px, "../../assets/images/round_btn.png");
      cursor: pointer;
    }
    .topMsg {
      padding-top: 30px;
      color: #fff;
      &.launch {
        background: url("../../assets/images/index-infoBg-launch.png") no-repeat;
        height: 363px;
      }
      &.fold {
        background: url("../../assets/images/index-infoMsg-shrink.png") no-repeat;
        height: 187px;
      }
      .baseMs {
        position: relative;
        display: flex;
        width: 100%;
        .textInfo {
          flex: 1;
          padding: 20px 0 0 30px;
          li {
            display: flex;
            height: 24px;
            line-height: 24px;
            .cate {
              width: 50px;
              text-align: justify;
              &::after {
                display: inline-block;
                width: 100%;
                content: "";
              }
            }
            .info {
              margin-left: 30px;
              max-width: 136px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .graphInfo {
          width: 100px;
          height: 100px;
          margin: 15px 25px 0 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .arr {
          @include setPosTopRight(80px, 30px, 36px, 36px, "");
          cursor: pointer;
          &.arrL {
            left: 30px;
          }
        }
      }
      .moreInfo {
        width: 120px;
        height: 14px;
        margin: 10px 0 0 30px;
        background: url("../../assets/images/moreInfo.png") no-repeat;
        cursor: pointer;
        &.isUpShow {
          background: url("../../assets/images/moreInfo_up.png") no-repeat;
        }
      }
    }
    .midMsg {
      background: url("../../assets/images/index-vedio-bg.png") no-repeat;
      height: 203px;
    }
    .butMsg {
      background: url("../../assets/images/index-treva-bg.png") no-repeat;
      height: 170px;
      padding: 30px 50px 0 30px;
      text-align: left;
      .track {
        position: relative;
        width: 360px;
        height: 160px;
        .trackGuid {
          height: 26px;
          line-height: 26px;
          text-align: left;
          color: #74fdf6;
          &::after {
            @include setPosTopRight(6px, 6px, 70px, 13px, "../../assets/images/index_btn-moreTreva.png");
            content: "";
            cursor: pointer;
          }
        }
        ul {
          height: 134px;
          overflow-y: scroll;
          li {
            width: 100%;
            height: 49px;
            &:nth-child(1) {
              height: 53px;
              .trackAnchor {
                height: 53px;
                background: url("../../assets/images/index_treva_sliderPoint.png") no-repeat;
              }
              .trackTime {
                height: 26px;
                line-height: 26px;
              }
              .trackAddr {
                height: 27px;
                line-height: 27px;
              }
            }
            .trackAnchor {
              float: left;
              width: 19px;
              height: 49px;
              margin: 0 12px;
              background: url("../../assets/images/index_treva_slider.png") no-repeat;
            }
            .trackTime {
              @include personTrack(280px, 24px);
              color: #badddc;
            }
            .trackAddr {
              @include personTrack(280px, 25px);
              color: #8ab5b4;
            }
          }
        }
      }
    }
  }
  #switchPage {
    position: absolute;
    left: 0;
    bottom: 60px;
    z-index: 100;
    &.switchPage {
      left: 10px;
    }
  }
</style>
