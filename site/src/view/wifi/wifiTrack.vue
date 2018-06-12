<template>
  <div class="wifi-track wifi">
    <el-main id="map" style="padding: 0;">
      <div id="allmap">
				<div class="search">
					<div class="s-left">
						<div class="mac">
							<el-input
								placeholder="请输入MAC地址"
								v-model="MACS">
								<!-- @keyup.native.enter="eStart" -->
							</el-input>
							<i class="el-icon-close" @click="eClearMACS" v-show="!!MACS.length"></i>
						</div>
					</div>
					<div class="action">
						<el-button size="small" type="primary" @click="startAndStop">{{isRunning? '暂停': '开始'}}</el-button>
					</div>
				</div>

        <div class="cvCont" :class="{active: cvState.grabbing}" ref="cvCont">
					<div ref="echart" class="echart"></div>
        </div>
      </div>
    </el-main>  
  </div>
</template>
<script>
import echarts from "echarts"
import pickerOptionsRange from "./js/pickerOptionsRange"
import { WifiTrack } from './js/wifiUtilsByECharts'
import { watchDrag, drawLine, createData } from './js/trackRepaint'
import {errorException, successTip, errorTip, confirmModal} from './js/tip'
export default {
	data() {
		 return {
      cvState: { grabbing: false },
			EChartInstance: null,

			date: [],
			MACS: '',
			pickerOptionsRange: pickerOptionsRange,
			isRunning: false,

			timeId: ''
		}
	},
  mounted () {
		this.init()
		let div = this.$refs.cvCont
		this.initEChart()

  },
  methods: {
		eClearMACS() { this.MACS = ''	},

		startAndStop() {
			this.isRunning ? this.eStop(): this.eStart()
			this.isRunning = !this.isRunning
		},
		eStart() {
			if (!this.validateMac()) {
				errorTip(this, 'mac地址不合法，请重输！')
				return
			}
		},
		validateMac() {
			let mac = this.MACS.slice(-1) === ',' ? this.MACS: this.MACS + ','
			let reg = /^([A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}[\,]{1})+$/i
			if (!this.MACS || reg.test(mac)) 
				return true
			return false
		},

		eStop() {
			clearInterval(this.timeId)
		},





		initEChart() {
			let x = new WifiTrack(this.$refs.echart, {
				data: [
					[[444,1077],[767,1197],[756,943],[1028,1000],[1044,797],[1198,717],[1271,674],[1320,617],[1419,543],[1493,507],[1549,469]],
					[[761,1208],[873,1136],[961,976],[1064,1000],[1239,859],[1320,800],[1242,883],[1128,944],[1044,996],[901,1090],[814,1160]]
				],
				macArr: ['192.168.0.1', '192.168.0.2']
			})

			x._echart_.on('click', ( e )=>{
				console.log( e, 'jinyue...clic----k' )
			})
			x._echart_.on('click', ( e )=>{
				console.log( e, 'jinyue00000000k' )
			})
		},
		initEChart_() {
			let _this = this
			var dataAll = [
				[
					[12, 43],
					[40, 85],
					[16, 15],
					[32, 2],
					[18, 18],
				],
				[
					[22, 23],
					[30, 15],
					[22, 42],
					[78, 28],
				]
			]
			var option = {
				grid: {
					bottom: '0%',
					left: '0%',
					right: '0%',
					top: '0%',
					containLabel: false
				},
				tooltip: {
					// formatter() {
					// 	_this.EChartInstance.setOption({
					// 		series: [
					// 			{
					// 				name:'邮件营销',
					// 				type:'line',
					// 				itemStyle: {
					// 					normal: {
					// 						color: '#ffaa00'
					// 					}
					// 				}
					// 			},
					// 		]
					// 	});
					// 	return '132'
					// }
					formatter: 'Group {a}: ({c})'
				},
				xAxis: [
					{
						data: Array.from({length: 100}).map((v, i) => i),
						boundaryGap : false,
						show: false,
						position: 'top'
					}
				],
				yAxis: [
					{
						show: false,
						inverse: true,
						type: "category",
						data: Array.from({length: 100}).map((v, i) => i),
						boundaryGap : false,
					}
				],
				series: [
					{
						name:'line1',
						type:'line',
						data:dataAll[0],
						itemStyle: {
							normal: {
								color: '#fff'
							}
						}
				 	},
					{
						symbolSize: 15,
						name: 'point1',
						type: 'scatter',
						itemStyle: {
							normal: {
								color: 'red'
              }
            },
						data: dataAll[0]
					}, 
					{
						name:'line2',
						type:'line',
						data:dataAll[1],
						itemStyle: {
							normal: {
								color: 'yellow'
							}
						}
					},
					{
						symbolSize: 15,
						name: 'point2',
						type: 'scatter',
						itemStyle: {
              normal: {
                color: 'pink'
              }
            },
						data: dataAll[1]
						// data: []
					}, 
				]
			};
			this.EChartInstance.setOption(option);
			this.EChartInstance.on('mouseover', ( e )=>{
				console.log( e, 'jinyue...xover...' )
			})
			this.EChartInstance.on('mouseout', ( e )=>{
				console.log( e, 'jinyue...xout' )
			})
			this.EChartInstance.on('click', ( e )=>{
				console.log( e, 'jinyue...click' )
			})
			setTimeout(() => {
				// this.EChartInstance.clear()
			}, 2000);
			window.addEventListener('resize', ()=> this.EChartInstance.resize())
			
		},

		initEChart__(data) {
			let {xAxisData, markPointData, seriesData} = {"xAxisData":["等级三三体三体2","等级三三体三体3","等级三三体三体4","等级三三体三体5","等级三三体三体6","等级三三体三体7","等级三三体三体8","等级三三体三体9","等级三三体三体10","等级三三体三体11","等级三三体三体12","等级三三体三体13","等级三三体三体14","等级三三体三体15","等级三三体三体16","等级三三体三体17","等级三三体三体18","等级三三体三体19","等级三三体三体20","等级三三体三体21"],"markPointData":[{"coord":[0,66.1],"value":"68人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[1,16.1],"value":"18人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[2,83.1],"value":"85人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[3,65.1],"value":"67人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[4,42.1],"value":"44人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[5,15.1],"value":"17人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[6,65.1],"value":"67人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[7,1.1],"value":"3人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[8,1.1],"value":"3人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[9,89.1],"value":"91人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[10,64.1],"value":"66人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[11,-0.8999999999999999],"value":"1人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[12,38.1],"value":"40人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[13,72.1],"value":"74人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[14,93.1],"value":"95人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[15,61.1],"value":"63人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[16,0.10000000000000009],"value":"2人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[17,41.1],"value":"43人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[18,29.1],"value":"31人","itemStyle":{"normal":{"color":"transparent"}}},{"coord":[19,76.1],"value":"78人","itemStyle":{"normal":{"color":"transparent"}}}],"seriesData":[{"value":[68,69.9,0,68],"itemStyle":{"normal":{"color":"#f00","borderColor":"#f00"}}},{"value":[18,19.9,0,18],"itemStyle":{"normal":{"color":"#ff8a00","borderColor":"#ff8a00"}}},{"value":[85,86.9,0,85],"itemStyle":{"normal":{"color":"#efed51","borderColor":"#efed51"}}},{"value":[67,68.9,0,67],"itemStyle":{"normal":{"color":"#0090ff","borderColor":"#0090ff"}}},{"value":[44,45.9,0,44],"itemStyle":{"normal":{"color":"#f00","borderColor":"#f00"}}},{"value":[17,18.9,0,17],"itemStyle":{"normal":{"color":"#ff8a00","borderColor":"#ff8a00"}}},{"value":[67,68.9,0,67],"itemStyle":{"normal":{"color":"#efed51","borderColor":"#efed51"}}},{"value":[3,4.9,0,3],"itemStyle":{"normal":{"color":"#0090ff","borderColor":"#0090ff"}}},{"value":[3,4.9,0,3],"itemStyle":{"normal":{"color":"#f00","borderColor":"#f00"}}},{"value":[91,92.9,0,91],"itemStyle":{"normal":{"color":"#ff8a00","borderColor":"#ff8a00"}}},{"value":[66,67.9,0,66],"itemStyle":{"normal":{"color":"#efed51","borderColor":"#efed51"}}},{"value":[1,2.9,0,1],"itemStyle":{"normal":{"color":"#0090ff","borderColor":"#0090ff"}}},{"value":[40,41.9,0,40],"itemStyle":{"normal":{"color":"#f00","borderColor":"#f00"}}},{"value":[74,75.9,0,74],"itemStyle":{"normal":{"color":"#ff8a00","borderColor":"#ff8a00"}}},{"value":[95,96.9,0,95],"itemStyle":{"normal":{"color":"#efed51","borderColor":"#efed51"}}},{"value":[63,64.9,0,63],"itemStyle":{"normal":{"color":"#0090ff","borderColor":"#0090ff"}}},{"value":[2,3.9,0,2],"itemStyle":{"normal":{"color":"#f00","borderColor":"#f00"}}},{"value":[43,44.9,0,43],"itemStyle":{"normal":{"color":"#ff8a00","borderColor":"#ff8a00"}}},{"value":[31,32.9,0,31],"itemStyle":{"normal":{"color":"#efed51","borderColor":"#efed51"}}},{"value":[78,79.9,0,78],"itemStyle":{"normal":{"color":"#0090ff","borderColor":"#0090ff"}}}],"max":95}
			let xAxisList = xAxisData.map(( v )=>{
        if (v.length < 6)  return v
        return v.slice(0, 5) + '…'
			})
			console.log( xAxisList, 'jinyue....' )
      let option = {
        grid: {
            bottom: '0%',
            left: '0%',
            right: '0%',
            top: '0%',
        		containLabel: false
        },
        xAxis: {
          type: "category",
					data: xAxisList,
					show: true,
          boundaryGap : true,
          axisLabel: Object.assign({ rotate: 40, }, { //坐标轴文本
						show: true,
						interval: 0,
						rotate: 25,
						fontSize: 9,
						textStyle: {
							color: "#9ed1d8"
						}
					}),
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {lineStyle: { color: "#31d2e5" }},
        },
        yAxis: {
					show: false
        },
        series: [
         	{
						name: '1990',
						data: data[0],
						type: 'scatter',
						symbolSize: function (data) {
								return Math.sqrt(data[2]) / 5e2;
						},
						label: {
								emphasis: {
										show: true,
										formatter: function (param) {
												return param.data[3];
										},
										position: 'top'
								}
						},
						itemStyle: {
								normal: {
										shadowBlur: 10,
										shadowColor: 'rgba(120, 36, 50, 0.5)',
										shadowOffsetY: 5,
										color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
												offset: 0,
												color: 'rgb(251, 118, 123)'
										}, {
												offset: 1,
												color: 'rgb(204, 46, 72)'
										}])
								}
						}
					}
        ]
      }
      this.EChartInstance.setOption(option);
			window.addEventListener('resize', ()=> this.EChartInstance.resize())

		},
    init () {
      watchDrag(this.$refs.cvCont, this.cvState)
    }
  }
    
}
</script>
<style lang="scss">
	@import './css/trackRepaint.scss';
	@import './css/wifiInput.scss';
	.wifi-track {
		.echart {
			height: 100%;
		}
		&.wifi .search .s-left {
			width: 380px;
		}
		&.wifi .search .action {
			left: 390px;
		}
	}
</style>