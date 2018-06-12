<template>
  <div id="map" class="ps-container wifi">
    <el-main id="person-track" style="padding: 0;">
      <div id="allmap">
        <div class="search">
					<div class="s-left">
						<div class="mac">
							<el-input
								placeholder="请输入MAC地址"
								v-model="MACS">
							</el-input>
              <i class="el-icon-close" @click="eClearMACS" v-show="!!MACS.length"></i>
						</div>
					</div>
					<div class="s-right">
						<div class="date">
							<el-date-picker
								v-model="date"
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
						<el-button size="small" type="primary" @click="eStartAnalysis">开始分析</el-button>
					</div>
				</div>
        <div class="cvCont" :class="{active: cvState.grabbing}" ref="cvCont">
          <canvas id="cv" ref="cv"></canvas>
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
      date: [],
      MACS: "",
      pickerOptionsRange: pickerOptionsRange,
      cvState: {
        grabbing: false
      },
      ctx: null,
      fullScreen: false
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  watch: {},
  methods: {
    eClearMACS() { this.MACS = ''	},
    eStartAnalysis() {
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
    init() {
      this.$refs.cv.width = 2880;
      this.$refs.cv.height = 1620;
      this.ctx = this.$refs.cv.getContext("2d");
      watchDrag(this.$refs.cvCont, this.cvState, this.fullScreen);
      drawLine("cv");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./css/trackRepaint.scss";
</style>
<style lang="scss">
@import "./css/wifiInput.scss";
</style>

