<template>
<div class="warning-ontime">
    <el-main class="app-main table-page">
        <h2 class="tp-title">预警管理</h2>
        <div>
            <div class="tp-header">
                <div class="tp-left">
                    <el-button size="small" type="primary" @click="eToEChart">统计报表</el-button>
                    <!-- <el-button size="small" type="primary" @click="eToPersonFlowStatistics">流量统计</el-button> -->
                </div>
                <div class="tp-right">
                    <div class="tp-result">
                        <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
                        <el-button size="small" type="text" @click="eReset">重置</el-button>
                    </div>
                    <div class="tp-input-group">
                      <ul>
                        <li class="date-picker">
                          <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            :editable="false"
                            size="small"
                            :time-arrow-control="true"
                            :picker-options="pickerOptionsRange"
                            @change="eSelectDateRange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            prefix-icon="el-icon-date"
                            align="left">
                          </el-date-picker>
                            <!-- value-format="yyyy-MM-dd hh:mm:ss" -->
                        </li>
                        
                        <li class="select">
                          <el-tooltip :content="warningTypeTip" placement="top" effect="dark">
                            <el-select size="small" v-model="warningLevel" @change="eWarningTypeChange">
                              <el-option
                                v-for="item in warningTypeList" 
                                :key="item.value"
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
                                v-for="item in areaGroupList" 
                                :key="item.value"
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
                            placeholder="输入人员姓名查询"></el-input>
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
                      <el-button type="text" @click="eGoDetail(scope)">查看详情</el-button>
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
              :total="allCount"
            >
            </el-pagination>
            </div>
        </div>
    </el-main>
 </div>
</template>
<script>
import {errorException, successTip, errorTip, confirmModal} from '../intelligence/js/tip'
import {debounce} from '../intelligence/js/utils'
import {dateFmt} from '../../common/js/utils'
import BASE from '../intelligence/js/basePath'
const BASEPATH= BASE.BASEPATH_YUWEI // 布控等级--玉伟
const BASEPATH2 = BASE.BASEPATH_WEIKANG//韦康
const TABLEHEADER = [
  { label: "序号", prop: "index" },
  { label: "人员姓名", prop: "peopleName" },
  // { label: "类型", prop: "warningType" },
  { label: "时间", prop: "time" },
  { label: "区域组", prop: "areaGroup" },
  { label: "等级", prop: "level" },
];
export default {
  data(){
    return {
      resultCount: '0',
      date: [],
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
      areaGroup: '',
      areaGroupList: [{value: '', label: '全部区域组'}],
      warningLevel: '',
      warningTypeList:  [{value: '', label: '全部等级'}],
      allCount: 10, 
      pageSize: 10,
      currentPage: 1,
      keyword: '',

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
    warningTypeTip(){
      for (let i = 0, len = this.warningTypeList.length; i < len; i++) {
        let item = this.warningTypeList[i]
        if (item.value == this.warningLevel) {
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
      this.date = this.date || []// 清空会导致 this.date === null
      let url = `${BASEPATH}/info/personWarning/getPersonWarningList/${this.currentPage - 1}/${this.pageSize}`
      let option = {
        method: 'POST',
        url: url,
        data: {
          startWarningTime: this.date[0] || null,// 不用任何格式的时间，就是 new Date()
          endWarningTime: this.date[1] || null,
          areaGroupId: this.areaGroup,
          levelId: this.warningLevel,
          personName: this.keyword
        }
      }
      this.$axios(option)
        .then(( data )=>{
          this.handleTableList(data.data)
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    _getLevelAndAreaGroup(){
      // 布控等级
      let url = `${BASEPATH}/info/surveillanceLevel/getSurveillanceLevelData`
      this.$axios({
          type: 'GET',
          url: url
        })
        .then(( data )=>{
          data = data.data
          data.forEach(( v, i )=>{
            this.warningTypeList.push({label: v.levelName, value: v.levelId})
          })
        })
        .catch((e)=>{this.mCatchException(e)})

      // 区域组
      let url2 = `${BASEPATH2}/info/areagroup/getAllGroup`
      this.$axios({
          type: 'POST',
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
    handleTableList(data){
      this.allCount = this.resultCount = data.totalElements
      this.tableList = []
      data.content.forEach(( v, i )=>{
        this.tableList.push({
          index: (this.currentPage - 1) * 10 + i + 1,
          peopleName: v.personName,
          warningType: v.personType,
          time: dateFmt(v.warningTime),
          areaGroup: v.areaGroupName,
          level: v.levelName,
          personId: v.personId
        })
      })
    },
    eToEChart(){
      this.$router.push({name: 'personWarningEchart'})
    },
    eToPersonFlowStatistics(){
      this.$router.push({name: 'personFlowStatistics'})
    },
    eReset(){
      this.areaGroup = ''
      this.warningLevel = ''
      this.keyword = ''
      this.currentPage = 1
      this.date = []
      this.debounce(this._getTableList)
    },
    eSelectDateRange(data){
      this._getTableList()
    },
    eAreaGroupChange(){
      this._getTableList()
    },
    eWarningTypeChange(){
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
    eGoDetail(data){
      this.$router.push({name: 'personTrack', query: {personId: data.row.personId}})
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
.warning-ontime {
  .el-table div.el-table__body-wrapper button.el-button{
    line-height: 22px;
  }
  .input {
    width: 180px;
  }
  .select {
    width: 110px;
  }
  .date-picker {
    width: 345px;

    .el-input__icon.el-range__close-icon {
      position: absolute;
      right: 0px;
    }

    .el-date-editor {
      width: 100%;
      padding-right: 4px;
    }
    .el-range-separator,
    input {
      font-size: 12px;
    }
  }
}
.warning-ontime {
  button.red span {
    color: red;
  }
}
</style>

