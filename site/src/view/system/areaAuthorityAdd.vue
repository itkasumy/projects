<template>
  <div class="areaAuthority-add">
    <el-main>
      <div class="add-page">
        <div class="ap-border">
          <h2 class="ap-title">新增区域分组</h2>
          <ul>
            <li>
              <span>分组名称<i class="red">*</i></span>
              <el-input placeholder="请输入分组名称" v-model="areaGroupName" @keyup.native="excNameRegSearch(areaGroupName)" size="small" clearable></el-input>
            </li>
            <li>
              <span>选择区域名称<i class="red">*</i></span>
              <el-checkbox-group v-model="areasCheckedList" :min="min" :max="max">
                <el-tooltip v-for="item in areaList" class="item" effect="dark" :open-delay="1200" :content="item.areaName" placement="top-start" :key="item.areaId">
                  <el-checkbox @click.native.stop="checkLen" :label="item.areaId">{{item.areaName}}</el-checkbox>
                </el-tooltip>
              </el-checkbox-group>
            </li>
            <li>
              <span>备注</span>
              <el-input type="textarea" placeholder="请输入备注文本" v-model="areaGroupRemark" resize="none" :rows="4" clearable></el-input>
            </li>
          </ul>
          <div class="ap-btns">
            <el-button size="small" type="primary" @click="submit">保存</el-button>
            <el-button size="small" type="default" @click="cancle">取消</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        areaGroupName: '',
        areaGroupRemark: '',
        areaList: [],
        areasCheckedList: [],
        min: 1,
        max: 6
      }
    },

    methods: {
      getAreaList () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios
          .post('/info/area/getAllSysArea')
          .then(data => {
            const areaList = []
            data.data.forEach(item => {
              areaList.push({
                areaName: item.areaName,
                areaId: item.areaId
              })
            })
            this.areaList = areaList
            loading.close()
          })
          .catch(err => {
            if (err.response) {
               this.$message({
                type: 'error',
                message: err.response.data.message,
                center: true
              })
            }
            loading.close()
          })
      },
      submit () {
        const checkedList = []
        this.areasCheckedList.forEach(item => {
          checkedList.push({areaId: item})
        })
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        if (!/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}$/.test(this.areaGroupName) && this.areaGroupName.length < 1) {
          this.$message({
            message: '分组名称不合法',
            type: 'warning',
            center: true
          })
          setTimeout(() => {
            loading.close()
          }, 2000)
          return
        }
        // if (checkedList.length < this.min) {
        //   this.$message({
        //     message: `请至少选择${this.min}个区域名称`,
        //     type: 'warning',
        //     center: true
        //   })
        //   setTimeout(() => {
        //     loading.close()
        //   }, 2000)
        //   return
        // }
        this.$axios
          .post('/info/areagroup/createAreaGroup', {
            areaGroupName: this.areaGroupName,
            areaGroupRemark: this.areaGroupRemark,
            areaList: checkedList
          })
          .then(data => {
            this.$message({
              message: '添加成功',
              type: 'success',
              center: true
            })
            loading.close()
          })
          .catch(err => {
            if (err.response) {
               this.$message({
                type: 'error',
                message: err.response.data.message,
                center: true
              })
            }
            loading.close()
          })
        setTimeout(() => {
          this.$router.push({name: 'areaAuthority'})
        }, 0)
      },
      cancle () {
        this.$router.push({name: 'areaAuthority'})
      },
      excNameRegSearch (val) {
        if (!/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}$/.test(val) && val.length > 0) {
          this.$message({
            message: '请使用"汉字"、"字母"、"数字"、"_"、"-"（1-15个字符）',
            type: 'warning',
            center: true
          })
          this.areaGroupName = val.match(/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}/)[0]
        }
      },
      checkLen () {
        if (this.areasCheckedList.length >= this.max) {
          this.$message({
            message: `最多可以选择${this.max}个区域`,
            type: 'warning',
            center: true
          })
        }
      }
    },

    created () {
      this.getAreaList()
    }
  }
</script>

<style lang="scss" scoped>
  .el-main {
    .add-page {
      height: 740px;
      // overflow-y: scroll;
      border: none;
      padding-bottom: 60px;
      .ap-border {
        margin: 0;
        padding-left: 80px;
        .ap-title {
          padding-top: 50px;
        }
        li {
          span {
            color: #5a5a5a;
          }
        }
      }
      .ap-btns {
        width: 500px;
        margin: 0;
      }
      .el-checkbox {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../common/css/addPageCommon.scss";
  .red {
    color: red;
    line-height: 32px;;
  }
  .areaAuthority-add {
    .el-checkbox__label {
      color: #868686;
    }
    .el-checkbox-group {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding-left: 10px;
      max-height: 290px;
      overflow-y: scroll;
    }
    .el-button+.el-button {
      margin-left: 30px;
    }
  }
</style>
