<template>
<div class="sys-warning">
    <el-main class="app-main table-page">
        <h2 class="tp-title">预警管理</h2>
        <div>
            <div class="tp-header">
                <div class="tp-left">
                    <el-button size="small" type="primary" @click="eToWarningSetting">预警设置</el-button>
                </div>
                <div class="tp-right">
                    <div class="tp-result">
                        <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
                        <el-button size="small" type="text" @click="eReset">重置</el-button>
                    </div>
                    <div class="tp-input-group">
                      <ul>
                        <li class="select">
                          <el-tooltip :content="levelTip" placement="top" effect="dark">
                            <el-select size="small" v-model="level" @change="eLevelChange">
                              <el-option
                                v-for="(item, index) in levelList" 
                                :key="index"
                                :value="item.value"
                                :label="item.label"
                              ></el-option>
                            </el-select>
                          </el-tooltip>
                        </li>
                        <li class="select">
                          <el-tooltip :content="areaGroupTip" placement="top" effect="dark">
                            <el-select size="small" v-model="areaGroup" @change="eAreaGroupChange">
                              <el-option
                                v-for="(item, index) in areaGroupList" 
                                :key="index"
                                :value="item.value"
                                :label="item.label"
                              ></el-option>
                            </el-select>
                          </el-tooltip>
                        </li>
                        <li class="input">
                            <el-input size="small" 
                            @keyup.native.delete="eBackSpaceAndDelete"
                            @clear="eClear" 
                            @keyup.native.enter="eEnter" 
                            :clearable="true" 
                            :maxlength="9" 
                            v-model="keyword" 
                            placeholder="输入知会人进行搜索"></el-input>
                        </li>
                        <li>
                            <el-button size="small" type="primary" @click="eSearch">搜索</el-button>
                        </li>
                      </ul>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                  :data="tableList"
                  style="width: 100%;"
                  border
                >
                    <el-table-column 
                      v-for="(value, index) in tableHeader" :key="index"
                      :width="index === 0 ? '50px': ''"
                      :label="value.label"
                      :prop="value.prop"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align="center"
                    >
                      <template slot-scope="scope">
                          <el-button type="text" @click="eGoDetail(scope)">编辑</el-button>
                          <el-button type="text" @click="eRemoveItem(scope)" class="red">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="tp-page">
            <el-pagination
                @current-change="eCurrentPageChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="allCount">
            </el-pagination>
            </div>
        </div>
    </el-main>
 </div>
</template>
<script>
import {errorException, successTip, errorTip, confirmModal} from '../intelligence/js/tip'
import {debounce} from '../intelligence/js/utils'
import BASE from '../intelligence/js/basePath'
const BASEPATH = BASE.BASEPATH_YIHANG// 艺航
const BASEPATH2 = BASE.BASEPATH_WEIKANG//韦康
const BASEPATH3= BASE.BASEPATH_YUWEI // 布控等级--玉伟

const TABLEHEADER = [
  { label: "序号", prop: "index" },
  { label: "预警等级", prop: "level" },
  { label: "预警区域组", prop: "areaGroup" },
  { label: "知会人", prop: "notifyPeople" },
  { label: "预警内容", prop: "warningContent" },
];
export default {
  data(){
    return {
      resultCount: '0',
    
      areaGroup: '',
      areaGroupList: [{value: '', label: '全部区域组'}],
      level: '',
      levelList:  [{value: '', label: '全部等级'}],
      allCount: 0, 
      pageSize: 10,
      currentPage: 1,
      keyword: '',
      levelIdMapLevelType: {},// {levelId: levelType, .....}

      tableList: [],
      tableHeader: TABLEHEADER
    }
  },
  computed: {
    areaGroupTip(){
      for (let i = 0, len = this.areaGroupList.length; i < len; i++) {
        let item = this.areaGroupList[i]
        if (item.value == this.areaGroup) {
          return item.label
        }
      }
      return '暂无分组'
    },
    levelTip(){
      for (let i = 0, len = this.levelList.length; i < len; i++) {
        let item = this.levelList[i]
        if (item.value == this.level) {
          return item.label
        }
      }
      return '暂无等级'
    }
  },
  created(){
    this._getTableList()
    this._getLevelAndAreaGroup()
  },
  methods: {
    // fetch
    _getTableList(){
      let url = `${BASEPATH}/info/warning/getWarningListPage/${this.currentPage - 1}/${this.pageSize}`
      this.$axios({
        method: 'POST',
        url: url,
        data: {
          levelName: this.levelIdMapLevelType[this.level],
          areaGroupId: this.areaGroup,
          levelRelevaUser: this.keyword,
        }
      })
        .then(( data )=>{
          this.handleTableList(data.data)
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    _getLevelAndAreaGroup(){
      // 布控等级
      let url = `${BASEPATH3}/info/surveillanceLevel/getSurveillanceLevelData`
      this.$axios({
          method: 'GET',
          url: url
        })
        .then(( data )=>{
          data = data.data
          this.levelIdMapLevelType = {}
          data.forEach(( v, i )=>{
            this.levelList.push({label: v.levelName, value: v.levelId})
            this.levelIdMapLevelType[v.levelId] = v.levelName
          })
        })
        .catch((e)=>{this.mCatchException(e)})

      // 区域组
      let url2 = `${BASEPATH2}/info/areagroup/getAllGroup`
      this.$axios({
          method: 'POST',
          url: url2
        })
        .then(( data )=>{
          data = data.data
          data.forEach(( v, i )=>{
            this.areaGroupList.push({label: v.areaGroupName, value: v.areaGroupId})
          })
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    _delectWarning(id){
      let url = `${BASEPATH}/info/warning/delectWarning/${id}`
      this.$axios({
          method: 'POST',
          url:url
        })
        .then(()=>{
          this.mSuccessTip('删除成功！')
          this._getTableList()
        })
        .catch((e)=>{this.mCatchException(e)})
    },

    handleTableList(data){
      this.allCount = this.resultCount = data.totalElements
      this.tableList = []
      data.content.forEach(( v, i )=>{
        let str = ''
        if (v.levelWarningMag) {
          str = v.levelWarningMag.replace(/\$\{name\}/g, '[ 人员姓名 ]')
          str = str.replace(/\$\{plateNumber\}/g, '[ 车牌 ]')
          str = str.replace(/\$\{time\}/g, '[ 时间 ]')
          str = str.replace(/\$\{site\}/g, '[ 地点 ]')
        }
        this.tableList.push({
          index: (this.currentPage - 1) * 10 + i + 1,
          level: v.levelName,
          areaGroup: v.warningAreagroupEntiy[0].areaGroupName,// 需要修改
          notifyPeople: v.levelRelevaUser,
          warningContent: str,
          warningId: v.warningId
        })
      })
    },
    eToWarningSetting(){
        this.$router.push({name: 'warningSetting'})
    },
    eReset(){
      this.areaGroup = ''
      this.level = ''
      this.keyword = ''
      this.debounce(this._getTableList)
    },
    eAreaGroupChange(){
      this._getTableList()
    },
    eLevelChange(){
      this._getTableList()
    },
    eBackSpaceAndDelete(){
      if (!this.keyword) {
        this.debounce(this._getTableList)
      }
    },
    eClear(){
      this._getTableList()
    },
    eEnter(){
      this.debounce(this._getTableList)
    },
    eSearch(){
      this.debounce(this._getTableList)
    },
    eCurrentPageChange(index){
      this.currentPage = index
      this._getTableList()
    },
    eRemoveItem(data){
      this.mConfirmModal('此操作会删除该数据，是否继续？')
        .then((  )=>{
          let id = data.row.warningId
          this._delectWarning(id)
        }).catch(()=>{})
    },
    eGoDetail(data){
      let id = data.row.warningId
      this.$router.push({name: 'warningSetting', query: {warningId: id}})
    },
     //tip fn
    mCatchException(e, nocatchDesc = '请检查您的网络是否异常！'){
      return errorException(this, e, nocatchDesc)
    },
    mSuccessTip(msg='操作成功'){
      return successTip(this, msg)
    },
    mErrorTip(msg = '操作失败！'){
      return errorTip(this, msg)
    },
    mConfirmModal(msg = '您确定进行此操作？'){
      return confirmModal(this, msg)
    },
    
    // utils fn
    debounce(fn){
      debounce(fn, this, 200, [].slice.call(arguments, 1))
    },
  }
};
</script>

<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.sys-warning {
  .input {
    width: 180px;
  }
  .select {
    width: 110px;
  }
  .sys-warning {
    button.red span {
      color: red;
    }
  }
}

</style>

