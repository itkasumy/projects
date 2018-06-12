<template>
  <div class="dealInfo">
    <el-main class="app-main table-page">
      <el-menu :default-active="path" :router="true" class="el-menu-demo" mode="horizontal" text-color="#5a5a5a" active-text-color="#409eff">
        <el-menu-item index="/preventCrowd/areaCapacity">区域容量设置</el-menu-item>
        <el-menu-item index="/preventCrowd/equipCapacity">设备视角容量设置</el-menu-item>
        <el-menu-item index="/preventCrowd/dealInfo">处理信息设置</el-menu-item>
      </el-menu>
      <div class="container">
        <p class="instruction">设置预警颜色的处理信息，达到预警值后将提示预警处理信息</p>
        <div class="soluteCont">
          <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item v-for="item in warningList" :key="item.id">
              <div class="warningClass">
                <div class="warningTitle">{{`${item.showColor === 'green' ? '绿色' : item.showColor === 'red' ? '红色' : item.showColor === 'yellow' ? '黄色' : item.showColor === 'orange' ? '橙色' : '蓝色'}预警`}}</div>
                <div class="warningColor" :class="item.showColor"></div>
              </div>
              <div class="processInfo">
                <div class="processTitle">处理信息</div>
                <el-input type="textarea" :rows="2" placeholder="显示默认处理信息" @keyup.native="delExec(ruleForm['lv' + item.alertLevel]['handlerInfo'],  item.alertLevel)" v-model="ruleForm['lv' + item.alertLevel]['handlerInfo']" resize="none" :class="{warning: ruleForm['lv' + item.alertLevel]['warning']}"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" size="small">保存</el-button>
              <el-button @click="resetForm" size="small">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  import { calcAlphaLen } from '@/common/js/createPolygon'

  export default {
    data () {
      return {
        ruleForm: {
          lv0: {
            alertLevel: 0,
            handlerInfo: '',
            id: '',
            showColor: '',
            warning: false
          },
          lv1: {
            alertLevel: 1,
            handlerInfo: '',
            id: '',
            showColor: ''
          },
          lv2: {
            alertLevel: 2,
            handlerInfo: '',
            id: '',
            showColor: '',
            warning: false
          },
          lv3: {
            alertLevel: 3,
            handlerInfo: '',
            id: '',
            showColor: '',
            warning: false
          },
          lv4: {
            alertLevel: 4,
            handlerInfo: '',
            id: '',
            showColor: '',
            warning: false
          }
        },
        warningList: [],
        rule1: true,
        rule2: true,
        rule3: true,
        rule4: true
      }
    },
    methods: {
      init () {
        this.$axios(`/tread/alertCfgTb/alertCfgList?timeStemp=${+new Date()}`)
          .then(data => {
            const arr = data.data
            arr.reverse().pop()
            this.warningList = arr
            arr.forEach(item => {
              for (let itm in this.ruleForm) {
                if (item.alertLevel === this.ruleForm[itm]['alertLevel']) {
                  this.ruleForm[itm]['handlerInfo'] = item.handlerInfo
                  this.ruleForm[itm]['id'] = item.id
                  this.ruleForm[itm]['showColor'] = item.showColor
                  this.ruleForm[itm]['warning'] = false
                }
              }
            })
          })
          .catch(err => {})
      },
      submitForm () {
        const resArr = []
        for(let i in this.ruleForm) {
          resArr.push({
            id: this.ruleForm[i]['id'],
            handlerInfo: this.ruleForm[i]['handlerInfo']
          })
        }
        resArr.shift()
        if (!(this.rule1 && this.rule2 && this.rule3 && this.rule4)) {
          this.$message({
            type: 'error',
            message: '您有输入内容超出长度，最多输入200个字符，一个中文算两个字符',
            center: true
          })
          return
        }
        this.$axios({
          method: 'post',
          url: `/tread/alertCfgTb/updateBatchAlertCfgTb?timeStemp=${+new Date()}`,
          data: resArr
        })
        .then(data => {
          this.$message({
            type: 'success',
            message: '保存成功',
            center: true
          })
        })
        .catch(err => {})
      },
      resetForm () {
        this.init()
      },
      delExec (val, lv) {
        if (calcAlphaLen(val) > 200) {
          this.$message({
            type: 'error',
            message: '输入内容超出长度，最多输入200个字符，一个中文算两个字符',
            center: true
          })
          this.ruleForm[`lv${lv}`]['warning'] = true
          this[`rule${lv}`] = false
        } else {
          this.ruleForm[`lv${lv}`]['warning'] = false
          this[`rule${lv}`] = true
        }
      }
    },
    mounted () {
      this.init()
    },
    computed: {
      path () {
        return this.$route.path.match(/^(\/\w+\/\w+)/)[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dealInfo {
    .el-main {
      padding: 20px;
      .el-menu-item {
        height: 34px;
        line-height: 32px;
        font-size: 18px;
      }
      .container {
        .instruction {
          height: 42px;
          line-height: 42px;
          padding-bottom: 10px;
          text-align: left;
          font-size: 12px;
          color: #999;
        }
        .soluteCont {
          width: 784px;
          .el-form-item {
            margin-bottom: 0;
            .el-form-item__content {
              .warningClass {
                display: flex;
                .warningTitle {
                  width: 56px;
                  height: 50px;
                  line-height: 38px;
                  padding-right: 30px;
                  color: #5a5a5a;
                  font-size: 14px;
                }
                .warningColor {
                  width: 36px;
                  height: 36px;
                  &.red {
                    background: #f00;
                  }
                  &.orange {
                    background: #ff8a00;
                  }
                  &.yellow {
                    background: #ffeca2;
                  }
                  &.green {
                    background: #32de4f;
                  }
                  &.blue {
                    background: #0090ff;
                  }
                }
              }
              .processInfo {
                display: flex;
                .processTitle {
                  width: 56px;
                  height: 126px;
                  line-height: 18px;
                  padding-right: 30px;
                  color: #909090;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "../../common/css/tablePageCommon.scss";
  .dealInfo {
    .processInfo {
      .el-textarea__inner {
        height: 75px;
      }
      .warning {
        .el-textarea__inner {
          border-color: #f20;
        }
      }
    }
    .el-form-item:nth-last-child(1) {
      text-align: left;
    }
  }
</style>
