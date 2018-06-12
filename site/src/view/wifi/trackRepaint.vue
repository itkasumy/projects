<template>
  <div id="map" class="ps-container wifi">
    <el-main id="person-track" style="padding: 0;">
      <div id="allmap">
        <div class="search">
					<div class="s-left">
						<div class="mac">
              <el-input
                placeholder="MAC地址 , 以英文逗号分开 , 最多十个MAC"
                v-model="MACS">
              </el-input>
              <i class="el-icon-close" @click="MACS=''" v-show="!!MACS.length"></i>
						</div>
					</div>
					<div class="s-right">
						<div class="date">
							<el-date-picker
								v-model="selectedTime"
								type="datetimerange"
								:editable="false"
								size="mini"
								:time-arrow-control="true"
								:picker-options="pickerOptionsRange"
								popper-class="cart-track-fs-datepicker"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								value-format="yyyy-MM-dd HH:mm:ss"
								prefix-icon="el-icon-date"
								:appendToBody="false"
								align="left">
							</el-date-picker>
						</div>
					</div>
					<div class="action">
						<el-button size="small" type="primary" @click="startDrawTrack">轨迹重绘</el-button>
					</div>
          <div class="checked">
            <el-checkbox v-model="checkedAtOnce">立即查看</el-checkbox>
          </div>
				</div>
        <div class="cvCont" :class="{active: cvState.grabbing}" ref="cvCont">
          <canvas id="cv" ref="cv"></canvas>
          <ul class="cvCicle" v-for="(item, index, i) in coordinateData" :key="index" :class="index===selectedMac?'selectedCvCicle':''">
            <!-- <li v-for="(ele, subIndex) in item" :key="subIndex" :style="{ left: (ele.x - 5)+'px', top: (ele.y - 5)+'px' }" @click="cicleClick(index)"></li> -->
            <li v-for="(ele, subIndex) in item" :key="subIndex" :style="{ left: (ele.x - 5)+'px', top: (ele.y - 5)+'px' }" @click="cicleClick(index, subIndex)">
              <img @click="clickImg" :src="'../../../static/images/color/'+ lineColor[i % 8].slice(1) +'.png'" v-show="subIndex===(item.length-1) && index!==selectedMac"/>
              <img src="../../../static/images/color/ff0000.png" v-show="subIndex===(item.length-1) && index===selectedMac"/>
              <span v-show="subIndex===(item.length-1) && index!==selectedMac" :style="{color: lineColor[i % 8]}">{{ index }}</span>
              <span v-show="subIndex===(item.length-1) && index===selectedMac">{{ index }}</span>
              <div v-show="index===selectedMac && subIndex===selectedCicle">{{ index }}</div>
            </li>
          </ul>
        </div>
      </div>
    </el-main>  
  </div>
</template>

<script>
import { watchDrag, drawLine, createData } from '@/view/wifi/js/trackRepaint'
import pickerOptionsRange from "./js/pickerOptionsRange"
import {errorException, successTip, errorTip, confirmModal} from './js/tip'
export default {
  data () {
    return {
      cvState: {
        grabbing: false
      },
      ctx: null,
      fullScreen: false,
      coordinateData: null,
      selectedTime: [],
      MACS: '',
      pickerOptionsRange: pickerOptionsRange,
      selectedMac: null,
      selectedCicle: null,
      lineColor: ['#57d046', '#f8b551', '#69b9ff', '#d563ce', '#53d8da', '#cbd04b', '#f45c8e', '#f6703b', '#48e4b3', '#6879f9'],
      checkedAtOnce: true
    }
  },
  created () {
    this.coordinateData = createData()
  },
  mounted () {
    this.init()
    drawLine('cv', this.coordinateData, null)
  },
  watch: {},
  methods: {
    init () {
      this.$refs.cv.width = 2880
      this.$refs.cv.height = 1620
      this.ctx = this.$refs.cv.getContext('2d')
      watchDrag(this.$refs.cvCont, this.cvState, this.fullScreen)
    },
    cicleClick (index, subIndex) {
      this.selectedMac = index
      this.selectedCicle = subIndex
      drawLine('cv', this.coordinateData, index)
    },
    clickImg () {
      console.log('img')
    },
    startDrawTrack () {
      if(this.MACS) {
        let macItem = this.MACS.split(',')
        let reg = /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/
        macItem.forEach(item => {
          if(!reg.test(item)) {
            errorTip(this, 'MAC地址有误!')
            return
          }
        })
      }
      if(this.selectedTime.length!==2){
        errorTip(this, '您还没有选择日期!')
        return
      }
      const url = ``
      let params = {
        'macs': this.MACS,
        'starttime': selectedTime[0],
        'endTime': selectedTime[1]
      }
      this.$axios.post(url, params).then(res => {
        console.log(res.data)
      }).catch( res =>{
        console.log(res)
      })
    },
  }
}
</script>

<style lang="scss" >
  @import "./css/trackRepaint.scss";
</style>
