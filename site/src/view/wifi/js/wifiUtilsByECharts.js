import echarts from "echarts"

const GRID = {
	bottom: '0%',
	left: '0%',
	right: '0%',
	top: '0%',
	containLabel: false
}

const X_AXIS = {
	show: false,
	boundaryGap : false,
	position: 'top',
	type: "category",
}
const Y_AXIS = {
	show: false,
	boundaryGap : false,
	inverse: true,
	type: "category",
}

const getColor = () => `rgb(${ Math.round(Math.random()*155 + 100) },${ Math.round(Math.random()*155 + 100) },${Math.round(Math.random()*155 + 100) })`


const HIGH_LIGHT_COLOR = 'red'
const POINT_SIZE = 10


/**
 * @param {放置echart的容器} echartDiv 
 * 
 * option = {
 * 		data: [],//二维数组
 * 		macArr: []
 * 		width: 2880,
 * 		height: 1620
 * }
 * 
 */
const WifiTrack = function (echartDiv, option) {
	if (!(typeof echartDiv === 'object' && typeof echartDiv.nodeName === 'string'))
		throw new Error('您传入的不是dom元素！')

	let echartInstance = echarts.init(echartDiv)
	this._echart_ = this.echartInstance = echartInstance
	
	this.init(option)
}

WifiTrack.prototype = {
	init: function (option) {
		let series = this.handleParams(option)
		this.initBaseSetting(series)
		this.highLight_Hover()
		this.keepHighLight_Click()
	},
	clear: function () {
		this.echartInstance.clear()
	},

	setOption: function (data, index) {
		this.setOption2(data, index)
	},
	setOption2: function (data, index) {
		let option = {
			series: [
				{
					name: 'line' + index,
					data: data
				},
				{
					name: 'point' + index,
					data: data,
					markPoint: {
						label: {
							normal: { formatter: param =>  param.value }
						},
						data : [
							{	coord: data[0],	value: '始' }, 
							{	coord: data[data.length - 1],	value: '终' },
							{	coord: data[0], value: this.MAC_ARR[index] || 'mac 地址未知',
								symbolOffset: [0, 45], itemStyle: { normal: {	color: 'transparent'}	} 
							}, 
						]
					},
				}
			]
		}
		this.echartInstance.setOption(option)
	},

	baseSetOption: function (option) {
		let series = []
		let length = Array.isArray(option.data) ? option.data.length: 0
		for (let i = 0; i < length; i++) {
			let color = getColor() 
			let item = option.data[i]
			series.push({
				type: 'line',
				name: 'line' + i,
				data: item,
				symbolSize: 0,
				itemStyle: { normal: {color: color} }
			})
				
			series.push({
				type: 'scatter',
				symbolSize: this.pointSize,
				name: 'point' + i,
				data: item,
				markPoint: {
					label: {
						normal: { formatter: param =>  param.value }
					},
					data : [
						{	coord: item[0],	value: '始',	}, 
						{	coord: item[item.length - 1],	value: '终'},
						{	coord: item[0],	value: this.MAC_ARR[i] || 'mac 地址未知',
							symbolOffset: [0, 45], itemStyle: { normal: {	color: 'transparent'}	}
						}, 
					]
				},
				itemStyle: { normal: {color: color} },
			})
			this.colorsArr[i] = color
		}
		return series
	},
	handleParams: function (option) {

		this.selectedItem = null
		this.colorsArr = [getColor(), getColor()]

		typeof option === 'object' || (option = {})
		this.width = option.width || 2880
		this.height = option.height || 1620

		this.MAC_ARR = option.macArr || []
		this.pointSize = POINT_SIZE

		return this.baseSetOption(option)
	},
	initBaseSetting: function (series) {
		let option = {
			grid: GRID,
			tooltip: {
				formatter: 'Group {a}: ({c})'
			},
			xAxis: [
				Object.assign({}, X_AXIS, {
					data: Array.from({ length: this.width }).map((v, i) => i),
				})
			],
			yAxis: [
				Object.assign({}, Y_AXIS, {
					data: Array.from({ length: this.height }).map((v, i) => i),
				})
			],
			series: series
				// series: [
				// 	{
				// 		name: 'line0',
				// 		type: 'line',
				// 		data: testData[0],
				// 		itemStyle: {
				// 			normal: {
				// 				color: this.colorsArr[0]
				// 			}
				// 		}
				// 	},
				// 	{
				// 		symbolSize: 15,
				// 		name: 'point0',
				// 		type: 'scatter',
				// 		itemStyle: {
				// 			normal: {
				// 				color: this.colorsArr[0]
				// 			}
				// 		},
				// 		data: testData[0]
				// 	}, 
				// 	{
				// 		name:'line1',
				// 		type:'line',
				// 		data: testData[1],
				// 		itemStyle: {
				// 			normal: {
				// 				color: this.colorsArr[1]
				// 			}
				// 		}
				// 	},
				// 	{
				// 		symbolSize: 15,
				// 		name: 'point1',
				// 		type: 'scatter',
				// 		itemStyle: {
				// 			normal: {
				// 				color: this.colorsArr[1]
				// 			}
				// 		},
				// 		data: testData[1]
				// 	}, 
				// ]
		}
		this.echartInstance.setOption(option);
	},
	changeColor: function (name, color) {
		this.echartInstance.setOption({
			series: [{
					name: name,
					itemStyle: {
						normal: { color: color }
					}
				}
			]
		})
	},
	highLight_Hover: function () {
		this.echartInstance.on('mouseover', ( params )=>{
			this.changeColor(`line${params.seriesName.slice(-1)}`, HIGH_LIGHT_COLOR)
			this.changeColor(params.seriesName, HIGH_LIGHT_COLOR)
		})
		this.echartInstance.on('mouseout', ( params )=>{
			if (params.seriesName.slice(-1) === this.selectedItem) 	return

			let itemIndex = params.seriesName.slice(-1)
			this.changeColor(`line${params.seriesName.slice(-1)}`, this.colorsArr[itemIndex])
			this.changeColor(params.seriesName, this.colorsArr[itemIndex])
		})
	},
	keepHighLight_Click: function () {
		this.echartInstance.on('click', ( params )=>{
			let itemIndex = this.selectedItem, pointName = params.seriesName

			itemIndex !== null && this.changeColor(`line${itemIndex}`, this.colorsArr[itemIndex])
			itemIndex !== null && this.changeColor(`${pointName.slice(0, -1)}${itemIndex}`, this.colorsArr[itemIndex])

			this.selectedItem = pointName.slice(-1)

			this.changeColor(`line${pointName.slice(-1)}`, HIGH_LIGHT_COLOR)
			this.changeColor(pointName, HIGH_LIGHT_COLOR)
		})
	}
}


export { WifiTrack }

