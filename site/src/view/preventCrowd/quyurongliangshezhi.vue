<template>
  <div class="earlyWarningSetting">
    <el-main class="app-main table-page">
      <el-menu :default-active="path" :router="true" class="el-menu-demo" mode="horizontal" text-color="#5a5a5a" active-text-color="#409eff">
        <el-menu-item index="/preventCrowd/areaCapacity">区域容量设置</el-menu-item>
        <el-menu-item index="/preventCrowd/equipCapacity">设备视角容量设置</el-menu-item>
        <el-menu-item index="/preventCrowd/dealInfo">处理信息设置</el-menu-item>
      </el-menu>
      <div class="container">
        <div>
          <p class="instruction">设置预警颜色的处理信息，达到预警值后将提示预警处理信息</p>
          <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <ul class="areaListContent">
              <li :class="{active: o === 1}" v-for="o in 10" :key="o">
                <h2>区域名称区域名称</h2>
                <ul class="capacityContent">
                  <li>
                    <el-form :label-position="'left'" label-width="80px" :model="formLabelAlign">
                      <el-form-item label="区域容量">
                        <el-input v-model="formLabelAlign.name" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="等级名称">
                        <el-input v-model="formLabelAlign.region" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="等级名称">
                        <el-input v-model="formLabelAlign.type" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="等级名称">
                        <el-input v-model="formLabelAlign.type" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="等级名称">
                        <el-input v-model="formLabelAlign.type" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="等级名称">
                        <el-input v-model="formLabelAlign.type" size="small"></el-input>
                      </el-form-item>
                      <el-form-item label="等级名称">
                        <el-input v-model="formLabelAlign.type" size="small"></el-input>
                      </el-form-item>
                    </el-form>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="tp-page">
              <el-pagination
                background
                layout="prev, pager, next, jumper"
                :total="allCount"
                @current-change="currentPageChange"
                :page-size="10"
              ></el-pagination>
              <el-form-item style="float: right; margin-top: -3px;">
                <el-button size="small" type="primary" @click="submitForm('numberValidateForm')">保存</el-button>
                <el-button size="small" @click="resetForm('numberValidateForm')">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        numberValidateForm: {},
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        allCount: 100
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      currentPageChange () {},
      getAreaCapacityCfgPage () {
        this.$axios.post('/areaCapacityCfg/getAreaCapacityCfgPage/0/10')
          .then(data => {
            console.log(data.data)
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    },
    mounted () {
      this.getAreaCapacityCfgPage()
    },
    computed: {
      path () {
        return this.$route.path.match(/^(\/\w+\/\w+)/)[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .earlyWarningSetting {
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
          padding-bottom: 5px;
          text-align: left;
          font-size: 12px;
          color: #999;
        }
        .areaListContent {
          height: 692px;
          overflow-y: scroll;
          >li {
            float: left;
            box-sizing: border-box;
            width: 290px;
            height: 310px;
            margin: 0 36px 36px 0;
            border: 1px solid #dfe9f4;
            border-radius: 6px;
            text-align: left;
            &.active {
              border: none;
              box-shadow: 0 0 12px rgba(217, 228, 248, .5);
            }
            h2 {
              height: 46px;
              line-height: 46px;
              padding-left: 20px;
              color: #409eff;
              font-size: 16px;
            }
            .capacityContent {
              height: 260px;
              overflow-y: scroll;
              li {
                .el-form-item {
                  margin: 0;
                  box-sizing: border-box;
                  height: 49px;
                  padding: 0 36px 17px 20px;
                  font-size: 14px;
                }
              }
            }
          }
        }
        .tp-page {
          overflow: hidden;
          > div {
            margin-right: 40px;
            padding: 20px 0;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "../../common/css/tablePageCommon.scss";
</style>
