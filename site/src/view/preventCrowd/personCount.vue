<template>
  <div class="personCount" id="personCount">
    <el-main id="pcCont">
      <div class="realTime">
        <div class="mapbg">
          <div class="close" v-show="closeDevices" id="showGlobal"></div>
          <div class="mapWrapper">
            <div id="map" style="width: 100%; height: 100%;"></div>
          </div>
        </div>

        <div class="statisticsModule">
          <div class="statisticsResContainer">
            <span class="statisticsTitle">当前全局总人数</span>
            <ul class="statisticsNumberWrapper">
              <li v-for="(num, idx) in statisticsRes" :key="idx" :style="`background: url(/static/images/${num}.png) center center no-repeat`"></li>
              <li>人</li>
            </ul>
          </div>

          <div class="statisticsGraphWarpper">
            <div class="statisticsGraphTitleWrapper">
              <div class="statisticsTitle">人数变化统计图</div>
              <button class="switchBtn" @click="swimToGlobal">选择全局</button>
              <button class="qiakouBtn">卡口人流数</button>
            </div>
            <div class="statisticsGraph">
              <div ref="statisticsGraph" style="width: 512px; height:340px;"></div>
            </div>
          </div>
        </div>
      </div>

      <el-row>
        <el-col :span="8">
          <div class="predict">
            <div class="predictTitle">预测未来3分钟人数</div>
            <ul class="predictCon">
              <li class="infoBox" :class="`lv${item.threeMinWarnLevel}`" v-for="(item, index) in predict" :key="index">
                <div class="areaInfo">{{item.threeMinForecast}}</div>
                <el-tooltip class="item" effect="dark" :open-delay="800" :content="item.areaName" placement="top-start">
                  <div class="areaName">{{item.areaName}}</div>
                </el-tooltip>
              </li>
            </ul>
            <ul class="predictClass">
              <li class="classWarning" :class="`lv${item.threeMinWarnLevel}`" v-for="(item, index) in predict" :key="index" v-show="item.threeMinWarnLevel !== 0">
                <el-tooltip class="item" effect="dark" :open-delay="800" :content="`${item.areaName} - ${item.threeMinForecastHandlerInfo}`" placement="top-start">
                  <div class="info">{{item.areaName}} - {{item.threeMinForecastHandlerInfo}}</div>
                </el-tooltip>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="predict">
            <div class="predictTitle">预测未来5分钟人数</div>
            <ul class="predictCon">
              <li class="infoBox" :class="`lv${item.fiveMinWarnLevel}`" v-for="(item, index) in predict" :key="index">
                <div class="areaInfo">{{item.fiveMinForecast}}</div>
                <el-tooltip class="item" effect="dark" :open-delay="800" :content="item.areaName" placement="top-start">
                  <div class="areaName">{{item.areaName}}</div>
                </el-tooltip>
              </li>
            </ul>
            <ul class="predictClass">
              <li class="classWarning" :class="`lv${item.fiveMinWarnLevel}`" v-for="(item, index) in predict" :key="index" v-show="item.fiveMinWarnLevel !== 0">
                <el-tooltip class="item" effect="dark" :open-delay="800" :content="`${item.areaName} - ${item.fiveMinForecastHandlerInfo}`" placement="top-start">
                  <div class="info">{{item.areaName}} - {{item.fiveMinForecastHandlerInfo}}</div>
                </el-tooltip>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="predict">
            <div class="predictTitle">预测未来10分钟人数</div>
            <ul class="predictCon">
              <li class="infoBox" :class="`lv${item.tenMinWarnLevel}`" v-for="(item, index) in predict" :key="index">
                <div class="areaInfo">{{item.tenMinForecast}}</div>
                <el-tooltip class="item" effect="dark" :open-delay="800" :content="item.areaName" placement="top-start">
                  <div class="areaName">{{item.areaName}}</div>
                </el-tooltip>
              </li>
            </ul>
            <ul class="predictClass">
              <li class="classWarning" :class="`lv${item.tenMinWarnLevel}`" v-for="(item, index) in predict" :key="index" v-show="item.tenMinWarnLevel !== 0">
                <el-tooltip class="item" effect="dark" :open-delay="800" :content="`${item.areaName} - ${item.tenMinForecastHandlerInfo}`" placement="top-start">
                  <div class="info">{{item.areaName}} - {{item.tenMinForecastHandlerInfo}}</div>
                </el-tooltip>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { createMap } from '@/common/js/createMap'
  import { setAreaName } from '@/common/js/setAreaName'
  import { calcImportancePoint, setMapCenter, fmtTime } from '@/common/js/createPolygon'
  
  const colors = ['#32de4f', '#0090ff', '#ffeca2', '#ff8a00', '#ff0000']
  const fillColors = ['rgba(167, 245, 180, .8)', 'rgba(158, 226, 255, .8)', 'rgba(255, 227, 151, .8)', 'rgba(248, 194, 128, .8)', 'rgba(253, 180, 180, .8)']

  export default {
    data() {
      return {
        map: null,
        statisticsRes: [0],
        polygons: [],
        devicesInfoList: [],
        predict: [],
        activePolyon: [],
        closeDevices: false,
        timeLine: [],
        flowNum: [],
        globalStatisticsChart: null,
        lock: null,
        lockItem:null,
        lastPolygons:[],
        lastInfoBoxs:[],
        mapTimer:null,
        predictTimer:null,
        handleArr:[]
      }
    },
    beforeDestroy(){
      this.mapTimer && clearInterval(this.mapTimer)
      this.predictTimer && clearInterval(this.predictTimer)
    },
    methods: {
      // 定义初始化地图函数
      initMap () {
        this.map = createMap('map')
      },
      initChart (areaName = '所有区域') {
        const option = {
          color: '#76FFFC',
          tooltip: {
            trigger: 'axis',
            borderColor: '#31D2E5',
            borderWidth: 1
          },
          grid: {
            y: 10,
            x2: 18,
            y2: 35,
            x: 45
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.timeLine,
            axisLine: {
              lineStyle: {
                color: '#31D2E5'
              }
            },
            axisTick: {
              inside: true
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#31D2E5'
              }
            },
            axisTick: {
              inside: true
            },
            splitLine: {
              show: false
            }
          },
          textStyle: {
            color: '#fff'
          },
          series: [
            {
              type: 'line',
              smooth: true,
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(118, 255, 252, .6)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(118, 255, 252, 0)'
                      }
                    ],
                    globalCoord: true
                  }
                }
              },
              smoothMonotone: 'y',
              data: this.flowNum,
              markLine: {
                animation: true,
                label: {
                  normal: {
                    formatter: areaName,
                    offset: [30, 40],
                    textStyle: {
                      color: '#fff',
                      fontSize: 14,
                      align: 'right'
                    }
                  }
                },
                lineStyle: {
                  normal: {
                    color: 'transparent'
                  }
                },
                tooltip: {
                  formatter: areaName
                },
                data: [[
                  {
                    coord: [this.timeLine[0], this.flowNum[0]],
                    symbol: 'none'
                  },
                  {
                    coord: [this.timeLine[this.timeLine.length - 1], this.flowNum[this.flowNum.length - 1]],
                    symbol: 'none'
                  }
                ]]
              }
            }
          ]
        }
        echarts.init(this.$refs.statisticsGraph).setOption(option)
      },
      initPolyons (polygons, map) {
        const blocks = []
        let var_this = this;
        polygons.forEach(item => {
          const block = setAreaName(map, {
            path: item.areaPointList,
            index: item.areaId,
            content: `
            <div
              style="padding-left: 6px;
                color: #109eff;
                width: 100%;
                text-shadow: 1px 1px 0 #fff,
                  -1px -1px 0 #fff,
                  1px -1px 0 #fff,
                  -1px 1px 0 #fff,
                  2px 2px 0 #fff,
                  -2px -2px 0 #fff,
                  2px -2px 0 #fff,
                  -2px 2px 0 #fff;
                font-size: 16px;"
            >${item.areaName}</div>`,
            strokeColor: colors[item.warnLevel],
            fillColor: fillColors[item.warnLevel]
          })
          blocks.push(block)
          var_this.lastPolygons.push(block.polygon);
        })
        return blocks
      },
      initInfoBox (polygon, areaAmount, map, id) {
        const imptCoord = calcImportancePoint(polygon)
        polygon.infoBox = new InfoBox({
          content: `<div class="areaCountDefault" id="area${id}">
              <div class="text">
                <p class="num"><span>${areaAmount?areaAmount:'--'}</span>人</p>
                区域人数
              </div>
            </div>`,
          closeBoxURL: "",
          position: new google.maps.LatLng(imptCoord)
        })
        polygon.infoBox.open(map)
        this.lastInfoBoxs.push(polygon.infoBox);
      },
      showDetails (block, areaId, map) {
        if (this.activePolyon.length > 0) {
            this.activePolyon.forEach(poly => {
              poly.polygon.setVisible(false)
              poly.ifnoBox.close()
            })
        }
        this.$axios.post(`/areaCountReal/getAreaDeviceCountRealList/${areaId}`)
        // this.$axios.post(`/tread/areaCountReal/getAreaDeviceCountRealList/${areaId}`)
          .then(data => {
            const polygon = block.polygon
            polygon.infoBox.close(map)
            this.activePolyon = []
            data.data.forEach(item => {
              const pointList = [
                {lat: item.deviceInfo.lat1, lng: item.deviceInfo.lng1},
                {lat: item.deviceInfo.lat2, lng: item.deviceInfo.lng2},
                {lat: item.deviceInfo.lat3, lng: item.deviceInfo.lng3},
                {lat: item.deviceInfo.lat4, lng: item.deviceInfo.lng4}
              ]
              const polyon = setAreaName(map, {
                path: pointList,
                index: item.deviceIp,
                content: `
                <div
                  style="padding-left: 6px;
                    color: #109eff;
                    width: 100%;
                    transform: translate(50%, -50%);
                    text-shadow: 1px 1px 0 #fff,
                      -1px -1px 0 #fff,
                      1px -1px 0 #fff,
                      -1px 1px 0 #fff,
                      2px 2px 0 #fff,
                      -2px -2px 0 #fff,
                      2px -2px 0 #fff,
                      -2px 2px 0 #fff;
                    font-size: 16px;"
                >
                  <p>
                    <span style="font-weight: 700; font-size: 22px;">${item.count?item.count:''}</span>${item.count?'人':''}
                  </p>
                  ${item.deviceName}
                </div>`,
                strokeColor: colors[item.warnLevel],
                fillColor: fillColors[item.warnLevel]
              })
              this.activePolyon.push(polyon)
            })
            setTimeout(() => setMapCenter(block, this.map), 0)
          })
          .catch(err => {})
      },
      getAreaCountRealList () {
        this.$axios.post('/areaCountReal/getAreaCountRealList')
        // this.$axios.post('/tread/areaCountReal/getAreaCountRealList')
          .then(data => {
            this.polygons = data.data
            let totalAmount = 0
            this.polygons.forEach(item => {
              totalAmount += item.count || 0
            })
            this.statisticsRes = ('' + totalAmount).split('')
            this.lastPolygons.length > 0 && this.lastPolygons.forEach(item => item.setMap(null));
            this.lastInfoBoxs.length > 0 && this.lastInfoBoxs.forEach(item => item.close());
            if(this.lock){
                if (this.activePolyon.length > 0) {
                    this.activePolyon.forEach(poly => {
                      poly.polygon.setVisible(false)
                      poly.ifnoBox.close()
                    })
                  }
                this.showDetails(this.lockItem, this.lock, this.map)
                this.closeDevices = true
            }
            const blocks = this.initPolyons(this.polygons, this.map)
            blocks.forEach((item, idx) => {
              this.initInfoBox(item.polygon, this.polygons[idx]['count'], this.map, idx)
              google.maps.event.addListener(item.polygon, 'click', () => {
                Array.from(document.querySelectorAll('.areaCountDefault')).forEach(item => {
                  item.classList = 'areaCountDefault'
                  item.style.zIndex = 0
                })
                document.getElementById(`area${idx}`).classList = 'areaCountDefault areaCountFocus'
                document.getElementById(`area${idx}`).style.zIndex = 1000
                // clearInterval(this.globalStatisticsChart)
                // this.getAreaCountHistory(this.polygons[idx]['areaId'], this.polygons[idx]['areaName'])
                // this.globalStatisticsChart = setInterval(() => this.getAreaCountHistory(this.polygons[idx]['areaId'], this.polygons[idx]['areaName']), 10000)
              })
              
              google.maps.event.addListener(item.polygon, 'dblclick', () => {
                if (!this.lock) {
                  this.lock = this.polygons[idx]['areaId'];
                  this.lockItem = item;
                  this.showDetails(item, this.polygons[idx]['areaId'], this.map)
                  this.closeDevices = true
                  this.map.setZoom(20)
                } else {
                  this.$message({
                    message: '请先关闭当前正在查看的其他区域',
                    type: 'warning',
                    center: true
                  })
                }
                const that = this
                document.getElementById('showGlobal').addEventListener('click', () => {
                  if (that.activePolyon.length > 0) {
                    that.activePolyon.forEach(poly => {
                      poly.polygon.setVisible(false)
                      poly.ifnoBox.close()
                    })
                  }
                  that.lock = null
                  that.closeDevices = false
                  that.map.setZoom(18)
                  item.polygon.infoBox.open(that.map)
                  setMapCenter(item, that.map)
                  clearInterval(that.globalStatisticsChart)
                  that.getTotalCountHistory()
                  that.globalStatisticsChart = setInterval(() => that.getTotalCountHistory(), 10000)
                  // totalAmount = 0
                  // that.polygons.forEach(it => {
                  //   totalAmount += it.count
                  // })
                  // that.statisticsRes = ('' + totalAmount).split('')
                })
              })
            })
          })
          .catch(err => {})
      },
      // getAreaDeviceCountRealList (areaId) {
      //   this.$axios.get(`/areaCountReal/getAreaDeviceCountRealList/${areaId}`)
      //     .then(data => this.devicesInfoList = data.data)
      //     .catch(err => {})
      // },
      getAlertCfgList(){
        this.$axios.post('/alertCfgTb/alertCfgList')
        // this.$axios.post('/tread/alertCfgTb/alertCfgList')
              .then(data => {
                this.handleArr = data.data
              })
              .catch(err => {})
      },
      getAreaFutureForecastList () {
        this.$axios.post('/futureForecastInfo/getAreaFutureForecastList')
        // this.$axios.post('/tread/futureForecastInfo/getAreaFutureForecastList')
          .then(data => {
            const result = data.data
            // console.log(result)
            if (result.length > 0) {
                  result.forEach(item => {
                    this.handleArr.forEach(it => {
                      if (item.threeMinWarnLevel === it.alertLevel) item.threeMinForecastHandlerInfo = it.handlerInfo
                      if (item.fiveMinWarnLevel === it.alertLevel) item.fiveMinForecastHandlerInfo = it.handlerInfo
                      if (item.tenMinWarnLevel === it.alertLevel) item.tenMinForecastHandlerInfo =  it.handlerInfo
                    })
                  })
                }
                this.predict = result
          })
          .catch(err => {})
      },
      getTotalCountHistory () {
        this.$axios.post('/areaCountHistory/getTotalCountHistory')
        // this.$axios.post('/tread/areaCountHistory/getTotalCountHistory')
          .then(data => {
            this.timeLine = []
            this.flowNum = []
            data.data.forEach(item => {
              this.timeLine.push(fmtTime(item.createTime))
              this.flowNum.push(item.count)
            })
            this.initChart()
          })
          .catch(err => {})
      },
      getAreaCountHistory (areaId, areaName) {
        const url = `/areaCountHistory/getAreaCountHistory/${areaId}`
        // const url = `/tread/areaCountHistory/getAreaCountHistory/${areaId}`
        this.$axios.post(url)
          .then(data => {
            this.timeLine = []
            this.flowNum = []
            data.data.forEach(item => {
              this.timeLine.push(fmtTime(item.createTime))
              this.flowNum.push(item.count)
            })
            this.initChart(areaName)
          })
          .catch(err => {})
      },
      swimToGlobal () {
        Array.from(document.querySelectorAll('.areaCountDefault')).forEach(item => {
          item.classList = 'areaCountDefault'
          item.style.zIndex = 0
        })
        clearInterval(this.globalStatisticsChart)
        this.getTotalCountHistory()
        this.globalStatisticsChart = setInterval(() => this.getTotalCountHistory(), 10000)
      }
    },

    mounted () {
      const
        fullscreen = require('fullscreen'),
        personCount = document.getElementById('personCount'),
        pcCont = document.getElementById('pcCont'),
        fs = fullscreen(personCount)
      fs.on('release', () => {
        this.fullscreen = false
        personCount.classList.remove('elAdd')
        pcCont.classList.remove('pcAdd')
      })
      this.initMap()
      this.getTotalCountHistory()
      this.getAlertCfgList()
      this.globalStatisticsChart = setInterval(() => this.getTotalCountHistory(), 10000)
      this.getAreaCountRealList()
      this.mapTimer = setInterval(() => this.getAreaCountRealList(), 10000);
      this.getAreaFutureForecastList()
      this.predictTimer = setInterval(() => this.getAreaFutureForecastList(), 10000);
    },
    created () {
      this.$root.Bus.$on('fullScreen', val => {
        if (val) {
          const
            fullscreen = require('fullscreen'),
            personCount = document.getElementById('personCount'),
            pcCont = document.getElementById('pcCont')
          if (!Array.from(personCount.classList).join().includes('elAdd')) personCount.classList.add('elAdd')
          if (!Array.from(pcCont.classList).join().includes('pcAdd')) pcCont.classList.add('pcAdd')
          const fs = fullscreen(personCount)
          fs.request()
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
@import './personCount.scss';
</style> 

<style lang="scss">
  #personCount.elAdd{
    width: 100%;
    height: 100%;
  }
  #pcCont.pcAdd{
    background: url("../../assets/images/fullScreen_bg_peopleCount.png") no-repeat;
    margin: 0;
    padding: 50px 10px 10px;
    width: 100%;
    height: 100%;
  }
  .personCount {
    .areaCountDefault {
      position: relative;
      width: 100px;
      height: 100px;
      background: url("/static/images/areaCount_bg_default.png");
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 10px;
      .text {
        position: absolute;
        top: 28px;
        left: 22px;
        width: 56px;
        text-align: center;
        span {
          font-size: 18px;
          font-weight: 700;
          color: #FFEF80;
        }
      }
      &.areaCountFocus {
        width: 138px;
        height: 138px;
        background: url("/static/images/areaCount_bg_focus.png");
        font-size: 15px;
        .text {
          top: 42px;
          left: 26px;
          width: 84px;
          span {
            font-size: 28px;
          }
        }
      }
    }
    // .areaCountFocus {
    //   position: relative;
    //   width: 138px;
    //   height: 138px;
    //   background: url("/static/images/areaCount_bg_focus.png");
    //   transform: translate(-50%, -50%);
    //   color: #fff;
    //   font-size: 15px;
    //   .text {
    //     position: absolute;
    //     top: 42px;
    //     left: 26px;
    //     width: 84px;
    //     text-align: center;
    //     span {
    //       font-size: 28px;
    //       font-weight: 700;
    //       color: #FFEF80;
    //     }
    //   }
    // }
  }
</style>

