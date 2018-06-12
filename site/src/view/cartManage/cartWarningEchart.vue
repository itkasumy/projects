<template>
<div class="warning-echart">
	<el-main>
		<div class="top clearfix">
			<div class="btn fl" @click="eToBack"></div>
			<div class="date fl">
				<el-date-picker
					v-model="date"
					type="datetimerange"
					:editable="false"
					size="mini"
					:time-arrow-control="true"
					:picker-options="pickerOptionsRange"
					@change="eSelectDateRange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					prefix-icon="el-icon-date"
					align="left">
				</el-date-picker>
			</div>
		</div>
		<div class="box">
			<div class="left-top-echart fl">
				<h3>预警车辆数</h3>
				<div ref="nameBarGraph"></div>
			</div>
			<div class="right-top-echart fr">
				<h3>预警车辆变化统计图</h3>
				<div ref="warningCalendarGraph"></div>
			</div>
			<div class="left-bottom-echart fl">
				<h3>按区域统计车辆数</h3>
				<div ref="areaBarGraph">
				</div>
			</div>	
			<div class="right-bottom-echart fr">
				<h3>按等级统计车辆数</h3>
				<div ref="levelKGraph">
				</div>
			</div>
		</div>

	</el-main>
</div>

</template>
<script>
import echarts from "echarts";
import {errorException, successTip, errorTip, confirmModal} from '../intelligence/js/tip'
import BASE from '../intelligence/js/basePath'
const BASEPATH_YUWEI = BASE.BASEPATH_YUWEI //玉伟
// const TEST_USER = '71aac849-3bc8-11e8-a398-000c290d9966'
const TEST_USER = 'chenji'
const AXIS_LABEL = { //坐标轴文本
    show: true,
    interval: 0,
    rotate: 25,
    fontSize: 9,
    textStyle: {
      color: "#9ed1d8"
    }
  }
const AXIS_LABEL_COLOR = { color: "#9ed1d8" }// 坐标轴文本
const AXIS_LINE = { lineStyle: { color: "#31d2e5" } }// // 坐标轴颜色
const AXIS_SPLIT_LINE = { show: true, lineStyle: {color: "#0c636b"} }// 网格线颜色
const LEGEND_STYLE = {right: '5%', textStyle: {color: '#9ed1d8'}}

const DATAZOOM_SLIDER = {
  textStyle: {
    color: 'transparent'
  },
  startValue: 0,
  endValue: 15,
  handleIcon: 'M1024 384c0 282.752-229.248 512-512 512C229.248 896 0 666.752 0 384c0-282.752 229.248-512 512-512S1024 101.248 1024 384zM590.784 310.848',
  top: '96%',
  height: 10,
  xAxisIndex: [0],
  borderColor: 'rgb(50, 204, 218)',
  fillerColor: 'rgba(64,239,255,.4)',
  dataBackground: {
    lineStyle: {
      opacity: 0.8,
      color: 'rgb(50, 204, 218)'
    }
  },
  handleStyle: {
    color: 'rgb(50, 204, 218)',
    shadowColor: 'transparent',
    shadowOffsetX: 2,
    shadowOffsetY: 2
  }
}

export default {
  name: "warningEchart",
  data() {
    return {
      date: [new Date(new Date().getTime() - 24 * 3600 * 1000), new Date()],
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
      useBackEndData: true,
      getMDT(dateTime) {
        let d = new Date(dateTime)
        let M = String(d.getMonth() + 1).padStart(2, 0)
        let D = String(d.getDate()).padStart(2, 0)
        let h = String(d.getHours()).padStart(2, 0)
        let m = String(d.getMinutes()).padStart(2, 0)
        return `${M}-${D} ${h}:${m}`
      }
    };
  },
  created(){
    this._getData()
  },
  mounted() {
    let nameBarGraph = this.$refs.nameBarGraph;
    this.eChartLT = echarts.init(nameBarGraph);
    let warningCalendarGraph = this.$refs.warningCalendarGraph;
    this.eChartRT = echarts.init(warningCalendarGraph);
    let areaBarGraph = this.$refs.areaBarGraph;
    this.eChartLB = echarts.init(areaBarGraph);
    let levelKGraph = this.$refs.levelKGraph;
    this.eChartRB = echarts.init(levelKGraph);
    this.initLeftTopEchartSetting()
    this.initRightTopEchartSetting()
    this.initLeftBottomEchartSetting()
    this.initRightBottomEchartSetting()

    // this.handleRightTopData()
    // this.handleLeftBottomData()
    // this.handleLeftTopData()
    // this.handleRightBottomData()
  },
  methods: {
    uString2Number(arr, key){
      if (key === undefined)
        return arr.map(v=> parseInt(v))
      return arr.map(( v, i )=>{
          v[key] = parseInt(v[key])
          return v
      })
    },
    _getData(){
      let option = {
        method: 'POST',
        url: `${BASEPATH_YUWEI}/info/carWarning/getCarWarningChartData`,
        data: {
          userId: TEST_USER,
          startWarningTime: this.date[0] || null,
          endWarningTime: this.date[1] || null
        }
      }
      this.$axios(option)
        .then(( data )=>{
          data = data.data
          console.log( data, 'getDAta' )
          let leftTopData = data.carWarningNumberMap
          let rightTopData = data.carChangeCountMap
          let leftBottomData = data.areaGroupCarCountMap
          let rightBottomData = data.levelCarCountList
          this.handleRightBottomData(rightBottomData)
          this.handleLeftBottomData(leftBottomData)
          this.handleLeftTopData(leftTopData)
          this.handleRightTopData(rightTopData)
          return
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    // 初始化echart配置项 11
    initLeftTopEchartSetting(){
      this.initLeftTopEchart(this.uLeftTopEchart({}))
    },
    __createLTData(data){
      if (this.useBackEndData) {
        return data
      }
      data = {}
      for (let i = 0, len = 20; i < len; i++) {
        data[Math.round(Math.random()*1000000) + ''] = {
          areaGroupName: '三体域三体三体' + i,
          statisticalTypes: {
            red: Math.round(Math.random()*1000),
            orange: Math.round(Math.random()*1000),
            yellow: Math.round(Math.random()*1000),
            blue: Math.round(Math.random()*1000),
          }
        }
      }
      return data
    },
    handleLeftTopData(data){
      data = this.__createLTData(data)
      this.dataInitLeftTopEchart(this.uLeftTopEchart(data, true))
    },
    uLeftTopEchart(data, hasSetted){
      let areaNameList = []
      let colors = ["红色预警", "橙色预警", "黄色预警", "蓝色预警"]
      let redSeriesData = []
      let orangeSeriesData = []
      let yellowSeriesData = []
      let blueSeriesData = []
      for (const id in data) {
        areaNameList.push(data[id].areaGroupName)
        blueSeriesData.push(data[id].statisticalTypes.blue)
        yellowSeriesData.push(data[id].statisticalTypes.yellow)
        orangeSeriesData.push(data[id].statisticalTypes.orange)
        redSeriesData.push(data[id].statisticalTypes.red)
      }
      redSeriesData = this.uString2Number(redSeriesData)
      orangeSeriesData = this.uString2Number(orangeSeriesData)
      yellowSeriesData = this.uString2Number(yellowSeriesData)
      blueSeriesData = this.uString2Number(blueSeriesData)
      let baseSetting = {}
      let rx = {}, ox = {}, yx = {}, bx = {}
      if (!hasSetted) {
        baseSetting = {
          type: "bar",
          stack: "总量",
          barMaxWidth: 30,
          barCategoryGap:'70%',
        }
        rx = Object.assign({itemStyle: {color: "#f00"}, name: colors[0]}, baseSetting)
        ox = Object.assign({itemStyle: {color: "#ff8a00"}, name: colors[1]}, baseSetting)
        yx = Object.assign({itemStyle: {color: "#efed51"}, name: colors[2]}, baseSetting)
        bx = Object.assign({itemStyle: {color: "#0090ff"}, name: colors[3]}, baseSetting)
      }
      let redSeriesItem = Object.assign({
        data: redSeriesData.map((v, i)=>{
          return Object.assign({value: v}, {itemStyle: {barBorderRadius: [100, 100, 0, 0], name: areaNameList[i]}})// 将实际区域名绑定进去
        }),
      }, rx)
      let orangeSeriesItem = Object.assign({
        data: orangeSeriesData.map((v, i)=>{
          // if (!redSeriesData[i])// 防止上一个没有数据时显示半圆
          //   return Object.assign({value: v}, {itemStyle: {barBorderRadius: [100, 100, 0, 0], name: areaNameList[i]}})
          return Object.assign({value: v}, {itemStyle: {barBorderRadius: [0, 0, 0, 0], name: areaNameList[i]}})
        }),
      }, ox)
      let yellowSeriesItem = Object.assign({
        data: yellowSeriesData.map((v, i)=>{
          // if (!orangeSeriesData[i] && !redSeriesData[i]) 
          //   return Object.assign({value: v}, {itemStyle: {barBorderRadius: [100, 100, 0, 0], name: areaNameList[i]}})
          return Object.assign({value: v}, {itemStyle: {barBorderRadius: [0, 0, 0, 0], name: areaNameList[i]}})
        }),
      }, yx)
      let blueSeriesItem = Object.assign({
        data: blueSeriesData.map((v, i)=>{
          // if (!yellowSeriesData[i] && !orangeSeriesData[i] && !redSeriesData[i]) 
          //   return Object.assign({value: v}, {itemStyle: {barBorderRadius: [100, 100, 0, 0], name: areaNameList[i]}})
          return Object.assign({value: v}, {itemStyle: {barBorderRadius: [0, 0, 0, 0], name: areaNameList[i]}})
        }),
      }, bx)
      return {areaNameList, colors, redSeriesItem, orangeSeriesItem, yellowSeriesItem, blueSeriesItem}
    },
    dataInitLeftTopEchart(data){
      let {areaNameList, colors, redSeriesItem, orangeSeriesItem, yellowSeriesItem, blueSeriesItem} = data
      let xAxisList = areaNameList.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      let option = {
        dataZoom: [
          {
            type: 'inside',
            disabled:  xAxisList.length < 10
          },
          {
            type: "slider", // 监听鼠标滚动但是不显示出
            show: xAxisList.length > 10
          }
        ],
        xAxis: {
          data: xAxisList,
        },
        series: [
          blueSeriesItem, 
          yellowSeriesItem,
          orangeSeriesItem,
          redSeriesItem
        ]
      };
      this.eChartLT.setOption(option);
      window.addEventListener('resize', ()=> this.eChartLT.resize())
      
    },
    initLeftTopEchart (data) {
      let {areaNameList, colors, redSeriesItem, orangeSeriesItem, yellowSeriesItem, blueSeriesItem} = data
      let xAxisList = areaNameList.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      let option = {
        tooltip: {
          trigger: "axis",
          formatter(val, a, b){
            let tip = '', total = 0, area = `<p style="text-align: left;">预警区域：${val[0].data.itemStyle.name}</p>` ,
            spanTotal = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ACEE9;"></span>`
            for (let i = val.length - 1; i >= 0; i--) {
              let item = val[i]
              tip += `<p style="text-align: left;">${item.marker}${item.seriesName}${item.data.value}人</p>`
              total += item.value
            }
            return area + tip + `<p style="text-align: left;">${spanTotal}总预警人数：${total}人</p>`
          },
          axisPointer: {
            type: "shadow",
          }
        },
        legend: Object.assign({
          data: colors
        }, LEGEND_STYLE),
        dataZoom: [
          {
            type: 'inside',
            disabled:  false,
            startValue: 0,
            endValue: 10,
            disabled: true,
          },
          Object.assign({
            type: "slider", // 监听鼠标滚动但是不显示出
            show: false
          }, DATAZOOM_SLIDER)
        ],
        grid: {
          bottom: '1.5%',
          top: '10%',
          left: '0.5%',
          right: '5%',
          containLabel: true
        },
        xAxis: {
          type: "category",
          name: "区\n域\n组",
          data: xAxisList,
          nameGap: 5,
          axisLabel: AXIS_LABEL,
          axisLine: AXIS_LINE,
        },
        yAxis: {
          type: "value",
          name: "预警人数",
          nameGap: 8,
          splitLine: AXIS_SPLIT_LINE,
          axisLabel: {
            fontSize: 8,
            show: true,
            textStyle: AXIS_LABEL_COLOR
          },
          axisLine: AXIS_LINE
        },
        series: [
          blueSeriesItem, 
          yellowSeriesItem,
          orangeSeriesItem,
          redSeriesItem
        ]
      };
      this.eChartLT.setOption(option);
      window.addEventListener('resize', ()=> this.eChartLT.resize() )
    },
    // 

    initLeftBottomEchartSetting(){
      this.initLeftBottomEchart(this.uLeftBottomEchart({}))
    },
    __createLBData(data){
       if (this.useBackEndData) {
        return data
      }
      data = {}
      for (let i = 0, len = 20; i < len; i++) {
        data[Math.round(Math.random()*100000000) + ''] = {
          areaGroupName: '区域区域中区域' + i, //TODO区域名称过长防护
          statisticalTypes: {
            totalNumber: Math.round(Math.random()*200),
            warningNumber: Math.round(Math.random()*100)
          }
        }
      }
      return data
    },
    handleLeftBottomData(data){
      data = this.__createLBData(data)
      this.dataInitLeftBottomEchart(this.uLeftBottomEchart(data))
    },
    uLeftBottomEchart(data){
      let areaGroupNameList = [], 
        seriesTotal = [], 
        seriesWarning = []
      for (const id in data) {
        areaGroupNameList.push(data[id].areaGroupName)
        seriesTotal.push(parseInt(data[id].statisticalTypes.totalNumber))
        seriesWarning.push(parseInt(data[id].statisticalTypes.warningNumber))
      }
      return {areaGroupNameList, seriesTotal, seriesWarning}
    },
    dataInitLeftBottomEchart(data){
      let {areaGroupNameList, seriesTotal, seriesWarning} = data
      let xAxisList = areaGroupNameList.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      seriesTotal = seriesTotal.map(( v, i )=>{
        return {value: v, itemStyle: {name: areaGroupNameList[i]}}
      })
      seriesWarning = seriesWarning.map(( v, i )=>{
        return {value: v, itemStyle: {name: areaGroupNameList[i]}}
      })
      var option = {
        xAxis: {
          name: "区\n域\n组",
          nameGap: 5,
          data: xAxisList,
        },
        dataZoom: [
          {
            type: 'inside',
            disabled: xAxisList.length < 10,
          },
          {
            type: "slider", // 监听鼠标滚动但是不显示出
            show: xAxisList.length > 10,
          }
        ],
        series: [
          {
            type: "bar",
            name:'总人数',
            data: seriesTotal,
            barMaxWidth: 25,
            barCategoryGap:'60%',
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#61f2ff" },
                  { offset: 1, color: "#0064a6" }
                ])
              }
            },
          },
          {
            data: seriesWarning,
            name:'预警人数',
            type: "bar",
            barMaxWidth: 25,
            barCategoryGap:'60%',
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ff3c3c" },
                  { offset: 1, color: "#ffbc40" }
                ])
              }
            }
          }
        ]
      };
      this.eChartLB.setOption(option)
    },
    initLeftBottomEchart(data){
      let {areaGroupNameList, seriesTotal, seriesWarning} = data
      let xAxisList = areaGroupNameList.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      var option = {
        tooltip: {
          trigger: "axis",
          formatter(val, a, b){
            const spanTotal = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ACEE9;"></span>`
            const spanWarning = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FF4A3D;"></span>`
            let circleArr = [spanTotal, spanWarning]
            let tip = ''
            for (let i = 0, len = val.length; i < len; i++) {
              let item = val[i]
              tip += `<p style="text-align: left;">${circleArr[item.seriesIndex]}${item.seriesName + ':'}${item.value}人</p>`
            }
            return `<p style="text-align: left;">预警区域组：${val[0].data.itemStyle.name}</p>${tip}`
          },
          axisPointer: {
            type: "shadow"
          }
        },
        legend: Object.assign({
          data: ["总人数","预警人数"]
        }, LEGEND_STYLE),
        grid: {
          bottom: '1%',
          top: '10%',
          left: '0%',
          right: '5%',
          containLabel: true
        },
        xAxis: {
          name: "区\n域\n组",
          nameGap: 5,
          data: xAxisList,
          axisLabel: AXIS_LABEL,
          axisLine: AXIS_LINE,
        },
        yAxis: {
          name: "人数",
          nameGap: 8,
          splitLine: AXIS_SPLIT_LINE,
          axisLabel: {
            fontSize: 8,
            show: true,
            textStyle: AXIS_LABEL_COLOR
          },
          axisLine:  AXIS_LINE
        },
        dataZoom: [
          {
            type: 'inside',
            startValue: 0,
            endValue: 10,
            disabled: true
          },
          Object.assign({
            type: "slider", // 监听鼠标滚动但是不显示出
            show: false}, DATAZOOM_SLIDER)
        ],
        series: [
          {
            type: "bar",
            name:'总人数',
            data: seriesTotal,
            barMaxWidth: 20,
            barCategoryGap:'60%',
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#61f2ff" },
                  { offset: 1, color: "#0064a6" }
                ])
              }
            },
          },
          {
            data: seriesWarning,
            name:'预警人数',
            type: "bar",
            barMaxWidth: 20,
            barCategoryGap:'60%',
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ff3c3c" },
                  { offset: 1, color: "#ffbc40" }
                ])
              }
            }
          }
        ]
      };
      this.eChartLB.setOption(option);
      window.addEventListener('resize', ()=> this.eChartLB.resize() )
    },

    // 
    initRightTopEchartSetting(){
      this.initRightTopEchart(this.uRightTopEchart({}))
    },
    __createRTData(data){
       if (this.useBackEndData) {
        return data
      }
      data = {}
      for (let i = 0, len = 20; i < len; i++) {
        let temp = []
        let timeBucketInfos = []
        for (let i = 0, len = 12; i < len; i++) {
          let i1 = String((i * 2 + 5) % 24).padStart(2, 0)
          let i2 = String((i * 2 + 2 + 5) % 24).padStart(2, 0)
          timeBucketInfos.push({
            endTimeBucket: `2018-04-14 ${i1}:00:43.333`,
            startTimeBucket: `2018-04-14 ${i2}:00:43.333`,
            timeBucketNameFlag: `timeBucket_${i + 1}`,
            timeBucketPersonNumber: Math.round(Math.random()*300),
          })
        }
        data[Math.round(Math.random()*1000000) + ''] = {
          areaGroupName: '区域三体三体x' + i,
          timeBucketInfos: timeBucketInfos,
        }
      }
      return data
    },
    handleRightTopData(data){
      data = this.__createRTData(data)
      this.dataInitRightTopEchart(this.uRightTopEchart(data))
    },
    uRightTopEchart(data){
      let distance = (this.date[1].getTime() - this.date[0].getTime()) / 12
      let areaGroupNameList = [], yAxisList = [], seriesData = []
      let index = 0
      for (const id in data) {
        areaGroupNameList.push(data[id].areaGroupName)
        let arr = data[id].timeBucketInfos || []
        for (let i = 0, len = arr.length; i < len; i++) {
          let item = arr[i]
          seriesData.push([index, i, parseInt(item.timeBucketCarCount), areaGroupNameList[index]])// 添加层级圆圈的大小标识
        }
        index++
      }
      let t = this.date[0].getTime()
      for (let i = 1, len = 13; i < len; i++) {
        yAxisList.push(this.getMDT(t + i * distance))        
      }
      let startT = this.getMDT(t)
      return {areaGroupNameList, yAxisList, seriesData, startT}
    },
    dataInitRightTopEchart(data){
      let {areaGroupNameList, yAxisList, seriesData, startT} = data
      let eDiv = this.$refs.warningCalendarGraph
      let xAxisList = areaGroupNameList.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      
      // 会报错的b[2]的问题TODO
      let maxPeopleCount = 0
      let minPeopleCount = 0
      yAxisList = yAxisList.length ? yAxisList: (Array.from({length: 12}).map((v, i)=>String(`${i * 2 + 2}:00`).padStart(5, 0)))
      try {
          maxPeopleCount = seriesData.sort((a, b) =>  b[2] - a[2]).slice(0, 1)[0][2]
          minPeopleCount = seriesData.sort( (a, b) => a[2] - b[2]).slice(0, 1)[0][2]
      } catch (e) {
        console.log( '[ RTECHART ] 数据非法' )
      }

      let step = (maxPeopleCount - minPeopleCount)/10
      let level = [minPeopleCount, minPeopleCount+step,  minPeopleCount+step*2, 
        minPeopleCount+step*3,  minPeopleCount+step*4, minPeopleCount+step*5,
        minPeopleCount+step*6,  minPeopleCount+step*7, minPeopleCount+step*8,
        minPeopleCount+step*9, maxPeopleCount]
      let option = {
        tooltip: {
          trigger: 'item',
          formatter(val, a, b){
            val = val.data
            let area = val[0]
            let time = val[1]
            let count = val[2]
            const spanTotal = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4ACEE9;"></span>`
            const spanWarning = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FF4A3D;"></span>`
            return `
              <p style="text-align: left;">区域组：${val[3]}</p>
              <p style="text-align: left;">${spanTotal}时间：${yAxisList[time - 1] || startT}~${yAxisList[time]}</p>
              <p style="text-align: left;">${spanWarning}预警人数：${count}人</p>`
          }
        },
        dataZoom: [
          {
            type: 'inside',
            disabled:  xAxisList.length < 16
          },
          {
            type: "slider",
            show: xAxisList.length > 16
          }
        ],
        xAxis: {
            data: xAxisList
        },
        yAxis: {
          data: yAxisList,
          axisLabel: {
            formatter: function(item, index) {
              if (index === 0) {
                return  `{number|${item}}\n{firstText|${startT}}`;
              }
              return `{number|${item}}\n`;
            }
          },
        },
        series: [
          {
            type: 'scatter',
            symbolSize: function (val, index) {
              for (let i = 0, len = level.length; i < len; i++) {
                if (val[2] == 0)
                  return 0
                if (val[2] <= level[i])
                  return (i > 3? i : 3) * 2.0
              }
            },
            data: seriesData,
          },
          {
            name: 'Top 10',
            type: 'effectScatter',
            data: seriesData.sort(function (a, b) {
              return b[2] - a[2];
            }).reduce(( pre, v, i, arr )=>{
              if (v[2] > 0) {
                if (pre.length < 10) {
                  pre.push(v)
                  return pre
                }else if (v[2] === pre[9][2]) {
                  pre.push(v)
                  return pre
                }
                return pre
              }
              return pre
            }, []),
          }
        ]
      };
      this.eChartRT.setOption(option);
    },
    initRightTopEchart(data){
      let {areaGroupNameList, yAxisList, seriesData, startT} = data
      let eDiv = this.$refs.warningCalendarGraph
      let xAxisList = areaGroupNameList.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      
      // 会报错的b[2]的问题TODO
      let maxPeopleCount = 0
      let minPeopleCount = 0
      yAxisList = yAxisList.length ? yAxisList: (Array.from({length: 12}).map((v, i)=>String(`${i * 2 + 2}:00`).padStart(5, 0)))
      try {
          maxPeopleCount = seriesData.sort((a, b) =>  b[2] - a[2]).slice(0, 1)[0][2]
          minPeopleCount = seriesData.sort( (a, b) => a[2] - b[2]).slice(0, 1)[0][2]
      } catch (e) {
        // console.log( '[ RTECHART ] 数据非法' )
      }
      let step = (maxPeopleCount - minPeopleCount)/10
      let level = [minPeopleCount, minPeopleCount+step,  minPeopleCount+step*2, 
        minPeopleCount+step*3,  minPeopleCount+step*4, minPeopleCount+step*5,
        minPeopleCount+step*6,  minPeopleCount+step*7, minPeopleCount+step*8,
        minPeopleCount+step*9, maxPeopleCount]
      let option = {
        tooltip: {
          trigger: 'item',
        },
        dataZoom: [
          {
            type: 'inside',
            startValue: 0,
            endValue: 15,
            disabled: true,
          },
          Object.assign({
            type: "slider",
            show: false }, DATAZOOM_SLIDER)
        ],
        grid: {
        		bottom: '1.5%',
            left: '1%',
            right: '3%',
            top: '3%',
        		containLabel: true
        },
        xAxis: {
            data: xAxisList,
            nameTextStyle: { color: "#31d2e5" },
            axisLabel: AXIS_LABEL,
            axisTick: { show: false },
            axisLine: {lineStyle: { color: "#0c636b" }},
            splitLine: AXIS_SPLIT_LINE,
        },
        yAxis: {
          data: yAxisList,
          type : 'category',
          splitLine: AXIS_SPLIT_LINE,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0,//要写对位置
            textStyle: AXIS_LABEL_COLOR,
            lineHeight: 24,
            formatter: function(item, index) {
              if (index === 0) {
                return  `{number|${item}}\n{firstText|${startT}}`;
              }
              return `{number|${item}}\n`;
            },
            rich: {
              number: {
                fontSize: 10,
              },
              firstText: {
                fontSize: 10,
                padding: [0, 0, -2, 0]
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: "#0c636b" // 坐标轴颜色
            }
          }
        },
        series: [
          {
            type: 'scatter',
            symbol: 'path://M1024 384c0 282.752-229.248 512-512 512C229.248 896 0 666.752 0 384c0-282.752 229.248-512 512-512S1024 101.248 1024 384zM590.784 310.848',
            symbolSize: function (val, index) {
              for (let i = 0, len = level.length; i < len; i++) {
                if (val[2] == 0)
                  return 0
                if (val[2] <= level[i])
                  return (i > 3? i : 3) * 2.0
              }
            },
            data: seriesData,
            animationDelay: function (idx) {
              return idx * 5;
            },
            itemStyle: {
              normal: {
                // shadowColor: 'rgba(25, 100, 150, 0.5)',
                color: 'rgb(91, 233, 255)'
              },
              emphasis: {
              }
            }
          },
          {
            name: 'Top 10',
            type: 'effectScatter',
            data: seriesData.sort(function (a, b) {
              return b[2] - a[2];
            }).slice(0, 10).reduce(( pre, v, i, arr )=>{
              if (v[2] > 0) {
                pre.push(v)
                return pre
              }
              return pre
            }, []),
            symbolSize: function (val) {
                return 9;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'fill',
                scale: 4
            },
            itemStyle: {
                normal: {
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    color: 'rgb(91, 233, 255)'
                }
            },
            zlevel: -1
          }
        ]
      };
      this.eChartRT.setOption(option);
      window.addEventListener('resize', ()=> this.eChartRT.resize())
    },

    // 
    __createRBData(data){
       if (this.useBackEndData) {
        return data
      }
      data = []
      let colors = ["red", "orange", "yellow", "blue"]
      for (let i = 0, len = 20; i < len; i++) {
        data.push({
          levelName: '等级三三体三体' + (i + 2),
          levelColor: colors[i % 4],
          carCount: Math.round(Math.random()*100),
        })
      }
      return data
    },
    handleRightBottomData(data) {
      data = this.__createRBData(data)
      this.dataInitRightBottomEchart(this.uRightBottomEchart(data))
    },
    initRightBottomEchartSetting(){
      this.initRightBottomEchart(this.uRightBottomEchart([]))
    },
    uRightBottomEchart(data) {
      let colorMap = {
        red: '#f00',
        orange: '#ff8a00',
        yellow: '#efed51',
        blue: '#0090ff',
      }
      let max = 0
      for (let i = 0, len = data.length; i < len; i++) {
        let item = data[i]
        let carCount = parseInt(item.carCount)
        max = max < carCount? carCount: max
      }
      // max = 1// gai
      let xAxisData = [], markPointData = [], seriesData = []
      
      for (let i = 0, len = data.length; i < len; i++) {
        let item = data[i]
        let value = parseInt(item.carCount)
        xAxisData.push(item.levelName)
        if (max) {
          markPointData.push({
            coord: [i, value - max / 50],
            value: value + '人',
            itemStyle: {
              normal: {color: 'transparent'}
            }
          })
          seriesData.push({
            value: [value, value + max / 50, 0, value ],
            itemStyle: {
              normal: {
                color: colorMap[item.levelColor],
                borderColor: colorMap[item.levelColor]
              }
            }
          })
        }else {
          markPointData.push({
            coord: [i, value - max / 50],
            value: '',
            itemStyle: {
              normal: {color: 'transparent'}
            }
          })
          seriesData.push({
            value: [value, value + 1 / 50, 0, value ],
            itemStyle: {
              normal: {
                color: colorMap[item.levelColor],
                borderColor: colorMap[item.levelColor]
              }
            }
          })
        }
      }
      max = max ? max : 1
      return {xAxisData, markPointData, seriesData, max}
    },
    dataInitRightBottomEchart(data) {
      let {xAxisData, markPointData, seriesData, max} = data
      seriesData =  seriesData.map(( v, i ) => Object.assign(v, {name: xAxisData[i]}))
      let xAxisList = xAxisData.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      let option = {
        grid: { bottom: '-3%',},
        xAxis: {
          type: "category",
          data: xAxisList,
        },
        yAxis: {
          max: max ? parseFloat((max + max / 30).toFixed(2)) : 1,
        },
        series: [
          {
            type: 'candlestick',
            data: seriesData,
            markPoint: {
                data: markPointData
            },
          }
        ]
      }
      this.eChartRB.setOption(option)
    },
    initRightBottomEchart(data) {
      let {xAxisData, markPointData, seriesData} = data
      
      let xAxisList = xAxisData.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
      })
      let option = {
        tooltip: {
          trigger: "axis",
          formatter(val, a, b){
            let one = val[0]
            return `<p style="text-align: left;">等级名称：${one.data.name}</p>
              <p style="text-align: left;">${one.marker}预警人数：${one.value[one.value.length - 1]}人</p>`
          },
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
            bottom: '3%',
            left: '0%',
            right: '3%',
            top: '8%',
        		containLabel: true
        },
        xAxis: {
          type: "category",
          data: xAxisList,
          boundaryGap : true,
          axisLabel: Object.assign({ rotate: 40, }, AXIS_LABEL),
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: AXIS_LINE,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: 'candlestick',
            data: seriesData,
            barMaxWidth: 30,
            markPoint: {
              data: markPointData
            },
          }
        ]
      }
      this.eChartRB.setOption(option);
      window.addEventListener('resize', ()=> this.eChartRB.resize())
    },
    eSelectDateRange() {
      this._getData()
    },
    eToBack() {
      this.$router.push({ name: "cartWarning" });
    },
     //tip fn
    mCatchException(e, nocatchDesc = '请检查您的网络是否异常！'){
      return errorException(this, e, nocatchDesc)
    },
  }
};
</script>
<style lang="scss">
.top_bg > .el-container > .warning-echart > main.el-main {
  border: none;
  box-shadow: none;
}
@mixin h100 {
  height: 100%;
}
.warning-echart {
  main.el-main {
    background-image: url("../../assets/images/chart_bg.png");
    background-position: center center;
    padding: 5px;
  }
  div.btn {
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
  .date {
    margin-left: 30px;
    background-image: url("../../assets/images/chart_timeSearch_bg.png");
    padding: 10px;
    padding-top: 13px;
    width: 330px;
    box-sizing: border-box;
    .el-date-editor {
      background-color: transparent;
      border: none;
      width: 100%;
      .el-range-input {
        background-color: transparent;
        color: #fff;
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
        margin-left: -4px;
      }
      .el-range__close-icon {
        position: absolute;
        right: -4px;
      }
    }
  }
  .box {
    position: absolute;
    // new
    left: 20px;
    right: 10px;
    top: 70px;
    bottom: 0px;
    // new
    // margin-top: 15px;
    > div {
      width: 50%;
      box-sizing: border-box;
      // new
      height: 52%;
      padding: 10px 0;
      // new
      position: relative;
      &:nth-child(odd) {
        padding-right: 5px;
      }
      &:nth-child(2n) {
        padding-left: 5px;
      }
      &:nth-child(n + 3) {
        // margin-top: 15px;
        // new
        height: 48%;
      }
      > div {
        background-size: 100% 100%;
        background-position: left top;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding: 10px 0px 2px 0px;
      }
      h3 {
        color: #40edfe;
        font-size: 16px;
        font-weight: normal;
        position: absolute;
        left: 8%;
        // top: -14px;
        top: 0;
      }
    }
  }
  .left-top-echart {
    > div {
      background-image: url("../../assets/images/chart_part1_bg.png");
      // height: 380px;
      @include h100;
    }
  }
  .right-top-echart {
    > div {
      background-image: url("../../assets/images/chart_part1_bg.png");
      // height: 380px;
      @include h100;
    }
  }
  .left-bottom-echart {
    > div {
      background-image: url("../../assets/images/chart_part2_bg.png");
      // height: 350px;
      @include h100;
    }
  }
  .right-bottom-echart {
    > div {
      background-image: url("../../assets/images/chart_part2_bg.png");
      // height: 350px;
      @include h100;
    }
  }
}
</style>