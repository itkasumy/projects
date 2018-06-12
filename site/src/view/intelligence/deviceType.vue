<template>
 <div class="device-type">
        <el-main class="app-main table-page">
          <h2 class="tp-title">设备类型</h2>
          <div class="">
              <!-- header -->
              <div class="tp-header">
                  <div class="tp-left">
                      <el-button size="small" type="primary" @click="eAddDevType">+新增设备类型</el-button>
                      <el-button size="small" type="primary" @click="isShowLiveAddDialog = true">头盔直播流地址</el-button>
                  </div>
                  <div class="tp-right">
                      <div class="tp-result">
                          <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
                          <el-button size="small" type="text" @click="eReset">重置</el-button>
                      </div>
                      <div class="tp-input-group">
                          <ul>
                              <li class="input">
                                  <el-input size="small" 
                                    @keyup.native.delete="eBackSpaceAndDelete"
                                    @clear="eClear" 
                                    @keyup.native.enter="eEnter" 
                                    :clearable="true"
                                    v-model="keyword"
                                    placeholder="输入类型名称"></el-input>
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
                          v-for="(value, index) in tableHeaderList" :key="index"
                          :width="index === 0 ? '50px': ''"
                          :label="value.label"
                          :prop="value.prop"
                          align="center"
                          >
                          <template slot-scope="scope">
                            <!-- 序号 -->
                            <div v-if="index === 0">
                              {{scope.row.index}}
                            </div>
                            <!-- 类型名称 -->
                            <div v-if="index === 1">
                              {{scope.row.deviceTypeName}}
                            </div>
                            <!-- 类型图标 -->
                            <div  v-if="index === 2">
                              <el-tooltip class="item" effect="dark" :content="mapTypeEN2CN[scope.row.deviceTypeIcon] || '其他设备'" placement="right">
                                <img draggable="false" v-if="scope.row.deviceTypeIcon && scope.row.deviceTypeIcon.indexOf('camera') !== -1" :src="camera">
                                <img draggable="false" v-else-if="scope.row.deviceTypeIcon && scope.row.deviceTypeIcon.indexOf('radar') !== -1" :src="radar">
                                <img draggable="false" v-else-if="scope.row.deviceTypeIcon && scope.row.deviceTypeIcon.indexOf('H1') !== -1" :src="H1">
                                <img draggable="false" v-else-if="scope.row.deviceTypeIcon && scope.row.deviceTypeIcon.indexOf('helmet') !== -1" :src="helmet">
                                <img draggable="false" v-else-if="scope.row.deviceTypeIcon && scope.row.deviceTypeIcon.indexOf('wifi') !== -1" :src="wifi">
                                <img draggable="false" v-else-if="scope.row.deviceTypeIcon && scope.row.deviceTypeIcon.indexOf('swan') !== -1" :src="swan">
                                <img draggable="false" v-else  :src="other">
                              </el-tooltip>
                            </div>
                            <!-- 监控视角度 -->
                             <div v-if="index === 3">
                              {{scope.row.configFlag == '1' ? '不可配置': '可配置'}}
                            </div>
                            <!-- 备注 -->
                            <div v-if="index === 4">
                              {{scope.row.deviceTypeRemark}}
                            </div>
                            <!-- 状态 -->
                            <div v-if="index === 5">
                              {{scope.row.isUsing == '1'? '已启用': '未启用'}}
                            </div>
                          </template>
                      </el-table-column>
                      <el-table-column  label="操作"  align="center">
                        <template slot-scope="scope">
                          <el-button type="text" @click="eEditDevType(scope)">编辑</el-button>
                          <el-button type="text" @click="eRemoveDevType(scope)"  v-if="scope.row.isUsing != '1'" class="red">删除</el-button>
                        </template>
                      </el-table-column>
                  </el-table>
              </div>
              <div class="tp-page">
                <el-pagination
                  layout="prev, pager, next, jumper"
                  :total="allCount"
                  :page-size="pageSize"
                  :current-page="currentPage"
                  @current-change="eCurrentPageChange"
                ></el-pagination>
              </div>

              <!-- 直播流地址 -->
              <el-dialog 
                title="头盔直播流地址"
                :show-close="false"
                :visible.sync="isShowLiveAddDialog"
              >
                <el-input size="small" @input="eInputHelmetLiveAddress" clearable :maxlength="80" v-model="helmetLiveAddress" autofocus placeholder="rtmp://helmet.iphoton.cn/test/StreamName_" auto-complete="on"></el-input>
                <el-button size="small" type="primary" @click="eChangeHelmetLiveAddress">确 定</el-button>
                <span class="red fl" v-show="!helmetLiveAddressValid">仅支持以rtmp://开头的包含英文、点、斜杠、下划线、数字的url地址</span>
              </el-dialog>
          </div>
        </el-main>
 </div>
</template>
<script>
import BASE from './js/basePath'
import {errorException, successTip, errorTip, confirmModal} from './js/tip'
import {deviceIcon} from './js/iconPath'
import {debounce} from './js/utils'
const DEVICEICON = deviceIcon()
const BASEPATH = BASE.BASEPATH
const  BASEPATH2 = BASE.BASEPATH2

const TABLEHEADER = [
  { label: "序号", prop: "index" },
  { label: "类型名称", prop: "deviceTypeName" },
  { label: "类型图标", prop: "deviceTypeName" },
  { label: "监控视角度", prop: "configFlag" },
  { label: "备注", prop: "deviceTypeRemark" },
  { label: "状态", prop: "isUsing" }
];
const MAP_TYPE_EN2CN = {
  camera: '摄像头',
  wifi: 'wifi嗅探器',
  radar: '光电雷达',
  swan: '卡口设备',
  H1: 'H1飞行器',
  helmet: '头盔',
  other: '其他设备'
}

export default {
  name: "DeviceManagerEdit",
  data() {
    return {
      // icon
      camera: DEVICEICON.camera,
      H1: DEVICEICON.H1,
      helmet: DEVICEICON.helmet,
      radar: DEVICEICON.radar,
      wifi: DEVICEICON.wifi,
      swan: DEVICEICON.swan,
      other: DEVICEICON.other,

      mapTypeEN2CN: MAP_TYPE_EN2CN,

      // page paras
      resultCount: '0',
      keyword: '',
      allCount: 0,
      pageSize: 10,
      currentPage: 1,

      tableList: [],
      tableHeaderList: TABLEHEADER,

      helmetLiveAddress: 'rtmp://helmet.iphoton.cn/test/StreamName_',
      // helmetLiveAddress: 'rtmp://helmet.iphoton.cn/test/StreamName_02_ld',
      isShowLiveAddDialog: false,
      helmetLiveAddressValid: true

    };
  },
  created() {
    this._getTableList()
  },

  methods: {
    // fetch
    _getTableList(){
      let url = `${BASEPATH}/info/deviceManage/findDevTypePage/${this.currentPage - 1}/${this.pageSize}`
      this.$axios({
        method: 'POST',
        url: url,
        data: {
          deviceTypeName:this.keyword
        }
      })
        .then(( data )=>{
            this.handleTableList(data.data)
        }).catch(( e )=>{  errorException(this, e)  })
    },
    _deleteDevType(devTypeId){
      let url = `${BASEPATH}/info/deviceManage/deleteDevType/${devTypeId}`
      return this.$axios({
        method: 'GET',
        url: url
      })
    },
    _UpdateHelmetLiveAdd() {
      console.log( 213 )
    },

    // handler fn
    handleTableList(data){
      this.allCount = this.resultCount = data.totalElements
      this.tableList = []
      data.content.forEach(( v, i )=>{
          this.tableList.push({
            index: (this.currentPage - 1) * 10 + i + 1,
            deviceTypeName: v.deviceTypeName,
            deviceTypeIcon: v.deviceTypeIcon,
            configFlag: v.configFlag,
            deviceTypeRemark: v.deviceTypeRemark,
            isUsing: v.isUsing,
            deviceTypeId: v.deviceTypeId
          })
      })
    },
    // utils fn
    uDebounce(fn){
      debounce(fn, this, 200, [].slice.call(arguments, 1))
    },

    // dom event
    eChangeHelmetLiveAddress() {
      if(this.helmetLiveAddressValid){
        this._UpdateHelmetLiveAdd()
      }
    },
    eInputHelmetLiveAddress() {
      let reg = /^rtmp:\/\/[A-z\.\/_0-9]+$/
      this.helmetLiveAddressValid = reg.test(this.helmetLiveAddress)
    },
    eReset() {
      this.keyword = ''
      this.currentPage = 1
      this.uDebounce(this._getTableList)
    },
    eBackSpaceAndDelete(){
      if (!this.keyword) {
        this.uDebounce(this._getTableList)
      }
    },
    eClear(){
      this.uDebounce(this._getTableList)
    },
    eEnter(){
      this.uDebounce(this._getTableList)
    },
    eSearch(){
      this.uDebounce(this._getTableList)
    },
    eAddDevType(){
      this.$router.push({name: 'deviceTypeEdit'})
    },
    eEditDevType(data){
      this.$router.push({name: 'deviceTypeEdit', query: {id: data.row.deviceTypeId}})
    },
    eRemoveDevType(data){
      this.mConfirmModal('您确定删除此条数据？')
        .then((  )=>{
          let deviceTypeId = data.row.deviceTypeId
          this._deleteDevType(deviceTypeId)
            .then((  )=>{
              this._getTableList()
              this.mSuccessTip('删除成功')
            })
            .catch((e)=>{this.mCatchException(e)})
        })
        .catch(()=>{})
    },
    eCurrentPageChange(index){
      this.currentPage = index
      this._getTableList()
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
  }
};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.device-type .el-table div.el-table__body-wrapper td, .table-page .el-table div.el-table__body-wrapper td {
  padding-top: 12px;
  padding-bottom: 12px;
}
.device-type {
  .input {
    width: 200px;
  }
  .select {
    width: 120px;
  }
  button.red span {
    color: #ff4242;
  }

  .el-dialog {
    width: 600px;
    margin-top: 18% !important;
    border-radius: 10px;
    padding: 30px 30px 56px 30px;
    box-sizing: border-box;
    .red {
      margin-top: 10px;
      color: red
    }
    .el-dialog__header {
      text-align: left;
      span {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .el-dialog__body {
      height: 40px;
    }
    .el-input {
      width: 380px;
      float: left;
    }
    button {
      width: 80px;
      float: right;
    }

  }





}
</style>
