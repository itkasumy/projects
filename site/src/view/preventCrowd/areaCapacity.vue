<template>
  <div class="areaCapacity">
    <el-main class="app-main table-page">
      <el-menu :default-active="path" :router="true" class="el-menu-demo" mode="horizontal" text-color="#5a5a5a" active-text-color="#409eff">
        <el-menu-item index="/preventCrowd/areaCapacity">区域容量设置</el-menu-item>
        <el-menu-item index="/preventCrowd/equipCapacity">设备视角容量设置</el-menu-item>
        <el-menu-item index="/preventCrowd/dealInfo">处理信息设置</el-menu-item>
      </el-menu>
      <div class="container">
        <p class="instruction">设置区域和等级的容量值，达到预警值后将触发预警</p>
        <div class="content">
          <div class="topTools">
            <el-button type="primary" @click="multipleSetting" size="small" :disabled="lock" class="batchSetting">批量设置</el-button>
            <div class="tp-right">
              <div class="tp-result">
                <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
                <el-button size="small" type="text" @click="reset">重置</el-button>
              </div>
              <div class="tp-input-group">
                <ul>
                  <li>
                    <el-input
                      size="small"
                      v-model="searchsomething"
                      placeholder="请输入内容"
                      @keyup.enter.native="search()"
                      @keyup.native="excNameRegSearch(searchsomething)"
                    ></el-input>
                  </li>
                  <li>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <el-table
            ref="multipleTable"
            :data="areaCapacityInfoList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" :selectable="displayCheckbox"></el-table-column>
            <el-table-column prop="areaName" label="区域名称" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personCapacity" label="区域容量" width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.personCapacity" size="mini" :disabled="scope.row.disabled" :placeholder="scope.row.personCapacity && scope.row.personCapacity.toString()" style="width: 80%;"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="levelOne" label="蓝色预警（%）" width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.levelOne" size="mini" :disabled="scope.row.disabled" :placeholder="scope.row.levelOne && scope.row.levelOne.toString()" style="width: 80%;" :class="{warning: scope.row.warning1}" @blur="exLv(scope)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="levelTwo" label="黄色预警（%）" width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.levelTwo" size="mini" :disabled="scope.row.disabled" :placeholder="scope.row.levelTwo && scope.row.levelTwo.toString()" style="width: 80%;" :class="{warning: scope.row.warning2}" @blur="exLv(scope)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="levelThree" label="橙色预警（%）" width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.levelThree" size="mini" :disabled="scope.row.disabled" :placeholder="scope.row.levelThree && scope.row.levelThree.toString()" style="width: 80%;" :class="{warning: scope.row.warning3}" @blur="exLv(scope)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="levelFour" label="红色预警（%）" width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.levelFour" size="mini" :disabled="scope.row.disabled" :placeholder="scope.row.levelFour && scope.row.levelFour.toString()" style="width: 80%;" :class="{warning: scope.row.warning4}" @blur="exLv(scope)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="140">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" v-show="scope.row.editable" :disabled="scope.row.editLock" @click="editAreaClassInfo(scope)">设 置</el-button>
                <el-button type="danger" size="mini" v-show="!scope.row.editable" @click="saveAreaCapacityCfg(scope)">完 成</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="tp-page">
            <el-pagination
              background
              layout="prev, pager, next, jumper"
              :total="totalElements"
              @current-change="currentPageChange"
              :page-size="10"
            ></el-pagination>
          </div>
        </div>
      </div>

      <el-dialog title="区域容量设置" :visible.sync="dialogFormVisible" center>
        <el-form :label-position="'left'" label-width="110px" :model="formLabelAlign">
          <el-form-item label="区域容量">
            <el-input v-model="formLabelAlign.personCapacity" @keyup.native="excCapacity(formLabelAlign.personCapacity)" @blur="syncCapacity" size="small"></el-input>
          </el-form-item>
          <el-form-item label="蓝色预警（%）">
            <el-input v-model="formLabelAlign.levelOne" @keyup.native="excLevelOne(formLabelAlign.levelOne)" @blur="syncLevelOne" size="small"></el-input>
          </el-form-item>
          <el-form-item label="黄色预警（%）">
            <el-input v-model="formLabelAlign.levelTwo" @keyup.native="excLevelTwo(formLabelAlign.levelTwo)" @blur="syncLevelTwo" size="small"></el-input>
          </el-form-item>
          <el-form-item label="橙色预警（%）">
            <el-input v-model="formLabelAlign.levelThree" @keyup.native="excLevelThree(formLabelAlign.levelThree)" @blur="syncLevelThree" size="small"></el-input>
          </el-form-item>
          <el-form-item label="红色预警（%）">
            <el-input v-model="formLabelAlign.levelFour" @keyup.native="excLevelFour(formLabelAlign.levelFour)" @blur="syncLevelFour" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateMulSetting" size="mini">确 定</el-button>
          <el-button @click="cancelMulSetting" size="mini">取 消</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formLabelAlign: {
          personCapacity: null,
          levelOne: null,
          levelTwo: null,
          levelThree: null,
          levelFour: null
        },
        dialogFormVisible: false,
        multipleSelection: [],
        areaCapacityInfoList: [],
        resultCount: 0,
        searchsomething: '',
        totalElements: 0,
        currentPage: 1,
        pageSize: 10,
        lock: true,
        checkable: true,
        rule1: true,
        rule2: true,
        rule3: true,
        rule4: true
      }
    },
    methods: {
      displayCheckbox () {
        return this.checkable
      },
      getAreaCapacityCfgPage (currentPage = 0, pageSize = 10, query = '') {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const url = `/tread/areaCapacityCfg/getAreaCapacityCfgPage/${currentPage - 1}/${pageSize}?areaName=${query}&timeStemp=${+new Date()}`
        this.$axios.post(url)
          .then(data => {
            // console.log(data.data)
            loading.close()
            this.resultCount = data.data.totalElements
            this.totalElements = data.data.totalElements
            const result = []
            data.data.content.forEach(item => {
              result.push({
                areaId: item.areaId,
                areaName: item.areaName,
                personCapacity: item.personCapacity || '',
                levelOne: item.levelOne || '',
                levelTwo: item.levelTwo || '',
                levelThree: item.levelThree || '',
                levelFour: item.levelFour || '',
                disabled: true,
                editable: true,
                editLock: false,
                warning1: false,
                warning2: false,
                warning3: false,
                warning4: false
              })
            })
            this.areaCapacityInfoList = result
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
      reset () {
        this.searchsomething = ''
        this.getAreaCapacityCfgPage(this.currentPage, this.pageSize, this.searchsomething)
        $('.el-pager .number').first().trigger('click')
      },
      currentPageChange (index) {
        this.currentPage = index
        this.getAreaCapacityCfgPage(this.currentPage, this.pageSize, this.searchsomething)
      },
      search () {
        this.currentPage = 1
        this.getAreaCapacityCfgPage(this.currentPage, this.pageSize, this.searchsomething)
        $('.el-pager .number').first().trigger('click')
      },
      editAreaClassInfo (scope) {
        this.checkable = false
        this.areaCapacityInfoList[scope.$index]['disabled'] = false
        this.areaCapacityInfoList[scope.$index]['editable'] = false
        this.areaCapacityInfoList.forEach(item => {
          item.editLock = true
        })
      },
      saveAreaCapacityCfg (scope) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // const itm = this.areaCapacityInfoList[scope.$index]
        // if (itm.personCapacity ===  scope.row.personCapacity && itm.areaName === scope.row.areaName && itm.levelOne === scope.row.levelOne && itm.levelTwo === scope.row.levelTwo && itm.levelThree === scope.row.levelThree && itm.levelFour === scope.row.levelFour) {
        //   loading.close()
        //   this.$message({
        //     type: 'info',
        //     message: '您未做任何更改',
        //     center: true
        //   })
        //   this.checkable = true
        //   this.areaCapacityInfoList[scope.$index]['disabled'] = true
        //   this.areaCapacityInfoList[scope.$index]['editable'] = true
        //   this.areaCapacityInfoList.forEach(item => {
        //     item.editLock = false
        //   })
        //   loading.close()
        //   return
        // }
        if (!(this.rule1 && this.rule2 && this.rule3 && this.rule4)) {
          this.$message({
            type: 'info',
            message: '请修正非法数据',
            center: true
          })
          loading.close()
          return
        }
        const url = `/tread/areaCapacityCfg/saveAreaCapacityCfg`
        this.$axios.post(url, {
          areaId: scope.row.areaId,
          personCapacity: scope.row.personCapacity,
          areaName: scope.row.areaName,
          levelOne: scope.row.levelOne,
          levelTwo: scope.row.levelTwo,
          levelThree: scope.row.levelThree,
          levelFour: scope.row.levelFour
        })
        .then(data => {
          this.checkable = true
          this.areaCapacityInfoList[scope.$index]['disabled'] = true
          this.areaCapacityInfoList[scope.$index]['editable'] = true
          this.areaCapacityInfoList.forEach(item => {
            item.editLock = false
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
          this.checkable = true
          this.areaCapacityInfoList[scope.$index]['disabled'] = true
          this.areaCapacityInfoList[scope.$index]['editable'] = true
          this.areaCapacityInfoList.forEach(item => {
            item.editLock = false
          })
          this.getAreaCapacityCfgPage(this.currentPage, this.pageSize)
          loading.close()
        })
      },
      handleSelectionChange (val) {
        this.lock = val.length > 0 ? false : true
        this.multipleSelection = val
      },
      excCapacity (val) {
        if (!/^[+]{0,1}(\d+)$/.test(val) && (val && val.length) > 0) {
          this.$message({
            message: '区域容量必须为正整数',
            type: 'warning',
            center: true
          })
          this.formLabelAlign.personCapacity = val.match(/^[+]{0,1}(\d+)/)[0]
        }
      },
      syncCapacity () {
        this.checkModify('personCapacity')
      },
      excLevelOne (val) {
        this.formLabelAlign.levelOne = this.excLevel(val)
      },
      syncLevelOne () {
        this.checkModify('levelOne')
      },
      excLevelTwo (val) {
        this.formLabelAlign.levelTwo = this.excLevel(val)
      },
      syncLevelTwo () {
        this.checkModify('levelTwo')
      },
      excLevelThree (val) {
        this.formLabelAlign.levelThree = this.excLevel(val)
      },
      syncLevelThree () {
        this.checkModify('levelThree')
      },
      excLevelFour (val) {
        this.formLabelAlign.levelFour = this.excLevel(val)
      },
      syncLevelFour () {
        this.checkModify('levelFour')
      },
      excNameRegSearch (val) {
        if (!/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}$/.test(val) && (val && val.length) > 0) {
          this.$message({
            message: '请使用"汉字"、"字母"、"数字"、"_"、"-"（1-15个字符）',
            type: 'warning',
            center: true
          })
          this.searchsomething = val.match(/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}/)[0]
        }
      },
      checkModify (changPro) {
        this.formLabelAlign[changPro] = (this.formLabelAlign[changPro] && this.formLabelAlign[changPro].endsWith('.')) ? this.formLabelAlign[changPro].slice(0, -1) : this.formLabelAlign[changPro]
        this.multipleSelection.forEach(item => {
          this.areaCapacityInfoList.forEach(itm => {
            if (item.areaId === itm.areaId) {
              item[changPro] = this.formLabelAlign[changPro]
            }
          })
        })
      },
      excLevel (val) {
        if (!/^[+]{0,1}\d+$|^[+]{0,1}\d+\.{0,1}\d*$/.test(val) && (val && val.length) > 0) {
          this.levelRange()
          return val.match(/^[+]{0,1}\d+|^[+]{0,1}\d+\.{0,1}\d+/)[0]
        } else {
          return val > 1000 ? this.levelRange() : val
        }
      },
      levelRange () {
        this.$message({
          message: '区域等级范围为正数0-1000（%）',
          type: 'warning',
          center: true
        })
        return 1000
      },
      multipleSetting () {
        this.dialogFormVisible = true
      },
      cancelMulSetting () {
        this.dialogFormVisible = false
        this.getAreaCapacityCfgPage(this.currentPage, this.pageSize)
      },
      updateMulSetting () {
        const areaIdList = []
        this.multipleSelection.forEach(item => {
          areaIdList.push(item.areaId)
        })
        this.dialogFormVisible = false
        this.$axios.post('/tread/areaCapacityCfg/updateBatchAreaCapacityCfg', {
          areaIdList: areaIdList,
          personCapacity: this.formLabelAlign.personCapacity,
          levelOne: this.formLabelAlign.levelOne,
          levelTwo: this.formLabelAlign.levelTwo,
          levelThree: this.formLabelAlign.levelThree,
          levelFour: this.formLabelAlign.levelFour
        })
          .then(data => {
            this.getAreaCapacityCfgPage(this.currentPage, this.pageSize)
          })
          .catch(err => {
            if (err.response) {
              this.$message({
                type: 'error',
                message: err.response.data.message,
                center: true
              })
            }
            this.getAreaCapacityCfgPage(this.currentPage, this.pageSize)
          })
      },
      exLv (scope) {
        if (scope.column.property === 'levelOne') {
          scope.row.warning1 = this.exLvFn(scope.row.levelOne) ? false : true
          this.rule1 = this.exLvFn(scope.row.levelOne)
        } else if (scope.column.property === 'levelTwo') {
          scope.row.warning2 = this.exLvFn(scope.row.levelTwo) ? false : true
          this.rule2 = this.exLvFn(scope.row.levelTwo)
        } else if (scope.column.property === 'levelThree') {
          scope.row.warning3 = this.exLvFn(scope.row.levelThree) ? false : true
          this.rule3 = this.exLvFn(scope.row.levelThree)
        } else if (scope.column.property === 'levelFour') {
          scope.row.warning4 = this.exLvFn(scope.row.levelFour) ? false : true
          this.rule4 = this.exLvFn(scope.row.levelFour)
        }
      },
      exLvFn (val) {
        if (!/^[+]{0,1}\d+$|^[+]{0,1}\d+\.{0,1}\d*$/.test(val) && (val && val.length) > 0 || val > 1000) {
          this.$message({
            message: '区域等级范围为正数0-1000（%）',
            type: 'warning',
            center: true
          })
          return false
        } else {
          return true
        }
      }
    },
    mounted () {
      this.getAreaCapacityCfgPage(this.currentPage, this.pageSize)
    },
    computed: {
      path () {
        return this.$route.path.match(/^(\/\w+\/\w+)/)[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './areaCapacity.scss';
</style>

<style lang="scss">
  .areaCapacity {
    .el-table th {
      text-align: center;
    }
    .el-input__inner {
      color: #5a5a5a!important;
      border-color: #dcdfe6;
      text-align: center;
      transition: none;      
      &[disabled] {
        border: none;
        background: none;
      }
    }
    .warning {
      .el-input__inner {
        border-color: #f20;
        color: #ff6600;
      }
    }
    .app-main .el-table div.el-table__body-wrapper td button, .table-page .el-table div.el-table__body-wrapper td button {
      color: #fff;
      padding: 7px 15px;
    }
    .table-page .el-table div.el-table__body-wrapper td div, .app-main .el-table div.el-table__body-wrapper td div {
      color: #5a5a5a;
    }

    .el-dialog {
      border-radius: 10px;
      width: 320px;
      height: 480px;
      .el-input__inner {
        color: #5a5a5a;
        text-align: left;
      }
    }

    .tp-input-group .el-input__inner {
      text-align: left;
    }
  }
</style>
